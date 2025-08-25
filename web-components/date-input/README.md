# Date Input Web Component

A self-contained, theme-aware date input web component that automatically integrates with your existing CSS theme system. Drop it into any HTML page and it works immediately without additional JavaScript setup.

## 🚀 Quick Start

```html
<!-- Basic usage -->
<date-input></date-input>

<!-- With label -->
<date-input label="Select Date" show-label></date-input>
```

## 📋 Attributes

### Core Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | string | `"default"` | Component size: `"small"`, `"default"`, `"large"`, `"full"` |
| `label` | string | `""` | Custom label text to display above the input |
| `show-label` | boolean | `false` | Show/hide the label (set attribute to enable) |
| `button-text` | string | `"Now"` | Custom text for the quick action link |
| `disabled` | boolean | `false` | Disable the entire component (set attribute to enable) |
| `placeholder` | string | `""` | Custom placeholder text for the input field |

### Size Variants

| Size | Max Width | Padding | Font Size | Use Case |
|------|-----------|---------|-----------|----------|
| `small` | 200px | 8px 12px | 14px | Compact forms, inline usage |
| `default` | 300px | 12px 16px | 16px | Standard forms, most use cases |
| `large` | 400px | 16px 20px | 18px | Prominent forms, mobile-friendly |
| `full` | 100% | 12px 16px | 16px | Full-width layouts, responsive design |

## 🎨 Theme Integration

The component automatically integrates with your page's theme system through a universal theme synchronization system built into `script.js`. 

### **Automatic Theme Detection**
- **No JavaScript code needed** - works automatically
- **Universal system** - handles all web components on the page
- **Real-time updates** - changes immediately when themes switch
- **Future-proof** - automatically works with new web components

### **Theme Colors**
The component automatically inherits these colors from your page:
- **Primary Color**: Link color, focus borders
- **Input Background**: Date input field background  
- **Text Colors**: Labels, input text, button text
- **Border Colors**: Input field borders
- **Shadow Colors**: Focus effects, component shadows

**Supported Themes**: Default (Blue), Green, Purple, Orange

### **How It Works**
1. **Event Listening**: Component listens for `themeChanged` events from the page
2. **Automatic Updates**: `script.js` fires events when themes change
3. **No Setup Required**: Just drop the component in your HTML
4. **Instant Updates**: Colors change immediately when theme events fire

## 📝 Usage Examples

### Basic Implementation

```html
<!-- Simple date picker -->
<date-input></date-input>

<!-- With custom label -->
<date-input label="Appointment Date" show-label></date-input>

<!-- Different sizes -->
<date-input size="small" label="Quick Date" show-label></date-input>
<date-input size="large" label="Main Date" show-label></date-input>
```

### Advanced Customization

```html
<!-- Custom link text -->
<date-input button-text="Set Today" label="Event Date" show-label></date-input>

<!-- Full width for responsive layouts -->
<date-input size="full" label="Full Width Date" show-label></date-input>

<!-- Disabled state -->
<date-input disabled label="Read Only Date" show-label></date-input>
```

### Form Integration

```html
<form>
  <div class="form-group">
    <date-input 
      name="startDate" 
      label="Start Date" 
      show-label 
      size="default">
    </date-input>
  </div>
  
  <div class="form-group">
    <date-input 
      name="endDate" 
      label="End Date" 
      show-label 
      size="default">
    </date-input>
  </div>
</form>
```

## 🎯 Event Handling

### Available Events

| Event | Description | Event Detail |
|-------|-------------|--------------|
| `dateChange` | Fired when date value changes | `{ value: "2024-01-15" }` |
| `input` | Fired on every input change | `{ value: "2024-01-15" }` |

### Event Examples

```html
<date-input id="myDateInput" label="Select Date" show-label></date-input>

<script>
  const dateInput = document.getElementById('myDateInput');
  
  // Listen for date changes
  dateInput.addEventListener('dateChange', (event) => {
    console.log('Date changed to:', event.detail.value);
    // event.detail.value contains the selected date (YYYY-MM-DD format)
  });
  
  // Listen for all input changes
  dateInput.addEventListener('input', (event) => {
    console.log('Input value:', event.detail.value);
  });
</script>
```

### Form Validation Example

```html
<date-input id="birthDate" label="Birth Date" show-label></date-input>
<div id="validationMessage" class="error-message"></div>

<script>
  const birthDate = document.getElementById('birthDate');
  const message = document.getElementById('validationMessage');
  
  birthDate.addEventListener('dateChange', (event) => {
    const selectedDate = new Date(event.detail.value);
    const today = new Date();
    const age = today.getFullYear() - selectedDate.getFullYear();
    
    if (age < 18) {
      message.textContent = 'Must be 18 or older';
      message.style.display = 'block';
    } else {
      message.style.display = 'none';
    }
  });
</script>
```

## 🔧 Programmatic Control

### Available Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `setCurrentDate()` | None | Sets the input to today's date |
| `get value` | None | Gets the current date value |
| `set value` | `dateString` | Sets the date value programmatically |
| `setDisabled(boolean)` | `true/false` | Enable/disable the component |
| `setDateRange(min, max)` | `minDate, maxDate` | Set min/max allowed dates |

### Method Examples

