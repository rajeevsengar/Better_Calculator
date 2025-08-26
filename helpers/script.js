// Unified responsive functionality for Pro Multi-Calculator
// script.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Initializing responsive functionality');
  // Initialize unified responsive functionality
  initializeResponsiveFunctionality();
});

// Unified responsive functionality for both mobile and desktop
function initializeResponsiveFunctionality() {
  console.log('Initializing responsive functionality...');
  
  // Verify calculator scripts are loaded
  verifyCalculatorScripts();
  
  // Initialize theme switcher
  initializeThemeSwitcher();
  
  // Populate text content from configuration
  populateTextContent();
  
  // Initialize date calculator tabs
  initializeDateTabs();
  
  // Initialize panel functionality
  initializePanelSystem();
  
  // Initialize mobile menu (if on mobile)
  initializeMobileMenu();
  
  // Initialize responsive navigation
  initializeResponsiveNavigation();
  
  // Export functions for global access
  window.setupRibbons = setupRibbons;
  
  console.log('Responsive functionality initialized successfully');
}

// Verify that all calculator scripts are loaded
function verifyCalculatorScripts() {
  console.log('Verifying calculator scripts...');
  
  const calculators = {
    'UnitConverter': window.UnitConverter,
    'BMICalculator': window.BMICalculator,
    'EMI': window.EMI,
    'Investment': window.Investment,
    'DateCalculator': window.DateCalculator || window.dateCalculator
  };
  
  Object.entries(calculators).forEach(([name, calculator]) => {
    if (calculator) {
      console.log(`✅ ${name} loaded successfully`);
    } else {
      console.error(`❌ ${name} NOT loaded`);
    }
  });
}

// Unified panel system
function initializePanelSystem() {
  console.log('Initializing panel system...');
  const menuItems = document.querySelectorAll('.menu .item, .mobile-item');
  const sections = document.querySelectorAll('main.panel .container > section');

  console.log('Found menu items:', menuItems.length);
  console.log('Found sections:', sections.length);

  if (menuItems.length > 0) {
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        console.log('Menu item clicked:', item.dataset.panel);
        showPanel(item.dataset.panel);
      });
    });

    // Ensure initial state matches the active menu item
    const initial = document.querySelector('.menu .item.active, .mobile-item.active') || menuItems[0];
    if (initial) {
      console.log('Setting initial panel:', initial.dataset.panel);
      showPanel(initial.dataset.panel);
    }
  }
}

// Unified panel switching function
function showPanel(panelId) {
  console.log('Showing panel:', panelId);
  
  const menuItems = document.querySelectorAll('.menu .item, .mobile-item');
  const sections = document.querySelectorAll('main.panel .container > section');
  
  console.log('Found sections:', sections.length);
  sections.forEach((section, index) => {
    console.log(`Section ${index}:`, section.id, 'classes:', section.className);
  });
  
  // Highlight menu items
  menuItems.forEach(m => m.classList.toggle('active', m.dataset.panel === panelId));

  // Hide all sections
  sections.forEach(s => {
    console.log(`Hiding section: ${s.id}`);
    s.classList.remove('active-section');
  });

  // Show target section
  const target = document.getElementById(panelId);
  if (!target) {
    console.error('Panel not found:', panelId);
    return;
  }
  
  console.log(`Showing target section: ${panelId}`);
  target.classList.add('active-section');

  // Check if section is now visible
  setTimeout(() => {
    const isVisible = target.classList.contains('active-section');
    const computedStyle = window.getComputedStyle(target);
    console.log(`Section ${panelId} visibility:`, {
      hasActiveClass: isVisible,
      display: computedStyle.display,
      opacity: computedStyle.opacity,
      visibility: computedStyle.visibility
    });
  }, 100);

  // Initialize calculators lazily
  console.log('Initializing calculators for panel:', panelId);
  initializePanelCalculators(panelId);

  // Setup ribbons
  setupRibbons(panelId);
  
  // Close mobile menu if open
  closeMobileMenu();
}

