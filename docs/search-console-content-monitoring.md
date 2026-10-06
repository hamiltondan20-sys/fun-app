# Search Console: Indexation Now, Demand Later

## Check today

1. Select the verified fun-app URL-prefix property in Search Console.
2. Open Sitemaps and select the submitted sitemap.xml. Confirm it was read and
   its discovered URL count matches the 217 currently submitted URLs.
3. Open Indexing > Pages. Select the sitemap filter for that submitted sitemap,
   rather than all known pages, and record indexed count out of 217.
4. In Why pages aren't indexed, record whether Crawled - currently not indexed
   and Discovered - currently not indexed appear, their counts and example URLs.
   Record report update date. The actual counts require the owner's account;
   they have not been observed by this script or inferred from live HTTP status.
5. Investigate current submitted URLs returning unexpected errors. Deliberately
   retired pages can remain 404; do not restore them merely to clear a report.

Both statuses are observable now. They identify indexing/crawl issues, not
definitive proof of poor quality. Check inspected URLs' canonical choice,
last crawl and indexing state before drawing a conclusion.

## Demand export in 2-3 weeks

1. Open Performance > Search results. Set search type Web.
2. Set Date to Last 28 days. Remove other query/country/device filters unless
   they are intentionally part of the comparison, and record them if retained.
3. Add Page filter: URLs containing /destinations/.
4. Enable Total impressions and Total clicks. Select the Pages tab.
5. Export CSV or Google Sheets. Use the Pages table with URL, impressions and
   clicks. Save export date and exact period; recent data can be preliminary.
6. Rank published destination URLs by impressions descending. Keep clicks
   alongside them, not as a replacement for exposure. Do not treat Wikipedia
   readership as Google search volume or mix it into the impression total.

## Find zero-impression published pages

Take the currently committed sitemap.xml and retain /destinations/{slug}/
detail URLs, excluding the /destinations/ index. Left-join them to exported
Pages rows on the full canonical URL, normalising only trailing-slash format.
Pages missing from the export have no reported impressions for that period;
mark them zero reported, not a verified exact absence of all search exposure.
Check export row limits before using an absent row as a zero. The UI exports
only top rows, although 189 detail pages are presently below the usual limit.

Review missing/zero rows against Page indexing and URL Inspection. They are
triage candidates, not automatically pages to remove: indexing age, seasonality,
low demand, canonical aggregation and competition can all affect impressions.
Do not change gates, unpublish pages or rewrite titles from this export alone.

## References

- https://support.google.com/webmasters/answer/7576553
- https://support.google.com/webmasters/answer/7440203
