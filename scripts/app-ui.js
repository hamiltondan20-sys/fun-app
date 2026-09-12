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
  getTripLength,
  buildTravelerText,
  setDestinationSuggestionIndex,
  applyDestinationSuggestionSelection,
  updateDestinationAutofill,
  updateDestinationHelper,
  renderCityGuidesLanding,
  renderCountryGuidesLanding,
  renderCountryGuideDetail,
  renderCityGuideDetail,
  getCityGuideCategoryRoute,
  buildFlightCard,
  buildStayCard,
  updateStateFromTripLogistics,
  updateJournalPreview,
  cloneData,
  hydrateTripProfile,
  persistTripProfile,
  hydrateSavedDraftStatus,
  persistTripDraft,
  restoreSavedDraft,
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
  adjustDayQuality,
  updateBookingItemStatus,
  updateBookingItemNote,
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
    let bookingNoteSaveTimer = null;
    let bottomBarResizeObserver = null;
    let accountModalPreviousFocus = null;

    function escapeUiHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function queueBookingNoteSave(noteControl) {
      if (!noteControl) return;
      window.clearTimeout(bookingNoteSaveTimer);
      const bookingId = noteControl.dataset.bookingId || "";
      const noteValue = noteControl.value;
      bookingNoteSaveTimer = window.setTimeout(() => {
        updateBookingItemNote(bookingId, noteValue, {
          feedback: "Booking note saved",
          render: false
        });
      }, 450);
    }

