# Pilot milestone: a reliable seven-day plan

Status: definition approved by the owner October 10, 2026.

Pilot cities: Paris, London, Singapore, Hong Kong, Berlin.

The target is **seven honest, coherent days, not seven equally packed days.** The
planner must produce seven distinct, usable days without pretending seven fully
researched days exist.

## Acceptance criteria (every pilot city, every scenario)

| # | Criterion | Pass when |
|---|---|---|
| 1 | Specific places | Every scheduled attraction, restaurant or café resolves to a places-registry entry with a checked location and operating evidence (status, date, evidence). Free time is a `flexible` block, never a made-up venue. |
| 2 | Honest coverage | Researched days and flexible days are labelled differently. A flexible day offers a practical choice or open time; it never repeats an earlier day with new wording. |
| 3 | Coherent geography | Each day's area is derived from its stops. No unexplained cross-city journeys. Exact branches are checked. |
| 4 | Transparent travel | Transport mode is shown. Estimates and routed results are labelled. Unknown travel time is shown as unknown. |
| 5 | Feasible timing | Visits, meals, transfers and breaks fit. Unconfirmed opening hours, reservations or availability are stated. No date-specific feasibility claims without those checks. |
| 6 | Accurate preferences | Must-haves are scheduled once where appropriate; unscheduled ones are listed; conflicts are explained instead of claimed to fit. |
| 7 | No accidental repetition | No duplicate stops or repeated days. Intentional revisits are labelled. |
| 8 | Portable results | Dates, time zones, untimed stops and named versions survive save, reload, export and restore. Shared copies contain no private data. |
| 9 | Usable on phones | A user can inspect, edit, save and export the plan on a real phone without layout or accessibility blockers. |

## Test matrix

For each pilot city, run all four scenarios, each starting on at least two different
weekdays (one must be a Monday, when many museums close):

1. Seven-day first visit, default preferences
2. Slower pace (Easygoing)
3. Constrained budget (Budget)
4. A specific must-have request (e.g. a named landmark or meal)

5 cities × 4 scenarios × 2 start days = 40 checks. Record results in
`docs/pilot-acceptance-<date>.md` with pass/fail per criterion.

## Work per city before testing

| City | Today | Needed |
|---|---|---|
| Paris | **Oct 14:** source review approved and applied. 28 places were checked against their operators' own sites (`docs/content-research/paris-2026-10-14.md`) and 10 were not used, including the Centre Pompidou (closed for renovation). The guide now shows only the checked places. **Later on Oct 14:** 5 researched days, an open day and a closing morning were built from 18 of those places, with official hours and every hop timed by Transitous. Test matrix run: all 8 checks pass criteria 1–8; criterion 9 needs a real phone (`docs/pilot-acceptance-paris-2026-10-14.md`) | Notre-Dame check; a reviewed food market; budget decision; real-phone check |
| London | **Oct 14:** source review approved and applied (30 places checked against their operators' own sites; the British Museum and Hamleys were not verifiable, and Tayēr + Elementary is closed after a fire; `docs/content-research/london-2026-10-14.md`). 5 researched days, an open day and a closing morning were built from 22 of those places, with official hours and every hop timed. Test matrix run: all 8 checks pass criteria 1–8; criterion 9 needs a real phone (`docs/pilot-acceptance-london-2026-10-14.md`) | British Museum check; Tower of London date-by-date hours; budget decision; real-phone check |
| Singapore | **Oct 12:** the 3 old written days (unreviewed places, including the excluded Flower Dome) replaced by 4 researched days, 2 open days and a closing morning, using 12 reviewed places with official hours and stored Transitous journeys. Test matrix run: all 8 checks pass criteria 1–8; criterion 9 needs a real phone (`docs/pilot-acceptance-singapore-2026-10-12.md`) | A reviewed hawker centre; budget decision; real-phone check |
| Hong Kong | **Oct 14:** the 3 old written days (unreviewed places) replaced by 4 researched days, 2 open days and a closing morning: 8 guide places plus 7 newly reviewed ones, with official hours and stored Transitous journeys (including the Star Ferry). Test matrix run: all 8 checks pass criteria 1–8; criterion 9 needs a real phone (`docs/pilot-acceptance-hong-kong-2026-10-14.md`) | Cable-car ride time; Temple Street source; budget decision; real-phone check |
| Berlin | **Oct 10:** 16 places registered (data/places.js, from the Oct 6 source review + OpenStreetMap coordinates); 5 written days + closing morning, every named stop a registry place, other time labelled free time. Published hours for all 16 places researched from official sites (data/place-hours.json, with quotes; three spot-checked), including seasonal periods and dated holiday closures; the planner flags closed days and out-of-hours stops for the trip's real dates. **Oct 12:** 19 places (3 checked lunches); stored VBB journeys for every hop of 1.5 km or more, labelled walking estimates for the rest; days reordered around closed days. Test matrix run: all 8 checks pass criteria 1–8; criterion 9 needs a real phone (`docs/pilot-acceptance-2026-10-12.md`) | Easygoing frees the evening on the two three-stop days (Oct 12). Owner decision on budget for researched days; checked alternates for "Try alternate" (none spare: every reviewed Berlin place is already a stop, so this needs newly reviewed places); Day 2 lunch; real-phone check |

Paris and London's five written days do not exempt them from source review.

## Order of work

1. Owner approves this definition.
2. Build: trip format v2 + trip collection + places registry (docs/trip-format-v2.md),
   including v1 backup upgrade.
3. Register and check the places used by the five pilots.
4. Write or extend pilot itineraries against the registry.
5. Print/PDF and calendar export. **Done October 16** (see `docs/trip-format-v2.md`, "Print and calendar export").
6. Run the test matrix; fix; repeat until all 40 checks pass.
   - "Try alternate" on researched days (**October 16**): it no longer swaps in generic text. A researched day offers only a checked alternate, one approved place that replaces one stop, with its own summary, opening hours and timed travel. It is not offered when that place is closed on the date or the stop is a must-have the traveller named. Paris has four (Orangerie, Arc de Triomphe, Septime, Bar Hemingway) and London two (Science Museum, Connaught Bar). Other researched days say there is no checked alternative yet.
   - "Make lighter" and "Too full" on researched days (**October 16**): they no longer hide the day or delete its last stop. The stop chosen for Easygoing becomes free time on that day only, with matching summary text and recalculated travel, and "Put back" restores it. They never drop a stop that holds a must-have. Days without a lighter version say whether they already keep free time.
   - "Try alternate" on open days (**October 16**): an open day is all free time, so it now moves that free time to another area of the city guide that no other day centres on, in guide order, then back to where it started. Its heading, blocks and summary follow. "Wrong area" does the same, and "Make lighter" is hidden because the day is already free. When every other area already has a day, the day says so.
7. Shared snapshots (**done October 16**: share links, see `docs/trip-format-v2.md`), then accounts/sync (**built October 16** with Supabase, off until the owner sets up the project: `docs/account-sync.md`), then the domain move.
