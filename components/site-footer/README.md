# Site Footer Component

A modern, responsive footer component for the ZeroCalculator website that sticks to the bottom of the page.

## Features

- **Sticky Bottom Positioning**: Automatically sticks to the bottom of the page
- **Modern Design**: Beautiful gradient backgrounds and smooth animations
- **Responsive Layout**: Adapts to different screen sizes
- **Theme Support**: Integrates with the existing theme system
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Proper focus states and ARIA labels

## Usage

### Basic Implementation

```html
<!-- Add to your HTML -->
<site-footer></site-footer>
```

### Include the Component

```html
<!-- Add to your HTML head -->
<script src="components/site-footer/site-footer.js"></script>
```

## Structure

The footer consists of three main sections:

1. **Brand Section**: Logo, tagline, and description
2. **Links Section**: Calculator links, resources, and company info
3. **Bottom Section**: Copyright, social links, and tech stack info

## Styling

The footer uses CSS Grid for layout and includes:

- Gradient backgrounds that adapt to themes
- Smooth hover animations
- Responsive breakpoints
- Modern typography and spacing

## Theme Integration

The footer automatically adapts to the current theme:

- **Default Theme**: Blue gradient
- **Green Theme**: Green gradient  
- **Black Theme**: Dark gradient
- **Dark Variant**: Darker colors

## Responsive Behavior

- **Desktop**: 3-column grid layout
- **Tablet**: 2-column grid layout
- **Mobile**: Single column layout

## Accessibility Features

- Proper focus states
- ARIA labels for social links
- High contrast mode support
- Reduced motion support
- Semantic HTML structure

## Customization

The footer content can be customized through the `window.getText()` function:

```javascript
window.getText = function(key) {
  const texts = {
    'footer.tagline': 'Your Custom Tagline',
    'footer.description': 'Your custom description',
    'footer.madeWithLove': 'Custom made with love text'
  };
  return texts[key];
};
```

## Dependencies

- No external dependencies
- Uses modern CSS features (Grid, Flexbox, CSS Variables)
- Compatible with all modern browsers 