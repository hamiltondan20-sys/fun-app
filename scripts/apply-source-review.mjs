// Applies a city source review (research JSON in the format of docs/content-research/london-2026-10-14.json
// plus a "guide" block) to the guide data:
// - data/city-source-ledger.js gets a renderVerifiedOnly ledger entry with one evidence record per confirmed place.
// - data/destination-expansion.js gets the guide's lists, map queries, summary, tip, planning toolkit and intro,
//   all written only from confirmed places.
// - docs/content-research/<slug>-<date>.{json,md} keep the evidence and a readable summary.
// It refuses reviews that don't hold up: unconfirmed names in the lists, missing evidence, "users" wording,
// injection-like text, or a city that already has a ledger entry.
//
//   node scripts/apply-source-review.mjs <review.json> [--dry-run]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [reviewPath] = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const dryRun = process.argv.includes("--dry-run");
if (!reviewPath) throw new Error("Usage: node scripts/apply-source-review.mjs <review.json> [--dry-run]");

const review = JSON.parse(fs.readFileSync(reviewPath, "utf8").replace(/^﻿/, ""));
const CATEGORIES = ["bestAttractions", "bestFirstTimers", "bestRestaurants", "bestBudget", "bestLuxury", "bestCouples", "bestKids", "bestSolo", "bestUnique", "bestBreakfast", "bestLunch", "bestDinner", "bestCocktails", "bestBakeries", "bestCoffee"];
const problems = [];
const need = (condition, message) => { if (!condition) problems.push(message); };

// ---- Validate ----
const key = review.city;
const date = review.checkedOn;
need(/^[^,]+, .+$/.test(key || ""), "city must be a 'City, Country' key");
need(/^\d{4}-\d{2}-\d{2}$/.test(date || ""), "checkedOn must be YYYY-MM-DD");
need(!(review.injectionLikeText || []).length, `injection-like text reported: ${JSON.stringify(review.injectionLikeText)}`);
const confirmed = Array.isArray(review.confirmed) ? review.confirmed : [];
const byName = new Map();
for (const place of confirmed) {
  need(place?.name && !byName.has(place.name), `duplicate or missing confirmed name: ${place?.name}`);
  byName.set(place.name, place);
  let https = false;
  try { https = new URL(place.url).protocol === "https:"; } catch { https = false; }
  need(https, `${place.name}: url must be https`);
  need(place.sourceType && place.operatingEvidence?.trim() && place.address?.trim(), `${place.name}: needs sourceType, address and operatingEvidence`);
}
const guide = review.guide || {};
const detail = guide.detail || {};
for (const category of CATEGORIES) {
  const list = detail[category] || [];
  need(Array.isArray(list) && list.length <= 4, `${category}: 0-4 names`);
  for (const name of list) need(byName.has(name), `${category}: "${name}" is not a confirmed place`);
}
const used = new Set(CATEGORIES.flatMap((category) => detail[category] || []));
need(used.size >= 8, `only ${used.size} distinct places in the lists`);
for (const name of used) need(guide.queries?.[name], `missing map query for ${name}`);
need((guide.highlights || []).length >= 3 && guide.highlights.every((name) => byName.has(name)), "highlights must be 3-4 confirmed names");
need((guide.intro || []).length >= 3, "intro needs 3-4 paragraphs");
need((guide.toolkit || []).length === 4 && guide.toolkit.every((item) => item.label && item.value && item.copy), "toolkit needs 4 {label, value, copy}");
need((guide.summaryCards || []).length === 3, "summaryCards needs 3 pairs");
need(guide.summary && guide.tip && guide.dek && review.limitations, "summary, tip, dek and limitations are required");
const prose = JSON.stringify([guide.summary, guide.tip, guide.dek, guide.intro, guide.toolkit, guide.summaryCards]);
need(!/\busers?\b/i.test(prose), "copy must address the reader, not 'users'");

