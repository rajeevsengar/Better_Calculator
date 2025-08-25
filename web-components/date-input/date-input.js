// Date Input Web Component
class DateInput extends HTMLElement {
    // ============================================================================
    // CONSTRUCTOR & INITIALIZATION
    // ============================================================================
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._dateValue = '';
        
        // Initialize component attributes
        this._initializeAttributes();
    }

    _initializeAttributes() {
        this._size = this.getAttribute('size') || 'default';
        this._variant = this.getAttribute('variant') || 'default';
        this._disabled = this.hasAttribute('disabled');
        this._label = this.getAttribute('label') || '';
        this._buttonText = this.getAttribute('button-text') || 'Today';
        this._showLabel = this.hasAttribute('show-label');
        this._dateValue = this.getAttribute('value') || '';
        this._default = this.getAttribute('default') || null;
    }

    connectedCallback() {
        this.render();
        this._setupEventListeners();
        this._setupThemeListener();
        if (this._default) {
            this._setDefaultValue();
        }
    }

    // ============================================================================
    // RENDERING & DOM SETUP
    // ============================================================================
    
    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="web-components/date-input/date-input.css">
            <div class="date-input-container size-${this._size}">
                ${this._showLabel && this._label ? `<label class="date-input-label">${this._label}</label>` : ''}
                <input type="date" class="date-input-field size-${this._size}" id="dateInput" ${this._disabled ? 'disabled' : ''} ${this._dateValue ? `value="${this._dateValue}"` : ''}>
                <div class="quick-links">
                    <a href="#" class="quick-link size-${this._size}" data-action="yesterday" data-target="date" ${this._disabled ? 'aria-disabled="true"' : ''}>Yesterday</a>
                    <a href="#" class="quick-link size-${this._size}" data-action="now" data-target="date" ${this._disabled ? 'aria-disabled="true"' : ''}>Today</a>
                    <a href="#" class="quick-link size-${this._size}" data-action="tomorrow" data-target="date" ${this._disabled ? 'aria-disabled="true"' : ''}>Tomorrow</a>
                </div>
            </div>
        `;
    }

    // ============================================================================
    // INTERNAL EVENT HANDLING
    // ============================================================================
    
    _setupEventListeners() {
        const dateInput = this.shadowRoot.getElementById('dateInput');
        const quickLinks = this.shadowRoot.querySelectorAll('.quick-link');

        if (dateInput) {
            dateInput.addEventListener('change', (e) => {
                this._dateValue = e.target.value;
                this._dispatchDateChangeEvent(this._dateValue);
            });

            dateInput.addEventListener('input', (e) => {
                this._dateValue = e.target.value;
            });
        }

        if (quickLinks) {
            quickLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!this._disabled) {
                        const action = link.getAttribute('data-action');
                        this._handleQuickLinkAction(action);
                    }
                });
            });
        }
    }

    _handleQuickLinkAction(action) {
        const dateInput = this.shadowRoot.getElementById('dateInput');
        if (!dateInput) return;

        const now = new Date();
        let targetDate = new Date();

        switch (action) {
            case 'yesterday':
                targetDate.setDate(now.getDate() - 1);
                break;
            case 'now':
                // Keep current date (today)
                break;
            case 'tomorrow':
                targetDate.setDate(now.getDate() + 1);
                break;
            default:
                return;
        }

        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        dateInput.value = formattedDate;
        this._dateValue = formattedDate;
        
        this._dispatchDateChangeEvent(this._dateValue);
    }

    _setDefaultValue() {
        if (!this._dateValue && this._default) {
            let defaultValue = '';
            switch (this._default) {
                case 'now':
                    defaultValue = this._getFormattedDate(new Date());
                    break;
                case 'yesterday':
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    defaultValue = this._getFormattedDate(yesterday);
                    break;
                case 'tomorrow':
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    defaultValue = this._getFormattedDate(tomorrow);
                    break;
                default:
                    defaultValue = this._default;
            }
            this.value = defaultValue;
        }
    }

    _getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    _setupThemeListener() {
        document.addEventListener('themeChanged', (event) => {
            const newTheme = event.detail.theme;
            this.updateTheme(newTheme);
        });
    }

    _dispatchDateChangeEvent(value) {
        this.dispatchEvent(new CustomEvent('dateChange', {
            detail: { value },
            bubbles: true,
            composed: true
        }));
    }

    // ============================================================================
    // PUBLIC API METHODS - Can be called from external JavaScript
    // ============================================================================
    
    /**
     * Set the current date to today's date
     */
    setCurrentDate() {
        const dateInput = this.shadowRoot.getElementById('dateInput');
        if (dateInput) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;
            
            dateInput.value = currentDate;
            this._dateValue = currentDate;
            
            this._dispatchDateChangeEvent(this._dateValue);
        }
    }

    /**
     * Enable or disable the component
     * @param {boolean} disabled - Whether to disable the component
     */
    setDisabled(disabled) {
        const dateInput = this.shadowRoot.getElementById('dateInput');
        const quickLinks = this.shadowRoot.querySelectorAll('.quick-link');
        
        if (dateInput) dateInput.disabled = disabled;
        if (quickLinks) {
            quickLinks.forEach(link => {
                if (disabled) {
                    link.setAttribute('aria-disabled', 'true');
                    link.style.pointerEvents = 'none';
                    link.style.opacity = '0.5';
                } else {
                    link.removeAttribute('aria-disabled');
                    link.style.pointerEvents = '';
                    link.style.opacity = '';
                }
            });
        }
    }

    /**
     * Set minimum and maximum date constraints
     * @param {string} minDate - Minimum allowed date (YYYY-MM-DD)
     * @param {string} maxDate - Maximum allowed date (YYYY-MM-DD)
     */
    setDateRange(minDate, maxDate) {
        const dateInput = this.shadowRoot.getElementById('dateInput');
        if (dateInput) {
            if (minDate) dateInput.min = minDate;
            if (maxDate) dateInput.max = maxDate;
        }
    }

    /**
     * Update the component's theme
     * @param {string} theme - Theme name (default, green, purple, orange)
     */
    updateTheme(theme) {
        this.setAttribute('data-theme', theme);
    }

    /**
     * Set the default date value
     * @param {string} defaultValue - Default date value ('now', 'yesterday', 'tomorrow', or custom YYYY-MM-DD format)
     */
    setDefault(defaultValue) {
        this._default = defaultValue;
        this._setDefaultValue();
    }

    /**
     * Get the current default value
     * @returns {string} Current default value
     */
    getDefault() {
        return this._default;
    }

    // ============================================================================
    // GETTER & SETTER METHODS - External access to component values
    // ============================================================================
    
    /**
     * Get the current date value
     * @returns {string} Current date in YYYY-MM-DD format
     */
    get value() {
        return this._dateValue;
    }

    /**
     * Set the date value
     * @param {string} dateString - Date in YYYY-MM-DD format
     */
    set value(dateString) {
        const dateInput = this.shadowRoot.getElementById('dateInput');
        if (dateInput) {
            dateInput.value = dateString;
            this._dateValue = dateString;
        }
    }

    // ============================================================================
    // ELEMENT ACCESS METHODS - Get references to internal elements
    // ============================================================================
    
    /**
     * Get the date input element
     * @returns {HTMLInputElement|null} The date input element
     */
    getDateInput() {
        return this.shadowRoot.getElementById('dateInput');
    }

    /**
     * Get all quick link elements
     * @returns {NodeList} All quick link elements
     */
    getQuickLinks() {
        return this.shadowRoot.querySelectorAll('.quick-link');
    }

    /**
     * Get a specific quick link element by action
     * @param {string} action - The action to find (yesterday, now, tomorrow)
     * @returns {HTMLAnchorElement|null} The quick link element with the specified action
     */
    getQuickLink(action) {
        return this.shadowRoot.querySelector(`[data-action="${action}"]`);
    }
}

// ============================================================================
// COMPONENT REGISTRATION
// ============================================================================

customElements.define('date-input', DateInput);

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateInput;
} 