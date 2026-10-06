# Recommendation Reuse Review

Measured October 6, 2026 from the five `renderVerifiedOnly` ledger records.
Counts use exact recommendation labels, not classifier matches. Separately
named branches remain separate; this is not a semantic duplicate detector.
Run `node scripts/report-guide-reuse.mjs` from the checkout to reproduce.

| City | Distinct recommendations | Category placements | Mean appearances | Maximum |
| --- | ---: | ---: | ---: | ---: |
| Boston | 26 | 54 | 2.08 | 5 |
| Cusco | 18 | 52 | 2.89 | 5 |
| Dublin | 22 | 51 | 2.32 | 4 |
| Edinburgh | 25 | 52 | 2.08 | 4 |
| Singapore | 13 | 39 | 3.00 | 5 |

Singapore is the highest-average case, but Cusco is close. Reuse is not unique
to Singapore. Plain Vanilla appears five times, including Bakeries. The maxima
elsewhere are Contessa in Boston; Centro de Textiles Tradicionales del Cusco;
National Gallery of Ireland and The Winding Stair; and National Museum of
Scotland, Soderberg Pavilion and Timberyard in Edinburgh.

## Cap Comparison, Not An Implemented Rule

Simulate retaining the first appearances in the actual static cluster order:
attractions, first timers, unique, breakfast, lunch, dinner, restaurants, coffee,
bakeries, cocktails, couples, kids, solo, budget, luxury. Different editorial
placement choices can change which categories disappear. Slot losses do not
depend on order, but empty-category results do. No underlying data is deleted.

| City | Placements removed at cap 2 | Categories emptied at cap 2 | Placements removed at cap 3 | Categories emptied at cap 3 |
| --- | ---: | --- | ---: | --- |
| Boston | 10 | Couples; Worth the splurge | 3 | None |
| Cusco | 19 | Couples; On a budget; Worth the splurge | 8 | None |
| Dublin | 11 | Worth the splurge | 2 | None |
| Edinburgh | 9 | Worth the splurge | 3 | None |
| Singapore | 15 | Bakeries; Solo; On a budget; Worth the splurge | 5 | On a budget |

A cap of three is the less disruptive comparison candidate, not an approved
production rule. A mechanical first-appearance cap can suppress a useful
budget or dietary context in favour of an earlier, less helpful heading.
Editorial selection would need to choose the most useful contexts rather than
blindly preferring the first list. Neither cap was implemented.

## Consolidation Question

The question is whether 13-32 sourced recommendations can support 15 useful
category lists without making readers encounter the same names repeatedly.
It is not just whether breakfast or coffee lists have fewer than three entries.
Measure distinct places, total placements, mean and maximum reuse, empty lists,
and which headings add a genuinely different choice after Hanoi and the
Berlin/Vienna/Munich batch. Preserve those metrics in each batch report.

Compare caps with a future design that lists each place once and uses context
labels for breakfast, couples, budget or booking. That is a discussion option,
not a schema or layout change. Food consolidation remains on hold until the
three-city batch supplies more evidence. No publication thresholds changed.
