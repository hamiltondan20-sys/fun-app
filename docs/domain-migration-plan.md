# Custom Domain Decision

Refreshed October 7, 2026. Planning only: no domain, DNS, site configuration,
canonical, email address or sitemap has been changed.

## Latest prerequisite results

October 7: a real cross-origin test found named versions lost when an older
stored draft had an empty version list. The local importer fix now restores the
export-time list into active state and persistent storage. Retesting passed
import, reload, Restore draft and exact full-version re-export comparison.
See docs/backup-migration-test-2026-10-07.md. Deployment approval is still pending.

Porkbun's live exact-domain search lists thefullestlifetravel.com as available:
USD 11.08 for one year, renewal USD 11.08/year at today's rate. Its public
non-premium price table includes ICANN and other fees. Future renewal rates can
change; this is not a guaranteed lifetime price or a completed checkout.
Sources: https://porkbun.com/checkout/search?q=thefullestlifetravel.com and
https://porkbun.com/products/domains. No cart addition or purchase was made.
User price acceptance, deployment of the backup fix and coordinated cutover
approval remain required. No domain configuration is authorized by these tests.

## October 7 decision checkpoint

Current build: 189 destination guides, 19 country hubs, 217 sitemap URLs.
Ten detail reviews and 179 pending-review labels are live. Preserve these
labels, evidence dates, sample-day notices and all publication thresholds.

Today's live RDAP requests returned HTTP 404 for all three candidates: Verisign
for .com, Identity Digital for .travel, and rdap.org's .co lookup. This means
no registration record was returned, not guaranteed retail availability. No
purchase, DNS or domain-binding action was taken.

Today's read-only header check again returned an actual HTTP 301 from
https://twbs.github.io/bootstrap/docs/5.3/ to
http://getbootstrap.com/docs/5.3/. GitHub's documentation describes custom-domain
configuration but does not specify every old-project redirect status/path
detail; the 301 status is directly observed, not quoted from that documentation.
Verify our own old paths, query strings and HTTPS chain at cutover.

Live browser check of /fun-app/plan/#saved confirmed both Export backup and
Restore backup under Beta local account. No personal draft was exported or
overwritten in this check. Export/import reachability is confirmed; successful
cross-origin restoration is not yet confirmed. The importer validates payload
type, not the filename or product branding. Current export filenames use
the-fullest-life-travel-.

### Required cross-origin test before cutover

1. Use disposable test data on the existing origin: a profile, destination,
   named trip version and booking note/status. Export through the actual UI.
   Do not overwrite a visitor's real draft for testing.
2. Open the migration build on a different origin, such as localhost on a test
   port. A different path on github.io is NOT a different origin.
3. Confirm the test origin starts without the old saved data; import the
   downloaded file through Saved > Beta local account > Restore backup.
4. Compare profile, draft, versions and booking notes/statuses with the original.
   Reload, restore the draft again and verify persistence. Record the two
   origins, file and result. Do not report success based on source inspection
   or same-origin export alone.
5. Confirm analytics consent is requested separately on the new origin. Do not
   transfer consent as part of a trip backup.

Origin-scoped storage remains at the old origin; it is not deleted by moving.
The native redirect can prevent visitors from reaching that old interface to
export after cutover. Therefore provide advance notice and a recovery plan
before enabling the binding, rather than promising loss-free migration.

October 10: the move is on hold while the site is built out, so the live
"preparing to move" notice was removed from the planner and Saved panel. Restore
it a few weeks before an agreed cutover date (wording below).

Proposed pre-cutover notice, requiring separate approval before publication:
"We are moving to thefullestlifetravel.com on [confirmed date]. If you have a
saved trip, open Saved > Beta local account and choose Export backup before
that date. On the new site, choose Restore backup. Your saved trips do not
transfer automatically. Keep the backup private: it can contain your profile
and booking notes."

### File inventory additions and clarifications

The inventory below still applies. Include scripts/planner-paths.test.mjs
when updating root-path expectations. scripts/pull-city-pageviews.mjs contains
project references that must be inspected for active URL assumptions, not
blindly replaced. Preserve historical research URLs and evidence records.

