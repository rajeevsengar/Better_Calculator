// Common text configuration for Pro Multi-Calculator
// This file centralizes all text content used in both desktop and mobile versions

window.TEXT_CONFIG = {
  // Header and branding
  header: {
    title: "zerocalculator",
    builtWithLove: "Built with ❤️ in India.",
    brandName: "zerocalculator.net",
    tagline: "Minimal - Fast - Powerful",
    taglineSecond: "Imagined by Human, Designed by AI"
  },

  // Menu items
  menu: {
    unitConverter: "1 • Unit Converter",
    bmiCalculator: "2 • BMI Calculator", 
    dateCalculator: "3 • Date Calculator",
    timeCalculator: "4 • Time Calculator",
    emiCalculator: "5 • EMI Calculator",
    investmentCalculator: "6 • Investment Calculator"
  },

  // Theme switcher
  theme: {
    label: "Theme:",
    default: "default",
    green: "green",
    purple: "purple",
    orange: "orange"
  },



  // Unit Converter
  unitConverter: {
    title: "Unit Types",
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
    computeDiff: "Compute Difference",
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
    now: "Now",
    enhancedMode: "Consider Time",
    localTime: "Local Time",
    fromAndIncluding: "From and including:",
    toButNotIncluding: "To, but not including:",
    result: "Result:",
    duration: "The duration is",
    or: "Or",
    alternativeTimeUnits: "Alternative time units",
    canBeConverted: "can be converted to one of these units:",
    seconds: "seconds",
    minutes: "minutes",
    hours: "hours",
    days: "days",
    weeksAndDays: "weeks and",
    percentOfYear: "% of a common year (365 days)",
    percentOfDay: "% of a 24 hour day",
    excludingEndDate: "excluding the end date",
    time: "time",
    and: "and",
    fromTime: "From Time",
    toTime: "To Time",
    addSubtractTime: "Add/Subtract Time",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds"
  },



  // About Us Story
  aboutUs: {
    title: "About ZeroCalculator.net",
    content: [
      "<b>ZeroCalculator.net:</b> Smart, frustration-free online calculators for everyone.<br>We create simple, powerful, and user-friendly tools to make calculations easy and accurate—whether you're managing your finances, tracking health metrics, or converting units.",
    
      "<br><b class='section-heading'>Our Mission</b><br><b>Smarter tools, built for real people.</b><br><br>I’m a professional programmer, but I’ll admit—I’m not a web designer. Over the years, I tried countless online calculators, and every single time something was missing. EMI calculators without prepayment options. No flexibility to tweak interest rates. BMI tools that wouldn’t even let me pick the right units. It was frustrating.<br><br>So I decided to build the tools I wished already existed. But I didn’t do it alone—AI became my coding partner. Together, we turned ideas into reality, creating calculators that are practical, intuitive, and packed with the features people actually need.<br><br>ZeroCalculator.net isn’t about making money (though I wouldn’t complain if it happens someday). It’s about creating tools that make life easier and giving back to the internet community that has given me so much.",
    
      "<br><b class='section-heading'>Our Vision</b><br><b>Making calculations simple, accurate, and accessible.</b><br><br>We believe everyone deserves tools that just work—no clutter, no confusion. Our forte is our advanced BMI calculator, which supports every combination of height and weight units—whether you prefer feet and inches, centimeters, pounds, or kilograms—making it truly versatile for users worldwide. Beyond that, we offer EMI tools with smart prepayment options and interactive charts, investment projections that make sense, and unit converters that are effortless to use.<br><br>Our goal is to keep expanding—adding more tools, refining existing ones, and making ZeroCalculator the go-to platform for anyone who needs fast, accurate, and frustration-free calculations.<br><br>Whether you’re a casual user, a fitness enthusiast, or someone who simply wants precision without complexity, ZeroCalculator.net is here for you."
    ]
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