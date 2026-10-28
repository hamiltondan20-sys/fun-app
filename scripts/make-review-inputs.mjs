#!/usr/bin/env node
// Writes the input for a city source review (docs/content-review-brief.md): { key, detail } with the guide's
// current recommendation lists, to %TEMP%\fa-review-input-<slug>.json.
//
//   node scripts/make-review-inputs.mjs "Lima, Peru" "Santiago, Chile" ...
//   node scripts/make-review-inputs.mjs --next=3   (the next unreviewed guides in docs/content-review-queue.txt)
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = vm.createContext({ window: {} });
for (const name of ["destinations", "country-guides", "city-guides", "trip-content", "top-100-destinations", "destination-expansion", "destination-coverage", "city-source-ledger"]) {
  vm.runInContext(fs.readFileSync(path.join(root, "data", `${name}.js`), "utf8"), context);
}
const data = context.window.HB_DATA;
const slugOf = (key) => key.split(",")[0].trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

let keys = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const next = Number((process.argv.find((arg) => arg.startsWith("--next=")) || "").split("=")[1] || 0);
if (next) {
  // The queue lists cities in priority order, one "City, Country" key per line; # starts a comment.
  // Take those not yet reviewed and with no review output already waiting in %TEMP%.
  const queue = fs.readFileSync(path.join(root, "docs/content-review-queue.txt"), "utf8");
  keys = queue.split(/\r?\n/).map((line) => line.replace(/#.*/, "").trim()).filter(Boolean)
    .filter((key) => !data.citySourceLedger?.[key])
    .filter((key) => !fs.existsSync(path.join(os.tmpdir(), `fa-review-${slugOf(key)}.json`)))
    .slice(0, next);
}
for (const key of keys) {
  const detail = data.cityGuideDetailData[key];
  if (!detail) { console.log(`missing ${key}`); continue; }
  const file = path.join(os.tmpdir(), `fa-review-input-${slugOf(key)}.json`);
  fs.writeFileSync(file, JSON.stringify({ key, detail: JSON.parse(JSON.stringify(detail)) }, null, 2));
  console.log(`${key}\t${file}`);
}
