# Single-Intent Heading Proposal and FAQ Backlog

October 6, 2026. Read-only site audit; rendering changes await explicit approval.

## Evidence Correction to Retain

Consolidation is a display choice, not a demonstrated sourcing requirement.
Original category-placement averages were Berlin 1.94, Vienna 1.87 and Munich
1.93, compared with Singapore 3.00 and Cusco 2.89. The German-language guides
had fewer distinct recommendations than Boston. These observations do not prove
that 15 categories inevitably require heavy reuse. All 15 data fields remain.

## Affected Reviewed Guides

| Guide | Current section entries | Present intent | Missing intent |
| --- | --- | --- | --- |
| Hanoi | Le Beaulieu | Splurge | Budget |
| Vienna | Vienna State Opera | Splurge | Budget |

Boston, Cusco, Dublin, Edinburgh, Singapore, Berlin and Munich contain both
Budget and Splurge entries. No reviewed guide currently has Budget only.
This audit concerns labels and evidence-backed category membership, not measured
prices or a claim that the State Opera is necessarily Vienna's costliest outing.

## Proposed Fix, Not Implemented

Recommended: derive the section heading from the intents present after evidence
filtering. Both intents: Budget and special occasions. Budget only: On a budget.
Splurge only: Special occasions. Neither: omit the section, as today.

Keep the existing budget-splurge anchor stable. Derive the jump-navigation label
and ItemList name from the same final heading, so navigation, visible heading
and schema cannot diverge. Do not remove entries, alter context labels, split
source fields or change any publication gate.

Expected affected generated guides: Hanoi and Vienna only. Expected section
counts stay Hanoi eight and Vienna seven, with 71 ItemLists across all nine
reviewed guides. Confirm through dry-run and exact changed-file inspection after
approval; these expectations are not substituted for validation.

Alternative: separate Budget and Special occasions sections. This makes the
intents clearer but affects all nine reviewed guides; the seven mixed-intent
guides would gain a section. It is broader than necessary for the reported bug.

After approval, test both/one/neither intent and retained data; run the full
generation/release chain, compare section/ItemList names, entries and counts,
audit internal links and sitemap dates, and verify all 180 unreviewed guides
remain unchanged before publication. No regeneration or deployment in this pass.

## FAQ Backlog, Do Not Fill Automatically

All nine guides below have no cityPlanningToolkitData record in the loaded data.
The generator therefore renders no planning FAQ block and emits no FAQPage.
This is absent authored Q&A content, not a broken JSON-LD serializer or content
removed by the non-answer filter. When reviewing each city, source useful answers
first, then let the existing generator render and mark up those visible answers.

| Guide | Route | Reason |
| --- | --- | --- |
| Athens | /destinations/athens/ | No toolkit record |
| Istanbul | /destinations/istanbul/ | No toolkit record |
| Los Angeles | /destinations/los-angeles/ | No toolkit record |
| Madrid | /destinations/madrid/ | No toolkit record |
| Miami | /destinations/miami/ | No toolkit record |
| Orlando | /destinations/orlando/ | No toolkit record |
| Porto | /destinations/porto/ | No toolkit record |
| Seoul | /destinations/seoul/ | No toolkit record |
| Toronto | /destinations/toronto/ | No toolkit record |

Do not promise FAQ rich results. Google's May 8, 2026 changelog says the feature
stopped appearing in Search on May 7; its June 15 entry records removal of the
documentation: https://developers.google.com/search/updates
The older government/health-site restriction is historical, not the current
eligibility rule. Useful visible Q&A may still help readers; missing FAQPage
markup is not a currently available Google FAQ rich-result opportunity.

## Sourcing Continuation

After the heading fix is approved and verified, Hong Kong is the next unreviewed
city in the approved Wikivoyage-led queue. Singapore, Hanoi, Berlin, Vienna and
Munich are complete. Subsequent unreviewed queue entries begin Venice, Montreal
and Prague. Do not silently re-rank the queue or start another batch in the
approval-waiting pass. Record source-for intent, branch/location page, exact URLs,
date and operating evidence; report the agreed counts and reuse per batch.
