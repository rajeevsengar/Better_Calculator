# Time Input Web Component

A customizable time input web component with quick link buttons for common time selections.

## Features

- **Time Input Field**: Native HTML5 time input with custom styling
- **Quick Links**: Three preset buttons for common time selections:
  - **Now**: Sets current time
  - **Start of Day**: Sets to 00:00 (midnight)
  - **Noon**: Sets to 12:00 (noon)
- **Theme Integration**: Automatically works with your theme system
- **Size Variants**: Small, default, large, and full width options
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Event System**: Dispatches custom events for time changes

## Usage

### Basic Usage

```html
<!-- Basic time input -->
<time-input></time-input>

<!-- With label and quick links -->
<time-input 
    label="Meeting Time" 
    show-label 
    show-quick-links>
</time-input>

<!-- With preset value -->
<time-input 
    value="14:30" 
    show-quick-links>
</time-input>
```

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | `'default'` | Size variant: `'small'`, `'default'`, `'large'`, `'full'` |
| `disabled` | boolean | `false` | Whether the input is disabled |
| `show-quick-links` | boolean | `false` | Show quick link buttons |
| `label` | string | `'Time'` | Label text for the input |
| `show-label` | boolean | `false` | Whether to display the label |
| `value` | string | `''` | Initial time value (HH:MM format) |
| `placeholder` | string | `'HH:MM'` | Placeholder text |

### JavaScript API

```javascript
const timeInput = document.querySelector('time-input');

// Get/set value
console.log(timeInput.value); // Get current value
timeInput.setValue('15:45'); // Set new value

// Enable/disable
timeInput.setDisabled(true);

// Show/hide quick links
timeInput.setShowQuickLinks(true);

// Update theme
timeInput.updateTheme('green');

// Get internal elements
const input = timeInput.getTimeInput();
const quickLinks = timeInput.getQuickLinks();
```

### Events

The component dispatches a `timeChanged` event when the time value changes:

```javascript
timeInput.addEventListener('timeChanged', (event) => {
    console.log('New time:', event.detail.value);
    console.log('Component:', event.detail.component);
});
```

## Styling

The component automatically integrates with your theme system and supports:

- **Theme Colors**: Primary, secondary, and accent colors
- **Size Variants**: Different sizes with appropriate spacing
- **Responsive Design**: Mobile-friendly layout
- **Focus States**: Accessible focus indicators
- **Hover Effects**: Interactive hover states

## Browser Support

- Modern browsers with Shadow DOM support
- Requires ES6+ JavaScript features
- Gracefully degrades for older browsers

## Dependencies

- `../../css/themes.css` - Theme system integration
- `../../css/style.css` - Base styling variables 