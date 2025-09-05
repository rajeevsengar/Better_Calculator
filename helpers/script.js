window.addEventListener('load', () => {
  ensureThemeApplied();
});

// Fallback theme initialization
function ensureThemeApplied() {
  // Check if theme is already applied
  if (!document.documentElement.hasAttribute('data-theme')) {
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    console.log('Fallback theme applied:', savedTheme);
  }
  
  // Ensure body is visible
  if (!document.body.hasAttribute('data-theme-applied')) {
    document.body.setAttribute('data-theme-applied', 'true');
  }
}

// =============================================================================
// PATH UTILITIES
// =============================================================================
function getURLS() {
  const isSubPage = window.isSubPage();
  const baseUrl = isSubPage ? '../' : '';
  
  return {
    // Main pages
    home: `${baseUrl}index.html`,
    aboutUs: `${baseUrl}about-us/`,
    sitemap: `${baseUrl}sitemap/`,
    privacy: `${baseUrl}privacy/`,
    terms: `${baseUrl}terms/`,
    contactUs: `${baseUrl}contact-us/`,
    
    // Calculators
    unitConverter: `${baseUrl}unit-converter/`,
    bmiCalculator: `${baseUrl}bmi-calculator/`,
    dateCalculator: `${baseUrl}date-calculator/`,
    timeCalculator: `${baseUrl}time-calculator/`,
    emiCalculator: `${baseUrl}emi-calculator/`,
    investmentCalculator: `${baseUrl}investment-calculator/`,
    
    // External URLs
    githubUrl: GITHUB_REPO_URL,
    contactEmail: `mailto:${CONTACT_EMAIL}`,
    privacyEmail: `mailto:${PRIVACY_EMAIL}`,
    legalEmail: `mailto:${LEGAL_EMAIL}`,
    supportEmail: `mailto:${SUPPORT_EMAIL}`,
    faqUrl: `${baseUrl}faq/`,
    
    // Asset paths
    cssPath: isSubPage ? '../components/site-footer/site-footer.css' : 'components/site-footer/site-footer.css',
    imagePrefix: isSubPage ? '../assets/images/' : 'assets/images/'
  };
}

function getBrandInfo() {
  return {
    name: BRAND_NAME,
    domain: BRAND_DOMAIN,
    tagline: BRAND_TAGLINE,
    fullTitle: `${BRAND_NAME} - ${BRAND_TAGLINE}`
  };
}

function initializeCalculatorLinks() {
  const currentPath = window.location.pathname;
  const urls = getURLS();
  
  return [
    { text: 'Unit Converter', url: urls.unitConverter, active: currentPath.includes('unit-converter') },
    { text: 'BMI Calculator', url: urls.bmiCalculator, active: currentPath.includes('bmi-calculator') },
    { text: 'Date Calculator', url: urls.dateCalculator, active: currentPath.includes('date-calculator') },
    { text: 'Time Calculator', url: urls.timeCalculator, active: currentPath.includes('time-calculator') },
    { text: 'EMI Calculator', url: urls.emiCalculator, active: currentPath.includes('emi-calculator') },
    { text: 'Investment Calculator', url: urls.investmentCalculator, active: currentPath.includes('investment-calculator') }
  ];
}
/**
 * Centralized function to check if current page is a sub-page
 * This prevents code duplication across components
 * @returns {boolean} True if current page is a sub-page
 */
function isSubPage() {
  const currentPath = window.location.pathname;
  return currentPath.includes('/unit-converter') || 
         currentPath.includes('/bmi-calculator') || 
         currentPath.includes('/date-calculator') || 
         currentPath.includes('/time-calculator') || 
         currentPath.includes('/emi-calculator') || 
         currentPath.includes('/investment-calculator') ||
         currentPath.includes('/about-us') ||
         currentPath.includes('/contact-us') ||
         currentPath.includes('/privacy') ||
         currentPath.includes('/terms') ||
         currentPath.includes('/sitemap');
}

/**
 * Check if current page is the home page
 * @returns {boolean} True if current page is the home page
 */
function isHomePage() {
  const currentPath = window.location.pathname;
  return currentPath === '/' || currentPath === '/index.html';
}

// Make functions globally available immediately
window.isSubPage = isSubPage;
window.isHomePage = isHomePage;
window.getURLS = getURLS;
window.getBrandInfo = getBrandInfo;
window.initializeCalculatorLinks = initializeCalculatorLinks;