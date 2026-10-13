# Pilot acceptance: Berlin, October 12, 2026

First run of the test matrix in `docs/pilot-milestone.md`, for Berlin only. The other
four pilot cities are not ready to test yet.

## How it was run

- The real planner (`plan/`), served locally, with test data only. Browser storage was
  cleared before and after.
- Each run filled in the Build and Preferences steps, pressed **Build My Trip**, then
  read the rendered trip and the planner's trip state.
- Start days:
  - **Monday**, 9 to 15 November 2026 (many museums close on Mondays)
  - **Wednesday**, 11 to 17 November 2026
- Scenarios:
  1. **First visit**: default preferences. Must-haves: "One memorable dinner, a slower final day."
  2. **Easygoing**: pace set to Easygoing, otherwise the defaults.
  3. **Budget**: budget set to Budget, otherwise the defaults.
  4. **Must-haves**: "The Berlin Wall Memorial, a food market, and the Brandenburg Gate."
- The data-only checks are also automated in `scripts/itinerary-logic.test.mjs` (59 tests
  pass), including every start weekday from Monday to Sunday.

## Results

P = pass. "Stated" = passes because the limitation is shown to the traveler, not hidden.

| Run | 1 Places | 2 Coverage | 3 Geography | 4 Travel | 5 Timing | 6 Preferences | 7 Repetition | 8 Portable | 9 Phones |
|---|---|---|---|---|---|---|---|---|---|
| First visit / Mon | P | P | P | P | P | P | P | P | Partial |
| First visit / Wed | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Mon | P | P | P | P | P | Stated | P | P | Partial |
| Easygoing / Wed | P | P | P | P | P | Stated | P | P | Partial |
| Budget / Mon | P | P | P | P | P | Stated | P | P | Partial |
| Budget / Wed | P | P | P | P | P | Stated | P | P | Partial |
| Must-haves / Mon | P | P | P | P | P | P | P | P | Partial |
| Must-haves / Wed | P | P | P | P | P | P | P | P | Partial |

What each column rests on (identical across all eight runs unless noted):

1. **Places.** Every named stop is one of 19 registry places: the 16 guide places plus 3
   lunches added in this round. Each has a checked location, published weekly hours and a
   dated official source. Free time is labelled free time (11 blocks).
2. **Coverage.**
   - 5 researched days, 1 open day ("Open day near Scheunenviertel") and a closing morning.
   - The open day is labelled as open and does not repeat a researched day.
   - Day 2's lunch is honest free time (see open items).
3. **Geography.** Every day's area comes from its stops (no unconfirmed areas).
4. **Travel.** Per trip, 13 hops between stops:
   - 5 timetable journeys (VBB, dated, with conditions)
   - 7 walking estimates labelled as estimates
   - 1 "same site" (the Technikmuseum restaurant)
   - No hop of 1.5 km or more lacks a timetable journey.
5. **Timing.**
   - No stop falls on a day its place is closed, for any start weekday.
   - Each stop shows its hours for that date, plus "Unlisted holiday closures are not
     checked".
   - Reservations are stated for both booked dinners.
6. **Preferences.**
   - First visit: the dinner goes to Day 4 (Tim Raue) and the slower final day to Day 7.
   - Must-haves:
     - The Wall Memorial goes to Day 2.
     - The food market goes to Day 4 (Markthalle Neun).
     - The Brandenburg Gate is listed as "Not scheduled yet", with a prompt to add it or drop it.
   - Easygoing and Budget: the plan is identical to the default. The planner now says so
     ("Pace and budget do not change them yet"). It no longer claims a budget or pace lens,
     and no longer titles the trip "Budget-Friendly" while it includes two tasting-menu
     dinners.
7. **Repetition.** No duplicate stops or day titles.
8. **Portability.**
   - A Monday-start trip (reordered days, must-haves, lunch places) survives a page reload
     unchanged.
   - It also survives a v2 export → read → restore round trip unchanged.
   - Dates carry `Europe/Berlin`.
   - The share copy contains no private fields.
9. **Phones.**
   - At 375 px wide, the trip page has no horizontal page scroll and no clipped content.
   - **Not yet done:** inspect, edit, save and export on a real phone. That needs the owner.

## Fixed during this run

| Finding | Fix |
|---|---|
| Every new trip started with "the Eiffel Tower" as a must-have, whatever the destination. A Berlin trip then reported it as not scheduled. | The default is now "One memorable dinner, a slower final day." (`scripts/app-bootstrap.js`, `plan/index.html`) |
| A first draft of that default ("…dinner and a slower final day") was read as one must-have, because must-haves split on commas only. | Kept the default comma-separated (see open items) |
| A Monday start put Neues Museum (closed Mondays) on Day 1. It was flagged, not fixed. | `orderDaysForOpeningHours` swaps days so no stop lands on a closed day. On a Monday start no researched Berlin day fits, so the open day takes Monday and Museum Island moves to Saturday. The closing day never moves. |
| "Food market" was reported as not scheduled, although Day 4 has lunch at Markthalle Neun. | A template step can list the must-haves it `covers` (Markthalle Neun: food market, market hall) |
| The planner claimed it "adjusts" the plan to pace and budget and titled Budget trips "Budget-Friendly". Neither is true for researched days. | Honest copy for researched days; the budget and luxury lenses are off for them |
| Lunch: four "your choice" blocks | Three now name a place checked against the operator's own page: Lebenswelten Bistro (Humboldt Forum), Luisenbräu (Luisenplatz) and Restaurant Anhalt (inside the Technikmuseum) |

## Open items

1. **Pace and budget for researched days.** This needs an owner decision. Today they are
   stated as not applying. Options:
   - Easygoing drops each day's third main stop or evening booking.
   - Budget swaps the two tasting-menu dinners for checked casual dinners, which needs new
     place research.
2. **"Try alternate" on a researched day** replaces the day's headline and description with
   generic text ("Nearby alternative: a different version of the same kind of stop…").
   The timeline keeps the same places, so the summary no longer describes them. For
   researched days, "Make lighter" and "Try alternate" should either act on real places
   or be hidden.
3. **Day 2 lunch** stays free time. Neither candidate near Bernauer Strasse had dated
   evidence of current operation:
   - Café Bar Central: undated site, © 2017.
   - Cafe Ribo: kitchen hours only, and its menu page is broken.
4. **Must-have parsing** splits on commas only, so "the zoo and a food market" is read as
   one item. Splitting on "and" would also break names like "fish and chips"; this needs
   a careful rule.
5. **Hours are researched through 31 December 2026.** Later trips show hours as unknown,
   honestly, until the research is refreshed.
6. **Real-phone check** (criterion 9) by the owner.