// Unified calculator initialization
function initializePanelCalculators(panelId) {
  console.log('Initializing calculators for panel:', panelId);
  
  switch (panelId) {
    case 'emi':
      console.log('Initializing EMI calculator...');
      if (window.EMI && window.EMI.initializeEMICalculator) {
        window.EMI.initializeEMICalculator();
        console.log('EMI calculator initialized successfully');
      } else {
        console.error('EMI calculator not found or initializeEMICalculator not available');
      }
      break;
      
    case 'investment':
      console.log('Initializing Investment calculator...');
      if (window.Investment && window.Investment.initializeInvestmentCalculator) {
        window.Investment.initializeInvestmentCalculator();
        console.log('Investment calculator initialized successfully');
      } else {
        console.error('Investment calculator not found or initializeInvestmentCalculator not available');
      }
      break;
      
    case 'conversion':
      console.log('Initializing Unit Converter...');
      if (window.UnitConverter && window.UnitConverter.initializeUnitConverter) {
        window.UnitConverter.initializeUnitConverter();
        console.log('Unit Converter initialized successfully');
      } else {
        console.error('Unit Converter not found or initializeUnitConverter not available');
      }
      break;
      
    case 'unit':
      console.log('Initializing Unit Converter...');
      if (window.UnitConverter && window.UnitConverter.initializeUnitConverter) {
        window.UnitConverter.initializeUnitConverter();
        console.log('Unit Converter initialized successfully');
      } else {
        console.error('Unit Converter not found or initializeUnitConverter not available');
      }
      break;
      
    case 'date':
      console.log('Initializing Date Calculator...');
      if (window.DateCalculator && window.DateCalculator.initializeDateCalculator) {
        window.DateCalculator.initializeDateCalculator();
        console.log('Date Calculator initialized successfully');
      } else if (window.dateCalculator) {
        // Alternative: check if instance already exists
        console.log('Date Calculator instance already exists');
      } else {
        console.error('Date Calculator not found or initializeDateCalculator not available');
      }
      break;
      
    case 'time':
      console.log('Initializing Time Calculator...');
      if (window.DateCalculator && window.DateCalculator.initializeDateCalculator) {
        window.DateCalculator.initializeDateCalculator();
        console.log('Time Calculator initialized successfully');
      } else if (window.dateCalculator) {
        // Alternative: check if instance already exists
        console.log('Time Calculator instance already exists');
      } else {
        console.error('Time Calculator not found or initializeDateCalculator not available');
      }
      break;
      
    case 'bmi':
      console.log('Initializing BMI Calculator...');
      if (window.BMICalculator && window.BMICalculator.initializeBMICalculator) {
        window.BMICalculator.initializeBMICalculator();
        
        // Initialize speedometer after a short delay to ensure DOM is ready
        setTimeout(() => {
          if (window.BMICalculator && window.BMICalculator.updateSpeedometer) {
            console.log('Initializing BMI speedometer...');
            // Use safe update if available, otherwise use regular update
            if (window.BMICalculator.safeUpdateSpeedometer) {
              window.BMICalculator.safeUpdateSpeedometer(0);
            }
            // Removed the fallback call that was causing the error
          }
        }, 100);
        
        console.log('BMI Calculator initialized successfully');
      } else {
        console.error('BMI Calculator not found or initializeBMICalculator not available');
      }
      break;
      
    default:
      console.log('No calculator initialization for panel:', panelId);
  }
}

// Mobile menu functionality
function initializeMobileMenu() {
  console.log('Initializing mobile menu...');
  
  const menuToggle = document.getElementById('mobileMenuToggle');
  const menuOverlay = document.getElementById('mobileMenuOverlay');
  const menuClose = document.getElementById('mobileMenuClose');
  
  console.log('Mobile menu elements found:', {
    toggle: !!menuToggle,
    overlay: !!menuOverlay,
    close: !!menuClose
  });
  
  if (menuToggle && menuOverlay && menuClose) {
    menuToggle.addEventListener('click', () => {
      console.log('Mobile menu toggle clicked');
      openMobileMenu();
    });
    
    menuClose.addEventListener('click', () => {
      console.log('Mobile menu close clicked');
      closeMobileMenu();
    });
    
    // Close menu when clicking outside
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        console.log('Closing mobile menu - clicked outside');
        closeMobileMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        console.log('Closing mobile menu - escape key');
        closeMobileMenu();
      }
    });
    
    console.log('Mobile menu initialized successfully');
  } else {
    console.error('Mobile menu elements not found');
  }
}

