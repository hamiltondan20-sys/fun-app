// Account sync (docs/account-sync.md). A signed-in visitor's trip collection is mirrored to one
// Supabase row per trip. The browser stays the working copy: the planner works the same signed out,
// and sync only copies whole trips up and down. When two devices change the same trip, both
// versions are kept. Talks to Supabase's Auth and REST endpoints with fetch (no client library),
// so nothing third-party loads until a visitor signs in. No DOM. Unit-tested in Node.
(function initializeAccountSync(root) {
  const TRIP_ID = /^trp_[A-Za-z0-9_-]{1,80}$/;
  const MAX_PAYLOAD_CHARS = 900000;
  const MAX_TRIPS = 200;
  const REFRESH_MARGIN_MS = 60000;
  const CONFLICT_SUFFIX = " (conflicting copy)";

  // ---- Content identity ----

  // 53-bit string hash (cyrb53). Only compares a trip with itself, so collisions are not a security
  // concern; a collision would at worst skip one upload until the next edit.
  function hashText(text) {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let index = 0; index < text.length; index++) {
      const code = text.charCodeAt(index);
      h1 = Math.imul(h1 ^ code, 2654435761);
      h2 = Math.imul(h2 ^ code, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, "0");
  }

  // The same fields the planner's change detection uses, minus save times and the local profile.
  function contentHash(draft) {
    return hashText(JSON.stringify([draft?.appState ?? null, draft?.currentTrip ?? null, draft?.liveDraftTrip ?? null,
      draft?.likedTrip ?? null, draft?.alternateTrips ?? null, draft?.bookingItems ?? null, draft?.activeTripSource ?? null]));
  }

  // The local profile (name, optional email, home airport) never leaves the browser through sync.
  function toSyncPayload(draft) {
    const { tripProfile, ...rest } = draft || {};
    return JSON.parse(JSON.stringify(rest));
  }

  // Rows can only be the signed-in visitor's own (row-level security), but they are still parsed
  // defensively: a row must hold a trip whose id matches the row.
  function cleanRemoteDraft(payload, id) {
    if (!TRIP_ID.test(String(id || ""))) return null;
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
    const trip = payload.currentTrip;
    if (!trip || typeof trip !== "object" || !Array.isArray(trip.days)) return null;
    const draft = toSyncPayload(payload);
    draft.currentTrip.tripId = id;
    if (draft.liveDraftTrip && typeof draft.liveDraftTrip === "object") draft.liveDraftTrip.tripId = id;
    if (!Array.isArray(draft.alternateTrips)) draft.alternateTrips = [];
    if (!draft.bookingItems || typeof draft.bookingItems !== "object") draft.bookingItems = {};
    return draft;
  }

  function tripTitle(draft) {
    return String(draft?.currentTrip?.title || "Untitled trip").slice(0, 200);
  }

  // ---- Merge plan ----
  // local: [{ id, hash }]; remote: [{ id, updated_at, deleted, content_hash }];
  // base: { [id]: { hash, remoteUpdatedAt } } = what both sides held after the last sync.
  function planSync({ local = [], remote = [], base = {} }) {
    const localById = new Map(local.map((entry) => [entry.id, entry]));
    const remoteById = new Map(remote.map((row) => [row.id, row]));
    const ids = new Set([...localById.keys(), ...remoteById.keys(), ...Object.keys(base)]);
    const actions = [];
    for (const id of ids) {
      const L = localById.get(id);
      const R = remoteById.get(id);
      const B = base[id];
      if (L && !R) {
        actions.push({ type: "upload", id, ifUpdatedAt: null, localHash: L.hash });
      } else if (!L && R) {
        if (R.deleted) {
          if (B) actions.push({ type: "forget", id });
        } else if (B && B.remoteUpdatedAt === R.updated_at) {
          // Deleted on this device after the last sync, unchanged elsewhere since.
          actions.push({ type: "delete-remote", id, ifUpdatedAt: R.updated_at });
        } else {
          // New on another device, or changed there after this device deleted it: bring it back.
          actions.push({ type: "download", id, localHash: null });
        }
      } else if (L && R) {
        const localChanged = !B || L.hash !== B.hash;
        if (R.deleted) {
          if (B && !localChanged) actions.push({ type: "delete-local", id, localHash: L.hash });
          else actions.push({ type: "upload", id, ifUpdatedAt: R.updated_at, localHash: L.hash });
          continue;
        }
        if (R.content_hash && R.content_hash === L.hash) {
          if (!B || B.hash !== L.hash || B.remoteUpdatedAt !== R.updated_at) {
            actions.push({ type: "record", id, hash: L.hash, remoteUpdatedAt: R.updated_at });
          }
          continue;
        }
        const remoteChanged = !B || R.updated_at !== B.remoteUpdatedAt;
        if (localChanged && remoteChanged) actions.push({ type: "conflict", id, ifUpdatedAt: R.updated_at, localHash: L.hash });
        else if (localChanged) actions.push({ type: "upload", id, ifUpdatedAt: R.updated_at, localHash: L.hash });
        else if (remoteChanged) actions.push({ type: "download", id, localHash: L.hash });
      } else if (B) {
        actions.push({ type: "forget", id });
      }
    }
    return actions;
  }

  // ---- One sync pass ----
  // store: { listEntries() -> [{ id, draft }], putEntry(draft, { expectedHash }) -> bool,
  //          removeEntry(id, { expectedHash }) -> bool, readBase(), writeBase(base) }
  // put/remove return false when the trip changed locally while the pass ran; the next pass sees it.
  async function runSync({ api, store, newId, maxPasses = 3 }) {
    const summary = { uploaded: 0, downloaded: 0, conflicts: 0, removedHere: 0, removedOnline: 0, skipped: [], passes: 0 };
    for (let pass = 0; pass < maxPasses; pass++) {
      summary.passes = pass + 1;
      const retry = await syncPass({ api, store, newId, summary });
      if (!retry) return summary;
    }
    return summary;
  }

  async function syncPass({ api, store, newId, summary }) {
    const state = store.readBase();
    const base = state.trips || {};
    const localOnly = new Set(state.localOnly || []);
    const entries = store.listEntries().filter((entry) => TRIP_ID.test(entry.id) && !localOnly.has(entry.id));
    const draftsById = new Map(entries.map((entry) => [entry.id, entry.draft]));
    const local = entries.map((entry) => ({ id: entry.id, hash: contentHash(entry.draft) }));
    const remote = (await api.listTrips()).filter((row) => TRIP_ID.test(row.id) && !localOnly.has(row.id));
    const actions = planSync({ local, remote, base });
    let liveCount = remote.filter((row) => !row.deleted).length;
    let retry = false;
    const save = () => store.writeBase({ ...state, trips: base });

    const needRemote = actions.filter((action) => action.type === "download" || action.type === "conflict").map((action) => action.id);
    const remoteRows = new Map((needRemote.length ? await api.fetchTrips(needRemote) : []).map((row) => [row.id, row]));

    async function upload(id, draft, ifUpdatedAt, hash) {
      const payload = toSyncPayload(draft);
      if (JSON.stringify(payload).length > MAX_PAYLOAD_CHARS) {
        summary.skipped.push({ id, title: tripTitle(draft), reason: "too-large" });
        return false;
      }
      if (ifUpdatedAt === null && liveCount >= MAX_TRIPS) {
        summary.skipped.push({ id, title: tripTitle(draft), reason: "trip-limit" });
        return false;
      }
      const record = { id, title: tripTitle(draft), payload, content_hash: hash, deleted: false };
      let row;
      try {
        row = ifUpdatedAt === null ? await api.insertTrip(record) : await api.updateTrip(record, ifUpdatedAt);
      } catch (error) {
        if (error.code !== "trip-limit") throw error;
        liveCount = MAX_TRIPS;
        summary.skipped.push({ id, title: tripTitle(draft), reason: "trip-limit" });
        return false;
      }
      if (!row) {
        retry = true; // Someone else wrote first; re-plan with fresh rows.
        return false;
      }
      if (ifUpdatedAt === null) liveCount++;
      base[id] = { hash, remoteUpdatedAt: row.updated_at };
      save();
      summary.uploaded++;
      return true;
    }

    for (const action of actions) {
      const { id } = action;
      if (action.type === "record") {
        base[id] = { hash: action.hash, remoteUpdatedAt: action.remoteUpdatedAt };
        save();
      } else if (action.type === "forget") {
        delete base[id];
        save();
      } else if (action.type === "upload") {
        await upload(id, draftsById.get(id), action.ifUpdatedAt, action.localHash);
      } else if (action.type === "download") {
        const row = remoteRows.get(id);
        const draft = row && cleanRemoteDraft(row.payload, id);
        if (!draft) {
          summary.skipped.push({ id, title: row?.title || "", reason: "unreadable" });
          continue;
        }
        if (!store.putEntry(draft, { expectedHash: action.localHash })) { retry = true; continue; }
        base[id] = { hash: contentHash(draft), remoteUpdatedAt: row.updated_at };
        save();
        // A conflicting copy made by another device is reported as a conflict here too.
        if (!action.localHash && tripTitle(draft).endsWith(CONFLICT_SUFFIX)) summary.conflicts++;
        else summary.downloaded++;
      } else if (action.type === "delete-local") {
        if (!store.removeEntry(id, { expectedHash: action.localHash })) { retry = true; continue; }
        delete base[id];
        save();
        summary.removedHere++;
      } else if (action.type === "delete-remote") {
        const row = await api.updateTrip({ id, title: "", payload: null, content_hash: null, deleted: true }, action.ifUpdatedAt);
        if (!row) { retry = true; continue; }
        delete base[id];
        save();
        summary.removedOnline++;
      } else if (action.type === "conflict") {
        // Keep both: this device's version keeps the trip; the other device's becomes a new trip.
        const row = remoteRows.get(id);
        const theirs = row && cleanRemoteDraft(row.payload, id);
        if (theirs) {
          const copyId = newId("trp");
          const copy = cleanRemoteDraft(theirs, copyId);
          copy.currentTrip.title = `${tripTitle(theirs).slice(0, 200 - CONFLICT_SUFFIX.length)}${CONFLICT_SUFFIX}`;
          if (copy.liveDraftTrip) copy.liveDraftTrip.title = copy.currentTrip.title;
          if (store.putEntry(copy, { expectedHash: null })) {
            await upload(copyId, copy, null, contentHash(copy));
            summary.conflicts++;
          }
        }
        await upload(id, draftsById.get(id), action.ifUpdatedAt, action.localHash);
      }
    }
    return retry;
  }

  // ---- Supabase client (Auth + REST over fetch) ----

  class SyncError extends Error {
    constructor(message, { status = 0, code = "", offline = false } = {}) {
      super(message);
      this.status = status;
      this.code = code;
      this.offline = offline;
    }
  }

  function readJson(text) {
    try { return text ? JSON.parse(text) : null; } catch (error) { return null; }
  }

  function describeAuthError(status, body) {
    const code = body?.error_code || body?.code || "";
    if (status === 429 || code === "over_email_send_rate_limit" || code === "over_request_rate_limit") {
      return "Too many attempts. Please wait a few minutes and try again.";
    }
    if (code === "email_address_invalid" || code === "validation_failed") return "Please check the email address.";
    if (code === "otp_expired" || /expired|invalid/i.test(body?.msg || body?.message || body?.error_description || "")) {
      return "That code didn't work. It may have expired; ask for a new one.";
    }
    if (status >= 500) return "The sign-in service is having trouble. Please try again later.";
    return "Something went wrong. Please try again.";
  }

  function createClient({ url, publishableKey, fetch: fetchImpl, storage, sessionKey = "hb-account-session-v1", now = () => Date.now(), withLock }) {
    const baseUrl = String(url || "").replace(/\/+$/, "");
    // Two locks: one so tabs take turns syncing, one for token refresh, which runs inside a sync.
    const withNamedLock = withLock || ((name, fn) => (root.navigator?.locks?.request ? root.navigator.locks.request(name, fn) : fn()));
    const lock = (fn) => withNamedLock("hb-account-sync", fn);

    function readSession() {
      try {
        const session = JSON.parse(storage.getItem(sessionKey) || "null");
        return session?.refreshToken && session?.user?.id ? session : null;
      } catch (error) {
        return null;
      }
    }

    function writeSession(session) {
      if (session) storage.setItem(sessionKey, JSON.stringify(session));
      else storage.removeItem(sessionKey);
    }

    function sessionFromTokens(body, user) {
      const expiresInMs = Number(body.expires_in || 3600) * 1000;
      return {
        accessToken: body.access_token,
        refreshToken: body.refresh_token,
        expiresAt: now() + expiresInMs,
        user: { id: String(user?.id || ""), email: String(user?.email || "") }
      };
    }

    async function request(path, { method = "GET", body, token = "", headers = {} } = {}) {
      let response;
      try {
        response = await fetchImpl(`${baseUrl}${path}`, {
          method,
          headers: {
            apikey: publishableKey,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
            ...headers
          },
          body: body !== undefined ? JSON.stringify(body) : undefined
        });
      } catch (error) {
        throw new SyncError("You appear to be offline.", { offline: true });
      }
      const text = await response.text();
      return { status: response.status, ok: response.ok, body: readJson(text) };
    }

    async function sendCode(email) {
      const result = await request("/auth/v1/otp", { method: "POST", body: { email, create_user: true } });
      if (!result.ok) throw new SyncError(describeAuthError(result.status, result.body), { status: result.status });
      return true;
    }

    async function verifyCode(email, code) {
      const result = await request("/auth/v1/verify", { method: "POST", body: { type: "email", email, token: code } });
      if (!result.ok || !result.body?.access_token) throw new SyncError(describeAuthError(result.status, result.body), { status: result.status });
      const session = sessionFromTokens(result.body, result.body.user);
      writeSession(session);
      return session.user;
    }

    // Fallback for an email that carries a sign-in link instead of a code: the link returns here
    // with tokens in the fragment. The caller removes the fragment from the address bar.
    async function completeRedirect(fragment) {
      const params = new URLSearchParams(String(fragment || "").replace(/^#/, ""));
      if (params.get("error")) throw new SyncError("That sign-in link didn't work. It may have expired; ask for a new code.");
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      if (!accessToken || !refreshToken) return null;
      const result = await request("/auth/v1/user", { token: accessToken });
      if (!result.ok || !result.body?.id) throw new SyncError("That sign-in link didn't work. Please ask for a new code.");
      const session = sessionFromTokens({ access_token: accessToken, refresh_token: refreshToken, expires_in: params.get("expires_in") }, result.body);
      writeSession(session);
      return session.user;
    }

    // Refreshing rotates the refresh token, so tabs take turns (lock) and re-read the session first.
    async function accessToken({ force = false } = {}) {
      const current = readSession();
      if (!current) throw new SyncError("Signed out.", { code: "signed-out" });
      const fresh = (session) => session.accessToken && session.expiresAt - now() > REFRESH_MARGIN_MS;
      if (!force && fresh(current)) return current.accessToken;
      return withNamedLock("hb-account-token", async () => {
        const session = readSession();
        if (!session) throw new SyncError("Signed out.", { code: "signed-out" });
        // Another tab may have refreshed while this one waited for the lock.
        if (fresh(session) && (!force || session.accessToken !== current.accessToken)) return session.accessToken;
        const result = await request("/auth/v1/token?grant_type=refresh_token", { method: "POST", body: { refresh_token: session.refreshToken } });
        if (result.status === 400 || result.status === 401 || result.status === 403) {
          writeSession(null);
          throw new SyncError("Your sign-in has ended. Please sign in again.", { code: "signed-out", status: result.status });
        }
        if (!result.ok || !result.body?.access_token) throw new SyncError("Couldn't reach the sync service.", { status: result.status });
        const next = sessionFromTokens(result.body, result.body.user || session.user);
        writeSession(next);
        return next.accessToken;
      });
    }

    // A 401 can mean the access token ended before its stated expiry (a device clock that is off,
    // for example); refresh once and retry before treating the visitor as signed out.
    async function rest(path, options = {}) {
      let result = await request(path, { ...options, token: await accessToken() });
      if (result.status === 401) result = await request(path, { ...options, token: await accessToken({ force: true }) });
      if (result.status === 401) {
        throw new SyncError("Your sign-in has ended. Please sign in again.", { code: "signed-out", status: 401 });
      }
      return result;
    }

    function fail(result, message) {
      throw new SyncError(message, { status: result.status, code: result.body?.code || "" });
    }

    const api = {
      async listTrips() {
        const result = await rest("/rest/v1/trips?select=id,title,deleted,updated_at,content_hash");
        if (!result.ok || !Array.isArray(result.body)) fail(result, "Couldn't read your synced trips.");
        return result.body;
      },
      async fetchTrips(ids) {
        const list = ids.filter((id) => TRIP_ID.test(id));
        if (!list.length) return [];
        const result = await rest(`/rest/v1/trips?select=id,title,payload,deleted,updated_at,content_hash&id=in.(${list.map(encodeURIComponent).join(",")})`);
        if (!result.ok || !Array.isArray(result.body)) fail(result, "Couldn't read your synced trips.");
        return result.body;
      },
      // Returns the stored row, or null when a trip with this id already exists online.
      async insertTrip(record) {
        const result = await rest("/rest/v1/trips", { method: "POST", body: record, headers: { Prefer: "return=representation" } });
        if (result.status === 409) return null;
        if (!result.ok && /trip limit/i.test(result.body?.message || "")) throw new SyncError("Trip limit reached.", { code: "trip-limit" });
        if (!result.ok || !Array.isArray(result.body) || !result.body[0]) fail(result, "Couldn't save a trip online.");
        return result.body[0];
      },
      // Writes only if the row is unchanged since ifUpdatedAt; returns null when someone wrote first.
      async updateTrip(record, ifUpdatedAt) {
        const { id, ...fields } = record;
        const result = await rest(`/rest/v1/trips?id=eq.${encodeURIComponent(id)}&updated_at=eq.${encodeURIComponent(ifUpdatedAt)}`, {
          method: "PATCH", body: fields, headers: { Prefer: "return=representation" }
        });
        if (!result.ok || !Array.isArray(result.body)) fail(result, "Couldn't save a trip online.");
        return result.body[0] || null;
      },
      async deleteAccount() {
        const result = await rest("/rest/v1/rpc/delete_my_account", { method: "POST", body: {} });
        if (!result.ok) fail(result, "Couldn't delete your account. Please try again.");
        writeSession(null);
        return true;
      }
    };

    async function signOut() {
      const session = readSession();
      writeSession(null);
      if (!session?.accessToken || session.expiresAt <= now()) return;
      try {
        await request("/auth/v1/logout?scope=local", { method: "POST", token: session.accessToken });
      } catch (error) {
        // Signed out locally either way; the online session expires on its own.
      }
    }

    return {
      api, sendCode, verifyCode, completeRedirect, signOut, accessToken, lock,
      currentUser: () => readSession()?.user || null
    };
  }

  root.HB_ACCOUNT_SYNC = {
    TRIP_ID, MAX_TRIPS, MAX_PAYLOAD_CHARS, CONFLICT_SUFFIX,
    hashText, contentHash, toSyncPayload, cleanRemoteDraft, planSync, runSync, createClient, SyncError
  };
})(typeof window !== "undefined" ? window : globalThis);