const ledgerFile = path.join(root, "data/city-source-ledger.js");
const expansionFile = path.join(root, "data/destination-expansion.js");
const ledgerText = fs.readFileSync(ledgerFile, "utf8");
need(!ledgerText.includes(`${JSON.stringify(key)}: {`), `${key} already has a ledger entry`);
if (problems.length) {
  console.error(`Review for ${key} not applied:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}

// ---- Build ----
const slug = key.split(",")[0].trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const researchBase = `docs/content-research/${slug}-${date}`;
const usedPlaces = confirmed.filter((place) => used.has(place.name));
const ledgerEntry = {
  renderVerifiedOnly: true,
  checkedOn: date,
  status: "source-checked",
  reviewScope: "cityGuideDetailData",
  verificationMethod: "official-web-review",
  limitations: review.limitations,
  sourceUrls: [`${researchBase}.md`, `${researchBase}.json`],
  excludedCandidates: (review.notUsed || []).filter((item) => item?.name).map((item) => ({ name: item.name, ...(item.url ? { url: item.url } : {}), checkedOn: date, reason: item.reason })),
  placeSources: Object.fromEntries(usedPlaces.map((place) => [place.name, {
    url: place.url,
    sourceType: place.sourceType,
    checkedOn: date,
    operatingEvidence: place.operatingEvidence
  }]))
};
const indent = (text, spaces) => text.split("\n").map((line, index) => (index ? " ".repeat(spaces) + line : line)).join("\n");
const ledgerBlock = `  ${JSON.stringify(key)}: ${indent(JSON.stringify(ledgerEntry, null, 2), 2)},\n`;
const anchor = "window.HB_DATA.citySourceLedger = {\n";
if (!ledgerText.includes(anchor)) throw new Error("ledger anchor not found");
const newLedger = ledgerText.replace(anchor, anchor + ledgerBlock);

const q = (value) => JSON.stringify(value);
const trust = `All ${usedPlaces.length} distinct recommendations in this guide were checked against their operators' own websites on ${new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`))}. This was a website review, not a visit or telephone confirmation. Advertised opening and booking details do not guarantee availability; confirm before traveling.`;
// destination-coverage.js folds country spellings together ("Istanbul, Türkiye" into "Istanbul, Turkey"), so a twin
// record's unreviewed lists would be merged back in. Drop the twins' lists and queries.
const COUNTRY_ALIASES = { turkiye: "turkey", republicofturkey: "turkey", czechrepublic: "czechia", unitedstatesofamerica: "unitedstates", usa: "unitedstates", us: "unitedstates", uae: "unitedarabemirates", republicofkorea: "southkorea", holland: "netherlands", england: "unitedkingdom" };
const comparable = (value) => String(value || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const countryKey = (label) => { const country = comparable(label.split(",").at(-1)); return COUNTRY_ALIASES[country] || country; };
const dataText = ["city-guides", "destinations", "trip-content", "top-100-destinations"].map((name) => {
  const file = path.join(root, "data", `${name}.js`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}).join("\n");
const twinKeys = [...new Set([...dataText.matchAll(/"([^"\n]+, [^"\n]+)": \{/g)].map((match) => match[1]))]
  .filter((other) => other !== key && other.split(",")[0].trim() === key.split(",")[0].trim() && countryKey(other) === countryKey(key));
const block = `  // ${key}: source review of ${date} (${researchBase}.md).
  {
    const cityKey = ${q(key)};
${twinKeys.length ? `    for (const twin of ${q(twinKeys)}) {
      delete data.cityGuideDetailData[twin];
      delete data.cityPlaceQueries[twin];
      for (const map of [data.destinationHeroData, data.cityPlanningToolkitData, data.cityEditorialPageData, data.destinationFacts]) {
        if (map && twin in map) {
          if (!(cityKey in map)) map[cityKey] = map[twin];
          delete map[twin];
        }
      }
      const twinGuide = data.cityGuideData.find((item) => item.city === twin);
      if (twinGuide && !data.cityGuideData.some((item) => item.city === cityKey)) twinGuide.city = cityKey;
    }
` : ""}    data.cityGuideDetailData[cityKey] = {
${CATEGORIES.map((category) => `      ${category}: ${q(detail[category] || [])}`).join(",\n")}
    };
    data.cityPlaceQueries[cityKey] = ${indent(JSON.stringify(Object.fromEntries([...used].map((name) => [name, guide.queries[name]])), null, 2), 4)};
    const cityGuide = data.cityGuideData.find((item) => item.city === cityKey);
    if (cityGuide) {
      cityGuide.summary = ${q(guide.summary)};
      cityGuide.highlights = ${q(guide.highlights.slice(0, 4))};
      cityGuide.tip = ${q(guide.tip)};
    }
    data.destinationFacts[cityKey] = ${q(guide.tip)};
    if (data.destinationHeroData[cityKey]) data.destinationHeroData[cityKey].copy = ${q(guide.summary)};
    data.cityPlanningToolkitData[cityKey] = ${indent(JSON.stringify(guide.toolkit.map(({ label, value, copy }) => ({ label, value, copy })), null, 2), 4)};
    data.cityEditorialPageData[cityKey] = {
      ...data.cityEditorialPageData[cityKey],
      dek: ${q(guide.dek)},
      intro: ${indent(JSON.stringify(guide.intro, null, 2), 6)},
      summaryCards: ${indent(JSON.stringify(guide.summaryCards, null, 2), 6)},
      trust: ${q(trust)}
    };
  }
`;
const expansionText = fs.readFileSync(expansionFile, "utf8");
const end = expansionText.lastIndexOf("})();");
if (end < 0) throw new Error("destination-expansion.js end not found");
const newExpansion = `${expansionText.slice(0, end)}${block}${expansionText.slice(end)}`;

const md = `# ${key} source review

${date}. Each place was checked on its operator's own website, or the public body that runs it. No review sites,
maps or blogs were used. The evidence is in \`${path.basename(researchBase)}.json\`.

## ${confirmed.length} places confirmed (${usedPlaces.length} used in the guide)

| Place | Source | Opening hours as published |
|---|---|---|
${confirmed.map((place) => `| ${place.name} | ${place.sourceType} | ${String(place.hours || "not published").replace(/\|/g, "/")} |`).join("\n")}

## Not used (${(review.notUsed || []).length})

| Place | Why |
|---|---|
${(review.notUsed || []).map((item) => `| ${item.name} | ${String(item.reason || "").replace(/\|/g, "/")} |`).join("\n")}

## Limitations

${review.limitations}
`;

if (dryRun) {
  console.log(`OK (dry run): ${key}: ${confirmed.length} confirmed, ${usedPlaces.length} in the guide, ${(review.notUsed || []).length} not used.`);
  process.exit(0);
}
fs.writeFileSync(ledgerFile, newLedger);
fs.writeFileSync(expansionFile, newExpansion);
fs.writeFileSync(path.join(root, `${researchBase}.json`), `${JSON.stringify(review, null, 2)}\n`);
fs.writeFileSync(path.join(root, `${researchBase}.md`), md);
console.log(`Applied ${key}: ${confirmed.length} confirmed, ${usedPlaces.length} in the guide, ${(review.notUsed || []).length} not used.`);
