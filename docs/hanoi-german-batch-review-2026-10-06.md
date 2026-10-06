# Hanoi and German-language Batch Review

Checked October 6, 2026. Source scope: current `cityGuideDetailData`
recommendations, using tourism-board leads and operator website evidence.
No phone or in-person checks; advertised service does not guarantee availability.
Exact URLs, branch information, dates, operating evidence and original sourcing
categories are in `data/city-source-ledger.js`. Multiple operator pages are not
independent corroboration. Unsupported leads remain in the research checkpoint.

## Results

| City | Distinct source-checked places | Populated fields | Placements | Mean | Maximum | Existing gate |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| Hanoi | 8 | 13 | 23 | 2.88 | 4 | Pass |
| Berlin | 16 | 15 | 31 | 1.94 | 3 | Pass |
| Vienna | 15 | 13 | 28 | 1.87 | 3 | Pass |
| Munich | 15 | 15 | 29 | 1.93 | 4 | Pass |

The classifier gate counts name-like placements, not distinct verified places.
Its named/category counts are Hanoi 18/12, Berlin 28/14, Vienna 28/13 and
Munich 25/15. Rendered words are 665, 681, 652 and 657 respectively. All clear
the unchanged five-name/three-category and 350-word gates. The country minimum
remains 250. No reuse cap was added.

Hanoi's bakery and budget fields and Vienna's cocktail and budget fields are
empty. All 15 underlying fields are retained. No third entry was manufactured.
The other 180 guides' detail data and rendering are unchanged. Only these four
guides, their destination-index summaries and the Germany hub's linked-city
summaries change in generated HTML. Totals remain 189 guides, 19 hubs, 217 URLs.

The workflow now requires a directions, contact or location-page check wherever
an address matters, and records the exact URL. House of Small Wonder's own
find-us page exposed its stale former address. Its current Auguststrasse branch
is separately verified. Cafe Central remains excluded during renovation.

## Original Sourcing Category

This is the research intent, not every category in which a recommendation is
displayed. Repeated placements are not additional places. The ledger contains
the complete URL and operating-evidence record for each entry.

| City | Recommendation | Sourced for |
| --- | --- | --- |
| Hanoi | Temple of Literature | bestAttractions |
| Hanoi | Hanoi Museum | bestAttractions |
| Hanoi | Lifted Coffee & Brunch (Hang Ga) | bestBreakfast |
| Hanoi | Cafe Giang (Nguyen Huu Huan) | bestCoffee |
| Hanoi | Red Bean Ma May | bestDinner |
| Hanoi | Le Beaulieu | bestLuxury |
| Hanoi | angelina | bestCocktails |
| Hanoi | KOTO Van Mieu | bestLunch |
| Berlin | Neues Museum | bestAttractions |
| Berlin | Berlin Wall Memorial | bestAttractions |
| Berlin | Museum fuer Naturkunde Berlin | bestKids |
| Berlin | DDR Museum | bestUnique |
| Berlin | Zoo Berlin | bestKids |
| Berlin | East Side Gallery | bestBudget |
| Berlin | Charlottenburg Palace (Old Palace) | bestAttractions |
| Berlin | House of Small Wonder (Auguststrasse) | bestBreakfast |
| Berlin | THE BARN (Mitte) | bestCoffee |
| Berlin | Zeit fuer Brot (Alte Schoenhauser Strasse) | bestBakeries |
| Berlin | Restaurant Tim Raue | bestDinner |
| Berlin | Green Door Bar | bestCocktails |
| Berlin | Markthalle Neun | bestLunch |
| Berlin | Nobelhart & Schmutzig | bestRestaurants |
| Berlin | Tempelhofer Feld | bestBudget |
| Berlin | Deutsches Technikmuseum | bestKids |
| Vienna | Schoenbrunn Palace | bestAttractions |
| Vienna | Upper Belvedere | bestAttractions |
| Vienna | ALBERTINA (Albertinaplatz) | bestSolo |
| Vienna | Schoenbrunn Zoo | bestKids |
| Vienna | Natural History Museum Vienna | bestKids |
| Vienna | Vienna State Opera | bestCouples |
| Vienna | Mozarthaus Vienna | bestUnique |
| Vienna | Demel (Kohlmarkt) | bestBakeries |
| Vienna | Joseph Brot (Fuehrichgasse) | bestBreakfast |
| Vienna | MOTTO am Fluss | bestLunch |
| Vienna | Figlmueller (Wollzeile) | bestLunch |
| Vienna | Meissl & Schadn (Vienna) | bestDinner |
| Vienna | KunstHausWien | bestUnique |
| Vienna | Leopold Museum | bestSolo |
| Vienna | St. Stephen's Cathedral | bestAttractions |
| Munich | Deutsches Museum (Museumsinsel) | bestKids |
| Munich | Munich Residence | bestAttractions |
| Munich | BMW Welt | bestUnique |
| Munich | BMW Museum | bestAttractions |
| Munich | Munich Documentation Centre for the History of National Socialism | bestBudget |
| Munich | Augustiner Klosterwirt | bestDinner |
| Munich | Restaurant Tantris | bestLuxury |
| Munich | Rischart (Cafe am Marienplatz) | bestBakeries |
| Munich | Hofbraeuhaus Muenchen | bestLunch |
| Munich | Schumann's Bar (Hofgarten) | bestCocktails |
| Munich | Man versus Machine (Glockenbach) | bestCoffee |
| Munich | Dallmayr Cafe Bistro | bestBreakfast |
| Munich | Hellabrunn Zoo | bestKids |
| Munich | Alte Pinakothek | bestAttractions |
| Munich | Lenbachhaus | bestSolo |

