#!/usr/bin/env node
/**
 * Build crawlable destination and country pages from the browser data.
 *
 * Examples:
 *   node scripts/generate-pages.mjs --base=/fun-app --out=. --dry-run
 *   node scripts/generate-pages.mjs --base=/fun-app --out=.
 *
 * The interactive planner lives at /plan/. These pages give each guide a
 * real URL and send visitors into the planner with their destination ready.
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { classifyItem, linkItem } from "./place-links.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name, fallback) => {
  const match = process.argv.find((value) => value.startsWith(`--${name}=`));
  return match ? match.slice(name.length + 3) : fallback;
};
const hasFlag = (name) => process.argv.includes(`--${name}`);
const BASE = String(arg("base", "")).replace(/\/$/, "");
const OUT = path.resolve(arg("out", ROOT));
const ORIGIN = String(arg("origin", "https://hamiltondan20-sys.github.io")).replace(/\/$/, "");
const TIER1_ONLY = hasFlag("tier1-only");
const DRY_RUN = hasFlag("dry-run");
const requestedMaxPlaceholder = Number(arg("max-placeholder", "0.2"));
const MAX_PLACEHOLDER = Number.isFinite(requestedMaxPlaceholder)
  ? Math.min(Math.max(requestedMaxPlaceholder, 0), 1)
  : 0.2;
const requestedMinWords = Number(arg("min-words", "350"));
const MIN_WORDS = Number.isFinite(requestedMinWords) && requestedMinWords > 0
  ? Math.floor(requestedMinWords)
  : 350;
const requestedMinCountryWords = Number(arg("min-country-words", "250"));
const MIN_COUNTRY_WORDS = Number.isFinite(requestedMinCountryWords) && requestedMinCountryWords > 0
  ? Math.floor(requestedMinCountryWords)
  : 250;

const dataFiles = [
  "data/destinations.js",
  "data/country-guides.js",
  "data/city-guides.js",
  "data/trip-content.js",
  "data/top-100-destinations.js",
  "data/destination-expansion.js",
  "data/destination-coverage.js"
];

globalThis.window = globalThis.window || {};
for (const relative of dataFiles) {
  const file = path.join(OUT, relative);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing ${relative}. Run this from the project root.`);
  }
  vm.runInThisContext(fs.readFileSync(file, "utf8"), { filename: file });
}

const DATA = globalThis.window.HB_DATA || {};
const HELPERS = globalThis.window.HB_TRIP_HELPERS || {};
const normalizeCountryName = typeof DATA.normalizeCountryName === "function"
  ? DATA.normalizeCountryName
  : (value) => String(value || "").trim();
const CLUSTERS = [
  {
    id: "see",
    heading: (name) => `What to see in ${name}`,
    lead: () => "The big reasons to go, plus a few ideas worth keeping in reserve.",
    layout: "columns",
    fields: [
      ["bestAttractions", "Do not miss"],
      ["bestFirstTimers", "First time here"],
      ["bestUnique", "Less obvious"]
    ]
  },
  {
    id: "eat",
    heading: (name) => `Where to eat and drink in ${name}`,
    lead: () => "Ideas you can actually fit into a day, from the first coffee to dinner.",
    layout: "grid",
    fields: [
      ["bestBreakfast", "Breakfast"],
      ["bestLunch", "Lunch"],
      ["bestDinner", "Dinner"],
      ["bestRestaurants", "Worth booking"],
      ["bestCoffee", "Coffee"],
      ["bestBakeries", "Bakeries"],
      ["bestCocktails", "Drinks"]
    ]
  },
  {
    id: "who",
    heading: (name) => `${name} depends on who you are traveling with`,
    lead: () => "The same destination can feel completely different depending on the trip you want.",
    layout: "columns",
    fields: [
      ["bestCouples", "Couples"],
      ["bestKids", "With kids"],
      ["bestSolo", "Solo"],
      ["bestBudget", "On a budget"],
      ["bestLuxury", "Worth the splurge"]
    ]
  }
];

const LANDMARK = /falls|pyramid|wall of|ruins|temple|cathedral|statue|tower|reef|crater|salt flats|stonehenge|petra|machu|angkor|borobudur|chichen|taj mahal/i;
const REGION = /island|park|canyon|desert|mountains?|glacier|peninsula|fjord|alps|coast|andes|patagonia|altai|alaska|highlands|lake district|safari|steppe|delta|valley|landforms|riviera/i;

function classifyDestination(key) {
  const head = String(key).split(",")[0];
  if (LANDMARK.test(head)) return "landmark";
  if (REGION.test(head)) return "region";
  return "city";
}

const SCHEMA_TYPE = {
  city: "TouristDestination",
  region: "TouristDestination",
  landmark: "TouristAttraction"
};

const KIND_LABEL = {
  city: "Travel Guide",
  region: "Travel Guide",
  landmark: "Visitor Guide"
};

function sampleDay(cityName) {
  if (typeof HELPERS.getTimelineTemplates !== "function" || typeof HELPERS.getAreaSet !== "function") return null;
  const inventedAreas = ["City center", "Old town", "Riverside"];
  const genericMarkers = [
    "Use the first hour to get comfortable",
    "let the neighborhood introduce itself",
    "Stay close to your base"
  ];
  try {
    const areas = HELPERS.getAreaSet(cityName);
    if (Array.isArray(areas) && inventedAreas.every((area, index) => areas[index] === area)) return null;
    const templates = HELPERS.getTimelineTemplates(cityName, areas);
    const day = Array.isArray(templates) ? templates[0] : null;
    if (!Array.isArray(day) || day.length < 2) return null;
    const copy = day.map((slot) => slot?.copy || "").join(" ");
    if (genericMarkers.some((marker) => copy.includes(marker))) return null;
    const usableDay = day.filter((slot) => slot && slot.time && slot.title);
    return usableDay.length >= 2 ? usableDay : null;
  } catch {
    return null;
  }
}

const slugify = (value) => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[’']/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const cityName = (record) => String(record.title || record.city || "").split(",")[0].trim();
const cityCountries = (record) => String(record.city || "")
  .split(",")
  .at(-1)
  .split(/\s+and\s+|\s*&\s*/i)
  .map((value) => normalizeCountryName(value.trim()))
  .filter(Boolean);

