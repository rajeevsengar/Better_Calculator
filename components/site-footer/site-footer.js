class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    // Determine the correct paths based on current page
    const currentPath = window.location.pathname;
    const isSubPage = currentPath.includes('/unit-converter') || 
                     currentPath.includes('/bmi-calculator') || 
                     currentPath.includes('/date-calculator') || 
                     currentPath.includes('/time-calculator') || 
                     currentPath.includes('/emi-calculator') || 
                     currentPath.includes('/investment-calculator') ||
                     currentPath.includes('/about') ||
                     currentPath.includes('/sitemap');
    
    const cssPath = isSubPage ? '../components/site-footer/site-footer.css' : 'components/site-footer/site-footer.css';
    const imagePrefix = isSubPage ? '../assets/images/' : 'assets/images/';
    
    this.innerHTML = `
      <link rel="stylesheet" href="${cssPath}">
      
      <footer class="site-footer">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="${imagePrefix}site_logo.png" alt="Zero Calculator Logo" class="footer-logo">
            <span class="brand-name">ZeroCalculator<span class="o">o </span>net</span>
          </div>
          
          <div class="footer-description">
            Each calculator is designed with a very user-friendly approach and most advanced features, with some features not available anywhere else on the internet.
          </div>
          
          <div class="footer-info">
            <div class="footer-links">
              <a href="${isSubPage ? '../about/' : 'about/'}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>About Us</span>
              </a>
              <a href="${isSubPage ? '../sitemap/' : 'sitemap/'}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
                <span>Sitemap</span>
              </a>
            </div>
            
            <div class="open-source">
              <a href="https://github.com/rajeevsengar/Zero_Calculator" target="_blank" rel="noopener noreferrer" class="github-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Open Source</span>
              </a>
            </div>
            
            <div class="copyright">
              © 2024 ZeroCalculator. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  setupEventListeners() {
    // Add hover effect for GitHub link
    const githubLink = this.querySelector('.github-link');
    if (githubLink) {
      githubLink.addEventListener('mouseenter', () => {
        githubLink.style.transform = 'translateY(-2px) scale(1.1)';
      });
      
      githubLink.addEventListener('mouseleave', () => {
        githubLink.style.transform = 'translateY(0) scale(1)';
      });
    }
  }
}

// Define the custom element
customElements.define('site-footer', SiteFooter); 