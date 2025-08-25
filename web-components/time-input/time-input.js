class TimeInput extends HTMLElement {
    // ============================================================================
    // CONSTRUCTOR & INITIALIZATION
    // ============================================================================
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._initializeAttributes();
    }

    _initializeAttributes() {
        // Get all attributes with defaults
        this._size = this.getAttribute('size') || 'default';
        this._disabled = this.hasAttribute('disabled');
        this._showQuickLinks = this.hasAttribute('show-quick-links');
        this._label = this.getAttribute('label') || 'Time';
        this._showLabel = this.hasAttribute('show-label');
        this._value = this.getAttribute('value') || '';
        this._placeholder = this.getAttribute('placeholder') || 'HH:MM';
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
        // HTML structure goes here - NO external templates
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="web-components/time-input/time-input.css">
            <div class="time-input-container size-${this._size}">
                ${this._showLabel ? `<label class="time-label" for="timeInput">${this._label}</label>` : ''}
                <div class="input-wrapper">
                    <input 
                        type="time" 
                        id="timeInput" 
                        class="time-input" 
                        value="${this._value}"
                        placeholder="${this._placeholder}"
                        ${this._disabled ? 'disabled' : ''}
                    >
                    ${this._showQuickLinks ? `
                        <div class="quick-links">
                        <button type="button" class="quick-link" data-action="start">Start of Day</button>
                        <button type="button" class="quick-link" data-action="now">Now</button>
                        <button type="button" class="quick-link" data-action="noon">Noon</button>
                        <button type="button" class="quick-link" data-action="end">End of Day</button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // ============================================================================
    // INTERNAL EVENT HANDLING
    // ============================================================================
    
    _setupEventListeners() {
        const timeInput = this.shadowRoot.getElementById('timeInput');
        const quickLinks = this.shadowRoot.querySelectorAll('.quick-link');

        // Time input change event
        timeInput.addEventListener('change', (event) => {
            this._dispatchChangeEvent(event.target.value);
        });

        // Quick link click events
        quickLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const action = event.target.dataset.action;
                this._handleQuickLinkAction(action);
            });
        });
    }

    _setupThemeListener() {
        // Listen for theme change events
        document.addEventListener('themeChanged', (event) => {
            const newTheme = event.detail.theme;
            this.updateTheme(newTheme);
        });
    }

    _handleQuickLinkAction(action) {
        const timeInput = this.shadowRoot.getElementById('timeInput');
        let timeValue = '';

        switch (action) {
            case 'now':
                const now = new Date();
                timeValue = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                break;
            case 'start':
                timeValue = '00:00';
                break;
            case 'noon':
                timeValue = '12:00';
                break;
            case 'end':
                timeValue = '23:59';
                break;
        }

        if (timeValue) {
            timeInput.value = timeValue;
            this._dispatchChangeEvent(timeValue);
        }
    }

    _dispatchChangeEvent(value) {
        const event = new CustomEvent('timeChanged', {
            bubbles: true,
            composed: true,
            detail: {
                value: value,
                component: this
            }
        });
        this.dispatchEvent(event);
    }

    // ============================================================================
    // PUBLIC API METHODS - Can be called from external JavaScript
    // ============================================================================
    
    /**
     * Set the time value of the input
     * @param {string} value - Time value in HH:MM format
     */
    setValue(value) {
        const timeInput = this.shadowRoot.getElementById('timeInput');
        if (timeInput) {
            timeInput.value = value;
            this._value = value;
        }
    }

    /**
     * Get the current time value
     * @returns {string} Current time value
     */
    getValue() {
        const timeInput = this.shadowRoot.getElementById('timeInput');
        return timeInput ? timeInput.value : this._value;
    }

    /**
     * Enable or disable the time input
     * @param {boolean} disabled - Whether to disable the input
     */
    setDisabled(disabled) {
        const timeInput = this.shadowRoot.getElementById('timeInput');
        if (timeInput) {
            timeInput.disabled = disabled;
            this._disabled = disabled;
        }
    }

    /**
     * Update the component theme
     * @param {string} theme - Theme name (green, purple, orange)
     */
    updateTheme(theme) {
        this.setAttribute('data-theme', theme);
    }

    /**
     * Show or hide the quick links
     * @param {boolean} show - Whether to show quick links
     */
    setShowQuickLinks(show) {
        this._showQuickLinks = show;
        this.render();
        this._setupEventListeners();
    }

    /**
     * Get the start of day time (00:00)
     * @returns {string} Start of day time in HH:MM format
     */
    getStartOfDay() {
        return '00:00';
    }

    /**
     * Get the current time
     * @returns {string} Current time in HH:MM format
     */
    getNow() {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    /**
     * Get the noon time (12:00)
     * @returns {string} Noon time in HH:MM format
     */
    getNoon() {
        return '12:00';
    }

    /**
     * Get the end of day time (23:59)
     * @returns {string} End of day time in HH:MM format
     */
    getEndOfDay() {
        return '23:59';
    }

    /**
     * Set the default time value
     * @param {string} defaultValue - Default time value ('now', 'start', 'noon', 'end', or custom HH:MM format)
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
    
    get value() {
        return this.getValue();
    }

    set value(newValue) {
        this.setValue(newValue);
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(newValue) {
        this.setDisabled(newValue);
    }

    // ============================================================================
    // ELEMENT ACCESS METHODS - Get references to internal elements
    // ============================================================================
    
    getTimeInput() {
        return this.shadowRoot.getElementById('timeInput');
    }

    getQuickLinks() {
        return this.shadowRoot.querySelectorAll('.quick-link');
    }

    _setDefaultValue() {
        if (!this._value && this._default) {
            let defaultValue = '';
            switch (this._default) {
                case 'now':
                    defaultValue = this.getNow();
                    break;
                case 'start':
                    defaultValue = this.getStartOfDay();
                    break;
                case 'noon':
                    defaultValue = this.getNoon();
                    break;
                case 'end':
                    defaultValue = this.getEndOfDay();
                    break;
                default:
                    defaultValue = this._default;
            }
            this.setValue(defaultValue);
        }
    }
}

// ============================================================================
// COMPONENT REGISTRATION
// ============================================================================

customElements.define('time-input', TimeInput); 