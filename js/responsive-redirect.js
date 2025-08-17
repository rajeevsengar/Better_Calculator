// Responsive redirect script for Pro Multi-Calculator
// Automatically redirects users to appropriate version based on device

(function() {
    'use strict';
    
    // Check if we're already on the right page
    const currentPage = window.location.pathname.split('/').pop();
    const isMobilePage = currentPage === 'mobile.html';
    const isDesktopPage = currentPage === 'index.html' || currentPage === '';
    
    // Device detection
    const isMobile = detectMobile();
    const isTablet = detectTablet();
    const isDesktop = detectDesktop();
    
    // Screen size detection
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Redirect logic
    function shouldRedirect() {
        // Don't redirect if user has manually chosen a version
        if (getCookie('preferredVersion')) {
            return false;
        }
        
        // Mobile devices (phones)
        if (isMobile || screenWidth <= 768) {
            return !isMobilePage;
        }
        
        // Tablets
        if (isTablet || (screenWidth > 768 && screenWidth <= 1024)) {
            // Tablets can use either version, prefer mobile for better touch experience
            if (screenWidth <= 900) {
                return !isMobilePage;
            }
        }
        
        // Desktop
        if (isDesktop || screenWidth > 1024) {
            return !isDesktopPage;
        }
        
        return false;
    }
    
    function getRedirectUrl() {
        if (isMobile || screenWidth <= 768) {
            return 'mobile.html';
        } else if (isTablet || (screenWidth > 768 && screenWidth <= 1024)) {
            if (screenWidth <= 900) {
                return 'mobile.html';
            } else {
                return 'index.html';
            }
        } else {
            return 'index.html';
        }
    }
    
    function redirect() {
        const redirectUrl = getRedirectUrl();
        const currentUrl = window.location.href;
        
        if (redirectUrl === 'mobile.html' && !currentUrl.includes('mobile.html')) {
            // Redirect to mobile version
            window.location.href = redirectUrl;
        } else if (redirectUrl === 'index.html' && currentUrl.includes('mobile.html')) {
            // Redirect to desktop version
            window.location.href = redirectUrl;
        }
    }
    
    // Device detection functions
    function detectMobile() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Mobile detection patterns
        const mobilePatterns = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
            /Mobile/i,
            /Tablet/i
        ];
        
        return mobilePatterns.some(pattern => pattern.test(userAgent));
    }
    
    function detectTablet() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // Tablet detection patterns
        const tabletPatterns = [
            /iPad/i,
            /Android(?!.*Mobile)/i,
            /Tablet/i
        ];
        
        return tabletPatterns.some(pattern => pattern.test(userAgent));
    }
    
    function detectDesktop() {
        return !detectMobile() && !detectTablet();
    }
    
    // Cookie utilities
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    function setCookie(name, value, days = 365) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
    
    // Version switcher functions
    function switchToMobile() {
        setCookie('preferredVersion', 'mobile');
        window.location.href = 'mobile.html';
    }
    
    function switchToDesktop() {
        setCookie('preferredVersion', 'desktop');
        window.location.href = 'index.html';
    }
    
    // Auto-switch based on screen resize
    function handleResize() {
        const newScreenWidth = window.innerWidth || document.documentElement.clientWidth;
        
        // Only auto-switch if user hasn't manually chosen a version
        if (!getCookie('preferredVersion')) {
            if (newScreenWidth <= 768 && !isMobilePage) {
                // Switch to mobile
                redirect();
            } else if (newScreenWidth > 1024 && isMobilePage) {
                // Switch to desktop
                redirect();
            }
        }
    }
    
    // Initialize
    function init() {
        // Check if redirect is needed
        if (shouldRedirect()) {
            redirect();
            return;
        }
        
        // Add version switcher buttons if they don't exist
        addVersionSwitcher();
        
        // Add resize listener for auto-switching
        window.addEventListener('resize', debounce(handleResize, 250));
        
        // Add orientation change listener
        window.addEventListener('orientationchange', function() {
            setTimeout(handleResize, 100);
        });
    }
    
    // Add version switcher buttons
    function addVersionSwitcher() {
        // Check if switcher already exists
        if (document.getElementById('versionSwitcher')) {
            return;
        }
        
        // Create version switcher
        const switcher = document.createElement('div');
        switcher.id = 'versionSwitcher';
        switcher.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--card-background, #ffffff);
            border: 1px solid var(--border-color, #e0e0e0);
            border-radius: 8px;
            padding: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-size: 14px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            min-width: 120px;
        `;
        
        const title = document.createElement('div');
        title.textContent = 'Switch to:';
        title.style.cssText = 'font-weight: 600; color: var(--text-primary, #333);';
        
        const mobileBtn = document.createElement('button');
        mobileBtn.textContent = '📱 Mobile';
        mobileBtn.style.cssText = `
            padding: 8px 12px;
            border: 1px solid var(--border-color, #e0e0e0);
            border-radius: 6px;
            background: var(--surface-color, #f5f5f5);
            color: var(--text-primary, #333);
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s ease;
        `;
        mobileBtn.addEventListener('click', switchToMobile);
        mobileBtn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--accent-color, #e3f2fd)';
        });
        mobileBtn.addEventListener('mouseleave', function() {
            this.style.background = 'var(--surface-color, #f5f5f5)';
        });
        
        const desktopBtn = document.createElement('button');
        desktopBtn.textContent = '💻 Desktop';
        desktopBtn.style.cssText = `
            padding: 8px 12px;
            border: 1px solid var(--border-color, #e0e0e0);
            border-radius: 6px;
            background: var(--surface-color, #f5f5f5);
            color: var(--text-primary, #333);
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s ease;
        `;
        desktopBtn.addEventListener('click', switchToDesktop);
        desktopBtn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--accent-color, #e3f2fd)';
        });
        desktopBtn.addEventListener('mouseleave', function() {
            this.style.background = 'var(--surface-color, #f5f5f5)';
        });
        
        // Highlight current version
        if (isMobilePage) {
            mobileBtn.style.background = 'var(--primary-color, #2196f3)';
            mobileBtn.style.color = 'white';
            mobileBtn.style.borderColor = 'var(--primary-color, #2196f3)';
        } else {
            desktopBtn.style.background = 'var(--primary-color, #2196f3)';
            desktopBtn.style.color = 'white';
            desktopBtn.style.borderColor = 'var(--primary-color, #2196f3)';
        }
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            font-size: 18px;
            color: var(--text-secondary, #666);
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.addEventListener('click', function() {
            switcher.remove();
        });
        
        // Assemble switcher
        switcher.appendChild(closeBtn);
        switcher.appendChild(title);
        switcher.appendChild(mobileBtn);
        switcher.appendChild(desktopBtn);
        
        // Add to page
        document.body.appendChild(switcher);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (switcher.parentNode) {
                switcher.style.opacity = '0.7';
                switcher.style.transition = 'opacity 0.3s ease';
            }
        }, 10000);
    }
    
    // Utility function: debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Expose functions globally
    window.responsiveRedirect = {
        switchToMobile,
        switchToDesktop,
        detectMobile,
        detectTablet,
        detectDesktop
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})(); 