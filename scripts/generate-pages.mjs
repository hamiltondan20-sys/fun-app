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
import { fileURLToPath } from "node:url";

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
  try {
    const areas = HELPERS.getAreaSet(cityName);
    const templates = HELPERS.getTimelineTemplates(cityName, areas);
    const day = Array.isArray(templates) ? templates[0] : null;
    return Array.isArray(day) && day.length
      ? day.filter((slot) => slot && slot.time && slot.title)
      : null;
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
  .slice(1)
  .join(",")
  .split(/\s+and\s+|\s*&\s*/i)
  .map((value) => value.trim())
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

const rawCities = Array.isArray(DATA.cityGuideData) ? DATA.cityGuideData : [];
const usedSlugs = new Set();
const cities = rawCities.map((record) => {
  const key = String(record.city || record.title || "");
  const name = cityName(record);
  const countries = cityCountries(record);
  const baseSlug = cityOverrides[key] || slugify(name);
  let slug = baseSlug || "destination";
  if (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${slugify(countries[0] || "travel")}`;
  }
  let suffix = 2;
  while (usedSlugs.has(slug)) slug = `${baseSlug}-${suffix++}`;
  usedSlugs.add(slug);
  const detail = DATA.cityGuideDetailData?.[key] || {};
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
  const editorial = DATA.cityEditorialPageData?.[key] || null;
  const hero = DATA.destinationHeroData?.[key] || null;
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

const publishedCities = TIER1_ONLY ? cities.filter((city) => city.tier === 1) : cities;
const publishedCountries = TIER1_ONLY
  ? countries.filter((country) => country.editorial)
  : countries;
const pages = [];

function pageHead({ title, description, canonical, image, schema = [], noindex = false }) {
  return `<meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(canonical)}" />
  <meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Horizon Bound" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  ${image ? `<meta property="og:image" content="${esc(image)}" />` : ""}
  <meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  ${image ? `<meta name="twitter:image" content="${esc(image)}" />` : ""}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" />
  <link rel="stylesheet" href="${url("/assets/app.css")}" />
  <link rel="stylesheet" href="${url("/assets/content.css")}" />
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
    <a class="hb-brand" href="${url("/")}">Horizon Bound</a>
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
  <footer class="hb-site-footer">
    <p>Horizon Bound | <a href="${url("/faq/")}">FAQ</a> | <a href="${url("/contact/")}">Contact</a></p>
  </footer>
</body>
</html>
`.replace(/[ \t]+\r?\n/g, "\n");
}

function cityPage(city) {
  const route = `/destinations/${city.slug}/`;
  const description = clamp(city.editorial?.dek || city.summary || `A practical travel guide to ${city.name}.`);
  const image = city.hero?.image || "";
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
            <ul>${block.items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          </div>`).join("\n")}
        </div>
      </section>`).join("\n");

  const intro = (city.editorial?.intro || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n");
  const related = city.countries
    .flatMap((country) => countries.find((item) => item.name === country)?.cities || [])
    .filter((item) => item.slug !== city.slug)
    .slice(0, 6);
  const heroAlt = city.hero?.copy ? `${city.name}: ${city.hero.copy}` : `${city.name} destination photo`;
  const body = `    <article>
      <header class="hb-lede">
        <p class="hb-eyebrow">${esc(city.country || KIND_LABEL[city.kind] || "Travel guide")}</p>
        <h1>${esc(city.name)}</h1>
        <p class="hb-dek">${esc(city.editorial?.dek || city.summary || `A practical travel guide to ${city.name}.`)}</p>
      </header>
      ${image ? `<img class="hb-hero" src="${esc(image)}" alt="${esc(heroAlt)}" width="1200" height="800" loading="eager" fetchpriority="high" decoding="async" />` : ""}
${quickFacts}
${jumpNav}
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
      headHtml: pageHead({ title: `${city.name} ${KIND_LABEL[city.kind] || "Travel Guide"}${city.country ? `, ${city.country}` : ""} | Horizon Bound`, description, canonical: absolute(route), image, schema }),
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
  const image = typeof rawHero === "string" ? rawHero : (rawHero?.image || "");
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
        <ul class="hb-city-list">${country.cities.map((city) => `<li><a href="${url(`/destinations/${city.slug}/`)}">${esc(city.name)}</a><span>${esc(clamp(city.summary, 120))}</span></li>`).join("")}</ul>
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
      headHtml: pageHead({ title: `${country.name} Travel Guide | Horizon Bound`, description, canonical: absolute(route), image, schema }),
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
        <ul class="hb-city-list">${group.items.map((item) => `<li><a href="${url(item.path)}">${esc(item.name)}</a>${item.blurb ? `<span>${esc(clamp(item.blurb, 120))}</span>` : ""}</li>`).join("")}</ul>
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
  const title = "Plan a trip that feels like yours | Horizon Bound";
  const description = `Build a day-by-day vacation around your dates, pace, priorities, and the places you want to see. Explore ${featured.length} destination guides.`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Horizon Bound",
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

function infoPage({ route, heading, title, description, label, sections }) {
  const body = `    <article>
      <p class="hb-eyebrow">${esc(label)}</p>
      <h1>${esc(heading)}</h1>
      <p class="hb-dek">${esc(description)}</p>
${sections.map((section) => `      <section class="hb-section"><h2>${esc(section.heading)}</h2><p>${esc(section.copy)}</p></section>`).join("\n")}
    </article>`;
  return {
    route,
    html: shell({
      headHtml: pageHead({ title, description, canonical: absolute(route) }),
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
    "  <title>Horizon Bound</title>",
    "</head>",
    "<body>",
    `  <p><a href=\"${target}#build\">Continue to Horizon Bound</a></p>`,
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

publishedCities.forEach((city) => pages.push(cityPage(city)));
publishedCountries.forEach((country) => pages.push(countryPage(country)));

const cityGroups = new Map();
publishedCities.forEach((city) => {
  const group = city.country || "Elsewhere";
  if (!cityGroups.has(group)) cityGroups.set(group, []);
  cityGroups.get(group).push({ name: city.name, path: `/destinations/${city.slug}/`, blurb: city.summary });
});

pages.push(indexPage({
  route: "/destinations/",
  heading: "Destinations",
  title: "Destination Guides | Horizon Bound",
  description: `Practical guides for ${publishedCities.length} places, including what to see, where to eat, and how to pace the trip.`,
  introLabel: "Browse places",
  groups: [...cityGroups.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([heading, items]) => ({ heading, items: items.sort((a, b) => a.name.localeCompare(b.name)) }))
}));

pages.push(indexPage({
  route: "/countries/",
  heading: "Countries",
  title: "Country Travel Guides | Horizon Bound",
  description: `Country guides for ${publishedCountries.length} places, with cities worth considering as a base.`,
  introLabel: "Start broad",
  groups: [{
    heading: "All countries",
    items: publishedCountries.sort((a, b) => a.name.localeCompare(b.name)).map((country) => ({ name: country.name, path: `/countries/${country.slug}/`, blurb: country.guide.summary }))
  }]
}));

pages.push(homePage([...publishedCities].sort((a, b) => (a.tier - b.tier) || a.name.localeCompare(b.name))));

pages.push(infoPage({
  route: "/faq/",
  heading: "Frequently asked questions",
  title: "FAQ | Horizon Bound",
  description: "Answers about Horizon Bound trip planning, saved drafts, guide content, and travel information.",
  label: "Questions",
  sections: [
    { heading: "How does the planner work?", copy: "Start with your destination, dates, travelers, and trip style. Horizon Bound then turns those choices into a practical day-by-day starting point." },
    { heading: "Can I change the plan?", copy: "Yes. Review the draft, adjust the details that matter, and generate a new version when the first pass does not feel right." },
    { heading: "Are prices and availability live?", copy: "The planner does not promise live availability. Check the linked airline, hotel, attraction, and official travel sources before booking." },
    { heading: "Where does the guide information come from?", copy: "Guide pages are built from destination content and are meant to help you choose what to explore. Hours, rules, and access can change, so confirm current details before travel." }
  ]
}));

pages.push(infoPage({
  route: "/contact/",
  heading: "Contact Horizon Bound",
  title: "Contact | Horizon Bound",
  description: "Send feedback or report an issue with a Horizon Bound guide or trip plan.",
  label: "Get in touch",
  sections: [
    { heading: "Tell us what needs work", copy: "Email hamiltondan20@gmail.com with the destination, page, and detail that felt confusing, outdated, or too generic." },
    { heading: "Before you travel", copy: "For current entry rules, safety information, accessibility, and opening times, use official sources linked from the planner and destination pages." }
  ]
}));

const sitemapRoutes = ["/", ...pages.map((page) => page.route), "/plan/"];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...new Set(sitemapRoutes)].map((route) => `  <url><loc>${esc(absolute(route))}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${route === "/" ? "1.0" : route.split("/").filter(Boolean).length <= 1 ? "0.8" : "0.7"}</priority></url>`).join("\n")}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: ${url("/saved/")}\nDisallow: ${url("/account/")}\n\nSitemap: ${absolute("/sitemap.xml")}\n`;

if (!DRY_RUN) {
  for (const page of pages) {
    const directory = path.join(OUT, page.route);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "index.html"), page.html, "utf8");
  }
  relocatePlannerApp();
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap, "utf8");
  fs.writeFileSync(path.join(OUT, "robots.txt"), robots, "utf8");
}

console.log(`${DRY_RUN ? "Would write" : "Wrote"} ${pages.length} pages and ${new Set(sitemapRoutes).size} sitemap URLs.`);
