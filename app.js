const BASE_LETTERS = [
  ["א", "Alef", 1, "origin, breath, silent beginning"],
  ["ב", "Bet", 2, "house, container, blessing entering form"],
  ["ג", "Gimel", 3, "movement, giving, bridge"],
  ["ד", "Dalet", 4, "doorway, humility, threshold"],
  ["ה", "Hei", 5, "revelation, window, divine breath"],
  ["ו", "Vav", 6, "hook, joining, continuity"],
  ["ז", "Zayin", 7, "memory, refinement, nourishment"],
  ["ח", "Chet", 8, "life-force, enclosure, covenantal space"],
  ["ט", "Tet", 9, "hidden good, gestation, inwardness"],
  ["י", "Yud", 10, "point, seed, hand of making"],
  ["כ", "Kaf", 20, "palm, vessel, potential held"],
  ["ל", "Lamed", 30, "learning, ascent, aspiration"],
  ["מ", "Mem", 40, "water, womb, flow"],
  ["נ", "Nun", 50, "continuity, soul, emergence"],
  ["ס", "Samech", 60, "support, circle, surrounding"],
  ["ע", "Ayin", 70, "eye, perception, depth"],
  ["פ", "Pei", 80, "mouth, expression, release"],
  ["צ", "Tzadik", 90, "righteousness, alignment"],
  ["ק", "Kuf", 100, "holiness entering the ordinary"],
  ["ר", "Reish", 200, "head, beginning, poverty that opens"],
  ["ש", "Shin", 300, "fire, transformation, threefoldness"],
  ["ת", "Tav", 400, "mark, completion, covenantal sign"],
];

const FINAL_FORMS = {
  ך: { base: "כ", sofit: 500, name: "Final Kaf" },
  ם: { base: "מ", sofit: 600, name: "Final Mem" },
  ן: { base: "נ", sofit: 700, name: "Final Nun" },
  ף: { base: "פ", sofit: 800, name: "Final Pei" },
  ץ: { base: "צ", sofit: 900, name: "Final Tzadik" },
};

const LETTERS = Object.fromEntries(
  BASE_LETTERS.map(([glyph, name, absolute, meaning], index) => [
    glyph,
    {
      glyph,
      base: glyph,
      name,
      absolute,
      ordinal: index + 1,
      reduced: reduceNumber(absolute),
      meaning,
    },
  ])
);

Object.entries(FINAL_FORMS).forEach(([glyph, final]) => {
  const base = LETTERS[final.base];
  LETTERS[glyph] = {
    ...base,
    glyph,
    name: final.name,
    sofit: final.sofit,
    ordinal: BASE_LETTERS.length + Object.keys(FINAL_FORMS).indexOf(glyph) + 1,
    reduced: reduceNumber(final.sofit),
  };
});

const HEBREW_ALPHABET = BASE_LETTERS.map(([glyph]) => glyph);
const FINAL_NORMALIZE = Object.fromEntries(Object.entries(FINAL_FORMS).map(([k, v]) => [k, v.base]));

const MILUI = {
  א: "אלף",
  ב: "בית",
  ג: "גימל",
  ד: "דלת",
  ה: "הא",
  ו: "וו",
  ז: "זין",
  ח: "חית",
  ט: "טית",
  י: "יוד",
  כ: "כף",
  ל: "למד",
  מ: "מם",
  נ: "נון",
  ס: "סמך",
  ע: "עין",
  פ: "פה",
  צ: "צדי",
  ק: "קוף",
  ר: "ריש",
  ש: "שין",
  ת: "תו",
};

const ENGLISH_TO_HEBREW = {
  blessing: "ברכה",
  bless: "ברכה",
  bracha: "ברכה",
  beracha: "ברכה",
  adonai: "אדני",
  adni: "אדני",
  adny: "אדני",
  peace: "שלום",
  shalom: "שלום",
  love: "אהבה",
  ahava: "אהבה",
  truth: "אמת",
  emet: "אמת",
  life: "חיים",
  chaim: "חיים",
  light: "אור",
  or: "אור",
  wisdom: "חכמה",
  chokhmah: "חכמה",
  king: "מלך",
  melech: "מלך",
  torah: "תורה",
  israel: "ישראל",
  creation: "בראשית",
  beginning: "בראשית",
  soul: "נשמה",
  holiness: "קדושה",
  holy: "קדוש",
  prayer: "תפילה",
  joy: "שמחה",
  memory: "זכר",
  secret: "רז",
};

const LEXICON = [
  entry("ברכה", "blessing", "spoken increase; the flow of good into form"),
  entry("זכר", "remembrance", "memory, naming, and continuity", ["memory"]),
  entry("אור", "light", "illumination and the first visible distinction"),
  entry("רז", "secret", "hidden dimension, inner teaching"),
  entry("אהבה", "love", "attachment that makes multiplicity one"),
  entry("אחד", "one", "unity; the many gathered into one"),
  entry("שלום", "peace", "wholeness, completion, restored relation"),
  entry("עשו", "Esav", "same number as shalom in classic comparison"),
  entry("חיים", "life", "living flow, doubled life-force"),
  entry("אמת", "truth", "beginning, middle, and end of the alphabet"),
  entry("מלך", "king", "centered rule, ordered sovereignty"),
  entry("מים", "water", "flow, Torah, hidden depth"),
  entry("חכמה", "wisdom", "flash of insight before full understanding"),
  entry("בינה", "understanding", "discernment, structure, expansion"),
  entry("כתר", "crown", "transcendent will and source"),
  entry("תורה", "Torah", "teaching, direction, inherited light"),
  entry("ישראל", "Israel", "wrestling toward divine straightness"),
  entry("יראה", "awe", "reverent perception"),
  entry("גבורה", "strength", "discipline, boundary, restraint"),
  entry("חסד", "kindness", "overflowing generosity"),
  entry("נפש", "soul-life", "embodied vitality"),
  entry("רוח", "spirit", "wind, movement, speech"),
  entry("נשמה", "soul-breath", "higher breath and inner life"),
  entry("עולם", "world", "concealment, time-space, lived reality"),
  entry("זמן", "time", "measured unfolding"),
  entry("שבת", "Shabbat", "rest, completion, return"),
  entry("עדן", "Eden", "delight, refined pleasure"),
  entry("סולם", "ladder", "ascent and descent held together"),
  entry("סיני", "Sinai", "revelation through humility"),
  entry("משיח", "Messiah", "anointed repair and completion"),
  entry("נחש", "serpent", "same value as Mashiach; distortion and repair"),
  entry("משה", "Moshe", "drawn from water, channel of Torah"),
  entry("השם", "the Name", "divine name in reverent speech"),
  entry("דוד", "David", "beloved sovereignty"),
  entry("זהב", "gold", "radiant value and refinement"),
  entry("קודש", "holy", "set apart for higher use"),
  entry("קדוש", "holy", "sanctified, distinct, elevated"),
  entry("מלכות", "kingdom", "manifested sovereignty"),
  entry("אדם", "human", "earthling with divine image"),
  entry("אדמה", "earth", "ground, source of human formation"),
  entry("אלהים", "God-name", "judgment, nature, ordered power"),
  entry("הטבע", "nature", "the natural order; shares value with אלהים"),
  entry("כבוד", "honor", "weight, dignity, presence"),
  entry("לב", "heart", "inner center, will and understanding"),
  entry("חן", "grace", "favor, beauty, unforced symmetry"),
  entry("נח", "Noach", "rest, settledness"),
  entry("בראשית", "in the beginning", "first word, seed of creation"),
  entry("שמחה", "joy", "expanded heart, holy gladness"),
  entry("תפילה", "prayer", "self-judgment, attachment, pleading"),
  entry("קדושה", "holiness", "a field set apart for the sacred"),
  entry("אדני", "Adonai", "divine name read as mastery, nearness, and spoken address"),
  entry("תרעא", "gate / portal", "Aramaic word for gate; a classic interpretive link for milui 671"),
];

