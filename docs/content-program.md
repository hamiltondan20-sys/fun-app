# Guide Content Program

Started: 2026-10-03. The user approved continuing source checks across the site
and automatically committing and publishing completed, tested batches.

## Scope and Order

Work through the existing catalogue, not an unbounded list of every place on
Earth. The starting inventory is 484 canonical destination records, including
189 published guides, plus the country-guide catalogue with 19 published hubs.
Use the generated verification inventory for current counts, not this snapshot.

1. Finish the demand-led published-city queue in `city-sourcing-priorities.md`.
   Boston and Edinburgh are complete. Dublin's source review is complete;
   Singapore is next. Check the latest deployment checkpoint before moving on.
2. Reconcile Austin's earlier review with the current per-place evidence format.
3. Review remaining published destinations by demand, user usefulness and
   existing evidence gaps. Do not treat classifier matches as verification.
4. Improve country hubs and held-back destinations in small, source-supported
   batches. Give priority to hubs serving multiple reviewed destinations.
5. Check shared informational pages for unsupported factual promises. Business,
   account, legal or integration decisions still require the user's input.

The country-hub backlog is not source-verified merely because its linked cities
are reviewed. Record country-level claims and sources separately. Both Cordoba
destinations remain held back pending specific review and user approval.

## Bounded Automatic Runs

Automation: `verify-travel-guides-in-batches`, hourly in this task. Each run
handles at most one city or one country hub, with no overlapping work. It may
take multiple runs to finish the research. Read existing notes before repeating
any work. If current applicable usage is at least 95%, checkpoint and wait for
the natural reset. Do not buy credits or redeem usage-reset credits.

Local scheduled work requires the computer on, the app running and the project
available. The schedule is not a guarantee of restarting at the exact reset time.
Permissions or account limits can block a run; report these rather than trying
another route around them.

Save interrupted research under `docs/content-research/`, including checked
URLs, dates, supported facts, exclusions, unresolved questions and next actions.
Notes are not published recommendations. Do not mark a review complete simply
because the page passes a classifier.

## Quality and Publication

Follow `city-sourcing-checklist.md` and the Boston/Cusco evidence records.
Open the tourism board first, then the operator's own current pages. Verify the
city, country and branch. Record operating or public-visitor evidence and any
limitations. Use independent corroboration where available. Never invent names,
claim a site was checked when it was not, or pad fields with generic phrases.
Keep all 15 detail fields and preserve useful activity suggestions.

All publication gates stay unchanged: minimum five named entries across three
categories, destination minimum 350 words, country minimum 250 words and the
current placeholder controls. No scheduled ratchet. A threshold change requires
a page-count impact report and explicit user approval.

Before each publication:

- Refresh the verification inventory and progress records.
- Run image generation, page generation, release checks and publication tests.
- Audit internal links, JSON-LD and equal sitemap URL/lastmod counts.
- Inspect the selected guide on mobile and desktop.
- Stop for failed tests, unexpected page-count decreases or unrelated output.
- Commit only relevant files, regenerate git-derived sitemap dates, commit that
  synchronization if needed, and confirm CI's generated-file check is clean.
- Push to `origin main`, check Actions and verify the public page before saying
  the update is live.

Preserve `code.html`, `plan/index.html`, `404.html`, the intentional brand/title
split, unrelated user changes and untracked handoff archives. Do not change
integrations, domains or the live root robots file, and do not resubmit the
sitemap. Stop the automation once all catalogue records are reviewed or have
specific documented evidence blockers; do not keep rewriting completed guides.

## Current Checkpoint

- Boston: completed and deployed 2026-10-02, 26 distinct source-recorded places.
- Cusco: completed and deployed, 18 distinct source-recorded places.
- Austin: earlier source review retained; evidence-format reconciliation pending.
- Edinburgh: completed and deployed 2026-10-03, 25 distinct recommendations.
  Local build, regression, link and mobile/desktop checks passed. Commit
  `26aa810` deployed successfully in Actions run `37155997591`; the public page
  returned HTTP 200 with the October 3 review note and corrected venue links.
- Dublin: source review completed 2026-10-04, 22 distinct recommendations across
  all 15 fields. Resumed after the natural usage reset; no credits purchased or
  reset credits redeemed. Full build, six regression tests, internal links,
  JSON-LD and mobile/desktop checks passed. See `content-research/dublin.md`.
  Before starting Singapore, confirm the latest `main` deployment and Dublin's
  public October 4 review note. If publication was interrupted, finish it first.
- Remaining work order and current coverage: see `city-sourcing-priorities.md`
  and `city-verification-inventory.md`.
