window.HB_DATA = window.HB_DATA || {};

(function () {
  const data = window.HB_DATA;
  const compact = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const cityName = (value) => String(value || "").split(",")[0].trim();
  const asList = (value) => Array.isArray(value) ? value.filter(Boolean).map((item) => String(item).trim()) : [];
  const uniqueList = (...lists) => [...new Set(lists.flatMap(asList))].filter(Boolean);
  const comparable = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  const countryAliases = {
    turkiye: "Turkey",
    republicofturkey: "Turkey",
    czechrepublic: "Czechia",
    unitedstatesofamerica: "United States",
    usa: "United States",
    us: "United States",
    uae: "United Arab Emirates",
    republicofkorea: "South Korea",
    southkorea: "South Korea",
    russianfederation: "Russia",
    vietname: "Vietnam",
    vietnamesocialistrepublic: "Vietnam",
    burma: "Myanmar",
    holland: "Netherlands",
    england: "United Kingdom"
  };
  const normalizeCountryName = (value) => {
    const raw = String(value || "").trim();
    return countryAliases[comparable(raw)] || raw;
  };
  const normalizeCountryKey = (value) => comparable(normalizeCountryName(value));
  const normalizeCityLabel = (value) => {
    const raw = String(value || "").trim();
    if (!raw || !raw.includes(",")) return raw;
    const parts = raw.split(",").map((part) => part.trim()).filter(Boolean);
    if (parts.length < 2) return raw;
    const name = parts.slice(0, -1).join(", ");
    const countries = parts.at(-1)
      .split(/\s+and\s+|\s*&\s*/i)
      .map(normalizeCountryName)
      .filter(Boolean);
    return countries.length ? `${name}, ${[...new Set(countries)].join(" and ")}` : raw;
  };
  const mergeValues = (primary, secondary) => {
    if (primary === undefined || primary === null || primary === "") return secondary;
    if (secondary === undefined || secondary === null || secondary === "") return primary;
    if (Array.isArray(primary) && Array.isArray(secondary)) {
      const merged = [];
      const seen = new Set();
      [...primary, ...secondary].forEach((item) => {
        const key = Array.isArray(item)
          ? comparable(item[0])
          : item && typeof item === "object"
            ? JSON.stringify(item)
            : String(item);
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(item);
        }
      });
      return merged;
    }
    if (primary && secondary && typeof primary === "object" && typeof secondary === "object") {
      const merged = { ...primary };
      Object.entries(secondary).forEach(([key, value]) => {
        merged[key] = mergeValues(merged[key], value);
      });
      return merged;
    }
    return primary;
  };
  const mergeKeyedData = (source, keyNormalizer, valueNormalizer = (value) => value) => {
    const merged = {};
    Object.entries(source || {}).forEach(([key, value]) => {
      const canonicalKey = keyNormalizer(key);
      const normalizedValue = valueNormalizer(value, key, canonicalKey);
      merged[canonicalKey] = mergeValues(merged[canonicalKey], normalizedValue);
    });
    return merged;
  };
  const normalizeCityRecord = (record) => {
    const rawLabel = String(record?.city || record?.title || "").trim();
    const label = normalizeCityLabel(rawLabel);
    const country = normalizeCountryName(record?.country || label.split(",").at(-1));
    return { ...record, city: label, country };
  };
  const normalizeLocationKey = (value) => {
    const raw = String(value || "").trim();
    if (raw.includes(",")) return normalizeCityLabel(raw);
    const canonicalCountry = normalizeCountryName(raw);
    const countryMatch = Object.keys(data.countryGuideData || {})
      .find((country) => normalizeCountryKey(country) === normalizeCountryKey(canonicalCountry));
    return countryMatch || raw;
  };

  const cityLabelsByName = new Map();

  function rebuildDestinationAliases() {
    const candidates = new Map();
    const addCandidate = (alias, city) => {
      const aliasKey = compact(alias);
      const canonicalCity = normalizeCityLabel(city);
      if (!aliasKey || !canonicalCity) return;
      if (!candidates.has(aliasKey)) candidates.set(aliasKey, new Set());
      candidates.get(aliasKey).add(canonicalCity);
    };

    Object.entries(data.destinationAliases || {}).forEach(([alias, value]) => addCandidate(alias, value));
    (data.cityGuideData || []).forEach((record) => {
      addCandidate(record.city, record.city);
    });
    Object.values(data.countrySuggestions || {}).flat().forEach((city) => {
      addCandidate(city, city);
    });

    const aliases = {};
    candidates.forEach((cities, alias) => {
      if (cityLabelsByName.get(alias)?.size > 1) return;
      if (cities.size === 1) aliases[alias] = [...cities][0];
    });
    cityLabelsByName.forEach((labels, nameKey) => {
      if (labels.size !== 1) return;
      const city = [...labels][0];
      aliases[nameKey] = city;
    });
    data.destinationAliases = aliases;
  }

  function normalizeLoadedDestinationData() {
    const rawCountryLabels = new Set([
      ...Object.keys(data.countryGuideData || {}),
      ...Object.keys(data.countryGuideCoverage || {}),
      ...Object.keys(data.countryEditorialPageData || {}),
      ...Object.keys(data.countrySuggestions || {})
    ]);
    data.countryAliases = { ...countryAliases };
    data.normalizeCountryName = normalizeCountryName;
    data.normalizeCityLabel = normalizeCityLabel;
    data.countryGuideData = mergeKeyedData(data.countryGuideData, normalizeCountryName);
    data.countryGuideCoverage = mergeKeyedData(data.countryGuideCoverage, normalizeCountryName);
    data.countryEditorialPageData = mergeKeyedData(data.countryEditorialPageData, normalizeCountryName);

    const normalizedSuggestions = {};
    Object.entries(data.countrySuggestions || {}).forEach(([country, cities]) => {
      const canonicalCountry = normalizeCountryName(country);
      normalizedSuggestions[canonicalCountry] = uniqueList(
        normalizedSuggestions[canonicalCountry],
        asList(cities).map(normalizeCityLabel)
      );
    });
    data.countrySuggestions = normalizedSuggestions;

    const cityByKey = new Map();
    (data.cityGuideData || []).forEach((record) => {
      const normalized = normalizeCityRecord(record);
      const existing = cityByKey.get(normalized.city);
      cityByKey.set(normalized.city, existing
        ? { ...mergeValues(existing, normalized), city: normalized.city, country: existing.country || normalized.country }
        : normalized);
    });
    data.cityGuideData = [...cityByKey.values()];
    const normalizeCityValue = (value) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return value;
      const normalized = { ...value };
      if (normalized.country) normalized.country = normalizeCountryName(normalized.country);
      if (normalized.title) normalized.title = normalizeCountryName(normalized.title);
      return normalized;
    };
    data.cityGuideDetailData = mergeKeyedData(data.cityGuideDetailData, normalizeCityLabel);
    data.cityEditorialPageData = mergeKeyedData(data.cityEditorialPageData, normalizeCityLabel, normalizeCityValue);
    data.cityPlanningToolkitData = mergeKeyedData(data.cityPlanningToolkitData, normalizeCityLabel, normalizeCityValue);
    data.destinationHeroData = mergeKeyedData(data.destinationHeroData, normalizeLocationKey, normalizeCityValue);
    data.destinationCoverage = mergeKeyedData(data.destinationCoverage, normalizeCityLabel, normalizeCityValue);
    data.heroOverlayByLocation = mergeKeyedData(data.heroOverlayByLocation, normalizeLocationKey);

    const allCityLabels = [
      ...data.cityGuideData.map((record) => record.city),
      ...Object.values(data.countrySuggestions || {}).flat()
    ];
    cityLabelsByName.clear();
    allCityLabels.forEach((label) => {
      const key = comparable(cityName(label));
      if (!cityLabelsByName.has(key)) cityLabelsByName.set(key, new Set());
      cityLabelsByName.get(key).add(label);
    });
    const normalizedFacts = {};
    Object.entries(data.destinationFacts || {}).forEach(([key, value]) => {
      const canonicalKey = key.includes(",") ? normalizeCityLabel(key) : key;
      if (canonicalKey.includes(",") || cityLabelsByName.get(comparable(key))?.size === 1) {
        normalizedFacts[canonicalKey] = mergeValues(normalizedFacts[canonicalKey], value);
      }
    });
    data.cityGuideData.forEach((record) => {
      if (record.tip) normalizedFacts[record.city] = record.tip;
    });
    data.destinationFacts = normalizedFacts;
    rebuildDestinationAliases();
    data.countryNormalizationReport = {
      labels: [...rawCountryLabels],
      canonicalCountries: Object.keys(data.countryGuideData),
      duplicateCountryKeys: [...new Set([...rawCountryLabels].map(normalizeCountryKey))]
        .filter((key) => [...rawCountryLabels].filter((label) => normalizeCountryKey(label) === key).length > 1)
    };
  }
  const isPlaceholderCopy = (value) => {
    const text = String(value || "").trim().toLowerCase();
    return !text || text === "a visual starting point" || text.startsWith("a visual starting point for");
  };
  const getCountryGuide = (country) => {
    const guides = data.countryGuideData || {};
    return guides[normalizeCountryName(country)] || {};
  };
  const getAreas = (city, name, guide, visualTheme = "neighborhood") => {
    const getAreaSet = window.HB_TRIP_HELPERS?.getAreaSet;
    const isPlaceholderArea = (area) => /^(your main base in|a nearby area|a flexible day-trip area)\b/i.test(String(area).trim());
    const mapAreas = Object.keys(data.destinationMapData?.[name]?.areas || {});
    const guideAreas = asList(guide?.areas)
      .filter((area) => !isPlaceholderArea(area));
    const namedHelperAreas = getAreaSet ? uniqueList(getAreaSet(name)) : [];
    const helperAreas = getAreaSet ? uniqueList(namedHelperAreas, getAreaSet(city)) : [];
    const hasSpecificAreas = [...guideAreas, ...mapAreas, ...namedHelperAreas]
      .some((area) => !isPlaceholderArea(area));
    const fallbackAreaSets = {
      water: ["Waterfront or shoreline", "Old town or harbor", "Local market district"],
      nature: ["Main base", "Scenic area", "Local village or trailhead"],
      food: ["City center", "Market district", "Cafe neighborhood"],
      landmark: ["Historic center", "Museum district", "Local market district"],
      neighborhood: ["City center", "Historic area", "Local neighborhood"]
    };
    const fallbackAreas = fallbackAreaSets[visualTheme] || fallbackAreaSets.neighborhood;
    const genericNatureAreas = /^(city center|historic area|waterfront or market district|old town|riverside)$/i;
    const preferredAreas = [...guideAreas, ...mapAreas, ...helperAreas]
      .filter((area) => !hasSpecificAreas || !isPlaceholderArea(area))
      .filter((area) => visualTheme !== "nature" || !genericNatureAreas.test(area));
    return uniqueList(preferredAreas, fallbackAreas).slice(0, 4);
  };
  const getHelperList = (method, city, areas) => {
    const helper = window.HB_TRIP_HELPERS?.[method];
    return helper ? asList(helper(city, areas)) : [];
  };
  const isGenericHighlight = (value) => {
    const text = String(value || "").toLowerCase();
    return text === "main city sight"
      || text === "signature experience"
      || text.startsWith("neighborhood highlight in")
      || text.startsWith("first walk through")
      || text.startsWith("easy final stop in")
      || text.startsWith("cafe time and wandering in")
      || text.startsWith("cafe stop and views in")
      || text.startsWith("lunch and wandering in")
      || text.startsWith("neighborhood food stop in")
      || text.startsWith("final slow morning in")
      || text.startsWith("final pastry stop in")
      || text.startsWith("final market stop in");
  };
  const getVisualTheme = (text) => {
    const value = String(text || "").toLowerCase();
    if (/beach|coast|coastal|sea|island|ocean|reef|lagoon|shore|bay|coral|tropical|waterfront|harbor|port|river|canal|lake/.test(value)) return "water";
    if (/mountain|alpine|scenic|outdoor|hiking|forest|park|landscape|rainforest|volcanic|desert|wildlife|safari|fjord|glacier|expedition|iceberg|polar|penguin/.test(value)) return "nature";
    if (/food|meal|coffee|cafe|market|wine|dinner|bakery|culinary|restaurant|tasting|flavor|plaza/.test(value)) return "food";
    if (/history|historic|heritage|old|palace|temple|museum|architecture|cathedral|roman|mughal|silk road|craft|medina|walls|castle|fort/.test(value)) return "landmark";
    return "neighborhood";
  };
  const buildExpandedContent = ({ city, country, name, guide, hero, existingFact = "" }) => {
    const countryGuide = getCountryGuide(country);
    const countryBestFor = String(countryGuide.cards?.[0]?.[1] || "local highlights and practical exploring").replace(/\.$/, "").toLowerCase();
    const countryTiming = String(countryGuide.cards?.[2]?.[1] || "Build the route around the season, local opening times, and the activities that matter most to you").replace(/\.$/, "");
    const heroCopy = isPlaceholderCopy(hero?.copy) ? "" : String(hero.copy).trim();
    const normalizedFact = String(existingFact || "").trim();
    const contextText = `${heroCopy} ${normalizedFact}`.toLowerCase();
    const visualTheme = getVisualTheme(contextText.trim() || countryBestFor);
    const areas = getAreas(city, name, guide, visualTheme);
    const areaOne = areas[0] || "City center";
    const areaTwo = areas[1] || "Historic area";
    const areaThree = areas[2] || "Waterfront or market district";
    const helperHighlights = getHelperList("getDayHighlights", name, areas);
    const helperNotes = getHelperList("getDayNotes", name, areas);
    const usefulHighlights = helperHighlights.filter((item) => !isGenericHighlight(item));
    const contextualActivities = [];
    if (/beach|coast|coastal|sea|island|ocean|reef|lagoon|shore|bay|coral|tropical/.test(contextText)) {
      contextualActivities.push(`${name} beach or shoreline day`, `A water-based outing near ${name}`, `Sunset by the water`);
    } else if (/river|canal/.test(contextText)) {
      contextualActivities.push(`A riverfront or canal walk in ${name}`, `A waterside lunch in ${name}`, `A boat or ferry ride`);
    } else if (/lake/.test(contextText)) {
      contextualActivities.push(`A lakeside walk near ${name}`, `A scenic lake outing`, `Sunset by the water`);
    } else if (/waterfront|harbor|port/.test(contextText)) {
      contextualActivities.push(`${name} harbor or waterfront walk`, `A waterside meal in ${name}`, `A sunset view by the water`);
    }
    if (/history|historic|heritage|old|palace|temple|market|museum|architecture|cathedral|roman|mughal|silk road|craft|street|medina|canal|walls|castle|fort/.test(contextText)) {
      contextualActivities.push(`${name} historic center or old town`, `A major museum, palace, temple, or heritage site`, `A local market or craft district`);
    }
    if (/food|meal|coffee|cafe|market|wine|dinner|bakery|culinary|restaurant|tasting|flavor|plaza/.test(contextText)) {
      contextualActivities.push(`A market breakfast in ${name}`, `A food-first neighborhood walk`, `A long local lunch`);
    }
    if (/mountain|alpine|scenic|outdoor|hiking|forest|park|landscape|rainforest|volcanic|desert|wildlife|safari|fjord|glacier|expedition|iceberg|polar|penguin/.test(contextText)) {
      contextualActivities.push(`A scenic viewpoint or nature day from ${name}`, `A park, trail, or landscape outing`, `A slower morning outdoors`);
    }
    if (/wine|vineyard|winery/.test(contextText)) {
      contextualActivities.push(`A nearby vineyard or tasting day`, `A long lunch with regional food`);
    }
    const fallbackActivities = {
      water: [`${name} shoreline or waterfront walk`, `A boat or coastal outing near ${name}`, `A sunset view by the water`, `A local market near ${name}`, `A scenic walk with room to linger`, `A nearby beach or island day`],
      nature: [`A scenic viewpoint near ${name}`, `A guided nature or wildlife outing`, `A landscape experience shaped by the weather`, `An easy outdoor walk near ${name}`, `A local village or cultural stop`, `A flexible day outdoors`],
      food: [`A local market in ${name}`, `A neighborhood food walk`, `A signature meal from ${country}`, `A cafe or bakery near ${areaThree}`, `A cooking or tasting experience`, `A nearby day trip from ${name}`],
      landmark: [`${name} historic center or old town`, `A major museum, palace, temple, or heritage site`, `A local market or craft district`, `A neighborhood walk through ${areaTwo}`, `A second museum or cultural stop`, `A nearby day trip from ${name}`],
      neighborhood: [`A neighborhood walk in ${name}`, `A local market, food hall, or shopping street`, `${name} waterfront, park, or main viewpoint`, `A museum or cultural stop in ${name}`, `A local meal near ${areaTwo}`, `A nearby day trip from ${name}`]
    };
    const attractionItems = uniqueList(
      contextualActivities,
      usefulHighlights,
      asList(guide?.highlights),
      fallbackActivities[visualTheme] || fallbackActivities.neighborhood
    ).slice(0, 6);
    const reasonToGo = heroCopy || normalizedFact || `${name} is a strong fit for ${countryBestFor}, with ${areaOne}, ${areaTwo}, and ${areaThree} giving the trip a clear starting shape.`;
    const planningTip = normalizedFact || `${name} works best when the trip stays focused around ${areaOne} and ${areaTwo}, with enough room for the local food and experiences that make ${name} feel different from a checklist stop.`;
    const foodThemes = {
      water: [`Fresh seafood or local catch near ${areaOne}`, `A waterfront market in ${areaTwo}`, `A relaxed meal near the shore`, `A local specialty from ${country}`, `An easy lunch between ${attractionItems[0]} and ${attractionItems[1]}`, `A sunset dinner with a view`],
      nature: [`A regional meal near ${areaOne}`, `A lodge, village, or trailhead dinner`, `A local specialty from ${country}`, `A simple lunch between outdoor stops`, `A warm drink after a day outside`, `A meal with a view of the landscape`],
      food: [`A local market in ${areaOne}`, `A food-focused walk through ${areaTwo}`, `A signature dinner from ${country}`, `A cafe or bakery near ${areaThree}`, `A tasting or cooking experience`, `A neighborhood table away from the busiest sights`],
      landmark: [`Local specialties near ${areaOne}`, `A market or food hall in ${areaTwo}`, `A dinner that reflects ${country}`, `A cafe near ${areaThree}`, `An easy lunch between ${attractionItems[0]} and ${attractionItems[1]}`, `A neighborhood table away from the busiest sights`],
      neighborhood: [`Local specialties near ${areaOne}`, `A market or food hall in ${areaTwo}`, `A dinner that reflects ${country}`, `A cafe or bakery near ${areaThree}`, `An easy lunch between ${attractionItems[0]} and ${attractionItems[1]}`, `A neighborhood table away from the busiest sights`]
    };
    const foodItems = uniqueList(foodThemes[visualTheme] || foodThemes.neighborhood).slice(0, 6);
    const starterGuide = {
      city,
      title: name,
      summary: reasonToGo,
      highlights: attractionItems.slice(0, 4),
      areas,
      tip: planningTip
    };
    const detail = {
      bestAttractions: attractionItems,
      bestRestaurants: foodItems,
      bestBudget: uniqueList({
        water: [`Public shoreline or waterfront walk near ${areaOne}`, `A local market meal in ${areaTwo}`, `Self-guided beach or harbor time`, `A scenic stop that does not need a ticket`, `A relaxed neighborhood afternoon in ${areaThree}`, `A flexible weather backup`],
        nature: [`A short trail or viewpoint near ${areaOne}`, `Low-cost time outdoors near ${areaTwo}`, `A picnic or simple local meal`, `A public lookout or scenic drive`, `A flexible weather backup`, `A low-pressure nature day`],
        food: [`A self-guided market walk in ${areaOne}`, `A low-cost local meal in ${areaTwo}`, `Free neighborhood wandering`, `A public square or viewpoint near ${areaThree}`, `A casual cafe stop`, `A market breakfast`],
        landmark: [`Free walking route through ${areaOne}`, `A public square or viewpoint near ${areaTwo}`, `A market meal in ${areaThree}`, `Self-guided time around ${attractionItems[0]}`, `A local neighborhood afternoon`, `Free museum or public garden time when available`],
        neighborhood: [`Free or low-cost walk through ${areaOne}`, `A public park or viewpoint near ${areaTwo}`, `A market meal in ${areaThree}`, `Self-guided time around ${attractionItems[0]}`, `A local neighborhood afternoon`, `A scenic stop that does not need a ticket`]
      }[visualTheme] || []).slice(0, 6),
      bestLuxury: uniqueList({
        water: [`A private boat or coastal outing`, `A standout meal near ${areaOne}`, `A polished stay near ${areaTwo}`, `A private transfer for ${attractionItems[0]}`, `A special evening by the water`, `A tailored local experience`],
        nature: [`A private guide for ${attractionItems[0]}`, `A comfortable stay near ${areaOne}`, `A special landscape outing`, `A private transfer between outdoor highlights`, `A lodge or scenic stay near ${areaTwo}`, `A slower day with a local guide`],
        food: [`A destination-led dinner in ${areaOne}`, `A private food walk or cooking class`, `A polished stay near ${areaTwo}`, `A special evening around ${attractionItems[1]}`, `A private transfer for a day trip`, `A tailored local experience`],
        landmark: [`Private guide for ${attractionItems[0]}`, `A destination-led dinner in ${areaOne}`, `A polished stay near ${areaTwo}`, `A private transfer between highlights`, `A special evening around ${attractionItems[1]}`, `A tailored food or culture experience`],
        neighborhood: [`Private guide for ${attractionItems[0]}`, `A destination-led dinner in ${areaOne}`, `A polished stay near ${areaTwo}`, `A slower day with a local driver`, `A special evening around ${attractionItems[1]}`, `A tailored food or culture experience`]
      }[visualTheme] || []).slice(0, 6),
      bestCouples: uniqueList(
        [`Sunset near ${areaTwo}`, `A scenic outing built around ${attractionItems[1]}`, `A long local dinner`, `A slow morning in ${areaThree}`, `A photo-friendly walk through ${areaOne}`, `A memorable day trip from ${name}`]
      ).slice(0, 6),
      bestKids: uniqueList({
        nature: [`An easy first outdoor stop near ${areaOne}`, `A family-friendly nature outing`, `A short scenic stop with room to move`, `A relaxed meal near ${areaTwo}`, `A wildlife or landscape experience`, `A low-pressure weather backup`],
        water: [`An easy first stop near ${areaOne}`, `A family-friendly beach or boat outing`, `A market or food hall everyone can browse`, `A relaxed meal near ${areaTwo}`, `A short waterfront walk`, `A low-pressure weather backup`],
        food: [`An easy first stop near ${areaOne}`, `A family-friendly market walk`, `A food hall everyone can browse`, `A relaxed meal near ${areaTwo}`, `A short neighborhood walk`, `A low-pressure afternoon`],
        landmark: [`An easy first stop at ${attractionItems[0]}`, `A family-friendly outing near ${areaTwo}`, `A market or food hall everyone can browse`, `A relaxed meal close to ${areaThree}`, `A short scenic stop with room to move`, `A low-pressure day around ${areaOne}`],
        neighborhood: [`An easy first stop at ${attractionItems[0]}`, `A family-friendly outing near ${areaTwo}`, `A market or food hall everyone can browse`, `A relaxed meal close to ${areaThree}`, `A short scenic stop with room to move`, `A low-pressure day around ${areaOne}`]
      }[visualTheme] || []).slice(0, 6),
      bestSolo: uniqueList({
        nature: [`An early outdoor start near ${areaOne}`, `A guided nature or wildlife outing`, `A self-guided walk near ${areaTwo}`, `A quiet scenic break in ${areaThree}`, `A local meal after the day's main outing`, `A flexible afternoon outdoors`],
        water: [`An early walk near ${areaOne}`, `A boat or shoreline outing`, `A self-guided walk through ${areaTwo}`, `A quiet cafe or waterside break`, `A local meal near ${areaThree}`, `A flexible afternoon by the water`],
        food: [`An early visit to ${attractionItems[0]}`, `${areaOne} market or cafe`, `A self-guided food walk through ${areaTwo}`, `A local class or tasting`, `A people-watching break in ${areaThree}`, `A flexible afternoon with one clear anchor`],
        landmark: [`An early visit to ${attractionItems[0]}`, `${areaOne} cafe or market`, `A self-guided walk through ${areaTwo}`, `A local class, museum, or food stop`, `A people-watching break in ${areaThree}`, `A flexible day with one clear anchor`],
        neighborhood: [`An early visit to ${attractionItems[0]}`, `${areaOne} cafe or market`, `A self-guided walk through ${areaTwo}`, `A local class, museum, or food stop`, `A people-watching break in ${areaThree}`, `A flexible day with one clear anchor`]
      }[visualTheme] || []).slice(0, 6),
      bestFirstTimers: attractionItems.slice(0, 6),
      bestUnique: uniqueList(
        usefulHighlights,
        [`A quieter side of ${areaThree}`, `A local recommendation beyond the headline sights`, `A less obvious side of ${name}`, `A seasonal experience in ${country}`, `A short detour beyond ${areaOne}`, `An off-peak version of ${attractionItems[0]}`]
      ).slice(0, 6),
      bestBreakfast: [`Morning cafe near ${areaOne}`, `${areaTwo} bakery or market`, `Slow breakfast before ${attractionItems[0]}`, `Coffee and a walk through ${areaThree}`],
      bestLunch: [`Casual local lunch near ${areaOne}`, `Market meal around ${areaTwo}`, `Lunch between ${attractionItems[0]} and ${attractionItems[1]}`, `A long midday meal in ${areaThree}`],
      bestDinner: [`A local dinner in ${areaOne}`, `A local specialty from ${country} near ${areaTwo}`, `A memorable table close to ${areaThree}`, `A slower final-night meal away from the busiest sights`],
      bestCocktails: [`Sunset drinks near ${areaOne}`, `A local bar around ${areaTwo}`, `A view-led evening near ${areaThree}`, `A relaxed night close to the stay`],
      bestBakeries: [`Local bakery near ${areaOne}`, `${areaTwo} morning market`, `Coffee and pastry before ${attractionItems[0]}`, `A regional sweet to take on the road`],
      bestCoffee: [`Coffee near ${areaOne}`, `A slow cafe in ${areaTwo}`, `A neighborhood coffee stop in ${areaThree}`, `A final cup before the next stop`]
    };
    const timingNote = helperNotes[1] || countryTiming;
    const firstAnchor = attractionItems[0] || `${name} first-timer highlights`;
    const toolkit = [
      { label: "When it works best", value: "Match the season to your main plans", copy: timingNote },
      { label: "Where to stay", value: `${areaOne}, ${areaTwo}, or a nearby base`, copy: `Start with ${areaOne} when you want the easiest access to the first few days, then use ${areaTwo} or ${areaThree} when the mood of the trip calls for something different.` },
      { label: "Getting around", value: `Group days around ${areaOne} and ${areaTwo}`, copy: planningTip },
      { label: "Book early", value: `${firstAnchor} and one food experience`, copy: `Protect the moments that define ${name}, then leave room for meals, weather changes, and local recommendations.` }
    ];
    return { guide: starterGuide, detail, toolkit, reasonToGo, visualTheme };
  };

  data.destinationCoverage = data.destinationCoverage || {};
  data.cityGuideData = data.cityGuideData || [];
  data.cityGuideDetailData = data.cityGuideDetailData || {};
  data.cityPlanningToolkitData = data.cityPlanningToolkitData || {};
  data.destinationFacts = data.destinationFacts || {};
  data.destinationHeroData = data.destinationHeroData || {};
  data.destinationAliases = data.destinationAliases || {};

  normalizeLoadedDestinationData();

  const existingFactFor = (city, name, guide) => {
    const direct = String(data.destinationFacts?.[city] || "").trim();
    if (direct) return direct;
    const guideTip = String(guide?.tip || "").trim();
    if (guideTip) return guideTip;
    const uniqueCity = cityLabelsByName.get(comparable(name));
    return uniqueCity?.size === 1 ? String(data.destinationFacts?.[name] || "").trim() : "";
  };

  const allSuggestions = Object.entries(data.countrySuggestions || {}).flatMap(([country, cities]) => cities.map((city) => ({ country, city })));

  allSuggestions.forEach(({ country, city }) => {
    const name = cityName(city);
    const existingGuide = data.cityGuideData.find((item) => item.city === city);
    const hasDevelopedContent = Boolean(data.cityGuideDetailData[city]);
    const existingHero = data.destinationHeroData[city] || {};

    data.destinationHeroData[city] = existingHero.image || existingHero.title || existingHero.copy
      ? { image: existingHero.image || "", title: existingHero.title || existingGuide?.title || name, copy: existingHero.copy || existingGuide?.summary || `A visual starting point for ${name}.` }
      : { image: "", title: existingGuide?.title || name, copy: existingGuide?.summary || `A visual starting point for ${name}.` };

    if (hasDevelopedContent) {
      data.destinationCoverage[city] = { status: "developed", country, title: name };
      return;
    }

    const existingFact = existingFactFor(city, name, existingGuide);
    const expanded = buildExpandedContent({ city, country, name, guide: existingGuide, hero: data.destinationHeroData[city], existingFact });
    if (existingGuide) Object.assign(existingGuide, expanded.guide);
    else data.cityGuideData.push(expanded.guide);
    data.cityGuideDetailData[city] = expanded.detail;
    data.cityPlanningToolkitData[city] = expanded.toolkit;
    data.destinationFacts[city] = data.destinationFacts[city] || expanded.reasonToGo;
    data.destinationAliases[compact(city)] = city;
    data.destinationHeroData[city] = {
      ...data.destinationHeroData[city],
      title: name,
      copy: expanded.guide.summary,
      visualTheme: expanded.visualTheme
    };
    data.destinationCoverage[city] = { status: "expanded", contentTier: "generated", country, title: name, needsEditorialReview: true };
  });

  rebuildDestinationAliases();

  const knownCityKeys = () => new Set((data.cityGuideData || []).map((item) => item.city));
  const resolveDestination = (value) => {
    const input = String(value || "").trim();
    if (!input) return { input, canonical: "", covered: false, kind: "unknown", suggestions: [] };
    const aliases = data.destinationAliases || {};
    const inputKey = compact(input);
    const canonical = aliases[inputKey] || normalizeCountryName(input);
    const ambiguousCities = cityLabelsByName.get(inputKey);
    if (!aliases[inputKey] && ambiguousCities?.size > 1) {
      return { input, canonical: input, covered: false, kind: "ambiguous", suggestions: [...ambiguousCities].slice(0, 6) };
    }
    const cities = knownCityKeys();
    if (cities.has(canonical)) return { input, canonical, covered: true, kind: "city", suggestions: [] };
    if (data.countrySuggestions?.[canonical] || data.countryGuideData?.[canonical]) {
      return { input, canonical, covered: true, kind: "country", suggestions: (data.countrySuggestions?.[canonical] || []).slice(0, 6) };
    }
    const query = compact(input);
    const suggestions = query.length < 2
      ? []
      : [...cities].filter((city) => compact(city).startsWith(query) || compact(city).includes(query)).slice(0, 6);
    return { input, canonical, covered: false, kind: "unknown", suggestions };
  };

  function renderCoverageBanner(verdict, mountSelector) {
    const mount = document.querySelector(mountSelector);
    if (!mount) return;
    const existing = mount.querySelector("#hb-coverage-banner");
    if (existing) existing.remove();
    if (verdict.covered) return;

    const banner = document.createElement("aside");
    banner.id = "hb-coverage-banner";
    banner.className = "hb-coverage-banner";
    banner.setAttribute("role", "status");
    const title = document.createElement("p");
    title.className = "hb-coverage-title";
    const ambiguous = verdict.kind === "ambiguous";
    title.textContent = ambiguous
      ? `Choose a country for ${verdict.canonical || "that destination"}`
      : `No guide data for ${verdict.canonical || "that destination"} yet`;
    const copy = document.createElement("p");
    copy.className = "hb-coverage-copy";
    if (ambiguous) {
      copy.textContent = `There is more than one place with that name. Choose a city and country so we can use the right local ideas in your plan: ${verdict.suggestions.join(", ")}.`;
    } else {
      const nearest = verdict.suggestions.length ? ` Closest guides we have: ${verdict.suggestions.slice(0, 3).join(", ")}.` : "";
      copy.textContent = `We can still build the dates, pacing, and shape of the trip, but places and neighborhood ideas will be general until local guide content is available.${nearest}`;
    }
    banner.append(title, copy);
    mount.prepend(banner);
  }

  window.HB_COVERAGE = {
    resolveDestination,
    isCovered: (value) => resolveDestination(value).covered,
    renderCoverageBanner,
    normalizeCountryName,
    normalizeCityLabel
  };

  if (typeof document !== "undefined") {
    document.addEventListener("hb:destination-changed", (event) => {
      renderCoverageBanner(resolveDestination(event.detail?.destination), "#build-panel > div");
    });
    document.addEventListener("hb:trip-rendered", (event) => {
      renderCoverageBanner(resolveDestination(event.detail?.destination), "#trip-panel > div");
    });
  }
})();
