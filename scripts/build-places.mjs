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

// city, ledger key, kind, address (from the reviewed record), area, coordinates (OSM lookup on 2026-10-10) and what the point represents,
// plus the lookup date when it differs from the city's.
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
  ["hongkong", "Bakehouse (Wan Chai)", "cafe", "G/F, 14 Tai Wong Street East, Wan Chai, Hong Kong", "Wan Chai", 22.27587, 114.17140, "node/6788818059", "named feature on Tai Wong Street East (not another branch)"],
  // Paris: OSM lookup on 2026-10-14.
  ["paris", "Louvre Museum", "landmark", "Pyramid entrance, Cour Napoléon, 75001 Paris", "Louvre", 48.86099, 2.33584, "way/375076234", "named feature: the Louvre Pyramid, the main visitor entrance"],
  ["paris", "Galerie Vivienne", "scenic", "4 rue des Petits-Champs / 6 rue Vivienne, 75002 Paris", "Bourse", 48.86673, 2.33976, "relation/546789", "named feature: the covered passage"],
  ["paris", "Frenchie (rue du Nil)", "meal", "5 rue du Nil, 75002 Paris", "Sentier", 48.86774, 2.34798, "node/2383363287", "named feature 'Restaurant Frenchie' on rue du Nil (not the wine bar or shop)"],
  ["paris", "Poilâne (rue du Cherche-Midi)", "cafe", "8 rue du Cherche-Midi, 75006 Paris", "Saint-Germain", 48.85131, 2.32899, "node/6695032685", "named feature: Boulangerie Poilâne on rue du Cherche-Midi"],
  ["paris", "Jardin du Luxembourg", "scenic", "Entrances on place Edmond Rostand, rue Guynemer and rue de Vaugirard, 75006 Paris", "Luxembourg", 48.84672, 2.33641, "way/128206209", "centre of the garden; it has several gates"],
  ["paris", "Musée d'Orsay", "landmark", "Esplanade Valéry Giscard d'Estaing, 75007 Paris", "Saint-Germain", 48.85992, 2.32658, "way/63178753", "named feature: the museum building"],
  ["paris", "Sainte-Chapelle", "landmark", "10 boulevard du Palais, 75001 Paris", "Île de la Cité", 48.85539, 2.34499, "relation/3344870", "named feature on boulevard du Palais"],
  ["paris", "Coutume Café (Babylone)", "cafe", "47 rue de Babylone, 75007 Paris", "Invalides", 48.85166, 2.31830, "node/2355464116", "named feature at 47 rue de Babylone"],
  ["paris", "Musée Rodin", "landmark", "77 rue de Varenne, 75007 Paris", "Invalides", 48.85475, 2.31587, "way/472159547", "named feature at 77 rue de Varenne (not the Meudon site)"],
  ["paris", "Eiffel Tower", "landmark", "Champ de Mars, 75007 Paris", "Eiffel Tower", 48.85826, 2.29450, "way/5013364", "named feature: the tower"],
  ["paris", "Le Jules Verne", "meal", "Eiffel Tower 2nd floor, 6 avenue Gustave Eiffel, 75007 Paris", "Eiffel Tower", 48.85826, 2.29450, "way/5013364", "the tower's named feature; the restaurant is on its second floor"],
  ["paris", "Holybelly", "cafe", "5 rue Lucien Sampaix, 75010 Paris", "Canal Saint-Martin", 48.87100, 2.35976, "node/4904689828", "named feature on rue Lucien Sampaix"],
  ["paris", "Clamato", "meal", "80 rue de Charonne, 75011 Paris", "Charonne", 48.85359, 2.38085, "node/3602657895", "named feature at 80 rue de Charonne"],
  ["paris", "Bistrot Paul Bert", "meal", "18 rue Paul Bert, 75011 Paris", "Charonne", 48.85222, 2.38492, "node/589485658", "named feature on rue Paul Bert"],
  ["paris", "Sacré-Cœur Basilica", "landmark", "35 rue du Chevalier de La Barre, 75018 Paris", "Montmartre", 48.88681, 2.34302, "way/23762981", "named feature: the basilica"],
  ["paris", "Breizh Café (Marais)", "meal", "109 rue Vieille du Temple, 75003 Paris", "Le Marais", 48.86063, 2.36182, "node/2383363288", "named feature on rue Vieille du Temple (not another branch)"],
  ["paris", "Little Red Door", "meal", "60 rue Charlot, 75003 Paris", "Le Marais", 48.86366, 2.36359, "node/3265513124", "named feature at 60 rue Charlot"],
  ["paris", "Terres de Café (Rambuteau)", "cafe", "14 rue Rambuteau, 75003 Paris", "Le Marais", 48.86061, 2.35554, "node/5908178879", "named feature at 14 rue Rambuteau (not another branch)"],
  ["paris", "Musée de l'Orangerie", "landmark", "Jardin des Tuileries, Place de la Concorde (Seine side), 75001 Paris", "Tuileries", 48.86377, 2.32266, "way/54188996", "named feature: the museum building", "2026-10-16"],
  ["paris", "Arc de Triomphe", "landmark", "Place Charles de Gaulle, 75008 Paris", "Étoile", 48.87378, 2.29504, "way/226413508", "named feature: the arch", "2026-10-16"],
  ["paris", "Septime", "meal", "80 rue de Charonne, 75011 Paris", "Charonne", 48.85360, 2.38096, "node/3602657896", "named feature at 80 rue de Charonne", "2026-10-16"],
  ["paris", "Bar Hemingway (Ritz Paris)", "meal", "Ritz Paris, 15 place Vendôme, 75001 Paris", "Vendôme", 48.86797, 2.32884, "node/5755624024", "the hotel's named feature; the bar is inside the Ritz", "2026-10-16"],
  // London: OSM lookup on 2026-10-14.
  ["london", "Tower of London", "landmark", "Tower of London, London EC3N 4AB", "Tower Hill", 51.50822, -0.07619, "way/370870741", "named feature: the Tower of London site"],
  ["london", "Tower Bridge", "landmark", "Tower Bridge, London (entrance on the north-west side of the bridge)", "Tower Hill", 51.50552, -0.07537, "way/378541210", "named feature: the bridge"],
  ["london", "Leadenhall Market", "scenic", "Gracechurch Street, London EC3V 1LT", "City", 51.51273, -0.08340, "way/143113935", "named feature: the covered market"],
  ["london", "Sky Garden", "scenic", "1 Sky Garden Walk, London EC3M 8AF", "City", 51.51110, -0.08360, "node/3272712570", "named viewpoint feature at 20 Fenchurch Street"],
  ["london", "Westminster Abbey", "landmark", "Westminster Abbey, Dean's Yard, London SW1P 3PA", "Westminster", 51.49940, -0.12739, "way/364313092", "named feature: the abbey church"],
  ["london", "National Gallery", "landmark", "Trafalgar Square, London WC2N 5DN", "Trafalgar Square", 51.50872, -0.12859, "node/6173732685", "the Gallery's shop feature, inside the building on Trafalgar Square"],
  ["london", "Covent Garden (Market Building and Piazza)", "scenic", "Covent Garden Piazza, London (no postal address published)", "Covent Garden", 51.51198, -0.12274, "way/633369346", "named feature: Covent Garden Market building"],
  ["london", "Rules", "meal", "34-35 Maiden Lane, London WC2E 7LB", "Covent Garden", 51.51083, -0.12319, "way/558928361", "named feature at 34-35 Maiden Lane"],
  ["london", "Granger & Co. (Notting Hill)", "cafe", "175 Westbourne Grove, London W11 2SB", "Notting Hill", 51.51462, -0.19778, "node/7138194615", "named feature at 175 Westbourne Grove (not another branch)"],
  ["london", "Natural History Museum", "landmark", "Cromwell Road, London SW7 5BD", "South Kensington", 51.49651, -0.17600, "way/24436446", "named feature: the museum building"],
  ["london", "V&A South Kensington", "landmark", "Cromwell Road, London SW7 2RL", "South Kensington", 51.49688, -0.17164, "relation/29795", "named feature: the Victoria and Albert Museum"],
  ["london", "Core by Clare Smyth", "meal", "92 Kensington Park Road, London W11 2PN", "Notting Hill", 51.51272, -0.20311, "node/7096147785", "named feature at 92 Kensington Park Road"],
  ["london", "Monmouth Coffee (Borough)", "cafe", "2 Park Street, London SE1 9AB", "Borough", 51.50550, -0.09143, "node/14181043726", "named feature at 2 Park Street (not another branch)"],
  ["london", "Borough Market", "scenic", "8 Southwark Street, London SE1 1TL", "Borough", 51.50553, -0.09044, "way/24282400", "named feature: the market"],
  ["london", "Padella (Borough Market)", "meal", "6 Southwark Street, London SE1 1TQ", "Borough", 51.50513, -0.08991, "node/14181043755", "named feature at 6 Southwark Street (not another branch)"],
  ["london", "Tate Modern", "landmark", "Bankside, London SE1 9TG", "Bankside", 51.50743, -0.09934, "way/24642569", "named feature: the gallery building"],
  ["london", "Dishoom (Covent Garden)", "meal", "12 Upper St Martin's Lane, London WC2H 9FB", "Covent Garden", 51.51243, -0.12686, "way/207104925", "named feature at 12 Upper St Martin's Lane (not another branch)"],
  ["london", "Prufrock Coffee (Leather Lane)", "cafe", "23-25 Leather Lane, London EC1N 7TE", "Holborn", 51.51995, -0.10952, "node/4185611903", "named feature at 23-25 Leather Lane"],
  ["london", "St Paul's Cathedral", "landmark", "St Paul's Churchyard, London EC4M 8AD", "City", 51.51379, -0.09845, "way/369161987", "named feature: the cathedral"],
  ["london", "Flat Iron (Covent Garden)", "meal", "17-18 Henrietta Street, London WC2E 8QH", "Covent Garden", 51.51081, -0.12399, "node/4611099089", "named feature at 17-18 Henrietta Street (not another branch)"],
  ["london", "Swift Soho", "meal", "12 Old Compton Street, London W1D 4TQ", "Soho", 51.51374, -0.12999, "node/692190788", "named feature at 12 Old Compton Street (not another branch)"],
  ["london", "The Breakfast Club (Soho)", "cafe", "33 D'Arblay Street, London W1F 8EU", "Soho", 51.51471, -0.13533, "way/477968033", "named feature at 33 D'Arblay Street (the original branch)"],
  ["london", "Science Museum", "landmark", "Exhibition Road, South Kensington, London SW7 2DD", "South Kensington", 51.49740, -0.17467, "way/27765411", "named feature: the museum building", "2026-10-16"],
  ["london", "Connaught Bar", "meal", "The Connaught, Carlos Place, Mayfair, London W1K 2AL", "Mayfair", 51.51018, -0.15022, "way/26707058", "the hotel's named feature; the bar is inside The Connaught", "2026-10-16"]
];

