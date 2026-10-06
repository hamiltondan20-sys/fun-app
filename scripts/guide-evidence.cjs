// Three-entry quotas encourage a manufactured third suggestion, the same failure
// that produced generic cafe strings. Evidence, not list length, supports trust.
function hasPlaceEvidence(source) {
  if (!source?.sourceType || !source.operatingEvidence?.trim()
    || !/^\d{4}-\d{2}-\d{2}$/.test(source.checkedOn || "")) return false;
  try { return new URL(source.url).protocol === "https:"; }
  catch { return false; }
}

function renderedEntries(items, ledger) {
  const entries = Array.isArray(items) ? items.filter(Boolean).map(String) : [];
  // Unreviewed means undocumented, not wrong. Preserve existing rendering until
  // review rather than causing another mass removal for missing source records.
  if (ledger?.renderVerifiedOnly !== true) return entries;
  if (ledger.status !== "source-checked" || ledger.reviewScope !== "cityGuideDetailData"
    || ledger.verificationMethod !== "official-web-review" || !ledger.limitations) {
    throw new Error("Verified-only rendering requires a scoped source review.");
  }
  // Filtering is a view: retained detail data and ledger records are never edited.
  return entries.filter((name) => hasPlaceEvidence(ledger.placeSources?.[name]));
}

module.exports = { hasPlaceEvidence, renderedEntries };
