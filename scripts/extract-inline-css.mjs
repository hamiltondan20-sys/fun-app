import fs from "node:fs";

const plannerPath = "plan/index.html";
const sourcePath = fs.existsSync(plannerPath) && fs.readFileSync(plannerPath, "utf8").includes("app-bottom-bar")
  ? plannerPath
  : "code.html";
const assetPath = "assets/app-inline.css";
const source = fs.readFileSync(sourcePath, "utf8");
const match = source.match(/[ \t]*<style>\n([\s\S]*?)\n[ \t]*<\/style>\n/);

if (!match) {
  console.log("No inline stylesheet found. Nothing to do.");
  process.exit(0);
}

fs.mkdirSync("assets", { recursive: true });
fs.writeFileSync(assetPath, match[1], "utf8");
const updated = source.replace(match[0], '  <link href="./assets/app-inline.css?v=20260912a" rel="stylesheet" />\n');
fs.writeFileSync(sourcePath, updated, "utf8");
console.log(`Extracted ${match[1].length.toLocaleString()} bytes to ${assetPath}`);
