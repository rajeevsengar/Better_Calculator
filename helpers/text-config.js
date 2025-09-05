// Common text configuration for Pro Multi-Calculator
// This file centralizes all text content used in both desktop and mobile versions

window.TEXT_CONFIG = {
  // Header and branding
  header: {
    title: BRAND_NAME,
    builtWithLove: "Built with ❤️ in India.",
    brandName: BRAND_NAME,
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
    title: "About " + BRAND_NAME,
    content: [
      "<b>" + BRAND_NAME + ":</b> Smart, frustration-free online calculators for everyone.<br>We create simple, powerful, and user-friendly tools to make calculations easy and accurate—whether you're managing your finances, tracking health metrics, or converting units.",
    
      "<br><b class='section-heading'>Our Mission</b><br><b>Smarter tools, built for real people.</b><br><br>I'm a professional programmer, but I'll admit—I'm not a web designer. Over the years, I tried countless online calculators, and every single time something was missing. EMI calculators without prepayment options. No flexibility to tweak interest rates. BMI tools that wouldn't even let me pick the right units. It was frustrating.<br><br>So I decided to build the tools I wished already existed. But I didn't do it alone—AI became my coding partner. Together, we turned ideas into reality, creating calculators that are practical, intuitive, and packed with the features people actually need.<br><br>" + BRAND_NAME + " isn't about making money (though I wouldn't complain if it happens someday). It's about creating tools that make life easier and giving back to the internet community that has given me so much.",
    
      "<br><b class='section-heading'>Our Vision</b><br><b>Making calculations simple, accurate, and accessible.</b><br><br>We believe everyone deserves tools that just work—no clutter, no confusion. Our forte is our advanced BMI calculator, which supports every combination of height and weight units—whether you prefer feet and inches, centimeters, pounds, or kilograms—making it truly versatile for users worldwide. Beyond that, we offer EMI tools with smart prepayment options and interactive charts, investment projections that make sense, and unit converters that are effortless to use.<br><br>Our goal is to keep expanding—adding more tools, refining existing ones, and making ZeroCalculator the go-to platform for anyone who needs fast, accurate, and frustration-free calculations.<br><br>Whether you're a casual user, a fitness enthusiast, or someone who simply wants precision without complexity, We are here for you."
    ]
  },

  // Contact Us
  contact: {
    title: "Contact Us",
    content: [
      "<b>Get in touch with us!</b><br><br>We'd love to hear from you. Whether you have questions, suggestions, or just want to say hello, we're here to help.",
      
      "<br><b class='section-heading'>How to Reach Us</b><br><b>Email:</b> <a href='mailto:" + CONTACT_EMAIL + "'>" + CONTACT_EMAIL + "</a><br><b>Response Time:</b> We typically respond within 24-48 hours.<br><br>For bug reports or technical issues, please include as much detail as possible about the problem you encountered.",
      
      "<br><b class='section-heading'>Feedback & Suggestions</b><br>Your feedback helps us improve! If you have ideas for new calculators or features, or if you've found a bug, please don't hesitate to reach out. We're constantly working to make " + BRAND_NAME + " better for everyone.",
      
      "<br><b class='section-heading'>Business Inquiries</b><br>For business partnerships, advertising opportunities, or other commercial inquiries, please email us with 'Business Inquiry' in the subject line."
    ]
  },

  // Privacy Policy
  privacy: {
    title: "Privacy Policy",
    content: [
      "<b>Your Privacy Matters</b><br><br>This Privacy Policy explains how " + BRAND_NAME + " collects, uses, and protects your information when you use our website.",
      
      "<br><b class='section-heading'>Information We Collect</b><br><b>Personal Information:</b> We do not collect personal information unless you voluntarily provide it (such as through contact forms).<br><br><b>Usage Data:</b> We may collect anonymous usage statistics to improve our services, including which calculators are used most frequently and general traffic patterns.<br><br><b>Cookies:</b> We use cookies to remember your theme preferences and improve your experience on our site.",
      
      "<br><b class='section-heading'>How We Use Your Information</b><br>• To provide and improve our calculator services<br>• To remember your preferences (theme, settings)<br>• To analyze usage patterns and improve our website<br>• To respond to your inquiries and feedback",
      
      "<br><b class='section-heading'>Data Security</b><br>We implement appropriate security measures to protect your information. All calculations are performed locally in your browser - we don't store your calculation data on our servers.",
      
      "<br><b class='section-heading'>Third-Party Services</b><br>We may use third-party analytics services to understand how our website is used. These services may collect anonymous usage data.",
      
      "<br><b class='section-heading'>Your Rights</b><br>You have the right to:<br>• Access any personal information we may have<br>• Request correction of inaccurate information<br>• Request deletion of your information<br>• Opt out of data collection where possible",
      
      "<br><b class='section-heading'>Changes to This Policy</b><br>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      
      "<br><b class='section-heading'>Contact Us</b><br>If you have any questions about this Privacy Policy, please contact us at <a href='mailto:" + PRIVACY_EMAIL + "'>" + PRIVACY_EMAIL + "</a>"
    ]
  },

  // Terms of Service
  terms: {
    title: "Terms of Service",
    content: [
      "<b>Welcome to " + BRAND_NAME + "</b><br><br>These Terms of Service govern your use of our website and services. By using " + BRAND_NAME + ", you agree to these terms.",
      
      "<br><b class='section-heading'>Use of Our Services</b><br><b>Permitted Use:</b> You may use our calculators for personal, educational, and commercial purposes.<br><br><b>Prohibited Use:</b> You may not:<br>• Use our services for any illegal or unauthorized purpose<br>• Attempt to gain unauthorized access to our systems<br>• Interfere with or disrupt our services<br>• Use automated tools to access our services excessively",
      
      "<br><b class='section-heading'>Accuracy and Disclaimers</b><br><b>Calculation Accuracy:</b> While we strive for accuracy, our calculators are provided 'as is' without warranty. Always verify important calculations independently.<br><br><b>No Professional Advice:</b> Our calculators are for informational purposes only and do not constitute professional financial, medical, or legal advice.<br><br><b>Use at Your Own Risk:</b> You use our services at your own risk. We are not liable for any decisions made based on our calculations.",
      
      "<br><b class='section-heading'>Intellectual Property</b><br>All content, including calculators, designs, and text, is owned by " + BRAND_NAME + " and protected by copyright laws. You may not reproduce, distribute, or create derivative works without permission.",
      
      "<br><b class='section-heading'>Limitation of Liability</b><br> " + BRAND_NAME + " shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.",
      
      "<br><b class='section-heading'>Changes to Terms</b><br>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.",
      
      "<br><b class='section-heading'>Contact Information</b><br>If you have questions about these Terms of Service, please contact us at <a href='mailto:" + LEGAL_EMAIL + "'>" + LEGAL_EMAIL + "</a>"
    ]
  },

  // Sitemap
  sitemap: {
    title: "Sitemap",
    content: [
      "<b>Navigate " + BRAND_NAME + "</b><br><br>Find all our calculators and pages organized for easy access.",
      
      "<br><b class='section-heading'>Our Calculators</b><br><b>Unit Converter:</b> Convert between different units of length, weight, temperature, area, volume, and speed.<br><br><b>BMI Calculator:</b> Calculate your Body Mass Index with support for all unit combinations.<br><br><b>Date Calculator:</b> Calculate differences between dates, add/subtract time, and convert timezones.<br><br><b>Time Calculator:</b> Perform time arithmetic and conversions.<br><br><b>EMI Calculator:</b> Calculate loan EMIs with prepayment and top-up options.<br><br><b>Investment Calculator:</b> Calculate SIP and lump sum investment returns.",
      
      "<br><b class='section-heading'>Information Pages</b><br><b>About Us:</b> Learn about " + BRAND_NAME + " and our mission.<br><br><b>Contact Us:</b> Get in touch with questions or feedback.<br><br><b>Privacy Policy:</b> Understand how we protect your privacy.<br><br><b>Terms of Service:</b> Read our terms and conditions.",
      
      "<br><b class='section-heading'>Quick Links</b><br>• <a href='" + getURLS().home + "'>Home Page</a><br>• <a href='" + getURLS().unitConverter + "'>Unit Converter</a><br>• <a href='" + getURLS().bmiCalculator + "'>BMI Calculator</a><br>• <a href='" + getURLS().dateCalculator + "'>Date Calculator</a><br>• <a href='" + getURLS().timeCalculator + "'>Time Calculator</a><br>• <a href='" + getURLS().emiCalculator + "'>EMI Calculator</a><br>• <a href='" + getURLS().investmentCalculator + "'>Investment Calculator</a>"
    ]
  }
};

