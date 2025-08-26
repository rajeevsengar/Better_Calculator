# Searchable Select Web Component

A searchable dropdown select component that displays options with main and secondary labels stacked together. Supports searching on both labels and provides a clean, accessible interface.

## Features

- **Searchable Options**: Filter options by typing in the search input
- **Dual Labels**: Each option can have a main label and optional secondary label
- **Theme Support**: Automatically integrates with your theme system
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive**: Works on all screen sizes
- **Customizable**: Multiple size variants and configuration options

## Usage

### Basic Usage

```html
<searchable-select 
    label="Select Country" 
    show-label 
    options='[
        {"value": "us", "label": "United States", "secondaryLabel": "North America"},
        {"value": "uk", "label": "United Kingdom", "secondaryLabel": "Europe"},
        {"value": "in", "label": "India", "secondaryLabel": "Asia"}
    ]'>
</searchable-select>
```

### With JavaScript

```javascript
const select = document.querySelector('searchable-select');

// Set options dynamically
select.setOptions([
    {value: "option1", label: "Option 1", secondaryLabel: "Description 1"},
    {value: "option2", label: "Option 2", secondaryLabel: "Description 2"}
]);

// Set selected value
select.setValue("option1");

// Listen for changes
select.addEventListener('change', (event) => {
    console.log('Selected:', event.detail.value);
    console.log('Option:', event.detail.selectedOption);
});
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | string | `""` | Label text to display above the select |
| `show-label` | boolean | `false` | Whether to show the label |
| `placeholder` | string | `"Select an option..."` | Placeholder text when nothing is selected |
| `size` | string | `"default"` | Size variant: `small`, `default`, `large`, `full` |
| `disabled` | boolean | `false` | Whether the component is disabled |
| `options` | JSON string | `[]` | Array of option objects |

## Option Object Structure

```javascript
{
    value: "unique_value",           // Required: unique identifier
    label: "Main Label",             // Required: primary display text
    secondaryLabel: "Secondary Text" // Optional: smaller secondary text
}
```

## Size Variants

- **small**: Max width 200px
- **default**: Max width 300px  
- **large**: Max width 400px
- **full**: No max width restriction

## Public Methods

### `setValue(value)`
Sets the selected value. Only accepts values that exist in the options array.

### `getValue()`
Returns the currently selected value or `null` if nothing is selected.

### `setOptions(options)`
Updates the options list. Accepts an array of option objects.

### `setDisabled(disabled)`
Enables or disables the component.

### `updateTheme(theme)`
Updates the component theme. Valid themes: `green`, `purple`, `orange`, `default`.

## Events

### `change`
Fired when an option is selected.

**Event Detail:**
```javascript
{
    value: "selected_value",
    selectedOption: {value: "selected_value", label: "Label", secondaryLabel: "Secondary"}
}
```

## Keyboard Navigation

- **Enter/Space**: Open/close dropdown
- **Escape**: Close dropdown
- **Tab**: Navigate through interactive elements
- **Arrow Keys**: Navigate through options (when dropdown is open)

## Theme Integration

The component automatically integrates with your theme system:

- Listens for `themeChanged` events from the parent document
- Uses CSS custom properties for all colors
- Supports green, purple, orange, and default themes
- Automatically updates when themes change

## CSS Custom Properties

The component uses these CSS custom properties (with fallbacks):

```css
--primary-color: #3b82f6
--input-border: #cbd5e1
--input-background: #ffffff
--text-primary: #1e293b
--text-secondary: #475569
--card-background: #ffffff
--border-color: #e2e8f0
--shadow-color: rgba(0, 0, 0, 0.1)
```

## Browser Support

- Modern browsers with Shadow DOM support
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Screen reader announcements
- High contrast support
- Semantic HTML structure 