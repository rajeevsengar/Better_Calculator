class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    // Get centralized footer links and paths
    const footerData = window.getURLS();
    
    this.innerHTML = `
      <link rel="stylesheet" href="${footerData.cssPath}">
      
      <footer class="site-footer">
        <div class="footer-content">
          <a href="${footerData.home}" class="brand-link">
            <div class="brand-section">
              <img src="${footerData.imagePrefix}site_logo.png" alt="zerocalculator Logo" class="brand-logo">
              <div class="brand-text">
              <h1 class="brand-name">zerocalculator<span class="zero">o </span>net</h1>
              </div>
            </div>
          </a>
          <div class="footer-description">
            Each calculator is designed with a very user-friendly approach and most advanced features, with some features not available anywhere else on the internet.
          </div>
          
          <div class="footer-links">
              <a href="${footerData.aboutUs}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>About Us</span>
              </a>
              <a href="${footerData.sitemap}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
                <span>Sitemap</span>
              </a>
              <a href="${footerData.privacy}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.6C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
                <span>Privacy Policy</span>
              </a>
              <a href="${footerData.terms}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <span>Terms of Service</span>
              </a>
              <a href="${footerData.contactUs}" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
                <span>Contact Us</span>
              </a>
              <a href="${footerData.githubUrl}" target="_blank" rel="noopener noreferrer" class="footer-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Open Source</span>
              </a>
            </div>
            
            <div class="copyright">
              © 2025 ZeroCalculator. All rights reserved.
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