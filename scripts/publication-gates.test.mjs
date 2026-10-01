import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import vm from "node:vm";
import { classifyItem, linkItem } from "./place-links.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = [
  "scripts/generate-pages.mjs", "--base=/fun-app",
  "--origin=https://hamiltondan20-sys.github.io", "--out=.",
  "--min-words=350", "--dry-run", "--audit-json"
];

function audit(extra = []) {
  return JSON.parse(execFileSync(process.execPath, [...args, ...extra], {
    cwd: root, encoding: "utf8", maxBuffer: 10 * 1024 * 1024
  }));
}

function generatedSnapshot() {
  const hash = createHash("sha256");
  function visit(relative) {
    const absolute = path.join(root, relative);
    if (fs.statSync(absolute).isDirectory()) {
      for (const entry of fs.readdirSync(absolute).sort()) visit(path.join(relative, entry));
    } else {
      hash.update(relative);
      hash.update(fs.readFileSync(absolute));
    }
  }
  for (const relative of ["destinations", "countries", "sitemap.xml", "index.html", "faq", "contact", "plan", "code.html", "404.html"]) visit(relative);
  return hash.digest("hex");
}

test("publication ratchet respects thresholds without writing generated output", () => {
  const before = generatedSnapshot();
  const defaultReport = audit();
  const reports = [5, 8, 15].map((minimum) => audit([`--min-named=${minimum}`]));
  assert.deepEqual(defaultReport, reports[0]);
  let previousSlugs;
  for (const report of reports) {
    const published = report.cities.filter((city) => city.eligible);
    assert.equal(published.length, report.cityCount);
    assert.equal(report.sitemapCount, report.cityCount + report.countryCount + 6);
    for (const city of published) {
      assert.ok(city.named >= report.minNamed, `${city.slug} is below the named minimum`);
      assert.ok(city.categories >= 3, `${city.slug} has fewer than three categories with names`);
      assert.ok(city.words > 350, `${city.slug} failed the existing word gate`);
      if (previousSlugs) assert.ok(previousSlugs.has(city.slug), `${city.slug} appeared only at a higher threshold`);
    }
    previousSlugs = new Set(published.map((city) => city.slug));
  }
  for (const slug of ["rome", "london", "tokyo", "austin", "cusco"]) {
    assert.ok(reports[0].cities.find((city) => city.slug === slug)?.eligible, `${slug} should pass at five`);
  }
  for (const slug of ["marrakech", "manchester", "liverpool", "glasgow", "goa", "nha-trang", "sharjah", "ajman"]) {
    assert.equal(reports[0].cities.find((city) => city.slug === slug)?.eligible, false, `${slug} should remain held back`);
  }
  assert.equal(generatedSnapshot(), before, "dry-run changed generated files");
});

test("invalid named-place thresholds fail before generation", () => {
  for (const value of ["0", "4", "5.5", "invalid", ""]) {
    const result = spawnSync(process.execPath, [...args, `--min-named=${value}`], { cwd: root, encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /--min-named must be an integer of at least 5/);
  }
  const result = spawnSync(process.execPath, args.filter((arg) => arg !== "--dry-run"), { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--audit-json requires --dry-run/);
});

test("activity suggestions remain distinct from template placeholders", () => {
  for (const value of ["Coffee near Pantheon", "Morning in Monti", "Bookshop browsing in Marylebone", "Yanaka neighborhood", "Depachika food halls"]) {
    assert.equal(classifyItem(value).kind, "descriptor", value);
  }
  for (const value of ["A major museum, palace, temple, or heritage site", "Marrakech historic center or old town", "A local market or craft district", "A signature dinner from Morocco"]) {
    assert.equal(classifyItem(value).kind, "placeholder", value);
  }
});

test("source-checked map queries distinguish similarly named venues without changing classification", () => {
  const cafe = linkItem("Cicciolina Cafe", "Cusco, Peru", "Cicciolina Cafe Calle Ruinas 465");
  assert.match(cafe, /query=Cicciolina%20Cafe%20Calle%20Ruinas%20465%20Cusco%2C%20Peru/);
  assert.match(cafe, />Cicciolina Cafe<span/);
  const mapCafe = linkItem("MAP Cafe", "Cusco, Peru", "MAP Cafe Plazoleta Nazarenas 231");
  assert.match(mapCafe, /query=MAP%20Cafe%20Plazoleta%20Nazarenas%20231%20Cusco%2C%20Peru/);
  assert.equal(linkItem("A local market or craft district", "Cusco, Peru", "Not verified"), "A local market or craft district");
});

test("source-checked city details have dated evidence for every recommendation", () => {
  const context = vm.createContext({ window: {} });
  for (const file of [
    "data/destinations.js", "data/country-guides.js", "data/city-guides.js",
    "data/trip-content.js", "data/top-100-destinations.js",
    "data/destination-expansion.js", "data/destination-coverage.js",
    "data/city-source-ledger.js"
  ]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  const data = context.window.HB_DATA;
  const reviewed = Object.entries(data.citySourceLedger)
    .filter(([, entry]) => entry.status === "source-checked");
  assert.ok(reviewed.some(([city]) => city === "Cusco, Peru"));
  const categories = Object.keys(data.cityGuideDetailData["Austin, United States"]).sort();
  for (const [city, entry] of reviewed) {
    assert.equal(entry.reviewScope, "cityGuideDetailData");
    assert.equal(entry.verificationMethod, "official-web-review");
    assert.ok(entry.limitations);
    const details = data.cityGuideDetailData[city];
    assert.deepEqual(Object.keys(details).sort(), categories, `${city}: missing detail field`);
    const publishedNames = new Set();
    for (const [field, items] of Object.entries(details)) {
      assert.ok(Array.isArray(items), `${city}: ${field} is not an array`);
      assert.equal(new Set(items).size, items.length, `${city}: duplicate in ${field}`);
      for (const name of items) {
        publishedNames.add(name);
        assert.notEqual(classifyItem(name).kind, "placeholder", `${city}: ${name}`);
        const source = entry.placeSources[name];
        assert.ok(source, `${city}: no source for ${name}`);
        assert.match(source.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
        assert.ok(source.sourceType && source.operatingEvidence, `${city}: incomplete evidence for ${name}`);
        for (const url of [source.url, source.secondSourceUrl, ...(source.additionalSourceUrls || [])].filter(Boolean)) {
          assert.equal(new URL(url).protocol, "https:", `${city}: invalid source URL for ${name}`);
        }
        assert.ok(source.url, `${city}: missing primary URL for ${name}`);
      }
    }
    assert.deepEqual([...publishedNames].sort(), Object.keys(entry.placeSources).sort(), `${city}: unused or missing source records`);
  }
});

test("verification inventory stays current without changing generated pages", () => {
  const before = generatedSnapshot();
  const output = execFileSync(process.execPath, ["scripts/report-city-verification.mjs", "--check"], {
    cwd: root, encoding: "utf8", maxBuffer: 10 * 1024 * 1024
  });
  assert.match(output, /Verification inventory is current: \d+ destinations/);
  assert.equal(generatedSnapshot(), before);
});
