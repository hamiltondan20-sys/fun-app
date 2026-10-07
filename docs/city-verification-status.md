# City Verification Status

Updated: 2026-10-06. This is an editorial record, not a publication gate.

The [user-approved Wikivoyage-led queue](city-sourcing-priorities-2026-10-05.md)
distinguishes classifier matches from sourced recommendations. Singapore's
13 recommendations now have dated operator evidence and pass the staged
short-list release validation. Deployed in Actions run 37534775297; the public
page and mobile/desktop layouts were checked after deployment.
Automated content work remains paused. The legal-page release has 217
sitemap URLs; it did not change the 189 published destination guides.

## Current Inventory

The [complete inventory](city-verification-inventory.md) assigns every canonical
destination a status: `source-verified`, `classifier-passed`, or `held-back`.
There are 484 canonical destinations from 485 detail records. The existing
Guilin merge accounts for the difference; no destination was deleted in this pass.

- 9 source-covered in the local evidence inventory: Boston, Cusco, Edinburgh, Dublin, Singapore, Hanoi, Berlin, Vienna and Munich.
- 180 classifier-passed guides in the local build, including Austin's retained prior review.
- 295 held-back destinations.

Ten cities have a source-review history, but they are not identically documented.
Austin has 32 legacy source references; three current activity labels do not
exactly match those source keys, and per-place operating evidence is not yet
migrated. This is a documentation gap, not evidence that those activities are
false. Do not refresh its verification date or mark it fully documented without
reviewing that mapping and evidence. Cusco has 18 distinct current recommendations
with dated, scoped evidence; Boston has 26, Edinburgh has 25 and Dublin has 22.
Classifier matches remain separate.

Refresh the inventory after a content or ledger change:

```bash
node scripts/report-city-verification.mjs
node scripts/report-city-verification.mjs --check
```

The reporter reads the generator's dry-run audit. It does not regenerate pages,
change thresholds, or automatically verify websites. A declared `source-checked`
city with missing evidence makes the report fail rather than retaining its label.

## What the counts mean

The user approved the [reviewed-guide layout pilot](reviewed-guide-layout-2026-10-06.md).
Reviewed guides combine their 15 fields into up to eight display sections with
context labels, deduplicating only within each section. Evidence and publication
calculations still use the original fields. This is a layout change, not a new
verification claim or a reduction in sourcing requirements.

The nine reviewed ledger records explicitly set `renderVerifiedOnly: true`.
The static generator renders only entries with dated HTTPS source records,
source type and operating evidence for those cities. Unreviewed cities keep
their existing rendering. Filtering never removes underlying data or ledger
records. Reviewed categories may contain one or two entries; empty rendered
categories are omitted. Publication thresholds are unchanged.

`classifyItem` recognizes name-like text. It cannot establish that a business
exists, is in the right country, or is open. Repeated entries across categories
also increase its count. Never describe that total as verified places.

Use `data/city-source-ledger.js` for provenance rather than adding a bare boolean:

| Status | Meaning |
| --- | --- |
| `source-checked` | Every current detail recommendation has a dated official source and operating/context evidence. Scope and limitations are recorded. |
| `prior-source-review` | An earlier source review exists but has not been refreshed in this pass or fully migrated to the evidence format. |
| `ready-for-content-draft` | Research leads exist. This is not verification of the published page. |
| No ledger entry | Source review is pending, regardless of classifier count. |

## Completed This Pass

**Hanoi, Berlin, Vienna and Munich: source review completed October 6.**
The batch contains 54 distinct recommendations: 8, 16, 15 and 15 respectively.
Every retained recommendation has dated operator evidence, an exact checked
location-page URL and its original `sourcedFor` category. Website evidence is
not a phone or in-person confirmation, nor a guarantee of daily availability.
Hanoi bakery/budget and Vienna cocktail/budget fields remain empty rather than
being filled to meet a count. The other 180 guides retain their existing data
and rendering. See [the batch review](hanoi-german-batch-review-2026-10-06.md)
for counts, source-category mapping, limitations and the unimplemented layout
proposal. Deployment status is recorded there separately from source review.

**Dublin, Ireland: source review completed October 4.** All 15 detail fields
have evidence for 22 distinct recommendations, including the separate Winding
Stair shop and restaurant. Started with Visit Dublin, then checked operator
visitor, location, menu and reservation pages. The park walk remains an activity,
not an invented venue. Map targets distinguish cafe and bakery branches.

