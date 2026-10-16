# Portable trip format v2

Status: design agreed October 10, 2026 (decisions below). No code uses this yet.

## Decisions (October 10)

1. **Share a frozen snapshot.** Users share the current itinerary or a chosen named
   version, frozen when the link is created. Later edits never change what the
   recipient sees. Without a backend it is labelled "Shared copy" and built from the
   privacy allow-list.
2. **Several trips now.** Storage is a trip collection with one active trip. UI stays
   small: create, open, rename, duplicate, delete, export. Named versions live inside
   a trip; they are not separate trips. Import never silently overwrites another trip.
3. **Separate places registry.** Guides and stops reference stable place IDs. The
   registry holds exact branch, coordinates, time zone and evidence; guide data keeps
   editorial descriptions and category membership. Exported trips keep a minimal place
   snapshot so backups stay readable when the registry changes.
4. **Verification is a record, not a boolean.** Every "verified" claim says what was
   checked, when, and against which evidence (see Places).

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
      "place": {
        "id": "plc_paris_eiffel-tower",
        "snapshot": { "name": "Eiffel Tower", "area": "Eiffel / Left Bank", "lat": 48.8584, "lng": 2.2945 }
      },
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
- **`place.id`** points at the places registry; **`place.snapshot`** is the minimal
  copy kept in the trip so exports stay readable. Verification lives in the registry.
- **Flexible time** is a stop with `kind: "flexible"` and no `place`; it is never a
  made-up venue.
- **`travelFromPrevious`**: `{ "minutes": 15, "mode": "walk | transit | drive",
  "basis": "estimate | routed", "checkedOn": "2026-10-10" }`. The UI must label
  estimates as estimates; `routed` timings are still a snapshot, not a guarantee.

## Places registry (separate file, shared by guides and itineraries)

```json
{
  "id": "plc_paris_eiffel-tower",
  "name": "Eiffel Tower",
  "city": "paris",
  "branch": null,
  "address": "Av. Gustave Eiffel, 75007 Paris",
  "lat": 48.8584, "lng": 2.2945,
  "timeZone": "Europe/Paris",
  "area": "Eiffel / Left Bank",
  "verification": {
    "status": "unchecked | location-checked | hours-checked | closed | moved",
    "checkedOn": "2026-10-10",
    "checked": ["location", "opening-hours", "booking-required"],
    "evidence": [{ "source": "official site", "url": "https://...", "retrievedOn": "2026-10-10" }]
  }
}
```

- The UI may say "location checked October 10" — never just "verified".
- `closed` or `moved` places are kept (so old trips still resolve) but are not scheduled.
- Coordinates come with their source and licence; map/routing data attribution is
  shown wherever it is used.

## Storage collection

```json
{ "activeTripId": "trp_8f3c...", "trips": [ /* Trip */ ] }
```

Import adds trips to the collection. If an imported trip id already exists, the user
chooses: keep both (imported copy gets a new id and "(imported)" title) or replace.

## Privacy

| Field | backup | sync | share |
|---|---|---|---|
| Trip content, days, stops, must-haves | yes | yes | yes |
| Named versions | yes | yes | only the version chosen to share |
| Bookings (status, notes, confirmation details) | yes | yes | **never** |
| Logistics (flights, hotel name) | yes | yes | only if the sharer ticks "include" |
| Profile (name, email, home airport) | yes | **never** (the account holds only its sign-in email) | **never** |
| Analytics consent | **never** | **never** | **never** |

Share links carry a sanitized snapshot built from an allow-list (not by deleting
known-private fields), show a preview of exactly what will be shared, and warn that
a link cannot be revoked while sharing is URL-based.

## Print and calendar export (October 16)

Both work on the open trip; neither sends anything anywhere.

- **Print or save as PDF** (`renderTripPrintView` in `scripts/app-trip.js`):
  - A print-only section lists, for every day and stop:
    - the address and hours for that date
    - the travel line and route note
  - It uses the same renderers as the planner, so the printed plan matches the screen.
  - The header carries the trip's dates, its local time zone, its must-haves (scheduled
    and not) and any closed-day or out-of-hours warnings. The footer says it is a plan,
    not a booking.
  - The browser's own Print menu prints the same view.
- **Add to calendar (.ics)** (`scripts/trip-export.js`, tested in
  `scripts/trip-export.test.mjs`):
  - **Events:** one event per timed, named stop. Free-time blocks and untimed stops are
    left out and counted, so the calendar never shows invented commitments.
  - **Time zone:** times are converted from the trip's time zone to UTC, including
    daylight-saving changes. Destinations without a known time zone get floating local
    times.
  - **Duration:** an event lasts until the next timed stop that day (at most three hours),
    or 90 minutes for the day's last stop.
  - **Event content:** address, map point, the operator's page and the travel line. Each
    description says the times are a plan, not a booking.
  - **UIDs:** stable per stop, so a re-export updates the same events.
  - **Format:** lines are RFC 5545 escaped and folded.

## Share links (October 16)

"Share a copy" (`openShareDialog` in `scripts/app-trip.js`; encoding in `scripts/trip-share.js`,
tested in `scripts/trip-share.test.mjs`):

- **Choosing what to share.**
  - The sharer picks the current plan or one saved version, and can opt in to sharing the
    area they're staying in.
  - The dialog lists what is included and what is never included.
  - It warns that a link can't be withdrawn.
- **The link.**
  - It carries a frozen copy in the URL fragment:
    `…/plan/#share=s1.<base64url(deflate-raw(JSON))>`. Browsers never send fragments to
    the web server.
  - The copy is rebuilt from `buildShareCopy` through a second allow-list, and only what
    the shared view renders is kept.
  - A 7-day pilot trip is about 4,700 characters.
- **Opening a link.**
  - The shared copy shows read-only over the planner; the visitor's own trip is never
    replaced.
  - The data moves into session storage and the address becomes `#shared-trip`, so it
    isn't kept in history or bookmarks. A refresh still reopens it, and Close clears it.
  - Analytics reports pages without the fragment.
  - A link pasted into an open tab works too (`hashchange`).
- **Incoming links are untrusted.**
  - Size limits apply to both the encoded link and the decompressed JSON, so a small link
    can't inflate into a huge payload.
  - The format, kind and schema version are checked.
  - Every field is rebuilt from an allow-list:
    - text is trimmed and length-limited
    - dates, times, coordinates and time-zone names must be well-formed
    - only `https:` source links survive
    - place IDs must match the registry pattern
  - All text is escaped when rendered.
- **"Save a copy to my trips"** adds the copy as a separate trip ("… (shared copy)"),
  without opening it. Must-haves the plan already scheduled are visible in its days, and
  unscheduled ones stay listed.

## Account sync (October 16)

Built with Supabase and off until the project is set up; see `docs/account-sync.md`. Sync copies
each trip's saved draft (one row per trip) rather than a v2 envelope, so a synced trip restores
exactly as it was saved. It follows the privacy table above: bookings and logistics sync, while
the planner profile and the analytics choice never do.

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

## Resolved questions

Answered October 10 — see Decisions 1–3 at the top.
