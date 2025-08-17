// Date Calculator - Main Script
"use strict";

let baseDateInput, fromDateInput, toDateInput, dateResultDiv;
let daysDeltaInput,
  weeksDeltaInput,
  monthsDeltaInput,
  yearsDeltaInput,
  dateMathResDiv,
  tzInput,
  tzFromSelect,
  tzToSelect,
  tzResultDiv;

// Create global namespace
window.DateCalculator = window.DateCalculator || {};

function initializeDateCalculator() {
  baseDateInput = document.getElementById("baseDate");
  fromDateInput = document.getElementById("fromDate");
  toDateInput = document.getElementById("toDate");
  dateResultDiv = document.getElementById("dateResult");

  daysDeltaInput = document.getElementById("deltaDays");
  weeksDeltaInput = document.getElementById("deltaWeeks");
  monthsDeltaInput = document.getElementById("deltaMonths");
  yearsDeltaInput = document.getElementById("deltaYears");
  dateMathResDiv = document.getElementById("dateMathRes");
  tzInput = document.getElementById("tzInput");
  tzFromSelect = document.getElementById("tzFrom");
  tzToSelect = document.getElementById("tzTo");
  tzResultDiv = document.getElementById("tzResult");

  // Set default dates
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (baseDateInput) baseDateInput.value = today.toISOString().split("T")[0];
  if (fromDateInput)
    fromDateInput.value = yesterday.toISOString().split("T")[0];
  if (toDateInput) toDateInput.value = today.toISOString().split("T")[0];

  // Add event listeners
  if (fromDateInput)
    fromDateInput.addEventListener("change", calculateDateDifference);
  if (toDateInput)
    toDateInput.addEventListener("change", calculateDateDifference);

  document.getElementById("nowBtn").addEventListener("click", getLocalTime);
  
  // Initialize timezone converter
  initializeTimezoneConverter();
}

window.DateCalculator.initializeDateCalculator = initializeDateCalculator;

function pluralize(n, unit) {
  return `${n} ${unit}${n !== 1 ? 's' : ''}`;
}

function humanizeDiff(fromDate, toDate) {
  let start = new Date(fromDate);
  let end = new Date(toDate);
  if (end < start) {
    const tmp = start; start = end; end = tmp;
  }

  let years = end.getFullYear() - start.getFullYear();
  const endMonth = end.getMonth();
  const startMonth = start.getMonth();
  if (endMonth < startMonth || (endMonth === startMonth && end.getDate() < start.getDate())) {
    years -= 1;
  }

  const afterYears = new Date(start);
  afterYears.setFullYear(start.getFullYear() + years);

  let months = (end.getFullYear() - afterYears.getFullYear()) * 12 + (end.getMonth() - afterYears.getMonth());
  if (end.getDate() < afterYears.getDate()) {
    months -= 1;
  }

  const afterMonths = new Date(afterYears);
  afterMonths.setMonth(afterYears.getMonth() + months);

  const msPerDay = 24 * 60 * 60 * 1000;
  const remainingDays = Math.round((end - afterMonths) / msPerDay);
  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;

  const parts = [];
  if (years > 0) parts.push(pluralize(years, 'year'));
  if (months > 0) parts.push(pluralize(months, 'month'));
  if (weeks > 0) parts.push(pluralize(weeks, 'week'));
  if (days > 0 || parts.length === 0) parts.push(pluralize(days, 'day'));

  return parts.join(' ');
}

function calculateDateDifference() {
  if (!fromDateInput || !toDateInput || !dateResultDiv) return;
  
  const fromDate = new Date(fromDateInput.value);
  const toDate = new Date(toDateInput.value);
  
  if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
    dateResultDiv.textContent = "Please enter valid dates";
    return;
  }
  
  const diffMs = Math.abs(toDate - fromDate);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffSeconds = Math.floor(diffMs / 1000);
  const weeks = Math.floor(diffDays / 7);
  const remainingDays = diffDays % 7;
  const human = humanizeDiff(fromDate, toDate);

  const direction = toDate > fromDate ? 'later' : (toDate < fromDate ? 'earlier' : '');

  // Build output
  const resultTextStyle = '<h2 style="margin: 0 0 8px 0; color: var(--primary-color)">Result</h2>';
  const primaryResultStyle = 'style="font-size: 34px; font-weight: 700; margin-top: 8px"';
  const secondaryResultStyle = 'style="margin-top:10px; padding-left:20px; color:#ffffff; font-size:1.2em;"';

  let resultText = `${resultTextStyle}
  <div ${primaryResultStyle}> ${diffDays} day${diffDays > 1 ? `s` : ''} ${direction ? ` (${direction})` : ''}<br></div>
  <ul ${secondaryResultStyle}>
    <li>${human} <br></li>
    <li>${diffSeconds.toLocaleString()} seconds</li>
    <li>${diffMinutes.toLocaleString()} minutes</li>
    <li>${diffHours.toLocaleString()} hours</li>
  </ul>
`;

    dateResultDiv.innerHTML = resultText;

}

