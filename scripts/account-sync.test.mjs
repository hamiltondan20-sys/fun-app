import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createFakeSupabase } from "./fake-supabase.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clone = (value) => JSON.parse(JSON.stringify(value));

function loadSync() {
  const context = vm.createContext({ window: {}, JSON, Math, Date, URL, URLSearchParams, encodeURIComponent, Error });
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/account-sync.js"), "utf8"), context);
  return context.window.HB_ACCOUNT_SYNC;
}

function memoryStorage() {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key)
  };
}

let idCounter = 0;
const newId = (prefix) => `${prefix}_test${(++idCounter).toString(16).padStart(6, "0")}`;

function makeDraft(id, title, extra = {}) {
  return {
    savedAt: "Oct 16, 9:00 AM",
    savedAtMs: 1760600000000,
    appState: { destination: "Paris, France", startDate: "2026-11-06", endDate: "2026-11-12" },
    currentTrip: { tripId: id, title, days: [{ id: "day_1", title: "Museum day", item: { timeline: [] } }] },
    liveDraftTrip: null,
    likedTrip: null,
    alternateTrips: [],
    tripProfile: { displayName: "Dana", email: "private-profile@example.com", homeAirport: "DEN" },
    bookingItems: { "meal-dinner": { status: "booked", note: "Table for two" } },
    activeTripSource: { type: "live", versionId: "", name: "" },
    ...extra
  };
}

function device(sync, fake) {
  const storage = memoryStorage();
  const client = sync.createClient({
    url: "https://fake.supabase.co/", publishableKey: "sb_publishable_test", fetch: fake.fetch, storage, withLock: (name, fn) => fn()
  });
  const trips = new Map();
  let base = { trips: {} };
  const hashOf = (id) => (trips.has(id) ? sync.contentHash(trips.get(id)) : null);
  const store = {
    listEntries: () => [...trips.values()].map((draft) => ({ id: draft.currentTrip.tripId, draft: clone(draft) })),
    putEntry(draft, { expectedHash }) {
      if (hashOf(draft.currentTrip.tripId) !== expectedHash) return false;
      trips.set(draft.currentTrip.tripId, clone(draft));
      return true;
    },
    removeEntry(id, { expectedHash }) {
      if (hashOf(id) !== expectedHash) return false;
      trips.delete(id);
      return true;
    },
    readBase: () => clone(base),
    writeBase: (next) => { base = clone(next); }
  };
  return {
    client, store, trips, storage,
    base: () => base,
    setBase: (next) => { base = clone(next); },
    add(draft) { trips.set(draft.currentTrip.tripId, clone(draft)); },
    edit(id, change) { const draft = trips.get(id); change(draft); },
    async signIn(email) {
      await client.sendCode(email);
      return client.verifyCode(email, fake.lastCode(email));
    },
    sync: (options = {}) => sync.runSync({ api: client.api, store, newId, ...options }),
    titles: () => [...trips.values()].map((draft) => draft.currentTrip.title).sort()
  };
}

test("content identity ignores save times and the local profile, which never syncs", () => {
  const sync = loadSync();
  const draft = makeDraft("trp_a", "Paris");
  const resaved = { ...clone(draft), savedAt: "later", savedAtMs: 1, tripProfile: { email: "other@example.com" } };
  assert.equal(sync.contentHash(draft), sync.contentHash(resaved));
  const edited = clone(draft);
  edited.currentTrip.days[0].title = "Garden day";
  assert.notEqual(sync.contentHash(draft), sync.contentHash(edited));
  const payload = sync.toSyncPayload(draft);
  assert.equal("tripProfile" in payload, false);
  assert.equal(JSON.stringify(payload).includes("private-profile@example.com"), false);
  assert.deepEqual(payload.bookingItems, draft.bookingItems);
});

