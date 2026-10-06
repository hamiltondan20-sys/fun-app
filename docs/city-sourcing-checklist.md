# City Guide Sourcing Checklist

Use this checklist before adding or publishing a city in the destination data.
The goal is a useful, auditable guide built from current places, not a full page
filled with plausible-sounding filler.

## 1. Set up the city

- Confirm the exact city and country label before researching anything.
- Check for same-name cities in other countries and keep the country in every
  research note and source query.
- Review the existing entry in `cityGuideDetailData` so you know which fields
  already contain usable names.
- Start a source ledger entry in `data/city-source-ledger.js` for every place
  that may appear on the published page.

## 2. Start with the official tourism board

- Find the city's official tourism board or visitor bureau.
- Use it to understand the city's main districts, attractions, museums, parks,
  food areas, and practical visitor patterns.
- Treat a tourism-board list as a research lead, not as the only proof that a
  business is currently operating.
- Keep the tourism-board URL in the ledger when it supports the place or gives
  useful city context.

## 3. Verify every named place

For each attraction, restaurant, cafe, bar, bakery, museum, park, or other
business:

- Open the business's own current website where one exists.
- Open the directions, contact, or location page whenever the address matters.
  Confirm the exact branch and full current address, not just a name match on
  the homepage. Read relocation notices and compare booking and map-link
  locations. Record the exact page checked, not only the website domain.
  House of Small Wonder's directions page, for example, identifies the open
  Auguststrasse branch and warns that ride-app name searches can lead to its
  closed Johannisstrasse location. A real business can have a stale address.
- Confirm that the business appears open or actively operating. If the site
  reports a temporary or permanent closure, do not publish the name.
- Record the exact name, source URL, source type, and verification date.
- Use a second source where possible, such as the official tourism board,
  municipal site, venue operator, or a reputable local organization.
- Prefer current official sources over an old article, a listicle, or a search
  snippet.
- If the name is ambiguous, resolve it against the city's official address or
  location before adding it.

The ledger entry should contain the same basic facts for every place:

```js
"Real place name": {
  url: "https://example.com/current-location-page",
  sourceType: "business's own site",
  checkedOn: "YYYY-MM-DD",
  locationSourceUrl: "https://example.com/directions-page-actually-read",
  sourcedFor: "bestLunch",
  secondSourceUrl: "https://official-tourism-site.example/places",
  operatingEvidence: "What the current official page shows about location and service."
}
```

`secondSourceUrl` is encouraged when available. Do not add a source URL that
was not actually checked.
`locationSourceUrl` records the exact directions/contact/branch page read. It
may equal `url` when that page also provides operating evidence. `sourcedFor`
records the original research category, not all eventual category placements.
Do not infer original sourcing intent retrospectively for older records.

At city level, use `status: "source-checked"` only after checking every listed
detail recommendation. Include `reviewScope: "cityGuideDetailData"`, the review
date, `verificationMethod: "official-web-review"`, and limitations. A currently
accessible page with hours or bookings is operating evidence, not a guarantee
that a business will be open on the traveler's date. Say when confirmation is
limited to a tourism-board listing. Two pages from one operator are not two
independent sources. Keep unresolved candidates out of the published lists.

The publication tests check ledger coverage for source-checked cities. They do
not verify the websites themselves. See `docs/city-verification-status.md` for
the distinction between a research lead, an earlier review, and a current pass.

## 4. Fill the fields carefully

- Add a place only when it is a real, named, city-specific option.
- Keep the 15 existing fields. A place can be useful in more than one planning
  context, but do not pad every list with duplicates.
- Match each place to the field where it genuinely helps: attractions,
  restaurants, budget, couples, kids, solo, first timers, unique, luxury,
  breakfast, lunch, dinner, cocktails, bakeries, or coffee.
- Leave a field empty when it cannot be sourced accurately.
- Never replace a missing place with wording such as "a local cafe", "a nearby
  market", or "a signature dinner".
- Never copy a competitor's list wholesale. Use sources to verify names, then
  write original, practical guidance.

## 5. Review before publication

- Check every current name against its ledger entry.
- Check every ledger URL opens and still refers to the same place.
- Search for duplicate names, wrong-country matches, and outdated closures.
- Run the placeholder audit and confirm generic phrases have not been added.
- Keep `--min-words=350` for destinations and the 250-word country gate.
- The operating publication minimum is `--min-named=5`, with named entries in
  at least three detail categories. Do not raise it on a schedule. Revisit only
  after sourcing materially changes the distribution, report the resulting page
  counts first, and wait for the user's approval before changing any gate.
- The named-entry count is a classifier result, not proof of source verification.
  An entry repeated in different categories counts in each category. Verify
  distinct places in the source ledger and do not add duplicates to meet a gate.
- Activity descriptors can remain useful text. They do not count as names, but
  they are not automatically placeholders. The former per-item placeholder
  ratio is no longer the publication rule.
- Confirm the city page has one clear country, one canonical route, and no
  route collision with another city.

## 6. Regenerate and verify

Run from the real git checkout, not an extracted archive:

```text
node scripts/create-fallback-images.mjs
node scripts/generate-pages.mjs --base=/fun-app --origin=https://hamiltondan20-sys.github.io --out=. --min-words=350
node scripts/check-release.js
```

An optional impact preview does not authorize a threshold change:

```text
node scripts/generate-pages.mjs --base=/fun-app --origin=https://hamiltondan20-sys.github.io --out=. --min-words=350 --min-named=8 --dry-run --audit-json
node --test scripts/publication-gates.test.mjs
```

Use `docs/content-repair-queue.md` to prioritize the current 5-9 band. Rebuild
the queue from this audit when content changes so its counts match the generator.

Before committing, inspect the generated city page and verify that:

- every published place is named and useful;
- source-backed names are linked to the correct city context;
- no placeholder or invented business remains;
- the sitemap and generated output are current.

Then commit the source data and generated output together so CI can reproduce
the same build.
