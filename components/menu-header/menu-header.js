class MenuHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.render();
      this.populateCalculatorLinks();
      this.setupThemeSwitching();
      this.initializeTheme();
    }

    render() {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${window.getCSSPaths ? window.getCSSPaths().components.menuHeader : 'components/menu-header/menu-header.css'}">
        
        <!-- Navigation Menu Section -->
          <nav class="menu-header" style="position: sticky; top: 0; z-index: 100;">
              <div class="header-content" id="calculatorCategories">
                      <!-- Calculator categories will be populated dynamically -->
              </div>
          </nav>
      `;
    }
  
    populateCalculatorLinks() {
      const calculatorCategories = this.shadowRoot.getElementById('calculatorCategories');
      if (!calculatorCategories) return;
      
      const categories = window.initializeCalculatorCategories();

      calculatorCategories.innerHTML = categories.map(category => {
        const availableCalculators = category.calculators.filter(calc => calc.available);
        if (availableCalculators.length === 0) return '';
        
        return `
          <div class="category-dropdown" data-category="${category.name.toLowerCase().replace(/\s+/g, '-')}">
            <div class="category-toggle">
              <span>${category.name}</span>
              <span class="dropdown-arrow">▼</span>
            </div>
            <div class="category-menu">
              ${availableCalculators.map(calc => {
                const activeClass = calc.active ? ' active' : '';
                return `<a href="${calc.url}" class="calculator-link${activeClass}">${calc.text}</a>`;
              }).join('')}
            </div>
          </div>
        `;
      }).join('');
  
      // Add hover handlers for category dropdowns
      const categoryDropdowns = calculatorCategories.querySelectorAll('.category-dropdown');
      categoryDropdowns.forEach(dropdown => {
        const arrow = dropdown.querySelector('.dropdown-arrow');
        
        dropdown.addEventListener('mouseenter', () => {
          // Close other dropdowns
          categoryDropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
              const otherArrow = otherDropdown.querySelector('.dropdown-arrow');
              if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
            }
          });
          
          // Open current dropdown
          dropdown.classList.add('active');
          if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
          }
        });
        
        dropdown.addEventListener('mouseleave', () => {
          // Close current dropdown
          dropdown.classList.remove('active');
          if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
          }
        });
      });

      // Add click handlers for calculator links
      const linkElements = calculatorCategories.querySelectorAll('.calculator-link');
      linkElements.forEach(link => {
        link.addEventListener('click', (e) => {
          // Check if this link is already active (current page)
          if (link.classList.contains('active')) {
            e.preventDefault(); // Prevent navigation if already on this page
            return;
          }
          
          // Remove active class from all calculator links
          linkElements.forEach(l => l.classList.remove('active'));
          // Add active class to clicked link
          link.classList.add('active');
        });
      });

    }

  setupThemeSwitching() {
    const themeRadios = this.shadowRoot.querySelectorAll('input[name="theme"]');
    const variantToggle = this.shadowRoot.querySelector('#variant-toggle');
    
    // Set initial theme based on current state or default
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    const currentVariant = document.documentElement.getAttribute('data-variant') || 'light';
    
    // Set initial radio button state
    const initialThemeRadio = this.shadowRoot.querySelector(`input[value="${currentTheme}"]`);
    if (initialThemeRadio) {
      initialThemeRadio.checked = true;
    }
    
    // Set initial variant toggle state
    if (variantToggle) {
      variantToggle.checked = currentVariant === 'dark';
    }
    
    // Handle theme radio button changes
    themeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        const currentVariant = document.documentElement.getAttribute('data-variant') || 'light';
        
        // Apply theme
        document.documentElement.setAttribute('data-theme', selectedTheme);
        document.documentElement.setAttribute('data-variant', currentVariant);
        
        // Save to localStorage
        localStorage.setItem('selectedTheme', selectedTheme);
        localStorage.setItem('selectedVariant', currentVariant);
        
        // Fire theme change event
        this.fireThemeChangeEvent(selectedTheme, currentVariant);
      });
    });
    
    // Handle variant toggle changes
    if (variantToggle) {
      variantToggle.addEventListener('change', (e) => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
        const newVariant = e.target.checked ? 'dark' : 'light';
        
        // Apply variant
        document.documentElement.setAttribute('data-variant', newVariant);
        
        // Save to localStorage
        localStorage.setItem('selectedVariant', newVariant);
        
        // Fire theme change event
        this.fireThemeChangeEvent(currentTheme, newVariant);
      });
    }
  }

  fireThemeChangeEvent(theme, variant) {
    // Create a custom event that bubbles up through the DOM
    const themeEvent = new CustomEvent('themeChanged', {
      detail: { theme: theme, variant: variant },
      bubbles: true,
      composed: true
    });
    
    // Dispatch from document.documentElement so it bubbles up everywhere
    document.documentElement.dispatchEvent(themeEvent);
  }

  initializeTheme() {
    const currentTheme = localStorage.getItem('selectedTheme') || 'default';
    const currentVariant = localStorage.getItem('selectedVariant') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-variant', currentVariant);

    // Set initial radio button state
    const initialThemeRadio = this.shadowRoot.querySelector(`input[value="${currentTheme}"]`);
    if (initialThemeRadio) {
      initialThemeRadio.checked = true;
    }

    // Set initial variant toggle state
    const variantToggle = this.shadowRoot.querySelector('#variant-toggle');
    if (variantToggle) {
      variantToggle.checked = currentVariant === 'dark';
    }
  }
}
  // Define the custom element
  customElements.define('menu-header', MenuHeader); 