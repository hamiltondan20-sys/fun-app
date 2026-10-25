window.HB_DATA = window.HB_DATA || {};

(function () {
  const data = window.HB_DATA;
  const compact = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const asList = (value) => Array.isArray(value) ? value.filter(Boolean).map((item) => String(item).trim()) : [];
  const uniqueList = (...values) => [...new Set(values.flatMap(asList))].filter(Boolean);

  const countrySeeds = [
    { country: "Argentina", summary: "Argentina is a strong fit for travelers who want a mix of city life, wine country, mountain scenery, and big open landscapes.", best: "City breaks, food and wine, nature, and longer scenic trips.", stands: "Buenos Aires brings the energy, while Mendoza, Patagonia, and the northwest give the trip very different moods.", remember: "Distances are large, so choose a region or build in real travel days instead of trying to cover the whole country." },
    { country: "Chile", summary: "Chile works well for travelers who want dramatic scenery, outdoor adventure, and a city base with easy access to very different landscapes.", best: "Nature, road trips, hiking, wine, and travelers who like a clear sense of place.", stands: "Santiago, the Atacama, the lake district, and Patagonia each feel like a different trip.", remember: "Pick one geographic section for a shorter vacation and protect transfer time between regions." },
    { country: "Colombia", summary: "Colombia is a lively choice for travelers who want colorful cities, warm-weather escapes, coffee country, and strong food and music scenes.", best: "City energy, beaches, coffee, culture, and value-minded adventures.", stands: "Bogota, Medellin, Cartagena, and the coffee region all bring a different pace.", remember: "Plan around altitude, heat, and transfer time so the trip has room to settle in between regions." },
    { country: "Peru", summary: "Peru gives travelers a memorable mix of ancient history, mountain scenery, food, and high-impact cultural experiences.", best: "History, food, hiking, culture, and once-in-a-lifetime highlights.", stands: "Lima, Cusco, the Sacred Valley, and Machu Picchu can create a strong first route.", remember: "Altitude changes the pace, so leave room to adjust before the biggest hikes or sightseeing days." },
    { country: "Austria", summary: "Austria suits travelers who want graceful cities, music, cafes, alpine scenery, and easy rail-connected add-ons.", best: "City breaks, culture, winter trips, romance, and scenic rail travel.", stands: "Vienna brings the museums and cafes, while Salzburg, Innsbruck, and the lakes add scenery.", remember: "A short trip can work beautifully with one city and one nearby escape instead of constant hotel changes." },
    { country: "Belgium", summary: "Belgium is a compact, food-friendly choice for travelers who want historic city centers, art, beer, chocolate, and easy regional movement.", best: "Weekend breaks, food, architecture, museums, and train-friendly trips.", stands: "Brussels, Bruges, Ghent, and Antwerp each have a distinct reason to stay a little longer.", remember: "Use one city as a base and add day trips only when they support the mood of the trip." },
    { country: "Croatia", summary: "Croatia works especially well for travelers who want clear water, old towns, island time, and a Mediterranean trip with strong visual payoff.", best: "Beach trips, couples, sailing, history, and scenic road trips.", stands: "Dubrovnik, Split, Hvar, and the Istrian coast offer different versions of the country.", remember: "Ferry schedules and summer crowds shape the route, so protect the key island or coastal days early." },
    { country: "Czechia", summary: "Czechia is a strong fit for travelers who want historic streets, beautiful architecture, easy value, and a relaxed European city rhythm.", best: "City breaks, history, beer and food, couples, and budget-conscious travel.", stands: "Prague is the natural first stop, while Cesky Krumlov and smaller towns add a slower contrast.", remember: "The old centers are easy to overpack, so leave time for cafes, river walks, and neighborhoods outside the headline sights." },
    { country: "Denmark", summary: "Denmark suits travelers who want design, food, cycling, waterfront neighborhoods, and a calm city experience that still feels lively.", best: "Design, food, family trips, short breaks, and easy urban exploring.", stands: "Copenhagen is the anchor, with Aarhus and coastal escapes offering a quieter follow-up.", remember: "The best days are often built from a few neighborhoods, not a long list of attractions." },
    { country: "Finland", summary: "Finland is a good match for travelers who want clean-lined cities, saunas, forests, winter magic, and a calmer pace.", best: "Winter travel, nature, design, families, and travelers who like space to breathe.", stands: "Helsinki is an easy gateway, while Lapland and the lake region change the trip completely.", remember: "Daylight and weather affect the experience, especially for northern lights and outdoor plans." },
    { country: "Iceland", summary: "Iceland is built for travelers who want dramatic landscapes, geothermal moments, and a road-trip feeling without a long list of cities.", best: "Scenery, road trips, adventure, photography, and short active escapes.", stands: "Reykjavik works as a soft landing, while the South Coast, Golden Circle, and northern routes bring the big nature moments.", remember: "Weather and road conditions can rewrite the day, so flexible planning is part of the experience." },
    { country: "Ireland", summary: "Ireland works well for travelers who want welcoming cities, dramatic coastlines, live music, and road trips with a strong sense of place.", best: "Road trips, couples, pubs and music, scenery, and relaxed city breaks.", stands: "Dublin is easy to start with, while Galway, Cork, Killarney, and the west coast add more atmosphere.", remember: "Driving times are often slower than the map suggests, so leave room for stops and weather." },
    { country: "Norway", summary: "Norway is a natural choice for travelers who want fjords, clean cities, outdoor adventure, and scenery that shapes the whole route.", best: "Nature, hiking, scenic rail, winter travel, and adventurous couples trips.", stands: "Oslo, Bergen, Tromso, and the fjord country each work best with a different trip pace.", remember: "Let the scenery set the route and avoid adding too many long transfers to a short visit." },
    { country: "Poland", summary: "Poland gives travelers historic city centers, strong food, good value, and a mix of lively urban trips and meaningful history.", best: "History, food, city breaks, value, and thoughtful cultural travel.", stands: "Krakow, Warsaw, Gdansk, and Wroclaw each show a different side of the country.", remember: "A focused city stay usually feels richer than racing through several places in one week." },
    { country: "Sweden", summary: "Sweden is a good match for travelers who want design, waterfront cities, islands, forests, and a polished but unhurried rhythm.", best: "Design, food, city breaks, nature, and summer travel.", stands: "Stockholm makes a strong first base, with Gothenburg, Malmo, and archipelago time adding texture.", remember: "Seasonal daylight changes the schedule, especially for outdoor and island plans." },
    { country: "Switzerland", summary: "Switzerland works for travelers who want beautiful cities, mountain views, efficient trains, and scenery that is easy to build into the route.", best: "Scenic rail, mountains, couples, family trips, and polished city breaks.", stands: "Zurich, Lucerne, Geneva, Interlaken, and Zermatt each suit a different version of the trip.", remember: "Choose the scenic experiences first, then use rail connections to keep the route realistic." },
    { country: "India", summary: "India is a huge, high-energy destination with city life, food, history, spirituality, beaches, and landscapes that demand a focused route.", best: "Food, culture, history, family journeys, and immersive first-time travel.", stands: "Delhi, Agra, Jaipur, Mumbai, Kerala, Goa, and the Himalayas all deserve different planning logic.", remember: "Start with one region and allow more recovery time than a map-based itinerary usually suggests." },
    { country: "Indonesia", summary: "Indonesia suits travelers who want tropical scenery, strong local culture, beaches, food, and a trip that can shift from restful to adventurous.", best: "Beach trips, wellness, couples, surfing, culture, and island-hopping.", stands: "Bali and Ubud are easy starting points, while Java, Lombok, and Komodo bring a more active feel.", remember: "Island transfers take real time, so fewer bases usually create a better vacation." },
    { country: "Vietnam", summary: "Vietnam is a strong value destination for travelers who want excellent food, lively cities, history, coastlines, and flexible route options.", best: "Food, culture, adventure, value, and multi-city trips.", stands: "Hanoi, Hoi An, Da Nang, Hue, Ho Chi Minh City, and the bays each offer a distinct rhythm.", remember: "Build around the region and season rather than trying to see the entire country on a short trip." },
    { country: "Egypt", summary: "Egypt is a high-impact choice for travelers who want ancient history, warm-weather escapes, river scenery, and experiences that feel unlike anywhere else.", best: "History, family trips, river cruises, warm weather, and first-time cultural travel.", stands: "Cairo, Luxor, Aswan, the Red Sea, and Alexandria create very different trip shapes.", remember: "Heat, transfer time, and guided access matter, so protect the headline sites without overloading the day." },
    { country: "Kenya", summary: "Kenya combines lively cities, coastal downtime, and some of the world's most memorable wildlife experiences.", best: "Safari, family adventures, beach extensions, photography, and nature-led travel.", stands: "Nairobi, Maasai Mara, Mombasa, and Diani Beach can form a city-to-wildlife-to-coast route.", remember: "Transfers and park schedules shape the itinerary, so use realistic travel days and trusted operators." },
    { country: "South Africa", summary: "South Africa is a flexible destination for travelers who want food, wine, coastlines, wildlife, city energy, and a serious sense of landscape.", best: "Road trips, safari, food and wine, couples, and adventure.", stands: "Cape Town, the Winelands, Johannesburg, Durban, and Kruger each play a different role.", remember: "Pick a clear route and do not underestimate the distance between the experiences that look close together." },
    { country: "Tanzania", summary: "Tanzania is a strong match for travelers who want wildlife, mountain scenery, and an easy way to add beach time to a major adventure.", best: "Safari, beaches, hiking, honeymoon trips, and once-in-a-lifetime travel.", stands: "Serengeti, Ngorongoro, Kilimanjaro, Arusha, and Zanzibar support different trip priorities.", remember: "Use the safari and flight logistics to anchor the plan, then add beach time without rushing the handoff." },
    { country: "New Zealand", summary: "New Zealand is made for travelers who want mountains, lakes, scenic drives, and outdoor experiences that stay central to the itinerary.", best: "Road trips, adventure, scenery, families, and couples who want active days.", stands: "Auckland and the North Island offer a different pace from Queenstown, Milford Sound, and the South Island.", remember: "For shorter trips, choose one island rather than spending the vacation driving between both." },
    { country: "Maldives", summary: "The Maldives is a focused choice for travelers who want warm water, privacy, easy resort days, and a vacation where slowing down is the point.", best: "Honeymoons, luxury, snorkeling, wellness, and quiet beach trips.", stands: "The right resort, transfer type, and house-reef access matter more than checking off many places.", remember: "Choose the island and transfer carefully because the arrival logistics shape the whole stay." },
    { country: "Fiji", summary: "Fiji works well for travelers who want friendly island time, clear water, soft adventure, and a tropical trip that can suit families or couples.", best: "Beach trips, families, snorkeling, couples, and easygoing island travel.", stands: "Nadi is the practical gateway, while the Coral Coast, Denarau, and outer islands offer different levels of seclusion.", remember: "Build in transfer and weather flexibility, especially when the trip includes more than one island." },
    { country: "Philippines", summary: "The Philippines is a good fit for travelers who want beaches, islands, warm hospitality, city energy, and plenty of active add-ons.", best: "Island trips, diving, beaches, value, and adventurous couples vacations.", stands: "Manila, Cebu, Palawan, Boracay, Bohol, and Siargao all call for different route choices.", remember: "Domestic flights and boat schedules take planning, so limit the number of islands in a single trip." },
    { country: "Saudi Arabia", summary: "Saudi Arabia is an emerging destination for travelers who want striking landscapes, history, modern cities, and a trip that feels genuinely new.", best: "Culture, desert scenery, architecture, road trips, and travelers seeking a different kind of city break.", stands: "Riyadh, Jeddah, AlUla, and the Red Sea each create a different reason to visit.", remember: "Local customs, weather, and changing access rules should be checked close to the trip." },
    { country: "Qatar", summary: "Qatar works as a polished short break with museums, modern architecture, desert scenery, and an easy city-to-outdoors contrast.", best: "Stopovers, architecture, food, museums, and warm-weather city breaks.", stands: "Doha is the main base, with the Corniche, Souq Waqif, museums, and desert outings shaping the experience.", remember: "Heat affects daytime pacing, so plan outdoor moments for the cooler parts of the day." },
    { country: "Oman", summary: "Oman is a strong choice for travelers who want dramatic coastlines, desert landscapes, mountain drives, and a quieter Gulf experience.", best: "Road trips, nature, beaches, culture, and adventurous travelers.", stands: "Muscat, the wadis, Wahiba Sands, Nizwa, and Salalah each support a different route.", remember: "A car and realistic driving days make the destination much easier to enjoy." },
    { country: "Singapore", summary: "Singapore is an easy, polished city break for travelers who want excellent food, gardens, neighborhoods, and a simple base for Southeast Asia.", best: "Food, families, short trips, design, shopping, and easy first visits to Asia.", stands: "The city blends hawker centers, gardens, modern architecture, and distinct neighborhood cultures.", remember: "Heat and humidity matter, so combine indoor attractions with short outdoor windows." }
  ];

  countrySeeds.push(
    { country: "Rwanda", summary: "Rwanda is a thoughtful choice for travelers who want wildlife, green hills, clean cities, and a compact East African route.", best: "Gorilla trekking, nature, culture, and carefully planned family adventures.", stands: "Kigali, Volcanoes National Park, and the lake country offer a strong city-to-nature rhythm.", remember: "Trekking permits, fitness, weather, and transfer time should shape the plan from the beginning." },
    { country: "Zimbabwe", summary: "Zimbabwe works for travelers who want dramatic waterfalls, wildlife, river scenery, and a quieter safari experience.", best: "Victoria Falls, safari, outdoor adventure, and nature-led trips.", stands: "Victoria Falls, Hwange, and Mana Pools each create a different kind of outdoor day.", remember: "Use trusted operators and build in transfer time between parks and gateways." },
    { country: "Cuba", summary: "Cuba is a strong fit for travelers who want music, architecture, beaches, classic cars, and a destination with a distinct cultural rhythm.", best: "Culture, beach extensions, music, history, and slower city trips.", stands: "Havana is the natural anchor, while Varadero and smaller towns change the mood.", remember: "Connectivity, payment options, transport, and current entry rules deserve extra planning." },
    { country: "Russia", summary: "Russia offers major historic cities, museums, architecture, and a very different scale of cultural travel.", best: "Museums, architecture, history, and travelers seeking a deep urban experience.", stands: "Moscow and Saint Petersburg each need their own focused plan.", remember: "Check current entry, safety, payment, and transport requirements before treating this as a live trip option." },
    { country: "Bermuda", summary: "Bermuda is an easy island choice for clear water, beaches, short outings, and a vacation that benefits from breathing room.", best: "Families, couples, beaches, snorkeling, and relaxed warm-weather trips.", stands: "Hamilton, the South Shore, and St. George's offer different versions of the island.", remember: "Plan around beach windows, ferries, weather, and realistic island transport." },
    { country: "Uzbekistan", summary: "Uzbekistan suits travelers who want Silk Road history, striking architecture, markets, and an itinerary that feels genuinely different.", best: "History, architecture, food, photography, and adventurous city travel.", stands: "Tashkent, Samarkand, Bukhara, and Khiva create a strong historic route.", remember: "Rail and transfer days matter, so keep the route focused and allow time between cities." },
    { country: "Dominica", summary: "Dominica is built for travelers who want rainforest, waterfalls, hot springs, and a Caribbean trip that leans active rather than resort-only.", best: "Hiking, nature, waterfalls, wellness, and adventurous island travel.", stands: "Roseau is the practical base, with rainforest and coastal outings shaping the rest.", remember: "Weather, road conditions, and hike difficulty should be treated as part of the itinerary." },
    { country: "Türkiye", summary: "Türkiye works for travelers who want history, food, coastlines, markets, and a route that can shift from city energy to slow seaside time.", best: "Culture, food, history, couples trips, and varied multi-city itineraries.", stands: "Istanbul, Cappadocia, the Aegean, and the Mediterranean each bring a different mood.", remember: "Distances are meaningful, so choose a region or protect the flights and transfers that make the route work." },
    { country: "Hungary", summary: "Hungary is a good match for travelers who want thermal baths, architecture, nightlife, food, and strong value in a European city break.", best: "City breaks, couples, history, nightlife, and wellness.", stands: "Budapest is the clear anchor, with the Danube, baths, ruin bars, and nearby wine country.", remember: "Build in a slower bath or cafe period instead of filling every hour with sightseeing." },
    { country: "Jordan", summary: "Jordan brings together ancient history, desert landscapes, warm hospitality, and a compact route with big emotional payoff.", best: "History, desert adventure, family trips, and meaningful cultural travel.", stands: "Amman, Petra, Wadi Rum, and the Dead Sea make a natural first route.", remember: "Heat, driving distances, guide quality, and early starts matter for the major sites." },
    { country: "Israel", summary: "Israel offers layered history, food, coastline, and highly contrasting city and landscape experiences.", best: "History, food, beaches, faith-related travel, and culturally focused trips.", stands: "Jerusalem, Tel Aviv, the Galilee, and the Dead Sea create different travel moods.", remember: "Current entry, safety, access, and local conditions must be checked close to travel." },
    { country: "Panama", summary: "Panama works well for travelers who want a modern city, tropical islands, rainforest, and an easy Central American mix.", best: "Warm-weather escapes, nature, beaches, food, and short multi-stop trips.", stands: "Panama City, the Canal, Bocas del Toro, and the Pacific coast offer different trip styles.", remember: "Choose coast and city priorities early because transfers can make a short trip feel busy." },
    { country: "Venezuela", summary: "Venezuela has extraordinary landscapes, from Caribbean coastlines to table-top mountains, for travelers seeking a more unusual route.", best: "Nature, adventure, landscapes, and experienced travelers.", stands: "Caracas, the coast, Angel Falls, and Los Roques each require different logistics.", remember: "Current safety, access, transport, and trusted local support need to be confirmed before planning." },
    { country: "Ecuador", summary: "Ecuador is a compact destination with colonial cities, volcanoes, cloud forest, coast, and the Galapagos as a major add-on.", best: "Nature, family trips, wildlife, hiking, and varied short routes.", stands: "Quito, the Andes, the Amazon, the coast, and the Galapagos create very different experiences.", remember: "Altitude and flight logistics matter, so avoid making every day an active one." },
    { country: "Greenland", summary: "Greenland is for travelers who want ice, remote landscapes, small-town culture, and an expedition feeling without a conventional city itinerary.", best: "Adventure, photography, nature, and rare destination travel.", stands: "Nuuk, Ilulissat, and the fjords offer strong starting points with different levels of access.", remember: "Weather, limited transport, and seasonal access control the trip more than a fixed schedule." },
    { country: "Lebanon", summary: "Lebanon brings food, history, coastline, mountains, and a compact route with a strong cultural personality.", best: "Food, history, nightlife, coast, and travelers looking for depth in a small area.", stands: "Beirut, Byblos, the mountains, and the Bekaa Valley each shape a different day.", remember: "Check current safety, transport, and local operating conditions before planning a trip." },
    { country: "Iran", summary: "Iran offers extraordinary architecture, food, gardens, and historic cities for travelers seeking a deeply cultural experience.", best: "History, architecture, food, photography, and experienced cultural travelers.", stands: "Tehran, Isfahan, Shiraz, and Yazd create a rich first route.", remember: "Visa, entry, payment, dress, internet, and current safety requirements must be checked carefully." },
    { country: "Nepal", summary: "Nepal is a strong fit for travelers who want mountain scenery, trekking, temples, and a trip that can be active or reflective.", best: "Hiking, culture, wellness, photography, and adventurous travelers.", stands: "Kathmandu, Pokhara, and the major trekking gateways offer different levels of intensity.", remember: "Altitude, fitness, permits, and weather should determine the pace." },
    { country: "Myanmar", summary: "Myanmar has remarkable temples, rivers, markets, and cultural depth for travelers considering a more unusual Southeast Asian route.", best: "History, culture, photography, and experienced travelers.", stands: "Yangon, Bagan, Mandalay, and Inle Lake have distinct strengths.", remember: "Current safety, access, visa, and local conditions need careful verification before planning." },
    { country: "Cambodia", summary: "Cambodia combines powerful history, temple landscapes, welcoming cities, and easy add-ons for food and beach time.", best: "History, family trips, culture, value, and Southeast Asia routes.", stands: "Siem Reap and Angkor are the anchor, with Phnom Penh and the coast adding contrast.", remember: "Start temple days early and give the heat, distance, and emotional weight of major sites room." },
    { country: "Papua New Guinea", summary: "Papua New Guinea is for travelers who want remote landscapes, living culture, diving, and a genuinely adventurous route.", best: "Adventure, diving, culture, hiking, and experienced travelers.", stands: "Port Moresby, the Highlands, and coastal or island areas each require specialist planning.", remember: "Use trusted local operators and verify current access, safety, health, and transport conditions." },
    { country: "Mali", summary: "Mali has major West African history, music, architecture, and landscapes for experienced travelers considering a deeply cultural journey.", best: "History, culture, architecture, and experienced expedition-style travel.", stands: "Bamako, Djenné, Mopti, and the broader Sahel region have distinct cultural importance.", remember: "Current safety, access, transport, and local guidance must be verified before planning." },
    { country: "Namibia", summary: "Namibia is made for travelers who want huge landscapes, desert wildlife, road trips, and a quieter sense of adventure.", best: "Road trips, photography, wildlife, desert scenery, and couples trips.", stands: "Windhoek, Sossusvlei, Swakopmund, and Etosha create a strong first route.", remember: "Distances, fuel, road conditions, and remote travel should shape the itinerary." },
    { country: "Madagascar", summary: "Madagascar offers wildlife, unusual landscapes, beaches, and a rare sense of discovery for travelers who want something far from ordinary.", best: "Nature, wildlife, photography, beaches, and adventurous travelers.", stands: "Antananarivo, the national parks, baobab landscapes, and the coast call for different routes.", remember: "Road conditions and transfer times are significant, so fewer regions usually make a better trip." },
    { country: "French Polynesia", summary: "French Polynesia is a strong match for travelers who want lagoons, mountain backdrops, soft adventure, and slower island time.", best: "Honeymoons, luxury, snorkeling, romance, and restorative beach trips.", stands: "Tahiti, Moorea, and Bora Bora can each play a different role in the trip.", remember: "Island transfers and resort location matter, so choose the rhythm before adding more islands." }
  );

  data.countryGuideData = data.countryGuideData || {};
  data.countryGuideCoverage = data.countryGuideCoverage || {};
  countrySeeds.forEach((item) => {
    if (!data.countryGuideData[item.country]) {
      data.countryGuideData[item.country] = {
        title: `${item.country} at a glance`,
        summary: item.summary,
        cards: [["Best for", item.best], ["What stands out", item.stands], ["Good to remember", item.remember]]
      };
      data.countryGuideCoverage[item.country] = { status: "expanded", contentTier: "generated" };
    }
  });

  const cityRecords = [
    { city: "Nice, France", country: "France", title: "Nice", summary: "Best for a relaxed French Riviera trip with a beautiful waterfront, old-town food, and easy coastal add-ons.", highlights: ["Promenade des Anglais", "Old Nice", "Castle Hill"], tip: "Nice works best as a base for one coastal outing at a time, with enough room for a long lunch and beach or market time.", areas: ["Old Nice", "Promenade", "Cimiez"], when: "Late spring through early fall", stay: "Old Nice, Carré d'Or, or near the Promenade", getting: "Walk, tram, and short regional train trips", book: "Villa Ephrussi, coastal day trips, and standout dinners", restaurants: ["Cours Saleya market lunch", "A seafood table near the port", "A small bistro in Old Nice"], unique: ["Castle Hill at golden hour", "Villefranche-sur-Mer by train", "A morning market walk"] },
    { city: "Lyon, France", country: "France", title: "Lyon", summary: "Best for food lovers, history, neighborhood wandering, and a more local-feeling French city break.", highlights: ["Vieux Lyon", "Fourviere Basilica", "Les Halles de Lyon"], tip: "Lyon rewards travelers who plan around meals and neighborhoods instead of treating it like a checklist of monuments.", areas: ["Vieux Lyon", "Presqu'ile", "Croix-Rousse"], when: "Spring and fall", stay: "Presqu'ile, Vieux Lyon, or Croix-Rousse", getting: "Metro, funicular, and walking", book: "A special bouchon meal and Fourviere access", restaurants: ["A traditional bouchon", "Les Halles food stalls", "A modern tasting menu"], unique: ["Traboule passages", "A Croix-Rousse silk history walk", "Rhone and Saone river paths"] },
    { city: "Marseille, France", country: "France", title: "Marseille", summary: "Best for Mediterranean energy, seafood, harbor views, and travelers who want a less polished but more textured French city.", highlights: ["Vieux-Port", "Le Panier", "Calanques National Park"], tip: "Marseille is strongest when the itinerary pairs one city day with one coastal day and leaves space for the city to feel spontaneous.", areas: ["Vieux-Port", "Le Panier", "Endoume"], when: "Late spring through early fall", stay: "Vieux-Port, Le Panier, or Endoume", getting: "Walk, metro, bus, and boat outings", book: "Calanques access and a seafood dinner", restaurants: ["Bouillabaisse by the harbor", "A market lunch", "A neighborhood seafood table"], unique: ["Corniche Kennedy walk", "Boat into the Calanques", "Sunset at Vallon des Auffes"] },
    { city: "Florence, Italy", country: "Italy", title: "Florence", summary: "Best for art, Renaissance history, walkable days, and a romantic city break where the biggest moments are close together.", highlights: ["Uffizi Gallery", "Duomo", "Ponte Vecchio"], tip: "Florence feels better when one major museum or landmark anchors the day and the rest is left open for streets, food, and viewpoints.", areas: ["Duomo", "Oltrarno", "Santa Croce"], when: "Spring and fall", stay: "Duomo, Santa Croce, or Oltrarno", getting: "Walking with short taxi help", book: "Uffizi, Accademia, and a Tuscan day trip", restaurants: ["A Florentine steak dinner", "Mercato Centrale lunch", "A small Oltrarno trattoria"], unique: ["Sunset from Piazzale Michelangelo", "Oltrarno artisan streets", "A half-day Tuscan hill town"] },
    { city: "Milan, Italy", country: "Italy", title: "Milan", summary: "Best for design, fashion, aperitivo, major art, and a faster Italian city break with easy lake access.", highlights: ["Duomo", "Brera", "The Last Supper"], tip: "Milan works best when the trip blends the headline sights with aperitivo and one nearby neighborhood rather than chasing every district.", areas: ["Brera", "Duomo", "Navigli"], when: "Spring, fall, and design season", stay: "Brera, Centro Storico, or Navigli", getting: "Metro, tram, and walking", book: "The Last Supper, rooftop Duomo time, and lake trains", restaurants: ["Aperitivo in Navigli", "A Milanese trattoria", "A polished Brera dinner"], unique: ["Brera gallery morning", "Navigli canal evening", "Lake Como day trip"] },
    { city: "Naples, Italy", country: "Italy", title: "Naples", summary: "Best for serious food, layered history, street energy, and easy access to Pompeii and the Amalfi coast.", highlights: ["Historic Center", "Pompeii", "National Archaeological Museum"], tip: "Naples is not about smoothing every edge; the best plan gives the city a focused food and history day, then uses it as a base for one major outing.", areas: ["Centro Storico", "Chiaia", "Vomero"], when: "Spring and fall", stay: "Centro Storico, Chiaia, or Vomero", getting: "Metro, funicular, walking, and trains", book: "Pompeii, key museums, and a memorable pizza table", restaurants: ["A classic Neapolitan pizzeria", "A market lunch", "A seafood dinner in Santa Lucia"], unique: ["Underground Naples", "Vomero sunset view", "A local pastry stop"] },
    { city: "Osaka, Japan", country: "Japan", title: "Osaka", summary: "Best for casual food, lively neighborhoods, theme-park add-ons, and a more playful city rhythm than Tokyo or Kyoto.", highlights: ["Dotonbori", "Osaka Castle", "Kuromon Market"], tip: "Osaka is easiest when each day has one clear base, with food and evening energy doing as much work as the landmarks.", areas: ["Namba", "Umeda", "Osaka Castle"], when: "Spring, fall, and clear winter days", stay: "Namba, Umeda, or near Osaka Station", getting: "Rail-first with neighborhood walking", book: "Universal Studios, popular restaurants, and special views", restaurants: ["Takoyaki and okonomiyaki crawl", "Kuromon Market lunch", "A late-night izakaya"], unique: ["Shinsekai evening", "TeamLab Botanical Garden", "Day trip to Nara"] },
    { city: "Hiroshima, Japan", country: "Japan", title: "Hiroshima", summary: "Best for meaningful history, island scenery, local food, and a thoughtful city break that works well with a slower pace.", highlights: ["Peace Memorial Park", "Miyajima", "Hiroshima Castle"], tip: "Give Hiroshima enough emotional and practical breathing room; it is better experienced as a focused two- or three-day stay than a rushed stop.", areas: ["Peace Park", "Hondori", "Miyajima"], when: "Spring and fall", stay: "Near Peace Park, Hondori, or one night on Miyajima", getting: "Streetcar, ferry, and walking", book: "Miyajima timing and a local okonomiyaki table", restaurants: ["Hiroshima-style okonomiyaki", "Oyster lunch", "A small Hondori izakaya"], unique: ["Miyajima at a quieter hour", "Peace Museum reflection time", "A local baseball evening"] },
    { city: "Phuket, Thailand", country: "Thailand", title: "Phuket", summary: "Best for beach time, boat days, family resorts, and a Thai vacation that can move from easygoing to adventurous.", highlights: ["Old Phuket Town", "Kata Beach", "Phi Phi Islands"], tip: "Phuket works better when beach recovery days are kept separate from boat and island excursions.", areas: ["Old Town", "Kata", "Kamala"], when: "Dry season beach weather", stay: "Kata, Kamala, or Old Phuket Town", getting: "Rideshares, taxis, and boat transfers", book: "Boat trips, airport transfers, and sunset tables", restaurants: ["Southern Thai dinner", "Old Town market meal", "A beachside seafood table"], unique: ["Old Town food walk", "Quiet beach morning", "Sunset viewpoint above the coast"] },
    { city: "Chiang Mai, Thailand", country: "Thailand", title: "Chiang Mai", summary: "Best for temples, markets, cooking, mountain air, and a more relaxed northern Thai city rhythm.", highlights: ["Old City temples", "Doi Suthep", "Night Bazaar"], tip: "Chiang Mai rewards slow mornings, good meals, and one thoughtful outing more than a packed temple count.", areas: ["Old City", "Nimman", "Riverside"], when: "Cooler dry-season months", stay: "Old City, Nimman, or Riverside", getting: "Walking, rideshares, and day-trip vans", book: "A cooking class and ethical nature outings", restaurants: ["Khao soi lunch", "Night market dinner", "A modern northern Thai table"], unique: ["Monk chat or temple morning", "Doi Suthep at opening", "Craft village outing"] },
    { city: "Bali, Indonesia", country: "Indonesia", title: "Bali", summary: "Best for beach time, wellness, temples, rice fields, and a trip that can be as restful or adventurous as the traveler wants.", highlights: ["Uluwatu Temple", "Ubud rice terraces", "Seminyak or Canggu"], tip: "Bali feels much better when the trip picks two bases instead of trying to cross the island every day.", areas: ["Ubud", "Seminyak", "Uluwatu"], when: "Dry season and shoulder months", stay: "Ubud plus one southern coast base", getting: "Driver days, rideshares, and short walks", book: "Airport transfer, beach clubs, and standout dinners", restaurants: ["A warung lunch", "A Ubud tasting menu", "A sunset seafood dinner"], unique: ["Rice terrace morning", "Temple ceremony respectfully observed", "A quiet spa afternoon"] },
    { city: "Jakarta, Indonesia", country: "Indonesia", title: "Jakarta", summary: "Best for food, contemporary culture, shopping, and travelers who want to see Indonesia through its energetic capital.", highlights: ["Kota Tua", "National Monument", "Menteng food scene"], tip: "Jakarta is a city to plan by district and traffic window; the reward is a deeper food and neighborhood experience.", areas: ["Menteng", "Kota Tua", "South Jakarta"], when: "Dry season and flexible shoulder months", stay: "Menteng, Central Jakarta, or South Jakarta", getting: "Rideshares with traffic buffers", book: "A food-led tour and any time-sensitive city experience", restaurants: ["Nasi padang table", "Modern Indonesian dinner", "Street food market stop"], unique: ["Kota Tua at opening", "Coffee and galleries in South Jakarta", "A local market morning"] },
    { city: "Abu Dhabi, United Arab Emirates", country: "United Arab Emirates", title: "Abu Dhabi", summary: "Best for grand architecture, museums, beaches, family-friendly outings, and a calmer Gulf city break.", highlights: ["Sheikh Zayed Grand Mosque", "Louvre Abu Dhabi", "Saadiyat Beach"], tip: "Abu Dhabi rewards a slower, zone-based plan that leaves room for the mosque, museums, beach, and an easy evening.", areas: ["Saadiyat Island", "Corniche", "Yas Island"], when: "Cooler months", stay: "Saadiyat, Corniche, or Yas Island", getting: "Taxi, rideshare, and planned transfers", book: "Museum time, theme parks, and desert outings", restaurants: ["Emirati-inspired dinner", "Corniche cafe lunch", "A Saadiyat beach meal"], unique: ["Mosque at blue hour", "Mangrove kayaking", "Louvre architecture hour"] },
    { city: "Shanghai, China", country: "China", title: "Shanghai", summary: "Best for skyline views, food, design, historic neighborhoods, and a modern city break with strong contrast.", highlights: ["The Bund", "Yu Garden", "French Concession"], tip: "Shanghai works best when the plan lets old streets, skyline moments, and meals each have their own space.", areas: ["French Concession", "The Bund", "Jing'an"], when: "Spring and fall", stay: "French Concession, Jing'an, or near the Bund", getting: "Metro-first with short rideshares", book: "Observation decks, museums, and destination restaurants", restaurants: ["Xiaolongbao breakfast", "Shanghai cuisine dinner", "A French Concession cafe"], unique: ["Bund skyline walk at night", "Former lane-house neighborhoods", "A market or tea-house morning"] },
    { city: "Chengdu, China", country: "China", title: "Chengdu", summary: "Best for Sichuan food, a slower city pace, pandas, tea houses, and a more relaxed first look at western China.", highlights: ["Chengdu Research Base", "People's Park tea houses", "Kuanzhai Alley"], tip: "Chengdu gets better when the itinerary leaves space for long meals, tea, and the city's famously unhurried rhythm.", areas: ["Chunxi Road", "People's Park", "Kuanzhai Alley"], when: "Spring and fall", stay: "Central Chengdu near the metro", getting: "Metro and rideshares", book: "Panda timing and a serious Sichuan dinner", restaurants: ["Sichuan hot pot", "Dan dan noodles", "Tea-house snacks"], unique: ["Panda morning", "Tea-house afternoon", "A local food crawl"] },
    { city: "Busan, South Korea", country: "South Korea", title: "Busan", summary: "Best for beaches, seafood, coastal walks, markets, and a South Korea trip with more open air than Seoul.", highlights: ["Haeundae Beach", "Gamcheon Culture Village", "Jagalchi Market"], tip: "Busan is easier when the day stays on one side of the city and the coast, market, or neighborhood carries the mood.", areas: ["Haeundae", "Nampo", "Gwangalli"], when: "Spring, fall, and beach season", stay: "Haeundae, Gwangalli, or Nampo", getting: "Metro, buses, and occasional taxi", book: "A seafood table and any coastal rail or boat outing", restaurants: ["Jagalchi seafood lunch", "Gwangalli barbecue", "Market snacks"], unique: ["Gwangalli bridge at night", "Haedong Yonggungsa Temple", "Coastal walking route"] },
    { city: "Hanoi, Vietnam", country: "Vietnam", title: "Hanoi", summary: "Best for street food, old streets, lakes, history, and a city break that feels vivid from breakfast through late evening.", highlights: ["Old Quarter", "Hoan Kiem Lake", "Temple of Literature"], tip: "Hanoi works best when food and neighborhood walking are treated as the main event, not filler between attractions.", areas: ["Old Quarter", "French Quarter", "West Lake"], when: "Spring, fall, and cooler winter days", stay: "Old Quarter, French Quarter, or West Lake", getting: "Walking, rideshares, and short transfers", book: "A food tour and any overnight bay trip", restaurants: ["Pho breakfast", "Bun cha lunch", "A modern Vietnamese dinner"], unique: ["Early lake walk", "Train Street area with care", "Coffee and egg coffee stop"] },
    { city: "Ho Chi Minh City, Vietnam", country: "Vietnam", title: "Ho Chi Minh City", summary: "Best for food, nightlife, history, coffee, and a high-energy city break with easy day-trip options.", highlights: ["War Remnants Museum", "Ben Thanh area", "District 1 food streets"], tip: "The city feels more manageable when mornings hold the history and afternoons shift toward food, coffee, and neighborhoods.", areas: ["District 1", "District 3", "Thao Dien"], when: "Dry season and flexible shoulder months", stay: "District 1, District 3, or Thao Dien", getting: "Walking pockets and rideshares", book: "A food tour, Cu Chi tunnels, and standout dinners", restaurants: ["Banh mi breakfast", "Pho or bun bo hue lunch", "A rooftop dinner"], unique: ["Cafe apartment visit", "District 3 architecture walk", "Mekong day trip"] },
    { city: "Da Nang, Vietnam", country: "Vietnam", title: "Da Nang", summary: "Best for beach time, easy food, mountain views, and a practical central Vietnam base with Hoi An nearby.", highlights: ["My Khe Beach", "Marble Mountains", "Hoi An day trip"], tip: "Da Nang works well when the trip keeps mornings for sights and afternoons for the beach, food, or a slower nearby town.", areas: ["My Khe", "Han River", "Son Tra"], when: "Dry season beach weather", stay: "My Khe, Han River, or Son Tra", getting: "Rideshares, walking, and day-trip drivers", book: "Hoi An transfer, Ba Na Hills if desired, and local seafood", restaurants: ["Mi Quang lunch", "Fresh seafood dinner", "A riverside coffee stop"], unique: ["Son Tra peninsula drive", "Marble Mountains early", "Lantern-lit Hoi An evening"] },
    { city: "Delhi, India", country: "India", title: "Delhi", summary: "Best for major history, street food, markets, museums, and a powerful first introduction to India.", highlights: ["Old Delhi", "Humayun's Tomb", "Qutub Minar"], tip: "Delhi needs breathing room between major sights, heat, traffic, and meals; a focused neighborhood plan makes the city much more rewarding.", areas: ["New Delhi", "Old Delhi", "Hauz Khas"], when: "Cooler months", stay: "Central Delhi, Aerocity, or South Delhi", getting: "Metro with planned rides", book: "A food walk, major monuments, and an Agra connection", restaurants: ["Old Delhi food walk", "North Indian dinner", "A South Delhi cafe"], unique: ["Lodhi Garden morning", "Spice Market with a guide", "Humayun's Tomb at opening"] },
    { city: "Mumbai, India", country: "India", title: "Mumbai", summary: "Best for food, film, architecture, waterfront walks, and a city whose energy is the main attraction.", highlights: ["Gateway of India", "Marine Drive", "Kala Ghoda"], tip: "Mumbai is strongest when the itinerary follows the city's neighborhoods and food instead of trying to cover the whole region in one day.", areas: ["Colaba", "Fort", "Bandra"], when: "Cooler dry-season months", stay: "Colaba, Fort, or Bandra", getting: "Walking pockets, trains for confident travelers, and rideshares", book: "A food tour and any hard-to-get restaurant", restaurants: ["Street food with a guide", "Seafood in Colaba", "A modern Indian dinner"], unique: ["Marine Drive sunset", "Kala Ghoda galleries", "Bandra neighborhood walk"] },
    { city: "Jaipur, India", country: "India", title: "Jaipur", summary: "Best for forts, color, craft, architecture, and a memorable Rajasthan stop that works well with Delhi and Agra.", highlights: ["Amber Fort", "City Palace", "Hawa Mahal"], tip: "Jaipur works best with early starts for the forts, a slower midday, and an evening built around food or craft rather than another monument.", areas: ["Pink City", "Amer", "Civil Lines"], when: "Cooler months", stay: "Pink City, Civil Lines, or near Amer", getting: "Driver days and short rides", book: "Amber Fort timing and a thoughtful local guide", restaurants: ["Rajasthani thali", "Rooftop dinner", "A local sweets stop"], unique: ["Amber Fort before crowds", "Block-print workshop", "Pink City evening walk"] },
    { city: "Seville, Spain", country: "Spain", title: "Seville", summary: "Best for warm evenings, tapas, historic neighborhoods, flamenco, and a city that rewards a slower pace.", highlights: ["Real Alcazar", "Seville Cathedral", "Plaza de Espana"], tip: "Seville is built around late meals and evening life, so do not schedule the day as if the city runs on an early timetable.", areas: ["Santa Cruz", "Triana", "Alameda"], when: "Spring and fall", stay: "Santa Cruz, El Arenal, or Alameda", getting: "Walking and short taxi rides", book: "Alcazar, flamenco, and a special tapas evening", restaurants: ["Classic tapas crawl", "Triana market lunch", "A late dinner in Alameda"], unique: ["Plaza de Espana at opening", "Triana ceramics", "Orange-tree neighborhood walk"] },
    { city: "Valencia, Spain", country: "Spain", title: "Valencia", summary: "Best for beaches, paella, design, easy cycling, and a Spanish city break with more room to breathe.", highlights: ["City of Arts and Sciences", "Turia Gardens", "Malvarrosa Beach"], tip: "Valencia shines when the itinerary mixes one cultural anchor with cycling, market time, and an unhurried meal.", areas: ["Ciutat Vella", "Ruzafa", "Cabanyal"], when: "Spring, early summer, and fall", stay: "Ciutat Vella, Ruzafa, or near the beach", getting: "Walking, cycling, and transit", book: "City of Arts timing and a real paella lunch", restaurants: ["Paella by the coast", "Central Market lunch", "Ruzafa dinner"], unique: ["Turia Gardens bike ride", "Cabanyal street walk", "Albufera sunset"] },
    { city: "Berlin, Germany", country: "Germany", title: "Berlin", summary: "Best for history, art, nightlife, neighborhoods, and travelers who prefer a city with room for discovery.", highlights: ["Museum Island", "Brandenburg Gate", "East Side Gallery"], tip: "Berlin rewards travelers who choose a few districts and let the city's art, food, and history fill the spaces between major sights.", areas: ["Mitte", "Kreuzberg", "Prenzlauer Berg"], when: "Late spring through early fall", stay: "Mitte, Kreuzberg, or Prenzlauer Berg", getting: "U-Bahn, S-Bahn, and walking", book: "Museum Island, a history tour, and one standout meal", restaurants: ["Currywurst or market lunch", "Kreuzberg food hall", "Modern German dinner"], unique: ["Tempelhof field", "Courtyard and gallery crawl", "Spree evening walk"] },
    { city: "Munich, Germany", country: "Germany", title: "Munich", summary: "Best for polished city days, museums, beer gardens, family-friendly outings, and easy alpine add-ons.", highlights: ["Marienplatz", "English Garden", "Nymphenburg Palace"], tip: "Munich makes a good base when city highlights and one scenic day are balanced instead of stacking several long excursions.", areas: ["Altstadt", "Maxvorstadt", "Haidhausen"], when: "Late spring through fall", stay: "Altstadt, Maxvorstadt, or Haidhausen", getting: "U-Bahn, tram, and walking", book: "Popular beer halls, palace visits, and any alpine day trip", restaurants: ["Beer garden lunch", "Bavarian dinner", "A bakery breakfast"], unique: ["English Garden morning", "Museum quarter afternoon", "Lake or castle day trip"] },
    { city: "Edinburgh, United Kingdom", country: "United Kingdom", title: "Edinburgh", summary: "Best for dramatic history, compact walking, pubs, festivals, and easy access to Scottish scenery.", highlights: ["Edinburgh Castle", "Royal Mile", "Arthur's Seat"], tip: "Edinburgh can feel steep and weather-sensitive, so pair major walking days with flexible indoor time and a real pub or cafe break.", areas: ["Old Town", "New Town", "Stockbridge"], when: "Late spring through early fall", stay: "Old Town, New Town, or Stockbridge", getting: "Walking, buses, and short taxis", book: "Castle, festival events, and a special whisky or dinner experience", restaurants: ["Modern Scottish dinner", "Stockbridge cafe", "Pub lunch"], unique: ["Arthur's Seat sunrise", "Dean Village walk", "Ghost or history tour"] },
    { city: "Dublin, Ireland", country: "Ireland", title: "Dublin", summary: "Best for pubs, literature, live music, history, and an easy city start before exploring more of Ireland.", highlights: ["Trinity College", "Temple Bar area", "Guinness Storehouse"], tip: "Dublin works best when the big attractions are balanced with neighborhood pubs, bookshops, and room for the city's social rhythm.", areas: ["Temple Bar", "Georgian Dublin", "Rathmines"], when: "Late spring through early fall", stay: "City Centre, Georgian Dublin, or near St Stephen's Green", getting: "Walking, buses, and taxis", book: "Guinness, live music, and any sought-after dinner", restaurants: ["Pub lunch", "Modern Irish dinner", "A bakery or cafe morning"], unique: ["Literary walking tour", "Howth coastal train", "Live trad music night"] },
    { city: "Marrakesh, Morocco", country: "Morocco", title: "Marrakesh", summary: "Best for markets, riads, design, food, and a vivid city break that needs a little calm built into the plan.", highlights: ["Jemaa el-Fnaa", "Majorelle Garden", "Medina souks"], tip: "Marrakesh feels more enjoyable when one sensory market day is followed by a quieter garden, hammam, or riad afternoon.", areas: ["Medina", "Gueliz", "Kasbah"], when: "Spring and fall", stay: "Medina, Kasbah, or Gueliz", getting: "Walking in the old city and planned taxis", book: "Garden entry, hammam, and a memorable riad dinner", restaurants: ["Riad dinner", "Medina market meal", "A modern Moroccan table"], unique: ["Rooftop tea at sunset", "Hammam afternoon", "Atlas Mountains day trip"] },
    { city: "Casablanca, Morocco", country: "Morocco", title: "Casablanca", summary: "Best for modern Morocco, Art Deco streets, oceanfront walks, and a practical city gateway with real local energy.", highlights: ["Hassan II Mosque", "Art Deco center", "Corniche"], tip: "Casablanca is strongest as a focused city stay or arrival stop, not as a rushed substitute for every other Moroccan destination.", areas: ["City Center", "Ain Diab", "Habous"], when: "Spring and fall", stay: "City Center, Ain Diab, or near the mosque", getting: "Tram, taxis, and walking", book: "Mosque access and a seafood or Moroccan dinner", restaurants: ["Seafood on the Corniche", "Habous pastry stop", "A traditional Moroccan dinner"], unique: ["Art Deco architecture walk", "Hassan II at golden hour", "Habous market morning"] },
    { city: "Cairo, Egypt", country: "Egypt", title: "Cairo", summary: "Best for ancient history, museums, river views, and a city that rewards guided context and realistic pacing.", highlights: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili"], tip: "Cairo is easier when headline sights, heat, traffic, and recovery time are planned as one system instead of separate details.", areas: ["Downtown", "Zamalek", "Giza"], when: "Cooler months", stay: "Zamalek, Downtown, or Giza", getting: "Guided transfers, rideshares, and short walks", book: "Pyramids timing, museum access, and a trusted guide", restaurants: ["Koshary lunch", "Nile dinner", "A Zamalek cafe"], unique: ["Pyramids at opening", "Coptic Cairo walk", "Sunset felucca ride"] },
    { city: "Luxor, Egypt", country: "Egypt", title: "Luxor", summary: "Best for temples, tombs, river views, and a concentrated history trip with an unforgettable sense of place.", highlights: ["Karnak Temple", "Valley of the Kings", "Luxor Temple"], tip: "Luxor needs early starts and a midday reset; the heat makes a slower plan feel smarter, not less ambitious.", areas: ["East Bank", "West Bank", "Nile Corniche"], when: "Cooler months", stay: "East Bank, West Bank, or near the Corniche", getting: "Guided vans, taxis, and short boat crossings", book: "Valley of the Kings, sunrise balloon options, and a Nile dinner", restaurants: ["Nile-side dinner", "Local Egyptian lunch", "A hotel terrace meal"], unique: ["West Bank sunrise", "Felucca at dusk", "A smaller tomb with a guide"] },
    { city: "Nairobi, Kenya", country: "Kenya", title: "Nairobi", summary: "Best for a city-to-safari start, creative food, wildlife experiences, and a practical gateway to Kenya.", highlights: ["Nairobi National Park", "Karen Blixen Museum", "Giraffe Centre"], tip: "Nairobi works well when the first day is lighter after the flight, then the city and wildlife stops are grouped by area.", areas: ["Karen", "Westlands", "City Centre"], when: "Dry seasons and flexible shoulder months", stay: "Karen, Westlands, or near the airport", getting: "Rideshares and trusted drivers", book: "Park entry, wildlife experiences, and safari connections", restaurants: ["Kenyan tasting menu", "Nairobi coffee stop", "Dinner in Karen"], unique: ["Early park drive", "Craft market visit", "A city garden or gallery afternoon"] },
    { city: "Zanzibar, Tanzania", country: "Tanzania", title: "Zanzibar", summary: "Best for warm-water beaches, Stone Town history, spice, and a soft landing after a safari or as a standalone island trip.", highlights: ["Stone Town", "Nungwi or Kendwa beaches", "Spice farm visit"], tip: "Zanzibar feels best when Stone Town and beach time are given separate roles instead of being squeezed into the same day.", areas: ["Stone Town", "Nungwi", "Jambiani"], when: "Dry seasons and warm beach months", stay: "Stone Town plus one beach base", getting: "Private transfers and short walks", book: "Airport transfer, boat trips, and special beach dinners", restaurants: ["Forodhani evening food", "Swahili dinner", "Fresh seafood by the beach"], unique: ["Stone Town morning walk", "Dhow sunset cruise", "Spice farm afternoon"] },
    { city: "Johannesburg, South Africa", country: "South Africa", title: "Johannesburg", summary: "Best for contemporary culture, history, food, and a city base before a wider South African route.", highlights: ["Apartheid Museum", "Maboneng", "Soweto"], tip: "Johannesburg is more rewarding when the itinerary follows a local guide and a few meaningful neighborhoods rather than a scattered sightseeing list.", areas: ["Rosebank", "Maboneng", "Soweto"], when: "Most seasons with local weather checks", stay: "Rosebank, Sandton, or Melville", getting: "Rideshares and trusted guides", book: "Soweto, museums, and any airport or safari connection", restaurants: ["Braai dinner", "Market lunch", "A contemporary South African table"], unique: ["Soweto with a local guide", "Maboneng art walk", "A city viewpoint or market"] },
    { city: "Honolulu, United States", country: "United States", title: "Honolulu", summary: "Best for an easy island base with beaches, food, history, and outdoor days that can stay as active or relaxed as the group wants.", highlights: ["Waikiki Beach", "Diamond Head", "Pearl Harbor"], tip: "Honolulu works best when beach recovery, one nature day, and one cultural or food day are treated as separate anchors.", areas: ["Waikiki", "Kaimuki", "Ala Moana"], when: "Year-round with weather-aware planning", stay: "Waikiki, Kaimuki, or Ala Moana", getting: "Walking, rideshares, and planned car days", book: "Diamond Head, Pearl Harbor, and popular dinner spots", restaurants: ["Poke lunch", "Plate lunch", "A Waikiki sunset dinner"], unique: ["Diamond Head morning", "North Shore day", "Kaimuki food crawl"] },
    { city: "Queenstown, New Zealand", country: "New Zealand", title: "Queenstown", summary: "Best for mountain scenery, outdoor adventure, wine, and a high-energy South Island base with strong couples and group appeal.", highlights: ["Lake Wakatipu", "Skyline Queenstown", "Milford Sound"], tip: "Queenstown needs weather flexibility; choose the must-do adventure first and keep the surrounding days lighter.", areas: ["Queenstown Bay", "Frankton", "Arrowtown"], when: "Choose summer for hiking or winter for snow", stay: "Queenstown Bay, Frankton, or Arrowtown", getting: "Walking, shuttles, and planned day tours", book: "Milford, adventure activities, and popular restaurants", restaurants: ["Lakeside dinner", "Arrowtown lunch", "A local winery meal"], unique: ["Lakefront sunrise", "Arrowtown half-day", "Scenic flight or fjord day"] },
    { city: "Reykjavik, Iceland", country: "Iceland", title: "Reykjavik", summary: "Best for a compact city base, geothermal culture, excellent food, and easy access to Iceland's biggest landscapes.", highlights: ["Hallgrimskirkja", "Harpa Concert Hall", "Golden Circle"], tip: "Reykjavik works as a comfortable base, but the real trip comes from giving weather-led day trips enough room to change.", areas: ["Midborg", "Old Harbor", "Vesturbaer"], when: "Summer for long days or winter for aurora chances", stay: "Midborg, Old Harbor, or Vesturbaer", getting: "Walking, buses, and day-trip operators", book: "Blue Lagoon or similar geothermal time and major tours", restaurants: ["Icelandic seafood", "Rye bread and soup lunch", "A modern Nordic dinner"], unique: ["Geothermal pool evening", "Harbor walk", "Golden Circle with a flexible operator"] },
    { city: "Vienna, Austria", country: "Austria", title: "Vienna", summary: "Best for grand architecture, music, museums, cafes, and a city break that feels polished without being frantic.", highlights: ["Schonbrunn Palace", "MuseumsQuartier", "St. Stephen's Cathedral"], tip: "Vienna is best when the plan alternates major interiors with cafes, parks, and time to let the city's elegance settle in.", areas: ["Innere Stadt", "Neubau", "Leopoldstadt"], when: "Spring, fall, and festive winter", stay: "Innere Stadt, Neubau, or Leopoldstadt", getting: "Tram, U-Bahn, and walking", book: "Concerts, palace time, and popular coffeehouses", restaurants: ["Heuriger evening", "Classic cafe lunch", "Modern Austrian dinner"], unique: ["Museum morning", "Prater evening", "Classical concert"] },
    { city: "Prague, Czechia", country: "Czechia", title: "Prague", summary: "Best for storybook architecture, river views, history, beer, and an easy-value city break.", highlights: ["Charles Bridge", "Old Town Square", "Prague Castle"], tip: "Prague feels best before the center gets busy and after the day slows down, so protect early walks and relaxed evenings.", areas: ["Old Town", "Mala Strana", "Vinohrady"], when: "Spring, fall, and festive winter", stay: "Old Town, Mala Strana, or Vinohrady", getting: "Walking, trams, and metro", book: "Castle timing and any concert or special dinner", restaurants: ["Czech pub lunch", "Vinohrady dinner", "Bakery and coffee morning"], unique: ["Charles Bridge at sunrise", "Letna viewpoint", "Evening classical music"] },
    { city: "Buenos Aires, Argentina", country: "Argentina", title: "Buenos Aires", summary: "Best for late-night dining, tango, grand neighborhoods, parks, and a city trip with a distinctly European-meets-Latin rhythm.", highlights: ["Recoleta Cemetery", "San Telmo", "Palermo parks"], tip: "Buenos Aires runs later than many travelers expect, so the plan should leave room for long dinners, a slower afternoon, and evening energy.", areas: ["Palermo", "Recoleta", "San Telmo"], when: "Spring and fall", stay: "Palermo, Recoleta, or San Telmo", getting: "Walking pockets and rideshares", book: "Tango, standout steak, and popular cultural events", restaurants: ["Parrilla dinner", "Cafe con leche morning", "San Telmo market lunch"], unique: ["Tango night", "Recoleta architecture walk", "Palermo sunset park time"] },
    { city: "Lima, Peru", country: "Peru", title: "Lima", summary: "Best for exceptional food, coastal neighborhoods, museums, and a sophisticated first stop before the Andes.", highlights: ["Miraflores", "Barranco", "Historic Center"], tip: "Lima is worth treating as a food destination in its own right, not just a place to sleep before Cusco.", areas: ["Miraflores", "Barranco", "Historic Center"], when: "Clearer coastal months and flexible shoulder seasons", stay: "Miraflores, Barranco, or San Isidro", getting: "Rideshares with traffic buffers", book: "Destination restaurants and a guided historic walk", restaurants: ["Ceviche lunch", "Modern Peruvian tasting menu", "Barranco cafe evening"], unique: ["Cliffside sunset", "Barranco art walk", "A serious market or food tour"] },
    { city: "Santiago, Chile", country: "Chile", title: "Santiago", summary: "Best for city culture, mountain views, wine country, and a practical base for a wider Chile route.", highlights: ["Cerro San Cristobal", "Lastarria", "Central Market"], tip: "Santiago works well when the trip keeps city neighborhoods together and saves a full day for wine or the mountains.", areas: ["Lastarria", "Bellavista", "Providencia"], when: "Spring and fall", stay: "Lastarria, Providencia, or Bellavista", getting: "Metro, walking, and day-trip drivers", book: "Winery visits, mountain access, and a standout dinner", restaurants: ["Seafood market lunch", "Chilean wine dinner", "A Lastarria cafe"], unique: ["Hilltop sunset", "Maipo Valley day", "Neighborhood gallery walk"] },
    { city: "Cartagena, Colombia", country: "Colombia", title: "Cartagena", summary: "Best for colorful old streets, Caribbean heat, rooftop evenings, and a relaxed city-and-island vacation.", highlights: ["Walled City", "Getsemani", "Rosario Islands"], tip: "Cartagena feels better when the plan protects shaded midday time and separates old-city wandering from the beach or boat day.", areas: ["Walled City", "Getsemani", "Bocagrande"], when: "Dry season and shoulder months", stay: "Walled City, Getsemani, or Bocagrande", getting: "Walking, taxis, and boat transfers", book: "Rosario Islands, rooftop dinners, and airport transfers", restaurants: ["Caribbean seafood", "Getsemani street food", "A rooftop dinner"], unique: ["Old city at sunrise", "Rosario beach day", "Getsemani evening music"] }
  ];

  const nextCitySeeds = [
    { city: "Bordeaux, France", country: "France", title: "Bordeaux", summary: "Best for wine, elegant streets, riverside walks, and a slower French city break with easy countryside access.", highlights: ["Place de la Bourse", "Cite du Vin", "Saint-Emilion"], tip: "Bordeaux works best when the city gets a full day of its own before the trip adds a vineyard outing.", areas: ["Golden Triangle", "Chartrons", "Saint-Michel"], food: "a market lunch and local wine", unique: ["Garonne river walk", "Saint-Emilion day", "Chartrons design shops"], when: "Spring, summer, and fall" },
    { city: "Strasbourg, France", country: "France", title: "Strasbourg", summary: "Best for canals, half-timbered streets, seasonal markets, and an easy Alsace city break.", highlights: ["La Petite France", "Strasbourg Cathedral", "European Quarter"], tip: "Strasbourg is compact enough for a gentle walking trip, especially when the old center and river are allowed to carry the day.", areas: ["Grande Ile", "Petite France", "Krutenau"], food: "an Alsatian lunch", unique: ["Canal boat ride", "Christmas market season", "A day through Alsace villages"], when: "Spring, fall, and festive winter" },
    { city: "Annecy, France", country: "France", title: "Annecy", summary: "Best for lake scenery, easy outdoor time, old-town wandering, and a restorative French Alps escape.", highlights: ["Lake Annecy", "Old Town canals", "Semnoz viewpoint"], tip: "Annecy is at its best when the lake is the anchor and the schedule leaves room for a bike ride, swim, or long cafe stop.", areas: ["Old Town", "Lakeside", "Talloires"], food: "a lakeside lunch", unique: ["Lake cycle route", "Morning market", "Talloires boat outing"], when: "Late spring through early fall" },
    { city: "Bologna, Italy", country: "Italy", title: "Bologna", summary: "Best for food, arcades, university energy, and a walkable Italian city that feels local from the first meal.", highlights: ["Piazza Maggiore", "Two Towers", "Quadrilatero market"], tip: "Bologna rewards travelers who plan around food and let the porticoes connect the rest of the day.", areas: ["Centro Storico", "Quadrilatero", "Santo Stefano"], food: "fresh pasta and a market meal", unique: ["Portico walk to San Luca", "A pasta-making class", "Evening in Santo Stefano"], when: "Spring and fall" },
    { city: "Verona, Italy", country: "Italy", title: "Verona", summary: "Best for romance, Roman history, piazzas, and a compact Italian stop that pairs well with northern Italy.", highlights: ["Arena di Verona", "Piazza delle Erbe", "Castel San Pietro"], tip: "Verona is easy to over-plan because it is compact; keep an afternoon open for river walks and a long dinner.", areas: ["Centro Storico", "San Zeno", "Veronetta"], food: "a Veneto dinner", unique: ["Sunset from Castel San Pietro", "Opera at the Arena", "Lake Garda day"], when: "Spring, fall, and opera season" },
    { city: "Palermo, Italy", country: "Italy", title: "Palermo", summary: "Best for markets, street food, layered history, and a high-energy Sicilian city break with coastal add-ons.", highlights: ["Palermo Cathedral", "Ballaro Market", "Palatine Chapel"], tip: "Palermo feels more memorable when the day follows the markets and neighborhoods instead of chasing every historic building.", areas: ["Centro Storico", "Kalsa", "Mondello"], food: "a street-food lunch", unique: ["Market breakfast", "Monreale day", "Mondello beach afternoon"], when: "Spring, fall, and early summer" },
    { city: "Coimbra, Portugal", country: "Portugal", title: "Coimbra", summary: "Best for university history, river views, tiled streets, and a quieter Portuguese city stop.", highlights: ["University of Coimbra", "Joanina Library", "Monastery of Santa Clara-a-Nova"], tip: "Coimbra works well as a one- or two-night pause where history and a slower local rhythm matter more than a long checklist.", areas: ["University Hill", "Baixa", "Santa Clara"], food: "a traditional Portuguese lunch", unique: ["Fado de Coimbra", "Mondego river walk", "Convent visit"], when: "Spring and fall" },
    { city: "Funchal, Portugal", country: "Portugal", title: "Funchal", summary: "Best for Madeira scenery, ocean views, gardens, and a warm island trip with active and relaxed options.", highlights: ["Funchal Old Town", "Monte Palace", "Pico do Arieiro"], tip: "Funchal is strongest when one viewpoint or levada walk is paired with an easy food and waterfront day.", areas: ["Old Town", "Lido", "Monte"], food: "a seafood dinner", unique: ["Levada walk", "Cable car to Monte", "Sunset at a coastal viewpoint"], when: "Spring, fall, and mild winter" },
    { city: "Nara, Japan", country: "Japan", title: "Nara", summary: "Best for temples, park walks, traditional streets, and a peaceful cultural day close to Kyoto and Osaka.", highlights: ["Todai-ji", "Nara Park", "Kasuga Taisha"], tip: "Nara deserves an early start and a slower finish; the temples are only part of why the city feels special.", areas: ["Nara Park", "Naramachi", "Mount Kasuga"], food: "a simple Japanese set lunch", unique: ["Early temple walk", "Naramachi craft shops", "Kasugayama forest path"], when: "Spring, fall, and clear winter days" },
    { city: "Sapporo, Japan", country: "Japan", title: "Sapporo", summary: "Best for winter festivals, wide-open city planning, seafood, ramen, and a different side of Japan.", highlights: ["Odori Park", "Sapporo Beer Museum", "Mount Moiwa"], tip: "Sapporo changes dramatically by season, so the trip should choose between snow, food, flowers, or nearby nature first.", areas: ["Odori", "Susukino", "Maruyama"], food: "miso ramen and seafood", unique: ["Mount Moiwa night view", "Otaru day trip", "Seasonal festival"], when: "Winter for snow or summer for outdoors" },
    { city: "Fukuoka, Japan", country: "Japan", title: "Fukuoka", summary: "Best for easy food travel, compact neighborhoods, temples, and a relaxed gateway to Kyushu.", highlights: ["Canal City", "Ohori Park", "Dazaifu Tenmangu"], tip: "Fukuoka is a low-friction city break where food stalls, parks, and one nearby outing can fill a few excellent days.", areas: ["Hakata", "Tenjin", "Nakasu"], food: "Hakata ramen and yatai food stalls", unique: ["Ohori Park morning", "Dazaifu half-day", "Nakasu evening stalls"], when: "Spring, fall, and food-focused winter trips" },
    { city: "Krabi, Thailand", country: "Thailand", title: "Krabi", summary: "Best for limestone cliffs, island boats, beaches, and a Thai escape that feels more scenic than urban.", highlights: ["Railay Beach", "Ao Nang", "Four Islands"], tip: "Krabi works best when boat days are balanced with a quiet beach or pool day rather than stacked back-to-back.", areas: ["Ao Nang", "Railay", "Krabi Town"], food: "a southern Thai seafood meal", unique: ["Railay at low tide", "Longtail boat day", "Emerald Pool outing"], when: "Dry season beach weather" },
    { city: "Koh Samui, Thailand", country: "Thailand", title: "Koh Samui", summary: "Best for resort comfort, beaches, easy boat trips, and a tropical vacation that can stay relaxed or active.", highlights: ["Chaweng or Lamai Beach", "Big Buddha", "Ang Thong Marine Park"], tip: "Koh Samui feels better when resort time stays protected and the island outing is treated as a highlight, not a daily obligation.", areas: ["Chaweng", "Bophut", "Lamai"], food: "a beachfront Thai dinner", unique: ["Ang Thong boat day", "Fisherman's Village evening", "Waterfall and island drive"], when: "The drier island season" },
    { city: "Ubud, Indonesia", country: "Indonesia", title: "Ubud", summary: "Best for rice terraces, temples, wellness, art, and travelers who want Bali to feel calmer and more grounded.", highlights: ["Tegallalang Rice Terraces", "Ubud Monkey Forest", "Saraswati Temple"], tip: "Ubud works best with slow mornings and fewer transfers; the landscape and local rituals need room to become part of the trip.", areas: ["Central Ubud", "Tegallalang", "Penestanan"], food: "a Balinese lunch", unique: ["Rice terrace sunrise", "Cooking class", "A quiet spa afternoon"], when: "Dry season and shoulder months" },
    { city: "Yogyakarta, Indonesia", country: "Indonesia", title: "Yogyakarta", summary: "Best for temples, batik, food, and a culturally rich Java city break with strong day-trip options.", highlights: ["Borobudur", "Prambanan", "Malioboro Street"], tip: "Yogyakarta is best when temple mornings are followed by a slower city afternoon instead of another long transfer.", areas: ["Central Yogyakarta", "Prawirotaman", "Kotagede"], food: "a gudeg meal", unique: ["Sunrise at Borobudur", "Batik workshop", "Prambanan at sunset"], when: "Dry season and clear shoulder months" },
    { city: "Lombok, Indonesia", country: "Indonesia", title: "Lombok", summary: "Best for quieter beaches, waterfalls, surf, and a more adventurous island alternative to Bali.", highlights: ["Kuta Lombok", "Mount Rinjani", "Gili Islands"], tip: "Lombok needs a route decision early: beach, surf, trek, or islands, because each choice pulls the trip in a different direction.", areas: ["Kuta Lombok", "Senggigi", "Senaru"], food: "a Sasak dinner", unique: ["Waterfall day", "Gili snorkel trip", "A quieter south-coast beach"], when: "Dry season for road and beach days" },
    { city: "Xi'an, China", country: "China", title: "Xi'an", summary: "Best for ancient history, regional food, and a focused Chinese city break built around one unforgettable archaeological day.", highlights: ["Terracotta Warriors", "City Wall", "Muslim Quarter"], tip: "Xi'an works best when the Terracotta Warriors get a full day and the city wall and food neighborhoods fill the lighter hours.", areas: ["Bell Tower", "Muslim Quarter", "South Gate"], food: "biangbiang noodles and dumplings", unique: ["City Wall bike ride", "Night market food walk", "Small Wild Goose Pagoda"], when: "Spring and fall" },
    { city: "Hangzhou, China", country: "China", title: "Hangzhou", summary: "Best for lake scenery, tea culture, gardens, and a softer city break with easy access from Shanghai.", highlights: ["West Lake", "Longjing Tea Village", "Lingyin Temple"], tip: "Hangzhou is about atmosphere, so protect a full day for the lake and avoid turning every scenic stop into a race.", areas: ["West Lake", "Hefang Street", "Longjing"], food: "a tea-region lunch", unique: ["West Lake boat ride", "Tea plantation walk", "Lingyin Temple morning"], when: "Spring and fall" },
    { city: "Jeju, South Korea", country: "South Korea", title: "Jeju", summary: "Best for volcanic scenery, coastal drives, cafes, and a slower island chapter after Seoul or Busan.", highlights: ["Seongsan Ilchulbong", "Jeju Olle trails", "Hallasan"], tip: "Jeju is much easier with a regional base and a car or driver; trying to circle the island every day creates too much windshield time.", areas: ["Jeju City", "Seogwipo", "East Coast"], food: "black pork and seafood", unique: ["Sunrise Peak early", "Olle coastal walk", "Hallasan or forest day"], when: "Spring, fall, and clear summer days" },
    { city: "Gyeongju, South Korea", country: "South Korea", title: "Gyeongju", summary: "Best for ancient tombs, temples, bikeable history, and a quieter cultural contrast to Seoul.", highlights: ["Bulguksa Temple", "Daereungwon Tomb Park", "Donggung Palace and Wolji Pond"], tip: "Gyeongju rewards a slower two-day stay, especially when the historic sites are mixed with evening walks and local food.", areas: ["Historic Center", "Bulguksa", "Bomun Lake"], food: "a Korean temple-area lunch", unique: ["Wolji Pond after dark", "Historic district bike ride", "Bulguksa morning"], when: "Spring and fall" },
    { city: "Hoi An, Vietnam", country: "Vietnam", title: "Hoi An", summary: "Best for lantern-lit evenings, tailoring, food, beaches, and a slower central Vietnam stay.", highlights: ["Old Town", "An Bang Beach", "Tra Que Vegetable Village"], tip: "Hoi An feels best when the old town gets an early or late visit and the middle of the day stays open for food, beach, or rest.", areas: ["Old Town", "Cam Pho", "An Bang"], food: "cao lau and banh mi", unique: ["Lantern evening", "Tailoring appointment", "Tra Que cooking class"], when: "Dry season and shoulder months" },
    { city: "Hue, Vietnam", country: "Vietnam", title: "Hue", summary: "Best for imperial history, river views, thoughtful food, and a quieter cultural stop between Hanoi and Hoi An.", highlights: ["Imperial City", "Thien Mu Pagoda", "Royal Tombs"], tip: "Hue needs heat-aware pacing and a guide who can explain the royal history rather than reducing the city to photo stops.", areas: ["Citadel", "Perfume River", "South Bank"], food: "a Hue-style tasting lunch", unique: ["Royal tomb route", "Perfume River sunset", "Garden house visit"], when: "Spring and early summer" },
    { city: "Phu Quoc, Vietnam", country: "Vietnam", title: "Phu Quoc", summary: "Best for beach recovery, snorkeling, seafood, and a tropical finish to a Vietnam itinerary.", highlights: ["Long Beach", "An Thoi islands", "Phu Quoc National Park"], tip: "Phu Quoc works best when water activities are balanced with real downtime instead of treating every beach day as an excursion day.", areas: ["Duong Dong", "Long Beach", "An Thoi"], food: "fresh seafood by the water", unique: ["Island snorkel day", "Night market", "National park drive"], when: "Dry season beach weather" },
    { city: "Agra, India", country: "India", title: "Agra", summary: "Best for the Taj Mahal, Mughal history, and a focused heritage stop that pairs naturally with Delhi and Jaipur.", highlights: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"], tip: "Agra is worth an early start and a slower second half; the Taj Mahal should not be squeezed between unrelated transfers.", areas: ["Taj East Gate", "Agra Fort", "Fatehabad Road"], food: "a North Indian thali", unique: ["Taj Mahal sunrise", "Mehtab Bagh sunset", "Itmad-ud-Daulah tomb"], when: "Cooler months" },
    { city: "Udaipur, India", country: "India", title: "Udaipur", summary: "Best for lakes, palaces, romance, crafts, and a calmer Rajasthan stop after the intensity of bigger cities.", highlights: ["City Palace", "Lake Pichola", "Jagdish Temple"], tip: "Udaipur rewards travelers who protect an unstructured lake-and-meal afternoon instead of filling every hour with palace visits.", areas: ["Old City", "Lake Pichola", "Rani Road"], food: "a rooftop Rajasthani dinner", unique: ["Lake boat ride", "Monsoon Palace view", "Craft market walk"], when: "Cooler months" },
    { city: "Granada, Spain", country: "Spain", title: "Granada", summary: "Best for Alhambra history, tapas, hillside views, and a compact Andalusian trip with strong atmosphere.", highlights: ["Alhambra", "Albaicin", "Mirador de San Nicolas"], tip: "Granada feels more personal when the Alhambra is the anchor and the rest of the day is left for hills, tapas, and views.", areas: ["Albaicin", "Realejo", "Centro"], food: "a tapas evening", unique: ["Alhambra timed visit", "Sacromonte sunset", "Hammam afternoon"], when: "Spring and fall" },
    { city: "Malaga, Spain", country: "Spain", title: "Malaga", summary: "Best for museums, beaches, food, and an easy Costa del Sol base with more city substance than travelers expect.", highlights: ["Alcazaba", "Malagueta Beach", "Picasso Museum"], tip: "Malaga works well when one museum or historic morning is paired with beach, market, and a slower evening.", areas: ["Historic Center", "Soho", "Malagueta"], food: "espeto and market seafood", unique: ["Gibralfaro sunset", "Atarazanas Market", "Beach-to-old-town walk"], when: "Spring, fall, and early summer" },
    { city: "Bilbao, Spain", country: "Spain", title: "Bilbao", summary: "Best for modern art, Basque food, river walks, and a compact northern Spain city break.", highlights: ["Guggenheim Museum", "Casco Viejo", "Mount Artxanda"], tip: "Bilbao is strongest when the art and food days are given equal weight and the city's hills are planned honestly.", areas: ["Casco Viejo", "Ensanche", "Ribera"], food: "pintxos along the old town", unique: ["Guggenheim morning", "Pintxos crawl", "Coastal day to Getxo"], when: "Spring through early fall" },
    { city: "Thessaloniki, Greece", country: "Greece", title: "Thessaloniki", summary: "Best for food, waterfront evenings, Byzantine history, and a more lived-in Greek city rhythm.", highlights: ["Waterfront promenade", "White Tower", "Ano Poli"], tip: "Thessaloniki is a food-and-neighborhood city, so leave room for long meals and an evening walk by the water.", areas: ["Ladadika", "Ano Poli", "Aristotelous Square"], food: "a long mezze dinner", unique: ["Waterfront sunset", "Ano Poli view", "Modiano market"], when: "Spring, fall, and mild winter" },
    { city: "Mykonos, Greece", country: "Greece", title: "Mykonos", summary: "Best for beach clubs, whitewashed streets, sailing, and a Greek island trip that can be social or polished.", highlights: ["Mykonos Town", "Delos", "South Coast beaches"], tip: "Mykonos works best when the trip chooses between nightlife, beach recovery, or sailing instead of promising all three every day.", areas: ["Mykonos Town", "Ornos", "Elia"], food: "a seaside Greek dinner", unique: ["Delos boat trip", "Windmills at sunset", "A quieter north-coast beach"], when: "Late spring through early fall" },
    { city: "Hamburg, Germany", country: "Germany", title: "Hamburg", summary: "Best for harbor scenery, music, design, seafood, and a northern German city with real evening energy.", highlights: ["Elbphilharmonie", "Speicherstadt", "St. Pauli"], tip: "Hamburg gets better when the harbor, warehouse district, and neighborhood food are spread across separate parts of the day.", areas: ["HafenCity", "Schanze", "St. Pauli"], food: "a fish market breakfast", unique: ["Harbor ferry ride", "Elbphilharmonie view", "Schanze neighborhood evening"], when: "Late spring through early fall" },
    { city: "Cologne, Germany", country: "Germany", title: "Cologne", summary: "Best for cathedral history, river walks, museums, and an easygoing city break with strong local character.", highlights: ["Cologne Cathedral", "Museum Ludwig", "Hohenzollern Bridge"], tip: "Cologne is easy to enjoy in a couple of days when the cathedral and river carry the route and the neighborhoods fill the gaps.", areas: ["Altstadt", "Belgisches Viertel", "Ehrenfeld"], food: "a traditional brewery meal", unique: ["Cathedral at opening", "Rhine sunset walk", "Ehrenfeld street art"], when: "Spring, summer, and festive winter" },
    { city: "Bath, United Kingdom", country: "United Kingdom", title: "Bath", summary: "Best for Roman history, Georgian architecture, spas, and a graceful short break from London.", highlights: ["Roman Baths", "Royal Crescent", "Bath Abbey"], tip: "Bath works best as a slower overnight or two-night stay, especially when the schedule leaves room for the architecture between attractions.", areas: ["City Centre", "Royal Crescent", "Pulteney Bridge"], food: "a classic English tea", unique: ["Thermal spa session", "Royal Crescent walk", "Cotswolds add-on"], when: "Spring through fall" },
    { city: "Oxford, United Kingdom", country: "United Kingdom", title: "Oxford", summary: "Best for historic colleges, bookstores, riverside walks, and an atmospheric English day trip or short stay.", highlights: ["Bodleian Library", "Radcliffe Camera", "Christ Church"], tip: "Oxford is about wandering through the college lanes and river, not simply ticking off interiors one after another.", areas: ["City Centre", "Jericho", "Christ Church Meadow"], food: "a pub lunch", unique: ["Punting on the Cherwell", "College chapel visit", "Bookshop afternoon"], when: "Spring through early fall" },
    { city: "York, United Kingdom", country: "United Kingdom", title: "York", summary: "Best for medieval streets, rail history, cozy pubs, and a compact northern England city break.", highlights: ["York Minster", "The Shambles", "National Railway Museum"], tip: "York is easy to enjoy on foot, but an overnight stay lets the old center feel different after the day crowds leave.", areas: ["City Centre", "Shambles", "Bishopthorpe Road"], food: "a cozy pub dinner", unique: ["City wall walk", "Ghost history tour", "Railway Museum afternoon"], when: "Spring, fall, and festive winter" },
    { city: "Galway, Ireland", country: "Ireland", title: "Galway", summary: "Best for live music, pubs, coastal day trips, and a friendly west coast base with plenty of character.", highlights: ["Latin Quarter", "Salthill Promenade", "Claddagh"], tip: "Galway is strongest when the city evening is protected and the daytime is used for one clear coastal or cultural outing.", areas: ["Latin Quarter", "Salthill", "West End"], food: "a seafood dinner", unique: ["Trad music night", "Salthill sunset", "Cliffs of Moher route"], when: "Late spring through early fall" },
    { city: "Killarney, Ireland", country: "Ireland", title: "Killarney", summary: "Best for lakes, national park scenery, castles, and a gentle Irish road-trip stop.", highlights: ["Killarney National Park", "Muckross House", "Ross Castle"], tip: "Killarney works best when the park gets a full day and the route does not try to stack every scenic stop into one afternoon.", areas: ["Town Centre", "Muckross", "Lakeshore"], food: "a hearty pub meal", unique: ["Jaunting car or bike ride", "Gap of Dunloe", "Lakeside sunset"], when: "Late spring through early fall" },
    { city: "Fes, Morocco", country: "Morocco", title: "Fes", summary: "Best for medieval lanes, craft traditions, food, and a more history-forward Moroccan city break.", highlights: ["Fes el Bali", "Al Quaraouiyine area", "Bou Inania Madrasa"], tip: "Fes benefits from a local guide on the first medina day, followed by a quieter afternoon away from the busiest lanes.", areas: ["Fes el Bali", "Ville Nouvelle", "Mellah"], food: "a traditional medina dinner", unique: ["Tannery viewpoint", "Craft workshop", "Madrasa and medina walk"], when: "Spring and fall" },
    { city: "Chefchaouen, Morocco", country: "Morocco", title: "Chefchaouen", summary: "Best for blue-washed streets, mountain scenery, photography, and a peaceful northern Morocco pause.", highlights: ["Blue Medina", "Ras El Maa", "Spanish Mosque viewpoint"], tip: "Chefchaouen is most enjoyable when travelers stay overnight and let the blue streets empty out after the day visitors leave.", areas: ["Medina", "Ras El Maa", "Mountain edge"], food: "a slow tagine lunch", unique: ["Sunrise medina walk", "Spanish Mosque sunset", "Rif mountain outing"], when: "Spring and fall" },
    { city: "Aswan, Egypt", country: "Egypt", title: "Aswan", summary: "Best for Nile scenery, temples, felucca rides, and a calmer southern Egypt experience.", highlights: ["Philae Temple", "Nubian villages", "Nile Corniche"], tip: "Aswan rewards an unhurried plan where the river, light, and boat time matter as much as the historic sites.", areas: ["Nile Corniche", "Elephantine Island", "West Bank"], food: "a Nubian dinner", unique: ["Felucca at sunset", "Philae by boat", "Nubian village visit"], when: "Cooler months" },
    { city: "Sharm El Sheikh, Egypt", country: "Egypt", title: "Sharm El Sheikh", summary: "Best for Red Sea snorkeling, resort recovery, desert add-ons, and warm-weather beach time.", highlights: ["Ras Mohammed", "Naama Bay", "Red Sea reefs"], tip: "Sharm works best when the trip protects resort downtime and chooses one or two water experiences instead of filling every day with excursions.", areas: ["Naama Bay", "Sharks Bay", "Nabq Bay"], food: "a seafood dinner", unique: ["Reef snorkeling", "Ras Mohammed boat day", "Desert evening"], when: "Year-round beach weather" },
    { city: "Mombasa, Kenya", country: "Kenya", title: "Mombasa", summary: "Best for Indian Ocean beaches, Swahili history, seafood, and a coastal finish to a Kenya trip.", highlights: ["Fort Jesus", "Old Town", "Diani Beach"], tip: "Mombasa works best when old-town history and beach recovery are separated into different days.", areas: ["Old Town", "Nyali", "South Coast"], food: "a Swahili seafood meal", unique: ["Fort Jesus history walk", "Dhow sunset", "Diani beach day"], when: "Dry seasons and warm beach months" },
    { city: "Maasai Mara, Kenya", country: "Kenya", title: "Maasai Mara", summary: "Best for wildlife, open landscapes, photography, and a safari chapter that feels genuinely memorable.", highlights: ["Game drives", "Mara River", "Conservancy experience"], tip: "The Mara needs early starts, rest between drives, and a trusted camp or guide that understands the traveler rather than only the checklist.", areas: ["Mara Triangle", "Private conservancy", "Talek gateway"], food: "a camp dinner under the sky", unique: ["Dawn game drive", "Conservancy walk", "Sunset over the plains"], when: "Wildlife seasons vary by route and migration" },
    { city: "Stellenbosch, South Africa", country: "South Africa", title: "Stellenbosch", summary: "Best for wine, mountain scenery, food, and a slower Cape Town add-on with strong couples appeal.", highlights: ["Wine estates", "Stellenbosch town", "Jonkershoek Valley"], tip: "Stellenbosch is better with a driver and fewer estates, leaving room for a proper meal instead of turning the day into a tasting race.", areas: ["Stellenbosch town", "Franschhoek", "Jonkershoek"], food: "a vineyard lunch", unique: ["Mountain-backed tasting", "Historic town walk", "Jonkershoek nature day"], when: "Spring, fall, and harvest season" },
    { city: "Chicago, United States", country: "United States", title: "Chicago", summary: "Best for architecture, museums, neighborhoods, deep-dish debates, and a city break with strong summer energy.", highlights: ["Architecture river cruise", "Millennium Park", "Art Institute of Chicago"], tip: "Chicago is easiest when the lakefront, Loop, and food neighborhoods are treated as separate day clusters.", areas: ["The Loop", "River North", "Wicker Park"], food: "a neighborhood pizza or steak stop", unique: ["Architecture cruise", "Lakefront bike ride", "Jazz or comedy night"], when: "Late spring through early fall" },
    { city: "Boston, United States", country: "United States", title: "Boston", summary: "Best for history, seafood, colleges, walkable neighborhoods, and an easy New England city break.", highlights: ["Freedom Trail", "Boston Common", "Fenway Park"], tip: "Boston works well on foot when the historic center and waterfront stay together and the itinerary leaves room for neighborhoods beyond downtown.", areas: ["Beacon Hill", "Back Bay", "Seaport"], food: "a seafood lunch", unique: ["Freedom Trail walk", "Fenway game", "Harbor or Cambridge afternoon"], when: "Spring, summer, and fall" },
    { city: "Vancouver, Canada", country: "Canada", title: "Vancouver", summary: "Best for mountains, water, food, and an urban trip where the outdoors are close enough to shape every day.", highlights: ["Stanley Park", "Granville Island", "North Shore mountains"], tip: "Vancouver rewards travelers who pair one city neighborhood with one outdoor anchor instead of trying to do both at full speed.", areas: ["Downtown", "Gastown", "Kitsilano"], food: "a seafood or Asian food crawl", unique: ["Stanley Park bike ride", "Grouse Mountain outing", "Granville Island market"], when: "Late spring through early fall" },
    { city: "Montreal, Canada", country: "Canada", title: "Montreal", summary: "Best for food, music, old streets, festivals, and a North American city break with a strong European feel.", highlights: ["Old Montreal", "Mount Royal", "Jean-Talon Market"], tip: "Montreal is a neighborhood-and-food city, so the trip gets better when each day has a local base rather than constant crosstown movement.", areas: ["Old Montreal", "Mile End", "Plateau"], food: "a bagel and a late dinner", unique: ["Mount Royal lookout", "Mile End food crawl", "Festival night"], when: "Late spring through early fall" },
    { city: "Banff, Canada", country: "Canada", title: "Banff", summary: "Best for mountain lakes, wildlife, scenic drives, and a nature-first vacation with a strong family or couples fit.", highlights: ["Lake Louise", "Moraine Lake", "Banff Avenue"], tip: "Banff requires timed access and weather flexibility; choose the lake or trail priorities before filling the day with scenic stops.", areas: ["Banff town", "Lake Louise", "Canmore"], food: "a mountain-town dinner", unique: ["Lake Louise morning", "Gondola viewpoint", "Icefields Parkway day"], when: "Summer for hiking or winter for snow" },
    { city: "Tulum, Mexico", country: "Mexico", title: "Tulum", summary: "Best for Caribbean beaches, ruins, cenotes, wellness, and a trip that mixes slow mornings with memorable excursions.", highlights: ["Tulum ruins", "Cenotes", "Tulum beach"], tip: "Tulum works best when beach and cenote days stay separate, with transfer time and heat treated as part of the plan.", areas: ["Tulum Pueblo", "Beach Road", "Aldea Zama"], food: "a Yucatecan dinner", unique: ["Ruins at opening", "Cenote swim", "Beach sunset"], when: "Dry season and shoulder months" },
    { city: "Oaxaca, Mexico", country: "Mexico", title: "Oaxaca", summary: "Best for food, craft, mezcal, history, and a city break that feels personal from market breakfast through evening.", highlights: ["Santo Domingo", "Benito Juarez Market", "Monte Alban"], tip: "Oaxaca rewards travelers who leave room for food and craft instead of treating the city as a quick stop between day trips.", areas: ["Centro", "Jalatlaco", "Xochimilco"], food: "a mole or tlayuda meal", unique: ["Market breakfast", "Mezcal valley outing", "Craft village day"], when: "Dry season and festival periods" },
    { city: "Mendoza, Argentina", country: "Argentina", title: "Mendoza", summary: "Best for wine, mountain scenery, relaxed meals, and a slower Argentine trip with clear regional character.", highlights: ["Maipu wineries", "Lujan de Cuyo", "Andes foothills"], tip: "Mendoza works best with a driver and one wine region per day, leaving enough time for lunch and the landscape.", areas: ["Mendoza city", "Maipu", "Lujan de Cuyo"], food: "an outdoor winery lunch", unique: ["Bike or driver wine route", "Andes day", "Plaza evening"], when: "Spring, fall, and harvest season" },
    { city: "Cusco, Peru", country: "Peru", title: "Cusco", summary: "Best for Inca history, mountain scenery, markets, and a base for the Sacred Valley and Machu Picchu.", highlights: ["Sacsayhuaman", "San Pedro Market", "Sacred Valley"], tip: "Cusco needs altitude-aware pacing; a gentle first day makes the larger historic and hiking days much more enjoyable.", areas: ["Historic Center", "San Blas", "Sacred Valley"], food: "a Peruvian market lunch", unique: ["San Blas craft streets", "Sacred Valley day", "Early Sacsayhuaman visit"], when: "Dry season for clearer mountain days" },
    { city: "Valparaiso, Chile", country: "Chile", title: "Valparaiso", summary: "Best for street art, hillside views, port history, and a colorful coastal contrast to Santiago.", highlights: ["Cerro Alegre", "Ascensores", "La Sebastiana"], tip: "Valparaiso works best with a local guide or clear neighborhood plan because the hills and streets reward context.", areas: ["Cerro Alegre", "Cerro Concepcion", "Playa Ancha"], food: "a coastal seafood lunch", unique: ["Street-art walk", "Historic funicular ride", "Pacific sunset"], when: "Spring and fall" },
    { city: "Zurich, Switzerland", country: "Switzerland", title: "Zurich", summary: "Best for a polished city break, lake walks, food, design, and easy access to nearby scenery.", highlights: ["Old Town", "Lake Zurich", "Uetliberg"], tip: "Zurich is more than a gateway when the itinerary gives the lake, neighborhoods, and one scenic viewpoint real time.", areas: ["Old Town", "Zurich West", "Enge"], food: "a Swiss cafe and dinner", unique: ["Lake boat ride", "Uetliberg view", "Design district walk"], when: "Spring through fall" },
    { city: "Lucerne, Switzerland", country: "Switzerland", title: "Lucerne", summary: "Best for lake scenery, mountain access, historic streets, and an easy scenic Switzerland base.", highlights: ["Chapel Bridge", "Lake Lucerne", "Mount Pilatus"], tip: "Lucerne works best when a mountain day is balanced with an unhurried lake and old-town day.", areas: ["Old Town", "Lakefront", "Weggis"], food: "a lakeside Swiss meal", unique: ["Lake boat connection", "Mount Pilatus or Rigi", "Old-town evening"], when: "Late spring through early fall" },
    { city: "Melbourne, Australia", country: "Australia", title: "Melbourne", summary: "Best for coffee, art, neighborhoods, sports, and a city trip that rewards wandering beyond the main sights.", highlights: ["Federation Square", "Laneways", "Great Ocean Road"], tip: "Melbourne is built for neighborhood days, with one major outing added only after the city rhythm has had time to land.", areas: ["CBD laneways", "Fitzroy", "Southbank"], food: "a laneway coffee and dinner", unique: ["Street-art walk", "Yarra River evening", "Great Ocean Road extension"], when: "Spring, fall, and mild summer days" },
    { city: "Cairns, Australia", country: "Australia", title: "Cairns", summary: "Best for the Great Barrier Reef, rainforest, tropical weather, and a compact outdoor-focused base.", highlights: ["Great Barrier Reef", "Daintree Rainforest", "Esplanade Lagoon"], tip: "Cairns needs weather flexibility; protect the reef day first and keep the following day lighter.", areas: ["Cairns Esplanade", "Palm Cove", "Port Douglas"], food: "a tropical seafood dinner", unique: ["Reef boat day", "Daintree outing", "Palm Cove recovery afternoon"], when: "Dry season and clearer reef conditions" },
    { city: "Auckland, New Zealand", country: "New Zealand", title: "Auckland", summary: "Best for harbor views, food, islands, and an easy North Island start with scenic add-ons.", highlights: ["Waiheke Island", "Sky Tower", "Auckland waterfront"], tip: "Auckland works best as a flexible city-and-island start rather than a rushed checklist before driving onward.", areas: ["Viaduct", "Ponsonby", "Devonport"], food: "a waterfront dinner", unique: ["Waiheke wine day", "West Coast beach outing", "Devonport ferry"], when: "Late spring through early fall" },
    { city: "Rotorua, New Zealand", country: "New Zealand", title: "Rotorua", summary: "Best for geothermal landscapes, Maori culture, forests, and an active North Island stop with family appeal.", highlights: ["Te Puia", "Redwoods Forest", "Wai-O-Tapu"], tip: "Rotorua works best when one geothermal or cultural anchor is paired with a forest or lake activity.", areas: ["Rotorua Lakeside", "Redwoods", "Whakarewarewa"], food: "a hangi or local dinner", unique: ["Redwoods night walk", "Geothermal valley", "Lake Rotorua outing"], when: "Spring through fall" },
    { city: "Manila, Philippines", country: "Philippines", title: "Manila", summary: "Best for food, history, art, and a lively urban start before heading to the islands.", highlights: ["Intramuros", "National Museum", "Makati food scene"], tip: "Manila rewards a district-based plan and a lighter first day before the trip moves toward the beach or smaller islands.", areas: ["Intramuros", "Makati", "BGC"], food: "a Filipino tasting meal", unique: ["Intramuros walk", "Market food tour", "Makati evening"], when: "Dry season and flexible shoulder months" },
    { city: "Palawan, Philippines", country: "Philippines", title: "Palawan", summary: "Best for limestone islands, lagoons, snorkeling, and a tropical itinerary where the boat days are the main event.", highlights: ["El Nido lagoons", "Coron wrecks", "Puerto Princesa Underground River"], tip: "Palawan requires a route choice between El Nido, Coron, and Puerto Princesa; too many transfers can erase the relaxation.", areas: ["El Nido", "Coron", "Puerto Princesa"], food: "fresh seafood by the water", unique: ["Lagoon boat day", "Island snorkel route", "Underground River outing"], when: "Dry season for calmer water" },
    { city: "Dubrovnik, Croatia", country: "Croatia", title: "Dubrovnik", summary: "Best for walled-city history, Adriatic views, boat days, and a romantic coastal stop with strong visual payoff.", highlights: ["Old City walls", "Fort Lovrijenac", "Lokrum Island"], tip: "Dubrovnik is much better early and late in the day, with midday reserved for swimming, lunch, or a quieter island escape.", areas: ["Old City", "Ploce", "Lapad"], food: "a Dalmatian seafood dinner", unique: ["Walls at opening", "Lokrum boat day", "Cable car sunset"], when: "Late spring through early fall" },
    { city: "Split, Croatia", country: "Croatia", title: "Split", summary: "Best for Roman history, swimming, ferry access, and a lively Dalmatian city base.", highlights: ["Diocletian's Palace", "Riva waterfront", "Marjan Hill"], tip: "Split works well as a base when the old city and one island or coastal outing each get a full day.", areas: ["Old Town", "Bacvice", "Varos"], food: "a Dalmatian konoba dinner", unique: ["Palace evening", "Marjan swim walk", "Hvar or Brac ferry day"], when: "Late spring through early fall" },
    { city: "Krakow, Poland", country: "Poland", title: "Krakow", summary: "Best for historic streets, food, culture, and a high-value European city break with meaningful day trips.", highlights: ["Main Market Square", "Wawel Castle", "Kazimierz"], tip: "Krakow feels best when the historic center and Kazimierz are explored slowly, with heavy history planned thoughtfully rather than rushed.", areas: ["Old Town", "Kazimierz", "Podgorze"], food: "a Polish dinner and market snack", unique: ["Wawel at opening", "Kazimierz evening", "Wieliczka Salt Mine day"], when: "Spring, fall, and festive winter" },
    { city: "Amman, Jordan", country: "Jordan", title: "Amman", summary: "Best for food, Roman history, rooftop views, and a practical starting point for Jordan's larger route.", highlights: ["Citadel", "Roman Theater", "Rainbow Street"], tip: "Amman is a city of hills and meals, so keep the first day local before adding Jerash, Petra, or the desert.", areas: ["Downtown", "Jabal Amman", "Sweifieh"], food: "a mezze dinner", unique: ["Citadel sunset", "Jerash day", "Local sweets stop"], when: "Spring and fall" },
    { city: "Samarkand, Uzbekistan", country: "Uzbekistan", title: "Samarkand", summary: "Best for Silk Road architecture, grand blue-tiled monuments, markets, and a memorable history-led city stay.", highlights: ["Registan Square", "Gur-e-Amir", "Bibi-Khanym Mosque"], tip: "Samarkand is most powerful at the edges of the day, when the monumental sites have room to feel atmospheric rather than purely photographic.", areas: ["Registan", "Old City", "University district"], food: "plov and a market meal", unique: ["Registan after sunset", "Siab Bazaar", "Shah-i-Zinda morning"], when: "Spring and fall" }
  ];

  const nextCityRecords = nextCitySeeds.map((seed) => ({
    ...seed,
    restaurants: [seed.food, `${seed.title} market or cafe`, `A local dinner in ${seed.areas[0]}`],
    best: seed.highlights,
    book: `${seed.highlights[0]}, a local food experience, and the trip's main day outing`,
    stay: `${seed.areas[0]}, ${seed.areas[1]}, or a nearby practical base`,
    getting: "Walkable neighborhood clusters with planned day-trip transfers"
  }));

  data.cityGuideData = data.cityGuideData || [];
  data.cityGuideDetailData = data.cityGuideDetailData || {};
  data.cityPlanningToolkitData = data.cityPlanningToolkitData || {};
  data.destinationFacts = data.destinationFacts || {};
  data.destinationHeroData = data.destinationHeroData || {};
  data.destinationAliases = data.destinationAliases || {};
  data.countrySuggestions = data.countrySuggestions || {};

  const makeDetails = (item) => ({
    bestAttractions: uniqueList(item.highlights, item.unique, [`A neighborhood walk in ${item.areas[0]}`]).slice(0, 6),
    bestRestaurants: uniqueList(item.restaurants, [`A cafe near ${item.areas[1]}`, `A market breakfast in ${item.areas[2]}`, `A dessert stop in ${item.areas[0]}`]).slice(0, 6),
    bestBudget: uniqueList(
      [`Free or low-cost ${item.areas[0]} walk`, `Public viewpoint near ${item.areas[1]}`, `Market meal around ${item.areas[2]}`],
      [`A self-guided walk through ${item.areas[2]}`, `Free museum or public garden time`, `A neighborhood market stop`]
    ).slice(0, 6),
    bestLuxury: uniqueList(
      [`Private guide for ${item.highlights[0]}`, `A signature meal in ${item.areas[0]}`, `A tailored day around ${item.unique[0]}`],
      [`A private transfer between highlights`, `A special evening in ${item.areas[1]}`, `A slower day with a local guide`]
    ).slice(0, 6),
    bestCouples: uniqueList(
      [`Sunset near ${item.highlights[1]}`, `${item.unique[0]}`, `${item.areas[0]} evening`],
      [`A long dinner in ${item.areas[1]}`, `A scenic morning near ${item.areas[2]}`, `A photo-friendly walk through ${item.areas[0]}`]
    ).slice(0, 6),
    bestKids: uniqueList(
      [`Family-friendly ${item.highlights[0]}`, `Easy outing around ${item.areas[1]}`, `A relaxed meal near ${item.areas[2]}`],
      [`A hands-on stop near ${item.areas[0]}`, `A short scenic outing with room to move`, `A treat everyone can agree on`]
    ).slice(0, 6),
    bestSolo: uniqueList(
      [`Early visit to ${item.highlights[0]}`, `${item.areas[0]} cafe or market`, `Self-guided ${item.unique[1]}`],
      [`A museum or gallery at your own pace`, `A people-watching break in ${item.areas[2]}`, `A flexible afternoon with one clear anchor`]
    ).slice(0, 6),
    bestFirstTimers: uniqueList(item.highlights, item.unique).slice(0, 6),
    bestUnique: uniqueList(
      item.unique,
      [`A quieter side of ${item.areas[2]}`, `A local recommendation beyond the headline sights`, `A short detour beyond ${item.areas[0]}`]
    ).slice(0, 6),
    bestBreakfast: uniqueList(
      [`Morning cafe near ${item.areas[0]}`, `${item.areas[1]} bakery or market`, `Slow breakfast before ${item.highlights[0]}`],
      [`A local pastry to take on the road`, `Coffee and a walk through ${item.areas[2]}`, `A relaxed brunch near ${item.areas[0]}`]
    ).slice(0, 6),
    bestLunch: uniqueList(
      [item.restaurants[0], `Casual lunch near ${item.highlights[1]}`, `Local stop around ${item.areas[2]}`],
      [`A market lunch in ${item.areas[0]}`, `A quick meal between sights`, `A long midday table in ${item.areas[1]}`]
    ).slice(0, 6),
    bestDinner: uniqueList(
      item.restaurants,
      [`A slower dinner in ${item.areas[2]}`, `A local specialty near ${item.areas[0]}`, `A final-night meal away from the busiest sights`]
    ).slice(0, 6),
    bestCocktails: uniqueList(
      [`Sunset drinks near ${item.areas[0]}`, `A local bar around ${item.areas[1]}`, `A view-led evening near ${item.highlights[2]}`],
      [`A relaxed night close to the stay`, `A late drink after dinner`, `A rooftop or waterfront evening`]
    ).slice(0, 6),
    bestBakeries: uniqueList(
      [`Local bakery near ${item.areas[0]}`, `${item.areas[1]} morning market`, `Coffee and pastry before ${item.highlights[0]}`],
      [`A regional sweet to take on the road`, `A fresh bake near ${item.areas[2]}`, `A pastry stop between neighborhoods`]
    ).slice(0, 6),
    bestCoffee: uniqueList(
      [`Coffee near ${item.areas[0]}`, `A slow cafe in ${item.areas[1]}`, `A final cup near ${item.areas[2]}`],
      [`A coffee stop before the first sight`, `A neighborhood cafe break`, `A view with your morning coffee`]
    ).slice(0, 6)
  });

  const mergeDetails = (existing, generated) => Object.fromEntries(
    Object.entries(generated).map(([key, values]) => [key, uniqueList(existing?.[key], values).slice(0, 6)])
  );

  cityRecords.concat(nextCityRecords).forEach((item) => {
    const existing = data.cityGuideData.find((guide) => guide.city === item.city);
    const guide = { city: item.city, title: item.title, summary: item.summary, highlights: item.highlights, tip: item.tip };
    if (existing) Object.assign(existing, guide);
    else data.cityGuideData.push(guide);
    data.cityGuideDetailData[item.city] = mergeDetails(data.cityGuideDetailData[item.city], makeDetails(item));
    data.cityPlanningToolkitData[item.city] = [
      { label: "When it works best", value: item.when, copy: `${item.title} is easier to enjoy when weather, crowds, and the trip's main outdoor moments are planned together.` },
      { label: "Where to stay", value: item.stay, copy: `Use ${item.areas[0]} as the first base when possible, then add ${item.areas[1]} only if the extra move is worth the time.` },
      { label: "Getting around", value: item.getting, copy: item.tip },
      { label: "Book early", value: item.book, copy: `Protect ${item.highlights[0]}, then leave space around it for meals, weather changes, and slower moments that make ${item.title} feel like a trip.` }
    ];
    const tipText = String(item.tip || "").trim();
    const tipStartsWithTitle = tipText.toLowerCase().startsWith(`${item.title.toLowerCase()} `);
    data.destinationFacts[item.city] = tipStartsWithTitle
      ? tipText
      : `${item.title} works best when ${tipText.charAt(0).toLowerCase()}${tipText.slice(1)}`;
    data.destinationHeroData[item.city] = {
      image: item.image || data.destinationHeroData[item.city]?.image || data.destinationHeroData[`${item.country}, ${item.country}`]?.image || "",
      title: item.title,
      copy: item.summary
    };
    data.destinationAliases[compact(item.city)] = item.city;
    data.countrySuggestions[item.country] = data.countrySuggestions[item.country] || [];
    if (!data.countrySuggestions[item.country].includes(item.city)) data.countrySuggestions[item.country].push(item.city);
  });
  // Source-reviewed lists replace generated detail data, including its filler.
  // Evidence and review scope are recorded in data/city-source-ledger.js.
  data.cityGuideDetailData["Boston, United States"] = {
    bestAttractions: ["Freedom Trail", "Boston Common", "Boston Public Garden", "Fenway Park", "Museum of Fine Arts, Boston", "Isabella Stewart Gardner Museum", "New England Aquarium", "Boston Tea Party Ships & Museum"],
    bestRestaurants: ["Row 34 (Seaport)", "Myers + Chang", "Contessa (Boston)", "Grill 23 & Bar", "o ya"],
    bestBudget: ["Boston Common", "Boston Public Garden", "Boston Public Library (Central Library)"],
    bestLuxury: ["o ya", "Contessa (Boston)", "Grill 23 & Bar"],
    bestCouples: ["Isabella Stewart Gardner Museum", "Boston Public Garden", "Contessa (Boston)"],
    bestKids: ["New England Aquarium", "Boston Children's Museum", "Boston Tea Party Ships & Museum"],
    bestSolo: ["Brattle Book Shop", "Museum of Fine Arts, Boston", "Boston Public Library (Central Library)"],
    bestFirstTimers: ["Freedom Trail", "Boston Common", "Boston Public Garden", "Fenway Park"],
    bestUnique: ["Brattle Book Shop", "Boston Public Market", "Isabella Stewart Gardner Museum"],
    bestBreakfast: ["Flour Bakery + Cafe (Clarendon Street)", "Tatte Bakery & Cafe (Back Bay)", "Contessa (Boston)"],
    bestLunch: ["Neptune Oyster", "Row 34 (Seaport)", "Boston Public Market"],
    bestDinner: ["Myers + Chang", "Grill 23 & Bar", "o ya", "Contessa (Boston)"],
    bestCocktails: ["Offsuit", "Wig Shop Lounge", "Yvonne's"],
    bestBakeries: ["Flour Bakery + Cafe (Clarendon Street)", "Tatte Bakery & Cafe (Back Bay)", "Bova's Bakery"],
    bestCoffee: ["George Howell Coffee (Godfrey Hotel)", "Gracenote Coffee (Lincoln Street)", "Tatte Bakery & Cafe (Back Bay)"]
  };
  data.cityPlaceQueries = data.cityPlaceQueries || {};
  data.cityPlaceQueries["Boston, United States"] = {
    "Boston Public Library (Central Library)": "Boston Public Library 700 Boylston Street",
    "Boston Public Market": "Boston Public Market 100 Hanover Street",
    "Row 34 (Seaport)": "Row 34 383 Congress Street",
    "Contessa (Boston)": "Contessa 3 Newbury Street",
    "Grill 23 & Bar": "Grill 23 and Bar 161 Berkeley Street",
    "Flour Bakery + Cafe (Clarendon Street)": "Flour Bakery 131 Clarendon Street",
    "Tatte Bakery & Cafe (Back Bay)": "Tatte Bakery 399 Boylston Street",
    "George Howell Coffee (Godfrey Hotel)": "George Howell Coffee 505 Washington Street",
    "Gracenote Coffee (Lincoln Street)": "Gracenote Coffee 108 Lincoln Street",
    "o ya": "o ya 9 East Street"
  };
  const boston = data.cityGuideData.find((guide) => guide.city === "Boston, United States");
  boston.summary = "Walk the Freedom Trail, choose a museum or a Fenway visit, and find seafood, bakeries, and coffee stops by neighborhood.";
  boston.highlights = ["Freedom Trail", "Boston Public Garden", "Fenway Park", "Museum of Fine Arts, Boston"];
  boston.tip = "Keep downtown walks together, then give the Fenway museums or the waterfront their own outing. You do not need to cross the city between every stop.";
  data.destinationFacts["Boston, United States"] = boston.tip;
  data.destinationHeroData["Boston, United States"].copy = boston.summary;
  data.cityPlanningToolkitData["Boston, United States"] = [
    { label: "Start here", value: "Choose one main outing for the day", copy: "Begin a history-focused day at Boston Common and follow the part of the Freedom Trail that interests you. Save time for indoor visits rather than trying to enter every site along the route." },
    { label: "Where to stay", value: "Compare Back Bay with downtown", copy: "Back Bay puts the Public Library and the Boylston Street cafes in the same part of town. Downtown suits the Common, Brattle Book Shop, and the start of the Freedom Trail. Pick one base; moving hotels between these areas is unnecessary for a short visit." },
    { label: "Book early", value: "Reserve your museum visit and any special dinner", copy: "The Gardner Museum recommends advance timed tickets, and the Aquarium advises booking before you arrive. o ya uses prepaid tasting-menu reservations. Check the cancellation terms and current menus before committing." },
    { label: "Eating out", value: "Not every restaurant takes reservations", copy: "Neptune Oyster is walk-in only, so keep that lunch flexible. Row 34's Seaport branch takes reservations. For coffee downtown, choose George Howell at the Godfrey Hotel or Gracenote on Lincoln Street; the map links identify those branches." }
  ];
  data.cityEditorialPageData["Boston, United States"] = {
    dek: "History walks, art museums, seafood lunches, and coffee stops you can work into a few days in Boston.",
    intro: [
      "Start with Boston Common and decide how much of the Freedom Trail you want to walk. You can follow a section on your own or book a guided tour with the Freedom Trail Foundation. The Public Garden gives you an easy change of pace nearby. You do not have to finish the whole trail for the day to feel worthwhile.",
      "Give the Museum of Fine Arts or the Isabella Stewart Gardner Museum time of its own. Choose the collection that interests you instead of squeezing both between other bookings. If Fenway Park is on your list, check the official tour calendar before setting the day. These outings work better without a rushed return to the waterfront for lunch.",
      "For seafood, compare Neptune Oyster in the North End with Row 34 on Congress Street. Neptune is walk-in only; Row 34 takes reservations. Myers + Chang offers another dinner option in the South End. For a special meal, look at o ya's tasting menu, Grill 23 & Bar, or Contessa in the Newbury hotel. Check menus and booking terms yourself before reserving.",
      "Breakfast can be as simple as Flour on Clarendon Street or Tatte's Back Bay cafe on Boylston Street. Bova's Bakery is a takeout pastry stop in the North End. Browse Brattle Book Shop or the vendors at Boston Public Market when you want a shorter outing. With children, choose the Aquarium, Children's Museum, or Tea Party Ships & Museum rather than booking all three in one day. Offsuit, Wig Shop Lounge, and Yvonne's are evening options for adults; check each venue's entry and reservation policy."
    ],
    summaryCards: [
      ["First morning", "Boston Common, a section of the Freedom Trail, and a stop in the Public Garden."],
      ["Pick your afternoon", "Art museums, Fenway Park, or a family visit on the waterfront."],
      ["Plan one meal", "A seafood lunch, a South End dinner, or a tasting menu booked ahead."]
    ],
    trust: "The named recommendations in this guide were checked against official venue, operator, and tourism websites on October 2, 2026. This was a website review, not a visit. Confirm hours, menus, and reservations before traveling."
  };
  // Source review and branch evidence: data/city-source-ledger.js, 2026-10-03.
  data.cityGuideDetailData["Edinburgh, United Kingdom"] = {
    bestAttractions: ["Edinburgh Castle", "Royal Mile", "National Museum of Scotland", "Scottish National Gallery", "Palace of Holyroodhouse", "Arthur's Seat"],
    bestRestaurants: ["The Kitchin", "Restaurant Martin Wishart", "Timberyard", "The Scran & Scallie", "Howies Waterloo"],
    bestBudget: ["National Museum of Scotland", "Scottish National Gallery", "Royal Botanic Garden Edinburgh"],
    bestLuxury: ["The Kitchin", "Restaurant Martin Wishart", "Timberyard"],
    bestCouples: ["Dean Village walk", "Royal Botanic Garden Edinburgh", "Timberyard"],
    bestKids: ["National Museum of Scotland", "Camera Obscura & World of Illusions", "Dynamic Earth"],
    bestSolo: ["Scottish Poetry Library", "Scottish National Gallery", "Fortitude Coffee (Hamilton Place)"],
    bestFirstTimers: ["Edinburgh Castle", "Royal Mile", "National Museum of Scotland", "Palace of Holyroodhouse"],
    bestUnique: ["Scottish Poetry Library", "Dean Village walk", "Arthur's Seat"],
    bestBreakfast: ["Dishoom Edinburgh", "Soderberg Pavilion", "Twelve Triangles (Brunswick Street)"],
    bestLunch: ["Howies Waterloo", "Dishoom Edinburgh", "Soderberg Pavilion"],
    bestDinner: ["The Kitchin", "Restaurant Martin Wishart", "Timberyard", "The Scran & Scallie"],
    bestCocktails: ["Bramble", "The Devil's Advocate", "Copper Blossom"],
    bestBakeries: ["Lannan Bakery", "Twelve Triangles (Brunswick Street)", "Soderberg Pavilion"],
    bestCoffee: ["The Milkman (7 Cockburn Street)", "Fortitude Coffee (Hamilton Place)", "Soderberg Pavilion"]
  };
  data.cityPlaceQueries["Edinburgh, United Kingdom"] = {
    "Edinburgh Castle": "Edinburgh Castle Castlehill",
    "Royal Mile": "Royal Mile Edinburgh",
    "National Museum of Scotland": "National Museum of Scotland Chambers Street",
    "Scottish National Gallery": "Scottish National Gallery The Mound",
    "Palace of Holyroodhouse": "Palace of Holyroodhouse",
    "Arthur's Seat": "Arthur's Seat Holyrood Park",
    "Dean Village walk": "Dean Village Dean Path",
    "Royal Botanic Garden Edinburgh": "Royal Botanic Garden Edinburgh West Gate Arboretum Place",
    "Camera Obscura & World of Illusions": "Camera Obscura World of Illusions 549 Castlehill",
    "Dynamic Earth": "Dynamic Earth Holyrood Road",
    "Scottish Poetry Library": "Scottish Poetry Library 5 Crichton's Close",
    "The Kitchin": "The Kitchin 78 Commercial Quay Leith",
    "Restaurant Martin Wishart": "Restaurant Martin Wishart 54 The Shore Leith",
    "Timberyard": "Timberyard 10 Lady Lawson Street",
    "The Scran & Scallie": "The Scran and Scallie 1 Comely Bank Road",
    "Howies Waterloo": "Howies 29 Waterloo Place",
    "Dishoom Edinburgh": "Dishoom 3a St Andrew Square",
    "Soderberg Pavilion": "Soderberg Pavilion 1 Lister Square",
    "Twelve Triangles (Brunswick Street)": "Twelve Triangles 90 Brunswick Street",
    "Lannan Bakery": "Lannan Bakery 29-35 Hamilton Place",
    "The Milkman (7 Cockburn Street)": "The Milkman 7 Cockburn Street",
    "Fortitude Coffee (Hamilton Place)": "Fortitude Coffee 66 Hamilton Place",
    "Bramble": "Bramble Bar 16a Queen Street",
    "The Devil's Advocate": "The Devil's Advocate 9 Advocate's Close",
    "Copper Blossom": "Copper Blossom 107 George Street"
  };
  const edinburgh = data.cityGuideData.find((guide) => guide.city === "Edinburgh, United Kingdom");
  edinburgh.summary = "Edinburgh Castle, the Royal Mile, free museums, and neighborhood restaurants, bakeries, and cafes.";
  edinburgh.highlights = ["Edinburgh Castle", "Royal Mile", "National Museum of Scotland", "Arthur's Seat"];
  edinburgh.tip = "Keep the Royal Mile sights together, then give Stockbridge or Leith a separate outing. Save Arthur's Seat for suitable weather and daylight, with shoes that grip.";
  data.destinationFacts["Edinburgh, United Kingdom"] = edinburgh.tip;
  data.destinationHeroData["Edinburgh, United Kingdom"].copy = edinburgh.summary;
  data.cityPlanningToolkitData["Edinburgh, United Kingdom"] = [
    { label: "Start here", value: "Choose a castle visit or a Royal Mile walk", copy: "The Royal Mile connects Edinburgh Castle with the Palace of Holyroodhouse. Start with the part you most want to see instead of booking every interior on the same day. The National Museum of Scotland is another option when you want time indoors." },
    { label: "Getting around", value: "Group stops by neighborhood", copy: "Pair Dean Village with Stockbridge's cafes and bakeries. The Kitchin and Restaurant Martin Wishart are in Leith, so allow for the journey if you book dinner there. Arthur's Seat is a hill walk, not a quick city-center transfer; check the park's route notices and weather before setting out." },
    { label: "Book early", value: "Reserve the castle and any special dinner", copy: "Edinburgh Castle advises advance tickets. Camera Obscura sells timed entry, and the palace has a dated booking calendar. Compare The Kitchin, Restaurant Martin Wishart, and Timberyard for a longer meal, checking current menus and terms before reserving." },
    { label: "Eating out", value: "Match the stop to the meal", copy: "Dishoom serves breakfast as well as lunch and dinner, but small evening groups usually walk in. Twelve Triangles on Brunswick Street is takeaway only. Choose Soderberg Pavilion for a sit-down brunch, Howies Waterloo for lunch, or Fortitude on Hamilton Place for coffee in Stockbridge." }
  ];
  data.cityEditorialPageData["Edinburgh, United Kingdom"] = {
    dek: "Castle visits, free museums, neighborhood walks, and places to eat without crossing Edinburgh between every stop.",
    intro: [
      "Give the Royal Mile time rather than treating it as a checklist. Edinburgh Castle sits at one end and the Palace of Holyroodhouse at the other; you can walk part of the route without visiting both on the same day. The Scottish Poetry Library, off Canongate, offers a quieter stop for readers. Check its limited weekday visiting hours before making a detour.",
      "For a lower-cost day, start with the National Museum of Scotland or the Scottish National Gallery at the Mound. General admission is free, although some exhibitions cost extra. The Royal Botanic Garden's outdoor grounds are also free to enter. Check its current glasshouse access separately. For Arthur's Seat, wear shoes with grip and check the forecast and park notices; steep and slippery ground needs more care than a pavement walk.",
      "Keep Stockbridge's food stops on the same outing as Dean Village. Lannan Bakery and Fortitude Coffee are on Hamilton Place, while The Scran & Scallie is on Comely Bank Road. Around the center, choose The Milkman at 7 Cockburn Street for coffee, Soderberg Pavilion in Quartermile for brunch, or Howies Waterloo for lunch. Twelve Triangles on Brunswick Street is a takeaway bakery, not a sit-down breakfast booking.",
      "A dinner at The Kitchin or Restaurant Martin Wishart means heading to Leith; Timberyard is on Lady Lawson Street. Choose one special meal and let the rest stay flexible. Bramble is walk-in only, while The Devil's Advocate and Copper Blossom offer table bookings. With children, compare Dynamic Earth, Camera Obscura, and the National Museum rather than fitting all three into one day. Camera Obscura has stairs between floors and admits assistance dogs, not pet dogs. The Devil's Advocate also has stairs, so check access before booking."
    ],
    summaryCards: [
      ["First visit", "Edinburgh Castle, part of the Royal Mile, and time for a museum."],
      ["A slower outing", "Dean Village, Stockbridge, and a bakery or coffee stop."],
      ["Before booking", "Check entry slots, restaurant policies, and access. Keep hill walks weather-dependent."]
    ],
    trust: "The named recommendations in this guide were checked against official venue, public-operator, and tourism websites on October 3, 2026. This was a website review, not a visit. Confirm current hours, access, and booking arrangements before traveling."
  };
  // Source review and branch evidence: data/city-source-ledger.js, 2026-10-04.
  data.cityGuideDetailData["Dublin, Ireland"] = {
    bestAttractions: ["Book of Kells Experience", "Guinness Storehouse", "National Gallery of Ireland", "EPIC The Irish Emigration Museum", "MoLI - Museum of Literature Ireland"],
    bestRestaurants: ["The Winding Stair", "Pickle", "Chapter One by Mickael Viljanen", "Glovers Alley", "D'Olier Street Restaurant"],
    bestBudget: ["St Stephen's Green walk", "National Gallery of Ireland", "National Botanic Gardens (Glasnevin)"],
    bestLuxury: ["Chapter One by Mickael Viljanen", "Glovers Alley", "D'Olier Street Restaurant"],
    bestCouples: ["St Stephen's Green walk", "The Winding Stair", "Vintage Cocktail Club"],
    bestKids: ["EPIC The Irish Emigration Museum", "National Gallery of Ireland", "St Stephen's Green walk"],
    bestSolo: ["MoLI - Museum of Literature Ireland", "The Winding Stair Bookshop", "Cloud Picker Cafe (Pearse Street)"],
    bestFirstTimers: ["Book of Kells Experience", "Guinness Storehouse", "National Gallery of Ireland"],
    bestUnique: ["MoLI - Museum of Literature Ireland", "The Winding Stair Bookshop", "National Botanic Gardens (Glasnevin)"],
    bestBreakfast: ["Brother Hubbard North (Capel Street)", "Two Pups (Francis Street)", "3fe (Grand Canal Street)"],
    bestLunch: ["The Winding Stair", "Brother Hubbard North (Capel Street)", "3fe (Grand Canal Street)"],
    bestDinner: ["Pickle", "The Winding Stair", "Chapter One by Mickael Viljanen", "Glovers Alley", "D'Olier Street Restaurant"],
    bestCocktails: ["BAR 1661", "Vintage Cocktail Club", "Peruke & Periwig"],
    bestBakeries: ["Bretzel Bakery (Portobello)", "Il Valentino (Grand Canal Dock)", "Two Pups (Francis Street)"],
    bestCoffee: ["3fe (Grand Canal Street)", "Cloud Picker Cafe (Pearse Street)", "Brother Hubbard North (Capel Street)"]
  };
  data.cityPlaceQueries["Dublin, Ireland"] = {
    "Book of Kells Experience": "Book of Kells Experience Trinity College College Green",
    "Guinness Storehouse": "Guinness Storehouse St James's Gate",
    "National Gallery of Ireland": "National Gallery of Ireland Merrion Square West",
    "EPIC The Irish Emigration Museum": "EPIC The Irish Emigration Museum CHQ Custom House Quay",
    "MoLI - Museum of Literature Ireland": "MoLI Museum of Literature Ireland 86 St Stephen's Green",
    "St Stephen's Green walk": "St Stephen's Green Dublin",
    "National Botanic Gardens (Glasnevin)": "National Botanic Gardens Glasnevin Dublin",
    "The Winding Stair Bookshop": "The Winding Stair Bookshop 40 Lower Ormond Quay",
    "The Winding Stair": "The Winding Stair Restaurant 40 Lower Ormond Quay",
    "Pickle": "Pickle Restaurant Camden Street Dublin",
    "Chapter One by Mickael Viljanen": "Chapter One Restaurant 18-19 Parnell Square North",
    "Glovers Alley": "Glovers Alley Restaurant 128 St Stephen's Green",
    "D'Olier Street Restaurant": "D'Olier Street Restaurant D'Olier Chambers Dublin",
    "Brother Hubbard North (Capel Street)": "Brother Hubbard North 153 Capel Street",
    "Two Pups (Francis Street)": "Two Pups 74 Francis Street",
    "3fe (Grand Canal Street)": "3fe 32-34 Grand Canal Street Lower",
    "Bretzel Bakery (Portobello)": "Bretzel Bakery Lennox Street Portobello",
    "Il Valentino (Grand Canal Dock)": "Il Valentino 5 Gallery Quay Grand Canal Dock",
    "Cloud Picker Cafe (Pearse Street)": "Cloud Picker Cafe 42 Pearse Street",
    "BAR 1661": "BAR 1661 1-5 Green Street",
    "Vintage Cocktail Club": "Vintage Cocktail Club 15 Crown Alley",
    "Peruke & Periwig": "Peruke and Periwig 31 Dawson Street"
  };
  const dublin = data.cityGuideData.find((guide) => guide.city === "Dublin, Ireland");
  dublin.summary = "Dublin's museums, bookshops, free gardens, and places for brunch, coffee, and a special dinner.";
  dublin.highlights = ["Book of Kells Experience", "Guinness Storehouse", "National Gallery of Ireland", "EPIC The Irish Emigration Museum"];
  dublin.tip = "Choose one timed visit, then keep nearby stops flexible. Check which Book of Kells ticket you want, and leave a separate outing for the gardens in Glasnevin.";
  data.destinationFacts["Dublin, Ireland"] = dublin.tip;
  data.destinationHeroData["Dublin, Ireland"].copy = dublin.summary;
  data.cityPlanningToolkitData["Dublin, Ireland"] = [
    { label: "Start here", value: "Choose a museum, then leave time to wander", copy: "Pair Trinity with the National Gallery or St Stephen's Green instead of booking every attraction on day one. EPIC is at Custom House Quay; the Guinness Storehouse is at St James's Gate. Pick the visit that interests you most, then plan the rest around it." },
    { label: "Getting around", value: "Keep nearby stops together", copy: "Use the TFI journey planner for buses, trains, and Luas trams. The National Botanic Gardens are in Glasnevin, outside the compact city-center sightseeing area. Check the journey before adding them between two timed bookings." },
    { label: "Book early", value: "Check ticket choices and dinner availability", copy: "The full Book of Kells Experience includes the Old Library and a separate digital exhibition; Old Library-only tickets differ. Reserve a time before visiting. Compare current menus at Chapter One, Glovers Alley, or D'Olier Street before choosing a special dinner, and discuss dietary requirements directly." },
    { label: "Eating out", value: "Keep brunch and dinner plans separate", copy: "Brother Hubbard North on Capel Street and 3fe on Grand Canal Street serve breakfast and lunch. Brother Hubbard North currently lists dinner as temporarily closed. The Winding Stair serves lunch Wednesday to Sunday; Pickle opens later in the day. Check the service you want before reserving." }
  ];
  data.cityEditorialPageData["Dublin, Ireland"] = {
    dek: "Start with the sights you want to see, then make room for bookshops, a garden walk, and a meal worth sitting down for.",
    intro: [
      "A first Dublin trip does not need a packed schedule. Choose the Book of Kells Experience for the manuscript and library, EPIC for stories of Irish emigration, or the Guinness Storehouse for its visitor exhibition. The Storehouse visit is not the same as a working-brewery tour. At Trinity, most Long Room books have been removed for redevelopment, so check what is on display rather than expecting every shelf to be full.",
      "You can spend less without filling the day with compromises. The National Gallery's permanent collection is free, with separate charges for some exhibitions. St Stephen's Green has paths and a playground; check the park's closing time. The National Botanic Gardens in Glasnevin also offer free garden entry, but allow for the journey out of the center and check glasshouse access separately. For a literary stop, visit MoLI on St Stephen's Green or browse The Winding Stair Bookshop on Lower Ormond Quay.",
      "Choose a food stop near the part of Dublin you are visiting. Brother Hubbard North is on Capel Street, Two Pups is on Francis Street, and 3fe's Grand Canal Street cafe serves daytime meals as well as coffee. Two Pups makes its pastries through its own Bold Boy Bakery. Try Bretzel Bakery in Portobello or Il Valentino at Grand Canal Dock for a bakery stop. Cloud Picker's Pearse Street cafe lists Monday-to-Saturday opening, so check before planning a Sunday coffee there.",
      "For dinner, compare The Winding Stair's Irish menu with Pickle's North Indian cooking, or set aside a longer meal for Chapter One, Glovers Alley, or D'Olier Street. Chapter One says it cannot accommodate plant-based, dairy-free, or egg-free diets; contact the restaurant before booking if that affects your party. Pickle says its space is not wheelchair accessible. For cocktails, choose BAR 1661 on Green Street, Vintage Cocktail Club in Temple Bar, or Peruke & Periwig on Dawson Street. Confirm access and current opening details directly rather than assuming every venue suits every traveler."
    ],
    summaryCards: [
      ["First visit", "One timed attraction, a free gallery visit, and room for a walk."],
      ["A quieter afternoon", "MoLI, The Winding Stair Bookshop, or the gardens in Glasnevin."],
      ["Before booking", "Check ticket inclusions, meal service, dietary needs, and access."]
    ],
    trust: "The named recommendations in this guide were checked against official venue, public-operator, and tourism websites on October 4, 2026. This was a website review, not a visit. Confirm current hours, access, and booking arrangements before traveling."
  };
  data.cityGuideDetailData["Cusco, Peru"] = {
    bestAttractions: ["Sacsayhuaman", "Qorikancha", "Cusco Cathedral", "Plaza de Armas", "Centro de Textiles Tradicionales del Cusco", "ChocoMuseo Cusco"],
    bestRestaurants: ["Cicciolina", "Pachapapa", "MAP Cafe", "LIMO", "Green Point", "Oqre"],
    bestBudget: ["Plaza de Armas", "ChocoMuseo Cusco", "Centro de Textiles Tradicionales del Cusco"],
    bestLuxury: ["MAP Cafe", "Oqre", "Cicciolina"],
    bestCouples: ["MAP Cafe", "Cicciolina", "LIMO"],
    bestKids: ["ChocoMuseo Cusco", "Centro de Textiles Tradicionales del Cusco", "Plaza de Armas"],
    bestSolo: ["San Blas", "Cicciolina Cafe", "Centro de Textiles Tradicionales del Cusco"],
    bestFirstTimers: ["Plaza de Armas", "Qorikancha", "Sacsayhuaman", "Cusco Cathedral"],
    bestUnique: ["Twelve-Angled Stone", "San Blas", "Centro de Textiles Tradicionales del Cusco"],
    bestBreakfast: ["Cicciolina Cafe", "Green Point", "Qosqo Maki (Tullumayo)"],
    bestLunch: ["Pachapapa", "Green Point", "LIMO"],
    bestDinner: ["Cicciolina", "MAP Cafe", "Oqre"],
    bestCocktails: ["Museo del Pisco Cusco", "LIMO", "Pachapapa"],
    bestBakeries: ["Qosqo Maki (Tullumayo)", "Cicciolina Cafe", "Qosqo Maki (Santa Rosa)"],
    bestCoffee: ["Cicciolina Cafe", "Green Point", "Qosqo Maki (Tullumayo)"]
  };
  data.cityPlaceQueries = data.cityPlaceQueries || {};
  data.cityPlaceQueries["Cusco, Peru"] = {
    "Cicciolina Cafe": "Cicciolina Cafe Calle Ruinas 465",
    "MAP Cafe": "MAP Cafe Plazoleta Nazarenas 231"
  };
  const cusco = data.cityGuideData.find((guide) => guide.city === "Cusco, Peru");
  cusco.summary = "Inca sites, textile museums, and places to eat around Cusco's historic center and San Blas.";
  cusco.highlights = ["Sacsayhuaman", "Qorikancha", "Cusco Cathedral", "San Blas"];
  cusco.tip = "Start with a short walk around Plaza de Armas. San Blas is uphill, so leave time for stops rather than treating every walk as a quick transfer.";
  data.destinationFacts["Cusco, Peru"] = cusco.tip;
  data.destinationHeroData["Cusco, Peru"].copy = cusco.summary;
  data.cityPlanningToolkitData["Cusco, Peru"] = [
    { label: "Where to stay", value: "Compare the streets around Plaza de Armas with San Blas", copy: "Both put you near places in this guide. Check the route to your accommodation: San Blas is uphill, which matters when you are arriving with luggage or planning several walks a day." },
    { label: "Getting around", value: "Keep the historic center and Sacsayhuaman on separate outings", copy: "Plaza de Armas, the cathedral, and Qorikancha can be part of a city-center day. Sacsayhuaman is above the city; plan the journey there rather than adding it as one more stop between meals." },
    { label: "Book early", value: "Reserve the meals and workshops you care about", copy: "MAP Cafe and Cicciolina offer table reservations. ChocoMuseo lists bookable workshops as well as its free museum visit. Check availability with each venue before fixing the rest of the day." },
    { label: "Tickets", value: "Check which sites your Cusco tourist ticket covers", copy: "COSITUC lists integral and partial tickets. Sacsayhuaman is part of a ticket circuit; compare the included sites with your plan. A ticket covers entry, not a guide or transport." }
  ];
  data.cityEditorialPageData["Cusco, Peru"] = {
    dek: "Plan time for Inca stonework, a walk through San Blas, and meals worth choosing before you arrive.",
    intro: [
      "Start at Plaza de Armas and decide how much you want to fit into the day. The cathedral faces the square; Qorikancha gives you another look at the city's Inca and colonial history. San Blas is an uphill walk, with the Twelve-Angled Stone along the way. Save Sacsayhuaman for a separate outing if you would rather keep the first day short.",
      "You do not need a restaurant reservation for every meal. Cicciolina Cafe, Green Point, and Qosqo Maki on Tullumayo give you named options for breakfast or a coffee break. For a longer meal, compare Pachapapa in San Blas, LIMO overlooking Plaza de Armas, and MAP Cafe in the courtyard of the Museo de Arte Precolombino.",
      "With children, consider the free museum visit at ChocoMuseo or the textile displays at the Centro de Textiles Tradicionales del Cusco. Workshops are a separate booking. The bakery list includes two Qosqo Maki branches: Tullumayo for a central stop and Santa Rosa when you are already in that part of the city. There is no need to visit both."
    ],
    summaryCards: [
      ["Start here", "Plaza de Armas, Cusco Cathedral, and Qorikancha."],
      ["Leave room for", "San Blas, textile displays, and a meal you have chosen in advance."],
      ["Before you go", "Check venue hours, reservations, and the sites included in your tourist ticket."]
    ],
    trust: "The named recommendations in this guide were checked against tourism-board, venue, or operator websites on September 30, 2026. Listings and opening arrangements can change; confirm with the venue before visiting."
  };
  data.cityGuideDetailData["Singapore, Singapore"] = {
    bestAttractions: ["Gardens by the Bay outdoor gardens", "Singapore Botanic Gardens", "National Gallery Singapore", "ArtScience Museum", "Singapore Zoo"],
    bestRestaurants: ["Candlenut", "National Kitchen by Violet Oon", "JUMBO Seafood (Riverside Point)"],
    bestBudget: ["Singapore Botanic Gardens"],
    bestLuxury: ["Candlenut", "ATLAS"],
    bestCouples: ["Gardens by the Bay outdoor gardens", "Candlenut", "ATLAS"],
    bestKids: ["Jacob Ballas Children's Garden", "Singapore Zoo", "ArtScience Museum"],
    bestSolo: ["Singapore Botanic Gardens", "National Gallery Singapore", "Plain Vanilla (Tiong Bahru)"],
    bestFirstTimers: ["Gardens by the Bay outdoor gardens", "National Gallery Singapore", "Singapore Botanic Gardens"],
    bestUnique: ["ArtScience Museum", "National Kitchen by Violet Oon"],
    bestBreakfast: ["Plain Vanilla (Tiong Bahru)", "Tiong Bahru Bakery (Eng Hoon Street)"],
    bestLunch: ["National Kitchen by Violet Oon", "JUMBO Seafood (Riverside Point)", "Plain Vanilla (Tiong Bahru)"],
    bestDinner: ["Candlenut", "National Kitchen by Violet Oon", "JUMBO Seafood (Riverside Point)"],
    bestCocktails: ["ATLAS", "Jigger & Pony"],
    bestBakeries: ["Tiong Bahru Bakery (Eng Hoon Street)", "Plain Vanilla (Tiong Bahru)"],
    bestCoffee: ["Plain Vanilla (Tiong Bahru)", "Tiong Bahru Bakery (Eng Hoon Street)"]
  };
  data.cityPlaceQueries["Singapore, Singapore"] = {
    "Gardens by the Bay outdoor gardens": "Gardens by the Bay 18 Marina Gardens Drive Singapore",
    "Singapore Botanic Gardens": "Singapore Botanic Gardens Tanglin Gate Singapore",
    "National Gallery Singapore": "National Gallery Singapore 1 St Andrews Road",
    "ArtScience Museum": "ArtScience Museum 6 Bayfront Avenue Singapore",
    "Singapore Zoo": "Singapore Zoo Mandai Singapore",
    "Jacob Ballas Children's Garden": "Jacob Ballas Children's Garden Singapore Botanic Gardens",
    "Candlenut": "Candlenut 17A Dempsey Road Singapore",
    "National Kitchen by Violet Oon": "National Kitchen by Violet Oon 1 St Andrews Road 02-01 Singapore",
    "JUMBO Seafood (Riverside Point)": "JUMBO Seafood 30 Merchant Road Riverside Point Singapore",
    "Plain Vanilla (Tiong Bahru)": "Plain Vanilla 1D Yong Siak Street Singapore",
    "Tiong Bahru Bakery (Eng Hoon Street)": "Tiong Bahru Bakery 56 Eng Hoon Street Singapore",
    "ATLAS": "ATLAS Parkview Square 600 North Bridge Road Singapore",
    "Jigger & Pony": "Jigger and Pony Amara Singapore 165 Tanjong Pagar Road"
  };
  const singapore = data.cityGuideData.find((guide) => guide.city === "Singapore, Singapore");
  singapore.summary = "Garden walks, museums, and places for brunch, Peranakan cooking, seafood, and cocktails in Singapore.";
  singapore.highlights = ["Gardens by the Bay outdoor gardens", "National Gallery Singapore", "Singapore Botanic Gardens", "ArtScience Museum"];
  singapore.tip = "Choose a garden or museum first, then plan a meal nearby. Keep the zoo as a separate outing and check attraction closures before buying tickets.";
  data.destinationFacts["Singapore, Singapore"] = singapore.tip;
  data.destinationHeroData["Singapore, Singapore"].copy = singapore.summary;
  data.cityPlanningToolkitData["Singapore, Singapore"] = [
    { label: "Start here", value: "Choose one area for the day", copy: "Combine the National Gallery with lunch at National Kitchen, or visit ArtScience Museum and the outdoor gardens at Gardens by the Bay. Leave time between bookings instead of treating each stop as a quick transfer." },
    { label: "Garden visits", value: "Check the attraction, not just the park", copy: "Singapore Botanic Gardens has free general entry, but the National Orchid Garden charges separately. Gardens by the Bay lists maintenance closures for its ticketed attractions. An open outdoor garden does not mean every conservatory is open." },
    { label: "With children", value: "Check age rules and allow for the journey", copy: "Jacob Ballas Children's Garden is for children up to 14 accompanied by an adult and normally closes on Mondays. Singapore Zoo is at Mandai; plan the journey separately from a Marina Bay day. ArtScience Museum has different exhibitions and ticket choices." },
    { label: "Eating out", value: "Check the exact branch and service", copy: "Plain Vanilla's Tiong Bahru cafe serves daytime brunch and does not take reservations. Candlenut and National Kitchen offer lunch and dinner reservations. Jigger & Pony admits guests over 18; check ATLAS's evening dress code and current reservation hours." }
  ];
  data.cityEditorialPageData["Singapore, Singapore"] = {
    dek: "Make time for a garden walk, an exhibition you want to see, and a meal you have chosen before you arrive.",
    intro: [
      "Start with the part of Singapore you most want to explore. At Marina Bay, choose an ArtScience Museum exhibition and leave room for the outdoor gardens at Gardens by the Bay. Museum exhibitions have separate ticket arrangements, and the gardens publish maintenance dates for individual attractions. Check those before paying rather than assuming a combined day means everything will be open.",
      "For a quieter outing, Singapore Botanic Gardens has free general entry and several entrances. Choose the entrance that suits your route; Napier and Botanic Gardens MRT stations serve different ends. The National Orchid Garden is a separate paid visit. With children, check Jacob Ballas Children's Garden's age rules and Monday closure. Singapore Zoo is another option for a family outing, but it is at Mandai rather than in the Marina Bay sightseeing area.",
      "National Gallery Singapore gives you an indoor stop in the Civic District. Check the current exhibitions and ticket inclusions: the UOB Southeast Asia Gallery is temporarily closed, although other galleries remain open. National Kitchen by Violet Oon is in the City Hall wing and offers lunch and dinner. Its high tea has a different service schedule, so reserve the meal you actually want.",
      "In Tiong Bahru, choose Plain Vanilla on Yong Siak Street for brunch or stop at Tiong Bahru Bakery on Eng Hoon Street for a pastry and coffee. These are two separate businesses, not two names for the same cafe. For a longer meal, compare Candlenut's Peranakan menu at Dempsey with JUMBO Seafood's Riverside Point branch. Check dietary needs and availability directly. ATLAS at Parkview Square and Jigger & Pony at Amara Singapore offer cocktail reservations; neither is a substitute for a family restaurant."
    ],
    summaryCards: [
      ["First visit", "Choose Marina Bay, the Civic District, or a garden outing rather than booking all three back to back."],
      ["A slower morning", "Brunch or a bakery stop in Tiong Bahru, then leave the next booking flexible."],
      ["Before booking", "Check exhibition tickets, maintenance closures, exact branches, and age or dress rules."]
    ],
    trust: "All 13 distinct recommendations in this guide were checked against official operator websites on October 6, 2026, starting with Visit Singapore. This was a website review, not a visit or telephone confirmation. Advertised opening and reservation details do not guarantee availability; confirm before traveling."
  };
  data.cityGuideDetailData["Hong Kong, China"] = {
    "bestAttractions": [
        "M+",
        "Star Ferry (Central-Tsim Sha Tsui)"
    ],
    "bestUnique": [
        "PMQ"
    ],
    "bestBreakfast": [
        "Bakehouse (Wan Chai)"
    ],
    "bestLunch": [
        "Duddell's (Central)"
    ],
    "bestDinner": [
        "Lung King Heen"
    ],
    "bestCocktails": [
        "ARGO"
    ],
    "bestBakeries": [
        "Bakehouse (Wan Chai)"
    ],
    "bestCoffee": [
        "noc (Tsim Sha Tsui, Sun Arcade)"
    ],
    "bestRestaurants": [
        "Duddell's (Central)",
        "Lung King Heen"
    ],
    "bestKids": [],
    "bestFirstTimers": [
        "Star Ferry (Central-Tsim Sha Tsui)"
    ],
    "bestSolo": [
        "M+",
        "noc (Tsim Sha Tsui, Sun Arcade)"
    ],
    "bestCouples": [
        "ARGO"
    ],
    "bestBudget": [
        "M+"
    ],
    "bestLuxury": [
        "Lung King Heen"
    ]
};
  data.cityGuideDetailData["Hanoi, Vietnam"] = {
    bestAttractions: ["Temple of Literature", "Hanoi Museum"],
    bestFirstTimers: ["Temple of Literature", "Cafe Giang (Nguyen Huu Huan)"],
    bestUnique: ["KOTO Van Mieu", "Cafe Giang (Nguyen Huu Huan)"],
    bestBreakfast: ["Lifted Coffee & Brunch (Hang Ga)", "Red Bean Ma May"],
    bestLunch: ["KOTO Van Mieu", "Lifted Coffee & Brunch (Hang Ga)"],
    bestDinner: ["Red Bean Ma May", "Le Beaulieu"],
    bestRestaurants: ["Red Bean Ma May", "Le Beaulieu"],
    bestCoffee: ["Cafe Giang (Nguyen Huu Huan)", "Lifted Coffee & Brunch (Hang Ga)"],
    bestBakeries: [], bestCocktails: ["angelina"],
    bestCouples: ["Le Beaulieu", "angelina"],
    bestKids: ["Hanoi Museum"], bestSolo: ["Temple of Literature", "Cafe Giang (Nguyen Huu Huan)"],
    bestBudget: [], bestLuxury: ["Le Beaulieu"]
  };
  data.cityGuideDetailData["Berlin, Germany"] = {
    bestAttractions: ["Neues Museum", "Berlin Wall Memorial", "Charlottenburg Palace (Old Palace)"],
    bestFirstTimers: ["Neues Museum", "Berlin Wall Memorial", "East Side Gallery"],
    bestUnique: ["DDR Museum", "Tempelhofer Feld"],
    bestBreakfast: ["House of Small Wonder (Auguststrasse)", "Zeit fuer Brot (Alte Schoenhauser Strasse)"],
    bestLunch: ["Markthalle Neun", "THE BARN (Mitte)"],
    bestDinner: ["Restaurant Tim Raue", "Nobelhart & Schmutzig"],
    bestRestaurants: ["Restaurant Tim Raue", "Nobelhart & Schmutzig"],
    bestCoffee: ["THE BARN (Mitte)"], bestBakeries: ["Zeit fuer Brot (Alte Schoenhauser Strasse)"],
    bestCocktails: ["Green Door Bar"],
    bestCouples: ["Charlottenburg Palace (Old Palace)", "Green Door Bar"],
    bestKids: ["Museum fuer Naturkunde Berlin", "Zoo Berlin", "Deutsches Technikmuseum"],
    bestSolo: ["DDR Museum", "Berlin Wall Memorial", "THE BARN (Mitte)"],
    bestBudget: ["Tempelhofer Feld", "East Side Gallery"],
    bestLuxury: ["Restaurant Tim Raue", "Nobelhart & Schmutzig"]
  };
  data.cityGuideDetailData["Vienna, Austria"] = {
    bestAttractions: ["Schoenbrunn Palace", "Upper Belvedere", "St. Stephen's Cathedral"],
    bestFirstTimers: ["Schoenbrunn Palace", "St. Stephen's Cathedral", "Demel (Kohlmarkt)"],
    bestUnique: ["Mozarthaus Vienna", "KunstHausWien"],
    bestBreakfast: ["Joseph Brot (Fuehrichgasse)", "MOTTO am Fluss"],
    bestLunch: ["Figlmueller (Wollzeile)", "MOTTO am Fluss"],
    bestDinner: ["Meissl & Schadn (Vienna)", "MOTTO am Fluss"],
    bestRestaurants: ["Figlmueller (Wollzeile)", "Meissl & Schadn (Vienna)"],
    bestCoffee: ["Demel (Kohlmarkt)", "Joseph Brot (Fuehrichgasse)"],
    bestBakeries: ["Demel (Kohlmarkt)", "Joseph Brot (Fuehrichgasse)"],
    bestCocktails: [], bestCouples: ["Vienna State Opera", "Upper Belvedere"],
    bestKids: ["Schoenbrunn Zoo", "Natural History Museum Vienna"],
    bestSolo: ["ALBERTINA (Albertinaplatz)", "Leopold Museum", "Mozarthaus Vienna"],
    bestBudget: [], bestLuxury: ["Vienna State Opera"]
  };
  data.cityGuideDetailData["Munich, Germany"] = {
    bestAttractions: ["Munich Residence", "Alte Pinakothek", "BMW Museum"],
    bestFirstTimers: ["Munich Residence", "Hofbraeuhaus Muenchen"],
    bestUnique: ["BMW Welt", "Munich Documentation Centre for the History of National Socialism"],
    bestBreakfast: ["Dallmayr Cafe Bistro", "Rischart (Cafe am Marienplatz)"],
    bestLunch: ["Hofbraeuhaus Muenchen", "Dallmayr Cafe Bistro"],
    bestDinner: ["Augustiner Klosterwirt", "Restaurant Tantris"],
    bestRestaurants: ["Augustiner Klosterwirt", "Restaurant Tantris"],
    bestCoffee: ["Man versus Machine (Glockenbach)", "Dallmayr Cafe Bistro"],
    bestBakeries: ["Rischart (Cafe am Marienplatz)"], bestCocktails: ["Schumann's Bar (Hofgarten)"],
    bestCouples: ["Restaurant Tantris", "Schumann's Bar (Hofgarten)"],
    bestKids: ["Deutsches Museum (Museumsinsel)", "Hellabrunn Zoo"],
    bestSolo: ["Lenbachhaus", "Alte Pinakothek", "Man versus Machine (Glockenbach)"],
    bestBudget: ["Munich Documentation Centre for the History of National Socialism", "BMW Welt"],
    bestLuxury: ["Restaurant Tantris"]
  };
  const reviewedBatch = {
    "Hong Kong, China": {
      summary: "A short source-checked selection of harbour crossings, art, design, breakfast and booked meals, with exact Hong Kong branches.",
      highlights: ["M+", "Star Ferry (Central-Tsim Sha Tsui)", "PMQ"],
      tip: "Choose one side of the harbour for your main outing, then check the exact branch and service before booking a meal.",
      intro: [
        "Start with the outing you want to spend time on, rather than trying to finish a long list. M+ is at 38 Museum Drive in West Kowloon. Its galleries have ticket arrangements, while several public spaces remain free. The budget suggestion here means those free areas, including the Roof Garden and Found Space, not free entry to every exhibition. Check the museum's current visitor information before choosing what to see.",
        "For a harbour crossing, this guide means Star Ferry's ordinary Central-Tsim Sha Tsui service. A separately sold harbour tour is a different outing. Use the operator's pier information to find your boarding point and leave some flexibility for weather or changes to sailing times. PMQ, at 35 Aberdeen Street in Central, adds design shops and heritage displays to another part of the day. Individual tenants and events have their own hours; a visit to the building does not promise that every studio or workshop will be available.",
        "Bakehouse's Wan Chai restaurant is at 14 Tai Wong Street East and publishes a dine-in breakfast menu. Do not substitute one of its takeaway-only branches if you want to sit down. For coffee, noc's Sun Arcade branch is at 28 Canton Road in Tsim Sha Tsui. It is not the nearby Empire Centre location. Check the individual branch page for its hours rather than treating a momentary Closed indicator in a location directory as a permanent closure notice.",
        "Duddell's recommendation means the Central restaurant at 1 Duddell Street, not its airport outlet. The main dining room and Upper Room offer different menus and service arrangements. Lung King Heen is on the fourth floor of Four Seasons Hotel Hong Kong at 8 Finance Street. It publishes lunch and dinner reservations as well as child-age restrictions that vary by day. Confirm the rules for your party directly, especially with younger children.",
        "ARGO is a separate evening drinks stop on the hotel's first floor. It welcomes non-hotel guests but has its own age and dress requirements. The hotel's directions currently specify lift access from IFC during escalator maintenance, so use those directions rather than an older route description. This is a deliberately short selection, not a complete catalogue of Hong Kong. Children's recommendations remain empty while the current candidate checks are unresolved. Opening details, admission arrangements and reservations can change; confirm the visit you want with the operator before traveling."
      ],
      toolkit: [
        { label: "Museum admission", value: "Free areas are not all galleries", copy: "M+ advertises free public spaces separately from ticketed exhibitions. Check the current admission arrangements for your intended visit." },
        { label: "Find the branch", value: "Use the complete address", copy: "Bakehouse Wan Chai offers dine-in breakfast. noc's Sun Arcade branch and Duddell's Central restaurant are specific locations, not interchangeable outlets." },
        { label: "Dining", value: "Check age and service rules", copy: "Lung King Heen's child-age arrangements vary by day. ARGO has its own age and dress requirements. Confirm with the venue before booking." },
        { label: "Getting there", value: "Read current directions", copy: "Four Seasons currently specifies lift access from IFC during escalator maintenance. Ferry piers and sailing arrangements have their own operator information." }
      ]
    },
    "Hanoi, Vietnam": {
      summary: "Museum visits, egg coffee, brunch and Vietnamese meals, with exact branches to help you plan Hanoi.",
      highlights: ["Temple of Literature", "Hanoi Museum", "Cafe Giang (Nguyen Huu Huan)"],
      tip: "Choose one museum and a meal first. Check the exact restaurant branch before setting your route.",
      intro: [
        "Start with the visit you care about most. The Temple of Literature publishes its visitor entrance on Quoc Tu Giam and asks visitors to respect the worship spaces. Hanoi Museum is on Pham Hung Street, rather than a quick extra stop between Old Quarter meals. Give it its own outing if you want time with the displays instead of squeezing it into a lunch break.",
        "For breakfast, Lifted Coffee & Brunch on Hang Ga offers all-day brunch and coffee. Red Bean Ma May is another named option, with different breakfast and lunch service times. For egg coffee, use Cafe Giang's Nguyen Huu Huan branch. The business lists other locations too, so check the full address rather than choosing the first map result with the right name.",
        "KOTO Van Mieu advertises Vietnamese dishes and table reservations at 35 Van Mieu. Its current operator address differs from older listings. For a longer evening meal, compare Red Bean Ma May with Le Beaulieu at the Metropole. The hotel's angelina lounge is a separate drinks stop, not another restaurant recommendation under a different name. Confirm the service you want and any dietary requirements before booking. The bakery and budget lists are left empty while their candidates remain unresolved."
      ],
      toolkit: [
        { label: "Start here", value: "Choose a museum, then a meal", copy: "The Temple of Literature and Hanoi Museum are separate outings. Do not assume both fit comfortably between breakfast and lunch." },
        { label: "Find the branch", value: "Use the full current address", copy: "Cafe Giang has several locations. KOTO's operator currently gives 35 Van Mieu; older listings can give a different address." },
        { label: "Dining", value: "Book the service you want", copy: "Le Beaulieu lists lunch, dinner and Sunday brunch separately. Red Bean Ma May has different breakfast and later dining hours." },
        { label: "Before visiting", value: "Confirm access and opening", copy: "Museum visitor information and restaurant reservations can change. Check directly rather than relying on a fixed schedule in a guide." }
      ]
    },
    "Berlin, Germany": {
      summary: "Wall history, museums, outdoor space and exact-branch food stops for a Berlin trip you can plan around.",
      highlights: ["Neues Museum", "Berlin Wall Memorial", "East Side Gallery"],
      tip: "Keep the Wall Memorial, Museum Island and Kreuzberg food stops as separate parts of your plan rather than a checklist to finish in one morning.",
      intro: [
        "Choose the history or museum visit you most want to spend time with. Neues Museum publishes its entrance through James Simon Galerie, while the Berlin Wall Memorial follows the historical site on Bernauer Strasse. East Side Gallery is a different Wall location. Seeing both can be worthwhile, but they are not two entrances to the same attraction.",
        "For breakfast, House of Small Wonder now serves brunch at Auguststrasse 11-13. Its former Johannisstrasse location remains closed, and the operator warns that selecting the business name in a ride app can send visitors there. THE BARN's Mitte branch is on Auguststrasse 58. Zeit fuer Brot on Alte Schoenhauser Strasse gives you another specific bakery stop, rather than an unspecified cafe nearby.",
        "Markthalle Neun publishes a market calendar as well as hall opening times. Check which stands and events suit your day; an open hall does not mean every food stall is serving. Restaurant Tim Raue and Nobelhart & Schmutzig offer dinner reservations. Green Door Bar is an evening drinks option, not a family meal. With children, compare the Natural History Museum, Zoo Berlin and Deutsches Technikmuseum. The technology museum lists galleries that are currently inaccessible, so check the displays you want before buying tickets. Tempelhofer Feld has free access, seasonal gates and notices about work in parts of the park."
      ],
      toolkit: [
        { label: "Breakfast", value: "Auguststrasse, not the old address", copy: "House of Small Wonder's current directions specify Auguststrasse 11-13. Enter the full address when arranging transport." },
        { label: "Markets", value: "Check the event and the stall", copy: "Markthalle Neun has different hall, market and Thursday evening service schedules." },
        { label: "Museums", value: "Check entrances and closed rooms", copy: "Neues Museum uses the James Simon Galerie entrance. Deutsches Technikmuseum lists partial exhibition closures." },
        { label: "Outdoor time", value: "Leave time for Tempelhofer Feld", copy: "The operator lists seasonal gate hours and several entrances. Check current development notices and park rules." }
      ]
    },
    "Vienna, Austria": {
      summary: "Palace visits, art, pastry stops and an opera evening, with current branches and visitor arrangements in Vienna.",
      highlights: ["Schoenbrunn Palace", "Upper Belvedere", "St. Stephen's Cathedral"],
      tip: "Choose a palace or museum for the day and leave time for a cafe. Book the performance you want rather than assuming opera tickets will be available.",
      intro: [
        "Start with the interior you most want to see. Schoenbrunn Palace and Upper Belvedere publish their own ticket arrangements; the palace, gardens and zoo are not one automatically included visit. Upper Belvedere is on Prinz Eugen Strasse, while other Belvedere sites use different addresses. St. Stephen's Cathedral has visiting times that differ from worship access and can change for services.",
        "For art, compare ALBERTINA at Albertinaplatz with Leopold Museum in MuseumsQuartier or KunstHausWien on Untere Weissgerberstrasse. You do not need all three in one day. Mozarthaus Vienna gives you a separate museum visit on Domgasse. Check current exhibitions and the language of any tour before booking, especially if you are planning a family event rather than general admission.",
        "Joseph Brot's Fuehrichgasse bistro offers an early start; Demel on Kohlmarkt opens later and does not take reservations. Cafe Central's Palais Ferstel branch is closed for renovation, so it is not included as an open cafe. At MOTTO am Fluss, daytime cafe service and evening restaurant service differ. For a meal, compare Figlmueller's Wollzeile branch with Meissl & Schadn in Vienna, not its Salzburg restaurant. An evening at Vienna State Opera needs its own ticket and performance choice. The drinks and budget lists remain empty where the source review has not established an appropriate recommendation."
      ],
      toolkit: [
        { label: "Tickets", value: "Choose the exact venue", copy: "Upper Belvedere, ALBERTINA branches and Schoenbrunn's attractions have separate addresses or admission arrangements." },
        { label: "Coffee", value: "Check the cafe before going", copy: "Cafe Central is closed for renovation. Demel does not take reservations; Joseph Brot's kitchen closes before its bistro." },
        { label: "With children", value: "Allow a separate zoo outing", copy: "Schoenbrunn Zoo publishes seasonal closing times. Museum family events can have specific dates and language requirements." },
        { label: "Evening", value: "Reserve the performance or meal", copy: "Check Vienna State Opera's programme and restaurant service times before setting the rest of the day." }
      ]
    },
    "Munich, Germany": {
      summary: "Art, palace rooms, science museums and Bavarian dining, with specific Munich branches and current access notes.",
      highlights: ["Munich Residence", "Alte Pinakothek", "Deutsches Museum (Museumsinsel)"],
      tip: "Choose one museum visit and a meal first. Check partial closures and the journey to the zoo before adding another outing.",
      intro: [
        "Choose the collection you want to spend time with. Munich Residence has separate arrangements for its museum, treasury and theatre. Alte Pinakothek publishes an entrance through Theresienstrasse, while Lenbachhaus is on Luisenstrasse. Lenbachhaus's Kunstbau gallery is closed during 2026, so an open main museum is not a promise that every exhibition space is available.",
        "BMW Welt and BMW Museum are distinct visits: the Welt building has free entry, while the museum is ticketed. Check the operator's date-specific restrictions before setting your route. With children, compare Deutsches Museum's Museumsinsel site with Hellabrunn Zoo. The zoo warns about replacement transport and construction restrictions. Munich Documentation Centre offers free admission to serious historical material; it is not a substitute for a children's science activity.",
        "Dallmayr Cafe Bistro offers breakfast and lunch on Dienerstrasse, but closes on Sundays and public holidays. Rischart's Cafe am Marienplatz has its own breakfast, meal and cake service. For coffee, use Man versus Machine's Glockenbach branch on Muellerstrasse. Hofbraeuhaus and Augustiner Klosterwirt are named options for Bavarian meals, with their own room and reservation arrangements. For a longer booked meal, check Restaurant Tantris rather than confusing it with Tantris DNA. Schumann's Bar at Hofgarten is a separate evening option and lists Saturday as closed."
      ],
      toolkit: [
        { label: "Museums", value: "Check the building as well as the name", copy: "BMW Welt and BMW Museum have different admission. Lenbachhaus's Kunstbau is closed during 2026." },
        { label: "Breakfast", value: "Keep a Sunday alternative", copy: "Dallmayr Cafe Bistro closes Sundays and public holidays. Check the exact Rischart branch for your chosen day." },
        { label: "Zoo journey", value: "Check current transport notices", copy: "Hellabrunn reports replacement service on part of the U3 route and construction restrictions inside the zoo." },
        { label: "Dinner", value: "Reserve the right restaurant", copy: "Restaurant Tantris and Tantris DNA are distinct. Hofbraeuhaus booking rules depend on the room you choose." }
      ]
    }
  };
  for (const [city, review] of Object.entries(reviewedBatch)) {
    const guide = data.cityGuideData.find((item) => item.city === city);
    Object.assign(guide, { summary: review.summary, highlights: review.highlights, tip: review.tip });
    data.destinationFacts[city] = review.tip;
    data.destinationHeroData[city].copy = review.summary;
    data.cityPlanningToolkitData[city] = review.toolkit;
    data.cityEditorialPageData[city] = {
      dek: review.summary, intro: review.intro,
      summaryCards: [["Start here", review.highlights.join(", ") + "."], ["Plan your day", review.tip], ["Before visiting", "Confirm the exact branch, current access and reservations directly."]],
      trust: "The named detail recommendations were reviewed against official operator websites on October 6, 2026. This was a website review, not a visit or telephone confirmation. Current opening and booking information does not guarantee availability."
    };
  }

  // Paris: source review approved October 14, 2026 (docs/content-research/paris-2026-10-14.md).
  data.cityGuideDetailData["Paris, France"] = {
    bestAttractions: ["Eiffel Tower", "Louvre Museum", "Musée d'Orsay", "Sainte-Chapelle"],
    bestFirstTimers: ["Eiffel Tower", "Louvre Museum", "Arc de Triomphe"],
    bestRestaurants: ["Septime", "Frenchie (rue du Nil)", "Bistrot Paul Bert"],
    bestBudget: ["Jardin du Luxembourg", "Sacré-Cœur Basilica", "Galerie Vivienne"],
    bestLuxury: ["Le Jules Verne", "Bar Hemingway (Ritz Paris)"],
    bestCouples: ["Musée de l'Orangerie", "Sacré-Cœur Basilica", "Le Jules Verne"],
    bestKids: ["Jardin d'Acclimatation", "Cité des sciences et de l'industrie", "Jardin du Luxembourg"],
    bestSolo: ["Musée Rodin", "Musée d'Orsay", "Coutume Café (Babylone)"],
    bestUnique: ["Galerie Vivienne", "Marché aux Puces de Saint-Ouen", "Palais Garnier"],
    bestBreakfast: ["Holybelly", "Poilâne (rue du Cherche-Midi)", "Breizh Café (Marais)"],
    bestLunch: ["Clamato", "Breizh Café (Marais)", "Septime"],
    bestDinner: ["Septime", "Bistrot Paul Bert", "Frenchie (rue du Nil)"],
    bestCocktails: ["Little Red Door", "Bar Hemingway (Ritz Paris)"],
    bestBakeries: ["Du Pain et des Idées", "Poilâne (rue du Cherche-Midi)", "Mamiche (rue du Château d'Eau)"],
    bestCoffee: ["Terres de Café (Rambuteau)", "Coutume Café (Babylone)", "Holybelly"]
  };
  data.cityPlaceQueries["Paris, France"] = {
    "Eiffel Tower": "Eiffel Tower Champ de Mars Paris",
    "Louvre Museum": "Louvre Museum Pyramid Paris",
    "Musée d'Orsay": "Musée d'Orsay Esplanade Valéry Giscard d'Estaing Paris",
    "Musée de l'Orangerie": "Musée de l'Orangerie Jardin des Tuileries Paris",
    "Sainte-Chapelle": "Sainte-Chapelle 10 boulevard du Palais Paris",
    "Arc de Triomphe": "Arc de Triomphe Place Charles de Gaulle Paris",
    "Musée Rodin": "Musée Rodin 77 rue de Varenne Paris",
    "Palais Garnier": "Palais Garnier Place de l'Opéra Paris",
    "Jardin du Luxembourg": "Jardin du Luxembourg Paris",
    "Jardin d'Acclimatation": "Jardin d'Acclimatation Bois de Boulogne Paris",
    "Cité des sciences et de l'industrie": "Cité des sciences et de l'industrie 30 avenue Corentin Cariou Paris",
    "Marché aux Puces de Saint-Ouen": "Marché aux Puces de Saint-Ouen rue des Rosiers Saint-Ouen",
    "Galerie Vivienne": "Galerie Vivienne 4 rue des Petits-Champs Paris",
    "Sacré-Cœur Basilica": "Sacré-Cœur Basilica 35 rue du Chevalier de La Barre Paris",
    "Septime": "Septime 80 rue de Charonne Paris",
    "Frenchie (rue du Nil)": "Frenchie 5 rue du Nil Paris",
    "Bistrot Paul Bert": "Bistrot Paul Bert 18 rue Paul Bert Paris",
    "Le Jules Verne": "Le Jules Verne Eiffel Tower Paris",
    "Clamato": "Clamato 80 rue de Charonne Paris",
    "Breizh Café (Marais)": "Breizh Café 109 rue Vieille du Temple Paris",
    "Little Red Door": "Little Red Door 60 rue Charlot Paris",
    "Bar Hemingway (Ritz Paris)": "Bar Hemingway Ritz Paris 15 place Vendôme",
    "Holybelly": "Holybelly 5 rue Lucien Sampaix Paris",
    "Du Pain et des Idées": "Du Pain et des Idées 34 rue Yves Toudic Paris",
    "Poilâne (rue du Cherche-Midi)": "Poilâne 8 rue du Cherche-Midi Paris",
    "Mamiche (rue du Château d'Eau)": "Mamiche 32 rue du Château d'Eau Paris",
    "Terres de Café (Rambuteau)": "Terres de Café 14 rue Rambuteau Paris",
    "Coutume Café (Babylone)": "Coutume Café 47 rue de Babylone Paris"
  };
  const paris = data.cityGuideData.find((guide) => guide.city === "Paris, France");
  paris.summary = "Museums, monuments and gardens, with bakeries, bistros and cocktail bars checked against their own websites.";
  paris.highlights = ["Eiffel Tower", "Louvre Museum", "Musée d'Orsay", "Sainte-Chapelle"];
  paris.tip = "Choose one museum or monument per half day, check its closed day and booking rules, then plan a meal nearby instead of crossing the city.";
  data.destinationFacts["Paris, France"] = paris.tip;
  data.destinationHeroData["Paris, France"].copy = paris.summary;
  data.cityPlanningToolkitData["Paris, France"] = [
    { label: "Closed days", value: "Check before you plan the day", copy: "The Louvre closes on Tuesdays. Musée d'Orsay, Musée Rodin and the Cité des sciences close on Mondays (the Cité des sciences opens on Mondays during the 19 October-1 November school holidays). Du Pain et des Idées closes at weekends and Poilâne on Sundays." },
    { label: "Book ahead", value: "Timed entry and set menus", copy: "The Louvre requires a timed reservation for every visitor from 17 October to 1 November 2026. Palais Garnier sells visit tickets online only. Septime opens bookings 21 days ahead; Bistrot Paul Bert takes bookings by phone." },
    { label: "Walk-in", value: "Places that don't take reservations", copy: "Clamato is walk-in only. Bar Hemingway needs no booking, and Little Red Door welcomes walk-ins. Expect queues at busy times." },
    { label: "Access", value: "Stairs, lifts and gate times", copy: "The Arc de Triomphe's lift is out of service, so the terrace is 284 steps. The Jardin du Luxembourg changes its gate times twice a month with daylight. Rehearsals can close the Palais Garnier auditorium without notice." }
  ];
  data.cityEditorialPageData["Paris, France"] = {
    ...data.cityEditorialPageData["Paris, France"],
    dek: "Choose the museum or monument you most want to see, check its closed day and booking rules, and build the rest of the day around a meal nearby.",
    intro: [
      "Start with the sight that matters most to you. The Eiffel Tower publishes its opening hours a few days at a time and can restrict access to the top in bad weather. The Louvre is closed on Tuesdays and requires a timed reservation for every visitor from 17 October to 1 November 2026. Musée d'Orsay closes on Mondays and stays open late on Thursdays. Sainte-Chapelle keeps shorter winter hours from October to March. For a smaller museum, Musée de l'Orangerie recommends booking a time slot, and Musée Rodin on rue de Varenne closes on Mondays.",
      "The Arc de Triomphe's lift is out of service until further notice, so reaching the terrace means 284 steps. Palais Garnier sells visit tickets online only, and rehearsals can close the auditorium at short notice. For free time outdoors, the Jardin du Luxembourg changes its gate times twice a month to follow daylight. Sacré-Cœur Basilica is open every day with free entry, although it is an active church. Galerie Vivienne is a covered passage you can walk through for free; its shops keep their own hours. The Marché aux Puces de Saint-Ouen is a weekend and Monday outing, with stalls setting their own hours.",
      "With children, compare the Jardin d'Acclimatation in the Bois de Boulogne with the Cité des sciences et de l'industrie. Many of the garden's attractions pause at midday outside school holidays, and the science museum closes on Mondays outside the autumn holidays.",
      "For meals, Septime serves tasting menus at lunch and dinner on weekdays and opens bookings 21 days ahead. Clamato, next door, takes no reservations. Frenchie on rue du Nil serves a set dinner only, and Bistrot Paul Bert takes bookings by phone and closes on Sundays and Mondays. Le Jules Verne, on the Eiffel Tower's second floor, requires a jacket for men. For breakfast, Holybelly serves food until 4 PM and closes for some holidays; Breizh Café's Marais branch opens at 9 AM. Du Pain et des Idées closes at weekends and Poilâne's original shop closes on Sundays. In the evening, Little Red Door welcomes walk-ins and Bar Hemingway at the Ritz needs no booking."
    ],
    summaryCards: [
      ["First visit", "Pair one big museum or monument with a nearby meal, rather than crossing the city between bookings."],
      ["A slower morning", "Start with a bakery or café, then a garden or a smaller museum like Musée Rodin."],
      ["Before booking", "Check closed days, timed-entry rules, dress codes and whether the restaurant takes reservations."]
    ],
    trust: "All 28 distinct recommendations in this guide were checked against their operators' own websites on October 14, 2026. Sites that refused automated reading were read in a browser. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
  };

  // London: source review approved October 14, 2026 (docs/content-research/london-2026-10-14.md).
  data.cityGuideDetailData["London, United Kingdom"] = {
    bestAttractions: ["Tower of London", "National Gallery", "Westminster Abbey", "St Paul's Cathedral"],
    bestFirstTimers: ["Tower of London", "Tower Bridge", "Covent Garden (Market Building and Piazza)"],
    bestRestaurants: ["Dishoom (Covent Garden)", "The Barbary (Neal's Yard)", "Rules"],
    bestBudget: ["National Gallery", "Tate Modern", "Sky Garden"],
    bestLuxury: ["Core by Clare Smyth", "Afternoon Tea at Claridge's", "Connaught Bar"],
    bestCouples: ["Sky Garden", "The Barbary (Neal's Yard)", "Connaught Bar"],
    bestKids: ["Natural History Museum", "Science Museum", "V&A South Kensington"],
    bestSolo: ["Tate Modern", "V&A South Kensington", "Prufrock Coffee (Leather Lane)"],
    bestUnique: ["Leadenhall Market", "Sky Garden", "Borough Market"],
    bestBreakfast: ["Dishoom (Covent Garden)", "The Breakfast Club (Soho)", "Granger & Co. (Notting Hill)"],
    bestLunch: ["Padella (Borough Market)", "Borough Market", "Flat Iron (Covent Garden)"],
    bestDinner: ["Dishoom (Covent Garden)", "Rules", "Core by Clare Smyth"],
    bestCocktails: ["Connaught Bar", "Swift Soho"],
    bestBakeries: ["Jolene (Newington Green)", "Pophams (Islington)", "Eric's Bakery (East Dulwich)"],
    bestCoffee: ["Monmouth Coffee (Borough)", "Kiss the Hippo (Fitzrovia)", "Prufrock Coffee (Leather Lane)"]
  };
  data.cityPlaceQueries["London, United Kingdom"] = {
    "Tower of London": "Tower of London EC3N 4AB",
    "Tower Bridge": "Tower Bridge London",
    "Westminster Abbey": "Westminster Abbey London SW1P 3PA",
    "National Gallery": "National Gallery Trafalgar Square London",
    "Tate Modern": "Tate Modern Bankside London",
    "St Paul's Cathedral": "St Paul's Cathedral London EC4M 8AD",
    "V&A South Kensington": "V&A Cromwell Road London",
    "Natural History Museum": "Natural History Museum Cromwell Road London",
    "Science Museum": "Science Museum Exhibition Road London",
    "Sky Garden": "Sky Garden 1 Sky Garden Walk London",
    "Leadenhall Market": "Leadenhall Market Gracechurch Street London",
    "Covent Garden (Market Building and Piazza)": "Covent Garden Market Building London",
    "Borough Market": "Borough Market 8 Southwark Street London",
    "Dishoom (Covent Garden)": "Dishoom 12 Upper St Martin's Lane London",
    "The Barbary (Neal's Yard)": "The Barbary 16 Neal's Yard London",
    "Rules": "Rules 34-35 Maiden Lane London",
    "Afternoon Tea at Claridge's": "Claridge's Brook Street London",
    "Core by Clare Smyth": "Core by Clare Smyth 92 Kensington Park Road London",
    "Padella (Borough Market)": "Padella 6 Southwark Street London",
    "Flat Iron (Covent Garden)": "Flat Iron 17 Henrietta Street London",
    "Connaught Bar": "Connaught Bar Carlos Place London",
    "Swift Soho": "Swift 12 Old Compton Street London",
    "The Breakfast Club (Soho)": "The Breakfast Club 33 D'Arblay Street London",
    "Granger & Co. (Notting Hill)": "Granger & Co 175 Westbourne Grove London",
    "Jolene (Newington Green)": "Jolene 21 Newington Green London",
    "Pophams (Islington)": "Pophams 19 Prebend Street London",
    "Eric's Bakery (East Dulwich)": "Eric's Bakery 20 Upland Road London",
    "Monmouth Coffee (Borough)": "Monmouth Coffee 2 Park Street London",
    "Kiss the Hippo (Fitzrovia)": "Kiss the Hippo 51 Margaret Street London",
    "Prufrock Coffee (Leather Lane)": "Prufrock Coffee 23 Leather Lane London"
  };
  const london = data.cityGuideData.find((guide) => guide.city === "London, United Kingdom");
  london.summary = "Palaces, galleries and markets, with breakfast spots, dinners and cocktail bars checked against their own websites.";
  london.highlights = ["Tower of London", "National Gallery", "Westminster Abbey", "Tower Bridge"];
  london.tip = "Pick one big sight per half day, check whether it opens on Sundays and whether it needs a timed ticket, then plan a meal nearby.";
  data.destinationFacts["London, United Kingdom"] = london.tip;
  data.destinationHeroData["London, United Kingdom"].copy = london.summary;
  data.cityPlanningToolkitData["London, United Kingdom"] = [
    { label: "Sundays", value: "Churches are for worship", copy: "Westminster Abbey and St Paul's Cathedral offer no sightseeing on Sundays. Borough Market closes on Mondays until 30 November, and Monmouth's Borough shop closes on Sundays." },
    { label: "Free tickets", value: "Free does not mean walk-in", copy: "Sky Garden needs a free timed ticket, released each Monday three weeks ahead. The Science Museum asks visitors to pre-book free tickets and is closed all day on 11 November 2026." },
    { label: "Walk-in", value: "Queues instead of bookings", copy: "Padella runs a virtual queue, the Connaught Bar takes no reservations, and Dishoom books evening tables only for groups of six or more." },
    { label: "Before you go", value: "Bags, rooms and age rules", copy: "Tate Modern and St Paul's don't allow large bags. Several National Gallery rooms are closed for building work. Rules does not admit children under 10 after 7 PM." }
  ];
  data.cityEditorialPageData["London, United Kingdom"] = {
    ...data.cityEditorialPageData["London, United Kingdom"],
    dek: "Choose the palace, gallery or market you most want to see, check its Sunday and ticket rules, and build the day around a meal nearby.",
    intro: [
      "Start with the sight you care about most. The Tower of London publishes its opening times one day at a time, with last entry an hour before closing, so check the day you plan to go. Tower Bridge opens daily and closes from 24 to 26 December. Westminster Abbey and St Paul's Cathedral are working churches: neither offers sightseeing on Sundays, and both can close at short notice for services.",
      "London's big galleries and museums are free to enter, but not always walk-in. The National Gallery is open daily, until 9 PM on Fridays, although several rooms are closed for building work. Tate Modern stays open late on Fridays and Saturdays and doesn't allow large bags. In South Kensington, the V&A, the Natural History Museum and the Science Museum sit close together. The Science Museum asks for a free pre-booked ticket and closes all day on 11 November 2026.",
      "For a view, Sky Garden needs a free timed ticket released each Monday, and its capacity is currently reduced while a lift is out of service. Leadenhall Market's covered passages are open at all hours, although its shops keep City hours. Covent Garden's Piazza and Market Building are always open. Borough Market trades from Tuesday to Sunday, adding Mondays from 30 November.",
      "Dishoom's Covent Garden café serves breakfast from 8 AM on weekdays, and The Breakfast Club's original Soho café closes at 3 PM on weekdays. At Borough Market, Padella runs a virtual queue instead of taking bookings. Rules on Maiden Lane is open seven days and does not admit children under 10 after 7 PM. Core by Clare Smyth in Notting Hill serves dinner Tuesday to Saturday. Claridge's serves a Festive Afternoon Tea from 3 November. In the evening, the Connaught Bar takes no reservations and Swift Soho accepts walk-ins."
    ],
    summaryCards: [
      ["First visit", "Pair one big sight with a meal nearby: the Tower and Tower Bridge, or Westminster Abbey and Trafalgar Square's National Gallery."],
      ["A slower morning", "Start with coffee at Monmouth or Prufrock, then one gallery rather than three."],
      ["Before booking", "Check Sunday closures, free timed tickets, bag rules and whether the restaurant takes reservations."]
    ],
    trust: "All 30 distinct recommendations in this guide were checked against their operators' own websites on October 14, 2026. Sites that refused automated reading were read in a browser. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
  };
  // Amsterdam, Netherlands: source review of 2026-10-21 (docs/content-research/amsterdam-2026-10-21.md).
  {
    const cityKey = "Amsterdam, Netherlands";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Rijksmuseum","Royal Palace Amsterdam","Oude Kerk","A'DAM Lookout"],
      bestFirstTimers: ["Rijksmuseum","Anne Frank House","Royal Palace Amsterdam","Stedelijk Museum"],
      bestRestaurants: ["Cafe de Klepel","Foodhallen","Bakers & Roasters (Kadijksplein)"],
      bestBudget: ["Fabel Friet (Runstraat)","Foodhallen","Vlaamsch Broodhuys (Haarlemmerstraat)","Bocca Coffee (Kerkstraat)"],
      bestLuxury: ["A'DAM Lookout","Super Lyan","Cafe de Klepel"],
      bestCouples: ["Cafe de Klepel","Super Lyan","A'DAM Lookout","Eye Filmmuseum"],
      bestKids: ["NEMO Science Museum","ARTIS","Het Scheepvaartmuseum"],
      bestSolo: ["Eye Filmmuseum","Stedelijk Museum","Rembrandt House Museum","Bocca Coffee (Kerkstraat)"],
      bestUnique: ["Oude Kerk","Eye Filmmuseum","A'DAM Lookout","Hartog's Volkoren"],
      bestBreakfast: ["Bakers & Roasters (De Pijp)","Little Collins","De Wasserette","Bakers & Roasters (Kadijksplein)"],
      bestLunch: ["Foodhallen","Fabel Friet (Runstraat)","De Wasserette","Little Collins"],
      bestDinner: ["Cafe de Klepel","Foodhallen"],
      bestCocktails: ["Super Lyan"],
      bestBakeries: ["Vlaamsch Broodhuys (Haarlemmerstraat)","Hartog's Volkoren"],
      bestCoffee: ["Bocca Coffee (Kerkstraat)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Rijksmuseum": "Rijksmuseum Museumstraat 1 Amsterdam",
      "Royal Palace Amsterdam": "Royal Palace Amsterdam Dam Square Amsterdam",
      "Oude Kerk": "Oude Kerk Oudekerksplein 23 Amsterdam",
      "A'DAM Lookout": "A'DAM Lookout IJpromenade 4 Amsterdam",
      "Anne Frank House": "Anne Frank House Westermarkt 20 Amsterdam",
      "Stedelijk Museum": "Stedelijk Museum Museumplein 10 Amsterdam",
      "Cafe de Klepel": "Cafe de Klepel Prinsenstraat 22 Amsterdam",
      "Foodhallen": "Foodhallen Hannie Dankbaarpassage 16 Amsterdam",
      "Bakers & Roasters (Kadijksplein)": "Bakers & Roasters Kadijksplein 16 Amsterdam",
      "Fabel Friet (Runstraat)": "Fabel Friet Runstraat 1 Amsterdam",
      "Vlaamsch Broodhuys (Haarlemmerstraat)": "Vlaamsch Broodhuys Haarlemmerstraat 108 Amsterdam",
      "Bocca Coffee (Kerkstraat)": "Bocca Coffee Kerkstraat 96 Amsterdam",
      "Super Lyan": "Super Lyan Nieuwezijds Voorburgwal 3 Amsterdam",
      "Eye Filmmuseum": "Eye Filmmuseum IJpromenade 1 Amsterdam",
      "NEMO Science Museum": "NEMO Science Museum Oosterdok 2 Amsterdam",
      "ARTIS": "ARTIS Plantage Kerklaan 38 Amsterdam",
      "Het Scheepvaartmuseum": "Het Scheepvaartmuseum Kattenburgerplein 1 Amsterdam",
      "Rembrandt House Museum": "Rembrandt House Museum Jodenbreestraat 4 Amsterdam",
      "Hartog's Volkoren": "Hartog's Volkoren Wibautstraat 77 Amsterdam",
      "Bakers & Roasters (De Pijp)": "Bakers & Roasters Eerste Jacob van Campenstraat 54 Amsterdam",
      "Little Collins": "Little Collins Eerste Sweelinckstraat 19f Amsterdam",
      "De Wasserette": "De Wasserette Eerste van der Helststraat 27 Amsterdam"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Museums, a royal palace, a medieval church and a riverside lookout, with breakfast cafés, bakeries, a food hall, dinners and a cocktail bar checked against their own websites.";
      cityGuide.highlights = ["Rijksmuseum","Anne Frank House","Royal Palace Amsterdam","Stedelijk Museum"];
      cityGuide.tip = "Book the Anne Frank House early: tickets are sold only online for a set time slot, released every Tuesday at 10am for visits six weeks later, and none are sold at the door.";
    }
    data.destinationFacts[cityKey] = "Book the Anne Frank House early: tickets are sold only online for a set time slot, released every Tuesday at 10am for visits six weeks later, and none are sold at the door.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, a royal palace, a medieval church and a riverside lookout, with breakfast cafés, bakeries, a food hall, dinners and a cocktail bar checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Check Mondays and holidays",
        "copy": "Eye Filmmuseum's exhibition is closed on Mondays outside school holidays, and NEMO Science Museum opens only on listed Mondays such as 26 October and 2 November 2026. Hartog's Volkoren is closed on Sundays, and the Oude Kerk is temporarily closed 9-12 November."
      },
      {
        "label": "Tickets and booking",
        "value": "Timed slots are common",
        "copy": "The Rijksmuseum requires a booked start time, including for Museumkaart holders, and NEMO tickets also have a start time. Anne Frank House tickets are online only and cannot be exchanged or refunded."
      },
      {
        "label": "Walk-in or queue",
        "value": "Many cafés don't book",
        "copy": "Little Collins is walk-in only, De Wasserette says reservations are not necessary, and Bakers & Roasters works mainly walk-in with a virtual waitlist (limited reservations at Kadijksplein only). Super Lyan takes no reservations except for groups of more than 8."
      },
      {
        "label": "Bags and payment",
        "value": "Travel light",
        "copy": "The Stedelijk Museum does not allow backpacks or weekend cases in the galleries, and the Royal Palace allows only small bags up to 30x30x15 cm. Eye Filmmuseum and the Anne Frank House take card payments only."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book your timed museum slots first, then build mornings around the walk-in brunch cafés and evenings around a reserved dinner.",
      intro: [
        "Amsterdam's headline museums run on timed entry, so plan those first. The Rijksmuseum on Museumstraat is open daily from 9 to 17h, including public holidays, and says booking a start time is required. Its current shows include Willem de Kooning at work, on until 17 January. The Anne Frank House at Westermarkt 20 sells tickets only online for a fixed slot, releasing them every Tuesday at 10am for visits six weeks ahead, so you should book as early as you can.",
        "On Museumplein, the Stedelijk Museum is open daily from 10am to 6pm, with last entry at 5.45pm. Yayoi Kusama runs from 11 September 2026 to 17 January 2027, alongside Adam Pendleton's Some Wild Kind of Language from 10 October. Leave your backpack behind, as backpacks are not allowed in the galleries. The Royal Palace on Dam Square is open to visitors from 1 October to 11 November, from 10am on calendar days, though it may close for royal events. Nearby, the Oude Kerk opens Mire Lee: Vomit My Blessing on 13 November.",
        "Across the IJ, Eye Filmmuseum shows an Ulrich Seidl exhibition from 19 September 2026 to 31 January 2027; its exhibition is closed on Mondays outside school holidays. Next door, A'DAM Lookout is open daily from 10:00 to 22:00, with last admission at 21:00, and knocks €2 off tickets when you book online. If you travel with children, NEMO Science Museum at Oosterdok 2 sells tickets with a start time and suggests weekdays after 14:00 as quieter. ARTIS has reopened its restored aquarium and offers a €15 weekday late-afternoon ticket from 16:00.",
        "For food, many places are walk-in. Little Collins in De Pijp serves brunch daily from 9 to 16, walk-in only, and De Wasserette opens daily from 7:30 to 17:00 without reservations. Bakers & Roasters runs two branches with a virtual waitlist. For dinner, Cafe de Klepel on Prinsenstraat takes bookings up to two months ahead, for tables of up to 8. Foodhallen is open daily from 12:00 to 23:00, and Super Lyan pours cocktails from 17:00 Wednesday to Sunday with no reservations for small groups."
      ],
      summaryCards: [
        [
          "First visit",
          "Book a Rijksmuseum start time and an online Anne Frank House slot, then add the Royal Palace on Dam Square while it is open until 11 November."
        ],
        [
          "A slower morning",
          "Walk in for brunch at Little Collins or De Wasserette, then pick up bread at Hartog's Volkoren on Wibautstraat, which is closed on Sundays."
        ],
        [
          "Before booking",
          "Check closing days: Eye's exhibition shuts on Mondays outside school holidays, NEMO opens only on listed Mondays, and the Oude Kerk closes 9-12 November."
        ]
      ],
      trust: "All 22 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // New York, United States: source review of 2026-10-21 (docs/content-research/new-york-2026-10-21.md).
  {
    const cityKey = "New York, United States";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Central Park","The High Line","Empire State Building","9/11 Memorial & Museum"],
      bestFirstTimers: ["Central Park","Empire State Building","Staten Island Ferry","9/11 Memorial & Museum"],
      bestRestaurants: ["Katz's Delicatessen","Crown Shy","L'Artusi","Via Carota"],
      bestBudget: ["Staten Island Ferry","The High Line","Smorgasburg (Williamsburg)","Roosevelt Island Tram"],
      bestLuxury: ["Crown Shy","Bemelmans Bar","The Frick Collection"],
      bestCouples: ["L'Artusi","Bemelmans Bar","Attaboy","The High Line"],
      bestKids: ["Central Park Zoo","Central Park","Staten Island Ferry","Roosevelt Island Tram"],
      bestSolo: ["Whitney Museum of American Art","The Frick Collection","Chelsea Market","Stumptown (Greenwich Village)"],
      bestUnique: ["Roosevelt Island Tram","Smorgasburg (Williamsburg)","Chelsea Market"],
      bestBreakfast: ["Russ & Daughters Cafe","Clinton St. Baking Company","Katz's Delicatessen"],
      bestLunch: ["Katz's Delicatessen","Russ & Daughters Cafe","Chelsea Market","Crown Shy"],
      bestDinner: ["Crown Shy","L'Artusi","Via Carota","Employees Only"],
      bestCocktails: ["Employees Only","Attaboy","Bemelmans Bar"],
      bestBakeries: ["Levain Bakery (West 74th Street)","Dominique Ansel Bakery (Spring Street)"],
      bestCoffee: ["La Cabra (SoHo)","Stumptown (Greenwich Village)","Devoción (Williamsburg)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Central Park": "Central Park Doris C. Freedman Plaza Fifth Avenue New York",
      "The High Line": "The High Line 30th Street Hudson Yards New York",
      "Empire State Building": "Empire State Building 12 W 34th Street New York",
      "9/11 Memorial & Museum": "9/11 Memorial & Museum 180 Greenwich Street New York",
      "Staten Island Ferry": "Staten Island Ferry Whitehall Terminal 4 South Street New York",
      "Katz's Delicatessen": "Katz's Delicatessen 205 East Houston Street New York",
      "Crown Shy": "Crown Shy 70 Pine St New York",
      "L'Artusi": "L'Artusi 228 West 10th Street New York",
      "Via Carota": "Via Carota 51 Grove Street New York",
      "Smorgasburg (Williamsburg)": "Smorgasburg 90 Kent Ave Brooklyn New York",
      "Roosevelt Island Tram": "Roosevelt Island Tram East 60th Street and Second Avenue New York",
      "Bemelmans Bar": "Bemelmans Bar 35 East 76th St New York",
      "The Frick Collection": "The Frick Collection 1 East 70th Street New York",
      "Attaboy": "Attaboy 134 Eldridge St New York",
      "Central Park Zoo": "Central Park Zoo 64th Street & 5th Avenue New York",
      "Whitney Museum of American Art": "Whitney Museum of American Art 99 Gansevoort Street New York",
      "Chelsea Market": "Chelsea Market 75 9th Ave New York",
      "Stumptown (Greenwich Village)": "Stumptown Coffee 30 W 8th Street New York",
      "Russ & Daughters Cafe": "Russ & Daughters Cafe 127 Orchard Street New York",
      "Clinton St. Baking Company": "Clinton St. Baking Company 4 Clinton Street New York",
      "Employees Only": "Employees Only 510 Hudson Street New York",
      "Levain Bakery (West 74th Street)": "Levain Bakery 167 West 74th St New York",
      "Dominique Ansel Bakery (Spring Street)": "Dominique Ansel Bakery 189 Spring St New York",
      "La Cabra (SoHo)": "La Cabra 284 Lafayette St New York",
      "Devoción (Williamsburg)": "Devoción 148 Grand St Brooklyn New York"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Parks, a free ferry, the tram, observation decks and museums, with breakfast spots, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
      cityGuide.highlights = ["Central Park","Empire State Building","9/11 Memorial & Museum","The High Line"];
      cityGuide.tip = "Plan museum days around Tuesdays, when the Whitney and the Frick are both closed, and book the Empire State Building ahead because every visit needs a timed reservation.";
    }
    data.destinationFacts[cityKey] = "Plan museum days around Tuesdays, when the Whitney and the Frick are both closed, and book the Empire State Building ahead because every visit needs a timed reservation.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Parks, a free ferry, the tram, observation decks and museums, with breakfast spots, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Tuesdays",
        "copy": "The Whitney Museum of American Art and The Frick Collection are both closed on Tuesdays. The 9/11 Museum opens Wednesday to Monday with select Tuesdays, while the Memorial is open daily 8 a.m.-8 p.m."
      },
      {
        "label": "Timed tickets",
        "value": "Book ahead",
        "copy": "All Empire State Building visits require a timed reservation, with 86th-floor tickets from $46, and the 9/11 Museum requires advance ticket purchase. The Frick recommends timed tickets, and last tickets are sold one hour before closing."
      },
      {
        "label": "Walk-ins and tables",
        "value": "Know the policy",
        "copy": "Russ & Daughters Cafe takes no reservations, and Via Carota says walk-ins are always welcome. L'Artusi releases Resy tables two weeks ahead at 9 AM, and at Employees Only cocktails are walk-in only while the dining room needs a dinner reservation."
      },
      {
        "label": "Rules",
        "value": "Age, ID, dress",
        "copy": "Attaboy is 21+, needs a valid physical government-issued ID and takes parties of six and under. The Frick admits only children aged 10 and older, and Bemelmans Bar discourages athletic and casual leisure wear."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Spend your mornings at the parks and museums, book timed tickets and dinner tables ahead, and leave the walk-in cafés and bars for when you have time to wait.",
      intro: [
        "Start outdoors. According to the Central Park Conservancy, Central Park opens at 6:00 am and closes at 1:00 am, 365 days a year. The Central Park Zoo entrance is at 64th Street and 5th Avenue, and the zoo is open 10:00 AM to 5:00 PM on weekdays through October 31, 2026, then 10:00 AM to 4:30 PM daily from November 1. The High Line is open 7am to 10pm until November 30, then 7am to 8pm.",
        "For harbor and skyline views, the Staten Island Ferry is free and runs around the clock from Whitehall Terminal at 4 South Street. The City warns you about scammers selling fake tickets. The 9/11 Memorial at 180 Greenwich Street is free and open daily 8 a.m.-8 p.m. The Museum requires advance tickets and is open Wednesday to Monday. Every Empire State Building visit needs a timed reservation, with 86th-floor tickets from $46. The Roosevelt Island Tram leaves from East 60th Street and Second Avenue and takes standard MTA fares, including OMNY.",
        "Tuesday is the closing day at both the Whitney Museum of American Art on Gansevoort Street and The Frick Collection at 1 East 70th Street. The Whitney stays open until 10 pm on Fridays, with Free Friday Nights from 5 to 10 pm, and its current shows include Roy Lichtenstein: Like New. The Frick recommends timed tickets, admits only children aged 10 and older, and has Pay-What-You-Wish admission on Wednesdays from 1:30 to 5:30 p.m. At Chelsea Market, 75 9th Ave, the concourse is open 7 am to 10 pm, and trick-or-treating is scheduled for October 31, 2026.",
        "For food, Russ & Daughters Cafe at 127 Orchard Street is walk-in only with no takeout. Via Carota on Grove Street welcomes walk-ins, and L'Artusi releases Resy tables two weeks ahead at 9 AM, keeping bar and counter seats for walk-ins. Katz's Delicatessen at 205 East Houston Street opens at 8:00 AM. For drinks, Attaboy on Eldridge Street is 21+, takes parties of six and under, and asks for a physical ID. Bemelmans Bar at The Carlyle has pianists from 5:30 pm and a jazz trio from 9 pm, with a cover charge that depends on the artist."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair a free Staten Island Ferry ride with the 9/11 Memorial and a timed Empire State Building slot, then walk Central Park, which is open 6:00 am to 1:00 am."
        ],
        [
          "A slower morning",
          "Take a walk-in table at Russ & Daughters Cafe from 8:30 AM, then pick up coffee at Stumptown on West 8th Street before the High Line opens its gates at 7am."
        ],
        [
          "Before booking",
          "Check that your museum day isn't a Tuesday, book L'Artusi on Resy when tables release at 9 AM two weeks out, and bring physical ID if you plan to go to Attaboy."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Tokyo, Japan: source review of 2026-10-21 (docs/content-research/tokyo-2026-10-21.md).
  {
    const cityKey = "Tokyo, Japan";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Senso-ji","Meiji Jingu","Tokyo Skytree","Tokyo National Museum"],
      bestFirstTimers: ["Senso-ji","Meiji Jingu","Imperial Palace East Gardens","Tokyo Metropolitan Government Building Observation Decks"],
      bestRestaurants: ["Narisawa","Gonpachi (Nishi-Azabu)","Udon Shin"],
      bestBudget: ["Tokyo Metropolitan Government Building Observation Decks","Imperial Palace East Gardens"],
      bestLuxury: ["Narisawa","The SG Club"],
      bestCouples: ["Tokyo City View","Tokyo Skytree","Bar High Five"],
      bestKids: ["Ueno Zoo","Tokyo National Museum","Tokyo Skytree"],
      bestSolo: ["Glitch Coffee (Jimbocho)","AFURI (Ebisu)","Mori Art Museum"],
      bestUnique: ["Mori Art Museum","Shinjuku Gyoen National Garden","Udon Shin"],
      bestBreakfast: ["Ivy Place","Fuglen Tokyo (Tomigaya)","Glitch Coffee (Jimbocho)"],
      bestLunch: ["AFURI (Ebisu)","Udon Shin","Gonpachi (Nishi-Azabu)","Ivy Place"],
      bestDinner: ["Narisawa","Gonpachi (Nishi-Azabu)","Ivy Place"],
      bestCocktails: ["Bar High Five","The SG Club","Fuglen Tokyo (Tomigaya)"],
      bestBakeries: [],
      bestCoffee: ["Glitch Coffee (Jimbocho)","Fuglen Tokyo (Tomigaya)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Senso-ji": "Senso-ji 2-3-1 Asakusa Taito-ku Tokyo",
      "Meiji Jingu": "Meiji Jingu 1-1 Yoyogi Kamizono-cho Shibuya-ku Tokyo",
      "Tokyo Skytree": "Tokyo Skytree 1-1-2 Oshiage Sumida-ku Tokyo",
      "Tokyo National Museum": "Tokyo National Museum 13-9 Ueno Park Taito-ku Tokyo",
      "Imperial Palace East Gardens": "Imperial Palace East Gardens 1 Chiyoda Chiyoda-ku Tokyo",
      "Tokyo Metropolitan Government Building Observation Decks": "Tokyo Metropolitan Government Building 2-8-1 Nishi-Shinjuku Shinjuku-ku Tokyo",
      "Narisawa": "Narisawa 2-6-15 Minami-Aoyama Minato-ku Tokyo",
      "Gonpachi (Nishi-Azabu)": "Gonpachi Nishi-Azabu 1-13-11 Nishi-Azabu Minato-ku Tokyo",
      "Udon Shin": "Udon Shin 2-20-16 Yoyogi Shibuya-ku Tokyo",
      "The SG Club": "The SG Club 1-7-8 Jinnan Shibuya-ku Tokyo",
      "Tokyo City View": "Tokyo City View 6-10-1 Roppongi Minato-ku Tokyo",
      "Bar High Five": "Bar High Five 5-4-15 Ginza Chuo-ku Tokyo",
      "Ueno Zoo": "Ueno Zoo 9-83 Uenokoen Taito-ku Tokyo",
      "Glitch Coffee (Jimbocho)": "Glitch Coffee 3-16 Kanda-Nishikicho Chiyoda-ku Tokyo",
      "AFURI (Ebisu)": "AFURI Ebisu 1-1-7 Ebisu Shibuya-ku Tokyo",
      "Mori Art Museum": "Mori Art Museum 6-10-1 Roppongi Minato-ku Tokyo",
      "Shinjuku Gyoen National Garden": "Shinjuku Gyoen National Garden 11 Naitomachi Shinjuku-ku Tokyo",
      "Ivy Place": "Ivy Place 16-15 Sarugakucho Shibuya-ku Tokyo",
      "Fuglen Tokyo (Tomigaya)": "Fuglen Tokyo 1-16-11 Tomigaya Shibuya-ku Tokyo"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Temples, shrines, museums, observation decks and gardens, plus breakfast cafés, noodle lunches, dinners and cocktail bars, each checked against its own or its public operator's website.";
      cityGuide.highlights = ["Senso-ji","Meiji Jingu","Tokyo National Museum","Tokyo Skytree"];
      cityGuide.tip = "Watch the closing days: the Tokyo National Museum closes on Mondays, the Imperial Palace East Gardens on Mondays and Fridays, and Bar High Five on Sundays and national holidays.";
    }
    data.destinationFacts[cityKey] = "Watch the closing days: the Tokyo National Museum closes on Mondays, the Imperial Palace East Gardens on Mondays and Fridays, and Bar High Five on Sundays and national holidays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Temples, shrines, museums, observation decks and gardens, plus breakfast cafés, noodle lunches, dinners and cocktail bars, each checked against its own or its public operator's website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon / Fri closures",
        "copy": "The Tokyo National Museum and Shinjuku Gyoen National Garden close on Mondays (the next weekday if Monday is a holiday). The Imperial Palace East Gardens close every Monday and Friday."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead online",
        "copy": "Narisawa takes reservations only through its online booking site, not by phone. The Tokyo National Museum recommends buying tickets online because waits at its security screening can exceed 30 minutes."
      },
      {
        "label": "Walk-in policies",
        "value": "No reservations",
        "copy": "Bar High Five has taken no reservations since May 2015 and admits its last guests at 00:00, Monday to Saturday. At Udon Shin noodles are made to order, so expect a 10 to 15 minute wait after you order."
      },
      {
        "label": "Bags and rules",
        "value": "No suitcases",
        "copy": "The Tokyo National Museum does not allow suitcases and screens visitors at the Main Gate. AFURI (Ebisu) is marked fully cashless, so bring a card."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Do the early-closing sights first: Senso-ji's main hall shuts at 5pm and Meiji Jingu's gates close in late afternoon, while observation decks and bars run late.",
      intro: [
        "You can start early at Senso-ji in Asakusa: from October to March its main hall opens at 6:30 a.m. and closes at 5:00 p.m. Meiji Jingu's gate hours follow the sun, 5:40 a.m. to 4:40 p.m. in October and 6:10 a.m. to 4:10 p.m. in November, so a morning visit leaves time for more. The Imperial Palace East Gardens are free, but they close every Monday and Friday, and from November the last entry is 3:30 p.m.",
        "In Ueno, the Tokyo National Museum is showing the special exhibition Hiroshige: New Perspectives on Edo Japan from September 29 to December 20, 2026. It opens 9:30 to 17:00 and is closed on Mondays. Admission to the collection is free if you are under 18 or over 70. Suitcases are not allowed, and the museum suggests buying tickets online because queues at its security screening can run past 30 minutes. Next door, Ueno Zoo has posted partial path closures from October 26 to November 16.",
        "For views, Tokyo Skytree lists hours of 10:00 to 22:00 with final entry at 21:00, and its Dream Christmas event runs November 5 to December 25. The Tokyo Metropolitan Government Building's observation decks are free: the south deck admits visitors until 21:30 but closes on the first and third Tuesdays of the month. In Roppongi, the Mori Art Museum reopens on October 31 with Mariko Mori: All That Shines, which runs to March 28, 2027. Tokyo City View, one floor below, is closed October 27 and November 10 to 12.",
        "For food, Ivy Place in Daikanyama serves breakfast from 8:00, and Fuglen Tokyo in Tomigaya opens at 7am. At lunch you can choose AFURI (Ebisu), which is cashless, or Udon Shin in Yoyogi, where every bowl is cut and boiled to order. Gonpachi (Nishi-Azabu) is open daily until 27:30, and Narisawa accepts bookings online only. To end the night, Bar High Five in Ginza is open Monday to Saturday from 17:00 and does not take reservations."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Senso-ji's early main-hall opening with the Tokyo National Museum's Hiroshige exhibition, which runs to December 20, 2026, remembering the museum closes on Mondays."
        ],
        [
          "A slower morning",
          "Have breakfast at Ivy Place from 8:00 or Fuglen Tokyo (Tomigaya) from 7am, then walk to Meiji Jingu before its gates close in the late afternoon."
        ],
        [
          "Before booking",
          "Book Narisawa through its online reservation site, because it takes no phone bookings, and note that Bar High Five takes no reservations at all."
        ]
      ],
      trust: "All 19 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Barcelona, Spain: source review of 2026-10-21 (docs/content-research/barcelona-2026-10-21.md).
  {
    const cityKey = "Barcelona, Spain";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Sagrada Família","Park Güell","Casa Batlló","La Pedrera-Casa Milà"],
      bestFirstTimers: ["Sagrada Família","Barcelona Cathedral","Museu Picasso","Park Güell"],
      bestRestaurants: ["Disfrutar","El Xampanyet","Can Fisher"],
      bestBudget: ["Bunkers del Carmel (MUHBA Turó de la Rovira)","Museu Nacional d'Art de Catalunya (MNAC)","Mercat de Santa Caterina"],
      bestLuxury: ["Disfrutar","Casa Batlló","Palau de la Música Catalana"],
      bestCouples: ["Paradiso","La Pedrera-Casa Milà","Palau de la Música Catalana","Bunkers del Carmel (MUHBA Turó de la Rovira)"],
      bestKids: ["L'Aquàrium de Barcelona","Park Güell"],
      bestSolo: ["Museu Picasso","Museu Nacional d'Art de Catalunya (MNAC)","Hidden Coffee Roasters (El Born)","Nomad Coffee Bar (Passatge Sert)"],
      bestUnique: ["Bunkers del Carmel (MUHBA Turó de la Rovira)","Palau de la Música Catalana","Paradiso"],
      bestBreakfast: ["Brunch & Cake (Enric Granados)","Federal Café (Gòtic)","Petit Nomad (Nomad Coffee, Bergara)"],
      bestLunch: ["El Xampanyet","Can Fisher","Mercat de Santa Caterina"],
      bestDinner: ["Disfrutar","Can Fisher","El Xampanyet"],
      bestCocktails: ["Paradiso"],
      bestBakeries: ["Hofmann Pastelería (Born)"],
      bestCoffee: ["Petit Nomad (Nomad Coffee, Bergara)","Nomad Coffee Bar (Passatge Sert)","Hidden Coffee Roasters (El Born)","Three Marks Coffee (Ausiàs Marc)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Sagrada Família": "Sagrada Família Carrer de Mallorca 401 Barcelona",
      "Park Güell": "Park Güell Avinguda del Santuari de Sant Josep de la Muntanya Barcelona",
      "Casa Batlló": "Casa Batlló Passeig de Gràcia 43 Barcelona",
      "La Pedrera-Casa Milà": "La Pedrera-Casa Milà Passeig de Gràcia 92 Barcelona",
      "Barcelona Cathedral": "Barcelona Cathedral Pla de la Seu Barcelona",
      "Museu Picasso": "Museu Picasso Carrer de Montcada 15-23 Barcelona",
      "Disfrutar": "Disfrutar Carrer de Villarroel 163 Barcelona",
      "El Xampanyet": "El Xampanyet Carrer de Montcada 22 Barcelona",
      "Can Fisher": "Can Fisher Avinguda del Litoral 64 Barcelona",
      "Bunkers del Carmel (MUHBA Turó de la Rovira)": "MUHBA Turó de la Rovira Carrer de Marià Labèrnia Barcelona",
      "Museu Nacional d'Art de Catalunya (MNAC)": "Museu Nacional d'Art de Catalunya Palau Nacional Parc de Montjuïc Barcelona",
      "Mercat de Santa Caterina": "Mercat de Santa Caterina Avinguda de Francesc Cambó 16 Barcelona",
      "Palau de la Música Catalana": "Palau de la Música Catalana Carrer del Palau de la Música 4-6 Barcelona",
      "Paradiso": "Paradiso Carrer de Rera Palau 4 Barcelona",
      "L'Aquàrium de Barcelona": "L'Aquàrium de Barcelona Moll d'Espanya del Port Vell Barcelona",
      "Hidden Coffee Roasters (El Born)": "Hidden Coffee Roasters Carrer dels Canvis Vells 10 Barcelona",
      "Nomad Coffee Bar (Passatge Sert)": "Nomad Coffee Passatge Sert 12 Barcelona",
      "Brunch & Cake (Enric Granados)": "Brunch & Cake Carrer d'Enric Granados 19 Barcelona",
      "Federal Café (Gòtic)": "Federal Café Passatge de la Pau 11 Barcelona",
      "Petit Nomad (Nomad Coffee, Bergara)": "Petit Nomad Carrer de Bergara 10 Barcelona",
      "Hofmann Pastelería (Born)": "Hofmann Pastelería Carrer dels Flassaders 44 Barcelona",
      "Three Marks Coffee (Ausiàs Marc)": "Three Marks Coffee Carrer d'Ausiàs Marc 151 Barcelona"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Gaudí landmarks, the cathedral, Picasso and Catalan art museums, a market, tapas bars, seafront rice, a cocktail bar, a pastry shop and specialty coffee, each checked against its own website.";
      cityGuide.highlights = ["Sagrada Família","Park Güell","Casa Batlló","Museu Picasso"];
      cityGuide.tip = "Park Güell tickets must be bought in advance online and hold for 30 minutes after your slot, while Museu Picasso and MNAC publish no Monday opening, so put the museums on other days.";
    }
    data.destinationFacts[cityKey] = "Park Güell tickets must be bought in advance online and hold for 30 minutes after your slot, while Museu Picasso and MNAC publish no Monday opening, so put the museums on other days.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Gaudí landmarks, the cathedral, Picasso and Catalan art museums, a market, tapas bars, seafront rice, a cocktail bar, a pastry shop and specialty coffee, each checked against its own website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Sundays",
        "copy": "Museu Picasso lists hours only Tuesday to Sunday, and MNAC is closed on Mondays except public holidays. El Xampanyet is closed on Sundays and opens only in the evening on Mondays."
      },
      {
        "label": "Tickets",
        "value": "Book ahead",
        "copy": "Park Güell tickets must be bought in advance and online, and entry is allowed up to 30 minutes after your slot. Palau de la Música Catalana tours cost €2 more at the box office than online."
      },
      {
        "label": "Walk-in only",
        "value": "No reservations",
        "copy": "Paradiso takes no advance reservations and runs a virtual queue you join by scanning a QR code at the door. El Xampanyet also states that it does not accept reservations."
      },
      {
        "label": "Free and late",
        "value": "Timing tricks",
        "copy": "MNAC is free on Saturdays from 3pm and the first Sunday of the month, with an advance online reservation. Casa Batlló is open every day until 10:30pm, and La Pedrera runs night visits."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book Gaudí sites and Park Güell before you fly, then leave mornings for coffee and the old town and evenings for walk-in tapas and cocktails.",
      intro: [
        "You can build a first Barcelona trip around Gaudí. Sagrada Família is open in October from 9am to 7pm on weekdays, 9am to 6pm on Saturdays and 10:30am to 7pm on Sundays, with shorter hours from November to February. Individual visitors enter on the Nativity façade, on Carrer de la Marina. Park Güell sells tickets online and in advance only, for visits between 9:30am and 7:30pm, and your entry holds for 30 minutes after the time on your ticket.",
        "On Passeig de Gràcia, Casa Batlló opens every day from 9am to 10:30pm. Its 2026 programme includes Magical Nights concerts and the exhibition Gaudí-Miró-Gomis: Deconstructed. Further up the avenue, La Pedrera-Casa Milà keeps summer hours of 9am to 8:30pm until 1 November 2026, then 9am to 6:30pm from 2 November. It closes on 25 December 2026 and from 11 to 17 January 2027, and its rooftop shuts when it rains.",
        "In the old town, Barcelona Cathedral receives tourist visits on weekdays from 9:30am to 6:30pm, and only from 2pm to 5pm on Sundays. Museu Picasso on Carrer de Montcada opens Tuesday to Sunday, 10am to 7pm, in winter, and its exhibition Picasso and Architecture runs from 20 November 2026 to 7 March 2027. On Montjuïc, MNAC is free on Saturdays from 3pm and on the first Sunday of each month if you reserve online. Palau de la Música Catalana runs 50-minute guided tours between 9am and 3:30pm.",
        "For food, El Xampanyet on Carrer de Montcada takes no reservations and closes on Sundays. Can Fisher, on Bogatell beach, serves Ebro Delta rice dishes daily from 12:30pm to midnight. Disfrutar takes bookings online. Paradiso, ranked 17th on the World's 50 Best Bars 2026 list, works through a QR-code virtual queue rather than bookings. For mornings, Petit Nomad now opens seven days a week, Federal Café in the Gòtic serves daily from 9am to 4:30pm, and Hofmann's Born shop sells pastries every day."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair a booked Sagrada Família slot with an online-only Park Güell ticket, then walk Passeig de Gràcia for Casa Batlló and La Pedrera."
        ],
        [
          "A slower morning",
          "Start with coffee at Petit Nomad or Hidden Coffee Roasters in El Born, then visit Museu Picasso on Carrer de Montcada, which opens at 10am Tuesday to Sunday in winter."
        ],
        [
          "Before booking",
          "Book Park Güell and the Palau de la Música tour online, but plan to walk in or queue for El Xampanyet and Paradiso, which take no reservations."
        ]
      ],
      trust: "All 22 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Rome, Italy: source review of 2026-10-21 (docs/content-research/rome-2026-10-21.md).
  {
    const cityKey = "Rome, Italy";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Vatican Museums","St. Peter's Basilica","Pantheon","Trevi Fountain"],
      bestFirstTimers: ["Pantheon","Trevi Fountain","St. Peter's Basilica","Musei Capitolini"],
      bestRestaurants: ["Armando al Pantheon","Da Enzo al 29","La Pergola"],
      bestBudget: ["Trevi Fountain","Pizzarium (Via della Meloria)","Supplizio","Passeggiata del Pincio"],
      bestLuxury: ["La Pergola","Galleria Doria Pamphilj"],
      bestCouples: ["Passeggiata del Pincio","Da Enzo al 29","Drink Kong"],
      bestKids: ["Passeggiata del Pincio","Galleria Doria Pamphilj","Supplizio"],
      bestSolo: ["Musei Capitolini","Museo dell'Ara Pacis","Mercato Centrale Roma"],
      bestUnique: ["Parco Regionale dell'Appia Antica","Museo dell'Ara Pacis","Jerry Thomas Speakeasy"],
      bestBreakfast: ["Antico Forno Roscioli (Via dei Chiavari)","Mercato Centrale Roma"],
      bestLunch: ["Pizzarium (Via della Meloria)","Supplizio","Armando al Pantheon"],
      bestDinner: ["Da Enzo al 29","Armando al Pantheon","La Pergola"],
      bestCocktails: ["Drink Kong","Jerry Thomas Speakeasy"],
      bestBakeries: ["Antico Forno Roscioli (Via dei Chiavari)"],
      bestCoffee: []
    };
    data.cityPlaceQueries[cityKey] = {
      "Vatican Museums": "Vatican Museums Viale Vaticano Rome",
      "St. Peter's Basilica": "St. Peter's Basilica Piazza San Pietro Vatican City Rome",
      "Pantheon": "Pantheon Piazza della Rotonda Rome",
      "Trevi Fountain": "Trevi Fountain Via della Stamperia Rome",
      "Musei Capitolini": "Musei Capitolini Piazza del Campidoglio 1 Rome",
      "Armando al Pantheon": "Armando al Pantheon Salita de' Crescenzi 31 Rome",
      "Da Enzo al 29": "Da Enzo al 29 Via dei Vascellari 29 Rome",
      "La Pergola": "La Pergola Rome Cavalieri Via Alberto Cadlolo 101 Rome",
      "Pizzarium (Via della Meloria)": "Pizzarium Bonci Via della Meloria 43 Rome",
      "Supplizio": "Supplizio Via dei Banchi Vecchi 143 Rome",
      "Passeggiata del Pincio": "Passeggiata del Pincio Viale delle Magnolie Rome",
      "Galleria Doria Pamphilj": "Galleria Doria Pamphilj Via del Corso 305 Rome",
      "Drink Kong": "Drink Kong Piazza di San Martino ai Monti 8 Rome",
      "Museo dell'Ara Pacis": "Museo dell'Ara Pacis Lungotevere in Augusta Rome",
      "Mercato Centrale Roma": "Mercato Centrale Roma Via Giovanni Giolitti 36 Rome",
      "Parco Regionale dell'Appia Antica": "Parco Regionale dell'Appia Antica Via Appia Antica 42 Rome",
      "Jerry Thomas Speakeasy": "Jerry Thomas Speakeasy Vicolo Cellini 30 Rome",
      "Antico Forno Roscioli (Via dei Chiavari)": "Antico Forno Roscioli Via dei Chiavari 34 Rome"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Vatican and Roman landmarks, civic museums, a park walk and the Appian Way park, with trattorias, pizza-by-the-slice, a bakery, a food hall and cocktail bars checked against their own websites.";
      cityGuide.highlights = ["Vatican Museums","St. Peter's Basilica","Pantheon","Trevi Fountain"];
      cityGuide.tip = "The Vatican Museums are closed on Sundays except the last Sunday of the month, when entry is free from 9:00 to 14:00 (final entry 12:30), so plan a weekday visit or arrive early on a last Sunday.";
    }
    data.destinationFacts[cityKey] = "The Vatican Museums are closed on Sundays except the last Sunday of the month, when entry is free from 9:00 to 14:00 (final entry 12:30), so plan a weekday visit or arrive early on a last Sunday.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Vatican and Roman landmarks, civic museums, a park walk and the Appian Way park, with trattorias, pizza-by-the-slice, a bakery, a food hall and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Check before you go",
        "copy": "The Vatican Museums close on Sundays except the last Sunday of the month, and on 1 November and 8, 25 and 26 December. Galleria Doria Pamphilj closes every Wednesday, and Musei Capitolini and the Ara Pacis close on 1 May and 25 December."
      },
      {
        "label": "Tickets and booking",
        "value": "Use the official sites",
        "copy": "Book Vatican Museums tickets only at tickets.museivaticani.va; the museums warn of scam sites with similar domains. Trevi Fountain's inner area costs €2 for non-residents, and pre-bought tickets have no date or time and cannot be refunded."
      },
      {
        "label": "Walk-in or reserve",
        "value": "Policies differ",
        "copy": "Da Enzo al 29 takes no reservations and seats guests in order of arrival, while Armando al Pantheon takes bookings only online. Drink Kong takes online reservations for up to 6 people but none after midnight."
      },
      {
        "label": "Rules",
        "value": "Dress, food and bags",
        "copy": "St. Peter's Basilica admits only clothing appropriate for a place of worship, with no overly brief outfits, tank tops or headwear, and entry is through a police security check. Trevi Fountain bans food, drink and sitting on the basin edge, and has no cloakroom, so bring a small bag."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book the Vatican Museums and your dinner slots in advance, and leave walk-in trattorias and the Trevi Fountain for flexible moments.",
      intro: [
        "You can build a first day in Rome around the Vatican. The Vatican Museums on Viale Vaticano open Monday to Saturday from 8:00 to 20:00, with final entry at 18:00. They are closed on Sundays except the last Sunday of the month, which is free from 9:00 to 14:00. St. Peter's Basilica opens at 7:00 and, from 26 October 2026, closes at 19:00. The dome opens 7:30 to 17:00 in winter. You enter through police security checks on the right side of St. Peter's Square, and you need clothing suited to a place of worship.",
        "In the historic centre, the Pantheon on Piazza della Rotonda opens every day from 9:00 to 19:00, with last entry at 18:30, and its site lists free entry on the first Sunday of the month. The Trevi Fountain has charged non-residents €2 for the inner area since 2 February 2026. You enter on Via della Stamperia and leave by Via dei Crociferi. It opens at 9:00, or 11:30 on Mondays and Fridays, with last entry at 21:00. After closing you can still see it free from outside.",
        "For museums beyond the big names, the Musei Capitolini on Piazza del Campidoglio open daily from 9:30 to 19:30. They are showing a Diego Rivera exhibition until 13 December 2026. The Ara Pacis keeps the same hours and opens a Fayum portrait exhibition on 5 November 2026, running to 2 May 2027. Galleria Doria Pamphilj, entered at Via del Corso 305, closes every Wednesday, and a standard ticket costs €16. For open air, the Passeggiata del Pincio is always open and has bike rental, and the Appia Antica park office is at Via Appia Antica 42.",
        "Food planning matters as much as tickets. Da Enzo al 29 in Trastevere opens Monday to Saturday and takes no reservations. Armando al Pantheon books only online and is closed Saturday evening and Sunday. Supplizio on Via dei Banchi Vecchi is closed on Sundays. Antico Forno Roscioli on Via dei Chiavari opens daily at 7:30, and Mercato Centrale Roma on Via Giolitti runs daily from 7:30 to 23:30. For drinks, Drink Kong in Monti opens nightly at 18:30, and Jerry Thomas Speakeasy opens at 21:00."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Vatican Museums (Monday to Saturday, final entry 18:00) with St. Peter's Basilica, then cross to the Pantheon and the Trevi Fountain."
        ],
        [
          "A slower morning",
          "Start with bread at Antico Forno Roscioli from 7:30, then walk up to the always-open Passeggiata del Pincio."
        ],
        [
          "Before booking",
          "Buy Vatican tickets only on tickets.museivaticani.va, book Armando al Pantheon online, and plan to queue at Da Enzo al 29, which takes no reservations."
        ]
      ],
      trust: "All 18 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Lisbon, Portugal: source review of 2026-10-21 (docs/content-research/lisbon-2026-10-21.md).
  {
    const cityKey = "Lisbon, Portugal";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Mosteiro dos Jerónimos","Torre de Belém","Castelo de São Jorge","Oceanário de Lisboa"],
      bestFirstTimers: ["Mosteiro dos Jerónimos","Torre de Belém","Castelo de São Jorge","Time Out Market Lisboa"],
      bestRestaurants: ["Belcanto","Prado"],
      bestBudget: ["Pastéis de Belém","Manteigaria (Chiado)","Time Out Market Lisboa"],
      bestLuxury: ["Belcanto","Cinco Lounge"],
      bestCouples: ["Castelo de São Jorge","Prado","Cinco Lounge"],
      bestKids: ["Oceanário de Lisboa","Padrão dos Descobrimentos","MAAT","Castelo de São Jorge"],
      bestSolo: ["Museu Calouste Gulbenkian","MAAT","Hello Kristof (Poço dos Negros)","Copenhagen Coffee Lab (Madalena)"],
      bestUnique: ["MAAT","Padrão dos Descobrimentos","Museu Calouste Gulbenkian"],
      bestBreakfast: ["Copenhagen Coffee Lab (Madalena)","Hello Kristof (Poço dos Negros)","Manteigaria (Chiado)"],
      bestLunch: ["Time Out Market Lisboa","Prado","Belcanto"],
      bestDinner: ["Belcanto","Prado"],
      bestCocktails: ["Cinco Lounge"],
      bestBakeries: ["Pastéis de Belém","Manteigaria (Chiado)"],
      bestCoffee: ["Copenhagen Coffee Lab (Madalena)","Hello Kristof (Poço dos Negros)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Mosteiro dos Jerónimos": "Mosteiro dos Jerónimos Praça do Império Lisbon",
      "Torre de Belém": "Torre de Belém Avenida Brasília Lisbon",
      "Castelo de São Jorge": "Castelo de São Jorge Rua de Santa Cruz do Castelo Lisbon",
      "Oceanário de Lisboa": "Oceanário de Lisboa Doca dos Olivais Parque das Nações Lisbon",
      "Time Out Market Lisboa": "Time Out Market Lisboa Mercado da Ribeira Avenida 24 de Julho Lisbon",
      "Belcanto": "Belcanto Rua Serpa Pinto 10A Lisbon",
      "Prado": "Prado Travessa das Pedras Negras 2 Lisbon",
      "Pastéis de Belém": "Pastéis de Belém Rua de Belém 84 Lisbon",
      "Manteigaria (Chiado)": "Manteigaria Rua do Loreto 2 Lisbon",
      "Cinco Lounge": "Cinco Lounge Rua Ruben A Leitão 17A Lisbon",
      "Padrão dos Descobrimentos": "Padrão dos Descobrimentos Avenida Brasília Lisbon",
      "MAAT": "MAAT Avenida Brasília Belém Lisbon",
      "Museu Calouste Gulbenkian": "Museu Calouste Gulbenkian Avenida de Berna 45A Lisbon",
      "Hello Kristof (Poço dos Negros)": "Hello Kristof Rua do Poço dos Negros 103 Lisbon",
      "Copenhagen Coffee Lab (Madalena)": "Copenhagen Coffee Lab Rua da Madalena 96 Lisbon"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Belém monuments, the castle, museums and the aquarium, with bakeries, cafés, restaurants and a cocktail bar checked against their own websites.";
      cityGuide.highlights = ["Mosteiro dos Jerónimos","Torre de Belém","Castelo de São Jorge","Museu Calouste Gulbenkian"];
      cityGuide.tip = "Avoid Belém on a Monday, when Mosteiro dos Jerónimos and Torre de Belém are both closed, and remember that MAAT and the Museu Calouste Gulbenkian close on Tuesdays instead.";
    }
    data.destinationFacts[cityKey] = "Avoid Belém on a Monday, when Mosteiro dos Jerónimos and Torre de Belém are both closed, and remember that MAAT and the Museu Calouste Gulbenkian close on Tuesdays instead.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Belém monuments, the castle, museums and the aquarium, with bakeries, cafés, restaurants and a cocktail bar checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon: Belém monuments · Tue: MAAT, Gulbenkian",
        "copy": "Mosteiro dos Jerónimos and Torre de Belém close on Mondays, while MAAT and the Museu Calouste Gulbenkian close on Tuesdays. Belcanto is closed on Sundays and Mondays."
      },
      {
        "label": "Tickets",
        "value": "Jerónimos 18 €, Torre 15 €",
        "copy": "The standard ticket is 18,00 € at Mosteiro dos Jerónimos and 15,00 € at Torre de Belém, both sold through an online ticket office. At Jerónimos the ticket offices close at 16h30, an hour before the cloister."
      },
      {
        "label": "Booking",
        "value": "Book Belcanto online or by phone",
        "copy": "Belcanto takes reservations through its booking page or by phone, and says emails should not be used to request them. Cinco Lounge takes bookings for 20:00-22:00 by email and also accepts walk-ins."
      },
      {
        "label": "Seasonal hours",
        "value": "Castle closes 18:00 from 1 Nov",
        "copy": "Castelo de São Jorge runs summer hours to 21:00 until 31 October, then closes at 18:00 (last admission 17:30) from 1 November. The Oceanário de Lisboa opens daily 10h-20h with last entry at 19h, and offers lockers for luggage."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Group Belém's monuments on any day but Monday, keep Tuesday for the castle or aquarium, and book Belcanto ahead.",
      intro: [
        "In Belém, Mosteiro dos Jerónimos, Torre de Belém and the Padrão dos Descobrimentos stand within a short walk of each other, so you can see all three in one day. Jerónimos opens its cloister Tuesday to Sunday from 9h30 to 17h30, with last entry at 17h00, but its ticket offices close at 16h30. The standard ticket costs 18,00 €. Torre de Belém also closes on Mondays and charges 15,00 €. The Padrão opens daily, from 10:00 to 18:00 until February, and its current exhibition is \"PADRÃO. Casa-Obsessão\".",
        "MAAT, also on Avenida Brasília, opens Wednesday to Monday from 10.00 to 19.00. Its show \"Turn around\", drawn from the Fundação EDP art collection, runs until January 2027. Across town, the Museu Calouste Gulbenkian has reopened after about a year and a half of renovation. It opens 10:00 to 18:00, stays open to 21:00 on Saturdays, and closes on Tuesdays. \"A Coleção Imaginária\" opens on 21 November 2026 and runs until 15 March 2027.",
        "Castelo de São Jorge is open every day apart from a few holidays. It keeps summer hours, 9:00 to 21:00, until 31 October. From 1 November it closes at 18:00, with last admission at 17:30. The castle's museum nucleus is temporarily closed while its toilets are improved. The Oceanário de Lisboa at Parque das Nações opens daily from 10h to 20h, with last entry at 19h. Its temporary exhibitions are \"Monstros Marinhos\" and \"Universo Submerso\". Online tickets start at 25,5€, and lockers are available for your luggage.",
        "For food, Time Out Market Lisboa in the Mercado da Ribeira opens daily from 10.00 to midnight, with 26 restaurants and 8 bars. Belcanto on Rua Serpa Pinto serves lunch and dinner Tuesday to Saturday. Prado serves dinner Tuesday to Saturday and lunch Thursday to Saturday. For pastries, Pastéis de Belém says it is open every day, and Manteigaria on Rua do Loreto opens from 08h00 to midnight. After dark, Cinco Lounge in Príncipe Real pours cocktails daily from 8pm to 2am."
      ],
      summaryCards: [
        [
          "First visit",
          "Spend a Tuesday-to-Sunday morning at Mosteiro dos Jerónimos and Torre de Belém, then walk to the Padrão dos Descobrimentos, which opens daily."
        ],
        [
          "A slower morning",
          "Start with coffee at Copenhagen Coffee Lab on Rua da Madalena or Hello Kristof on Poço dos Negros, then take a custard tart from Manteigaria, which opens at 08h00."
        ],
        [
          "Before booking",
          "Reserve Belcanto through its booking page or by phone rather than by email, and note that it closes on Sundays and Mondays."
        ]
      ],
      trust: "All 15 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // New York, United States: places added 2026-10-21 after the source review (docs/content-research/new-york-2026-10-21.md).
  {
    const cityKey = "New York, United States";
    const detail = data.cityGuideDetailData[cityKey];
    const additions = {"The Metropolitan Museum of Art":["bestAttractions","bestFirstTimers","bestCouples"],"Museum of Modern Art (MoMA)":["bestAttractions","bestSolo"],"American Museum of Natural History":["bestKids","bestFirstTimers"],"Solomon R. Guggenheim Museum":["bestUnique","bestSolo"],"Top of the Rock":["bestCouples","bestFirstTimers"]};
    for (const [name, categories] of Object.entries(additions)) {
      for (const category of categories) {
        const list = [name, ...(detail[category] || []).filter((item) => item !== name)];
        // Trim to 5 from the end, but never drop a place that appears in no other list.
        for (let index = list.length - 1; list.length > 5 && index > 0; index -= 1) {
          if (Object.entries(detail).some(([other, items]) => other !== category && items.includes(list[index]))) list.splice(index, 1);
        }
        detail[category] = list;
      }
    }
    Object.assign(data.cityPlaceQueries[cityKey], {"The Metropolitan Museum of Art":"The Metropolitan Museum of Art 1000 Fifth Avenue New York","Museum of Modern Art (MoMA)":"Museum of Modern Art 11 West 53rd Street New York","American Museum of Natural History":"American Museum of Natural History 200 Central Park West New York","Solomon R. Guggenheim Museum":"Solomon R. Guggenheim Museum 1071 Fifth Avenue New York","Top of the Rock":"Top of the Rock 30 Rockefeller Plaza New York"});
    const editorial = data.cityEditorialPageData[cityKey];
    const count = new Set(Object.values(detail).flat()).size;
    if (editorial?.trust) editorial.trust = editorial.trust.replace(/^All \d+ distinct recommendations/, `All ${count} distinct recommendations`);
  }
  // Amsterdam, Netherlands: places added 2026-10-21 after the source review (docs/content-research/amsterdam-2026-10-21.md).
  {
    const cityKey = "Amsterdam, Netherlands";
    const detail = data.cityGuideDetailData[cityKey];
    const additions = {"Van Gogh Museum":["bestAttractions","bestFirstTimers","bestCouples"]};
    for (const [name, categories] of Object.entries(additions)) {
      for (const category of categories) {
        const list = [name, ...(detail[category] || []).filter((item) => item !== name)];
        // Trim to 5 from the end, but never drop a place that appears in no other list.
        for (let index = list.length - 1; list.length > 5 && index > 0; index -= 1) {
          if (Object.entries(detail).some(([other, items]) => other !== category && items.includes(list[index]))) list.splice(index, 1);
        }
        detail[category] = list;
      }
    }
    Object.assign(data.cityPlaceQueries[cityKey], {"Van Gogh Museum":"Van Gogh Museum Museumplein 6 Amsterdam"});
    const editorial = data.cityEditorialPageData[cityKey];
    const count = new Set(Object.values(detail).flat()).size;
    if (editorial?.trust) editorial.trust = editorial.trust.replace(/^All \d+ distinct recommendations/, `All ${count} distinct recommendations`);
  }
  // Barcelona, Spain: places added 2026-10-21 after the source review (docs/content-research/barcelona-2026-10-21.md).
  {
    const cityKey = "Barcelona, Spain";
    const detail = data.cityGuideDetailData[cityKey];
    const additions = {"Mercat de la Boqueria":["bestFirstTimers","bestBudget","bestLunch"],"Fundació Joan Miró":["bestAttractions","bestUnique","bestSolo"]};
    for (const [name, categories] of Object.entries(additions)) {
      for (const category of categories) {
        const list = [name, ...(detail[category] || []).filter((item) => item !== name)];
        // Trim to 5 from the end, but never drop a place that appears in no other list.
        for (let index = list.length - 1; list.length > 5 && index > 0; index -= 1) {
          if (Object.entries(detail).some(([other, items]) => other !== category && items.includes(list[index]))) list.splice(index, 1);
        }
        detail[category] = list;
      }
    }
    Object.assign(data.cityPlaceQueries[cityKey], {"Mercat de la Boqueria":"Mercat de la Boqueria La Rambla 91 Barcelona","Fundació Joan Miró":"Fundació Joan Miró Parc de Montjuïc Barcelona"});
    const editorial = data.cityEditorialPageData[cityKey];
    const count = new Set(Object.values(detail).flat()).size;
    if (editorial?.trust) editorial.trust = editorial.trust.replace(/^All \d+ distinct recommendations/, `All ${count} distinct recommendations`);
  }
  // Tokyo, Japan: places added 2026-10-21 after the source review (docs/content-research/tokyo-2026-10-21.md).
  {
    const cityKey = "Tokyo, Japan";
    const detail = data.cityGuideDetailData[cityKey];
    const additions = {"teamLab Planets TOKYO":["bestUnique","bestKids","bestCouples"],"SHIBUYA SKY":["bestCouples","bestFirstTimers","bestAttractions"]};
    for (const [name, categories] of Object.entries(additions)) {
      for (const category of categories) {
        const list = [name, ...(detail[category] || []).filter((item) => item !== name)];
        // Trim to 5 from the end, but never drop a place that appears in no other list.
        for (let index = list.length - 1; list.length > 5 && index > 0; index -= 1) {
          if (Object.entries(detail).some(([other, items]) => other !== category && items.includes(list[index]))) list.splice(index, 1);
        }
        detail[category] = list;
      }
    }
    Object.assign(data.cityPlaceQueries[cityKey], {"teamLab Planets TOKYO":"teamLab Planets TOKYO 6-1-16 Toyosu Koto Tokyo","SHIBUYA SKY":"SHIBUYA SKY Shibuya Scramble Square 2-24-12 Shibuya Tokyo"});
    const editorial = data.cityEditorialPageData[cityKey];
    const count = new Set(Object.values(detail).flat()).size;
    if (editorial?.trust) editorial.trust = editorial.trust.replace(/^All \d+ distinct recommendations/, `All ${count} distinct recommendations`);
  }
  // Prague, Czechia: source review of 2026-10-21 (docs/content-research/prague-2026-10-21.md).
  {
    const cityKey = "Prague, Czechia";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["National Museum (Historical Building)","Jewish Museum in Prague","Strahov Monastery","Municipal House (Obecní dům)"],
      bestFirstTimers: ["National Museum (Historical Building)","Jewish Museum in Prague","House at the Golden Ring (Museum of Prague)","Strahov Monastery"],
      bestRestaurants: ["La Degustation Bohême Bourgeoise","Field","Café Imperial","Kantýna"],
      bestBudget: ["Museum of Prague (Main Building)","Vyšehrad","Lokál Dlouhááá","U Zlatého tygra"],
      bestLuxury: ["La Degustation Bohême Bourgeoise","Field","Rudolfinum (Czech Philharmonic)","Municipal House (Obecní dům)"],
      bestCouples: ["Rudolfinum (Czech Philharmonic)","Hemingway Bar","Field","Museum Kampa"],
      bestKids: ["Prague Zoo","National Technical Museum","Museum of Prague (Main Building)","National Museum (Historical Building)"],
      bestSolo: ["National Gallery Prague (Trade Fair Palace)","Museum Kampa","Mucha Museum","Café Slavia"],
      bestUnique: ["Strahov Monastery","U Zlatého tygra","National Technical Museum","Rudolfinum (Czech Philharmonic)"],
      bestBreakfast: ["Café Imperial","Eska (Letná)","Café Louvre","Myšák (Vodičkova)"],
      bestLunch: ["Lokál Dlouhááá","Kantýna","Eska (Karlín)","Field"],
      bestDinner: ["La Degustation Bohême Bourgeoise","Field","Lokál Dlouhááá","Kantýna"],
      bestCocktails: ["Hemingway Bar","Anonymous Bar"],
      bestBakeries: ["Eska (Karlín)","Eska (Letná)","Myšák (Vodičkova)"],
      bestCoffee: ["Můj šálek kávy","Café Slavia","Café Louvre","Café Savoy"]
    };
    data.cityPlaceQueries[cityKey] = {
      "National Museum (Historical Building)": "National Museum Václavské náměstí 68 Prague",
      "Jewish Museum in Prague": "Jewish Museum in Prague Maiselova 15 Prague",
      "Strahov Monastery": "Strahov Monastery Strahovské nádvoří 132/1 Prague",
      "Municipal House (Obecní dům)": "Obecní dům náměstí Republiky 5 Prague",
      "House at the Golden Ring (Museum of Prague)": "House at the Golden Ring Týnská 630/6 Prague",
      "La Degustation Bohême Bourgeoise": "La Degustation Bohême Bourgeoise Haštalská 18 Prague",
      "Field": "Field Restaurant U Milosrdných 12 Prague",
      "Café Imperial": "Café Imperial Na Poříčí 15 Prague",
      "Kantýna": "Kantýna Politických vězňů 1511/5 Prague",
      "Museum of Prague (Main Building)": "Museum of Prague Na Poříčí 1554/52 Prague",
      "Vyšehrad": "Vyšehrad V Pevnosti 163/2 Prague",
      "Lokál Dlouhááá": "Lokál Dlouhááá Dlouhá 33 Prague",
      "U Zlatého tygra": "U Zlatého tygra Husova 17 Prague",
      "Rudolfinum (Czech Philharmonic)": "Rudolfinum Alšovo nábřeží 79/12 Prague",
      "Hemingway Bar": "Hemingway Bar Opatovická 1737/3 Prague",
      "Museum Kampa": "Museum Kampa U Sovových mlýnů 503/2 Prague",
      "Prague Zoo": "Prague Zoo U Trojského zámku 120/3 Prague",
      "National Technical Museum": "National Technical Museum Kostelní 42 Prague",
      "National Gallery Prague (Trade Fair Palace)": "Trade Fair Palace National Gallery Dukelských hrdinů 47 Prague",
      "Mucha Museum": "Mucha Museum Panská 7 Prague",
      "Café Slavia": "Café Slavia Národní 1 Prague",
      "Eska (Letná)": "Eska Veletržní 290/42 Prague",
      "Café Louvre": "Café Louvre Národní 22 Prague",
      "Myšák (Vodičkova)": "Myšák Vodičkova 710/31 Prague",
      "Eska (Karlín)": "Eska Pernerova 49 Prague",
      "Anonymous Bar": "Anonymous Bar Michalská 12 Prague",
      "Můj šálek kávy": "Můj šálek kávy Křižíkova 105 Prague",
      "Café Savoy": "Café Savoy Vítězná 5 Prague"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Museums, the Jewish Quarter, Strahov, Vyšehrad and the zoo, with historic cafés, bakeries, Czech pubs, tasting menus and cocktail bars checked against their own websites.";
      cityGuide.highlights = ["National Museum (Historical Building)","Jewish Museum in Prague","Strahov Monastery","Municipal House (Obecní dům)"];
      cityGuide.tip = "Keep Mondays for the National Museum, Museum Kampa, the Mucha Museum or the zoo, because the Trade Fair Palace, the National Technical Museum and the Museum of Prague's main building close that day, and avoid Saturdays for the Jewish Museum.";
    }
    data.destinationFacts[cityKey] = "Keep Mondays for the National Museum, Museum Kampa, the Mucha Museum or the zoo, because the Trade Fair Palace, the National Technical Museum and the Museum of Prague's main building close that day, and avoid Saturdays for the Jewish Museum.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, the Jewish Quarter, Strahov, Vyšehrad and the zoo, with historic cafés, bakeries, Czech pubs, tasting menus and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Saturdays",
        "copy": "The National Gallery's Trade Fair Palace, the National Technical Museum and the Museum of Prague's main building and House at the Golden Ring are closed on Mondays. The Jewish Museum in Prague closes on Saturdays and Jewish holidays."
      },
      {
        "label": "Autumn hours",
        "value": "Earlier closing",
        "copy": "From 18 October the Jewish Museum sites close at 4:30 p.m., and Prague Zoo closes at 5 pm in October and 4 pm in November, with ticket offices and pavilions closing earlier."
      },
      {
        "label": "Booking and walk-ins",
        "value": "Book the big tables",
        "copy": "Café Imperial suggests reserving \"even weeks in advance\", and Field holds reservations for only 15 minutes. Café Slavia says you rarely need to book, takes weekend reservations only from 19:00 and none on public holidays."
      },
      {
        "label": "Rules",
        "value": "Dress and age",
        "copy": "Field asks for smart casual and is not suitable for children under 6. At the Rudolfinum, the Czech Philharmonic turns no one away for clothing, though a dark suit or business formal is the safe choice for evening concerts."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan museum days around Monday and Saturday closures, book Café Imperial and Field ahead, and save one evening for a concert at the Rudolfinum or the Municipal House.",
      intro: [
        "This Prague guide is built from places whose own websites were read on 21 October 2026. You can start at the National Museum's Historical Building at Václavské náměstí 68, open daily from 10:00 to 18:00, where Maps and Atlases from the Kinsky Library runs until 3 January 2027. Entry pauses when the building is full, usually around weekend noon. The Jewish Museum in Prague, based at Maiselova 15, opens 9 a.m. to 4:30 p.m. from 18 October and closes on Saturdays and Jewish holidays. Up at Hradčany, the Strahov Monastery library and gallery open from 9:00 to 17:00.",
        "For art, Museum Kampa in Malá Strana opens daily from 10 am to 6 pm and shows Milan Kunc – Pop Renaissance until 17 January 2027. The Mucha Museum on Panská opens daily from 10:00 to 18:00. The National Gallery's Trade Fair Palace in Prague 7 has Zbyněk Sekal — Blue Flower until 31 January 2027 but closes on Mondays. The Museum of Prague's House at the Golden Ring on Týnská covers Prague under Charles IV, and its main building on Na Poříčí stays open until 8 pm on Thursdays.",
        "With children, you can try Prague Zoo in Troja, open 9 am to 5 pm in October and to 4 pm in November and December. The National Technical Museum on Kostelní opens Tuesday to Sunday and has The Saga of the Hainz Family from 14 October 2026. The Museum of Prague's free Cloud exhibition is aimed at young children. In the evening, the Rudolfinum is home to the Czech Philharmonic and the Municipal House stages concerts and opera, so check their own programmes for dates.",
        "For food, Café Imperial on Na Poříčí serves a breakfast buffet from 7:00 daily and says it is in the Michelin Guide 2026. Eska bakes in Karlín and Letná, and Myšák on Vodičkova serves Czech desserts. For Czech beer, Lokál Dlouhááá opens from 11:00 and U Zlatého tygra on Husova from 15:00. Field and La Degustation Bohême Bourgeoise take reservations, and Field holds a table for only 15 minutes. Afterwards, Hemingway Bar opens from 17:00 and Anonymous Bar on Michalská serves until 02:00."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the National Museum on Wenceslas Square with a weekday at the Jewish Museum, which closes on Saturdays, then walk up to the Strahov Monastery library, open 9:00 to 17:00."
        ],
        [
          "A slower morning",
          "Start with the 7:00 breakfast buffet at Café Imperial or a pastry at Eska in Letná, then spend the late morning at Museum Kampa, open daily from 10 am."
        ],
        [
          "Before booking",
          "Reserve Café Imperial and Field ahead, check concert dates for the Rudolfinum and the Municipal House, and remember several museums close on Mondays."
        ]
      ],
      trust: "All 28 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Istanbul, Turkey: source review of 2026-10-21 (docs/content-research/istanbul-2026-10-21.md).
  {
    const cityKey = "Istanbul, Turkey";
    for (const twin of ["Istanbul, Türkiye"]) {
      delete data.cityGuideDetailData[twin];
      delete data.cityPlaceQueries[twin];
      for (const map of [data.destinationHeroData, data.cityPlanningToolkitData, data.cityEditorialPageData, data.destinationFacts]) {
        if (map && twin in map) {
          if (!(cityKey in map)) map[cityKey] = map[twin];
          delete map[twin];
        }
      }
      const twinGuide = data.cityGuideData.find((item) => item.city === twin);
      if (twinGuide && !data.cityGuideData.some((item) => item.city === cityKey)) twinGuide.city = cityKey;
    }
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Topkapı Palace Museum","Galata Tower Museum","Dolmabahçe Palace","Grand Bazaar"],
      bestFirstTimers: ["Topkapı Palace Museum","Hagia Sophia History and Experience Museum","Istanbul Archaeological Museums","Grand Bazaar"],
      bestRestaurants: ["Mikla","Pandeli","Karaköy Lokantası","Arkestra"],
      bestBudget: ["Karaköy Lokantası","Kurukahveci Mehmet Efendi (Tahmis)","Petra Roasting Co. (Şişhane)","Grand Bazaar"],
      bestLuxury: ["Mikla","Arkestra","Kubbeli Saloon (Pera Palace Hotel)","Dolmabahçe Palace"],
      bestCouples: ["Mikla Bar","Kubbeli Saloon (Pera Palace Hotel)","Beylerbeyi Palace","Neolokal"],
      bestKids: ["Miniaturk","Rahmi M. Koç Museum","Galata Tower Museum","Istanbul Archaeological Museums"],
      bestSolo: ["Istanbul Modern","Pera Museum","Museum of Innocence","Petra Roasting Co. (Şişhane)"],
      bestUnique: ["Museum of Innocence","Galata Mevlevi Lodge Museum","Miniaturk","Sakıp Sabancı Museum"],
      bestBreakfast: ["Petra Roasting Co. (Şişhane)"],
      bestLunch: ["Pandeli","Karaköy Lokantası","Beyti"],
      bestDinner: ["Mikla","Neolokal","Arkestra","Beyti"],
      bestCocktails: ["Mikla Bar","Arkestra"],
      bestBakeries: ["Patisserie de Pera (Pera Palace Hotel)"],
      bestCoffee: ["Petra Roasting Co. (Şişhane)","Kurukahveci Mehmet Efendi (Tahmis)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Topkapı Palace Museum": "Topkapı Palace Museum Babı Hümayun Caddesi Sultanahmet Istanbul",
      "Galata Tower Museum": "Galata Tower Museum Bereketzade Beyoğlu Istanbul",
      "Dolmabahçe Palace": "Dolmabahçe Palace Dolmabahçe Caddesi Beşiktaş Istanbul",
      "Grand Bazaar": "Grand Bazaar Kalpakçılar Caddesi Beyazıt Istanbul",
      "Hagia Sophia History and Experience Museum": "Hagia Sophia History and Experience Museum At Meydanı Sokak 10 Fatih Istanbul",
      "Istanbul Archaeological Museums": "Istanbul Archaeological Museums Osman Hamdi Bey Yokuşu Gülhane Istanbul",
      "Mikla": "Mikla Meşrutiyet Caddesi 15 Beyoğlu Istanbul",
      "Pandeli": "Pandeli Mısır Çarşısı Balık Pazarı Kapısı Sokağı Fatih Istanbul",
      "Karaköy Lokantası": "Karaköy Lokantası Kemankeş Caddesi 57 Karaköy Istanbul",
      "Arkestra": "Arkestra Dilhayat Sokak 28 Etiler Istanbul",
      "Kurukahveci Mehmet Efendi (Tahmis)": "Kurukahveci Mehmet Efendi Tahmis Sokağı 66 Eminönü Istanbul",
      "Petra Roasting Co. (Şişhane)": "Petra Roasting Co. Şişhane Istanbul",
      "Kubbeli Saloon (Pera Palace Hotel)": "Kubbeli Saloon Pera Palace Hotel Meşrutiyet Caddesi 52 Tepebaşı Istanbul",
      "Mikla Bar": "Mikla Bar The Marmara Pera Meşrutiyet Caddesi 15 Istanbul",
      "Beylerbeyi Palace": "Beylerbeyi Palace Abdullah Ağa Caddesi 12 Üsküdar Istanbul",
      "Neolokal": "Neolokal SALT Galata Bankalar Caddesi Karaköy Istanbul",
      "Miniaturk": "Miniaturk İmrahor Caddesi 7 Sütlüce Istanbul",
      "Rahmi M. Koç Museum": "Rahmi M. Koç Museum Rahmi M. Koç Caddesi 3 Hasköy Istanbul",
      "Istanbul Modern": "Istanbul Modern Tophane İskele Caddesi 1 Beyoğlu Istanbul",
      "Pera Museum": "Pera Museum Meşrutiyet Caddesi 65 Tepebaşı Istanbul",
      "Museum of Innocence": "Museum of Innocence Çukurcuma Caddesi Dalgıç Çıkmazı 2 Beyoğlu Istanbul",
      "Galata Mevlevi Lodge Museum": "Galata Mevlevi Lodge Museum Galip Dede Caddesi 15 Tünel Istanbul",
      "Sakıp Sabancı Museum": "Sakıp Sabancı Museum Sakıp Sabancı Caddesi 42 Emirgan Istanbul",
      "Beyti": "Beyti Orman Sokak 6-8 Florya Bakırköy Istanbul",
      "Patisserie de Pera (Pera Palace Hotel)": "Patisserie de Pera Pera Palace Hotel Meşrutiyet Caddesi 52 Tepebaşı Istanbul"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Palaces, state and private museums, the Grand Bazaar, restaurants from Karaköy to Etiler, a historic coffee house, a hotel patisserie and afternoon tea, each checked against its own or its public operator's website.";
      cityGuide.highlights = ["Topkapı Palace Museum","Dolmabahçe Palace","Galata Tower Museum","Istanbul Archaeological Museums"];
      cityGuide.tip = "Most closures fall on Mondays: Dolmabahçe Palace, Beylerbeyi Palace, Pera Museum, Sakıp Sabancı Museum, Rahmi M. Koç Museum, Museum of Innocence, Galata Mevlevi Lodge Museum, Miniaturk and Beyti all close then. Topkapı Palace Museum closes on Tuesdays instead.";
    }
    data.destinationFacts[cityKey] = "Most closures fall on Mondays: Dolmabahçe Palace, Beylerbeyi Palace, Pera Museum, Sakıp Sabancı Museum, Rahmi M. Koç Museum, Museum of Innocence, Galata Mevlevi Lodge Museum, Miniaturk and Beyti all close then. Topkapı Palace Museum closes on Tuesdays instead.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Palaces, state and private museums, the Grand Bazaar, restaurants from Karaköy to Etiler, a historic coffee house, a hotel patisserie and afternoon tea, each checked against its own or its public operator's website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays at most museums; Tuesdays at Topkapı",
        "copy": "Topkapı Palace Museum lists Tuesday as its closed day, while Dolmabahçe, Beylerbeyi, Pera Museum, Sakıp Sabancı Museum, Rahmi M. Koç Museum and the Museum of Innocence close on Mondays. Istanbul Archaeological Museums is open every day."
      },
      {
        "label": "Tickets",
        "value": "Foreign-visitor prices; a free Tuesday",
        "copy": "Topkapı's combined Palace, Aya İrini and Harem ticket is 2,750 TL for foreign visitors and is valid for one day, and the Hagia Sophia History and Experience Museum charges €25 and does not accept the Museum Card. Sakıp Sabancı Museum is free on Tuesdays, and Pera Museum is free for students on Wednesdays."
      },
      {
        "label": "Booking",
        "value": "Card guarantee at Mikla",
        "copy": "Mikla's online booking asks for a card guarantee of 35 euros per person, charged only for a no-show, and Pandeli counts a booking as confirmed only once the restaurant emails you. Arkestra takes online reservations, and its upstairs Listening Room bar currently welcomes restaurant guests only."
      },
      {
        "label": "Rules",
        "value": "Dress code, ages, no tea-only tables",
        "copy": "Mikla follows a Smart Chic dress code, and tracksuits and slippers are not accepted. Galata Tower Museum requires visitors under 18 to come with a parent, and Pandeli does not seat guests for sweets, tea or coffee only."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan your museum days around the Monday closures and Topkapı's Tuesday closure, and book Mikla and Arkestra ahead.",
      intro: [
        "On the historic peninsula, start with Topkapı Palace Museum in Sultanahmet. Its ticket office runs from 09:00 to 17:00, it is closed on Tuesdays, and a combined ticket for the palace, Aya İrini and the Harem is valid for one day. Istanbul Archaeological Museums in Gülhane opens every day from 09:00 to 18:30. The Hagia Sophia History and Experience Museum opens daily from 09:00 to 20:00. Nearby, Kurukahveci Mehmet Efendi runs its head shop on Tahmis Sokağı in Eminönü, and Pandeli sits inside the Spice Bazaar.",
        "In Beyoğlu, Galata Tower Museum opens every day from 08:30 to 18:30, with a night session until 22:00, and you must bring a parent if you are under 18. The Galata Mevlevi Lodge Museum on Galip Dede Caddesi is closed on Mondays. Pera Museum stays open until 22:00 on Fridays. At the Pera Palace Hotel, afternoon tea with live piano is served in the Kubbeli Saloon from 15:00 to 18:00, and Patisserie de Pera opens daily from 10:00 to 18:00. The Museum of Innocence in Çukurcuma charges 750 TL.",
        "Along the water, Istanbul Modern is showing Semiha Berksoy: Aria of All Colors until 22 November 2026. Sakıp Sabancı Museum in Emirgan has Yoko Ono: İçses ve İçyapı until 27 December 2026 and is free on Tuesdays. Dolmabahçe Palace and Beylerbeyi Palace on the Asian shore both sell tickets from 09:00 to 17:00 and close on Mondays. If you are travelling with children, try the Rahmi M. Koç Museum in Hasköy, open from 09:30 on Tuesday to Sunday, or Miniaturk in Sütlüce, which is closed on Mondays.",
        "For dinner, Mikla at The Marmara Pera serves Monday to Saturday with last orders at 21:30, asks for a Smart Chic dress code, and has a roof terrace bar open until 02:00. Karaköy Lokantası on Kemankeş Caddesi serves lunch Monday to Saturday and dinner nightly, and Neolokal is at SALT Galata. In Etiler, Arkestra takes online reservations, and its upstairs Listening Room serves craft cocktails to restaurant guests. Beyti in Florya opens from 11:30 to 23:00 and is closed on Mondays. For an early coffee, Petra Roasting Co.'s Şişhane café opens at 8:00 on weekdays."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Topkapı Palace Museum (closed Tuesdays) with Istanbul Archaeological Museums nearby in Gülhane, which is open every day from 09:00."
        ],
        [
          "A slower morning",
          "Start with coffee at Petra Roasting Co. in Şişhane from 8:00 on a weekday, then walk to Pera Museum when it opens at 10:00."
        ],
        [
          "Before booking",
          "Mikla needs a card guarantee of 35 euros per person and is closed on Sundays, and Arkestra's Listening Room bar is currently open to restaurant guests only."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Florence, Italy: source review of 2026-10-21 (docs/content-research/florence-2026-10-21.md).
  {
    const cityKey = "Florence, Italy";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Uffizi Gallery","Palazzo Pitti","Museo Nazionale del Bargello","Cappelle Medicee"],
      bestFirstTimers: ["Uffizi Gallery","Basilica di Santa Croce","Mercato Centrale Firenze","Palazzo Strozzi"],
      bestRestaurants: ["Enoteca Pinchiorri","Buca Mario","Trattoria Zà Zà","Ristorante Il Latini"],
      bestBudget: ["Mercato Centrale Firenze","Boboli Gardens","Basilica di San Miniato al Monte"],
      bestLuxury: ["Enoteca Pinchiorri","B-Roof (Grand Hotel Baglioni)","Procacci"],
      bestCouples: ["Boboli Gardens","Villa e Giardino Bardini","B-Roof (Grand Hotel Baglioni)","Ora d'Aria"],
      bestKids: ["Palazzo Strozzi","Museo Galileo","Boboli Gardens","Mercato Centrale Firenze"],
      bestSolo: ["Museo Nazionale del Bargello","Museo Novecento","Ditta Artigianale (Via dei Neri)","Orsanmichele"],
      bestUnique: ["Orsanmichele","Museo Galileo","Basilica di San Miniato al Monte","Palazzo Medici Riccardi"],
      bestBreakfast: ["La Ménagère","Ditta Artigianale (Via dei Neri)","Pasticceria Buonamici","Mercato Centrale Firenze"],
      bestLunch: ["Procacci","Osteria Santo Spirito","Mercato Centrale Firenze","Trattoria Zà Zà"],
      bestDinner: ["Buca Mario","Ristorante Il Latini","Ora d'Aria","Enoteca Pinchiorri"],
      bestCocktails: ["B-Roof (Grand Hotel Baglioni)","Harry's Bar Firenze","La Ménagère","Mercato Centrale Firenze"],
      bestBakeries: ["Pasticceria Buonamici","Mercato Centrale Firenze","Procacci"],
      bestCoffee: ["Ditta Artigianale (Via dei Neri)","Vivoli","La Ménagère","Mercato Centrale Firenze"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Uffizi Gallery": "Uffizi Gallery Piazzale degli Uffizi 6 Florence",
      "Palazzo Pitti": "Palazzo Pitti Piazza de' Pitti Florence",
      "Museo Nazionale del Bargello": "Museo Nazionale del Bargello Via del Proconsolo 4 Florence",
      "Cappelle Medicee": "Cappelle Medicee Piazza di Madonna degli Aldobrandini 6 Florence",
      "Basilica di Santa Croce": "Basilica di Santa Croce Piazza Santa Croce 16 Florence",
      "Mercato Centrale Firenze": "Mercato Centrale Via dell'Ariento Florence",
      "Palazzo Strozzi": "Palazzo Strozzi Piazza Strozzi Florence",
      "Enoteca Pinchiorri": "Enoteca Pinchiorri Via Ghibellina 87 Florence",
      "Buca Mario": "Buca Mario Piazza degli Ottaviani 16 Florence",
      "Trattoria Zà Zà": "Trattoria Zà Zà Piazza del Mercato Centrale 26 Florence",
      "Ristorante Il Latini": "Il Latini Via dei Palchetti 6 Florence",
      "Boboli Gardens": "Boboli Gardens Via Romana Florence",
      "Basilica di San Miniato al Monte": "San Miniato al Monte Via delle Porte Sante 34 Florence",
      "B-Roof (Grand Hotel Baglioni)": "B-Roof Grand Hotel Baglioni Piazza dell'Unità Italiana 6 Florence",
      "Procacci": "Procacci Via de' Tornabuoni 64 Florence",
      "Villa e Giardino Bardini": "Villa Bardini Costa San Giorgio 2 Florence",
      "Ora d'Aria": "Ora d'Aria Via dei Georgofili 11 Florence",
      "Museo Galileo": "Museo Galileo Piazza dei Giudici 1 Florence",
      "Museo Novecento": "Museo Novecento Piazza Santa Maria Novella 10 Florence",
      "Ditta Artigianale (Via dei Neri)": "Ditta Artigianale Via de' Neri 32 Florence",
      "Orsanmichele": "Orsanmichele Via dell'Arte della Lana Florence",
      "Palazzo Medici Riccardi": "Palazzo Medici Riccardi Via Cavour 3 Florence",
      "La Ménagère": "La Ménagère Via de' Ginori 8 Florence",
      "Pasticceria Buonamici": "Pasticceria Buonamici Via dell'Orto 27 Florence",
      "Osteria Santo Spirito": "Osteria Santo Spirito Piazza Santo Spirito 16 Florence",
      "Harry's Bar Firenze": "Harry's Bar Via il Prato 54 Florence",
      "Vivoli": "Vivoli Via dell'Isola delle Stinche 7 Florence"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "State and civic museums, churches, gardens and a food hall, with trattorie, dinners, breakfast cafés, pastry, gelato and cocktail bars, each checked against its own website.";
      cityGuide.highlights = ["Uffizi Gallery","Palazzo Pitti","Museo Nazionale del Bargello","Basilica di San Miniato al Monte"];
      cityGuide.tip = "The Uffizi, Pitti, Bargello, Cappelle Medicee and Orsanmichele all close on Mondays, Palazzo Medici Riccardi closes on Wednesdays and Osteria Santo Spirito on Tuesdays, so check each closing day before you fix your plan.";
    }
    data.destinationFacts[cityKey] = "The Uffizi, Pitti, Bargello, Cappelle Medicee and Orsanmichele all close on Mondays, Palazzo Medici Riccardi closes on Wednesdays and Osteria Santo Spirito on Tuesdays, so check each closing day before you fix your plan.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "State and civic museums, churches, gardens and a food hall, with trattorie, dinners, breakfast cafés, pastry, gelato and cocktail bars, each checked against its own website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mostly Mondays",
        "copy": "The Uffizi, Palazzo Pitti, the Bargello, the Cappelle Medicee and Orsanmichele close on Mondays, and the Boboli Gardens close on the first and last Monday of each month. Palazzo Medici Riccardi closes on Wednesdays, Museo Novecento on Thursdays and Harry's Bar Firenze on Mondays."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead, with exceptions",
        "copy": "The Cappelle Medicee charge €11, with an optional €4 reservation, and the Boboli + Bardini combined ticket is sold only at the ticket offices on the day you visit. Buca Mario, Il Latini, Osteria Santo Spirito, Ora d'Aria and B-Roof all take table bookings online."
      },
      {
        "label": "Strike on 30 October",
        "value": "Uffizi from 1.30 pm",
        "copy": "The Uffizi Galleries' strike notice warns of a national general strike on 30 October 2026 and says closures and disruptions may occur. It guarantees only the Uffizi, from 1.30 pm to 6.30 pm, and the Boboli Gardens, open all day."
      },
      {
        "label": "Rules and age limits",
        "value": "Check before you go",
        "copy": "Michelangelo's Secret Room at the Cappelle Medicee is by reservation only, lasts 15 minutes, and does not admit children under 10 or unaccompanied minors. Museo Novecento's permanent collection is closed for renovation, so only its temporary exhibitions are on show."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan the state museums around Monday closures, check the 30 October strike notice, and book dinners such as Buca Mario or Il Latini online.",
      intro: [
        "You can build a Florence visit around places whose own websites show current activity. The Uffizi Gallery, at Piazzale degli Uffizi 6, opens Tuesday to Sunday from 8.15 am to 6.30 pm, and its ticket office closes at 5.30 pm. The Uffizi Galleries' strike notice warns of a national general strike on 30 October 2026 and guarantees only the Uffizi, from 1.30 pm, and the Boboli Gardens, all day. Palazzo Pitti keeps the same Tuesday-to-Sunday hours, and its Museum of Costume and Fashion shows \"Sarmi's Genius\" until 31 December 2026.",
        "The Bargello, at Via del Proconsolo 4, and the Cappelle Medicee, at Piazza di Madonna degli Aldobrandini 6, open Tuesday to Sunday from 8.15 am to 6.50 pm and close on Mondays. Both list a special evening opening on 30 November 2026, and the Bargello and Orsanmichele add one on 26 October. Palazzo Strozzi shows \"Broken: The Power of the Fragment\" until 24 January 2027. Palazzo Medici Riccardi, open from 9 am to 7 pm and closed on Wednesdays, runs \"Oltre il Rinascimento\" until 5 January 2027. Museo Novecento has two exhibitions, but its permanent collection is closed for renovation.",
        " San Miniato al Monte is at Via delle Porte Sante 34 and posts its liturgies and events on its own site. Santa Maria Novella posts early closings on its own site. The Boboli Gardens close at 4:30 pm from November, and the Villa Bardini ticket desk on Costa San Giorgio is open every day from 10:30 am to 6 pm. If you have children with you, Museo Galileo runs tours with costumed actors on 24 and 31 October, and Palazzo Strozzi runs family activities into January.",
        "For food, Mercato Centrale is open every day from 9:00 to 23:00, and La Ménagère on Via de' Ginori is open every day from 8.00 to 2.00. Procacci on Via de' Tornabuoni opens Monday to Saturday from 10.00 to 21.00 and has published a 2026 menu. For dinner, Buca Mario serves Monday to Saturday from 19:00, Il Latini's kitchen opens for dinner from Tuesday and adds lunch at weekends, and Osteria Santo Spirito closes on Tuesdays. Harry's Bar Firenze on Via il Prato closes on Mondays, and B-Roof, on the fifth floor of the Grand Hotel Baglioni, takes bookings for its American Bar."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Uffizi Gallery, open Tuesday to Sunday from 8.15 am, with lunch at Mercato Centrale, which is open daily from 9:00."
        ],
        [
          "A slower morning",
          "Start with breakfast at La Ménagère, which opens at 8.00, then walk up to the Boboli Gardens or the Villa Bardini, whose ticket desk opens at 10:30 am."
        ],
        [
          "Before booking",
          "Avoid Mondays for the Uffizi, Pitti, Bargello and Cappelle Medicee, and read the Uffizi Galleries' strike notice for 30 October 2026."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 21, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Kyoto, Japan: source review of 2026-10-25 (docs/content-research/kyoto-2026-10-25.md).
  {
    const cityKey = "Kyoto, Japan";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Fushimi Inari Taisha","Kiyomizu-dera","Kinkaku-ji","Ginkaku-ji"],
      bestFirstTimers: ["Fushimi Inari Taisha","Kiyomizu-dera","Nijo Castle","Kinkaku-ji"],
      bestRestaurants: ["Kikunoi Honten","Nanzenji Junsei","Omen Ginkakuji Main Store","Nishiki Market"],
      bestBudget: ["Fushimi Inari Taisha","Nishiki Market","Sizuya (Kyoto Station)","Kyoto Botanical Gardens"],
      bestLuxury: ["Kikunoi Honten","The Garden Bar (Hotel The Mitsui Kyoto)","Ippodo Tea Kyoto Main Store"],
      bestCouples: ["Kiyomizu-dera","Kitano Tenmangu","Toji","Mr. Maurice's Rooftop Bar (Ace Hotel Kyoto)"],
      bestKids: ["Nijo Castle","Kyoto Tower","Kyoto Botanical Gardens","Kyoto City KYOCERA Museum of Art"],
      bestSolo: ["Kyoto National Museum","National Museum of Modern Art, Kyoto","Francois Kissa","Ippodo Tea Kyoto Main Store"],
      bestUnique: ["Tenryu-ji","Toji","Ginkaku-ji","Yasaka Shrine"],
      bestBreakfast: ["Inoda Coffee Main Store","Sizuya (Kyoto Station)","Le Petit Mec (Imadegawa)"],
      bestLunch: ["Omen Ginkakuji Main Store","Nanzenji Junsei","Nishiki Market","Kikunoi Honten"],
      bestDinner: ["Kikunoi Honten","Nanzenji Junsei","Omen Ginkakuji Main Store"],
      bestCocktails: ["Mr. Maurice's Rooftop Bar (Ace Hotel Kyoto)","The Garden Bar (Hotel The Mitsui Kyoto)"],
      bestBakeries: ["Le Petit Mec (Imadegawa)","Sizuya (Kyoto Station)"],
      bestCoffee: ["Inoda Coffee Main Store","Francois Kissa","Weekenders Coffee (Shinmachi)","Stumptown Coffee (Ace Hotel Kyoto)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Fushimi Inari Taisha": "Fushimi Inari Taisha 68 Fukakusa Yabunouchi-cho Fushimi-ku Kyoto",
      "Kiyomizu-dera": "Kiyomizu-dera 1-294 Kiyomizu Higashiyama-ku Kyoto",
      "Kinkaku-ji": "Kinkaku-ji 1 Kinkakuji-cho Kita-ku Kyoto",
      "Ginkaku-ji": "Ginkaku-ji 2 Ginkakuji-cho Sakyo-ku Kyoto",
      "Nijo Castle": "Nijo Castle 541 Nijo-jo-cho Nakagyo-ku Kyoto",
      "Kikunoi Honten": "Kikunoi Honten 459 Shimokawara-cho Higashiyama-ku Kyoto",
      "Nanzenji Junsei": "Nanzenji Junsei Nanzenji Monzen Sakyo-ku Kyoto",
      "Omen Ginkakuji Main Store": "Omen Ginkakuji 74 Jodoji Ishibashi-cho Sakyo-ku Kyoto",
      "Nishiki Market": "Nishiki Market 609 Nishidaimonji-cho Nakagyo-ku Kyoto",
      "Sizuya (Kyoto Station)": "Sizuya Kyoto Station 8-3 Higashishiokoji Takakura-cho Shimogyo-ku Kyoto",
      "Kyoto Botanical Gardens": "Kyoto Botanical Gardens Shimogamo Hangi-cho Sakyo-ku Kyoto",
      "The Garden Bar (Hotel The Mitsui Kyoto)": "The Garden Bar Hotel The Mitsui 284 Nijoaburanokoji-cho Nakagyo-ku Kyoto",
      "Ippodo Tea Kyoto Main Store": "Ippodo Tea Kyoto Main Store 52 Tokiwagi-cho Nakagyo-ku Kyoto",
      "Kitano Tenmangu": "Kitano Tenmangu Bakuro-cho Kamigyo-ku Kyoto",
      "Toji": "Toji 1 Kujo-cho Minami-ku Kyoto",
      "Mr. Maurice's Rooftop Bar (Ace Hotel Kyoto)": "Mr. Maurice's Rooftop Bar Ace Hotel 245-2 Kurumaya-cho Nakagyo-ku Kyoto",
      "Kyoto Tower": "Kyoto Tower 721-1 Higashishiokoji-cho Karasuma-dori Shimogyo-ku Kyoto",
      "Kyoto City KYOCERA Museum of Art": "Kyoto City KYOCERA Museum of Art 124 Okazaki Enshoji-cho Sakyo-ku Kyoto",
      "Kyoto National Museum": "Kyoto National Museum 527 Chaya-cho Higashiyama-ku Kyoto",
      "National Museum of Modern Art, Kyoto": "National Museum of Modern Art Kyoto 26-1 Okazaki Enshoji-cho Sakyo-ku Kyoto",
      "Francois Kissa": "Francois Kissa 184 Sendo-cho Nishikiyamachi-dori Shimogyo-ku Kyoto",
      "Tenryu-ji": "Tenryu-ji 68 Susukinobaba-cho Saga-Tenryuji Ukyo-ku Kyoto",
      "Yasaka Shrine": "Yasaka Shrine 625 Gion-machi Kitagawa Higashiyama-ku Kyoto",
      "Inoda Coffee Main Store": "Inoda Coffee Main Store 140 Doyu-cho Sakaimachi-dori Nakagyo-ku Kyoto",
      "Le Petit Mec (Imadegawa)": "Le Petit Mec Imadegawa 159 Motokitakoji-cho Kamigyo-ku Kyoto",
      "Weekenders Coffee (Shinmachi)": "Weekenders Coffee 189 Ubayanagi-cho Nakagyo-ku Kyoto",
      "Stumptown Coffee (Ace Hotel Kyoto)": "Stumptown Coffee Ace Hotel 245-2 Kurumaya-cho Nakagyo-ku Kyoto"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Temples, shrines, a castle, museums, a botanical garden, Nishiki Market, kaiseki and tofu dinners, kissaten, bakeries, coffee and hotel bars, each checked against its own website.";
      cityGuide.highlights = ["Fushimi Inari Taisha","Kiyomizu-dera","Kinkaku-ji","Kyoto National Museum"];
      cityGuide.tip = "Check closing days before you go: Kyoto National Museum and Kyoto City KYOCERA Museum of Art close on Mondays, Tenryu-ji is closed on October 29 and 30, 2026, and Kikunoi Honten closes on the first and third Tuesdays.";
    }
    data.destinationFacts[cityKey] = "Check closing days before you go: Kyoto National Museum and Kyoto City KYOCERA Museum of Art close on Mondays, Tenryu-ji is closed on October 29 and 30, 2026, and Kikunoi Honten closes on the first and third Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Temples, shrines, a castle, museums, a botanical garden, Nishiki Market, kaiseki and tofu dinners, kissaten, bakeries, coffee and hotel bars, each checked against its own website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays, some Tuesdays, Thursdays",
        "copy": "Kyoto National Museum closes on Mondays, and Kyoto City KYOCERA Museum of Art closes on Mondays except public holidays. Kikunoi Honten closes on the first and third Tuesdays, Omen Ginkakuji Main Store has irregular Thursday closures, and Ippodo's Kyoto Main Store closes on the 2nd Wednesday."
      },
      {
        "label": "Tickets",
        "value": "No advance ticket for Genji",
        "copy": "Kyoto National Museum says advance tickets aren't required for The Tale of Genji (October 6 to November 29, 2026). Kitano Tenmangu's Momiji Garden (October 31 to December 6, 2026) costs 1,500 yen for adults and 700 yen for children."
      },
      {
        "label": "Booking and walk-ins",
        "value": "Phone ahead or walk in",
        "copy": "Kikunoi Honten takes reservations by phone or through MY CONCIERGE and TABLE ALL, and Omen asks you to phone each store because it doesn't accept email bookings. Francois Kissa takes no reservations and is cash only."
      },
      {
        "label": "House rules",
        "value": "Age, luggage and ceremonies",
        "copy": "Francois Kissa doesn't admit children under school age, may set time limits when crowded and may refuse large luggage. Tenryu-ji says its buildings are occasionally closed without notice for special ceremonies."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Build your days around fixed closing days and the late-autumn night openings, and book Kyoto's kaiseki dinners well ahead.",
      intro: [
        "Kyoto's temples set their own calendars this autumn. Kiyomizu-dera opens at 6:00 a.m. and lists a special night viewing from November 21 to 30, 2026, open until 9:30 PM. Ginkaku-ji opens from 8:30 a.m. to 5:00 p.m. through November 30 and holds an autumn special viewing from November 1 to December 5, 2026. Kinkaku-ji opens from 9:00 a.m. to 5:00 p.m., and a September 2026 notice says you can pay cashless at its admission desk. In Arashiyama, Tenryu-ji opens from 8:30 a.m. to 5:00 p.m., but it is closed on October 29 and 30, 2026.",
        "At Toji, the first floor of the Five-Storied Pagoda opens specially from October 31 to December 13, 2026, with an autumn light-up and night admission to the Kondo and Kodo on the same dates. Its Treasure House exhibition runs until November 25. Kitano Tenmangu's gate opens from 7:00 to 17:00, and its Momiji Garden runs from October 31 to December 6, with evening illumination from November 13. Yasaka Shrine's office is staffed from 9:00 to 17:00. Fushimi Inari Taisha publishes no hours and asks you to come by public transport because parking nearby is very crowded.",
        "Kyoto National Museum's special exhibition, The Tale of Genji: Radiant Culture of the Japanese Imperial Court, runs October 6 to November 29, 2026, and you don't need an advance ticket. The museum closes on Mondays. In Okazaki, Kyoto City KYOCERA Museum of Art opens from 10:00 to 18:00 and shows Zen and Ghibli until December 6. The National Museum of Modern Art, Kyoto shows Reflections in Jewellery: Memory and Identity until January 17. Nijo Castle admits visitors from 8:45 a.m. to 4:00 p.m. and has shortened hours on December 6, 2026.",
        "For an early start, Inoda Coffee Main Store opens at 7:00 every day and serves morning coffee and breakfast. Sizuya's Kyoto Station shop also opens at 7:00, and Le Petit Mec's Imadegawa shop opens at 8:00. Francois Kissa takes cash only and no reservations. For dinner, Kikunoi Honten closes on the first and third Tuesdays, and Nanzenji Junsei takes last dinner orders at 19:00. Omen's Ginkakuji Main Store serves dinner from Friday to Sunday and on holidays. For drinks, Ace Hotel Kyoto has Mr. Maurice's Rooftop Bar, and Hotel The Mitsui Kyoto has The Garden Bar."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Kiyomizu-dera with Kyoto National Museum's Genji exhibition (to November 29, 2026), but not on a Monday, when the museum is closed."
        ],
        [
          "A slower morning",
          "Start at Inoda Coffee Main Store, which opens at 7:00 every day, then walk to Nishiki Market or Ippodo's Kaboku Tearoom, which opens at 10:00."
        ],
        [
          "Before booking",
          "Avoid Tenryu-ji on October 29 and 30, 2026, Kikunoi Honten on the first and third Tuesdays, and Ippodo's Kyoto Main Store on the 2nd Wednesday."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Sydney, Australia: source review of 2026-10-25 (docs/content-research/sydney-2026-10-25.md).
  {
    const cityKey = "Sydney, Australia";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Sydney Opera House","Art Gallery of New South Wales","Royal Botanic Garden Sydney","BridgeMuseum"],
      bestFirstTimers: ["Sydney Opera House","Royal Botanic Garden Sydney","Australian National Maritime Museum","BridgeMuseum"],
      bestRestaurants: ["Bennelong","Saint Peter","Firedoor","Ester"],
      bestBudget: ["Art Gallery of New South Wales","Australian Museum","Paddington Markets","Royal Botanic Garden Sydney"],
      bestLuxury: ["Bennelong","Aria","Saint Peter","Rockpool Bar & Grill (Sydney)"],
      bestCouples: ["Bennelong","Maybe Sammy","Dean & Nancy on 22","Sydney Observatory"],
      bestKids: ["Australian Museum","Australian National Maritime Museum","Sydney Observatory","Bondi Icebergs Pool"],
      bestSolo: ["Art Gallery of New South Wales","Single O (Surry Hills)","Paddington Markets"],
      bestUnique: ["Bondi Icebergs Pool","Sydney Observatory","BridgeMuseum","Sydney Fish Market"],
      bestBreakfast: ["bills (Surry Hills)","A.P Bread & Wine (Darlinghurst)","Skittle Lane (CBD)","Dean & Nancy on 22"],
      bestLunch: ["Saint Peter","Sydney Fish Market","Icebergs Dining Room and Bar","Firedoor"],
      bestDinner: ["Bennelong","Firedoor","Ester","Aria"],
      bestCocktails: ["Maybe Sammy","Dean & Nancy on 22","Bennelong"],
      bestBakeries: ["Bourke Street Bakery (Surry Hills)","Flour and Stone (Pantry)","A.P Bread & Wine (Darlinghurst)"],
      bestCoffee: ["Single O (Surry Hills)","Skittle Lane (CBD)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Sydney Opera House": "Sydney Opera House Bennelong Point Sydney",
      "Art Gallery of New South Wales": "Art Gallery of New South Wales Art Gallery Road Sydney",
      "Royal Botanic Garden Sydney": "Royal Botanic Garden Mrs Macquaries Road Sydney",
      "BridgeMuseum": "BridgeMuseum South-East Pylon Sydney Harbour Bridge The Rocks Sydney",
      "Australian National Maritime Museum": "Australian National Maritime Museum 2 Murray Street Darling Harbour Sydney",
      "Bennelong": "Bennelong Bennelong Point Sydney",
      "Saint Peter": "Saint Peter 161 Underwood St Paddington Sydney",
      "Firedoor": "Firedoor 23-33 Mary Street Surry Hills Sydney",
      "Ester": "Ester 46-52 Meagher St Chippendale Sydney",
      "Australian Museum": "Australian Museum 1 William Street Sydney",
      "Paddington Markets": "Paddington Markets 395 Oxford Street Paddington Sydney",
      "Aria": "Aria 1 Macquarie St Sydney",
      "Rockpool Bar & Grill (Sydney)": "Rockpool Bar & Grill 66 Hunter Street Sydney",
      "Maybe Sammy": "Maybe Sammy 115 Harrington Street The Rocks Sydney",
      "Dean & Nancy on 22": "Dean & Nancy on 22 2 Hunter Street Sydney",
      "Sydney Observatory": "Sydney Observatory 1003 Upper Fort Street Millers Point Sydney",
      "Bondi Icebergs Pool": "Bondi Icebergs Pool 1 Notts Avenue Bondi Beach Sydney",
      "Single O (Surry Hills)": "Single O 60-64 Reservoir St Surry Hills Sydney",
      "Sydney Fish Market": "Sydney Fish Market 1 Bridge Rd Glebe Sydney",
      "bills (Surry Hills)": "bills 355 Crown Street Surry Hills Sydney",
      "A.P Bread & Wine (Darlinghurst)": "A.P Bread & Wine 32 Burton St Darlinghurst Sydney",
      "Skittle Lane (CBD)": "Skittle Lane 40 King St Sydney",
      "Icebergs Dining Room and Bar": "Icebergs Dining Room and Bar 1 Notts Avenue Bondi Beach Sydney",
      "Bourke Street Bakery (Surry Hills)": "Bourke Street Bakery 633 Bourke Street Surry Hills Sydney",
      "Flour and Stone (Pantry)": "Flour and Stone 53 Riley Street Woolloomooloo Sydney"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Harbour landmarks, free galleries and museums, markets and an ocean pool, with breakfast spots, bakeries, coffee, dinners and cocktail bars checked against their own websites.";
      cityGuide.highlights = ["Sydney Opera House","Art Gallery of New South Wales","Royal Botanic Garden Sydney","Australian National Maritime Museum"];
      cityGuide.tip = "The Art Gallery of New South Wales stays open until 10pm on Wednesdays, while Sydney Observatory opens only Thursday to Sunday, so plan those two around your week.";
    }
    data.destinationFacts[cityKey] = "The Art Gallery of New South Wales stays open until 10pm on Wednesdays, while Sydney Observatory opens only Thursday to Sunday, so plan those two around your week.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Harbour landmarks, free galleries and museums, markets and an ocean pool, with breakfast spots, bakeries, coffee, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Check before you go",
        "copy": "Sydney Observatory opens Thursday to Sunday, and Flour and Stone's Pantry is closed Sundays. Skittle Lane's King Street café is closed at weekends."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead for tours",
        "copy": "Sydney Opera House tours are booked online, hold up to 35 people, and are forfeited if you arrive more than 5 minutes late. Firedoor takes reservations up to six months in advance."
      },
      {
        "label": "Walk-ins",
        "value": "Bars are flexible",
        "copy": "Maybe Sammy says \"Walk-Ins Always Welcome,\" as do Bennelong Bar and the bar at Saint Peter. Ester also welcomes same-day walk-ins."
      },
      {
        "label": "Rules",
        "value": "Bags and BYO",
        "copy": "On the Opera House tour, bags larger than A4 must be cloaked and suitcases cannot be stored. Ester is fully licensed and does not permit BYO."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Pair a booked Opera House tour with the free galleries and Botanic Garden nearby, then reserve dinner early, as Firedoor, Bennelong and Ester all take bookings.",
      intro: [
        "Start at the Sydney Opera House on Bennelong Point, where tours run daily, last about 60 minutes and begin at the Welcome Centre on the Lower Concourse. Arrive 15 minutes early, because you forfeit the tour if you are more than 5 minutes late. Tours are unavailable on 25 and 31 December 2026. In the evening, the program lists Strong is the New Pretty until 12 December and Copland Dance Episodes from 6 to 21 November 2026.",
        "From the Opera House you can walk into the Royal Botanic Garden Sydney on Mrs Macquaries Road, open daily from 7am to sunset. The Art Gallery of New South Wales on Art Gallery Road has free general entry and opens daily from 10am to 5pm, with Wednesdays running to 10pm. Nolan Origins is ticketed until 7 February 2027, and Takashi Murakami opens on 5 December 2026. The Australian Museum on William Street is also free and opens daily from 10am to 5pm.",
        "Across the city, the Australian National Maritime Museum on Murray Street offers free entry to its permanent galleries. Sydney Observatory in Millers Point opens Thursday to Sunday while heritage works continue. The BridgeMuseum sits in the Harbour Bridge's South-East Pylon, reached by the lift or stairs from Cumberland Street. At Bondi, Icebergs' ocean pool opens from 6am on weekdays but closes on Thursdays for cleaning, weather permitting.",
        "For food, bills in Surry Hills opens all day, every day, and A.P Bread & Wine in Darlinghurst stays open late Wednesday to Saturday. Sydney Fish Market in Glebe is open daily from 7am. For dinner, you can book Bennelong, Firedoor, Aria or Ester; Ester's last service of 2026 is 23 December. Maybe Sammy in The Rocks opens Tuesday to Saturday from 5pm, and Dean & Nancy on 22 serves aperitivo from late afternoon."
      ],
      summaryCards: [
        [
          "First visit",
          "Book a Sydney Opera House tour, then walk through the Royal Botanic Garden to the free Art Gallery of New South Wales."
        ],
        [
          "A slower morning",
          "Have breakfast at bills in Surry Hills or coffee at Single O, then browse Paddington Markets, open Saturdays from 10am."
        ],
        [
          "Before booking",
          "Check closing days: Sydney Observatory opens Thursday to Sunday only, and Ester closes from 24 December until 5 January 2027."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Venice, Italy: source review of 2026-10-25 (docs/content-research/venice-2026-10-25.md).
  {
    const cityKey = "Venice, Italy";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Basilica di San Marco","Palazzo Ducale","Gallerie dell'Accademia","Biennale Arte 2026 (Giardini and Arsenale)"],
      bestFirstTimers: ["Basilica di San Marco","Palazzo Ducale","Museo Correr","Peggy Guggenheim Collection"],
      bestRestaurants: ["Trattoria Antiche Carampane","Ristorante Al Covo","Venissa (Mazzorbo)","Cantina Do Spade"],
      bestBudget: ["Cantina Do Spade","Scuola Grande di San Rocco","Trattoria alla Madonna"],
      bestLuxury: ["Venissa (Mazzorbo)","Gran Caffè Quadri","Teatro La Fenice","Caffè Florian"],
      bestCouples: ["Teatro La Fenice","Caffè Florian","Venissa (Mazzorbo)","Experimental Cocktail Club Venice (Il Palazzo Experimental)"],
      bestKids: ["Museo di Storia Naturale","Torre dell'Orologio","Biennale Arte 2026 (Giardini and Arsenale)"],
      bestSolo: ["Fondazione Querini Stampalia","Museo Fortuny","Ca' Pesaro","Cafè Mariona (Querini Stampalia)"],
      bestUnique: ["Torre dell'Orologio","Scuola Grande di San Rocco","Palazzo Mocenigo","Trattoria Da Romano (Burano)"],
      bestBreakfast: ["Caffè Florian","Gran Caffè Quadri"],
      bestLunch: ["Trattoria Da Romano (Burano)","Cantina Do Spade","Ristorante Al Covo"],
      bestDinner: ["Trattoria Antiche Carampane","Ristorante Al Covo","Venissa (Mazzorbo)","Trattoria alla Madonna"],
      bestCocktails: ["Experimental Cocktail Club Venice (Il Palazzo Experimental)","Gran Caffè Quadri"],
      bestBakeries: [],
      bestCoffee: ["Caffè Florian","Gran Caffè Quadri","Cafè Mariona (Querini Stampalia)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Basilica di San Marco": "Basilica di San Marco Piazza San Marco 328 Venice",
      "Palazzo Ducale": "Palazzo Ducale Piazzetta San Marco 1 Venice",
      "Gallerie dell'Accademia": "Gallerie dell'Accademia Campo della Carità Dorsoduro 1050 Venice",
      "Biennale Arte 2026 (Giardini and Arsenale)": "Biennale Giardini Viale Trento 1260 Venice",
      "Museo Correr": "Museo Correr Piazza San Marco 52 Venice",
      "Peggy Guggenheim Collection": "Peggy Guggenheim Collection Dorsoduro 701 Venice",
      "Trattoria Antiche Carampane": "Trattoria Antiche Carampane San Polo 1911 Venice",
      "Ristorante Al Covo": "Ristorante Al Covo Castello 3968 Venice",
      "Venissa (Mazzorbo)": "Venissa Fondamenta Santa Caterina 3 Mazzorbo Venice",
      "Cantina Do Spade": "Cantina Do Spade Calle Do Spade 859 Venice",
      "Scuola Grande di San Rocco": "Scuola Grande di San Rocco Campo San Rocco San Polo 3052 Venice",
      "Trattoria alla Madonna": "Trattoria alla Madonna Calle della Madonna 594 San Polo Venice",
      "Gran Caffè Quadri": "Gran Caffè Quadri Piazza San Marco 121 Venice",
      "Teatro La Fenice": "Teatro La Fenice San Marco 1965 Venice",
      "Caffè Florian": "Caffè Florian Piazza San Marco 57 Venice",
      "Experimental Cocktail Club Venice (Il Palazzo Experimental)": "Il Palazzo Experimental Dorsoduro 1410 Venice",
      "Museo di Storia Naturale": "Museo di Storia Naturale Santa Croce 1730 Venice",
      "Torre dell'Orologio": "Torre dell'Orologio Piazza San Marco Venice",
      "Fondazione Querini Stampalia": "Fondazione Querini Stampalia Castello 5252 Venice",
      "Museo Fortuny": "Museo Fortuny San Marco 3958 Venice",
      "Ca' Pesaro": "Ca' Pesaro Santa Croce 2076 Venice",
      "Cafè Mariona (Querini Stampalia)": "Cafè Mariona Querini Stampalia Castello 5252 Venice",
      "Palazzo Mocenigo": "Palazzo Mocenigo Santa Croce 1992 Venice",
      "Trattoria Da Romano (Burano)": "Trattoria Da Romano Via Baldassarre Galuppi 221 Burano Venice"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Basilica, palaces, civic museums, the 2026 Art Biennale and island trattorias, with cafés, dinners and a cocktail bar checked against their own websites.";
      cityGuide.highlights = ["Basilica di San Marco","Palazzo Ducale","Gallerie dell'Accademia","Peggy Guggenheim Collection"];
      cityGuide.tip = "Check closing days before you plan the day: the Peggy Guggenheim Collection is closed on Tuesdays, and the Biennale Arte is closed on Mondays except 16 November.";
    }
    data.destinationFacts[cityKey] = "Check closing days before you plan the day: the Peggy Guggenheim Collection is closed on Tuesdays, and the Biennale Arte is closed on Mondays except 16 November.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Basilica, palaces, civic museums, the 2026 Art Biennale and island trattorias, with cafés, dinners and a cocktail bar checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Tuesdays, Mondays, midweek",
        "copy": "The Peggy Guggenheim Collection closes on Tuesdays, Fondazione Querini Stampalia and the Biennale Arte on Mondays (the Biennale opens Monday 16 November). Antiche Carampane closes Sundays and Mondays, Al Covo Tuesdays and Wednesdays, and Da Romano on Burano on Tuesdays."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead for tours and the Biennale",
        "copy": "Torre dell'Orologio is visited only on booked guided tours that meet at the Museo Correr ticket office, and late arrivals of over 15 minutes are excluded. Biennale tickets are sold online and need a reservation."
      },
      {
        "label": "Timing and late openings",
        "value": "Winter hours from 1 November",
        "copy": "Palazzo Ducale is open 09:00-19:00 to 31 October, then 09:00-18:00 from 1 November, with last entry an hour before closing. Ca' Pesaro and Museo Fortuny stay open until 20:00 from 20 to 22 November 2026."
      },
      {
        "label": "Bags and age rules",
        "value": "No bulky luggage; under-6 limits",
        "copy": "Palazzo Ducale bars suitcases and trolleys, and large bags, backpacks and umbrellas go in its free storage. Children under 6 are not allowed on Torre dell'Orologio tours but enter the Biennale free."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book the Torre dell'Orologio tour and Biennale entry ahead, and plan restaurant dinners around their midweek closing days.",
      intro: [
        "Your Venice visit can start in Piazza San Marco, where the Basilica di San Marco sells online tickets for the Basilica, the Pala d'Oro, the Museo and Loggia dei Cavalli, the Campanile and evening visits. Next door, Palazzo Ducale is open 09:00-19:00 until 31 October and 09:00-18:00 from 1 November, with last entry an hour before closing. Its 'Ospiti a Palazzo' display runs to 23 March 2027. The Museo Correr shows Bizhan Bassiri and 'Spiral Economy. Charrière and Canova' until 22 November 2026.",
        "Across the Grand Canal in Dorsoduro, the Gallerie dell'Accademia has Leiko Ikemura's 'TransLucent' until 22 November. Its 2026 news also reports that the Miracoli della Vera Croce are back on view. The Peggy Guggenheim Collection is open daily 10 am-6 pm except Tuesdays, and 'Fucina degli Angeli', on twentieth-century artistic glass, opens on 14 November 2026. Ca' Rezzonico shows 'Nel segno di Venezia' until 11 January 2027. The Biennale Arte 2026, 'In Minor Keys', closes on 22 November and is open 10 am-6 pm in its final weeks.",
        "In Santa Croce, Ca' Pesaro shows Jenny Saville until 22 November 2026, and Palazzo Mocenigo has 'Un merletto per Venezia 2026' until 6 January 2027. The Museo di Storia Naturale is an easy family stop, with 'Dietro le quinte 2026' until 15 November. In San Marco, Museo Fortuny shows Erwin Wurm's 'Dreamers', and both Fortuny and Ca' Pesaro open until 20:00 from 20 to 22 November. Scuola Grande di San Rocco is open daily 9:30-17:30, and at La Fenice the opera season opens with 'Fedora' from 13 November.",
        "For coffee, Gran Caffè Quadri on the Piazza opens daily from 9:30 to midnight, and Caffè Florian's menu covers breakfast and afternoon tea. Book dinner ahead. Antiche Carampane charges €35 per cover for late cancellations and closes Sundays and Mondays, and Al Covo serves dinner 19:30-22:00 from Thursday to Monday. On the islands, Venissa on Mazzorbo takes online bookings, and Da Romano on Burano serves lunch every day except Tuesday."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Basilica di San Marco and Palazzo Ducale with a booked Torre dell'Orologio tour that starts from the Museo Correr ticket office."
        ],
        [
          "A slower morning",
          "Have a coffee at Gran Caffè Quadri from 9:30, then visit Fondazione Querini Stampalia, open Tuesday to Sunday from 10:00 with its Cafè Mariona."
        ],
        [
          "Before booking",
          "Biennale tickets need an online reservation, and Antiche Carampane charges €35 per cover for cancellations after noon on the day."
        ]
      ],
      trust: "All 24 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Bangkok, Thailand: source review of 2026-10-25 (docs/content-research/bangkok-2026-10-25.md).
  {
    const cityKey = "Bangkok, Thailand";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Grand Palace","Jim Thompson House","Bangkok National Museum","Mahanakhon SkyWalk"],
      bestFirstTimers: ["Grand Palace","Queen Sirikit Museum of Textiles","ICONSIAM","Asiatique The Riverfront"],
      bestRestaurants: ["nahm (COMO Metropolitan Bangkok)","Bo.lan","Sorn","Le Du"],
      bestBudget: ["Thipsamai (Pratoopee)","Bangkok National Museum","Holey Artisan Bakery (Soi 31)","Warehouse 30"],
      bestLuxury: ["Mezzaluna (lebua, State Tower)","Sorn","The Siam","Sky Bar (lebua, State Tower)"],
      bestCouples: ["Sky Bar (lebua, State Tower)","Vesper","Asiatique The Riverfront","nahm (COMO Metropolitan Bangkok)"],
      bestKids: ["SEA LIFE Bangkok (Siam Paragon)","ICONSIAM","One Bangkok","Jim Thompson House"],
      bestSolo: ["MOCA Bangkok","Jim Thompson Art Center","Warehouse 30","Sarnies & Friends (Talat Noi)"],
      bestUnique: ["Sarnies & Friends (Talat Noi)","Warehouse 30","Queen Sirikit Museum of Textiles","Jim Thompson Art Center"],
      bestBreakfast: ["Sarnies Bangkok (Charoen Krung 44)","Sarnies & Friends (Talat Noi)","Sarnies Sukhumvit (Soi 37)","Holey Artisan Bakery (Soi 31)"],
      bestLunch: ["Thipsamai (Pratoopee)","Bo.lan","Sarnies Sourdough (Charoen Krung 42/1)","The Siam"],
      bestDinner: ["nahm (COMO Metropolitan Bangkok)","Le Du","Mezzaluna (lebua, State Tower)","Bo.lan"],
      bestCocktails: ["Vesper","Sky Bar (lebua, State Tower)","The Siam"],
      bestBakeries: ["Sarnies Sourdough (Charoen Krung 42/1)","Holey Artisan Bakery (Soi 31)"],
      bestCoffee: ["Sarnies Sourdough (Charoen Krung 42/1)","Sarnies & Friends (Talat Noi)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Grand Palace": "Grand Palace Na Phra Lan Road Bangkok",
      "Jim Thompson House": "Jim Thompson House 6 Soi Kasemsan 2 Rama 1 Road Bangkok",
      "Bangkok National Museum": "Bangkok National Museum 4 Na Phra That Road Bangkok",
      "Mahanakhon SkyWalk": "Mahanakhon SkyWalk 114 Narathiwas Ratchanakarin Road Bangkok",
      "Queen Sirikit Museum of Textiles": "Queen Sirikit Museum of Textiles Grand Palace Phra Nakhon Bangkok",
      "ICONSIAM": "ICONSIAM 299 Charoen Nakhon Road Bangkok",
      "Asiatique The Riverfront": "Asiatique The Riverfront 2194 Charoenkrung Road Bangkok",
      "nahm (COMO Metropolitan Bangkok)": "nahm COMO Metropolitan South Sathorn Road Bangkok",
      "Bo.lan": "Bo.lan 24 Soi Sukhumvit 53 Bangkok",
      "Sorn": "Sorn 56 Soi Sukhumvit 26 Bangkok",
      "Le Du": "Le Du 399/3 Silom Soi 7 Bangkok",
      "Thipsamai (Pratoopee)": "Thipsamai 313 Mahachai Road Bangkok",
      "Holey Artisan Bakery (Soi 31)": "Holey Artisan Bakery 245 Sukhumvit 31 Bangkok",
      "Warehouse 30": "Warehouse 30 52-60 Captain Bush Lane Bangkok",
      "Mezzaluna (lebua, State Tower)": "Mezzaluna State Tower 1055 Silom Road Bangkok",
      "The Siam": "The Siam 3/2 Thanon Khao Dusit Bangkok",
      "Sky Bar (lebua, State Tower)": "Sky Bar State Tower 1055 Silom Road Bangkok",
      "Vesper": "Vesper 10/15 Convent Road Bangkok",
      "SEA LIFE Bangkok (Siam Paragon)": "SEA LIFE Bangkok Siam Paragon Rama 1 Road Bangkok",
      "One Bangkok": "One Bangkok Wireless Road Bangkok",
      "MOCA Bangkok": "MOCA Bangkok 499 Kamphaengphet 6 Road Bangkok",
      "Jim Thompson Art Center": "Jim Thompson Art Center 6 Soi Kasemsan 2 Rama 1 Road Bangkok",
      "Sarnies & Friends (Talat Noi)": "Sarnies & Friends The Corner House 951 Charoen Krung Road Bangkok",
      "Sarnies Bangkok (Charoen Krung 44)": "Sarnies 101 Charoen Krung 44 Bangkok",
      "Sarnies Sukhumvit (Soi 37)": "Sarnies 1/39 Soi Sukhumvit 37 Bangkok",
      "Sarnies Sourdough (Charoen Krung 42/1)": "Sarnies Sourdough 55/14 Charoen Krung 42/1 Bangkok"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Palace museums, galleries, a river mall and night market, rooftop and cocktail bars, Thai tasting menus, pad thai and Charoen Krung breakfast cafés, each checked against its own website.";
      cityGuide.highlights = ["Grand Palace","Jim Thompson House","Bangkok National Museum","Mahanakhon SkyWalk"];
      cityGuide.tip = "Thipsamai's Pratoopee shop closes every Tuesday and MOCA Bangkok closes on Mondays, so keep those days for the Grand Palace, which opens daily with tickets sold 8:30 AM to 3:30 PM.";
    }
    data.destinationFacts[cityKey] = "Thipsamai's Pratoopee shop closes every Tuesday and MOCA Bangkok closes on Mondays, so keep those days for the Grand Palace, which opens daily with tickets sold 8:30 AM to 3:30 PM.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Palace museums, galleries, a river mall and night market, rooftop and cocktail bars, Thai tasting menus, pad thai and Charoen Krung breakfast cafés, each checked against its own website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon / Tue",
        "copy": "MOCA Bangkok is open Tuesday to Sunday and closed Mondays, as is Sarnies & Friends in Talat Noi. Thipsamai's Pratoopee branch closes every Tuesday."
      },
      {
        "label": "Tickets",
        "value": "Gate times",
        "copy": "Grand Palace tickets cost 500 baht and are sold only from 8:30 AM to 3:30 PM. At Jim Thompson House, adults pay 250 baht and you can enter only with a guide."
      },
      {
        "label": "Walk-in or book",
        "value": "Varies",
        "copy": "Sky Bar at lebua takes walk-ins only, with no reservations. Mezzaluna, one floor up, needs a deposit through TableCheck, and changes are free up to 72 hours ahead."
      },
      {
        "label": "Dress and age",
        "value": "Rooftops",
        "copy": "Sky Bar is smart casual and refuses athletic wear, swimwear, sleeveless shirts for men and flip-flops. Mezzaluna requires collared shirts and long trousers for men, and both admit children aged 7 and above with an adult."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Start at the Grand Palace early because ticket sales stop at 3:30 PM, and book Bangkok's tasting-menu dinners ahead while keeping rooftop drinks at Sky Bar flexible as a walk-in.",
      intro: [
        "You can start in Rattanakosin at the Grand Palace, which opens daily from 8:30 AM to 4:30 PM. Tickets cost 500 baht and are sold only until 3:30 PM. Inside the palace grounds, the Queen Sirikit Museum of Textiles opens daily from 09.00 to 16.30, with last admission at 15.30. Its exhibition \"Royal Court Textiles of Siam\" runs until April 30, 2027. The Bangkok National Museum on Na Phra That Road posts a monthly opening calendar on its own site, so check it before you go.",
        "In Pathum Wan, Jim Thompson House is open every day from 10:00 AM to 5:00 PM, and you can enter the house only with a guide. Adults pay 250 baht. Next door, the Jim Thompson Art Center is showing \"And Still, Another After\" from 10 October 2026 to 29 March 2027. For contemporary art further north, MOCA Bangkok opens Tuesday to Sunday from 10.00 am to 06.00 pm. Adult tickets cost 400 baht, and children under 13 enter free.",
        "For views, Mahanakhon SkyWalk opens from 10 AM to midnight, last access 11 PM, and tickets range from 500 to 1,200 baht depending on the time. Sky Bar on the 64th floor of State Tower takes walk-ins only and admits children aged 7 and above with an adult. On the river, Asiatique The Riverfront opens every day from 11:00 to midnight. With children, you can visit SEA LIFE Bangkok in the basement of Siam Paragon, open 10.00 to 20.00. One Bangkok's \"Fortune Teller\" exhibition runs to 15 November.",
        "For food, Thipsamai's original Pratoopee shop on Mahachai Road serves pad thai from 9:00AM to midnight and closes every Tuesday. nahm at COMO Metropolitan serves dinner daily from 6.00pm, and Bo.lan on Sukhumvit 53 takes bookings through TableCheck. Sorn offers its Seasonal Menu on selected dates, including 26–28 October and 16–19 November 2026. For breakfast along Charoen Krung, Sarnies Bangkok opens daily at 08:00 and Sarnies Sourdough at 07:30. Sarnies Sourdough bakes its sourdough in-house and roasts its own coffee."
      ],
      summaryCards: [
        [
          "First visit",
          "Arrive at the Grand Palace before ticket sales end at 3:30 PM, then visit the Queen Sirikit Museum of Textiles inside the palace grounds, which takes last admission at 15.30."
        ],
        [
          "A slower morning",
          "Have breakfast from 08:00 at Sarnies & Friends in The Corner House in Talat Noi, open Tuesday to Sunday, then take the guided tour of Jim Thompson House from 10:00 AM."
        ],
        [
          "Before booking",
          "Mezzaluna takes a deposit through TableCheck with free changes up to 72 hours ahead, while Sky Bar downstairs takes walk-ins only."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Seoul, South Korea: source review of 2026-10-25 (docs/content-research/seoul-2026-10-25.md).
  {
    const cityKey = "Seoul, South Korea";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Gyeongbokgung","Changdeokgung","National Museum of Korea","Leeum Museum of Art"],
      bestFirstTimers: ["Gyeongbokgung","National Palace Museum of Korea","Deoksugung","Seoul Museum of Art (Seosomun)"],
      bestRestaurants: ["La Yeon (The Shilla Seoul)","Jungsik","Continental (The Shilla Seoul)","Hadongkwan (Myeongdong)"],
      bestBudget: ["Hadongkwan (Myeongdong)","Seoul Botanic Park","Starfield Library (Starfield COEX Mall)","Fritz Coffee (Wonseo)"],
      bestLuxury: ["La Yeon (The Shilla Seoul)","Continental (The Shilla Seoul)","Jungsik","The Distillers Library (The Shilla Seoul)"],
      bestCouples: ["The Library (The Shilla Seoul)","1914 Lounge & Bar (Josun Palace)","Deoksugung","Seoul Arts Center"],
      bestKids: ["Seoul Children's Grand Park","SEA LIFE COEX Aquarium","Seoul Botanic Park","Starfield Library (Starfield COEX Mall)"],
      bestSolo: ["MMCA Seoul","Seoul Museum of Craft Art","Fritz Coffee (Wonseo)","Starfield Library (Starfield COEX Mall)"],
      bestUnique: ["Seodaemun Prison History Hall","Seoul Museum of Craft Art","Leeum Museum of Art","Changdeokgung"],
      bestBreakfast: ["The Parkview (The Shilla Seoul)","Hadongkwan (Myeongdong)","Fritz Coffee (Dohwa)","Pastry Boutique (The Shilla Seoul)"],
      bestLunch: ["Hadongkwan (Myeongdong)","La Yeon (The Shilla Seoul)","Continental (The Shilla Seoul)","The Parkview (The Shilla Seoul)"],
      bestDinner: ["La Yeon (The Shilla Seoul)","Continental (The Shilla Seoul)","Jungsik","The Parkview (The Shilla Seoul)"],
      bestCocktails: ["The Library (The Shilla Seoul)","1914 Lounge & Bar (Josun Palace)","The Distillers Library (The Shilla Seoul)"],
      bestBakeries: ["Pastry Boutique (The Shilla Seoul)"],
      bestCoffee: ["Fritz Coffee (Dohwa)","Fritz Coffee (Wonseo)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Gyeongbokgung": "Gyeongbokgung 161 Sajik-ro Jongno-gu Seoul",
      "Changdeokgung": "Changdeokgung 99 Yulgok-ro Jongno-gu Seoul",
      "National Museum of Korea": "National Museum of Korea 137 Seobinggo-ro Yongsan-gu Seoul",
      "Leeum Museum of Art": "Leeum Museum of Art 60-16 Itaewon-ro 55-gil Yongsan-gu Seoul",
      "National Palace Museum of Korea": "National Palace Museum of Korea 12 Hyoja-ro Jongno-gu Seoul",
      "Deoksugung": "Deoksugung 99 Sejong-daero Jung-gu Seoul",
      "Seoul Museum of Art (Seosomun)": "Seoul Museum of Art 61 Deoksugung-gil Jung-gu Seoul",
      "La Yeon (The Shilla Seoul)": "La Yeon The Shilla Seoul 249 Dongho-ro Jung-gu Seoul",
      "Jungsik": "Jungsik 11 Seolleung-ro 158-gil Gangnam-gu Seoul",
      "Continental (The Shilla Seoul)": "Continental The Shilla Seoul 249 Dongho-ro Jung-gu Seoul",
      "Hadongkwan (Myeongdong)": "Hadongkwan Myeongdong 1-ga 10-4 Jung-gu Seoul",
      "Seoul Botanic Park": "Seoul Botanic Park 161 Magokdong-ro Gangseo-gu Seoul",
      "Starfield Library (Starfield COEX Mall)": "Starfield Library COEX Mall 513 Yeongdong-daero Gangnam-gu Seoul",
      "Fritz Coffee (Wonseo)": "Fritz Coffee Wonseo 83 Yulgok-ro Jongno-gu Seoul",
      "The Distillers Library (The Shilla Seoul)": "The Distillers Library The Shilla Seoul 249 Dongho-ro Jung-gu Seoul",
      "The Library (The Shilla Seoul)": "The Library The Shilla Seoul 249 Dongho-ro Jung-gu Seoul",
      "1914 Lounge & Bar (Josun Palace)": "1914 Lounge & Bar Josun Palace 231 Teheran-ro Gangnam-gu Seoul",
      "Seoul Arts Center": "Seoul Arts Center 2406 Nambusunhwan-ro Seocho-gu Seoul",
      "Seoul Children's Grand Park": "Seoul Children's Grand Park 216 Neungdong-ro Gwangjin-gu Seoul",
      "SEA LIFE COEX Aquarium": "SEA LIFE COEX Aquarium 513 Yeongdong-daero Gangnam-gu Seoul",
      "MMCA Seoul": "MMCA Seoul 30 Samcheong-ro Jongno-gu Seoul",
      "Seoul Museum of Craft Art": "Seoul Museum of Craft Art 4 Yulgok-ro 3-gil Jongno-gu Seoul",
      "Seodaemun Prison History Hall": "Seodaemun Prison History Hall 251 Tongil-ro Seodaemun-gu Seoul",
      "The Parkview (The Shilla Seoul)": "The Parkview The Shilla Seoul 249 Dongho-ro Jung-gu Seoul",
      "Fritz Coffee (Dohwa)": "Fritz Coffee Dohwa 17 Saechang-ro 2-gil Mapo-gu Seoul",
      "Pastry Boutique (The Shilla Seoul)": "Pastry Boutique The Shilla Seoul 249 Dongho-ro Jung-gu Seoul"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Joseon palaces, national and city museums, parks and an aquarium, with hotel dining rooms, a gomtang house, cocktail lounges, a hotel bakery and coffee bars checked against their own websites.";
      cityGuide.highlights = ["Gyeongbokgung","Changdeokgung","National Museum of Korea","Leeum Museum of Art"];
      cityGuide.tip = "Plan museum days around closures: Seoul Museum of Art closes every Monday, Seodaemun Prison History Hall closes Mondays and moves to winter hours of 09:30–17:00 from November, and the National Palace Museum of Korea closes on the last Monday of each month.";
    }
    data.destinationFacts[cityKey] = "Plan museum days around closures: Seoul Museum of Art closes every Monday, Seodaemun Prison History Hall closes Mondays and moves to winter hours of 09:30–17:00 from November, and the National Palace Museum of Korea closes on the last Monday of each month.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Joseon palaces, national and city museums, parks and an aquarium, with hotel dining rooms, a gomtang house, cocktail lounges, a hotel bakery and coffee bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and month-end Mondays",
        "copy": "Seoul Museum of Art (Seosomun) and Seodaemun Prison History Hall close every Monday, while the National Palace Museum of Korea closes on the last Monday of the month."
      },
      {
        "label": "Late openings",
        "value": "Wednesday and Saturday evenings",
        "copy": "The National Museum of Korea and MMCA Seoul both stay open until 21:00 on Wednesdays and Saturdays. The National Palace Museum of Korea runs to 21:00 on Saturdays, and the Seoul Museum of Craft Art opens until 21:00 on Tuesdays, Wednesdays and Fridays to Sundays through 30 November."
      },
      {
        "label": "Tickets and booking",
        "value": "Deposits and advance windows",
        "copy": "La Yeon and Continental at The Shilla Seoul take a KRW 50,000 per person deposit, with Continental bookings opening on the first day of the month two months ahead. SEA LIFE COEX Aquarium sells tickets online and says online buyers can skip the queue."
      },
      {
        "label": "Rules",
        "value": "Dress codes and age limits",
        "copy": "La Yeon and Continental recommend smart casual dress and limit the main dining hall to guests aged 6 and above. 1914 Lounge & Bar at Josun Palace has a casual dress code, turns away training pants, pajamas, bathrobes and slippers, and takes bar orders only from 18:00."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Check each palace's notice board before you go, because access to parts of Gyeongbokgung, Changdeokgung and Deoksugung is restricted this autumn.",
      intro: [
        "Seoul's royal palaces are the obvious place to start: Gyeongbokgung on Sajik-ro, Changdeokgung on Yulgok-ro and Deoksugung on Sejong-daero. Each palace posts notices of works and restricted areas on its own site, so check them before you go. This autumn, fire-suppression works limit access to Changdeokgung's government offices area, and outer wall works at Deoksugung run to 19 November. Gyeongbokgung is also running a royal culture academy at Heungbokjeon. Next to Gyeongbokgung, the National Palace Museum of Korea opens until 21:00 on Saturdays and closes on the last Monday of each month.",
        "Several of the city's major museums stay open late, so you can spend a day at the palaces and see art in the evening. The National Museum of Korea opens until 21:00 on Wednesdays and Saturdays, and its special exhibition \"Tour of National Treasures\" runs until 29 November. MMCA Seoul, on Samcheong-ro, keeps the same late nights and is showing Do Ho Suh until 9 February 2027 and the Korea Artist Prize 2026 until 6 December. At Leeum Museum of Art in Hannam, Koo Jeong A's exhibition runs until 27 December.",
        "For a quieter or more unusual day, you can visit Seodaemun Prison History Hall, which closes on Mondays and switches to 09:30–17:00 hours from November. The Seoul Museum of Craft Art near Anguk opens until 21:00 on most evenings through 30 November, with Equinox running until March 2027. If you are travelling with children, Seoul Children's Grand Park is open from 05:00 to 22:00 every day, and its autumn festival runs until 7 November, although its botanical garden is closed until the second half of 2027.",
        "For dining, The Shilla Seoul puts several options under one roof. The Parkview serves breakfast from 06:00, La Yeon on the 23rd floor serves Korean cuisine at lunch and dinner, and Pastry Boutique is open from 07:00 to 22:00. Hadongkwan's Myeongdong branch serves gomtang from 07:00 to 16:00 and closes on Sundays. For coffee, you can visit Fritz Coffee in Dohwa or Wonseo. For drinks, try The Library at The Shilla or 1914 Lounge & Bar on the 24th floor of Josun Palace."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Gyeongbokgung with the National Palace Museum of Korea next door, but check the palace notices for areas closed this autumn."
        ],
        [
          "A slower morning",
          "Start with breakfast at The Parkview from 06:00 or coffee at Fritz Coffee (Wonseo), which opens daily at 09:00."
        ],
        [
          "Before booking",
          "La Yeon and Continental at The Shilla Seoul take a KRW 50,000 per person deposit and admit only guests aged 6 and above to the main dining hall."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Dubai, United Arab Emirates: source review of 2026-10-25 (docs/content-research/dubai-2026-10-25.md).
  {
    const cityKey = "Dubai, United Arab Emirates";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Dubai Frame","Jameel Arts Centre","Alserkal Avenue","Dubai Miracle Garden"],
      bestFirstTimers: ["Dubai Frame","Dubai Miracle Garden","Dubai Safari Park","CÉ LA VI Dubai"],
      bestRestaurants: ["Orfali Bros (Wasl 51 Mall)","3 Fils (Jumeirah Fishing Harbour)","Trèsind Studio","Zuma (DIFC)"],
      bestBudget: ["Jameel Arts Centre","Alserkal Avenue","3 Fils (Jumeirah Fishing Harbour)","RAW Coffee Company (Al Quoz)"],
      bestLuxury: ["Trèsind Studio","CÉ LA VI Dubai","Zuma (DIFC)","Mimi Kakushi"],
      bestCouples: ["CÉ LA VI Dubai","Mimi Kakushi","Al Fanar Seafood Market (Al Seef)","Trèsind Studio"],
      bestKids: ["Dubai Safari Park","The Green Planet","Dubai Miracle Garden","Dubai Frame"],
      bestSolo: ["Jameel Arts Centre","Alserkal Avenue","RAW Coffee Company (Al Quoz)","3 Fils (Jumeirah Fishing Harbour)"],
      bestUnique: ["The Green Planet","Alserkal Avenue","Jameel Arts Centre","Al Fanar Seafood Market (Al Seef)"],
      bestBreakfast: ["Al Fanar Restaurant & Cafe (Dubai Festival City)","Comptoir 102","RAW Coffee Company (Al Quoz)"],
      bestLunch: ["Zuma (DIFC)","3 Fils (Jumeirah Fishing Harbour)","Al Fanar Restaurant & Cafe (Dubai Festival City)","Comptoir 102"],
      bestDinner: ["Orfali Bros (Wasl 51 Mall)","Trèsind Studio","Zuma (DIFC)","Al Fanar Seafood Market (Al Seef)"],
      bestCocktails: ["Honeycomb Hi-Fi","Mimi Kakushi","CÉ LA VI Dubai","Zuma (DIFC)"],
      bestBakeries: [],
      bestCoffee: ["RAW Coffee Company (Al Quoz)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Dubai Frame": "Dubai Frame Zabeel Park Gate 4 Dubai",
      "Jameel Arts Centre": "Jameel Arts Centre Jaddaf Waterfront Dubai",
      "Alserkal Avenue": "Alserkal Avenue 17th Street Al Quoz 1 Dubai",
      "Dubai Miracle Garden": "Dubai Miracle Garden Al Barsha South 3 Dubai",
      "Dubai Safari Park": "Dubai Safari Park Al Warqa 5 Hatta Road Dubai",
      "CÉ LA VI Dubai": "CÉ LA VI Address Sky View Downtown Dubai",
      "Orfali Bros (Wasl 51 Mall)": "Orfali Bros Wasl 51 Mall Dubai",
      "3 Fils (Jumeirah Fishing Harbour)": "3 Fils Jumeirah Fishing Harbour Al Urouba Street Dubai",
      "Trèsind Studio": "Trèsind Studio St. Regis Gardens Palm Jumeirah Dubai",
      "Zuma (DIFC)": "Zuma Gate Village 06 DIFC Dubai",
      "RAW Coffee Company (Al Quoz)": "RAW Coffee Company Al Manara Road Al Quoz 1 Dubai",
      "Mimi Kakushi": "Mimi Kakushi Four Seasons Resort Jumeirah Beach Road Dubai",
      "Al Fanar Seafood Market (Al Seef)": "Al Fanar Seafood Market Al Seef Dubai Creek Dubai",
      "The Green Planet": "The Green Planet City Walk Al Wasl Dubai",
      "Al Fanar Restaurant & Cafe (Dubai Festival City)": "Al Fanar Restaurant Dubai Festival City Mall Dubai",
      "Comptoir 102": "Comptoir 102 102 Beach Road Jumeirah 1 Dubai",
      "Honeycomb Hi-Fi": "Honeycomb Hi-Fi Pullman Dubai Downtown Dubai"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Dubai's Frame, art districts, gardens and safari park, with breakfast cafés, dinners and cocktail bars checked against their own websites.";
      cityGuide.highlights = ["Dubai Frame","Jameel Arts Centre","Dubai Miracle Garden","Dubai Safari Park"];
      cityGuide.tip = "Jameel Arts Centre is free but its site lists Tuesday as a closing day, so plan Al Jaddaf and Alserkal Avenue visits for another day.";
    }
    data.destinationFacts[cityKey] = "Jameel Arts Centre is free but its site lists Tuesday as a closing day, so plan Al Jaddaf and Alserkal Avenue visits for another day.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Dubai's Frame, art districts, gardens and safari park, with breakfast cafés, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Check before you go",
        "copy": "Jameel Arts Centre's site lists Tuesday as closed, Trèsind Studio lists hours Monday to Saturday only, and Orfali Bros serves dinner Wednesday to Monday."
      },
      {
        "label": "Tickets",
        "value": "Book online",
        "copy": "Dubai Frame sells tickets online (adults AED 50, children 3-12 AED 20, under 3 free), and Dubai Miracle Garden sends tickets as a WhatsApp QR code scanned at the gate. Dubai Safari Park passes start at AED 50."
      },
      {
        "label": "Walk-ins",
        "value": "Some, not all",
        "copy": "3 Fils at Jumeirah Fishing Harbour says no reservations are needed, while Zuma, Orfali Bros, Mimi Kakushi and Honeycomb Hi-Fi take bookings through SevenRooms."
      },
      {
        "label": "Rules",
        "value": "Bags, food, age",
        "copy": "Dubai Frame bans food, drinks, pets and smoking, and large bags and strollers must be left at the Gate 4 counter; under-12s need an adult. Zuma's lounge is for over-21s in the evening, and Dubai Miracle Garden bans drones and outside food."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book timed sights like Dubai Frame and the evening restaurants ahead, and keep Tuesdays away from Jameel Arts Centre.",
      intro: [
        "You can get a strong first read of Dubai at Dubai Frame in Zabeel Park, which the site says is supervised by Dubai Municipality. It opens daily from 8:00 am to 9:00 pm, including weekends and public holidays, with hours that may change during Ramadan and holidays. Tickets are sold online at AED 50 for adults and AED 20 for children aged 3 to 12. Leave large bags and strollers at the Gate 4 counter, and note that food, drinks, pets and smoking are not allowed inside.",
        "For art, Jameel Arts Centre on the Jaddaf Waterfront is free and open-access. Its Artist's Rooms for Walid Siti, Lulua Alyahya and Shezad Dawood run from 20 September 2026 to 31 January 2027, and a Salah Elmur exhibition opens on 31 October 2026 and runs to 14 March 2027. The site lists Tuesday as closed. Across town in Al Quoz, Alserkal Avenue is open every day from 10 a.m. to 7 p.m., though individual venues set their own hours, and its food weekend runs 31 October to 1 November.",
        "Families have outdoor options. Dubai Safari Park in Al Warqa 5 opened Season 8 on 12 October 2026 and runs until 31 May 2027, open 9:00 AM to 6:00 PM with last entry at 5:00 PM. Dubai Miracle Garden in Al Barsha South 3 opens 9:00 AM to 9:00 PM daily, bans drones and outside food, and lists a concert on 21 November 2026. The Green Planet at City Walk opens every day from 10 AM to 6 PM.",
        "For food, 3 Fils at Jumeirah Fishing Harbour takes walk-ins from noon, and Orfali Bros at Wasl 51 Mall serves dinner Wednesday to Monday with set menus from AED 295. Trèsind Studio at St. Regis Gardens on the Palm runs two seatings, at 6:00 PM and 9:15 PM. For an early start, RAW Coffee Company's Al Quoz café opens daily at 7:30am. After dark, you can try Mimi Kakushi, open until 2AM, or CÉ LA VI, 54 floors up at Address Sky View."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at Dubai Frame in Zabeel Park, then see the free exhibitions at Jameel Arts Centre on any day but Tuesday."
        ],
        [
          "A slower morning",
          "Take a 7:30am coffee at RAW Coffee Company in Al Quoz, then walk Alserkal Avenue once it opens at 10 a.m."
        ],
        [
          "Before booking",
          "Reserve Trèsind Studio, Zuma or Orfali Bros ahead, but walk straight into 3 Fils from noon."
        ]
      ],
      trust: "All 17 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // San Francisco, United States: source review of 2026-10-25 (docs/content-research/san-francisco-2026-10-25.md).
  {
    const cityKey = "San Francisco, United States";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Golden Gate Bridge","Alcatraz Island","SFMOMA","Ferry Building Marketplace"],
      bestFirstTimers: ["Alcatraz Island","Golden Gate Bridge","Cable cars (Powell & Market)","Ferry Building Marketplace"],
      bestRestaurants: ["Zuni Café","State Bird Provisions","Foreign Cinema","Tadich Grill"],
      bestBudget: ["Golden Gate Park","San Francisco Botanical Garden","Ferry Building Marketplace","Golden Gate Bridge"],
      bestLuxury: ["State Bird Provisions","House of Prime Rib","True Laurel"],
      bestCouples: ["Foreign Cinema","Japanese Tea Garden","Conservatory of Flowers","Smuggler's Cove"],
      bestKids: ["California Academy of Sciences","PIER 39","Cable cars (Powell & Market)","Walt Disney Family Museum"],
      bestSolo: ["SFMOMA","Ritual Coffee (Valencia St)","Hog Island Oyster Co. (Ferry Building)","Golden Gate Park"],
      bestUnique: ["Alcatraz Island","Japanese Tea Garden","Conservatory of Flowers","Buena Vista Cafe"],
      bestBreakfast: ["Tartine Manufactory","Plow","Outerlands"],
      bestLunch: ["Hog Island Oyster Co. (Ferry Building)","Tadich Grill","Zuni Café","Tartine Manufactory"],
      bestDinner: ["Zuni Café","State Bird Provisions","Foreign Cinema","House of Prime Rib"],
      bestCocktails: ["Trick Dog","Smuggler's Cove","True Laurel","Comstock Saloon"],
      bestBakeries: ["Tartine Bakery (Guerrero St)","b. patisserie","Tartine Manufactory"],
      bestCoffee: ["Ritual Coffee (Valencia St)","Ritual Coffee (Hayes Valley)","Philz Coffee (Noe Valley)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Golden Gate Bridge": "Golden Gate Bridge Welcome Center San Francisco",
      "Alcatraz Island": "Alcatraz Landing Pier 33 Embarcadero San Francisco",
      "SFMOMA": "SFMOMA 151 Third Street San Francisco",
      "Ferry Building Marketplace": "Ferry Building Marketplace 1 Ferry Building San Francisco",
      "Cable cars (Powell & Market)": "Powell and Market cable car turnaround San Francisco",
      "Zuni Café": "Zuni Cafe 1658 Market Street San Francisco",
      "State Bird Provisions": "State Bird Provisions 1529 Fillmore Street San Francisco",
      "Foreign Cinema": "Foreign Cinema 2534 Mission Street San Francisco",
      "Tadich Grill": "Tadich Grill 240 California Street San Francisco",
      "Golden Gate Park": "Golden Gate Park McLaren Lodge 501 Stanyan Street San Francisco",
      "San Francisco Botanical Garden": "San Francisco Botanical Garden 1199 9th Avenue San Francisco",
      "House of Prime Rib": "House of Prime Rib 1906 Van Ness Avenue San Francisco",
      "True Laurel": "True Laurel 753 Alabama Street San Francisco",
      "Japanese Tea Garden": "Japanese Tea Garden 75 Hagiwara Tea Garden Drive San Francisco",
      "Conservatory of Flowers": "Conservatory of Flowers 100 John F Kennedy Drive San Francisco",
      "Smuggler's Cove": "Smuggler's Cove 650 Gough Street San Francisco",
      "California Academy of Sciences": "California Academy of Sciences 55 Music Concourse Drive San Francisco",
      "PIER 39": "PIER 39 The Embarcadero and Beach Street San Francisco",
      "Walt Disney Family Museum": "Walt Disney Family Museum 104 Montgomery Street Presidio San Francisco",
      "Ritual Coffee (Valencia St)": "Ritual Coffee 1026 Valencia Street San Francisco",
      "Hog Island Oyster Co. (Ferry Building)": "Hog Island Oyster Co 1 Ferry Building San Francisco",
      "Buena Vista Cafe": "Buena Vista Cafe 2765 Hyde Street San Francisco",
      "Tartine Manufactory": "Tartine Manufactory 595 Alabama Street San Francisco",
      "Plow": "Plow 1299 18th Street San Francisco",
      "Outerlands": "Outerlands 4001 Judah Street San Francisco",
      "Trick Dog": "Trick Dog 3010 20th Street San Francisco",
      "Comstock Saloon": "Comstock Saloon 155 Columbus Avenue San Francisco",
      "Tartine Bakery (Guerrero St)": "Tartine Bakery 600 Guerrero Street San Francisco",
      "b. patisserie": "b. patisserie 2821 California Street San Francisco",
      "Ritual Coffee (Hayes Valley)": "Ritual Coffee 432b Octavia Street San Francisco",
      "Philz Coffee (Noe Valley)": "Philz Coffee 4298 24th Street San Francisco"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "The bridge, Alcatraz, museums and Golden Gate Park gardens, with breakfast spots, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
      cityGuide.highlights = ["Golden Gate Bridge","Alcatraz Island","SFMOMA","California Academy of Sciences"];
      cityGuide.tip = "Book Alcatraz well ahead, since the National Park Service says it frequently sells out in advance, and avoid planning SFMOMA or the Conservatory of Flowers for a Wednesday, when both are closed.";
    }
    data.destinationFacts[cityKey] = "Book Alcatraz well ahead, since the National Park Service says it frequently sells out in advance, and avoid planning SFMOMA or the Conservatory of Flowers for a Wednesday, when both are closed.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "The bridge, Alcatraz, museums and Golden Gate Park gardens, with breakfast spots, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Wednesdays and Mondays",
        "copy": "SFMOMA and the Conservatory of Flowers both close on Wednesdays, and Zuni Café is closed on Mondays. b. patisserie is closed Mondays and Tuesdays, and the Walt Disney Family Museum opens Thursday to Sunday only."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead",
        "copy": "The National Park Service says Alcatraz can sell out a month or more ahead in summer and near holidays, and the Japanese Tea Garden requires every visitor to reserve a time slot. Zuni Café and Foreign Cinema take reservations up to 60 days ahead, with Foreign Cinema releasing dates daily at 12:00 pm."
      },
      {
        "label": "Walk-ins",
        "value": "No booking needed",
        "copy": "Hog Island Oyster Co. at the Ferry Building takes no reservations, and Outerlands seats Friday breakfast/lunch and weekend brunch on a walk-in basis only, for parties of up to 8. Trick Dog says reservations are not required, and Comstock Saloon welcomes walk-ins."
      },
      {
        "label": "Rules",
        "value": "Prepay, 21+, sidewalks",
        "copy": "From 8 a.m. to 8 p.m. you must prepay your cable car fare before boarding at Powell & Market, Bay & Taylor or Hyde & Beach, and bicycles are not allowed on board. Thursday NightLife at the California Academy of Sciences is for ages 21+, and pedestrians on the Golden Gate Bridge may use the east sidewalk only."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book Alcatraz and timed garden entry first, then build your days around Wednesday museum closures and walk-in breakfasts.",
      intro: [
        "San Francisco rewards a little planning. The National Park Service says Alcatraz is open every day except Christmas, Thanksgiving and New Year's Day, with ferries leaving Piers 31-33 about every half hour from 8:45am, and that the island frequently sells out in advance, so book through the contracted ferry operator first. On the Golden Gate Bridge, you walk the east sidewalk only; from early November, under Pacific Standard Time, pedestrian gates are open 5:00 am to 6:30 pm. The bridge Welcome Center is open daily from 9:00 a.m. to 6:00 p.m.",
        "For art, SFMOMA at 151 Third St is closed on Wednesdays and stays open until 8 p.m. on Thursdays; visitors 18 and younger get in free. Klee Behind the Mask runs until April 18, 2027, Feel the Beat: Dance in Photographs until February 28, 2027, and Sarah Sze: Forever is Composed of Nows opens November 21, 2026. In Golden Gate Park, the California Academy of Sciences recommends buying tickets in advance for weekends and holidays, and its Thursday NightLife evenings are for ages 21 and over.",
        "The park's gardens run on their own rules. The Japanese Tea Garden requires a timed reservation, offers a free hour on Monday, Wednesday and Friday mornings from 9am to 10am, and moves last entry to 4:30pm from November to February. The Conservatory of Flowers is closed on Wednesdays and free on the first Tuesday of the month, while the San Francisco Botanical Garden is free every day from 7:30 to 9am. The Botanical Garden lists Lightscape from November 20 through January 3 for the 2026 winter season.",
        "For food, you can walk in for breakfast at Plow from 7AM on weekdays, at Tartine Manufactory from 8am daily, or at Outerlands, where weekend brunch is walk-in only. The Ferry Building is open daily 6:00am to 10:00pm, with a farmers market on Tuesday, Thursday and Saturday, and Hog Island Oyster Co. there takes no reservations. For dinner, Zuni Café is closed on Mondays, and Tadich Grill now takes reservations. Smuggler's Cove is open seven days a week from 5:00PM, and Trick Dog says reservations are not required."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair a pre-booked Alcatraz ferry from Piers 31-33 with a walk on the Golden Gate Bridge's east sidewalk and a prepaid cable car ride from Powell & Market."
        ],
        [
          "A slower morning",
          "Start with a walk-in breakfast at Tartine Manufactory or Plow, then catch the San Francisco Botanical Garden's free 7:30 to 9am entry or the Japanese Tea Garden's free 9am hour on Monday, Wednesday or Friday."
        ],
        [
          "Before booking",
          "Check that you aren't planning SFMOMA or the Conservatory of Flowers for a Wednesday, and reserve Zuni Café or Foreign Cinema up to 60 days ahead."
        ]
      ],
      trust: "All 31 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Madrid, Spain: source review of 2026-10-25 (docs/content-research/madrid-2026-10-25.md).
  {
    const cityKey = "Madrid, Spain";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Palacio Real de Madrid","Museo Nacional Thyssen-Bornemisza","Museo Nacional Centro de Arte Reina Sofía","Jardines de El Buen Retiro"],
      bestFirstTimers: ["Palacio Real de Madrid","Jardines de El Buen Retiro","Mercado de San Miguel","Chocolatería San Ginés"],
      bestRestaurants: ["Casa Lucio","Lhardy","Taberna La Bola","Casa Alberto"],
      bestBudget: ["Jardines de El Buen Retiro","Museo Sorolla","Museo del Romanticismo","Mercado de San Antón"],
      bestLuxury: ["DiverXO","Lhardy","Corral de la Morería"],
      bestCouples: ["Azotea del Círculo de Bellas Artes","Corral de la Morería","Real Jardín Botánico","Casa Lucio"],
      bestKids: ["Museo del Ferrocarril","Jardines de El Buen Retiro","Real Jardín Botánico","Chocolatería San Ginés"],
      bestSolo: ["Museo Lázaro Galdiano","Museo Sorolla","Café Comercial","Mercado de San Antón"],
      bestUnique: ["Museo Sorolla","Corral de la Morería","Museo del Romanticismo","Museo Chicote"],
      bestBreakfast: ["Federal Café (Comendadoras)","La Mallorquina (Puerta del Sol)","Casa Dani (Mercado de la Paz)","Café de Oriente"],
      bestLunch: ["Casa Dani (Mercado de la Paz)","Taberna La Bola","Mercado de San Miguel","Casa Alberto"],
      bestDinner: ["DiverXO","Casa Lucio","Lhardy","Casa Alberto"],
      bestCocktails: ["Salmon Guru","Museo Chicote","Azotea del Círculo de Bellas Artes"],
      bestBakeries: ["La Mallorquina (Puerta del Sol)","Lhardy"],
      bestCoffee: ["Federal Café (Comendadoras)","Café Comercial","Café de Oriente"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Palacio Real de Madrid": "Palacio Real de Madrid Calle de Bailén Madrid",
      "Museo Nacional Thyssen-Bornemisza": "Museo Thyssen-Bornemisza Paseo del Prado 8 Madrid",
      "Museo Nacional Centro de Arte Reina Sofía": "Museo Reina Sofía Calle Santa Isabel 52 Madrid",
      "Jardines de El Buen Retiro": "Jardines de El Buen Retiro Plaza de la Independencia 7 Madrid",
      "Mercado de San Miguel": "Mercado de San Miguel Plaza de San Miguel Madrid",
      "Chocolatería San Ginés": "Chocolatería San Ginés Pasadizo de San Ginés 5 Madrid",
      "Casa Lucio": "Casa Lucio Cava Baja 35 Madrid",
      "Lhardy": "Lhardy Carrera de San Jerónimo 8 Madrid",
      "Taberna La Bola": "Taberna La Bola Calle Bola 5 Madrid",
      "Casa Alberto": "Casa Alberto Calle de las Huertas 18 Madrid",
      "Museo Sorolla": "Museo Sorolla Calle Zurbano 68 Madrid",
      "Museo del Romanticismo": "Museo del Romanticismo Calle San Mateo 13 Madrid",
      "Mercado de San Antón": "Mercado de San Antón Calle Augusto Figueroa 24 Madrid",
      "DiverXO": "DiverXO Calle Padre Damián 23 Madrid",
      "Corral de la Morería": "Corral de la Morería Calle Morería 17 Madrid",
      "Azotea del Círculo de Bellas Artes": "Azotea Círculo de Bellas Artes Calle Alcalá 42 Madrid",
      "Real Jardín Botánico": "Real Jardín Botánico Plaza de Murillo 2 Madrid",
      "Museo del Ferrocarril": "Museo del Ferrocarril Paseo de las Delicias 61 Madrid",
      "Museo Lázaro Galdiano": "Museo Lázaro Galdiano Calle Serrano 122 Madrid",
      "Café Comercial": "Café Comercial Glorieta de Bilbao 7 Madrid",
      "Museo Chicote": "Museo Chicote Gran Vía 12 Madrid",
      "Federal Café (Comendadoras)": "Federal Café Plaza de las Comendadoras 9 Madrid",
      "La Mallorquina (Puerta del Sol)": "La Mallorquina Puerta del Sol 8 Madrid",
      "Casa Dani (Mercado de la Paz)": "Casa Dani Mercado de la Paz Calle Ayala 28 Madrid",
      "Café de Oriente": "Café de Oriente Plaza de Oriente 2 Madrid",
      "Salmon Guru": "Salmon Guru Calle Echegaray 21 Madrid"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Royal palace, Paseo del Prado museums, smaller house museums, parks and markets, with breakfast cafés, classic Madrid dining and cocktail bars checked against their own websites.";
      cityGuide.highlights = ["Palacio Real de Madrid","Museo Nacional Thyssen-Bornemisza","Museo Nacional Centro de Arte Reina Sofía","Jardines de El Buen Retiro"];
      cityGuide.tip = "Check closing days before you plan museum time: the Reina Sofía is closed on Tuesdays, while the Lázaro Galdiano, Sorolla and Romanticismo museums are closed on Mondays.";
    }
    data.destinationFacts[cityKey] = "Check closing days before you plan museum time: the Reina Sofía is closed on Tuesdays, while the Lázaro Galdiano, Sorolla and Romanticismo museums are closed on Mondays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Royal palace, Paseo del Prado museums, smaller house museums, parks and markets, with breakfast cafés, classic Madrid dining and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "The Museo Lázaro Galdiano, Museo Sorolla, Museo del Romanticismo and Casa Alberto are closed on Mondays, and the Reina Sofía is closed on Tuesdays. Casa Lucio closes for all of August."
      },
      {
        "label": "Tickets and booking",
        "value": "Timed slots and far-ahead tables",
        "copy": "The Palacio Real sells tickets by date and time slot, with a €0.77 online booking fee per ticket and entry ending an hour before closing. DiverXO releases each date 90 days ahead at midnight and takes a €450 per person deposit."
      },
      {
        "label": "Walk-in and queues",
        "value": "No bookings at Salmon Guru",
        "copy": "Salmon Guru says it works without reservations and seats you as soon as possible. The Círculo de Bellas Artes rooftop sells tickets only at reception from 14:00 to 16:00 and after 21:00, and a ticket does not guarantee a seat in its café area."
      },
      {
        "label": "Rules",
        "value": "Bags and ages",
        "copy": "The Palacio Real recommends not bringing backpacks, suitcases or large bags during its improvement works. Corral de la Morería does not admit children under 7, Museo Chicote bookings are for over-18s only, and DiverXO is not recommended for children under 10."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Group the Paseo del Prado museums around their free slots and closing days, and book DiverXO, the Palacio Real and the flamenco show ahead while leaving the cocktail bars for walk-ins.",
      intro: [
        "Start at the Palacio Real de Madrid on Calle de Bailén. From October to March, Patrimonio Nacional opens it from 10:00 to 18:00 Monday to Saturday and 10:00 to 16:00 on Sunday, and entry ends one hour before closing. You buy tickets for a date and time slot, and a self-guided visit costs €18 at the basic rate. During its improvement works, the palace recommends you leave backpacks, suitcases and large bags behind. It can also close for official events, and it closes all day on 25 December and from 15:00 on 24 and 31 December.",
        "On the Paseo del Prado, the Thyssen-Bornemisza at number 8 offers free entry to its collection on Mondays from 12:00 to 16:00. On Saturdays it stays open until 23:00, with free entry from 21:00 to the temporary exhibitions on the ground floor and level -1. Guided visits to El universo freudiano de Dalí are listed into January 2027. The Reina Sofía, at Calle Santa Isabel 52, is closed on Tuesdays and charges €12 for general admission. You still need a ticket for its free hours. Its Palacio de Cristal in El Retiro is closed for building improvements and is wrapped in Andrea Canepa's Fardo until 1 January 2027.",
        "For a quieter day, the Museo Lázaro Galdiano at Calle Serrano 122 is closed on Mondays and costs €8, and you can get in free Tuesday to Friday from 14:00 to 15:00. The Museo Sorolla is free, but while the Casa Museo is closed for rehabilitation, visits are limited to the new extension building at Calle Zurbano 68. El Retiro opens at 6:00 and closes at 22:00 from October to March, and you can rent rowboats on the Estanque Grande. The Real Jardín Botánico closes at 17:30 from November.",
        "For food, DiverXO at Calle Padre Damián 23 serves only a tasting menu and opens Tuesday to Friday. Casa Lucio on Cava Baja serves lunch and dinner every day but closes for all of August. Taberna La Bola on Calle Bola marks 156 years with a 45€ anniversary menu. For drinks, Salmon Guru on Calle Echegaray takes no reservations and opens daily from 16:00. Museo Chicote on Gran Vía takes bookings only for over-18s. Chocolatería San Ginés says it is open every day of the year."
      ],
      summaryCards: [
        [
          "First visit",
          "Book a timed slot at the Palacio Real, then walk to the Thyssen-Bornemisza or the Reina Sofía, remembering that the Reina Sofía is closed on Tuesdays."
        ],
        [
          "A slower morning",
          "Have breakfast at Federal Café on Plaza de las Comendadoras from 09:00, then visit the Real Jardín Botánico, which opens at 10:00."
        ],
        [
          "Before booking",
          "DiverXO releases tables 90 days ahead with a €450 per person deposit, while Salmon Guru takes no reservations at all."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Copenhagen, Denmark: source review of 2026-10-25 (docs/content-research/copenhagen-2026-10-25.md).
  {
    const cityKey = "Copenhagen, Denmark";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Tivoli Gardens","Rosenborg Castle","Rundetaarn (The Round Tower)","National Museum of Denmark"],
      bestFirstTimers: ["Tivoli Gardens","National Museum of Denmark","Ny Carlsberg Glyptotek","Torvehallerne"],
      bestRestaurants: ["Restaurant Schønnemann","Kødbyens Fiskebar","Barr","Geranium"],
      bestBudget: ["Torvehallerne","Reffen","Thorvaldsens Museum","GRØD (Torvehallerne)"],
      bestLuxury: ["Noma","Geranium","Barr"],
      bestCouples: ["Louisiana Museum of Modern Art","Kunsthal Charlottenborg","Ruby","Geranium"],
      bestKids: ["Copenhagen Zoo","Experimentarium","Tivoli Gardens","Botanical Garden (Natural History Museum of Denmark)"],
      bestSolo: ["Designmuseum Danmark","Copenhagen Contemporary","Coffee Collective (Jægersborggade)","Thorvaldsens Museum"],
      bestUnique: ["Copenhagen Contemporary","Rundetaarn (The Round Tower)","Reffen","Mikkeller Bar Viktoriagade"],
      bestBreakfast: ["Mad & Kaffe (Vesterbro)","GRØD (Torvehallerne)","Juno the Bakery"],
      bestLunch: ["Restaurant Schønnemann","Torvehallerne","Reffen","Kødbyens Fiskebar"],
      bestDinner: ["Barr","Kødbyens Fiskebar","Noma","Geranium"],
      bestCocktails: ["Lidkoeb","Ruby"],
      bestBakeries: ["Juno the Bakery","Andersen Bakery (Islands Brygge)"],
      bestCoffee: ["Coffee Collective (Jægersborggade)","Mad & Kaffe (Vesterbro)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Tivoli Gardens": "Tivoli Gardens Vesterbrogade 3 Copenhagen",
      "Rosenborg Castle": "Rosenborg Castle Øster Voldgade 4A Copenhagen",
      "Rundetaarn (The Round Tower)": "Rundetaarn Købmagergade 52A Copenhagen",
      "National Museum of Denmark": "National Museum of Denmark Ny Vestergade 10 Copenhagen",
      "Ny Carlsberg Glyptotek": "Ny Carlsberg Glyptotek Dantes Plads 7 Copenhagen",
      "Torvehallerne": "Torvehallerne Frederiksborggade 21 Copenhagen",
      "Restaurant Schønnemann": "Restaurant Schønnemann Hauser Plads 16 Copenhagen",
      "Kødbyens Fiskebar": "Kødbyens Fiskebar Flæsketorvet 100 Copenhagen",
      "Barr": "Barr Strandgade 93 Copenhagen",
      "Geranium": "Geranium Per Henrik Lings Allé 4 Copenhagen",
      "Reffen": "Reffen Refshalevej 167A Copenhagen",
      "Thorvaldsens Museum": "Thorvaldsens Museum Bertel Thorvaldsens Plads 2 Copenhagen",
      "GRØD (Torvehallerne)": "GRØD Torvehallerne Linnésgade 17 Copenhagen",
      "Noma": "Noma Refshalevej 96 Copenhagen",
      "Louisiana Museum of Modern Art": "Louisiana Museum of Modern Art Gl. Strandvej 13 Humlebæk",
      "Kunsthal Charlottenborg": "Kunsthal Charlottenborg Nyhavn 2 Copenhagen",
      "Ruby": "Ruby Nybrogade 10 Copenhagen",
      "Copenhagen Zoo": "Copenhagen Zoo Roskildevej 32 Frederiksberg",
      "Experimentarium": "Experimentarium Tuborg Havnevej 7 Hellerup",
      "Botanical Garden (Natural History Museum of Denmark)": "Botanical Garden Øster Voldgade 5-7 Copenhagen",
      "Designmuseum Danmark": "Designmuseum Danmark Bredgade 68 Copenhagen",
      "Copenhagen Contemporary": "Copenhagen Contemporary Refshalevej 173A Copenhagen",
      "Coffee Collective (Jægersborggade)": "Coffee Collective Jægersborggade 57 Copenhagen",
      "Mikkeller Bar Viktoriagade": "Mikkeller Bar Viktoriagade 8 Copenhagen",
      "Mad & Kaffe (Vesterbro)": "Mad & Kaffe Sønder Boulevard 68 Copenhagen",
      "Juno the Bakery": "Juno the Bakery Århusgade 48 Copenhagen",
      "Lidkoeb": "Lidkoeb Vesterbrogade 72B Copenhagen",
      "Andersen Bakery (Islands Brygge)": "Andersen Bakery Thorshavnsgade 26 Copenhagen"
    };
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = "Royal castles, museums, food markets and a harbourside art district, with breakfast spots, lunch and dinner tables, bakeries, coffee and cocktail bars checked against their own websites.";
      cityGuide.highlights = ["Tivoli Gardens","Rosenborg Castle","National Museum of Denmark","Louisiana Museum of Modern Art"];
      cityGuide.tip = "Save Mondays for the National Museum of Denmark, which opens daily 10:00–17:00, because Ny Carlsberg Glyptotek, Louisiana, Copenhagen Contemporary and Thorvaldsens Museum close on Mondays, as does Rosenborg Castle from 2 November.";
    }
    data.destinationFacts[cityKey] = "Save Mondays for the National Museum of Denmark, which opens daily 10:00–17:00, because Ny Carlsberg Glyptotek, Louisiana, Copenhagen Contemporary and Thorvaldsens Museum close on Mondays, as does Rosenborg Castle from 2 November.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Royal castles, museums, food markets and a harbourside art district, with breakfast spots, lunch and dinner tables, bakeries, coffee and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays (Charlottenborg: Tuesdays)",
        "copy": "Ny Carlsberg Glyptotek, Louisiana, Copenhagen Contemporary and Thorvaldsens Museum are closed on Mondays, and Rosenborg Castle is closed Mondays from 2 November. Kunsthal Charlottenborg closes on Tuesdays instead."
      },
      {
        "label": "Tickets",
        "value": "Buy online to save",
        "copy": "Rosenborg Castle saves you 10 kroner per ticket bought online and Ny Carlsberg Glyptotek 10%, while the National Museum of Denmark charges 135 DKK online against 150 DKK. Louisiana needs no time slot, and online tickets are valid for a visit within a year."
      },
      {
        "label": "Free entry",
        "value": "Wednesdays and under-18s",
        "copy": "Thorvaldsens Museum is free for everyone on Wednesdays, Kunsthal Charlottenborg from 17.00 on Wednesdays, and Ny Carlsberg Glyptotek on the last Wednesday of each month. Under-18s enter free at the National Museum of Denmark, Louisiana and Rundetaarn."
      },
      {
        "label": "Rules",
        "value": "Age, food and access",
        "copy": "Ruby has a minimum entry age of 21, and Rosenborg Castle allows no food or drink in the castle or Treasury. Rundetaarn has no lift and says it is not well suited to wheelchairs and pushchairs."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Build each day around one museum's opening hours, since closing days differ, and book the tasting-menu dinners well ahead.",
      intro: [
        "Copenhagen's historic sights are easy to combine on foot. The National Museum of Denmark at Ny Vestergade 10 opens every day from 10:00 to 17:00; adult tickets cost 150 DKK, or 135 DKK online, they stay valid for a year, and under-18s go free. Rosenborg Castle on Øster Voldgade opens Tuesday to Sunday from 10:00 to 16:00 from 2 November, and buying online saves you 10 kroner a ticket. Rundetaarn on Købmagergade stays open until 21:00 on Mondays and Tuesdays through the winter, when its observatory runs telescope evenings, and adult entry costs 60 DKK.",
        "Several art museums close on Mondays, so plan around that. Ny Carlsberg Glyptotek on Dantes Plads opens Tuesday to Sunday, until 21:00 on Thursdays, and is free on the last Wednesday of each month; its exhibition The Power of Fashion in the Roman Empire runs until 29 March 2027. Thorvaldsens Museum is free for everyone on Wednesdays. Designmuseum Danmark on Bredgade shows Henrik Vibskov: The Exhibition until 21 February 2027, and Kunsthal Charlottenborg at Nyhavn 2, which closes on Tuesdays, has three exhibitions running to the same date.",
        "Louisiana Museum of Modern Art at Gl. Strandvej 13 in Humlebæk needs no time slot. It opens Tuesday to Friday until 22:00 and weekends until 18:00, and you need a ticket even for its café, shop or sculpture park. Its Tracey Emin exhibition runs until 18 April 2027. Back in the city, Refshaleøen pairs Reffen's street food, open daily from 11.30, with Copenhagen Contemporary, which opens until 21:00 on Thursdays and shows Camille Henrot's Paper Planes until 31 December 2026 alongside a permanent James Turrell work.",
        "For food, Torvehallerne on Frederiksborggade serves breakfast and bakery items from 07:00, and the GRØD porridge stall there opens at 7:00 on weekdays. Restaurant Schønnemann on Hauser Plads serves lunch daily from 11:30, runs a Christmas season from 12 November to 23 December 2026, then closes until 5 January 2027. Geranium takes bookings up to three months ahead, with a 1,500 DKK deposit per guest. For drinks, Lidkoeb on Vesterbrogade is closed on Sundays, and Ruby on Nybrogade admits guests aged 21 and over."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the National Museum of Denmark, open daily 10:00–17:00, with Rundetaarn and Rosenborg Castle, both a short walk from Torvehallerne."
        ],
        [
          "A slower morning",
          "Start with porridge at GRØD in Torvehallerne or a pastry from Juno the Bakery on Århusgade, then the Botanical Garden, open from 8:30."
        ],
        [
          "Before booking",
          "Check Monday closures at Glyptotek, Louisiana and Copenhagen Contemporary, and book Geranium up to three months ahead with its 1,500 DKK per-guest deposit."
        ]
      ],
      trust: "All 28 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
})();
