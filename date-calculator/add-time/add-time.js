// Add Time Calculator - Add/Subtract Time from Time
"use strict";

// Create global namespace
window.TimeCalculator = window.TimeCalculator || {};

function initializeTimeCalculator() {
  console.log('Add Time Calculator initialized');
  
  // Initialize enhanced mode toggle
  initializeEnhancedMode();
  
  // Initialize time arithmetic
  initializeTimeArithmetic();
  
  // Initialize chip selection
  initializeChipSelection();
}

window.TimeCalculator.initializeTimeCalculator = initializeTimeCalculator;

function initializeEnhancedMode() {
  const enhancedToggle = document.getElementById('addTimeEnhancedToggle');
  const baseDate = document.getElementById('baseDate');
  const baseTimezone = document.getElementById('baseTimezone');
  
  if (enhancedToggle) {
    enhancedToggle.addEventListener('change', function() {
      if (this.checked) {
        if (baseDate) baseDate.style.display = 'block';
        if (baseTimezone) baseTimezone.style.display = 'block';
      } else {
        if (baseDate) baseDate.style.display = 'none';
        if (baseTimezone) baseTimezone.style.display = 'none';
      }
    });
  }
}

function initializeTimeArithmetic() {
  // This function is called when the page loads
  // The actual calculation is handled by addSubtractTime() function
}

function initializeChipSelection() {
  const chips = document.querySelectorAll('#deltaSignChips .chip');
  
  chips.forEach(chip => {
    chip.addEventListener('click', function() {
      // Remove selected class from all chips
      chips.forEach(c => c.classList.remove('selected'));
      // Add selected class to clicked chip
      this.classList.add('selected');
    });
  });
}

function addSubtractTime() {
  const baseTime = document.getElementById('baseTime');
  const baseDate = document.getElementById('baseDate');
  const baseTimezone = document.getElementById('baseTimezone');
  const deltaHours = document.getElementById('deltaHours');
  const deltaMinutes = document.getElementById('deltaMinutes');
  const deltaSeconds = document.getElementById('deltaSeconds');
  const enhancedToggle = document.getElementById('addTimeEnhancedToggle');
  
  const resultContainer = document.getElementById('timeResultContainer1');
  const resultDiv = document.getElementById('timeMathRes');
  
  try {
    // Get base time value
    const baseTimeValue = baseTime ? baseTime.value : '';
    
    if (!baseTimeValue) {
      alert('Please enter a base time');
      return;
    }
    
    // Get delta values
    const hours = parseInt(deltaHours ? deltaHours.value : 0) || 0;
    const minutes = parseInt(deltaMinutes ? deltaMinutes.value : 0) || 0;
    const seconds = parseInt(deltaSeconds ? deltaSeconds.value : 0) || 0;
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert('Please enter at least one time value to add/subtract');
      return;
    }
    
    // Get operation (add or subtract)
    const selectedChip = document.querySelector('#deltaSignChips .chip.selected');
    const operation = selectedChip ? selectedChip.dataset.value : 'add';
    
    let baseDateTime;
    
    if (enhancedToggle && enhancedToggle.checked) {
      // Enhanced mode - use date and timezone
      const baseDateValue = baseDate ? baseDate.value : '';
      const baseTzValue = baseTimezone ? baseTimezone.value : '';
      
      if (!baseDateValue || !baseTzValue) {
        alert('Please fill in all fields for enhanced mode');
        return;
      }
      
      // Create Date object with timezone consideration
      baseDateTime = new Date(`${baseDateValue}T${baseTimeValue}`);
      
      // Apply timezone offset (simplified - in real implementation, use proper timezone library)
      const baseTzOffset = getTimezoneOffset(baseTzValue);
      baseDateTime.setMinutes(baseDateTime.getMinutes() - baseTzOffset);
    } else {
      // Simple mode - use current date
      const today = new Date().toISOString().split('T')[0];
      baseDateTime = new Date(`${today}T${baseTimeValue}`);
    }
    
    // Calculate result
    const deltaMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
    const resultDateTime = new Date(baseDateTime.getTime() + (operation === 'add' ? deltaMs : -deltaMs));
    
    // Display result
    displayTimeResult(baseDateTime, resultDateTime, operation, hours, minutes, seconds);
    
    resultContainer.style.display = 'block';
    
  } catch (error) {
    console.error('Error calculating time arithmetic:', error);
    resultDiv.innerHTML = '<div class="error">Error calculating time arithmetic. Please check your inputs.</div>';
    resultContainer.style.display = 'block';
  }
}

