(() => {
const { state: hbState, data: hbData, refs: hbRefs, utils: hbUtils } = window.HB_APP;
const {
  getCountryOnlySelection,
  findCityBySlug,
  findCountryBySlug,
  slugifyCity,
  slugifyCountry,
  getDestinationMatches,
  getCityName,
  setDestinationSuggestionIndex,
  applyDestinationSuggestionSelection,
  updateDestinationAutofill,
  updateDestinationHelper,
  renderCityGuidesLanding,
  renderCountryGuidesLanding,
  renderCountryGuideDetail,
  renderCityGuideDetail,
  buildFlightCard,
  buildStayCard,
  updateStateFromTripLogistics,
  updateJournalPreview,
  cloneData,
  saveAlternateVersion,
  clearAlternateVersionFeedback,
  pauseAlternateVersionFeedbackDismiss,
  resumeAlternateVersionFeedbackDismiss,
  restoreAlternateVersion,
  restoreLiveDraft,
  compareAlternateVersion,
  renderExploreMap,
  renderTripMap,
  buildGeneratedTrip,
  updateStateFromInputs,
  renderBlueprint,
  renderThinking,
  renderSavedPanel,
  renderTrip,
  swapDayItem,
  removeDayItem,
  undoDayItem,
  moveTimelineStep,
  reorderTimelineStep,
  toggleDayExpanded,
  setAllDayExpansion,
  reorderTripDay,
  setCityGuideSuggestionIndex,
  applyCityGuideSuggestionSelection,
  renderCityGuideSuggestions,
  getCombinedCityGuideSuggestions,
  setCountryGuideSuggestionIndex,
  applyCountryGuideSuggestionSelection,
  renderCountryGuideSuggestions,
  getCombinedCountryGuideSuggestions,
  renderGuidePlanningContext,
  applyGuidePlanningContextFromCity,
  applyGuidePlanningContextFromCountry,
  renderCityGuideCompare,
  renderCountryGuideCompare
} = hbUtils;

    let editorialStickyObserver = null;
    const GUIDE_MEMORY_KEY = "hb-guide-memory-v1";
    let lastGuideHandoffAt = 0;

function updatePrimaryCta() {
      const guidePanels = new Set(["city-guides-panel", "country-guides-panel", "editorial-guide-panel", "editorial-country-panel"]);
      const isGuideMode = guidePanels.has(hbState.activePanelId);
      hbRefs.bottomBar?.classList.toggle("is-guide-mode", isGuideMode);
      hbRefs.generateBtn.disabled = false;
      if (hbState.activePanelId === "explore-panel") {
        hbRefs.generateBtn.textContent = "Start Building";
        return;
      }
      if (hbState.activePanelId === "build-panel") {
        hbRefs.generateBtn.textContent = "Start Planning";
        return;
      }
      if (hbState.activePanelId === "details-panel") {
        hbRefs.generateBtn.textContent = "Build My Trip";
        return;
      }
      if (hbState.activePanelId === "blueprint-panel") {
        hbRefs.generateBtn.textContent = "Looks Right, Keep Going";
        return;
      }
      if (hbState.activePanelId === "thinking-panel") {
        hbRefs.generateBtn.textContent = "Show My Trip";
        return;
      }
      if (hbState.activePanelId === "trip-panel") {
        hbRefs.generateBtn.textContent = hbState.likedTrip ? "Open Saved Trip" : "Save This Trip";
        return;
      }
      if (hbState.activePanelId === "saved-panel") {
        hbRefs.generateBtn.textContent = hbState.likedTrip ? "Open Saved Version" : "Build a Trip";
        return;
      }
      hbRefs.generateBtn.textContent = "Generate Your Trip";
    }

    function updateEditorialStickyBars() {
      const shouldCompact = window.scrollY > 280;
      ["city-guide-sticky-actions", "country-guide-sticky-actions"].forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        node.classList.toggle("is-compact", shouldCompact);
      });
    }

    function scheduleEditorialStickyBarsUpdate() {
      rememberGuidePanelScroll();
      saveGuideBrowseMemory();
      window.requestAnimationFrame(updateEditorialStickyBars);
    }

    function syncEditorialStickyObserver() {
      if (typeof window.IntersectionObserver !== "function") return;

      if (!editorialStickyObserver) {
        editorialStickyObserver = new window.IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const barId = entry.target.dataset.stickyBar;
            const bar = barId ? document.getElementById(barId) : null;
            if (!bar) return;
            bar.classList.toggle("is-compact", !entry.isIntersecting);
          });
        }, {
          root: null,
          threshold: 0,
          rootMargin: "-12px 0px 0px 0px"
        });
      }

      editorialStickyObserver.disconnect();

      [
        ["city-guide-sticky-sentinel", "city-guide-sticky-actions", hbState.activePanelId === "editorial-guide-panel"],
        ["country-guide-sticky-sentinel", "country-guide-sticky-actions", hbState.activePanelId === "editorial-country-panel"]
      ].forEach(([sentinelId, barId, isActive]) => {
        const sentinel = document.getElementById(sentinelId);
        const bar = document.getElementById(barId);
        if (!bar) return;
        bar.classList.toggle("is-compact", false);
        if (!isActive || !sentinel) return;
        sentinel.dataset.stickyBar = barId;
        editorialStickyObserver.observe(sentinel);
      });
    }

    function rememberGuidePanelScroll() {
      if (!hbState.activePanelId) return;
      const guidePanels = ["city-guides-panel", "country-guides-panel", "editorial-guide-panel", "editorial-country-panel"];
      if (!guidePanels.includes(hbState.activePanelId)) return;
      hbState.panelScrollMemory[hbState.activePanelId] = window.scrollY;
    }

    function restoreGuidePanelScroll(targetId) {
      const guidePanels = ["city-guides-panel", "country-guides-panel", "editorial-guide-panel", "editorial-country-panel"];
      const targetPanel = document.getElementById(targetId);
      if (!targetPanel) return;

      if (guidePanels.includes(targetId)) {
        const nextY = hbState.panelScrollMemory[targetId] || 0;
        window.requestAnimationFrame(() => window.scrollTo(0, nextY));
        return;
      }

      window.requestAnimationFrame(() => {
        targetPanel.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }

    function saveGuideBrowseMemory() {
      try {
        const payload = {
          selectedGuideCity: hbState.selectedGuideCity,
          selectedGuideCountry: hbState.selectedGuideCountry,
          cityGuideSearchQuery: hbState.cityGuideSearchQuery,
          cityGuideRegionFilter: hbState.cityGuideRegionFilter,
          countryGuideSearchQuery: hbState.countryGuideSearchQuery,
          countryGuideRegionFilter: hbState.countryGuideRegionFilter,
          panelScrollMemory: hbState.panelScrollMemory,
          guidePlanContext: hbState.guidePlanContext,
          guideCompare: hbState.guideCompare,
          guideHubCompare: hbState.guideHubCompare,
          guideBuildIntent: hbState.guideBuildIntent
        };
        window.localStorage.setItem(GUIDE_MEMORY_KEY, JSON.stringify(payload));
      } catch (error) {
        // Ignore storage failures in prototypes.
      }
    }

    function restoreGuideBrowseMemory() {
      try {
        const raw = window.localStorage.getItem(GUIDE_MEMORY_KEY);
        if (!raw) return;
        const payload = JSON.parse(raw);
        if (!payload || typeof payload !== "object") return;
        hbState.selectedGuideCity = payload.selectedGuideCity || hbState.selectedGuideCity;
        hbState.selectedGuideCountry = payload.selectedGuideCountry || hbState.selectedGuideCountry;
        hbState.cityGuideSearchQuery = payload.cityGuideSearchQuery || "";
        hbState.cityGuideRegionFilter = payload.cityGuideRegionFilter || "all";
        hbState.countryGuideSearchQuery = payload.countryGuideSearchQuery || "";
        hbState.countryGuideRegionFilter = payload.countryGuideRegionFilter || "all";
        hbState.panelScrollMemory = payload.panelScrollMemory || {};
        hbState.guidePlanContext = {
          sourceType: "",
          sourceName: "",
          sourceLocation: "",
          summary: "",
          preview: "",
          suggestedBase: "",
          ...(payload.guidePlanContext || {})
        };
        hbState.guideCompare = {
          type: "",
          current: "",
          target: "",
          ...(payload.guideCompare || {})
        };
        hbState.guideHubCompare = {
          type: "",
          current: "",
          target: "",
          ...(payload.guideHubCompare || {})
        };
        hbState.guideBuildIntent = {
          sourceType: "",
          sourceLocation: "",
          destination: "",
          ...(payload.guideBuildIntent || {})
        };
      } catch (error) {
        // Ignore storage failures in prototypes.
      }
    }

    function clearGuidePlanningContext() {
      hbState.guideBuildIntent = {
        sourceType: "",
        sourceLocation: "",
        destination: ""
      };
      hbState.guidePlanContext = {
        sourceType: "",
        sourceName: "",
        sourceLocation: "",
        summary: "",
        preview: "",
        suggestedBase: ""
      };
      renderGuidePlanningContext();
      saveGuideBrowseMemory();
    }

    function reopenGuidePlanningSource() {
      const context = hbState.guidePlanContext || {};
      if (!context.sourceType || !context.sourceLocation) return;

      if (context.sourceType === "city") {
        hbState.selectedGuideCity = context.sourceLocation;
        renderCityGuideDetail(context.sourceLocation);
        setActivePanel("editorial-guide-panel");
        return;
      }

      if (context.sourceType === "country") {
        hbState.selectedGuideCountry = context.sourceLocation;
        renderCountryGuideDetail(context.sourceLocation);
        setActivePanel("editorial-country-panel");
      }
    }

    function applyGuideBuildIntent() {
      const intent = hbState.guideBuildIntent || {};
      if (!intent.sourceType || !intent.sourceLocation) return;

      if (intent.sourceType === "city") {
        applyGuidePlanningContextFromCity(intent.sourceLocation);
      } else if (intent.sourceType === "country") {
        applyGuidePlanningContextFromCountry(intent.sourceLocation);
      }

      if (intent.destination && hbRefs.formBindings.destination) {
        hbRefs.formBindings.destination.value = intent.destination;
      }
      if (intent.destination) {
        hbState.appState.destination = intent.destination;
      }
    }

    function handoffGuideToBuild({ city = "", country = "" } = {}) {
      const targetDestination = city || country;
      if (city) {
        applyGuidePlanningContextFromCity(city);
      } else if (country) {
        applyGuidePlanningContextFromCountry(country);
      } else {
        return;
      }

      hbState.guideBuildIntent = {
        sourceType: city ? "city" : "country",
        sourceLocation: city || country,
        destination: targetDestination
      };
      hbState.appState.destination = targetDestination;
      if (hbRefs.formBindings.destination) {
        hbRefs.formBindings.destination.value = targetDestination;
      }
      updateStateFromInputs();
      renderPanelContent("build-panel");
      setActivePanel("build-panel");
      window.setTimeout(() => {
        hbState.appState.destination = targetDestination;
        if (hbRefs.formBindings.destination) {
          hbRefs.formBindings.destination.value = targetDestination;
        }
        renderGuidePlanningContext();
        if (hbState.activePanelId !== "build-panel" || window.location.hash !== "#build") {
          setActivePanel("build-panel");
        }
      }, 32);
      window.requestAnimationFrame(() => {
        document.getElementById("build-guide-context")?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    }

    function handleGuideActionTrigger(trigger, event) {
      if (!trigger) return false;
      const now = Date.now();

      if ((trigger.dataset.action === "use-city-guide" && trigger.dataset.city) || (trigger.dataset.action === "use-country-guide" && trigger.dataset.country)) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (now - lastGuideHandoffAt < 250) return true;
        lastGuideHandoffAt = now;
        handoffGuideToBuild({
          city: trigger.dataset.city || "",
          country: trigger.dataset.country || ""
        });
        return true;
      }

      if (trigger.dataset.action === "clear-guide-context") {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        clearGuidePlanningContext();
        return true;
      }

      if (trigger.dataset.action === "open-guide-context-source") {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        reopenGuidePlanningSource();
        return true;
      }

      return false;
    }

    function wireGuideActionButtons(scope = document) {
      scope.querySelectorAll("[data-action='use-city-guide']").forEach((button) => {
        if (button.dataset.hbBound === "1") return;
        button.dataset.hbBound = "1";
        button.addEventListener("click", (event) => {
          handleGuideActionTrigger(button, event);
        });
      });

      scope.querySelectorAll("[data-action='use-country-guide']").forEach((button) => {
        if (button.dataset.hbBound === "1") return;
        button.dataset.hbBound = "1";
        button.addEventListener("click", (event) => {
          handleGuideActionTrigger(button, event);
        });
      });

      scope.querySelectorAll("[data-action='clear-guide-context']").forEach((button) => {
        if (button.dataset.hbBound === "1") return;
        button.dataset.hbBound = "1";
        button.addEventListener("click", (event) => {
          handleGuideActionTrigger(button, event);
        });
      });
    }

    function openAccountModal() {
      hbRefs.accountModal.classList.add("is-open");
    }

    function closeAccountModal() {
      hbRefs.accountModal.classList.remove("is-open");
    }

    function toggleMenuDrawer(forceOpen = null) {
      const shouldOpen = forceOpen === null ? !hbRefs.menuDrawer.classList.contains("is-open") : forceOpen;
      hbRefs.menuDrawer.classList.toggle("is-open", shouldOpen);
    }

    function updateBudgetHelper() {
      const helper = document.getElementById("budget-helper");
      if (!helper) return;
      helper.textContent = hbData.budgetGuidance[hbState.appState.budget] || hbData.budgetGuidance.Moderate;
    }

    function updateFlightUI() {
      const helpFields = document.getElementById("flight-help-fields");
      const existingFields = document.getElementById("existing-flight-fields");
      if (!helpFields || !existingFields) return;
      helpFields.classList.toggle("hidden", hbState.appState.flightMode !== "need-help");
      existingFields.classList.toggle("hidden", hbState.appState.flightMode !== "have-flights");
    }


    function getRouteForPanel(targetId) {
      if (targetId === "editorial-guide-panel") {
        return `city-guides/${slugifyCity(hbState.selectedGuideCity)}`;
      }
      if (targetId === "editorial-country-panel") {
        return `country-guides/${slugifyCountry(hbState.selectedGuideCountry)}`;
      }
      return hbData.panelRouteMap[targetId] || "build";
    }

    function renderPanelContent(targetId) {
      const targetPanel = document.getElementById(targetId);
      if (targetId === "build-panel") {
        applyGuideBuildIntent();
        hbUtils.renderDestinationHero("build");
        renderGuidePlanningContext();
      }
      if (targetId === "explore-panel") {
        renderExploreMap();
      }
      if (targetId === "city-guides-panel") {
        renderCityGuidesLanding();
      }
      if (targetId === "country-guides-panel") {
        renderCountryGuidesLanding();
      }
      if (targetId === "editorial-guide-panel" && hbState.selectedGuideCity) {
        renderCityGuideDetail(hbState.selectedGuideCity);
      }
      if (targetId === "editorial-country-panel" && hbState.selectedGuideCountry) {
        renderCountryGuideDetail(hbState.selectedGuideCountry);
      }
      if (targetId === "blueprint-panel") {
        renderBlueprint();
      }
      if (targetId === "thinking-panel") {
        renderThinking();
      }
      if (targetId === "trip-panel") {
        renderTrip();
        renderTripMap();
      }
      if (targetId === "saved-panel") {
        renderSavedPanel();
      }
      if (targetPanel) {
        wireGuideActionButtons(targetPanel);
      }
    }

    function applyHashRoute() {
      const rawHash = window.location.hash.replace(/^#/, "");
      if (!rawHash) {
        setActivePanel("build-panel", { updateHash: false });
        return;
      }

      if (rawHash.startsWith("city-guides/")) {
        const slug = rawHash.replace("city-guides/", "");
        const city = findCityBySlug(slug);
        if (city) {
          hbState.selectedGuideCity = city;
          setActivePanel("editorial-guide-panel", { updateHash: false });
          return;
        }
      }

      if (rawHash.startsWith("country-guides/")) {
        const slug = rawHash.replace("country-guides/", "");
        const country = findCountryBySlug(slug);
        if (country) {
          hbState.selectedGuideCountry = country;
          setActivePanel("editorial-country-panel", { updateHash: false });
          return;
        }
      }

      const matchedPanel = Object.entries(hbData.panelRouteMap).find(([, route]) => route === rawHash)?.[0];
      if (matchedPanel) {
        setActivePanel(matchedPanel, { updateHash: false });
        return;
      }

      setActivePanel("build-panel", { updateHash: false });
    }

    function openCountryCitiesLibrary(country) {
      hbState.cityGuideRegionFilter = "all";
      hbState.cityGuideSearchQuery = country || "";
      applyGuidePlanningContextFromCountry(country || "");
      const searchInput = document.getElementById("city-guides-search");
      if (searchInput) {
        searchInput.value = hbState.cityGuideSearchQuery;
      }
      renderCityGuidesLanding();
      saveGuideBrowseMemory();
      setActivePanel("city-guides-panel");
    }

    function updateModeUI() {
      const isSimple = hbState.appState.mode === "simple";
      const modeExplainerTitle = document.getElementById("mode-explainer-title");
      const modeExplainerCopy = document.getElementById("mode-explainer-copy");
      hbRefs.detailedFields.classList.toggle("hidden", isSimple);
      hbRefs.modeBadge.textContent = isSimple ? "Simple mode" : "Detailed mode";
      if (modeExplainerTitle) {
        modeExplainerTitle.textContent = isSimple ? "Simple keeps this quick." : "Detailed gives you more control.";
      }
      if (modeExplainerCopy) {
        modeExplainerCopy.textContent = isSimple
          ? "You’ll stick to the core trip-shaping details and let the app do more of the work from there."
          : "You’ll unlock extra trip controls like trip feel, food importance, desired memory, and spontaneity.";
      }
      hbRefs.simpleModeBtn.classList.toggle("bg-white", isSimple);
      hbRefs.simpleModeBtn.classList.toggle("text-secondary", isSimple);
      hbRefs.simpleModeBtn.classList.toggle("shadow-sm", isSimple);
      hbRefs.simpleModeBtn.classList.toggle("text-muted", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("bg-white", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("text-secondary", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("shadow-sm", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("text-muted", isSimple);
    }

    function setActivePanel(targetId, options = {}) {
      const { updateHash = true } = options;
      rememberGuidePanelScroll();
      hbState.activePanelId = targetId;
      document.body.dataset.surface = targetId;
      closeAccountModal();
      toggleMenuDrawer(false);
      hbRefs.panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === targetId);
      });

      hbRefs.tabs.forEach((tab) => {
        const active = tab.dataset.target === targetId;
        tab.classList.toggle("bg-white", active);
        tab.classList.toggle("text-secondary", active);
        tab.classList.toggle("shadow-sm", active);
        tab.classList.toggle("text-muted", !active);
      });

      hbRefs.navTabs.forEach((tab) => {
        const active = tab.dataset.target === targetId;
        tab.classList.toggle("is-active", active);
        tab.classList.toggle("text-primary", active);
        tab.classList.toggle("text-muted", !active);
      });

      renderPanelContent(targetId);

      updatePrimaryCta();
      updateEditorialStickyBars();
      syncEditorialStickyObserver();
      saveGuideBrowseMemory();
      restoreGuidePanelScroll(targetId);
      if (updateHash) {
        const nextHash = getRouteForPanel(targetId);
        if (window.location.hash !== `#${nextHash}`) {
          window.location.hash = nextHash;
        }
      }
    }

    function clearThinkingTimers() {
      if (hbState.thinkingInterval) {
        clearInterval(hbState.thinkingInterval);
        hbState.thinkingInterval = null;
      }
      if (hbState.thinkingTimeout) {
        clearTimeout(hbState.thinkingTimeout);
        hbState.thinkingTimeout = null;
      }
    }

    function startThinkingSequence() {
      clearThinkingTimers();
      let index = 0;
      const headline = document.getElementById("thinking-headline");
      headline.textContent = hbData.headlineOptions[index];
      hbState.thinkingInterval = setInterval(() => {
        index = (index + 1) % hbData.headlineOptions.length;
        headline.textContent = hbData.headlineOptions[index];
      }, 1500);

      hbState.thinkingTimeout = setTimeout(() => {
        clearThinkingTimers();
        renderTrip();
        setActivePanel("trip-panel");
      }, 3200);
    }

    function generateTripFlow() {
      updateStateFromInputs();
      if (getCountryOnlySelection()) {
        setActivePanel("build-panel");
        return;
      }
      hbState.currentTrip = buildGeneratedTrip();
      hbState.liveDraftTrip = cloneData(hbState.currentTrip);
      hbState.activeTripSource = {
        type: "live",
        versionId: "",
        name: ""
      };
      hbState.compareVersionId = "";
      renderBlueprint();
      renderThinking();
      renderTrip();
      setActivePanel("blueprint-panel");
    }

    function continueToThinking() {
      renderThinking();
      setActivePanel("thinking-panel");
      startThinkingSequence();
    }

    hbRefs.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        clearThinkingTimers();
        if (tab.dataset.target === "blueprint-panel") {
          updateStateFromInputs();
          renderBlueprint();
        }
        if (tab.dataset.target === "trip-panel") {
          updateStateFromInputs();
          renderTrip();
        }
        if (tab.dataset.target === "details-panel") {
          updateStateFromInputs();
        }
        if (tab.dataset.target === "thinking-panel") {
          updateStateFromInputs();
          renderThinking();
        }
        if (tab.dataset.target === "saved-panel") {
          renderSavedPanel();
        }
        setActivePanel(tab.dataset.target);
      });
    });

    hbRefs.navTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        clearThinkingTimers();
        updateStateFromInputs();
        if (tab.dataset.target === "blueprint-panel") renderBlueprint();
        if (tab.dataset.target === "thinking-panel") renderThinking();
        if (tab.dataset.target === "trip-panel") renderTrip();
        if (tab.dataset.target === "details-panel") updateStateFromInputs();
        if (tab.dataset.target === "saved-panel") renderSavedPanel();
        setActivePanel(tab.dataset.target);
      });
    });

    document.querySelectorAll("[data-group='styles']").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.value;
        const exists = hbState.appState.styles.includes(value);
        if (exists) {
          hbState.appState.styles = hbState.appState.styles.filter((item) => item !== value);
          button.classList.remove("is-active");
        } else if (hbState.appState.styles.length < 3) {
          hbState.appState.styles.push(value);
          button.classList.add("is-active");
        }
      });
    });

    document.querySelectorAll(".choice-button").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.dataset.group;
        const value = button.dataset.value;
        document.querySelectorAll(`.choice-button[data-group='${group}']`).forEach((node) => {
          node.classList.remove("is-active");
        });
        button.classList.add("is-active");

        if (group === "pace") hbState.appState.pace = value;
        if (group === "depth") hbState.appState.depth = value;
        if (group === "foodImportance") hbState.appState.foodImportance = value;
        if (group === "memory") hbState.appState.memory = value;
        if (group === "spontaneity") hbState.appState.spontaneity = value;
      });
    });

    hbRefs.simpleModeBtn.addEventListener("click", () => {
      hbState.appState.mode = "simple";
      updateModeUI();
    });

    hbRefs.detailedModeBtn.addEventListener("click", () => {
      hbState.appState.mode = "detailed";
      updateModeUI();
      hbRefs.detailedFields.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    hbRefs.generateBtn.addEventListener("click", () => {
      if (hbState.activePanelId === "explore-panel") {
        setActivePanel("build-panel");
        return;
      }

      if (hbState.activePanelId === "build-panel") {
        updateStateFromInputs();
        openAccountModal();
        return;
      }

      if (hbState.activePanelId === "details-panel") {
        generateTripFlow();
        return;
      }

      if (hbState.activePanelId === "blueprint-panel") {
        continueToThinking();
        return;
      }

      if (hbState.activePanelId === "thinking-panel") {
        clearThinkingTimers();
        renderTrip();
        setActivePanel("trip-panel");
        return;
      }

      if (hbState.activePanelId === "saved-panel") {
        if (hbState.likedTrip) {
          hbState.currentTrip = cloneData(hbState.likedTrip);
          hbState.liveDraftTrip = cloneData(hbState.currentTrip);
          hbState.activeTripSource = {
            type: "live",
            versionId: "",
            name: ""
          };
          hbState.compareVersionId = "";
          renderTrip();
          setActivePanel("trip-panel");
          return;
        }
        setActivePanel("build-panel");
        return;
      }

      if (hbState.activePanelId === "trip-panel") {
        if (hbState.currentTrip && !hbState.likedTrip) {
          hbState.likedTrip = cloneData(hbState.currentTrip);
          renderTrip();
          renderSavedPanel();
        }
        setActivePanel(hbState.likedTrip ? "saved-panel" : "build-panel");
        return;
      }

      generateTripFlow();
    });

    hbRefs.cycleBtn.addEventListener("click", () => {
      clearThinkingTimers();
      let currentIndex = hbData.stageOrder.indexOf(hbState.activePanelId);
      currentIndex = (currentIndex + 1) % hbData.stageOrder.length;
      const nextId = hbData.stageOrder[currentIndex];
      updateStateFromInputs();
      if (nextId === "blueprint-panel") renderBlueprint();
      if (nextId === "thinking-panel") renderThinking();
      if (nextId === "trip-panel") renderTrip();
      if (nextId === "saved-panel") renderSavedPanel();
      setActivePanel(nextId);
    });

    hbRefs.tripPanel.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) {
        const step = event.target.closest(".timeline-step");
        if (step && !event.target.closest("button")) {
          renderTripMap(step.dataset.dayId, Number(step.dataset.stepIndex));
          return;
        }
        const dayCard = event.target.closest(".trip-day-card");
        if (dayCard && !event.target.closest("button")) {
          renderTripMap(dayCard.dataset.dayId);
        }
        return;
      }
      const { action, dayId, stepIndex, direction } = trigger.dataset;

      if (action === "toggle-day") toggleDayExpanded(dayId);
      if (action === "toggle-trip-facts") {
        hbState.tripFactsExpanded = !hbState.tripFactsExpanded;
        renderTrip();
      }
      if (action === "toggle-trip-section") {
        const section = trigger.dataset.section || "";
        if (section) {
          hbState.tripSectionVisibility = hbState.tripSectionVisibility || {};
          const current = typeof hbState.tripSectionVisibility[section] === "boolean"
            ? hbState.tripSectionVisibility[section]
            : section === "guide";
          hbState.tripSectionVisibility[section] = !current;
          renderTrip();
        }
      }
      if (action === "expand-all-days") setAllDayExpansion(true);
      if (action === "collapse-all-days") setAllDayExpansion(false);
      if (action === "swap-item") swapDayItem(dayId);
      if (action === "remove-item") removeDayItem(dayId);
      if (action === "undo-item") undoDayItem(dayId);
      if (action === "focus-trip-map") renderTripMap(dayId);
      if (action === "focus-trip-step") renderTripMap(dayId, Number(stepIndex));
      if (action === "reset-trip-map-step") renderTripMap(dayId);
      if (action === "move-timeline-step") moveTimelineStep(dayId, Number(stepIndex), Number(direction));
      if (action === "open-manual-adjust") {
        hbState.appState.mode = "detailed";
        updateModeUI();
        setActivePanel("details-panel");
      }
      if (action === "save-trip-logistics") {
        updateStateFromTripLogistics();
        if (hbState.currentTrip) {
          hbState.currentTrip.flightCard = buildFlightCard();
          hbState.currentTrip.stayCard = buildStayCard(getCityName());
        }
        renderTrip();
      }
      if (action === "save-journal-entry") {
        updateStateFromTripLogistics();
        updateJournalPreview();
        renderSavedPanel();
      }
      if (action === "save-alternate-version") {
        saveAlternateVersion(hbRefs.formBindings.alternateVersionName?.value || "");
      }
      if (action === "compare-just-saved-version") {
        clearAlternateVersionFeedback();
        compareAlternateVersion(trigger.dataset.versionId || hbState.alternateVersionFeedback?.id || "", { preferLiveDraft: true });
      }
      if (action === "compare-active-saved-version") {
        if (hbState.activeTripSource?.versionId) {
          compareAlternateVersion(hbState.activeTripSource.versionId, { preferLiveDraft: true });
        }
      }
      if (action === "open-just-saved-version") {
        const versionId = trigger.dataset.versionId || hbState.alternateVersionFeedback?.id || "";
        if (versionId) {
          clearAlternateVersionFeedback();
          restoreAlternateVersion(versionId);
        }
      }
      if (action === "fill-alternate-version-name") {
        const suggestedName = trigger.dataset.versionName || "";
        if (hbRefs.formBindings.alternateVersionName) {
          hbRefs.formBindings.alternateVersionName.value = suggestedName;
          hbRefs.formBindings.alternateVersionName.focus();
          hbRefs.formBindings.alternateVersionName.setSelectionRange(suggestedName.length, suggestedName.length);
        }
      }
      if (action === "save-liked") {
        hbState.likedTrip = cloneData(hbState.currentTrip);
        renderTrip();
      }
      if (action === "restore-liked" && hbState.likedTrip) {
        hbState.currentTrip = cloneData(hbState.likedTrip);
        hbState.liveDraftTrip = cloneData(hbState.currentTrip);
        hbState.activeTripSource = {
          type: "live",
          versionId: "",
          name: ""
        };
        hbState.compareVersionId = "";
        renderTrip();
      }
      if (action === "restore-live-draft") {
        restoreLiveDraft();
      }
      if (action === "open-trip-panel-version") {
        restoreAlternateVersion(trigger.dataset.versionId);
      }
      if (action === "compare-trip-panel-version") {
        compareAlternateVersion(trigger.dataset.versionId || "");
      }
      if (action === "clear-alternate-compare") {
        hbState.compareVersionId = "";
        renderTrip();
      }
    });

    hbRefs.tripPanel.addEventListener("mouseover", (event) => {
      const feedback = event.target.closest("#alternate-version-feedback");
      if (!feedback) return;
      pauseAlternateVersionFeedbackDismiss();
    });

    hbRefs.tripPanel.addEventListener("mouseout", (event) => {
      const feedback = event.target.closest("#alternate-version-feedback");
      if (!feedback) return;
      const related = event.relatedTarget;
      if (related instanceof Node && feedback.contains(related)) return;
      resumeAlternateVersionFeedbackDismiss();
    });

    hbRefs.tripPanel.addEventListener("focusin", (event) => {
      const feedback = event.target.closest("#alternate-version-feedback");
      if (!feedback) return;
      feedback.classList.add("is-focus-hinted");
      pauseAlternateVersionFeedbackDismiss();
    });

    hbRefs.tripPanel.addEventListener("focusout", (event) => {
      const feedback = event.target.closest("#alternate-version-feedback");
      if (!feedback) return;
      const related = event.relatedTarget;
      if (related instanceof Node && feedback.contains(related)) return;
      feedback.classList.remove("is-focus-hinted");
      resumeAlternateVersionFeedbackDismiss();
    });

    hbRefs.tripPanel.addEventListener("keydown", (event) => {
      const feedback = event.target.closest?.("#alternate-version-feedback");
      if (event.key === "Escape" && feedback) {
        event.preventDefault();
        clearAlternateVersionFeedback();
        renderTrip();
        return;
      }

      if (event.target === hbRefs.formBindings.alternateVersionName && event.key === "Enter") {
        event.preventDefault();
        saveAlternateVersion(hbRefs.formBindings.alternateVersionName?.value || "");
        return;
      }

      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("button")) return;

      const step = event.target.closest(".timeline-step");
      if (step) {
        event.preventDefault();
        renderTripMap(step.dataset.dayId, Number(step.dataset.stepIndex));
        return;
      }

      const dayCard = event.target.closest(".trip-day-card");
      if (dayCard) {
        event.preventDefault();
        renderTripMap(dayCard.dataset.dayId);
      }
    });

    hbRefs.tripPanel.addEventListener("dragstart", (event) => {
      const step = event.target.closest(".timeline-step[draggable='true']");
      if (step && !event.target.closest("button")) {
        hbState.draggedTimelineStep = {
          dayId: step.dataset.dayId,
          stepIndex: Number(step.dataset.stepIndex)
        };

        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", `${hbState.draggedTimelineStep.dayId}:${hbState.draggedTimelineStep.stepIndex}`);
        }
        return;
      }

      const dayCard = event.target.closest(".trip-day-card[draggable='true']");
      if (!dayCard || event.target.closest("button")) return;

      hbState.draggedTripDayId = dayCard.dataset.dayId;
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", hbState.draggedTripDayId);
      }
    });

    hbRefs.tripPanel.addEventListener("dragover", (event) => {
      const step = event.target.closest(".timeline-step[draggable='true']");
      if (step && hbState.draggedTimelineStep) {
        if (step.dataset.dayId !== hbState.draggedTimelineStep.dayId) return;
        event.preventDefault();
        step.classList.add("is-drag-target");
        return;
      }

      const dayCard = event.target.closest(".trip-day-card[draggable='true']");
      if (!dayCard || !hbState.draggedTripDayId) return;
      if (dayCard.dataset.dayId === hbState.draggedTripDayId) return;

      event.preventDefault();
      dayCard.classList.add("is-drag-target");
    });

    hbRefs.tripPanel.addEventListener("dragleave", (event) => {
      const step = event.target.closest(".timeline-step[draggable='true']");
      if (step) {
        step.classList.remove("is-drag-target");
      }

      const dayCard = event.target.closest(".trip-day-card[draggable='true']");
      if (dayCard) {
        dayCard.classList.remove("is-drag-target");
      }
    });

    hbRefs.tripPanel.addEventListener("drop", (event) => {
      const step = event.target.closest(".timeline-step[draggable='true']");
      if (step && hbState.draggedTimelineStep) {
        if (step.dataset.dayId !== hbState.draggedTimelineStep.dayId) return;
        event.preventDefault();
        step.classList.remove("is-drag-target");
        reorderTimelineStep(
          hbState.draggedTimelineStep.dayId,
          hbState.draggedTimelineStep.stepIndex,
          Number(step.dataset.stepIndex)
        );
        hbState.draggedTimelineStep = null;
        return;
      }

      const dayCard = event.target.closest(".trip-day-card[draggable='true']");
      if (!dayCard || !hbState.draggedTripDayId) return;
      if (dayCard.dataset.dayId === hbState.draggedTripDayId) return;

      event.preventDefault();
      dayCard.classList.remove("is-drag-target");
      reorderTripDay(hbState.draggedTripDayId, dayCard.dataset.dayId);
      hbState.draggedTripDayId = null;
    });

    hbRefs.tripPanel.addEventListener("dragend", () => {
      hbState.draggedTripDayId = null;
      hbState.draggedTimelineStep = null;
      hbRefs.tripPanel.querySelectorAll(".timeline-step.is-drag-target, .trip-day-card.is-drag-target").forEach((node) => {
        node.classList.remove("is-drag-target");
      });
    });

    hbRefs.explorePanel.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;
      const { action } = trigger.dataset;

      if (action === "open-build") {
        setActivePanel("build-panel");
      }

      if (action === "open-trip-preview") {
        updateStateFromInputs();
        renderTrip();
        setActivePanel("trip-panel");
      }

      if (action === "focus-explore-map") {
        renderExploreMap(trigger.dataset.area);
      }
    });

    document.getElementById("details-panel").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;

      if (trigger.dataset.action === "open-explore-guides") {
        renderExploreMap();
        setActivePanel("explore-panel");
      }

      if (trigger.dataset.action === "open-trip-guides") {
        renderTrip();
        setActivePanel("trip-panel");
      }
    });

    document.getElementById("trip-form").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action='choose-destination']");
      if (!trigger) return;
      hbRefs.formBindings.destination.value = trigger.dataset.value;
      hbState.destinationSuggestionIndex = -1;
      updateStateFromInputs();
    });

    document.addEventListener("pointerup", (event) => {
      const trigger = event.target.closest("[data-action]");
      handleGuideActionTrigger(trigger, event);
    }, true);

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      handleGuideActionTrigger(trigger, event);
    }, true);

    document.getElementById("build-panel").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;

      if (trigger.dataset.action === "clear-guide-context") {
        clearGuidePlanningContext();
      }
    });

    document.querySelectorAll(".account-option").forEach((button) => {
      button.addEventListener("click", () => {
        hbState.appState.accountMethod = button.dataset.provider;
        closeAccountModal();
        setActivePanel("details-panel");
      });
    });

    hbRefs.closeAccountModalBtn.addEventListener("click", () => {
      closeAccountModal();
    });

    hbRefs.skipAccountBtn.addEventListener("click", () => {
      hbState.appState.accountMethod = "guest";
      closeAccountModal();
      setActivePanel("details-panel");
    });

    hbRefs.accountModal.addEventListener("click", (event) => {
      if (event.target === hbRefs.accountModal) {
        closeAccountModal();
      }
    });

    hbRefs.manualAdjustBtn.addEventListener("click", () => {
      hbState.appState.mode = "detailed";
      updateModeUI();
      setActivePanel("details-panel");
    });

    hbRefs.headerMenuBtn.addEventListener("click", () => {
      toggleMenuDrawer();
    });

    hbRefs.menuDrawer.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-menu-action]");
      if (!trigger) return;

      const action = trigger.dataset.menuAction;
      if (action === "plan-trip") {
        setActivePanel("build-panel");
      }
      if (action === "my-trip") {
        renderTrip();
        setActivePanel("trip-panel");
      }
      if (action === "city-guides") {
        renderCityGuidesLanding();
        setActivePanel("city-guides-panel");
      }
      if (action === "country-guides") {
        renderCountryGuidesLanding();
        setActivePanel("country-guides-panel");
      }
      if (action === "faq") {
        setActivePanel("faq-panel");
      }
      if (action === "contact") {
        setActivePanel("contact-panel");
      }
    });

    hbRefs.formBindings.destination.addEventListener("blur", () => {
      setTimeout(() => {
        document.getElementById("destination-autofill")?.classList.add("hidden");
      }, 120);
    });

    hbRefs.formBindings.destination.addEventListener("focus", () => {
      updateDestinationAutofill();
    });

    hbRefs.formBindings.destination.addEventListener("keydown", (event) => {
      const matches = getDestinationMatches();
      if (!matches.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setDestinationSuggestionIndex(hbState.destinationSuggestionIndex + 1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setDestinationSuggestionIndex(hbState.destinationSuggestionIndex - 1);
        return;
      }

      if (event.key === "Enter" && hbState.destinationSuggestionIndex >= 0) {
        event.preventDefault();
        applyDestinationSuggestionSelection();
        return;
      }

      if (event.key === "Escape") {
        hbState.destinationSuggestionIndex = -1;
        document.getElementById("destination-autofill")?.classList.add("hidden");
      }
    });

    hbRefs.savedPanel.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;
      const { action } = trigger.dataset;

      if (action === "open-trip") {
        renderTrip();
        setActivePanel("trip-panel");
      }

      if (action === "open-build") {
        setActivePanel("build-panel");
      }

      if (action === "restore-liked" && hbState.likedTrip) {
        hbState.currentTrip = cloneData(hbState.likedTrip);
        hbState.liveDraftTrip = cloneData(hbState.currentTrip);
        hbState.activeTripSource = {
          type: "live",
          versionId: "",
          name: ""
        };
        hbState.compareVersionId = "";
        renderTrip();
        setActivePanel("trip-panel");
      }

      if (action === "restore-live-draft") {
        restoreLiveDraft();
        setActivePanel("trip-panel");
      }

      if (action === "open-saved-panel-version") {
        restoreAlternateVersion(trigger.dataset.versionId);
        setActivePanel("trip-panel");
      }

      if (action === "compare-saved-panel-version") {
        compareAlternateVersion(trigger.dataset.versionId || "", { preferLiveDraft: true });
        setActivePanel("trip-panel");
      }
    });

    document.getElementById("city-guides-panel").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;

      const { action, city, country } = trigger.dataset;

      if (action === "fill-city-guide-search" && city) {
        const searchInput = document.getElementById("city-guides-search");
        if (searchInput) {
          searchInput.value = city;
        }
        hbState.cityGuideSearchQuery = city;
        renderCityGuidesLanding();
        return;
      }

      if (action === "open-city-guide" && city) {
        hbState.selectedGuideCity = city;
        hbState.guideActionState.city = `Opened ${city.split(",")[0]}`;
        renderCityGuideDetail(city);
        setActivePanel("editorial-guide-panel");
        return;
      }

      if (action === "open-country-guide" && country) {
        hbState.selectedGuideCountry = country;
        hbState.guideActionState.country = `Opened ${country}`;
        renderCountryGuideDetail(country);
        setActivePanel("editorial-country-panel");
        return;
      }

      if (action === "use-country-guide" && country) {
        handoffGuideToBuild({ country });
        return;
      }

      if (action === "clear-city-guide-search") {
        hbState.cityGuideSearchQuery = "";
        hbState.cityGuideSuggestionIndex = -1;
        const searchInput = document.getElementById("city-guides-search");
        if (searchInput) searchInput.value = "";
        renderCityGuidesLanding();
        return;
      }

      if (action === "clear-city-guide-region") {
        hbState.cityGuideRegionFilter = "all";
        const regionSelect = document.getElementById("city-guides-continent");
        if (regionSelect) regionSelect.value = "all";
        renderCityGuidesLanding();
        return;
      }

      if (action === "use-city-guide" && city) {
        handoffGuideToBuild({ city });
        return;
      }

      if (action === "open-country-guides-home") {
        renderCountryGuidesLanding();
        setActivePanel("country-guides-panel");
        return;
      }

      if (action === "hub-compare-city" && city && trigger.dataset.compareCity) {
        hbState.guideHubCompare = {
          type: "city",
          current: city,
          target: trigger.dataset.compareCity
        };
        renderCityGuidesLanding();
        saveGuideBrowseMemory();
        return;
      }

      if (action === "clear-hub-compare") {
        hbState.guideHubCompare = { type: "", current: "", target: "" };
        renderCityGuidesLanding();
        saveGuideBrowseMemory();
        return;
      }
    });

    document.getElementById("country-guides-panel").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;

      const { action, country } = trigger.dataset;

      if (action === "fill-country-guide-search" && country) {
        const searchInput = document.getElementById("country-guides-search");
        if (searchInput) {
          searchInput.value = country;
        }
        hbState.countryGuideSearchQuery = country;
        renderCountryGuidesLanding();
        return;
      }

      if (action === "open-country-guide" && country) {
        hbState.selectedGuideCountry = country;
        hbState.guideActionState.country = `Opened ${country}`;
        renderCountryGuideDetail(country);
        setActivePanel("editorial-country-panel");
        return;
      }

      if (action === "open-country-cities" && country) {
        openCountryCitiesLibrary(country);
        return;
      }

      if (action === "use-country-guide" && country) {
        handoffGuideToBuild({ country });
        return;
      }

      if (action === "clear-country-guide-search") {
        hbState.countryGuideSearchQuery = "";
        hbState.countryGuideSuggestionIndex = -1;
        const searchInput = document.getElementById("country-guides-search");
        if (searchInput) searchInput.value = "";
        renderCountryGuidesLanding();
        return;
      }

      if (action === "clear-country-guide-region") {
        hbState.countryGuideRegionFilter = "all";
        const regionSelect = document.getElementById("country-guides-continent");
        if (regionSelect) regionSelect.value = "all";
        renderCountryGuidesLanding();
        return;
      }

      if (action === "open-city-guides-home") {
        renderCityGuidesLanding();
        setActivePanel("city-guides-panel");
        return;
      }

      if (action === "hub-compare-country" && country && trigger.dataset.compareCountry) {
        hbState.guideHubCompare = {
          type: "country",
          current: country,
          target: trigger.dataset.compareCountry
        };
        renderCountryGuidesLanding();
        saveGuideBrowseMemory();
        return;
      }

      if (action === "clear-hub-compare") {
        hbState.guideHubCompare = { type: "", current: "", target: "" };
        renderCountryGuidesLanding();
        saveGuideBrowseMemory();
        return;
      }
    });

    document.getElementById("editorial-guide-panel").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;

      const { action, city, country, sectionId } = trigger.dataset;

      if (action === "open-city-guides-home") {
        renderCityGuidesLanding();
        setActivePanel("city-guides-panel");
        return;
      }

      if (action === "open-city-guide" && city) {
        hbState.selectedGuideCity = city;
        hbState.guideActionState.city = `Opened ${city.split(",")[0]}`;
        renderCityGuideDetail(city);
        setActivePanel("editorial-guide-panel");
        return;
      }

      if (action === "open-country-guide" && country) {
        hbState.selectedGuideCountry = country;
        hbState.guideActionState.country = `Opened ${country}`;
        renderCountryGuideDetail(country);
        setActivePanel("editorial-country-panel");
        return;
      }

      if (action === "use-city-guide" && city) {
        handoffGuideToBuild({ city });
        return;
      }

      if (action === "clear-guide-context") {
        clearGuidePlanningContext();
        return;
      }

      if (action === "compare-city-guide" && city && trigger.dataset.compareCity) {
        hbState.guideCompare = {
          type: "city",
          current: city,
          target: trigger.dataset.compareCity
        };
        renderCityGuideDetail(city);
        saveGuideBrowseMemory();
        return;
      }

      if (action === "clear-guide-compare") {
        hbState.guideCompare = { type: "", current: "", target: "" };
        renderCityGuideDetail(hbState.selectedGuideCity);
        saveGuideBrowseMemory();
        return;
      }

      if (action === "scroll-guide-section" && sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    document.getElementById("editorial-country-panel").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;

      const { action, country, city } = trigger.dataset;

      if (action === "open-country-guides-home") {
        renderCountryGuidesLanding();
        setActivePanel("country-guides-panel");
        return;
      }

      if (action === "open-country-cities" && country) {
        openCountryCitiesLibrary(country);
        return;
      }

      if (action === "open-city-guide" && city) {
        hbState.selectedGuideCity = city;
        hbState.guideActionState.city = `Opened ${city.split(",")[0]}`;
        renderCityGuideDetail(city);
        setActivePanel("editorial-guide-panel");
        return;
      }

      if (action === "open-city-guide-compare" && city && trigger.dataset.compareCity) {
        hbState.selectedGuideCity = city;
        hbState.guideCompare = {
          type: "city",
          current: city,
          target: trigger.dataset.compareCity
        };
        hbState.guideActionState.city = `Opened ${city.split(",")[0]}`;
        renderCityGuideDetail(city);
        saveGuideBrowseMemory();
        setActivePanel("editorial-guide-panel");
        return;
      }

      if (action === "use-city-guide" && city) {
        handoffGuideToBuild({ city });
        return;
      }

      if (action === "use-country-guide" && country) {
        handoffGuideToBuild({ country });
        return;
      }

      if (action === "open-country-guide" && country) {
        hbState.selectedGuideCountry = country;
        hbState.guideActionState.country = `Opened ${country}`;
        renderCountryGuideDetail(country);
        setActivePanel("editorial-country-panel");
        return;
      }

      if (action === "compare-country-guide" && country && trigger.dataset.compareCountry) {
        hbState.guideCompare = {
          type: "country",
          current: country,
          target: trigger.dataset.compareCountry
        };
        renderCountryGuideDetail(country);
        saveGuideBrowseMemory();
        return;
      }

      if (action === "clear-guide-compare") {
        hbState.guideCompare = { type: "", current: "", target: "" };
        renderCountryGuideDetail(hbState.selectedGuideCountry);
        saveGuideBrowseMemory();
        return;
      }
    });

    document.getElementById("city-guides-search")?.addEventListener("input", (event) => {
      hbState.cityGuideSearchQuery = event.target.value.trim();
      hbState.cityGuideSuggestionIndex = -1;
      renderCityGuidesLanding();
    });

    document.getElementById("city-guides-search")?.addEventListener("focus", () => {
      renderCityGuideSuggestions();
    });

    document.getElementById("city-guides-search")?.addEventListener("blur", () => {
      setTimeout(() => {
        document.getElementById("city-guides-search-suggestions")?.classList.add("hidden");
      }, 120);
    });

    document.getElementById("city-guides-search")?.addEventListener("keydown", (event) => {
      const suggestions = getCombinedCityGuideSuggestions();
      if (!suggestions.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCityGuideSuggestionIndex(hbState.cityGuideSuggestionIndex + 1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setCityGuideSuggestionIndex(hbState.cityGuideSuggestionIndex - 1);
        return;
      }

      if (event.key === "Enter" && hbState.cityGuideSuggestionIndex >= 0) {
        event.preventDefault();
        applyCityGuideSuggestionSelection();
        return;
      }

      if (event.key === "Escape") {
        hbState.cityGuideSuggestionIndex = -1;
        document.getElementById("city-guides-search-suggestions")?.classList.add("hidden");
      }
    });

    document.getElementById("city-guides-continent")?.addEventListener("change", (event) => {
      hbState.cityGuideRegionFilter = event.target.value;
      renderCityGuidesLanding();
    });

    document.getElementById("country-guides-search")?.addEventListener("input", (event) => {
      hbState.countryGuideSearchQuery = event.target.value.trim();
      hbState.countryGuideSuggestionIndex = -1;
      renderCountryGuidesLanding();
    });

    document.getElementById("country-guides-search")?.addEventListener("focus", () => {
      renderCountryGuideSuggestions();
    });

    document.getElementById("country-guides-search")?.addEventListener("blur", () => {
      setTimeout(() => {
        document.getElementById("country-guides-search-suggestions")?.classList.add("hidden");
      }, 120);
    });

    document.getElementById("country-guides-search")?.addEventListener("keydown", (event) => {
      const suggestions = getCombinedCountryGuideSuggestions();
      if (!suggestions.length) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCountryGuideSuggestionIndex(hbState.countryGuideSuggestionIndex + 1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setCountryGuideSuggestionIndex(hbState.countryGuideSuggestionIndex - 1);
        return;
      }

      if (event.key === "Enter" && hbState.countryGuideSuggestionIndex >= 0) {
        event.preventDefault();
        applyCountryGuideSuggestionSelection();
        return;
      }

      if (event.key === "Escape") {
        hbState.countryGuideSuggestionIndex = -1;
        document.getElementById("country-guides-search-suggestions")?.classList.add("hidden");
      }
    });

    document.getElementById("country-guides-continent")?.addEventListener("change", (event) => {
      hbState.countryGuideRegionFilter = event.target.value;
      renderCountryGuidesLanding();
    });

    hbRefs.formBindings.destination.addEventListener("input", updateStateFromInputs);
    hbRefs.formBindings.startDate.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.endDate.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.adults.addEventListener("input", updateStateFromInputs);
    hbRefs.formBindings.children.addEventListener("input", updateStateFromInputs);
    hbRefs.formBindings.pets.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.flightMode.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.flightPreference.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.flightAirline.addEventListener("input", updateStateFromInputs);
    hbRefs.formBindings.flightNumber.addEventListener("input", updateStateFromInputs);
    hbRefs.formBindings.arrivalFlight.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.departureFlight.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.budget.addEventListener("change", updateStateFromInputs);
    hbRefs.formBindings.mustHaves.addEventListener("input", updateStateFromInputs);

    window.addEventListener("hashchange", applyHashRoute);
    window.addEventListener("scroll", scheduleEditorialStickyBarsUpdate, { passive: true });
    window.addEventListener("resize", scheduleEditorialStickyBarsUpdate, { passive: true });

    restoreGuideBrowseMemory();
    updateModeUI();
    updateBudgetHelper();
    updateFlightUI();
    updateDestinationHelper();
    updatePrimaryCta();
    updateEditorialStickyBars();
    syncEditorialStickyObserver();
    renderPanelContent("build-panel");
    applyHashRoute();
    window.requestAnimationFrame(applyHashRoute);
    window.addEventListener("load", applyHashRoute, { once: true });
    window.addEventListener("load", updateEditorialStickyBars, { once: true });
    window.addEventListener("load", syncEditorialStickyObserver, { once: true });

    Object.assign(hbUtils, {
      updatePrimaryCta,
      openAccountModal,
      closeAccountModal,
      toggleMenuDrawer,
      updateBudgetHelper,
      updateFlightUI,
      getRouteForPanel,
      applyHashRoute,
      updateModeUI,
      scheduleEditorialStickyBarsUpdate,
      syncEditorialStickyObserver,
      updateEditorialStickyBars,
      renderPanelContent,
      setActivePanel
    });
})();
