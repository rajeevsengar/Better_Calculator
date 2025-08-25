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

// Function to populate text content from configuration file
function populateTextContent() {
  if (window.TEXT_CONFIG) {
    // Header and branding (Desktop)
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
      pageTitle.textContent = window.getText('header.title');
    }
    
    const builtWithLove = document.getElementById('builtWithLove');
    if (builtWithLove) {
      builtWithLove.textContent = window.getText('header.builtWithLove');
    }
    
    const brandName = document.getElementById('brandName');
    if (brandName) {
      brandName.textContent = window.getText('header.brandName');
    }
    
    const tagline = document.getElementById('tagline');
    if (tagline) {
      const firstLine = tagline.querySelector('.tagline-first');
      const secondLine = tagline.querySelector('.tagline-second');
      if (firstLine) firstLine.textContent = window.getText('header.tagline');
      if (secondLine) secondLine.textContent = window.getText('header.taglineSecond');
    }
    
    // Header and branding (Mobile)
    const mobileBrandName = document.querySelector('header h1');
    if (mobileBrandName && mobileBrandName.textContent === 'Calculator.net') {
      mobileBrandName.textContent = window.getText('header.brandName');
    }
    
    const mobileTagline = document.querySelector('header .tagline');
    if (mobileTagline) {
      const mobileFirstLine = mobileTagline.querySelector('.tagline-first');
      const mobileSecondLine = mobileTagline.querySelector('.tagline-second');
      if (mobileFirstLine) mobileFirstLine.textContent = window.getText('header.tagline');
      if (mobileSecondLine) mobileSecondLine.textContent = window.getText('header.taglineSecond');
    }
    
    // Menu items (Desktop)
    const menuItems = document.querySelectorAll('.menu .item');
    if (menuItems.length >= 6) {
      menuItems[0].textContent = window.getText('menu.unitConverter');
      menuItems[1].textContent = window.getText('menu.bmiCalculator');
      menuItems[2].textContent = window.getText('menu.dateCalculator');
      menuItems[3].textContent = window.getText('menu.timeCalculator');
      menuItems[4].textContent = window.getText('menu.emiCalculator');
      menuItems[5].textContent = window.getText('menu.investmentCalculator');
    } else if (menuItems.length >= 5) {
      // Backward compatibility (older layout without time calculator)
      menuItems[0].textContent = window.getText('menu.unitConverter');
      menuItems[1].textContent = window.getText('menu.bmiCalculator');
      menuItems[2].textContent = window.getText('menu.dateCalculator');
      menuItems[3].textContent = window.getText('menu.emiCalculator');
      menuItems[4].textContent = window.getText('menu.investmentCalculator');
    }
    
    // Menu items (Mobile)
    const mobileMenuItems = document.querySelectorAll('.mobile-item');
    if (mobileMenuItems.length >= 6) {
      const unitText = window.getText('menu.unitConverter').split('• ')[1];
      const bmiText = window.getText('menu.bmiCalculator').split('• ')[1];
      const dateText = window.getText('menu.dateCalculator').split('• ')[1];
      const timeText = window.getText('menu.timeCalculator').split('• ')[1];
      const emiText = window.getText('menu.emiCalculator').split('• ')[1];
      const investmentText = window.getText('menu.investmentCalculator').split('• ')[1];
      
      mobileMenuItems[0].textContent = `1 • ${unitText}`;
      mobileMenuItems[1].textContent = `2 • ${bmiText}`;
      mobileMenuItems[2].textContent = `3 • ${dateText}`;
      mobileMenuItems[3].textContent = `4 • ${timeText}`;
      mobileMenuItems[4].textContent = `5 • ${emiText}`;
      mobileMenuItems[5].textContent = `6 • ${investmentText}`;
    } else if (mobileMenuItems.length >= 5) {
      // Backward compatibility (older layout without time calculator)
      const unitText = window.getText('menu.unitConverter').split('• ')[1];
      const bmiText = window.getText('menu.bmiCalculator').split('• ')[1];
      const dateText = window.getText('menu.dateCalculator').split('• ')[1];
      const emiText = window.getText('menu.emiCalculator').split('• ')[1];
      const investmentText = window.getText('menu.investmentCalculator').split('• ')[1];
      
      mobileMenuItems[0].textContent = `1 • ${unitText}`;
      mobileMenuItems[1].textContent = `2 • ${bmiText}`;
      mobileMenuItems[2].textContent = `3 • ${dateText}`;
      mobileMenuItems[3].textContent = `4 • ${emiText}`;
      mobileMenuItems[4].textContent = `5 • ${investmentText}`;
    }
    
    // Theme switcher (Desktop)
    const themeLabel = document.getElementById('themeLabel');
    if (themeLabel) {
      themeLabel.textContent = window.getText('theme.label');
    }
    
    // Theme switcher (Mobile)
    const mobileThemeLabels = document.querySelectorAll('.theme-label');
    mobileThemeLabels.forEach(label => {
      if (label.textContent === 'Theme:') {
        label.textContent = window.getText('theme.label');
      }
    });
    
    // Ribbons
    const ribbonTips = document.getElementById('ribbonTips');
    if (ribbonTips) {
      ribbonTips.textContent = window.getText('ribbons.tips');
    }
    
    const ribbonInstructions = document.getElementById('ribbonInstructions');
    if (ribbonInstructions) {
      ribbonInstructions.textContent = window.getText('ribbons.instructions');
    }
    
    const ribbonExamples = document.getElementById('ribbonExamples');
    if (ribbonExamples) {
      ribbonExamples.textContent = window.getText('ribbons.examples');
    }
    
    // Unit Converter (Desktop)
    const fromLabel = document.querySelector('#conversion .card:first-child .card:first-child div:first-child');
    if (fromLabel) {
      fromLabel.textContent = window.getText('unitConverter.from');
    }
    
    const toLabel = document.querySelector('#conversion .card:first-child .card:nth-child(2) div:first-child');
    if (toLabel) {
      toLabel.textContent = window.getText('unitConverter.to');
    }
    
    const fromInput = document.getElementById('fromValue');
    if (fromInput) {
      fromInput.placeholder = window.getText('unitConverter.fromPlaceholder');
    }
    
    const toInput = document.getElementById('toValue');
    if (toInput) {
      toInput.placeholder = window.getText('unitConverter.toPlaceholder');
    }
    
    const swapButton = document.querySelector('button[onclick="swapUnits()"]');
    if (swapButton) {
      swapButton.textContent = window.getText('unitConverter.swapButton');
    }
    
    const modesInstruction = document.querySelector('#conversion .modes-card .muted');
    if (modesInstruction) {
      modesInstruction.textContent = window.getText('unitConverter.modesInstruction');
    }
    
    // Unit Converter (Mobile)
    const unitTypesTitle = document.getElementById('unitTypesTitle');
      if (unitTypesTitle) {
        unitTypesTitle.insertAdjacentHTML("beforeend", window.getText('unitConverter.title'));
    }
    
    const mobileModesInstruction = document.getElementById('modesInstruction');
    if (mobileModesInstruction) {
      mobileModesInstruction.textContent = window.getText('unitConverter.modesInstruction');
    }
    
    // Footer
    const footerTagline = document.querySelector('.footer-tagline');
    if (footerTagline) {
      footerTagline.textContent = window.getText('footer.tagline');
    }
    
    const footerHighlight = document.querySelector('.footer-highlight');
    if (footerHighlight) {
      footerHighlight.innerHTML = `${window.getText('footer.highlight')} <span id="emi-link" class="footer-link">${window.getText('footer.emiLink')}</span> ${window.getText('footer.highlightEnd')}`;
    }
    
    const footerEasterEgg = document.getElementById('falseEasterEgg');
    if (footerEasterEgg) {
      footerEasterEgg.innerHTML = window.getText('footer.easterEgg');
    }
    
    // Enhanced Mode Toggle (Desktop and Mobile)
    const enhancedToggleLabel = document.querySelector('.enhanced-toggle .toggle-label');
    if (enhancedToggleLabel) {
      enhancedToggleLabel.textContent = window.getText('date.enhancedMode');
    }
    
    // Site Facts Popup
    const siteFactsPopup = document.getElementById('siteFactsPopup');
    if (siteFactsPopup) {
      const factsHeader = siteFactsPopup.querySelector('.facts-header h3');
      if (factsHeader) {
        factsHeader.insertAdjacentHTML("beforeend", window.getText('easterEggs.siteFacts.title'));
      }
      
      const factsContent = siteFactsPopup.querySelector('.facts-content .story-section');
      if (factsContent) {
        // Clear existing content
        factsContent.innerHTML = '';
        
        // Add content from config
        const factsArray = window.getTextArray('easterEggs.siteFacts.content');
        factsArray.forEach(fact => {
          factsContent.insertAdjacentHTML("beforeend", fact);
        });
      }
    }
    
    // False Easter Egg Popup
    const falseEasterEggPopup = document.getElementById('falseEasterEggPopup');
    if (falseEasterEggPopup) {
      const falseHeader = falseEasterEggPopup.querySelector('.false-facts-header h3');
      if (falseHeader) {
        falseHeader.insertAdjacentHTML("beforeend", window.getText('easterEggs.falseEasterEgg.title'));
      }
      
      const falseContent = falseEasterEggPopup.querySelector('.false-facts-content');
      if (falseContent) {
        // Clear existing content
        falseContent.innerHTML = '';
        
        // Add content from config
        const falseArray = window.getTextArray('easterEggs.falseEasterEgg.content');
        falseArray.forEach(content => {
          falseContent.insertAdjacentHTML("beforeend", content);
        });
      }
    }
  } else {

  }
}

