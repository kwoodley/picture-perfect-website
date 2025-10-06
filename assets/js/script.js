// Picture Perfect Consulting - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Picture Perfect Consulting scripts loaded');
    
    // Mobile Tab Navigation Functionality
    const tabNavigation = document.querySelector('.mobile-tab-nav');
    const tabLinks = document.querySelectorAll('.tab-link');
    
    console.log('📱 Tab navigation elements found:', {
        navigation: !!tabNavigation,
        tabCount: tabLinks.length
    });
    
    // Initialize tab navigation
    function initTabNavigation() {
        if (tabLinks.length === 0) return;
        
        // Set active tab based on current page
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        
        tabLinks.forEach(tab => {
            tab.classList.remove('active');
            const tabPage = tab.dataset.page;
            
            if ((currentPage === 'index' && tabPage === 'home') || currentPage === tabPage) {
                tab.classList.add('active');
                console.log('📱 Active tab set:', tabPage);
            }
        });
        
        // Add tab interaction effects
        tabLinks.forEach(tab => {
            // Ripple effect on click
            tab.addEventListener('click', function(e) {
                console.log('📱 Tab clicked:', this.dataset.page);
                
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(37, 99, 235, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    transform: scale(0);
                    animation: tab-ripple 0.6s ease-out;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
            
            // Hover effects for desktop
            tab.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-2px)';
                }
            });
            
            tab.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0)';
                }
            });
        });
        
        console.log('✅ Tab navigation initialized');
    }
    
    // Initialize after DOM is loaded
    initTabNavigation();
    
    // Add ripple animation CSS if not already added
    if (!document.getElementById('tab-ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'tab-ripple-animation';
        style.textContent = `
            @keyframes tab-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Navigation link interactions
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Animate success items on page load
    const successItems = document.querySelectorAll('.success-items > div');
    
    // Add animation delays to each item
    successItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.8)';
        item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        item.style.transitionDelay = `${index * 0.15}s`;
        
        // Trigger animation after a short delay
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, 600 + (index * 150));
    });

    // Enhanced hover effects for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.15)';
            this.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add floating animation to career success items
    const floatingItems = ['.trophy', '.graph-chart', '.diploma', '.sticky-notes'];
    
    floatingItems.forEach((selector, index) => {
        const item = document.querySelector(selector);
        if (item) {
            let direction = 1;
            let position = 0;
            const baseDelay = index * 1000; // Stagger the start times
            
            setTimeout(() => {
                setInterval(() => {
                    position += direction * 0.3;
                    if (position >= 5) direction = -1;
                    if (position <= -5) direction = 1;
                    
                    item.style.transform = `translateY(${position}px) ${selector === '.sticky-notes' ? 'rotate(15deg)' : ''} ${selector === '.diploma' ? 'rotate(-10deg)' : ''}`;
                }, 80);
            }, baseDelay);
        }
    });

    // Enhanced parallax effect for hero image on scroll
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.career-mockup');
        const speed = scrolled * 0.15;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${speed}px)`;
        });
        
        // Add subtle scroll effect to service cards
        const serviceCards = document.querySelectorAll('.service-card, .service-card-main');
        serviceCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardHeight = card.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > cardTop && scrolled < cardTop + cardHeight) {
                const progress = (scrolled + windowHeight - cardTop) / (windowHeight + cardHeight);
                const translateY = Math.max(0, (1 - progress) * 20);
                card.style.transform = `translateY(${translateY}px)`;
                card.style.opacity = Math.min(1, progress * 2);
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Enhanced click interaction for the main logo
    const mainLogo = document.querySelector('.main-logo');
    if (mainLogo) {
        mainLogo.addEventListener('click', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    }

    // CTA Button hover enhancements
    const ctaButtons = document.querySelectorAll('.cta-button, .service-cta, .option-cta, .premium-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            if (this.classList.contains('primary')) {
                this.style.boxShadow = '0 15px 35px rgba(37, 99, 235, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Form enhancement - Real-time validation feedback
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-blue)';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value && this.hasAttribute('required')) {
                this.style.borderColor = 'var(--error-color)';
                this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else if (this.value) {
                this.style.borderColor = 'var(--success-color)';
                this.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            } else {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            }
        });
        
        // Real-time validation for email
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = 'var(--error-color)';
                } else if (this.value) {
                    this.style.borderColor = 'var(--success-color)';
                }
            });
        }
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Remove this in production
            
            const submitButton = form.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.style.backgroundColor = '';
                    form.reset();
                }, 2000);
            }, 2000);
        });
    });

    // Testimonial rotation (if multiple testimonials exist)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 1) {
        let currentTestimonial = 0;
        
        setInterval(() => {
            testimonialCards[currentTestimonial].style.opacity = '0';
            testimonialCards[currentTestimonial].style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                testimonialCards[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                
                testimonialCards[currentTestimonial].style.display = 'block';
                testimonialCards[currentTestimonial].style.opacity = '0';
                testimonialCards[currentTestimonial].style.transform = 'translateX(50px)';
                
                setTimeout(() => {
                    testimonialCards[currentTestimonial].style.opacity = '1';
                    testimonialCards[currentTestimonial].style.transform = 'translateX(0)';
                }, 50);
            }, 300);
        }, 5000);
    }

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const isPercentage = finalValue.includes('%');
            const isCurrency = finalValue.includes('$');
            const hasPlus = finalValue.includes('+');
            
            let numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            if (finalValue.includes('K')) {
                numericValue *= 1000;
            }
            
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(currentValue);
                if (finalValue.includes('K')) {
                    displayValue = Math.floor(displayValue / 1000) + 'K';
                } else if (isCurrency) {
                    displayValue = '$' + displayValue + 'K';
                } else if (isPercentage) {
                    displayValue = displayValue + '%';
                } else if (hasPlus) {
                    displayValue = displayValue + '+';
                }
                
                stat.textContent = displayValue;
            }, 50);
        });
    };

    // Trigger stats animation when in viewport
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        if (question && answer) {
            // Initially hide answers
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            question.style.cursor = 'pointer';
            question.style.position = 'relative';
            
            // Add expand/collapse indicator
            const indicator = document.createElement('span');
            indicator.innerHTML = '+';
            indicator.style.position = 'absolute';
            indicator.style.right = '0';
            indicator.style.top = '0';
            indicator.style.fontSize = '24px';
            indicator.style.color = 'var(--primary-blue)';
            indicator.style.transition = 'transform 0.3s ease';
            question.appendChild(indicator);
            
            question.addEventListener('click', () => {
                const isOpen = answer.style.maxHeight !== '0px';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('p');
                        const otherIndicator = otherItem.querySelector('h3 span');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                        if (otherIndicator) {
                            otherIndicator.style.transform = 'rotate(0deg)';
                            otherIndicator.innerHTML = '+';
                        }
                    }
                });
                
                if (isOpen) {
                    answer.style.maxHeight = '0';
                    indicator.style.transform = 'rotate(0deg)';
                    indicator.innerHTML = '+';
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    indicator.style.transform = 'rotate(45deg)';
                    indicator.innerHTML = '+';
                }
            });
        }
    });

    // Smooth page load animation (simplified to avoid mobile menu conflicts)
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-blue);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Utility function to add ripple effect to clickable elements
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
        `;
        
        // Add ripple animation keyframes if not already added
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effect to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const rippleElements = document.querySelectorAll('.nav-link, .social-icon, .cta-button, .service-cta');
    rippleElements.forEach(addRippleEffect);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Enhanced scroll-based animations and header behavior
window.addEventListener('scroll', throttle(function() {
    const scrollTop = window.pageYOffset;
    const header = document.querySelector('.header');
    
    // Add shadow and backdrop blur to header on scroll
    if (scrollTop > 50) {
        header.classList.add('scrolled');
        header.style.backdropFilter = 'blur(15px)';
        header.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
    } else {
        header.classList.remove('scrolled');
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(248, 250, 252, 0.95)';
    }

    // Parallax effect for hero elements
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    heroElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16)); // ~60fps

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll(
        '.services-preview, .testimonial-section, .process-section, .cta-section, .team-section'
    );
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeInObserver.observe(element);
    });
});

// Mobile-specific optimizations
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile for better performance
    document.documentElement.style.setProperty('--transition-slow', '0.3s ease');
    document.documentElement.style.setProperty('--transition-normal', '0.2s ease');
    
    // Disable parallax on mobile for better performance
    const parallaxElements = document.querySelectorAll('.career-mockup');
    parallaxElements.forEach(element => {
        element.style.transform = 'none';
    });
}