// Open mobile menu
function openMobileMenu() {
  console.log('Opening mobile menu...');
  
  const menuOverlay = document.getElementById('mobileMenuOverlay');
  const menuToggle = document.getElementById('mobileMenuToggle');
  
  if (menuOverlay && menuToggle) {
    menuOverlay.style.display = 'block';
    menuOverlay.classList.add('active');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Mobile menu opened successfully');
  } else {
    console.error('Failed to open mobile menu - elements not found');
  }
}

// Close mobile menu
function closeMobileMenu() {
  console.log('Closing mobile menu...');
  
  const menuOverlay = document.getElementById('mobileMenuOverlay');
  const menuToggle = document.getElementById('mobileMenuToggle');
  
  if (menuOverlay && menuToggle) {
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      if (!menuOverlay.classList.contains('active')) {
        menuOverlay.style.display = 'none';
        console.log('Mobile menu closed successfully');
      }
    }, 300);
  } else {
    console.error('Failed to close mobile menu - elements not found');
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
  const isMobile = window.innerWidth <= 768;
  
  // Update body class for CSS targeting
  document.body.classList.toggle('mobile-layout', isMobile);
  document.body.classList.toggle('desktop-layout', !isMobile);
  
  // Debug grid layout on mobile
  if (isMobile) {
    debugGridLayout();
    // Force mobile layout to ensure it's applied
    setTimeout(() => forceMobileLayout(), 100);
  }
  
  // Close mobile menu if switching to desktop
  if (!isMobile) {
    closeMobileMenu();
  }
}

// Debug function to check grid layout
function debugGridLayout() {
  console.log('=== Mobile Grid Layout Debug ===');
  
  const container = document.querySelector('.container');
  if (container) {
    const computedStyle = window.getComputedStyle(container);
    console.log('Container grid:', {
      display: computedStyle.display,
      gridTemplateColumns: computedStyle.gridTemplateColumns,
      width: computedStyle.width,
      maxWidth: computedStyle.maxWidth
    });
  }
  
  const conversionGrids = document.querySelectorAll('.conversion-grid');
  conversionGrids.forEach((grid, index) => {
    const computedStyle = window.getComputedStyle(grid);
    console.log(`Conversion grid ${index}:`, {
      display: computedStyle.display,
      gridTemplateColumns: computedStyle.gridTemplateColumns,
      width: computedStyle.width
    });
  });
  
  const conversionCols = document.querySelectorAll('.conversion-col');
  conversionCols.forEach((col, index) => {
    const computedStyle = window.getComputedStyle(col);
    console.log(`Conversion col ${index}:`, {
      display: computedStyle.display,
      gridColumn: computedStyle.gridColumn,
      width: computedStyle.width
    });
  });
  
  console.log('=== End Debug ===');
}

