/*
 * Working source ledger for the first city-content pass.
 * Place names are retained with a source URL so published copy can be audited.
 */
window.HB_DATA = window.HB_DATA || {};

window.HB_DATA.citySourceLedger = {
  "Melbourne, Australia": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read: Melbourne Museum (HTTP 403), and South Melbourne Market, MoVida and most specialty-coffee roasters' sites (Market Lane, Seven Seeds, Patricia, Proud Mary, Industry Beans, Dukes, ST. ALi, Axil, Code Black) returned HTTP 429, so the coffee list is thinner than intended. Arts Centre Melbourne returned no readable content. Melbourne Zoo, the Shrine of Remembrance, the MCG, SEA LIFE Melbourne, Prahran Market and Gimlet were left out because no street address appeared on the pages read. Some confirmed places are only partly published: Melbourne Skydeck, Vue de monde and Brunetti Classico (Carlton) showed no hours; Queen Victoria Market and Collingwood Children's Farm give no street number; Supernormal, Cumulus Inc., Black Pearl, Siglo and Vue de monde showed no dated 2026 content beyond current hours or booking links. On the Queen Victoria Market getting-here page and the Baker Bleu locations page, the fetch summariser reported text addressed to AI assistants but did not return its wording, so it could not be quoted and may have been a misreading of the request.",
    "sourceUrls": [
      "docs/content-research/melbourne-2026-10-25.md",
      "docs/content-research/melbourne-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Laneways",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Street-art walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Yarra River evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Great Ocean Road / Great Ocean Road extension",
        "checkedOn": "2026-10-25",
        "reason": "a region and day trip, not a single place with an operator; not checked"
      },
      {
        "name": "All other input entries (e.g. \"a laneway coffee and dinner\", \"A cafe near Fitzroy\", \"Free museum or public garden time\", \"A rooftop or waterfront evening\")",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Melbourne Museum",
        "url": "https://museumsvictoria.com.au/melbournemuseum/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden on automated fetch; not bypassed"
      },
      {
        "name": "Melbourne Zoo",
        "url": "https://www.zoo.org.au/melbourne/getting-here/",
        "checkedOn": "2026-10-25",
        "reason": "No exact street address on pages read (only \"at Royal Park\"); site otherwise active"
      },
      {
        "name": "Shrine of Remembrance",
        "url": "https://www.shrine.org.au/",
        "checkedOn": "2026-10-25",
        "reason": "No street address on pages read (only postal GPO Box); hours and 'Updated 5 October 2026' seen"
      },
      {
        "name": "Melbourne Cricket Ground (MCG)",
        "url": "https://www.mcg.org.au/",
        "checkedOn": "2026-10-25",
        "reason": "No street address on homepage; contact page returned 404"
      },
      {
        "name": "SEA LIFE Melbourne Aquarium",
        "url": "https://www.visitsealife.com/melbourne/",
        "checkedOn": "2026-10-25",
        "reason": "No street address on homepage; getting-here page returned 404"
      },
      {
        "name": "Prahran Market",
        "url": "https://www.prahranmarket.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "No street address on homepage and inconsistent hours; visit page timed out"
      },
      {
        "name": "Arts Centre Melbourne",
        "url": "https://www.artscentremelbourne.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Fetch returned no readable content"
      },
      {
        "name": "South Melbourne Market",
        "url": "https://www.southmelbournemarket.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "MoVida",
        "url": "https://www.movida.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Market Lane Coffee",
        "url": "https://www.marketlane.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Seven Seeds",
        "url": "https://www.sevenseeds.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Patricia Coffee Brewers",
        "url": "https://www.patriciacoffee.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Proud Mary",
        "url": "https://www.proudmarycoffee.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Industry Beans",
        "url": "https://www.industrybeans.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Dukes Coffee Roasters",
        "url": "https://www.dukescoffee.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "ST. ALi",
        "url": "https://stali.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Axil Coffee Roasters",
        "url": "https://www.axilcoffee.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Code Black Coffee",
        "url": "https://www.codeblackcoffee.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests; not bypassed"
      },
      {
        "name": "Gimlet at Cavendish House",
        "url": "https://www.gimlet.melbourne/visit",
        "checkedOn": "2026-10-25",
        "reason": "No street address on homepage or visit page"
      },
      {
        "name": "Lui Bar",
        "url": "https://www.luibar.com/",
        "checkedOn": "2026-10-25",
        "reason": "Address shown but no hours, dates or other operating evidence on page read"
      },
      {
        "name": "Hardware Société",
        "url": "https://www.hardwaresociete.com/",
        "checkedOn": "2026-10-25",
        "reason": "Page read showed no address, hours or operating evidence"
      },
      {
        "name": "Pellegrini's Espresso Bar",
        "url": "https://www.pellegrinis.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "pellegrinis.com.au is a different business (Chatswood and Orange, NSW); no official Melbourne site found"
      },
      {
        "name": "Ombra (Bourke St)",
        "url": "https://florentino.melbourne/",
        "checkedOn": "2026-10-25",
        "reason": "Operator's site lists it as \"Permanently Closed\""
      },
      {
        "name": "Arlechin",
        "url": "https://florentino.melbourne/",
        "checkedOn": "2026-10-25",
        "reason": "Operator's site lists it as \"Temporarily Closed\" with no reopening date"
      },
      {
        "name": "Bar Americano",
        "url": "https://www.baramericano.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (DNS error); no official page read"
      },
      {
        "name": "Pidapipo",
        "url": "https://www.pidapipo.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (DNS error); no official page read"
      }
    ],
    "placeSources": {
      "Federation Square": {
        "url": "https://fedsquare.com/getting-here",
        "sourceType": "operator's own site (Fed Square)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage lists upcoming events including \"Victorian Festival of Diwali 2026\" (31 Oct) and \"African Music and Cultural Festival 2026\" (20–22 Nov, free)."
      },
      "NGV International": {
        "url": "https://www.ngv.vic.gov.au/visit/",
        "sourceType": "official public operator (National Gallery of Victoria)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page notes \"selected Gallery spaces may be temporarily closed from 7 Sep – 13 Dec 26 to install NGV Triennial\"; general entry free, \"Entry fees may apply to special exhibitions\"."
      },
      "The Ian Potter Centre: NGV Australia": {
        "url": "https://www.ngv.vic.gov.au/visit/",
        "sourceType": "official public operator (National Gallery of Victoria)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page gives current hours and free general entry; Fed Square's listings show \"Margaret Preston at The Ian Potter Centre: NGV Australia\" running 4 Sep–31 Jan."
      },
      "ACMI": {
        "url": "https://www.acmi.net.au/visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page \"Last modified: 16 September 2026\"; free museum entry with the ongoing exhibition The Story of the Moving Image; Fed Square lists \"Lifelike at ACMI\" 20 Nov–18 Apr."
      },
      "Royal Botanic Gardens Victoria – Melbourne Gardens": {
        "url": "https://www.rbg.vic.gov.au/melbourne-gardens/",
        "sourceType": "official public operator (Royal Botanic Gardens Victoria)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists 2026 programs including \"Punting on the Lake\" (1 Sep 2026 to 31 May 2027) and a notice that The Explorer departs from Oak Lawn from 26 October 2026 \"until further notice\"."
      },
      "Queen Victoria Market": {
        "url": "https://qvm.com.au/getting-here/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage lists events such as \"Melbourne International Dumpling Festival\" (Monday 2 November) and \"Stock Up Vintage Market\" (Sunday 15 November)."
      },
      "State Library Victoria": {
        "url": "https://www.slv.vic.gov.au/visit",
        "sourceType": "official public operator (State Library Victoria)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions listed include World of the Book and You Have A New Memory (2026 pages) plus Ned Kelly's armour; \"©2026 State Library Victoria\"."
      },
      "Melbourne Skydeck": {
        "url": "https://www.melbourneskydeck.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Offers dated 2026, including Love Locals ($25) \"until 30 Nov, 2026\" and a Halloween weekend \"Friday 30 October – Sunday 1 November\"; \"book online and save up to 15% off\"."
      },
      "Old Melbourne Gaol": {
        "url": "https://www.oldmelbournegaol.com.au/",
        "sourceType": "operator's own site (National Trust)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Tickets on sale (adult $38, child $22, family $90); events dated Saturday 31 October 2026 and Saturday 7 November 2026."
      },
      "Heide Museum of Modern Art": {
        "url": "https://www.heide.com.au/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Tickets bookable via Humanitix (adult $27, under 16 free); current notice that \"Your journey to Heide may be impacted\" by North East Link works."
      },
      "Collingwood Children's Farm": {
        "url": "https://www.farm.org.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"© 2026 Collingwood Children's Farm\"; entry prices published (adults $20, children $10, under-2s free); school tours bookable \"for Term 3\"."
      },
      "Flower Drum": {
        "url": "https://www.flowerdrum.melbourne/bookings/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bookings page: \"closed for our annual Christmas & New Year break from Sunday December 20th 2026\", re-opening \"Tuesday January 5th 2027\"; Wine-List-2026 published."
      },
      "Florentino": {
        "url": "https://florentino.melbourne/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"THE AGE GOOD FOOD GUIDE 2026 – TWO HATS\"; reservations link and current dining room, café and Cellar Bar hours."
      },
      "Chin Chin": {
        "url": "https://www.chinchin.melbourne/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Open from 11am 'til late\" with a \"Book now\" link; current main menu PDF dated 2026 in its file path."
      },
      "Supernormal": {
        "url": "https://www.supernormal.net.au/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Contact page publishes current hours and a booking link; no dated 2026 content found."
      },
      "Cumulus Inc.": {
        "url": "https://www.cumulusinc.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Open seven days; walk-ins welcome, reservations online via SevenRooms or by phone; no dated 2026 content."
      },
      "Attica": {
        "url": "https://www.attica.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Attica is open for dinner from Tuesday to Saturday\"; online booking with waiting list; Friday and Saturday lunch from 12noon in November–December; \"©Attica 2026\"."
      },
      "Vue de monde": {
        "url": "https://www.vuedemonde.com.au/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Reservations links and contact details current; only 2026 item is a 2026 privacy-policy file."
      },
      "Higher Ground": {
        "url": "https://www.highergroundmelbourne.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bookings via SevenRooms, \"reservations are strongly recommended\"; \"© 2026 Darling Group\"."
      },
      "Black Pearl": {
        "url": "https://www.blackpearlbar.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Black Pearl is walk-in only, with reservations recommended for The Attic\"; no dated 2026 content."
      },
      "Siglo": {
        "url": "https://www.siglobar.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"No bookings, no time limits. Service at table.\"; no dated 2026 content."
      },
      "Eau de Vie": {
        "url": "https://www.eaudevie.com.au/melbourne",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online reservations up to 3 months ahead; \"Eau-De-Vie requires credit card details to secure your reservation\"; bookings held for 90 minutes."
      },
      "Lune Croissanterie (Fitzroy)": {
        "url": "https://www.lunecroissanterie.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current Fitzroy specials and drinks menu; FAQ says counter service is \"first-come, first-served\" and pre-orders are available \"at all Lune venues except Russell St\"."
      },
      "Baker Bleu (Cremorne)": {
        "url": "https://www.bakerbleu.com.au/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage posts dated October 2026 (\"Ten years of dark crust\", \"Celebrate Harvest\")."
      },
      "Tivoli Road Bakery": {
        "url": "https://www.tivoliroad.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current trading hours published; \"© 2026 Tivoli Road Bakery\"."
      },
      "Brunetti Classico (Carlton)": {
        "url": "https://brunetticlassico.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"© 2026 Brunetti classico\"; current Carlton offers, with Pizza Thursdays \"now available at our Carlton location\"."
      }
    }
  },
  "Rio de Janeiro, Brazil": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several sites could not be read: Theatro Municipal and Garota de Ipanema (expired certificates), Museu Nacional de Belas Artes, Artesanos Bakery and Hotel Santa Teresa (DNS failures), Bar do Mineiro (connection reset) and Bar Lagoa (nothing readable); no official site was found for Padaria Nema. MAR and IMS Rio are temporarily closed per their own sites, and at Copacabana Palace, Cipriani and the Pool Bar are under renovation. Hours were not published on the pages read for Trem do Corcovado, Cristo Redentor, CCBB Rio, Parque Lage, Bar Urca, Aprazível, Churrascaria Palace, Confeitaria Colombo, Cafeína and the Copacabana Palace and Fairmont venues (except Tropìk). Several restaurants and cafés show no dated content beyond a 2026 copyright, booking links or menus. Election-day (25 October) notices at MAM Rio and CCBB were left out as short-lived. The MAR homepage contained unrelated gambling links that appear to be injected spam.",
    "sourceUrls": [
      "docs/content-research/rio-de-janeiro-2026-10-25.md",
      "docs/content-research/rio-de-janeiro-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Ipanema Beach",
        "checkedOn": "2026-10-25",
        "reason": "public beach with no operator website to check; not confirmable under the evidence rules"
      },
      {
        "name": "Museu de Arte do Rio (MAR)",
        "url": "https://museudeartedorio.org.br/",
        "checkedOn": "2026-10-25",
        "reason": "official site says 'O MAR está temporariamente fechado' with no reopening date"
      },
      {
        "name": "Instituto Moreira Salles (IMS Rio)",
        "url": "https://ims.com.br/unidade/rio-de-janeiro/",
        "checkedOn": "2026-10-25",
        "reason": "official site says the Rio unit is 'fechado temporariamente para reformas', no reopening date"
      },
      {
        "name": "Theatro Municipal do Rio de Janeiro",
        "url": "https://theatromunicipal.rj.gov.br/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed: certificate has expired"
      },
      {
        "name": "Garota de Ipanema (bar)",
        "url": "https://www.garotadeipanema.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed: certificate has expired"
      },
      {
        "name": "Museu Nacional de Belas Artes",
        "url": "https://mnba.gov.br/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed: DNS error (EAI_AGAIN)"
      },
      {
        "name": "Ristorante Hotel Cipriani (Copacabana Palace)",
        "url": "https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace/",
        "checkedOn": "2026-10-25",
        "reason": "operator says closed for renovation, no reopening date"
      },
      {
        "name": "Pool Bar (Copacabana Palace)",
        "url": "https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace/dining",
        "checkedOn": "2026-10-25",
        "reason": "operator says 'Currently under renovation'"
      },
      {
        "name": "Talho Capixaba",
        "url": "https://www.talhocapixaba.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "official site gives addresses but no hours, menu, booking or dated content as operating evidence"
      },
      {
        "name": "Armazém do Café",
        "url": "https://www.armazemdocafe.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "official site gives addresses but no hours or current content (copyright 2025)"
      },
      {
        "name": "Gero Rio (Fasano Rio de Janeiro)",
        "url": "https://www.fasano.com.br/hoteis/fasano-rio-de-janeiro/",
        "checkedOn": "2026-10-25",
        "reason": "hotel page gives no hours, booking or dated content for the restaurant"
      },
      {
        "name": "Baretto-Londra (Fasano Rio de Janeiro)",
        "url": "https://www.fasano.com.br/restaurantes/baretto-londra-rio-de-janeiro/",
        "checkedOn": "2026-10-25",
        "reason": "restaurant page returned 404; hotel page names it only as an events venue"
      },
      {
        "name": "Bar Astor",
        "url": "https://www.barastor.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "official site lists São Paulo branches only; no Rio branch"
      },
      {
        "name": "Bar Lagoa",
        "url": "https://www.barlagoa.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "fetch returned nothing readable"
      },
      {
        "name": "Bar do Mineiro",
        "url": "https://www.bardomineiro.net/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed: connection reset (ECONNRESET)"
      },
      {
        "name": "Hotel Santa Teresa (Bar dos Descasados)",
        "url": "https://www.hotelsantateresa.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed: DNS not found"
      },
      {
        "name": "Padaria Nema",
        "url": "https://www.padarianema.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "no official website found (nema.com.br belongs to an unrelated company; padarianema.com.br does not resolve)"
      },
      {
        "name": "Artesanos Bakery",
        "url": "https://www.artesanosbakery.com.br/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed: DNS not found"
      },
      {
        "name": "a Brazilian grill or beachside seafood dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Copacabana local table",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Rio de Janeiro signature dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Copacabana walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ipanema public viewpoint",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market or picnic near Santa Teresa",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for Christ the Redeemer",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a golden-hour viewpoint over the bay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Destination dinner near Santa Teresa",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset around Sugarloaf Mountain",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Copacabana dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Family-friendly Christ the Redeemer",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Easy outing around Ipanema",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near Santa Teresa",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Early visit to Christ the Redeemer",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Copacabana cafe or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Ipanema route",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ipanema at a quieter hour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Santa Teresa local rhythm",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near Copacabana",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ipanema bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before Christ the Redeemer",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a Brazilian grill or beachside seafood lunch",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual lunch near Sugarloaf Mountain",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local stop around Santa Teresa",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Evening table in Copacabana",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near Copacabana",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around Ipanema",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near Ipanema Beach",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near Copacabana",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ipanema morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before Christ the Redeemer",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Copacabana",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in Ipanema",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup near Santa Teresa",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Bondinho Pão de Açúcar": {
        "url": "https://www.bondinho.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online 'Comprar Ingressos' sales with ticket types incl. 'Acesso Rápido / Visita Guiada'; 'Copyright © 2026' and the Anna Bella Geiger 'Projeto Maravilha' exhibition listed as included with the ticket."
      },
      "Trem do Corcovado": {
        "url": "https://www.tremdocorcovado.rio/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live ticket prices 'VALOR PARA VISITA HOJE' (Adulto R$ 134,00; children up to 6 free on a guardian's lap) sold online, by phone and app; '© 2026 Trem do Corcovado'."
      },
      "Cristo Redentor": {
        "url": "https://santuariocristoredentor.com.br/",
        "sourceType": "operator's own site (Santuário Cristo Redentor)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News dated October 2026, incl. 16/10/2026 celebration of the statue's '95 anos' and special illuminations on 18/10 and 21/10/2026."
      },
      "Museu do Amanhã": {
        "url": "https://museudoamanha.org.br/pt-br/visite",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page gives current hours; homepage lists a 10th-anniversary exhibition, the new outdoor 'Jardim de Esculturas' and an event dated 2026-10-31."
      },
      "Real Gabinete Português de Leitura": {
        "url": "https://www.realgabinete.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'horário atual' published; exhibition 'Convergência Lusíada: 50 anos da revista do RGPL' 'está em cartaz'; '12º Colóquio do PPLB (2026)' listed."
      },
      "Parque Lage (Escola de Artes Visuais)": {
        "url": "https://eavparquelage.rj.gov.br/",
        "sourceType": "official public operator (Rio de Janeiro state, EAV Parque Lage)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026 programme incl. Cine Lage on 30 October and the book launch 'Rogério Sganzerla: cinemáticas de invenção' on 4 November 2026."
      },
      "MAM Rio": {
        "url": "https://mam.rio/visite/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions 'Coleções de arte', 'Carnaval como método' and an Andréa Hygino installation; 'programação completa de outubro' promoted. 'O ingresso no MAM Rio é gratuito'."
      },
      "AquaRio": {
        "url": "https://www.aquariomarinhodorio.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online ticketing with a discount for booking online; ticket and security policy PDFs uploaded August 2026."
      },
      "Jardim Botânico do Rio de Janeiro": {
        "url": "https://www.gov.br/jbrj/pt-br/assuntos/visitacao/horarios-e-ingressos",
        "sourceType": "official public operator (Instituto de Pesquisas Jardim Botânico do Rio de Janeiro, federal government)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours page updated 30/07/2026 and tickets sold in advance via jbrj.eleventickets.com; homepage notices for Semana Nacional de Ciência e Tecnologia 2026."
      },
      "Parque Nacional da Tijuca": {
        "url": "https://parquenacionaldatijuca.rio/",
        "sourceType": "official public operator (Parque Nacional da Tijuca / ICMBio)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Notices dated August 2026, including a closure and 'Reabertura do Parque Nacional da Tijuca' on 7 Aug 2026."
      },
      "CCBB Rio de Janeiro": {
        "url": "https://ccbb.com.br/rio-de-janeiro/",
        "sourceType": "operator's own site (Centro Cultural Banco do Brasil)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions 'Amazônicas – Poéticas Femininas' (02/09 to 16/11) and 'Palavras em Cena: O Cinema que Veio dos Livros' (until 31/12), with tickets via ingressosccbb.com.br."
      },
      "CADEG": {
        "url": "https://www.cadeg.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Posts dated 2026 (e.g. 28/05/2026 Dia dos Namorados campaign, 06/05/2026 Banco de Alimentos project); shops in about 20 categories incl. restaurants, bars and cafeterias."
      },
      "Bar Urca": {
        "url": "https://www.barurca.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Menus section and reservation form on the site; dishes named include 'Bolinhos de bacalhau', 'Moqueca' and 'Camarão na moranga'. No dated content."
      },
      "Aprazível": {
        "url": "https://www.aprazivel.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online reservations via aprazivel.meitre.com and a menu page; '© 2026. Aprazível'. Cuisine described as 'trivial, saborosa, orgânica'."
      },
      "Lasai": {
        "url": "https://www.lasai.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online booking via Tock; 'Só atendemos mediante reserva'; tasting menu only. No dated content."
      },
      "Oro": {
        "url": "https://www.ororestaurante.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Reservas pela Meitre ou pelos telefones da casa'; two menus, 'Criatividade' (changes daily) and 'Afetividade'; '© 2026'."
      },
      "Churrascaria Palace": {
        "url": "https://www.churrascariapalace.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Marks its 75th anniversary with a commemorative wine; year-end party menus and a 'Reserve Agora!' booking button; rodízio of about 40 meats plus buffet."
      },
      "Pérgula (Belmond Copacabana Palace)": {
        "url": "https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace/dining",
        "sourceType": "operator's own site (Belmond)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Listed as an open restaurant serving breakfast, lunch and dinner, with Sunday Brunch and Feijoada experiences; 'Copyright Belmond Management Limited 2026'."
      },
      "MEE (Belmond Copacabana Palace)": {
        "url": "https://www.belmond.com/hotels/south-america/brazil/rio-de-janeiro/belmond-copacabana-palace/dining",
        "sourceType": "operator's own site (Belmond)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Listed as a current 'Michelin-starred pan-Asian restaurant' on the 2026 dining page, alongside renovation notices for other venues that do not include MEE."
      },
      "Spirit Copa Bar (Fairmont Rio de Janeiro Copacabana)": {
        "url": "https://www.fairmont.com/en/hotels/rio-de-janeiro/fairmont-rio-de-janeiro-copacabana/dining.html",
        "sourceType": "operator's own site (Fairmont)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dining page lists 'classic drinks and house mixology' and a Sunday feijoada with live samba; the site carries offers bookable from 15 October 2026 and New Year's Eve 2027 dinner."
      },
      "Tropìk (Fairmont Rio de Janeiro Copacabana)": {
        "url": "https://www.fairmont.com/en/hotels/rio-de-janeiro/fairmont-rio-de-janeiro-copacabana/dining.html",
        "sourceType": "operator's own site (Fairmont)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Mediterranean and Greek cuisine at Posto 6 led by chef Jérôme Dardillac; open 'from 8am to midnight'; site has offers bookable from 15 October 2026."
      },
      "Coa Café & Co (Fairmont Rio de Janeiro Copacabana)": {
        "url": "https://www.fairmont.com/en/hotels/rio-de-janeiro/fairmont-rio-de-janeiro-copacabana/dining.html",
        "sourceType": "operator's own site (Fairmont)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Listed on the dining page serving organic coffees from Camocim Farm and an afternoon tea with pastries; site has offers bookable from 15 October 2026."
      },
      "Academia da Cachaça (Leblon)": {
        "url": "https://www.academiadacachaca.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published branch hours, delivery hours and per-branch menu PDFs; caipirinhas described as 'incomparáveis', feijoada served daily; '© Academia da Cachaça 2026'."
      },
      "Confeitaria Colombo (Rua Gonçalves Dias)": {
        "url": "https://www.confeitariacolombo.com.br/contato/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage offers 'Reservar uma Mesa' online booking and links the current menu: 'Conheça o cardápio da Colombo Matriz'. No dated content."
      },
      "La Bicyclette (Jardim Botânico)": {
        "url": "https://www.labicyclette.com.br/nossas-lojas",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Store page publishes current hours for three branches; describes itself as 'Padaria artesanal, mercearia e bistrô'. No dated content."
      },
      "Curto Café (Centro)": {
        "url": "https://curto.cafe/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published weekday hours and '© 2026 Curto Café'."
      },
      "Cafeína (Copacabana)": {
        "url": "https://cafeinacafe.com.br/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "In-store menu PDF dated September 2026 and breakfast baskets on sale (e.g. 'Cesta Elegance: R$ 305,00')."
      }
    }
  },
  "Vancouver, Canada": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Stanley Park (City of Vancouver), the Vancouver Aquarium and Dr. Sun Yat-Sen Classical Chinese Garden returned HTTP 403; Bill Reid Gallery, 49th Parallel, Revolver, Anh and Chi and Elysian Coffee returned HTTP 429; Science World, Vancouver Lookout, FlyOver Canada and Matchstick Coffee returned no readable content, so none of these are included, and none of these failures indicates a closure. Several confirmed places publish no dated 2026 content and rest on standing hours or booking notices (Joe Fortes, Miku, Café Medina, St. Lawrence, Botanist, The Pourhouse, Purebread, Beaucoup Bakery, Small Victory, Nemesis Coffee, Lonsdale Quay Market); Grouse Mountain, Café Medina and Published on Main publish no hours on the pages read; The Pourhouse shows two conflicting hour sets; and Beaucoup Bakery's Kitsilano hours are ambiguous in the page layout. The Diamond's former domain now redirects to another business. One automated summary of the Lonsdale Quay page mentioned AI-directed text, but a re-read found none, so nothing is quoted.",
    "sourceUrls": [
      "docs/content-research/vancouver-2026-10-25.md",
      "docs/content-research/vancouver-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Stanley Park",
        "url": "https://vancouver.ca/parks-recreation-culture/stanley-park.aspx",
        "checkedOn": "2026-10-25",
        "reason": "Official City of Vancouver page returned HTTP 403 Forbidden to automated reading; not bypassed. Not evidence of closure."
      },
      {
        "name": "Vancouver Aquarium",
        "url": "https://www.vanaqua.org/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "Dr. Sun Yat-Sen Classical Chinese Garden",
        "url": "https://vancouverchinesegarden.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "Science World",
        "url": "https://www.scienceworld.ca/",
        "checkedOn": "2026-10-25",
        "reason": "Homepage returned only a cookie notice with no readable visit content; visit pages tried returned 404."
      },
      {
        "name": "Vancouver Lookout",
        "url": "https://vancouverlookout.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned nothing readable beyond the title."
      },
      {
        "name": "FlyOver Canada",
        "url": "https://www.experienceflyover.com/vancouver/",
        "checkedOn": "2026-10-25",
        "reason": "Official site (redirected to experienceflyover.com) returned nothing readable beyond the title."
      },
      {
        "name": "Bill Reid Gallery",
        "url": "https://www.billreidgallery.ca/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 429 Too Many Requests on two attempts."
      },
      {
        "name": "49th Parallel Coffee",
        "url": "https://49thcoffee.com/pages/locations",
        "checkedOn": "2026-10-25",
        "reason": "Official locations page returned HTTP 429 Too Many Requests on three attempts."
      },
      {
        "name": "Revolver Coffee",
        "url": "https://www.revolvercoffee.ca/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 429 Too Many Requests on two attempts."
      },
      {
        "name": "Anh and Chi",
        "url": "https://www.anhandchi.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 429 Too Many Requests on two attempts."
      },
      {
        "name": "Elysian Coffee",
        "url": "https://www.elysiancoffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 429 Too Many Requests."
      },
      {
        "name": "Matchstick Coffee",
        "url": "https://matchstickcoffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned no readable content."
      },
      {
        "name": "The Diamond (Gastown)",
        "url": "https://www.di6mond.com/",
        "checkedOn": "2026-10-25",
        "reason": "Former official domain di6mond.com now redirects to ghostalleyespresso.com; the bar could not be confirmed."
      },
      {
        "name": "Jam Cafe",
        "url": "https://www.jamcafes.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site lists hours by branch but no street addresses; no dated content."
      },
      {
        "name": "Breka Bakery & Café",
        "url": "https://www.breka.ca/",
        "checkedOn": "2026-10-25",
        "reason": "Official site gives no branch street addresses in its text, and an 'Important Notice' about temporary store closures was not readable."
      },
      {
        "name": "Ask for Luigi",
        "url": "https://www.askforluigi.com/",
        "checkedOn": "2026-10-25",
        "reason": "Readable portion of official site gave no address, hours or dated content."
      },
      {
        "name": "Lee's Donuts",
        "url": "https://www.leesdonuts.ca/",
        "checkedOn": "2026-10-25",
        "reason": "Readable portion of official site listed branches but no street address or hours."
      },
      {
        "name": "Prohibition (Rosewood Hotel Georgia)",
        "url": "https://www.rosewoodhotels.com/en/hotel-georgia-vancouver/dining/prohibition",
        "checkedOn": "2026-10-25",
        "reason": "Not listed among the hotel's dining venues on the official Rosewood page (which lists 1927 Lounge, The Georgia Bar, Hawksworth, Prophecy and others); not confirmed."
      },
      {
        "name": "Granville Island",
        "url": "https://granvilleisland.com/",
        "checkedOn": "2026-10-25",
        "reason": "Area rather than a single venue; the official granvilleisland.com pages give no single street address, so it is covered through Granville Island Public Market."
      },
      {
        "name": "Stanley Park bike ride",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (activity; Stanley Park page blocked)"
      },
      {
        "name": "North Shore mountains",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (covered through Grouse Mountain)"
      },
      {
        "name": "a seafood or Asian food crawl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Vancouver market or cafe",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local dinner in Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A cafe near Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market breakfast in Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A dessert stop in Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free or low-cost Downtown walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Public viewpoint near Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market meal around Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A self-guided walk through Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free museum or public garden time",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood market stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for Stanley Park",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A signature meal in Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A tailored day around Stanley Park bike ride",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A private transfer between highlights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A special evening in Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower day with a local guide",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset near Granville Island",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Downtown evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long dinner in Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A scenic morning near Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A photo-friendly walk through Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Family-friendly Stanley Park",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Easy outing around Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A hands-on stop near Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short scenic outing with room to move",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A treat everyone can agree on",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Early visit to Stanley Park",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Downtown cafe or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Grouse Mountain outing",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A museum or gallery at your own pace",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A people-watching break in Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A flexible afternoon with one clear anchor",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A quieter side of Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local recommendation beyond the headline sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short detour beyond Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Gastown bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before Stanley Park",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local pastry to take on the road",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and a walk through Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed brunch near Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual lunch near Granville Island",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local stop around Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market lunch in Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A quick meal between sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long midday table in Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower dinner in Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local specialty near Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final-night meal away from the busiest sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near North Shore mountains",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed night close to the stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A late drink after dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A rooftop or waterfront evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Gastown morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before Stanley Park",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A regional sweet to take on the road",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A fresh bake near Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A pastry stop between neighborhoods",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Downtown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in Gastown",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup near Kitsilano",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A coffee stop before the first sight",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood cafe break",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view with your morning coffee",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Grouse Mountain": {
        "url": "https://www.grousemountain.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current notices: \"the Grouse Grind is currently closed for annual maintenance until Tuesday, November 10th\" (BCMC Trail stays open); Red Skyride has \"newly opened cabins\"; early-bird pass sale with prices up \"November 5th\". The year appears only in image paths, but 10 November falls on a Tuesday in 2026."
      },
      "Capilano Suspension Bridge Park": {
        "url": "https://www.capbridge.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Canyon Frights runs October 9, 2026 to November 1, 2026 (\"Canyon Frights On Now!\"); footer \"© 2026\". Passholders must reserve online in advance and weekend and holiday time slots are limited."
      },
      "Vancouver Art Gallery": {
        "url": "https://www.vanartgallery.bc.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions include Future Geographies: Art in the Century of Climate Change and SANCTUARY: The Ancient Forest Experience (May 14, 2026 to January 10, 2027); Free First Friday Nights on November 6, 2026, 4 to 8 PM. Site recommends booking tickets online in advance."
      },
      "Museum of Anthropology at UBC": {
        "url": "https://moa.ubc.ca/",
        "sourceType": "official public operator (University of British Columbia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Tupananchiskama: Ancient Andean Cosmovision runs March 19, 2026 to January 3, 2027; From the Deep opens November 19, 2026; 2026 holiday hours published. Thursday evenings after 5 pm are half price; tickets sold at the door."
      },
      "The Polygon Gallery": {
        "url": "https://thepolygon.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Catherine Blackburn + Jeneen Frei Njootli: Traces runs September 25, 2026 to March 14, 2027; The Lind Biennial is listed for November 27, 2026 to January 31, 2027. \"Admission is always by donation, courtesy of BMO.\""
      },
      "Vancouver Maritime Museum": {
        "url": "https://www.vanmaritime.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dated programme includes An Evening on St. Roch fundraiser on Thursday, November 12 and October 2026 Argonaut II tours; the St. Roch Revitalization is listed as \"Opening Winter 2026/2027.\""
      },
      "Museum of Vancouver": {
        "url": "https://museumofvancouver.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Feature exhibitions include Becoming: The Art of Gu Xiong and The Suitcase Project; dated events include Spooky Storytime for Kids! (November 1, 2026) and Wild Dyes of the Pacific Northwest (November 29, 2026)."
      },
      "Granville Island Public Market": {
        "url": "https://granvilleisland.com/directory/public-market",
        "sourceType": "operator's own site (granvilleisland.com)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "granvilleisland.com lists 2026 events on the island (Writers Fest 2026, Theatresports September 4 - December 19) and states \"The Public Market is closed MONDAYS IN JANUARY ONLY for annual maintenance.\""
      },
      "Lonsdale Quay Market": {
        "url": "https://www.lonsdalequay.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Open 7 days a week with published level-by-level hours; \"Coming soon\" Anytime Fitness. 2026 dates appear only in uploaded file paths (hours signage uploaded 2026/04)."
      },
      "Blue Water Cafe": {
        "url": "https://bluewatercafe.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists 2026 awards (Vancouver Magazine \"Best Seafood Restaurant – Silver\", Wine Spectator Award of Excellence); online booking through SevenRooms, \"To book parties of 8 or more, please contact us directly\"."
      },
      "Vij's": {
        "url": "https://www.vijs.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Closure alert for private events on \"THURSDAY, 15 OCTOBER 2026\" and \"TUESDAY, 27 OCTOBER 2026\"; Michelin Bib Gourmand 2023-2026; reservations via Tock and \"Walk-In Guests Always Welcome!\""
      },
      "Joe Fortes Seafood & Chop House": {
        "url": "https://www.joefortes.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice \"We are open 11am to 11pm 7 days a week\" and an active reservations link; no dated 2026 content on the page."
      },
      "Miku Vancouver": {
        "url": "https://mikurestaurant.com/contact/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours of operation and OpenTable booking link; latest dated item is a 2025 Wine Spectator award."
      },
      "Café Medina": {
        "url": "https://www.medinacafe.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Active reservation booking (\"RESERVE YOUR TABLE NOW\", \"Make a Reservation by Donation\"); no dated 2026 content."
      },
      "St. Lawrence": {
        "url": "https://www.stlawrencerestaurant.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published service hours, a table d'hôte section and reservation page; no dated 2026 content."
      },
      "Kissa Tanto": {
        "url": "https://www.kissatanto.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current drinks list file dated September 23, 2026; \"Reservations open 30 days in advance at midnight\" through Tock for parties up to 6."
      },
      "Published on Main": {
        "url": "https://www.publishedonmain.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "States it is \"ranked #17 on North America's 50 Best Restaurants 2026\"; à la carte and Harvest Tasting Menu reservations; footer \"© 2026\"."
      },
      "The Teahouse in Stanley Park": {
        "url": "https://www.vancouverdine.com/teahouse/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "French Wine Dinner on \"Tuesday, October 27\" at $139 per person; Wine Hour and Dinner for Two offers; reservations via OpenTable or 604.669.3281."
      },
      "Hawksworth Restaurant": {
        "url": "https://hawksworthrestaurant.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Menu files dated September 28, October 5 and October 13, 2026; \"2026 MICHELIN Guide Recommended\"; reservations via OpenTable and Exploretock."
      },
      "The Keefer Bar": {
        "url": "https://www.thekeeferbar.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Footer \"© 2026 The Keefer Bar\"; \"we always save plenty of space for walk-ins\"; \"Guests must be 19+.\""
      },
      "Botanist": {
        "url": "https://www.botanistrestaurant.com/location/botanist/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published daily dining room and bar hours and an OpenTable booking link; no dated 2026 content."
      },
      "The Pourhouse": {
        "url": "https://www.pourhousevancouver.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours, daily happy hour 3pm-6pm and reservation buttons; no dated 2026 content, and two conflicting hour listings."
      },
      "Purebread (Gastown)": {
        "url": "https://purebread.ca/find-us",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Find-us page lists the Gastown branch with daily hours; FAQ says stores open 7 days a week except December 25, 26 and January 1. No dated 2026 content."
      },
      "Beaucoup Bakery (Kitsilano)": {
        "url": "https://www.beaucoupbakery.com/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Contact page publishes branch hours and closed days; no dated 2026 content, and the page layout makes the Kitsilano hours partly ambiguous."
      },
      "Small Victory (Yaletown)": {
        "url": "https://www.smallvictory.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch listing with hours and phone (604-336-6025); no explicit 2026 date on the page."
      },
      "Nemesis Coffee (Gastown)": {
        "url": "https://www.nemesis.coffee/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Locations page lists the Gastown branch with weekday and weekend hours; no dated 2026 content."
      }
    }
  },
  "Toronto, Canada": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several sites could not be read: the Art Gallery of Ontario (HTTP 403), Pilot Coffee and Balzac's (HTTP 429), Mildred's Temple Kitchen (connection refused), Sisters & Co., Roselle, Bar Pompette and Bakerbots (domain not found), Nord Lyon (SSL error), and Mother (no readable content). These failures are not evidence of closure. The Hockey Hall of Fame and Toronto Botanical Garden were left out because no street address loaded, and Toronto Island was left out because the City pages read gave no terminal address. Some confirmed places are only partly published: the CN Tower's weekly hours and the opening hours for Steam Whistle Brewing, Harbord Bakery and High Park were not shown, Ripley's showed only the current day's hours, Alo's closing time is not given, and several restaurants, bars and cafés have no 2026-dated content beyond a footer or published hours (medium confidence).",
    "sourceUrls": [
      "docs/content-research/toronto-2026-10-25.md",
      "docs/content-research/toronto-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "CN Tower area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (replaced by CN Tower, confirmed)"
      },
      {
        "name": "Toronto Islands access",
        "url": "https://www.toronto.ca/explore-enjoy/toronto-island-ferries/ferry-routes-schedules/",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place; City of Toronto island and ferry pages read but give no street address for the park or Jack Layton Ferry Terminal"
      },
      {
        "name": "Harbourfront walking",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Kensington Market grazing",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (neighbourhood with no single operator site)"
      },
      {
        "name": "High Park day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (replaced by High Park, confirmed)"
      },
      {
        "name": "Chef tasting-menu night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury Yorkville stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private harbor charter",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Island ferry at golden hour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Yorkville dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Distillery District evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Distillery Historic District confirmed separately)"
      },
      {
        "name": "Island ferry day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee in Queen West",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Kensington lunch walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "One market and one waterfront stretch",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Toronto Islands bike loop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Graffiti Alley",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place with an operator website"
      },
      {
        "name": "West Queen West design stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "St. Lawrence Market grazing",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (St. Lawrence Market confirmed separately)"
      },
      {
        "name": "Art Gallery of Ontario (from 'AGO or ROM visit')",
        "url": "https://ago.ca/",
        "checkedOn": "2026-10-25",
        "reason": "site refused automated reading (HTTP 403); not evidence of closure"
      },
      {
        "name": "Mildred's Temple Kitchen",
        "url": "https://www.templekitchen.com/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed (connection refused); not evidence of closure"
      },
      {
        "name": "Sisters & Co.",
        "url": "https://sistersandco.ca/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed (domain did not resolve); not evidence of closure"
      },
      {
        "name": "Civil Liberties",
        "url": "https://www.civillibertiesbar.com/",
        "checkedOn": "2026-10-25",
        "reason": "site read but shows only address (878 Bloor St West); no hours or current operating evidence"
      },
      {
        "name": "Blackbird Baking Co.",
        "url": "https://blackbirdbakingco.com/",
        "checkedOn": "2026-10-25",
        "reason": "www host had a certificate error; bare domain read but publishes no street address or hours"
      },
      {
        "name": "Roselle",
        "url": "https://www.roselledesserts.com/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed (domain did not resolve); not evidence of closure"
      },
      {
        "name": "Nord Lyon",
        "url": "https://www.nordlyon.com/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed (SSL error); not bypassed, not evidence of closure"
      },
      {
        "name": "Pilot Coffee",
        "url": "https://www.pilotcoffeeroasters.com/pages/cafes",
        "checkedOn": "2026-10-25",
        "reason": "site refused automated reading (HTTP 429, repeated); not evidence of closure"
      },
      {
        "name": "Hockey Hall of Fame",
        "url": "https://www.hhof.com/",
        "checkedOn": "2026-10-25",
        "reason": "homepage read (Induction Weekend Nov. 7-9, 2026) but no street address or hours found on pages that loaded; visit pages returned 404"
      },
      {
        "name": "Toronto Botanical Garden",
        "url": "https://torontobotanicalgarden.ca/",
        "checkedOn": "2026-10-25",
        "reason": "homepage read (hours and 2026 events) but no street address published; visit page returned 404"
      },
      {
        "name": "BarChef",
        "url": "https://barchef.com/",
        "checkedOn": "2026-10-25",
        "reason": "site shows address (472 Queen Street West) only; no hours or current operating evidence"
      },
      {
        "name": "Mother",
        "url": "https://www.mothercocktailbar.com/",
        "checkedOn": "2026-10-25",
        "reason": "fetch returned no readable content"
      },
      {
        "name": "Bar Pompette",
        "url": "https://www.barpompette.com/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed (domain did not resolve)"
      },
      {
        "name": "Dineen Coffee",
        "url": "https://dineencoffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "homepage read but no address or hours published"
      },
      {
        "name": "Balzac's (Distillery)",
        "url": "https://www.balzacs.com/pages/locations",
        "checkedOn": "2026-10-25",
        "reason": "site refused automated reading (HTTP 429)"
      },
      {
        "name": "Bakerbots",
        "url": "https://www.bakerbots.ca/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed (domain did not resolve)"
      },
      {
        "name": "Fort York",
        "url": "https://www.fortyork.ca/",
        "checkedOn": "2026-10-25",
        "reason": "fortyork.ca redirects to Friends of Fort York, a support group rather than the City operator; not used"
      }
    ],
    "placeSources": {
      "CN Tower": {
        "url": "https://www.cntower.ca/contact-us",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage promotes \"Browse ticket options\", \"Book EdgeWalk\" and 360 Restaurant reservations, a 2026 CityPASS banner, and a Toronto Biennial of Art work on view \"until December 20, 2026\"."
      },
      "St. Lawrence Market": {
        "url": "https://www.stlawrencemarket.com/",
        "sourceType": "operator's own site (City of Toronto linked)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Coming Up at the Market\" lists \"November 1st 2026 Antiques at St. Lawrence Market\" and \"October 25th 2026 Sunday Variety Vintage Market\"."
      },
      "Royal Ontario Museum": {
        "url": "https://www.rom.on.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibition \"Psychedelics\" runs until December 06, 2026; tickets sold online via \"Book tickets\"; \"3rd Tuesday Nights Free\" listed."
      },
      "Toronto Zoo": {
        "url": "https://www.torontozoo.com/tz/contact",
        "sourceType": "operator's own site (City of Toronto logo in footer)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage lists Boo at the Zoo (Oct 24, 25, 31), Remembrance Day ceremony (Nov 11) and \"GreenStep Tourism Level 4 - 2026\"; tickets \"Buy Early & Save!\"."
      },
      "Ripley's Aquarium of Canada": {
        "url": "https://www.ripleys.com/attractions/ripleys-aquarium-of-canada",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Page shows \"Today's Hours: 9:00 a.m. - 9:00 p.m.\" and \"Buy Tickets\"; the CN Tower site also sells a joint CN Tower and aquarium package."
      },
      "Distillery Historic District": {
        "url": "https://www.thedistillerydistrict.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"The 2026 season kicks off on Thursday, November 12th, at 6 pm!\" for Winter Village; October 2026 events listed; \"Open 364 days a year!\""
      },
      "Casa Loma": {
        "url": "https://casaloma.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Notice that \"the Conservatory and Peacock Alley will be closed on October 6th, 2026\"; \"Date specific General Admission tickets\" sold online; Legends of Horror Halloween event."
      },
      "Bata Shoe Museum": {
        "url": "https://batashoemuseum.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "New exhibition \"Brilliant: The Art of Beaded Footwear Around the World\" opened October 22; late hours to 9pm every second Friday through the end of 2026; free admission every Sunday."
      },
      "Gardiner Museum": {
        "url": "https://www.gardinermuseum.on.ca/visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage lists \"After the Island: Caribbean Canadian Ceramics\" and \"Magnus Hara: The Light of Day\" as on now; visit page publishes hours and free Wednesday evenings."
      },
      "Aga Khan Museum": {
        "url": "https://agakhanmuseum.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Saks Afridi: SpaceMosque\" runs October 24, 2026 to March 7, 2027 (\"Now Open\"); Toronto Biennial installation July 23, 2026 to April 11, 2027."
      },
      "High Park": {
        "url": "https://www.toronto.ca/explore-enjoy/parks-gardens-beaches/high-park/",
        "sourceType": "official public operator (City of Toronto)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "City page modified October 6, 2026; Trackless Train runs \"daily, weather permitting\" 10:30 a.m. to dusk in spring, summer and fall; Animal Display closed from October 13 through Spring 2027."
      },
      "Steam Whistle Brewing": {
        "url": "https://steamwhistle.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site offers \"Book a Tour\", \"Book a Table\" and group bookings; footer links a 2026-named report."
      },
      "Alo": {
        "url": "https://alorestaurant.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site publishes current service days and a reservations page; images uploaded March 2026."
      },
      "Pai (18 Duncan)": {
        "url": "https://www.paitoronto.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Downtown \"reservations open 30 days in advance\" and are not taken by phone; Thanksgiving (Mon. Oct. 12) closure notice; Square One \"Coming Fall 2026\"."
      },
      "Richmond Station": {
        "url": "https://www.richmondstation.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"6-course rotating tasting menu, available for dinner every night\"; online reservations; \"Copyright Richmond Station 2026\"; parking advice due to nearby construction."
      },
      "Canoe": {
        "url": "https://www.canoerestaurant.com/",
        "sourceType": "operator's own site (Oliver & Bonacini)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Taste Canoe: Fall 2026\" tasting menu; reservations online up to 3 months ahead for up to 12; bar walk-ins welcome subject to availability."
      },
      "Maha's": {
        "url": "https://www.mahasbrunch.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current walk-in policy (\"a walk-in only restaurant and do not take reservations\") and takeout menu; no 2026-dated content (copyright 2025)."
      },
      "Lady Marmalade": {
        "url": "https://www.ladymarmalade.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site states \"Open 8:30 to 3:00 every day!\"; no dated content."
      },
      "Simpl Things": {
        "url": "https://www.simplthings.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Page published \"Jul 10, 2026\"; online reservations up to 6 people, \"Walk-ins are always accepted!\"; \"$12 cocktail of the day everyday\"."
      },
      "Bar Raval": {
        "url": "https://www.thisisbarraval.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site publishes daily hours and \"NO RESERVATIONS\" policy; no dated content."
      },
      "Bar Mordecai": {
        "url": "https://www.barmordecai.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site publishes weekly hours and a \"RESERVE\" link; no dated content."
      },
      "Harbord Bakery": {
        "url": "https://www.harbordbakery.ca/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Pre-order cakes and baked goods online\" with morning or afternoon pickup slots; \"© 2026 Harbord Bakery & Calandria\"."
      },
      "Forno Cultura (King)": {
        "url": "https://www.fornocultura.com/locations/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Locations page lists current branch hours and contacts; \"© 2026 FornoCultura\" on homepage."
      },
      "Sam James Coffee Bar (Harbord)": {
        "url": "https://samjamescoffeebar.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site lists current location hours; footer \"© 2026, Sam James Coffee Bar\"."
      },
      "De Mello (Yonge & Castlefield)": {
        "url": "https://www.demellocoffee.com/locations/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Locations page lists current hours for each café; footer \"© 2026\"."
      }
    }
  },
  "Cape Town, South Africa": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. SANParks pages (Cape of Good Hope, Boulders) returned 403 and the V&A Waterfront site and several coffee roasters (Truth, Bootlegger, Espresso Lab, Origin, Rosetta, Tribe, Deluxe) returned 429, so they are not included; Cape Point gives no exact address and says its funicular closes for maintenance from 26 October 2026. Kirstenbosch and Groot Constantia did not publish a street address on the pages read. Iziko pages give inconsistent winter hours and no exhibition run dates; Iziko, District Six Museum, Hemelhuijs and Knead (Muizenberg) showed no 2026-dated content; La Colombe and Harbour House (Kalk Bay) publish no street number; Neighbourgoods Market and Planet Bar publish no hours. Coffee entries are cafés and bakeries rather than specialist roasters because roaster sites could not be read.",
    "sourceUrls": [
      "docs/content-research/cape-town-2026-10-25.md",
      "docs/content-research/cape-town-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Cape of Good Hope",
        "url": "https://www.sanparks.org/parks/table-mountain",
        "checkedOn": "2026-10-25",
        "reason": "SANParks (Table Mountain National Park) page returned HTTP 403; not bypassed."
      },
      {
        "name": "Cape Point (Flying Dutchman Funicular)",
        "url": "https://www.capepoint.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "Official site gives no exact address (\"within the southern section of Table Mountain National park\"); also states the funicular is temporarily closed from Monday 26 October 2026 for track-sensor maintenance with no reopening date (shuttle runs)."
      },
      {
        "name": "Boulders Beach (penguins)",
        "url": "https://www.sanparks.org/parks/table-mountain",
        "checkedOn": "2026-10-25",
        "reason": "Operated by SANParks; site returned HTTP 403; not bypassed."
      },
      {
        "name": "V&A Waterfront",
        "url": "https://www.waterfront.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "Repeated HTTP 429 Too Many Requests; not readable."
      },
      {
        "name": "Robben Island Museum",
        "url": "https://www.robben-island.org.za/",
        "checkedOn": "2026-10-25",
        "reason": "Departure point named (Nelson Mandela Gateway) but no 2026 content and conflicting tour times; booking only via external site; insufficient current-operation evidence."
      },
      {
        "name": "Kirstenbosch National Botanical Garden",
        "url": "https://www.sanbi.org/gardens/kirstenbosch/",
        "checkedOn": "2026-10-25",
        "reason": "SANBI pages read do not publish Kirstenbosch's address or hours (only 2026 concert listings); kirstenbosch.co.za redirects to an unrelated site and was not followed."
      },
      {
        "name": "Groot Constantia",
        "url": "https://www.grootconstantia.co.za/contact-us/",
        "checkedOn": "2026-10-25",
        "reason": "Only a postal address (\"Private Bag X1, Constantia\") published; no street address."
      },
      {
        "name": "Chapman's Peak Drive",
        "url": "https://www.chapmanspeakdrive.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "No address, operator or hours published; road status showed \"CLOSED\" (updated 25/10/2026) with no reason."
      },
      {
        "name": "Tjing Tjing",
        "url": "https://www.tjingtjing.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "Closed permanently: site says it \"will be closing its doors on Saturday, 18 April 2026\"."
      },
      {
        "name": "Jason Bakery",
        "url": "https://www.jasonbakery.com/",
        "checkedOn": "2026-10-25",
        "reason": "Site shows no address or hours, only that a store \"will launch in November\"."
      },
      {
        "name": "Truth Coffee",
        "url": "https://truth.coffee/",
        "checkedOn": "2026-10-25",
        "reason": "Home page lists no address or hours; contact page returned HTTP 429."
      },
      {
        "name": "Bootlegger Coffee Company",
        "url": "https://www.bootlegger.coffee/",
        "checkedOn": "2026-10-25",
        "reason": "Repeated HTTP 429 Too Many Requests."
      },
      {
        "name": "Espresso Lab Microroasters",
        "url": "https://www.espressolabmicroroasters.com/",
        "checkedOn": "2026-10-25",
        "reason": "Repeated HTTP 429 Too Many Requests."
      },
      {
        "name": "Deluxe Coffeeworks",
        "url": "https://www.deluxecoffeeworks.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests."
      },
      {
        "name": "Origin Coffee Roasting",
        "url": "https://www.originroasting.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests."
      },
      {
        "name": "Rosetta Roastery",
        "url": "https://www.rosettaroastery.com/pages/locations",
        "checkedOn": "2026-10-25",
        "reason": "Home page gives no café address or hours; locations page returned HTTP 429."
      },
      {
        "name": "Tribe Coffee",
        "url": "https://www.tribecoffee.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests."
      },
      {
        "name": "Vida e Caffè (Kloof Street)",
        "url": "https://www.vidaecaffe.com/",
        "checkedOn": "2026-10-25",
        "reason": "Home page lists no store address or hours (only head-office address)."
      },
      {
        "name": "Clarke's Bar & Dining Room",
        "url": "https://www.clarkesdining.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "Home page shows no address, hours or dated content."
      },
      {
        "name": "Loading Bay",
        "url": "https://www.loadingbay.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests."
      },
      {
        "name": "Jarryd's",
        "url": "https://www.jarryds.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (ENOTFOUND)."
      },
      {
        "name": "Cause | Effect Cocktail Kitchen",
        "url": "https://www.causeeffect.co.za/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (DNS error)."
      },
      {
        "name": "The Athletic Club & Social",
        "url": "https://www.theathletic.club/",
        "checkedOn": "2026-10-25",
        "reason": "Fetch failed with no output."
      },
      {
        "name": "World of Birds",
        "url": "https://www.worldofbirds.org.za/",
        "checkedOn": "2026-10-25",
        "reason": "Redirected to a different domain (worldofbirds.co.za); not followed within time."
      },
      {
        "name": "Table Mountain",
        "url": "https://www.tablemountain.net/",
        "checkedOn": "2026-10-25",
        "reason": "Covered by the confirmed operator entry 'Table Mountain Aerial Cableway'."
      },
      {
        "name": "a Cape Malay or waterfront dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "City Bowl local table",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Cape Town signature dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided City Bowl walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "V&A Waterfront public viewpoint",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market or picnic near Camps Bay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for Table Mountain",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a clear Table Mountain viewpoint",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Destination dinner near Camps Bay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset around Cape of Good Hope",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "City Bowl dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Family-friendly Table Mountain",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Easy outing around V&A Waterfront",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near Camps Bay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Early visit to Table Mountain",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "City Bowl cafe or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided V&A Waterfront route",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "V&A Waterfront at a quieter hour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Camps Bay local rhythm",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near City Bowl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "V&A Waterfront bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before Table Mountain",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a Cape Malay or waterfront lunch",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual lunch near Cape of Good Hope",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local stop around Camps Bay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Evening table in City Bowl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near City Bowl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around V&A Waterfront",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near V&A Waterfront",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near City Bowl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "V&A Waterfront morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before Table Mountain",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near City Bowl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in V&A Waterfront",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup near Camps Bay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Table Mountain Aerial Cableway": {
        "url": "https://www.tablemountain.net/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live operating panel with first up 08:30 and last down 19:00; latest blog post dated 20 October 2026; student and senior specials valid 1 July 2026 to 30 June 2027. The Cableway \"may be closed in bad weather\"."
      },
      "Zeitz MOCAA": {
        "url": "https://zeitzmocaa.museum/plan-your-visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current programme includes 'A Protea Is Not a Flower' (16 Oct 2025 to 20 Jun 2027) and 'Were It Not for Shadows …' (12 Nov 2026 to 29 Aug 2027); reduced on-site rate of \"R199\" for South African and African citizens from 1 September 2026."
      },
      "Two Oceans Aquarium": {
        "url": "https://www.aquarium.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News posts dated 17, 20 and 23 October 2026; online ticket shop linked."
      },
      "Iziko South African Museum": {
        "url": "https://www.iziko.org.za/museums/south-african-museum/",
        "sourceType": "official public operator (Iziko Museums of South Africa)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Now Showing\" lists 'The Sea and Us', 'Humanity' and 'Making Freedom' (no run dates given); published fee table (international adults R100)."
      },
      "Iziko Bo-Kaap Museum": {
        "url": "https://www.iziko.org.za/museums/bo-kaap-museum/",
        "sourceType": "official public operator (Iziko Museums of South Africa)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibition 'The Send Off: Interconnections of Culture and Faith' (no dates given); published fee table."
      },
      "Iziko South African National Gallery": {
        "url": "https://www.iziko.org.za/museums/south-african-national-gallery/",
        "sourceType": "official public operator (Iziko Museums of South Africa)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Now Showing\" lists 'Modernism and its Discontents: South African Art from the Permanent Collection ... 1925-2025' (run dates not given)."
      },
      "Iziko Slave Lodge": {
        "url": "https://www.iziko.org.za/museums/slave-lodge/",
        "sourceType": "official public operator (Iziko Museums of South Africa)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours and fee table; lower level \"explores the history of slavery in South Africa\". No dated 2026 exhibition shown."
      },
      "District Six Museum": {
        "url": "https://www.districtsix.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Booking notice: \"Bookings are essential\" via Quicket; warns \"BEWARE OF FRAUDULENT TICKET VENDORS!\". No 2026-dated content."
      },
      "Castle of Good Hope": {
        "url": "https://www.castleofgoodhope.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Military_Heritage_Weekend_2026_Media_Pack\" and a Heritage Month spring special under \"What's New\"; published ticket prices, last ticket 15:45."
      },
      "Norval Foundation": {
        "url": "https://www.norvalfoundation.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions include Irma Stern 'Looking Closer to Home' (2 Oct 2026 to 10 Jan 2027) and Kate Gottgens 'Unsteady Realms' (15 Sep 2026 to 7 Feb 2027); tickets via Webtickets."
      },
      "Cape Town Science Centre": {
        "url": "https://www.ctsc.org.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Merck Curiosity Cube visit 27 October to 5 November 2026; \"Tickets available online\" via WebTickets."
      },
      "Oranjezicht City Farm Market": {
        "url": "https://www.ozcf.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "On 6 December 2025 \"the Market moved across the road to its brand-new market space!\"; weekly market schedule published."
      },
      "Neighbourgoods Market (Old Biscuit Mill)": {
        "url": "https://theoldbiscuitmill.co.za/",
        "sourceType": "operator's own site (The Old Biscuit Mill / Neighbourgoods Market)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Mill site notes no parking inside \"on Saturdays, because the Neighbourgoods Market takes over the parking areas\"; footer \"© The Old Biscuit Mill 2026\"."
      },
      "FYN": {
        "url": "https://www.fynrestaurant.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Booking now open for summer!\"; deposit policy published; footer \"© 2026 FYN RESTAURANT\"."
      },
      "The Pot Luck Club": {
        "url": "https://thepotluckclub.co.za/contact/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bookings with R750-per-guest deposit; collaboration dinner \"PLC x CW Beau Constantia\" on 13 and 14 November 2026 at \"R1950 per person\"."
      },
      "La Colombe": {
        "url": "https://www.lacolombe.restaurant/la-colombe",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Spring Lunch Menu R1695 p.p. \"Valid until 30 November 2026\"; online booking with deposit; \"no children under the age of eight (8) are allowed\"."
      },
      "Kloof Street House": {
        "url": "https://www.kloofstreethouse.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published weekly hours and reservations page; image uploaded October 2026."
      },
      "Bukhara (Church Street)": {
        "url": "https://www.bukhara.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours and booking rules (tables of 10+ need set menu and deposit; under-12s not allowed at dinner); guest reviews on its own site dated through July 2026."
      },
      "Hemelhuijs": {
        "url": "https://www.hemelhuijs.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published weekly hours and Dineplan reservations link; newest menu file is Summer 2025 (no 2026 content)."
      },
      "Bo-Kaap Kombuis": {
        "url": "https://www.bokaapkombuis.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Bookings Are Essential To Avoid Disappointment!\"; published weekly hours; footer \"Copyright © 2026\"."
      },
      "Harbour House (V&A Waterfront)": {
        "url": "https://www.harbourhouse.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Main, wine, cocktail and sommelier menus dated May 2026; reservations by phone and email."
      },
      "Harbour House (Camps Bay)": {
        "url": "https://www.harbourhouse.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Main, wine, cocktail and sommelier menus dated May 2026."
      },
      "Harbour House (Kalk Bay)": {
        "url": "https://www.harbourhouse.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Main, wine and cocktail menus dated May 2026; reservations by phone and email."
      },
      "The Gin Bar": {
        "url": "https://www.theginbar.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours and \"Walk-in's Welcome\"; notes it may close earlier when quiet in winter; footer \"© 2026 The Gin Bar\"."
      },
      "Planet Bar (Belmond Mount Nelson Hotel)": {
        "url": "https://www.belmond.com/hotels/africa/south-africa/cape-town/belmond-mount-nelson-hotel/",
        "sourceType": "operator's own site (Belmond)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Planet Bar listed for \"cocktails and champagne\"; hotel notes it was listed in The 50 Best Hotels 2026 and hosts Confections x Collections 2026 on 5-7 November."
      },
      "Schoon (Sea Point)": {
        "url": "https://www.schoon.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Winter menu PDFs uploaded May 2026; footer \"Copyright 2026 @ Schoon\"; branch hours published."
      },
      "Knead (Muizenberg)": {
        "url": "https://www.kneadbakery.co.za/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice with last orders and public-holiday hours; \"CLOSED 25 DECEMBER\". No 2026-dated content."
      }
    }
  },
  "Buenos Aires, Argentina": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several sites could not be read: Museo Nacional de Bellas Artes, Ecoparque, Palacio Libertad and Four Seasons (403), Planetario, Biblioteca Nacional and Catedral Metropolitana (certificate errors), Las Violetas (connection refused), Ninina (rate-limited) and Casa Rosada (timeout). No current official city page for Recoleta Cemetery was found, so it is omitted. Hours were not published for Florería Atlántico, Faena, the Alvear Palace venues, Atelier Fuerza, Museo de Arte Moderno and Temaikèn, and Gran Bar Danzón gives days but no times. Don Julio, La Cabrera, Gran Bar Danzón, Florería Atlántico and Café de los Angelitos showed no 2026-dated content, so they rest on published hours or booking channels. Cuervo Café publishes one chain-wide schedule rather than branch hours.",
    "sourceUrls": [
      "docs/content-research/buenos-aires-2026-10-25.md",
      "docs/content-research/buenos-aires-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Recoleta Cemetery",
        "url": "https://buenosaires.gob.ar/cementerio-de-la-recoleta",
        "checkedOn": "2026-10-25",
        "reason": "official city (buenosaires.gob.ar) pages returned 404 or redirect to an archived 'gcaba_historico' section; no current official page read"
      },
      {
        "name": "Museo Nacional de Bellas Artes",
        "url": "https://www.bellasartes.gob.ar/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Planetario Galileo Galilei",
        "url": "https://www.planetario.gob.ar/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (hostname not in certificate)"
      },
      {
        "name": "Confitería Las Violetas",
        "url": "https://www.lasvioletas.com/",
        "checkedOn": "2026-10-25",
        "reason": "connection refused (ECONNREFUSED) on two attempts"
      },
      {
        "name": "Ninina",
        "url": "https://www.ninina.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on every attempt"
      },
      {
        "name": "Casa Rosada",
        "url": "https://www.casarosada.gob.ar/",
        "checkedOn": "2026-10-25",
        "reason": "fetch timed out"
      },
      {
        "name": "Palacio Barolo",
        "url": "https://www.palaciobarolo.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "no current operating evidence; latest dated item from 2018, no tour times"
      },
      {
        "name": "Ecoparque",
        "url": "https://buenosaires.gob.ar/ecoparque",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Palacio Libertad (ex CCK)",
        "url": "https://palaciolibertad.gob.ar/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Biblioteca Nacional",
        "url": "https://www.bn.gob.ar/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (unable to verify first certificate)"
      },
      {
        "name": "Catedral Metropolitana",
        "url": "https://www.catedralbuenosaires.org.ar/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (hostname not in certificate)"
      },
      {
        "name": "Elena (Four Seasons)",
        "url": "https://www.fourseasons.com/buenosaires/dining/restaurants/elena/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "LAB Café",
        "url": "https://www.labcafe.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "SSL handshake failure"
      },
      {
        "name": "Lattente",
        "url": "https://www.lattente.com/",
        "checkedOn": "2026-10-25",
        "reason": "SSL handshake failure"
      },
      {
        "name": "Tegui",
        "url": "https://www.tegui.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "connection refused"
      },
      {
        "name": "Pizzería Güerrín",
        "url": "https://www.pizzeriaguerrin.com/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (hostname not in certificate)"
      },
      {
        "name": "Full City Coffee House",
        "url": "https://www.fullcitycoffeehouse.com/",
        "checkedOn": "2026-10-25",
        "reason": "domain serves unrelated content; not an official café page"
      },
      {
        "name": "Mercado de San Telmo",
        "url": "https://www.mercadodesantelmo.com/",
        "checkedOn": "2026-10-25",
        "reason": "guessed domain is parked/for sale; no official page found"
      },
      {
        "name": "Bar Los Galgos",
        "url": "https://www.barlosgalgos.com.ar/contacto",
        "checkedOn": "2026-10-25",
        "reason": "site shows template placeholder address (Chicago) and no real hours; address not confirmable"
      },
      {
        "name": "Mishiguene",
        "url": "https://www.mishiguene.com/",
        "checkedOn": "2026-10-25",
        "reason": "no address, hours or 2026 content on official page"
      },
      {
        "name": "Croque Madame",
        "url": "https://www.croquemadame.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "no hours or 2026 content; branch addresses not given except Av Callao 1569"
      },
      {
        "name": "Galerías Pacífico",
        "url": "https://www.galeriaspacifico.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "mall street address not stated on page read"
      },
      {
        "name": "Hipódromo de Palermo",
        "url": "https://www.palermo.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "site under update; no address, hours or dates"
      },
      {
        "name": "Havanna",
        "url": "https://havanna.com.ar/nuestros-locales/1",
        "checkedOn": "2026-10-25",
        "reason": "no Buenos Aires branch address or hours readable"
      },
      {
        "name": "Le Pain Quotidien",
        "url": "https://www.lepainquotidien.com/",
        "checkedOn": "2026-10-25",
        "reason": "Argentine domain redirects to global site with no Buenos Aires branch listed"
      },
      {
        "name": "Le Blé",
        "url": "https://www.leble.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "no branch addresses or hours on official page"
      },
      {
        "name": "Café Martínez",
        "url": "https://www.cafemartinez.com/",
        "checkedOn": "2026-10-25",
        "reason": "no branch addresses or hours on page read"
      },
      {
        "name": "Museo Participativo de Ciencias (Prohibido No Tocar)",
        "url": "https://www.mpc.org.ar/",
        "checkedOn": "2026-10-25",
        "reason": "no hours or 2026 content on homepage; hours page 404"
      },
      {
        "name": "El Preferido de Palermo",
        "url": "https://www.elpreferidodepalermo.com/",
        "checkedOn": "2026-10-25",
        "reason": "page returned no readable content"
      },
      {
        "name": "Birkin",
        "url": "https://www.birkin.com.ar/",
        "checkedOn": "2026-10-25",
        "reason": "domain shows hosting placeholder page"
      },
      {
        "name": "Museo Nacional de Arte Decorativo",
        "url": "https://www.mnad.org/",
        "checkedOn": "2026-10-25",
        "reason": "tried domain redirects to unrelated marketing site"
      },
      {
        "name": "San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Palermo parks",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Tango night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Recoleta architecture walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Palermo sunset park time",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Parrilla dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Cafe con leche morning",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "San Telmo market lunch",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A cafe near Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market breakfast in San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A dessert stop in Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free or low-cost Palermo walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Public viewpoint near Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market meal around San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A self-guided walk through San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free museum or public garden time",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood market stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for Recoleta Cemetery",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A signature meal in Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A tailored day around Tango night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A private transfer between highlights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A special evening in Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower day with a local guide",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset near San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Palermo evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long dinner in Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A scenic morning near San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A photo-friendly walk through Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Family-friendly Recoleta Cemetery",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Easy outing around Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A hands-on stop near Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short scenic outing with room to move",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A treat everyone can agree on",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Early visit to Recoleta Cemetery",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Palermo cafe or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Recoleta architecture walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A museum or gallery at your own pace",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A people-watching break in San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A flexible afternoon with one clear anchor",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A quieter side of San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local recommendation beyond the headline sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short detour beyond Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Recoleta bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before Recoleta Cemetery",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local pastry to take on the road",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and a walk through San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed brunch near Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual lunch near San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local stop around San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market lunch in Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A quick meal between sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long midday table in Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower dinner in San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local specialty near Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final-night meal away from the busiest sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near Palermo parks",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed night close to the stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A late drink after dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A rooftop or waterfront evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Recoleta morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before Recoleta Cemetery",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A regional sweet to take on the road",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A fresh bake near San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A pastry stop between neighborhoods",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Palermo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in Recoleta",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup near San Telmo",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A coffee stop before the first sight",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood cafe break",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view with your morning coffee",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "MALBA": {
        "url": "https://www.malba.org.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions: 'Belkis Ayón: Mito y desobediencia' and 'Viva Frida', each 'Continúa hasta el 15 de marzo de 2027'; permanent Colección Malba—Costantini."
      },
      "Teatro Colón": {
        "url": "https://teatrocolon.org.ar/",
        "sourceType": "operator's own site (city-run theatre)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026 calendar lists 'Aura' gala on 26 October and ballet 'Manon' 5–15 November; guided visits cover the Sala, Foyer Principal, Galería de Bustos and Salón Dorado."
      },
      "Museo Evita": {
        "url": "https://www.museoevita.org.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Agenda 2026 abierta para visitas educativas'; October agenda lists public guided tours 'martes a domingo, 16 hs' and Friday English tours at 15 hs; temporary exhibition 'Umbrales'."
      },
      "Fundación PROA": {
        "url": "https://www.proa.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Thomas Demand exhibition 'el tartamudeo de la historia'; proa21 article dated 17 September 2026; participates in the XX Bienal Internacional de Arquitectura 'durante todo octubre'."
      },
      "Jardín Japonés": {
        "url": "https://www.jardinjapones.org.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published 2026 ticket prices: residents '$8.000', non-residents '$24.000'; 'El Jardín NO cierra por lluvias'; cultural activity flyers uploaded 2026/09."
      },
      "Café Tortoni": {
        "url": "https://www.cafetortoni.com.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice 'LUNES - DOMINGO 08:00 - 21:00'; footer 'Café Tortoni© 2026'."
      },
      "Don Julio": {
        "url": "https://www.parrilladonjulio.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published daily service hours and a 'RESERVAS ONLINE' booking link; no dated 2026 content (footer © 2024)."
      },
      "Colección Amalita": {
        "url": "https://coleccionamalita.org.ar/",
        "sourceType": "operator's own site (formerly Colección Fortabat; old domain redirects here)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions including 'Living' and 'Jorge Gumier Maier, la diferencia' featured, with 2026-dated exhibition pages; free guided tours 'Gratis con la compra del ticket de admisión. Sin reserva previa.'"
      },
      "Florería Atlántico": {
        "url": "https://www.floreriaatlantico.com.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Booking channels published (reservas@floreriaatlantico.com.ar, WhatsApp 'Quisiera hacer una reserva'); no dated 2026 content."
      },
      "La Biela": {
        "url": "https://www.labiela.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice '08:00 a. m. – 01:00 a. m.' with 'Abre hoy'; footer 'Copyright © 2026 La Biela'."
      },
      "Cuervo Café (Recoleta)": {
        "url": "https://www.cuervocafe.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch list and hours notice 'Abrimos de martes a domingo 8 hs - 20 hs'; footer '2026, © Cuervo'."
      },
      "La Cabrera (Palermo)": {
        "url": "https://www.lacabrera.com.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Abiertos todos los días' with online booking link, phone 4831-0325 and WhatsApp; no dated 2026 content."
      },
      "Gran Bar Danzón": {
        "url": "https://www.granbardanzon.com.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "States it is open every day; 'Reservas: (+5411) 4811.1108' and 'RESERVA AHORA' booking page; no dated 2026 content."
      },
      "Alvear Palace Hotel": {
        "url": "https://www.alvearpalace.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "October 2026 offers ('Octubre en Buenos Aires' stays 1–31 October 2026); venues include L'Orangerie (buffet breakfast), Lobby Bar and Alvear Roof Bar with rooftop terrace."
      },
      "Museo Argentino de Ciencias Naturales": {
        "url": "https://www.macnconicet.gob.ar/",
        "sourceType": "official public operator (CONICET)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage post dated 2026-09-29 on 'Vacaciones de Invierno 2026'; event 'Exploraciones imaginarias' listed '16/10/2026 — 30/11/2026'."
      },
      "Café de los Angelitos": {
        "url": "https://www.cafedelosangelitos.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dinner-and-show timings (dinner 20:00, show 21:45, '1.2 Hr Show') with online 'Reserva' booking; no dated 2026 content (footer 2025)."
      },
      "El Querandí": {
        "url": "https://querandi.com.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bookable dinner shows with published prices; New Year's Eve '31 / 12 / 2026' programme; footer 'Copyright © 2026'."
      },
      "Faena Hotel Buenos Aires": {
        "url": "https://www.faena.com/buenos-aires",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Venues listed (Bistro Sur, El Mercado, El Cabaret, The Library Lounge, Poolbar); 2026 journal item on Condé Nast Traveler 2026 Readers' Choice; reservations +54-11-4010-9070."
      },
      "Presidente Bar (Recoleta)": {
        "url": "https://www.presidentebar.com.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Weekly hours and 'RESERVÁ TU MESA' booking link; footer '© 2026, Presidente Bar'."
      },
      "Atelier Fuerza (Recoleta)": {
        "url": "https://www.atelierfuerza.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Pan dulce AF 2026' preorders with December pickup dates; products include 'Medialuna de manteca clásica AF' and 'Canelé tradicional'; footer '® 2026'."
      },
      "Bioparque Temaikèn": {
        "url": "https://www.temaiken.org.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online ticket sales and visit-date booking via ecommerce.temaiken.org.ar; September 2026 '50% off' promotion."
      },
      "Rojo Tango": {
        "url": "https://www.rojotango.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dinner-and-show timeline with 'Reservar' booking; news item 'Inauguramos el 2026 con una nueva propuesta gastronómica'."
      },
      "El Cuartito": {
        "url": "https://www.elcuartito.com.ar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Pizzería founded 1934; hours published and 'Quilmes & El Cuartito · Mundial 2026' promotion."
      },
      "Teatro Nacional Cervantes": {
        "url": "https://www.teatrocervantes.gob.ar/",
        "sourceType": "official public operator (national theatre)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "October 2026 calendar lists 'Santos Vega' and 'Lo mucho que te amé' plus guided visits 'Historia y leyenda' at 11:00."
      }
    }
  },
  "Athens, Greece": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The Acropolis archaeological site could not be confirmed because the Ministry of Culture page refused connection and hhticket.gr and culture.gov.gr returned 403; the Benaki Museum, SNFCC and the Hilton (Galaxy Bar) also returned 403, Kuzina and the Eugenides Planetarium had certificate errors, and Strofi returned HTTP 520. Several input places (Kora Bakery, Takis Bakery, Dope Roasting Co., Tailor Made, Nolan, This is Loco, Betty's Bakery, Kostas Souvlaki) had no readable official site, and the domains formerly used by Nolan and Six d.o.g.s now show gambling content. Opening hours were not published on the pages read for the Acropolis Museum, Goulandris, Spondi, Karamanlidika, Hytra, Feyrouz, Lukumades, Mokka, Little Kook, The Clumsies, Line, Brettos and A for Athens; Lalaounis hours were only partly readable. For Lukumades and Brettos, current operation rests only on a 2026 copyright notice, and Line and A for Athens on booking links without 2026 content.",
    "sourceUrls": [
      "docs/content-research/athens-2026-10-25.md",
      "docs/content-research/athens-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Acropolis",
        "url": "https://odysseus.culture.gr/h/3/eh351.jsp?obj_id=2384",
        "checkedOn": "2026-10-25",
        "reason": "official Ministry of Culture page refused connection (ECONNREFUSED); hhticket.gr returned 403; culture.gov.gr returned 403"
      },
      {
        "name": "Plaka and Anafiotika",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Acropolis views from public hills",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Monastiraki wandering",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Street-food souvlaki stops",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private Acropolis guide",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop tasting-menu dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury stay with Acropolis views",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset at Lycabettus",
        "url": "https://www.lycabettushill.com/",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place; lycabettushill.com does not identify itself as the operator (sells tours)"
      },
      {
        "name": "Rooftop dinner in Plaka",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Evening walk through Anafiotika",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "National Garden",
        "url": "https://www.cityofathens.gr/",
        "checkedOn": "2026-10-25",
        "reason": "no official operator page readable; cityofathens.gr returned 403"
      },
      {
        "name": "Varvakios Market",
        "url": "https://www.cityofathens.gr/",
        "checkedOn": "2026-10-25",
        "reason": "no official operator page readable; cityofathens.gr returned 403"
      },
      {
        "name": "Short ruins-and-gelato day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee in Koukaki",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning at the Acropolis Museum",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Acropolis Museum confirmed separately)"
      },
      {
        "name": "Monastiraki evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Plaka",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Monastiraki and one rooftop night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Thissio walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset from Philopappos Hill",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Kora Bakery",
        "checkedOn": "2026-10-25",
        "reason": "no official website found (only social media, delivery apps and guides)"
      },
      {
        "name": "Dope Roasting Co.",
        "url": "https://www.doperoasting.com/",
        "checkedOn": "2026-10-25",
        "reason": "doperoasting.com failed with TLS error (TLSV1_ALERT_UNRECOGNIZED_NAME); no other official site found"
      },
      {
        "name": "This is Loco",
        "checkedOn": "2026-10-25",
        "reason": "no official website found"
      },
      {
        "name": "Kostas Souvlaki",
        "checkedOn": "2026-10-25",
        "reason": "no official website found"
      },
      {
        "name": "Nolan",
        "url": "https://www.nolanrestaurant.gr/",
        "checkedOn": "2026-10-25",
        "reason": "nolanrestaurant.gr now serves an online-casino page, not the restaurant; no other official site found"
      },
      {
        "name": "Takis Bakery",
        "url": "https://www.takisbakery.gr/",
        "checkedOn": "2026-10-25",
        "reason": "takisbakery.gr does not resolve (ENOTFOUND); no official site found"
      },
      {
        "name": "Betty's Bakery",
        "checkedOn": "2026-10-25",
        "reason": "no official website found"
      },
      {
        "name": "The Underdog",
        "url": "https://www.underdog.gr/locations",
        "checkedOn": "2026-10-25",
        "reason": "official site names Thissio flagship but publishes no street address, hours or dated content"
      },
      {
        "name": "Tailor Made",
        "url": "https://www.tailormade.gr/",
        "checkedOn": "2026-10-25",
        "reason": "tailormade.gr did not resolve (EAI_AGAIN); no other official site found"
      },
      {
        "name": "Benaki Museum",
        "url": "https://www.benaki.org/index.php?lang=en",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403"
      },
      {
        "name": "Stavros Niarchos Foundation Cultural Center",
        "url": "https://www.snfcc.org/en",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403"
      },
      {
        "name": "Kuzina",
        "url": "https://www.kuzina.gr/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (unable to verify the first certificate)"
      },
      {
        "name": "Strofi",
        "url": "https://www.strofi.gr/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 520"
      },
      {
        "name": "Eugenides Planetarium",
        "url": "https://www.eugenfound.edu.gr/en/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (hostname not in certificate)"
      },
      {
        "name": "Six d.o.g.s",
        "url": "https://www.sixdogs.gr/",
        "checkedOn": "2026-10-25",
        "reason": "sixdogs.gr now serves an offshore-betting guide, not the bar"
      },
      {
        "name": "Mind the Cup",
        "url": "https://www.mindthecup.gr/",
        "checkedOn": "2026-10-25",
        "reason": "official site lists only a Peristeri address, outside central Athens"
      },
      {
        "name": "Taf Coffee",
        "url": "https://www.taf.gr/",
        "checkedOn": "2026-10-25",
        "reason": "connection refused (ECONNREFUSED)"
      },
      {
        "name": "Le Greche",
        "url": "https://www.legreche.gr/",
        "checkedOn": "2026-10-25",
        "reason": "connection refused (ECONNREFUSED)"
      },
      {
        "name": "Ergon House",
        "url": "https://www.ergonhouse.gr/",
        "checkedOn": "2026-10-25",
        "reason": "ergonhouse.gr does not resolve (ENOTFOUND)"
      },
      {
        "name": "Kostarelos",
        "url": "https://kostarelos.gr/en/",
        "checkedOn": "2026-10-25",
        "reason": "home page readable (2026 content) but no Athens store address; stores page 404 and repeated HTTP 429"
      },
      {
        "name": "Varsos",
        "url": "https://www.varsos.gr/",
        "checkedOn": "2026-10-25",
        "reason": "no street address and no 2026 content on official site (footer 2019)"
      },
      {
        "name": "Loumidis",
        "url": "https://www.loumidis.gr/",
        "checkedOn": "2026-10-25",
        "reason": "domain redirects to a Nestle corporate page; no café address read"
      },
      {
        "name": "Samba Coffee Roasters",
        "url": "https://www.sambacoffee.gr/",
        "checkedOn": "2026-10-25",
        "reason": "sambacoffee.gr does not resolve (ENOTFOUND)"
      },
      {
        "name": "Little Tree Books & Coffee",
        "url": "https://www.littletree.gr/",
        "checkedOn": "2026-10-25",
        "reason": "official page shows only name and logo; no address or hours"
      },
      {
        "name": "Galaxy Bar (Hilton Athens)",
        "url": "https://www.hilton.com/en/hotels/athhitw-hilton-athens/dining/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403"
      },
      {
        "name": "Ariston",
        "checkedOn": "2026-10-25",
        "reason": "no official website found"
      },
      {
        "name": "Krinos",
        "checkedOn": "2026-10-25",
        "reason": "no official website found"
      }
    ],
    "placeSources": {
      "Acropolis Museum": {
        "url": "https://www.theacropolismuseum.gr/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists exhibition \"The Parthenon and Byron\" running \"26 April 2024 - 31 December 2026\" and a family programme \"01 November 2026 - 28 March 2027\"; online TICKETS link."
      },
      "National Archaeological Museum": {
        "url": "https://www.namuseum.gr/en/",
        "sourceType": "official public operator (Hellenic Ministry of Culture museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibition \"Pylos of Nestor: A Mycenaean Kingdom Revealed\" 26 May 2026 to 31 Jan 2027, William Kentridge \"Imitate the sleep of stones\" 30 Oct 2026 to 24 Jan 2027; notice on Galleries 7, 8 and 11 dated 23 Oct 2026 (body not readable)."
      },
      "Museum of Cycladic Art": {
        "url": "https://cycladic.gr/en/episkeftheite-to-mouseio/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Home page banner \"OPEN TODAY UNTIL 17:00\"; Eugenia Vereli project \"OCTOBER 14 UNTIL DECEMBER 14, 2026\". Neophytou Douka entrance under construction, entry via Stathatos Mansion."
      },
      "Byzantine and Christian Museum": {
        "url": "https://www.byzantinemuseum.gr/en/",
        "sourceType": "official public operator (Hellenic Ministry of Culture museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published weekly hours and 2026 \"Exhibit of the month\" for May 2026; temporary exhibition on the Otranto shipwreck (no dates given)."
      },
      "Goulandris Museum of Modern Art": {
        "url": "https://www.goulandris.gr/en",
        "sourceType": "operator's own site (B&E Goulandris Foundation)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibition \"BELLE ÉPOQUE\" 31.10.2026 to 15.02.2027 in Athens; online ticket links for permanent collection and temporary exhibition."
      },
      "EMST National Museum of Contemporary Art": {
        "url": "https://www.emst.gr/en",
        "sourceType": "official public operator (national museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Today the museum is open 11:00 - 19:00\"; \"An Ode to Things. Niki Kanagini. Retrospective\" 2 April 2026 - 14 February 2027."
      },
      "Jewish Museum of Greece": {
        "url": "https://www.jewishmuseum.gr/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Like Hunted Birds\": Greek Jews After WWII at the Bathhouse of the Winds, 8 Kyristou Street, 25 May to 30 November 2026, 9:30-16:30 daily except Tuesday."
      },
      "Ilias Lalaounis Jewelry Museum": {
        "url": "https://www.lalaounis-jewelrymuseum.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"ILJM Art Fair 2026\" Saturday 5 and Sunday 6 December, 11:00-19:00, free entrance; e-ticket link."
      },
      "Panathenaic Stadium": {
        "url": "https://www.panathenaicstadium.gr/en/visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Open daily\"; 2026 notices on track closures in September and marble cleaning and conservation work; prices \"from 01.10.2025\"."
      },
      "Spondi": {
        "url": "https://www.spondi.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online \"Reservation form\" and \"© 2026 Spondi Restaurant\"."
      },
      "Varoulko Seaside": {
        "url": "https://www.varoulko.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"BOOK A TABLE\" online booking and published daily hours."
      },
      "Karamanlidika": {
        "url": "https://www.karamanlidika.gr/kratisi/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Per-branch \"Κράτηση\" online booking; footer \"2016 - 2026\"."
      },
      "Cookoovaya": {
        "url": "https://www.cookoovaya.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"book Athens\" online booking with published daily hours."
      },
      "Hytra": {
        "url": "https://www.hytra.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online RESERVATION link; Valentine's menu file dated February 2026."
      },
      "Klimataria": {
        "url": "https://www.klimataria.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published daily hours and live-music schedule; footer \"© 2026\"."
      },
      "Feyrouz": {
        "url": "https://www.feyrouz.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Athens menu PDF uploaded in a 2026/09 folder; handmade Levantine street food and lahmajoun."
      },
      "Lukumades": {
        "url": "https://www.lukumades.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Footer \"©LUKUMADES 2026\"; no hours or menu readable."
      },
      "Mokka": {
        "url": "https://mokka.coffee/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Coffees listed with 2026 roast dates such as \"21/10/2026\"; \"FOUR GENERATIONS OF ROASTERS ARE WORKING IN THE SAME BUILDING SINCE 1923\"."
      },
      "Little Kook": {
        "url": "https://www.littlekook.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current Halloween theme promoted: \"Shadows, smoke and strange scenes where visitors become part of the story\" (no dates)."
      },
      "The Clumsies": {
        "url": "https://theclumsies.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Reservations are made through the website or via phone, and response is immediate\"; described as an all-day venue. Linked menus dated 2023."
      },
      "Baba au Rum": {
        "url": "https://www.babaaurum.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours and \"© 2026 babaaurum.com\"."
      },
      "Line Athens": {
        "url": "https://www.lineathens.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online Reservations link; no 2026-dated content."
      },
      "360 Cocktail Bar": {
        "url": "https://www.three-sixty.gr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Book Your Table\" link and published hours; serves cocktails, coffee, brunch and dinner with Acropolis views."
      },
      "Brettos": {
        "url": "https://www.brettosplaka.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Footer \"© 2026, Brettos Plaka\"; site quotes \"Brettos was established in 1909.\""
      },
      "A for Athens": {
        "url": "https://www.aforathens.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Book a table\" and \"Book your room\" links; no 2026-dated content."
      }
    }
  },
  "Marrakech, Morocco": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability, and hours may change for Ramadan and the Aid holidays. The Jardin Majorelle's site published hours but no street address on the pages that loaded, and its contact and French pages failed (HTTP 429/500), so it is not included. Several sites could not be read because of certificate or connection errors (Nomad, Le Jardin, L'Mida, Dar Moha, Pepe Nero, Musée de Marrakech, Kechmara, Four Seasons). Weekly hours were not published for La Mamounia, Royal Mansour, Al Fassia Aguedal, Le Trou au Mur, La Maison Arabe or MACAAL, and Pâtisserie Amandine did not state closing days. The end date of the Enki Bilal exhibition at Dar El Bacha was not published.",
    "sourceUrls": [
      "docs/content-research/marrakech-2026-10-25.md",
      "docs/content-research/marrakech-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "All 88 input entries (e.g. 'Marrakech historic center or old town', 'A local market in Medina', 'Coffee near Medina')",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Jardin Majorelle",
        "url": "https://www.jardinmajorelle.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site shows hours (daily 8:00-17:30) and online-only ticketing but no street address on pages read; contact page returned HTTP 429 and French homepage HTTP 500"
      },
      {
        "name": "Nomad",
        "url": "https://www.nomadmarrakech.com/",
        "checkedOn": "2026-10-25",
        "reason": "SSL error (WRONG_VERSION_NUMBER); not bypassed"
      },
      {
        "name": "Café des Épices",
        "url": "https://www.cafedesepices.net/",
        "checkedOn": "2026-10-25",
        "reason": "Domain redirects to an unrelated steakhouse site; no official page found"
      },
      {
        "name": "Le Jardin",
        "url": "https://www.lejardinmarrakech.com/",
        "checkedOn": "2026-10-25",
        "reason": "SSL handshake failure; not bypassed"
      },
      {
        "name": "Le Salama",
        "url": "https://www.lesalama.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (ENOTFOUND)"
      },
      {
        "name": "Musée de Marrakech",
        "url": "https://www.museedemarrakech.ma/",
        "checkedOn": "2026-10-25",
        "reason": "Connection refused"
      },
      {
        "name": "Kechmara",
        "url": "https://www.kechmara.com/",
        "checkedOn": "2026-10-25",
        "reason": "Page returned no readable content"
      },
      {
        "name": "L'Mida",
        "url": "https://www.lmidamarrakech.com/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error; not bypassed"
      },
      {
        "name": "Dar Moha",
        "url": "https://www.darmoha.ma/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error; not bypassed"
      },
      {
        "name": "Pepe Nero",
        "url": "https://www.pepenero-marrakech.com/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error; not bypassed"
      },
      {
        "name": "Dar Yacout",
        "url": "https://www.dar-yacout.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (ENOTFOUND)"
      },
      {
        "name": "Bacha Coffee (Dar El Bacha)",
        "url": "https://www.bachacoffee.com/en/locations",
        "checkedOn": "2026-10-25",
        "reason": "Official site and locations page give no Marrakech address or hours"
      },
      {
        "name": "Amal Targa Center",
        "url": "https://amalnonprofit.org/targa.html",
        "checkedOn": "2026-10-25",
        "reason": "Official page gives no street address ('Targa, Marrakech' only)"
      },
      {
        "name": "Four Seasons Resort Marrakech (Zest rooftop)",
        "url": "https://www.fourseasons.com/marrakech/dining/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 on official dining page"
      },
      {
        "name": "Mandarin Oriental Marrakech",
        "url": "https://www.mandarinoriental.com/en/marrakech/la-medina",
        "checkedOn": "2026-10-25",
        "reason": "Page content truncated; no address or dining details readable"
      },
      {
        "name": "Beldi Country Club",
        "url": "https://www.beldicountryclub.com/",
        "checkedOn": "2026-10-25",
        "reason": "Address shown but no hours, menu or dated operating evidence on page read"
      },
      {
        "name": "Café Atay",
        "url": "https://www.cafeatay.com/",
        "checkedOn": "2026-10-25",
        "reason": "Guessed domain did not resolve; no official site found"
      },
      {
        "name": "Musée Mouassine",
        "url": "https://www.museemouassine.com/",
        "checkedOn": "2026-10-25",
        "reason": "Guessed domain did not resolve; no official site found"
      },
      {
        "name": "Pâtisserie Al Jawda",
        "checkedOn": "2026-10-25",
        "reason": "No official website found (directory listings only)"
      }
    ],
    "placeSources": {
      "MACAAL": {
        "url": "https://www.macaal.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Season banner 'New Art Season 2026'; Daoud Aoulad-Syad solo show 'Le temps d'un battement de cil' runs 18.09.2026 to 29.11.2026; 'Statues Also Breathe' and Yassine Balbzioui's 'Crazy Lines' run 08.02.2026 to 08.01.2027."
      },
      "Maison de la Photographie": {
        "url": "https://www.maisondelaphotographie.ma/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibition 'Maroc, Regards d'hier et d'aujourd'hui'; pages dated through 27 June 2026; tickets on site only (80 MAD adult, free under 15), ticket also covers the Musée de la Musique de Marrakech."
      },
      "Le Jardin Secret": {
        "url": "https://www.lejardinsecretmarrakech.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes seasonal hours and ticket prices (100 dirhams full, free under 12; tower 40 dirhams, not open to children under 6); last entry '30 minutes avant la fermeture'."
      },
      "Musée Yves Saint Laurent Marrakech": {
        "url": "https://www.museeyslmarrakech.com/en/contact/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice 'open every day of the week, except Wednesdays'; tickets sold only through tickets.jardinmajorelle.com, 'THE ONLY OFFICIAL WEBSITE'. No 2026-dated exhibition found."
      },
      "Musée des Confluences Dar El Bacha": {
        "url": "https://fnm.ma/museums/26",
        "sourceType": "official public operator (Fondation Nationale des Musées)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "FNM announces 'Enki Bilal : l'Exposition' at the museum 'À partir du 15 octobre 2026' (no end date stated); ticket prices published (60 DH foreign visitors)."
      },
      "Dar Si Saïd (Musée national du tissage et du tapis)": {
        "url": "https://fnm.ma/museums/30",
        "sourceType": "official public operator (Fondation Nationale des Musées)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current FNM page lists hours 'Du mardi au dimanche : 10h - 18h', 'Fermé le lundi' and prices (30 DH adults)."
      },
      "Musée du patrimoine immatériel Jamaâ el-Fna": {
        "url": "https://fnm.ma/museums/40",
        "sourceType": "official public operator (Fondation Nationale des Musées)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "FNM page lists hours, prices (40 DH foreigners) and an exhibition 'dédiée à la place Jamaâ el-Fna et à ses acteurs'."
      },
      "Anima Garden": {
        "url": "https://www.anima-garden.com/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Open all year 9 am – 6 pm'; tickets MAD 140 adults, free 0-11; 'Free shuttle bus from Marrakech to ANIMA'; footer '©2016-2026'."
      },
      "Marrakesh-Timbuktu (Bert Flint collection)": {
        "url": "https://www.marrakesh-timbuktu.com/visit-tickets",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page: 'Open every day from 10.00 to 19.00', last entry 30 minutes before closing; full price 100 Dirhams, children up to 12 free."
      },
      "La Mamounia": {
        "url": "https://www.mamounia.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Table reservation forms for restaurants (Le Marocain, L'Italien par Simone Zanoni) and bars (Le Churchill, Le Bar Majorelle); a 'Ftour' link to a 2026 Ramadan page."
      },
      "Royal Mansour Marrakech": {
        "url": "https://www.royalmansour.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site names La Grande Table Marocaine and Sesamo among its Marrakech tables and carries a 2026 article on the 50 Best Hotels ranking."
      },
      "Al Fassia Aguedal": {
        "url": "https://www.alfassia.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site says Aguedal 'invites you every evening for a dinner' and offers online booking ('BOOK NOW'). No 2026-dated content."
      },
      "Le Grand Café de la Poste": {
        "url": "https://www.grandcafedelaposte.restaurant/contactez-nous/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Table booking with slots for 'Petit déjeuner' (09h00-11h30), 'Déjeuner' and 'Dîner' (19h00-23h30); published breakfast menu; footer 'Copyright © 2026'."
      },
      "Terrasse des Épices": {
        "url": "https://www.terrassedesepices.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online table booking with lunch and dinner seatings; 'last orders 45 minutes before closing'; seasonal cocktail list."
      },
      "+61": {
        "url": "https://www.plus61.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published weekly hours and 'Book now' reservation link."
      },
      "El Fenn Rooftop": {
        "url": "https://el-fenn.com/rooftop-bar/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Roof terrace open to non-residents, no reservation for drinks but 'limited capacity'; cocktail list PDF dated 2026/08; homepage has '2026' retreats and hotlist."
      },
      "La Sultana Marrakech": {
        "url": "https://www.lasultanahotels.com/Marrakech/cocktail_sur_les_toits_de_la_medina",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bookable nightly sunset mixology workshop on the rooftop at 6 p.m., 30 minutes, up to 4 participants; cocktails 'À partir de 350 MAD'."
      },
      "Kabana": {
        "url": "https://www.kabana-marrakech.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'We're open every day from 11:00 AM to 2:00 AM'; 'Reservations required'; brunch 11am-5pm; nightly DJ sets."
      },
      "Comptoir Darna": {
        "url": "https://www.comptoirmarrakech.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Restaurant 'Tous les soirs : 19h00 -01h00'; SevenRooms booking; dress code 'smart casual'; '© 2026'."
      },
      "Le Foundouk": {
        "url": "https://www.foundouk.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online reservations; 'Ouvert tous les jours de 19h à minuit, fermé le mercredi.'"
      },
      "Naranj": {
        "url": "https://www.naranj.ma/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'We're open every day from 12:30 PM to 10:30 PM'; 'Book Now' link and PDF menu."
      },
      "Le Trou au Mur": {
        "url": "https://www.letrouaumur.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lunch and dinner menu pages and 'Book a table' link; footer '© 2026 Le Trou Au Mur'."
      },
      "La Famille": {
        "url": "https://www.lafamillemarrakech.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Opening hours: Monday to Saturday, 12h00 to 16h00'; 'la carte, ici, change chaque jour'; booking link."
      },
      "Amal Gueliz Center": {
        "url": "https://amalnonprofit.org/gueliz.html",
        "sourceType": "operator's own site (Amal non-profit)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Lunch Monday–Saturday, 12:00 – 15:30 (closed Sundays)'; walk-ins accepted, Friday is couscous day and busy; homepage blog posts dated April-May 2026."
      },
      "Cafe Clock Marrakech": {
        "url": "https://www.cafeclock.com/contact-us",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Contact page gives '9am -11pm daily'; site advertises live music every night and workshops."
      },
      "Pâtisserie Amandine (Rue Mohamed El Beqal)": {
        "url": "https://www.amandinemarrakech.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site lists two boutiques with hours ('Mohamed El Beqal : 08:00 – 21:00'; Rue de la Liberté 08:00-20:00) and viennoiseries. No 2026-dated content."
      },
      "La Maison Arabe": {
        "url": "https://www.cenizaro.com/lamaisonarabe/marrakech",
        "sourceType": "operator's own site (Cenizaro Hotels)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Operator site lists dining venues (Le Restaurant, Les Trois Saveurs, The Rooftop, Piano Bar) and a Cooking School with booking; notes seasonal hours may change."
      }
    }
  },
  "Los Angeles, United States": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The Getty Center, California Science Center, Sqirl, Joan's on Third, Intelligentsia Silver Lake, The Huntington, Petersen Automotive Museum, Go Get Em Tiger, Hauser & Wirth and several others could not be read (403, 429 rate limits, certificate errors, 404s or empty pages) and are left out; a fetch failure is not evidence of closure. The Museum at La Brea Tar Pits reports it is temporarily closed for construction. Hours were not published or readable for the Hollywood Bowl, Santa Monica Pier, The Last Bookstore, Employees Only LA and The Roger Room (hours shown only as an image). Courage Bagels shows conflicting hours (Thursday-Monday versus a 'weekends only' banner). Several confirmed sites (Bestia, Bavel, Gjelina, Musso & Frank Grill, Santa Monica Pier, Employees Only LA, The Roger Room, Thunderbolt) carry no dated 2026 content and rest on live booking links and posted hours. The Santa Monica Pier address is the Pier Corporation's office on the pier.",
    "sourceUrls": [
      "docs/content-research/los-angeles-2026-10-25.md",
      "docs/content-research/los-angeles-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Santa Monica",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (a city); Santa Monica Pier confirmed instead"
      },
      {
        "name": "The Getty Center",
        "url": "https://www.getty.edu/visit/center/",
        "checkedOn": "2026-10-25",
        "reason": "official page returned no readable content (title only, 68 characters) on two URLs"
      },
      {
        "name": "California Science Center",
        "url": "https://californiasciencecenter.org/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Sqirl",
        "url": "https://www.sqirlla.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on three attempts"
      },
      {
        "name": "Joan's on Third",
        "url": "https://joansonthird.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on three attempts"
      },
      {
        "name": "Intelligentsia Silver Lake",
        "url": "https://www.intelligentsia.com/pages/silver-lake-coffeebar",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on three attempts"
      },
      {
        "name": "Maru Coffee",
        "url": "https://www.marucoffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "homepage names locations but gives no addresses or hours; locations pages returned 404 / 429"
      },
      {
        "name": "Clark Street",
        "url": "https://www.clarkstreetbread.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site gives no street addresses or hours; locations page 404"
      },
      {
        "name": "Mariscos Jalisco",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified; not checked"
      },
      {
        "name": "Venice Canals",
        "checkedOn": "2026-10-25",
        "reason": "public neighbourhood with no single operator website; not checked"
      },
      {
        "name": "Concert at the Hollywood Bowl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place; Hollywood Bowl confirmed instead"
      },
      {
        "name": "LACMA after dark",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place; LACMA confirmed instead"
      },
      {
        "name": "Griffith Park views",
        "url": "https://www.laparks.org/griffithpark",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place; laparks.org Griffith Park page returned HTTP 403"
      },
      {
        "name": "Beach morning in Santa Monica",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Taco crawl in East LA or the Arts District",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private studio tour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset canyon-to-coast driver",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "High-end tasting-menu dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Malibu sunset dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop drinks in West Hollywood",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Getty and long lunch day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee in Silver Lake",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum morning",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach walk and food-truck stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Hollywood sign views",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "One museum and one great dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "La Brea Tar Pits",
        "url": "https://tarpits.org/",
        "checkedOn": "2026-10-25",
        "reason": "official site: \"The Museum at La Brea Tar Pits is temporarily closed for construction\" with no reopening date"
      },
      {
        "name": "The Huntington",
        "url": "https://www.huntington.org/visit",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on two attempts"
      },
      {
        "name": "Petersen Automotive Museum",
        "url": "https://www.petersen.org/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on two attempts"
      },
      {
        "name": "Go Get Em Tiger",
        "url": "https://gget.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on two attempts"
      },
      {
        "name": "Hauser & Wirth Los Angeles",
        "url": "https://www.hauserwirth.com/locations/hauser-wirth-los-angeles/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on two attempts"
      },
      {
        "name": "Gjusta",
        "url": "https://gjusta.com/",
        "checkedOn": "2026-10-25",
        "reason": "certificate has expired"
      },
      {
        "name": "Langer's Deli",
        "url": "https://www.langersdeli.com/",
        "checkedOn": "2026-10-25",
        "reason": "homepage text gives no address or hours (only a Yom Kippur closure banner); hours page 404"
      },
      {
        "name": "The Original Farmers Market",
        "url": "https://farmersmarketla.com/",
        "checkedOn": "2026-10-25",
        "reason": "page returned only a heading; nothing readable"
      },
      {
        "name": "Union Station",
        "url": "https://unionstationla.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site shows 2026 events but no street address"
      },
      {
        "name": "El Pueblo de Los Angeles (Olvera Street)",
        "url": "https://elpueblo.lacity.gov/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Proof Bakery",
        "url": "https://www.proofbakeryla.com/",
        "checkedOn": "2026-10-25",
        "reason": "page returned no readable content"
      },
      {
        "name": "Kismet",
        "url": "https://www.kismetrestaurant.com/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (ENOTFOUND)"
      },
      {
        "name": "Death & Co Los Angeles",
        "url": "https://www.deathandcompany.com/los-angeles",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 404 Not Found"
      },
      {
        "name": "The Varnish",
        "url": "https://www.thevarnishbar.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 404 Not Found"
      },
      {
        "name": "Walt Disney Concert Hall",
        "url": "https://www.laphil.com/visit/walt-disney-concert-hall",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 404 Not Found on the tried page"
      },
      {
        "name": "Clifton's",
        "url": "https://www.cliftons.com/",
        "checkedOn": "2026-10-25",
        "reason": "domain shows an unrelated Sydney events company, not the LA venue"
      }
    ],
    "placeSources": {
      "Griffith Observatory": {
        "url": "https://griffithobservatory.lacity.gov/",
        "sourceType": "official public operator (City of Los Angeles)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Banner dated Sunday, October 25, 2026: \"open today from 10:00 a.m. to 10:00 p.m.\"; events listed for October 28 and November 2, 2026. Admission described as free; \"paid parking near the Observatory and free parking downhill.\""
      },
      "LACMA": {
        "url": "https://www.lacma.org/",
        "sourceType": "operator's own site (Los Angeles County Museum of Art)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions including \"The Brockman Gallery: Los Angeles, 1967-1990\" (through Jan 24, 2027) and \"Textile Alchemy: The Art of Reiko Sudo & NUNO\" (through Mar 7, 2027); \"The New David Geffen Galleries Are Now Open.\""
      },
      "The Broad": {
        "url": "https://www.thebroad.org/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page offers free general admission with recommended timed reservations and daily walk-ups; Kusama's Infinity Mirrored Room \"requires advance reservations\"; notes Hope Street closure for expansion construction."
      },
      "Academy Museum of Motion Pictures": {
        "url": "https://www.academymuseum.org/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page lists 2026 notices, including East Rolex Gallery (Level 3) closed Oct 19-Dec 12; general admission $25 for adults, free for 17 and under."
      },
      "Natural History Museum of Los Angeles County": {
        "url": "https://nhm.org/visit",
        "sourceType": "official public operator (Natural History Museums of Los Angeles County)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Ticket booking live; \"Orcas: Our Shared Future\" listed as \"Now Open\" with advance reservations; L.A. County residents free 3-5 pm Monday-Friday, onsite only."
      },
      "Los Angeles Central Library": {
        "url": "https://www.lapl.org/branches/central-library",
        "sourceType": "official public operator (Los Angeles Public Library)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Events listed for 10/25/2026, including a \"Docent-led L.A. Central Library Art & Architecture Tour\" 2:00-3:00 PM."
      },
      "Hollywood Bowl": {
        "url": "https://www.hollywoodbowl.com/visit/getting-here",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Upcoming events listed, e.g. Aerosmith & Friends Oct 29-Nov 01, 2026 and Steve Lacy Nov 21, 2026, with 2027 dates posted. Advises arriving \"at least 90 minutes prior\" and to \"Purchase your parking in advance.\""
      },
      "Santa Monica Pier": {
        "url": "https://santamonicapier.org/",
        "sourceType": "official operator (Santa Monica Pier Corporation)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Recurring free programs listed: history tour \"EVERY SATURDAY & SUNDAY | 10 AM\" and Locals' Night \"Every Third Thursday | SEPTEMBER - MAY.\" No 2026-dated content; footer reads 2023."
      },
      "Grand Central Market": {
        "url": "https://www.grandcentralmarket.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current vendor list (e.g. Tacos Tumbras a Tomas, Go Get Em Tiger, Lucky Bird); footer \"© 2026 Grand Central Market\"; \"Hours vary vendor to vendor.\""
      },
      "The Last Bookstore": {
        "url": "https://www.lastbookstorela.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "October-November 2026 events listed, including \"13 Nights After Dark\" (Oct 19-31) and Jane Fonda in conversation (Mon, Nov 9, 7-9 PM). Some events close the store to the public."
      },
      "Bestia": {
        "url": "https://www.bestiala.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "OpenTable reservations live; posted hours; notes a 4% service charge removable on request. \"Closed for most major holidays.\""
      },
      "Bavel": {
        "url": "https://baveldtla.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "OpenTable booking widget with time slots 5:00-11:00pm for parties of 1-8; optional 4% \"Healthy LA\" charge. No 2026-dated content (footer 2023)."
      },
      "Gjelina (Venice)": {
        "url": "https://www.gjelina.com/",
        "sourceType": "operator's own site (Gjelina Group)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Posted service hours and SevenRooms reservations for Venice; no 2026-dated content."
      },
      "République": {
        "url": "https://republiquela.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Footer \"© 2026 République\"; OpenTable \"BOOK NOW\" and online bakery pre-orders; brunch \"daily from 8am to 2pm with lunch at 11.\""
      },
      "Musso & Frank Grill": {
        "url": "https://www.mussoandfrank.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Renowned Service and Cuisine Since 1919\"; current menu, OpenTable reservations and posted hours. No dated 2026 content."
      },
      "Philippe The Original": {
        "url": "https://www.philippes.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Open Daily 6 am - 10 pm\"; online ordering link; footer \"©Copyright Philippe The Original 2026.\""
      },
      "Huckleberry Café": {
        "url": "https://www.huckleberrycafe.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Thanksgiving catering menu with \"orders closing Thursday, November 19 at 6pm\"; footer \"©2026 - Huckleberry Café.\""
      },
      "Great White (Venice)": {
        "url": "https://www.greatwhite.cafe/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Location page with hours and policy: \"Walk-ins only 8am - 4pm. Reservations from 4pm onwards\"; homepage footer \"©2026 Great White.\""
      },
      "Bub and Grandma's": {
        "url": "https://www.bubandgrandmas.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "BG Nites menu dated 2026/10 and October 2026 calendar; \"On Sunday nights, we feature live jazz\" with sets at 6:15pm and 7:30pm."
      },
      "Porto's Bakery (Glendale)": {
        "url": "https://www.portosbakery.com/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Footer ©2026; Halloween (10/31) hours 6:30 AM-5:00 PM; online pickup slots \"disappear as they hit daily capacity.\""
      },
      "Courage Bagels": {
        "url": "https://www.couragebagels.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"orders taken at the walk up window Thursday - Monday 7am - 2pm!\"; a banner also says \"softly open\" \"weekends only!\", which conflicts. No dated 2026 content."
      },
      "Verve Coffee Roasters (West 3rd Street)": {
        "url": "https://www.vervecoffee.com/pages/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Listed as an open LA cafe with hours on the 2026 locations page (footer \"© 2026 VERVE COFFEE ROASTERS\"); Spring Street branch marked \"Permanently Closed.\""
      },
      "Thunderbolt": {
        "url": "https://www.thunderboltla.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Posted weekly hours and Resy booking: \"Reservations are available for parties of up to 9 guests\"; larger groups email events."
      },
      "Employees Only LA": {
        "url": "https://www.employeesonlyla.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online reservations through OpenTable and a reservation form. No dated 2026 content."
      },
      "The Roger Room": {
        "url": "https://www.therogerroom.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Reservation Request\" by email; hours shown only as an image. No dated 2026 content."
      }
    }
  },
  "Mexico City, Mexico": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability, and short-term notices (such as single-day closures, weekly show listings and seasonal food festivals) were left out of the guide copy. Several well-known places could not be read and are excluded: Museo Nacional de Antropología (HTTP 468), Palacio de Bellas Artes and Fifty Mils (HTTP 403), Pujol, Buna and Almanegra (HTTP 429), Chapultepec Park, Chapultepec Zoo and Museo del Estanquillo (connection refused), and Castillo de Chapultepec, Anahuacalli, Museo Jumex and Biblioteca Vasconcelos (DNS failures). Some confirmed places publish only partial details: Rosetta and Cafebrería El Péndulo show no opening hours, Basílica de Guadalupe's visiting hours were on a separate page not read, Museo Tamayo and MIDE do not list weekly opening days, Papalote's hours are not explicitly labelled as museum hours, Templo Mayor's current exhibition has no stated dates, and Bar La Ópera's hours are written in ambiguous shorthand.",
    "sourceUrls": [
      "docs/content-research/mexico-city-2026-10-25.md",
      "docs/content-research/mexico-city-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Centro Historico",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (neighbourhood); covered via named Centro sites"
      },
      {
        "name": "Roma and Condesa",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (neighbourhoods)"
      },
      {
        "name": "Roma Norte",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (neighbourhood)"
      },
      {
        "name": "Chapultepec Park",
        "url": "https://chapultepec.cdmx.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official site chapultepec.cdmx.gob.mx refused connection (ECONNREFUSED); not readable"
      },
      {
        "name": "Chapultepec",
        "url": "https://chapultepec.cdmx.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "same as Chapultepec Park; official site not readable (ECONNREFUSED)"
      },
      {
        "name": "Park day in Chapultepec",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Mercado snacks",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Roma walking day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Tasting menu dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private anthropology guide",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "High-end boutique stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Condesa dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop mezcal night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum and long lunch day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Cafe in Roma",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market lunch and bookstore afternoon",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Lucha libre night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Arena México confirmed separately)"
      },
      {
        "name": "Xochimilco trajinera",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (no single operator)"
      },
      {
        "name": "Boat ride in Xochimilco",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (no single operator)"
      },
      {
        "name": "Library and design shops",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Chapultepec Zoo",
        "url": "https://www.sedema.cdmx.gob.mx/programas/programa/zoologico-de-chapultepec",
        "checkedOn": "2026-10-25",
        "reason": "official SEDEMA page refused connection (ECONNREFUSED); not readable"
      },
      {
        "name": "Pujol",
        "url": "https://pujol.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 429 Too Many Requests on three attempts; not readable"
      },
      {
        "name": "Panaderia Rosetta",
        "url": "https://rosetta.com.mx/panaderia",
        "checkedOn": "2026-10-25",
        "reason": "rosetta.com.mx lists no bakery address or hours; /panaderia returned only an image, no readable text"
      },
      {
        "name": "Cafe Nin",
        "url": "https://www.cafenin.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official domain redirects to Instagram (social media not allowed as evidence)"
      },
      {
        "name": "Lardo",
        "url": "https://lardo.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official site refused connection (ECONNREFUSED)"
      },
      {
        "name": "El Cardenal",
        "url": "https://restauranteelcardenal.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site lists branches but no hours or current operating evidence (latest dated item 2024); /sucursales returned 404"
      },
      {
        "name": "Expendio de Maiz",
        "url": "https://www.expendiodemaiz.com/",
        "checkedOn": "2026-10-25",
        "reason": "SSL error (WRONG_VERSION_NUMBER) on the presumed official domain; not readable"
      },
      {
        "name": "Handshake Speakeasy",
        "url": "https://handshake.bar/",
        "checkedOn": "2026-10-25",
        "reason": "official site handshake.bar publishes no address or hours; handshakespeakeasy.com does not resolve"
      },
      {
        "name": "Licoreria Limantour",
        "checkedOn": "2026-10-25",
        "reason": "no official site found; limantour.tech and limantour.mx do not resolve"
      },
      {
        "name": "Baltra Bar",
        "url": "https://baltra.bar/",
        "checkedOn": "2026-10-25",
        "reason": "official site gives hours but no address"
      },
      {
        "name": "Odette",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified"
      },
      {
        "name": "Marne Bread Co.",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified (only review/guide listings)"
      },
      {
        "name": "Cucurucho",
        "url": "https://cucurucho.mx/",
        "checkedOn": "2026-10-25",
        "reason": "cucurucho.mx does not resolve (DNS failure); no other official site found"
      },
      {
        "name": "Quentin Cafe",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified (only directory listings)"
      },
      {
        "name": "Cardinal Casa de Cafe",
        "url": "https://casacardinal.mx/",
        "checkedOn": "2026-10-25",
        "reason": "casacardinal.mx returned HTTP 522; not readable"
      },
      {
        "name": "Museo Nacional de Antropología",
        "url": "https://www.mna.inah.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official INAH site returned HTTP 468 (automated access refused)"
      },
      {
        "name": "Palacio de Bellas Artes",
        "url": "https://palacio.inba.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official INBAL site returned HTTP 403 Forbidden"
      },
      {
        "name": "Castillo de Chapultepec (Museo Nacional de Historia)",
        "url": "https://www.mnh.inah.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "mnh.inah.gob.mx does not resolve (DNS failure)"
      },
      {
        "name": "Museo Anahuacalli",
        "url": "https://www.anahuacallimuseo.org/",
        "checkedOn": "2026-10-25",
        "reason": "DNS lookup failed (EAI_AGAIN); not readable"
      },
      {
        "name": "Casa Luis Barragán",
        "url": "https://www.casaluisbarragan.org/",
        "checkedOn": "2026-10-25",
        "reason": "homepage gives no address or visit hours; /visitas returned 404"
      },
      {
        "name": "Museo Jumex",
        "url": "https://www.museojumex.org/",
        "checkedOn": "2026-10-25",
        "reason": "DNS lookup failed (EAI_AGAIN); not readable"
      },
      {
        "name": "Fifty Mils (Four Seasons)",
        "url": "https://www.fourseasons.com/mexico/dining/lounges/fifty-mils/",
        "checkedOn": "2026-10-25",
        "reason": "official Four Seasons page returned HTTP 403 Forbidden"
      },
      {
        "name": "Sanborns Casa de los Azulejos",
        "url": "https://www.sanborns.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 403 Forbidden"
      },
      {
        "name": "Café de Tacuba",
        "url": "https://www.cafedetacuba.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned no readable content"
      },
      {
        "name": "Café El Jarocho",
        "url": "https://www.cafeeljarocho.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned no readable content"
      },
      {
        "name": "El Globo",
        "url": "https://www.elglobo.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "homepage lists no branch address; latest dated content 2024"
      },
      {
        "name": "Gran Hotel Ciudad de México (Terraza)",
        "url": "https://www.granhoteldelaciudaddemexico.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "address published but no hours or current evidence for the terrace restaurant/bar"
      },
      {
        "name": "Ojo de Agua",
        "url": "https://grupoojodeagua.com.mx/sucursales/",
        "checkedOn": "2026-10-25",
        "reason": "branch page gives hours but no street addresses (map links only)"
      },
      {
        "name": "Tlecan",
        "url": "https://tlecan.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site gives no address, hours or reservation details"
      },
      {
        "name": "Buna",
        "url": "https://buna.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 429 Too Many Requests on three attempts"
      },
      {
        "name": "Almanegra Café",
        "url": "https://almanegracafe.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 429 Too Many Requests on three attempts"
      },
      {
        "name": "Museo del Estanquillo",
        "url": "https://www.museodelestanquillo.cdmx.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "official CDMX site refused connection (ECONNREFUSED)"
      },
      {
        "name": "Biblioteca Vasconcelos",
        "url": "https://www.bibliotecavasconcelos.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "DNS lookup failed (EAI_AGAIN); not readable"
      },
      {
        "name": "Museo de Arte Popular",
        "url": "https://www.museodeartepopular.cdmx.gob.mx/",
        "checkedOn": "2026-10-25",
        "reason": "presumed official domain does not resolve (DNS failure)"
      },
      {
        "name": "Museo Casa de León Trotsky",
        "url": "https://www.museocasadeleontrotsky.com/",
        "checkedOn": "2026-10-25",
        "reason": "presumed official domain does not resolve (DNS failure)"
      },
      {
        "name": "Lalo!",
        "url": "https://www.eat-lalo.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site contains only Instagram links; no address or hours"
      },
      {
        "name": "Hanky Panky",
        "url": "https://www.hankypankycdmx.com/",
        "checkedOn": "2026-10-25",
        "reason": "presumed official domain does not resolve (DNS failure)"
      },
      {
        "name": "Blend Station",
        "url": "https://www.blendstation.mx/",
        "checkedOn": "2026-10-25",
        "reason": "DNS lookup failed (EAI_AGAIN)"
      },
      {
        "name": "Maque",
        "url": "https://www.maque.com.mx/",
        "checkedOn": "2026-10-25",
        "reason": "presumed official site returned HTTP 404"
      }
    ],
    "placeSources": {
      "Museo Frida Kahlo (Casa Azul)": {
        "url": "https://www.museofridakahlo.org.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current hours and a closure list running to \"January 1, 2027\"; tickets sold online at boletos.museofridakahlo.org.mx and at a self-service kiosk in the museum shop's Showroom-Click & Collect area."
      },
      "Museo del Templo Mayor": {
        "url": "https://www.templomayor.inah.gob.mx/",
        "sourceType": "official public operator (INAH)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists the temporary exhibition \"Cuauhtémoc. Historia y memoria\" (no dates shown) and states \"El museo está abierto de martes a domingo de 09:00 a 17:00 horas.\""
      },
      "Contramar (Roma Norte)": {
        "url": "https://contramar.com.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Reservations desk open daily 10:00-20:00 by phone/WhatsApp or OpenTable; groups over 7 book by email (\"reservaciones mayores a 7 personas\")."
      },
      "Quintonil": {
        "url": "https://www.quintonil.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Tasting menu dated \"OCTUBRE 2026\" titled \"NUESTRO MÉXICO\" at $6,090 MXN; bookings only via Tock, \"no se realizan reservaciones vía correo electrónico\"."
      },
      "Museo Soumaya (Plaza Carso)": {
        "url": "https://www.museosoumaya.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current visitor information lists daily hours and \"Entrada gratuita\" for Plaza Carso and its other three venues."
      },
      "Papalote Museo del Niño (Chapultepec)": {
        "url": "https://www.papalote.org.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online ticket sales (\"Compra tus boletos\") for the Chapultepec site, current film listings and group-sales contacts."
      },
      "Museo Tamayo": {
        "url": "https://www.museotamayo.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions \"Tamayo, Nieto, Toledo: Los años en París\" (20 Aug 2026-15 Feb 2027) and \"Museo Tamayo: Arquitectura y cosmotécnica\" (23 Jul 2026-28 Feb 2027)."
      },
      "Arena México": {
        "url": "https://cmll.com/arenas/arena-mexico/",
        "sourceType": "operator's own site (CMLL)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "CMLL lists dated October and November 2026 lucha libre cards at Arena México, with tickets at the box office or via Ticketmaster; regular shows Tuesdays 7:30 pm, Fridays 8:30 pm, Sundays 5:00 pm."
      },
      "Museo Dolores Olmedo": {
        "url": "https://www.museodoloresolmedo.org.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes visiting hours and a \"Boletos\" link for ticket sales; footer \"MDO © 2026\"."
      },
      "Máximo Bistrot": {
        "url": "https://www.maximobistrot.com.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current service hours with links to Reservaciones and Menú pages."
      },
      "Churrería El Moro (Centro Histórico)": {
        "url": "https://elmoro.mx/churrerias/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch list gives the Centro Histórico shop as open Monday to Sunday, \"24 hrs\"; \"Churrería desde 1935\"."
      },
      "MUAC (Museo Universitario Arte Contemporáneo)": {
        "url": "https://muac.unam.mx/",
        "sourceType": "official public operator (UNAM)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibition \"Desde el umbral\" runs 13.06.2026-29.11.2026; general admission $60, free Thursdays 18:00-20:00; \"La venta de boletos termina 30 minutos antes del cierre.\""
      },
      "Rosetta": {
        "url": "https://rosetta.com.mx/reservaciones",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Reservations page takes bookings, with tables of 5 to 12 handled by email/phone/WhatsApp and groups of 13+ by the events team."
      },
      "Bar La Ópera": {
        "url": "https://laoperabar.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current hours and contact for \"Grupos y Eventos Especiales\"; history dates to 1876 and the present site to 1895."
      },
      "Azul Histórico": {
        "url": "https://azul.rest/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Header shows \"Octubre - Noviembre 2026\" with a Oaxaca food festival; blog posts dated 2026; online reservation link for this branch."
      },
      "Chiquitito Café (Alfonso Reyes)": {
        "url": "https://www.chiquititocafe.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch list with \"Horarios 7:30 am a 8:30 pm\" for each location; footer \"© 2026\"."
      },
      "Antiguo Colegio de San Ildefonso": {
        "url": "https://www.sanildefonso.org.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions \"UNAM 475+\" (\"Octubre 2026 - Marzo 2027\") and \"Entretejidas\" (17 Sep-6 Dec 2026); admission $50 MXN, free on Sundays."
      },
      "Museo Kaluz": {
        "url": "https://www.museokaluz.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibition \"Alphonse Mucha: La magia de la línea\" (9 Oct 2026-8 Feb 2027); \"El arte nuevo: Simbolismo y Art Nouveau en México\" opens 30 Oct 2026 to 8 Mar 2027."
      },
      "Museo Nacional de Arte (MUNAL)": {
        "url": "https://www.munal.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions \"Ángel Zárraga. Los ideales del arte\" (25/09/2026-28/03/2027) and \"México: ruta y destino\" (21/05/2026-14/02/2027)."
      },
      "Pastelería Ideal (16 de Septiembre)": {
        "url": "https://www.pasteleriaideal.com/sucursales",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch page lists daily hours and department phone extensions (Repostería, Bocadillos, Mayoreo)."
      },
      "Gin Gin (Polanco)": {
        "url": "https://gingin.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch list with daily hours for five locations; footer \"© 2026 Grupo Indiana\"."
      },
      "Basílica de Guadalupe": {
        "url": "https://virgendeguadalupe.org.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dated October 2026 liturgy (Laudes and Misa Coral on 24 Oct 2026, readings for October 2026); daily Misa Coral at 9:00 h."
      },
      "MIDE Museo Interactivo de Economía": {
        "url": "https://www.mide.org.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Hoy abierto de 09:00 a 17:00\"; online tickets; \"Tardes con Pilón\" 2x1 general entry Tue-Fri 15:00-17:00 at the box office only; 2026 content incl. Global Money Week 2026."
      },
      "Zinco Jazz Club": {
        "url": "https://www.zincojazz.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dated October 2026 programme of nightly shows; online reservations for 2 to 10 people, larger groups via WhatsApp."
      },
      "Cafebrería El Péndulo (Condesa)": {
        "url": "https://www.pendulo.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live 2026 bookshop content (a 2026 \"Temporada de terror\" banner, 2027 calendars for sale); footer \"2026 © Cafebrería El Péndulo\"."
      },
      "Salón Tenampa": {
        "url": "https://tenampa.com.mx/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current weekly hours and a seasonal menu promotion; footer \"2026 TENAMPA\"; founded \"en el año de 1925\"."
      }
    }
  },
  "Budapest, Hungary": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The Hungarian Parliament site showed a CAPTCHA; the Museum of Fine Arts and Hungarian National Gallery returned HTTP 451; Ruszwurm, High Note SkyBar and Madal Café returned 403; Central Café, Boutiq'Bar, My Little Melbourne, Szimply, Pékműhely, Hopp, Művész Kávéház and Butter Brothers had certificate or TLS errors; several other domains did not resolve. None of these failures is evidence of closure. Matthias Church's weekly schedule was not readable (only one day's hours), Kollázs published no opening hours, the Hungarian State Opera's box office hours were not shown, and the House of Terror Museum's reopening notice gives no year. Espresso Embassy, Artizán, Auguszt and Kollázs showed current hours or booking but no dated 2026 content. Gellért Thermal Bath is closed, with reopening expected in 2028.",
    "sourceUrls": [
      "docs/content-research/budapest-2026-10-25.md",
      "docs/content-research/budapest-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Hungarian Parliament Building (Visitor Centre)",
        "url": "https://www.parlament.hu/en/web/visitor-centre",
        "checkedOn": "2026-10-25",
        "reason": "Official site showed a CAPTCHA check ('CAPTCHA ellenőrzés'); not bypassed."
      },
      {
        "name": "Museum of Fine Arts",
        "url": "https://www.szepmuveszeti.hu/en/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 451 to automated fetch."
      },
      {
        "name": "Hungarian National Gallery",
        "url": "https://mng.hu/en/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 451 to automated fetch."
      },
      {
        "name": "Gellért Thermal Bath",
        "url": "https://www.gellertfurdo.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Official site says the bath is closed: 'A fürdő 2025. október 1-jétől zárva tart', reopening expected 2028."
      },
      {
        "name": "Fisherman's Bastion",
        "url": "https://www.fishermansbastion.com/",
        "checkedOn": "2026-10-25",
        "reason": "Only site found is run by a restaurant company (Magyar Halászbástya Étteremüzemeltető Kft.), not confirmed as the official operator; no street address."
      },
      {
        "name": "Dohány Street Synagogue",
        "url": "https://www.dohany-zsinagoga.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Community site gives address (Síp utca 12.) but no visiting hours or 2026 operating evidence; visit page returned 404."
      },
      {
        "name": "Liszt Academy",
        "url": "https://concert.lisztacademy.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Concert calendar is current (October–December 2026) but no venue street address could be read on the official pages fetched."
      },
      {
        "name": "Hungarian Museum of Agriculture (Vajdahunyad Castle)",
        "url": "https://www.mezogazdasagimuzeum.hu/en",
        "checkedOn": "2026-10-25",
        "reason": "No opening hours or current exhibition/2026 evidence on the page read."
      },
      {
        "name": "Kéhli Vendéglő",
        "url": "https://www.kehli.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Hours published but no street address on the official homepage; contact page returned 404."
      },
      {
        "name": "Szimpla Kert",
        "url": "https://www.szimpla.hu/info.html",
        "checkedOn": "2026-10-25",
        "reason": "Official pages read showed no address, hours or dated content; English info page returned 404."
      },
      {
        "name": "Costes",
        "url": "https://costes.group/",
        "checkedOn": "2026-10-25",
        "reason": "Group site shows no address or hours; restaurant site returned 404."
      },
      {
        "name": "Ruszwurm",
        "url": "https://ruszwurm.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403."
      },
      {
        "name": "Central Café (Centrál Kávéház)",
        "url": "https://www.centralkavehaz.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error ('certificate has expired'); not bypassed."
      },
      {
        "name": "Boutiq'Bar",
        "url": "https://www.boutiqbar.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error ('self signed certificate'); not bypassed."
      },
      {
        "name": "My Little Melbourne",
        "url": "https://mylittlemelbourne.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname mismatch); not bypassed."
      },
      {
        "name": "High Note SkyBar",
        "url": "https://highnoteskybar.hu/en/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403."
      },
      {
        "name": "Madal Café",
        "url": "https://madalcafe.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403."
      },
      {
        "name": "Szimply",
        "url": "http://szimply.com/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname mismatch); not bypassed."
      },
      {
        "name": "Pékműhely",
        "url": "https://pekmuhely.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname mismatch); not bypassed."
      },
      {
        "name": "Butter Brothers",
        "url": "https://www.butterbrothers.hu/",
        "checkedOn": "2026-10-25",
        "reason": "TLS error on fetch; not bypassed."
      },
      {
        "name": "Hopp",
        "url": "https://www.hopp.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname mismatch); not bypassed."
      },
      {
        "name": "Művész Kávéház",
        "url": "https://www.muveszkavehaz.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error ('unable to verify the first certificate'); not bypassed."
      },
      {
        "name": "Daubner Cukrászda",
        "url": "https://www.daubnercukraszda.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Connection refused on fetch."
      },
      {
        "name": "Café Kör",
        "url": "https://www.cafekor.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned no readable content."
      },
      {
        "name": "Fekete",
        "url": "https://www.feketekv.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Address readable (Múzeum krt 5.) but hours conflict and the latest dated content is from 2021; no current operating evidence."
      },
      {
        "name": "Szamos (Budapest branches)",
        "url": "https://www.szamos.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Homepage lists branch names only, no addresses or hours; footer © 2025."
      },
      {
        "name": "Café Gerlóczy",
        "url": "https://www.cafegerloczy.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (ENOTFOUND)."
      },
      {
        "name": "Spíler",
        "url": "https://www.spilerbistro.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Domain tried did not resolve (ENOTFOUND)."
      },
      {
        "name": "Cirkusz",
        "url": "https://www.cirkuszbudapest.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain tried did not resolve (ENOTFOUND)."
      },
      {
        "name": "Belvárosi Piac (Hold utca market)",
        "url": "https://belvarosipiac.hu/",
        "checkedOn": "2026-10-25",
        "reason": "Domain tried did not resolve (ENOTFOUND)."
      },
      {
        "name": "DOBLO Wine Bar",
        "url": "https://budapestwine.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain tried redirected to an unrelated site (unosek.org); not followed."
      },
      {
        "name": "Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A major museum, palace, temple, or heritage site",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local market or craft district",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood walk through A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A second museum or cultural stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A nearby day trip from Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local specialties near Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market or food hall in A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A dinner that reflects Hungary",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A cafe near A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "An easy lunch between Budapest historic center or old town and A major museum, palace, temple, or heritage site",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood table away from the busiest sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free walking route through Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A public square or viewpoint near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market meal in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided time around Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local neighborhood afternoon",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free museum or public garden time when available",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A destination-led dinner in Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A polished stay near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A private transfer between highlights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A special evening around A major museum, palace, temple, or heritage site",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A tailored food or culture experience",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A scenic outing built around A major museum, palace, temple, or heritage site",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long local dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow morning in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A photo-friendly walk through Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A memorable day trip from Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "An easy first stop at Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A family-friendly outing near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market or food hall everyone can browse",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal close to A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short scenic stop with room to move",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A low-pressure day around Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "An early visit to Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Your main base in Budapest cafe or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A self-guided walk through A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local class, museum, or food stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A people-watching break in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A flexible day with one clear anchor",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A quieter side of A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local recommendation beyond the headline sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A less obvious side of Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A seasonal experience in Hungary",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short detour beyond Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "An off-peak version of Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A nearby area bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and a walk through A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual local lunch near Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market meal around A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Lunch between Budapest historic center or old town and A major museum, palace, temple, or heritage site",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long midday meal in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local dinner in Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local specialty from Hungary near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A memorable table close to A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower final-night meal away from the busiest sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed night close to the stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A nearby area morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before Budapest historic center or old town",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A regional sweet to take on the road",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Your main base in Budapest",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood coffee stop in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup before the next stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Hungarian National Museum": {
        "url": "https://mnm.hu/en",
        "sourceType": "official public operator (Hungarian National Museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibition 'The Treasures of King Louis I (the Great) of Hungary' runs 2026.03.05. to 12.31. The site also notes 'Some of our exhibition halls will be closed to visitors from December 2, 2025, due to renovation works' and the Coronation Mantle is 'Currently closed to visitors.'"
      },
      "St. Stephen's Basilica": {
        "url": "https://www.bazilikabudapest.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News items dated through 2026-09-04, including '2026-03-18: Húsvéti miserend és nyitvatartás'; visitor hours published for the church and the Panorama Terrace."
      },
      "Széchenyi Thermal Bath": {
        "url": "https://www.szechenyifurdo.hu/nyitvatartas",
        "sourceType": "official public operator (Budapest Gyógyfürdői és Hévizei Zrt.)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice: on 'kiemelt napok (2026. október 23-25., december 18. - 2027. január 6.)' the bath opens at 8:00; online tickets sold to 'avoid the queue'."
      },
      "Rudas Baths": {
        "url": "https://www.rudasfurdo.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Links an 'Árak 2026' price page; night bathing tickets are 'kizárólag online' (online only). States 'A FÜRDŐ 14 ÉVES KOR ALATT NEM LÁTOGATHATÓ' (no visitors under 14)."
      },
      "Matthias Church": {
        "url": "https://www.matyas-templom.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Concert listings including '2026. november 1. 19:30 – Rutter: Requiem' and '2026. december 19. 20:00 – Bach és Charpentier'."
      },
      "House of Terror Museum": {
        "url": "https://www.terrorhaza.hu/en/visitor-information",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage notices a temporary technical closure with 'Opening: September 22 at 10:00 AM' and 'From Tuesday, September 29, admission fees will once again apply' (no year stated; 29 September is a Tuesday in 2026). 'Tickets are only available for purchase at the museum.'"
      },
      "Museum of Ethnography": {
        "url": "https://www.neprajz.hu/en/",
        "sourceType": "official public operator (Museum of Ethnography)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Temporary exhibitions 'A Soldier's Lot – Remembering Compulsory Military Service' (30 September 2026 to 29 August 2027) and 'Rituals of Beauty' (19 May 2026 to 4 January 2027)."
      },
      "Ludwig Museum": {
        "url": "https://www.ludwigmuseum.hu/en/opening-hours-and-ticket-prices",
        "sourceType": "official public operator (Ludwig Museum – Museum of Contemporary Art)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions 'Walk This Way. The Art of Walking' (9 October 2026 to 31 January 2027) and 'BING BANG. Expanding Collection Horizons' (5 September 2025 to 10 January 2027)."
      },
      "House of Music Hungary": {
        "url": "https://zenehaza.hu/en/opening-hours",
        "sourceType": "operator's own site (Liget Budapest)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Programme calendar lists events such as 'Nov 5: Cannons and Flowers, gala concert celebrating György Cziffra'; permanent exhibition 'Dimensions of Sound' and the temporary Freddie exhibition."
      },
      "Budapest History Museum – Castle Museum": {
        "url": "https://varmuzeum.hu/en/",
        "sourceType": "official public operator (Budapest History Museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions listed, including 'A City on the Front Line' (Buda and Pest under Ottoman rule) and 'Chronicles of Lost Buildings'; the parent BHM site lists 2026-dated exhibitions."
      },
      "Hospital in the Rock": {
        "url": "https://www.sziklakorhaz.eu/en/information",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online ticket booking live; 'The museum can only be visited as part of a guided tour.' Children under 6 may not visit."
      },
      "Hungarian State Opera": {
        "url": "https://www.opera.hu/en/services/operatour/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Guided tours bookable: 60-minute English tour 'daily at 1:30 pm, 3:00 pm, and 4:30 pm'; tickets on sale one week ahead. 'Guided tours are not available during performances.'"
      },
      "Budapest Zoo": {
        "url": "https://www.zoobudapest.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Events 'Nyugdíjas Ősz az Állatkertben 2026' (October 1 to November 30, 2026) and a Halloween evening on October 30, 2026; adult ticket 5,900 HUF, child 4,200 HUF."
      },
      "Várkert Bazár": {
        "url": "https://varkertbazar.hu/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News posts dated 2026 (15 May 2026 programme change; 28 April 2026 'Information on temporary closure', details not shown). Garden hours published."
      },
      "Great Market Hall": {
        "url": "https://piaconline.hu/nagycsarnok/",
        "sourceType": "official public operator (Budapest Vásárcsarnokai Kft.)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Operator site carries a price table dated '2026.10.16.' and the hall's weekly hours; closed ('ZÁRVA!') on official holidays."
      },
      "Gerbeaud": {
        "url": "https://www.gerbeaud.hu/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current hours notice and '© 2026 Gerbeaud Confectionery'; 'In our cafe, there is no reservation system.'"
      },
      "New York Café": {
        "url": "https://www.newyorkcafe.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Booking rules published: table reservations 'csak 18:00 utánra és kizárólag vacsoravendégeknek' (only after 18:00, dinner guests only); walk-in seating 07:00-18:00. '© 2026 New York Café'."
      },
      "Espresso Embassy": {
        "url": "https://www.espressoembassy.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice published; holidays: 'Ünnepeken általában nyitva tartunk, a részleteket jelezzük.' No dated 2026 content seen."
      },
      "Artizán (Hold utca)": {
        "url": "https://www.artizan.hu/lokaciok/artizan-budapest/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch page with current hours; site images uploaded June-July 2026. No dated 2026 notice."
      },
      "Auguszt Cukrászda (Kossuth Lajos utca)": {
        "url": "https://www.auguszt.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch hours published ('Kedd-Szombat: 10.00-18.00', 'Vasárnap: Zárva'). No dated 2026 content seen."
      },
      "Első Pesti Rétesház": {
        "url": "https://reteshaz.com/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online table reservation offered; footer '2007 - 2026 © Első Pesti Rétesház'; private strudel-stretching shows for a minimum of 20 people."
      },
      "Rosenstein": {
        "url": "https://www.rosenstein.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Booking form live; a reservation is valid only once confirmed by email ('Amíg nem igazoltuk vissza Önnek e-mailben, addig nincs érvényes foglalása'). 'Copyright 2026 © Rosenstein Vendéglő'."
      },
      "Menza": {
        "url": "https://www.menzaetterem.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current weekly offer and daily lunch menu (2,890 Ft, from 11:30 'while stocks last'); online booking for up to 4 people."
      },
      "Mazel Tov": {
        "url": "https://www.mazeltov.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Page published Oct 22, 2026; guest-chef evening 'október 27., kedd'; blog posts dated October 2026; online booking via SevenRooms."
      },
      "Stand25": {
        "url": "https://www.stand25.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online and phone booking; drinks list file '2026.10.-ITALLAP_WEB.pdf'; Sunday 'Zárva'."
      },
      "Gundel": {
        "url": "https://www.gundel.hu/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Advertises 'NEW YEAR'S EVE AT GUNDEL Gundel Palace | 31 December 2026, 6.30 pm'; 'Gundel Restaurant is open all year round.' 'smart casual dress is recommended.'"
      },
      "Kollázs Brasserie & Bar": {
        "url": "https://www.kollazs.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live reservation form; serves breakfast, lunch, dinner, Sunday Brunch and cocktails, with live music on weekends. No dated 2026 content seen."
      },
      "360 Bar": {
        "url": "https://www.360bar.hu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026 menus ('MENU2026', 'summer2026') and '360 MOOD MAY 2026'; online table booking."
      }
    }
  },
  "Copenhagen, Denmark": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The input lists were entirely generic, so all 28 places were added as candidates. Some places were published only partially: Tivoli Gardens' homepage gave no opening hours, Mikkeller Bar Viktoriagade listed no hours, Designmuseum Danmark showed only today's hours, Rosenborg Castle's page showed hours only from 2 November, and Copenhagen Zoo's only for 25–31 October 2026. Noma's site says it returned to Copenhagen in August 2026 without an exact date. Kødbyens Fiskebar, Ruby, Geranium, Coffee Collective and Andersen Bakery showed hours or booking but no dated 2026 content. The Botanical Garden's Palm House is under renovation, with parts closed at times. Sites that could not be read: SMK (title only), Christiansborg Palace (placeholder), Den Blå Planet, Hija de Sanchez, Alouette and Copenhagen Coffee Lab (certificate errors), Atelier September (403), Hart Bageri (TLS error), La Cabra, Prolog and Apollo Bar (429 rate limits), and Duck and Cover (DNS failure).",
    "sourceUrls": [
      "docs/content-research/copenhagen-2026-10-25.md",
      "docs/content-research/copenhagen-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Statens Museum for Kunst (SMK)",
        "url": "https://www.smk.dk/en/",
        "checkedOn": "2026-10-25",
        "reason": "Official page returned only its title; no address, hours or exhibitions readable"
      },
      {
        "name": "Christiansborg Palace",
        "url": "https://kongeligeslotte.dk/en/palaces-and-gardens/christiansborg-palace.html",
        "checkedOn": "2026-10-25",
        "reason": "Official royal palaces site is a 'coming soon' placeholder; no address or hours published"
      },
      {
        "name": "Den Blå Planet",
        "url": "https://www.denblaaplanet.dk/en/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname not in certificate); not bypassed"
      },
      {
        "name": "Hija de Sanchez",
        "url": "https://www.hijadesanchez.dk/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate expired; not bypassed"
      },
      {
        "name": "Atelier September",
        "url": "https://atelierseptember.dk/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Hart Bageri",
        "url": "https://www.hartbageri.com/locations",
        "checkedOn": "2026-10-25",
        "reason": "Homepage returned only its name; locations page failed with a TLS error"
      },
      {
        "name": "La Cabra",
        "url": "https://www.lacabra.dk/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on repeated attempts"
      },
      {
        "name": "Prolog Coffee Bar",
        "url": "https://prologcoffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on repeated attempts"
      },
      {
        "name": "Apollo Bar",
        "url": "https://www.apollobar.dk/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests"
      },
      {
        "name": "Duck and Cover",
        "url": "https://www.duckandcover.dk/",
        "checkedOn": "2026-10-25",
        "reason": "DNS lookup failed (EAI_AGAIN)"
      },
      {
        "name": "Alouette",
        "url": "https://www.alouette.dk/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname not in certificate); not bypassed"
      },
      {
        "name": "Copenhagen Coffee Lab",
        "url": "https://www.cphcoffeelab.dk/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname not in certificate); not bypassed"
      },
      {
        "name": "Alchemist",
        "url": "https://www.alchemist.dk/",
        "checkedOn": "2026-10-25",
        "reason": "Official homepage shows no address, opening days or dated content"
      },
      {
        "name": "Hahnemanns Køkken",
        "url": "https://www.hahnemannskoekken.dk/",
        "checkedOn": "2026-10-25",
        "reason": "Official site not found; tried domain is an unrelated recipe site"
      },
      {
        "name": "Cisternerne",
        "url": "https://frederiksbergmuseerne.dk/da/cisternerne//en",
        "checkedOn": "2026-10-25",
        "reason": "Redirected English page returned 404"
      },
      {
        "name": "Hotel d'Angleterre bars",
        "url": "https://www.dahotel.dk/",
        "checkedOn": "2026-10-25",
        "reason": "DNS lookup failed for tried domain"
      },
      {
        "name": "Lille Bakery",
        "url": "https://www.lillegrocer.dk/",
        "checkedOn": "2026-10-25",
        "reason": "Tried domain does not resolve; official site not found"
      },
      {
        "name": "A local market in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood food walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A signature meal from Denmark",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A cafe or bakery near A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A cooking or tasting experience",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A nearby day trip from Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local market in Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A food-focused walk through A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A signature dinner from Denmark",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A tasting or cooking experience",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood table away from the busiest sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A self-guided market walk in Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A low-cost local meal in A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free neighborhood wandering",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A public square or viewpoint near A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A casual cafe stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A market breakfast",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A destination-led dinner in Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A private food walk or cooking class",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A polished stay near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A special evening around A neighborhood food walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A private transfer for a day trip",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A tailored local experience",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A scenic outing built around A neighborhood food walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long local dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow morning in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A photo-friendly walk through Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A memorable day trip from Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "An easy first stop near Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A family-friendly market walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A food hall everyone can browse",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short neighborhood walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A low-pressure afternoon",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "An early visit to A local market in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Your main base in Copenhagen market or cafe",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A self-guided food walk through A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local class or tasting",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A people-watching break in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A flexible afternoon with one clear anchor",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A quieter side of A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local recommendation beyond the headline sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A less obvious side of Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A seasonal experience in Denmark",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A short detour beyond Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "An off-peak version of A local market in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A nearby area bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before A local market in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and a walk through A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual local lunch near Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market meal around A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Lunch between A local market in Copenhagen and A neighborhood food walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A long midday meal in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local dinner in Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local specialty from Denmark near A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A memorable table close to A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower final-night meal away from the busiest sights",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed night close to the stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A nearby area morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before A local market in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A regional sweet to take on the road",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Your main base in Copenhagen",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in A nearby area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood coffee stop in A flexible day-trip area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup before the next stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Tivoli Gardens": {
        "url": "https://www.tivoli.dk/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Programme lists dated autumn 2026 events, e.g. Halloween in Tivoli 2 October to 1 November and DM i Stand-Up 2026 on 27 October; footer \"© Tivoli 2026\"."
      },
      "Rundetaarn (The Round Tower)": {
        "url": "https://www.rundetaarn.dk/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions 'Light Echoes' (2 Oct to 3 Jan) and 'Ole Rømer and the Great Discovery'; observatory telescope evenings 5 Oct to 31 Mar. Adults 60 DKK, under 18 free; 'not well suited for wheelchairs and pushchairs'."
      },
      "Rosenborg Castle": {
        "url": "https://denkongeligesamling.dk/en/rosenborg-castle/plan-your-visit/opening-hours/",
        "sourceType": "operator's own site (The Royal Danish Collection)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published 2026 schedule: 'From 2 November to 23 December' Tue–Sun 10.00–16.00, Monday closed, plus a Christmas 2026 table. Online tickets save 10 kroner; no food or drink in the castle or Treasury."
      },
      "National Museum of Denmark": {
        "url": "https://nationalmuseet.dk/en/",
        "sourceType": "official public operator (National Museum of Denmark)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current special exhibitions 'The Viking sorceress', 'KA-CHING!' and 'Land Unknown' (no dates shown); adult tickets 150 DKK or 135 DKK online, valid one year; under 18 free."
      },
      "Ny Carlsberg Glyptotek": {
        "url": "https://www.glyptoteket.com/visit/opening-hours/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibition 'The Power of Fashion in the Roman Empire' October 1, 2026 to March 29, 2027; free admission the last Wednesday of each month; online tickets save 10%."
      },
      "Thorvaldsens Museum": {
        "url": "https://www.thorvaldsensmuseum.dk/en",
        "sourceType": "official public operator (City of Copenhagen museums)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "New exhibition 'Life, Longing & Landscape - Thorvaldsen's Painting Collection' (no dates shown); 'Free admission for all on Wednesdays'; adults DKK 110, under 18 free. Courtyard café temporarily closed for construction."
      },
      "Designmuseum Danmark": {
        "url": "https://designmuseum.dk/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Henrik Vibskov: The Exhibition' September 18, 2026 to February 21, 2027; Verner Panton centenary display; Café FORMAT open 'every day except Monday', no ticket needed."
      },
      "Kunsthal Charlottenborg": {
        "url": "https://kunsthalcharlottenborg.dk/en/visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Three exhibitions (Amalie Smith, Jochen Lempert, Som Supaparinya) running 26 September 2026 – 21 February 2027. Over 16: 95 DKK; free Wednesdays from 17.00."
      },
      "Copenhagen Contemporary": {
        "url": "https://copenhagencontemporary.org/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Camille Henrot 'Paper Planes' 05.06.26 – 31.12.26; Kengo Kuma 'Earth | Tree' 28.03.26 – 21.02.27; permanent James Turrell 'Aftershock'. Adults 140 DKK."
      },
      "Louisiana Museum of Modern Art": {
        "url": "https://louisiana.dk/en/plan-your-visit/opening-hours/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Tracey Emin 8 Oct 2026 to 18 Apr 2027; Remedios Varo 18 Sep 2026 to 10 Jan 2027. 'No advance reservation or time slot' needed; adults 145 DKK, under 18 free; ticket needed even for café, shop or sculpture park."
      },
      "Botanical Garden (Natural History Museum of Denmark)": {
        "url": "https://snm.dk/en/opening-hours",
        "sourceType": "official public operator (Natural History Museum of Denmark, University of Copenhagen)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Seasonal 2026 hours published; press releases dated 22.10.2026 and 02.10.2026. 'We are renovating the Palm House', so parts of it 'will be closed to visitors at times'."
      },
      "Copenhagen Zoo": {
        "url": "https://www.zoo.dk/en/opening-hours",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Opening-hours page lists October 25–31, 2026 as 9:00 AM - 5:00 PM daily; footer '© Zoologisk Have 2026'."
      },
      "Experimentarium": {
        "url": "https://www.experimentarium.dk/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Daily listings and '© 2026 Experimentarium'; online tickets 'Save 10%'. Interactive Film Theatre 'currently closed for renovation'."
      },
      "Torvehallerne": {
        "url": "https://torvehallernekbh.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Recurring Thursday market for small producers 13:00–19:00; risengrød on the 24th of each month through 24 November; dated October/November 2026 posts."
      },
      "Reffen": {
        "url": "https://reffen.dk/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'October is full of things to see, do and taste at Reffen, and we're open every day'; autumn 2026 events banner."
      },
      "GRØD (Torvehallerne)": {
        "url": "https://www.groed.com/restauranter/koebenhavn-torvehallerne",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch page lists current hours and delivery 'until 18:45'; porridge restaurant at the stall since spring 2013."
      },
      "Mad & Kaffe (Vesterbro)": {
        "url": "https://www.madogkaffe.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News dated October 2026 (fifth café opened 7 October in Aarhus) and August 2026 menu update; 'Vi holder altid pladser til dig, der dropper ind' (seats kept for drop-ins), booking recommended."
      },
      "Coffee Collective (Jægersborggade)": {
        "url": "https://coffeecollective.dk/pages/coffee-shop/jaeggersborggade",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch page with current hours; described as the company's 'very first coffee shop, now relocated to a new, larger space'. No dated content."
      },
      "Juno the Bakery": {
        "url": "https://www.junothebakery.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Page published 'Oct 21, 2026'; 'Since 2018', '8 years of service'."
      },
      "Andersen Bakery (Islands Brygge)": {
        "url": "https://andersenbakery.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current 'Åbningstider' listing with pickup orders possible; '© 2026' footer. No dated news."
      },
      "Restaurant Schønnemann": {
        "url": "https://www.restaurantschonnemann.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Christmas 2026 runs 12 November to 23 December 2026, with a Thursday–Saturday 'Julebord' 18:30–23:00; closed 24 December 2026 to 5 January 2027."
      },
      "Kødbyens Fiskebar": {
        "url": "https://fiskebaren.dk/kontakt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live 'Book bord' table booking and current hours; walk-ins can 'kom forbi og få en plads i baren'. No dated content."
      },
      "Barr": {
        "url": "https://www.restaurantbarr.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Book a table' via Tock; site images uploaded May–July 2026."
      },
      "Noma": {
        "url": "https://www.noma.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Founders' letter: 'This August, we are coming home' after an LA residency (March 11 to June 26, 2026); 'twelve seasons of Noma'; booking via Tock. Reopening date not stated exactly."
      },
      "Geranium": {
        "url": "https://www.geranium.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online booking via SevenRooms for 2–6 guests, up to '3 month in ahead', deposit 1500 DKK per guest. No 2026-dated content."
      },
      "Lidkoeb": {
        "url": "https://lidkoeb.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "September 2026 menus ('Lidkoeb-sept26-MAIN.pdf'); online reservations."
      },
      "Ruby": {
        "url": "https://rby.dk/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current hours and bookings contact; 'Ruby opened its doors on the 21st June in 2007'; minimum entry age 21. No 2026-dated content."
      },
      "Mikkeller Bar Viktoriagade": {
        "url": "https://www.mikkeller.com/locations/mikkeller-viktoriagade",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'the site of the very first Mikkeller Bar'; 'You will always be able to book a table', max party 10; live tap list with 'Recent activity' 18 hours ago."
      }
    }
  },
  "Madrid, Spain": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The Prado, CaixaForum Madrid and Confitería El Riojano returned HTTP 403, Hola Coffee returned HTTP 429, and Toma Café, Misión Café, 1862 Dry Bar, Casa Labra, Angelita, Moulin Chocolat, Panod, Panic, the Teleférico and the Museo Nacional de Ciencias Naturales failed on connection, certificate, DNS or server errors, so they are not included; none of these failures is evidence of closure. Sobrino de Botín's homepage was too large to read. Several confirmed places were published only partially: DiverXO and Corral de la Morería give no full weekly hours, Café Comercial publishes no hours, the Reina Sofía hours were not clearly labelled, and Chocolatería San Ginés gives inconsistent statements about 24-hour opening. Casa Lucio, Lhardy, Casa Alberto, Mercado de San Antón, Café de Oriente, Casa Dani and La Mallorquina showed current hours but little or no dated 2026 content, so they are rated medium confidence.",
    "sourceUrls": [
      "docs/content-research/madrid-2026-10-25.md",
      "docs/content-research/madrid-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Museo Nacional del Prado",
        "url": "https://www.museodelprado.es/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403 Forbidden on two pages; not bypassed. Fetch failure is not evidence of closure."
      },
      {
        "name": "Plaza Mayor",
        "checkedOn": "2026-10-25",
        "reason": "Public square; no operator page was read for it in this review."
      },
      {
        "name": "Sacha",
        "url": "https://www.restaurantesacha.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site shows only a phone number and booking anchor; no address or operating evidence."
      },
      {
        "name": "Toma Café",
        "url": "https://tomacafe.es/",
        "checkedOn": "2026-10-25",
        "reason": "Connection refused (ECONNREFUSED)."
      },
      {
        "name": "Sala de Despiece",
        "url": "https://www.saladedespiece.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official page returned only its title; no address or operating evidence."
      },
      {
        "name": "Bodega de la Ardosa",
        "url": "https://www.laardosa.es/",
        "checkedOn": "2026-10-25",
        "reason": "Official page returned no readable content."
      },
      {
        "name": "Angelita",
        "url": "https://angelitamadrid.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (ENOTFOUND) with or without www; no other official URL found."
      },
      {
        "name": "1862 Dry Bar",
        "url": "https://1862drybar.com/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname not in certificate); not bypassed."
      },
      {
        "name": "Moulin Chocolat",
        "url": "https://moulinchocolat.es/",
        "checkedOn": "2026-10-25",
        "reason": "Assumed domain did not resolve (ENOTFOUND); no official site found by search."
      },
      {
        "name": "Panod",
        "url": "https://panod.es/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 500."
      },
      {
        "name": "Acid Bakehouse",
        "url": "https://acid.cafe/",
        "checkedOn": "2026-10-25",
        "reason": "Domain acid.cafe showed unrelated content (\"build your machine\"); official site not confirmed."
      },
      {
        "name": "Hola Coffee",
        "url": "https://hola.coffee/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on repeated attempts."
      },
      {
        "name": "Misión Café",
        "url": "https://mision.cafe/",
        "checkedOn": "2026-10-25",
        "reason": "TLS error (TLSV1_ALERT_INTERNAL_ERROR); not bypassed."
      },
      {
        "name": "Sobrino de Botín",
        "url": "https://www.botin.es/",
        "checkedOn": "2026-10-25",
        "reason": "Homepage too large to read (content limit exceeded); reservations page returned 404."
      },
      {
        "name": "CaixaForum Madrid",
        "url": "https://caixaforum.org/es/madrid",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden."
      },
      {
        "name": "Museo Arqueológico Nacional",
        "url": "https://www.man.es/man/visita/horarios.html",
        "checkedOn": "2026-10-25",
        "reason": "Hours page text did not include address or hours in readable sections."
      },
      {
        "name": "Museo Nacional de Ciencias Naturales",
        "url": "https://www.mncn.csic.es/",
        "checkedOn": "2026-10-25",
        "reason": "Connection refused (ECONNREFUSED)."
      },
      {
        "name": "Museo Cerralbo",
        "url": "https://www.cultura.gob.es/mcerralbo/visita/horarios.html",
        "checkedOn": "2026-10-25",
        "reason": "Hours page returned 'Página no encontrada'."
      },
      {
        "name": "Viena Capellanes",
        "url": "https://www.vienacapellanes.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official page showed only a catering title; no shop address or hours."
      },
      {
        "name": "Horno San Onofre",
        "url": "https://www.hornosanonofre.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain shows a default hosting placeholder page."
      },
      {
        "name": "Confitería El Riojano",
        "url": "https://www.confiteriaelriojano.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden."
      },
      {
        "name": "Casa Labra",
        "url": "https://www.casalabra.es/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname not in certificate); not bypassed."
      },
      {
        "name": "Teleférico de Madrid",
        "url": "https://www.teleferico.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (ENOTFOUND)."
      },
      {
        "name": "Panic",
        "url": "https://panic.es/",
        "checkedOn": "2026-10-25",
        "reason": "Connection refused (ECONNREFUSED)."
      },
      {
        "name": "Prado and museum row",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Prado itself could not be read; Thyssen and Reina Sofía confirmed separately)"
      },
      {
        "name": "Retiro and city walking",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Jardines de El Buen Retiro confirmed separately)"
      },
      {
        "name": "Mercado food stops",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Free evening plaza wandering",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury Salamanca stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private art tour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Late dinner in Salesas",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset rooftop drink",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Easy tapas-and-churros day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum morning",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Literary Quarter coffee stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Tapas night in La Latina",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Old Madrid and one stronger dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Taberna crawl in La Latina",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Chamberí neighborhood stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Mercado de San Miguel style grazing",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Mercado de San Miguel confirmed separately)"
      }
    ],
    "placeSources": {
      "Palacio Real de Madrid": {
        "url": "https://tickets.patrimonionacional.es/es/tickets/palacio-real-de-madrid",
        "sourceType": "official public operator (Patrimonio Nacional)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Ticket page sells dated time slots and lists 2026 closures (1 Jan, 6 Jan, 1 May, 25 Dec all day; 24 and 31 Dec from 15:00). Notice for improvement works: \"se recomienda no traer mochilas, maletas, bolsos y paquetes de grandes dimensiones\"."
      },
      "Museo Nacional Centro de Arte Reina Sofía": {
        "url": "https://www.museoreinasofia.es/visita",
        "sourceType": "official public operator (national museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page lists 2026 exhibitions, including Andrea Canepa's \"Fardo\" (13 January 2026 to 1 January 2027) covering the Palacio de Cristal, which is \"temporarily closed\" for building improvements. General admission 12 €."
      },
      "Museo Nacional Thyssen-Bornemisza": {
        "url": "https://www.museothyssen.org/visita/horarios-tarifas",
        "sourceType": "official public operator (national museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists the exhibition \"El universo freudiano de Dalí\" with guided visits on 15 November 2026 and 17 January 2027, plus a free lecture on 3 November 2026 requiring reservation. Collection plus temporary exhibitions 14€."
      },
      "Museo Sorolla": {
        "url": "https://www.cultura.gob.es/msorolla/visita/horarios.html",
        "sourceType": "official public operator (Ministerio de Cultura)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours page says the museum opens from 15 October with \"Visita limitada al nuevo edificio de la ampliación\"; the Casa Museo is temporarily closed for rehabilitation. \"ENTRADA GRATUITA.\""
      },
      "Museo Lázaro Galdiano": {
        "url": "https://www.museolazarogaldiano.es/visita",
        "sourceType": "official public operator (Fundación Lázaro Galdiano)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page lists closures on 24, 25 and 31 December 2026; homepage lists 2026 programme including guided \"Paseos por la Colección\" through 30.12.2026. Cámara del Tesoro temporarily closed for inspection."
      },
      "Museo del Romanticismo": {
        "url": "https://www.cultura.gob.es/mromanticismo/visita/horariosytarifas.html",
        "sourceType": "official public operator (Ministerio de Cultura)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours page carries a 2026 notice (\"Acceso gratuito al museo hasta el 31 de octubre de 2026\") and lists 2026 free days; current exhibition \"Roberta Marrero. Yo soy la navaja y la herida\". Rooms XV-XXI closed for works."
      },
      "Museo del Ferrocarril": {
        "url": "https://www.museodelferrocarril.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News dated 08/10/2026: temporary exhibition \"El tren de la vida\" opened in Sala 3000; 21/10/2026 item on the Halloween experience \"El Museo Encantado\"."
      },
      "Jardines de El Buen Retiro": {
        "url": "https://www.madrid.es/portales/munimadrid/es/Jardines-de-El-Buen-Retiro/?vgnextfmt=default&vgnextoid=499561945d9ec210VgnVCM2000000c205a0aRCRD&vgnextchannel=38bb1914e7d4e210VgnVCM1000000b205a0aRCRD",
        "sourceType": "official public operator (Ayuntamiento de Madrid)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "City page links an adverse-weather protocol dated 20.06.2026; rowboats can be rented on the Estanque Grande, with the embarcadero reached from Plaza de la Independencia."
      },
      "Real Jardín Botánico": {
        "url": "https://www.rjb.csic.es/",
        "sourceType": "official public operator (CSIC)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage announces \"Semana de la Ciencia 2026\" (17-29 November) with free activities and limited places; lists exhibition \"No acabarán mis flores\"."
      },
      "Azotea del Círculo de Bellas Artes": {
        "url": "https://www.circulobellasartes.com/azotea/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Rooftop page sells tickets (normal €6, reduced €5) online at tickets.circulobellasartes.com; footer \"© 2026\". Ticket does not guarantee a place in the café-restaurant area."
      },
      "Mercado de San Miguel": {
        "url": "https://www.mercadodesanmiguel.es/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Posts dated 16 Sep 2026 (\"Una mesa para todos\"), 9 Jul 2026 and 22 Jun 2026 on events at the market."
      },
      "Mercado de San Antón": {
        "url": "https://www.mercadosananton.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage publishes current hours for market stalls, food stalls and restaurant; latest dated material is from 2025, no 2026 date seen."
      },
      "DiverXO": {
        "url": "https://www.diverxo.com/reservas",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live booking system: \"A new date opens at 00:00 each day, 90 days in advance\" with a €450 per person deposit; current tasting menu priced at 450€."
      },
      "Casa Lucio": {
        "url": "https://www.casalucio.es/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Footer \"© 2026\", images uploaded June and July 2026; reservations by phone, WhatsApp and online."
      },
      "Lhardy": {
        "url": "https://www.lhardy.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage publishes restaurant and shop hours and a booking link; no 2026 date seen."
      },
      "Taberna La Bola": {
        "url": "https://www.labola.es/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"156 Aniversario\" menu at 45,00€ per person and footer \"© 1870–2026\"; online and phone booking."
      },
      "Casa Alberto": {
        "url": "https://www.casaalberto.es/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage publishes current taberna and restaurant hours with \"Lunes cerrado\" and a booking page; no 2026 date seen (images from 2025)."
      },
      "Casa Dani (Mercado de la Paz)": {
        "url": "https://www.casadani.es/horario",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours page lists current branch schedules and notes that some locations close on Sundays and holidays; no 2026 date seen."
      },
      "Corral de la Morería": {
        "url": "https://www.corraldelamoreria.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live ticket booking for show-only and show-with-dinner options; \"No se admiten niños menores de 7 años\"; footer \"© 2026\"."
      },
      "Salmon Guru": {
        "url": "https://salmonguru.es/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Cocktail and food menu PDFs uploaded in 2026 and a 2026 press release for the Madrid 10th anniversary; \"TRABAJAMOS SIN RESERVAS\"."
      },
      "Museo Chicote": {
        "url": "https://www.museochicote.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Nuevo horario de apertura al público\" and booking rules (over-18s only; brunch with a 5 € per person guarantee); images uploaded August and September 2026."
      },
      "Chocolatería San Ginés": {
        "url": "https://chocolateriasangines.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage states \"ABIERTO TODOS LOS DÍAS\" and \"Abierto 24 horas todos los días del año\"; latest dated post is from 2019, so the hours claim is the only current notice."
      },
      "La Mallorquina (Puerta del Sol)": {
        "url": "https://www.pastelerialamallorquina.es/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage lists current shop hours and phone numbers; footer \"1984 - 2026\"."
      },
      "Federal Café (Comendadoras)": {
        "url": "https://federalcafe.es/madrid-comendadoras",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch page publishes current hours; group homepage links a \"CARTA 26\" menu."
      },
      "Café Comercial": {
        "url": "https://www.cafecomercialmadrid.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Menus uploaded in 2026 (group menu \"MenuGrupos2026.pdf\", October 2026) and footer \"Café Comercial Madrid 2026 ©\"; table reservations online or on 91 088 25 25."
      },
      "Café de Oriente": {
        "url": "https://www.cafedeoriente.es/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage publishes current hours and a reservations link; no 2026 date seen."
      }
    }
  },
  "San Francisco, United States": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability, and several operators note that hours can change for holidays and events. Some confirmed places showed no 2026-dated content and are rated medium (Plow, Tadich Grill, House of Prime Rib, Buena Vista Cafe, b. patisserie, the Ritual Coffee branches, Philz Coffee); the NPS Alcatraz pages were last updated in 2021. Hours were not published on the pages read for Outerlands, Golden Gate Park or the cable cars, and Philz showed same-day hours only. The Golden Gate Bridge site gives no street address. These sites could not be read: de Young and Exploratorium (403), Blue Bottle (403), Andytown, Equator and Four Barrel (429), Tosca Cafe (certificate error), Musée Mécanique (connection refused), La Taqueria and Zazie (domain not found), Asian Art Museum visit page (404) and City Lights (redirect). Sightglass and Swan Oyster Depot domains redirected to unrelated sites. None of these failures is evidence of closure.",
    "sourceUrls": [
      "docs/content-research/san-francisco-2026-10-25.md",
      "docs/content-research/san-francisco-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Golden Gate Bridge views",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Golden Gate Bridge confirmed separately)"
      },
      {
        "name": "Golden Gate views",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry Building and Embarcadero",
        "checkedOn": "2026-10-25",
        "reason": "generic combination; Ferry Building Marketplace confirmed separately"
      },
      {
        "name": "Ferry Building and one great dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry Building grazing",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Waterfront walking",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Mission burrito stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Golden Gate Park time",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Golden Gate Park confirmed separately)"
      },
      {
        "name": "Golden Gate Park morning",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private bay sail",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Tasting-menu night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury Nob Hill stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sausalito ferry moment",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset at Crissy Field",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "North Beach dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Pier 39 sea lions",
        "checkedOn": "2026-10-25",
        "reason": "generic phrasing; PIER 39 confirmed separately"
      },
      {
        "name": "Cable car ride",
        "checkedOn": "2026-10-25",
        "reason": "generic phrasing; Cable cars (Powell & Market) confirmed separately"
      },
      {
        "name": "Coffee in the Mission",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Bookshop and North Beach afternoon",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Japantown stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Twin Peaks at golden hour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Lands End walk",
        "url": "https://www.nps.gov/goga/planyourvisit/landsend.htm",
        "checkedOn": "2026-10-25",
        "reason": "NPS Lands End page gives no street address, no hours and was last updated September 23, 2021; no current operating evidence"
      },
      {
        "name": "La Taqueria",
        "url": "https://www.lataqueriasf.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site domain did not resolve (getaddrinfo ENOTFOUND); not evidence of closure"
      },
      {
        "name": "Swan Oyster Depot",
        "url": "https://www.swanoysterdepot.us/",
        "checkedOn": "2026-10-25",
        "reason": "the domain tried redirects to an unrelated site (oldpostofficedc.com); no official site found"
      },
      {
        "name": "Arsicault",
        "url": "https://www.arsicault-bakery.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site publishes no street address or hours on the pages read (only \"© 2026 Arsicault Bakery\")"
      },
      {
        "name": "Sightglass",
        "url": "https://sightglass.com/",
        "checkedOn": "2026-10-25",
        "reason": "sightglass.com redirected (301) to an unrelated site (ernstinstruments.com); locations page 404"
      },
      {
        "name": "Andytown Coffee Roasters",
        "url": "https://andytownsf.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 429 Too Many Requests on three attempts; not evidence of closure"
      },
      {
        "name": "Tartine",
        "url": "https://www.tartinebakery.com/",
        "checkedOn": "2026-10-25",
        "reason": "ambiguous name; confirmed as two branches, Tartine Bakery (Guerrero St) and Tartine Manufactory"
      },
      {
        "name": "de Young Museum",
        "url": "https://www.famsf.org/visit/de-young",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 403 Forbidden"
      },
      {
        "name": "Exploratorium",
        "url": "https://www.exploratorium.edu/visit",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 403 Forbidden"
      },
      {
        "name": "Asian Art Museum",
        "url": "https://asianart.org/visit/",
        "checkedOn": "2026-10-25",
        "reason": "visit page returned HTTP 404 Not Found"
      },
      {
        "name": "Cable Car Museum",
        "url": "https://www.cablecarmuseum.org/",
        "checkedOn": "2026-10-25",
        "reason": "site footer © 2004-2023 and contradictory \"Open Daily\" / \"Closed Mondays\" with no times; no current evidence"
      },
      {
        "name": "Coit Tower",
        "url": "https://sfrecpark.org/1027/Coit-Tower",
        "checkedOn": "2026-10-25",
        "reason": "SF Rec & Park URLs tried returned unrelated pages; no Coit Tower details read"
      },
      {
        "name": "City Lights Booksellers",
        "url": "https://citylights.com/visit/",
        "checkedOn": "2026-10-25",
        "reason": "visit page returned HTTP 307 redirect without readable content"
      },
      {
        "name": "Blue Bottle Coffee (Ferry Building)",
        "url": "https://bluebottlecoffee.com/us/eng/cafes/ferry-building",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 403 Forbidden"
      },
      {
        "name": "Zazie",
        "url": "https://www.zazierestaurant.com/",
        "checkedOn": "2026-10-25",
        "reason": "domain tried did not resolve (getaddrinfo ENOTFOUND)"
      },
      {
        "name": "Tosca Cafe",
        "url": "https://www.toscacafesf.com/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (hostname does not match certificate); not bypassed"
      },
      {
        "name": "Musée Mécanique",
        "url": "https://www.museemecaniquesf.com/",
        "checkedOn": "2026-10-25",
        "reason": "connection refused (ECONNREFUSED)"
      },
      {
        "name": "Mr. Holmes Bakehouse",
        "url": "https://www.mrholmesbakehouse.com/",
        "checkedOn": "2026-10-25",
        "reason": "site shows only a logo and cookie notice; no address or hours"
      },
      {
        "name": "Equator Coffees",
        "url": "https://www.equatorcoffees.com/pages/cafes",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 429 Too Many Requests"
      },
      {
        "name": "Four Barrel Coffee",
        "url": "https://www.fourbarrelcoffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned HTTP 429 Too Many Requests"
      }
    ],
    "placeSources": {
      "Alcatraz Island": {
        "url": "https://www.nps.gov/alca/planyourvisit/hours.htm",
        "sourceType": "official public operator (National Park Service); ferry concessioner page alcatrazcitycruises.com/tickets also read",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "NPS states \"Alcatraz is open every day except Christmas, Thanksgiving and New Year's day\" and \"frequently sells out in advance, as much as a month or more in summer and near holidays.\" The contracted ferry operator's ticket page offers live \"Check Availability\" booking from Pier 33. NPS page last updated 2021."
      },
      "Ferry Building Marketplace": {
        "url": "https://www.ferrybuildingmarketplace.com/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page lists building hours and year-round farmers market days (Tue, Thu 10am-2pm; Sat 8am-2pm); footer \"©2026\"."
      },
      "California Academy of Sciences": {
        "url": "https://www.calacademy.org/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current October event listings and ticketing; \"Advance purchase is recommended, especially for weekend or holiday visits.\" Thursday NightLife is 21+, \"6–10 p.m. most Thursdays\"; planetarium passes are first-come, first-served."
      },
      "SFMOMA": {
        "url": "https://www.sfmoma.org/visit/",
        "sourceType": "operator's own site (exhibitions page sfmoma.org/exhibitions also read)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions page lists \"Klee Behind the Mask\" (Aug 08, 2026–Apr 18, 2027), \"Feel the Beat: Dance in Photographs\" (May 16, 2026–Feb 28, 2027), \"New Work: Raven Chacon\" (October 24, 2026–November 7, 2027) and upcoming \"Sarah Sze: Forever is Composed of Nows\" opening November 21, 2026. Adults $30; age 18 and younger free."
      },
      "Golden Gate Bridge": {
        "url": "https://www.goldengate.org/bridge/visiting-the-bridge/bikes-pedestrians/",
        "sourceType": "official public operator (Golden Gate Bridge, Highway and Transportation District)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published sidewalk access schedule: pedestrians use the east sidewalk only, 5:00 am to 9:00 pm in Pacific Daylight Time and 5:00 am to 6:30 pm in Pacific Standard Time; footer \"© Copyright 2026\". Welcome Center \"Open daily from 9:00 a.m. to 6:00 p.m.\""
      },
      "Golden Gate Park": {
        "url": "https://sfrecpark.org/770/Coit-Tower",
        "sourceType": "official public operator (San Francisco Recreation & Parks)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "City park page with current late-October and early-November event listings."
      },
      "Japanese Tea Garden": {
        "url": "https://gggp.org/visit/admissions-hours/",
        "sourceType": "Gardens of Golden Gate Park (with San Francisco Recreation & Parks)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online timed ticketing; \"All visitors are required to reserve a time slot in advance.\" Free hour Monday, Wednesday and Friday 9am-10am; the Long Bridge is under renovation."
      },
      "Conservatory of Flowers": {
        "url": "https://gggp.org/visit/admissions-hours/",
        "sourceType": "Gardens of Golden Gate Park (with San Francisco Recreation & Parks)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Open six days a week. Closed Wednesdays.\" Free on the first Tuesday of the month; 2026 annual maintenance closure January 21–February 4, 2026 listed; free nightly Photosynthesis light show starting 30 minutes after sunset."
      },
      "San Francisco Botanical Garden": {
        "url": "https://gggp.org/visit/admissions-hours/",
        "sourceType": "Gardens of Golden Gate Park (with San Francisco Recreation & Parks)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Free daily 7:30–9am and the second Tuesday of every month; the GGGP site lists Lightscape at the Botanical Garden November 20 through January 3 for the 2026 winter season."
      },
      "Cable cars (Powell & Market)": {
        "url": "https://www.sfmta.com/getting-around/muni/cable-cars",
        "sourceType": "official public operator (SFMTA)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current service rules: to board at Powell & Market, Bay & Taylor or Hyde & Beach you must prepay \"8 a.m. to 8 p.m. daily\" via MuniMobile or Clipper; bicycles not permitted. No 2026-dated notice."
      },
      "PIER 39": {
        "url": "https://www.pier39.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published store, restaurant and attraction hours, a live Sea Lion Web Cam and footer \"©2026 PIER 39\"."
      },
      "Walt Disney Family Museum": {
        "url": "https://www.waltdisney.org/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page publishes current opening days and last-entry time and links to admission and ticketing; no exhibition dates read."
      },
      "Zuni Café": {
        "url": "https://zunicafe.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"2026 Holiday Closures\" list (including November 26, December 24 and 25, December 31); reservations accepted up to 60 days in advance by phone or OpenTable."
      },
      "State Bird Provisions": {
        "url": "https://statebirdsf.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"State Bird has received a Michelin One Star from 2014 to 2026\"; online reservations for 1 to 4 guests and listed upcoming closure dates (November 3, 6, 21, 26; December 9-11, 17, 24-25)."
      },
      "Foreign Cinema": {
        "url": "https://foreigncinema.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Walk-ins welcome, reservations are encouraged\"; \"Reserve up to 60 days in advance, on a daily basis at 12:00 pm PST\"; Thursday, November 26 \"closed for the holiday\"; films start \"at dusk in the outdoor courtyard.\""
      },
      "Tartine Bakery (Guerrero St)": {
        "url": "https://tartinebakery.com/san-francisco/bakery",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Menu PDF named \"Vertical_Menu_Guerrero_JUN_2026\"; holiday pastry and pie pre-orders open; \"We only close for Thanksgiving and Christmas day!\""
      },
      "Tartine Manufactory": {
        "url": "https://tartinebakery.com/san-francisco/manufactory",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "AM and dinner menus uploaded October 2026 (\"sample menus\"); dinner Wednesday–Sunday, \"Walk-ins are welcome, but reservations are recommended.\""
      },
      "Plow": {
        "url": "https://www.eatatplow.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published daily hours and wine dinner sign-up; no 2026 content (footer ©2025)."
      },
      "Outerlands": {
        "url": "https://outerlandssf.com/reservations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live Resy booking: \"Reservations are only for dinner, walk-ins are always welcome!\"; \"Friday breakfast/lunch, and weekend brunch are seated on a walk-in basis only, with a maximum party size of 8.\""
      },
      "Hog Island Oyster Co. (Ferry Building)": {
        "url": "https://www.hogislandoysters.com/locations/san-francisco",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Location page timestamped September 7, 2026; \"Casual Dine-In and Oysters To-Go | No Reservations.\""
      },
      "Tadich Grill": {
        "url": "https://www.tadichgrillsf.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"For your convenience we now take reservations\"; walk-in seating \"on a first-come, first-served basis.\" No 2026 content (©2020)."
      },
      "House of Prime Rib": {
        "url": "https://www.houseofprimerib.net/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dinner hours and phone/OpenTable reservations published; no 2026 content (footer ©2017)."
      },
      "Smuggler's Cove": {
        "url": "https://www.smugglerscovesf.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"2026 James Beard Foundation Nominee\" (Outstanding Bar); \"NOW OPEN SEVEN DAYS A WEEK!\""
      },
      "Trick Dog": {
        "url": "https://www.trickdogbar.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"NEW MENU IS LIVE! WACKY WRESTLERS OF TRICK DOG (WWTD)\"; \"reservations not required\", SevenRooms booking available."
      },
      "True Laurel": {
        "url": "https://www.truelaurelsf.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"#14 Best Bars in North America, 2026\" and \"Pinnacle Guide 2026\" noted; Tock reservations; weekend brunch 11am-3pm."
      },
      "Comstock Saloon": {
        "url": "https://www.comstocksaloon.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "October live-music calendar matching 2026 dates (e.g. Saturdays 10/24, 10/31); Toast dinner reservations, walk-ins welcome: \"DONT CALL JUST COME!\""
      },
      "Buena Vista Cafe": {
        "url": "https://www.thebuenavista.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published weekly hours with kitchen closing time; no 2026 content."
      },
      "b. patisserie": {
        "url": "https://www.bpatisserie.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours and closing days; no 2026 content."
      },
      "Ritual Coffee (Valencia St)": {
        "url": "https://ritualcoffee.com/location/mission/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Ritual on Valencia is now Ritual Coffee + General Store\"; published hours; homepage announces a newly opened FiDi café. Footer ©2025."
      },
      "Ritual Coffee (Hayes Valley)": {
        "url": "https://ritualcoffee.com/location/hayes-valley/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours on the branch page; footer ©2025."
      },
      "Philz Coffee (Noe Valley)": {
        "url": "https://www.philzcoffee.com/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Locations page shows live same-day hours \"Today's Hours: 6:00am - 4:30pm\"; no 2026 content."
      }
    }
  },
  "Dubai, United Arab Emirates": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several major sites could not be read automatically and were left out rather than bypassed: Burj Khalifa, At.mosphere, The Espresso Lab, Dubai Aquarium, Dubai Opera, SALT and Sky Views returned HTTP 403; the Dubai Culture museum sites (Etihad Museum, Al Shindagha) and Bageri Form and Arabian Tea House returned certificate or SSL errors; Atlantis Aquaventure timed out; Nightjar Coffee and Mirzam were rate-limited; Coca-Cola Arena sent a queue page. Museum of the Future says it is temporarily closed with no reopening date. Global Village, LEGOLAND Dubai, Souk Al Seef and The Dubai Mall published hours or seasons but no street address on the pages read. Some confirmed places are published only partly: Orfali Bros gives dinner days without times, Comptoir 102 shows no 2026-dated content, Jameel Arts Centre's hours conflict with its Tuesday closure, CÉ LA VI and Al Fanar give location descriptions rather than street addresses, and Alserkal Avenue lists entrances rather than a single address. No bakery could be confirmed, so the bakeries list is empty, and only one coffee roaster was confirmed. The total of 17 confirmed places is below the 25-35 target.",
    "sourceUrls": [
      "docs/content-research/dubai-2026-10-25.md",
      "docs/content-research/dubai-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Burj Khalifa (At the Top)",
        "url": "https://www.burjkhalifa.ae/en/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403 to automated reading; not bypassed"
      },
      {
        "name": "Museum of the Future",
        "url": "https://museumofthefuture.ae/en",
        "checkedOn": "2026-10-25",
        "reason": "Official site says \"temporarily closed as we prepare for our next chapter\"; no reopening date"
      },
      {
        "name": "Arabian Tea House",
        "url": "https://www.arabianteahouse.co/",
        "checkedOn": "2026-10-25",
        "reason": "arabianteahouse.net DNS failure; arabianteahouse.co certificate error; not bypassed"
      },
      {
        "name": "At.mosphere",
        "url": "https://www.atmosphereburjkhalifa.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403"
      },
      {
        "name": "Bounty Beets",
        "url": "https://www.bountybeets.com/",
        "checkedOn": "2026-10-25",
        "reason": "Fetch failed with no readable output"
      },
      {
        "name": "Gold on 27",
        "url": "https://www.goldon27.com/",
        "checkedOn": "2026-10-25",
        "reason": "goldon27.com refused connection; Jumeirah Burj Al Arab page readable portion gave no address, hours or 2026 content"
      },
      {
        "name": "Galaxy Bar",
        "url": "https://www.galaxybardubai.com/",
        "checkedOn": "2026-10-25",
        "reason": "No reachable official site (galaxybardubai.com and galaxybar.ae did not resolve)"
      },
      {
        "name": "Bageri Form",
        "url": "https://bageriform.com/",
        "checkedOn": "2026-10-25",
        "reason": "SSL error on official site; not bypassed"
      },
      {
        "name": "Birch Bakery",
        "url": "https://birchbakery.com/",
        "checkedOn": "2026-10-25",
        "reason": "Site found lists only Mukilteo, Washington, USA; no Dubai branch confirmed"
      },
      {
        "name": "Nightjar Coffee",
        "url": "https://nightjar.coffee/",
        "checkedOn": "2026-10-25",
        "reason": "Homepage gives no café address (only an Alserkal Avenue tag); find-us page 404; further fetches rate-limited (HTTP 429)"
      },
      {
        "name": "The Espresso Lab",
        "url": "https://theespressolab.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403"
      },
      {
        "name": "Dubai Aquarium & Underwater Zoo",
        "url": "https://www.thedubaiaquarium.com/",
        "checkedOn": "2026-10-25",
        "reason": "Aquarium site returned HTTP 403; Dubai Mall pages name it but give no address or hours"
      },
      {
        "name": "Atlantis Aquaventure",
        "url": "https://www.atlantis.com/dubai/aquaventure",
        "checkedOn": "2026-10-25",
        "reason": "Fetch timed out twice"
      },
      {
        "name": "The Dubai Mall / Dubai Fountain",
        "url": "https://www.thedubaimall.com/en/plan-your-visit/opening-hours",
        "checkedOn": "2026-10-25",
        "reason": "Official pages give mall hours but no address and no fountain show times"
      },
      {
        "name": "Dubai Opera",
        "url": "https://www.dubaiopera.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403"
      },
      {
        "name": "Global Village",
        "url": "https://www.globalvillage.ae/en/plan-your-visit",
        "checkedOn": "2026-10-25",
        "reason": "Season 31 (14 Oct 2026-May 2027) and hours published, but no street address on pages read"
      },
      {
        "name": "Etihad Museum / Al Shindagha Museum (Dubai Culture)",
        "url": "https://dubaiculture.gov.ae/en/Our-Places/Museums",
        "checkedOn": "2026-10-25",
        "reason": "Dubai Culture sites returned a certificate error; not bypassed"
      },
      {
        "name": "Coffee Museum",
        "url": "https://coffeemuseum.ae/",
        "checkedOn": "2026-10-25",
        "reason": "Homepage gives only \"Al Fahidi in Bur Dubai\"; contact page 404; no hours or current evidence"
      },
      {
        "name": "Souk Al Seef",
        "url": "https://soukalseef.ae/en/plan-your-visit",
        "checkedOn": "2026-10-25",
        "reason": "Hours published but no street address (location label only)"
      },
      {
        "name": "LEGOLAND Dubai",
        "url": "https://www.legoland.com/dubai/",
        "checkedOn": "2026-10-25",
        "reason": "2026 events and hours published but no address on pages read; directions page 404"
      },
      {
        "name": "Coca-Cola Arena",
        "url": "https://www.coca-cola-arena.com/",
        "checkedOn": "2026-10-25",
        "reason": "Redirected to a queue/bot-check page; not bypassed"
      },
      {
        "name": "Expo City Dubai (Terra)",
        "url": "https://www.expocitydubai.com/en/things-to-do/",
        "checkedOn": "2026-10-25",
        "reason": "No address or opening hours published on pages read; attraction pages 404"
      },
      {
        "name": "The View at The Palm",
        "url": "https://www.theviewpalm.ae/",
        "checkedOn": "2026-10-25",
        "reason": "Hours and prices published, but no address beyond \"Palm Jumeirah\""
      },
      {
        "name": "Kinoya",
        "url": "https://kinoya.ae/",
        "checkedOn": "2026-10-25",
        "reason": "Address and hours published, but no 2026 evidence and the page contains unrelated casino links; not relied on"
      },
      {
        "name": "Tom & Serg",
        "url": "https://eatx.com/tom-serg/",
        "checkedOn": "2026-10-25",
        "reason": "Operator page (EatX) gives hours but only a company office address, not the café's"
      },
      {
        "name": "The Sum of Us",
        "url": "https://eatx.com/the-sum-of-us/",
        "checkedOn": "2026-10-25",
        "reason": "Operator page (EatX) gives hours but only a company office address, not the café's"
      },
      {
        "name": "Lime Tree Café",
        "url": "https://www.thelimetreecafe.com/",
        "checkedOn": "2026-10-25",
        "reason": "Branches listed without street addresses; founding Jumeirah café \"Now closed in 2025\""
      },
      {
        "name": "Bait Maryam",
        "url": "https://www.baitmaryam.com/",
        "checkedOn": "2026-10-25",
        "reason": "No addresses or hours on official site"
      },
      {
        "name": "Mirzam Chocolate Makers",
        "url": "https://mirzam.com/",
        "checkedOn": "2026-10-25",
        "reason": "Rate-limited (HTTP 429) on every attempt"
      },
      {
        "name": "% Arabica",
        "url": "https://arabica.com/en/location/",
        "checkedOn": "2026-10-25",
        "reason": "Location page returned HTTP 418"
      },
      {
        "name": "SALT",
        "url": "https://www.find-salt.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403"
      },
      {
        "name": "Sky Views Dubai",
        "url": "https://www.skyviewsdubai.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official site returned HTTP 403"
      },
      {
        "name": "Amazónico Dubai",
        "url": "https://amazonicorestaurant.com/dubai/",
        "checkedOn": "2026-10-25",
        "reason": "No street address or opening hours on official page"
      },
      {
        "name": "PAUL (UAE)",
        "url": "https://www.paularabia.com/",
        "checkedOn": "2026-10-25",
        "reason": "Regional landing page lists no Dubai branch addresses or hours"
      },
      {
        "name": "Tashas",
        "url": "https://tashascafe.com/",
        "checkedOn": "2026-10-25",
        "reason": "Dubai branches named without addresses or hours"
      },
      {
        "name": "Brunch & Cake",
        "url": "https://brunchandcake.com/",
        "checkedOn": "2026-10-25",
        "reason": "Dubai branches named without addresses or hours"
      },
      {
        "name": "Café Bateel",
        "url": "https://bateel.com/",
        "checkedOn": "2026-10-25",
        "reason": "No branch addresses or hours on homepage"
      },
      {
        "name": "Jones the Grocer",
        "url": "https://www.jonesthegrocer.com/",
        "checkedOn": "2026-10-25",
        "reason": "No Dubai branch addresses or hours on homepage"
      },
      {
        "name": "Logma",
        "url": "https://logma.ae/",
        "checkedOn": "2026-10-25",
        "reason": "Official site shows only \"Under Construction\""
      },
      {
        "name": "Ripe Market",
        "url": "https://www.ripeme.com/",
        "checkedOn": "2026-10-25",
        "reason": "No Dubai market location, dates or hours on official site"
      },
      {
        "name": "Dubai Marina",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Old Dubai",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Dubai Fountain area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Abra ride in Old Dubai",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Public beach time",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Desert safari upgrade",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach club day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Marina evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Desert sunset",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and design stops",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Old Dubai wandering",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach and skyline day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Dubai Mall area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "One desert experience",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Al Seef and creek side",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunrise desert calm",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Paul Arabia-style outposts",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Dubai Frame": {
        "url": "https://www.dubaiframe.ae/en/plan-your-visit",
        "sourceType": "official public operator (Dubai Municipality)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current plan-your-visit page with live online ticketing at ticketingsales.dubaiframe.ae; adults AED 50, children (3-12) AED 20, under 3 free. Site footer says it is supervised by Dubai Municipality. The page footer is dated 2021; current operation rests on the live ticketing."
      },
      "Jameel Arts Centre": {
        "url": "https://www.jameelartscentre.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dated programme: Artist's Rooms (Walid Siti, Lulua Alyahya, Shezad Dawood) 20 September 2026-31 January 2027; Salah Elmur 31 October 2026-14 March 2027. \"open-access and free for all.\""
      },
      "Alserkal Avenue": {
        "url": "https://alserkal.online/opening-hours",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage runs \"weekends at alserkal\" for October 2026 and \"what the food by alserkal\" on 31 Oct-1 Nov. Individual venues set their own hours."
      },
      "Dubai Miracle Garden": {
        "url": "https://www.dubaimiraclegarden.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online tickets delivered as a WhatsApp QR code; a \"Right on Time\" concert listed for Saturday 21 November 2026; seasonal morning events October-November need separate event tickets."
      },
      "Dubai Safari Park": {
        "url": "https://www.dubaisafari.ae/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Season 8 opened 12 October 2026 and runs to 31 May 2027 (page \"LAST UPDATED: 1 October 2026\"); Saturday workshops for ages 6-12 on 31 October 2026. Safari Park Pass from AED 50."
      },
      "The Green Planet": {
        "url": "https://www.thegreenplanetdubai.com/en/parks-opening-hours",
        "sourceType": "operator's own site (Dubai Holding Entertainment)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live booking widget showing \"Sun 25 Oct 2026\", a Halloween banner and \"© 2026 Dubai Holding Entertainment\"."
      },
      "Zuma (DIFC)": {
        "url": "https://www.zumarestaurant.com/en/dubai",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bookings via SevenRooms; weekly Yashoku night brunch every Wednesday from 21:00 in the lounge; footer \"© Zuma 2026\"."
      },
      "Orfali Bros (Wasl 51 Mall)": {
        "url": "https://orfalibros.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current SevenRooms reservations and set menus: Aromas of Aleppo AED 295, The OG Menu AED 350, The Voyage Menu AED 795; \"© 2026 Orfali Bros\"."
      },
      "3 Fils (Jumeirah Fishing Harbour)": {
        "url": "https://3fils.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists itself at #17 on MENA's 50 Best Restaurants 2026; \"No reservations needed — just walk in and grab a seat.\""
      },
      "Trèsind Studio": {
        "url": "https://www.tresindstudio.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online reservations open with two seatings, \"6:00 PM | 9:15 PM\"; reservation policy linked."
      },
      "Al Fanar Seafood Market (Al Seef)": {
        "url": "https://www.alfanarrestaurant.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site states the Al Seef branch is in the MICHELIN Guide Dubai 2026 selection; current Pinktober offer."
      },
      "Al Fanar Restaurant & Cafe (Dubai Festival City)": {
        "url": "https://www.alfanarrestaurant.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch listed with current hours and phone; menu lists \"Emirati breakfast\"; current Pinktober offer."
      },
      "Comptoir 102": {
        "url": "https://comptoir102.com/pages/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Contact page hours notice \"We are open daily\"; restaurant menu dated Nov-2025 linked from the homepage. No 2026-dated content seen."
      },
      "RAW Coffee Company (Al Quoz)": {
        "url": "https://rawcoffeecompany.com/pages/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Roasts \"at our warehouse in Al Quoz\"; current coffee list includes a \"winner of Uganda Taste of Harvest 2026\"."
      },
      "Mimi Kakushi": {
        "url": "https://mimikakushi.ae/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "SevenRooms reservations; 2026-dated food, drinks and bar bites menus; Minami Jazz Nights promoted; \"© MIMI KAKUSHI, 2026\"."
      },
      "CÉ LA VI Dubai": {
        "url": "https://dxb.celavi.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026-dated menus (lunch set menu 2026.09.11); Halloween in the Club Lounge on Fri 30 and Sat 31 October."
      },
      "Honeycomb Hi-Fi": {
        "url": "https://www.honeycombhifi.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "SevenRooms reservations and WhatsApp booking; current event listings for October (year not stated in text)."
      }
    }
  },
  "Seoul, South Korea": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Palace opening hours for Gyeongbokgung, Changdeokgung and Deoksugung were not on the pages read, and neither were regular hours for Leeum Museum of Art or Seoul Arts Center; SEA LIFE COEX Aquarium showed only a same-day snapshot. Jungsik, Hadongkwan, 1914 Lounge & Bar and both Fritz Coffee branches publish addresses and hours or booking links but no dated 2026 content, so they are rated medium. Many input places could not be confirmed: Gwangjang Market, Tosokchon and Myeongdong Kyoja had certificate errors; Charles H and Anthracite returned 403; London Bagel Museum's domain did not resolve; Mingles and Lotte World returned no readable content; N Seoul Tower's pages had an encoding error; Bar Cham and Center Coffee have no official websites; and Alice Cheongdam, Maison M.O and Breadypost could not be identified. Coverage of bakeries and cocktail bars therefore relies on hotel venues.",
    "sourceUrls": [
      "docs/content-research/seoul-2026-10-25.md",
      "docs/content-research/seoul-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Hongdae",
        "checkedOn": "2026-10-25",
        "reason": "neighbourhood, not a single operated place"
      },
      {
        "name": "Bukchon Hanok Village",
        "checkedOn": "2026-10-25",
        "reason": "residential neighbourhood; no operator page read"
      },
      {
        "name": "Myeongdong",
        "checkedOn": "2026-10-25",
        "reason": "neighbourhood, not a single operated place"
      },
      {
        "name": "Han River",
        "url": "https://hangang.seoul.go.kr/",
        "checkedOn": "2026-10-25",
        "reason": "generic area; Hangang Parks site showed no address or dated content for a specific park"
      },
      {
        "name": "Mingles",
        "url": "https://www.restaurant-mingles.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned no readable content beyond the name"
      },
      {
        "name": "Tosokchon",
        "url": "https://www.tosokchon.co.kr/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (self-signed certificate)"
      },
      {
        "name": "Born & Bred",
        "url": "http://www.bandb.co.kr/kr/index.php",
        "checkedOn": "2026-10-25",
        "reason": "official site shows only a reservation link to a booking platform; no address or dated content"
      },
      {
        "name": "Lotte World",
        "url": "https://www.lotteworld.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned no readable content"
      },
      {
        "name": "Lotte World Tower Seoul Sky",
        "url": "https://seoulsky.lotteworld.com/en/main/index.do",
        "checkedOn": "2026-10-25",
        "reason": "official site returned no readable content"
      },
      {
        "name": "London Bagel Museum",
        "url": "https://www.londonbagelmuseum.com/",
        "checkedOn": "2026-10-25",
        "reason": "official domains did not resolve (DNS failure)"
      },
      {
        "name": "Cafe Onion",
        "url": "https://www.cafeonion.com/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed (socket closed)"
      },
      {
        "name": "Breadypost",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified during review"
      },
      {
        "name": "Gwangjang Market",
        "url": "https://www.kwangjangmarket.co.kr/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (self-signed certificate)"
      },
      {
        "name": "Myeongdong Kyoja",
        "url": "https://www.mdkj.co.kr/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (self-signed certificate)"
      },
      {
        "name": "Charles H",
        "url": "https://www.fourseasons.com/seoul/dining/lounges/charles-h/",
        "checkedOn": "2026-10-25",
        "reason": "official Four Seasons page returned 403 Forbidden"
      },
      {
        "name": "Bar Cham",
        "checkedOn": "2026-10-25",
        "reason": "no official website found; presence appears limited to social media"
      },
      {
        "name": "Alice Cheongdam",
        "checkedOn": "2026-10-25",
        "reason": "official website not identified (search unavailable during review)"
      },
      {
        "name": "Maison M.O",
        "checkedOn": "2026-10-25",
        "reason": "official website not identified during review"
      },
      {
        "name": "Tartine Seoul",
        "url": "https://www.tartinebakery.com/locations",
        "checkedOn": "2026-10-25",
        "reason": "no official Seoul page found; tartinebakery.com locations page returned 404"
      },
      {
        "name": "Center Coffee",
        "checkedOn": "2026-10-25",
        "reason": "no official website found"
      },
      {
        "name": "Anthracite",
        "url": "https://anthracitecoffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site returned 403 Forbidden"
      },
      {
        "name": "N Seoul Tower",
        "url": "https://www.nseoultower.co.kr/",
        "checkedOn": "2026-10-25",
        "reason": "pages garbled by character-encoding error; address and hours not readable"
      },
      {
        "name": "War Memorial of Korea",
        "url": "https://www.warmemo.or.kr/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (unable to verify the first certificate)"
      },
      {
        "name": "Dongdaemun Design Plaza",
        "url": "https://www.ddp.or.kr/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error (unable to verify the first certificate)"
      },
      {
        "name": "National Hangeul Museum",
        "url": "https://www.hangeul.go.kr/",
        "checkedOn": "2026-10-25",
        "reason": "official site says closed until the second half of 2028 (\"2028년 하반기까지 휴관합니다\")"
      },
      {
        "name": "Seoul Museum of History",
        "url": "https://museum.seoul.go.kr/",
        "checkedOn": "2026-10-25",
        "reason": "site redirected to a sign-in (SSO) page; no readable content"
      },
      {
        "name": "National Folk Museum of Korea",
        "url": "https://www.nfm.go.kr/",
        "checkedOn": "2026-10-25",
        "reason": "site returned \"잘못된 접근입니다\" (improper access) message"
      },
      {
        "name": "Amorepacific Museum of Art",
        "url": "https://apma.amorepacific.com/",
        "checkedOn": "2026-10-25",
        "reason": "site returned no readable content"
      },
      {
        "name": "Seoul Grand Park",
        "url": "https://grandpark.seoul.go.kr/",
        "checkedOn": "2026-10-25",
        "reason": "site returned no readable content"
      },
      {
        "name": "Seoul Forest",
        "url": "https://seoulforest.or.kr/",
        "checkedOn": "2026-10-25",
        "reason": "conservancy site states its activities ended 31 December 2021; no current park page read"
      },
      {
        "name": "Namsangol Hanok Village",
        "url": "https://www.hanokmaeul.or.kr/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (DNS failure)"
      },
      {
        "name": "Noryangjin Fisheries Wholesale Market",
        "url": "https://www.susanijang.co.kr/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (DNS failure)"
      },
      {
        "name": "The Hyundai Seoul",
        "url": "https://thehyundaiseoul.ehyundai.com/",
        "checkedOn": "2026-10-25",
        "reason": "address shown but no hours or dated current content"
      },
      {
        "name": "Lotte Hotel Seoul dining",
        "url": "https://www.lottehotel.com/seoul-hotel/en/dining.html",
        "checkedOn": "2026-10-25",
        "reason": "bot check (\"Pardon Our Interruption\"); not bypassed"
      },
      {
        "name": "Banyan Tree Club & Spa Seoul dining",
        "url": "https://www.banyantree.com/south-korea/seoul/dining",
        "checkedOn": "2026-10-25",
        "reason": "403 Forbidden"
      },
      {
        "name": "Blue Bottle Coffee (Seoul)",
        "url": "https://bluebottlecoffee.com/kr/ko/cafes",
        "checkedOn": "2026-10-25",
        "reason": "Korean site refused connection; global cafes page 403 Forbidden"
      },
      {
        "name": "Isaac Toast",
        "url": "https://www.isaac-toast.co.kr/",
        "checkedOn": "2026-10-25",
        "reason": "site has 2026 notices but no individual branch address"
      },
      {
        "name": "Terarosa (Seoul)",
        "url": "https://www.terarosa.com/store/",
        "checkedOn": "2026-10-25",
        "reason": "no Seoul branch address or hours readable"
      },
      {
        "name": "Coffee Libre",
        "url": "https://www.coffeelibre.kr/",
        "checkedOn": "2026-10-25",
        "reason": "no cafe address or hours on site; only Paju company address"
      },
      {
        "name": "Namusairo",
        "url": "https://www.namusairo.com/",
        "checkedOn": "2026-10-25",
        "reason": "no cafe address or hours on page read"
      },
      {
        "name": "Paul Bassett",
        "url": "https://www.baristapaulbassett.co.kr/",
        "checkedOn": "2026-10-25",
        "reason": "site returned no readable content"
      },
      {
        "name": "Onjium",
        "url": "https://www.onjium.org/",
        "checkedOn": "2026-10-25",
        "reason": "site describes a research institute, not a restaurant; no 2026 content"
      },
      {
        "name": "Josun Deli The Boutique (Josun Palace)",
        "url": "https://jpg.josunhotel.com/dining/JosunDeli.do",
        "checkedOn": "2026-10-25",
        "reason": "page describes gift products, not a bakery; no dated content"
      },
      {
        "name": "Street food markets",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Palace grounds",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Neighborhood night walks",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Fine Korean tasting menu",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private spa jjimjilbang day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "High-end shopping and hotel stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Namsan evening",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Han River picnic",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Cafe and rooftop date",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Aquarium stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Cafe day in Seongsu",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market lunch",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Neighborhood night wandering",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ikseondong alleys",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Late-night convenience culture",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "K-beauty and cafe hopping",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Jungsik-style fine dining",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Jungsik itself was checked separately)"
      }
    ],
    "placeSources": {
      "Gyeongbokgung": {
        "url": "https://royal.khs.go.kr/ROYAL/contents/menuInfo-gbg.do?grpCode=gbg",
        "sourceType": "official public operator (Korea Heritage Service, Gyeongbokgung Palace Management Office)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Notice list includes \"[행사] 2026년 흥복전 왕실문화 아카데미 개최\" (2026.10.13) and \"2026년 10~11월 경복궁, 칠궁 관람 운영 안내\"; access to the Geunjeongjeon platform (월대) is restricted until 31 October."
      },
      "Changdeokgung": {
        "url": "https://royal.khs.go.kr/ROYAL/contents/menuInfo-cdg.do?grpCode=cdg",
        "sourceType": "official public operator (Korea Heritage Service, Changdeokgung Palace Management Office)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026.10.12 notice for the inner-palace event \"왕과 왕비의 생활공간, 창덕궁 내전에 들다\" (10.20–10.31); 2026.10.20 notice of fire-suppression works restricting access to the Gwolnaegaksa area."
      },
      "Deoksugung": {
        "url": "https://royal.khs.go.kr/ROYAL/contents/menuInfo-dsg.do?grpCode=dsg",
        "sourceType": "official public operator (Korea Heritage Service, Deoksugung Palace Management Office)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026.09.29 \"10월 덕수궁 관람 안내\"; 2026.10.12 notice \"돈덕전 관람중지 안내('26. 10. 13. ~ 11. 1.)\" (Dondeokjeon closed to 1 November); outer wall works 9.21–11.19."
      },
      "National Museum of Korea": {
        "url": "https://www.museum.go.kr/site/eng/home",
        "sourceType": "official public operator (National Museum of Korea)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions include \"Tour of National Treasures: Masterpieces Across the Country\" (May 19 – Nov 29, 2026) and \"Kim Jeonghui and His Companions\" (Aug 11 – Nov 22, 2026)."
      },
      "MMCA Seoul": {
        "url": "https://www.mmca.go.kr/eng/visitingInfo/seoulInfo.do",
        "sourceType": "official public operator (National Museum of Modern and Contemporary Art, Korea)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage lists Seoul exhibitions \"Do Ho Suh\" (2026-08-27 to 2027-02-09) and \"Korea Artist Prize 2026\" (2026-07-24 to 2026-12-06)."
      },
      "Leeum Museum of Art": {
        "url": "https://www.leeumhoam.org/leeum",
        "sourceType": "operator's own site (Leeum Museum of Art)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions \"구정아: 우스모스\" (Sept 5 – Dec 27, 2026) and \"다른 공간 안으로: 여성 작가들의 공감각적 환경 1956-1976\" (May 5 – Nov 29, 2026)."
      },
      "Seoul Museum of Art (Seosomun)": {
        "url": "https://sema.seoul.go.kr/",
        "sourceType": "official public operator (Seoul Metropolitan Government, Seoul Museum of Art)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibition \"가나아트컬렉션 《기술의 저변: 경계에 선 장면들》\" runs 2026.04.16 – 2026.11.22."
      },
      "National Palace Museum of Korea": {
        "url": "https://www.gogung.go.kr/",
        "sourceType": "official public operator (National Palace Museum of Korea)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage carries 2026-dated news notices and permanent halls: \"상설 전시실은 3개의 층, 6개의 전시실로 구성되어 있습니다.\""
      },
      "Seodaemun Prison History Hall": {
        "url": "https://sphh.sscmc.or.kr/",
        "sourceType": "official public operator (Seodaemun-gu Urban Management Corporation)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026-10-15 notice on winter (Nov–Feb) operating hours; 2026-10-01 notice for a night programme."
      },
      "Seoul Museum of Craft Art": {
        "url": "https://craftmuseum.seoul.go.kr/",
        "sourceType": "official public operator (Seoul Metropolitan Government, Seoul Museum of Craft Art)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions include \"에퀴녹스: 추분_춘분\" (2026.09.22 – 2027.03.07) and \"공예동행@쇼윈도 #6. 실루엣 Silhouette\" (2026.10.21 – 2026.12.06); night opening notice for 9.15–11.30."
      },
      "Seoul Arts Center": {
        "url": "https://www.sac.or.kr/",
        "sourceType": "operator's own site (Seoul Arts Center)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Programme lists \"2026 예술의전당 토월정통연극 〈유리동물원〉\" (10.17–11.22, CJ Towol Theater) and \"달리·Differently·Dali\" (10.30–11.15, Hangaram Art Museum Gallery 7)."
      },
      "Seoul Children's Grand Park": {
        "url": "https://www.sisul.or.kr/open_content/childrenpark/",
        "sourceType": "official public operator (Seoul Facilities Corporation)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026.09.14 notice for the autumn festival \"단풍 물든 클래식\" (9.19–11.7); botanical garden operations suspended from 27 May 2026 until \"2027년 하반기(예정)\"."
      },
      "Seoul Botanic Park": {
        "url": "https://botanicpark.seoul.go.kr/",
        "sourceType": "official public operator (Seoul Metropolitan Government)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026.09.30 \"10월 운영 및 휴관 안내\" (closed on 26 October among other October dates); 2026.10.13 notice on exhibition-hall operations during an international symposium."
      },
      "SEA LIFE COEX Aquarium": {
        "url": "https://www.visitsealife.com/coex-seoul/",
        "sourceType": "operator's own site (SEA LIFE / Merlin Entertainments)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live online ticket booking with same-day hours shown: \"금일 운영시간: 10:00 - 20:00 (마지막 입장 19:00)\"; online buyers can skip the queue."
      },
      "Starfield Library (Starfield COEX Mall)": {
        "url": "https://www.starfield.co.kr/coexmall/main.do",
        "sourceType": "operator's own site (Starfield COEX Mall)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"10.1(목) - 10.31(토) 10월의 별마당도서관 소식\" and a November kids' programme banner \"11.14(토), 11.28(토)\"."
      },
      "La Yeon (The Shilla Seoul)": {
        "url": "https://www.shillahotels.com/en/theshilla/seoul/dining/restaurant/layeon.do",
        "sourceType": "operator's own site (The Shilla Seoul)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Deposit and cancellation policy \"updated effective September 10, 2026\"; bookable with KRW 50,000 per person deposit; downloadable lunch and dinner menus."
      },
      "Continental (The Shilla Seoul)": {
        "url": "https://www.shillahotels.com/en/theshilla/seoul/dining/restaurant/continental.do",
        "sourceType": "operator's own site (The Shilla Seoul)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Reservations open on the first day of the month two months ahead; policy updated \"effective September 10, 2026\"."
      },
      "The Parkview (The Shilla Seoul)": {
        "url": "https://www.shillahotels.com/en/theshilla/seoul/dining/restaurant/theParkview.do",
        "sourceType": "operator's own site (The Shilla Seoul)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes an October–December schedule; deposit policy updated \"effective September 10, 2026\"."
      },
      "The Library (The Shilla Seoul)": {
        "url": "https://www.shillahotels.com/en/theshilla/seoul/dining/loungeBar/theLibrary.do",
        "sourceType": "operator's own site (The Shilla Seoul)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lounge and bar with \"views of Namsan and the gentle presence of live music\"; reservation policy \"updated effective September 10, 2026\"."
      },
      "The Distillers Library (The Shilla Seoul)": {
        "url": "https://www.shillahotels.com/en/theshilla/seoul/dining/loungeBar/theDistillersLibrary.do",
        "sourceType": "operator's own site (The Shilla Seoul)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Premium whisky bar page with reservations line \"+82-2-2230-3388~9\"; footer cites \"2026 Forbes Travel Guide\"."
      },
      "Pastry Boutique (The Shilla Seoul)": {
        "url": "https://www.shillahotels.com/en/theshilla/seoul/dining/bakery/pastryBoutique.do",
        "sourceType": "operator's own site (The Shilla Seoul)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Cakes and pastries; links a \"Pastry Boutique Chuseok Gift Collection\" brochure and allergen information; footer cites \"2026 Forbes Travel Guide\"."
      },
      "1914 Lounge & Bar (Josun Palace)": {
        "url": "https://jpg.josunhotel.com/dining/1914.do",
        "sourceType": "operator's own site (Josun Hotels & Resorts)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published hours and rules: \"BAR 입장 및 주문은 18시부터 가능합니다\"; dress code \"CASUAL\". No dated 2026 content seen."
      },
      "Jungsik": {
        "url": "https://www.jungsik.kr/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live \"온라인 예약 / Online Reservation\" link plus phone +82 2 517 4654 and reservation@jungsik.kr. No dated 2026 content seen."
      },
      "Hadongkwan (Myeongdong)": {
        "url": "https://www.hadongkwan.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Branch hours table for the Myeongdong main branch (7:00–16:00, closed Sundays) and gomtang described as the main dish. No dated 2026 content seen."
      },
      "Fritz Coffee (Dohwa)": {
        "url": "https://www.fritz.co.kr/store/detail.html?product_no=2243&cate_no=125&display_group=1",
        "sourceType": "operator's own site (Fritz Coffee Company)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Listed as the first branch on the current store page with published hours. No explicitly dated 2026 content."
      },
      "Fritz Coffee (Wonseo)": {
        "url": "https://www.fritz.co.kr/store/detail.html?product_no=2242&cate_no=125&display_group=1",
        "sourceType": "operator's own site (Fritz Coffee Company)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Listed on the current store page with published daily hours. No explicitly dated 2026 content."
      }
    }
  },
  "Bangkok, Thailand": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several input places could not be checked: Wat Arun, Jay Fai, Here Hai, Som Tam Nua, Teens of Thailand and Conkey's had no official website identified. Gaggan Anand, Kay's Boutique Breakfast, Landhaus Bakery and Eric Kayser's guessed domains did not resolve. Rocket Coffeebar, Factory Coffee and Nana Coffee Roasters failed or rate-limited, and the Bamboo Bar page showed only navigation. Tropic City's own site says it has closed. BACC, the Siam Society, The Peninsula, Banyan Tree, Four Seasons and Capella returned 403. Some places are published only partially: Bangkok National Museum, ICONSIAM, One Bangkok, Sorn, Le Du, Mezzaluna and Sky Bar had no readable weekly hours. nahm and SEA LIFE gave a building, not a street address. The Grand Palace, Le Du, Vesper and Asiatique pages carried no 2026-dated content.",
    "sourceUrls": [
      "docs/content-research/bangkok-2026-10-25.md",
      "docs/content-research/bangkok-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Grand Palace area",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Grand Palace itself checked separately)"
      },
      {
        "name": "Chao Phraya Riverside",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Street food hopping",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Temple visits",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal or river ferry rides",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop dining",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private longtail canal tour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury spa ritual",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Riverside dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop cocktails",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Night market wandering",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "River boat rides",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Chatuchak snack adventure",
        "url": "https://www.chatuchakmarket.org/opening-times/",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place; chatuchakmarket.org does not identify itself as the market operator and links to a tour-booking partner, so not used as evidence"
      },
      {
        "name": "Street food crawl",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Temple morning",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Cafe day in Ari",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Riverside and street food",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Train market style outing",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Hidden canal neighborhoods",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Talad Noi",
        "checkedOn": "2026-10-25",
        "reason": "neighbourhood with no operator website; Sarnies & Friends in Talat Noi confirmed instead"
      },
      {
        "name": "Wat Arun",
        "checkedOn": "2026-10-25",
        "reason": "no official temple website identified; not checked"
      },
      {
        "name": "Wat Pho",
        "url": "https://www.watpho.com/en/",
        "checkedOn": "2026-10-25",
        "reason": "official site read (2026 news present) but no address, hours or ticket details found in the first 200,000 characters of the page"
      },
      {
        "name": "Jay Fai",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified; social media not accepted as evidence"
      },
      {
        "name": "Gaggan Anand",
        "url": "https://www.gaggananand.com/",
        "checkedOn": "2026-10-25",
        "reason": "official domain did not resolve (getaddrinfo ENOTFOUND)"
      },
      {
        "name": "Kay's Boutique Breakfast",
        "url": "https://www.kaysbkk.com/",
        "checkedOn": "2026-10-25",
        "reason": "guessed domain did not resolve and no official site identified (search unavailable)"
      },
      {
        "name": "Rocket Coffeebar",
        "url": "https://www.rocketcoffeebar.com/",
        "checkedOn": "2026-10-25",
        "reason": "fetch failed twice (socket closed)"
      },
      {
        "name": "Here Hai",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified"
      },
      {
        "name": "Som Tam Nua",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified"
      },
      {
        "name": "Teens of Thailand",
        "checkedOn": "2026-10-25",
        "reason": "no official website identified"
      },
      {
        "name": "Tropic City",
        "url": "https://www.tropiccitybkk.com/",
        "checkedOn": "2026-10-25",
        "reason": "closed: own site says \"Tropic City is now closed\""
      },
      {
        "name": "Bamboo Bar (Mandarin Oriental)",
        "url": "https://www.mandarinoriental.com/en/bangkok/chao-phraya-river/dine/the-bamboo-bar",
        "checkedOn": "2026-10-25",
        "reason": "official page returned only navigation; no address, hours or operating evidence readable"
      },
      {
        "name": "Le Normandie (Mandarin Oriental)",
        "url": "https://www.mandarinoriental.com/en/bangkok/chao-phraya-river/dine/le-normandie",
        "checkedOn": "2026-10-25",
        "reason": "official page truncated to navigation; only a booking link readable"
      },
      {
        "name": "Conkey's",
        "url": "https://www.conkeys.com/",
        "checkedOn": "2026-10-25",
        "reason": "conkeys.com redirects to an unrelated outdoor company; no official bakery website identified"
      },
      {
        "name": "Landhaus Bakery",
        "url": "https://www.landhausbakery.com/",
        "checkedOn": "2026-10-25",
        "reason": "guessed official domain did not resolve"
      },
      {
        "name": "Eric Kayser Bangkok",
        "url": "https://www.maisonkayser.co.th/",
        "checkedOn": "2026-10-25",
        "reason": "guessed official domain did not resolve"
      },
      {
        "name": "Factory Coffee",
        "url": "https://www.factorybkk.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on repeated attempts"
      },
      {
        "name": "Nana Coffee Roasters",
        "url": "https://www.nanacoffeeroasters.com/pages/our-locations",
        "checkedOn": "2026-10-25",
        "reason": "homepage lists no Bangkok address; locations page returned HTTP 429"
      },
      {
        "name": "Phil Coffee",
        "url": "https://www.phil.coffee/",
        "checkedOn": "2026-10-25",
        "reason": "domain is a parked registrar page"
      },
      {
        "name": "Museum Siam",
        "url": "https://www.museumsiam.org/",
        "checkedOn": "2026-10-25",
        "reason": "only a splash page readable; no address, hours or exhibitions"
      },
      {
        "name": "Bangkok Art and Culture Centre",
        "url": "https://www.bacc.or.th/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Err",
        "url": "https://www.errbkk.com/",
        "checkedOn": "2026-10-25",
        "reason": "domain now shows unrelated gambling spam"
      },
      {
        "name": "The Peninsula Bangkok dining",
        "url": "https://www.peninsula.com/en/bangkok/hotel-fine-dining",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Kamthieng House (Siam Society)",
        "url": "https://www.siam.org/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Vertigo and Moon Bar (Banyan Tree)",
        "url": "https://www.banyantree.com/thailand/bangkok/dining/vertigo-and-moon-bar",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "BKK Social Club (Four Seasons)",
        "url": "https://www.fourseasons.com/bangkok/dining/lounges/bkk-social-club/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Capella Bangkok dining",
        "url": "https://www.capellahotels.com/en/capella-bangkok/dining",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Lumphini Park",
        "url": "https://lumpinipark.com/",
        "checkedOn": "2026-10-25",
        "reason": "lumpinipark.com states it is \"Not affiliated with the Bangkok Metropolitan Administration\"; not an official source"
      },
      {
        "name": "Safari World",
        "url": "https://ticket.safariworld.com/?openExternalBrowser=1",
        "checkedOn": "2026-10-25",
        "reason": "ticket site gives hours but no address and shows © 2024"
      },
      {
        "name": "Pacamara Coffee",
        "url": "https://www.pacamaracoffee.com/contact",
        "checkedOn": "2026-10-25",
        "reason": "site lists only the head office, no café branch addresses"
      },
      {
        "name": "Rosewood Bangkok restaurants",
        "url": "https://www.rosewoodhotels.com/en/bangkok/dining",
        "checkedOn": "2026-10-25",
        "reason": "no hours or dated content for individual venues"
      },
      {
        "name": "Potong",
        "url": "https://www.restaurantpotong.com/",
        "checkedOn": "2026-10-25",
        "reason": "page content unreadable (image data only)"
      },
      {
        "name": "Paste",
        "url": "https://www.pastebangkok.com/",
        "checkedOn": "2026-10-25",
        "reason": "no address or hours on the page read"
      },
      {
        "name": "Blue Elephant",
        "url": "https://www.blue-elephant.com/bangkok/",
        "checkedOn": "2026-10-25",
        "reason": "certificate error"
      },
      {
        "name": "Siam Paragon",
        "url": "https://www.siamparagon.co.th/",
        "checkedOn": "2026-10-25",
        "reason": "no address on the page read; covered via SEA LIFE Bangkok"
      },
      {
        "name": "Emsphere",
        "url": "https://www.emsphere.co.th/",
        "checkedOn": "2026-10-25",
        "reason": "no address or hours on the page read"
      }
    ],
    "placeSources": {
      "Grand Palace": {
        "url": "https://www.royalgrandpalace.th/en/home",
        "sourceType": "official public operator (Bureau of the Royal Household)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current visitor notice: \"Tickets sold from 8:30 AM - 3:30 PM and cost 500 baht\". No 2026-dated item on the page; the footer reads \"© 2021\"."
      },
      "Queen Sirikit Museum of Textiles": {
        "url": "https://www.qsmtthailand.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibition \"Royal Court Textiles of Siam\", Gallery 3–4, \"From July 30, 2024 Until April 30, 2027\". \"Some exhibitions and events carry a separate\" charge."
      },
      "Bangkok National Museum": {
        "url": "https://www.finearts.go.th/museumbangkok",
        "sourceType": "official public operator (Fine Arts Department)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "An October 2569 (2026) opening-service calendar was posted on 1 Oct 2026, and an article was posted on 15 Oct 2026."
      },
      "Jim Thompson House": {
        "url": "https://www.jimthompsonhouse.org/",
        "sourceType": "operator's own site (The James H. W. Thompson Foundation)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Ticketing notice: \"Online ticket sales will be available on September 8, 2026\"; adults 250 baht, ages 10–21 150 baht with ID, under-10s free with an adult. \"customers are not allowed to enter the house without a guide\"."
      },
      "Jim Thompson Art Center": {
        "url": "https://www.jimthompsonartcenter.org/",
        "sourceType": "operator's own site (The James H. W. Thompson Foundation)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibition \"And Still, Another After\", 10 October 2026 to 29 March 2027."
      },
      "MOCA Bangkok": {
        "url": "https://www.mocabangkok.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions posted in 2026 including \"Front & Back: The Art of the Steal\" (posted Sept 30, 2026). General admission adult 400 baht, student 120 baht; free for under-13s and over-60s with ID; special exhibitions not included."
      },
      "Mahanakhon SkyWalk": {
        "url": "https://www.kingpowermahanakhon.co.th/",
        "sourceType": "operator's own site (King Power Mahanakhon)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Ticket range \"THB 500 - THB 1,200\", price varies by time; articles dated September 2026 on the site."
      },
      "SEA LIFE Bangkok (Siam Paragon)": {
        "url": "https://www.visitsealife.com/bangkok/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Family bundle bookable for visits \"ตั้งแต่วันที่ 1 ถึง 31 ตุลาคม 2569\" (1–31 October 2026); online tickets from 449 baht; advance booking only through the official website."
      },
      "ICONSIAM": {
        "url": "https://www.iconsiam.com/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"The ICONIC Multimedia Water Features Show\" listed to 31 Dec 2026; a pet-care programme runs to 6 Dec 2026. Lists SookSiam among its experiences."
      },
      "Asiatique The Riverfront": {
        "url": "https://www.asiatiquethailand.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours notice: \"Every day from 11:00 - 00:00 hrs\"; phone line staffed 16:00–22:00. No 2026-dated item found."
      },
      "One Bangkok": {
        "url": "https://www.onebangkok.com/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibition \"Fortune Teller\" by Julie Stephen Chheng, 2 Oct to 15 Nov 2026; \"One Oktoberfest 2026\", 28 Oct to 1 Nov, One Bangkok Park."
      },
      "Warehouse 30": {
        "url": "https://www.warehouse30.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "What's on lists \"JUMBLE BANGKOK × BETTERCODE ART SHOW 2026\" and the group exhibition \"Cellulose II: Wood, Wood You?\"."
      },
      "Thipsamai (Pratoopee)": {
        "url": "https://www.thipsamai.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current pad thai menu (Basic, Superb, with fresh prawns) and 2026-dated (2569 BE) notices on the site; menu items and prices vary by branch."
      },
      "nahm (COMO Metropolitan Bangkok)": {
        "url": "https://www.comohotels.com/nahm-bangkok",
        "sourceType": "operator's own site (COMO Hotels and Resorts)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "A \"Taste of COMO\" evening with Chef Pim Techamuanvivit on \"November 13th 2026\"; booking via OpenTable, phone or WhatsApp; daily degustation menu."
      },
      "Bo.lan": {
        "url": "https://www.bolan.co.th/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Set lunch and dinner menus; booking through TableCheck or +66 2 260 2962; dietary needs \"กรุณาแจ้งล่วงหน้า\" (notify in advance). 2026-dated event content on the site."
      },
      "Sorn": {
        "url": "https://www.sornfinesouthern.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Seasonal Menu on selected dates: \"October 2026: 19–22 and 26–28\", \"November 2026: 16–19 and 23–26\"; reservations via TableCheck or email."
      },
      "Le Du": {
        "url": "https://www.ledubkk.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online reservations; \"4-course or 6-course tasting menu\", and \"We require 6-course tasting menu for a group above 5 persons\". Footer reads © 2023; no 2026 content."
      },
      "Mezzaluna (lebua, State Tower)": {
        "url": "https://lebua.com/restaurants/mezzaluna/",
        "sourceType": "operator's own site (lebua Hotels & Resorts)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Collaboration \"The Willow & The Moon\" on 13–14 November 2026; TableCheck booking with a deposit, free changes up to 72 hours before. \"Collared shirts and long trousers are required\" for men; children 7 and above."
      },
      "Sky Bar (lebua, State Tower)": {
        "url": "https://lebua.com/restaurants/sky-bar/",
        "sourceType": "operator's own site (lebua Hotels & Resorts)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Sky Bar and all other bars welcome walk-in only\"; smart casual, no athletic wear, swimwear, sleeveless shirts for men or flip-flops; \"children aged 7 and above are welcome when accompanied by an adult\". Site posts dated October 2026."
      },
      "Vesper": {
        "url": "https://www.vesperbar.co/hours",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hours page with drinks menu PDF linked; \"Last order is at 1:30 AM\". No 2026-dated item."
      },
      "The Siam": {
        "url": "https://www.thesiamhotel.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Loy Krathong on \"Tuesday, 24 November 2026\" from 18:00 at The Pier and Chon Lawn, 10% early-bird for bookings by 19 November 2026; October 2026 roundup. Venues include Chon Thai Restaurant and Deco Bar & Bistro."
      },
      "Sarnies Bangkok (Charoen Krung 44)": {
        "url": "https://sarnies.com/concept/sarnies-bangkok",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current priced menu, e.g. \"Tom yum eggs benedict\" ฿420, \"Fry-up\" ฿480; evening menu from 17:00. Footer © 2026."
      },
      "Sarnies Sourdough (Charoen Krung 42/1)": {
        "url": "https://sarnies.com/concept/sarnies-sourdough",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Sourdough loaves baked in-house daily, pizzas in the evening, coffee roasted in-house; \"Chilli jam eggs benedict\" ฿400. Footer © 2026."
      },
      "Sarnies & Friends (Talat Noi)": {
        "url": "https://sarnies.com/concept/sarnies-friends",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Breakfast \"from 08:00, Tuesday to Sunday\"; menu incl. \"Mala egg benedict\" ฿210. Footer © 2026."
      },
      "Sarnies Sukhumvit (Soi 37)": {
        "url": "https://sarnies.com/concept/sarnies-sukhumvit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current priced menu, e.g. \"Mabo Shakshuka\" ฿380; about 3 minutes' walk from BTS Phrom Phong. Footer © 2026."
      },
      "Holey Artisan Bakery (Soi 31)": {
        "url": "https://holeyartisanbakery.com/locations/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Locations page lists four Bangkok branches with addresses; homepage footer © 2026."
      }
    }
  },
  "Venice, Italy": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several civic museum homepages showed only that day's hours, not a weekly schedule. Basilica di San Marco hours sit on an external ticketing site that was not read. Caffè Florian, Al Covo, Trattoria alla Madonna and Experimental Cocktail Club Venice had no 2026-dated item and are rated medium confidence. Fondazione Querini Stampalia says its new website is still under construction. No dedicated bakery could be confirmed, so the bakery list uses Caffè Florian's pastry menu. These sites could not be read: Palazzo Grassi, Fondazione Cini, Torrefazione Cannaregio, Caffè Lavena and Ristorante Local (403 or fetch error), Ristorante Quadri and Majer (429), the Basilica dei Frari visit pages (404 or login screen), Il Mercante (expired certificate) and the City of Venice Rialto Market page (empty).",
    "sourceUrls": [
      "docs/content-research/venice-2026-10-25.md",
      "docs/content-research/venice-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "St. Mark's Square",
        "checkedOn": "2026-10-25",
        "reason": "public square with no operator website to confirm against; covered via Basilica di San Marco, Palazzo Ducale, Museo Correr and Torre dell'Orologio"
      },
      {
        "name": "Grand Canal",
        "checkedOn": "2026-10-25",
        "reason": "waterway, not a place with an operator website"
      },
      {
        "name": "Rialto Market",
        "url": "https://www.comune.venezia.it/it/content/mercato-rialto",
        "checkedOn": "2026-10-25",
        "reason": "City of Venice page returned no readable content"
      },
      {
        "name": "a cicchetti crawl or lagoon-side dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "San Marco local table",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Venice signature dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided San Marco walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Dorsoduro public viewpoint",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market or picnic near Cannaregio",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for St. Mark's Square",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a quiet vaporetto ride at dusk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Destination dinner near Cannaregio",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset around Grand Canal",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "San Marco dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Family-friendly St. Mark's Square",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Easy outing around Dorsoduro",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near Cannaregio",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Early visit to St. Mark's Square",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "San Marco cafe or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Dorsoduro route",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Dorsoduro at a quieter hour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Cannaregio local rhythm",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near San Marco",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Dorsoduro bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before St. Mark's Square",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a cicchetti crawl or lagoon-side lunch",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual lunch near Grand Canal",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local stop around Cannaregio",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Evening table in San Marco",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near San Marco",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around Dorsoduro",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near Rialto Market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near San Marco",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Dorsoduro morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before St. Mark's Square",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near San Marco",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in Dorsoduro",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup near Cannaregio",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Basilica dei Frari",
        "url": "https://www.basilicadeifrari.it/",
        "checkedOn": "2026-10-25",
        "reason": "homepage gave address (S. Polo 3072) but no operating evidence; hours page 404 and English page showed 'Content is protected' login screen"
      },
      {
        "name": "Palazzo Grassi / Punta della Dogana",
        "url": "https://www.palazzograssi.it/en/",
        "checkedOn": "2026-10-25",
        "reason": "official site palazzograssi.it could not be fetched; pinaultcollection.com listed exhibitions but no addresses or hours"
      },
      {
        "name": "Ca' d'Oro (Galleria Giorgio Franchetti)",
        "url": "https://www.cadoro.org/",
        "checkedOn": "2026-10-25",
        "reason": "official site lists no museum address or hours; latest exhibition ended 6 January 2026"
      },
      {
        "name": "Museo del Vetro (Murano)",
        "url": "https://museovetro.visitmuve.it/",
        "checkedOn": "2026-10-25",
        "reason": "homepage gave no address, hours or exhibition dates"
      },
      {
        "name": "Museo del Merletto (Burano)",
        "url": "https://museomerletto.visitmuve.it/",
        "checkedOn": "2026-10-25",
        "reason": "homepage gave no address, hours or exhibition dates"
      },
      {
        "name": "Fondazione Giorgio Cini (San Giorgio Maggiore)",
        "url": "https://www.cini.it/en/",
        "checkedOn": "2026-10-25",
        "reason": "403 Forbidden"
      },
      {
        "name": "Ristorante Quadri",
        "url": "https://www.alajmo.it/pages/homepage-ristorante-quadri",
        "checkedOn": "2026-10-25",
        "reason": "429 Too Many Requests on repeated attempts"
      },
      {
        "name": "Harry's Bar",
        "url": "https://www.harrysbarvenezia.com/",
        "checkedOn": "2026-10-25",
        "reason": "harrysbarvenezia.com redirects to an unrelated site (wulfandlamb.com); cipriani.com page 404"
      },
      {
        "name": "Belmond Hotel Cipriani bars",
        "url": "https://www.belmond.com/hotels/europe/italy/venice/belmond-hotel-cipriani/",
        "checkedOn": "2026-10-25",
        "reason": "official site says the hotel is closed for the 2026 season and reopens 1 June 2027"
      },
      {
        "name": "Bar Longhi (The Gritti Palace)",
        "url": "https://www.thegrittipalace.com/",
        "checkedOn": "2026-10-25",
        "reason": "official site redirects to marriott.com, which returned 403 Forbidden"
      },
      {
        "name": "Skyline Rooftop Bar",
        "url": "https://www.skylinebarvenice.com/",
        "checkedOn": "2026-10-25",
        "reason": "domain redirects to an unrelated photography site"
      },
      {
        "name": "Terrazza Danieli",
        "url": "https://www.terrazzadanieli.com/",
        "checkedOn": "2026-10-25",
        "reason": "page returned no readable content"
      },
      {
        "name": "Il Mercante",
        "url": "https://www.ilmercantevenezia.com/",
        "checkedOn": "2026-10-25",
        "reason": "certificate has expired"
      },
      {
        "name": "Aman Venice (The Bar)",
        "url": "https://www.aman.com/hotels/aman-venice",
        "checkedOn": "2026-10-25",
        "reason": "no hours and no dated or bar-specific booking information on the page read"
      },
      {
        "name": "Hotel Londra Palace (LPV Bar)",
        "url": "https://www.londrapalace.com/",
        "checkedOn": "2026-10-25",
        "reason": "no bar hours and no 2026 content; booking shown is for the hotel"
      },
      {
        "name": "Torrefazione Cannaregio",
        "url": "https://www.torrefazionecannaregio.it/",
        "checkedOn": "2026-10-25",
        "reason": "403 Forbidden"
      },
      {
        "name": "Caffè Lavena",
        "url": "https://www.lavena.it/",
        "checkedOn": "2026-10-25",
        "reason": "403 Forbidden"
      },
      {
        "name": "Caffè del Doge",
        "url": "https://www.caffedeldoge.com/",
        "checkedOn": "2026-10-25",
        "reason": "only the registered office address; no shop address, hours or current content"
      },
      {
        "name": "Rosa Salva",
        "url": "https://www.rosasalva.it/",
        "checkedOn": "2026-10-25",
        "reason": "only the registered office address; no branch address, hours or 2026 content; branches page 404"
      },
      {
        "name": "Majer",
        "url": "https://www.majer.it/",
        "checkedOn": "2026-10-25",
        "reason": "homepage named shops without addresses or hours; later attempts returned 429 Too Many Requests"
      },
      {
        "name": "Pasticceria Dal Mas",
        "url": "https://www.dalmaspasticceria.it/",
        "checkedOn": "2026-10-25",
        "reason": "address on site (Rio Terà Lista di Spagna 149/150) but no hours, menu or 2026 content"
      },
      {
        "name": "Pasticceria Marchini Time",
        "url": "https://www.marchinitime.it/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (ENOTFOUND)"
      },
      {
        "name": "Gelateria Nico",
        "url": "https://www.gelaterianico.com/",
        "checkedOn": "2026-10-25",
        "reason": "latest dated content is a November 2024 hours notice; no current evidence"
      },
      {
        "name": "Suso gelateria",
        "url": "https://www.suso.biz/",
        "checkedOn": "2026-10-25",
        "reason": "suso.biz is an unrelated site"
      },
      {
        "name": "Osteria Bancogiro",
        "url": "https://www.osteriabancogiro.it/",
        "checkedOn": "2026-10-25",
        "reason": "address on site (Campo S. Giacometto, S. Polo 122) but no hours, booking or 2026 content"
      },
      {
        "name": "Osteria alle Testiere",
        "url": "https://www.osteriaalletestiere.it/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (ENOTFOUND)"
      },
      {
        "name": "Ristorante Local",
        "url": "https://www.ristorantelocal.com/",
        "checkedOn": "2026-10-25",
        "reason": "403 Forbidden"
      },
      {
        "name": "Osteria da Fiore",
        "url": "https://www.dafiore.net/",
        "checkedOn": "2026-10-25",
        "reason": "dafiore.net is now an unrelated food blog"
      },
      {
        "name": "Ristorante Riviera",
        "url": "https://www.ristoranteriviera.it/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (ENOTFOUND)"
      },
      {
        "name": "Taverna La Fenice",
        "url": "https://www.tavernalafenice.com/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (ENOTFOUND)"
      },
      {
        "name": "Giardini Reali",
        "url": "https://www.giardinirealivenezia.it/",
        "checkedOn": "2026-10-25",
        "reason": "domain did not resolve (ENOTFOUND)"
      }
    ],
    "placeSources": {
      "Basilica di San Marco": {
        "url": "https://www.basilicasanmarco.it/news/",
        "sourceType": "operator's own site (Procuratoria di San Marco)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online ticketing for the Basilica, Pala d'Oro, Museo and Loggia dei Cavalli, Campanile and 'Visite serali' (evening visits); news items dated 12/10/2026."
      },
      "Palazzo Ducale": {
        "url": "https://palazzoducale.visitmuve.it/informazioni-pratiche/",
        "sourceType": "official public operator (Fondazione Musei Civici di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Event 'Ospiti a Palazzo' runs 22 October 2026 to 23 March 2027; homepage notice 'Biglietti senza fascia oraria'."
      },
      "Museo Correr": {
        "url": "https://correr.visitmuve.it/",
        "sourceType": "official public operator (Fondazione Musei Civici di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions 'Bizhan Bassiri' (27 February-22 November 2026) and 'Spiral Economy. Charrière and Canova' (30 April-22 November 2026); the 'Sale Reali' route is 'solo su prenotazione'."
      },
      "Torre dell'Orologio": {
        "url": "https://torreorologio.visitmuve.it/en/pianifica-la-tua-visita",
        "sourceType": "official public operator (Fondazione Musei Civici di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Visits available upon prior booking, with specialized guide'; published weekly tour timetable in Italian, English and French, meeting at the Correr ticket office."
      },
      "Gallerie dell'Accademia": {
        "url": "https://www.gallerieaccademia.it/",
        "sourceType": "official public operator (Italian Ministry of Culture museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Leiko Ikemura, 'TransLucent — La forma della luce', 'fino al 22 novembre'; news dated 29 September 2026 on the return to view of the Miracoli della Vera Croce."
      },
      "Peggy Guggenheim Collection": {
        "url": "https://www.guggenheim-venice.it/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Upcoming exhibition 'Fucina degli Angeli: Peggy Guggenheim and 20th-Century Artistic Glass', 14 November 2026-29 March 2027; tickets 'online or at the museum's ticket office'."
      },
      "Ca' Pesaro": {
        "url": "https://capesaro.visitmuve.it/",
        "sourceType": "official public operator (Fondazione Musei Civici di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Jenny Saville a Ca' Pesaro' 28 March-22 November 2026 and 'Gianmaria Potenza. Io, Venezia' 3 October-22 November 2026; 'Apertura prolungata fino alle 20.00 dal 20 al 22 novembre 2026'."
      },
      "Palazzo Mocenigo": {
        "url": "https://mocenigo.visitmuve.it/",
        "sourceType": "official public operator (Fondazione Musei Civici di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'LE TARBOUCHE' to 8 November 2026, 'Le sete di Lucio Andrich' to 11 November 2026 and 'Un merletto per Venezia 2026' to 6 January 2027; notice 'Restauro in corso' (details not shown)."
      },
      "Museo di Storia Naturale": {
        "url": "https://msn.visitmuve.it/",
        "sourceType": "official public operator (Fondazione Musei Civici di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Dietro le quinte 2026', 15 March-15 November 2026, listed as in progress."
      },
      "Museo Fortuny": {
        "url": "https://fortuny.visitmuve.it/",
        "sourceType": "official public operator (Fondazione Musei Civici di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Erwin Wurm. Dreamers' 6 May-22 November 2026; 'Apertura speciale fino alle 20.00 dal 20 al 22 novembre 2026'."
      },
      "Fondazione Querini Stampalia": {
        "url": "https://www.querinistampalia.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Luca Rento. Prima che tutto svanisca' 25.09.26-17.01.27; 'Pellestrina isola sottile' 24.09.26-06.11.26. Site notes it is still under construction."
      },
      "Cafè Mariona (Querini Stampalia)": {
        "url": "https://www.querinistampalia.org/",
        "sourceType": "operator's own site (Fondazione Querini Stampalia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Caffetteria listed with current hours on the foundation's 2026 homepage alongside dated 2026 exhibitions."
      },
      "Scuola Grande di San Rocco": {
        "url": "https://www.scuolagrandesanrocco.org/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Published daily hours and admission notice ('Il contributo di ingresso è destinato al restauro e alla conservazione del patrimonio artistico'); footer '© 2026'."
      },
      "Teatro La Fenice": {
        "url": "https://www.teatrolafenice.it/en/",
        "sourceType": "operator's own site (Fondazione Teatro La Fenice)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Season calendar: 'Fedora' opens the opera season at La Fenice 13-22 November 2026; opening concerts 28-29 November 2026."
      },
      "Biennale Arte 2026 (Giardini and Arsenale)": {
        "url": "https://www.labiennale.org/en/art/2026/information",
        "sourceType": "operator's own site (La Biennale di Venezia)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "61st International Art Exhibition 'In Minor Keys', 9 May-22 November 2026; tickets sold online with reservation."
      },
      "Caffè Florian": {
        "url": "https://www.caffeflorian.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Concert booking ('Book your place for a unique experience of music and history') and a linked menu covering breakfast, afternoon tea and sweet and savoury dishes; no 2026-dated item found."
      },
      "Gran Caffè Quadri": {
        "url": "https://www.alajmo.it/pages/homepage-grancaffe-quadri",
        "sourceType": "operator's own site (Alajmo)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Booking by phone, email and 'PRENOTA' page; menu file for autumn 2026 and cocktail list for spring 2026; 'NATALE 2026' section."
      },
      "Trattoria Antiche Carampane": {
        "url": "https://www.antichecarampane.com/it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online booking; cancellations free until 12:00 on the day, otherwise €35 per cover; first sitting at 19:30 runs until 21:30; footer '© 2026'."
      },
      "Ristorante Al Covo": {
        "url": "https://www.ristorantealcovo.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Online 'Prenota' booking and published service times; no 2026-dated item found."
      },
      "Trattoria alla Madonna": {
        "url": "https://www.ristoranteallamadonna.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Prenota' booking link and 'Chiuso il mercoledì'; footer dated 2022, no 2026 content."
      },
      "Cantina Do Spade": {
        "url": "https://www.cantinadospade.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "'Prenota un tavolo' booking page; footer '© 2026 Cantina do Spade SRL'."
      },
      "Venissa (Mazzorbo)": {
        "url": "https://www.venissa.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Separate online booking for the restaurant and the osteria; 2026 yoga programme and an October 2026 osteria menu."
      },
      "Trattoria Da Romano (Burano)": {
        "url": "https://www.daromano.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Booking form on the 'Prenota' page and a 2026 news post ('Accogliere ospiti è sempre parte del nostro lavoro')."
      },
      "Experimental Cocktail Club Venice (Il Palazzo Experimental)": {
        "url": "https://www.experimentalgroup.com/venice/il-palazzo-experimental",
        "sourceType": "operator's own site (Experimental Group)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bar described as 'a lounge hidden away from the crowds'; hotel and Adriatica restaurant booking live; footer 'ALL RIGHTS RESERVED 2026'."
      }
    }
  },
  "Sydney, Australia": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several sites could not be read: BridgeClimb, Hyde Park Barracks and the Waverley Council coastal-walk page (HTTP 403), Cantina OK!, The Baxter Inn and Edition Coffee Roasters (certificate errors), Reuben Hills and Mecca Coffee (rate-limited), and Taronga Zoo, MCA, the State Library, Mr Wong and Totti's (no readable content); none of these failures indicates closure. SEA LIFE Sydney, Sydney Tower Eye, PS40, Paramount Coffee Project and The Rocks published no street address. Hours were not published for the Opera House, Rockpool, BridgeMuseum and Single O, Sydney Observatory gave days but no times, and Skittle Lane's King Street listing omits Thursday. Several venues (Saint Peter, Aria, Maybe Sammy, Bourke Street Bakery) showed current hours or booking pages but no dated 2026 text.",
    "sourceUrls": [
      "docs/content-research/sydney-2026-10-25.md",
      "docs/content-research/sydney-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Quay",
        "url": "https://finkgroup.com.au/a-farewell-to-quay/",
        "checkedOn": "2026-10-25",
        "reason": "Closed: operator says \"On 15 February 2026, Quay served its final guests and closed its doors.\""
      },
      {
        "name": "Taronga Zoo",
        "url": "https://taronga.org.au/sydney-zoo",
        "checkedOn": "2026-10-25",
        "reason": "Official pages showed Address and Opening Hours headings with no readable content; ticket page gives prices only, no address"
      },
      {
        "name": "Bondi to Coogee walk",
        "url": "https://www.waverley.nsw.gov.au/recreation/beaches_and_coast/coastal_walk",
        "checkedOn": "2026-10-25",
        "reason": "Council page (Waverley) returned HTTP 403; not verified"
      },
      {
        "name": "Bronte pool stop",
        "url": "https://www.waverley.nsw.gov.au/recreation/beaches_and_coast/coastal_walk",
        "checkedOn": "2026-10-25",
        "reason": "Council page (Waverley) returned HTTP 403; not verified"
      },
      {
        "name": "The Rocks",
        "url": "https://www.therocks.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official precinct site gives no street address (area description only)"
      },
      {
        "name": "Manly ferry day",
        "url": "https://transportnsw.info/routes/details/sydney-ferries/f1/",
        "checkedOn": "2026-10-25",
        "reason": "Transport for NSW F1 page returned no readable route content"
      },
      {
        "name": "Cantina OK!",
        "url": "https://www.cantinaok.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (hostname mismatch); not bypassed"
      },
      {
        "name": "The Baxter Inn",
        "url": "https://www.thebaxterinn.com/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (expired certificate); not bypassed"
      },
      {
        "name": "Lode Pies & Pastries",
        "url": "https://lodepies.com/",
        "checkedOn": "2026-10-25",
        "reason": "lodepiesandpastries.com did not resolve (DNS); lodepies.com returned only a title, no address or hours"
      },
      {
        "name": "Edition Coffee Roasters",
        "url": "https://editioncoffeeroasters.com/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (self-signed certificate); not bypassed"
      },
      {
        "name": "Paramount Coffee Project",
        "url": "https://www.paramountcoffeeproject.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Site gives only \"Surry hills\", no street address; contact page 404"
      },
      {
        "name": "bills (Darlinghurst)",
        "url": "https://bills.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Temporarily closed for repairs since 5 October; operator says reopening late November"
      },
      {
        "name": "BridgeClimb",
        "url": "https://www.bridgeclimb.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Hyde Park Barracks",
        "url": "https://mhnsw.au/visit-us/hyde-park-barracks/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden"
      },
      {
        "name": "Museum of Contemporary Art Australia",
        "url": "https://www.mca.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Pages returned only a title, no readable content (opening-hours URL 404)"
      },
      {
        "name": "SEA LIFE Sydney Aquarium",
        "url": "https://www.visitsealife.com/sydney/",
        "checkedOn": "2026-10-25",
        "reason": "Operator page gives no street address (Darling Harbour only); getting-here page 404"
      },
      {
        "name": "Sydney Tower Eye",
        "url": "https://www.sydneytowereye.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "Operator page gives no street address; location page 404"
      },
      {
        "name": "Powerhouse Ultimo",
        "url": "https://www.powerhouse.com.au/visit",
        "checkedOn": "2026-10-25",
        "reason": "\"Temporarily Closed for Heritage Revitalisation\" with no reopening date"
      },
      {
        "name": "State Library of NSW",
        "url": "https://www.sl.nsw.gov.au/visit",
        "checkedOn": "2026-10-25",
        "reason": "Page returned no readable content"
      },
      {
        "name": "Mr Wong",
        "url": "https://www.merivale.com/venues/mrwong",
        "checkedOn": "2026-10-25",
        "reason": "Merivale page returned no readable content"
      },
      {
        "name": "Totti's (Bondi)",
        "url": "https://www.merivale.com/venues/totti-s-bondi",
        "checkedOn": "2026-10-25",
        "reason": "Merivale page returned no readable content"
      },
      {
        "name": "Hubert",
        "url": "https://www.hubertrestaurant.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain did not resolve (DNS)"
      },
      {
        "name": "Bulletin Place",
        "url": "https://www.bulletinplace.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain redirects to an expired-domain listing; no official page found"
      },
      {
        "name": "PS40",
        "url": "https://www.ps40bar.com/",
        "checkedOn": "2026-10-25",
        "reason": "Site gives hours but no street address"
      },
      {
        "name": "Reuben Hills",
        "url": "https://reubenhills.com.au/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests on repeated attempts"
      },
      {
        "name": "Mecca Coffee",
        "url": "https://mecca.coffee/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 429 Too Many Requests"
      },
      {
        "name": "Barangaroo Reserve",
        "url": "https://www.barangaroo.com/",
        "checkedOn": "2026-10-25",
        "reason": "Official precinct page gives no address or hours for the reserve"
      },
      {
        "name": "Chinese Garden of Friendship",
        "url": "https://www.darlingharbour.com/chinese-garden-of-friendship",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 404 Not Found"
      },
      {
        "name": "Harbour walks",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach day at Bondi",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry ride across the harbor",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sydney Harbour private cruise",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Fine-dining harbor dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury harbor hotel stay",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset ferry ride",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Watsons Bay lunch",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Opera House night",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Sydney Opera House confirmed separately)"
      },
      {
        "name": "Bondi beach afternoon",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry day and aquarium stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee in Surry Hills",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Harbor walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach-and-bookshop day",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Harbour Bridge views",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (BridgeMuseum confirmed separately)"
      },
      {
        "name": "Bondi side outing",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Sydney Opera House": {
        "url": "https://www.sydneyoperahouse.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists 2026 performances, including My Fair Lady (Opera Australia) to 30 Oct 2026, Strong is the New Pretty (Sydney Theatre Company) to 12 Dec 2026 and Copland Dance Episodes 6–21 Nov 2026. The tour page says \"Tours are not available on 25 December 2026 and 31 December 2026.\""
      },
      "Bennelong": {
        "url": "https://www.bennelong.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists New Year's Eve for Thursday 31 December 2026 and a 2026 Christmas Day Lunch; says the Good Food Guide 2026 retains Two Hats. Bennelong Bar: \"Walk-ins welcome.\""
      },
      "Saint Peter": {
        "url": "https://www.saintpeter.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current service times and menu prices (lunch choice menu $195 pp, dinner tasting menu $395 pp) with reservation links; bar: \"Walk-ins always welcome. Bookings available, not required.\" No dated 2026 text found."
      },
      "Firedoor": {
        "url": "https://www.firedoor.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "2026 posts on new lunch hours (April 2026) and Friday/Saturday à la carte lunch (June 2026); a 24 December Festive Long Lunch is described as \"marking our final service of 2026.\" Reservations \"available to book up to six-months in advance.\""
      },
      "Ester": {
        "url": "https://ester-restaurant.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Last service of 2026 is Wednesday 23 December (set menu only), reopening Tuesday 5 January 2027; \"opening Tuesdays and Wednesdays from December 1st\"; \"same day walk ins are also very welcome.\" BYO not permitted."
      },
      "Aria": {
        "url": "https://www.ariasydney.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current reservation times with an online booking link and phone (02) 9240 2255. No dated 2026 text found."
      },
      "Rockpool Bar & Grill (Sydney)": {
        "url": "https://hunterstreethospitality.com.au/venues/rockpool/",
        "sourceType": "operator's own site (Hunter Street Hospitality)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"BOOK NOW\" reservations via SevenRooms; current listings for Year-End Dining at Rockpool and a gift-card offer \"Available November 27th - 30th only.\""
      },
      "Icebergs Dining Room and Bar": {
        "url": "https://www.idrb.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current service times and a \"Book a Table\" link; footer \"© 2026 Icebergs Dining Room and Bar.\""
      },
      "Sydney Fish Market": {
        "url": "https://www.sydneyfishmarket.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dated 2026 articles, most recently 30 Sep 2026 (Reel Life documentary). No closure or relocation notice shown."
      },
      "Paddington Markets": {
        "url": "https://www.paddingtonmarkets.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"Open every Saturday year round\"; site lists a 2026 events schedule."
      },
      "Art Gallery of New South Wales": {
        "url": "https://www.artgallery.nsw.gov.au/whats-on/exhibitions/",
        "sourceType": "official public operator (Art Gallery of New South Wales, NSW Government)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions include Nolan Origins (ticketed, until 7 February 2027) and Brett Whiteley Travelling Art Scholarship 2026 (free, until 22 November 2026); Takashi Murakami opens 5 December 2026 (charges apply). \"Free general entry.\""
      },
      "Australian Museum": {
        "url": "https://australian.museum/visit/",
        "sourceType": "official public operator (Australian Museum, NSW Government)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page publishes current hours: \"Open daily 10am-5pm (closed Christmas Day)\" and \"General entry to the Australian Museum is FREE.\" No dated 2026 exhibition was readable."
      },
      "Australian National Maritime Museum": {
        "url": "https://www.sea.museum/",
        "sourceType": "official public operator (Australian National Maritime Museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Exhibitions now on include Ultimate Depth and Voyage to Freedom; HMAS Onslow \"Closed from 19 October to 30 October 2026.\" \"Free entry to permanent galleries.\""
      },
      "Royal Botanic Garden Sydney": {
        "url": "https://www.botanicgardens.org.au/royal-botanic-garden-sydney",
        "sourceType": "official public operator (Botanic Gardens of Sydney)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current monthly hours (October 7:00 AM to 7:30 PM, November 7:00 AM to 8:00 PM); footer \"Copyright © 2026.\""
      },
      "Sydney Observatory": {
        "url": "https://www.powerhouse.com.au/visit/sydney-observatory",
        "sourceType": "official public operator (Powerhouse, NSW Government)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Monthly 2026 Sky Guides listed; bookable tours \"Every Wed—Sun\"; notes \"heritage conservation works are currently underway and access to some areas may be impacted.\""
      },
      "BridgeMuseum": {
        "url": "https://www.bridgemuseum.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Booking links for the Day Session and SkyHouse After Hours; access \"From The Rocks, take the Harbour Bridge lift or stairs from Cumberland Street\"; footer \"© 2026 BridgeMuseum.\""
      },
      "Bondi Icebergs Pool": {
        "url": "https://icebergs.com.au/",
        "sourceType": "operator's own site (Bondi Icebergs Club)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current pool, club and kitchen hours; Thursday pool \"Closed for cleaning pending weather conditions.\""
      },
      "Maybe Sammy": {
        "url": "https://www.maybesammy.com/book-now",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Live booking page with 90-minute indoor seatings Tue–Sat; \"Walk-Ins Always Welcome.\" No dated 2026 text found."
      },
      "Dean & Nancy on 22": {
        "url": "https://www.deanandnancyon22.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Publishes current breakfast, bar and aperitivo hours with a Reservations link; links a Winter 2026 breakfast menu PDF."
      },
      "bills (Surry Hills)": {
        "url": "https://bills.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"We open all day, every day\" for breakfast, lunch, afternoon tea and dinner; notes only the Darlinghurst branch is temporarily closed for repairs, with the other locations open."
      },
      "A.P Bread & Wine (Darlinghurst)": {
        "url": "https://www.apbakery.com.au/stores-locations",
        "sourceType": "operator's own site (All Purpose Bakery)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Locations page publishes branch hours and links dinner and apéritivo menus labelled \"Sep 2026.\""
      },
      "Flour and Stone (Pantry)": {
        "url": "https://www.flourandstone.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current pre-order banner \"PRE-ORDERS FOR THE WEEK CLOSE AT 2PM ON THURSDAY\" and Christmas ordering; footer \"© 2026 Flour and Stone.\""
      },
      "Bourke Street Bakery (Surry Hills)": {
        "url": "https://bourkestreetbakery.com.au/pages/surry-hills",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Store page publishes current hours for the original Surry Hills branch. No dated 2026 notice found."
      },
      "Single O (Surry Hills)": {
        "url": "https://singleo.com.au/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "\"CafeSmart is BACK for 2026\" post; footer \"© Single O 2026.\""
      },
      "Skittle Lane (CBD)": {
        "url": "https://skittlelane.com/pages/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Locations page publishes branch hours; footer \"Skittle Lane 2026.\""
      }
    }
  },
  "Kyoto, Japan": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-25",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or a phone check. Published opening, booking and exhibition details don't guarantee availability. Several official sites couldn't be read: Kyoto Imperial Palace (maintenance notice), Sanjusangen-do and Ryoan-ji (certificate or SSL errors), Heian Jingu and Shinshindo (connection refused), Hyotei, Kagizen Yoshifusa and Smart Coffee (502 errors), Four Seasons and Park Hyatt Kyoto (403), % Arabica (418), Kyoto Railway Museum and Shimogamo Shrine (no readable content), and Kyoto Aquarium's access page (timed out). Kinkaku-ji's only dated 2026 item is a September 28 cashless-payment notice. Hours weren't published or readable for Fushimi Inari Taisha, Nishiki Market, Toji, the National Museum of Modern Art, Weekenders Coffee, Stumptown Coffee, Mr. Maurice's Rooftop Bar and The Garden Bar. Yasaka Shrine lists only its office hours. Sizuya and Ippodo rest on company-wide 2026 notices, and Le Petit Mec's address is an English rendering from its shop list.",
    "sourceUrls": [
      "docs/content-research/kyoto-2026-10-25.md",
      "docs/content-research/kyoto-2026-10-25.json"
    ],
    "excludedCandidates": [
      {
        "name": "Arashiyama Bamboo Grove",
        "checkedOn": "2026-10-25",
        "reason": "Public path with no operator website found to confirm it; Tenryu-ji (whose north gate entrance sells tickets) was checked instead."
      },
      {
        "name": "Kyoto Imperial Palace",
        "url": "https://sankan.kunaicho.go.jp/english/guide/kyoto.html",
        "checkedOn": "2026-10-25",
        "reason": "Official Imperial Household Agency page redirected to a maintenance notice (\"System Maintenance in Progress\"); could not be read."
      },
      {
        "name": "Sanjusangen-do",
        "url": "https://www.sanjusangendo.jp/",
        "checkedOn": "2026-10-25",
        "reason": "Certificate error (\"unable to verify the first certificate\"); not bypassed."
      },
      {
        "name": "Ryoan-ji",
        "url": "https://www.ryoanji.jp/",
        "checkedOn": "2026-10-25",
        "reason": "SSL error (WRONG_VERSION_NUMBER); site could not be read."
      },
      {
        "name": "Kyoto Railway Museum",
        "url": "https://www.kyotorailwaymuseum.jp/",
        "checkedOn": "2026-10-25",
        "reason": "Fetch returned no readable content (English and Japanese pages)."
      },
      {
        "name": "Kyoto Aquarium",
        "url": "https://en.kyoto-aquarium.com/access/",
        "checkedOn": "2026-10-25",
        "reason": "Homepage showed dated 2026 news (e.g. 2026.10.21), but the access page with the address and hours timed out twice, so no address could be quoted."
      },
      {
        "name": "Heian Jingu",
        "url": "https://www.heianjingu.or.jp/",
        "checkedOn": "2026-10-25",
        "reason": "Connection refused (ECONNREFUSED); site could not be read."
      },
      {
        "name": "Shimogamo Shrine",
        "url": "https://www.shimogamo-jinja.or.jp/",
        "checkedOn": "2026-10-25",
        "reason": "Fetch returned only the page title; no address or notices readable."
      },
      {
        "name": "Honke Owariya",
        "url": "https://www.honke-owariya.co.jp/",
        "checkedOn": "2026-10-25",
        "reason": "Site showed only a WordPress default \"Hello world!\" post; no address, hours or real notices readable."
      },
      {
        "name": "Hyotei",
        "url": "https://www.hyotei.co.jp/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 502 Bad Gateway; site could not be read."
      },
      {
        "name": "Saryo Tsujiri (Gion main store)",
        "url": "https://www.giontsujiri.co.jp/store/saryotsujiri-honten/",
        "checkedOn": "2026-10-25",
        "reason": "Store page gave address and hours (10:30-20:30) but no dated 2026 operating evidence; news page was empty."
      },
      {
        "name": "Kagizen Yoshifusa",
        "url": "https://www.kagizen.com/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 502 Bad Gateway; site could not be read."
      },
      {
        "name": "Smart Coffee",
        "url": "https://www.smartcoffee.jp/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 502 Bad Gateway on two attempts; site could not be read."
      },
      {
        "name": "Shinshindo",
        "url": "https://www.shinshindo.jp/",
        "checkedOn": "2026-10-25",
        "reason": "Connection refused (ECONNREFUSED); site could not be read."
      },
      {
        "name": "Rokuyosha",
        "url": "https://www.rokuyosha-coffee.com/",
        "checkedOn": "2026-10-25",
        "reason": "Site gave a street location but no hours and no readable dated 2026 content (news shown only as images)."
      },
      {
        "name": "Kurasu Kyoto",
        "url": "https://kurasu.kyoto/",
        "checkedOn": "2026-10-25",
        "reason": "Homepage had 2026 blog posts but no Kyoto café address or hours readable."
      },
      {
        "name": "% Arabica Kyoto Higashiyama",
        "url": "https://arabica.com/en/location/arabica-kyoto-higashiyama/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 418 refusal after redirect; site could not be read."
      },
      {
        "name": "The Bar (Four Seasons Hotel Kyoto)",
        "url": "https://www.fourseasons.com/kyoto/dining/lounges/the-bar/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "Kyoto Bar (Park Hyatt Kyoto)",
        "url": "https://www.hyatt.com/park-hyatt/en-US/itmph-park-hyatt-kyoto/dining",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "The Bar (The Ritz-Carlton, Kyoto)",
        "url": "https://www.ritzcarlton.com/en/hotels/uktrz-the-ritz-carlton-kyoto/dining/",
        "checkedOn": "2026-10-25",
        "reason": "HTTP 404 on the dining page tried; not read."
      },
      {
        "name": "L'Escamoteur",
        "url": "https://www.lescamoteurbar.com/",
        "checkedOn": "2026-10-25",
        "reason": "Domain tried did not resolve (ENOTFOUND); no official site read."
      },
      {
        "name": "a Kyoto set dinner or Nishiki Market stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Nishiki Market checked separately)"
      },
      {
        "name": "Gion local table",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Kyoto signature dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Gion walk",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Higashiyama public viewpoint",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Market or picnic near Arashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for Fushimi Inari",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a quiet garden or tea experience",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Destination dinner near Arashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset around Kiyomizu-dera",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Kiyomizu-dera checked separately)"
      },
      {
        "name": "Gion dinner",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Family-friendly Fushimi Inari",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Fushimi Inari Taisha checked separately)"
      },
      {
        "name": "Easy outing around Higashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near Arashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Early visit to Fushimi Inari",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Gion cafe or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Higashiyama route",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Higashiyama at a quieter hour",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Arashiyama local rhythm",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near Gion",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Higashiyama bakery or market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before Fushimi Inari",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "a Kyoto set lunch or Nishiki Market stop",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place (Nishiki Market checked separately)"
      },
      {
        "name": "Casual lunch near Kiyomizu-dera",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local stop around Arashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Evening table in Gion",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near Gion",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around Higashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near Arashiyama Bamboo Grove",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near Gion",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Higashiyama morning market",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before Fushimi Inari",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Gion",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in Higashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup near Arashiyama",
        "checkedOn": "2026-10-25",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Fushimi Inari Taisha": {
        "url": "https://inari.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Japanese homepage lists dated 2026 notices, including a 2026-09-07 request on visitor manners in the precincts and a 2026-09-01 notice for 七五三詣 (Shichi-Go-San visits). The access page advises \"taking public transport\" because nearby parking is \"very crowded\"."
      },
      "Kiyomizu-dera": {
        "url": "https://www.kiyomizudera.or.jp/en/location/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "English site carries 2026 news (\"The Evening Special Visit 2026 spring\", \"Thousand-day Prayer 2026\") and the visit page lists a special night viewing on Nov 21-30, 2026, open until 9:30 PM (last entry 9:00 PM), and a Jojuin garden special viewing on Nov 21-30."
      },
      "Tenryu-ji": {
        "url": "https://www.tenryuji.com/en/visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Visit page lists scheduled 2026 closings including \"October 29,30th\" and says the Hatto is \"closed to the public on October 28-30\"; the 2026 calendar lists the Hatto autumn Cloud Dragon exhibition Sept 19-Dec 6 and an early 7:30 opening of the Sogen Pond Garden Nov 14-30. Tickets are sold at the garden, main building and north gate entrances."
      },
      "Nishiki Market": {
        "url": "https://www.kyoto-nishiki.or.jp/",
        "sourceType": "official operator (京都錦市場商店街振興組合, Nishiki Market shopping street association)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Association site posts dated 2026 notices, e.g. 2026.09.10 that Kyoto Points can be used at registered shops (valid 2026-08-01 to 2027-02-28) and a 2026.05.31 fifth-anniversary campaign for its online shop."
      },
      "Nijo Castle": {
        "url": "https://nijo-jocastle.city.kyoto.lg.jp/?lang=en",
        "sourceType": "official public operator (City of Kyoto)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "City site lists \"NIJO-JO CASTLE FESTIVAL 2026\" (posted 2026.10.9) and a notice of \"Shortened Admission Hours on Sunday, December 6, 2026\"."
      },
      "Kyoto National Museum": {
        "url": "https://www.kyohaku.go.jp/eng/",
        "sourceType": "official public operator (National Institutes for Cultural Heritage)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current special exhibition \"The Tale of Genji: Radiant Culture of the Japanese Imperial Court\", October 6-November 29, 2026; advance tickets not required. \"All exhibits from the museum collection have been deinstalled\" for it, with collection exhibitions resuming December 22, 2026."
      },
      "Ippodo Tea Kyoto Main Store": {
        "url": "https://global.ippodo-tea.co.jp/pages/store-kyoto?view=store-detail",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Store page lists the Kaboku Tearoom (44 seats) with a current menu PDF dated 20261001 in its filename; the Ippodo site carries October 2026 store notices."
      },
      "Ginkaku-ji": {
        "url": "https://www.shokoku-ji.jp/ginkakuji/",
        "sourceType": "operator's own site (Shokoku-ji, the head temple that runs Ginkaku-ji)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists \"銀閣寺 秋の特別拝観 令和8年11月1日（日）～ 12月5日（土）\" (autumn special viewing, November 1-December 5, 2026), autumn-limited goshuin \"2026年11月1日(日)より\", and an offering-fee change \"2026年4月1日より\"."
      },
      "Kinkaku-ji": {
        "url": "https://www.shokoku-ji.jp/kinkakuji/news/",
        "sourceType": "operator's own site (Shokoku-ji, the head temple that runs Kinkaku-ji)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News page dated 2026年9月28日 announces the \"おまいりPay\" cashless payment service at the admission desk (excluding amulets and goshuin). The events page says \"現在金閣寺にて開催の行事はありません\" (no events currently held)."
      },
      "Toji": {
        "url": "https://toji.or.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage lists autumn 2026 openings: Treasure House exhibition \"東寺五重塔の美術と歴史\" 2026年9月20日-11月25日; special opening of the Five-Storied Pagoda's first floor and an autumn light-up with night admission to the Kondo and Kodo, 2026年10月31日-12月13日."
      },
      "Yasaka Shrine": {
        "url": "https://www.yasaka-jinja.or.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dated 令和8年 (2026) notices include a 9月1日 recruitment notice for New Year shrine helpers and a 7月10日 Shichi-Go-San package notice."
      },
      "Kitano Tenmangu": {
        "url": "https://www.kitanotenmangu.or.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Autumn Momiji Garden runs \"令和8年10月31日（土）～12月6日（日）\", 9:00-16:00 (last entry 15:40), with evening illumination November 13-December 6 from sunset to 20:00; adults 1,500 yen, children 700 yen."
      },
      "Kyoto City KYOCERA Museum of Art": {
        "url": "https://kyotocity-kyocera.museum/en/exhibition",
        "sourceType": "operator's own site (City of Kyoto museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Current exhibitions include \"Zen and Ghibli\" (2026/10/3-2026/12/6, Higashiyama Cube), \"Yamaga Seika: Boundless Imagination in Textile Art\" (2026/9/19-2026/12/20) and The Triangle: Matsunobe Soshi: Walls (2026/9/12-2026/12/20, free)."
      },
      "National Museum of Modern Art, Kyoto": {
        "url": "https://www.momak.go.jp/English/",
        "sourceType": "official public operator (national museum)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Lists \"Reflections in Jewellery: Memory and Identity\" and the 3rd Collection Gallery Exhibition 2026, both \"2026.10.24 sat. - 01.17 sun.\" (now running)."
      },
      "Kyoto Tower": {
        "url": "https://www.kyoto-tower.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Dated 2026 notices include an observation-deck fee revision (2026年08月01日) and a September 9 notice that hotel guests receive deck tickets from October 1, 2026."
      },
      "Kyoto Botanical Gardens": {
        "url": "https://www.pref.kyoto.jp/plant/",
        "sourceType": "official public operator (Kyoto Prefecture)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Page \"更新日：2026年9月27日\"; announces a plant-painting contest accepting entries \"令和8年10月1日より\", with an exhibition in January 2027."
      },
      "Inoda Coffee Main Store": {
        "url": "https://www.inoda-coffee.co.jp/shop/honten/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Main-store page lists a 本店限定 drip assortment on sale \"2026年9月1日(火)～\" and a 2026.09.13 main-store autumn cake notice; it says \"朝はモーニングコーヒーや朝食\" are served."
      },
      "Francois Kissa": {
        "url": "https://www.francois1934.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "News lists \"音楽の夜vol.7\" dated 2026/10/08. House rules: cash only, no reservations, no children under school age, possible time limits when crowded, large luggage may be refused."
      },
      "Weekenders Coffee (Shinmachi)": {
        "url": "https://www.weekenderscoffee.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Access section says the Shinmachi shop opened \"2026年9月30日オープン！\"; news posts new beans on 2026-10-01. A 2026-03-10 notice announced the Tominokoji shop's relocation."
      },
      "Stumptown Coffee (Ace Hotel Kyoto)": {
        "url": "https://acehotel.com/kyoto/",
        "sourceType": "operator's own site (Ace Hotel Kyoto)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hotel page lists \"the first Stumptown cafe in Japan\" among its outlets and a dated calendar of October-December 2026 hotel events (e.g. Oct 25 listening session in the Lobby Lounge)."
      },
      "Mr. Maurice's Rooftop Bar (Ace Hotel Kyoto)": {
        "url": "https://acehotel.com/kyoto/",
        "sourceType": "operator's own site (Ace Hotel Kyoto)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Hotel page lists the rooftop bar serving Italian-American food, wine and cocktails, alongside dated 2026 hotel events such as \"Saturday Night Ace\" on October 31 and Día de los Muertos at PIOPIKO on November 1."
      },
      "The Garden Bar (Hotel The Mitsui Kyoto)": {
        "url": "https://www.hotelthemitsui.com/en/kyoto/",
        "sourceType": "operator's own site (Hotel The Mitsui Kyoto)",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "THE GARDEN BAR is listed among the hotel's restaurants and bars; Restaurants and Bar notices dated 2026.09.29 (6th anniversary event, November 3 and 7, 2026) and 2026.10.01 (Christmas cakes, December 1-25, 2026)."
      },
      "Kikunoi Honten": {
        "url": "https://kikunoi.jp/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Japanese site notice dated 2026.04.23 says Kikunoi Honten received three stars in \"ミシュランガイド京都・大阪2026\". Reservations by phone (+81-75-561-0015) or through MY CONCIERGE or TABLE ALL."
      },
      "Nanzenji Junsei": {
        "url": "https://www.to-fu.co.jp/access/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage posts \"９月１０月の休業日のお知らせ\" dated 2026.08.23 and a 2026.07.05 garden notice."
      },
      "Omen Ginkakuji Main Store": {
        "url": "https://www.omen.co.jp/pages/shops",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Homepage notice dated 2026/06/26: \"銀閣寺本店　金曜日夜営業再開のお知らせ\" (Friday evening service resumed). Reservations by phone to each store; email reservations not accepted."
      },
      "Sizuya (Kyoto Station)": {
        "url": "https://www.sizuya.co.jp/shop/kyotost.html",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Bakery founded in 昭和23年 (1948); company site posts monthly 2026 new-product notices, most recently 2026.8.25 for September products. Store-specific 2026 notice not seen."
      },
      "Le Petit Mec (Imadegawa)": {
        "url": "https://www.lepetitmec.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-25",
        "operatingEvidence": "Site announces a 28th-anniversary campaign starting October 10 (Sat), listed as just posted, and Galette des Rois pre-orders on a page referring to 2026."
      }
    }
  },
  "Florence, Italy": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The Duomo, Museo Ferragamo and several hotel bar sites (Four Seasons, Lungarno Collection, Rocco Forte) returned HTTP 403; the City of Florence, Musei Civici Fiorentini and regional museums (Museo di San Marco) sites refused connections; and the Galleria dell'Accademia, Caffè Gilli, Trattoria Mario, St. Regis, Gelateria Santa Trinita, Badiani and Paszkowski sites had certificate or SSL errors. None of these failures is evidence of closure. Several food entries are confirmed only at medium confidence, from a live booking system, published hours or a 2026 copyright line: Harry's Bar Firenze, Osteria Santo Spirito and Ora d'Aria showed no 2026-dated content, and Vivoli, Ditta Artigianale, Pasticceria Buonamici, B-Roof, Trattoria Zà Zà and Enoteca Pinchiorri publish no opening hours. Santa Croce, Santa Maria Novella, San Miniato al Monte and Museo Galileo regular hours were not readable. Palazzo Pitti, the Boboli Gardens and Orsanmichele have no street number. Museo Novecento and Harry's Bar pages contradict themselves on opening days. The strike notice is attributed only to the Uffizi Galleries' notice page; the Pitti and Boboli pages carry only its headline.",
    "sourceUrls": [
      "docs/content-research/florence-2026-10-21.md",
      "docs/content-research/florence-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Duomo (Cattedrale di Santa Maria del Fiore)",
        "url": "https://duomo.firenze.it/en/home",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned HTTP 403 Forbidden on home and opening-times pages; not bypassed. Not evidence of closure."
      },
      {
        "name": "Ponte Vecchio",
        "url": "https://www.comune.fi.it/",
        "checkedOn": "2026-10-21",
        "reason": "Public bridge with no operator site; City of Florence site (comune.fi.it) refused connection (ECONNREFUSED)."
      },
      {
        "name": "Piazzale Michelangelo (Sunset from Piazzale Michelangelo)",
        "url": "https://www.comune.fi.it/",
        "checkedOn": "2026-10-21",
        "reason": "Public square with no operator site; City of Florence site refused connection (ECONNREFUSED)."
      },
      {
        "name": "Galleria dell'Accademia",
        "url": "https://www.galleriaaccademiafirenze.it/en/",
        "checkedOn": "2026-10-21",
        "reason": "Certificate error on official site (\"unable to verify the first certificate\"); not bypassed."
      },
      {
        "name": "Palazzo Vecchio",
        "url": "https://www.museicivicifiorentini.comune.fi.it/en/palazzovecchio/",
        "checkedOn": "2026-10-21",
        "reason": "Musei Civici Fiorentini site refused connection (ECONNREFUSED)."
      },
      {
        "name": "Caffè Gilli",
        "url": "https://www.gilli.it/",
        "checkedOn": "2026-10-21",
        "reason": "Certificate error: hostname does not match certificate; not bypassed."
      },
      {
        "name": "Mercato di Sant'Ambrogio",
        "url": "https://www.mercatosantambrogio.it/",
        "checkedOn": "2026-10-21",
        "reason": "Site gives address (Piazza Lorenzo Ghiberti) and hours (Mon-Sat 07:00-14:00) but no 2026-dated content and official status unclear."
      },
      {
        "name": "Museo di San Marco",
        "url": "https://museitoscana.cultura.gov.it/luoghi_della_cultura/museo-di-san-marco/",
        "checkedOn": "2026-10-21",
        "reason": "Regional museums site refused connection (ECONNREFUSED)."
      },
      {
        "name": "Museo Stibbert",
        "url": "https://www.museostibbert.it/",
        "checkedOn": "2026-10-21",
        "reason": "Address and hours published (closed Thursdays) but no year-dated current content; footer \"© 2021\"."
      },
      {
        "name": "Museo Marino Marini",
        "url": "https://www.museomarinomarini.it/en/",
        "checkedOn": "2026-10-21",
        "reason": "Hours published but no street number and no dated current content."
      },
      {
        "name": "Basilica di San Lorenzo",
        "url": "https://www.operamedicealaurenziana.org/en/",
        "checkedOn": "2026-10-21",
        "reason": "Opera Medicea Laurenziana page shows conflicting hours, including an outdated November 2020 block, and no 2026 content."
      },
      {
        "name": "Museo Salvatore Ferragamo",
        "url": "https://www.ferragamo.com/museo/en/usa/",
        "checkedOn": "2026-10-21",
        "reason": "HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "Officina Profumo-Farmaceutica di Santa Maria Novella",
        "url": "https://www.smnovella.com/en/florence-via-della-scala",
        "checkedOn": "2026-10-21",
        "reason": "Branch page returned HTTP 404."
      },
      {
        "name": "Trattoria Mario",
        "url": "https://www.trattoriamario.com/",
        "checkedOn": "2026-10-21",
        "reason": "Certificate error (\"unable to verify the first certificate\"); not bypassed."
      },
      {
        "name": "Cibrèo (Sant'Ambrogio)",
        "url": "https://www.cibreo.com/",
        "checkedOn": "2026-10-21",
        "reason": "Homepage lists venues but no addresses or hours; contact and venue pages returned 404."
      },
      {
        "name": "Il Santo Bevitore",
        "url": "https://www.ilsantobevitore.com/",
        "checkedOn": "2026-10-21",
        "reason": "Address published (Via di Santo Spirito 64/66) but no hours or dated content; menus are images; Sforno page 404."
      },
      {
        "name": "Teatro del Sale",
        "url": "https://www.teatrodelsale.com/",
        "checkedOn": "2026-10-21",
        "reason": "Address and membership rules published but no dated 2026 shows or events."
      },
      {
        "name": "Gucci Osteria (Florence)",
        "url": "https://www.gucciosteria.com/en/florence",
        "checkedOn": "2026-10-21",
        "reason": "Address published but no hours and no content later than 2023."
      },
      {
        "name": "All'Antico Vinaio (Via dei Neri)",
        "url": "https://www.allanticovinaio.com/",
        "checkedOn": "2026-10-21",
        "reason": "Shop listed but no street addresses or hours on page read."
      },
      {
        "name": "Caffè Rivoire",
        "url": "https://www.rivoire.it/it/",
        "checkedOn": "2026-10-21",
        "reason": "Only a registered-office address and 2026 copyright; no café address or hours."
      },
      {
        "name": "Caffè Paszkowski",
        "url": "https://www.paszkowski.it/",
        "checkedOn": "2026-10-21",
        "reason": "SSL error (WRONG_VERSION_NUMBER); not bypassed."
      },
      {
        "name": "Locale Firenze",
        "url": "https://www.localefirenze.it/",
        "checkedOn": "2026-10-21",
        "reason": "Page showed no address, hours or 2026 content (latest date 2022)."
      },
      {
        "name": "Le Volpi e l'Uva",
        "url": "https://www.levolpieluva.com/",
        "checkedOn": "2026-10-21",
        "reason": "Address published (Piazza dei Rossi 1) but no hours or dated content."
      },
      {
        "name": "Divina Terrazza (Grand Hotel Cavour)",
        "url": "https://www.hotelcavour.com/",
        "checkedOn": "2026-10-21",
        "reason": "Hotel address published but no terrace hours, booking or dated content beyond copyright."
      },
      {
        "name": "Atrium Bar (Four Seasons Florence)",
        "url": "https://www.fourseasons.com/florence/dining/lounges/atrium-bar/",
        "checkedOn": "2026-10-21",
        "reason": "HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "Fusion Bar (Gallery Hotel Art)",
        "url": "https://www.lungarnocollection.com/fusion-bar-restaurant",
        "checkedOn": "2026-10-21",
        "reason": "HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "Hotel Savoy bars",
        "url": "https://www.roccofortehotels.com/hotels-and-resorts/hotel-savoy/restaurants-and-bars/",
        "checkedOn": "2026-10-21",
        "reason": "HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "St. Regis Florence bar",
        "url": "https://www.stregisflorence.com/",
        "checkedOn": "2026-10-21",
        "reason": "Certificate hostname mismatch; not bypassed."
      },
      {
        "name": "Mad Souls & Spirits",
        "url": "https://www.madsoulsandspirits.com/",
        "checkedOn": "2026-10-21",
        "reason": "Domain redirects to an unrelated site."
      },
      {
        "name": "Rasputin",
        "url": "https://www.rasputinfirenze.com/",
        "checkedOn": "2026-10-21",
        "reason": "Domain not found (ENOTFOUND)."
      },
      {
        "name": "Carapina",
        "url": "https://www.carapina.it/",
        "checkedOn": "2026-10-21",
        "reason": "Domain now hosts an unrelated online-casino page."
      },
      {
        "name": "Gelateria dei Neri",
        "url": "https://www.gelateriadeineri.it/",
        "checkedOn": "2026-10-21",
        "reason": "Domain now hosts an unrelated online-casino page."
      },
      {
        "name": "Perchè No!",
        "url": "https://www.percheno.firenze.it/",
        "checkedOn": "2026-10-21",
        "reason": "Address published (Via de' Tavolini 19r) but no hours or dated content."
      },
      {
        "name": "Gelateria Santa Trinita",
        "url": "https://www.gelateriasantatrinita.it/",
        "checkedOn": "2026-10-21",
        "reason": "Certificate expired; not bypassed."
      },
      {
        "name": "Gelateria La Carraia",
        "url": "https://www.lacarraiagroup.eu/",
        "checkedOn": "2026-10-21",
        "reason": "No Florence shop address or hours on page read."
      },
      {
        "name": "Gelateria Badiani",
        "url": "https://www.badiani1932.com/",
        "checkedOn": "2026-10-21",
        "reason": "gelateriabadiani.it certificate mismatch; badiani1932.com homepage gave no Florence address or hours."
      },
      {
        "name": "Robiglio",
        "url": "https://www.robiglio.it/",
        "checkedOn": "2026-10-21",
        "reason": "Connection reset (ECONNRESET) twice."
      },
      {
        "name": "Pasticceria Nencioni",
        "url": "http://www.pasticcerianencioni.com/",
        "checkedOn": "2026-10-21",
        "reason": "No address, hours or dated content on page read."
      },
      {
        "name": "Pasticceria Giorgio",
        "url": "https://www.pasticceriagiorgio.it/",
        "checkedOn": "2026-10-21",
        "reason": "Address and hours published but no dated content; outside the centre."
      },
      {
        "name": "Vestri",
        "url": "https://www.vestri.it/",
        "checkedOn": "2026-10-21",
        "reason": "No Florence shop address; notice says sales resume from late September 2026."
      },
      {
        "name": "Pasticceria Sieni",
        "url": "https://www.pasticceriasieni.it/",
        "checkedOn": "2026-10-21",
        "reason": "Domain redirects to a domain-sale page."
      },
      {
        "name": "Oltrarno artisan streets",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A half-day Tuscan hill town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A Florentine steak dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A small Oltrarno trattoria",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "All other descriptive entries (e.g. \"A cafe near Oltrarno\", \"Market meal around Santa Croce\", \"Private guide for Uffizi Gallery\", \"Sunset drinks near Duomo\", \"Local bakery near Duomo\", \"Coffee near Duomo\")",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Uffizi Gallery": {
        "url": "https://www.uffizi.it/en/the-uffizi",
        "sourceType": "official public operator (Gallerie degli Uffizi, Italian Ministry of Culture)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current notices include \"Strike on 30 October 2026\" and \"October 2026: free admission for those who donate to breast cancer prevention\". The strike notice itself (https://www.uffizi.it/en/notices/strike) says the Uffizi Galleries guarantee the \"Gallery of Statues and Paintings (Uffizi) from 1.30 pm to 6.30 pm\"."
      },
      "Palazzo Pitti": {
        "url": "https://www.uffizi.it/en/pitti-palace",
        "sourceType": "official public operator (Gallerie degli Uffizi, Italian Ministry of Culture)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibition \"Sarmi's Genius. A new exhibition at the Museum of Costume and Fashion\" runs \"From 18/06/2026 to 31/12/2026\". The page carries only a headline link to the Uffizi Galleries' strike notice; it does not itself say the strike affects Pitti, and Pitti is not among the museums the notice guarantees."
      },
      "Boboli Gardens": {
        "url": "https://www.uffizi.it/en/boboli-garden",
        "sourceType": "official public operator (Gallerie degli Uffizi, Italian Ministry of Culture)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Combined Boboli + Bardini ticket \"Available only at the ticket offices on the day of admission\" from 3 March 2026; October 2026 free-admission notice. The garden page shows only a headline link to the strike notice; the notice page (https://www.uffizi.it/en/notices/strike) lists \"Boboli Gardens, open throughout the entire day\" on 30 October 2026."
      },
      "Museo Nazionale del Bargello": {
        "url": "https://bargellomusei.it/en/museum/museo-nazionale-del-bargello/",
        "sourceType": "official public operator (Musei del Bargello, Italian Ministry of Culture)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Special openings on 26 October 2026 (5:00-9:00 pm) and 30 November 2026 (5:15-9:00 pm); homepage notes \"Notturno al Museo\" Monday evening openings 5-26 October 2026."
      },
      "Basilica di Santa Croce": {
        "url": "https://www.santacroceopera.it/en/",
        "sourceType": "operator's own site (Opera di Santa Croce)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Notice that on \"Friday October 23rd\" (a Friday in 2026) \"the monumental complex will close at 4.00 pm (last entry at 3.30 pm) due to a special liturgical celebration\"; online tickets sold at ticket.santacroceopera.it; footer \"©2009-2026\"."
      },
      "Mercato Centrale Firenze": {
        "url": "https://www.mercatocentrale.it/firenze/info/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage lists autumn 2026 events including a chocolate and wine tasting and the \"Creature in CreTam\" workshop, and promotes \"L'ora dell'aperitivo è sempre più Centrale!\"; stalls include David Bedu (\"Il pane e la pasticceria\") and Mondicaffè (\"Il bar e la caffetteria\")."
      },
      "Palazzo Strozzi": {
        "url": "https://www.palazzostrozzi.org/en/",
        "sourceType": "operator's own site (Fondazione Palazzo Strozzi)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibition \"Broken: The Power of the Fragment\" from 25 September 2026 to 24 January 2027; family activities \"All in One\" (ages 3-6) and \"Make and Remix\" (ages 7-12) run from early October 2026 to January 2027."
      },
      "Museo Galileo": {
        "url": "https://www.museogalileo.it/en/",
        "sourceType": "operator's own site (Museo Galileo)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Upcoming events include \"Esperimenti e meraviglie alla corte dei Lorena\" on 24 October and \"A spasso con Galileo\" on 31 October, both 15:00-16:00 tours with actors in costume, and a Leibniz conference on 5-6 November 2026."
      },
      "Basilica di San Miniato al Monte": {
        "url": "https://www.sanminiatoalmonte.it/",
        "sourceType": "operator's own site (the basilica's community)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Sabato 24 ottobre 2026, ore 16.30: benedizione e presentazione di una nuova scultura bronzea\", followed by liturgies for the solemnity of St Miniato on 24 and 25 October 2026; posts dated May 2026."
      },
      "Villa e Giardino Bardini": {
        "url": "https://www.villabardini.it/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ticketing \"Every day, from 10:30 AM to 18:00 PM\"; the exhibition \"Firenze '50 '60 '70\" ran \"From 7 May to 18 October 2026\"; footer \"© 2026 - Villa e Giardino Bardini\"."
      },
      "Cappelle Medicee": {
        "url": "https://www.bargellomusei.it/en/museum/cappelle-medicee/",
        "sourceType": "official public operator (Musei del Bargello, Italian Ministry of Culture)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Special opening 30 November 2026, 05:15-09:00 pm; closed 25 December 2026 and 1 January 2027; full ticket €11, optional reservation €4."
      },
      "Orsanmichele": {
        "url": "https://www.bargellomusei.it/en/museum/orsanmichele/",
        "sourceType": "official public operator (Musei del Bargello, Italian Ministry of Culture)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Special openings on 26 October 2026 (05:00-09:00 pm) and 30 November 2026 (05:15-09:00 pm, \"Festa della Toscana\")."
      },
      "Palazzo Medici Riccardi": {
        "url": "https://www.palazzomediciriccardi.it/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions \"Oltre il Rinascimento\" (to 5 January 2027) and \"San Francesco d'Assisi e Giuseppe Nicola Nasini\" (to 31 January 2027); online ticket sales."
      },
      "Museo Novecento": {
        "url": "https://www.museonovecento.it/en/",
        "sourceType": "operator's own site (civic museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibitions Victor Man (26 Sep 2026 - 7 Mar 2027) and Danielle McKinney, \"Tra Noi\" (17 Oct 2026 - 28 Feb 2027). \"The museum's permanent collection is temporarily closed for renovation work\", with no end date."
      },
      "Buca Mario": {
        "url": "https://www.bucamario.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"PRENOTA UN TAVOLO\" online booking; footer \"© 2026 Buca Mario S.R.L.\"; posts give \"Dal lunedì al sabato, dalle 19:00\"."
      },
      "Trattoria Zà Zà": {
        "url": "https://www.trattoriazaza.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Booking (\"Prenota\") and menu pages linked; blog posts with images uploaded July-October 2026; footer \"© 2026 Trattoria Zà Zà\"."
      },
      "La Ménagère": {
        "url": "https://www.lamenagere.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Breakfast, lunch, aperitivo, dinner and drinks described; \"PRENOTA UN TAVOLO\" online booking; footer dated 2026."
      },
      "Enoteca Pinchiorri": {
        "url": "https://www.enotecapinchiorri.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Badge \"Enoteca Pinchiorri 3 stars michelin 2026\"; \"Prenota\" buttons link to booking."
      },
      "Ristorante Il Latini": {
        "url": "https://latinifirenze.com/",
        "sourceType": "operator's own site (illatini.com redirects here)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Prenota qui il tuo tavolo\" online booking, plus phone and email booking; footer \"2026 © All right reserved\"."
      },
      "Procacci": {
        "url": "https://www.procacci1885.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Menu file \"Menu_Procacci-2026.pdf\" uploaded June 2026; footer \"© 2026 - All rights reserved - Procacci srl\"."
      },
      "Ditta Artigianale (Via dei Neri)": {
        "url": "https://www.dittaartigianale.it/pages/locali",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Locations page lists six Florence cafés; homepage heading \"Miglior Roaster d'Italia 2026\"; footer \"© 2026 Ditta Artigianale\"."
      },
      "B-Roof (Grand Hotel Baglioni)": {
        "url": "https://www.b-roof.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Separate booking links for the restaurant and the American Bar; selected for the \"Forchettiere Awards Toscana 2026\"; vouchers \"valid for 180 days (6 months)\"."
      },
      "Pasticceria Buonamici": {
        "url": "https://www.pasticceriabuonamici.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Blog post \"Non l'avresti mai detto, eh?!\" dated 4 February 2026; footer \"© 2026 Buonamici Pasticceria S.r.l.\"."
      },
      "Harry's Bar Firenze": {
        "url": "https://www.harrysbarfirenze.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"PRENOTA\" booking buttons and published service hours; no 2026-dated content seen."
      },
      "Osteria Santo Spirito": {
        "url": "https://www.osteriasantospirito.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Prenota il tuo tavolo\" online booking and linked menu; no 2026-dated content seen."
      },
      "Ora d'Aria": {
        "url": "https://www.oradariaristorante.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Prenota un tavolo\" online booking, à la carte and tasting menus; site copyright 2024, no 2026-dated content."
      },
      "Vivoli": {
        "url": "https://www.vivoli.it/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Gelato, semifreddi and affogato (\"La gran crema al caffè\") described; online merchandise shop; footer \"© 2026 Vivoli Piero il gelato srl\"."
      }
    }
  },
  "Istanbul, Turkey": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read automatically. Hagia Sophia (ayasofyacamii.gov.tr) and the Blue Mosque (sultanahmetcamii.org) failed with certificate errors, as did the Spice Bazaar, Mandabatmaz and Develi. Karaköy Güllüoğlu, Hafız Mustafa's online store and Saray Muhallebicisi returned HTTP 403. The Basilica Cistern, 360 Istanbul and Baylan dropped or refused the connection. None of these failures is evidence of closure. No official website was found for Van Kahvaltı Evi, Privato Cafe, Alexandra, Moretenders, Galata Simitçisi or Coffee Department. Several other candidates had official sites without a branch address or current content. Pera Palace's Orient Bar says it is not operating until the end of the summer season, with no date. Several confirmed places were published only partially. Pandeli, Neolokal, the Grand Bazaar and Kurukahveci Mehmet Efendi publish no opening hours. Istanbul Modern showed only that day's hours. Petra's Şişhane branch has no street address. Arkestra's published hours read \"Thuesday - Saturday\", so the first open day is unclear. Many confirmed places, including the National Palaces pages, showed no 2026-dated content, so their operating status rests on current booking, menu, price or hours information.",
    "sourceUrls": [
      "docs/content-research/istanbul-2026-10-21.md",
      "docs/content-research/istanbul-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Hagia Sophia area",
        "url": "https://ayasofyacamii.gov.tr",
        "checkedOn": "2026-10-21",
        "reason": "Official site fetch failed with a certificate error (\"unable to verify the first certificate\"); not bypassed. Not evidence of closure."
      },
      {
        "name": "Blue Mosque and Sultanahmet",
        "url": "https://www.sultanahmetcamii.org",
        "checkedOn": "2026-10-21",
        "reason": "Official site fetch failed with a certificate error (\"unable to get local issuer certificate\"); not bypassed. Not evidence of closure."
      },
      {
        "name": "Sultanahmet",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Bosphorus views",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry rides",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Mosque visits",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Market and tea time",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private Bosphorus cruise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Mikla dinner",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Mikla (confirmed separately)"
      },
      {
        "name": "Hammam spa ritual",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset Bosphorus view",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Karakoy evening",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Spice Bazaar snacks",
        "url": "https://www.misircarsisi.org",
        "checkedOn": "2026-10-21",
        "reason": "Spice Bazaar official site fetch failed with a certificate hostname mismatch; not bypassed. Not evidence of closure."
      },
      {
        "name": "Karakoy cafes",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Old city walk",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry between sides",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Bosphorus cruise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Balat streets",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Asian side day",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Historic hammam",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sultanahmet kofte stops",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Van Kahvalti Evi",
        "url": "https://www.vankahvaltievi.com",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (searched; vankahvaltievi.com does not resolve); only third-party listings, which are not admissible."
      },
      {
        "name": "Namli Gurme",
        "url": "https://www.namligurmeonline.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site (namligurme.com.tr, which redirects to namligurmeonline.com) gives only the company contact address (Mumhane Cad. Atilla İş Hanı No:6/A, Karaköy), not a restaurant branch, and publishes no hours; branch address not confirmed."
      },
      {
        "name": "Privato Cafe",
        "checkedOn": "2026-10-21",
        "reason": "No official website found; only review sites and guides, which are not admissible."
      },
      {
        "name": "Alexandra",
        "url": "https://www.alexandracocktailbar.com",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (alexandracocktailbar.com does not resolve); only guides and listings, which are not admissible."
      },
      {
        "name": "Moretenders",
        "checkedOn": "2026-10-21",
        "reason": "No official website found; only an Instagram account (social media is not admissible) and third-party listings."
      },
      {
        "name": "Karakoy Gulluoglu",
        "url": "https://www.karakoygulluoglu.com",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned HTTP 403 Forbidden (homepage and contact page); not bypassed. Not evidence of closure."
      },
      {
        "name": "Hafiz Mustafa",
        "url": "https://www.hafizmustafa.com",
        "checkedOn": "2026-10-21",
        "reason": "Official homepage readable but has no branch addresses or hours. Store page returned 404 and online.hafizmustafa.com returned HTTP 403, so no branch could be confirmed."
      },
      {
        "name": "Galata Simitcisi",
        "url": "https://www.galatasimitcisi.com",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (galatasimitcisi.com does not resolve)."
      },
      {
        "name": "Mandabatmaz",
        "url": "https://www.mandabatmaz.com",
        "checkedOn": "2026-10-21",
        "reason": "Official site fetch failed with a certificate hostname mismatch (cert issued for ihs.com.tr); not bypassed. Not evidence of closure."
      },
      {
        "name": "Coffee Department",
        "url": "https://www.coffeedepartment.com.tr",
        "checkedOn": "2026-10-21",
        "reason": "No verifiable official website (coffeedepartment.com.tr failed DNS lookup); only third-party listings."
      },
      {
        "name": "Basilica Cistern (Yerebatan Sarnıcı)",
        "url": "https://yerebatan.com/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Operator site yerebatan.com closed the connection repeatedly (\"Socket is closed\"). The İBB Kültür AŞ page showed only a truncated address (\"Yerebatan Cad. Alemdar Mah. […]\") with the main article password-protected, so the exact address was not confirmed."
      },
      {
        "name": "Orient Bar (Pera Palace Hotel)",
        "url": "https://perapalace.com/orient-bar",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official page says the bar is closed with no reopening date: \"Yaz sezonu bitene kadar hizmet vermemektedir\" (not operating until the summer season ends). The page also contained AI-directed text (see injectionLikeText)."
      },
      {
        "name": "Balıkçı Sabahattin",
        "url": "https://www.balikcisabahattin.com/reservations",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official site shows a reservation form and a €35 fish lunch menu, but neither the homepage nor the reservations page gives a street address."
      },
      {
        "name": "Hamdi Restaurant",
        "url": "https://hamdi.com.tr/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official site lists addresses (Eminönü: Tahmis Cad. Kalçın Sokak No:11) but no hours, menu, booking or 2026 content, so there is no evidence it is currently operating."
      },
      {
        "name": "Asitane",
        "url": "https://www.asitanerestaurant.com",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official site's newest dated content is from early 2020 (copyright 2005-2019), and no street address appears on the homepage, so it is not confirmed as currently operating."
      },
      {
        "name": "Hacı Bekir",
        "url": "https://www.hacibekir.com",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official site names the Bahçekapı shop but gives no address for it; the only address shown is in Pendik and is not identified as a shop."
      },
      {
        "name": "Vefa Bozacısı",
        "url": "https://www.vefa.com.tr",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Official homepage shows no shop address, hours or current content."
      },
      {
        "name": "Tarihi Sultanahmet Köftecisi Selim Usta",
        "url": "https://www.sultanahmetkoftesi.com",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official homepage names a Sultanahmet branch without a street address or hours, and its branches page returned 404."
      },
      {
        "name": "Kronotrop",
        "url": "https://www.kronotrop.com.tr",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official homepage lists no cafe addresses; the branch pages tried returned 404."
      },
      {
        "name": "Saray Muhallebicisi",
        "url": "https://online.saraymuhallebicisi.com/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official site redirects to online.saraymuhallebicisi.com, which returned HTTP 403; not bypassed."
      },
      {
        "name": "Divan Pastanesi",
        "url": "https://www.divan.com.tr",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. divan.com.tr lists branch neighbourhoods only, with no street addresses or hours; divanpastaneleri.com.tr returned no readable content."
      },
      {
        "name": "Simit Sarayı",
        "url": "https://www.simitsarayi.com/magazalar",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The store page loads branch details dynamically, and no central Istanbul branch address was readable."
      },
      {
        "name": "Hünkar Lokantası",
        "url": "https://www.hunkarlokantasi.com",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official site returned an empty page."
      },
      {
        "name": "Fazıl Bey",
        "url": "https://www.fazilbey.com",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official domain showed a hosting error page (no site configured)."
      },
      {
        "name": "Baylan Pastanesi",
        "url": "https://www.baylanpastanesi.com.tr",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Connection refused (ECONNREFUSED); not bypassed."
      },
      {
        "name": "360 Istanbul",
        "url": "https://www.360istanbul.com",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Connection reset (ECONNRESET); not bypassed."
      },
      {
        "name": "Develi (Samatya)",
        "url": "https://www.develikebap.com",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Certificate hostname mismatch for www.develikebap.com; not bypassed."
      },
      {
        "name": "Çiya Sofrası",
        "url": "https://www.ciya.com.tr",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. The official homepage gives no branch addresses, hours or 2026 content."
      }
    ],
    "placeSources": {
      "Topkapı Palace Museum": {
        "url": "https://www.millisaraylar.gov.tr/saraylar/topkapi-sarayi",
        "sourceType": "official public operator (Milli Saraylar, National Palaces Administration)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page publishes current ticket prices, including a combined Topkapı Palace + Aya İrini + Harem ticket at 2,750 TL for foreign visitors that is valid for one day, and a night tour at 4,000 TL for foreign visitors. No 2026-dated notice; the footer reads © 2023."
      },
      "Dolmabahçe Palace": {
        "url": "https://www.millisaraylar.gov.tr/saraylar/dolmabahce-sarayi",
        "sourceType": "official public operator (Milli Saraylar, National Palaces Administration)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current ticket prices are listed: Selamlık, Harem and Painting Museum together at 2,000 TL for foreign visitors, with combined palace passes valid for one month. No 2026-dated notice."
      },
      "Istanbul Archaeological Museums": {
        "url": "https://muze.gov.tr/muze-detay?SectionId=IAR01&DistId=IAR",
        "sourceType": "official public operator (Ministry of Culture and Tourism, muze.gov.tr)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page is marked \"AÇIK\" (open) and carries a dated notice: \"24.10.2026 tarihinde 1 gün kapalı olacaktır\" (closed for one day on 24 October 2026)."
      },
      "Galata Tower Museum": {
        "url": "https://muze.gov.tr/muze-detay?SectionId=GLT04&DistId=MRK",
        "sourceType": "official public operator (Ministry of Culture and Tourism, muze.gov.tr)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page lists daily day hours and a separate night museum session (18:30-22:00), and states that visitors under 18 must come with a parent: \"18 yaş altı çocukların ebeveynleri ile ziyaret etmeleri zorunludur.\" No 2026-dated notice."
      },
      "Hagia Sophia History and Experience Museum": {
        "url": "https://muze.gov.tr/muze-detay?SectionId=YSM01&DistId=MRK",
        "sourceType": "official public operator (Ministry of Culture and Tourism, muze.gov.tr)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page lists daily hours and a general admission price of €25, and notes \"Müzekart geçerli değildir\" (the Museum Card is not accepted). No 2026-dated notice."
      },
      "Istanbul Modern": {
        "url": "https://www.istanbulmodern.org/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions are listed, including \"Semiha Berksoy: Aria of All Colors\" (January 22 to November 22, 2026) and \"Beneath the Same Blue\" (dated September 8, 2026). Tickets are sold online through bilet.istanbulmodern.org."
      },
      "Pera Museum": {
        "url": "https://www.peramuzesi.org.tr/ziyaret",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The homepage lists current exhibitions, including \"Frank Bowling: Yaratım ve Yıkım\" and \"Osman Hamdi Bey\", plus events dated 25 October 2026. Tickets are 450 TL full and 250 TL reduced, and students enter free on Wednesdays."
      },
      "Miniaturk": {
        "url": "https://www.miniaturk.com.tr",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current ticket prices are published: \"Yabancı Bilet\" (foreign visitor) ₺900, full ₺330, and combined tickets for foreign visitors at ₺1350. No 2026-dated notice."
      },
      "Grand Bazaar": {
        "url": "https://www.kapalicarsi.com.tr/ulasim-iletisim",
        "sourceType": "official body of the bazaar's traders (Kapalı Çarşı Esnafları Derneği)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site posts 2026 news, including a 05/04/2026 item on the completed property owners' board election (\"KAPALI ÇARŞI KAT MALİKLERİ YÖNETİM KURULU SEÇİMİ TAMAMLANDI\"). The footer reads \"2026 - Kapalı Çarşı Esnafları Derneği\"."
      },
      "Mikla": {
        "url": "https://www.miklarestaurant.com/reservation",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online booking is live and asks for a card guarantee of 35 euros per person (\"No charges will be made unless there is a no-show\"). The current menu lists Mikla Tasting at 10500 TL, and the dress code is \"Smart Chic\" with tracksuits and slippers not accepted."
      },
      "Mikla Bar": {
        "url": "https://www.miklarestaurant.com",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site describes the roof terrace bar (\"Located at the top of the Marmara Pera\"), and the current menu prices Mikla Signature Cocktails at 980 TL."
      },
      "Pandeli": {
        "url": "https://www.pandeli.com.tr",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "A reservation form is live, and \"12:00 ile 18:00 arası rezervasyon talebi alınmaktadır\" (requests are taken 12:00-18:00). Bookings count only once the restaurant emails a confirmation, and guests are not seated for sweets, tea or coffee only. No 2026 content; the footer reads 2023."
      },
      "Karaköy Lokantası": {
        "url": "https://www.karakoylokantasi.com/en/info",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site publishes lunch and dinner service hours, describing lunch as an \"esnaf lokantası\" tradition and dinner as a tavern serving mezes with rakı. It has a reservation section. No 2026-dated content."
      },
      "Neolokal": {
        "url": "https://www.neolokal.com",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site has a reservation section with phone and email contacts and mentions valet service. The footer reads \"© 2026 neolokal.\""
      },
      "Petra Roasting Co. (Şişhane)": {
        "url": "https://www.petracoffee.com",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site lists current branch hours, and the footer reads \"2026 © Petra Roasting Co.\""
      },
      "Sakıp Sabancı Museum": {
        "url": "https://www.sakipsabancimuzesi.org/ziyaret",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The museum's current exhibitions include \"Yoko Ono: İçses ve İçyapı\" (\"25 Haziran - 27 Aralık 2026\"). Adult tickets are 450₺, and Tuesdays are free."
      },
      "Rahmi M. Koç Museum": {
        "url": "https://www.rmk-museum.org.tr/istanbul",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page publishes weekly hours and a current visitor notice: \"Ziyaretçilerin kullanımı için ücretli ve sınırlı sayıda otopark alanı mevcuttur\" (paid, limited parking for visitors). It links to online ticketing."
      },
      "Beylerbeyi Palace": {
        "url": "https://www.millisaraylar.gov.tr/saraylar/beylerbeyi-sarayi",
        "sourceType": "official public operator (Milli Saraylar, National Palaces Administration)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current ticket prices are listed: 800 TL for foreign adults and 100 TL for the garden only, with free entry for children aged 0-6. No 2026-dated notice; the footer reads © 2023."
      },
      "Galata Mevlevi Lodge Museum": {
        "url": "https://muze.gov.tr/muze-detay?SectionId=GLT01&DistId=MRK",
        "sourceType": "official public operator (Ministry of Culture and Tourism, muze.gov.tr)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page shows the museum's status as \"AÇIK\" (open) and lists hours and Monday closure. No 2026-dated notice and no ticket prices."
      },
      "Museum of Innocence": {
        "url": "https://www.masumiyetmuzesi.org/en/zi-yaret-gün-ve-saatleri",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current visiting information gives general admission at 750 TL and an audio guide at 50 TL. Tickets are sold at the booth Tuesday to Sunday, 10:00-17:30. No 2026-dated notice."
      },
      "Kurukahveci Mehmet Efendi (Tahmis)": {
        "url": "https://www.mehmetefendi.com/iletisim",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The contact page lists the Eminönü store as \"MERKEZ\" (head shop). The homepage runs a 2026 World Coffee Day campaign banner, and its footer reads \"© 2018–2026 Kurukahveci Mehmet Efendi\"."
      },
      "Patisserie de Pera (Pera Palace Hotel)": {
        "url": "https://perapalace.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The hotel's site lists the patisserie with daily hours, \"Haftanın Her Günü, 10:00-18:00\", alongside current hotel events such as a season-opening concert."
      },
      "Kubbeli Saloon (Pera Palace Hotel)": {
        "url": "https://perapalace.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Afternoon tea with live piano is served in the Kubbeli Saloon \"Haftanın her günü 15.00 – 18.00 arasında\" (every day 15:00-18:00)."
      },
      "Beyti": {
        "url": "https://www.beyti.com",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site lists current opening hours and reservation contacts (phone and rezervasyon@beyti.com). No 2026-dated content."
      },
      "Arkestra": {
        "url": "https://arkestra.com.tr",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online reservations are live through the site's \"RESERVE ONLINE\" link. Its upstairs Listening Room, \"An audiophile bar serving craft cocktails\", is \"Currently welcoming restaurant guests only.\""
      }
    }
  },
  "Prague, Czechia": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Prague Castle's official site (hrad.cz) refused automated reading with HTTP 403, so the castle is not included; that is not evidence of closure. Black Angel's Bar could not be read (connection reset), and U Fleků's contact page returned 404, so both are left out. Petřín Lookout Tower and the Old Town Bridge Tower are not listed on the Museum of Prague's own site, and tourism-board pages were excluded by method. Charles Bridge, Old Town Square and the Letná viewpoint are public spaces with no operator page giving operating evidence. Several places (Café Louvre, Café Savoy, Café Slavia, Kantýna, La Degustation Bohême Bourgeoise, Field, Hemingway Bar, Můj šálek kávy, both Eska branches and the House at the Golden Ring) showed current hours or booking but no 2026-dated content, and the Mucha Museum, U Zlatého tygra and Anonymous Bar carried only a 2026 copyright line. Prague Zoo's monthly hours and news gave no year. Vyšehrad and the Strahov Monastery published only partial hours, and Municipal House tour hours and Rudolfinum box-office hours were not on the pages read.",
    "sourceUrls": [
      "docs/content-research/prague-2026-10-21.md",
      "docs/content-research/prague-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Prague Castle",
        "url": "https://www.hrad.cz/en/prague-castle-for-visitors",
        "checkedOn": "2026-10-21",
        "reason": "Official site hrad.cz returned HTTP 403 Forbidden to automated reading (three pages tried); not bypassed. Not evidence of closure."
      },
      {
        "name": "Charles Bridge",
        "checkedOn": "2026-10-21",
        "reason": "Public bridge with no operator website giving an address and operating evidence; only tourism-board pages available, which are excluded."
      },
      {
        "name": "Old Town Square",
        "url": "http://prague.eu/en/object/places/101/old-town-hall-with-astronomical-clock",
        "checkedOn": "2026-10-21",
        "reason": "Public square with no operator website giving operating evidence; the Old Town Hall page is on prague.eu (Prague City Tourism, a tourism board), which is excluded."
      },
      {
        "name": "Letna viewpoint",
        "checkedOn": "2026-10-21",
        "reason": "Public park viewpoint; no official operator page reviewed with address and operating evidence."
      },
      {
        "name": "Charles Bridge at sunrise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (time-of-day variant of Charles Bridge)"
      },
      {
        "name": "Evening classical music",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (Rudolfinum added as a specific venue)"
      },
      {
        "name": "Czech pub lunch",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Vinohrady dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Bakery and coffee morning",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A cafe near Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A market breakfast in Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A dessert stop in Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Free or low-cost Old Town walk",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Public viewpoint near Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Market meal around Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A self-guided walk through Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Free museum or public garden time",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood market stop",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private guide for Charles Bridge",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A signature meal in Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A tailored day around Charles Bridge at sunrise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A private transfer between highlights",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A special evening in Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower day with a local guide",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset near Old Town Square",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Old Town evening",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A long dinner in Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A scenic morning near Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A photo-friendly walk through Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Family-friendly Charles Bridge",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Easy outing around Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed meal near Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A hands-on stop near Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A short scenic outing with room to move",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A treat everyone can agree on",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Early visit to Charles Bridge",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Old Town cafe or market",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided Letna viewpoint",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A museum or gallery at your own pace",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A people-watching break in Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A flexible afternoon with one clear anchor",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A quieter side of Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A local recommendation beyond the headline sights",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A short detour beyond Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning cafe near Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Mala Strana bakery or market",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Slow breakfast before Charles Bridge",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A local pastry to take on the road",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and a walk through Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed brunch near Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Casual lunch near Old Town Square",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Local stop around Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A market lunch in Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A quick meal between sights",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A long midday table in Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A slower dinner in Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A local specialty near Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A final-night meal away from the busiest sights",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sunset drinks near Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A local bar around Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A view-led evening near Prague Castle",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A relaxed night close to the stay",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A late drink after dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A rooftop or waterfront evening",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Local bakery near Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Mala Strana morning market",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee and pastry before Charles Bridge",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A regional sweet to take on the road",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A fresh bake near Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A pastry stop between neighborhoods",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Old Town",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A slow cafe in Mala Strana",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A final cup near Vinohrady",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A coffee stop before the first sight",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A neighborhood cafe break",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "A view with your morning coffee",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Petřín Lookout Tower",
        "url": "https://en.muzeumprahy.cz/petrin-lookout-tower/",
        "checkedOn": "2026-10-21",
        "reason": "Not listed among the Museum of Prague's buildings on its official site; the en.muzeumprahy.cz page tried does not resolve (DNS not found). Only remaining source would be a tourism board, which is excluded."
      },
      {
        "name": "Old Town Bridge Tower",
        "url": "https://en.muzeumprahy.cz/old-town-bridge-tower/",
        "checkedOn": "2026-10-21",
        "reason": "Not listed among the Museum of Prague's buildings on its official site; the en.muzeumprahy.cz page tried does not resolve (DNS not found). Only remaining source would be a tourism board, which is excluded."
      },
      {
        "name": "Clam-Gallas Palace (Museum of Prague)",
        "url": "https://www.muzeumprahy.cz/en/visit/clam-gallasuv-palac-12",
        "checkedOn": "2026-10-21",
        "reason": "Official site lists it as \"Temporarily closed\" with \"See you in spring 2028\"."
      },
      {
        "name": "U Fleků",
        "url": "https://www.ufleku.cz/en/",
        "checkedOn": "2026-10-21",
        "reason": "Home page read but gave no address, hours or 2026 content; the contact/where-to-find-us page returned HTTP 404. Not evidence of closure."
      },
      {
        "name": "Black Angel's Bar",
        "url": "https://www.blackangelsbar.cz/",
        "checkedOn": "2026-10-21",
        "reason": "Fetch failed twice (connection reset, ECONNRESET); not bypassed. Not evidence of closure."
      }
    ],
    "placeSources": {
      "National Museum (Historical Building)": {
        "url": "https://www.nm.cz/en/visit-us/buildings/historical-building-of-the-national-museum",
        "sourceType": "official public operator (National Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions include \"Maps and Atlases from the Kinsky Library\" (24 Sep 2026 – 3 Jan 2027) and \"The Dark Blue World of Jaroslav Ježek\" (23 Sep 2026 – 28 Feb 2027); Czech Press Photo 2025 runs in the New Building 12 May – 30 Nov 2026."
      },
      "National Gallery Prague (Trade Fair Palace)": {
        "url": "https://www.ngprague.cz/en/about/buildings",
        "sourceType": "official public operator (National Gallery Prague)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Home page lists \"Zbyněk Sekal — Blue Flower\" (24/9 2026 – 31/1 2027) and \"230 Years of the NGP\" (26/3 2026 – 3/1 2027) at the Trade Fair Palace, plus the Schiele drawings show \"Edith and Egon\" until 25/10 2026."
      },
      "Jewish Museum in Prague": {
        "url": "https://www.jewishmuseum.cz/en/info/visit/opening-hours/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "2026 opening-hours table and 2026 holiday closure list; events calendar for October–November 2026, including a Klezmatics concert at the Spanish Synagogue on 14 Nov 2026."
      },
      "Vyšehrad": {
        "url": "https://www.praha-vysehrad.cz/en",
        "sourceType": "official public operator (Národní kulturní památka Vyšehrad, founded by the City of Prague)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Notices dated 6 Jan 2026 (Burgrave's Residence rental offer) and 12 Jan 2026 (new electric service vehicles); a December 2025 notice says \"regular opening hours until 6:00 p.m. apply\"."
      },
      "Rudolfinum (Czech Philharmonic)": {
        "url": "https://www.ceskafilharmonie.cz/en/transport-and-parking/",
        "sourceType": "operator's own site (Czech Philharmonic)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Concert listings for Czech Philharmonic with Semyon Bychkov on 22–23 October 2026 and Czech Chamber Music Society concerts on 24 and 27 October 2026."
      },
      "Lokál Dlouhááá": {
        "url": "https://lokal-dlouha.ambi.cz/en/",
        "sourceType": "operator's own site (Ambiente)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News item dated 09/01/2026 (\"Czech lager heads to Philadelphia\") and an online reservation page; the site advises \"It gets busy, so best secure your spot in advance.\""
      },
      "Café Louvre": {
        "url": "https://www.cafelouvre.cz/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Live hours banner \"TODAY WE ARE OPEN: 08:00 – 23:30\" and an online reservation link; no 2026-dated content found."
      },
      "Café Savoy": {
        "url": "https://cafesavoy.ambi.cz/en/",
        "sourceType": "operator's own site (Ambiente)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published weekly and public-holiday hours with reservation and menu links; no 2026-dated content found and the menu page was not readable."
      },
      "Prague Zoo": {
        "url": "https://www.zoopraha.cz/en/before-visit/opening-time",
        "sourceType": "official public operator (Prague Zoo, a City of Prague organisation)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Home page news \"Prague Zoo Attracts Visitors with New Animal Babies This Autumn\" (macaque births on 25 September, 7 and 12 October, year not stated) and a promoted new Ball's Pyramid exhibition; footer \"(c) 2026\"."
      },
      "National Technical Museum": {
        "url": "https://www.ntm.cz/en",
        "sourceType": "official public operator (National Technical Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibitions \"What Made The Railways, What the Railways Made\" (3 Oct 2025 – 7 Feb 2027) and \"The Saga of the Hainz Family\" (14 Oct 2026 – 28 Mar 2027); notice that the Postal Museum in Prague reopened \"From June 11, 2026\"."
      },
      "Municipal House (Obecní dům)": {
        "url": "https://www.obecnidum.cz/en/",
        "sourceType": "operator's own site (Obecní dům, a.s., owned by the City of Prague)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Programme lists Rossini \"Le Comte Ory\" on 24 October 2026 at 19:30 in Smetana Hall and Christian Van Horn \"Devils and Kings\" on 8 November at 19:30; one event notice says \"rescheduled for 2027\"."
      },
      "Strahov Monastery": {
        "url": "https://www.strahovskyklaster.cz/en",
        "sourceType": "operator's own site (Royal Canonry of Premonstratensians at Strahov)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 13 October 2026 (\"Chapter Meeting of the Canonry\") and \"Concert in the Basilica – 23 September 2026\"."
      },
      "Mucha Museum": {
        "url": "https://www.mucha.cz/en/",
        "sourceType": "operator's own site (Muchovo muzeum s.r.o.)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published daily opening hours; only 2026 reference is the footer \"© 2026 Muchovo muzeum s.r.o.\"."
      },
      "Museum Kampa": {
        "url": "https://www.museumkampa.cz/visit/",
        "sourceType": "operator's own site (The Jan and Meda Mládek Foundation)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions \"Milan Kunc – Pop Renaissance\" and \"Mikuláš Medek, Jan Koblasa – In Defiance\" (both 3 Oct 2026 – 17 Jan 2027); all-exhibitions adult ticket 360 CZK."
      },
      "Museum of Prague (Main Building)": {
        "url": "https://www.muzeumprahy.cz/en/exhibitions-and-events/cloud",
        "sourceType": "official public operator (Museum of Prague / Prague City Museum, City of Prague)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Free interactive children's exhibition \"Cloud\", \"starting February 24, 2026\"; the page notes the museum is currently not barrier-free because of the Florenc metro reconstruction."
      },
      "House at the Golden Ring (Museum of Prague)": {
        "url": "https://www.muzeumprahy.cz/en/visit/dum-u-zlateho-prstenu-4",
        "sourceType": "official public operator (Museum of Prague / Prague City Museum, City of Prague)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibition \"Prague in the Time of Charles IV\" and a nine-metre animation of Prague under Rudolf II, with published admission (CZK 180 standard); no 2026 dates on the page."
      },
      "Café Imperial": {
        "url": "https://www.cafeimperial.cz/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Says it is \"recognised by the Michelin Guide 2026\" and lists a \"Christmas menu 25. – 27. 12. 2026\" and a New Year's Eve 2026 menu; breakfast buffet \"every day from 7:00\"."
      },
      "La Degustation Bohême Bourgeoise": {
        "url": "https://ladegustation.ambi.cz/en/",
        "sourceType": "operator's own site (Ambiente)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published daily service hours and a reservation link; no 2026-dated content found."
      },
      "Field": {
        "url": "https://www.fieldrestaurant.cz/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online and phone reservations; \"We can only hold your reservations for 15 minutes.\" Smart-casual dress code, not suitable for children under 6. No 2026-dated content found."
      },
      "Kantýna": {
        "url": "https://kantyna.ambi.cz/en/",
        "sourceType": "operator's own site (Ambiente)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published weekly hours for Kantýna and The Butchers; no 2026-dated content found."
      },
      "U Zlatého tygra": {
        "url": "https://www.uzlatehotygra.cz/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published daily hours and phone reservations (\"Rezervace na tel.\"); footer \"© 2026 U Zlatého Tygra\"."
      },
      "Hemingway Bar": {
        "url": "https://www.hemingwaybar.cz/bar-praha/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online booking form (\"Rezervace ONLINE\") and published hours; no 2026-dated content found."
      },
      "Anonymous Bar": {
        "url": "https://www.anonymousbar.cz/",
        "sourceType": "operator's own site (AnonymouS Concept s.r.o.)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Booking link (\"Rezervace\") and published hours; only 2026 reference is \"Copyright © 2011 - 2026\"."
      },
      "Café Slavia": {
        "url": "https://www.cafeslavia.cz/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current reservation rules: weekend bookings \"only from 19:00\" and none on public holidays; staff usually find a table within about 10 minutes. No 2026-dated content found."
      },
      "Můj šálek kávy": {
        "url": "https://www.mujsalekkavy.cz/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Breakfast and coffee menu links and an online reservation form; no 2026-dated content found."
      },
      "Eska (Karlín)": {
        "url": "https://eska.ambi.cz/en/",
        "sourceType": "operator's own site (Ambiente)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ground-floor bakery with brunch and a shop for \"a long breakfast or a quick lunch\"; published hours. No 2026-dated content found."
      },
      "Eska (Letná)": {
        "url": "https://eska.ambi.cz/en/",
        "sourceType": "operator's own site (Ambiente)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Sweet and savoury breakfasts to go, baked goods and Nordbeans coffee; bread made from \"three-stage rye sourdough\". No 2026-dated content found."
      },
      "Myšák (Vodičkova)": {
        "url": "https://mysak.ambi.cz/en/",
        "sourceType": "operator's own site (Ambiente)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Traditional Czech desserts and breakfasts, café downstairs with bakers upstairs; the site says a third patisserie at Prague Castle opened in 2026."
      }
    }
  },
  "Lisbon, Portugal": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read. LX Factory's page returned only encoded image data. Dear Breakfast and The Mill failed with SSL errors, and Sea Me's site refused the connection. No official site could be found for Taberna da Rua das Flores, Heim Cafe or Fauna & Flora. Red Frog and Monkey Mash publish no street address on the pages read. Padaria São Roque's operator site shows no hours or current activity. Some places were only partly published. Pastéis de Belém gives no opening times, Copenhagen Coffee Lab (Madalena) lists no hours, and Hello Kristof gives conflicting hours. Torre de Belém shows two different morning opening times. The Oceanário gives no street number. Torre de Belém, Jerónimos, Pastéis de Belém, Manteigaria and Cinco Lounge show no 2026-dated content beyond published hours or tickets. Museu Nacional do Azulejo, Museu Nacional de Arte Antiga (until 21 November) and Elevador de Santa Justa are currently closed.",
    "sourceUrls": [
      "docs/content-research/lisbon-2026-10-21.md",
      "docs/content-research/lisbon-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Alfama",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (neighbourhood)"
      },
      {
        "name": "Belem Tower area",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (area); checked as Torre de Belém instead"
      },
      {
        "name": "Miradouro viewpoints",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tram views and walking",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Pastel and coffee stops",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Free viewpoints",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Belcanto dinner",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Belcanto (confirmed separately)"
      },
      {
        "name": "Private sail on the Tagus",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Palace hotel stay",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Alfama at sunset",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Riverfront evening",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Wine bar night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tram ride",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Time Out Market snacks",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Time Out Market Lisboa (confirmed separately)"
      },
      {
        "name": "Chiado cafes",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Alfama wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Belem",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Chiado and Baixa",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (districts)"
      },
      {
        "name": "Fado night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Day trip feel from Cais do Sodre",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "LX Factory",
        "url": "https://lxfactory.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned no readable text (only encoded image data across the fetched page); address and operating status could not be read. Not evidence of closure."
      },
      {
        "name": "Taberna da Rua das Flores",
        "url": "https://www.tabernadaruadasflores.pt/",
        "checkedOn": "2026-10-21",
        "reason": "No official website found; tabernadaruadasflores.pt does not resolve (DNS ENOTFOUND) and only social media/directory listings exist, which are not accepted as evidence."
      },
      {
        "name": "Dear Breakfast",
        "url": "https://dearbreakfast.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site fetch failed with an SSL/TLS error (WRONG_VERSION_NUMBER); not bypassed. Not evidence of closure."
      },
      {
        "name": "Heim Cafe",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (only social media pages, not accepted); directory reports of a Santos relocation could not be verified."
      },
      {
        "name": "Fauna & Flora",
        "checkedOn": "2026-10-21",
        "reason": "No official website found; guessed domain faunaeflora.pt does not resolve. Only third-party listings available."
      },
      {
        "name": "Sea Me",
        "url": "https://www.peixariamoderna.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site peixariamoderna.com refused the connection (ECONNREFUSED); not bypassed. Not evidence of closure."
      },
      {
        "name": "Red Frog",
        "url": "https://www.redfrog.pt/reservas/",
        "checkedOn": "2026-10-21",
        "reason": "Official site read (hours \"Terça a Sábado: 18:00 – 01:00\", booking suggested) but no street address is published on the pages read, so it fails the address requirement."
      },
      {
        "name": "Monkey Mash",
        "url": "https://www.monkeymash.pt/",
        "checkedOn": "2026-10-21",
        "reason": "Official site read but shows no address, hours or dated content; only a 'RESERVAS' link."
      },
      {
        "name": "Padaria Sao Roque",
        "url": "https://panifsroque.pt/contactos-2/",
        "checkedOn": "2026-10-21",
        "reason": "Operator site lists the shop \"Padaria S. Roque (Patriarcal): Rua D. Pedro V, 57\" but publishes no hours and no current-operation evidence (footer \"©2015\"). Not confirmed."
      },
      {
        "name": "The Mill",
        "url": "https://themill.pt/",
        "checkedOn": "2026-10-21",
        "reason": "Official site (themill.pt) fetch failed with an SSL/TLS error (WRONG_VERSION_NUMBER); not bypassed. Not evidence of closure."
      },
      {
        "name": "Museu Nacional do Azulejo",
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/museu-nacional-do-azulejo",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Official page says \"Encerrado para obras de requalificação\" (PRR works) with no reopening date."
      },
      {
        "name": "Museu Nacional de Arte Antiga",
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/museu-nacional-de-arte-antiga",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Currently closed: \"Reabre dia 21 de novembro após obras de requalificação no âmbito do PRR\" (year not stated)."
      },
      {
        "name": "Elevador de Santa Justa",
        "url": "https://www.carris.pt/descubra/frota/elevador/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Carris page header says \"Encerrado temporariamente\" with no reopening date."
      }
    ],
    "placeSources": {
      "Torre de Belém": {
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/torre-de-belem",
        "sourceType": "official public operator (Museus e Monumentos de Portugal)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page publishes current hours, closing days and a 'Bilhete normal' of 15,00 € with an online ticket office link. It shows no 2026-dated item and the footer reads '© 2024'."
      },
      "Mosteiro dos Jerónimos": {
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/mosteiro-dos-jeronimos-e-capela-de-sao-jeronimo",
        "sourceType": "official public operator (Museus e Monumentos de Portugal)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current visiting hours for cloister and church, a standard ticket of 18,00 € with online sales, and the notice \"Bilheteiras encerram às 16h30\"."
      },
      "Padrão dos Descobrimentos": {
        "url": "https://padraodosdescobrimentos.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibition \"PADRÃO. Casa-Obsessão\" and a family Sunday event \"A Minha Casa-Obsessão\" on 25 October 2026."
      },
      "MAAT": {
        "url": "https://www.maat.pt/",
        "sourceType": "operator's own site (Fundação EDP)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibitions including \"Turn around\" at MAAT Central \"até Janeiro de 2027\" and dated events such as a visit-performance on 25/10/2026 and MAAT Friends After Hours on 28/10/2026."
      },
      "Museu Calouste Gulbenkian": {
        "url": "https://gulbenkian.pt/museu/informacoes/informacoes-contactos/",
        "sourceType": "operator's own site (Fundação Calouste Gulbenkian)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "A reopening page published 1 July 2026 says the museum reopens \"um ano e meio depois de ter encerrado para obras de renovação\". The museum page notes gallery works \"Entre 12 e 23 de outubro\" with some artworks removed, and lists \"A Coleção Imaginária\" from 21 Nov 2026 to 15 Mar 2027."
      },
      "Castelo de São Jorge": {
        "url": "https://castelodesaojorge.pt/pt/horarios",
        "sourceType": "official public operator (EGEAC, Lisbon City Council)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "A \"Programação 2026\" page covers May to October 2026, including \"Domingos no Castelo\" on the last Sunday of each month until October. The hours page notes that the castle's museum nucleus is temporarily closed while its sanitary facilities are improved."
      },
      "Oceanário de Lisboa": {
        "url": "https://www.oceanario.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© OCEANÁRIO DE LISBOA 2026\". Temporary exhibitions \"Monstros Marinhos\" and \"Universo Submerso\" are listed, with online tickets \"a partir de 25,5€\"."
      },
      "Time Out Market Lisboa": {
        "url": "https://www.timeout.pt/time-out-market-lisboa/pt",
        "sourceType": "operator's own site (Time Out)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2026 Time Out England Limited\" and a headline saying \"O Time Out Market faz 12 anos\". The page describes the market as having \"26 restaurantes, 8 bares, uma dúzia de lojas\"."
      },
      "Belcanto": {
        "url": "https://www.belcanto.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"José Avillez © 2026\", a June 2026 FAQ file and an online \"Reservar\" link. The site says emails \"não devem ser utilizados para solicitar reservas\"."
      },
      "Prado": {
        "url": "https://www.pradorestaurante.com/index2.php",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"2026 © Sweet Lisbon, Lda\" and a linked menu PDF and wine list. The on-page booking buttons are placeholders."
      },
      "Cinco Lounge": {
        "url": "https://www.cincolounge.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Open daily 8pm – 2am\", with bookings taken 20:00-22:00 by email, walk-ins accepted and a linked cocktail menu. The page has no 2026 date."
      },
      "Pastéis de Belém": {
        "url": "https://pasteisdebelem.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The homepage states \"Estamos abertos\" \"todos os dias\". The notice is undated, with no 2026 content."
      },
      "Manteigaria (Chiado)": {
        "url": "https://manteigaria.com/as-nossas-fabricas/chiado/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The branch page publishes \"Horário: 08h00 – 00h00\" and a phone number. No 2026-dated content."
      },
      "Copenhagen Coffee Lab (Madalena)": {
        "url": "https://copenhagencoffeelab.com/pages/lokation/copenhagen-coffee-lab-madalena",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2026 - Copenhagen Coffee Lab\" and a linked menu, with brunch described as \"served all day\"."
      },
      "Hello Kristof (Poço dos Negros)": {
        "url": "https://hellokristof.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2026 Hello Kristof\" and an announced \"Coffee Methods Workshop\" on \"Saturday, 21st November\" at its São Bento location."
      }
    }
  },
  "Rome, Italy": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The Colosseum and Roman Forum could not be checked because colosseo.it refused automated connections and the ticketing site showed a bot check. Galleria Borghese's site also refused connection, and Forno Campo de' Fiori, Sant'Eustachio Il Caffè, The Court, Trapizzino, Pasticceria Regoli and Panella could not be read (connection refused, redirect loop, 403, 500 or maintenance page). Roscioli publishes no street address, and no official sites were found for Barnum Cafe, Marigold, Pergamino, the Spanish Steps or Villa Borghese. Hours are not published for La Pergola, Pizzarium or the Appia Antica park. St. Peter's Basilica gives no street address, and Da Enzo al 29 does not state its Sunday status. Jerry Thomas Speakeasy's site carries no 2026-dated content beyond live hours and booking. Only 18 places were confirmed, below the 25–35 target.",
    "sourceUrls": [
      "docs/content-research/rome-2026-10-21.md",
      "docs/content-research/rome-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Colosseum",
        "url": "https://colosseo.it/orari-e-biglietti/",
        "checkedOn": "2026-10-21",
        "reason": "Official site colosseo.it refused the connection (ECONNREFUSED) on several attempts. ticketing.colosseo.it showed a browser security check, which was not bypassed. Not checked; this is not evidence of closure."
      },
      {
        "name": "Roman Forum",
        "url": "https://colosseo.it/en/",
        "checkedOn": "2026-10-21",
        "reason": "Run by the Parco archeologico del Colosseo, whose site colosseo.it refused the connection (ECONNREFUSED). Not checked."
      },
      {
        "name": "Spanish Steps",
        "checkedOn": "2026-10-21",
        "reason": "No official operator page found or read; the only pages found were tourism-board, news and a 2016 press PDF."
      },
      {
        "name": "Roscioli",
        "url": "https://www.salumeriaroscioli.com/pages/prenota",
        "checkedOn": "2026-10-21",
        "reason": "The official site publishes hours and booking rules (daily 12:30–15:30 and 19:00–23:30) but no street address for the Salumeria, so it fails the address rule. A later fetch returned HTTP 429."
      },
      {
        "name": "Barnum Cafe",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (barnumcafe.com does not resolve). Press reports say it moved in 2026, but press is not valid evidence."
      },
      {
        "name": "Marigold",
        "checkedOn": "2026-10-21",
        "reason": "No official website found. Third-party sources report it closed, but that is not valid evidence and was not verified."
      },
      {
        "name": "Pergamino Caffe",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (pergaminocaffe.it does not resolve). Third-party sources suggest the premises now house a different business; not verified."
      },
      {
        "name": "Faro",
        "url": "https://www.farorome.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site gives the address (\"Via Piave 55, 00187 RM\") but no hours or 2026-dated content (menus labelled \"OTTOBRE 25\")."
      },
      {
        "name": "Sant'Eustachio Il Caffe",
        "url": "https://www.santeustachioilcaffe.it/",
        "checkedOn": "2026-10-21",
        "reason": "The official site failed with too many redirects (.it and .com); not readable."
      },
      {
        "name": "Forno Campo de' Fiori",
        "url": "https://www.fornocampodefiori.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site refused the connection (ECONNREFUSED) on two attempts."
      },
      {
        "name": "Panella",
        "url": "https://www.panellaroma.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site shows a maintenance page (\"Il sito è attualmente in manutenzione\"), with no address, hours or current content."
      },
      {
        "name": "Le Levain",
        "url": "https://www.lelevainroma.it/trastevere/",
        "checkedOn": "2026-10-21",
        "reason": "The official site lists shops (Via Luigi Santini 22, Trastevere; Via Piave 8, Sallustiano) but no hours, menu or dated content beyond a \"© 2026\" footer. Operating evidence is insufficient."
      },
      {
        "name": "The Court",
        "url": "https://www.manfredihotels.com/en/palazzo-manfredi/the-court",
        "checkedOn": "2026-10-21",
        "reason": "The official Manfredi Hotels page returned HTTP 403 Forbidden."
      },
      {
        "name": "Villa Borghese",
        "checkedOn": "2026-10-21",
        "reason": "No official operator page found or read (guessed Sovrintendenza URL returned 404; search found only tourism-board pages)."
      },
      {
        "name": "Keyhole on Aventine Hill",
        "url": "https://www.orderofmalta.int/",
        "checkedOn": "2026-10-21",
        "reason": "The Order of Malta official site gives no visitor information, address or hours for the Villa del Priorato keyhole."
      },
      {
        "name": "Galleria Borghese (gap candidate)",
        "url": "https://galleriaborghese.cultura.gov.it/en/",
        "checkedOn": "2026-10-21",
        "reason": "Official site failed: galleriaborghese.beniculturali.it does not resolve, and galleriaborghese.cultura.gov.it refused the connection."
      },
      {
        "name": "Mercato di Testaccio (gap candidate)",
        "url": "https://www.mercatoditestaccio.it/",
        "checkedOn": "2026-10-21",
        "reason": "The official site gives entrances but no hours and no 2026 content (latest item June 2025)."
      },
      {
        "name": "Trapizzino (gap candidate)",
        "url": "https://www.trapizzino.it/",
        "checkedOn": "2026-10-21",
        "reason": "The official site returned HTTP 403 Forbidden."
      },
      {
        "name": "Tazza d'Oro (gap candidate)",
        "url": "https://www.tazzadorocoffeeshop.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site lists only a Formello company address, with no Pantheon-area branch address, hours or 2026 content."
      },
      {
        "name": "Pasticceria Regoli (gap candidate)",
        "url": "https://www.pasticceriaregoli.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site returned HTTP 500 Internal Server Error."
      },
      {
        "name": "Pantheon and piazza walks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Trevi Fountain at night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Street pizza and supplì",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private Vatican tour",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury spa afternoon",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Trastevere dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Night walk past Trevi",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Colosseum family tour",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Gelato crawl",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning in Monti",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Pantheon",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided ancient Rome walk",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Appian Way bike ride",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (the park itself was checked as Parco Regionale dell'Appia Antica)"
      },
      {
        "name": "Testaccio food stop",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sant'Eustachio area coffee and cornetto",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Vatican Museums": {
        "url": "https://www.museivaticani.va/content/museivaticani/en/info/orari-musei-vaticani.html",
        "sourceType": "official public operator (Vatican Museums, Vatican City State)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The hours page lists 2026 closures, e.g. the Carriage Pavilion \"closed 20–23 October\" and regular closures on 1 November and 8, 25 and 26 December. Tickets are sold at \"tickets.museivaticani.va\", and the site warns of scam sites with similar domains."
      },
      "St. Peter's Basilica": {
        "url": "https://www.basilicasanpietro.va/en/opening-hours",
        "sourceType": "operator's own site (Basilica Papale di San Pietro)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dated 2026 news, including \"New opening hours for St Peter's Basilica\" (28 May) and a sacred music concert on Saturday 10 October. Hours are given for \"October 26, 2026 to March 28, 2027\"."
      },
      "Pantheon": {
        "url": "https://pantheonroma.com/en/",
        "sourceType": "operator's own site (\"Sito della Basilica di Santa Maria ad Martyres\")",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"BOOK NOW\" ticket link and 2026-dated news posts (e.g. 24 March, 12 March). Lists a \"First Sunday of the month free entry\" option."
      },
      "Trevi Fountain": {
        "url": "https://fontanaditrevi.roma.it/",
        "sourceType": "official public operator (Roma Capitale)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ticketing for non-residents since 2 February 2026: \"Scopri come entrare dal 2 febbraio 2026\". The inner perimeter costs €2 for non-residents. Pre-bought tickets are \"open, senza data e orario\" and cannot be refunded."
      },
      "Musei Capitolini": {
        "url": "https://www.museicapitolini.org/en/informazioni_pratiche/orari_e_indirizzi",
        "sourceType": "official public operator (Roma Capitale, Sovrintendenza Capitolina)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibition \"Diego Rivera e la costruzione dell'arte moderna in Messico nel XX secolo\" runs 09/06/2026–13/12/2026, and \"Angeli - Messaggeri, custodi e viandanti\" runs to 10/01/2027. The Horti di Mecenate halls are closed for renovation (notice of 05/08/2026)."
      },
      "Museo dell'Ara Pacis": {
        "url": "https://www.arapacis.it/en",
        "sourceType": "official public operator (Roma Capitale)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"L'Ara si rivela\" runs 27/03/2026–31/12/2026. The exhibition \"Il potere del ritratto. Egitto e Roma. I volti del Fayum\" runs 05/11/2026–02/05/2027, with advance tickets on sale."
      },
      "Galleria Doria Pamphilj": {
        "url": "https://www.doriapamphilj.it/roma/la-visita/",
        "sourceType": "operator's own site (Amministrazione Doria Pamphilj s.r.l.)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Publishes current visiting hours and ticket prices (standard €16, €17 booked online; under-12s free) with an online booking link. Footer \"©2026\"."
      },
      "Passeggiata del Pincio": {
        "url": "https://www.sovraintendenzaroma.it/i_luoghi/ville_e_parchi_storici/passeggiate_parchi_e_giardini/passeggiata_del_pincio",
        "sourceType": "official public operator (Roma Capitale, Sovrintendenza Capitolina)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Listed as \"Sempre aperto\" on a page carrying notices dated October 2026. Services include bike rental on via di Villa Medici and via dell'Orologio, and the Teatrino dei burattini S. Carlino."
      },
      "Parco Regionale dell'Appia Antica": {
        "url": "https://www.parcoappiaantica.it/",
        "sourceType": "official public operator (Ente Regionale Parco dell'Appia Antica)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 20 October 2026 (a weather alert) and 6 October 2026 (Giornata Nazionale delle Famiglie al Museo). The site has a \"Noleggio Bici Appia Antica\" link."
      },
      "Armando al Pantheon": {
        "url": "https://www.armandoalpantheon.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Copyright 2026\" and recent news items (a 1 October Hypertrattoria dinner). \"le prenotazioni sono possibili solo online\"."
      },
      "Da Enzo al 29": {
        "url": "https://www.daenzoal29.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"© 2026 Locanda Da Enzo\" with current hours. \"Non si accettano prenotazioni\": guests are seated in order of arrival."
      },
      "La Pergola": {
        "url": "https://www.romecavalieri.com/la-pergola/",
        "sourceType": "operator's own site (Rome Cavalieri, Hilton Italiana S.r.l.)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online \"Book Table\" link, reservation phone and email, and \"2026 © Hilton Italiana S.r.l.\". \"The menu offering is subject to seasonal changes.\""
      },
      "Pizzarium (Via della Meloria)": {
        "url": "https://www.bonci.it/",
        "sourceType": "operator's own site (Bonci)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Group news dated 5 October 2026 (new Termini station space \"operativo\") and \"Copyright © 2026, Bonci\". No Pizzarium-specific hours or notice."
      },
      "Supplizio": {
        "url": "https://www.supplizioroma.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2016 - 2026 Supplizio\" with published hours. There is a summer closure notice for 10–31 August, with no year given."
      },
      "Drink Kong": {
        "url": "https://www.drinkkong.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "2026 menus (wine and spirits lists dated February 2026, food menu June 2026) and online reservations for up to 6 people. No reservations after midnight."
      },
      "Jerry Thomas Speakeasy": {
        "url": "https://www.thejerrythomasproject.it/speakeasy",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published hours and a \"PRENOTA UN TAVOLO\" booking link. The newsletter sign-up gives \"la parola segreta\". No 2026-dated content (copyright \"© 2015 - 2023\")."
      },
      "Antico Forno Roscioli (Via dei Chiavari)": {
        "url": "https://www.anticofornoroscioli.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published daily hours and footer \"© 2026 Antico Forno Roscioli\"."
      },
      "Mercato Centrale Roma": {
        "url": "https://www.mercatocentrale.it/roma/info/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current events, including \"Mercato Centrale Roma compie 10 anni: un mese di eventi tra cibo, arte e cultura\" (the market opened in October 2016) and an \"Aperitivo Centrale\" series."
      }
    }
  },
  "Barcelona, Spain": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. La Boqueria's official site returned nothing readable, Fundació Joan Miró's site refused automated reading (403) and Brunells' site refused the connection, so they are not included. Bohl, Tapeo, Two Schmucks and Baluard had no reachable official website. Quimet & Quimet and Dr Stravinsky published an address but no hours or current content. Several places were only partly published: Disfrutar and Paradiso show no opening hours, the Aquarium's closing times did not load, Park Güell gives entrances but no street number, MNAC's current exhibitions are undated, and Three Marks Coffee lists two conflicting sets of hours for Ausiàs Marc. The Sagrada Família site also shows an undated notice that the Gaudí House Museum is temporarily closed. This guide has fewer than the 25-place target because of these gaps. La Boqueria and the Fundació Joan Miró were read later the same day in a browser, from their own pages, and added. La Boqueria's page shows recent news but no 2026-dated item.",
    "sourceUrls": [
      "docs/content-research/barcelona-2026-10-21.md",
      "docs/content-research/barcelona-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Gothic Quarter",
        "checkedOn": "2026-10-21",
        "reason": "neighbourhood, not a single operated place"
      },
      {
        "name": "La Boqueria grazing",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (Boqueria itself could not be read, see above)"
      },
      {
        "name": "Quimet & Quimet",
        "url": "https://quimetquimet.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site gives address (\"Carrer del Poeta Cabanyes, 25, 08004 Barcelona\") but no hours, menu, booking or dated content beyond a footer; no operating evidence"
      },
      {
        "name": "Bohl",
        "checkedOn": "2026-10-21",
        "reason": "no official website found; only third-party listings"
      },
      {
        "name": "Tapeo",
        "url": "https://tapeoborn.com/",
        "checkedOn": "2026-10-21",
        "reason": "no official website found (tapeoborn.com does not resolve); only third-party listings"
      },
      {
        "name": "Two Schmucks",
        "url": "https://www.schmuckordie.com/",
        "checkedOn": "2026-10-21",
        "reason": "no readable official site; schmuckordie.com does not resolve"
      },
      {
        "name": "Dr Stravinsky",
        "url": "https://drstravinsky.cat/contacto/",
        "checkedOn": "2026-10-21",
        "reason": "official site gives address (\"Carrer Mirallers, 5\") but no hours or dated content; no operating evidence"
      },
      {
        "name": "Baluard",
        "url": "https://www.baluard.com/",
        "checkedOn": "2026-10-21",
        "reason": "baluard.com redirects to a domain-for-sale page; no official site found"
      },
      {
        "name": "Brunells",
        "url": "https://www.brunells.cat/",
        "checkedOn": "2026-10-21",
        "reason": "official site refused connection (ECONNREFUSED); not evidence of closure"
      },
      {
        "name": "Beach and old town walking",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tapas hopping",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Bunkers del Carmel views",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (site itself confirmed as Bunkers del Carmel (MUHBA Turó de la Rovira))"
      },
      {
        "name": "Dinner at Disfrutar",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Disfrutar (confirmed)"
      },
      {
        "name": "Private Gaudí tour",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Seafront sunset charter",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Borne evening",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach sunset",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop drinks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach afternoon",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "El Born wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tapas crawl",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum and coffee day",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Poble-sec vermouth stop",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sant Antoni food scene",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Mercat de la Boqueria": {
        "url": "https://www.boqueria.barcelona/",
        "sourceType": "operator's own site (market)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The market's site publishes its opening hours (\"Dilluns a dissabte: 8:00h - 20:30h\") and recent news, including a renovation plan whose larger works are scheduled for 2027 to 2029."
      },
      "Fundació Joan Miró": {
        "url": "https://www.fmirobcn.org/en/visit-us/plan-your-visit/",
        "sourceType": "operator's own site (museum foundation)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The Plan your visit page publishes seasonal hours and says \"Monday closed. Except 8 December 2025, and 6 April, 18 and 25 May, 12 October, 28 December 2026.\" The footer reads \"© Fundació Joan Miró Barcelona 2026\"."
      },
      "Sagrada Família": {
        "url": "https://sagradafamilia.org/en/opening-hours-and-getting-here",
        "sourceType": "operator's own site (Junta Constructora / Fundació Sagrada Família)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Official ticket vendor site with \"Tickets\" and \"Choose your visit\" links; homepage lists an \"Events 2026\" programme and news items modified as late as 10/19/26."
      },
      "Park Güell": {
        "url": "https://parkguell.barcelona/en/planning-your-visit/prices-and-times",
        "sourceType": "operator's own site (official Park Güell site, Barcelona city)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage shows live ticket status (\"The availability of tickets for today is medium\") and states \"Tickets for Park Güell must be purchased in advance and online\"; news item on Barcelona 2026, World Capital of Architecture."
      },
      "Casa Batlló": {
        "url": "https://www.casabatllo.es/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Lists \"Gaudí Year 2026\" activities, \"2026 Magical Nights\" concerts, a night visit and the exhibition \"Gaudí-Miró-Gomis: Deconstructed\"."
      },
      "La Pedrera-Casa Milà": {
        "url": "https://www.lapedrera.com/en/practical-information",
        "sourceType": "operator's own site (Fundació Catalunya La Pedrera)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dated 2026 schedule; La Pedrera Sunset ticket offered \"Until 01/11/26\"; rooftop closes in rain."
      },
      "Museu Picasso": {
        "url": "https://museupicassobcn.cat/en",
        "sourceType": "official public operator (Barcelona City Council museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Announces the exhibition \"Picasso and Architecture\", 20 November 2026 to 7 March 2027."
      },
      "Museu Nacional d'Art de Catalunya (MNAC)": {
        "url": "https://www.museunacional.cat/en/opening-hours-and-prices",
        "sourceType": "official public operator (national museum of Catalonia)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions listed on the homepage, including \"Art, War & Memory\" and \"Wounded Militiaman: The Recovery of an Irredeemable Painting\" (no dates shown); current hours and free-entry rules published."
      },
      "Palau de la Música Catalana": {
        "url": "https://www.palaumusica.cat/en/getting-here_1180820",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Concert listings for 22 Oct to 9 Nov (e.g. London Philharmonic & Gardner on Oct 26) and a \"Temporada 2026-2027\" menu; guided tours bookable online."
      },
      "Barcelona Cathedral": {
        "url": "https://catedralbcn.org/en/tourist-visit/visiting-hours/",
        "sourceType": "operator's own site (Cathedral of Barcelona)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published tourist-visit hours and an online ticket shop (tickets.catedralbcn.org); no dated 2026 notice besides footer."
      },
      "Bunkers del Carmel (MUHBA Turó de la Rovira)": {
        "url": "https://www.barcelona.cat/museuhistoria/en/heritages/museum-spaces/turo-de-la-rovira",
        "sourceType": "official public operator (MUHBA, Barcelona City History Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current visiting hours published, free access; page has a heading \"From 1 August 2026:\" (no text under it) and a 2026-27 schools programme."
      },
      "L'Aquàrium de Barcelona": {
        "url": "https://www.aquariumbcn.com/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Book your ticket now!\" with current prices (adults €30, children 5-10 €23); \"Ticket office and admission close one hour before closing time.\""
      },
      "Mercat de Santa Caterina": {
        "url": "https://www.mercatsantacaterina.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published opening hours, home delivery and online shop; footer \"© 2026 - Mercat de Santa Caterina\"."
      },
      "Disfrutar": {
        "url": "https://www.disfrutarbarcelona.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"RESERVES\" booking link; menu prices marked \"Preu vigent fins 07/08/2027\"; press item dated 01/06/2026."
      },
      "El Xampanyet": {
        "url": "https://www.elxampanyet.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current weekly hours published; site states reservations are not accepted."
      },
      "Can Fisher": {
        "url": "https://www.canfisher.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"RESERVAR\" online booking; menu of \"Paellas y arroces secos, caldosos y melosos con arroz del Delta del Ebro\"."
      },
      "Paradiso": {
        "url": "https://paradiso.cat/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Número 17 en la lista de los World's 50 Best Bars 2026\"; current cocktail menu; The Macallan Experience \"todos los jueves y viernes a las 19 h\"."
      },
      "Federal Café (Gòtic)": {
        "url": "https://www.federalcafe.es/bcn-gotic",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page with current hours and linked menus (\"carta-26\")."
      },
      "Brunch & Cake (Enric Granados)": {
        "url": "https://www.brunchandcake.com/enric-granados",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page with location, menu and hours; footer \"Copyright 2026 Brunch & Cake\"."
      },
      "Hofmann Pastelería (Born)": {
        "url": "https://www.hofmannpasteleria.com/",
        "sourceType": "operator's own site (Grupo Hofmann)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online shop with seasonal Castañada products and a product labelled \"Mejor Pasta de Té de Cataluña 2026\"; delivery and takeaway in Barcelona."
      },
      "Petit Nomad (Nomad Coffee, Bergara)": {
        "url": "https://nomadcoffee.es/pages/locales-nomad-coffee-en-barcelona",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage notice: \"A partir de octubre, Petit NOMAD abre los siete días de la semana.\""
      },
      "Nomad Coffee Bar (Passatge Sert)": {
        "url": "https://nomadcoffee.es/pages/locales-nomad-coffee-en-barcelona",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Listed on the operator's current locations page with weekly hours."
      },
      "Hidden Coffee Roasters (El Born)": {
        "url": "https://hiddencoffeeroasters.com/en/tienda/coffee-shop-el-born/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page with current weekly hours; footer \"Copyright © 2026 • Hidden Coffee Roasters SL\"."
      },
      "Three Marks Coffee (Ausiàs Marc)": {
        "url": "https://www.threemarkscoffee.com/en/pages/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Contact page lists the café with hours and announces a second branch (\"Three Marks Castillejos is opening soon\"); footer \"© 2026 Three Marks Coffee\"."
      }
    }
  },
  "Tokyo, Japan": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several sites could not be read: SHIBUYA SKY and teamLab Planets returned only empty script shells, Bills returned no content, and Sushi Daiwa, Bar Benfiddich, Path and 365 Days failed DNS lookups. fuglen.com had an expired certificate, which was not bypassed. None of these failures is evidence of closure. Tsukiji Outer Market was left out only because its official pages give no postal address. Some places were published only partially: Ueno Zoo's visitor hours page did not load, Shinjuku Gyoen's hours and Narisawa's and The SG Club's hours were not published, and Narisawa's address appears only in a map link. Udon Shin, Glitch Coffee, AFURI, Fuglen Tokyo, Ivy Place and the Imperial Palace East Gardens are supported by currently published hours or booking links rather than 2026-dated content. Tokyo Skytree's stated hours were shown as 'today's' hours without a date. Fewer than 25 places were confirmed, because many input entries were generic or unreadable and the gap-candidate limit of 8 was reached. teamLab Planets TOKYO and SHIBUYA SKY were read later the same day in a browser, from their operators' own pages, and added.",
    "sourceUrls": [
      "docs/content-research/tokyo-2026-10-21.md",
      "docs/content-research/tokyo-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Shibuya Crossing",
        "checkedOn": "2026-10-21",
        "reason": "public street crossing with no operator website to check"
      },
      {
        "name": "Shinjuku",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Shibuya",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Yanaka neighborhood",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (neighbourhood)"
      },
      {
        "name": "Izakaya Toyo style food alleys",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Free skyline views",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Temple and shrine wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Omakase dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury ryokan stay extension",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private tea experience",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Ginza dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Odaiba night view",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "teamLab-style digital art",
        "url": "https://www.teamlab.art/e/planets/",
        "checkedOn": "2026-10-21",
        "reason": "Generic entry. The gap candidate teamLab Planets TOKYO was checked, but the official page returned only its title, with no address, hours or tickets."
      },
      {
        "name": "Tokyo Disney add-on",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (no specific park named)"
      },
      {
        "name": "Ramen counter crawl",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Asakusa morning",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Shinjuku night wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Depachika food halls",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Themed cafe or arcade stop",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Memory Lane izakayas",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (alley of many separate bars)"
      },
      {
        "name": "Tsukiji Outer Market",
        "url": "https://www.tsukiji.or.jp/english/calendar/",
        "checkedOn": "2026-10-21",
        "reason": "The official site shows an October 2026 calendar, 2026 news and public hours (9:00–14:00), but none of its home, English, access or calendar pages gives a postal address, so it fails the exact-address rule."
      },
      {
        "name": "Sushi Daiwa",
        "url": "https://www.sushidaiwa.co.jp/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS lookup failed (ENOTFOUND) for the presumed official domain; not evidence of closure"
      },
      {
        "name": "Bills Omotesando",
        "url": "https://bills-jp.net/",
        "checkedOn": "2026-10-21",
        "reason": "official site returned no readable content (homepage empty; branch and English pages 404)"
      },
      {
        "name": "Soba House Konjiki-Hototogisu",
        "url": "http://konjikiramen.com/",
        "checkedOn": "2026-10-21",
        "reason": "The presumed official domain redirected to konjikiramen.com, which lists a Toronto shop and an undated 'Shinjuku NEW location' address with no hours or current evidence. The operator could not be verified."
      },
      {
        "name": "Bar Benfiddich",
        "url": "https://www.benfiddich.com/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS lookup failed (ENOTFOUND) for the presumed official domain; not evidence of closure"
      },
      {
        "name": "Path",
        "url": "https://path-restaurant.tokyo/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS lookup failed (ENOTFOUND) for the presumed official domain; not evidence of closure"
      },
      {
        "name": "365 Days",
        "url": "https://www.365jours.jp/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS error (EAI_AGAIN) on three attempts; not evidence of closure"
      },
      {
        "name": "Viron",
        "url": "https://www.viron.jp/",
        "checkedOn": "2026-10-21",
        "reason": "domain viron.jp belongs to an unrelated Hamamatsu ironwork company; the bakery's official site was not identified"
      },
      {
        "name": "Koffee Mameya",
        "url": "https://koffee-mameya.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site lists shops only as map links, with no written address, hours or dated content. The Kakeru page has only a reservation link, and the Omotesando page returned 404."
      },
      {
        "name": "Hama-rikyu Gardens",
        "url": "https://www.tokyo-park.or.jp/teien/en/hama-rikyu/",
        "checkedOn": "2026-10-21",
        "reason": "The official English page gives the address '1-1, Hama Rikyu-teien, Chuo-ku, Tokyo 104-0046' but no hours or current-operation evidence. Other pages returned 404."
      },
      {
        "name": "Fuglen (fuglen.com)",
        "url": "https://www.fuglen.com/",
        "checkedOn": "2026-10-21",
        "reason": "certificate has expired on fuglen.com; not bypassed (Tokyo branch confirmed instead via fuglen.no)"
      }
    ],
    "placeSources": {
      "teamLab Planets TOKYO": {
        "url": "https://www.teamlab.art/e/planets/",
        "sourceType": "operator's own site (teamLab)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The official page gives the term as \"July 7, 2018 - End of 2027\", publishes daily hours with shorter hours on Thursday, December 31, and lists closed days of \"Thursday, November 5; Thursday, December 3\"."
      },
      "SHIBUYA SKY": {
        "url": "https://www.shibuya-scramble-square.com/sky/",
        "sourceType": "operator's own site (Shibuya Scramble Square)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The SHIBUYA SKY page shows hours of \"10:00 - 22:30\" with last entry at 21:20, a status panel dated 2026.10.21, and current notices, including a Halloween costume notice for 31 October. It says bags cannot be taken onto the rooftop."
      },
      "Senso-ji": {
        "url": "https://www.senso-ji.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News items linked as 2026-10-01, e.g. a harp and violin concert \"福祉会館にてコンサートがおこなわれた\". Main-hall hours are published."
      },
      "Meiji Jingu": {
        "url": "https://www.meijijingu.or.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 令和8年 (2026), e.g. 10月15日 \"横綱による手数入が奉納されました\". The English site says \"Meiji Jingu is open everyday\"."
      },
      "Ueno Zoo": {
        "url": "https://www.tokyo-zoo.net/zoo/ueno/",
        "sourceType": "official public operator (Tokyo Zoological Park Society, Tokyo Metropolitan zoos)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 2026.10.20 on partial path closures Oct 27–30; 2026.10.19 notice of path closures \"10月26日(月)～11月16日(月)\"; 2026.08.31 notice that some animal exhibits are halted or changed for construction until January 2027."
      },
      "Tokyo National Museum": {
        "url": "https://www.tnm.jp/?lang=en",
        "sourceType": "official public operator (National Institutes for Cultural Heritage)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current special exhibition \"Hiroshige: New Perspectives on Edo Japan\", September 29 to December 20, 2026. Honkan Room 4 closes October 26, 2026 to April 25, 2027."
      },
      "Tokyo Skytree": {
        "url": "https://en.tokyo-skytree.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Events \"DISCOVER AUTUMN at TOKYO SKYTREE\" (Sep 10–Oct 31) and \"TOKYO SKYTREE Dream Christmas 2026\" (Nov 5–Dec 25); an Oct 21 lighting-inspection notice."
      },
      "Mori Art Museum": {
        "url": "https://art-view.roppongihills.com/en/info/index.html",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Closed September 24 to October 30, 2026 for exhibition preparation. It reopens with \"Mariko Mori: All That Shines\", October 31, 2026 to March 28, 2027, and advance tickets are on sale (news dated October 13, 2026)."
      },
      "Tokyo City View": {
        "url": "https://art-view.roppongihills.com/en/info/index.html",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Its 2026 schedule shows it is closed on Tuesday, October 27, 2026 and from November 10 to 12, 2026. A combo ticket with the Mori Art Museum goes on sale October 31."
      },
      "Tokyo Metropolitan Government Building Observation Decks": {
        "url": "https://www.zaimu.metro.tokyo.lg.jp/tochousha/goannai/tenbou",
        "sourceType": "official public operator (Tokyo Metropolitan Government)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current visitor guide with \"入室料金　無料\" (free) and per-deck closing rules. The page carries a heading for an award titled \"トラベラーズチョイス アワード2026\"."
      },
      "Imperial Palace East Gardens": {
        "url": "https://www.kunaicho.go.jp/e-event/higashigyoen02.html",
        "sourceType": "official public operator (Imperial Household Agency)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current published schedule of seasonal hours and closed days, with a linked closure calendar. Admission is free. The page has no 2026-dated item."
      },
      "Shinjuku Gyoen National Garden": {
        "url": "https://policies.env.go.jp/national-garden/shinjukugyoen/index.html",
        "sourceType": "official public operator (Ministry of the Environment)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The homepage has current notices for a chrysanthemum display (菊花壇展) and early opening (早朝開園), but neither is dated. Advance web tickets are offered."
      },
      "Gonpachi (Nishi-Azabu)": {
        "url": "https://www.gonpachi.jp/nishi-azabu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 2026-09-18 announces a \"25周年記念イベント\" at the Nishi-Azabu branch, and an autumn menu ran from 9/19."
      },
      "Narisawa": {
        "url": "https://www.narisawa-yoshihiro.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site takes bookings: \"ご予約は下記の予約サイトより承っております\" (via OMAKASE) and \"お電話でのご予約は承っておりません\". There is no dated 2026 content."
      },
      "Ivy Place": {
        "url": "https://www.tysons.jp/ivyplace/access/",
        "sourceType": "operator's own site (TYSONS & COMPANY)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current meal-by-meal hours are published. The operator's news lists \"LEMON FAIR 2026\", but it is not specific to this restaurant."
      },
      "AFURI (Ebisu)": {
        "url": "https://afuri.com/findus/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The branch list gives current hours, marks the branch fully cashless and says reservations are available. There is no dated 2026 content."
      },
      "Udon Shin": {
        "url": "https://www.udonshin.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "A TableCheck reservation link and current hours are published. The only dated items are from 2023, and the site warns of \"10～15分程の待ち時間\" after ordering."
      },
      "Glitch Coffee (Jimbocho)": {
        "url": "https://glitchcoffee.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current branch hours are listed with \"NO SCHEDULED HOLIDAY\". There is no dated 2026 content."
      },
      "The SG Club": {
        "url": "https://sg-management.jp/sgclub/",
        "sourceType": "operator's own site (SG Management)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "TableCheck booking links \"Book Sip\" and \"Book Sangai\". The group site has 2026 news, e.g. 2026-10-16 \"Roku Industry Icon Award\"."
      },
      "Bar High Five": {
        "url": "https://www.barhighfive.com/map",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Notice dated 17 June 2026: \"We will close our bar on Wednesday 1st July for the inventry.\" No reservations: \"We have decided to take NO reservations from this May 2015.\""
      },
      "Fuglen Tokyo (Tomigaya)": {
        "url": "https://fuglen.no/Fuglen-Tokyo-Tomigaya",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current hours are listed, and the site describes coffee, baked goods and cocktails served \"from 7am every day\". There is no dated 2026 content."
      }
    }
  },
  "New York, United States": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read by automated fetch and were left out rather than bypassed: Top of the Rock, the American Museum of Natural History, MoMA and Grand Central Terminal (HTTP 403), The Met and the Brooklyn Museum (HTTP 429), the Guggenheim (cookie wall only), the NYPL main branch (empty page), Bubby's (connection refused), Mah-Ze-Dahr (HTTP 404) and NYC Parks' Central Park page (HTTP 403; the Conservancy site was used instead). Some places were only partly published. Crown Shy, Attaboy and Devoción showed hours but no dated content. The Whitney listed exhibitions without dates. The Frick page carried one apparently stale notice. Employees Only's reservations page may be out of date. Katz's listed weekly hours that conflict with its \"open 24 hrs on weekends\" banner. The High Line's closure notice and Central Park's event dates had no year shown. The Met, MoMA, the American Museum of Natural History, the Guggenheim and Top of the Rock were read later the same day in a browser, from their operators' own pages, and added.",
    "sourceUrls": [
      "docs/content-research/new-york-2026-10-21.md",
      "docs/content-research/new-york-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Statue of Liberty views",
        "url": "https://www.nps.gov/stli/planyourvisit/basicinfo.htm",
        "checkedOn": "2026-10-21",
        "reason": "Largely generic (views); the NPS pages read gave only a mailing address (\"1 Ellis Island, Jersey City, NJ\") and no physical-location or current hours text, deferring to the ferry concessioner."
      },
      {
        "name": "Brooklyn Bridge",
        "url": "https://www.nyc.gov/html/dot/html/infrastructure/brooklyn-bridge.shtml",
        "checkedOn": "2026-10-21",
        "reason": "NYC DOT page gives no exact access point or address and no 2026-dated content (only \"The bridge promenade will be open at all times\")."
      },
      {
        "name": "Times Square once",
        "url": "https://www.timessquarenyc.org/",
        "checkedOn": "2026-10-21",
        "reason": "Only source found is the Times Square Alliance, a district promotion organization rather than an operator or public body; treated like a tourism board."
      },
      {
        "name": "Bubby's",
        "url": "https://bubbys.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site fetch failed (connection refused); not evidence of closure."
      },
      {
        "name": "Los Tacos No. 1",
        "url": "https://lostacos1.com/locations/",
        "checkedOn": "2026-10-21",
        "reason": "Homepage and locations page returned no readable addresses or hours."
      },
      {
        "name": "Joe's Pizza (Carmine Street)",
        "url": "https://www.joespizzanyc.com/locations",
        "checkedOn": "2026-10-21",
        "reason": "Official site gives the address (7 Carmine Street) but no hours, menu notice or dated content as operating evidence."
      },
      {
        "name": "Mah-Ze-Dahr",
        "url": "https://www.mahzedahrbakery.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned HTTP 404; nothing readable. Not evidence of closure."
      },
      {
        "name": "Grand Central Terminal",
        "url": "https://www.grandcentralterminal.com/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; official site returned HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "New York Public Library (Stephen A. Schwarzman Building)",
        "url": "https://www.nypl.org/locations/schwarzman",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; page returned no readable content."
      },
      {
        "name": "Brooklyn Museum",
        "url": "https://www.brooklynmuseum.org/visit",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; official site returned HTTP 429 Too Many Requests; not bypassed."
      },
      {
        "name": "Bryant Park",
        "url": "https://bryantpark.org/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; homepage shows dated 2026 events but no address or hours, and the hours page returned 404."
      },
      {
        "name": "Brooklyn Bridge Park",
        "url": "https://www.brooklynbridgepark.org/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; hours and events shown but no street address, only pier and landing names."
      },
      {
        "name": "Dollar-slice and park time",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Michelin tasting menu",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private skyline cruise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Fifth Avenue hotel stay",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "West Village dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Jazz club night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "FAO Schwarz area",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum morning",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "SoHo shopping",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Greenwich Village cafe day",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Observation deck",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "DUMBO sunrise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "The Metropolitan Museum of Art": {
        "url": "https://www.metmuseum.org/plan-your-visit",
        "sourceType": "operator's own site (museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The Plan Your Visit page publishes current weekly hours and lists galleries currently closed for renovation, including the Cantor Roof Garden and the Modern and Contemporary galleries. It says the museum is \"Closed Thanksgiving Day, December 25, January 1, and the first Monday in May.\""
      },
      "Museum of Modern Art (MoMA)": {
        "url": "https://www.moma.org/visit",
        "sourceType": "operator's own site (museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The visit page publishes daily hours with a Friday late opening, and free Friday evenings (5:30-8:30 p.m.) for New York State residents who reserve in advance. The footer reads \"© 2026 The Museum of Modern Art\"."
      },
      "American Museum of Natural History": {
        "url": "https://www.amnh.org/plan-your-visit",
        "sourceType": "operator's own site (museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The Plan Your Visit page says \"Open daily, 10 am-5:30 pm\" and \"Closed Thanksgiving Day and Christmas Day\", offers Pay What You Wish general admission to New York State residents with ID, and lists a new exhibition that \"Opens November 16, 2026\"."
      },
      "Solomon R. Guggenheim Museum": {
        "url": "https://www.guggenheim.org/plan-your-visit",
        "sourceType": "operator's own site (museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The Plan Your Visit page gives regular hours of \"Every day, 10:30 am-5:30 pm\" and holiday hours including \"Thanksgiving Thursday, November 26, museum closed\" and \"Christmas Day, Friday, December 25, museum closed\". The footer reads \"© 2026\"."
      },
      "Top of the Rock": {
        "url": "https://www.rockefellercenter.com/tickets/top-of-the-rock-observation-deck",
        "sourceType": "operator's own site (Rockefeller Center)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The ticket page sells timed tickets online and says the deck is open \"Daily from 8 AM - 12 AM\", with \"Last entry is at 11:10 PM\"."
      },
      "Central Park": {
        "url": "https://www.centralparknyc.org/visit",
        "sourceType": "official park manager (Central Park Conservancy)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage banner \"Match Your Gift During The Fall Membership Drive!\" (donation link 'fund-2026-09') and upcoming tours listed for Oct 23 and Oct 31."
      },
      "Central Park Zoo": {
        "url": "https://centralparkzoo.com/plan-your-visit",
        "sourceType": "operator's own site (Wildlife Conservation Society)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published hours for \"April 2 — October 31, 2026\" and \"November 1, 2026 — March 2027\"; homepage daily schedule dated 2026-10-22 with penguin and sea lion feedings."
      },
      "The High Line": {
        "url": "https://www.thehighline.org/visit/",
        "sourceType": "operator's own site (Friends of the High Line)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Park update banner: \"On October 19, the section of the park between 18th Street and 23rd Street will be temporarily closed\"; footer \"© 2000 - 2026 Friends of the High Line\"."
      },
      "Staten Island Ferry": {
        "url": "https://www.siferry.com/",
        "sourceType": "official public operator (City of New York)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Notice dated 03/27/26 \"Beer is Back at the Ferry\"; site states \"The Staten Island Ferry is a free service provided by the City of New York.\""
      },
      "Roosevelt Island Tram": {
        "url": "https://www.rioc.ny.gov/community/transportation/tram",
        "sourceType": "official public operator (Roosevelt Island Operating Corporation, New York State)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current timetable published; RIOC homepage reports a 50th-anniversary celebration at Tramway Plaza on June 1 and a May 18 cabin-redesign initiative; the tram \"accepts standard MTA fares, including OMNY tap-to-pay\"."
      },
      "9/11 Memorial & Museum": {
        "url": "https://www.911memorial.org/visit",
        "sourceType": "operator's own site (National September 11 Memorial & Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Visit page with current hours and ticketing: the Museum \"requires advance ticket purchase\"; \"The Memorial is free and open to the public seven days a week\"; footer \"© 2026\"."
      },
      "Empire State Building": {
        "url": "https://www.esbnyc.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ticket booking live: 86th Floor \"from $46\", 102nd & 86th Floor \"from $81\"; all visits require a timed reservation; \"2026 Run-Up\" listed and footer \"© 2026\"."
      },
      "Whitney Museum of American Art": {
        "url": "https://www.whitney.org/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions listed, including \"Roy Lichtenstein: Like New\" and \"Dyani White Hawk: Nourish\" (no dates shown); advance tickets bookable online."
      },
      "The Frick Collection": {
        "url": "https://www.frick.org/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current gallery notices: \"The Cabinet Gallery and Anteroom are closed October 15–22\"; timed tickets bookable online ($30 adult). One notice on the page (Sunday, February 11) appears stale."
      },
      "Chelsea Market": {
        "url": "https://www.chelseamarket.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dated events including \"Live Music - Sean the Cellist: October 21, 2026\" and \"Trick-or-Treating at Chelsea Market: October 31, 2026\"."
      },
      "Smorgasburg (Williamsburg)": {
        "url": "https://www.smorgasburg.com/new-york",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Listed as an active 2026-season location on Saturdays; Central Park and World Trade Center markets shown \"Closed for the Season\"."
      },
      "Katz's Delicatessen": {
        "url": "https://katzsdelicatessen.com/address",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Live menu and Manhattan delivery ordering (Pastrami Sandwich $28.95); holiday-hours notices; footer \"© 2026 Katz's Delicatessen\"."
      },
      "Crown Shy": {
        "url": "https://www.crownshy.nyc/location/crown-shy/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Weekly hours published and an online reservation form (\"Find A Table\"); no dated content seen."
      },
      "L'Artusi": {
        "url": "https://www.lartusi.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Reservations \"release on a two-week rolling basis, each day at 9 AM\" via Resy; menu file named \"L-Artusi_Wine_New_10.16.26\"."
      },
      "Via Carota": {
        "url": "https://www.viacarota.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Menu images named \"VC MENU 10-08-2026\"; \"Walk-ins always welcome\"; footer \"Copyright Via Carota 2026\"."
      },
      "Russ & Daughters Cafe": {
        "url": "https://www.russanddaughterscafe.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current hours and policy: \"No reservations - just walk-in!\" and \"(Sorry, no takeout.)\"; menu PDFs coded 041326 and 093026."
      },
      "Clinton St. Baking Company": {
        "url": "https://www.clintonstreetbaking.com/pages/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Indoor dining, takeout and dinner hours published with a Reservations & Waitlist page; footer \"©2026 Clinton St. Baking Co.\"."
      },
      "Employees Only": {
        "url": "https://www.employeesonlynyc.com/reservations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dinner reservations on Resy; \"all cocktail and appetizer requests are seated strictly on a walk-in basis\". Page is undated and includes older outdoor-dining text."
      },
      "Attaboy": {
        "url": "https://www.attaboy.us/nyc",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published hours and booking: \"Limited reservations are available on OpenTable\", otherwise first-come, first-served; no dated content."
      },
      "Bemelmans Bar": {
        "url": "https://www.rosewoodhotels.com/en/the-carlyle-new-york/dining/bemelmans-bar",
        "sourceType": "operator's own site (Rosewood, The Carlyle)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current cover charges (tables USD 25 to 35, bar USD 20 to 25 depending on the artist) and music schedule: pianists from 5:30 pm, jazz trio from 9 pm; footer \"© 2026\"."
      },
      "Dominique Ansel Bakery (Spring Street)": {
        "url": "https://www.dominiqueanselny.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "October 2026 menu PDF (\"DAB-Menu-OCT-2026\"); parent site offers Cronut pre-orders \"for Soho pick-ups starting October 1st\"."
      },
      "Levain Bakery (West 74th Street)": {
        "url": "https://levainbakery.com/pages/west-74th-street",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page shows today's hours and a seasonal notice \"New Fall Flavors Online Now\"; footer \"©Levain Bakery 2026\"."
      },
      "La Cabra (SoHo)": {
        "url": "https://www.lacabra.com/pages/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch hours published on the locations page; site footer copyright 2026."
      },
      "Stumptown (Greenwich Village)": {
        "url": "https://www.stumptowncoffee.com/pages/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch hours published with no closure notice; footer \"©2026 Stumptown Coffee Roasters\"."
      },
      "Devoción (Williamsburg)": {
        "url": "https://www.devocion.com/pages/cafes",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Cafés page lists this branch as \"Coffee Shop & Training Lab\" with current hours; online coffee shop live. No dated content seen."
      }
    }
  },
  "Amsterdam, Netherlands": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read by automated fetch: De Kas and the City of Amsterdam pages for Vondelpark and Albert Cuyp Market (HTTP 403), Restaurant Breda and Dignita (503 or connection refused), Lot Sixty One and Hortus Botanicus (certificate errors), the Van Gogh Museum (no readable content), and the GVB ferry page (403). Tales & Spirits' domain redirects elsewhere and Door 74's site is under construction. Some places were published only partially: NEMO and ARTIS hours were not readable, the Rembrandt House Museum's closing time was cut off, the Royal Palace's daily calendar did not load, and several cafés and bakeries (Cafe de Klepel, Little Collins, Fabel Friet, Hartog's Volkoren, Bocca Coffee, De Wasserette) showed hours but no 2026-dated content, so they are marked medium confidence. Gap candidates checked exceeded eight because many failed; the confirmed total is 22, below the 25-35 target. The Van Gogh Museum was read later the same day in a browser, from its own pages, and added.",
    "sourceUrls": [
      "docs/content-research/amsterdam-2026-10-21.md",
      "docs/content-research/amsterdam-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Canal Belt",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Jordaan",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (neighbourhood)"
      },
      {
        "name": "Jordaan or De Pijp",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal walks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Market snacks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal house stay",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private boat cruise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Fine tasting menu dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal cruise at dusk",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Jordaan dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum and cafe day",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal boat ride",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum morning",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee in De Pijp",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Noord ferry exploration",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Brown cafe night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Hidden courtyard wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry to Noord",
        "url": "https://www.gvb.nl/en/visit-amsterdam/ferry",
        "checkedOn": "2026-10-21",
        "reason": "operator page (GVB) returned HTTP 403; not fetched further. (A'DAM Lookout's site mentions the free F3 ferry, used only as that venue's own travel note.)"
      },
      {
        "name": "De Kas",
        "url": "https://www.dekas.nl/en/",
        "checkedOn": "2026-10-21",
        "reason": "official site returned HTTP 403 Forbidden"
      },
      {
        "name": "Restaurant Breda",
        "url": "https://bredagroup-amsterdam.com/breda/",
        "checkedOn": "2026-10-21",
        "reason": "official site returned HTTP 503 Service Unavailable (www.restaurant-breda.nl does not resolve; breda-amsterdam.com 404)"
      },
      {
        "name": "Breda",
        "url": "https://bredagroup-amsterdam.com/breda/",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Restaurant Breda; official site HTTP 503"
      },
      {
        "name": "Dignita",
        "url": "https://www.eatwelldogood.nl/",
        "checkedOn": "2026-10-21",
        "reason": "official sites unreachable: eatwelldogood.nl HTTP 503, dignita.nl connection refused"
      },
      {
        "name": "Tales & Spirits",
        "url": "https://www.talesandspirits.com/",
        "checkedOn": "2026-10-21",
        "reason": "talesandspirits.com 301-redirects to an unrelated domain (jeremysaid.com); no official venue page readable"
      },
      {
        "name": "Door 74",
        "url": "https://www.door-74.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site shows only \"This site is currently under construction\"; no address or operating evidence"
      },
      {
        "name": "Saint-Jean",
        "checkedOn": "2026-10-21",
        "reason": "no official website found (boulangerie-saintjean.nl does not resolve); only guides/maps list it"
      },
      {
        "name": "Lot Sixty One",
        "url": "https://www.lotsixtyonecoffee.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site TLS/certificate error (TLSV1_ALERT_INTERNAL_ERROR); not bypassed"
      },
      {
        "name": "Friedhats",
        "url": "https://www.friedhats.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site lists Fuku Cafe at Bos en Lommerweg 136 but no hours or dated content; operating status not evidenced"
      },
      {
        "name": "Vondelpark",
        "url": "https://www.amsterdam.nl/en/vondelpark/",
        "checkedOn": "2026-10-21",
        "reason": "City of Amsterdam page returned HTTP 403"
      },
      {
        "name": "Heineken Experience",
        "url": "https://www.heinekenexperience.com/en/",
        "checkedOn": "2026-10-21",
        "reason": "official homepage shows no street address; contact page 404"
      },
      {
        "name": "Hortus Botanicus",
        "url": "https://www.hortusbotanicus.nl/",
        "checkedOn": "2026-10-21",
        "reason": "certificate hostname mismatch on hortusbotanicus.nl; not bypassed"
      },
      {
        "name": "Albert Cuyp Market",
        "url": "https://www.amsterdam.nl/en/markets/albert-cuyp-market/",
        "checkedOn": "2026-10-21",
        "reason": "City of Amsterdam page returned HTTP 403"
      },
      {
        "name": "Begijnhof",
        "url": "https://www.begijnhofamsterdam.nl/en/",
        "checkedOn": "2026-10-21",
        "reason": "candidate URL returned HTTP 404"
      },
      {
        "name": "Amsterdam Museum",
        "url": "https://www.amsterdammuseum.nl/en",
        "checkedOn": "2026-10-21",
        "reason": "main Kalverstraat location \"currectly closed\" for renovation; other locations listed without street addresses"
      }
    ],
    "placeSources": {
      "Van Gogh Museum": {
        "url": "https://www.vangoghmuseum.nl/en/visit/address-and-opening-hours",
        "sourceType": "operator's own site (museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The opening-hours page publishes day-by-day hours for October to December 2026, for example \"19 - 29 October: 9 am to 6 pm\". The tickets page says tickets \"are available online only\" and that every visitor needs a ticket with a start time."
      },
      "Rijksmuseum": {
        "url": "https://www.rijksmuseum.nl/en/visit",
        "sourceType": "operator's own site (national museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Visit page says \"Booking a start time is required for a visit to the Rijksmuseum\"; What's on lists 'Willem de Kooning at work' and 'Document Netherlands: New Energy' until 17 January, and 'Carel Visser in the Rijksmuseum Gardens' until 25 October as \"last chance\"."
      },
      "Anne Frank House": {
        "url": "https://www.annefrank.org/en/museum/tickets/",
        "sourceType": "operator's own site (Anne Frank House)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ticket page: \"Tickets are not sold at the door, only online\", for a set time slot; new tickets on sale every Tuesday at 10am for a visit six weeks later. Lists 2026 exceptions, e.g. 7 November 2026 9:00-18:30."
      },
      "Stedelijk Museum": {
        "url": "https://www.stedelijk.nl/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibitions page lists Yayoi Kusama (Sep 11, 2026 - Jan 17, 2027) and Adam Pendleton, 'Some Wild Kind of Language' (Oct 10, 2026 - Jan 17, 2027). Visit page asks visitors to buy tickets online in advance."
      },
      "Eye Filmmuseum": {
        "url": "https://www.eyefilm.nl/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage lists the Ulrich Seidl exhibition (19 September 2026 - 31 January 2027) and the Yuzo Kawashima film programme (22 October - 11 November 2026). Visit page notes card-only payment."
      },
      "Oude Kerk": {
        "url": "https://www.oudekerk.nl/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Lists 'Mire Lee: Vomit My Blessing' from 13 November 2026 to 14 March 2027 and the tower visit (24 April - 31 October) as \"Now on\"; notice \"Oude Kerk temporarily closed\" for 9-12 November."
      },
      "Royal Palace Amsterdam": {
        "url": "https://www.paleisamsterdam.nl/en/visit/",
        "sourceType": "official public operator (Royal Palace Amsterdam)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Banner \"OPEN: 1 October - 11 November\"; says the Palace is open more than 230 days in 2026; October 'Drawing Month'. Visitor information warns \"The Palace may be closed due to a royal event.\""
      },
      "Rembrandt House Museum": {
        "url": "https://www.rembrandthuis.nl/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Lists an autumn-holiday etching workshop (11-25 October 2026) and 'The Poor Man's Rembrandt Project' tattoo studio (26 October - 7 November 2026)."
      },
      "NEMO Science Museum": {
        "url": "https://www.nemosciencemuseum.nl/en/plan-your-visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Plan-your-visit page: \"Tickets for NEMO have a start time\" and an 'Open on Mondays' list including \"Monday 12, 19, 26 October 2026\" and \"Monday 2 November 2026\"; homepage lists Museumnacht on 7 November."
      },
      "ARTIS": {
        "url": "https://www.artis.nl/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News item dated 10 September 2026 on ARTIS-Micropia and the Rijksmuseum; \"the new ARTIS Aquarium is open again!\"; Late Afternoon Ticket on weekdays from 16:00 for €15."
      },
      "Het Scheepvaartmuseum": {
        "url": "https://www.hetscheepvaartmuseum.com/",
        "sourceType": "operator's own site (National Maritime Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage publishes current daily hours and online ticket links; footer dated 2026. No exhibition titles or dates were readable."
      },
      "A'DAM Lookout": {
        "url": "https://www.adamlookout.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online ticket sales from €16.50 with €2 off when booking online; Over the Edge swing and Skydeck; footer \"© 2026 A'DAM LOOKOUT\" and 2026 image uploads."
      },
      "Cafe de Klepel": {
        "url": "https://www.cafedeklepel.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Live reservation system: \"Je kunt bij ons tot twee maanden van tevoren reserveren\"; max 8 per table; no vegan alternative to the menu. No 2026-dated content seen."
      },
      "Bakers & Roasters (Kadijksplein)": {
        "url": "https://www.bakersandroasters.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"We mainly operate as walk-in only\" with a virtual waitlist; limited reservations only at this branch; closure notice for King's Day (27/04/2026)."
      },
      "Bakers & Roasters (De Pijp)": {
        "url": "https://www.bakersandroasters.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Walk-in with virtual waitlist; closure notice for King's Day (27/04/2026) covering both locations."
      },
      "Little Collins": {
        "url": "https://www.littlecollins.nl/home/depijp",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Brunch page states \"Walk-in only\", \"Kitchen open until 15:30\" and holiday notice \"25 & 26 Dec & 1 Jan - closed\". No 2026-dated content seen."
      },
      "Foodhallen": {
        "url": "https://foodhallen.nl/en/amsterdam/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"open van 12:00 tot 23:00, 364 dagen per jaar\"; closed 25 December, closes 20:00 on 24 and 31 December; footer \"© 2026 Foodhallen\"."
      },
      "Fabel Friet (Runstraat)": {
        "url": "https://www.fabelfriet.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch list publishes current hours for five Amsterdam branches, including Runstraat \"Maandag t/m Zondag: Open tussen 11:00 - 21:00\". No 2026-dated content seen."
      },
      "Super Lyan": {
        "url": "https://www.superlyan.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"We don't take reservations, just walk in!\"; groups over 8 book via SevenRooms; footer \"©2026 Mr Lyan and Lore Group\"."
      },
      "Vlaamsch Broodhuys (Haarlemmerstraat)": {
        "url": "https://www.vlaamschbroodhuys.nl/winkels/amsterdam",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Newsflash dated 21-10-2026 announces pumpkin cake, crunchy pumpkin muffin and stoofpeertaartje in all Baker's Cafés; Amsterdam store page lists eight branches open seven days."
      },
      "Hartog's Volkoren": {
        "url": "https://www.volkorenbrood.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Site publishes current weekly shop hours with Sunday \"Gesloten\". No 2026-dated content seen."
      },
      "Bocca Coffee (Kerkstraat)": {
        "url": "https://bocca.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Site lists the espresso bar with current weekly hours. No 2026-dated content seen."
      },
      "De Wasserette": {
        "url": "https://www.dewasserette.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"opened daily from 7.30 until 17.00\"; \"Reservations are not necessary, you can sit whenever and wherever there is a seat available.\" No 2026-dated content seen."
      }
    }
  },
  "London, United Kingdom": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-14",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Suitability and grouping are editorial judgments. Thirty distinct recommendations cover all 15 fields; repeated category appearances are not additional verified places. Sites that refused automated fetches were read in a browser; the British Museum and Hamleys showed bot checks and were not verified. The Tower of London publishes hours one day at a time; The Barbary's hours were not readable and Claridge's does not publish afternoon tea sitting times.",
    "sourceUrls": [
      "docs/content-research/london-2026-10-14.md",
      "docs/content-research/london-2026-10-14.json"
    ],
    "excludedCandidates": [
      {
        "name": "British Museum",
        "url": "https://www.britishmuseum.org/visit",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site shows a bot-check page to automated browsers. Not declared closed; the owner can confirm it in an ordinary browser."
      },
      {
        "name": "Hamleys (Regent Street)",
        "url": "https://www.hamleys.com/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site shows a bot-check page to automated browsers."
      },
      {
        "name": "Tayēr + Elementary",
        "url": "https://tayer-elementary.com/",
        "checkedOn": "2026-10-14",
        "reason": "Its own site says it is temporarily closed after a fire in the building, with no reopening date."
      }
    ],
    "placeSources": {
      "Tower of London": {
        "url": "https://www.hrp.org.uk/tower-of-london/visit/",
        "sourceType": "official public operator (Historic Royal Palaces)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The visit page sells tickets, shows opening times for the day (15 October: 09:00-17:30, last entry 16:30, last Yeoman Warder tour 15:15) and lists dated Opening Ceremony experiences until 1 November 2026. It asks visitors to check temporary route closures."
      },
      "Tower Bridge": {
        "url": "https://www.towerbridge.org.uk/plan-your-visit",
        "sourceType": "operator's own site (City of London Corporation)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open daily with tickets on sale; annual closures 24-26 December. A relaxed opening runs on the second Saturday of each month, 09:30-11:30."
      },
      "Westminster Abbey": {
        "url": "https://www.westminster-abbey.org/visit-us/opening-times-and-prices/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Sightseeing hours are published (a working church that can close at short notice); the opening-times page shows a date-specific admittance window and closed areas."
      },
      "National Gallery": {
        "url": "https://www.nationalgallery.org.uk/visiting",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Daily hours and the current 'Renoir and Love' exhibition are listed; several rooms are closed for building work (floorplan lists Rooms 1, 7, 8, 16, 17, 17a, 30, 31 and the Sunley Room)."
      },
      "Tate Modern": {
        "url": "https://www.tate.org.uk/visit/tate-modern",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current exhibitions into 2027 are listed; the Level 0 cloakroom has closed and bags larger than 55x40x20 cm are not allowed."
      },
      "St Paul's Cathedral": {
        "url": "https://www.stpauls.co.uk/planning-your-visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Sightseeing tickets are on sale Monday to Saturday; times can change for services and events, and large bags are not allowed."
      },
      "V&A South Kensington": {
        "url": "https://www.vam.ac.uk/south-kensington",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current and upcoming exhibitions are listed (Rising Voices to January 2027; Constantinople to Istanbul from 7 November 2026); closed 24-26 December."
      },
      "Natural History Museum": {
        "url": "https://www.nhm.ac.uk/visit.html",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Daily hours, free entry with optional guaranteed-entry tickets, current exhibitions, and closures on 24-26 December."
      },
      "Science Museum": {
        "url": "https://www.sciencemuseum.org.uk/visit-us",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Free pre-booked tickets required; dated autumn closures including all day on 11 November 2026; some galleries closed for building work."
      },
      "Sky Garden": {
        "url": "https://skygarden.london/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Free timed tickets (released each Monday, three weeks ahead); capacity is temporarily reduced while one lift is out of service; a dated list of hire and maintenance closures for October-December 2026."
      },
      "Leadenhall Market": {
        "url": "https://www.leadenhallmarket.co.uk/",
        "sourceType": "operator's own site (City of London Corporation)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The public areas 'remain open 24/7'; 2026 seasonal events are listed."
      },
      "Covent Garden (Market Building and Piazza)": {
        "url": "https://www.coventgarden.london/about/faqs",
        "sourceType": "estate operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The Piazza and Market Building are always open; usual shop hours and current events (lights switch-on 12 November) are published."
      },
      "Borough Market": {
        "url": "https://boroughmarket.org.uk/visit-us/",
        "sourceType": "operator's own site (Borough Market trustees)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Regular trading hours (closed Mondays) and dated festive hours from 30 November 2026 to 2 January 2027."
      },
      "Dishoom (Covent Garden)": {
        "url": "https://www.dishoom.com/covent-garden/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open all day, every day for breakfast, lunch and dinner; bookings for any group by day but only for 6 or more after 6 PM."
      },
      "The Barbary (Neal's Yard)": {
        "url": "https://www.thebarbary.co.uk/neals-yard",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Live booking widget for 2-4 people and walk-ins at the counter; hours are not shown in readable text."
      },
      "Rules": {
        "url": "https://rules.co.uk/contact/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "'Open seven days each week from 2nd March 2026' with a live booking link. No shorts or sportswear; children under 10 not admitted after 7 PM."
      },
      "Afternoon Tea at Claridge's": {
        "url": "https://www.maybourne.com/en/hotels/claridges/restaurants-bars/afternoon-tea",
        "sourceType": "hotel's official page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Served in the Foyer and Reading Room with a live booking link; a Festive Afternoon Tea replaces it from 3 November to 3 January (not 25 December). Sitting times are not published."
      },
      "Core by Clare Smyth": {
        "url": "https://www.corebyclaresmyth.com/menus/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current priced menus and an online reservation link; the whole table orders the same format."
      },
      "Padella (Borough Market)": {
        "url": "https://www.padella.co/borough-market",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A dated daily menu ('Thursday 15th October') and a virtual queue; no reservations, groups up to 6."
      },
      "Flat Iron (Covent Garden)": {
        "url": "https://flatironsteak.co.uk/restaurant/covent-garden/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Branch page with current hours and a booking link; 16 other London branches are not substituted."
      },
      "Connaught Bar": {
        "url": "https://www.maybourne.com/en/hotels/the-connaught/restaurants-bars/connaught-bar",
        "sourceType": "hotel's official page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A menu dated October 2026 and 'a no reservation policy'; Sunday hours are not published."
      },
      "Swift Soho": {
        "url": "https://www.barswift.com/swift-bar-locations",
        "sourceType": "bar's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Locations page with current hours and a booking link; walk-ins accepted."
      },
      "The Breakfast Club (Soho)": {
        "url": "https://www.thebreakfastclubcafes.com/soho",
        "sourceType": "café's own branch page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The original 2005 branch, with current hours and a menu 'available now'."
      },
      "Granger & Co. (Notting Hill)": {
        "url": "https://grangerandco.com/locations/notting-hill",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Location page with current hours (closing times are last orders); open all day, every day."
      },
      "Jolene (Newington Green)": {
        "url": "https://www.jolenebakery.com/location/jolene-newington-green",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Bakery and restaurant hours, reservations and a Christmas dates page (no year shown). Sit-in at the bakery until 11:00 Tuesday-Sunday."
      },
      "Pophams (Islington)": {
        "url": "https://www.pophamsbakery.com/pages/locations",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Locations page with current hours and live online ordering."
      },
      "Eric's Bakery (East Dulwich)": {
        "url": "https://www.ericslondon.com/pages/contact",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A neighbourhood bakery with an online shop (2026) and Thursday pre-order collections; open in person Thursday to Saturday, Friday and Saturday until sold out."
      },
      "Monmouth Coffee (Borough)": {
        "url": "https://www.monmouthcoffee.co.uk/",
        "sourceType": "roaster's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The 'Our shops' list gives this shop's address and hours; card payments only."
      },
      "Kiss the Hippo (Fitzrovia)": {
        "url": "https://kissthehippo.com/pages/locations",
        "sourceType": "roaster's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Locations page with current hours alongside 11 other cafés."
      },
      "Prufrock Coffee (Leather Lane)": {
        "url": "https://www.prufrockcoffee.com/",
        "sourceType": "café's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current hours, a priced menu and an online shop; the kitchen closes before the café."
      }
    }
  },
  "Paris, France": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-14",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Suitability and grouping are editorial judgments. Twenty-eight distinct recommendations cover all 15 fields; repeated category appearances are not additional verified places. Sites that refused automated fetches were read in a browser; Notre-Dame's site showed a bot check and was not verified. Hours are not published for Mamiche, and Palais Garnier and Jardin d'Acclimatation show times only in booking calendars.",
    "sourceUrls": [
      "docs/content-research/paris-2026-10-14.md",
      "docs/content-research/paris-2026-10-14.json"
    ],
    "excludedCandidates": [
      {
        "name": "Centre Pompidou",
        "url": "https://www.centrepompidou.fr/en/visit",
        "checkedOn": "2026-10-14",
        "reason": "Closed for renovation since 22 September 2025, with a 2030 horizon; programmes run at partner venues."
      },
      {
        "name": "Notre-Dame de Paris",
        "url": "https://www.notredamedeparis.fr/en/visit/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site shows a bot-check page to automated browsers. Not declared closed. The owner can confirm it in an ordinary browser."
      },
      {
        "name": "Père Lachaise Cemetery",
        "url": "https://www.paris.fr/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the City of Paris page could not be found by URL or site search."
      },
      {
        "name": "Le Comptoir du Relais",
        "url": "https://www.hotel-paris-relais-saint-germain.com/restaurant-le-comptoir",
        "checkedOn": "2026-10-14",
        "reason": "The hotel's page publishes no hours, menu or dated content; walk-in only."
      },
      {
        "name": "Le Servan",
        "url": "https://www.leservan.com/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site could not be read or opened."
      },
      {
        "name": "L'As du Fallafel",
        "url": null,
        "checkedOn": "2026-10-14",
        "reason": "No official website found."
      },
      {
        "name": "Candelaria",
        "url": "https://candelaria-paris.com/",
        "checkedOn": "2026-10-14",
        "reason": "Its own site gives no address or hours (only 'every day of the week' and no reservations)."
      },
      {
        "name": "Carette",
        "url": null,
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site refused connections; no branch could be confirmed."
      },
      {
        "name": "Kozy",
        "url": null,
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site could not be read; third-party addresses conflict."
      },
      {
        "name": "KB Coffee Roasters",
        "url": "https://www.kbcoffeeroasters.com",
        "checkedOn": "2026-10-14",
        "reason": "The official site gives no street address or hours for its Pigalle shop. One fetch reported text addressed to AI assistants on its homepage; it was ignored and did not reappear."
      }
    ],
    "placeSources": {
      "Eiffel Tower": {
        "url": "https://www.toureiffel.paris/en/rates-opening-times",
        "sourceType": "operator's own site (SETE)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The operator's calendar shows the tower open 9:30 AM-11 PM on 14-16 October 2026 with live attendance and weather, and says hours for later dates are published closer to the day. Last ascents 10:45 PM; access to the top can be restricted in severe weather or peak periods."
      },
      "Louvre Museum": {
        "url": "https://www.louvre.fr/en/visit/hours-admission",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current hours and 2026 rates are published, with a notice that timed reservation is required for all visitors from 17 October to 1 November 2026."
      },
      "Musée d'Orsay": {
        "url": "https://www.musee-orsay.fr/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The visit page shows today's opening, a weekly schedule and last-admission times."
      },
      "Musée de l'Orangerie": {
        "url": "https://www.musee-orangerie.fr/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The homepage shows 'Open today from 9.00am to 6.00pm' and current exhibitions 'Monet, painting time' (30 September 2026-25 January 2027) and 'Vija Celmins' (until 15 February 2027). It warns of fake booking sites and long queues."
      },
      "Sainte-Chapelle": {
        "url": "https://www.sainte-chapelle.fr/en/visit/practical-information",
        "sourceType": "official public operator (Centre des monuments nationaux)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The CMN site sells tickets at prices effective 12 January 2026 and publishes winter hours; a restoration news item carries no closure notice."
      },
      "Arc de Triomphe": {
        "url": "https://www.paris-arc-de-triomphe.fr/en/visit/practical-information",
        "sourceType": "official public operator (Centre des monuments nationaux)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Tickets on sale and guided tours listed for 24 October and 6 November 2026. The lift is under maintenance until further notice, so the terrace is stairs only (284 steps)."
      },
      "Musée Rodin": {
        "url": "https://www.musee-rodin.fr/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Tickets on sale and dated events (31 October 2026 evening; family Sundays from September 2026). The separate Meudon site is closed until spring 2027."
      },
      "Palais Garnier": {
        "url": "https://www.operadeparis.fr/en/visits/palais-garnier",
        "sourceType": "operator's own site (Opéra national de Paris)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Self-guided visit tickets are on sale online (30 days ahead) and exhibitions are dated October 2026-February 2027. Rehearsals cause frequent, unannounced auditorium closures."
      },
      "Jardin du Luxembourg": {
        "url": "https://jardin.senat.fr/infos-pratiques/horaires-douverture.html",
        "sourceType": "official public operator (French Senate)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current exhibitions on the garden railings (19 September 2026-17 January 2027) and gate hours that change twice a month with daylight."
      },
      "Jardin d'Acclimatation": {
        "url": "https://www.jardindacclimatation.fr/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Dated events (Día de los Muertos to 1 November 2026; lantern festival from 27 November 2026) and 'open every day of the year'."
      },
      "Cité des sciences et de l'industrie": {
        "url": "https://www.cite-sciences.fr/en/visit-us/opening-hours",
        "sourceType": "operator's own site (Universcience)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current exhibitions running into 2027 and special school-holiday hours for 19 October-1 November 2026."
      },
      "Marché aux Puces de Saint-Ouen": {
        "url": "https://www.pucesdeparissaintouen.com/en",
        "sourceType": "official market site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Runs every weekend of the year including public holidays; 2026 event items listed."
      },
      "Galerie Vivienne": {
        "url": "https://www.galerie-vivienne.com/",
        "sourceType": "the passage merchants' official site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "News posts dated 5, 7 and 13 October 2026; daily hours and free entry."
      },
      "Sacré-Cœur Basilica": {
        "url": "https://www.sacre-coeur-montmartre.com/en/info-and-visits/practical-information/hours-and-directions/",
        "sourceType": "operator's own site (basilica)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open every day without exception, free entry; great-organ restoration through May 2027 noted."
      },
      "Septime": {
        "url": "https://www.septime-charonne.fr/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current autumn tasting menus (5-course lunch, 7-course dinner) and an active booking link; bookings open daily at 10:00 for 21 days ahead."
      },
      "Frenchie (rue du Nil)": {
        "url": "https://www.frenchie-ruedunil.com/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current five-course set dinner menu with pairings and an active booking link. Dinner only. Not Frenchie Bar à Vins or the group's other outlets."
      },
      "Bistrot Paul Bert": {
        "url": "https://www.bistrotpaulbert.fr/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current service hours and a phone booking line (bookings by phone only)."
      },
      "Le Jules Verne": {
        "url": "https://www.restaurants-toureiffel.com/fr/restaurant-jules-verne.html",
        "sourceType": "restaurant's own site (Eiffel Tower restaurants)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Live booking link, phone and email booking, and a forward closure date of 14 July 2027. Jacket required for men; no shorts or sportswear."
      },
      "Clamato": {
        "url": "https://www.clamato-charonne.fr/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open seven days with published service times; no reservations (walk-in only)."
      },
      "Breizh Café (Marais)": {
        "url": "https://www.breizhcafe.com/le-marais",
        "sourceType": "restaurant group's own branch page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Live booking link and phone line for this branch; other Breizh Café branches are not substituted."
      },
      "Little Red Door": {
        "url": "https://www.lrdparis.com/",
        "sourceType": "bar's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current menu ('Technics for Future Farming'), a booking link and 'Open 7/7 17h-01h, walk-ins welcomed'."
      },
      "Bar Hemingway (Ritz Paris)": {
        "url": "https://www.ritzparis.com/hotel/paris/bars-restaurants",
        "sourceType": "hotel's official page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The Ritz's bars page lists Bar Hemingway 'every day from 05:00pm to 12:00am, no booking required', tapas 5:30-10:30 PM."
      },
      "Holybelly": {
        "url": "https://holybellycafe.com",
        "sourceType": "café's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A dated 2026 closure calendar and daily hours (last food order 16:00)."
      },
      "Du Pain et des Idées": {
        "url": "https://dupainetdesidees.com/boulangerie",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Address, weekday hours and weekend closure; weekly workshops promoted (site 2025-2026)."
      },
      "Poilâne (rue du Cherche-Midi)": {
        "url": "https://www.poilane.com/pages/boulangerie-poilane-saint-germain-des-pres",
        "sourceType": "bakery's own shop page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The original shop's page lists current weekly hours; no shop closure notice."
      },
      "Mamiche (rue du Château d'Eau)": {
        "url": "https://www.mamiche.fr",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Listed with address and phone; the site says delivery has ended and invites customers to the shops. Hours are not published."
      },
      "Terres de Café (Rambuteau)": {
        "url": "https://www.terresdecafe.com/fr/content/70-nos-boutiques",
        "sourceType": "roaster's own shop list",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The shop list gives this branch's phone and weekly hours; an active online shop."
      },
      "Coutume Café (Babylone)": {
        "url": "https://www.coutumecafe.com/pages/cafe-babylone",
        "sourceType": "café's own branch page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Branch page with brunch description and table reservations; weekly hours shown in an embedded widget labelled 'powered by Google'."
      }
    }
  },
  "Hong Kong, China": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-06",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised service does not guarantee availability. Audience placements are editorial judgements. Missing independent corroboration is recorded, not assumed. No recommendation of inaccessible candidate sites and no inference that a fetch failure means closure.",
    "sourceUrls": [
        "https://www.discoverhongkong.com/eng/index.html"
    ],
    "placeSources": {
        "M+": {
            "sourcedFor": "bestAttractions",
            "url": "https://www.mplus.org.hk/en/plan-your-visit/",
            "locationSourceUrl": "https://www.mplus.org.hk/en/plan-your-visit/",
            "checkedOn": "2026-10-06",
            "sourceType": "official museum operator",
            "address": "38 Museum Drive, West Kowloon Cultural District, Kowloon",
            "operatingEvidence": "Current ticket information, opening days and getting-here directions. Free public spaces listed separately from paid gallery access.",
            "independentCorroborationUrls": [],
            "budgetScope": "Mediatheque, Grand Stair except ticketed events, B1, B2, Found Space and Roof Garden advertised as free; not all exhibitions."
        },
        "Star Ferry (Central-Tsim Sha Tsui)": {
            "sourcedFor": "bestFirstTimers",
            "url": "https://www.starferry.com.hk/en/service",
            "locationSourceUrl": "https://www.starferry.com.hk/en/pier",
            "checkedOn": "2026-10-06",
            "sourceType": "official ferry operator",
            "address": "Central and Tsim Sha Tsui Star Ferry piers",
            "operatingEvidence": "Current Central-Tsim Sha Tsui timetable and operator pier information. Sailing times can vary with weather and traffic. Harbour tours are a separate service.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-star-ferry-pier.html"
            ]
        },
        "PMQ": {
            "sourcedFor": "bestUnique",
            "url": "https://www.pmq.org.hk/tourist-information/explore-pmq/?lang=en",
            "locationSourceUrl": "https://www.pmq.org.hk/the-site/location-transportation/",
            "checkedOn": "2026-10-06",
            "sourceType": "official venue operator",
            "address": "35 Aberdeen Street, Central",
            "operatingEvidence": "Current studio/shop visitor information and walking routes from MTR stations. Individual tenant and event hours differ; no specific workshop or free admission promise.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/tc/place-to-go/travel.guide-pmq.html"
            ]
        },
        "Bakehouse (Wan Chai)": {
            "sourcedFor": "bestBreakfast",
            "url": "https://www.bakehouse.hk/wanchai-cafe-menu",
            "locationSourceUrl": "https://www.bakehouse.hk/locations",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own site",
            "address": "G/F, 14 Tai Wong Street East, Wan Chai",
            "operatingEvidence": "Current dine-in breakfast, brunch and pastry menus; branch hours and reservation link. Other branches include takeaway-only locations and are not substituted.",
            "independentCorroborationUrls": []
        },
        "Duddell's (Central)": {
            "sourcedFor": "bestLunch",
            "url": "https://duddells.co/",
            "locationSourceUrl": "https://duddells.co/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own site",
            "address": "Levels 3 and 4, 1 Duddell Street, Central",
            "operatingEvidence": "Current lunch and dinner menus, reservations and contact address after renovation. Main dining room and Upper Room have different service arrangements. Airport branch is not substituted.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-duddell-s.html"
            ]
        },
        "Lung King Heen": {
            "sourcedFor": "bestDinner",
            "url": "https://www.fourseasons.com/hongkong/dining/restaurants/lung_king_heen/",
            "locationSourceUrl": "https://www.fourseasons.com/hongkong/getting-here/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own hotel site",
            "address": "4/F, Four Seasons Hotel Hong Kong, 8 Finance Street, Central",
            "operatingEvidence": "Current lunch/dinner service, menus and reservations. Weekday child-age restrictions are advertised. Getting-here page notes IFC escalator maintenance September 1-November 30, 2026 and lift access.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-lung-king-heen.html"
            ]
        },
        "ARGO": {
            "sourcedFor": "bestCocktails",
            "url": "https://www.fourseasons.com/hongkong/dining/lounges/argo/",
            "locationSourceUrl": "https://www.fourseasons.com/hongkong/getting-here/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own hotel site",
            "address": "1/F, Four Seasons Hotel Hong Kong, 8 Finance Street, Central",
            "operatingEvidence": "Current evening hours, cocktail menu and reservation contact; non-hotel guests welcome. Directions identify current hotel entrance arrangements. Not presented as unrestricted children's access.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-argo.html"
            ]
        },
        "noc (Tsim Sha Tsui, Sun Arcade)": {
            "sourcedFor": "bestCoffee",
            "url": "https://noc.coffee/menu/",
            "locationSourceUrl": "https://noc.coffee/locations/tsim-sha-tsui/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own site",
            "address": "Shop 02, UG/F, The Sun Arcade, 28 Canton Road, Tsim Sha Tsui",
            "operatingEvidence": "Current branch address, weekday/weekend hours and coffeehouse/brunch description. Menu advertises coffee. Not the Empire Centre branch; Graham Street was not found in the current location list and is not used.",
            "additionalCheckedUrls": [
                "https://noc.coffee/location/"
            ],
            "independentCorroborationUrls": []
        }
    }
},
  "Hanoi, Vietnam": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Operator website review, not a visit or telephone confirmation. Current advertised service is not guaranteed availability. Category grouping is editorial. Unreadable and conflicting candidates were omitted; bakery and budget fields remain empty. Own-site pages are not independent corroboration.",
    sourceUrls: ["https://vietnam.travel/vi/places-to-go/northern-vietnam/ha-noi"],
    placeSources: {
      "Temple of Literature": { sourcedFor: "bestAttractions", url: "https://vanmieu.gov.vn/fr/visitor-information", locationSourceUrl: "https://vanmieu.gov.vn/fr/visitor-information", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visitor services and entrance at 58 Quoc Tu Giam, Hanoi. Night-ticket prices conflict; no prices or night schedule promised." },
      "Hanoi Museum": { sourcedFor: "bestAttractions", url: "https://baotanghanoi.com.vn/en/", locationSourceUrl: "https://baotanghanoi.com.vn/en/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Visitor information, tour registration and September 2026 news at Pham Hung Street, Hanoi. No specific workshop promised." },
      "Lifted Coffee & Brunch (Hang Ga)": { sourcedFor: "bestBreakfast", url: "https://www.liftedgotbrunch.com/our-story", locationSourceUrl: "https://www.liftedgotbrunch.com/reservations", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "All-day brunch, coffee and current table requests at 101 Hang Ga, Hoan Kiem, Hanoi." },
      "Cafe Giang (Nguyen Huu Huan)": { sourcedFor: "bestCoffee", url: "https://cafegiang.vn/", locationSourceUrl: "https://cafegiang.vn/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Egg coffee, current hours and contact at 39 Nguyen Huu Huan, Hanoi. Other branches are not substituted." },
      "Red Bean Ma May": { sourcedFor: "bestDinner", url: "https://mamay.redbeanrestaurants.com/about-us", locationSourceUrl: "https://mamay.redbeanrestaurants.com/about-us", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Daily breakfast and lunch/dinner service and table request form at 94 Ma May, Hanoi." },
      "Le Beaulieu": { sourcedFor: "bestLuxury", url: "https://www.sofitel-legend-metropole-hanoi.com/dining/le-beaulieu/", locationSourceUrl: "https://www.sofitel-legend-metropole-hanoi.com/dining/le-beaulieu/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menus and booking at Metropole Hanoi, 15 Ngo Quyen. Lunch, dinner and Sunday brunch schedules differ." },
      "angelina": { sourcedFor: "bestCocktails", url: "https://www.sofitel-legend-metropole-hanoi.com/dining/angelina/", locationSourceUrl: "https://www.sofitel-legend-metropole-hanoi.com/dining/angelina/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cocktail/whisky lounge and table booking at Metropole Hanoi, 15 Ngo Quyen. Not a children's activity." },
      "KOTO Van Mieu": { sourcedFor: "bestLunch", url: "https://www.koto.com.au/koto-enterprise/koto-van-mieu", locationSourceUrl: "https://www.koto.com.au/reserve-a-table", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menu, dining service and booking at 35 Van Mieu, Hanoi. Older leads show 59 Van Mieu; current operator address controls. Floors are not counted as separate places." }
    }
  },
  "Berlin, Germany": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Official operator website review, not a visit or telephone confirmation. Current advertised access and reservations do not guarantee availability. Categories express editorial suitability. Unresolved venues omitted. Own-site pages are not independent corroboration. Public historical sites are scoped to their named locations, not a foundation mailing address.",
    sourceUrls: ["https://www.visitberlin.de/en"],
    placeSources: {
      "Neues Museum": { sourcedFor: "bestAttractions", url: "https://www.smb.museum/en/museums-institutions/neues-museum/plan-your-visit/", locationSourceUrl: "https://www.smb.museum/en/museums-institutions/neues-museum/plan-your-visit/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and visitor hours; entrance through James Simon Galerie, Bodestrasse, Berlin. Future maintenance dates are listed." },
      "Berlin Wall Memorial": { sourcedFor: "bestAttractions", url: "https://www.stiftung-berliner-mauer.de/en/berlin-wall-memorial", locationSourceUrl: "https://www.stiftung-berliner-mauer.de/en/berlin-wall-memorial", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current outdoor/indoor exhibitions and education identify historical site on Bernauer Strasse. No foundation-office address used as visitor entrance." },
      "Museum fuer Naturkunde Berlin": { sourcedFor: "bestKids", url: "https://www.museumfuernaturkunde.berlin/en", locationSourceUrl: "https://www.museumfuernaturkunde.berlin/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current October events and visitor information at Invalidenstrasse 43. Specific workshops require separate date checks." },
      "DDR Museum": { sourcedFor: "bestUnique", url: "https://www.ddr-museum.de/en/visit", locationSourceUrl: "https://www.ddr-museum.de/en/visit", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, daily visitor information and address Karl-Liebknecht-Strasse 1, Berlin. Spree promenade access has stairs or steep ramp." },
      "Zoo Berlin": { sourcedFor: "bestKids", url: "https://www.zoo-berlin.de/en", locationSourceUrl: "https://www.zoo-berlin.de/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and dated visitor hours at Hardenbergplatz 8, Berlin. Aquarium admission not assumed included." },
      "East Side Gallery": { sourcedFor: "bestBudget", url: "https://www.stiftung-berliner-mauer.de/en/east-side-gallery", locationSourceUrl: "https://www.stiftung-berliner-mauer.de/en/east-side-gallery", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current historical-site information and education for the gallery on Muehlenstrasse, Berlin. Scoped as outdoor wall-art visit, not foundation office." },
      "Charlottenburg Palace (Old Palace)": { sourcedFor: "bestAttractions", url: "https://www.spsg.de/en/palaces-gardens/object/charlottenburg-palace-old-palace/", locationSourceUrl: "https://www.spsg.de/en/palaces-gardens/object/charlottenburg-palace-old-palace/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and visitor information at Spandauer Damm 10-22, Berlin. Other palace areas have different admission and access." },
      "House of Small Wonder (Auguststrasse)": { sourcedFor: "bestBreakfast", url: "https://www.houseofsmallwonder.de/find-us", locationSourceUrl: "https://www.houseofsmallwonder.de/find-us", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current brunch at Auguststrasse 11-13, Berlin. Johannisstrasse 20 remains closed. Operator warns ride-app name selection can send visitors to former address. Dinner is branded Candyman." },
      "THE BARN (Mitte)": { sourcedFor: "bestCoffee", url: "https://thebarn.de/pages/locations/mitte", locationSourceUrl: "https://thebarn.de/pages/locations/mitte", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current coffee, cakes and sandwiches with branch hours at Auguststrasse 58, Berlin." },
      "Zeit fuer Brot (Alte Schoenhauser Strasse)": { sourcedFor: "bestBakeries", url: "https://zeitfuerbrot.com/en/bakeries", locationSourceUrl: "https://zeitfuerbrot.com/en/bakeries", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current bakery branch and hours at Alte Schoenhauser Strasse 4, Berlin." },
      "Restaurant Tim Raue": { sourcedFor: "bestDinner", url: "https://tim-raue.com/", locationSourceUrl: "https://tim-raue.com/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current dinner reservation and menu links at Rudi-Dutschke-Strasse 26, Berlin. Lunch not inferred from old listings." },
      "Green Door Bar": { sourcedFor: "bestCocktails", url: "https://www.greendoor.de/de/", locationSourceUrl: "https://www.greendoor.de/de/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cocktail menu, evening service and contact at Winterfeldtstrasse 50, Berlin." },
      "Markthalle Neun": { sourcedFor: "bestLunch", url: "https://markthalleneun.de/ueber", locationSourceUrl: "https://markthalleneun.de/ueber", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current market calendar, lunch link and entrance at Eisenbahnstrasse 42/43, Berlin. Hall and individual stall hours differ." },
      "Nobelhart & Schmutzig": { sourcedFor: "bestRestaurants", url: "https://nobelhartundschmutzig.com/en/", locationSourceUrl: "https://nobelhartundschmutzig.com/en/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current dinner reservations and address Friedrichstrasse 218, Berlin. Main hours and footer disagree, so no fixed weekly schedule promised." },
      "Tempelhofer Feld": { sourcedFor: "bestBudget", url: "https://www.tempelhoferfeld.de/service-infos/besuch-planen/", locationSourceUrl: "https://www.tempelhoferfeld.de/service-infos/besuch-planen/", sourceType: "official public operator", checkedOn: "2026-10-06", operatingEvidence: "Free admission, seasonal gate hours, mapped entrances and park rules. Current development work can restrict areas." },
      "Deutsches Technikmuseum": { sourcedFor: "bestKids", url: "https://technikmuseum.berlin/", locationSourceUrl: "https://technikmuseum.berlin/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, exhibitions and visitor hours at Trebbiner Strasse 9, Berlin. Photography, film and chemistry/pharmacy exhibitions currently inaccessible. Spectrum has a different entrance." }
    }
  },
  "Vienna, Austria": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Official website review, not a visit or telephone confirmation. Current advertised visits and reservations are operating evidence, not guaranteed availability. Suitability is editorial. Cafe Central renovation excludes its Palais Ferstel branch. Unresolved bars omitted; cocktail and budget fields remain empty. No independent-source claim for multiple operator pages.",
    sourceUrls: ["https://www.wien.info/en"],
    placeSources: {
      "Schoenbrunn Palace": { sourcedFor: "bestAttractions", url: "https://www.schoenbrunn.at/en", locationSourceUrl: "https://www.schoenbrunn.at/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current palace visits, official ticket links and site information. Gardens and children's museum have separate admission arrangements." },
      "Upper Belvedere": { sourcedFor: "bestAttractions", url: "https://www.belvedere.at/en/visit/upper-belvedere", locationSourceUrl: "https://www.belvedere.at/en/visit/upper-belvedere", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current timed tickets and visiting information at Prinz Eugen Strasse 27, Vienna. Lower Belvedere is not substituted." },
      "ALBERTINA (Albertinaplatz)": { sourcedFor: "bestSolo", url: "https://www.albertina.at/en/", locationSourceUrl: "https://www.albertina.at/en/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current exhibitions and hours at Albertinaplatz 1, Vienna. ALBERTINA Modern and Klosterneuburg are other venues." },
      "Schoenbrunn Zoo": { sourcedFor: "bestKids", url: "https://www.zoovienna.at/en/zoo-and-visitors/visitor-information/", locationSourceUrl: "https://www.zoovienna.at/en/zoo-and-visitors/how-to-get-there/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current daily visits, seasonal closing and ticket links at Vienna Zoo in Schoenbrunn. Children under 14 require an adult; zoo admission distinct from palace." },
      "Natural History Museum Vienna": { sourcedFor: "bestKids", url: "https://www.nhm.at/en", locationSourceUrl: "https://www.nhm.at/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current hours, tickets and September news at Maria-Theresien-Platz, Vienna. Tuesday closure and closed galleries noted; no whole-gallery availability guarantee." },
      "Vienna State Opera": { sourcedFor: "bestCouples", url: "https://www.wiener-staatsoper.at/en/", locationSourceUrl: "https://www.wiener-staatsoper.at/en/getting-here/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current October performances and tickets at Opernring 2, Vienna. Performance choice and availability require booking." },
      "Mozarthaus Vienna": { sourcedFor: "bestUnique", url: "https://www.mozarthausvienna.at/en", locationSourceUrl: "https://www.mozarthausvienna.at/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current museum visits and October concerts at Domgasse 5, Vienna." },
      "Demel (Kohlmarkt)": { sourcedFor: "bestBakeries", url: "https://www.demel.com/", locationSourceUrl: "https://www.demel.com/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cafe and bakery service at Kohlmarkt 14, Vienna. No reservations; not an early breakfast claim." },
      "Joseph Brot (Fuehrichgasse)": { sourcedFor: "bestBreakfast", url: "https://www.joseph.co.at/en/standorte/", locationSourceUrl: "https://www.joseph.co.at/en/standorte/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current bistro menu and hours at Fuehrichgasse 6, Vienna. Kitchen finishes before bistro closing." },
      "MOTTO am Fluss": { sourcedFor: "bestLunch", url: "https://mottoamfluss.at/en/", locationSourceUrl: "https://mottoamfluss.at/en/contact/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cafe service and restaurant booking at Franz-Josefs-Kai 2, Vienna. Cafe/daytime and restaurant/evening are separate services, one recommendation." },
      "Figlmueller (Wollzeile)": { sourcedFor: "bestLunch", url: "https://www.figlmueller.at/en/wollzeile/", locationSourceUrl: "https://www.figlmueller.at/en/wollzeile/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menu and table booking at Wollzeile 5, Vienna. Other restaurant branches not interchangeable." },
      "Meissl & Schadn (Vienna)": { sourcedFor: "bestDinner", url: "https://meisslundschadn.at/en/meissl-schadn-vienna/", locationSourceUrl: "https://meisslundschadn.at/en/meissl-schadn-vienna/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menus and reservations at Schubertring 10-12, Vienna. Salzburg is a separate branch." },
      "KunstHausWien": { sourcedFor: "bestUnique", url: "https://www.kunsthauswien.com/en/", locationSourceUrl: "https://www.kunsthauswien.com/en/visit", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current daily admission and October events at Untere Weissgerberstrasse 13, Vienna. Family events have specific dates and languages." },
      "Leopold Museum": { sourcedFor: "bestSolo", url: "https://www.leopoldmuseum.org/en/visit/opening-hours", locationSourceUrl: "https://www.leopoldmuseum.org/en/visit/getting-here", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visits and group booking at Museumsplatz 1, MuseumsQuartier, Vienna. Tuesday closure noted." },
      "St. Stephen's Cathedral": { sourcedFor: "bestAttractions", url: "https://www.stephanskirche.at/", locationSourceUrl: "https://www.stephanskirche.at/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visitor times, tours and address Stephansplatz 3, Vienna. Worship and visitor hours differ; liturgical changes possible." }
    }
  },
  "Munich, Germany": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Official operator website review, not a visit or telephone confirmation. Current advertised service and admission do not guarantee availability. Category suitability is editorial. Unresolved candidates omitted. Lenbachhaus scope excludes closed Kunstbau. BMW Welt and Museum are separate visitor offerings. Own-site pages are not independent corroboration.",
    sourceUrls: ["https://www.munich.travel/en"],
    placeSources: {
      "Deutsches Museum (Museumsinsel)": { sourcedFor: "bestKids", url: "https://www.deutsches-museum.de/en", locationSourceUrl: "https://www.deutsches-museum.de/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, children's area and October events at Museumsinsel 1, Munich. Other museum branches not substituted." },
      "Munich Residence": { sourcedFor: "bestAttractions", url: "https://www.residenz-muenchen.de/englisch/tourist/opening.htm", locationSourceUrl: "https://www.residenz-muenchen.de/englisch/tourist/howtoget.htm", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visitor hours, ticket links and directions for Munich Residence. Treasury and theatre have different admission; no prams in exhibition rooms." },
      "BMW Welt": { sourcedFor: "bestUnique", url: "https://www.bmw-welt.com/en/index.html", locationSourceUrl: "https://www.bmw-welt.com/en/index.html", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current free building visits and Olympiazentrum directions. October 10 and October 20-22 restrictions published; check chosen date." },
      "BMW Museum": { sourcedFor: "bestAttractions", url: "https://www.bmw-welt.com/en/index.html", locationSourceUrl: "https://www.bmw-welt.com/en/index.html", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current ticketed museum visits, distinct from free BMW Welt building. Museum normally closes Mondays." },
      "Munich Documentation Centre for the History of National Socialism": { sourcedFor: "bestBudget", url: "https://www.nsdoku.de/en", locationSourceUrl: "https://www.nsdoku.de/en", sourceType: "official municipal operator", checkedOn: "2026-10-06", operatingEvidence: "Current free admission, exhibition and visitor information at Max-Mannheimer-Platz 1, Munich. Serious historical content, not children's entertainment." },
      "Augustiner Klosterwirt": { sourcedFor: "bestDinner", url: "https://www.augustiner-klosterwirt.de/index.php", locationSourceUrl: "https://www.augustiner-klosterwirt.de/index.php", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menus, reservations and service at Augustinerstrasse 1, Munich." },
      "Restaurant Tantris": { sourcedFor: "bestLuxury", url: "https://tantris.de/en/", locationSourceUrl: "https://tantris.de/en/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current lunch/dinner reservations at Johann-Fichte-Strasse 7, Munich. Tantris DNA is a different restaurant; closed Sunday through Tuesday." },
      "Rischart (Cafe am Marienplatz)": { sourcedFor: "bestBakeries", url: "https://www.rischart.de/filialen/cafes/", locationSourceUrl: "https://www.rischart.de/filialen/cafes/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cafe hours, breakfast, meals and cakes at Marienplatz 18, Munich." },
      "Hofbraeuhaus Muenchen": { sourcedFor: "bestLunch", url: "https://www.hofbraeuhaus.de/en/", locationSourceUrl: "https://www.hofbraeuhaus.de/en/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current daily dining, booking and address Platzl 9, Munich. Reservation arrangements vary by room." },
      "Schumann's Bar (Hofgarten)": { sourcedFor: "bestCocktails", url: "https://www.schumanns.de/de/schumanns-bar.html", locationSourceUrl: "https://www.schumanns.de/de/schumanns-bar.html", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current bar and food service at Odeonsplatz 6-7, Munich. Saturday closed; other Schumann's venues distinct." },
      "Man versus Machine (Glockenbach)": { sourcedFor: "bestCoffee", url: "https://mvsm.coffee/pages/mvsm-locations", locationSourceUrl: "https://mvsm.coffee/pages/mvsm-locations", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current branch hours and coffee at Muellerstrasse 23, Munich." },
      "Dallmayr Cafe Bistro": { sourcedFor: "bestBreakfast", url: "https://www.dallmayr.com/de/delikatessenhaus/cafe-bistro/", locationSourceUrl: "https://www.dallmayr.com/de/delikatessenhaus/cafe-bistro/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current breakfast, lunch, pastries and reservations at Dienerstrasse 14, Munich. Sunday and public-holiday closure noted." },
      "Hellabrunn Zoo": { sourcedFor: "bestKids", url: "https://www.hellabrunn.de/en/", locationSourceUrl: "https://www.hellabrunn.de/en/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and September news at Tierparkstrasse 30, Munich. U3 replacement service through November 28 and construction restrictions published." },
      "Alte Pinakothek": { sourcedFor: "bestAttractions", url: "https://www.pinakothek.de/en/alte-pinakothek", locationSourceUrl: "https://www.pinakothek.de/en/alte-pinakothek", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, admission and entrance via Theresienstrasse at Barer Strasse 27, Munich. Monday closure noted." },
      "Lenbachhaus": { sourcedFor: "bestSolo", url: "https://www.lenbachhaus.de/en/visit/plan-your-visit", locationSourceUrl: "https://www.lenbachhaus.de/en/visit/plan-your-visit", sourceType: "official municipal operator", checkedOn: "2026-10-06", operatingEvidence: "Current museum admission and hours at Luisenstrasse 33, Munich. Kunstbau remains closed in 2026; excluded from scope." }
    }
  },
  "Singapore, Singapore": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-06",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Website review, not a visit or telephone confirmation. Current advertised visits, menus and reservations are operating evidence, not guaranteed availability. Suitability and grouping are editorial judgments. Thirteen distinct recommendations cover all 15 fields; repeated category appearances are not additional verified places. Independent corroboration was read for National Gallery and National Kitchen; remaining records rely on their own operator. Exact hours and prices are not promised. ATLAS has inconsistent hours within its page, so confirm reservations directly.",
    sourceUrls: ["https://www.visitsingapore.com/", "https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/civic-district/national-gallery-singapore/"],
    excludedCandidates: [
      { name: "Flower Dome", url: "https://www.gardensbythebay.com.sg/en/plan-your-visit/opening-hours.html", checkedOn: "2026-10-06", reason: "Maintenance closure on the check date. Outdoor gardens are a separately scoped recommendation; no claim the whole park is closed." },
      { name: "Haw Par Villa", url: "https://www.hawparvilla.sg/", checkedOn: "2026-10-06", reason: "Earlier checkpoint found partial closure. Not included as an unrestricted park visit; no claim of permanent closure." },
      { name: "Song Fa Bak Kut Teh", url: "https://songfa.com.sg/pages/outlets", checkedOn: "2026-10-06", reason: "Readable outlet page did not expose branch details. Omitted without guessing an address or claiming closure." },
      { name: "Ya Kun Kaya Toast", url: "https://yakun.com/find-us/local/singapore", checkedOn: "2026-10-06", reason: "Operator page could not be read. Omitted without guessing branch or operating status." }
    ],
    placeSources: {
      "Gardens by the Bay outdoor gardens": { url: "https://www.gardensbythebay.com.sg/en/plan-your-visit/opening-hours.html", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Operator lists outdoor gardens at 18 Marina Gardens Drive with current daily access. Scope excludes ticketed conservatories and elevated attractions. Flower Dome has a maintenance closure on the check date; bridge works divert pedestrians. Check current notices before visiting." },
      "Singapore Botanic Gardens": { url: "https://sbg.nparks.gov.sg/visit/general-info/", sourceType: "official public operator", checkedOn: "2026-10-06", operatingEvidence: "NParks lists daily garden access, free general admission and separate National Orchid Garden charges. Tanglin entrance is served by Napier MRT; Bukit Timah entrance by Botanic Gardens MRT. Visitor maps and access arrangements are published. Not a claim every garden attraction is open." },
      "Jacob Ballas Children's Garden": { url: "https://sbg.nparks.gov.sg/visit/general-info/", sourceType: "official public operator", checkedOn: "2026-10-06", operatingEvidence: "NParks lists current visiting hours and a normally Monday closure, with public-holiday exceptions. Children up to 14 must be accompanied by adults. This is the named children's garden within Singapore Botanic Gardens, not a generic playground recommendation." },
      "National Gallery Singapore": { url: "https://www.nationalgallery.sg/sg/en/visit/visitor-information.html", sourceType: "operator's own site", secondSourceUrl: "https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/civic-district/national-gallery-singapore/", checkedOn: "2026-10-06", operatingEvidence: "Current visitor page gives 1 St Andrew's Road, advertised daily opening, tickets and accessible entrances. UOB Southeast Asia Gallery is closed until late 2027; other displays remain open. October road and entrance restrictions are described, not a whole-museum closure. Tourism board corroborates the City Hall and former Supreme Court location." },
      "ArtScience Museum": { url: "https://www.marinabaysands.com/museum.html", sourceType: "operator's own site", additionalSourceUrls: ["https://www.marinabaysands.com/museum/plan-your-visit.html"], checkedOn: "2026-10-06", operatingEvidence: "Marina Bay Sands advertises current exhibitions, tickets and daily visits. Visitor page places museum at 6 Bayfront Avenue and provides Bayfront MRT walking routes. Entry to the building and paid exhibitions differ; no promise one ticket covers all exhibits." },
      "Singapore Zoo": { url: "https://www.mandai.com/en/singapore-zoo.html", sourceType: "operator's own site", additionalSourceUrls: ["https://www.mandai.com/en/plan-your-visit/getting-to-and-around.html"], checkedOn: "2026-10-06", operatingEvidence: "Mandai advertises daily zoo opening, current ticket purchase, attraction map and visitor information. Its transport page provides routes to Mandai Wildlife Reserve. Recommendation is specifically Singapore Zoo, not every separately ticketed Mandai attraction." },
      "Candlenut": { url: "https://www.comoepicurean.com/restaurants/candlenut/", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Operator lists 17A Dempsey Road, Singapore, current lunch and dinner menus, advertised daily service and a reservation link. Peranakan cooking is described by the restaurant. Dietary needs and availability require direct confirmation." },
      "National Kitchen by Violet Oon": { url: "https://violetoon.com/national-kitchen-by-violet-oon-national-gallery-singapore/", sourceType: "operator's own site", secondSourceUrl: "https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/civic-district/national-gallery-singapore/", checkedOn: "2026-10-06", operatingEvidence: "Own page lists 1 St Andrew's Road #02-01, City Hall wing, Coleman Street access, lunch/dinner menus and booking links. High tea is Friday to Sunday rather than daily. Tourism board corroborates the named restaurant within the Gallery." },
      "JUMBO Seafood (Riverside Point)": { url: "https://www.jumboseafood.com.sg/en/riverside-point", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Exact branch page lists 30 Merchant Road #01-01/02 Riverside Point, Singapore 058282, daily service and links to current menus and reservations. Other JUMBO branches are not substituted for this address." },
      "Plain Vanilla (Tiong Bahru)": { url: "https://plainvanilla.com.sg/pages/stores", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Tiong Bahru section lists 1D Yong Siak Street, Singapore 168641, current daily service, brunch, baked goods and coffee. Hot-food service ends before cafe closing; stores do not take reservations. Holland Village's later reopening is a different branch and not recommended." },
      "Tiong Bahru Bakery (Eng Hoon Street)": { url: "https://tiongbahrubakery.com/pages/locations", sourceType: "operator's own site", additionalSourceUrls: ["https://tiongbahrubakery.com/"], checkedOn: "2026-10-06", operatingEvidence: "Own location list advertises the Tiong Bahru branch at 56 Eng Hoon Street #01-70, Singapore 160056, with current weekday/weekend hours. Own homepage describes pastries and coffee with current pickup ordering. Not confused with nearby Crumb & Go or non-Singapore branches." },
      "ATLAS": { url: "https://www.atlasbar.sg/", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Own page gives Parkview Square, 600 North Bridge Road, Singapore 188778, active dining/drink links and reservations, with evening dress rules. Top and footer hours differ; no fixed schedule is published in our guide. Verify the chosen date directly." },
      "Jigger & Pony": { url: "https://www.jiggerandpony.com/", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Own page lists Amara Singapore, 165 Tanjong Pagar Road, current cocktail and food menus, evening opening and a table reservation link. Entry is strictly for guests above 18. Not placed in the children's or breakfast fields." }
    }
  },
  "Dublin, Ireland": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-04",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Official website review, not a visit or telephone confirmation. Operating evidence means current advertised visits, service or reservations, not guaranteed availability. Public gardens are not businesses. Category suitability and suggested grouping are editorial judgments. Tourism pages were read October 3-4; operator checks were completed October 4. Independent second sources are recorded where checked; additional own-site pages are not independent corroboration. Exact prices and opening times are not promised.",
    sourceUrls: [
      "https://www.visitdublin.com/",
      "https://www.visitdublin.com/plan/getting-around",
      "https://www.visitdublin.com/guides/michelin-star-restaurants",
      "https://www.visitdublin.com/guides/best-bakeries-dublin",
      "https://www.visitdublin.com/guides/best-dublin-coffee"
    ],
    excludedCandidates: [
      { name: "Bread 41", url: "https://bread41.ie/", checkedOn: "2026-10-04", reason: "Own-site requests did not return readable operating details. Tourism coverage alone was not treated as an operator check. No closure claimed." },
      { name: "Restaurant Patrick Guilbaud", url: "https://restaurantpatrickguilbaud.ie/", checkedOn: "2026-10-04", reason: "Own-site requests were blocked. Not included without a readable current operator check; no closure claimed." },
      { name: "Chester Beatty", url: "https://chesterbeatty.ie/", checkedOn: "2026-10-04", reason: "Own visitor pages could not be read in this review. Not included on the strength of a plausible description; no closure claimed." }
    ],
    placeSources: {
      "Book of Kells Experience": {
        url: "https://www.visittrinity.ie/book-of-kells-experience/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/the-book-of-kells-experience",
        checkedOn: "2026-10-04",
        operatingEvidence: "Trinity's current page sells timed entry at College Green. Full experience includes the Old Library and Red Pavilion exhibition; library-only tickets differ. FAQ notes most Long Room books are removed except the first four bays. It describes assisted lift access and no luggage storage. Clean current page used over older referral-page prices and hours."
      },
      "Guinness Storehouse": {
        url: "https://www.guinness-storehouse.com/en/visit",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/guinness-storehouse",
        checkedOn: "2026-10-04",
        operatingEvidence: "Operator advertises bookable visitor experiences at St James's Gate, Dublin 8, including a self-guided exhibition and Gravity Bar. Ordinary Storehouse admission is distinguished from separate brewery experiences. Not placed in the children's list or described as a working-brewery tour."
      },
      "National Gallery of Ireland": {
        url: "https://www.nationalgallery.ie/visit-us/visitor-guide",
        sourceType: "official public operator",
        additionalSourceUrls: ["https://www.nationalgallery.ie/visit-us", "https://www.nationalgallery.ie/visit-us/opening-hours"],
        secondSourceUrl: "https://www.visitdublin.com/national-gallery-of-ireland",
        checkedOn: "2026-10-04",
        operatingEvidence: "Gallery lists public visiting hours and entrances at Merrion Square West and Clare Street. Permanent collection entry is free; some exhibitions charge. Individual general visits need no booking, unlike groups. Family art resources and access information are provided. No promise that every room or work is on view."
      },
      "EPIC The Irish Emigration Museum": {
        url: "https://epicchq.com/visit/epic-location-custom-house-quay/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/epic-the-irish-emigration-museum",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own visitor page gives daily opening, ticket options and CHQ, Custom House Quay, Dublin 1, D01 R9Y0. Tourism board corroborates the address and interactive, family-oriented exhibition. No fixed ticket price copied."
      },
      "MoLI - Museum of Literature Ireland": {
        url: "https://moli.ie/visit/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/moli-museum-of-literature-ireland",
        checkedOn: "2026-10-04",
        operatingEvidence: "Museum advertises visits, tickets, literary exhibits and public hours at 86 St Stephen's Green, Dublin 2. Tourism board corroborates its literary collections and location. Holiday exceptions are listed by the operator; guide does not promise every-day opening."
      },
      "St Stephen's Green walk": {
        url: "https://heritageireland.ie/places-to-visit/st-stephens-green/",
        sourceType: "official public operator",
        checkedOn: "2026-10-04",
        operatingEvidence: "OPW identifies the public park at the top of Grafton Street, free admission, paths, playground and seasonal closing times. Daytime park walk, not an invented tour business. Dog restrictions apply around the playground and water; no blanket pet-access claim."
      },
      "National Botanic Gardens (Glasnevin)": {
        url: "https://heritageireland.ie/visit/places-to-visit/national-botanic-garden/",
        sourceType: "official public operator",
        checkedOn: "2026-10-04",
        operatingEvidence: "OPW visitor page identifies Glasnevin, Dublin 9, D09 VY63, free garden admission, paid guided tours and seasonal visiting hours. Glasshouses are described but access is not guaranteed. Guide distinguishes the gardens from the compact city center; assistance-dog-only policy is not generalized to pet access."
      },
      "The Winding Stair Bookshop": {
        url: "https://www.winding-stair.com/bookshop.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/winding-stair-bookshop-and-restaurant",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own bookshop page lists public opening hours, contact details and 40 Lower Ormond Quay, Dublin 1. Tourism board identifies the ground-floor independent shop separately from the upstairs restaurant. Browsing suggestion, not a claim that an undated past author event is upcoming."
      },
      "The Winding Stair": {
        url: "https://www.winding-stair.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/winding-stair-bookshop-and-restaurant",
        checkedOn: "2026-10-04",
        operatingEvidence: "Restaurant advertises current Irish menus and table reservations at 40 Lower Ormond Quay. Lunch is Wednesday to Sunday; dinner is listed all week. Separate from the ground-floor bookshop. No unsupported accessibility claim for the upstairs dining room."
      },
      "Pickle": {
        url: "https://picklerestaurant.com/",
        sourceType: "business's own site",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site advertises North Indian cooking, menus and reservations on Camden Street. Listed service starts at 5pm weekdays and 3pm weekends, so it is not a lunch recommendation. Site explicitly says no wheelchair access and currently no takeaway. Booking restrictions differ for same-day requests."
      },
      "Chapter One by Mickael Viljanen": {
        url: "https://chapteronerestaurant.com/reserve-a-table/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://chapteronerestaurant.com/"],
        secondSourceUrl: "https://www.visitdublin.com/guides/michelin-star-restaurants",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own pages list 18-19 Parnell Square North, menus and upcoming reservation availability. Reservation terms require advance dietary discussion and state plant-based, dairy-free and egg-free diets cannot be accommodated. Recommended as a planned special meal, not a universal dietary fit."
      },
      "Glovers Alley": {
        url: "https://www.gloversalley.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/michelin-star-restaurants",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site lists 128 St Stephen's Green, lunch and dinner menus, tasting options, hours and online booking. Own current chef differs from the tourism article's older attribution; guide avoids repeating either chef or award claims."
      },
      "D'Olier Street Restaurant": {
        url: "https://www.dolierstreetrestaurant.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/michelin-star-restaurants",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site advertises a seasonal tasting menu, drinks pairings and active reservations at D'Olier Chambers, Dublin, D02 H589. Longer special-dinner suggestion, without copying a fixed menu, price or award claim."
      },
      "Brother Hubbard North (Capel Street)": {
        url: "https://brotherhubbard.ie/locations/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://brotherhubbard.ie/"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-dublin-coffee",
        checkedOn: "2026-10-04",
        operatingEvidence: "Location page identifies North at 153 Capel Street, with breakfast, brunch and lunch service, bookings and walk-ins. Explicit temporary dinner closure takes precedence over the broader overview mentioning dinner. Not included in dinner recommendations."
      },
      "Two Pups (Francis Street)": {
        url: "https://www.twopupscoffee.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/best-bakeries-dublin",
        additionalSourceUrls: ["https://www.visitdublin.com/guides/best-dublin-coffee"],
        checkedOn: "2026-10-04",
        operatingEvidence: "Own page lists a seven-day daytime cafe at 74 Francis Street, Dublin 8, with ordering and its in-house Bold Boy Bakery pastries. Tourism cafe guide describes brunch. Francis Street is distinct from the Fairview cafe and the evening Notions business at the same address."
      },
      "3fe (Grand Canal Street)": {
        url: "https://3fe.com/pages/locations/grand-canal-street",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://3fe.com/pages/locations"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-dublin-coffee",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own branch page lists 32-34 Grand Canal Street Lower, Dublin 2, public hours, booking and collection links, coffee, breakfast, lunch and brunch. Branch-specific record, not interchangeable with every 3fe location."
      },
      "Bretzel Bakery (Portobello)": {
        url: "https://www.bretzel.ie/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.bretzel.ie/contact"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-bakeries-dublin",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site actively invites visitors to the Portobello shop and supplies shop contact and map links, alongside bakery production. Tourism board places the shop on Lennox Street and describes bread, pastries and sandwiches. Exact shop hours were not visible in the fetched own-site text, so none are published."
      },
      "Il Valentino (Grand Canal Dock)": {
        url: "https://www.ilvalentino.ie/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/best-bakeries-dublin",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own current menu and contact page identifies 5 Gallery Quay, Grand Canal Dock, Dublin 2, D02 N265, with coffee, bread, pastries and food. Distinct from its Mespil Road location. No exact opening time or tourism-only additional branch repeated."
      },
      "Cloud Picker Cafe (Pearse Street)": {
        url: "https://cloudpickercoffee.ie/pages/find-us",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://cloudpickercoffee.ie/blogs/news/shortlisted-best-cafe-in-dublin"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-dublin-coffee",
        checkedOn: "2026-10-04",
        operatingEvidence: "Current Find Us page lists the Projector Room at 42 Pearse Street, Dublin, D02 KA44, with Monday-to-Saturday hours and contact. April 2026 own-site post corroborates the cafe. Not confused with airport counters or the Crumlin roastery; no Sunday visit promised."
      },
      "BAR 1661": {
        url: "https://bar1661.ie/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/bar-1661",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site lists menus and booking at 1-5 Green Street, Dublin 7; tourism board corroborates the venue. Friday opening times conflict within the own page, so exact hours are not published and visitors are told to confirm."
      },
      "Vintage Cocktail Club": {
        url: "https://vintagecocktailclub.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/vintage-cocktail-club",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site offers menus, operating hours and table bookings in Temple Bar. Tourism board corroborates 15 Crown Alley, Dublin 2, D02 E229. Not described as a children's venue or assumed step-free."
      },
      "Peruke & Periwig": {
        url: "https://www.peruke.ie/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/peruke-periwig",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site lists cocktail menus, reservations, opening information and 31 Dawson Street, Dublin 2, D02 DR58. It distinguishes the ground-floor bar from upper-floor lounges. Guide makes no blanket step-free-access claim."
      }
    }
  },
  "Edinburgh, United Kingdom": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-03",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Official website review, not a visit or telephone confirmation. Operating evidence means a venue advertises service, visits, or bookings, not guaranteed future availability. Public streets, gardens and hill walks are not businesses. Category suitability and suggested grouping are editorial judgment. Secondary sources were recorded where checked; same-operator pages are not independent corroboration. Older event dates on otherwise current sites were not reused.",
    sourceUrls: [
      "https://edinburgh.org/things-to-do/top-attractions/",
      "https://edinburgh.org/food-and-drink/fine-dining/",
      "https://edinburgh.org/food-and-drink/bakeries-and-delicatessens/",
      "https://edinburgh.org/food-and-drink/cafes-and-coffee-shops/",
      "https://edinburgh.org/food-and-drink/bars-and-pubs-in-edinburgh/",
      "https://edinburgh.org/neighbourhoods/the-royal-mile/",
      "https://edinburgh.org/inspire/edinburgh-city-guides/romantic/"
    ],
    excludedCandidates: [
      { name: "Lowdown Coffee", url: "https://www.lowdown.coffee/", checkedOn: "2026-10-03", reason: "The domain linked by the tourism board returned unrelated gambling content. Not used as operator evidence; no claim that the cafe has closed. Fortitude's Hamilton Place branch was separately checked." },
      { name: "Panda & Sons", url: "https://www.pandaandsons.com/", checkedOn: "2026-10-03", reason: "Own site returned no readable operating information in this review. Tourism listing alone was not used to claim an operator check. No closure claimed." }
    ],
    placeSources: {
      "Edinburgh Castle": {
        url: "https://www.edinburghcastle.scot/plan-your-visit/",
        sourceType: "official public operator",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Visitor page advertises admission, opening information and advance tickets, warning that entry can sell out. Tourism board locates the castle at the top of the Royal Mile."
      },
      "Royal Mile": {
        url: "https://edinburgh.org/neighbourhoods/the-royal-mile/",
        sourceType: "official tourism board",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official neighborhood page identifies the public street route between the castle and Palace of Holyroodhouse. Walking recommendation, not admission to every building or endorsement of older transport advice on the page."
      },
      "National Museum of Scotland": {
        url: "https://www.nms.ac.uk/national-museum-of-scotland",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Museum lists Chambers Street, daily visitor hours, family resources and free entry with charges for some special exhibitions. Current 2026-2027 programming also listed."
      },
      "Scottish National Gallery": {
        url: "https://www.nationalgalleries.org/visit/scottish-national-gallery",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "National Galleries' National venue at the Mound lists daily hours, free general admission and some charged exhibitions. Common Scottish National Gallery name retained; not the Modern or Portrait venue."
      },
      "Palace of Holyroodhouse": {
        url: "https://www.rct.uk/visit/palace-of-holyroodhouse",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Royal Collection Trust sells dated 2026 admission and tours, describes visitor rooms and access restrictions. Guide tells readers to check their date, not assume daily opening."
      },
      "Arthur's Seat": {
        url: "https://www.historicenvironment.scot/visit/all/holyrood-park/",
        sourceType: "official public operator",
        additionalSourceUrls: ["https://www.historicenvironment.scot/visit/all/holyrood-park/plan-your-visit/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Historic Environment Scotland identifies Arthur's Seat within Holyrood Park and publishes visitor access, free entry, route closures and warnings about drops and slippery surfaces. No sunrise hike or closed Radical Road route recommended."
      },
      "Dean Village walk": {
        url: "https://edinburgh.org/inspire/edinburgh-city-guides/romantic/",
        sourceType: "official tourism board",
        additionalSourceUrls: ["https://edinburgh.org/blog/discover-the-water-of-leith-walkway/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Tourism board identifies Dean Path and the village on the Water of Leith, with walking context toward Stockbridge. Public neighborhood walk, not an invented tour operator or a guarantee that every riverside path is accessible."
      },
      "Royal Botanic Garden Edinburgh": {
        url: "https://www.rbge.org.uk/visit/royal-botanic-garden-edinburgh/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official page lists free garden entry, seasonal hours and the West Gate on Arboretum Place. Palm Houses reopening is listed for October 2 while other Glasshouses remain closed. Guide recommends the outdoor grounds and asks readers to check glasshouse access separately."
      },
      "Camera Obscura & World of Illusions": {
        url: "https://www.camera-obscura.co.uk/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Operator lists 549 Castlehill, timed tickets and family exhibits. Own FAQ says floors are stair-only and only guide/assistance dogs enter. Used that policy over the contradictory tourism-board dog-friendly claim."
      },
      "Dynamic Earth": {
        url: "https://dynamicearth.org.uk/",
        sourceType: "operator's own site",
        additionalSourceUrls: ["https://dynamicearth.org.uk/plan-your-visit/getting-here/"],
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Science center advertises interactive exhibits, planetarium and tickets with current October programming. Directions page locates it on Holyrood Road near the palace. No fixed show time promised."
      },
      "Scottish Poetry Library": {
        url: "https://www.scottishpoetrylibrary.org.uk/visit/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-03",
        operatingEvidence: "Library lists public visits Monday to Thursday, 10am-3pm, at 5 Crichton's Close off Canongate, with free work and study spaces. Limited hours are noted rather than promising a weekend visit."
      },
      "The Kitchin": {
        url: "https://thekitchin.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/fine-dining/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official restaurant site lists 78 Commercial Quay in Leith, menus and table reservations. Tourism board corroborates the Leith location."
      },
      "Restaurant Martin Wishart": {
        url: "https://restaurantmartinwishart.co.uk/enquiries/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/fine-dining/",
        additionalSourceUrls: ["https://restaurantmartinwishart.co.uk/privacy-policy/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Own enquiries page advertises regular lunch/dinner service, tasting menus and telephone/email contact; own address is 54 The Shore. Older 2025 holiday exceptions were ignored. Booking page had no readable widget, so no specific availability is claimed."
      },
      "Timberyard": {
        url: "https://www.timberyard.co/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/fine-dining/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists 10 Lady Lawson Street, current menus, reservation link and booking times. Older event text and inconsistent footer hours were not copied. Used for a planned meal, not as a walk-in family cafe."
      },
      "The Scran & Scallie": {
        url: "https://scranandscallie.com/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://scranandscallie.com/menus/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site identifies the Stockbridge gastropub at 1 Comely Bank Road, seasonal menus and table reservations. Menu page includes children's dining."
      },
      "Howies Waterloo": {
        url: "https://www.howies.uk.com/venues/howies-waterloo-place/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.howies.uk.com/book/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Branch page lists 29 Waterloo Place, lunch and dinner daily, menus and reservations. Kept separate from Howies Victoria and Scotts Kitchen. No fixed menu price copied."
      },
      "Dishoom Edinburgh": {
        url: "https://www.dishoom.com/edinburgh/",
        sourceType: "business's own site",
        checkedOn: "2026-10-03",
        operatingEvidence: "Edinburgh branch lists 3a St Andrew Square, breakfast, lunch and dinner, daily hours and reservation policy. After 6pm, bookings are for groups of six or more; smaller groups walk in. Not included in the unconditional Worth booking list."
      },
      "Soderberg Pavilion": {
        url: "https://www.soderberg.uk/pavilion",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.soderberg.uk/the-bakery-1"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Branch page lists 1 Lister Square, brunch daily from 9am, evening service and drinks. Bakery page confirms Edinburgh production above the Pavilion and bakes served at all locations. ASCII spelling maps to Soderberg's Edinburgh Pavilion, not a London branch."
      },
      "Twelve Triangles (Brunswick Street)": {
        url: "https://twelvetriangles.co.uk/visit-us",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bakeries-and-delicatessens/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own branch list gives 90 Brunswick Street, daily 7am-2pm and takeaway only. Tourism board corroborates bread and pastry service. Breakfast means a takeaway bakery stop, not a sit-down meal."
      },
      "Lannan Bakery": {
        url: "https://www.lannanbakery.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bakeries-and-delicatessens/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists bakery and pantry at 29-35 Hamilton Place, with Tuesday-Sunday hours and menu link. Tourism board corroborates the location and pastry offering."
      },
      "The Milkman (7 Cockburn Street)": {
        url: "https://themilkman.coffee/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/cafes-and-coffee-shops/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site publishes daily hours and two Cockburn Street locations, numbers 7 and 52. This recommendation and its map select number 7, not an ambiguous chain-wide search."
      },
      "Fortitude Coffee (Hamilton Place)": {
        url: "https://www.fortitudecoffee.com/contact",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/cafes-and-coffee-shops/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official visit page lists 66 Hamilton Place with weekday and weekend hours. Kept distinct from its Abbey Mount branch; tourism board corroborates the Stockbridge location."
      },
      "Bramble": {
        url: "https://www.bramblebar.co.uk/",
        sourceType: "business's own site",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own bar site lists 16a Queen Street, daily evening hours, drinks menu and walk-ins-only policy. Not presented as a reservable table."
      },
      "The Devil's Advocate": {
        url: "https://www.devilsadvocateedinburgh.co.uk/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bars-and-pubs-in-edinburgh/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists 9 Advocate's Close, daily service, cocktail menus and table booking. Explicitly warns that access includes stairs; included that limitation in the guide."
      },
      "Copper Blossom": {
        url: "https://copperblossom.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bars-and-pubs-in-edinburgh/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists basement 107 George Street, cocktail menu, table bookings and current food/drink service. Tourism board corroborates address and cocktail-bar identity."
      }
    }
  },
  "Boston, United States": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-02",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Website review, not an in-person visit or telephone confirmation. Operating evidence means the official site currently advertises visits, service, or reservations, not guaranteed availability on a future date. Public parks and trails are places, not businesses. Category suitability is editorial judgment. Same-operator pages and ordering services are not independent corroboration.",
    sourceUrls: [
      "https://www.meetboston.com/things-to-do/",
      "https://www.meetboston.com/culinary/",
      "https://www.meetboston.com/blog/post/first-visit-to-boston/",
      "https://www.meetboston.com/blog/post/guys-weekend/",
      "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/"
    ],
    excludedCandidates: [
      { name: "Tatte Bakery & Cafe (Charles Street)", url: "https://tattebakery.com/locations/ma/boston/70-charles-street/", checkedOn: "2026-10-02", reason: "Official branch page says closed for renovation. Used the separately checked Back Bay location, not a generic Tatte map search." },
      { name: "Thinking Cup", reason: "Own website returned an error during review. Not added without current operator evidence; no closure claimed." }
    ],
    placeSources: {
      "Freedom Trail": {
        url: "https://www.thefreedomtrail.org/",
        sourceType: "official trail operator",
        secondSourceUrl: "https://www.meetboston.com/blog/post/first-visit-to-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Foundation advertises guided walks and identifies the route's historic sites. Walking the route does not include admission to every interior."
      },
      "Boston Common": {
        url: "https://www.boston.gov/parks/boston-common",
        sourceType: "official public site",
        checkedOn: "2026-10-02",
        operatingEvidence: "City Parks Department identifies the downtown public park and visitor facilities. The recommendation is a park visit, not a promise that every seasonal activity is operating."
      },
      "Boston Public Garden": {
        url: "https://www.boston.gov/parks/public-garden",
        sourceType: "official public site",
        checkedOn: "2026-10-02",
        operatingEvidence: "City Parks Department maintains a visitor page for the public garden. The guide recommends walking there, not a seasonal boat ride."
      },
      "Fenway Park": {
        url: "https://www.mlb.com/redsox/ballpark/tours",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/first-visit-to-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official stadium tours and booking listed."
      },
      "Museum of Fine Arts, Boston": {
        url: "https://www.mfa.org/visit",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Museum publishes visitor hours, admission and advance-ticket options. Its closure days must be checked before planning a visit."
      },
      "Isabella Stewart Gardner Museum": {
        url: "https://www.gardnermuseum.org/visit",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official page lists 25 Evans Way, visitor hours and timed admission; advance tickets are recommended."
      },
      "New England Aquarium": {
        url: "https://www.neaq.org/visit/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Visitor page lists 1 Central Wharf, current hours and ticket sales. It recommends advance booking, especially for busy dates."
      },
      "Boston Children's Museum": {
        url: "https://bostonchildrensmuseum.org/visit/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Museum lists 308 Congress Street, current opening days, advance tickets and exhibits for children and families. Ignored its older summer-event travel advice."
      },
      "Boston Public Library (Central Library)": {
        url: "https://www.bpl.org/locations/central/",
        sourceType: "official public site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Library lists public visitor hours at 700 Boylston Street and art, architecture and tour information. The map gallery has a temporary closure notice; it is not recommended as a separate attraction."
      },
      "Brattle Book Shop": {
        url: "https://www.brattlebookshop.com/",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Bookshop lists 9 West Street, current browsing hours, used and rare books and its outdoor sale area."
      },
      "Boston Public Market": {
        url: "https://bostonpublicmarket.org/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Market lists daily opening at 100 Hanover Street, food vendors and prepared meals. Individual vendor hours vary. The airport market is a different location."
      },
      "Boston Tea Party Ships & Museum": {
        url: "https://www.bostonteapartyship.com/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists tours and ticket sales at 306 Congress Street, with historical interpreters and interactive exhibits."
      },
      "Row 34 (Seaport)": {
        url: "https://www.row34.com/location/row34-seaport/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/guys-weekend/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Branch page lists 383 Congress Street in Fort Point, lunch and dinner menus, hours and reservations. Seaport label distinguishes it from the Kenmore and Cambridge restaurants."
      },
      "Myers + Chang": {
        url: "https://www.myersandchang.com/",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official site lists 1145 Washington Street, dinner service, menus and reservations. Midday service is only on selected days, so this guide recommends it for dinner."
      },
      "Contessa (Boston)": {
        url: "https://contessaristorante.com/boston",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Boston-specific page lists 3 Newbury Street at the Newbury hotel, breakfast and dinner menus and reservations. Not the Miami restaurant of the same name."
      },
      "Grill 23 & Bar": {
        url: "https://www.grill23.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/guys-weekend/",
        additionalSourceUrls: ["https://www.grill23.com/menus"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Restaurant lists 161 Berkeley Street, evening hours, steak and seafood menus and table reservations."
      },
      "o ya": {
        url: "https://www.o-ya.restaurant/location/o-ya-boston/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.o-ya.restaurant/team-member/reservations/"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Boston location page lists 9 East Street and dinner service. Its reservation page describes prepaid omakase bookings; the guide does not promise a la carte dining or cocktail-bar service."
      },
      "Neptune Oyster": {
        url: "https://www.neptuneoyster.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/guys-weekend/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official page lists 63 Salem Street, seafood menu and daily service. Its explicit policy says no reservations, walk-ins only; used that policy rather than the contradictory search title."
      },
      "Flour Bakery + Cafe (Clarendon Street)": {
        url: "https://www.flourbakery.com/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://order.toasttab.com/online/flourclarendon", "https://www.flourbakery.com/menus"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Official site identifies the Clarendon Street bakery. Its operator ordering page lists 131 Clarendon Street, opening hours, breakfast, pastry and coffee menus. Toast is the operator's ordering service, not an independent second review."
      },
      "Tatte Bakery & Cafe (Back Bay)": {
        url: "https://tattebakery.com/locations/ma/boston/399-boylston-st/",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Branch page lists 399 Boylston Street, daily hours, ordering, pastries, brunch, lunch and coffee. This is not the temporarily closed Charles Street branch."
      },
      "Bova's Bakery": {
        url: "https://bovabakeryboston.net/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://bovabakeryboston.net/faqs/"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Bakery advertises bread and pastries at 134 Salem Street. Its FAQ confirms takeout-only service; the guide does not describe it as a sit-down cafe."
      },
      "George Howell Coffee (Godfrey Hotel)": {
        url: "https://georgehowellcoffee.com/pages/the-godfrey-hotel",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists the Godfrey Hotel cafe at 505 Washington Street, hours, coffee and ordering. Pastries from suppliers do not make it a separately verified bakery."
      },
      "Gracenote Coffee (Lincoln Street)": {
        url: "https://gracenotecoffee.com/pages/locations",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists current cafe hours at 108 Lincoln Street. High Street Place is a different branch and is not the map target here."
      },
      "Offsuit": {
        url: "https://www.offsuitboston.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists 5 Utica Street, cocktail service, current hours, reservations and walk-ins. Tourism board independently identifies the bar and address."
      },
      "Wig Shop Lounge": {
        url: "https://www.wigshopboston.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/",
        additionalSourceUrls: ["https://www.wigshopboston.com/location/the-wig-shop-lounge/"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Official pages list 27 Temple Place, evening service, cocktail menus, selected reservation hours and a 21-plus entry policy."
      },
      "Yvonne's": {
        url: "https://www.yvonnesboston.com/location/yvonnes-boston/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Restaurant lists 2 Winter Place and nightly service. Reservations are for supper, not cocktails alone; the guide does not imply a bar-table reservation."
      }
    }
  },
  "Cusco, Peru": {
    renderVerifiedOnly: true,
    checkedOn: "2026-09-30",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Website review, not an in-person visit or telephone confirmation. Operating evidence means the official site currently advertises visits, service, or reservations. Confirm hours before traveling. Separate pages from one operator are not independent corroboration.",
    sourceUrls: [
      "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
      "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download",
      "https://cosituc.gob.pe/preguntas-frecuentes/"
    ],
    excludedCandidates: [
      { name: "Chicha Cusco", reason: "Official Cusco page timed out during review. Not added on the strength of directory mentions alone; no closure claimed." },
      { name: "La Valeriana", reason: "Official website could not be loaded. Third-party listings were insufficient to confirm the current branch; no closure claimed." }
    ],
    placeSources: {
      "Sacsayhuaman": {
        url: "https://cosituc.gob.pe/sacsayhuaman/",
        sourceType: "official ticket operator",
        secondSourceUrl: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        checkedOn: "2026-09-30",
        operatingEvidence: "COSITUC lists the archaeological site and its visitor-ticket circuit; PROMPERU includes it in the Cusco itinerary."
      },
      "Qorikancha": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "PROMPERU describes visiting the Inca temple and Santo Domingo complex. This is not the separate Museo de Sitio Qorikancha ticket listing."
      },
      "Cusco Cathedral": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "PROMPERU includes the cathedral in its walk from Plaza de Armas; admission hours were not independently confirmed."
      },
      "Plaza de Armas": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "Public square identified as the starting point of the Cusco city walk; not a business with opening hours."
      },
      "San Blas": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "Named Cusco neighborhood on the tourism board's uphill walking route; not a venue or business."
      },
      "Twelve-Angled Stone": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "The tourism board identifies the 12-angled stone on the walk toward San Blas. Public landmark, not a business."
      },
      "Centro de Textiles Tradicionales del Cusco": {
        url: "https://www.textilescusco.org/index.php/contact",
        sourceType: "operator's own site",
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists the Cusco location at Avenida El Sol 603, museum and shop hours, weaving demonstrations, and free museum entry. Chinchero is a different location and is not used here."
      },
      "ChocoMuseo Cusco": {
        url: "https://chocomuseo.com/en/peru/cusco/",
        sourceType: "business's own site",
        secondSourceUrl: "https://chocomuseo.com/product/cusco-museo/",
        checkedOn: "2026-09-30",
        operatingEvidence: "Cusco-specific section lists the Plaza Regocijo museum, opening hours, free museum entry, and bookable workshops. Ignored the unrelated demo-address text later in the page footer."
      },
      "Cicciolina": {
        url: "https://www.cicciolinacuzco.com/es/restaurant.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.peru.travel/stories/4-luxury-experiences-to-enjoy-in-cusco",
        checkedOn: "2026-09-30",
        operatingEvidence: "Official page lists Cusco address, lunch and dinner hours, menu, and reservations. Use the current official Calle Palacio address rather than the older tourism PDF address."
      },
      "Cicciolina Cafe": {
        url: "https://www.cicciolinacuzco.com/es/cafe.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.cicciolinacuzco.com/docs/Carta_cafe-2025_ESP.pdf",
        checkedOn: "2026-09-30",
        operatingEvidence: "Cafe page lists Calle Ruinas 465 and service hours. The linked menu supports breakfast, coffee, house-made bread, and croissants. A cafe with baking, not a separate wholesale bakery."
      },
      "Pachapapa": {
        url: "https://www.cuscorestaurants.com/pachapapa/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=36",
        additionalSourceUrls: ["https://pachapapa.cuscorestaurants.com/p/es.html"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists San Blas 120, service hours and reservations. Its restaurant page includes Peruvian cocktails. PROMPERU independently lists the restaurant in Cusco."
      },
      "MAP Cafe": {
        url: "https://www.cuscorestaurants.com/map-cafe/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=36",
        additionalSourceUrls: ["https://mapcafe.cuscorestaurants.com/"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists lunch and dinner service, reservations, and the location inside Museo de Arte Precolombino at Nazarenas 231. PROMPERU corroborates the name and location."
      },
      "LIMO": {
        url: "https://www.cuscorestaurants.com/limo/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=36",
        additionalSourceUrls: ["https://limo.cuscorestaurants.com/p/es.html"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists Portal de Carnes 236, lunch and dinner hours, reservations, and pisco-bar service. PROMPERU independently lists Limo in Cusco."
      },
      "Green Point": {
        url: "https://greenpointcusco.com/home.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://menu.greenpointcusco.com/es/desayunos",
        checkedOn: "2026-09-30",
        operatingEvidence: "Own site lists Carmen Bajo 235, Cusco, service hours and reservations; its menu lists breakfast and coffee. Opening times differ within the site, so no exact opening time is published in the guide."
      },
      "Qosqo Maki (Tullumayo)": {
        url: "https://marketingqosqomaki.wixsite.com/panaderia-qosqo-maki",
        sourceType: "business's own site",
        secondSourceUrl: "https://qosqomaki.org/contactos/",
        additionalSourceUrls: ["https://linktr.ee/qosqomaki.cusco"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Bakery's linked official site lists Tullumayo 465 and service hours. Parent association confirms the bakery address and delivery contact. Official profile identifies coffee and pastries."
      },
      "Qosqo Maki (Santa Rosa)": {
        url: "https://marketingqosqomaki.wixsite.com/panaderia-qosqo-maki",
        sourceType: "business's own site",
        secondSourceUrl: "https://qosqomaki.org/contactos/",
        checkedOn: "2026-09-30",
        operatingEvidence: "Official site lists the Santa Rosa branch at Pasaje Anibal Valencia 200 and service hours. Parent association separately lists the Santa Rosa bakery. Same brand as Tullumayo, different physical branch."
      },
      "Museo del Pisco Cusco": {
        url: "https://english.museodelpisco.org/locations/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=57",
        checkedOn: "2026-09-30",
        operatingEvidence: "Own site lists the Cusco bar at Santa Catalina Ancha 398, contact, menu and reservations. PROMPERU corroborates the Cusco address. It is a bar recommendation, not a children's museum."
      },
      "Oqre": {
        url: "https://www.belmond.com/en/hotels/south-america/peru/monasterio-cusco/restaurants-and-bars",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.belmond.com/en/hotels/south-america/peru/monasterio-cusco/restaurants-and-bars/modal/oqre",
        checkedOn: "2026-09-30",
        operatingEvidence: "Monasterio's official dining page lists Oqre with its current menu and Cusco hotel address. No older Deli Monasterio listing was substituted."
      }
    }
  },
  "Austin, United States": {
    checkedOn: "2026-09-19",
    status: "prior-source-review",
    reviewScope: "cityGuideDetailData",
    limitations: "Previously reviewed source list. Not rechecked during the September 30 Cusco pass; per-place operating evidence still needs migration to the new ledger format.",
    sourceUrls: [
      "https://www.austintexas.org/",
      "https://www.austintexas.org/explore/",
      "https://www.austintexas.org/things-to-do/",
      "https://www.austintexas.org/explore/entertainment-districts/",
      "https://www.austintexas.org/food-and-drink/",
      "https://www.austintexas.org/food-and-drink/drink/",
      "https://www.austintexas.org/food-and-drink/coffee-and-tea/",
      "https://www.austintexas.org/austin-insider-blog/blog/post/places-for-lunch-austin/",
      "https://www.austintexas.org/austin-insider-blog/blog/post/south-lamar/"
    ],
    places: [
      ["Texas State Capitol", "attraction"],
      ["Blanton Museum of Art", "museum"],
      ["LBJ Presidential Library", "museum"],
      ["Zilker Park", "outdoors"],
      ["Barton Springs Pool", "outdoors"],
      ["Congress Avenue Bridge", "landmark"],
      ["South Congress Avenue", "neighborhood"],
      ["Red River Cultural District", "neighborhood"],
      ["Mount Bonnell", "viewpoint"],
      ["Lady Bird Lake", "outdoors"],
      ["Thinkery", "family"],
      ["Austin Zoo", "family"],
      ["East Sixth Street", "neighborhood"],
      ["Emmer & Rye", "food"],
      ["June's", "food"],
      ["Hopdoddy Burger Bar", "food"],
      ["Uchi", "food"],
      ["Meanwhile Brewing", "food"],
      ["Jo's Coffee", "coffee"],
      ["Mañana", "coffee"],
      ["Roosevelt Room", "drinks"],
      ["Aba", "food"],
      ["Bouldin Creek Cafe", "food"],
      ["Bakery Lorraine", "bakery"],
      ["Sour Duck Market", "food"],
      ["Komé", "food"],
      ["Midnight Cowboy", "drinks"],
      ["Whisler's", "drinks"],
      ["Easy Tiger Bake Shop & Beer Garden", "bakery"],
      ["Tiny Pies", "bakery"],
      ["Cuvée Coffee", "coffee"],
      ["Mozart's Coffee Roasters", "coffee"]
    ],
    placeSources: {
      "Texas State Capitol": { url: "https://tspb.texas.gov/prop/tc/tc/capitol.html", sourceType: "official public site" },
      "Blanton Museum of Art": { url: "https://blantonmuseum.org/visit/", sourceType: "business's own site" },
      "LBJ Presidential Library": { url: "https://www.lbjlibrary.org/", sourceType: "business's own site" },
      "Zilker Park": { url: "https://www.austintexas.gov/parks/locations/zilker-metropolitan-park", sourceType: "official public site" },
      "Barton Springs Pool": { url: "https://www.austintexas.gov/parks/locations/about-barton-springs-pool", sourceType: "official public site" },
      "Congress Avenue Bridge": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "South Congress Avenue": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "Red River Cultural District": { url: "https://redriverculturaldistrict.org/", sourceType: "official district site" },
      "Mount Bonnell": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "Lady Bird Lake": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "Thinkery": { url: "https://thinkeryaustin.org/", sourceType: "business's own site" },
      "Austin Zoo": { url: "https://austinzoo.org/", sourceType: "business's own site" },
      "East Sixth Street": { url: "https://www.austintexas.org/explore/entertainment-districts/", sourceType: "official tourism board" },
      "Emmer & Rye": { url: "https://emmerandrye.com/", sourceType: "business's own site" },
      "June's": { url: "https://junesallday.com/", sourceType: "business's own site" },
      "Hopdoddy Burger Bar": { url: "https://www.hopdoddy.com/locations/southcongress", sourceType: "business's own site" },
      "Uchi": { url: "https://uchi.uchirestaurants.com/location/sushi-austin/", sourceType: "business's own site" },
      "Meanwhile Brewing": { url: "https://www.meanwhilebeer.com/", sourceType: "business's own site" },
      "Jo's Coffee": { url: "https://www.joscoffee.com/", sourceType: "business's own site" },
      "Mañana": { url: "https://mananaaustin.com/south-congress", sourceType: "business's own site" },
      "Roosevelt Room": { url: "https://www.therooseveltroomatx.com/", sourceType: "business's own site" },
      "Aba": { url: "https://www.abarestaurants.com/austin", sourceType: "business's own site" },
      "Bouldin Creek Cafe": { url: "https://bouldincreekcafe.com/", sourceType: "business's own site" },
      "Bakery Lorraine": { url: "https://bakerylorraine.com/pages/hours-and-locations-austin", sourceType: "business's own site" },
      "Sour Duck Market": { url: "https://www.sourduckmarket.com/about", sourceType: "business's own site" },
      "Komé": { url: "https://www.kome-austin.com/location/kome-austin/", sourceType: "business's own site" },
      "Midnight Cowboy": { url: "https://midnightcowboymodeling.com/", sourceType: "business's own site" },
      "Whisler's": { url: "https://www.whislersatx.com/contact", sourceType: "business's own site" },
      "Easy Tiger Bake Shop & Beer Garden": { url: "https://www.easytigeraustin.com/location/north", sourceType: "business's own site" },
      "Tiny Pies": { url: "https://tinypies.com/", sourceType: "business's own site" },
      "Cuvée Coffee": { url: "https://cuveecoffee.com/pages/locations", sourceType: "business's own site" },
      "Mozart's Coffee Roasters": { url: "https://mozartscoffee.com/pages/contact-us", sourceType: "business's own site" }
    }
  },
  "Nashville, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.visitmusiccity.com/nashville-neighborhoods",
      "https://www.visitmusiccity.com/sites/default/files/2026-04/2025-Nashville_Top10-FA.pdf",
      "https://www.visitmusiccity.com/sites/default/files/2025-09/2025-TourismProfile_Student_08August-FA.pdf"
    ],
    places: [
      ["Lower Broadway", "neighborhood"],
      ["Music Row", "neighborhood"],
      ["RCA Studio B", "music"],
      ["Belle Meade Historic Site", "history"],
      ["Nashville Zoo", "family"],
      ["Assembly Food Hall", "food"],
      ["Tootsie's Orchid Lounge", "music"],
      ["Legends Corner", "music"],
      ["The Stage", "music"],
      ["Robert's Western World", "music"]
    ]
  },
  "Atlanta, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://discoveratlanta.com/",
      "https://discoveratlanta.com/explore/neighborhoods/main/",
      "https://discoveratlanta.com/things-to-do/outdoors/beltline-trails/",
      "https://discoveratlanta.com/things-to-do/shopping/ponce-city-market/"
    ],
    places: [
      ["Atlanta BeltLine Eastside Trail", "outdoors"],
      ["Krog Street Market", "food"],
      ["Ponce City Market", "food"],
      ["Skyline Park", "family"],
      ["Old Fourth Ward Park", "outdoors"],
      ["Centennial Olympic Park", "outdoors"],
      ["Georgia Aquarium", "family"],
      ["World of Coca-Cola", "attraction"],
      ["Atlanta History Center", "history"],
      ["Piedmont Park", "outdoors"]
    ]
  },
  "Sedona, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://visitsedona.com/attractions-entertainment/",
      "https://visitsedona.com/things-to-do/100-things-to-do/"
    ],
    places: [
      ["Oak Creek Canyon", "outdoors"],
      ["Chapel of the Holy Cross", "attraction"],
      ["Sedona Arts Center", "arts"],
      ["Verde Valley Archaeology Center", "museum"],
      ["Montezuma Castle National Monument", "history"],
      ["Montezuma Well", "outdoors"],
      ["Tuzigoot National Monument", "history"],
      ["Jordan Historical Park", "outdoors"],
      ["Sedona Wetlands Preserve", "outdoors"],
      ["Blazin' M Experience", "family"]
    ]
  },
  "Da Lat, Vietnam": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.vietnam.travel/node/100",
      "https://www.vietnam.travel/index.php/vi/places-to-go/central-vietnam/dalat",
      "https://dalat.vn/en/places",
      "https://dalat.vn/en/introduction"
    ],
    places: [
      ["Xuan Huong Lake", "outdoors"],
      ["Da Lat Railway Station", "attraction"],
      ["Trai Mat", "outdoors"],
      ["Linh Phuoc Pagoda", "culture"],
      ["Valley of Love", "outdoors"],
      ["Tuyen Lam Lake", "outdoors"],
      ["Langbiang Mountain", "outdoors"],
      ["Datanla Waterfall", "outdoors"],
      ["Lam Vien Square", "landmark"],
      ["Cau Dat Tea Hill", "outdoors"]
    ]
  },
  "Turin, Italy": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://turismotorino.org/en/visit/territory/torino-metropoli/torino/discover-the-disctricts-in-torino/torino-city-centre",
      "https://turismotorino.org/en/visit/things-to-do-and-things-to-see/museums-and-heritage",
      "https://turismotorino.org/visit/things-to-do-and-things-to-see/food-and-wine",
      "https://turismotorino.org/visit/territory"
    ],
    places: [
      ["Piazza Castello", "landmark"],
      ["Musei Reali Torino", "museum"],
      ["Palazzo Madama", "museum"],
      ["Museo Nazionale del Cinema", "museum"],
      ["Mole Antonelliana", "landmark"],
      ["Museo Egizio", "museum"],
      ["Piazza Vittorio Veneto", "landmark"],
      ["Gran Madre di Dio", "attraction"],
      ["Royal Residences of Torino and Piemonte", "history"],
      ["Basilica of Superga", "attraction"]
    ]
  },
  "Montpellier, France": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.montpellier-tourisme.fr/decouvrir/",
      "https://www.montpellier-tourisme.fr/decouvrir/millenaire/visiter/",
      "https://www.montpellier-tourisme.fr/decouvrir/millenaire/villes-et-villages-de-la-metropole/",
      "https://www.montpellier-tourisme.fr/sejourner/loisirs-et-activites/patrimoine-et-musees/"
    ],
    places: [
      ["Place de la Comedie", "landmark"],
      ["Ecusson historic centre", "neighborhood"],
      ["Place Saint-Roch", "landmark"],
      ["Place Saint-Anne", "landmark"],
      ["Place de la Canourgue", "landmark"],
      ["Montpellier Cathedral", "history"],
      ["Arc de Triomphe", "landmark"],
      ["Jardin des Plantes", "outdoors"],
      ["Musee Fabre", "museum"],
      ["Antigone", "neighborhood"],
      ["Port Marianne", "neighborhood"]
    ]
  },
  "Lille, France": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://en.lilletourism.com/",
      "https://en.lilletourism.com/explore/hello-architecture-and-heritage/lille-and-its-neighborhoods/",
      "https://en.lilletourism.com/explore/hello-architecture-and-heritage/"
    ],
    places: [
      ["Vieux-Lille", "neighborhood"],
      ["Grand'Place", "landmark"],
      ["Vieille Bourse", "landmark"],
      ["Lille Belfry", "landmark"],
      ["Palais Rihour", "history"],
      ["Euralille", "neighborhood"],
      ["Parc Matisse", "outdoors"],
      ["Jardin des Geants", "outdoors"],
      ["Tripostal", "arts"],
      ["Citadel of Lille", "outdoors"],
      ["Hospice Comtesse", "museum"]
    ]
  },
  "Napa Valley, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.visitnapavalley.com/",
      "https://www.visitnapavalley.com/things-to-do/towns-regions/napa/",
      "https://www.visitnapavalley.com/things-to-do/trip-ideas/first-timers-guide-to-napa-valley/",
      "https://www.visitnapavalley.com/travel-trade/planning-tool-kit/top-things-to-do/"
    ],
    places: [
      ["Downtown Napa", "neighborhood"],
      ["Napa Valley Welcome Center", "planning"],
      ["Oxbow Public Market", "food"],
      ["St. Helena", "neighborhood"],
      ["Yountville", "neighborhood"],
      ["Beringer Vineyards", "food"],
      ["Napa Valley Wine Train", "attraction"],
      ["Napa Valley Opera House", "arts"],
      ["Bothe-Napa Valley State Park", "outdoors"],
      ["Napa Valley Museum", "museum"]
    ]
  },
  "Cesky Krumlov, Czechia": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.ckrumlov.info/en/cesky-krumlov/",
      "https://www.ckrumlov.info/en/sights-and-culture/",
      "https://www.ckrumlov.info/en/sights-and-culture-68-cesky-krumlov-state-castle-and-ch-teau/",
      "https://www.ckrumlov.info/en/frequently-asked-questions-faq/"
    ],
    places: [
      ["Cesky Krumlov State Castle and Chateau", "history"],
      ["Castle Museum and Tower", "museum"],
      ["Castle Baroque Theatre", "arts"],
      ["Baroque Castle Garden", "outdoors"],
      ["Egon Schiele Art Centrum", "arts"],
      ["Museum Fotoatelier Seidel", "museum"],
      ["Regional Museum in Cesky Krumlov", "museum"],
      ["Cesky Krumlov Monasteries", "history"],
      ["Port 1560", "arts"],
      ["Vltava River", "outdoors"]
    ]
  }
};
