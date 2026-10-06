import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { classifyItem } from "./place-links.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const candidates = [
  ["Singapore", "Singapore", "Singapore", /island country in Southeast Asia/i],
  ["Vancouver", "Canada", "Vancouver", /British Columbia/i],
  ["Honolulu", "United States", "Honolulu", /Hawaii/i],
  ["Prague", "Czechia", "Prague", /Czech/i],
  ["Kyoto", "Japan", "Kyoto", /Japan/i],
  ["Montreal", "Canada", "Montreal", /Quebec/i],
  ["Hanoi", "Vietnam", "Hanoi", /Vietnam/i],
  ["Berlin", "Germany", "Berlin", /Germany/i],
  ["Venice", "Italy", "Venice", /Italy/i],
  ["Banff", "Canada", "Banff, Alberta", /Alberta/i],
  ["Nice", "France", "Nice", /France/i],
  ["Vienna", "Austria", "Vienna", /Austria/i],
  ["Munich", "Germany", "Munich", /Germany/i],
  ["Hong Kong", "China", "Hong Kong", /China/i],
  ["Cape Town", "South Africa", "Cape Town", /South Africa/i],
  ["Reykjavik", "Iceland", "Reykjavík", /Iceland/i],
  ["Queenstown", "New Zealand", "Queenstown, New Zealand", /New Zealand/i],
  ["Melbourne", "Australia", "Melbourne", /Australia/i],
  ["Rio de Janeiro", "Brazil", "Rio de Janeiro", /Brazil/i],
  ["Cairo", "Egypt", "Cairo", /Egypt/i]
];

// Confirmed from the article identity responses retained with the first pull.
const expectedEntities = {
  Singapore: "Q334", Vancouver: "Q24639", Honolulu: "Q18094", Prague: "Q1085",
  Kyoto: "Q34600", Montreal: "Q340", Hanoi: "Q1858", Berlin: "Q64",
  Venice: "Q641", Banff: "Q58337", Nice: "Q33959", Vienna: "Q1741",
  Munich: "Q1726", "Hong Kong": "Q8646", "Cape Town": "Q5465",
  Reykjavik: "Q1764", Queenstown: "Q613602", Melbourne: "Q3141",
  "Rio de Janeiro": "Q8678", Cairo: "Q85"
};

export function matchesCity(page, city, requestedTitle, locationCheck) {
  return Boolean(page && page.missing === undefined && page.ns === 0
    && page.pageprops?.disambiguation === undefined && page.coordinates?.length
    && page.title === requestedTitle
    && page.pageprops?.wikibase_item === expectedEntities[city]
    && locationCheck.test((page.extract || "").split("\n")[0]));
}

export function fullMonths(now) {
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 12, 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
  const stamp = (date) => date.toISOString().slice(0, 10).replaceAll("-", "") + "00";
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + i, 1))
      .toISOString().slice(0, 7).replace("-", ""));
  return { start: stamp(start), end: stamp(end), months };
}

export function validateMonths(items, months) {
  if (!Array.isArray(items) || items.length !== 12) throw new Error("Expected 12 complete monthly records");
  const found = items.map((item) => String(item.timestamp).slice(0, 6)).sort();
  if (JSON.stringify(found) !== JSON.stringify(months)) throw new Error("Missing or duplicate month");
  if (items.some((item) => !Number.isSafeInteger(item.views) || item.views < 0)) throw new Error("Invalid pageview count");
}

const userAgent = "TheFullestLifeTravelCityResearch/1.0 (https://hamiltondan20-sys.github.io/fun-app/contact/)";
async function json(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, { headers: { "User-Agent": userAgent }, signal: AbortSignal.timeout(30000) });
    if (response.ok) return response.json();
    if ((response.status === 429 || response.status >= 500) && attempt < 2) {
      const seconds = Number(response.headers.get("retry-after"));
      await new Promise((resolve) => setTimeout(resolve, Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : 1000 * (attempt + 1)));
      continue;
    }
    throw new Error(`HTTP ${response.status}: ${url}`);
  }
}

function detailCounts(data, city, country) {
  const key = `${city}, ${country}`;
  const detail = data.cityGuideDetailData[key];
  if (!detail) throw new Error(`No exact detail key: ${key}`);
  const fields = Object.values(detail).filter(Array.isArray);
  const names = [...new Set(fields.flat())];
  const ledger = data.citySourceLedger?.[key];
  const verified = names.filter((name) => {
    const source = ledger?.placeSources?.[name];
    return source?.sourceType && source.operatingEvidence && /^\d{4}-\d{2}-\d{2}$/.test(source.checkedOn || "") && /^https:\/\//.test(source.url || "");
  }).length;
  return { verified, populated: fields.filter((field) => field.length).length,
    named: fields.flat().filter((item) => classifyItem(item).kind === "named").length };
}

