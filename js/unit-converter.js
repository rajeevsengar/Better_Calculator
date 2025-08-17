"use strict";

/* ============================================================
   DOM Elements
   ============================================================ */
let fromValueInput, toValueInput;
let fromButtonsContainer, toButtonsContainer;
let heightToFeet, heightToInches, heightToComposite;

/* ============================================================
   State
   ============================================================ */
let selectedFromUnit = null;
let selectedToUnit = null;
let currentMode = null;

window.UnitConverter = window.UnitConverter || {};
window.UnitConverter.initializeUnitConverter = initializeUnitConverter;

/* ============================================================
   Initialization
   ============================================================ */
function initializeUnitConverter() {
  fromValueInput = document.getElementById("fromValue");
  toValueInput = document.getElementById("toValue");
  fromButtonsContainer = document.getElementById("fromUnitButtons");
  toButtonsContainer = document.getElementById("toUnitButtons");
  heightToFeet = document.getElementById("heightToFeet");
  heightToInches = document.getElementById("heightToInches");
  heightToComposite = document.getElementById("heightToComposite");

  if (MODES.length > 0) {
    currentMode = MODES[0].value;
  }

  // Populate modes list only
  populateModeList();

  // Event bindings
  if (fromValueInput) {
    fromValueInput.addEventListener("input", inputFieldHandler);
    fromValueInput.addEventListener("input", () => formatFtInField(selectedFromUnit, fromValueInput));
    fromValueInput.addEventListener("input", tryConvert);
  }

  setupForMode();
}

/* ============================================================
   Utility Functions
   ============================================================ */
   function populateModeList() {
    const listEl = document.getElementById("modesList");
    if (!listEl) return;
  
    listEl.innerHTML = "";
    MODES.forEach(mode => {
      const li = document.createElement("li");
      li.textContent = mode.label;
      li.setAttribute("data-value", mode.value);
      li.style.cursor = "pointer";
  
      // Highlight if it's the current mode
      if (mode.value === currentMode) {
        li.classList.add("active-mode");
      }
  
      li.addEventListener("click", () => {
        currentMode = mode.value;
        listEl.querySelectorAll("li").forEach(el => el.classList.remove("active-mode"));
        li.classList.add("active-mode");
  
        setupForMode();
        unitChangeHandler(fromValueInput, selectedFromUnit);
        tryConvert();
      });
  
      listEl.appendChild(li);
    });
  }
  

/* ============================================================
   UI Setup
   ============================================================ */
function setupForMode() {
  if (!currentMode) return;
  [selectedFromUnit, selectedToUnit] = defaultUnits_UnitConverter[currentMode];

  buildUnitChips(fromButtonsContainer, UNIT_KEYS[currentMode], selectedFromUnit, unit => {
    selectedFromUnit = unit;
    unitChangeHandler(fromValueInput, selectedFromUnit);
    renderSelections();
    tryConvert();
  });

  buildUnitChips(toButtonsContainer, UNIT_KEYS[currentMode].filter(u => u.value !== selectedFromUnit), selectedToUnit, unit => {
    selectedToUnit = unit;
    renderSelections();
    tryConvert();
  });
}

// Event Handlers
function unitChangeHandler(inputField, selectedUnit) {
  let inputValue = inputField.value;
  if (selectedUnit != CONST_FTIN && inputValue) {
    if (inputValue.includes("'")) {
      inputField.value = inputValue.slice(0, inputValue.indexOf("'"));
    }
  } else if (inputValue) {
    formatFtInField(CONST_FTIN, inputField);
  }
}

function inputFieldHandler() {
  if (selectedFromUnit != CONST_FTIN) {
    fromValueInput.value = fromValueInput.value
      .replace(/[^0-9.]/g, "") // remove non-numeric
      .replace(/(\..*?)\./g, "$1"); // keep only first dot
  }
}

function renderSelections() {
  if (!currentMode) return;

  updateChipSelection(fromButtonsContainer, selectedFromUnit);

  buildUnitChips(
    toButtonsContainer,
    UNIT_KEYS[currentMode].filter(u => u.value !== selectedFromUnit),
    selectedToUnit,
    unit => { selectedToUnit = unit; renderSelections(); tryConvert(); }
  );
}

/* ============================================================
   Conversion Logic
   ============================================================ */
function tryConvert() {
  if (!currentMode) return;
  toValueInput.value = convertUnit(fromValueInput.value, currentMode, selectedFromUnit, selectedToUnit);
}

/* ============================================================
   Actions
   ============================================================ */
window.swapUnits = function() {
  if (!selectedFromUnit || !selectedToUnit) return;
  [selectedFromUnit, selectedToUnit] = [selectedToUnit, selectedFromUnit];
  [fromValueInput.value, toValueInput.value] = [toValueInput.value, fromValueInput.value];
  renderSelections();
  tryConvert();
};
