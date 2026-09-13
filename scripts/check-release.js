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
  "assets/favicon.svg",
  "assets/guide-city.png",
  "assets/guide-region.png",
  "assets/guide-landmark.png",
  "assets/guide-country.png",
  "manifest.webmanifest",
  "404.html",
  "sitemap.xml",
  "scripts/app-analytics.js",
  "scripts/site-config.js",
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
  const used = new Map();
  const map = new Map();
  cities.forEach((guide) => {
    const key = String(guide.city || guide.title || "");
    const name = String(guide.title || guide.city || "").split(",")[0].trim();
    const countries = String(guide.city || "").split(",").at(-1).split(/\s+and\s+|\s*&\s*/i).map((value) => value.trim()).filter(Boolean);
    const base = cityOverrides[key] || slugify(name) || "destination";
    let slug = base;
    if (used.has(slug)) {
      const qualifiedSlug = slugify(`${name} ${countries.join(" ")}`) || `${base}-travel`;
      if (used.has(qualifiedSlug)) {
        throw new Error(`Destination route collision for "${key}". The route "${qualifiedSlug}" is already assigned to "${used.get(qualifiedSlug)}".`);
      }
      slug = qualifiedSlug;
    }
    if (used.has(slug)) {
      throw new Error(`Destination route collision for "${key}". The route "${slug}" is already assigned to "${used.get(slug)}".`);
    }
    used.set(slug, key);
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
const sitemapPath = path.join(root, "sitemap.xml");
const sitemapText = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const failures = [];
let citySlugs = new Map();
try {
  citySlugs = citySlugMap(cityGuides);
} catch (error) {
  failures.push(error.message);
}

const countryKeys = new Map();
Object.keys(countryGuides).forEach((country) => {
  const key = slugify(country);
  if (countryKeys.has(key)) failures.push(`Country route collision for "${country}". The route "${key}" is already assigned to "${countryKeys.get(key)}".`);
  else countryKeys.set(key, country);
});

const compact = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
const cityIdentityKeys = new Map();
cityGuides.forEach((guide) => {
  const normalizedLabel = data.normalizeCityLabel?.(guide.city || guide.title) || String(guide.city || guide.title || "");
  const key = compact(normalizedLabel);
  if (cityIdentityKeys.has(key)) failures.push(`Duplicate normalized city identity: "${guide.city}" and "${cityIdentityKeys.get(key)}".`);
  else cityIdentityKeys.set(key, guide.city);
});

const sameNameGroups = new Map();
cityGuides.forEach((guide) => {
  const name = String(guide.title || guide.city || "").split(",")[0].trim();
  const key = compact(name);
  if (!sameNameGroups.has(key)) sameNameGroups.set(key, []);
  sameNameGroups.get(key).push(guide);
});
sameNameGroups.forEach((guides, nameKey) => {
  const countries = new Set(guides.map((guide) => String(guide.city || "").split(",").at(-1).trim()));
  if (guides.length < 2 || countries.size < 2) return;
  if (data.destinationAliases?.[nameKey]) failures.push(`Ambiguous bare destination alias remains: "${nameKey}".`);
  guides.forEach((guide) => {
    const key = String(guide.city || guide.title || "");
    if (!data.destinationFacts?.[key]) failures.push(`Missing full destination fact for same-name guide: ${key}`);
    if (!data.destinationHeroData?.[key]) failures.push(`Missing full destination hero for same-name guide: ${key}`);
  });
});

requiredFiles.forEach((file) => {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`);
});

const planHtml = fs.existsSync(path.join(root, "plan/index.html"))
  ? fs.readFileSync(path.join(root, "plan/index.html"), "utf8")
  : "";
const coverageSource = fs.existsSync(path.join(root, "data/destination-coverage.js"))
  ? fs.readFileSync(path.join(root, "data/destination-coverage.js"), "utf8")
  : "";
if (!planHtml.includes("./data/destination-coverage.js")) {
  failures.push("Planner is missing the destination coverage module.");
}
if (!coverageSource.includes("window.HB_COVERAGE")) {
  failures.push("Destination coverage module does not expose HB_COVERAGE.");
}

if (fs.existsSync(path.join(root, "code.html"))) {
  const legacyEntry = fs.readFileSync(path.join(root, "code.html"), "utf8");
  if (!legacyEntry.includes("noindex, follow") || !legacyEntry.includes("./plan/")) {
    failures.push("code.html should remain a noindex compatibility redirect to /plan/.");
  }
}

if (!locations.length) failures.push("Sitemap has no URLs.");
if (locations.length !== locationSet.size) failures.push("Sitemap contains duplicate URLs.");
if (!locations.includes(`${sitemapBase}/`)) failures.push("Sitemap is missing the canonical homepage URL.");

const gitPath = path.join(root, ".git");
const hasGitDirectory = fs.existsSync(gitPath);
const lastmodCount = (sitemapText.match(/<lastmod>[^<]+<\/lastmod>/g) || []).length;
if (hasGitDirectory && lastmodCount === 0) {
  failures.push("Sitemap was generated outside a git working tree; regenerate it from the repo root.");
}

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
  if (!html.includes("assets/favicon.svg")) failures.push(`Generated page is missing the favicon: ${route}`);
  if (!html.includes("scripts/app-analytics.js")) failures.push(`Generated page is missing analytics consent support: ${route}`);
  if (!html.includes('property="og:image"')) failures.push(`Generated page is missing a social preview image: ${route}`);
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
  if (!html.includes("assets/favicon.svg")) failures.push("Planner app is missing the favicon.");
  if (!html.includes("manifest.webmanifest")) failures.push("Planner app is missing its web manifest.");
  if (!html.includes("scripts/app-analytics.js")) failures.push("Planner app is missing analytics consent support.");
  if (!html.includes('property="og:image"')) failures.push("Planner app is missing a social preview image.");
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
  const fact = String(data.destinationFacts?.[key] || data.destinationFacts?.[guide.title] || "").trim();
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
  const auditedSameNameGroups = [...sameNameGroups.values()].filter((guides) => guides.length > 1 && new Set(guides.map((guide) => String(guide.city || "").split(",").at(-1).trim())).size > 1).length;
  console.log(`Release check passed: ${generatedCityDirs} city guides, ${generatedCountryDirs} country guides, ${locations.length} unique sitemap URLs. Same-name audit: ${auditedSameNameGroups} groups.`);
}
