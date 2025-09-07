# Info Page Component

A reusable web component for creating consistent info pages like About Us, Contact, Privacy Policy, Terms of Service, etc.

## Features

- **Consistent Styling**: Uses the same design system as the rest of the site
- **Theme Support**: Automatically adapts to light/dark themes
- **Responsive Design**: Works on all screen sizes
- **Dynamic Content**: Loads content from text configuration
- **Customizable Sidebar**: Configurable sidebar with links
- **SEO Friendly**: Proper semantic HTML structure

## Usage

### Basic Usage

```html
<info-page 
  page-title="About Us" 
  content-key="aboutUs.content">
</info-page>
```

### With Custom Sidebar

```html
<info-page 
  page-title="Contact Us" 
  content-key="contact.content"
  sidebar-title="Quick Links"
  sidebar-links='[{"text":"Unit Converter","href":"../general/unit-converter/"},{"text":"BMI Calculator","href":"../health/bmi-calculator/"}]'>
</info-page>
```

## Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `page-title` | String | Yes | The main title of the page |
| `content-key` | String | Yes | Key path to content in text-config.js (e.g., "aboutUs.content") |
| `sidebar-title` | String | No | Title for the sidebar (default: "Quick Links") |
| `sidebar-links` | JSON String | No | Array of link objects with `text` and `href` properties |

## Content Configuration

Add your page content to `helpers/text-config.js`:

```javascript
window.TEXT_CONFIG = {
  // ... existing config ...
  
  contact: {
    title: "Contact Us",
    content: [
      "Get in touch with us...",
      "We'd love to hear from you...",
      // More content paragraphs
    ]
  },
  
  privacy: {
    title: "Privacy Policy", 
    content: [
      "Your privacy is important to us...",
      // Privacy policy content
    ]
  }
};
```

## Styling

The component uses CSS custom properties that automatically adapt to your site's theme:

- `--card-background`: Background color for content cards
- `--shadow-color`: Shadow color for cards
- `--primary-color`: Primary accent color
- `--accent-color`: Link and interactive element color
- `--text-primary`: Primary text color
- `--white-90`: Title text color

## Examples

### About Us Page
```html
<info-page 
  page-title="About ZeroCalculator.net" 
  content-key="aboutUs.content"
  sidebar-title="Our Calculators"
  sidebar-links='[{"text":"Unit Converter","href":"../general/unit-converter/"},{"text":"BMI Calculator","href":"../health/bmi-calculator/"},{"text":"Date Calculator","href":"../date-calculator/date-calculator/"},{"text":"Time Calculator","href":"../date-calculator/time-calculator/"},{"text":"EMI Calculator","href":"../finance/emi-calculator/"},{"text":"Investment Calculator","href":"../finance/investment-calculator/"}]'>
</info-page>
```

### Contact Page
```html
<info-page 
  page-title="Contact Us" 
  content-key="contact.content"
  sidebar-title="Support"
  sidebar-links='[{"text":"FAQ","href":"../faq/"},{"text":"Report Bug","href":"mailto:support@zerocalculator.net"}]'>
</info-page>
```

## Browser Support

- Modern browsers with Web Components support
- Shadow DOM v1
- Custom Elements v1

## Dependencies

- `helpers/text-config.js` - For content management
- Site's CSS theme system