plan/index.html contains <base href="../">: relative assets resolve one level
above /plan/, already supporting the app root. Do not mechanically add another
../. Edit its absolute metadata directly and test every resolved reference.
404.html is also directly maintained and requires root-path link checks.

Privacy, Terms and About are generated: update domain-specific source text and
metadata in scripts/generate-pages.mjs, then regenerate all three. Their
canonical and social metadata must use the new origin, even where body copy
does not name the host. Preserve the approved privacy practices and review
scope. No email change is required for this decision.

Decision requested: approve .com as the intended domain, subject to registrar
availability/renewal price, then approve a separately tested migration. Domain
purchase alone does not authorize DNS changes or deployment. No migration yet.

## Registration checks

| Candidate | Authoritative lookup result | Conclusion |
| --- | --- | --- |
| thefullestlifetravel.com | Verisign RDAP returned HTTP 404 | No registration record found |
| thefullestlifetravel.co | whois.registry.co returned DOMAIN NOT FOUND | No registration record found |
| thefullestlifetravel.travel | Identity Digital RDAP returned HTTP 404, Object not found | No registration record found |

These are registry observations, not a guarantee that a registrar can sell the
name. Confirm retail availability, premium status and renewal price before
purchasing. No registrant, registration date or expiry date was returned.
Recommend the .com if the registrar confirms it. Registration is a recurring
expense; GitHub Pages hosting can remain free. Do not purchase all three by default.

Checked endpoints:
- https://rdap.verisign.com/com/v1/domain/thefullestlifetravel.com
- https://rdap.identitydigital.services/rdap/domain/thefullestlifetravel.travel
- WHOIS TCP port 43 at whois.registry.co, as listed at https://www.iana.org/domains/root/db/co.html

## Redirects: server-side, with limits

GitHub Pages' native custom-domain binding redirects the original project URL
server-side. This is not limited to JavaScript or meta-refresh.
Read-only header checks on October 5 observed:

```text
https://twbs.github.io/bootstrap/docs/5.3/
301 Moved Permanently
Location: http://getbootstrap.com/docs/5.3/

https://impress.github.io/impress.js/
301 Moved Permanently
Location: http://impress.js.org/
```

The project prefix is removed and the remaining path is preserved. Our expected
mapping is /fun-app/destinations/austin/ on github.io to /destinations/austin/
on the new domain. Verify the actual status, HTTPS chain and query preservation
after binding; these other sites do not prove our future configuration.

GitHub Pages does not offer arbitrary per-page server redirect rules. Keep
existing route suffixes. A renamed route cannot acquire a custom HTTP 301 just
by adding .htaccess or a redirect configuration file to this repository.
Do not assume the old redirect survives removing the custom-domain binding.

Configure the custom domain on the fun-app PROJECT repository, not on the
hamiltondan20-sys.github.io user repository. A user-site domain is inherited by
projects at /fun-app/ unless the project has its own domain setting.
This project uses an Actions publishing workflow: a CNAME file is ignored and
is not a substitute for the Pages custom-domain setting.

Permanent redirects help transfer indexing signals and existing links, but
cannot guarantee rankings. Moving a new site now requires fewer accumulated
links and indexed URLs to settle than moving a mature site later.

## Files and settings to update after approval

Source configuration:
- scripts/generate-pages.mjs: origin default, any literal domain in policy copy.
- package.json: generation, sitemap and release-check command flags.
- .github/workflows/pages.yml: generator origin/base flags; retain stale-output checks.
- scripts/generate-sitemap.js: wrapper flags.
- scripts/report-city-verification.mjs: audit flags.
- scripts/publication-gates.test.mjs: generation/audit flags.
- scripts/check-release.js: expected sitemap URL base.
- scripts/app-ui.js: hard-coded public planner sharing URL.

Directly maintained files:
- plan/index.html: canonical, social-image and other absolute domain references.
- 404.html: /fun-app/ asset and navigation paths must become root paths.
- manifest.webmanifest: start_url, scope and icon paths.
  Its installed-app name still says Horizon Bound; flag this separately for review.
