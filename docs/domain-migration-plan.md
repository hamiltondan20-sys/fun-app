# Custom Domain Decision

Researched October 5, 2026. Planning only: no domain, DNS, site configuration,
canonical, email address or sitemap has been changed.

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
