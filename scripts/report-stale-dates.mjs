#!/usr/bin/env node
// Lists sentences in the guide data that name a specific date which has already passed, such as an event
// "on 24 October 2026" or a closure "until 30 October". Run it before content pushes and rewrite or drop
// what it finds. Ranges ("from 12 to 23 October") count by their end date.
//
//   node scripts/report-stale-dates.mjs [--today=YYYY-MM-DD] [--within=DAYS]
// --within also lists dates that fall within that many days from today.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const arg = (name) => process.argv.find((item) => item.startsWith(`--${name}=`))?.split("=")[1];
const today = new Date(`${arg("today") || new Date().toISOString().slice(0, 10)}T00:00:00Z`);
const horizon = new Date(today.getTime() + Number(arg("within") || 0) * 86400000);

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const month = `(${MONTHS.join("|")})`;
// "24 October 2026", "12 to 23 October", "October 29 and 30, 2026", "October 6 to November 29, 2026"
const patterns = [
  new RegExp(`\\b(\\d{1,2})(?:\\s*(?:-|–|to|and)\\s*(\\d{1,2}))?\\s+${month}(?:,?\\s+(\\d{4}))?`, "gi"),
  new RegExp(`\\b${month}\\s+(\\d{1,2})(?!\\d)(?:\\s*(?:-|–|to|and)\\s*(\\d{1,2})(?!\\d))?(?:,?\\s+(\\d{4}))?`, "gi")
];

function dateOf(day, monthName, year) {
  const index = MONTHS.indexOf(monthName.toLowerCase());
  // A date without a year is read as the next occurrence within a year of the copy's review, so take
  // this year and let dates far in the past roll forward.
  let resolved = Number(year) || today.getUTCFullYear();
  let date = new Date(Date.UTC(resolved, index, Number(day)));
  if (!year && date < new Date(today.getTime() - 180 * 86400000)) date = new Date(Date.UTC(resolved + 1, index, Number(day)));
  return date;
}

const file = path.join(root, "data/destination-expansion.js");
const lines = fs.readFileSync(file, "utf8").split("\n");
const findings = [];
let city = "";
lines.forEach((line, index) => {
  const header = line.match(/^\s*\/\/ (.+?): (?:source review|places added)/);
  if (header) city = header[1];
  // Comments and the trust line state when the review happened, not something the reader acts on.
  if (!city || /^\s*\/\//.test(line) || /^\s*trust:/.test(line)) return;
  for (const sentence of line.split(/(?<=[.!?])\s+|",\s*"/)) {
    // A sentence counts by its latest date, so "from 20 September to 31 January" is current until 31 January.
    const dates = patterns.flatMap((pattern) => [...sentence.matchAll(pattern)].map((match) => (pattern === patterns[0]
      ? dateOf(match[2] || match[1], match[3], match[4])
      : dateOf(match[3] || match[2], match[1], match[4]))));
    if (!dates.length) continue;
    const latest = new Date(Math.max(...dates));
    // "since" dates describe something already in place.
    if (latest <= horizon && !/\bsince\b/i.test(sentence)) {
      findings.push({ city, line: index + 1, date: latest.toISOString().slice(0, 10), text: sentence.trim().replace(/^[\["]+/, "").slice(0, 220) });
    }
  }
});

const unique = [...new Map(findings.map((item) => [`${item.line}:${item.text}`, item])).values()];
for (const item of unique) console.log(`${item.date}  ${item.city} (line ${item.line}): ${item.text}`);
console.log(`${unique.length} dated claim(s) on or before ${horizon.toISOString().slice(0, 10)}.`);
