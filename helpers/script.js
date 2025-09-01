// Unified responsive functionality for Pro Multi-Calculator
// script.js
window.addEventListener('load', () => {
  // Ensure theme is applied even if component fails
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
  // Initialize unified responsive functionality
  initializeResponsiveFunctionality();
});

// Unified responsive functionality for both mobile and desktop
function initializeResponsiveFunctionality() {
  console.log('Initializing responsive functionality...');
  
  // Theme switcher is now handled by the theme-selector web component
  
  
  // Mobile menu is now handled by the site-header web component
  
  // Initialize responsive navigation
  initializeResponsiveNavigation();
  
  // Export functions for global access
  
  
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

// Unified panel system
// function initializePanelSystem() {
//   console.log('Initializing panel system...');
//   const menuItems = document.querySelectorAll('.menu .item, .mobile-item');
//   const sections = document.querySelectorAll('main.panel .container > section');

//   console.log('Found menu items:', menuItems.length);
//   console.log('Found sections:', sections.length);

//   if (menuItems.length > 0) {
//     menuItems.forEach(item => {
//       item.addEventListener('click', () => {
//         console.log('Menu item clicked:', item.dataset.panel);
//         showPanel(item.dataset.panel);
//       });
//     });

//     // Ensure initial state matches the active menu item
//     const initial = document.querySelector('.menu .item.active, .mobile-item.active') || menuItems[0];
//     if (initial) {
//       console.log('Setting initial panel:', initial.dataset.panel);
//       showPanel(initial.dataset.panel);
//     }
//   }
// }

// // Unified panel switching function
// function showPanel(panelId) {
//   console.log('Showing panel:', panelId);
  
//   const menuItems = document.querySelectorAll('.menu .item, .mobile-item');
//   const sections = document.querySelectorAll('main.panel .container > section');
  
//   console.log('Found sections:', sections.length);
//   sections.forEach((section, index) => {
//     console.log(`Section ${index}:`, section.id, 'classes:', section.className);
//   });
  
//   // Highlight menu items
//   menuItems.forEach(m => m.classList.toggle('active', m.dataset.panel === panelId));

//   // Hide all sections
//   sections.forEach(s => {
//     console.log(`Hiding section: ${s.id}`);
//     s.classList.remove('active-section');
//   });

//   // Show target section
//   const target = document.getElementById(panelId);
//   if (!target) {
//     console.error('Panel not found:', panelId);
//     return;
//   }
  
//   console.log(`Showing target section: ${panelId}`);
//   target.classList.add('active-section');

//   // Check if section is now visible
//   setTimeout(() => {
//     const isVisible = target.classList.contains('active-section');
//     const computedStyle = window.getComputedStyle(target);
//     console.log(`Section ${panelId} visibility:`, {
//       hasActiveClass: isVisible,
//       display: computedStyle.display,
//       opacity: computedStyle.opacity,
//       visibility: computedStyle.visibility
//     });
//   }, 100);

//   // Initialize calculators lazily
//   console.log('Initializing calculators for panel:', panelId);
//   initializePanelCalculators(panelId);


  
//   // Mobile menu is now handled by the site-header web component
// }

// // Unified calculator initialization with lazy loading
// async function initializePanelCalculators(panelId) {
//   console.log('Initializing calculators for panel:', panelId);
  
//   // Show loading indicator
//   showCalculatorLoading(panelId);
  
//   try {
//     switch (panelId) {
//       case 'emi':
//         console.log('Loading EMI calculator...');
//         const emiCalculator = await loadCalculatorScript('EMI');
//         if (emiCalculator && emiCalculator.initializeEMICalculator) {
//           emiCalculator.initializeEMICalculator();
//           console.log('EMI calculator initialized successfully');
//         } else {
//           console.error('EMI calculator not found or initializeEMICalculator not available');
//         }
//         break;
        
//       case 'investment':
//         console.log('Loading Investment calculator...');
//         const investmentCalculator = await loadCalculatorScript('Investment');
//         if (investmentCalculator && investmentCalculator.initializeInvestmentCalculator) {
//           investmentCalculator.initializeInvestmentCalculator();
//           console.log('Investment calculator initialized successfully');
//         } else {
//           console.error('Investment calculator not found or initializeInvestmentCalculator not available');
//         }
//         break;
        
//       case 'conversion':
//       case 'unit':
//         console.log('Loading Unit Converter...');
//         const unitConverter = await loadCalculatorScript('UnitConverter');
//         if (unitConverter && unitConverter.initializeUnitConverter) {
//           unitConverter.initializeUnitConverter();
//           console.log('Unit Converter initialized successfully');
//         } else {
//           console.error('Unit Converter not found or initializeUnitConverter not available');
//         }
//         break;
        
//       case 'date':
//         console.log('Loading Date Calculator...');
//         // Load web components first for date calculator
//         await loadWebComponents();
//         const dateCalculator = await loadCalculatorScript('DateCalculator');
//         if (dateCalculator && dateCalculator.initializeDateCalculator) {
//           dateCalculator.initializeDateCalculator();
//           console.log('Date Calculator initialized successfully');
//         } else if (window.dateCalculator) {
//           // Alternative: check if instance already exists
//           console.log('Date Calculator instance already exists');
//         } else {
//           console.error('Date Calculator not found or initializeDateCalculator not available');
//         }
//         break;
        
//       case 'time':
//         console.log('Loading Time Calculator...');
//         // Load web components first for time calculator
//         await loadWebComponents();
//         const timeCalculator = await loadCalculatorScript('DateCalculator');
//         if (timeCalculator && timeCalculator.initializeDateCalculator) {
//           timeCalculator.initializeDateCalculator();
//           console.log('Time Calculator initialized successfully');
//         } else if (window.dateCalculator) {
//           // Alternative: check if instance already exists
//           console.log('Date Calculator instance already exists');
//         } else {
//           console.error('Date Calculator not found or initializeDateCalculator not available');
//         }
//         break;
        
//       case 'bmi':
//         console.log('Loading BMI Calculator...');
//         const bmiCalculator = await loadCalculatorScript('BMICalculator');
//         if (bmiCalculator && bmiCalculator.initializeBMICalculator) {
//           bmiCalculator.initializeBMICalculator();
          
//           // Initialize speedometer after a short delay to ensure DOM is ready
//           setTimeout(() => {
//             if (bmiCalculator && bmiCalculator.updateSpeedometer) {
//               console.log('Initializing BMI speedometer...');
//               // Use safe update if available, otherwise use regular update
//               if (bmiCalculator.safeUpdateSpeedometer) {
//                 bmiCalculator.safeUpdateSpeedometer(0);
//               }
//               // Removed the fallback call that was causing the error
//             }
//           }, 100);
          
//           console.log('BMI Calculator initialized successfully');
//         } else {
//           console.error('BMI Calculator not found or initializeEMICalculator not available');
//         }
//         break;
        
//       default:
//         console.log('No calculator initialization for panel:', panelId);
//     }
//   } catch (error) {
//     console.error(`Error initializing calculator for panel ${panelId}:`, error);
//   } finally {
//     // Hide loading indicator
//     hideCalculatorLoading(panelId);
//   }
// }

// Mobile menu functionality is now handled by the site-header web component

// Mobile menu open/close functions are now handled by the site-header web component

// Mobile menu close function is now handled by the site-header web component

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
  // Check if we're on mobile - use media query instead of DOM element
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  // Update body class for CSS targeting
  document.body.classList.toggle('mobile-layout', isMobile);
  document.body.classList.toggle('desktop-layout', !isMobile);
  
  // Debug grid layout on mobile
  // if (isMobile) {
  //   debugGridLayout();
  //   // Force mobile layout to ensure it's applied
  //   setTimeout(() => forceMobileLayout(), 100);
  // }
  
  // Mobile menu is now handled by the site-header web component
}

