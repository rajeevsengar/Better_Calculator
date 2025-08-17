# Pro Multi-Calculator - Responsive Mobile & Desktop

A feature-rich calculator website with automatic responsive design that adapts to both mobile and desktop devices.

## 🚀 Features

- **5 Powerful Calculators**: Unit Converter, BMI Calculator, EMI Calculator, Investment Calculator, Date & Timezone Calculator
- **Responsive Design**: Automatically detects device type and redirects to appropriate version
- **Unified Codebase**: Changes to desktop automatically reflect on mobile
- **Touch-Friendly Mobile**: Optimized for mobile devices with swipe gestures and touch-friendly UI
- **Theme Support**: Multiple color themes with automatic synchronization
- **Easter Eggs**: Hidden features and stories for curious users

## 📱 Responsive System

### Automatic Device Detection
The system automatically detects your device and redirects you to the appropriate version:

- **Mobile (≤768px)**: Redirects to `mobile.html`
- **Tablet (769px-1024px)**: Smart detection based on screen size
- **Desktop (>1024px)**: Redirects to `index.html`

### Version Switching
Users can manually switch between versions using the floating switcher button that appears on both pages.

## 🏗️ Architecture

### File Structure
```
Calculator/
├── index.html          # Desktop version
├── mobile.html         # Mobile version
├── css/
│   ├── style.css      # Base styles
│   ├── themes.css     # Theme definitions
│   ├── misc.css       # Additional styles
│   └── mobile.css     # Mobile-specific styles
├── js/
│   ├── constants.js   # Shared constants
│   ├── script.js      # Main functionality
│   ├── util.js        # Utility functions
│   ├── mobile.js      # Mobile-specific logic
│   ├── responsive-redirect.js  # Auto-redirect logic
│   └── [calculator-specific files]
└── images/            # Shared images
```

### Key Principles

1. **Single Source of Truth**: All calculator logic is in shared JavaScript files
2. **Automatic Sync**: Mobile inputs automatically sync with desktop functionality
3. **Responsive CSS**: Mobile styles automatically adapt to desktop changes
4. **Unified Theming**: Theme changes apply to both versions simultaneously

## 🔧 How to Add New Features

### Adding a New Calculator

1. **Update both HTML files** (`index.html` and `mobile.html`):
   - Add the calculator section with mobile-specific classes
   - Use `mobile-` prefixed IDs for mobile inputs

2. **Add to mobile.js**:
   - Create `initializeMobile[CalculatorName]()` function
   - Sync mobile inputs with desktop inputs
   - Handle mobile-specific UI logic

3. **Add to mobile.css**:
   - Create mobile-specific styles for the new calculator
   - Ensure responsive behavior across different screen sizes

### Example: Adding a New Calculator

```javascript
// In mobile.js
function initializeMobileNewCalculator() {
    const mobileInput = document.getElementById('mobileNewInput');
    const desktopInput = document.getElementById('newInput');
    
    if (mobileInput && desktopInput) {
        mobileInput.addEventListener('input', function() {
            desktopInput.value = this.value;
            // Trigger desktop calculation
            if (typeof calculateNew === 'function') {
                calculateNew();
            }
        });
    }
}

// In mobile.css
.mobile-new-calculator {
    /* Mobile-specific styles */
}

@media (max-width: 480px) {
    .mobile-new-calculator {
        /* Small mobile adjustments */
    }
}
```

## 🎨 Customization

### Adding New Themes

1. **Update `themes.css`**:
   ```css
   [data-theme="new-theme"] {
       --primary-color: #your-color;
       --accent-color: #your-accent;
       /* ... other variables */
   }
   ```

2. **Update both HTML files** to include the new theme option

### Modifying Layouts

- **Desktop**: Modify `index.html` and `css/style.css`
- **Mobile**: Modify `mobile.html` and `css/mobile.css`
- **Shared**: Modify JavaScript files and `css/themes.css`

## 📱 Mobile-Specific Features

### Touch Gestures
- Swipe to navigate between calculators
- Touch-friendly button sizes
- Optimized input fields for mobile keyboards

### Mobile Menu
- Slide-out navigation menu
- Collapsible sections
- Touch-friendly controls

### Responsive Tables
- Horizontal scrolling for wide tables
- Sticky headers
- Optimized for small screens

## 🔄 Maintenance

### Keeping Both Versions in Sync

1. **When adding features to desktop**:
   - Always add corresponding mobile elements
   - Use consistent naming conventions
   - Test on both versions

2. **When modifying existing features**:
   - Update both HTML files
   - Ensure mobile CSS handles the changes
   - Test responsive behavior

3. **When adding new JavaScript functions**:
   - Make them available globally
   - Add mobile initialization calls
   - Test cross-version compatibility

### Testing Checklist

- [ ] Test on desktop (index.html)
- [ ] Test on mobile (mobile.html)
- [ ] Test responsive redirect
- [ ] Test theme switching on both versions
- [ ] Test all calculators on both versions
- [ ] Test on different screen sizes
- [ ] Test orientation changes on mobile

## 🚀 Performance

### Optimizations
- Shared JavaScript files reduce duplication
- CSS media queries for efficient styling
- Lazy loading of calculator-specific features
- Minimal DOM manipulation

### Best Practices
- Use CSS classes instead of inline styles
- Minimize JavaScript execution on mobile
- Optimize images for different screen densities
- Use efficient event delegation

## 🐛 Troubleshooting

### Common Issues

1. **Mobile inputs not syncing with desktop**:
   - Check if mobile initialization function exists
   - Verify input ID mappings
   - Check console for JavaScript errors

2. **Styles not applying on mobile**:
   - Verify mobile.css is loaded
   - Check CSS specificity
   - Ensure mobile classes are applied

3. **Responsive redirect not working**:
   - Check if responsive-redirect.js is loaded
   - Verify device detection logic
   - Check browser console for errors

### Debug Mode

Add this to the console to enable debug mode:
```javascript
localStorage.setItem('debug', 'true');
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

When contributing:
1. Test changes on both mobile and desktop versions
2. Ensure responsive behavior is maintained
3. Follow existing naming conventions
4. Update documentation for new features

---

**Note**: This system is designed so that most changes to the desktop version automatically work on mobile. The mobile-specific files only handle UI differences and touch interactions, while all calculator logic is shared. 