- Preserve code.html and its query/hash-preserving redirect. Relative paths can
  work on either origin, but must be tested.

Generated output: sitemap.xml, index.html, destinations/ and countries/ indexes
and guides, faq/index.html, contact/index.html, privacy/index.html,
terms/index.html and about/index.html. Regenerate rather than hand-edit them.
Privacy includes a literal hosting-domain reference. About's domain references
are in generated metadata, not an invented owner biography.

Deployment and external settings:
- fun-app Settings > Pages custom domain and Enforce HTTPS.
- Registrar DNS and domain-verification TXT record.
- New domain-root robots.txt in the deployed project, pointing at the new sitemap.
- Existing user-repository robots.txt declaration, reviewed during cutover.
- Search Console new property and analytics stream/domain settings.
- Retain google211ffe96343a3f9b.html; verify the new property independently.
- Active command examples in docs/city-sourcing-checklist.md and
  docs/city-verification-status.md. Do not rewrite historical audit evidence.

## Cutover plan

1. Confirm the .com availability and renewal price; the user purchases it.
2. Export saved planner data BEFORE cutover. localStorage is origin-specific:
   drafts, profile, bookings and consent will not automatically follow users.
3. Prepare and test a migration branch, retaining all slugs and publication gates.
   Use --base= and --origin=https://thefullestlifetravel.com with the existing
   --min-words=350, --min-named=5 and country gate of 250.
4. Run the complete image, generation, release and publication-test chain.
   Audit internal links, JSON-LD, canonical URLs, social images, 404 navigation,
   planner links and matching sitemap loc/lastmod counts. Inspect mobile/desktop.
5. Verify domain ownership with GitHub's TXT record. Set the project custom
   domain in GitHub BEFORE pointing DNS at Pages, to reduce takeover risk.
6. Configure apex A/ALIAS/ANAME and www CNAME using GitHub's current documentation.
   The CNAME target is hamiltondan20-sys.github.io, never a URL with /fun-app/.
   Wait for DNS and certificate readiness, then enable HTTPS.
7. Publish the tested root-path build in a coordinated cutover. Check old homepage,
   Austin, privacy, a country hub and a planner destination query for native 301s
   to the correct HTTPS route. Fragments are browser-side, not part of HTTP requests.
8. Verify a new Search Console domain property and submit its new sitemap once.
   Keep the old property for monitoring. Change of Address does NOT support a
   path-level /fun-app/ property. Do not request a whole-host move unless every
   other project on the old host is accounted for.
9. Monitor indexing and redirects. Retain the old repository and binding.
   If rolling back, restore configuration and matching build together, not one alone.

## Contact email

Proposed, not configured: hello@thefullestlifetravel.com and
privacy@thefullestlifetravel.com, both routed to a monitored inbox. A dedicated
mailbox separates public requests from personal mail; forwarding and sending
costs depend on the provider. Current email is intentionally unchanged.

Every current non-archive file containing hamiltondan20@gmail.com:
- scripts/generate-pages.mjs
- scripts/app-trip.js
- plan/index.html
- contact/index.html (generated)
- privacy/index.html (generated)
- terms/index.html (generated)
- docs/legal-trust-review.md (internal record)
- docs/about-page-audit.md (internal record)

Update production sources and regenerate; review historical records rather than
blanket-replacing them. There is no current About-page email occurrence.

## Weekly Search Console review

Record date, indexed submitted URLs out of 217, Crawled - currently not indexed,
Discovered - currently not indexed, and unexpected failures for current URLs.
Use the sitemap filter: total discovered URLs also include retired pages.
Inspect representative non-indexed pages for crawl date, canonical selection,
duplicates and content usefulness. The status is a triage signal, not proof
that a page is thin. Intended retired URLs returning 404 need no restoration;
a currently linked or submitted URL returning 404 does need investigation.
Do not repeatedly resubmit the current sitemap.

## Primary documentation

- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- https://developers.google.com/search/docs/crawling-indexing/301-redirects
- https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- https://support.google.com/webmasters/answer/9370220?hl=en
- https://support.google.com/webmasters/answer/7440203?hl=en
