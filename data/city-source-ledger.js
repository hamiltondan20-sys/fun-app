/*
 * Working source ledger for the first city-content pass.
 * Place names are retained with a source URL so published copy can be audited.
 */
window.HB_DATA = window.HB_DATA || {};

window.HB_DATA.citySourceLedger = {
  "Cusco, Peru": {
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
