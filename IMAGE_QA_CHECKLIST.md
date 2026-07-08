# Image QA Checklist

Use this before shipping new destination, city-guide, country-guide, compare-card, or trip-surface imagery.

1. Every new hero image should match the real place, not just the country or a generic travel mood.
2. Every editorial city gallery should use 3 distinct images, not one repeated image across all cards.
3. Every country-guide hero should use a direct image source, not a fallback SVG or generated placeholder.
4. Every destination preview in `data/destinations.js` should resolve to a real image URL or a deliberate local asset.
5. No `download?force` image links should remain in shared guide or destination data.
6. No `loremflickr` placeholders should remain in production-facing surfaces.
7. Compare cards should inherit the same cleaned hero image pipeline as the main guide cards.
8. Build, City Guides, Country Guides, and Your Trip should each be checked once on `localhost`, not only on `file://`.
9. On mobile, confirm the fixed footer does not cover imagery or cut off CTA text on guide surfaces.
10. On the final pass, run:

```bash
rg -n '\\.svg|download\\?force|loremflickr' data/destinations.js data/country-guides.js
```

If the command returns anything unexpected, clean it before shipping.
