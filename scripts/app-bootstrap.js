window.HB_APP = window.HB_APP || {};

(function initializeHBAppNamespace(ns) {
  const state = {
    appState: {
      mode: "simple",
      destination: "Paris, France",
      startDate: "2026-09-14",
      endDate: "2026-09-20",
      datesFlexible: false,
      adults: 2,
      children: 0,
      pets: "No pets",
      accountMethod: "",
      flightMode: "need-help",
      flightPreference: "Balanced value",
      flightAirline: "",
      flightNumber: "",
      arrivalFlight: "",
      departureFlight: "",
      hotelName: "",
      hotelArea: "",
      hotelCheckIn: "",
      hotelCheckOut: "",
      budget: "Moderate",
      budgetFlexible: false,
      styles: ["Relaxing", "Foodie"],
      pace: "Balanced",
      mustHaves: "One memorable dinner, the Eiffel Tower, and a slower final day.",
      nonNegotiables: "",
      depth: "Top sights",
      foodImportance: "Good local spots",
      memory: "First-time highlights",
      spontaneity: "Some free time",
      journalEntry: "",
      journalMood: "Memorable"
    },
    activePanelId: "build-panel",
    thinkingInterval: null,
    thinkingTimeout: null,
    currentTrip: null,
    liveDraftTrip: null,
    likedTrip: null,
    savedDraft: null,
    draftSaveFeedback: "",
    tripProfile: {
      displayName: "",
      email: "",
      homeAirport: ""
    },
    profileSaveFeedback: "",
    bookingItems: {},
    bookingSaveFeedback: "",
    localAccountFeedback: "",
    alternateTrips: [],
    alternateVersionFeedback: {
      id: "",
      name: "",
      savedAt: ""
    },
    alternateVersionFeedbackTimeout: null,
    alternateVersionFeedbackDeadline: 0,
    alternateVersionFeedbackRemaining: 0,
    unsavedArrangement: {
      dirty: false,
      message: ""
    },
    activeTripSource: {
      type: "live",
      versionId: "",
      name: ""
    },
    compareVersionId: "",
    currentExploreMapQuery: "",
    currentTripMapQuery: "",
    currentTripMapStepIndex: null,
    draggedTripDayId: null,
    draggedTimelineStep: null,
    selectedGuideCity: "Paris, France",
    selectedGuideCountry: "France",
    cityGuideSearchQuery: "",
    cityGuideRegionFilter: "all",
    countryGuideSearchQuery: "",
    countryGuideRegionFilter: "all",
    guideCompare: {
      type: "",
      current: "",
      target: ""
    },
    guideHubCompare: {
      type: "",
      current: "",
      target: ""
    },
    guidePlanContext: {
      sourceType: "",
      sourceName: "",
      sourceLocation: "",
      summary: "",
      preview: "",
      suggestedBase: ""
    },
    guideBuildIntent: {
      sourceType: "",
      sourceLocation: "",
      destination: ""
    },
    guideActionState: {
      city: "",
      country: ""
    },
    panelScrollMemory: {},
    tripFactsExpanded: false,
    tripSectionVisibility: {
      guide: true,
      versions: false,
      logistics: false,
      flights: false,
      stay: false,
      booking: false,
      journal: false
    },
    cityGuideSuggestionIndex: -1,
    countryGuideSuggestionIndex: -1,
    destinationSuggestionIndex: -1
  };

  const data = {
    destinationFacts: window.HB_DATA.destinationFacts,
    countryGuideData: window.HB_DATA.countryGuideData,
    countryEditorialPageData: window.HB_DATA.countryEditorialPageData,
    cityGuideData: window.HB_DATA.cityGuideData,
    cityGuideDetailData: window.HB_DATA.cityGuideDetailData,
    cityPlanningToolkitData: window.HB_DATA.cityPlanningToolkitData,
    cityEditorialPageData: window.HB_DATA.cityEditorialPageData,
    destinationHeroData: window.HB_DATA.destinationHeroData,
    destinationMapData: window.HB_DATA.destinationMapData,
    stageOrder: ["explore-panel", "city-guides-panel", "country-guides-panel", "editorial-guide-panel", "editorial-country-panel", "build-panel", "details-panel", "blueprint-panel", "thinking-panel", "trip-panel", "saved-panel", "faq-panel", "contact-panel"],
    panelRouteMap: {
      "explore-panel": "explore",
      "city-guides-panel": "city-guides",
      "country-guides-panel": "country-guides",
      "build-panel": "build",
      "details-panel": "details",
      "blueprint-panel": "blueprint",
      "thinking-panel": "thinking",
      "trip-panel": "your-trip",
      "saved-panel": "saved",
      "faq-panel": "faq",
      "contact-panel": "contact"
    },
    countryRegionMap: {
      France: "Europe",
      Spain: "Europe",
      Italy: "Europe",
      Japan: "Asia",
      Mexico: "North America",
      Thailand: "Asia",
      "United States": "North America",
      Turkey: "Europe",
      Germany: "Europe",
      "United Kingdom": "Europe",
      Portugal: "Europe",
      Greece: "Europe",
      China: "Asia",
      "South Korea": "Asia",
      "United Arab Emirates": "Middle East",
      Netherlands: "Europe",
      Canada: "North America",
      Australia: "Oceania",
      Morocco: "Africa",
      Brazil: "South America"
    },
    headlineOptions: [
      "Developing your perfect vacation.",
      "Making your vacation come true.",
      "Shaping your days around what matters most.",
      "Keeping the good parts strong and the logistics lighter."
    ],
    budgetGuidance: {
      Budget: "Keeps the plan value-focused with simpler stays, practical meals, and free or lower-cost highlights.",
      Moderate: "Balances comfort and value with solid hotel options, a few nicer meals, and room for one standout moment.",
      Premium: "Prioritizes comfort, location, and upgraded experiences while still keeping the days practical."
    },
    countrySuggestions: window.HB_DATA.countrySuggestions,
    destinationAliases: window.HB_DATA.destinationAliases
  };

  data.destinationOptions = [
    ...Object.keys(data.countrySuggestions),
    ...Object.values(data.countrySuggestions).flat()
  ];

  const refs = {
    tabs: document.querySelectorAll(".stage-tab"),
    navTabs: document.querySelectorAll(".nav-tab"),
    panels: document.querySelectorAll(".page-panel"),
    generateBtn: document.getElementById("generate-btn"),
    cycleBtn: document.getElementById("view-cycle-btn"),
    bottomBar: document.getElementById("app-bottom-bar"),
    bottomBarActions: document.getElementById("app-bottom-actions"),
    simpleModeBtn: document.getElementById("simple-mode-btn"),
    detailedModeBtn: document.getElementById("detailed-mode-btn"),
    detailedFields: document.getElementById("detailed-fields"),
    modeBadge: document.getElementById("mode-badge"),
    tripPanel: document.getElementById("trip-panel"),
    explorePanel: document.getElementById("explore-panel"),
    savedPanel: document.getElementById("saved-panel"),
    headerMenuBtn: document.getElementById("header-menu-btn"),
    menuDrawer: document.getElementById("menu-drawer"),
    accountModal: document.getElementById("account-modal"),
    closeAccountModalBtn: document.getElementById("close-account-modal"),
    skipAccountBtn: document.getElementById("skip-account-btn"),
    manualAdjustBtn: document.getElementById("manual-adjust-btn"),
    flowStatusCurrent: document.getElementById("flow-status-current"),
    flowStatusFocus: document.getElementById("flow-status-focus"),
    flowStatusCopy: document.getElementById("flow-status-copy"),
    flowStatusNext: document.getElementById("flow-status-next"),
    formBindings: {
      destination: document.getElementById("destination-input"),
      startDate: document.getElementById("start-date-input"),
      endDate: document.getElementById("end-date-input"),
      dateFlexibility: document.getElementById("date-flexibility-toggle"),
      tripLengthSummary: document.getElementById("trip-length-summary"),
      travelerSummary: document.getElementById("traveler-summary"),
      adults: document.getElementById("adults-input"),
      children: document.getElementById("children-input"),
      pets: document.getElementById("pets-input"),
      flightMode: document.getElementById("flight-mode-select"),
      flightPreference: document.getElementById("flight-preference-select"),
      flightAirline: document.getElementById("flight-airline-input"),
      flightNumber: document.getElementById("flight-number-input"),
      arrivalFlight: document.getElementById("arrival-flight-input"),
      departureFlight: document.getElementById("departure-flight-input"),
      tripHotelName: document.getElementById("trip-hotel-name-input"),
      tripHotelArea: document.getElementById("trip-hotel-area-input"),
      tripHotelCheckIn: document.getElementById("trip-hotel-checkin-input"),
      tripHotelCheckOut: document.getElementById("trip-hotel-checkout-input"),
      tripArrivalFlight: document.getElementById("trip-arrival-flight-input"),
      tripDepartureFlight: document.getElementById("trip-departure-flight-input"),
      alternateVersionName: document.getElementById("alternate-version-name-input"),
      journalMood: document.getElementById("journal-mood-input"),
      journalEntry: document.getElementById("journal-entry-input"),
      budget: document.getElementById("budget-input"),
      budgetFlexibility: document.getElementById("budget-flexibility-toggle"),
      mustHaves: document.getElementById("must-haves-input"),
      nonNegotiables: document.getElementById("non-negotiables-input")
    }
  };

  ns.state = Object.assign(ns.state || {}, state);
  ns.data = Object.assign(ns.data || {}, data);
  ns.refs = Object.assign(ns.refs || {}, refs);
  ns.utils = ns.utils || {};
})(window.HB_APP);
