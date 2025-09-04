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
      const currentPath = window.location.pathname;
      const isSubPage = currentPath.includes('/unit-converter') || 
                       currentPath.includes('/bmi-calculator') || 
                       currentPath.includes('/date-calculator') || 
                       currentPath.includes('/time-calculator') || 
                       currentPath.includes('/emi-calculator') || 
                       currentPath.includes('/investment-calculator') ||
                       currentPath.includes('/about-us') ||
                       currentPath.includes('/sitemap');
      
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${isSubPage ? '../components/menu-header/menu-header.css' : 'components/menu-header/menu-header.css'}">
        
        <!-- Menu Header Section -->
        <header class="site-header">
          <div class="menu-header" style="position: sticky; top: 0; z-index: 100;">
              <div class="header-content">
                  <div class="calculator-links" id="calculatorLinks">
                      <!-- Calculator links will be populated dynamically -->
                  </div>
              </div>
          </div>
        </header>
      `;
    }
  
    populateCalculatorLinks() {
      const calculatorLinks = this.shadowRoot.getElementById('calculatorLinks');
      if (!calculatorLinks) return;
  
      const currentPath = window.location.pathname;
      const isSubPage = currentPath.includes('/unit-converter') || 
                       currentPath.includes('/bmi-calculator') || 
                       currentPath.includes('/date-calculator') || 
                       currentPath.includes('/time-calculator') || 
                       currentPath.includes('/emi-calculator') || 
                       currentPath.includes('/investment-calculator') ||
                       currentPath.includes('/about-us') ||
                       currentPath.includes('/sitemap');
  
      const baseUrl = isSubPage ? '../' : '';
      
      const links = [
        { text: 'Unit Converter', url: `${baseUrl}unit-converter/index.html`, active: currentPath.includes('unit-converter') },
        { text: 'BMI Calculator', url: `${baseUrl}bmi-calculator/index.html`, active: currentPath.includes('bmi-calculator') },
        { text: 'Date Calculator', url: `${baseUrl}date-calculator/index.html`, active: currentPath.includes('date-calculator') },
        { text: 'Time Calculator', url: `${baseUrl}time-calculator/index.html`, active: currentPath.includes('time-calculator') },
        { text: 'EMI Calculator', url: `${baseUrl}emi-calculator/index.html`, active: currentPath.includes('emi-calculator') },
        { text: 'Investment Calculator', url: `${baseUrl}investment-calculator/index.html`, active: currentPath.includes('investment-calculator') }
      ];
  
      calculatorLinks.innerHTML = links.map(link => {
        const activeClass = link.active ? ' active' : '';
        return `<a href="${link.url}" class="calculator-link${activeClass}">${link.text}</a>`;
      }).join('');
  
      // Add click handlers for calculator links
      const linkElements = calculatorLinks.querySelectorAll('.calculator-link');
      linkElements.forEach(link => {
        link.addEventListener('click', (e) => {
          // Check if this link is already active (current page)
          if (link.classList.contains('active')) {
            e.preventDefault(); // Prevent navigation if already on this page
            return;
          }
          
          // Remove active class from all calculator links
          linkElements.forEach(l => l.classList.remove('active'));
          // Remove active class from home link
          const homeLink = this.shadowRoot.getElementById('homeLink');
          if (homeLink) homeLink.classList.remove('active');
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