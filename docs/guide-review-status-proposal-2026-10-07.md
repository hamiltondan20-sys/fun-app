# Guide Review Status Proposal

October 7, 2026. Awaiting approval; no page changes.

## Wording

- Reviewed: "Detail recommendations source-reviewed - 6 October 2026".
  Substitute the city's ledger review date, not its deployment or sitemap date.
- Unreviewed: "Automated content checks passed - source review pending".
  This does not mean the content is wrong or that no earlier research exists.
  Austin has earlier evidence awaiting current-format reconciliation.

Place readable, quiet text below the title and summary, before the hero image.
Use the existing machine-readable ledger status, review scope and date, not
classifyItem. Recommend body text only; do not invent schema verification
properties, ratings or self-reviews. Content modification dates are not review
dates. The scope is cityGuideDetailData, not the whole guide.

## Sample-day audit

| Reviewed guide | Static sample day | Review coverage |
| --- | --- | --- |
| Boston | Absent | No entries to assess |
| Cusco | Absent | No entries to assess |
| Edinburgh | Absent | No entries to assess |
| Dublin | Absent | No entries to assess |
| Hanoi | Absent | No entries to assess |
| Berlin | Absent | No entries to assess |
| Vienna | Absent | No entries to assess |
| Munich | Absent | No entries to assess |
| Singapore | Present | Generated from inherited seeds; timeline not reviewed |
| Hong Kong | Present | Generated from inherited seeds; timeline not reviewed |

Singapore: 9:00 Start near Marina Bay; 11:00 Gardens by the Bay; 13:30 Local
lunch. The detail ledger covers outdoor gardens, not all paid attractions
implied by the broader name. Route, timings and unspecified lunch are not reviewed.

Hong Kong: 9:00 Start near Central; 11:00 Victoria Peak; 13:30 Local lunch.
Victoria Peak remains unresolved following blocked operator retrieval. This is
missing evidence, not evidence of closure. None of this timeline is covered by
the eight-place detail ledger.

Proposed notice below affected sample-day headings: "Sample-day suggestions
have not completed a separate source review. Check opening times and travel
times before using this itinerary."

Trace: scripts/generate-pages.mjs sampleDay reads getTimelineTemplates without
ledger filtering. data/top-100-destinations.js makeTimelineTemplates builds slots
from seed areas and highlights and overrides the base data/trip-content.js helper.

Await approval for both notices. No unpublishing, gate changes or deployment.
