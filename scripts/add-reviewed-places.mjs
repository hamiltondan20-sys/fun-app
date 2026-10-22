// Adds places to a city guide that already has a source review (scripts/apply-source-review.mjs), for example
// major sights first read later in a browser because automated fetches were refused. Input JSON:
//   { "city": "New York, United States", "checkedOn": "YYYY-MM-DD", "method": "...", "limitationsNote": "...",
//     "places": [ { "name", "url", "sourceType", "address", "operatingEvidence", "hours", "query",
//                   "categories": ["bestAttractions", ...], "replacesExcluded": ["name in excludedCandidates"] } ] }
// - data/city-source-ledger.js: each place joins placeSources; the excluded candidates it replaces are removed,
//   and limitationsNote is appended to limitations.
// - data/destination-expansion.js: a block puts each place at the front of its categories (5 per list at most),
//   adds its map query and recounts the trust line.
// - docs/content-research/<slug>-<original date>.{json,md} record the additions.
//
//   node scripts/add-reviewed-places.mjs <additions.json> [--dry-run]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [inputPath] = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const dryRun = process.argv.includes("--dry-run");
if (!inputPath) throw new Error("Usage: node scripts/add-reviewed-places.mjs <additions.json> [--dry-run]");

const input = JSON.parse(fs.readFileSync(inputPath, "utf8").replace(/^﻿/, ""));
const CATEGORIES = ["bestAttractions", "bestFirstTimers", "bestRestaurants", "bestBudget", "bestLuxury", "bestCouples", "bestKids", "bestSolo", "bestUnique", "bestBreakfast", "bestLunch", "bestDinner", "bestCocktails", "bestBakeries", "bestCoffee"];
const MAX_PER_LIST = 5;
const problems = [];
const need = (condition, message) => { if (!condition) problems.push(message); };

const key = input.city;
const date = input.checkedOn;
need(/^\d{4}-\d{2}-\d{2}$/.test(date || ""), "checkedOn must be YYYY-MM-DD");
need(input.method?.trim(), "method is required");
const places = Array.isArray(input.places) ? input.places : [];
need(places.length, "no places");
for (const place of places) {
  let https = false;
  try { https = new URL(place.url).protocol === "https:"; } catch { https = false; }
  need(https, `${place.name}: url must be https`);
  need(place.name && place.sourceType && place.address?.trim() && place.operatingEvidence?.trim() && place.query?.trim(), `${place.name}: needs name, sourceType, address, operatingEvidence and query`);
  need((place.categories || []).length && place.categories.every((category) => CATEGORIES.includes(category)), `${place.name}: unknown or missing categories`);
}
need(!/\busers?\b/i.test(JSON.stringify(input.limitationsNote || "")), "limitationsNote must not say 'users'");

