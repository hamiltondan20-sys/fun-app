# Amsterdam, Netherlands source review

2026-10-21. Each place was checked on its operator's own website, or the public body that runs it. No review sites,
maps or blogs were used. The evidence is in `amsterdam-2026-10-21.json`.

## 22 places confirmed (22 used in the guide)

| Place | Source | Opening hours as published |
|---|---|---|
| Rijksmuseum | operator's own site (national museum) | "Open daily 9 to 17h", "including all public holidays" |
| Anne Frank House | operator's own site (Anne Frank House) | Daily 9:00-22:00; exceptions include 27 April and 4 May (9:00-17:00), 25 and 31 December (9:00-17:00), 1 January (12:00-22:00) |
| Stedelijk Museum | operator's own site | Daily 10am-6pm, "No entrance after 5.45 pm" |
| Eye Filmmuseum | operator's own site | Exhibition: closed Mondays (open from 10:00 incl. Mondays in school holidays), Tue-Sun 10:00-19:00; box office Mon 18:00-22:00, Tue-Thu 10:00-22:00, Fri-Sat 10:00-23:00, Sun 10:00-22:00; closes 17:00 on Saturday 7 November except for Museumnacht |
| Oude Kerk | operator's own site | Daily 10am-6pm; Sunday 1pm-5:30pm |
| Royal Palace Amsterdam | official public operator (Royal Palace Amsterdam) | Daily from 10.00 a.m. on opening days per the online calendar; "Opening days and times are subject to change" |
| Rembrandt House Museum | operator's own site | "open every day from 10 a.m" (closing time not readable); closed on King's Day and 25 December |
| NEMO Science Museum | operator's own site | not published in readable form (opening-hours section empty in fetched text); open on listed Mondays only |
| ARTIS | operator's own site | not published on the page read |
| Het Scheepvaartmuseum | operator's own site (National Maritime Museum) | Museum Mon-Sun 10:00-17:00 |
| A'DAM Lookout | operator's own site | Daily 10:00-22:00, last admission 21:00 |
| Cafe de Klepel | operator's own site | Mon-Thu 17:00-00:00; Fri 15:00-00:00; Sat 12:00-00:00; Sun 15:00-00:00 |
| Bakers & Roasters (Kadijksplein) | operator's own site | Mon-Fri 8:30-15:00; Sat-Sun 8:30-16:00 |
| Bakers & Roasters (De Pijp) | operator's own site | Mon-Fri 8:30-15:00; Sat-Sun 8:30-16:00 |
| Little Collins | operator's own site | Mon-Sun 09.00-16.00 |
| Foodhallen | operator's own site | Daily 12:00-23:00 |
| Fabel Friet (Runstraat) | operator's own site | Mon-Sun 11:00-21:00 |
| Super Lyan | operator's own site | Wed & Sun 17.00-00.00; Thu-Sat 17.00-01.00 (Mon-Tue not listed) |
| Vlaamsch Broodhuys (Haarlemmerstraat) | operator's own site | Daily 08:00-17:00 |
| Hartog's Volkoren | operator's own site | Mon-Fri 07:00-18:00; Sat 07:00-17:00; Sun closed |
| Bocca Coffee (Kerkstraat) | operator's own site | Mon-Fri 8:00-18:00; Sat-Sun 9:00-18:00 |
| De Wasserette | operator's own site | Daily 07:30-17:00 |

## Not used (34)

| Place | Why |
|---|---|
| Canal Belt | generic, not a place (district) |
| Jordaan | generic, not a place (neighbourhood) |
| Jordaan or De Pijp | generic, not a place |
| Canal walks | generic, not a place |
| Market snacks | generic, not a place |
| Canal house stay | generic, not a place |
| Private boat cruise | generic, not a place |
| Fine tasting menu dinner | generic, not a place |
| Canal cruise at dusk | generic, not a place |
| Jordaan dinner | generic, not a place |
| Museum and cafe day | generic, not a place |
| Canal boat ride | generic, not a place |
| Museum morning | generic, not a place |
| Coffee in De Pijp | generic, not a place |
| Noord ferry exploration | generic, not a place |
| Brown cafe night | generic, not a place |
| Hidden courtyard wandering | generic, not a place |
| Ferry to Noord | operator page (GVB) returned HTTP 403; not fetched further. (A'DAM Lookout's site mentions the free F3 ferry, used only as that venue's own travel note.) |
| De Kas | official site returned HTTP 403 Forbidden |
| Restaurant Breda | official site returned HTTP 503 Service Unavailable (www.restaurant-breda.nl does not resolve; breda-amsterdam.com 404) |
| Breda | duplicate of Restaurant Breda; official site HTTP 503 |
| Dignita | official sites unreachable: eatwelldogood.nl HTTP 503, dignita.nl connection refused |
| Tales & Spirits | talesandspirits.com 301-redirects to an unrelated domain (jeremysaid.com); no official venue page readable |
| Door 74 | official site shows only "This site is currently under construction"; no address or operating evidence |
| Saint-Jean | no official website found (boulangerie-saintjean.nl does not resolve); only guides/maps list it |
| Lot Sixty One | official site TLS/certificate error (TLSV1_ALERT_INTERNAL_ERROR); not bypassed |
| Friedhats | official site lists Fuku Cafe at Bos en Lommerweg 136 but no hours or dated content; operating status not evidenced |
| Vondelpark | City of Amsterdam page returned HTTP 403 |
| Van Gogh Museum | official pages returned no readable content (unrendered template placeholder only) |
| Heineken Experience | official homepage shows no street address; contact page 404 |
| Hortus Botanicus | certificate hostname mismatch on hortusbotanicus.nl; not bypassed |
| Albert Cuyp Market | City of Amsterdam page returned HTTP 403 |
| Begijnhof | candidate URL returned HTTP 404 |
| Amsterdam Museum | main Kalverstraat location "currectly closed" for renovation; other locations listed without street addresses |

## Limitations

Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read by automated fetch: De Kas and the City of Amsterdam pages for Vondelpark and Albert Cuyp Market (HTTP 403), Restaurant Breda and Dignita (503 or connection refused), Lot Sixty One and Hortus Botanicus (certificate errors), the Van Gogh Museum (no readable content), and the GVB ferry page (403). Tales & Spirits' domain redirects elsewhere and Door 74's site is under construction. Some places were published only partially: NEMO and ARTIS hours were not readable, the Rembrandt House Museum's closing time was cut off, the Royal Palace's daily calendar did not load, and several cafés and bakeries (Cafe de Klepel, Little Collins, Fabel Friet, Hartog's Volkoren, Bocca Coffee, De Wasserette) showed hours but no 2026-dated content, so they are marked medium confidence. Gap candidates checked exceeded eight because many failed; the confirmed total is 22, below the 25-35 target.
