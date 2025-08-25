// Time Calculator - Simple Timezone Converter Implementation
"use strict";

class TimeCalculator {
  constructor() {
    this.initializeElements();
    this.bindEvents();
  }

  initializeElements() {
    // Left column elements
    this.fromTimezone = document.querySelector('timezone-input[id="fromTimezone_tzConverter"]');
    this.fromTime = document.querySelector('time-input[id="fromTime_tzConverter"]');
    this.fromDate = document.querySelector('date-input[id="fromDate_tzConverter"]');
    
    // Right column elements
    this.toTimezone = document.querySelector('timezone-input[id="toTimezone_tzConverter"]');
    this.toTime = document.querySelector('time-input[id="toTime_tzConverter"]');
    this.toDate = document.querySelector('date-input[id="toDate_tzConverter"]');
  }

  bindEvents() {
    // Listen for changes in left column
    if (this.fromTimezone) {
      this.fromTimezone.addEventListener('change', () => this.convertFromLeftToRight());
    }
    if (this.fromTime) {
      this.fromTime.addEventListener('timeChanged', () => this.convertFromLeftToRight());
    }
    if (this.fromDate) {
      this.fromDate.addEventListener('dateChange', () => this.convertFromLeftToRight());
    }

    // Listen for changes in right column
    if (this.toTimezone) {
      this.toTimezone.addEventListener('change', () => this.convertFromRightToLeft());
    }
    if (this.toTime) {
      this.toTime.addEventListener('timeChanged', () => this.convertFromRightToLeft());
    }
    if (this.toDate) {
      this.toDate.addEventListener('dateChange', () => this.convertFromRightToLeft());
    }
  }

  convertFromLeftToRight() {
    if (!this.fromTimezone || !this.fromTime || !this.fromDate) return;
    
    const fromTz = this.fromTimezone.getValue();
    const fromTime = this.fromTime.getValue();
    const fromDate = this.fromDate.value;
    
    if (!fromTz || !fromTime || !fromDate) return;
    
    const convertedDateTime = this.convertDateTime(fromDate, fromTime, fromTz, this.toTimezone.getValue());
    if (convertedDateTime) {
      this.updateRightColumn(convertedDateTime);
    }
  }

  convertFromRightToLeft() {
    if (!this.toTimezone || !this.toTime || !this.toDate) return;
    
    const toTz = this.toTimezone.getValue();
    const toTime = this.toTime.getValue();
    const toDate = this.toDate.value;
    
    if (!toTz || !toTime || !toDate) return;
    
    const convertedDateTime = this.convertDateTime(toDate, toTime, toTz, this.fromTimezone.getValue());
    if (convertedDateTime) {
      this.updateLeftColumn(convertedDateTime);
    }
  }

  convertDateTime(dateStr, timeStr, fromTz, toTz) {
    if (!fromTz || !toTz || !dateStr || !timeStr) return null;
    debugger
    try {
      // Parse date and time
      const [year, month, day] = dateStr.split('-').map(n => parseInt(n, 10));
      const [hour, minute] = timeStr.split(':').map(n => parseInt(n, 10));
      
      // Create a Date object by combining date and time
      const sourceDate = new Date(year, month - 1, day, hour, minute, 0);
      
      // Get timezone offsets
      const fromOffset = this.getTimezoneOffset(fromTz, sourceDate);
      const toOffset = this.getTimezoneOffset(toTz, sourceDate);
      
      // Calculate the difference in offsets and apply it
      const offsetDiff = toOffset - fromOffset;
      const targetDate = new Date(sourceDate);
      targetDate.setMinutes(targetDate.getMinutes() + offsetDiff);
      
      // Return the converted date and time
      return {
        date: targetDate.toLocaleDateString('en-CA'), // YYYY-MM-DD format
        time: targetDate.toTimeString().slice(0, 5)
      };
    } catch (error) {
      console.error('Error converting timezone:', error);
      return null;
    }
  }

  getTimezoneOffset(timezone, date) {
    if (timezone === 'local') {
      return -date.getTimezoneOffset();
    }
    
    if (timezone === 'UTC') {
      return 0;
    }
    
    // Use the timezone-input component's getTimezoneInfo method
    try {
      // We can use either timezone component to get the info
      const tzInfo = this.fromTimezone.getTimezoneInfo(timezone);
      return tzInfo.offsetMinutes || 0;
    } catch (error) {
      console.error(`Error getting timezone offset for ${timezone}:`, error);
      return 0;
    }
  }

  updateRightColumn(convertedDateTime) {
    if (this.toDate && convertedDateTime.date) {
      this.toDate.value = convertedDateTime.date;
    }
    if (this.toTime && convertedDateTime.time) {
      this.toTime.setValue(convertedDateTime.time);
    }
  }

  updateLeftColumn(convertedDateTime) {
    if (this.fromDate && convertedDateTime.date) {
      this.fromDate.value = convertedDateTime.date;
    }
    if (this.fromTime && convertedDateTime.time) {
      this.fromTime.setValue(convertedDateTime.time);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.timeCalculator = new TimeCalculator();
}); 