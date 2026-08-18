(() => {
const { state: hbState, data: hbData, refs: hbRefs, utils: hbUtils } = window.HB_APP;
const { getCityName, getTripLength, buildTravelerText, getCountryOnlySelection, getCountryGuide, resolveCanonicalDestination, titleCase } = hbUtils;
const { getAreaSet, getDayHighlights, getDayNotes, getTimelineTemplates, getConcreteTripTemplates } = window.HB_TRIP_HELPERS;
const DRAFT_STORAGE_KEY = "hb-trip-draft-v1";
const PROFILE_STORAGE_KEY = "hb-trip-profile-v1";
const BOOKING_STORAGE_KEY = "hb-trip-booking-v1";
const LOCAL_ACCOUNT_BACKUP_VERSION = 1;

function getGuideSourceReasoning() {
      const context = hbState.guidePlanContext || {};
      if (!context.sourceType) return "";

      if (context.sourceType === "city") {
        return `Started from the ${context.sourceName} guide, with ${context.suggestedBase} protected early.`;
      }

      return `Started from the ${context.sourceName} country guide, using ${context.suggestedBase} as the likely starting point.`;
    }

function getBlueprintTopPlaces() {
      const details = hbData.cityGuideDetailData[hbState.appState.destination];
      if (details) {
        return [
          ...details.bestAttractions.slice(0, 3).map((item) => ({ type: "Top sight", name: item })),
          ...details.bestRestaurants.slice(0, 2).map((item) => ({ type: "Strong food pick", name: item })),
          ...details.bestUnique.slice(0, 1).map((item) => ({ type: "Something unique", name: item }))
        ];
      }

      return getDayHighlights(getCityName(), getAreaSet(getCityName())).slice(0, 5).map((item) => ({
        type: "Likely highlight",
        name: item
      }));
    }

    function isTripSectionExpanded(sectionKey, fallback = false) {
      const visibility = hbState.tripSectionVisibility || {};
      if (typeof visibility[sectionKey] === "boolean") return visibility[sectionKey];
      return fallback;
    }

    function syncTripSection(sectionKey, options = {}) {
      const panel = document.querySelector(`[data-trip-section="${sectionKey}"]`);
      if (!panel) return;

      const expanded = isTripSectionExpanded(sectionKey, options.fallback ?? false);
      const bodies = panel.querySelectorAll("[data-trip-section-body]");
      const toggle = panel.querySelector("[data-action='toggle-trip-section']");

      panel.classList.toggle("is-expanded", expanded);
      panel.classList.toggle("is-collapsed", !expanded);

      bodies.forEach((body) => {
        body.hidden = !expanded;
      });

      if (toggle) {
        toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
        toggle.innerHTML = `
          <span>${expanded ? (options.expandedLabel || "Hide") : (options.collapsedLabel || "Show")}</span>
          <span class="material-symbols-outlined" aria-hidden="true">${expanded ? "remove" : "add"}</span>
        `;
      }
    }

    function buildFlightSummary() {
      if (hbState.appState.flightMode === "need-help") return `Need help finding flights • ${hbState.appState.flightPreference}`;
      if (hbState.appState.flightMode === "have-flights") {
        const airline = hbState.appState.flightAirline || "Flights added";
        const flightNumber = hbState.appState.flightNumber ? ` • ${hbState.appState.flightNumber}` : "";
        return `${airline}${flightNumber}`;
      }
      return "No flights needed";
    }

    function buildFlightCard() {
      if (hbState.appState.flightMode === "need-help") {
        return {
          title: "Flight booking help",
          copy: `We’ll look for ${hbState.appState.flightPreference.toLowerCase()} flight options and keep the trip quality in mind, not just the lowest price.`,
          chips: ["Need help finding flights", hbState.appState.flightPreference, hbState.appState.budget],
          meta: [
            {
              label: "Current setup",
              value: "We’re still choosing flights",
              copy: `Priority: ${hbState.appState.flightPreference}.`
            },
            {
              label: "Why it matters",
              value: "Trip quality stays protected",
              copy: "We use common sense so cheaper options do not create long layovers or throw off the overall trip."
            }
          ]
        };
      }

      if (hbState.appState.flightMode === "have-flights") {
        const arrival = hbState.appState.arrivalFlight ? new Date(hbState.appState.arrivalFlight).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Arrival time not added yet";
        const departure = hbState.appState.departureFlight ? new Date(hbState.appState.departureFlight).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "Departure time not added yet";
        return {
          title: hbState.appState.flightAirline || "Current flights",
          copy: `${hbState.appState.flightNumber ? `${hbState.appState.flightNumber}. ` : ""}Arrive ${arrival}. Leave ${departure}.`,
          chips: ["Flights added", hbState.appState.flightPreference || "Balanced value", hbState.appState.flightNumber || "Flight number optional"],
          meta: [
            {
              label: "Current setup",
              value: hbState.appState.flightNumber || "Flight timing added",
              copy: `${arrival} arrival • ${departure} departure`
            },
            {
              label: "Why it matters",
              value: "Arrival and departure days can stay realistic",
              copy: "The trip can keep your first and last day lighter when travel timing already shapes those windows."
            }
          ]
        };
      }

      return {
        title: "No flights added",
        copy: "This trip is not using flight planning right now, so the itinerary will stay focused on the destination itself.",
        chips: ["No flights needed", hbState.appState.pace, hbState.appState.budget],
        meta: [
          {
            label: "Current setup",
            value: "No flight planning in this draft",
            copy: "This trip can stay destination-first for now."
          },
          {
            label: "Why it matters",
            value: "Less clutter while you plan",
            copy: "You can still build the days now and add travel details later if they become relevant."
          }
        ]
      };
    }

    function formatDateTime(input) {
      const value = new Date(input);
      if (Number.isNaN(value.getTime())) return "";
      return value.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    }

    function formatDate(input) {
      const dateOnlyMatch = String(input || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
      const value = dateOnlyMatch
        ? new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]))
        : new Date(input);
      if (Number.isNaN(value.getTime())) return input;
      return value.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    function parseLocalDate(input) {
      const dateOnlyMatch = String(input || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
      return dateOnlyMatch
        ? new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]))
        : new Date(input);
    }

    function addLocalDays(input, days) {
      const date = parseLocalDate(input);
      if (Number.isNaN(date.getTime())) return date;
      date.setDate(date.getDate() + days);
      return date;
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function getDestinationGuideDetails() {
      const detailMap = hbData.cityGuideDetailData || {};
      const destination = hbState.appState.destination;
      if (detailMap[destination]) return detailMap[destination];

      const city = getCityName();
      const directKey = Object.keys(detailMap).find((key) => key === city || key.startsWith(`${city},`));
      return directKey ? detailMap[directKey] : null;
    }

    function getDestinationGuideEntry() {
      const destination = hbState.appState.destination;
      const city = getCityName();
      return (hbData.cityGuideData || []).find((item) => (
        item.city === destination
        || item.city === city
        || item.city?.startsWith(`${city},`)
        || item.title === city
      )) || null;
    }

    function joinGuideItems(items, fallback) {
      const list = Array.isArray(items) ? items.filter(Boolean) : [];
      if (!list.length) return fallback;
      if (list.length === 1) return list[0];
      return `${list.slice(0, -1).join(", ")} and ${list[list.length - 1]}`;
    }

    function buildDestinationGuideSourceName() {
      const context = hbState.guidePlanContext || {};
      if (context.sourceType === "city" && context.sourceName) return `${context.sourceName} city guide`;
      if (context.sourceType === "country" && context.sourceName) return `${context.sourceName} country guide`;
      const guide = getDestinationGuideEntry();
      return guide ? `${guide.title} city guide` : `${getCityName()} destination guide`;
    }

    function getTripPlanningToolkit() {
      const guide = getDestinationGuideEntry();
      const customToolkit = hbData.cityPlanningToolkitData?.[hbState.appState.destination] || (guide ? hbData.cityPlanningToolkitData?.[guide.city] : null);
      if (customToolkit?.length) return customToolkit;
      const city = getCityName();
      return [
        {
          label: "Where to stay",
          value: "Base near the strongest trip area",
          copy: `Pick a stay that supports the trip rhythm around ${city}, not only the lowest price or a generic central label.`
        },
        {
          label: "Getting around",
          value: "Group the day by area",
          copy: guide?.tip || `${city} usually feels smoother when each day has one clear area instead of scattered stops.`
        },
        {
          label: "Book early",
          value: joinGuideItems(guide?.highlights?.slice(0, 2), "the moments that matter most"),
          copy: "Protect the attractions, meals, or experiences that would change the trip if they were missed."
        }
      ];
    }

    function buildTripDestinationDepthCards() {
      const guide = getDestinationGuideEntry();
      const details = getDestinationGuideDetails();
      if (!guide && !details) return [];

      const toolkit = getTripPlanningToolkit();
      const routeToolkit = toolkit.find((item) => /getting|around/i.test(item.label));
      const stayToolkit = toolkit.find((item) => /stay/i.test(item.label));
      const bookToolkit = toolkit.find((item) => /book/i.test(item.label));
      const guideSource = buildDestinationGuideSourceName();
      const guideHighlights = guide?.highlights || [];
      const protectedPicks = joinGuideItems((details?.bestFirstTimers || details?.bestAttractions || guideHighlights).slice(0, 2), guideHighlights[0] || getCityName());
      const foodPicks = joinGuideItems((details?.bestDinner || details?.bestRestaurants || details?.bestLunch || []).slice(0, 2), "one good local meal");
      const dayAreas = joinGuideItems((hbState.currentTrip?.days || []).map((day) => day.area).filter(Boolean).slice(0, 3), stayToolkit?.value || getCityName());

      return [
        {
          icon: "menu_book",
          label: "Guide source",
          value: `From the ${guideSource}`,
          copy: `The itinerary is using destination guide signals first, then filtering them through your dates, pace, budget, and must-haves.`,
          chips: ["Guide-backed", hbState.appState.pace, formatTripStyles()]
        },
        {
          icon: "route",
          label: "Route logic",
          value: dayAreas,
          copy: routeToolkit?.copy || guide?.tip || `The trip keeps each day centered around one strong part of ${getCityName()} so the route feels easier to follow.`,
          chips: ["Area-based days", "Less backtracking", hbState.appState.spontaneity]
        },
        {
          icon: "star",
          label: "Protected priorities",
          value: protectedPicks,
          copy: `These guide-backed picks influence what stays visible before lower-priority extras are added.`,
          chips: (details?.bestAttractions || guideHighlights).slice(0, 3)
        },
        {
          icon: "restaurant",
          label: "Food and booking",
          value: foodPicks,
          copy: bookToolkit?.copy || `Food is treated as part of the trip shape, so meals like ${foodPicks} can anchor days instead of filling gaps.`,
          chips: (details?.bestDinner || details?.bestRestaurants || []).slice(0, 3)
        }
      ];
    }

    function uniqueGuidePlaces(...groups) {
      const seen = new Set();
      return groups.flat().filter((item) => {
        const key = String(item || "").trim();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    function getDaySearchText(day) {
      return [
        day.title,
        day.area,
        day.highlight,
        day.rationale,
        day.weather,
        day.item?.title,
        day.item?.body,
        day.item?.fit,
        ...(day.item?.timeline || []).flatMap((step) => [step.title, step.copy])
      ].join(" ").toLowerCase();
    }

    function pickGuidePlace(day, groups, index, fallback) {
      const candidates = uniqueGuidePlaces(...groups);
      if (!candidates.length) return fallback;

      const dayText = getDaySearchText(day);
      const exactMatch = candidates.find((item) => dayText.includes(String(item).toLowerCase()));
      return exactMatch || candidates[index % candidates.length] || fallback;
    }

    function trimPlanningText(value, maxLength = 96) {
      const text = String(value || "").replace(/\s+/g, " ").trim();
      if (!text) return "";
      if (text.length <= maxLength) return text;
      return `${text.slice(0, maxLength - 1).trim()}...`;
    }

    function cleanPlanningAnchor(value) {
      return String(value || "")
        .replace(/\s+/g, " ")
        .replace(/^[,\s]+|[.;,\s]+$/g, "")
        .replace(/^and\s+/i, "")
        .trim();
    }

    function getPlanningAnchorKey(value) {
      return cleanPlanningAnchor(value)
        .toLowerCase()
        .replace(/^(a|an|the)\s+/i, "")
        .replace(/[^a-z0-9]+/g, "");
    }

    function splitPlanningAnchors(value) {
      return String(value || "")
        .split(",")
        .map(cleanPlanningAnchor)
        .filter(Boolean);
    }

    function getGuideSignalAnchors() {
      const signals = hbState.guidePlanContext?.signals || {};
      if (Array.isArray(signals.mustHaveItems) && signals.mustHaveItems.length) {
        return signals.mustHaveItems.map(cleanPlanningAnchor).filter(Boolean);
      }
      return splitPlanningAnchors(signals.mustHaves);
    }

    function getGuideAnchorCatalog() {
      const details = getDestinationGuideDetails();
      if (!details) return [];
      const groups = [
        { items: details.bestDinner || [], type: "food" },
        { items: details.bestRestaurants || [], type: "food" },
        { items: details.bestLunch || [], type: "food" },
        { items: details.bestBreakfast || [], type: "food" },
        { items: details.bestBakeries || [], type: "food" },
        { items: details.bestCoffee || [], type: "food" },
        { items: details.bestFirstTimers || [], type: "sight" },
        { items: details.bestAttractions || [], type: "sight" },
        { items: details.bestUnique || [], type: "unique" },
        { items: details.bestBudget || [], type: "easy" },
        { items: details.bestCouples || [], type: "atmosphere" },
        { items: details.bestKids || [], type: "easy" },
        { items: details.bestSolo || [], type: "unique" }
      ];

      return groups.flatMap((group) => group.items.map((item) => ({
        label: cleanPlanningAnchor(item),
        key: getPlanningAnchorKey(item),
        type: group.type
      }))).filter((item) => item.label && item.key);
    }

    function classifyPlanningAnchor(anchor, guideKeys, catalog) {
      const label = cleanPlanningAnchor(anchor);
      const key = getPlanningAnchorKey(label);
      const catalogMatch = catalog.find((item) => item.key === key || item.key.includes(key) || key.includes(item.key));
      const text = label.toLowerCase();
      let type = catalogMatch?.type || "general";

      if (/dinner|lunch|breakfast|restaurant|meal|food|bakery|coffee|cafe|market/.test(text)) type = "food";
      if (/tower|museum|gallery|palace|temple|cathedral|landmark|sight|garden|bridge/.test(text)) type = "sight";
      if (/slower|slow|relax|beach|easy|final day|free time|downtime/.test(text)) type = "rest";
      if (/unique|hidden|local|neighborhood|viewpoint|market|wander/.test(text)) type = type === "general" ? "unique" : type;

      return {
        label,
        key,
        type,
        source: guideKeys.has(key) || Boolean(catalogMatch) ? "guide" : "traveler"
      };
    }

    function getProtectedMustHaveAnchors() {
      const enteredAnchors = splitPlanningAnchors(hbState.appState.mustHaves);
      if (!enteredAnchors.length) return [];

      const guideKeys = new Set(getGuideSignalAnchors().map(getPlanningAnchorKey).filter(Boolean));
      const catalog = getGuideAnchorCatalog();
      const seen = new Set();

      return enteredAnchors
        .map((anchor) => classifyPlanningAnchor(anchor, guideKeys, catalog))
        .filter((anchor) => {
          if (!anchor.label || !anchor.key || seen.has(anchor.key)) return false;
          seen.add(anchor.key);
          return true;
        });
    }

    function pickAnchorByType(anchors, type, seed = 0) {
      const guideMatches = anchors.filter((anchor) => anchor.type === type && anchor.source === "guide");
      const matches = guideMatches.length ? guideMatches : anchors.filter((anchor) => anchor.type === type);
      return matches.length
        ? matches[Math.abs(seed) % matches.length]
        : null;
    }

    function buildDayProtectedAnchorMatches(day, index, totalDays) {
      const anchors = getProtectedMustHaveAnchors();
      if (!anchors.length) return [];

      const dayText = getDaySearchText(day);
      const dayKey = getPlanningAnchorKey(dayText);
      const exactMatches = anchors.filter((anchor) => anchor.key && dayKey.includes(anchor.key));
      if (exactMatches.length) return exactMatches.slice(0, 2);

      const preferredTypes = [];
      if (/dinner|lunch|breakfast|restaurant|reservation|food|market|bakery|coffee|cafe/.test(dayText)) {
        preferredTypes.push("food");
      }
      if (/museum|tower|palace|garden|bridge|view|cruise|show|tour|temple|colosseum|forum|acropolis|sagrada|louvre|vatican|gallery|landmark/.test(dayText)) {
        preferredTypes.push("sight");
      }
      if (index === totalDays - 1 || /final|light|reset|slow|relax/.test(dayText)) {
        preferredTypes.push("rest");
      }
      preferredTypes.push("unique", "atmosphere", "easy", "general");

      const picked = [];
      preferredTypes.forEach((type) => {
        if (picked.length >= 2) return;
        const candidate = pickAnchorByType(anchors.filter((anchor) => !picked.some((item) => item.key === anchor.key)), type, index + picked.length);
        if (candidate) picked.push(candidate);
      });

      if (picked.length) return picked;
      return [anchors[index % anchors.length]].filter(Boolean);
    }

    function getDayProtectedAnchors(day, index, totalDays) {
      if (Array.isArray(day.protectedAnchors) && day.protectedAnchors.length) {
        return day.protectedAnchors;
      }
      return buildDayProtectedAnchorMatches(day, index, totalDays);
    }

    function getAnchorTypeLabel(type) {
      const labels = {
        food: "Food anchor",
        sight: "Sight anchor",
        rest: "Pace anchor",
        unique: "Local texture",
        easy: "Easy win",
        atmosphere: "Trip vibe",
        general: "Must-have"
      };
      return labels[type] || "Must-have";
    }

    function getAnchorTypeIcon(type) {
      const icons = {
        food: "restaurant",
        sight: "account_balance",
        rest: "self_improvement",
        unique: "explore",
        easy: "check_circle",
        atmosphere: "palette",
        general: "push_pin"
      };
      return icons[type] || "push_pin";
    }

    function findAnchorTimelineStep(day, anchor) {
      const steps = day.item?.timeline || [];
      const anchorKey = getPlanningAnchorKey(anchor?.label || "");
      if (!anchorKey) return null;
      return steps.find((step) => {
        const stepKey = getPlanningAnchorKey(`${step?.title || ""} ${step?.copy || ""}`);
        return stepKey.includes(anchorKey) || anchorKey.includes(stepKey);
      }) || null;
    }

    function buildProtectedAnchorReason(day, anchor, index, totalDays) {
      const step = findAnchorTimelineStep(day, anchor);
      const source = anchor.source === "guide" ? buildDestinationGuideSourceName() : "your must-haves";
      const label = anchor.label || "this must-have";

      if (step) {
        return `Placed at ${step.time} as ${step.title}, so ${label} is part of the schedule instead of buried in notes.`;
      }

      if (anchor.type === "food") {
        return `Protected from ${source} as the meal anchor, then the surrounding stops stay close enough for the food plan to feel realistic.`;
      }

      if (anchor.type === "sight") {
        return `Protected from ${source} as the main sight, then the rest of ${day.area} is built around it instead of competing with it.`;
      }

      if (anchor.type === "rest" || index === totalDays - 1) {
        return `Protected as a pacing rule, so this day leaves room to slow down instead of filling every open hour.`;
      }

      if (anchor.type === "unique" || anchor.type === "atmosphere") {
        return `Protected as the character of the day, helping ${day.area} feel intentional rather than interchangeable.`;
      }

      return `Protected from ${source}, then used as the reason this day stays focused around ${day.area}.`;
    }

    function renderDayGuideMustHaveCards(day, index, totalDays) {
      const anchors = getDayProtectedAnchors(day, index, totalDays);
      if (!anchors.length) return "";
      const guideCount = anchors.filter((anchor) => anchor.source === "guide").length;
      const heading = guideCount ? "Guide-applied must-haves" : "Must-haves inside this day";
      const copy = guideCount
        ? `These came from the destination guide plus your preferences, then the planner placed them inside ${day.dayLabel}.`
        : `These came from your must-haves, then the planner used them to keep ${day.dayLabel} focused.`;

      return `
        <div class="trip-day-anchor-logic mt-3">
          <div class="trip-day-anchor-logic-head">
            <div>
              <p class="trip-day-anchor-logic-label">${escapeHtml(heading)}</p>
              <p class="trip-day-anchor-logic-copy">${escapeHtml(copy)}</p>
            </div>
            <span class="trip-day-anchor-count">${anchors.length} protected</span>
          </div>
          <div class="trip-day-anchor-grid">
            ${anchors.map((anchor) => `
              <div class="trip-day-anchor-card">
                <span class="material-symbols-outlined trip-day-anchor-icon" aria-hidden="true">${escapeHtml(getAnchorTypeIcon(anchor.type))}</span>
                <div>
                  <p class="trip-day-anchor-kicker">${anchor.source === "guide" ? "Guide-applied" : "Traveler must-have"} - ${escapeHtml(getAnchorTypeLabel(anchor.type))}</p>
                  <p class="trip-day-anchor-title">${escapeHtml(anchor.label)}</p>
                  <p class="trip-day-anchor-reason">${escapeHtml(buildProtectedAnchorReason(day, anchor, index, totalDays))}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    function renderDayProtectedAnchorStrip(day, index, totalDays) {
      const anchors = getDayProtectedAnchors(day, index, totalDays);
      if (!anchors.length) return "";
      const guideBacked = anchors.some((anchor) => anchor.source === "guide");
      const source = guideBacked ? `From ${buildDestinationGuideSourceName()}` : "From your must-haves";
      const label = guideBacked ? "Guide-applied must-haves" : "Protected from your must-haves";

      return `
        <div class="trip-day-protected-strip mt-3">
          <div>
            <p class="trip-day-protected-label">
              <span class="material-symbols-outlined" aria-hidden="true">push_pin</span>
              ${escapeHtml(label)}
            </p>
            <p class="trip-day-protected-copy">${escapeHtml(source)}. This day keeps ${escapeHtml(joinGuideItems(anchors.map((anchor) => anchor.label), "your priority moments"))} visible in the actual plan, not just as background preferences.</p>
          </div>
          <div class="trip-day-protected-chips">
            ${anchors.map((anchor) => `
              <span>${anchor.source === "guide" ? "Guide: " : ""}${escapeHtml(anchor.label)}</span>
            `).join("")}
          </div>
        </div>
      `;
    }

    function hasEarlierTimelineType(day, type, stepIndex) {
      const previousSteps = (day.item?.timeline || []).slice(0, stepIndex);
      const pattern = type === "food"
        ? /dinner|lunch|breakfast|restaurant|meal|food|market|bakery|coffee|cafe/
        : /museum|tower|palace|temple|cathedral|landmark|sight|gallery|garden|bridge|view/;
      return previousSteps.some((step) => pattern.test(`${step?.title || ""} ${step?.copy || ""}`.toLowerCase()));
    }

    function getTimelineProtectedAnchors(step, day, dayAnchors, stepIndex) {
      if (!dayAnchors.length) return [];
      const stepText = `${step?.title || ""} ${step?.copy || ""}`.toLowerCase();
      const stepKey = getPlanningAnchorKey(stepText);
      const exactMatches = dayAnchors.filter((anchor) => anchor.key && stepKey.includes(anchor.key));
      if (exactMatches.length) return exactMatches.slice(0, 2);

      if (/dinner|lunch|breakfast|restaurant|meal|food|market|bakery|coffee|cafe/.test(stepText)) {
        if (hasEarlierTimelineType(day, "food", stepIndex)) return [];
        const foodAnchor = pickAnchorByType(dayAnchors, "food");
        if (foodAnchor) return [foodAnchor];
      }
      if (/museum|tower|palace|temple|cathedral|landmark|sight|gallery|garden|bridge|view/.test(stepText)) {
        if (hasEarlierTimelineType(day, "sight", stepIndex)) return [];
        const sightAnchor = pickAnchorByType(dayAnchors, "sight");
        if (sightAnchor) return [sightAnchor];
      }
      if (stepIndex === 0 && dayAnchors.length === 1) return dayAnchors;
      return [];
    }

    function renderTimelineAnchorBadges(step, day, index, totalDays, stepIndex) {
      const dayAnchors = getDayProtectedAnchors(day, index, totalDays);
      const stepAnchors = getTimelineProtectedAnchors(step, day, dayAnchors, stepIndex);
      if (!stepAnchors.length) return "";

      return `
        <div class="timeline-anchor-badges">
          ${stepAnchors.map((anchor) => `
            <span>
              <span class="material-symbols-outlined" aria-hidden="true">push_pin</span>
              ${anchor.source === "guide" ? "Guide must-have" : "Protected"}: ${escapeHtml(anchor.label)}
            </span>
          `).join("")}
        </div>
      `;
    }

    function getProtectedAnchorSummary(day, index = 0, totalDays = hbState.currentTrip?.days?.length || 1) {
      const anchors = getDayProtectedAnchors(day, index, totalDays);
      return joinGuideItems(anchors.map((anchor) => anchor.label), "the protected must-haves");
    }

    function renderDayQualityControls(day, index, totalDays) {
      const adjustment = day.qualityAdjustment || null;
      const choices = [
        ["too-full", "remove_circle", "Too full"],
        ["too-light", "add_circle", "Too light"],
        ["wrong-area", "near_me", "Wrong area"],
        ["keep-this", "check_circle", "Keep this"]
      ];

      return `
        <div class="trip-day-quality mt-3">
          <div class="trip-day-quality-head">
            <div>
              <p class="trip-day-quality-label">Quick feedback</p>
              <p class="trip-day-quality-copy">Adjust the day while keeping protected must-haves visible.</p>
            </div>
            <div class="trip-day-quality-actions" role="group" aria-label="Adjust ${escapeHtml(day.dayLabel)}">
              ${choices.map(([value, icon, label]) => `
                <button class="trip-day-quality-button ${adjustment?.feedback === value ? "is-active" : ""}" data-action="adjust-day-quality" data-day-id="${escapeHtml(day.id)}" data-feedback="${value}" type="button">
                  <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
                  <span>${label}</span>
                </button>
              `).join("")}
            </div>
          </div>
          ${adjustment ? `
            <div class="trip-day-adjustment-note">
              <span class="material-symbols-outlined" aria-hidden="true">${escapeHtml(adjustment.icon || "auto_fix_high")}</span>
              <div>
                <p class="trip-day-adjustment-title">${escapeHtml(adjustment.title)}</p>
                <p class="trip-day-adjustment-copy">${escapeHtml(adjustment.copy)}</p>
              </div>
            </div>
          ` : ""}
        </div>
      `;
    }

    function buildDayOrderNote(day, index, totalDays) {
      const firstStop = day.item?.timeline?.[0]?.title || day.highlight || day.area;
      const lastStop = day.item?.timeline?.[day.item.timeline.length - 1]?.title || day.highlight || day.area;

      if (index === 0) {
        return `Starts with ${firstStop} and keeps the day rooted in ${day.area}, so the trip feels active without becoming a cross-city sprint.`;
      }

      if (index === totalDays - 1) {
        return `Ends with ${lastStop} and keeps the close lighter, so packing, checkout, or a slower final meal do not get squeezed.`;
      }

      if (hbState.appState.pace === "Packed") {
        return `This day can carry more movement because the main stops stay connected around ${day.area} instead of scattering the route.`;
      }

      if (hbState.appState.memory === "Relaxing" || hbState.appState.styles.includes("Relaxing")) {
        return `The plan keeps the stronger stops close together, leaving enough room for slower meals and unplanned time in ${day.area}.`;
      }

      if (hbState.appState.memory === "Adventurous" || hbState.appState.styles.includes("Adventurous")) {
        return `This is a good discovery day: one clear anchor, then enough nearby texture to make ${day.area} feel explored.`;
      }

      return `The day has one clear anchor and nearby follow-through, so it feels planned without turning into a checklist.`;
    }

    function buildDayBookingNote(day, index, totalDays) {
      const details = getDestinationGuideDetails();
      const restaurant = details
        ? pickGuidePlace(day, [details.bestDinner, details.bestRestaurants, details.bestLunch], index, day.highlight)
        : day.highlight;
      const attraction = details
        ? pickGuidePlace(day, [details.bestFirstTimers, details.bestAttractions, details.bestUnique], index, day.highlight)
        : day.highlight;
      const dayText = getDaySearchText(day);
      const foodFocused = hbState.appState.foodImportance === "Food is a focus" || hbState.appState.memory === "Food-focused" || hbState.appState.styles.includes("Foodie");
      const looksMealLed = /dinner|lunch|breakfast|restaurant|reservation|food|market|bakery|coffee|cafe/.test(dayText);
      const looksTicketed = /museum|tower|palace|garden|bridge|view|cruise|show|tour|temple|colosseum|forum|acropolis|sagrada|louvre|vatican|gallery/.test(dayText);

      if (foodFocused || looksMealLed) {
        return `Reserve ${restaurant} if it matters to you, then keep the meal window protected before adding extra stops.`;
      }

      if (looksTicketed) {
        return `Check timing for ${attraction}; a morning or reserved slot usually makes the rest of the day smoother.`;
      }

      if (index === 0) {
        return `Save one reliable first meal near ${day.area}; it keeps the opening day from turning into a last-minute search.`;
      }

      if (index === totalDays - 1) {
        return `Protect checkout or packing time first, then keep only one final food, view, or neighborhood stop that feels worth it.`;
      }

      return `If anything needs a booking, make it ${day.highlight}; keep the rest of the day easy to adjust.`;
    }

    function buildDaySwapNote(day, index) {
      const details = getDestinationGuideDetails();
      if (!details) {
        return `If this feels too full, keep the same area and remove the lowest-priority stop rather than changing the whole day.`;
      }

      if (hbState.appState.children > 0 && details.bestKids?.length) {
        const kidPick = pickGuidePlace(day, [details.bestKids], index, details.bestKids[0]);
        return `If the group needs an easier reset, swap in ${kidPick} and keep the rest of the day simple.`;
      }

      if (hbState.appState.budget === "Budget" && details.bestBudget?.length) {
        const budgetPick = pickGuidePlace(day, [details.bestBudget], index, details.bestBudget[0]);
        return `For a lower-cost version, use ${budgetPick} and save the splurge for the stop that matters most.`;
      }

      if (hbState.appState.pace === "Easygoing" || hbState.appState.memory === "Relaxing") {
        return `For a calmer version, skip the extra follow-through stop and keep more open time around the meal or walk.`;
      }

      if (hbState.appState.memory === "Adventurous" || hbState.appState.styles.includes("Adventurous")) {
        const uniquePick = pickGuidePlace(day, [details.bestUnique, details.bestSolo], index, details.bestUnique?.[0] || day.highlight);
        return `For more discovery, swap in ${uniquePick} without breaking the neighborhood flow.`;
      }

      const flexiblePick = pickGuidePlace(day, [details.bestUnique, details.bestBudget, details.bestSolo], index, day.highlight);
      return `If the original plan is not quite right, try ${flexiblePick} as a nearby-feeling alternate.`;
    }

    function buildDayMustHaveNote(day, index, totalDays) {
      const protectedAnchors = getDayProtectedAnchors(day, index, totalDays);
      const mustHaves = trimPlanningText(hbState.appState.mustHaves, 86);
      const nonNegotiables = trimPlanningText(hbState.appState.nonNegotiables, 86);

      if (protectedAnchors.length) {
        const guideBacked = protectedAnchors.some((anchor) => anchor.source === "guide");
        const labels = joinGuideItems(protectedAnchors.map((anchor) => anchor.label), "your priority moments");
        return {
          icon: "push_pin",
          label: guideBacked ? "Guide-backed must-have" : "Must-have fit",
          copy: `Keeps ${labels} visible in this day, then builds the nearby stops around it.`
        };
      }

      if (nonNegotiables) {
        return {
          icon: "rule",
          label: "Hard rules",
          copy: `Keep edits aligned with: ${nonNegotiables}`
        };
      }

      if (mustHaves) {
        return {
          icon: "push_pin",
          label: "Must-have check",
          copy: `Before saving, make sure this still supports: ${mustHaves}`
        };
      }

      return null;
    }

    function buildDayGuideSourceNote(day, index) {
      const details = getDestinationGuideDetails();
      const guide = getDestinationGuideEntry();
      if (!details && !guide) return null;

      const guideSource = buildDestinationGuideSourceName();
      const dayText = getDaySearchText(day);
      const guidePlace = details
        ? pickGuidePlace(day, [details.bestFirstTimers, details.bestAttractions, details.bestUnique], index, day.highlight || day.area)
        : (day.highlight || day.area);
      const guideMeal = details
        ? pickGuidePlace(day, [details.bestDinner, details.bestRestaurants, details.bestLunch], index, "")
        : "";
      const mealLed = guideMeal && /dinner|lunch|breakfast|restaurant|reservation|food|market|bakery|coffee|cafe/.test(dayText);

      return {
        icon: "menu_book",
        label: "Guide logic",
        copy: mealLed
          ? `From the ${guideSource}: ${guideMeal} is treated as a real anchor, so the rest of the day stays close enough for the meal to matter.`
          : `From the ${guideSource}: ${guidePlace} helps explain why this day is centered in ${day.area} instead of jumping between unrelated stops.`
      };
    }

    function buildDayPlanningNotes(day, index, totalDays) {
      const notes = [];
      const guideNote = buildDayGuideSourceNote(day, index);
      if (guideNote) notes.push(guideNote);
      notes.push(
        {
          icon: "route",
          label: "Why this order works",
          copy: buildDayOrderNote(day, index, totalDays)
        },
        {
          icon: "event_available",
          label: "Book ahead",
          copy: buildDayBookingNote(day, index, totalDays)
        }
      );
      const mustHaveNote = buildDayMustHaveNote(day, index, totalDays);
      notes.push(mustHaveNote || {
        icon: "swap_horiz",
        label: "Easy swap",
        copy: buildDaySwapNote(day, index)
      });
      if (mustHaveNote) {
        notes.push({
          icon: "swap_horiz",
          label: "Easy swap",
          copy: buildDaySwapNote(day, index)
        });
      }
      return notes.slice(0, 4);
    }

    function shortDestinationMode() {
      if (hbState.appState.depth === "Hidden gems" || hbState.appState.depth === "Deeper cut") return "more hidden gems and local spots";
      if (hbState.appState.depth === "Mix of both" || hbState.appState.depth === "Balanced") return "top sights with some local finds";
      return "top sights first";
    }

    function formatFoodPriority() {
      if (hbState.appState.foodImportance === "Keep it easy" || hbState.appState.foodImportance === "Supporting detail") return "easy meals";
      if (hbState.appState.foodImportance === "Food is a focus" || hbState.appState.foodImportance === "Major highlight") return "food-focused plans";
      return "good local restaurants";
    }

    function getTripQualitySignalText() {
      return [
        hbState.appState.destination,
        hbState.appState.budget,
        hbState.appState.memory,
        hbState.appState.foodImportance,
        hbState.appState.spontaneity,
        hbState.appState.pace,
        hbState.appState.pets,
        hbState.appState.mustHaves,
        hbState.appState.nonNegotiables,
        ...(hbState.appState.styles || [])
      ].join(" ").toLowerCase();
    }

    function getTripQualityProfile(city = getCityName()) {
      const text = getTripQualitySignalText();
      const adults = Number(hbState.appState.adults || 1);
      const children = Number(hbState.appState.children || 0);
      const hasFamily = children > 0 || /family|kid|kids|children|child|stroller|teen/.test(text);
      const hasPet = hbState.appState.pets && hbState.appState.pets !== "No pets";
      const romantic = /romantic|honeymoon|anniversary|couple|proposal/.test(text);
      const beach = /beach|coast|island|resort beach|swim|snorkel|ocean|shore|waterfront|sunset by the water/.test(text)
        || /cancun|miami|sydney|nadi|suva|roseau/.test(city.toLowerCase());
      const road = /road trip|drive|driving|rental car|parking|scenic route|route day|national park|highway/.test(text);
      const budget = hbState.appState.budget === "Budget" || /budget|cheap|low-cost|lower-cost|save money|affordable|free museum|free sight|free attraction|free walking/.test(text);
      const luxury = /luxury|splurge|high-end|private|vip|palace|resort spa|tasting menu|five-star/.test(text);
      const solo = (adults === 1 && children === 0 && !hasPet) || /solo|alone|single traveler/.test(text);
      const adventurous = /adventurous|adventure|active|hike|kayak|explor|outdoor outing|big outing/.test(text);
      const food = /foodie|food-focused|food is a focus|restaurant|reservation|dinner|market|bakery/.test(text);
      const relaxing = /relaxing|easygoing|rest|slow|calm|quiet|spa/.test(text);

      if (hasFamily && beach) {
        return {
          key: "family-beach",
          titleDescriptor: "Family Beach",
          summary: "Beach time, kid-friendly pacing, simple meals, and realistic resets are treated as core parts of the trip.",
          reasoning: "Family beach trips need fewer heroic transfers, more shade and snack windows, and backup options when energy changes.",
          lensValue: "Beach time and family logistics are protected",
          signatureTitle: `${city} easy beach day`,
          signatureReason: "Chosen because this trip needs the beach to feel simple, fun, and manageable for the whole group.",
          dayLabel: "Family fit",
          dayNote: "Keep this day flexible around shade, snacks, bathrooms, and a clean way to head back if the group gets tired."
        };
      }

      if (romantic && luxury) {
        return {
          key: "luxury-honeymoon",
          titleDescriptor: "Luxury Honeymoon",
          summary: "The plan protects privacy, slower mornings, standout meals, and polished evenings instead of overfilling the schedule.",
          reasoning: "A luxury honeymoon should feel intentional and special, with reservations and scenic moments carrying more weight than checklist coverage.",
          lensValue: "Romantic moments and premium pacing are shaping the trip",
          signatureTitle: `${city} private-feeling evening`,
          signatureReason: "Chosen because the trip should have one polished evening that feels worth dressing up for and planning around.",
          dayLabel: "Honeymoon fit",
          dayNote: "Protect the romantic or premium anchor first, then keep the surrounding plans close enough that the day feels smooth."
        };
      }

      if (romantic || /romantic memory/.test(text)) {
        return {
          key: "romantic",
          titleDescriptor: "Romantic",
          summary: "The itinerary leaves room for atmosphere, slower meals, scenic walks, and one evening that feels intentionally special.",
          reasoning: "Romantic trips work best when the plan creates space for mood instead of treating every day like a sightseeing checklist.",
          lensValue: "Atmosphere, meals, and scenic timing are protected",
          signatureTitle: `${city} sunset-to-dinner evening`,
          signatureReason: "Chosen because the trip needs one emotional high point that feels natural rather than staged.",
          dayLabel: "Romantic fit",
          dayNote: "Leave enough time before the evening anchor so the day can slow down instead of rushing into the best moment."
        };
      }

      if (hasFamily) {
        return {
          key: "family",
          titleDescriptor: "Family-Friendly",
          summary: "The plan keeps kid-friendly anchors visible while protecting downtime, simpler transitions, and realistic meal timing.",
          reasoning: "Family trips need a plan that can bend without falling apart, so each day has a clear anchor and a practical escape valve.",
          lensValue: "The trip is built to stay enjoyable for the whole group",
          signatureTitle: `${city} family anchor day`,
          signatureReason: "Chosen because it gives the group one clear memory without asking every traveler to keep adult sightseeing pace all day.",
          dayLabel: "Family fit",
          dayNote: "Keep one easy reset nearby, and avoid making this day depend on too many perfect transitions."
        };
      }

      if (hasPet) {
        return {
          key: "pet-friendly",
          titleDescriptor: "Pet-Friendly",
          summary: "Pet-friendly needs shape the day spacing, outdoor time, stay area, and booking reminders.",
          reasoning: "Pet-friendly trips need more attention to parks, outdoor meals, hotel rules, and shorter loops back to the stay.",
          lensValue: "Pet-friendly logistics are part of the route",
          signatureTitle: `${city} outdoor-friendly day`,
          signatureReason: "Chosen because the trip should work around pet needs instead of treating them like a footnote.",
          dayLabel: "Pet fit",
          dayNote: "Check pet rules before booking, and keep the route close enough to return to the stay without derailing the day."
        };
      }

      if (road) {
        return {
          key: "road-trip",
          titleDescriptor: "Road Trip",
          summary: "The itinerary treats drive time, parking, scenic stops, and lighter arrival windows as part of the trip design.",
          reasoning: "Road trips feel better when the route has fewer brittle handoffs and each day has a clear reason to stop.",
          lensValue: "Drive time and route logic are shaping the itinerary",
          signatureTitle: `${city} route-friendly anchor day`,
          signatureReason: "Chosen because this trip needs a strong stop that works with the route, not against it.",
          dayLabel: "Route fit",
          dayNote: "Keep parking, drive time, and one scenic or food stop in mind before adding another timed commitment."
        };
      }

      if (budget) {
        return {
          key: "budget",
          titleDescriptor: "Budget-Friendly",
          summary: "Free sights, walkable areas, casual meals, and one worthwhile splurge are prioritized over expensive filler.",
          reasoning: "Budget trips should still feel designed, so the plan protects value without making every day feel like a compromise.",
          lensValue: "Value-first choices are shaping the day order",
          signatureTitle: `${city} best-value day`,
          signatureReason: "Chosen because it gives the trip one strong payoff while keeping the rest of the day practical.",
          dayLabel: "Value fit",
          dayNote: "Favor free viewpoints, markets, parks, public transit, and casual meals unless this is the stop worth paying for."
        };
      }

      if (luxury) {
        return {
          key: "luxury",
          titleDescriptor: "Luxury",
          summary: "The trip uses fewer but better anchors, with reservations, private-feeling time, and polished evenings carrying the experience.",
          reasoning: "Luxury trips should not just be busier or pricier; they should feel smoother, more deliberate, and easier to enjoy.",
          lensValue: "Premium anchors and polished pacing are shaping the trip",
          signatureTitle: `${city} premium evening plan`,
          signatureReason: "Chosen because this is the moment where a better reservation, view, or private-feeling experience is worth protecting.",
          dayLabel: "Premium fit",
          dayNote: "Book the strongest anchor early, then avoid overloading the day so the premium moment still feels worth it."
        };
      }

      if (solo) {
        return {
          key: "solo",
          titleDescriptor: "Solo",
          summary: "The plan keeps navigation simple, gives flexible meal options, and avoids days that depend on a group rhythm.",
          reasoning: "Solo trips work best when the itinerary feels confident but not overcommitted, with easy pivots between planned and open time.",
          lensValue: "Solo-friendly flow and flexible choices are protected",
          signatureTitle: `${city} solo discovery day`,
          signatureReason: "Chosen because it gives the trip a clear personal highlight while keeping the day easy to change on the fly.",
          dayLabel: "Solo fit",
          dayNote: "Keep the main stop clear, then leave room for a cafe, shop, gallery, or walk that can change with your mood."
        };
      }

      if (beach) {
        return {
          key: "beach",
          titleDescriptor: "Beach",
          summary: "The itinerary protects beach time, shade, slower meals, and weather-flexible backup options.",
          reasoning: "Beach trips should not become overbuilt city itineraries; the plan needs room for water, weather, and easy resets.",
          lensValue: "Beach time and weather flexibility are protected",
          signatureTitle: `${city} beach-and-sunset day`,
          signatureReason: "Chosen because the trip needs one day where the coast or water is clearly the point.",
          dayLabel: "Beach fit",
          dayNote: "Protect the best outdoor window first, then keep a weather-friendly backup nearby."
        };
      }

      if (adventurous) {
        return {
          key: "adventurous",
          titleDescriptor: "Adventurous",
          summary: "The trip adds more movement, viewpoints, markets, and exploratory stretches without turning every day into a forced march.",
          reasoning: "Adventurous trips need momentum, but they still need breaks and a route that makes sense.",
          lensValue: "Discovery and movement are shaping the trip",
          signatureTitle: `${city} active discovery day`,
          signatureReason: "Chosen because this is where the itinerary should feel more curious and alive.",
          dayLabel: "Adventure fit",
          dayNote: "Use the bigger outing as the anchor, then add one nearby discovery instead of scattering the route."
        };
      }

      if (food) {
        return {
          key: "food",
          titleDescriptor: "Food-Focused",
          summary: "Meals, markets, reservations, and neighborhood food areas are treated as real trip anchors.",
          reasoning: "Food-focused trips fall flat when meals are placeholders, so the itinerary gives restaurants and markets room to matter.",
          lensValue: "Food and neighborhoods are shaping the best parts",
          signatureTitle: `${city} standout food day`,
          signatureReason: "Chosen because the meal or market should carry the memory weight instead of being squeezed between sights.",
          dayLabel: "Food fit",
          dayNote: "Choose the meal first, then keep the surrounding stops close enough that the food anchor still feels like the point."
        };
      }

      if (relaxing) {
        return {
          key: "relaxing",
          titleDescriptor: "Relaxing",
          summary: "The plan keeps mornings lighter, transfers lower, and the best pauses visible instead of treating rest as leftover time.",
          reasoning: "Relaxing trips should still feel planned, but the plan needs to protect energy as much as attractions.",
          lensValue: "The plan is keeping the days calmer and easier to enjoy",
          signatureTitle: `${city} slow afternoon`,
          signatureReason: "Chosen because this trip should feel calmer, with one easy anchor that leaves room to enjoy the place.",
          dayLabel: "Relaxed fit",
          dayNote: "Protect the pause as part of the plan, not as empty time after everything else."
        };
      }

      return {
        key: "balanced",
        titleDescriptor: hbState.appState.styles[0] || "Balanced",
        summary: "The plan balances the biggest reasons to go with enough room for meals, neighborhoods, and realistic pacing.",
        reasoning: "A good general trip needs clear anchors, light routing logic, and enough flexibility that the plan still works in real life.",
        lensValue: "The big sights stay protected without overloading the days",
        signatureTitle: `${city} signature essential`,
        signatureReason: "Chosen because it matches your strongest trip signals and gives the trip one moment that clearly stands out.",
        dayLabel: "Trip fit",
        dayNote: "Keep the main anchor visible, then use nearby food, walks, or pauses to make the day feel complete."
      };
    }

    function buildTripTitle(city) {
      const descriptor = getTripQualityProfile(city).titleDescriptor;
      if (descriptor === "Road Trip") return `A ${city} Road Trip`;
      const article = /^[aeiou]/i.test(descriptor) ? "An" : "A";
      return `${article} ${descriptor} ${city} Trip`;
    }

    function formatPacePhrase() {
      const pace = String(hbState.appState.pace || "Balanced").toLowerCase();
      const article = /^[aeiou]/i.test(pace) ? "an" : "a";
      return `${article} ${pace} pace`;
    }

    function buildTripSummary(city) {
      const styleText = hbState.appState.styles.length > 1
        ? `${hbState.appState.styles[0].toLowerCase()} and ${hbState.appState.styles[1].toLowerCase()}`
        : (hbState.appState.styles[0] || "balanced").toLowerCase();
      return `${buildTravelerText()} in ${city}, built around ${styleText} days and ${formatPacePhrase()}. ${getTripQualityProfile(city).summary}`;
    }

    function buildTripReasoning() {
      const guideReasoning = getGuideSourceReasoning();
      const baseReasoning = `Neighborhood-led, easy to follow, and shaped around your strongest signals.`;
      const qualityReasoning = getTripQualityProfile().reasoning;
      return guideReasoning ? `${guideReasoning} ${baseReasoning} ${qualityReasoning}` : `${baseReasoning} ${qualityReasoning}`;
    }

    function formatTripStyles() {
      if (!hbState.appState.styles.length) return "Balanced";
      if (hbState.appState.styles.length === 1) return hbState.appState.styles[0];
      if (hbState.appState.styles.length === 2) return `${hbState.appState.styles[0]} + ${hbState.appState.styles[1]}`;
      return `${hbState.appState.styles.slice(0, -1).join(", ")} + ${hbState.appState.styles[hbState.appState.styles.length - 1]}`;
    }

    function buildTripLensValue() {
      const profile = getTripQualityProfile();
      if (profile.key !== "balanced") return profile.lensValue;
      if (hbState.appState.memory === "Food-focused" || hbState.appState.memory === "Food memory") return "Food and neighborhoods are shaping the best parts";
      if (hbState.appState.memory === "Romantic" || hbState.appState.memory === "Romantic memory") return "The trip is leaning atmospheric and memorable";
      if (hbState.appState.memory === "Family-friendly" || hbState.appState.memory === "Family memory") return "The plan is staying easy to enjoy together";
      if (hbState.appState.memory === "Relaxing") return "The plan is keeping the days calmer and easier to enjoy";
      if (hbState.appState.memory === "Adventurous") return "The trip is leaning active, curious, and more exploratory";
      return "The big sights stay protected without overloading the days";
    }

    function buildTripLensDetail() {
      return `${hbState.appState.pace} pace - ${hbState.appState.spontaneity} - ${formatTripStyles()}`;
    }

    function buildTripQuickFacts() {
      const tripLength = getTripLength();
      const styleText = formatTripStyles();
      const guideEntry = getDestinationGuideEntry();
      const stayValue = hbState.appState.hotelName
        ? hbState.appState.hotelName
        : (hbState.appState.hotelArea ? hbState.appState.hotelArea : "Not added yet");
      const stayDetail = hbState.appState.hotelCheckIn || hbState.appState.hotelCheckOut
        ? [hbState.appState.hotelCheckIn ? `Check-in ${formatDate(hbState.appState.hotelCheckIn)}` : "", hbState.appState.hotelCheckOut ? `Check-out ${formatDate(hbState.appState.hotelCheckOut)}` : ""].filter(Boolean).join(" • ")
        : "Add lodging when you have it";
      const flightValue = hbState.appState.flightMode === "have-flights"
        ? (hbState.appState.flightAirline || "Flights added")
        : (hbState.appState.flightMode === "need-help" ? "Need help booking" : "No flights needed");
      const flightDetail = hbState.appState.flightMode === "have-flights"
        ? (hbState.appState.flightNumber || "Times can be added below")
        : hbState.appState.flightPreference;

      return [
        {
          id: "lens",
          label: "Trip lens",
          value: buildTripLensValue(),
          detail: buildTripLensDetail(),
          badge: hbState.guidePlanContext?.sourceType ? "Guide-led" : (guideEntry ? "Guide-backed" : "Personalized"),
          featured: true,
          metaChips: Array.from(new Set([
            hbState.appState.memory,
            hbState.appState.pace,
            hbState.appState.spontaneity
          ]))
        },
        {
          id: "dates",
          label: "Dates",
          value: `${formatDate(hbState.appState.startDate)} - ${formatDate(hbState.appState.endDate)}`,
          detail: `${tripLength} day${tripLength === 1 ? "" : "s"} planned from arrival through wrap-up`
        },
        {
          id: "travelers",
          label: "Who's going",
          value: buildTravelerText(),
          detail: hbState.appState.pets !== "No pets" ? hbState.appState.pets : "No pets coming"
        },
        {
          id: "budget",
          label: "Spending shape",
          value: hbState.appState.budget,
          detail: `${hbState.appState.pace} pace • ${styleText} style`
        },
        {
          id: "travel",
          label: "Travel setup",
          value: flightValue,
          detail: flightDetail
        },
        {
          id: "stay",
          label: "Where you stay",
          value: stayValue,
          detail: stayDetail
        },
        {
          id: "memory",
          label: "What matters most",
          value: hbState.appState.mustHaves?.trim() ? "Your must-haves" : hbState.appState.memory,
          detail: hbState.appState.mustHaves?.trim()
            ? hbState.appState.mustHaves.trim()
            : `${hbState.appState.spontaneity} - one of the strongest planning signals`
        }
      ];
    }

    function getPlanningReadiness() {
      const start = new Date(hbState.appState.startDate);
      const end = new Date(hbState.appState.endDate);
      const hasValidDates = Boolean(hbState.appState.startDate && hbState.appState.endDate)
        && !Number.isNaN(start.getTime())
        && !Number.isNaN(end.getTime())
        && end >= start;
      const adults = Number(hbState.appState.adults || 0);
      const destination = String(hbState.appState.destination || "").trim();
      const hasGuideData = Boolean(getDestinationGuideEntry() || getDestinationGuideDetails());
      const hasStay = Boolean(hbState.appState.hotelName || hbState.appState.hotelArea);
      const flightReady = hbState.appState.flightMode !== "have-flights"
        || Boolean(hbState.appState.arrivalFlight || hbState.appState.departureFlight || hbState.appState.flightNumber || hbState.appState.flightAirline);
      const stylesReady = Boolean(hbState.appState.styles?.length);
      const basicsReady = Boolean(destination) && hasValidDates && adults >= 1;
      const required = [
        {
          id: "destination",
          title: "Destination",
          ready: Boolean(destination),
          level: "required",
          panel: "build-panel",
          target: "destination-input",
          fixLabel: "Add destination",
          readyCopy: destination ? `${destination} is set.` : "",
          missingCopy: "Add the city or place you want to visit."
        },
        {
          id: "dates",
          title: "Dates",
          ready: hasValidDates,
          level: "required",
          panel: "build-panel",
          target: hasValidDates || hbState.appState.startDate ? "end-date-input" : "start-date-input",
          fixLabel: "Fix dates",
          readyCopy: hasValidDates ? `${formatDate(hbState.appState.startDate)} to ${formatDate(hbState.appState.endDate)}.` : "",
          missingCopy: "Add a valid start and end date so the planner knows how many days to build."
        },
        {
          id: "travelers",
          title: "Travelers",
          ready: adults >= 1,
          level: "required",
          panel: "build-panel",
          target: "adults-input",
          fixLabel: "Add travelers",
          readyCopy: adults >= 1 ? buildTravelerText() : "",
          missingCopy: "Add at least one adult traveler."
        }
      ];
      const optional = [
        {
          id: "preferences",
          title: "Trip style",
          ready: stylesReady,
          level: "recommended",
          panel: "details-panel",
          target: "preference-style-section",
          fixLabel: "Pick style",
          readyCopy: stylesReady ? `${formatTripStyles()} with a ${hbState.appState.pace.toLowerCase()} pace.` : "",
          missingCopy: "Pick at least one trip style so the draft feels intentional."
        },
        {
          id: "must-haves",
          title: "Must-haves",
          ready: Boolean(String(hbState.appState.mustHaves || "").trim()),
          level: "optional",
          panel: "details-panel",
          target: "must-haves-input",
          fixLabel: "Add must-haves",
          readyCopy: hbState.appState.mustHaves ? trimPlanningText(hbState.appState.mustHaves, 88) : "",
          missingCopy: "Add one or two moments the trip should protect if they matter."
        },
        {
          id: "rules",
          title: "Hard rules",
          ready: Boolean(String(hbState.appState.nonNegotiables || "").trim()),
          level: "optional",
          panel: "details-panel",
          target: "non-negotiables-input",
          fixLabel: "Add rules",
          readyCopy: hbState.appState.nonNegotiables ? trimPlanningText(hbState.appState.nonNegotiables, 88) : "",
          missingCopy: "Add dietary, accessibility, timing, or avoid-list rules if the planner must respect them."
        },
        {
          id: "logistics",
          title: "Logistics",
          ready: hasStay && flightReady,
          level: "optional",
          panel: "build-panel",
          target: "build-logistics-section",
          fixLabel: "Add logistics",
          readyCopy: hasStay && flightReady ? "Stay and travel timing are enough for a realistic first and last day." : "",
          missingCopy: "Hotel area, hotel name, or known flight timing can make the itinerary more realistic."
        },
        {
          id: "guide",
          title: "Guide match",
          ready: hasGuideData,
          level: "context",
          panel: "city-guides-panel",
          target: "",
          fixLabel: "Browse guides",
          readyCopy: hasGuideData ? `City guide context is shaping ${getCityName()}.` : "",
          missingCopy: "A matching city guide can add richer destination logic, but this is not required."
        }
      ];
      const blockers = required.filter((item) => !item.ready);
      const suggestions = optional.filter((item) => !item.ready);
      const readyCount = [...required, ...optional].filter((item) => item.ready).length;
      const totalCount = required.length + optional.length;

      return {
        basicsReady,
        generationReady: blockers.length === 0,
        blockers,
        suggestions,
        required,
        optional,
        all: [...required, ...optional],
        readyCount,
        totalCount
      };
    }

    function renderTripDestinationDepth() {
      const wrap = document.getElementById("trip-guide-depth");
      if (!wrap) return;

      const cards = buildTripDestinationDepthCards();
      if (!cards.length) {
        wrap.classList.add("hidden");
        wrap.innerHTML = "";
        return;
      }

      wrap.classList.remove("hidden");
      wrap.innerHTML = `
        <div class="destination-depth-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Destination logic</p>
            <h5 class="mt-1 font-display text-xl font-bold text-ink">Why this itinerary looks this way</h5>
            <p class="mt-2 max-w-[46rem] text-sm leading-6 text-muted">These are the guide-backed signals being used inside the generated trip, not just a separate article view.</p>
          </div>
          <span class="self-start rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-tertiary">Inline guide data</span>
        </div>
        <div class="destination-depth-grid mt-4">
          ${cards.map((item) => `
            <article class="destination-depth-card">
              <div class="destination-depth-card-head">
                <span class="destination-depth-icon material-symbols-outlined" aria-hidden="true">${escapeHtml(item.icon)}</span>
                <div class="min-w-0">
                  <p class="destination-depth-label">${escapeHtml(item.label)}</p>
                  <h6 class="destination-depth-value">${escapeHtml(item.value)}</h6>
                </div>
              </div>
              <p class="destination-depth-copy">${escapeHtml(item.copy)}</p>
              <div class="destination-depth-chip-row">
                ${(item.chips || []).filter(Boolean).slice(0, 3).map((chip) => `<span class="destination-depth-chip">${escapeHtml(chip)}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      `;
    }

    function buildBlueprintSummary(city) {
      const styles = hbState.appState.styles.join(" + ") || "Balanced";
      return `${styles} days in ${city} for ${buildTravelerText()}, with ${formatPacePhrase().replace("pace", "rhythm")} and ${formatFoodPriority()}.`;
    }

    function buildBlueprintReasoning() {
      const guideReasoning = getGuideSourceReasoning();
      const baseReasoning = `We’re leaning ${shortDestinationMode()}, keeping the trip easy to enjoy, and using your must-haves to shape the plan instead of trying to fill every hour.`;
      return guideReasoning ? `${guideReasoning} ${baseReasoning}` : baseReasoning;
    }

    function buildSignatureEvent(city) {
      const profile = getTripQualityProfile(city);
      if (profile.key !== "balanced") {
        return {
          title: profile.signatureTitle,
          reason: profile.signatureReason
        };
      }

      if (hbState.appState.memory === "Food-focused" || hbState.appState.memory === "Food memory" || hbState.appState.foodImportance === "Food is a focus" || hbState.appState.foodImportance === "Major highlight") {
        return {
          title: `${city} signature dinner`,
          reason: `Chosen because food matters on this trip, it fits your ${hbState.appState.pace.toLowerCase()} pace, and it gives the trip one standout memory moment without forcing the rest of the day.`
        };
      }

      if (hbState.appState.memory === "Romantic" || hbState.appState.memory === "Romantic memory") {
        return {
          title: `Sunset evening in ${city}`,
          reason: "Chosen because your memory goal leans emotional and atmospheric, so this gives the trip one clear moment that feels special without feeling overbuilt."
        };
      }

      if (hbState.appState.memory === "Relaxing") {
        return {
          title: `${city} slow afternoon`,
          reason: "Chosen because this trip should feel calmer, with one easy anchor that leaves room to enjoy the place instead of rushing through it."
        };
      }

      if (hbState.appState.memory === "Adventurous") {
        return {
          title: `${city} exploratory day`,
          reason: "Chosen because this trip should include a little more discovery, movement, and curiosity without turning every day into a packed checklist."
        };
      }

      return {
        title: `${city} signature essential`,
        reason: "Chosen because it matches your strongest trip signals, supports a first-time or essentials-first feeling, and gives the trip one moment that clearly stands out."
      };
    }

    function getVibeContent(city, areas) {
      const mainArea = areas[1] || areas[0] || city;
      const eveningArea = areas[3] || areas[2] || mainArea;

      if (hbState.appState.memory === "Relaxing") {
        return {
          dayTwoTitle: `Relaxing day in ${mainArea}`,
          dayTwoRationale: `This day gives ${mainArea} enough space to feel easy, with fewer transfers and more time between the moments that matter.`,
          dayTwoTimeShape: "Easy, with open space",
          dayTwoItemTitle: "Slow neighborhood anchor + open stretch",
          dayTwoItemBody: "Plan one worthwhile stop, then protect time for a relaxed meal, a scenic walk, or a quiet stretch instead of stacking another attraction on top of it.",
          dayTwoFit: "It keeps the day intentional without turning rest into leftover time.",
          signatureTitle: `Slow afternoon into evening in ${eveningArea}`,
          signatureRationale: "This is the calmest anchor of the trip, so the day stays lighter around it and avoids the feeling of rushing to earn the evening.",
          signatureTimeShape: "Open afternoon + easy evening",
          signatureItemTitle: "Slow afternoon + easy evening plan",
          signatureItemBody: `Use ${eveningArea} for one gentle daytime anchor, then let the evening stay close enough for dinner, a view, or a quiet final walk.`,
          signatureFit: "It makes the trip feel restful on purpose, not underplanned.",
          finalItemBody: "Keep the last stretch simple: one good stop, one meal or walk worth remembering, and enough time to leave without feeling squeezed.",
          finalFit: "It helps the trip end calm and complete instead of crowded."
        };
      }

      if (hbState.appState.memory === "Adventurous") {
        return {
          dayTwoTitle: `Adventurous day around ${mainArea}`,
          dayTwoRationale: `This day adds more discovery and movement while still keeping the route readable, so the trip feels active without becoming chaotic.`,
          dayTwoTimeShape: "Active, with smart breaks",
          dayTwoItemTitle: "Viewpoint, market, or local find",
          dayTwoItemBody: "Build the day around one bigger outing, then add a nearby market, overlook, side street, or neighborhood find that gives the plan more momentum.",
          dayTwoFit: "It creates the feeling of discovery while still protecting meals, breaks, and a sensible route.",
          signatureTitle: `Exploratory day into ${eveningArea}`,
          signatureRationale: "This is the day that should feel most curious and alive, with a stronger sequence of stops instead of one passive highlight.",
          signatureTimeShape: "Fuller day + flexible evening",
          signatureItemTitle: "Active anchor + discovery stretch",
          signatureItemBody: `Start with a more active anchor near ${eveningArea}, then leave space for a viewpoint, market, waterfront, or side-street detour before dinner.`,
          signatureFit: "It gives the trip a memorable sense of movement without making every day feel packed.",
          finalItemBody: "Use the final stretch for one last local find or scenic stop, then keep enough room to close the trip cleanly.",
          finalFit: "It lets the trip finish with a little discovery instead of fading into logistics."
        };
      }

      if (hbState.appState.memory === "Food-focused" || hbState.appState.foodImportance === "Food is a focus") {
        return {
          dayTwoTitle: `Food-led day in ${mainArea}`,
          dayTwoRationale: `This day protects better meal timing, then keeps the nearby sightseeing simple enough that restaurants do not become an afterthought.`,
          dayTwoTimeShape: "Planned around meals",
          dayTwoItemTitle: "Local food stop + nearby highlight",
          dayTwoItemBody: "Choose the meal or food area first, then build the rest of the day nearby so the plan feels delicious and practical.",
          dayTwoFit: "It makes food part of the trip shape, not just something squeezed between sights.",
          signatureTitle: `Standout dinner plan in ${eveningArea}`,
          signatureRationale: "This is the food anchor, so the day leaves enough energy and timing for the meal to feel like a highlight.",
          signatureTimeShape: "Lighter afternoon + dinner focus",
          signatureItemTitle: "Daytime anchor + standout dinner",
          signatureItemBody: `Keep the afternoon near ${eveningArea}, then build toward the restaurant, market, or reservation that should carry the evening.`,
          signatureFit: "It gives the meal enough room to feel worth planning around.",
          finalItemBody: "End with one last food stop, coffee, bakery, market, or neighborhood meal, then leave enough room to pack and wrap up.",
          finalFit: "It lets the trip close with something memorable instead of a random final bite."
        };
      }

      return {
        dayTwoTitle: `${hbState.appState.styles[0] || "Balanced"} day with clear local focus`,
        dayTwoRationale: `This day works because it gives you a strong feel for the city without making you cross it back and forth.`,
        dayTwoTimeShape: hbState.appState.pace === "Packed" ? "Full, with one breather" : "Planned, with room to wander",
        dayTwoItemTitle: `${hbState.appState.styles[0] || "Balanced"} highlight + open stretch`,
        dayTwoItemBody: `Build the day around one strong stop, then leave enough room around it for a good meal, a slower walk, and whatever makes that part of the city worth staying in.`,
        dayTwoFit: `The day still feels substantial, but the time around the headline stop is what keeps it enjoyable instead of mechanical.`,
        signatureTitle: `${hbState.appState.styles[1] || hbState.appState.styles[0] || "Balanced"} day with one standout evening plan`,
        signatureRationale: `This is the part of the trip meant to feel the most memorable, so the rest of the day stays lighter around it.`,
        signatureTimeShape: "Open afternoon + special evening",
        signatureItemTitle: "Daytime anchor + standout evening",
        signatureItemBody: `Start with one real daytime stop in ${eveningArea}, keep lunch or a coffee break nearby, and then build toward the dinner, view, or reservation that should carry the evening.`,
        signatureFit: `It gives the day a visible sequence, so the memory moment feels earned instead of dropped onto an otherwise vague outline.`,
        finalItemBody: `Use the final stretch for one last worthwhile stop, one last meal or walk you will actually remember, then leave enough space to pack and close the trip calmly.`,
        finalFit: `It helps the trip finish on a high note instead of letting the last day get swallowed by checkout energy and loose ends.`
      };
    }

    function buildStayCopy(city) {
      return `A few strong stay areas in ${city}: one more central, one calmer, and one with stronger local character. We prioritize safety first, then explain the trade-offs in plain language.`;
    }

    function parseTimelineTimeToMinutes(value) {
      if (!value || typeof value !== "string") return null;
      const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (!match) return null;
      let hours = Number(match[1]);
      const minutes = Number(match[2] || 0);
      const meridiem = match[3].toUpperCase();
      if (hours === 12) hours = 0;
      if (meridiem === "PM") hours += 12;
      return (hours * 60) + minutes;
    }

    function normalizeFirstDayTimeline(timeline, area) {
      if (!Array.isArray(timeline) || !timeline.length) return timeline;

      const firstStep = timeline[0];
      const firstStepMinutes = parseTimelineTimeToMinutes(firstStep.time);
      const looksLikeLateArrival = (firstStepMinutes !== null && firstStepMinutes >= 12 * 60)
        || /check in|arrival|settle/i.test(firstStep.title || "");

      if (!looksLikeLateArrival) return timeline;

      const normalized = timeline.map((step) => ({ ...step }));
      const targetTimesByCount = {
        3: ["9:00 AM", "1:00 PM", "6:30 PM"],
        4: ["9:00 AM", "11:30 AM", "3:00 PM", "7:00 PM"],
        5: ["8:30 AM", "11:00 AM", "1:30 PM", "4:30 PM", "7:30 PM"],
        6: ["8:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "6:30 PM", "8:30 PM"]
      };
      const targetTimes = targetTimesByCount[normalized.length] || targetTimesByCount[5];

      normalized.forEach((step, index) => {
        if (targetTimes[index]) step.time = targetTimes[index];
      });

      normalized[0] = {
        ...normalized[0],
        time: targetTimes[0] || "9:00 AM",
        title: `Morning start in ${area}`,
        copy: `Start the day in ${area} so the trip feels underway early, with enough room to enjoy the city before the evening sets in.`
      };

      if (normalized[1]) {
        normalized[1] = {
          ...normalized[1],
          time: targetTimes[1] || normalized[1].time
        };
      }

      if (normalized[2]) {
        normalized[2] = {
          ...normalized[2],
          time: targetTimes[2] || normalized[2].time
        };
      }

      return normalized;
    }

    function normalizeFirstDayTemplate(day, area) {
      const normalizedDay = {
        ...day,
        timeline: normalizeFirstDayTimeline(day.timeline, area)
      };

      if (/^First evening\b/i.test(normalizedDay.title || "")) {
        normalizedDay.title = `First day in ${area}`;
      }

      if (/arrival|first evening|arrival day/i.test(normalizedDay.rationale || "")) {
        normalizedDay.rationale = "This day starts earlier on purpose, so you can get into the city rhythm quickly and still keep the plan easy to enjoy.";
      }

      if (/arrival/i.test(normalizedDay.itemTitle || "")) {
        normalizedDay.itemTitle = "Morning start + neighborhood flow";
      }

      if (/arrival day|first night|settle in|check-?in/i.test(normalizedDay.itemBody || "")) {
        normalizedDay.itemBody = "Start the trip earlier in the day with one strong neighborhood stretch, a clear midday stop, and an evening that still feels easy instead of overloaded.";
      }

      if (/arrival day|late check-?in|travel delays/i.test(normalizedDay.fit || "")) {
        normalizedDay.fit = "It gives the first day a real daytime shape, so the trip feels active and personal right from the morning onward.";
      }

      return normalizedDay;
    }

    function formatTimelineMinutes(minutes) {
      const normalized = ((minutes % 1440) + 1440) % 1440;
      const hours24 = Math.floor(normalized / 60);
      const mins = normalized % 60;
      const meridiem = hours24 >= 12 ? "PM" : "AM";
      let hours12 = hours24 % 12;
      if (!hours12) hours12 = 12;
      return `${hours12}:${String(mins).padStart(2, "0")} ${meridiem}`;
    }

    function buildInsertedTimelineStep(kind, time, city, area, highlight) {
      const label = highlight || area;
      const citySpecificSteps = {
        Paris: {
          reset: { title: "Coffee and pastry stop", copy: "Take a short cafe break nearby so the morning feels like Paris, not just a route between pins." },
          followThrough: { title: "Rue des Rosiers or river stroll", copy: "Give this side of Paris a little more room with an easy walk before dinner rather than jumping somewhere new." }
        },
        Rome: {
          reset: { title: "Espresso pause in the square", copy: "Stop for a quick espresso nearby so the day keeps its Roman rhythm without feeling rushed." },
          followThrough: { title: "Piazza pause and neighborhood wander", copy: "Use the afternoon for one more piazza or side street stretch so the area feels lived in, not rushed through." }
        },
        Tokyo: {
          reset: { title: "Convenience-store snack or coffee break", copy: "Pause for something quick nearby so the day stays grounded in the neighborhood instead of becoming too stop-and-go." },
          followThrough: { title: "Department store or side-street browse", copy: "Use the later stretch for an easy Tokyo follow-through that adds texture without adding real effort." }
        },
        "New York": {
          reset: { title: "Coffee and street-side reset", copy: "Grab a quick coffee and stay local so the day keeps its New York rhythm without adding another cross-town move." },
          followThrough: { title: "Block-by-block neighborhood walk", copy: "Give this part of the city a little more room so the day feels like a real neighborhood day, not just headline stops." }
        },
        London: {
          reset: { title: "Tea or coffee break nearby", copy: "Pause for a short break so the day stays comfortable and the neighborhood still has room to register." },
          followThrough: { title: "Side-street or park stretch", copy: "Let the afternoon breathe with one easy London walk instead of forcing another major attraction." }
        },
        Barcelona: {
          reset: { title: "Cafe con leche break", copy: "Take a lighter café pause nearby so the day keeps its Barcelona ease instead of feeling overmanaged." },
          followThrough: { title: "Shops or square-side wander", copy: "Use this stretch for one more easy neighborhood walk before the evening picks up." }
        },
        Lisbon: {
          reset: { title: "Pastel and coffee stop", copy: "Pause for a pastry and coffee so the hills and pace of the day stay enjoyable." },
          followThrough: { title: "Miradouro or side-street view stop", copy: "Add one easy Lisbon overlook or neighborhood lane before dinner rather than pushing into another district." }
        },
        Bangkok: {
          reset: { title: "Cafe or riverside cooldown", copy: "Use this break to cool down and reset nearby so the city still feels manageable and enjoyable." },
          followThrough: { title: "Market or riverfront follow-through", copy: "Give the area one more easy Bangkok moment before dinner, instead of turning the afternoon into another long transfer." }
        },
        Miami: {
          reset: { title: "Juice or coffee break", copy: "Pause for something easy nearby so the day keeps its beach-city energy without getting too full too fast." },
          followThrough: { title: "Boardwalk or neighborhood pause", copy: "Use the afternoon for one more local stretch before dinner rather than adding another full outing." }
        },
        Athens: {
          reset: { title: "Coffee and shaded reset", copy: "Take a short break nearby so the day stays comfortable, especially after the more exposed sights." },
          followThrough: { title: "Plaka or square-side wander", copy: "Let the afternoon breathe with one more easy Athens walk instead of adding another full ruin stop." }
        }
      };

      const cityConfig = citySpecificSteps[city];
      if (cityConfig?.[kind]) {
        return { time, ...cityConfig[kind] };
      }

      if (kind === "reset") {
        return {
          time,
          title: `Coffee or reset near ${area}`,
          copy: `Use this stretch to pause, grab something easy, and stay in the same part of the city before moving into the next anchor.`
        };
      }

      return {
        time,
        title: `Afternoon follow-through in ${area}`,
        copy: `Give ${label} a little more room with an easier follow-through stop, so the day feels fuller without becoming crowded.`
      };
    }

    function expandTimelineSteps(timeline, city, area, highlight) {
      if (!Array.isArray(timeline) || timeline.length >= 5 || timeline.length < 3) return timeline;

      const expanded = timeline.map((step) => ({ ...step }));
      const stepMinutes = expanded.map((step) => parseTimelineTimeToMinutes(step.time));

      if (stepMinutes.some((value) => value === null)) {
        return timeline;
      }

      if (expanded.length === 3) {
        const firstMinutes = stepMinutes[0];
        const secondMinutes = stepMinutes[1];
        const thirdMinutes = stepMinutes[2];
        const lateMorningMinutes = Math.max(firstMinutes + 90, Math.min(secondMinutes - 60, firstMinutes + 135));
        const midAfternoonMinutes = Math.max(secondMinutes + 120, Math.min(thirdMinutes - 90, secondMinutes + 180));
        const extraSteps = [
          buildInsertedTimelineStep("reset", formatTimelineMinutes(lateMorningMinutes), city, area, highlight),
          buildInsertedTimelineStep("followThrough", formatTimelineMinutes(midAfternoonMinutes), city, area, highlight)
        ];

        return [
          expanded[0],
          extraSteps[0],
          expanded[1],
          extraSteps[1],
          expanded[2]
        ];
      }

      const gaps = [];
      for (let index = 0; index < stepMinutes.length - 1; index += 1) {
        gaps.push({
          index,
          start: stepMinutes[index],
          end: stepMinutes[index + 1],
          size: stepMinutes[index + 1] - stepMinutes[index]
        });
      }

      const largestGap = gaps.sort((left, right) => right.size - left.size)[0];
      if (!largestGap || largestGap.size < 90) return timeline;

      const insertMinutes = Math.round((largestGap.start + largestGap.end) / 2 / 15) * 15;
      const insertKind = largestGap.index === 0 || largestGap.end <= 13 * 60 ? "reset" : "followThrough";
      const insertedStep = buildInsertedTimelineStep(insertKind, formatTimelineMinutes(insertMinutes), city, area, highlight);

      return [
        ...expanded.slice(0, largestGap.index + 1),
        insertedStep,
        ...expanded.slice(largestGap.index + 1)
      ];
    }

    function buildStayCard(city) {
      const stayAreas = getAreaSet(city).slice(0, 3);
      const recommendations = [
        {
          label: "More central",
          area: stayAreas[0] || `${city} center`,
          copy: "Best when you want easier access to headline sights and do not mind a busier base."
        },
        {
          label: "More local",
          area: stayAreas[1] || stayAreas[0] || `${city} neighborhood base`,
          copy: "Best when the trip should feel more neighborhood-led, with stronger food and street-level atmosphere."
        },
        {
          label: "Calmer option",
          area: stayAreas[2] || stayAreas[1] || stayAreas[0] || `${city} quieter side`,
          copy: "Best when better sleep, easier pacing, or a little extra breathing room matters more than being in the thick of it."
        }
      ];

      if (hbState.appState.hotelName || hbState.appState.hotelArea || hbState.appState.hotelCheckIn || hbState.appState.hotelCheckOut) {
        const titleParts = [];
        if (hbState.appState.hotelName) titleParts.push(hbState.appState.hotelName);
        if (hbState.appState.hotelArea) titleParts.push(hbState.appState.hotelArea);
        const title = titleParts.join(" • ") || `Stay details in ${city}`;

        const copyParts = [];
        if (hbState.appState.hotelCheckIn) copyParts.push(`Check-in ${formatDateTime(hbState.appState.hotelCheckIn)}`);
        if (hbState.appState.hotelCheckOut) copyParts.push(`Check-out ${formatDateTime(hbState.appState.hotelCheckOut)}`);
        if (!copyParts.length) {
          copyParts.push("Hotel details saved. We can keep the trip centered around where you plan to stay.");
        }

        return {
          title,
          copy: `${copyParts.join(". ")}.`,
          tradeoffs: ["Your stay added", "Trip-centered planning", "Safety-aware location fit"],
          recommendations,
          meta: [
            {
              label: "Current setup",
              value: hbState.appState.hotelArea || hbState.appState.hotelName || `Stay details in ${city}`,
              copy: hbState.appState.hotelName && hbState.appState.hotelArea
                ? `${hbState.appState.hotelName} in ${hbState.appState.hotelArea}.`
                : "Your actual stay can now help shape the daily routing."
            },
            {
              label: "Why it matters",
              value: "Lodging sets the rhythm",
              copy: "Once the base is known, it is easier to keep mornings, returns, and heavier sightseeing days more practical."
            }
          ]
        };
      }

      return {
        title: `Three strong areas to stay in ${city}`,
        copy: buildStayCopy(city),
        tradeoffs: ["Central vs. quiet", "Local vs. iconic", "Budget vs. comfort"],
        recommendations,
        meta: [
          {
            label: "Current setup",
            value: "Still choosing where to stay",
            copy: "These recommendations give you a few strong starting areas instead of an overwhelming hotel list."
          },
          {
            label: "Why it matters",
            value: "Location shapes the whole trip",
            copy: "A better base can reduce extra transit, make evenings easier, and improve how much the trip actually feels enjoyable."
          }
        ]
      };
    }

    function syncTripLogisticsInputs() {
      if (hbRefs.formBindings.tripHotelName) hbRefs.formBindings.tripHotelName.value = hbState.appState.hotelName;
      if (hbRefs.formBindings.tripHotelArea) hbRefs.formBindings.tripHotelArea.value = hbState.appState.hotelArea;
      if (hbRefs.formBindings.tripHotelCheckIn) hbRefs.formBindings.tripHotelCheckIn.value = hbState.appState.hotelCheckIn;
      if (hbRefs.formBindings.tripHotelCheckOut) hbRefs.formBindings.tripHotelCheckOut.value = hbState.appState.hotelCheckOut;
      if (hbRefs.formBindings.tripArrivalFlight) hbRefs.formBindings.tripArrivalFlight.value = hbState.appState.arrivalFlight;
      if (hbRefs.formBindings.tripDepartureFlight) hbRefs.formBindings.tripDepartureFlight.value = hbState.appState.departureFlight;
      if (hbRefs.formBindings.journalMood) hbRefs.formBindings.journalMood.value = hbState.appState.journalMood;
      if (hbRefs.formBindings.journalEntry) hbRefs.formBindings.journalEntry.value = hbState.appState.journalEntry;

      const tripFlightLogistics = document.getElementById("trip-flight-logistics");
      if (tripFlightLogistics) {
        tripFlightLogistics.classList.toggle("hidden", hbState.appState.flightMode !== "have-flights");
      }
    }

    function syncPlanningInputsFromState() {
      hbRefs.formBindings.destination.value = hbState.appState.destination;
      hbRefs.formBindings.startDate.value = hbState.appState.startDate;
      hbRefs.formBindings.endDate.value = hbState.appState.endDate;
      hbRefs.formBindings.adults.value = hbState.appState.adults;
      hbRefs.formBindings.children.value = hbState.appState.children;
      hbRefs.formBindings.pets.value = hbState.appState.pets;
      hbRefs.formBindings.flightMode.value = hbState.appState.flightMode;
      hbRefs.formBindings.flightPreference.value = hbState.appState.flightPreference;
      hbRefs.formBindings.flightAirline.value = hbState.appState.flightAirline;
      hbRefs.formBindings.flightNumber.value = hbState.appState.flightNumber;
      hbRefs.formBindings.arrivalFlight.value = hbState.appState.arrivalFlight;
      hbRefs.formBindings.departureFlight.value = hbState.appState.departureFlight;
      hbRefs.formBindings.budget.value = hbState.appState.budget;
      hbRefs.formBindings.mustHaves.value = hbState.appState.mustHaves;
      if (hbRefs.formBindings.nonNegotiables) hbRefs.formBindings.nonNegotiables.value = hbState.appState.nonNegotiables || "";
      syncTripLogisticsInputs();
      hbUtils.updateModeUI?.();
      hbUtils.updateBudgetHelper?.();
      hbUtils.updateFlightUI?.();
      hbUtils.updateBuildFormHelpers?.();
      hbUtils.updatePreferenceHelpers?.();
      hbUtils.updateDestinationHelper?.();
      hbUtils.renderDestinationHero?.("build");
    }

    function updateStateFromTripLogistics() {
      hbState.appState.hotelName = hbRefs.formBindings.tripHotelName?.value.trim() || "";
      hbState.appState.hotelArea = hbRefs.formBindings.tripHotelArea?.value.trim() || "";
      hbState.appState.hotelCheckIn = hbRefs.formBindings.tripHotelCheckIn?.value || "";
      hbState.appState.hotelCheckOut = hbRefs.formBindings.tripHotelCheckOut?.value || "";

      if (hbState.appState.flightMode !== "not-needed") {
        hbState.appState.arrivalFlight = hbRefs.formBindings.tripArrivalFlight?.value || "";
        hbState.appState.departureFlight = hbRefs.formBindings.tripDepartureFlight?.value || "";
        hbRefs.formBindings.arrivalFlight.value = hbState.appState.arrivalFlight;
        hbRefs.formBindings.departureFlight.value = hbState.appState.departureFlight;
      }

      hbState.appState.journalMood = hbRefs.formBindings.journalMood?.value || "Memorable";
      hbState.appState.journalEntry = hbRefs.formBindings.journalEntry?.value.trim() || "";
    }

    function applyVibeContentToDay(day, index, lastIndex, vibeContent) {
      const next = { ...day };

      if (index === 1) {
        next.title = vibeContent.dayTwoTitle;
        next.rationale = vibeContent.dayTwoRationale;
        next.timeShape = vibeContent.dayTwoTimeShape;
        next.itemTitle = vibeContent.dayTwoItemTitle;
        next.itemBody = vibeContent.dayTwoItemBody;
        next.fit = vibeContent.dayTwoFit;
      }

      if (index === 3) {
        next.title = vibeContent.signatureTitle;
        next.rationale = vibeContent.signatureRationale;
        next.timeShape = vibeContent.signatureTimeShape;
        next.itemTitle = vibeContent.signatureItemTitle;
        next.itemBody = vibeContent.signatureItemBody;
        next.fit = vibeContent.signatureFit;
      }

      if (index === lastIndex && lastIndex >= 2) {
        next.itemBody = vibeContent.finalItemBody;
        next.fit = vibeContent.finalFit;
      }

      return next;
    }

    function updateJournalPreview() {
      const preview = document.getElementById("journal-preview");
      if (!preview) return;

      if (!hbState.appState.journalEntry) {
        preview.textContent = "Nothing saved yet. Add a quick note whenever you want to remember part of the trip.";
        return;
      }

      preview.textContent = `${hbState.appState.journalMood}: ${hbState.appState.journalEntry}`;
    }

    function cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    }

    function formatDraftSavedAt(date = new Date()) {
      return date.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    }

    function getStoredTripDraft() {
      try {
        const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
        if (!raw) return null;
        const draft = JSON.parse(raw);
        if (!draft || typeof draft !== "object") return null;
        return draft;
      } catch (error) {
        return null;
      }
    }

    function getStoredTripProfile() {
      try {
        const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
        if (!raw) return null;
        const profile = JSON.parse(raw);
        if (!profile || typeof profile !== "object") return null;
        return profile;
      } catch (error) {
        return null;
      }
    }

    function hydrateTripProfile() {
      const stored = getStoredTripProfile();
      if (!stored) return;
      hbState.tripProfile = {
        ...hbState.tripProfile,
        displayName: stored.displayName || "",
        email: stored.email || "",
        homeAirport: stored.homeAirport || ""
      };
      if (stored.accountMethod) {
        hbState.appState.accountMethod = stored.accountMethod;
      }
    }

    function updateTripProfileFromInputs() {
      hbState.tripProfile = {
        ...hbState.tripProfile,
        displayName: document.getElementById("trip-profile-name-input")?.value.trim() || "",
        email: document.getElementById("trip-profile-email-input")?.value.trim() || "",
        homeAirport: document.getElementById("trip-profile-airport-input")?.value.trim() || ""
      };
    }

    function persistTripProfile(options = {}) {
      const { feedback = "Profile saved" } = options;
      updateTripProfileFromInputs();
      const payload = {
        ...hbState.tripProfile,
        accountMethod: hbState.appState.accountMethod || "guest",
        savedAt: formatDraftSavedAt()
      };

      try {
        window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(payload));
        hbState.profileSaveFeedback = feedback;
        window.setTimeout(() => {
          if (hbState.profileSaveFeedback !== feedback) return;
          hbState.profileSaveFeedback = "";
          if (hbState.activePanelId === "saved-panel") renderSavedPanel();
        }, 2400);
        return true;
      } catch (error) {
        hbState.profileSaveFeedback = "Unable to save profile on this browser";
        return false;
      }
    }

    function getDraftMetaFromPayload(payload) {
      if (!payload) return null;
      const trip = payload.currentTrip || payload.liveDraftTrip || null;
      const changeItems = getTripChangeItems(trip);
      return {
        savedAt: payload.savedAt || "",
        savedAtMs: payload.savedAtMs || 0,
        destination: payload.appState?.destination || hbState.appState.destination,
        title: trip?.title || "Saved trip draft",
        days: trip?.days?.length || 0,
        changeCount: changeItems.length,
        changeSummary: getTripChangeSummary(trip, "")
      };
    }

    function hydrateSavedDraftStatus() {
      hbState.savedDraft = getDraftMetaFromPayload(getStoredTripDraft());
    }

    function persistTripDraft(options = {}) {
      const { feedback = "Draft saved" } = options;
      const now = new Date();
      const payload = {
        savedAt: formatDraftSavedAt(now),
        savedAtMs: now.getTime(),
        appState: cloneData(hbState.appState),
        currentTrip: hbState.currentTrip ? cloneData(hbState.currentTrip) : null,
        liveDraftTrip: hbState.liveDraftTrip ? cloneData(hbState.liveDraftTrip) : null,
        likedTrip: hbState.likedTrip ? cloneData(hbState.likedTrip) : null,
        alternateTrips: cloneData(hbState.alternateTrips || []),
        tripProfile: cloneData(hbState.tripProfile || {}),
        bookingItems: cloneData(hbState.bookingItems || {}),
        activeTripSource: cloneData(hbState.activeTripSource || { type: "live", versionId: "", name: "" })
      };

      try {
        window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
        hbState.savedDraft = getDraftMetaFromPayload(payload);
        hbState.draftSaveFeedback = feedback;
        window.setTimeout(() => {
          if (hbState.draftSaveFeedback !== feedback) return;
          hbState.draftSaveFeedback = "";
          if (hbState.activePanelId === "trip-panel") renderTrip();
          if (hbState.activePanelId === "saved-panel") renderSavedPanel();
        }, 2600);
        return true;
      } catch (error) {
        hbState.draftSaveFeedback = "Unable to save on this browser";
        return false;
      }
    }

    function restoreSavedDraft() {
      const payload = getStoredTripDraft();
      if (!payload) {
        hydrateSavedDraftStatus();
        hbState.draftSaveFeedback = "No saved draft found";
        renderTrip();
        return false;
      }

      hbState.appState = {
        ...hbState.appState,
        ...(payload.appState || {})
      };
      hbState.currentTrip = payload.currentTrip ? cloneData(payload.currentTrip) : (payload.liveDraftTrip ? cloneData(payload.liveDraftTrip) : null);
      hbState.liveDraftTrip = payload.liveDraftTrip ? cloneData(payload.liveDraftTrip) : (hbState.currentTrip ? cloneData(hbState.currentTrip) : null);
      hbState.likedTrip = payload.likedTrip ? cloneData(payload.likedTrip) : null;
      hbState.alternateTrips = Array.isArray(payload.alternateTrips) ? cloneData(payload.alternateTrips) : [];
      hbState.tripProfile = {
        ...hbState.tripProfile,
        ...(payload.tripProfile || {})
      };
      hbState.bookingItems = payload.bookingItems ? cloneData(payload.bookingItems) : {};
      persistBookingItems({ feedback: "Booking progress restored" });
      hbState.activeTripSource = payload.activeTripSource || { type: "live", versionId: "", name: "" };
      hbState.compareVersionId = "";
      hbState.unsavedArrangement = { dirty: false, message: "" };
      hbState.savedDraft = getDraftMetaFromPayload(payload);
      hbState.draftSaveFeedback = `Restored draft from ${hbState.savedDraft?.savedAt || "your saved draft"}`;
      syncPlanningInputsFromState();
      renderTrip();
      renderSavedPanel();
      return true;
    }

    function getSafeBackupNamePart(value) {
      return String(value || "trip")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 48) || "trip";
    }

    function getLocalAccountPayload() {
      const draftPayload = getStoredTripDraft();
      const profilePayload = getStoredTripProfile();
      hydrateBookingItems();

      return {
        product: "Horizon Bound",
        type: "local-account-backup",
        version: LOCAL_ACCOUNT_BACKUP_VERSION,
        exportedAt: new Date().toISOString(),
        exportedAtLabel: formatDraftSavedAt(),
        appState: cloneData(hbState.appState || {}),
        currentTrip: hbState.currentTrip ? cloneData(hbState.currentTrip) : null,
        liveDraftTrip: hbState.liveDraftTrip ? cloneData(hbState.liveDraftTrip) : null,
        likedTrip: hbState.likedTrip ? cloneData(hbState.likedTrip) : null,
        alternateTrips: cloneData(hbState.alternateTrips || []),
        tripProfile: cloneData(hbState.tripProfile || {}),
        bookingItems: cloneData(hbState.bookingItems || {}),
        activeTripSource: cloneData(hbState.activeTripSource || { type: "live", versionId: "", name: "" }),
        storage: {
          draft: draftPayload ? cloneData(draftPayload) : null,
          profile: profilePayload ? cloneData(profilePayload) : null,
          booking: {
            savedAt: formatDraftSavedAt(),
            destination: hbState.appState.destination,
            items: cloneData(hbState.bookingItems || {})
          }
        }
      };
    }

    function getLocalAccountSnapshotCards() {
      const draftPayload = getStoredTripDraft();
      const profilePayload = getStoredTripProfile();
      hydrateBookingItems();
      const bookingCount = Object.keys(hbState.bookingItems || {}).length;
      const versionCount = hbState.alternateTrips?.length || draftPayload?.alternateTrips?.length || 0;
      return [
        {
          label: "Saved here",
          value: draftPayload ? "Draft recoverable" : "No draft yet",
          copy: draftPayload
            ? `Last saved ${draftPayload.savedAt || "recently"} on this browser.`
            : "Save a draft first so export has a trip to carry."
        },
        {
          label: "Backup includes",
          value: `${versionCount} version${versionCount === 1 ? "" : "s"} - ${bookingCount} booking note${bookingCount === 1 ? "" : "s"}`,
          copy: "Exports include trip inputs, itinerary drafts, named versions, booking statuses, notes, and profile fields."
        },
        {
          label: "Privacy",
          value: "You hold the file",
          copy: profilePayload?.email
            ? "The backup can include your profile email, so store it like a personal trip document."
            : "Nothing is sent to a server. Import only replaces this browser's local saved trip data."
        }
      ];
    }

    function exportLocalAccountBackup() {
      const payload = getLocalAccountPayload();
      const filename = `horizon-bound-${getSafeBackupNamePart(payload.appState?.destination || payload.currentTrip?.title)}-backup.json`;
      try {
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        hbState.localAccountFeedback = `Backup exported: ${filename}`;
      } catch (error) {
        hbState.localAccountFeedback = "Unable to export a backup from this browser";
      }
      renderSavedPanel();
    }

    function applyLocalAccountBackup(payload) {
      if (!payload || typeof payload !== "object") {
        throw new Error("Backup file is empty or unreadable.");
      }
      if (payload.type && payload.type !== "local-account-backup") {
        throw new Error("This does not look like a Horizon Bound backup.");
      }

      const draftPayload = payload.storage?.draft || {
        savedAt: payload.exportedAtLabel || formatDraftSavedAt(),
        savedAtMs: Date.parse(payload.exportedAt || "") || Date.now(),
        appState: payload.appState || {},
        currentTrip: payload.currentTrip || null,
        liveDraftTrip: payload.liveDraftTrip || payload.currentTrip || null,
        likedTrip: payload.likedTrip || null,
        alternateTrips: Array.isArray(payload.alternateTrips) ? payload.alternateTrips : [],
        tripProfile: payload.tripProfile || {},
        bookingItems: payload.bookingItems || {},
        activeTripSource: payload.activeTripSource || { type: "live", versionId: "", name: "" }
      };
      const profilePayload = payload.storage?.profile || payload.tripProfile || {};
      const bookingPayload = payload.storage?.booking || {
        savedAt: payload.exportedAtLabel || formatDraftSavedAt(),
        destination: payload.appState?.destination || hbState.appState.destination,
        items: payload.bookingItems || {}
      };

      if (draftPayload) {
        window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftPayload));
      }
      if (profilePayload && Object.keys(profilePayload).length) {
        window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profilePayload));
      }
      if (bookingPayload && Object.keys(bookingPayload).length) {
        window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookingPayload));
      }

      hbState.appState = {
        ...hbState.appState,
        ...(draftPayload?.appState || payload.appState || {})
      };
      hbState.currentTrip = draftPayload?.currentTrip ? cloneData(draftPayload.currentTrip) : (payload.currentTrip ? cloneData(payload.currentTrip) : null);
      hbState.liveDraftTrip = draftPayload?.liveDraftTrip ? cloneData(draftPayload.liveDraftTrip) : (hbState.currentTrip ? cloneData(hbState.currentTrip) : null);
      hbState.likedTrip = draftPayload?.likedTrip ? cloneData(draftPayload.likedTrip) : (payload.likedTrip ? cloneData(payload.likedTrip) : null);
      hbState.alternateTrips = Array.isArray(draftPayload?.alternateTrips)
        ? cloneData(draftPayload.alternateTrips)
        : (Array.isArray(payload.alternateTrips) ? cloneData(payload.alternateTrips) : []);
      hbState.tripProfile = {
        ...hbState.tripProfile,
        ...(profilePayload || {}),
        ...(draftPayload?.tripProfile || {})
      };
      hbState.bookingItems = bookingPayload?.items && typeof bookingPayload.items === "object"
        ? cloneData(bookingPayload.items)
        : cloneData(payload.bookingItems || {});
      hbState.activeTripSource = draftPayload?.activeTripSource || payload.activeTripSource || { type: "live", versionId: "", name: "" };
      hbState.compareVersionId = "";
      hbState.unsavedArrangement = { dirty: false, message: "" };
      hbState.savedDraft = getDraftMetaFromPayload(draftPayload);
      hbState.localAccountFeedback = "Backup restored on this browser";
      syncPlanningInputsFromState();
      renderTrip();
      renderSavedPanel();
      return true;
    }

    function importLocalAccountBackup(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const payload = JSON.parse(String(reader.result || "{}"));
          applyLocalAccountBackup(payload);
        } catch (error) {
          hbState.localAccountFeedback = error?.message || "Unable to import this backup file";
          renderSavedPanel();
        }
      };
      reader.onerror = () => {
        hbState.localAccountFeedback = "Unable to read this backup file";
        renderSavedPanel();
      };
      reader.readAsText(file);
    }

    function createVersionId() {
      return `version-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    }

    function getTripArrangementSummary(trip) {
      if (!trip?.days?.length) return "";
      return trip.days.map((day) => `${day.dayLabel}: ${day.area}`).join(" • ");
    }

    function getChangeFeedbackLabel(feedback) {
      const labels = {
        "too-full": "Made lighter",
        "too-light": "Added depth",
        "wrong-area": "Area adjusted",
        "keep-this": "Marked keeper"
      };
      return labels[feedback] || "Adjusted";
    }

    function getTripChangeItems(trip = hbState.currentTrip) {
      const days = Array.isArray(trip?.days) ? trip.days : [];
      return days
        .filter((day) => day?.qualityAdjustment)
        .map((day) => ({
          dayLabel: day.dayLabel || "Day",
          area: day.area || "",
          feedback: day.qualityAdjustment.feedback || "",
          title: day.qualityAdjustment.title || getChangeFeedbackLabel(day.qualityAdjustment.feedback),
          copy: day.qualityAdjustment.copy || "",
          icon: day.qualityAdjustment.icon || "auto_fix_high",
          label: getChangeFeedbackLabel(day.qualityAdjustment.feedback)
        }));
    }

    function getTripChangeSummary(trip = hbState.currentTrip, fallback = "No day feedback yet") {
      const changes = getTripChangeItems(trip);
      if (!changes.length) return fallback;
      const leadChanges = changes.slice(0, 3).map((item) => `${item.dayLabel} ${item.label.toLowerCase()}`);
      const extra = changes.length > leadChanges.length ? `, plus ${changes.length - leadChanges.length} more` : "";
      return `${leadChanges.join(", ")}${extra}.`;
    }

    function renderTripChangeSummary() {
      const slot = document.getElementById("trip-change-summary");
      if (!slot) return;
      const changes = getTripChangeItems(hbState.currentTrip);
      const hasTrip = Boolean(hbState.currentTrip);
      const emptyCopy = hasTrip
        ? "Use quick feedback on any day and the planner will track what changed before you save."
        : "Build a trip first, then day feedback will appear here.";

      if (!changes.length) {
        slot.innerHTML = `
          <div class="trip-change-summary is-empty">
            <div class="trip-change-summary-head">
              <div>
                <p class="trip-change-summary-label">Trip changes</p>
                <h4 class="trip-change-summary-title">No day feedback yet</h4>
                <p class="trip-change-summary-copy">${escapeHtml(emptyCopy)}</p>
              </div>
              <span class="trip-change-summary-chip">Clean draft</span>
            </div>
          </div>
        `;
        return;
      }

      slot.innerHTML = `
        <div class="trip-change-summary">
          <div class="trip-change-summary-head">
            <div>
              <p class="trip-change-summary-label">Trip changes</p>
              <h4 class="trip-change-summary-title">${changes.length} ${changes.length === 1 ? "adjustment" : "adjustments"} ready to save</h4>
              <p class="trip-change-summary-copy">${escapeHtml(getTripChangeSummary(hbState.currentTrip, ""))}</p>
            </div>
            <span class="trip-change-summary-chip">${changes.length} changed</span>
          </div>
          <div class="trip-change-summary-grid">
            ${changes.slice(0, 4).map((item) => `
              <div class="trip-change-card">
                <span class="material-symbols-outlined trip-change-card-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
                <div>
                  <p class="trip-change-card-label">${escapeHtml(item.dayLabel)}${item.area ? ` - ${escapeHtml(item.area)}` : ""}</p>
                  <p class="trip-change-card-title">${escapeHtml(item.label)}</p>
                  <p class="trip-change-card-copy">${escapeHtml(item.copy || item.title)}</p>
                </div>
              </div>
            `).join("")}
          </div>
          <div class="trip-change-actions">
            <button class="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white" data-action="jump-trip-anchor" data-target-id="trip-versions-panel" data-section="versions" type="button">
              Save adjusted version
            </button>
            <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="save-current-draft" type="button">
              Save draft
            </button>
          </div>
        </div>
      `;
    }

    function renderTripDraftStatus() {
      const status = document.getElementById("trip-draft-status");
      if (!status) return;

      hydrateSavedDraftStatus();
      const saved = hbState.savedDraft;
      const hasTrip = Boolean(hbState.currentTrip);
      const feedback = hbState.draftSaveFeedback ? `<p class="trip-draft-status-meta">${escapeHtml(hbState.draftSaveFeedback)}</p>` : "";
      const meta = saved
        ? `${saved.days ? `${saved.days} day${saved.days === 1 ? "" : "s"} saved` : "Draft saved"}${saved.changeCount ? ` - ${saved.changeCount} trip change${saved.changeCount === 1 ? "" : "s"}` : ""} - ${saved.savedAt}`
        : "Not saved yet";

      status.innerHTML = `
        <div class="trip-draft-status-copy">
          <p class="trip-draft-status-label">${saved ? "Saved draft" : "Draft not saved"}</p>
          <p class="trip-draft-status-title">${saved ? escapeHtml(saved.title) : "Save this trip when it starts to feel useful"}</p>
          <p class="trip-draft-status-meta">${escapeHtml(meta)}</p>
          ${feedback}
        </div>
        <div class="trip-draft-status-actions">
          <button class="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white" data-action="save-current-draft" type="button" ${hasTrip ? "" : "disabled"}>
            Save draft
          </button>
          ${saved ? `
            <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="restore-saved-draft" type="button">
              Restore draft
            </button>
          ` : ""}
        </div>
      `;
    }

    function buildTripNextActions() {
      hydrateSavedDraftStatus();
      const days = hbState.currentTrip?.days || [];
      const hasGuideData = Boolean(getDestinationGuideEntry() || getDestinationGuideDetails());
      const saved = hbState.savedDraft;
      const hasStay = Boolean(hbState.appState.hotelName || hbState.appState.hotelArea);
      const hasFlightTiming = hbState.appState.flightMode !== "have-flights" || Boolean(hbState.appState.arrivalFlight || hbState.appState.departureFlight || hbState.appState.flightNumber);
      const logisticsReady = hasStay && hasFlightTiming;
      const firstGuideTarget = hasGuideData ? "trip-guide-depth" : "trip-days";
      const topBookingPick = getDestinationGuideDetails()
        ? joinGuideItems(uniqueGuidePlaces(
            getDestinationGuideDetails().bestDinner || [],
            getDestinationGuideDetails().bestFirstTimers || [],
            getDestinationGuideDetails().bestAttractions || []
          ).slice(0, 2), "your highest-priority stops")
        : (days[0]?.highlight || "your highest-priority stops");

      return [
        {
          icon: hasGuideData ? "menu_book" : "route",
          tone: "ready",
          label: hasGuideData ? "Guide logic" : "Trip flow",
          title: hasGuideData ? "See why this plan works" : "Review the day flow",
          copy: hasGuideData
            ? `Use the inline city-guide logic to see why routes, meals, and must-see stops were chosen.`
            : `Start with the day-by-day flow, then open any day that feels too full or too light.`,
          cta: hasGuideData ? "View guide logic" : "Review days",
          action: "jump-trip-anchor",
          targetId: firstGuideTarget,
          section: hasGuideData ? "guide" : ""
        },
        {
          icon: "event_available",
          tone: logisticsReady ? "ready" : "attention",
          label: logisticsReady ? "Ready to book" : "Needs details",
          title: logisticsReady ? "Confirm bookings around the plan" : "Add stay or travel details",
          copy: logisticsReady
            ? `Keep reservations and timing aligned around ${topBookingPick}, then leave room for small changes.`
            : `Add hotel area, hotel name, or flight timing so the first and last days stay realistic.`,
          cta: logisticsReady ? "Review logistics" : "Add logistics",
          action: "jump-trip-anchor",
          targetId: "trip-logistics-section",
          section: "logistics"
        },
        {
          icon: saved ? "bookmark_added" : "bookmark",
          tone: saved ? "ready" : "attention",
          label: saved ? "Draft saved" : "Keep progress",
          title: saved ? "Manage saved versions" : "Save this draft",
          copy: saved
            ? `Your working trip is saved. Use versions when you want to compare a calmer, cheaper, or more packed arrangement.`
            : `Save once the trip feels useful, then you can come back without starting over.`,
          cta: saved ? "Open versions" : "Save draft",
          action: saved ? "jump-trip-anchor" : "save-current-draft",
          targetId: saved ? "trip-versions-panel" : "",
          section: saved ? "versions" : ""
        }
      ];
    }

    function renderTripNextActions() {
      const wrap = document.getElementById("trip-next-actions");
      if (!wrap) return;

      const actions = buildTripNextActions();
      wrap.innerHTML = `
        <div class="trip-next-actions-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Next best steps</p>
            <h4 class="mt-1 font-display text-lg font-bold text-ink">Keep planning without getting stuck</h4>
            <p class="mt-2 max-w-[44rem] text-sm leading-6 text-muted">The itinerary is ready to review. These are the practical moves that usually matter next.</p>
          </div>
          <span class="self-start rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">Actionable</span>
        </div>
        <div class="trip-next-actions-grid">
          ${actions.map((item) => `
            <article class="trip-next-action-card ${item.tone === "attention" ? "is-attention" : "is-ready"}">
              <div>
                <div class="trip-next-action-head">
                  <span class="trip-next-action-icon material-symbols-outlined" aria-hidden="true">${escapeHtml(item.icon)}</span>
                  <div class="min-w-0">
                    <p class="trip-next-action-label">${escapeHtml(item.label)}</p>
                    <h5 class="trip-next-action-title">${escapeHtml(item.title)}</h5>
                  </div>
                </div>
                <p class="trip-next-action-copy">${escapeHtml(item.copy)}</p>
              </div>
              <button class="trip-next-action-button ${item.tone === "attention" ? "bg-primary text-white" : "bg-surface-soft text-secondary ring-1 ring-line"}" data-action="${escapeHtml(item.action)}" ${item.targetId ? `data-target-id="${escapeHtml(item.targetId)}"` : ""} ${item.section ? `data-section="${escapeHtml(item.section)}"` : ""} type="button">
                ${escapeHtml(item.cta)}
              </button>
            </article>
          `).join("")}
        </div>
      `;
    }

    function buildTripReadinessItems() {
      const readiness = getPlanningReadiness();
      const basicsReady = readiness.required.every((item) => item.ready);
      const preferences = readiness.optional.find((item) => item.id === "preferences");
      const guide = readiness.optional.find((item) => item.id === "guide");
      const logistics = readiness.optional.find((item) => item.id === "logistics");

      return [
        {
          title: "Trip basics",
          ready: basicsReady,
          copy: basicsReady
            ? `${getCityName()}, ${formatDate(hbState.appState.startDate)} to ${formatDate(hbState.appState.endDate)}, for ${buildTravelerText()}.`
            : "Add destination, dates, and travelers before trusting the plan."
        },
        {
          title: "Preference signal",
          ready: Boolean(preferences?.ready),
          copy: preferences?.ready
            ? `${preferences.readyCopy} ${hbState.appState.memory} is the main trip vibe.`
            : preferences?.missingCopy || "Pick style, pace, and trip vibe so the algorithm has a clear direction."
        },
        {
          title: "Destination logic",
          ready: Boolean(guide?.ready),
          copy: guide?.ready
            ? "Guide data is shaping the route, priorities, and booking notes."
            : guide?.missingCopy || "No city guide match yet, so the itinerary is using general planning logic."
        },
        {
          title: "Booking details",
          ready: Boolean(logistics?.ready),
          copy: logistics?.ready
            ? logistics.readyCopy
            : logistics?.missingCopy || "Add hotel area, hotel name, or flight timing before booking tightly."
        },
        {
          title: "Save point",
          ready: Boolean(hbState.savedDraft),
          copy: hbState.savedDraft
            ? `Saved as ${hbState.savedDraft.title}.`
            : "Save this draft once the direction feels close."
        }
      ];
    }

    function renderTripReadinessPanel() {
      const wrap = document.getElementById("trip-readiness-panel");
      if (!wrap) return;

      const items = buildTripReadinessItems();
      const readyCount = items.filter((item) => item.ready).length;
      wrap.innerHTML = `
        <div class="trip-readiness-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Trip readiness</p>
            <h4 class="mt-1 font-display text-lg font-bold text-ink">What is solid before you book</h4>
            <p class="mt-2 max-w-[44rem] text-sm leading-6 text-muted">A quick check of the planning signals that make this itinerary easier to trust.</p>
          </div>
          <span class="trip-readiness-score">${readyCount} of ${items.length} ready</span>
        </div>
        <div class="trip-readiness-list">
          ${items.map((item) => `
            <div class="trip-readiness-item ${item.ready ? "is-ready" : "is-attention"}">
              <p class="trip-readiness-status">
                <span class="material-symbols-outlined" aria-hidden="true">${item.ready ? "check_circle" : "error"}</span>
                <span>${item.ready ? "Ready" : "Check"}</span>
              </p>
              <p class="trip-readiness-title">${escapeHtml(item.title)}</p>
              <p class="trip-readiness-copy">${escapeHtml(item.copy)}</p>
            </div>
          `).join("")}
        </div>
      `;
    }

    function getTripHandoffAnchors() {
      const days = hbState.currentTrip?.days || [];
      const seen = new Set();
      return days.flatMap((day, index) => getDayProtectedAnchors(day, index, days.length))
        .filter((anchor) => {
          const key = anchor?.key || getPlanningAnchorKey(anchor?.label || "");
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        });
    }

    function buildTripHandoffItems() {
      hydrateSavedDraftStatus();
      const anchors = getTripHandoffAnchors();
      const foodAnchors = anchors.filter((anchor) => anchor.type === "food");
      const sightAnchors = anchors.filter((anchor) => anchor.type === "sight");
      const hasStay = Boolean(hbState.appState.hotelName || hbState.appState.hotelArea);
      const hasFlightTiming = hbState.appState.flightMode !== "have-flights"
        || Boolean(hbState.appState.arrivalFlight || hbState.appState.departureFlight || hbState.appState.flightNumber || hbState.appState.flightAirline);
      const flightReady = hbState.appState.flightMode === "not-needed" || hasFlightTiming;
      const bookingAnchorLabel = joinGuideItems(
        uniqueGuidePlaces(
          foodAnchors.map((anchor) => anchor.label),
          sightAnchors.map((anchor) => anchor.label),
          (hbState.currentTrip?.days || []).map((day) => day.highlight).filter(Boolean)
        ).slice(0, 2),
        "your protected stops"
      );

      return [
        {
          icon: "restaurant",
          status: foodAnchors.length ? "Ready to reserve" : "Review",
          ready: Boolean(foodAnchors.length),
          title: "Meal anchors",
          copy: foodAnchors.length
            ? `Prioritize ${joinGuideItems(foodAnchors.map((anchor) => anchor.label).slice(0, 2), "the meal that matters most")} before adding lower-priority food stops.`
            : "Review the daily plan for any meals that should become real reservations.",
          cta: "Review days",
          action: "jump-trip-anchor",
          targetId: "trip-days",
          section: ""
        },
        {
          icon: "confirmation_number",
          status: sightAnchors.length ? "Check timing" : "Review",
          ready: Boolean(sightAnchors.length),
          title: "Tickets and timed entries",
          copy: sightAnchors.length
            ? `Check timing for ${joinGuideItems(sightAnchors.map((anchor) => anchor.label).slice(0, 2), "your main sights")} so the day order stays realistic.`
            : `Use ${bookingAnchorLabel} as the first place to check for tickets or timed entry.`,
          cta: "Open itinerary",
          action: "jump-trip-anchor",
          targetId: "trip-days",
          section: ""
        },
        {
          icon: "bed",
          status: hasStay ? "Base added" : "Needs stay",
          ready: hasStay,
          title: "Stay fit",
          copy: hasStay
            ? `Your stay detail is in the plan, so routes can stay grounded around ${hbState.appState.hotelArea || hbState.appState.hotelName}.`
            : "Add a hotel name or area before treating the first and last day as final.",
          cta: hasStay ? "Review stay" : "Add stay",
          action: "jump-trip-anchor",
          targetId: "trip-stay-section",
          section: "stay"
        },
        {
          icon: "flight",
          status: flightReady ? "Travel timing ok" : "Needs timing",
          ready: flightReady,
          title: "Flights and arrival windows",
          copy: flightReady
            ? (hbState.appState.flightMode === "not-needed"
                ? "This plan is destination-first because flights are not needed for this draft."
                : "Arrival and departure timing are enough to keep travel days believable.")
            : "Add flight number, airline, arrival, or departure timing before booking tight first-day plans.",
          cta: flightReady ? "Review flights" : "Add flights",
          action: "jump-trip-anchor",
          targetId: "trip-flights-section",
          section: "flights"
        },
        {
          icon: hbState.savedDraft ? "bookmark_added" : "bookmark",
          status: hbState.savedDraft ? "Saved" : "Unsaved",
          ready: Boolean(hbState.savedDraft),
          title: "Save the working version",
          copy: hbState.savedDraft
            ? `Saved as ${hbState.savedDraft.title}. Save a named version when edits start branching.`
            : "Save the draft before making bigger changes, so the useful version does not get lost.",
          cta: hbState.savedDraft ? "Open versions" : "Save draft",
          action: hbState.savedDraft ? "jump-trip-anchor" : "save-current-draft",
          targetId: hbState.savedDraft ? "trip-versions-panel" : "",
          section: hbState.savedDraft ? "versions" : ""
        }
      ];
    }

    function renderTripHandoffPanel() {
      const wrap = document.getElementById("trip-handoff-panel");
      if (!wrap) return;
      const items = buildTripHandoffItems();
      const readyCount = items.filter((item) => item.ready).length;

      wrap.innerHTML = `
        <div class="trip-handoff-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Booking handoff</p>
            <h4 class="mt-1 font-display text-lg font-bold text-ink">Turn this itinerary into a real trip</h4>
            <p class="mt-2 max-w-[44rem] text-sm leading-6 text-muted">Use this as the final practical pass before reservations, tickets, and saved versions.</p>
          </div>
          <span class="trip-handoff-score">${readyCount} of ${items.length} handled</span>
        </div>
        <div class="trip-handoff-list">
          ${items.map((item) => `
            <article class="trip-handoff-item ${item.ready ? "is-ready" : "is-attention"}">
              <div class="trip-handoff-item-main">
                <span class="material-symbols-outlined trip-handoff-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
                <div>
                  <p class="trip-handoff-status">${escapeHtml(item.status)}</p>
                  <h5 class="trip-handoff-title">${escapeHtml(item.title)}</h5>
                  <p class="trip-handoff-copy">${escapeHtml(item.copy)}</p>
                </div>
              </div>
              <button class="trip-handoff-button ${item.ready ? "bg-white text-secondary ring-1 ring-line" : "bg-primary text-white"}" data-action="${escapeHtml(item.action)}" ${item.targetId ? `data-target-id="${escapeHtml(item.targetId)}"` : ""} ${item.section ? `data-section="${escapeHtml(item.section)}"` : ""} type="button">
                ${escapeHtml(item.cta)}
              </button>
            </article>
          `).join("")}
        </div>
      `;
    }

    function renderTripDayOverview() {
      const overview = document.getElementById("trip-day-overview");
      if (!overview) return;
      const days = hbState.currentTrip?.days || [];
      if (!days.length) {
        overview.innerHTML = "";
        return;
      }

      overview.innerHTML = `
        <div class="trip-day-overview-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Trip flow</p>
            <h4 class="mt-1 font-display text-lg font-bold">The plan at a glance</h4>
          </div>
          <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">${days.length} days</span>
        </div>
        <div class="trip-day-overview-list">
          ${days.map((day) => `
            <button class="trip-day-overview-item text-left" data-action="focus-trip-map" data-day-id="${escapeHtml(day.id)}" type="button">
              <p class="trip-day-overview-day">${escapeHtml(day.dayLabel)}</p>
              <p class="trip-day-overview-title">${escapeHtml(day.area)}</p>
              <p class="trip-day-overview-meta">${escapeHtml(day.highlight || day.title)}</p>
            </button>
          `).join("")}
        </div>
      `;
    }

    function buildDayMovementDiff(currentDraft, compareDraft) {
      if (!currentDraft?.days?.length || !compareDraft?.days?.length) return [];

      const compareIndexById = new Map(compareDraft.days.map((day, index) => [day.id, index]));
      return currentDraft.days.map((day, index) => {
        const compareIndex = compareIndexById.get(day.id);
        const compareDay = typeof compareIndex === "number" ? compareDraft.days[compareIndex] : null;
        const moved = typeof compareIndex === "number" ? compareIndex !== index : true;
        return {
          id: day.id,
          currentIndex: index,
          compareIndex,
          movementDelta: typeof compareIndex === "number" ? compareIndex - index : null,
          moved,
          currentLabel: day.dayLabel,
          currentArea: day.area,
          compareLabel: compareDay?.dayLabel || "Not found",
          compareArea: compareDay?.area || "Not found"
        };
      });
    }

    function getTimelineStepVisual(step) {
      const text = `${step?.title || ""} ${step?.copy || ""}`.toLowerCase();

      if (/arrival|hotel|check-?in|flight|land/.test(text)) {
        return { icon: "luggage", label: "Arrival", accent: "bg-warm text-primary" };
      }
      if (/breakfast|bakery|coffee|cafe/.test(text)) {
        return { icon: "local_cafe", label: "Coffee", accent: "bg-blue-soft text-secondary" };
      }
      if (/lunch|dinner|restaurant|meal|tapas|cocktail|bar|food/.test(text)) {
        return { icon: "restaurant", label: "Meal", accent: "bg-warm text-primary" };
      }
      if (/museum|gallery|palace|cathedral|temple|tower|bridge|landmark|sight/.test(text)) {
        return { icon: "museum", label: "Landmark", accent: "bg-teal-soft text-tertiary" };
      }
      if (/walk|stroll|view|viewpoint|park|beach|river|sunset|scenic|overlook/.test(text)) {
        return { icon: "landscape", label: "Scenic", accent: "bg-blue-soft text-secondary" };
      }
      return { icon: "place", label: "Stop", accent: "bg-surface-soft text-secondary" };
    }

    function buildDayConfidenceSignals(day) {
      const signals = [];
      const stopCount = day.item?.timeline?.length || 0;
      const text = `${day.title || ""} ${day.rationale || ""} ${day.item?.body || ""} ${day.weather || ""}`.toLowerCase();

      signals.push(stopCount > 4 ? "Fuller day" : "Easy route");
      signals.push(day.pace === "Packed" ? "More movement" : "Room to breathe");

      if (/dinner|reservation|restaurant|meal|lunch|food|bakery|market/.test(text)) {
        signals.push("Meal timing matters");
      } else if (/museum|gallery|tower|palace|temple|cathedral|ticket/.test(text)) {
        signals.push("Ticket timing helps");
      } else if (/walk|stroll|view|park|beach|river|overlook/.test(text)) {
        signals.push("Good walking day");
      } else {
        signals.push("Flexible anchor");
      }

      return Array.from(new Set(signals)).slice(0, 3);
    }

    function getMovementSummary(item) {
      if (typeof item.compareIndex !== "number") {
        return "New in this version";
      }
      if (!item.moved) {
        return `Stayed at position ${item.currentIndex + 1}`;
      }
      return `Position ${item.compareIndex + 1} -> ${item.currentIndex + 1}`;
    }

    function getActiveTripLabel() {
      return hbState.activeTripSource?.type === "saved"
        ? hbState.activeTripSource.name || "Saved arrangement"
        : "Live draft";
    }

    function buildSuggestedVersionNames() {
      const city = getCityName();
      const leadArea = hbState.currentTrip?.days?.[0]?.area || city;
      const paceWord = (hbState.appState.pace || "Balanced").toLowerCase();
      const memoryWord = (hbState.appState.memory || "Iconic").replace(/ memory| moment/gi, "").trim();
      const changes = getTripChangeItems(hbState.currentTrip);
      if (changes.length) {
        const madeLighter = changes.some((item) => item.feedback === "too-full");
        const addedDepth = changes.some((item) => item.feedback === "too-light");
        const adjustedArea = changes.some((item) => item.feedback === "wrong-area");
        const specificName = madeLighter
          ? `Less packed ${city} version`
          : addedDepth
            ? `Richer ${city} version`
            : adjustedArea
              ? `Better-routed ${city} version`
              : `Keeper ${city} version`;
        return [
          `${city} adjusted draft`,
          specificName,
          `${memoryWord} saved edit`
        ];
      }
      return [
        `More relaxed ${city} version`,
        `${titleCase(paceWord)} ${city} edit`,
        `${memoryWord} ${leadArea} plan`
      ];
    }

    function getDefaultAlternateVersionName() {
      const city = getCityName();
      const count = hbState.alternateTrips.length + 1;
      return `${city} version ${count}`;
    }

    function getUniqueAlternateVersionName(name) {
      const existing = new Set(hbState.alternateTrips.map((item) => item.name.toLowerCase()));
      if (!existing.has(name.toLowerCase())) return name;
      let suffix = 2;
      let candidate = `${name} ${suffix}`;
      while (existing.has(candidate.toLowerCase())) {
        suffix += 1;
        candidate = `${name} ${suffix}`;
      }
      return candidate;
    }

    function markUnsavedArrangement(message) {
      hbState.unsavedArrangement = {
        dirty: true,
        message
      };
    }

    function clearUnsavedArrangement() {
      hbState.unsavedArrangement = {
        dirty: false,
        message: ""
      };
    }

    function clearAlternateVersionFeedback() {
      if (hbState.alternateVersionFeedbackTimeout) {
        clearTimeout(hbState.alternateVersionFeedbackTimeout);
        hbState.alternateVersionFeedbackTimeout = null;
      }
      hbState.alternateVersionFeedbackDeadline = 0;
      hbState.alternateVersionFeedbackRemaining = 0;
      hbState.alternateVersionFeedback = {
        id: "",
        name: "",
        savedAt: "",
        fromUnsavedEdits: false,
        unsavedMessage: ""
      };
    }

    function beginAlternateVersionFeedbackDismiss(delayMs) {
      if (hbState.alternateVersionFeedbackTimeout) {
        clearTimeout(hbState.alternateVersionFeedbackTimeout);
      }

      hbState.alternateVersionFeedbackRemaining = delayMs;
      hbState.alternateVersionFeedbackDeadline = Date.now() + delayMs;
      hbState.alternateVersionFeedbackTimeout = window.setTimeout(() => {
        const feedbackNode = document.getElementById("alternate-version-feedback");
        if (feedbackNode) {
          feedbackNode.classList.add("is-dismissing");
        }

        window.setTimeout(() => {
          clearAlternateVersionFeedback();
          if (hbState.activePanelId === "trip-panel") {
            renderTrip();
          } else if (hbState.activePanelId === "saved-panel") {
            renderSavedPanel();
          }
        }, 220);
      }, delayMs);
    }

    function scheduleAlternateVersionFeedbackDismiss() {
      beginAlternateVersionFeedbackDismiss(3200);
    }

    function pauseAlternateVersionFeedbackDismiss() {
      if (!hbState.alternateVersionFeedback?.id || !hbState.alternateVersionFeedbackTimeout) return;
      clearTimeout(hbState.alternateVersionFeedbackTimeout);
      hbState.alternateVersionFeedbackTimeout = null;
      hbState.alternateVersionFeedbackRemaining = Math.max(0, hbState.alternateVersionFeedbackDeadline - Date.now());
    }

    function resumeAlternateVersionFeedbackDismiss() {
      if (!hbState.alternateVersionFeedback?.id || hbState.alternateVersionFeedbackTimeout) return;
      const remaining = hbState.alternateVersionFeedbackRemaining || 0;
      if (remaining <= 0) return;
      beginAlternateVersionFeedbackDismiss(remaining);
    }

    function saveAlternateVersion(name) {
      if (!hbState.currentTrip) return;
      const baseName = (name || "").trim() || getDefaultAlternateVersionName();
      const trimmedName = getUniqueAlternateVersionName(baseName);
      const unsavedArrangementSnapshot = { ...(hbState.unsavedArrangement || { dirty: false, message: "" }) };
      const snapshot = cloneData(hbState.currentTrip);
      const changes = getTripChangeItems(snapshot);
      const savedVersion = {
        id: createVersionId(),
        name: trimmedName,
        savedAt: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
        trip: snapshot,
        changes,
        changeCount: changes.length,
        changeSummary: getTripChangeSummary(snapshot, "")
      };
      hbState.alternateTrips.unshift(savedVersion);
      hbState.alternateVersionFeedback = {
        id: savedVersion.id,
        name: savedVersion.name,
        savedAt: savedVersion.savedAt,
        fromUnsavedEdits: Boolean(unsavedArrangementSnapshot.dirty),
        unsavedMessage: unsavedArrangementSnapshot.message || ""
      };
      if (hbRefs.formBindings.alternateVersionName) {
        hbRefs.formBindings.alternateVersionName.value = "";
      }
      clearUnsavedArrangement();
      renderTrip();
      renderSavedPanel();
      scheduleAlternateVersionFeedbackDismiss();
      window.requestAnimationFrame(() => {
        const feedbackNode = document.getElementById("alternate-version-feedback");
        const versionsNode = document.getElementById("alternate-versions-list");
        const target = feedbackNode && !feedbackNode.classList.contains("hidden") ? feedbackNode : versionsNode;
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    function ensureLiveDraftSnapshot() {
      if (!hbState.currentTrip) return;
      if (hbState.activeTripSource?.type === "saved") return;
      hbState.liveDraftTrip = cloneData(hbState.currentTrip);
      hbState.activeTripSource = {
        type: "live",
        versionId: "",
        name: ""
      };
    }

    function restoreAlternateVersion(versionId) {
      const version = hbState.alternateTrips.find((item) => item.id === versionId);
      if (!version) return;
      ensureLiveDraftSnapshot();
      hbState.currentTrip = cloneData(version.trip);
      hbState.compareVersionId = "";
      hbState.activeTripSource = {
        type: "saved",
        versionId: version.id,
        name: version.name
      };
      clearUnsavedArrangement();
      renderTrip();
      renderSavedPanel();
    }

    function restoreLiveDraft() {
      if (!hbState.liveDraftTrip) return;
      hbState.currentTrip = cloneData(hbState.liveDraftTrip);
      hbState.compareVersionId = "";
      hbState.activeTripSource = {
        type: "live",
        versionId: "",
        name: ""
      };
      renderTrip();
      renderSavedPanel();
    }

    function compareAlternateVersion(versionId, options = {}) {
      const { preferLiveDraft = false } = options;
      const version = hbState.alternateTrips.find((item) => item.id === versionId);
      if (!version) return;

      if (preferLiveDraft && hbState.liveDraftTrip) {
        hbState.currentTrip = cloneData(hbState.liveDraftTrip);
        hbState.activeTripSource = {
          type: "live",
          versionId: "",
          name: ""
        };
      }

      hbState.compareVersionId = version.id;
      renderTrip();
      renderSavedPanel();
    }

    function buildGoogleMapEmbedUrl(query) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    }

    function buildGoogleHotelsUrl(city, area = "") {
      const query = area ? `${area}, ${city} hotels` : `${city} hotels`;
      return `https://www.google.com/travel/hotels/${encodeURIComponent(city)}?q=${encodeURIComponent(query)}`;
    }

    function buildGoogleFlightsUrl() {
      const destination = hbState.appState.destination || "Paris, France";
      const queryParts = [`Flights to ${destination}`];
      if (hbState.appState.startDate && hbState.appState.endDate) {
        queryParts.push(`${hbState.appState.startDate} to ${hbState.appState.endDate}`);
      }
      return `https://www.google.com/travel/flights?q=${encodeURIComponent(queryParts.join(" "))}`;
    }

    function buildGoogleSearchUrl(query) {
      return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    function buildGoogleMapsSearchUrl(query) {
      return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
    }

    function getBookingItemState(itemId) {
      return hbState.bookingItems?.[itemId] || {
        status: "not-started",
        note: "",
        savedAt: ""
      };
    }

    function getBookingStatusLabel(status) {
      const labels = {
        "not-started": "Not started",
        searching: "Searching",
        booked: "Booked",
        skipped: "Skipped"
      };
      return labels[status] || "Not started";
    }

    function getBookingStatusTone(status) {
      if (status === "booked") return "is-booked";
      if (status === "searching") return "is-searching";
      if (status === "skipped") return "is-skipped";
      return "is-open";
    }

    function getBookingStatusOptions(selectedStatus) {
      const statuses = [
        ["not-started", "Not started"],
        ["searching", "Searching"],
        ["booked", "Booked"],
        ["skipped", "Skipped"]
      ];
      return statuses.map(([value, label]) => `
        <option value="${value}" ${selectedStatus === value ? "selected" : ""}>${label}</option>
      `).join("");
    }

    function hydrateBookingItems() {
      try {
        const raw = window.localStorage.getItem(BOOKING_STORAGE_KEY);
        if (!raw) return;
        const payload = JSON.parse(raw);
        if (!payload || typeof payload !== "object") return;
        hbState.bookingItems = payload.items && typeof payload.items === "object" ? payload.items : {};
      } catch (error) {
        hbState.bookingItems = {};
      }
    }

    function persistBookingItems(options = {}) {
      const { feedback = "Booking progress saved" } = options;
      try {
        window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify({
          savedAt: formatDraftSavedAt(),
          destination: hbState.appState.destination,
          items: cloneData(hbState.bookingItems || {})
        }));
        hbState.bookingSaveFeedback = feedback;
        window.setTimeout(() => {
          if (hbState.bookingSaveFeedback !== feedback) return;
          hbState.bookingSaveFeedback = "";
          if (hbState.activePanelId === "trip-panel") renderTrip();
          if (hbState.activePanelId === "saved-panel") renderSavedPanel();
        }, 2400);
        return true;
      } catch (error) {
        hbState.bookingSaveFeedback = "Unable to save booking progress on this browser";
        return false;
      }
    }

    function updateBookingItemStatus(itemId, status) {
      if (!itemId) return;
      hbState.bookingItems = hbState.bookingItems || {};
      hbState.bookingItems[itemId] = {
        ...getBookingItemState(itemId),
        status: status || "not-started",
        savedAt: formatDraftSavedAt()
      };
      persistBookingItems({ feedback: "Booking status saved" });
      renderTrip();
      renderSavedPanel();
    }

    function updateBookingItemNote(itemId, note, options = {}) {
      if (!itemId) return;
      const { render = true, feedback = "Booking note saved" } = options;
      hbState.bookingItems = hbState.bookingItems || {};
      hbState.bookingItems[itemId] = {
        ...getBookingItemState(itemId),
        note: String(note || "").trim(),
        savedAt: formatDraftSavedAt()
      };
      persistBookingItems({ feedback });
      if (!render) return;
      renderTrip();
      renderSavedPanel();
    }

    function getBookingItemId(type, label) {
      return `${type}-${getPlanningAnchorKey(label || type) || "item"}`;
    }

    function buildBookingHubItems() {
      const savedPayload = hbState.currentTrip ? null : getStoredTripDraft();
      const bookingTrip = hbState.currentTrip || savedPayload?.currentTrip || savedPayload?.liveDraftTrip || null;
      const city = getCityName();
      const destination = hbState.appState.destination || city;
      const anchors = getTripHandoffAnchors();
      const foodAnchors = anchors.filter((anchor) => anchor.type === "food").slice(0, 3);
      const sightAnchors = anchors.filter((anchor) => anchor.type === "sight").slice(0, 3);
      const hotelArea = hbState.appState.hotelArea || bookingTrip?.days?.[0]?.area || city;
      const travelerText = buildTravelerText();
      const dateText = hbState.appState.startDate && hbState.appState.endDate
        ? `${formatDate(hbState.appState.startDate)} to ${formatDate(hbState.appState.endDate)}`
        : "Dates not set";
      const items = [
        {
          id: "flight-search",
          type: "flight",
          icon: "flight",
          label: "Flights",
          title: hbState.appState.flightMode === "have-flights" ? "Review saved flight details" : `Search flights to ${city}`,
          copy: hbState.appState.flightMode === "not-needed"
            ? "Flights are marked as not needed for this trip."
            : `${dateText} for ${travelerText}. Use Google Flights as a free handoff, then save the booking details here.`,
          priority: hbState.appState.flightMode === "not-needed" ? "Optional" : "Book first",
          href: buildGoogleFlightsUrl(),
          cta: "Open Google Flights"
        },
        {
          id: "hotel-search",
          type: "hotel",
          icon: "bed",
          label: "Hotel",
          title: hbState.appState.hotelName || `Search stays near ${hotelArea}`,
          copy: hbState.appState.hotelName
            ? `${hbState.appState.hotelName}${hbState.appState.hotelArea ? ` in ${hbState.appState.hotelArea}` : ""}. Save confirmation notes here once booked.`
            : `Use the recommended stay area to search free hotel results for ${destination}.`,
          priority: "Book first",
          href: buildGoogleHotelsUrl(city, hotelArea),
          cta: "Open Google Hotels"
        }
      ];

      foodAnchors.forEach((anchor, index) => {
        items.push({
          id: getBookingItemId("meal", anchor.label),
          type: "meal",
          icon: "restaurant",
          label: "Meal",
          title: anchor.label,
          copy: `Search reservations or official restaurant pages before this protected meal gets squeezed by other plans.`,
          priority: index === 0 ? "Book first" : "Can wait",
          href: buildGoogleSearchUrl(`${anchor.label} ${destination} reservation`),
          cta: "Search reservations"
        });
      });

      sightAnchors.forEach((anchor, index) => {
        items.push({
          id: getBookingItemId("ticket", anchor.label),
          type: "ticket",
          icon: "confirmation_number",
          label: "Ticket",
          title: anchor.label,
          copy: `Check official tickets, timed entry, or opening hours so this must-have stays realistic.`,
          priority: index === 0 ? "Check timing" : "Can wait",
          href: buildGoogleSearchUrl(`${anchor.label} ${destination} official tickets opening hours`),
          cta: "Search tickets"
        });
      });

      (bookingTrip?.days || []).slice(0, 3).forEach((day) => {
        items.push({
          id: getBookingItemId("map", day.area),
          type: "map",
          icon: "map",
          label: "Map",
          title: `${day.dayLabel}: ${day.area}`,
          copy: `Open the day area in Maps before booking anything that depends on location or travel time.`,
          priority: "Plan route",
          href: buildGoogleMapsSearchUrl(`${day.area}, ${destination}`),
          cta: "Open map"
        });
      });

      return items.slice(0, 10);
    }

    function getBookingHubSummary(items = buildBookingHubItems()) {
      const states = items.map((item) => getBookingItemState(item.id));
      const booked = states.filter((state) => state.status === "booked").length;
      const searching = states.filter((state) => state.status === "searching").length;
      const skipped = states.filter((state) => state.status === "skipped").length;
      return {
        total: items.length,
        booked,
        searching,
        skipped,
        open: Math.max(0, items.length - booked - searching - skipped)
      };
    }

    function renderBookingHub() {
      const wrap = document.getElementById("trip-booking-hub");
      if (!wrap) return;
      hydrateBookingItems();
      const items = buildBookingHubItems();
      const summary = getBookingHubSummary(items);
      const feedback = hbState.bookingSaveFeedback ? `<p class="booking-hub-feedback">${escapeHtml(hbState.bookingSaveFeedback)}</p>` : "";

      wrap.innerHTML = `
        <div class="trip-collapsible-head booking-hub-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Free booking hub</p>
            <h4 class="mt-1 font-display text-lg font-bold text-ink">Book with free links, track progress here</h4>
            <p class="trip-collapsible-summary mt-2 text-sm leading-6 text-muted">No paid API access needed. Open public search links, then save booking status and confirmation notes with this trip.</p>
            ${feedback}
          </div>
          <div class="trip-collapsible-actions">
            <span class="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-tertiary">${summary.booked} booked</span>
            <button class="trip-section-toggle" data-action="toggle-trip-section" data-section="booking" aria-expanded="false" type="button">
              <span>Show</span>
              <span class="material-symbols-outlined" aria-hidden="true">add</span>
            </button>
          </div>
        </div>
        <div data-trip-section-body hidden>
          <div class="booking-hub-summary">
            <div>
              <p class="booking-hub-summary-label">Progress</p>
              <p class="booking-hub-summary-value">${summary.booked} of ${summary.total} booked</p>
            </div>
            <div>
              <p class="booking-hub-summary-label">Currently searching</p>
              <p class="booking-hub-summary-value">${summary.searching}</p>
            </div>
            <div>
              <p class="booking-hub-summary-label">Still open</p>
              <p class="booking-hub-summary-value">${summary.open}</p>
            </div>
          </div>
          <div class="booking-hub-list">
            ${items.map((item) => {
              const state = getBookingItemState(item.id);
              const tone = getBookingStatusTone(state.status);
              return `
                <article class="booking-hub-item ${tone}">
                  <div class="booking-hub-item-main">
                    <span class="material-symbols-outlined booking-hub-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
                    <div class="booking-hub-copy">
                      <div class="booking-hub-row">
                        <p class="booking-hub-label">${escapeHtml(item.label)} - ${escapeHtml(item.priority)}</p>
                        <span class="booking-hub-status">${escapeHtml(getBookingStatusLabel(state.status))}</span>
                      </div>
                      <h5 class="booking-hub-title">${escapeHtml(item.title)}</h5>
                      <p class="booking-hub-detail">${escapeHtml(item.copy)}</p>
                    </div>
                  </div>
                  <div class="booking-hub-controls">
                    <a class="booking-hub-link" href="${escapeHtml(item.href)}" rel="noopener noreferrer" target="_blank">${escapeHtml(item.cta)}</a>
                    <label class="booking-hub-select-label">
                      <span>Status</span>
                      <select class="booking-hub-select" data-action="update-booking-status" data-booking-id="${escapeHtml(item.id)}">
                        ${getBookingStatusOptions(state.status)}
                      </select>
                    </label>
                    <label class="booking-hub-note-label">
                      <span>Confirmation or note</span>
                      <input class="booking-hub-note" data-action="update-booking-note" data-booking-id="${escapeHtml(item.id)}" type="text" value="${escapeHtml(state.note || "")}" placeholder="Example: confirmation #, time, booked site" />
                    </label>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    function renderExploreMap(selectedArea = "") {
      const city = getCityName();
      const areas = getAreaSet(city).slice(0, 3);
      const activeArea = selectedArea || hbState.currentExploreMapQuery || areas[0] || city;
      hbState.currentExploreMapQuery = activeArea;
      hbUtils.renderCountryGuide("explore");
      hbUtils.renderDestinationHero("build");

      const chips = document.getElementById("explore-map-chips");
      const frame = document.getElementById("explore-map-frame");
      if (!chips || !frame) return;

      chips.innerHTML = areas.map((area) => `
        <button class="rounded-full px-4 py-2 text-sm font-semibold ring-1 ${area === activeArea ? "bg-secondary text-white ring-secondary" : "bg-white text-secondary ring-line"}" data-action="focus-explore-map" data-area="${area}" type="button">
          ${area}
        </button>
      `).join("");

      frame.src = buildGoogleMapEmbedUrl(`${activeArea}, ${hbState.appState.destination}`);
    }

    function renderTripMap(selectedDayId = "", selectedStepIndex = null) {
      const frame = document.getElementById("trip-map-frame");
      const dayTabs = document.getElementById("trip-map-days");
      const focusLabel = document.getElementById("trip-map-focus-label");
      const mapShell = document.getElementById("trip-map-shell");
      const routeTitle = document.getElementById("trip-map-route-title");
      const routeCopy = document.getElementById("trip-map-route-copy");
      const routeMeta = document.getElementById("trip-map-route-meta");
      const routeActions = document.getElementById("trip-map-route-actions");
      const mapStatusText = document.getElementById("trip-map-status-text");
      if (!frame || !dayTabs) return;

      const days = hbState.currentTrip?.days || [];
      if (!days.length) {
        frame.src = buildGoogleMapEmbedUrl(hbState.appState.destination);
        dayTabs.innerHTML = "";
        return;
      }

      const activeDay = days.find((day) => day.id === selectedDayId)
        || days.find((day) => day.id === hbState.currentTripMapQuery)
        || days[0];

      hbState.currentTripMapQuery = activeDay.id;
      if (selectedStepIndex !== null) {
        hbState.currentTripMapStepIndex = Number(selectedStepIndex);
      } else if (selectedDayId) {
        hbState.currentTripMapStepIndex = null;
      } else {
        hbState.currentTripMapStepIndex = null;
      }

      const activeStep = typeof hbState.currentTripMapStepIndex === "number" ? activeDay.item?.timeline?.[hbState.currentTripMapStepIndex] : null;
      const activeStepVisual = activeStep ? getTimelineStepVisual(activeStep) : null;

      dayTabs.innerHTML = days.map((day) => {
        const isActiveDay = day.id === activeDay.id;
        const scopeText = isActiveDay ? (activeStep ? "Step focus" : "Day view") : "Tap to focus";
        const scopeAccent = isActiveDay
          ? (activeStep ? "is-step-focus" : "is-day-focus")
          : "is-idle";

        return `
          <button class="trip-map-chip ${isActiveDay ? "is-active" : "is-idle"}" data-action="focus-trip-map" data-day-id="${day.id}" type="button">
            <span class="trip-map-chip-day">${day.dayLabel}</span>
            <span class="trip-map-chip-area">${day.area}</span>
            <span class="trip-map-chip-scope ${scopeAccent}">${scopeText}</span>
          </button>
        `;
      }).join("");

      document.querySelectorAll(".trip-day-card").forEach((card) => {
        const isActive = card.dataset.dayId === activeDay.id;
        card.classList.toggle("is-map-active", isActive);
        card.setAttribute("aria-current", isActive ? "true" : "false");
      });

      const query = activeStep
        ? `${activeStep.title}, ${activeDay.area}, ${hbState.appState.destination}`
        : `${activeDay.area}, ${hbState.appState.destination}`;

      if (mapShell) {
        mapShell.classList.add("is-trip-map-active");
        mapShell.classList.toggle("is-step-focus", Boolean(activeStep));
        mapShell.classList.toggle("is-day-focus", !activeStep);
        mapShell.classList.add("is-updating");
      }

      if (mapStatusText) {
        mapStatusText.textContent = activeStep ? "Step focus" : "Day focus";
      }

      if (routeTitle) {
        routeTitle.textContent = activeStep
          ? `${activeDay.dayLabel} • ${activeStep.title}`
          : `${activeDay.dayLabel} • ${activeDay.area}`;
      }

      if (routeCopy) {
        routeCopy.textContent = activeStep
          ? `The map is narrowed to this exact stop in ${activeDay.area}, using the same focus state as the selected step and open day card.`
          : `The map is centered on ${activeDay.area}, matching the same selected-day focus state as the chip and open card.`;
      }

      if (routeMeta) {
        routeMeta.innerHTML = activeStep
          ? `
              <span class="trip-map-route-chip is-active">${activeStep.time}</span>
              <span class="trip-map-route-chip is-active">${activeStepVisual?.label || "Trip stop"}</span>
              <span class="trip-map-route-chip">${activeDay.area}</span>
            `
          : `
              <span class="trip-map-route-chip is-active">${activeDay.dayLabel}</span>
              <span class="trip-map-route-chip">${activeDay.area}</span>
              <span class="trip-map-route-chip">${activeDay.timeShape}</span>
            `;
      }

      if (routeActions) {
        routeActions.innerHTML = activeStep
          ? `<button class="trip-map-reset-button" data-action="reset-trip-map-step" data-day-id="${activeDay.id}" type="button">Back to day view</button>`
          : "";
      }

      if (focusLabel) {
        focusLabel.innerHTML = activeStep
          ? `<span class="font-semibold text-ink">${activeDay.dayLabel}</span> is centered in <span class="font-semibold text-ink">${activeDay.area}</span>, with the map narrowed to <span class="font-semibold text-ink">${activeStep.title}</span> at <span class="font-semibold text-ink">${activeStep.time}</span>.`
          : `<span class="font-semibold text-ink">${activeDay.dayLabel}</span> is centered in <span class="font-semibold text-ink">${activeDay.area}</span>. Open a timeline step below if you want the map to zoom into a more exact stop.`;
      }

      const nextSrc = buildGoogleMapEmbedUrl(query);
      const finishMapUpdate = () => {
        if (!mapShell) return;
        mapShell.classList.remove("is-updating");
      };

      if (!frame.dataset.hbMapBound) {
        frame.addEventListener("load", finishMapUpdate);
        frame.dataset.hbMapBound = "true";
      }

      if (frame.src === nextSrc) {
        window.setTimeout(finishMapUpdate, 220);
      } else {
        frame.src = nextSrc;
        window.setTimeout(finishMapUpdate, 900);
      }
    }

    function applyTripQualityToDay(day, index, totalDays, city) {
      const profile = getTripQualityProfile(city);
      if (!day?.item || profile.key === "balanced") return day;

      const next = cloneData(day);
      const dayContext = index === 0
        ? "Start this trip with the specific traveler needs visible."
        : index === totalDays - 1
          ? "Keep the close practical so the trip ends cleanly."
          : "Use this day to make the trip feel tailored, not templated.";
      const labelPattern = new RegExp(profile.dayLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

      next.item.label = profile.dayLabel;
      if (!labelPattern.test(next.item.fit || "")) {
        next.item.fit = `${next.item.fit} ${profile.dayLabel}: ${profile.dayNote}`;
      }

      if (index === 0) {
        next.rationale = `${next.rationale} ${dayContext}`;
      }

      if (profile.key === "budget" && index === 1) {
        next.item.body = `${next.item.body} Choose the free or low-cost version first, then spend only where the stop meaningfully improves the day.`;
      }

      if ((profile.key === "luxury" || profile.key === "luxury-honeymoon") && (index === 3 || index === totalDays - 1)) {
        next.item.body = `${next.item.body} Keep the afternoon cleaner around the premium reservation or private-feeling moment so it does not feel rushed.`;
      }

      if ((profile.key === "family" || profile.key === "family-beach") && index === 1) {
        next.timeShape = next.timeShape.includes("reset") ? next.timeShape : `${next.timeShape} + easy reset`;
        next.item.body = `${next.item.body} Keep one backup stop or return-to-hotel window nearby so the day still works if energy drops.`;
      }

      if (profile.key === "pet-friendly") {
        next.weather = `${next.weather} Confirm pet rules, outdoor seating, and a short route back to the stay before locking the day.`;
      }

      if (profile.key === "road-trip") {
        next.weather = `${next.weather} Treat parking, drive time, and the next departure as part of the plan.`;
      }

      if (profile.key === "beach" || profile.key === "family-beach") {
        next.weather = `${next.weather} Keep a weather backup and protect the best beach window rather than filling every hour.`;
      }

      if (profile.key === "solo") {
        next.item.body = `${next.item.body} Keep the main stop clear, then let the open stretch flex around what feels good once you are there.`;
      }

      if (profile.key === "romantic") {
        next.item.body = `${next.item.body} Leave enough time before the evening anchor so the day can feel atmospheric instead of rushed.`;
      }

      return next;
    }

    function buildDayData() {
      const city = getCityName();
      const days = getTripLength();
      const areas = getAreaSet(city);
      const dayHighlights = getDayHighlights(city, areas);
      const dayNotes = getDayNotes(city, areas);
      const timelineTemplates = getTimelineTemplates(city, areas);
      const concreteTemplates = getConcreteTripTemplates(city, areas);
      const vibeContent = getVibeContent(city, areas);

      const dayTemplates = [
        {
          title: `First day in ${areas[0]}`,
          rationale: `This day starts in one strong part of the city so the trip feels underway early without becoming too packed too soon.`,
          highlight: dayHighlights[0],
          timeShape: "Light and flexible",
          weather: dayNotes[0],
          itemTitle: `Morning start + neighborhood stroll`,
          itemBody: `Start the day close to one of the city's best areas, with a clear first stop, a good meal, and an easy walk that gets the trip moving early.`,
          fit: `It gives day one real momentum without making the whole trip feel rushed from the start.`
        },
        {
          title: vibeContent.dayTwoTitle,
          rationale: vibeContent.dayTwoRationale,
          highlight: dayHighlights[1],
          timeShape: vibeContent.dayTwoTimeShape,
          weather: dayNotes[1],
          itemTitle: vibeContent.dayTwoItemTitle,
          itemBody: vibeContent.dayTwoItemBody,
          fit: vibeContent.dayTwoFit
        },
        {
          title: `Essentials day in ${areas[2]}`,
          rationale: `This is where we keep the obvious city-essential visible while still giving you room to enjoy it instead of rushing through it.`,
          highlight: dayHighlights[2],
          timeShape: "Balanced with time for meals",
          weather: dayNotes[2],
          itemTitle: `Signature sight + slower follow-through`,
          itemBody: `Put the main sight in the middle of the plan, then let the rest of the day stay close by so the experience feels complete instead of rushed.`,
          fit: `You still cover the essential everyone comes for, but the day is shaped so the city does not disappear behind the attraction.`
        },
        {
          title: vibeContent.signatureTitle,
          rationale: vibeContent.signatureRationale,
          highlight: dayHighlights[3],
          timeShape: vibeContent.signatureTimeShape,
          weather: dayNotes[3],
          itemTitle: vibeContent.signatureItemTitle,
          itemBody: vibeContent.signatureItemBody,
          fit: vibeContent.signatureFit
        },
        {
          title: `Lighter close in ${areas[1]}`,
          rationale: `The ending stays lighter on purpose so you can enjoy the last stretch of the trip without feeling rushed.`,
          highlight: dayHighlights[4],
          timeShape: "Light, with room to pack",
          weather: dayNotes[4],
          itemTitle: `Low-pressure final stretch`,
          itemBody: vibeContent.finalItemBody,
          fit: vibeContent.finalFit
        },
        {
          title: `Open day near ${areas[0]}`,
          rationale: `This extra day leaves room for weather, a favorite repeat stop, or a slower local experience without forcing another checklist day.`,
          highlight: `Flexible time near ${areas[0]}`,
          timeShape: "Open and weather-flexible",
          weather: `Keep this day adjustable so the trip can follow the best weather, energy, or local recommendation.`,
          itemTitle: `Flexible time + one favorite return`,
          itemBody: `Use the day for the beach, a repeat favorite, or a slower local experience that did not fit earlier. Keep one easy backup nearby instead of filling every hour.`,
          fit: `It gives the trip breathing room and lets the family choose what feels best once they know the destination.`,
          timeline: null
        },
        {
          title: `Final beach and pack day in ${areas[1]}`,
          rationale: `The last full day keeps one worthwhile experience visible while protecting enough time for packing, checkout, and a calm departure.`,
          highlight: `Final beach window in ${areas[1]}`,
          timeShape: "Last favorite moment + easy close",
          weather: `Keep the final beach window simple and leave enough time for packing, weather changes, and the trip home.`,
          itemTitle: `Last beach window + easy close`,
          itemBody: `Take one last unrushed beach or waterfront stretch, have an easy meal nearby, and leave the rest of the day open for packing and a calm finish.`,
          fit: `It protects the final memory without creating a stressful last push.`,
          timeline: null
        }
      ];

      const count = Math.max(days, 3);
      const templatePool = concreteTemplates
        ? [...concreteTemplates, ...dayTemplates.slice(concreteTemplates.length)]
        : dayTemplates;
      const selectedTemplates = Array.from({ length: count }, (_, index) => templatePool[index] || {
        title: `Flexible day in ${areas[index % areas.length]}`,
        rationale: `Keep this day centered on one area and let the trip respond to energy, weather, and the experiences that still feel worth adding.`,
        highlight: dayHighlights[index % dayHighlights.length] || `Local time in ${areas[index % areas.length]}`,
        timeShape: "Flexible and easy to adjust",
        weather: "Keep the day open enough to follow local advice and make changes without breaking the trip.",
        itemTitle: `Local time in ${areas[index % areas.length]}`,
        itemBody: `Build around one worthwhile stop, a good meal, and enough open time to enjoy the area without turning the day into a checklist.`,
        fit: `It keeps a longer trip from becoming repetitive or overpacked.`,
        timeline: null
      });
      return selectedTemplates.map((sourceDay, index) => {
        const area = areas[Math.min(index, areas.length - 1)];
        const baseDay = index === 0 ? normalizeFirstDayTemplate(sourceDay, area) : { ...sourceDay };
        const day = applyVibeContentToDay(baseDay, index, count - 1, vibeContent);
        const dayLead = index === 0 ? "Morning" : index === 3 ? "Evening" : "Midday";
        const resolvedTimeline = day.timeline || timelineTemplates[Math.min(index, timelineTemplates.length - 1)];
        const normalizedTimeline = index === 0 ? normalizeFirstDayTimeline(resolvedTimeline, area) : resolvedTimeline;
        const finalTimeline = expandTimelineSteps(normalizedTimeline, city, area, day.highlight);

        const generatedDay = {
          id: `day-${index + 1}`,
          dayLabel: `Day ${index + 1}`,
          date: formatDate(addLocalDays(hbState.appState.startDate, index)),
          area,
          pace: index === 0 && hbState.appState.pace === "Packed" ? "Balanced" : hbState.appState.pace,
          item: {
            title: `${dayLead} • ${day.itemTitle}`,
            body: day.itemBody,
            fit: day.fit,
            label: index === 2 ? "Crowd-loved + fit" : "Personalized",
            timeline: finalTimeline,
            removed: false,
            alternatives: [
              {
                title: `${dayLead} • Nearby alternative`,
                body: `A different version of the same kind of stop in the same part of ${city}, so you can change the tone without breaking the flow of the day.`,
                fit: `It protects the same overall feel of the plan while giving you a better fit if the original stop is not quite right.`,
                label: "Alternative"
              },
              {
                title: `${dayLead} • Lighter option`,
                body: `A lighter version with more breathing room, useful if this part of the day starts to feel fuller than you want.`,
                fit: `It still works with the trip, but it gives you an easier rhythm and less pressure to keep pushing.`,
                label: "Lighter"
              }
            ],
            alternativeIndex: 0
          },
          ...day
        };
        const qualityDay = applyTripQualityToDay(generatedDay, index, count, city);
        qualityDay.protectedAnchors = buildDayProtectedAnchorMatches(qualityDay, index, count);
        return qualityDay;
      });
    }

    function buildGeneratedTrip() {
      const city = getCityName();
      return {
        title: buildTripTitle(city),
        summary: buildTripSummary(city),
        reasoning: buildTripReasoning(),
        signature: buildSignatureEvent(city),
        flightCard: buildFlightCard(),
        stayCard: buildStayCard(city),
        days: buildDayData()
      };
    }

    function updateStateFromInputs() {
      const rawDestination = hbRefs.formBindings.destination.value.trim();
      hbState.appState.destination = rawDestination ? resolveCanonicalDestination(rawDestination) : "";
      hbRefs.formBindings.destination.value = hbState.appState.destination;
      hbState.appState.startDate = hbRefs.formBindings.startDate.value;
      hbState.appState.endDate = hbRefs.formBindings.endDate.value;
      hbState.appState.adults = Math.max(1, Number(hbRefs.formBindings.adults.value) || 1);
      hbState.appState.children = Math.max(0, Number(hbRefs.formBindings.children.value) || 0);
      hbState.appState.pets = hbRefs.formBindings.pets.value;
      hbState.appState.flightMode = hbRefs.formBindings.flightMode.value;
      hbState.appState.flightPreference = hbRefs.formBindings.flightPreference.value;
      hbState.appState.flightAirline = hbRefs.formBindings.flightAirline.value.trim();
      hbState.appState.flightNumber = hbRefs.formBindings.flightNumber.value.trim();
      hbState.appState.arrivalFlight = hbRefs.formBindings.arrivalFlight.value;
      hbState.appState.departureFlight = hbRefs.formBindings.departureFlight.value;
      hbState.appState.hotelName = hbRefs.formBindings.tripHotelName?.value.trim() || hbState.appState.hotelName;
      hbState.appState.hotelArea = hbRefs.formBindings.tripHotelArea?.value.trim() || hbState.appState.hotelArea;
      hbState.appState.hotelCheckIn = hbRefs.formBindings.tripHotelCheckIn?.value || hbState.appState.hotelCheckIn;
      hbState.appState.hotelCheckOut = hbRefs.formBindings.tripHotelCheckOut?.value || hbState.appState.hotelCheckOut;
      hbState.appState.budget = hbRefs.formBindings.budget.value;
      hbState.appState.mustHaves = hbRefs.formBindings.mustHaves.value.trim();
      hbState.appState.nonNegotiables = hbRefs.formBindings.nonNegotiables?.value.trim() || "";
      hbUtils.updateBudgetHelper();
      hbUtils.updateFlightUI();
      hbUtils.updateBuildFormHelpers?.();
      hbUtils.updatePreferenceHelpers?.();
      hbUtils.updateDestinationAutofill();
      hbUtils.updateDestinationHelper();
      syncTripLogisticsInputs();
      hbUtils.renderDestinationHero("build");
    }

    function renderBlueprint() {
      const city = getCityName();
      document.getElementById("blueprint-summary").textContent = buildBlueprintSummary(city);
      document.getElementById("blueprint-reasoning").textContent = buildBlueprintReasoning();
      const readiness = getPlanningReadiness();
      const finalReview = document.getElementById("blueprint-final-review");
      if (finalReview) {
        const missingItems = readiness.generationReady ? readiness.suggestions.slice(0, 3) : readiness.blockers;
        finalReview.classList.toggle("is-ready", readiness.generationReady);
        finalReview.innerHTML = `
          <div class="blueprint-final-review-head">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.14em] ${readiness.generationReady ? "text-tertiary" : "text-primary"}">${readiness.generationReady ? "Ready to generate" : "Needs a quick fix"}</p>
              <h4 class="mt-1 font-display text-lg font-bold text-ink">${readiness.generationReady ? "The planner has enough to build your trip" : "Add the basics before generating"}</h4>
              <p class="mt-2 max-w-[44rem] text-sm leading-6 text-muted">${readiness.generationReady ? "You can still refine the optional prompts below, but the core trip frame is ready for a day-by-day itinerary." : "The itinerary needs a valid destination, dates, and travelers before the automated draft will be useful."}</p>
            </div>
            <span class="planning-prompt-status ${readiness.generationReady ? "is-ready" : ""}">${readiness.readyCount} of ${readiness.totalCount} ready</span>
          </div>
          <div class="planning-prompt-grid">
            ${(missingItems.length ? missingItems : readiness.all.filter((item) => item.ready).slice(0, 3)).map((item) => `
              <div class="planning-prompt-card ${item.level === "required" && !item.ready ? "is-blocking" : ""}">
                <p class="planning-prompt-label">
                  <span class="material-symbols-outlined" aria-hidden="true">${item.ready ? "check_circle" : (item.level === "required" ? "error" : "tips_and_updates")}</span>
                  <span>${item.ready ? "Ready" : (item.level === "required" ? "Required" : "Helpful")}</span>
                </p>
                <p class="planning-prompt-title">${escapeHtml(item.title)}</p>
                <p class="planning-prompt-copy">${escapeHtml(item.ready ? item.readyCopy : item.missingCopy)}</p>
                ${!item.ready && item.panel && item.target ? `
                  <button class="planning-prompt-button ${item.level === "required" ? "bg-primary text-white" : "bg-surface-soft text-secondary ring-1 ring-line"}" data-action="edit-blueprint-item" data-target-panel="${escapeHtml(item.panel)}" data-focus-target="${escapeHtml(item.target)}" type="button">
                    ${escapeHtml(item.fixLabel)}
                  </button>
                ` : ""}
              </div>
            `).join("")}
          </div>
        `;
      }

      const blueprintGrid = document.getElementById("blueprint-grid");
      const tripLength = getTripLength();
      const dateRange = `${formatDate(hbState.appState.startDate)} - ${formatDate(hbState.appState.endDate)}${hbState.appState.datesFlexible ? " (flexible)" : ""}`;
      const adultsText = `${hbState.appState.adults} adult${hbState.appState.adults === 1 ? "" : "s"}`;
      const childrenText = `${hbState.appState.children} ${hbState.appState.children === 1 ? "child" : "children"}`;
      const petSummary = hbState.appState.pets !== "No pets" ? hbState.appState.pets : "No pets coming";
      const mustHaves = hbState.appState.mustHaves || "No must-haves added yet.";
      const nonNegotiables = hbState.appState.nonNegotiables || "No hard rules added yet.";
      const guideDetail = hbState.guidePlanContext?.sourceType
        ? `Started from ${hbState.guidePlanContext.sourceName}.`
        : `Planning for ${city}.`;
      const guideSignals = hbState.guidePlanContext?.signals || {};
      const guideStyleDetail = Array.isArray(guideSignals.styles) && guideSignals.styles.length
        ? ` Guide suggests ${guideSignals.styles.join(" + ")} with a ${guideSignals.pace || hbState.appState.pace} pace.`
        : "";
      const guideMustHaveDetail = guideSignals.mustHaves
        ? ` Guide anchor available: ${guideSignals.mustHaves}.`
        : "";
      const reviewItems = [
        {
          icon: "place",
          label: "Destination",
          value: hbState.appState.destination,
          detail: guideDetail,
          editPanel: "build-panel",
          editTarget: "destination-input"
        },
        {
          icon: "event",
          label: "Dates",
          value: dateRange,
          detail: hbState.appState.datesFlexible
            ? `${tripLength} day${tripLength === 1 ? "" : "s"} planned, with dates treated as adjustable.`
            : `${tripLength} day${tripLength === 1 ? "" : "s"} planned from arrival through wrap-up.`,
          editPanel: "build-panel",
          editTarget: "start-date-input"
        },
        {
          icon: "groups",
          label: "Travelers",
          value: buildTravelerText(),
          detail: `${adultsText} and ${childrenText}.`,
          editPanel: "build-panel",
          editTarget: "adults-input"
        },
        {
          icon: "luggage",
          label: "Logistics",
          value: `${hbState.appState.budget} budget${hbState.appState.budgetFlexible ? " with wiggle room" : ""}`,
          detail: `${buildFlightSummary()} - ${petSummary}.`,
          editPanel: "build-panel",
          editTarget: "build-logistics-section"
        },
        {
          icon: "tune",
          label: "Preferences",
          value: `${formatTripStyles()} - ${hbState.appState.pace} pace`,
          detail: `${shortDestinationMode()} - ${formatFoodPriority()} - ${hbState.appState.spontaneity} - ${hbState.appState.memory}.${guideStyleDetail}`,
          editPanel: "details-panel",
          editTarget: "preference-style-section"
        },
        {
          icon: "star",
          label: "Must-haves",
          value: mustHaves,
          detail: hbState.appState.mustHaves
            ? "These are priority moments the planner should try to protect."
            : `The planner will rely on your broader preferences.${guideMustHaveDetail}`,
          editPanel: "details-panel",
          editTarget: "must-haves-input"
        },
        {
          icon: "rule",
          label: "Non-negotiables",
          value: nonNegotiables,
          detail: hbState.appState.nonNegotiables
            ? "These are hard rules the planner must respect."
            : "Add hard rules anytime if accessibility, budget, diet, safety, or timing needs become important.",
          alert: true,
          editPanel: "details-panel",
          editTarget: "non-negotiables-input"
        }
      ];

      blueprintGrid.innerHTML = reviewItems.map((item) => `
        <button class="blueprint-review-card ${item.label === "Must-haves" || item.label === "Non-negotiables" ? "is-wide" : ""} ${item.alert ? "is-alert" : ""}" data-action="edit-blueprint-item" data-target-panel="${escapeHtml(item.editPanel)}" data-focus-target="${escapeHtml(item.editTarget)}" type="button">
          <span class="blueprint-review-icon material-symbols-outlined" aria-hidden="true">${escapeHtml(item.icon)}</span>
          <div class="blueprint-review-copy">
            <div class="blueprint-review-top">
              <p class="blueprint-review-label">${escapeHtml(item.label)}</p>
              <span class="blueprint-edit-button">
                <span class="material-symbols-outlined text-sm" aria-hidden="true">edit</span>
                Edit
              </span>
            </div>
            <p class="blueprint-review-value">${escapeHtml(item.value)}</p>
            <p class="blueprint-review-detail">${escapeHtml(item.detail)}</p>
          </div>
        </button>
      `).join("");

      const blueprintTopPlaces = document.getElementById("blueprint-top-places");
      if (blueprintTopPlaces) {
        blueprintTopPlaces.innerHTML = getBlueprintTopPlaces().map((place) => `
          <div class="rounded-2xl bg-surface-soft px-4 py-4">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${escapeHtml(place.type)}</p>
            <p class="mt-2 text-sm font-semibold text-ink">${escapeHtml(place.name)}</p>
          </div>
        `).join("");
      }

      const blueprintSummary = document.getElementById("blueprint-summary");
      if (blueprintSummary && hbState.guidePlanContext?.sourceType) {
        blueprintSummary.textContent = `${blueprintSummary.textContent} Started from ${hbState.guidePlanContext.sourceName}.`;
      }
    }

    function renderThinking() {
      const city = getCityName();
      const styleLead = (hbState.appState.styles[0] || "relaxed").toLowerCase();
      document.getElementById("thinking-optimization").textContent =
        `Keeping your days local, your ${styleLead} moments clear, and your ${hbState.appState.memory.toLowerCase()} goal visible.`;
      document.getElementById("thinking-support").textContent =
        `We’re shaping the trip around your ${hbState.appState.pace.toLowerCase()} pace, your ${hbState.appState.budget.toLowerCase()} budget tier, and the must-haves you said actually matter.`;
      document.getElementById("thinking-fact").textContent =
        hbData.destinationFacts[city] || `${city} tends to feel best when you let a neighborhood breathe instead of trying to cover every corner in one day.`;
    }

    function renderSavedPanel() {
      hydrateSavedDraftStatus();
      hydrateTripProfile();
      const activeTripLabel = getActiveTripLabel();
      const savedDraft = hbState.savedDraft;
      const profile = hbState.tripProfile || {};
      const profileName = profile.displayName || "Vacation planner";
      const accountLabel = hbState.appState.accountMethod && hbState.appState.accountMethod !== "guest"
        ? `Connected with ${titleCase(hbState.appState.accountMethod)}`
        : "Local profile";
      const savedTripTitle = hbState.likedTrip?.title || hbState.currentTrip?.title || buildTripTitle(getCityName());
      const savedTripCopy = hbState.likedTrip
        ? "This is the version you marked as a viable restore point. You can come back to it if later edits start drifting too far."
        : "Once you like a version, it can live here as a calm restore point instead of getting lost in later edits.";
      const currentTripChanges = getTripChangeItems(hbState.currentTrip);
      const currentTripChangeSummary = getTripChangeSummary(hbState.currentTrip, "No day feedback yet.");
      const activeTripCopy = hbState.currentTrip
        ? `${hbState.currentTrip.summary} ${hbState.activeTripSource?.type === "saved" ? `You are currently viewing the saved arrangement "${hbState.activeTripSource.name}".` : "This is the current working version of the trip."}`
        : "Start with Explore or Build, then your active trip will show up here automatically.";
      const activeTripSummaryCards = hbState.currentTrip
        ? [
            {
              label: "Current view",
              value: activeTripLabel,
              copy: hbState.activeTripSource?.type === "saved"
                ? "You are currently inside a saved arrangement rather than the live working draft."
                : "This is the version still being shaped most recently."
            },
            {
              label: "Trip shape",
              value: hbState.currentTrip.days?.[0]?.area || getCityName(),
              copy: hbState.currentTrip.days?.length
                ? `${hbState.currentTrip.days.length} day${hbState.currentTrip.days.length === 1 ? "" : "s"} currently mapped in this arrangement.`
                : "A trip will appear here once planning starts."
            },
            {
              label: "Trip changes",
              value: currentTripChanges.length
                ? `${currentTripChanges.length} adjustment${currentTripChanges.length === 1 ? "" : "s"}`
                : "No day feedback",
              copy: currentTripChangeSummary
            }
          ]
        : [
            {
              label: "Current view",
              value: "No active trip yet",
              copy: "Start from Build or Explore and this area will begin filling in automatically."
            },
            {
              label: "Trip shape",
              value: "Waiting for a first draft",
              copy: "Once a trip exists, this becomes the calm place to revisit it."
            },
            {
              label: "Trip changes",
              value: "No day feedback",
              copy: "Day feedback will appear here after you start refining the generated plan."
            }
          ];
      const restorePointCards = hbState.likedTrip
        ? [
            {
              label: "Saved shape",
              value: hbState.likedTrip.days?.[0]?.area || getCityName(),
              copy: hbState.likedTrip.days?.length
                ? `${hbState.likedTrip.days.length} day${hbState.likedTrip.days.length === 1 ? "" : "s"} preserved as your restore point.`
                : "This restore point is ready whenever you want it back."
            },
            {
              label: "Best use",
              value: "Come back if edits drift too far",
              copy: "This gives you a trusted fallback if the good version starts getting lost."
            }
          ]
        : [
            {
              label: "Saved shape",
              value: "No restore point yet",
              copy: "Once you mark a version you like, it will live here as your fallback."
            },
            {
              label: "Best use",
              value: "Protect a version you trust",
              copy: "This is especially useful before testing bigger itinerary changes."
            }
          ];
      const savedDraftCards = savedDraft
        ? [
            {
              label: "Last saved",
              value: savedDraft.savedAt || "Saved recently",
              copy: `${savedDraft.days || "A"} day draft for ${savedDraft.destination || hbState.appState.destination}.`
            },
            {
              label: "Saved changes",
              value: savedDraft.changeCount
                ? `${savedDraft.changeCount} adjustment${savedDraft.changeCount === 1 ? "" : "s"}`
                : "No day feedback",
              copy: savedDraft.changeSummary || "This saved draft has not been adjusted with day feedback yet."
            },
            {
              label: "Best use",
              value: "Pick up where you left off",
              copy: "This restores the working draft, trip inputs, liked version, and saved arrangements on this browser."
            }
          ]
        : [
            {
              label: "Last saved",
              value: "No saved draft yet",
              copy: "Open the trip and save the draft once it starts feeling worth keeping."
            },
            {
              label: "Saved changes",
              value: "No saved changes",
              copy: "When you save after using day feedback, the change summary will live here."
            },
            {
              label: "Best use",
              value: "Come back later",
              copy: "This is the first step toward real account-backed trip history."
            }
          ];
      const tripProfileCards = [
        {
          label: "Account status",
          value: accountLabel,
          copy: hbState.appState.accountMethod && hbState.appState.accountMethod !== "guest"
            ? "This profile is ready to connect saved trips to a real account."
            : "Saved locally for now, with fields shaped for a future account."
        },
        {
          label: "Saved data",
          value: `${savedDraft ? "1 draft" : "No draft"} - ${hbState.alternateTrips.length} version${hbState.alternateTrips.length === 1 ? "" : "s"}`,
          copy: "Drafts, arrangements, notes, and profile details are organized now so account saving can feel natural later."
        }
      ];
      const profileHasData = Boolean(profile.displayName || profile.email || profile.homeAirport);
      const savedAccountStatusCards = [
        {
          label: "Profile",
          value: profileHasData ? "Profile started" : "Add profile",
          copy: profileHasData ? "Basic traveler details are ready for future account syncing." : "Add a name, email, or home airport when you want saves tied to you."
        },
        {
          label: "Draft",
          value: savedDraft ? "Recoverable" : "Not saved yet",
          copy: savedDraft ? `Last saved ${savedDraft.savedAt}.` : "Save once the itinerary draft feels worth keeping."
        },
        {
          label: "Versions",
          value: `${hbState.alternateTrips.length} saved`,
          copy: hbState.alternateTrips.length ? "Named arrangements are ready to view or compare." : "Try swaps or reorders, then save the versions you may want back."
        }
      ];
      const accountNextAction = savedDraft
        ? {
            action: "restore-saved-draft",
            label: "Restore draft",
            style: "bg-white text-secondary ring-white/20"
          }
        : hbState.currentTrip
          ? {
              action: "save-current-draft",
              label: "Save current draft",
              style: "bg-white text-secondary ring-white/20"
            }
          : {
              action: "open-build",
              label: "Start building",
              style: "bg-white text-secondary ring-white/20"
            };
      const dashboardPrimaryAction = hbState.currentTrip
        ? {
            action: "open-trip",
            label: "Continue planning"
          }
        : {
            action: "open-build",
            label: "Build a trip"
          };
      hydrateBookingItems();
      const bookingSummary = getBookingHubSummary();
      const bookingStatusLabel = bookingSummary.booked
        ? `${bookingSummary.booked} booked`
        : bookingSummary.searching
          ? `${bookingSummary.searching} searching`
          : "Ready";
      const localAccountCards = getLocalAccountSnapshotCards();
      const localAccountFeedback = hbState.localAccountFeedback
        ? `<p class="mt-3 rounded-2xl bg-teal-soft px-4 py-3 text-sm font-semibold text-tertiary">${escapeHtml(hbState.localAccountFeedback)}</p>`
        : "";
      const hasTripBasics = Boolean(hbState.appState.destination && hbState.appState.startDate && hbState.appState.endDate);
      const hasBookingProgress = Boolean(bookingSummary.booked || bookingSummary.searching);
      const hasBackupExported = Boolean(hbState.localAccountFeedback && hbState.localAccountFeedback.includes("Backup exported"));
      const betaChecklistItems = [
        {
          ready: hasTripBasics,
          title: "Build a realistic trip",
          copy: hasTripBasics
            ? "Destination, dates, and traveler basics are ready for a real planning pass."
            : "Start with a real destination, dates, travelers, budget, flights, and pets.",
          action: "open-build",
          label: hasTripBasics ? "Review basics" : "Add trip basics"
        },
        {
          ready: Boolean(hbState.currentTrip),
          title: "Generate the itinerary",
          copy: hbState.currentTrip
            ? "A working trip exists. Now test whether the first read feels specific enough."
            : "Create the first itinerary so the rest of the beta flow has something to refine.",
          action: "open-trip",
          label: hbState.currentTrip ? "Open trip" : "Generate draft"
        },
        {
          ready: Boolean(currentTripChanges.length),
          title: "Try quick feedback",
          copy: currentTripChanges.length
            ? `${currentTripChanges.length} day adjustment${currentTripChanges.length === 1 ? "" : "s"} tracked.`
            : "Mark a day as too full, too light, wrong area, or keep this.",
          action: "open-trip",
          label: "Refine a day"
        },
        {
          ready: Boolean(savedDraft),
          title: "Save and restore",
          copy: savedDraft
            ? `A recoverable draft is saved from ${savedDraft.savedAt || "this session"}.`
            : "Save the current draft, then restore it to make sure local account behavior feels trustworthy.",
          action: savedDraft ? "restore-saved-draft" : "save-current-draft",
          label: savedDraft ? "Restore draft" : "Save draft"
        },
        {
          ready: hasBookingProgress,
          title: "Test booking handoff",
          copy: hasBookingProgress
            ? `${bookingSummary.booked} booked, ${bookingSummary.searching} searching, ${bookingSummary.open} open.`
            : "Open the free booking hub and mark at least one item as searching or booked.",
          action: "open-booking-hub",
          label: "Open booking hub"
        },
        {
          ready: hasBackupExported,
          title: "Export a backup",
          copy: hasBackupExported
            ? "A backup export was created in this session."
            : "Export a local backup before asking testers to switch devices or clear browser data.",
          action: "export-local-backup",
          label: "Export backup"
        }
      ];
      const betaReadyCount = betaChecklistItems.filter((item) => item.ready).length;
      const betaChecklistBlock = `
        <div class="beta-test-panel">
          <div class="beta-test-head">
            <div>
              <p class="beta-test-kicker">Beta readiness</p>
              <h4 class="beta-test-title">Run the flow like a real vacation planner</h4>
              <p class="beta-test-copy">Use this checklist before sharing the app with testers. It focuses on the practical path: build, generate, refine, save, booking handoff, and local backup.</p>
            </div>
            <span class="beta-test-score">${betaReadyCount} of ${betaChecklistItems.length} ready</span>
          </div>
          <div class="beta-test-grid">
            ${betaChecklistItems.map((item) => `
              <div class="beta-test-card ${item.ready ? "is-ready" : "is-next"}">
                <div>
                  <span class="beta-test-status">
                    <span class="material-symbols-outlined text-sm" aria-hidden="true">${item.ready ? "check_circle" : "radio_button_unchecked"}</span>
                    ${item.ready ? "Ready" : "Test next"}
                  </span>
                  <p class="beta-test-card-title">${escapeHtml(item.title)}</p>
                  <p class="beta-test-card-copy">${escapeHtml(item.copy)}</p>
                </div>
                <button class="beta-test-action" data-action="${escapeHtml(item.action)}" type="button">${escapeHtml(item.label)}</button>
              </div>
            `).join("")}
          </div>
          <div class="beta-test-footer">
            <p class="beta-test-footer-copy">Ask testers where they felt unsure, what sounded generic, and whether save/restore/export felt clear enough to trust.</p>
            <a class="beta-test-action" href="mailto:support@horizonbound.co?subject=Horizon%20Bound%20Beta%20Feedback&body=What%20I%20tested%3A%0AWhat%20felt%20smooth%3A%0AWhat%20felt%20confusing%3A%0AWhat%20I%20would%20change%3A">Send beta feedback</a>
          </div>
        </div>
      `;
      const savedTimelineItems = [
        hbState.currentTrip
          ? {
              icon: "route",
              label: "Current draft",
              title: hbState.currentTrip.title,
              copy: `${hbState.currentTrip.days?.length || 0} day${hbState.currentTrip.days?.length === 1 ? "" : "s"} in progress. ${currentTripChangeSummary}`,
              status: hbState.activeTripSource?.type === "saved" ? "Viewing saved version" : "Live"
            }
          : {
              icon: "add_circle",
              label: "Current draft",
              title: "No active trip yet",
              copy: "Start from Build or Explore and the current draft will appear here.",
              status: "Start"
            },
        savedDraft
          ? {
              icon: "cloud_done",
              label: "Saved draft",
              title: savedDraft.title,
              copy: `${savedDraft.days || "A"} day draft saved ${savedDraft.savedAt || "recently"}. ${savedDraft.changeSummary || "No day feedback saved yet."}`,
              status: "Recoverable"
            }
          : {
              icon: "cloud_upload",
              label: "Saved draft",
              title: "Nothing saved yet",
              copy: "Save the working draft once it feels worth keeping.",
              status: "Unsaved"
            },
        {
          icon: "fact_check",
          label: "Bookings",
          title: `${bookingSummary.booked} of ${bookingSummary.total} booking steps done`,
          copy: bookingSummary.searching
            ? `${bookingSummary.searching} item${bookingSummary.searching === 1 ? "" : "s"} marked as being searched. ${bookingSummary.open} still open.`
            : `${bookingSummary.open} still open. Flight, stay, reservation, ticket, and map links stay free and saved locally.`,
          status: bookingStatusLabel
        },
        hbState.alternateTrips.length
          ? {
              icon: "layers",
              label: "Latest version",
              title: hbState.alternateTrips[0].name,
              copy: `Saved ${hbState.alternateTrips[0].savedAt}. ${hbState.alternateTrips[0].changeSummary || getTripChangeSummary(hbState.alternateTrips[0].trip, "No day feedback saved with this version.")}`,
              status: `${hbState.alternateTrips.length} saved`
            }
          : {
              icon: "layers",
              label: "Versions",
              title: "No named versions yet",
              copy: "After edits, save versions you may want to compare or restore later.",
              status: "None"
            },
        profileHasData
          ? {
              icon: "person",
              label: "Profile",
              title: profileName,
              copy: `${profile.homeAirport ? `Home airport ${profile.homeAirport}. ` : ""}Profile details are ready for future account syncing.`,
              status: "Started"
            }
          : {
              icon: "person_add",
              label: "Profile",
              title: "Add traveler details",
              copy: "A name, email, or home airport makes this feel closer to a real saved account.",
              status: "Optional"
            }
      ];
      const reflectionCards = [
        {
          label: "What to capture",
          value: "What felt most like you",
          copy: "The goal is not a long survey. One clear memory or one thing to repeat is enough."
        },
        {
          label: "Why it helps",
          value: "Future trips get more personal",
          copy: "Those notes can quietly influence future recommendations without turning into a long survey."
        }
      ];
      const journalBlock = hbState.appState.journalEntry
        ? `
            <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold text-primary">Travel journal</p>
                  <h4 class="mt-1 font-display text-lg font-bold">${hbState.appState.journalMood}</h4>
                  <p class="mt-2 text-sm text-muted">${hbState.appState.journalEntry}</p>
                </div>
                <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">Saved note</span>
              </div>
              <div class="saved-panel-note">
                <p class="saved-panel-summary-label">Why keep this</p>
                <p class="saved-panel-summary-copy">This note becomes part of the memory trail for future trips, so the planner can remember what actually stood out instead of only what was practical.</p>
              </div>
            </div>
          `
        : "";
      const savedTimelineBlock = `
        <div class="saved-panel-card saved-panel-card--history rounded-[24px] border border-line bg-white px-4 py-4">
          <div class="saved-panel-card-head">
            <div class="saved-panel-card-copy">
              <p class="text-sm font-semibold text-primary">Trip history</p>
              <h4 class="mt-1 font-display text-lg font-bold">What this account remembers</h4>
              <p class="mt-2 text-sm text-muted">A short planning trail makes saves feel intentional instead of scattered.</p>
            </div>
            <span class="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-tertiary">${savedTimelineItems.length} signals</span>
          </div>
          <div class="saved-history-list">
            ${savedTimelineItems.map((item) => `
              <div class="saved-history-item">
                <span class="material-symbols-outlined saved-history-icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
                <div class="saved-history-copy">
                  <div class="saved-history-row">
                    <p class="saved-history-label">${escapeHtml(item.label)}</p>
                    <span class="saved-history-status">${escapeHtml(item.status)}</span>
                  </div>
                  <p class="saved-history-title">${escapeHtml(item.title)}</p>
                  <p class="saved-history-detail">${escapeHtml(item.copy)}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
      const alternateVersionsBlock = hbState.alternateTrips.length
        ? `
            <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
              <div class="saved-panel-card-head">
                <div class="saved-panel-card-copy">
                  <p class="text-sm font-semibold text-primary">Alternate versions</p>
                  <h4 class="mt-1 font-display text-lg font-bold">Saved itinerary arrangements</h4>
                  <p class="mt-2 text-sm text-muted">These are named versions of the trip you saved after making manual edits.</p>
                </div>
                <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">${hbState.alternateTrips.length} saved</span>
              </div>
              <div class="mt-4 space-y-3">
                ${hbState.alternateTrips.map((version) => `
                  <div class="version-card ${hbState.compareVersionId === version.id ? "is-compare-active" : ""} ${hbState.alternateVersionFeedback?.id === version.id ? "is-just-saved" : ""}">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <div class="flex flex-wrap items-center gap-2">
                          <p class="font-display text-lg font-bold">${version.name}</p>
                          ${hbState.compareVersionId === version.id ? `<span class="version-status-chip is-compare">Compare active</span>` : `<span class="version-status-chip is-soft">Saved arrangement</span>`}
                        </div>
                        <p class="version-card-meta mt-1">Saved ${version.savedAt}</p>
                        <p class="mt-2 text-sm leading-6 text-muted">${getTripArrangementSummary(version.trip)}</p>
                        <p class="mt-2 text-sm leading-6 text-muted"><span class="font-semibold text-ink">Changes:</span> ${escapeHtml(version.changeSummary || getTripChangeSummary(version.trip, "No day feedback saved with this version."))}</p>
                        <p class="version-card-action-help">View opens this saved arrangement in the editor. Compare keeps the live draft visible and shows the differences side by side.</p>
                      </div>
                      <div class="version-card-actions-shell">
                        <p class="version-card-actions-label">${hbState.compareVersionId === version.id ? "Compare active" : "Choose an action"}</p>
                        <div class="version-card-actions">
                          <button class="version-action is-neutral rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-saved-panel-version" data-version-id="${version.id}" type="button">View arrangement</button>
                          <button class="version-action is-compare rounded-full px-4 py-2 text-sm font-semibold ring-1 ${hbState.compareVersionId === version.id ? "is-active bg-surface-soft text-secondary ring-line" : "bg-surface-soft text-secondary ring-line"}" data-action="compare-saved-panel-version" data-version-id="${version.id}" type="button">${hbState.compareVersionId === version.id ? "Compare active" : "Compare with live draft"}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `
        : `
            <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
              <div class="saved-panel-card-head">
                <div class="saved-panel-card-copy">
                  <p class="text-sm font-semibold text-primary">Alternate versions</p>
                  <h4 class="mt-1 font-display text-lg font-bold">No saved arrangements yet</h4>
                  <p class="mt-2 text-sm text-muted">Try a lighter day, swap an area, or adjust the order, then save the version you may want back.</p>
                </div>
                <span class="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-secondary ring-1 ring-line">Ready</span>
              </div>
              <div class="saved-panel-note">
                <p class="saved-panel-summary-label">Best next move</p>
                <p class="saved-panel-summary-copy">Open the current trip, use quick feedback on a day, then save a named version to compare later.</p>
              </div>
            </div>
          `;
      const localAccountBackupBlock = `
        <div class="saved-panel-card saved-panel-card--local-backup rounded-[24px] border border-line bg-white px-4 py-4">
          <div class="saved-panel-card-head">
            <div class="saved-panel-card-copy">
              <p class="text-sm font-semibold text-primary">Beta local account</p>
              <h4 class="mt-1 font-display text-lg font-bold">Save here, export when you want a backup</h4>
              <p class="mt-2 text-sm text-muted">For beta, trips stay free and local to this browser. There is no online account sync yet, so export a backup file before switching devices, clearing browser data, or sharing a draft with yourself.</p>
              ${localAccountFeedback}
            </div>
            <span class="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-tertiary">No backend needed</span>
          </div>
          <div class="saved-panel-summary-grid mt-4">
            ${localAccountCards.map((item) => `
              <div class="saved-panel-summary-card">
                <p class="saved-panel-summary-label">${escapeHtml(item.label)}</p>
                <p class="saved-panel-summary-value">${escapeHtml(item.value)}</p>
                <p class="saved-panel-summary-copy">${escapeHtml(item.copy)}</p>
              </div>
            `).join("")}
          </div>
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-sm leading-6 text-muted">Restore replaces the saved draft, profile, booking notes, and versions on this browser with the backup file.</p>
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
              <button class="rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-white" data-action="export-local-backup" type="button">
                Export backup
              </button>
              <label class="inline-flex cursor-pointer items-center justify-center rounded-full bg-surface-soft px-4 py-3 text-sm font-semibold text-secondary ring-1 ring-line">
                Restore backup
                <input class="sr-only" data-action="import-local-backup" type="file" accept="application/json,.json" />
              </label>
            </div>
          </div>
        </div>
      `;

      hbRefs.savedPanel.innerHTML = `
        <div class="saved-panel-shell rounded-[28px] border border-line bg-surface-card p-5 shadow-card">
          <div class="saved-panel-head">
            <div class="saved-panel-head-copy">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Saved trips</p>
              <h3 class="mt-1 font-display text-2xl font-bold">Come back to what worked</h3>
              <p class="mt-2 text-sm leading-6 text-muted">
                Saved trips should feel calm and useful. Keep restore points, revisit liked versions, and leave light feedback after travel.
              </p>
            </div>
            <span class="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-tertiary">Future memory</span>
          </div>

          <div class="saved-account-overview">
            <div class="saved-account-overview-head">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Account-ready workspace</p>
                <h4 class="saved-account-overview-title mt-1">Keep planning without starting over</h4>
                <p class="saved-account-overview-copy">
                  This area is shaped like the future account home: profile details, active draft, saved arrangements, and light trip notes all stay together on this browser.
                </p>
              </div>
              <span class="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">${escapeHtml(accountLabel)}</span>
            </div>
            <div class="saved-account-status-grid">
              ${savedAccountStatusCards.map((item) => `
                <div class="saved-account-status-card">
                  <p class="saved-account-status-label">${escapeHtml(item.label)}</p>
                  <p class="saved-account-status-value">${escapeHtml(item.value)}</p>
                  <p class="saved-account-status-copy">${escapeHtml(item.copy)}</p>
                </div>
              `).join("")}
            </div>
            <div class="saved-account-overview-actions">
              <button class="rounded-full px-4 py-2 text-sm font-semibold ring-1 ${accountNextAction.style}" data-action="${accountNextAction.action}" type="button">
                ${accountNextAction.label}
              </button>
              <button class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15" data-action="open-build" type="button">
                Edit trip basics
              </button>
              ${hbState.currentTrip ? `
                <button class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15" data-action="open-trip" type="button">
                  Open current trip
                </button>
              ` : ""}
            </div>
          </div>

          <div class="saved-dashboard-continue">
            <div class="saved-dashboard-continue-copy">
              <p class="saved-dashboard-kicker">Continue planning</p>
              <h4 class="saved-dashboard-title">${escapeHtml(hbState.currentTrip?.title || savedDraft?.title || "Start a trip draft")}</h4>
              <p class="saved-dashboard-copy">${escapeHtml(hbState.currentTrip?.summary || savedDraft?.changeSummary || "Your current draft, saved version history, and profile details will stay connected here.")}</p>
            </div>
            <div class="saved-dashboard-actions">
              <button class="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white" data-action="${dashboardPrimaryAction.action}" type="button">
                ${dashboardPrimaryAction.label}
              </button>
              <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="${savedDraft ? "restore-saved-draft" : "save-current-draft"}" type="button">
                ${savedDraft ? "Restore saved draft" : "Save current draft"}
              </button>
            </div>
          </div>

          ${betaChecklistBlock}

          <div class="saved-dashboard-layout mt-5">
            <div class="saved-dashboard-main space-y-3">
              <div class="saved-panel-card saved-panel-card--active rounded-[24px] border border-line bg-white px-4 py-4">
                <div class="saved-panel-card-head">
                  <div class="saved-panel-card-copy">
                    <p class="text-sm font-semibold text-primary">Active trip</p>
                    <h4 class="mt-1 font-display text-lg font-bold">${hbState.currentTrip?.title || "Trip draft waiting"}</h4>
                    <p class="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">${activeTripLabel}</p>
                    <p class="mt-2 text-sm text-muted">${activeTripCopy}</p>
                  </div>
                  <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-trip" type="button">
                    Open trip
                  </button>
                </div>
                <div class="saved-panel-summary-grid">
                  ${activeTripSummaryCards.map((item) => `
                    <div class="saved-panel-summary-card">
                      <p class="saved-panel-summary-label">${escapeHtml(item.label)}</p>
                      <p class="saved-panel-summary-value">${escapeHtml(item.value)}</p>
                      <p class="saved-panel-summary-copy">${escapeHtml(item.copy)}</p>
                    </div>
                  `).join("")}
                </div>
              </div>

              <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
                <div class="saved-panel-card-head">
                  <div class="saved-panel-card-copy">
                    <p class="text-sm font-semibold text-primary">Saved draft</p>
                    <h4 class="mt-1 font-display text-lg font-bold">${savedDraft ? escapeHtml(savedDraft.title) : "No draft saved yet"}</h4>
                    <p class="mt-2 text-sm text-muted">${savedDraft ? "This is the recoverable working draft stored on this browser." : "Save a draft from the trip screen so you can come back without starting over."}</p>
                  </div>
                  <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="${savedDraft ? "restore-saved-draft" : "save-current-draft"}" type="button">
                    ${savedDraft ? "Restore draft" : "Save current draft"}
                  </button>
                </div>
                <div class="saved-panel-summary-grid">
                  ${savedDraftCards.map((item) => `
                    <div class="saved-panel-summary-card">
                      <p class="saved-panel-summary-label">${escapeHtml(item.label)}</p>
                      <p class="saved-panel-summary-value">${escapeHtml(item.value)}</p>
                      <p class="saved-panel-summary-copy">${escapeHtml(item.copy)}</p>
                    </div>
                  `).join("")}
                </div>
              </div>

              ${localAccountBackupBlock}

              ${alternateVersionsBlock}
            </div>

            <div class="saved-dashboard-side space-y-3">
              <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
              <div class="saved-panel-card-head">
                <div class="saved-panel-card-copy">
                  <p class="text-sm font-semibold text-primary">Trip profile</p>
                  <h4 class="mt-1 font-display text-lg font-bold">${escapeHtml(profileName)}</h4>
                  <p class="mt-2 text-sm text-muted">Basic account-ready details for saving trips, restoring drafts, and making future recommendations feel more personal.</p>
                  ${hbState.profileSaveFeedback ? `<p class="mt-2 text-sm font-semibold text-tertiary">${escapeHtml(hbState.profileSaveFeedback)}</p>` : ""}
                </div>
                <span class="rounded-full bg-blue-soft px-3 py-1 text-xs font-semibold text-secondary">${escapeHtml(accountLabel)}</span>
              </div>
              <div class="mt-4 grid gap-3 sm:grid-cols-3">
                <label class="block">
                  <span class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Name</span>
                  <input id="trip-profile-name-input" class="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink focus:border-secondary focus:ring-secondary" placeholder="Your name" type="text" value="${escapeHtml(profile.displayName || "")}" />
                </label>
                <label class="block">
                  <span class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Email</span>
                  <input id="trip-profile-email-input" class="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink focus:border-secondary focus:ring-secondary" placeholder="you@example.com" type="email" value="${escapeHtml(profile.email || "")}" />
                </label>
                <label class="block">
                  <span class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Home airport</span>
                  <input id="trip-profile-airport-input" class="mt-2 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink focus:border-secondary focus:ring-secondary" placeholder="DEN, JFK, LAX" type="text" value="${escapeHtml(profile.homeAirport || "")}" />
                </label>
              </div>
              <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div class="saved-panel-summary-grid sm:flex-1">
                  ${tripProfileCards.map((item) => `
                    <div class="saved-panel-summary-card">
                      <p class="saved-panel-summary-label">${escapeHtml(item.label)}</p>
                      <p class="saved-panel-summary-value">${escapeHtml(item.value)}</p>
                      <p class="saved-panel-summary-copy">${escapeHtml(item.copy)}</p>
                    </div>
                  `).join("")}
                </div>
                <button class="rounded-full bg-secondary px-4 py-3 text-sm font-semibold text-white sm:self-start" data-action="save-trip-profile" type="button">
                  Save profile
                </button>
              </div>
              </div>

              ${savedTimelineBlock}

              <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
              <div class="saved-panel-card-head">
                <div class="saved-panel-card-copy">
                  <p class="text-sm font-semibold text-primary">Restore point</p>
                  <h4 class="mt-1 font-display text-lg font-bold">${savedTripTitle}</h4>
                  <p class="mt-2 text-sm text-muted">${savedTripCopy}</p>
                </div>
                <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="${hbState.likedTrip ? "restore-liked" : "open-build"}" type="button">
                  ${hbState.likedTrip ? "Restore this version" : "Start building"}
                </button>
              </div>
              <div class="saved-panel-summary-grid">
                ${restorePointCards.map((item) => `
                  <div class="saved-panel-summary-card">
                    <p class="saved-panel-summary-label">${item.label}</p>
                    <p class="saved-panel-summary-value">${item.value}</p>
                    <p class="saved-panel-summary-copy">${item.copy}</p>
                  </div>
                `).join("")}
              </div>
              </div>

              <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
              <div class="saved-panel-card-head">
                <div class="saved-panel-card-copy">
                  <p class="text-sm font-semibold text-primary">After the trip</p>
                  <h4 class="mt-1 font-display text-lg font-bold">Quick reflection</h4>
                  <p class="mt-2 text-sm text-muted">What felt most like you? What would you change next time? Keep this light and never full of popups.</p>
                </div>
                <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" type="button">
                  Add reflection
                </button>
              </div>
              <div class="saved-panel-summary-grid">
                ${reflectionCards.map((item) => `
                  <div class="saved-panel-summary-card">
                    <p class="saved-panel-summary-label">${item.label}</p>
                    <p class="saved-panel-summary-value">${item.value}</p>
                    <p class="saved-panel-summary-copy">${item.copy}</p>
                  </div>
                `).join("")}
              </div>
              </div>
              ${journalBlock}
            </div>
          </div>
        </div>
      `;

      hbRefs.savedPanel.querySelectorAll("[data-action='open-trip']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          renderTrip();
          hbUtils.setActivePanel("trip-panel");
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='open-booking-hub']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          hbState.tripSectionVisibility = {
            ...(hbState.tripSectionVisibility || {}),
            booking: true
          };
          renderTrip();
          hbUtils.setActivePanel("trip-panel");
          window.setTimeout(() => {
            document.getElementById("trip-booking-hub")?.scrollIntoView({ block: "start", behavior: "smooth" });
          }, 120);
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='open-build']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          hbUtils.setActivePanel("build-panel");
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='save-trip-profile']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          persistTripProfile({ feedback: "Profile saved" });
          renderSavedPanel();
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='save-current-draft']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!hbState.currentTrip) {
            hbState.currentTrip = buildGeneratedTrip();
            hbState.liveDraftTrip = cloneData(hbState.currentTrip);
          }
          persistTripDraft({ feedback: "Draft saved" });
          renderSavedPanel();
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='restore-saved-draft']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          restoreSavedDraft();
          hbUtils.setActivePanel("trip-panel");
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='export-local-backup']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          exportLocalAccountBackup();
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='import-local-backup']").forEach((input) => {
        input.onchange = (event) => {
          const file = event.target?.files?.[0];
          importLocalAccountBackup(file);
          if (event.target) event.target.value = "";
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='restore-liked']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!hbState.likedTrip) return;
          hbState.currentTrip = cloneData(hbState.likedTrip);
          hbState.liveDraftTrip = cloneData(hbState.currentTrip);
          hbState.activeTripSource = {
            type: "live",
            versionId: "",
            name: ""
          };
          hbState.compareVersionId = "";
          renderTrip();
          hbUtils.setActivePanel("trip-panel");
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='restore-live-draft']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          restoreLiveDraft();
          hbUtils.setActivePanel("trip-panel");
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='open-saved-panel-version']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          restoreAlternateVersion(button.dataset.versionId);
          hbUtils.setActivePanel("trip-panel");
        };
      });

      hbRefs.savedPanel.querySelectorAll("[data-action='compare-saved-panel-version']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          hbState.compareVersionId = button.dataset.versionId || "";
          renderTrip();
          hbUtils.setActivePanel("trip-panel");
        };
      });
    }

    function renderTrip() {
      if (!hbState.currentTrip) {
        hbState.currentTrip = buildGeneratedTrip();
      }
      if (!hbState.tripSectionVisibility) {
        hbState.tripSectionVisibility = {
          guide: true,
          versions: false,
          logistics: false,
          flights: false,
          stay: false,
          booking: false,
          journal: false
        };
      }

      if (!hbState.activeTripSource?.type) {
        hbState.activeTripSource = {
          type: "live",
          versionId: "",
          name: ""
        };
      }
      if (hbState.activeTripSource.type === "live" && !hbState.liveDraftTrip) {
        hbState.liveDraftTrip = cloneData(hbState.currentTrip);
      }

      document.getElementById("trip-title").textContent = hbState.currentTrip.title;
      document.getElementById("trip-summary").textContent = hbState.currentTrip.summary;
      document.getElementById("trip-reasoning").textContent = hbState.currentTrip.reasoning;
      const tripQuickFacts = document.getElementById("trip-quick-facts");
      const tripQuickFactsMore = document.getElementById("trip-quick-facts-more");
      const tripQuickFactsToggle = document.getElementById("trip-quick-facts-toggle");
      const tripGuideSource = document.getElementById("trip-guide-source");
      const tripHeroKicker = document.getElementById("trip-hero-kicker");
      if (tripQuickFacts) {
        const quickFacts = buildTripQuickFacts();
        const primaryFacts = quickFacts.filter((item, index) => item.featured || index < 3);
        const secondaryFacts = quickFacts.filter((item, index) => !item.featured && index >= 3);
        const renderFactCard = (item) => `
          <div class="${item.featured ? "sm:col-span-2 xl:col-span-3 rounded-[22px] border border-warm-line bg-warm px-4 py-4 shadow-card" : "rounded-[18px] border border-line bg-surface-soft px-4 py-4"}">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] ${item.featured ? "text-primary" : "text-muted"}">${item.label}</p>
                <p class="mt-2 font-display ${item.featured ? "text-[1.35rem]" : "text-lg"} font-bold leading-tight text-ink">${item.value}</p>
                <p class="trip-quick-fact-detail mt-2 text-sm leading-6 text-muted">${item.detail}</p>
              </div>
              ${item.badge ? `<span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-secondary ring-1 ring-line">${item.badge}</span>` : ""}
            </div>
            ${item.metaChips?.length ? `
              <div class="mt-3 flex flex-wrap gap-2">
                ${item.metaChips.map((chip) => `<span class="rounded-full bg-white px-3 py-2 text-xs font-semibold text-secondary ring-1 ring-line">${chip}</span>`).join("")}
              </div>
            ` : ""}
          </div>
        `;
        tripQuickFacts.innerHTML = primaryFacts.map(renderFactCard).join("");
        if (tripQuickFactsMore) {
          if (secondaryFacts.length) {
            tripQuickFactsMore.innerHTML = secondaryFacts.map(renderFactCard).join("");
            tripQuickFactsMore.hidden = !hbState.tripFactsExpanded;
          } else {
            tripQuickFactsMore.innerHTML = "";
            tripQuickFactsMore.hidden = true;
          }
        }
        if (tripQuickFactsToggle) {
          if (secondaryFacts.length) {
            tripQuickFactsToggle.hidden = false;
            tripQuickFactsToggle.innerHTML = `
              <span>${hbState.tripFactsExpanded ? "Show fewer details" : "More trip details"}</span>
              <span class="material-symbols-outlined" aria-hidden="true">${hbState.tripFactsExpanded ? "remove" : "add"}</span>
            `;
            tripQuickFactsToggle.setAttribute("aria-expanded", hbState.tripFactsExpanded ? "true" : "false");
          } else {
            tripQuickFactsToggle.hidden = true;
            tripQuickFactsToggle.innerHTML = "";
          }
        }
      }
      if (tripGuideSource) {
        const context = hbState.guidePlanContext || {};
        if (context.sourceType) {
          const chips = context.sourceType === "city"
            ? [`Started from ${context.sourceName}`, `Lead area: ${context.suggestedBase}`]
            : [`Started from ${context.sourceName}`, `Likely starting city: ${context.suggestedBase}`];
          tripGuideSource.innerHTML = chips.map((item) => `
            <span class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">${item}</span>
          `).join("");
          tripGuideSource.classList.remove("hidden");
        } else if (getDestinationGuideEntry()) {
          const guide = getDestinationGuideEntry();
          const chips = [`Using ${guide.title} city guide`, `Guide priorities: ${guide.highlights.slice(0, 2).join(" + ")}`];
          tripGuideSource.innerHTML = chips.map((item) => `
            <span class="rounded-full bg-surface-soft px-3 py-2 text-sm font-medium text-ink ring-1 ring-line">${escapeHtml(item)}</span>
          `).join("");
          tripGuideSource.classList.remove("hidden");
        } else {
          tripGuideSource.classList.add("hidden");
          tripGuideSource.innerHTML = "";
        }
      }
      renderTripDraftStatus();
      renderTripChangeSummary();
      renderTripNextActions();
      renderTripReadinessPanel();
      renderTripHandoffPanel();
      renderTripDayOverview();
      hbUtils.renderDestinationHero("trip");
      if (tripHeroKicker) {
        tripHeroKicker.textContent = hbState.guidePlanContext?.sourceType ? "Guide-led destination" : "Destination preview";
      }
      document.getElementById("signature-title").textContent = hbState.currentTrip.signature.title;
      document.getElementById("signature-reason").textContent = hbState.currentTrip.signature.reason;
      hbState.currentTrip.flightCard = buildFlightCard();
      hbState.currentTrip.stayCard = buildStayCard(getCityName());
      document.getElementById("flight-title").textContent = hbState.currentTrip.flightCard.title;
      document.getElementById("flight-copy").textContent = hbState.currentTrip.flightCard.copy;
      document.getElementById("stay-title").textContent = hbState.currentTrip.stayCard.title;
      document.getElementById("stay-copy").textContent = hbState.currentTrip.stayCard.copy;
      const flightMeta = document.getElementById("flight-meta");
      if (flightMeta) {
        flightMeta.innerHTML = (hbState.currentTrip.flightCard.meta || []).map((item) => `
          <div class="trip-support-meta-card">
            <p class="trip-support-meta-label">${item.label}</p>
            <p class="trip-support-meta-value">${item.value}</p>
            <p class="trip-support-meta-copy">${item.copy}</p>
          </div>
        `).join("");
      }
      const flightChips = document.getElementById("flight-chips");
      if (flightChips) {
        flightChips.innerHTML = (hbState.currentTrip.flightCard.chips || []).map((chip) => `
          <span class="rounded-full bg-white px-3 py-2 text-xs font-semibold text-secondary ring-1 ring-line">${chip}</span>
        `).join("");
      }
      const stayMeta = document.getElementById("stay-meta");
      if (stayMeta) {
        stayMeta.innerHTML = (hbState.currentTrip.stayCard.meta || []).map((item) => `
          <div class="trip-support-meta-card">
            <p class="trip-support-meta-label">${item.label}</p>
            <p class="trip-support-meta-value">${item.value}</p>
            <p class="trip-support-meta-copy">${item.copy}</p>
          </div>
        `).join("");
      }
      const stayTradeoffs = document.getElementById("stay-tradeoffs");
      if (stayTradeoffs) {
        stayTradeoffs.innerHTML = (hbState.currentTrip.stayCard.tradeoffs || []).map((chip) => `
          <span class="rounded-full bg-white px-3 py-2 text-xs font-semibold text-secondary ring-1 ring-line">${chip}</span>
        `).join("");
      }
      const stayRecommendations = document.getElementById("stay-recommendations");
      if (stayRecommendations) {
        stayRecommendations.innerHTML = (hbState.currentTrip.stayCard.recommendations || []).map((item) => `
          <div class="rounded-[18px] border border-line bg-white px-4 py-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">${item.label}</p>
                <p class="mt-2 font-display text-lg font-bold text-ink">${item.area}</p>
                <p class="mt-2 text-sm leading-6 text-muted">${item.copy}</p>
              </div>
              <span class="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-secondary">Stay fit</span>
            </div>
          </div>
        `).join("");
      }
      hbUtils.renderCountryGuide("trip");
      renderTripDestinationDepth();
      const flightGoogleLink = document.getElementById("flight-google-link");
      const stayGoogleLink = document.getElementById("stay-google-link");
      const stayGoogleFrame = document.getElementById("stay-google-frame");
      if (flightGoogleLink) {
        flightGoogleLink.href = buildGoogleFlightsUrl();
      }
      if (stayGoogleLink) {
        stayGoogleLink.href = buildGoogleHotelsUrl(getCityName(), hbState.appState.hotelArea || hbState.currentTrip.days?.[0]?.area || "");
      }
      if (stayGoogleFrame) {
        const stayQuery = hbState.appState.hotelName
          ? `${hbState.appState.hotelName}, ${hbState.appState.destination}`
          : `${hbState.appState.hotelArea || hbState.currentTrip.days?.[0]?.area || getCityName()} hotels, ${hbState.appState.destination}`;
        stayGoogleFrame.src = buildGoogleMapEmbedUrl(stayQuery);
      }
      renderBookingHub();
      syncTripLogisticsInputs();
      updateJournalPreview();
      syncTripSection("guide", { fallback: true });
      syncTripSection("versions");
      syncTripSection("logistics");
      syncTripSection("flights");
      syncTripSection("stay");
      syncTripSection("booking");
      syncTripSection("journal");

      const likedBanner = hbState.likedTrip
        ? `
          <div class="mt-4 rounded-[22px] border border-line bg-surface-soft px-4 py-4">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Saved version</p>
                <p class="mt-1 text-sm text-ink">You marked a version you liked. You can restore it anytime if this draft drifts too far.</p>
              </div>
              <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="restore-liked" type="button">
                Restore this version
              </button>
            </div>
          </div>
        `
        : `
          <div class="mt-4 flex justify-end">
            <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="save-liked" type="button">
              This looks good
            </button>
          </div>
        `;

      const existingBanner = document.getElementById("liked-banner-slot");
      if (existingBanner) existingBanner.remove();
      document.getElementById("signature-reason").closest(".mt-5").insertAdjacentHTML("afterend", `<div id="liked-banner-slot">${likedBanner}</div>`);

      const alternateVersionsList = document.getElementById("alternate-versions-list");
      const alternateCompareSlot = document.getElementById("alternate-compare-slot");
      const alternateVersionHelper = document.getElementById("alternate-version-helper");
      const alternateVersionSuggestions = document.getElementById("alternate-version-suggestions");
      const alternateVersionFeedback = document.getElementById("alternate-version-feedback");
      const alternateVersionSaveButton = document.getElementById("alternate-version-save-button");
      const unsavedArrangementCue = document.getElementById("unsaved-arrangement-cue");
      const tripViewSourceSlot = document.getElementById("trip-view-source");
      const compareVersion = hbState.alternateTrips.find((item) => item.id === hbState.compareVersionId);
      const compareSubject = hbState.activeTripSource?.type === "saved"
        && hbState.compareVersionId
        && hbState.compareVersionId === hbState.activeTripSource.versionId
        && hbState.liveDraftTrip
        ? {
            id: "live-draft",
            name: "Live draft",
            trip: hbState.liveDraftTrip,
            sourceType: "live"
          }
        : compareVersion
          ? {
              ...compareVersion,
              sourceType: "saved"
            }
          : null;
      const dayMovementDiff = compareSubject ? buildDayMovementDiff(hbState.currentTrip, compareSubject.trip) : [];

      if (tripViewSourceSlot) {
        if (hbState.activeTripSource?.type === "saved") {
          tripViewSourceSlot.classList.remove("hidden");
          tripViewSourceSlot.innerHTML = `
            <div class="version-card is-restore">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Viewing saved arrangement</p>
                  <div class="mt-2 flex flex-wrap items-center gap-2">
                    <p class="font-display text-lg font-bold">${hbState.activeTripSource.name || "Saved version"}</p>
                    <span class="version-status-chip is-viewing">Viewing saved arrangement</span>
                  </div>
                  <p class="mt-2 text-sm leading-6 text-muted">You are looking at a saved arrangement right now. Return to the live draft anytime, or compare this against it before deciding what to keep.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button class="version-action is-viewing rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="restore-live-draft" type="button">Return to live draft</button>
                  <button class="version-action is-compare rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="compare-active-saved-version" data-version-id="${hbState.activeTripSource.versionId || ""}" type="button">Compare with live draft</button>
                </div>
              </div>
            </div>
          `;
        } else {
          tripViewSourceSlot.classList.add("hidden");
          tripViewSourceSlot.innerHTML = "";
        }
      }

      if (alternateVersionHelper) {
        alternateVersionHelper.textContent = hbState.alternateTrips.length
          ? "Save a new version whenever your edits start heading in a different direction you may want to revisit."
          : "If this arrangement feels worth keeping, save it with a clear name so you can compare it to the live draft later.";
      }

      if (alternateVersionSuggestions) {
        alternateVersionSuggestions.innerHTML = buildSuggestedVersionNames().map((suggestion) => `
          <button class="save-version-suggestion" data-action="fill-alternate-version-name" data-version-name="${suggestion}" type="button">
            ${suggestion}
          </button>
        `).join("");
      }

      if (alternateVersionFeedback) {
        const feedback = hbState.alternateVersionFeedback;
        if (feedback?.id) {
          alternateVersionFeedback.classList.remove("hidden");
          alternateVersionFeedback.innerHTML = `
            <div class="save-version-feedback">
              <p class="save-version-feedback-title">Saved as "${feedback.name}"</p>
              <p class="save-version-feedback-copy">This version was saved ${feedback.savedAt}. You can view it now or compare it with the live draft below.</p>
              ${feedback.fromUnsavedEdits ? `<p class="save-version-feedback-copy">Saved from unsaved edits, so this reordered version is now safely kept as its own arrangement.</p>` : ""}
              <div class="save-version-feedback-actions">
                <button class="version-action is-neutral rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="open-just-saved-version" data-version-id="${feedback.id}" type="button">
                  View saved arrangement
                </button>
                <button class="version-action is-compare rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="compare-just-saved-version" data-version-id="${feedback.id}" type="button">
                  Compare now
                </button>
              </div>
              <p class="save-version-feedback-hint">Esc to dismiss</p>
            </div>
          `;
        } else {
          alternateVersionFeedback.classList.add("hidden");
          alternateVersionFeedback.innerHTML = "";
        }
      }

      if (alternateVersionSaveButton) {
        alternateVersionSaveButton.textContent = hbState.alternateTrips.length ? "Save another version" : "Save this version";
        alternateVersionSaveButton.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          saveAlternateVersion(hbRefs.formBindings.alternateVersionName?.value || "");
        };
      }

      if (hbRefs.formBindings.alternateVersionName) {
        hbRefs.formBindings.alternateVersionName.onkeydown = (event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          saveAlternateVersion(hbRefs.formBindings.alternateVersionName?.value || "");
        };
      }

      if (unsavedArrangementCue) {
        if (hbState.unsavedArrangement?.dirty) {
          unsavedArrangementCue.classList.remove("hidden");
          unsavedArrangementCue.innerHTML = `
            <div class="unsaved-arrangement-cue">
              <p class="unsaved-arrangement-title">Unsaved arrangement edits</p>
              <p class="unsaved-arrangement-copy">${hbState.unsavedArrangement.message || "You changed the itinerary order. Save this arrangement if you may want to compare it later."}</p>
            </div>
          `;
        } else {
          unsavedArrangementCue.classList.add("hidden");
          unsavedArrangementCue.innerHTML = "";
        }
      }

      if (alternateCompareSlot) {
        if (compareSubject) {
          alternateCompareSlot.classList.remove("hidden");
          const currentSourceLabel = getActiveTripLabel();
          const currentSourceChip = hbState.activeTripSource?.type === "saved" ? "Viewing saved arrangement" : "Live draft";
          const compareContextLine = `Current: ${currentSourceLabel} • Compared: ${compareSubject.name}`;
          const movedCount = dayMovementDiff.filter((item) => item.moved).length;
          const stayedCount = dayMovementDiff.length - movedCount;
          alternateCompareSlot.innerHTML = `
            <div class="compare-shell">
              <div class="compare-shell-header">
                <div>
                  <p class="compare-shell-kicker">Version comparison</p>
                  <h5 class="compare-shell-title">Compare arrangements</h5>
                  <p class="compare-shell-context">${compareContextLine}</p>
                  <p class="compare-shell-intro">Look at both arrangements side by side, then decide whether the live draft still feels best or whether the saved version is the better shape for this trip.</p>
                </div>
                <div class="compare-shell-actions">
                  ${hbState.activeTripSource?.type === "saved" ? `<button class="version-action is-viewing rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="restore-live-draft" type="button">Return to live draft</button>` : ""}
                  <button class="version-action is-neutral rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="clear-alternate-compare" type="button">Close</button>
                </div>
              </div>
              <div class="compare-shell-section">
                <div class="compare-shell-section-head">
                  <div>
                    <p class="compare-shell-section-kicker">Sides</p>
                    <p class="compare-shell-section-copy">Start here if you want a quick read on which arrangement you are editing and which one you are using for comparison.</p>
                  </div>
                </div>
                <div class="compare-shell-summary sm:grid-cols-2">
                  <div class="compare-shell-summary-card">
                    <p class="compare-shell-summary-label">Current arrangement</p>
                    <p class="compare-shell-summary-value">${currentSourceLabel}</p>
                    <p class="compare-shell-summary-copy">This is the version you are actively looking at right now.</p>
                  </div>
                  <div class="compare-shell-summary-card">
                    <p class="compare-shell-summary-label">Compared arrangement</p>
                    <p class="compare-shell-summary-value">${compareSubject.name}</p>
                    <p class="compare-shell-summary-copy">Use this side as the reference point before you decide which direction feels better.</p>
                  </div>
                </div>
              </div>
              <div class="compare-shell-section">
                <div class="compare-shell-section-head">
                  <div>
                    <p class="compare-shell-section-kicker">Trip summaries</p>
                    <p class="compare-shell-section-copy">These summaries give you the high-level feel of each arrangement before you get into day-by-day changes.</p>
                  </div>
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                <div class="compare-column version-card is-current">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Current arrangement</p>
                  <div class="mt-2 flex flex-wrap items-center gap-2">
                    <p class="font-display text-lg font-bold">${hbState.currentTrip.title}</p>
                    <span class="version-status-chip ${hbState.activeTripSource?.type === "saved" ? "is-viewing" : "is-active"}">${currentSourceChip}</span>
                  </div>
                  <p class="mt-2 text-sm leading-6 text-muted">${getTripArrangementSummary(hbState.currentTrip)}</p>
                  <p class="mt-2 text-sm leading-6 text-muted"><span class="font-semibold text-ink">Changes:</span> ${escapeHtml(getTripChangeSummary(hbState.currentTrip, "No day feedback yet."))}</p>
                </div>
                <div class="compare-column version-card is-compare-active">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Compared arrangement</p>
                  <div class="mt-2 flex flex-wrap items-center gap-2">
                    <p class="font-display text-lg font-bold">${compareSubject.trip.title}</p>
                    <span class="version-status-chip ${compareSubject.sourceType === "live" ? "is-active" : "is-soft"}">${compareSubject.sourceType === "live" ? "Live draft" : "Saved version"}</span>
                  </div>
                  <p class="mt-2 text-sm leading-6 text-muted">${getTripArrangementSummary(compareSubject.trip)}</p>
                  <p class="mt-2 text-sm leading-6 text-muted"><span class="font-semibold text-ink">Changes:</span> ${escapeHtml(getTripChangeSummary(compareSubject.trip, "No day feedback saved with this version."))}</p>
                </div>
              </div>
              </div>
              <div class="compare-shell-section">
                <div class="compare-shell-section-head">
                  <div>
                    <p class="compare-shell-section-kicker">What changed</p>
                    <p class="compare-shell-section-copy">Use this to spot whether the trip stayed mostly intact or whether the day order changed in a more noticeable way.</p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span class="rounded-full bg-warm px-3 py-1 text-xs font-semibold text-primary">Moved</span>
                    <span class="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-tertiary">Stayed</span>
                  </div>
                </div>
                <div class="compare-movement-summary">
                  <span class="compare-movement-pill is-moved">${movedCount} ${movedCount === 1 ? "day moved" : "days moved"}</span>
                  <span class="compare-movement-pill is-stayed">${stayedCount} ${stayedCount === 1 ? "day stayed put" : "days stayed put"}</span>
                </div>
                <div class="movement-card-grid">
                  ${dayMovementDiff.map((item) => `
                    <div class="movement-card ${item.moved ? "is-moved" : "is-stayed"}">
                      <div class="flex items-start justify-between gap-3">
                        <div>
                          <p class="font-display text-lg font-bold text-ink">${item.currentLabel}</p>
                          <p class="mt-1 text-sm leading-6 text-muted">${item.currentArea}</p>
                          <p class="mt-2 text-sm font-semibold ${item.moved ? "text-primary" : "text-tertiary"}">${getMovementSummary(item)}</p>
                        </div>
                        <span class="version-status-chip ${item.moved ? "is-soft" : "is-stable"} ring-1 ring-line">
                          ${item.moved ? "Moved" : "Stayed"}
                        </span>
                      </div>
                      <div class="mt-3 grid gap-2 sm:grid-cols-2">
                        <div class="movement-card-slot">
                          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Current arrangement</p>
                          <p class="mt-2 text-sm font-semibold text-ink">Position ${item.currentIndex + 1}</p>
                          <p class="mt-1 text-sm leading-6 text-muted">${item.currentLabel} • ${item.currentArea}</p>
                        </div>
                        <div class="movement-card-slot">
                          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${compareSubject.name}</p>
                          <p class="mt-2 text-sm font-semibold text-ink">${typeof item.compareIndex === "number" ? `Position ${item.compareIndex + 1}` : "Not in saved version"}</p>
                          <p class="mt-1 text-sm leading-6 text-muted">${item.compareLabel} • ${item.compareArea}</p>
                        </div>
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>
            </div>
          `;
        } else {
          alternateCompareSlot.classList.add("hidden");
          alternateCompareSlot.innerHTML = "";
        }
      }

      if (alternateVersionsList) {
        alternateVersionsList.innerHTML = hbState.alternateTrips.length
          ? hbState.alternateTrips.map((version) => `
              <div class="version-card ${hbState.compareVersionId === version.id ? "is-compare-active" : ""} ${hbState.alternateVersionFeedback?.id === version.id ? "is-just-saved" : ""}">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <p class="font-display text-lg font-bold">${version.name}</p>
                      ${hbState.activeTripSource?.type === "saved" && hbState.activeTripSource.versionId === version.id
                        ? `<span class="version-status-chip is-viewing">Viewing now</span>`
                        : hbState.compareVersionId === version.id
                          ? `<span class="version-status-chip is-compare">Compare active</span>`
                          : `<span class="version-status-chip is-soft">Saved arrangement</span>`}
                    </div>
                    <p class="version-card-meta mt-1">Saved ${version.savedAt}</p>
                    <p class="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Arrangement summary</p>
                    <p class="mt-2 text-sm leading-6 text-muted">${getTripArrangementSummary(version.trip)}</p>
                    <p class="mt-2 text-sm leading-6 text-muted"><span class="font-semibold text-ink">Changes:</span> ${escapeHtml(version.changeSummary || getTripChangeSummary(version.trip, "No day feedback saved with this version."))}</p>
                    <p class="version-card-action-help">${hbState.activeTripSource?.type === "saved" && hbState.activeTripSource.versionId === version.id ? "You are inside this saved arrangement right now. Return to the live draft to keep shaping the working version, or compare it before deciding what to keep." : "View moves the editor into this saved arrangement. Compare keeps your current side visible and shows both arrangements together."}</p>
                  </div>
                  <div class="version-card-actions-shell">
                    <p class="version-card-actions-label">${hbState.activeTripSource?.type === "saved" && hbState.activeTripSource.versionId === version.id ? "Viewing now" : hbState.compareVersionId === version.id ? "Compare active" : "Choose an action"}</p>
                    <div class="version-card-actions">
                      <button class="version-action ${hbState.activeTripSource?.type === "saved" && hbState.activeTripSource.versionId === version.id ? "is-viewing" : "is-neutral"} rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="${hbState.activeTripSource?.type === "saved" && hbState.activeTripSource.versionId === version.id ? "restore-live-draft" : "open-trip-panel-version"}" data-version-id="${version.id}" type="button">${hbState.activeTripSource?.type === "saved" && hbState.activeTripSource.versionId === version.id ? "Return to live draft" : "View arrangement"}</button>
                      <button class="version-action is-compare rounded-full px-4 py-2 text-sm font-semibold ring-1 ${hbState.compareVersionId === version.id ? "is-active bg-surface-soft text-secondary ring-line" : "bg-surface-soft text-secondary ring-line"}" data-action="compare-trip-panel-version" data-version-id="${version.id}" type="button">${hbState.compareVersionId === version.id ? "Compare active" : hbState.activeTripSource?.type === "saved" && hbState.activeTripSource.versionId === version.id ? "Compare with live draft" : "Compare with current trip"}</button>
                    </div>
                  </div>
                </div>
              </div>
            `).join("")
          : `
            <div class="alternate-empty-state">
              <p class="alternate-empty-title">No saved arrangements yet</p>
              <p class="alternate-empty-copy">Save a named version here first, then each card below will let you either <span class="font-semibold text-ink">view it</span> or <span class="font-semibold text-ink">compare it</span> against the live draft.</p>
            </div>
          `;
      }

      document.querySelectorAll("[data-action='open-just-saved-version']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          const versionId = button.dataset.versionId || hbState.alternateVersionFeedback?.id || "";
          if (!versionId) return;
          clearAlternateVersionFeedback();
          restoreAlternateVersion(versionId);
        };
      });

      document.querySelectorAll("[data-action='compare-just-saved-version']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          clearAlternateVersionFeedback();
          compareAlternateVersion(button.dataset.versionId || hbState.alternateVersionFeedback?.id || "", { preferLiveDraft: true });
        };
      });

      document.querySelectorAll("[data-action='open-trip-panel-version']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          restoreAlternateVersion(button.dataset.versionId);
        };
      });

      document.querySelectorAll("[data-action='compare-trip-panel-version']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          compareAlternateVersion(button.dataset.versionId || "");
        };
      });

      document.querySelectorAll("[data-action='compare-active-saved-version']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (hbState.activeTripSource?.versionId) {
            compareAlternateVersion(hbState.activeTripSource.versionId, { preferLiveDraft: true });
          }
        };
      });

      document.querySelectorAll("[data-action='restore-live-draft']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          restoreLiveDraft();
        };
      });

      document.querySelectorAll("[data-action='clear-alternate-compare']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          hbState.compareVersionId = "";
          renderTrip();
        };
      });

      hbState.currentTrip.days.forEach((day, index) => {
        if (typeof day.expanded !== "boolean") {
          day.expanded = index === 0;
        }
      });

      document.getElementById("trip-days").innerHTML = hbState.currentTrip.days.map((day, index) => `
        <article class="trip-day-card trip-day-shell rounded-[26px] border p-4 shadow-card ${hbState.currentTripMapQuery === day.id ? "is-map-active border-secondary/50 bg-blue-soft/30" : "border-line"}" data-day-id="${day.id}" draggable="true" tabindex="0" role="button" aria-label="Focus ${day.dayLabel} on the trip map">
          <div class="trip-day-header">
            <div class="trip-day-header-copy">
              <p class="trip-day-kicker">${day.dayLabel} • ${day.date}</p>
              <h4 class="trip-day-title mt-1 font-display text-xl font-bold">${day.title}</h4>
              <div class="trip-day-stats mt-3">
                <div class="trip-day-stat-pill">
                  <span class="trip-day-stat-label">Starts</span>
                  <span class="trip-day-stat-value">${day.item.timeline?.[0]?.time || "Flexible"}</span>
                </div>
                <div class="trip-day-stat-pill">
                  <span class="trip-day-stat-label">Ends</span>
                  <span class="trip-day-stat-value">${day.item.timeline?.[day.item.timeline.length - 1]?.time || "Open"}</span>
                </div>
                <div class="trip-day-stat-pill">
                  <span class="trip-day-stat-label">Stops</span>
                  <span class="trip-day-stat-value">${day.item.timeline?.length || 0}</span>
                </div>
              </div>
              <div class="trip-day-why-strip mt-3">
                <p class="trip-day-section-label">Why this day makes sense</p>
                <p class="trip-day-meta mt-2">${day.rationale}</p>
              </div>
            </div>
            <div class="trip-day-header-actions">
              <span class="trip-day-chip trip-day-chip--ghost">Move day</span>
              <span class="trip-day-chip trip-day-chip--pace ${index === 2 ? "is-warm" : "is-cool"}">${day.pace}</span>
              ${hbState.currentTripMapQuery === day.id ? `<span class="trip-map-linked-note">Map is focused here</span>` : ""}
              <button class="trip-day-open-button rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="toggle-day" data-day-id="${day.id}" type="button">
                ${day.expanded ? "Close day" : "Open day"}
              </button>
            </div>
          </div>

          <div class="trip-day-facts mt-4 grid grid-cols-2 gap-3 text-sm lg:grid-cols-2">
            <div class="trip-day-fact-card trip-day-fact-card--area rounded-2xl bg-surface-soft px-3 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Area</p>
              <p class="mt-2 font-medium">${day.area}</p>
            </div>
            <div class="trip-day-fact-card trip-day-fact-card--highlight rounded-2xl bg-surface-soft px-3 py-3">
              <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Main highlight</p>
              <p class="mt-2 font-medium">${day.highlight}</p>
            </div>
          </div>

          <div class="trip-day-confidence mt-3">
            <p class="trip-day-confidence-label">Planning confidence</p>
            <div class="trip-day-confidence-list">
              ${buildDayConfidenceSignals(day).map((signal) => `
                <span>${escapeHtml(signal)}</span>
              `).join("")}
            </div>
          </div>

          <div class="trip-day-edit-hint mt-3">
            <span class="material-symbols-outlined" aria-hidden="true">edit_calendar</span>
            <p>Fine-tune gently: move the day, try a nearby alternative, lighten the plan, or adjust stop timing after opening the schedule.</p>
          </div>

          <div class="trip-day-section trip-day-section--summary mt-4">
            ${day.item.removed ? `
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="trip-day-section-label">Summary</p>
                  <p class="text-sm font-semibold text-ink">This stop was removed</p>
                  <p class="mt-2 text-sm leading-6 text-muted">You can keep the day lighter, or restore it if you want it back.</p>
                </div>
                <button class="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="undo-item" data-day-id="${day.id}" type="button">
                  Undo
                </button>
              </div>
            ` : `
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="trip-day-section-label">Day snapshot</p>
                  <div class="flex flex-wrap items-center gap-2">
                    <p class="trip-heading trip-day-plan-title mt-2 text-xl text-ink">${day.item.title}</p>
                    <span class="rounded-full ${index === 1 ? "bg-teal-soft text-tertiary" : "bg-blue-soft text-secondary"} px-3 py-1 text-xs font-semibold">${day.item.label}</span>
                  </div>
                </div>
              </div>
              <div class="trip-day-summary-grid mt-3">
                <div class="trip-day-summary-card trip-day-summary-card--plan">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Plan</p>
                  <p class="trip-day-overview-copy mt-2">${day.item.body}</p>
                </div>
                <div class="trip-day-summary-card trip-day-summary-card--fit">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Why it fits</p>
                  <p class="trip-day-overview-copy mt-2">${day.item.fit}</p>
                </div>
              </div>
              ${renderDayProtectedAnchorStrip(day, index, hbState.currentTrip.days.length)}
              ${renderDayGuideMustHaveCards(day, index, hbState.currentTrip.days.length)}
              ${renderDayQualityControls(day, index, hbState.currentTrip.days.length)}
              <div class="trip-day-planner-notes mt-3">
                ${buildDayPlanningNotes(day, index, hbState.currentTrip.days.length).map((note) => `
                  <div class="trip-day-note-card">
                    <span class="material-symbols-outlined" aria-hidden="true">${note.icon}</span>
                    <div>
                      <p class="trip-day-note-label">${escapeHtml(note.label)}</p>
                      <p class="trip-day-note-copy">${escapeHtml(note.copy)}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
              <div class="trip-day-meta-row mt-3">
                <div class="trip-day-meta-pill trip-day-meta-pill--note">
                  <span class="trip-day-meta-pill-label">Good to know</span>
                  <span class="trip-day-meta-pill-value">${day.weather}</span>
                </div>
              </div>
              ${!day.expanded ? `
                <div class="trip-day-preview-strip mt-4">
                  ${day.item.timeline.slice(0, 2).map((step) => `
                    <div class="trip-day-preview-item">
                      <span class="trip-day-preview-time">${step.time}</span>
                      <span class="trip-day-preview-title">${step.title}</span>
                    </div>
                  `).join("")}
                  ${day.item.timeline.length > 2 ? `
                    <div class="trip-day-preview-more">
                      +${day.item.timeline.length - 2} more stop${day.item.timeline.length - 2 === 1 ? "" : "s"}
                    </div>
                  ` : ""}
                </div>
              ` : ""}
              ${day.expanded ? `
                <div class="trip-day-section trip-day-section--schedule mt-4">
                  <div class="trip-day-schedule-head">
                    <div>
                      <p class="trip-day-section-label">Schedule</p>
                      <p class="trip-day-schedule-copy mt-1 text-sm leading-6 text-muted">A clear flow for the day, with timing cues you can still adjust.</p>
                    </div>
                    <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-secondary ring-1 ring-line">Editable</span>
                  </div>
                  <div class="mt-4 space-y-4">
                    ${day.item.timeline.map((step, stepIndex) => `
                      <div class="timeline-step grid grid-cols-1 gap-3 rounded-[18px] px-2 py-2 transition sm:grid-cols-[118px_1fr] lg:grid-cols-[128px_1fr] sm:gap-4 ${hbState.currentTripMapQuery === day.id && hbState.currentTripMapStepIndex === stepIndex ? "is-map-focused bg-white ring-1 ring-secondary/35" : "hover:bg-white/70"}" data-day-id="${day.id}" data-step-index="${stepIndex}" draggable="true" tabindex="0" role="button" aria-label="Focus ${step.title} on the trip map">
                        <div class="timeline-step-rail">
                          <div class="timeline-time-chip">
                            <div class="timeline-time">${step.time}</div>
                          </div>
                          <div class="timeline-step-kind ${getTimelineStepVisual(step).accent}">
                            <span class="material-symbols-outlined text-[1rem]">${getTimelineStepVisual(step).icon}</span>
                            <span>${getTimelineStepVisual(step).label}</span>
                          </div>
                        </div>
                        <div class="timeline-step-shell">
                          <div class="trip-day-step-head">
                            <div class="timeline-step-copy-block">
                              <p class="timeline-title">${step.title}</p>
                              <p class="timeline-copy timeline-step-copy mt-2">${step.copy}</p>
                              ${renderTimelineAnchorBadges(step, day, index, hbState.currentTrip.days.length, stepIndex)}
                              ${hbState.currentTripMapQuery === day.id && hbState.currentTripMapStepIndex === stepIndex ? `<span class="timeline-focus-chip is-active">On the map</span>` : ""}
                            </div>
                            <div class="trip-day-step-actions">
                              <button class="timeline-map-button rounded-full bg-white px-3 py-1 text-xs font-semibold text-secondary ring-1 ring-line ${hbState.currentTripMapQuery === day.id && hbState.currentTripMapStepIndex === stepIndex ? "is-active" : ""}" data-action="focus-trip-step" data-day-id="${day.id}" data-step-index="${stepIndex}" type="button">
                                ${hbState.currentTripMapQuery === day.id && hbState.currentTripMapStepIndex === stepIndex ? "On map" : "Show on map"}
                              </button>
                              <div class="timeline-step-order-toggle" role="group" aria-label="Adjust timing order">
                                <button class="timeline-step-order-button" data-action="move-timeline-step" data-day-id="${day.id}" data-step-index="${stepIndex}" data-direction="-1" ${stepIndex === 0 ? "disabled" : ""} type="button">
                                  Earlier
                                </button>
                                <button class="timeline-step-order-button" data-action="move-timeline-step" data-day-id="${day.id}" data-step-index="${stepIndex}" data-direction="1" ${stepIndex === day.item.timeline.length - 1 ? "disabled" : ""} type="button">
                                  Later
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ""}
              <div class="trip-day-section trip-day-section--actions mt-4">
                <div class="trip-day-actions">
                  <div class="trip-day-actions-copy">
                    <p class="trip-day-section-label">Edit this day</p>
                    <p class="mt-2 text-sm leading-6 text-muted">Try a nearby alternative, make the day lighter, or keep it focused on the map while you review the route.</p>
                  </div>
                  <div class="trip-day-actions-buttons">
                    <button class="trip-day-map-button trip-day-map-button--footer rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line ${hbState.currentTripMapQuery === day.id ? "is-active" : ""}" data-action="focus-trip-map" data-day-id="${day.id}" type="button">
                      ${hbState.currentTripMapQuery === day.id ? "Focused on map" : "Show day on map"}
                    </button>
                    <div class="trip-day-edit-toggle" role="group" aria-label="Edit this day">
                      <button class="trip-day-edit-button" data-action="swap-item" data-day-id="${day.id}" type="button">
                        Try alternate
                      </button>
                      <button class="trip-day-edit-button is-muted" data-action="remove-item" data-day-id="${day.id}" type="button">
                        Make lighter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `}
          </div>
        </article>
      `).join("");

      renderTripMap();
      renderSavedPanel();
    }

    function findDay(dayId) {
      return hbState.currentTrip?.days.find((day) => day.id === dayId);
    }

    function findDayIndex(dayId) {
      return hbState.currentTrip?.days?.findIndex((day) => day.id === dayId) ?? -1;
    }

    function stepMatchesProtectedAnchor(step, day, dayIndex) {
      const totalDays = hbState.currentTrip?.days?.length || 1;
      return getTimelineProtectedAnchors(step, day, getDayProtectedAnchors(day, dayIndex, totalDays), 0).length > 0;
    }

    function setDayQualityAdjustment(day, feedback, title, copy, icon = "auto_fix_high") {
      day.qualityAdjustment = {
        feedback,
        title,
        copy,
        icon,
        updatedAt: Date.now()
      };
    }

    function removeLowestPriorityStep(day, dayIndex) {
      const timeline = day.item?.timeline || [];
      if (timeline.length <= 3) return null;

      for (let index = timeline.length - 1; index >= 0; index -= 1) {
        const step = timeline[index];
        const stepText = `${step.title || ""} ${step.copy || ""}`.toLowerCase();
        const protectedStep = stepMatchesProtectedAnchor(step, day, dayIndex);
        const structuralStep = /arrival|hotel|check-?in|flight|departure/.test(stepText);
        if (!protectedStep && !structuralStep) {
          const [removed] = timeline.splice(index, 1);
          day.removedTimelineSteps = [...(day.removedTimelineSteps || []), removed];
          return removed;
        }
      }

      return null;
    }

    function addFlexibleFollowThrough(day) {
      const timeline = day.item?.timeline || [];
      if (timeline.length >= 6) return null;
      const exists = timeline.some((step) => /flexible follow-through|open local time/i.test(`${step.title || ""} ${step.copy || ""}`));
      if (exists) return null;

      const step = {
        time: "4:30 PM",
        title: `Flexible follow-through in ${day.area}`,
        copy: `Add one nearby stop, cafe, view, or short walk that supports ${day.highlight || day.area} without moving the day away from its protected anchors.`
      };
      const insertAt = Math.max(1, timeline.length - 1);
      timeline.splice(insertAt, 0, step);
      return step;
    }

    function applyWrongAreaAdjustment(day) {
      if (!day.item?.alternatives?.length) return false;
      const next = day.item.alternatives[day.item.alternativeIndex % day.item.alternatives.length];
      const currentSnapshot = {
        title: day.item.title,
        body: day.item.body,
        fit: day.item.fit,
        label: day.item.label
      };
      day.item.title = next.title;
      day.item.body = `${next.body} The protected moments stay in the plan, but the day is treated as easier to reshape around nearby stops.`;
      day.item.fit = `${next.fit} This is a better review version if the original area or flow felt off.`;
      day.item.label = "Area adjusted";
      day.item.alternatives[day.item.alternativeIndex % day.item.alternatives.length] = currentSnapshot;
      day.item.alternativeIndex += 1;
      return true;
    }

    function adjustDayQuality(dayId, feedback) {
      const day = findDay(dayId);
      const dayIndex = findDayIndex(dayId);
      if (!day || dayIndex < 0) return;

      const protectedSummary = getProtectedAnchorSummary(day, dayIndex, hbState.currentTrip?.days?.length || 1);
      let message = "";

      if (feedback === "too-full") {
        const removed = removeLowestPriorityStep(day, dayIndex);
        setDayQualityAdjustment(
          day,
          feedback,
          removed ? "Made this day lighter" : "Kept the protected plan intact",
          removed
            ? `Removed ${removed.title}, but kept ${protectedSummary} protected so the day has more breathing room.`
            : `This day is already tight around ${protectedSummary}, so no lower-priority stop was removed.`,
          "remove_circle"
        );
        message = `You made ${day.dayLabel} lighter while keeping protected must-haves visible.`;
      }

      if (feedback === "too-light") {
        const added = addFlexibleFollowThrough(day);
        setDayQualityAdjustment(
          day,
          feedback,
          added ? "Added one flexible stop" : "Kept this day flexible",
          added
            ? `Added ${added.title} as optional follow-through while keeping ${protectedSummary} as the main reason for the day.`
            : `This day already has enough stops, so ${protectedSummary} stays protected without adding filler.`,
          "add_circle"
        );
        message = `You added more depth to ${day.dayLabel} without crowding the protected moments.`;
      }

      if (feedback === "wrong-area") {
        const adjusted = applyWrongAreaAdjustment(day);
        setDayQualityAdjustment(
          day,
          feedback,
          adjusted ? "Reframed the day" : "Marked area for review",
          adjusted
            ? `Switched the day framing and kept ${protectedSummary} as the anchor, so the itinerary can be reshaped without losing what matters.`
            : `Keep ${protectedSummary}, then review the map and nearby stops before saving this day.`,
          "near_me"
        );
        message = `You asked to rethink ${day.dayLabel}'s area while keeping must-haves protected.`;
      }

      if (feedback === "keep-this") {
        setDayQualityAdjustment(
          day,
          feedback,
          "Marked as a keeper",
          `This day is marked to keep because ${protectedSummary} fits the route and should not be softened without a reason.`,
          "check_circle"
        );
        message = `You marked ${day.dayLabel} as a keeper.`;
      }

      if (!message) return;
      day.expanded = true;
      markUnsavedArrangement(`${message} Save this arrangement if this version feels better.`);
      renderTrip();
    }

    function swapDayItem(dayId) {
      const day = findDay(dayId);
      if (!day || day.item.removed || !day.item.alternatives.length) return;
      const next = day.item.alternatives[day.item.alternativeIndex % day.item.alternatives.length];
      const currentSnapshot = {
        title: day.item.title,
        body: day.item.body,
        fit: day.item.fit,
        label: day.item.label
      };
      day.item.title = next.title;
      day.item.body = next.body;
      day.item.fit = next.fit;
      day.item.label = next.label;
      day.item.alternatives[day.item.alternativeIndex % day.item.alternatives.length] = currentSnapshot;
      day.item.alternativeIndex += 1;
      markUnsavedArrangement(`You tried an alternate plan for ${day.dayLabel}. Save this arrangement if it feels better.`);
      renderTrip();
    }

    function removeDayItem(dayId) {
      const day = findDay(dayId);
      if (!day) return;
      day.item.removed = true;
      markUnsavedArrangement(`You made ${day.dayLabel} lighter. Save this arrangement if the easier version feels right.`);
      renderTrip();
    }

    function undoDayItem(dayId) {
      const day = findDay(dayId);
      if (!day) return;
      day.item.removed = false;
      markUnsavedArrangement(`You restored the original plan for ${day.dayLabel}. Save this arrangement if this version feels right.`);
      renderTrip();
    }

    function moveTimelineStep(dayId, stepIndex, direction) {
      const day = findDay(dayId);
      const timeline = day?.item?.timeline;
      if (!timeline || timeline.length < 2) return;

      const currentIndex = Number(stepIndex);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || currentIndex >= timeline.length || nextIndex >= timeline.length) return;

      reorderTimelineStep(dayId, currentIndex, nextIndex);
    }

    function reorderTimelineStep(dayId, fromIndex, toIndex) {
      const day = findDay(dayId);
      const timeline = day?.item?.timeline;
      if (!timeline || timeline.length < 2) return;
      if (fromIndex === toIndex) return;
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= timeline.length || toIndex >= timeline.length) return;

      const [step] = timeline.splice(fromIndex, 1);
      timeline.splice(toIndex, 0, step);

      if (hbState.currentTripMapQuery === dayId && typeof hbState.currentTripMapStepIndex === "number") {
        if (hbState.currentTripMapStepIndex === fromIndex) {
          hbState.currentTripMapStepIndex = toIndex;
        } else if (fromIndex < hbState.currentTripMapStepIndex && toIndex >= hbState.currentTripMapStepIndex) {
          hbState.currentTripMapStepIndex -= 1;
        } else if (fromIndex > hbState.currentTripMapStepIndex && toIndex <= hbState.currentTripMapStepIndex) {
          hbState.currentTripMapStepIndex += 1;
        }
      } else {
        hbState.currentTripMapQuery = dayId;
        hbState.currentTripMapStepIndex = toIndex;
      }

      markUnsavedArrangement(`You reordered a timeline step in ${day.dayLabel}. Save this arrangement if this version feels better.`);
      renderTrip();
    }

    function toggleDayExpanded(dayId) {
      const day = findDay(dayId);
      if (!day) return;
      day.expanded = !day.expanded;
      renderTrip();
    }

    function setAllDayExpansion(expanded) {
      if (!hbState.currentTrip?.days?.length) return;
      hbState.currentTrip.days.forEach((day) => {
        day.expanded = expanded;
      });
      renderTrip();
    }

    function normalizeTripDays() {
      if (!hbState.currentTrip?.days?.length) return;
      hbState.currentTrip.days.forEach((day, index) => {
        day.dayLabel = `Day ${index + 1}`;
        const date = addLocalDays(hbState.appState.startDate, index);
        if (!Number.isNaN(date.getTime())) {
          day.date = formatDate(date);
        }
      });
    }

    function reorderTripDay(fromDayId, toDayId) {
      if (!hbState.currentTrip?.days?.length || fromDayId === toDayId) return;
      const fromIndex = hbState.currentTrip.days.findIndex((day) => day.id === fromDayId);
      const toIndex = hbState.currentTrip.days.findIndex((day) => day.id === toDayId);
      if (fromIndex < 0 || toIndex < 0) return;

      const [day] = hbState.currentTrip.days.splice(fromIndex, 1);
      hbState.currentTrip.days.splice(toIndex, 0, day);
      normalizeTripDays();
      hbState.currentTripMapQuery = day.id;
      hbState.currentTripMapStepIndex = null;
      markUnsavedArrangement(`You moved ${day.dayLabel} to a new place in the trip. Save this arrangement if you want to keep this version handy.`);
      renderTrip();
    }

