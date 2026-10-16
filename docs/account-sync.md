# Account sync

Status: built October 16, 2026; **off** until the owner sets up the Supabase project (below).
Provider chosen by the owner October 16: Supabase.

## What it does

- **Sign-in.** A visitor signs in with their email and a 6-digit code: no password, and the same
  email works on every device.
- **What syncs.** Their trips, with saved versions and booking progress and notes, follow them to
  every signed-in device.
- **Without an account.** The planner works exactly as before. The browser stays the working copy,
  and sync only copies whole trips up and down.
- **Never synced.** The planner profile (display name, optional profile email, home airport) and the
  analytics choice (decision 3 and the privacy table in `docs/trip-format-v2.md`).

## How it works

- **Data.** One row per trip in the `trips` table (`supabase/schema.sql`). The row holds the trip's
  saved draft (the same object the browser keeps in `hb-trips-v2`) minus the profile, plus a
  content hash and a server-set `updated_at`.
- **Who can see what.** Row-level security limits every account to its own rows. The anonymous role
  has no table access. Each account can hold up to 200 trips, and each trip is limited to about
  1 MB.
- **Client.** `scripts/account-sync.js` talks to Supabase's Auth and REST endpoints with `fetch`; no
  client library is loaded. Nothing contacts Supabase until a visitor signs in, and nothing at all
  while `scripts/site-config.js` is empty.
- **Merge.** Each device remembers what both sides held after its last sync (`hb-sync-base-v1`).
  For every trip:

  | This device | Online | Result |
  |---|---|---|
  | changed | unchanged | upload |
  | unchanged | changed | download (if the trip is open on screen, it refreshes) |
  | changed | changed | **keep both**: this device's version keeps the trip, the other becomes "… (conflicting copy)" |
  | deleted | unchanged | delete online (a deletion marker tells other devices) |
  | deleted | changed | bring it back (an edit elsewhere is not lost to a deletion here) |
  | unchanged | deleted | delete here |
  | changed | deleted | keep it and upload again |

- **No lost updates.** Every write is conditional on the row's `updated_at`. When another device
  wrote first, the pass re-plans, so it never overwrites.
- **Unsaved work is safe.** A trip with unsaved changes on screen is never replaced mid-edit.
- **When it runs.**
  - about 4 seconds after any save
  - on load
  - when the tab comes back (at most once a minute)
  - when the connection returns
  - on "Sync now"

  Tabs take turns (`navigator.locks`).
- **First sign-in on a browser that already has trips.** The visitor chooses "Add them to my
  account" or "Keep them on this browser only". Kept trips never upload; trips made later sync
  normally.
- **Sign out.** The visitor chooses between "keep trips here" and "remove my trips from this
  browser". Remove deletes only trips whose online copy matches, so unsynced work stays.
- **Delete account.** `delete_my_account()` deletes the sign-in, and the cascade deletes every
  synced trip. Trips in the browser stay.
- **Privacy policy.** `scripts/generate-pages.mjs` switches the privacy page to the account wording
  automatically once `site-config.js` names a project.

Tests: `scripts/account-sync.test.mjs`, against the in-memory stand-in `scripts/fake-supabase.mjs`.
The tests cover two devices, conflicts, deletions both ways, a lost race, token refresh,
revoked sessions, the trip limit, oversized trips and account deletion.

## Owner setup (one time, about 20 minutes)

These steps are yours to do: they create an account and accept Supabase's terms.

1. **Create the project.** Sign up at supabase.com and create a project on the free plan.
   - Pick the region closest to most visitors.
   - Save the database password somewhere safe. The site never needs it.
2. **Create the table.** In **SQL Editor**, open a new query, paste all of `supabase/schema.sql`
   and click **Run**. It should finish without errors, and it is safe to run again.
3. **Turn on email sign-in.** Under **Authentication → Sign In / Providers**, make sure **Email** is
   enabled. Leave the other providers off.
4. **Send a code instead of a link.** Under **Authentication → Emails**, edit both the **Magic
   Link** and **Confirm signup** templates so the email shows the code. For example:

   ```html
   <h2>Your sign-in code</h2>
   <p>Enter this code in The Fullest Life Travel planner: <strong>{{ .Token }}</strong></p>
   <p>It expires in one hour. If you didn't ask for it, you can ignore this email.</p>
   ```

   A code works even when the email opens in a different browser or app than the planner. A
   link would sign in the wrong browser. (If a link is ever clicked, the planner still accepts it.)
5. **Set the site address.** Under **Authentication → URL Configuration**, set **Site URL** to
   `https://hamiltondan20-sys.github.io/fun-app/plan/` and add the same address under **Redirect
   URLs**. After the domain move, add the new address there too.
6. **Send me two values.** From **Project Settings → API Keys** (or **Data API**), send me:
   - the **Project URL** (`https://<something>.supabase.co`)
   - the **publishable key** (`sb_publishable_…`, or the legacy `anon` key)

   Both are designed to be public, because row-level security is what protects the data.
   **Never send the `secret` or `service_role` key.** It bypasses all security and must not
   appear in the site.
7. **Before inviting real visitors, set up your own email sending.** Supabase's built-in email
   only sends to members of your Supabase team, with a low hourly limit. That's fine for testing
   with your own address.
   - **Where:** **Authentication → Emails → SMTP Settings**.
   - **Provider:** for example Resend, Postmark or Amazon SES. Each needs a sending domain, which
     fits with the domain move.

Free-plan projects pause after about a week without activity. A paused project shows a "Sync
didn't finish" message, and trips stay safe in browsers. Restore it from the dashboard. Upgrade
before relying on it for real visitors.

## Switching it on

1. Put the two values in `scripts/site-config.js` (`HB_SYNC_CONFIG.url` and `.publishableKey`).
2. Set `SYNC_POLICY_DATE` in `scripts/generate-pages.mjs` to the go-live date.
3. Bump the `site-config.js` version in `plan/index.html`.
4. Regenerate pages: the privacy page switches wording.
5. Test sign-in with the owner's own email on two devices.

## Not built yet

- Google or Apple sign-in (each needs the owner's developer-console setup).
- CAPTCHA on the sign-in form. Supabase supports hCaptcha and Turnstile; add it if code requests
  are abused.
- Syncing the planner profile or guide memory.
- Automatic background sync while the tab is closed.
