/**
 * Script Loader Helper
 * Centralized script loading utility for consistent script management
 */

/**
 * Load scripts for a specific page type
 * @param {string} pageType - Type of page ('home', 'calculator', 'info')
 * @param {string} calculatorName - Name of calculator (for calculator pages)
 * @returns {Promise} Promise that resolves when all scripts are loaded
 */
function loadScriptsForPage(pageType, calculatorName = null) {
  if (!window.getScriptsForPage) {
    console.error('getScriptsForPage function not available. Make sure script.js is loaded first.');
    return Promise.reject('getScriptsForPage not available');
  }

  const scripts = window.getScriptsForPage(pageType, calculatorName);
  
  // Load scripts sequentially to ensure proper dependency order
  return scripts.reduce((promise, script) => {
    return promise.then(() => {
      // Skip if script is already loaded
      if (document.querySelector(`script[src="${script.src}"]`)) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = script.src;
        
        if (script.defer) {
          scriptElement.defer = true;
        }
        
        if (script.type) {
          scriptElement.type = script.type;
        }
        
        scriptElement.onload = resolve;
        scriptElement.onerror = reject;
        
        document.head.appendChild(scriptElement);
      });
    });
  }, Promise.resolve());
}

/**
 * Get script tags HTML for a specific page type (for static HTML generation)
 * @param {string} pageType - Type of page ('home', 'calculator', 'info')
 * @param {string} calculatorName - Name of calculator (for calculator pages)
 * @returns {string} HTML string with script tags
 */
function getScriptTagsHTML(pageType, calculatorName = null) {
  if (!window.getScriptsForPage) {
    console.error('getScriptsForPage function not available. Make sure script.js is loaded first.');
    return '';
  }

  const scripts = window.getScriptsForPage(pageType, calculatorName);
  return scripts.map(script => {
    const typeAttr = script.type ? ` type="${script.type}"` : '';
    const deferAttr = script.defer ? ' defer' : '';
    return `    <script src="${script.src}"${typeAttr}${deferAttr}></script>`;
  }).join('\n');
}

/**
 * Load CSS files for a specific page type
 * @param {string} pageType - Type of page ('home', 'calculator', 'info')
 * @param {string} calculatorName - Name of calculator (for calculator pages)
 * @returns {Promise} Promise that resolves when all CSS files are loaded
 */
function loadCSSForPage(pageType, calculatorName = null) {
  if (!window.generateCSSTags) {
    console.error('generateCSSTags function not available. Make sure script.js is loaded first.');
    return Promise.reject('generateCSSTags not available');
  }

  const cssHTML = window.generateCSSTags(pageType, calculatorName);
  const cssLinks = cssHTML.split('\n').filter(line => line.trim());
  const loadPromises = [];
  
  cssLinks.forEach(cssLink => {
    // Extract href from the link tag
    const hrefMatch = cssLink.match(/href="([^"]+)"/);
    if (hrefMatch) {
      const href = hrefMatch[1];
      
      // Skip if CSS is already loaded
      if (document.querySelector(`link[href="${href}"]`)) {
        return;
      }

      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = href;
      
      // Create a promise for this CSS load
      const loadPromise = new Promise((resolve, reject) => {
        linkElement.onload = resolve;
        linkElement.onerror = reject;
      });
      
      loadPromises.push(loadPromise);
      document.head.appendChild(linkElement);
    }
  });
  
  return Promise.all(loadPromises);
}

// Make functions globally available
window.loadScriptsForPage = loadScriptsForPage;
window.loadCSSForPage = loadCSSForPage;
window.getScriptTagsHTML = getScriptTagsHTML;
