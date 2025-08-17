// EMI Calculator - Main Script
"use strict";

// =============================================================================
// GLOBAL STATE & NAMESPACE
// =============================================================================
// Create global namespace
window.EMI = window.EMI || {};

// Toggle this to true while developing to see internal logs
const DEBUG = false;
function logDebug(...args) {
  if (DEBUG) console.log(...args);
}

// =============================================================================
// DOM ELEMENT REFERENCES
// =============================================================================
let loanAmountInput, interestRateInput, loanTenureInput, amortizationTableBody, pieChartInstance;

// =============================================================================
// INITIALIZATION
// =============================================================================
/**
 * Initialize EMI calculator elements and event listeners
 */
function initializeEMICalculator() {
  // Get DOM elements
  loanAmountInput = document.getElementById("emiAmt");
  interestRateInput = document.getElementById("emiRate");
  loanTenureInput = document.getElementById("emiMonths");
  amortizationTableBody = document.querySelector("#amortTable tbody");
  
  // Initialize pie chart
  pieChartInstance = null;
  
  // Add event listeners if they exist
  const calculateButton = document.getElementById("calculateBtn");
  if (calculateButton) {
    calculateButton.addEventListener("click", generateAmortizationSchedule);
  }

  // Add event listeners to input fields to clear table when they change
  if (loanAmountInput) loanAmountInput.addEventListener("input", clearTableOnInputChange);
  if (interestRateInput) interestRateInput.addEventListener("input", clearTableOnInputChange);
  if (loanTenureInput) loanTenureInput.addEventListener("input", clearTableOnInputChange);
}
window.EMI.initializeEMICalculator = initializeEMICalculator;

function clearTableOnInputChange() {
  // Clear the table when basic inputs change
  if (amortizationTableBody) amortizationTableBody.innerHTML = "";
  updatePieChart([]);
}

