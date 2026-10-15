// Builds data/places.js — the shared places registry (docs/trip-format-v2.md, "Places registry").
// Each entry combines a reviewed source record from data/city-source-ledger.js with coordinates
// looked up in OpenStreetMap. Nothing here claims more than was checked: verification records
// say what was checked, when, and against which source.
//
//   node scripts/build-places.mjs
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerContext = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(root, "data/city-source-ledger.js"), "utf8"), ledgerContext);
const ledger = ledgerContext.window.HB_DATA?.citySourceLedger;
if (!ledger) throw new Error("Could not read data/city-source-ledger.js");

const OSM = { source: "OpenStreetMap Nominatim", licence: "ODbL 1.0", attribution: "© OpenStreetMap contributors", retrievedOn: "2026-10-10" };

// city, ledger key, kind, address (from the reviewed record), area, coordinates (OSM lookup on 2026-10-10) and what the point represents.
const PLACES = [
  ["berlin", "Neues Museum", "landmark", "James Simon Galerie entrance, Bodestrasse, Berlin", "Museum Island", 52.51989, 13.39744, "node/13972036398", "named feature: James Simon Galerie, the published visitor entrance"],
  ["berlin", "Berlin Wall Memorial", "landmark", "Bernauer Strasse, Berlin (outdoor memorial site)", "Bernauer Strasse", 52.53582, 13.39085, "way/389400710", "named feature: memorial grounds on Bernauer Strasse (centre of the outdoor site)"],
  ["berlin", "Museum fuer Naturkunde Berlin", "landmark", "Invalidenstrasse 43, Berlin", "Bernauer Strasse", 52.53049, 13.37912, "node/538692583", "named feature at Invalidenstrasse 43"],
  ["berlin", "DDR Museum", "landmark", "Karl-Liebknecht-Strasse 1, Berlin", "Museum Island", 52.51944, 13.40224, "way/175149971", "named feature at Karl-Liebknecht-Strasse 1"],
  ["berlin", "Zoo Berlin", "landmark", "Hardenbergplatz 8, Berlin", "City West", 52.50845, 13.33923, "way/9393789", "named feature at Hardenbergplatz 8 (zoo grounds)"],
  ["berlin", "East Side Gallery", "scenic", "Muehlenstrasse, Berlin", "Friedrichshain", 52.50461, 13.44154, "way/1262337287", "named feature: the gallery wall along Muehlenstrasse (centre point of a 1.3 km wall)"],
  ["berlin", "Charlottenburg Palace (Old Palace)", "landmark", "Spandauer Damm 10-22, Berlin", "Charlottenburg", 52.52064, 13.29271, "way/186517395", "named feature at Spandauer Damm 10"],
  ["berlin", "House of Small Wonder (Auguststrasse)", "cafe", "Auguststrasse 11-13, Berlin", "Scheunenviertel", 52.52646, 13.39434, "node/1552051247", "address point Auguststrasse 11 (not the closed Johannisstrasse branch)"],
  ["berlin", "THE BARN (Mitte)", "cafe", "Auguststrasse 58, Berlin", "Scheunenviertel", 52.52745, 13.39813, "node/3868790051", "named feature at Auguststrasse 58"],
  ["berlin", "Zeit fuer Brot (Alte Schoenhauser Strasse)", "cafe", "Alte Schoenhauser Strasse 4, Berlin", "Scheunenviertel", 52.52798, 13.40853, "way/395235643", "address point Alte Schoenhauser Strasse 4"],
  ["berlin", "Restaurant Tim Raue", "meal", "Rudi-Dutschke-Strasse 26, Berlin", "Kreuzberg", 52.50694, 13.39136, "node/1288186062", "address point Rudi-Dutschke-Strasse 26; the OSM feature there carries a different business name, so this fixes the address, not the listing"],
  ["berlin", "Green Door Bar", "meal", "Winterfeldtstrasse 50, Berlin", "Schoeneberg", 52.49704, 13.35293, "node/1870419341", "named feature at Winterfeldtstrasse 50"],
  ["berlin", "Markthalle Neun", "meal", "Eisenbahnstrasse 42/43, Berlin", "Kreuzberg", 52.50203, 13.43203, "node/673608922", "address point Eisenbahnstrasse 42"],
  ["berlin", "Nobelhart & Schmutzig", "meal", "Friedrichstrasse 218, Berlin", "Kreuzberg", 52.50539, 13.39054, "node/3718480033", "named feature at Friedrichstrasse 218"],
  ["berlin", "Tempelhofer Feld", "scenic", "Several entrances; see the operator's entrance map", "Tempelhof", 52.47442, 13.40260, "relation/7317281", "centre of a large park with several entrances; use the operator's entrance map, not this point"],
  ["berlin", "Deutsches Technikmuseum", "landmark", "Trebbiner Strasse 9, Berlin", "Kreuzberg", 52.49718, 13.37593, "way/31622818", "named feature at Trebbiner Strasse 9"],
  // Singapore: OSM lookup on 2026-10-12.
  ["singapore", "National Gallery Singapore", "landmark", "1 St Andrew's Road, Singapore", "Civic District", 1.29026, 103.85147, "node/4759240362", "named feature at 1 St Andrew's Road"],
  ["singapore", "National Kitchen by Violet Oon", "meal", "1 St Andrew's Road #02-01, Singapore (inside National Gallery Singapore, City Hall wing)", "Civic District", 1.29026, 103.85147, "node/4759240362", "the Gallery's named feature; the restaurant is inside it, City Hall wing level 2"],
  ["singapore", "ArtScience Museum", "landmark", "6 Bayfront Avenue, Singapore", "Marina Bay", 1.28614, 103.85923, "node/11361584770", "named feature at 6 Bayfront Avenue"],
  ["singapore", "Gardens by the Bay outdoor gardens", "scenic", "18 Marina Gardens Drive, Singapore (free outdoor gardens and Supertree Grove)", "Marina Bay", 1.28200, 103.86394, "way/171979084", "named feature: Supertree Grove, at the centre of the free outdoor gardens (not the paid conservatories)"],
  ["singapore", "Singapore Botanic Gardens", "scenic", "1 Cluny Road, Singapore (enter at Tanglin Gate)", "Tanglin", 1.31463, 103.81562, "way/47257476", "centre of a garden about 2.5 km long; distances use Tanglin Gate"],
  ["singapore", "Candlenut", "meal", "17A Dempsey Road, Singapore", "Dempsey", 1.30581, 103.81003, "node/6370600536", "named feature at 17A Dempsey Road"],
  ["singapore", "Singapore Zoo", "landmark", "80 Mandai Lake Road, Singapore", "Mandai", 1.40371, 103.79404, "way/262885931", "zoo grounds; distances use the main entrance at Entrance Plaza"],
  ["singapore", "Plain Vanilla (Tiong Bahru)", "cafe", "1D Yong Siak Street, Singapore", "Tiong Bahru", 1.28228, 103.83049, "way/481650008", "named feature at 1D Yong Siak Street (not the Holland Village branch)"],
  ["singapore", "Tiong Bahru Bakery (Eng Hoon Street)", "cafe", "56 Eng Hoon Street #01-70, Singapore", "Tiong Bahru", 1.28445, 103.83365, "node/3100404287", "named feature at 56 Eng Hoon Street"],
  ["singapore", "JUMBO Seafood (Riverside Point)", "meal", "30 Merchant Road #01-01/02, Riverside Point, Singapore", "Clarke Quay", 1.28890, 103.84469, "node/3806234846", "named feature at Riverside Point, 30 Merchant Road (not another JUMBO branch)"],
  ["singapore", "Jigger & Pony", "meal", "Amara Singapore, 165 Tanjong Pagar Road, Singapore", "Tanjong Pagar", 1.27494, 103.84366, "node/4302905385", "the hotel's named feature; the bar is inside Amara Singapore"],
  ["singapore", "ATLAS", "meal", "Parkview Square, 600 North Bridge Road, Singapore", "Bugis", 1.30010, 103.85771, "node/6033094985", "named feature at Parkview Square, 600 North Bridge Road"],
  // Hong Kong: OSM lookup on 2026-10-14.
  ["hongkong", "PMQ", "landmark", "35 Aberdeen Street, Central, Hong Kong", "Central", 22.28333, 114.15184, "node/7057630219", "named feature at 35 Aberdeen Street"],
  ["hongkong", "Duddell's (Central)", "meal", "Level 3 & 4, 1 Duddell Street, Central, Hong Kong", "Central", 22.28024, 114.15725, "way/295407529", "the building at 1 Duddell Street"],
  ["hongkong", "Lung King Heen", "meal", "4/F, Four Seasons Hotel Hong Kong, 8 Finance Street, Central", "Central", 22.28647, 114.15691, "node/11815493063", "named feature in the Four Seasons Hotel, 8 Finance Street"],
  ["hongkong", "ARGO", "meal", "1/F, Four Seasons Hotel Hong Kong, 8 Finance Street, Central", "Central", 22.28663, 114.15666, "way/148554935", "the Four Seasons Hotel at 8 Finance Street; the bar is on 1/F"],
  ["hongkong", "Star Ferry (Central-Tsim Sha Tsui)", "scenic", "Tsim Sha Tsui Star Ferry Pier, Salisbury Road, Kowloon", "Tsim Sha Tsui", 22.29354, 114.16799, "relation/14941144", "named feature: Tsim Sha Tsui Star Ferry Pier, where this plan boards"],
  ["hongkong", "noc (Tsim Sha Tsui, Sun Arcade)", "cafe", "Shop 02, UG/F, The Sun Arcade, 28 Canton Road, Tsim Sha Tsui", "Tsim Sha Tsui", 22.29669, 114.16960, "way/693737390", "the Sun Arcade at 28 Canton Road (not the Tsim Sha Tsui East branch)"],
  ["hongkong", "M+", "landmark", "38 Museum Drive, West Kowloon Cultural District, Kowloon", "West Kowloon", 22.30105, 114.15915, "way/549702815", "named feature: M+ building"],
  ["hongkong", "Bakehouse (Wan Chai)", "cafe", "G/F, 14 Tai Wong Street East, Wan Chai, Hong Kong", "Wan Chai", 22.27587, 114.17140, "node/6788818059", "named feature on Tai Wong Street East (not another branch)"]
];