const esc = (value) => String(value ?? "")
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const clamp = (value, limit = 155) => {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;
  const clipped = text.slice(0, limit).replace(/\s+\S*$/, "").trim();
  return `${clipped.replace(/[,;:.]$/, "")}...`;
};

const url = (route) => `${BASE}${route}`;
const absolute = (route) => `${ORIGIN}${BASE}${route}`;
const jsonld = (value) => `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`;
const FALLBACK_HERO = {
  city: absolute("/assets/guide-city.svg"),
  region: absolute("/assets/guide-region.svg"),
  landmark: absolute("/assets/guide-landmark.svg")
};
const FALLBACK_OG_IMAGE = {
  city: absolute("/assets/guide-city.png"),
  region: absolute("/assets/guide-region.png"),
  landmark: absolute("/assets/guide-landmark.png")
};
const DEFAULT_OG_IMAGE = absolute("/assets/guide-country.png");

/**
 * Toolkit values that are grammatically fine but answer nothing. They contain
 * no template variables, so classifyItem() does not catch them. An FAQ entry
 * whose answer is filler is worse than no FAQ entry, so drop the Q&A and keep
 * whatever else the page has.
 *
 * Add to this list when a new generic string shows up; do not replace these
 * answers with invented facts.
 */
const NON_ANSWER_VALUES = [
  "Choose the clearest, most comfortable season",
  "Group the day by area",
  "Walkable neighborhood clusters with planned day-trip transfers",
  "Match the season to your main plans"
];

const isNonAnswer = (entry) =>
  NON_ANSWER_VALUES.some((phrase) => String(entry.value || "").includes(phrase));

function toolkitQuestion(cityName, label) {
  if (label === "When it works best") return `When is the best time to visit ${cityName}?`;
  if (label === "Where to stay") return `Where should I stay in ${cityName}?`;
  if (label === "Getting around") return `How do I get around ${cityName}?`;
  if (label === "Book early") return `What should I book in advance for ${cityName}?`;
  return `${label} for ${cityName}`;
}

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

const MANUAL_MERGES = new Map([
  ["Guilin and Li River, China", "Guilin, China"]
]);

const mergeSourceValues = (left, right) => {
  if (left == null) return right;
  if (right == null) return left;
  if (Array.isArray(left) && Array.isArray(right)) return [...new Set([...left, ...right])];
  if (typeof left === "object" && typeof right === "object") {
    const merged = { ...left };
    for (const [key, value] of Object.entries(right)) {
      merged[key] = key in merged ? mergeSourceValues(merged[key], value) : value;
    }
    return merged;
  }
  return left;
};

const recordScore = (record) => {
  const detail = DATA.cityGuideDetailData?.[record.city] || {};
  const itemCount = Object.values(detail)
    .filter(Array.isArray)
    .reduce((total, items) => total + items.length, 0);
  return itemCount
    + (record.summary ? 20 : 0)
    + (Array.isArray(record.highlights) ? record.highlights.length * 2 : 0)
    + (DATA.cityEditorialPageData?.[record.city] ? 100 : 0);
};

function foldDuplicateRecords(records) {
  const byKey = new Map();
  for (const record of records) {
    const original = String(record.city || record.title || "");
    const key = MANUAL_MERGES.get(original) || original;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, { ...record, city: key, __sources: [original] });
      continue;
    }
    const winner = recordScore(record) > recordScore(existing) ? record : existing;
    byKey.set(key, {
      ...winner,
      city: key,
      highlights: mergeSourceValues(existing.highlights, record.highlights) || [],
      areas: mergeSourceValues(existing.areas, record.areas) || [],
      __sources: [...existing.__sources, original]
    });
    console.log(`  merged duplicate city record: ${original} -> ${key}`);
  }
  return [...byKey.values()];
}

function pickBySource(map, record) {
  let merged = null;
  for (const source of record.__sources || [record.city]) {
    const value = map?.[source];
    if (value != null) merged = mergeSourceValues(merged, value);
  }
  return merged || map?.[record.city] || null;
}

