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
    
      "<br><b class='section-heading'>Our Mission</b><br><b>Smarter tools, built for real people.</b><br><br>I'm a professional programmer, but I'll admit—I'm not a web designer. Over the years, I tried countless online calculators, and every single time something was missing. EMI calculators without prepayment options. No flexibility to tweak interest rates. BMI tools that wouldn't even let me pick the right units. It was frustrating.<br><br>So I decided to build the tools I wished already existed. But I didn't do it alone—AI became my coding partner. Together, we turned ideas into reality, creating calculators that are practical, intuitive, and packed with the features people actually need.<br><br>ZeroCalculator.net isn't about making money (though I wouldn't complain if it happens someday). It's about creating tools that make life easier and giving back to the internet community that has given me so much.",
    
      "<br><b class='section-heading'>Our Vision</b><br><b>Making calculations simple, accurate, and accessible.</b><br><br>We believe everyone deserves tools that just work—no clutter, no confusion. Our forte is our advanced BMI calculator, which supports every combination of height and weight units—whether you prefer feet and inches, centimeters, pounds, or kilograms—making it truly versatile for users worldwide. Beyond that, we offer EMI tools with smart prepayment options and interactive charts, investment projections that make sense, and unit converters that are effortless to use.<br><br>Our goal is to keep expanding—adding more tools, refining existing ones, and making ZeroCalculator the go-to platform for anyone who needs fast, accurate, and frustration-free calculations.<br><br>Whether you're a casual user, a fitness enthusiast, or someone who simply wants precision without complexity, ZeroCalculator.net is here for you."
    ]
  },

  // Contact Us
  contact: {
    title: "Contact Us",
    content: [
      "<b>Get in touch with us!</b><br><br>We'd love to hear from you. Whether you have questions, suggestions, or just want to say hello, we're here to help.",
      
      "<br><b class='section-heading'>How to Reach Us</b><br><b>Email:</b> <a href='mailto:contact@zerocalculator.net'>contact@zerocalculator.net</a><br><b>Response Time:</b> We typically respond within 24-48 hours.<br><br>For bug reports or technical issues, please include as much detail as possible about the problem you encountered.",
      
      "<br><b class='section-heading'>Feedback & Suggestions</b><br>Your feedback helps us improve! If you have ideas for new calculators or features, or if you've found a bug, please don't hesitate to reach out. We're constantly working to make ZeroCalculator.net better for everyone.",
      
      "<br><b class='section-heading'>Business Inquiries</b><br>For business partnerships, advertising opportunities, or other commercial inquiries, please email us with 'Business Inquiry' in the subject line."
    ]
  },

  // Privacy Policy
  privacy: {
    title: "Privacy Policy",
    content: [
      "<b>Your Privacy Matters</b><br><br>This Privacy Policy explains how ZeroCalculator.net collects, uses, and protects your information when you use our website.",
      
      "<br><b class='section-heading'>Information We Collect</b><br><b>Personal Information:</b> We do not collect personal information unless you voluntarily provide it (such as through contact forms).<br><br><b>Usage Data:</b> We may collect anonymous usage statistics to improve our services, including which calculators are used most frequently and general traffic patterns.<br><br><b>Cookies:</b> We use cookies to remember your theme preferences and improve your experience on our site.",
      
      "<br><b class='section-heading'>How We Use Your Information</b><br>• To provide and improve our calculator services<br>• To remember your preferences (theme, settings)<br>• To analyze usage patterns and improve our website<br>• To respond to your inquiries and feedback",
      
      "<br><b class='section-heading'>Data Security</b><br>We implement appropriate security measures to protect your information. All calculations are performed locally in your browser - we don't store your calculation data on our servers.",
      
      "<br><b class='section-heading'>Third-Party Services</b><br>We may use third-party analytics services to understand how our website is used. These services may collect anonymous usage data.",
      
      "<br><b class='section-heading'>Your Rights</b><br>You have the right to:<br>• Access any personal information we may have<br>• Request correction of inaccurate information<br>• Request deletion of your information<br>• Opt out of data collection where possible",
      
      "<br><b class='section-heading'>Changes to This Policy</b><br>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      
      "<br><b class='section-heading'>Contact Us</b><br>If you have any questions about this Privacy Policy, please contact us at <a href='mailto:privacy@zerocalculator.net'>privacy@zerocalculator.net</a>"
    ]
  },

  // Terms of Service
  terms: {
    title: "Terms of Service",
    content: [
      "<b>Welcome to ZeroCalculator.net</b><br><br>These Terms of Service govern your use of our website and services. By using ZeroCalculator.net, you agree to these terms.",
      
      "<br><b class='section-heading'>Use of Our Services</b><br><b>Permitted Use:</b> You may use our calculators for personal, educational, and commercial purposes.<br><br><b>Prohibited Use:</b> You may not:<br>• Use our services for any illegal or unauthorized purpose<br>• Attempt to gain unauthorized access to our systems<br>• Interfere with or disrupt our services<br>• Use automated tools to access our services excessively",
      
      "<br><b class='section-heading'>Accuracy and Disclaimers</b><br><b>Calculation Accuracy:</b> While we strive for accuracy, our calculators are provided 'as is' without warranty. Always verify important calculations independently.<br><br><b>No Professional Advice:</b> Our calculators are for informational purposes only and do not constitute professional financial, medical, or legal advice.<br><br><b>Use at Your Own Risk:</b> You use our services at your own risk. We are not liable for any decisions made based on our calculations.",
      
      "<br><b class='section-heading'>Intellectual Property</b><br>All content, including calculators, designs, and text, is owned by ZeroCalculator.net and protected by copyright laws. You may not reproduce, distribute, or create derivative works without permission.",
      
      "<br><b class='section-heading'>Limitation of Liability</b><br>ZeroCalculator.net shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.",
      
      "<br><b class='section-heading'>Changes to Terms</b><br>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.",
      
      "<br><b class='section-heading'>Contact Information</b><br>If you have questions about these Terms of Service, please contact us at <a href='mailto:legal@zerocalculator.net'>legal@zerocalculator.net</a>"
    ]
  },

  // Sitemap
  sitemap: {
    title: "Sitemap",
    content: [
      "<b>Navigate ZeroCalculator.net</b><br><br>Find all our calculators and pages organized for easy access.",
      
      "<br><b class='section-heading'>Our Calculators</b><br><b>Unit Converter:</b> Convert between different units of length, weight, temperature, area, volume, and speed.<br><br><b>BMI Calculator:</b> Calculate your Body Mass Index with support for all unit combinations.<br><br><b>Date Calculator:</b> Calculate differences between dates, add/subtract time, and convert timezones.<br><br><b>Time Calculator:</b> Perform time arithmetic and conversions.<br><br><b>EMI Calculator:</b> Calculate loan EMIs with prepayment and top-up options.<br><br><b>Investment Calculator:</b> Calculate SIP and lump sum investment returns.",
      
      "<br><b class='section-heading'>Information Pages</b><br><b>About Us:</b> Learn about ZeroCalculator.net and our mission.<br><br><b>Contact Us:</b> Get in touch with questions or feedback.<br><br><b>Privacy Policy:</b> Understand how we protect your privacy.<br><br><b>Terms of Service:</b> Read our terms and conditions.",
      
      "<br><b class='section-heading'>Quick Links</b><br>• <a href='../'>Home Page</a><br>• <a href='../unit-converter/'>Unit Converter</a><br>• <a href='../bmi-calculator/'>BMI Calculator</a><br>• <a href='../date-calculator/'>Date Calculator</a><br>• <a href='../time-calculator/'>Time Calculator</a><br>• <a href='../emi-calculator/'>EMI Calculator</a><br>• <a href='../investment-calculator/'>Investment Calculator</a>"
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