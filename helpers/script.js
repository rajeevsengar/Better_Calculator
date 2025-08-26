// Menu toggles and common functionality
// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on mobile or desktop
  const isMobile = document.querySelector('.mobile-container') !== null;
  
  if (isMobile) {
    // Mobile initialization - initialize common functionality
    initializeCommonFunctionality();
    // Mobile-specific initialization will be handled by mobile.js
    return;
  }
  
  // Desktop initialization
  initializeDesktopFunctionality();
});

// Common functionality for both desktop and mobile
function initializeCommonFunctionality() {
  // Initialize theme switcher
  initializeThemeSwitcher();
  
  // Populate text content from configuration
  populateTextContent();
  
  // Initialize date calculator tabs
  initializeDateTabs();
  
  // Initialize panel functionality
  initializePanelSystem();
}

// Desktop-specific functionality
function initializeDesktopFunctionality() {
  const menuItems = document.querySelectorAll('.menu .item');
  const sections = document.querySelectorAll('main.panel .container > section');

  const emiLink = document.getElementById('emi-link');
  if (emiLink) {
    emiLink.addEventListener('click', () => {
      showPanel('emi');
    });
  }
  
  if (menuItems.length > 0) {
    menuItems.forEach(it => it.addEventListener('click', () => showPanel(it.dataset.panel)));

    // ensure initial state matches the .menu .item.active in HTML (or first item)
    const initial = document.querySelector('.menu .item.active') || menuItems[0];
    if (initial) showPanel(initial.dataset.panel);
  }

  // Initialize common functionality
  initializeCommonFunctionality();
  
  // Export functions for global access
  window.setupRibbons = setupRibbons;
}

// Unified panel system for both desktop and mobile
function initializePanelSystem() {
  // This will be called by both desktop and mobile systems
  // Desktop uses showPanel, mobile uses showMobilePanel
}

// Unified panel switching function
function showPanel(panelId) {
  // Check if we're on mobile or desktop
  const isMobile = document.querySelector('.mobile-container') !== null;
  
  if (isMobile) {
    // Use mobile panel system
    if (window.mobileUtils && window.mobileUtils.showMobilePanel) {
      window.mobileUtils.showMobilePanel(panelId);
    }
    return;
  }
  
  // Desktop panel system
  const menuItems = document.querySelectorAll('.menu .item');
  const sections = document.querySelectorAll('main.panel .container > section');
  
  // highlight menu
  menuItems.forEach(m => m.classList.toggle('active', m.dataset.panel === panelId));

  // hide all sections
  sections.forEach(s => s.classList.remove('active-section'));

  // show target
  const target = document.getElementById(panelId);
  if (!target) return;
  target.classList.add('active-section');

  // init calculators lazily
  initializePanelCalculators(panelId);

  setupRibbons(panelId);
}

// Unified calculator initialization
function initializePanelCalculators(panelId) {
  switch (panelId) {
    case 'emi':        window.EMI?.initializeEMICalculator?.(); break;
    case 'investment': window.Investment?.initializeInvestmentCalculator?.(); break;
    case 'conversion': window.UnitConverter?.initializeUnitConverter?.(); break;
    case 'unit':       window.UnitConverter?.initializeUnitConverter?.(); break;
    case 'date':       window.DateCalculator?.initializeDateCalculator?.(); break;
    case 'time':       window.DateCalculator?.initializeDateCalculator?.(); break;
    case 'bmi':        window.BMICalculator?.initializeBMICalculator?.(); break;
  }
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
    // Update BMI speedometer if BMI panel is active
    if (window.redrawSpeedometerForTheme && typeof window.redrawSpeedometerForTheme === 'function') {
      window.redrawSpeedometerForTheme();
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