Practical copy separates Trinity ticket options, free general admission from
paid extras, and daytime cafes from dinner venues. Brother Hubbard North is
not a dinner recommendation while its own site reports that service temporarily
closed. Pickle's listed service does not support a lunch recommendation. The
guide flags Chapter One's dietary limitations and Pickle's access restriction.
Source-fetch failures are recorded as evidence gaps, never closure reports.
See [the research record](content-research/dublin.md) for the exact source list.

The complete build and release-check chain and all six regression tests passed.
An audit parsed 1,757 JSON-LD blocks and checked 4,267 internal anchor targets
across 217 HTML files, with zero invalid blocks or broken targets. There are
still 189 destination guides, 19 country hubs, and 214 sitemap URLs with 214
lastmods. Dublin's page has 51 recommendation links, representing 22 distinct
recommendations. Browser checks at 390px and 1440px found one H1, no overflow,
loaded local imagery, working FAQ controls and no script errors. Screenshots
were reviewed with local styles and fallback fonts; external fonts were blocked.
The first offline-preview attempt blocked an absolute local-asset URL; after
correcting the preview routing, the existing image loaded without a site change.

**Edinburgh, United Kingdom: source review completed October 3.** All 15 fields
have evidence for 25 distinct places, including attractions, public spaces,
restaurants, bakeries and bars. Started with Forever Edinburgh, then checked
operator sites and branch addresses. Preserved the useful Dean Village walk.
The review is scoped to these recommendations and recorded planning claims,
not a blanket certification of every Edinburgh-related sentence in the app.

Excluded Lowdown Coffee because the tourism-linked domain returned unrelated
content, and Panda & Sons because no readable own-site operating information
was available. Neither exclusion is a closure claim. Camera Obscura's own
assistance-dogs-only policy overrides the tourism board's older pet-friendly
description. The guide distinguishes takeaway-only Twelve Triangles, walk-in
Bramble and Dishoom's evening group-booking restrictions. Garden and museum
admission notes distinguish free general entry from separately ticketed areas.
See [the research record](content-research/edinburgh.md) and the source ledger
for exact URLs, dates and limitations.

Local publication checks passed: full image-generation, page-generation and
release-check chain, six regression tests, 4,267 internal anchor targets with
zero broken, and 1,757 parsed JSON-LD blocks across 217 HTML files. Counts remain
189 destination guides, 19 country hubs and 214 sitemap URLs with 214 lastmods.
Browser checks at 390px and 1440px found one H1, 52 recommendation map links,
loaded local imagery, no overflow and no script errors. Screenshots were
reviewed using local styles and fallback fonts; external fonts were blocked.
The existing fallback illustration and all publication gates were left alone.

**Boston, United States: completed October 2.** All 15 detail fields now have
source records for their recommendations, covering 26 distinct places. Started
with Meet Boston, then checked the venue or public operator's own pages and
recorded the service, visit or reservation evidence. This is not a claim of 26
restaurants: parks, museums, a trail, a bookshop and a market are also included.

The Charles Street Tatte is excluded because its official page reports a
renovation closure. The Back Bay branch at 399 Boylston Street was separately
checked. Thinking Cup was not included after an error loading its own site;
that is not a closure claim. Neptune Oyster stays in lunch, not the
reservation-oriented restaurant list. Branch-specific map queries distinguish
Row 34, Flour, Tatte, George Howell and Gracenote locations. Those explicit
reviewed addresses can link names such as `o ya` and `Row 34` without altering
the classifier or any publication gate. No claims of phone or in-person checks.

Local verification: full image-generation, page-generation and release-check
chain passed; six publication/provenance regression tests passed. The build has
189 destination guides, 19 country hubs, 214 sitemap URLs and 214 `lastmod`
elements. A link audit across 217 HTML files checked 4,267 internal anchor
targets with zero broken; 1,757 JSON-LD blocks parsed. Browser checks at 390px
and 1440px found no horizontal overflow or script errors. Screenshots were
checked with local CSS and images; externally hosted fonts were blocked in this
offline preview. The existing fallback city image was deliberately left alone.