const rawCities = foldDuplicateRecords(Array.isArray(DATA.cityGuideData) ? DATA.cityGuideData : []);
const usedSlugs = new Map();
const cities = rawCities.map((record) => {
  const key = String(record.city || record.title || "");
  const name = cityName(record);
  const countries = cityCountries(record);
  const baseSlug = cityOverrides[key] || slugify(name);
  let slug = baseSlug || "destination";
  if (usedSlugs.has(slug)) {
    const qualifiedSlug = slugify(`${name} ${countries.join(" ")}`) || `${baseSlug}-travel`;
    if (usedSlugs.has(qualifiedSlug)) {
      throw new Error(`Destination route collision for "${key}". The route "${qualifiedSlug}" is already assigned to "${usedSlugs.get(qualifiedSlug)}".`);
    }
    slug = qualifiedSlug;
  }
  if (usedSlugs.has(slug)) {
    throw new Error(`Destination route collision for "${key}". The route "${slug}" is already assigned to "${usedSlugs.get(slug)}".`);
  }
  usedSlugs.set(slug, key);
  const detail = pickBySource(DATA.cityGuideDetailData, record) || {};
  const clusters = CLUSTERS.map((cluster) => ({
    id: cluster.id,
    heading: cluster.heading(name),
    lead: cluster.lead(name),
    layout: cluster.layout,
    blocks: cluster.fields
      .map(([field, label]) => ({
        field,
        label,
        items: Array.isArray(detail[field]) ? detail[field].filter(Boolean).map(String) : []
      }))
      .filter((block) => block.items.length)
  })).filter((cluster) => cluster.blocks.length);
  const editorial = pickBySource(DATA.cityEditorialPageData, record);
  const hero = pickBySource(DATA.destinationHeroData, record);
  const planningToolkit = pickBySource(DATA.cityPlanningToolkitData, record);
  const cleanPlanningToolkit = Array.isArray(planningToolkit)
    ? planningToolkit
        .filter((entry) => entry && entry.label && entry.value && entry.copy)
        .filter((entry) => ![entry.value, entry.copy].some((value) => classifyItem(value).kind === "placeholder"))
        .filter((entry) => !isNonAnswer(entry))
    : [];
  return {
    key,
    name,
    countries,
    country: countries[0] || "",
    slug,
    kind: classifyDestination(key),
    tier: editorial ? 1 : 2,
    summary: String(record.summary || ""),
    tip: String(record.tip || ""),
    highlights: Array.isArray(record.highlights) ? record.highlights.filter(Boolean).map(String) : [],
    editorial,
    hero,
    planningToolkit: cleanPlanningToolkit,
    clusters,
    day: sampleDay(name)
  };
});

const countries = Object.entries(DATA.countryGuideData || {})
  .map(([name, guide]) => ({
    name,
    slug: slugify(name),
    guide: guide || {},
    editorial: DATA.countryEditorialPageData?.[name] || null,
    cities: cities.filter((city) => city.countries.includes(name)).sort((a, b) => a.name.localeCompare(b.name))
  }))
  .filter((country) => country.slug);

const pages = [];
let publishedCitySlugs = new Set();

function pageHead({ title, description, canonical, image = "", socialImage = "", schema = [], noindex = false }) {
  const previewImage = socialImage || image || DEFAULT_OG_IMAGE;
  return `<meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#176765" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="The Fullest Life Travel" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(previewImage)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(previewImage)}" />
  <link rel="icon" href="${url("/assets/favicon.svg")}" type="image/svg+xml" />
  <link rel="manifest" href="${url("/manifest.webmanifest")}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" />
  <link rel="stylesheet" href="${url("/assets/app.css")}" />
  <link rel="stylesheet" href="${url("/assets/content.css")}" />
  <script defer src="${url("/scripts/site-config.js")}?v=20260913a"></script>
  <script defer src="${url("/scripts/app-analytics.js")}?v=20260913b"></script>
  ${schema.map(jsonld).join("\n  ")}`;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path)
    }))
  };
}

function shell({ headHtml, breadcrumbs, body }) {
  const trail = breadcrumbs.map((item, index) => index === breadcrumbs.length - 1
    ? `<span aria-current="page">${esc(item.name)}</span>`
    : `<a href="${url(item.path)}">${esc(item.name)}</a>`).join(`<span class="crumb-sep" aria-hidden="true">/</span>`);
  return `<!doctype html>
<html lang="en">
<head>
  ${headHtml}
</head>
<body class="hb-content">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="hb-site-header">
    <a class="hb-brand" href="${url("/")}">The Fullest Life Travel</a>
    <nav aria-label="Primary">
      <a href="${url("/destinations/")}">Destinations</a>
      <a href="${url("/countries/")}">Countries</a>
      <a class="hb-cta" href="${url("/plan/")}">Plan a trip</a>
    </nav>
  </header>
  <nav class="hb-crumbs" aria-label="Breadcrumb">${trail}</nav>
  <main id="main">
${body}
  </main>
  <aside id="analytics-consent" class="hb-analytics-consent hidden" aria-label="Analytics choices">
    <p><strong>Help us improve trip planning?</strong></p>
    <p>Optional usage data helps us see which parts of the site need work. Your trip details are not included.</p>
    <div>
      <button id="analytics-decline" type="button">Not now</button>
      <button id="analytics-accept" type="button">Allow analytics</button>
    </div>
  </aside>
  <footer class="hb-site-footer">
    <p>The Fullest Life Travel | <a href="${url("/faq/")}">FAQ</a> | <a href="${url("/contact/")}">Contact</a></p>
  </footer>
</body>
</html>
`.replace(/[ \t]+\r?\n/g, "\n");
}

