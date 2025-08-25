# Timezone Input Web Component

A web component that provides a searchable timezone selector using the searchable-select component. Automatically generates all available timezones from the browser's Intl API.

## Features

- **Dynamic Timezone Generation**: Automatically detects and lists all available timezones from the browser
- **Searchable Interface**: Uses the searchable-select component for easy timezone selection
- **Smart Sorting**: Timezones are sorted by UTC offset for logical organization
- **Fallback Support**: Includes common timezones if the browser doesn't support Intl.supportedValuesOf
- **Theme Integration**: Automatically works with your theme system
- **Responsive Design**: Supports different sizes and mobile layouts

## Usage

### Basic Usage

```html
<timezone-input 
    show-label 
    label="Select Timezone" 
    placeholder="Choose your timezone...">
</timezone-input>
```

### With Attributes

```html
<timezone-input 
    size="large"
    show-label 
    label="Timezone" 
    placeholder="Select timezone..."
    value="America/New_York">
</timezone-input>
```

### JavaScript API

```javascript
const timezoneInput = document.querySelector('timezone-input');

// Set a timezone value
timezoneInput.setValue('Europe/London');

// Get the selected timezone
const selectedTimezone = timezoneInput.getValue();

// Get the selected option object
const selectedOption = timezoneInput.getSelectedOption();
console.log(selectedOption);
// Output: { value: 'Europe/London', label: 'London', secondaryLabel: 'GMT/BST' }

// Get all available timezone options
const allTimezones = timezoneInput.getTimezoneOptions();

// Get timezone code for a specific timezone
const timezoneCode = timezoneInput.getTimezoneCode('America/New_York');
console.log(timezoneCode); // Output: "EST" or "EDT" (depending on daylight saving)

// Get comprehensive timezone information
const timezoneInfo = timezoneInput.getTimezoneInfo('Asia/Kolkata');
console.log(timezoneInfo);
// Output: {
//   timezone: 'Asia/Kolkata',
//   code: 'IST',
//   offset: '+05:30',
//   offsetMinutes: 330,
//   offsetHours: 5.5
// }

// Set disabled state
timezoneInput.setDisabled(true);

// Update theme
timezoneInput.updateTheme('green');
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | `'default'` | Component size: `'small'`, `'default'`, `'large'`, `'full'` |
| `show-label` | boolean | `false` | Whether to show the label above the input |
| `label` | string | `'Timezone'` | Label text to display |
| `placeholder` | string | `'Select timezone...'` | Placeholder text for the input |
| `value` | string | `''` | Pre-selected timezone value |
| `disabled` | boolean | `false` | Whether the component is disabled |

## Events

### `change` Event

Fired when a timezone is selected:

```javascript
timezoneInput.addEventListener('change', (event) => {
    console.log('Selected timezone:', event.detail.value);
    console.log('Selected option:', event.detail.selectedOption);
});
```

## Timezone Data Structure

Each timezone option has the following structure:

```javascript
{
    value: 'America/New_York',        // IANA timezone identifier
    label: 'New York (EST/EDT)',     // City name with current offset
    secondaryLabel: 'EST/EDT'        // Timezone code/abbreviation
}
```

## Browser Compatibility

- **Modern Browsers**: Uses `Intl.supportedValuesOf('timeZone')` for complete timezone list
- **Fallback**: Includes common timezones for older browsers
- **Progressive Enhancement**: Automatically detects browser capabilities

## Dependencies

- `searchable-select` component (must be loaded before this component)
- Modern browser with Intl API support (for full timezone list)

## Integration

The component automatically integrates with your theme system:

- Listens for `themeChanged` events
- Uses CSS custom properties for theming
- Supports all theme variants (green, purple, orange, default)

## Examples

### Different Sizes

```html
<timezone-input size="small" show-label label="Small"></timezone-input>
<timezone-input size="default" show-label label="Default"></timezone-input>
<timezone-input size="large" show-label label="Large"></timezone-input>
<timezone-input size="full" show-label label="Full Width"></timezone-input>
```

### With Pre-selected Value

```html
<timezone-input 
    value="Asia/Tokyo" 
    show-label 
    label="Current Timezone">
</timezone-input>
```

### Disabled State

```html
<timezone-input 
    disabled 
    show-label 
    label="Disabled Timezone">
</timezone-input>
``` 