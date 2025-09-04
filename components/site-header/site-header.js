class SiteHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.populateContent();
    this.startTaglineAnimation();
    
    // Initialize theme on component load
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
    
    const imagePrefix = isSubPage ? '../assets/images/' : 'assets/images/';
    
    this.innerHTML = `
      <link rel="stylesheet" href="${isSubPage ? '../components/site-header/site-header.css' : 'components/site-header/site-header.css'}">
      
      <!-- Main Header Section -->
      <header class="site-header">
        <div class="top-sub-header">
            <div class="header-content">
                <div class="left-section">
                    <img src="${imagePrefix}india-flag.png" alt="India Flag" class="flag-icon">
                    <span class="built-with-love" id="builtWithLove"></span>
                </div>
                <div class="right-section">
                    <!-- Integrated Theme Selector -->
                    <div class="integrated-theme-selector">
                        <div class="theme-radio-group">
                            <input type="radio" id="theme-default" name="theme" value="default" checked>
                            <label for="theme-default" class="theme-radio-label theme-default" title="Orange Theme">●</label>
                            
                            <input type="radio" id="theme-green" name="theme" value="green">
                            <label for="theme-green" class="theme-radio-label theme-green" title="Green Theme">●</label>
                            
                            <input type="radio" id="theme-black" name="theme" value="black">
                            <label for="theme-black" class="theme-radio-label theme-black" title="Black Theme">●</label>
                        </div>
                        
                        <div class="variant-toggle">
                            <input type="checkbox" id="variant-toggle" name="variant">
                            <label for="variant-toggle" class="variant-toggle-label" title="Toggle Dark/Light Mode">
                                <span class="toggle-icon"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="main-header">
            <div class="header-content">
                <a href="${isSubPage ? '../index.html' : 'index.html'}" class="brand-link">
                    <div class="brand-section">
                        <img src="${imagePrefix}site_logo.png" alt="Zero Calculator Logo" class="brand-logo">
                        <div class="brand-text">
                            <h1 class="brand-name" id="brandName"></h1>
                            <div id="tagline" class="tagline">
                                <div class="tagline-line tagline-first"></div>
                                <div class="tagline-line tagline-second"></div>
                            </div>
                        </div>
                    </div>
                </a>

                <div class="mobile-menu-toggle" id="mobileMenuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
      </header>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" id="mobileMenuOverlay">
        <div class="mobile-menu-content">
          <div class="mobile-menu-header">
            <h3>Menu</h3>
            <button class="mobile-menu-close" id="mobileMenuClose">×</button>
          </div>
          
          <!-- Menu Items -->
          <div class="mobile-menu-items" id="mobileMenuItems">
            <!-- Menu items will be populated dynamically -->
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (mobileMenuToggle && mobileMenuOverlay) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
      });
    }

    if (mobileMenuClose && mobileMenuOverlay) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
      });
    }

    // Close mobile menu when clicking outside
    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
          mobileMenuOverlay.classList.remove('active');
        }
      });
    }

    // Theme switching functionality
    this.setupThemeSwitching();
  }

  setupThemeSwitching() {
    const themeRadios = this.querySelectorAll('input[name="theme"]');
    const variantToggle = this.querySelector('#variant-toggle');
    
    // Set initial theme based on current state or default
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    const currentVariant = document.documentElement.getAttribute('data-variant') || 'light';
    
    // Set initial radio button state
    const initialThemeRadio = this.querySelector(`input[value="${currentTheme}"]`);
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

  populateContent() {
    // Get text content from global window object if available
    if (window.getText) {
      const builtWithLove = document.getElementById('builtWithLove');
      const brandName = document.getElementById('brandName');
      const tagline = document.getElementById('tagline');

      if (builtWithLove) {
        builtWithLove.textContent = window.getText('header.builtWithLove') || 'Made with ❤️ in India.';
      }

      if (brandName) {
        brandName.innerHTML = (window.getText('header.brandName') || 'zerocalculator.net').replace('.', '<span class="zero">o </span>');
      }

      if (tagline) {
        const firstLine = tagline.querySelector('.tagline-first');
        const secondLine = tagline.querySelector('.tagline-second');
        if (firstLine) firstLine.textContent = window.getText('header.tagline') || 'Minimal - Fast - Powerful';
        if (secondLine) secondLine.textContent = window.getText('header.taglineSecond') || 'Imagined by Human, Designed by AI';
      }
    } else {
      // Fallback content
      document.getElementById('builtWithLove').textContent = 'Made with ❤️ in India.';
      document.getElementById('brandName').innerHTML = 'zerocalculator<span class="zero">o </span>net';
      this.querySelector('.tagline-first').textContent = 'Minimal - Fast - Powerful';
      this.querySelector('.tagline-second').textContent = 'Imagined by Human, Designed by AI';
    }

    // Populate calculator links in bottom sub-header
    this.populateCalculatorLinks();
    this.populateHomeLink(); // Populate home link
    
    // Populate mobile menu items based on current page
    this.populateMobileMenu();
  }

  populateCalculatorLinks() {
    const calculatorLinks = document.getElementById('calculatorLinks');
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
        const homeLink = document.getElementById('homeLink');
        if (homeLink) homeLink.classList.remove('active');
        // Add active class to clicked link
        link.classList.add('active');
      });
    });
  }

  populateHomeLink() {
    const homeLink = document.getElementById('homeLink');
    if (!homeLink) return;

    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/' || currentPath === '/index.html';
    
    // Add active class if on home page
    if (isHomePage) {
      homeLink.classList.add('active');
    }

    // Add click handler for home link
    homeLink.addEventListener('click', (e) => {
      // Check if already on home page
      if (homeLink.classList.contains('active')) {
        e.preventDefault(); // Prevent navigation if already on home page
        return;
      }
      
      // Remove active class from calculator links
      const calculatorLinks = this.querySelectorAll('.calculator-link');
      calculatorLinks.forEach(link => link.classList.remove('active'));
      
      // Add active class to home link
      homeLink.classList.add('active');
    });
  }

  populateMobileMenu() {
    const mobileMenuItems = document.getElementById('mobileMenuItems');
    if (!mobileMenuItems) return;

    // Get current page path to determine which menu items to show
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
    let menuItems = [];

    if (currentPath.includes('unit-converter')) {
      menuItems.push({ text: 'Unit Converter', active: true });
    } else if (currentPath.includes('bmi-calculator')) {
      menuItems.push({ text: 'BMI Calculator', active: true });
    } else if (currentPath.includes('date-calculator')) {
      menuItems.push({ text: 'Date Calculator', active: true });
    } else if (currentPath.includes('time-calculator')) {
      menuItems.push({ text: 'Time Calculator', active: true });
    } else if (currentPath.includes('emi-calculator')) {
      menuItems.push({ text: 'EMI Calculator', active: true });
    } else if (currentPath.includes('investment-calculator')) {
      menuItems.push({ text: 'Investment Calculator', active: true });
    } else {
      // Main page - show all calculators with navigation links
      menuItems.push(
        { text: '1 • Unit Converter', url: 'unit-converter/', isLink: true },
        { text: '2 • BMI Calculator', url: 'bmi-calculator/', isLink: true },
        { text: '3 • Date Calculator', url: 'date-calculator/', isLink: true },
        { text: '4 • Time Calculator', url: 'time-calculator/', isLink: true },
        { text: '5 • EMI Calculator', url: 'emi-calculator/', isLink: true },
        { text: '6 • Investment Calculator', url: 'investment-calculator/', isLink: true }
      );
    }

    // Add calculator links for sub-pages
    if (isSubPage) {
      menuItems.push({ text: '---', isSeparator: true });
      menuItems.push(
        { text: 'Unit Converter', url: `${baseUrl}unit-converter/index.html`, isLink: true },
        { text: 'BMI Calculator', url: `${baseUrl}bmi-calculator/index.html`, isLink: true },
        { text: 'Date Calculator', url: `${baseUrl}date-calculator/index.html`, isLink: true },
        { text: 'Time Calculator', url: `${baseUrl}time-calculator/index.html`, isLink: true },
        { text: 'EMI Calculator', url: `${baseUrl}emi-calculator/index.html`, isLink: true },
        { text: 'Investment Calculator', url: `${baseUrl}investment-calculator/index.html`, isLink: true }
      );
    }

    mobileMenuItems.innerHTML = menuItems.map(item => {
      if (item.isSeparator) {
        return '<div class="mobile-separator"></div>';
      } else if (item.isLink) {
        return `<a href="${item.url}" class="mobile-item mobile-link">${item.text}</a>`;
      } else {
        const activeClass = item.active ? ' active' : '';
        const dataAttr = item.dataPanel ? ` data-panel="${item.dataPanel}"` : '';
        return `<div class="mobile-item${activeClass}"${dataAttr}>${item.text}</div>`;
      }
    }).join('');

    // No need for click handlers since links handle navigation automatically
  }

  startTaglineAnimation() {
    const taglines = this.querySelectorAll('.tagline');
    if (taglines.length === 0) return;

    const animateTime = 3000; // 3 seconds per line

    function animateTagline() {
      taglines.forEach(tagline => {
        // Reset animation
        tagline.classList.remove('animate');
        
        // Start animation after a small delay
        setTimeout(() => {
          tagline.classList.add('animate');
        }, 100);
        
        // Remove animation class after animation completes
        setTimeout(() => {
          tagline.classList.remove('animate');
        }, animateTime + 100);
      });
    }

    // Auto-start tagline animation
    setTimeout(animateTagline, 100);
    
    // Set up interval for continuous animation
    setInterval(animateTagline, animateTime * 2 + 1000);
  }

  // Public method to trigger tagline animation
  triggerTaglineAnimation() {
    const taglines = this.querySelectorAll('.tagline');
    taglines.forEach(tagline => {
      tagline.classList.remove('animate');
      setTimeout(() => {
        tagline.classList.add('animate');
      }, 100);
      setTimeout(() => {
        tagline.classList.remove('animate');
      }, 3000);
    });
  }

  initializeTheme() {
    const currentTheme = localStorage.getItem('selectedTheme') || 'default';
    const currentVariant = localStorage.getItem('selectedVariant') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-variant', currentVariant);

    // Set initial radio button state
    const initialThemeRadio = this.querySelector(`input[value="${currentTheme}"]`);
    if (initialThemeRadio) {
      initialThemeRadio.checked = true;
    }

    // Set initial variant toggle state
    const variantToggle = this.querySelector('#variant-toggle');
    if (variantToggle) {
      variantToggle.checked = currentVariant === 'dark';
    }
  }
}

// Define the custom element
customElements.define('site-header', SiteHeader); 