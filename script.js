// ====================================
// INITIALIZATION
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================================
    // THEME TOGGLE
    // ====================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    const updateThemeIcon = (theme) => {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    };
    
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation to the entire page
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });

    // ====================================
    // LOADING ELEMENTS OBSERVER
    // ====================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all loading elements
    document.querySelectorAll('.loading').forEach(el => {
        observer.observe(el);
    });

    // ====================================
    // NAVBAR SCROLL EFFECT
    // ====================================
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Update scroll indicator
        scrollIndicator.style.transform = `scaleX(${rate})`;
        
        // Update navbar
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ====================================
    // NAVIGATION ACTIVE LINK
    // ====================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    const setActiveNavLink = () => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // ====================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ====================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // ====================================
    // CONTACT FORM WITH EMAILJS
    // ====================================
    const contactForm = document.getElementById('contactForm');
    const alertMessage = document.getElementById('alertMessage');
    
    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertMessage.className = `alert alert-${type} show`;
        
        setTimeout(() => {
            alertMessage.classList.remove('show');
        }, 5000);
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonContent = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_name: 'Saleh Hassan'
        };
        
        // Send email using EmailJS
        emailjs.send('service_t9xnyqr', 'template_m89v1o9', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showAlert('Thank you for your message! I will get back to you soon. 🎉', 'success');
                contactForm.reset();
                submitButton.innerHTML = originalButtonContent;
                submitButton.disabled = false;
            }, function(error) {
                console.log('FAILED...', error);
                // Fallback to mailto if EmailJS fails
                const mailtoLink = `mailto:salehewais4ever@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent('From: ' + formData.from_name + ' (' + formData.from_email + ')\n\n' + formData.message)}`;
                window.location.href = mailtoLink;
                showAlert('Opening your email client... Please send the message from there.', 'error');
                submitButton.innerHTML = originalButtonContent;
                submitButton.disabled = false;
            });
    });

    // ====================================
    // TYPING ANIMATION
    // ====================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const texts = ['Crafting Digital Solutions', 'Building Enterprise Systems', 'Optimizing Business Processes'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before typing new text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 2000);

    // ====================================
    // PARALLAX FOR FLOATING ELEMENTS
    // ====================================
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
        });
    });

    // ====================================
    // SKILL CARDS HOVER
    // ====================================
    const skillCards = document.querySelectorAll('.skill-category');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ====================================
    // COUNTER ANIMATION
    // ====================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }, 20);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ====================================
    // MOBILE MENU TOGGLE
    // ====================================
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }
});

// ====================================
// PARTICLE SYSTEM
// ====================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        particlesContainer.appendChild(particle);
    }
}

// ====================================
// LOADING SCREEN
// ====================================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        createParticles();
        
        // Initialize reveal animations after load
        initScrollReveal();
    }, 800);
});

// ====================================
// CUSTOM CURSOR
// ====================================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

let cursorX = 0, cursorY = 0;
let outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    // Dot follows cursor exactly
    if (cursorDot) {
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
    }
});

// Smooth outline animation
function animateCursor() {
    // Smooth interpolation for outline
    outlineX += (cursorX - outlineX) * 0.15;
    outlineY += (cursorY - outlineY) * 0.15;
    
    if (cursorOutline) {
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .magnetic, .skill-category, .stat-card, .timeline-item, .contact-item, .social-link');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorOutline) cursorOutline.classList.add('hover');
        if (cursorDot) cursorDot.style.transform = 'scale(2)';
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorOutline) cursorOutline.classList.remove('hover');
        if (cursorDot) cursorDot.style.transform = 'scale(1)';
    });
});

// ====================================
// SCROLL REVEAL ANIMATION
// ====================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .stagger-children');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

// ====================================
// MAGNETIC BUTTON EFFECT
// ====================================
const magneticElements = document.querySelectorAll('[data-magnetic]');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

// ====================================
// TILT EFFECT
// ====================================
const tiltElements = document.querySelectorAll('.tilt-effect');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ====================================
// SMOOTH SECTION TRANSITIONS
// ====================================
const allSections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

allSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.5, 0, 0, 1)';
    sectionObserver.observe(section);
});

// ====================================
// PARALLAX EFFECT ON SCROLL
// ====================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for blobs
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.1;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for floating icons
    const floatIcons = document.querySelectorAll('.float-icon');
    floatIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.05;
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ====================================
// SKILL LEVEL ANIMATION
// ====================================
const skillLevels = document.querySelectorAll('.skill-level');

skillLevels.forEach(level => {
    level.addEventListener('mouseenter', () => {
        level.style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    level.addEventListener('mouseleave', () => {
        level.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ====================================
// RIPPLE EFFECT ON BUTTONS
// ====================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        to {
            width: 400px;
            height: 400px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====================================
// CHARACTER ANIMATION FOR TITLE
// ====================================
function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char-animate';
        span.style.animationDelay = `${index * 0.05}s`;
        element.appendChild(span);
    });
}

// Animate section titles on scroll
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => {
    titleObserver.observe(title);
});

// ====================================
// SCROLL PROGRESS BUTTON
// ====================================
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.innerHTML = '<span>0%</span>';
scrollProgress.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--gradient-main);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.4);
`;
document.body.appendChild(scrollProgress);

scrollProgress.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.round((scrolled / total) * 100);
    
    scrollProgress.querySelector('span').textContent = `${progress}%`;
    
    if (scrolled > 300) {
        scrollProgress.style.opacity = '1';
        scrollProgress.style.transform = 'scale(1)';
    } else {
        scrollProgress.style.opacity = '0';
        scrollProgress.style.transform = 'scale(0.8)';
    }
});

console.log('🚀 All animations loaded successfully!');

