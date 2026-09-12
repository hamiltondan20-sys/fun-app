#!/usr/bin/env python3
"""Move the large inline stylesheet into a cacheable asset."""

import re
from pathlib import Path

planner_path = Path("plan/index.html")
source_path = planner_path if planner_path.exists() and "app-bottom-bar" in planner_path.read_text(encoding="utf-8") else Path("code.html")
asset_path = Path("assets/app-inline.css")
source = source_path.read_text(encoding="utf-8")
match = re.search(r"[ \t]*<style>\n(.*?)\n[ \t]*</style>\n", source, re.S)

if not match:
    print("No inline stylesheet found. Nothing to do.")
    raise SystemExit(0)

asset_path.parent.mkdir(parents=True, exist_ok=True)
asset_path.write_text(match.group(1), encoding="utf-8")
updated = source[:match.start()] + '  <link href="./assets/app-inline.css?v=20260912a" rel="stylesheet" />\n' + source[match.end():]
source_path.write_text(updated, encoding="utf-8")
print(f"Extracted {len(match.group(1)):,} bytes to {asset_path}")
