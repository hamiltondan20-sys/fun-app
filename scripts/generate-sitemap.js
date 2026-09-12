const path = require("node:path");
const { spawnSync } = require("node:child_process");

const generator = path.join(__dirname, "generate-pages.mjs");
const args = [
  generator,
  "--base=/fun-app",
  "--origin=https://hamiltondan20-sys.github.io",
  "--out=.",
  ...process.argv.slice(2)
];

const result = spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(result.status === null ? 1 : result.status);