test("the merge plan covers new, changed, deleted and conflicting trips", () => {
  const sync = loadSync();
  const types = (input) => [...sync.planSync(input)].map((action) => `${action.type}:${action.id}`).sort();
  const row = (id, updated_at, extra = {}) => ({ id, updated_at, deleted: false, content_hash: `remote-${updated_at}`, ...extra });
  assert.deepEqual(types({ local: [{ id: "trp_new", hash: "h1" }] }), ["upload:trp_new"]);
  assert.deepEqual(types({ remote: [row("trp_theirs", "t1")] }), ["download:trp_theirs"]);
  const base = { trp_x: { hash: "h1", remoteUpdatedAt: "t1" } };
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h1" }], remote: [row("trp_x", "t1")], base }), []);
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h2" }], remote: [row("trp_x", "t1")], base }), ["upload:trp_x"]);
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h1" }], remote: [row("trp_x", "t2")], base }), ["download:trp_x"]);
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h2" }], remote: [row("trp_x", "t2")], base }), ["conflict:trp_x"]);
  // Both sides made the same change: just record it.
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h2" }], remote: [row("trp_x", "t2", { content_hash: "h2" })], base }), ["record:trp_x"]);
  // Deleted here, unchanged online: delete online. Changed online since: bring it back.
  assert.deepEqual(types({ remote: [row("trp_x", "t1")], base }), ["delete-remote:trp_x"]);
  assert.deepEqual(types({ remote: [row("trp_x", "t2")], base }), ["download:trp_x"]);
  // Deleted online, unchanged here: delete here. Changed here since: keep it and upload again.
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h1" }], remote: [row("trp_x", "t2", { deleted: true })], base }), ["delete-local:trp_x"]);
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h2" }], remote: [row("trp_x", "t2", { deleted: true })], base }), ["upload:trp_x"]);
  // First sync of a trip that exists on both sides with different content keeps both.
  assert.deepEqual(types({ local: [{ id: "trp_x", hash: "h9" }], remote: [row("trp_x", "t1")] }), ["conflict:trp_x"]);
  assert.deepEqual(types({ base }), ["forget:trp_x"]);
});

test("sign-in by emailed code, token refresh and sign-out", async () => {
  const sync = loadSync();
  let clock = 1_000_000;
  const fake = createFakeSupabase({ now: () => clock });
  const storage = memoryStorage();
  const client = sync.createClient({ url: "https://fake.supabase.co", publishableKey: "sb_publishable_test", fetch: fake.fetch, storage, now: () => clock, withLock: (name, fn) => fn() });

  await assert.rejects(client.sendCode("not-an-email"), /check the email address/);
  await client.sendCode("traveler@example.test");
  await assert.rejects(client.verifyCode("traveler@example.test", "000000"), /may have expired/);
  assert.equal(client.currentUser(), null);
  const user = await client.verifyCode("traveler@example.test", fake.lastCode("traveler@example.test"));
  assert.equal(user.email, "traveler@example.test");
  assert.deepEqual({ ...client.currentUser() }, { ...user });

  // The publishable key goes in apikey; the visitor's own token authorizes table access.
  const first = await client.accessToken();
  assert.deepEqual([...await client.api.listTrips()], []);
  clock += 3600 * 1000; // An hour later the access token is refreshed (and the refresh token rotates).
  const second = await client.accessToken();
  assert.notEqual(first, second);
  assert.deepEqual([...await client.api.listTrips()], []);

  // A token the server ended early is refreshed once and the request retried.
  fake.expireAccessTokens();
  assert.deepEqual([...await client.api.listTrips()], []);

  // A revoked refresh token signs the visitor out cleanly.
  fake.expireAccessTokens();
  fake.revokeRefreshTokens();
  await assert.rejects(client.api.listTrips(), (error) => error.code === "signed-out");
  assert.equal(client.currentUser(), null);

  await client.sendCode("traveler@example.test");
  await client.verifyCode("traveler@example.test", fake.lastCode("traveler@example.test"));
  await client.signOut();
  assert.equal(client.currentUser(), null);
  assert.equal(storage.getItem("hb-account-session-v1"), null);

  const offline = sync.createClient({ url: "https://fake.supabase.co", publishableKey: "k", fetch: async () => { throw new TypeError("Failed to fetch"); }, storage: memoryStorage() });
  await assert.rejects(offline.sendCode("traveler@example.test"), (error) => error.offline === true);
});

