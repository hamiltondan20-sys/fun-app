// Display-only consolidation: retain all 15 source fields and their gate counts.
// Short verified lists are preferable to entries manufactured to meet a count.
export const REVIEWED_SECTIONS = [
  { id: "see", label: "Sights and museums", fields: [["bestAttractions", "Sight"], ["bestFirstTimers", "First visit"]] },
  { id: "less-obvious", label: "Less obvious stops", fields: [["bestUnique", "Less obvious"]] },
  { id: "eat", label: "Meals worth planning", fields: [["bestLunch", "Lunch"], ["bestDinner", "Dinner"], ["bestRestaurants", "Book ahead"]] },
  { id: "cafes", label: "Cafes and bakeries", fields: [["bestBreakfast", "Breakfast"], ["bestCoffee", "Coffee"], ["bestBakeries", "Bakery"]] },
  { id: "drinks", label: "Drinks", fields: [["bestCocktails", "Cocktails"]] },
  { id: "kids", label: "With kids", fields: [["bestKids", "With kids"]] },
  { id: "who", label: "Your kind of day", fields: [["bestSolo", "Solo"], ["bestCouples", "Couples"]] },
  { id: "budget-splurge", label: "Budget and special occasions", fields: [["bestBudget", "Budget"], ["bestLuxury", "Splurge"]] }
];

export function reviewedSections(clusters) {
  const fields = new Map(clusters.flatMap(cluster => cluster.blocks).map(block => [block.field, block.items]));
  return REVIEWED_SECTIONS.map(section => {
    const entries = new Map();
    for (const [field, label] of section.fields) {
      for (const name of fields.get(field) || []) {
        if (!entries.has(name)) entries.set(name, { name, labels: [] });
        const entry = entries.get(name);
        if (!entry.labels.includes(label)) entry.labels.push(label);
      }
    }
    const items = [...entries.values()];
    let label = section.label;
    if (section.id === "budget-splurge") {
      // Navigation, heading and ItemList all use this label. Do not advertise
      // an intent absent from the evidence-filtered entries.
      const budget = items.some(entry => entry.labels.includes("Budget"));
      const splurge = items.some(entry => entry.labels.includes("Splurge"));
      if (budget && !splurge) label = "On a budget";
      if (splurge && !budget) label = "Special occasions";
    }
    return { ...section, label, entries: items };
  }).filter(section => section.entries.length);
}
