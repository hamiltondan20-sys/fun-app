# Pilot milestone: a reliable seven-day plan

Status: definition drafted October 10, 2026 — **awaiting owner approval** before any
new itinerary content is written.

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
| Paris | 5 written days, guide source review pending | Source review; register every stop as a place; flexible days 6–7 |
| London | 5 written days, review pending | Same as Paris |
| Singapore | 3 written days, guide reviewed | Supported extensions (e.g. day trips) or clearly flexible days for 4–7 |
| Hong Kong | 3 written days, guide reviewed | Same as Singapore |
| Berlin | No written days, guide reviewed | First written itinerary, area set and map data |

Paris and London's five written days do not exempt them from source review.

## Order of work

1. Owner approves this definition.
2. Build: trip format v2 + trip collection + places registry (docs/trip-format-v2.md),
   including v1 backup upgrade.
3. Register and check the places used by the five pilots.
4. Write or extend pilot itineraries against the registry.
5. Print/PDF and calendar export.
6. Run the test matrix; fix; repeat until all 40 checks pass.
7. Shared snapshots, then accounts/sync, then the domain move.