const VERSES = [
  verse("Genesis 12:2", "בראשית י״ב:ב׳", "ואעשך לגוי גדול ואברכך ואגדלה שמך והיה ברכה", "I will bless you; I will make your name great, and you shall be a blessing.", ["ברכה", "ברך"], "word", "https://www.sefaria.org/Genesis.12.2", "Torah"),
  verse("Deuteronomy 11:26", "דברים י״א:כ״ו", "ראה אנכי נתן לפניכם היום ברכה וקללה", "See, this day I set before you blessing and curse.", ["ברכה"], "word", "https://www.sefaria.org/Deuteronomy.11.26", "Torah"),
  verse("Numbers 6:24", "במדבר ו׳:כ״ד", "יברכך יהוה וישמרך", "God bless you and protect you.", ["ברך", "ברכה"], "root", "https://www.sefaria.org/Numbers.6.24", "Torah"),
  verse("Proverbs 10:22", "משלי י׳:כ״ב", "ברכת יהוה היא תעשיר ולא יסף עצב עמה", "It is the blessing of God that enriches.", ["ברכה", "ברך"], "root", "https://www.sefaria.org/Proverbs.10.22", "Writings"),
  verse("Psalms 29:11", "תהילים כ״ט:י״א", "יהוה עז לעמו יתן יהוה יברך את עמו בשלום", "God blesses the people with well-being.", ["שלום", "ברך"], "root", "https://www.sefaria.org/Psalms.29.11", "Writings"),
  verse("Genesis 15:2", "בראשית ט״ו:ב׳", "ויאמר אברם אדני יהוה מה תתן לי ואנכי הולך ערירי", "Abram addresses Adonai before asking what can be given.", ["אדני"], "name", "https://www.sefaria.org/Genesis.15.2", "Torah"),
];

const TANAKH_BOOKS_24 = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Samuel", "Kings", "Isaiah", "Jeremiah", "Ezekiel",
  "The Twelve", "Psalms", "Proverbs", "Job", "Song of Songs", "Ruth",
  "Lamentations", "Ecclesiastes", "Esther", "Daniel", "Ezra-Nehemiah", "Chronicles",
];

const NUMBER_WORDS = {
  671: {
    word: "תרעא",
    language: "Aramaic",
    gloss: "gate / portal",
    note: "This is an interpretive Aramaic bridge: the milouï total can be read as letters, then as a word.",
  },
};

const SYSTEMS = [
  { id: "absolute", label: "Absolute", detail: "א=1 ת=400" },
  { id: "ordinal", label: "Ordinal", detail: "א=1 ת=22" },
  { id: "reduced", label: "Reduced", detail: "single digit" },
  { id: "sofit", label: "Sofit", detail: "finals 500-900" },
  { id: "musafi", label: "Musafi", detail: "value + letters" },
  { id: "kolel", label: "Kolel", detail: "value + words" },
  { id: "perati", label: "Perati", detail: "squares" },
];

const COLORS = {
  center: "#fffdf7",
  letter: "#d7e8ec",
  relation: "#f4dfb0",
  transform: "#dbe6de",
  verse: "#f1d6cf",
};

let state = {
  word: "ברכה",
  system: "absolute",
  selectedNode: null,
  resultFilter: "all",
  graphMode: "constellation",
  orbitShift: 0,
  compareTarget: "אדני",
  liveSearch: { status: "idle", query: "", results: [], error: "" },
};

const elements = {
  searchForm: document.querySelector("#searchForm"),
  queryInput: document.querySelector("#queryInput"),
  resolvedHint: document.querySelector("#resolvedHint"),
  systemChips: document.querySelector("#systemChips"),
  transformList: document.querySelector("#transformList"),
  hebrewPad: document.querySelector("#hebrewPad"),
  displayWord: document.querySelector("#displayWord"),
  primaryValue: document.querySelector("#primaryValue"),
  metricStrip: document.querySelector("#metricStrip"),
  constellationSvg: document.querySelector("#constellationSvg"),
  constellationDescription: document.querySelector("#constellationDescription"),
  nodeCard: document.querySelector("#nodeCard"),
  resultList: document.querySelector("#resultList"),
  resultsSummary: document.querySelector("#resultsSummary"),
  miluiSummary: document.querySelector("#miluiSummary"),
  miluiTotal: document.querySelector("#miluiTotal"),
  miluiTable: document.querySelector("#miluiTable"),
  gateCard: document.querySelector("#gateCard"),
  selectedInsight: document.querySelector("#selectedInsight"),
  letterStack: document.querySelector("#letterStack"),
  relationList: document.querySelector("#relationList"),
  synthesis: document.querySelector("#synthesis"),
  shuffleButton: document.querySelector("#shuffleButton"),
};