// Export globally
window.populateTextContent = populateTextContent;
window.convertUnit = convertUnit;
window.buildUnitChips = buildUnitChips;
window.updateChipSelection = updateChipSelection;
window.formatFtInField = formatFtInField;
window.getInchesFromFtIn = getInchesFromFtIn;
window.getFtInFromInches = getFtInFromInches;

let animateTime = 3000;
// Function to animate tagline between two lines
function animateTagline() {
  const taglines = document.querySelectorAll('.tagline');

  taglines.forEach(tagline => {
    // Start with first line visible
    tagline.classList.remove('animate');
    // After animateTime, show second line
    setTimeout(() => {
      tagline.classList.add('animate');
    }, animateTime);
    
    // After animateTime * 2, show first line
    setTimeout(() => {
      tagline.classList.remove('animate');
    }, animateTime * 2);

  });
}

// Auto-start tagline animation
window.addEventListener('load', () => {
  // Start animation after a short delay
  setTimeout(animateTagline, 100);
  
  // Repeat animation every cycle time + transition time (set in CSS)
  setInterval(animateTagline, animateTime * 2 + 1000);
});

  // Manual trigger for theme synchronization
window.triggerTaglineAnimation = animateTagline;

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

// Timezone functions moved to timezone-utils.js

// Helper function to get text by path (e.g., "unitConverter.from" returns "From")
window.getText = function(path) {
  const keys = path.split('.');
  let value = window.TEXT_CONFIG;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
  
      return path; // Return the path as fallback
    }
  }
  
  return value;
};

// Helper function to get text array by path
window.getTextArray = function(path) {
  const value = window.getText(path);
  return Array.isArray(value) ? value : [value];
};