function addSubtractDays() {
  if (!baseDateInput || !dateMathResDiv) return;

  const base = baseDateInput.value;
  const sign =
    document.querySelector('input[name="deltaSign"]:checked')?.value ===
    "subtract"
      ? -1
      : 1;

  if (!base) {
    alert("Please set base date");
    return;
  }

  const days = parseInt(daysDeltaInput?.value || 0) || 0;
  const weeks = parseInt(weeksDeltaInput?.value || 0) || 0;
  const months = parseInt(monthsDeltaInput?.value || 0) || 0;
  const years = parseInt(yearsDeltaInput?.value || 0) || 0;

  if (days === 0 && weeks === 0 && months === 0 && years === 0) {
    alert("Enter at least one value to add/subtract");
    return;
  }

  const d = new Date(base);
  // Apply years and months first to preserve month boundaries better
  if (years !== 0) d.setFullYear(d.getFullYear() + sign * years);
  if (months !== 0) d.setMonth(d.getMonth() + sign * months);
  // Weeks and days
  const totalDays = days + weeks * 7;
  if (totalDays !== 0) d.setDate(d.getDate() + sign * totalDays);

  dateMathResDiv.textContent = d.toISOString().slice(0, 10);
}

function clearDates() {
  if (fromDateInput) fromDateInput.value = "";
  if (toDateInput) toDateInput.value = "";
  if (dateResultDiv) dateResultDiv.textContent = "";
}

function getLocalTime(){
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");

    const formatted =
        now.getFullYear() +
        "-" + pad(now.getMonth() + 1) +
        "-" + pad(now.getDate()) +
        "T" + pad(now.getHours()) +
        ":" + pad(now.getMinutes());

    document.getElementById("tzInput").value = formatted;
}

function getTimezoneOffsetMinutes(timeZone, date = new Date()) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  const parts = dtf.formatToParts(date);
  const values = Object.fromEntries(parts.map(p => [p.type, p.value]));
  const asUTC = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second)
  );
  // Positive minutes mean timezone is ahead of UTC
  return Math.round((asUTC - date.getTime()) / 60000);
}

function formatOffsetLabel(offsetMin) {
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `UTC${sign}${hh}:${mm}`;
}

function parseDateTimeLocal(dt) {
  // Expects 'YYYY-MM-DDTHH:MM' or 'YYYY-MM-DDTHH:MM:SS'
  const [datePart, timePart = "00:00:00"] = dt.split('T');
  const [year, month, day] = datePart.split('-').map(n => parseInt(n, 10));
  const [hour, minute, second = '00'] = timePart.split(':');
  return {
    year,
    month,
    day,
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
    second: parseInt(second, 10)
  };
}

function formatInTimeZone(epochMs, timeZone) {
  const dt = new Date(epochMs);
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
  const parts = dtf.formatToParts(dt);
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
}

function initializeTimezoneConverter() {
  if (!tzFromSelect || !tzToSelect) return;

  //   Initialze all menu items
  let tzlist = Intl.supportedValuesOf("timeZone");
  tzlist.push("UTC");

  // Build with offsets and sort - to +
  const zones = tzlist
    .map((tz) => ({ tz, offset: getTimezoneOffsetMinutes(tz) }))
    .sort((a, b) => a.offset - b.offset);

  tzFromSelect.innerHTML = "";
  tzToSelect.innerHTML = "";

  if (typeof Intl.supportedValuesOf === "function") {
    const timeZones = Intl.supportedValuesOf("timeZone");
    console.log("Total zones:", timeZones.length);
    console.log("Sample zones:", timeZones.slice(0, 2000)); // show first 10
    console.log("Contains Asia/Kolkata?", timeZones.includes("Asia/Kolkata"));
  } else {
    console.warn("Intl.supportedValuesOf('timeZone') is not supported in this environment.");
  }

  zones.forEach(({ tz, offset }) => {
    const label = `${formatOffsetLabel(offset)} ${tz}`;
    const opt1 = document.createElement("option");
    opt1.value = tz;
    opt1.textContent = label;
    tzFromSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = tz;
    opt2.textContent = label;
    tzToSelect.appendChild(opt2);
  });

  // Set defaults: From = local TZ, To = UTC
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("localTZ " + localTZ);
  if (localTZ && tzlist.includes(localTZ)) {
    tzFromSelect.value = localTZ;
  } else {
    tzFromSelect.value = "UTC";
  }
  tzToSelect.value = "UTC";

  if (tzInput) {
    tzInput.value = new Date().toISOString().slice(0, 16);
  }
}

function convertTZ() {
  if (!tzInput || !tzFromSelect || !tzToSelect || !tzResultDiv) return;
  
  const dt = tzInput.value;
  const from = tzFromSelect.value;
  const to = tzToSelect.value;
  
  if (!dt) {
    alert("Please pick a datetime");
    return;
  }
  
  try {
    // Interpret input as local date-time in 'from' timezone, convert to absolute UTC instant
    const { year, month, day, hour, minute, second } = parseDateTimeLocal(dt);
    const localFromDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    const fromOffsetMin = getTimezoneOffsetMinutes(from, localFromDate);
    const epochMs = localFromDate.getTime() - fromOffsetMin * 60_000; // UTC instant

    // Format in target timezone
    const formatted = formatInTimeZone(epochMs, to);
    const toOffsetMin = getTimezoneOffsetMinutes(to, new Date(epochMs));
    const label = `${formatted} (${formatOffsetLabel(toOffsetMin)}) ${to}`;
    tzResultDiv.textContent = label;
  } catch (error) {
    tzResultDiv.textContent = "Error converting timezone";
  }
}

// Expose functions globally for HTML onclick handlers
window.calculateDateDifference = calculateDateDifference;
window.addSubtractDays = addSubtractDays;
window.clearDates = clearDates;
window.convertTZ = convertTZ;
