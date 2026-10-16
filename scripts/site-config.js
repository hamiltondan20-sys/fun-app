(function () {
  window.HB_ANALYTICS_ID = window.HB_ANALYTICS_ID || "";
  // Account sync (docs/account-sync.md). Both values come from the Supabase dashboard
  // (Project Settings -> API). The publishable key is meant to be public: row-level security in
  // supabase/schema.sql is what keeps each account's trips private. Empty = sync is off.
  window.HB_SYNC_CONFIG = window.HB_SYNC_CONFIG || { url: "", publishableKey: "" };
})();