// Force mobile layout when CSS isn't sufficient
function forceMobileLayout() {
  console.log('Forcing mobile layout...');
  
  const container = document.querySelector('.container');
  if (container) {
    container.style.gridTemplateColumns = '1fr';
    container.style.gap = '16px';
    container.style.maxWidth = '100%';
    container.style.padding = '0 16px';
  }
  
  const conversionGrids = document.querySelectorAll('.conversion-grid');
  conversionGrids.forEach(grid => {
    grid.style.gridTemplateColumns = '1fr';
    grid.style.gap = '16px';
  });
  
  const conversionCols = document.querySelectorAll('.conversion-col');
  conversionCols.forEach(col => {
    col.style.gridColumn = '1';
    col.style.width = '100%';
    col.style.minWidth = '0';
  });
  
  console.log('Mobile layout forced');
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

function setupRibbons(panelId) {
  const ribbons = document.querySelectorAll('.ribbon');
  const popup = document.getElementById('ribbonPopup');
  
  if (!popup || ribbons.length === 0) {
    return;
  }
  
  // Check if we're on mobile
  const isMobile = document.querySelector('.mobile-container') !== null;

  const getContent = (type) => {
    const panelMap = (window.RIBBONS_CONTENT && window.RIBBONS_CONTENT[panelId]) || {};
    const content = panelMap[type] || '';
    
    // Get the actual button text from the DOM
    const ribbonButton = document.querySelector(`[data-type="${type}"]`);
    const buttonText = ribbonButton ? ribbonButton.textContent : type.charAt(0).toUpperCase() + type.slice(1);
    
    return `<div class="popup-header">${buttonText}</div>${content}`;
  };

  // Store popup content to avoid re-rendering
  const popupContent = {};
  ribbons.forEach(r => {
    const type = r.dataset.type;
    popupContent[type] = getContent(type);
  });

  ribbons.forEach(r => {
    if (isMobile) {
      // Mobile: click to show/hide popup
      r.onclick = (e) => {
        const type = r.dataset.type;
        
        // Toggle popup visibility
        const isVisible = popup.getAttribute('aria-hidden') === 'false';
        
        if (isVisible) {
          popup.setAttribute('aria-hidden', 'true');
        } else {
          // Update content
          if (popup.innerHTML !== popupContent[type]) {
            popup.innerHTML = popupContent[type];
            popup.scrollTop = 0;
          }
          
          // Center popup on mobile screen
          popup.style.left = '50%';
          popup.style.top = '50%';
          popup.style.transform = 'translate(-50%, -50%)';
          popup.setAttribute('aria-hidden', 'false');
        }
      };
    } else {
      // Desktop: hover to show popup
      r.onmouseenter = (e) => {
        const type = r.dataset.type;
        
        // Clear any pending hide timeout
        if (popup.hideTimeout) {
          clearTimeout(popup.hideTimeout);
          popup.hideTimeout = null;
        }
        
        // Only update content if it's different to preserve scroll position
        if (popup.innerHTML !== popupContent[type]) {
          popup.innerHTML = popupContent[type];
          // Reset scroll position when content changes
          popup.scrollTop = 0;
        }
        
        popup.style.left = `${e.currentTarget.getBoundingClientRect().left + e.currentTarget.offsetWidth/2}px`;
        popup.style.top = `${e.currentTarget.getBoundingClientRect().top + window.scrollY - 8}px`;
        popup.setAttribute('aria-hidden', 'false');
      };
      r.onmouseleave = () => {
        // Set a timeout to hide popup, but allow it to be cancelled
        popup.hideTimeout = setTimeout(() => {
          if (!popup.matches(':hover')) {
            popup.setAttribute('aria-hidden', 'true');
          }
          popup.hideTimeout = null;
        }, 150);
      };
    }
  });

  // Add mouse events to the popup itself (desktop only)
  if (!isMobile) {
    popup.onmouseenter = () => {
      // Clear any pending hide timeout when entering popup
      if (popup.hideTimeout) {
        clearTimeout(popup.hideTimeout);
        popup.hideTimeout = null;
      }
      // Keep popup visible when cursor is over it
      popup.setAttribute('aria-hidden', 'false');
    };
    
    popup.onmouseleave = () => {
      // Hide popup when cursor leaves it
      popup.setAttribute('aria-hidden', 'true');
    };
  }
}

// Theme switcher functionality
function initializeThemeSwitcher() {
  // Check if we're on mobile
  const isMobile = document.querySelector('.mobile-container') !== null;
  
  const themeRadios = document.querySelectorAll('input[name="theme"]');
  
  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Set the correct radio button
  const savedRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
  if (savedRadio) {
    savedRadio.checked = true;
  }
  
  // Handle initial theme setup
  setTimeout(() => {
    handleThemeChange();
  }, 200);
  
  // Add event listeners for theme changes
  themeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selectedTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('selectedTheme', selectedTheme);
      
      // Add a subtle animation effect
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
      
      // Handle theme-dependent updates
      handleThemeChange();
    });
  });
}

// Function to handle all theme-dependent updates
function handleThemeChange() {
  // Small delay to ensure theme variables are updated
  setTimeout(() => {
    // Update BMI speedometer only if BMI panel is active
    const bmiPanel = document.getElementById('bmi');
    if (bmiPanel && bmiPanel.classList.contains('active-section')) {
    if (window.redrawSpeedometerForTheme && typeof window.redrawSpeedometerForTheme === 'function') {
      window.redrawSpeedometerForTheme();
      }
    }
    
    // Update EMI charts if EMI panel is active
    if (window.EMI && typeof window.EMI.updateChartsForTheme === 'function') {
      window.EMI.updateChartsForTheme();
    }
    
    // Update investment charts if investment panel is active
    if (window.Investment && typeof window.Investment.updateChartsForTheme === 'function') {
      window.Investment.updateChartsForTheme();
    }
    
    // Add more theme-dependent updates here as needed
  }, 100);
}

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

