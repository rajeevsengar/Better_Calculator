# Calculator Tabs Component

A reusable web component for creating dynamic calculator tabs with URL-based navigation and active state management.

## Features

- **Dynamic Tab Generation**: Create tabs from JSON configuration
- **URL-Based Active State**: Automatically detects and highlights active tab based on current URL
- **Responsive Design**: Works on all screen sizes with mobile-optimized layout
- **Theme Support**: Automatically adapts to light/dark themes
- **Accessibility**: Proper focus management and keyboard navigation
- **Smooth Animations**: Elegant transitions and hover effects

## Usage

### Basic Usage

```html
<calculator-tabs 
  tab-config='[
    {"name": "Count Days", "url": "../duration/", "key": "duration"},
    {"name": "Add Days", "url": "../add-days/", "key": "add-days"}
  ]'
  default-tab="duration">
</calculator-tabs>
```

### Advanced Usage

```html
<calculator-tabs 
  tab-config='[
    {"name": "Tab 1", "url": "../tab1/", "key": "tab1"},
    {"name": "Tab 2", "url": "../tab2/", "key": "tab2"},
    {"name": "Tab 3", "url": "../tab3/", "key": "tab3"},
    {"name": "Tab 4", "url": "../tab4/", "key": "tab4"}
  ]'
  default-tab="tab1">
</calculator-tabs>
```

## Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `tab-config` | JSON String | Yes | Array of tab objects with `name`, `url`, and `key` properties |
| `default-tab` | String | No | Key of the default tab to show as active when no URL match is found |

## Tab Configuration Object

Each tab in the `tab-config` array should have:

```javascript
{
  "name": "Display Name",    // Text shown on the tab button
  "url": "../path/",         // URL to navigate to when tab is clicked
  "key": "unique-key"        // Unique identifier for the tab (used for active state detection)
}
```

## JavaScript API

The component exposes several methods for programmatic control:

```javascript
// Get the component element
const tabsComponent = document.querySelector('calculator-tabs');

// Set active tab programmatically
tabsComponent.setActiveTabByKey('tab2');

// Get current active tab
const activeTab = tabsComponent.getActiveTab();

// Get tab configuration
const config = tabsComponent.getTabConfig();
```

## Styling

The component uses CSS custom properties that automatically adapt to your site's theme:

- `--card-background`: Background color for the tabs container
- `--primary-color`: Color for active tab
- `--hover-background`: Background color for tab hover state
- `--border-color`: Border color for the tabs container
- `--shadow-color`: Shadow color for the tabs container
- `--white`: Text color for active tab

## Examples

### Date Calculator Tabs

```html
<calculator-tabs 
  tab-config='[
    {"name": "Count Days", "url": "../duration/", "key": "duration"},
    {"name": "Add Days", "url": "../add-days/", "key": "add-days"}
  ]'
  default-tab="duration">
</calculator-tabs>
```

### Time Calculator Tabs

```html
<calculator-tabs 
  tab-config='[
    {"name": "Count Time", "url": "../time-duration/", "key": "time-duration"},
    {"name": "Add Time", "url": "../add-time/", "key": "add-time"}
  ]'
  default-tab="time-duration">
</calculator-tabs>
```

### Multi-Tab Calculator

```html
<calculator-tabs 
  tab-config='[
    {"name": "Basic", "url": "../basic/", "key": "basic"},
    {"name": "Advanced", "url": "../advanced/", "key": "advanced"},
    {"name": "Settings", "url": "../settings/", "key": "settings"},
    {"name": "Help", "url": "../help/", "key": "help"}
  ]'
  default-tab="basic">
</calculator-tabs>
```

## Browser Support

- Modern browsers with Web Components support
- Shadow DOM v1
- Custom Elements v1
- CSS Grid and Flexbox support

## Dependencies

- Site's CSS theme system
- No external JavaScript dependencies

## Integration

To use this component in your pages:

1. Include the CSS file in your page
2. Include the JavaScript file in your page
3. Add the component HTML where you want the tabs to appear
4. Configure the `tab-config` attribute with your tab data

The component will automatically:
- Generate the tab buttons
- Set the active tab based on the current URL
- Handle navigation when tabs are clicked
- Apply appropriate styling based on your theme
