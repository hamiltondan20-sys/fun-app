import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadFormat() {
  const context = vm.createContext({ window: {}, crypto: globalThis.crypto, Date, JSON, Math, Uint8Array });
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-format.js"), "utf8"), context);
  return context.window.HB_TRIP_FORMAT;
}

// Plain JSON round trip moves vm-realm values into this realm for deep comparison.
const plain = (value) => JSON.parse(JSON.stringify(value));

// Same shape the planner builds (buildDayData) and stores in v1 drafts.
function sampleAppTrip() {
  return {
    title: "A Food-Focused Paris Trip",
    summary: "2 adults in Paris",
    unscheduledMustHaves: [{ label: "Food market", key: "foodmarket", type: "food", source: "traveler" }],
    days: [
      {
        id: "day-1", dayLabel: "Day 1", date: "Nov 6", title: "Le Marais opening day", area: "Le Marais", areaConfirmed: true,
        item: { title: "Morning • Place des Vosges", body: "Plan text", fit: "Fit text", label: "Food fit", alternatives: [], alternativeIndex: 0,
          timeline: [{ time: "9:00 AM", title: "Pastry at Carette", copy: "Start easy." }, { time: "6:30 PM", title: "Dinner at Chez Janou", copy: "First dinner." }] },
        protectedAnchors: []
      },
      {
        id: "day-2", dayLabel: "Day 2", date: "Nov 7", title: "Eiffel Tower + Left Bank views", area: "Eiffel / Left Bank", areaConfirmed: true,
        item: { title: "Midday • Eiffel", body: "", fit: "", label: "Personalized", alternatives: [], alternativeIndex: 0,
          timeline: [{ time: "9:00 AM", title: "Trocadero + Eiffel Tower", copy: "Go early." }, { time: "Flexible", title: "Open time", copy: "" }] },
        protectedAnchors: [{ label: "Eiffel Tower", key: "eiffeltower", type: "sight", source: "guide", scheduled: true, stepTitle: "Trocadero + Eiffel Tower", stepTime: "9:00 AM" }]
      }
    ]
  };
}

const sampleAppState = {
  destination: "Paris, France", startDate: "2026-11-06", endDate: "2026-11-07", adults: 2, children: 0, pets: "No pets",
  styles: ["Relaxing", "Foodie"], pace: "Balanced", budget: "Moderate", flightMode: "have-flights", flightNumber: "AF123",
  hotelName: "Hotel Test", hotelArea: "Le Marais"
};

test("times convert both ways and unknown times stay untimed", () => {
  const format = loadFormat();
  assert.equal(format.toClockTime("9:00 AM"), "09:00");
  assert.equal(format.toClockTime("12:30 PM"), "12:30");
  assert.equal(format.toClockTime("12:00 AM"), "00:00");
  assert.equal(format.toClockTime("Flexible"), null);
  assert.equal(format.toDisplayTime("18:30"), "6:30 PM");
  assert.equal(format.toDisplayTime(null), null);
});

test("app trip -> v2 -> app keeps days, stop ids, times, must-haves and versions", () => {
  const format = loadFormat();
  const version = { id: "ver-1", name: "Lighter Eiffel day", savedAt: "Oct 10", trip: sampleAppTrip() };
  const v2 = format.tripFromApp({ appState: sampleAppState, currentTrip: sampleAppTrip(), alternateTrips: [version], bookingItems: { "ticket-eiffeltower": { status: "booked", note: "9am slot", savedAt: "Oct 10" } } });

  assert.equal(v2.timeZone, "Europe/Paris");
  assert.deepEqual(plain(v2.days.map((day) => day.date)), ["2026-11-06", "2026-11-07"]);
  assert.ok(v2.days.every((day) => day.stops.every((stop) => /^stp_/.test(stop.id))), "every stop gets a stable id");
  assert.equal(v2.days[1].stops[1].start, null, "Flexible stays untimed");
  const eiffel = v2.mustHaves.find((mustHave) => mustHave.key === "eiffeltower");
  assert.equal(eiffel.scheduled[0].stopId, v2.days[1].stops[0].id);
  assert.equal(v2.mustHaves.find((mustHave) => mustHave.key === "foodmarket").scheduled.length, 0);
  assert.equal(v2.bookings[0].stopId, v2.days[1].stops[0].id, "booking linked to its scheduled stop");

  const back = format.tripToApp(plain(v2));
  assert.equal(back.currentTrip.days[0].item.timeline[1].title, "Dinner at Chez Janou");
  assert.equal(back.currentTrip.days[0].item.timeline[0].time, "9:00 AM");
  assert.equal(back.currentTrip.days[1].item.body, "", "display text survives");
  assert.equal(back.currentTrip.days[1].protectedAnchors[0].stepTitle, "Trocadero + Eiffel Tower");
  assert.equal(back.currentTrip.unscheduledMustHaves[0].label, "Food market");
  assert.equal(back.alternateTrips[0].name, "Lighter Eiffel day");
  assert.equal(back.alternateTrips[0].trip.days.length, 2);
  assert.equal(back.bookingItems["ticket-eiffeltower"].note, "9am slot");
  assert.equal(back.appState.flightNumber, "AF123");

  // Ids are stable: converting again keeps the same stop ids.
  const again = format.tripFromApp({ id: v2.id, appState: back.appState, currentTrip: back.currentTrip });
  assert.equal(again.days[0].stops[0].id, v2.days[0].stops[0].id);
});