## Consolidation Decision for Approval

| Reviewed city | Distinct | Placements | Mean | Maximum |
| --- | ---: | ---: | ---: | ---: |
| Boston | 26 | 54 | 2.08 | 5 |
| Cusco | 18 | 52 | 2.89 | 5 |
| Dublin | 22 | 51 | 2.32 | 4 |
| Edinburgh | 25 | 52 | 2.08 | 4 |
| Singapore | 13 | 39 | 3.00 | 5 |
| Berlin | 16 | 31 | 1.94 | 3 |
| Vienna | 15 | 28 | 1.87 | 3 |
| Munich | 15 | 29 | 1.93 | 4 |

Hanoi is a ninth supplemental observation: 8/23/2.88/4. The German-language
guides have fewer distinct places than Boston and average below two placements.
They do not establish the proposed Boston-level-sourcing/Boston-level-reuse
condition. Short verified lists can fill most fields without that much reuse.
This is not evidence that consolidation is mandatory or saves sourcing effort.

Recommendation: consider an eight-section display pilot for reviewed guides,
keeping all 15 data fields. Deduplicate only within a merged section; no global
cap or arbitrary display-order removal. This addresses scanning and visible
repetition, not verification or publication. Do not implement without approval.

| Proposed section | Existing fields | Retained labels |
| --- | --- | --- |
| Sights and museums | bestAttractions, bestFirstTimers | First visit |
| Less obvious stops | bestUnique | Original activity context |
| Meals worth planning | bestLunch, bestDinner, bestRestaurants | Lunch, Dinner, Book ahead |
| Cafes and bakeries | bestBreakfast, bestCoffee, bestBakeries | Breakfast, Coffee, Bakery |
| Drinks | bestCocktails | Cocktails |
| With kids | bestKids | Family context |
| Your kind of day | bestSolo, bestCouples | Solo, Couples |
| Budget and special occasions | bestBudget, bestLuxury | Budget, Splurge |

Separate breakfast/lunch/dinner/bakery/solo/couples headings would lose some
heading prominence. Their words and suitability labels remain visible; no
ranking improvement or unchanged SEO coverage can be guaranteed. All fields
still require evidence, so this is display consolidation with no sourcing-saving
claim. Budget and splurge labels must remain clearly separated within their
section rather than implying identical price positioning.

Current JSON-LD emits ItemLists for only the first six nonempty category blocks
(`flatMap(...).slice(0, 6)`), not all 15 fields. An approved pilot should emit one
ItemList per nonempty merged section, with names, positions and item counts
matching its deduplicated visible list. Cluster layout would become eight
nonempty sections with context labels rather than repeated category lists.
Empty sections stay omitted, and retained data is not deleted. This is a future
proposal only; generator schema and layout are unchanged in this batch.

## Validation and Deployment

Full image/page-generation/release chain passed. Sixteen regression tests passed
after refreshing the verification inventory. The audit checked 5,165 internal
anchor targets across 219 HTML files, with zero broken targets; all 1,760 JSON-LD
blocks parsed. Sitemap contains 217 loc and 217 lastmod elements. Re-running the
generator after the content and sitemap commits left generated-file status clean.
No node_modules files are tracked.

Content commit e79d9db and sitemap commit e1447d7 were pushed. [Actions run
37548593950](https://github.com/hamiltondan20-sys/fun-app/actions/runs/37548593950)
completed successfully. All four public pages returned HTTP 200 with the October
6 review notice; the public sitemap also has 217 loc and 217 lastmod elements.
Public browser checks at 390px and 1440px found loaded hero images, one H1 per
page and no horizontal overflow. Screenshots were inspected, including Munich's
desktop recommendation sections. Existing fallback illustrations were retained.
Local file-browser inspection was unavailable; public checks were performed after
deployment instead. Unrelated content-program edits and handoff archives remain
untouched. No schema, publication gate, reuse cap or domain migration was changed.
