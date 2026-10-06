import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("./app-analytics.js", import.meta.url), "utf8");

function setup({ consent = null, configured = true, blocked = false } = {}) {
  const storage = new Map(consent ? [["hb.analytics.consent", consent]] : []);
  const scripts = [];
  const listeners = {};
  let reloads = 0;
  const status = { textContent: "" };
  const withdraw = { addEventListener: (name, callback) => { listeners.withdraw = callback; } };
  const document = {
    getElementById: () => null,
    querySelectorAll: () => [withdraw],
    querySelector: () => status,
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
    addEventListener: (name, callback) => { listeners[name] = callback; }
  };
  const window = {
    HB_ANALYTICS_ID: configured ? "G-TEST123" : "",
    location: { reload: () => { reloads++; } }
  };
  const localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => { if (blocked) throw new Error("Blocked"); storage.set(key, value); }
  };
  vm.runInNewContext(source, { window, document, localStorage });
  listeners.DOMContentLoaded();
  return { window, storage, scripts, listeners, status, reloads: () => reloads };
}

test("no analytics tag without a configured ID and granted consent", () => {
  assert.equal(setup().scripts.length, 0);
  assert.equal(setup({ consent: "denied" }).scripts.length, 0);
  assert.equal(setup({ configured: false, consent: "granted" }).scripts.length, 0);
});

test("withdrawal disables analytics, saves denial and survives a reload", () => {
  const app = setup({ consent: "granted" });
  assert.equal(app.scripts.length, 1);
  app.listeners.withdraw();
  assert.equal(app.storage.get("hb.analytics.consent"), "denied");
  assert.equal(app.window.HB_ANALYTICS.enabled, false);
  assert.equal(app.window["ga-disable-G-TEST123"], true);
  assert.equal(app.reloads(), 1);
  const count = app.window.dataLayer.length;
  app.window.HB_ANALYTICS.event("test");
  assert.equal(app.window.dataLayer.length, count);
  assert.equal(setup({ consent: "denied" }).scripts.length, 0);
});

test("blocked storage does not falsely report a persisted withdrawal", () => {
  const app = setup({ consent: "granted", blocked: true });
  app.listeners.withdraw();
  assert.equal(app.window.HB_ANALYTICS.enabled, false);
  assert.equal(app.reloads(), 0);
  assert.match(app.status.textContent, /blocked saving/);
});
