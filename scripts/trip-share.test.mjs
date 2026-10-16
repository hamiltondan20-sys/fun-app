import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadShare() {
  const context = vm.createContext({
    window: {}, crypto: globalThis.crypto, Date, JSON, Math, Uint8Array, URL, Blob, Response, TextDecoder, TextEncoder,
    CompressionStream, DecompressionStream, btoa, atob
  });
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-format.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "scripts/trip-share.js"), "utf8"), context);
  context.window.btoa = btoa;
  context.window.atob = atob;
  return { format: context.window.HB_TRIP_FORMAT, share: context.window.HB_TRIP_SHARE };
}

function privateTrip(format) {
  return format.tripFromApp({
    id: "trp_private",
    appState: { destination: "Berlin, Germany", startDate: "2026-11-10", endDate: "2026-11-11", hotelName: "Hotel Secret", hotelArea: "Mitte", flightNumber: "LH123" },
    currentTrip: {
      title: "Berlin with Sam",
      days: [{ id: "day-1", title: "Museum day", area: "Museum Island", item: { timeline: [
        { id: "stp_a", time: "10:30 AM", title: "Neues Museum", copy: "Enter at the James Simon Galerie.",
          place: { id: "plc_berlin_neues-museum", snapshot: { name: "Neues Museum", area: "Museum Island", address: "Bodestrasse, Berlin", lat: 52.52, lng: 13.397 }, verification: { status: "location-checked", checkedOn: "2026-10-06", sourceUrl: "https://www.smb.museum/" } },
          travelFromPrevious: { distanceKm: 0.6, minutes: 10, mode: "walk", basis: "estimate" } },
        { id: "stp_b", time: "1:00 PM", title: "Lunch (your choice)", copy: "", kind: "flexible" }
      ] } }],
      unscheduledMustHaves: [{ label: "Food market", key: "foodmarket", type: "food", source: "traveler" }]
    },
    bookingItems: { "meal-dinner": { status: "booked", note: "Confirmation ABC-123, card ending 4242" } }
  });
}

test("share links round-trip the trip and never carry private data", async () => {
  const { format, share } = loadShare();
  const trip = privateTrip(format);
  const envelope = format.buildShareCopy(trip);
  const encoded = await share.encodeShare(envelope);
  assert.ok(encoded.startsWith("s1."));
  assert.match(encoded, /^s1\.[A-Za-z0-9_-]+$/, "URL-safe");
  const { trip: shared } = await share.decodeShare(`#share=${encoded}`);
  assert.equal(shared.title, "Berlin with Sam");
  assert.equal(shared.timeZone, "Europe/Berlin");
  assert.deepEqual(JSON.parse(JSON.stringify(shared.dates)), { start: "2026-11-10", end: "2026-11-11" });
  assert.equal(shared.days[0].stops[0].place.snapshot.address, "Bodestrasse, Berlin");
  assert.equal(shared.days[0].stops[0].place.verification.sourceUrl, "https://www.smb.museum/");
  assert.equal(shared.days[0].stops[1].kind, "flexible");
  assert.deepEqual(JSON.parse(JSON.stringify(shared.mustHaves)), [{ label: "Food market", scheduled: false }]);
  const everything = JSON.stringify(shared);
  ["Hotel Secret", "LH123", "ABC-123", "4242", "trp_private", "Mitte"].forEach((secret) => assert.ok(!everything.includes(secret), `${secret} leaked`));
  assert.equal(shared.stayArea, null, "the stay area is only shared when the sharer opts in");
  assert.equal(shared.days[0].area, "Museum Island");
  // Cleaning is idempotent: the receiver's pass changes nothing.
  assert.equal(JSON.stringify(share.cleanTrip(shared)), JSON.stringify(shared));
});

test("the stay area is shared only when chosen", async () => {
  const { format, share } = loadShare();
  const encoded = await share.encodeShare(format.buildShareCopy(privateTrip(format), { includeLogistics: true }));
  const { trip } = await share.decodeShare(encoded);
  assert.equal(trip.stayArea, "Mitte");
  assert.ok(!JSON.stringify(trip).includes("Hotel Secret"));
});

