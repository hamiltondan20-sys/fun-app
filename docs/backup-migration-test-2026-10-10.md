# Cross-origin backup test, October 10, 2026

Disposable test data only; no visitor data was exported or overwritten.

## Bug found and fixed

The October 7 importer fix restored the export-time version list (`alternateTrips`)
over the stored draft's list whenever it was an array. But Export reads that list
from memory, and named versions only load into memory after **Restore draft**. So
the documented migration flow — open Saved, choose Export backup — produced a file
whose top-level list was empty, and import replaced the stored versions with it.

Reproduced on the live site: after a fresh load of `/plan/#saved`, the export's
top-level `alternateTrips` was `[]` while `storage.draft.alternateTrips` held
"Lighter Eiffel day".

Fix (scripts/app-trip.js):
- Export falls back to the stored version list when memory has not loaded it.
- Import merges export-time and stored versions by id (export-time entries win),
  so neither the original "newer versions" case nor this one loses a version.

Regression tests added in scripts/planner-paths.test.mjs (both failed before the fix).

## Cross-origin test

- Origin A (export): https://hamiltondan20-sys.github.io/fun-app/plan/ — live
  build, still running the pre-fix export code, i.e. what visitors will export with
  until this fix deploys.
- Origin B (import): http://localhost:8765/fun-app/plan/ — this fixed build.
- Test data on A, entered through the UI: 7-day Paris trip, Day 3 marked "Too full"
  (3 stops), named version "Lighter Eiffel day", booking `meal-onememorabledinner`
  status Booked with note "Test note: table for 2 at 7:30", profile name
  "Test Traveler", home airport "JFK".
- File: exactly what Export backup writes (`JSON.stringify(payload, null, 2)`),
  carried from A to B intact (SHA-256 prefix 83c80007ae60bed1 matched on both sides).
  Name: the-fullest-life-travel-paris-france-backup.json.
- B started without the old data (no draft or profile keys). The file was restored
  through Saved > Beta local account > Restore backup's file input.

Result after import, reload, and Restore draft on B — all matched A:
- Named version "Lighter Eiffel day" in storage, in the app, and in the versions list
- Day 3 still 3 stops; destination Paris, France
- Profile Test Traveler / JFK
- Booking Booked, note preserved, shown in the booking hub
- No analytics consent was transferred (none stored on B)

Remaining before cutover: deploy this fix to the live site before visitors are asked
to export, so their files carry the version list, and repeat on a real phone.

## Trip format v2 (increment 1), same day

Export now writes `fullest-life-trip` schemaVersion 2 (docs/trip-format-v2.md);
Restore accepts v1 and v2.

- **v1 → new build, cross-origin.** A v1 file exported from a fresh Saved page on the
  live github.io build was restored on the localhost build through the real file input.
  Profile, Day 3 edit, named version, booking status and note all matched after reload
  and Restore draft. Saving assigned stable ids to all 26 stops.
- **v2 round trip.** Exported v2 (80 KB; Europe/Paris; ISO day dates; booking linked to
  its scheduled stop; three scheduled must-haves), wiped storage, restored, reloaded,
  Restore draft: trip id and all 26 stop ids identical; version, Day 3, must-have pins,
  profile, booking status and note all preserved.
- **Bug found and fixed during this test:** the first v2 restore lost bookings after
  Restore draft, because Restore draft reloads bookings from the draft and the v2
  adapter had only written them to the booking store. Covered by a new assertion in
  scripts/planner-paths.test.mjs.
- Refused as expected: shared copies and files from a newer schema (unit tests).

## Several trips per browser (increment 2), same day

Storage: `hb-trips-v2` holds `{ activeTripId, trips[] }`, each entry a saved copy of that
trip's draft (versions and bookings included). `hb-trip-draft-v1` stays the active trip's
working copy, so existing save/restore paths are unchanged.

- **Upgrade of a current visitor's storage.** The live build (origin/main, served at
  /old-app/) and this build (/fun-app/) were served on the same localhost origin, so they
  shared storage. A trip built with the live code (Day 3 edit, named version, booking
  status and note, profile) was then opened with this build: the one-time move listed it
  as "Open now" with its dates, 7 days and 1 version; trip id and all 26 stop ids were
  unchanged; an untouched copy was written to `hb-trip-draft-v1-premigration`; Restore
  draft brought back the version, Day 3, booking, note and profile.
- **Plan a new trip.** Paris stayed in the list; London was built as a separate trip with
  no versions or bookings carried over.
- **Switch, rebuild, rename, duplicate, delete.** Opening Paris from the list restored its
  version and booking. Rebuilding Paris with a different pace kept the same trip id (no
  duplicate entry). Rename updated the list and the open trip; Duplicate copied versions;
  Delete (after confirmation) removed only the copy.
- **Export/restore of several trips.** Export carried both trips. After wiping storage,
  Restore added both with identical trip and stop ids; Paris reopened with its version and
  booking; no question was asked. Restoring the same file again asked once per trip and,
  on "keep both", added "(imported)" copies without touching the originals.
- Phone width: trip list fits with no horizontal overflow.
