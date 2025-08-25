class SearchableSelect extends HTMLElement {
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
        this._placeholder = this.getAttribute('placeholder') || 'Select an option...';
        this._showLabel = this.hasAttribute('show-label');
        this._label = this.getAttribute('label') || '';
        this._options = this._parseOptions();
        this._selectedValue = null;
        this._isOpen = false;
        this._searchTerm = '';

    }

    _parseOptions() {
        try {
            const optionsAttr = this.getAttribute('options');
            return optionsAttr ? JSON.parse(optionsAttr) : [];
        } catch (error) {
            return [];
        }
    }

    connectedCallback() {
        this.render();
        this._setupEventListeners();
        this._setupThemeListener();
    }

    disconnectedCallback() {
        // Clean up event listeners
        if (this._outsideClickHandler) {
            document.removeEventListener('click', this._outsideClickHandler);
        }
    }

    // ============================================================================
    // RENDERING & DOM SETUP
    // ============================================================================
    
    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="web-components/searchable-select/searchable-select.css">
            <div class="component-container size-${this._size}">
                ${this._showLabel ? `<label class="searchable-input-label">${this._label}</label>` : ''}
                <div class="select-wrapper">
                    <div class="searchable-select-field" tabindex="0" role="combobox" aria-expanded="false" aria-haspopup="listbox">
                        <span class="selected-text">${this._getSelectedText()}</span>
                        <span class="select-arrow">▼</span>
                    </div>
                    <div class="dropdown-panel" style="display: none;">
                        <div class="search-container">
                            <input type="text" class="search-input" placeholder="Search options..." />
                        </div>
                        <div class="options-list" role="listbox">
                            ${this._renderOptions()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    _getSelectedText() {
        if (!this._selectedValue) return this._placeholder;
        const selectedOption = this._options.find(opt => opt.value === this._selectedValue);
        return selectedOption ? selectedOption.label : this._placeholder;
    }

    _renderOptions() {
        return this._options
            .map(option => `
                <div class="option-item" 
                     data-value="${option.value}" 
                     role="option" 
                     aria-selected="${option.value === this._selectedValue}">
                    <div class="option-main-label">${option.label}</div>
                    ${option.secondaryLabel ? `<div class="option-secondary-label">${option.secondaryLabel}</div>` : ''}
                </div>
            `).join('');
    }

    _matchesSearch(option) {
        if (!this._searchTerm) return true;
        const searchLower = this._searchTerm.toLowerCase();
        const labelLower = option.label.toLowerCase();
        const secondaryLower = option.secondaryLabel ? option.secondaryLabel.toLowerCase() : '';
        
        // Check if it's an exact match (case-insensitive)
        const isExactMatch = labelLower === searchLower || secondaryLower === searchLower;
        
        // Check if it contains the search term
        const containsMatch = labelLower.includes(searchLower) || secondaryLower.includes(searchLower);
        
        if (isExactMatch || containsMatch) {
            // Store match info for sorting
            option._searchScore = this._calculateSearchScore(option, searchLower);
            option._isExactMatch = isExactMatch;
            return true;
        }
        
        return false;
    }

    _calculateSearchScore(option, searchTerm) {
        const labelLower = option.label.toLowerCase();
        const secondaryLower = option.secondaryLabel ? option.secondaryLabel.toLowerCase() : '';
        searchTerm = searchTerm.toLowerCase();
        
        let score = 0;
        
        // Exact match gets highest score (much higher than others)
        if (this.searchExactWord(searchTerm, labelLower)) score += 10000;
        if (secondaryLower && this.searchExactWord(searchTerm, secondaryLower)) score += 10000;
        
        // Starts with search term gets high score
        if (labelLower.startsWith(searchTerm)) score += 1000;
        if (secondaryLower.startsWith(searchTerm)) score += 1000;
        
        // Contains search term gets medium score
        if (labelLower.includes(searchTerm)) score += 100;
        if (secondaryLower.includes(searchTerm)) score += 100;
        
        // Bonus for shorter labels (more specific matches)
        // This ensures "India" comes before "Indian" when searching "India"
        score += Math.max(0, 100 - option.label.length);
        
        return score;
    }

        searchExactWord(query, text) {
        const regex = new RegExp(`\\b${query}\\b`, 'i'); // \b ensures whole word match
        return regex.test(text);
    }

    // ============================================================================
    // INTERNAL EVENT HANDLING
    // ============================================================================
    
    _setupEventListeners() {
        const trigger = this.shadowRoot.querySelector('.searchable-select-field');
        const searchInput = this.shadowRoot.querySelector('.search-input');
        const optionsList = this.shadowRoot.querySelector('.options-list');

        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this._toggleDropdown();
        });
        trigger.addEventListener('keydown', (e) => this._handleTriggerKeydown(e));

        // Search functionality
        searchInput.addEventListener('input', (e) => this._handleSearch(e));
        searchInput.addEventListener('keydown', (e) => this._handleSearchKeydown(e));

        // Option selection
        optionsList.addEventListener('click', (e) => this._handleOptionClick(e));

        // Close dropdown when clicking outside - use a more reliable approach
        this._outsideClickHandler = (e) => this._handleOutsideClick(e);
        document.addEventListener('click', this._outsideClickHandler);
    }

    _toggleDropdown() {
        if (this._disabled) return;
        
        this._isOpen = !this._isOpen;
        const dropdown = this.shadowRoot.querySelector('.dropdown-panel');
        const trigger = this.shadowRoot.querySelector('.searchable-select-field');
        
        if (this._isOpen) {
            dropdown.style.display = 'block';
            trigger.setAttribute('aria-expanded', 'true');
            this._searchTerm = '';
            this.shadowRoot.querySelector('.search-input').value = '';
            this._updateOptionsList();
            this.shadowRoot.querySelector('.search-input').focus();
        } else {
            dropdown.style.display = 'none';
            trigger.setAttribute('aria-expanded', 'false');
            this._searchTerm = '';
            this.shadowRoot.querySelector('.search-input').value = '';
        }
    }

    _handleTriggerKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this._toggleDropdown();
        } else if (e.key === 'Escape') {
            this._closeDropdown();
        }
    }

    _handleSearch(e) {
        this._searchTerm = e.target.value;
        this._updateOptionsList();
    }

    _handleSearchKeydown(e) {
        if (e.key === 'Escape') {
            this._closeDropdown();
        } else if (e.key === 'Enter') {
            const firstOption = this.shadowRoot.querySelector('.option-item');
            if (firstOption) {
                this._selectOption(firstOption.dataset.value);
            }
        }
    }

    _handleOptionClick(e) {
        const optionItem = e.target.closest('.option-item');
        if (optionItem) {
            this._selectOption(optionItem.dataset.value);
        }
    }

    _handleOutsideClick(e) {
        // Check if the click is outside this component
        const target = e.target;
        if (!this.contains(target) && !this.shadowRoot.contains(target)) {
            this._closeDropdown();
        }
    }

    _selectOption(value) {
        this._selectedValue = value;
        this._closeDropdown();
        this._updateSelectedText();
        this._dispatchChangeEvent();
    }

    _closeDropdown() {
        this._isOpen = false;
        const dropdown = this.shadowRoot.querySelector('.dropdown-panel');
        const trigger = this.shadowRoot.querySelector('.searchable-select-field');
        dropdown.style.display = 'none';
        trigger.setAttribute('aria-expanded', 'false');
        this._searchTerm = '';
        this.shadowRoot.querySelector('.search-input').value = '';
    }

    _updateOptionsList() {
        const optionsList = this.shadowRoot.querySelector('.options-list');
        
        // Get filtered options and sort them by search score
        const filteredOptions = this._options.filter(option => this._matchesSearch(option));
        
        // Sort by search score (highest first) and then by exact match
        filteredOptions.sort((a, b) => {
            // Exact matches first (highest priority)
            if (a._isExactMatch && !b._isExactMatch) return -1;
            if (!a._isExactMatch && b._isExactMatch) return 1;
            
            // Then by search score (highest first)
            if (b._searchScore !== a._searchScore) {
                return b._searchScore - a._searchScore;
            }
            
            // For same scores, prioritize shorter labels (more specific matches)
            if (a.label.length !== b.label.length) {
                return a.label.length - b.label.length;
            }
            
            // Finally, alphabetically for same scores and lengths
            return a.label.localeCompare(b.label);
        });
        
        // Render the sorted options
        optionsList.innerHTML = filteredOptions.map(option => `
            <div class="option-item" 
                 data-value="${option.value}" 
                 role="option" 
                 aria-selected="${option.value === this._selectedValue}">
                <div class="option-main-label">${option.label}</div>
                ${option.secondaryLabel ? `<div class="option-secondary-label">${option.secondaryLabel}</div>` : ''}
            </div>
        `).join('');
        
        // Clean up temporary search properties
        filteredOptions.forEach(option => {
            delete option._searchScore;
            delete option._isExactMatch;
        });
    }

    _updateSelectedText() {
        const selectedText = this.shadowRoot.querySelector('.selected-text');
        selectedText.textContent = this._getSelectedText();
    }

    _dispatchChangeEvent() {
        const event = new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                value: this._selectedValue,
                selectedOption: this._options.find(opt => opt.value === this._selectedValue)
            }
        });
        this.dispatchEvent(event);
    }

    _setupThemeListener() {
        // Listen for theme change events from parent document
        document.addEventListener('themeChanged', (event) => {
            const newTheme = event.detail.theme;
            this.updateTheme(newTheme);
        });
    }

    // ============================================================================
    // PUBLIC API METHODS - Can be called from external JavaScript
    // ============================================================================
    
    /**
     * Set the selected value
     * @param {string} value - The value to select
     */
    setValue(value) {
        if (this._options.some(opt => opt.value === value)) {
            this._selectedValue = value;
            this._updateSelectedText();
        }
    }

    /**
     * Get the currently selected value
     * @returns {string|null} The selected value or null if nothing selected
     */
    getValue() {
        return this._selectedValue;
    }

    /**
     * Set the options list
     * @param {Array} options - Array of option objects with label, secondaryLabel, and value
     */
    setOptions(options) {
        this._options = options || [];
        this._selectedValue = null;
        this._updateOptionsList();
        this._updateSelectedText();
    }

    /**
     * Set the disabled state
     * @param {boolean} disabled - Whether the component should be disabled
     */
    setDisabled(disabled) {
        this._disabled = disabled;
        if (disabled) {
            this.setAttribute('disabled', '');
            this._closeDropdown();
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
    }

    // ============================================================================
    // GETTER & SETTER METHODS - External access to component values
    // ============================================================================
    
    get value() {
        return this._selectedValue;
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
    
    getSearchInput() {
        return this.shadowRoot.querySelector('.search-input');
    }

    getDropdownPanel() {
        return this.shadowRoot.querySelector('.dropdown-panel');
    }

    getOptionsList() {
        return this.shadowRoot.querySelector('.options-list');
    }
}

// ============================================================================
// COMPONENT REGISTRATION
// ============================================================================

customElements.define('searchable-select', SearchableSelect); 