// Debug function to check grid layout
// function debugGridLayout() {
//   console.log('=== Mobile Grid Layout Debug ===');
  
//   const container = document.querySelector('.container');
//   if (container) {
//     const computedStyle = window.getComputedStyle(container);
//     console.log('Container grid:', {
//       display: computedStyle.display,
//       gridTemplateColumns: computedStyle.gridTemplateColumns,
//       width: computedStyle.width,
//       maxWidth: computedStyle.maxWidth
//     });
//   }
  
//   const conversionGrids = document.querySelectorAll('.conversion-grid');
//   conversionGrids.forEach((grid, index) => {
//     const computedStyle = window.getComputedStyle(grid);
//     console.log(`Conversion grid ${index}:`, {
//       display: computedStyle.display,
//       gridTemplateColumns: computedStyle.gridTemplateColumns,
//       width: computedStyle.width
//     });
//   });
  
//   const conversionCols = document.querySelectorAll('.conversion-col');
//   conversionCols.forEach((col, index) => {
//     const computedStyle = window.getComputedStyle(col);
//     console.log(`Conversion col ${index}:`, {
//       display: computedStyle.display,
//       gridColumn: computedStyle.gridColumn,
//       width: computedStyle.width
//     });
//   });
  
//   console.log('=== End Debug ===');
// }

// Force mobile layout when CSS isn't sufficient
// function forceMobileLayout() {
//   console.log('Forcing mobile layout...');
  
//   const container = document.querySelector('.container');
//   if (container) {
//     container.style.gridTemplateColumns = '1fr';
//     container.style.gap = '16px';
//     container.style.maxWidth = '100%';
//     container.style.padding = '0 16px';
//   }
  
//   const conversionGrids = document.querySelectorAll('.conversion-grid');
//   conversionGrids.forEach(grid => {
//     grid.style.gridTemplateColumns = '1fr';
//     grid.style.gap = '16px';
//   });
  
//   const conversionCols = document.querySelectorAll('.conversion-col');
//   conversionCols.forEach(col => {
//     col.style.gridColumn = '1';
//     col.style.width = '100%';
//     col.style.minWidth = '0';
//   });
  
//   console.log('Mobile layout forced');
// }

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

// Theme synchronization is now handled by the theme-selector web component
