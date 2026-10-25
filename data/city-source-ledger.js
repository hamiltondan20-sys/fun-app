/*
 * Working source ledger for the first city-content pass.
 * Place names are retained with a source URL so published copy can be audited.
 */
window.HB_DATA = window.HB_DATA || {};

window.HB_DATA.citySourceLedger = {
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
