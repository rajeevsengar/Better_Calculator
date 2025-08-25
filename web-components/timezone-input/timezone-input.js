import { TimezoneResolver } from '../../helpers/timezone-resolver.js';

class TimezoneInput extends HTMLElement {
    
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
        this._showLabel = this.hasAttribute('show-label');
        this._label = this.getAttribute('label') || 'Timezone';
        this._placeholder = this.getAttribute('placeholder') || 'Select timezone...';
        this._value = this.getAttribute('value') || '';
        this._default = this.getAttribute('default') || null;
        this._timezoneOptions = this._generateTimezoneOptions();
    }

    _generateTimezoneOptions() {
        // Generate all timezone options using Intl API with fallback
        const timezones = [];
        
        try {
            // Use Intl API to get all available timezones
            const supportedTimezones = Intl.supportedValuesOf('timeZone');
        
            const tzWithNoCountry = [];

            supportedTimezones.forEach(timezone => {
                    const timezoneInfo = this.getTimezoneInfo(timezone);
                    const country = timezoneInfo.country;
                    const code = timezoneInfo.code;
                    const offset = timezoneInfo.offset;
                    const offsetMinutes = timezoneInfo.offsetMinutes;

                    const label = `${timezone.replace(/_/g, " ")}${offset ? ` (${offset})` : ''}`;
                    const secondaryLabel = `${code || ''}${country ? ` (${country})` : ''}`;

                    // for debugging
                    if(country == '' || country == null || country == undefined){
                      tzWithNoCountry.push(timezone);
                    }
                    
                    timezones.push({
                        value: timezone,
                        label: label,
                        secondaryLabel: secondaryLabel,
                        offsetMinutes: offsetMinutes
                    });
            });
            timezones.sort((a, b) => {
                if (a.value === 'UTC') return -1;
                if (b.value === 'UTC') return 1;
            
                // Sort by offset minutes ascending
                return a.offsetMinutes - b.offsetMinutes;
            });
            
        } catch (error) {
            // Fallback to hardcoded timezones if Intl API fails
        }
        
        return timezones;
    }

    // ============================================================================
    // RENDERING & DOM SETUP
    // ============================================================================

    connectedCallback() {
        this.render();
        this._setupEventListeners();
        this._setupThemeListener();
        if (this._default) {
            this._setDefaultValue();
        }
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="web-components/searchable-select/searchable-select.css">
            <div class="component-container size-${this._size}">
                ${this._showLabel ? `<label class="component-label">${this._label}</label>` : ''}
                <searchable-select
                    id="timezoneSelect"
                    size="${this._size}"
                    placeholder="${this._placeholder}"
                    ${this._value ? `value="${this._value}"` : ''}
                    ${this._disabled ? 'disabled' : ''}>
                </searchable-select>
            </div>
        `;

        const timezoneSelect = this.shadowRoot.querySelector('#timezoneSelect');
        if (timezoneSelect) {
            timezoneSelect.setOptions(this._timezoneOptions);
        }
    }

    // ============================================================================
    // INTERNAL EVENT HANDLING
    // ============================================================================
    
    _setupEventListeners() {
        const timezoneSelect = this.shadowRoot.querySelector('#timezoneSelect');
        
        if (timezoneSelect) {
            // Listen for changes from the searchable-select component
            timezoneSelect.addEventListener('change', (event) => {
                this._handleTimezoneChange(event);
            });
        }
    }

    _handleTimezoneChange(event) {
        const newValue = event.detail.value;
        this._value = newValue;
        
        // Dispatch change event for external listeners
        this._dispatchChangeEvent();
    }

    _setupThemeListener() {
        // Listen for theme change events from parent document
        document.addEventListener('themeChanged', (event) => {
            const newTheme = event.detail.theme;
            this.updateTheme(newTheme);
        });
    }

    _dispatchChangeEvent() {
        const event = new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                value: this._value,
                selectedOption: this._timezoneOptions.find(opt => opt.value === this._value)
            }
        });
        this.dispatchEvent(event);
    }

    _setDefaultValue() {
        if (!this._value && this._default) {
            let defaultValue = '';
            switch (this._default) {
                case 'now':
                    defaultValue = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    break;
                case 'utc':
                    defaultValue = 'UTC';
                    break;
                default:
                    defaultValue = this._default;
            }
            if (this._timezoneOptions.some(opt => opt.value === defaultValue)) {
                this.setValue(defaultValue);
            }
        }
    }

    // ============================================================================
    // PUBLIC API METHODS - Can be called from external JavaScript
    // ============================================================================
    
    /**
     * Set the selected timezone value
     * @param {string} value - The timezone value to select
     */
    setValue(value) {
        if (this._timezoneOptions.some(opt => opt.value === value)) {
            this._value = value;
            const timezoneSelect = this.shadowRoot.querySelector('#timezoneSelect');
            if (timezoneSelect) {
                timezoneSelect.setValue(value);
            }
        }
    }

    /**
     * Get the currently selected timezone value
     * @returns {string|null} The selected timezone value or null if nothing selected
     */
    getValue() {
        return this._value;
    }

    /**
     * Get the currently selected timezone option object
     * @returns {Object|null} The selected timezone option or null if nothing selected
     */
    getSelectedOption() {
        return this._timezoneOptions.find(opt => opt.value === this._value) || null;
    }

    /**
     * Get all available timezone options
     * @returns {Array} Array of all timezone options
     */
    getTimezoneOptions() {
        return [...this._timezoneOptions];
    }

    /**
     * Get timezone information including code and offset
     * @param {string} timezone - The timezone identifier
     * @returns {Object} Object with code and offset information
     */
    getTimezoneInfo(timezone) {
        const rows = TimezoneResolver.buildTimezoneRows([timezone]);
        const code = rows[0].code;
        const country = rows[0].country;
        const offset = rows[0].offset;
        const offsetMinutes = rows[0].offsetMinutes;
        
        return {
            timezone: timezone,
            code: code,
            country: country,
            offset: offset,
            offsetMinutes: offsetMinutes,
        };
    }

    /**
     * Get timezone code for a specific timezone
     * @param {string} timezone - The timezone identifier (e.g., 'America/New_York')
     * @returns {string} The timezone code (e.g., 'EST/EDT')
     */
    getTimezoneCode(timezone) {
        const rows = TimezoneResolver.buildTimezoneRows([timezone]);
        return rows[0].code;
    }

    /**
     * Set the disabled state
     * @param {boolean} disabled - Whether the component should be disabled
     */
    setDisabled(disabled) {
        this._disabled = disabled;
        const timezoneSelect = this.shadowRoot.querySelector('#timezoneSelect');
        if (timezoneSelect) {
            timezoneSelect.setDisabled(disabled);
        }
        if (disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    /**
     * Update the component theme
     * @param {string} theme - Theme name (green, purple, orange, default)
     */
    updateTheme(theme) {
        this.setAttribute('data-theme', theme);
        const timezoneSelect = this.shadowRoot.querySelector('#timezoneSelect');
        if (timezoneSelect) {
            timezoneSelect.updateTheme(theme);
        }
    }

    /**
     * Set the default timezone value
     * @param {string} defaultValue - Default timezone value ('now', 'utc', or custom timezone identifier)
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
        return this._value;
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
    
    getTimezoneSelect() {
        return this.shadowRoot.querySelector('#timezoneSelect');
    }
}

// ============================================================================
// COMPONENT REGISTRATION
// ============================================================================

customElements.define('timezone-input', TimezoneInput); 