initialize();

function initialize() {
  renderStaticControls();
  render();

  elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applySearch(elements.queryInput.value);
  });

  elements.shuffleButton.addEventListener("click", () => {
    state.orbitShift += 0.43;
    renderConstellation(buildModel(state.word));
  });

  document.querySelectorAll("[data-result-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.resultFilter = button.dataset.resultFilter;
      document.querySelectorAll("[data-result-filter]").forEach((item) => item.classList.toggle("active", item === button));
      renderResults(buildModel(state.word));
    });
  });

  document.querySelectorAll("[data-graph-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.graphMode = button.dataset.graphMode;
      document.querySelectorAll("[data-graph-mode]").forEach((item) => item.classList.toggle("active", item === button));
      renderConstellation(buildModel(state.word));
    });
  });
}

function renderStaticControls() {
  elements.systemChips.innerHTML = SYSTEMS.map(
    (system) => `
      <button class="chip ${system.id === state.system ? "active" : ""}" type="button" data-system="${system.id}">
        <strong>${system.label}</strong>
        <span>${system.detail}</span>
      </button>
    `
  ).join("");

  elements.systemChips.querySelectorAll("[data-system]").forEach((button) => {
    button.addEventListener("click", () => {
      state.system = button.dataset.system;
      elements.systemChips.querySelectorAll(".chip").forEach((chip) => chip.classList.toggle("active", chip === button));
      render();
    });
  });

  elements.hebrewPad.innerHTML = [...HEBREW_ALPHABET, "ך", "ם", "ן", "ף", "ץ", "⌫"].map(
    (letter) => `<button type="button" data-letter="${letter}" aria-label="${letter === "⌫" ? "Delete" : `Add ${letter}`}">${letter}</button>`
  ).join("");

  elements.hebrewPad.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const letter = button.dataset.letter;
    if (letter === "⌫") {
      elements.queryInput.value = elements.queryInput.value.slice(0, -1);
    } else {
      elements.queryInput.value += letter;
    }
    elements.queryInput.focus();
  });
}

function applySearch(raw) {
  const resolved = resolveInput(raw);
  state.word = resolved || "ברכה";
  state.selectedNode = null;
  elements.queryInput.value = raw.trim() || state.word;
  render();
}

function render() {
  const model = buildModel(state.word);
  elements.displayWord.textContent = model.word;
  elements.primaryValue.textContent = model.value;
  elements.resolvedHint.textContent = elements.queryInput.value.trim() !== model.word ? `Resolved to ${model.word}` : `Exploring ${model.word}`;

  renderMetrics(model);
  renderTransforms(model);
  renderLetters(model);
  renderMilui(model);
  renderRelations(model);
  renderSynthesis(model);
  renderResults(model);
  renderConstellation(model);
  renderSelected(model.nodes[0], model, false);
}

