(() => {
const { state: hbState, data: hbData, refs: hbRefs, utils: hbUtils } = window.HB_APP;
const { getCityName, getTripLength, buildTravelerText, getCountryOnlySelection, getCountryGuide, resolveCanonicalDestination, titleCase } = hbUtils;
const { getAreaSet, getDayHighlights, getDayNotes, getTimelineTemplates, getConcreteTripTemplates } = window.HB_TRIP_HELPERS;

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
      const value = new Date(input);
      if (Number.isNaN(value.getTime())) return input;
      return value.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    function shortDestinationMode() {
      if (hbState.appState.depth === "Deeper cut") return "more local color";
      if (hbState.appState.depth === "Balanced") return "essentials with some local moments";
      return "essentials first";
    }

    function buildTripTitle(city) {
      const leadStyle = hbState.appState.styles[0] || "Relaxed";
      return `A ${leadStyle} ${city} Trip`;
    }

    function buildTripSummary(city) {
      const styleText = hbState.appState.styles.length > 1
        ? `${hbState.appState.styles[0].toLowerCase()} and ${hbState.appState.styles[1].toLowerCase()}`
        : (hbState.appState.styles[0] || "balanced").toLowerCase();
      return `${buildTravelerText()} in ${city}, built around ${styleText} days and a ${hbState.appState.pace.toLowerCase()} pace.`;
    }

    function buildTripReasoning() {
      const guideReasoning = getGuideSourceReasoning();
      const baseReasoning = `Neighborhood-led, easy to follow, and shaped around your strongest signals.`;
      return guideReasoning ? `${guideReasoning} ${baseReasoning}` : baseReasoning;
    }

    function formatTripStyles() {
      if (!hbState.appState.styles.length) return "Balanced";
      if (hbState.appState.styles.length === 1) return hbState.appState.styles[0];
      if (hbState.appState.styles.length === 2) return `${hbState.appState.styles[0]} + ${hbState.appState.styles[1]}`;
      return `${hbState.appState.styles.slice(0, -1).join(", ")} + ${hbState.appState.styles[hbState.appState.styles.length - 1]}`;
    }

    function buildTripLensValue() {
      if (hbState.appState.memory === "Food memory") return "Food and neighborhoods are shaping the best parts";
      if (hbState.appState.memory === "Romantic memory") return "The trip is leaning atmospheric and memorable";
      if (hbState.appState.memory === "Family memory") return "The plan is staying easy to enjoy together";
      return "The big sights stay protected without overloading the days";
    }

    function buildTripLensDetail() {
      return `${hbState.appState.pace} pace • ${hbState.appState.spontaneity} structure • ${formatTripStyles()}`;
    }

    function buildTripQuickFacts() {
      const tripLength = getTripLength();
      const styleText = formatTripStyles();
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
          badge: hbState.guidePlanContext?.sourceType ? "Guide-led" : "Personalized",
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
          value: hbState.appState.memory,
          detail: `${hbState.appState.spontaneity} spontaneity • one of the strongest planning signals`
        }
      ];
    }

    function buildBlueprintSummary(city) {
      const styles = hbState.appState.styles.join(" + ") || "Balanced";
      return `${styles} days in ${city} for ${buildTravelerText()}, with a ${hbState.appState.pace.toLowerCase()} rhythm and ${hbState.appState.foodImportance.toLowerCase()} food moments.`;
    }

    function buildBlueprintReasoning() {
      const guideReasoning = getGuideSourceReasoning();
      const baseReasoning = `We’re leaning ${shortDestinationMode()}, keeping the trip easy to enjoy, and using your must-haves to shape the plan instead of trying to fill every hour.`;
      return guideReasoning ? `${guideReasoning} ${baseReasoning}` : baseReasoning;
    }

    function buildSignatureEvent(city) {
      if (hbState.appState.memory === "Food memory" || hbState.appState.foodImportance === "Major highlight") {
        return {
          title: `${city} signature dinner`,
          reason: `Chosen because food matters on this trip, it fits your ${hbState.appState.pace.toLowerCase()} pace, and it gives the trip one standout memory moment without forcing the rest of the day.`
        };
      }

      if (hbState.appState.memory === "Romantic memory") {
        return {
          title: `Sunset evening in ${city}`,
          reason: "Chosen because your memory goal leans emotional and atmospheric, so this gives the trip one clear moment that feels special without feeling overbuilt."
        };
      }

      return {
        title: `${city} signature essential`,
        reason: "Chosen because it matches your strongest trip signals, supports a first-time or essentials-first feeling, and gives the trip one moment that clearly stands out."
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
          copy: "Best when users want easier access to headline sights and do not mind a busier base."
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

    function createVersionId() {
      return `version-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    }

    function getTripArrangementSummary(trip) {
      if (!trip?.days?.length) return "";
      return trip.days.map((day) => `${day.dayLabel}: ${day.area}`).join(" • ");
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
      const savedVersion = {
        id: createVersionId(),
        name: trimmedName,
        savedAt: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
        trip: snapshot
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

    function buildDayData() {
      const city = getCityName();
      const days = getTripLength();
      const areas = getAreaSet(city);
      const dayHighlights = getDayHighlights(city, areas);
      const dayNotes = getDayNotes(city, areas);
      const timelineTemplates = getTimelineTemplates(city, areas);
      const styleLead = hbState.appState.styles[0] || "Relaxing";
      const secondaryStyle = hbState.appState.styles[1] || hbState.appState.styles[0] || "Relaxing";
      const concreteTemplates = getConcreteTripTemplates(city, areas);

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
          title: `${styleLead} day with clear local focus`,
          rationale: `This day works because it gives you a strong feel for the city without making you cross it back and forth.`,
          highlight: dayHighlights[1],
          timeShape: hbState.appState.pace === "Packed" ? "Full, with one breather" : "Planned, with room to wander",
          weather: dayNotes[1],
          itemTitle: `${styleLead} highlight + open stretch`,
          itemBody: `Build the day around one strong stop, then leave enough room around it for a good meal, a slower walk, and whatever makes that part of the city worth staying in.`,
          fit: `The day still feels substantial, but the time around the headline stop is what keeps it enjoyable instead of mechanical.`
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
          title: `${secondaryStyle} day with one standout evening plan`,
          rationale: `This is the part of the trip meant to feel the most memorable, so the rest of the day stays lighter around it.`,
          highlight: dayHighlights[3],
          timeShape: "Open afternoon + special evening",
          weather: dayNotes[3],
          itemTitle: `Daytime anchor + standout evening`,
          itemBody: `Start with one real daytime stop in ${areas[3] || areas[2] || areas[1]}, keep lunch or a coffee break nearby, and then build toward the dinner, view, or reservation that should carry the evening.`,
          fit: `It gives the day a visible sequence, so the memory moment feels earned instead of dropped onto an otherwise vague outline.`
        },
        {
          title: `Lighter close in ${areas[1]}`,
          rationale: `The ending stays lighter on purpose so you can enjoy the last stretch of the trip without feeling rushed.`,
          highlight: dayHighlights[4],
          timeShape: "Light, with room to pack",
          weather: dayNotes[4],
          itemTitle: `Low-pressure final stretch`,
          itemBody: `Use the final stretch for one last worthwhile stop, one last meal or walk you will actually remember, then leave enough space to pack and close the trip calmly.`,
          fit: `It helps the trip finish on a high note instead of letting the last day get swallowed by checkout energy and loose ends.`
        }
      ];

      const count = Math.min(Math.max(days, 3), 5);
      const selectedTemplates = concreteTemplates
        ? [...concreteTemplates, ...dayTemplates.slice(concreteTemplates.length)]
        : dayTemplates;
      return selectedTemplates.slice(0, count).map((sourceDay, index) => {
        const area = areas[Math.min(index, areas.length - 1)];
        const day = index === 0 ? normalizeFirstDayTemplate(sourceDay, area) : { ...sourceDay };
        const dayLead = index === 0 ? "Morning" : index === 3 ? "Evening" : "Midday";
        const resolvedTimeline = day.timeline || timelineTemplates[Math.min(index, timelineTemplates.length - 1)];
        const normalizedTimeline = index === 0 ? normalizeFirstDayTimeline(resolvedTimeline, area) : resolvedTimeline;
        const finalTimeline = expandTimelineSteps(normalizedTimeline, city, area, day.highlight);

        return {
          id: `day-${index + 1}`,
          dayLabel: `Day ${index + 1}`,
          date: formatDate(new Date(new Date(hbState.appState.startDate).getTime() + index * 86400000)),
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
      hbState.appState.destination = resolveCanonicalDestination(hbRefs.formBindings.destination.value.trim() || "Paris, France");
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
      hbUtils.updateBudgetHelper();
      hbUtils.updateFlightUI();
      hbUtils.updateDestinationAutofill();
      hbUtils.updateDestinationHelper();
      syncTripLogisticsInputs();
      hbUtils.renderDestinationHero("build");
    }

    function renderBlueprint() {
      const city = getCityName();
      document.getElementById("blueprint-summary").textContent = buildBlueprintSummary(city);
      document.getElementById("blueprint-reasoning").textContent = buildBlueprintReasoning();

      const blueprintGrid = document.getElementById("blueprint-grid");
      const gridItems = [
        ["Destination", hbState.appState.destination],
        ["Trip length", `${getTripLength()} days`],
        ["Travelers", buildTravelerText()],
        ["Flights", buildFlightSummary()],
        ["Pace", hbState.appState.pace],
        ["Food", hbState.appState.foodImportance],
        ["Budget", hbState.appState.budget]
      ];

      blueprintGrid.innerHTML = gridItems.map(([label, value]) => `
        <div class="rounded-2xl border border-line bg-white px-4 py-4">
          <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${label}</p>
          <p class="mt-2 font-medium">${value}</p>
        </div>
      `).join("");

      const blueprintTopPlaces = document.getElementById("blueprint-top-places");
      if (blueprintTopPlaces) {
        blueprintTopPlaces.innerHTML = getBlueprintTopPlaces().map((place) => `
          <div class="rounded-2xl bg-surface-soft px-4 py-4">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">${place.type}</p>
            <p class="mt-2 text-sm font-semibold text-ink">${place.name}</p>
          </div>
        `).join("");
      }

      document.getElementById("blueprint-preferences").textContent =
        `${hbState.appState.styles.join(", ")}, ${hbState.appState.depth.toLowerCase()}, ${hbState.appState.pace.toLowerCase()} pace, ${hbState.appState.foodImportance.toLowerCase()} food moments, and a ${hbState.appState.memory.toLowerCase()} memory goal.`;

      document.getElementById("blueprint-rules").textContent =
        hbState.appState.mustHaves || "No hard rules entered yet, so we’ll lean on the broader trip preferences.";

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
      const activeTripLabel = getActiveTripLabel();
      const savedTripTitle = hbState.likedTrip?.title || hbState.currentTrip?.title || buildTripTitle(getCityName());
      const savedTripCopy = hbState.likedTrip
        ? "This is the version you marked as a viable restore point. You can come back to it if later edits start drifting too far."
        : "Once a user likes a version, it should live here as a calm restore point instead of feeling lost in the flow.";
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
              copy: "This gives the user a trusted fallback instead of feeling like the good version got lost."
            }
          ]
        : [
            {
              label: "Saved shape",
              value: "No restore point yet",
              copy: "Once a user marks a version they like, it will live here as the safe fallback."
            },
            {
              label: "Best use",
              value: "Protect a version you trust",
              copy: "This is especially useful before testing bigger itinerary changes."
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
          copy: "Those notes can quietly influence future recommendations without making the user feel judged."
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
                <p class="saved-panel-summary-copy">This note becomes part of the memory trail for future trips, so the app can remember what actually stood out instead of only what was practical.</p>
              </div>
            </div>
          `
        : "";
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
        : "";

      hbRefs.savedPanel.innerHTML = `
        <div class="saved-panel-shell rounded-[28px] border border-line bg-surface-card p-5 shadow-card">
          <div class="saved-panel-head">
            <div class="saved-panel-head-copy">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Saved trips</p>
              <h3 class="mt-1 font-display text-2xl font-bold">Come back to what worked</h3>
              <p class="mt-2 text-sm leading-6 text-muted">
                Saved trips should feel calm and useful. This is where users keep restore points, revisit liked versions, and leave light feedback after travel.
              </p>
            </div>
            <span class="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-tertiary">Future memory</span>
          </div>

          <div class="mt-5 space-y-3">
            <div class="saved-panel-card rounded-[24px] border border-line bg-white px-4 py-4">
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
            ${alternateVersionsBlock}
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

      hbRefs.savedPanel.querySelectorAll("[data-action='open-build']").forEach((button) => {
        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          hbUtils.setActivePanel("build-panel");
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
        const primaryFacts = quickFacts.filter((item, index) => item.featured || index < 4);
        const secondaryFacts = quickFacts.filter((item, index) => !item.featured && index >= 4);
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
        } else {
          tripGuideSource.classList.add("hidden");
          tripGuideSource.innerHTML = "";
        }
      }
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
      syncTripLogisticsInputs();
      updateJournalPreview();
      syncTripSection("guide", { fallback: true });
      syncTripSection("versions");
      syncTripSection("logistics");
      syncTripSection("flights");
      syncTripSection("stay");
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
                </div>
                <div class="compare-column version-card is-compare-active">
                  <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Compared arrangement</p>
                  <div class="mt-2 flex flex-wrap items-center gap-2">
                    <p class="font-display text-lg font-bold">${compareSubject.trip.title}</p>
                    <span class="version-status-chip ${compareSubject.sourceType === "live" ? "is-active" : "is-soft"}">${compareSubject.sourceType === "live" ? "Live draft" : "Saved version"}</span>
                  </div>
                  <p class="mt-2 text-sm leading-6 text-muted">${getTripArrangementSummary(compareSubject.trip)}</p>
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
              <span class="trip-day-chip trip-day-chip--ghost">Drag day</span>
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
                    <p class="trip-day-section-label">Day actions</p>
                    <p class="mt-2 text-sm leading-6 text-muted">Keep this day visible on the map, or make one quick change.</p>
                  </div>
                  <div class="trip-day-actions-buttons">
                    <button class="trip-day-map-button trip-day-map-button--footer rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line ${hbState.currentTripMapQuery === day.id ? "is-active" : ""}" data-action="focus-trip-map" data-day-id="${day.id}" type="button">
                      ${hbState.currentTripMapQuery === day.id ? "Focused on map" : "Show day on map"}
                    </button>
                    <div class="trip-day-edit-toggle" role="group" aria-label="Edit this day">
                      <button class="trip-day-edit-button" data-action="swap-item" data-day-id="${day.id}" type="button">
                        Swap
                      </button>
                      <button class="trip-day-edit-button is-muted" data-action="remove-item" data-day-id="${day.id}" type="button">
                        Remove
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
      renderTrip();
    }

    function removeDayItem(dayId) {
      const day = findDay(dayId);
      if (!day) return;
      day.item.removed = true;
      renderTrip();
    }

    function undoDayItem(dayId) {
      const day = findDay(dayId);
      if (!day) return;
      day.item.removed = false;
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
      const start = new Date(hbState.appState.startDate);
      hbState.currentTrip.days.forEach((day, index) => {
        day.dayLabel = `Day ${index + 1}`;
        if (!Number.isNaN(start.getTime())) {
          const date = new Date(start.getTime() + index * 86400000);
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
  moveTimelineStep,
  reorderTimelineStep,
  toggleDayExpanded,
  setAllDayExpansion,
  reorderTripDay,
  buildDayMovementDiff,
  getTripArrangementSummary,
  buildGoogleHotelsUrl,
  buildGoogleFlightsUrl
});
})();