function updatePrimaryCta() {
      const guidePanels = new Set(["city-discovery-panel", "city-guides-panel", "country-guides-panel", "editorial-guide-panel", "editorial-country-panel"]);
      const isGuideMode = guidePanels.has(hbState.activePanelId);
      hbRefs.bottomBar?.classList.toggle("is-guide-mode", isGuideMode);
      hbRefs.generateBtn.disabled = false;
      if (hbState.activePanelId === "explore-panel") {
        hbRefs.generateBtn.textContent = "Start Building";
        return;
      }
      if (hbState.activePanelId === "city-discovery-panel") {
        hbRefs.generateBtn.textContent = "Choose a city";
        return;
      }
      if (hbState.activePanelId === "build-panel") {
        hbRefs.generateBtn.textContent = "Next: Preferences";
        return;
      }
      if (hbState.activePanelId === "details-panel") {
        hbRefs.generateBtn.textContent = "Review My Trip";
        return;
      }
      if (hbState.activePanelId === "blueprint-panel") {
        hbRefs.generateBtn.textContent = "Build My Trip";
        return;
      }
      if (hbState.activePanelId === "thinking-panel") {
        hbRefs.generateBtn.textContent = "Open My Trip";
        return;
      }
      if (hbState.activePanelId === "trip-panel") {
        hbRefs.generateBtn.textContent = "Save Draft";
        return;
      }
      if (hbState.activePanelId === "saved-panel") {
        hbRefs.generateBtn.textContent = hbState.savedDraft ? "Restore Draft" : "Start a Trip";
        return;
      }
      hbRefs.generateBtn.textContent = "Generate Your Trip";
    }

    function updateFlowStatus() {
      if (!hbRefs.flowStatusCurrent || !hbRefs.flowStatusFocus || !hbRefs.flowStatusCopy || !hbRefs.flowStatusNext) return;
      const city = getCityName();
      const savedCount = hbState.alternateTrips?.length || 0;
      const flowMap = {
        "explore-panel": {
          current: "Explore ideas",
          focus: "Find a place or a kind of trip that feels right.",
          copy: "Browse guides, compare places, or preview a trip before you enter any details.",
          next: "Start building"
        },
        "city-discovery-panel": {
          current: "Choose a destination",
          focus: "Choose a country and compare cities that fit your trip.",
          copy: "Start with a country, compare three city ideas, and choose the one that feels right.",
          next: "Choose a city"
        },
        "city-guides-panel": {
          current: "City guides",
          focus: "Choose a city with enough context to plan confidently.",
          copy: "Search by city, country, or vibe, then use a guide to start planning.",
          next: "Use a city"
        },
        "country-guides-panel": {
          current: "Country guides",
          focus: "Start with the country when you are still choosing a city.",
          copy: "Compare regions and leading cities before choosing where to stay.",
          next: "Choose a base"
        },
        "editorial-guide-panel": {
          current: "City guide",
          focus: "Use this city as the starting point for your itinerary.",
          copy: "Take the ideas you like into Build so the plan starts with something specific.",
          next: "Plan from this guide"
        },
        "editorial-country-panel": {
          current: "Country guide",
          focus: "Turn the country into a trip that feels right for you.",
          copy: "Start with a city that fits, then adjust the dates, pace, and budget.",
          next: "Pick trip basics"
        },
        "build-panel": {
          current: "Trip basics",
          focus: `Start with the basics for ${city}.`,
          copy: "Add your dates, travelers, and a few details that help us make the plan realistic.",
          next: "Choose preferences"
        },
        "details-panel": {
          current: "Preferences",
          focus: "Choose what should shape the trip most.",
          copy: "Tell us what you want more of, how full the days should feel, and anything to avoid.",
          next: "Review my trip"
        },
        "blueprint-panel": {
          current: "Trip review",
          focus: "Check your trip details before the day-by-day plan is built.",
          copy: "Change anything that feels off, then build the trip when it looks right.",
          next: "Build my trip"
        },
        "thinking-panel": {
          current: "Building",
          focus: "Putting your choices into a first draft.",
          copy: "The next screen opens with the overview first, then the day-by-day details.",
          next: "Open your trip"
        },
        "trip-panel": {
          current: "Your trip",
          focus: "Review, adjust, and save the itinerary.",
          copy: "Use the map, edit days, save versions, and keep a draft when the trip feels useful.",
          next: "Save or compare"
        },
        "saved-panel": {
          current: "Saved",
          focus: "Keep your draft, profile, and favorite versions together.",
          copy: savedCount
            ? `${savedCount} saved trip version${savedCount === 1 ? "" : "s"} available to view or compare.`
            : "Save a draft or version once there is a trip worth keeping.",
          next: hbState.savedDraft ? "Restore draft" : "Build a trip"
        },
        "faq-panel": {
          current: "Help",
          focus: "Get answers to common planning questions.",
          copy: "Jump back into Build when you are ready to keep planning.",
          next: "Return to Build"
        },
        "contact-panel": {
          current: "Contact",
          focus: "Find the right way to reach us.",
          copy: "Use this for trip help, product feedback, account questions, or partnerships.",
          next: "Return to planning"
        }
      };
      const status = flowMap[hbState.activePanelId] || flowMap["build-panel"];
      hbRefs.flowStatusCurrent.textContent = status.current;
      hbRefs.flowStatusFocus.textContent = status.focus;
      hbRefs.flowStatusCopy.textContent = status.copy;
      hbRefs.flowStatusNext.textContent = status.next;
    }

    function updateEditorialStickyBars() {
      const shouldCompact = window.scrollY > 280;
      ["city-guide-sticky-actions", "country-guide-sticky-actions"].forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        node.classList.toggle("is-compact", shouldCompact);
      });
    }

    function syncBottomContentPadding() {
      const bar = hbRefs.bottomBar;
      if (!bar) return;
      const height = Math.ceil(bar.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--hb-bottom-pad", `${height + 24}px`);
      if (!bottomBarResizeObserver && typeof window.ResizeObserver === "function") {
        bottomBarResizeObserver = new window.ResizeObserver(syncBottomContentPadding);
        bottomBarResizeObserver.observe(bar);
      }
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
          selectedGuideCategory: hbState.selectedGuideCategory,
          selectedGuideCountry: hbState.selectedGuideCountry,
          cityDiscoveryCountry: hbState.cityDiscoveryCountry,
          cityDiscoveryMood: hbState.cityDiscoveryMood,
          cityGuideSearchQuery: hbState.cityGuideSearchQuery,
          cityGuideRegionFilter: hbState.cityGuideRegionFilter,
          countryGuideSearchQuery: hbState.countryGuideSearchQuery,
          countryGuideRegionFilter: hbState.countryGuideRegionFilter,
          panelScrollMemory: hbState.panelScrollMemory,
          guidePlanContext: hbState.guidePlanContext,
          guideCompare: hbState.guideCompare,
          guideHubCompare: hbState.guideHubCompare,
          guideBuildIntent: hbState.guideBuildIntent,
          guideAddedItems: hbState.guideAddedItems
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
        hbState.selectedGuideCategory = payload.selectedGuideCategory || "";
        hbState.selectedGuideCountry = payload.selectedGuideCountry || hbState.selectedGuideCountry;
        hbState.cityDiscoveryCountry = payload.cityDiscoveryCountry || "";
        hbState.cityDiscoveryMood = payload.cityDiscoveryMood || "";
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
          signals: null,
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
        hbState.guideAddedItems = Array.isArray(payload.guideAddedItems) ? payload.guideAddedItems : [];
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
        suggestedBase: "",
        signals: null
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
        document.getElementById("build-core-section")?.scrollIntoView({ block: "start", behavior: "smooth" });
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
      const profile = hbState.tripProfile || {};
      const fields = {
        "local-account-name-input": profile.displayName || "",
        "local-account-email-input": profile.email || "",
        "local-account-airport-input": profile.homeAirport || ""
      };
      Object.entries(fields).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) input.value = value;
      });
      accountModalPreviousFocus = document.activeElement;
      hbRefs.accountModal.classList.add("is-open");
      window.requestAnimationFrame(() => {
        document.getElementById("local-account-name-input")?.focus({ preventScroll: true });
      });
    }

    function closeAccountModal() {
      const wasOpen = hbRefs.accountModal.classList.contains("is-open");
      hbRefs.accountModal.classList.remove("is-open");
      if (wasOpen && accountModalPreviousFocus && typeof accountModalPreviousFocus.focus === "function") {
        accountModalPreviousFocus.focus({ preventScroll: true });
      }
      accountModalPreviousFocus = null;
    }

    function handleAccountModalKeydown(event) {
      if (!hbRefs.accountModal.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeAccountModal();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [...hbRefs.accountModal.querySelectorAll("button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])")]
        .filter((element) => !element.disabled && element.getClientRects().length);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function toggleMenuDrawer(forceOpen = null) {
      const shouldOpen = forceOpen === null ? !hbRefs.menuDrawer.classList.contains("is-open") : forceOpen;
      hbRefs.menuDrawer.classList.toggle("is-open", shouldOpen);
    }

    function updateBudgetHelper() {
      const helper = document.getElementById("budget-helper");
      if (!helper) return;
      const baseGuidance = hbData.budgetGuidance[hbState.appState.budget] || hbData.budgetGuidance.Moderate;
      helper.textContent = hbState.appState.budgetFlexible
        ? `${baseGuidance} We will treat this as a guide, not a hard cap.`
        : baseGuidance;
    }

    function updateFlightUI() {
      const helpFields = document.getElementById("flight-help-fields");
      const existingFields = document.getElementById("existing-flight-fields");
      if (!helpFields || !existingFields) return;
      helpFields.classList.toggle("hidden", hbState.appState.flightMode !== "need-help");
      existingFields.classList.toggle("hidden", hbState.appState.flightMode !== "have-flights");
    }

    function updateBuildFormHelpers() {
      const lengthSummary = hbRefs.formBindings.tripLengthSummary;
      const travelerSummary = hbRefs.formBindings.travelerSummary;
      const dateButton = hbRefs.formBindings.dateFlexibility;
      const budgetButton = hbRefs.formBindings.budgetFlexibility;

      if (lengthSummary) {
        const start = new Date(hbState.appState.startDate);
        const end = new Date(hbState.appState.endDate);
        const rawNights = Math.round((end - start) / 86400000);
        if (!hbState.appState.startDate || !hbState.appState.endDate || !Number.isFinite(rawNights)) {
          lengthSummary.textContent = "Pick dates to see trip length.";
        } else if (rawNights < 0) {
          lengthSummary.textContent = "End date should come after the start date.";
        } else {
          const days = getTripLength();
          const nights = Math.max(0, days - 1);
          const base = `${days} day${days === 1 ? "" : "s"} / ${nights} night${nights === 1 ? "" : "s"}`;
          lengthSummary.textContent = hbState.appState.datesFlexible ? `${base}, with flexible dates` : base;
        }
      }

      if (travelerSummary) {
        travelerSummary.textContent = buildTravelerText();
      }

      if (dateButton) {
        dateButton.classList.toggle("is-active", Boolean(hbState.appState.datesFlexible));
        dateButton.textContent = hbState.appState.datesFlexible ? "Dates marked flexible" : "Dates are flexible";
      }

      if (budgetButton) {
        budgetButton.classList.toggle("is-active", Boolean(hbState.appState.budgetFlexible));
        budgetButton.textContent = hbState.appState.budgetFlexible ? "Budget marked flexible" : "Budget has some wiggle room";
      }

      updateBuildProgressPanel();
    }

    function updateBuildProgressPanel() {
      const grid = document.getElementById("build-progress-grid");
      const chip = document.getElementById("build-readiness-chip");
      const statusTitle = document.getElementById("build-save-status-title");
      const statusCopy = document.getElementById("build-save-status-copy");
      if (!grid) return;

      const destination = hbState.appState.destination || "Choose a destination";
      const hasDates = Boolean(hbState.appState.startDate && hbState.appState.endDate);
      const tripFrameReady = Boolean(destination && hasDates && hbState.appState.adults >= 1);
      const flightModeLabels = {
        "need-help": "Flight help",
        "have-flights": hbState.appState.flightAirline || "Flights added",
        "not-needed": "No flights needed"
      };
      const accountLabel = hbState.appState.accountMethod === "local"
        ? "Saved on this browser"
        : "Guest mode";
      const savedDraft = hbState.savedDraft;
      const savedValue = savedDraft ? "Draft saved" : accountLabel;
      const savedCopy = savedDraft
        ? `${savedDraft.title || "Trip draft"} can be restored from Saved.`
        : "You can save the trip after the first draft is generated.";
      const readiness = tripFrameReady ? "Basics ready" : "Needs basics";

      if (chip) {
        chip.textContent = readiness;
        chip.className = `rounded-full px-3 py-1 text-xs font-semibold ${tripFrameReady ? "bg-teal-soft text-tertiary" : "bg-warm text-primary"}`;
      }

      if (statusTitle) {
        statusTitle.textContent = savedDraft ? "Draft saved on this browser" : "Start without pressure";
      }

      if (statusCopy) {
        statusCopy.textContent = savedDraft
          ? `${savedDraft.title} was saved ${savedDraft.savedAt}. Restore it from Saved or keep building a new version.`
            : "Build the first draft now. When it feels worth keeping, you can save the trip, edits, and different versions together.";
      }

      const items = [
        {
          label: "Trip basics",
          value: tripFrameReady ? destination : "Add destination and dates",
          copy: tripFrameReady
            ? `${hbRefs.formBindings.tripLengthSummary?.textContent || "Dates set"} for ${buildTravelerText().toLowerCase()}.`
            : "We need a destination, dates, and at least one traveler before preferences can shape the trip."
        },
        {
          label: "Logistics",
          value: flightModeLabels[hbState.appState.flightMode] || "Travel details",
          copy: hbState.appState.pets !== "No pets"
            ? `${hbState.appState.pets}; stay ideas should account for that.`
            : "Flights and pets are optional, and can be changed later."
        },
        {
          label: "Saved data",
          value: savedValue,
          copy: savedCopy
        }
      ];

      grid.innerHTML = items.map((item) => `
        <div class="build-progress-item">
          <p class="build-progress-label">${escapeUiHtml(item.label)}</p>
          <p class="build-progress-value">${escapeUiHtml(item.value)}</p>
          <p class="build-progress-copy">${escapeUiHtml(item.copy)}</p>
        </div>
      `).join("");

      renderBuildMissingInfo();
    }

    function getUiPlanningReadiness() {
      const start = new Date(hbState.appState.startDate);
      const end = new Date(hbState.appState.endDate);
      const hasValidDates = Boolean(hbState.appState.startDate && hbState.appState.endDate)
        && !Number.isNaN(start.getTime())
        && !Number.isNaN(end.getTime())
        && end >= start;
      const adults = Number(hbState.appState.adults || 0);
      const destination = String(hbState.appState.destination || hbRefs.formBindings.destination?.value || "").trim();
      const hasStay = Boolean(hbState.appState.hotelName || hbState.appState.hotelArea);
      const flightReady = hbState.appState.flightMode !== "have-flights"
        || Boolean(hbState.appState.arrivalFlight || hbState.appState.departureFlight || hbState.appState.flightNumber || hbState.appState.flightAirline);
      const required = [
        {
          id: "destination",
          title: "Destination",
          ready: Boolean(destination),
          level: "required",
          panel: "build-panel",
          target: "destination-input",
          fixLabel: "Add destination",
          readyCopy: destination ? `${destination} is set.` : "",
          missingCopy: "Add the city or place you want to visit."
        },
        {
          id: "dates",
          title: "Dates",
          ready: hasValidDates,
          level: "required",
          panel: "build-panel",
          target: hasValidDates || hbState.appState.startDate ? "end-date-input" : "start-date-input",
          fixLabel: "Fix dates",
          readyCopy: hasValidDates ? `${hbRefs.formBindings.tripLengthSummary?.textContent || "Dates set"}.` : "",
          missingCopy: "Add a start and end date so we know how many days to plan."
        },
        {
          id: "travelers",
          title: "Travelers",
          ready: adults >= 1,
          level: "required",
          panel: "build-panel",
          target: "adults-input",
          fixLabel: "Add travelers",
          readyCopy: adults >= 1 ? buildTravelerText() : "",
          missingCopy: "Add at least one adult traveler."
        }
      ];
      const optional = [
        {
          id: "rules",
          title: "Things to avoid",
          ready: Boolean(String(hbState.appState.nonNegotiables || "").trim()),
          level: "optional",
          panel: "details-panel",
          target: "non-negotiables-input",
          fixLabel: "Add things to avoid",
          readyCopy: hbState.appState.nonNegotiables || "",
          missingCopy: "Add dietary, accessibility, timing, or places-to-avoid details if you need the trip to work around them."
        },
        {
          id: "logistics",
          title: "Logistics",
          ready: hasStay && flightReady,
          level: "optional",
          panel: "build-panel",
          target: "build-logistics-section",
          fixLabel: "Add logistics",
          readyCopy: hasStay && flightReady ? "Stay and travel timing are enough for a realistic first and last day." : "",
          missingCopy: "A hotel area, hotel name, or known flight timing can make the first and last days more realistic."
        }
      ];
      const blockers = required.filter((item) => !item.ready);
      const suggestions = optional.filter((item) => !item.ready);
      const all = [...required, ...optional];
      return {
        generationReady: blockers.length === 0,
        blockers,
        suggestions,
        required,
        optional,
        all,
        readyCount: all.filter((item) => item.ready).length,
        totalCount: all.length
      };
    }

    function getSharedPlanningReadiness() {
      return typeof hbUtils.getPlanningReadiness === "function"
        ? hbUtils.getPlanningReadiness()
        : getUiPlanningReadiness();
    }

    function renderBuildMissingInfo() {
      const wrap = document.getElementById("build-missing-info");
      if (!wrap) return;
      const readiness = getSharedPlanningReadiness();
      const promptItems = readiness.blockers.length
        ? readiness.blockers
        : readiness.suggestions.slice(0, 3);
      const visibleItems = promptItems.length
        ? promptItems
        : readiness.all.filter((item) => item.ready).slice(0, 3);

      wrap.classList.toggle("is-ready", readiness.generationReady);
      wrap.innerHTML = `
        <div class="planning-prompt-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] ${readiness.generationReady ? "text-tertiary" : "text-primary"}">${readiness.generationReady ? "Good starting point" : "Missing basics"}</p>
            <h4 class="mt-1 font-display text-lg font-bold text-ink">${readiness.generationReady ? "You can move to preferences" : "Add these before preferences"}</h4>
            <p class="mt-2 max-w-[44rem] text-sm leading-6 text-muted">${readiness.generationReady ? "The basics are set. These optional details can make the first draft feel more like your trip." : "Add a destination, valid dates, and at least one adult before we can build a useful itinerary."}</p>
          </div>
          <span class="planning-prompt-status ${readiness.generationReady ? "is-ready" : ""}">${readiness.readyCount} of ${readiness.totalCount} ready</span>
        </div>
        <div class="planning-prompt-grid">
          ${visibleItems.map((item) => `
            <div class="planning-prompt-card ${item.level === "required" && !item.ready ? "is-blocking" : ""}">
              <p class="planning-prompt-label">
                <span class="material-symbols-outlined" aria-hidden="true">${item.ready ? "check_circle" : (item.level === "required" ? "error" : "tips_and_updates")}</span>
                <span>${item.ready ? "Ready" : (item.level === "required" ? "Required" : "Helpful")}</span>
              </p>
              <p class="planning-prompt-title">${escapeUiHtml(item.title)}</p>
              <p class="planning-prompt-copy">${escapeUiHtml(item.ready ? item.readyCopy : item.missingCopy)}</p>
              ${!item.ready && item.panel && item.target ? `
                <button class="planning-prompt-button ${item.level === "required" ? "bg-primary text-white" : "bg-surface-soft text-secondary ring-1 ring-line"}" data-action="fix-missing-info" data-target-panel="${escapeUiHtml(item.panel)}" data-focus-target="${escapeUiHtml(item.target)}" type="button">
                  ${escapeUiHtml(item.fixLabel)}
                </button>
              ` : ""}
            </div>
          `).join("")}
        </div>
      `;
    }

    function focusMissingInfo(panelId, targetId) {
      if (!panelId || !targetId) return;
      clearThinkingTimers();
      updateStateFromInputs();
      if (panelId === "city-guides-panel") {
        setActivePanel("city-guides-panel");
        return;
      }
      setActivePanel(panelId, { updateHash: false, focusTargetId: targetId });
      const nextHash = getRouteForPanel(panelId);
      window.history.replaceState(null, "", `#${nextHash}`);
    }


    function getRouteForPanel(targetId) {
      if (targetId === "editorial-guide-panel") {
        const cityRoute = `city-guides/${slugifyCity(hbState.selectedGuideCity)}`;
        return hbState.selectedGuideCategory ? `${cityRoute}/${hbState.selectedGuideCategory}` : cityRoute;
      }
      if (targetId === "editorial-country-panel") {
        return `country-guides/${slugifyCountry(hbState.selectedGuideCountry)}`;
      }
      return hbData.panelRouteMap[targetId] || "build";
    }

    const publicSiteUrl = "https://hamiltondan20-sys.github.io/fun-app/plan/";
    const cityCategoryMeta = {
      "things-to-do": "Things to Do",
      attractions: "Attractions",
      themes: "Themes",
      "food-guide": "Food Guide",
      neighborhoods: "Neighborhoods",
      "sample-itineraries": "Sample Itineraries"
    };
    const routeMeta = {
      "": {
        title: "Horizon Bound | Build Your Trip",
        description: "Build a vacation around the places, pace, food, and experiences you care about."
      },
      explore: {
        title: "Explore Vacation Ideas | Horizon Bound",
        description: "Find destination ideas, sample trips, and travel inspiration before you start planning."
      },
      "find-a-destination": {
        title: "Find a Destination | Horizon Bound",
        description: "Choose a country and compare cities that fit the kind of vacation you want."
      },
      "city-guides": {
        title: "City Guides | Horizon Bound",
        description: "Explore practical city guides with things to do, food ideas, neighborhoods, and sample trip inspiration."
      },
      "country-guides": {
        title: "Country Guides | Horizon Bound",
        description: "Compare countries and find the cities that best match the vacation you have in mind."
      },
      faq: {
        title: "Travel Planning Questions | Horizon Bound",
        description: "Find answers about building, saving, adjusting, and using a Horizon Bound vacation plan."
      },
      contact: {
        title: "Contact Horizon Bound | Horizon Bound",
        description: "Send feedback, report an issue, or share an idea for improving Horizon Bound."
      },
      build: {
        title: "Build Your Trip | Horizon Bound",
        description: "Start with your destination, dates, travelers, budget, and practical trip details."
      }
    };

    function trimMetaDescription(value) {
      const cleaned = String(value || "").replace(/\s+/g, " ").trim();
      if (cleaned.length <= 158) return cleaned;
      return `${cleaned.slice(0, 155).replace(/[\s,.!?;:]+$/, "")}...`;
    }

    function routeToPublicUrl(route = "") {
      if (!route) return publicSiteUrl;
      const encodedRoute = route.split("/").map((part) => encodeURIComponent(part)).join("/");
      return `${publicSiteUrl}?route=${encodedRoute}`;
    }

    function updateRouteMetadata(route = "") {
      const safeRoute = String(route || "").replace(/^#/, "");
      let metadata = routeMeta[safeRoute] || routeMeta.build;

      if (safeRoute.startsWith("city-guides/")) {
        const routeParts = safeRoute.replace("city-guides/", "").split("/");
        const city = findCityBySlug(routeParts[0]);
        const category = cityCategoryMeta[routeParts[1] || ""];
        if (city) {
          const guide = hbData.cityGuideData.find((item) => item.city === city);
          const cityTitle = guide?.title || city.split(",")[0];
          const citySummary = guide?.summary || `Plan a trip to ${cityTitle} with practical ideas for what to see, eat, and do.`;
          metadata = category
            ? {
                title: `${category} in ${cityTitle} | Horizon Bound`,
                description: `Explore ${category.toLowerCase()} in ${cityTitle}, with practical ideas to help shape a trip that fits your time and travel style.`
              }
            : {
                title: `${cityTitle} City Guide | Horizon Bound`,
                description: `${citySummary} Explore things to do, food ideas, neighborhoods, and sample trip inspiration.`
              };
        }
      }

      if (safeRoute.startsWith("country-guides/")) {
        const country = findCountryBySlug(safeRoute.replace("country-guides/", ""));
        const guide = country ? hbData.countryGuideData[country] : null;
        if (country) {
          metadata = {
            title: `${country} Travel Guide | Horizon Bound`,
            description: `${guide?.summary || `Explore ${country} with city ideas, practical planning guidance, and inspiration for your next trip.`} Compare cities and find the right place to start.`
          };
        }
      }

      const description = trimMetaDescription(metadata.description);
      document.title = metadata.title;
      document.querySelector("#page-meta-description")?.setAttribute("content", description);
      document.querySelector("#page-og-title")?.setAttribute("content", metadata.title);
      document.querySelector("#page-og-description")?.setAttribute("content", description);
      document.querySelector("#canonical-url")?.setAttribute("href", routeToPublicUrl(safeRoute));
    }

    function applyPlannerDestinationDeepLink() {
      const requested = new URLSearchParams(window.location.search).get("destination")?.trim();
      const destinationInput = hbRefs.formBindings.destination;
      if (!requested || !destinationInput) return;

      const verdict = window.HB_COVERAGE?.resolveDestination?.(requested);
      const canonical = verdict?.canonical || hbUtils.resolveCanonicalDestination(requested);
      if (!canonical) return;

      destinationInput.value = canonical;
      hbState.appState.destination = canonical;
    }

    function renderPanelContent(targetId) {
      const targetPanel = document.getElementById(targetId);
      if (targetId === "build-panel") {
        applyGuideBuildIntent();
        hbUtils.renderDestinationHero("build");
        renderGuidePlanningContext();
        updateBuildFormHelpers();
      }
      if (targetId === "details-panel") {
        updatePreferenceHelpers();
      }
      if (targetId === "explore-panel") {
        renderExploreMap();
      }
      if (targetId === "city-discovery-panel") {
        renderCityDiscovery();
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
        wireBlueprintEditButtons();
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
      const queryRoute = new URLSearchParams(window.location.search).get("route") || "";
      const rawRoute = rawHash || queryRoute;
      if (!rawRoute) {
        setActivePanel("build-panel", { updateHash: false });
        return;
      }

      if (rawRoute.startsWith("city-guides/")) {
        const routeParts = rawRoute.replace("city-guides/", "").split("/");
        const slug = routeParts[0];
        const category = routeParts[1] || "";
        const city = findCityBySlug(slug);
        if (city) {
          hbState.selectedGuideCity = city;
          hbState.selectedGuideCategory = category;
          setActivePanel("editorial-guide-panel", { updateHash: false });
          if (category) {
            window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
          }
          return;
        }
      }

      if (rawRoute.startsWith("country-guides/")) {
        const slug = rawRoute.replace("country-guides/", "");
        const country = findCountryBySlug(slug);
        if (country) {
          hbState.selectedGuideCountry = country;
          setActivePanel("editorial-country-panel", { updateHash: false });
          return;
        }
      }

      if (rawRoute === "find-a-destination") {
        openCityDiscovery();
        return;
      }

      const matchedPanel = Object.entries(hbData.panelRouteMap).find(([, route]) => route === rawRoute)?.[0];
      if (matchedPanel) {
        setActivePanel(matchedPanel, { updateHash: false });
        return;
      }

      setActivePanel("build-panel", { updateHash: false });
    }

    const cityDiscoveryMoods = ["Relaxing", "Adventurous", "Food-focused", "Culture", "Beach", "Romantic"];
    const cityDiscoveryLocalImages = {
      "Paris, France": "./images/destinations/paris-france.svg",
      "Rome, Italy": "./images/destinations/rome-italy.svg",
      "Tokyo, Japan": "./images/destinations/tokyo-japan.svg",
      "London, United Kingdom": "./images/destinations/london-united-kingdom.svg",
      "New York, United States": "./images/destinations/new-york-united-states.svg",
      "Las Vegas, United States": "./images/destinations/las-vegas-united-states.svg",
      "Orlando, United States": "./images/destinations/orlando-united-states.svg",
      "Seoul, South Korea": "./images/destinations/seoul-south-korea.svg",
      "Tanzania": "./images/destinations/tanzania.svg"
    };

    function getCityDiscoveryOptions(country) {
      const candidates = hbData.countrySuggestions?.[country] || [];
      const mood = String(hbState.cityDiscoveryMood || hbState.appState.styles?.[0] || "").toLowerCase();
      const keywords = {
        relaxing: ["relax", "slow", "scenic", "beach", "coast", "calm", "easygoing"],
        adventurous: ["adventure", "outdoor", "island", "coast", "mountain", "wild", "active"],
        "food-focused": ["food", "dinner", "restaurant", "street", "market", "meal", "wine"],
        culture: ["history", "museum", "culture", "heritage", "temple", "landmark", "art"],
        beach: ["beach", "coast", "water", "island", "resort", "ocean", "scenic"],
        romantic: ["romantic", "couples", "sunset", "scenic", "dinner", "slow"]
      }[mood] || [];

      return candidates.map((city, index) => {
        const guide = hbData.cityGuideData.find((item) => item.city === city);
        const haystack = `${guide?.summary || ""} ${(guide?.highlights || []).join(" ")}`.toLowerCase();
        const moodScore = keywords.reduce((score, keyword) => score + (haystack.includes(keyword) ? 3 : 0), 0);
        const hero = hbUtils.getGuideHero(city);
        return {
          city,
          guide,
          hero,
          rankSeed: index,
          score: moodScore + Math.max(0, 10 - index)
        };
      }).sort((a, b) => b.score - a.score || a.rankSeed - b.rankSeed).slice(0, 3);
    }

    function renderCityDiscovery() {
      const countrySelect = document.getElementById("city-discovery-country");
      const countryShortcuts = document.getElementById("city-discovery-shortcuts");
      const moodRow = document.getElementById("city-discovery-moods");
      const results = document.getElementById("city-discovery-results");
      if (!countrySelect || !countryShortcuts || !moodRow || !results) return;

      const countries = Object.keys(hbData.countrySuggestions || {}).sort((a, b) => a.localeCompare(b));
      countrySelect.innerHTML = [
        `<option value="">Choose a country</option>`,
        ...countries.map((country) => `<option value="${escapeUiHtml(country)}">${escapeUiHtml(country)}</option>`)
      ].join("");
      countrySelect.value = hbState.cityDiscoveryCountry || "";

      const shortcutCountries = ["France", "Italy", "Japan", "Portugal", "Mexico", "United States"].filter((country) => countries.includes(country));
      countryShortcuts.innerHTML = shortcutCountries.map((country) => `
        <button class="city-discovery-shortcut ${country === hbState.cityDiscoveryCountry ? "is-active" : ""}" data-action="select-discovery-country" data-country="${escapeUiHtml(country)}" type="button">${escapeUiHtml(country)}</button>
      `).join("");

      moodRow.innerHTML = cityDiscoveryMoods.map((mood) => `
        <button class="city-discovery-mood ${mood === hbState.cityDiscoveryMood ? "is-active" : ""}" data-action="set-discovery-mood" data-mood="${escapeUiHtml(mood)}" type="button">${escapeUiHtml(mood)}</button>
      `).join("");

      if (!hbState.cityDiscoveryCountry) {
        results.innerHTML = `
          <div class="city-discovery-empty">
            <span class="material-symbols-outlined" aria-hidden="true">travel_explore</span>
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Start with a country</p>
              <h4 class="mt-1 font-display text-xl font-bold text-ink">We will show you three cities to consider.</h4>
              <p class="mt-2 text-sm leading-6 text-muted">Choose the place first. Then use your mood to steer the recommendations.</p>
            </div>
          </div>
        `;
        return;
      }

      const options = getCityDiscoveryOptions(hbState.cityDiscoveryCountry);
      const moodCopy = hbState.cityDiscoveryMood
        ? `Best matches for a ${hbState.cityDiscoveryMood.toLowerCase()} trip.`
        : "Best matches based on the trip style you have already chosen.";
      results.innerHTML = `
        <div class="city-discovery-results-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">${escapeUiHtml(hbState.cityDiscoveryCountry)}</p>
            <h4 class="mt-1 font-display text-2xl font-bold text-ink">Three cities worth considering</h4>
            <p class="mt-2 text-sm leading-6 text-muted">${escapeUiHtml(moodCopy)} Pick one to carry into your trip plan.</p>
          </div>
          <span class="rounded-full bg-teal-soft px-3 py-2 text-xs font-semibold text-tertiary">Best match</span>
        </div>
        <div class="city-discovery-card-grid mt-4">
          ${options.map((option, index) => {
            const cityName = option.city.split(",")[0];
            const fallbackImage = hbUtils.buildDestinationFallbackArt(cityName, "#2b5f8a");
            const image = cityDiscoveryLocalImages[option.city] || option.hero.image;
            const summary = option.guide?.summary || `A strong ${hbState.cityDiscoveryCountry} starting point with room to shape the trip around your interests.`;
            const highlights = option.guide?.highlights || ["Local highlights", "Food and neighborhoods", "Room to explore"];
            const fitLabel = index === 0 ? "Best match for your trip" : "Worth considering";
            return `
              <article class="city-discovery-card ${index === 0 ? "is-best-match" : ""}">
                <div class="city-discovery-card-image">
                  <img src="${escapeUiHtml(image)}" data-fallback-src="${escapeUiHtml(fallbackImage)}" alt="${escapeUiHtml(cityName)} destination" />
                  <div class="city-discovery-card-image-scrim"></div>
                  <div class="city-discovery-card-image-copy">
                    <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">${escapeUiHtml(fitLabel)}</p>
                    <h5 class="mt-1 font-display text-2xl font-extrabold text-white">${escapeUiHtml(cityName)}</h5>
                  </div>
                </div>
                <div class="city-discovery-card-body">
                  <p class="text-sm leading-6 text-ink">${escapeUiHtml(summary)}</p>
                  <div class="city-discovery-highlight-row">
                    ${highlights.slice(0, 3).map((highlight) => `<span>${escapeUiHtml(highlight)}</span>`).join("")}
                  </div>
                  <button class="mt-4 inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-white" data-action="choose-discovery-city" data-city="${escapeUiHtml(option.city)}" type="button">
                    Choose ${escapeUiHtml(cityName)}
                    <span class="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                  </button>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      `;
    }

    function openCityDiscovery() {
      renderCityDiscovery();
      setActivePanel("city-discovery-panel");
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

    const paceHelperCopy = {
      Easygoing: "Easygoing keeps mornings lighter, protects breaks, and avoids stacking too much into one day.",
      Balanced: "Balanced keeps the trip full without making every day feel packed.",
      Packed: "Packed fits in more sights and movement, with less downtime between stops."
    };

    function summarizePreferenceText(value, emptyText) {
      const cleaned = String(value || "").trim();
      if (!cleaned) return emptyText;
      return cleaned.length > 86 ? `${cleaned.slice(0, 83).trim()}...` : cleaned;
    }

    function cleanPreferencePart(value) {
      return String(value || "")
        .replace(/\s+/g, " ")
        .replace(/^[,\s]+|[.;,\s]+$/g, "")
        .replace(/^and\s+/i, "")
        .trim();
    }

    function getPreferenceCompareKey(value) {
      return cleanPreferencePart(value).toLowerCase().replace(/^(a|an|the)\s+/i, "");
    }

    function renderGuidePreferenceSuggestions() {
      const wrap = document.getElementById("guide-preference-suggestions");
      if (!wrap) return;
      const context = hbState.guidePlanContext || {};
      const signals = context.signals || {};
      const styles = Array.isArray(signals.styles) ? signals.styles.filter(Boolean) : [];
      const hasSignals = Boolean(context.sourceType && (styles.length || signals.pace || signals.mustHaves || signals.planningNote));

      if (!hasSignals) {
        wrap.classList.add("hidden");
        wrap.innerHTML = "";
        return;
      }

      const sourceLabel = context.sourceType === "country"
        ? `${context.sourceName} guide`
        : `${context.sourceName} city guide`;
      const feedback = hbState.guidePreferenceFeedback || "";
      wrap.classList.remove("hidden");
      wrap.innerHTML = `
        <div class="guide-preference-suggestions-head">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Guide suggestions</p>
            <h4 class="mt-1 font-display text-lg font-bold text-ink">Use ${escapeUiHtml(sourceLabel)} as a shortcut</h4>
            <p class="mt-2 text-sm leading-6 text-muted">These are optional ideas from the destination guide. Pick what fits, then change anything that feels too broad.</p>
          </div>
          ${feedback ? `<span class="guide-preference-feedback">${escapeUiHtml(feedback)}</span>` : ""}
        </div>
        <div class="guide-preference-suggestions-grid">
          <div class="guide-preference-card">
            <p class="guide-preference-label">Trip direction</p>
            <p class="guide-preference-value">${escapeUiHtml(styles.join(" + ") || "Use the guide's strongest trip style")}</p>
            <p class="guide-preference-copy">${escapeUiHtml(signals.pace ? `${signals.pace} pace works well here.` : "This guide pairs well with the way you want to travel.")}</p>
            <button class="guide-preference-action" data-action="apply-guide-signals" type="button">Use this style and pace</button>
          </div>
          <div class="guide-preference-card">
            <p class="guide-preference-label">Must-have moments</p>
            <p class="guide-preference-value">${escapeUiHtml(signals.mustHaves || context.suggestedBase || "Add a guide must-have")}</p>
            <p class="guide-preference-copy">Add these ideas to your must-haves so they stay part of the trip.</p>
            <button class="guide-preference-action" data-action="apply-guide-must-haves" type="button">Add to must-haves</button>
          </div>
          <div class="guide-preference-card">
            <p class="guide-preference-label">Why this guide helps</p>
            <p class="guide-preference-value">${escapeUiHtml(signals.planningNote || context.preview || "Keep the route practical")}</p>
            <p class="guide-preference-copy">The guide can inform the plan without becoming a rule you have to follow.</p>
          </div>
        </div>
      `;
    }

    function syncPreferenceChoiceButtons() {
      const styles = hbState.appState.styles || [];
      document.querySelectorAll("[data-group='styles']").forEach((button) => {
        button.classList.toggle("is-active", styles.includes(button.dataset.value));
      });
      document.querySelectorAll(".choice-button").forEach((button) => {
        const group = button.dataset.group;
        if (!group || group === "styles") return;
        button.classList.toggle("is-active", hbState.appState[group] === button.dataset.value);
      });
      updatePreferenceHelpers();
    }

    function applyGuidePreferenceSignals() {
      const signals = hbState.guidePlanContext?.signals || {};
      const signalStyles = Array.isArray(signals.styles) ? signals.styles.filter(Boolean) : [];
      if (signalStyles.length) {
        const mergedStyles = [...signalStyles, ...(hbState.appState.styles || [])].filter((item, index, list) => (
          item && list.indexOf(item) === index
        ));
        hbState.appState.styles = mergedStyles.slice(0, 3);
      }
      if (signals.pace) hbState.appState.pace = signals.pace;
      if (signalStyles.includes("Foodie")) hbState.appState.foodImportance = "Food is a focus";
      hbState.guidePreferenceFeedback = "Applied";
      syncPreferenceChoiceButtons();
      window.setTimeout(() => {
        hbState.guidePreferenceFeedback = "";
        renderGuidePreferenceSuggestions();
      }, 1600);
    }

    function applyGuideMustHaves() {
      const signals = hbState.guidePlanContext?.signals || {};
      const items = Array.isArray(signals.mustHaveItems) && signals.mustHaveItems.length
        ? signals.mustHaveItems
        : [signals.mustHaves || hbState.guidePlanContext?.suggestedBase || ""];
      appendPreferenceText("must-haves-input", items);
      hbState.guidePreferenceFeedback = "Added";
      renderGuidePreferenceSuggestions();
      window.setTimeout(() => {
        hbState.guidePreferenceFeedback = "";
        renderGuidePreferenceSuggestions();
      }, 1600);
    }

    function updatePreferenceHelpers() {
      const selectedStyles = hbState.appState.styles || [];
      const styleSummary = document.getElementById("preference-style-summary");
      const paceSummary = document.getElementById("preference-pace-summary");
      const mustSummary = document.getElementById("preference-must-summary");
      const ruleSummary = document.getElementById("preference-rule-summary");
      const styleCountHelper = document.getElementById("style-count-helper");
      const paceHelper = document.getElementById("pace-helper");
      const modeMini = document.getElementById("preference-mode-mini");

      if (styleSummary) {
        styleSummary.textContent = selectedStyles.length ? selectedStyles.join(" + ") : "Pick up to 3 trip styles.";
      }
      if (paceSummary) {
        paceSummary.textContent = `${hbState.appState.pace || "Balanced"} pace`;
      }
      if (mustSummary) {
        mustSummary.textContent = summarizePreferenceText(hbState.appState.mustHaves, "No must-haves yet.");
      }
      if (ruleSummary) {
        ruleSummary.textContent = summarizePreferenceText(hbState.appState.nonNegotiables, "Nothing to avoid yet.");
      }
      if (styleCountHelper) {
        const remaining = Math.max(0, 3 - selectedStyles.length);
        styleCountHelper.textContent = remaining
          ? `${selectedStyles.length} of 3 selected. Add ${remaining} more if it helps.`
          : "3 of 3 selected. Remove one to choose a different style.";
      }
      if (paceHelper) {
        paceHelper.textContent = paceHelperCopy[hbState.appState.pace] || paceHelperCopy.Balanced;
      }
      if (modeMini) {
        modeMini.textContent = hbState.appState.mode === "detailed" ? "Detailed mode" : "Simple mode";
      }
      renderGuidePreferenceSuggestions();
    }

    function appendPreferenceText(targetId, text) {
      const target = document.getElementById(targetId || "");
      const incomingParts = (Array.isArray(text) ? text : String(text || "").split(","))
        .map(cleanPreferencePart)
        .filter(Boolean);
      if (!target || !incomingParts.length) return;
      const existingParts = target.value
        .split(",")
        .map(cleanPreferencePart)
        .filter(Boolean);
      const existingKeys = new Set(existingParts.map(getPreferenceCompareKey));
      incomingParts.forEach((part) => {
        const key = getPreferenceCompareKey(part);
        if (!key || existingKeys.has(key)) return;
        existingParts.push(part);
        existingKeys.add(key);
      });
      target.value = existingParts.join(", ");
      target.focus();
      updateStateFromInputs();
      updatePreferenceHelpers();
    }

    function markGuideItemsAdded(city, text) {
      const incomingItems = (Array.isArray(text) ? text : String(text || "").split(","))
        .map(cleanPreferencePart)
        .filter(Boolean);
      if (!city || !incomingItems.length) return;

      const existingItems = Array.isArray(hbState.guideAddedItems) ? hbState.guideAddedItems : [];
      const knownKeys = new Set(existingItems.map((entry) => `${entry.city || ""}::${String(entry.item || "").toLowerCase()}`));
      const nextItems = [...existingItems];
      incomingItems.forEach((item) => {
        const key = `${city}::${item.toLowerCase()}`;
        if (knownKeys.has(key)) return;
        nextItems.push({ city, item });
        knownKeys.add(key);
      });
      hbState.guideAddedItems = nextItems.slice(-24);
      saveGuideBrowseMemory();
    }

    function updateModeUI() {
      const isSimple = hbState.appState.mode === "simple";
      const modeExplainerTitle = document.getElementById("mode-explainer-title");
      const modeExplainerCopy = document.getElementById("mode-explainer-copy");
      hbRefs.detailedFields.classList.toggle("hidden", isSimple);
      hbRefs.modeBadge.textContent = isSimple ? "Simple mode" : "Detailed mode";
      if (modeExplainerTitle) {
        modeExplainerTitle.textContent = isSimple ? "Simple mode covers the essentials." : "Detailed mode gives you more control.";
      }
      if (modeExplainerCopy) {
        modeExplainerCopy.textContent = isSimple
          ? "Answer the core choices and let us fill in the rest."
          : "Use these when restaurants, free time, top sights, or hidden gems should noticeably change the plan.";
      }
      hbRefs.simpleModeBtn.classList.toggle("bg-white", isSimple);
      hbRefs.simpleModeBtn.classList.toggle("text-secondary", isSimple);
      hbRefs.simpleModeBtn.classList.toggle("shadow-sm", isSimple);
      hbRefs.simpleModeBtn.classList.toggle("text-muted", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("bg-white", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("text-secondary", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("shadow-sm", !isSimple);
      hbRefs.detailedModeBtn.classList.toggle("text-muted", isSimple);
      updatePreferenceHelpers();
    }

    function setActivePanel(targetId, options = {}) {
      const { updateHash = true, focusTargetId = "" } = options;
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
        if (active) tab.setAttribute("aria-current", "page");
        else tab.removeAttribute("aria-current");
      });

      hbRefs.tabs.forEach((tab) => {
        if (tab.dataset.target === targetId) tab.setAttribute("aria-current", "step");
        else tab.removeAttribute("aria-current");
      });

      renderPanelContent(targetId);

      if (!['editorial-guide-panel', 'editorial-country-panel'].includes(targetId)) {
        document.title = 'Horizon Bound | Build Your Trip';
      }

      updateRouteMetadata(getRouteForPanel(targetId));

      updatePrimaryCta();
      updateFlowStatus();
      updateEditorialStickyBars();
      syncEditorialStickyObserver();
      saveGuideBrowseMemory();
      if (focusTargetId) {
        focusEditableTripDetail(focusTargetId);
      } else {
        restoreGuidePanelScroll(targetId);
      }
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
      }, 900);
    }

    function generateTripFlow() {
      updateStateFromInputs();
      const readiness = getSharedPlanningReadiness();
      if (readiness.blockers.length) {
        setActivePanel("build-panel", { focusTargetId: readiness.blockers[0].target });
        return;
      }
      if (getCountryOnlySelection()) {
        setActivePanel("build-panel");
        return;
      }
      renderBlueprint();
      setActivePanel("blueprint-panel");
    }

    function continueToThinking() {
      updateStateFromInputs();
      const readiness = getSharedPlanningReadiness();
      if (readiness.blockers.length) {
        setActivePanel("build-panel", { focusTargetId: readiness.blockers[0].target });
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
      renderThinking();
      renderTrip();
      persistTripDraft({ feedback: "Draft saved automatically" });
      setActivePanel("thinking-panel");
      startThinkingSequence();
    }

    function focusEditableTripDetail(targetId) {
      const applyFocus = () => {
        const target = document.getElementById(targetId);
        if (!target) return;
        const highlightTarget = target.closest("[data-edit-section], label, .rounded-2xl, .rounded-[24px]") || target;
        const rect = target.getBoundingClientRect();
        const nextY = Math.max(0, window.scrollY + rect.top - Math.min(180, window.innerHeight * 0.28));
        window.scrollTo(0, nextY);
        document.documentElement.scrollTop = nextY;
        document.body.scrollTop = nextY;
        if (typeof target.focus === "function") {
          try {
            target.focus({ preventScroll: true });
          } catch (error) {
            target.focus();
          }
        }
        highlightTarget.classList.remove("edit-focus-pulse");
        window.requestAnimationFrame(() => {
          highlightTarget.classList.add("edit-focus-pulse");
          window.setTimeout(() => highlightTarget.classList.remove("edit-focus-pulse"), 1300);
        });
      };

      window.setTimeout(applyFocus, 120);
      window.setTimeout(applyFocus, 300);
    }

    function editBlueprintItem(panelId, targetId) {
      if (!panelId || !targetId) return;
      clearThinkingTimers();
      updateStateFromInputs();
      setActivePanel(panelId, { updateHash: false, focusTargetId: targetId });
      const nextHash = getRouteForPanel(panelId);
      window.history.replaceState(null, "", `#${nextHash}`);
    }

    function wireBlueprintEditButtons(scope = document) {
      scope.querySelectorAll("[data-action='edit-blueprint-item']").forEach((button) => {
        if (button.dataset.hbBound === "1") return;
        button.dataset.hbBound = "1";
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          editBlueprintItem(button.dataset.targetPanel, button.dataset.focusTarget);
        });
      });
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

    document.addEventListener("click", (event) => {
      const missingInfoTrigger = event.target.closest("[data-action='fix-missing-info']");
      if (missingInfoTrigger) {
        event.preventDefault();
        event.stopPropagation();
        focusMissingInfo(missingInfoTrigger.dataset.targetPanel, missingInfoTrigger.dataset.focusTarget);
        return;
      }

      const trigger = event.target.closest("[data-action='edit-blueprint-item']");
      if (!trigger) return;
      event.preventDefault();
      event.stopPropagation();
      editBlueprintItem(trigger.dataset.targetPanel, trigger.dataset.focusTarget);
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
        } else {
          const helper = document.getElementById("style-count-helper");
          if (helper) helper.textContent = "Choose up to 3. Remove one to add another style.";
        }
        updatePreferenceHelpers();
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
        updatePreferenceHelpers();
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
        const destinationBeforeUpdate = hbRefs.formBindings.destination?.value.trim() || "";
        updateStateFromInputs();
        if (!destinationBeforeUpdate) {
          hbState.appState.destination = "";
          if (hbRefs.formBindings.destination) {
            hbRefs.formBindings.destination.value = "";
          }
          renderBuildMissingInfo();
          focusEditableTripDetail("destination-input");
          return;
        }
        const readiness = getSharedPlanningReadiness();
        if (readiness.blockers.length) {
          renderBuildMissingInfo();
          focusMissingInfo(readiness.blockers[0].panel, readiness.blockers[0].target);
          return;
        }
        setActivePanel("details-panel");
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
        if (hbState.savedDraft) {
          restoreSavedDraft();
          setActivePanel("trip-panel");
          return;
        }
        setActivePanel("build-panel");
        return;
      }

      if (hbState.activePanelId === "trip-panel") {
        persistTripDraft({ feedback: "Draft saved" });
        renderTrip();
        renderSavedPanel();
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
      if (action === "save-current-draft") {
        persistTripDraft({ feedback: "Draft saved" });
        renderTrip();
        renderSavedPanel();
      }
      if (action === "restore-saved-draft") {
        restoreSavedDraft();
        setActivePanel("trip-panel");
      }
      if (action === "fix-missing-info") {
        focusMissingInfo(trigger.dataset.targetPanel, trigger.dataset.focusTarget);
      }
      if (action === "jump-trip-anchor") {
        const section = trigger.dataset.section || "";
        const targetId = trigger.dataset.targetId || "";
        if (section) {
          hbState.tripSectionVisibility = hbState.tripSectionVisibility || {};
          hbState.tripSectionVisibility[section] = true;
          const panel = document.querySelector(`[data-trip-section="${section}"]`);
          const toggle = panel?.querySelector("[data-action='toggle-trip-section']");
          panel?.classList.add("is-expanded");
          panel?.classList.remove("is-collapsed");
          panel?.querySelectorAll("[data-trip-section-body]").forEach((body) => {
            body.hidden = false;
          });
          if (toggle) {
            toggle.setAttribute("aria-expanded", "true");
            toggle.innerHTML = `
              <span>Hide</span>
              <span class="material-symbols-outlined" aria-hidden="true">remove</span>
            `;
          }
        }
        window.setTimeout(() => {
          const target = targetId ? document.getElementById(targetId) : null;
          if (!target) return;
          const top = target.getBoundingClientRect().top + window.scrollY - 12;
          window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
        }, 80);
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
      if (action === "adjust-day-quality") adjustDayQuality(dayId, trigger.dataset.feedback);
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

    hbRefs.tripPanel.addEventListener("change", (event) => {
      const statusControl = event.target.closest("[data-action='update-booking-status']");
      if (statusControl) {
        updateBookingItemStatus(statusControl.dataset.bookingId || "", statusControl.value);
        return;
      }

      const noteControl = event.target.closest("[data-action='update-booking-note']");
      if (!noteControl) return;
      window.clearTimeout(bookingNoteSaveTimer);
      updateBookingItemNote(noteControl.dataset.bookingId || "", noteControl.value);
    });

    hbRefs.tripPanel.addEventListener("input", (event) => {
      const noteControl = event.target.closest("[data-action='update-booking-note']");
      if (!noteControl) return;
      queueBookingNoteSave(noteControl);
    });

    hbRefs.tripPanel.addEventListener("focusout", (event) => {
      const noteControl = event.target.closest("[data-action='update-booking-note']");
      if (!noteControl) return;
      window.clearTimeout(bookingNoteSaveTimer);
      updateBookingItemNote(noteControl.dataset.bookingId || "", noteControl.value);
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

      if (action === "open-city-discovery") {
        openCityDiscovery();
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

      if (trigger.dataset.action === "append-preference-text") {
        appendPreferenceText(trigger.dataset.target, trigger.dataset.text);
      }

      if (trigger.dataset.action === "apply-guide-signals") {
        event.preventDefault();
        applyGuidePreferenceSignals();
      }

      if (trigger.dataset.action === "apply-guide-must-haves") {
        event.preventDefault();
        applyGuideMustHaves();
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

    document.addEventListener("error", (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement)) return;
      const fallback = image.dataset.fallbackSrc;
      if (!fallback || image.dataset.fallbackApplied === "1") return;
      image.dataset.fallbackApplied = "1";
      image.src = fallback;
    }, true);

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (trigger?.dataset.action === "open-saved") {
        event.preventDefault();
        renderSavedPanel();
        setActivePanel("saved-panel");
        return;
      }
      if (trigger?.dataset.action === "open-city-discovery") {
        event.preventDefault();
        openCityDiscovery();
        return;
      }
      handleGuideActionTrigger(trigger, event);
    }, true);

    document.getElementById("build-panel").addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;

      if (trigger.dataset.action === "toggle-date-flexibility") {
        hbState.appState.datesFlexible = !hbState.appState.datesFlexible;
        updateStateFromInputs();
        updateBuildFormHelpers();
      }

      if (trigger.dataset.action === "toggle-budget-flexibility") {
        hbState.appState.budgetFlexible = !hbState.appState.budgetFlexible;
        updateStateFromInputs();
        updateBudgetHelper();
        updateBuildFormHelpers();
      }

      if (trigger.dataset.action === "clear-guide-context") {
        clearGuidePlanningContext();
      }
    });

    document.querySelectorAll(".account-option").forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.provider !== "local") return;
        updateStateFromInputs();
        hbState.appState.accountMethod = "local";
        persistTripProfile({ feedback: "Saved on this browser" });
        persistTripDraft({ feedback: "Trip inputs saved on this browser" });
        closeAccountModal();
        setActivePanel("saved-panel");
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

    hbRefs.accountModal.addEventListener("keydown", handleAccountModalKeydown);

    hbRefs.manualAdjustBtn.addEventListener("click", () => {
      hbState.appState.mode = "detailed";
      updateModeUI();
      setActivePanel("details-panel");
    });

    document.getElementById("build-save-account-btn")?.addEventListener("click", () => {
      updateStateFromInputs();
      openAccountModal();
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
      if (action === "city-discovery") {
        openCityDiscovery();
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

    document.getElementById("city-discovery-panel")?.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-action]");
      if (!trigger) return;
      const { action, country, mood, city } = trigger.dataset;

      if (action === "select-discovery-country" && country) {
        hbState.cityDiscoveryCountry = country;
        renderCityDiscovery();
        return;
      }

      if (action === "set-discovery-mood" && mood) {
        hbState.cityDiscoveryMood = mood;
        renderCityDiscovery();
        return;
      }

      if (action === "choose-discovery-city" && city) {
        handoffGuideToBuild({ city });
      }

      if (action === "open-build") {
        setActivePanel("build-panel");
      }
    });

    document.getElementById("city-discovery-country")?.addEventListener("change", (event) => {
      hbState.cityDiscoveryCountry = event.target.value;
      renderCityDiscovery();
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
        hbState.selectedGuideCategory = "";
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
        hbState.selectedGuideCategory = "";
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

      const { action, city, country, sectionId, item, category } = trigger.dataset;

      if (action === "open-city-guides-home") {
        hbState.selectedGuideCategory = "";
        renderCityGuidesLanding();
        setActivePanel("city-guides-panel");
        return;
      }

      if (action === "open-city-guide" && city) {
        hbState.selectedGuideCity = city;
        hbState.selectedGuideCategory = "";
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

      if (action === "open-city-guide-category" && city && category) {
        event.preventDefault();
        hbState.selectedGuideCity = city;
        hbState.selectedGuideCategory = category;
        hbState.guideActionState.city = `Opened ${city.split(",")[0]}`;
        const route = getCityGuideCategoryRoute(city, category);
        if (window.location.hash !== `#${route}`) {
          window.location.hash = route;
        } else {
          renderCityGuideDetail(city);
          setActivePanel("editorial-guide-panel", { updateHash: false });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      if (action === "add-guide-item" && city && item) {
        applyGuidePlanningContextFromCity(city);
        appendPreferenceText("must-haves-input", item);
        markGuideItemsAdded(city, item);
        trigger.textContent = "Added to my trip";
        trigger.disabled = true;
        trigger.setAttribute("aria-pressed", "true");
        const confirmation = document.getElementById("city-guide-add-confirmation");
        if (confirmation) {
          confirmation.classList.remove("hidden");
          confirmation.innerHTML = `
            <div class="flex flex-col gap-3 rounded-[20px] border border-teal-line bg-teal-soft px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined mt-0.5 text-tertiary" aria-hidden="true">check_circle</span>
                <div>
                  <p class="font-semibold text-ink">Added to your trip</p>
                  <p class="mt-1 text-sm leading-6 text-muted">${escapeUiHtml(item)} is now in your must-haves. We will use it when we shape the days.</p>
                </div>
              </div>
              <a class="guide-action-button shrink-0 rounded-full bg-secondary px-4 py-2 text-center text-sm font-semibold text-white" data-action="use-city-guide" data-city="${escapeUiHtml(city)}" href="#build">Review in Build</a>
            </div>
          `;
        }
        renderGuidePlanningContext();
        return;
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
        hbState.selectedGuideCategory = "";
        hbState.guideActionState.city = `Opened ${city.split(",")[0]}`;
        renderCityGuideDetail(city);
        setActivePanel("editorial-guide-panel");
        return;
      }

      if (action === "open-city-guide-compare" && city && trigger.dataset.compareCity) {
        hbState.selectedGuideCity = city;
        hbState.selectedGuideCategory = "";
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
    hbRefs.formBindings.nonNegotiables?.addEventListener("input", updateStateFromInputs);

    window.addEventListener("hashchange", applyHashRoute);
    window.addEventListener("scroll", scheduleEditorialStickyBarsUpdate, { passive: true });
    window.addEventListener("resize", scheduleEditorialStickyBarsUpdate, { passive: true });
    window.addEventListener("resize", syncBottomContentPadding, { passive: true });

    restoreGuideBrowseMemory();
    applyPlannerDestinationDeepLink();
    hydrateTripProfile();
    hydrateSavedDraftStatus();
    updateModeUI();
    updateBudgetHelper();
    updateFlightUI();
    updateBuildFormHelpers();
    updateDestinationHelper();
    updatePrimaryCta();
    syncBottomContentPadding();
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
      updateBuildFormHelpers,
      updatePreferenceHelpers,
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
