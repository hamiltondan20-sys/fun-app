import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "plan/index.html"), "utf8");

test("planner references resolve through its base at project and custom-domain roots", () => {
  const baseHref = html.match(/<base\s+href="([^"]+)"/)[1];
  const references = [...html.replace(/<base\b[^>]*>/, "")
    .matchAll(/(?:href|src)="(\.\.?\/[^"?#]*)(?:[^"]*)"|"(\.\/(?:scripts|data)\/[^"?#]+\.js)\?v=[^"]*"/g)]
    .map(([match, attribute, loaderScript]) => [match, attribute || loaderScript]);
  for (const page of ["https://example.com/fun-app/plan/", "https://example.com/plan/"]) {
    const base = new URL(baseHref, page);
    for (const [, reference] of references) {
      const resolved = new URL(reference, base);
      assert.ok(resolved.pathname.startsWith(base.pathname), `${reference} escapes ${base.pathname}`);
      const relative = resolved.pathname.slice(base.pathname.length);
      const target = path.join(root, relative);
      assert.ok(fs.existsSync(target), `Missing planner reference: ${reference}`);
    }
  }
});

function loadRestoreContext() {
  const source = fs.readFileSync(path.join(root, "scripts/app-trip.js"), "utf8");
  const start = source.indexOf("    function applyLocalAccountBackup(payload)");
  const end = source.indexOf("    function createVersionId()", start);
  assert.ok(start >= 0 && end > start);
  const storage = new Map();
  const collection = { activeTripId: null, trips: [] };
  const context = vm.createContext({
    window: { localStorage: { setItem: (key, value) => storage.set(key, value) } },
    DRAFT_STORAGE_KEY: "draft", PROFILE_STORAGE_KEY: "profile", BOOKING_STORAGE_KEY: "booking",
    hbState: { appState: {}, tripProfile: {} },
    cloneData: (value) => JSON.parse(JSON.stringify(value)),
    formatDraftSavedAt: () => "Test date", getDraftMetaFromPayload: () => ({}),
    syncPlanningInputsFromState() {}, renderTrip() {}, renderSavedPanel() {},
    // Trip-list functions live outside this slice; scripts/trip-collection.test.mjs covers them.
    saveActiveTripBeforeLeaving() {}, persistTripDraft() {},
    readTripCollection: () => collection,
    upsertTripEntry(draft) {
      const id = draft?.currentTrip?.tripId;
      if (!id) return;
      collection.trips = collection.trips.filter((item) => item.id !== id).concat([{ id, title: draft.currentTrip.title, draft }]);
    }
  });
  vm.runInContext(source.slice(start, end), context);
  return { context, storage, collection };
}

test("restore accepts a v2 backup through the same restore path", () => {
  const { context, storage } = loadRestoreContext();
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-format.js"), "utf8"), context);
  const format = context.window.HB_TRIP_FORMAT;
  const appTrip = { title: "Paris trip", days: [{ id: "day-1", title: "Day one", area: "Le Marais",
    item: { title: "t", body: "b", fit: "f", label: "l", alternatives: [], alternativeIndex: 0, timeline: [{ time: "9:00 AM", title: "Pastry", copy: "" }] },
    protectedAnchors: [] }] };
  const trip = format.tripFromApp({ appState: { destination: "Paris, France", startDate: "2026-11-06" }, currentTrip: appTrip,
    alternateTrips: [{ id: "v1", name: "Lighter", trip: appTrip }], bookingItems: { "flight-search": { status: "searching", note: "n" } } });
  context.v2File = { name: "the-fullest-life-travel-paris-france-backup.json",
    content: JSON.stringify(format.buildEnvelope({ trips: [trip], profile: { displayName: "Test Traveler" } })) };
  context.cloneData = (value) => JSON.parse(JSON.stringify(value));
  context.FileReader = class { readAsText(file) { this.result = file.content; this.onload(); } };
  vm.runInContext("importLocalAccountBackup(v2File)", context);

  assert.equal(context.hbState.localAccountFeedback, "Backup restored: 1 trip added to this browser");
  const draft = JSON.parse(storage.get("draft"));
  assert.equal(draft.currentTrip.tripId, trip.id, "trip id survives restore");
  assert.equal(draft.currentTrip.days[0].item.timeline[0].id, trip.days[0].stops[0].id, "stop id survives restore");
  assert.equal(draft.alternateTrips[0].name, "Lighter");
  assert.equal(JSON.parse(storage.get("profile")).displayName, "Test Traveler");
  assert.equal(JSON.parse(storage.get("booking")).items["flight-search"].status, "searching");
  assert.equal(draft.bookingItems["flight-search"].status, "searching", "Restore draft reads bookings from the draft");
});

test("restoring a trip that already exists asks, and never overwrites without a yes", () => {
  for (const answer of [false, true]) {
    const { context, collection } = loadRestoreContext();
    vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-format.js"), "utf8"), context);
    const format = context.window.HB_TRIP_FORMAT;
    const appTrip = { title: "Paris trip", days: [{ id: "day-1", title: "From backup", item: { timeline: [{ time: "9:00 AM", title: "Pastry" }] } }] };
    const trip = format.tripFromApp({ id: "trp_same", appState: { destination: "Paris, France" }, currentTrip: appTrip });
    collection.trips.push({ id: "trp_same", title: "My Paris trip", draft: { currentTrip: { tripId: "trp_same", title: "My Paris trip" } } });
    const asked = [];
    context.window.confirm = (message) => { asked.push(message); return answer; };
    context.FileReader = class { readAsText(file) { this.result = file.content; this.onload(); } };
    context.file = { content: JSON.stringify(format.buildEnvelope({ trips: [trip] })) };
    vm.runInContext("importLocalAccountBackup(file)", context);

    assert.equal(asked.length, 1);
    assert.match(asked[0], /My Paris trip/);
    if (answer) {
      assert.equal(collection.trips.length, 1, "replace keeps one copy");
      assert.equal(collection.trips[0].id, "trp_same");
      assert.equal(collection.trips[0].draft.currentTrip.days[0].title, "From backup");
      assert.match(context.hbState.localAccountFeedback, /1 replaced/);
    } else {
      assert.equal(collection.trips.length, 2, "keep both");
      assert.equal(collection.trips[0].title, "My Paris trip", "original untouched");
      assert.ok(collection.trips[1].id !== "trp_same");
      assert.equal(collection.trips[1].title, "Paris trip (imported)");
      assert.match(context.hbState.localAccountFeedback, /kept alongside/);
    }
  }
});

test("restore refuses a shared copy and a backup from a newer planner", () => {
  const { context } = loadRestoreContext();
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-format.js"), "utf8"), context);
  context.FileReader = class { readAsText(file) { this.result = file.content; this.onload(); } };
  context.renderSavedPanel = () => {};
  context.shareFile = { content: JSON.stringify({ format: "fullest-life-trip", schemaVersion: 2, kind: "share", trips: [] }) };
  vm.runInContext("importLocalAccountBackup(shareFile)", context);
  assert.equal(JSON.stringify(context.readTripCollection().trips), "[]", "a refused file adds nothing");
  assert.match(context.hbState.localAccountFeedback, /shared trip copy/);
  context.newerFile = { content: JSON.stringify({ format: "fullest-life-trip", schemaVersion: 9, trips: [] }) };
  vm.runInContext("importLocalAccountBackup(newerFile)", context);
  assert.match(context.hbState.localAccountFeedback, /newer version/);
});

test("restore keeps saved versions when the export was made before they loaded into memory", () => {
  // Real flow: open Saved on a fresh page load, click Export. The in-memory list is still empty,
  // but the stored draft inside the file holds the named versions.
  const { context, storage } = loadRestoreContext();
  context.payload = {
    type: "local-account-backup",
    alternateTrips: [],
    storage: { draft: { appState: { destination: "Paris, France" }, alternateTrips: [{ id: "v1", name: "Lighter Eiffel day", trip: { days: [] } }] } }
  };
  vm.runInContext("applyLocalAccountBackup(payload)", context);
  assert.equal(context.hbState.alternateTrips.length, 1);
  assert.equal(context.hbState.alternateTrips[0].name, "Lighter Eiffel day");
  assert.equal(JSON.parse(storage.get("draft")).alternateTrips[0].name, "Lighter Eiffel day");
});

test("restore merges newer export-time versions with stored ones without duplicates", () => {
  const { context, storage } = loadRestoreContext();
  context.payload = {
    type: "local-account-backup",
    alternateTrips: [{ id: "v1", name: "Renamed later", trip: { days: [] } }, { id: "v2", name: "Newer version", trip: { days: [] } }],
    storage: { draft: { appState: {}, alternateTrips: [{ id: "v1", name: "Old name", trip: { days: [] } }, { id: "v0", name: "Only stored", trip: { days: [] } }] } }
  };
  vm.runInContext("applyLocalAccountBackup(payload)", context);
  const names = JSON.parse(storage.get("draft")).alternateTrips.map((version) => version.name);
  assert.deepEqual(names, ["Renamed later", "Newer version", "Only stored"]);
});

test("restore accepts an old-brand backup with its legacy filename", () => {
  const { context, storage } = loadRestoreContext();
  context.FileReader = class {
    readAsText(file) { this.result = file.content; this.onload(); }
  };
  context.legacyFile = {
    name: "horizon-bound-paris-backup.json",
    content: JSON.stringify({ type: "local-account-backup", product: "Horizon Bound",
      appState: { destination: "Paris, France" }, tripProfile: { name: "Test traveler" },
      alternateTrips: [{ id: "newer-version", name: "Named newer version", trip: { days: [{ title: "Edited day" }] } }],
      storage: { draft: { appState: { destination: "Paris, France" }, alternateTrips: [] } } })
  };
  vm.runInContext("importLocalAccountBackup(legacyFile)", context);
  assert.equal(context.hbState.localAccountFeedback, "Backup restored on this browser");
  assert.equal(JSON.parse(storage.get("draft")).appState.destination, "Paris, France");
  assert.equal(context.hbState.alternateTrips[0].name, "Named newer version");
  assert.equal(JSON.parse(storage.get("draft")).alternateTrips[0].trip.days[0].title, "Edited day");
});
