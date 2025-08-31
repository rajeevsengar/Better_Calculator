# Calculator Description Component

A web component that displays helpful tips, instructions, and examples for calculators.

## Usage

```html
<calculator-description calculator="conversion"></calculator-description>
```

## Attributes

- `calculator`: The name of the calculator to display descriptions for
  - `conversion` - Unit converter
  - `bmi` - BMI calculator
  - `date` - Date calculator
  - `emi` - EMI calculator
  - `investment` - Investment calculator

## Features

- Automatically displays tips, instructions, and examples based on the calculator type
- Responsive grid layout that adapts to different screen sizes
- Uses CSS custom properties for theming
- Shadow DOM for style isolation

## Dependencies

Requires `calculator-description.js` to be loaded before using the component. 