test("two devices: trips, edits and deletions follow the visitor, and conflicts keep both versions", async () => {
  const sync = loadSync();
  const fake = createFakeSupabase();
  const phone = device(sync, fake);
  const laptop = device(sync, fake);
  await phone.signIn("traveler@example.test");
  await laptop.signIn("traveler@example.test");

  phone.add(makeDraft("trp_paris", "Paris in November"));
  assert.equal((await phone.sync()).uploaded, 1);
  assert.equal((await laptop.sync()).downloaded, 1);
  assert.deepEqual(laptop.titles(), ["Paris in November"]);
  // Nothing changed: a second pass sends nothing.
  const writes = fake.log.filter((entry) => entry.method !== "GET").length;
  await phone.sync();
  await laptop.sync();
  assert.equal(fake.log.filter((entry) => entry.method !== "GET").length, writes);

  laptop.edit("trp_paris", (draft) => { draft.currentTrip.days[0].title = "Orsay morning"; });
  await laptop.sync();
  await phone.sync();
  assert.equal(phone.trips.get("trp_paris").currentTrip.days[0].title, "Orsay morning");
  // Synced copies carry no profile; the planner keeps each browser's own.
  assert.equal("tripProfile" in phone.trips.get("trp_paris"), false);

  // Both edit before syncing: each device ends with both versions.
  phone.edit("trp_paris", (draft) => { draft.currentTrip.days[0].title = "Phone edit"; });
  laptop.edit("trp_paris", (draft) => { draft.currentTrip.days[0].title = "Laptop edit"; });
  await phone.sync();
  const result = await laptop.sync();
  assert.equal(result.conflicts, 1);
  // The other device hears about the conflict too, not just "a trip was updated".
  assert.equal((await phone.sync()).conflicts, 1);
  assert.deepEqual(phone.titles(), ["Paris in November", "Paris in November (conflicting copy)"]);
  assert.deepEqual(laptop.titles(), phone.titles());
  assert.equal(laptop.trips.get("trp_paris").currentTrip.days[0].title, "Laptop edit");
  const copy = [...laptop.trips.values()].find((draft) => draft.currentTrip.tripId !== "trp_paris");
  assert.equal(copy.currentTrip.days[0].title, "Phone edit");

  // Deleting on one device removes the trip everywhere.
  laptop.trips.delete(copy.currentTrip.tripId);
  assert.equal((await laptop.sync()).removedOnline, 1);
  assert.equal((await phone.sync()).removedHere, 1);
  assert.deepEqual(phone.titles(), ["Paris in November"]);

  // A trip edited on one device after being deleted on another is kept, not lost.
  phone.add(makeDraft("trp_rome", "Rome"));
  await phone.sync();
  await laptop.sync();
  laptop.trips.delete("trp_rome");
  await laptop.sync();
  phone.edit("trp_rome", (draft) => { draft.currentTrip.title = "Rome, edited"; });
  await phone.sync();
  await laptop.sync();
  assert.deepEqual(laptop.titles(), ["Paris in November", "Rome, edited"]);

  // The local profile never reached the server; booking progress did (it belongs to the trip).
  const stored = JSON.stringify(fake.rowsFor("traveler@example.test"));
  assert.equal(stored.includes("private-profile@example.com"), false);
  assert.equal(stored.includes("Table for two"), true);
});

