// Standalone Mobile Menu Script - Picture Perfect Consulting
console.log('🚀 Mobile menu script loaded');

(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    function initMobileMenu() {
        console.log('📱 Initializing mobile menu...');
        
        // Get elements
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        const body = document.body;
        
        // Debug: Check if elements exist
        console.log('Elements found:', {
            toggle: !!mobileMenuToggle,
            close: !!mobileMenuClose, 
            menu: !!mobileMenu,
            overlay: !!mobileMenuOverlay
        });
        
        if (!mobileMenuToggle || !mobileMenu || !mobileMenuOverlay) {
            console.error('❌ Mobile menu elements not found!');
            return;
        }
        
        // Functions
        function openMobileMenu() {
            console.log('📂 Opening mobile menu');
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            mobileMenuToggle.classList.add('active');
            body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            console.log('📁 Closing mobile menu');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            body.style.overflow = '';
        }
        
        // Event listeners
        mobileMenuToggle.addEventListener('click', function(e) {
            console.log('🔘 Toggle button clicked');
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });
        
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function(e) {
                console.log('❌ Close button clicked');
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }
        
        mobileMenuOverlay.addEventListener('click', function(e) {
            console.log('🌫️ Overlay clicked');
            closeMobileMenu();
        });
        
        // Close menu when clicking nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('🔗 Nav link clicked');
                closeMobileMenu();
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                console.log('⌨️ Escape key pressed');
                closeMobileMenu();
            }
        });
        
        console.log('✅ Mobile menu initialized successfully');
    }
    
})();