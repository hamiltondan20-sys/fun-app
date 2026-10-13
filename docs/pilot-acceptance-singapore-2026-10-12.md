# Pilot acceptance: Singapore, October 12, 2026

Second pilot city, run the same way as Berlin (`docs/pilot-acceptance-2026-10-12.md`).

## What changed before testing

- **Old days replaced.** Singapore's three earlier written days used places that were
  never source-reviewed:
  - Lau Pa Sat
  - Satay by the Bay
  - Maxwell Food Centre
  - Boat Quay
  - Flower Dome, which the October 6 review had *excluded* because it was closed for
    maintenance

  They are replaced by four researched days built only from the reviewed places
  (`data/city-source-ledger.js`), plus a closing morning.
- **Places.** 12 of the 13 reviewed places are now registry places, with OpenStreetMap
  coordinates looked up on 2026-10-12. Jacob Ballas Children's Garden is left out because
  it suits families with young children only. Two places have visitor entrances for
  distances:
  - Botanic Gardens: Tanglin Gate
  - Singapore Zoo: the main entrance
- **Hours.** Every place has official hours (`data/place-hours.json`), read from the
  operator's own page on 2026-10-12:
  - ArtScience Museum: read directly after an automated fetch timed out.
  - ATLAS: spot-checked. It publishes two conflicting sets of hours, and Sunday is closed
    in both. The current-looking set gives no regular Wednesday hours, and the page lists
    a dated closure on 14 October.
- **Travel.** Stored journeys from the Transitous journey planner (LTA timetable data;
  OpenStreetMap for walking):
  - every hop of 1.5 km or more
  - the walks around Marina Bay, where the street route (26 min) is much longer than the
    straight line suggests (16 min)
- **Days:**
  1. National Gallery, lunch at National Kitchen (same building), ArtScience Museum, then
     Gardens by the Bay at dusk.
  2. Botanic Gardens from Tanglin Gate, lunch at Candlenut, a free afternoon, then drinks
     at ATLAS.
  3. Singapore Zoo in the morning; the rest of the day is free. Public buses back into
     town take 78–108 minutes, so nothing else is scheduled.
  4. Plain Vanilla brunch and a Tiong Bahru walk, a free afternoon, dinner at JUMBO
     (Riverside Point), then Jigger & Pony.

  Then an open day, a flexible day, and a closing breakfast at Tiong Bahru Bakery.
- **Easygoing.**
  - Day 1 drops the ArtScience Museum; lunch to the Gardens becomes a stored 28-minute
    MRT journey.
  - Day 4 drops the late drink.

## Fixes this run needed (they apply to every city)

| Finding | Fix |
|---|---|
| Hours that run past midnight (Gardens by the Bay 05:00–02:00) would have flagged every visit as outside hours. | `checkStopHours` treats a closing time at or before the opening time as the next morning |
| Generic padding inserted "Coffee or reset" at 11:15, in the middle of a Gallery visit written as "allow at least two hours". Berlin had the same issue: an "Afternoon follow-through" was inserted on two of its days. | Days built from registry places are never padded |
| Stored journeys could only carry one data source (VBB) for all cities. | Each journey can name its own source; routed walks read "About N min walk… (street route checked …)" |

## Results

Start days: **Monday** 9 to 15 November 2026 and **Sunday** 15 to 21 November 2026.
ATLAS is closed on Sundays. The automated tests also cover every start date from 12 to
25 October, including ATLAS's dated closure on 14 October.

| Run | 1 Places | 2 Coverage | 3 Geography | 4 Travel | 5 Timing | 6 Preferences | 7 Repetition | 8 Portable | 9 Phones |
|---|---|---|---|---|---|---|---|---|---|
| First visit / Mon | P | P | P | P | P | P | P | P | Partial |
| First visit / Sun | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Mon | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Sun | P | P | P | P | P | P | P | P | Partial |
| Budget / Mon | P | P | P | P | P | Stated | P | P | Partial |
| Budget / Sun | P | P | P | P | P | Stated | P | P | Partial |
| Must-haves / Mon | P | P | P | P | P | P | P | P | Partial |
| Must-haves / Sun | P | P | P | P | P | P | P | P | Partial |

1. **Places.** Every named stop is a checked registry place. Free time is labelled. No
   excluded or unreviewed place appears.
2. **Coverage.** 4 researched days, then an open day and a flexible day, both all free
   time, and a closing morning.
3. **Geography.** Every day's area comes from its stops.
4. **Travel.** Per trip:
   - 3 stored public-transport journeys
   - 3 stored street-routed walks
   - 1 same-site hop
   - No hop of 1.5 km or more is untimed.
5. **Timing.**
   - No stop falls on a closed day.
   - Hours for each stop's date are shown, with caveats: ATLAS's conflicting hours, the
     Gardens' Christmas ticketing, the Zoo's penguin exhibit closure.
   - Bookings are advised for National Kitchen, Candlenut and JUMBO.
6. **Preferences.**
   - The memorable dinner goes to Day 4 (JUMBO) and the slower final day to Day 7.
   - The must-haves case asked for "Gardens by the Bay, a hawker centre, and the Merlion".
     Gardens by the Bay goes to Day 1. **Hawker centre and Merlion are listed as not
     scheduled**, because neither is a reviewed place.
   - Budget is stated as not applying, as for Berlin.
7. **Repetition.** No duplicate stops or days.
8. **Portability.**
   - A Sunday-start trip survives a page reload and a v2 export → restore round trip
     unchanged.
   - Dates carry `Asia/Singapore`.
   - The share copy has no private fields.
9. **Phones.** No horizontal scroll at 375 px; the long walking lines wrap inside the
   card. A real-phone check is still needed.

## Open items

1. **No hawker centre.** None of the reviewed places is a hawker centre, and that is the
   most-requested Singapore food experience. Adding one (e.g. Maxwell or Lau Pa Sat) needs
   the same official-source review first.
2. **ATLAS hours conflict** on the bar's own page, and regular Wednesday hours aren't
   given. The planner says so; confirm with the bar.
3. **Budget** does not reshape researched days (same open decision as Berlin).
4. **Zoo travel.** Public buses only. Mandai's own shuttle from Khatib MRT is not in the
   timetable data, so the stop says "allow at least an hour each way" rather than giving a
   timed journey.
5. **Real-phone check** by the owner.
