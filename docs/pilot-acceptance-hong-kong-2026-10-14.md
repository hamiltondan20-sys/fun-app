# Pilot acceptance: Hong Kong, October 14, 2026

Third pilot city, run the same way as Berlin and Singapore.

## What changed before testing

- **Old days replaced.** Hong Kong's three earlier written days used places that were
  never source-reviewed (Mott 32, Victoria Peak, Mak's Noodle, Aqua, Yat Lok, Temple
  Street). They are replaced by four researched days and a closing morning.
- **Extra places reviewed.** The October 6 guide review has only 8 places. That fills
  about two days, so seven more were reviewed on 2026-10-14 to the same standard: the
  operator's own page gives the exact location and evidence of current operation, and
  the hours were checked. They are stored in `data/itinerary-place-sources.json`:
  - Man Mo Temple (Tung Wah Group of Hospitals)
  - Tai Kwun
  - The Peak Tram
  - Maxim's Palace (City Hall)
  - Hong Kong Palace Museum
  - Ngong Ping 360
  - Tian Tan Buddha (Po Lin Monastery)
- **Hours.** All 15 places have official hours. The Four Seasons (Lung King Heen, ARGO),
  the Peak Tram and Man Mo Temple refused automated fetches, so they were read in a
  browser. Not every candidate made it:

  | Candidate | Outcome |
  |---|---|
  | Temple Street Night Market | Not used: the Tourism Board page no longer exists, and no operator publishes hours |
  | Po Lin Monastery | Medium confidence: its site's footer says 2023 |
  | Maxim's Palace | Medium confidence |
  | PMQ | Medium confidence |
  | Bakehouse | Medium confidence: Friday hours conflict between its pages |
  | ARGO | No Sunday hours published |

- **Travel.** Stored Transitous journeys (MTR, bus and Star Ferry timetables;
  OpenStreetMap for walking).
  - Central's walks are street-routed because of the hills.
  - The harbour crossing to dinner is a stored Star Ferry journey (23 min), never a
    walking estimate over water.
  - **The Ngong Ping 360 cable-car ride is left untimed.** It isn't in the timetable data,
    and the operator shows the ride time only in an animation that doesn't render as
    text. The stop says to take the cable car, with Bus 23 (about 52 min) as the
    fallback. The day's note gives the MTR time to Tung Chung, taken from Ngong Ping
    360's page.
- **Days:**
  1. Man Mo Temple, Tai Kwun, lunch at Duddell's, then PMQ.
  2. The Peak Tram, dim sum at Maxim's Palace, a free afternoon, then ARGO.
  3. Ngong Ping 360 and the Tian Tan Buddha; the rest of the day is free.
  4. noc, M+, the Hong Kong Palace Museum, the Star Ferry at dusk, then dinner at Lung
     King Heen.

  Then an open day, a flexible day in Tsim Sha Tsui, and a closing breakfast at
  Bakehouse in Wan Chai.
- **Easygoing.** Day 1 drops PMQ and Day 4 drops the Palace Museum.

## Fixes this run needed

| Finding | Fix |
|---|---|
| The live planner ignored the area lists written for researched cities: `data/top-100-destinations.js` replaced them with seed areas. Hong Kong's flexible day became "Flexible day in Causeway Bay", a district the plan never visits. **Singapore was affected on the live site too**: its open and flexible days were named from the seed list. The tests didn't catch it because they read `data/trip-content.js` directly. | Cities with registry places keep their own area list |
| The Lantau day's note said "plan public transport or a taxi" for the 5.2 km to the Big Buddha, but the way up is the cable car. | A researched day can carry its own `orderNote`. It survives save, reload and restore. |
| `slug()` turned "M+" into "m" and "Duddell's" into "duddell-s". | Apostrophes drop and "+" reads as "plus" (`m-plus`, `duddells-central`) |

## Results

Start days:
- **Monday** 9 to 15 November 2026.
- **Saturday** 31 October to 6 November 2026. This start hits M+'s dated closure on
  31 October, its Monday closure on 2 November (which it lifts for that date), and the
  Palace Museum's Tuesday closure.

The automated tests cover every start date from 14 October to 3 November.

| Run | 1 Places | 2 Coverage | 3 Geography | 4 Travel | 5 Timing | 6 Preferences | 7 Repetition | 8 Portable | 9 Phones |
|---|---|---|---|---|---|---|---|---|---|
| First visit / Mon | P | P | P | P | P | P | P | P | Partial |
| First visit / Sat | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Mon | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Sat | P | P | P | P | P | P | P | P | Partial |
| Budget / Mon | P | P | P | P | P | Stated | P | P | Partial |
| Budget / Sat | P | P | P | P | P | Stated | P | P | Partial |
| Must-haves / Mon | P | P | P | P | P | P | P | P | Partial |
| Must-haves / Sat | P | P | P | P | P | P | P | P | Partial |

1. **Places.** Every named stop is a checked registry place, and free time is labelled.
   None of the old unreviewed picks remain.
2. **Coverage.** 4 researched days, then an open day, a flexible day and a closing
   morning.
3. **Geography.** Every day's area comes from its stops, for example "Tung Chung + Ngong
   Ping".
4. **Travel.**
   - Every hop of 1.5 km or more is a stored journey, except the cable-car hop. That one
     is labelled "travel time not calculated", with the reason in the stop and the day
     note.
5. **Timing.**
   - **Saturday start:** the West Kowloon day moves to Monday 2 November. M+ opens that
     Monday by announcement, and the move keeps the Palace Museum off a Tuesday. The
     memorable dinner moves with it.
   - **Easygoing / Saturday:** without the Palace Museum, the West Kowloon day can sit on
     Tuesday instead.
   - No stop lands on a closed day.
   - Caveats are shown: Lung King Heen's minimum spend and child-age rules, Sky Terrace
     428 ticketed separately, and cable-car weather suspensions.
6. **Preferences.**
   - The memorable dinner goes to Lung King Heen, on whichever day the West Kowloon day
     lands.
   - The must-haves case asked for "The Peak Tram, dim sum, and Temple Street Night
     Market". The Peak Tram and dim sum go to Day 2 (Maxim's Palace). **Temple Street is
     listed as not scheduled.**
   - Budget is stated as not applying.
7. **Repetition.** No duplicate stops or days.
8. **Portability.**
   - A Saturday-start trip survives a page reload and a v2 export → restore round trip
     unchanged, including the Lantau day note.
   - Dates carry `Asia/Hong_Kong`.
   - The share copy has no private fields.
9. **Phones.** No horizontal scroll or overflowing lines at 375 px. A real-phone check is
   still needed.

## Open items

1. **Temple Street Night Market** has no official page with hours. It is requested
   often; a dated source would be needed before scheduling it.
2. **Cable-car ride time** is not shown. It needs a text source from Ngong Ping 360, or a
   manual reading of the animated figure on its Cable Cars page.
3. **ARGO on Sundays** has no published hours. A Sunday ARGO evening shows hours as
   unknown.
4. **Budget** does not reshape researched days (the same open decision as Berlin and
   Singapore).
5. **Real-phone check** by the owner.
