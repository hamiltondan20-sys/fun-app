# Backup Migration Test

October 7, 2026. Domain configuration remains blocked by registrar price
confirmation. No domain or DNS changes.

The approved notice was added directly to plan/index.html near the top and to
the dynamically rendered Saved > Beta local account block in app-trip.js.
Its final sentence is exactly: "Without a backup, saved trips will be lost."

## Actual browser test

Source: http://127.0.0.1:8871/plan/#saved
Target: http://127.0.0.1:8872/plan/#saved
Different ports make these different origins. Both run the actual planner.

Created through UI on the source: Migration Test profile, DEN home airport,
seven-day Paris draft, first booking marked searching with note
"DISPOSABLE migration booking note". Saved draft and exported using Export
backup. Download event reporting timed out, but the JSON was actually created
in Downloads; it was selected through the target's Restore backup file picker.

Target initially showed no profile, draft or booking notes. Import then showed
"Backup restored on this browser", Migration Test/DEN, Paris seven-day draft
and one booking note. Reload retained the profile, saved draft and note. Used
Restore draft after reload and opened booking hub: first status was searching
and exact note was DISPOSABLE migration booking note.

Result: genuine cross-origin profile/draft/booking restoration and persistence
passed. No real visitor data was exported or overwritten. No named alternate
version was included: that coverage remains outstanding rather than assumed.
This is not a test of the future custom-domain build or its redirect mapping.

Do not configure the domain until remaining migration prerequisites, registrar
purchase/renewal price and a cutover date are confirmed. Thresholds unchanged.