function cityPage(city) {
  const route = `/destinations/${city.slug}/`;
  const description = clamp(city.editorial?.dek || city.summary || `A practical travel guide to ${city.name}.`);
  const hasRealImage = Boolean(city.hero?.image);
  const image = city.hero?.image || FALLBACK_HERO[city.kind] || FALLBACK_HERO.city;
  const socialImage = hasRealImage ? image : (FALLBACK_OG_IMAGE[city.kind] || FALLBACK_OG_IMAGE.city);
  const planningToolkit = Array.isArray(city.planningToolkit)
    ? city.planningToolkit.filter((entry) => entry && entry.label && entry.value && entry.copy).slice(0, 4)
    : [];
  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Destinations", path: "/destinations/" },
      { name: city.name, path: route }
    ]),
    {
      "@context": "https://schema.org",
      "@type": SCHEMA_TYPE[city.kind] || "TouristDestination",
      name: city.name,
      description,
      url: absolute(route),
      ...(image ? { image } : {}),
      ...(city.countries.length
        ? { containedInPlace: city.countries.map((name) => ({ "@type": "Country", name })) }
        : {}),
      ...(city.highlights.length
        ? {
            touristType: "Leisure",
            includesAttraction: city.highlights.map((name) => ({ "@type": "TouristAttraction", name }))
          }
        : {})
    },
    ...city.clusters
      .flatMap((cluster) => cluster.blocks)
      .slice(0, 6)
      .map((block) => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${block.label} in ${city.name}`,
      numberOfItems: block.items.length,
      itemListElement: block.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item
      }))
      }))
  ];
  if (planningToolkit.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: planningToolkit.map((entry) => ({
        "@type": "Question",
        name: toolkitQuestion(city.name, entry.label),
        acceptedAnswer: {
          "@type": "Answer",
          text: `${entry.value}. ${entry.copy}`
        }
      }))
    });
  }

  const facts = [];
  if (city.editorial?.summaryCards?.length) {
    city.editorial.summaryCards.slice(0, 4).forEach(([label, copy]) => facts.push([label, copy]));
  } else {
    if (city.summary) facts.push(["Best for", city.summary]);
    if (city.highlights.length) facts.push(["Do not miss", city.highlights.join(" | ")]);
  }
  const quickFacts = facts.length
    ? `      <dl class="hb-facts">
${facts.map(([label, copy]) => `        <div><dt>${esc(label)}</dt><dd>${esc(copy)}</dd></div>`).join("\n")}
      </dl>`
    : "";

  const navTargets = [
    city.day ? ["day", "A first day"] : null,
    planningToolkit.length ? ["planning", "Before you book"] : null,
    city.clusters.some((cluster) => cluster.id === "see") ? ["see", "What to see"] : null,
    city.clusters.some((cluster) => cluster.id === "eat") ? ["eat", "Food and drinks"] : null,
    city.clusters.some((cluster) => cluster.id === "who") ? ["who", "Choose your style"] : null,
    city.tip ? ["tip", "Planning tip"] : null
  ].filter(Boolean);
  const jumpNav = navTargets.length > 1
    ? `      <nav class="hb-jump" aria-label="On this page">
        <span>On this page</span>
        <ul>${navTargets.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join("")}</ul>
      </nav>`
    : "";

  const planningBlock = planningToolkit.length
    ? `      <section class="hb-faq hb-planning" id="planning">
        <h2>Before you book</h2>
        <p class="hb-section-lead">A few practical details can make the whole trip feel easier.</p>
        <div class="hb-faq-list">
${planningToolkit.map((entry) => `          <details>
            <summary>${esc(toolkitQuestion(city.name, entry.label))}</summary>
            <p><strong>${esc(entry.value)}</strong> ${esc(entry.copy)}</p>
          </details>`).join("\n")}
        </div>
      </section>`
    : "";

  const dayBlock = city.day
    ? `      <section class="hb-day" id="day">
        <h2>A first day in ${esc(city.name)}</h2>
        <p class="hb-section-lead">Here is one way the planner could shape an opening day. Your version changes with your dates, pace, and who you are traveling with.</p>
        <ol class="hb-timeline">
${city.day.map((slot) => `          <li>
            <span class="hb-time">${esc(slot.time)}</span>
            <div>
              <h3>${esc(slot.title)}</h3>
              ${slot.copy ? `<p>${esc(slot.copy)}</p>` : ""}
            </div>
          </li>`).join("\n")}
        </ol>
        <a class="hb-inline-cta" href="${url(`/plan/?destination=${encodeURIComponent(city.key)}`)}">Build the full ${esc(city.name)} itinerary</a>
      </section>`
    : "";

  const clusterMarkup = city.clusters.map((cluster) => `      <section class="hb-cluster hb-cluster--${esc(cluster.layout)}" id="${esc(cluster.id)}">
        <h2>${esc(cluster.heading)}</h2>
        <p class="hb-section-lead">${esc(cluster.lead)}</p>
        <div class="hb-cluster-body">
${cluster.blocks.map((block) => `          <div class="hb-block">
            <h3>${esc(block.label)}</h3>
            <ul>${block.items.map((item) => `<li>${linkItem(item, city.key)}</li>`).join("")}</ul>
          </div>`).join("\n")}
        </div>
      </section>`).join("\n");

  const intro = (city.editorial?.intro || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n");
  const related = city.countries
    .flatMap((country) => countries.find((item) => item.name === country)?.cities || [])
    .filter((item) => item.slug !== city.slug && (!publishedCitySlugs.size || publishedCitySlugs.has(item.slug)))
    .slice(0, 6);
  const heroAlt = city.hero?.copy
    ? `${city.name}: ${city.hero.copy}`
    : city.hero?.image
      ? `${city.name} destination photo`
      : `${city.name} travel guide illustration`;
  const body = `    <article>
      <header class="hb-lede">
        <p class="hb-eyebrow">${esc(city.country || KIND_LABEL[city.kind] || "Travel guide")}</p>
        <h1>${esc(city.name)}</h1>
        <p class="hb-dek">${esc(city.editorial?.dek || city.summary || `A practical travel guide to ${city.name}.`)}</p>
      </header>
      ${image ? `<img class="hb-hero" src="${esc(image)}" alt="${esc(heroAlt)}" width="1200" height="800" loading="eager" fetchpriority="high" decoding="async" />` : ""}
${quickFacts}
${jumpNav}
${planningBlock}
${intro}
${dayBlock}
${clusterMarkup}
      ${city.tip ? `<aside class="hb-tip" id="tip"><h2>Planning tip</h2><p>${esc(city.tip)}</p></aside>` : ""}
      ${city.editorial?.trust ? `<section class="hb-trust"><h2>How this guide helps</h2><p>${esc(city.editorial.trust)}</p></section>` : ""}
      <section class="hb-convert">
        <h2>Build a ${esc(city.name)} ${city.kind === "landmark" ? "visit" : "itinerary"}</h2>
        <p>Turn these ideas into a trip built around your dates, pace, and priorities.</p>
        <a class="hb-cta-lg" href="${url(`/plan/?destination=${encodeURIComponent(city.key)}`)}">Plan a ${esc(city.name)} trip</a>
      </section>
      ${related.length ? `<section class="hb-related">
        <h2>More places to consider</h2>
        <ul class="hb-city-list">
${related.map((item) => `          <li><a href="${url(`/destinations/${item.slug}/`)}">${esc(item.name)}</a></li>`).join("\n")}
        </ul>
      </section>` : ""}
    </article>`;
  return {
    route,
    html: shell({
      headHtml: pageHead({ title: `${city.name} ${KIND_LABEL[city.kind] || "Travel Guide"}${city.country && city.country !== city.name ? `, ${city.country}` : ""} | The Fullest Life`, description, canonical: absolute(route), image, socialImage, schema }),
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Destinations", path: "/destinations/" },
        { name: city.name, path: route }
      ],
      body
    })
  };
}

function countryPage(country) {
  const route = `/countries/${country.slug}/`;
  const description = clamp(country.editorial?.dek || country.guide.summary || `A practical travel guide to ${country.name}.`);
  const rawHero = country.editorial?.hero;
  const realImage = typeof rawHero === "string" ? rawHero : (rawHero?.image || "");
  const image = realImage || absolute("/assets/guide-country.svg");
  const socialImage = realImage || absolute("/assets/guide-country.png");
  const schema = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Countries", path: "/countries/" },
      { name: country.name, path: route }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Country",
      name: country.name,
      description,
      url: absolute(route),
      ...(image ? { image } : {})
    }
  ];
  const intro = (country.editorial?.intro || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n");
  const cards = (country.guide.cards || []).map(([label, copy]) => `
        <div class="hb-card"><dt>${esc(label)}</dt><dd>${esc(copy)}</dd></div>`).join("");
  const cityList = country.cities.length ? `
      <section class="hb-section">
        <h2>Where to go in ${esc(country.name)}</h2>
        <ul class="hb-city-list">${country.cities.map((city) => `<li><a href="${url(`/destinations/${city.slug}/`)}">${esc(city.name)}</a><span>${esc(clamp(city.summary, 110))}</span></li>`).join("")}</ul>
      </section>` : "";
  const body = `    <article>
      <p class="hb-eyebrow">Country guide</p>
      <h1>${esc(country.editorial?.title || country.name)}</h1>
      ${country.editorial?.dek ? `<p class="hb-dek">${esc(country.editorial.dek)}</p>` : ""}
      ${image ? `<img class="hb-hero" src="${esc(image)}" alt="${esc(`${country.name} landscape`)}" width="1200" height="800" loading="eager" fetchpriority="high" decoding="async" />` : ""}
      ${country.guide.summary ? `<p>${esc(country.guide.summary)}</p>` : ""}
${intro}
      ${cards ? `<dl class="hb-cards">${cards}\n      </dl>` : ""}
${cityList}
      <section class="hb-convert">
        <h2>Plan a trip to ${esc(country.name)}</h2>
        <p>Choose a city, then shape the trip around what sounds good to you.</p>
        <a class="hb-cta-lg" href="${url("/plan/")}">Start planning</a>
      </section>
    </article>`;
  return {
    route,
    html: shell({
      headHtml: pageHead({ title: `${country.name} Travel Guide | The Fullest Life`, description, canonical: absolute(route), image, socialImage, schema }),
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Countries", path: "/countries/" },
        { name: country.name, path: route }
      ],
      body
    })
  };
}

function indexPage({ route, heading, title, description, groups, introLabel }) {
  const schema = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: heading, path: route }]),
    { "@context": "https://schema.org", "@type": "CollectionPage", name: heading, description, url: absolute(route) }
  ];
  const groupMarkup = groups.map((group) => `
      <section class="hb-section">
        <h2>${esc(group.heading)}</h2>
        <ul class="hb-city-list">${group.items.map((item) => {
          const name = item.path
            ? `<a href="${url(item.path)}">${esc(item.name)}</a>`
            : `<span class="hb-index-name">${esc(item.name)}</span>`;
          const status = item.status ? `<span class="hb-index-status">${esc(item.status)}</span>` : "";
          const safeBlurb = item.blurb && classifyItem(item.blurb).kind !== "placeholder" ? item.blurb : "";
          const blurb = safeBlurb ? `<span>${esc(clamp(safeBlurb, 120))}</span>` : "";
          return `<li>${name}${status}${blurb}</li>`;
        }).join("")}</ul>
      </section>`).join("");
  const body = `    <article>
      <p class="hb-eyebrow">${esc(introLabel)}</p>
      <h1>${esc(heading)}</h1>
      <p class="hb-dek">${esc(description)}</p>
${groupMarkup}
    </article>`;
  return {
    route,
    html: shell({
      headHtml: pageHead({ title, description, canonical: absolute(route), schema }),
      breadcrumbs: [{ name: "Home", path: "/" }, { name: heading, path: route }],
      body
    })
  };
}

function homePage(featured) {
  const route = "/";
  const title = "Plan a trip that feels like yours | The Fullest Life";
  const description = `Build a day-by-day vacation around your dates, pace, priorities, and the places you want to see. Explore ${featured.length} destination guides.`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "The Fullest Life Travel",
      url: absolute(route),
      potentialAction: {
        "@type": "SearchAction",
        target: `${absolute("/plan/")}?destination={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];
  const steps = [
    ["Start with the basics", "Add your destination, dates, travelers, and the practical details that shape the trip."],
    ["Tell us what sounds good", "Choose your pace, trip style, food interests, and the things you do not want to miss."],
    ["Make it yours", "Review the first draft, swap anything that feels off, and save a version when it feels right."]
  ];
  const destinationCards = featured.slice(0, 12).map((city) => {
    const image = typeof city.hero === "string" ? city.hero : city.hero?.image;
    return `<article class="hb-feature-card">
          ${image ? `<img src="${esc(image)}" alt="${esc(`${city.name} travel highlights`)}" width="720" height="420" loading="lazy" decoding="async" />` : ""}
          <div><h3><a href="${url(`/destinations/${city.slug}/`)}">${esc(city.name)}</a></h3><p>${esc(clamp(city.summary, 120))}</p></div>
        </article>`;
  }).join("\n");
  const body = `    <article>
      <header class="hb-lede hb-lede--home">
        <p class="hb-eyebrow">Your next trip</p>
        <h1>Build a trip you will actually want to take</h1>
        <p class="hb-dek">Tell us where you are going, what you want to do, and how full you want the days to feel. We will turn it into a practical starting point you can change.</p>
        <a class="hb-cta-lg" href="${url("/plan/")}">Start planning</a>
      </header>

      <section class="hb-cluster hb-cluster--columns">
        <h2>How it works</h2>
        <div class="hb-cluster-body">
          ${steps.map(([heading, copy]) => `<div class="hb-block"><h3>${esc(heading)}</h3><p>${esc(copy)}</p></div>`).join("\n          ")}
        </div>
      </section>

      <section class="hb-cluster hb-cluster--grid" id="featured">
        <h2>Get inspired by a destination</h2>
        <p class="hb-section-lead">Browse guides for ${featured.length} places, with ideas for what to see, where to eat, and how to spend a day.</p>
        <div class="hb-feature-grid">
          ${destinationCards}
        </div>
        <a class="hb-inline-cta" href="${url("/destinations/")}">Browse all destinations</a>
      </section>

      <section class="hb-convert">
        <h2>Ready to make a plan?</h2>
        <p>Start with the details you know. You can fill in the rest as you go.</p>
        <a class="hb-cta-lg" href="${url("/plan/")}">Plan my trip</a>
      </section>
    </article>`;
  return {
    route,
    html: shell({
      headHtml: pageHead({ title, description, canonical: absolute(route), schema }),
      breadcrumbs: [{ name: "Home", path: route }],
      body
    })
  };
}

