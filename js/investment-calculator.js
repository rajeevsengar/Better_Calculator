// Investment Calculator - Main Script
"use strict";

let sipAmountInput, sipReturnInput, sipYearsInput, sipMonthsInput;
let lumpSumAmountInput, lumpSumReturnInput, lumpSumYearsInput, lumpSumMonthsInput;
let sipResultsDiv, lumpSumResultsDiv;

// Create global namespace
window.Investment = window.Investment || {};

function initializeInvestmentCalculator() {
  // SIP Calculator elements
  sipAmountInput = document.getElementById("sipAmount");
  sipReturnInput = document.getElementById("sipReturn");
  sipYearsInput = document.getElementById("sipYears");
  sipMonthsInput = document.getElementById("sipMonths");
  sipResultsDiv = document.getElementById("sipResults");
  
  // Lump Sum Calculator elements
  lumpSumAmountInput = document.getElementById("lumpSumAmount");
  lumpSumReturnInput = document.getElementById("lumpSumReturn");
  lumpSumYearsInput = document.getElementById("lumpSumYears");
  lumpSumMonthsInput = document.getElementById("lumpSumMonths");
  lumpSumResultsDiv = document.getElementById("lumpSumResults");
  
  // Add event listeners
  const calculateSIPBtn = document.getElementById("calculateSIPBtn");
  if (calculateSIPBtn) {
    calculateSIPBtn.addEventListener("click", calculateSIP);
  }
  
  const calculateLumpSumBtn = document.getElementById("calculateLumpSumBtn");
  if (calculateLumpSumBtn) {
    calculateLumpSumBtn.addEventListener("click", calculateLumpSum);
  }

  // Set Deafults
  sipAmountInput.value = 5000;
  sipReturnInput.value = 12;
  sipYearsInput.value = 3;
  lumpSumAmountInput.value = 500000;
  lumpSumReturnInput.value = 12;
  lumpSumYearsInput.value = 5;
  
  // Add input event listeners for real-time validation
  if (sipAmountInput) sipAmountInput.addEventListener("input", validateSIPInputs);
  if (sipReturnInput) sipReturnInput.addEventListener("input", validateSIPInputs);
  if (sipYearsInput) sipYearsInput.addEventListener("input", validateSIPInputs);
  if (sipMonthsInput) sipMonthsInput.addEventListener("input", validateSIPInputs);
  
  if (lumpSumAmountInput) lumpSumAmountInput.addEventListener("input", validateLumpSumInputs);
  if (lumpSumReturnInput) lumpSumReturnInput.addEventListener("input", validateLumpSumInputs);
  if (lumpSumYearsInput) lumpSumYearsInput.addEventListener("input", validateLumpSumInputs);
  if (lumpSumMonthsInput) lumpSumMonthsInput.addEventListener("input", validateLumpSumInputs);
}

window.Investment.initializeInvestmentCalculator = initializeInvestmentCalculator;

function validateSIPInputs() {
  const amount = parseFloatSafely(sipAmountInput?.value);
  const rate = parseFloatSafely(sipReturnInput?.value);
  const years = parseIntSafely(sipYearsInput?.value);
  const months = parseIntSafely(sipMonthsInput?.value);
  
  const totalMonths = years * 12 + months;
  const isValid = amount > 0 && rate > 0 && totalMonths > 0 && totalMonths <= 600; // up to 50 years
  
  const calculateBtn = document.getElementById("calculateSIPBtn");
  if (calculateBtn) {
    calculateBtn.disabled = !isValid;
    calculateBtn.style.opacity = isValid ? "1" : "0.6";
  }
  return isValid;
}

function validateLumpSumInputs() {
  const amount = parseFloatSafely(lumpSumAmountInput?.value);
  const rate = parseFloatSafely(lumpSumReturnInput?.value);
  const years = parseIntSafely(lumpSumYearsInput?.value);
  const months = parseIntSafely(lumpSumMonthsInput?.value);
  
  const totalMonths = years * 12 + months;
  const isValid = amount > 0 && rate > 0 && totalMonths > 0 && totalMonths <= 600; // up to 50 years
  
  const calculateBtn = document.getElementById("calculateLumpSumBtn");
  if (calculateBtn) {
    calculateBtn.disabled = !isValid;
    calculateBtn.style.opacity = isValid ? "1" : "0.6";
  }
  return isValid;
}

