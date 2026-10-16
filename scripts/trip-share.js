// Share links for portable trips (docs/trip-format-v2.md, "Share links"). A share link carries a
// frozen, allow-listed snapshot in the URL fragment (#share=...), compressed and base64url-encoded.
// Fragments are never sent to the web server. Incoming links are untrusted: decoding enforces size
// limits and rebuilds the trip from an allow-list, keeping only well-formed values.
// No DOM, no storage. Loaded before app-trip.js and unit-tested in Node.
(function initializeTripShare(root) {
  const FORMAT = "fullest-life-trip";
  const PREFIX = "s1.";
  const MAX_ENCODED_CHARS = 200000;
  const MAX_JSON_BYTES = 1000000;
  const LIMITS = { days: 31, stops: 24, mustHaves: 30, text: 240, note: 800 };

  function toBase64Url(bytes) {
    let binary = "";
    for (let index = 0; index < bytes.length; index += 0x8000) binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
    return root.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function fromBase64Url(text) {
    if (!/^[A-Za-z0-9_-]*$/.test(text)) throw new Error("This share link is damaged.");
    const binary = root.atob(text.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((text.length + 3) % 4));
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  }

  async function compress(text) {
    const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  // Stops reading once the output passes the limit, so a hostile link can't exhaust memory.
  async function decompress(bytes, limit) {
    const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader();
    const chunks = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > limit) {
        await reader.cancel();
        throw new Error("This share link is too large to open.");
      }
      chunks.push(value);
    }
    const out = new Uint8Array(total);
    let offset = 0;
    chunks.forEach((chunk) => { out.set(chunk, offset); offset += chunk.length; });
    return new TextDecoder().decode(out);
  }

  // ---- allow-list sanitizers: anything unexpected is dropped, never passed through ----
  const text = (value, max = LIMITS.text) => (typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "");
  const isoDate = (value) => (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null);
  const clock = (value) => (typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? value : null);
  const number = (value, min, max) => (typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : null);
  const httpsUrl = (value) => {
    if (typeof value !== "string" || value.length > 500) return null;
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.href : null;
    } catch (error) {
      return null;
    }
  };
  const timeZone = (value) => (typeof value === "string" && /^[A-Za-z]+(?:\/[A-Za-z0-9_+-]+){1,2}$/.test(value) ? value : null);

  function cleanPlace(place) {
    if (!place || typeof place !== "object") return null;
    const id = typeof place.id === "string" && /^plc_[a-z0-9_-]{1,80}$/.test(place.id) ? place.id : null;
    const snapshot = place.snapshot || {};
    const verification = place.verification || {};
    return {
      id,
      snapshot: {
        name: text(snapshot.name),
        area: text(snapshot.area),
        address: text(snapshot.address),
        lat: number(snapshot.lat, -90, 90),
        lng: number(snapshot.lng, -180, 180)
      },
      verification: {
        status: verification.status === "location-checked" ? "location-checked" : null,
        checkedOn: isoDate(verification.checkedOn),
        sourceUrl: httpsUrl(verification.sourceUrl)
      }
    };
  }

  function cleanTravel(travel) {
    if (!travel || typeof travel !== "object") return null;
    const basis = ["routed", "estimate", "same-site", "straight-line"].includes(travel.basis) ? travel.basis : null;
    if (!basis) return null;
    return {
      basis,
      mode: ["walk", "transit"].includes(travel.mode) ? travel.mode : null,
      minutes: number(travel.minutes, 0, 600),
      distanceKm: number(travel.distanceKm, 0, 20000),
      summary: text(travel.summary),
      conditions: text(travel.conditions),
      checkedOn: isoDate(travel.checkedOn),
      source: text(travel.source)
    };
  }

  // Accepts a share copy from trip-format.js or the compact form it encodes to, so cleaning twice
  // (once by the sender, once by the receiver) gives the same result.
  function cleanTrip(trip) {
    if (!trip || typeof trip !== "object") throw new Error("This share link has no trip in it.");
    const days = Array.isArray(trip.days) ? trip.days.slice(0, LIMITS.days) : [];
    return {
      title: text(trip.title) || "Shared trip",
      label: "Shared copy",
      sharedFrom: { versionName: text(trip.sharedFrom?.versionName) || null },
      destination: { name: text(trip.destination?.name), country: text(trip.destination?.country) },
      timeZone: timeZone(trip.timeZone),
      dates: { start: isoDate(trip.dates?.start), end: isoDate(trip.dates?.end) },
      mustHaves: (Array.isArray(trip.mustHaves) ? trip.mustHaves.slice(0, LIMITS.mustHaves) : []).map((item) => ({
        label: text(item?.label, 120),
        scheduled: item?.scheduled === true || (Array.isArray(item?.scheduled) && item.scheduled.length > 0)
      })).filter((item) => item.label),
      stayArea: text(trip.stayArea ?? trip.logistics?.stay?.area) || null,
      days: days.map((day) => ({
        date: isoDate(day?.date),
        title: text(day?.title),
        area: text(typeof day?.area === "string" ? day.area : day?.area?.label),
        stops: (Array.isArray(day?.stops) ? day.stops.slice(0, LIMITS.stops) : []).map((stop) => ({
          start: clock(stop?.start),
          kind: stop?.kind === "flexible" ? "flexible" : null,
          title: text(stop?.title),
          note: text(stop?.note, LIMITS.note),
          place: cleanPlace(stop?.place),
          travelFromPrevious: cleanTravel(stop?.travelFromPrevious)
        })).filter((stop) => stop.title)
      }))
    };
  }

  // Shrink a share envelope before encoding: only what the shared view renders.
  function compactEnvelope(envelope) {
    const trip = envelope?.trips?.[0];
    if (!trip) throw new Error("Nothing to share.");
    const cleaned = cleanTrip(trip);
    return { format: FORMAT, schemaVersion: 2, kind: "share", exportedAt: envelope.exportedAt, trips: [cleaned] };
  }

  async function encodeShare(envelope) {
    const compact = compactEnvelope(envelope);
    const encoded = PREFIX + toBase64Url(await compress(JSON.stringify(compact)));
    if (encoded.length > MAX_ENCODED_CHARS) throw new Error("This trip is too large to share as a link.");
    return encoded;
  }

  // "#share=s1.xxx" or "s1.xxx" -> a sanitized shared trip, or a message a visitor can act on.
  async function decodeShare(value) {
    const raw = String(value || "").replace(/^#?share=/, "");
    if (!raw.startsWith(PREFIX)) throw new Error("This share link is not one this planner recognises.");
    if (raw.length > MAX_ENCODED_CHARS) throw new Error("This share link is too large to open.");
    let parsed;
    try {
      parsed = JSON.parse(await decompress(fromBase64Url(raw.slice(PREFIX.length)), MAX_JSON_BYTES));
    } catch (error) {
      throw new Error(/too large/.test(error?.message) ? error.message : "This share link is damaged or incomplete. Ask for the link again.");
    }
    if (parsed?.format !== FORMAT || parsed?.kind !== "share") throw new Error("This link does not contain a shared trip.");
    if (Number(parsed.schemaVersion) > 2) throw new Error("This trip was shared from a newer version of the planner. Reload the page and try again.");
    if (!Array.isArray(parsed.trips) || parsed.trips.length !== 1) throw new Error("This share link has no trip in it.");
    return { exportedAt: typeof parsed.exportedAt === "string" ? parsed.exportedAt.slice(0, 40) : null, trip: cleanTrip(parsed.trips[0]) };
  }

  root.HB_TRIP_SHARE = { encodeShare, decodeShare, cleanTrip, PREFIX, MAX_ENCODED_CHARS };
})(typeof window !== "undefined" ? window : globalThis);
