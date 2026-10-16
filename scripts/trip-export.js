// Calendar export for portable trips (docs/trip-format-v2.md): a v2 Trip -> an iCalendar (.ics)
// file. Pure functions only: no DOM, no storage. Loaded before app-trip.js and unit-tested in Node.
(function initializeTripExport(root) {
  const PRODUCT_ID = "-//The Fullest Life Travel//Trip planner//EN";
  const UID_DOMAIN = "hamiltondan20-sys.github.io";
  const DEFAULT_MINUTES = 90;
  const MAX_MINUTES = 180;

  // Text values escape backslash, semicolon, comma and newlines (RFC 5545, 3.3.11).
  function escapeText(value) {
    return String(value ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");
  }

  // Lines longer than 75 octets fold onto continuation lines that start with a space (RFC 5545, 3.1).
  function foldLine(line) {
    const encoder = new TextEncoder();
    if (encoder.encode(line).length <= 75) return line;
    const parts = [];
    let current = "";
    let size = 0;
    for (const character of line) {
      const length = encoder.encode(character).length;
      const limit = parts.length === 0 ? 75 : 74;
      if (size + length > limit) {
        parts.push(current);
        current = "";
        size = 0;
      }
      current += character;
      size += length;
    }
    parts.push(current);
    return parts.join("\r\n ");
  }

  const pad = (value) => String(value).padStart(2, "0");
  const toMinutes = (clock) => {
    const match = String(clock || "").match(/^(\d{2}):(\d{2})$/);
    return match ? Number(match[1]) * 60 + Number(match[2]) : null;
  };

  // Wall-clock time in a named time zone -> the UTC instant, using the platform's time-zone data.
  // Two passes settle daylight-saving changes.
  function zonedToUtc(isoDate, minutesOfDay, timeZone) {
    const [year, month, day] = isoDate.split("-").map(Number);
    const wall = Date.UTC(year, month - 1, day, Math.floor(minutesOfDay / 60), minutesOfDay % 60);
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
    const offsetAt = (instant) => {
      const parts = Object.fromEntries(formatter.formatToParts(new Date(instant)).map((part) => [part.type, part.value]));
      const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second));
      return asUtc - instant;
    };
    let instant = wall - offsetAt(wall);
    instant = wall - offsetAt(instant);
    return new Date(instant);
  }

  function utcStamp(date) {
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  }

  // Without a known time zone, times stay "floating": the calendar shows them as written.
  function floatingStamp(isoDate, minutesOfDay) {
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, Math.floor(minutesOfDay / 60), minutesOfDay % 60));
    return utcStamp(date).replace(/Z$/, "");
  }

  function describeTravel(travel) {
    if (!travel) return "";
    if (travel.basis === "same-site") return "At the same site as the previous stop.";
    if (travel.basis === "routed" && travel.mode === "walk") return `Getting there: about ${travel.minutes} min walk (${travel.summary}).`;
    if (travel.basis === "routed") return `Getting there: about ${travel.minutes} min by public transport (${travel.summary}; checked ${travel.checkedOn} for ${travel.conditions}).`;
    if (travel.basis === "estimate") return `Getting there: about ${travel.minutes} min walk (an estimate from the ${travel.distanceKm} km distance).`;
    if (travel.distanceKm != null) return `Getting there: about ${travel.distanceKm} km from the previous stop in a straight line; travel time not calculated.`;
    return "";
  }

  // One event per timed, named stop. Free-time blocks and untimed stops are left out (and counted),
  // so the calendar never shows invented commitments. An event lasts until the next timed stop
  // that day, within limits, or 90 minutes for the day's last stop.
  function buildCalendar(trip, { now = new Date() } = {}) {
    const days = (trip?.days || []).filter((day) => /^\d{4}-\d{2}-\d{2}$/.test(String(day.date || "")));
    if (!days.length) throw new Error("Add trip dates before exporting a calendar.");
    const timeZone = trip.timeZone || null;
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      `PRODID:${PRODUCT_ID}`,
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:${escapeText(trip.title || "Trip")}`
    ];
    if (timeZone) lines.push(`X-WR-TIMEZONE:${timeZone}`);
    const stamp = utcStamp(now);
    let eventCount = 0;
    let skippedFreeTime = 0;
    let skippedUntimed = 0;

    days.forEach((day) => {
      const stops = day.stops || [];
      stops.forEach((stop, index) => {
        if (stop.kind === "flexible") { skippedFreeTime += 1; return; }
        const start = toMinutes(stop.start);
        if (start === null) { skippedUntimed += 1; return; }
        const nextStart = stops.slice(index + 1).map((item) => toMinutes(item.start)).find((value) => value !== null && value > start);
        const duration = nextStart != null ? Math.min(nextStart - start, MAX_MINUTES) : DEFAULT_MINUTES;
        const end = start + duration;
        const startValue = timeZone ? utcStamp(zonedToUtc(day.date, start, timeZone)) : floatingStamp(day.date, start);
        const endValue = timeZone ? utcStamp(zonedToUtc(day.date, end, timeZone)) : floatingStamp(day.date, end);
        const snapshot = stop.place?.snapshot || null;
        const description = [
          stop.note,
          describeTravel(stop.travelFromPrevious),
          stop.place?.verification?.checkedOn ? `Location checked ${stop.place.verification.checkedOn} against the venue's own website.` : "",
          `Part of "${trip.title || "your trip"}" (${day.title}). Times are a plan, not a booking: confirm opening hours and reservations with the venue.`
        ].filter(Boolean).join("\n");

        lines.push("BEGIN:VEVENT");
        lines.push(`UID:${stop.id || `${day.id}-${index}`}.${trip.id || "trip"}@${UID_DOMAIN}`);
        lines.push(`DTSTAMP:${stamp}`);
        lines.push(`DTSTART:${startValue}`);
        lines.push(`DTEND:${endValue}`);
        lines.push(`SUMMARY:${escapeText(stop.title)}`);
        if (snapshot?.address || snapshot?.name) lines.push(`LOCATION:${escapeText(snapshot.address || snapshot.name)}`);
        if (Number.isFinite(snapshot?.lat) && Number.isFinite(snapshot?.lng)) lines.push(`GEO:${snapshot.lat};${snapshot.lng}`);
        if (stop.place?.verification?.sourceUrl) lines.push(`URL:${stop.place.verification.sourceUrl}`);
        lines.push(`DESCRIPTION:${escapeText(description)}`);
        lines.push("TRANSP:OPAQUE");
        lines.push("END:VEVENT");
        eventCount += 1;
      });
    });
    lines.push("END:VCALENDAR");
    return {
      ics: `${lines.map(foldLine).join("\r\n")}\r\n`,
      eventCount,
      skippedFreeTime,
      skippedUntimed,
      timeZone
    };
  }

  root.HB_TRIP_EXPORT = { buildCalendar, escapeText, foldLine, zonedToUtc };
})(typeof window !== "undefined" ? window : globalThis);
