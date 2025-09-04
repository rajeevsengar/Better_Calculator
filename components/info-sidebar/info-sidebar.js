/**
 * Info Sidebar Component
 * A reusable sidebar component for info pages
 * 
 * Usage:
 * <info-sidebar 
 *   sidebar-title="Our Calculators"
 *   sidebar-links='[{"text":"Unit Converter","href":"../unit-converter/"}]'>
 * </info-sidebar>
 */

class InfoSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['sidebar-title', 'sidebar-links'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const sidebarTitle = this.getAttribute('sidebar-title') || 'Quick Links';
    const sidebarLinks = this.getAttribute('sidebar-links') || '[]';

    this.innerHTML = `
      <div class="info-sidebar">
        <h3>${sidebarTitle}</h3>
        <ul class="info-sidebar-list" id="sidebarLinks">
          <!-- Links will be populated dynamically -->
        </ul>
      </div>
    `;

    // Parse and render sidebar links
    try {
      const links = JSON.parse(sidebarLinks);
      const sidebarList = this.querySelector('#sidebarLinks');
      if (sidebarList) {
        sidebarList.innerHTML = links.map(link => 
          `<li><a href="${link.href}">${link.text}</a></li>`
        ).join('');
      }
    } catch (error) {
      console.warn('Invalid sidebar-links JSON:', error);
    }
  }
}

// Register the custom element
customElements.define('info-sidebar', InfoSidebar);