function infoPage({ route, heading, title, description, label, sections, schema = [] }) {
  const body = `    <article>
      <p class="hb-eyebrow">${esc(label)}</p>
      <h1>${esc(heading)}</h1>
      <p class="hb-dek">${esc(description)}</p>
${sections.map((section) => `      <section class="hb-section"><h2>${esc(section.heading)}</h2><p>${esc(section.copy)}</p></section>`).join("\n")}
    </article>`;
  return {
    route,
    html: shell({
      headHtml: pageHead({
        title,
        description,
        canonical: absolute(route),
        schema: [breadcrumbSchema([{ name: "Home", path: "/" }, { name: heading, path: route }]), ...schema]
      }),
      breadcrumbs: [{ name: "Home", path: "/" }, { name: heading, path: route }],
      body
    })
  };
}

function looksLikePlannerApp(html) {
  return html.includes("app-bottom-bar") && html.length > 50000;
}

function plannerRedirectStub() {
  const target = "./plan/";
  return [
    "<!doctype html>",
    "<html lang=\"en\">",
    "<head>",
    "  <meta charset=\"utf-8\" />",
    "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />",
    "  <meta name=\"robots\" content=\"noindex, follow\" />",
    `  <meta http-equiv=\"refresh\" content=\"0; url=${target}\" />`,
    `  <link rel=\"canonical\" href=\"${absolute("/plan/")}\" />`,
    "  <title>The Fullest Life Travel</title>",
    "</head>",
    "<body>",
    `  <p><a href=\"${target}#build\">Continue to The Fullest Life Travel</a></p>`,
    "  <script>",
    "    const target = new URL(" + JSON.stringify(target) + ", window.location.href);",
    "    target.search = window.location.search;",
    "    target.hash = window.location.hash || \"#build\";",
    "    window.location.replace(target.href);",
    "  </script>",
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

function relocatePlannerApp() {
  if (DRY_RUN) return;

  const appSource = path.join(OUT, "code.html");
  const planDestination = path.join(OUT, "plan", "index.html");
  if (!fs.existsSync(appSource)) {
    throw new Error("Missing code.html. The planner app is required before generating pages.");
  }

  const currentApp = fs.readFileSync(appSource, "utf8");
  if (!looksLikePlannerApp(currentApp)) {
    if (fs.existsSync(planDestination) && looksLikePlannerApp(fs.readFileSync(planDestination, "utf8"))) {
      const existingPlan = fs.readFileSync(planDestination, "utf8");
      if (!existingPlan.includes('<base href="../" />')) {
        const normalizedPlan = existingPlan.replace(/<head>\s*/, `<head>\n  <base href="../" />\n  <meta name="robots" content="index, follow" />\n`);
        fs.writeFileSync(planDestination, normalizedPlan, "utf8");
      }
      fs.writeFileSync(appSource, plannerRedirectStub(), "utf8");
      console.log("  plan/      already relocated");
      return;
    }
    throw new Error("code.html is not the planner app and plan/index.html is missing or invalid.");
  }

  const planCanonical = absolute("/plan/");
  const planHtml = currentApp
    .replace(/<link id="canonical-url"[^>]*>/, `<link id="canonical-url" rel="canonical" href="${planCanonical}" />`)
    .replace(/<head>\s*/, `<head>\n  <base href="../" />\n  <meta name="robots" content="index, follow" />\n`)
    .replace("https://hamiltondan20-sys.github.io/fun-app/code.html", planCanonical);

  fs.mkdirSync(path.dirname(planDestination), { recursive: true });
  fs.writeFileSync(planDestination, planHtml, "utf8");
  fs.writeFileSync(appSource, plannerRedirectStub(), "utf8");
  console.log("  plan/      planner app relocated from code.html");
}

function renderedWordCount(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || "";
  const text = main
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(/\s+/).length : 0;
}

function placeholderShare(city) {
  const items = [
    ...city.clusters.flatMap((cluster) => cluster.blocks.flatMap((block) => block.items)),
    ...city.planningToolkit.flatMap((entry) => [entry.value, entry.copy])
  ];
  if (!items.length) return { share: 0, count: 0, total: 0 };
  const count = items.filter((item) => classifyItem(item).kind === "placeholder").length;
  return { share: count / items.length, count, total: items.length };
}

function reviewCityPage(city) {
  const page = cityPage(city);
  const categoryCount = city.clusters.reduce((total, cluster) => total + cluster.blocks.length, 0);
  const reasons = [];
  if (!city.summary.trim() && !city.editorial?.dek?.trim()) reasons.push("missing its own summary or editorial dek");
  if (categoryCount < 3) reasons.push(`has only ${categoryCount} populated detail categories`);
  const placeholders = placeholderShare(city);
  if (placeholders.share > MAX_PLACEHOLDER) {
    reasons.push(`${placeholders.count} of ${placeholders.total} content items are unfilled placeholders (${Math.round(placeholders.share * 100)}%)`);
  }
  const words = renderedWordCount(page.html);
  if (words <= MIN_WORDS) reasons.push(`renders ${words} words, below the ${MIN_WORDS}-word minimum`);
  return { city, page, words, reasons, eligible: reasons.length === 0 };
}

function reviewCountryPage(country) {
  const page = countryPage(country);
  const cards = Array.isArray(country.guide?.cards)
    ? country.guide.cards.filter((card) => Array.isArray(card) && card[0] && card[1]).length
    : 0;
  const reasons = [];
  if (!country.guide?.summary?.trim() && !country.editorial?.dek?.trim()) reasons.push("missing its own summary or editorial dek");
  if (cards < 2 || country.cities.length < 2) reasons.push(`has ${cards} real cards and ${country.cities.length} linked cities`);
  const words = renderedWordCount(page.html);
  if (words <= MIN_COUNTRY_WORDS) reasons.push(`renders ${words} words, below the ${MIN_COUNTRY_WORDS}-word country minimum`);
  return { country, page, words, reasons, eligible: reasons.length === 0 };
}

const cityCandidates = TIER1_ONLY ? cities.filter((city) => city.tier === 1) : cities;
const cityReviews = cityCandidates.map(reviewCityPage);
const cityReviewByKey = new Map(cityReviews.map((review) => [review.city.key, review]));
const publishedCities = cityReviews.filter((review) => review.eligible).map((review) => review.city);
publishedCitySlugs = new Set(publishedCities.map((city) => city.slug));

const countryCandidates = (TIER1_ONLY ? countries.filter((country) => country.editorial) : countries)
  .filter((country) => !publishedCitySlugs.has(country.slug))
  .map((country) => ({
    ...country,
    cities: country.cities.filter((city) => publishedCitySlugs.has(city.slug))
  }));
const countryReviews = countryCandidates.map(reviewCountryPage);
const publishedCountries = countryReviews.filter((review) => review.eligible).map((review) => review.country);
const excludedCountrySlugs = new Set(countries
  .filter((country) => publishedCitySlugs.has(country.slug))
  .map((country) => country.slug));
const heldBackCitySlugs = new Set(cityReviews.filter((review) => !review.eligible).map((review) => review.city.slug));
const heldBackCountrySlugs = new Set(countryReviews.filter((review) => !review.eligible).map((review) => review.country.slug));

function removeNonPublishedPages() {
  if (DRY_RUN) return;
  const keep = {
    destinations: new Set(publishedCities.map((city) => city.slug)),
    countries: new Set(publishedCountries.map((country) => country.slug))
  };
  for (const [label, keepSlugs] of Object.entries(keep)) {
    const root = path.resolve(OUT, label);
    let removed = 0;
    if (!fs.existsSync(root)) continue;
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory() || keepSlugs.has(entry.name)) continue;
      const directory = path.resolve(root, entry.name);
      if (!directory.startsWith(`${root}${path.sep}`)) continue;
      fs.rmSync(directory, { recursive: true, force: true });
      removed += 1;
    }
    if (removed) console.log(`  ${label}/ removed ${removed} pages no longer published`);
  }
}

