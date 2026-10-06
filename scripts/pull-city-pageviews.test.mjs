import assert from "node:assert/strict";
import test from "node:test";
import { fullMonths, validateMonths, matchesCity } from "./pull-city-pageviews.mjs";

test("pageviews use the last twelve full months across year boundaries", () => {
  const period = fullMonths(new Date("2026-10-06T00:00:00Z"));
  assert.equal(period.start, "2025100100");
  assert.equal(period.end, "2026093000");
  assert.equal(period.months.length, 12);
  assert.equal(fullMonths(new Date("2026-01-01T00:00:00Z")).start, "2025010100");
});

test("namesakes and disambiguation pages cannot pass the city identity check", () => {
  const page = { title: "Vancouver", ns: 0, coordinates: [{ lat: 49, lon: -123 }],
    pageprops: { wikibase_item: "Q24639" }, extract: "Vancouver is a city in British Columbia, Canada." };
  assert.equal(matchesCity(page, "Vancouver", "Vancouver", /British Columbia/), true);
  assert.equal(matchesCity({ ...page, pageprops: { wikibase_item: "other" } }, "Vancouver", "Vancouver", /British Columbia/), false);
  assert.equal(matchesCity({ ...page, pageprops: { ...page.pageprops, disambiguation: "" } }, "Vancouver", "Vancouver", /British Columbia/), false);
  assert.equal(matchesCity({ ...page, extract: "Vancouver is a city in Washington." }, "Vancouver", "Vancouver", /British Columbia/), false);
});

test("missing, duplicated or invalid monthly counts cannot become totals", () => {
  const { months } = fullMonths(new Date("2026-10-06T00:00:00Z"));
  const valid = months.map((month) => ({ timestamp: `${month}0100`, views: 123 }));
  validateMonths(valid, months);
  assert.throws(() => validateMonths(valid.slice(1), months));
  assert.throws(() => validateMonths([...valid.slice(1), valid[1]], months));
  assert.throws(() => validateMonths(valid.map((r) => ({ ...r, views: -1 })), months));
});
