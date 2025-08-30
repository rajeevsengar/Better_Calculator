# Theme Selector Web Component

A web component that provides theme switching functionality for the calculator application.

## Features

- **Theme Switching**: Switch between 4 predefined themes (default, green, purple, orange)
- **Persistent Storage**: Themes are saved to localStorage and restored on page reload
- **Event System**: Fires `themeChanged` events for other components to listen to
- **Automatic Updates**: Automatically updates theme-dependent components (charts, speedometers, etc.)
- **Smooth Transitions**: Includes subtle animation effects during theme changes

## Usage

### Basic Usage

```html
<theme-selector></theme-selector>
```

### Programmatic Control

```javascript
// Get the theme selector component
const themeSelector = document.querySelector('theme-selector');

// Get current theme
const currentTheme = themeSelector.getCurrentTheme();

// Set theme programmatically
themeSelector.setTheme('green');
```

### Listening to Theme Changes

```javascript
// Listen for theme changes
document.addEventListener('themeChanged', (event) => {
  const newTheme = event.detail.theme;
  console.log('Theme changed to:', newTheme);
  
  // Update your component based on the new theme
  this.updateForTheme(newTheme);
});
```

## Themes

### Default Theme
- Primary: Blue (#3b82f6)
- Background: Light (#f8fafc)
- Text: Dark (#1e293b)

### Green Theme
- Primary: Green (#4caf50)
- Background: Dark green (#1a1f1a)
- Text: White (#ffffff)

### Purple Theme
- Primary: Purple (#9c27b0)
- Background: Dark purple (#1a1a1f)
- Text: White (#ffffff)

### Orange Theme
- Primary: Orange (#ff9800)
- Background: Dark orange (#1f1a1a)
- Text: White (#ffffff)

## CSS Variables

The component uses CSS custom properties (variables) that are automatically applied to the document root:

- `--primary-color`: Main theme color
- `--primary-hover`: Hover state color
- `--accent-color`: Accent/secondary color
- `--background-color`: Page background
- `--surface-color`: Surface/card backgrounds
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--border-color`: Border colors
- And many more...

## Implementation Details

- **Shadow DOM**: Uses shadow DOM for encapsulation
- **Event Bubbling**: Events bubble up through the DOM for easy listening
- **Mutation Observer**: Watches for theme changes and fires events
- **Lazy Loading**: Theme-dependent updates are only applied when needed

## Dependencies

- `components/themes-selector/themes.css` - Theme-specific CSS variables and styles
- No external JavaScript dependencies

## Browser Support

- Modern browsers with Web Components support
- Shadow DOM support required
- Custom Elements support required 