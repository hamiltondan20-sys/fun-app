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
