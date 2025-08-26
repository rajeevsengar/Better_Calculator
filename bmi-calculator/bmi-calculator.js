"use strict";

let heightModeButtons, weightUnitButtons, genderButtons;
let heightValInput, weightValInput, ageValInput;
let selectedHeightUnit, selectedWeightUnit, selectedGender;
let previousheightUnit, previoudWeightUnit;
let bmiResultLargeDiv, bmiCategoryDiv, bmiAdditionalInfoDiv, bmiFactsSectionDiv;
let bmiSpeedometerCanvas, speedometerLegendDiv;

window.BMICalculator = window.BMICalculator || {};
window.BMICalculator.initializeBMICalculator = initializeBMICalculator;

// Gender options
const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];

function setDefaults(){
  weightValInput = document.getElementById("weightVal");
  weightUnitButtons = document.getElementById("weightUnitButtons");
  heightValInput = document.getElementById("heightVal");
  heightModeButtons = document.getElementById("heightModeButtons");
  ageValInput = document.getElementById("ageVal");
  genderButtons = document.getElementById("genderButtons");
  bmiResultLargeDiv = document.getElementById("bmiResultLarge");
  bmiCategoryDiv = document.getElementById("bmiCategory");
  bmiAdditionalInfoDiv = document.getElementById("bmiAdditionalInfo");
  bmiFactsSectionDiv = document.getElementById("bmiFactsSection");
  bmiSpeedometerCanvas = document.getElementById("bmiSpeedometer");
  speedometerLegendDiv = document.getElementById("speedometerLegend");

  // Deafult Units
  selectedWeightUnit = CONST_KG;
  previoudWeightUnit = selectedWeightUnit;
  selectedHeightUnit = CONST_FTIN;
  previousheightUnit = selectedHeightUnit;
  selectedGender = "male";

  // Default values
  if (weightValInput) weightValInput.value = 70;
  if (heightValInput) heightValInput.value = "5\'10\"";
  if (ageValInput) ageValInput.value = 25;
}

function initializeBMICalculator() {
  setDefaults();
  
  // Build gender chips
  buildGenderChips();
  
  // Build weight unit chips
  buildUnitChips(weightUnitButtons, UNIT_KEYS["mass2"], selectedWeightUnit, unit => {
    selectedWeightUnit = unit;
    updateChipSelection(weightUnitButtons, selectedWeightUnit);
    weightUnitChangeHandler(weightValInput, selectedWeightUnit);
  });

  // Build height unit chips
  buildUnitChips(heightModeButtons, UNIT_KEYS["height"], selectedHeightUnit, unit => {
    selectedHeightUnit = unit;
    updateChipSelection(heightModeButtons, selectedHeightUnit);
    heightUnitChangeHandler(heightValInput, selectedHeightUnit);
  });

  // Auto-format ft+in input
  heightValInput.addEventListener("input", () => {
    formatFtInField(selectedHeightUnit, heightValInput)
  });

  // Initialize speedometer
  updateSpeedometer(0);
  
  // Calculate BMI with default values immediately
  setTimeout(() => {
    computeBMI();
  }, 100);
}

function buildGenderChips() {
  genderButtons.innerHTML = "";
  GENDER_OPTIONS.forEach(({ value, label }) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.dataset.value = value;
    btn.className = "chip" + (value === selectedGender ? " selected" : "");
    btn.setAttribute("aria-pressed", value === selectedGender ? "true" : "false");
    btn.onclick = () => {
      selectedGender = value;
      updateChipSelection(genderButtons, selectedGender);
    };
    genderButtons.appendChild(btn);
  });
}

function heightUnitChangeHandler(heightValInput, selectedHeightUnit){
  // do conversion
  heightValInput.value = convertUnit(heightValInput.value, 'height', previousheightUnit, selectedHeightUnit);
  previousheightUnit = selectedHeightUnit;
}

function weightUnitChangeHandler(weightValInput, selectedWeightUnit){
  // do conversion
  weightValInput.value = convertUnit(weightValInput.value , 'mass', previoudWeightUnit, selectedWeightUnit);
  previoudWeightUnit = selectedWeightUnit;
}

