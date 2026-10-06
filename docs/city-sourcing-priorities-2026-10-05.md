# Approved City Sourcing Priorities

User approved October 5, 2026. Pulled October 6 UTC.
Period: October 2025 through September 2026.

Source: Wikimedia REST API, English Wikivoyage, all-access, user pageviews.
These are readership figures, not search volume, unique visitors or US demand.
Wikivoyage is the better travel-guide proxy where sources disagree because
its articles serve travellers rather than general encyclopedic interest.
Individual reader intent is not measured. Canonical top-level views exclude
district pages and redirect aliases.

User adjustment: source Singapore first, then Hanoi ahead of Berlin. This is
an editorial priority adjustment, not a change to the measured ranks. Hanoi
moved from Wikipedia rank 17 to Wikivoyage rank 9; Venice moved from 9 to 4.
Honolulu moved from 15 to 20 and Vancouver from 5 to 10, making them lower
priorities than the Wikipedia ordering suggested. These differences do not
measure the share of readers planning a trip.

Wikivoyage article depth varies. A thin article can depress views independently
of interest; this caveat mainly affects lower-ranked cities and does not change
the five highest measured totals.

This approved order remains provisional until Search Console impressions
supersede it in 2-3 weeks. All 20 city entities matched; no absent data was estimated.

| Order | City | Wikivoyage article | 12-month views (2026-10-06) | Monthly average (2026-10-06) | Source-record verified names (2026-10-06) | Populated categories (2026-10-06) | Classifier named entries (2026-10-06) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Singapore | Singapore | 99245 | 8270.42 | 13 | 15 | 8 |
| 2 | Hanoi | Hanoi | 43185 | 3598.75 | 0 | 15 | 7 |
| 3 | Hong Kong | Hong Kong | 82854 | 6904.5 | 0 | 15 | 5 |
| 4 | Berlin | Berlin | 72191 | 6015.92 | 0 | 15 | 7 |
| 5 | Venice | Venice | 62100 | 5175 | 0 | 15 | 8 |
| 6 | Montreal | Montreal | 56849 | 4737.42 | 0 | 15 | 7 |
| 7 | Prague | Prague | 55995 | 4666.25 | 0 | 15 | 7 |
| 8 | Vienna | Vienna | 55033 | 4586.08 | 0 | 15 | 7 |
| 9 | Munich | Munich | 49215 | 4101.25 | 0 | 15 | 7 |
| 10 | Vancouver | Vancouver | 42642 | 3553.5 | 0 | 15 | 8 |
| 11 | Rio de Janeiro | Rio de Janeiro | 41310 | 3442.5 | 0 | 15 | 7 |
| 12 | Melbourne | Melbourne | 40862 | 3405.17 | 0 | 15 | 7 |
| 13 | Cape Town | Cape Town | 35895 | 2991.25 | 0 | 15 | 8 |
| 14 | Cairo | Cairo | 31391 | 2615.92 | 0 | 15 | 7 |
| 15 | Nice | Nice | 28715 | 2392.92 | 0 | 15 | 7 |
| 16 | Kyoto | Kyoto | 26502 | 2208.5 | 0 | 15 | 7 |
| 17 | Reykjavik | Reykjavík | 23053 | 1921.08 | 0 | 15 | 7 |
| 18 | Banff | Banff | 19718 | 1643.17 | 0 | 15 | 7 |
| 19 | Queenstown | Queenstown (New Zealand) | 14390 | 1199.17 | 0 | 15 | 7 |
| 20 | Honolulu | Honolulu | 11452 | 954.33 | 0 | 15 | 7 |

Classifier names are not verified recommendations; entries may repeat.
Populated categories can still contain unsourced items.

## Next work

Singapore's source pass is complete locally; confirm deployment, then Hanoi.
Content automation remains
paused until explicitly resumed. Retain all 15 fields and the existing
publication gates. No domain migration occurred. The classifier figure above
is the original demand-pull snapshot, not an updated verified count.

## Proposed batch after Hanoi

Berlin, Vienna and Munich form a three-city German-language sourcing batch.
They share a language, not one tourism board; each needs its own board and
operator checks. This is a proposed efficiency grouping, not a claim of measured
time savings or a rewrite of the approved readership order. Report once for the
batch. Revisit food-category granularity after 3-5 more reviewed cities, not now.

## Evidence

- [Wikivoyage CSV](city-demand-wikivoyage-2026-10-06.csv)
- [Article and monthly evidence](city-demand-wikivoyage-2026-10-06.json)
- [Both-source comparison](city-demand-comparison-2026-10-06.md)
- [Search Console process](search-console-content-monitoring.md)

Hanoi is the only rank difference above five: Wikipedia 17, Wikivoyage 9.
Inspect that signal without assuming its cause.

Re-run without changing the approved queue:

```bash
node scripts/pull-city-pageviews.mjs --project=en.wikivoyage --end-month=2026-09 --compare=docs/city-demand-wikipedia-2026-10-06.json
```
