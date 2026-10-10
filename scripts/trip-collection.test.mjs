import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tripSource = fs.readFileSync(path.join(root, "scripts/app-trip.js"), "utf8");

// The trip-collection block of app-trip.js, run against a fake localStorage.
function loadCollection(initialStorage = {}) {
  const start = tripSource.indexOf("    // ---- Trip collection");
  const end = tripSource.indexOf("    function persistTripDraft(", start);
  assert.ok(start >= 0 && end > start, "trip collection block not found");
  const store = new Map(Object.entries(initialStorage).map(([key, value]) => [key, JSON.stringify(value)]));
  const calls = { restored: [], persisted: 0 };
  const context = vm.createContext({
    window: {
      localStorage: {
        getItem: (key) => (store.has(key) ? store.get(key) : null),
        setItem: (key, value) => store.set(key, String(value)),
        removeItem: (key) => store.delete(key)
      }
    },
    crypto: globalThis.crypto, Date, JSON, Math, Uint8Array,
    DRAFT_STORAGE_KEY: "draft", BOOKING_STORAGE_KEY: "booking", TRIPS_STORAGE_KEY: "trips", PREMIGRATION_STORAGE_KEY: "premigration",
    hbState: { appState: {}, tripAutosaveEnabled: false, currentTrip: null },
    cloneData: (value) => JSON.parse(JSON.stringify(value)),
    formatDraftSavedAt: () => "Oct 10",
    getStoredTripDraft: () => (store.has("draft") ? JSON.parse(store.get("draft")) : null),
    restoreSavedDraft() {
      const draft = JSON.parse(store.get("draft"));
      calls.restored.push(draft.currentTrip.tripId);
      context.hbState.currentTrip = draft.currentTrip;
      context.hbState.tripAutosaveEnabled = true;
      return true;
    },
    persistTripDraft() { calls.persisted += 1; }
  });
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-format.js"), "utf8"), context);
  vm.runInContext(tripSource.slice(start, end), context);
  const read = (key) => (store.has(key) ? JSON.parse(store.get(key)) : null);
  return { context, store, read, calls };
}

const draftFor = (tripId, title, extra = {}) => ({
  savedAtMs: extra.savedAtMs || 1,
  appState: { destination: extra.destination || "Paris, France", startDate: "2026-11-06", endDate: "2026-11-12" },
  currentTrip: { tripId, title, days: [{ id: "day-1", item: { timeline: [{ time: "9:00 AM", title: "Stop" }] } }] },
  alternateTrips: extra.versions || [],
  bookingItems: extra.bookings || {}
});

test("migration moves an existing single draft into the list without touching the original", () => {
  const legacy = { savedAtMs: 5, appState: { destination: "Paris, France" }, currentTrip: { title: "Old trip", days: [{ id: "day-1", item: { timeline: [{ title: "Stop" }] } }] } };
  const { context, read } = loadCollection({ draft: legacy });
  context.migrateToTripCollection();

  const collection = read("trips");
  assert.equal(collection.trips.length, 1);
  assert.equal(collection.trips[0].title, "Old trip");
  assert.equal(collection.activeTripId, collection.trips[0].id);
  assert.match(collection.trips[0].id, /^trp_/);
  assert.deepEqual(read("premigration"), legacy, "untouched fallback copy");
  assert.equal(read("draft").currentTrip.tripId, collection.trips[0].id, "working copy carries the new id");
  assert.match(read("draft").currentTrip.days[0].item.timeline[0].id, /^stp_/);

  // Runs once: a second load changes nothing.
  context.migrateToTripCollection();
  assert.equal(read("trips").trips.length, 1);
});

test("migration with no saved trip creates an empty list", () => {
  const { context, read } = loadCollection();
  context.migrateToTripCollection();
  assert.deepEqual(JSON.parse(JSON.stringify(read("trips"))), { activeTripId: null, trips: [] });
  assert.equal(read("premigration"), null);
});

test("saving keeps one entry per trip and tracks the active trip", () => {
  const { context, read } = loadCollection();
  context.upsertTripEntry(draftFor("trp_a", "Paris"));
  context.upsertTripEntry(draftFor("trp_b", "London", { destination: "London, United Kingdom" }));
  context.upsertTripEntry(draftFor("trp_a", "Paris renamed"));
  const collection = read("trips");
  assert.equal(collection.trips.length, 2);
  assert.equal(collection.trips.find((item) => item.id === "trp_a").title, "Paris renamed");
  assert.equal(collection.activeTripId, "trp_a");
  context.upsertTripEntry({ currentTrip: null });
  assert.equal(read("trips").trips.length, 2, "a draft without a trip is not listed");
});

