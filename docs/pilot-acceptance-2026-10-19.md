# Pilot acceptance re-run: October 19, 2026

This re-runs the test matrix in `docs/pilot-milestone.md` after the October 16–19 work:
- checked alternates in all five cities
- Make lighter and open-day moves
- account sync, built but off
- opening hours extended into 2027

Each run builds a real trip in the planner, in the browser. The matrix is 5 cities × 4 scenarios (default, Easygoing, Budget,
the must-have "food market") × 4 start dates. Two dates are in 2026: Monday 9 November and Thursday 12 November. Two are in
2027: Monday 8 February and Thursday 15 April. That makes 80 seven-day trips.

## Opening hours extended to June 2027

Each operator's own site was re-read on 19 October. Pages that refused automated reading were read in a browser:
- Musée d'Orsay, Little Red Door, Bar Hemingway
- Monmouth Coffee, Lung King Heen, ARGO
- Man Mo Temple, ArtScience Museum

**99 of 104 places now have published hours to 30 June 2027.** Each is entered as one of three kinds:
- **Standing weekly hours** the site still states.
- **Seasonal schedules:** Zoo Berlin, Charlottenburg Palace, Tempelhofer Feld, Sainte-Chapelle, the Jardin du Luxembourg
  and the Arc de Triomphe.
- **Dated 2027 exceptions:** only where the site states them, or states a rule such as "closed 1 May" or "closed the first
  two days of Lunar New Year".

Rules the site itself marks as uncertain were entered as *unknown* rather than stated:
- Sky Garden's first-Monday maintenance
- Tower Bridge's New Year's Day hours

One change was found: Dishoom (Covent Garden) now opens at 08:00 on Saturdays.

**Five places stay unknown for 2027:**

| Place | Why |
|---|---|
| Eiffel Tower | Publishes its hours only a few days ahead |
| Tower of London | Publishes day-by-day times only |
| Westminster Abbey | Publishes day-by-day times only |
| The Peak Tram | Its page doesn't show hours as readable text |
| Maxwell Food Centre | No centre or stall hours are published (NEA's 2027 cleaning dates aren't out yet) |

Charlottenburg Palace has no published January–March 2027 hours; April–June are set.

## Results

| City | Start | Named stops | Hours unknown | Closed on the day | Outside hours | Invented venues | Repeats |
|---|---|---:|---:|---:|---:|---:|---:|
| Berlin | 9 Nov 2026 / 12 Nov 2026 | 74 / 74 | 0 / 0 | 0 | 0 | 0 | 0 |
| Berlin | 8 Feb 2027 / 15 Apr 2027 | 74 / 74 | 4 / 0 | 0 | 0 | 0 | 0 |
| Paris | 2026 / 2027 dates | 69 each | 4 each (Eiffel Tower) | 0 | 0 | 0 | 0 |
| London | 2026 dates | 85 each | 4 each (Tower of London) | 0 | 0 | 0 | 0 |
| London | 2027 dates | 85 each | 8 each (+ Westminster Abbey) | 0 | 0 | 0 | 0 |
| Hong Kong | 2026 / 2027 dates | 58 each | 0 / 4 (Peak Tram) | 0 | 0 | 0 | 0 |
| Singapore | all four dates | 46 each | 0 | 0 | 0 | 0 | 0 |

Counts are summed over the four scenarios for each start date.

Before the extension, every named stop on the 2027 dates had unknown hours: 382 stop-days. After it, 32 do, all at the five
places above.

- **Hong Kong travel:** four Hong Kong legs per date are straight-line distances. These are the Ngong Ping 360 cable-car
  hop, which is labelled untimed because the operator doesn't publish a ride time.
- **Must-have "food market":**
  - Scheduled in Berlin (Markthalle Neun) and now in London: Borough Market is marked as a food market.
  - Listed as not scheduled, with the reason given, in Paris, Hong Kong and Singapore. None of those itineraries includes a
    reviewed food market yet.

## Criteria

- **Criteria 1–8:** pass for all 80 runs. Hours that are unknown are shown as unknown (criterion 5), never assumed.
- **Criterion 9:** usable on a real phone. It still needs the owner's check on a real device.