function renderMetrics(model) {
  const metrics = [
    ["Absolute", gematria(model.word, "absolute")],
    ["Reduced", gematria(model.word, "reduced")],
    ["Words", hebrewWords(model.word).length || 1],
    ["Milui", gematria(model.milui, "absolute")],
  ];
  elements.metricStrip.innerHTML = metrics.map(([label, value]) => `
    <div class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function renderTransforms(model) {
  const items = [
    ["Atbash", model.atbash],
    ["Albam", model.albam],
    ["Milui", model.milui],
    ["Reverse", [...model.word].reverse().join("")],
  ];

  elements.transformList.innerHTML = items.map(([label, value]) => `
    <button class="transform-item" type="button" data-transform="${escapeHtml(value)}">
      <strong>${label}</strong>
      <span dir="rtl">${value}</span>
    </button>
  `).join("");

  elements.transformList.querySelectorAll("[data-transform]").forEach((button) => {
    button.addEventListener("click", () => {
      elements.queryInput.value = button.dataset.transform;
      applySearch(button.dataset.transform);
    });
  });
}

function renderLetters(model) {
  elements.letterStack.innerHTML = model.letters.map((letter) => `
    <div class="letter-row">
      <div class="letter-glyph">${letter.glyph}</div>
      <div>
        <div class="letter-name">${letter.name}</div>
        <div class="letter-meta">${letter.meaning}</div>
      </div>
      <div class="letter-value">${valueForLetter(letter.glyph, state.system)}</div>
    </div>
  `).join("");
}

function renderMilui(model) {
  elements.miluiSummary.textContent = `${model.word} opens into ${model.milui}. Each expanded letter keeps its own subtotal.`;
  elements.miluiTotal.textContent = `Total ${model.miluiTotal}`;
  elements.miluiTable.innerHTML = `
    <div class="milui-head">
      <span>Letter</span>
      <span>Milouï</span>
      <span>Calculation</span>
      <span>Total</span>
    </div>
    ${model.miluiRows.map((row) => `
      <div class="milui-row">
        <span class="milui-letter">${row.letter}</span>
        <span class="milui-word">${row.filled}</span>
        <span class="milui-calc">${row.calculation}</span>
        <span class="milui-value">${row.total}</span>
      </div>
    `).join("")}
  `;

  const numberWord = NUMBER_WORDS[model.miluiTotal] || numberToHebrewWord(model.miluiTotal);
  elements.gateCard.innerHTML = `
    <div class="gate-number" dir="rtl">${numberWord.word}</div>
    <div class="gate-title">${model.miluiTotal} as letters</div>
    <p class="gate-note">${numberWord.language ? `${numberWord.language}: ${numberWord.gloss}. ` : ""}${numberWord.note}</p>
    <div class="gate-breakdown">${numberToHebrewBreakdown(model.miluiTotal).map((item) => `<span>${item.value} = ${item.letter}</span>`).join("")}</div>
  `;
}

function renderRelations(model) {
  elements.relationList.innerHTML = model.relations.slice(0, 6).map((item) => `
    <button class="relation-row" type="button" data-word="${escapeHtml(item.word)}">
      <div class="relation-word">${item.word}</div>
      <div>
        <div class="relation-name">${item.translation}</div>
        <div class="relation-note">${item.note}</div>
      </div>
      <div class="relation-value">${item.value}</div>
    </button>
  `).join("");

  elements.relationList.querySelectorAll("[data-word]").forEach((button) => {
    button.addEventListener("click", () => {
      state.compareTarget = button.dataset.word;
      renderSynthesis(buildModel(state.word));
      renderSelected({
        kind: "comparison",
        label: `${state.word} ↔ ${button.dataset.word}`,
        title: "Comparison ready",
        description: `The active text stays ${state.word}. The comparison target is now ${button.dataset.word}. Use the Study synthesis card to test other words or phrases.`,
      }, model, false);
    });
  });
}

function renderSynthesis(model) {
  const root = estimateRoot(model.word);
  const factors = factorize(model.value);
  const strongest = model.relations.find((item) => item.word !== model.word);
  const reduced = reduceNumber(model.value);
  const compareTarget = state.compareTarget || strongest?.word || "";
  const lines = [
    `${model.word} totals ${model.value} in ${labelForSystem(state.system)}. Its digit-root is ${reduced}, giving the search a compact numerical signature for quick comparison.`,
    root ? `The visible root pattern is ${root}. Related appearances are weighted toward verses and words that share these root letters.` : "The text is short or phrase-like, so the app emphasizes letter anatomy, word totals, and equal-value relationships.",
    strongest ? `${strongest.word} shares or neighbors the same numeric field, suggesting a study path from ${model.word} toward ${strongest.translation}.` : "No equal-value match is in the local lexicon yet, so nearby values become the first study trail.",
    `Factor pattern: ${factors.length ? factors.join(" x ") : "prime"}. Treat this as a remez/signal, not a proof by itself.`,
  ];

  elements.synthesis.innerHTML = `
    ${renderComparisonBlock(model.word, compareTarget)}
    <div class="synthesis-lines">
      ${lines.map((line) => `<p>${line}</p>`).join("")}
    </div>
  `;

  const compareForm = elements.synthesis.querySelector("#compareForm");
  const compareInput = elements.synthesis.querySelector("#compareInput");
  const clearButton = elements.synthesis.querySelector("#clearCompareButton");
  const exploreButton = elements.synthesis.querySelector("#exploreCompareButton");
  const swapButton = elements.synthesis.querySelector("#swapCompareButton");

  compareForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.compareTarget = compareInput.value;
    renderSynthesis(buildModel(state.word));
  });

  clearButton?.addEventListener("click", () => {
    state.compareTarget = "";
    renderSynthesis(buildModel(state.word));
  });

  exploreButton?.addEventListener("click", () => {
    const next = resolveInput(state.compareTarget) || cleanHebrewInput(state.compareTarget);
    if (!next) return;
    const oldActive = state.word;
    state.compareTarget = oldActive;
    elements.queryInput.value = next;
    applySearch(next);
  });

  swapButton?.addEventListener("click", () => {
    const next = resolveInput(state.compareTarget) || cleanHebrewInput(state.compareTarget);
    if (!next) return;
    const oldActive = state.word;
    state.compareTarget = oldActive;
    elements.queryInput.value = next;
    applySearch(next);
  });
}

function renderComparisonBlock(activeRaw, compareRaw) {
  const active = comparisonProfile(activeRaw);
  const compared = comparisonProfile(compareRaw || "");
  const hasCompared = Boolean(compared.clean);
  const matches = hasCompared ? comparisonMatches(active, compared) : [];
  const diff = hasCompared ? Math.abs(active.systems.absolute - compared.systems.absolute) : 0;
  const matchText = !hasCompared
    ? "Type or click a word to compare against the active text."
    : matches.length
      ? `Shared systems: ${matches.join(", ")}.`
      : `No exact system match yet. Absolute difference: ${diff}.`;
  const tone = hasCompared && matches.length ? "match" : "open";
  const comparedDisplay = compared.display || "";

  return `
    <section class="compare-card ${tone}" aria-label="Smart gematria comparison">
      <div class="compare-heading">
        <div>
          <span class="node-kind">smart comparison</span>
          <h3>Compare words or full Hebrew phrases</h3>
        </div>
        <span class="compare-badge">${hasCompared ? `${matches.length} match${matches.length === 1 ? "" : "es"}` : "ready"}</span>
      </div>

      <form class="compare-form" id="compareForm">
        <label for="compareInput">Active: <strong dir="rtl">${escapeHtml(active.display)}</strong></label>
        <div class="compare-input-row">
          <input id="compareInput" type="text" dir="auto" value="${escapeHtml(comparedDisplay)}" placeholder="אדני, שלום, or a Hebrew sentence" autocomplete="off" spellcheck="false" />
          <button type="submit">Compare</button>
        </div>
      </form>

      <div class="compare-verdict">
        <strong>${matchText}</strong>
        <span>Same-value findings are a study trail. They become meaningful when supported by text, context, and mesorah.</span>
      </div>

      ${hasCompared ? `
        <div class="compare-table" role="table" aria-label="Gematria comparison table">
          ${comparisonRows(active, compared).map((row) => `
            <div class="compare-row ${row.equal ? "equal" : ""}" role="row">
              <span>${row.label}</span>
              <strong>${row.left}</strong>
              <em>${row.equal ? "=" : "↔"}</em>
              <strong>${row.right}</strong>
            </div>
          `).join("")}
        </div>

        <details class="word-breakdown" open>
          <summary>Word-by-word breakdown</summary>
          <div class="word-columns">
            ${renderWordBreakdown(active)}
            ${renderWordBreakdown(compared)}
          </div>
        </details>

        <div class="compare-actions">
          <button class="ghost-button" id="exploreCompareButton" type="button">Make compared text active</button>
          <button class="ghost-button" id="swapCompareButton" type="button">Swap active and compared</button>
          <button class="ghost-button" id="clearCompareButton" type="button">Clear comparison</button>
        </div>
      ` : ""}
    </section>
  `;
}

function comparisonProfile(raw) {
  const display = resolveInput(raw) || cleanHebrewInput(raw);
  const clean = stripNonHebrew(display);
  const words = hebrewWords(display);
  const milui = fillWord(display);
  return {
    raw,
    display,
    clean,
    words,
    systems: {
      absolute: gematria(display, "absolute"),
      ordinal: gematria(display, "ordinal"),
      reduced: gematria(display, "reduced"),
      sofit: gematria(display, "sofit"),
      musafi: gematria(display, "musafi"),
      kolel: gematria(display, "kolel"),
      perati: gematria(display, "perati"),
      milui: gematria(milui, "absolute"),
    },
  };
}

function comparisonRows(left, right) {
  return [
    ["Absolute / Mispar Hechrechi", "absolute"],
    ["Ordinal / Mispar Siduri", "ordinal"],
    ["Reduced / Mispar Katan", "reduced"],
    ["Sofit / final-letter value", "sofit"],
    ["Musafi / value + letters", "musafi"],
    ["Kolel / value + words", "kolel"],
    ["Perati / squared letters", "perati"],
    ["Milouï / letter names", "milui"],
  ].map(([label, key]) => ({
    label,
    left: left.systems[key],
    right: right.systems[key],
    equal: left.systems[key] === right.systems[key],
  }));
}

function comparisonMatches(left, right) {
  return comparisonRows(left, right).filter((row) => row.equal).map((row) => row.label.split(" /")[0]);
}

function renderWordBreakdown(profile) {
  const rows = profile.words.length ? profile.words : [profile.display].filter(Boolean);
  return `
    <div class="word-breakdown-column">
      <strong dir="rtl">${escapeHtml(profile.display)}</strong>
      ${rows.map((word) => `<span><b dir="rtl">${escapeHtml(word)}</b> ${gematria(word, "absolute")}</span>`).join("")}
    </div>
  `;
}

function renderResults(model) {
  const filtered = model.results.filter((item) => state.resultFilter === "all" || item.kind === state.resultFilter);
  const live = state.liveSearch;
  const liveActive = live.query && normalizeHebrew(live.query) === normalizeHebrew(model.word);
  const liveResults = liveActive ? live.results : [];
  const liveStatus = liveActive ? live.status : "idle";
  elements.resultsSummary.textContent = `${filtered.length} curated source${filtered.length === 1 ? "" : "s"} plus ${liveResults.length} live Sefaria result${liveResults.length === 1 ? "" : "s"} for ${model.word}. ${TANAKH_BOOKS_24.length} Tanakh-book corpus target.`;

  const liveBox = `
    <article class="live-search-box">
      <div>
        <strong>Live Sefaria lookup</strong>
        <p>Search the live Sefaria library for the active Hebrew word or phrase. Curated local verses remain below as a stable fallback.</p>
      </div>
      <button class="ghost-button" id="liveSefariaButton" type="button" ${liveStatus === "loading" ? "disabled" : ""}>
        ${liveStatus === "loading" ? "Searching…" : "Search live"}
      </button>
      ${liveStatus === "error" ? `<p class="live-error">${escapeHtml(live.error || "Live search is unavailable right now.")}</p>` : ""}
    </article>
  `;

  const liveMarkup = liveResults.map((item) => `
    <article class="result-row live-result">
      <div>
        <div class="result-ref">${escapeHtml(item.ref)}</div>
        <div class="result-meta">Live Sefaria</div>
      </div>
      <div class="result-text">
        <div class="result-hebrew" dir="rtl">${item.hebrew || ""}</div>
        <div class="result-english">${escapeHtml(item.english || "Open Sefaria for full text and versions.")}</div>
      </div>
      <div class="result-source">
        <a class="result-source-link" href="${item.sourceUrl}" target="_blank" rel="noreferrer">Open Sefaria</a>
        <span>${escapeHtml(item.path || "Sefaria library")}</span>
        <span class="result-kind">live</span>
      </div>
    </article>
  `).join("");

  const curatedMarkup = filtered.map((item) => {
    const hebrew = highlightTerms(item.hebrew, model.matchTerms);
    return `
      <article class="result-row">
        <div>
          <div class="result-ref">${item.ref}</div>
          <div class="result-meta">${item.heRef}</div>
        </div>
        <div class="result-text">
          <div class="result-hebrew" dir="rtl">${hebrew}</div>
          <div class="result-english">${item.english}</div>
        </div>
        <div class="result-source">
          <a class="result-source-link" href="${item.sourceUrl}" target="_blank" rel="noreferrer">Open Sefaria</a>
          <span>Sefaria · ${item.division}</span>
          <span class="result-kind">${item.kind}</span>
        </div>
      </article>
    `;
  }).join("") || `<article class="result-row"><div class="result-ref">No curated source yet</div><div class="result-english">This prototype only displays curated Tanakh rows with an explicit Sefaria URL. Try ברכה, אדני, peace, blessing, light, love, truth, or Torah. You can also run live search above.</div><div class="result-source">No invented pasuk</div></article>`;

  elements.resultList.innerHTML = liveBox + liveMarkup + curatedMarkup;
  elements.resultList.querySelector("#liveSefariaButton")?.addEventListener("click", () => runLiveSefariaSearch(model.word));
}

async function runLiveSefariaSearch(rawQuery) {
  const query = cleanHebrewInput(rawQuery) || stripNonHebrew(rawQuery);
  if (!query) return;
  state.liveSearch = { status: "loading", query, results: [], error: "" };
  renderResults(buildModel(state.word));

  try {
    const response = await fetch("https://www.sefaria.org/api/search-wrapper", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        query,
        type: "text",
        field: "naive_lemmatizer",
        source_proj: true,
        filters: ["Tanakh"],
        filter_fields: ["path"],
        slop: 2,
        size: 8,
      }),
    });

    if (!response.ok) throw new Error(`Sefaria returned ${response.status}`);
    const data = await response.json();
    const results = normalizeSefariaResults(data).slice(0, 8);
    state.liveSearch = { status: "done", query, results, error: "" };
  } catch (error) {
    state.liveSearch = {
      status: "error",
      query,
      results: [],
      error: "Live search did not respond. The curated sources below still work, and you can try again later.",
    };
  }

  renderResults(buildModel(state.word));
}

function normalizeSefariaResults(data) {
  const hits = data?.hits?.hits || data?.hits || data?.results || [];
  return hits.map((hit) => {
    const source = hit?._source || hit?.source || hit || {};
    const ref = source.ref || hit.ref || source.title || source.heRef || "Sefaria result";
    const highlight = hit.highlight || {};
    const hebrewSnippet = firstHighlight(highlight) || source.he || source.content || source.exact || "";
    const englishSnippet = source.text || source.en || source.versionTitle || "";
    return {
      ref,
      hebrew: sanitizeSefariaHtml(hebrewSnippet),
      english: stripHtml(Array.isArray(englishSnippet) ? englishSnippet.join(" ") : englishSnippet).slice(0, 220),
      path: Array.isArray(source.path) ? source.path.join(" › ") : source.path,
      sourceUrl: `https://www.sefaria.org/${encodeURIComponent(String(ref).replace(/\s+/g, "."))}`,
    };
  }).filter((item) => item.ref);
}

