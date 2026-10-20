# Checked alternates for Berlin, Hong Kong and Singapore

October 19, 2026. **Approved by the owner on October 19 and applied**, with Maxwell Food Centre for the
JUMBO Seafood slot. The evidence is in `alternates-berlin-hongkong-singapore-2026-10-19.json` in this
directory. The city guides are unchanged: these places are itinerary alternates only, recorded in
`data/itinerary-place-sources.json`.

## Why

"Try alternate" on a researched day offers one checked place that replaces one stop. Paris and London
have alternates, drawn from places already approved in their source reviews. Berlin, Hong Kong and
Singapore have none, because every place approved for them is already a stop. This review checks new
candidates, one per researched day, each close to the stop it would replace.

## Method

- **Sources:** every candidate was checked against its operator's own website, or the public body
  that runs it:
  - Berlin: Staatliche Museen zu Berlin
  - Hong Kong: the Leisure and Cultural Services Department (LCSD)
  - Singapore: the National Heritage Board, Mandai Wildlife Group and the National Environment
    Agency (NEA)

  Maps, review sites, blogs, tourism boards and news were not used.
- **Unreadable sites:** a fetch failure is never treated as a closure. No bot check was met; none
  would have been bypassed.
- **Backups:** each slot had a backup in case the first choice failed.
- **Spot-checks:** I re-read three results myself: the Jewish Museum, the Hong Kong Museum of Art and
  Lau Pa Sat. The NEA cleaning schedule was read in a browser because it loads by script.
- **On approval:** coordinates (OpenStreetMap) and travel times (Transitous) are added, as for Paris
  and London.

## Proposed alternates (11)

| City | Day | Instead of | Proposed | Verdict | Published hours | Caveats |
|---|---|---|---|---|---|---|
| Berlin | Museum Island | DDR Museum | **Alte Nationalgalerie** | Confirmed | Tue–Sun 10:00–18:00, Mon closed | Closed 24 and 31 Dec (SMB rule). 2nd floor closed until 21 Oct. |
| Berlin | Bernauer Strasse | Museum für Naturkunde | **Hamburger Bahnhof** | Confirmed | To 30 Nov: Tue, Wed, Fri 10–18, Thu 10–20, Sat–Sun 11–18. From 1 Dec: Tue–Sun 10–18. | Closed 24 and 31 Dec. Rieckhallen not step-free. |
| Berlin | Charlottenburg and City West | Zoo Berlin | **Kaiser Wilhelm Memorial Church** | Confirmed (church) | Daily 10:00–18:00, except during services and concerts | The Gedenkhalle exhibition in the old tower is closed for renovation (since 29 Aug, no end date). A much shorter visit than the zoo. |
| Berlin | Kreuzberg dinner | Restaurant Tim Raue | **Horváth** | Confirmed | Wed–Sat from 18:30 (closing not published) | Closed Sun–Tue. Booked online (OpenTable). |
| Berlin | Technikmuseum and Kreuzberg | Tempelhofer Feld | **Jewish Museum Berlin** | Confirmed | Tue–Sun 10:00–18:00, last admission 17:00, Mon closed | Closed 14 Nov and 24 Dec. Time-slot ticket recommended. |
| Hong Kong | Old Central and Sheung Wan | PMQ | **Hong Kong Zoological and Botanical Gardens** | Confirmed | Daily 06:00–19:00 (Fountain Terrace 05:00–22:00; Green House 09:00–16:30) | Free. No closure days published. |
| Hong Kong | Peak and Central waterfront | ARGO (drinks) | **The Old Man** | Confirmed, weak | Mon–Sat 17:00–02:00, Sun 17:00–00:00 | The site has hours and a menu but nothing dated 2026 (footer © 2021). No booking information. |
| Hong Kong | West Kowloon and the Star Ferry | Hong Kong Palace Museum | **Hong Kong Museum of Art** | Confirmed | Mon–Wed and Fri 10:00–18:00; Sat, Sun and public holidays 10:00–21:00; **Thu closed** | 24 Dec 10:00–17:00. Free except special exhibitions. |
| Singapore | National Gallery and Marina Bay | ArtScience Museum | **Asian Civilisations Museum** | Confirmed | Daily 10:00–19:00, Fri 10:00–21:00; galleries close to entry 30 min before | Some exhibitions need an all-access ticket. |
| Singapore | Botanic Gardens and Dempsey | ATLAS (late drinks) | **Long Bar, Raffles Hotel** | Confirmed | Sun–Wed 11:00–22:30, Thu–Sat 11:00–23:30 (last seating) | Walk-in only. Smart casual recommended. |
| Singapore | Singapore Zoo | Singapore Zoo | **Bird Paradise** | Confirmed | Daily 09:00–18:00, last entry 17:00 | Same Mandai area. One attraction inside is closed 10–12 Nov. |

**Singapore needs a decision on one more slot:** dinner at JUMBO Seafood on the Tiong Bahru day. A
hawker centre there would also close the long-open "reviewed hawker centre" item.

| Option | What was confirmed | What wasn't |
|---|---|---|
| **Maxwell Food Centre** (1 Kadayanallur Street) | Listed on NEA's own list of hawker centres (dated 17 Aug 2026). NEA's cleaning schedule closes it on **14 Dec 2026**. | No centre or stall hours are published anywhere official; the planner would show hours as unknown. |
| **Lau Pa Sat** (18 Raffles Quay) | Its own site gives the address with "(24 hours)" and a weekly live band (Fri–Sun 19:30–21:30). | Stall hours aren't published, and the site has nothing dated 2026 (footer © 2024). |

My recommendation is Maxwell Food Centre. Its operation and closure dates come from the government
body that runs it, and the planner would say plainly that stall hours vary.

## Days with no alternate

| City | Day | Why |
|---|---|---|
| Hong Kong | Lantau (cable car and Big Buddha) | Nothing nearby makes sense as a swap. |
| All three | Closing mornings | One named stop and free time: already light. |

Each researched day gets at most one alternate, so the alternate's text never has to be combined with
another's. Hong Kong's West Kowloon day therefore gets the Museum of Art. The dinner swaps checked for
that day (Tim Ho Wan at K11 Art Mall or West Kowloon Station; Mott 32 in Central) are both confirmed
and kept on file only.

## Checked but not used

| Place | Why |
|---|---|
| Museum Berggruen | **Closed** for basic renovation (since 2022); the collection is touring abroad. |
| Mauerpark | Not verified: official pages returned errors. |
| Lode & Stijn | Not verified: the restaurant's site has an expired security certificate. |
| Bar Leone | Not verified: its old domain is parked for sale, and the other site shows no content. |
| National Museum of Singapore | Not verified: hours and address didn't load on the official pages. |
| Native (Amoy Street) | Hours published, but the site couldn't be tied to the bar and has nothing current. |
| Bode-Museum, Topography of Terror, Hong Kong Park, Hong Kong Space Museum, River Wonders | Confirmed backups, not needed. |

## On approval

1. Add each approved place to `data/itinerary-place-sources.json`, with the records above.
2. Add coordinates from OpenStreetMap, hours to `data/place-hours.json`, and timed journeys for every
   hop of 1.5 km or more.
3. Write each alternate's own summary text: the day's title, notes and travel line. The rule of no
   repeated or unchecked claims applies.
4. Run the test matrix again for the three cities.
