import test from "node:test";
import assert from "node:assert/strict";
import { guideReviewStatus } from "./guide-review-status.mjs";

test("only a dated detail review receives a scoped source-review label", () => {
  const ledger = { renderVerifiedOnly: true, status: "source-checked", reviewScope: "cityGuideDetailData", checkedOn: "2026-10-06" };
  assert.equal(guideReviewStatus(ledger), "Detail recommendations source-reviewed · 6 October 2026");
  for (const value of [undefined, {}, { ...ledger, renderVerifiedOnly: false }, { ...ledger, checkedOn: "invalid" }, { ...ledger, reviewScope: "legacy" }]) {
    assert.equal(guideReviewStatus(value), "Automated content checks passed · source review pending");
  }
});