function firstHighlight(highlight) {
  const values = Object.values(highlight || {}).flat();
  return values.find(Boolean) || "";
}

function sanitizeSefariaHtml(value) {
  return String(Array.isArray(value) ? value.join(" ") : value || "")
    .replace(/<em>/g, "<mark>")
    .replace(/<\/em>/g, "</mark>")
    .replace(/<(?!\/?mark\b)[^>]+>/g, "");
}

function stripHtml(value) {
  return String(value || "").replace(/<[^>]+>/g, "");
}

function renderConstellation(model) {
  if (state.graphMode === "path") {
    renderPathGraph(model);
    return;
  }

  elements.constellationDescription.textContent = "A readable orbit of letters, values, transformations, and verified sources around the searched word.";
  const nodes = positionNodes(model.nodes);
  const center = nodes.find((node) => node.id === "center");
  const edges = nodes.filter((node) => node.id !== "center").map((node) => ({
    source: center,
    target: node,
    highlight: node.kind === "relation" && Number(node.value) === model.value,
  }));

  const edgeMarkup = edges.map((edge) => `
    <line class="edge ${edge.highlight ? "highlight" : ""}" x1="${edge.source.x}" y1="${edge.source.y}" x2="${edge.target.x}" y2="${edge.target.y}" />
  `).join("");

  const nodeMarkup = nodes.map((node) => {
    const radius = node.kind === "center" ? 62 : node.kind === "verse" ? 39 : 34;
    const labelY = node.kind === "center" ? -8 : -4;
    return `
      <g class="node ${node.kind === "center" ? "center" : ""}" data-node-id="${node.id}" transform="translate(${node.x} ${node.y})" tabindex="0" role="button" aria-label="${node.label}">
        <circle r="${radius}" fill="${COLORS[node.kind] || COLORS.relation}" stroke="rgba(22,33,44,.24)" stroke-width="1.3" />
        <text class="main-label" y="${labelY}" dir="rtl">${node.label}</text>
        <text class="sub-label" y="${radius - 18}">${node.value || node.kind}</text>
      </g>
    `;
  }).join("");

  elements.constellationSvg.innerHTML = edgeMarkup + nodeMarkup;
  elements.constellationSvg.querySelectorAll(".node").forEach((nodeEl) => {
    const node = nodes.find((item) => item.id === nodeEl.dataset.nodeId);
    nodeEl.addEventListener("click", () => selectNode(node, model));
    nodeEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectNode(node, model);
      }
    });
  });
}