// =============================================================================
// UTILITY HELPERS
// =============================================================================
function parseFloatSafely(value) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function parseIntSafely(value) {
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function getCurrentRecalculationMode() {
  const radios = document.getElementsByName("recalcMode");
  for (const radio of radios) {
    if (radio.checked) return radio.value;
  }
  return "emi"; // default mode
}

function convertAnnualToMonthlyRate(annualRate) {
  return annualRate / 12 / 100;
}

/**
 * Compute Equal Monthly Installment (EMI)
 * @param {number} principalAmount - outstanding principal
 * @param {number} monthlyInterestRate - monthly rate as a decimal (e.g., 0.01 for 1%)
 * @param {number} numberOfMonths - remaining months
 * @returns {number} EMI amount
 */
function calculateEMI(principalAmount, monthlyInterestRate, numberOfMonths) {
  if (monthlyInterestRate === 0) return principalAmount / numberOfMonths;
  const factor = Math.pow(1 + monthlyInterestRate, numberOfMonths);
  return (principalAmount * monthlyInterestRate * factor) / (factor - 1);
}

// =============================================================================
// INPUT VALIDATION
// =============================================================================
function validateLoanInputs(loanAmount, loanTenure) {
  if (loanAmount <= 0 || loanTenure <= 0) {
    alert("Please enter valid loan amount and tenure.");
    return false;
  }
  return true;
}

// =============================================================================
// USER EVENTS PARSING (from editable table)
// =============================================================================
function parseUserEventsFromTable(loanTenure) {
  const userEvents = [];
  const tableRows = amortizationTableBody.querySelectorAll("tr");

  if (tableRows.length === 0) {
    for (let month = 1; month <= loanTenure; month++) {
      userEvents[month] = { 
        prepaymentAmount: 0, 
        topupAmount: 0, 
        newInterestRate: null 
      };
    }
    return userEvents;
  }

  let lastInterestRate = null;
  for (let rowIndex = 0; rowIndex < tableRows.length; rowIndex++) {
    const tableCells = tableRows[rowIndex].querySelectorAll("td");
    const currentMonth = rowIndex + 1;

    // Check if there's a new interest rate in this row
    const newRate = parseFloatSafely(tableCells[6].textContent.trim());
    if (newRate > 0) lastInterestRate = newRate;

    userEvents[currentMonth] = {
      prepaymentAmount: Math.max(0, parseFloatSafely(tableCells[4].textContent.trim())),
      topupAmount: Math.max(0, parseFloatSafely(tableCells[5].textContent.trim())),
      newInterestRate: lastInterestRate, // Use the last known rate for this month
    };
  }
  return userEvents;
}

// =============================================================================
// RECALCULATION HELPERS
// =============================================================================
/**
 * Compute new tenure when EMI is kept constant
 */
function calculateNewTenure(principalAmount, emiAmount, monthlyInterestRate) {
  if (monthlyInterestRate === 0) return 0;
  if (emiAmount <= principalAmount * monthlyInterestRate) return 0;
  return Math.ceil(
    Math.log(emiAmount / (emiAmount - principalAmount * monthlyInterestRate)) /
    Math.log(1 + monthlyInterestRate)
  );
}

function recalculateEMI(principalAmount, annualInterestRate, numberOfMonths) {
  return calculateEMI(
    principalAmount,
    convertAnnualToMonthlyRate(annualInterestRate),
    numberOfMonths
  );
}

// =============================================================================
// EVENT APPLICATION (prepayment/top-up)
// =============================================================================
/**
 * Apply a prepayment and recalculate EMI or tenure based on the selected mode.
 */
function applyPrepaymentEvent(
  currentPrincipal,
  currentEMI,
  monthlyInterestAmount,
  prepaymentAmount,
  currentAnnualInterestRate,
  recalculationMode,
  remainingMonths
) {
  let principalRepaidThisMonth = currentEMI - monthlyInterestAmount;
  if (principalRepaidThisMonth < 0) principalRepaidThisMonth = 0;

  // Apply prepayment to reduce principal
  let newPrincipalBalance = Math.max(0, currentPrincipal - principalRepaidThisMonth - prepaymentAmount);

  let updatedEMI = currentEMI;
  let updatedTenure = remainingMonths;

  if (recalculationMode === "emi") {
    // Recalculate EMI for remaining months
    updatedEMI = calculateEMI(
      newPrincipalBalance,
      convertAnnualToMonthlyRate(currentAnnualInterestRate),
      remainingMonths
    );
  } else {
    // Recalculate tenure with same EMI
    updatedTenure = calculateNewTenure(
      newPrincipalBalance,
      currentEMI,
      convertAnnualToMonthlyRate(currentAnnualInterestRate)
    );
  }

  return {
    principalBalance: newPrincipalBalance,
    emiAmount: updatedEMI,
    loanTenure: updatedTenure,
    monthsRemaining: updatedTenure,
  };
}

/**
 * Apply a top-up and recalculate EMI or tenure based on the selected mode.
 */
function applyTopupEvent(
  currentPrincipal,
  currentEMI,
  topupAmount,
  currentAnnualInterestRate,
  recalculationMode,
  remainingMonths
) {
  // Apply topup to increase principal
  const newPrincipalBalance = currentPrincipal + topupAmount;

  let updatedEMI = currentEMI;
  let updatedTenure = remainingMonths;

  if (recalculationMode === "emi") {
    // Recalculate EMI for remaining months
    updatedEMI = calculateEMI(
      newPrincipalBalance,
      convertAnnualToMonthlyRate(currentAnnualInterestRate),
      remainingMonths
    );
  } else {
    // Recalculate tenure with same EMI
    updatedTenure = calculateNewTenure(
      newPrincipalBalance,
      currentEMI,
      convertAnnualToMonthlyRate(currentAnnualInterestRate)
    );
  }

  return {
    principalBalance: newPrincipalBalance,
    emiAmount: updatedEMI,
    loanTenure: updatedTenure,
    monthsRemaining: updatedTenure,
  };
}

// =============================================================================
// SCHEDULE GENERATION
// =============================================================================
function addFinalPaymentMonth(schedule, remainingPrincipal, monthlyInterestRate, currentMonth) {
  const finalMonthInterest = remainingPrincipal * monthlyInterestRate;
  const finalEMIPayment = remainingPrincipal + finalMonthInterest;
  schedule.push({
    monthNumber: currentMonth,
    emiAmount: finalEMIPayment,
    principalRepaid: remainingPrincipal,
    interestPaid: finalMonthInterest,
    prepaymentAmount: 0,
    topupAmount: 0,
    newInterestRate: null,
    outstandingPrincipalBalance: 0,
  });
}

/**
 * Build the amortization schedule given current inputs and any user edits (events)
 */
function generateAmortizationSchedule() {
  if (!loanAmountInput) initializeEMICalculator();

  const originalLoanAmount = parseFloatSafely(loanAmountInput.value);
  const originalAnnualInterestRate = parseFloatSafely(interestRateInput.value);
  const originalLoanTenure = parseIntSafely(loanTenureInput.value);
  if (!validateLoanInputs(originalLoanAmount, originalLoanTenure)) return;

  const recalculationMode = getCurrentRecalculationMode();
  const userEvents = parseUserEventsFromTable(originalLoanTenure);

  // Initialize loan parameters
  let currentPrincipalBalance = originalLoanAmount;
  let currentAnnualInterestRate = originalAnnualInterestRate;
  let currentMonthlyInterestRate = convertAnnualToMonthlyRate(currentAnnualInterestRate);
  let currentLoanTenure = originalLoanTenure;
  let currentEMIAmount = calculateEMI(currentPrincipalBalance, currentMonthlyInterestRate, currentLoanTenure);

  let monthsRemaining = currentLoanTenure;
  let currentMonthIndex = 1;

  const amortizationSchedule = [];
  const MAX_MONTHS = 500; // Increased from 200 to 500
  
  while (currentPrincipalBalance > 0.01 && currentMonthIndex <= MAX_MONTHS) {
    const monthEvent = userEvents[currentMonthIndex] || {
      prepaymentAmount: 0,
      topupAmount: 0,
      newInterestRate: null,
    };

    // Capture previous rate to detect change reliably
    const previousAnnualInterestRate = currentAnnualInterestRate;

    // Handle interest rate change if any
    if (monthEvent.newInterestRate !== null && 
        monthEvent.newInterestRate !== currentAnnualInterestRate) {
      logDebug(`Month ${currentMonthIndex}: Interest rate changing from ${currentAnnualInterestRate}% to ${monthEvent.newInterestRate}%`);
      currentAnnualInterestRate = monthEvent.newInterestRate;
      currentMonthlyInterestRate = convertAnnualToMonthlyRate(currentAnnualInterestRate);

      // Recalculate EMI or tenure based on mode
      if (recalculationMode === "emi") {
        currentEMIAmount = recalculateEMI(currentPrincipalBalance, currentAnnualInterestRate, monthsRemaining);
        logDebug(`Month ${currentMonthIndex}: New EMI after rate change: ${currentEMIAmount}`);
      } else {
        currentLoanTenure = calculateNewTenure(currentPrincipalBalance, currentEMIAmount, currentMonthlyInterestRate);
        monthsRemaining = currentLoanTenure;
        logDebug(`Month ${currentMonthIndex}: New tenure after rate change: ${currentLoanTenure}`);
      }
    }

    // Calculate monthly interest FIRST
    const monthlyInterestAmount = currentPrincipalBalance * currentMonthlyInterestRate;

    // Apply prepayment or topup events BEFORE calculating principal repayment
    if (monthEvent.prepaymentAmount > 0) {
      logDebug(`Month ${currentMonthIndex}: Applying prepayment of ${monthEvent.prepaymentAmount}`);
      currentPrincipalBalance = Math.max(0, currentPrincipalBalance - monthEvent.prepaymentAmount);
      // Recalculate EMI or tenure based on mode
      if (recalculationMode === "emi") {
        currentEMIAmount = recalculateEMI(currentPrincipalBalance, currentAnnualInterestRate, monthsRemaining);
        logDebug(`Month ${currentMonthIndex}: New EMI after prepayment: ${currentEMIAmount}`);
      } else {
        currentLoanTenure = calculateNewTenure(currentPrincipalBalance, currentEMIAmount, currentMonthlyInterestRate);
        monthsRemaining = currentLoanTenure;
        logDebug(`Month ${currentMonthIndex}: New tenure after prepayment: ${currentLoanTenure}`);
      }
    } else if (monthEvent.topupAmount > 0) {
      logDebug(`Month ${currentMonthIndex}: Applying topup of ${monthEvent.topupAmount}`);
      currentPrincipalBalance = currentPrincipalBalance + monthEvent.topupAmount;
      if (recalculationMode === "emi") {
        currentEMIAmount = recalculateEMI(currentPrincipalBalance, currentAnnualInterestRate, monthsRemaining);
        logDebug(`Month ${currentMonthIndex}: New EMI after topup: ${currentEMIAmount}`);
      } else {
        currentLoanTenure = calculateNewTenure(currentPrincipalBalance, currentEMIAmount, currentMonthlyInterestRate);
        monthsRemaining = currentLoanTenure;
        logDebug(`Month ${currentMonthIndex}: New tenure after topup: ${currentLoanTenure}`);
      }
    }

    // Now calculate normal EMI payment amortization
    const principalRepaidThisMonth = Math.min(currentEMIAmount - monthlyInterestAmount, currentPrincipalBalance);
    currentPrincipalBalance = Math.max(0, currentPrincipalBalance - principalRepaidThisMonth);

    // Record month details
    amortizationSchedule.push({
      monthNumber: currentMonthIndex,
      emiAmount: currentEMIAmount,
      principalRepaid: principalRepaidThisMonth,
      interestPaid: monthlyInterestAmount,
      prepaymentAmount: monthEvent.prepaymentAmount,
      topupAmount: monthEvent.topupAmount,
      newInterestRate: monthEvent.newInterestRate !== null ? monthEvent.newInterestRate : currentAnnualInterestRate,
      outstandingPrincipalBalance: currentPrincipalBalance,
    });

    // If there was an interest rate change, update the userEvents for subsequent months
    if (monthEvent.newInterestRate !== null && monthEvent.newInterestRate !== previousAnnualInterestRate) {
      for (let futureMonth = currentMonthIndex + 1; futureMonth <= originalLoanTenure; futureMonth++) {
        if (!userEvents[futureMonth]) {
          userEvents[futureMonth] = { prepaymentAmount: 0, topupAmount: 0, newInterestRate: null };
        }
        // Don't override if a future month already has a specific rate
        if (userEvents[futureMonth].newInterestRate === null) {
          userEvents[futureMonth].newInterestRate = monthEvent.newInterestRate;
        }
      }
    }

    currentMonthIndex++;
    monthsRemaining--;
    if (monthsRemaining <= 0) break;
  }

  // Add final closing payment if needed
  if (currentPrincipalBalance > 0.01 && currentMonthIndex <= MAX_MONTHS) {
    addFinalPaymentMonth(amortizationSchedule, currentPrincipalBalance, currentMonthlyInterestRate, currentMonthIndex);
  }

  // Normalize interest rates so all rows after a change show the new rate
  fillDownInterestRates(amortizationSchedule);

  renderAmortizationTable(amortizationSchedule);
  updatePieChart(amortizationSchedule);
}
window.EMI.generateAmortizationSchedule = generateAmortizationSchedule;

// =============================================================================
// UI RENDERING
// =============================================================================
function fillDownInterestRates(amortizationSchedule) {
  let currentRate = parseFloatSafely(interestRateInput.value) || 0;
  for (const row of amortizationSchedule) {
    if (row.newInterestRate !== null && row.newInterestRate > 0) {
      currentRate = row.newInterestRate;
    }
    row.newInterestRate = currentRate;
  }
}

function renderAmortizationTable(amortizationSchedule) {
  amortizationTableBody.innerHTML = "";

  for (const scheduleRow of amortizationSchedule) {
    const tableRow = document.createElement("tr");

    tableRow.appendChild(createTableCell(scheduleRow.monthNumber));
    tableRow.appendChild(createTableCell(scheduleRow.emiAmount.toFixed(2)));
    tableRow.appendChild(createTableCell(scheduleRow.principalRepaid.toFixed(2)));
    tableRow.appendChild(createTableCell(scheduleRow.interestPaid.toFixed(2)));
    tableRow.appendChild(
      createEditableTableCell(scheduleRow.prepaymentAmount > 0 ? scheduleRow.prepaymentAmount.toFixed(2) : "")
    );
    tableRow.appendChild(
      createEditableTableCell(scheduleRow.topupAmount > 0 ? scheduleRow.topupAmount.toFixed(2) : "")
    );
    tableRow.appendChild(createEditableTableCell(Number(scheduleRow.newInterestRate || 0).toFixed(2)));
    tableRow.appendChild(createTableCell(scheduleRow.outstandingPrincipalBalance.toFixed(2)));

    amortizationTableBody.appendChild(tableRow);
  }

  // Add event listeners for editable cells to recalculate when values change
  addTableEditListeners();
}

function createTableCell(textContent) {
  const tableCell = document.createElement("td");
  tableCell.textContent = textContent;
  return tableCell;
}

function createEditableTableCell(textContent) {
  const tableCell = document.createElement("td");
  tableCell.contentEditable = "true";
  tableCell.textContent = textContent;
  tableCell.addEventListener("keypress", (event) => {
    if (!/[0-9.\b]/.test(event.key)) event.preventDefault();
  });
  return tableCell;
}

function addTableEditListeners() {
  const editableCells = amortizationTableBody.querySelectorAll("td[contenteditable='true']");
  editableCells.forEach((cell) => {
    cell.addEventListener("blur", () => {
      // Recalculate when user finishes editing
      setTimeout(() => generateAmortizationSchedule(), 100);
    });
    cell.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        cell.blur(); // Trigger recalculation
      }
    });
  });
}