export async function main() {
  const pulledAt = new Date().toISOString();
  const date = pulledAt.slice(0, 10);
  const period = fullMonths(new Date(pulledAt));
  const context = vm.createContext({ window: {} });
  for (const name of ["destinations", "country-guides", "city-guides", "trip-content", "top-100-destinations", "destination-expansion", "destination-coverage", "city-source-ledger"]) {
    vm.runInContext(fs.readFileSync(path.join(root, "data", `${name}.js`), "utf8"), context);
  }
  const rows = [];
  for (const [city, country, requestedTitle, locationCheck] of candidates) {
    const row = { city, country, requestedTitle, pulledAt, ...detailCounts(context.window.HB_DATA, city, country) };
    try {
      const identityUrl = "https://en.wikipedia.org/w/api.php?" + new URLSearchParams({
        action: "query", format: "json", redirects: "1", prop: "pageprops|extracts|coordinates",
        exintro: "1", explaintext: "1", titles: requestedTitle
      });
      const identity = await json(identityUrl);
      const pages = Object.values(identity.query?.pages || {});
      const page = pages[0];
      row.identity = identity;
      row.identityUrl = identityUrl;
      if (pages.length !== 1 || !matchesCity(page, city, requestedTitle, locationCheck)) {
        throw new Error("Uncertain article identity: requires human review");
      }
      row.title = page.title;
      row.apiUrl = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${encodeURIComponent(page.title.replaceAll(" ", "_"))}/monthly/${period.start}/${period.end}`;
      const result = await json(row.apiUrl);
      validateMonths(result.items, period.months);
      row.items = result.items;
      row.total = result.items.reduce((sum, item) => sum + item.views, 0);
      row.average = Number((row.total / 12).toFixed(2));
      row.status = "matched";
      console.log(`${city}: ${row.total} views (${page.title})`);
    } catch (error) {
      row.status = "absent";
      row.error = error.message;
      console.error(`${city}: ABSENT - ${row.error}`);
    }
    rows.push(row);
  }
  rows.sort((a, b) => (b.total ?? -1) - (a.total ?? -1) || a.city.localeCompare(b.city));
  const quote = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [["city", "article_title", "total_pageviews", "monthly_average", "date_pulled", "verified_name_count", "populated_category_count", "classifier_named_entries", "status", "error"],
    ...rows.map((r) => [r.city, r.title || "", r.total, r.average, date, r.verified, r.populated, r.named, r.status, r.error || ""])]
    .map((row) => row.map(quote).join(",")).join("\n") + "\n";
  fs.writeFileSync(path.join(root, "docs", `city-demand-wikipedia-${date}.csv`), csv);
  fs.writeFileSync(path.join(root, "docs", `city-demand-wikipedia-${date}.json`), JSON.stringify({ pulledAt, period, rows }, null, 2) + "\n");
  const heading = `# Provisional City Sourcing Priorities\n\nPulled ${date} (UTC). Period: ${period.months[0]} through ${period.months.at(-1)}, the last 12 full calendar months.\n\n`;
  const explanation = `Source: Wikimedia REST API, English Wikipedia, all-access, user pageviews.\nThese are measured article views worldwide, NOT search volumes, travel intent,\nunique visitors or US demand. Singapore and Hong Kong articles cover broader\ncity-state/territory topics. News can increase readership. Redirect-alias views\nare not combined with canonical article views; no estimate fills missing data.\n\nThis ranking is provisional and should be superseded by Search Console page\nimpressions in 2-3 weeks. No editorial keyword estimates remain in this table.\nSource-verified counts reflect dated supporting records, not capitalised names.\nPopulated categories may still contain unsourced items. Classifier matches may repeat.\n\n`;
  const table = `| Rank | City | Confirmed en.wikipedia article | Wikimedia 12-month views (${date}) | Wikimedia monthly mean (${date}) | Source-record verified names (${date}) | Detail populated categories (${date}) | Classifier named entries (${date}) |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n` + rows.map((r, i) =>
    `| ${r.status === "matched" ? i + 1 : "Unranked"} | ${r.city} | ${r.title || "Uncertain/absent"} | ${r.total ?? "Absent"} | ${r.average ?? "Absent"} | ${r.verified} | ${r.populated} | ${r.named} |`).join("\n");
  const absent = rows.filter((row) => row.status !== "matched");
  const notes = `\n\n## Re-run and evidence\n\nRun \`node scripts/pull-city-pageviews.mjs\` from the checkout. CSV: [download](city-demand-wikipedia-${date}.csv).\nFull article identity responses, redirects, coordinates, source URLs and monthly\ncounts are retained in [evidence](city-demand-wikipedia-${date}.json).\n\n${absent.length ? absent.map((r) => `- ${r.city}: ${r.error}`).join("\n") : "All 20 article matches passed city/location and non-disambiguation checks."}\n\nFor later Search Console ranking, follow [the export process](search-console-content-monitoring.md).\nNo sourcing work, gate change or domain migration is authorised by this ranking.\n`;
  fs.writeFileSync(path.join(root, "docs/city-sourcing-priorities-2026-10-05.md"), heading + explanation + table + notes);
  if (absent.length) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