function renderPathGraph(model) {
  elements.constellationDescription.textContent = "A second view: the word unfolds as a study path from letters to milouï, source, number, and symbolic doorway.";
  const pathNodes = buildPathNodes(model);
  const edgeMarkup = pathNodes.slice(0, -1).map((node, index) => {
    const next = pathNodes[index + 1];
    return `<path class="edge highlight" d="M ${node.x + 45} ${node.y} C ${node.x + 92} ${node.y}, ${next.x - 92} ${next.y}, ${next.x - 45} ${next.y}" fill="none" />`;
  }).join("");

  const nodeMarkup = pathNodes.map((node, index) => `
    <g class="node path-node" data-node-id="${node.id}" transform="translate(${node.x} ${node.y})" tabindex="0" role="button" aria-label="${node.title}">
      <rect x="-64" y="-42" width="128" height="84" rx="8" fill="${COLORS[node.kind] || COLORS.relation}" stroke="rgba(22,33,44,.22)" stroke-width="1.3" />
      <text class="path-index" x="-42" y="-22">${String(index + 1).padStart(2, "0")}</text>
      <text class="main-label" y="-1" dir="rtl">${node.label}</text>
      <text class="sub-label" y="24">${node.value}</text>
    </g>
  `).join("");

  elements.constellationSvg.innerHTML = edgeMarkup + nodeMarkup;
  elements.constellationSvg.querySelectorAll(".node").forEach((nodeEl) => {
    const node = pathNodes.find((item) => item.id === nodeEl.dataset.nodeId);
    nodeEl.addEventListener("click", () => selectNode(node, model));
    nodeEl.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectNode(node, model);
      }
    });
  });
}

function selectNode(node, model) {
  state.selectedNode = node.id;
  renderSelected(node, model, true);
}

function renderSelected(node, model, showFloatingCard = true) {
  const selected = node || model.nodes.find((item) => item.id === state.selectedNode) || model.nodes[0];
  const description = selected.description || "A point in the current gematria field.";
  elements.selectedInsight.innerHTML = `
    <p class="node-kind">${selected.kind}</p>
    <div class="selected-word" dir="rtl">${selected.label}</div>
    <h2>${selected.title || selected.label}</h2>
    <p>${description}</p>
  `;
  elements.nodeCard.hidden = !showFloatingCard;
  if (!showFloatingCard) return;
  elements.nodeCard.hidden = false;
  elements.nodeCard.innerHTML = `
    <p class="node-kind">${selected.kind}</p>
    <h3>${selected.title || selected.label}</h3>
    <p>${description}</p>
  `;
}

