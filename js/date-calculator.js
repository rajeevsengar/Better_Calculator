// Date Calculator - Main Implementation
"use strict";

class DateCalculator {
  constructor() {
    this.initializeElements();
    this.setDefaultValues();
    this.bindEvents();

  }

  /* On load methods STARTS*/
  /* Initialize the elements of the date calculator */
  initializeElements() {
    // Web components
    this.fromDateInput = document.querySelector('date-input[id="fromDate"]');
    this.fromTimeInput = document.querySelector('time-input[id="fromTime"]');
    this.fromTimezoneInput = document.querySelector('timezone-input[id="fromTimezone"]');
    
    this.toDateInput = document.querySelector('date-input[id="toDate"]');
    this.toTimeInput = document.querySelector('time-input[id="toTime"]');
    this.toTimezoneInput = document.querySelector('timezone-input[id="toTimezone"]');
    
    this.baseDateInput = document.querySelector('date-input[id="baseDate"]');
    this.baseTimeInput = document.querySelector('time-input[id="baseTime"]');
    
    // Date arithmetic inputs
    this.daysDeltaInput = document.getElementById("deltaDays");
    this.weeksDeltaInput = document.getElementById("deltaWeeks");
    this.monthsDeltaInput = document.getElementById("deltaMonths");
    this.yearsDeltaInput = document.getElementById("deltaYears");
    
    // Time arithmetic inputs
    this.deltaHoursInput = document.getElementById("deltaHours");
    this.deltaMinutesInput = document.getElementById("deltaMinutes");
    this.deltaSecondsInput = document.getElementById("deltaSeconds");
    
    this.dateMathResDiv = document.getElementById("dateMathRes");

    // Enhanced functionality
    this.enhancedToggle = document.getElementById("enhancedToggle");
    this.toggleSlider = document.getElementById("toggle-slider-enhanced");
    this.addDaysEnhancedToggle = document.getElementById("addDaysEnhancedToggle");
    this.toggleSliderAddDays = document.getElementById("toggle-slider-add-days");
    

  }

  setDefaultValues() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (this.baseDateInput) this.baseDateInput.value = today.toISOString().split("T")[0];
    if (this.baseTimeInput) this.baseTimeInput.value = this.baseTimeInput.getStartOfDay();
    
    // Hide time arithmetic section by default
    this.hideTimeArithmeticSection();
    
    // Set default values for web components
    if (this.fromDateInput) {
      this.fromDateInput.value = yesterday.toISOString().split("T")[0];
    }
    
    if (this.fromTimeInput) {
      this.fromTimeInput.value = today.toTimeString().slice(0, 5);
      // Hide time input by default (toggle is OFF)
      this.fromTimeInput.style.display = "none";
    }
    
    if (this.fromTimezoneInput) {
      this.fromTimezoneInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Hide timezone input by default (toggle is OFF)
      this.fromTimezoneInput.style.display = "none";
    }
    
    if (this.toDateInput) {
      this.toDateInput.value = today.toISOString().split("T")[0];
    }
    
    if (this.toTimeInput) {
      this.toTimeInput.value = today.toTimeString().slice(0, 5);
      // Hide time input by default (toggle is OFF)
      this.toTimeInput.style.display = "none";
    }
    
