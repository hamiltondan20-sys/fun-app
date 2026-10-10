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
  const context = vm.createContext({
    window: { localStorage: { setItem: (key, value) => storage.set(key, value) } },
    DRAFT_STORAGE_KEY: "draft", PROFILE_STORAGE_KEY: "profile", BOOKING_STORAGE_KEY: "booking",
    hbState: { appState: {}, tripProfile: {} },
    cloneData: (value) => JSON.parse(JSON.stringify(value)),
    formatDraftSavedAt: () => "Test date", getDraftMetaFromPayload: () => ({}),
    syncPlanningInputsFromState() {}, renderTrip() {}, renderSavedPanel() {}
  });
  vm.runInContext(source.slice(start, end), context);
  return { context, storage };
}

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
  const source = fs.readFileSync(path.join(root, "scripts/app-trip.js"), "utf8");
  const start = source.indexOf("    function applyLocalAccountBackup(payload)");
  const end = source.indexOf("    function createVersionId()", start);
  assert.ok(start >= 0 && end > start);
  const storage = new Map();
  const context = vm.createContext({
    window: { localStorage: { setItem: (key, value) => storage.set(key, value) } },
    DRAFT_STORAGE_KEY: "draft", PROFILE_STORAGE_KEY: "profile", BOOKING_STORAGE_KEY: "booking",
    hbState: { appState: {}, tripProfile: {} },
    cloneData: (value) => JSON.parse(JSON.stringify(value)),
    formatDraftSavedAt: () => "Test date", getDraftMetaFromPayload: () => ({}),
    syncPlanningInputsFromState() {}, renderTrip() {}, renderSavedPanel() {},
    FileReader: class {
      readAsText(file) { this.result = file.content; this.onload(); }
    }
  });
  vm.runInContext(source.slice(start, end), context);
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
