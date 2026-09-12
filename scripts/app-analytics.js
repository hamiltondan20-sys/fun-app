(function () {
  const measurementId = String(window.HB_ANALYTICS_ID || "").trim();
  const consentKey = "hb.analytics.consent";
  const banner = document.getElementById("analytics-consent");
  const readConsent = () => {
    try { return localStorage.getItem(consentKey); } catch (error) { return ""; }
  };
  const writeConsent = (value) => {
    try { localStorage.setItem(consentKey, value); } catch (error) { /* Consent still applies for this page. */ }
  };
  const showBanner = () => banner?.classList.remove("hidden");
  const hideBanner = () => banner?.classList.add("hidden");

  window.HB_ANALYTICS = {
    configured: Boolean(measurementId),
    enabled: false,
    grant() {
      writeConsent("granted");
      load();
    },
    deny() {
      writeConsent("denied");
      hideBanner();
    },
    event(name, params = {}) {
      if (this.enabled && typeof window.gtag === "function") window.gtag("event", name, params);
    }
  };

  function load() {
    if (!measurementId || window.HB_ANALYTICS.enabled) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    window.HB_ANALYTICS.enabled = true;
    hideBanner();
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("analytics-accept")?.addEventListener("click", () => window.HB_ANALYTICS.grant());
    document.getElementById("analytics-decline")?.addEventListener("click", () => window.HB_ANALYTICS.deny());
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-analytics-event]");
      if (!target) return;
      window.HB_ANALYTICS.event(target.dataset.analyticsEvent, { label: target.dataset.analyticsLabel || target.textContent.trim().slice(0, 80) });
    });
    if (!measurementId) return;
    const choice = readConsent();
    if (choice === "granted") load();
    else if (choice !== "denied") showBanner();
  });
})();
