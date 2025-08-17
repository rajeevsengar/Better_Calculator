"use strict";
/**
 * Build chip-style buttons for a given unit list
 */
function buildUnitChips(container, units, selected, onClick) {
  container.innerHTML = "";
  units.forEach(({ value, label }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.dataset.value = value;
    btn.className = "chip" + (value === selected ? " selected" : "");
    btn.setAttribute("aria-pressed", value === selected ? "true" : "false");
    btn.onclick = () => onClick(value);
    container.appendChild(btn);
  });
}

/**
 * Update the chip button styles to show which one is selected
 */
function updateChipSelection(container, selectedKey) {
  Array.from(container.children).forEach((btn) => {
    const isSelected = btn.dataset.value === selectedKey;
    btn.classList.toggle("selected", isSelected);
    btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
}

function formatFtInField(selectedUnit, inputValue) {
  if (selectedUnit === CONST_FTIN) {
    let raw = inputValue.value.replace(/[^0-9]/g, ""); // digits only
    let formatted = "";

    if (raw.length === 0) {
      formatted = "";
    }
    if (raw.length === 1) {
      formatted = raw + "'";
    }
    if (raw.length === 2) {
      formatted = raw[0] + "'" + raw[1];
    }
    if (raw.length >= 3) {
      let ft = Number(raw[0]);
      let inches = Number(raw.slice(1, 3));
      ft = ft + Math.floor(inches / 12);
      inches = inches % 12;
      formatted = ft + "'" + inches + '"';
    }

    inputValue.value = formatted;
  }
}

function getInchesFromFtIn(value) {
  const match = value.match(/^(\d*)'?(\d*)"?$/);

  let ft = match && match[1] ? parseInt(match[1], 10) : 0;
  let inch = match && match[2] ? parseInt(match[2], 10) : 0;

  if (inch > 11) inch = 11;
  if (inch < 0) inch = 0;

  return ft * 12 + inch;
}

function getFtInFromInches(value) {
  let ft = Math.floor(value / 12);
  value = value % 12;
  const formatted = ft + "'" + value.toFixed(0) + '"';
  return formatted;
}

function convertUnit(valueToConvert, mode, fromUnit, toUnit) {
  if (!(fromUnit && toUnit)) {
    return;
  }

  valueToConvert =
    mode === "height" && fromUnit == CONST_FTIN
      ? getInchesFromFtIn(valueToConvert.trim())
      : parseFloat(valueToConvert);

  if (isNaN(valueToConvert)) {
    return "";
  }

  let result;
  if (mode === "temperature") {
    result = TEMP_FROM_C[toUnit](TEMP_TO_C[fromUnit](valueToConvert));
  } else if (mode === "height" && toUnit === CONST_FTIN) {
    let inches = (valueToConvert * CONVERSION_FACTORS[fromUnit]) / CONVERSION_FACTORS[CONST_IN];
    result = getFtInFromInches(inches);
  } else if(mode === "height" && fromUnit === CONST_FTIN){
    result = (valueToConvert * CONVERSION_FACTORS[CONST_IN]) / CONVERSION_FACTORS[toUnit];
  }else {
    result = (valueToConvert * CONVERSION_FACTORS[fromUnit]) / CONVERSION_FACTORS[toUnit];
  }

  if (toUnit == CONST_FTIN) {
    return result;
  } else {
    return Number.isFinite(result) ? String(parseFloat(result.toFixed(4))) : "";
  }
}
