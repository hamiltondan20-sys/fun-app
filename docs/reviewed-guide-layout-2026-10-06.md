# Reviewed Guide Layout Pilot

Approved by the user's follow-up on October 6, 2026. Applies only to the nine
ledger-reviewed guides: Boston, Cusco, Dublin, Edinburgh, Singapore, Hanoi,
Berlin, Vienna and Munich. The 180 unreviewed guides keep their existing HTML.

## Behaviour

Eight possible sections replace the 15 separately displayed lists: sights and
museums, less obvious stops, meals worth planning, cafes and bakeries, drinks,
with kids, your kind of day, and budget and special occasions. Vienna has seven
because its drinks field is empty. Context labels preserve First visit, Lunch,
Dinner, Book ahead, Breakfast, Coffee, Bakery, Solo, Couples, Budget and Splurge.

An exact recommendation appears once within a merged section with all applicable
labels. It can still appear in another relevant section. No global reuse cap,
new place names, sourcing shortcut or category deletion was introduced. All 15
data fields, their evidence records and the original gate-count calculations
remain unchanged. Requiring filler to reach a list count would undermine trust;
short verified lists are acceptable. Undocumented guides are not assumed wrong.

Each rendered section now has its own ItemList, matching visible entry count,
order and names. The first-six-list truncation remains unchanged for unreviewed
guides. The pilot retains query wording through context labels but changes its
heading prominence; no ranking benefit or equivalent SEO performance is claimed.

## Measured Display Change

| City | Distinct places | Old placements | New placements | Sections | New average | New maximum |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Boston | 26 | 54 | 42 | 8 | 1.62 | 4 |
| Cusco | 18 | 52 | 37 | 8 | 2.06 | 5 |
| Dublin | 22 | 51 | 39 | 8 | 1.77 | 3 |
| Edinburgh | 25 | 52 | 40 | 8 | 1.60 | 3 |
| Singapore | 13 | 39 | 27 | 8 | 2.08 | 3 |
| Hanoi | 8 | 23 | 19 | 8 | 2.38 | 4 |
| Berlin | 16 | 31 | 26 | 8 | 1.63 | 3 |
| Vienna | 15 | 28 | 20 | 7 | 1.33 | 2 |
| Munich | 15 | 29 | 24 | 8 | 1.60 | 3 |

The reuse reporter now separates original data-category appearances from actual
consolidated display appearances. Hypothetical caps remain comparison-only.

## Impact and Checks

Dry-run before generation: 189 destination guides, 19 hubs and 217 URLs, unchanged.
All nine reviewed guides still pass the existing gates; their rendered word counts
range from 629 to 1,001. No min-named, word-count, country or placeholder threshold
was changed. No domain migration, planner change or new research was performed.

Full image/page-generation/release chain passed; all 17 tests passed, including
field retention, within-section deduplication and preservation across sections.
Audit: 5,209 internal anchor targets, zero broken; 1,777 JSON-LD blocks parsed;
all 71 reviewed-section ItemLists have matching visible entry counts and ordered
positions. Sitemap has 217 loc and 217 lastmod elements. Only the nine reviewed
destination HTML files change; CSS additions are scoped to their new selectors.
Unrelated content-program edits and handoff archives are not part of this release.

Public deployment and responsive checks are recorded separately after completion.
