class CalculatorDescription extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['calculator'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'calculator' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const calculator = this.getAttribute('calculator') || 'conversion';
    const descriptions = window.CALCULATOR_DESCRIPTIONS?.[calculator] || {};
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 1.5rem;
          background: var(--card-background, #ffffff);
          border-radius: 12px;
          box-shadow: 0 2px 8px var(--shadow-color, rgba(0, 0, 0, 0.1));
          border: 1px solid var(--border-color, #e0e0e0);
          width: 100%;
          box-sizing: border-box;
        }

        .description-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .description-section {
          background: var(--surface-color, #f8f9fa);
          padding: 1.25rem;
          border-radius: 8px;
          border-left: 4px solid var(--primary-color, #007bff);
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary, #333);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-title::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--primary-color, #007bff);
          border-radius: 50%;
        }

        .section-content {
          color: var(--text-primary, #333);
          line-height: 1.6;
        }

        .section-content ul {
          margin: 0;
          padding-left: 1.25rem;
        }

        .section-content li {
          margin-bottom: 0.5rem;
        }

        .section-content li:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          :host {
            padding: 1rem;
            margin-top: 1.5rem;
          }

          .description-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .description-section {
            padding: 1rem;
          }
        }
      </style>

      <div class="description-container">
        ${descriptions.tips ? `
          <div class="description-section">
            <div class="section-title">💡 Tips</div>
            <div class="section-content">${descriptions.tips}</div>
          </div>
        ` : ''}
        
        ${descriptions.instructions ? `
          <div class="description-section">
            <div class="section-title">📋 Instructions</div>
            <div class="section-content">${descriptions.instructions}</div>
          </div>
        ` : ''}
        
        ${descriptions.examples ? `
          <div class="description-section">
            <div class="section-title">🎯 Examples</div>
            <div class="section-content">${descriptions.examples}</div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('calculator-description', CalculatorDescription); 