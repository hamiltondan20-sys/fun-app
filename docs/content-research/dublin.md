# Dublin Source Review

Research started: 2026-10-03. Source review completed: 2026-10-04.
Scope: all 15 `cityGuideDetailData` fields, map targets, and the related planning copy.
22 distinct recommendations have dated evidence in `data/city-source-ledger.js`.
Repeated recommendations across categories are not extra verified venues.

## Method and Limits

Started with Visit Dublin, the official tourism site operated by Failte Ireland.
Read operator visitor, location, menu, booking and contact pages before drafting.
This is an official-web review, not telephone or in-person confirmation. A live
booking link or advertised service supports current operation but cannot
guarantee a venue will be open on a traveler's date. Source check dates are not
a claim that every underlying source was published that day.

The first run paused above 95% usage and saved research only. Work resumed after
the natural reset. No credits were purchased or usage-reset credits redeemed.
Unrelated city data, publication thresholds, integrations and imagery were left
alone. Source URLs, corroboration and operating evidence are recorded per exact
recommendation name in the ledger; the inventory checks complete coverage.

## Reviewed Recommendations

| Recommendation | Primary source |
| --- | --- |
| Book of Kells Experience | https://www.visittrinity.ie/book-of-kells-experience/ |
| Guinness Storehouse | https://www.guinness-storehouse.com/en/visit |
| National Gallery of Ireland | https://www.nationalgallery.ie/visit-us/visitor-guide |
| EPIC The Irish Emigration Museum | https://epicchq.com/visit/epic-location-custom-house-quay/ |
| MoLI - Museum of Literature Ireland | https://moli.ie/visit/ |
| St Stephen's Green walk | https://heritageireland.ie/places-to-visit/st-stephens-green/ |
| National Botanic Gardens (Glasnevin) | https://heritageireland.ie/visit/places-to-visit/national-botanic-garden/ |
| The Winding Stair Bookshop | https://www.winding-stair.com/bookshop.html |
| The Winding Stair restaurant | https://www.winding-stair.com/ |
| Pickle | https://picklerestaurant.com/ |
| Chapter One by Mickael Viljanen | https://chapteronerestaurant.com/reserve-a-table/ |
| Glovers Alley | https://www.gloversalley.com/ |
| D'Olier Street Restaurant | https://www.dolierstreetrestaurant.com/ |
| Brother Hubbard North (Capel Street) | https://brotherhubbard.ie/locations/ |
| Two Pups (Francis Street) | https://www.twopupscoffee.com/ |
| 3fe (Grand Canal Street) | https://3fe.com/pages/locations/grand-canal-street |
| Bretzel Bakery (Portobello) | https://www.bretzel.ie/ |
| Il Valentino (Grand Canal Dock) | https://www.ilvalentino.ie/ |
| Cloud Picker Cafe (Pearse Street) | https://cloudpickercoffee.ie/pages/find-us |
| BAR 1661 | https://bar1661.ie/ |
| Vintage Cocktail Club | https://vintagecocktailclub.com/ |
| Peruke & Periwig | https://www.peruke.ie/ |

Independent tourism corroboration was checked where available. OPW is the
public operator for the gardens and park, not a commercial listing site.
Additional pages from the same owner are not independent second sources.
The separate Winding Stair shop and restaurant have their own visitor/service
evidence, not two names for the same restaurant.

## Decisions That Changed the Copy

- Trinity sells different ticket combinations. Keep the library-only and full
  experience distinct, and warn that redevelopment affects the Long Room.
- Separate free garden or permanent-collection visits from paid exhibitions,
  guided tours and other ticketed areas.
- Brother Hubbard North's explicit temporary dinner closure overrides a broader
  overview mentioning dinner. It is recommended only for daytime service.
- Pickle's listed start times do not support a lunch recommendation. Its own
  access and dietary information matters more than an assumed audience fit.
- Chapter One's dietary restrictions are stated before encouraging a booking.
- Cloud Picker's Pearse Street cafe is distinct from its airport and roastery
  sites. Two Pups' Francis Street cafe is distinct from Fairview and from Notions.
- Il Valentino's map points at Gallery Quay, and Bretzel's at Lennox Street.
  The absence of visible own-site hours for these bakeries is not filled by guesswork.
- Glovers Alley's tourism article names an older chef. No chef or award claim
  is repeated. BAR 1661 has conflicting Friday times on its own page, so exact
  times are omitted.
- Keep a source-backed park walk as an activity descriptor. No invented literary
  tour operator, blanket accessibility claim or unsourced Howth day trip was added.

Bread 41, Restaurant Patrick Guilbaud and Chester Beatty were not included after
own-site fetch failures. These are evidence limitations, not closure reports.
No user review, competitor ranking or copied menu is used as the guide's voice.

## Publication Checkpoint

Source review and inventory checks are complete. The full fallback-image,
page-generation and release-check chain passed, as did all six regression tests.
There are 189 destination guides, 19 country hubs and 214 sitemap URLs with
214 lastmods. Across 217 HTML files, 4,267 internal anchor targets resolve and
all 1,757 JSON-LD blocks parse. No publication threshold changed.

Browser checks at 390px and 1440px found no horizontal overflow or script errors,
one H1, 51 recommendation map links, a loaded image and working FAQ controls.
Screenshots were reviewed using local styles and fallback fonts. The existing
fallback illustration was not replaced in this content pass. An initial preview
routing error blocked its absolute URL; serving that asset locally fixed the
test without changing the website. One earlier ad hoc audit command had a syntax
error; the complete corrected audit ran successfully.

Confirm the resulting Actions run and public Dublin page before calling the batch
live. Singapore is next only after Dublin's deployment is confirmed.