test("v1 backups upgrade, including versions only present in the stored draft", () => {
  const format = loadFormat();
  const v1 = {
    type: "local-account-backup", version: 1, exportedAt: "2026-10-10T20:00:00Z",
    alternateTrips: [],
    tripProfile: { displayName: "Test Traveler" },
    storage: {
      draft: { appState: sampleAppState, currentTrip: sampleAppTrip(), alternateTrips: [{ id: "ver-1", name: "Lighter Eiffel day", trip: sampleAppTrip() }] },
      profile: { displayName: "Test Traveler", homeAirport: "JFK" },
      booking: { items: { "meal-onememorabledinner": { status: "booked", note: "table for 2" } } }
    }
  };
  const envelope = format.readBackup(v1);
  assert.equal(envelope.format, "fullest-life-trip");
  assert.equal(envelope.schemaVersion, 2);
  assert.equal(envelope.trips.length, 1);
  assert.equal(envelope.trips[0].versions[0].name, "Lighter Eiffel day");
  assert.equal(envelope.trips[0].bookings[0].note, "table for 2");
  assert.equal(envelope.profile.homeAirport, "JFK");
  assert.equal(envelope.activeTripId, envelope.trips[0].id);
});

test("readBackup rejects files it cannot safely read", () => {
  const format = loadFormat();
  assert.throws(() => format.readBackup(null), /empty or unreadable/);
  assert.throws(() => format.readBackup({ type: "something-else" }), /does not look like/);
  assert.throws(() => format.readBackup({ format: "fullest-life-trip", schemaVersion: 3, trips: [] }), /newer version/);
  assert.throws(() => format.readBackup({ format: "fullest-life-trip", schemaVersion: 2 }), /no trips/);
});

test("shared copies are frozen snapshots with no private data", () => {
  const format = loadFormat();
  const trip = format.tripFromApp({
    appState: sampleAppState, currentTrip: sampleAppTrip(),
    alternateTrips: [{ id: "ver-1", name: "Lighter Eiffel day", trip: { days: [sampleAppTrip().days[0]] } }],
    bookingItems: { "ticket-eiffeltower": { status: "booked", note: "confirmation ABC123" } }
  });
  const share = plain(format.buildShareCopy(trip));
  const text = JSON.stringify(share);
  assert.equal(share.kind, "share");
  assert.equal(share.trips[0].label, "Shared copy");
  assert.ok(!("profile" in share));
  for (const secret of ["ABC123", "AF123", "Hotel Test", "flightNumber", "bookings", "inputs"]) {
    assert.ok(!text.includes(secret), `share copy must not contain ${secret}`);
  }
  assert.ok(!text.includes("Le Marais\"},\"stay"), "stay details only with includeLogistics");

  const versionShare = plain(format.buildShareCopy(trip, { versionId: "ver-1" }));
  assert.equal(versionShare.trips[0].days.length, 1, "shares the chosen version, not the live trip");
  assert.equal(versionShare.trips[0].sharedFrom.versionName, "Lighter Eiffel day");
  assert.throws(() => format.buildShareCopy(trip, { versionId: "gone" }), /no longer exists/);

  // Frozen: editing the trip afterwards does not change an existing share.
  trip.days[0].title = "Edited later";
  assert.equal(share.trips[0].days[0].title, "Le Marais opening day");
});

test("importing never silently overwrites another trip", () => {
  const format = loadFormat();
  const existing = { activeTripId: "trp_a", trips: [{ id: "trp_a", title: "Paris" }] };
  const incoming = [{ id: "trp_a", title: "Paris" }, { id: "trp_b", title: "London" }];

  const keepBoth = plain(format.mergeIntoCollection(existing, incoming));
  assert.equal(keepBoth.collection.trips.length, 3);
  assert.equal(keepBoth.collection.trips[0].title, "Paris", "original untouched");
  assert.ok(keepBoth.collection.trips.some((trip) => trip.title === "Paris (imported)" && trip.id !== "trp_a"));
  assert.deepEqual(keepBoth.report.added, ["trp_b"]);

  const replace = plain(format.mergeIntoCollection(existing, [{ id: "trp_a", title: "Paris v2" }], { onConflict: "replace" }));
  assert.equal(replace.collection.trips.length, 1);
  assert.equal(replace.collection.trips[0].title, "Paris v2");
  assert.deepEqual(replace.report.replaced, ["trp_a"]);
});
