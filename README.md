# Calculator Website

A comprehensive calculator website with multiple specialized calculators, built with modern web technologies.

## Features

- **Unit Converter** - Convert between various units of measurement
- **BMI Calculator** - Calculate Body Mass Index with visual feedback
- **Date Calculator** - Count days between dates and perform date arithmetic
- **Time Calculator** - Timezone conversion, time difference, and time arithmetic
- **EMI Calculator** - Loan EMI calculation with detailed amortization schedule
- **Investment Calculator** - SIP and lump sum investment calculations

## Project Structure

The project is now modularized with each calculator having its own directory and HTML file:

```
Calculator/
├── index.html                    # Main hub with calculator previews and navigation
├── health/
│   └── bmi-calculator/
│       ├── index.html           # BMI Calculator standalone page
│       └── bmi-calculator.js    # BMI calculation logic
├── date/
│   ├── date-calculator/
│   │   ├── index.html           # Date Calculator standalone page
│   │   └── date-calculator.js   # Date calculation logic
│   └── time-calculator/
│       ├── index.html           # Time Calculator standalone page
│       └── time-calculator.js   # Time calculation logic
├── finance/
│   ├── emi-calculator/
│   │   ├── index.html           # EMI Calculator standalone page
│   │   └── emi-calculator.js    # EMI calculation logic
│   └── investment-calculator/
│       ├── index.html           # Investment Calculator standalone page
│       └── investment-calculator.js # Investment calculation logic
├── general/
│   └── unit-converter/
│       ├── index.html           # Unit Converter standalone page
│       └── unit-converter.js    # Unit conversion logic
├── footer-pages/
│   ├── about-us/
│   ├── contact-us/
│   ├── privacy/
│   ├── terms/
│   └── sitemap/
├── timezone_calculator/
│   └── timezone_calculator.js   # Timezone conversion logic
├── components/                   # Web components (date-input, time-input, etc.)
├── helpers/                      # Shared utilities and configurations
└── assets/                       # CSS, images, and other static assets
```

## Benefits of New Structure

1. **Modularity**: Each calculator is self-contained and can be developed independently
2. **Direct Navigation**: Users can open calculators in new tabs/windows for better experience
3. **URL Routing Ready**: Future implementation can support direct URLs like:
   - `xyz.com/bmi-calculator`
   - `xyz.com/emi-calculator`
   - `xyz.com/date-calculator`
   - etc.
4. **Better SEO**: Each calculator page can be indexed separately by search engines
5. **Improved Performance**: No iframe overhead, faster loading
6. **Maintainability**: Easier to maintain and update individual calculators
7. **Reusability**: Individual calculator pages can be embedded in other websites
8. **Testing**: Each calculator can be tested independently
9. **User Experience**: Users can bookmark specific calculators and open multiple at once

## Usage

### Main Application
Open `index.html` in the root directory to access all calculators through the main interface.

### Individual Calculators
Each calculator can be accessed directly through its respective directory:
- `general/unit-converter/` - Unit Converter
- `health/bmi-calculator/` - BMI Calculator
- `date/date-calculator/` - Date Calculator
- `date/time-calculator/` - Time Calculator
- `finance/emi-calculator/` - EMI Calculator
- `finance/investment-calculator/` - Investment Calculator

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Web Components**: Custom elements for date, time, and timezone inputs
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Theme System**: Multiple color themes with CSS custom properties
- **No Dependencies**: Pure vanilla implementation for maximum compatibility

## Future Enhancements

- Implement proper URL routing for direct calculator access
- Add more specialized calculators
- Enhance mobile experience
- Add offline functionality with Service Workers
- Implement data persistence for user preferences

## Contributing

Feel free to contribute by:
- Adding new calculators
- Improving existing functionality
- Enhancing the UI/UX
- Adding new features
- Fixing bugs

## License

This project is open source and available under the MIT License.