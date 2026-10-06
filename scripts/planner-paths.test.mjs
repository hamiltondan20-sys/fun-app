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
    .matchAll(/(?:href|src)="(\.\.?\/[^"?#]*)(?:[^"]*)"/g)];
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
      appState: { destination: "Paris, France" }, tripProfile: { name: "Test traveler" } })
  };
  vm.runInContext("importLocalAccountBackup(legacyFile)", context);
  assert.equal(context.hbState.localAccountFeedback, "Backup restored on this browser");
  assert.equal(JSON.parse(storage.get("draft")).appState.destination, "Paris, France");
});