**Cusco, Peru: completed September 30.** All 15 detail fields now use recommendations
with source records. There are 18 distinct named locations, including two
separate branches of Qosqo Maki. Repeated recommendations across meal or traveler
categories are not additional verified venues. The list includes landmarks and
a neighborhood as well as businesses; it is not a list of 18 restaurants.

Start with PROMPERU's Cusco city walk and its gastronomic guide, then use the
venue's own website for current location and service information. Source URLs,
dates, location distinctions, and evidence are recorded per name in the ledger.

The bakery choices include a cafe that bakes its own bread and two branches of
one bakery, clearly identified. Neither an unverified bakery name nor a generic
pastry stop was added to make the list longer. Chicha Cusco and La Valeriana were
not added because their own pages could not be loaded during this review. This
is not evidence that either business has closed.

Source review is limited to official web evidence, not phone calls or in-person
visits. For public landmarks, a current official visitor listing establishes
identity and visitor context, not daily admission availability. Check hours and
reservations with the venue before traveling. No historical, medical, transport,
or price claim is certified merely by the city status.

## Earlier Work

### Austin status clarification

Austin was reviewed under an earlier source-list standard on September 19.
The current standard is stricter: every exact recommendation needs mapped
evidence with checked date, source type and operating/context evidence.
Its 32 older references lack that complete per-record format. Three current
labels do not exactly match the source keys: Lady Bird Lake hike-and-bike
trail, Congress Avenue Bridge at sunset, and South Congress Avenue evening.
Their base places have older sources, not current verification of each activity.

The evidence format changed, and Austin's record is not reconciled to it.
Earlier unqualified claims of full verification were too broad relative to
today's standard. This does not establish that its places are invented.
Retain prior-source-review until the current recommendations are rechecked
and mapped. The About page's process is not proof every published city has
already completed it. No new Austin verification was performed in this pass.

Austin has an earlier source review and its existing source ledger is retained.
Its original date is not refreshed just because Cusco was checked. Other cities
remain research-pending or partially researched unless their ledger says
otherwise. Passing the publication gate never promotes a city to source-checked.

The publication test now fails if a new detail recommendation is added to a
source-checked city without a corresponding dated source record. It also rejects
placeholder recommendations and unused records for that review. Human review is
still needed to judge whether a source supports the name and category.

## Next Work

Use the demand-led order in [the next 20 cities](city-sourcing-priorities.md).
The older repair queue remains a coverage inventory, not an alphabetical work
order. Complete the missing recommendations and their provenance, not just the arithmetic gap to eight.
Report cities completed. Keep the operating gate at five; any proposed gate
change requires a page-count impact report and explicit approval first.

## Launch and Weekly Checks

Commits through `0fdc9ba` were pushed on 2026-10-01. The
[deployment succeeded](https://github.com/hamiltondan20-sys/fun-app/actions/runs/36923649325).
Public Cusco returned HTTP 200 with Cicciolina Cafe and the corrected address-based
map link. Live totals remain 189 destination guides, 19 country hubs, 214 sitemap
URLs, and 214 `lastmod` values. No thresholds changed.

The domain-root robots file was checked on 2026-09-30: HTTP 200 with the correct
declaration for `https://hamiltondan20-sys.github.io/fun-app/sitemap.xml`.
The separate user-site repository is already deployed. Do not create it again.

To check it yourself, open `https://hamiltondan20-sys.github.io/robots.txt`.
The first lines should be `User-agent: *` and `Allow: /`, followed by that sitemap
URL. Pages settings for that repository should continue publishing its root.

Once a week in Search Console, open Indexing > Pages and filter to the submitted
sitemap. Record the indexed count against the current 214-URL sitemap, then
inspect a few examples under "Crawled - currently not indexed". That status means
Google crawled the URL but has not indexed it; it is not a definitive thin-content
diagnosis. Review the content and canonical/indexing details before deciding what
to change. Do not change gates or resubmit the sitemap in response to it alone.

About 87 URLs from the older 301-URL submission were intentionally removed.
Expected 404s for those retired pages need no placeholder replacement or blanket
redirect. Investigate 404s only when the URL is still intended to be live or is
still linked from current pages. Keep weekly snapshots separate from code changes.

Reference: [Google's Page indexing report documentation](https://support.google.com/webmasters/answer/7440203?hl=en).