function buildModel(word) {
  const cleanWord = resolveInput(word) || "ברכה";
  const letters = [...cleanWord].map((letter) => LETTERS[letter]).filter(Boolean);
  const value = gematria(cleanWord, state.system);
  const absoluteValue = gematria(cleanWord, "absolute");
  const milui = fillWord(cleanWord);
  const miluiRows = miluiBreakdown(cleanWord);
  const miluiTotal = miluiRows.reduce((sum, row) => sum + row.total, 0);
  const relations = relationMatches(cleanWord, absoluteValue);
  const matchTerms = [...new Set([cleanWord, estimateRoot(cleanWord), ...relations.slice(0, 3).map((item) => item.word)].filter(Boolean))];
  const results = verseMatches(cleanWord, matchTerms, absoluteValue);
  const transformations = [
    { id: "atbash", label: atbash(cleanWord), value: gematria(atbash(cleanWord), "absolute"), title: "Atbash mirror", description: "First and last letters trade places across the alphabet, revealing a mirror-text for comparison." },
    { id: "albam", label: albam(cleanWord), value: gematria(albam(cleanWord), "absolute"), title: "Albam exchange", description: "The alphabet splits into two halves, then each letter crosses to its partner." },
    { id: "milui", label: milui.slice(0, 5), value: gematria(milui, "absolute"), title: "Milui expansion", description: "Each letter is written out by name, placing the word under a stronger lens." },
  ];

  const nodes = [
    {
      id: "center",
      kind: "center",
      label: cleanWord,
      value,
      title: `${cleanWord} = ${value}`,
      description: `The active word in ${labelForSystem(state.system)} gematria. Absolute value: ${absoluteValue}. Milouï total: ${miluiTotal}.`,
    },
    ...letters.map((letter, index) => ({
      id: `letter-${index}`,
      kind: "letter",
      label: letter.glyph,
      value: valueForLetter(letter.glyph, state.system),
      title: `${letter.name} / ${letter.glyph}`,
      description: letter.meaning,
    })),
    ...relations.slice(0, 5).map((item, index) => ({
      id: `relation-${index}`,
      kind: "relation",
      label: item.word,
      value: item.value,
      title: item.translation,
      description: item.note,
    })),
    ...transformations.map((item) => ({
      ...item,
      kind: "transform",
    })),
    ...results.slice(0, 4).map((item, index) => ({
      id: `verse-${index}`,
      kind: "verse",
      label: item.ref.replace(" ", "\n"),
      value: item.kind,
      title: item.ref,
      description: item.english,
    })),
  ];

  return {
    word: cleanWord,
    value,
    absoluteValue,
    letters,
    atbash: atbash(cleanWord),
    albam: albam(cleanWord),
    milui,
    miluiRows,
    miluiTotal,
    relations,
    results,
    matchTerms,
    nodes,
  };
}

function buildPathNodes(model) {
  const gate = NUMBER_WORDS[model.miluiTotal] || numberToHebrewWord(model.miluiTotal);
  const source = model.results[0];
  return [
    {
      id: "path-word",
      kind: "center",
      label: model.word,
      value: model.absoluteValue,
      title: "Word",
      description: `${model.word} begins the path with absolute value ${model.absoluteValue}.`,
      x: 104,
      y: 260,
    },
    {
      id: "path-letters",
      kind: "letter",
      label: model.letters.map((item) => item.glyph).join(" · "),
      value: `${model.letters.length} letters`,
      title: "Letter anatomy",
      description: "Each letter keeps its own value and symbolic language.",
      x: 240,
      y: 180,
    },
    {
      id: "path-milui",
      kind: "transform",
      label: model.milui.slice(0, 7),
      value: model.miluiTotal,
      title: "Milouï",
      description: `${model.milui} totals ${model.miluiTotal}.`,
      x: 386,
      y: 260,
    },
    {
      id: "path-source",
      kind: "verse",
      label: source ? source.heRef : "מקור",
      value: source ? source.kind : "source",
      title: source ? source.ref : "Verified source",
      description: source ? `Sefaria source: ${source.sourceUrl}` : "No verified Tanakh source is displayed for this word yet.",
      x: 532,
      y: 180,
    },
    {
      id: "path-gate",
      kind: "relation",
      label: gate.word,
      value: gate.gloss || "letters",
      title: "Number as word",
      description: gate.note,
      x: 666,
      y: 260,
    },
  ];
}

function positionNodes(nodes) {
  const width = 760;
  const height = 520;
  const center = { x: width / 2, y: height / 2 };
  const rings = {
    letter: { radius: 128, start: -Math.PI / 2 + state.orbitShift },
    relation: { radius: 208, start: Math.PI / 9 + state.orbitShift * 0.6 },
    transform: { radius: 166, start: Math.PI + state.orbitShift * 0.4 },
    verse: { radius: 252, start: -Math.PI / 8 - state.orbitShift * 0.5 },
  };
  const byKind = nodes.reduce((acc, node) => {
    acc[node.kind] ||= [];
    acc[node.kind].push(node);
    return acc;
  }, {});

  return nodes.map((node) => {
    if (node.kind === "center") return { ...node, ...center };
    const group = byKind[node.kind];
    const index = group.indexOf(node);
    const ring = rings[node.kind] || rings.relation;
    const angle = ring.start + (Math.PI * 2 * index) / Math.max(group.length, 1);
    return {
      ...node,
      x: Math.round(center.x + Math.cos(angle) * ring.radius),
      y: Math.round(center.y + Math.sin(angle) * ring.radius * 0.72),
    };
  });
}

function relationMatches(word, value) {
  const exact = LEXICON.filter((item) => item.value === value);
  const nearby = LEXICON
    .filter((item) => item.value !== value)
    .map((item) => ({ ...item, distance: Math.abs(item.value - value), reducedMatch: reduceNumber(item.value) === reduceNumber(value) }))
    .sort((a, b) => Number(b.reducedMatch) - Number(a.reducedMatch) || a.distance - b.distance)
    .slice(0, 10);

  return [...exact, ...nearby]
    .filter((item, index, arr) => arr.findIndex((other) => other.word === item.word) === index)
    .map((item) => ({
      ...item,
      note: item.value === value ? `${item.note}; exact value match` : `${item.note}; ${Math.abs(item.value - value)} away${reduceNumber(item.value) === reduceNumber(value) ? ", same digit-root" : ""}`,
    }));
}

