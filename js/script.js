// Menu toggles
// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on mobile or desktop
  const isMobile = document.querySelector('.mobile-container') !== null;
  
  if (isMobile) {
    // Mobile initialization - handled by mobile.js
    return;
  }
  
  // Desktop initialization
  const menuItems = document.querySelectorAll('.menu .item');
  const sections  = document.querySelectorAll('main.panel .container > section');

  const emiLink = document.getElementById('emi-link');
  if (emiLink) {
    emiLink.addEventListener('click', () => {
      showPanel('emi');
    });
  }
  
  function showPanel(panelId) {
    // highlight menu
    menuItems.forEach(m => m.classList.toggle('active', m.dataset.panel === panelId));
  
    // hide all sections
    sections.forEach(s => s.classList.remove('active-section'));
  
    // show target
    const target = document.getElementById(panelId);
    if (!target) return;
    target.classList.add('active-section');
  
    // init calculators lazily
    switch (panelId) {
      case 'emi':        window.EMI?.initializeEMICalculator?.(); break;
      case 'investment': window.Investment?.initializeInvestmentCalculator?.(); break;
      case 'conversion': window.UnitConverter?.initializeUnitConverter?.(); break;
      case 'unit':       window.UnitConverter?.initializeUnitConverter?.(); break;
      case 'date':       window.DateCalculator?.initializeDateCalculator?.(); break;
      case 'bmi':        window.BMICalculator?.initializeBMICalculator?.(); break;
    }
  
    setupRibbons(panelId);
  }

  if (menuItems.length > 0) {
    menuItems.forEach(it => it.addEventListener('click', () => showPanel(it.dataset.panel)));

    // ensure initial state matches the .menu .item.active in HTML (or first item)
    const initial = document.querySelector('.menu .item.active') || menuItems[0];
    if (initial) showPanel(initial.dataset.panel);
  }

  // Initialize theme switcher
  initializeThemeSwitcher();
  
  // Populate text content from configuration
  populateTextContent();
  
  // Export functions for global access
  window.setupRibbons = setupRibbons;
});

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
  
  console.log('Looking for logo:', siteLogo); // Debug log
  
  if (!siteLogo) {
    console.log('Logo not found! Trying alternative approach...'); // Debug log
    
    // Try to find it after a longer delay
    setTimeout(function() {
      const delayedLogo = document.getElementById('siteLogo') || 
                          document.querySelector('.header2 .brand img');
      if (delayedLogo) {
        console.log('Logo found on delayed attempt:', delayedLogo);
        setupLogoEventListeners(delayedLogo);
      } else {
        console.log('Logo still not found after delay');
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
    
    console.log('Logo clicked! Count:', logoClickCount + 1); // Debug log
    
    logoClickCount++;
    
    if (logoClickCount === 1) {
      logoClickTimer = setTimeout(() => {
        console.log('Click timeout - resetting count'); // Debug log
        logoClickCount = 0;
      }, 500);
    } else if (logoClickCount === 3) {
      clearTimeout(logoClickTimer);
      logoClickCount = 0;
      console.log('Triple-click detected! Opening facts...'); // Debug log
      showSiteFacts();
    }
  });
  
  console.log('Logo easter egg setup complete!'); // Debug log
}

function showSiteFacts() {
  const popup = document.getElementById('siteFactsPopup');
  console.log('Showing facts popup:', popup); // Debug log
  
  if (popup) {
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    console.log('Facts popup should now be visible'); // Debug log
  } else {
    console.log('Facts popup not found!'); // Debug log
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
  console.log('DOM loaded, setting up logo easter egg...'); // Debug log
  setupSiteLogoEasterEgg();
});

// Also try to set it up after a short delay in case DOM isn't fully ready
setTimeout(function() {
  console.log('Delayed setup attempt...'); // Debug log
  setupSiteLogoEasterEgg();
}, 1000);

// False Easter Egg
let falseEasterEggClickCount = 0;
let falseEasterEggTimer = null;

function setupFalseEasterEgg() {
  // Check if we're on mobile
  const isMobile = document.querySelector('.mobile-container') !== null;
  
  const falseEasterEgg = document.getElementById('falseEasterEgg');
  console.log('Setting up false easter egg:', falseEasterEgg); // Debug log
  
  if (!falseEasterEgg) {
    console.log('False easter egg element not found!'); // Debug log
    return;
  }
  
  // Add visual feedback
  falseEasterEgg.style.transition = 'all 0.2s ease';
  
  falseEasterEgg.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('False easter egg clicked! Count:', falseEasterEggClickCount + 1); // Debug log
    
    falseEasterEggClickCount++;
    
    if (falseEasterEggClickCount === 1) {
      falseEasterEggTimer = setTimeout(() => {
        console.log('False easter egg timeout - resetting count'); // Debug log
        falseEasterEggClickCount = 0;
      }, 500);
    } else if (falseEasterEggClickCount === 2) {
      clearTimeout(falseEasterEggTimer);
      falseEasterEggClickCount = 0;
      console.log('Double-click detected! Showing false easter egg...'); // Debug log
      showFalseEasterEgg();
    }
  });
  
  // Also try mousedown for better detection
  falseEasterEgg.addEventListener('mousedown', function(e) {
    console.log('False easter egg mousedown detected'); // Debug log
  });
  
  console.log('False easter egg setup complete!'); // Debug log
}

function showFalseEasterEgg() {
  const popup = document.getElementById('falseEasterEggPopup');
  console.log('Showing false easter egg popup:', popup); // Debug log
  
  if (popup) {
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    console.log('False easter egg popup should now be visible'); // Debug log
  } else {
    console.log('False easter egg popup not found!'); // Debug log
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
  console.log('DOM loaded, setting up false easter egg...'); // Debug log
  setupFalseEasterEgg();
});

// Also try to set it up after a short delay in case DOM isn't fully ready
setTimeout(function() {
  console.log('Delayed false easter egg setup attempt...'); // Debug log
  setupFalseEasterEgg();
}, 1000);
