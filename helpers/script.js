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

/**
 * Get the correct base URL based on current page depth
 * @returns {string} Base URL with appropriate number of ../
 */
function getBaseUrl() {
  const currentPath = window.location.pathname;
  
  // Count the number of directory levels from root
  const pathSegments = currentPath.split('/').filter(segment => segment && segment !== 'index.html');
  const depth = pathSegments.length;
  
  // Return appropriate number of ../
  if (depth === 0) return '';           // Root level
  if (depth === 1) return '../';        // 1 level deep
  if (depth === 2) return '../../';     // 2 levels deep
  if (depth === 3) return '../../../';  // 3 levels deep
  
  // Fallback for deeper nesting
  return '../'.repeat(depth);
}

function getURLS() {
  const baseUrl = getBaseUrl();
  
  return {
    // Main pages
    home: `${baseUrl}index.html`,
    aboutUs: `${baseUrl}footer-pages/about-us/`,
    sitemap: `${baseUrl}footer-pages/sitemap/`,
    privacy: `${baseUrl}footer-pages/privacy/`,
    terms: `${baseUrl}footer-pages/terms/`,
    contactUs: `${baseUrl}footer-pages/contact-us/`,
    
    // Calculators
    unitConverter: `${baseUrl}general/unit-converter/`,
    bmiCalculator: `${baseUrl}health/bmi-calculator/`,
    dateCalculator: `${baseUrl}date/date-calculator/`,
    timeCalculator: `${baseUrl}date/time-calculator/`,
    emiCalculator: `${baseUrl}finance/emi-calculator/`,
    investmentCalculator: `${baseUrl}finance/investment-calculator/`,
    
    // External URLs
    githubUrl: GITHUB_REPO_URL,
    contactEmail: `mailto:${CONTACT_EMAIL}`,
    privacyEmail: `mailto:${PRIVACY_EMAIL}`,
    legalEmail: `mailto:${LEGAL_EMAIL}`,
    supportEmail: `mailto:${SUPPORT_EMAIL}`,
    faqUrl: `${baseUrl}faq/`,
    
    // Asset paths
    cssPath: `${baseUrl}components/site-footer/site-footer.css`,
    imagePrefix: `${baseUrl}assets/images/`
  };
}

/**
 * Centralized script path configuration
 * Returns all script paths with proper base URL handling
 * @returns {Object} Object containing all script paths
 */
function getScriptPaths() {
  const baseUrl = getBaseUrl();
  
  return {
    // Helper scripts
    helpers: {
      script: `${baseUrl}helpers/script.js`,
      constants: `${baseUrl}helpers/constants.js`,
      textConfig: `${baseUrl}helpers/text-config.js`,
      util: `${baseUrl}helpers/util.js`,
      timezoneResolver: `${baseUrl}helpers/timezone-resolver.js`,
      bmiFactsConfig: `${baseUrl}health/bmi-calculator/bmi-facts-config.js`
    },
    
    // Component scripts
    components: {
      siteHeader: `${baseUrl}components/site-header/site-header.js`,
      menuHeader: `${baseUrl}components/menu-header/menu-header.js`,
      siteFooter: `${baseUrl}components/site-footer/site-footer.js`,
      calculatorDescription: `${baseUrl}components/calculator-description/calculator-description.js`,
      dateInput: `${baseUrl}components/date-input/date-input.js`,
      timeInput: `${baseUrl}components/time-input/time-input.js`,
      timezoneInput: `${baseUrl}components/timezone-input/timezone-input.js`,
      searchableSelect: `${baseUrl}components/searchable-select/searchable-select.js`,
      infoPage: `${baseUrl}components/info-page/info-page.js`,
      infoSidebar: `${baseUrl}components/info-sidebar/info-sidebar.js`
    },
    
    // Calculator scripts
    calculators: {
      bmiCalculator: `${baseUrl}health/bmi-calculator/bmi-calculator.js`,
      dateCalculator: `${baseUrl}date/date-calculator/date-calculator.js`,
      timeCalculator: `${baseUrl}date/time-calculator/time-calculator.js`,
      emiCalculator: `${baseUrl}finance/emi-calculator/emi-calculator.js`,
      investmentCalculator: `${baseUrl}finance/investment-calculator/investment-calculator.js`,
      unitConverter: `${baseUrl}general/unit-converter/unit-converter.js`
    }
  };
}