const CITY_META = {
  berlin: { ledgerKey: "Berlin, Germany", timeZone: "Europe/Berlin", osmRetrievedOn: "2026-10-10" },
  singapore: { ledgerKey: "Singapore, Singapore", timeZone: "Asia/Singapore", osmRetrievedOn: "2026-10-12" },
  hongkong: { ledgerKey: "Hong Kong, China", timeZone: "Asia/Hong_Kong", osmRetrievedOn: "2026-10-14" }
};

// "&" reads as "und" in German place names (Nobelhart & Schmutzig), "and" elsewhere. Apostrophes
// drop (Duddell's -> duddells) and "+" reads as "plus" (M+ -> m-plus).
const slug = (value, city) => value.toLowerCase()
  .replace(/\(.*?\)/g, (match) => match.replace(/[()]/g, ""))
  .replace(/['’]/g, "").replace(/\+/g, "-plus")
  .replace(/&/g, city === "berlin" ? "und" : "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Researched weekly hours (data/place-hours.json), each with its official source and quote.
const hoursSource = JSON.parse(fs.readFileSync(path.join(root, "data/place-hours.json"), "utf8"));
const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// One day's published hours:
//   "10:00-18:00,19:00-23:00" -> [["10:00","18:00"],["19:00","23:00"]]
//   "19:00-late"  -> [["19:00", null]]   (opening time published, closing time not)
//   "open 24h"    -> [["00:00","24:00"]]
//   "closed"      -> []
//   "unknown"     -> null                 (the source does not say)
function parseDayHours(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text || text === "unknown") return null;
  if (text === "closed") return [];
  if (text === "open 24h") return [["00:00", "24:00"]];
  const ranges = text.split(",").map((part) => part.trim().match(/^(\d{2}:\d{2})-(\d{2}:\d{2}|late)$/));
  if (ranges.some((match) => !match)) throw new Error(`Unreadable hours "${value}"`);
  return ranges.map((match) => [match[1], match[2] === "late" ? null : (match[2] === "00:00" ? "24:00" : match[2])]);
}

const parseWeek = (weekly) => Object.fromEntries(DAYS.map((day) => [day, parseDayHours(weekly?.[day])]));

// Hours apply only within researched periods; a date outside them is "unknown", never guessed.
function buildHours(id) {
  const source = hoursSource.places?.[id];
  if (!source) return { status: "unchecked" };
  return {
    status: "hours-checked",
    checkedOn: source.retrievedOn,
    periods: source.periods.map((period) => ({ from: period.from, to: period.to, weekly: parseWeek(period.weekly) })),
    exceptions: (source.exceptions || []).map((item) => ({ date: item.date, hours: parseDayHours(item.hours), note: item.note || null })),
    lastEntry: source.lastEntry || null,
    caveat: source.caveat || null,
    notes: source.notes || null,
    evidence: { url: source.url, quote: source.quote, confidence: source.confidence }
  };
}

// Visitor entrances for large sites, used for distances and routing instead of a centre point.
const ENTRANCES = {
  "plc_berlin_tempelhofer-feld": { name: "Haupteingang Tor 10, Tempelhofer Damm", lat: 52.47615, lng: 13.38611, osm: "node/941540807", note: "Main public entrance; the opening hours tagged on this gate in OpenStreetMap match the operator's published hours." },
  "plc_singapore_singapore-botanic-gardens": { name: "Tanglin Gate", lat: 1.30714, lng: 103.81860, osm: "node/602215681", note: "The gardens' southern entrance on Cluny Road, nearest Napier MRT and Dempsey." },
  "plc_singapore_singapore-zoo": { name: "Main entrance, Entrance Plaza", lat: 1.40467, lng: 103.79087, osm: "node/12666413113", note: "Visitor entrance beside the Singapore Zoo bus stop on Mandai Lake Road." }
};

// Stored public-transport journeys (data/place-routes.json), looked up once, never live.
const routesSource = JSON.parse(fs.readFileSync(path.join(root, "data/place-routes.json"), "utf8"));

// Itinerary-only places (e.g. lunch stops) that are not part of a reviewed city guide carry their
// own official-source record here, to the same standard as data/city-source-ledger.js entries:
// exact branch, current operation and published hours, read from the operator's own site.
const ITINERARY_PLACE_SOURCES = JSON.parse(fs.readFileSync(path.join(root, "data/itinerary-place-sources.json"), "utf8")).places;

const allPlaces = [
  ...PLACES.map(([city, name, kind, address, area, lat, lng, osm, basis]) => ({ city, name, kind, address, area, lat, lng, osm, basis, record: null })),
  ...ITINERARY_PLACE_SOURCES.map((item) => ({ ...item, record: item.source }))
];

const places = {};
for (const { city, name, kind, address, area, lat, lng, osm, basis, record: ownRecord } of allPlaces) {
  const meta = CITY_META[city];
  const record = ownRecord || ledger[meta.ledgerKey]?.placeSources?.[name];
  if (!record) throw new Error(`No reviewed source for ${name} in ${meta.ledgerKey}`);
  const id = `plc_${city}_${slug(name, city)}`;
  if (places[id]) throw new Error(`Duplicate place id ${id}`);
  const hours = buildHours(id);
  const hoursChecked = hours.status === "hours-checked";
  places[id] = {
    id,
    name,
    city,
    kind,
    area,
    timeZone: meta.timeZone,
    address,
    coordinates: { lat, lng, basis, osm, ...OSM, retrievedOn: meta.osmRetrievedOn },
    entrance: ENTRANCES[id] ? { ...ENTRANCES[id], ...OSM, retrievedOn: meta.osmRetrievedOn } : null,
    hours,
    verification: {
      // What the October review checked: the place's own page for its location and current operation.
      status: "location-checked",
      checkedOn: record.checkedOn,
      checked: hoursChecked ? ["location", "currently-operating", "published-weekly-hours"] : ["location", "currently-operating"],
      notChecked: hoursChecked
        ? ["unlisted-holiday-or-special-closures", "reservations-or-availability"]
        : ["opening-hours-for-your-dates", "reservations-or-availability"],
      evidence: [{ source: record.sourceType, url: record.url, locationUrl: record.locationSourceUrl, retrievedOn: record.checkedOn, note: record.operatingEvidence }]
    }
  };
}

const header = `// Generated by scripts/build-places.mjs — do not edit by hand.
// Shared places registry: exact place, coordinates and dated verification records.
// Coordinates: ${OSM.attribution}, ${OSM.licence}.
`;
for (const key of Object.keys(routesSource.routes)) {
  const [from, to] = key.split("|");
  if (!places[from] || !places[to]) throw new Error(`Route ${key} names a place that is not in the registry`);
}
const routes = { source: routesSource.source, journeys: routesSource.routes };
const body = `window.HB_PLACES = ${JSON.stringify({ version: 1, attribution: OSM.attribution, licence: OSM.licence, places, routes }, null, 2)};\n`;
fs.writeFileSync(path.join(root, "data/places.js"), header + body);
console.log(`Wrote ${Object.keys(places).length} places to data/places.js`);
