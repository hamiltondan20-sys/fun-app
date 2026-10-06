# About page audit

October 5, 2026. No deployment authorized until the contact-address decision
is resolved and the release checks pass.

## Owner information request

The assistant asked: "What name should identify the site owner, and what short
background would you like on the About page? Please also confirm whether
hamiltondan20@gmail.com should be the public privacy contact."

The user replied: "yes, that is fine for now". That confirms the contact
address provisionally, not a biography, legal name, team size or history.
No name, credentials, founding date or personal travel experience was supplied
or added. "Independently run" was an assistant inference and is removed.
Colorado was supplied in the user's legal-page instructions, but is also
removed from About so it describes only editorial practice.

## Full previous page content

Get to know us

About The Fullest Life Travel

A practical travel-planning project, with clear limits on what has been checked and what still needs review.

### Make room for the trip you want

The Fullest Life Travel is an independently run project based in Colorado. We help you find things to do and turn your choices into a day-by-day starting point. You choose what sounds good, adjust the pace and check the details before booking. Questions and corrections go directly to hamiltondan20@gmail.com.

### How source reviews work

Our source-review process starts with the destination's official tourism board. We then check attractions and businesses against their own current websites, including the exact branch, access information and operating evidence. Where available, we add independent corroboration. Dated provenance records keep the place name, checked URLs and evidence together. A website review is not a personal visit or a guarantee that a venue will be open on your travel date.

### What has and has not been verified

Source reviews are still in progress. Not every published guide has completed this process. Boston, Cusco, Edinburgh and Dublin currently have complete recorded reviews of their detail recommendations. Other published guides have passed automated content checks, which are not proof that every place is current or independently verified. Austin's earlier review is being reconciled with the current evidence format. We keep this distinction visible rather than call the whole catalogue verified.

### Why some destinations are missing

We hold pages back when their content does not meet the publication checks, including pages filled with generic suggestions instead of enough named places. We do not publish every city simply to increase the catalogue. Those checks help identify gaps, but names that match an automated pattern still need source review. If reliable evidence is missing, our review process leaves the recommendation out rather than inventing a place.

### Help us make it better

Tell us the page, place name and detail that needs a second look. A current official link is especially helpful. We do not yet publish traveler reviews or promise live prices and availability.

Send a correction | Frequently asked questions

## Claim-by-claim attribution

Every sentence above was worded by the assistant. The factual bases differ:

| Exact claim | Supplied or generated basis | Resolution |
| --- | --- | --- |
| "an independently run project" | Generated inference; no ownership/team details supplied. | Removed. |
| "based in Colorado" | User supplied: "The site owner is based in Colorado". | Removed from About under the process-only direction; privacy retains supplied location. |
| "We help you find things to do and turn your choices into a day-by-day starting point." | User described this product purpose; repository planner implements it. | Removed introductory section to keep About process-only. |
| "You choose what sounds good, adjust the pace and check the details before booking." | User supplied editable planner purpose; implementation supports it. | Removed introductory section. |
| "Questions and corrections go directly to hamiltondan20@gmail.com." | User supplied address and provisionally approved it. Direct delivery wording was generated and depends on email provider. | Removed from About; Contact link instead. Other uses await address decision. |
| "Our source-review process starts with the destination's official tourism board." | User explicitly supplied workflow; docs/city-sourcing-checklist.md documents it. | Retained. |
| "We then check attractions and businesses against their own current websites, including the exact branch, access information and operating evidence." | User supplied workflow; checklist and data/city-source-ledger.js document it. | Retained. |
| "Where available, we add independent corroboration." | User supplied two-source preference; ledger records where available. | Retained, not represented as universal. |
| "Dated provenance records keep the place name, checked URLs and evidence together." | User supplied provenance requirement; ledger, status and inventory provide records. | Retained. |
| "A website review is not a personal visit or a guarantee that a venue will be open on your travel date." | Assistant-generated limitation supported by website-only review method. No first-hand visits claimed. | Retained as qualification, not biography. |
| "Source reviews are still in progress." | Generated summary of documented status and paused unfinished Singapore research. | Retained. |
| "Not every published guide has completed this process." | Generated summary of inventory: 4 source-verified, 185 classifier-passed. | Retained in equivalent wording. |
| "Boston, Cusco, Edinburgh and Dublin currently have complete recorded reviews of their detail recommendations." | Generated from current ledger/inventory, not user biography. | Removed city-specific snapshot to avoid a stale list; verification distinction remains. |
| "Other published guides have passed automated content checks, which are not proof that every place is current or independently verified." | Generated from generator and inventory; user explicitly warned about classifier limitations. | Retained in equivalent wording. |
| "Austin's earlier review is being reconciled with the current evidence format." | User requested reconciliation; completion remains pending. | Removed operational snapshot. |
| "We keep this distinction visible rather than call the whole catalogue verified." | Generated description of the inventory's explicit status labels. | Retained as the explicit limited-verification statement, not a team claim. |
| "We hold pages back when their content does not meet the publication checks, including pages filled with generic suggestions instead of enough named places." | User supplied withholding instructions; generator implements the gates. | Retained in equivalent wording. |
| "We do not publish every city simply to increase the catalogue." | Generated statement of intent, not directly supplied in this form. | Removed. |
| "Those checks help identify gaps, but names that match an automated pattern still need source review." | User supplied classifier limitation; code and inventory document it. | Retained in equivalent wording. |
| "If reliable evidence is missing, our review process leaves the recommendation out rather than inventing a place." | User explicitly required this workflow. Not claimed universally complete across legacy guides. | Retained scoped to source review. |
| "We do not yet publish traveler reviews or promise live prices and availability." | Reviews deferred by user; FAQ and implementation confirm no live-availability promise. | Removed from process-only About; limitation remains elsewhere. |

The correction-request sentences are invitations, not owner/history claims.
No assertions about founder identity, qualifications, founding history or team
membership appear in the revised page.

## Contact email locations

Repository text scan excluding .git, node_modules and ZIP archives found:

- scripts/generate-pages.mjs: source for generated Contact, Privacy and Terms.
- scripts/app-trip.js: planner beta feedback link.
- plan/index.html: direct, non-generated planner email links.
- contact/index.html: generated contact page.
- privacy/index.html: generated policy contact and mailto link.
- terms/index.html: generated error-reporting contact.
- docs/legal-trust-review.md: internal contact decision record.
- docs/about-page-audit.md: this historical audit, not a production contact.

Before the correction, about/index.html also contained the address. The
revised About page links to Contact instead and no longer publishes it.
The old About text retained above is deliberately a historical quote.

Recommend a dedicated monitored support/privacy inbox, ideally on a domain
the user owns. Do not invent an address or publish an unconfigured mailbox.
An indexed personal address may attract unsolicited mail; using Gmail is not
itself a legal defect. User must choose replacement or approve temporary use.
