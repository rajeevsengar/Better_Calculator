class ThemeSelector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Theme CSS is already loaded in head, no need to load again
    this.render();
    this.initializeThemeSwitcher();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <style>
        /* Theme selector styles - embedded to work in shadow DOM */
        .theme-options {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: nowrap;
          position: relative;
        }

        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          min-width: 32px;
          position: relative;
        }

        .theme-option:hover {
          transform: translateY(-1px) scale(1.05);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .theme-option input[type="radio"] {
          display: none;
        }

        .theme-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
        }

        .theme-color::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
          border-radius: 50%;
        }

        .theme-option:hover .theme-color {
          transform: scale(1.1);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .theme-option input[type="radio"]:checked + .theme-color {
          border-color: #ffffff;
          transform: scale(1.1);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.1);
          animation: themePulse 2s ease-in-out infinite;
        }

        @keyframes themePulse {
          0%, 100% {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6), 0 0 0 3px rgba(255, 255, 255, 0.2);
          }
        }

        .theme-option input[type="radio"]:checked + .theme-color::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 8px;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .theme-options {
            gap: 4px;
          }
          
          .theme-option {
            min-width: 28px;
            padding: 2px;
          }
          
          .theme-color {
            width: 14px;
            height: 14px;
          }
        }
      </style>
      
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
    // Theme is already set in head, just sync the UI
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    
    // Set the correct radio button
    const currentRadio = this.querySelector(`input[name="theme"][value="${currentTheme}"]`);
    if (currentRadio) {
      currentRadio.checked = true;
    }
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
        
        // Ensure body remains visible
        document.body.setAttribute('data-theme-applied', 'true');
        
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