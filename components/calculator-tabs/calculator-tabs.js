/**
 * Calculator Tabs Component
 * A reusable web component for creating dynamic calculator tabs
 * 
 * Usage:
 * <calculator-tabs 
 *   tab-config='[{"name": "Tab 1", "url": "../tab1/", "key": "tab1"}]'
 *   default-tab="tab1">
 * </calculator-tabs>
 */

class CalculatorTabs extends HTMLElement {
  constructor() {
    super();
    this.tabConfig = [];
    this.defaultTab = '';
    this.activeTab = '';
  }

  connectedCallback() {
    this.parseAttributes();
    this.render();
    this.attachEventListeners();
    this.setActiveTab();
  }

  parseAttributes() {
    // Parse tab configuration
    const tabConfigAttr = this.getAttribute('tab-config');
    if (tabConfigAttr) {
      try {
        this.tabConfig = JSON.parse(tabConfigAttr);
      } catch (error) {
        console.error('Invalid tab-config JSON:', error);
        this.tabConfig = [];
      }
    }

    // Parse default tab
    this.defaultTab = this.getAttribute('default-tab') || '';
  }

  render() {
    if (this.tabConfig.length === 0) {
      this.innerHTML = '';
      return;
    }

    const tabsHTML = this.tabConfig.map(tab => `
      <button class="tab-button" data-tab-key="${tab.key}">
        <a href="${tab.url}" class="tab-link">${tab.name}</a>
      </button>
    `).join('');

    this.innerHTML = `
      <div class="calculator-tabs-container">
        <div class="calculator-tabs">
          ${tabsHTML}
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const tabButtons = this.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const tabKey = button.getAttribute('data-tab-key');
        const tab = this.tabConfig.find(t => t.key === tabKey);
        
        if (tab) {
          // Navigate to the tab URL
          window.location.href = tab.url;
        }
      });
    });
  }

  setActiveTab() {
    const currentPath = window.location.pathname;
    let activeTabKey = this.defaultTab;

    // Find active tab based on current URL
    for (const tab of this.tabConfig) {
      if (currentPath.includes(tab.key)) {
        activeTabKey = tab.key;
        break;
      }
    }

    // Update active state
    const tabButtons = this.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      const tabKey = button.getAttribute('data-tab-key');
      if (tabKey === activeTabKey) {
        button.classList.add('active');
        this.activeTab = tabKey;
      } else {
        button.classList.remove('active');
      }
    });
  }

  // Method to programmatically set active tab
  setActiveTabByKey(tabKey) {
    const tabButtons = this.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      const key = button.getAttribute('data-tab-key');
      if (key === tabKey) {
        button.classList.add('active');
        this.activeTab = tabKey;
      } else {
        button.classList.remove('active');
      }
    });
  }

  // Method to get current active tab
  getActiveTab() {
    return this.activeTab;
  }

  // Method to get tab configuration
  getTabConfig() {
    return this.tabConfig;
  }
}

// Register the custom element
customElements.define('calculator-tabs', CalculatorTabs);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalculatorTabs;
}
