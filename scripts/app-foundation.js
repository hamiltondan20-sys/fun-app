(() => {
const { state: hbState, data: hbData, refs: hbRefs, utils: hbUtils } = window.HB_APP;

function normalizeLookupValue(value) {
      return value.toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    function resolveCanonicalDestination(value) {
      const trimmed = value.trim();
      if (!trimmed) return trimmed;
      const normalized = normalizeLookupValue(trimmed);
      if (hbData.destinationAliases[normalized]) return hbData.destinationAliases[normalized];
      return trimmed;
    }

    function getCountryOnlySelection() {
      const destination = resolveCanonicalDestination(hbState.appState.destination).trim();
      if (!destination) return null;
      if (destination.includes(",")) return null;
      return hbData.countrySuggestions[destination] ? destination : null;
    }

    function getDestinationMatches(queryValue = hbState.appState.destination.trim()) {
      const query = queryValue.trim().toLowerCase();
      const normalizedQuery = normalizeLookupValue(queryValue.trim());
      if (!query || query.length < 2) return [];

      const aliasMatches = Object.entries(hbData.destinationAliases)
        .filter(([alias]) => alias.includes(normalizedQuery))
        .map(([, canonical]) => canonical);

      const directMatches = hbData.destinationOptions
        .filter((option) => option.toLowerCase().includes(query) && option.toLowerCase() !== query);

      return [...new Set([...aliasMatches, ...directMatches])].slice(0, 6);
    }

    function setDestinationSuggestionIndex(nextIndex) {
      const matches = getDestinationMatches();
      if (!matches.length) {
        hbState.destinationSuggestionIndex = -1;
        return;
      }
      const maxIndex = matches.length - 1;
      if (nextIndex < 0) {
        hbState.destinationSuggestionIndex = maxIndex;
      } else if (nextIndex > maxIndex) {
        hbState.destinationSuggestionIndex = 0;
      } else {
        hbState.destinationSuggestionIndex = nextIndex;
      }
      updateDestinationAutofill();
    }

    function applyDestinationSuggestionSelection(index = hbState.destinationSuggestionIndex) {
      const matches = getDestinationMatches();
      const selected = matches[index];
      if (!selected) return;
      hbRefs.formBindings.destination.value = selected;
      hbState.destinationSuggestionIndex = -1;
      hbUtils.updateStateFromInputs();
    }

    function updateDestinationAutofill() {
      const autofill = document.getElementById("destination-autofill");
      const list = document.getElementById("destination-autofill-list");
      if (!autofill || !list) return;

      const query = hbState.appState.destination.trim().toLowerCase();
      if (!query || query.length < 2) {
        autofill.classList.add("hidden");
        list.innerHTML = "";
        hbState.destinationSuggestionIndex = -1;
        return;
      }

      const matches = getDestinationMatches();

      if (!matches.length) {
        autofill.classList.add("hidden");
        list.innerHTML = "";
        hbState.destinationSuggestionIndex = -1;
        return;
      }

      list.innerHTML = matches.map((option, index) => `
        <button class="block w-full px-4 py-3 text-left text-sm font-medium text-ink ${index === hbState.destinationSuggestionIndex ? "bg-surface-soft" : "hover:bg-surface-soft"}" data-action="choose-destination" data-value="${option}" data-suggestion-index="${index}" type="button">
          ${option}
        </button>
      `).join("");
      autofill.classList.remove("hidden");
    }

    function updateDestinationHelper() {
      const helper = document.getElementById("destination-helper");
      const helperCopy = document.getElementById("destination-helper-copy");
      const suggestionWrap = document.getElementById("destination-suggestions");
      if (!helper || !helperCopy || !suggestionWrap) return;

      const country = getCountryOnlySelection();
      if (!country) {
        helper.classList.add("hidden");
        suggestionWrap.innerHTML = "";
        return;
      }

      helper.classList.remove("hidden");
      helperCopy.textContent = `A country is a great start. Before we build the trip, pick the city or base area that fits this vacation best.`;
      suggestionWrap.innerHTML = hbData.countrySuggestions[country].map((suggestion) => `
        <button class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-secondary ring-1 ring-line" data-action="choose-destination" data-value="${suggestion}" type="button">
          ${suggestion}
        </button>
      `).join("");
    }

    function titleCase(text) {
      return text
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    function getCityName() {
      return hbState.appState.destination.split(",")[0].trim() || "Your destination";
    }

    function getCountryName() {
      const parts = hbState.appState.destination.split(",");
      if (parts.length < 2) return parts[0]?.trim() || "Your destination";
      return parts[parts.length - 1].trim();
    }

    function getTripLength() {
      const start = new Date(hbState.appState.startDate);
      const end = new Date(hbState.appState.endDate);
      const days = Math.round((end - start) / 86400000) + 1;
      return Number.isFinite(days) && days > 0 ? days : 5;
    }

    function getDestinationArtPreset(subject = "", accent = "#b94712") {
      const normalized = String(subject).toLowerCase();
      const base = {
        skyTop: accent,
        skyBottom: "#2f5b88",
        glow: "rgba(255,255,255,0.16)",
        foreground: "rgba(255,255,255,0.24)",
        silhouette: "rgba(12,23,36,0.36)",
        detail: "rgba(255,255,255,0.7)",
        motif: `
          <path d="M0 652C97 618 157 568 246 544C342 518 450 538 537 508C620 478 704 404 816 410C923 414 1035 492 1200 452V800H0Z" fill="rgba(255,255,255,0.14)"/>
          <path d="M0 708C144 664 258 600 366 600C467 600 557 648 656 648C786 648 907 550 1013 550C1092 550 1150 586 1200 610V800H0Z" fill="rgba(255,255,255,0.2)"/>
        `
      };

      if (normalized.includes("paris")) {
        return {
          ...base,
          skyTop: "#bd5b2f",
          skyBottom: "#345b8a",
          motif: `
            <circle cx="945" cy="156" r="84" fill="rgba(255,255,255,0.14)"/>
            <path d="M0 700C168 640 315 632 435 650C554 668 680 724 818 712C973 698 1081 602 1200 590V800H0Z" fill="rgba(255,255,255,0.15)"/>
            <g transform="translate(596 226)">
              <path d="M-22 0H22L12 72H-12Z" fill="rgba(255,255,255,0.74)"/>
              <path d="M-58 74H58L30 178H-30Z" fill="rgba(255,255,255,0.72)"/>
              <path d="M-98 182H98L44 360H-44Z" fill="rgba(255,255,255,0.72)"/>
              <path d="M-140 364H140L170 430H-170Z" fill="rgba(12,23,36,0.3)"/>
              <rect x="-120" y="246" width="240" height="16" rx="8" fill="rgba(255,255,255,0.45)"/>
              <rect x="-72" y="128" width="144" height="14" rx="7" fill="rgba(255,255,255,0.45)"/>
            </g>
          `
        };
      }

      if (normalized.includes("london")) {
        return {
          ...base,
          skyTop: "#556d8a",
          skyBottom: "#274967",
          motif: `
            <circle cx="930" cy="168" r="82" fill="rgba(255,255,255,0.14)"/>
            <rect x="0" y="610" width="1200" height="190" fill="rgba(255,255,255,0.15)"/>
            <g transform="translate(575 210)">
              <rect x="-70" y="110" width="140" height="310" fill="rgba(255,255,255,0.72)"/>
              <rect x="-48" y="40" width="96" height="92" fill="rgba(255,255,255,0.68)"/>
              <rect x="-20" y="0" width="40" height="46" fill="rgba(255,255,255,0.74)"/>
              <circle cx="0" cy="86" r="26" fill="rgba(12,23,36,0.3)"/>
              <rect x="164" y="88" width="56" height="334" fill="rgba(255,255,255,0.7)"/>
              <circle cx="192" cy="240" r="62" fill="rgba(255,255,255,0.75)"/>
              <rect x="180" y="96" width="24" height="42" fill="rgba(255,255,255,0.76)"/>
            </g>
          `
        };
      }

      if (normalized.includes("new york")) {
        return {
          ...base,
          skyTop: "#375f8c",
          skyBottom: "#1f344c",
          motif: `
            <circle cx="958" cy="150" r="88" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="620" width="1200" height="180" fill="rgba(255,255,255,0.13)"/>
            <g transform="translate(170 250)" fill="rgba(255,255,255,0.7)">
              <rect x="0" y="130" width="72" height="210"/>
              <rect x="88" y="40" width="86" height="300"/>
              <rect x="194" y="0" width="102" height="340"/>
              <rect x="320" y="74" width="74" height="266"/>
              <rect x="416" y="126" width="60" height="214"/>
              <rect x="520" y="162" width="54" height="178"/>
              <rect x="254" y="-34" width="14" height="52"/>
            </g>
          `
        };
      }

      if (normalized.includes("sydney")) {
        return {
          ...base,
          skyTop: "#4d7ba2",
          skyBottom: "#2c4e73",
          motif: `
            <circle cx="944" cy="148" r="82" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="610" width="1200" height="190" fill="rgba(255,255,255,0.14)"/>
            <path d="M260 520C320 420 380 390 454 394C414 436 388 496 382 560Z" fill="rgba(255,255,255,0.72)"/>
            <path d="M402 556C454 442 536 398 638 402C564 456 512 520 492 590Z" fill="rgba(255,255,255,0.76)"/>
            <path d="M532 572C602 456 704 420 822 428C724 486 654 552 624 620Z" fill="rgba(255,255,255,0.7)"/>
          `
        };
      }

      if (normalized.includes("rome")) {
        return {
          ...base,
          skyTop: "#ba6b47",
          skyBottom: "#4d5f73",
          motif: `
            <circle cx="934" cy="154" r="82" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="626" width="1200" height="174" fill="rgba(255,255,255,0.14)"/>
            <g transform="translate(365 318)">
              <ellipse cx="236" cy="170" rx="208" ry="134" fill="none" stroke="rgba(255,255,255,0.72)" stroke-width="34"/>
              <path d="M66 170H406" stroke="rgba(255,255,255,0.48)" stroke-width="18"/>
              <path d="M236 40V300" stroke="rgba(255,255,255,0.38)" stroke-width="14"/>
            </g>
          `
        };
      }

      if (normalized.includes("tokyo")) {
        return {
          ...base,
          skyTop: "#5f517c",
          skyBottom: "#29486e",
          motif: `
            <circle cx="936" cy="154" r="84" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="634" width="1200" height="166" fill="rgba(255,255,255,0.13)"/>
            <g transform="translate(594 204)">
              <path d="M0 0L36 112H-36Z" fill="rgba(255,255,255,0.78)"/>
              <path d="M0 92L108 420H72L28 300H-28L-72 420H-108Z" fill="rgba(255,255,255,0.74)"/>
              <rect x="-18" y="148" width="36" height="228" fill="rgba(255,255,255,0.84)"/>
              <rect x="-74" y="198" width="148" height="16" rx="8" fill="rgba(255,95,95,0.92)"/>
            </g>
          `
        };
      }

      if (normalized.includes("san francisco")) {
        return {
          ...base,
          skyTop: "#c56d42",
          skyBottom: "#2d577c",
          motif: `
            <circle cx="936" cy="154" r="84" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="610" width="1200" height="190" fill="rgba(255,255,255,0.14)"/>
            <g transform="translate(184 212)">
              <rect x="0" y="68" width="20" height="360" fill="rgba(255,255,255,0.78)"/>
              <rect x="504" y="88" width="20" height="340" fill="rgba(255,255,255,0.78)"/>
              <path d="M20 120H504" stroke="rgba(255,255,255,0.7)" stroke-width="18"/>
              <path d="M20 198H504" stroke="rgba(255,255,255,0.54)" stroke-width="10"/>
              <path d="M20 120L262 420L504 120" fill="none" stroke="rgba(255,255,255,0.66)" stroke-width="10"/>
            </g>
          `
        };
      }

      if (normalized.includes("venice")) {
        return {
          ...base,
          skyTop: "#b7774b",
          skyBottom: "#476a88",
          motif: `
            <circle cx="944" cy="154" r="82" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="646" width="1200" height="154" fill="rgba(255,255,255,0.14)"/>
            <path d="M0 606C132 574 286 566 410 584C558 606 676 654 822 644C980 634 1092 578 1200 566V800H0Z" fill="rgba(255,255,255,0.16)"/>
            <g transform="translate(566 286)" fill="rgba(255,255,255,0.76)">
              <rect x="-168" y="124" width="336" height="20" rx="10"/>
              <path d="M-140 124L-72 36H72L140 124Z"/>
              <rect x="-112" y="148" width="34" height="104"/>
              <rect x="-28" y="148" width="56" height="124"/>
              <rect x="72" y="148" width="32" height="96"/>
            </g>
          `
        };
      }

      if (normalized.includes("florence")) {
        return {
          ...base,
          skyTop: "#bd6d45",
          skyBottom: "#4d5f78",
          motif: `
            <circle cx="940" cy="152" r="84" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="636" width="1200" height="164" fill="rgba(255,255,255,0.14)"/>
            <g transform="translate(594 230)">
              <rect x="-110" y="180" width="220" height="156" fill="rgba(255,255,255,0.72)"/>
              <path d="M0 14C86 14 154 82 154 166H-154C-154 82 -86 14 0 14Z" fill="rgba(255,255,255,0.78)"/>
              <rect x="-34" y="0" width="68" height="48" fill="rgba(255,255,255,0.68)"/>
            </g>
          `
        };
      }

      if (normalized.includes("kyoto")) {
        return {
          ...base,
          skyTop: "#8b5a55",
          skyBottom: "#36556f",
          motif: `
            <circle cx="942" cy="152" r="82" fill="rgba(255,255,255,0.12)"/>
            <path d="M0 660C116 624 242 612 372 632C496 652 620 704 758 694C936 680 1034 616 1200 602V800H0Z" fill="rgba(255,255,255,0.16)"/>
            <g transform="translate(598 256)" fill="rgba(255,255,255,0.76)">
              <rect x="-190" y="210" width="380" height="18" rx="9"/>
              <rect x="-158" y="132" width="316" height="18" rx="9"/>
              <rect x="-124" y="58" width="248" height="18" rx="9"/>
              <rect x="-144" y="228" width="18" height="114"/>
              <rect x="126" y="228" width="18" height="114"/>
            </g>
          `
        };
      }

      if (normalized.includes("singapore")) {
        return {
          ...base,
          skyTop: "#4f738d",
          skyBottom: "#233e5b",
          motif: `
            <circle cx="946" cy="154" r="84" fill="rgba(255,255,255,0.12)"/>
            <rect x="0" y="636" width="1200" height="164" fill="rgba(255,255,255,0.14)"/>
            <g transform="translate(596 206)" fill="rgba(255,255,255,0.74)">
              <rect x="-210" y="308" width="420" height="18" rx="9"/>
              <rect x="-170" y="92" width="76" height="216" rx="16"/>
              <rect x="-38" y="70" width="76" height="238" rx="16"/>
              <rect x="94" y="92" width="76" height="216" rx="16"/>
              <rect x="-196" y="46" width="392" height="28" rx="14"/>
            </g>
          `
        };
      }

      if (normalized.includes("bali")) {
        return {
          ...base,
          skyTop: "#98644e",
          skyBottom: "#315a69",
          motif: `
            <circle cx="944" cy="150" r="82" fill="rgba(255,255,255,0.12)"/>
            <path d="M0 650C174 600 298 594 430 614C560 632 678 690 814 684C980 676 1080 628 1200 612V800H0Z" fill="rgba(255,255,255,0.16)"/>
            <g transform="translate(594 228)" fill="rgba(255,255,255,0.76)">
              <path d="M-138 300L-82 84H-28L-50 300Z"/>
              <path d="M138 300L82 84H28L50 300Z"/>
              <rect x="-30" y="154" width="60" height="146"/>
              <rect x="-70" y="118" width="140" height="22" rx="11"/>
              <rect x="-100" y="72" width="200" height="22" rx="11"/>
            </g>
          `
        };
      }

      if (
        normalized.includes("amalfi") ||
        normalized.includes("positano") ||
        normalized.includes("sorrento") ||
        normalized.includes("cinque terre") ||
        normalized.includes("santorini") ||
        normalized.includes("mykonos") ||
        normalized.includes("paros") ||
        normalized.includes("milos") ||
        normalized.includes("corfu") ||
        normalized.includes("naxos")
      ) {
        return {
          ...base,
          skyTop: "#c7724e",
          skyBottom: "#2f6280",
          motif: `
            <circle cx="944" cy="150" r="84" fill="rgba(255,255,255,0.12)"/>
            <path d="M0 688C122 650 246 590 336 512C408 450 470 388 540 352C604 320 678 318 760 334C884 360 1002 438 1200 420V800H0Z" fill="rgba(12,23,36,0.28)"/>
            <path d="M0 720C154 672 280 650 390 658C520 668 644 718 790 712C936 706 1064 648 1200 636V800H0Z" fill="rgba(255,255,255,0.18)"/>
            <g transform="translate(814 288)" fill="rgba(255,255,255,0.74)">
              <rect x="-16" y="0" width="34" height="54"/>
              <rect x="-54" y="54" width="108" height="22" rx="8"/>
              <rect x="-68" y="82" width="138" height="84" rx="16"/>
              <rect x="-32" y="174" width="74" height="90" rx="12"/>
            </g>
          `
        };
      }

      if (
        normalized.includes("chamonix") ||
        normalized.includes("annecy") ||
        normalized.includes("lake como") ||
        normalized.includes("como")
      ) {
        return {
          ...base,
          skyTop: "#6a7f96",
          skyBottom: "#2b556f",
          motif: `
            <circle cx="940" cy="146" r="82" fill="rgba(255,255,255,0.12)"/>
            <path d="M0 652C110 624 214 566 318 482C390 424 448 356 516 356C572 356 620 420 678 498C720 554 764 608 824 640C920 692 1042 688 1200 650V800H0Z" fill="rgba(12,23,36,0.28)"/>
            <path d="M0 724C156 690 294 684 418 696C562 710 700 742 856 734C998 726 1108 686 1200 670V800H0Z" fill="rgba(255,255,255,0.18)"/>
          `
        };
      }

      if (normalized.includes("rio")) {
        return {
          ...base,
          skyTop: "#c36c49",
          skyBottom: "#2f5d78",
          motif: `
            <circle cx="946" cy="150" r="84" fill="rgba(255,255,255,0.12)"/>
            <path d="M0 676C126 614 256 582 374 594C502 608 604 686 742 686C876 686 972 618 1104 618C1142 618 1174 622 1200 628V800H0Z" fill="rgba(255,255,255,0.16)"/>
            <g transform="translate(596 188)" stroke="rgba(255,255,255,0.76)" stroke-width="18" stroke-linecap="round" fill="none">
              <path d="M0 0V228"/>
              <path d="M-108 74H108"/>
              <path d="M-72 74L0 138L72 74"/>
            </g>
          `
        };
      }

      return base;
    }

    function buildDestinationFallbackArt(subject, accent = "#b94712") {
      const label = encodeURIComponent(subject || "Destination");
      const preset = getDestinationArtPreset(subject, accent);
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${preset.skyTop}"/>
              <stop offset="56%" stop-color="${preset.skyBottom}"/>
              <stop offset="100%" stop-color="#7db7ad"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#bg)"/>
          ${preset.motif}
        </svg>
      `.trim();
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function getEditorialThemeDescriptor(title = "", copy = "") {
      const text = `${title} ${copy}`.toLowerCase();
      if (/breakfast|bakery|coffee|pastry|food|dinner|lunch|restaurant|wine|cocktail/.test(text)) {
        return "food";
      }
      if (/night|evening|cocktail|rooftop|sunset/.test(text)) {
        return "night";
      }
      if (/walk|neighborhood|stroll|street|plaza|piazza|market|district|local/.test(text)) {
        return "neighborhood";
      }
      if (/beach|coast|harbor|waterfront|river|canal|seine|bay/.test(text)) {
        return "water";
      }
      if (/museum|history|landmark|icon|tower|bridge|temple|attraction|view|skyline/.test(text)) {
        return "landmark";
      }
      return "mood";
    }

    function getEditorialThemeOverlay(theme = "mood", index = 0) {
      if (theme === "food") {
        return `
          <g transform="translate(${260 + index * 28} 456)">
            <rect x="0" y="78" width="280" height="18" rx="9" fill="rgba(255,255,255,0.38)"/>
            <path d="M38 0H180C214 0 242 28 242 62V78H0V38C0 17 17 0 38 0Z" fill="rgba(255,255,255,0.78)"/>
            <rect x="50" y="-58" width="26" height="68" rx="13" fill="rgba(255,255,255,0.66)"/>
            <rect x="92" y="-52" width="10" height="62" rx="5" fill="rgba(255,255,255,0.7)"/>
            <rect x="114" y="-52" width="10" height="62" rx="5" fill="rgba(255,255,255,0.7)"/>
            <rect x="136" y="-52" width="10" height="62" rx="5" fill="rgba(255,255,255,0.7)"/>
          </g>
        `;
      }
      if (theme === "night") {
        return `
          <circle cx="${912 - index * 42}" cy="${158 + index * 6}" r="86" fill="rgba(255,244,189,0.18)"/>
          <g transform="translate(${820 - index * 24} 408)" fill="rgba(255,255,255,0.78)">
            <rect x="0" y="76" width="54" height="164" rx="6"/>
            <rect x="74" y="26" width="70" height="214" rx="6"/>
            <rect x="170" y="0" width="92" height="240" rx="6"/>
          </g>
        `;
      }
      if (theme === "neighborhood") {
        return `
          <g transform="translate(${234 + index * 22} 446)">
            <path d="M0 140L110 46L218 140V236H0Z" fill="rgba(255,255,255,0.74)"/>
            <path d="M240 156L332 92L416 156V236H240Z" fill="rgba(255,255,255,0.64)"/>
            <rect x="78" y="146" width="48" height="90" rx="10" fill="rgba(12,23,36,0.2)"/>
            <rect x="284" y="172" width="44" height="64" rx="10" fill="rgba(12,23,36,0.18)"/>
          </g>
        `;
      }
      if (theme === "water") {
        return `
          <path d="M0 618C152 586 284 596 412 624C530 650 654 700 806 688C952 676 1078 612 1200 602V800H0Z" fill="rgba(255,255,255,0.16)"/>
          <path d="M132 562C188 520 266 516 338 546C312 560 284 594 274 626C222 618 180 606 132 562Z" fill="rgba(255,255,255,0.78)"/>
          <rect x="258" y="554" width="12" height="88" rx="6" fill="rgba(255,255,255,0.66)"/>
        `;
      }
      if (theme === "landmark") {
        return `
          <g transform="translate(${596 + index * 8} 236)">
            <path d="M-28 0H28L14 82H-14Z" fill="rgba(255,255,255,0.78)"/>
            <path d="M-84 86H84L44 220H-44Z" fill="rgba(255,255,255,0.72)"/>
            <path d="M-126 226H126L58 410H-58Z" fill="rgba(255,255,255,0.64)"/>
            <rect x="-136" y="246" width="272" height="16" rx="8" fill="rgba(255,255,255,0.38)"/>
          </g>
        `;
      }
      return `
        <circle cx="${876 - index * 20}" cy="${176 + index * 4}" r="72" fill="rgba(255,255,255,0.12)"/>
        <path d="M0 692C148 650 282 626 404 640C544 656 650 714 802 706C958 698 1084 612 1200 584V800H0Z" fill="rgba(255,255,255,0.16)"/>
      `;
    }

    function buildEditorialCardArt(subject, title = "", copy = "", accent = "#2b5f8a", index = 0) {
      const label = encodeURIComponent(`${subject || "Destination"} ${title}`.trim());
      const preset = getDestinationArtPreset(subject, accent);
      const theme = getEditorialThemeDescriptor(title, copy);
      const overlay = getEditorialThemeOverlay(theme, index);
      const subtitle = encodeURIComponent(title || subject || "Editorial view");
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="${label}">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${preset.skyTop}"/>
              <stop offset="56%" stop-color="${preset.skyBottom}"/>
              <stop offset="100%" stop-color="#7db7ad"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#bg)"/>
          ${preset.motif}
          ${overlay}
          <rect x="70" y="70" width="270" height="56" rx="28" fill="rgba(255,255,255,0.16)"/>
          <text x="104" y="107" fill="rgba(255,255,255,0.94)" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="2">${decodeURIComponent(subtitle).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>
        </svg>
      `.trim();
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }

    function isPlaceholderImage(imageValue) {
      return /loremflickr\.com/i.test(String(imageValue || ""));
    }

    function resolvePrototypeImage(primaryImage, subject, accent = "#b94712") {
      const fallback = buildDestinationFallbackArt(subject, accent);
      if (!primaryImage) return fallback;
      const imageValue = String(primaryImage);
      if (imageValue.startsWith("./images/") || imageValue.startsWith("images/") || imageValue.startsWith("data:image/")) {
        return primaryImage;
      }
      const trustedRemoteHosts = [
        "unsplash.com",
        "images.unsplash.com",
        "plus.unsplash.com",
        "source.unsplash.com",
        "www.freeimages.com",
        "images.freeimages.com"
      ];
      try {
        const imageUrl = new URL(imageValue, typeof window !== "undefined" ? window.location.href : undefined);
        if (trustedRemoteHosts.includes(imageUrl.hostname)) {
          return primaryImage;
        }
      } catch (error) {
        return fallback;
      }
      return primaryImage;
    }

    function buildTravelerText() {
      const adults = Math.max(1, Number(hbState.appState.adults) || 1);
      const children = Math.max(0, Number(hbState.appState.children) || 0);
      const travelerParts = [
        `${adults} adult${adults === 1 ? "" : "s"}`
      ];
      if (children > 0) travelerParts.push(`${children} child${children === 1 ? "" : "ren"}`);
      if (hbState.appState.pets !== "No pets") travelerParts.push("pet-friendly needs");
      return travelerParts.join(", ");
    }

    function getCountryGuide() {
      return hbData.countryGuideData[getCountryName()] || {
        title: `${getCountryName()} at a glance`,
        summary: `${getCountryName()} usually feels better when the trip stays realistic about timing, keeps each day centered in one area, and leaves room for local discoveries.`,
        cards: [
          ["Best for", "A balanced trip with a few clear highlights and enough time to enjoy the place instead of racing through it."],
          ["What stands out", "The trip will feel strongest when the bigger sights and the local atmosphere both get room in the plan."],
          ["Good to remember", "Travel time, crowds, and meal rhythm can shape the day more than expected, so flexibility helps."]
        ]
      };
    }

    function getHeroOverlayProfile(location = "", fallback = "balanced") {
      const overlayProfiles = {
        soft: {
          top: "rgba(16, 32, 51, 0.04)",
          mid: "rgba(16, 32, 51, 0.18)",
          bottom: "rgba(16, 32, 51, 0.6)"
        },
        balanced: {
          top: "rgba(16, 32, 51, 0.08)",
          mid: "rgba(16, 32, 51, 0.24)",
          bottom: "rgba(16, 32, 51, 0.72)"
        },
        strong: {
          top: "rgba(16, 32, 51, 0.14)",
          mid: "rgba(16, 32, 51, 0.34)",
          bottom: "rgba(16, 32, 51, 0.82)"
        }
      };

      const profileName = hbData.heroOverlayByLocation?.[location] || fallback;
      return overlayProfiles[profileName] || overlayProfiles.balanced;
    }

    function applyHeroOverlay(target, location = "", fallback = "balanced") {
      if (!target) return;
      const profile = getHeroOverlayProfile(location, fallback);
      target.style.setProperty("--hero-overlay-top", profile.top);
      target.style.setProperty("--hero-overlay-mid", profile.mid);
      target.style.setProperty("--hero-overlay-bottom", profile.bottom);
    }

    function getDestinationHero() {
      const exact = hbData.destinationHeroData[hbState.appState.destination];
      if (exact) {
        return {
          ...exact,
          overlay: hbData.heroOverlayByLocation?.[hbState.appState.destination] || "balanced",
          image: resolvePrototypeImage(exact.image, exact.title || getCityName(), "#b94712")
        };
      }

      const country = hbData.destinationHeroData[getCountryName()];
      if (country) {
        return {
          ...country,
          overlay: hbData.heroOverlayByLocation?.[getCountryName()] || "balanced",
          image: resolvePrototypeImage(country.image, country.title || getCountryName(), "#7d8f57")
        };
      }

      const city = getCityName();
      return {
        image: resolvePrototypeImage("", city, "#b94712"),
        title: city,
        overlay: "balanced",
        copy: `A preview of the place you’re planning around, so the trip starts feeling real before you even generate it.`
      };
    }

    function getGuideHero(city) {
      const stored = hbData.destinationHeroData[city];
      if (stored) {
        return {
          ...stored,
          overlay: hbData.heroOverlayByLocation?.[city] || "balanced",
          image: resolvePrototypeImage(stored.image, city.split(",")[0], "#2b5f8a")
        };
      }
      return {
        image: resolvePrototypeImage("", city.split(",")[0], "#2b5f8a"),
        title: city.split(",")[0],
        overlay: "balanced",
        copy: `A visual preview of ${city.split(",")[0]}, so the destination feels real before the itinerary begins.`
      };
    }

    function slugifyCity(city) {
      return city
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    function findCityBySlug(slug) {
      const guide = hbData.cityGuideData.find((item) => slugifyCity(item.city) === slug);
      return guide?.city || null;
    }

    function slugifyCountry(country) {
      return country
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    function findCountryBySlug(slug) {
      return Object.keys(hbData.countryGuideData).find((country) => slugifyCountry(country) === slug) || null;
    }

    function getCountryCitySuffix(country) {
      const aliases = {
        Turkey: "Türkiye"
      };
      return aliases[country] || country;
    }

    function getGuideCountryForCity(city) {
      const raw = city.split(",").slice(-1)[0].trim();
      return raw === "Türkiye" ? "Turkey" : raw;
    }

    function getCountryRegion(country) {
      return hbData.countryRegionMap[country] || "Other";
    }

    function getCitiesForCountry(country) {
      const suffix = getCountryCitySuffix(country);
      return hbData.cityGuideData.filter((item) => item.city.endsWith(suffix)).slice(0, 6);
    }

    function getCountryHero(country) {
      const editorial = hbData.countryEditorialPageData[country];
      if (editorial?.hero && !isPlaceholderImage(editorial.hero.image)) {
        return {
          ...editorial.hero,
          overlay: editorial.hero.overlay || hbData.heroOverlayByLocation?.[country] || "balanced",
          image: resolvePrototypeImage(editorial.hero.image, editorial.hero.title || country, "#7d8f57")
        };
      }

      const firstCity = getCitiesForCountry(country)[0]?.city;
      if (firstCity && hbData.destinationHeroData[firstCity]) {
        return {
          image: resolvePrototypeImage(hbData.destinationHeroData[firstCity].image, country, "#7d8f57"),
          title: country,
          overlay: hbData.heroOverlayByLocation?.[country] || hbData.heroOverlayByLocation?.[firstCity] || "balanced",
          copy: hbData.countryGuideData[country]?.summary || `A broader planning view of ${country} before choosing a specific city.`
        };
      }

      return {
        image: resolvePrototypeImage("", country, "#7d8f57"),
        title: country,
        overlay: hbData.heroOverlayByLocation?.[country] || "balanced",
        copy: hbData.countryGuideData[country]?.summary || `A broader planning view of ${country} before choosing a specific city.`
      };
    }

    Object.assign(hbUtils, {
      normalizeLookupValue,
      resolveCanonicalDestination,
      getCountryOnlySelection,
      getDestinationMatches,
      setDestinationSuggestionIndex,
      applyDestinationSuggestionSelection,
      updateDestinationAutofill,
      updateDestinationHelper,
      titleCase,
      getCityName,
      getCountryName,
      getTripLength,
      isPlaceholderImage,
      buildDestinationFallbackArt,
      buildEditorialCardArt,
      resolvePrototypeImage,
      buildTravelerText,
      getCountryGuide,
      getHeroOverlayProfile,
      applyHeroOverlay,
      getDestinationHero,
      getGuideHero,
      slugifyCity,
      findCityBySlug,
      slugifyCountry,
      findCountryBySlug,
      getCountryCitySuffix,
      getGuideCountryForCity,
      getCountryRegion,
      getCitiesForCountry,
      getCountryHero
    });
})();
