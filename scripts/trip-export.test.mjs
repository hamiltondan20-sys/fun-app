import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadExport() {
  const context = vm.createContext({ window: {}, crypto: globalThis.crypto, Date, JSON, Math, Uint8Array, Intl, TextEncoder });
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-format.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-export.js"), "utf8"), context);
  return { format: context.window.HB_TRIP_FORMAT, exporter: context.window.HB_TRIP_EXPORT };
}

const place = (id, name, address, lat, lng) => ({ id, snapshot: { name, area: "Area", address, lat, lng }, verification: { status: "location-checked", checkedOn: "2026-10-14", sourceUrl: `https://example.org/${id}` } });

function sampleTrip(format, { destination = "Paris, France", startDate = "2026-11-09" } = {}) {
  return format.tripFromApp({
    id: "trp_test",
    appState: { destination, startDate, endDate: "2026-11-10" },
    currentTrip: {
      title: "A Test Trip",
      days: [
        { id: "day-1", title: "Museum day", area: "Louvre", item: { timeline: [
          { id: "stp_a", time: "9:00 AM", title: "Louvre Museum", copy: "Enter at the Pyramid; choose wings first.", place: place("plc_a", "Louvre Museum", "Pyramid entrance, 75001 Paris", 48.861, 2.336) },
          { id: "stp_b", time: "1:00 PM", title: "Lunch near the Louvre (your choice)", copy: "Nothing is booked.", kind: "flexible" },
          { id: "stp_c", time: "3:30 PM", title: "Galerie Vivienne", copy: "Free to walk through.", place: place("plc_b", "Galerie Vivienne", "4 rue des Petits-Champs, 75002 Paris", 48.867, 2.340),
            travelFromPrevious: { distanceKm: 0.7, minutes: 12, mode: "walk", basis: "routed", summary: "about 0.9 km on foot", conditions: "walking route", checkedOn: "2026-10-14" } },
          { id: "stp_d", time: "7:00 PM", title: "Dinner at Frenchie", copy: "One set menu, book ahead.", place: place("plc_c", "Frenchie", "5 rue du Nil, 75002 Paris", 48.868, 2.348) }
        ] } },
        { id: "day-2", title: "Untimed day", area: "", item: { timeline: [{ id: "stp_e", time: "Flexible", title: "Wander", copy: "" }] } }
      ]
    }
  });
}

const events = (ics) => ics.split("BEGIN:VEVENT").slice(1).map((block) => Object.fromEntries(
  block.replace(/\r\n /g, "").split("\r\n").filter((line) => line.includes(":")).map((line) => [line.slice(0, line.indexOf(":")), line.slice(line.indexOf(":") + 1)])
));

test("calendar: one event per timed, named stop, in UTC from the trip's time zone", () => {
  const { format, exporter } = loadExport();
  const result = exporter.buildCalendar(sampleTrip(format), { now: new Date(Date.UTC(2026, 9, 16, 12, 0, 0)) });
  assert.equal(result.eventCount, 3);
  assert.equal(result.skippedFreeTime, 1, "free-time blocks are never calendar commitments");
  assert.equal(result.skippedUntimed, 1, "untimed stops are not given invented times");
  assert.equal(result.timeZone, "Europe/Paris");
  const [louvre, vivienne, dinner] = events(result.ics);
  // 9 November is CET (UTC+1).
  assert.equal(louvre.DTSTART, "20261109T080000Z");
  // A stop lasts until the next timed stop that day, at most three hours.
  assert.equal(louvre.DTEND, "20261109T110000Z");
  assert.equal(vivienne.DTSTART, "20261109T143000Z");
  assert.equal(vivienne.DTEND, "20261109T173000Z");
  // The day's last stop gets 90 minutes.
  assert.equal(dinner.DTEND, "20261109T193000Z");
  assert.equal(louvre.SUMMARY, "Louvre Museum");
  assert.equal(louvre.LOCATION, "Pyramid entrance\\, 75001 Paris", "commas are escaped");
  assert.equal(louvre.GEO, "48.861;2.336");
  assert.equal(louvre.UID, "stp_a.trp_test@hamiltondan20-sys.github.io");
  assert.match(vivienne.DESCRIPTION, /Getting there: about 12 min walk/);
  assert.match(louvre.DESCRIPTION, /Times are a plan\\, not a booking/);
  assert.equal(louvre.DTSTAMP, "20261016T120000Z");
});

test("calendar: daylight-saving changes and other pilot time zones", () => {
  const { exporter } = loadExport();
  const stamp = (date, minutes, zone) => exporter.zonedToUtc(date, minutes, zone).toISOString();
  assert.equal(stamp("2026-10-24", 9 * 60, "Europe/Paris"), "2026-10-24T07:00:00.000Z", "summer time");
  assert.equal(stamp("2026-10-26", 9 * 60, "Europe/Paris"), "2026-10-26T08:00:00.000Z", "after the clocks go back");
  assert.equal(stamp("2026-11-16", 9 * 60, "Europe/London"), "2026-11-16T09:00:00.000Z");
  assert.equal(stamp("2026-11-09", 9 * 60, "Asia/Singapore"), "2026-11-09T01:00:00.000Z");
  assert.equal(stamp("2026-11-09", 19 * 60 + 30, "Asia/Hong_Kong"), "2026-11-09T11:30:00.000Z");
});

test("calendar: valid file structure, CRLF line endings and folded long lines", () => {
  const { format, exporter } = loadExport();
  const { ics } = exporter.buildCalendar(sampleTrip(format));
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\nVERSION:2.0\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.ok(!/[^\r]\n/.test(ics), "every line ends in CRLF");
  const encoder = new TextEncoder();
  ics.split("\r\n").forEach((line) => assert.ok(encoder.encode(line).length <= 75, `line too long: ${line}`));
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, (ics.match(/END:VEVENT/g) || []).length);
  assert.equal(exporter.escapeText("a;b,c\\d\ne"), "a\\;b\\,c\\\\d\\ne");
  // Multi-byte characters are never split across a fold.
  const folded = exporter.foldLine(`SUMMARY:${"Sacré-Cœur ".repeat(12)}`);
  assert.ok(folded.split("\r\n ").every((part) => encoder.encode(part).length <= 75));
  assert.equal(folded.replace(/\r\n /g, ""), `SUMMARY:${"Sacré-Cœur ".repeat(12)}`);
});

test("calendar: unknown time zones stay floating, and a trip without dates cannot be exported", () => {
  const { format, exporter } = loadExport();
  const floating = exporter.buildCalendar(sampleTrip(format, { destination: "Somewhere, Nowhere" }));
  assert.equal(floating.timeZone, null);
  assert.equal(events(floating.ics)[0].DTSTART, "20261109T090000", "shown as written, without a Z");
  assert.ok(!floating.ics.includes("X-WR-TIMEZONE"));
  assert.throws(() => exporter.buildCalendar(sampleTrip(format, { startDate: "" })), /Add trip dates/);
});