function setupSiteLogoEasterEgg() {
  // Check if we're on mobile
  const isMobile = document.querySelector('.mobile-container') !== null;
  
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
    } else if (logoClickCount === 3) {
      clearTimeout(logoClickTimer);
      logoClickCount = 0;
      showSiteFacts();
    }
  });
}

function showSiteFacts() {
  const popup = document.getElementById('siteFactsPopup');
  
  if (popup) {
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeSiteFacts() {
  const popup = document.getElementById('siteFactsPopup');
  if (popup) {
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Close facts popup when clicking outside
document.addEventListener('click', function(e) {
  const popup = document.getElementById('siteFactsPopup');
  if (popup && !popup.contains(e.target) && popup.getAttribute('aria-hidden') === 'false') {
    closeSiteFacts();
  }
});

// Close facts popup with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeSiteFacts();
  }
});

// Initialize site logo easter egg when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupSiteLogoEasterEgg();
});

// Also try to set it up after a short delay in case DOM isn't fully ready
setTimeout(function() {
  setupSiteLogoEasterEgg();
}, 1000);

// False Easter Egg
let falseEasterEggClickCount = 0;
let falseEasterEggTimer = null;

function setupFalseEasterEgg() {
  // Check if we're on mobile
  const isMobile = document.querySelector('.mobile-container') !== null;
  
  const falseEasterEgg = document.getElementById('falseEasterEgg');
  
  if (!falseEasterEgg) {
    return;
  }
  
  // Add visual feedback
  falseEasterEgg.style.transition = 'all 0.2s ease';
  
  falseEasterEgg.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    falseEasterEggClickCount++;
    
    if (falseEasterEggClickCount === 1) {
      falseEasterEggTimer = setTimeout(() => {
        falseEasterEggClickCount = 0;
      }, 500);
    } else if (falseEasterEggClickCount === 2) {
      clearTimeout(falseEasterEggTimer);
      falseEasterEggClickCount = 0;
      showFalseEasterEgg();
    }
  });
  
  // Also try mousedown for better detection
  falseEasterEgg.addEventListener('mousedown', function(e) {
    // Mousedown event handler
  });
}

function showFalseEasterEgg() {
  const popup = document.getElementById('falseEasterEggPopup');
  
  if (popup) {
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeFalseEasterEgg() {
  const popup = document.getElementById('falseEasterEggPopup');
  if (popup) {
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Close false easter egg popup when clicking outside
document.addEventListener('click', function(e) {
  const popup = document.getElementById('falseEasterEggPopup');
  if (popup && !popup.contains(e.target) && popup.getAttribute('aria-hidden') === 'false') {
    closeFalseEasterEgg();
  }
});

// Close false easter egg popup with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeFalseEasterEgg();
  }
});

// Initialize false easter egg when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupFalseEasterEgg();
});

// Also try to set it up after a short delay in case DOM isn't fully ready
setTimeout(function() {
  setupFalseEasterEgg();
}, 1000);

// ============================================================================
// EVENT-BASED WEB COMPONENT THEME SYNCHRONIZATION SYSTEM
// ============================================================================
// This system fires events when themes change, allowing web components to
// listen and update themselves automatically - no manual syncing needed!

// Function to fire theme change events that web components can listen to
function fireThemeChangeEvent(theme) {
  // Create a custom event that bubbles up through the DOM
  const themeEvent = new CustomEvent('themeChanged', {
    detail: { theme: theme },
    bubbles: true,      // Event bubbles up through parent elements
    composed: true      // Event can cross shadow DOM boundaries
  });
  
  // Dispatch from document.documentElement so it bubbles up everywhere
  document.documentElement.dispatchEvent(themeEvent);
}

// Function to initialize the event-based theme synchronization system
function initializeUniversalThemeSync() {
  // Watch for theme changes on the document element
  const themeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        // Theme changed - fire event instead of manually syncing
        const newTheme = document.documentElement.getAttribute('data-theme') || 'default';
        fireThemeChangeEvent(newTheme);
      }
    });
  });
  
  // Start observing theme changes
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  
  // Fire initial theme event so components know the current theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
  fireThemeChangeEvent(currentTheme);
}

// Initialize the universal theme sync system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure all web components are registered
  setTimeout(initializeUniversalThemeSync, 100);
});

// Also try to initialize after a longer delay for components that load later
setTimeout(initializeUniversalThemeSync, 1000);
