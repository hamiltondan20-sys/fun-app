/*
 * Working source ledger for the first city-content pass.
 * Place names are retained with a source URL so published copy can be audited.
 */
window.HB_DATA = window.HB_DATA || {};

window.HB_DATA.citySourceLedger = {
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