// Calculator description content configuration
window.CALCULATOR_DESCRIPTIONS = {
  home: {
    tips: '<ul style="margin:0;padding-left:18px"><li>Welcome to the most feature-rich calculator website on the internet!</li><li>Pro tip: Use the navigation to explore different calculators</li><li>Each calculator is designed to be intuitive and powerful</li></ul>',
    instructions:
      '<ul style="margin:0;padding-left:18px"><li>Step 1: Choose your calculator from the navigation menu</li><li>Step 2: Enter your values and parameters</li><li>Step 3: Get instant, accurate results</li><li>Step 4: Use advanced features for detailed analysis</li></ul>',
    examples:
      '<ul style="margin:0;padding-left:18px"><li>Unit Converter: Convert between 100+ unit types with precision</li><li>BMI Calculator: Get detailed health insights with visual charts</li><li>EMI Calculator: Plan loans with interactive amortization tables</li><li>Investment Calculator: Plan your financial future with SIP and lump sum options</li></ul>',
  },
  conversion: {
    tips: '<ul style="margin:0;padding-left:18px"><li>Pro tip: Use Swap to flip units like a pancake!</li><li>Did you know? 1 meter = 3.28 feet (or roughly 3 feet + 3 inches)</li><li>Quick conversions for when you need answers faster than your brain can think!</li></ul>',
    instructions:
      '<ul style="margin:0;padding-left:18px"><li>Step 1: Pick your poison (temperature, length, etc.)</li><li>Step 2: Type in your number (no rocket science here!)</li><li>Step 3: Choose your units and watch the magic happen!</li><li>Precision up to 4 decimals (because we\'re fancy like that)</li></ul>',
    examples:
      '<ul style="margin:0;padding-left:18px"><li>Temperature: 100°C → 212°F (water boils, just like your brain trying to do math!)</li><li>Length: 1 meter → 3.28 feet (or "about 3 feet" if you\'re feeling lazy)</li><li>Volume: 2 liters → 0.53 gallons (because metric vs imperial is a daily struggle)</li></ul>',
  },
  bmi: {
    tips: '<ul style="margin:0;padding-left:18px"><li>Remember: Muscle weighs more than fat (so don\'t freak out if you\'re "overweight" but ripped!)</li><li>Pro tip: Height in cm is more accurate than feet/inches (sorry, Americans!)</li><li>Age and gender matter! A 15-year-old athlete and a 50-year-old couch potato have different healthy ranges</li></ul>',
    instructions:
      '<ul style="margin:0;padding-left:18px"><li>Step 1: Tell us your age (no lying, we\'re not your Tinder profile!)</li><li>Step 2: Pick your gender (this affects the healthy ranges)</li><li>Step 3: Enter your weight (be honest, the scale won\'t judge you)</li><li>Step 4: Measure your height (stand up straight, no slouching!)</li><li>Step 5: Hit Calculate and discover your BMI destiny!</li></ul>',
    examples:
      '<ul style="margin:0;padding-left:18px"><li>Athlete: 70 kg, 175 cm (probably all muscle, you fitness freak!)</li><li>Office worker: 80 kg, 170 cm (time to take the stairs instead of the elevator!)</li><li>Teen: 55 kg, 160 cm (growing like a weed, that\'s normal!)</li></ul>',
  },
  date: {
    tips: '<ul style="margin:0;padding-left:18px"><li>Fun fact: Time zones were invented to confuse travelers and make meetings impossible!</li><li>Pro tip: Use Add/Subtract for complex calculations (like "when will I finally finish this project?")</li><li>Remember: The Earth is round, but time zones make it feel flat!</li></ul>',
    instructions:
      '<ul style="margin:0;padding-left:18px"><li>Step 1: Pick your start date (when the adventure begins!)</li><li>Step 2: Pick your end date (when the adventure ends, or when you give up!)</li><li>Step 3: Hit Compute Diff and discover how much time you\'ve wasted!</li><li>Step 4: Convert time zones (because jet lag is real and confusing!)</li><li>Step 5: Use Now for current time (when you need to know what time it is right now!)</li></ul>',
    examples:
      '<ul style="margin:0;padding-left:18px"><li>From 2023-01-01 to 2024-03-10 (that\'s 434 days of your life, gone forever!)</li><li>IST → UTC (because India runs on its own time, literally!)</li><li>Add 2 weeks to today (for when you promise to start that diet... again!)</li></ul>',
  },
  time: {
    tips: '<ul style="margin:0;padding-left:18px"><li>Pro tip: Time zones can make or break your international meetings!</li><li>Did you know? Some countries have half-hour time zones (talk about being indecisive!)</li><li>Time arithmetic is like regular math, but with more zeros!</li></ul>',
    instructions:
      '<ul style="margin:0;padding-left:18px"><li>Step 1: Choose your time zone conversion or time calculation</li><li>Step 2: Enter your base time and target time zone</li><li>Step 3: For time differences, enter start and end times</li><li>Step 4: For time arithmetic, enter base time and delta values</li><li>Step 5: Get instant results with precision</li></ul>',
    examples:
      '<ul style="margin:0;padding-left:18px"><li>IST to UTC: 2:30 PM IST → 9:00 AM UTC (because time zones are confusing!)</li><li>Time difference: 9:00 AM to 5:00 PM = 8 hours (a full work day!)</li><li>Add 2 hours 30 minutes to 10:00 AM = 12:30 PM (simple math, complex time!)</li></ul>',
  },
  emi: {
    tips: '<ul style="margin:0;padding-left:18px"><li>Pro tip: Prepayments can save you thousands! (and make your bank manager cry!)</li><li>The pie chart shows your money going to the bank vs. your pocket (spoiler: bank wins!)</li><li>Lower tenure = higher EMI but less total interest (choose your pain wisely!)</li></ul>',
    instructions:
      '<ul style="margin:0;padding-left:18px"><li>Step 1: Enter your loan amount (how much money you\'re borrowing to buy things you probably don\'t need!)</li><li>Step 2: Set your interest rate (the bank\'s way of saying "we love you, but we love your money more!")</li><li>Step 3: Choose your tenure (how long you want to be in debt!)</li><li>Step 4: Edit the table for prepayments, top-ups, or rate changes (because life happens!)</li><li>Step 5: Watch your financial future unfold in beautiful charts!</li></ul>',
    examples:
      '<ul style="margin:0;padding-left:18px"><li>Home loan: 50L @ 8.5% for 20 years (your dream home, now with 20 years of payments!)</li><li>Car loan: 10L @ 12% for 5 years (because walking is so 2020!)</li><li>Personal loan: 5L @ 15% for 3 years (for emergencies, like that vacation you "needed"!)</li></ul>',
  },
  investment: {
    tips: '<ul style="margin:0;padding-left:18px"><li>Compound interest is like a snowball rolling down a hill - it starts small but gets huge!</li><li>Longer SIP durations = more money (patience is literally a virtue that pays!)</li><li>Start early, invest regularly, and let time do the heavy lifting!</li><li>Pro tip: SIP is like Netflix subscription for your future self!</li></ul>',
    instructions:
      '<ul style="margin:0;padding-left:18px"><li>Step 1: Enter your investment amount (how much money you\'re willing to part with!)</li><li>Step 2: Set your expected return rate (be realistic, not optimistic!)</li><li>Step 3: Choose your investment period (time is money, literally!)</li><li>Step 4: Pick SIP (monthly) or lump sum (all at once, like a financial mic drop!)</li><li>Step 5: Watch your money grow faster than your excuses!</li></ul>',
    examples:
      '<ul style="margin:0;padding-left:18px"><li>SIP: 5000/month • 12% return • 10 years = Future you will thank present you!</li><li>Lump sum: 1L • 12% return • 10 years = Because sometimes you just need to go big or go home!</li><li>Emergency fund: 50K • 6% return • 5 years = For when life throws you a curveball!</li></ul>',
  },
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