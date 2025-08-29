class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.populateContent();
    this.startTaglineAnimation();
  }

  render() {
    // Determine the correct image paths based on current page
    const currentPath = window.location.pathname;
    const isSubPage = currentPath.includes('/unit-converter') || 
                     currentPath.includes('/bmi-calculator') || 
                     currentPath.includes('/date-calculator') || 
                     currentPath.includes('/time-calculator') || 
                     currentPath.includes('/emi-calculator') || 
                     currentPath.includes('/investment-calculator');
    
    const imagePrefix = isSubPage ? '../assets/images/' : 'assets/images/';
    
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${isSubPage ? '../components/site-header/site-header.css' : 'components/site-header/site-header.css'}">
      
      <!-- Main Header Section -->
      <header class="site-header">
        <div class="top-sub-header">
            <div class="header-content">
                <img src="${imagePrefix}india-flag.png" alt="India Flag" class="flag-icon">
                <span class="built-with-love" id="builtWithLove"></span>
            </div>
        </div>
        
        <div class="main-header">
            <div class="header-content">
                <img id="siteLogo" src="${imagePrefix}site_logo.png" alt="Site Logo" class="site-logo">
                <div class="brand-text">
                    <h1 id="brandName"></h1>
                    <div id="tagline" class="tagline">
                        <div class="tagline-line tagline-first"></div>
                        <div class="tagline-line tagline-second"></div>
                    </div>
                </div>

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
    const mobileMenuToggle = this.shadowRoot.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = this.shadowRoot.getElementById('mobileMenuOverlay');
    const mobileMenuClose = this.shadowRoot.getElementById('mobileMenuClose');

    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mobileMenuOverlay) {
          mobileMenuOverlay.style.display = 'block';
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
      });
    }

    // Mobile menu close
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (mobileMenuOverlay) {
          mobileMenuOverlay.style.display = 'none';
          document.body.style.overflow = ''; // Restore scrolling
        }
      });
    }

    // Close menu when clicking outside
    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
          mobileMenuOverlay.style.display = 'none';
          document.body.style.overflow = ''; // Restore scrolling
        }
      });
    }

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.style.display === 'block') {
        mobileMenuOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  populateContent() {
    // Get text content from global window object if available
    if (window.getText) {
      const builtWithLove = this.shadowRoot.getElementById('builtWithLove');
      const brandName = this.shadowRoot.getElementById('brandName');
      const tagline = this.shadowRoot.getElementById('tagline');

      if (builtWithLove) {
        builtWithLove.textContent = window.getText('header.builtWithLove') || 'Built with ❤️ in India.';
      }

      if (brandName) {
        brandName.textContent = window.getText('header.brandName') || 'zerocalculator.net';
      }

      if (tagline) {
        const firstLine = tagline.querySelector('.tagline-first');
        const secondLine = tagline.querySelector('.tagline-second');
        if (firstLine) firstLine.textContent = window.getText('header.tagline') || 'Minimal - Fast - Powerful';
        if (secondLine) secondLine.textContent = window.getText('header.taglineSecond') || 'Imagined by Human, Designed by AI';
      }
    } else {
      // Fallback content
      this.shadowRoot.getElementById('builtWithLove').textContent = 'Built with ❤️ in India.';
      this.shadowRoot.getElementById('brandName').textContent = 'zerocalculator.net';
      this.shadowRoot.querySelector('.tagline-first').textContent = 'Minimal - Fast - Powerful';
      this.shadowRoot.querySelector('.tagline-second').textContent = 'Imagined by Human, Designed by AI';
    }

    // Populate mobile menu items based on current page
    this.populateMobileMenu();
  }

  populateMobileMenu() {
    const mobileMenuItems = this.shadowRoot.getElementById('mobileMenuItems');
    if (!mobileMenuItems) return;

    // Get current page path to determine which menu items to show
    const currentPath = window.location.pathname;
    let menuItems = [];

    if (currentPath.includes('unit-converter')) {
      menuItems = [
        { text: 'Unit Converter', active: true }
      ];
    } else if (currentPath.includes('bmi-calculator')) {
      menuItems = [
        { text: 'BMI Calculator', active: true }
      ];
    } else if (currentPath.includes('date-calculator')) {
      menuItems = [
        { text: 'Date Calculator', active: true }
      ];
    } else if (currentPath.includes('time-calculator')) {
      menuItems = [
        { text: 'Time Calculator', active: true }
      ];
    } else if (currentPath.includes('emi-calculator')) {
      menuItems = [
        { text: 'EMI Calculator', active: true }
      ];
    } else if (currentPath.includes('investment-calculator')) {
      menuItems = [
        { text: 'Investment Calculator', active: true }
      ];
    } else {
      // Main page - show all calculators
      menuItems = [
        { text: '1 • Unit Converter', dataPanel: 'conversion' },
        { text: '2 • BMI Calculator', dataPanel: 'bmi' },
        { text: '3 • Date Calculator', dataPanel: 'date' },
        { text: '4 • Time Calculator', dataPanel: 'time' },
        { text: '5 • EMI Calculator', dataPanel: 'emi' },
        { text: '6 • Investment Calculator', dataPanel: 'investment' }
      ];
    }

    mobileMenuItems.innerHTML = menuItems.map(item => {
      const activeClass = item.active ? ' active' : '';
      const dataAttr = item.dataPanel ? ` data-panel="${item.dataPanel}"` : '';
      return `<div class="mobile-item${activeClass}"${dataAttr}>${item.text}</div>`;
    }).join('');

    // Add click handlers for menu items
    const items = mobileMenuItems.querySelectorAll('.mobile-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const panel = item.dataset.panel;
        if (panel) {
          this.handleMenuNavigation(panel);
        }
      });
    });
  }

  handleMenuNavigation(panel) {
    // Handle navigation to different calculator panels
    // This can be customized based on your navigation needs
    console.log(`Navigating to panel: ${panel}`);
    
    // Close mobile menu
    this.shadowRoot.getElementById('mobileMenuOverlay').style.display = 'none';
  }

  startTaglineAnimation() {
    const taglines = this.shadowRoot.querySelectorAll('.tagline');
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
    const taglines = this.shadowRoot.querySelectorAll('.tagline');
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
}

// Define the custom element
customElements.define('site-header', SiteHeader); 