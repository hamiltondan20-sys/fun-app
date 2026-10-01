# City Verification Status

Updated: 2026-09-30. This is an editorial record, not a publication gate.

## What the counts mean

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

**Cusco, Peru: one city completed.** All 15 detail fields now use recommendations
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

Austin has an earlier source review and its existing source ledger is retained.
Its original date is not refreshed just because Cusco was checked. Other cities
remain research-pending or partially researched unless their ledger says
otherwise. Passing the publication gate never promotes a city to source-checked.

The publication test now fails if a new detail recommendation is added to a
source-checked city without a corresponding dated source record. It also rejects
placeholder recommendations and unused records for that review. Human review is
still needed to judge whether a source supports the name and category.

## Next Work

Continue the 5-9 band in `docs/content-repair-queue.md`. Complete the missing
recommendations and their provenance, not just the arithmetic gap to eight.
Report cities completed. Keep the operating gate at five; any proposed gate
change requires a page-count impact report and explicit approval first.

## Launch and Weekly Checks

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
