// Clean, focused Date Time Picker Web Component
class DateTimePicker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Get component attributes
        this._label = this.getAttribute('label') || 'Date & Time';
        this._idPrefix = this.getAttribute('id-prefix') || 'dt';
        this._showDate = this.getAttribute('show-date') !== 'false';
        this._showTime = this.getAttribute('show-time') !== 'false';
        this._showQuickLinks = this.getAttribute('show-quick-links') !== 'false';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.setupThemeListener();
    }

    render() {
        // Clean HTML structure
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/date-time-picker.css">
            <div class="date-time-picker">
                <label class="picker-label">${this._label}</label>
                
                ${this._showDate ? `
                    <input type="date" class="date-input" id="${this._idPrefix}Date">
                    ${this._showQuickLinks ? `
                        <div class="quick-links">
                            <a href="#" class="quick-link" data-action="today">Today</a>
                        </div>
                    ` : ''}
                ` : ''}
                
                ${this._showTime ? `
                    <input type="time" class="time-input" id="${this._idPrefix}Time">
                    ${this._showQuickLinks ? `
                        <div class="quick-links">
                            <a href="#" class="quick-link" data-action="now">Now</a>
                            <a href="#" class="quick-link" data-action="start-day">Start of Day</a>
                            <a href="#" class="quick-link" data-action="noon">Noon</a>
                        </div>
                    ` : ''}
                ` : ''}
            </div>
        `;
    }

    setupEventListeners() {
        if (this._showQuickLinks) {
            const quickLinks = this.shadowRoot.querySelectorAll('.quick-link');
            quickLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = link.getAttribute('data-action');
                    this.handleQuickAction(action);
                });
            });
        }
    }

    handleQuickAction(action) {
        const now = new Date();
        
        switch (action) {
            case 'today':
                const dateInput = this.shadowRoot.querySelector('input[type="date"]');
                if (dateInput) {
                    dateInput.value = now.toISOString().slice(0, 10);
                    this.dispatchChangeEvent('date', dateInput.value);
                }
                break;
                
            case 'now':
                const timeInput = this.shadowRoot.querySelector('input[type="time"]');
                if (timeInput) {
                    timeInput.value = now.toTimeString().slice(0, 5);
                    this.dispatchChangeEvent('time', timeInput.value);
                }
                break;
                
            case 'start-day':
                const startTimeInput = this.shadowRoot.querySelector('input[type="time"]');
                if (startTimeInput) {
                    startTimeInput.value = '00:00';
                    this.dispatchChangeEvent('time', startTimeInput.value);
                }
                break;
                
            case 'noon':
                const noonTimeInput = this.shadowRoot.querySelector('input[type="time"]');
                if (noonTimeInput) {
                    noonTimeInput.value = '12:00';
                    this.dispatchChangeEvent('time', noonTimeInput.value);
                }
                break;
        }
    }

    setupThemeListener() {
        // Listen for theme change events
        document.addEventListener('themeChanged', (event) => {
            const newTheme = event.detail.theme;
            this.setAttribute('data-theme', newTheme);
        });
    }

    dispatchChangeEvent(type, value) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: { type, value },
            bubbles: true,
            composed: true
        }));
    }

    // Simple getter methods
    get dateValue() {
        const input = this.shadowRoot.querySelector('input[type="date"]');
        return input ? input.value : '';
    }

    get timeValue() {
        const input = this.shadowRoot.querySelector('input[type="time"]');
        return input ? input.value : '';
    }

    // Simple setter methods
    set dateValue(value) {
        const input = this.shadowRoot.querySelector('input[type="date"]');
        if (input) input.value = value;
    }

    set timeValue(value) {
        const input = this.shadowRoot.querySelector('input[type="time"]');
        if (input) input.value = value;
    }

    // Get all values
    getValues() {
        return {
            date: this.dateValue,
            time: this.timeValue
        };
    }

    // Set all values
    setValues(values) {
        if (values.date !== undefined) this.dateValue = values.date;
        if (values.time !== undefined) this.timeValue = values.time;
    }
}

// Register the web component
customElements.define('date-time-picker', DateTimePicker); 