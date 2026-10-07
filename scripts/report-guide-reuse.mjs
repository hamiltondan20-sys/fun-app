import fs from "node:fs";
import vm from "node:vm";
import evidence from "./guide-evidence.cjs";
import { reviewedSections } from "./guide-sections.mjs";

const context = vm.createContext({ window: {} });
for (const name of ["destinations", "country-guides", "city-guides", "trip-content",
  "top-100-destinations", "destination-expansion", "destination-coverage", "city-source-ledger"]) {
  vm.runInContext(fs.readFileSync(`data/${name}.js`, "utf8"), context);
}
const data = context.window.HB_DATA;
// Comparison only: preserve appearances in the original category order.
// A cap is not an editorial choice of the most useful category for each place.
const fields = ["bestAttractions", "bestFirstTimers", "bestUnique", "bestBreakfast",
  "bestLunch", "bestDinner", "bestRestaurants", "bestCoffee", "bestBakeries",
  "bestCocktails", "bestCouples", "bestKids", "bestSolo", "bestBudget", "bestLuxury"];

const rows = Object.entries(data.citySourceLedger)
  .filter(([, ledger]) => ledger.renderVerifiedOnly === true)
  .map(([city, ledger]) => {
    const categories = fields.map((field) => ({ field,
      items: [...new Set(evidence.renderedEntries(data.cityGuideDetailData[city][field], ledger))]
    }));
    const counts = new Map();
    for (const { items } of categories) for (const name of items) counts.set(name, (counts.get(name) || 0) + 1);
    const slots = [...counts.values()].reduce((a, b) => a + b, 0);
    const sections = reviewedSections([{ blocks: categories }]);
    const displayedCounts = new Map();
    for (const section of sections) for (const { name } of section.entries) {
      displayedCounts.set(name, (displayedCounts.get(name) || 0) + 1);
    }
    const displayedSlots = [...displayedCounts.values()].reduce((a, b) => a + b, 0);
    const caps = [2, 3].map((cap) => {
      const used = new Map();
      let removedSlots = 0;
      const emptyCategories = [];
      for (const { field, items } of categories) {
        let retained = 0;
        for (const name of items) {
          const count = used.get(name) || 0;
          if (count >= cap) removedSlots++;
          else { used.set(name, count + 1); retained++; }
        }
        if (items.length && !retained) emptyCategories.push(field);
      }
      return { cap, removedSlots, emptyCategories };
    });
    return { city, distinct: counts.size, slots, mean: Number((slots / counts.size).toFixed(2)),
      maximum: Math.max(...counts.values()),
      mostRepeated: [...counts].filter(([, count]) => count === Math.max(...counts.values())).map(([name]) => name),
      display: { sections: sections.length, slots: displayedSlots,
        mean: Number((displayedSlots / counts.size).toFixed(2)), maximum: Math.max(...displayedCounts.values()) }, caps };
  });
console.log(JSON.stringify({ policy: "Exact labels; source-category reuse and consolidated display reported separately; caps remain hypothetical in original category order", rows }, null, 2));
