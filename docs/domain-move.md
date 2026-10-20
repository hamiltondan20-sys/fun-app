# Domain move runbook: thefullestlifetravel.com

Status: prepared on October 19, 2026. Nothing has changed yet. The move starts when the owner buys the domain.

Target: `https://thefullestlifetravel.com/`, served by GitHub Pages from this repo. It is a project site today
(`https://hamiltondan20-sys.github.io/fun-app/`). With a custom domain the site is served from the root, so the
`/fun-app` path prefix goes away.

## The one real risk: trips saved in visitors' browsers

Saved trips, versions, booking notes and the profile live in browser storage. That storage belongs to the old
address, `hamiltondan20-sys.github.io`. Once a custom domain is set, GitHub Pages redirects every old URL to the new
domain. The old pages never load again, so the new site can't see those trips.

Three ways to keep them, used together:

1. **Advance notice.** Restore the "preparing to move" banner a few weeks before the cutover. It asks visitors to
   export a backup or turn on account sync.
2. **Account sync, if it's switched on first.** Signed-in visitors' trips are already in their account and simply
   appear on the new domain after they sign in again.
3. **A carry-over page.** Browser storage is shared by every page on `hamiltondan20-sys.github.io`, whatever the
   path. So a small page in a separate repo (`fun-app-move`, served at
   `https://hamiltondan20-sys.github.io/fun-app-move/`) can still read the old trips after the redirect.
   - What it does: packs them into a link to `https://thefullestlifetravel.com/plan/#import=…`, compressed like share
     links and kept in the URL fragment, which browsers never send to a server.
   - The new site's part: it imports them, asking before replacing anything, as backup restore does now.
   - Where visitors find it: the banner, and the new site's Saved screen ("Trips from the old address?").

The import side can be built and tested before the domain exists. The carry-over page needs its own small repo.

## Owner steps

1. **Buy the domain** at Porkbun ($11.08 a year).
2. **Verify it in GitHub** to stop anyone else claiming it. Go to github.com → Settings → Pages → "Verified domains" →
   Add `thefullestlifetravel.com`, then add the TXT record GitHub shows at Porkbun.
3. **DNS at Porkbun:**
   - remove Porkbun's default "parked" records
   - add these, with the addresses from GitHub's Pages documentation:

| Type | Host | Value |
|---|---|---|
| A | (blank, the apex) | 185.199.108.153 |
| A | (blank) | 185.199.109.153 |
| A | (blank) | 185.199.110.153 |
| A | (blank) | 185.199.111.153 |
| AAAA | (blank) | 2606:50c0:8000::153 |
| AAAA | (blank) | 2606:50c0:8001::153 |
| AAAA | (blank) | 2606:50c0:8002::153 |
| AAAA | (blank) | 2606:50c0:8003::153 |
| CNAME | www | hamiltondan20-sys.github.io |

4. **Wait** for DNS to spread. It's usually under an hour, and can take up to a day.

## Cutover (Claude, after the owner's go-ahead)

1. **Point the site at the new address:**
   - Generated pages: run `generate-pages.mjs` with `--base=` (empty) and `--origin=https://thefullestlifetravel.com`.
     The CI workflow and `scripts/generate-sitemap.js` carry the same two arguments.
   - Files that still name the old address directly:
     - `code.html` and `plan/index.html`: canonical, `og:image`, `twitter:image`
     - `manifest.webmanifest`: `start_url`, `scope` and icon paths
     - `404.html`: four `/fun-app/` links
     - `scripts/app-ui.js`: `publicSiteUrl`
     - `scripts/check-release.js`: `sitemapBase`
     - the expected URLs in `publication-gates.test.mjs` and `planner-paths.test.mjs`
2. **Leave the calendar event IDs alone.** Keep `UID_DOMAIN` in `scripts/trip-export.js` as it is. Event IDs must
   never change, or a re-export would duplicate events in people's calendars.
3. **Privacy page.** Replace "delete storage for hamiltondan20-sys.github.io" with the new domain, and add a line
   about the carry-over page.
4. **GitHub Pages settings:** set the custom domain to `thefullestlifetravel.com`, wait for the certificate, then turn
   on "Enforce HTTPS". GitHub then redirects every old URL to the new domain.
5. **Supabase**, if sync is on: add `https://thefullestlifetravel.com/plan/` under Authentication → URL Configuration,
   keep the old address there during the move, and set up email sending from the new domain.
6. **Google Search Console:** add the new domain property, submit `sitemap.xml`, and use the Change of Address tool.
7. **Checks:**
   - Old guide URLs redirect to the matching new URL.
   - The sitemap lists only new URLs.
   - The release check passes.
   - Share links made before the move still open: they carry the trip in the link itself, and the redirect keeps the
     part after `#`.
   - The carry-over page moves a test trip.

## Afterwards

- Remove the banner a few weeks after the move.
- Keep the carry-over page for at least six months.
