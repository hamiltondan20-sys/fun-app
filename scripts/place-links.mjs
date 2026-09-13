/**
 * Turn destination list items into map links only when the item is clearly a
 * place. Ambiguous activities stay as text so the link remains trustworthy.
 */

const PLACEHOLDER_MARKERS = [
  "Your main base",
  "A nearby area",
  "A flexible day-trip area",
  "A local specialty from",
  "the busiest sights",
  "before the next stop"
];

const ACTIVITY_WORDS = new RegExp(
  "\\b(" +
    [
      "walk", "walks", "walking", "stroll", "hop", "hopping", "wander", "wandering",
      "picnic", "cruise", "ride", "tour", "outing", "trip", "crawl", "run",
      "stop", "stops", "visit", "day", "days", "morning", "afternoon", "evening",
      "night", "sunset", "sunrise", "time", "session", "experience", "service",
      "view", "views", "viewpoint", "escape", "detour", "pace", "break",
      "hour", "hours", "moment", "outdoors", "shopping", "browsing", "tasting"
    ].join("|") +
  ")\\b", "i"
);

const GENERIC_HEAD = new RegExp(
  "^(a|an|the)\\s+(" +
    [
      "local", "slow", "quiet", "quick", "long", "short", "final", "first",
      "memorable", "scenic", "guided", "neighborhood", "neighbourhood",
      "classic", "casual", "simple", "relaxed", "easy", "nearby", "good",
      "great", "proper", "traditional", "modern", "small", "big", "second"
    ].join("|") +
  ")\\b", "i"
);

const NAME_CONNECTIVES = new Set([
  "de", "del", "della", "di", "du", "des", "da", "das", "dos",
  "la", "le", "les", "el", "lo", "il", "al", "am", "an",
  "van", "von", "der", "den", "et", "y", "e", "und",
  "and", "of", "the", "on", "in", "at", "by", "a"
]);

const EXTRACT_AFTER = /\b(?:at|in|from)\s+([A-Z][\w'’.-]*(?:\s+(?:[a-z]{1,4}|[A-Z][\w'’.-]*)){0,3})\s*$/;

const stripTrailingCommonNoun = (value) =>
  value.replace(/\s+(izakayas?|restaurants?|cafes?|bars?|markets?|bakeries|shops?|gardens?|museums?)$/i, "");

function looksLikeProperName(value) {
  const words = value.split(/\s+/).filter(Boolean);
  if (!words.length || words.length > 5 || !/^[A-Z]/.test(words[0])) return false;

  let capitalised = 0;
  for (const word of words) {
    const bare = word.replace(/[^\w'’-]/g, "");
    if (!bare) continue;
    if (/^[A-Z]/.test(bare)) { capitalised++; continue; }
    if (/^[a-z]{1,4}['’][A-Z]/.test(word)) { capitalised++; continue; }
    if (NAME_CONNECTIVES.has(bare.toLowerCase())) continue;
    return false;
  }
  return capitalised >= 1;
}

export function classifyItem(item) {
  const raw = String(item || "").trim();
  if (!raw) return { kind: "descriptor", reason: "empty" };

  if (PLACEHOLDER_MARKERS.some((marker) => raw.toLowerCase().includes(marker.toLowerCase()))) {
    return { kind: "placeholder", reason: "unfilled template variable" };
  }

  if (/\bor\b/i.test(raw)) return { kind: "descriptor", reason: "multiple candidates" };
  if (GENERIC_HEAD.test(raw)) return { kind: "descriptor", reason: "generic head noun" };

  const candidate = stripTrailingCommonNoun(raw);
  if (ACTIVITY_WORDS.test(candidate)) {
    const match = raw.match(EXTRACT_AFTER);
    if (match && looksLikeProperName(match[1]) && match[1].split(/\s+/).length >= 2) {
      return { kind: "named", query: match[1], reason: "extracted place" };
    }
    return { kind: "descriptor", reason: "activity phrase" };
  }

  if (looksLikeProperName(candidate)) {
    return { kind: "named", query: candidate, reason: "proper name" };
  }

  const tail = raw.match(EXTRACT_AFTER);
  if (tail && looksLikeProperName(tail[1])) {
    return { kind: "named", query: tail[1], reason: "extracted place" };
  }

  return { kind: "descriptor", reason: "no proper-name pattern" };
}

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const mapUrl = (query, cityKey) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${cityKey}`)}`;

export function linkItem(item, cityKey) {
  const classified = classifyItem(item);
  if (classified.kind !== "named") return esc(item);
  return (
    `<a class="hb-place" href="${esc(mapUrl(classified.query, cityKey))}" ` +
    `target="_blank" rel="noopener nofollow" ` +
    `aria-label="${esc(item)}: view on map (opens in a new tab)">` +
    `${esc(item)}<span class="hb-place-icon" aria-hidden="true">&#8599;</span></a>`
  );
}

export function summarise(items) {
  const result = { named: 0, descriptor: 0, placeholder: 0 };
  for (const item of items) result[classifyItem(item).kind]++;
  return result;
}