function calculateSIP() {
  const monthlyAmount = parseFloatSafely(sipAmountInput.value);
  const annualRate = parseFloatSafely(sipReturnInput.value);
  const years = parseIntSafely(sipYearsInput.value);
  const months = parseIntSafely(sipMonthsInput.value);
  
  if (!validateSIPInputs()) {
    alert("Please enter valid values for all fields.");
    return;
  }
  
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = years * 12 + months;
  
  // Calculate SIP using the formula: FV = P × (((1 + r)^n - 1) / r) × (1 + r)
  const futureValue = monthlyAmount * 
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
    (1 + monthlyRate);
  
  const totalInvestment = monthlyAmount * totalMonths;
  const totalReturns = futureValue - totalInvestment;
  
  // Display results
  document.getElementById("totalInvestment").textContent = formatCurrency(totalInvestment);
  document.getElementById("totalReturns").textContent = formatCurrency(totalReturns);
  document.getElementById("maturityAmount").textContent = formatCurrency(futureValue);
  
  // Generate breakdown up to number of years (include partial year)
  generateSIPBreakdown(monthlyAmount, annualRate, totalMonths);
  
  sipResultsDiv.style.display = "block";
}

function generateSIPBreakdown(monthlyAmount, annualRate, totalMonths) {
  const tableBody = document.querySelector("#sipTable tbody");
  tableBody.innerHTML = "";
  
  const monthlyRate = annualRate / 12 / 100;
  const totalYears = Math.ceil(totalMonths / 12);
  
  for (let year = 1; year <= totalYears; year++) {
    const monthsUpTo = Math.min(year * 12, totalMonths);
    const futureValue = monthlyAmount * 
      ((Math.pow(1 + monthlyRate, monthsUpTo) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    const totalInvestment = monthlyAmount * monthsUpTo;
    const returns = futureValue - totalInvestment;
    
    const row = document.createElement("tr");
    row.appendChild(createTableCell(year));
    row.appendChild(createTableCell(formatCurrency(totalInvestment)));
    row.appendChild(createTableCell(formatCurrency(returns)));
    row.appendChild(createTableCell(formatCurrency(futureValue)));
    
    tableBody.appendChild(row);
  }
}

function calculateLumpSum() {
  const initialAmount = parseFloatSafely(lumpSumAmountInput.value);
  const annualRate = parseFloatSafely(lumpSumReturnInput.value);
  const years = parseIntSafely(lumpSumYearsInput.value);
  const months = parseIntSafely(lumpSumMonthsInput.value);
  
  if (!validateLumpSumInputs()) {
    alert("Please enter valid values for all fields.");
    return;
  }
  
  // Annual compounding for years, monthly compounding for the remaining months
  const finalAmount = initialAmount 
    * Math.pow(1 + annualRate / 100, years)
    * Math.pow(1 + annualRate / 1200, months);
  const totalReturns = finalAmount - initialAmount;
  
  // Display results
  document.getElementById("initialInvestment").textContent = formatCurrency(initialAmount);
  document.getElementById("lumpSumTotalReturns").textContent = formatCurrency(totalReturns);
  document.getElementById("finalAmount").textContent = formatCurrency(finalAmount);
  
  lumpSumResultsDiv.style.display = "block";
}

function clearSIP() {
  if (sipAmountInput) sipAmountInput.value = "";
  if (sipReturnInput) sipReturnInput.value = "";
  if (sipYearsInput) sipYearsInput.value = "";
  if (sipMonthsInput) sipMonthsInput.value = "";
  if (sipResultsDiv) sipResultsDiv.style.display = "none";
  
  // Reset button state
  const calculateBtn = document.getElementById("calculateSIPBtn");
  if (calculateBtn) {
    calculateBtn.disabled = true;
    calculateBtn.style.opacity = "0.6";
  }
}

function clearLumpSum() {
  if (lumpSumAmountInput) lumpSumAmountInput.value = "";
  if (lumpSumReturnInput) lumpSumReturnInput.value = "";
  if (lumpSumYearsInput) lumpSumYearsInput.value = "";
  if (lumpSumMonthsInput) lumpSumMonthsInput.value = "";
  if (lumpSumResultsDiv) lumpSumResultsDiv.style.display = "none";
  
  // Reset button state
  const calculateBtn = document.getElementById("calculateLumpSumBtn");
  if (calculateBtn) {
    calculateBtn.disabled = true;
    calculateBtn.style.opacity = "0.6";
  }
}

// Utility functions
function parseFloatSafely(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

function parseIntSafely(value) {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function createTableCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// Expose functions globally for HTML onclick handlers
window.clearSIP = clearSIP;
window.clearLumpSum = clearLumpSum; 