/**
 * Info Page Component
 * A reusable web component for info pages like About Us, Contact, Privacy, Terms, etc.
 * 
 * Usage:
 */

class InfoPage extends HTMLElement {
  constructor() {
    super();
    // Don't use shadow DOM to allow CSS inheritance
    // this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    
    // Load content immediately and also when DOM is ready
    this.loadContent();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.loadContent());
    }
    
    // Also try loading after a delay to ensure all scripts are loaded
    setTimeout(() => this.loadContent(), 500);
  }

  static get observedAttributes() {
    return ['page-title', 'content-key', 'sidebar-title', 'sidebar-links'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.loadContent();
    }
  }

  render() {
    const pageTitle = this.getAttribute('page-title') || 'Info Page';
    const sidebarTitle = this.getAttribute('sidebar-title') || 'Quick Links';
    const sidebarLinks = this.getAttribute('sidebar-links') || '[]';

    this.innerHTML = `
      <div class="info-content">
        <h1 class="info-title">${pageTitle}</h1>
        <div class="info-story" id="infoContent">
          <!-- Content will be populated dynamically -->
        </div>
      </div>
    `;

    // Store sidebar data for external use
    this.sidebarData = {
      title: sidebarTitle,
      links: JSON.parse(sidebarLinks)
    };
  }

  loadContent() {
    const contentKey = this.getAttribute('content-key');
    const contentElement = this.querySelector('#infoContent');
    
    if (contentKey && contentElement) {
      // Wait for text config to be available
      const tryLoadContent = () => {
        if (typeof window.getTextArray === "function") {
          const contentArray = window.getTextArray(contentKey);
          
          if (contentArray && contentArray.length > 0) {
            contentElement.innerHTML = contentArray.map(item => {
              const trimmedItem = item.trim();
              
              // If content already contains HTML (like links, bold, or breaks), insert as-is
              if (/<[a-z][\s\S]*>/i.test(trimmedItem)) {
                return `<p>${trimmedItem}</p>`;
              }
              
              // Otherwise, escape to prevent accidental HTML injection and wrap in paragraph
              const safeText = trimmedItem
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
              
              return `<p>${safeText}</p>`;
            }).join('');
          } else {
            // Fallback content if key not found
            contentElement.innerHTML = `<p>Content not found for key: ${contentKey}</p>`;
          }
        } else {
          // Retry after a short delay if text config not ready
          setTimeout(tryLoadContent, 100);
        }
      };
      
      tryLoadContent();
    }
  }
}

// Register the custom element
customElements.define('info-page', InfoPage);
