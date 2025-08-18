// Common text configuration for Pro Multi-Calculator
// This file centralizes all text content used in both desktop and mobile versions

window.TEXT_CONFIG = {
  // Header and branding
  header: {
    builtWithLove: "Built with ❤️ in India.",
    brandName: "Calculator.net",
    tagline: "Minimal - Fast - Powerful",
    taglineSecond: "Imagined by Human, Designed by AI"
  },

  // Menu items
  menu: {
    unitConverter: "1 • Unit Converter",
    bmiCalculator: "2 • BMI Calculator", 
    dateCalculator: "3 • Date & Timezone Calculator",
    emiCalculator: "4 • EMI Calculator",
    investmentCalculator: "5 • Investment Calculator"
  },

  // Theme switcher
  theme: {
    label: "Theme:",
    default: "default",
    green: "green",
    purple: "purple",
    orange: "orange"
  },

  // Ribbons
  ribbons: {
    tips: "Tips",
    instructions: "Instructions", 
    examples: "Examples"
  },

  // Unit Converter
  unitConverter: {
    title: "Unit Types:",
    from: "From",
    to: "To",
    fromPlaceholder: "Enter value",
    toPlaceholder: "Result",
    swapButton: "Swap",
    modesInstruction: "Click a unit type above to switch units.",
    modes: {
      length: "Length",
      weight: "Weight",
      temperature: "Temperature",
      area: "Area",
      volume: "Volume",
      speed: "Speed"
    }
  },

  // BMI Calculator
  bmi: {
    age: "Age",
    agePlaceholder: "e.g. 25",
    gender: "Gender",
    weight: "Weight",
    weightPlaceholder: "e.g. 70",
    height: "Height",
    heightPlaceholder: "Enter height",
    calculateButton: "Calculate BMI",
    resetButton: "Reset",
    bmiCategories: "BMI Categories",
    result: "Result",
    resultPlaceholder: "Enter values to get BMI and category.",
    healthyRange: "Healthy BMI Range:",
    healthyWeight: "Healthy Weight for Height:",
    didYouKnow: "💡 Did You Know?",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obesity: "Obesity"
  },

  // EMI Calculator
  emi: {
    loanAmount: "Loan Amount",
    loanAmountPlaceholder: "Enter loan amount",
    annualRate: "Annual Rate (%)",
    annualRatePlaceholder: "Enter annual rate",
    tenure: "Tenure (months)",
    tenurePlaceholder: "Enter tenure in months",
    recalcMode: "Recalculation Mode",
    changeEMI: "Change EMI amount",
    changeTenure: "Change tenure",
    calculateButton: "Calculate / Build Schedule",
    clearButton: "Clear",
    amortizationSchedule: "Amortization Schedule",
    instructions: "Instructions:",
    prepayment: "Prepayment: Enter amount to reduce loan principal (reduces EMI/tenure)",
    topup: "Top-up: Enter amount to increase loan principal (increases EMI/tenure)",
    newRate: "New Rate%: Enter new interest rate from that month onwards",
    clickOutside: "Click outside any edited cell or press Enter to recalculate",
    paymentBreakdown: "Payment Breakdown",
    month: "Month",
    emi: "EMI",
    principal: "Principal",
    interest: "Interest",
    prepayment: "Prepayment",
    topup: "Top-up",
    newRate: "New Rate%",
    outstanding: "Outstanding"
  },

  // Investment Calculator
  investment: {
    sip: {
      title: "SIP (Systematic Investment Plan) Calculator",
      monthlyAmount: "Monthly Investment Amount",
      monthlyAmountPlaceholder: "e.g., 5000",
      annualReturn: "Expected Annual Return (%)",
      annualReturnPlaceholder: "e.g., 12",
      years: "Investment Period (Years)",
      yearsPlaceholder: "e.g., 10",
      months: "Investment Period (Months)",
      monthsPlaceholder: "e.g., 6",
      calculateButton: "Calculate SIP Returns",
      clearButton: "Clear",
      totalInvestment: "Total Investment",
      totalReturns: "Total Returns",
      maturityAmount: "Maturity Amount",
      yearWiseBreakdown: "Year-wise Breakdown",
      year: "Year",
      investment: "Investment",
      returns: "Returns",
      totalValue: "Total Value"
    },
    lumpSum: {
      title: "Lump Sum Investment Calculator",
      initialAmount: "Initial Investment Amount",
      initialAmountPlaceholder: "e.g., 100000",
      annualReturn: "Expected Annual Return (%)",
      annualReturnPlaceholder: "e.g., 12",
      years: "Investment Period (Years)",
      yearsPlaceholder: "e.g., 10",
      months: "Investment Period (Months)",
      monthsPlaceholder: "e.g., 6",
      calculateButton: "Calculate Returns",
      clearButton: "Clear",
      initialInvestment: "Initial Investment",
      totalReturns: "Total Returns",
      finalAmount: "Final Amount"
    }
  },

  // Date Calculator
  date: {
    countDays: "Count Days",
    from: "From",
    to: "To",
    computeDiff: "Compute Diff",
    clear: "Clear",
    dateArithmetic: "Date Arithmetic",
    days: "Days",
    weeks: "Weeks", 
    months: "Months",
    years: "Years",
    add: "Add",
    subtract: "Subtract",
    apply: "Apply",
    timezoneConverter: "Timezone Converter",
    convert: "Convert",
    now: "Now"
  },

  // Footer
  footer: {
    tagline: "Not just another calculator website — it covers the missing features of others.",
    highlight: "🏆 The most feature-rich",
    emiLink: "EMI Calculator",
    highlightEnd: "on the internet, our proud flagship.",
    easterEgg: "🥚 This site contains a hidden easter egg. Good luck finding it! 🥚"
  },

  // Easter Eggs
  easterEggs: {
    falseEasterEgg: {
      title: "🥚 Easter Egg Found!",
      content: [
        "<p>You really think it was that easy? 😏</p>",
        "<p>This is just a decoy! The real easter egg is much more cleverly hidden...</p>",
        "<p>Keep exploring! The actual secret is somewhere else on this page.</p>"
      ]
    },
    siteFacts: {
      title: "The Secret Story about me.",
      content: 
        [
            "<p>Well, well, well... look who's curious enough to triple-click the logo! 🎉 You've just unlocked the secret story behind this website. Welcome to the exclusive club of explorers.</p>",
            "<p>Now, confession time: I’m not really a programmer. I’ve dabbled here and there, but mostly I’m just someone who gets frustrated when tools don’t work the way I want them to. Every time I tried using online calculators, they were always missing something important. EMI calculators without prepayment options, no way to adjust interest rates, no top-ups. BMI tools that wouldn’t even let me pick the right units. It drove me nuts.</p>",
            "<p>So I thought, *“Fine, I’ll build it myself.”* 💪 But here’s the twist—I didn’t do it alone. I teamed up with AI, describing the features I wanted, and together we turned ideas into reality. It’s like having a coding buddy who never gets tired of hearing me say, *“What if we add this?”* 🤖</p>",
            "<p>And that’s how this site was born. Not to make money (though hey, I wouldn’t complain), but because I believe everyone deserves simple, powerful, and user-friendly tools. It’s also my way of giving back to the internet that’s given me so much over the years.</p>",
            "<p>Now we’ve got BMI calculators that actually consider age and gender, EMI calculators with charts and smart prepayment options, investment projections that make sense, unit converters that don’t make you pull your hair out, and more. Basically, everything I wished existed when I was stuck with frustrating tools.</p>",
            "<p>By finding this little Easter egg, you’ve shown the same curiosity this project was built with. So go ahead, share it with friends—let them know there’s a hidden story waiting for them too. 🥚✨</p>",
            "<p>And hey… surprise! You actually read the whole story! 🎊 Since you were curious enough to find this Easter egg and stick around through my rambling, here’s a little <strong>reward</strong> just for you:</p>",
            "<a href='https://github.com/rajeevsengar/Better_Calculator' target='_blank' class='github-btn'>🎁 View on GitHub</a>"
          ]
    }
  }
};

// Helper function to get text by path (e.g., "unitConverter.from" returns "From")
window.getText = function(path) {
  const keys = path.split('.');
  let value = window.TEXT_CONFIG;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      console.warn(`Text path not found: ${path}`);
      return path; // Return the path as fallback
    }
  }
  
  return value;
};

// Helper function to get text array (for easter egg content)
window.getTextArray = function(path) {
  const text = window.getText(path);
  return Array.isArray(text) ? text : [text];
}; 