test("incoming links are untrusted: unsafe and unexpected values are dropped", async () => {
  const { share } = loadShare();
  const hostile = {
    format: "fullest-life-trip", schemaVersion: 2, kind: "share",
    trips: [{
      title: "<img src=x onerror=alert(1)>", timeZone: "javascript:alert(1)", bookings: [{ note: "secret" }], profile: { email: "x@y.z" },
      dates: { start: "not-a-date", end: "2026-11-11" },
      days: [{ date: "2026-11-10", title: "Day", stops: [
        { start: "25:99", title: "Stop", note: "ok", place: { id: "../../etc", snapshot: { address: "A", lat: 999 }, verification: { sourceUrl: "javascript:alert(1)", checkedOn: "2026-10-06" } }, travelFromPrevious: { basis: "teleport" } },
        { start: "09:00", title: "" }
      ] }]
    }]
  };
  const bytes = new Uint8Array(await new Response(new Blob([JSON.stringify(hostile)]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer());
  const encoded = `s1.${Buffer.from(bytes).toString("base64url")}`;
  const { trip } = await share.decodeShare(encoded);
  assert.equal(trip.title, "<img src=x onerror=alert(1)>", "text is kept as text; the page escapes it when rendering");
  assert.equal(trip.timeZone, null);
  assert.equal(trip.dates.start, null);
  const stop = trip.days[0].stops[0];
  assert.equal(stop.start, null);
  assert.equal(stop.place.id, null);
  assert.equal(stop.place.snapshot.lat, null);
  assert.equal(stop.place.verification.sourceUrl, null, "only https links survive");
  assert.equal(stop.travelFromPrevious, null);
  assert.equal(trip.days[0].stops.length, 1, "stops without a title are dropped");
  const everything = JSON.stringify(trip);
  assert.ok(!everything.includes("secret") && !everything.includes("x@y.z"), "fields outside the allow-list never come through");
});

test("damaged, foreign and oversized links fail with a clear message", async () => {
  const { share } = loadShare();
  await assert.rejects(share.decodeShare("hello"), /not one this planner recognises/);
  await assert.rejects(share.decodeShare("s1.!!!"), /damaged/);
  await assert.rejects(share.decodeShare("s1.AAAA"), /damaged/);
  const foreign = Buffer.from(new Uint8Array(await new Response(new Blob([JSON.stringify({ format: "other" })]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer())).toString("base64url");
  await assert.rejects(share.decodeShare(`s1.${foreign}`), /does not contain a shared trip/);
  // A small link that inflates past the limit is refused before it is parsed.
  const bomb = Buffer.from(new Uint8Array(await new Response(new Blob([" ".repeat(3000000)]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer())).toString("base64url");
  assert.ok(bomb.length < 10000);
  await assert.rejects(share.decodeShare(`s1.${bomb}`), /too large/);
  await assert.rejects(share.decodeShare(`s1.${"A".repeat(share.MAX_ENCODED_CHARS)}`), /too large/);
});

test("a full seven-day trip makes a link of practical length", async () => {
  const { format, share } = loadShare();
  const day = (index) => ({ id: `day-${index}`, title: `Day ${index}`, area: "Area", item: { timeline: Array.from({ length: 5 }, (_, stopIndex) => ({
    id: `stp_${index}_${stopIndex}`, time: `${9 + stopIndex}:00 AM`.replace(/^1[3-9]/, (h) => String(Number(h) - 12)), title: `Stop ${index}.${stopIndex} with a realistic name`,
    copy: "A sentence or two of guidance about this stop, its entrance and what to book ahead.",
    place: { id: `plc_paris_stop-${index}-${stopIndex}`, snapshot: { name: "Place", area: "Area", address: "12 rue Example, 75001 Paris", lat: 48.86, lng: 2.34 }, verification: { status: "location-checked", checkedOn: "2026-10-14", sourceUrl: "https://example.org/visit" } },
    travelFromPrevious: { distanceKm: 1.2, minutes: 18, mode: "transit", basis: "routed", summary: "Metro line 1, with about 0.5 km of walking in total", conditions: "Wednesday 4 Nov 2026, departing about 10:00", checkedOn: "2026-10-14", source: "Transitous" }
  })) } });
  const trip = format.tripFromApp({ appState: { destination: "Paris, France", startDate: "2026-11-09" }, currentTrip: { title: "Paris", days: Array.from({ length: 7 }, (_, i) => day(i + 1)) } });
  const encoded = await share.encodeShare(format.buildShareCopy(trip));
  assert.ok(encoded.length < 16000, `link payload is ${encoded.length} characters`);
  const { trip: shared } = await share.decodeShare(encoded);
  assert.equal(shared.days.length, 7);
  assert.equal(shared.days[6].stops.length, 5);
});
