(() => {
const { state: hbState, data: hbData, refs: hbRefs, utils: hbUtils } = window.HB_APP;
const {
  getDestinationHero,
  applyHeroOverlay,
  getCountryGuide,
  getGuideHero,
  isPlaceholderImage,
  buildEditorialCardArt,
  buildDestinationFallbackArt,
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
const destinationPhotoCache = new Map();
const travelGuidelineCountries = new Set(hbData.travelGuidelineCountries || []);
const travelGuidelinesUrl = hbData.travelGuidelinesUrl || "https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html";

function renderTravelGuidelineNotice(container, country) {
  if (!container) return;
  if (!travelGuidelineCountries.has(country)) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  container.classList.remove("hidden");
  container.innerHTML = `
    <div class="flex flex-col gap-4 rounded-[22px] bg-warm px-4 py-4 ring-1 ring-warm-line sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined mt-0.5 text-primary" aria-hidden="true">warning</span>
        <div>
          <p class="text-sm font-bold text-ink">Check current travel information</p>
          <p class="mt-1 max-w-[42rem] text-sm leading-6 text-muted">Safety, entry rules, and access can change. Review official guidance before you book or travel.</p>
        </div>
      </div>
      <a class="inline-flex min-h-10 items-center justify-center rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition hover:brightness-95" href="${travelGuidelinesUrl}" target="_blank" rel="noreferrer noopener">Check the Most Recent Travel Guidelines</a>
    </div>
  `;
}

function renderStarterGuideNotice(container, isStarter) {
  if (!container) return;
  if (!isStarter) {
    container.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  container.classList.remove("hidden");
  container.innerHTML = `
    <div class="flex items-start gap-3 rounded-[22px] bg-surface-soft px-4 py-4 ring-1 ring-line">
      <span class="material-symbols-outlined mt-0.5 text-secondary" aria-hidden="true">auto_awesome</span>
      <div>
        <p class="text-sm font-bold text-ink">Starter guide</p>
        <p class="mt-1 text-sm leading-6 text-muted">Use this as a helpful starting point. Confirm current hours, access, and booking details with official tourism boards, attraction sites, parks, and venues.</p>
      </div>
    </div>
  `;
}
function stripCommonsMarkup(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function humanizeGuideCopy(value) {
  return String(value ?? "")
    .replace(/\busers\b/gi, "travelers")
    .replace(/\buser\b/gi, "traveler")
    .replace(/\bthe planner\b/gi, "we")
    .replace(/\bplanner\b/gi, "trip plan")
    .replace(/\bmeaningfully\b/gi, "noticeably")
    .replace(/\bmeaningful\s+history\b/gi, "important history")
    .replace(/\bmeaningful\s+cultural\s+travel\b/gi, "thoughtful cultural travel")
    .replace(/\bmeaningful\s+food\b/gi, "memorable food")
    .replace(/\bmeaningful\s+day trips\b/gi, "memorable day trips")
    .replace(/\bmeaningful\s+stops\b/gi, "worthwhile stops")
    .replace(/\bmeaningful\b/gi, "worthwhile");
}

async function findCommonsDestinationPhoto(city, guide) {
  if (destinationPhotoCache.has(city)) return destinationPhotoCache.get(city);

  const name = city.split(",")[0].trim();
  const country = city.split(",").slice(-1)[0].trim();
  const endpoint = new URL("https://commons.wikimedia.org/w/api.php");
  endpoint.search = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `${name} ${country} landmark`,
    gsrnamespace: "6",
    gsrlimit: "10",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1400",
    format: "json",
    origin: "*"
  });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(endpoint.toString(), { signal: controller.signal });
    if (!response.ok) throw new Error("Commons photo search failed");
    const payload = await response.json();
    const candidates = Object.values(payload.query?.pages || {})
      .map((page) => {
        const info = page.imageinfo?.[0] || {};
        const title = String(page.title || "");
        const imageUrl = info.thumburl || info.url || "";
        const excluded = /flag|map|logo|coat of arms|diagram|icon|stamp/i.test(title);
        if (!imageUrl || excluded || !/\.(jpe?g|png|webp)(?:$|\?)/i.test(imageUrl)) return null;
        const metadata = info.extmetadata || {};
        const artist = stripCommonsMarkup(metadata.Artist?.value || metadata.Credit?.value).slice(0, 120);
        const license = stripCommonsMarkup(metadata.LicenseShortName?.value).slice(0, 80);
        if (/non[- ]?commercial|\bby-nc\b/i.test(license)) return null;
        return {
          url: imageUrl,
          sourceUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/^File:/, "").replace(/\s+/g, "_"))}`,
          credit: [artist, license, "Wikimedia Commons"].filter(Boolean).join(" / "),
          alt: `${guide.title} destination photo`
        };
      })
      .filter(Boolean);
    const photo = candidates[0] || null;
    destinationPhotoCache.set(city, photo);
    return photo;
  } catch (error) {
    destinationPhotoCache.set(city, null);
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

function clearCityGuidePhotoCredit() {
  const credit = document.getElementById("city-guide-photo-credit");
  if (!credit) return;
  credit.textContent = "";
  credit.classList.add("hidden");
}

function renderCityGuidePhotoCredit(photo) {
  const credit = document.getElementById("city-guide-photo-credit");
  if (!credit || !photo) return;
  credit.textContent = "Photo: ";
  const link = document.createElement("a");
  link.href = photo.sourceUrl;
  link.target = "_blank";
  link.rel = "noreferrer noopener";
  link.className = "font-semibold text-secondary underline decoration-line underline-offset-2";
  link.textContent = photo.credit || "Wikimedia Commons";
  credit.appendChild(link);
  credit.classList.remove("hidden");
}

async function hydrateCityGuidePhoto(city, guide) {
  const storedHero = hbData.destinationHeroData?.[city] || {};
  if (hbData.destinationCoverage?.[city]?.status !== "expanded" || storedHero.image) return;
  const photo = await findCommonsDestinationPhoto(city, guide);
  if (!photo || hbState.selectedGuideCity !== city) return;
  const loaded = await new Promise((resolve) => {
    const tester = new Image();
    const timeout = window.setTimeout(() => resolve(false), 7000);
    tester.onload = () => {
      window.clearTimeout(timeout);
      resolve(true);
    };
    tester.onerror = () => {
      window.clearTimeout(timeout);
      resolve(false);
    };
    tester.src = photo.url;
  });
  if (!loaded || hbState.selectedGuideCity !== city) return;

  const heroImage = document.getElementById("city-guide-hero-image");
  const categoryImage = document.getElementById("city-guide-category-view-image");
  const galleryImage = document.querySelector("#city-guide-gallery img");
  [heroImage, categoryImage, galleryImage].filter(Boolean).forEach((image) => {
    image.src = photo.url;
    image.alt = photo.alt;
  });
  renderCityGuidePhotoCredit(photo);
}

function normalizeLookupValue(value) {
      return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    const resolveCanonicalDestination = hbUtils.resolveCanonicalDestination;

function renderDestinationHero(targetPrefix) {
      const hero = getDestinationHero();
      const image = document.getElementById(`${targetPrefix}-hero-image`);
      const supportImage = document.getElementById(`${targetPrefix}-support-image`);
      const title = document.getElementById(`${targetPrefix}-hero-title`);
      const copy = document.getElementById(`${targetPrefix}-hero-copy`);
      if (!image || !title || !copy) {
        if (supportImage) {
          supportImage.src = hero.image;
          supportImage.alt = `${hero.title} planning preview`;
          supportImage.dataset.fallbackSrc = buildDestinationFallbackArt(hero.title || hbState.appState.destination, "#b94712");
        }
        hbUtils.renderDestinationStoryBands?.();
        return;
      }

      image.src = hero.image;
      image.alt = hero.copy ? `${hero.title}: ${humanizeGuideCopy(hero.copy)}` : hero.title;
      if (supportImage) {
        supportImage.src = hero.image;
        supportImage.alt = `${hero.title} planning preview`;
        supportImage.dataset.fallbackSrc = buildDestinationFallbackArt(hero.title || hbState.appState.destination, "#b94712");
      }
      title.textContent = hero.title;
      copy.textContent = humanizeGuideCopy(hero.copy);
      applyHeroOverlay(image.closest(".destination-hero"), hbState.appState.destination, hero.overlay || "balanced");
      hbUtils.renderDestinationStoryBands?.();
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
      summary.textContent = humanizeGuideCopy(guide.summary);
      grid.innerHTML = guide.cards.map(([label, copy]) => `
        <div class="${targetPrefix === "trip" ? "trip-guide-card" : "rounded-2xl border border-line bg-white px-4 py-4"}">
          <p class="${targetPrefix === "trip" ? "trip-guide-card-label" : "text-xs font-semibold uppercase tracking-[0.14em] text-muted"}">${targetPrefix === "trip" ? (tripCardLabelMap[label] || label) : label}</p>
          <p class="${targetPrefix === "trip" ? "trip-guide-card-copy" : "mt-2 text-sm leading-6 text-ink"}">${humanizeGuideCopy(copy)}</p>
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
      return humanizeGuideCopy(getCityEditorialPage(city)?.dek || buildCityGuideLead(guide.summary));
    }

    function getEditorialIntro(city, guide) {
      return (getCityEditorialPage(city)?.intro || [
        `${guide.title} is easiest to enjoy when the trip is built around what the city genuinely does well instead of trying to fit everything into one pass.`,
        `The strongest version of ${guide.title} usually balances its most recognizable highlights with enough neighborhood time, food, and breathing room to make the city feel real.`
      ]).map(humanizeGuideCopy);
    }

    function getEditorialTrustCopy(city, guide) {
      return humanizeGuideCopy(getCityEditorialPage(city)?.trust || `Use this guide to see what is worth prioritizing in ${guide.title}, what fits the city's rhythm, and what can make the trip easier to plan.`);
    }

    function getEditorialSummaryCards(city, guide) {
      return (getCityEditorialPage(city)?.summaryCards || [
        ["Best for", buildCityGuideLead(guide.summary).replace(/^The city is known for /, "").replace(/\.$/, "")],
        ["Popular highlights", guide.highlights.join(" • ")],
        ["How to plan it", guide.tip]
      ]).map(([label, copy]) => [label, humanizeGuideCopy(copy)]);
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
          copy: `Choose a place to stay that fits this trip style: ${bestFor}. Do not choose only by the lowest price or a generic central label.`
        },
        {
          label: "Getting around",
          value: "Group the day by area",
          copy: guide.tip
        },
        {
          label: "Book early",
          value: highlights || "The moments that matter most",
          copy: "Book the attractions, meals, or experiences that would change the trip if you missed them."
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
        planningNote: guide.tip || `Keep the ${guide.title} plan grouped by area so the days feel easier to follow.`,
        coverageStatus: hbData.destinationCoverage?.[guide.city]?.status || "developed"
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
          copy: stayToolkit?.copy || `A good base should make it easier to enjoy ${buildCityGuideLead(guide.summary).replace(/^The city is known for /, "").replace(/\.$/, "")}, not just look central on a map.`,
          chips: highlights.slice(0, 3)
        },
        {
          label: "Priority picks",
          value: firstTimerPicks,
          copy: `For a first trip, start with ${firstTimerPicks} before adding extra stops.`,
          chips: (details.bestAttractions || highlights).slice(0, 3)
        },
        {
          label: "Food strategy",
          value: bestRestaurants,
          copy: `Use food to give the day a stronger sense of place. A meal like ${bestRestaurants} can make it more specific and easier to remember.`,
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
          value: routeToolkit?.value || bookToolkit?.value || "Do not overfill the day",
          copy: routeToolkit?.copy || bookToolkit?.copy || guide.tip,
          chips: [hbState.appState.pace || "Balanced", "Simple routes", "Book ahead when needed"]
        }
      ];
    }

    function buildDestinationFitRows(city, guide, details) {
      const couples = joinGuideItems((details.bestCouples || []).slice(0, 2), "a scenic evening and one strong meal");
      const family = joinGuideItems((details.bestKids || []).slice(0, 2), "one easier family-friendly stop");
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
          label: "More ways to enjoy it",
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
          title: humanizeGuideCopy(item.title),
          copy: humanizeGuideCopy(item.copy),
          image: isPlaceholderImage(item.image)
            ? hero.image
            : resolvePrototypeImage(item.image, `${guide.title} ${item.title}`, "#2b5f8a", hero.visualTheme)
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
          image: buildEditorialCardArt(guide.title, `${guide.title} first look`, `A strong opening image of ${guide.title}, built to make the destination feel real before the itinerary starts.`, "#2b5f8a", 0, hero.visualTheme),
          title: `${guide.title} first look`,
          copy: humanizeGuideCopy(`A strong opening image of ${guide.title}, built to make the destination feel real before the itinerary starts.`)
        },
        {
          image: buildEditorialCardArt(guide.title, `${guide.title} neighborhood rhythm`, `The city usually becomes more enjoyable once the trip leaves room for its local pace, not just its headline attractions.`, "#2b5f8a", 1, hero.visualTheme),
          title: `${guide.title} neighborhood rhythm`,
          copy: humanizeGuideCopy(`The city usually becomes more enjoyable once the trip leaves room for its local pace, not just its headline attractions.`)
        },
        {
          image: buildEditorialCardArt(guide.title, `${guide.title} standout moments`, `The best plans protect a few high-confidence highlights while still leaving room for the hours in between.`, "#2b5f8a", 2, hero.visualTheme),
          title: `${guide.title} standout moments`,
          copy: humanizeGuideCopy(`The best plans protect a few high-confidence highlights while still leaving room for the hours in between.`)
        }
      ];
    }

    const guideSectionMeta = {
      "Things to do": { eyebrow: "Start here", title: "Things to do", icon: "local_activity", copy: "Find experiences that make the city feel like more than a checklist." },
      "Attractions": { eyebrow: "The highlights", title: "Top attractions", icon: "photo_camera", copy: "Start with the places most travelers come to see." },
      "Themes": { eyebrow: "Choose a mood", title: "Trip styles", icon: "tune", copy: "Choose a trip style, then see what fits that mood here." },
      "Food guide": { eyebrow: "Eat and drink", title: "Food and drink", icon: "restaurant", copy: "Build around local dishes, markets, cafes, and memorable meals." },
      "Neighborhoods": { eyebrow: "Find your pace", title: "Neighborhoods to explore", icon: "map", copy: "See which areas are worth walking, staying, or lingering in." },
      "Sample itineraries": { eyebrow: "Shape your days", title: "Sample itineraries", icon: "calendar_month", copy: "Get a few realistic ways to shape your days." },
      "Best Attractions": { eyebrow: "The highlights", title: "Start with these sights", icon: "photo_camera", copy: "The places most travelers want to see first." },
      "Best Restaurants": { eyebrow: "Eat well", title: "Where to eat", icon: "restaurant", copy: "Good meals and local flavors to build into the trip." },
      "Best for a Budget": { eyebrow: "Spend thoughtfully", title: "Keep it affordable", icon: "savings", copy: "Ways to enjoy the destination without paying for every stop." },
      "Best luxury things to do": { eyebrow: "Make it special", title: "Worth the splurge", icon: "diamond", copy: "Polished upgrades for the moments you want to remember." },
      "Best things to do for couples": { eyebrow: "For two", title: "For a romantic trip", icon: "favorite", copy: "Ideas for an easy, memorable trip for two." },
      "Best things to do with kids": { eyebrow: "Traveling with kids", title: "For families", icon: "family_restroom", copy: "Easy wins for a trip with kids, with room for breaks." },
      "Best things to do for solo travelers": { eyebrow: "Go at your pace", title: "For solo travelers", icon: "person", copy: "Good ways to explore on your own schedule." },
      "Best things to do for first timers": { eyebrow: "First time here?", title: "Do not miss these", icon: "flag", copy: "The highlights worth protecting on a first visit." },
      "Best unique things to do": { eyebrow: "Look beyond the obvious", title: "Something different", icon: "explore", copy: "Local-feeling ideas beyond the usual checklist." },
      "Best breakfast spots": { eyebrow: "Start the day", title: "Breakfast worth leaving for", icon: "free_breakfast", copy: "Breakfast ideas that give the day a good beginning." },
      "Best lunch spots": { eyebrow: "Midday break", title: "Good lunch stops", icon: "lunch_dining", copy: "Easy places to pause and refuel between plans." },
      "Best dinner spots": { eyebrow: "Make a night of it", title: "Plan a great dinner", icon: "dinner_dining", copy: "Meals worth making part of the evening." },
      "Best cocktail spots": { eyebrow: "After dark", title: "Drinks and nightlife", icon: "local_bar", copy: "Good options when you want to keep the night going." },
      "Best bakeries": { eyebrow: "A little treat", title: "Pastries and bakeries", icon: "bakery_dining", copy: "Local bakes and sweet stops to look forward to." },
      "Best coffee shops": { eyebrow: "Take a pause", title: "Coffee breaks", icon: "local_cafe", copy: "Cafes and coffee stops for a slower moment." }
    };

    function getGuideSectionMeta(label) {
      return guideSectionMeta[label] || {
        eyebrow: "Worth knowing",
        title: label,
        icon: "travel_explore",
        copy: `Ideas to help you make the most of ${label.toLowerCase()}.`
      };
    }

    function getSectionIntro(city, label) {
      const editorial = getCityEditorialPage(city);
      const sectionIntroCopy = {
        "Things to do": `Start with a few experiences that make ${city.split(",")[0]} feel like a real trip, not just a list of sights.`,
        "Attractions": `These are the headline places worth protecting first, especially if this is your first time in ${city.split(",")[0]}.`,
        "Themes": "Choose the version of the city that sounds most like your trip, then add the ideas that fit that mood.",
        "Food guide": `Use food to give your ${city.split(",")[0]} days a stronger sense of place, from quick local stops to one meal worth planning around.`,
        "Neighborhoods": `A little neighborhood time helps ${city.split(",")[0]} feel more lived-in and makes the route easier to shape.`,
        "Sample itineraries": "Use these as starting points. Keep the parts you like and leave the rest flexible."
      };
      return humanizeGuideCopy(editorial?.sectionIntros?.[label] || sectionIntroCopy[label] || getGuideSectionMeta(label).copy);
    }

    function buildEditorialItemCopy(label, item, city) {
      const editorial = getCityEditorialPage(city);
      if (editorial?.itemCopy?.[label]?.[item]) return editorial.itemCopy[label][item];

      const details = hbData.cityGuideDetailData[city] || {};
      const cityName = city.split(",")[0];
      const guideRecord = hbData.cityGuideData.find((entry) => entry.city === city) || {};
      if (label === "Themes") {
        const themeCopy = {
          "Adventure": `Add more movement and look for ideas such as ${joinGuideItems((details.bestUnique || details.bestSolo || []).slice(0, 2), "a day outside the usual route")}.`,
          "Relaxing": `Keep the schedule lighter and leave room for ${joinGuideItems((details.bestCouples || details.bestUnique || []).slice(0, 2), "a scenic stop and a slower meal")}.`,
          "Food and drink": `Make the local food scene part of the plan, starting with ${joinGuideItems(uniqueGuideItems(details.bestRestaurants, details.bestDinner, details.bestLunch).slice(0, 2), "a local meal and a market stop")}.`,
          "Arts and culture": `Give the trip more context with ${joinGuideItems((details.bestAttractions || details.bestFirstTimers || []).slice(0, 2), "a museum, landmark, or cultural stop")}.`,
          "History": `Follow the stories that shaped ${cityName}, with places like ${joinGuideItems((details.bestAttractions || []).slice(0, 2), "the city's most important historic places")}.`,
          "Outdoors": `Make space for fresh air and open views through ${joinGuideItems((details.bestUnique || details.bestSolo || []).slice(0, 2), "a park, waterfront, or nearby escape")}.`,
          "Nightlife": `Plan one evening around ${joinGuideItems((details.bestCocktails || details.bestUnique || []).slice(0, 2), "a good bar, live music, or a late dinner")}.`,
          "Shopping": `Leave time to browse ${joinGuideItems(guideRecord.areas || [], "local shops and markets")}, especially in neighborhoods that reward wandering.`
        };
        return themeCopy[item] || `${item} gives you a different way to experience ${cityName}.`;
      }
      if (label === "Sample itineraries") {
        const firstVisit = joinGuideItems((details.bestFirstTimers || details.bestAttractions || []).slice(0, 2), "the main sights");
        const food = joinGuideItems((details.bestDinner || details.bestRestaurants || []).slice(0, 1), "a local meal");
        const neighborhood = joinGuideItems((details.bestUnique || details.bestSolo || []).slice(0, 1), "a neighborhood walk");
        if (item === "Classic first visit") return `Pair ${firstVisit} with time to wander nearby, so the day has a clear shape without feeling packed.`;
        if (item === "Food and neighborhoods") return `Build around ${food}, then leave space for ${neighborhood} and the places you find along the way.`;
        return `Keep ${firstVisit} to one side of the day and give the rest to ${neighborhood}, a slower meal, or an easy evening.`;
      }
      const itemCopy = {
        "Best Attractions": `${item} is a strong pick when you want one of ${cityName}'s headline experiences.`,
        "Best Restaurants": `${item} is an easy way to make the trip feel more local, one meal at a time.`,
        "Best for a Budget": `${item} keeps this part of the trip enjoyable without adding another big expense.`,
        "Best luxury things to do": `${item} is an easy upgrade when you want this part of the trip to feel special.`,
        "Best things to do for couples": `${item} works well for a trip for two, especially when you want the day to feel unhurried.`,
        "Best things to do with kids": `${item} gives families a clear plan with room for breaks.`,
        "Best things to do for solo travelers": `${item} is easy to enjoy at your own pace.`,
        "Best things to do for first timers": `${item} is a strong first-trip choice if you want the headline experience.`,
        "Best unique things to do": `${item} adds a more local or unexpected turn to the day.`,
        "Best breakfast spots": `${item} is a good place to start the day before the next stop.`,
        "Best lunch spots": `${item} gives you a simple place to pause and refuel between plans.`,
        "Best dinner spots": `${item} is worth making part of the evening when you want dinner to feel like an experience.`,
        "Best cocktail spots": `${item} is a good option when you want to keep the evening going.`,
        "Best bakeries": `${item} gives you an easy local treat to enjoy while you explore.`,
        "Best coffee shops": `${item} is a good place to slow down for a coffee and reset.`
      };
      return itemCopy[label] || `${item} is a simple way to make the ${cityName} trip feel more like your own.`;
    }

    function makeSectionId(label) {
      return `guide-section-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
    }

    function getSectionNavLabel(label) {
      return getGuideSectionMeta(label).title;
    }

    function uniqueGuideItems(...groups) {
      return groups
        .flatMap((group) => Array.isArray(group) ? group : [])
        .filter(Boolean)
        .filter((item, index, list) => list.indexOf(item) === index);
    }

    function escapeGuideMarkup(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function getCityGuideAreaItems(city, guide) {
      const toolkit = getCityPlanningToolkit(city, guide);
      const stay = toolkit.find((item) => /stay/i.test(item.label));
      const getAreaSet = window.HB_TRIP_HELPERS?.getAreaSet;
      const helperAreas = getAreaSet
        ? [...(getAreaSet(city) || []), ...(getAreaSet(guide.title) || [])]
        : [];
      const toolkitAreas = String(stay?.value || "")
        .split(/,\s*or\s+|\s+or\s+|,\s*/i)
        .map((item) => item.trim())
        .filter(Boolean)
        .filter((item) => !/^(or|and)$/i.test(item));
      return uniqueGuideItems(guide.areas, helperAreas, toolkitAreas).slice(0, 6);
    }

    function getCityGuideCategorySections(city, guide, details) {
      const foodItems = uniqueGuideItems(
        details.bestRestaurants,
        details.bestBreakfast,
        details.bestLunch,
        details.bestDinner,
        details.bestCocktails,
        details.bestBakeries,
        details.bestCoffee
      ).slice(0, 6);
      const activityItems = uniqueGuideItems(
        details.bestUnique,
        details.bestFirstTimers,
        guide.highlights
      ).slice(0, 6);
      const attractionItems = uniqueGuideItems(
        details.bestAttractions,
        details.bestFirstTimers,
        guide.highlights,
        details.bestUnique
      ).slice(0, 6);
      const themeItems = [
        "Adventure",
        "Relaxing",
        "Food and drink",
        "Arts and culture",
        "History",
        "Outdoors",
        "Nightlife",
        "Shopping"
      ];
      const itineraryItems = [
        "Classic first visit",
        foodItems.length ? "Food and neighborhoods" : "",
        "Easygoing highlights"
      ].filter(Boolean);

      return [
        ["Things to do", activityItems],
        ["Attractions", attractionItems],
        ["Themes", themeItems],
        ["Food guide", foodItems],
        ["Neighborhoods", getCityGuideAreaItems(city, guide)],
        ["Sample itineraries", itineraryItems]
      ].filter(([, items]) => items.length);
    }

    function getCityGuideDetailSectionItems(label, details, guide, fallbackItems = []) {
      const pools = {
        "Best Attractions": [details.bestAttractions, details.bestFirstTimers, guide.highlights, details.bestUnique],
        "Best Restaurants": [details.bestRestaurants, details.bestDinner, details.bestLunch, details.bestBreakfast],
        "Best for a Budget": [details.bestBudget, details.bestUnique, details.bestSolo, details.bestAttractions],
        "Best luxury things to do": [details.bestLuxury, details.bestCouples, details.bestRestaurants, details.bestUnique],
        "Best things to do for couples": [details.bestCouples, details.bestUnique, details.bestLuxury, details.bestDinner],
        "Best things to do with kids": [details.bestKids, details.bestBudget, details.bestAttractions, details.bestRestaurants],
        "Best things to do for solo travelers": [details.bestSolo, details.bestUnique, details.bestAttractions, details.bestRestaurants],
        "Best things to do for first timers": [details.bestFirstTimers, details.bestAttractions, guide.highlights, details.bestUnique],
        "Best unique things to do": [details.bestUnique, details.bestSolo, details.bestCouples, details.bestAttractions],
        "Best breakfast spots": [details.bestBreakfast, details.bestCoffee, details.bestBakeries, details.bestLunch],
        "Best lunch spots": [details.bestLunch, details.bestRestaurants, details.bestBreakfast, details.bestDinner],
        "Best dinner spots": [details.bestDinner, details.bestRestaurants, details.bestCocktails, details.bestLunch],
        "Best cocktail spots": [details.bestCocktails, details.bestDinner, details.bestUnique, details.bestRestaurants],
        "Best bakeries": [details.bestBakeries, details.bestBreakfast, details.bestCoffee, details.bestLunch],
        "Best coffee shops": [details.bestCoffee, details.bestBreakfast, details.bestBakeries, details.bestUnique]
      };
      return uniqueGuideItems(...(pools[label] || [fallbackItems])).slice(0, 6);
    }

    function getCityGuideCategoryCards(city, guide, details) {
      const sections = getCityGuideCategorySections(city, guide, details);
      const gallery = getEditorialGallery(city, guide);
      const categoryMeta = {
        "Things to do": { icon: "local_activity", copy: "Find experiences that make the city feel like more than a checklist." },
        "Attractions": { icon: "photo_camera", copy: "Start with the places most travelers come to see." },
        "Themes": { icon: "tune", copy: "Choose a trip style, then see what fits that mood here." },
        "Food guide": { icon: "restaurant", copy: "Build around local dishes, markets, cafés, and memorable meals." },
        "Neighborhoods": { icon: "map", copy: "See which areas are worth walking, staying, or lingering in." },
        "Sample itineraries": { icon: "calendar_month", copy: "Get a few realistic ways to shape your days." }
      };

      return sections.map(([label, items], index) => ({
        label,
        count: items.length,
        sectionId: makeSectionId(label),
        route: getCityGuideCategoryRoute(city, label),
        image: gallery[index % gallery.length]?.image || getGuideHero(city).image,
        icon: categoryMeta[label]?.icon || "travel_explore",
        copy: categoryMeta[label]?.copy || "Explore ideas that fit this destination."
      }));
    }

    function getCityGuideTopPicks(city, guide, details) {
      const gallery = getEditorialGallery(city, guide);
      const items = uniqueGuideItems(
        details.bestFirstTimers,
        details.bestAttractions,
        guide.highlights,
        details.bestUnique
      ).slice(0, 5);

      return items.map((item, index) => {
        const itemText = item.toLowerCase();
        const planningNote = /museum|tower|palace|vatican|colosseum|louvre|sagrada|acropolis|gallery/.test(itemText)
          ? "Check opening times"
          : /walk|stroll|park|beach|garden|view|river|waterfront|market|neighborhood/.test(itemText)
            ? "Best in daylight"
            : "Easy to fit around the day";
        return {
          title: item,
          copy: buildEditorialItemCopy("Best things to do for first timers", item, city),
          image: gallery[index % gallery.length]?.image || getGuideHero(city).image,
          addValue: getCityGuideItemAddValue("Attractions", item, city),
          role: index === 0 ? "Top highlight" : "Good add-on",
          planningNote
        };
      });
    }

    function isGuideItemAdded(city, item) {
      const addedItems = Array.isArray(hbState.guideAddedItems) ? hbState.guideAddedItems : [];
      const candidates = String(item || "")
        .split(",")
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);
      return candidates.some((candidate) => addedItems.some((entry) => (
        entry?.city === city && String(entry.item || "").trim().toLowerCase() === candidate
      )));
    }

    const cityGuideCategoryLabels = {
      "things-to-do": "Things to do",
      "attractions": "Attractions",
      "themes": "Themes",
      "food-guide": "Food guide",
      "neighborhoods": "Neighborhoods",
      "sample-itineraries": "Sample itineraries"
    };

    function getCityGuideCategorySlug(category) {
      const normalized = String(category || "").toLowerCase();
      if (cityGuideCategoryLabels[normalized]) return normalized;
      return Object.entries(cityGuideCategoryLabels).find(([, label]) => label.toLowerCase() === normalized)?.[0] || "";
    }

    function getCityGuideCategoryRoute(city, category) {
      const slug = getCityGuideCategorySlug(category);
      return `city-guides/${slugifyCity(city)}${slug ? `/${slug}` : ""}`;
    }

    function getCityGuideCategorySectionId(category) {
      const slug = getCityGuideCategorySlug(category);
      return slug ? makeSectionId(cityGuideCategoryLabels[slug]) : "";
    }

    function scrollCityGuideCategory(category) {
      const sectionId = getCityGuideCategorySectionId(category);
      if (!sectionId) return;
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function getCityGuideItemAddValue(label, item, city) {
      const details = hbData.cityGuideDetailData[city] || {};
      if (label === "Themes") {
        const themeMap = {
          "Adventure": details.bestUnique || details.bestSolo,
          "Relaxing": details.bestCouples || details.bestUnique,
          "Food and drink": uniqueGuideItems(details.bestRestaurants, details.bestDinner, details.bestLunch),
          "Arts and culture": details.bestAttractions || details.bestFirstTimers,
          "History": details.bestAttractions,
          "Outdoors": details.bestUnique || details.bestSolo,
          "Nightlife": details.bestCocktails || details.bestUnique,
          "Shopping": (hbData.cityGuideData.find((entry) => entry.city === city)?.areas || details.bestUnique)
        };
        return themeMap[item]?.slice(0, 2).join(", ") || item;
      }
      if (label === "Sample itineraries") {
        const firstVisit = (details.bestFirstTimers || details.bestAttractions || []).slice(0, 2);
        const food = (details.bestDinner || details.bestRestaurants || []).slice(0, 1);
        const neighborhood = (details.bestUnique || []).slice(0, 1);
        if (item === "Classic first visit") return firstVisit.join(", ") || city.split(",")[0];
        if (item === "Food and neighborhoods") return [...food, ...neighborhood].join(", ") || city.split(",")[0];
        return [...firstVisit.slice(0, 1), ...neighborhood].join(", ") || city.split(",")[0];
      }
      return item;
    }

    function getCityGuideFaqItems(city, guide, details) {
      const toolkit = getCityPlanningToolkit(city, guide);
      const stay = toolkit.find((item) => /stay/i.test(item.label));
      const route = toolkit.find((item) => /getting|around/i.test(item.label));
      const book = toolkit.find((item) => /book/i.test(item.label));
      const food = joinGuideItems(uniqueGuideItems(
        details.bestRestaurants,
        details.bestDinner,
        details.bestLunch,
        details.bestBreakfast
      ).slice(0, 3), "a few local specialties");

      return [
        ["What is this city best known for?", buildCityGuideLead(guide.summary)],
        ["How many days do I need?", inferDestinationTripLength(guide, details)],
        ["What should I book ahead?", book?.copy || "Protect the one or two experiences that would be difficult to replace."],
        ["What should I eat or drink?", `Start with ${food}, then leave room for a meal or market stop you find while exploring.`],
        ["Where should I stay?", stay ? `${stay.value}. ${stay.copy}` : `Choose a base that keeps ${joinGuideItems(guide.areas, "the main areas")} within easy reach.`],
        ["Is it easy to get around?", route?.copy || guide.tip]
      ];
    }

    function getCityGuideCategorySection(city, guide, details, category) {
      const categorySlug = getCityGuideCategorySlug(category);
      const categoryLabel = cityGuideCategoryLabels[categorySlug];
      if (!categoryLabel) return null;
      return getCityGuideCategorySections(city, guide, details).find(([label]) => label === categoryLabel) || null;
    }

    function getFocusedCityGuideFaqItems(city, guide, details, categoryLabel) {
      const faqItems = getCityGuideFaqItems(city, guide, details);
      const priority = {
        "Things to do": [0, 1, 2],
        "Attractions": [0, 2, 1],
        "Themes": [0, 1, 4],
        "Food guide": [3, 2, 0],
        "Neighborhoods": [4, 5, 1],
        "Sample itineraries": [1, 2, 0]
      }[categoryLabel] || [0, 1, 2];
      return priority.map((index) => faqItems[index]).filter(Boolean);
    }

    function renderCityGuideCategoryView(city, guide, details, categoryLabel, categorySlug) {
      const parentChrome = document.getElementById("city-guide-parent-chrome");
      const fullView = document.getElementById("city-guide-full-view");
      const categoryView = document.getElementById("city-guide-category-view");
      const image = document.getElementById("city-guide-category-view-image");
      const kicker = document.getElementById("city-guide-category-view-kicker");
      const title = document.getElementById("city-guide-category-view-title");
      const summary = document.getElementById("city-guide-category-view-summary");
      const breadcrumbs = document.getElementById("city-guide-category-view-breadcrumbs");
      const backButton = categoryView?.querySelector('[data-action="open-city-guide"]');
      const useButton = document.getElementById("city-guide-category-view-use-btn");
      const introTitle = document.getElementById("city-guide-category-view-intro-title");
      const introCopy = document.getElementById("city-guide-category-view-intro-copy");
      const count = document.getElementById("city-guide-category-view-count");
      const grid = document.getElementById("city-guide-category-view-grid");
      const fitTitle = document.getElementById("city-guide-category-view-fit-title");
      const fitCopy = document.getElementById("city-guide-category-view-fit-copy");
      const faqList = document.getElementById("city-guide-category-view-faq-list");
      const navList = document.getElementById("city-guide-category-view-nav-list");
      if (!parentChrome || !fullView || !categoryView || !image || !kicker || !title || !summary || !breadcrumbs || !backButton || !useButton || !introTitle || !introCopy || !count || !grid || !fitTitle || !fitCopy || !faqList || !navList) return;

      const isFocused = Boolean(categoryLabel && categorySlug);
      parentChrome.classList.toggle("hidden", isFocused);
      fullView.classList.toggle("hidden", isFocused);
      categoryView.classList.toggle("hidden", !isFocused);
      if (!isFocused) return;

      const section = getCityGuideCategorySection(city, guide, details, categorySlug);
      const items = section?.[1] || [];
      const gallery = getEditorialGallery(city, guide);
      const hero = getGuideHero(city);
      const cityName = city.split(",")[0];
      const guideCountry = getGuideCountryForCity(city);
      const sectionMeta = getGuideSectionMeta(categoryLabel);
      const relatedCategories = getCityGuideCategoryCards(city, guide, details).filter((category) => category.route !== getCityGuideCategoryRoute(city, categoryLabel));

      image.src = gallery[0]?.image || hero.image;
      image.alt = `${categoryLabel} in ${guide.title}`;
      kicker.textContent = `${guide.title} guide`;
      title.textContent = `${categoryLabel} in ${guide.title}`;
      summary.textContent = getSectionIntro(city, categoryLabel);
      applyHeroOverlay(image.closest(".city-guide-category-view-hero"), city, hero.overlay || "balanced");
      breadcrumbs.innerHTML = `
        <a class="font-medium text-white/80 hover:text-white" href="#city-guides">City Guides</a>
        <span aria-hidden="true">/</span>
        <span class="font-medium text-white/80">${escapeGuideMarkup(guideCountry)}</span>
        <span aria-hidden="true">/</span>
        <a class="font-medium text-white/80 hover:text-white" data-action="open-city-guide" data-city="${escapeGuideMarkup(city)}" href="#${getCityGuideCategoryRoute(city, "")}">${escapeGuideMarkup(cityName)}</a>
        <span aria-hidden="true">/</span>
        <span class="font-semibold text-white">${escapeGuideMarkup(categoryLabel)}</span>
      `;
      backButton.dataset.city = city;
      backButton.setAttribute("data-city", city);
      backButton.setAttribute("aria-label", `Back to the ${guide.title} city guide`);
      useButton.dataset.city = city;
      useButton.textContent = `Plan ${guide.title}`;
      introTitle.textContent = `A shortlist for ${cityName}`;
        introCopy.textContent = `${getSectionIntro(city, categoryLabel)} These are ideas to build around, not a schedule you have to follow.`;
      count.textContent = `${items.length} ${items.length === 1 ? "idea" : "ideas"}`;
      fitTitle.textContent = `${categoryLabel} that feels like ${cityName}`;
      fitCopy.textContent = `${buildCityGuideLead(guide.summary)} ${getEditorialTrustCopy(city, guide)}`;

      grid.innerHTML = items.map((item, index) => {
        const imageItem = gallery[index % gallery.length] || hero;
        const itemValue = getCityGuideItemAddValue(categoryLabel, item, city);
        return `
          <article class="city-guide-category-view-card">
            <div class="city-guide-category-view-card-media">
              <img src="${imageItem.image}" alt="${escapeGuideMarkup(item)} in ${escapeGuideMarkup(guide.title)}" />
            </div>
            <div class="city-guide-category-view-card-body">
              <p class="city-guide-category-view-card-index flex items-center gap-2"><span class="material-symbols-outlined text-base" aria-hidden="true">${sectionMeta.icon}</span><span>${String(index + 1).padStart(2, "0")} ${escapeGuideMarkup(categoryLabel)}</span></p>
              <h5 class="mt-2 font-display text-xl font-bold leading-tight text-ink">${escapeGuideMarkup(item)}</h5>
              <p class="city-guide-category-view-card-copy">${escapeGuideMarkup(humanizeGuideCopy(buildEditorialItemCopy(categoryLabel, item, city)))}</p>
              <div class="city-guide-category-view-card-action">
                <button class="guide-action-button w-full rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="add-guide-item" data-city="${escapeGuideMarkup(city)}" data-item="${escapeGuideMarkup(itemValue)}" type="button">
                  Add to my trip
                </button>
              </div>
            </div>
          </article>
        `;
      }).join("");

      faqList.innerHTML = getFocusedCityGuideFaqItems(city, guide, details, categoryLabel).map(([question, answer]) => `
        <details class="rounded-[16px] border border-line bg-white px-3 py-3">
          <summary class="cursor-pointer list-none pr-5 text-sm font-semibold leading-6 text-ink">${escapeGuideMarkup(question)}</summary>
          <p class="mt-2 text-sm leading-6 text-muted">${escapeGuideMarkup(answer)}</p>
        </details>
      `).join("");

      navList.innerHTML = relatedCategories.map((category) => `
        <a data-action="open-city-guide-category" data-city="${escapeGuideMarkup(city)}" data-category="${escapeGuideMarkup(category.route.split("/").pop())}" href="#${category.route}">
          ${escapeGuideMarkup(category.label)}
        </a>
      `).join("");
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
        "Bangkok, Thailand",
        "Barcelona, Spain",
        "Lisbon, Portugal",
        "Istanbul, Türkiye",
        "Sydney, Australia"
      ].map((city) => hbData.cityGuideData.find((item) => item.city === city)).filter(Boolean);

      container.innerHTML = `
        <div class="guide-featured-collection rounded-[24px] border border-line bg-white px-4 py-4 shadow-card">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Popular city guides</p>
              <h4 class="mt-1 font-display text-xl font-bold text-ink">Find a city that fits your trip</h4>
            <p class="mt-2 text-sm leading-6 text-muted">Start with a popular city, then build a trip around the places you want to see.</p>
            </div>
            <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">Popular picks</span>
          </div>
          <div class="guide-featured-row mt-4">
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
                    <p class="text-sm leading-6 text-muted">${humanizeGuideCopy(buildCityGuideLead(guide.summary))}</p>
                    <div class="mt-3 rounded-2xl bg-white px-4 py-4 ring-1 ring-line">
                      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${preview.label}</p>
                      <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(preview.copy)}</p>
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
                preview: "Start with the trip basics"
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
        label: "What people come here for",
        copy: bestFor,
        standout
      };
    }

    function getCountryPreviewDepth(country, guide) {
      return {
        label: "What the country is known for",
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
          kicker: "From the city guide",
          next: ""
        };
      }

      if (context.sourceType === "city") {
        const hero = getGuideHero(context.sourceLocation || context.sourceName || "");
        return {
          image: hero.image,
          kicker: "From the city guide",
          next: `Next: keep ${context.sourceName} as your destination, then add dates, travelers, and budget before building the trip.`
        };
      }

      const hero = getCountryHero(context.sourceLocation || context.sourceName || "");
      return {
        image: hero.image,
        kicker: "Start with the country",
        next: `Next: confirm the broader direction, then decide whether ${context.suggestedBase} should be the first city in your trip.`
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
        if (kicker) kicker.textContent = "From the city guide";
        if (next) next.textContent = "";
        return;
      }

      const visual = getGuidePlanningVisual(context);
      wrap.classList.remove("hidden");
      title.textContent = context.sourceType === "city"
        ? `Starting from the ${context.sourceName} guide`
        : `Starting from the ${context.sourceName} country guide`;
      const addedGuideItems = (Array.isArray(hbState.guideAddedItems) ? hbState.guideAddedItems : [])
        .filter((entry) => entry.city === context.sourceLocation)
        .map((entry) => entry.item)
        .filter(Boolean)
        .slice(0, 3);
      const addedGuideSummary = addedGuideItems.join(", ");
      copy.textContent = context.sourceType === "city"
        ? `We prefilled this around ${context.sourceName}. Your first draft will start with what the city is genuinely known for, with ${context.suggestedBase} giving the trip a clear place to begin.${addedGuideSummary ? ` You added ${addedGuideSummary} from the guide, so we will keep them in view.` : ""}`
        : `We set ${context.sourceName} as the broader direction. ${context.suggestedBase} is a strong first city to consider, so the trip can become specific without losing the bigger country view.`;
      const baseChips = context.sourceType === "city"
        ? [
            `Starting city: ${context.sourceName}`,
            `Early focus: ${context.suggestedBase}`,
            "From the city guide"
          ]
        : [
            `Country direction: ${context.sourceName}`,
            `Best first city: ${context.suggestedBase}`,
            "From the country guide"
          ];
      const signalChips = context.signals
        ? [
            context.signals.coverageStatus === "starter"
              ? "Starter guide"
              : context.signals.coverageStatus === "expanded"
                ? "Expanded guide"
                : "Developed guide",
            context.signals.styles?.length ? `Suggested styles: ${context.signals.styles.join(" + ")}` : "",
            context.signals.pace ? `${context.signals.pace} pace` : "",
            context.signals.mustHaves ? `Must-have: ${context.signals.mustHaves}` : ""
          ].filter(Boolean)
        : [];
      const addedGuideChip = addedGuideSummary ? [`Added from guide: ${addedGuideSummary}`] : [];
      const chips = [...baseChips, ...addedGuideChip, ...signalChips].slice(0, 6);
      if (thumb && visual.image) {
        thumb.src = visual.image;
        thumb.classList.remove("hidden");
      }
      if (kicker) kicker.textContent = visual.kicker;
      if (next) next.textContent = visual.next;
      points.innerHTML = chips.map((item) => `
        <span class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">${escapeGuideMarkup(item)}</span>
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
            <p class="mt-2 text-sm leading-6 text-muted">A quick side-by-side look before you decide which city fits this trip better.</p>
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
            supportingCopy: `Popular highlights: ${currentGuide.highlights.join(" • ")}`,
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
            supportingCopy: `Popular highlights: ${targetGuide.highlights.join(" • ")}`,
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
            <p class="mt-2 text-sm leading-6 text-muted">This gives you a quick way to compare two directions before you choose.</p>
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
            supportingCopy: `Good cities to start with: ${currentPreview.standout}`,
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
            supportingCopy: `Good cities to start with: ${targetPreview.standout}`,
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
            supportingCopy: `Popular highlights: ${currentGuide.highlights.join(" • ")}`,
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
            supportingCopy: `Popular highlights: ${targetGuide.highlights.join(" • ")}`,
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
            supportingCopy: `Good cities to start with: ${currentPreview.standout}`,
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
            supportingCopy: `Good cities to start with: ${targetPreview.standout}`,
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
      const hasSearch = Boolean(normalizedQuery);
      const hasRegionFilter = hbState.cityGuideRegionFilter !== "all";
      const shouldShowResults = hasSearch || hasRegionFilter;

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
            <p>${shouldShowResults
              ? `Showing <span class="font-semibold text-ink">${filtered.length}</span> city guide${filtered.length === 1 ? "" : "s"}`
              : "Featured city guides"}</p>
            <p>${shouldShowResults
              ? matchedCountry
                ? `You searched ${matchedCountry}. Open the country overview or stay in the city library.`
                : "Use search or filters to narrow the library."
              : "Search to browse the full city guide library."}</p>
            ${buildActiveContextMarkup("city")}
          </div>
          ${matchedCountry ? `
            <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-country-guide" data-country="${matchedCountry}" type="button">
              Open ${matchedCountry} country guide
            </button>
          ` : ""}
        `;
      }

      if (!shouldShowResults) {
        container.innerHTML = "";
        return;
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
        const hero = getGuideHero(guide.city);
        const country = getGuideCountryForCity(guide.city);
        return `
        <article class="guide-browser-card guide-browser-card--city overflow-hidden rounded-[24px] border border-line bg-white shadow-card">
          <div class="guide-result-media">
            <img src="${hero.image}" alt="${guide.title} travel guide image" />
            <div class="guide-result-media-scrim"></div>
            <div class="guide-result-media-copy">
              <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78">${country}</p>
              <h4 class="mt-1 font-display text-2xl font-bold text-white">${guide.title}</h4>
            </div>
          </div>
          <div class="guide-result-body px-4 py-4">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm leading-6 text-muted">${humanizeGuideCopy(buildCityGuideLead(guide.summary))}</p>
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
              <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(preview.copy)}</p>
            </div>
            <div class="rounded-2xl bg-surface-soft px-4 py-4">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Best-known highlights</p>
              <p class="mt-2 text-sm leading-6 text-ink">${guide.highlights.join(" • ")}</p>
            </div>
            <div class="rounded-2xl bg-warm px-4 py-4 ring-1 ring-warm-line">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Planning tip</p>
              <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(guide.tip)}</p>
            </div>
          </div>
          ${getRelatedGuideCities(guide.city)[0] ? `
            <div class="mt-4 flex flex-wrap gap-2">
              <button class="guide-action-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="hub-compare-city" data-city="${guide.city}" data-compare-city="${getRelatedGuideCities(guide.city)[0].city}" type="button">
                Compare ${getRelatedGuideCities(guide.city)[0].title}
              </button>
            </div>
          ` : ""}
          </div>
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
        "Greece",
        "Spain",
        "United Kingdom",
        "Thailand",
        "Australia"
      ].map((country) => [country, hbData.countryGuideData[country]]).filter(([, guide]) => Boolean(guide));

      container.innerHTML = `
        <div class="guide-featured-collection rounded-[24px] border border-line bg-white px-4 py-4 shadow-card">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Not sure which city?</p>
              <h4 class="mt-1 font-display text-xl font-bold text-ink">Start with a country</h4>
              <p class="mt-2 text-sm leading-6 text-muted">Choose a country first, then narrow it down to the city that feels right for your trip.</p>
            </div>
            <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">Start broad</span>
          </div>
          <div class="guide-featured-row mt-4">
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
                    <p class="text-sm leading-6 text-muted">${humanizeGuideCopy(editorial?.dek || guide.summary)}</p>
                    <div class="mt-3 rounded-2xl bg-white px-4 py-4 ring-1 ring-line">
                      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${preview.label}</p>
                      <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(preview.copy)}</p>
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
      const countLabel = document.getElementById("country-guide-count");
      if (countLabel) {
        const guideCount = Object.keys(hbData.countryGuideData || {}).length;
        countLabel.textContent = `${guideCount} travel guides`;
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
      const hasSearch = Boolean(normalizedQuery);
      const hasRegionFilter = hbState.countryGuideRegionFilter !== "all";
      const shouldShowResults = hasSearch || hasRegionFilter;

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
            <p>${shouldShowResults
              ? `Showing <span class="font-semibold text-ink">${filtered.length}</span> country guide${filtered.length === 1 ? "" : "s"}`
              : "Featured country guides"}</p>
            <p>${shouldShowResults
              ? matchedCountry
                ? `You searched ${matchedCountry}. Open the country guide or jump straight into its city list.`
                : matchedCityCountry
                  ? `That city points toward ${matchedCityCountry}. Start broad there, then drill into the right city.`
                  : "Use search or filters to narrow the library."
              : "Search to browse the full country guide library."}</p>
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

      if (!shouldShowResults) {
        container.innerHTML = "";
        return;
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
                <p class="mt-2 max-w-[20rem] text-sm leading-6 text-white/86">${humanizeGuideCopy(hero.copy)}</p>
              </div>
            </div>

            <div class="px-4 py-4">
              <p class="text-sm leading-6 text-ink">${humanizeGuideCopy(preview)}</p>
              <p class="mt-3 text-sm leading-6 text-muted">${humanizeGuideCopy(lead)}</p>

              <div class="mt-4 grid gap-3">
                <div class="rounded-2xl border border-line bg-white px-4 py-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${depthPreview.label}</p>
                  <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(depthPreview.copy)}</p>
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
                  <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(guide.cards[2]?.[1] || guide.summary)}</p>
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
      const starterNote = document.getElementById("country-guide-starter-note");
      const travelAlert = document.getElementById("country-guide-travel-alert");
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
      summary.textContent = humanizeGuideCopy(editorial?.dek || guide.summary);
      document.title = `${country} Travel Guide | Horizon Bound`;
      intro.innerHTML = (editorial?.intro || [
        `${country} is easier to choose when you get a feel for the country before settling on one city. That can be the difference between a trip that flows and one that feels like a list of disconnected stops.`,
        `This page gives a broader look at ${country}: what it is best known for, what stands out across the country, and which cities make the best starting points when you are ready to narrow it down.`
      ]).map((paragraph) => `<p>${humanizeGuideCopy(paragraph)}</p>`).join("");
      summaryCards.innerHTML = guide.cards.map(([label, copy]) => `
        <div class="rounded-[20px] border border-line bg-white px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${label}</p>
          <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(copy)}</p>
        </div>
      `).join("");
      renderStarterGuideNotice(starterNote, hbData.countryGuideCoverage?.[country]?.status === "expanded");
      renderTravelGuidelineNotice(travelAlert, country);
      cityChips.innerHTML = cities.map((item) => `
        <button class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line" data-action="open-city-guide" data-city="${item.city}" type="button">${item.title}</button>
      `).join("");
      strengths.textContent = humanizeGuideCopy(guide.cards[0]?.[1] || guide.summary);
      planningTip.textContent = humanizeGuideCopy(guide.cards[2]?.[1] || guide.summary);
      openCitiesBtn.dataset.action = "open-country-cities";
      openCitiesBtn.dataset.country = country;
      openCitiesBtn.textContent = `Browse ${country} cities`;
      const compareCountry = getRelatedGuideCountries(country)[0];
      const stickyState = getGuideStickyState("country", country);
      stickyActions.innerHTML = `
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="editorial-sticky-copy">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Quick actions</p>
          <p class="editorial-sticky-copy-detail mt-2 text-sm leading-6 text-muted">Start with the broader ${country} view, then move to the next step that fits.</p>
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
      const categoryHub = document.getElementById("city-guide-category-hub");
      const categoryTitle = document.getElementById("city-guide-category-title");
      const categoryCopy = document.getElementById("city-guide-category-copy");
      const categoryGrid = document.getElementById("city-guide-category-grid");
      const topPicks = document.getElementById("city-guide-top-picks-grid");
      const planningToolkit = document.getElementById("city-guide-planning-toolkit");
      const depthGrid = document.getElementById("city-guide-depth-grid");
      const fitStrip = document.getElementById("city-guide-fit-strip");
      const highlightChips = document.getElementById("city-guide-highlight-chips");
      const planningTip = document.getElementById("city-guide-planning-tip");
      const heroImage = document.getElementById("city-guide-hero-image");
      const toc = document.getElementById("city-guide-toc");
      const relatedGrid = document.getElementById("city-guide-related-grid");
      const stickyActions = document.getElementById("city-guide-sticky-actions");
      const faq = document.getElementById("city-guide-faq");
      const starterNote = document.getElementById("city-guide-starter-note");
      const travelAlert = document.getElementById("city-guide-travel-alert");
      const addConfirmation = document.getElementById("city-guide-add-confirmation");
      if (!guide || !details || !title || !summary || !grid || !useBtn || !breadcrumbs || !gallery || !intro || !trustCopy || !summaryCards || !categoryHub || !categoryTitle || !categoryCopy || !categoryGrid || !topPicks || !planningToolkit || !depthGrid || !fitStrip || !highlightChips || !planningTip || !heroImage || !toc || !relatedGrid || !stickyActions || !faq) return;

      hbState.selectedGuideCity = city;
      if (addConfirmation) {
        addConfirmation.classList.add("hidden");
        addConfirmation.innerHTML = "";
      }
      clearCityGuidePhotoCredit();
      const hero = getGuideHero(city);
      const cityName = city.split(",")[0];
      const countryName = city.split(",").slice(-1)[0].trim();
      const guideCountry = getGuideCountryForCity(city);
      const activeCategorySlug = getCityGuideCategorySlug(hbState.selectedGuideCategory);
      const activeCategoryLabel = cityGuideCategoryLabels[activeCategorySlug] || "";
      title.textContent = activeCategoryLabel
        ? `${activeCategoryLabel} in ${guide.title}`
        : `The best things to do in ${guide.title}`;
      summary.textContent = activeCategoryLabel
        ? getSectionIntro(city, activeCategoryLabel)
        : getEditorialDek(city, guide);
      document.title = activeCategoryLabel
        ? `${activeCategoryLabel} in ${guide.title} | Horizon Bound`
        : `${guide.title} City Guide | Horizon Bound`;
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
        ${hbState.selectedGuideCategory && cityGuideCategoryLabels[getCityGuideCategorySlug(hbState.selectedGuideCategory)] ? `
          <span>/</span>
          <span class="font-semibold text-ink">${cityGuideCategoryLabels[getCityGuideCategorySlug(hbState.selectedGuideCategory)]}</span>
        ` : ""}
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
      intro.innerHTML = getEditorialIntro(city, guide).map((paragraph) => `<p>${humanizeGuideCopy(paragraph)}</p>`).join("");
      summaryCards.innerHTML = getEditorialSummaryCards(city, guide).map(([label, copy]) => `
        <div class="rounded-[20px] border border-line bg-white px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${label}</p>
            <p class="mt-2 text-sm leading-6 text-ink">${humanizeGuideCopy(copy)}</p>
        </div>
      `).join("");
      categoryTitle.textContent = `What sounds good in ${guide.title}?`;
      categoryCopy.textContent = `Pick a starting point, then add the ideas you want to keep in your trip.`;
      categoryGrid.innerHTML = getCityGuideCategoryCards(city, guide, details).map((category) => `
        <a class="city-guide-category-card" data-action="open-city-guide-category" data-city="${escapeGuideMarkup(city)}" data-category="${category.route.split("/").pop()}" href="#${category.route}">
          <span class="city-guide-category-image">
            <img src="${category.image}" alt="${escapeGuideMarkup(category.label)} in ${escapeGuideMarkup(guide.title)}" />
            <span class="city-guide-category-image-scrim"></span>
            <span class="city-guide-category-icon material-symbols-outlined" aria-hidden="true">${category.icon}</span>
          </span>
          <span class="city-guide-category-body">
            <span class="city-guide-category-title">${escapeGuideMarkup(category.label)}</span>
            <span class="city-guide-category-copy">${escapeGuideMarkup(humanizeGuideCopy(category.copy))}</span>
            <span class="city-guide-category-meta">${category.count} ${category.count === 1 ? "idea" : "ideas"} <span aria-hidden="true">→</span></span>
          </span>
        </a>
      `).join("");
      planningToolkit.innerHTML = getCityPlanningToolkit(city, guide).map((item) => `
        <article class="rounded-[20px] border border-line bg-surface-soft px-4 py-4">
          <div class="flex items-start gap-3">
            <span class="material-symbols-outlined text-secondary" aria-hidden="true">${getPlanningToolkitIcon(item.label)}</span>
            <div class="min-w-0">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${humanizeGuideCopy(item.label)}</p>
              <h5 class="mt-2 font-display text-base font-bold leading-tight text-ink">${humanizeGuideCopy(item.value)}</h5>
              <p class="mt-2 text-sm leading-6 text-muted">${humanizeGuideCopy(item.copy)}</p>
            </div>
          </div>
        </article>
      `).join("");
      depthGrid.innerHTML = buildDestinationDepthCards(city, guide, details).map((item) => `
        <article class="destination-depth-card">
          <div class="destination-depth-card-head">
            <span class="destination-depth-icon material-symbols-outlined" aria-hidden="true">${getDestinationDepthIcon(item.label)}</span>
            <div class="min-w-0">
              <p class="destination-depth-label">${humanizeGuideCopy(item.label)}</p>
              <h5 class="destination-depth-value">${humanizeGuideCopy(item.value)}</h5>
            </div>
          </div>
          <p class="destination-depth-copy">${humanizeGuideCopy(item.copy)}</p>
          <div class="destination-depth-chip-row">
            ${(item.chips || []).filter(Boolean).slice(0, 3).map((chip) => `<span class="destination-depth-chip">${humanizeGuideCopy(chip)}</span>`).join("")}
          </div>
        </article>
      `).join("");
      fitStrip.innerHTML = `
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Trip fit at a glance</p>
        <div class="destination-fit-grid">
          ${buildDestinationFitRows(city, guide, details).map((item) => `
            <div class="destination-fit-card">
              <p class="destination-fit-label">${humanizeGuideCopy(item.label)}</p>
              <p class="destination-fit-value">${humanizeGuideCopy(item.value)}</p>
            </div>
          `).join("")}
        </div>
      `;
      trustCopy.textContent = getEditorialTrustCopy(city, guide);
      renderStarterGuideNotice(starterNote, hbData.destinationCoverage?.[city]?.status === "expanded");
      renderTravelGuidelineNotice(travelAlert, guideCountry);
      highlightChips.innerHTML = guide.highlights.map((item) => `
        <span class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">${humanizeGuideCopy(item)}</span>
      `).join("");
      planningTip.textContent = humanizeGuideCopy(guide.tip);
      const relatedCities = getRelatedGuideCities(city);
      const stickyState = getGuideStickyState("city", city);
      stickyActions.innerHTML = `
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="editorial-sticky-copy">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Quick actions</p>
            <p class="editorial-sticky-copy-detail mt-2 text-sm leading-6 text-muted">Start with ${guide.title}, return to all city guides, or compare another city that might fit.</p>
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

      topPicks.innerHTML = getCityGuideTopPicks(city, guide, details).map((item, index) => {
        const added = isGuideItemAdded(city, item.addValue);
        return `
        <article class="overflow-hidden rounded-[20px] border border-line bg-white">
          <img class="h-32 w-full object-cover" src="${escapeGuideMarkup(item.image)}" alt="${escapeGuideMarkup(item.title)} in ${escapeGuideMarkup(guide.title)}" />
          <div class="px-4 py-4">
            <p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary"><span class="guide-section-icon material-symbols-outlined text-base" aria-hidden="true">${index === 0 ? "star" : "travel_explore"}</span> ${index === 0 ? "Start here" : `Pick ${index + 1}`}</p>
            <h5 class="mt-2 font-display text-lg font-bold leading-tight text-ink">${escapeGuideMarkup(item.title)}</h5>
            <p class="mt-2 text-sm leading-6 text-muted">${escapeGuideMarkup(humanizeGuideCopy(item.copy))}</p>
            <div class="city-guide-top-pick-meta mt-3 flex flex-wrap gap-2" aria-label="Planning details">
              <span>${escapeGuideMarkup(item.role)}</span>
              <span>${escapeGuideMarkup(item.planningNote)}</span>
            </div>
            <button class="guide-action-button mt-4 w-full rounded-full ${added ? "bg-teal-soft text-tertiary" : "bg-surface-soft text-secondary"} px-4 py-2 text-sm font-semibold ring-1 ring-line" data-action="add-guide-item" data-city="${escapeGuideMarkup(city)}" data-item="${escapeGuideMarkup(item.addValue)}" type="button" ${added ? "disabled aria-pressed=\"true\"" : ""}>
              ${added ? "Added to my trip" : "Add to my trip"}
            </button>
          </div>
        </article>
      `;
      }).join("");

      const categoryMap = [
        ...getCityGuideCategorySections(city, guide, details),
        ["Best Attractions", getCityGuideDetailSectionItems("Best Attractions", details, guide, details.bestAttractions)],
        ["Best Restaurants", getCityGuideDetailSectionItems("Best Restaurants", details, guide, details.bestRestaurants)],
        ["Best for a Budget", getCityGuideDetailSectionItems("Best for a Budget", details, guide, details.bestBudget)],
        ["Best luxury things to do", getCityGuideDetailSectionItems("Best luxury things to do", details, guide, details.bestLuxury)],
        ["Best things to do for couples", getCityGuideDetailSectionItems("Best things to do for couples", details, guide, details.bestCouples)],
        ["Best things to do with kids", getCityGuideDetailSectionItems("Best things to do with kids", details, guide, details.bestKids)],
        ["Best things to do for solo travelers", getCityGuideDetailSectionItems("Best things to do for solo travelers", details, guide, details.bestSolo)],
        ["Best things to do for first timers", getCityGuideDetailSectionItems("Best things to do for first timers", details, guide, details.bestFirstTimers)],
        ["Best unique things to do", getCityGuideDetailSectionItems("Best unique things to do", details, guide, details.bestUnique)],
        ["Best breakfast spots", getCityGuideDetailSectionItems("Best breakfast spots", details, guide, details.bestBreakfast)],
        ["Best lunch spots", getCityGuideDetailSectionItems("Best lunch spots", details, guide, details.bestLunch)],
        ["Best dinner spots", getCityGuideDetailSectionItems("Best dinner spots", details, guide, details.bestDinner)],
        ["Best cocktail spots", getCityGuideDetailSectionItems("Best cocktail spots", details, guide, details.bestCocktails)],
        ["Best bakeries", getCityGuideDetailSectionItems("Best bakeries", details, guide, details.bestBakeries)],
        ["Best coffee shops", getCityGuideDetailSectionItems("Best coffee shops", details, guide, details.bestCoffee)]
      ];

      toc.innerHTML = categoryMap.slice(0, 6).map(([label]) => `
        <a class="rounded-2xl bg-white px-3 py-3 text-left text-sm font-semibold text-secondary ring-1 ring-line transition hover:border-secondary/40 hover:text-primary" data-action="open-city-guide-category" data-city="${escapeGuideMarkup(city)}" data-category="${getCityGuideCategorySlug(label)}" href="#${getCityGuideCategoryRoute(city, label)}">
          ${getSectionNavLabel(label)}
        </a>
      `).join("") + `
        <button class="rounded-2xl bg-white px-3 py-3 text-left text-sm font-semibold text-secondary ring-1 ring-line transition hover:border-secondary/40 hover:text-primary" data-action="scroll-guide-section" data-section-id="city-guide-destination-depth" type="button">
          Plan the details
        </button>
      `;

      grid.innerHTML = categoryMap.filter(([, items]) => Array.isArray(items) && items.length).map(([label, items]) => {
        const meta = getGuideSectionMeta(label);
        return `
        <section id="${makeSectionId(label)}" class="rounded-[24px] border border-line bg-white px-4 py-4">
          <div class="guide-section-heading">
            <span class="guide-section-icon material-symbols-outlined" aria-hidden="true">${meta.icon}</span>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${escapeGuideMarkup(meta.eyebrow)}</p>
              <h5 class="mt-2 font-display text-[1.7rem] font-bold leading-tight text-ink">${escapeGuideMarkup(meta.title)}</h5>
            </div>
          </div>
          <p class="mt-3 max-w-[44rem] text-[0.97rem] leading-7 text-muted">${escapeGuideMarkup(getSectionIntro(city, label))}</p>
          <div class="mt-5 space-y-4">
            ${items.map((item, index) => `
              <article class="rounded-[22px] border border-line bg-surface-card px-4 py-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex items-start gap-4">
                    <span class="guide-item-icon material-symbols-outlined flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-[1.05rem] text-white" aria-hidden="true">${meta.icon}</span>
                    <div class="min-w-0">
                      <h6 class="font-display text-xl font-bold leading-tight text-ink">${escapeGuideMarkup(item)}</h6>
                      <p class="mt-2 max-w-[40rem] text-[0.96rem] leading-7 text-muted">${escapeGuideMarkup(humanizeGuideCopy(buildEditorialItemCopy(label, item, city)))}</p>
                    </div>
                  </div>
                  <button class="guide-action-button shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="add-guide-item" data-city="${escapeGuideMarkup(city)}" data-item="${escapeGuideMarkup(getCityGuideItemAddValue(label, item, city))}" type="button">
                    Add to my trip
                  </button>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      `;
      }).join("");

      faq.innerHTML = getCityGuideFaqItems(city, guide, details).map(([question, answer]) => `
        <details class="rounded-[18px] border border-line bg-white px-4 py-4">
          <summary class="cursor-pointer list-none pr-6 font-display text-base font-bold leading-6 text-ink">${escapeGuideMarkup(question)}</summary>
          <p class="mt-3 text-sm leading-7 text-muted">${escapeGuideMarkup(answer)}</p>
        </details>
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

      renderCityGuideCategoryView(city, guide, details, activeCategoryLabel, activeCategorySlug);
      void hydrateCityGuidePhoto(city, guide);
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
    getCityGuideCategoryRoute,
    getCityGuideCategorySlug,
    scrollCityGuideCategory,
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
