import test from "node:test";
import assert from "node:assert/strict";
import { reviewedSections, REVIEWED_SECTIONS } from "./guide-sections.mjs";

test("reviewed sections preserve every field and merge only within a section", () => {
  assert.equal(new Set(REVIEWED_SECTIONS.flatMap(s => s.fields.map(([f]) => f))).size, 15);
  const clusters = [{ blocks: [
    { field: "bestLunch", items: ["Cafe One", "Cafe Two"] },
    { field: "bestDinner", items: ["Cafe One"] },
    { field: "bestSolo", items: ["Cafe One"] },
    { field: "bestCoffee", items: ["Cafe One"] }
  ] }];
  const before = JSON.stringify(clusters);
  const sections = reviewedSections(clusters);
  assert.deepEqual(sections.map(s => s.id), ["eat", "cafes", "who"]);
  assert.deepEqual(sections[0].entries, [
    { name: "Cafe One", labels: ["Lunch", "Dinner"] },
    { name: "Cafe Two", labels: ["Lunch"] }
  ]);
  assert.equal(sections[1].entries[0].name, "Cafe One");
  assert.equal(sections[2].entries[0].name, "Cafe One");
  assert.equal(JSON.stringify(clusters), before);
  assert.deepEqual(reviewedSections([]), []);
});

test("budget heading reflects only the intents present without changing its anchor", () => {
  for (const [budget, splurge, label] of [
    [true, false, "On a budget"],
    [false, true, "Special occasions"],
    [true, true, "Budget and special occasions"],
    [false, false, null]
  ]) {
    const clusters = [{ blocks: [
      { field: "bestBudget", items: budget ? ["Free Place"] : [] },
      { field: "bestLuxury", items: splurge ? ["Booked Place"] : [] }
    ] }];
    const before = JSON.stringify(clusters);
    const section = reviewedSections(clusters).find(s => s.id === "budget-splurge");
    assert.equal(section?.label || null, label);
    if (label) assert.equal(section.id, "budget-splurge");
    assert.equal(JSON.stringify(clusters), before);
  }
});