publishedCities.forEach((city) => pages.push(cityPage(city)));
publishedCountries.forEach((country) => pages.push(countryPage(country)));

const cityGroups = new Map();
cityCandidates.forEach((city) => {
  const group = city.country || "Elsewhere";
  if (!cityGroups.has(group)) cityGroups.set(group, []);
  const review = cityReviewByKey.get(city.key);
  cityGroups.get(group).push({
    name: city.name,
    path: review?.eligible ? `/destinations/${city.slug}/` : null,
    blurb: city.summary,
    status: review?.eligible ? "" : "More detail is coming soon."
  });
});

pages.push(indexPage({
  route: "/destinations/",
  heading: "Destinations",
  title: "Destination Guides | The Fullest Life",
  description: `Practical guides for ${publishedCities.length} places, with more destinations listed as the catalogue grows.`,
  introLabel: "Browse places",
  groups: [...cityGroups.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([heading, items]) => ({ heading, items: items.sort((a, b) => a.name.localeCompare(b.name)) }))
}));

pages.push(indexPage({
  route: "/countries/",
  heading: "Countries",
  title: "Country Travel Guides | The Fullest Life",
  description: `Country guides for ${publishedCountries.length} places, with cities worth considering as a base.`,
  introLabel: "Start broad",
  groups: [{
    heading: "All countries",
    items: countryCandidates.sort((a, b) => a.name.localeCompare(b.name)).map((country) => {
      const review = countryReviews.find((candidate) => candidate.country.name === country.name);
      return {
        name: country.name,
        path: review?.eligible ? `/countries/${country.slug}/` : null,
        blurb: country.guide.summary,
        status: review?.eligible ? "" : "More detail is coming soon."
      };
    })
  }]
}));

