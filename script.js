// Blog Posts Data - Easy to add new posts here
const blogPosts = [
    {
        id: 1,
        title: "Building Interactive Games with Python & Pygame",
        excerpt: "Dive deep into game development fundamentals using Python. Learn how to create engaging 2048 game mechanics, handle user input, and implement smooth animations that keep players hooked.",
        category: "Game Development",
        date: "Dec 2024",
        readTime: "5 min read",
        tags: ["Python", "Pygame", "Game Dev"],
        color: "#00ff88"
    },
    {
        id: 2,
        title: "Data Structures Visualization: Making Complex Concepts Simple",
        excerpt: "Explore how interactive visualizations can transform learning. From binary search trees to graph algorithms, discover techniques to make abstract concepts tangible and memorable.",
        category: "Algorithms",
        date: "Nov 2024",
        readTime: "7 min read",
        tags: ["Data Structures", "Visualization", "Education"],
        color: "#8800ff"
    },
    {
        id: 3,
        title: "From Code to Canvas: UI/UX Principles for Developers",
        excerpt: "Bridge the gap between functionality and aesthetics. Learn essential design principles that every developer should know to create intuitive and visually appealing interfaces.",
        category: "Design",
        date: "Oct 2024",
        readTime: "6 min read",
        tags: ["UI/UX", "Design", "Frontend"],
        color: "#ff0080"
    },
    {
        id: 4,
        title: "Mathematical Computing: Where Theory Meets Practice",
        excerpt: "Discover how mathematical concepts translate into real-world applications. Explore computational mathematics and its role in solving complex problems across various domains.",
        category: "Mathematics",
        date: "Sep 2024",
        readTime: "8 min read",
        tags: ["Mathematics", "Computing", "Theory"],
        color: "#00ffff"
    },
    {
        id: 5,
        title: "The Art of Problem Solving: HackerRank to Real World",
        excerpt: "Transform competitive programming skills into practical solutions. Learn how algorithmic thinking applies to real-world software development challenges and system design.",
        category: "Problem Solving",
        date: "Aug 2024",
        readTime: "4 min read",
        tags: ["Algorithms", "Problem Solving", "Coding"],
        color: "#ffaa00"
    },
    {
        id: 6,
        title: "Creative Coding: When Programming Becomes Art",
        excerpt: "Explore the intersection of code and creativity. From generative art to interactive installations, discover how programming can be a medium for artistic expression.",
        category: "Creative Tech",
        date: "Jul 2024",
        readTime: "5 min read",
        tags: ["Creative Coding", "Art", "Innovation"],
        color: "#aa00ff"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize loading screen
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize blog posts
    initBlogPosts();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize role tag rotation
    initRoleTagRotation();
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
}

// Navigation
function initNavigation() {
    const dockItems = document.querySelectorAll('.dock-item[data-section]');
    
    // Smooth scrolling for navigation links
    dockItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active navigation item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const dockItems = document.querySelectorAll('.dock-item[data-section]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active dock item
    dockItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === currentSection) {
            item.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
}

// Typing Animation
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const text = 'Om Pranab Mohanty';
    
    if (heroTitle) {
        setTimeout(() => {
            typeText(heroTitle, text, 120);
        }, 3500); // Start after loading screen
    }
}

function typeText(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// Blog Posts
function initBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    
    if (blogGrid) {
        blogGrid.innerHTML = '';
        
        blogPosts.forEach(post => {
            const blogCard = createBlogCard(post);
            blogGrid.appendChild(blogCard);
        });
    }
}

function createBlogCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.style.setProperty('--card-color', post.color);
    
    article.innerHTML = `
        <div class="blog-header">
            <div class="blog-meta">
                <span class="blog-date">${post.date}</span>
                <span class="blog-read-time">${post.readTime}</span>
            </div>
            <div class="blog-category" style="background-color: ${post.color}20; color: ${post.color}; border-color: ${post.color};">
                ${post.category}
            </div>
        </div>
        <div class="blog-content">
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-tags">
                ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="blog-footer">
            <a href="#" class="blog-link">
                Read Article
                <span class="link-arrow">â</span>
            </a>
        </div>
    `;
    
    return article;
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Create mailto link
    const mailtoLink = `mailto:ompranabmohanty@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Message prepared! Your email client should open shortly.', 'success');
    
    // Reset form
    e.target.reset();
}

// Role Tag Rotation
function initRoleTagRotation() {
    const roleTags = document.querySelectorAll('.role-tag');
    
    if (roleTags.length > 0) {
        let currentIndex = 0;
        
        setInterval(() => {
            roleTags.forEach(tag => tag.classList.remove('active'));
            roleTags[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % roleTags.length;
        }, 3000);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 15px 20px;
        border-radius: var(--border-radius);
        border: 1px solid var(--accent-primary);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Utility Functions
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

// Performance Optimization
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizeAnimations();

// Export functions for easy extension
window.portfolioUtils = {
    typeText,
    showNotification,
    createBlogCard,
    blogPosts
};

// Console welcome message
console.log(`
ð® Welcome to Om Pranab Mohanty's Portfolio! ð®

Built with:
- Pure HTML, CSS, and JavaScript
- No frameworks or dependencies
- Optimized for GitHub Pages
- Responsive and accessible design

Feel free to explore the code!
Contact: ompranabmohanty@gmail.com
GitHub: @04pranab
`);

/*
===================================
How to Add New Blog Posts:
===================================

1. Add a new object to the blogPosts array at the top of this file:

const newPost = {
    id: 7, // increment this number
    title: "Your Article Title",
    excerpt: "Brief description of your article...",
    category: "Category Name",
    date: "Month Year",
    readTime: "X min read",
    tags: ["tag1", "tag2", "tag3"],
    color: "#your-hex-color" // any hex color
};

2. Push it to the blogPosts array:
blogPosts.push(newPost);

3. The blog section will automatically update!

===================================
Customization Tips:
===================================

- Change colors in styles.css :root section
- Modify animations by adjusting CSS keyframes
- Add new sections by following the existing HTML structure
- Update personal information directly in index.html
- Add new skills in the skills section with appropriate classes

===================================
*/
\ No newline at end of file
