class ThemeSelector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.ensureThemeCSSLoaded();
    this.render();
    this.initializeThemeSwitcher();
    this.setupEventListeners();
  }

  ensureThemeCSSLoaded() {
    // Check if theme CSS is already loaded in the main document
    if (!document.querySelector('link[href*="themes.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      const cssPath = this.getThemeCSSPath();
      link.href = cssPath;
      
      console.log('Loading theme CSS from:', cssPath);
      
      link.onload = () => {
        console.log('Theme CSS loaded successfully from:', cssPath);
      };
      
      link.onerror = (error) => {
        console.error('Failed to load theme CSS from:', cssPath, error);
      };
      
      document.head.appendChild(link);
    } else {
      console.log('Theme CSS already loaded');
    }
  }

  getThemeCSSPath() {
    // Determine the correct path based on current page
    const currentPath = window.location.pathname;
    const isSubPage = currentPath.includes('/unit-converter') || 
                     currentPath.includes('/bmi-calculator') || 
                     currentPath.includes('/date-calculator') || 
                     currentPath.includes('/time-calculator') || 
                     currentPath.includes('/emi-calculator') || 
                     currentPath.includes('/investment-calculator');
    
    return isSubPage ? '../components/themes-selector/themes.css' : 'components/themes-selector/themes.css';
  }

  render() {
    this.innerHTML = `
      <link rel="stylesheet" href="${this.getThemeCSSPath()}">
      <div class="theme-options">
        <div class="theme-option" data-theme="default">
          <input type="radio" name="theme" value="default" checked />
          <span class="theme-color" style="background: #2196f3"></span>
        </div>
        <div class="theme-option" data-theme="green">
          <input type="radio" name="theme" value="green" />
          <span class="theme-color" style="background: #4caf50"></span>
        </div>
        <div class="theme-option" data-theme="purple">
          <input type="radio" name="theme" value="purple" />
          <span class="theme-color" style="background: #9c27b0"></span>
        </div>
        <div class="theme-option" data-theme="orange">
          <input type="radio" name="theme" value="orange" />
          <span class="theme-color" style="background: #ff9800"></span>
        </div>
      </div>
    `;
  }

  initializeThemeSwitcher() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set the correct radio button
    const savedRadio = this.querySelector(`input[name="theme"][value="${savedTheme}"]`);
    if (savedRadio) {
      savedRadio.checked = true;
    }
    
    // Handle initial theme setup
    setTimeout(() => {
      this.handleThemeChange();
    }, 200);
  }

  setupEventListeners() {
    const themeRadios = this.querySelectorAll('input[name="theme"]');
    const themeOptions = this.querySelectorAll('.theme-option');
    
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
        this.handleThemeChange();
        
        // Fire theme change event for other components
        this.fireThemeChangeEvent(selectedTheme);
      });
    });

    // Add click event listeners to theme option divs
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change'));
        }
      });
    });
  }

  // Function to handle all theme-dependent updates
  handleThemeChange() {
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

  // Function to fire theme change events that web components can listen to
  fireThemeChangeEvent(theme) {
    // Create a custom event that bubbles up through the DOM
    const themeEvent = new CustomEvent('themeChanged', {
      detail: { theme: theme },
      bubbles: true,      // Event bubbles up through parent elements
      composed: true      // Event can cross shadow DOM boundaries
    });
    
    // Dispatch from document.documentElement so it bubbles up everywhere
    document.documentElement.dispatchEvent(themeEvent);
  }

  // Public method to get current theme
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'default';
  }

  // Public method to set theme programmatically
  setTheme(theme) {
    const radio = this.querySelector(`input[name="theme"][value="${theme}"]`);
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));
    }
  }
}

// Register the web component
customElements.define('theme-selector', ThemeSelector); 