const ledgerFile = path.join(root, "data/city-source-ledger.js");
const expansionFile = path.join(root, "data/destination-expansion.js");
let ledgerText = fs.readFileSync(ledgerFile, "utf8");
const entryStart = ledgerText.indexOf(`  ${JSON.stringify(key)}: {\n`);
need(entryStart >= 0, `${key} has no ledger entry; use apply-source-review.mjs first`);
const entryEnd = entryStart >= 0 ? ledgerText.indexOf("\n  },\n", entryStart) : -1;
const entryText = entryEnd > 0 ? ledgerText.slice(entryStart, entryEnd) : "";
for (const place of places) need(!entryText.includes(`      ${JSON.stringify(place.name)}: {`), `${place.name} is already in placeSources`);
const originalDate = (entryText.match(/"checkedOn": "(\d{4}-\d{2}-\d{2})"/) || [])[1];
need(originalDate, "ledger entry has no checkedOn");
if (problems.length) {
  console.error(`Additions for ${key} not applied:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

// ---- Ledger ----
let entry = entryText;
const sourcesAnchor = '    "placeSources": {\n';
if (!entry.includes(sourcesAnchor)) throw new Error("placeSources not found");
const sourceLines = places.map((place) => `      ${JSON.stringify(place.name)}: ${JSON.stringify({
  url: place.url,
  sourceType: place.sourceType,
  checkedOn: date,
  operatingEvidence: place.operatingEvidence
}, null, 2).split("\n").join("\n      ")},\n`).join("");
entry = entry.replace(sourcesAnchor, sourcesAnchor + sourceLines);
let removed = 0;
for (const name of places.flatMap((place) => place.replacesExcluded || [])) {
  const pattern = new RegExp(`\\n      \\{\\n        "name": ${JSON.stringify(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")},\\n[\\s\\S]*?\\n      \\}(,?)`);
  const match = entry.match(pattern);
  if (!match) { console.warn(`  excluded candidate not found: ${name}`); continue; }
  // Drop the object; if it was the last item, drop the comma before it instead.
  entry = match[1] ? entry.replace(pattern, "") : entry.replace(new RegExp(`,${pattern.source}`), "");
  removed += 1;
}
if (input.limitationsNote) {
  entry = entry.replace(/("limitations": ")((?:[^"\\]|\\.)*)(")/, (_, open, text, close) => `${open}${text} ${JSON.stringify(input.limitationsNote).slice(1, -1)}${close}`);
}
ledgerText = ledgerText.slice(0, entryStart) + entry + ledgerText.slice(entryEnd);

// ---- Guide data ----
const slug = key.split(",")[0].trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const researchBase = `docs/content-research/${slug}-${originalDate}`;
const q = (value) => JSON.stringify(value);
const block = `  // ${key}: places added ${date} after the source review (${researchBase}.md).
  {
    const cityKey = ${q(key)};
    const detail = data.cityGuideDetailData[cityKey];
    const additions = ${JSON.stringify(Object.fromEntries(places.map((place) => [place.name, place.categories])))};
    for (const [name, categories] of Object.entries(additions)) {
      for (const category of categories) {
        const list = [name, ...(detail[category] || []).filter((item) => item !== name)];
        // Trim to ${MAX_PER_LIST} from the end, but never drop a place that appears in no other list.
        for (let index = list.length - 1; list.length > ${MAX_PER_LIST} && index > 0; index -= 1) {
          if (Object.entries(detail).some(([other, items]) => other !== category && items.includes(list[index]))) list.splice(index, 1);
        }
        detail[category] = list;
      }
    }
    Object.assign(data.cityPlaceQueries[cityKey], ${JSON.stringify(Object.fromEntries(places.map((place) => [place.name, place.query])))});
    const editorial = data.cityEditorialPageData[cityKey];
    const count = new Set(Object.values(detail).flat()).size;
    if (editorial?.trust) editorial.trust = editorial.trust.replace(/^All \\d+ distinct recommendations/, \`All \${count} distinct recommendations\`);
  }
`;
const expansionText = fs.readFileSync(expansionFile, "utf8");
const end = expansionText.lastIndexOf("})();");
if (end < 0) throw new Error("destination-expansion.js end not found");
const newExpansion = `${expansionText.slice(0, end)}${block}${expansionText.slice(end)}`;

// ---- Research notes ----
const jsonFile = path.join(root, `${researchBase}.json`);
const mdFile = path.join(root, `${researchBase}.md`);
const research = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
research.additions = [...(research.additions || []), { checkedOn: date, method: input.method, places }];
const md = `${fs.readFileSync(mdFile, "utf8").trimEnd()}

## Added ${date} (${places.length})

${input.method}

| Place | Source | Opening hours as published |
|---|---|---|
${places.map((place) => `| ${place.name} | ${place.sourceType} | ${String(place.hours || "not published").replace(/\|/g, "/")} |`).join("\n")}
`;

if (dryRun) {
  console.log(`OK (dry run): ${key}: ${places.length} places to add, ${removed} excluded candidates replaced.`);
  process.exit(0);
}
fs.writeFileSync(ledgerFile, ledgerText);
fs.writeFileSync(expansionFile, newExpansion);
fs.writeFileSync(jsonFile, `${JSON.stringify(research, null, 2)}\n`);
fs.writeFileSync(mdFile, md);
console.log(`Added ${places.length} places to ${key}; ${removed} excluded candidates replaced.`);