function verseMatches(word, terms, value) {
  const root = estimateRoot(word);
  const matched = VERSES.map((verseItem) => {
    const normalizedHebrew = normalizeHebrew(verseItem.hebrew);
    const hasTerm = terms.some((term) => term && (normalizedHebrew.includes(normalizeHebrew(term)) || verseItem.tags.includes(term)));
    const hasRoot = root && verseItem.tags.some((tag) => tag.includes(root) || root.includes(tag));
    return {
      ...verseItem,
      score: Number(hasTerm) * 3 + Number(hasRoot) * 2,
      valueLabel: "verified Sefaria source",
    };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return matched.slice(0, 12);
}

function resolveInput(raw) {
  const trimmed = String(raw || "").trim().toLowerCase();
  if (!trimmed) return "";
  if (/[\u0590-\u05ff]/.test(trimmed)) return cleanHebrewInput(trimmed);
  if (ENGLISH_TO_HEBREW[trimmed]) return ENGLISH_TO_HEBREW[trimmed];
  const phrase = trimmed.replace(/\s+/g, " ");
  if (ENGLISH_TO_HEBREW[phrase]) return ENGLISH_TO_HEBREW[phrase];
  const mappedWords = phrase.split(/[\s,.;:!?/]+/).map((word) => ENGLISH_TO_HEBREW[word]).filter(Boolean);
  return mappedWords.length ? mappedWords.join(" ") : "";
}

function cleanHebrewInput(value) {
  return hebrewWords(value).join(" ");
}

function hebrewWords(value) {
  const normalized = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[׳']/g, "")
    .replace(/[״"]/g, "");
  return normalized.match(/[א-תךםןףץ]+/g) || [];
}

function stripNonHebrew(value) {
  return hebrewWords(value).join("");
}

function gematria(word, system = "absolute") {
  const clean = stripNonHebrew(word);
  const letters = [...clean];
  if (system === "musafi") return gematria(clean, "absolute") + letters.length;
  if (system === "kolel") return gematria(clean, "absolute") + Math.max(1, hebrewWords(word).length);
  return letters.reduce((sum, letter) => sum + valueForLetter(letter, system), 0);
}

function valueForLetter(letter, system) {
  const info = LETTERS[letter];
  if (!info) return 0;
  if (system === "ordinal") return info.ordinal;
  if (system === "reduced") return info.reduced;
  if (system === "sofit" && info.sofit) return info.sofit;
  if (system === "perati") return info.absolute * info.absolute;
  return info.absolute;
}

function atbash(word) {
  const alphabet = HEBREW_ALPHABET;
  return [...stripNonHebrew(word)].map((letter) => {
    const base = FINAL_NORMALIZE[letter] || letter;
    const index = alphabet.indexOf(base);
    return index >= 0 ? alphabet[alphabet.length - 1 - index] : letter;
  }).join("");
}

function albam(word) {
  const first = HEBREW_ALPHABET.slice(0, 11);
  const second = HEBREW_ALPHABET.slice(11);
  const map = {};
  first.forEach((letter, index) => {
    map[letter] = second[index];
    map[second[index]] = letter;
  });
  return [...stripNonHebrew(word)].map((letter) => map[FINAL_NORMALIZE[letter] || letter] || letter).join("");
}

function fillWord(word) {
  return [...stripNonHebrew(word)].map((letter) => MILUI[FINAL_NORMALIZE[letter] || letter] || letter).join("");
}

function miluiBreakdown(word) {
  return [...stripNonHebrew(word)].map((letter) => {
    const base = FINAL_NORMALIZE[letter] || letter;
    const filled = MILUI[base] || letter;
    const values = [...filled].map((item) => valueForLetter(item, "absolute"));
    return {
      letter,
      filled,
      values,
      calculation: values.join(" + "),
      total: values.reduce((sum, item) => sum + item, 0),
    };
  });
}

function estimateRoot(word) {
  const normalized = [...stripNonHebrew(word)].map((letter) => FINAL_NORMALIZE[letter] || letter);
  const withoutMatres = normalized.filter((letter) => !["ו", "י", "ה", "א"].includes(letter));
  return (withoutMatres.length >= 2 ? withoutMatres : normalized).slice(0, 3).join("");
}

function reduceNumber(value) {
  if (!value) return 0;
  return ((Number(value) - 1) % 9) + 1;
}

function numberToHebrewWord(value) {
  const breakdown = numberToHebrewBreakdown(value);
  return {
    word: breakdown.map((item) => item.letter).join(""),
    note: "The total is shown as Hebrew letters. Add a curated language note only when a reliable lexical source has been attached.",
  };
}

function numberToHebrewBreakdown(value) {
  const pieces = [
    [400, "ת"], [300, "ש"], [200, "ר"], [100, "ק"],
    [90, "צ"], [80, "פ"], [70, "ע"], [60, "ס"], [50, "נ"], [40, "מ"], [30, "ל"], [20, "כ"], [10, "י"],
    [9, "ט"], [8, "ח"], [7, "ז"], [6, "ו"], [5, "ה"], [4, "ד"], [3, "ג"], [2, "ב"], [1, "א"],
  ];
  let remaining = Number(value);
  const out = [];
  for (const [pieceValue, letter] of pieces) {
    while (remaining >= pieceValue) {
      out.push({ value: pieceValue, letter });
      remaining -= pieceValue;
    }
  }
  return out;
}

function factorize(value) {
  let number = Number(value);
  const factors = [];
  for (let candidate = 2; candidate <= Math.sqrt(number); candidate += 1) {
    while (number % candidate === 0) {
      factors.push(candidate);
      number = number / candidate;
    }
  }
  if (number > 1 && number !== value) factors.push(number);
  return factors;
}

function labelForSystem(system) {
  return SYSTEMS.find((item) => item.id === system)?.label || system;
}

function entry(word, translation, note, tags = []) {
  return {
    word,
    translation,
    note,
    tags,
    value: gematria(word, "absolute"),
  };
}

function verse(ref, heRef, hebrew, english, tags, kind, sourceUrl, division) {
  return {
    ref,
    heRef,
    hebrew,
    english,
    tags,
    kind,
    sourceUrl,
    division,
    sourceLabel: "Sefaria: Hebrew Miqra according to the Masorah; English JPS TANAKH 2023",
  };
}

function highlightTerms(text, terms) {
  let output = escapeHtml(text);
  terms
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .forEach((term) => {
      const escaped = escapeHtml(term);
      output = output.replaceAll(escaped, `<mark>${escaped}</mark>`);
    });
  return output;
}

function normalizeHebrew(value) {
  return stripNonHebrew(String(value || "").normalize("NFKD").replace(/[\u0591-\u05C7]/g, ""));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
