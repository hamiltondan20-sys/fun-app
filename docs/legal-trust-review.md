# Legal and trust pages review

Reviewed October 5, 2026. This is a code/practice review, not legal advice.
Obtain qualified legal review before commercial use. No assertion of complete
Colorado, EU or worldwide compliance is made by publishing these pages.

## Confirmed implementation

- Profile key hb-trip-profile-v1: display name, email, home airport,
  local/guest method and savedAt.
- Draft key hb-trip-draft-v1: app inputs, generated/current/liked/alternate
  plans, profile, booking items, source selection and timestamps.
- Booking key hb-trip-booking-v1: destination, progress statuses, user notes,
  and timestamps. No payment processing or reservation submission.
- Guide key hb-guide-memory-v1: guide searches, selections, filters,
  comparisons, selected activities and scroll positions.
- Consent key hb.analytics.consent: granted or denied. The GA measurement ID
  in scripts/site-config.js is empty. Analytics only loads when configured
  and granted. Withdrawal now disables events, records denial and reloads;
  blocked storage displays a warning instead of falsely claiming persistence.
- Browser app network scan found a fetch to Wikimedia Commons in
  scripts/app-guides.js, searching a city/country for a photo. No saved-profile,
  draft or booking upload endpoint was found. Absence of fetch alone is not
  absence of network traffic: scripts, fonts, images, outbound maps, hosting
  requests and user-initiated email are separately disclosed.
- No online registration backend or automatic profile-email delivery found.
- hamiltondan20@gmail.com approved as public privacy contact. No personal
  owner name, qualifications or biography provided, so none invented.
- Complete current detail-review records cover Boston, Cusco, Edinburgh and
  Dublin, not the entire published catalogue. About describes this limitation.

## Owner / counsel decisions still needed

- Confirm the legal controller identity and whether a business address must
  be disclosed; the owner has not supplied these details.
- Define correspondence retention and request-handling procedures. No invented
  fixed retention period or response deadline has been promised.
- Before enabling GA, review its property settings, retention, data-sharing,
  international-transfer arrangements, cookie rules and applicable rights.
  The on-site configuration is currently empty; property settings cannot be
  audited from this repository.
- Assess applicable law with counsel. Colorado location alone does not settle
  CPA applicability; thresholds and exemptions matter. EU service targeting
  and behavioral monitoring can trigger GDPR obligations for a US operator.
- Confirm third-party image providers as assets change. A local-only planner
  does not imply third parties receive no network information.

## Official legal references checked

- Colorado Attorney General:
  https://coag.gov/resources/colorado-privacy-act/
  describes CPA thresholds (100,000 Colorado consumers, or 25,000 plus
  qualifying personal-data sale revenue/discount).
- European Commission:
  https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/application-gdpr_en
  explains applicability outside the EU for offering services or monitoring
  behavior in the EU.

No destination content, publication thresholds, analytics measurement ID,
root robots file, domain configuration or paused content automation changed.
