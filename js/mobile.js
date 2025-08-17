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
    
    // Initialize theme switcher
    initializeMobileThemeSwitcher();
    
    // Force numeric keyboard for all number inputs
    forceNumericKeyboard();
    
    // Initialize the first panel (conversion) - this will make elements visible
    showMobilePanel('conversion');
    
    // Now populate text content after panel is shown and elements are visible
    setTimeout(() => {
        if (typeof populateTextContent === 'function') {
            populateTextContent();
        }
    }, 100);
}

function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const menuOverlay = document.getElementById('mobileMenuOverlay');
    const menuClose = document.getElementById('mobileMenuClose');
    
    if (menuToggle && menuOverlay && menuClose) {
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        menuClose.addEventListener('click', function() {
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close menu when clicking outside
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                menuOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
                menuOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
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
            const menuOverlay = document.getElementById('mobileMenuOverlay');
            const menuToggle = document.getElementById('mobileMenuToggle');
            if (menuOverlay && menuToggle) {
                menuOverlay.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
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
        
        // Initialize panel-specific functionality
        initializePanelFunctionality(panelId);
    }
}

function initializePanelFunctionality(panelId) {
    // Initialize calculators when panels are shown
    switch(panelId) {
        case 'emi':        window.EMI?.initializeEMICalculator?.(); break;
        case 'investment': window.Investment?.initializeInvestmentCalculator?.(); break;
        case 'conversion': window.UnitConverter?.initializeUnitConverter?.(); break;
        case 'unit':       window.UnitConverter?.initializeUnitConverter?.(); break;
        case 'date':       window.DateCalculator?.initializeDateCalculator?.(); break;
        case 'bmi':        window.BMICalculator?.initializeBMICalculator?.(); break;
    }
    
    // Initialize ribbons using the desktop system
    if (window.setupRibbons && typeof window.setupRibbons === 'function') {
        window.setupRibbons(panelId);
    }
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

// Ribbons are now handled by the existing desktop system
// No need for mobile-specific ribbon code

function initializeMobileThemeSwitcher() {
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set the correct radio button
    const savedRadio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
    if (savedRadio) {
        savedRadio.checked = true;
    }
    
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
            handleMobileThemeChange();
        });
    });
}

function handleMobileThemeChange() {
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
    }, 100);
}

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

// Text content is now populated from util.js

// Close function handled by desktop ribbon system



// Export functions for use in other scripts
window.mobileUtils = {
    initializeMobile,
    showMobilePanel,
    adjustMobileLayout
}; 