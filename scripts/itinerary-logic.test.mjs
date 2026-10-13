import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tripSource = fs.readFileSync(path.join(root, "scripts/app-trip.js"), "utf8");

function sliceFunction(name) {
  const start = tripSource.indexOf(`    function ${name}(`);
  assert.ok(start >= 0, `Missing function ${name}`);
  const end = tripSource.indexOf("\n    }\n", start);
  return tripSource.slice(start, end + 6);
}

function sliceBlock(startMarker, endMarker) {
  const start = tripSource.indexOf(startMarker);
  const end = tripSource.indexOf(endMarker, start);
  assert.ok(start >= 0 && end > start, `Missing block ${startMarker}`);
  return tripSource.slice(start, end);
}

// Pure itinerary helpers from app-trip.js, plus the real Paris templates from data/trip-content.js.
function loadLogic(appState = {}) {
  const context = vm.createContext({ window: {}, hbState: { appState } });
  vm.runInContext(fs.readFileSync(path.join(root, "data/trip-content.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "data/places.js"), "utf8"), context);
  vm.runInContext([
    "cleanPlanningAnchor", "getPlanningAnchorKey", "formatAnchorLabel", "formatInlineAnchorLabel",
    "parseTimelineTimeToMinutes", "formatTimelineMinutes", "buildInsertedTimelineStep", "expandTimelineSteps",
    "getTimelineStepVisual", "buildDayConfidenceSignals", "getDayMealVenue", "getFlightPlanStatus"
  ].map(sliceFunction).join("\n"), context);
  vm.runInContext(sliceBlock("    // ---- itinerary-logic: pure helpers", "    // ---- end itinerary-logic ----"), context);
  return context;
}

// Mirrors buildDayData: select templates by trip length, resolve areas from stops, expand timelines, schedule must-haves.
const genericTemplates = ["Generic day 1", "Generic day 2", "Generic day 3", "Generic signature day", "Generic lighter close"]
  .map((title) => ({ title, timeline: null }));

function buildCityTrip(city, dayCount, anchors, startIso = null, pace = "Balanced") {
  const logic = loadLogic();
  const helpers = logic.window.HB_TRIP_HELPERS;
  const areas = helpers.getAreaSet(city);
  const concrete = helpers.getConcreteTripTemplates(city, areas);
  const pool = logic.selectDayTemplates({
    ...logic.planDayTemplatePool(concrete, genericTemplates),
    openTemplate: { title: `Open day near ${areas[0]}`, highlight: `Flexible time near ${areas[0]}`, timeline: null },
    count: dayCount,
    buildFlexibleTemplate: (index) => ({ title: `Flexible day in ${areas[index % areas.length]}`, timeline: null })
  }).map((entry) => ({ ...entry, template: logic.applyPaceToTemplate(entry.template, pace) }));
  // With a start date, days are ordered around opening hours as buildDayData does.
  const selected = startIso
    ? logic.orderDaysForOpeningHours(pool, Array.from({ length: dayCount }, (_, index) => isoPlus(startIso, index)), logic.window.HB_PLACES.places)
    : pool;
  const days = selected.map(({ template: sourceTemplate, slot }, index) => {
    const rawTimeline = sourceTemplate.timeline || (slot < 5
      ? null
      : logic.buildFlexibleDayTimeline(logic.resolveDayArea(sourceTemplate, areas, city).label));
    const template = { ...sourceTemplate, timeline: logic.attachPlaces(rawTimeline, logic.window.HB_PLACES.places, logic.window.HB_PLACES.routes) };
    const areaInfo = logic.resolveDayArea(template, areas, city);
    return {
      dayLabel: `Day ${index + 1}`,
      title: template.title,
      highlight: template.highlight,
      area: areaInfo.label,
      areaConfirmed: areaInfo.confirmed,
      templateSlot: slot,
      pace,
      item: { timeline: logic.expandTimelineSteps(template.timeline, city, areaInfo.label, template.highlight) }
    };
  });
  const schedule = logic.scheduleMustHaveAnchors(anchors, days);
  return { logic, days, schedule };
}

const buildParisTrip = (dayCount, anchors) => buildCityTrip("Paris", dayCount, anchors);

// ---- Berlin pilot: milestone criteria that can be checked from data alone (docs/pilot-milestone.md) ----

test("Berlin: every scheduled stop is a checked registry place or an explicit free-time block", () => {
  const logic = loadLogic();
  const registry = logic.window.HB_PLACES.places;
  const templates = logic.window.HB_TRIP_HELPERS.getConcreteTripTemplates("Berlin", logic.window.HB_TRIP_HELPERS.getAreaSet("Berlin"));
  assert.equal(templates.length, 6, "five researched days plus a closing morning");
  templates.flatMap((day) => day.timeline).forEach((step) => {
    if (step.kind === "flexible") {
      assert.ok(!step.placeId, `${step.title}: free time must not name a venue`);
      return;
    }
    const place = registry[step.placeId];
    assert.ok(place, `${step.title}: not in the places registry`);
    assert.equal(place.verification.status, "location-checked");
    assert.match(place.verification.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(place.verification.evidence[0].url.startsWith("https://"), `${step.title}: evidence url`);
    assert.ok(place.verification.checked.includes("published-weekly-hours"), "published hours were checked");
    assert.ok(place.verification.notChecked.includes("unlisted-holiday-or-special-closures"), "unlisted closures are not claimed");
  });
});

test("Berlin: no stop is scheduled twice and places sit inside Berlin", () => {
  const logic = loadLogic();
  const registry = logic.window.HB_PLACES.places;
  const templates = logic.window.HB_TRIP_HELPERS.getConcreteTripTemplates("Berlin", []);
  const placeIds = templates.flatMap((day) => day.timeline.map((step) => step.placeId).filter(Boolean));
  assert.equal(new Set(placeIds).size, placeIds.length, "duplicate stop");
  Object.values(registry).filter((place) => place.city === "berlin").forEach((place) => {
    assert.ok(place.coordinates.lat > 52.3 && place.coordinates.lat < 52.7 && place.coordinates.lng > 13.0 && place.coordinates.lng < 13.8, `${place.name} outside Berlin`);
    assert.match(place.coordinates.attribution, /OpenStreetMap/);
    assert.equal(place.timeZone, "Europe/Berlin");
  });
});

test("Berlin 7-day trip: seven distinct days, areas from places, coherent geography, honest travel", () => {
  const anchors = [
    { label: "One memorable dinner", key: "onememorabledinner", type: "food", source: "traveler" },
    { label: "Slower final day", key: "slowerfinalday", type: "rest", source: "traveler" }
  ];
  const { logic, days, schedule } = buildCityTrip("Berlin", 7, anchors);
  assert.equal(new Set(days.map((day) => day.title)).size, 7, "no repeated days");
  assert.equal(days[6].title, "Last morning in Scheunenviertel");
  assert.equal(days[5].title, "Open day near Scheunenviertel", "day 6 is an honest open day");
  assert.ok(days[5].item.timeline.every((step) => step.kind === "flexible"));
  assert.equal(days[0].area, "Museum Island + Scheunenviertel");
  assert.equal(days[1].area, "Bernauer Strasse + Scheunenviertel");
  assert.ok(days.slice(0, 5).every((day) => day.areaConfirmed));

  days.forEach((day) => day.item.timeline.forEach((step) => {
    if (!step.travelFromPrevious) return;
    const travel = step.travelFromPrevious;
    assert.ok(travel.distanceKm < 4, `${day.title}: ${step.title} is ${travel.distanceKm} km from the previous stop`);
    // Every Berlin hop is either a stored timetable journey or a short walk estimate.
    if (travel.distanceKm >= 1.5) {
      assert.equal(travel.basis, "routed", `${step.title}: long hop without a timetable journey`);
      assert.ok(travel.minutes > 0 && travel.minutes < 60);
      assert.match(travel.conditions, /\d{4}, departing about \d{2}:\d{2}/);
      assert.match(travel.source, /VBB/);
    } else if (travel.basis === "same-site") {
      assert.ok(travel.distanceKm < 0.05, `${step.title}: same-site hop of ${travel.distanceKm} km`);
      assert.equal(travel.minutes, 0);
    } else if (travel.basis !== "routed") {
      assert.equal(travel.basis, "estimate");
      assert.equal(travel.mode, "walk");
      assert.equal(travel.minutes, logic.estimateWalkMinutes(travel.distanceKm));
    }
    // Distances written into the copy must match the registry coordinates.
    const written = String(step.copy).match(/about (\d+(?:\.\d+)?) km from/);
    if (written) assert.ok(Math.abs(Number(written[1]) - step.travelFromPrevious.distanceKm) <= 0.2, `${step.title}: copy says ${written[1]} km, coordinates give ${step.travelFromPrevious.distanceKm} km`);
  }));

  const dinnerDay = schedule.byDay.findIndex((list) => list.some((anchor) => anchor.key === "onememorabledinner"));
  assert.equal(days[dinnerDay].item.timeline.find((step) => step.title === "Dinner at Restaurant Tim Raue") != null, true);
  assert.ok(schedule.byDay[6].some((anchor) => anchor.key === "slowerfinalday"));
});

// "2026-11-09" + n days, as the planner numbers trip days.
function isoPlus(iso, days) {
  return new Date(Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)) + days)).toISOString().slice(0, 10);
}

function hoursConflicts(logic, days, startIso) {
  const registry = logic.window.HB_PLACES.places;
  return days.flatMap((day, index) => day.item.timeline.filter((step) => step.place).map((step) => ({
    day: index + 1, title: step.title, check: logic.checkStopHours(step, isoPlus(startIso, index), registry[step.place.id].hours)
  }))).filter(({ check }) => check.state === "closed" || check.state === "outside-hours");
}

test("Berlin hours: in written order, a Monday start puts the museum that is closed on Mondays on day 1", () => {
  const { logic, days } = buildCityTrip("Berlin", 7, []);
  assert.equal(logic.weekdayKeyForIsoDate("2026-11-09"), "mon");
  const monday = hoursConflicts(logic, days, "2026-11-09");
  assert.deepEqual(JSON.parse(JSON.stringify(monday.map(({ day, title, check }) => [day, title, check.state]))), [[1, "Neues Museum", "closed"]]);
  assert.equal(hoursConflicts(logic, days, "2026-11-10").length, 0, "a Tuesday start fits every published schedule");
});

test("Berlin hours: days are reordered so no stop lands on its closed day, for any start weekday", () => {
  const written = [...buildCityTrip("Berlin", 7, []).days.map((day) => day.title)];
  for (let offset = 0; offset < 7; offset += 1) {
    const start = isoPlus("2026-11-09", offset);
    const { logic, days } = buildCityTrip("Berlin", 7, [], start);
    const closed = hoursConflicts(logic, days, start).filter(({ check }) => check.state === "closed");
    assert.deepEqual([...closed.map(({ day, title }) => `${day} ${title}`)], [], `start ${start}`);
    assert.deepEqual([...days.map((day) => day.title)].sort(), [...written].sort(), "same days, only reordered");
    assert.equal(days[6].title, written[6], "the closing day stays last");
  }
  // On a Monday start no researched day fits (each has a stop closed on Mondays), so the open day takes Monday.
  const monday = buildCityTrip("Berlin", 7, [], "2026-11-09").days.map((day) => day.title);
  assert.equal(monday[0], written[5]);
  assert.equal(monday[5], written[0]);
  // A Tuesday start already fits, so nothing moves.
  assert.deepEqual([...buildCityTrip("Berlin", 7, [], "2026-11-10").days.map((day) => day.title)], written);
});

test("Berlin Easygoing: the two three-stop days lose their evening stop; everything else is unchanged", () => {
  const anchors = [{ label: "One memorable dinner", key: "onememorabledinner", type: "food", source: "traveler" }];
  const balanced = buildCityTrip("Berlin", 7, anchors);
  const easy = buildCityTrip("Berlin", 7, anchors, null, "Easygoing");
  const placeIds = (trip) => [...trip.days.flatMap((day) => day.item.timeline.map((step) => step.placeId).filter(Boolean))];
  const dropped = placeIds(balanced).filter((id) => !placeIds(easy).includes(id));
  assert.deepEqual(dropped, ["plc_berlin_green-door-bar", "plc_berlin_nobelhart-und-schmutzig"]);
  easy.days.forEach((day, index) => {
    const before = balanced.days[index];
    assert.equal(day.title, before.title, "same days in the same order");
    const evening = day.item.timeline[day.item.timeline.length - 1];
    if (dropped.includes(before.item.timeline.at(-1).placeId)) {
      // The evening stop becomes labelled free time (not a gap), and no padding is added.
      assert.equal(evening.kind, "flexible");
      assert.ok(!evening.placeId);
      assert.match(evening.copy, /^Easygoing pace:/);
      assert.ok(day.item.timeline.length < before.item.timeline.length, `${day.title} is lighter`);
    } else {
      assert.deepEqual([...day.item.timeline.map((step) => step.title)], [...before.item.timeline.map((step) => step.title)], `${day.title} unchanged`);
    }
  });
  // The memorable dinner still has its booked dinner.
  const dinnerDay = easy.schedule.byDay.findIndex((list) => list.some((anchor) => anchor.key === "onememorabledinner"));
  assert.equal(easy.days[dinnerDay].title, "East Side Gallery and a Kreuzberg dinner");
  // The lighter days' written copy no longer names the dropped stops.
  const templates = easy.logic.window.HB_TRIP_HELPERS.getConcreteTripTemplates("Berlin", []);
  templates.filter((template) => template.easygoing).forEach((template) => {
    const light = easy.logic.applyPaceToTemplate(template, "Easygoing");
    const droppedName = easy.logic.window.HB_PLACES.places[template.easygoing.drop].name.split(" ")[0];
    [light.itemTitle, light.itemBody, light.fit, light.rationale, light.timeShape].forEach((text) => assert.ok(!text.includes(droppedName), `${template.title}: "${text}" still names ${droppedName}`));
  });
  // Other paces leave templates untouched.
  templates.forEach((template) => assert.equal(easy.logic.applyPaceToTemplate(template, "Packed"), template));
});

test("Must-haves: a stop can cover a named need beyond its title", () => {
  const { schedule } = buildCityTrip("Berlin", 7, [{ label: "Food market", key: "foodmarket", type: "food", source: "traveler" }]);
  assert.equal(schedule.unscheduled.length, 0);
  const day = schedule.byDay.findIndex((anchors) => anchors.some((anchor) => anchor.key === "foodmarket"));
  assert.equal(schedule.byDay[day][0].stepTitle, "Lunch at Markthalle Neun");
});

test("Berlin hours: seasonal periods, dated exceptions, open-ended closing and unknown dates", () => {
  const logic = loadLogic();
  const hours = (id) => logic.window.HB_PLACES.places[id].hours;
  const zoo = hours("plc_berlin_zoo-berlin");
  const at = (time) => ({ time });
  assert.equal(logic.checkStopHours(at("5:00 PM"), "2026-10-20", zoo).state, "open", "October hours run to 18:00");
  assert.equal(logic.checkStopHours(at("5:00 PM"), "2026-11-20", zoo).state, "outside-hours", "from 26 October the zoo closes at 16:30");
  assert.equal(logic.checkStopHours(at("2:00 PM"), "2026-12-24", zoo).state, "outside-hours", "24 December closes at 14:00");
  assert.equal(logic.checkStopHours(at("11:00 PM"), "2026-11-20", hours("plc_berlin_green-door-bar")).state, "open", "opening time only: open after 19:00");
  assert.equal(logic.checkStopHours(at("6:00 PM"), "2026-11-20", hours("plc_berlin_green-door-bar")).state, "outside-hours");
  assert.equal(logic.checkStopHours(at("12:00 PM"), "2026-11-22", hours("plc_berlin_markthalle-neun")).state, "unknown", "Sunday is not published");
  assert.equal(logic.checkStopHours(at("10:00 AM"), "2027-02-02", hours("plc_berlin_neues-museum")).state, "unknown", "outside the researched period");
  assert.equal(logic.checkStopHours(at("3:00 AM"), "2026-11-20", hours("plc_berlin_east-side-gallery")).state, "open", "open around the clock");
  assert.equal(logic.checkStopHours(at("Flexible"), "2026-11-20", hours("plc_berlin_neues-museum")).state, "open-day");
});

test("Berlin hours: every registered place has an official, dated source", () => {
  const logic = loadLogic();
  Object.values(logic.window.HB_PLACES.places).filter((place) => place.city === "berlin").forEach((place) => {
    assert.equal(place.hours.status, "hours-checked", place.name);
    assert.match(place.hours.evidence.url, /^https:\/\//);
    assert.ok(place.hours.evidence.quote.length > 10, `${place.name}: quote`);
    assert.ok(["high", "medium"].includes(place.hours.evidence.confidence));
    assert.ok(place.hours.periods.every((period) => period.from <= period.to));
  });
});

test("Berlin 3-day trip keeps the closing morning last and nothing is padded with invented stops", () => {
  const { days } = buildCityTrip("Berlin", 3, []);
  assert.deepEqual([...days.map((day) => day.title)], ["Scheunenviertel breakfast and Museum Island", "Wall history on Bernauer Strasse", "Last morning in Scheunenviertel"]);
  days.forEach((day) => day.item.timeline.forEach((step) => assert.ok(step.kind === "flexible" || step.place, `${step.title} is neither a place nor free time`)));
});

const parisMustHaves = [
  { label: "One memorable dinner", key: "onememorabledinner", type: "food", source: "traveler" },
  { label: "Eiffel Tower", key: "eiffeltower", type: "sight", source: "guide" },
  { label: "Slower final day", key: "slowerfinalday", type: "rest", source: "traveler" },
  { label: "Food market", key: "foodmarket", type: "food", source: "traveler" }
];

for (const dayCount of [3, 5, 7]) {
  test(`${dayCount}-day trip: only the last day uses the closing template`, () => {
    const { days } = buildParisTrip(dayCount, []);
    assert.equal(days.length, dayCount);
    assert.equal(days[dayCount - 1].title, "Canal morning + easy close");
    assert.equal(days.filter((day) => day.title === "Canal morning + easy close").length, 1);
  });

  test(`${dayCount}-day trip: each must-have appears only on days that schedule it`, () => {
    const { days, schedule } = buildParisTrip(dayCount, parisMustHaves);
    schedule.byDay.forEach((anchors, index) => {
      anchors.forEach((anchor) => {
        const dayText = [days[index].title, days[index].highlight, ...days[index].item.timeline.map((step) => step.title)].join(" ");
        if (anchor.stepTitle) {
          assert.ok(days[index].item.timeline.some((step) => step.title === anchor.stepTitle), `${anchor.label} points at a missing step`);
        }
        if (anchor.key === "eiffeltower") assert.match(dayText, /Eiffel Tower/);
      });
    });
    const finalDayAnchors = schedule.byDay[dayCount - 1].map((anchor) => anchor.key);
    assert.ok(finalDayAnchors.includes("slowerfinalday"));
    assert.equal(schedule.byDay.flat().filter((anchor) => anchor.key === "onememorabledinner").length <= 1, true);
    assert.ok(schedule.unscheduled.some((anchor) => anchor.key === "foodmarket"), "Unmatched must-haves stay unscheduled");
  });
}

test("cities with only three written days keep them in order and close with the generic last day", () => {
  const { days } = buildCityTrip("Rome", 7, []);
  assert.equal(days[2].title, "Trastevere + Vatican contrast day");
  assert.equal(days[3].title, "Generic signature day");
  assert.equal(days[6].title, "Generic lighter close");
});

test("only the final day talks about packing or the last day", () => {
  for (const dayCount of [3, 5, 7, 9]) {
    const { days } = buildParisTrip(dayCount, []);
    days.slice(0, -1).forEach((day) => {
      const text = `${day.title} ${(day.item.timeline || []).map((step) => `${step.title} ${step.copy}`).join(" ")}`;
      assert.doesNotMatch(text, /last day|before packing|pack and reset/i, `${dayCount}-day trip, ${day.dayLabel}`);
    });
  }
});

test("areas come from each day's stops, not its position", () => {
  const { days } = buildParisTrip(7, []);
  assert.equal(days[0].area, "Le Marais");
  assert.equal(days[1].area, "Saint-Germain");
  assert.equal(days[2].area, "Eiffel / Left Bank");
  assert.equal(days[3].areaConfirmed, false, "Palais-Royal + Septime is not in a known area");
  assert.equal(days[3].area, "Paris");
  assert.equal(days[6].areaConfirmed, false, "Canal Saint-Martin is not Eiffel / Left Bank");
  assert.equal(days[4].area, "Le Marais", "The open day is labelled by the area it names");
});

test("trip-level dinner goal lands on the signature dinner, and the Eiffel Tower only on its day", () => {
  const { days, schedule } = buildParisTrip(7, parisMustHaves);
  const dinnerDay = schedule.byDay.findIndex((anchors) => anchors.some((anchor) => anchor.key === "onememorabledinner"));
  assert.equal(days[dinnerDay].templateSlot, 3);
  assert.equal(schedule.byDay[dinnerDay].find((anchor) => anchor.key === "onememorabledinner").stepTitle, "Dinner at Septime");
  const eiffelDays = schedule.byDay.map((anchors, index) => (anchors.some((anchor) => anchor.key === "eiffeltower") ? index : -1)).filter((index) => index >= 0);
  // Spread vm-realm arrays into this realm before deep comparison.
  assert.deepEqual([...eiffelDays], [2]);
  assert.equal(schedule.byDay[0].length, 0);
});

test("short trip without a signature dinner leaves the dinner goal unscheduled", () => {
  const { schedule } = buildParisTrip(3, parisMustHaves);
  assert.ok(schedule.unscheduled.some((anchor) => anchor.key === "onememorabledinner"));
});

test("missing location data falls back to the city without claiming an area", () => {
  const logic = loadLogic();
  const result = logic.resolveDayArea({ title: "Somewhere new", timeline: [{ title: "Unmapped stop" }] }, ["Le Marais"], "Paris");
  assert.equal(result.confirmed, false);
  assert.equal(result.label, "Paris");
  assert.equal(logic.resolveDayArea({ title: "Day", timeline: null }, [], "").label, "");
});

test("flight status reflects the traveler's choice", () => {
  const logic = loadLogic();
  assert.deepEqual(
    [logic.getFlightPlanStatus({ flightMode: "need-help" }).handled, logic.getFlightPlanStatus({ flightMode: "need-help" }).status],
    [false, "Not booked yet"]
  );
  assert.equal(logic.getFlightPlanStatus({ flightMode: "have-flights" }).handled, false);
  assert.equal(logic.getFlightPlanStatus({ flightMode: "have-flights", arrivalFlight: "2026-11-06T09:00" }).handled, true);
  assert.equal(logic.getFlightPlanStatus({ flightMode: "not-needed" }).handled, true);
  assert.equal(logic.getFlightPlanStatus({}).status, "Not provided");
});

test("stop icons follow the stop title", () => {
  const logic = loadLogic();
  assert.equal(logic.getTimelineStepVisual({ title: "Walk Place des Vosges + Rue des Rosiers", copy: "Instead of a landmark sprint." }).label, "Scenic");
  assert.equal(logic.getTimelineStepVisual({ title: "Lunch at Cafe Charlot", copy: "" }).label, "Meal");
  assert.equal(logic.getTimelineStepVisual({ title: "Pastry at Carette", copy: "" }).label, "Coffee");
  assert.equal(logic.getTimelineStepVisual({ title: "Check in near Centro Storico", copy: "" }).label, "Arrival");
});

test("timelines are not padded with a second coffee or stroll", () => {
  const logic = loadLogic();
  const timeline = [
    { time: "10:00 AM", title: "Coffee at Cafe de Flore" },
    { time: "12:30 PM", title: "Musee d'Orsay" },
    { time: "2:45 PM", title: "Lunch at Les Antiquaires" },
    { time: "4:30 PM", title: "Luxembourg Gardens walk" }
  ];
  assert.equal(logic.expandTimelineSteps(timeline, "Paris", "Saint-Germain", "").length, 4);
  const short = [{ time: "9:00 AM", title: "Pastry stop" }, { time: "1:00 PM", title: "Lunch at X" }, { time: "6:30 PM", title: "Dinner at Y" }];
  const expanded = logic.expandTimelineSteps(short, "Paris", "Le Marais", "");
  assert.equal(expanded.filter((step) => /coffee|pastry/i.test(step.title)).length, 1);
});

test("at-a-glance badges are not identical on every day and never contradict", () => {
  const { logic, days } = buildParisTrip(7, []);
  const signals = days.map((day) => logic.buildDayConfidenceSignals(day));
  assert.ok(new Set(signals.map((list) => list.join("|"))).size > 1);
  signals.forEach((list) => assert.ok(!(list.includes("Fuller day") && list.includes("Room to breathe"))));
});

test("must-have labels read cleanly", () => {
  const logic = loadLogic();
  assert.equal(logic.formatAnchorLabel("the Eiffel Tower"), "Eiffel Tower");
  assert.equal(logic.formatAnchorLabel("and a slower final day."), "Slower final day");
  assert.equal(logic.formatInlineAnchorLabel("One memorable dinner"), "one memorable dinner");
  assert.equal(logic.formatInlineAnchorLabel("Eiffel Tower"), "Eiffel Tower");
});

test("meal venue comes from the day's own schedule", () => {
  const logic = loadLogic();
  assert.equal(logic.getDayMealVenue({ item: { timeline: [{ title: "Lunch at Cafe Charlot" }, { title: "Dinner at Chez Janou" }] } }), "Chez Janou");
  assert.equal(logic.getDayMealVenue({ item: { timeline: [{ title: "Evening reservation at Septime" }] } }), "Septime");
  assert.equal(logic.getDayMealVenue({ item: { timeline: [{ title: "Palais-Royal walk" }] } }), "");
});

test("default planner dates are in the future", () => {
  const source = fs.readFileSync(path.join(root, "scripts/app-bootstrap.js"), "utf8");
  const start = source.indexOf("  function getSuggestedTripDate(");
  const context = vm.createContext({ Date });
  vm.runInContext(source.slice(start, source.indexOf("\n  }\n", start) + 4), context);
  const startDate = source.match(/startDate: getSuggestedTripDate\((\d+)\)/);
  const endDate = source.match(/endDate: getSuggestedTripDate\((\d+)\)/);
  assert.ok(startDate && endDate, "Default dates must be computed, not hardcoded");
  const today = context.getSuggestedTripDate(0);
  assert.ok(context.getSuggestedTripDate(Number(startDate[1])) > today);
  assert.ok(context.getSuggestedTripDate(Number(endDate[1])) > context.getSuggestedTripDate(Number(startDate[1])));
  assert.doesNotMatch(fs.readFileSync(path.join(root, "plan/index.html"), "utf8"), /type="date" value="\d{4}-/);
});
