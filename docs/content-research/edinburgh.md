# Edinburgh Source Review

Reviewed: 2026-10-03. Scope: all 15 `cityGuideDetailData` fields for
Edinburgh, United Kingdom, plus the guide's introduction and planning notes.

## Result

25 distinct recommendations have dated source records in
`data/city-source-ledger.js`. This is an official-website review, not a visit,
telephone confirmation or guarantee of service on a future date. Repeated
recommendations across categories are not extra verified places. The existing
Dean Village walking suggestion remains an activity, not a fictitious business.

Start with [Forever Edinburgh](https://edinburgh.org/). The specific tourism
pages and every venue/operator URL checked are retained in the ledger. Own-site
visitor hours, current menus, booking facilities or public access information
provide operating context. Independent tourism corroboration is recorded where
available; a second page on the same operator's site is not a second source.

## Decisions and Conflicts

- Lowdown Coffee was not added: the tourism-linked `lowdown.coffee` domain
  returned unrelated gambling content. That does not establish a cafe closure.
  Fortitude's Hamilton Place branch has its own current location and hours page.
- Panda & Sons was not added after its own site returned no readable visitor
  information. No closure claim. Bramble, The Devil's Advocate and Copper Blossom
  each have readable own-site location and service information.
- Camera Obscura's own FAQ says assistance dogs only, while Forever Edinburgh
  still calls it dog-friendly. Used the operator policy. Its stair-only floors
  and The Devil's Advocate's stair access are noted in the guide.
- Twelve Triangles at 90 Brunswick Street is takeaway only. It is a bakery
  breakfast option, not a sit-down reservation. Other branches differ.
- The Milkman has two Cockburn Street locations. The guide selects number 7.
  Fortitude selects 66 Hamilton Place; Howies selects 29 Waterloo Place;
  Soderberg selects the Pavilion at 1 Lister Square. Map queries identify them.
- Dishoom Edinburgh advertises all-day service but restricts evening bookings
  to groups of six or more. It is not in the unconditional Worth booking list.
  Bramble says walk-ins only. Restaurant Martin Wishart's readable enquiries
  page advertises service, but its booking widget did not render in the research
  tool. No claim of availability, and its 2025 holiday exceptions were ignored.
- Timberyard's page includes current booking times and older event/footer
  text. No exact hours or old events were republished.
- The National Museum and National Gallery advertise free general admission,
  not free entry to every special exhibition.
- Royal Botanic Garden advertises free outdoor admission and an October 2
  Palm Houses reopening, with other Glasshouses still closed. The guide says
  to check glasshouse access separately rather than promising everything is open.
- Historic Environment Scotland warns of slippery ground, drops and route
  closures in Holyrood Park. No pre-dawn Arthur's Seat climb or Radical Road
  route is recommended. A map link identifies the place, not a safe hiking route.
- Scottish Poetry Library has limited weekday visiting hours, explicitly noted.

## Publication Checkpoint

Research and source coverage complete. Current operating-gate dry run:
189 destination guides, 19 country hubs, 214 sitemap URLs, unchanged.
All publication thresholds remain unchanged. The full build/release chain and
six regression tests passed. Audited 4,267 internal anchor targets with zero
broken, 1,757 valid JSON-LD blocks, and 214 matching URL/lastmod elements. Browser
checks and screenshots at 390px and 1440px passed with local styles and fallback
fonts. The fallback illustration remains unchanged.

Before moving on, confirm the final commit's successful Actions run and the
public Edinburgh page's October 3, 2026 review note. If deployment is interrupted,
resume from that checkpoint rather than repeating completed sourcing.

Next city in the provisional demand-led queue: Dublin. Do not repeat Edinburgh
research unless a test, source conflict or user report requires follow-up.