test("opening a trip loads its draft and bookings into the workspace", () => {
  const { context, read, calls } = loadCollection();
  context.upsertTripEntry(draftFor("trp_a", "Paris"));
  context.upsertTripEntry(draftFor("trp_b", "London", { bookings: { "flight-search": { status: "booked", note: "BA" } } }));
  assert.equal(context.openTripFromCollection("trp_b"), true);
  assert.deepEqual([...calls.restored], ["trp_b"]);
  assert.equal(read("draft").currentTrip.title, "London");
  assert.equal(read("booking").items["flight-search"].note, "BA");
  assert.equal(read("trips").activeTripId, "trp_b");
  assert.equal(context.openTripFromCollection("missing"), false);
});

test("leaving a trip saves it first, but only when the screen holds the saved trip", () => {
  const { context, calls } = loadCollection();
  context.upsertTripEntry(draftFor("trp_a", "Paris"));
  context.hbState.currentTrip = { tripId: "unsaved-default" };
  context.hbState.tripAutosaveEnabled = false;
  context.openTripFromCollection("trp_a");
  assert.equal(calls.persisted, 0, "an unsaved screen never overwrites the stored trip");
  context.openTripFromCollection("trp_a");
  assert.equal(calls.persisted, 1, "after opening, the trip on screen is saved before leaving");
});

test("rename, duplicate and delete", () => {
  const { context, read, calls } = loadCollection();
  context.upsertTripEntry(draftFor("trp_a", "Paris", { savedAtMs: 1, versions: [{ id: "v1", name: "Lighter" }] }));
  context.upsertTripEntry(draftFor("trp_b", "London", { savedAtMs: 2 }));

  assert.equal(context.renameTripInCollection("trp_a", "  Paris in November  "), true);
  assert.equal(read("trips").trips.find((item) => item.id === "trp_a").draft.currentTrip.title, "Paris in November");
  assert.equal(context.renameTripInCollection("trp_a", "   "), false, "blank names are ignored");

  const copyId = context.duplicateTripInCollection("trp_a");
  const copy = read("trips").trips.find((item) => item.id === copyId);
  assert.equal(copy.title, "Paris in November (copy)");
  assert.equal(copy.draft.currentTrip.tripId, copyId);
  assert.equal(copy.draft.alternateTrips[0].name, "Lighter", "versions come along");
  assert.equal(read("trips").trips.length, 3);

  // Deleting an inactive trip leaves the open one alone.
  assert.equal(context.deleteTripFromCollection(copyId), true);
  assert.equal(read("trips").trips.length, 2);
  assert.equal(calls.restored.length, 0);

  // Deleting the open trip opens the most recently updated remaining one.
  context.openTripFromCollection("trp_a");
  context.deleteTripFromCollection("trp_a");
  assert.equal(calls.restored.at(-1), "trp_b");
  assert.equal(read("trips").activeTripId, "trp_b");

  // Deleting the last trip clears the workspace.
  context.deleteTripFromCollection("trp_b");
  assert.equal(read("trips").trips.length, 0);
  assert.equal(read("draft"), null);
  assert.equal(context.hbState.currentTrip, null);
  assert.equal(context.hbState.tripAutosaveEnabled, false);
});

test("planning a new trip keeps the current one and clears the workspace", () => {
  const { context, read, calls } = loadCollection();
  context.upsertTripEntry(draftFor("trp_a", "Paris"));
  context.openTripFromCollection("trp_a");
  context.startNewTrip();
  assert.ok(calls.persisted >= 1, "current trip saved before leaving");
  assert.equal(read("trips").trips.length, 1, "Paris stays in the list");
  assert.equal(read("trips").activeTripId, null);
  assert.equal(read("draft"), null);
  assert.equal(context.hbState.currentTrip, null);
  assert.equal(context.hbState.startNewTrip, true, "next build gets a new trip id");
});

test("a corrupt list is treated as empty without touching the working draft", () => {
  const { context, store } = loadCollection({ draft: draftFor("trp_a", "Paris") });
  store.set("trips", "{not json");
  assert.deepEqual(JSON.parse(JSON.stringify(context.readTripCollection())), { activeTripId: null, trips: [] });
  assert.equal(JSON.parse(store.get("draft")).currentTrip.title, "Paris");
});
