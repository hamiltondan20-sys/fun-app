# City Guide Sourcing Checklist

Use this checklist before adding or publishing a city in `data/city-guides.js`.
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
- Confirm the place name, city, and a current location or contact page.
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
  sourceUrl: "https://example.com/current-location-page",
  sourceType: "business's own site",
  checkedOn: "YYYY-MM-DD",
  secondSourceUrl: "https://official-tourism-site.example/places"
}
```

`secondSourceUrl` is encouraged when available. Do not add a source URL that
was not actually checked.

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
- Keep the destination at the existing `--min-words=350` and
  `--max-placeholder` gates. Do not lower them to force publication.
- Confirm the city page has one clear country, one canonical route, and no
  route collision with another city.

## 6. Regenerate and verify

Run from the real git checkout, not an extracted archive:

```text
node scripts/create-fallback-images.mjs
node scripts/generate-pages.mjs --base=/fun-app --origin=https://hamiltondan20-sys.github.io --out=. --min-words=350
node scripts/check-release.js
```

Before committing, inspect the generated city page and verify that:

- every published place is named and useful;
- source-backed names are linked to the correct city context;
- no placeholder or invented business remains;
- the sitemap and generated output are current.

Then commit the source data and generated output together so CI can reproduce
the same build.