pages.push(homePage([...publishedCities].sort((a, b) => (a.tier - b.tier) || a.name.localeCompare(b.name))));

const faqSections = [
  { heading: "How does the planner work?", copy: "Start with your destination, dates, travelers, and trip style. We then turn those choices into a practical day-by-day starting point." },
  { heading: "Can I change the plan?", copy: "Yes. Review the draft, adjust the details that matter, and generate a new version when the first pass does not feel right." },
  { heading: "Are prices and availability live?", copy: "The planner does not promise live availability. Check the linked airline, hotel, or booking source before you commit." },
  { heading: "Where does the guide information come from?", copy: "Guides are built from our own destination research and updated as the catalogue grows." }
];

pages.push(infoPage({
  route: "/faq/",
  heading: "Frequently asked questions",
  title: "FAQ | The Fullest Life",
  description: "Answers about The Fullest Life Travel trip planning, saved drafts, guide content, and travel information.",
  label: "Questions",
  sections: faqSections,
  schema: [{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSections.map((section) => ({
      "@type": "Question",
      name: section.heading,
      acceptedAnswer: { "@type": "Answer", text: section.copy }
    }))
  }]
}));

pages.push(infoPage({
  route: "/contact/",
  heading: "Contact The Fullest Life Travel",
  title: "Contact | The Fullest Life",
  description: "Send feedback or report an issue with a The Fullest Life Travel guide or trip plan.",
  label: "Get in touch",
  sections: [
    { heading: "Tell us what needs work", copy: "Email hamiltondan20@gmail.com with the destination, page, and detail that felt confusing, outdated, or too generic." },
    { heading: "Before you travel", copy: "For current entry rules, safety information, accessibility, and opening times, use official sources linked from the planner and destination pages." }
  ]
}));

