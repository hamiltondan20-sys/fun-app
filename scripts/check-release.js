const fs = require("fs");
const path = require("path");
const vm = require("vm");

globalThis.window = globalThis;

const root = path.resolve(__dirname, "..");
const dataFiles = [
  "data/destinations.js",
  "data/country-guides.js",
  "data/city-guides.js",
  "data/trip-content.js",
  "data/top-100-destinations.js",
  "data/destination-expansion.js",
  "data/destination-coverage.js"
];
const requiredFiles = [
  "code.html",
  "plan/index.html",
  "assets/app.css",
  "assets/app-inline.css",
  "assets/content.css",
  "robots.txt",
  "sitemap.xml",
  "scripts/generate-pages.mjs",
  "scripts/extract-inline-css.mjs"
];
const detailCategories = [
  "bestAttractions",
  "bestRestaurants",
  "bestBudget",
  "bestLuxury",
  "bestCouples",
  "bestKids",
  "bestSolo",
  "bestFirstTimers",
  "bestUnique",
  "bestBreakfast",
  "bestLunch",
  "bestDinner",
  "bestCocktails",
  "bestBakeries",
  "bestCoffee"
];
const sitemapBase = "https://hamiltondan20-sys.github.io/fun-app";
const cityOverrides = {
  "Egyptian Pyramids and Valley of the Kings, Egypt": "egyptian-pyramids",
  "Capri and Neapolitan Islands, Italy": "capri",
  "Bagan and Mandalay, Myanmar": "bagan",
  "Baalbek and Byblos, Lebanon": "baalbek",
  "Djenne and Timbuktu, Mali": "djenne",
  "Guilin and Li River, China": "guilin",
  "Great Wall of China, China": "great-wall-of-china",
  "Antarctic Peninsula": "antarctic-peninsula"
};

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readSitemapLocations() {
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function citySlugMap(cities) {
  const used = new Set();
  const map = new Map();
  cities.forEach((guide) => {
    const key = String(guide.city || guide.title || "");
    const name = String(guide.title || guide.city || "").split(",")[0].trim();
    const countries = String(guide.city || "").split(",").slice(1).join(",").split(/\s+and\s+|\s*&\s*/i).map((value) => value.trim()).filter(Boolean);
    const base = cityOverrides[key] || slugify(name) || "destination";
    let slug = base;
    if (used.has(slug)) slug = `${base}-${slugify(countries[0] || "travel")}`;
    let suffix = 2;
    while (used.has(slug)) slug = `${base}-${suffix++}`;
    used.add(slug);
    map.set(key, slug);
  });
  return map;
}

dataFiles.forEach((file) => {
  const absolutePath = path.join(root, file);
  vm.runInThisContext(fs.readFileSync(absolutePath, "utf8"), { filename: absolutePath });
});

const data = globalThis.HB_DATA || {};
const cityGuides = Array.isArray(data.cityGuideData) ? data.cityGuideData : [];
const countryGuides = data.countryGuideData || {};
const detailData = data.cityGuideDetailData || {};
const locations = readSitemapLocations();
const locationSet = new Set(locations);
const failures = [];
const citySlugs = citySlugMap(cityGuides);

requiredFiles.forEach((file) => {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`);
});

if (fs.existsSync(path.join(root, "code.html"))) {
  const legacyEntry = fs.readFileSync(path.join(root, "code.html"), "utf8");
  if (!legacyEntry.includes("noindex, follow") || !legacyEntry.includes("./plan/")) {
    failures.push("code.html should remain a noindex compatibility redirect to /plan/.");
  }
}

if (!locations.length) failures.push("Sitemap has no URLs.");
if (locations.length !== locationSet.size) failures.push("Sitemap contains duplicate URLs.");
if (!locations.includes(`${sitemapBase}/`)) failures.push("Sitemap is missing the canonical homepage URL.");

function staticRoute(route) {
  return `${sitemapBase}${route}`;
}

function checkGeneratedPage(route) {
  const file = path.join(root, route.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(file)) {
    failures.push(`Missing generated page: ${route}`);
    return;
  }
  const html = fs.readFileSync(file, "utf8");
  if ((html.match(/<h1\b/gi) || []).length !== 1) failures.push(`Generated page should have one h1: ${route}`);
  if (!html.includes("rel=\"canonical\"")) failures.push(`Generated page is missing canonical metadata: ${route}`);
  if (!html.includes("assets/content.css")) failures.push(`Generated page is missing content styles: ${route}`);
}

function checkPlannerPage() {
  const file = path.join(root, "plan", "index.html");
  if (!fs.existsSync(file)) {
    failures.push("Missing planner app: /plan/");
    return;
  }
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("app-bottom-bar")) failures.push("Planner app is missing the application shell.");
  if (!html.includes('id="canonical-url"') || !html.includes(`${sitemapBase}/plan/`)) failures.push("Planner app is missing its /plan/ canonical URL.");
  if (!html.includes("assets/app-inline.css")) failures.push("Planner app is missing its inline stylesheet asset.");
  if (!html.includes('<base href="../" />')) failures.push("Planner app is missing its relative asset base.");
}

cityGuides.forEach((guide) => {
  const key = String(guide.city || guide.title || "");
  const slug = citySlugs.get(key);
  const route = `/destinations/${slug}/`;
  if (!detailData[key]) failures.push(`Missing city detail data: ${key}`);
  if (detailData[key]) {
    detailCategories.forEach((category) => {
      if (!Array.isArray(detailData[key][category]) || detailData[key][category].length < 3) {
        failures.push(`Incomplete ${category} content: ${key}`);
      }
    });
  }
  if (!guide.summary || !guide.tip || !Array.isArray(guide.highlights) || guide.highlights.length < 3) {
    failures.push(`Incomplete city guide basics: ${key}`);
  }
  const fact = String(data.destinationFacts?.[guide.title] || data.destinationFacts?.[key] || "").trim();
  const title = String(guide.title || "").trim().toLowerCase();
  if (fact.toLowerCase().startsWith(`${title} works best when ${title}`)) failures.push(`Malformed destination fact: ${key}`);
  if (/\b(citys|doesnt|dont|cant|wont|isnt)\b/i.test(fact)) failures.push(`Awkward destination fact wording: ${key}`);
  if (locationSet.has(staticRoute(route))) checkGeneratedPage(route);
});

Object.keys(countryGuides).forEach((country) => {
  const route = `/countries/${slugify(country)}/`;
  if (locationSet.has(staticRoute(route))) checkGeneratedPage(route);
});

["/", "/destinations/", "/countries/", "/faq/", "/contact/"].forEach((route) => {
  if (!locationSet.has(staticRoute(route))) failures.push(`Missing required sitemap URL: ${route}`);
  checkGeneratedPage(route);
});
if (!locationSet.has(staticRoute("/plan/"))) failures.push("Missing required sitemap URL: /plan/");
checkPlannerPage();

const generatedCityDirs = fs.existsSync(path.join(root, "destinations"))
  ? fs.readdirSync(path.join(root, "destinations"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
  : 0;
const generatedCountryDirs = fs.existsSync(path.join(root, "countries"))
  ? fs.readdirSync(path.join(root, "countries"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length
  : 0;
const citySitemapDirs = locations.filter((location) => location.startsWith(`${sitemapBase}/destinations/`) && location !== `${sitemapBase}/destinations/`).length;
const countrySitemapDirs = locations.filter((location) => location.startsWith(`${sitemapBase}/countries/`) && location !== `${sitemapBase}/countries/`).length;
if (generatedCityDirs !== citySitemapDirs) failures.push(`Generated city page count mismatch: ${generatedCityDirs} vs ${citySitemapDirs} sitemap pages`);
if (generatedCountryDirs !== countrySitemapDirs) failures.push(`Generated country page count mismatch: ${generatedCountryDirs} vs ${countrySitemapDirs} sitemap pages`);

const destinationSlugs = new Set(locations
  .filter((location) => location.startsWith(`${sitemapBase}/destinations/`) && location !== `${sitemapBase}/destinations/`)
  .map((location) => location.split("/").filter(Boolean).at(-1)));
const countrySlugs = new Set(locations
  .filter((location) => location.startsWith(`${sitemapBase}/countries/`) && location !== `${sitemapBase}/countries/`)
  .map((location) => location.split("/").filter(Boolean).at(-1)));
const duplicateSlugs = [...destinationSlugs].filter((slug) => countrySlugs.has(slug));
if (duplicateSlugs.length) failures.push(`Sitemap contains duplicate destination and country slugs: ${duplicateSlugs.join(", ")}`);

if (failures.length) {
  console.error(`Release check failed with ${failures.length} issue${failures.length === 1 ? "" : "s"}:`);
  failures.slice(0, 80).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 80) console.error(`- ${failures.length - 80} more issues omitted`);
  process.exitCode = 1;
} else {
  console.log(`Release check passed: ${generatedCityDirs} city guides, ${generatedCountryDirs} country guides, ${locations.length} unique sitemap URLs.`);
}
