# Wikipedia and Wikivoyage Comparison

Period: 202510 through 202609 (YYYYMM). Wikipedia pulled 2026-10-06T02:19:14.891Z; Wikivoyage pulled 2026-10-06T02:24:03.127Z.

Both are Wikimedia REST API English-project, all-access, user pageviews.
They are readership figures, not search volume, unique visitors or proven booking intent.
Where the sources disagree, Wikivoyage is the better guide to travel-guide demand
because its articles are written for travellers rather than general encyclopedic interest.
Reader intent is still not observed individually. Search Console impressions
should supersede both in 2-3 weeks. No claim is made that all Prague or Kyoto
Wikipedia readers are prospective visitors.

Rank difference = Wikivoyage rank minus Wikipedia rank; negative means higher
on Wikivoyage. Flag absolute differences greater than five.

| City | Wikipedia views | Wikipedia rank | Wikivoyage views | Wikivoyage rank | Difference | Flag >5 |
| --- | --- | --- | --- | --- | --- | --- |
| Singapore | 4089068 | 1 | 99245 | 1 | 0 |  |
| Hong Kong | 3000316 | 2 | 82854 | 2 | 0 |  |
| Berlin | 1672816 | 3 | 72191 | 3 | 0 |  |
| Venice | 1039850 | 9 | 62100 | 4 | -5 |  |
| Montreal | 1179063 | 6 | 56849 | 5 | -1 |  |
| Prague | 1219794 | 4 | 55995 | 6 | 2 |  |
| Vienna | 1165442 | 7 | 55033 | 7 | 0 |  |
| Munich | 879247 | 11 | 49215 | 8 | -3 |  |
| Hanoi | 536601 | 17 | 43185 | 9 | -8 | Inspect |
| Vancouver | 1212881 | 5 | 42642 | 10 | 5 |  |
| Rio de Janeiro | 963843 | 10 | 41310 | 11 | 1 |  |
| Melbourne | 1124536 | 8 | 40862 | 12 | 4 |  |
| Cape Town | 795316 | 12 | 35895 | 13 | 1 |  |
| Cairo | 716371 | 13 | 31391 | 14 | 1 |  |
| Nice | 503194 | 18 | 28715 | 15 | -3 |  |
| Kyoto | 627474 | 16 | 26502 | 16 | 0 |  |
| Reykjavik | 667739 | 14 | 23053 | 17 | 3 |  |
| Banff | 309638 | 19 | 19718 | 18 | -1 |  |
| Queenstown | 174539 | 20 | 14390 | 19 | -1 |  |
| Honolulu | 637614 | 15 | 11452 | 20 | 5 |  |

## Recommended order, pending approval

Use Wikivoyage readership order for these candidates, subject to sourcing effort
and article coverage limitations. The existing sourcing queue is NOT rewritten.

1. Singapore
2. Hong Kong
3. Berlin
4. Venice
5. Montreal
6. Prague
7. Vienna
8. Munich
9. Hanoi
10. Vancouver
11. Rio de Janeiro
12. Melbourne
13. Cape Town
14. Cairo
15. Nice
16. Kyoto
17. Reykjavik
18. Banff
19. Queenstown
20. Honolulu

Readership covers canonical top-level articles only, not all district pages
or redirect aliases. Differences may reflect wiki coverage and readership, not
just geopolitical interest. Absent data is not estimated or substituted.

## Re-run

`node scripts/pull-city-pageviews.mjs --project=en.wikivoyage --end-month=2026-09 --compare=docs/city-demand-wikipedia-2026-10-06.json`

CSV: [Wikivoyage](city-demand-wikivoyage-2026-10-06.csv).
Identity and monthly evidence: [JSON](city-demand-wikivoyage-2026-10-06.json).