function computeBMI() {
  let w = parseFloat(weightValInput.value);
  let age = parseInt(ageValInput.value);

  if (isNaN(w)) { alert("Please enter weight"); return; }
  if (isNaN(age) || age < 0) { alert("Please enter a valid age"); return; }
  if (!selectedGender) { alert("Please select gender"); return; }
  
  if (selectedWeightUnit === CONST_LB) w *= 0.45359237;

  let hM = 0;
  let raw = heightValInput.value.trim();

  if (selectedHeightUnit === CONST_M) {
    hM = parseFloat(raw);
  } else if (selectedHeightUnit === CONST_CM) {
    hM = parseFloat(raw) / 100;
  } else if (selectedHeightUnit === CONST_IN) {
    hM = parseFloat(raw) * 0.0254;
  } else if (selectedHeightUnit === CONST_FTIN) {
    let inch = getInchesFromFtIn(raw);
    hM = inch * 0.0254;
  }
  if (!hM || hM <= 0) { alert("Please enter height"); return; }

  let bmi = w / (hM * hM);
  let category = getBMICategory(bmi, age, selectedGender);
  
  bmiResultLargeDiv.textContent = bmi.toFixed(2);
  bmiCategoryDiv.textContent = category;
  
  // Show additional info
  showAdditionalBMIInfo(bmi, hM, age, selectedGender);
  
  // Show BMI facts
  showBMIFacts(bmi, age, selectedGender, category);
  
  // Update speedometer
  updateSpeedometer(bmi);
  
  // Show legend
  speedometerLegendDiv.style.display = "block";
}

function getBMICategory(bmi, age, gender) {
  // Age and gender-specific BMI categories
  if (age < 18) {
    // For children and teens, use different ranges based on age and gender
    if (gender === "male") {
      if (age < 5) {
        if (bmi < 14) return "Underweight";
        if (bmi < 17) return "Normal";
        if (bmi < 19) return "Overweight";
        return "Obese";
      } else if (age < 10) {
        if (bmi < 15) return "Underweight";
        if (bmi < 18) return "Normal";
        if (bmi < 20) return "Overweight";
        return "Obese";
      } else {
        if (bmi < 16) return "Underweight";
        if (bmi < 22) return "Normal";
        if (bmi < 25) return "Overweight";
        return "Obese";
      }
    } else {
      // Female children
      if (age < 5) {
        if (bmi < 13) return "Underweight";
        if (bmi < 16) return "Normal";
        if (bmi < 18) return "Overweight";
        return "Obese";
      } else if (age < 10) {
        if (bmi < 14) return "Underweight";
        if (bmi < 17) return "Normal";
        if (bmi < 19) return "Overweight";
        return "Obese";
      } else {
        if (bmi < 15) return "Underweight";
        if (bmi < 21) return "Normal";
        if (bmi < 24) return "Overweight";
        return "Obese";
      }
    }
  } else {
    // Adult ranges (18+ years)
    if (gender === "male") {
      if (bmi < 18.5) return "Underweight";
      if (bmi < 25) return "Normal";
      if (bmi < 30) return "Overweight";
      return "Obese";
    } else {
      // Female adults may have slightly different ranges
      if (bmi < 18.5) return "Underweight";
      if (bmi < 24) return "Normal";
      if (bmi < 29) return "Overweight";
      return "Obese";
    }
  }
}

function showAdditionalBMIInfo(bmi, heightM, age, gender) {
  bmiAdditionalInfoDiv.style.display = "block";
  
  // Age and gender-specific healthy BMI ranges
  let healthyBmiRange, minBmi, maxBmi;
  
  if (age < 18) {
    // Children and teens have different healthy ranges
    if (gender === "male") {
      if (age < 5) {
        minBmi = 14; maxBmi = 17;
      } else if (age < 10) {
        minBmi = 15; maxBmi = 18;
      } else {
        minBmi = 16; maxBmi = 22;
      }
    } else {
      // Female children
      if (age < 5) {
        minBmi = 13; maxBmi = 16;
      } else if (age < 10) {
        minBmi = 14; maxBmi = 17;
      } else {
        minBmi = 15; maxBmi = 21;
      }
    }
  } else {
    // Adult ranges
    if (gender === "male") {
      minBmi = 18.5; maxBmi = 25;
    } else {
      minBmi = 18.5; maxBmi = 24;
    }
  }
  
  healthyBmiRange = `${minBmi} - ${maxBmi}`;
  document.getElementById("healthyBmiRange").textContent = healthyBmiRange;
  
  // Healthy weight range for height based on age/gender-specific BMI
  let minWeight = minBmi * heightM * heightM;
  let maxWeight = maxBmi * heightM * heightM;
  
  let weightUnit = selectedWeightUnit === CONST_LB ? "lbs" : "kg";
  if (selectedWeightUnit === CONST_LB) {
    minWeight *= 2.20462;
    maxWeight *= 2.20462;
  }
  
  document.getElementById("healthyWeightRange").textContent = 
    `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} ${weightUnit}`;
}

