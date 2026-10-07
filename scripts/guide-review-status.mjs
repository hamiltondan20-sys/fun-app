export function guideReviewStatus(ledger) {
  // A detail-ledger review does not certify the itinerary or the whole guide.
  const date = ledger?.checkedOn;
  const reviewed = ledger?.renderVerifiedOnly === true
    && ledger.status === "source-checked"
    && ledger.reviewScope === "cityGuideDetailData"
    && /^\d{4}-\d{2}-\d{2}$/.test(date || "")
    && Number.isFinite(Date.parse(`${date}T00:00:00Z`));
  if (!reviewed) return "Automated content checks passed · source review pending";
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
  return `Detail recommendations source-reviewed · ${formatted}`;
}

export const SAMPLE_DAY_NOTICE = "Sample-day suggestions have not completed a separate source review. Check opening times and travel times before using this itinerary.";
