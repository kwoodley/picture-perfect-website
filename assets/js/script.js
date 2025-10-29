// Picture Perfect Consulting - Anamol-Inspired JavaScript

// ========================================
// MOBILE MENU
// ========================================
const sidebarToggle = document.querySelector('.sidebar-menu-toggle');
const sidebar = document.querySelector('.sidebar-menu');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const sidebarClose = document.querySelector('.sidebar-close');

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', openSidebar);
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking a link
const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// Close sidebar on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
const serviceCards = document.querySelectorAll('.service-card');
const resourceContent = document.querySelectorAll('.resource-content');
const testimonialSection = document.querySelectorAll('.testimonial-section');

serviceCards.forEach(card => animationObserver.observe(card));
resourceContent.forEach(content => animationObserver.observe(content));
testimonialSection.forEach(section => animationObserver.observe(section));

// ========================================
// ACTIVE NAV LINK
// ========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// FORM HANDLING (if forms exist)
// ========================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
});

// ========================================
// ANIMATED COUNTERS FOR STATS
// ========================================
class CountUp {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        this.isPercent = this.element.textContent.includes('%');
        this.isMoney = this.element.textContent.includes('$');
        this.isMonth = this.element.textContent.includes('mo');
        this.hasPlus = this.element.textContent.includes('+');
    }
    
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        const easedProgress = this.easeOutQuart(progress);
        const current = Math.floor(easedProgress * this.target);
        
        // Format the number
        let display = current.toString();
        
        if (this.isMoney) {
            display = '$' + current + 'K';
        } else if (this.isPercent) {
            display = current + '%';
        } else if (this.isMonth) {
            display = current + ' mo';
        } else if (this.hasPlus) {
            display = current + '+';
        }
        
        this.element.textContent = display;
        
        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        } else {
            // Set final value
            if (this.isMoney) {
                this.element.textContent = '$' + this.target + 'K';
            } else if (this.isPercent) {
                this.element.textContent = this.target + '%';
            } else if (this.isMonth) {
                this.element.textContent = this.target + ' mo';
            } else if (this.hasPlus) {
                this.element.textContent = this.target + '+';
            }
        }
    }
    
    start() {
        requestAnimationFrame((time) => this.animate(time));
    }
}

// Initialize stat counters when they come into view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                
                // Extract the numeric value
                const text = statNumber.textContent;
                let target;
                
                if (text.includes('$')) {
                    target = parseInt(text.match(/\d+/)[0]);
                } else if (text.includes('%')) {
                    target = parseInt(text.match(/\d+/)[0]);
                } else if (text.includes('mo')) {
                    target = parseInt(text.match(/\d+/)[0]);
                } else {
                    target = parseInt(text.match(/\d+/)[0]);
                }
                
                const counter = new CountUp(statNumber, target, 2000);
                counter.start();
            }
            statObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => statObserver.observe(card));

// ========================================
// TESTIMONIAL CAROUSEL
// ========================================
class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(element.querySelectorAll('.testimonial-slide'));
        this.dots = Array.from(element.querySelectorAll('.dot'));
        this.prevBtn = element.querySelector('.prev');
        this.nextBtn = element.querySelector('.next');
        this.currentSlide = 0;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Move track
        const offset = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${offset}%)`;
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize carousel
const testimonialCarousel = document.querySelector('.testimonial-carousel');
if (testimonialCarousel) {
    new Carousel(testimonialCarousel);
}

// ========================================
// INITIALIZE
// ========================================
console.log('Picture Perfect Consulting - Website Loaded');