const CITY_META = {
  berlin: { ledgerKey: "Berlin, Germany", timeZone: "Europe/Berlin", osmRetrievedOn: "2026-10-10" },
  singapore: { ledgerKey: "Singapore, Singapore", timeZone: "Asia/Singapore", osmRetrievedOn: "2026-10-12" },
  hongkong: { ledgerKey: "Hong Kong, China", timeZone: "Asia/Hong_Kong", osmRetrievedOn: "2026-10-14" },
  paris: { ledgerKey: "Paris, France", timeZone: "Europe/Paris", osmRetrievedOn: "2026-10-14" },
  london: { ledgerKey: "London, United Kingdom", timeZone: "Europe/London", osmRetrievedOn: "2026-10-14" }
};

// "&" reads as "und" in German place names (Nobelhart & Schmutzig), "and" elsewhere. Apostrophes
// drop (Duddell's -> duddells), "+" reads as "plus" (M+ -> m-plus) and accents fold
// (Musée d'Orsay -> musee-dorsay, Sacré-Cœur -> sacre-coeur).
const slug = (value, city) => value.toLowerCase()
  .replace(/œ/g, "oe").replace(/æ/g, "ae").normalize("NFD").replace(/[̀-ͯ]/g, "")
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
  ...PLACES.map(([city, name, kind, address, area, lat, lng, osm, basis, osmRetrievedOn]) => ({ city, name, kind, address, area, lat, lng, osm, basis, osmRetrievedOn, record: null })),
  ...ITINERARY_PLACE_SOURCES.map((item) => ({ ...item, record: item.source }))
];

const places = {};
for (const { city, name, kind, address, area, lat, lng, osm, basis, osmRetrievedOn, record: ownRecord } of allPlaces) {
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
    coordinates: { lat, lng, basis, osm, ...OSM, retrievedOn: osmRetrievedOn || meta.osmRetrievedOn },
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
