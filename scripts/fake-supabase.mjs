// An in-memory stand-in for the parts of Supabase that account sync uses (email-code sign-in,
// token refresh, the trips table with row-level security, and delete_my_account), following
// supabase/schema.sql. Test helper only; never loaded by the site.
export function createFakeSupabase({ now = () => Date.now(), tokenLifetimeSec = 3600, tripLimit = 200 } = {}) {
  const users = new Map(); // email -> { id, email }
  const codes = new Map(); // email -> code
  const accessTokens = new Map(); // token -> { userId, expiresAt }
  const refreshTokens = new Map(); // token -> userId
  const rows = []; // { user_id, id, title, payload, content_hash, deleted, updated_at }
  const log = [];
  let counter = 0;
  let clock = Date.parse("2026-10-16T12:00:00.000Z");

  // PostgREST returns microsecond timestamps; each write gets a distinct, increasing value.
  const timestamp = () => {
    clock += 1;
    counter += 1;
    return `${new Date(clock).toISOString().replace("Z", "")}${String(counter % 1000).padStart(3, "0")}+00:00`;
  };
  const token = (prefix) => `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;

  function issue(user) {
    const access = token("at");
    const refresh = token("rt");
    accessTokens.set(access, { userId: user.id, expiresAt: now() + tokenLifetimeSec * 1000 });
    refreshTokens.set(refresh, user.id);
    return { access_token: access, refresh_token: refresh, expires_in: tokenLifetimeSec, token_type: "bearer", user: { id: user.id, email: user.email } };
  }

  function authUser(headers) {
    const value = headers.Authorization || headers.authorization || "";
    const entry = accessTokens.get(value.replace(/^Bearer /, ""));
    if (!entry || entry.expiresAt <= now()) return null;
    return [...users.values()].find((user) => user.id === entry.userId) || null;
  }

  function project(row, select) {
    if (!select || select === "*") return { ...row };
    return Object.fromEntries(select.split(",").map((column) => [column, row[column] ?? null]));
  }

  function matches(row, params) {
    for (const [key, value] of params) {
      if (key === "select") continue;
      if (value.startsWith("eq.") && String(row[key]) !== value.slice(3)) return false;
      if (value.startsWith("in.(")) {
        const list = value.slice(4, -1).split(",").map(decodeURIComponent);
        if (!list.includes(String(row[key]))) return false;
      }
    }
    return true;
  }

  function respond(status, body) {
    const text = body === undefined ? "" : JSON.stringify(body);
    return { status, ok: status >= 200 && status < 300, text: async () => text, json: async () => JSON.parse(text) };
  }

  async function handle(urlText, init = {}) {
    const url = new URL(urlText);
    const method = (init.method || "GET").toUpperCase();
    const headers = init.headers || {};
    const body = init.body ? JSON.parse(init.body) : undefined;
    log.push({ method, path: url.pathname, search: url.search, body });
    if (!headers.apikey) return respond(401, { message: "No API key found in request" });

    if (url.pathname === "/auth/v1/otp" && method === "POST") {
      const email = String(body?.email || "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return respond(400, { code: 400, error_code: "validation_failed", msg: "Unable to validate email address: invalid format" });
      if (!users.has(email)) users.set(email, { id: crypto.randomUUID(), email });
      codes.set(email, String(100000 + Math.floor(Math.random() * 900000)));
      return respond(200, {});
    }
    if (url.pathname === "/auth/v1/verify" && method === "POST") {
      const email = String(body?.email || "").trim().toLowerCase();
      if (!codes.has(email) || codes.get(email) !== body?.token) return respond(403, { code: 403, error_code: "otp_expired", msg: "Token has expired or is invalid" });
      codes.delete(email);
      return respond(200, issue(users.get(email)));
    }
    if (url.pathname === "/auth/v1/token" && url.searchParams.get("grant_type") === "refresh_token") {
      const userId = refreshTokens.get(body?.refresh_token);
      if (!userId) return respond(400, { code: 400, error_code: "refresh_token_not_found", msg: "Invalid Refresh Token: Refresh Token Not Found" });
      refreshTokens.delete(body.refresh_token);
      return respond(200, issue([...users.values()].find((user) => user.id === userId)));
    }
    if (url.pathname === "/auth/v1/user" && method === "GET") {
      const user = authUser(headers);
      return user ? respond(200, { id: user.id, email: user.email }) : respond(401, { msg: "invalid JWT" });
    }
    if (url.pathname === "/auth/v1/logout" && method === "POST") {
      accessTokens.delete(String(headers.Authorization || "").replace(/^Bearer /, ""));
      return respond(204);
    }

    const user = authUser(headers);
    if (url.pathname.startsWith("/rest/v1/") && !user) {
      // The anon role has no access to the table at all.
      return respond(401, { code: "42501", message: "permission denied for table trips" });
    }
    if (url.pathname === "/rest/v1/rpc/delete_my_account" && method === "POST") {
      for (let index = rows.length - 1; index >= 0; index--) if (rows[index].user_id === user.id) rows.splice(index, 1);
      users.delete(user.email);
      for (const [key, entry] of accessTokens) if (entry.userId === user.id) accessTokens.delete(key);
      for (const [key, userId] of refreshTokens) if (userId === user.id) refreshTokens.delete(key);
      return respond(204);
    }
    if (url.pathname === "/rest/v1/trips") {
      const params = [...url.searchParams.entries()];
      const own = rows.filter((row) => row.user_id === user.id);
      if (method === "GET") {
        return respond(200, own.filter((row) => matches(row, params)).map((row) => project(row, url.searchParams.get("select"))));
      }
      if (method === "POST") {
        if (!/^trp_[A-Za-z0-9_-]{1,80}$/.test(body?.id || "")) return respond(400, { code: "23514", message: "violates check constraint" });
        if (own.some((row) => row.id === body.id)) return respond(409, { code: "23505", message: "duplicate key value violates unique constraint \"trips_pkey\"" });
        if (own.length >= tripLimit) return respond(400, { code: "P0001", message: "trip limit reached" });
        const row = { user_id: user.id, id: body.id, title: body.title ?? "", payload: body.payload ?? null, content_hash: body.content_hash ?? null, deleted: Boolean(body.deleted), updated_at: timestamp() };
        rows.push(row);
        return respond(201, [{ ...row }]);
      }
      if (method === "PATCH") {
        const changed = own.filter((row) => matches(row, params));
        for (const row of changed) {
          Object.assign(row, { title: body.title ?? row.title, payload: body.payload, content_hash: body.content_hash, deleted: Boolean(body.deleted), updated_at: timestamp() });
        }
        return respond(200, changed.map((row) => ({ ...row })));
      }
    }
    return respond(404, { message: "not found" });
  }

  return {
    fetch: (url, init) => handle(url, init),
    lastCode: (email) => codes.get(String(email).toLowerCase()),
    rowsFor: (email) => rows.filter((row) => row.user_id === users.get(String(email).toLowerCase())?.id),
    users,
    log,
    // Ends every access token early, as if an hour had passed.
    expireAccessTokens() { for (const entry of accessTokens.values()) entry.expiresAt = 0; },
    revokeRefreshTokens() { refreshTokens.clear(); }
  };
}
