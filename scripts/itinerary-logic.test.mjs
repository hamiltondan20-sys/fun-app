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

function buildCityTrip(city, dayCount, anchors) {
  const logic = loadLogic();
  const helpers = logic.window.HB_TRIP_HELPERS;
  const areas = helpers.getAreaSet(city);
  const concrete = helpers.getConcreteTripTemplates(city, areas);
  const selected = logic.selectDayTemplates({
    ...logic.planDayTemplatePool(concrete, genericTemplates),
    openTemplate: { title: `Open day near ${areas[0]}`, highlight: `Flexible time near ${areas[0]}`, timeline: null },
    count: dayCount,
    buildFlexibleTemplate: (index) => ({ title: `Flexible day in ${areas[index % areas.length]}`, timeline: null })
  });
  const days = selected.map(({ template: sourceTemplate, slot }, index) => {
    const template = sourceTemplate.timeline || slot < 5
      ? sourceTemplate
      : { ...sourceTemplate, timeline: logic.buildFlexibleDayTimeline(logic.resolveDayArea(sourceTemplate, areas, city).label) };
    const areaInfo = logic.resolveDayArea(template, areas, city);
    return {
      dayLabel: `Day ${index + 1}`,
      title: template.title,
      highlight: template.highlight,
      area: areaInfo.label,
      areaConfirmed: areaInfo.confirmed,
      templateSlot: slot,
      pace: "Balanced",
      item: { timeline: logic.expandTimelineSteps(template.timeline, city, areaInfo.label, template.highlight) }
    };
  });
  const schedule = logic.scheduleMustHaveAnchors(anchors, days);
  return { logic, days, schedule };
}

const buildParisTrip = (dayCount, anchors) => buildCityTrip("Paris", dayCount, anchors);

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
  assert.deepEqual(eiffelDays, [2]);
  assert.deepEqual(schedule.byDay[0], []);
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
