# Site Header Web Component

A standalone web component that consolidates both headers from the calculator application into a single, reusable component.

## Features

- **Dual Header Design**: Combines the top bar (flag + built with love) and main header (logo + brand + tagline)
- **Responsive Design**: Adapts to different screen sizes with mobile-first approach
- **Mobile Menu**: Includes a mobile-friendly navigation menu with calculator options
- **Tagline Animation**: Animated tagline that cycles between two messages
- **CSS Custom Properties**: Uses CSS variables for theming and customization
- **Separate CSS File**: Clean separation of concerns with external stylesheet

## Structure

The component consists of two main sections:

1. **Header 1**: Top bar with India flag and "Built with ❤️ in India" text
2. **Header 2**: Main header with site logo, brand name, and animated tagline
3. **Mobile Menu**: Slide-out menu accessible via hamburger button on mobile devices

## Files

- `site-header.js` - The web component JavaScript file
- `site-header.css` - External stylesheet for all header styles
- `README.md` - This documentation file

## Usage

### Basic Implementation

```html
<!-- Include the component script -->
<script src="components/site-header/site-header.js"></script>

<!-- Use the component -->
<site-header></site-header>
```

### With Calculator Main Container

```html
<div class="calculator-main-container">
  <site-header></site-header>
  <!-- Your calculator content here -->
</div>
```

## CSS Units

All measurements use viewport height (vh) and percentage (%) units for responsive design:
- Padding: `0.75vh`, `2.5vh`, etc.
- Heights: `2.5vh`, `6.25vh`, etc.
- Gaps: `1vh`, `1.5vh`, etc.

## Content Customization

The component automatically populates content from the global `window.getText` function if available, or falls back to default content:

- **Built with Love**: "Built with ❤️ in India."
- **Brand Name**: "zerocalculator.net"
- **Tagline**: "Minimal - Fast - Powerful" / "Imagined by Human, Designed by AI"

## Mobile Features

- **Sticky Header**: Header 2 becomes sticky on mobile devices
- **Mobile Menu**: Hamburger menu with navigation items
- **Responsive Typography**: Font sizes adjust based on screen size
- **Optimized Layout**: Mobile-first responsive design

### Mobile Menu

The mobile menu includes:
- **Hamburger Button**: Three-line toggle button visible on mobile
- **Menu Overlay**: Full-screen overlay with slide-in content
- **Dynamic Menu Items**: Automatically populated based on current page
- **Navigation Support**: Click handlers for menu items (can be customized)

## Browser Support

- Modern browsers with Web Components support
- Shadow DOM enabled
- Custom Elements API support

## Dependencies

- No external dependencies
- Uses CSS custom properties (CSS variables)
- Requires the `assets/images/` folder for flag and logo images

## Future Enhancements

This component is designed to be extended with additional features:
- Theme switcher (separate component)
- User authentication (separate component)
- Additional menu functionality 