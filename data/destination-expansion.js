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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, a royal palace, a medieval church and a riverside lookout, with breakfast cafés, bakeries, a food hall, dinners and a cocktail bar checked against their own websites.";
    cityGuide.highlights = ["Rijksmuseum","Anne Frank House","Royal Palace Amsterdam","Stedelijk Museum"];
    cityGuide.tip = "Book the Anne Frank House early: tickets are sold only online for a set time slot, released every Tuesday at 10am for visits six weeks later, and none are sold at the door.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Parks, a free ferry, the tram, observation decks and museums, with breakfast spots, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
    cityGuide.highlights = ["Central Park","Empire State Building","9/11 Memorial & Museum","The High Line"];
    cityGuide.tip = "Plan museum days around Tuesdays, when the Whitney and the Frick are both closed, and book the Empire State Building ahead because every visit needs a timed reservation.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Temples, shrines, museums, observation decks and gardens, plus breakfast cafés, noodle lunches, dinners and cocktail bars, each checked against its own or its public operator's website.";
    cityGuide.highlights = ["Senso-ji","Meiji Jingu","Tokyo National Museum","Tokyo Skytree"];
    cityGuide.tip = "Watch the closing days: the Tokyo National Museum closes on Mondays, the Imperial Palace East Gardens on Mondays and Fridays, and Bar High Five on Sundays and national holidays.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Gaudí landmarks, the cathedral, Picasso and Catalan art museums, a market, tapas bars, seafront rice, a cocktail bar, a pastry shop and specialty coffee, each checked against its own website.";
    cityGuide.highlights = ["Sagrada Família","Park Güell","Casa Batlló","Museu Picasso"];
    cityGuide.tip = "Park Güell tickets must be bought in advance online and hold for 30 minutes after your slot, while Museu Picasso and MNAC publish no Monday opening, so put the museums on other days.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Vatican and Roman landmarks, civic museums, a park walk and the Appian Way park, with trattorias, pizza-by-the-slice, a bakery, a food hall and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Vatican Museums","St. Peter's Basilica","Pantheon","Trevi Fountain"];
    cityGuide.tip = "The Vatican Museums are closed on Sundays except the last Sunday of the month, when entry is free from 9:00 to 14:00 (final entry 12:30), so plan a weekday visit or arrive early on a last Sunday.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Belém monuments, the castle, museums and the aquarium, with bakeries, cafés, restaurants and a cocktail bar checked against their own websites.";
    cityGuide.highlights = ["Mosteiro dos Jerónimos","Torre de Belém","Castelo de São Jorge","Museu Calouste Gulbenkian"];
    cityGuide.tip = "Avoid Belém on a Monday, when Mosteiro dos Jerónimos and Torre de Belém are both closed, and remember that MAAT and the Museu Calouste Gulbenkian close on Tuesdays instead.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, the Jewish Quarter, Strahov, Vyšehrad and the zoo, with historic cafés, bakeries, Czech pubs, tasting menus and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["National Museum (Historical Building)","Jewish Museum in Prague","Strahov Monastery","Municipal House (Obecní dům)"];
    cityGuide.tip = "Keep Mondays for the National Museum, Museum Kampa, the Mucha Museum or the zoo, because the Trade Fair Palace, the National Technical Museum and the Museum of Prague's main building close that day, and avoid Saturdays for the Jewish Museum.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Palaces, state and private museums, the Grand Bazaar, restaurants from Karaköy to Etiler, a historic coffee house, a hotel patisserie and afternoon tea, each checked against its own or its public operator's website.";
    cityGuide.highlights = ["Topkapı Palace Museum","Dolmabahçe Palace","Galata Tower Museum","Istanbul Archaeological Museums"];
    cityGuide.tip = "Most closures fall on Mondays: Dolmabahçe Palace, Beylerbeyi Palace, Pera Museum, Sakıp Sabancı Museum, Rahmi M. Koç Museum, Museum of Innocence, Galata Mevlevi Lodge Museum, Miniaturk and Beyti all close then. Topkapı Palace Museum closes on Tuesdays instead.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "State and civic museums, churches, gardens and a food hall, with trattorie, dinners, breakfast cafés, pastry, gelato and cocktail bars, each checked against its own website.";
    cityGuide.highlights = ["Uffizi Gallery","Palazzo Pitti","Museo Nazionale del Bargello","Basilica di San Miniato al Monte"];
    cityGuide.tip = "The Uffizi, Pitti, Bargello, Cappelle Medicee and Orsanmichele all close on Mondays, Palazzo Medici Riccardi closes on Wednesdays and Osteria Santo Spirito on Tuesdays, so check each closing day before you fix your plan.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Temples, shrines, a castle, museums, a botanical garden, Nishiki Market, kaiseki and tofu dinners, kissaten, bakeries, coffee and hotel bars, each checked against its own website.";
    cityGuide.highlights = ["Fushimi Inari Taisha","Kiyomizu-dera","Kinkaku-ji","Kyoto National Museum"];
    cityGuide.tip = "Check closing days before you go: Kyoto National Museum and Kyoto City KYOCERA Museum of Art close on Mondays, Tenryu-ji is closed on October 29 and 30, 2026, and Kikunoi Honten closes on the first and third Tuesdays.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Harbour landmarks, free galleries and museums, markets and an ocean pool, with breakfast spots, bakeries, coffee, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Sydney Opera House","Art Gallery of New South Wales","Royal Botanic Garden Sydney","Australian National Maritime Museum"];
    cityGuide.tip = "The Art Gallery of New South Wales stays open until 10pm on Wednesdays, while Sydney Observatory opens only Thursday to Sunday, so plan those two around your week.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Basilica, palaces, civic museums, the 2026 Art Biennale and island trattorias, with cafés, dinners and a cocktail bar checked against their own websites.";
    cityGuide.highlights = ["Basilica di San Marco","Palazzo Ducale","Gallerie dell'Accademia","Peggy Guggenheim Collection"];
    cityGuide.tip = "Check closing days before you plan the day: the Peggy Guggenheim Collection is closed on Tuesdays, and the Biennale Arte is closed on Mondays except 16 November.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Palace museums, galleries, a river mall and night market, rooftop and cocktail bars, Thai tasting menus, pad thai and Charoen Krung breakfast cafés, each checked against its own website.";
    cityGuide.highlights = ["Grand Palace","Jim Thompson House","Bangkok National Museum","Mahanakhon SkyWalk"];
    cityGuide.tip = "Thipsamai's Pratoopee shop closes every Tuesday and MOCA Bangkok closes on Mondays, so keep those days for the Grand Palace, which opens daily with tickets sold 8:30 AM to 3:30 PM.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Joseon palaces, national and city museums, parks and an aquarium, with hotel dining rooms, a gomtang house, cocktail lounges, a hotel bakery and coffee bars checked against their own websites.";
    cityGuide.highlights = ["Gyeongbokgung","Changdeokgung","National Museum of Korea","Leeum Museum of Art"];
    cityGuide.tip = "Plan museum days around closures: Seoul Museum of Art closes every Monday, Seodaemun Prison History Hall closes Mondays and moves to winter hours of 09:30–17:00 from November, and the National Palace Museum of Korea closes on the last Monday of each month.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Dubai's Frame, art districts, gardens and safari park, with breakfast cafés, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Dubai Frame","Jameel Arts Centre","Dubai Miracle Garden","Dubai Safari Park"];
    cityGuide.tip = "Jameel Arts Centre is free but its site lists Tuesday as a closing day, so plan Al Jaddaf and Alserkal Avenue visits for another day.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "The bridge, Alcatraz, museums and Golden Gate Park gardens, with breakfast spots, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
    cityGuide.highlights = ["Golden Gate Bridge","Alcatraz Island","SFMOMA","California Academy of Sciences"];
    cityGuide.tip = "Book Alcatraz well ahead, since the National Park Service says it frequently sells out in advance, and avoid planning SFMOMA or the Conservatory of Flowers for a Wednesday, when both are closed.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Royal palace, Paseo del Prado museums, smaller house museums, parks and markets, with breakfast cafés, classic Madrid dining and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Palacio Real de Madrid","Museo Nacional Thyssen-Bornemisza","Museo Nacional Centro de Arte Reina Sofía","Jardines de El Buen Retiro"];
    cityGuide.tip = "Check closing days before you plan museum time: the Reina Sofía is closed on Tuesdays, while the Lázaro Galdiano, Sorolla and Romanticismo museums are closed on Mondays.";
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
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: cityKey.split(",")[0].trim() };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Royal castles, museums, food markets and a harbourside art district, with breakfast spots, lunch and dinner tables, bakeries, coffee and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Tivoli Gardens","Rosenborg Castle","National Museum of Denmark","Louisiana Museum of Modern Art"];
    cityGuide.tip = "Save Mondays for the National Museum of Denmark, which opens daily 10:00–17:00, because Ny Carlsberg Glyptotek, Louisiana, Copenhagen Contemporary and Thorvaldsens Museum close on Mondays, as does Rosenborg Castle from 2 November.";
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
  // Budapest, Hungary: source review of 2026-10-25 (docs/content-research/budapest-2026-10-25.md).
  {
    const cityKey = "Budapest, Hungary";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["St. Stephen's Basilica","Hungarian National Museum","Széchenyi Thermal Bath","Matthias Church"],
      bestFirstTimers: ["St. Stephen's Basilica","Hungarian State Opera","Great Market Hall","Budapest History Museum – Castle Museum"],
      bestRestaurants: ["Gundel","Stand25","Rosenstein","Mazel Tov"],
      bestBudget: ["Great Market Hall","Menza","Várkert Bazár","Első Pesti Rétesház"],
      bestLuxury: ["Gundel","Stand25","New York Café","Hungarian State Opera"],
      bestCouples: ["360 Bar","Rudas Baths","Várkert Bazár","Gundel"],
      bestKids: ["Budapest Zoo","House of Music Hungary","Museum of Ethnography","Széchenyi Thermal Bath"],
      bestSolo: ["Ludwig Museum","Espresso Embassy","House of Terror Museum","Great Market Hall"],
      bestUnique: ["Hospital in the Rock","Rudas Baths","House of Music Hungary","Ludwig Museum"],
      bestBreakfast: ["New York Café","Artizán (Hold utca)","Espresso Embassy","Kollázs Brasserie & Bar"],
      bestLunch: ["Menza","Stand25","Gundel","Rosenstein"],
      bestDinner: ["Stand25","Rosenstein","Mazel Tov","Gundel"],
      bestCocktails: ["360 Bar","Kollázs Brasserie & Bar","Mazel Tov"],
      bestBakeries: ["Artizán (Hold utca)","Auguszt Cukrászda (Kossuth Lajos utca)","Első Pesti Rétesház","Gerbeaud"],
      bestCoffee: ["Espresso Embassy","Gerbeaud","New York Café"]
    };
    data.cityPlaceQueries[cityKey] = {
      "St. Stephen's Basilica": "St. Stephen's Basilica Szent István tér 1 Budapest",
      "Hungarian National Museum": "Hungarian National Museum Múzeum körút 14-16 Budapest",
      "Széchenyi Thermal Bath": "Széchenyi Thermal Bath Állatkerti körút 9-11 Budapest",
      "Matthias Church": "Matthias Church Szentháromság tér 2 Budapest",
      "Hungarian State Opera": "Hungarian State Opera Andrássy út 22 Budapest",
      "Great Market Hall": "Great Market Hall Vámház körút 1-3 Budapest",
      "Budapest History Museum – Castle Museum": "Castle Museum Szent György tér 2 Budapest",
      "Gundel": "Gundel Gundel Károly út 4 Budapest",
      "Stand25": "Stand25 Attila út 10 Budapest",
      "Rosenstein": "Rosenstein Mosonyi utca 3 Budapest",
      "Mazel Tov": "Mazel Tov Akácfa utca 47 Budapest",
      "Menza": "Menza Liszt Ferenc tér 2 Budapest",
      "Várkert Bazár": "Várkert Bazár Ybl Miklós tér 2-6 Budapest",
      "Első Pesti Rétesház": "Első Pesti Rétesház Október 6. utca 22 Budapest",
      "New York Café": "New York Café Erzsébet körút 9-11 Budapest",
      "360 Bar": "360 Bar Andrássy út 39 Budapest",
      "Rudas Baths": "Rudas Baths Döbrentei tér 9 Budapest",
      "Budapest Zoo": "Budapest Zoo Állatkerti körút 6-12 Budapest",
      "House of Music Hungary": "House of Music Hungary Olof Palme sétány 3-5 Budapest",
      "Museum of Ethnography": "Museum of Ethnography Dózsa György út 35 Budapest",
      "Ludwig Museum": "Ludwig Museum Komor Marcell utca 1 Budapest",
      "Espresso Embassy": "Espresso Embassy Arany János utca 15 Budapest",
      "House of Terror Museum": "House of Terror Museum Andrássy út 60 Budapest",
      "Hospital in the Rock": "Hospital in the Rock Lovas út 4/c Budapest",
      "Artizán (Hold utca)": "Artizán Hold utca 3 Budapest",
      "Kollázs Brasserie & Bar": "Kollázs Brasserie & Bar Széchenyi István tér 5-6 Budapest",
      "Auguszt Cukrászda (Kossuth Lajos utca)": "Auguszt Cukrászda Kossuth Lajos utca 14-16 Budapest",
      "Gerbeaud": "Gerbeaud Vörösmarty tér 7-8 Budapest"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Budapest" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Churches, museums, thermal baths and a market hall, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["St. Stephen's Basilica","Hungarian National Museum","Széchenyi Thermal Bath","Matthias Church"];
    cityGuide.tip = "Several museums close on Mondays, including the Hungarian National Museum, the Museum of Ethnography, the Ludwig Museum, the House of Terror Museum and House of Music Hungary, so put the baths, the Basilica or the Castle Museum on that day.";
    data.destinationFacts[cityKey] = "Several museums close on Mondays, including the Hungarian National Museum, the Museum of Ethnography, the Ludwig Museum, the House of Terror Museum and House of Music Hungary, so put the baths, the Basilica or the Castle Museum on that day.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Churches, museums, thermal baths and a market hall, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays",
        "copy": "The Hungarian National Museum, Museum of Ethnography, Ludwig Museum, House of Terror Museum and House of Music Hungary are closed on Mondays. Stand25 is closed on Sundays, and Artizán (Hold utca) is closed on Sundays too."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead",
        "copy": "Hungarian State Opera English tours run daily at 13:30, 15:00 and 16:30, with tickets on sale one week in advance. Hospital in the Rock can only be visited on a guided tour, and Rudas Baths sells night-bathing entry online only."
      },
      {
        "label": "Walk-ins and queues",
        "value": "Arrival order",
        "copy": "Gerbeaud takes no reservations and seats guests in order of arrival. New York Café seats walk-ins from 07:00 to 18:00 and takes table bookings only after 18:00, for dinner guests."
      },
      {
        "label": "Rules",
        "value": "Age and dress",
        "copy": "Rudas Baths does not admit anyone under 14, and Hospital in the Rock does not admit children under 6. Gundel recommends smart casual dress, and the Hungarian State Opera says it has no official dress code."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan museum days from Tuesday to Sunday, keep Monday for the baths or the Basilica, and book dinners and Opera tours ahead.",
      intro: [
        "Budapest's headline sights publish clear hours, which makes it easier for you to plan. St. Stephen's Basilica is open for visits Monday to Saturday from 09.00 to 18.00 and on Sunday from 13.00 to 18.00, while its Panorama Terrace and Treasury open daily from 09.00 to 19.00. Up on Castle Hill, the Castle Museum of the Budapest History Museum opens daily from 10:00 to 18:00, with last entry at 17:30. Matthias Church has a concert programme running into December, including Bach and Charpentier on 19 December 2026.",
        "Many museums close on Mondays. The Hungarian National Museum opens Tuesday to Sunday from 10:00 to 18:00 and is showing The Treasures of King Louis I (the Great) of Hungary until 31 December 2026, though some halls are closed for renovation. The Museum of Ethnography has A Soldier's Lot until 29 August 2027 and Rituals of Beauty until 4 January 2027. At the Ludwig Museum, Walk This Way. The Art of Walking runs until 31 January 2027, and two floors stay open until 20:00 from Tuesday to Sunday.",
        "For the baths, Széchenyi Thermal Bath opens from 7:00 on weekdays, stays open until 22:00 on Fridays, and opens at 8:00 on holiday days from 18 December 2026 to 6 January 2027. Rudas Baths opens at 6:00, stays open until 22:00 on Mondays, and admits no one under 14. Hospital in the Rock can only be seen on a guided tour, with the last one leaving at 18:00. If you have children with you, Budapest Zoo is open daily and runs a discounted senior autumn programme until 30 November 2026.",
        "For food, the Great Market Hall opens at 06.00 on weekdays and is closed on public holidays. Artizán on Hold utca opens at 07:00 on weekdays, and New York Café opens at 07:00 but takes table bookings only after 18:00, for dinner guests. Stand25 serves lunch and dinner Monday to Saturday, and Rosenstein confirms reservations only by email. Gundel is open all year and is advertising a New Year's Eve dinner on 31 December 2026, and 360 Bar on Andrássy út serves until 02:00 from Thursday to Saturday."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at St. Stephen's Basilica and its Panorama Terrace, then take an English tour of the Hungarian State Opera at 13:30, 15:00 or 16:30."
        ],
        [
          "A slower morning",
          "Have coffee at Espresso Embassy from 7:30 on weekdays or pastries at Artizán on Hold utca, then browse the Great Market Hall."
        ],
        [
          "Before booking",
          "Remember that most major museums close on Mondays, Stand25 closes on Sundays and Rosenstein confirms tables only by email."
        ]
      ],
      trust: "All 28 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Mexico City, Mexico: source review of 2026-10-25 (docs/content-research/mexico-city-2026-10-25.md).
  {
    const cityKey = "Mexico City, Mexico";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Museo del Templo Mayor","Museo Nacional de Arte (MUNAL)","Basílica de Guadalupe","Museo Frida Kahlo (Casa Azul)"],
      bestFirstTimers: ["Museo del Templo Mayor","Antiguo Colegio de San Ildefonso","Museo Frida Kahlo (Casa Azul)","Azul Histórico"],
      bestRestaurants: ["Quintonil","Contramar (Roma Norte)","Rosetta","Máximo Bistrot"],
      bestBudget: ["Museo Soumaya (Plaza Carso)","Churrería El Moro (Centro Histórico)","Pastelería Ideal (16 de Septiembre)","Antiguo Colegio de San Ildefonso"],
      bestLuxury: ["Quintonil","Rosetta","Máximo Bistrot","Gin Gin (Polanco)"],
      bestCouples: ["Zinco Jazz Club","Rosetta","Bar La Ópera","Museo Tamayo"],
      bestKids: ["Papalote Museo del Niño (Chapultepec)","MIDE Museo Interactivo de Economía","Arena México","Churrería El Moro (Centro Histórico)"],
      bestSolo: ["Cafebrería El Péndulo (Condesa)","MUAC (Museo Universitario Arte Contemporáneo)","Museo Kaluz","Chiquitito Café (Alfonso Reyes)"],
      bestUnique: ["Arena México","Salón Tenampa","Museo Dolores Olmedo","Zinco Jazz Club"],
      bestBreakfast: ["Azul Histórico","Chiquitito Café (Alfonso Reyes)","Pastelería Ideal (16 de Septiembre)"],
      bestLunch: ["Contramar (Roma Norte)","Azul Histórico","Máximo Bistrot"],
      bestDinner: ["Quintonil","Rosetta","Máximo Bistrot","Azul Histórico"],
      bestCocktails: ["Gin Gin (Polanco)","Bar La Ópera","Salón Tenampa","Zinco Jazz Club"],
      bestBakeries: ["Pastelería Ideal (16 de Septiembre)","Churrería El Moro (Centro Histórico)"],
      bestCoffee: ["Chiquitito Café (Alfonso Reyes)","Cafebrería El Péndulo (Condesa)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Museo del Templo Mayor": "Museo del Templo Mayor Seminario 8 Centro Histórico Mexico City",
      "Museo Nacional de Arte (MUNAL)": "Museo Nacional de Arte Tacuba 8 Centro Histórico Mexico City",
      "Basílica de Guadalupe": "Basílica de Guadalupe Fray Juan de Zumárraga 2 Gustavo A. Madero Mexico City",
      "Museo Frida Kahlo (Casa Azul)": "Museo Frida Kahlo Londres 247 Coyoacán Mexico City",
      "Antiguo Colegio de San Ildefonso": "Antiguo Colegio de San Ildefonso Justo Sierra 16 Mexico City",
      "Azul Histórico": "Azul Histórico Isabel la Católica 30 Centro Histórico Mexico City",
      "Quintonil": "Quintonil Newton 55 Polanco Mexico City",
      "Contramar (Roma Norte)": "Contramar Durango 200 Roma Norte Mexico City",
      "Rosetta": "Rosetta Colima 166 Roma Norte Mexico City",
      "Máximo Bistrot": "Máximo Bistrot Av. Álvaro Obregón 65 Bis Roma Norte Mexico City",
      "Museo Soumaya (Plaza Carso)": "Museo Soumaya Bulevar Cervantes Saavedra Ampliación Granada Mexico City",
      "Churrería El Moro (Centro Histórico)": "Churrería El Moro Eje Central Lázaro Cárdenas 42 Mexico City",
      "Pastelería Ideal (16 de Septiembre)": "Pastelería Ideal Av. 16 de Septiembre 18 Centro Mexico City",
      "Gin Gin (Polanco)": "Gin Gin Calderón de la Barca 72 Polanco Mexico City",
      "Zinco Jazz Club": "Zinco Jazz Club Motolinia 20 Centro Histórico Mexico City",
      "Bar La Ópera": "Bar La Ópera 5 de Mayo 10 Centro Histórico Mexico City",
      "Museo Tamayo": "Museo Tamayo Paseo de la Reforma 51 Mexico City",
      "Papalote Museo del Niño (Chapultepec)": "Papalote Museo del Niño Av. Constituyentes 268 Mexico City",
      "MIDE Museo Interactivo de Economía": "MIDE Museo Interactivo de Economía Tacuba 17 Mexico City",
      "Arena México": "Arena México Dr. Lavista 189 Doctores Mexico City",
      "Cafebrería El Péndulo (Condesa)": "Cafebrería El Péndulo Nuevo León 115 Condesa Mexico City",
      "MUAC (Museo Universitario Arte Contemporáneo)": "MUAC Insurgentes Sur 3000 Coyoacán Mexico City",
      "Museo Kaluz": "Museo Kaluz Av. Hidalgo 85 Centro Histórico Mexico City",
      "Chiquitito Café (Alfonso Reyes)": "Chiquitito Café Alfonso Reyes 232 Hipódromo Condesa Mexico City",
      "Salón Tenampa": "Salón Tenampa Plaza Garibaldi 12 Centro Mexico City",
      "Museo Dolores Olmedo": "Museo Dolores Olmedo Av. México 5843 Xochimilco Mexico City"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Mexico City" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Centro Histórico museums, Coyoacán and Chapultepec galleries, lucha libre and jazz nights, with breakfasts, dinners, bakeries and bars checked against their own websites.";
    cityGuide.highlights = ["Museo del Templo Mayor","Museo Frida Kahlo (Casa Azul)","Museo Nacional de Arte (MUNAL)","Basílica de Guadalupe"];
    cityGuide.tip = "Plan museums around closing days: the Frida Kahlo museum and MUAC close on Mondays, Museo Kaluz closes on Tuesdays, and Templo Mayor, MUNAL and San Ildefonso open Tuesday to Sunday.";
    data.destinationFacts[cityKey] = "Plan museums around closing days: the Frida Kahlo museum and MUAC close on Mondays, Museo Kaluz closes on Tuesdays, and Templo Mayor, MUNAL and San Ildefonso open Tuesday to Sunday.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Centro Histórico museums, Coyoacán and Chapultepec galleries, lucha libre and jazz nights, with breakfasts, dinners, bakeries and bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "Museo Frida Kahlo and MUAC are closed on Mondays, and Templo Mayor, MUNAL, San Ildefonso and Museo Dolores Olmedo list Tuesday-to-Sunday hours. Museo Kaluz is the exception, closing on Tuesdays."
      },
      {
        "label": "Tickets",
        "value": "Buy ahead or go free",
        "copy": "Museo Frida Kahlo sells tickets online or at a self-service kiosk in its shop, and MUAC stops selling tickets 30 minutes before closing. All four Museo Soumaya venues list free entry, and San Ildefonso is free on Sundays."
      },
      {
        "label": "Dinner bookings",
        "value": "Know each restaurant's channel",
        "copy": "Quintonil books only through Tock and does not take email reservations; its tasting menu is per person and cannot be shared. Contramar takes bookings by phone, WhatsApp or OpenTable, with groups over seven by email."
      },
      {
        "label": "Night out",
        "value": "Fixed show nights",
        "copy": "Arena México holds regular lucha libre on Tuesdays at 7:30 pm, Fridays at 8:30 pm and Sundays at 5:00 pm. Zinco Jazz Club opens Wednesday to Saturday from 9:00 pm and books online for 2 to 10 people."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Base yourself around the Centro Histórico museums on weekdays, save Coyoacán and Chapultepec for days they are open, and book dinners and jazz nights ahead.",
      intro: [
        "Mexico City rewards you for planning around opening days. In the Centro Histórico, Museo del Templo Mayor on Seminario opens Tuesday to Sunday from 09:00 to 17:00 and is showing the temporary exhibition \"Cuauhtémoc. Historia y memoria.\" A few blocks away, MUNAL on Tacuba keeps the same Tuesday-to-Sunday pattern from 10:00 to 18:00, with last entry at 17:30, and runs \"Ángel Zárraga. Los ideales del arte\" until 28 March 2027 alongside \"México: ruta y destino\" until 14 February 2027.",
        "The Centro is dense with more to see. Antiguo Colegio de San Ildefonso on Justo Sierra opens Tuesday to Sunday from 11:00 to 17:30, charges $50 MXN and is free on Sundays; \"UNAM 475+\" runs from October 2026 to March 2027. Museo Kaluz on Avenida Hidalgo is open 10:00 to 18:00 but closed on Tuesdays, and shows \"Alphonse Mucha: La magia de la línea\" until 8 February 2027. For families, MIDE on Tacuba offers 2-for-1 general entry from Tuesday to Friday, 15:00 to 17:00, at the box office only.",
        "Further out, Museo Frida Kahlo at Londres 247 in Coyoacán is closed on Mondays and sells tickets online or at a kiosk in its shop, with Noche Azul late openings on Thursdays until 21:00. MUAC on Insurgentes Sur is also closed on Mondays, stays open until 20:00 on Thursdays and Saturdays, and is free on Thursdays from 18:00 to 20:00. In Chapultepec, Museo Tamayo shows \"Tamayo, Nieto, Toledo: Los años en París\" until 15 February 2027, and Papalote Museo del Niño sells tickets online.",
        "For food, Azul Histórico on Isabel la Católica serves breakfast daily from 9:00 to 12:00 and lunch and dinner from 13:00 to 23:00. Quintonil in Polanco opens Monday to Saturday, books only through Tock and lists its tasting menu at $6,090 MXN. Contramar in Roma Norte serves from midday until 20:00. After dark, Arena México stages lucha libre on Tuesdays, Fridays and Sundays, Salón Tenampa on Plaza Garibaldi opens daily from 13:00, and Churrería El Moro on Eje Central lists 24-hour opening."
      ],
      summaryCards: [
        [
          "First visit",
          "Spend a Tuesday-to-Sunday day in the Centro Histórico at Templo Mayor, MUNAL and San Ildefonso, then eat at Azul Histórico."
        ],
        [
          "A slower morning",
          "Start with breakfast at Azul Histórico or Chiquitito Café, then browse Cafebrería El Péndulo in Condesa before an afternoon at Museo Tamayo."
        ],
        [
          "Before booking",
          "Book Quintonil only through Tock, buy Frida Kahlo museum tickets online, and avoid Mondays for Casa Azul and MUAC and Tuesdays for Museo Kaluz."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Los Angeles, United States: source review of 2026-10-25 (docs/content-research/los-angeles-2026-10-25.md).
  {
    const cityKey = "Los Angeles, United States";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Griffith Observatory","LACMA","The Broad","Santa Monica Pier"],
      bestFirstTimers: ["Griffith Observatory","Santa Monica Pier","Grand Central Market","Academy Museum of Motion Pictures"],
      bestRestaurants: ["Bestia","Bavel","Gjelina (Venice)","République"],
      bestBudget: ["Griffith Observatory","The Broad","Philippe The Original","Grand Central Market"],
      bestLuxury: ["Bestia","Musso & Frank Grill","Hollywood Bowl"],
      bestCouples: ["Hollywood Bowl","Musso & Frank Grill","Gjelina (Venice)","Thunderbolt"],
      bestKids: ["Natural History Museum of Los Angeles County","Griffith Observatory","Santa Monica Pier"],
      bestSolo: ["Los Angeles Central Library","The Last Bookstore","LACMA","Verve Coffee Roasters (West 3rd Street)"],
      bestUnique: ["Hollywood Bowl","Los Angeles Central Library","The Last Bookstore","Academy Museum of Motion Pictures"],
      bestBreakfast: ["Huckleberry Café","République","Great White (Venice)","Bub and Grandma's"],
      bestLunch: ["Grand Central Market","Philippe The Original","Bub and Grandma's","Gjelina (Venice)"],
      bestDinner: ["Bestia","Bavel","Musso & Frank Grill","République"],
      bestCocktails: ["Thunderbolt","Employees Only LA","The Roger Room"],
      bestBakeries: ["Porto's Bakery (Glendale)","République","Courage Bagels","Bub and Grandma's"],
      bestCoffee: ["Verve Coffee Roasters (West 3rd Street)","Huckleberry Café","Great White (Venice)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Griffith Observatory": "Griffith Observatory 2800 East Observatory Road Los Angeles",
      "LACMA": "LACMA 5905 Wilshire Blvd Los Angeles",
      "The Broad": "The Broad 221 S Grand Avenue Los Angeles",
      "Santa Monica Pier": "Santa Monica Pier 200 Santa Monica Pier Santa Monica",
      "Grand Central Market": "Grand Central Market 317 South Broadway Los Angeles",
      "Academy Museum of Motion Pictures": "Academy Museum of Motion Pictures 6067 Wilshire Boulevard Los Angeles",
      "Bestia": "Bestia 2121 E 7th Pl Los Angeles",
      "Bavel": "Bavel 500 Mateo St Los Angeles",
      "Gjelina (Venice)": "Gjelina 1429 Abbot Kinney Blvd Venice Los Angeles",
      "République": "République 624 S La Brea Ave Los Angeles",
      "Philippe The Original": "Philippe The Original 1001 N Alameda St Los Angeles",
      "Musso & Frank Grill": "Musso & Frank Grill 6667 Hollywood Blvd Los Angeles",
      "Hollywood Bowl": "Hollywood Bowl 2301 N Highland Ave Los Angeles",
      "Thunderbolt": "Thunderbolt 1263 W Temple St Los Angeles",
      "Natural History Museum of Los Angeles County": "Natural History Museum of Los Angeles County 900 Exposition Blvd Los Angeles",
      "Los Angeles Central Library": "Los Angeles Central Library 630 W 5th Street Los Angeles",
      "The Last Bookstore": "The Last Bookstore 453 South Spring Street Los Angeles",
      "Verve Coffee Roasters (West 3rd Street)": "Verve Coffee Roasters 8051 W 3rd St Los Angeles",
      "Huckleberry Café": "Huckleberry Cafe 1014 Wilshire Blvd Santa Monica",
      "Great White (Venice)": "Great White 1604 Pacific Ave Venice Los Angeles",
      "Bub and Grandma's": "Bub and Grandma's 3507 Eagle Rock Boulevard Los Angeles",
      "Employees Only LA": "Employees Only 7953 Santa Monica Blvd West Hollywood",
      "The Roger Room": "The Roger Room 370 N La Cienega Boulevard West Hollywood",
      "Porto's Bakery (Glendale)": "Porto's Bakery 315 N Brand Blvd Glendale",
      "Courage Bagels": "Courage Bagels 777 N Virgil Ave Los Angeles"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Los Angeles" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Observatory, museums, the Hollywood Bowl and the Santa Monica Pier, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Griffith Observatory","LACMA","Hollywood Bowl","The Broad"];
    cityGuide.tip = "Plan museum days around closing days: Griffith Observatory shuts on Mondays, The Broad on Mondays, LACMA on Wednesdays and the Academy Museum on Tuesdays.";
    data.destinationFacts[cityKey] = "Plan museum days around closing days: Griffith Observatory shuts on Mondays, The Broad on Mondays, LACMA on Wednesdays and the Academy Museum on Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Observatory, museums, the Hollywood Bowl and the Santa Monica Pier, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon / Tue / Wed",
        "copy": "Griffith Observatory and The Broad close on Mondays, the Academy Museum on Tuesdays and LACMA on Wednesdays. The Natural History Museum closes on the first Tuesday of every month."
      },
      {
        "label": "Tickets",
        "value": "Free entry, book ahead",
        "copy": "Griffith Observatory is free, and The Broad's general admission is free, with timed reservations recommended and walk-ups daily. The Broad's Infinity Mirrored Room requires an advance reservation."
      },
      {
        "label": "Walk-ins",
        "value": "Check the hour",
        "copy": "Great White in Venice is walk-ins only from 8am to 4pm, with reservations from 4pm. Thunderbolt takes reservations for up to 9 guests and asks larger groups to email."
      },
      {
        "label": "Concert rules",
        "value": "Arrive 90 minutes early",
        "copy": "The Hollywood Bowl asks you to arrive at least 90 minutes before your performance and to buy parking in advance. It also asks you not to park in the surrounding neighborhoods."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Group your days by area, Wilshire museums, downtown, and the coast, and check each venue's closing day before you set out.",
      intro: [
        "Start high above the city at Griffith Observatory, which is free to enter and open from noon on weekdays and from 10 a.m. on weekends, until 10 p.m. It closes on Mondays. The Observatory notes paid parking near the building and free parking downhill, and it says public transit is the easiest way up. For a long evening outdoors, the Hollywood Bowl on North Highland Avenue posts concerts into late November 2026, with 2027 dates already on sale; it asks you to arrive at least 90 minutes early.",
        "Along Wilshire Boulevard, LACMA is open every day except Wednesday, with late hours until 8 PM on Fridays. You can see The Brockman Gallery: Los Angeles, 1967-1990 through January 24, 2027, and Textile Alchemy: The Art of Reiko Sudo & NUNO through March 7, 2027, and the museum says its new David Geffen Galleries are now open. A short walk away, the Academy Museum of Motion Pictures opens Wednesday to Monday, 10am-6pm. Its East Rolex Gallery on Level 3 is closed until December 12.",
        "Downtown, The Broad offers free general admission, Tuesday to Sunday, with Thursday opening until 8 pm; you should reserve a timed ticket and book the Kusama Infinity Mirrored Room in advance. Grand Central Market on South Broadway is open 8AM-9PM daily, though vendor hours vary. Nearby, the Central Library on West 5th Street runs docent-led art and architecture tours, and The Last Bookstore on South Spring Street hosts regular evening events. Philippe The Original on North Alameda Street is open daily from 6 am to 10 pm.",
        "For food, Huckleberry Café in Santa Monica serves every day from 7:00am to 3:00pm, and République on La Brea runs its café and bakery daily from 8am, with dinner Tuesday to Saturday. Bestia and Bavel in the Arts District both serve from 5pm nightly and take OpenTable bookings. Musso & Frank Grill, cooking in Hollywood since 1919, opens Tuesday to Sunday. Finish at Thunderbolt on West Temple Street, which closes on Tuesdays and takes reservations for up to 9 guests."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair free Griffith Observatory with LACMA and a dinner at Bestia or Musso & Frank Grill, avoiding Mondays and Wednesdays."
        ],
        [
          "A slower morning",
          "Walk in for breakfast at Great White in Venice or Huckleberry Café in Santa Monica, then browse The Last Bookstore downtown."
        ],
        [
          "Before booking",
          "Reserve a timed slot at The Broad, buy Hollywood Bowl parking in advance, and book Bestia or Bavel through OpenTable."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Marrakech, Morocco: source review of 2026-10-25 (docs/content-research/marrakech-2026-10-25.md).
  {
    const cityKey = "Marrakech, Morocco";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Le Jardin Secret","Musée Yves Saint Laurent Marrakech","Musée des Confluences Dar El Bacha","MACAAL"],
      bestFirstTimers: ["Musée du patrimoine immatériel Jamaâ el-Fna","Le Jardin Secret","Musée Yves Saint Laurent Marrakech","Dar Si Saïd (Musée national du tissage et du tapis)"],
      bestRestaurants: ["Al Fassia Aguedal","Le Foundouk","Naranj","Le Trou au Mur"],
      bestBudget: ["Amal Gueliz Center","Musée du patrimoine immatériel Jamaâ el-Fna","Dar Si Saïd (Musée national du tissage et du tapis)","Cafe Clock Marrakech"],
      bestLuxury: ["La Mamounia","Royal Mansour Marrakech","Comptoir Darna","La Sultana Marrakech"],
      bestCouples: ["El Fenn Rooftop","La Sultana Marrakech","Terrasse des Épices","Anima Garden"],
      bestKids: ["Anima Garden","Le Jardin Secret","Maison de la Photographie","Pâtisserie Amandine (Rue Mohamed El Beqal)"],
      bestSolo: ["Maison de la Photographie","Marrakesh-Timbuktu (Bert Flint collection)","Cafe Clock Marrakech","MACAAL"],
      bestUnique: ["MACAAL","Marrakesh-Timbuktu (Bert Flint collection)","Anima Garden","La Maison Arabe"],
      bestBreakfast: ["Le Grand Café de la Poste","Pâtisserie Amandine (Rue Mohamed El Beqal)","Cafe Clock Marrakech"],
      bestLunch: ["Amal Gueliz Center","La Famille","+61","Naranj"],
      bestDinner: ["Al Fassia Aguedal","Le Foundouk","Comptoir Darna","Terrasse des Épices"],
      bestCocktails: ["El Fenn Rooftop","La Sultana Marrakech","Kabana","La Mamounia"],
      bestBakeries: ["Pâtisserie Amandine (Rue Mohamed El Beqal)"],
      bestCoffee: ["Cafe Clock Marrakech","Pâtisserie Amandine (Rue Mohamed El Beqal)","Le Grand Café de la Poste"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Le Jardin Secret": "Le Jardin Secret 121 Rue Mouassine Marrakech",
      "Musée Yves Saint Laurent Marrakech": "Musée Yves Saint Laurent Rue Yves Saint Laurent Marrakech",
      "Musée des Confluences Dar El Bacha": "Musée des Confluences Dar El Bacha Route Dar El Bacha Marrakech",
      "MACAAL": "MACAAL Al Maaden Sidi Youssef Ben Ali Marrakech",
      "Musée du patrimoine immatériel Jamaâ el-Fna": "Musée du patrimoine immatériel Rue Ibn Marine Place Jamaa el-Fna Marrakech",
      "Dar Si Saïd (Musée national du tissage et du tapis)": "Dar Si Said Riad Zitoun Jdid Marrakech",
      "Al Fassia Aguedal": "Al Fassia Aguedal Route de l'Ourika Agdal Marrakech",
      "Le Foundouk": "Le Foundouk 55 Souk Hal Fes Kaat Bennahid Marrakech",
      "Naranj": "Naranj 84 Rue Riad Zitoun el Jdid Marrakech",
      "Le Trou au Mur": "Le Trou au Mur 39 Derb el Farnatchi Rue Souk el Fassis Marrakech",
      "Amal Gueliz Center": "Amal Rue Allal Ben Ahmed Ibn Sina Gueliz Marrakech",
      "Cafe Clock Marrakech": "Cafe Clock 224 Derb Chtouka Kasbah Marrakech",
      "La Mamounia": "La Mamounia Avenue Bab Jdid Marrakech",
      "Royal Mansour Marrakech": "Royal Mansour Rue Abou El Abbas Sebti Marrakech",
      "Comptoir Darna": "Comptoir Darna Avenue Echouhada Hivernage Marrakech",
      "La Sultana Marrakech": "La Sultana 403 Rue de la Kasbah Marrakech",
      "El Fenn Rooftop": "El Fenn Derb Moulay Abdellah Ben Hezzian Bab El Ksour Marrakech",
      "Terrasse des Épices": "Terrasse des Épices 15 Souk Cherifia Sidi Abdelaziz Marrakech",
      "Anima Garden": "Anima Garden Douar Sbiti Route d'Ourika Marrakech",
      "Maison de la Photographie": "Maison de la Photographie 46 rue Ahl Fes Marrakech",
      "Pâtisserie Amandine (Rue Mohamed El Beqal)": "Pâtisserie Amandine 177 Rue Mohamed El Beqal Marrakech",
      "Marrakesh-Timbuktu (Bert Flint collection)": "Marrakesh-Timbuktu Derb Boutouil 33b Marrakech",
      "La Maison Arabe": "La Maison Arabe 1 Derb Assehbé Bab Doukkala Marrakech",
      "Le Grand Café de la Poste": "Le Grand Café de la Poste Boulevard El Mansour Eddahbi Avenue Imam Malik Marrakech",
      "La Famille": "La Famille 42 Riad Zitoun Jdid Marrakech",
      "+61": "+61 96 Rue Mohammed el Beqal Gueliz Marrakech",
      "Kabana": "Kabana 1 Rue Fatima Zahra Marrakech"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Marrakech" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, gardens and medina restaurants, with breakfast cafés, a Guéliz bakery, rooftop cocktail bars and luxury hotel tables checked against their own websites.";
    cityGuide.highlights = ["Le Jardin Secret","Musée Yves Saint Laurent Marrakech","Musée des Confluences Dar El Bacha","MACAAL"];
    cityGuide.tip = "Plan around closing days: the Fondation Nationale des Musées sites (Dar El Bacha, Dar Si Saïd and the Jamaâ el-Fna museum) close on Mondays, and the Musée Yves Saint Laurent closes on Wednesdays.";
    data.destinationFacts[cityKey] = "Plan around closing days: the Fondation Nationale des Musées sites (Dar El Bacha, Dar Si Saïd and the Jamaâ el-Fna museum) close on Mondays, and the Musée Yves Saint Laurent closes on Wednesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, gardens and medina restaurants, with breakfast cafés, a Guéliz bakery, rooftop cocktail bars and luxury hotel tables checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon / Wed / Sun",
        "copy": "Dar El Bacha, Dar Si Saïd and the Jamaâ el-Fna museum close on Mondays; the Musée Yves Saint Laurent and Le Foundouk close on Wednesdays. Amal Gueliz, La Famille and +61 serve lunch Monday to Saturday only."
      },
      {
        "label": "Tickets",
        "value": "Online vs on site",
        "copy": "Musée Yves Saint Laurent tickets are sold only through tickets.jardinmajorelle.com, which it calls the only official site. Maison de la Photographie tickets are not sold online and are paid on site by card or cash."
      },
      {
        "label": "Walk-ins",
        "value": "Check first",
        "copy": "El Fenn's roof terrace takes no reservations for drinks but has limited capacity, with last admittance at 22:30. Kabana states reservations are required, and Amal Gueliz accepts walk-ins but advises booking for busy Friday couscous day."
      },
      {
        "label": "Rules",
        "value": "Dress and age",
        "copy": "Comptoir Darna's dress code is smart casual, with sportswear, shorts and men's sandals not welcome. Le Jardin Secret's tower is not open to children under 6, while entry to the garden is free for under-12s."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Anchor each day on one museum or garden in the morning, keep Mondays for sights outside the national museum network, and book dinners and rooftop tables ahead.",
      intro: [
        "You can cover a lot of Marrakech's museums on foot from the medina, but closing days shape the week. The Fondation Nationale des Musées runs the Musée des Confluences Dar El Bacha, Dar Si Saïd's carpet and weaving museum and the Jamaâ el-Fna intangible heritage museum, all open Tuesday to Sunday from 10:00 to 18:00 and closed on Mondays. Dar El Bacha is showing Enki Bilal: l'Exposition from 15 October 2026. Maison de la Photographie, on rue Ahl Fes, opens every day from 9:30 to 19:00, sells tickets on site only, and includes entry to the Musée de la Musique.",
        "In the medina's north, Le Jardin Secret on Rue Mouassine opens daily, with October hours of 9:30 to 18:00 and November hours of 9:30 to 17:30; its tower costs extra and is closed to under-6s. Out in Guéliz, the Musée Yves Saint Laurent Marrakech opens 10:00 to 18:00 every day except Wednesday and sells tickets only online. For contemporary art, MACAAL at Al Maaden has Daoud Aoulad-Syad's solo show until 29 November 2026 and Yassine Balbzioui's Crazy Lines until 8 January 2027. Anima Garden, on the Ourika road, runs a free shuttle from the medina.",
        "For lunch, Amal's Guéliz centre serves Monday to Saturday from 12:00 to 15:30, and Friday is couscous day, so you should arrive early. La Famille on Riad Zitoun Jdid changes its menu daily and serves Monday to Saturday lunch, while Naranj on the same street opens daily from 12:30 to 22:30. For breakfast, Le Grand Café de la Poste takes bookings from 9:00, Pâtisserie Amandine on Rue Mohamed El Beqal opens at 8:00, and Cafe Clock in the Kasbah opens daily from 9:00 to 23:00.",
        "Evenings run late. Terrasse des Épices serves dinner from 18:30 to 00:30 daily, Le Foundouk opens from 19:00 to midnight except Wednesdays, and Comptoir Darna in Hivernage serves nightly from 19:00 with a smart casual dress code. For drinks, El Fenn's roof terrace is open to non-residents from 12:00 to 23:00 without reservations, though capacity is limited. La Sultana runs a 6 p.m. sunset mixology workshop for up to four people, and Kabana opens daily until 2:00 with reservations required."
      ],
      summaryCards: [
        [
          "First visit",
          "Start with Le Jardin Secret and the Jamaâ el-Fna museum in the medina, then head to the Musée Yves Saint Laurent on any day but Wednesday."
        ],
        [
          "A slower morning",
          "Have breakfast at Pâtisserie Amandine from 8:00 or Le Grand Café de la Poste from 9:00, then walk to Maison de la Photographie, open daily from 9:30."
        ],
        [
          "Before booking",
          "Remember that the national museums close on Mondays, YSL tickets are online only, and Kabana and the larger dinner venues take reservations."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Athens, Greece: source review of 2026-10-25 (docs/content-research/athens-2026-10-25.md).
  {
    const cityKey = "Athens, Greece";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Acropolis Museum","National Archaeological Museum","Panathenaic Stadium","Museum of Cycladic Art"],
      bestFirstTimers: ["Acropolis Museum","Panathenaic Stadium","Karamanlidika","360 Cocktail Bar"],
      bestRestaurants: ["Spondi","Varoulko Seaside","Karamanlidika","Hytra"],
      bestBudget: ["Feyrouz","Lukumades","Mokka","Byzantine and Christian Museum"],
      bestLuxury: ["Spondi","Hytra","Varoulko Seaside","Goulandris Museum of Modern Art"],
      bestCouples: ["360 Cocktail Bar","Klimataria","Brettos","Cookoovaya"],
      bestKids: ["Little Kook","Panathenaic Stadium","Acropolis Museum","Lukumades"],
      bestSolo: ["EMST National Museum of Contemporary Art","Mokka","Jewish Museum of Greece","The Clumsies"],
      bestUnique: ["Little Kook","Ilias Lalaounis Jewelry Museum","Brettos","Jewish Museum of Greece"],
      bestBreakfast: ["360 Cocktail Bar","Little Kook","Mokka","Lukumades"],
      bestLunch: ["Karamanlidika","Cookoovaya","Feyrouz","Klimataria"],
      bestDinner: ["Spondi","Varoulko Seaside","Hytra","Cookoovaya"],
      bestCocktails: ["The Clumsies","Baba au Rum","Line Athens","A for Athens"],
      bestBakeries: ["Lukumades"],
      bestCoffee: ["Mokka","The Clumsies","360 Cocktail Bar","Little Kook"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Acropolis Museum": "Acropolis Museum Dionysiou Areopagitou 15 Athens",
      "National Archaeological Museum": "National Archaeological Museum 44 Patission Athens",
      "Panathenaic Stadium": "Panathenaic Stadium Vasileos Konstantinou Avenue Athens",
      "Museum of Cycladic Art": "Museum of Cycladic Art Vasilissis Sofias & Irodotou 1 Athens",
      "Karamanlidika": "Karamanlidika Sokratous 1 Evripidou Athens",
      "360 Cocktail Bar": "360 Cocktail Bar Ifaistou 2 Athens",
      "Spondi": "Spondi Pyrronos 5 Athens",
      "Varoulko Seaside": "Varoulko Seaside Akti Koumoundourou 54 Piraeus",
      "Hytra": "Hytra Petrou Kokkali 1 Athens",
      "Feyrouz": "Feyrouz Agathonos 1 Athens",
      "Lukumades": "Lukumades Eolou 21 Athens",
      "Mokka": "Mokka Athinas 44 Athens",
      "Byzantine and Christian Museum": "Byzantine and Christian Museum 22 Vasilissis Sofias Athens",
      "Goulandris Museum of Modern Art": "Goulandris Museum 13 Eratosthenous Athens",
      "Klimataria": "Klimataria Platia Theatrou 2 Athens",
      "Brettos": "Brettos Kydathinaion 41 Athens",
      "Cookoovaya": "Cookoovaya Hatzigianni Mexi 2A Athens",
      "Little Kook": "Little Kook Karaiskaki 17 Athens",
      "EMST National Museum of Contemporary Art": "EMST Kallirrois Ave & Amvrosiou Frantzi Athens",
      "Jewish Museum of Greece": "Jewish Museum of Greece Nikis 39 Athens",
      "The Clumsies": "The Clumsies Praxitelous 30 Athens",
      "Ilias Lalaounis Jewelry Museum": "Ilias Lalaounis Jewelry Museum Kallisperi 12 Athens",
      "Baba au Rum": "Baba au Rum Klitiou 6 Athens",
      "Line Athens": "Line Agathodemonos 37 Athens",
      "A for Athens": "A for Athens Miaouli 2-4 Athens"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Athens" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, a historic stadium, tavernas, fine dining, cocktail bars, cafés and sweet shops in Athens, each checked against its own website.";
    cityGuide.highlights = ["Acropolis Museum","National Archaeological Museum","Panathenaic Stadium","Museum of Cycladic Art"];
    cityGuide.tip = "Several museums shut on Tuesdays, including the Museum of Cycladic Art, the Byzantine and Christian Museum and the Jewish Museum's venues, while the National Archaeological Museum opens only at 13:00 that day.";
    data.destinationFacts[cityKey] = "Several museums shut on Tuesdays, including the Museum of Cycladic Art, the Byzantine and Christian Museum and the Jewish Museum's venues, while the National Archaeological Museum opens only at 13:00 that day.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, a historic stadium, tavernas, fine dining, cocktail bars, cafés and sweet shops in Athens, each checked against its own website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Tuesday",
        "copy": "The Museum of Cycladic Art and the Byzantine and Christian Museum close on Tuesdays, and the Jewish Museum's listed venues are closed Tuesdays too. The National Archaeological Museum opens on Tuesday only from 13:00 to 20:00."
      },
      {
        "label": "Tickets",
        "value": "Online e-tickets",
        "copy": "The National Archaeological Museum sells its 20€ admission through the e-ticketing system, and the Acropolis Museum and Goulandris Museum link to online tickets. The Panathenaic Stadium charges 12 euros, with a 30-minute audio guide included."
      },
      {
        "label": "Booking",
        "value": "Reserve tables",
        "copy": "Spondi, Varoulko Seaside, Cookoovaya, Hytra and both Karamanlidika branches take online reservations. The Clumsies says reservations by website or phone get an immediate response."
      },
      {
        "label": "Rules",
        "value": "Stadium and museum rules",
        "copy": "The Panathenaic Stadium allows no food or drinks other than water, and only certified service animals. At the Museum of Cycladic Art, children under 18 enter free and last entry is 15 minutes before closing."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan museum days around Tuesday closures and book dinner tables online ahead.",
      intro: [
        "Athens rewards you for planning around museum hours. The Acropolis Museum on Dionysiou Areopagitou is showing \"The Parthenon and Byron\" until 31 December 2026, and it runs a family programme from 1 November 2026 to 28 March 2027. Across town, the National Archaeological Museum on Patission opens Wednesday to Monday from 08:00 to 20:00 until 15 November 2026, with a later 13:00 start on Tuesdays. Its exhibition \"Pylos of Nestor: A Mycenaean Kingdom Revealed\" runs to 31 January 2027, and William Kentridge's \"Imitate the sleep of stones\" opens 30 October 2026.",
        "Along Vasilissis Sofias you can pair two museums in one walk. The Museum of Cycladic Art opens 10:00 to 17:00 most days, stays open until 20:00 on Thursdays and closes on Tuesdays, while visitors currently enter through the Stathatos Mansion because the other entrance is under construction. The Byzantine and Christian Museum nearby opens 8:30 to 15:30 and also closes on Tuesdays. The Goulandris Museum on Eratosthenous opens \"BELLE ÉPOQUE\" on 31 October 2026, running to 15 February 2027, and EMST shows a Niki Kanagini retrospective until 14 February 2027.",
        "For something open daily, the Panathenaic Stadium welcomes you from 8:00 to 19:00 through October and 8:00 to 17:00 from November to February. A general ticket costs 12 euros and includes a 30-minute audio guide, and only water is allowed inside. The Jewish Museum of Greece's exhibition \"Like Hunted Birds\" runs at the Bathhouse of the Winds in Plaka until 30 November 2026, daily except Tuesday, and the Ilias Lalaounis Jewelry Museum below the Acropolis plans a free art fair on 5 and 6 December.",
        "Eating and drinking are easy to book ahead. Varoulko Seaside in Piraeus and Cookoovaya both serve daily from 13:00 to midnight and take online bookings, and Spondi and Hytra also reserve online. Klimataria on Platia Theatrou opens from noon to 2am with live music most evenings. For coffee, Mokka on Athinas has roasted in the same building since 1923. Baba au Rum pours from 19:00 to 03:00, and 360 Cocktail Bar on Ifaistou opens from 10:00 for brunch and stays open late."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at the Acropolis Museum and the Panathenaic Stadium, then book a table at Karamanlidika or Cookoovaya."
        ],
        [
          "A slower morning",
          "Pick up coffee at Mokka on Athinas, then spend the late morning at the Museum of Cycladic Art, which opens at 10:00 except on Tuesdays."
        ],
        [
          "Before booking",
          "Check Tuesday closures at the Cycladic, Byzantine and Jewish museums, and reserve Spondi, Varoulko Seaside or Hytra online."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Buenos Aires, Argentina: source review of 2026-10-25 (docs/content-research/buenos-aires-2026-10-25.md).
  {
    const cityKey = "Buenos Aires, Argentina";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Teatro Colón","MALBA","Jardín Japonés","Museo Evita"],
      bestFirstTimers: ["Teatro Colón","Café Tortoni","MALBA","El Querandí"],
      bestRestaurants: ["Don Julio","La Cabrera (Palermo)","El Cuartito","Café de los Angelitos"],
      bestBudget: ["Jardín Japonés","El Cuartito","Museo Evita","Colección Amalita"],
      bestLuxury: ["Alvear Palace Hotel","Faena Hotel Buenos Aires","Teatro Colón","Rojo Tango"],
      bestCouples: ["El Querandí","Rojo Tango","Teatro Colón","Jardín Japonés"],
      bestKids: ["Museo Argentino de Ciencias Naturales","Bioparque Temaikèn","Jardín Japonés"],
      bestSolo: ["MALBA","Fundación PROA","Colección Amalita","Cuervo Café (Recoleta)"],
      bestUnique: ["Museo Evita","Fundación PROA","Café de los Angelitos","Teatro Nacional Cervantes"],
      bestBreakfast: ["La Biela","Café Tortoni","Cuervo Café (Recoleta)","Alvear Palace Hotel"],
      bestLunch: ["Don Julio","La Cabrera (Palermo)","El Cuartito","Café Tortoni"],
      bestDinner: ["Don Julio","La Cabrera (Palermo)","El Cuartito","Café de los Angelitos"],
      bestCocktails: ["Florería Atlántico","Gran Bar Danzón","Presidente Bar (Recoleta)","Alvear Palace Hotel"],
      bestBakeries: ["Atelier Fuerza (Recoleta)"],
      bestCoffee: ["Cuervo Café (Recoleta)","Café Tortoni","La Biela"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Teatro Colón": "Teatro Colón Cerrito 628 Buenos Aires",
      "MALBA": "MALBA Av. Figueroa Alcorta 3415 Buenos Aires",
      "Jardín Japonés": "Jardín Japonés Av. Casares 3500 Buenos Aires",
      "Museo Evita": "Museo Evita Lafinur 2988 Buenos Aires",
      "Café Tortoni": "Café Tortoni Av. de Mayo 825 Buenos Aires",
      "El Querandí": "El Querandí Perú 322 Buenos Aires",
      "Don Julio": "Don Julio Guatemala 4699 Buenos Aires",
      "La Cabrera (Palermo)": "La Cabrera José Antonio Cabrera 5099 Buenos Aires",
      "El Cuartito": "El Cuartito Talcahuano 937 Buenos Aires",
      "Café de los Angelitos": "Café de los Angelitos Rivadavia 2100 Buenos Aires",
      "Colección Amalita": "Colección Amalita Olga Cossettini 141 Buenos Aires",
      "Alvear Palace Hotel": "Alvear Palace Hotel Av. Alvear 1891 Buenos Aires",
      "Faena Hotel Buenos Aires": "Faena Hotel Martha Salotti 445 Buenos Aires",
      "Rojo Tango": "Rojo Tango Martha Salotti 445 Buenos Aires",
      "Museo Argentino de Ciencias Naturales": "Museo Argentino de Ciencias Naturales Av. Ángel Gallardo 470 Buenos Aires",
      "Bioparque Temaikèn": "Bioparque Temaikèn Ruta Provincial 25 Belén de Escobar",
      "Fundación PROA": "Fundación PROA Av. Pedro de Mendoza 1929 Buenos Aires",
      "Cuervo Café (Recoleta)": "Cuervo Café Azcuénaga 1505 Buenos Aires",
      "Teatro Nacional Cervantes": "Teatro Nacional Cervantes Libertad 815 Buenos Aires",
      "La Biela": "La Biela Av. Pres. Manuel Quintana 600 Buenos Aires",
      "Florería Atlántico": "Florería Atlántico Arroyo 872 Buenos Aires",
      "Gran Bar Danzón": "Gran Bar Danzón Libertad 1161 Buenos Aires",
      "Presidente Bar (Recoleta)": "Presidente Bar Av. Presidente Manuel Quintana 188 Buenos Aires",
      "Atelier Fuerza (Recoleta)": "Atelier Fuerza Ecuador 1283 Buenos Aires"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Buenos Aires" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Theatres, art museums, gardens and tango dinner shows, with parrillas, historic cafés, a bakery and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Teatro Colón","MALBA","Jardín Japonés","Museo Evita"];
    cityGuide.tip = "Plan museum days around closures: MALBA is closed on Tuesdays, Museo Evita on Mondays, Fundación PROA on Mondays and Tuesdays, and Colección Amalita opens only Thursday to Sunday.";
    data.destinationFacts[cityKey] = "Plan museum days around closures: MALBA is closed on Tuesdays, Museo Evita on Mondays, Fundación PROA on Mondays and Tuesdays, and Colección Amalita opens only Thursday to Sunday.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Theatres, art museums, gardens and tango dinner shows, with parrillas, historic cafés, a bakery and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Check before you go",
        "copy": "MALBA states 'Martes cerrado', and Colección Amalita opens Thursday to Sunday, 12:00–20:00. Fundación PROA opens Wednesday to Sunday, and Museo Evita Tuesday to Sunday."
      },
      {
        "label": "Tickets and booking",
        "value": "Teatro Colón and Temaikèn",
        "copy": "Teatro Colón sells guided-visit tickets online and in person Monday to Saturday, 9:00–16:45, entering at Libertad 621. Bioparque Temaikèn sells tickets and visit dates online."
      },
      {
        "label": "Walk-in and queues",
        "value": "No booking needed",
        "copy": "Colección Amalita's Spanish guided tours are free with admission and need no booking. At the Jardín Japonés, ticket sales close at 18:30, and the garden says it does not close for rain."
      },
      {
        "label": "Rules and policies",
        "value": "Residency and cancellations",
        "copy": "The Jardín Japonés charges residents less on showing a DNI, and children under 12 enter free with an adult. El Querandí lets you change your show date for free; cancellations get 50% back if made before 14:00 that day."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Anchor each day on one museum with known opening days, then book a parrilla or tango dinner show ahead for the evening.",
      intro: [
        "Buenos Aires rewards you for checking closing days before you set out. MALBA, at Av. Figueroa Alcorta 3415, is closed on Tuesdays. It opens 12:00–20:00 Thursday to Monday and from 11:00 on Wednesdays, and its exhibitions 'Belkis Ayón: Mito y desobediencia' and 'Viva Frida' both run until 15 March 2027. Museo Evita in Palermo opens Tuesday to Sunday, 11:00–19:00, with public guided tours at 16:00 and an English-language tour on Fridays at 15:00. Fundación PROA in La Boca opens Wednesday to Sunday, 12:00–19:00.",
        "Colección Amalita in Puerto Madero, formerly Colección Fortabat, opens Thursday to Sunday, 12:00–20:00, and its Spanish guided tours are free with admission and need no booking. At Teatro Colón, Cerrito 628, guided visits take in the auditorium, the main foyer and the Salón Dorado. Tickets are sold online, or in person Monday to Saturday from 9:00 to 16:45 at Libertad 621. Teatro Nacional Cervantes, at Libertad 815, runs its box office Wednesday to Sunday, 10:00–22:00, and lists guided visits on its calendar.",
        "For families, the Museo Argentino de Ciencias Naturales at Av. Ángel Gallardo 470 lists 'Exploraciones imaginarias' from 16 October to 30 November 2026. The Jardín Japonés in Parque 3 de Febrero opens daily from 10:00 to 18:45, and ticket sales end at 18:30. Children under 12 enter free with an adult, and the garden says it does not close for rain. Bioparque Temaikèn, in Escobar outside the city, sells tickets and visit dates online and advises you to check opening days first.",
        "For eating, Don Julio in Palermo Viejo serves daily from 11:30 to 16:00 and from 19:00 to 1:00. La Cabrera, on José Antonio Cabrera, opens every day for lunch and dinner. El Cuartito on Talcahuano, a pizzería founded in 1934, opens Tuesday to Sunday. Café Tortoni on Av. de Mayo and La Biela in Recoleta both open at 8:00, which suits an early start. For tango, El Querandí, Café de los Angelitos and Rojo Tango all stage dinner shows, and El Querandí's show starts at 21:30."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair a Teatro Colón guided visit with coffee at Café Tortoni, then book a dinner show at El Querandí."
        ],
        [
          "A slower morning",
          "Start at La Biela or Cuervo Café in Recoleta, then walk the Jardín Japonés when it opens at 10:00."
        ],
        [
          "Before booking",
          "Check closing days: MALBA is closed on Tuesdays, and Colección Amalita opens only Thursday to Sunday."
        ]
      ],
      trust: "All 24 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Cape Town, South Africa: source review of 2026-10-25 (docs/content-research/cape-town-2026-10-25.md).
  {
    const cityKey = "Cape Town, South Africa";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Table Mountain Aerial Cableway","Zeitz MOCAA","Castle of Good Hope","Norval Foundation"],
      bestFirstTimers: ["Table Mountain Aerial Cableway","Castle of Good Hope","District Six Museum","Two Oceans Aquarium"],
      bestRestaurants: ["FYN","La Colombe","The Pot Luck Club","Bo-Kaap Kombuis"],
      bestBudget: ["Castle of Good Hope","Iziko South African Museum","Oranjezicht City Farm Market","Iziko Bo-Kaap Museum"],
      bestLuxury: ["La Colombe","FYN","Planet Bar (Belmond Mount Nelson Hotel)"],
      bestCouples: ["Table Mountain Aerial Cableway","Planet Bar (Belmond Mount Nelson Hotel)","Harbour House (Camps Bay)","The Gin Bar"],
      bestKids: ["Two Oceans Aquarium","Cape Town Science Centre","Zeitz MOCAA","Iziko South African Museum"],
      bestSolo: ["Iziko South African National Gallery","Iziko Slave Lodge","District Six Museum","Neighbourgoods Market (Old Biscuit Mill)"],
      bestUnique: ["Zeitz MOCAA","Norval Foundation","Oranjezicht City Farm Market","Neighbourgoods Market (Old Biscuit Mill)"],
      bestBreakfast: ["Hemelhuijs","Schoon (Sea Point)","Knead (Muizenberg)","Kloof Street House"],
      bestLunch: ["Bo-Kaap Kombuis","Harbour House (Kalk Bay)","Bukhara (Church Street)","Hemelhuijs"],
      bestDinner: ["FYN","The Pot Luck Club","Harbour House (V&A Waterfront)","Bukhara (Church Street)"],
      bestCocktails: ["The Gin Bar","Planet Bar (Belmond Mount Nelson Hotel)","Harbour House (Camps Bay)","Kloof Street House"],
      bestBakeries: ["Schoon (Sea Point)","Knead (Muizenberg)","Oranjezicht City Farm Market"],
      bestCoffee: ["Schoon (Sea Point)","Knead (Muizenberg)","Hemelhuijs"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Table Mountain Aerial Cableway": "Table Mountain Aerial Cableway 5821 Tafelberg Rd Cape Town",
      "Zeitz MOCAA": "Zeitz MOCAA South Arm Road V&A Waterfront Cape Town",
      "Castle of Good Hope": "Castle of Good Hope Castle Street Darling Street Cape Town",
      "Norval Foundation": "Norval Foundation 4 Steenberg Road Tokai Cape Town",
      "District Six Museum": "District Six Museum 25A Buitenkant Street Cape Town",
      "Two Oceans Aquarium": "Two Oceans Aquarium Dock Road V&A Waterfront Cape Town",
      "FYN": "FYN Restaurant 37 Parliament Street Cape Town",
      "La Colombe": "La Colombe Silvermist Estate Hout Bay Cape Town",
      "The Pot Luck Club": "The Pot Luck Club 373 Albert Road Woodstock Cape Town",
      "Bo-Kaap Kombuis": "Bo-Kaap Kombuis 7 August Street Schotsche Kloof Cape Town",
      "Iziko South African Museum": "Iziko South African Museum 25 Queen Victoria Street Cape Town",
      "Oranjezicht City Farm Market": "Oranjezicht City Farm Market Granger Bay Boulevard Dock Road Cape Town",
      "Iziko Bo-Kaap Museum": "Iziko Bo-Kaap Museum 71 Wale Street Cape Town",
      "Planet Bar (Belmond Mount Nelson Hotel)": "Planet Bar Mount Nelson 76 Orange Street Cape Town",
      "Harbour House (Camps Bay)": "Harbour House 87 Victoria Road Camps Bay Cape Town",
      "The Gin Bar": "The Gin Bar 64a Wale Street Cape Town",
      "Cape Town Science Centre": "Cape Town Science Centre 370B Main Road Observatory Cape Town",
      "Iziko South African National Gallery": "Iziko South African National Gallery Government Avenue Cape Town",
      "Iziko Slave Lodge": "Iziko Slave Lodge Adderley Street Wale Street Cape Town",
      "Neighbourgoods Market (Old Biscuit Mill)": "Neighbourgoods Market Old Biscuit Mill 373 Albert Road Woodstock Cape Town",
      "Hemelhuijs": "Hemelhuijs 71 Waterkant Street Cape Town",
      "Schoon (Sea Point)": "Schoon The Point Mall 76 Regent Road Sea Point Cape Town",
      "Knead (Muizenberg)": "Knead Bakery Beach Road Muizenberg Cape Town",
      "Kloof Street House": "Kloof Street House 30 Kloof Street Cape Town",
      "Harbour House (Kalk Bay)": "Harbour House Kalk Bay Harbour Kalk Bay Cape Town",
      "Bukhara (Church Street)": "Bukhara 33 Church Street Cape Town",
      "Harbour House (V&A Waterfront)": "Harbour House Quay Four V&A Waterfront Cape Town"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Cape Town" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Table Mountain's cableway, museums, galleries and food markets, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Table Mountain Aerial Cableway","Zeitz MOCAA","Castle of Good Hope","Norval Foundation"];
    cityGuide.tip = "The Table Mountain Aerial Cableway says it may close in bad weather, so check its live status on the day; standard tickets stay valid for 7 days if the mountain is clouded in.";
    data.destinationFacts[cityKey] = "The Table Mountain Aerial Cableway says it may close in bad weather, so check its live status on the day; standard tickets stay valid for 7 days if the mountain is clouded in.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Table Mountain's cableway, museums, galleries and food markets, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon–Tue at Norval; Mon at Bo-Kaap Kombuis; Sun at the Science Centre",
        "copy": "Norval Foundation is closed Monday and Tuesday, Bo-Kaap Kombuis is closed on Mondays, and the Cape Town Science Centre is closed on Sundays. The Iziko museums and Castle of Good Hope close on Christmas Day and Workers' Day."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead for District Six and fine dining",
        "copy": "District Six Museum says bookings are essential via Quicket, and Bo-Kaap Kombuis says bookings are essential. FYN, La Colombe and The Pot Luck Club take deposits, with FYN and La Colombe refunding cancellations made more than 48 hours ahead."
      },
      {
        "label": "Walk-ins and queues",
        "value": "Cableway tickets valid 7 days",
        "copy": "Standard Table Mountain Aerial Cableway tickets are valid for 7 days, while Fast Track needs an online timeslot. The Gin Bar welcomes walk-ins, entered through the Honest Chocolate cafe on Wale Street."
      },
      {
        "label": "Age rules",
        "value": "Under-18s free at Zeitz MOCAA",
        "copy": "Zeitz MOCAA admits visitors under 18 free. La Colombe does not admit children under eight, and Bukhara (Church Street) does not allow under-12s at dinner service."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Pair the cableway with a weather-proof museum backup, and book dinners and District Six Museum ahead.",
      intro: [
        "Start with the Table Mountain Aerial Cableway on Tafelberg Road, where first cars go up at 08:30 and the operator warns the Cableway may close in bad weather. Standard tickets are valid for 7 days, which gives you room if cloud sets in, while Fast Track tickets need an online timeslot. On a closed-mountain day, the Two Oceans Aquarium on Dock Road at the V&A Waterfront is open daily from 9:30am to 6pm, and the Cape Town Science Centre in Observatory runs Monday to Saturday.",
        "For art, Zeitz MOCAA in the Silo District opens daily from 10:00 to 18:00 with last entry at 17:30, and visitors under 18 enter free. Its current programme includes 'A Protea Is Not a Flower', running until 20 June 2027, with 'Were It Not for Shadows …' opening on 12 November 2026. Out in Tokai, the Norval Foundation is closed Monday and Tuesday; its Irma Stern exhibition 'Looking Closer to Home' runs until 10 January 2027.",
        "History sits close together in the city centre. The Castle of Good Hope opens daily from 09h00 to 16h00, with last tickets at 15:45. The District Six Museum on Buitenkant Street opens Monday to Saturday and says bookings are essential. Iziko runs the South African Museum on Queen Victoria Street, the National Gallery on Government Avenue, the Slave Lodge and the Bo-Kaap Museum on Wale Street, all closed on Christmas Day and Workers' Day. You can then walk on to Bo-Kaap Kombuis on August Street, which is closed on Mondays and asks you to book.",
        "For mornings, Hemelhuijs on Waterkant Street opens at 9am on weekdays, and Schoon in Sea Point opens at 07:00. The Oranjezicht City Farm Market moved to its new Granger Bay Boulevard site in December 2025 and trades on Saturday and Sunday mornings, plus a Wednesday night market outside June and July. In the evening, FYN serves dinner Monday to Saturday, The Pot Luck Club takes a deposit per guest, and The Gin Bar on Wale Street welcomes walk-ins from 3pm Thursday to Saturday."
      ],
      summaryCards: [
        [
          "First visit",
          "Ride the Table Mountain Aerial Cableway early, then spend the afternoon at the Castle of Good Hope and the District Six Museum."
        ],
        [
          "A slower morning",
          "Have breakfast at Hemelhuijs or Schoon (Sea Point), then browse the Oranjezicht City Farm Market on a Saturday or Sunday."
        ],
        [
          "Before booking",
          "Check the cableway's weather status on the day, avoid Norval Foundation on Mondays and Tuesdays, and expect deposits at FYN, La Colombe and The Pot Luck Club."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Toronto, Canada: source review of 2026-10-25 (docs/content-research/toronto-2026-10-25.md).
  {
    const cityKey = "Toronto, Canada";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["CN Tower","St. Lawrence Market","Royal Ontario Museum","Casa Loma"],
      bestFirstTimers: ["CN Tower","Distillery Historic District","St. Lawrence Market","Ripley's Aquarium of Canada"],
      bestRestaurants: ["Alo","Pai (18 Duncan)","Richmond Station","Canoe"],
      bestBudget: ["High Park","St. Lawrence Market","Bata Shoe Museum","Aga Khan Museum"],
      bestLuxury: ["Alo","Canoe","Richmond Station"],
      bestCouples: ["Distillery Historic District","Casa Loma","Canoe","Bar Mordecai"],
      bestKids: ["Toronto Zoo","Ripley's Aquarium of Canada","Royal Ontario Museum","High Park"],
      bestSolo: ["Gardiner Museum","Bata Shoe Museum","Sam James Coffee Bar (Harbord)","Bar Raval"],
      bestUnique: ["Bata Shoe Museum","Aga Khan Museum","Steam Whistle Brewing","Gardiner Museum"],
      bestBreakfast: ["Maha's","Lady Marmalade","Simpl Things"],
      bestLunch: ["Pai (18 Duncan)","Richmond Station","St. Lawrence Market","Forno Cultura (King)"],
      bestDinner: ["Alo","Richmond Station","Pai (18 Duncan)","Canoe"],
      bestCocktails: ["Bar Raval","Bar Mordecai","Simpl Things"],
      bestBakeries: ["Harbord Bakery","Forno Cultura (King)"],
      bestCoffee: ["Sam James Coffee Bar (Harbord)","De Mello (Yonge & Castlefield)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "CN Tower": "CN Tower 290 Bremner Blvd Toronto",
      "St. Lawrence Market": "St. Lawrence Market 92 Front St East Toronto",
      "Royal Ontario Museum": "Royal Ontario Museum 100 Queen's Park Toronto",
      "Casa Loma": "Casa Loma 1 Austin Terrace Toronto",
      "Distillery Historic District": "Distillery Historic District 55 Mill Street Toronto",
      "Ripley's Aquarium of Canada": "Ripley's Aquarium of Canada 288 Bremner Boulevard Toronto",
      "Alo": "Alo 163 Spadina Avenue Toronto",
      "Pai (18 Duncan)": "Pai 18 Duncan Street Toronto",
      "Richmond Station": "Richmond Station 1 Richmond St W Toronto",
      "Canoe": "Canoe 66 Wellington St W Toronto",
      "High Park": "High Park Bloor Street West and High Park Avenue Toronto",
      "Bata Shoe Museum": "Bata Shoe Museum 327 Bloor St W Toronto",
      "Aga Khan Museum": "Aga Khan Museum 77 Wynford Drive Toronto",
      "Bar Mordecai": "Bar Mordecai 1272 Dundas Street West Toronto",
      "Toronto Zoo": "Toronto Zoo 2000 Meadowvale Road Toronto",
      "Gardiner Museum": "Gardiner Museum 111 Queen's Park Toronto",
      "Sam James Coffee Bar (Harbord)": "Sam James Coffee Bar 297 Harbord St Toronto",
      "Bar Raval": "Bar Raval 505 College St Toronto",
      "Steam Whistle Brewing": "Steam Whistle Brewing 255 Bremner Blvd Toronto",
      "Maha's": "Maha's 226 Greenwood Avenue Toronto",
      "Lady Marmalade": "Lady Marmalade 265 Broadview Ave Toronto",
      "Simpl Things": "Simpl Things 269 Dunn Ave Toronto",
      "Forno Cultura (King)": "Forno Cultura 609 King St W Toronto",
      "Harbord Bakery": "Harbord Bakery 115 Harbord St Toronto",
      "De Mello (Yonge & Castlefield)": "De Mello 2489 Yonge Street Toronto"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Toronto" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Toronto's towers, museums, markets and parks, with brunch spots, dinners, cocktail bars, bakeries and cafés checked against their own websites.";
    cityGuide.highlights = ["CN Tower","Royal Ontario Museum","St. Lawrence Market","Casa Loma"];
    cityGuide.tip = "Plan around Monday closures: St. Lawrence Market's South Market and the Aga Khan Museum are closed Mondays, while the Gardiner Museum stays open until 9pm on Wednesdays.";
    data.destinationFacts[cityKey] = "Plan around Monday closures: St. Lawrence Market's South Market and the Aga Khan Museum are closed Mondays, while the Gardiner Museum stays open until 9pm on Wednesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Toronto's towers, museums, markets and parks, with brunch spots, dinners, cocktail bars, bakeries and cafés checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and weekends",
        "copy": "St. Lawrence Market's South Market and the Aga Khan Museum close on Mondays, and Canoe is closed to the public on Saturdays and Sundays. Maha's is closed Wednesdays and national holidays."
      },
      {
        "label": "Free entry",
        "value": "Sundays and Wednesday evenings",
        "copy": "The Bata Shoe Museum is free every Sunday, the Aga Khan Museum is free on Wednesdays from 4 to 8pm, and the Gardiner Museum is free after 4pm on Wednesdays."
      },
      {
        "label": "Booking",
        "value": "Book ahead for dinner",
        "copy": "Pai's downtown reservations open 30 days in advance and aren't taken by phone. Canoe takes online reservations up to 3 months ahead for parties of up to 12."
      },
      {
        "label": "Walk-ins",
        "value": "No-reservation spots",
        "copy": "Bar Raval states \"NO RESERVATIONS\" and Maha's is walk-in only. Simpl Things takes online bookings for up to 6 but says walk-ins are always accepted."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Pair a downtown landmark with a museum each day, and book dinners ahead while saving bars and brunch for walk-ins.",
      intro: [
        "Toronto's core sights cluster near the waterfront. The CN Tower, at 290 Bremner Blvd., sells timed tickets online, including EdgeWalk and reservations at its 360 Restaurant, and it is hosting a Toronto Biennial of Art work until December 20, 2026. Ripley's Aquarium of Canada sits next door at 288 Bremner Boulevard, and Steam Whistle Brewing at 255 Bremner Blvd. takes tour bookings. East of downtown, St. Lawrence Market's South Market opens Tuesday to Sunday and closes Mondays, with the Saturday Farmer's Market starting at 5am.",
        "For museums, the Royal Ontario Museum at 100 Queen's Park runs Psychedelics until December 6, 2026, and opens until 8:30pm on the third Tuesday of the month. Across the road, the Gardiner Museum stays open until 9pm on Wednesdays, with free entry after 4pm. The Bata Shoe Museum on Bloor Street West is free every Sunday and opened its beaded-footwear exhibition, Brilliant, on October 22. Further north, the Aga Khan Museum shows Saks Afridi: SpaceMosque until March 7, 2027, and closes on Mondays.",
        "If you want a slower day, the Distillery Historic District at 55 Mill Street is open 364 days a year, and its Winter Village opens on November 12, 2026, with free entry Monday to Wednesday through December 13 and tickets on weekend evenings. Casa Loma opens daily from 9:30am to 5pm with date-specific tickets. High Park is a free outdoor option, but the City says its Animal Display is closed until Spring 2027. The Toronto Zoo opens daily from 9:30am to 4:30pm, with last admission an hour before closing.",
        "For food, book dinner ahead. Pai's downtown reservations open 30 days in advance, Canoe on the 54th floor of the TD Bank Tower takes bookings up to three months ahead and is closed on weekends, and Alo serves from Tuesday to Saturday. For breakfast, Maha's on Greenwood Avenue is walk-in only and closed Wednesdays, and Lady Marmalade on Broadview opens daily from 8:30 to 3. In the evening, Bar Raval on College Street takes no reservations and opens daily from 1pm to 1am."
      ],
      summaryCards: [
        [
          "First visit",
          "Start with the CN Tower and Ripley's Aquarium on Bremner Boulevard, then walk to St. Lawrence Market, remembering it's closed on Mondays."
        ],
        [
          "A slower morning",
          "Have a walk-in brunch at Maha's (closed Wednesdays) or Lady Marmalade, then visit the Gardiner or Bata Shoe Museum on Bloor and Queen's Park."
        ],
        [
          "Before booking",
          "Pai's downtown tables open 30 days ahead and Canoe's three months ahead, while Bar Raval and Maha's take no reservations."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Vancouver, Canada: source review of 2026-10-25 (docs/content-research/vancouver-2026-10-25.md).
  {
    const cityKey = "Vancouver, Canada";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Grouse Mountain","Capilano Suspension Bridge Park","Vancouver Art Gallery","Granville Island Public Market"],
      bestFirstTimers: ["Granville Island Public Market","Vancouver Art Gallery","Capilano Suspension Bridge Park","Museum of Anthropology at UBC"],
      bestRestaurants: ["Vij's","Blue Water Cafe","Published on Main","Kissa Tanto"],
      bestBudget: ["The Polygon Gallery","Lonsdale Quay Market","Granville Island Public Market","Nemesis Coffee (Gastown)"],
      bestLuxury: ["Hawksworth Restaurant","Botanist","Blue Water Cafe","Published on Main"],
      bestCouples: ["The Teahouse in Stanley Park","Kissa Tanto","St. Lawrence","Botanist"],
      bestKids: ["Museum of Vancouver","Vancouver Maritime Museum","Grouse Mountain","Granville Island Public Market"],
      bestSolo: ["Museum of Anthropology at UBC","The Polygon Gallery","Vancouver Art Gallery","Nemesis Coffee (Gastown)"],
      bestUnique: ["Museum of Anthropology at UBC","Vancouver Maritime Museum","The Keefer Bar","Lonsdale Quay Market"],
      bestBreakfast: ["Café Medina","Purebread (Gastown)","Small Victory (Yaletown)","Beaucoup Bakery (Kitsilano)"],
      bestLunch: ["Miku Vancouver","Hawksworth Restaurant","Joe Fortes Seafood & Chop House","Granville Island Public Market"],
      bestDinner: ["Vij's","St. Lawrence","Kissa Tanto","Blue Water Cafe"],
      bestCocktails: ["The Keefer Bar","Botanist","Hawksworth Restaurant","The Pourhouse"],
      bestBakeries: ["Purebread (Gastown)","Beaucoup Bakery (Kitsilano)","Small Victory (Yaletown)"],
      bestCoffee: ["Nemesis Coffee (Gastown)","Small Victory (Yaletown)","Café Medina"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Grouse Mountain": "Grouse Mountain 6400 Nancy Greene Way North Vancouver",
      "Capilano Suspension Bridge Park": "Capilano Suspension Bridge Park 3735 Capilano Road North Vancouver",
      "Vancouver Art Gallery": "Vancouver Art Gallery 750 Hornby Street Vancouver",
      "Granville Island Public Market": "Granville Island Public Market 1689 Johnston Street Vancouver",
      "Museum of Anthropology at UBC": "Museum of Anthropology at UBC 6393 NW Marine Drive Vancouver",
      "Vij's": "Vij's 3106 Cambie Street Vancouver",
      "Blue Water Cafe": "Blue Water Cafe 1095 Hamilton Street Vancouver",
      "Published on Main": "Published on Main 3593 Main Street Vancouver",
      "Kissa Tanto": "Kissa Tanto 263 East Pender Street Vancouver",
      "The Polygon Gallery": "The Polygon Gallery 101 Carrie Cates Court North Vancouver",
      "Lonsdale Quay Market": "Lonsdale Quay Market 123 Carrie Cates Court North Vancouver",
      "Nemesis Coffee (Gastown)": "Nemesis Coffee 302 West Hastings Street Vancouver",
      "Hawksworth Restaurant": "Hawksworth Restaurant 801 West Georgia Street Vancouver",
      "Botanist": "Botanist 1038 Canada Place Vancouver",
      "The Teahouse in Stanley Park": "The Teahouse Ferguson Point Stanley Park Vancouver",
      "St. Lawrence": "St. Lawrence 269 Powell Street Vancouver",
      "Museum of Vancouver": "Museum of Vancouver 1100 Chestnut Street Vancouver",
      "Vancouver Maritime Museum": "Vancouver Maritime Museum 1905 Ogden Ave Vancouver",
      "The Keefer Bar": "The Keefer Bar 135 Keefer Street Vancouver",
      "Café Medina": "Café Medina 780 Richards Street Vancouver",
      "Purebread (Gastown)": "Purebread 159 West Hastings Street Vancouver",
      "Small Victory (Yaletown)": "Small Victory 1089 Marinaside Crescent Vancouver",
      "Beaucoup Bakery (Kitsilano)": "Beaucoup Bakery 2150 Fir Street Vancouver",
      "Miku Vancouver": "Miku 200 Granville Street Vancouver",
      "Joe Fortes Seafood & Chop House": "Joe Fortes Seafood & Chop House 777 Thurlow Street Vancouver",
      "The Pourhouse": "The Pourhouse 162 Water Street Vancouver"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Vancouver" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, North Shore viewpoints and public markets, with breakfast spots, dinners, bakeries, coffee and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Capilano Suspension Bridge Park","Museum of Anthropology at UBC","Vancouver Art Gallery","Granville Island Public Market"];
    cityGuide.tip = "Check closing days before you plan: the Vancouver Art Gallery is closed on Tuesdays, the Museum of Anthropology at UBC is closed Mondays from October 15 to May 15, and The Polygon Gallery lists no Monday or Tuesday hours.";
    data.destinationFacts[cityKey] = "Check closing days before you plan: the Vancouver Art Gallery is closed on Tuesdays, the Museum of Anthropology at UBC is closed Mondays from October 15 to May 15, and The Polygon Gallery lists no Monday or Tuesday hours.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, North Shore viewpoints and public markets, with breakfast spots, dinners, bakeries, coffee and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Tue and Mon gaps",
        "copy": "The Vancouver Art Gallery is closed on Tuesdays, and the Museum of Anthropology at UBC is closed Mondays from October 15 to May 15. Vancouver Maritime Museum opens Tuesday to Sunday, and St. Lawrence serves Wednesday to Sunday only."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead",
        "copy": "The Vancouver Art Gallery recommends booking online to avoid the line, and Capilano Suspension Bridge Park says passholders must reserve online with limited weekend slots. Kissa Tanto releases Tock reservations 30 days in advance at midnight."
      },
      {
        "label": "Walk-ins and deals",
        "value": "Free or cheaper slots",
        "copy": "Vij's says walk-in guests are always welcome, and The Keefer Bar keeps plenty of space for walk-ins. The Polygon Gallery is always by donation, and the Museum of Anthropology at UBC is half price on Thursdays after 5 pm."
      },
      {
        "label": "Rules",
        "value": "19+ and large groups",
        "copy": "The Keefer Bar states guests must be 19+. Blue Water Cafe asks parties of 8 or more to contact it directly, and Kissa Tanto's largest table seats 6."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Pair one North Shore outing with a museum day downtown or at UBC, and check each venue's closing day before you commit.",
      intro: [
        "Vancouver rewards you for splitting your days between the city and the North Shore. Capilano Suspension Bridge Park at 3735 Capilano Road lists hours of 10 AM to 8 PM and asks passholders to reserve online, with limited weekend and holiday slots. Further up Nancy Greene Way, Grouse Mountain advertises newly opened Red Skyride cabins. Back on the water, Lonsdale Quay Market is open seven days a week, and The Polygon Gallery next door is always admission by donation, open Wednesday to Sunday with Thursdays until 9pm.",
        "For museums, plan around closing days. The Vancouver Art Gallery on Hornby Street is closed on Tuesdays and stays open until 8 PM on Fridays; Future Geographies and SANCTUARY: The Ancient Forest Experience both run until January 10, 2027. The Museum of Anthropology at UBC is closed Mondays from October 15 to May 15, opens late on Thursdays until 9 pm at half price after 5 pm, and shows Tupananchiskama: Ancient Andean Cosmovision until January 3, 2027, with From the Deep opening November 19, 2026.",
        "In Kitsilano, the Museum of Vancouver stays open until 8pm Thursday to Saturday, and the Vancouver Maritime Museum opens Tuesday to Sunday, with its St. Roch Revitalization listed as opening Winter 2026/2027. For a slower morning, the Granville Island Public Market opens 9 AM to 6 PM and closes on Mondays in January only. Purebread's Gastown branch opens daily from 8am, while Beaucoup Bakery's Kitsilano shop lists closures on Tuesdays and Wednesdays.",
        "Dinner needs some planning. Kissa Tanto on East Pender opens Tock reservations 30 days ahead at midnight, while Vij's on Cambie opens daily from 5:30 p.m. and says walk-in guests are always welcome. Published on Main says it is ranked #17 on North America's 50 Best Restaurants 2026, and Hawksworth runs a daily lounge-only cocktail hour from 4pm to 6pm. For a late drink, The Keefer Bar in Chinatown is open until 1am most nights and 2am on weekends, for guests 19 and over."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Vancouver Art Gallery (closed Tuesdays) with lunch at the Granville Island Public Market, then cross to Capilano Suspension Bridge Park."
        ],
        [
          "A slower morning",
          "Start with a pastry at Purebread in Gastown from 8am, then walk to Nemesis Coffee on West Hastings before the galleries open at 10."
        ],
        [
          "Before booking",
          "Kissa Tanto releases tables 30 days ahead on Tock, Capilano passholders must reserve online, and The Keefer Bar admits guests 19 and over only."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Rio de Janeiro, Brazil: source review of 2026-10-25 (docs/content-research/rio-de-janeiro-2026-10-25.md).
  {
    const cityKey = "Rio de Janeiro, Brazil";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Cristo Redentor","Bondinho Pão de Açúcar","Museu do Amanhã","Jardim Botânico do Rio de Janeiro"],
      bestFirstTimers: ["Trem do Corcovado","Bondinho Pão de Açúcar","Museu do Amanhã","Real Gabinete Português de Leitura"],
      bestRestaurants: ["Oro","Lasai","Aprazível","Churrascaria Palace"],
      bestBudget: ["MAM Rio","Parque Nacional da Tijuca","CADEG","Real Gabinete Português de Leitura"],
      bestLuxury: ["MEE (Belmond Copacabana Palace)","Lasai","Oro","Pérgula (Belmond Copacabana Palace)"],
      bestCouples: ["Bondinho Pão de Açúcar","Aprazível","Parque Lage (Escola de Artes Visuais)","Spirit Copa Bar (Fairmont Rio de Janeiro Copacabana)"],
      bestKids: ["AquaRio","Museu do Amanhã","Jardim Botânico do Rio de Janeiro","Trem do Corcovado"],
      bestSolo: ["CCBB Rio de Janeiro","MAM Rio","Curto Café (Centro)","Real Gabinete Português de Leitura"],
      bestUnique: ["Real Gabinete Português de Leitura","CADEG","Parque Lage (Escola de Artes Visuais)","Parque Nacional da Tijuca"],
      bestBreakfast: ["Pérgula (Belmond Copacabana Palace)","La Bicyclette (Jardim Botânico)","Cafeína (Copacabana)","Tropìk (Fairmont Rio de Janeiro Copacabana)"],
      bestLunch: ["Bar Urca","Confeitaria Colombo (Rua Gonçalves Dias)","Academia da Cachaça (Leblon)","Churrascaria Palace"],
      bestDinner: ["Oro","Lasai","Aprazível","Churrascaria Palace"],
      bestCocktails: ["Spirit Copa Bar (Fairmont Rio de Janeiro Copacabana)","Academia da Cachaça (Leblon)","Bar Urca"],
      bestBakeries: ["Confeitaria Colombo (Rua Gonçalves Dias)","La Bicyclette (Jardim Botânico)"],
      bestCoffee: ["Curto Café (Centro)","Cafeína (Copacabana)","Coa Café & Co (Fairmont Rio de Janeiro Copacabana)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Cristo Redentor": "Cristo Redentor Parque Nacional da Tijuca Alto da Boa Vista Rio de Janeiro",
      "Bondinho Pão de Açúcar": "Bondinho Pão de Açúcar Av. Pasteur 520 Urca Rio de Janeiro",
      "Museu do Amanhã": "Museu do Amanhã Praça Mauá 1 Centro Rio de Janeiro",
      "Jardim Botânico do Rio de Janeiro": "Jardim Botânico Rua Jardim Botânico 1008 Rio de Janeiro",
      "Trem do Corcovado": "Trem do Corcovado Rua Cosme Velho 513 Rio de Janeiro",
      "Real Gabinete Português de Leitura": "Real Gabinete Português de Leitura Rua Luís de Camões 30 Rio de Janeiro",
      "Oro": "Oro Rua General San Martin 889 Leblon Rio de Janeiro",
      "Lasai": "Lasai Largo dos Leões 35 Humaitá Rio de Janeiro",
      "Aprazível": "Aprazível Rua Aprazível 62 Santa Teresa Rio de Janeiro",
      "Churrascaria Palace": "Churrascaria Palace Rua Rodolfo Dantas 16 Copacabana Rio de Janeiro",
      "MAM Rio": "MAM Rio Av. Infante Dom Henrique 85 Rio de Janeiro",
      "Parque Nacional da Tijuca": "Parque Nacional da Tijuca Estrada da Cascatinha 850 Rio de Janeiro",
      "CADEG": "CADEG Rua Capitão Félix 110 Benfica Rio de Janeiro",
      "MEE (Belmond Copacabana Palace)": "MEE Copacabana Palace Avenida Atlântica 1702 Rio de Janeiro",
      "Pérgula (Belmond Copacabana Palace)": "Pérgula Copacabana Palace Avenida Atlântica 1702 Rio de Janeiro",
      "Parque Lage (Escola de Artes Visuais)": "Parque Lage Rua Jardim Botânico 414 Rio de Janeiro",
      "Spirit Copa Bar (Fairmont Rio de Janeiro Copacabana)": "Spirit Copa Bar Fairmont Avenida Atlântica 4240 Rio de Janeiro",
      "AquaRio": "AquaRio Praça Muhammad Ali Gamboa Rio de Janeiro",
      "CCBB Rio de Janeiro": "CCBB Rua Primeiro de Março 66 Rio de Janeiro",
      "Curto Café (Centro)": "Curto Café Rua da Assembleia 10 Centro Rio de Janeiro",
      "La Bicyclette (Jardim Botânico)": "La Bicyclette Rua Pacheco Leão 320 Rio de Janeiro",
      "Cafeína (Copacabana)": "Cafeína Rua Barata Ribeiro 507 Copacabana Rio de Janeiro",
      "Tropìk (Fairmont Rio de Janeiro Copacabana)": "Tropik Fairmont Avenida Atlântica 4240 Rio de Janeiro",
      "Bar Urca": "Bar Urca Rua Candido Gaffree 205 Rio de Janeiro",
      "Confeitaria Colombo (Rua Gonçalves Dias)": "Confeitaria Colombo Rua Gonçalves Dias 32 Rio de Janeiro",
      "Academia da Cachaça (Leblon)": "Academia da Cachaça Rua Conde de Bernadotte 26 Leblon Rio de Janeiro",
      "Coa Café & Co (Fairmont Rio de Janeiro Copacabana)": "Coa Café Fairmont Avenida Atlântica 4240 Rio de Janeiro"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Rio de Janeiro" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Cable car and rack railway, museums, parks and a wholesale market, with breakfast spots, tasting-menu dinners, cafés, a historic confeitaria and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Cristo Redentor","Bondinho Pão de Açúcar","Museu do Amanhã","Jardim Botânico do Rio de Janeiro"];
    cityGuide.tip = "Avoid Wednesday mornings for Museu do Amanhã and the Jardim Botânico: the museum publishes Thursday-to-Tuesday hours, the garden's museum is closed on Wednesdays and its arboretum opens only at 11h that day.";
    data.destinationFacts[cityKey] = "Avoid Wednesday mornings for Museu do Amanhã and the Jardim Botânico: the museum publishes Thursday-to-Tuesday hours, the garden's museum is closed on Wednesdays and its arboretum opens only at 11h that day.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Cable car and rack railway, museums, parks and a wholesale market, with breakfast spots, tasting-menu dinners, cafés, a historic confeitaria and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Wednesdays and Sun–Mon",
        "copy": "Museu do Amanhã publishes Thursday-to-Tuesday hours and the Museu do Jardim Botânico is closed on Wednesdays. Oro is closed on Sunday and Monday, and La Bicyclette's Leblon branch closes on Mondays."
      },
      {
        "label": "Tickets and booking",
        "value": "Buy ahead online",
        "copy": "The Jardim Botânico asks you to buy tickets in advance through its ticketing site, and AquaRio offers a discount for online booking. Trem do Corcovado sells tickets online, by phone and through its app."
      },
      {
        "label": "Reservations",
        "value": "Book dinners",
        "copy": "Lasai serves only by reservation ('Só atendemos mediante reserva'), with seatings at 20:00 Tuesday to Friday. Oro takes bookings through Meitre or by phone."
      },
      {
        "label": "Visitor rules",
        "value": "Bags and children",
        "copy": "At MAM Rio, items larger than 45 cm × 30 cm cannot enter the galleries, children under 12 must be with an adult, and food and drink stay out of exhibition spaces."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan your museum days around Wednesday closures, book Corcovado, Sugarloaf and dinner tables online, and save free MAM Rio for a Wednesday-to-Sunday slot.",
      intro: [
        "You can reach Rio's two classic viewpoints with tickets bought online. Trem do Corcovado runs from Rua Cosme Velho, 513 and sells tickets through its site, app and phone line; children up to 6 ride free on a guardian's lap. The Santuário Cristo Redentor marked the statue's 95th anniversary in October 2026. Bondinho Pão de Açúcar leaves from Av. Pasteur, 520 in Urca, runs from 08:30 on weekdays and 07:30 at weekends, and stops boarding at 19:30.",
        "Museu do Amanhã, on Praça Mauá, opens Thursday to Tuesday from 10h to 18h and is marking its tenth anniversary with an exhibition and a new outdoor sculpture garden. Nearby, CCBB Rio shows 'Amazônicas – Poéticas Femininas' until 16 November and 'Palavras em Cena' until 31 December. MAM Rio in Parque do Flamengo is free and open Wednesday to Sunday. You can also see the reading room of the Real Gabinete Português de Leitura, which opens on weekdays from 10h to 17h.",
        "For greener days, the Jardim Botânico's arboretum opens Thursday to Tuesday from 8h, but only from 11h on Wednesdays, when its museum is closed; you should buy tickets in advance. Parque Lage, at Rua Jardim Botânico, 414, runs a busy arts programme listed on its own site. Parque Nacional da Tijuca opens daily from 8h to 17h. If you are travelling with children, AquaRio in Gamboa opens every day from 9h, with last entry at 16h.",
        "For dinner, Lasai in Humaitá serves a single tasting menu and takes reservations only. Oro in Leblon offers 'Criatividade' and 'Afetividade' menus and is closed on Sundays and Mondays. Aprazível in Santa Teresa takes online bookings, and Churrascaria Palace in Copacabana is celebrating 75 years of rodízio. For drinks, try the house mixology at Spirit Copa Bar or the caipirinhas at Academia da Cachaça in Leblon. For a slower morning, La Bicyclette opens at 8h, and Curto Café pours coffee in Centro on weekdays."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Trem do Corcovado up to Cristo Redentor with an evening Bondinho Pão de Açúcar ride, remembering last boarding is at 19:30."
        ],
        [
          "A slower morning",
          "Start with pastries at La Bicyclette in Jardim Botânico from 8h, then walk the Jardim Botânico arboretum (from 11h on Wednesdays)."
        ],
        [
          "Before booking",
          "Reserve Lasai and Oro ahead, buy Jardim Botânico and AquaRio tickets online, and avoid Wednesdays for Museu do Amanhã."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Melbourne, Australia: source review of 2026-10-25 (docs/content-research/melbourne-2026-10-25.md).
  {
    const cityKey = "Melbourne, Australia";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Federation Square","NGV International","State Library Victoria","Royal Botanic Gardens Victoria – Melbourne Gardens"],
      bestFirstTimers: ["Federation Square","Queen Victoria Market","Melbourne Skydeck","ACMI"],
      bestRestaurants: ["Flower Drum","Florentino","Chin Chin","Supernormal"],
      bestBudget: ["ACMI","NGV International","State Library Victoria","Federation Square"],
      bestLuxury: ["Vue de monde","Attica","Flower Drum","Florentino"],
      bestCouples: ["Royal Botanic Gardens Victoria – Melbourne Gardens","Eau de Vie","Vue de monde","Heide Museum of Modern Art"],
      bestKids: ["Collingwood Children's Farm","Melbourne Skydeck","ACMI","Royal Botanic Gardens Victoria – Melbourne Gardens"],
      bestSolo: ["State Library Victoria","The Ian Potter Centre: NGV Australia","Higher Ground","Cumulus Inc."],
      bestUnique: ["Old Melbourne Gaol","Heide Museum of Modern Art","Siglo","Black Pearl"],
      bestBreakfast: ["Higher Ground","Tivoli Road Bakery","Baker Bleu (Cremorne)","Lune Croissanterie (Fitzroy)"],
      bestLunch: ["Cumulus Inc.","Chin Chin","Queen Victoria Market","Florentino"],
      bestDinner: ["Flower Drum","Attica","Supernormal","Cumulus Inc."],
      bestCocktails: ["Black Pearl","Siglo","Eau de Vie","Florentino"],
      bestBakeries: ["Lune Croissanterie (Fitzroy)","Baker Bleu (Cremorne)","Tivoli Road Bakery","Brunetti Classico (Carlton)"],
      bestCoffee: ["Higher Ground","Lune Croissanterie (Fitzroy)","ACMI"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Federation Square": "Federation Square Swanston St & Flinders St Melbourne",
      "NGV International": "NGV International 180 St Kilda Road Melbourne",
      "State Library Victoria": "State Library Victoria 328 Swanston Street Melbourne",
      "Royal Botanic Gardens Victoria – Melbourne Gardens": "Royal Botanic Gardens Birdwood Avenue Melbourne",
      "Queen Victoria Market": "Queen Victoria Market Queen Street Melbourne",
      "Melbourne Skydeck": "Melbourne Skydeck Riverside Quay Southbank Melbourne",
      "ACMI": "ACMI Federation Square Flinders St Melbourne",
      "Flower Drum": "Flower Drum 17 Market Lane Melbourne",
      "Florentino": "Florentino 80 Bourke Street Melbourne",
      "Chin Chin": "Chin Chin 125 Flinders Lane Melbourne",
      "Supernormal": "Supernormal 180 Flinders Lane Melbourne",
      "Vue de monde": "Vue de monde 525 Collins Street Melbourne",
      "Attica": "Attica 74 Glen Eira Road Ripponlea Melbourne",
      "Eau de Vie": "Eau de Vie 1 Malthouse Lane Melbourne",
      "Heide Museum of Modern Art": "Heide Museum of Modern Art 7 Templestowe Road Bulleen Melbourne",
      "Collingwood Children's Farm": "Collingwood Children's Farm St Heliers St Abbotsford Melbourne",
      "The Ian Potter Centre: NGV Australia": "The Ian Potter Centre NGV Australia Federation Square Flinders St Melbourne",
      "Higher Ground": "Higher Ground 650 Little Bourke St Melbourne",
      "Cumulus Inc.": "Cumulus Inc 45 Flinders Lane Melbourne",
      "Old Melbourne Gaol": "Old Melbourne Gaol 377 Russell Street Melbourne",
      "Siglo": "Siglo 161 Spring Street Melbourne",
      "Black Pearl": "Black Pearl 304 Brunswick St Fitzroy Melbourne",
      "Tivoli Road Bakery": "Tivoli Road Bakery 3 Tivoli Road South Yarra Melbourne",
      "Baker Bleu (Cremorne)": "Baker Bleu 65 Dover Street Cremorne Melbourne",
      "Lune Croissanterie (Fitzroy)": "Lune Croissanterie 119 Rose St Fitzroy Melbourne",
      "Brunetti Classico (Carlton)": "Brunetti Classico 380 Lygon Street Carlton Melbourne"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Melbourne" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Galleries, gardens, markets and landmarks around Federation Square and the CBD, with bakeries, cafés, restaurants and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Federation Square","NGV International","State Library Victoria","Queen Victoria Market"];
    cityGuide.tip = "Queen Victoria Market lists no Monday or Wednesday trading, and Heide is closed on Mondays except public holidays, so put them on other days.";
    data.destinationFacts[cityKey] = "Queen Victoria Market lists no Monday or Wednesday trading, and Heide is closed on Mondays except public holidays, so put them on other days.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Galleries, gardens, markets and landmarks around Federation Square and the CBD, with bakeries, cafés, restaurants and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon/Wed market gap",
        "copy": "Queen Victoria Market trades Tuesday, Thursday, Friday and weekends only. Heide closes on Mondays (except public holidays), and Eau de Vie is closed Sunday and Monday."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead for fine dining",
        "copy": "Flower Drum takes online bookings only up to 12 weeks ahead, with a $50-per-person fee for changes inside 24 hours. Melbourne Skydeck says booking online saves up to 15%."
      },
      {
        "label": "Walk-ins",
        "value": "No-booking bars",
        "copy": "Black Pearl is walk-in only (reservations recommended for The Attic), and Siglo states \"No bookings, no time limits\". Cumulus Inc. welcomes walk-ins at any time."
      },
      {
        "label": "Rules",
        "value": "Bags and dress",
        "copy": "At the NGV, backpacks, large bags and umbrellas must be cloaked (free) before entering gallery spaces. Flower Drum asks for smart business casual, with no shorts or thongs."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Base your first day around Federation Square, where the NGV's Ian Potter Centre and ACMI are both free to enter, and book dinners well ahead.",
      intro: [
        "Federation Square, on the corner of Swanston and Flinders Streets, is open 24 hours and free to enter, which makes it an easy first stop. You'll find two free museums there. ACMI, the museum of screen culture, opens daily from 10am to 5pm, with its long-running exhibition The Story of the Moving Image and Lifelike from 20 November to 18 April. The Ian Potter Centre: NGV Australia keeps the same hours and shows Margaret Preston from 4 September to 31 January.",
        "Across the river, NGV International at 180 St Kilda Road is also free for general entry, open daily from 10am to 5pm. It warns that selected gallery spaces may be closed until 13 December while it installs NGV Triennial, so check before you go. For a quieter morning, State Library Victoria at 328 Swanston Street opens 10am to 6pm daily, with Ned Kelly's armour and World of the Book on show. Old Melbourne Gaol on Russell Street opens daily from 10am, apart from Christmas Day and Good Friday.",
        "The Royal Botanic Gardens' Melbourne Gardens on Birdwood Avenue are free and open from 7:30am to 7:30pm every day. Punting on the Lake runs until 31 May 2027, and the Children's Garden opens Wednesday to Sunday, daily in Victorian school holidays. Queen Victoria Market trades Tuesday, Thursday, Friday and weekends, from 6am on weekdays and Saturdays and 9am on Sundays. If you have children with you, Collingwood Children's Farm in Abbotsford opens from 9:30am daily, and Melbourne Skydeck in Southbank offers savings for online bookings.",
        "Plan dining around booking rules. Flower Drum on Market Lane takes online bookings up to 12 weeks ahead and asks for smart business casual. Attica in Ripponlea serves dinner Tuesday to Saturday, while Florentino on Bourke Street holds two hats in The Age Good Food Guide 2026. For drinks, Black Pearl in Fitzroy is walk-in only from Wednesday to Sunday, Siglo on Spring Street takes no bookings, and Eau de Vie requires a credit card to secure a table. For breakfast, Lune in Fitzroy and Tivoli Road Bakery in South Yarra both open early."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at Federation Square, where ACMI and The Ian Potter Centre: NGV Australia are free and open daily from 10am to 5pm."
        ],
        [
          "A slower morning",
          "Take a croissant at Lune in Fitzroy, which opens at 7.30am on weekdays, then walk the Royal Botanic Gardens, open from 7:30am."
        ],
        [
          "Before booking",
          "Flower Drum releases online tables only 12 weeks ahead, and Eau de Vie needs card details to hold a reservation."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Miami, United States: source review of 2026-10-25 (docs/content-research/miami-2026-10-25.md).
  {
    const cityKey = "Miami, United States";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Vizcaya Museum and Gardens","Wynwood Walls","Pérez Art Museum Miami (PAMM)","Fairchild Tropical Botanic Garden"],
      bestFirstTimers: ["Vizcaya Museum and Gardens","Wynwood Walls","Versailles","South Pointe Park"],
      bestRestaurants: ["Joe's Stone Crab","Boia De","Mandolin Aegean Bistro","COTE Miami"],
      bestBudget: ["ICA Miami","South Pointe Park","Bayfront Park","La Sandwicherie (South Beach)"],
      bestLuxury: ["COTE Miami","Joe's Stone Crab","Vizcaya Museum and Gardens"],
      bestCouples: ["Vizcaya Museum and Gardens","Boia De","Café La Trova","Venetian Pool"],
      bestKids: ["Phillip and Patricia Frost Museum of Science","Miami Children's Museum","Zoo Miami","South Pointe Park"],
      bestSolo: ["The Wolfsonian–FIU","ICA Miami","Café Demetrio","Rubell Museum"],
      bestUnique: ["Venetian Pool","Ball & Chain","The Bass","Fairchild Tropical Botanic Garden"],
      bestBreakfast: ["Zak the Baker","Greenstreet Cafe","11th Street Diner","Threefold Cafe"],
      bestLunch: ["Mandolin Aegean Bistro","La Sandwicherie (South Beach)","Versailles","Joe's Stone Crab"],
      bestDinner: ["Joe's Stone Crab","Boia De","COTE Miami","Café La Trova"],
      bestCocktails: ["Sweet Liberty","Broken Shaker (Freehand Miami)","Café La Trova","Ball & Chain"],
      bestBakeries: ["Zak the Baker"],
      bestCoffee: ["Café Demetrio","Threefold Cafe"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Vizcaya Museum and Gardens": "Vizcaya Museum and Gardens 3251 South Miami Ave Miami",
      "Wynwood Walls": "Wynwood Walls 2516 NW 2nd Ave Miami",
      "Pérez Art Museum Miami (PAMM)": "Perez Art Museum Miami 1103 Biscayne Blvd Miami",
      "Fairchild Tropical Botanic Garden": "Fairchild Tropical Botanic Garden 10901 Old Cutler Road Miami",
      "Versailles": "Versailles 3555 SW 8th Street Miami",
      "South Pointe Park": "South Pointe Park 1 Washington Avenue Miami Beach",
      "Joe's Stone Crab": "Joe's Stone Crab 11 Washington Ave Miami Beach",
      "Boia De": "Boia De 5205 NE 2nd Ave Miami",
      "Mandolin Aegean Bistro": "Mandolin Aegean Bistro 4312 NE 2nd Ave Miami",
      "COTE Miami": "COTE Miami 3900 NE 2nd Ave Miami",
      "ICA Miami": "ICA Miami 61 NE 41st Street Miami",
      "Bayfront Park": "Bayfront Park 301 Biscayne Blvd Miami",
      "La Sandwicherie (South Beach)": "La Sandwicherie 229 14th Street Miami Beach",
      "Café La Trova": "Cafe La Trova 971 SW 8th Street Miami",
      "Venetian Pool": "Venetian Pool 2701 De Soto Boulevard Coral Gables",
      "Phillip and Patricia Frost Museum of Science": "Frost Museum of Science 1101 Biscayne Blvd Miami",
      "Miami Children's Museum": "Miami Children's Museum 980 MacArthur Causeway Miami",
      "Zoo Miami": "Zoo Miami 12400 SW 152nd St Miami",
      "The Wolfsonian–FIU": "The Wolfsonian FIU 1001 Washington Avenue Miami Beach",
      "Café Demetrio": "Cafe Demetrio 300 Alhambra Circle Coral Gables",
      "Rubell Museum": "Rubell Museum 1100 NW 23rd St Miami",
      "Ball & Chain": "Ball & Chain 1513 SW 8th Street Miami",
      "The Bass": "The Bass 2100 Collins Avenue Miami Beach",
      "Zak the Baker": "Zak the Baker 295 NW 26th St Miami",
      "Greenstreet Cafe": "Greenstreet Cafe 3468 Main Hwy Coconut Grove Miami",
      "11th Street Diner": "11th Street Diner 1065 Washington Avenue Miami Beach",
      "Threefold Cafe": "Threefold Cafe 141 Giralda Ave Coral Gables",
      "Sweet Liberty": "Sweet Liberty 237 20th Street Miami Beach",
      "Broken Shaker (Freehand Miami)": "Broken Shaker Freehand 2727 Indian Creek Dr Miami Beach"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Miami" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Bayside estates, art museums, gardens and Little Havana bars, with breakfast spots, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Vizcaya Museum and Gardens","Pérez Art Museum Miami (PAMM)","Wynwood Walls","The Bass"];
    cityGuide.tip = "Plan museum days around closures: Vizcaya shuts on Tuesdays, PAMM on Tuesdays and Wednesdays, and The Bass, The Wolfsonian–FIU and ICA Miami on Mondays and Tuesdays.";
    data.destinationFacts[cityKey] = "Plan museum days around closures: Vizcaya shuts on Tuesdays, PAMM on Tuesdays and Wednesdays, and The Bass, The Wolfsonian–FIU and ICA Miami on Mondays and Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Bayside estates, art museums, gardens and Little Havana bars, with breakfast spots, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Tue is the tricky day",
        "copy": "Vizcaya Museum and Gardens is closed on Tuesdays and PAMM on Tuesdays and Wednesdays. The Bass, The Wolfsonian–FIU and ICA Miami close Mondays and Tuesdays, and Zak the Baker is closed on Saturdays."
      },
      {
        "label": "Tickets and booking",
        "value": "Buy ahead for museums",
        "copy": "PAMM says tickets are capacity-limited and stop selling 30 minutes before closing, and Frost Science tickets are good only on the date shown. ICA Miami is free but recommends advance tickets for guaranteed entry."
      },
      {
        "label": "Free and late entry",
        "value": "Evenings save money",
        "copy": "PAMM is free on Thursdays after 5pm and stays open to 9pm that day. The Wolfsonian–FIU runs Free Fridays from 6pm to 9pm, and The Bass is free on Third Thursdays, 6–9 PM."
      },
      {
        "label": "Rules and walk-ins",
        "value": "Check ages and brunch policy",
        "copy": "Venetian Pool requires children to be at least 3 years old and 38 inches tall and stops selling tickets once at capacity. Greenstreet Cafe takes no reservations for weekend and holiday brunch until 4 PM."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Put Vizcaya and the museums on days they are open, book dinners ahead, and leave evenings for Little Havana music.",
      intro: [
        "You can build a first Miami day around Vizcaya Museum and Gardens at 3251 South Miami Ave., which opens 9:30 a.m. to 4:30 p.m. every day except Tuesday; its site notes ongoing conservation work in the Main House. Downtown, Pérez Art Museum Miami on Biscayne Blvd. runs \"Basquiat: Figures, Signs, Symbols\" through June 6, 2027 and opens \"Picasso–Klee–Matisse: Masterpieces from the Museum Berggruen\" on October 29, 2026. PAMM closes Tuesdays and Wednesdays, stays open to 9pm on Thursdays and is free after 5pm that evening.",
        "Across the bay, The Bass on Collins Avenue shows \"Yuko Mohri: Unviolated Imperfection\" from September 17, 2026 to May 30, 2027 and opens Wednesday to Sunday, noon to 5 PM, closing for Thanksgiving on November 26. The Wolfsonian–FIU on Washington Avenue has its new \"Foot Notes\" exhibition and Free Fridays from 6pm to 9pm. In Wynwood and the Design District, the Wynwood Walls open daily from 10:30 AM to 6:30 PM with doors closing 30 minutes early, ICA Miami is free with advance tickets recommended, and the Rubell Museum offers free 3pm tours Wednesday to Sunday.",
        "If you are travelling with children, Frost Science is open every day of the year and its tickets are valid only on the date shown; \"The Science Behind Pixar\" is included with admission. Miami Children's Museum on MacArthur Causeway opens daily from 10AM to 6PM and has its new Planet Soccer area. Zoo Miami lists Zoo Lights on select nights from November 27, 2026. For a slower outdoor day, Fairchild Tropical Botanic Garden opens 10:00 a.m. to 5:00 p.m. daily with $5 off online tickets, and Coral Gables' Venetian Pool closes on Mondays.",
        "For food, Zak the Baker in Wynwood bakes Sunday to Friday from 7am and closes on Saturdays, while Greenstreet Cafe in Coconut Grove serves breakfast from 7AM. Versailles on SW 8th Street opens from 8:00 am with its walk-up ventanita, and Joe's Stone Crab takes reservations through OpenTable. In the evening, Boia De and COTE Miami both take bookings, Café La Trova serves dinner from 5pm, and Ball & Chain in Little Havana lists live music through the week. Broken Shaker is closed Monday to Wednesday and asks you to reserve."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Vizcaya (closed Tuesdays) with PAMM (closed Tuesdays and Wednesdays) and an evening on SW 8th Street at Versailles, Café La Trova or Ball & Chain."
        ],
        [
          "A slower morning",
          "Start at Zak the Baker (closed Saturdays) or Greenstreet Cafe, then walk the Wynwood Walls when they open at 10:30 AM."
        ],
        [
          "Before booking",
          "Book dated tickets for Frost Science and PAMM online, reserve dinners at Boia De, COTE Miami or Joe's Stone Crab, and check that Broken Shaker is open (Thursday to Sunday only)."
        ]
      ],
      trust: "All 29 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Porto, Portugal: source review of 2026-10-25 (docs/content-research/porto-2026-10-25.md).
  {
    const cityKey = "Porto, Portugal";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Livraria Lello","Torre dos Clérigos","Fundação de Serralves","Palácio da Bolsa"],
      bestFirstTimers: ["Torre dos Clérigos","Livraria Lello","Mercado do Bolhão","Taylor's Port Cellars"],
      bestRestaurants: ["Tapabento","Cafeína","Cantinho do Avillez (Mouzinho da Silveira)","The Yeatman Gastronomic Restaurant"],
      bestBudget: ["Mercado do Bolhão","Café Santiago (Passos Manuel)","Padaria Ribeiro (Baixa)","Museu Nacional Soares dos Reis"],
      bestLuxury: ["The Yeatman Gastronomic Restaurant","Graham's 1890 Lodge","Dick's Bar & Bistro (The Yeatman)"],
      bestCouples: ["Caves Cálem","Dick's Bar & Bistro (The Yeatman)","Casa da Música","Cafeína"],
      bestKids: ["SEA LIFE Porto","Museu do Carro Eléctrico","Fundação de Serralves"],
      bestSolo: ["Livraria Lello","Majestic Café","Casa da Música","Museu Nacional Soares dos Reis"],
      bestUnique: ["Museu do Carro Eléctrico","Caves Cálem","Casa da Música","Mercado do Bolhão"],
      bestBreakfast: ["Majestic Café","Guarany Café","Padaria Ribeiro (Baixa)","Nata Lisboa (Rua das Flores)"],
      bestLunch: ["Tapabento","Café Santiago (Passos Manuel)","Mercado do Bolhão","Cantinho do Avillez (Mouzinho da Silveira)"],
      bestDinner: ["Tapabento","Cafeína","The Yeatman Gastronomic Restaurant","Cantinho do Avillez (Mouzinho da Silveira)"],
      bestCocktails: ["The Royal Cocktail Club","Base Porto"],
      bestBakeries: ["Manteigaria (Bolhão)","Nata Lisboa (Rua das Flores)","Padaria Ribeiro (Baixa)"],
      bestCoffee: ["Majestic Café","Guarany Café","Nata Lisboa (Rua das Flores)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Livraria Lello": "Livraria Lello Rua das Carmelitas 144 Porto",
      "Torre dos Clérigos": "Torre dos Clérigos Rua de São Filipe de Nery Porto",
      "Fundação de Serralves": "Fundação de Serralves Rua D. João de Castro 210 Porto",
      "Palácio da Bolsa": "Palácio da Bolsa Rua Ferreira Borges Porto",
      "Mercado do Bolhão": "Mercado do Bolhão Rua Formosa 322 Porto",
      "Taylor's Port Cellars": "Taylor's Port Rua do Choupelo 250 Vila Nova de Gaia",
      "Tapabento": "Tapabento Rua da Madeira 221 Porto",
      "Cafeína": "Cafeína Rua do Padrão 100 Porto",
      "Cantinho do Avillez (Mouzinho da Silveira)": "Cantinho do Avillez Rua Mouzinho da Silveira 166 Porto",
      "The Yeatman Gastronomic Restaurant": "The Yeatman Rua do Choupelo Vila Nova de Gaia",
      "Café Santiago (Passos Manuel)": "Café Santiago Rua Passos Manuel 226 Porto",
      "Padaria Ribeiro (Baixa)": "Padaria Ribeiro Praça Guilherme Gomes Fernandes 21 Porto",
      "Museu Nacional Soares dos Reis": "Museu Nacional Soares dos Reis Rua D. Manuel II 44 Porto",
      "Graham's 1890 Lodge": "Graham's 1890 Lodge Rua Rei Ramiro 514 Vila Nova de Gaia",
      "Dick's Bar & Bistro (The Yeatman)": "Dick's Bar The Yeatman Rua do Choupelo Vila Nova de Gaia",
      "Caves Cálem": "Caves Cálem Avenida de Diogo Leite 344 Vila Nova de Gaia",
      "Casa da Música": "Casa da Música Avenida da Boavista 604 Porto",
      "SEA LIFE Porto": "SEA LIFE Porto 1ª Rua Particular do Castelo do Queijo Porto",
      "Museu do Carro Eléctrico": "Museu do Carro Eléctrico Alameda Basílio Teles 51 Porto",
      "Majestic Café": "Majestic Café Rua Santa Catarina 112 Porto",
      "Guarany Café": "Guarany Café Avenida dos Aliados 85 Porto",
      "Nata Lisboa (Rua das Flores)": "Nata Lisboa Rua das Flores 291 Porto",
      "The Royal Cocktail Club": "The Royal Cocktail Club Rua da Fábrica 105 Porto",
      "Base Porto": "Base Porto Rua das Carmelitas 151 Porto",
      "Manteigaria (Bolhão)": "Manteigaria Rua de Alexandre Braga 24 Porto"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Porto" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Bookshops, towers, museums, Gaia port cellars and the Bolhão market, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Livraria Lello","Torre dos Clérigos","Fundação de Serralves","Mercado do Bolhão"];
    cityGuide.tip = "Plan around closures: Museu Nacional Soares dos Reis shuts on Mondays, Tapabento on Mondays and Tuesdays, and both Mercado do Bolhão and Café Santiago on Sundays.";
    data.destinationFacts[cityKey] = "Plan around closures: Museu Nacional Soares dos Reis shuts on Mondays, Tapabento on Mondays and Tuesdays, and both Mercado do Bolhão and Café Santiago on Sundays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Bookshops, towers, museums, Gaia port cellars and the Bolhão market, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon, Tue, Sun",
        "copy": "Museu Nacional Soares dos Reis and Museu do Carro Eléctrico open Tuesday to Sunday, and Tapabento closes Mondays and Tuesdays. Mercado do Bolhão and Café Santiago (Passos Manuel) are closed on Sundays."
      },
      {
        "label": "Tickets",
        "value": "Buy ahead",
        "copy": "Livraria Lello sells tickets online, and each one can be put toward the purchase of a book. Serralves' €24 general ticket covers the museum, park, villa and House of Cinema, and children under 12 go free."
      },
      {
        "label": "Booking",
        "value": "Reserve visits",
        "copy": "Graham's 1890 Lodge requires a reservation for visits, though its shop needs no booking. Tapabento holds reservations for 10 minutes, and afternoon tea at Dick's Bar & Bistro (The Yeatman) must be booked in advance."
      },
      {
        "label": "Rules",
        "value": "Age and access",
        "copy": "The Yeatman Gastronomic Restaurant admits children aged 12 and over, serves dinner only from Tuesday to Saturday, and suggests Dick's Bar & Bistro for younger children. Taylor's Port Cellars allows only guide dogs inside the cellars."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book the Gaia cellar visits and Livraria Lello tickets ahead, and check the Monday and Sunday closures before you plan each day.",
      intro: [
        "Porto's old centre packs its big sights close together. Livraria Lello on Rua das Carmelitas opens daily from 9:00 to 19:30, and you buy a ticket online that you can put toward a book. Its cultural programme runs through the autumn, with free talks and launches. Nearby, Torre dos Clérigos is open every day from 9:00 to 19:00 and sells tickets and bookings online. Down by the river, Palácio da Bolsa on Rua Ferreira Borges is visited by guided tour, booked through its own site, which does not publish fixed hours.",
        "For art, Fundação de Serralves on Rua D. João de Castro has a full autumn and winter season. Alice Neel's \"Beautifully Imperfect\" runs to 17 January 2027, Frank Gehry's \"The Century of Gehry\" to 10 January 2027, and Joan Miró's \"Elective Affinities\" in Casa de Serralves to 7 March 2027. The €24 general ticket covers the museum, park, villa and House of Cinema, and children under 12 enter free. In the centre, Museu Nacional Soares dos Reis charges €10 and closes on Mondays.",
        "Across the river in Vila Nova de Gaia, the port houses run their own visits. Taylor's Port Cellars on Rua do Choupelo open daily, with an audio tour in 13 languages. Graham's 1890 Lodge requires a reservation for its guided visits; from November its visits run 10:00 to 17:00. Caves Cálem on Avenida de Diogo Leite offers a \"Tour, Taste & Fado\" option. If you're travelling with children, SEA LIFE Porto by Castelo do Queijo opens 10:00 to 19:00, and the Museu do Carro Eléctrico in Massarelos opens Tuesday to Sunday.",
        "For food, Mercado do Bolhão on Rua Formosa opens Monday to Saturday, with its restaurants serving until midnight. Breakfast can be Majestic Café on Rua Santa Catarina from 9:00, Monday to Saturday, or a pastry at Padaria Ribeiro, open daily from 8:00. Tapabento, beside São Bento station, closes Mondays and Tuesdays and holds bookings for 10 minutes. For a special dinner, The Yeatman Gastronomic Restaurant holds two Michelin stars and serves Tuesday to Saturday. After dark, The Royal Cocktail Club on Rua da Fábrica opens from 19:00."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Torre dos Clérigos and Livraria Lello, both open daily, with lunch at Mercado do Bolhão from Monday to Saturday."
        ],
        [
          "A slower morning",
          "Start at Majestic Café from 9:00 or with a pastry at Manteigaria (Bolhão) from 8:00, then walk to Museu Nacional Soares dos Reis from 10:00, Tuesday to Sunday."
        ],
        [
          "Before booking",
          "Reserve Graham's 1890 Lodge visits and any Yeatman dinner in advance, and avoid planning Tapabento for a Monday or Tuesday."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Montreal, Canada: source review of 2026-10-25 (docs/content-research/montreal-2026-10-25.md).
  {
    const cityKey = "Montreal, Canada";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Notre-Dame Basilica","Pointe-à-Callière","Saint Joseph's Oratory","Mount Royal Park"],
      bestFirstTimers: ["Notre-Dame Basilica","Montreal Museum of Fine Arts","Jean-Talon Market","Mount Royal Park"],
      bestRestaurants: ["L'Express","Le Club Chasse et Pêche","Le Vin Papillon","Beauty's Luncheonette"],
      bestBudget: ["Mount Royal Park","Parc La Fontaine","Atwater Market","Fairmount Bagel"],
      bestLuxury: ["Le Club Chasse et Pêche","Montreal Museum of Fine Arts","Le Vin Papillon"],
      bestCouples: ["La Grande Roue de Montréal","Le Vin Papillon","Le Mal Nécessaire","Marguerite-Bourgeoys Museum"],
      bestKids: ["Montreal Science Centre","Pointe-à-Callière","La Grande Roue de Montréal","Maisonneuve Market"],
      bestSolo: ["McCord Stewart Museum","Pikolo Espresso Bar","Château Ramezay","Jean-Talon Market"],
      bestUnique: ["Saint Joseph's Oratory","Château Ramezay","Marguerite-Bourgeoys Museum","Le Mal Nécessaire"],
      bestBreakfast: ["Beauty's Luncheonette","Crew Collective & Café","Fairmount Bagel"],
      bestLunch: ["Jean-Talon Market","Atwater Market","L'Express","Crew Collective & Café"],
      bestDinner: ["L'Express","Le Club Chasse et Pêche","Le Vin Papillon","Bar Henrietta"],
      bestCocktails: ["Le Mal Nécessaire","Bar Henrietta"],
      bestBakeries: ["Fairmount Bagel","Mamie Clafoutis (Angus)","Rhubarbe"],
      bestCoffee: ["Pikolo Espresso Bar","Crew Collective & Café"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Notre-Dame Basilica": "Notre-Dame Basilica 110 Notre-Dame Street West Montreal",
      "Pointe-à-Callière": "Pointe-à-Callière 350 Place Royale Montreal",
      "Saint Joseph's Oratory": "Saint Joseph's Oratory 3800 Queen Mary Road Montreal",
      "Mount Royal Park": "Mount Royal Park 2000 Chemin Remembrance Montreal",
      "Montreal Museum of Fine Arts": "Montreal Museum of Fine Arts 1380 Sherbrooke Street West Montreal",
      "Jean-Talon Market": "Jean-Talon Market 7070 Henri-Julien Avenue Montreal",
      "L'Express": "L'Express 3927 rue Saint-Denis Montreal",
      "Le Club Chasse et Pêche": "Le Club Chasse et Pêche 423 rue Saint-Claude Montreal",
      "Le Vin Papillon": "Le Vin Papillon 2519 Notre-Dame Ouest Montreal",
      "Beauty's Luncheonette": "Beauty's Luncheonette 93 Mont-Royal West Montreal",
      "Parc La Fontaine": "Parc La Fontaine 3819 Avenue Calixa-Lavallée Montreal",
      "Atwater Market": "Atwater Market 155 Greene Avenue Montreal",
      "Fairmount Bagel": "Fairmount Bagel 74 Fairmount West Montreal",
      "La Grande Roue de Montréal": "La Grande Roue de Montréal 362 de la Commune Street East Montreal",
      "Le Mal Nécessaire": "Le Mal Nécessaire 1015 rue Saint-Alexandre Montreal",
      "Marguerite-Bourgeoys Museum": "Marguerite-Bourgeoys Museum 400 rue Saint-Paul Est Montreal",
      "Montreal Science Centre": "Montreal Science Centre 2 rue de la Commune Ouest Montreal",
      "Maisonneuve Market": "Maisonneuve Market 4445 Ontario Street East Montreal",
      "McCord Stewart Museum": "McCord Stewart Museum 690 Sherbrooke Street West Montreal",
      "Pikolo Espresso Bar": "Pikolo Espresso Bar 1635 Clark Street Montreal",
      "Château Ramezay": "Château Ramezay 280 Notre-Dame Street East Montreal",
      "Crew Collective & Café": "Crew Collective & Café 360 rue Saint-Jacques Montreal",
      "Bar Henrietta": "Bar Henrietta 115 Avenue Laurier Ouest Montreal",
      "Mamie Clafoutis (Angus)": "Mamie Clafoutis 4093 rue Molson Montreal",
      "Rhubarbe": "Rhubarbe 1320 rue Charlevoix Montreal"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Montreal" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Old Montreal landmarks, Sherbrooke Street museums, parks and public markets, with bagels, brunch, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Notre-Dame Basilica","Montreal Museum of Fine Arts","Pointe-à-Callière","Mount Royal Park"];
    cityGuide.tip = "Mondays are a weak museum day: Pointe-à-Callière lists no Monday hours, the McCord Stewart Museum is closed Mondays, and the Marguerite-Bourgeoys Museum closes Mondays from October 16 to May 14.";
    data.destinationFacts[cityKey] = "Mondays are a weak museum day: Pointe-à-Callière lists no Monday hours, the McCord Stewart Museum is closed Mondays, and the Marguerite-Bourgeoys Museum closes Mondays from October 16 to May 14.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Old Montreal landmarks, Sherbrooke Street museums, parks and public markets, with bagels, brunch, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "Pointe-à-Callière and the McCord Stewart Museum have no Monday opening, and Beauty's Luncheonette is closed Tuesdays. Le Club Chasse et Pêche and Le Vin Papillon serve dinner Tuesday to Saturday only."
      },
      {
        "label": "Tickets and booking",
        "value": "Reserve the big shows",
        "copy": "The Montreal Museum of Fine Arts requires reservations for Chiharu Shiota: The Soul Trembles (to February 14, 2027) except for members. Pointe-à-Callière sells tickets online or at the counter until 60 minutes before closing."
      },
      {
        "label": "Walk-in policy",
        "value": "Bars fill late",
        "copy": "Le Mal Nécessaire takes no reservations after 8 p.m. on Fridays and Saturdays and seats first come, first served. Bar Henrietta takes no reservations and opens daily at 4 p.m."
      },
      {
        "label": "Rules and prices",
        "value": "Bring ID",
        "copy": "Pointe-à-Callière's concession rates require a valid ID, adults pay $30 and children under 5 enter free. The McCord Stewart Museum offers free admission on Wednesdays from 5 p.m."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan museum days for Tuesday to Sunday, book the Shiota exhibition ahead, and save the walk-in cocktail bars for early evening.",
      intro: [
        "Start in Old Montreal, where Notre-Dame Basilica at 110 Notre-Dame Street West lists a Choral Christmas Concert by the Metropolitan Orchestra on December 8, 2026, with tickets through TicketPro. A short walk away, Pointe-à-Callière at 350 Place Royale opens Tuesday to Sunday and runs Heroes of Greece. The Age of Troy until March 7, 2027; tickets are sold until 60 minutes before closing. Château Ramezay on Notre-Dame Street East and the Marguerite-Bourgeoys Museum on rue Saint-Paul Est add more history, though the latter closes on Mondays from October 16 to May 14.",
        "Uptown, the Montreal Museum of Fine Arts at 1380 Sherbrooke Street West shows Chiharu Shiota: The Soul Trembles through February 14, 2027, and you need a reservation for it unless you are a member. Anne Kahane: Structures opens there on November 19, 2026. The McCord Stewart Museum at 690 Sherbrooke West is closed Mondays, stays open until 9 p.m. on Wednesdays with free admission from 5 p.m., and is renovating its ground floor. Saint Joseph's Oratory on Queen Mary Road is open from 6:30 a.m. to 9 p.m.",
        "For open space, the city lists Mount Royal Park and Parc La Fontaine as open from 6 a.m. to midnight every day, and Mount Royal is marking its 150th anniversary with activities running from June 2026 to May 2027. The city's public markets make easy lunches: Jean-Talon opens at 8 a.m. Monday to Saturday, Atwater opens at 9 a.m., and Maisonneuve holds children's culinary workshops on November 14, 2026. Down by the river, La Grande Roue de Montréal turns from 10 a.m. to 11 p.m., with tickets sold through Fever.",
        "For food, Fairmount Bagel bakes at 74 Fairmount West, Beauty's Luncheonette serves from 8 a.m. to 3:30 p.m. and closes Tuesdays, and Crew Collective & Café serves brunch daily from 9 a.m. to 3 p.m. in Old Montreal. L'Express on Saint-Denis is open seven days from 11:30 a.m. to 1 a.m., while Le Club Chasse et Pêche and Le Vin Papillon open for dinner Tuesday to Saturday. For drinks, Le Mal Nécessaire stops taking reservations after 8 p.m. on Fridays and Saturdays, and Bar Henrietta on Laurier West takes none."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Notre-Dame Basilica and Pointe-à-Callière in Old Montreal, then book the Montreal Museum of Fine Arts for the Chiharu Shiota exhibition."
        ],
        [
          "A slower morning",
          "Pick up bagels at Fairmount Bagel or brunch at Crew Collective & Café, then walk Mount Royal Park, open from 6 a.m."
        ],
        [
          "Before booking",
          "Check closing days first: Pointe-à-Callière and the McCord Stewart Museum have no Monday opening and Beauty's closes Tuesdays."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Seville, Spain: source review of 2026-10-25 (docs/content-research/seville-2026-10-25.md).
  {
    const cityKey = "Seville, Spain";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Real Alcázar de Sevilla","Catedral de Sevilla","Casa de Pilatos","Setas de Sevilla"],
      bestFirstTimers: ["Real Alcázar de Sevilla","Catedral de Sevilla","Plaza de Toros de la Real Maestranza","Mercado de Triana"],
      bestRestaurants: ["Sobretablas","Cañabota","Casa Robles","Restaurante Becerrita"],
      bestBudget: ["Mercado de Triana","Palacio de la Condesa de Lebrija","Basílica de la Macarena","Archivo General de Indias"],
      bestLuxury: ["Abantal","Cañabota","Sobretablas","abba The Roof Giralda"],
      bestCouples: ["Setas de Sevilla","La Terraza del EME","Casa de la Memoria","Sobretablas"],
      bestKids: ["Acuario de Sevilla","Casa de Pilatos","Setas de Sevilla","Tía Consuelo"],
      bestSolo: ["Archivo General de Indias","Museo del Baile Flamenco","Palacio de la Condesa de Lebrija","Mercado de Triana"],
      bestUnique: ["Museo del Baile Flamenco","Casa de la Memoria","Plaza de Toros de la Real Maestranza","Basílica de la Macarena"],
      bestBreakfast: ["Confitería Ochoa (Sierpes)","Mercado de Triana"],
      bestLunch: ["El Rinconcillo","Placentines","Bacao","Cervecería Giralda"],
      bestDinner: ["Casa Robles","Restaurante Becerrita","Cañabota","Sobretablas"],
      bestCocktails: ["abba The Roof Giralda","La Terraza del EME","La Terraza (Hotel Inglaterra)"],
      bestBakeries: ["Confitería Ochoa (Sierpes)"],
      bestCoffee: ["Confitería Ochoa (Sierpes)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Real Alcázar de Sevilla": "Real Alcázar de Sevilla Patio de Banderas Sevilla",
      "Catedral de Sevilla": "Catedral de Sevilla Avenida de la Constitución Sevilla",
      "Casa de Pilatos": "Casa de Pilatos Plaza de Pilatos 1 Sevilla",
      "Setas de Sevilla": "Setas de Sevilla Plaza de la Encarnación Sevilla",
      "Plaza de Toros de la Real Maestranza": "Plaza de Toros de la Real Maestranza Paseo de Cristóbal Colón 12 Sevilla",
      "Mercado de Triana": "Mercado de Triana Plaza del Altozano Sevilla",
      "Sobretablas": "Sobretablas Calle Colombia 7 Sevilla",
      "Cañabota": "Cañabota Calle Orfila 1 Sevilla",
      "Casa Robles": "Casa Robles Calle Álvarez Quintero 58 Sevilla",
      "Restaurante Becerrita": "Restaurante Becerrita Calle Recaredo 9 Sevilla",
      "Palacio de la Condesa de Lebrija": "Palacio de la Condesa de Lebrija Calle Cuna 8 Sevilla",
      "Basílica de la Macarena": "Basílica de la Macarena Plaza de la Esperanza Macarena 2 Sevilla",
      "Archivo General de Indias": "Archivo General de Indias Avenida de la Constitución Sevilla",
      "Abantal": "Abantal Calle Alcalde José de la Bandera 7 Sevilla",
      "abba The Roof Giralda": "abba Sevilla Hotel Plaza de la Encarnación 19 Sevilla",
      "La Terraza del EME": "EME Catedral Mercer Hotel Calle Alemanes 27 Sevilla",
      "Casa de la Memoria": "Casa de la Memoria Calle Cuna 6 Sevilla",
      "Acuario de Sevilla": "Acuario de Sevilla Muelle de las Delicias Sevilla",
      "Tía Consuelo": "Tía Consuelo Calle Argote de Molina 32 Sevilla",
      "Museo del Baile Flamenco": "Museo del Baile Flamenco Calle Manuel Rojas Marcos 3 Sevilla",
      "Confitería Ochoa (Sierpes)": "Confitería Ochoa Calle Sierpes 45 Sevilla",
      "El Rinconcillo": "El Rinconcillo Calle Gerona 40 Sevilla",
      "Placentines": "Placentines Calle Placentines 2 Sevilla",
      "Bacao": "Bacao Calle Placentines 9 Sevilla",
      "Cervecería Giralda": "Cervecería Giralda Calle Mateos Gago 1 Sevilla",
      "La Terraza (Hotel Inglaterra)": "Hotel Inglaterra Plaza Nueva 7 Sevilla"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Seville" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Palaces, the cathedral, flamenco venues and Triana's market, with tapas bars, Michelin-listed dinners, rooftop terraces and a classic confitería checked against their own websites.";
    cityGuide.highlights = ["Real Alcázar de Sevilla","Catedral de Sevilla","Casa de Pilatos","Plaza de Toros de la Real Maestranza"];
    cityGuide.tip = "The cathedral's ticket offices close at 18:00 although the visit runs until 19:00, and tickets bought online cost 13 € against 14 € at the box office.";
    data.destinationFacts[cityKey] = "The cathedral's ticket offices close at 18:00 although the visit runs until 19:00, and tickets bought online cost 13 € against 14 € at the box office.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Palaces, the cathedral, flamenco venues and Triana's market, with tapas bars, Michelin-listed dinners, rooftop terraces and a classic confitería checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays at Sobretablas",
        "copy": "Sobretablas serves Tuesday to Saturday and closes Sunday and Monday. Mercado de Triana's food stalls close on Sundays and holidays, though its bars open 10:00 to 17:00."
      },
      {
        "label": "Tickets and booking",
        "value": "Buy the cathedral online",
        "copy": "Catedral de Sevilla charges 13 € online and 14 € at the box office, and online ticket holders enter by the Puerta del Lagarto. Acuario de Sevilla sells a cheaper Thursday-afternoon \"Día del esPEZtador\" ticket online only."
      },
      {
        "label": "Last entry",
        "value": "Ticket desks close early",
        "copy": "The Acuario de Sevilla stops admitting visitors an hour before closing, and Palacio de la Condesa de Lebrija's last entry is 45 minutes before closing. From 1 November, the bullring's ticket office closes at 19:00 for visits running to 19:30."
      },
      {
        "label": "Booking rules",
        "value": "No-show charges",
        "copy": "Casa Robles charges 20 € per person for cancellations under eight hours or no-shows. Sobretablas asks you to state allergies when booking so it can adapt its tasting menu."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book the cathedral and dinner tables ahead, and plan sights around early ticket-desk closing times.",
      intro: [
        "Seville's headline sights keep different clocks, so plan them in order. The Real Alcázar de Sevilla opens at 09:30 and, from October to March, closes at 17:00. Catedral de Sevilla opens at 10:45 Monday to Saturday but only at 14:30 on Sundays, and its ticket offices shut at 18:00. Tickets cost 13 € online or 14 € at the desk, and the time on your ticket is your entry time, with no limit on how long you stay. The cathedral also runs a free Sunday visit from 17:00 at the Puerta del Príncipe, subject to the liturgical calendar.",
        "For a quieter palace, Casa de Pilatos opens every day from 9:00 to 18:00, charging 12 € for the main floor and 6 € for the upper floor, with an audioguide or guide included and free entry for children up to 11 with an adult. Palacio de la Condesa de Lebrija on Calle Cuna opens daily from September to June, 10:00 to 18:00, and offers a free ground-floor visit on Fridays at 10:00 with limited places. Setas de Sevilla stays open until 01:00, with last entry at 00:15, so you can save its 360º viewpoint for after dinner.",
        "Flamenco and bullfighting history sit close together. The Museo del Baile Flamenco on Manuel Rojas Marcos runs shows at 17:00, 19:00 and 20:45, and museum entry costs 6 €. Next door on Calle Cuna, Casa de la Memoria programmes evening flamenco sessions. At the Plaza de Toros de la Real Maestranza, guided visits run 9:00 to 19:30 from 1 November, with the ticket office closing at 19:00, and they finish at 15:00 on bullfighting days. With children, the Acuario de Sevilla opens daily, until 18:00 on weekdays and 19:00 at weekends.",
        "Eat across the river and around the cathedral. Mercado de Triana's stalls trade Monday to Saturday until 14:30, while its bars serve until midnight. Casa Robles and Restaurante Becerrita both open every day for lunch and dinner, and Becerrita serves lunch only on 24 and 31 December. Sobretablas, holding a Michelin 2026 Bib Gourmand badge, seats lunch at 13:45 and dinner at 20:15. For a drink with a view, abba The Roof Giralda serves until midnight Sunday to Thursday and until 01:00 on Fridays, Saturdays and holiday eves."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at the Real Alcázar at 09:30, then cross to the cathedral before its 18:00 ticket cut-off."
        ],
        [
          "A slower morning",
          "Have breakfast at Confitería Ochoa on Sierpes, then browse Mercado de Triana's stalls before they close at 14:30."
        ],
        [
          "Before booking",
          "Buy cathedral tickets online to save 1 €, and cancel restaurant tables at Casa Robles at least eight hours ahead to avoid a 20 € per-person charge."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Las Vegas, United States: source review of 2026-10-25 (docs/content-research/las-vegas-2026-10-25.md).
  {
    const cityKey = "Las Vegas, United States";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Red Rock Canyon National Conservation Area","Hoover Dam","Sphere","The Mob Museum"],
      bestFirstTimers: ["Fremont Street Experience","Neon Museum","Sphere","Hoover Dam"],
      bestRestaurants: ["é by José Andrés (The Cosmopolitan)","Lotus of Siam (Flamingo Road)","Esther's Kitchen","SW Steakhouse (Wynn Las Vegas)"],
      bestBudget: ["Fremont Street Experience","Downtown Container Park","Pinball Hall of Fame","Eggslut (The Cosmopolitan)"],
      bestLuxury: ["é by José Andrés (The Cosmopolitan)","SW Steakhouse (Wynn Las Vegas)","Legacy Club (Circa)"],
      bestCouples: ["Legacy Club (Circa)","SW Steakhouse (Wynn Las Vegas)","Neon Museum","Herbs & Rye"],
      bestKids: ["Discovery Children's Museum","Springs Preserve","Pinball Hall of Fame","AREA15"],
      bestSolo: ["The Mob Museum","Atomic Liquors","Bungalow Coffee Co.","Peppermill Restaurant & Fireside Lounge"],
      bestUnique: ["Neon Museum","AREA15","Sphere","The Underground (The Mob Museum)"],
      bestBreakfast: ["Peppermill Restaurant & Fireside Lounge","Mon Ami Gabi (Paris Las Vegas)","Eggslut (The Cosmopolitan)","Bouchon (The Venetian)"],
      bestLunch: ["Lotus of Siam (Flamingo Road)","Mon Ami Gabi (Paris Las Vegas)","Esther's Kitchen","District Deli & Coffee"],
      bestDinner: ["é by José Andrés (The Cosmopolitan)","SW Steakhouse (Wynn Las Vegas)","Esther's Kitchen","Bouchon (The Venetian)"],
      bestCocktails: ["Legacy Club (Circa)","Herbs & Rye","The Golden Tiki","The Underground (The Mob Museum)"],
      bestBakeries: ["Dominique Ansel Las Vegas (Caesars Palace)","Dominique Ansel Marché (Paris Las Vegas)","Bouchon Bakery (The Venetian)"],
      bestCoffee: ["Bungalow Coffee Co.","District Deli & Coffee"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Red Rock Canyon National Conservation Area": "Red Rock Canyon Visitor Center 3205 State Highway 159 Las Vegas",
      "Hoover Dam": "Hoover Dam Visitor Center Boulder City Nevada",
      "Sphere": "Sphere 255 Sands Ave Las Vegas",
      "The Mob Museum": "The Mob Museum 300 Stewart Avenue Las Vegas",
      "Fremont Street Experience": "Fremont Street Experience Fremont Street Las Vegas",
      "Neon Museum": "Neon Museum 770 Las Vegas Blvd N Las Vegas",
      "é by José Andrés (The Cosmopolitan)": "é by José Andrés The Cosmopolitan 3708 Las Vegas Blvd South Las Vegas",
      "Lotus of Siam (Flamingo Road)": "Lotus of Siam 620 E Flamingo Rd Las Vegas",
      "Esther's Kitchen": "Esther's Kitchen 1131 S Main Street Las Vegas",
      "SW Steakhouse (Wynn Las Vegas)": "SW Steakhouse Wynn 3131 Las Vegas Blvd Las Vegas",
      "Downtown Container Park": "Downtown Container Park 707 Fremont Street Las Vegas",
      "Pinball Hall of Fame": "Pinball Hall of Fame 4925 Las Vegas Blvd South Las Vegas",
      "Eggslut (The Cosmopolitan)": "Eggslut The Cosmopolitan 3708 Las Vegas Blvd South Las Vegas",
      "Legacy Club (Circa)": "Legacy Club Circa 8 Fremont St Las Vegas",
      "Herbs & Rye": "Herbs & Rye 3713 W Sahara Avenue Las Vegas",
      "Discovery Children's Museum": "Discovery Children's Museum 360 Promenade Place Las Vegas",
      "Springs Preserve": "Springs Preserve 333 S Valley View Blvd Las Vegas",
      "AREA15": "AREA15 3215 S Rancho Dr Las Vegas",
      "Atomic Liquors": "Atomic Liquors 917 E Fremont St Las Vegas",
      "Bungalow Coffee Co.": "Bungalow Coffee Co 201 E Charleston Blvd Las Vegas",
      "Peppermill Restaurant & Fireside Lounge": "Peppermill 2985 Las Vegas Blvd S Las Vegas",
      "The Underground (The Mob Museum)": "The Underground Mob Museum 300 Stewart Avenue Las Vegas",
      "Mon Ami Gabi (Paris Las Vegas)": "Mon Ami Gabi Paris Las Vegas 3655 S Las Vegas Blvd Las Vegas",
      "Bouchon (The Venetian)": "Bouchon The Venetian 3355 Las Vegas Blvd South Las Vegas",
      "District Deli & Coffee": "District Deli & Coffee 1504 S Main Street Las Vegas",
      "The Golden Tiki": "The Golden Tiki 3939 Spring Mountain Rd Las Vegas",
      "Dominique Ansel Las Vegas (Caesars Palace)": "Dominique Ansel Caesars Palace 3570 Las Vegas Blvd South Las Vegas",
      "Dominique Ansel Marché (Paris Las Vegas)": "Dominique Ansel Marché Paris Las Vegas 3655 Las Vegas Blvd South Las Vegas",
      "Bouchon Bakery (The Venetian)": "Bouchon Bakery The Venetian 3355 Las Vegas Blvd South Las Vegas"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Las Vegas" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Desert parks, the dam, museums and downtown attractions, with Strip and Arts District breakfasts, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
    cityGuide.highlights = ["Red Rock Canyon National Conservation Area","Hoover Dam","Neon Museum","The Mob Museum"];
    cityGuide.tip = "Reserve a timed-entry slot before driving to Red Rock Canyon: from October 1 to May 31 the Scenic Drive requires one for entry between 8 a.m. and 5 p.m.";
    data.destinationFacts[cityKey] = "Reserve a timed-entry slot before driving to Red Rock Canyon: from October 1 to May 31 the Scenic Drive requires one for entry between 8 a.m. and 5 p.m.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Desert parks, the dam, museums and downtown attractions, with Strip and Arts District breakfasts, dinners, cocktail bars, bakeries and coffee checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays",
        "copy": "é by José Andrés (The Cosmopolitan) serves Tuesday through Sunday only, and Discovery Children's Museum is closed Mondays except during holidays and school breaks. Hoover Dam's Visitor Center and tours close on Thanksgiving and Christmas Day."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead",
        "copy": "é releases tickets three months in advance on a rolling basis, with a waitlist. Red Rock Canyon needs a timed-entry reservation from October 1 to May 31, and the Neon Museum sells separate 2026 daytime (from $25) and evening (from $35) admission."
      },
      {
        "label": "Walk-in and queues",
        "value": "On-site only",
        "copy": "Hoover Dam's Guided Dam Tour ($40) is sold only on-site, first come, first served, and often sells out; the last tour leaves at 4:10 p.m. Fremont Street Experience is listed as open 24 hours, with Music Reels on the canopy at the top of each hour from 6pm."
      },
      {
        "label": "Rules",
        "value": "ID and dress codes",
        "copy": "Downtown Container Park is 21+ after 9 pm, and The Golden Tiki requires a physical, valid ID for its 21+ entry. SW Steakhouse (Wynn Las Vegas) asks for upscale casual chic dress and does not admit children under 5, while Legacy Club (Circa) bars sports attire, athleisure and swimwear."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book your timed or ticketed slots first, then fill the gaps with walk-in downtown bars and cafés.",
      intro: [
        "Las Vegas reaches well past the casino floor, and the strongest day trips start with a booking. At Red Rock Canyon National Conservation Area, run by the Bureau of Land Management, you need a timed-entry reservation for the Scenic Drive between October 1 and May 31 for entry from 8 a.m. to 5 p.m. The drive opens at 6 a.m. and closes at 5 p.m. from November through February. At Hoover Dam, the Visitor Center and tours run daily from 9 a.m. to 5 p.m., except Thanksgiving and Christmas Day, and the $40 Guided Dam Tour is sold only on-site.",
        "Downtown rewards an evening. The Neon Museum on Las Vegas Boulevard North opens from 3 p.m. to 11 p.m. between September and May, with 2026 daytime admission from $25 and evening admission from $35. The Mob Museum on Stewart Avenue opens daily from 9 a.m. to 9 p.m., and its basement speakeasy, The Underground, pours until midnight on Fridays and Saturdays. A short walk away, Fremont Street Experience says it is open 24 hours, with Music Reels playing on the canopy at the top of each hour from 6pm.",
        "For dinner, é by José Andrés at The Cosmopolitan seats two shows a night, at 5:30 PM and 8:30 PM, Tuesday through Sunday, and releases tickets three months ahead. SW Steakhouse at Wynn Las Vegas faces the Lake of Dreams, takes SevenRooms bookings and asks for upscale casual chic dress. Off the Strip, Lotus of Siam on Flamingo Road and Esther's Kitchen on South Main Street both take online reservations. Mornings are easier: Peppermill is open 24 hours from Thursday to Sunday, and Mon Ami Gabi at Paris Las Vegas serves breakfast from 7:00 AM.",
        "If you travel with children, Discovery Children's Museum opens Tuesday to Saturday from 10am and Sunday from noon, and Pinball Hall of Fame charges per game rather than for entry. For a nightcap, Legacy Club sits on Circa's 60th floor and opens from 4pm, while The Golden Tiki on Spring Mountain Road is open 24 hours for guests 21 and over. Sweet stops include Bouchon Bakery at The Venetian, open daily from 6am to 5pm, and Dominique Ansel Las Vegas at Caesars Palace, open daily from 7AM to 9PM."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair an evening at the Neon Museum with a walk to The Mob Museum and Fremont Street Experience, all downtown."
        ],
        [
          "A slower morning",
          "Start at Bouchon Bakery at The Venetian, which opens at 6am, or Bungalow Coffee Co. on East Charleston, which opens at 7AM on weekdays."
        ],
        [
          "Before booking",
          "Reserve Red Rock Canyon's timed entry and é by José Andrés tickets early; é releases seats three months in advance and is closed Mondays."
        ]
      ],
      trust: "All 29 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Osaka, Japan: source review of 2026-10-25 (docs/content-research/osaka-2026-10-25.md).
  {
    const cityKey = "Osaka, Japan";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Osaka Castle Main Tower","Tsutenkaku","Osaka Museum of History","Shitennoji"],
      bestFirstTimers: ["Osaka Castle Main Tower","Tsutenkaku","Mizuno (Dotonbori)","Sumiyoshi Taisha"],
      bestRestaurants: ["Mizuno (Dotonbori)","Dotonbori Imai (Honten)","Mimiu (Honten megumi)","Cafe Couvert (Imperial Hotel Osaka)"],
      bestBudget: ["Kizu Market","Nagai Botanical Garden","Osaka Science Museum","Rikuro Ojisan no Mise (Namba Honten)"],
      bestLuxury: ["Bar Castle (Hotel New Otani Osaka)","Main Bar Vol de Nuit (Hotel Nikko Osaka)","Cafe Couvert (Imperial Hotel Osaka)","Patisserie SATSUKI (Hotel New Otani Osaka)"],
      bestCouples: ["Nakanoshima Museum of Art, Osaka","Main Bar Vol de Nuit (Hotel Nikko Osaka)","Expo '70 Commemorative Park","Bar Castle (Hotel New Otani Osaka)"],
      bestKids: ["Kids Plaza Osaka","Osaka Science Museum","Cupnoodles Museum Osaka Ikeda","Expo '70 Commemorative Park"],
      bestSolo: ["Nakanoshima Museum of Art, Osaka","National Museum of Art, Osaka","Osaka City Museum of Fine Arts","Mondial Kaffee 328 (Club Ace, Shinsaibashi)"],
      bestUnique: ["Kizu Market","Cupnoodles Museum Osaka Ikeda","Sumiyoshi Taisha","Shitennoji"],
      bestBreakfast: ["SATSUKI (Hotel New Otani Osaka)","Cafe Couvert (Imperial Hotel Osaka)","Mondial Kaffee 328 (Club Ace, Shinsaibashi)","Kizu Market"],
      bestLunch: ["Mimiu (Honten megumi)","Dotonbori Imai (Honten)","Mizuno (Dotonbori)"],
      bestDinner: ["Mizuno (Dotonbori)","Dotonbori Imai (Honten)","Mimiu (Honten megumi)","SATSUKI (Hotel New Otani Osaka)"],
      bestCocktails: ["Bar Castle (Hotel New Otani Osaka)","Main Bar Vol de Nuit (Hotel Nikko Osaka)"],
      bestBakeries: ["Patisserie SATSUKI (Hotel New Otani Osaka)","Rikuro Ojisan no Mise (Namba Honten)","PABLO (Shinsaibashi Honten)"],
      bestCoffee: ["Mondial Kaffee 328 (Club Ace, Shinsaibashi)","Hiro Coffee (Ekimarche Osaka)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Osaka Castle Main Tower": "Osaka Castle Main Tower 1-1 Osakajo Chuo-ku Osaka",
      "Tsutenkaku": "Tsutenkaku 1-18-6 Ebisuhigashi Naniwa-ku Osaka",
      "Osaka Museum of History": "Osaka Museum of History 4-1-32 Otemae Chuo-ku Osaka",
      "Shitennoji": "Shitennoji 1-11-18 Shitennoji Tennoji-ku Osaka",
      "Mizuno (Dotonbori)": "Mizuno okonomiyaki 1-4-15 Dotonbori Chuo-ku Osaka",
      "Sumiyoshi Taisha": "Sumiyoshi Taisha 2-9-89 Sumiyoshi Sumiyoshi-ku Osaka",
      "Dotonbori Imai (Honten)": "Dotonbori Imai Honten 1-7-22 Dotonbori Chuo-ku Osaka",
      "Mimiu (Honten megumi)": "Mimiu Honten 4-6-18 Hiranomachi Chuo-ku Osaka",
      "Cafe Couvert (Imperial Hotel Osaka)": "Cafe Couvert Imperial Hotel Osaka 1-8-50 Tenmabashi Kita-ku Osaka",
      "Kizu Market": "Kizu Market 2-2-8 Shikitsuhigashi Naniwa-ku Osaka",
      "Nagai Botanical Garden": "Nagai Botanical Garden 1-23 Nagai Koen Higashisumiyoshi-ku Osaka",
      "Osaka Science Museum": "Osaka Science Museum 4-2-1 Nakanoshima Kita-ku Osaka",
      "Rikuro Ojisan no Mise (Namba Honten)": "Rikuro Ojisan no Mise Namba Honten 3-2-28 Namba Chuo-ku Osaka",
      "Bar Castle (Hotel New Otani Osaka)": "Bar Castle Hotel New Otani Osaka 1-4-1 Shiromi Chuo-ku Osaka",
      "Main Bar Vol de Nuit (Hotel Nikko Osaka)": "Vol de Nuit Hotel Nikko Osaka 1-3-3 Nishishinsaibashi Chuo-ku Osaka",
      "Patisserie SATSUKI (Hotel New Otani Osaka)": "Patisserie SATSUKI Hotel New Otani Osaka 1-4-1 Shiromi Chuo-ku Osaka",
      "Nakanoshima Museum of Art, Osaka": "Nakanoshima Museum of Art 4-3-1 Nakanoshima Kita-ku Osaka",
      "Expo '70 Commemorative Park": "Expo '70 Commemorative Park Senri Banpaku Koen Suita Osaka",
      "Kids Plaza Osaka": "Kids Plaza Osaka 2-1-7 Ogimachi Kita-ku Osaka",
      "Cupnoodles Museum Osaka Ikeda": "Cupnoodles Museum Osaka Ikeda 8-25 Masumicho Ikeda Osaka",
      "National Museum of Art, Osaka": "National Museum of Art Osaka 4-2-55 Nakanoshima Kita-ku Osaka",
      "Osaka City Museum of Fine Arts": "Osaka City Museum of Fine Arts 1-82 Chausuyamacho Tennoji-ku Osaka",
      "Mondial Kaffee 328 (Club Ace, Shinsaibashi)": "Mondial Kaffee 328 Club Ace 1-10-4 Nishishinsaibashi Chuo-ku Osaka",
      "SATSUKI (Hotel New Otani Osaka)": "SATSUKI Hotel New Otani Osaka 1-4-1 Shiromi Chuo-ku Osaka",
      "PABLO (Shinsaibashi Honten)": "PABLO Shinsaibashi Honten 2-8-1 Shinsaibashisuji Chuo-ku Osaka",
      "Hiro Coffee (Ekimarche Osaka)": "Hiro Coffee Ekimarche Osaka 3-1-1 Umeda Kita-ku Osaka"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Osaka" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Castle, temples, Nakanoshima museums and family science stops, with okonomiyaki, udon, hotel breakfasts, bakeries and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Osaka Castle Main Tower","Tsutenkaku","Nakanoshima Museum of Art, Osaka","Shitennoji"];
    cityGuide.tip = "Plan museum days around closures: the Nakanoshima Museum of Art, the National Museum of Art and the Osaka City Museum of Fine Arts close on Mondays, while the Osaka Museum of History closes on Tuesdays.";
    data.destinationFacts[cityKey] = "Plan museum days around closures: the Nakanoshima Museum of Art, the National Museum of Art and the Osaka City Museum of Fine Arts close on Mondays, while the Osaka Museum of History closes on Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Castle, temples, Nakanoshima museums and family science stops, with okonomiyaki, udon, hotel breakfasts, bakeries and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "The Nakanoshima Museum of Art, National Museum of Art, Osaka City Museum of Fine Arts and Nagai Botanical Garden close on Mondays (next weekday after a holiday Monday). The Osaka Museum of History closes on Tuesdays, and Bar Castle at Hotel New Otani Osaka closes Mondays and Tuesdays."
      },
      {
        "label": "Tickets",
        "value": "Book ahead",
        "copy": "Tsutenkaku says tickets bought by the day before let you enter at a set time, and Osaka Castle Main Tower sells advance admission through its booking site. Nagai Botanical Garden requires an electronic QR ticket at the North-East Gate."
      },
      {
        "label": "Reservations",
        "value": "Phone only",
        "copy": "Mimiu's main store takes dinner by reservation only, by phone on weekdays, and is closed Saturdays, Sundays and holidays. Dotonbori Imai takes reservations by phone only, not by email."
      },
      {
        "label": "Bar rules",
        "value": "20+ and dress",
        "copy": "Bar Castle admits guests aged 20 and over only and does not allow beach sandals or tank tops. Main Bar Vol de Nuit at Hotel Nikko Osaka adds a 990 yen music fee from 20:00 to 22:30."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Anchor each day on one district, check Monday and Tuesday museum closures, and book Tsutenkaku and any dinner reservations a day ahead.",
      intro: [
        "Start where Osaka began. Osaka Castle Main Tower stands at 1-1 Osakajo, and its own site says you can buy admission tickets in advance through its booking site; its displays on Toyotomi Hideyoshi change about every two months. A short walk away, the Osaka Museum of History opens 9:30 to 17:00 and closes on Tuesdays. From 25 November 2026 to 1 February 2027 its feature display covers Okuda Benjiro, an entertainment impresario of Sennichimae. Further south, Shitennoji and Sumiyoshi Taisha are both active places of worship that keep publishing 2026 notices and seasonal events.",
        "Nakanoshima gathers several museums within a few blocks. The Nakanoshima Museum of Art opens 10:00 to 17:00, closes on Mondays, and runs its NHK Sunday Museum 50th anniversary exhibition until 20 December 2026, alongside Edo painting from the British Museum's Japanese collection from 31 October 2026 to 31 January 2027. Next door, the National Museum of Art stays open until 20:00 on Fridays and opens \"Stratified Languages\" on 1 December. The Osaka Science Museum charges adults 400 yen for its exhibits, and its last planetarium show starts at 16:00.",
        "For food, Mizuno in Dotonbori serves okonomiyaki from 11:00 to 22:00, and since February 2026 it no longer closes on Thursdays. Dotonbori Imai's main store serves udon from 11:30 to 21:30, closes on Wednesdays and the fourth Tuesday of most months, and takes reservations by phone. Mimiu's main store near Yodoyabashi opens on weekdays only, and dinner there is reservation-only. If you're up early, Kizu Market's shops open from about 6:00, and the market suggests coming between 8:30 and 10:30. It closes on Sundays, holidays and some Wednesdays.",
        "Evenings can be quieter in the hotels. Bar Castle at Hotel New Otani Osaka opens 17:00 to midnight, closes Mondays and Tuesdays, admits only guests 20 and over, and runs the Super Osaka Cocktail Collection from 28 October to 29 November 2026. Main Bar Vol de Nuit at Hotel Nikko Osaka opens from 17:00 on weekdays, with live piano and a music fee from 20:00. For breakfast, SATSUKI opens at 7:00 with a morning buffet, and Cafe Couvert at Imperial Hotel Osaka serves breakfast from 6:30 to 11:00."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Osaka Castle Main Tower with the Osaka Museum of History, then head south to Tsutenkaku, where advance tickets give you a set entry time."
        ],
        [
          "A slower morning",
          "Browse Kizu Market between 8:30 and 10:30, or take the 7:00 buffet at SATSUKI before a Nakanoshima museum opens at 10:00."
        ],
        [
          "Before booking",
          "Call ahead for Mimiu's reservation-only weekday dinners and Dotonbori Imai, and avoid Monday museum days on Nakanoshima."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Krakow, Poland: source review of 2026-10-25 (docs/content-research/krakow-2026-10-25.md).
  {
    const cityKey = "Krakow, Poland";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Wawel Royal Castle","St. Mary's Basilica","Rynek Underground","Wieliczka Salt Mine"],
      bestFirstTimers: ["Wawel Royal Castle","St. Mary's Basilica","Oskar Schindler's Enamel Factory","Town Hall Tower"],
      bestRestaurants: ["Wierzynek","Starka","Pod Aniołami","Szara Gęś"],
      bestBudget: ["Stary Kleparz","Kościuszko Mound","Eagle Pharmacy","Good Lood (Kazimierz)"],
      bestLuxury: ["Szara Gęś","Wierzynek","Czartoryski Museum","Mercy Brown"],
      bestCouples: ["Kościuszko Mound","Mercy Brown","Pod Aniołami","Manggha Museum"],
      bestKids: ["Park Wodny","Wieliczka Salt Mine","Galicia Jewish Museum","Good Lood (Kazimierz)"],
      bestSolo: ["National Museum in Krakow (Main Building)","MOCAK","Galicia Jewish Museum","Charlotte (Plac Szczepański)"],
      bestUnique: ["Rynek Underground","Manggha Museum","Alchemia","Eagle Pharmacy"],
      bestBreakfast: ["Charlotte (Plac Szczepański)","Wesoła Café"],
      bestLunch: ["Pod Wawelem","Wesoła Café","Starka","Pimiento (Stolarska)"],
      bestDinner: ["Wierzynek","Szara Gęś","Pimiento (Stolarska)","Pod Aniołami"],
      bestCocktails: ["Mercy Brown","Alchemia"],
      bestBakeries: ["Charlotte (Plac Szczepański)","Stary Kleparz"],
      bestCoffee: ["Wesoła Café","Charlotte (Plac Szczepański)","Good Lood (Kazimierz)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Wawel Royal Castle": "Wawel Royal Castle Wawel 5 Krakow",
      "St. Mary's Basilica": "St. Mary's Basilica Plac Mariacki 5 Krakow",
      "Rynek Underground": "Rynek Underground Rynek Główny 1 Krakow",
      "Wieliczka Salt Mine": "Wieliczka Salt Mine Daniłowicza 10 Wieliczka",
      "Oskar Schindler's Enamel Factory": "Oskar Schindler's Enamel Factory Lipowa 4 Krakow",
      "Town Hall Tower": "Town Hall Tower Rynek Główny 1 Krakow",
      "Wierzynek": "Wierzynek Rynek Główny 16 Krakow",
      "Starka": "Starka Józefa 14 Krakow",
      "Pod Aniołami": "Pod Aniołami Grodzka 35 Krakow",
      "Szara Gęś": "Szara Gęś Rynek Główny 17 Krakow",
      "Stary Kleparz": "Stary Kleparz Rynek Kleparski 20 Krakow",
      "Kościuszko Mound": "Kościuszko Mound al. Waszyngtona 1 Krakow",
      "Eagle Pharmacy": "Eagle Pharmacy plac Bohaterów Getta 18 Krakow",
      "Good Lood (Kazimierz)": "Good Lood Plac Wolnica 11 Krakow",
      "Czartoryski Museum": "Czartoryski Museum Pijarska 15 Krakow",
      "Mercy Brown": "Mercy Brown Straszewskiego 28 Krakow",
      "Manggha Museum": "Manggha Museum Konopnickiej 26 Krakow",
      "Park Wodny": "Park Wodny Dobrego Pasterza 126 Krakow",
      "Galicia Jewish Museum": "Galicia Jewish Museum Dajwór 18 Krakow",
      "National Museum in Krakow (Main Building)": "National Museum in Krakow Main Building al. 3 Maja 1 Krakow",
      "MOCAK": "MOCAK Lipowa 4 Krakow",
      "Charlotte (Plac Szczepański)": "Charlotte Plac Szczepański 2 Krakow",
      "Alchemia": "Alchemia Estery 5 Krakow",
      "Wesoła Café": "Wesoła Café Rakowicka 17 Krakow",
      "Pod Wawelem": "Pod Wawelem Świętej Gertrudy 26 Krakow",
      "Pimiento (Stolarska)": "Pimiento Stolarska 13 Krakow"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Krakow" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Wawel, the Market Square museums, Kazimierz and the Wieliczka mine, with restaurants, breakfast cafés and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Wawel Royal Castle","St. Mary's Basilica","Rynek Underground","Oskar Schindler's Enamel Factory"];
    cityGuide.tip = "Plan museum days around closures: the National Museum and Manggha shut on Mondays, MOCAK opens only Thursday to Sunday, and the Eagle Pharmacy is closed Mondays and Tuesdays.";
    data.destinationFacts[cityKey] = "Plan museum days around closures: the National Museum and Manggha shut on Mondays, MOCAK opens only Thursday to Sunday, and the Eagle Pharmacy is closed Mondays and Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Wawel, the Market Square museums, Kazimierz and the Wieliczka mine, with restaurants, breakfast cafés and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and midweek",
        "copy": "The National Museum's Main Building and Czartoryski Museum and the Manggha Museum close on Mondays. MOCAK opens Thursday to Sunday only, and the Eagle Pharmacy is closed Mondays and Tuesdays."
      },
      {
        "label": "Free days",
        "value": "Varies by museum",
        "copy": "Tuesday is free for the National Museum's permanent exhibitions, Manggha and Rynek Underground; Monday is free at Schindler's Factory and the Town Hall Tower, and Wednesday at the Eagle Pharmacy. Museum of Krakow free tickets are sold only at the box office on the day."
      },
      {
        "label": "Timed tickets",
        "value": "Book Schindler early",
        "copy": "Oskar Schindler's Enamel Factory sells online tickets 90 days ahead, stops online sales 6 hours before a visit, and asks for original ID with personal tickets. Its ticket office sells only same-day tickets for the next available slot, up to 5 per person."
      },
      {
        "label": "Rules",
        "value": "Age and walk-ins",
        "copy": "St. Mary's Bugle Tower is closed November to April, sells tickets only on the day, and does not admit children under 8. Mercy Brown admits adults only, and Charlotte takes walk-ins without reservations until 16:00."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book Schindler's Factory and Wawel ahead, then fit the smaller museums around their closing and free days.",
      intro: [
        "Wawel Royal Castle is at its most generous in November: its \"Free November 2026\" campaign gives you free passes to the free exhibitions, collected at the ticket offices or online up to a week ahead, with up to 5 tickets per person. During the month the State Rooms and Castle Underground open Tuesday to Sunday from 9:00 to 17:00, while Mondays open only the first-floor Royal Private Apartments, from 10:00 to 16:00. The temporary exhibition \"Lares and penates\", on security in architecture, runs until 6 January 2027. Groups must book guided tours in advance.",
        "On the Main Market Square, Rynek Underground at Rynek Główny 1 opens until 20:00 from Friday to Sunday and closes on the second Monday of the month; Tuesday entry is free but sold only at the box office on the day. The Town Hall Tower opens Tuesday to Sunday from 10:00 to 18:00. At St. Mary's Basilica, visiting runs from 11:30 on weekdays and 14:00 on Sundays, and the Veit Stoss altar opens at 11:50 on weekdays. Its Bugle Tower is closed from November to April.",
        "Across the river, Oskar Schindler's Enamel Factory on Lipowa Street opens until 20:00 from Tuesday to Sunday and closes on the first Tuesday of the month. Online tickets go on sale 90 days ahead, and a Schindler ticket also gets you into the Eagle Pharmacy within 7 days. MOCAK, next door, opens Thursday to Sunday and shows Eleanor Antin's retrospective from 5 December 2026 to 21 March 2027. The National Museum's Main Building has \"Citizen Cepelia\" until 21 February 2027 and \"The Faces of Czapski\" until 31 January 2027.",
        "For meals, Charlotte on Plac Szczepański bakes its own bread in the basement, serves breakfast until closing and takes walk-ins until 16:00. Starka in Kazimierz holds booked tables for 15 minutes, and Wierzynek on the square closes on Mondays. For a later evening, Mercy Brown on Straszewskiego has no sign on the door, admits adults only and hosts mostly free live music, while Alchemia on Plac Nowy runs a busy concert programme. At Wieliczka the Tourist Route is open 09:00 to 17:00 and takes 2 to 3 hours."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Wawel Royal Castle in the morning with St. Mary's Basilica and Rynek Underground on the Market Square in the afternoon."
        ],
        [
          "A slower morning",
          "Start with breakfast at Charlotte on Plac Szczepański, then browse Stary Kleparz, which trades Monday to Saturday."
        ],
        [
          "Before booking",
          "Reserve Schindler's Factory online up to 90 days ahead, and check each museum's closing and free days before you fix your route."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Naples, Italy: source review of 2026-10-25 (docs/content-research/naples-2026-10-25.md).
  {
    const cityKey = "Naples, Italy";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Pompeii Archaeological Park","Museo Cappella Sansevero","Palazzo Reale di Napoli","Catacombe di San Gennaro"],
      bestFirstTimers: ["Pompeii Archaeological Park","Museo Cappella Sansevero","Napoli Sotterranea","L'Antica Pizzeria da Michele (Via Cesare Sersale)"],
      bestRestaurants: ["Mimì alla Ferrovia","Palazzo Petrucci (Via Posillipo)","Pizzeria Brandi","Antica Pizzeria Di Matteo"],
      bestBudget: ["Antica Pizzeria Di Matteo","L'Antica Pizzeria da Michele (Via Cesare Sersale)","Complesso Monumentale di Santa Chiara","Gallerie d'Italia (Napoli)"],
      bestLuxury: ["George Restaurant (Grand Hotel Parker's)","Caruso Roof Garden (Grand Hotel Vesuvio)","Palazzo Petrucci (Via Posillipo)"],
      bestCouples: ["Caruso Roof Garden (Grand Hotel Vesuvio)","Sky Lounge Bar (Grand Hotel Vesuvio)","Bidder Terrace (Grand Hotel Parker's)","Complesso Monumentale di Santa Chiara"],
      bestKids: ["Città della Scienza","Catacombe di San Gennaro","Palazzo Reale di Napoli","Napoli Sotterranea"],
      bestSolo: ["Gallerie d'Italia (Napoli)","Museo MADRE","Pio Monte della Misericordia","Gran Caffè La Caffettiera (Piazza dei Martiri)"],
      bestUnique: ["Napoli Sotterranea","Catacombe di San Gennaro","Museo Pignatelli (Villa Pignatelli)","Pio Monte della Misericordia"],
      bestBreakfast: ["Gran Caffè Gambrinus","Gran Caffè La Caffettiera (Piazza dei Martiri)","Bidder Terrace (Grand Hotel Parker's)","Scaturchio (Piazza San Domenico Maggiore)"],
      bestLunch: ["L'Antica Pizzeria da Michele (Via Cesare Sersale)","Pizzeria Brandi","Antica Pizzeria Di Matteo","Mimì alla Ferrovia"],
      bestDinner: ["George Restaurant (Grand Hotel Parker's)","Caruso Roof Garden (Grand Hotel Vesuvio)","Palazzo Petrucci (Via Posillipo)","Mimì alla Ferrovia"],
      bestCocktails: ["Sky Lounge Bar (Grand Hotel Vesuvio)","Bidder Terrace (Grand Hotel Parker's)","Il Malandrino (Palazzo Petrucci)"],
      bestBakeries: ["Scaturchio (Piazza San Domenico Maggiore)","Pasticceria Mennella (Via Carducci)"],
      bestCoffee: ["Gran Caffè Gambrinus","Gran Caffè La Caffettiera (Piazza dei Martiri)","Sky Lounge Bar (Grand Hotel Vesuvio)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Pompeii Archaeological Park": "Pompeii Archaeological Park Piazza Esedra Pompei",
      "Museo Cappella Sansevero": "Museo Cappella Sansevero Via Francesco De Sanctis 19 Naples",
      "Palazzo Reale di Napoli": "Palazzo Reale di Napoli Piazza del Plebiscito 1 Naples",
      "Catacombe di San Gennaro": "Catacombe di San Gennaro Via Capodimonte 13 Naples",
      "Napoli Sotterranea": "Napoli Sotterranea Piazza San Gaetano 69 Naples",
      "L'Antica Pizzeria da Michele (Via Cesare Sersale)": "L'Antica Pizzeria da Michele Via Cesare Sersale 1 Naples",
      "Mimì alla Ferrovia": "Mimì alla Ferrovia Via Alfonso D'Aragona 19 Naples",
      "Palazzo Petrucci (Via Posillipo)": "Palazzo Petrucci Via Posillipo 16c Naples",
      "Pizzeria Brandi": "Pizzeria Brandi Salita Sant'Anna di Palazzo 1 Naples",
      "Antica Pizzeria Di Matteo": "Antica Pizzeria Di Matteo Via dei Tribunali 94 Naples",
      "Complesso Monumentale di Santa Chiara": "Complesso Monumentale di Santa Chiara Via Santa Chiara 49c Naples",
      "Gallerie d'Italia (Napoli)": "Gallerie d'Italia Via Toledo 177 Naples",
      "George Restaurant (Grand Hotel Parker's)": "George Restaurant Grand Hotel Parker's Corso Vittorio Emanuele 135 Naples",
      "Caruso Roof Garden (Grand Hotel Vesuvio)": "Grand Hotel Vesuvio Via Partenope 45 Naples",
      "Sky Lounge Bar (Grand Hotel Vesuvio)": "Grand Hotel Vesuvio Via Partenope 45 Naples",
      "Bidder Terrace (Grand Hotel Parker's)": "Grand Hotel Parker's Corso Vittorio Emanuele 135 Naples",
      "Città della Scienza": "Città della Scienza Via Coroglio 57 Naples",
      "Museo MADRE": "Museo MADRE Via Settembrini 79 Naples",
      "Pio Monte della Misericordia": "Pio Monte della Misericordia Via dei Tribunali 253 Naples",
      "Gran Caffè La Caffettiera (Piazza dei Martiri)": "Gran Caffè La Caffettiera Piazza dei Martiri 26 Naples",
      "Museo Pignatelli (Villa Pignatelli)": "Villa Pignatelli Riviera di Chiaia 200 Naples",
      "Gran Caffè Gambrinus": "Gran Caffè Gambrinus Via Chiaia 1 Naples",
      "Scaturchio (Piazza San Domenico Maggiore)": "Scaturchio Piazza San Domenico Maggiore 19 Naples",
      "Il Malandrino (Palazzo Petrucci)": "Il Malandrino Palazzo Petrucci Via Posillipo 16c Naples",
      "Pasticceria Mennella (Via Carducci)": "Pasticceria Mennella Via Carducci 50 Naples"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Naples" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Archaeology, chapels, catacombs and museums, with pizzerias, historic cafés, pastry shops and hotel rooftop bars checked against their own websites.";
    cityGuide.highlights = ["Pompeii Archaeological Park","Museo Cappella Sansevero","Palazzo Reale di Napoli","Catacombe di San Gennaro"];
    cityGuide.tip = "Book the Cappella Sansevero before you go: reservations are mandatory, online tickets go on sale 60 days ahead, and the chapel is closed on Tuesdays.";
    data.destinationFacts[cityKey] = "Book the Cappella Sansevero before you go: reservations are mandatory, online tickets go on sale 60 days ahead, and the chapel is closed on Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Archaeology, chapels, catacombs and museums, with pizzerias, historic cafés, pastry shops and hotel rooftop bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon, Tue, Wed",
        "copy": "Gallerie d'Italia and Pizzeria Brandi are closed on Mondays, Cappella Sansevero and MADRE on Tuesdays, and the Catacombe di San Gennaro on Wednesdays."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead",
        "copy": "Cappella Sansevero and the Catacombe di San Gennaro both require booking, and Sansevero releases tickets 60 days ahead. Pompeii tickets carry your name, with a cap of 20,000 entries a day."
      },
      {
        "label": "Walk-in policies",
        "value": "No reservations",
        "copy": "L'Antica Pizzeria da Michele and the Sky Lounge Bar at the Grand Hotel Vesuvio take no reservations. Mimì alla Ferrovia seats parties of one to three in arrival order and books groups of four to ten online."
      },
      {
        "label": "Rules",
        "value": "Bags, photos, dress",
        "copy": "Pompeii admits only small bags up to 30x30x15 cm, and Cappella Sansevero bans photos, video and phone use. Caruso Roof Garden and George Restaurant ask for smart casual, and George welcomes children over 5."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book Sansevero, the catacombs and Pompeii ahead, then leave room for walk-in pizza and a rooftop drink.",
      intro: [
        "In Naples, a good plan starts with booking rules. At the Museo Cappella Sansevero on Via Francesco De Sanctis, booking is mandatory, online tickets go on sale 60 days ahead, and the chapel opens 9:00–19:00 every day except Tuesday, with a standard ticket of €12. Photos and phone use are not allowed inside. Nearby, Pio Monte della Misericordia on Via dei Tribunali shows Caravaggio's Seven Works of Mercy, open Monday to Saturday 10:00–18:00. Napoli Sotterranea, at Piazza San Gaetano 69, runs underground tours from 10:00, plus a Thursday 21:00 tour by reservation.",
        "For Pompeii, the winter timetable runs from 15 October to 15 March: gates open at 9:00, last entry is 15:30 and the site closes at 17:00. Tickets carry your name, entries are capped at 20,000 a day, and you may bring only small bags up to 30x30x15 cm. Pompeii Express costs €20 for the ancient city alone, while Pompeii + adds the suburban villas and a shuttle for €25. Entry is free on the first Sunday of each month, and you can enter at Piazza Esedra, Piazza Anfiteatro or Porta Marina.",
        "Back in the city, the Gallerie d'Italia on Via Toledo opens Tuesday to Friday 10:00–19:00 and weekends until 20:00, and shows Caravaggio's Martyrdom of Saint Ursula. Its exhibition Angelica e Élisabeth. L'età delle donne pittrici runs from 6 November 2026 to 7 March 2027. MADRE, on Via Settembrini, is closed on Tuesdays. In Chiaia, Villa Pignatelli hosts Crochet Coral Reef by Margaret and Christine Wertheim until 12 April 2027, and Città della Scienza on Via Coroglio runs its immersive Dante Inferno exhibition until the end of December 2026.",
        "For food, L'Antica Pizzeria da Michele on Via Cesare Sersale opens daily 11:00–23:00 and takes no reservations, while Pizzeria Brandi is closed on Mondays. Mimì alla Ferrovia seats small parties in arrival order and books groups of four to ten online. For an evening view, the Grand Hotel Vesuvio's Sky Lounge Bar on Via Partenope serves cocktails daily 10:30–23:00 without reservations, and its Caruso Roof Garden requires booking and smart casual dress. George Restaurant at Grand Hotel Parker's serves dinner Tuesday to Saturday."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair a booked slot at the Cappella Sansevero with an underground tour at Napoli Sotterranea and a walk-in pizza at da Michele."
        ],
        [
          "A slower morning",
          "Start with coffee at Gran Caffè La Caffettiera, open from 7:00, then visit the Santa Chiara cloister, which opens at 9:30 Monday to Saturday."
        ],
        [
          "Before booking",
          "Check closing days: Gallerie d'Italia shuts on Mondays, Sansevero and MADRE on Tuesdays, and the catacombs on Wednesdays."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Shanghai, China: source review of 2026-10-25 (docs/content-research/shanghai-2026-10-25.md).
  {
    const cityKey = "Shanghai, China";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Shanghai Museum (People's Square)","Shanghai Museum East","Jade Buddha Temple","Shanghai World Financial Center"],
      bestFirstTimers: ["Shanghai Museum (People's Square)","Jade Buddha Temple","Jazz Bar (Fairmont Peace Hotel)","Memorial of the First National Congress of the CPC"],
      bestRestaurants: ["T'ang Court (The Langham, Shanghai, Xintiandi)","Mr & Mrs Bund","Polux by Paul Pairet","Sui Tang Li (Upper House Shanghai)"],
      bestBudget: ["Shanghai Botanical Garden","Peace Museum (Fairmont Peace Hotel)","Memorial of the First National Congress of the CPC","Shanghai Natural History Museum"],
      bestLuxury: ["T'ang Court (The Langham, Shanghai, Xintiandi)","The Cathay Room (Fairmont Peace Hotel)","Punch Room (The Shanghai EDITION)","Café Gray Deluxe (Upper House Shanghai)"],
      bestCouples: ["Jazz Bar (Fairmont Peace Hotel)","ROOF (The Shanghai EDITION)","The Cathay Room (Fairmont Peace Hotel)","Mr & Mrs Bund"],
      bestKids: ["Shanghai Natural History Museum","Shanghai Zoo","Shanghai Botanical Garden","Shanghai Museum East"],
      bestSolo: ["Rockbund Art Museum","Shanghai Jewish Refugees Museum","Shanghai Museum East","Victor's Café (Fairmont Peace Hotel)"],
      bestUnique: ["Peace Museum (Fairmont Peace Hotel)","Jazz Bar (Fairmont Peace Hotel)","Shanghai Jewish Refugees Museum","Rockbund Art Museum"],
      bestBreakfast: ["Café Gray Deluxe (Upper House Shanghai)","URBAN Café (The Sukhothai Shanghai)","Shanghai Tavern (The Shanghai EDITION)","Cachet (The Langham, Shanghai, Xintiandi)"],
      bestLunch: ["Sui Tang Li (Upper House Shanghai)","Mr & Mrs Bund","Polux by Paul Pairet","T'ang Court (The Langham, Shanghai, Xintiandi)"],
      bestDinner: ["T'ang Court (The Langham, Shanghai, Xintiandi)","Mr & Mrs Bund","Sui Tang Li (Upper House Shanghai)","Polux by Paul Pairet"],
      bestCocktails: ["Punch Room (The Shanghai EDITION)","ROOF (The Shanghai EDITION)","Jazz Bar (Fairmont Peace Hotel)","Café Gray Deluxe (Upper House Shanghai)"],
      bestBakeries: ["Victor's Café (Fairmont Peace Hotel)"],
      bestCoffee: ["Café Gray Deluxe (Upper House Shanghai)","Victor's Café (Fairmont Peace Hotel)","Lobby Lounge (The Langham, Shanghai, Xintiandi)","Cachet (The Langham, Shanghai, Xintiandi)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Shanghai Museum (People's Square)": "Shanghai Museum 201 Renmin Avenue Shanghai",
      "Shanghai Museum East": "Shanghai Museum East 1952 Century Avenue Pudong Shanghai",
      "Jade Buddha Temple": "Jade Buddha Temple 170 Anyuan Road Shanghai",
      "Shanghai World Financial Center": "Shanghai World Financial Center 100 Century Avenue Shanghai",
      "Jazz Bar (Fairmont Peace Hotel)": "Jazz Bar Fairmont Peace Hotel 20 Nanjing Road East Shanghai",
      "Memorial of the First National Congress of the CPC": "Memorial of the First National Congress of the CPC 374 Huangpi South Road Shanghai",
      "T'ang Court (The Langham, Shanghai, Xintiandi)": "T'ang Court The Langham 99 Madang Road Shanghai",
      "Mr & Mrs Bund": "Mr & Mrs Bund 18 Zhongshan East 1st Road Shanghai",
      "Polux by Paul Pairet": "Polux by Paul Pairet Lane 181 Taicang Road Shanghai",
      "Sui Tang Li (Upper House Shanghai)": "Sui Tang Li Upper House 366 Shimen Yi Road Shanghai",
      "Shanghai Botanical Garden": "Shanghai Botanical Garden 1111 Longwu Road Shanghai",
      "Peace Museum (Fairmont Peace Hotel)": "Peace Museum Fairmont Peace Hotel 20 Nanjing Road East Shanghai",
      "Shanghai Natural History Museum": "Shanghai Natural History Museum 510 Beijing West Road Shanghai",
      "The Cathay Room (Fairmont Peace Hotel)": "Cathay Room Fairmont Peace Hotel 20 Nanjing Road East Shanghai",
      "Punch Room (The Shanghai EDITION)": "Punch Room The Shanghai EDITION 199 Nanjing Road East Shanghai",
      "Café Gray Deluxe (Upper House Shanghai)": "Cafe Gray Deluxe Upper House 366 Shimen Yi Road Shanghai",
      "ROOF (The Shanghai EDITION)": "ROOF The Shanghai EDITION 199 Nanjing Road East Shanghai",
      "Shanghai Zoo": "Shanghai Zoo 2381 Hongqiao Road Shanghai",
      "Rockbund Art Museum": "Rockbund Art Museum 20 Huqiu Road Shanghai",
      "Shanghai Jewish Refugees Museum": "Shanghai Jewish Refugees Museum 62 Changyang Road Shanghai",
      "Victor's Café (Fairmont Peace Hotel)": "Victor's Cafe Fairmont Peace Hotel Nanjing Road East Shanghai",
      "URBAN Café (The Sukhothai Shanghai)": "URBAN Cafe The Sukhothai Shanghai 380 Weihai Road Shanghai",
      "Shanghai Tavern (The Shanghai EDITION)": "Shanghai Tavern The Shanghai EDITION 199 Nanjing Road East Shanghai",
      "Cachet (The Langham, Shanghai, Xintiandi)": "Cachet The Langham 99 Madang Road Shanghai",
      "Lobby Lounge (The Langham, Shanghai, Xintiandi)": "Lobby Lounge The Langham 99 Madang Road Shanghai"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Shanghai" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, temples, gardens and Bund landmarks, with breakfast spots, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Shanghai Museum (People's Square)","Shanghai Museum East","Jade Buddha Temple","Shanghai Natural History Museum"];
    cityGuide.tip = "Plan museum days around split closures: Shanghai Museum's People's Square site shuts on Mondays, while Shanghai Museum East and the Shanghai Natural History Museum shut on Tuesdays, except on national public holidays.";
    data.destinationFacts[cityKey] = "Plan museum days around split closures: Shanghai Museum's People's Square site shuts on Mondays, while Shanghai Museum East and the Shanghai Natural History Museum shut on Tuesdays, except on national public holidays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, temples, gardens and Bund landmarks, with breakfast spots, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "Shanghai Museum (People's Square), the Memorial of the First National Congress of the CPC and the Shanghai Jewish Refugees Museum close on Mondays. Shanghai Museum East and the Shanghai Natural History Museum close on Tuesdays except national public holidays."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead",
        "copy": "Shanghai Museum asks you to book and buy tickets before visiting the People's Square site while its Ancient Americas exhibition runs, though basic galleries at Shanghai Museum East need no booking. The Shanghai Natural History Museum sells real-name tickets online and checks ID on site."
      },
      {
        "label": "Last entry and walk-ins",
        "value": "Arrive early",
        "copy": "Entry stops at 15:00 at Shanghai Museum (People's Square), at 16:00 at the Shanghai Natural History Museum and the Shanghai Jewish Refugees Museum, and at 16:30 at the CPC memorial. Mr & Mrs Bund asks you to phone for same-day tables, and Punch Room at The Shanghai EDITION is reservation-only."
      },
      {
        "label": "Rules and age",
        "value": "Casual dress, free for small children",
        "copy": "The Shanghai EDITION lists a casual dress code for ROOF, Punch Room and Shanghai Tavern. At the Shanghai Natural History Museum, children 1.3 m or under (or aged 6 and under) and visitors aged 70 and over enter free."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book Shanghai Museum's People's Square site before you go, and plan museum days around the Monday and Tuesday closures.",
      intro: [
        "Shanghai Museum now runs two sites, and their schedules differ. The People's Square building at 201 Renmin Avenue opens from 9:00 to 17:00, stops entry at 15:00 and closes on Mondays except national public holidays. Its Ancient Americas exhibition runs from 9 July 2026 to 14 November 2027, and while it is on you need to book and buy a ticket before you go. Shanghai Museum East, at 1952 Century Avenue in Pudong, opens from 10:00 to 18:00, closes on Tuesdays, needs no booking for its basic galleries and shows treasures from the Silla kingdom until 18 January 2027.",
        "For modern history, the Memorial of the First National Congress of the CPC on Huangpi South Road opens Tuesday to Sunday and runs free Chinese-language guided tours at set times through the day. The Shanghai Jewish Refugees Museum on Changyang Road in Hongkou also opens Tuesday to Sunday, with last entry at 16:00. With children, you can pair the Shanghai Natural History Museum, inside Jing'an Sculpture Park, which sells real-name tickets online, with the Shanghai Botanical Garden on Longwu Road, where the main gate is free and only the specialty gardens charge.",
        "On the Bund, the Fairmont Peace Hotel at 20 Nanjing Road East keeps its Jazz Bar going with nightly sets by the Old Jazz Band. The hotel also offers a free 30-minute guided tour of its Peace Museum and serves afternoon tea and Sunday brunch in the ninth-floor Cathay Room. A short walk away, The Shanghai EDITION has ROOF, a casual 29th-floor rooftop bar, and Punch Room, a reservation-only lounge open until 2:00. Mr & Mrs Bund, on the sixth floor of 18 The Bund, serves lunch and dinner daily and asks you to phone for same-day tables.",
        "In Jing'an, Café Gray Deluxe on the third floor of Upper House Shanghai serves breakfast from 6:30, weekend brunch and afternoon tea, and its lounge stays open until 1:00. Sui Tang Li, one floor down, describes itself as a contemporary Shanghai bistro and opens daily for lunch and dinner. URBAN Café at The Sukhothai Shanghai on Weihai Road also starts breakfast at 6:30. In Xintiandi, T'ang Court at The Langham lists two stars in the 2026 Michelin Guide, and Polux by Paul Pairet on Taicang Road opens daily from 11:00 to 22:00."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at Shanghai Museum (People's Square) with a ticket booked ahead, then head to the Bund for the Fairmont Peace Hotel's Jazz Bar."
        ],
        [
          "A slower morning",
          "Take breakfast from 6:30 at Café Gray Deluxe or URBAN Café, then walk to the Shanghai Natural History Museum in Jing'an Sculpture Park."
        ],
        [
          "Before booking",
          "Check closing days: Monday for the People's Square museum, and Tuesday for Shanghai Museum East and the Shanghai Natural History Museum."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Reykjavik, Iceland: source review of 2026-10-25 (docs/content-research/reykjavik-2026-10-25.md).
  {
    const cityKey = "Reykjavik, Iceland";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Hallgrímskirkja","Harpa","Perlan","National Museum of Iceland"],
      bestFirstTimers: ["Hallgrímskirkja","Harpa","National Museum of Iceland","Whales of Iceland"],
      bestRestaurants: ["Grillmarkaðurinn","Matur og Drykkur","Fiskmarkaðurinn","Dill"],
      bestBudget: ["Café Loki","Sundhöll Reykjavíkur","Brauð & Co (Frakkastígur)","Mokka Kaffi"],
      bestLuxury: ["Dill","Matur og Drykkur","Grillmarkaðurinn","Apotek Kitchen + Bar"],
      bestCouples: ["Kol","Perlan","Harpa","Slippbarinn"],
      bestKids: ["Reykjavík Family Park and Zoo","Whales of Iceland","FlyOver Iceland","Perlan"],
      bestSolo: ["National Gallery of Iceland","Reykjavík Art Museum - Hafnarhús","Reykjavík Art Museum - Kjarvalsstaðir","Reykjavík Museum of Photography"],
      bestUnique: ["Sundhöll Reykjavíkur","Reykjavík Art Museum - Ásmundarsafn","Settlement Exhibition (Aðalstræti)","FlyOver Iceland"],
      bestBreakfast: ["Sandholt","Brauð & Co (Frakkastígur)","Mokka Kaffi","Café Loki"],
      bestLunch: ["Messinn","Café Loki","Apotek Kitchen + Bar","Snaps"],
      bestDinner: ["Grillmarkaðurinn","Fiskmarkaðurinn","Matur og Drykkur","Messinn"],
      bestCocktails: ["Apotek Kitchen + Bar","Kaldi Bar","Slippbarinn"],
      bestBakeries: ["Sandholt","Brauð & Co (Frakkastígur)"],
      bestCoffee: ["Reykjavík Roasters (Kárastígur)","Mokka Kaffi","Sandholt"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Hallgrímskirkja": "Hallgrímskirkja Hallgrímstorg 1 Reykjavík",
      "Harpa": "Harpa Austurbakki 2 Reykjavík",
      "Perlan": "Perlan Öskjuhlíð Reykjavík",
      "National Museum of Iceland": "National Museum of Iceland Suðurgata 41 Reykjavík",
      "Whales of Iceland": "Whales of Iceland Fiskislóð 23-25 Reykjavík",
      "Grillmarkaðurinn": "Grillmarkaðurinn Lækjargata 2A Reykjavík",
      "Matur og Drykkur": "Matur og Drykkur Mýrargata 31 Reykjavík",
      "Fiskmarkaðurinn": "Fiskmarkaðurinn Aðalstræti 12 Reykjavík",
      "Dill": "Dill Laugavegur 59 Reykjavík",
      "Café Loki": "Café Loki Lokastígur 28 Reykjavík",
      "Sundhöll Reykjavíkur": "Sundhöll Reykjavíkur Barónsstígur 45a Reykjavík",
      "Brauð & Co (Frakkastígur)": "Brauð & Co Frakkastígur 16 Reykjavík",
      "Mokka Kaffi": "Mokka Kaffi Skólavörðustígur 3a Reykjavík",
      "Apotek Kitchen + Bar": "Apotek Kitchen + Bar Austurstræti 16 Reykjavík",
      "Kol": "Kol Skólavörðustígur 40 Reykjavík",
      "Slippbarinn": "Slippbarinn Mýrargata 2 Reykjavík",
      "Reykjavík Family Park and Zoo": "Fjölskyldu- og húsdýragarðurinn Múlavegur 2 Reykjavík",
      "FlyOver Iceland": "FlyOver Iceland Fiskislóð 43 Reykjavík",
      "National Gallery of Iceland": "National Gallery of Iceland Laufásvegur 12 Reykjavík",
      "Reykjavík Art Museum - Hafnarhús": "Hafnarhús Tryggvagata 17 Reykjavík",
      "Reykjavík Art Museum - Kjarvalsstaðir": "Kjarvalsstaðir Flókagata 24 Reykjavík",
      "Reykjavík Museum of Photography": "Reykjavík Museum of Photography Tryggvagata 15 Reykjavík",
      "Reykjavík Art Museum - Ásmundarsafn": "Ásmundarsafn Sigtún 105 Reykjavík",
      "Settlement Exhibition (Aðalstræti)": "Settlement Exhibition Aðalstræti 16 Reykjavík",
      "Sandholt": "Sandholt Laugavegur 36 Reykjavík",
      "Messinn": "Messinn Lækjargata 6b Reykjavík",
      "Snaps": "Snaps Þórsgata 1 Reykjavík",
      "Kaldi Bar": "Kaldi Bar Laugavegur 20b Reykjavík",
      "Reykjavík Roasters (Kárastígur)": "Reykjavík Roasters Kárastígur 1 Reykjavík"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Reykjavik" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Churches, concert halls, national and city museums, family attractions and a city pool, with bakeries, cafés, dinners and bars checked against their own websites.";
    cityGuide.highlights = ["Hallgrímskirkja","Harpa","National Museum of Iceland","National Gallery of Iceland"];
    cityGuide.tip = "Matur og Drykkur opens only Wednesday to Sunday from 18:00, so plan a Monday or Tuesday dinner elsewhere, such as Grillmarkaðurinn, which seats from 17:30 every day.";
    data.destinationFacts[cityKey] = "Matur og Drykkur opens only Wednesday to Sunday from 18:00, so plan a Monday or Tuesday dinner elsewhere, such as Grillmarkaðurinn, which seats from 17:30 every day.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Churches, concert halls, national and city museums, family attractions and a city pool, with bakeries, cafés, dinners and bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Most sights open daily",
        "copy": "The National Museum of Iceland, the National Gallery of Iceland and Whales of Iceland all publish daily hours, while Matur og Drykkur opens only Wednesday to Sunday. Harpa stays open until 20:00 from Wednesday to Saturday and until 18:00 on other days."
      },
      {
        "label": "Tickets and booking",
        "value": "Book dinners and FlyOver ahead",
        "copy": "Grillmarkaðurinn, Fiskmarkaðurinn and Snaps take table bookings through Dineout. FlyOver Iceland lists 5,690 ISK online against 6,250 ISK at the gate."
      },
      {
        "label": "Walk-in only",
        "value": "No reservations",
        "copy": "Café Loki states first come, first served with no table reservations. Kaldi Bar takes neither table nor group bookings."
      },
      {
        "label": "Age and height rules",
        "value": "Check before you go",
        "copy": "Kaldi Bar has an age limit of 22. FlyOver Iceland requires children to be at least 100cm tall, and children 13 and under must be accompanied by someone 14 or older."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Base yourself in the centre, book dinners a few days ahead, and save the museums for the darker afternoons since most keep daily daytime hours.",
      intro: [
        "Reykjavík's centre is compact, and Hallgrímskirkja on Hallgrímstorg is the clearest anchor. Its summer notice gave daily hours of 10:00 to 20:00 from 20 May 2026, with tower access closing at 19:45, so check its current hours; it also warns that access can be limited during services, ceremonies and concerts. Down at the waterfront, Harpa on Austurbakki opens Sunday to Tuesday from 10:00 to 18:00 and Wednesday to Saturday until 20:00, and its box office stays open longer on event nights. Perlan on Öskjuhlíð runs its exhibitions from 9:00 to 21:00, with a bar open until 21:00.",
        "For a museum day, the National Museum of Iceland at Suðurgata 41 opens daily from 10:00 to 17:00, charges adults 3,300 ISK and lets under-18s in free. Its exhibition on the bridal costume runs until 9 May 2027. The National Gallery of Iceland at Laufásvegur 12 also opens every day from 10am to 5pm, with \"Kjarval in the East\" until 17 January 2027 and a show of Ukrainian icons until 17 October 2027. Reykjavík Art Museum spreads across three buildings: Hafnarhús on Tryggvagata stays open until 22:00 on Thursdays, while Kjarvalsstaðir and Ásmundarsafn keep daytime hours.",
        "Eating out rewards a little planning. Grillmarkaðurinn, Fiskmarkaðurinn and Snaps take bookings through Dineout, and Matur og Drykkur on Mýrargata opens only Wednesday to Sunday from 18:00, with its food-and-drink menu listed at 24,500 ISK and no vegan, gluten-free or lactose-free menu. Café Loki, across the street from Hallgrímskirkja, takes no table reservations and serves Icelandic rye bread plates from 8am. For an early start, Brauð & Co on Frakkastígur opens at 06:30, Sandholt on Laugavegur at 07:30 and Mokka on Skólavörðustígur at 9:00.",
        "In the evening, Kaldi Bar at Laugavegur 20b has an age limit of 22, takes no table or group bookings and runs a daily happy hour from 16:00 to 19:00 on draught beer and wine. Slippbarinn on Mýrargata has happy hour every day from 15:00 to 18:00. If you are travelling with children, the Family Park and Zoo at Múlavegur 2 opens daily from 10:00 to 17:00 with free entry for under-sixes, Whales of Iceland on Fiskislóð is open every day of the year, and FlyOver Iceland requires riders to be at least 100cm tall."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair Hallgrímskirkja, which posts its tower hours on its own site, with Harpa on the waterfront and the National Museum of Iceland on Suðurgata."
        ],
        [
          "A slower morning",
          "Start with a pastry at Brauð & Co on Frakkastígur from 06:30 or Sandholt on Laugavegur from 07:30, then coffee at Mokka from 9:00."
        ],
        [
          "Before booking",
          "Reserve Grillmarkaðurinn, Fiskmarkaðurinn or Snaps through Dineout, and remember Matur og Drykkur is closed on Mondays and Tuesdays."
        ]
      ],
      trust: "All 29 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Beijing, China: source review of 2026-10-25 (docs/content-research/beijing-2026-10-25.md).
  {
    const cityKey = "Beijing, China";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Palace Museum (Forbidden City)","Temple of Heaven","Summer Palace","National Museum of China"],
      bestFirstTimers: ["Palace Museum (Forbidden City)","Temple of Heaven","National Museum of China","Beihai Park"],
      bestRestaurants: ["The House of Dynasties (Rosewood Beijing)","Country Kitchen (Rosewood Beijing)","Quanjude (Qianmen)","Toast (The Orchid)"],
      bestBudget: ["National Museum of China","Beihai Park","Temple of Heaven","Prince Gong Mansion"],
      bestLuxury: ["The House of Dynasties (Rosewood Beijing)","Mei (Rosewood Beijing)","Country Kitchen (Rosewood Beijing)","National Centre for the Performing Arts"],
      bestCouples: ["Mei (Rosewood Beijing)","Toast (The Orchid)","National Centre for the Performing Arts","Beihai Park"],
      bestKids: ["China Science and Technology Museum","Beijing Planetarium","Beijing Zoo","Universal Beijing Resort"],
      bestSolo: ["UCCA Beijing","National Art Museum of China","Café Zarah","Capital Museum"],
      bestUnique: ["Beijing Ancient Observatory","Prince Gong Mansion","UCCA Beijing","National Centre for the Performing Arts"],
      bestBreakfast: ["LIQĀ (Rosewood Beijing)","Café Zarah"],
      bestLunch: ["Country Kitchen (Rosewood Beijing)","The House of Dynasties (Rosewood Beijing)","Toast (The Orchid)","Donglaishun (Wangfujing)"],
      bestDinner: ["Quanjude (Qianmen)","Bianyifang (Xianyukou)","Red Bowl (Rosewood Beijing)","Donglaishun (Wangfujing)"],
      bestCocktails: ["Mei (Rosewood Beijing)"],
      bestBakeries: ["Butterfly Patisserie (Rosewood Beijing)"],
      bestCoffee: ["Café Zarah"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Palace Museum (Forbidden City)": "Palace Museum 4 Jingshan Qianjie Beijing",
      "Temple of Heaven": "Temple of Heaven 7 Tiantan Neidongli Beijing",
      "Summer Palace": "Summer Palace Gongmenqian Jie Beijing",
      "National Museum of China": "National Museum of China 16 East Chang'an Avenue Beijing",
      "Beihai Park": "Beihai Park 1 Wenjin Jie Beijing",
      "The House of Dynasties (Rosewood Beijing)": "The House of Dynasties Rosewood Jing Guang Centre Hujialou Beijing",
      "Country Kitchen (Rosewood Beijing)": "Country Kitchen Rosewood Jing Guang Centre Hujialou Beijing",
      "Quanjude (Qianmen)": "Quanjude 30 Qianmen Dajie Beijing",
      "Toast (The Orchid)": "Toast The Orchid 65 Baochao Hutong Beijing",
      "Prince Gong Mansion": "Prince Gong Mansion 17 Qianhai Xijie Beijing",
      "Mei (Rosewood Beijing)": "Mei bar Rosewood Jing Guang Centre Hujialou Beijing",
      "National Centre for the Performing Arts": "National Centre for the Performing Arts 2 West Chang'an Avenue Beijing",
      "China Science and Technology Museum": "China Science and Technology Museum 5 Beichen East Road Beijing",
      "Beijing Planetarium": "Beijing Planetarium 138 Xizhimenwai Dajie Beijing",
      "Beijing Zoo": "Beijing Zoo 137 Xizhimenwai Dajie Beijing",
      "Universal Beijing Resort": "Universal Beijing Resort Liyuan Tongzhou Beijing",
      "UCCA Beijing": "UCCA Center for Contemporary Art 4 Jiuxianqiao Road Beijing",
      "National Art Museum of China": "National Art Museum of China 1 Wusi Dajie Beijing",
      "Café Zarah": "Cafe Zarah 46 Gulou Dongdajie Beijing",
      "Capital Museum": "Capital Museum 16 Fuxingmenwai Dajie Beijing",
      "Beijing Ancient Observatory": "Beijing Ancient Observatory 2 Dongbiaobei Hutong Jianguomennei Dajie Beijing",
      "LIQĀ (Rosewood Beijing)": "LIQA Rosewood Jing Guang Centre Hujialou Beijing",
      "Donglaishun (Wangfujing)": "Donglaishun 198 Wangfujing Dajie Beijing",
      "Bianyifang (Xianyukou)": "Bianyifang 65 Xianyukou Jie Beijing",
      "Red Bowl (Rosewood Beijing)": "Red Bowl Rosewood Jing Guang Centre Hujialou Beijing",
      "Butterfly Patisserie (Rosewood Beijing)": "Butterfly Patisserie Rosewood Jing Guang Centre Hujialou Beijing"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Beijing" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Imperial palaces, parks, national museums and contemporary art, with duck restaurants, hotel dining, breakfast, a cocktail bar, a patisserie and a hutong café checked against their own or their public operators' websites.";
    cityGuide.highlights = ["Palace Museum (Forbidden City)","Temple of Heaven","Summer Palace","National Museum of China"];
    cityGuide.tip = "Book the Palace Museum ahead (reservations open up to seven days before at 20:00) and avoid Mondays, when it, the National Museum of China and the National Art Museum of China are closed; the Capital Museum and Beijing Planetarium close on Tuesdays instead.";
    data.destinationFacts[cityKey] = "Book the Palace Museum ahead (reservations open up to seven days before at 20:00) and avoid Mondays, when it, the National Museum of China and the National Art Museum of China are closed; the Capital Museum and Beijing Planetarium close on Tuesdays instead.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Imperial palaces, parks, national museums and contemporary art, with duck restaurants, hotel dining, breakfast, a cocktail bar, a patisserie and a hutong café checked against their own or their public operators' websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "The Palace Museum, National Museum of China, National Art Museum of China, Prince Gong Mansion and China Science and Technology Museum close on Mondays except public holidays. The Capital Museum, Beijing Planetarium and Beijing Ancient Observatory close on Tuesdays instead."
      },
      {
        "label": "Booking",
        "value": "Real-name, ID required",
        "copy": "Palace Museum reservations open up to 7 days ahead from 20:00 and entry is by ID scan. The National Museum of China is free but needs a real-name booking, limited to one booking a week for up to five people per account."
      },
      {
        "label": "Entry and queues",
        "value": "Fixed gates",
        "copy": "At the Palace Museum you can only enter through the Meridian Gate (Wumen, south) and leave by the Shenwu or Donghua gates. At the National Museum of China you queue at the north gate during your booked slot with the original ID used to book."
      },
      {
        "label": "Rules",
        "value": "Bags, dress, kids",
        "copy": "UCCA Beijing bars food, drinks, tripods, selfie sticks, suitcases and bags longer than 40 cm from galleries, offers free lockers, and admits children under 1.2 m free with an adult. Country Kitchen, The House of Dynasties and Mei at Rosewood Beijing ask for business casual."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book the big museums a week out, plan around Monday and Tuesday closures, and keep the hutong cafés and hotel dining rooms for the gaps.",
      intro: [
        "Start with the Palace Museum, where you must book ahead: reservations open up to seven days before your visit at 20:00, and entry is by scanning your ID. You go in only through the Meridian Gate on the south side and leave by the Shenwu or Donghua gates. Admission runs from 08:30 to a last entry at 16:00, and the palace is closed on Mondays except public holidays. Some halls are shut, including Yanxi Palace, and the Wuyingdian has stopped opening.",
        "The National Museum of China, on the east side of Tiananmen Square at 16 East Chang'an Avenue, is free but needs a real-name booking, and accounts are limited to one booking a week for up to five people. Its painting and calligraphy exhibition on poetic dwelling opened on 4 September 2026 in South Hall 12. Nearby, the National Art Museum of China shows Nikolai Fechin paintings until 14 February 2027. At Prince Gong Mansion, a centenary exhibition on Pu Xinyu and Zhang Daqian runs until 13 December.",
        "For contemporary art, UCCA Beijing in the 798 district has Carsten Höller: Two until 31 January 2027 and opens Tuesday to Sunday, 10:00 to 19:00. With children, you can head to the China Science and Technology Museum, where tickets open seven days ahead at 18:00. The Beijing Planetarium and the Ancient Observatory share 09:00 to 16:30 hours and close on Tuesdays. For an evening, the National Centre for the Performing Arts lists Tosca from 6 to 8 November.",
        "For food, Quanjude's Qianmen branch is at 30 Qianmen Street and Bianyifang has a branch on Xianyukou Street. Donglaishun serves at 198 Wangfujing Street. At Rosewood Beijing, LIQĀ serves breakfast from 6:30. Country Kitchen and The House of Dynasties serve lunch and dinner daily, and Mei pours cocktails from 7 pm. In the Gulou area, Café Zarah serves north European breakfast and closes on Mondays. Toast at The Orchid is open to non-guests from 10:00 to 21:30."
      ],
      summaryCards: [
        [
          "First visit",
          "Book the Palace Museum up to seven days ahead, enter by the Meridian Gate, and pair it with the free, pre-booked National Museum of China on any day but Monday."
        ],
        [
          "A slower morning",
          "Start with breakfast at LIQĀ or Café Zarah, then walk in Beihai Park or visit Prince Gong Mansion, which opens at 8:30."
        ],
        [
          "Before booking",
          "Bring the original ID you booked with, since the Palace Museum and National Museum of China check it at entry, and note that the Capital Museum and Planetarium close on Tuesdays."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Milan, Italy: source review of 2026-10-25 (docs/content-research/milan-2026-10-25.md).
  {
    const cityKey = "Milan, Italy";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Duomo di Milano","The Last Supper (Cenacolo Vinciano)","Pinacoteca di Brera","Pinacoteca Ambrosiana"],
      bestFirstTimers: ["Duomo di Milano","The Last Supper (Cenacolo Vinciano)","Pinacoteca di Brera","Camparino in Galleria"],
      bestRestaurants: ["Ratanà","Antica Trattoria della Pesa","Langosteria (Via Savona)","Ristorante Cracco"],
      bestBudget: ["Pirelli HangarBicocca","Luini (Via Santa Radegonda)","Mercato Centrale Milano","Pinacoteca di Brera"],
      bestLuxury: ["Ristorante Cracco","Langosteria (Via Savona)","Ally's Bar (Langosteria Montenapoleone)","Villa Necchi Campiglio"],
      bestCouples: ["Villa Necchi Campiglio","Ally's Bar (Langosteria Montenapoleone)","Moebius","Museo Bagatti Valsecchi"],
      bestKids: ["MUBA Museo dei Bambini","Pirelli HangarBicocca","Eataly Milano Smeraldo","Pavè (Casati)"],
      bestSolo: ["Museo Poldi Pezzoli","Museo Diocesano Carlo Maria Martini","Peck (Via Spadari)","Mercato Centrale Milano"],
      bestUnique: ["Pirelli HangarBicocca","Villa Necchi Campiglio","Museo Bagatti Valsecchi","Museo Diocesano Carlo Maria Martini"],
      bestBreakfast: ["Café Cracco","Pasticceria Martesana (Sant'Agostino)","Biffi Pasticceria (Corso Magenta)","Pavè (Casati)"],
      bestLunch: ["Luini (Via Santa Radegonda)","Mercato Centrale Milano","Ratanà","Peck (Via Spadari)"],
      bestDinner: ["Antica Trattoria della Pesa","Masuelli Trattoria (Viale Umbria)","Langosteria (Via Savona)","Moebius"],
      bestCocktails: ["Camparino in Galleria","Ally's Bar (Langosteria Montenapoleone)","Dry Milano (Solferino)","Moebius"],
      bestBakeries: ["Pavè (Casati)","Pasticceria Martesana (Sant'Agostino)","Biffi Pasticceria (Corso Magenta)","Café Cracco"],
      bestCoffee: ["Café Cracco","Camparino in Galleria","Biffi Pasticceria (Corso Magenta)","Eataly Milano Smeraldo"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Duomo di Milano": "Duomo di Milano Piazza del Duomo Milan",
      "The Last Supper (Cenacolo Vinciano)": "Cenacolo Vinciano Piazza di Santa Maria delle Grazie 2 Milan",
      "Pinacoteca di Brera": "Pinacoteca di Brera Via Brera 28 Milan",
      "Pinacoteca Ambrosiana": "Pinacoteca Ambrosiana Piazza Pio XI 2 Milan",
      "Camparino in Galleria": "Camparino in Galleria Piazza Duomo 21 Milan",
      "Ratanà": "Ratanà Via Gaetano de Castillia 28 Milan",
      "Antica Trattoria della Pesa": "Antica Trattoria della Pesa Viale Pasubio 10 Milan",
      "Langosteria (Via Savona)": "Langosteria Via Savona 10 Milan",
      "Ristorante Cracco": "Ristorante Cracco Galleria Vittorio Emanuele II Milan",
      "Pirelli HangarBicocca": "Pirelli HangarBicocca Via Chiese 2 Milan",
      "Luini (Via Santa Radegonda)": "Luini Via Santa Radegonda 16 Milan",
      "Mercato Centrale Milano": "Mercato Centrale Milano Via Sammartini Milan",
      "Ally's Bar (Langosteria Montenapoleone)": "Ally's Bar Langosteria Corso Giacomo Matteotti 9 Milan",
      "Villa Necchi Campiglio": "Villa Necchi Campiglio Via Mozart 14 Milan",
      "Moebius": "Moebius Via Alfredo Cappellini 25 Milan",
      "Museo Bagatti Valsecchi": "Museo Bagatti Valsecchi Via Gesù 5 Milan",
      "MUBA Museo dei Bambini": "MUBA Museo dei Bambini Via Enrico Besana 12 Milan",
      "Eataly Milano Smeraldo": "Eataly Smeraldo Piazza XXV Aprile Milan",
      "Pavè (Casati)": "Pavè Via Felice Casati 27 Milan",
      "Museo Poldi Pezzoli": "Museo Poldi Pezzoli Via Manzoni 12 Milan",
      "Museo Diocesano Carlo Maria Martini": "Museo Diocesano Carlo Maria Martini Piazza Sant'Eustorgio 3 Milan",
      "Peck (Via Spadari)": "Peck Via Spadari 9 Milan",
      "Café Cracco": "Café Cracco Galleria Vittorio Emanuele II Milan",
      "Pasticceria Martesana (Sant'Agostino)": "Pasticceria Martesana Piazza Sant'Agostino 7 Milan",
      "Biffi Pasticceria (Corso Magenta)": "Biffi Pasticceria Corso Magenta 87 Milan",
      "Masuelli Trattoria (Viale Umbria)": "Masuelli Trattoria Viale Umbria 80 Milan",
      "Dry Milano (Solferino)": "Dry Milano Via Solferino 33 Milan"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Milan" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "The Duomo, Leonardo's Last Supper and Milan's picture galleries and house museums, with breakfast pastry shops, trattorias, markets and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Duomo di Milano","The Last Supper (Cenacolo Vinciano)","Pinacoteca di Brera","Pirelli HangarBicocca"];
    cityGuide.tip = "The Last Supper and Pinacoteca di Brera both close on Mondays and both require a reservation, so book them for Tuesday to Sunday before you fix the rest of your days.";
    data.destinationFacts[cityKey] = "The Last Supper and Pinacoteca di Brera both close on Mondays and both require a reservation, so book them for Tuesday to Sunday before you fix the rest of your days.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "The Duomo, Leonardo's Last Supper and Milan's picture galleries and house museums, with breakfast pastry shops, trattorias, markets and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and early week",
        "copy": "Pinacoteca di Brera closes every Monday and The Last Supper opens Tuesday to Sunday only. Pirelli HangarBicocca's exhibitions are closed Monday to Wednesday, and Museo Bagatti Valsecchi opens Wednesday to Sunday."
      },
      {
        "label": "Tickets and booking",
        "value": "Reserve the big two",
        "copy": "The Last Supper says reservations are compulsory for all ticket types, with 15-minute visits for up to 40 people, and releases tickets three months at a time. Pinacoteca di Brera also requires a reservation, including on its free first Sunday of the month."
      },
      {
        "label": "Walk-in or book",
        "value": "Know which ones take bookings",
        "copy": "Café Cracco in the Galleria does not take reservations and opens daily 8am to midnight. Ratanà books online for up to eight people, and a booking only counts once you receive the confirmation email."
      },
      {
        "label": "Free entry rules",
        "value": "Free, but booked",
        "copy": "Pirelli HangarBicocca is free but asks you to book your admission online. Brera's first-Sunday free entry also needs a reservation."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Book The Last Supper and Brera first, keep Mondays for markets, pastry shops and Thursday-to-Sunday spaces like HangarBicocca, and reserve dinners ahead.",
      intro: [
        "Milan's headline sights reward a little planning. At The Last Supper in Santa Maria delle Grazie, reservations are compulsory for every ticket type, visits last 15 minutes with up to 40 people, and the museum opens Tuesday to Sunday from 8.15am to 7pm. Tickets are released three months at a time, so check the sales calendar early. Pinacoteca di Brera, on Via Brera, also asks you to reserve, opens Tuesday to Sunday from 8.30am to 7.15pm with last entry at 6pm, and is free with a reservation on the first Sunday of each month.",
        "Several exhibitions run well into winter. Brera's \"100 Years for Brera\", on gifts and acquisitions from its Friends, runs from 6 October 2026 to 14 February 2027. The Pinacoteca Ambrosiana on Piazza Pio XI shows \"The 'Sign' of Saint Francis: Images of a Life\" until 12 January 2027, and the Museo Diocesano at Piazza Sant'Eustorgio shows Artemisia Gentileschi's \"Annunciazione\" from 27 October 2026 to 31 January 2027. Further out, Pirelli HangarBicocca on Via Chiese is free with booking, opens Thursday to Sunday from 10.30am to 8.30pm, and shows Aki Sasamoto until 17 January 2027 and Luciano Fabro until 21 February 2027.",
        "For a quieter day, Museo Bagatti Valsecchi on Via Gesù opens Wednesday to Sunday from 10am to 6pm and recommends booking online, while FAI's Villa Necchi Campiglio on Via Mozart says its Piero Portaluppi drawing exhibition has been extended to 29 November. Mornings start easily: Café Cracco in the Galleria Vittorio Emanuele II opens daily from 8am and takes no reservations, Pasticceria Martesana in Piazza Sant'Agostino opens from 7.30am on weekdays, and Biffi on Corso Magenta opens every day from 7am. Luini on Via Santa Radegonda serves Monday to Saturday, 10am to 8pm.",
        "Evenings need more booking. Ratanà on Via de Castillia is open every day for lunch and dinner, takes online bookings for up to eight, and treats a booking as valid only once you receive a confirmation email. Antica Trattoria della Pesa on Viale Pasubio is closed on Sundays, and Ristorante Cracco serves dinner Monday to Saturday and lunch Tuesday to Friday. For drinks, Camparino in Galleria's Bar di Passo opens from 9.30am, Dry Milano on Via Solferino opens Tuesday to Sunday from 6pm to 2am, and Ally's Bar, on the sixth floor of Langosteria Montenapoleone, runs from noon to 1am."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Duomo with a reserved Tuesday-to-Sunday slot at The Last Supper and a booked visit to Pinacoteca di Brera."
        ],
        [
          "A slower morning",
          "Start with pastries at Pasticceria Martesana or Biffi, then spend the late morning at Museo Bagatti Valsecchi or Museo Poldi Pezzoli."
        ],
        [
          "Before booking",
          "Remember that Brera and The Last Supper close on Mondays and HangarBicocca's exhibitions open only Thursday to Sunday."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Auckland, New Zealand: source review of 2026-10-25 (docs/content-research/auckland-2026-10-25.md).
  {
    const cityKey = "Auckland, New Zealand";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Auckland War Memorial Museum","Auckland Art Gallery Toi o Tāmaki","New Zealand Maritime Museum","Maungawhau / Mount Eden"],
      bestFirstTimers: ["Auckland War Memorial Museum","Maungawhau / Mount Eden","New Zealand Maritime Museum","Ponsonby Central"],
      bestRestaurants: ["Cassia","Depot Eatery","Ebisu","Amano"],
      bestBudget: ["Auckland Art Gallery Toi o Tāmaki","Auckland Botanic Gardens","Maungawhau / Mount Eden","Ponsonby Central"],
      bestLuxury: ["Mudbrick","Cable Bay","Ebisu","Azabu Ponsonby"],
      bestCouples: ["Cable Bay","Mudbrick","Dr Rudi's Rooftop Brewing Co.","Azabu Ponsonby"],
      bestKids: ["Auckland Zoo","MOTAT","Torpedo Bay Navy Museum","Auckland Botanic Gardens"],
      bestSolo: ["Auckland Art Gallery Toi o Tāmaki","Auckland War Memorial Museum","Ponsonby Central","Torpedo Bay Navy Museum"],
      bestUnique: ["Flush Urban Golf + Bar","Torpedo Bay Navy Museum","MOTAT","The Wreck"],
      bestBreakfast: ["Amano","Depot Eatery","Amano Bakery","Ponsonby Central"],
      bestLunch: ["Market Galley","Ebisu","Bang Bang","Prego"],
      bestDinner: ["Cassia","Azabu Ponsonby","Non Solo Pizza","Soul Bar & Bistro"],
      bestCocktails: ["Bivacco","Cassia","Dr Rudi's Rooftop Brewing Co.","Soul Bar & Bistro"],
      bestBakeries: ["Amano Bakery","Ponsonby Central"],
      bestCoffee: ["Ponsonby Central"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Auckland War Memorial Museum": "Auckland War Memorial Museum Auckland Domain Parnell Auckland",
      "Auckland Art Gallery Toi o Tāmaki": "Auckland Art Gallery Toi o Tāmaki 1 Kitchener Street Auckland",
      "New Zealand Maritime Museum": "New Zealand Maritime Museum Quay Street Hobson Street Auckland",
      "Maungawhau / Mount Eden": "Maungawhau Mount Eden 250 Mount Eden Road Auckland",
      "Ponsonby Central": "Ponsonby Central 136 Ponsonby Road Auckland",
      "Cassia": "Cassia 58 Albert Street Auckland",
      "Depot Eatery": "Depot Eatery 86 Federal Street Auckland",
      "Ebisu": "Ebisu 116 Quay Street Auckland",
      "Amano": "Amano 68 Tyler Street Auckland",
      "Auckland Botanic Gardens": "Auckland Botanic Gardens 102 Hill Road Manurewa Auckland",
      "Mudbrick": "Mudbrick 126 Church Bay Road Oneroa Waiheke Island",
      "Cable Bay": "Cable Bay 12 Nick Johnstone Drive Oneroa Waiheke Island",
      "Azabu Ponsonby": "Azabu Ponsonby 26 Ponsonby Road Auckland",
      "Dr Rudi's Rooftop Brewing Co.": "Dr Rudi's Rooftop Brewing Co 204 Quay Street Auckland",
      "Auckland Zoo": "Auckland Zoo 99 Motions Road Auckland",
      "MOTAT": "MOTAT 805 Great North Road Auckland",
      "Torpedo Bay Navy Museum": "Torpedo Bay Navy Museum 64 King Edward Parade Devonport Auckland",
      "Flush Urban Golf + Bar": "Flush Urban Golf + Bar 48 Customs Street East Auckland",
      "The Wreck": "The Wreck 22 Jellicoe Street Auckland",
      "Amano Bakery": "Amano Bakery 68 Tyler Street Auckland",
      "Market Galley": "Market Galley 22 Jellicoe Street Auckland",
      "Bang Bang": "Bang Bang 22 Jellicoe Street Auckland",
      "Prego": "Prego 226 Ponsonby Road Auckland",
      "Non Solo Pizza": "Non Solo Pizza 259 Parnell Road Auckland",
      "Soul Bar & Bistro": "Soul Bar & Bistro 18 Lower Hobson Street Auckland",
      "Bivacco": "Bivacco 115 Customs Street West Auckland"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Auckland" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, volcanic viewpoints, gardens and Waiheke vineyards, with breakfasts, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Auckland War Memorial Museum","Auckland Art Gallery Toi o Tāmaki","Maungawhau / Mount Eden","Cable Bay"];
    cityGuide.tip = "Auckland War Memorial Museum stays open until 8.30pm every Tuesday, so you can save it for an evening and keep the daytime for outdoor sights.";
    data.destinationFacts[cityKey] = "Auckland War Memorial Museum stays open until 8.30pm every Tuesday, so you can save it for an evening and keep the daytime for outdoor sights.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, volcanic viewpoints, gardens and Waiheke vineyards, with breakfasts, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mostly open daily",
        "copy": "Torpedo Bay Navy Museum closes on Good Friday, Christmas Day and Boxing Day. Auckland Art Gallery, the New Zealand Maritime Museum and Auckland Zoo close only on Christmas Day."
      },
      {
        "label": "Tickets",
        "value": "Book ahead to save",
        "copy": "Auckland Zoo's pre-booked prices for Auckland residents apply to tickets booked before midnight the day before. At Auckland Art Gallery, general collection exhibitions are free but Picasso: Designed by Paul Smith needs a ticket."
      },
      {
        "label": "Walk-ins",
        "value": "Some tables can't be booked",
        "copy": "Depot Eatery takes walk-ins only and applies a one-bill policy to groups of four or more. Cassia and Bivacco take bookings but also welcome walk-ins."
      },
      {
        "label": "Rules",
        "value": "Children and dogs",
        "copy": "At Auckland Zoo, children 14 and under must be with an adult, and Auckland Art Gallery asks the same for under-14s. On Maungawhau / Mount Eden, dogs must be on a leash outside the two fenced off-leash areas."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Pair one museum or volcanic summit with a waterfront meal each day, and give Waiheke a full day of its own.",
      intro: [
        "Start in the city centre at Auckland Art Gallery Toi o Tāmaki, on the corner of Wellesley Street East and Kitchener Street, open daily from 10am to 5pm except Christmas Day. Its general collection exhibitions are free, but Picasso: Designed by Paul Smith, running from 10 October 2026 to 1 February 2027, needs a ticket. In the Auckland Domain, Auckland War Memorial Museum stays open until 8.30pm every Tuesday. On the waterfront, the New Zealand Maritime Museum on Hobson's Wharf opens from 10am to 5pm with last entry at 4pm, and it's free for Auckland residents.",
        "For a family day in Western Springs, Auckland Zoo at 99 Motions Road opens from 9.30am to 5.30pm with last entry at 4.30pm. Auckland residents pay less if they book before midnight the day before. MOTAT, at 805 Great North Road, opens daily from 10am to 4pm. You can only reach the top of Maungawhau / Mount Eden on foot, because its summit road is permanently closed to private vehicles, and summer hours run from 7am to 8.30pm. Further south, Auckland Botanic Gardens in Manurewa is free to enter, and Sculpture in the Gardens runs from 14 November 2026 to 28 February 2027.",
        "Across the harbour, Torpedo Bay Navy Museum at 64 King Edward Parade in Devonport opens from 10am to 5pm every day except Good Friday, Christmas Day and Boxing Day. It's free for New Zealand residents, and international visitors aged 18 and over pay $15. On Waiheke Island, Cable Bay's cellar door at 12 Nick Johnstone Drive opens from 11am to 5pm daily, and its Verandah stays open late on Fridays and Saturdays. Mudbrick, at 126 Church Bay Road in Oneroa, takes table bookings online, but its website doesn't publish restaurant hours, so check before you sail.",
        "Back in town, Depot Eatery at 86 Federal Street takes walk-ins only and serves breakfast from 7am on weekdays. Cassia at 58 Albert Street serves dinner seven nights a week from 5pm and welcomes walk-ins, and its Level 1 Cocktail Lounge opens on Thursday and Friday from 3pm to 5pm. Amano at 68 Tyler Street serves breakfast until 11.30am, and Amano Bakery at the same address opens daily from 7am to 4pm. Savor Group venues, including Amano, Ebisu and Bivacco, add a 15% surcharge to bills on public holidays."
      ],
      summaryCards: [
        [
          "First visit",
          "Combine Auckland War Memorial Museum with a walk up Maungawhau / Mount Eden, then eat on the waterfront at Ebisu or Bivacco."
        ],
        [
          "A slower morning",
          "Have breakfast at Amano or Depot Eatery from 7am, then walk to Auckland Art Gallery Toi o Tāmaki when it opens at 10am."
        ],
        [
          "Before booking",
          "Book Picasso: Designed by Paul Smith tickets and any Auckland Zoo tickets ahead, and remember that Depot Eatery doesn't take reservations."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Zurich, Switzerland: source review of 2026-10-25 (docs/content-research/zurich-2026-10-25.md).
  {
    const cityKey = "Zurich, Switzerland";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Grossmünster","Swiss National Museum (Landesmuseum Zürich)","Kunsthaus Zürich","Fraumünster"],
      bestFirstTimers: ["Grossmünster","Fraumünster","Zürichsee-Schifffahrtsgesellschaft (ZSG) lake boats","Polybahn"],
      bestRestaurants: ["Kronenhalle","Zunfthaus zur Waag","Haus Hiltl","Zeughauskeller"],
      bestBudget: ["Polybahn","Botanical Garden University of Zurich","Markthalle Im Viadukt","Museum für Gestaltung (Ausstellungsstrasse)"],
      bestLuxury: ["Baur au Lac","The Dolder Grand","Kronenhalle","Clouds (Prime Tower)"],
      bestCouples: ["Jules Verne Panoramabar","Zürichsee-Schifffahrtsgesellschaft (ZSG) lake boats","Frau Gerolds Garten","Widder Bar"],
      bestKids: ["Zoo Zürich","Lindt Home of Chocolate","FIFA Museum","Botanical Garden University of Zurich"],
      bestSolo: ["Kunsthalle Zürich","Museum für Gestaltung (Ausstellungsstrasse)","Café Henrici","Old Crow"],
      bestUnique: ["Lindt Home of Chocolate","Frau Gerolds Garten","Polybahn","Markthalle Im Viadukt"],
      bestBreakfast: ["Café Henrici","Clouds (Prime Tower)","Baur au Lac","John Baker (Stadelhofen)"],
      bestLunch: ["Zeughauskeller","Les Halles","Haus Hiltl","Markthalle Im Viadukt"],
      bestDinner: ["Kronenhalle","Swiss Chuchi","Les Halles","Zunfthaus zur Waag"],
      bestCocktails: ["Widder Bar","Old Crow","Jules Verne Panoramabar","Baur au Lac"],
      bestBakeries: ["Sprüngli (Paradeplatz)","John Baker (Stadelhofen)","Markthalle Im Viadukt"],
      bestCoffee: ["Café Henrici","Sprüngli (Paradeplatz)","Lindt Home of Chocolate","John Baker (Stadelhofen)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Grossmünster": "Grossmünster Zwingliplatz 7 Zurich",
      "Swiss National Museum (Landesmuseum Zürich)": "Landesmuseum Zürich Museumstrasse 2 Zurich",
      "Kunsthaus Zürich": "Kunsthaus Zürich Heimplatz Zurich",
      "Fraumünster": "Fraumünster Münsterhof 2 Zurich",
      "Zürichsee-Schifffahrtsgesellschaft (ZSG) lake boats": "ZSG Schiffstation Bürkliplatz Zurich",
      "Polybahn": "Polybahn Central Limmatquai Zurich",
      "Kronenhalle": "Kronenhalle Rämistrasse 4 Zurich",
      "Zunfthaus zur Waag": "Zunfthaus zur Waag Münsterhof 8 Zurich",
      "Haus Hiltl": "Haus Hiltl Sihlstrasse 28 Zurich",
      "Zeughauskeller": "Zeughauskeller Bahnhofstrasse 28a Zurich",
      "Botanical Garden University of Zurich": "Botanischer Garten Universität Zürich Zollikerstrasse 107 Zurich",
      "Markthalle Im Viadukt": "Markthalle Im Viadukt Viaduktstrasse Zurich",
      "Museum für Gestaltung (Ausstellungsstrasse)": "Museum für Gestaltung Ausstellungsstrasse 60 Zurich",
      "Baur au Lac": "Baur au Lac Talstrasse 1 Zurich",
      "The Dolder Grand": "The Dolder Grand Kurhausstrasse 65 Zurich",
      "Clouds (Prime Tower)": "Clouds Prime Tower Maagplatz 5 Zurich",
      "Jules Verne Panoramabar": "Jules Verne Panoramabar Uraniastrasse 9 Zurich",
      "Frau Gerolds Garten": "Frau Gerolds Garten Geroldstrasse 23 Zurich",
      "Widder Bar": "Widder Bar Rennweg 7 Zurich",
      "Zoo Zürich": "Zoo Zürich Zürichbergstrasse 221 Zurich",
      "Lindt Home of Chocolate": "Lindt Home of Chocolate Schokoladenplatz 1 Kilchberg",
      "FIFA Museum": "FIFA Museum Seestrasse 27 Zurich",
      "Kunsthalle Zürich": "Kunsthalle Zürich Limmatstrasse 270 Zurich",
      "Café Henrici": "Café Henrici Niederdorfstrasse 1 Zurich",
      "Old Crow": "Old Crow Schwanengasse 4 Zurich",
      "John Baker (Stadelhofen)": "John Baker Stadelhoferstrasse 28 Zurich",
      "Les Halles": "Les Halles Pfingstweidstrasse 6 Zurich",
      "Swiss Chuchi": "Swiss Chuchi Rosengasse 10 Zurich",
      "Sprüngli (Paradeplatz)": "Sprüngli Bahnhofstrasse 21 Paradeplatz Zurich"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Zurich" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Old Town churches, museums, the zoo and lake boats, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Grossmünster","Fraumünster","Swiss National Museum (Landesmuseum Zürich)","Kunsthaus Zürich"];
    cityGuide.tip = "Plan around Mondays, when the Swiss National Museum, Kunsthaus Zürich, FIFA Museum and Museum für Gestaltung are all closed, and note that the Grossmünster church is closed on Tuesdays.";
    data.destinationFacts[cityKey] = "Plan around Mondays, when the Swiss National Museum, Kunsthaus Zürich, FIFA Museum and Museum für Gestaltung are all closed, and note that the Grossmünster church is closed on Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Old Town churches, museums, the zoo and lake boats, with breakfast cafés, bakeries, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "The Swiss National Museum, Kunsthaus Zürich, FIFA Museum and Museum für Gestaltung close on Mondays. The Grossmünster closes on Tuesdays, and since 3 August 2026 its Karlsturm tower opens only Friday to Sunday."
      },
      {
        "label": "Tickets and booking",
        "value": "Book Lindt ahead; buy on site elsewhere",
        "copy": "Lindt Home of Chocolate asks you to book your ticket online in advance and can sell out on the day. The Fraumünster (CHF 5) and Museum für Gestaltung sell tickets only on site."
      },
      {
        "label": "Walk-in bars",
        "value": "No reservations",
        "copy": "Widder Bar and Old Crow both state they take no reservations. At Kronenhalle, reservations are for the restaurant only, not the bar."
      },
      {
        "label": "Rules",
        "value": "Photos and audio",
        "copy": "At the Fraumünster, private photos without flash or tripod are allowed outside services, but the Chagall windows are copyright protected. The audio tour needs headphones and devices are not given to children under 6."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Start early at the Old Town churches, which open to visitors at 12 on Sundays, and save museum days for Tuesday to Sunday.",
      intro: [
        "Zurich's Old Town centres on two churches facing each other across the Limmat. The Grossmünster on Zwingliplatz opens Monday to Saturday from 10, with Sunday visiting from 12 after the morning service, and it is closed on Tuesdays. From 1 November winter hours run to 17:00. Its Karlsturm tower costs CHF 5 for adults and, since 3 August 2026, opens only Friday to Sunday. Across the river, the Fraumünster on Münsterhof charges CHF 5, sold on site only, and its entry includes a CHF 5 reduction on the Kunsthaus collection.",
        "For museums, you should avoid Mondays. The Swiss National Museum beside the main station opens Tuesday to Sunday, 10:00 to 17:00, with \"Wars and us\" running until 17 January 2027 and \"Graphics: Designing the everyday\" until 4 April 2027. Kunsthaus Zürich on Heimplatz stays open until 20:00 on Thursdays and shows \"Maria Lassnig and Edvard Munch\" until 21 February 2027. In Zurich West, the Museum für Gestaltung shows \"Avant-Garde—Graphic Design on the Rise\" until 21 February 2027, with free entry on Thursdays from 5pm, while Kunsthalle Zürich runs two shows until 10 January 2027.",
        "With children, Zoo Zürich switches to winter hours from November, 9 a.m. to 5 p.m., with the Masoala Rainforest opening at 10. Lindt Home of Chocolate in Kilchberg opens daily from 10 am to 7 pm but asks you to book online in advance, as same-day slots can sell out. The FIFA Museum on Seestrasse opens Tuesday to Sunday, 10:00 to 18:00. For a short ride, the Polybahn runs every five minutes from Central up to the ETH terrace, with fares included in ZVV zone 110.",
        "For food, Café Henrici on Niederdorfstrasse opens at 8 every day and adds brunch at weekends. Haus Hiltl on Sihlstrasse runs its vegetarian buffet until 30 minutes before closing, and Les Halles serves moules et frites year-round. Kronenhalle takes online bookings for the restaurant only. In the evening, Widder Bar and Old Crow take no reservations, and Jules Verne Panoramabar on Uraniastrasse is closed Sundays and Mondays. Frau Gerolds Garten is in its winter season until 5 March 2027."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Grossmünster and Fraumünster in the morning with the Swiss National Museum, avoiding Tuesdays at the Grossmünster and Mondays at the museum."
        ],
        [
          "A slower morning",
          "Start with breakfast at Café Henrici from 8, then ride the Polybahn up to the ETH terrace."
        ],
        [
          "Before booking",
          "Book Lindt Home of Chocolate online ahead, and plan walk-in time for Widder Bar and Old Crow, which take no reservations."
        ]
      ],
      trust: "All 29 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Lyon, France: source review of 2026-10-25 (docs/content-research/lyon-2026-10-25.md).
  {
    const cityKey = "Lyon, France";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Musée des Confluences","Cathédrale Saint-Jean-Baptiste","Lugdunum Musée et théâtres romains","Musée des Beaux-Arts de Lyon"],
      bestFirstTimers: ["Cathédrale Saint-Jean-Baptiste","Les Halles de Lyon Paul Bocuse","Musée des Beaux-Arts de Lyon","Grand Hôtel-Dieu"],
      bestRestaurants: ["La Mère Brazier","Têtedoie","Paul Bocuse (L'Auberge du Pont de Collonges)","Takao Takano"],
      bestBudget: ["Parc de la Tête d'Or","Maison des Canuts","Lugdunum Musée et théâtres romains","Boulangerie du Palais"],
      bestLuxury: ["Paul Bocuse (L'Auberge du Pont de Collonges)","La Mère Brazier","Villa Florentine","Takao Takano"],
      bestCouples: ["Têtedoie","Villa Florentine","Fourvière Hôtel (Les Collections Bar)","Grand Hôtel-Dieu"],
      bestKids: ["Aquarium de Lyon","Parc de la Tête d'Or","Musée des Confluences","Musées Gadagne"],
      bestSolo: ["Musées Gadagne","Institut Lumière","Slake (Jacobins)","Les Halles de Lyon Paul Bocuse"],
      bestUnique: ["Maison des Canuts","Institut Lumière","Lugdunum Musée et théâtres romains","Le Sucre"],
      bestBreakfast: ["Café Bouillet","Slake (Terreaux)","Boulangerie du Palais","Bernachon"],
      bestLunch: ["Les Halles de Lyon Paul Bocuse","Brasserie Georges","Bernachon","Têtedoie"],
      bestDinner: ["La Mère Brazier","Brasserie Georges","Têtedoie","Takao Takano"],
      bestCocktails: ["Fourvière Hôtel (Les Collections Bar)","Villa Florentine","Le Sucre"],
      bestBakeries: ["Sébastien Bouillet (Croix-Rousse)","Boulangerie du Palais","Bernachon"],
      bestCoffee: ["Slake (Jacobins)","Slake (Terreaux)","Café Bouillet"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Musée des Confluences": "Musée des Confluences 86 quai Perrache Lyon",
      "Cathédrale Saint-Jean-Baptiste": "Cathédrale Saint-Jean-Baptiste Place Saint-Jean Lyon",
      "Lugdunum Musée et théâtres romains": "Lugdunum Musée et théâtres romains 17 rue Cléberg Lyon",
      "Musée des Beaux-Arts de Lyon": "Musée des Beaux-Arts de Lyon 20 place des Terreaux Lyon",
      "Les Halles de Lyon Paul Bocuse": "Les Halles de Lyon Paul Bocuse 102 cours Lafayette Lyon",
      "Grand Hôtel-Dieu": "Grand Hôtel-Dieu 7 rue de la Barre Lyon",
      "La Mère Brazier": "La Mère Brazier 12 Rue Royale Lyon",
      "Têtedoie": "Têtedoie 4 Rue Pierre Marion Lyon",
      "Paul Bocuse (L'Auberge du Pont de Collonges)": "Paul Bocuse L'Auberge du Pont de Collonges 40 Rue de la Plage Collonges-au-Mont-d'Or",
      "Takao Takano": "Takao Takano 33 Rue Malesherbes Lyon",
      "Parc de la Tête d'Or": "Parc de la Tête d'Or Place Général Leclerc Lyon",
      "Maison des Canuts": "Maison des Canuts 10 rue d'Ivry Lyon",
      "Boulangerie du Palais": "Boulangerie du Palais 8 rue du Palais de Justice Lyon",
      "Villa Florentine": "Villa Florentine 25 montée Saint-Barthélémy Lyon",
      "Fourvière Hôtel (Les Collections Bar)": "Fourvière Hôtel 23 Rue Roger Radisson Lyon",
      "Aquarium de Lyon": "Aquarium de Lyon 7 rue Stéphane Déchant La Mulatière",
      "Musées Gadagne": "Musées Gadagne 1 place du Petit Collège Lyon",
      "Institut Lumière": "Institut Lumière 25 rue du Premier-Film Lyon",
      "Slake (Jacobins)": "Slake 9 rue de l'Ancienne Préfecture Lyon",
      "Le Sucre": "Le Sucre 50 quai Rambaud Lyon",
      "Café Bouillet": "Café Bouillet 161 Boulevard de la Croix-Rousse Lyon",
      "Slake (Terreaux)": "Slake 18 rue de la Platière Lyon",
      "Bernachon": "Bernachon 42 Cours Franklin Roosevelt Lyon",
      "Brasserie Georges": "Brasserie Georges 30 Cours de Verdun Lyon",
      "Sébastien Bouillet (Croix-Rousse)": "Sébastien Bouillet 15 place de la Croix-Rousse Lyon"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Lyon" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Roman, art and science museums, a cathedral, a covered market and a city park, with bouchon-era tables, bakeries, cafés and bars checked against their own websites.";
    cityGuide.highlights = ["Musée des Confluences","Cathédrale Saint-Jean-Baptiste","Lugdunum Musée et théâtres romains","Les Halles de Lyon Paul Bocuse"];
    cityGuide.tip = "Plan around closing days: the Musée des Beaux-Arts shuts on Tuesdays and public holidays, Gadagne opens only Wednesday to Sunday, and La Mère Brazier serves only Monday to Friday.";
    data.destinationFacts[cityKey] = "Plan around closing days: the Musée des Beaux-Arts shuts on Tuesdays and public holidays, Gadagne opens only Wednesday to Sunday, and La Mère Brazier serves only Monday to Friday.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Roman, art and science museums, a cathedral, a covered market and a city park, with bouchon-era tables, bakeries, cafés and bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Check before you go",
        "copy": "The Musée des Beaux-Arts de Lyon is closed on Tuesdays and public holidays, and Musées Gadagne opens Wednesday to Sunday only. The Maison des Canuts opens Tuesday to Saturday and closes on public holidays."
      },
      {
        "label": "Tickets",
        "value": "Book online for big museums",
        "copy": "The Musée des Confluences recommends buying tickets online to avoid queues and stays open until 22:00 on the first Thursday of the month. The Aquarium de Lyon says no booking is needed for general visits."
      },
      {
        "label": "Restaurant days",
        "value": "Weekday-only tables",
        "copy": "La Mère Brazier serves Monday to Friday only, and Takao Takano opens Monday evening and Tuesday to Friday. Paul Bocuse at Collonges serves Wednesday to Sunday."
      },
      {
        "label": "Dress and rules",
        "value": "Smart dress for fine dining",
        "copy": "Têtedoie's gastronomic room asks men to wear trousers and closed shoes, and Paul Bocuse asks for smart dress. At Parc de la Tête d'Or, entry is barred a quarter-hour before closing."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Anchor each day on one museum with fixed closing days, then book the weekday-only restaurants first.",
      intro: [
        "Lyon rewards you for planning around opening days. The Musée des Beaux-Arts de Lyon on place des Terreaux opens Wednesday to Monday and closes on Tuesdays and public holidays, while Musées Gadagne in Vieux Lyon, home to the city history and puppet museums, opens Wednesday to Sunday from 10:30 to 18:00. Across the Saône, the Cathédrale Saint-Jean-Baptiste opens every day, from 14:00 on Mondays. Up the hill, Lugdunum's museum opens Tuesday to Sunday, and its Roman theatres open from 7:00 to 19:00 through the winter season.",
        "Several exhibitions run well into next year. At the Musée des Beaux-Arts, Musée sentimental runs from 11 September 2026 to 14 March 2027, and the Biennale de Lyon is on until 13 December 2026. The Musée des Confluences shows Animal culte until 15 August 2027 and Corée du Nord until 2 January 2028, with a late opening to 22:00 on the first Thursday of each month. At the Grand Hôtel-Dieu, an Alphonse Mucha exhibition runs to 24 January 2027, and the courtyards and gardens open daily from 7:30.",
        "For food, start at Les Halles de Lyon Paul Bocuse on cours Lafayette, but note its warning that Mondays are a rest day for many traders. Book the classic tables early: La Mère Brazier on rue Royale serves Monday to Friday only, Paul Bocuse at Collonges serves Wednesday to Sunday, and Têtedoie on rue Pierre Marion runs a gastronomic room, closed Tuesdays, beside a bistrot open daily. Brasserie Georges by Perrache opens seven days a week and takes online bookings.",
        "Mornings are easy. Sébastien Bouillet's Boulangerie du Palais in Vieux Lyon opens daily from 7:00, and Café Bouillet on boulevard de la Croix-Rousse opens from 8:00. Slake runs coffee shops in the Jacobins and Terreaux areas from 8:00. In Croix-Rousse, the Maison des Canuts runs guided silk-workshop tours Tuesday to Saturday at 11:00 and 15:30. With children, the Aquarium de Lyon opens daily from 10:30 without booking, and Parc de la Tête d'Or keeps winter hours of 6:30 to 20:30."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Cathédrale Saint-Jean-Baptiste and Musées Gadagne in Vieux Lyon with an afternoon at the Musée des Confluences."
        ],
        [
          "A slower morning",
          "Start with a coffee at Café Bouillet, then take the 11:00 guided tour at the Maison des Canuts, Tuesday to Saturday."
        ],
        [
          "Before booking",
          "La Mère Brazier closes at weekends and the Musée des Beaux-Arts closes on Tuesdays, so set those days first."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 25, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Cairo, Egypt: source review of 2026-10-27 (docs/content-research/cairo-2026-10-27.md).
  {
    const cityKey = "Cairo, Egypt";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Pyramids of Giza","National Museum of Egyptian Civilization","Saqqara","Al-Moez Street"],
      bestFirstTimers: ["Pyramids of Giza","National Museum of Egyptian Civilization","Al-Moez Street","139 Pavilion (Marriott Mena House)"],
      bestRestaurants: ["Khufu's","Osmanly (Kempinski Nile Hotel)","La Zisa (St. Regis Cairo)","139 Pavilion (Marriott Mena House)"],
      bestBudget: ["Al-Moez Street","National Museum of Egyptian Civilization","Garden Promenade Cafe (Cairo Marriott)","The Bakery (Cairo Marriott)"],
      bestLuxury: ["J&G Steakhouse Cairo (St. Regis Cairo)","The St. Regis Bar & The Water Garden","Khufu's","Alfredo (Marriott Mena House)"],
      bestCouples: ["The Rooftop (Kempinski Nile Hotel)","Alfredo (Marriott Mena House)","The St. Regis Bar & The Water Garden","Al-Moez Street"],
      bestKids: ["Pyramids of Giza","National Museum of Egyptian Civilization","Sirocco (St. Regis Cairo)","Chocolate Lounge (Kempinski Nile Hotel)"],
      bestSolo: ["Saqqara","Al-Moez Street","The Jazz Bar (Kempinski Nile Hotel)","Garden Promenade Cafe (Cairo Marriott)"],
      bestUnique: ["Saqqara","Khufu's","National Museum of Egyptian Civilization","139 Pavilion (Marriott Mena House)"],
      bestBreakfast: ["139 Pavilion (Marriott Mena House)","Omar Khayyam Restaurant (Cairo Marriott)","Khufu's","Garden Promenade Cafe (Cairo Marriott)"],
      bestLunch: ["Khufu's","Saraya Gallery (Cairo Marriott)","Sirocco (St. Regis Cairo)","Osmanly (Kempinski Nile Hotel)"],
      bestDinner: ["Osmanly (Kempinski Nile Hotel)","J&G Steakhouse Cairo (St. Regis Cairo)","La Zisa (St. Regis Cairo)","Alfredo (Marriott Mena House)"],
      bestCocktails: ["The Rooftop (Kempinski Nile Hotel)","The St. Regis Bar & The Water Garden","Harry's Pub (Cairo Marriott)","The Jazz Bar (Kempinski Nile Hotel)"],
      bestBakeries: ["The Bakery (Cairo Marriott)","La Patisserie (JW Marriott Hotel Cairo)","Chocolate Lounge (Kempinski Nile Hotel)"],
      bestCoffee: ["Garden Promenade Cafe (Cairo Marriott)","The Jazz Bar (Kempinski Nile Hotel)","Chocolate Lounge (Kempinski Nile Hotel)","La Patisserie (JW Marriott Hotel Cairo)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Pyramids of Giza": "Pyramids of Giza Giza Plateau Giza",
      "National Museum of Egyptian Civilization": "National Museum of Egyptian Civilization Al-Fustat Road Ain El-Sira Cairo",
      "Saqqara": "Saqqara Necropolis Giza",
      "Al-Moez Street": "Al-Moez Street Islamic Cairo Cairo",
      "139 Pavilion (Marriott Mena House)": "139 Pavilion Marriott Mena House 6 Pyramids Road Giza",
      "Khufu's": "Khufu's restaurant Giza Pyramids Giza",
      "Osmanly (Kempinski Nile Hotel)": "Osmanly Kempinski Nile Hotel Garden City Cairo",
      "La Zisa (St. Regis Cairo)": "La Zisa St. Regis 1189 Nile Corniche Cairo",
      "Garden Promenade Cafe (Cairo Marriott)": "Garden Promenade Cafe Cairo Marriott 16 Saray El Gezira Street Zamalek Cairo",
      "The Bakery (Cairo Marriott)": "The Bakery Cairo Marriott 16 Saray El Gezira Street Zamalek Cairo",
      "J&G Steakhouse Cairo (St. Regis Cairo)": "J&G Steakhouse St. Regis 1189 Nile Corniche Cairo",
      "The St. Regis Bar & The Water Garden": "St. Regis Bar 1189 Nile Corniche Cairo",
      "Alfredo (Marriott Mena House)": "Alfredo Marriott Mena House 6 Pyramids Road Giza",
      "The Rooftop (Kempinski Nile Hotel)": "The Rooftop Kempinski Nile Hotel Garden City Cairo",
      "Sirocco (St. Regis Cairo)": "Sirocco St. Regis 1189 Nile Corniche Cairo",
      "Chocolate Lounge (Kempinski Nile Hotel)": "Chocolate Lounge Kempinski Nile Hotel Garden City Cairo",
      "The Jazz Bar (Kempinski Nile Hotel)": "The Jazz Bar Kempinski Nile Hotel Garden City Cairo",
      "Omar Khayyam Restaurant (Cairo Marriott)": "Omar Khayyam Restaurant Cairo Marriott 16 Saray El Gezira Street Zamalek Cairo",
      "Saraya Gallery (Cairo Marriott)": "Saraya Gallery Cairo Marriott 16 Saray El Gezira Street Zamalek Cairo",
      "Harry's Pub (Cairo Marriott)": "Harry's Pub Cairo Marriott 16 Saray El Gezira Street Zamalek Cairo",
      "La Patisserie (JW Marriott Hotel Cairo)": "La Patisserie JW Marriott Ring Road Mirage City New Cairo"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Cairo" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "The Pyramids of Giza, Saqqara, Al-Moez Street and the National Museum of Egyptian Civilization, with hotel restaurants, cafés, bakeries and bars checked against their own websites.";
    cityGuide.highlights = ["Pyramids of Giza","National Museum of Egyptian Civilization","Saqqara","Al-Moez Street"];
    cityGuide.tip = "The ministry asks you to arrive at least an hour before closing, and last entry at the Pyramids of Giza and Saqqara is 4:00 pm, so start at the Pyramids when they open at 7:00 am.";
    data.destinationFacts[cityKey] = "The ministry asks you to arrive at least an hour before closing, and last entry at the Pyramids of Giza and Saqqara is 4:00 pm, so start at the Pyramids when they open at 7:00 am.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "The Pyramids of Giza, Saqqara, Al-Moez Street and the National Museum of Egyptian Civilization, with hotel restaurants, cafés, bakeries and bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Open daily",
        "copy": "The ministry portal lists the Pyramids of Giza and Saqqara as open on all days, with shorter Ramadan hours. The National Museum of Egyptian Civilization opens Saturday to Thursday from 9:00 am to 5:00 pm and adds a Friday evening session from 6:00 pm to 9:00 pm."
      },
      {
        "label": "Tickets",
        "value": "Book on egymonuments.com",
        "copy": "The Pyramids of Giza, Saqqara and Al-Moez Street sell dated tickets through the ministry portal, where the Pyramids list EGP 700 for foreign adults. The National Museum of Egyptian Civilization sells its last daytime ticket at 4:00 pm."
      },
      {
        "label": "Walk-ins",
        "value": "Book dinner ahead",
        "copy": "Kempinski Nile Hotel says walk-ins are welcome subject to seating, but advance booking is recommended for dinner at venues such as Osmanly. Khufu's takes reservations separately for breakfast and lunch and for dinner."
      },
      {
        "label": "Rules",
        "value": "Arrive early, dress smart",
        "copy": "At the Pyramids of Giza and Saqqara the ministry asks you to arrive at least an hour before closing. The Rooftop, The Jazz Bar and Osmanly at the Kempinski Nile Hotel list a smart casual dress code."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Do the Pyramids of Giza at opening, keep a Friday evening for the National Museum of Egyptian Civilization, and eat in Zamalek, Garden City or on the Corniche.",
      intro: [
        "The Ministry of Tourism and Antiquities runs Cairo's ancient sites, and its ticket portal lists the Pyramids of Giza as open every day from 7:00 am, with last entry at 4:00 pm and adult tickets for foreign visitors at EGP 700. The ministry asks you to arrive at least an hour before a site closes, so an early start pays off. Saqqara follows a similar pattern, opening daily at 8:00 am with last entry at 4:00 pm, and both sites have shorter hours during Ramadan.",
        "In the city, the National Museum of Egyptian Civilization on Al-Fustat Road, home to the Royal Mummies Gallery, opens Saturday to Thursday from 9:00 am to 5:00 pm, with its last ticket sold at 4:00 pm. On Fridays it adds an evening session from 6:00 pm to 9:00 pm, a useful slot if your days are full. Al-Moez Street, the ticketed historic street in Islamic Cairo, opens daily from 9:00 am with last entry at 4:00 pm.",
        "Near the pyramids, 139 Pavilion at Marriott Mena House, 6 Pyramids Road, is open 24 hours, serving buffet breakfast, lunch and dinner with live music, and hosts a Saturday brunch from 1:00 to 4:00 pm. Alfredo, the hotel's Italian restaurant, opens daily from 4:00 pm to 11:00 pm. Khufu's sits inside the archaeological grounds, reached through the visitor entrance, and takes reservations for breakfast and lunch and for dinner.",
        "In Zamalek, the Cairo Marriott at 16 Saray El Gezira Street lists the Garden Promenade Cafe from 6:00 am to 2:00 am, The Bakery around the clock and Harry's Pub from 6:00 pm to 1:00 am. At the Kempinski Nile Hotel in Garden City, The Rooftop serves from 9:00 am to 2:00 am and Osmanly from 1:00 pm to midnight, both with a smart casual dress code. On the Corniche, the St. Regis lists J&G Steakhouse from 4:30 pm to midnight."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at the Pyramids of Giza when they open at 7:00 am, then lunch at 139 Pavilion at Marriott Mena House, which is open 24 hours."
        ],
        [
          "A slower morning",
          "Have breakfast at the Garden Promenade Cafe in Zamalek, open from 6:00 am, before an unhurried visit to the National Museum of Egyptian Civilization."
        ],
        [
          "Before booking",
          "Book the Pyramids of Giza and Saqqara on the ministry's egymonuments.com portal, and reserve dinner ahead at Kempinski Nile Hotel venues such as Osmanly."
        ]
      ],
      trust: "All 21 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Bologna, Italy: source review of 2026-10-27 (docs/content-research/bologna-2026-10-27.md).
  {
    const cityKey = "Bologna, Italy";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Basilica di San Petronio","Biblioteca dell'Archiginnasio","Basilica di Santo Stefano","Santuario della Madonna di San Luca"],
      bestFirstTimers: ["Basilica di San Petronio","Mercato delle Erbe","Museo della Specola","Biblioteca dell'Archiginnasio"],
      bestRestaurants: ["Trattoria Da Cesari","Ristorante Diana","Ristorante Al Pappagallo","Osteria dell'Orsa"],
      bestBudget: ["Osteria del Sole","Orto Botanico","Biblioteca Salaborsa","Sfoglia Rina (Via Castiglione)"],
      bestLuxury: ["Ristorante I Portici","Café Marinetti (Grand Hotel Majestic già Baglioni)","Teatro Comunale di Bologna","Ristorante Diana"],
      bestCouples: ["Santuario della Madonna di San Luca","Cantina Bentivoglio","Café Marinetti (Grand Hotel Majestic già Baglioni)","Museo della Specola"],
      bestKids: ["Biblioteca Salaborsa","Palazzo Fava","Museo di Palazzo Poggi","Bottega Portici (Piazza di Porta Ravegnana)"],
      bestSolo: ["Galleria Modernissimo","Museo di Palazzo Poggi","Osteria del Sole","Mercato delle Erbe"],
      bestUnique: ["Museo della Specola","Osteria del Sole","Galleria Modernissimo","Biblioteca dell'Archiginnasio"],
      bestBreakfast: ["Pasticceria Impero (Via Caprarie)","Bottega Portici (Piazza di Porta Ravegnana)","Forno Brisa (Via Galliera)"],
      bestLunch: ["Sfoglia Rina (Via Castiglione)","Tamburini (Via Caprarie)","Salumeria Simoni (Via Drapperie)","Mercato delle Erbe"],
      bestDinner: ["Trattoria Da Cesari","Ristorante Al Pappagallo","Ristorante I Portici","Cantina Bentivoglio"],
      bestCocktails: ["Café Marinetti (Grand Hotel Majestic già Baglioni)","Cantina Bentivoglio","Osteria del Sole"],
      bestBakeries: ["Paolo Atti & Figli (Via Caprarie)","Forno Brisa (Via Galliera)","Pasticceria Impero (Via Caprarie)"],
      bestCoffee: ["Pasticceria Impero (Via Caprarie)","Bottega Portici (Piazza di Porta Ravegnana)","Forno Brisa (Via Galliera)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Basilica di San Petronio": "Basilica di San Petronio Piazza Maggiore Bologna",
      "Biblioteca dell'Archiginnasio": "Biblioteca dell'Archiginnasio Piazza Luigi Galvani 1 Bologna",
      "Basilica di Santo Stefano": "Basilica di Santo Stefano Via Santo Stefano 24 Bologna",
      "Santuario della Madonna di San Luca": "Santuario della Madonna di San Luca Via di San Luca 36 Bologna",
      "Mercato delle Erbe": "Mercato delle Erbe Via Ugo Bassi 23 Bologna",
      "Museo della Specola": "Museo della Specola Via Zamboni 33 Bologna",
      "Trattoria Da Cesari": "Trattoria Da Cesari Via de' Carbonesi 8 Bologna",
      "Ristorante Diana": "Ristorante Diana Via Volturno 5 Bologna",
      "Ristorante Al Pappagallo": "Ristorante Al Pappagallo Piazza della Mercanzia 3 Bologna",
      "Osteria dell'Orsa": "Osteria dell'Orsa Via Mentana 1 Bologna",
      "Osteria del Sole": "Osteria del Sole Vicolo dei Ranocchi 1/D Bologna",
      "Orto Botanico": "Orto Botanico Via Irnerio 42 Bologna",
      "Biblioteca Salaborsa": "Biblioteca Salaborsa Piazza del Nettuno 3 Bologna",
      "Sfoglia Rina (Via Castiglione)": "Sfoglia Rina Via Castiglione 5/B Bologna",
      "Ristorante I Portici": "Ristorante I Portici Via dell'Indipendenza 69 Bologna",
      "Café Marinetti (Grand Hotel Majestic già Baglioni)": "Grand Hotel Majestic già Baglioni Via dell'Indipendenza 8 Bologna",
      "Teatro Comunale di Bologna": "Teatro Comunale di Bologna Largo Respighi 1 Bologna",
      "Cantina Bentivoglio": "Cantina Bentivoglio Via Mascarella 4/b Bologna",
      "Palazzo Fava": "Palazzo Fava Via Manzoni 2 Bologna",
      "Museo di Palazzo Poggi": "Museo di Palazzo Poggi Via Zamboni 33 Bologna",
      "Bottega Portici (Piazza di Porta Ravegnana)": "Bottega Portici Piazza di Porta Ravegnana 2 Bologna",
      "Galleria Modernissimo": "Galleria Modernissimo Piazza Re Enzo Bologna",
      "Pasticceria Impero (Via Caprarie)": "Pasticceria Impero Via Caprarie 4/2 Bologna",
      "Forno Brisa (Via Galliera)": "Forno Brisa Via Galliera 34d Bologna",
      "Tamburini (Via Caprarie)": "Tamburini Via Caprarie 1 Bologna",
      "Salumeria Simoni (Via Drapperie)": "Salumeria Simoni Via Drapperie 5/2a Bologna",
      "Paolo Atti & Figli (Via Caprarie)": "Paolo Atti & Figli Via Caprarie 7 Bologna"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Bologna" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Churches, university museums, libraries and markets in central Bologna, with pasta lunches, trattoria dinners, bakeries and bars checked against their own websites.";
    cityGuide.highlights = ["Basilica di San Petronio","Biblioteca dell'Archiginnasio","Basilica di Santo Stefano","Museo della Specola"];
    cityGuide.tip = "Plan museum days around closures: Palazzo Fava and the university museums on Via Zamboni close on Mondays, and Galleria Modernissimo closes on Tuesdays.";
    data.destinationFacts[cityKey] = "Plan museum days around closures: Palazzo Fava and the university museums on Via Zamboni close on Mondays, and Galleria Modernissimo closes on Tuesdays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Churches, university museums, libraries and markets in central Bologna, with pasta lunches, trattoria dinners, bakeries and bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "Palazzo Fava, Museo di Palazzo Poggi, Museo della Specola and the Orto Botanico close on Mondays (non-holiday Mondays for the university sites), and Santo Stefano suspends tourist visits on Mondays. Galleria Modernissimo is closed on Tuesdays and Ristorante Al Pappagallo closes on Tuesdays."
      },
      {
        "label": "Tickets and booking",
        "value": "Book the Specola",
        "copy": "Museo della Specola admits up to 15 visitors at the start of each hour and strongly recommends booking. Trattoria Da Cesari takes bookings by phone, and Café Marinetti's aperitif must be booked by email."
      },
      {
        "label": "Walk-ins",
        "value": "No reservations",
        "copy": "Osteria dell'Orsa does not accept reservations, and Sfoglia Rina's restaurant on Via Castiglione takes no bookings either. At Osteria del Sole you can bring your own food, and it serves only wine and beer."
      },
      {
        "label": "Rules",
        "value": "Cover up, no luggage",
        "copy": "Basilica di San Petronio requires shoulders and knees covered, asks you to remove hats, and does not allow suitcases or luggage. Its panoramic terrace is permanently closed."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Base yourself between Piazza Maggiore and Via Zamboni, and check each sight's closing day before you plan museums and dinners.",
      intro: [
        "You can see much of central Bologna on foot from Piazza Maggiore. The Basilica di San Petronio opens daily from 10:00 to 18:00, and its museum is free, while the Chapel of the Magi route costs €5. Dress rules apply: cover your shoulders and knees, and leave suitcases behind. The basilica's panoramic terrace is permanently closed. A short walk away, the Biblioteca dell'Archiginnasio on Piazza Luigi Galvani runs talks and book presentations, though its reading room is temporarily closed.",
        "For views and science, head to Via Zamboni 33. The Museo della Specola lets in up to 15 visitors at the start of each hour, and the terrace stays shut in rain or snow, so book ahead. In the same building, the Museo di Palazzo Poggi shows 'Utagawa Kuniyoshi (1798-1861)' until 20 June 2027. Both close on non-holiday Mondays. The nearby Orto Botanico on Via Irnerio is free, opens 9:00 to 15:00 in winter, and has some areas closed by renovation works.",
        "Exhibitions run well into winter. At Palazzo Fava on Via Manzoni, 'Magnus. Eroi e no' runs from 7 November 2026 to 10 January 2027, with family workshops on Saturdays. Galleria Modernissimo, beneath Piazza Re Enzo, shows 'VIVA VARDA! Il cinema è donna' until 10 January 2027 and closes on Tuesdays. The Basilica di Santo Stefano opens for tourist visits from Tuesday to Sunday. Above the city, the Santuario della Madonna di San Luca opens daily from 7:00 to 18:00.",
        "For food, Trattoria Da Cesari on Via de' Carbonesi serves tagliatelle alla Bolognese and tortellini in brodo and closes on Sundays. Ristorante Diana on Via Volturno closes on Sunday evenings and Mondays. Osteria dell'Orsa and Sfoglia Rina take no reservations, so plan on walking in. For bread and pastries, try Paolo Atti & Figli on Via Caprarie, then have an evening glass at Osteria del Sole, where you can bring your own food."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at the Basilica di San Petronio, walk to the Archiginnasio, and finish with tortellini at Trattoria Da Cesari."
        ],
        [
          "A slower morning",
          "Have breakfast at Pasticceria Impero on Via Caprarie, then visit the free Orto Botanico from Tuesday to Sunday."
        ],
        [
          "Before booking",
          "Book the Museo della Specola and phone Da Cesari ahead, but expect to walk in at Osteria dell'Orsa and Sfoglia Rina."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Verona, Italy: source review of 2026-10-27 (docs/content-research/verona-2026-10-27.md).
  {
    const cityKey = "Verona, Italy";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Arena di Verona","Torre dei Lamberti","Basilica di San Zeno","Giardino Giusti"],
      bestFirstTimers: ["Arena di Verona","Complesso della Cattedrale (Duomo)","Basilica di Santa Anastasia","Palazzo Maffei Casa Museo"],
      bestRestaurants: ["Antica Bottega del Vino","Trattoria I Masenini","Il Desco","Trattoria Al Pompiere"],
      bestBudget: ["Trattoria Al Bersagliere","Funicolare di Castel San Pietro","Chiesa di San Fermo","De Rossi (Corso Porta Borsari)"],
      bestLuxury: ["Casa Perbellini","Il Desco","Antica Bottega del Vino"],
      bestCouples: ["Terrazza Bar al Ponte","Giardino Giusti","Funicolare di Castel San Pietro","Romeo Cocktail Bar"],
      bestKids: ["Giardino Giusti","Funicolare di Castel San Pietro","Torre dei Lamberti","Museo Miniscalchi-Erizzo"],
      bestSolo: ["Museo Miniscalchi-Erizzo","Palazzo Maffei Casa Museo","Caffè Coloniale","Signorvino (Corso Porta Nuova)"],
      bestUnique: ["Museo Miniscalchi-Erizzo","Funicolare di Castel San Pietro","Torre dei Lamberti","Pescheria I Masenini"],
      bestBreakfast: ["Caffè Coloniale","De Rossi (Corso Porta Borsari)","Flego (Corso Porta Borsari)"],
      bestLunch: ["Ristorante Maffei","Trattoria Al Bersagliere","Trattoria I Masenini","Locanda 4 Cuochi"],
      bestDinner: ["Pescheria I Masenini","Locanda 4 Cuochi","Trattoria Al Pompiere","Ristorante Maffei"],
      bestCocktails: ["Romeo Cocktail Bar","Terrazza Bar al Ponte","Signorvino (Corso Porta Nuova)"],
      bestBakeries: ["Flego (Corso Porta Borsari)","De Rossi (Corso Porta Borsari)"],
      bestCoffee: ["Caffè Coloniale","Romeo Cocktail Bar"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Arena di Verona": "Arena di Verona Piazza Bra Verona",
      "Torre dei Lamberti": "Torre dei Lamberti Via della Costa 2 Verona",
      "Basilica di San Zeno": "Basilica di San Zeno Piazza San Zeno Verona",
      "Giardino Giusti": "Giardino Giusti Via Giardino Giusti 2 Verona",
      "Complesso della Cattedrale (Duomo)": "Duomo di Verona Piazza Duomo Verona",
      "Basilica di Santa Anastasia": "Basilica di Santa Anastasia Piazza Santa Anastasia Verona",
      "Palazzo Maffei Casa Museo": "Palazzo Maffei Piazza Erbe 38 Verona",
      "Antica Bottega del Vino": "Antica Bottega del Vino Vicolo Scudo di Francia 3 Verona",
      "Trattoria I Masenini": "Trattoria I Masenini Via Roma 34 Verona",
      "Il Desco": "Il Desco Via Dietro San Sebastiano 5 Verona",
      "Trattoria Al Pompiere": "Trattoria Al Pompiere Vicolo Regina d'Ungheria 5 Verona",
      "Trattoria Al Bersagliere": "Trattoria Al Bersagliere Via Dietro Pallone 1 Verona",
      "Funicolare di Castel San Pietro": "Funicolare Castel San Pietro Via Fontanelle Santo Stefano 6 Verona",
      "Chiesa di San Fermo": "Chiesa di San Fermo Stradone San Fermo Verona",
      "De Rossi (Corso Porta Borsari)": "Pasticceria De Rossi Corso Porta Borsari 3 Verona",
      "Casa Perbellini": "Casa Perbellini Vicolo Corticella San Marco 3 Verona",
      "Terrazza Bar al Ponte": "Terrazza Bar al Ponte Via Ponte Pietra 26 Verona",
      "Romeo Cocktail Bar": "Romeo Cocktail Bar Via San Marco in Foro 1b Verona",
      "Museo Miniscalchi-Erizzo": "Museo Miniscalchi-Erizzo Via San Mammaso 2a Verona",
      "Caffè Coloniale": "Caffe Coloniale Piazza Viviani 14C Verona",
      "Signorvino (Corso Porta Nuova)": "Signorvino Corso Porta Nuova 2a Verona",
      "Pescheria I Masenini": "Pescheria I Masenini Piazzetta Pescheria 9 Verona",
      "Flego (Corso Porta Borsari)": "Pasticceria Flego Corso Porta Borsari 9 Verona",
      "Ristorante Maffei": "Ristorante Maffei Piazza Erbe 38 Verona",
      "Locanda 4 Cuochi": "Locanda 4 Cuochi Via Alberto Mario 12 Verona"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Verona" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Roman and medieval landmarks, churches, house museums, a garden and a funicular, with breakfast cafés, bakeries, trattorias, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Arena di Verona","Basilica di San Zeno","Torre dei Lamberti","Giardino Giusti"];
    cityGuide.tip = "Palazzo Maffei Casa Museo closes on Tuesdays and the Museo Miniscalchi-Erizzo opens only Friday to Monday, so save midweek for the churches, which open daily.";
    data.destinationFacts[cityKey] = "Palazzo Maffei Casa Museo closes on Tuesdays and the Museo Miniscalchi-Erizzo opens only Friday to Monday, so save midweek for the churches, which open daily.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Roman and medieval landmarks, churches, house museums, a garden and a funicular, with breakfast cafés, bakeries, trattorias, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Tuesdays, and Sun-Mon for dining",
        "copy": "Palazzo Maffei Casa Museo closes on Tuesdays and the Museo Miniscalchi-Erizzo closes Tuesday to Thursday. Il Desco and Casa Perbellini close on Sundays and Mondays, and Pescheria I Masenini closes Sunday evening and all day Monday."
      },
      {
        "label": "Tickets",
        "value": "€8 four-church route",
        "copy": "The Fondazione Chiese Vive four-church route covers San Zeno, the Duomo, Santa Anastasia and San Fermo for €8 and stays valid for 90 days; a single church costs €4. Palazzo Maffei sells tickets online and at its box office."
      },
      {
        "label": "Booking",
        "value": "Book trattorias ahead",
        "copy": "Trattoria Al Pompiere confirms email bookings made at least 24 hours ahead and takes shorter-notice bookings by phone only. Ristorante Maffei says booking is always recommended but not required, and the churches need no reservation."
      },
      {
        "label": "Rules",
        "value": "Arena: 17-litre bag limit",
        "copy": "At the Arena di Verona, bags over 17 litres, glass and outside food are not allowed, and smart casual dress is requested. Children under 14 must be with an adult, and children under 4 may sit only in the Family sector."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Plan museum days around Tuesday closures and book Verona's trattorias a day ahead, especially early in the week.",
      intro: [
        "Verona's headline sights are easy to plan once you know their weekly rhythms. The Arena di Verona stands on Piazza Bra, and Fondazione Arena di Verona has already published its next Opera Festival, running from 11 June to 11 September 2027. Its spectator rules ask you to arrive at least an hour before curtain, leave bags over 17 litres behind and wear smart casual dress. Close by, Torre dei Lamberti on Via della Costa opens every day except 25 December, and you can climb its 289 steps or take the glass lift.",
        "Four historic churches run by Fondazione Chiese Vive share one ticketing system: the Basilica di San Zeno, the Complesso della Cattedrale (Duomo), the Basilica di Santa Anastasia and the Chiesa di San Fermo. From 1 November 2026 to 28 February 2027 they open on weekdays from 10:00 to 17:00, and Sunday visits start at 13:00 or 13:30. A single church costs €4, while the four-church route costs €8 and stays valid for 90 days. You don't need to book, but note that San Fermo has steep steps and no wheelchair access.",
        "For smaller collections, Palazzo Maffei Casa Museo on Piazza Erbe opens daily from 10:00 to 18:00 except Tuesdays, with guided tours on Saturdays and Sundays at 10:30, 11:30 and 15:30. The Museo Miniscalchi-Erizzo on Via San Mammaso opens only Friday to Monday, charges €8 and lets children up to 11 in free. Giardino Giusti is open all year except 25 December, from 10:00 to 18:00 in winter, and the funicular on Via Fontanelle Santo Stefano climbs toward Castel San Pietro every day from 10:00, closing at 17:00 in winter.",
        "Many restaurants close early in the week, so check before you plan dinner. Il Desco on Via Dietro San Sebastiano closes on Sundays and Mondays, Casa Perbellini also closes Saturday evenings, and Trattoria Al Bersagliere lists hours only from Tuesday to Saturday. Trattoria Al Pompiere takes email bookings at least 24 hours ahead and phone bookings for anything sooner. Ristorante Maffei on Piazza Erbe serves from 12:00 to 22:30 daily. For drinks, Romeo Cocktail Bar's cocktail bar opens at 19:00, and Terrazza Bar al Ponte by Ponte Pietra stays open from 09:00 to 02:00."
      ],
      summaryCards: [
        [
          "First visit",
          "See the Arena di Verona on Piazza Bra, climb Torre dei Lamberti, then use the €8 four-church route for San Zeno, the Duomo, Santa Anastasia and San Fermo."
        ],
        [
          "A slower morning",
          "Start with a savory breakfast at Caffè Coloniale, then walk Giardino Giusti, open all year except 25 December."
        ],
        [
          "Before booking",
          "Check closing days, since Il Desco and Casa Perbellini close on Sundays and Mondays and Trattoria Al Pompiere wants email bookings at least 24 hours ahead."
        ]
      ],
      trust: "All 25 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Nice, France: source review of 2026-10-27 (docs/content-research/nice-2026-10-27.md).
  {
    const cityKey = "Nice, France";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Musée Matisse","Musée national Marc Chagall","Parc de la Colline du Château","Cathédrale Saint-Nicolas"],
      bestFirstTimers: ["Parc de la Colline du Château","Musée Matisse","Palais Lascaris","Promenade du Paillon"],
      bestRestaurants: ["Jan","Café de Turin","La Rossettisserie","Chez Pipo"],
      bestBudget: ["Chez Pipo","Palais Lascaris","Musée d'Archéologie de Nice-Cimiez","Jardin du Monastère de Cimiez"],
      bestLuxury: ["Jan","Villa Ephrussi de Rothschild","Le Patio (Hôtel La Pérouse)","Opéra de Nice"],
      bestCouples: ["Villa Ephrussi de Rothschild","Opéra de Nice","Jan","Jardin du Monastère de Cimiez"],
      bestKids: ["Parc Phoenix","Muséum d'Histoire naturelle de Nice","Promenade du Paillon","Confiserie Florian (Vieux Nice)"],
      bestSolo: ["Musée de la Photographie Charles Nègre","Musée des Beaux-Arts Jules Chéret","Musée Masséna","Parc de la Colline du Château"],
      bestUnique: ["Cathédrale Saint-Nicolas","Musée International d'Art Naïf Anatole Jakovsky","Confiserie Florian (Vieux Nice)","Musée d'Archéologie de Nice-Cimiez"],
      bestBreakfast: ["L'Horloge (Hôtel Aston La Scala)"],
      bestLunch: ["Chez Pipo","Café de Turin","La Rossettisserie","Villa Ephrussi de Rothschild"],
      bestDinner: ["Jan","La Rossettisserie","Café de Turin","L'Horloge (Hôtel Aston La Scala)"],
      bestCocktails: ["L'Aston Club (Hôtel Aston La Scala)","Les Folies d'Edmonde","Le Patio (Hôtel La Pérouse)"],
      bestBakeries: ["Maison Auer","Confiserie Florian (Vieux Nice)"],
      bestCoffee: ["L'Horloge (Hôtel Aston La Scala)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Musée Matisse": "Musée Matisse 164 avenue des Arènes de Cimiez Nice",
      "Musée national Marc Chagall": "Musée national Marc Chagall Avenue du Docteur Ménard Nice",
      "Parc de la Colline du Château": "Parc de la Colline du Château Montée Monfort Nice",
      "Cathédrale Saint-Nicolas": "Cathédrale Saint-Nicolas Avenue Nicolas II Nice",
      "Palais Lascaris": "Palais Lascaris 15 rue Droite Nice",
      "Promenade du Paillon": "Promenade du Paillon avenue Félix Faure Nice",
      "Jan": "Jan 12 Rue Lascaris Nice",
      "Café de Turin": "Café de Turin 5 place Garibaldi Nice",
      "La Rossettisserie": "La Rossettisserie 8 Rue Mascoïnat Nice",
      "Chez Pipo": "Chez Pipo 13 rue Bavastro Nice",
      "Musée d'Archéologie de Nice-Cimiez": "Musée d'Archéologie 160 avenue des Arènes de Cimiez Nice",
      "Jardin du Monastère de Cimiez": "Jardin du Monastère de Cimiez 1 avenue Bellanda Nice",
      "Villa Ephrussi de Rothschild": "Villa Ephrussi de Rothschild 1 Avenue Ephrussi de Rothschild Saint-Jean-Cap-Ferrat",
      "Le Patio (Hôtel La Pérouse)": "Hôtel La Pérouse 11 Quai Rauba Capeu Nice",
      "Opéra de Nice": "Opéra de Nice 4-6 rue Saint François de Paule Nice",
      "Parc Phoenix": "Parc Phoenix 405 promenade des Anglais Nice",
      "Muséum d'Histoire naturelle de Nice": "Muséum d'Histoire naturelle 60 bis boulevard Risso Nice",
      "Confiserie Florian (Vieux Nice)": "Confiserie Florian 14 Quai Papacino Nice",
      "Musée de la Photographie Charles Nègre": "Musée de la Photographie Charles Nègre 1 place Pierre Gautier Nice",
      "Musée des Beaux-Arts Jules Chéret": "Musée des Beaux-Arts Jules Chéret 33 avenue des Baumettes Nice",
      "Musée Masséna": "Musée Masséna 65 rue de France Nice",
      "Musée International d'Art Naïf Anatole Jakovsky": "Musée International d'Art Naïf 23 avenue de Fabron Nice",
      "L'Horloge (Hôtel Aston La Scala)": "Hôtel Aston La Scala 12 avenue Félix Faure Nice",
      "L'Aston Club (Hôtel Aston La Scala)": "Hôtel Aston La Scala 12 avenue Félix Faure Nice",
      "Les Folies d'Edmonde": "Les Folies d'Edmonde 16 rue Benoît Bunico Nice",
      "Maison Auer": "Maison Auer 7 Rue Saint-François de Paule Nice"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Nice" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "City museums, parks, the Russian cathedral and the opera, with socca, dinner tables, hotel bars and confectioners checked against their own websites.";
    cityGuide.highlights = ["Musée Matisse","Musée national Marc Chagall","Parc de la Colline du Château","Cathédrale Saint-Nicolas"];
    cityGuide.tip = "Plan museum days around closures: the Matisse, Chagall, Masséna, Lascaris and Archaeology museums close on Tuesdays, while the Beaux-Arts, Photography and Natural History museums close on Mondays.";
    data.destinationFacts[cityKey] = "Plan museum days around closures: the Matisse, Chagall, Masséna, Lascaris and Archaeology museums close on Tuesdays, while the Beaux-Arts, Photography and Natural History museums close on Mondays.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "City museums, parks, the Russian cathedral and the opera, with socca, dinner tables, hotel bars and confectioners checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Tuesday or Monday",
        "copy": "Musée Matisse, Musée national Marc Chagall, Musée Masséna and Palais Lascaris are closed on Tuesdays. Musée des Beaux-Arts Jules Chéret, the Photography museum and the Muséum d'Histoire naturelle close on Mondays instead."
      },
      {
        "label": "Tickets",
        "value": "City pass 15 €",
        "copy": "The city's Pass 10 Musées costs 15 € for four days, with single entry at 10 € for Matisse, Masséna and Beaux-Arts and 5 € for Lascaris. Entry to the Musée national Marc Chagall is free for everyone on the first Sunday of the month."
      },
      {
        "label": "Walk-in or book",
        "value": "Varies by table",
        "copy": "Chez Pipo serves without reservation, Wednesday to Sunday. Jan takes bookings only through its website, requires a deposit and asks you to confirm 48 hours ahead."
      },
      {
        "label": "Rules",
        "value": "Dress and timing",
        "copy": "Jan's dress code is \"Chic / Elegant\" and dogs are not allowed. Cathédrale Saint-Nicolas is closed to tourists on Sundays from 9:00 to 12:00."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Group the Cimiez museums on one morning, avoid Tuesdays for most museums, and book Jan well ahead.",
      intro: [
        "Nice's city-run museums publish their hours and current exhibitions on nice.fr, so you can plan around them. Up in Cimiez, the Musée Matisse at 164 avenue des Arènes de Cimiez opens \"Henri Matisse – Alex Katz\" on 28 October 2026, running to 18 January 2027. The Archaeology museum next door hosts \"Mémoires des ruines\" by Anne et Patrick Poirier, a MAMAC exhibition with free entry, from 7 November 2026 to 5 September 2027. Both are closed on Tuesdays, and from 1 November they close at 17:00.",
        "Down the hill, the Musée national Marc Chagall on avenue du Docteur Ménard is also closed on Tuesdays. From 1 November 2026 it opens 10:00 to 17:00 with a break from 13:00 to 14:30, though the garden and bookshop stay open during the pause. In the old town, Palais Lascaris on rue Droite has \"Merveilles et curiosités du Palais Lascaris\" until 11 January 2027. The Photography museum on place Pierre Gautier shows Sabine Weiss until 31 January 2027, and Musée Masséna's \"Nice, ma ville, mes jardins\" runs until 28 February 2027.",
        "For open air, the Parc de la Colline du Château on Montée Monfort opens daily from 08:30, closing at 18:00 from 1 November. The Promenade du Paillon opens 07:00 to 21:00 in winter, and the Jardin du Monastère de Cimiez keeps the same 08:30 start as the castle hill. Parc Phoenix, on the Promenade des Anglais, opens daily and stops ticket sales an hour before closing. The Cathédrale Saint-Nicolas welcomes visitors daily but is closed to tourists on Sunday mornings until noon.",
        "For food, Chez Pipo on rue Bavastro serves without reservation from Wednesday to Sunday, while Jan on rue Lascaris seats one dinner service five nights a week, with booking and a deposit required. Café de Turin on place Garibaldi serves every day from noon. Hôtel Aston La Scala's L'Horloge serves breakfast from 7:30, and its Aston Club bar opens year-round from 17:00. Les Folies d'Edmonde pours cocktails nightly from 18:00. At the Opéra de Nice, \"La Veuve joyeuse\" plays 11–13 November."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Parc de la Colline du Château with Palais Lascaris and the Photography museum in the old town, avoiding Tuesday for Lascaris."
        ],
        [
          "A slower morning",
          "Take breakfast at L'Horloge from 7:30, then head up to Cimiez for the Musée Matisse and the Jardin du Monastère."
        ],
        [
          "Before booking",
          "Jan needs an online booking with a deposit and confirmation 48 hours ahead, while Chez Pipo takes no reservations."
        ]
      ],
      trust: "All 26 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Marseille, France: source review of 2026-10-27 (docs/content-research/marseille-2026-10-27.md).
  {
    const cityKey = "Marseille, France";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Mucem","Château d'If","Cosquer Méditerranée","Centre de la Vieille Charité"],
      bestFirstTimers: ["Mucem","Château d'If","Centre de la Vieille Charité","Le Miramar"],
      bestRestaurants: ["Chez Fonfon","Le Miramar","Sépia","Les Grandes Tables"],
      bestBudget: ["Le Café du Fort (Mucem)","Les Grandes Tables","Frac Sud","Torréfaction Noailles (Canebière)"],
      bestLuxury: ["Le Petit Nice Passedat","AM par Alexandre Mazzia","Dantès Skylounge (Sofitel Marseille Vieux-Port)","Capian (InterContinental Marseille Hôtel-Dieu)"],
      bestCouples: ["Chez Fonfon","Le Petit Nice Passedat","Dantès Skylounge (Sofitel Marseille Vieux-Port)","Château d'If"],
      bestKids: ["Muséum d'histoire naturelle de Marseille","Cosquer Méditerranée","Château d'If","Mama Shelter Marseille"],
      bestSolo: ["Musée Cantini","mac (Musée d'art contemporain)","La Friche la Belle de Mai","Frac Sud"],
      bestUnique: ["La Friche la Belle de Mai","Cosquer Méditerranée","Château Borély","Le Four des Navettes"],
      bestBreakfast: ["Mama Shelter Marseille","Le Café du Fort (Mucem)"],
      bestLunch: ["Les Grandes Tables","Sépia","Le Miramar","Chez Fonfon"],
      bestDinner: ["Le Miramar","Chez Fonfon","AM par Alexandre Mazzia","Le Petit Nice Passedat"],
      bestCocktails: ["Capian (InterContinental Marseille Hôtel-Dieu)","Dantès Skylounge (Sofitel Marseille Vieux-Port)","Julis"],
      bestBakeries: ["Le Four des Navettes","La Pâtisserie des Marseillais"],
      bestCoffee: ["Torréfaction Noailles (Canebière)","Le Café du Fort (Mucem)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Mucem": "Mucem Fort Saint-Jean Vieux-Port Marseille",
      "Château d'If": "Château d'If Île d'If Marseille",
      "Cosquer Méditerranée": "Cosquer Méditerranée Esplanade du J4 Marseille",
      "Centre de la Vieille Charité": "Centre de la Vieille Charité 2 rue de la Charité Marseille",
      "Le Miramar": "Le Miramar 12 quai du Port Marseille",
      "Chez Fonfon": "Chez Fonfon 140 rue du Vallon des Auffes Marseille",
      "Sépia": "Sépia 2 rue Vauvenargues Marseille",
      "Les Grandes Tables": "Les Grandes Tables 41 rue Jobin Marseille",
      "Le Café du Fort (Mucem)": "Le Café du Fort Fort Saint-Jean Mucem Marseille",
      "Frac Sud": "Frac Sud 20 boulevard de Dunkerque Marseille",
      "Torréfaction Noailles (Canebière)": "Torréfaction Noailles 56 La Canebière Marseille",
      "Le Petit Nice Passedat": "Le Petit Nice Passedat Anse de Maldormé Corniche Kennedy Marseille",
      "AM par Alexandre Mazzia": "AM par Alexandre Mazzia 9 rue François Rocca Marseille",
      "Dantès Skylounge (Sofitel Marseille Vieux-Port)": "Sofitel Marseille Vieux-Port 36 boulevard Charles Livon Marseille",
      "Capian (InterContinental Marseille Hôtel-Dieu)": "InterContinental Marseille Hôtel-Dieu 1 Place Daviel Marseille",
      "Muséum d'histoire naturelle de Marseille": "Muséum d'histoire naturelle Palais Longchamp Boulevard Philippon Marseille",
      "Mama Shelter Marseille": "Mama Shelter 64 rue de la Loubière Marseille",
      "Musée Cantini": "Musée Cantini 19 rue Grignan Marseille",
      "mac (Musée d'art contemporain)": "Musée d'art contemporain 69 avenue de Haïfa Marseille",
      "La Friche la Belle de Mai": "La Friche la Belle de Mai 41 rue Jobin Marseille",
      "Château Borély": "Château Borély 132 avenue Clot Bey Marseille",
      "Le Four des Navettes": "Le Four des Navettes 136 rue Sainte Marseille",
      "Julis": "Julis 2 rue Vauvenargues Marseille",
      "La Pâtisserie des Marseillais": "La Pâtisserie des Marseillais 28 Grand Rue Marseille"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Marseille" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Harbour museums, island fortress, city museums and bouillabaisse tables, with breakfast, bakeries, coffee and hotel bars checked against their own websites.";
    cityGuide.highlights = ["Mucem","Château d'If","Cosquer Méditerranée","Centre de la Vieille Charité"];
    cityGuide.tip = "Plan around closing days: the Mucem closes on Tuesdays, the city museums open Tuesday to Sunday only, and from 28 September to 31 March the Château d'If closes on Mondays and does not open in bad weather.";
    data.destinationFacts[cityKey] = "Plan around closing days: the Mucem closes on Tuesdays, the city museums open Tuesday to Sunday only, and from 28 September to 31 March the Château d'If closes on Mondays and does not open in bad weather.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Harbour museums, island fortress, city museums and bouillabaisse tables, with breakfast, bakeries, coffee and hotel bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon / Tue",
        "copy": "The Mucem and its Café du Fort close on Tuesdays, while the Vieille Charité, Musée Cantini, mac and other city museums open Tuesday to Sunday. In winter the Château d'If also closes on Mondays."
      },
      {
        "label": "Tickets",
        "value": "One Mucem ticket",
        "copy": "A same-day Mucem ticket, 11 euros full rate, covers every exhibition in J4 and Fort Saint-Jean, and the outdoor areas are free. Château d'If entry is 7 euros, with the boat crossing sold separately."
      },
      {
        "label": "Booking",
        "value": "Book ahead",
        "copy": "Le Miramar, Chez Fonfon, Sépia and AM par Alexandre Mazzia all take bookings through their own sites, and AM serves only Wednesday to Saturday. At Cosquer Méditerranée the last visit slot is an hour and a half before closing."
      },
      {
        "label": "Rules",
        "value": "Ages and weather",
        "copy": "Children under 3 cannot take the cave tour at Cosquer Méditerranée, though the auditorium and gallery are open to them. The Château d'If does not open in bad weather."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Put the Mucem and the Château d'If on separate days, and check closing days before you book a table.",
      intro: [
        "Marseille's harbour front is anchored by the Mucem, which you visit across two sites, the J4 building and Fort Saint-Jean. Both open 10:00 to 19:00 in May, June, September and October, 10:00 to 20:00 in July and August and 10:00 to 18:00 from November to April, and both close on Tuesdays. One same-day ticket, 11 euros at full rate, covers every exhibition, while the outdoor areas are free. A new exhibition, The Taste of images, opens on 28 October 2026. Next door on the J4 Esplanade, Cosquer Méditerranée opens every day, with its last visit slot an hour and a half before closing.",
        "The city museums open Tuesday to Sunday, 9:00 to 18:00. At the Centre de la Vieille Charité in Le Panier, Adrien Vescovi's Dormir comme le soleil runs until 10 January 2027, and Louisa Babari's Voix Publiques is spread across the Vieille Charité, the mac and the Musée Cantini until 3 January 2027. In the Palais Longchamp, the Muséum d'histoire naturelle shows Dinosaures de Provence until 20 June 2027 and pauses from 12:30 to 13:30, while the Musée des Beaux-Arts fills the opposite wing. The Musée d'Histoire de Marseille is closed until further notice.",
        "For the water, boats to the Château d'If leave from the Vieux-Port at the lower end of the Canebière. Entry is 7 euros, and the crossing is paid separately. From 28 September to 31 March the château opens 10:00 to 17:15 and closes on Mondays, and it does not open in bad weather. Inland, La Friche la Belle de Mai at 41 rue Jobin hosts the Biennale des Imaginaires Numériques until 13 December 2026, and its restaurant, Les Grandes Tables, serves lunch Monday to Saturday. Frac Sud on boulevard de Dunkerque opens Wednesday to Sunday afternoons.",
        "For bouillabaisse, Le Miramar on the quai du Port serves Tuesday to Sunday, and Chez Fonfon in the Vallon des Auffes opens every day and says its fish are caught daily by its own pointus. AM par Alexandre Mazzia serves Wednesday to Saturday only. For mornings, Mama Shelter on rue de la Loubière serves breakfast daily from 7:00 to 11:00 and a Sunday brunch from 11:30 to 15:30. La Pâtisserie des Marseillais on Grand Rue closes on Mondays, and Le Four des Navettes on rue Sainte sells its navettes as a Marseille tradition dating from 1781."
      ],
      summaryCards: [
        [
          "First visit",
          "Start with the Mucem and Fort Saint-Jean on any day but Tuesday, then take a boat from the Vieux-Port to the Château d'If."
        ],
        [
          "A slower morning",
          "Have breakfast at Mama Shelter, served daily from 7:00 to 11:00, then pick up navettes at Le Four des Navettes on rue Sainte."
        ],
        [
          "Before booking",
          "Check closing days: AM par Alexandre Mazzia serves Wednesday to Saturday, Sépia is closed at weekends and Le Miramar serves Tuesday to Sunday."
        ]
      ],
      trust: "All 24 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Bordeaux, France: source review of 2026-10-27 (docs/content-research/bordeaux-2026-10-27.md).
  {
    const cityKey = "Bordeaux, France";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Musée d'Aquitaine","Grand-Théâtre (Opéra National de Bordeaux)","Bassins des Lumières","CAPC musée d'art contemporain"],
      bestFirstTimers: ["Musée d'Aquitaine","Grand-Théâtre (Opéra National de Bordeaux)","Miroir d'eau","Marché des Capucins"],
      bestRestaurants: ["Le Chapon Fin","La Tupina","Brasserie Bordelaise","L'Entrecôte (Bordeaux)"],
      bestBudget: ["Jardin Public","Frac Nouvelle-Aquitaine MÉCA","Marché des Capucins","Jardin botanique de la Bastide"],
      bestLuxury: ["Le Pressoir d'Argent Gordon Ramsay","Le Chapon Fin","Le Rooftop (InterContinental Bordeaux)"],
      bestCouples: ["Le Rooftop (InterContinental Bordeaux)","Symbiose","Jardin Public","Bar à Vin (Maison du Vin de Bordeaux)"],
      bestKids: ["Cap Sciences","Muséum de Bordeaux - sciences et nature","Bassins des Lumières","Jardin Public"],
      bestSolo: ["CAPC musée d'art contemporain","MusBA - Musée des Beaux-Arts de Bordeaux","MADD - Musée des Arts décoratifs et du Design","La Pelle Café"],
      bestUnique: ["Bassins des Lumières","Musée Mer Marine","Frac Nouvelle-Aquitaine MÉCA","Miroir d'eau"],
      bestBreakfast: ["Marché des Capucins","Mama Shelter Bordeaux","Sauvages Café","La Toque Cuivrée (Sainte-Catherine)"],
      bestLunch: ["La Tupina","Brasserie Bordelaise","L'Entrecôte (Bordeaux)","Marché des Capucins"],
      bestDinner: ["Le Chapon Fin","La Tupina","Le Pressoir d'Argent Gordon Ramsay","Mama Shelter Bordeaux"],
      bestCocktails: ["Symbiose","Le Rooftop (InterContinental Bordeaux)","Mama Shelter Bordeaux","Bar à Vin (Maison du Vin de Bordeaux)"],
      bestBakeries: ["Baillardran (Bar à Canelés, rue Sainte-Catherine)","La Toque Cuivrée (Sainte-Catherine)"],
      bestCoffee: ["La Pelle Café","Sauvages Café"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Musée d'Aquitaine": "Musée d'Aquitaine 20 cours Pasteur Bordeaux",
      "Grand-Théâtre (Opéra National de Bordeaux)": "Grand-Théâtre Place de la Comédie Bordeaux",
      "Bassins des Lumières": "Bassins des Lumières Impasse Brown de Colstoun Bordeaux",
      "CAPC musée d'art contemporain": "CAPC musée d'art contemporain 7 rue Ferrère Bordeaux",
      "Miroir d'eau": "Miroir d'eau Place de la Bourse Bordeaux",
      "Marché des Capucins": "Marché des Capucins Place des Capucins Bordeaux",
      "Le Chapon Fin": "Le Chapon Fin 5 rue Montesquieu Bordeaux",
      "La Tupina": "La Tupina 6 rue Porte de la Monnaie Bordeaux",
      "Brasserie Bordelaise": "Brasserie Bordelaise 50 rue Saint-Rémi Bordeaux",
      "L'Entrecôte (Bordeaux)": "L'Entrecôte 4 Cours du 30 Juillet Bordeaux",
      "Jardin Public": "Jardin Public Cours de Verdun Bordeaux",
      "Frac Nouvelle-Aquitaine MÉCA": "Frac Nouvelle-Aquitaine MÉCA 5 Parvis Corto Maltese Bordeaux",
      "Jardin botanique de la Bastide": "Jardin botanique Esplanade Linné Bordeaux",
      "Le Pressoir d'Argent Gordon Ramsay": "Le Pressoir d'Argent 2 Place de la Comédie Bordeaux",
      "Le Rooftop (InterContinental Bordeaux)": "InterContinental Le Rooftop 2 Place de la Comédie Bordeaux",
      "Symbiose": "Symbiose 4 Quai des Chartrons Bordeaux",
      "Bar à Vin (Maison du Vin de Bordeaux)": "Bar à Vin 3 cours du XXX Juillet Bordeaux",
      "Cap Sciences": "Cap Sciences Hangar 20 Quai de Bacalan Bordeaux",
      "Muséum de Bordeaux - sciences et nature": "Muséum de Bordeaux 5 place Bardineau Bordeaux",
      "MusBA - Musée des Beaux-Arts de Bordeaux": "Musée des Beaux-Arts 20 cours d'Albret Bordeaux",
      "MADD - Musée des Arts décoratifs et du Design": "MADD 39 rue Bouffard Bordeaux",
      "La Pelle Café": "La Pelle Café 29 rue Notre-Dame Bordeaux",
      "Musée Mer Marine": "Musée Mer Marine 89 rue des Étrangers Bordeaux",
      "Mama Shelter Bordeaux": "Mama Shelter 19 rue Poquelin Molière Bordeaux",
      "Sauvages Café": "Sauvages Café 7 rue des Frères Bonie Bordeaux",
      "La Toque Cuivrée (Sainte-Catherine)": "La Toque Cuivrée 5 rue Sainte-Catherine Bordeaux",
      "Baillardran (Bar à Canelés, rue Sainte-Catherine)": "Baillardran 76 rue Sainte-Catherine Bordeaux"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Bordeaux" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Museums, riverside sights, gardens and a morning market, with canelé shops, coffee, dinners and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Musée d'Aquitaine","CAPC musée d'art contemporain","Bassins des Lumières","Grand-Théâtre (Opéra National de Bordeaux)"];
    cityGuide.tip = "Museum closing days differ: the MusBA closes on Tuesdays, while the Musée d'Aquitaine, Musée Mer Marine and Muséum close on Mondays, so put the MusBA on a Monday and the others later in the week.";
    data.destinationFacts[cityKey] = "Museum closing days differ: the MusBA closes on Tuesdays, while the Musée d'Aquitaine, Musée Mer Marine and Muséum close on Mondays, so put the MusBA on a Monday and the others later in the week.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Museums, riverside sights, gardens and a morning market, with canelé shops, coffee, dinners and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Monday vs Tuesday",
        "copy": "The Musée d'Aquitaine, Musée Mer Marine, Muséum and Marché des Capucins are closed on Mondays. The MusBA closes on Tuesdays, and the Frac MÉCA opens Wednesday to Sunday only."
      },
      {
        "label": "Tickets",
        "value": "Buy on site at MusBA",
        "copy": "MusBA tickets can't be bought online; you buy them at the museum or Galerie reception. The MusBA and CAPC are free on the first Sunday of the month except in July and August, and the Frac MÉCA asks a free contribution from 2 euros."
      },
      {
        "label": "Walk-ins",
        "value": "No bookings at some",
        "copy": "L'Entrecôte on cours du 30 Juillet and the InterContinental's Le Rooftop both say they take no reservations. At Symbiose an online booking is only a request, confirmed if tables are free."
      },
      {
        "label": "Ages and families",
        "value": "Plan by age",
        "copy": "Mama Shelter says breakfast bookings are mandatory and children under 4 eat free. Grand-Théâtre themed visits are set by age, from 6 months for baby visits to 7 and up for behind-the-scenes tours."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Check each museum's closing day first, then build your meals around the restaurants' fixed service times.",
      intro: [
        "Bordeaux's museums keep different closing days, so plan around them before anything else. The Musée d'Aquitaine at 20 cours Pasteur opens Tuesday to Sunday, 11:00 to 18:00, and the city announced its reopening this year alongside the exhibition \"Le Monde d'après\". The CAPC at 7 rue Ferrère keeps the same Tuesday-to-Sunday pattern and shows Alexandra Bircken's SomaSemaSoma until 3 January 2027. The MusBA on cours d'Albret closes on Tuesdays instead. Its \"Jean Dupas & Co. Le grand Art déco\" runs to 29 November 2026, and you buy tickets at reception, not online.",
        "North along the river, the Bassins à flot area groups several indoor sights. Bassins des Lumières, on impasse Brown de Colstoun, is showing Planète Préhistorique : Dinosaures, and if you hold a City Pass Bordeaux you can enter without booking ahead. The Musée Mer Marine at 89 rue des Étrangers closes on Mondays and has A-MO's \"Bleu Sauvage\" until 3 January 2027. Cap Sciences, in Hangar 20 on quai de Bacalan, has hands-on exhibitions such as Anatomik Park. Across town, the Frac MÉCA shows Seulgi Lee's GORU GORU until 25 April 2027, Wednesday to Sunday afternoons.",
        "For meals, service times matter more than you might expect. L'Entrecôte at 4 cours du 30 Juillet takes no reservations, while Le Chapon Fin at 5 rue Montesquieu serves Tuesday to Saturday only. La Tupina, near the Porte de la Monnaie, opens for lunch and dinner Tuesday to Sunday and for dinner only on Monday. Brasserie Bordelaise on rue Saint-Rémi serves continuously from noon to midnight every day. For an evening at a restaurant its hotel describes as two-star, Le Pressoir d'Argent Gordon Ramsay at the InterContinental on place de la Comédie takes bookings online.",
        "Mornings and evenings fit around fixed hours too. The Marché des Capucins opens from 6:00 Tuesday to Sunday. La Toque Cuivrée on rue Sainte-Catherine opens daily from 8:00, and Baillardran's Bar à Canelés at 76 rue Sainte-Catherine from 9:00. La Pelle Café on rue Notre-Dame is closed Monday and Tuesday, and Sauvages Café near Pey-Berland closes Wednesday and Thursday. In the evening, Symbiose on quai des Chartrons runs its cocktail bar Tuesday to Saturday from 18:00, and the Bar à Vin on cours du XXX Juillet pours until 22:00, Monday to Saturday."
      ],
      summaryCards: [
        [
          "First visit",
          "Start at the Musée d'Aquitaine (Tuesday to Sunday, 11:00 to 18:00), then see the Grand-Théâtre on place de la Comédie."
        ],
        [
          "A slower morning",
          "Begin at the Marché des Capucins, which opens at 6:00 Tuesday to Sunday, then have coffee at La Pelle Café from Wednesday to Sunday."
        ],
        [
          "Before booking",
          "Book Le Chapon Fin or Le Pressoir d'Argent online, but go straight to L'Entrecôte and Le Rooftop, which take no reservations."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Strasbourg, France: source review of 2026-10-27 (docs/content-research/strasbourg-2026-10-27.md).
  {
    const cityKey = "Strasbourg, France";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Strasbourg Cathedral","Musée de l'Œuvre Notre-Dame","Barrage Vauban","Batorama"],
      bestFirstTimers: ["Strasbourg Cathedral","Strasbourg Cathedral Platform","Batorama","Musée Historique"],
      bestRestaurants: ["Au Crocodile","Le Buerehiesel","Maison Kammerzell","Chez Yvonne"],
      bestBudget: ["Aubette 1928","Barrage Vauban","Parc de l'Orangerie","Marché Broglie"],
      bestLuxury: ["Au Crocodile","Le Buerehiesel","Bar de la Cour du Corbeau"],
      bestCouples: ["Strasbourg Cathedral Platform","Batorama","Bar de la Cour du Corbeau","Au Fond du Jardin"],
      bestKids: ["Le Vaisseau","Parc de l'Orangerie","Musée Zoologique","Planétarium du Jardin des Sciences"],
      bestSolo: ["MAMCS (Musée d'Art moderne et contemporain)","Musée Tomi Ungerer","Musée des Beaux-Arts","Cafés Henri (Strasbourg Centre)"],
      bestUnique: ["Parlamentarium Simone Veil","Aubette 1928","Musée Archéologique","Strasbourg Christmas Market (Christkindelsmärik, Place Broglie)"],
      bestBreakfast: ["Thierry Mulhaupt (Rue du Vieux Marché aux Poissons)","Cafés Henri (Strasbourg Centre)","Marché Broglie"],
      bestLunch: ["Maison Kammerzell","Au Crocodile","Le Buerehiesel","Chez Yvonne"],
      bestDinner: ["Au Crocodile","Le Buerehiesel","Maison Kammerzell","Chez Yvonne"],
      bestCocktails: ["Bar de la Cour du Corbeau","Archipel Bar (AC Hotel Strasbourg)"],
      bestBakeries: ["Thierry Mulhaupt (Rue du Vieux Marché aux Poissons)","Thierry Mulhaupt (Temple Neuf)","Au Fond du Jardin"],
      bestCoffee: ["Cafés Henri (Strasbourg Centre)","Au Fond du Jardin"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Strasbourg Cathedral": "Cathédrale Notre-Dame Place du Château Strasbourg",
      "Musée de l'Œuvre Notre-Dame": "Musée de l'Œuvre Notre-Dame 3 place du Château Strasbourg",
      "Barrage Vauban": "Barrage Vauban Place du Quartier Blanc rue Sainte-Marguerite Strasbourg",
      "Batorama": "Batorama embarcadère Cathédrale Palais Rohan Strasbourg",
      "Strasbourg Cathedral Platform": "Plateforme Cathédrale Notre-Dame Place du Château Strasbourg",
      "Musée Historique": "Musée Historique 2 rue du Vieux-Marché-aux-Poissons Strasbourg",
      "Au Crocodile": "Au Crocodile 10 rue de l'Outre Strasbourg",
      "Le Buerehiesel": "Le Buerehiesel 4 parc de l'Orangerie Strasbourg",
      "Maison Kammerzell": "Maison Kammerzell 16 Place de la Cathédrale Strasbourg",
      "Chez Yvonne": "Chez Yvonne 10 Rue du Sanglier Strasbourg",
      "Aubette 1928": "Aubette 1928 31 place Kléber Strasbourg",
      "Parc de l'Orangerie": "Parc de l'Orangerie Avenue de l'Europe Strasbourg",
      "Marché Broglie": "Marché Broglie Place Broglie Strasbourg",
      "Bar de la Cour du Corbeau": "Cour du Corbeau 6-8 rue des Couples Strasbourg",
      "Au Fond du Jardin": "Au Fond du Jardin 6 Rue de la Râpe Strasbourg",
      "Le Vaisseau": "Le Vaisseau 1bis rue Philippe Dollinger Strasbourg",
      "Musée Zoologique": "Musée Zoologique 29 boulevard de la Victoire Strasbourg",
      "Planétarium du Jardin des Sciences": "Planétarium Jardin des Sciences 27 boulevard de la Victoire Strasbourg",
      "MAMCS (Musée d'Art moderne et contemporain)": "MAMCS 1 place Hans-Jean-Arp Strasbourg",
      "Musée Tomi Ungerer": "Musée Tomi Ungerer 2 avenue de la Marseillaise Strasbourg",
      "Musée des Beaux-Arts": "Musée des Beaux-Arts Palais Rohan 2 place du Château Strasbourg",
      "Cafés Henri (Strasbourg Centre)": "Cafés Henri 31 rue des Hallebardes Strasbourg",
      "Parlamentarium Simone Veil": "Parlamentarium Simone Veil 1 Allée du Printemps Strasbourg",
      "Musée Archéologique": "Musée Archéologique Palais Rohan 2 place du Château Strasbourg",
      "Strasbourg Christmas Market (Christkindelsmärik, Place Broglie)": "Christkindelsmärik Place Broglie Strasbourg",
      "Thierry Mulhaupt (Rue du Vieux Marché aux Poissons)": "Thierry Mulhaupt 18 rue du Vieux Marché aux Poissons Strasbourg",
      "Archipel Bar (AC Hotel Strasbourg)": "AC Hotel Strasbourg 4-6 Boulevard de Dresde Strasbourg",
      "Thierry Mulhaupt (Temple Neuf)": "Thierry Mulhaupt 5 rue du Temple Neuf Strasbourg"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Strasbourg" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "The cathedral, city museums, canal cruises and parks, with Alsatian restaurants, pâtisseries, a coffee bar and cocktail bars checked against their own websites.";
    cityGuide.highlights = ["Strasbourg Cathedral","Musée de l'Œuvre Notre-Dame","Barrage Vauban","Parlamentarium Simone Veil"];
    cityGuide.tip = "Most city museums close on Mondays, but the three in the Palais Rohan (Beaux-Arts, Archéologique, Arts décoratifs) close on Tuesdays instead, so plan museum days around both.";
    data.destinationFacts[cityKey] = "Most city museums close on Mondays, but the three in the Palais Rohan (Beaux-Arts, Archéologique, Arts décoratifs) close on Tuesdays instead, so plan museum days around both.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "The cathedral, city museums, canal cruises and parks, with Alsatian restaurants, pâtisseries, a coffee bar and cocktail bars checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mon or Tue",
        "copy": "Musée de l'Œuvre Notre-Dame, MAMCS, Tomi Ungerer, Historique and Zoologique close on Mondays; Beaux-Arts, Archéologique and Arts décoratifs close on Tuesdays. Aubette 1928 opens only Wednesday to Saturday, 14:00-18:00."
      },
      {
        "label": "Same-day tickets",
        "value": "Clock show",
        "copy": "Astronomical clock tickets at Strasbourg Cathedral are sold only on the day (adults €4), with the Apostles parade at 12:30; there is no show on Sundays and feast days or during the Christmas market."
      },
      {
        "label": "Book ahead",
        "value": "Tables and tea",
        "copy": "Au Fond du Jardin's tea room works 'Sur réservation' in two afternoon services, Wednesday to Sunday. Au Crocodile takes online bookings, and its 'Instant Déjeuner' (€72) runs only on Thursday and Friday lunch."
      },
      {
        "label": "Rules",
        "value": "ID and bags",
        "copy": "The Parlamentarium Simone Veil requires a physical ID card or passport, runs airport-style security and bans large luggage; under-14s must be with an adult. Strasbourg Cathedral checks bags at the South portal."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Start at the cathedral before noon, then pick museums by closing day, since Monday and Tuesday closures split the city's collections.",
      intro: [
        "Strasbourg Cathedral is free to enter with no reservation; you go in through the South portal on the place du Château side, where bags are checked. It opens Monday to Saturday 8:30-11:15 and 12:45-17:45, and Sunday afternoons. The astronomical clock show needs a same-day ticket (adults €4): doors open at 11:30 and the Apostles parade at 12:30, but not on Sundays, feast days or during the Christmas market. The platform climb starts from the same square and, from October to March, runs 10:00-13:00 and 13:30-18:00, with last ascent at 17:15.",
        "Across the square, the Musée de l'Œuvre Notre-Dame marks 800 years of the foundation that built the cathedral, with an exhibition running until 17 January 2027. The Palais Rohan holds the Beaux-Arts and Archéologique museums, both closed on Tuesdays; the Arts décoratifs is open only in its service areas, at €5, until 19 November 2026. At MAMCS, 'L'état sauvage' runs to 3 January 2027, while the Musée Tomi Ungerer shows Anna Sommer until 17 January 2027. The Musée Alsacien is closed for works until a planned 2028 reopening. Aubette 1928 on place Kléber is free, Wednesday to Saturday afternoons.",
        "For an Alsatian meal by the cathedral, Maison Kammerzell at 16 Place de la Cathédrale has published its Christmas Eve, Christmas lunch and New Year's Eve 2026 menus. Au Crocodile, a Michelin-starred table founded in 1840 on rue de l'Outre, serves lunch Thursday to Saturday and dinner Tuesday to Saturday. Le Buerehiesel, in the Parc de l'Orangerie, opens Tuesday lunch to Saturday dinner and closes from 30 December 2026 to 13 January 2027. For something sweet, Thierry Mulhaupt opens from 8:30 on Saturdays on rue du Vieux Marché aux Poissons, and Cafés Henri on rue des Hallebardes runs a coffee bar Monday to Saturday.",
        "Beyond the Grande Île, the Barrage Vauban terrace looks back over the old town; from November to February it opens 8:30-16:00. Batorama cruises leave from the Cathédrale or Quai au Sable pontoons, and the operator asks you to check yours carefully while pontoon works continue. At the Parlamentarium Simone Veil, bring a passport or ID card, and note it closes on Sundays. The Parc de l'Orangerie has a zoo, play areas and boating. The city's Christmas market runs 27 November to 24 December 2026, with the Christkindelsmärik on Place Broglie, and for a late drink the Archipel Bar serves until 01:00."
      ],
      summaryCards: [
        [
          "First visit",
          "See Strasbourg Cathedral and its 12:30 clock show, then cross to the Musée de l'Œuvre Notre-Dame's 800-year exhibition, open until 17 January 2027."
        ],
        [
          "A slower morning",
          "Pick up pastries at Thierry Mulhaupt or coffee at Cafés Henri, then walk out to the Barrage Vauban terrace before an afternoon at MAMCS."
        ],
        [
          "Before booking",
          "Check museum closing days (Monday for most, Tuesday in the Palais Rohan), reserve Au Fond du Jardin's tea room, and bring physical ID for the Parlamentarium."
        ]
      ],
      trust: "All 28 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Cologne, Germany: source review of 2026-10-27 (docs/content-research/cologne-2026-10-27.md).
  {
    const cityKey = "Cologne, Germany";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Cologne Cathedral","Museum Ludwig","Kolumba","Kölner Seilbahn"],
      bestFirstTimers: ["Cologne Cathedral","Museum Ludwig","Schokoladenmuseum","Früh am Dom"],
      bestRestaurants: ["taku","Ox & Klee","Hanse Stube","Brauhaus Sion"],
      bestBudget: ["Päffgen (Friesenstraße)","Kölner Seilbahn","Museum für Ostasiatische Kunst","NS-Dokumentationszentrum (EL-DE-Haus)"],
      bestLuxury: ["taku","Hanse Stube","Charles Bar","Ox & Klee"],
      bestCouples: ["Kolumba","Ox & Klee","Charles Bar","Kölner Seilbahn"],
      bestKids: ["Kölner Zoo","Schokoladenmuseum","Kölner Seilbahn","Deutsches Sport & Olympia Museum"],
      bestSolo: ["Museum Ludwig","Käthe Kollwitz Museum Köln","Museum Schnütgen","Café Reichard"],
      bestUnique: ["Farina Fragrance Museum","Rautenstrauch-Joest-Museum","MAKK – Museum für Angewandte Kunst Köln","Römisch-Germanisches Museum (Belgisches Haus)"],
      bestBreakfast: ["Café Reichard","Gaffel am Dom"],
      bestLunch: ["Gaffel am Dom","Hanse Stube","Peters Brauhaus (Mühlengasse)","Früh am Dom"],
      bestDinner: ["Brauhaus Sion","Päffgen (Friesenstraße)","taku","Ox & Klee"],
      bestCocktails: ["Charles Bar"],
      bestBakeries: ["Café Konditorei Wahlen","Törtchen Törtchen (Apostelnstraße)"],
      bestCoffee: ["Café Reichard","Café Konditorei Wahlen"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Cologne Cathedral": "Kölner Dom Domkloster 4 Köln",
      "Museum Ludwig": "Museum Ludwig Heinrich-Böll-Platz Köln",
      "Kolumba": "Kolumba Kolumbastraße 4 Köln",
      "Kölner Seilbahn": "Kölner Seilbahn Riehler Straße 180 Köln",
      "Schokoladenmuseum": "Schokoladenmuseum Am Schokoladenmuseum 1a Köln",
      "Früh am Dom": "Früh am Dom Am Hof 12-18 Köln",
      "taku": "taku Excelsior Hotel Ernst Trankgasse 1-5 Köln",
      "Ox & Klee": "Ox & Klee Im Zollhafen 18 Köln",
      "Hanse Stube": "Hanse Stube Excelsior Hotel Ernst Trankgasse 1-5 Köln",
      "Brauhaus Sion": "Brauhaus Sion Unter Taschenmacher 5-7 Köln",
      "Päffgen (Friesenstraße)": "Päffgen Friesenstraße 64-66 Köln",
      "Museum für Ostasiatische Kunst": "Museum für Ostasiatische Kunst Universitätsstraße 100 Köln",
      "NS-Dokumentationszentrum (EL-DE-Haus)": "NS-Dokumentationszentrum Appellhofplatz 23-25 Köln",
      "Charles Bar": "Charles Bar Excelsior Hotel Ernst Trankgasse 1-5 Köln",
      "Kölner Zoo": "Kölner Zoo Riehler Straße 173 Köln",
      "Deutsches Sport & Olympia Museum": "Deutsches Sport & Olympia Museum Im Zollhafen 1 Köln",
      "Käthe Kollwitz Museum Köln": "Käthe Kollwitz Museum Neumarkt 18-24 Köln",
      "Museum Schnütgen": "Museum Schnütgen Cäcilienstraße 29-33 Köln",
      "Café Reichard": "Café Reichard Unter Fettenhennen 11 Köln",
      "Farina Fragrance Museum": "Farina Duftmuseum Obenmarspforten 21 Köln",
      "Rautenstrauch-Joest-Museum": "Rautenstrauch-Joest-Museum Cäcilienstraße 29-33 Köln",
      "MAKK – Museum für Angewandte Kunst Köln": "Museum für Angewandte Kunst An der Rechtschule 7 Köln",
      "Römisch-Germanisches Museum (Belgisches Haus)": "Römisch-Germanisches Museum Belgisches Haus Cäcilienstraße 46 Köln",
      "Gaffel am Dom": "Gaffel am Dom Bahnhofsvorplatz 1 Köln",
      "Peters Brauhaus (Mühlengasse)": "Peters Brauhaus Mühlengasse 1 Köln",
      "Café Konditorei Wahlen": "Café Wahlen Hohenstaufenring 64 Köln",
      "Törtchen Törtchen (Apostelnstraße)": "Törtchen Törtchen Apostelnstraße 19 Köln"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Cologne" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "The cathedral, city museums, the zoo and cable car, with Kölsch brewhouses, fine dining, cafés and a hotel bar checked against their own websites.";
    cityGuide.highlights = ["Cologne Cathedral","Museum Ludwig","Kolumba","Schokoladenmuseum"];
    cityGuide.tip = "Sightseeing inside Cologne Cathedral has required a ticket since 1 July 2026, while the north transept entrance stays free for prayer.";
    data.destinationFacts[cityKey] = "Sightseeing inside Cologne Cathedral has required a ticket since 1 July 2026, while the north transept entrance stays free for prayer.";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "The cathedral, city museums, the zoo and cable car, with Kölsch brewhouses, fine dining, cafés and a hotel bar checked against their own websites.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Mondays and Tuesdays",
        "copy": "MAKK, Museum Schnütgen, the Rautenstrauch-Joest-Museum, the Käthe Kollwitz Museum and the Museum für Ostasiatische Kunst close on Mondays. Kolumba closes on Tuesdays instead, and Café Konditorei Wahlen is shut on Mondays."
      },
      {
        "label": "Tickets",
        "value": "Book ahead online",
        "copy": "Cologne Cathedral sells sightseeing tickets online and the Schokoladenmuseum suggests buying in its webshop to skip the box-office wait. Kölner Zoo day tickets bought online are cheaper and include VRS public transport."
      },
      {
        "label": "Walk-in or booking",
        "value": "Rules vary",
        "copy": "The Kölner Seilbahn sells tickets only at the counter and takes no reservations. Päffgen takes table reservations only by phone from 12:00, and taku strongly recommends booking early."
      },
      {
        "label": "Guided entry",
        "value": "Tour only",
        "copy": "The Farina Fragrance Museum can only be seen on a guided tour, offered in English, German, Chinese and French, and online booking is recommended."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Start with the cathedral and the museums around it, and book Altstadt dinners and timed tours before you arrive.",
      intro: [
        "Cologne Cathedral is the obvious place to start, but plan for the change made on 1 July 2026: sightseeing inside is now ticketed. You can see the interior daily from about 10:00 to 17:45, with shorter afternoon hours on Sundays and church holidays, and the north transept entrance stays free for prayer. The tower is open from 09:00, until 16:00 from November to February. Museum Ludwig is next door and keeps late hours until 22:00 on the first Thursday of each month.",
        "This winter Museum Ludwig opens two new shows: Lee Ufan, winner of the Wolfgang-Hahn-Preis 2026, from 7 November to 4 April 2027, and Man Ray's Kiki in the photography rooms from 31 October to 13 June 2027. Kolumba's annual exhibition on norm and deviation runs until 1 August 2027, daily from 12:00 to 17:00 except Tuesdays. MAKK shows Hans Georg Esch's architectural photography until 17 January 2027, and the Museum für Ostasiatische Kunst has temporarily lowered its admission to €7.50.",
        "The Römisch-Germanisches Museum's building on Roncalliplatz is closed for renovation, so you'll find its collection in the Belgisches Haus on Cäcilienstraße, a short walk from the Rautenstrauch-Joest-Museum and Museum Schnütgen. The Wallraf-Richartz-Museum is closed until the end of 2028. With children, Kölner Zoo is open every day of the year, and its China Lights run from 11 December to 31 January. The Schokoladenmuseum opens daily from 10:00 to 18:00.",
        "For food, Kölsch brewhouses fill the Altstadt. Brauhaus Sion opens daily from noon, Gaffel am Dom serves breakfast from 10:00 to 11:30, and Päffgen on Friesenstraße takes bookings only by phone. For a special evening, taku and the Hanse Stube are both in the Excelsior Hotel Ernst, where the Charles Bar opens daily from noon. Ox & Klee serves dinner Wednesday to Saturday. Café Reichard by the cathedral opens daily from 8:30 and lays out a breakfast buffet at weekends."
      ],
      summaryCards: [
        [
          "First visit",
          "Buy your Cologne Cathedral sightseeing ticket online, then cross to Museum Ludwig and finish with a Kölsch at Früh am Dom or Brauhaus Sion."
        ],
        [
          "A slower morning",
          "Café Reichard opens at 8:30 every day and serves a breakfast buffet on Saturdays, Sundays and holidays until 11:30."
        ],
        [
          "Before booking",
          "Many city museums close on Mondays and Kolumba on Tuesdays, while Päffgen takes table bookings only by phone from noon."
        ]
      ],
      trust: "All 27 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
  // Hamburg, Germany: source review of 2026-10-27 (docs/content-research/hamburg-2026-10-27.md).
  {
    const cityKey = "Hamburg, Germany";
    data.cityGuideDetailData[cityKey] = {
      bestAttractions: ["Elbphilharmonie Plaza","Miniatur Wunderland","Hauptkirche St. Michaelis","Internationales Maritimes Museum"],
      bestFirstTimers: ["Elbphilharmonie Plaza","Miniatur Wunderland","HADAG ferry line 62 (Landungsbrücken)","Speicherstadtmuseum"],
      bestRestaurants: ["Bullerei","Old Commercial Room","Fischereihafen Restaurant","Café Paris"],
      bestBudget: ["HADAG ferry line 62 (Landungsbrücken)","Fischauktionshalle (Hamburger Fischmarkt)","Alster-Touristik (Anleger Jungfernstieg)","Speicherstadt Kaffeerösterei"],
      bestLuxury: ["Restaurant Haerlin (Hotel Vier Jahreszeiten)","Jahreszeiten Bar (Hotel Vier Jahreszeiten)","Café Condi (Hotel Vier Jahreszeiten)","Skyline Bar 20up (Empire Riverside Hotel)"],
      bestCouples: ["Alster-Touristik (Anleger Jungfernstieg)","Tower Bar (Hotel Hafen Hamburg)","Restaurant Haerlin (Hotel Vier Jahreszeiten)","Elbphilharmonie Plaza"],
      bestKids: ["Miniatur Wunderland","Tierpark Hagenbeck","Chocoversum","Internationales Maritimes Museum"],
      bestSolo: ["Hamburger Kunsthalle","Bucerius Kunst Forum","Museum für Kunst und Gewerbe Hamburg","Nord Coast Coffee Roastery (Deichstraße)"],
      bestUnique: ["Rickmer Rickmers","Cap San Diego","BallinStadt","Spicy's Gewürzmuseum"],
      bestBreakfast: ["Café Paris","Café Condi (Hotel Vier Jahreszeiten)","Zeit für Brot (Ottensen)"],
      bestLunch: ["Bullerei","Old Commercial Room","Fischereihafen Restaurant","Café Paris"],
      bestDinner: ["Bullerei","Old Commercial Room","Fischereihafen Restaurant","Restaurant Haerlin (Hotel Vier Jahreszeiten)"],
      bestCocktails: ["Jahreszeiten Bar (Hotel Vier Jahreszeiten)","Tower Bar (Hotel Hafen Hamburg)","Skyline Bar 20up (Empire Riverside Hotel)","clouds – Bar & Kitchen"],
      bestBakeries: ["Zeit für Brot (Ottensen)","Herr Max","Café Condi (Hotel Vier Jahreszeiten)"],
      bestCoffee: ["Speicherstadt Kaffeerösterei","Nord Coast Coffee Roastery (Deichstraße)","Café Condi (Hotel Vier Jahreszeiten)"]
    };
    data.cityPlaceQueries[cityKey] = {
      "Elbphilharmonie Plaza": "Elbphilharmonie Platz der Deutschen Einheit Hamburg",
      "Miniatur Wunderland": "Miniatur Wunderland Kehrwieder 2 Hamburg",
      "Hauptkirche St. Michaelis": "Hauptkirche St. Michaelis Englische Planke 1 Hamburg",
      "Internationales Maritimes Museum": "Internationales Maritimes Museum Koreastraße 1 Hamburg",
      "HADAG ferry line 62 (Landungsbrücken)": "HADAG Fähre 62 St. Pauli Landungsbrücken Hamburg",
      "Speicherstadtmuseum": "Speicherstadtmuseum Am Sandtorkai 36 Hamburg",
      "Bullerei": "Bullerei Lagerstraße 34b Hamburg",
      "Old Commercial Room": "Old Commercial Room Englische Planke 10 Hamburg",
      "Fischereihafen Restaurant": "Fischereihafen Restaurant Große Elbstraße 143 Hamburg",
      "Café Paris": "Café Paris Rathausstraße 4 Hamburg",
      "Fischauktionshalle (Hamburger Fischmarkt)": "Fischauktionshalle Große Elbstraße 9 Hamburg",
      "Alster-Touristik (Anleger Jungfernstieg)": "Alster-Touristik Anleger Jungfernstieg Hamburg",
      "Speicherstadt Kaffeerösterei": "Speicherstadt Kaffeerösterei Kehrwieder 5 Hamburg",
      "Restaurant Haerlin (Hotel Vier Jahreszeiten)": "Restaurant Haerlin Neuer Jungfernstieg 9 Hamburg",
      "Jahreszeiten Bar (Hotel Vier Jahreszeiten)": "Jahreszeiten Bar Neuer Jungfernstieg 9 Hamburg",
      "Café Condi (Hotel Vier Jahreszeiten)": "Café Condi Neuer Jungfernstieg 9 Hamburg",
      "Skyline Bar 20up (Empire Riverside Hotel)": "Skyline Bar 20up Bernhard-Nocht-Straße 97 Hamburg",
      "Tower Bar (Hotel Hafen Hamburg)": "Tower Bar Hotel Hafen Seewartenstraße 9 Hamburg",
      "Tierpark Hagenbeck": "Tierpark Hagenbeck Lokstedter Grenzstraße 2 Hamburg",
      "Chocoversum": "Chocoversum Meßberg 1 Hamburg",
      "Hamburger Kunsthalle": "Hamburger Kunsthalle Glockengießerwall 5 Hamburg",
      "Bucerius Kunst Forum": "Bucerius Kunst Forum Alter Wall 12 Hamburg",
      "Museum für Kunst und Gewerbe Hamburg": "Museum für Kunst und Gewerbe Steintorplatz Hamburg",
      "Nord Coast Coffee Roastery (Deichstraße)": "Nord Coast Coffee Roastery Deichstraße 9 Hamburg",
      "Rickmer Rickmers": "Rickmer Rickmers Landungsbrücken Ponton 1a Hamburg",
      "Cap San Diego": "Cap San Diego Überseebrücke Hamburg",
      "BallinStadt": "BallinStadt Veddeler Bogen 2 Hamburg",
      "Spicy's Gewürzmuseum": "Spicy's Gewürzmuseum Am Sandtorkai 34 Hamburg",
      "Zeit für Brot (Ottensen)": "Zeit für Brot Ottenser Hauptstraße 41 Hamburg",
      "clouds – Bar & Kitchen": "clouds Bar & Kitchen Reeperbahn 1 Hamburg",
      "Herr Max": "Herr Max Hegestraße 44 Hamburg"
    };
    // Cities that only had generated starter content have no guide record yet; create it so the page is built.
    let cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (!cityGuide) {
      cityGuide = { city: cityKey, title: "Hamburg" };
      data.cityGuideData.push(cityGuide);
    }
    cityGuide.summary = "Harbourfront sights, Speicherstadt museums, art collections, restaurants, bakeries, coffee roasters and cocktail bars in Hamburg, each checked against its own website.";
    cityGuide.highlights = ["Elbphilharmonie Plaza","Miniatur Wunderland","Hauptkirche St. Michaelis","Hamburger Kunsthalle"];
    cityGuide.tip = "Buy Miniatur Wunderland tickets online in advance, as its own site advises, and pre-book an Elbphilharmonie Plaza slot if you want guaranteed entry at a set time (€5 booking fee).";
    data.destinationFacts[cityKey] = "Buy Miniatur Wunderland tickets online in advance, as its own site advises, and pre-book an Elbphilharmonie Plaza slot if you want guaranteed entry at a set time (€5 booking fee).";
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = "Harbourfront sights, Speicherstadt museums, art collections, restaurants, bakeries, coffee roasters and cocktail bars in Hamburg, each checked against its own website.";
    data.cityPlanningToolkitData[cityKey] = [
      {
        "label": "Closing days",
        "value": "Check before you go",
        "copy": "BallinStadt opens Tuesday to Sunday only, and Restaurant Haerlin serves dinner Tuesday to Saturday. The Fischauktionshalle market runs on Sundays from 06:00 to 12:00."
      },
      {
        "label": "Tickets and booking",
        "value": "Book ahead",
        "copy": "Miniatur Wunderland advises buying tickets online in advance to avoid long waits. Elbphilharmonie Plaza pre-booking costs €5 per ticket and guarantees your chosen entry time."
      },
      {
        "label": "Walk-in policies",
        "value": "Some no-booking spots",
        "copy": "The Bullerei Deli takes no reservations, while its restaurant takes bookings 60 days ahead. Groups of five or more at Restaurant Haerlin must book by email."
      },
      {
        "label": "Rules",
        "value": "Bags and dress",
        "copy": "At the Elbphilharmonie, bags A3 size or larger, luggage and walking-stick umbrellas go in ground-floor lockers. Restaurant Haerlin asks for smart casual dress."
      }
    ];
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: "Group the harbour and Speicherstadt sights into one day, and book Miniatur Wunderland and an Elbphilharmonie Plaza slot before you go.",
      intro: [
        "Start at the Elbphilharmonie Plaza, the public viewing level on the 8th floor, open daily from 10:00 to 24:00 with last admission at 23:30. Capacity is controlled with Plaza tickets, and if you pre-book online or on site you pay a €5 booking fee per ticket, which guarantees entry at your chosen time. A concert ticket also gets you onto the Plaza from two hours before the performance. From there it is a short walk into the Speicherstadt, where the Speicherstadtmuseum on Am Sandtorkai has extended its exhibition on the pre-war warehouse district until 10 January 2027.",
        "Miniatur Wunderland, at Kehrwieder 2 in the Speicherstadt, opens every day, always at least from 09:30 to 18:00, and often later at weekends, on Tuesdays and in school holidays. Its own admission page advises buying tickets online in advance to avoid long waits; adults pay 22.00 € and children under 1 m go free. Nearby, the Internationales Maritimes Museum in Kaispeicher B opens daily from 10:00 to 18:00, with \"Heroes of the Sea\" running until 31 December 2026 and a cheaper Störtebeker Ticket from 16:30.",
        "For art, the Bucerius Kunst Forum on Alter Wall opens daily from 11:00 to 19:00 and until 21:00 on Thursdays, and its exhibition \"Von Monet bis Picasso\" runs until 29 March 2027. The Museum für Kunst und Gewerbe on Steintorplatz shows \"Hella Jongerius: Whispering Things\" until 13 June 2027. The Hamburger Kunsthalle offers free entry from 6 to 9 pm on the first Thursday of the month. At Hauptkirche St. Michaelis the tower is open from 09:00 to 19:00, and the church hosts its Bach-Wochen until 22 November.",
        "Plan meals around the clock. Café Paris on Rathausstraße serves breakfast from 9.00 (9.30 on Sundays), and Café Condi at Hotel Vier Jahreszeiten runs its breakfast buffet until 11:00 on weekdays. At the Bullerei near Sternschanze the Deli takes no reservations, while restaurant tables open for booking 60 days ahead. Restaurant Haerlin opens Tuesday to Saturday with a smart casual dress code. For a drink with a harbour view, the Tower Bar at Hotel Hafen Hamburg opens from 18:00."
      ],
      summaryCards: [
        [
          "First visit",
          "Pair the Elbphilharmonie Plaza (daily 10:00–24:00) with Miniatur Wunderland and the Speicherstadtmuseum, all in or beside the Speicherstadt."
        ],
        [
          "A slower morning",
          "Take the Café Condi breakfast buffet or breakfast at Café Paris, then coffee at Speicherstadt Kaffeerösterei, open daily 10.00–18.00."
        ],
        [
          "Before booking",
          "Bullerei restaurant tables open 60 days ahead, and Miniatur Wunderland recommends buying tickets online in advance."
        ]
      ],
      trust: "All 31 distinct recommendations in this guide were checked against their operators' own websites on October 27, 2026. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling."
    };
  }
})();
