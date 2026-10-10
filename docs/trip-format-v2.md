# Portable trip format v2 (draft for review)

Status: proposal, October 10, 2026. No code uses this yet.

One versioned structure for **backups, share links, print/calendar export and
future account sync**, so the four don't drift apart.

## Why the current format can't be reused as-is

- Backups are `type: "local-account-backup"`, `version: 1`, but the importer never
  reads `version`, and there is no upgrade code.
- Days are `id: "day-N"` and timeline stops have no ID at all, so anything that
  points at a stop (must-haves, bookings, edits, sync) breaks when days or stops move.
- The file mixes app UI state (`appState`, `activeTripSource`, `storage.*` copies)
  with trip content, and private data (profile email, booking notes) sits beside
  content that might be shared.
- Times are display strings ("9:00 AM") with no time zone, which calendar export needs.

## Envelope

```json
{
  "format": "fullest-life-trip",
  "schemaVersion": 2,
  "kind": "backup | share | sync",
  "exportedAt": "2026-10-10T20:15:37Z",
  "appBuild": "20261010",
  "trips": [ /* Trip */ ],
  "profile": { /* backup and sync only */ },
  "preferences": { /* consent is never included */ }
}
```

- `kind: "share"` carries exactly one sanitized trip (see Privacy) and no profile.
- Importers reject unknown `format`, accept `schemaVersion` 1 and 2, and upgrade v1
  on read (see Migration). Newer versions are refused with a clear message.

## Trip

```json
{
  "id": "trp_8f3c...",
  "title": "A Food-Focused Paris Trip",
  "destination": { "name": "Paris", "country": "France", "guideSlug": "paris" },
  "timeZone": "Europe/Paris",
  "dates": { "start": "2026-11-06", "end": "2026-11-12", "flexible": false },
  "travelers": { "adults": 2, "children": 0, "pets": "none" },
  "preferences": { "styles": ["Relaxing", "Foodie"], "pace": "Balanced", "budget": "Moderate" },
  "mustHaves": [
    { "id": "mh_1", "label": "Eiffel Tower", "type": "sight",
      "scheduled": [{ "dayId": "day_a1", "stopId": "stp_k2" }] },
    { "id": "mh_3", "label": "Food market", "type": "food", "scheduled": [] }
  ],
  "days": [ /* Day */ ],
  "logistics": {
    "flights": { "mode": "need-help | have-flights | not-needed", "arrival": null, "departure": null },
    "stay": { "name": "", "area": "", "checkIn": null, "checkOut": null }
  },
  "bookings": [ /* Booking — private */ ],
  "versions": [ { "id": "ver_...", "name": "Lighter Eiffel day", "savedAt": "...", "days": [ /* Day */ ] } ],
  "updatedAt": "2026-10-10T20:15:37Z"
}
```

## Day and stop

```json
{
  "id": "day_a1",
  "date": "2026-11-08",
  "title": "Eiffel Tower + Left Bank views",
  "area": { "label": "Eiffel / Left Bank", "confirmed": true },
  "source": { "template": "paris-3", "guideReviewed": false },
  "stops": [
    {
      "id": "stp_k2",
      "start": "09:00",
      "durationMin": 120,
      "kind": "landmark",
      "title": "Trocadero + Eiffel Tower",
      "note": "Go early so the big Paris moment feels smoother.",
      "place": { "ref": "paris/eiffel-tower", "verified": false },
      "travelFromPrevious": null
    }
  ],
  "feedback": "too-full | too-light | wrong-area | keep | null"
}
```

- **IDs** are random, created once, and never reused; position no longer matters.
- **Untimed stops** use `"start": null`. Calendar export turns them into all-day
  notes instead of inventing a time.
- **Times** are local wall-clock times in the trip's `timeZone` (no UTC offsets in
  stops), so a trip still reads correctly across daylight-saving changes.
- **`place.verified`** is true only when the place has been checked against a source
  (branch, address, coordinates). Unverified places must not claim exact locations.
- **`travelFromPrevious`**: `{ "minutes": 15, "mode": "walk | transit | drive",
  "basis": "estimate | routed", "checkedOn": "2026-10-10" }`. The UI must label
  estimates as estimates; `routed` timings are still a snapshot, not a guarantee.

## Privacy

| Field | backup | sync | share |
|---|---|---|---|
| Trip content, days, stops, must-haves | yes | yes | yes |
| Named versions | yes | yes | only the version chosen to share |
| Bookings (status, notes, confirmation details) | yes | yes | **never** |
| Logistics (flights, hotel name) | yes | yes | only if the sharer ticks "include" |
| Profile (name, email, home airport) | yes | account | **never** |
| Analytics consent | **never** | **never** | **never** |

Share links carry a sanitized snapshot built from an allow-list (not by deleting
known-private fields), show a preview of exactly what will be shared, and warn that
a link cannot be revoked while sharing is URL-based.

## Migration from v1

On import of a `local-account-backup` v1 file:

1. Take trip content from `storage.draft.currentTrip` (fall back to top-level).
2. Assign new IDs to the trip, each day and each stop, keeping a v1→v2 map.
3. Convert `"9:00 AM"` style times to `"09:00"`; unparseable times become untimed.
4. Rebuild `mustHaves[].scheduled` from v1 `protectedAnchors` using the ID map.
5. Merge versions from `alternateTrips` and `storage.draft.alternateTrips` by id
   (current behaviour, see backup-migration-test-2026-10-10.md).
6. Move `bookingItems` into `bookings`; attach `stopId` where the v1 booking key
   names a scheduled anchor.
7. Default `timeZone` from the destination; mark it "assumed" until confirmed.

v1 export stays available until v2 import has shipped and been verified across
origins, so no visitor holds a file nothing can read.

## Open questions

1. Should share links include a named version or always the live trip?
2. Do we keep one trip per browser (today) or allow several trips in `trips[]` now,
   ahead of accounts?
3. Where do place references (`paris/eiffel-tower`) live: in the guide data files,
   or a separate places file that guides and itineraries both point to?
