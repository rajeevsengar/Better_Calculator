// Unified responsive functionality for Pro Multi-Calculator
// script.js
window.addEventListener('load', () => {
  ensureThemeApplied();
});

// Fallback theme initialization
function ensureThemeApplied() {
  // Check if theme is already applied
  if (!document.documentElement.hasAttribute('data-theme')) {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('Fallback theme applied:', savedTheme);
  }
  
  // Ensure body is visible
  if (!document.body.hasAttribute('data-theme-applied')) {
    document.body.setAttribute('data-theme-applied', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing responsive functionality');
  initializeResponsiveFunctionality();
});

// Unified responsive functionality for both mobile and desktop
function initializeResponsiveFunctionality() {
  initializeResponsiveNavigation();
  console.log('Responsive functionality initialized successfully');
}

// Lazy load calculator scripts only when needed
function loadCalculatorScript(calculatorName) {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window[calculatorName]) {
      resolve(window[calculatorName]);
      return;
    }

    // Define script paths for each calculator
    const scriptPaths = {
      'UnitConverter': 'unit-converter/unit-converter.js',
      'BMICalculator': 'bmi-calculator/bmi-calculator.js',
      'EMI': 'emi-calculator/emi-calculator.js',
      'Investment': 'investment-calculator/investment-calculator.js',
      'DateCalculator': 'date-calculator/date-calculator.js',
      'timezone_calculator': 'timezone_calculator/timezone_calculator.js'
    };

    const scriptPath = scriptPaths[calculatorName];
    if (!scriptPath) {
      reject(new Error(`Unknown calculator: ${calculatorName}`));
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = scriptPath;
    script.onload = () => {
      console.log(`✅ ${calculatorName} script loaded successfully`);
      resolve(window[calculatorName]);
    };
    script.onerror = () => {
      console.error(`❌ Failed to load ${calculatorName} script`);
      reject(new Error(`Failed to load ${calculatorName} script`));
    };
    
    document.head.appendChild(script);
  });
}

// Load web components when needed
function loadWebComponents() {
  return new Promise((resolve) => {
    const components = [
      'components/date-input/date-input.js',
      'components/time-input/time-input.js',
      'components/searchable-select/searchable-select.js'
    ];

    let loadedCount = 0;
    const totalComponents = components.length;

    components.forEach(componentPath => {
      const script = document.createElement('script');
      script.src = componentPath;
      script.onload = () => {
        loadedCount++;
        if (loadedCount === totalComponents) {
          console.log('✅ All web components loaded');
          resolve();
        }
      };
      script.onerror = () => {
        console.warn(`⚠️ Failed to load web component: ${componentPath}`);
        loadedCount++;
        if (loadedCount === totalComponents) {
          resolve();
        }
      };
      document.head.appendChild(script);
    });
  });
}

// Show loading indicator for calculator
function showCalculatorLoading(panelId) {
  const section = document.getElementById(panelId);
  if (section) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = `${panelId}-loading`;
    loadingDiv.className = 'calculator-loading';
    loadingDiv.innerHTML = `
      <div class="loading-spinner"></div>
      <p>Loading calculator...</p>
    `;
    
    section.appendChild(loadingDiv);
  }
}

// Hide loading indicator for calculator
function hideCalculatorLoading(panelId) {
  const loadingDiv = document.getElementById(`${panelId}-loading`);
  if (loadingDiv) {
    loadingDiv.remove();
  }
}


// Initialize responsive navigation
function initializeResponsiveNavigation() {
  // Handle window resize for responsive behavior
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      handleResponsiveLayout();
    }, 250);
  });
  
  // Initial responsive layout check
  handleResponsiveLayout();
}

// Handle responsive layout changes
function handleResponsiveLayout() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  // Update body class for CSS targeting
  document.body.classList.toggle('mobile-layout', isMobile);
  document.body.classList.toggle('desktop-layout', !isMobile);
}

// Date Calculator Tab Functionality - works for both desktop and mobile
function initializeDateTabs() {
  // Initialize date calculator tabs
  initializeCalculatorTabs('.date-tabs');
  
  // Initialize time calculator tabs
  initializeCalculatorTabs('.time-tabs');
}

// Generic calculator tab initialization function
function initializeCalculatorTabs(selector) {
  const tabButtons = document.querySelectorAll(`${selector} .tab-button`);
  const tabContents = document.querySelectorAll(`${selector} .tab-content`);
  
  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Find the parent calculator container
        const parentContainer = button.closest(selector);
        if (!parentContainer) return;
        
        // Remove active class from all tab buttons and contents in this container
        const parentTabButtons = parentContainer.querySelectorAll('.tab-button');
        const parentTabContents = parentContainer.querySelectorAll('.tab-content');
        
        parentTabButtons.forEach(btn => btn.classList.remove('active'));
        parentTabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }
}

// Text content is now populated from util.js

// Theme switcher functionality is now handled by the theme-selector web component

// Provide global wrappers for EMI actions used by HTML buttons
window.generateAmortizationSchedule = function() {
  if (window.EMI && typeof window.EMI.generateAmortizationSchedule === 'function') {
    window.EMI.generateAmortizationSchedule();
  }
};

window.clearEMI = function() {
  if (window.EMI && typeof window.EMI.clearEMI === 'function') {
    window.EMI.clearEMI();
  }
};

// Site Facts Easter Egg
let logoClickCount = 0;
let logoClickTimer = null;

function setupSiteLogo() {
  // Check if we're on mobile - use media query instead of DOM element
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  // Try multiple selectors to find the logo, with ID being the most reliable
  const siteLogo = document.getElementById('siteLogo') ||
                   document.querySelector('.header2 .brand img') || 
                   document.querySelector('.header2 img[src*="site_logo"]') ||
                   document.querySelector('img[src*="site_logo"]');
  
  if (!siteLogo) {
    // Try to find it after a longer delay
    setTimeout(function() {
      const delayedLogo = document.getElementById('siteLogo') || 
                          document.querySelector('.header2 .brand img');
      if (delayedLogo) {
        setupLogoEventListeners(delayedLogo);
      }
    }, 2000);
    
    return;
  }
  
  setupLogoEventListeners(siteLogo);
}

function setupLogoEventListeners(siteLogo) {
  siteLogo.style.cursor = 'pointer';
  siteLogo.title = 'Triple-click me for a surprise!';
  
  // Add visual feedback on hover
  siteLogo.style.transition = 'transform 0.2s ease, filter 0.2s ease';
  siteLogo.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  
  siteLogo.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
  
  siteLogo.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    logoClickCount++;
    
    if (logoClickCount === 1) {
      logoClickTimer = setTimeout(() => {
        logoClickCount = 0;
      }, 500);
    }
  });
}