test("a write that loses a race is re-planned instead of overwriting the other device", async () => {
  const sync = loadSync();
  const fake = createFakeSupabase();
  const phone = device(sync, fake);
  const laptop = device(sync, fake);
  await phone.signIn("traveler@example.test");
  await laptop.signIn("traveler@example.test");
  phone.add(makeDraft("trp_paris", "Paris"));
  await phone.sync();
  await laptop.sync();

  // The phone reads the rows, then the laptop writes before the phone does.
  const staleRows = await phone.client.api.listTrips();
  laptop.edit("trp_paris", (draft) => { draft.currentTrip.title = "Laptop title"; });
  await laptop.sync();
  phone.edit("trp_paris", (draft) => { draft.currentTrip.title = "Phone title"; });
  let first = true;
  const api = { ...phone.client.api, listTrips: async () => (first ? ((first = false), staleRows) : phone.client.api.listTrips()) };
  const result = await sync.runSync({ api, store: phone.store, newId });
  assert.equal(result.passes, 2);
  assert.equal(result.conflicts, 1);
  assert.deepEqual(phone.titles(), ["Laptop title (conflicting copy)", "Phone title"]);
});

test("local-only trips, the trip limit, oversized trips and unreadable rows are skipped", async () => {
  const sync = loadSync();
  const fake = createFakeSupabase({ tripLimit: 2 });
  const phone = device(sync, fake);
  await phone.signIn("traveler@example.test");

  phone.add(makeDraft("trp_private", "Kept on this browser"));
  phone.setBase({ trips: {}, localOnly: ["trp_private"] });
  phone.add(makeDraft("trp_one", "One"));
  phone.add(makeDraft("trp_two", "Two"));
  phone.add(makeDraft("trp_three", "Three"));
  phone.add(makeDraft("trp_huge", "Huge", { bookingItems: { note: { note: "x".repeat(sync.MAX_PAYLOAD_CHARS) } } }));
  const result = await phone.sync();
  assert.equal(result.uploaded, 2);
  assert.deepEqual([...result.skipped].map((item) => item.reason).sort(), ["too-large", "trip-limit"]);
  assert.equal(fake.rowsFor("traveler@example.test").some((row) => row.id === "trp_private"), false);
  assert.deepEqual([...phone.base().localOnly], ["trp_private"]);

  // A row that doesn't hold a readable trip is reported, not loaded; ids are forced to match.
  assert.equal(sync.cleanRemoteDraft("not a trip", "trp_x"), null);
  assert.equal(sync.cleanRemoteDraft({ currentTrip: { days: "nope" } }, "trp_x"), null);
  assert.equal(sync.cleanRemoteDraft(makeDraft("trp_a", "A"), "../etc"), null);
  const fixed = sync.cleanRemoteDraft(makeDraft("trp_other", "A"), "trp_x");
  assert.equal(fixed.currentTrip.tripId, "trp_x");
  assert.equal("tripProfile" in fixed, false);
});

test("a token refresh inside a locked sync pass doesn't wait on the sync's own lock", async () => {
  const sync = loadSync();
  const fake = createFakeSupabase();
  // Non-reentrant named locks, like navigator.locks.
  const tails = new Map();
  const withLock = (name, fn) => {
    const run = (tails.get(name) || Promise.resolve()).then(() => fn());
    tails.set(name, run.catch(() => {}));
    return run;
  };
  const client = sync.createClient({ url: "https://fake.supabase.co", publishableKey: "k", fetch: fake.fetch, storage: memoryStorage(), withLock });
  await client.sendCode("traveler@example.test");
  await client.verifyCode("traveler@example.test", fake.lastCode("traveler@example.test"));
  fake.expireAccessTokens();
  const store = device(sync, fake).store;
  const result = await Promise.race([
    client.lock(() => sync.runSync({ api: client.api, store, newId })),
    new Promise((resolve) => setTimeout(() => resolve("deadlock"), 1000))
  ]);
  assert.notEqual(result, "deadlock");
});

test("deleting the account removes the online copies and signs out", async () => {
  const sync = loadSync();
  const fake = createFakeSupabase();
  const phone = device(sync, fake);
  await phone.signIn("traveler@example.test");
  phone.add(makeDraft("trp_paris", "Paris"));
  await phone.sync();
  assert.equal(fake.rowsFor("traveler@example.test").length, 1);
  await phone.client.api.deleteAccount();
  assert.equal(phone.client.currentUser(), null);
  assert.equal(fake.users.has("traveler@example.test"), false);
  // The browser copy is untouched.
  assert.deepEqual(phone.titles(), ["Paris"]);
});
