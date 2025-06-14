// Enhanced Portfolio Website JavaScript with Advanced Animations
class ModernPortfolio {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupContactForm();
        this.setupTypewriter();
        this.setupSkillBars();
    }

    init() {
        // Initialize state
        this.isScrolling = false;
        this.currentSection = 0;
        this.rotatingTextIndex = 0;
        this.typewriterTexts = [
            "Computer Science Student",
            "Python Developer", 
            "Problem Solver",
            "Tech Enthusiast"
        ];
        
        // Initialize scroll position tracking
        this.scrollPosition = 0;
        this.ticking = false;
        
        // Performance optimization - debounced functions
        this.debouncedResize = this.debounce(this.handleResize.bind(this), 250);
        this.debouncedScroll = this.debounce(this.handleScroll.bind(this), 16);
    }

    setupEventListeners() {
        // Scroll events with passive listeners for better performance
        window.addEventListener('scroll', this.debouncedScroll, { passive: true });
        window.addEventListener('resize', this.debouncedResize, { passive: true });
        
        // Navigation events
        document.addEventListener('click', this.handleNavigation.bind(this));
        
        // Form events
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle with animation
        hamburger?.addEventListener('click', (e) => {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.smoothScrollTo(targetId);
                
                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Update active navigation on scroll
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: [0.3],
            rootMargin: '-80px 0px -80px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
        const targetPosition = target.offsetTop - navHeight;
        
        // Enhanced smooth scrolling with easing
        this.animateScrollTo(targetPosition, 800);
    }

    animateScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollEffects();
                this.updateScrollAnimations();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollEffects() {
        const navbar = document.getElementById('navbar');
        const scrolled = window.pageYOffset;
        this.scrollPosition = scrolled;

        // Navbar scroll effect
        if (scrolled > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Parallax effects
        this.updateParallaxEffects(scrolled);
    }

    updateParallaxEffects(scrolled) {
        // Hero background parallax
        const heroSection = document.querySelector('.hero');
        if (heroSection && scrolled < window.innerHeight) {
            const parallaxElements = heroSection.querySelectorAll('.floating-shapes .shape');
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.2;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }

        // Grid overlay animation
        const gridOverlay = document.querySelector('.grid-overlay');
        if (gridOverlay) {
            gridOverlay.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
        }
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        this.setupScrollObserver();
        
        // Initialize floating animations
        this.initializeFloatingElements();
        
        // Setup profile card animations
        this.setupProfileAnimations();
    }

    setupScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('skill-progress')) {
                        this.animateSkillBar(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(`
            .text-block, .achievement-card, .education-card, .skill-category,
            .project-card, .cert-card, .contact-card, .skill-progress, .stat-number
        `);
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            scrollObserver.observe(el);
        });
    }

    initializeFloatingElements() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            // Add random animation delays and durations for more organic movement
            const delay = Math.random() * 2;
            const duration = 4 + Math.random() * 2;
            
            icon.style.animationDelay = `${delay}s`;
            icon.style.animationDuration = `${duration}s`;
            
            // Add mouse interaction
            icon.addEventListener('mouseenter', () => {
                icon.style.animationPlayState = 'paused';
                icon.style.transform = 'scale(1.2) rotate(15deg)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.animationPlayState = 'running';
                icon.style.transform = '';
            });
        });
    }

    setupProfileAnimations() {
        const profileCard = document.querySelector('.profile-card');
        if (!profileCard) return;

        // Advanced hover effects
        profileCard.addEventListener('mouseenter', () => {
            profileCard.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            profileCard.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.3)';
        });

        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = '';
            profileCard.style.boxShadow = '';
        });

        // 3D tilt effect based on mouse position
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            profileCard.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    }

    setupTypewriter() {
        const rotatingTextContainer = document.querySelector('.rotating-text');
        if (!rotatingTextContainer) return;

        const textItems = rotatingTextContainer.querySelectorAll('.text-item');
        let currentIndex = 0;

        const rotateText = () => {
            // Remove active class from current item
            textItems[currentIndex].classList.remove('active');
            
            // Move to next item
            currentIndex = (currentIndex + 1) % textItems.length;
            
            // Add active class to new item
            textItems[currentIndex].classList.add('active');
        };

        // Start rotation
        setInterval(rotateText, 3000);

        // Add typewriter effect to hero name
        this.initializeTypewriter();
    }

    initializeTypewriter() {
        const nameElements = document.querySelectorAll('.name-part');
        nameElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            setTimeout(() => {
                this.typeText(element, text, 100);
            }, index * 500);
        });
    }

    typeText(element, text, speed) {
        let index = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width && !bar.classList.contains('animated')) {
                    setTimeout(() => {
                        bar.style.width = `${width}%`;
                        bar.classList.add('animated');
                    }, Math.random() * 500);
                }
            });
        };

        // Trigger animation when skills section is visible
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(skillsSection);
        }
    }

    animateSkillBar(skillBar) {
        const width = skillBar.getAttribute('data-width');
        if (width) {
            skillBar.style.width = `${width}%`;
        }
    }

    animateCounter(counterElement) {
        const target = counterElement.textContent;
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        
        if (isNaN(numericTarget)) return;
        
        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                counterElement.textContent = target;
                clearInterval(timer);
            } else {
                counterElement.textContent = Math.floor(current);
            }
        }, 50);
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        // Enhanced form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length >= 2;
                errorMessage = 'This field must be at least 2 characters long';
                break;
            case 'textarea':
                isValid = value.length >= 10;
                errorMessage = 'Please enter at least 10 characters';
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = 'var(--accent-secondary)';
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: var(--accent-secondary);
                font-size: 0.8rem;
                margin-top: 0.5rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        setTimeout(() => errorElement.style.opacity = '1', 10);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.opacity = '0';
            setTimeout(() => errorElement.remove(), 300);
        }
    }

    async handleFormSubmit(e) {
        if (e.target.id !== 'contactForm') return;
        
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.submit-btn');
        const formData = new FormData(form);
        
        // Validate all fields
        const formInputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        formInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await this.submitForm(formData);
            
            // Success
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    async submitForm(formData) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const bgColor = type === 'success' ? 'var(--accent-primary)' : 'var(--accent-secondary)';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: var(--bg-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            font-weight: 600;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: var(--shadow-lg);
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    handleNavigation(e) {
        // Handle smooth scrolling for any internal links
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            this.smoothScrollTo(targetId);
        }
    }

    handleKeyboard(e) {
        // Accessibility: Allow navigation with keyboard
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (navMenu?.classList.contains('active')) {
                hamburger?.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    handleResize() {
        // Recalculate animations and layouts on resize
        this.updateLayout();
    }

    updateLayout() {
        // Force recalculation of scroll positions and animations
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            if (this.isElementInViewport(el)) {
                el.classList.add('animated');
            }
        });
    }

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    updateScrollAnimations() {
        // Add scroll-based animations here
        const scrolled = this.scrollPosition;
        const windowHeight = window.innerHeight;
        
        // Example: Scale elements based on scroll
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            const rect = profileCard.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            
            if (elementTop < windowHeight && elementTop > -elementHeight) {
                const progress = (windowHeight - elementTop) / (windowHeight + elementHeight);
                const scale = 0.8 + (progress * 0.2);
                profileCard.style.transform = `scale(${Math.min(scale, 1)})`;
            }
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
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

    // Initialize performance monitoring
    initPerformanceMonitoring() {
        // Monitor frame rate
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkFrameRate = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30) {
                    console.warn('Low frame rate detected:', fps, 'FPS');
                    // Disable heavy animations if performance is poor
                    this.disableHeavyAnimations();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkFrameRate);
        };
        
        requestAnimationFrame(checkFrameRate);
    }

    disableHeavyAnimations() {
        // Reduce animations for better performance
        document.body.classList.add('reduced-motion');
        
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Smooth scrolling polyfill for older browsers
if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function(options) {
        if (typeof options === 'object') {
            const target = this.offsetTop;
            window.scrollTo({
                top: target,
                behavior: 'smooth'
            });
        } else {
            this.scrollIntoView();
        }
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // Initialize the portfolio
    const portfolio = new ModernPortfolio();
    
    // Initialize performance monitoring in production
    if (location.hostname !== 'localhost') {
        portfolio.initPerformanceMonitoring();
    }
    
    // Add loading complete class for any final animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('🚀 Modern Portfolio Loaded Successfully!');
    
    // Service worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernPortfolio;
}