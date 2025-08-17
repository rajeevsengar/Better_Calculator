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
    modesInstruction: "Click a mode above to switch units.",
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
        "You really think it was that easy? 😏",
        "This is just a decoy! The real easter egg is much more cleverly hidden...",
        "Keep exploring! The actual secret is somewhere else on this page."
      ]
    },
    siteFacts: {
      title: "The Secret Story about me.",
      content: [
        "Well, well, well... look who's curious enough to triple-click the logo! 🎉 You've just unlocked the secret story behind this website. Consider yourself part of an exclusive club now.",
        "Okay, I might be exaggerating a bit when I say \"very limited coding knowledge\" - but swear to God, I'm not a programmer! I'm just someone who gets frustrated easily when things don't work the way I want them to.",
        "Picture this: you're trying to calculate your EMI, but every calculator online is missing something crucial. No prepayment options, no way to increase or decrease interest rates, no top-up options. Or you want to check your BMI with height or weight in specific units—but nope, not available anywhere! That was me, every single time. So I thought, \"Fine, I'll build it myself!\" 💪",
        "Here's where it gets interesting - I teamed up with AI to turn my wild ideas into reality. I'd describe what I wanted, and the AI would help me build it. It's like having a super-smart coding buddy who never gets tired of my \"what if we add this feature?\" questions! 🤖",
        "Look, I'm not building this to get rich (though that would be nice, right?). I'm doing it because I genuinely believe everyone deserves access to powerful, user-friendly calculation tools. Plus, it's my way of saying \"thank you\" to the internet for all the free stuff I've used over the years.",
        "We've got BMI calculators that actually consider your age and gender with proper units, EMI calculators with beautiful charts and all the missing features like prepayment options and interest rate changes, investment projections that make sense, unit converters that don't make you want to pull your hair out, and so much more. Basically, everything I wished existed when I was frustrated with other calculators!",
        "By finding this easter egg, you've proven you're the kind of person who explores and discovers things. That's exactly the spirit this website was built with! Feel free to share this discovery with friends - let them know there's a hidden story waiting for them too. 🥚✨",
        "Surprise! You actually read the whole story! 🎊"
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