/**
 * Centralized CSS path configuration
 * Returns all CSS paths with proper base URL handling
 * @returns {Object} Object containing all CSS paths
 */
function getCSSPaths() {
  const baseUrl = getBaseUrl();
  
  return {
    // Main CSS files
    main: {
      style: `${baseUrl}assets/css/style.css`,
      misc: `${baseUrl}assets/css/misc.css`,
      themes: `${baseUrl}assets/css/themes.css`,
      homePage: `${baseUrl}assets/css/home-page.css`
    },
    
    // Component CSS files
    components: {
      siteHeader: `${baseUrl}components/site-header/site-header.css`,
      menuHeader: `${baseUrl}components/menu-header/menu-header.css`,
      siteFooter: `${baseUrl}components/site-footer/site-footer.css`,
      dateInput: `${baseUrl}components/date-input/date-input.css`,
      timeInput: `${baseUrl}components/time-input/time-input.css`,
      searchableSelect: `${baseUrl}components/searchable-select/searchable-select.css`,
      infoPage: `${baseUrl}components/info-page/info-page.css`,
      infoSidebar: `${baseUrl}components/info-sidebar/info-sidebar.css`
    },
    
    // Calculator CSS files
    calculators: {
      bmiCalculator: `${baseUrl}health/bmi-calculator/bmi-calculator.css`,
      dateCalculator: `${baseUrl}date/date-calculator/date-calculator.css`,
      timeCalculator: `${baseUrl}date/time-calculator/time-calculator.css`,
      emiCalculator: `${baseUrl}finance/emi-calculator/emi-calculator.css`,
      investmentCalculator: `${baseUrl}finance/investment-calculator/investment-calculator.css`,
      unitConverter: `${baseUrl}general/unit-converter/unit-converter.css`
    },
    
    // Page-specific CSS files
    pages: {
      sitemap: `${baseUrl}footer-pages/sitemap/sitemap.css`
    }
  };
}

/**
 * Get script paths for a specific page type
 * @param {string} pageType - Type of page ('home', 'calculator', 'info')
 * @param {string} calculatorName - Name of calculator (for calculator pages)
 * @returns {Array} Array of script objects with src and defer properties
 */
function getScriptsForPage(pageType, calculatorName = null) {
  const scripts = getScriptPaths();
  const scriptList = [];
  
  // Common scripts for all pages - constants must load before script.js
  scriptList.push({ src: scripts.helpers.constants, defer: false });
  scriptList.push({ src: scripts.helpers.script, defer: false });
  scriptList.push({ src: scripts.components.siteHeader, defer: true });
  scriptList.push({ src: scripts.components.menuHeader, defer: true });
  scriptList.push({ src: scripts.components.siteFooter, defer: true });
  
  if (pageType === 'home') {
    scriptList.push({ src: scripts.components.calculatorDescription, defer: false });
  } else if (pageType === 'calculator') {
    scriptList.push({ src: scripts.helpers.textConfig, defer: true });
    scriptList.push({ src: scripts.helpers.util, defer: true });
    scriptList.push({ src: scripts.components.calculatorDescription, defer: true });
    
    // Add calculator-specific scripts
    if (calculatorName && scripts.calculators[calculatorName]) {
      scriptList.push({ src: scripts.calculators[calculatorName], defer: true });
    }
    
    // Add component scripts based on calculator type
    if (calculatorName === 'bmiCalculator') {
      scriptList.push({ src: scripts.helpers.bmiFactsConfig, defer: true });
    } else if (calculatorName === 'dateCalculator' || calculatorName === 'timeCalculator') {
      scriptList.push({ src: scripts.helpers.timezoneResolver, defer: true });
      scriptList.push({ src: scripts.components.dateInput, defer: true });
      scriptList.push({ src: scripts.components.timeInput, defer: true });
      scriptList.push({ src: scripts.components.searchableSelect, defer: true });
      scriptList.push({ src: scripts.components.timezoneInput, defer: true, type: 'module' });
    }
  } else if (pageType === 'info') {
    scriptList.push({ src: scripts.helpers.textConfig, defer: true });
    scriptList.push({ src: scripts.helpers.util, defer: true });
    scriptList.push({ src: scripts.components.infoPage, defer: true });
    scriptList.push({ src: scripts.components.infoSidebar, defer: true });
  }
  
  return scriptList;
}

