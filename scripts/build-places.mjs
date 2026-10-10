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
  ["berlin", "Deutsches Technikmuseum", "landmark", "Trebbiner Strasse 9, Berlin", "Kreuzberg", 52.49718, 13.37593, "way/31622818", "named feature at Trebbiner Strasse 9"]
];

const CITY_META = { berlin: { ledgerKey: "Berlin, Germany", timeZone: "Europe/Berlin" } };

const slug = (value) => value.toLowerCase()
  .replace(/\(.*?\)/g, (match) => match.replace(/[()]/g, ""))
  .replace(/&/g, "und").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const places = {};
for (const [city, name, kind, address, area, lat, lng, osm, basis] of PLACES) {
  const meta = CITY_META[city];
  const record = ledger[meta.ledgerKey]?.placeSources?.[name];
  if (!record) throw new Error(`No reviewed source for ${name} in ${meta.ledgerKey}`);
  const id = `plc_${city}_${slug(name)}`;
  if (places[id]) throw new Error(`Duplicate place id ${id}`);
  places[id] = {
    id,
    name,
    city,
    kind,
    area,
    timeZone: meta.timeZone,
    address,
    coordinates: { lat, lng, basis, osm, ...OSM },
    verification: {
      // What the October review checked: the place's own page for its location and current operation.
      status: "location-checked",
      checkedOn: record.checkedOn,
      checked: ["location", "currently-operating"],
      notChecked: ["opening-hours-for-your-dates", "reservations-or-availability"],
      evidence: [{ source: record.sourceType, url: record.url, locationUrl: record.locationSourceUrl, retrievedOn: record.checkedOn, note: record.operatingEvidence }]
    }
  };
}

const header = `// Generated by scripts/build-places.mjs — do not edit by hand.
// Shared places registry: exact place, coordinates and dated verification records.
// Coordinates: ${OSM.attribution}, ${OSM.licence}.
`;
const body = `window.HB_PLACES = ${JSON.stringify({ version: 1, attribution: OSM.attribution, licence: OSM.licence, places }, null, 2)};\n`;
fs.writeFileSync(path.join(root, "data/places.js"), header + body);
console.log(`Wrote ${Object.keys(places).length} places to data/places.js`);