    if (this.toTimezoneInput) {
      this.toTimezoneInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Hide timezone input by default (toggle is OFF)
      this.toTimezoneInput.style.display = "none";
    }
  }

  bindEvents() {
    // Enhanced toggle
    if (this.enhancedToggle) {
      this.enhancedToggle.addEventListener("change", () => this.toggleEnhancedMode());
      
      if (this.toggleSlider) {
        this.toggleSlider.addEventListener('click', () => {
          this.enhancedToggle.checked = !this.enhancedToggle.checked;
          this.toggleEnhancedMode();
        });
      }
    }

    // Add Days enhanced toggle
    if (this.addDaysEnhancedToggle) {
      this.addDaysEnhancedToggle.addEventListener("change", () => {this.toggleAddDaysEnhancedMode();});

      if (this.toggleSliderAddDays) {
        this.toggleSliderAddDays.addEventListener('click', () => {
          this.addDaysEnhancedToggle.checked = !this.addDaysEnhancedToggle.checked;
          this.toggleAddDaysEnhancedMode();
        });
      }
    }


    // Initialize delta sign chips
    this.initializeDeltaSignChips();
    
    // Set initial labels based on default selected chip
    const selectedChip = document.querySelector('#deltaSignChips .chip.selected');
    if (selectedChip) {
      this.updateArithmeticLabels(selectedChip.dataset.value);
    }
  }

  /* Initialize the delta sign chips */
  initializeDeltaSignChips() {
    const chipContainer = document.getElementById('deltaSignChips');
    
    if (!chipContainer) return;

    const chips = chipContainer.querySelectorAll('.chip');
    
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Remove selected class from all chips
        chips.forEach(c => c.classList.remove('selected'));
        // Add selected class to clicked chip
        chip.classList.add('selected');
        
        // Update labels based on selected operation
        this.updateArithmeticLabels(chip.dataset.value);
      });
    });
  }

  /* Update arithmetic labels based on selected operation */
  updateArithmeticLabels(operation) {
    const dateArithmeticLabel = document.getElementById('dateArithmeticLabel');
    const timeArithmeticLabel = document.getElementById('timeArithmeticLabel');
    
    if (dateArithmeticLabel) {
      dateArithmeticLabel.textContent = operation === 'add' ? 'Add' : 'Subtract';
    }
    
    if (timeArithmeticLabel) {
      timeArithmeticLabel.textContent = operation === 'add' ? 'Add' : 'Subtract';
    }
  }



  toggleEnhancedMode() {
    const isEnhanced = this.enhancedToggle.checked;
    
    // Show/hide time and timezone inputs based on enhanced mode
    if (this.fromTimeInput) {
      this.fromTimeInput.style.display = isEnhanced ? "inline-block" : "none";
    }
    if (this.fromTimezoneInput) {
      this.fromTimezoneInput.style.display = isEnhanced ? "inline-block" : "none";
    }
    if (this.toTimeInput) {
      this.toTimeInput.style.display = isEnhanced ? "inline-block" : "none";
    }
    if (this.toTimezoneInput) {
      this.toTimezoneInput.style.display = isEnhanced ? "inline-block" : "none";
    }
    
    // Hide/show include end date checkbox based on enhanced mode
    const includeEndDateDiv = document.getElementById("includeEndDateDiv");
    const includeEndDateCheckbox = document.getElementById("includeEndDate");
    
    if (includeEndDateDiv) {
      includeEndDateDiv.style.display = isEnhanced ? "none" : "block";
    }
    
    // Uncheck the checkbox when enhanced mode is enabled
    if (includeEndDateCheckbox && isEnhanced) {
      includeEndDateCheckbox.checked = false;
    }
  }

  toggleAddDaysEnhancedMode() {
    const isEnhanced = this.addDaysEnhancedToggle.checked;
    
    // Show/hide time arithmetic section based on enhanced mode
    const timeArithmeticCard = document.getElementById('timeArithmeticCard'); // Time Arithmetic card
    if (timeArithmeticCard) {
      timeArithmeticCard.style.display = isEnhanced ? "block" : "none";
    }
  }

  hideTimeArithmeticSection() {
    // Hide time arithmetic section by default
    const timeArithmeticCard = document.getElementById('timeArithmeticCard'); // Time Arithmetic card
    if (timeArithmeticCard) {
      timeArithmeticCard.style.display = "none";
    }
  }

  /* On load methods ENDS*/
  /* Display the formatted date difference result */
  displayDateDifferenceResult(formattedResult, wrapperId, containerId) {
    const resultContainerWrapper = document.getElementById(wrapperId);
    const resultContainer = document.getElementById(containerId);
    
    if (resultContainer && formattedResult) {
      if (resultContainerWrapper) {
        resultContainerWrapper.style.display = "block";
        resultContainer.innerHTML = formattedResult;
      }
    }
  }

  /* Calculate the difference between two dates logic STARTS Count Days Functionality*/
  /* Calculate the difference between two dates */
  countDays() {
    let fromDate, toDate, isEnhanced;
    
    // Get values from web components
    if (this.fromDateInput && this.toDateInput) {
      fromDate = this.fromDateInput.value;
      toDate = this.toDateInput.value;
      // Check if enhanced mode is enabled via the toggle
      isEnhanced = this.enhancedToggle && this.enhancedToggle.checked;
    } else {
      return;
    }
    
    if (!fromDate || !toDate) return;
    
    if (isEnhanced) {
      // Enhanced mode: calculate difference including time and timezone
      this.calculateDateTimeDifference(fromDate, toDate);
    } else {
      // Basic mode: calculate difference in days only
      this.calculateDateDifference(fromDate, toDate);
    }
    
    // Format and display the result
    const formattedResult = this.formatDateDifferenceResult();
    this.displayDateDifferenceResult(formattedResult, "dateResultContainer", "dateResult");
  }

  /* Calculate difference between two dates (basic mode) */
  calculateDateDifference(fromDate, toDate) {
    const fromConst = new Date(fromDate);
    const toConst = new Date(toDate);
    let from = new Date(fromConst.getTime());
    let to = new Date(toConst.getTime());

    if (isNaN(from.getTime()) || isNaN(to.getTime())) return;

    
    const includeEndDate = document.getElementById('includeEndDate') && document.getElementById('includeEndDate').checked;
    if (includeEndDate) {
      to > from ? to.setDate(to.getDate() + 1) : from.setDate(from.getDate() + 1);
    }
    
    const timeDiff = Math.abs(to.getTime() - from.getTime());
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Store result for next phase display - same format as calculateDateTimeDifference
    this.dateDifferenceResult = {
      type: 'date',
      displayFrom: fromConst,
      displayTo: toConst,
      from: from,
      to: to,
      milliseconds: timeDiff,
      days: daysDiff,
      fromTimezone: "local",
      toTimezone: "local",
      includeEndDate: includeEndDate
    };
  }

  /* Calculate difference between two date-times with timezone consideration */
  calculateDateTimeDifference(fromDate, toDate) {
    let fromTime, toTime, fromTimezone, toTimezone;
    
    // Get values from web components
    if (this.fromTimeInput && this.toTimeInput) {
      fromTime = this.fromTimeInput.value || "00:00";
      toTime = this.toTimeInput.value || "00:00";
    } else {
      console.warn("Time inputs not found");
      return;
    }
    
    // Get timezone values from web components
    if (this.fromTimezoneInput && this.toTimezoneInput) {
      fromTimezone = this.fromTimezoneInput.value || "local";
      toTimezone = this.toTimezoneInput.value || "local";
    } else {
      console.warn("Timezone inputs not found");
      return;
    }
    
    if (!fromTime || !toTime) {
      console.warn("Time values are required");
      return;
    }
    
    // Create full datetime strings
    const fromDateTime = `${fromDate}T${fromTime}`;
    const toDateTime = `${toDate}T${toTime}`;
    
    // Create Date objects (will be in local timezone initially)
    let from = new Date(fromDateTime);
    let to = new Date(toDateTime);
    
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      console.warn("Invalid date/time values");
      return;
    }
    
    let fromTzAdjusted = from;
    let toTzAdjusted = to;
    
    // Apply timezone adjustments if different from local
    if (fromTimezone !== "local") {
      fromTzAdjusted = this.adjustForTimezone(from, fromTimezone);
    }
    if (toTimezone !== "local") {
      toTzAdjusted = this.adjustForTimezone(to, toTimezone);
    }
    
    // Calculate difference in milliseconds
    let timeDiff = Math.abs(toTzAdjusted.getTime() - fromTzAdjusted.getTime());
    
    // In enhanced mode, end date inclusion is not applicable
    const includeEndDate = false;
    
    // Used to display the result
    this.dateDifferenceResult = {
      type: 'datetime',
      displayFrom: from,
      displayTo: to,
      from: from,
      to: to,
      milliseconds: timeDiff,
      fromTimezone: fromTimezone,
      toTimezone: toTimezone,
      includeEndDate: includeEndDate
    };
  }

  /* Adjust date for specific timezone */
  adjustForTimezone(date, timezone) {
    if (timezone === "local" || timezone === "UTC") {
      return date;
    }
    
    try {
      // Get offsetMinutes using the existing getTimezoneInfo method
      let offsetMinutes = 0;
      
      // Check if this is from our "from" timezone
      if (this.fromTimezoneInput && this.fromTimezoneInput.value === timezone) {
        const timezoneInfo = this.fromTimezoneInput.getTimezoneInfo(timezone);
        if (timezoneInfo && timezoneInfo.offsetMinutes !== undefined) {
          offsetMinutes = timezoneInfo.offsetMinutes;
        }
      }
      // Check if this is from our "to" timezone
      else if (this.toTimezoneInput && this.toTimezoneInput.value === timezone) {
        const timezoneInfo = this.toTimezoneInput.getTimezoneInfo(timezone);
        if (timezoneInfo && timezoneInfo.offsetMinutes !== undefined) {
          offsetMinutes = timezoneInfo.offsetMinutes;
        }
      }
      
      // If we found offsetMinutes from our components, use it
      if (offsetMinutes !== 0) {
        const adjustedDate = new Date(date.getTime() - (offsetMinutes * 60 * 1000));
        return adjustedDate;
      }
      
      // Fallback: return original date if no offset found
      return date;
      
    } catch (error) {
      console.warn(`Error adjusting for timezone ${timezone}:`, error);
      return date;
    }
  }

  /*---- RESULT FORMATTING AND DISPLAY FUNCTIONALITY STARTS----*/
  /* Format the date difference result for display */
  formatDateDifferenceResult() {
    if (!this.dateDifferenceResult) return "";

    const result = this.dateDifferenceResult;
    const { displayFrom, displayTo, from, to, milliseconds, type, fromTimezone, toTimezone } = result;

    // Section 1: Format the From and To dates section
    let fromFormatted = this.formatDateTimeDisplay(displayFrom, fromTimezone, type === 'datetime');
    let toFormatted = this.formatDateTimeDisplay(displayTo, toTimezone, type === 'datetime');
    let toFormattedWithEndDate = '';
    let fromFormattedWithEndDate = '';

    if(type !== 'datetime') {
      if(displayTo >= displayFrom){
        fromFormattedWithEndDate = `From and including: ${fromFormatted}<br></br>`;
        toFormattedWithEndDate = `To ${result.includeEndDate ? 'and including: ' : 'but <strong>not</strong> including:'}: </strong> ${toFormatted}<br></br>`;
      }else{
        fromFormattedWithEndDate = `From ${result.includeEndDate ? 'and including: ' : 'but <strong>not</strong> including:'}: </strong> ${fromFormatted}<br></br>`;
        toFormattedWithEndDate = `To and including: ${toFormatted}<br></br>`;
      }
    }else{
      fromFormattedWithEndDate = `From: </strong> ${fromFormatted}<br></br>`;
      toFormattedWithEndDate = `To: </strong> ${toFormatted}<br></br>`;
    }
    
    // Section 2: Format the main result using days as maximum unit
    const mainResult = this.getInDaysTerm(from, to);
    
    // Section 3: Format duration breakdown section 

    // (break ms into years, months, days, hours, minutes, seconds)
    const timeUnits = this.calculateTimeUnits(milliseconds);

    let durationBreakdown = "";
    let showDurationSection = false;
    
    if (timeUnits.years > 0) {
      durationBreakdown += `${this.getInYearsTerm(from, to)}<br>`;
      showDurationSection = true;
    }
    if (timeUnits.months > 0) {
      durationBreakdown +=  timeUnits.years > 0 ? `Or ${this.getInMonthTerms(from, to)}<br>` : `${this.getInMonthTerms(from, to)}<br>`;
      showDurationSection = true;
    }

    // Section 4: Format alternative time units section
    const alternativeUnits = this.formatAlternativeUnits(timeUnits);

    let formattedResult = `
      <div class="result-detail">
        ${fromFormattedWithEndDate}
        ${toFormattedWithEndDate}
        <div class="bmi-result">
          <strong>Result:</strong> ${mainResult}<br><br>
        </div>
        ${showDurationSection ? `<strong>The duration is</strong><br>${durationBreakdown}` : ''}
        <strong>Alternative time units</strong><br>
        ${mainResult} can be converted to one of these units:<br>
        ${alternativeUnits}
      </div>
    `;
    
    return formattedResult;
  }

  /* Format date/time for display with timezone */
  formatDateTimeDisplay(date, timezone, showTime) {
    // weekday + month names directly from locale, but without changing time
    const weekday = date.toLocaleString('en-GB', { weekday: 'long' });
    const month   = date.toLocaleString('en-GB', { month: 'long' });
  
    const day     = date.getDate().toString().padStart(2, '0');
    const year    = date.getFullYear();
    
    if(showTime) {
      const hours   = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const timezoneName = timezone.split('/').pop() || timezone;
      return `${weekday}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} ${timezoneName} time`;
    }

    return `${weekday}, ${day} ${month} ${year}`;
  }
  
  /* Calculate all time units from milliseconds or dates */
  calculateTimeUnits(milliseconds) {
    // Days, months, years using existing methods
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const months = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(milliseconds / (1000 * 60 * 60 * 24 * 365.25));

    // Remaining units from milliseconds
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const weeks = Math.floor(Math.floor(milliseconds / (1000 * 60 * 60 * 24)) / 7);

    return {
      milliseconds: milliseconds,
      seconds,
      minutes,
      hours,
      weeks,
      days,
      months,
      years
    };
  }

  /* Convert fromDate and toDate to time units with days as maximum unit */
  getInDaysTerm(fromDate, toDate) {
    return this.formatTimeUnits(fromDate, toDate, 'days');
  }

  /* Convert fromDate and toDate to time units with months as maximum unit */
  getInMonthTerms(fromDate, toDate) {
    return this.formatTimeUnits(fromDate, toDate, 'months');
  }

  /* Convert fromDate and toDate to time units with years as maximum unit */
  getInYearsTerm(fromDate, toDate) {
    return this.formatTimeUnits(fromDate, toDate, 'years');
  }
  
  /* Convert fromDate and toDate to time units with a specific maximum unit */
  formatTimeUnits(fromDate, toDate, maxUnit = 'days') {
    if (!(fromDate instanceof Date) || !(toDate instanceof Date)) {
      throw new Error("fromDate and toDate must be Date objects");
    }
  
    let start = new Date(fromDate);
    let end = new Date(toDate);
    if (start > end) [start, end] = [end, start];
  
    const parts = [];
  
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    const days = end.getDate() - start.getDate();
    const hours = end.getHours() - start.getHours();
    const minutes = end.getMinutes() - start.getMinutes();
    const seconds = end.getSeconds() - start.getSeconds();
  
    // Helper to add units if > 0
    const addUnit = (value, name) => value > 0 && parts.push(`${value} ${name}${value !== 1 ? 's' : ''}`);
  
    if (maxUnit === 'years') {
      addUnit(years, 'year');
      addUnit(months, 'month');
      addUnit(days, 'day');
    } else if (maxUnit === 'months') {
      const totalMonths = years * 12 + months;
      addUnit(totalMonths, 'month');
      addUnit(days, 'day');
    } else if (maxUnit === 'days') {
      const dayDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24));
      addUnit(dayDiff, 'day');
    }
  
    // Add remaining time
    addUnit(hours < 0 ? hours + 24 : hours, 'hour');
    addUnit(minutes < 0 ? minutes + 60 : minutes, 'minute');
    addUnit(seconds < 0 ? seconds + 60 : seconds, 'second');
  
    if (parts.length === 0) return "0 seconds";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  
    const last = parts.pop();
    return `${parts.join(', ')} and ${last}`;
  }
  
  /* Format alternative time units */
  formatAlternativeUnits(timeUnits) {
    const { seconds, minutes, hours, days, weeks } = timeUnits;
    
    return `
      ${seconds.toLocaleString()} seconds<br>
      ${minutes.toLocaleString()} minutes<br>
      ${hours.toLocaleString()} hours (rounded down)<br>
      ${days.toLocaleString()} days (rounded down)<br>
      ${weeks.toLocaleString()} weeks (rounded down)
    `;
  }
  /*---- RESULT FORMATTING AND DISPLAY FUNCTIONALITY ENDS----*/
  /* Calculate the difference between two dates logic ENDS Count Days Functionality */

  /* date arithmetic logic STARTS Add Days Functionality*/
  /* Add days, weeks, months, years and time to a base date */
  addSubtractDays() {
    if (!this.baseDateInput || !this.dateMathResDiv) return;
    
    let baseDateTime = this.baseDateInput.value;
    
    // If we have a base time input, combine it with the date
    if (this.baseTimeInput && this.baseTimeInput.value) {
      baseDateTime = `${this.baseDateInput.value}T${this.baseTimeInput.value}`;
    }
    
    const baseDate = new Date(baseDateTime);
    if (isNaN(baseDate.getTime())) {
      this.dateMathResDiv.textContent = "Please enter a valid base date";
      return;
    }

    // Get date deltas
    const days = parseInt(this.daysDeltaInput.value) || 0;
    const weeks = parseInt(this.weeksDeltaInput.value) || 0;
    const months = parseInt(this.monthsDeltaInput.value) || 0;
    const years = parseInt(this.yearsDeltaInput.value) || 0;
    
    // Get time deltas
    const hours = parseInt(this.deltaHoursInput?.value) || 0;
    const minutes = parseInt(this.deltaMinutesInput?.value) || 0;
    const seconds = parseInt(this.deltaSecondsInput?.value) || 0;
    
    const operation = document.querySelector('#deltaSignChips .chip.selected').dataset.value;
    const multiplier = operation === "add" ? 1 : -1;
    
    // Create result date with date arithmetic
    const resultDate = new Date(baseDate);
    resultDate.setDate(resultDate.getDate() + (days * multiplier));
    resultDate.setDate(resultDate.getDate() + (weeks * 7 * multiplier));
    resultDate.setMonth(resultDate.getMonth() + (months * multiplier));
    resultDate.setFullYear(resultDate.getFullYear() + (years * multiplier));
    
    // Add time arithmetic using milliseconds to avoid interference with date
    const timeDeltaMs = (hours * 3600000 + minutes * 60000 + seconds * 1000) * multiplier;
    resultDate.setTime(resultDate.getTime() + timeDeltaMs);
    
    // Format combined result
    const formattedResult = this.formatCombinedArithmeticResult(
      baseDate, 
      resultDate, 
      { days, weeks, months, years, hours, minutes, seconds }, 
      timeDeltaMs == 0 ? 0 : timeDeltaMs,
      operation
    );

    this.displayDateDifferenceResult(formattedResult, "dateResultContainer1", "dateMathRes");
  }

  /* Format the result of combined date and time arithmetic */
  formatCombinedArithmeticResult(baseDate, resultDate, deltas, timeDeltaMs, operation) {
    const { days, weeks, months, years, hours, minutes, seconds } = deltas;
    
    let operationText = operation === "add" ? "added to" : "subtracted from";
    let dateDeltaText = [];
    let timeDeltaText = [];
    
    // Build date delta text
    if (years > 0) dateDeltaText.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) dateDeltaText.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (weeks > 0) dateDeltaText.push(`${weeks} week${weeks !== 1 ? 's' : ''}`);
    if (days > 0) dateDeltaText.push(`${days} day${days !== 1 ? 's' : ''}`);
    
    // Build time delta text
    if (hours > 0) timeDeltaText.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) timeDeltaText.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (seconds > 0) timeDeltaText.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
    
    // Format the result date with time
    const resultDateStr = resultDate.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    const resultTimeStr = timeDeltaMs != 0 ? resultDate.toTimeString().slice(0, 8) : '';
    
    // Build the complete description
    let description = [];
    if (dateDeltaText.length > 0) {
      description.push(dateDeltaText.join(', '));
    }
    if (timeDeltaMs != 0 && timeDeltaText.length > 0) {
      description.push(timeDeltaText.join(', '));
    }
    
    // Format base date/time for display
    let baseDisplay = baseDate.toLocaleDateString();
    if (timeDeltaMs != 0 && this.baseTimeInput && this.baseTimeInput.value) {
      baseDisplay += ` at ${this.baseTimeInput.value}`;
    }
    
    return `<div class="result-detail">
    <div class="bmi-result">
        <strong>Result:</strong> ${resultDateStr} ${resultTimeStr ? `at ${resultTimeStr}` : ''}
      </div>
      <div class="bmi-result-description">
        <em>${description.join(' and ')} ${operationText} ${baseDisplay}</em>
      </div>
    </div>`;
  }

  /* date arithmetic logic ENDS Add Days Functionality*/

  /* Clear all date inputs */
  clearDates() {
    const now = new Date();
    
    // Clear web components
    if (this.fromDateInput) {
      this.fromDateInput.value = now.toISOString().split("T")[0];
    }
    if (this.fromTimeInput) {
      this.fromTimeInput.value = now.toTimeString().slice(0, 5);
    }
    if (this.fromTimezoneInput) {
      this.fromTimezoneInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    if (this.toDateInput) {
      this.toDateInput.value = now.toISOString().split("T")[0];
    }
    if (this.toTimeInput) {
      this.toTimeInput.value = now.toTimeString().slice(0, 5);
    }
    if (this.toTimezoneInput) {
      this.toTimezoneInput.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    
    
    // Hide result containers when clearing
    const dateResultContainer = document.getElementById("dateResultContainer");
    
    if (dateResultContainer) {
      dateResultContainer.style.display = "none";
    }
    
    // Reset include end date checkbox
    const includeEndDateCheckbox = document.getElementById('includeEndDate');
    if (includeEndDateCheckbox) {
      includeEndDateCheckbox.checked = false;
    }
  }

  /* Clear Add Days tab inputs */
  clearAddDays() {
    const today = new Date();

    if (this.baseDateInput) this.baseDateInput.value = today.toISOString().split("T")[0];
    if (this.baseTimeInput) this.baseTimeInput.value = this.baseTimeInput.getStartOfDay();
    
    // Clear all delta inputs
    if (this.daysDeltaInput) this.daysDeltaInput.value = "";
    if (this.weeksDeltaInput) this.weeksDeltaInput.value = "";
    if (this.monthsDeltaInput) this.monthsDeltaInput.value = "";
    if (this.yearsDeltaInput) this.yearsDeltaInput.value = "";
    if (this.deltaHoursInput) this.deltaHoursInput.value = "";
    if (this.deltaMinutesInput) this.deltaMinutesInput.value = "";
    if (this.deltaSecondsInput) this.deltaSecondsInput.value = "";
    
    // Clear result
    if (this.dateMathResDiv) this.dateMathResDiv.textContent = "";
    
    // Hide result container
    const dateResultContainer1 = document.getElementById("dateResultContainer1");
    if (dateResultContainer1) {
      dateResultContainer1.style.display = "none";
    }
    
    // Reset chips to default (Add selected)
    const addChip = document.querySelector('#deltaSignChips .chip[data-value="add"]');
    const subtractChip = document.querySelector('#deltaSignChips .chip[data-value="subtract"]');
    if (addChip && subtractChip) {
      addChip.classList.add('selected');
      subtractChip.classList.remove('selected');
    }
  }

  // Static method for initialization
  static initializeDateCalculator() {
    if (!window.dateCalculator) {
      window.dateCalculator = new DateCalculator();
    }
    return window.dateCalculator;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.dateCalculator = new DateCalculator();
});

// Expose functions globally for HTML onclick handlers
window.addSubtractDays = () => window.dateCalculator.addSubtractDays();
window.clearAddDays = () => window.dateCalculator.clearAddDays();
window.clearDates = () => window.dateCalculator.clearDates();
window.countDays = () => window.dateCalculator.countDays();
window.calculateDateDifference = () => window.dateCalculator.countDays();