/**
 * Generate script tags HTML for a specific page type
 * @param {string} pageType - Type of page ('home', 'calculator', 'info')
 * @param {string} calculatorName - Name of calculator (for calculator pages)
 * @returns {string} HTML string with script tags
 */
function generateScriptTags(pageType, calculatorName = null) {
  const scripts = getScriptsForPage(pageType, calculatorName);
  return scripts.map(script => {
    const typeAttr = script.type ? ` type="${script.type}"` : '';
    const deferAttr = script.defer ? ' defer' : '';
    return `    <script src="${script.src}"${typeAttr}${deferAttr}></script>`;
  }).join('\n');
}

/**
 * Generate CSS link tags for a specific page type
 * @param {string} pageType - Type of page ('home', 'calculator', 'info')
 * @param {string} calculatorName - Name of calculator (for calculator pages)
 * @returns {string} HTML string with CSS link tags
 */
function generateCSSTags(pageType, calculatorName = null) {
  const cssPaths = getCSSPaths();
  const cssList = [];
  
  // Common CSS for all pages
  cssList.push(cssPaths.main.style);
  cssList.push(cssPaths.main.misc);
  cssList.push(cssPaths.main.themes);
  
  if (pageType === 'home') {
    cssList.push(cssPaths.main.homePage);
  } else if (pageType === 'calculator') {
    // Add calculator-specific CSS
    if (calculatorName && cssPaths.calculators[calculatorName]) {
      cssList.push(cssPaths.calculators[calculatorName]);
    }
  } else if (pageType === 'info') {
    cssList.push(cssPaths.components.infoPage);
    cssList.push(cssPaths.components.infoSidebar);
    
    // Add page-specific CSS
    if (calculatorName === 'sitemap') {
      cssList.push(cssPaths.pages.sitemap);
    }
  }
  
  return cssList.map(cssPath => `    <link rel="stylesheet" href="${cssPath}" />`).join('\n');
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
  const availableCalculators = getAvailableCalculators();
  
  return availableCalculators.map(calc => ({
    text: calc.text,
    url: urls[calc.urlKey] || '#',
    active: currentPath.includes(calc.urlKey.replace('Calculator', '-calculator').replace('Converter', '-converter'))
  }));
}

function initializeCalculatorCategories() {
  const currentPath = window.location.pathname;
  const urls = getURLS();
  const categories = getCalculatorsByCategory();
  
  return Object.values(categories).map(category => ({
    name: category.name,
    calculators: category.calculators.map(calc => ({
      text: calc.text,
      url: urls[calc.urlKey] || '#',
      active: currentPath.includes(calc.urlKey.replace('Calculator', '-calculator').replace('Converter', '-converter')),
      available: calc.available !== false
    }))
  }));
}
/**
 * Centralized function to check if current page is a sub-page
 * This prevents code duplication across components
 * @returns {boolean} True if current page is a sub-page
 */
function isSubPage() {
  const currentPath = window.location.pathname;
  return currentPath.includes('/general/unit-converter') || 
         currentPath.includes('/health/bmi-calculator') || 
         currentPath.includes('/date/date-calculator') || 
         currentPath.includes('/date/time-calculator') || 
         currentPath.includes('/finance/emi-calculator') || 
         currentPath.includes('/finance/investment-calculator') ||
         currentPath.includes('/footer-pages/about-us') ||
         currentPath.includes('/footer-pages/contact-us') ||
         currentPath.includes('/footer-pages/privacy') ||
         currentPath.includes('/footer-pages/terms') ||
         currentPath.includes('/footer-pages/sitemap');
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
window.getBaseUrl = getBaseUrl;
window.isSubPage = isSubPage;
window.isHomePage = isHomePage;
window.getURLS = getURLS;
window.getScriptPaths = getScriptPaths;
window.getCSSPaths = getCSSPaths;
window.getScriptsForPage = getScriptsForPage;
window.generateScriptTags = generateScriptTags;
window.generateCSSTags = generateCSSTags;
window.getBrandInfo = getBrandInfo;
window.initializeCalculatorLinks = initializeCalculatorLinks;
window.initializeCalculatorCategories = initializeCalculatorCategories;