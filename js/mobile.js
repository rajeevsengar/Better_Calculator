// Mobile-specific functionality for Pro Multi-Calculator

// Wait for all resources to load, including scripts
window.addEventListener('load', function() {
    initializeMobile();
});

function initializeMobile() {
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize mobile navigation
    initializeMobileNavigation();
    
    // Initialize mobile-specific event listeners
    initializeMobileEventListeners();
    
    // Force numeric keyboard for all number inputs
    forceNumericKeyboard();
    
    // Initialize the first panel (conversion) - this will make elements visible
    showMobilePanel('conversion');
    
    // Common functionality is now handled by script.js
    // No need to call populateTextContent or initializeDateTabs here
}

function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    const menuClose = document.getElementById('mobileMenuClose');
    
    if (menuToggle && menuOverlay && menuClose) {
        menuToggle.addEventListener('click', function() {
            openMobileMenu();
        });
        
        menuClose.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Close menu when clicking outside
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
}

function initializeMobileNavigation() {
    const menuItems = document.querySelectorAll('.mobile-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPanel = this.getAttribute('data-panel');
            
            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            
            // Show target panel
            showMobilePanel(targetPanel);
            
            // Close mobile menu
            closeMobileMenu();
        });
    });
}

// Helper function to close mobile menu
function closeMobileMenu() {
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
            }
        }, 300);
    }
}

// Function to open mobile menu
function openMobileMenu() {
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    const menuToggle = document.getElementById('mobileMenuToggle');
    if (menuOverlay && menuToggle) {
        menuOverlay.style.display = 'block';
        // Small delay to ensure display is set before adding active class
        setTimeout(() => {
            menuOverlay.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
    }
}

function showMobilePanel(panelId) {
    // Hide all panels
    const panels = document.querySelectorAll('section');
    panels.forEach(panel => {
        panel.classList.remove('active-section');
        panel.style.display = 'none';
    });
    
    // Show target panel
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.add('active-section');
        targetPanel.style.display = 'block';
        
        // Initialize panel-specific functionality using unified function
        if (typeof initializePanelCalculators === 'function') {
            initializePanelCalculators(panelId);
        }
    }
    
    // Initialize ribbons using the desktop system
    if (window.setupRibbons && typeof window.setupRibbons === 'function') {
        window.setupRibbons(panelId);
    }
    
    // Ensure menu is closed after panel initialization
    closeMobileMenu();
}













function initializeMobileEventListeners() {
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate layouts after orientation change
            if (typeof window.dispatchEvent === 'function') {
                window.dispatchEvent(new Event('resize'));
            }
        }, 100);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Adjust mobile layout on resize
        adjustMobileLayout();
    });
    
    // Add click outside ribbon popup to close
    document.addEventListener('click', (e) => {
        const popup = document.getElementById('ribbonPopup');
        if (popup && !e.target.closest('.ribbon-popup') && !e.target.closest('.ribbon')) {
            popup.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Debug ribbon system
    console.log('Mobile event listeners initialized');
    console.log('Ribbons found:', document.querySelectorAll('.ribbon').length);
    console.log('Ribbon popup found:', document.getElementById('ribbonPopup'));
}

function adjustMobileLayout() {
    // Adjust mobile layout based on screen size
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Ensure mobile elements are visible
        document.body.classList.add('mobile-view');
    } else {
        // Hide mobile elements on larger screens
        document.body.classList.remove('mobile-view');
    }
}

// Force numeric keyboard for all number inputs
function forceNumericKeyboard() {
    // Force numeric keyboard for inputs that should be numbers
    const numericInputs = [
        'emiAmt', 'emiRate', 'emiMonths',
        'sipAmount', 'sipReturn', 'sipYears', 'sipMonths',
        'lumpSumAmount', 'lumpSumReturn', 'lumpSumYears', 'lumpSumMonths',
        'deltaDays', 'deltaWeeks', 'deltaMonths', 'deltaYears'
    ];
    
    // Special handling for inputs that need text type (Ft + Inches formatting)
    const textInputs = ['fromValue', 'toValue', 'heightVal'];
    
    numericInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            // Ensure type is number for pure numeric inputs
            input.type = 'number';
            input.setAttribute('inputmode', 'numeric');
            input.setAttribute('pattern', '[0-9]*');
            console.log(`Forced numeric keyboard for: ${id}`);
        }
    });
    
    // Text inputs need special handling - they can be text or number based on unit
    textInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            // Start with text type to allow Ft + Inches formatting
            input.type = 'text';
            input.setAttribute('inputmode', 'decimal');
            console.log(`Set text input for formatting: ${id}`);
        }
    });
}

// Additional event listeners to ensure menu closes in various scenarios
document.addEventListener('click', function(e) {
    // Close menu if clicking on any calculator input or button
    if (e.target.closest('input') || e.target.closest('button') || e.target.closest('select')) {
        const menuOverlay = document.getElementById('mobileMenuOverlay');
        if (menuOverlay && menuOverlay.classList.contains('active')) {
            // Don't close if clicking inside the menu itself
            if (!e.target.closest('.mobile-menu-content')) {
                closeMobileMenu();
            }
        }
    }
});

// Close menu when window is resized (orientation change)
window.addEventListener('resize', function() {
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    if (menuOverlay && menuOverlay.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Export functions for use in other scripts
window.mobileUtils = {
    initializeMobile,
    showMobilePanel,
    adjustMobileLayout,
    closeMobileMenu,
    openMobileMenu
}; 