// =============================================================================
// CHART & CLEAR
// =============================================================================
function updatePieChart(amortizationSchedule) {
  if (!loanAmountInput) initializeEMICalculator();

  let totalPrincipalRepaid = 0;
  let totalInterestPaid = 0;
  for (const monthData of amortizationSchedule) {
    totalPrincipalRepaid += monthData.principalRepaid + monthData.prepaymentAmount - monthData.topupAmount;
    totalInterestPaid += monthData.interestPaid;
  }
  totalPrincipalRepaid = Math.max(totalPrincipalRepaid, 0);

  const canvas = document.getElementById("emiPieChart");
  if (!canvas) return;
  const chartContext = canvas.getContext("2d");
  chartContext.clearRect(0, 0, canvas.width, canvas.height);
  const total = totalPrincipalRepaid + totalInterestPaid || 1;
  const pAngle = (totalPrincipalRepaid / total) * Math.PI * 2;
  const iAngle = (totalInterestPaid / total) * Math.PI * 2;
  let cx = canvas.width / 2, cy = canvas.height / 2, r = 80;
  let start = -Math.PI / 2;
  chartContext.beginPath();
  chartContext.moveTo(cx, cy);
  chartContext.arc(cx, cy, r, start, start + pAngle);
  chartContext.closePath();
  chartContext.fillStyle = "#2196f3";
  chartContext.fill();
  chartContext.beginPath();
  chartContext.moveTo(cx, cy);
  chartContext.arc(cx, cy, r, start + pAngle, start + pAngle + iAngle);
  chartContext.closePath();
  chartContext.fillStyle = "#f44336";
  chartContext.fill();
  chartContext.fillStyle = "#fff";
  chartContext.font = "12px Arial";
  chartContext.fillText("Principal", cx + r + 10, cy - 6);
  chartContext.fillText(totalPrincipalRepaid.toFixed(2), cx + r + 10, cy + 8);
  chartContext.fillText("Interest", cx + r + 10, cy + 28);
  chartContext.fillText(totalInterestPaid.toFixed(2), cx + r + 10, cy + 44);
}
window.EMI.updatePieChart = updatePieChart;

function clearEMI() {
  if (!loanAmountInput) initializeEMICalculator();
  loanAmountInput.value = "";
  interestRateInput.value = "";
  loanTenureInput.value = "";
  amortizationTableBody.innerHTML = "";
  updatePieChart([]);
}
window.EMI.clearEMI = clearEMI;
