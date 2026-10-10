// Portable trip format v2 (see docs/trip-format-v2.md).
// Pure functions only: no DOM, no storage. Loaded before app-trip.js and unit-tested in Node.
(function initializeTripFormat(root) {
  const FORMAT = "fullest-life-trip";
  const SCHEMA_VERSION = 2;

  // Pilot cities plus common destinations. Anything else is "unknown" rather than guessed.
  const CITY_TIME_ZONES = {
    paris: "Europe/Paris", london: "Europe/London", berlin: "Europe/Berlin", rome: "Europe/Rome",
    singapore: "Asia/Singapore", "hong kong": "Asia/Hong_Kong", tokyo: "Asia/Tokyo",
    "new york": "America/New_York", "new york city": "America/New_York", lisbon: "Europe/Lisbon",
    barcelona: "Europe/Madrid", madrid: "Europe/Madrid", amsterdam: "Europe/Amsterdam",
    vienna: "Europe/Vienna", munich: "Europe/Berlin", dublin: "Europe/Dublin",
    edinburgh: "Europe/London", boston: "America/New_York", hanoi: "Asia/Bangkok",
    cusco: "America/Lima", bangkok: "Asia/Bangkok", dubai: "Asia/Dubai", istanbul: "Europe/Istanbul",
    athens: "Europe/Athens", "los angeles": "America/Los_Angeles", miami: "America/New_York",
    seoul: "Asia/Seoul", sydney: "Australia/Sydney"
  };

  function newId(prefix) {
    const bytes = new Uint8Array(8);
    if (root.crypto?.getRandomValues) root.crypto.getRandomValues(bytes);
    else bytes.forEach((_, index) => { bytes[index] = Math.floor(Math.random() * 256); });
    return `${prefix}_${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  }

  function clone(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  // "9:00 AM" -> "09:00"; anything unparseable -> null (an untimed stop, never an invented time).
  function toClockTime(value) {
    const match = String(value || "").trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
    if (!match) return /^\d{2}:\d{2}$/.test(String(value || "")) ? value : null;
    let hours = Number(match[1]) % 12;
    if (match[3].toUpperCase() === "PM") hours += 12;
    return `${String(hours).padStart(2, "0")}:${match[2] || "00"}`;
  }

  // "09:00" -> "9:00 AM"; null stays null.
  function toDisplayTime(value) {
    const match = String(value || "").match(/^(\d{2}):(\d{2})$/);
    if (!match) return null;
    const hours = Number(match[1]);
    return `${hours % 12 || 12}:${match[2]} ${hours >= 12 ? "PM" : "AM"}`;
  }

  function parseDestination(value) {
    const parts = String(value || "").split(",").map((part) => part.trim()).filter(Boolean);
    return { name: parts[0] || "", country: parts.slice(1).join(", ") };
  }

  function getTimeZone(destinationName) {
    const zone = CITY_TIME_ZONES[String(destinationName || "").toLowerCase()];
    return zone ? { timeZone: zone, timeZoneSource: "destination" } : { timeZone: null, timeZoneSource: "unknown" };
  }

  // Give every day and stop a stable id. Existing ids are kept, so this is safe to run repeatedly.
  function ensureIds(trip) {
    if (!trip || !Array.isArray(trip.days)) return trip;
    trip.days.forEach((day) => {
      if (!day.id) day.id = newId("day");
      (day.item?.timeline || []).forEach((step) => {
        if (step && !step.id) step.id = newId("stp");
      });
    });
    return trip;
  }

  function dayToV2(day, isoDate) {
    const display = clone(day);
    delete display.protectedAnchors;
    if (display.item) delete display.item.timeline;
    return {
      id: day.id,
      date: isoDate || null,
      title: day.title || "",
      area: { label: day.area || "", confirmed: day.areaConfirmed !== false },
      stops: (day.item?.timeline || []).map((step) => ({
        id: step.id,
        start: toClockTime(step.time),
        kind: step.kind || null,
        title: step.title || "",
        note: step.copy || "",
        place: step.place ? clone(step.place) : null,
        travelFromPrevious: step.travelFromPrevious ? clone(step.travelFromPrevious) : null
      })),
      feedback: day.qualityAdjustment?.feedback || null,
      display
    };
  }

  function dayFromV2(day) {
    const internal = clone(day.display) || { id: day.id, title: day.title, area: day.area?.label || "" };
    internal.id = day.id;
    internal.area = day.area?.label ?? internal.area;
    internal.areaConfirmed = day.area?.confirmed !== false;
    internal.item = internal.item || { title: day.title, body: "", fit: "", label: "Personalized", alternatives: [], alternativeIndex: 0 };
    internal.item.timeline = (day.stops || []).map((stop) => {
      const step = { id: stop.id, time: toDisplayTime(stop.start) || "Flexible", title: stop.title, copy: stop.note || "" };
      if (stop.kind) step.kind = stop.kind;
      if (stop.place) step.place = clone(stop.place);
      if (stop.travelFromPrevious) step.travelFromPrevious = clone(stop.travelFromPrevious);
      return step;
    });
    return internal;
  }

  function collectMustHaves(days, unscheduled) {
    const byKey = new Map();
    (days || []).forEach((day) => {
      (day.protectedAnchors || []).forEach((anchor) => {
        const key = anchor.key || anchor.label;
        const entry = byKey.get(key) || { id: `mh_${key}`, label: anchor.label, key: anchor.key, type: anchor.type, source: anchor.source, scheduled: [] };
        const stop = (day.item?.timeline || []).find((step) => anchor.stepTitle && step.title === anchor.stepTitle);
        entry.scheduled.push({ dayId: day.id, stopId: stop?.id || null });
        byKey.set(key, entry);
      });
    });
    (unscheduled || []).forEach((anchor) => {
      const key = anchor.key || anchor.label;
      if (!byKey.has(key)) byKey.set(key, { id: `mh_${key}`, label: anchor.label, key: anchor.key, type: anchor.type, source: anchor.source, scheduled: [] });
    });
    return [...byKey.values()];
  }

  // Rebuild the per-day anchors the app renders from the trip-level must-have list.
  function applyMustHaves(days, mustHaves) {
    days.forEach((day) => { day.protectedAnchors = []; });
    const unscheduled = [];
    (mustHaves || []).forEach((mustHave) => {
      const anchor = { label: mustHave.label, key: mustHave.key, type: mustHave.type, source: mustHave.source };
      if (!mustHave.scheduled?.length) {
        unscheduled.push(anchor);
        return;
      }
      mustHave.scheduled.forEach(({ dayId, stopId }) => {
        const day = days.find((item) => item.id === dayId);
        if (!day) return;
        const step = (day.item?.timeline || []).find((item) => item.id === stopId);
        day.protectedAnchors.push({ ...anchor, scheduled: true, stepTitle: step?.title || "", stepTime: step?.time || "" });
      });
    });
    return unscheduled;
  }

  function versionsToV2(versions, startDate) {
    return (versions || []).map((version) => {
      const versionTrip = ensureIds(clone(version.trip) || { days: [] });
      const display = clone(version);
      delete display.trip;
      display.tripDisplay = clone(versionTrip);
      delete display.tripDisplay.days;
      return {
        id: version.id || newId("ver"),
        name: version.name || "Saved version",
        savedAt: version.savedAt || "",
        days: (versionTrip.days || []).map((day, index) => dayToV2(day, addDays(startDate, index))),
        display
      };
    });
  }

  // "2026-11-06" + 2 -> "2026-11-08"; null when the start date is unknown.
  function addDays(isoDate, offset) {
    const match = String(isoDate || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + offset));
    return date.toISOString().slice(0, 10);
  }

  function versionsFromV2(versions) {
    return (versions || []).map((version) => ({
      ...(clone(version.display) || {}),
      id: version.id,
      name: version.name,
      savedAt: version.savedAt,
      trip: { ...(clone(version.display?.tripDisplay) || {}), days: (version.days || []).map(dayFromV2) }
    }));
  }

  function bookingsToV2(bookingItems, mustHaves) {
    return Object.entries(bookingItems || {}).map(([id, item]) => {
      const anchorKey = id.replace(/^(meal|ticket)-/, "");
      const scheduled = (mustHaves || []).find((mustHave) => mustHave.key === anchorKey)?.scheduled?.[0];
      return { id, status: item?.status || "not-started", note: item?.note || "", updatedAt: item?.savedAt || "", stopId: scheduled?.stopId || null };
    });
  }

  function bookingsFromV2(bookings) {
    return Object.fromEntries((bookings || []).map((booking) => [booking.id, { status: booking.status, note: booking.note, savedAt: booking.updatedAt }]));
  }

  // App state (planner inputs + generated trip) -> one portable Trip.
  function tripFromApp({ id, appState = {}, currentTrip, alternateTrips = [], bookingItems = {}, updatedAt } = {}) {
    const trip = ensureIds(clone(currentTrip) || { days: [] });
    const destination = parseDestination(appState.destination);
    const mustHaves = collectMustHaves(trip.days, trip.unscheduledMustHaves);
    const display = clone(trip);
    delete display.days;
    delete display.unscheduledMustHaves;
    return {
      id: id || newId("trp"),
      title: trip.title || `${destination.name || "My"} trip`,
      destination,
      ...getTimeZone(destination.name),
      dates: { start: appState.startDate || null, end: appState.endDate || null, flexible: Boolean(appState.datesFlexible) },
      travelers: { adults: Number(appState.adults) || 1, children: Number(appState.children) || 0, pets: appState.pets || "No pets" },
      preferences: { styles: clone(appState.styles || []), pace: appState.pace || "", budget: appState.budget || "" },
      mustHaves,
      days: (trip.days || []).map((day, index) => dayToV2(day, addDays(appState.startDate, index))),
      logistics: {
        flights: { mode: appState.flightMode || "", preference: appState.flightPreference || "", airline: appState.flightAirline || "", number: appState.flightNumber || "", arrival: appState.arrivalFlight || null, departure: appState.departureFlight || null },
        stay: { name: appState.hotelName || "", area: appState.hotelArea || "", checkIn: appState.hotelCheckIn || null, checkOut: appState.hotelCheckOut || null }
      },
      bookings: bookingsToV2(bookingItems, mustHaves),
      versions: versionsToV2(alternateTrips, appState.startDate),
      inputs: clone(appState),
      display,
      updatedAt: updatedAt || new Date().toISOString()
    };
  }

  // Portable Trip -> what the app renders and stores today.
  function tripToApp(trip) {
    const days = (trip.days || []).map(dayFromV2);
    const unscheduledMustHaves = applyMustHaves(days, trip.mustHaves);
    const appState = clone(trip.inputs) || {};
    appState.destination = appState.destination || [trip.destination?.name, trip.destination?.country].filter(Boolean).join(", ");
    appState.startDate = trip.dates?.start ?? appState.startDate;
    appState.endDate = trip.dates?.end ?? appState.endDate;
    return {
      appState,
      currentTrip: { ...(clone(trip.display) || {}), title: trip.title, days, unscheduledMustHaves },
      alternateTrips: versionsFromV2(trip.versions),
      bookingItems: bookingsFromV2(trip.bookings)
    };
  }

  function buildEnvelope({ kind = "backup", trips = [], activeTripId = null, profile = null, appBuild = "" } = {}) {
    const envelope = { format: FORMAT, schemaVersion: SCHEMA_VERSION, kind, exportedAt: new Date().toISOString(), appBuild, activeTripId: activeTripId || trips[0]?.id || null, trips };
    if (kind !== "share" && profile) envelope.profile = clone(profile);
    return envelope;
  }

  // v1 "local-account-backup" -> v2 envelope. Mirrors the tested v1 restore rules.
  function upgradeV1(payload) {
    const draft = payload.storage?.draft || {};
    const exportVersions = Array.isArray(payload.alternateTrips) ? payload.alternateTrips : [];
    const versions = [...exportVersions];
    (Array.isArray(draft.alternateTrips) ? draft.alternateTrips : []).forEach((version) => {
      if (!versions.some((item) => item?.id && item.id === version?.id)) versions.push(version);
    });
    const trip = tripFromApp({
      appState: draft.appState || payload.appState || {},
      currentTrip: draft.currentTrip || payload.currentTrip || draft.liveDraftTrip || payload.liveDraftTrip,
      alternateTrips: versions,
      bookingItems: payload.storage?.booking?.items || payload.bookingItems || {},
      updatedAt: payload.exportedAt
    });
    return buildEnvelope({ kind: "backup", trips: [trip], profile: payload.storage?.profile || payload.tripProfile || null });
  }

  // Accept v1 or v2; return a v2 envelope or throw a message a visitor can act on.
  function readBackup(payload) {
    if (!payload || typeof payload !== "object") throw new Error("Backup file is empty or unreadable.");
    if (payload.format === FORMAT) {
      if (Number(payload.schemaVersion) > SCHEMA_VERSION) throw new Error("This backup was made by a newer version of the planner. Reload the page and try again.");
      if (!Array.isArray(payload.trips)) throw new Error("This backup has no trips in it.");
      return payload;
    }
    if (!payload.format && (!payload.type || payload.type === "local-account-backup")) return upgradeV1(payload);
    throw new Error("This does not look like a The Fullest Life Travel backup.");
  }

  // Shared copies are built from an allow-list, frozen at creation, and never carry private data.
  function buildShareCopy(trip, { versionId = null, includeLogistics = false } = {}) {
    const version = versionId ? (trip.versions || []).find((item) => item.id === versionId) : null;
    if (versionId && !version) throw new Error("That saved version no longer exists.");
    const days = (version ? version.days : trip.days).map((day) => ({
      id: day.id,
      date: day.date,
      title: day.title,
      area: clone(day.area),
      stops: day.stops.map((stop) => ({ id: stop.id, start: stop.start, kind: stop.kind, title: stop.title, note: stop.note, place: clone(stop.place), travelFromPrevious: clone(stop.travelFromPrevious) }))
    }));
    const shared = {
      id: newId("shr"),
      sharedFrom: { tripId: trip.id, versionId: version?.id || null, versionName: version?.name || null },
      label: "Shared copy",
      title: trip.title,
      destination: clone(trip.destination),
      timeZone: trip.timeZone,
      timeZoneSource: trip.timeZoneSource,
      dates: clone(trip.dates),
      mustHaves: (trip.mustHaves || []).map((mustHave) => ({ id: mustHave.id, label: mustHave.label, type: mustHave.type, scheduled: clone(mustHave.scheduled) })),
      days,
      createdAt: new Date().toISOString()
    };
    if (includeLogistics) shared.logistics = { stay: { area: trip.logistics?.stay?.area || "" } };
    return buildEnvelope({ kind: "share", trips: [shared] });
  }

  // Add imported trips to a collection. Never overwrites silently: "keep-both" re-ids and
  // retitles a clashing trip; "replace" swaps it in place and reports that it did.
  function mergeIntoCollection(collection, incomingTrips, { onConflict = "keep-both" } = {}) {
    const next = { activeTripId: collection?.activeTripId || null, trips: clone(collection?.trips || []) };
    const report = { added: [], replaced: [], keptBoth: [] };
    (incomingTrips || []).forEach((trip) => {
      const existingIndex = next.trips.findIndex((item) => item.id === trip.id);
      if (existingIndex === -1) {
        next.trips.push(clone(trip));
        report.added.push(trip.id);
      } else if (onConflict === "replace") {
        next.trips[existingIndex] = clone(trip);
        report.replaced.push(trip.id);
      } else {
        const copy = { ...clone(trip), id: newId("trp"), title: `${trip.title} (imported)` };
        next.trips.push(copy);
        report.keptBoth.push(copy.id);
      }
    });
    if (!next.activeTripId && next.trips.length) next.activeTripId = next.trips[0].id;
    return { collection: next, report };
  }

  root.HB_TRIP_FORMAT = {
    FORMAT, SCHEMA_VERSION, newId, toClockTime, toDisplayTime, ensureIds,
    tripFromApp, tripToApp, buildEnvelope, upgradeV1, readBackup, buildShareCopy, mergeIntoCollection
  };
})(typeof window !== "undefined" ? window : globalThis);