Object.assign(hbUtils, {
  buildFlightCard,
  buildStayCard,
  updateStateFromInputs,
  updateStateFromTripLogistics,
  updateJournalPreview,
  cloneData,
  hydrateTripProfile,
  persistTripProfile,
  hydrateSavedDraftStatus,
  persistTripDraft,
  restoreSavedDraft,
  getLocalAccountPayload,
  exportLocalAccountBackup,
  importLocalAccountBackup,
  applyLocalAccountBackup,
  saveAlternateVersion,
  clearAlternateVersionFeedback,
  pauseAlternateVersionFeedbackDismiss,
  resumeAlternateVersionFeedbackDismiss,
  restoreAlternateVersion,
  restoreLiveDraft,
  compareAlternateVersion,
  renderExploreMap,
  renderTripMap,
  buildGeneratedTrip,
  renderBlueprint,
  renderThinking,
  renderSavedPanel,
  renderTrip,
  swapDayItem,
  removeDayItem,
  undoDayItem,
  adjustDayQuality,
  hydrateBookingItems,
  persistBookingItems,
  updateBookingItemStatus,
  updateBookingItemNote,
  moveTimelineStep,
  reorderTimelineStep,
  toggleDayExpanded,
  setAllDayExpansion,
  reorderTripDay,
  buildDayMovementDiff,
  getTripArrangementSummary,
  buildGoogleHotelsUrl,
  buildGoogleFlightsUrl,
  getPlanningReadiness
});
})();