const sitemapRoutes = ["/", ...pages.map((page) => page.route), "/plan/"];

function routeFile(route) {
  return route === "/"
    ? path.join(OUT, "index.html")
    : path.join(OUT, route.replace(/^\//, ""), "index.html");
}

let gitLastmodByFile;

function loadGitLastmods() {
  if (gitLastmodByFile) return gitLastmodByFile;
  gitLastmodByFile = new Map();
  try {
    const output = execSync("git log --format=%cI --name-only --all -- .", {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"]
    }).toString();
    let commitDate = null;
    for (const line of output.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
        commitDate = trimmed.slice(0, 10);
        continue;
      }
      if (commitDate && !gitLastmodByFile.has(trimmed)) {
        gitLastmodByFile.set(trimmed.replaceAll("\\", "/"), commitDate);
      }
    }
  } catch {
    // A source checkout without git history can still generate a valid sitemap.
  }
  return gitLastmodByFile;
}

function gitLastmod(file) {
  const relative = path.relative(ROOT, file).split(path.sep).join("/");
  return loadGitLastmods().get(relative) || null;
}

function buildSitemap() {
  const entries = [...new Set(sitemapRoutes)].map((route) => {
    const lastmod = DRY_RUN ? null : gitLastmod(routeFile(route));
    const lastmodMarkup = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
    const priority = route === "/" ? "1.0" : route.split("/").filter(Boolean).length <= 1 ? "0.8" : "0.7";
    return `  <url><loc>${esc(absolute(route))}</loc>${lastmodMarkup}<changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

if (!DRY_RUN) {
  for (const page of pages) {
    const directory = path.join(OUT, page.route);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "index.html"), page.html, "utf8");
  }
  removeNonPublishedPages();
  relocatePlannerApp();
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), buildSitemap(), "utf8");
}

const heldBackReviews = [...cityReviews, ...countryReviews].filter((review) => !review.eligible);
const holdReasons = new Map();
heldBackReviews.flatMap((review) => review.reasons).forEach((reason) => holdReasons.set(reason, (holdReasons.get(reason) || 0) + 1));
console.log(`${DRY_RUN ? "Would write" : "Wrote"} ${pages.length} pages and ${new Set(sitemapRoutes).size} sitemap URLs.`);
console.log(`Held back ${heldBackReviews.length} pages by content gates (cities: ${MIN_WORDS} words, countries: ${MIN_COUNTRY_WORDS} words).`);
for (const [reason, count] of holdReasons) console.log(`  ${count} ${reason}`);
