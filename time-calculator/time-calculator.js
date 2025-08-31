// Time Calculator - Main Script
"use strict";



// Create global namespace
window.TimeCalculator = window.TimeCalculator || {};

function initializeTimeCalculator() {
  console.log('Time Calculator initialized');
  
  // Initialize timezone converter
  initializeTimezoneConverter();
  
  // Initialize time difference calculator
  initializeTimeDifference();
  
  // Initialize time arithmetic
  initializeTimeArithmetic();
  
  // Set up tab switching
  setupTabs();
}

window.TimeCalculator.initializeTimeCalculator = initializeTimeCalculator;

function initializeTimezoneConverter() {
  const convertBtn = document.getElementById('convertTimezoneBtn');
  if (convertBtn) {
    convertBtn.addEventListener('click', convertTimezone);
  }
}

function initializeTimeDifference() {
  const calculateBtn = document.getElementById('calculateTimeDiffBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateTimeDifference);
  }
}

function initializeTimeArithmetic() {
  const calculateBtn = document.getElementById('calculateTimeBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateTimeArithmetic);
  }
}

function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      
      // Remove active class from all tabs and contents
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      btn.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });
}

function convertTimezone() {
  const fromTimezone = document.getElementById('fromTimezone').value;
  const toTimezone = document.getElementById('toTimezone').value;
  const timeInput = document.getElementById('timeInput').value;
  
  if (!fromTimezone || !toTimezone || !timeInput) {
    alert('Please fill in all fields');
    return;
  }
  
  // Simple timezone conversion logic (placeholder)
  const result = `Converted time from ${fromTimezone} to ${toTimezone}`;
  document.getElementById('timezoneResult').textContent = result;
  document.querySelector('#timezone-tab .results-section').style.display = 'block';
}

function calculateTimeDifference() {
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  
  if (!startTime || !endTime) {
    alert('Please enter both start and end times');
    return;
  }
  
  // Simple time difference calculation (placeholder)
  const result = `Time difference: ${startTime} to ${endTime}`;
  document.getElementById('timeDiffResult').textContent = result;
  document.querySelector('#time-diff-tab .results-section').style.display = 'block';
}

function calculateTimeArithmetic() {
  const baseTime = document.getElementById('baseTime').value;
  const operation = document.getElementById('operation').value;
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  
  if (!baseTime) {
    alert('Please enter a base time');
    return;
  }
  
  // Simple time arithmetic (placeholder)
  const result = `${operation === 'add' ? 'Added' : 'Subtracted'} ${hours}h ${minutes}m to ${baseTime}`;
  document.getElementById('timeResult').textContent = result;
  document.querySelector('#time-arithmetic-tab .results-section').style.display = 'block';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (window.TimeCalculator && window.TimeCalculator.initializeTimeCalculator) {
    window.TimeCalculator.initializeTimeCalculator();
  } else {
    console.error('Time Calculator not found or initializeTimeCalculator not available');
  }
});