```html
<date-input id="programmaticDate" label="Programmatic Date" show-label></date-input>
<button onclick="setToday()">Set Today</button>
<button onclick="setSpecificDate()">Set 2024-01-01</button>
<button onclick="getValue()">Get Value</button>
<button onclick="toggleDisabled()">Toggle Disabled</button>

<script>
  const dateInput = document.getElementById('programmaticDate');
  
  function setToday() {
    dateInput.setCurrentDate();
  }
  
  function setSpecificDate() {
    dateInput.value = '2024-01-01';
  }
  
  function getValue() {
    alert('Current date: ' + dateInput.value);
  }
  
  function toggleDisabled() {
    const isDisabled = dateInput.getDateInput().disabled;
    dateInput.setDisabled(!isDisabled);
  }
</script>
```

## 🎨 Styling & Customization

### CSS Custom Properties

The component uses these CSS variables from your page:

```css
:root {
  --primary-color: #3b82f6;      /* Link color, focus borders */
  --primary-hover: #2563eb;      /* Link hover state */
  --input-background: #ffffff;   /* Input field background */
  --input-border: #cbd5e1;       /* Input field borders */
  --text-primary: #1e293b;       /* Main text color */
  --text-secondary: #475569;     /* Label text color */
  --card-background: #ffffff;    /* Component background */
  --border-color: #e2e8f0;       /* Component borders */
  --shadow-color: rgba(0,0,0,0.1); /* Shadows and focus effects */
}
```

### Custom Styling

```css
/* Override component styles */
date-input {
  --primary-color: #ff6b6b;      /* Custom primary color */
  --input-border: #ddd;          /* Custom border color */
}

/* Style the component container */
date-input {
  margin: 20px 0;
  display: block;
}
```

## 📱 Responsive Design

The component automatically adapts to different screen sizes:

- **Mobile**: Uses appropriate touch-friendly sizing
- **Tablet**: Balanced sizing for touch and mouse
- **Desktop**: Full-featured with hover effects
- **Responsive**: `size="full"` adapts to container width

## ♿ Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Screen Reader Support**: Compatible with assistive technologies
- **High Contrast**: Works with high contrast themes

## 🔒 Browser Support

- **Modern Browsers**: Chrome 67+, Firefox 63+, Safari 10.1+, Edge 79+
- **Web Components**: Native support in all modern browsers
- **Fallbacks**: Graceful degradation for older browsers

## 📦 Installation

### Option 1: Direct Include
```html
<script src="web-components/date-input/date-input.js"></script>
```

### Option 2: Module Import
```javascript
import './web-components/date-input/date-input.js';
```

### Option 3: CDN (if hosted)
```html
<script src="https://your-domain.com/web-components/date-input/date-input.js"></script>
```

## 🔧 Event-Based Theme System

The web component automatically works with the event-based theme synchronization system built into `script.js`. This system:

## 📁 File Structure

The web component follows a clean separation of concerns:

```
web-components/date-input/
├── date-input.js      # Component logic and behavior
├── date-input.css     # All styling and theme integration
└── README.md          # Documentation
```

### **Why This Structure?**

1. **Separation of Concerns**: JavaScript handles logic, CSS handles styling
2. **Maintainability**: Easy to modify styles without touching JavaScript
3. **Reusability**: CSS can be imported by other components if needed
4. **Developer Experience**: Familiar workflow for frontend developers
5. **Performance**: CSS is cached separately from JavaScript

## 🏷️ HTML Structure

The component generates semantic HTML with data attributes for better accessibility and flexibility:

```html
<div class="date-input-container">
  <label class="date-input-label">Select Date</label>
  <input type="date" class="date-input-field">
  <div class="quick-links">
    <a href="#" class="quick-link" data-action="now" data-target="date">Now</a>
  </div>
</div>
```

### **Data Attributes**
- `data-action="now"` - Identifies the action type
- `data-target="date"` - Specifies the target input field
- `href="#"` - Semantic link structure for accessibility

- **Automatically detects** all web components on the page
- **Handles theme changes** for all components simultaneously  
- **Requires no additional code** - works out of the box
- **Future-proof** - automatically works with new web components
- **Performance optimized** - uses efficient DOM observation

### **For Developers**
If you're building additional web components, simply implement the `syncWithPageTheme()` method:

```javascript
class MyWebComponent extends HTMLElement {
  // ... other methods ...
  
  syncWithPageTheme() {
    const pageTheme = document.documentElement.getAttribute('data-theme') || 'default';
    this.setAttribute('data-theme', pageTheme);
    // Your theme logic here
  }
}
```

The universal system will automatically find and sync your component!

## 🧪 Testing

Test the component with different themes and configurations:

```html
<!-- Test different sizes -->
<date-input size="small" label="Small" show-label></date-input>
<date-input size="default" label="Default" show-label></date-input>
<date-input size="large" label="Large" show-label></date-input>
<date-input size="full" label="Full Width" show-label></date-input>

<!-- Test different configurations -->
<date-input label="With Label" show-label button-text="Custom"></date-input>
<date-input disabled label="Disabled" show-label></date-input>
```

## 🐛 Troubleshooting

### Common Issues

1. **Component not rendering**: Ensure the script is loaded before use
2. **Theme not applying**: Check that CSS custom properties are defined in your page
3. **Events not firing**: Verify the component is fully loaded before adding listeners

### Debug Mode

```html
<!-- Enable debug logging -->
<date-input debug></date-input>
```

## 🤝 Contributing

To extend the component:

1. **Add new attributes** in the constructor
2. **Update the render method** for new HTML/styling
3. **Add new methods** for additional functionality
4. **Update this README** with new features

## 📄 License

This component is part of the Calculator project and follows the same license terms.

---

**Made with ❤️ for easy web development** 