function displayTimeResult(baseDateTime, resultDateTime, operation, hours, minutes, seconds) {
  const resultDiv = document.getElementById('timeMathRes');
  
  const baseTimeStr = baseDateTime.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  const resultTimeStr = resultDateTime.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
  
  const baseDateStr = baseDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const resultDateStr = resultDateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  let resultHTML = '<div class="time-arithmetic-result">';
  resultHTML += '<h3>Time Calculation Result</h3>';
  
  resultHTML += '<div class="calculation-breakdown">';
  resultHTML += `<div class="base-time"><strong>Base Time:</strong> ${baseTimeStr} (${baseDateStr})</div>`;
  resultHTML += `<div class="operation"><strong>Operation:</strong> ${operation === 'add' ? 'Add' : 'Subtract'} ${formatTimeDelta(hours, minutes, seconds)}</div>`;
  resultHTML += `<div class="result-time"><strong>Result:</strong> ${resultTimeStr} (${resultDateStr})</div>`;
  resultHTML += '</div>';
  
  // Check if result is on a different day
  if (baseDateTime.toDateString() !== resultDateTime.toDateString()) {
    const dayDiff = Math.floor((resultDateTime.getTime() - baseDateTime.getTime()) / (1000 * 60 * 60 * 24));
    if (dayDiff > 0) {
      resultHTML += `<div class="day-note">Result is ${dayDiff} day${dayDiff !== 1 ? 's' : ''} later</div>`;
    } else {
      resultHTML += `<div class="day-note">Result is ${Math.abs(dayDiff)} day${Math.abs(dayDiff) !== 1 ? 's' : ''} earlier</div>`;
    }
  }
  
  resultHTML += '</div>';
  
  resultDiv.innerHTML = resultHTML;
}

function formatTimeDelta(hours, minutes, seconds) {
  let parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  return parts.join(' ');
}

function clearAddTime() {
  // Clear time inputs
  const baseTime = document.getElementById('baseTime');
  const baseDate = document.getElementById('baseDate');
  const baseTimezone = document.getElementById('baseTimezone');
  const deltaHours = document.getElementById('deltaHours');
  const deltaMinutes = document.getElementById('deltaMinutes');
  const deltaSeconds = document.getElementById('deltaSeconds');
  
  if (baseTime) baseTime.value = '';
  if (baseDate) baseDate.value = '';
  if (baseTimezone) baseTimezone.value = '';
  if (deltaHours) deltaHours.value = '';
  if (deltaMinutes) deltaMinutes.value = '';
  if (deltaSeconds) deltaSeconds.value = '';
  
  // Reset operation to add
  const addChip = document.querySelector('#deltaSignChips .chip[data-value="add"]');
  const subtractChip = document.querySelector('#deltaSignChips .chip[data-value="subtract"]');
  if (addChip) addChip.classList.add('selected');
  if (subtractChip) subtractChip.classList.remove('selected');
  
  // Hide result
  const resultContainer = document.getElementById('timeResultContainer1');
  if (resultContainer) {
    resultContainer.style.display = 'none';
  }
}

// Helper function to get timezone offset (simplified)
function getTimezoneOffset(timezone) {
  // This is a simplified implementation
  // In a real application, you would use a proper timezone library like moment-timezone
  const timezoneOffsets = {
    'UTC': 0,
    'GMT': 0,
    'EST': 300, // UTC-5
    'PST': 480, // UTC-8
    'IST': -330, // UTC+5:30
    'JST': -540, // UTC+9
  };
  
  return timezoneOffsets[timezone] || 0;
}
