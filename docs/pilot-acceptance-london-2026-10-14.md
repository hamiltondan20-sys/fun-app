# Pilot acceptance: London, October 14, 2026

Fifth and last pilot city. Its guide source review was approved by the owner and
applied the same day (`docs/content-research/london-2026-10-14.md`).

## What changed before testing

- **Old days replaced.** London's earlier written days used unreviewed stops. They are
  replaced by five researched days and a closing morning, built only from places in
  the approved review.
- **Registry.** 22 reviewed places are in the places registry, with OpenStreetMap
  coordinates (2026-10-14) and official hours in `data/place-hours.json`.
  - **National Gallery:** its point is the gallery's shop node inside the building on
    Trafalgar Square, because the museum feature couldn't be looked up that day.
  - **Tower of London:** Historic Royal Palaces publishes opening times one day at a time.
    Only 15 October was readable, so other dates show as not covered, never guessed.
  - **Borough Market:** two periods (closed Mondays until 29 November, open Mondays from
    30 November) plus dated festive hours.
  - **Sky Garden:** its dated hire and maintenance closures are stored as exceptions.
- **Travel.** Every hop is a stored Transitous journey (TfL Underground and bus
  timetables, or an OpenStreetMap street route).
- **Days:**
  1. The Tower of London, Tower Bridge, lunch at Leadenhall Market, then Sky Garden.
  2. Westminster Abbey, the National Gallery, Covent Garden, then dinner at Rules.
  3. Granger & Co., the Natural History Museum, the V&A, then dinner at Core by Clare
     Smyth.
  4. Monmouth Coffee, Borough Market, lunch at Padella, Tate Modern, then dinner at
     Dishoom (Covent Garden). This is the signature dinner.
  5. Prufrock Coffee, St Paul's Cathedral, lunch at Flat Iron, then Swift Soho.

  Then an open day near Covent Garden and breakfast at The Breakfast Club on the last
  morning.
- **Easygoing.** Day 1 drops Leadenhall Market, Day 2 drops Covent Garden, and Day 3
  drops the V&A. Each becomes labelled free time with its own stored journey.

## Results

Start days:
- **Sunday** 15 to 21 November 2026. There is no sightseeing at Westminster Abbey or
  St Paul's on Sundays, and Monmouth's shop is closed.
- **Monday** 16 to 22 November 2026. Borough Market is closed on Mondays and Core
  serves no dinner. Sky Garden is closed for maintenance on 16 November.

The automated tests cover every start date from 21 October to 17 November.

| Run | 1 Places | 2 Coverage | 3 Geography | 4 Travel | 5 Timing | 6 Preferences | 7 Repetition | 8 Portable | 9 Phones |
|---|---|---|---|---|---|---|---|---|---|
| First visit / Sun | P | P | P | P | P | P | P | P | Partial |
| First visit / Mon | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Sun | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Mon | P | P | P | P | P | P | P | P | Partial |
| Budget / Sun | P | P | P | P | P | Stated | P | P | Partial |
| Budget / Mon | P | P | P | P | P | Stated | P | P | Partial |
| Must-haves / Sun | P | P | P | P | P | P | P | P | Partial |
| Must-haves / Mon | P | P | P | P | P | P | P | P | Partial |

1. **Places.** Every named stop is a reviewed registry place. The British Museum, Hamleys
   and Tayēr + Elementary are never scheduled.
2. **Coverage.** Five researched days, an open day and a closing morning.
3. **Geography.** Every day's area comes from its stops, for example "Tower Hill + City"
   and "Borough + Bankside".
4. **Travel.** No hop is untimed.
5. **Timing.**
   - **Sunday start:** the Tower and City day takes Sunday.
   - **Monday start:** the Westminster day takes Monday, and the Tower and City day moves
     off Sky Garden's 16 November maintenance closure.
   - No stop lands on a closed day for any start date in the tested range.
6. **Preferences.**
   - The memorable dinner goes to Dishoom (Day 4) and the slower final day to Day 7.
   - The must-haves case asked for "The Tower of London, the British Museum, afternoon
     tea, and Borough Market". The Tower of London and Borough Market are scheduled.
     **The British Museum (not verified) and afternoon tea are listed as not
     scheduled.** Claridge's publishes no sitting times, so it isn't scheduled.
   - Budget is stated as not applying.
7. **Repetition.** No duplicate stops or days.
8. **Portability.**
   - A Monday-start trip survives a page reload and a v2 export → restore round trip
     unchanged.
   - Dates carry `Europe/London`.
   - The share copy has no private fields.
9. **Phones.** No horizontal scroll or overflowing lines at 375 px. A real-phone check is
   still needed.

## Open items

1. **British Museum** is the most-requested London sight and is unverified (bot check).
   It needs the owner to confirm its site in an ordinary browser.
2. **Tower of London hours** need reading for specific dates; the operator publishes
   them one day at a time.
3. **Afternoon tea** can't be scheduled until Claridge's sitting times are confirmed
   (for example, at booking).
4. **Budget** for researched days remains an open decision.
5. **Real-phone check** by the owner.
