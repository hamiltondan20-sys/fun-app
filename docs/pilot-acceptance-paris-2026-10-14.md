# Pilot acceptance: Paris, October 14, 2026

Fourth pilot city. Paris needed its guide source review first. It was approved by the
owner and applied the same day (`docs/content-research/paris-2026-10-14.md`).

## What changed before testing

- **Old days replaced.** The five earlier written days used unreviewed stops: Carette,
  Chez Janou, Cafe Charlot, a Palais-Royal day in an unconfirmed area, and a Canal
  Saint-Martin morning with no named place. They are replaced by five researched days and a
  closing morning. Every stop is one of the 28 places in the approved review.
- **Registry.** 18 of the reviewed places are in the places registry, with OpenStreetMap
  coordinates (2026-10-14) and official hours in `data/place-hours.json`. Accented names
  now produce clean IDs (`musee-dorsay`, `sacre-coeur-basilica`).
- **Hours with limits:**
  - **Eiffel Tower:** the operator publishes hours a few days at a time. Dates after
    20 October 2026 show "The published hours don't cover this date or day", with the
    operator's note.
  - **Jardin du Luxembourg:** gate times change on the 1st and 16th of each month and
    are stored as six periods.
  - **Louvre:** the timed-reservation period (17 October–1 November) is shown as a
    caveat.
- **Travel.** Every hop is a stored Transitous journey (RATP/RER timetables, or an
  OpenStreetMap street route). The one exception is Le Jules Verne, which is in the
  Eiffel Tower itself and shows as the same site.
- **Days:**
  1. Louvre, Galerie Vivienne, then dinner at Frenchie.
  2. Poilâne, Jardin du Luxembourg, Musée d'Orsay, then Sainte-Chapelle.
  3. Coutume, Musée Rodin, the Eiffel Tower, then dinner at Le Jules Verne.
  4. Holybelly, lunch at Clamato, then dinner at Bistrot Paul Bert. This is the signature
     dinner.
  5. Sacré-Cœur, lunch at Breizh Café, then Little Red Door.

  Then an open day near Saint-Germain and coffee at Terres de Café on the last morning.
- **Easygoing.** Day 1 drops Galerie Vivienne, Day 2 drops Sainte-Chapelle, and Day 3
  drops Musée Rodin. Each becomes labelled free time with its own stored journey.

## Results

Start days:
- **Monday** 9 to 15 November 2026. Orsay and Rodin are closed on Mondays.
- **Tuesday** 10 to 16 November 2026. The Louvre is closed on Tuesdays.

The automated tests cover every start date from 21 October to 10 November.

| Run | 1 Places | 2 Coverage | 3 Geography | 4 Travel | 5 Timing | 6 Preferences | 7 Repetition | 8 Portable | 9 Phones |
|---|---|---|---|---|---|---|---|---|---|
| First visit / Mon | P | P | P | P | P | P | P | P | Partial |
| First visit / Tue | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Mon | P | P | P | P | P | P | P | P | Partial |
| Easygoing / Tue | P | P | P | P | P | P | P | P | Partial |
| Budget / Mon | P | P | P | P | P | Stated | P | P | Partial |
| Budget / Tue | P | P | P | P | P | Stated | P | P | Partial |
| Must-haves / Mon | P | P | P | P | P | P | P | P | Partial |
| Must-haves / Tue | P | P | P | P | P | P | P | P | Partial |

1. **Places.** Every named stop is a reviewed registry place. None of the ten excluded
   places appears.
2. **Coverage.** Five researched days, an open day and a closing morning.
3. **Geography.** Every day's area comes from its stops, for example "Louvre + Bourse"
   and "Invalides + Eiffel Tower".
4. **Travel.** No hop is untimed.
5. **Timing.**
   - A Tuesday start swaps the Louvre and Orsay days, so neither lands on its closed day.
   - No stop lands on a closed day for any start date in the tested range.
   - Eiffel Tower dates beyond the operator's published window are shown as not
     covered, never guessed.
6. **Preferences.**
   - The memorable dinner goes to Bistrot Paul Bert (Day 4) and the slower final day to
     Day 7.
   - The must-haves case asked for "The Eiffel Tower, the Louvre, a food market, and
     Notre-Dame". The Louvre and the Eiffel Tower are scheduled. **Food market and
     Notre-Dame are listed as not scheduled**: Notre-Dame was not verified, and no
     market was reviewed.
   - Budget is stated as not applying.
7. **Repetition.** No duplicate stops or days.
8. **Portability.**
   - A Tuesday-start trip survives a page reload and a v2 export → restore round trip
     unchanged, with accented names intact.
   - Dates carry `Europe/Paris`.
   - The share copy has no private fields.
9. **Phones.** No horizontal scroll or overflowing lines at 375 px. A real-phone check is
   still needed.

## Open items

1. **Notre-Dame and Père Lachaise** are commonly requested but unverified. Notre-Dame
   needs the owner to confirm its site in an ordinary browser.
2. **Food market.** The guide has none. A reviewed market (for example Marché des
   Enfants Rouges) would cover this request.
3. **Eiffel Tower hours** need re-reading as the operator publishes later dates.
4. **Budget** for researched days remains an open decision.
5. **Real-phone check** by the owner.