function showBMIFacts(bmi, age, gender, category) {
  bmiFactsSectionDiv.style.display = "block";
  
  // Get relevant facts from the config
  const facts = getBMIFacts(bmi, age, gender, category);
  
  // Display 2-3 most relevant facts
  const displayFacts = facts.slice(0, 3);
  
  const factsHTML = displayFacts.map(fact => 
    `<div style="margin-bottom: 8px; padding-left: 8px; border-left: 2px solid var(--accent-color);">• ${fact}</div>`
  ).join('');
  
  document.getElementById("bmiFactsContent").innerHTML = factsHTML;
}

function updateSpeedometer(bmi) {
  const canvas = bmiSpeedometerCanvas;
  const ctx = canvas.getContext("2d");

  // Keep canvas size same as CSS (no resizing)
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  const centerX = width / 2;
  const centerY = height - 20;
  const radius = Math.min(width / 2 - 10, height - 60);

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw background arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 0);
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 20;
  ctx.shadowColor = "rgba(0,0,0,0.1)";
  ctx.shadowBlur = 4;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // BMI ranges
  const ranges = [
    { min: 0, max: 18.5, color: "#4CAF50" },
    { min: 18.5, max: 25, color: "#2196F3" },
    { min: 25, max: 30, color: "#FF9800" },
    { min: 30, max: 50, color: "#F44336" }
  ];

  // Colored segments
  ranges.forEach(range => {
    const startAngle = Math.PI + (range.min / 50) * Math.PI;
    const endAngle = Math.PI + (range.max / 50) * Math.PI;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = range.color;
    ctx.lineWidth = 20;
    ctx.lineCap = "round";
    ctx.stroke();
  });

  // Tick marks
  for (let i = 0; i <= 50; i += 5) {
    const angle = Math.PI + (i / 50) * Math.PI;
    const inner = radius - 10;
    const outer = radius;
    ctx.beginPath();
    ctx.moveTo(centerX + inner * Math.cos(angle), centerY + inner * Math.sin(angle));
    ctx.lineTo(centerX + outer * Math.cos(angle), centerY + outer * Math.sin(angle));
    ctx.strokeStyle = "#333";
    ctx.lineWidth = i % 10 === 0 ? 2 : 1;
    ctx.stroke();
  }

  // Needle
  if (bmi > 0) {
    const needleAngle = Math.PI + (Math.min(bmi, 50) / 50) * Math.PI;
    const needleLength = radius - 15;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + needleLength * Math.cos(needleAngle),
      centerY + needleLength * Math.sin(needleAngle)
    );
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 4;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Needle center
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.strokeStyle = "#555";
    ctx.stroke();
  }

  // BMI label
  drawBMIText(ctx, bmi, centerX, centerY, radius);
}

function drawBMIText(ctx, bmi, centerX, centerY, radius) {
  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue("--text-primary").trim();

  ctx.font = "16px Arial";
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.fillText(`BMI: ${bmi.toFixed(1)}`, centerX, centerY - radius - 20);
}

// Function to redraw speedometer when theme changes
function redrawSpeedometerForTheme() {
  // Only redraw if BMI panel is active
  if (document.getElementById('bmi')?.classList.contains('active-section')) {
    // Get current BMI value from the result display
    const bmiResult = document.getElementById('bmiResultLarge');
    if (bmiResult && bmiResult.textContent !== '—') {
      const currentBMI = parseFloat(bmiResult.textContent);
      if (!isNaN(currentBMI)) {
        updateSpeedometer(currentBMI);
      } else {
        // If no valid BMI, redraw with 0 to update colors
        updateSpeedometer(0);
      }
    } else {
      // If no BMI result, redraw with 0 to update colors
      updateSpeedometer(0);
    }
  }
}

// Expose the function globally so theme switcher can call it
window.redrawSpeedometerForTheme = redrawSpeedometerForTheme;


function bmiReset() {
  if (weightValInput) weightValInput.value = "";
  if (heightValInput) heightValInput.value = "";
  if (ageValInput) ageValInput.value = 25;
  if (bmiResultLargeDiv) bmiResultLargeDiv.textContent = "—";
  if (bmiCategoryDiv) bmiCategoryDiv.textContent = "";
  if (bmiAdditionalInfoDiv) bmiAdditionalInfoDiv.style.display = "none";
  if (bmiFactsSectionDiv) bmiFactsSectionDiv.style.display = "none";
  if (speedometerLegendDiv) speedometerLegendDiv.style.display = "none";
  
  // Reset gender selection
  selectedGender = "male";
  updateChipSelection(genderButtons, selectedGender);
  
  // Reset speedometer
  updateSpeedometer(0);
}

window.computeBMI = computeBMI;
window.bmiReset = bmiReset;
