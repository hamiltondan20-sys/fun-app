import test from "node:test";
import assert from "node:assert/strict";
import evidence from "./guide-evidence.cjs";

test("staged rendering accepts short sourced lists and preserves unreviewed data", () => {
  const items = ["Actual Place", "Plausible Name"];
  const ledger = { renderVerifiedOnly: true, status: "source-checked",
    reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Website review only", placeSources: { "Actual Place": {
      sourceType: "operator", operatingEvidence: "Current visits advertised",
      checkedOn: "2026-10-06", url: "https://example.org/visit"
    } } };
  assert.deepEqual(evidence.renderedEntries(items, ledger), ["Actual Place"]);
  assert.deepEqual(evidence.renderedEntries(items, {}), items);
  assert.deepEqual(evidence.renderedEntries([], ledger), []);
  assert.deepEqual(items, ["Actual Place", "Plausible Name"]);
  assert.ok(ledger.placeSources["Actual Place"]);
  assert.throws(() => evidence.renderedEntries(items, { renderVerifiedOnly: true }));
  ledger.placeSources["Plausible Name"] = { ...ledger.placeSources["Actual Place"] };
  assert.deepEqual(evidence.renderedEntries(items, ledger), items);
});
