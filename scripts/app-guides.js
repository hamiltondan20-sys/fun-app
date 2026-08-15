(() => {
const { state: hbState, data: hbData, refs: hbRefs, utils: hbUtils } = window.HB_APP;
const {
  getDestinationHero,
  applyHeroOverlay,
  getCountryGuide,
  getGuideHero,
  isPlaceholderImage,
  buildEditorialCardArt,
  resolvePrototypeImage,
  slugifyCity,
  findCityBySlug,
  slugifyCountry,
  findCountryBySlug,
  getGuideCountryForCity,
  getCountryRegion,
  getCitiesForCountry,
  getCountryHero
} = hbUtils;
const { countrySuggestions } = hbData;

function normalizeLookupValue(value) {
      return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    function resolveCanonicalDestination(value) {
      const normalized = normalizeLookupValue(value);
      return hbData.destinationAliases[normalized] || "";
    }

function renderDestinationHero(targetPrefix) {
      const hero = getDestinationHero();
      const image = document.getElementById(`${targetPrefix}-hero-image`);
      const title = document.getElementById(`${targetPrefix}-hero-title`);
      const copy = document.getElementById(`${targetPrefix}-hero-copy`);
      if (!image || !title || !copy) return;

      image.src = hero.image;
      image.alt = `${hero.title} destination image`;
      title.textContent = hero.title;
      copy.textContent = hero.copy;
      applyHeroOverlay(image.closest(".destination-hero"), hbState.appState.destination, hero.overlay || "balanced");
    }

    function renderCountryGuide(targetPrefix) {
      const guide = getCountryGuide();
      const title = document.getElementById(`${targetPrefix}-guide-title`);
      const summary = document.getElementById(`${targetPrefix}-guide-summary`);
      const grid = document.getElementById(`${targetPrefix}-guide-grid`);
      if (!title || !summary || !grid) return;

      const tripCardLabelMap = {
        "Best for": "Works especially well when",
        "What stands out": "What tends to stand out",
        "Good to remember": "Good to know"
      };

      title.textContent = guide.title;
      summary.textContent = guide.summary;
      grid.innerHTML = guide.cards.map(([label, copy]) => `
        <div class="${targetPrefix === "trip" ? "trip-guide-card" : "rounded-2xl border border-line bg-white px-4 py-4"}">
          <p class="${targetPrefix === "trip" ? "trip-guide-card-label" : "text-xs font-semibold uppercase tracking-[0.14em] text-muted"}">${targetPrefix === "trip" ? (tripCardLabelMap[label] || label) : label}</p>
          <p class="${targetPrefix === "trip" ? "trip-guide-card-copy" : "mt-2 text-sm leading-6 text-ink"}">${copy}</p>
        </div>
      `).join("");
    }

    function buildCityGuideLead(summary) {
      const cleaned = summary.replace(/^Best for\s+/i, "").trim();
      if (!cleaned) return summary;
      const normalized = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
      return `The city is known for ${normalized}`;
    }

    function getCityEditorialPage(city) {
      return hbData.cityEditorialPageData?.[city] || null;
    }

    function getEditorialDek(city, guide) {
      return getCityEditorialPage(city)?.dek || buildCityGuideLead(guide.summary);
    }

    function getEditorialIntro(city, guide) {
      return getCityEditorialPage(city)?.intro || [
        `${guide.title} is easiest to enjoy when the trip is built around what the city genuinely does well instead of trying to fit everything into one pass.`,
        `The strongest version of ${guide.title} usually balances its most recognizable highlights with enough neighborhood time, food, and breathing room to make the city feel real.`
      ];
    }

    function getEditorialTrustCopy(city, guide) {
      return getCityEditorialPage(city)?.trust || `This page is meant to help travelers understand what to prioritize in ${guide.title}, what fits the city's rhythm, and what tends to make the trip feel clearer once planning begins.`;
    }

    function getEditorialSummaryCards(city, guide) {
      return getCityEditorialPage(city)?.summaryCards || [
        ["Best for", buildCityGuideLead(guide.summary).replace(/^The city is known for /, "").replace(/\.$/, "")],
        ["Known highlights", guide.highlights.join(" • ")],
        ["How to plan it", guide.tip]
      ];
    }

    function getPlanningToolkitIcon(label) {
      if (/when/i.test(label)) return "event_available";
      if (/stay/i.test(label)) return "hotel";
      if (/getting|around/i.test(label)) return "route";
      if (/book/i.test(label)) return "bookmark_check";
      return "travel_explore";
    }

    function getCityPlanningToolkit(city, guide) {
      const customToolkit = hbData.cityPlanningToolkitData?.[city];
      if (customToolkit?.length) return customToolkit;
      const cityName = guide.title;
      const bestFor = buildCityGuideLead(guide.summary).replace(/^The city is known for /, "").replace(/\.$/, "");
      const highlights = guide.highlights.slice(0, 2).join(" and ");
      return [
        {
          label: "When it works best",
          value: "Match the season to the trip style",
          copy: `${cityName} is easiest to plan when weather, crowds, and the traveler's preferred pace are treated as part of the itinerary.`
        },
        {
          label: "Where to stay",
          value: "Base near the strongest trip area",
          copy: `Pick a stay that supports this trip style: ${bestFor}. Avoid choosing only by lowest price or a generic central label.`
        },
        {
          label: "Getting around",
          value: "Group the day by area",
          copy: guide.tip
        },
        {
          label: "Book early",
          value: highlights || "The moments that matter most",
          copy: "Protect the attractions, meals, or experiences that would change the trip if they were missed."
        }
      ];
    }

    function joinGuideItems(items, fallback) {
      const list = Array.isArray(items) ? items.filter(Boolean) : [];
      if (!list.length) return fallback;
      if (list.length === 1) return list[0];
      return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
    }

    function getGuideSignalText(...parts) {
      return parts
        .flatMap((part) => Array.isArray(part) ? part : [part])
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
    }

    function addGuideStyleSignal(styles, value) {
      if (!value || styles.includes(value) || styles.length >= 3) return;
      styles.push(value);
    }

    function inferGuideStyles(guide, details = {}) {
      const styles = [];
      const text = getGuideSignalText(
        guide?.summary,
        guide?.tip,
        guide?.highlights,
        details.bestAttractions,
        details.bestRestaurants,
        details.bestDinner,
        details.bestUnique,
        details.bestFirstTimers
      );

      if (/food|restaurant|dinner|lunch|market|bakery|coffee|meal|street food|tapas/.test(text)) {
        addGuideStyleSignal(styles, "Foodie");
      }
      if (/history|museum|landmark|palace|temple|imperial|ancient|church|cathedral|cultural/.test(text)) {
        addGuideStyleSignal(styles, "Historical");
      }
      if (/beach|relax|slow|scenic|park|garden|river|canal|seine|sunset|resort|romantic/.test(text)) {
        addGuideStyleSignal(styles, "Relaxing");
      }
      if (/adventure|nightlife|high-energy|viewpoint|hike|excursion|district|exploring|movement/.test(text)) {
        addGuideStyleSignal(styles, "Adventurous");
      }
      if (/unique|hidden|local|neighborhood|market|wandering|covered passages|design|bookshop/.test(text)) {
        addGuideStyleSignal(styles, "Unique");
      }

      if (!styles.length) {
        addGuideStyleSignal(styles, "Relaxing");
        addGuideStyleSignal(styles, "Foodie");
      }

      return styles;
    }

    function inferGuidePace(guide) {
      const text = getGuideSignalText(guide?.summary, guide?.tip);
      if (/beach|resort|relax|slow|fewer|lighter|room|calm|separate/.test(text)) return "Easygoing";
      if (/nightlife|high-energy|structured|big landmarks|major cultural sights|efficient|packed/.test(text)) return "Packed";
      return "Balanced";
    }

    function buildCityGuideSignals(guide) {
      const details = hbData.cityGuideDetailData[guide.city] || {};
      const firstTimerPicks = (details.bestFirstTimers || details.bestAttractions || guide.highlights || []).slice(0, 2);
      const foodPick = (details.bestDinner || details.bestRestaurants || details.bestLunch || [])[0];
      const mustHaveItems = [...firstTimerPicks, foodPick].filter(Boolean).slice(0, 3);
      const mustHaves = joinGuideItems(mustHaveItems, guide.highlights?.[0] || guide.title);

      return {
        styles: inferGuideStyles(guide, details),
        pace: inferGuidePace(guide),
        mustHaves,
        mustHaveItems,
        planningNote: guide.tip || `Keep the ${guide.title} plan grouped by area so the days feel easier to follow.`
      };
    }

    function buildCountryGuideSignals(country, guide) {
      const cities = getCitiesForCountry(country);
      const firstCity = cities[0]?.title || country;
      const textGuide = {
        summary: `${guide.summary} ${(guide.cards || []).map((card) => card[1]).join(" ")}`,
        tip: guide.cards?.[2]?.[1] || guide.summary
      };

      return {
        styles: inferGuideStyles(textGuide),
        pace: inferGuidePace(textGuide),
        mustHaves: firstCity,
        mustHaveItems: [firstCity],
        planningNote: guide.cards?.[2]?.[1] || "Use the country guide to choose the first city, then keep the route practical."
      };
    }

    function getDestinationDepthIcon(label) {
      if (/trip length/i.test(label)) return "calendar_month";
      if (/base/i.test(label)) return "hotel";
      if (/priority/i.test(label)) return "star";
      if (/food/i.test(label)) return "restaurant";
      if (/budget/i.test(label)) return "payments";
      if (/watch/i.test(label)) return "visibility";
      return "travel_explore";
    }

    function inferDestinationTripLength(guide, details) {
      const editorialLength = getEditorialSummaryCards(guide.city, guide)
        .find(([label]) => /ideal trip length/i.test(label))?.[1];
      if (editorialLength) return editorialLength;

      const attractionCount = [
        ...(details.bestAttractions || []),
        ...(details.bestUnique || []),
        ...(details.bestFirstTimers || [])
      ].filter(Boolean).length;

      if (attractionCount >= 9) return "4 to 5 days gives the trip enough space for classics, meals, and one slower neighborhood day.";
      return "3 to 4 days is usually enough for a strong first version without overfilling the schedule.";
    }

    function buildDestinationDepthCards(city, guide, details) {
      const toolkit = getCityPlanningToolkit(city, guide);
      const highlights = guide.highlights || [];
      const bestRestaurants = joinGuideItems((details.bestDinner || details.bestRestaurants || []).slice(0, 2), "one stronger dinner");
      const budgetPicks = joinGuideItems((details.bestBudget || details.bestUnique || []).slice(0, 2), "walkable free time and casual food");
      const firstTimerPicks = joinGuideItems((details.bestFirstTimers || details.bestAttractions || highlights).slice(0, 2), highlights[0] || guide.title);
      const uniquePicks = joinGuideItems((details.bestUnique || details.bestSolo || []).slice(0, 2), highlights[1] || "one local-feeling stop");
      const stayToolkit = toolkit.find((item) => /stay/i.test(item.label));
      const routeToolkit = toolkit.find((item) => /getting|around/i.test(item.label));
      const bookToolkit = toolkit.find((item) => /book/i.test(item.label));

      return [
        {
          label: "Trip length",
          value: "Give the city enough room",
          copy: inferDestinationTripLength(guide, details),
          chips: [guide.title, "First draft", "Pacing"]
        },
        {
          label: "Best base",
          value: stayToolkit?.value || "Stay near the strongest trip area",
          copy: stayToolkit?.copy || `A good base should support ${buildCityGuideLead(guide.summary).replace(/^The city is known for /, "").replace(/\.$/, "")}, not just look central on a map.`,
          chips: highlights.slice(0, 3)
        },
        {
          label: "Priority picks",
          value: firstTimerPicks,
          copy: `For a first trip, these should usually be protected before adding extra stops: ${firstTimerPicks}.`,
          chips: (details.bestAttractions || highlights).slice(0, 3)
        },
        {
          label: "Food strategy",
          value: bestRestaurants,
          copy: `Use food as a planning anchor. A meal like ${bestRestaurants} can make the day feel more specific and easier to remember.`,
          chips: (details.bestDinner || details.bestRestaurants || []).slice(0, 3)
        },
        {
          label: "Budget angle",
          value: budgetPicks,
          copy: `A lower-cost version should lean into ${budgetPicks}, then save paid upgrades for the experience that matters most.`,
          chips: (details.bestBudget || []).slice(0, 3)
        },
        {
          label: "Watch-outs",
          value: routeToolkit?.value || bookToolkit?.value || "Do not overbuild the day",
          copy: routeToolkit?.copy || bookToolkit?.copy || guide.tip,
          chips: [hbState.appState.pace || "Balanced", "Route logic", "Booking pressure"]
        }
      ];
    }

    function buildDestinationFitRows(city, guide, details) {
      const couples = joinGuideItems((details.bestCouples || []).slice(0, 2), "a scenic evening and one strong meal");
      const family = joinGuideItems((details.bestKids || []).slice(0, 2), "one easier family-friendly anchor");
      const adventurous = joinGuideItems((details.bestUnique || details.bestSolo || []).slice(0, 2), "a more local or unusual stop");

      return [
        {
          label: "Choose this city if",
          value: buildCityGuideLead(guide.summary).replace(/^The city is known for /, "").replace(/\.$/, "")
        },
        {
          label: "For couples or families",
          value: hbState.appState.children > 0 ? family : couples
        },
        {
          label: "For more depth",
          value: adventurous
        }
      ];
    }

    function getEditorialGallery(city, guide) {
      const editorial = getCityEditorialPage(city);
      if (editorial?.gallery?.length) {
        const hero = getGuideHero(city);
        const resolvedItems = editorial.gallery.map((item) => ({
          ...item,
          image: isPlaceholderImage(item.image)
            ? hero.image
            : resolvePrototypeImage(item.image, `${guide.title} ${item.title}`, "#2b5f8a")
        }));
        const imageCounts = resolvedItems.reduce((counts, item) => {
          counts[item.image] = (counts[item.image] || 0) + 1;
          return counts;
        }, {});
        return resolvedItems.map((item, index) => ({
          ...item,
          image: imageCounts[item.image] > 1
            ? buildEditorialCardArt(guide.title, item.title, item.copy, "#2b5f8a", index)
            : item.image
        }));
      }
      const hero = getGuideHero(city);
      return [
        {
          image: buildEditorialCardArt(guide.title, `${guide.title} first look`, `A strong opening image of ${guide.title}, built to make the destination feel real before the itinerary starts.`, "#2b5f8a", 0),
          title: `${guide.title} first look`,
          copy: `A strong opening image of ${guide.title}, built to make the destination feel real before the itinerary starts.`
        },
        {
          image: buildEditorialCardArt(guide.title, `${guide.title} neighborhood rhythm`, `The city usually becomes more enjoyable once the trip leaves room for its local pace, not just its headline attractions.`, "#2b5f8a", 1),
          title: `${guide.title} neighborhood rhythm`,
          copy: `The city usually becomes more enjoyable once the trip leaves room for its local pace, not just its headline attractions.`
        },
        {
          image: buildEditorialCardArt(guide.title, `${guide.title} standout moments`, `The best plans protect a few high-confidence highlights while still leaving room for the hours in between.`, "#2b5f8a", 2),
          title: `${guide.title} standout moments`,
          copy: `The best plans protect a few high-confidence highlights while still leaving room for the hours in between.`
        }
      ];
    }

    function getSectionIntro(city, label) {
      const editorial = getCityEditorialPage(city);
      return editorial?.sectionIntros?.[label] || `These ${label.toLowerCase()} picks are here to help travelers make choices that fit the city well instead of relying on generic lists.`;
    }

    function buildEditorialItemCopy(label, item, city) {
      const editorial = getCityEditorialPage(city);
      return editorial?.itemCopy?.[label]?.[item] || `${item} stands out in ${city.split(",")[0]} because it fits this part of the trip well and gives travelers a more concrete place to anchor the day.`;
    }

    function makeSectionId(label) {
      return `guide-section-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
    }

    function getSectionNavLabel(label) {
      return label.replace(/^Best /, "").replace(/^things to do /i, "").replace(/^for /i, "");
    }

    function getRelatedGuideCities(city) {
      const country = getGuideCountryForCity(city);
      const sameRegion = getCountryRegion(country);
      return hbData.cityGuideData
        .filter((item) => item.city !== city)
        .filter((item) => getCountryRegion(getGuideCountryForCity(item.city)) === sameRegion)
        .slice(0, 3);
    }

    function renderFeaturedCityGuides() {
      const container = document.getElementById("city-guides-featured");
      if (!container) return;
      const featuredCities = [
        "Paris, France",
        "New York, United States",
        "Tokyo, Japan",
        "London, United Kingdom",
        "Rome, Italy",
        "Bangkok, Thailand"
      ].map((city) => hbData.cityGuideData.find((item) => item.city === city)).filter(Boolean);

      container.innerHTML = `
        <div class="rounded-[24px] border border-line bg-white px-4 py-4 shadow-card">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Popular places to start</p>
              <h4 class="mt-1 font-display text-xl font-bold text-ink">A few cities to open first</h4>
              <p class="mt-2 text-sm leading-6 text-muted">If someone is just browsing, these are strong editorial pages to start with before narrowing down the trip.</p>
            </div>
            <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">Editor's picks</span>
          </div>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            ${featuredCities.map((guide) => {
              const hero = getGuideHero(guide.city);
              const country = getGuideCountryForCity(guide.city);
              const preview = getCityPreviewDepth(guide);
              return `
                <article class="guide-browser-card overflow-hidden rounded-[22px] border border-line bg-surface-card">
                  <div class="relative h-32 overflow-hidden border-b border-line">
                    <img class="h-full w-full object-cover" src="${hero.image}" alt="${guide.title} guide image" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 px-4 py-3 text-white">
                      <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">${country}</p>
                      <p class="mt-1 font-display text-xl font-bold">${guide.title}</p>
                    </div>
                  </div>
                  <div class="px-4 py-4">
                    <p class="text-sm leading-6 text-muted">${buildCityGuideLead(guide.summary)}</p>
                    <div class="mt-3 rounded-2xl bg-white px-4 py-4 ring-1 ring-line">
                      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${preview.label}</p>
                      <p class="mt-2 text-sm leading-6 text-ink">${preview.copy}</p>
                    </div>
                    <p class="mt-3 text-sm font-medium text-ink">${guide.highlights.join(" • ")}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-city-guide" data-city="${guide.city}" type="button">Open ${guide.title} guide</button>
                      <a class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-city-guide" data-city="${guide.city}" href="#build">Plan ${guide.title}</a>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    function getCityGuideSuggestions(query) {
      if (!query) return [];
      const normalized = query.trim().toLowerCase();
      const normalizedLookup = normalizeLookupValue(query);
      const canonicalMatch = resolveCanonicalDestination(query);
      if (!normalized) return [];

      const ranked = hbData.cityGuideData.map((guide) => {
        const country = getGuideCountryForCity(guide.city);
        const region = getCountryRegion(country);
        const title = guide.title.toLowerCase();
        const cityName = guide.city.toLowerCase();
        const titleLookup = normalizeLookupValue(guide.title);
        const cityLookup = normalizeLookupValue(guide.city);
        const highlights = guide.highlights.join(" ").toLowerCase();
        const summary = guide.summary.toLowerCase();
        let score = 0;

        if (title.startsWith(normalized)) score += 10;
        if (cityName.startsWith(normalized)) score += 9;
        if (title.includes(normalized)) score += 7;
        if (cityName.includes(normalized)) score += 6;
        if (normalizedLookup && (titleLookup.includes(normalizedLookup) || cityLookup.includes(normalizedLookup))) score += 6;
        if (canonicalMatch && canonicalMatch === guide.city) score += 12;
        if (country.toLowerCase().includes(normalized)) score += 4;
        if (region.toLowerCase().includes(normalized)) score += 2;
        if (highlights.includes(normalized)) score += 1;
        if (summary.includes(normalized)) score += 1;

        return { guide, country, score };
      }).filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.guide.title.localeCompare(b.guide.title))
        .slice(0, 6);

      return ranked;
    }

    function getPlanOnlyCitySuggestions(query) {
      if (!query) return [];
      const normalized = query.trim().toLowerCase();
      const normalizedLookup = normalizeLookupValue(query);
      const canonicalMatch = resolveCanonicalDestination(query);
      if (!normalized) return [];

      const guideCities = new Set(hbData.cityGuideData.map((guide) => guide.city));
      const cityOptions = hbData.destinationOptions.filter((option) => option.includes(",") && !guideCities.has(option));

      return cityOptions.map((city) => {
        const country = city.split(",").slice(-1)[0].trim();
        const cityName = city.split(",")[0].trim();
        const cityLower = city.toLowerCase();
        const cityNameLower = cityName.toLowerCase();
        const cityLookup = normalizeLookupValue(city);
        const cityNameLookup = normalizeLookupValue(cityName);
        let score = 0;

        if (cityNameLower.startsWith(normalized)) score += 10;
        if (cityLower.startsWith(normalized)) score += 9;
        if (cityNameLower.includes(normalized)) score += 7;
        if (cityLower.includes(normalized)) score += 6;
        if (normalizedLookup && (cityNameLookup.includes(normalizedLookup) || cityLookup.includes(normalizedLookup))) score += 6;
        if (canonicalMatch && canonicalMatch === city) score += 12;
        if (country.toLowerCase().includes(normalized)) score += 4;

        return { city, country, score };
      }).filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.city.localeCompare(b.city))
        .slice(0, 6);
    }

    function getCombinedCityGuideSuggestions() {
      const guideSuggestions = getCityGuideSuggestions(hbState.cityGuideSearchQuery).map(({ guide, country }) => ({
        type: "guide",
        city: guide.city,
        title: guide.title,
        country,
        meta: "Guide available",
        preview: guide.highlights.slice(0, 2).join(" • ")
      }));

      const planOnlySuggestions = getPlanOnlyCitySuggestions(hbState.cityGuideSearchQuery)
        .filter((item) => !guideSuggestions.some((guide) => guide.city === item.city))
        .slice(0, Math.max(0, 6 - guideSuggestions.length))
        .map(({ city, country }) => ({
          type: "plan",
          city,
          title: city.split(",")[0],
          country,
          meta: "Plan this city",
          preview: "No full editorial guide yet"
        }));

      return [...guideSuggestions, ...planOnlySuggestions];
    }

    function setCityGuideSuggestionIndex(nextIndex) {
      const suggestions = getCombinedCityGuideSuggestions();
      if (!suggestions.length) {
        hbState.cityGuideSuggestionIndex = -1;
        return;
      }
      const maxIndex = suggestions.length - 1;
      if (nextIndex < 0) {
        hbState.cityGuideSuggestionIndex = maxIndex;
      } else if (nextIndex > maxIndex) {
        hbState.cityGuideSuggestionIndex = 0;
      } else {
        hbState.cityGuideSuggestionIndex = nextIndex;
      }
      renderCityGuideSuggestions();
    }

    function applyCityGuideSuggestionSelection(index = hbState.cityGuideSuggestionIndex) {
      const suggestions = getCombinedCityGuideSuggestions();
      const selected = suggestions[index];
      if (!selected) return;

      if (selected.type === "guide") {
        const searchInput = document.getElementById("city-guides-search");
        if (searchInput) searchInput.value = selected.city;
        hbState.cityGuideSearchQuery = selected.city;
        hbState.cityGuideSuggestionIndex = -1;
        hbState.selectedGuideCity = selected.city;
        renderCityGuideDetail(selected.city);
        hbUtils.setActivePanel("editorial-guide-panel");
        return;
      }

      hbRefs.formBindings.destination.value = selected.city;
      hbUtils.updateStateFromInputs();
      hbState.cityGuideSuggestionIndex = -1;
      renderCityGuidesLanding();
      hbUtils.setActivePanel("build-panel");
    }

    function renderCityGuideSuggestions() {
      const container = document.getElementById("city-guides-search-suggestions");
      if (!container) return;
      const suggestions = getCombinedCityGuideSuggestions();

      if (!hbState.cityGuideSearchQuery || !suggestions.length) {
        container.classList.add("hidden");
        container.innerHTML = "";
        hbState.cityGuideSuggestionIndex = -1;
        return;
      }

      container.innerHTML = suggestions.map((item, index) => `
        <button
          class="flex w-full items-start justify-between gap-3 rounded-2xl px-3 py-3 text-left transition ${index === hbState.cityGuideSuggestionIndex ? "bg-surface-soft" : "hover:bg-surface-soft"}"
          data-action="${item.type === "guide" ? "open-city-guide" : "use-city-guide"}"
          data-city="${item.city}"
          data-suggestion-index="${index}"
          type="button"
        >
          <span>
            <span class="block text-sm font-semibold text-ink">${item.title}</span>
            <span class="mt-1 block text-xs uppercase tracking-[0.14em] text-muted">${item.country}</span>
            <span class="mt-2 block text-sm leading-6 text-muted">${item.preview}</span>
          </span>
          <span class="mt-1 shrink-0 text-xs font-medium ${item.type === "guide" ? "text-secondary" : "text-primary"}">${item.meta}</span>
        </button>
      `).join("");
      container.classList.remove("hidden");
    }

    function buildActiveContextMarkup(type) {
      const searchQuery = type === "city" ? hbState.cityGuideSearchQuery.trim() : hbState.countryGuideSearchQuery.trim();
      const regionFilter = type === "city" ? hbState.cityGuideRegionFilter : hbState.countryGuideRegionFilter;
      const chips = [];

      if (searchQuery) {
        chips.push(`
          <button class="active-context-chip" data-action="clear-${type}-guide-search" type="button">
            <span>${searchQuery}</span>
            <span aria-hidden="true">x</span>
          </button>
        `);
      }

      if (regionFilter && regionFilter !== "all") {
        chips.push(`
          <button class="active-context-chip" data-action="clear-${type}-guide-region" type="button">
            <span>${regionFilter}</span>
            <span aria-hidden="true">x</span>
          </button>
        `);
      }

      if (!chips.length) return "";

      return `
        <div class="mt-3 flex flex-wrap gap-2">
          ${chips.join("")}
        </div>
      `;
    }

    function getCityPreviewDepth(guide) {
      const details = hbData.cityGuideDetailData[guide.city];
      const bestFor = buildCityGuideLead(guide.summary).replace(/^The city is known for /, "").replace(/\.$/, "");
      const standout = details?.bestFirstTimers?.[0] || guide.highlights[0] || guide.title;
      return {
        label: "The city is known for",
        copy: bestFor,
        standout
      };
    }

    function getCountryPreviewDepth(country, guide) {
      return {
        label: "The country is known for",
        copy: guide.cards[0]?.[1] || guide.summary,
        standout: getCitiesForCountry(country).slice(0, 2).map((item) => item.title).join(" • ") || "Country-wide planning"
      };
    }

    function buildCompareFitSummary(type, currentLabel, currentPreview, targetLabel, targetPreview) {
      if (type === "city") {
        return `${currentLabel} feels stronger for ${currentPreview.copy.toLowerCase()}, while ${targetLabel} leans more toward ${targetPreview.copy.toLowerCase()}.`;
      }
      return `${currentLabel} is a better fit if you want ${currentPreview.copy.toLowerCase()}, while ${targetLabel} makes more sense for ${targetPreview.copy.toLowerCase()}.`;
    }

    function getGuidePlanningVisual(context) {
      if (!context?.sourceType) {
        return {
          image: "",
          kicker: "Guide-led starting point",
          next: ""
        };
      }

      if (context.sourceType === "city") {
        const hero = getGuideHero(context.sourceLocation || context.sourceName || "");
        return {
          image: hero.image,
          kicker: "Guide-led starting point",
          next: `Next up: keep ${context.sourceName} as the destination, then tune dates, travelers, and budget before generating.`
        };
      }

      const hero = getCountryHero(context.sourceLocation || context.sourceName || "");
      return {
        image: hero.image,
        kicker: "Country-first starting point",
        next: `Next up: confirm the broader direction, then decide whether ${context.suggestedBase} should be the first city this trip builds around.`
      };
    }

    function buildCompareVisualCard({
      title,
      image,
      imageAlt,
      label,
      previewLabel,
      previewCopy,
      supportingCopy,
      ctaLabel,
      ctaAction,
      ctaValueKey,
      ctaValue
    }) {
      return `
        <div class="overflow-hidden rounded-[20px] border border-line bg-surface-soft shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
          <div class="flex flex-col gap-3 border-b border-line px-4 py-4 sm:flex-row sm:items-center">
            <div class="flex min-w-0 items-center gap-3">
              <img class="h-14 w-14 rounded-2xl object-cover sm:h-16 sm:w-16" src="${image}" alt="${imageAlt}" />
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${label}</p>
                <h5 class="mt-1 font-display text-lg font-bold leading-tight text-ink">${title}</h5>
              </div>
            </div>
            <a class="guide-action-button inline-flex w-full items-center justify-center rounded-full bg-white px-3 py-2.5 text-sm font-semibold text-secondary ring-1 ring-line sm:ml-auto sm:w-auto sm:shrink-0" data-action="${ctaAction}" data-${ctaValueKey}="${ctaValue}" href="#build">${ctaLabel}</a>
          </div>
          <div class="px-4 py-4">
            <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">${previewLabel}</p>
            <p class="mt-2 text-sm leading-6 text-ink">${previewCopy}</p>
            <p class="mt-3 text-sm leading-6 text-muted">${supportingCopy}</p>
          </div>
        </div>
      `;
    }

    function buildCompareSummaryBlock(summary) {
      return `
        <div class="mt-4 overflow-hidden rounded-[20px] border border-line bg-gradient-to-r from-white to-surface-soft">
          <div class="px-4 py-4">
            <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Best fit for this trip</p>
            <p class="mt-2 max-w-[52rem] text-sm leading-6 text-ink">${summary}</p>
          </div>
        </div>
      `;
    }

    function getRelatedGuideCountries(country) {
      const region = getCountryRegion(country);
      return Object.keys(hbData.countryGuideData)
        .filter((item) => item !== country && getCountryRegion(item) === region)
        .slice(0, 3);
    }

    function getGuideStickyState(type, current) {
      const compareState = hbState?.guideCompare && typeof hbState.guideCompare === "object"
        ? hbState.guideCompare
        : { type: "", current: "", target: "" };
      const planContext = hbState?.guidePlanContext && typeof hbState.guidePlanContext === "object"
        ? hbState.guidePlanContext
        : { sourceType: "", sourceLocation: "", sourceName: "" };
      const appState = hbState?.appState && typeof hbState.appState === "object"
        ? hbState.appState
        : { destination: "" };

      if (compareState.type === type && compareState.current === current) {
        const targetLabel = type === "city"
          ? String(compareState.target || "").split(",")[0]
          : String(compareState.target || "");
        return `Comparing ${targetLabel}`;
      }

      if (planContext.sourceType === type && planContext.sourceLocation === current) {
        return `Planning ${planContext.sourceName}`;
      }

      if (type === "city" && appState.destination === current) {
        return "In your trip";
      }

      if (type === "country" && planContext.sourceType === "country" && planContext.sourceLocation === current) {
        return `Using ${current}`;
      }

      return "Ready";
    }

    function renderGuidePlanningContext() {
      const wrap = document.getElementById("build-guide-context");
      const title = document.getElementById("build-guide-context-title");
      const copy = document.getElementById("build-guide-context-copy");
      const points = document.getElementById("build-guide-context-points");
      const reopenBtn = document.getElementById("open-guide-context-btn");
      const thumb = document.getElementById("build-guide-context-thumb");
      const kicker = document.getElementById("build-guide-context-kicker");
      const next = document.getElementById("build-guide-context-next");
      if (!wrap || !title || !copy || !points) return;

      const context = hbState.guidePlanContext || {
        sourceType: "",
        sourceName: "",
        sourceLocation: "",
        summary: "",
        preview: "",
        suggestedBase: "",
        signals: null
      };
      if (!context?.sourceType) {
        wrap.classList.add("hidden");
        title.textContent = "";
        copy.textContent = "";
        points.innerHTML = "";
        if (thumb) {
          thumb.src = "";
          thumb.classList.add("hidden");
        }
        if (kicker) kicker.textContent = "Guide-led starting point";
        if (next) next.textContent = "";
        return;
      }

      const visual = getGuidePlanningVisual(context);
      wrap.classList.remove("hidden");
      title.textContent = context.sourceType === "city"
        ? `Starting from the ${context.sourceName} guide`
        : `Starting from the ${context.sourceName} country guide`;
      copy.textContent = context.sourceType === "city"
        ? `We’ve prefilled this around ${context.sourceName}. Expect a first draft built around what the city is genuinely known for, with ${context.suggestedBase} giving the trip a clear place to begin.`
        : `We’ve set ${context.sourceName} as the broader direction. ${context.suggestedBase} is a strong first city to narrow into, so the trip starts specific without losing the bigger country view.`;
      const baseChips = context.sourceType === "city"
        ? [
            `Starting city: ${context.sourceName}`,
            `Early focus: ${context.suggestedBase}`,
            "Guide-led draft"
          ]
        : [
            `Country direction: ${context.sourceName}`,
            `Best first city: ${context.suggestedBase}`,
            "Country-led draft"
          ];
      const signalChips = context.signals
        ? [
            context.signals.styles?.length ? `Suggested styles: ${context.signals.styles.join(" + ")}` : "",
            context.signals.pace ? `${context.signals.pace} pace` : "",
            context.signals.mustHaves ? `Anchor: ${context.signals.mustHaves}` : ""
          ].filter(Boolean)
        : [];
      const chips = [...baseChips, ...signalChips].slice(0, 6);
      if (thumb && visual.image) {
        thumb.src = visual.image;
        thumb.classList.remove("hidden");
      }
      if (kicker) kicker.textContent = visual.kicker;
      if (next) next.textContent = visual.next;
      points.innerHTML = chips.map((item) => `
        <span class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">${item}</span>
      `).join("");
      if (reopenBtn) {
        reopenBtn.textContent = context.sourceType === "city" ? `Open ${context.sourceName} guide` : `Open ${context.sourceName}`;
        reopenBtn.dataset.sourceType = context.sourceType;
        reopenBtn.dataset.sourceLocation = context.sourceLocation;
      }
    }

    function applyGuidePlanningContextFromCity(city) {
      const guide = hbData.cityGuideData.find((item) => item.city === city);
      if (!guide) return;
      const preview = getCityPreviewDepth(guide);
      hbState.guidePlanContext = {
        sourceType: "city",
        sourceName: guide.title,
        sourceLocation: city,
        summary: guide.summary,
        preview: `${preview.label}: ${preview.copy}`,
        suggestedBase: guide.highlights[0] || guide.title,
        signals: buildCityGuideSignals(guide)
      };
      hbState.guideActionState.city = `Planning ${guide.title}`;
      hbState.appState.destination = city;
      if (hbRefs.formBindings.destination) hbRefs.formBindings.destination.value = city;
      renderGuidePlanningContext();
    }

    function applyGuidePlanningContextFromCountry(country) {
      const guide = hbData.countryGuideData[country];
      if (!guide) return;
      const preview = getCountryPreviewDepth(country, guide);
      hbState.guidePlanContext = {
        sourceType: "country",
        sourceName: country,
        sourceLocation: country,
        summary: guide.summary,
        preview: `${preview.label}: ${preview.copy}`,
        suggestedBase: getCitiesForCountry(country)[0]?.title || country,
        signals: buildCountryGuideSignals(country, guide)
      };
      hbState.guideActionState.country = `Using ${country}`;
      hbState.appState.destination = country;
      if (hbRefs.formBindings.destination) hbRefs.formBindings.destination.value = country;
      renderGuidePlanningContext();
    }

    function renderCityGuideCompare(city) {
      const slot = document.getElementById("city-guide-compare-slot");
      if (!slot) return;
      const compareState = hbState.guideCompare || { type: "", current: "", target: "" };
      if (compareState.type !== "city" || compareState.current !== city || !compareState.target) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentGuide = hbData.cityGuideData.find((item) => item.city === city);
      const targetGuide = hbData.cityGuideData.find((item) => item.city === compareState.target);
      if (!currentGuide || !targetGuide) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentPreview = getCityPreviewDepth(currentGuide);
      const targetPreview = getCityPreviewDepth(targetGuide);
      const currentHero = getGuideHero(currentGuide.city);
      const targetHero = getGuideHero(targetGuide.city);
      const fitSummary = buildCompareFitSummary("city", currentGuide.title, currentPreview, targetGuide.title, targetPreview);
      slot.classList.remove("hidden");
      slot.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Compare cities</p>
            <h5 class="mt-1 font-display text-xl font-bold">How ${currentGuide.title} compares with ${targetGuide.title}</h5>
            <p class="mt-2 text-sm leading-6 text-muted">A quick side-by-side read before you decide which city fits this trip better.</p>
          </div>
          <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="clear-guide-compare" type="button">Close</button>
        </div>
        ${buildCompareSummaryBlock(fitSummary)}
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${buildCompareVisualCard({
            title: currentGuide.title,
            image: currentHero.image,
            imageAlt: `${currentGuide.title} compare preview`,
            label: currentGuide.title,
            previewLabel: currentPreview.label,
            previewCopy: currentPreview.copy,
            supportingCopy: `Known highlights: ${currentGuide.highlights.join(" • ")}`,
            ctaLabel: "Plan this city",
            ctaAction: "use-city-guide",
            ctaValueKey: "city",
            ctaValue: currentGuide.city
          })}
          ${buildCompareVisualCard({
            title: targetGuide.title,
            image: targetHero.image,
            imageAlt: `${targetGuide.title} compare preview`,
            label: targetGuide.title,
            previewLabel: targetPreview.label,
            previewCopy: targetPreview.copy,
            supportingCopy: `Known highlights: ${targetGuide.highlights.join(" • ")}`,
            ctaLabel: "Plan this city",
            ctaAction: "use-city-guide",
            ctaValueKey: "city",
            ctaValue: targetGuide.city
          })}
        </div>
      `;
    }

    function renderCountryGuideCompare(country) {
      const slot = document.getElementById("country-guide-compare-slot");
      if (!slot) return;
      const compareState = hbState.guideCompare || { type: "", current: "", target: "" };
      if (compareState.type !== "country" || compareState.current !== country || !compareState.target) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentGuide = hbData.countryGuideData[country];
      const targetGuide = hbData.countryGuideData[compareState.target];
      if (!currentGuide || !targetGuide) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentPreview = getCountryPreviewDepth(country, currentGuide);
      const targetPreview = getCountryPreviewDepth(compareState.target, targetGuide);
      const currentHero = getCountryHero(country);
      const targetHero = getCountryHero(compareState.target);
      const fitSummary = buildCompareFitSummary("country", country, currentPreview, compareState.target, targetPreview);
      slot.classList.remove("hidden");
      slot.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Compare countries</p>
            <h5 class="mt-1 font-display text-xl font-bold">How ${country} compares with ${compareState.target}</h5>
            <p class="mt-2 text-sm leading-6 text-muted">This gives a faster editorial read when you are deciding between two broader trip directions.</p>
          </div>
          <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="clear-guide-compare" type="button">Close</button>
        </div>
        ${buildCompareSummaryBlock(fitSummary)}
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${buildCompareVisualCard({
            title: country,
            image: currentHero.image,
            imageAlt: `${country} compare preview`,
            label: country,
            previewLabel: currentPreview.label,
            previewCopy: currentPreview.copy,
            supportingCopy: `Strong first cities: ${currentPreview.standout}`,
            ctaLabel: "Start here",
            ctaAction: "use-country-guide",
            ctaValueKey: "country",
            ctaValue: country
          })}
          ${buildCompareVisualCard({
            title: compareState.target,
            image: targetHero.image,
            imageAlt: `${compareState.target} compare preview`,
            label: compareState.target,
            previewLabel: targetPreview.label,
            previewCopy: targetPreview.copy,
            supportingCopy: `Strong first cities: ${targetPreview.standout}`,
            ctaLabel: "Start here",
            ctaAction: "use-country-guide",
            ctaValueKey: "country",
            ctaValue: compareState.target
          })}
        </div>
      `;
    }

    function renderCityGuideHubCompare() {
      const slot = document.getElementById("city-guides-compare-slot");
      if (!slot) return;
      const compareState = hbState.guideHubCompare || { type: "", current: "", target: "" };
      if (compareState.type !== "city" || !compareState.current || !compareState.target) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentGuide = hbData.cityGuideData.find((item) => item.city === compareState.current);
      const targetGuide = hbData.cityGuideData.find((item) => item.city === compareState.target);
      if (!currentGuide || !targetGuide) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentPreview = getCityPreviewDepth(currentGuide);
      const targetPreview = getCityPreviewDepth(targetGuide);
      const currentHero = getGuideHero(currentGuide.city);
      const targetHero = getGuideHero(targetGuide.city);
      const fitSummary = buildCompareFitSummary("city", currentGuide.title, currentPreview, targetGuide.title, targetPreview);
      slot.classList.remove("hidden");
      slot.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">City comparison</p>
            <h4 class="mt-1 font-display text-xl font-bold">${currentGuide.title} or ${targetGuide.title}?</h4>
            <p class="mt-2 text-sm leading-6 text-muted">Use this quick read to decide which city feels closer to the trip you want before opening the full destination pages.</p>
          </div>
          <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="clear-hub-compare" data-compare-type="city" type="button">Close</button>
        </div>
        ${buildCompareSummaryBlock(fitSummary)}
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${buildCompareVisualCard({
            title: currentGuide.title,
            image: currentHero.image,
            imageAlt: `${currentGuide.title} compare preview`,
            label: currentGuide.title,
            previewLabel: currentPreview.label,
            previewCopy: currentPreview.copy,
            supportingCopy: `Iconic picks: ${currentGuide.highlights.join(" • ")}`,
            ctaLabel: "Plan this city",
            ctaAction: "use-city-guide",
            ctaValueKey: "city",
            ctaValue: currentGuide.city
          })}
          ${buildCompareVisualCard({
            title: targetGuide.title,
            image: targetHero.image,
            imageAlt: `${targetGuide.title} compare preview`,
            label: targetGuide.title,
            previewLabel: targetPreview.label,
            previewCopy: targetPreview.copy,
            supportingCopy: `Iconic picks: ${targetGuide.highlights.join(" • ")}`,
            ctaLabel: "Plan this city",
            ctaAction: "use-city-guide",
            ctaValueKey: "city",
            ctaValue: targetGuide.city
          })}
        </div>
      `;
    }

    function renderCountryGuideHubCompare() {
      const slot = document.getElementById("country-guides-compare-slot");
      if (!slot) return;
      const compareState = hbState.guideHubCompare || { type: "", current: "", target: "" };
      if (compareState.type !== "country" || !compareState.current || !compareState.target) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentGuide = hbData.countryGuideData[compareState.current];
      const targetGuide = hbData.countryGuideData[compareState.target];
      if (!currentGuide || !targetGuide) {
        slot.classList.add("hidden");
        slot.innerHTML = "";
        return;
      }

      const currentPreview = getCountryPreviewDepth(compareState.current, currentGuide);
      const targetPreview = getCountryPreviewDepth(compareState.target, targetGuide);
      const currentHero = getCountryHero(compareState.current);
      const targetHero = getCountryHero(compareState.target);
      const fitSummary = buildCompareFitSummary("country", compareState.current, currentPreview, compareState.target, targetPreview);
      slot.classList.remove("hidden");
      slot.innerHTML = `
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Country comparison</p>
            <h4 class="mt-1 font-display text-xl font-bold">${compareState.current} or ${compareState.target}?</h4>
            <p class="mt-2 text-sm leading-6 text-muted">A broad side-by-side read before you choose which country direction to build from.</p>
          </div>
          <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="clear-hub-compare" data-compare-type="country" type="button">Close</button>
        </div>
        ${buildCompareSummaryBlock(fitSummary)}
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${buildCompareVisualCard({
            title: compareState.current,
            image: currentHero.image,
            imageAlt: `${compareState.current} compare preview`,
            label: compareState.current,
            previewLabel: currentPreview.label,
            previewCopy: currentPreview.copy,
            supportingCopy: `Strong first cities: ${currentPreview.standout}`,
            ctaLabel: "Start here",
            ctaAction: "use-country-guide",
            ctaValueKey: "country",
            ctaValue: compareState.current
          })}
          ${buildCompareVisualCard({
            title: compareState.target,
            image: targetHero.image,
            imageAlt: `${compareState.target} compare preview`,
            label: compareState.target,
            previewLabel: targetPreview.label,
            previewCopy: targetPreview.copy,
            supportingCopy: `Strong first cities: ${targetPreview.standout}`,
            ctaLabel: "Start here",
            ctaAction: "use-country-guide",
            ctaValueKey: "country",
            ctaValue: compareState.target
          })}
        </div>
      `;
    }

    function renderCityGuidesLanding() {
      const container = document.getElementById("city-guides-grid");
      const resultsMeta = document.getElementById("city-guides-results-meta");
      const searchInput = document.getElementById("city-guides-search");
      const regionSelect = document.getElementById("city-guides-continent");
      if (searchInput && searchInput.value !== hbState.cityGuideSearchQuery) {
        searchInput.value = hbState.cityGuideSearchQuery;
      }
      if (regionSelect && regionSelect.value !== hbState.cityGuideRegionFilter) {
        regionSelect.value = hbState.cityGuideRegionFilter;
      }
      renderFeaturedCityGuides();
      renderCityGuideSuggestions();
      renderCityGuideHubCompare();
      if (!container) return;
      const normalizedQuery = hbState.cityGuideSearchQuery.trim().toLowerCase();
      const canonicalSearch = resolveCanonicalDestination(hbState.cityGuideSearchQuery);
      const matchedCountry = normalizedQuery
        ? Object.keys(hbData.countryGuideData).find((country) => country.toLowerCase() === normalizedQuery)
          || Object.keys(hbData.countryGuideData).find((country) => country.toLowerCase().startsWith(normalizedQuery))
          || (canonicalSearch && canonicalSearch.includes(",") ? canonicalSearch.split(",").slice(-1)[0].trim() : "")
        : "";
      const filtered = hbData.cityGuideData.filter((guide) => {
        const country = getGuideCountryForCity(guide.city);
        const region = getCountryRegion(country);
        const haystack = [
          guide.title,
          guide.summary,
          guide.city,
          guide.highlights.join(" "),
          guide.tip,
          country,
          region
        ].join(" ").toLowerCase();
        const normalizedHaystack = normalizeLookupValue([
          guide.title,
          guide.city,
          country,
          region,
          guide.highlights.join(" ")
        ].join(" "));
        const lookupSearch = normalizeLookupValue(hbState.cityGuideSearchQuery);
        const matchesCanonical = canonicalSearch ? guide.city === canonicalSearch : false;
        const matchesSearch = !hbState.cityGuideSearchQuery
          || haystack.includes(hbState.cityGuideSearchQuery.toLowerCase())
          || (lookupSearch && normalizedHaystack.includes(lookupSearch))
          || matchesCanonical;
        const matchesRegion = hbState.cityGuideRegionFilter === "all" || region === hbState.cityGuideRegionFilter;
        return matchesSearch && matchesRegion;
      });

      if (resultsMeta) {
        const resumeMarkup = hbState.selectedGuideCity ? `
          <div class="mb-3 rounded-2xl border border-line bg-white px-4 py-4 shadow-card">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Resume browsing</p>
            <p class="mt-2 text-sm leading-6 text-ink">Last opened: ${hbState.selectedGuideCity.split(",")[0]}.</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-city-guide" data-city="${hbState.selectedGuideCity}" type="button">
                Reopen guide
              </button>
            </div>
          </div>
        ` : "";
        resultsMeta.innerHTML = `
          <div class="min-w-0">
            ${resumeMarkup}
            <p>Showing <span class="font-semibold text-ink">${filtered.length}</span> city guide${filtered.length === 1 ? "" : "s"}</p>
            <p>${hbState.cityGuideSearchQuery || hbState.cityGuideRegionFilter !== "all"
              ? matchedCountry
                ? `You searched ${matchedCountry}. Open the country overview or stay in the city library.`
                : "Use search or filters to narrow the library."
              : "Browse by city, country, or the type of trip that sounds right."}</p>
            ${buildActiveContextMarkup("city")}
          </div>
          ${matchedCountry ? `
            <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${matchedCountry}" type="button">
              Open ${matchedCountry} country guide
            </button>
          ` : ""}
        `;
      }

      if (!filtered.length) {
        container.innerHTML = `
          <div class="rounded-[24px] border border-line bg-white px-4 py-5 shadow-card">
            <p class="font-display text-xl font-bold">No city guides match that search</p>
            <p class="mt-2 text-sm leading-6 text-muted">${matchedCountry ? `Try the ${matchedCountry} country page for a broader starting point, or search for a specific city inside ${matchedCountry}.` : "Try a broader region or a simpler keyword like a country name, trip style, or landmark."}</p>
            ${matchedCountry ? `
              <div class="mt-4">
                <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${matchedCountry}" type="button">
                  Open ${matchedCountry} country guide
                </button>
              </div>
            ` : ""}
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map((guide) => {
        const preview = getCityPreviewDepth(guide);
        return `
        <article class="guide-browser-card rounded-[24px] border border-line bg-white px-4 py-4 shadow-card">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h4 class="font-display text-xl font-bold">${guide.title}</h4>
              <p class="mt-2 text-sm leading-6 text-muted">${buildCityGuideLead(guide.summary)}</p>
            </div>
            <div class="flex flex-col gap-2">
              <button class="guide-action-button rounded-full px-4 py-2 text-sm font-semibold ring-1 ${hbState.selectedGuideCity === guide.city ? "bg-secondary text-white ring-secondary" : "bg-surface-soft text-secondary ring-line"}" data-action="open-city-guide" data-city="${guide.city}" type="button">
                Open ${guide.title} guide
              </button>
              <a class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-city-guide" data-city="${guide.city}" href="#build">
                Plan ${guide.title}
              </a>
            </div>
          </div>
          <div class="mt-4 grid gap-3">
            <div class="rounded-2xl border border-line bg-white px-4 py-4">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${preview.label}</p>
              <p class="mt-2 text-sm leading-6 text-ink">${preview.copy}</p>
            </div>
            <div class="rounded-2xl bg-surface-soft px-4 py-4">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Best-known highlights</p>
              <p class="mt-2 text-sm leading-6 text-ink">${guide.highlights.join(" • ")}</p>
            </div>
            <div class="rounded-2xl bg-warm px-4 py-4 ring-1 ring-warm-line">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Planning tip</p>
              <p class="mt-2 text-sm leading-6 text-ink">${guide.tip}</p>
            </div>
          </div>
          ${getRelatedGuideCities(guide.city)[0] ? `
            <div class="mt-4 flex flex-wrap gap-2">
              <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="hub-compare-city" data-city="${guide.city}" data-compare-city="${getRelatedGuideCities(guide.city)[0].city}" type="button">
                Compare ${getRelatedGuideCities(guide.city)[0].title}
              </button>
            </div>
          ` : ""}
        </article>
      `;
      }).join("");

    }

    function renderFeaturedCountryGuides() {
      const container = document.getElementById("country-guides-featured");
      if (!container) return;
      const featuredCountries = [
        "France",
        "Japan",
        "United States",
        "Italy",
        "Portugal",
        "Greece"
      ].map((country) => [country, hbData.countryGuideData[country]]).filter(([, guide]) => Boolean(guide));

      container.innerHTML = `
        <div class="rounded-[24px] border border-line bg-white px-4 py-4 shadow-card">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Good places to start broad</p>
              <h4 class="mt-1 font-display text-xl font-bold text-ink">Countries worth opening before you pick a city</h4>
              <p class="mt-2 text-sm leading-6 text-muted">These country pages are useful when you know the country but still need help deciding where inside it to base the trip.</p>
            </div>
            <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">Broad trip planning</span>
          </div>
          <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            ${featuredCountries.map(([country, guide]) => {
              const hero = getCountryHero(country);
              const editorial = hbData.countryEditorialPageData[country];
              const cities = getCitiesForCountry(country).slice(0, 3).map((item) => item.title).join(" • ");
              const preview = getCountryPreviewDepth(country, guide);
              return `
                <article class="guide-browser-card overflow-hidden rounded-[22px] border border-line bg-surface-card">
                  <div class="relative h-32 overflow-hidden border-b border-line">
                    <img class="h-full w-full object-cover" src="${hero.image}" alt="${country} guide image" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 px-4 py-3 text-white">
                      <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">${getCountryRegion(country)}</p>
                      <p class="mt-1 font-display text-xl font-bold">${country}</p>
                    </div>
                  </div>
                  <div class="px-4 py-4">
                    <p class="text-sm leading-6 text-muted">${editorial?.dek || guide.summary}</p>
                    <div class="mt-3 rounded-2xl bg-white px-4 py-4 ring-1 ring-line">
                      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${preview.label}</p>
                      <p class="mt-2 text-sm leading-6 text-ink">${preview.copy}</p>
                    </div>
                    <p class="mt-3 text-sm font-medium text-ink">${cities || "Country-wide planning ideas"}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                      <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${country}" type="button">Open ${country} guide</button>
                      <a class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-country-guide" data-country="${country}" href="#build">Start with ${country}</a>
                      <button class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-cities" data-country="${country}" type="button">Browse ${country} cities</button>
                    </div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    function renderCountryGuidesLanding() {
      const container = document.getElementById("country-guides-grid");
      const resultsMeta = document.getElementById("country-guides-results-meta");
      const searchInput = document.getElementById("country-guides-search");
      const regionSelect = document.getElementById("country-guides-continent");
      if (searchInput && searchInput.value !== hbState.countryGuideSearchQuery) {
        searchInput.value = hbState.countryGuideSearchQuery;
      }
      if (regionSelect && regionSelect.value !== hbState.countryGuideRegionFilter) {
        regionSelect.value = hbState.countryGuideRegionFilter;
      }
      renderFeaturedCountryGuides();
      renderCountryGuideSuggestions();
      renderCountryGuideHubCompare();
      if (!container) return;
      const normalizedQuery = hbState.countryGuideSearchQuery.trim().toLowerCase();
      const matchedCountry = normalizedQuery
        ? Object.keys(hbData.countryGuideData).find((country) => country.toLowerCase() === normalizedQuery)
          || Object.keys(hbData.countryGuideData).find((country) => country.toLowerCase().startsWith(normalizedQuery))
        : "";
      const matchedCityCountry = !matchedCountry && normalizedQuery
        ? getCountryGuideCitySuggestions(hbState.countryGuideSearchQuery)[0]?.country
        : "";
      const filtered = Object.entries(hbData.countryGuideData).filter(([country, guide]) => {
        const region = getCountryRegion(country);
        const cityNames = getCitiesForCountry(country).map((item) => item.title).join(" ");
        const haystack = [
          country,
          guide.summary,
          guide.cards.flat().join(" "),
          region,
          cityNames
        ].join(" ").toLowerCase();
        const matchesSearch = !hbState.countryGuideSearchQuery || haystack.includes(hbState.countryGuideSearchQuery.toLowerCase());
        const matchesRegion = hbState.countryGuideRegionFilter === "all" || region === hbState.countryGuideRegionFilter;
        return matchesSearch && matchesRegion;
      });

      if (resultsMeta) {
        const resumeMarkup = hbState.selectedGuideCountry ? `
          <div class="mb-3 rounded-2xl border border-line bg-white px-4 py-4 shadow-card">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Resume browsing</p>
            <p class="mt-2 text-sm leading-6 text-ink">Last opened: ${hbState.selectedGuideCountry}.</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <button class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${hbState.selectedGuideCountry}" type="button">
                Reopen guide
              </button>
            </div>
          </div>
        ` : "";
        resultsMeta.innerHTML = `
          <div class="min-w-0">
            ${resumeMarkup}
            <p>Showing <span class="font-semibold text-ink">${filtered.length}</span> country guide${filtered.length === 1 ? "" : "s"}</p>
            <p>${hbState.countryGuideSearchQuery || hbState.countryGuideRegionFilter !== "all"
              ? matchedCountry
                ? `You searched ${matchedCountry}. Open the country guide or jump straight into its city list.`
                : matchedCityCountry
                  ? `That city points toward ${matchedCityCountry}. Start broad there, then drill into the right city.`
                  : "Use search or filters to narrow the library."
              : "Start broad here if you know the country but not yet the exact city."}</p>
            ${buildActiveContextMarkup("country")}
          </div>
          ${(matchedCountry || matchedCityCountry) ? `
            <div class="flex flex-wrap gap-2">
              <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${matchedCountry || matchedCityCountry}" type="button">
                Open ${(matchedCountry || matchedCityCountry)} guide
              </button>
              <button class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-cities" data-country="${matchedCountry || matchedCityCountry}" type="button">
                Browse ${(matchedCountry || matchedCityCountry)} cities
              </button>
            </div>
          ` : ""}
        `;
      }

      if (!filtered.length) {
        container.innerHTML = `
          <div class="rounded-[24px] border border-line bg-white px-4 py-5 shadow-card">
            <p class="font-display text-xl font-bold">No country guides match that search</p>
            <p class="mt-2 text-sm leading-6 text-muted">${matchedCityCountry ? `That search looks closer to ${matchedCityCountry}. Try opening that country guide or browse its city options directly.` : "Try a broader region or search by trip type, country name, or one of the cities inside that country."}</p>
            ${matchedCityCountry ? `
              <div class="mt-4 flex flex-wrap gap-2">
                <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${matchedCityCountry}" type="button">
                  Open ${matchedCityCountry} guide
                </button>
                <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-cities" data-country="${matchedCityCountry}" type="button">
                  Browse ${matchedCityCountry} cities
                </button>
              </div>
            ` : ""}
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(([country, guide]) => {
        const cities = getCitiesForCountry(country);
        const hero = getCountryHero(country);
        const editorial = hbData.countryEditorialPageData[country];
        const preview = editorial?.dek || guide.summary;
        const lead = editorial?.intro?.[0] || guide.cards[1]?.[1] || guide.summary;
        const depthPreview = getCountryPreviewDepth(country, guide);
        return `
          <article class="guide-browser-card overflow-hidden rounded-[24px] border border-line bg-white shadow-card">
            <div class="relative h-40 overflow-hidden border-b border-line">
              <img class="h-full w-full object-cover" src="${hero.image}" alt="${country} guide image" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 px-4 py-4 text-white">
                <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">${getCountryRegion(country)}</p>
                <h4 class="mt-1 font-display text-2xl font-bold">${country}</h4>
                <p class="mt-2 max-w-[20rem] text-sm leading-6 text-white/86">${hero.copy}</p>
              </div>
            </div>

            <div class="px-4 py-4">
              <p class="text-sm leading-6 text-ink">${preview}</p>
              <p class="mt-3 text-sm leading-6 text-muted">${lead}</p>

              <div class="mt-4 grid gap-3">
                <div class="rounded-2xl border border-line bg-white px-4 py-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${depthPreview.label}</p>
                  <p class="mt-2 text-sm leading-6 text-ink">${depthPreview.copy}</p>
                </div>
                <div class="rounded-2xl bg-surface-soft px-4 py-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Top city picks</p>
                  <div class="mt-3 flex flex-wrap gap-2">
                    ${cities.length ? cities.slice(0, 4).map((item) => `
                      <span class="rounded-full bg-white px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">${item.title}</span>
                    `).join("") : `<span class="rounded-full bg-white px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">Country-wide planning</span>`}
                  </div>
                </div>

                <div class="rounded-2xl bg-warm px-4 py-4 ring-1 ring-warm-line">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Good to know</p>
                  <p class="mt-2 text-sm leading-6 text-ink">${guide.cards[2]?.[1] || guide.summary}</p>
                </div>
              </div>

              <div class="mt-4 flex flex-wrap gap-2">
                <button class="guide-action-button rounded-full px-4 py-2 text-sm font-semibold ring-1 ${hbState.selectedGuideCountry === country ? "bg-secondary text-white ring-secondary" : "bg-surface-soft text-secondary ring-line"}" data-action="open-country-guide" data-country="${country}" type="button">
                  Open ${country} guide
                </button>
                <a class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-country-guide" data-country="${country}" href="#build">
                  Start with ${country}
                </a>
                <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-cities" data-country="${country}" type="button">
                  Browse ${country} cities
                </button>
                ${getRelatedGuideCountries(country)[0] ? `
                  <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="hub-compare-country" data-country="${country}" data-compare-country="${getRelatedGuideCountries(country)[0]}" type="button">
                    Compare ${getRelatedGuideCountries(country)[0]}
                  </button>
                ` : ""}
              </div>
            </div>
          </article>
        `;
      }).join("");
    }

    function getCountryGuideSuggestions(query) {
      if (!query) return [];
      const normalized = query.trim().toLowerCase();
      if (!normalized) return [];

      return Object.entries(hbData.countryGuideData).map(([country, guide]) => {
        const region = getCountryRegion(country);
        const cityNames = getCitiesForCountry(country).map((item) => item.title).join(" ").toLowerCase();
        let score = 0;

        if (country.toLowerCase().startsWith(normalized)) score += 10;
        if (country.toLowerCase().includes(normalized)) score += 7;
        if (region.toLowerCase().includes(normalized)) score += 2;
        if (guide.summary.toLowerCase().includes(normalized)) score += 1;
        if (cityNames.includes(normalized)) score += 1;

        return { country, guide, score };
      }).filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.country.localeCompare(b.country))
        .slice(0, 5);
    }

    function getCountryGuideCitySuggestions(query) {
      if (!query) return [];
      const normalized = query.trim().toLowerCase();
      const normalizedLookup = normalizeLookupValue(query);
      const canonicalMatch = resolveCanonicalDestination(query);
      if (!normalized) return [];

      return Object.entries(countrySuggestions).flatMap(([country, cities]) =>
        cities.filter((city) => city.includes(",")).map((city) => {
          const cityName = city.split(",")[0].trim();
          const cityLookup = normalizeLookupValue(city);
          const cityNameLookup = normalizeLookupValue(cityName);
          let score = 0;
          if (cityName.toLowerCase().startsWith(normalized)) score += 10;
          if (city.toLowerCase().startsWith(normalized)) score += 9;
          if (cityName.toLowerCase().includes(normalized)) score += 7;
          if (city.toLowerCase().includes(normalized)) score += 6;
          if (normalizedLookup && (cityNameLookup.includes(normalizedLookup) || cityLookup.includes(normalizedLookup))) score += 6;
          if (canonicalMatch && canonicalMatch === city) score += 12;
          return { city, country, score };
        })
      ).filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || a.city.localeCompare(b.city))
        .slice(0, 6);
    }

    function getCombinedCountryGuideSuggestions() {
      const countrySuggestionsList = getCountryGuideSuggestions(hbState.countryGuideSearchQuery).map(({ country }) => ({
        type: "country",
        country,
        title: country,
        subtitle: getCountryRegion(country),
        meta: "Country guide",
        preview: getCitiesForCountry(country).slice(0, 3).map((item) => item.title).join(" • ") || "Country-wide planning"
      }));

      const citySuggestionsList = getCountryGuideCitySuggestions(hbState.countryGuideSearchQuery)
        .filter((item) => !countrySuggestionsList.some((countryItem) => countryItem.country === item.country))
        .slice(0, Math.max(0, 6 - countrySuggestionsList.length))
        .map(({ city, country }) => ({
          type: "country",
          country,
          title: city.split(",")[0],
          subtitle: country,
          meta: "Browse country",
          preview: `Use ${country} as the broader starting point`
        }));

      return [...countrySuggestionsList, ...citySuggestionsList];
    }

    function setCountryGuideSuggestionIndex(nextIndex) {
      const suggestions = getCombinedCountryGuideSuggestions();
      if (!suggestions.length) {
        hbState.countryGuideSuggestionIndex = -1;
        return;
      }
      const maxIndex = suggestions.length - 1;
      if (nextIndex < 0) {
        hbState.countryGuideSuggestionIndex = maxIndex;
      } else if (nextIndex > maxIndex) {
        hbState.countryGuideSuggestionIndex = 0;
      } else {
        hbState.countryGuideSuggestionIndex = nextIndex;
      }
      renderCountryGuideSuggestions();
    }

    function applyCountryGuideSuggestionSelection(index = hbState.countryGuideSuggestionIndex) {
      const suggestions = getCombinedCountryGuideSuggestions();
      const selected = suggestions[index];
      if (!selected) return;
      const searchInput = document.getElementById("country-guides-search");
      if (searchInput) searchInput.value = selected.country;
      hbState.countryGuideSearchQuery = selected.country;
      hbState.countryGuideSuggestionIndex = -1;
      hbState.selectedGuideCountry = selected.country;
      renderCountryGuideDetail(selected.country);
      hbUtils.setActivePanel("editorial-country-panel");
    }

    function renderCountryGuideSuggestions() {
      const container = document.getElementById("country-guides-search-suggestions");
      if (!container) return;
      const suggestions = getCombinedCountryGuideSuggestions();

      if (!hbState.countryGuideSearchQuery || !suggestions.length) {
        container.classList.add("hidden");
        container.innerHTML = "";
        hbState.countryGuideSuggestionIndex = -1;
        return;
      }

      container.innerHTML = suggestions.map((item, index) => `
        <button
          class="flex w-full items-start justify-between gap-3 rounded-2xl px-3 py-3 text-left transition ${index === hbState.countryGuideSuggestionIndex ? "bg-surface-soft" : "hover:bg-surface-soft"}"
          data-action="open-country-guide"
          data-country="${item.country}"
          data-suggestion-index="${index}"
          type="button"
        >
          <span>
            <span class="block text-sm font-semibold text-ink">${item.title}</span>
            <span class="mt-1 block text-xs uppercase tracking-[0.14em] text-muted">${item.subtitle}</span>
            <span class="mt-2 block text-sm leading-6 text-muted">${item.preview}</span>
          </span>
          <span class="mt-1 shrink-0 text-xs font-medium ${item.meta === "Country guide" ? "text-secondary" : "text-primary"}">${item.meta}</span>
        </button>
      `).join("");
      container.classList.remove("hidden");
    }

    function renderCountryGuideDetail(country) {
      const guide = hbData.countryGuideData[country];
      const breadcrumbs = document.getElementById("country-guide-breadcrumbs");
      const image = document.getElementById("country-guide-hero-image");
      const title = document.getElementById("country-guide-detail-title");
      const summary = document.getElementById("country-guide-detail-summary");
      const intro = document.getElementById("country-guide-editorial-intro");
      const summaryCards = document.getElementById("country-guide-summary-cards");
      const cityChips = document.getElementById("country-guide-city-chips");
      const strengths = document.getElementById("country-guide-strengths");
      const planningTip = document.getElementById("country-guide-planning-tip");
      const cityGrid = document.getElementById("country-guide-city-grid");
      const openCitiesBtn = document.getElementById("country-guide-open-cities-btn");
      const stickyActions = document.getElementById("country-guide-sticky-actions");
      if (!guide || !breadcrumbs || !image || !title || !summary || !intro || !summaryCards || !cityChips || !strengths || !planningTip || !cityGrid || !openCitiesBtn || !stickyActions) return;

      hbState.selectedGuideCountry = country;
      const hero = getCountryHero(country);
      const editorial = hbData.countryEditorialPageData[country];
      const cities = getCitiesForCountry(country);

      breadcrumbs.innerHTML = `
        <button class="font-medium text-secondary hover:text-primary" data-action="open-country-guides-home" type="button">Country Guides</button>
        <span>/</span>
        <span class="font-semibold text-ink">${country}</span>
      `;
      image.src = hero.image;
      image.alt = `${country} country guide hero`;
      applyHeroOverlay(image.closest(".editorial-hero-media"), country, hero.overlay || "balanced");
      title.textContent = editorial?.hero?.title ? `${editorial.hero.title} travel guide` : `${country} travel guide`;
      summary.textContent = editorial?.dek || guide.summary;
      intro.innerHTML = (editorial?.intro || [
        `${country} tends to feel strongest when travelers understand the rhythm before they choose the exact city. That is usually the difference between a trip that feels aligned and one that feels like a list of disconnected stops.`,
        `This page gives a broader editorial read on ${country}: what kind of trip it supports best, what tends to stand out across the destination, and which cities are the strongest starting points once you are ready to narrow down.`
      ]).map((paragraph) => `<p>${paragraph}</p>`).join("");
      summaryCards.innerHTML = guide.cards.map(([label, copy]) => `
        <div class="rounded-[20px] border border-line bg-white px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${label}</p>
          <p class="mt-2 text-sm leading-6 text-ink">${copy}</p>
        </div>
      `).join("");
      cityChips.innerHTML = cities.map((item) => `
        <button class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line" data-action="open-city-guide" data-city="${item.city}" type="button">${item.title}</button>
      `).join("");
      strengths.textContent = guide.cards[0]?.[1] || guide.summary;
      planningTip.textContent = guide.cards[2]?.[1] || guide.summary;
      openCitiesBtn.dataset.action = "open-country-cities";
      openCitiesBtn.dataset.country = country;
      openCitiesBtn.textContent = `Browse ${country} cities`;
      const compareCountry = getRelatedGuideCountries(country)[0];
      const stickyState = getGuideStickyState("country", country);
      stickyActions.innerHTML = `
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="editorial-sticky-copy">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Quick actions</p>
            <p class="editorial-sticky-copy-detail mt-2 text-sm leading-6 text-muted">Move from the broader ${country} view into the most likely next step.</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-blue-soft px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">${stickyState}</span>
            <button class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guides-home" type="button">
              Back to Country Guides
            </button>
            <a class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-country-guide" data-country="${country}" href="#build">
              Start with ${country}
            </a>
            <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-cities" data-country="${country}" type="button">
              Browse ${country} cities
            </button>
            ${cities[0] ? `
              <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-city-guide" data-city="${cities[0].city}" type="button">
                Open ${cities[0].title}
              </button>
            ` : ""}
            ${compareCountry ? `
              <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="compare-country-guide" data-country="${country}" data-compare-country="${compareCountry}" type="button">
                Compare ${compareCountry}
              </button>
            ` : ""}
          </div>
        </div>
      `;
      hbUtils.updateEditorialStickyBars?.();
      renderCountryGuideCompare(country);

      cityGrid.innerHTML = (cities.length ? cities : hbData.cityGuideData.slice(0, 3)).map((item) => {
        const cityHero = getGuideHero(item.city);
        return `
          <article class="overflow-hidden rounded-[22px] border border-line bg-surface-card shadow-card">
            <div class="relative h-40 overflow-hidden border-b border-line">
              <img class="h-full w-full object-cover" src="${cityHero.image}" alt="${item.title} city preview" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 px-4 py-4 text-white">
                <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">${country}</p>
                <p class="mt-1 font-display text-xl font-bold">${item.title}</p>
              </div>
            </div>
            <div class="px-4 py-4">
              <p class="text-sm leading-6 text-ink">${item.summary}</p>
              <div class="mt-3 rounded-2xl bg-surface-soft px-4 py-4">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">What this city is best for</p>
                <p class="mt-2 text-sm leading-6 text-ink">${item.highlights.join(" • ")}</p>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-city-guide" data-city="${item.city}" type="button">
                  Read city guide
                </button>
                <a class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-city-guide" data-city="${item.city}" href="#build">
                  Plan ${item.title}
                </a>
                ${cities.length > 1 ? `
                  <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-city-guide-compare" data-city="${item.city}" data-compare-city="${(cities.find((candidate) => candidate.city !== item.city) || cities[0]).city}" type="button">
                    Compare city style
                  </button>
                ` : ""}
              </div>
            </div>
          </article>
        `;
      }).join("");
    }

    function renderCityGuideDetail(city) {
      const guide = hbData.cityGuideData.find((item) => item.city === city);
      const details = hbData.cityGuideDetailData[city];
      const title = document.getElementById("city-guide-detail-title");
      const summary = document.getElementById("city-guide-detail-summary");
      const grid = document.getElementById("city-guide-detail-grid");
      const useBtn = document.getElementById("city-guide-use-btn");
      const breadcrumbs = document.getElementById("city-guide-breadcrumbs");
      const gallery = document.getElementById("city-guide-gallery");
      const intro = document.getElementById("city-guide-editorial-intro");
      const trustCopy = document.getElementById("city-guide-trust-copy");
      const summaryCards = document.getElementById("city-guide-summary-cards");
      const planningToolkit = document.getElementById("city-guide-planning-toolkit");
      const depthGrid = document.getElementById("city-guide-depth-grid");
      const fitStrip = document.getElementById("city-guide-fit-strip");
      const highlightChips = document.getElementById("city-guide-highlight-chips");
      const planningTip = document.getElementById("city-guide-planning-tip");
      const heroImage = document.getElementById("city-guide-hero-image");
      const toc = document.getElementById("city-guide-toc");
      const relatedGrid = document.getElementById("city-guide-related-grid");
      const stickyActions = document.getElementById("city-guide-sticky-actions");
      if (!guide || !details || !title || !summary || !grid || !useBtn || !breadcrumbs || !gallery || !intro || !trustCopy || !summaryCards || !planningToolkit || !depthGrid || !fitStrip || !highlightChips || !planningTip || !heroImage || !toc || !relatedGrid || !stickyActions) return;

      hbState.selectedGuideCity = city;
      const hero = getGuideHero(city);
      const cityName = city.split(",")[0];
      const countryName = city.split(",").slice(-1)[0].trim();
      const guideCountry = getGuideCountryForCity(city);
      title.textContent = `The best things to do in ${guide.title}`;
      summary.textContent = getEditorialDek(city, guide);
      heroImage.src = hero.image;
      heroImage.alt = `${guide.title} destination hero`;
      applyHeroOverlay(heroImage.closest(".editorial-hero-media"), city, hero.overlay || "balanced");
      useBtn.dataset.action = "use-city-guide";
      useBtn.dataset.city = city;
      useBtn.setAttribute("href", "#build");
      breadcrumbs.innerHTML = `
        <button class="font-medium text-secondary hover:text-primary" data-action="open-city-guides-home" type="button">City Guides</button>
        <span>/</span>
        <button class="font-medium text-secondary hover:text-primary" data-action="open-country-guide" data-country="${guideCountry}" type="button">${countryName}</button>
        <span>/</span>
        <span class="font-semibold text-ink">${cityName}</span>
      `;
      gallery.innerHTML = getEditorialGallery(city, guide).map((item) => `
        <article class="overflow-hidden rounded-[20px] border border-line bg-white">
          <img class="h-36 w-full object-cover" src="${item.image}" alt="${item.title}" />
          <div class="px-4 py-4">
            <p class="font-display text-lg font-bold text-ink">${item.title}</p>
            <p class="mt-2 text-sm leading-6 text-muted">${item.copy}</p>
          </div>
        </article>
      `).join("");
      intro.innerHTML = getEditorialIntro(city, guide).map((paragraph) => `<p>${paragraph}</p>`).join("");
      summaryCards.innerHTML = getEditorialSummaryCards(city, guide).map(([label, copy]) => `
        <div class="rounded-[20px] border border-line bg-white px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${label}</p>
          <p class="mt-2 text-sm leading-6 text-ink">${copy}</p>
        </div>
      `).join("");
      planningToolkit.innerHTML = getCityPlanningToolkit(city, guide).map((item) => `
        <article class="rounded-[20px] border border-line bg-surface-soft px-4 py-4">
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-secondary" aria-hidden="true">${getPlanningToolkitIcon(item.label)}</span>
            <div class="min-w-0">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${item.label}</p>
              <h5 class="mt-2 font-display text-base font-bold leading-tight text-ink">${item.value}</h5>
              <p class="mt-2 text-sm leading-6 text-muted">${item.copy}</p>
            </div>
          </div>
        </article>
      `).join("");
      depthGrid.innerHTML = buildDestinationDepthCards(city, guide, details).map((item) => `
        <article class="destination-depth-card">
          <div class="destination-depth-card-head">
            <span class="destination-depth-icon material-symbols-outlined" aria-hidden="true">${getDestinationDepthIcon(item.label)}</span>
            <div class="min-w-0">
              <p class="destination-depth-label">${item.label}</p>
              <h5 class="destination-depth-value">${item.value}</h5>
            </div>
          </div>
          <p class="destination-depth-copy">${item.copy}</p>
          <div class="destination-depth-chip-row">
            ${(item.chips || []).filter(Boolean).slice(0, 3).map((chip) => `<span class="destination-depth-chip">${chip}</span>`).join("")}
          </div>
        </article>
      `).join("");
      fitStrip.innerHTML = `
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Trip fit shortcuts</p>
        <div class="destination-fit-grid">
          ${buildDestinationFitRows(city, guide, details).map((item) => `
            <div class="destination-fit-card">
              <p class="destination-fit-label">${item.label}</p>
              <p class="destination-fit-value">${item.value}</p>
            </div>
          `).join("")}
        </div>
      `;
      trustCopy.textContent = getEditorialTrustCopy(city, guide);
      highlightChips.innerHTML = guide.highlights.map((item) => `
        <span class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">${item}</span>
      `).join("");
      planningTip.textContent = guide.tip;
      const relatedCities = getRelatedGuideCities(city);
      const stickyState = getGuideStickyState("city", city);
      stickyActions.innerHTML = `
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="editorial-sticky-copy">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Quick actions</p>
            <p class="editorial-sticky-copy-detail mt-2 text-sm leading-6 text-muted">Use ${guide.title} as the plan, move back to the full library, or compare it with a nearby fit.</p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-blue-soft px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">${stickyState}</span>
            <button class="guide-action-button rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-city-guides-home" type="button">
              Back to City Guides
            </button>
            <a class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-city-guide" data-city="${city}" href="#build">
              Plan ${guide.title}
            </a>
            <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${guideCountry}" type="button">
              Open ${guideCountry}
            </button>
            ${relatedCities[0] ? `
              <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="compare-city-guide" data-city="${city}" data-compare-city="${relatedCities[0].city}" type="button">
                Compare ${relatedCities[0].title}
              </button>
            ` : ""}
          </div>
        </div>
      `;
      hbUtils.updateEditorialStickyBars?.();
      renderCityGuideCompare(city);

      const categoryMap = [
        ["Best Attractions", details.bestAttractions],
        ["Best Restaurants", details.bestRestaurants],
        ["Best for a Budget", details.bestBudget],
        ["Best luxury things to do", details.bestLuxury],
        ["Best things to do for couples", details.bestCouples],
        ["Best things to do with kids", details.bestKids],
        ["Best things to do for solo travelers", details.bestSolo],
        ["Best things to do for first timers", details.bestFirstTimers],
        ["Best unique things to do", details.bestUnique],
        ["Best breakfast spots", details.bestBreakfast],
        ["Best lunch spots", details.bestLunch],
        ["Best dinner spots", details.bestDinner],
        ["Best cocktail spots", details.bestCocktails],
        ["Best bakeries", details.bestBakeries],
        ["Best coffee shops", details.bestCoffee]
      ];

      toc.innerHTML = categoryMap.slice(0, 6).map(([label]) => `
        <button class="rounded-2xl bg-white px-3 py-3 text-left text-sm font-semibold text-secondary ring-1 ring-line transition hover:border-secondary/40 hover:text-primary" data-action="scroll-guide-section" data-section-id="${makeSectionId(label)}" type="button">
          ${getSectionNavLabel(label)}
        </button>
      `).join("") + `
        <button class="rounded-2xl bg-white px-3 py-3 text-left text-sm font-semibold text-secondary ring-1 ring-line transition hover:border-secondary/40 hover:text-primary" data-action="scroll-guide-section" data-section-id="city-guide-destination-depth" type="button">
          Planning depth
        </button>
      `;

      grid.innerHTML = categoryMap.map(([label, items]) => `
        <section id="${makeSectionId(label)}" class="rounded-[24px] border border-line bg-white px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${label}</p>
          <h5 class="mt-2 font-display text-[1.7rem] font-bold leading-tight text-ink">${label}</h5>
          <p class="mt-3 max-w-[44rem] text-[0.97rem] leading-7 text-muted">${getSectionIntro(city, label)}</p>
          <div class="mt-5 space-y-4">
            ${items.map((item, index) => `
              <article class="rounded-[22px] border border-line bg-surface-card px-4 py-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-4">
                    <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">${index + 1}</span>
                    <div class="min-w-0">
                      <h6 class="font-display text-xl font-bold leading-tight text-ink">${item}</h6>
                      <p class="mt-2 max-w-[40rem] text-[0.96rem] leading-7 text-muted">${buildEditorialItemCopy(label, item, city)}</p>
                    </div>
                  </div>
                  <a class="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-city-guide" data-city="${city}" href="#build">
                    Plan ${guide.title}
                  </a>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      `).join("");

      relatedGrid.innerHTML = relatedCities.map((item) => `
        <article class="rounded-[22px] border border-line bg-surface-card px-4 py-4">
          <p class="font-display text-lg font-bold">${item.title}</p>
          <p class="mt-2 text-sm leading-6 text-muted">${item.summary}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-city-guide" data-city="${item.city}" type="button">
              Read this guide
            </button>
            <a class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="use-city-guide" data-city="${item.city}" href="#build">
              Plan ${item.title}
            </a>
            <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="compare-city-guide" data-city="${city}" data-compare-city="${item.city}" type="button">
              Compare with ${item.title}
            </button>
          </div>
        </article>
      `).join("");
    }


Object.assign(hbUtils, {
  renderDestinationHero,
  renderCountryGuide,
  getEditorialIntro,
  getEditorialDek,
  getEditorialTrustCopy,
  getEditorialSummaryCards,
  getEditorialGallery,
  getSectionIntro,
  buildEditorialItemCopy,
  makeSectionId,
  getSectionNavLabel,
  getRelatedGuideCities,
  getRelatedGuideCountries,
  getCityPreviewDepth,
  getCountryPreviewDepth,
  getGuideStickyState,
  renderGuidePlanningContext,
  applyGuidePlanningContextFromCity,
  applyGuidePlanningContextFromCountry,
  renderCityGuideCompare,
  renderCountryGuideCompare,
  getCombinedCityGuideSuggestions,
  setCityGuideSuggestionIndex,
  applyCityGuideSuggestionSelection,
  renderCityGuideSuggestions,
  renderCityGuidesLanding,
  renderCountryGuidesLanding,
  getCombinedCountryGuideSuggestions,
  setCountryGuideSuggestionIndex,
  applyCountryGuideSuggestionSelection,
  renderCountryGuideSuggestions,
  renderCountryGuideDetail,
  renderCityGuideDetail
});
})();
