// Animated particles background
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.7 ? '#00d4ff' : '#0066ff'
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (1 - distance / 100) * 0.2;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Social media links - you'll replace these with your actual URLs
const socialLinks = {
    'instagram': 'https://instagram.com/radonzilla',
    'github': 'https://github.com/Radonzilla',
    'x': 'https://twitter.com/Radonzilla',
    'linkedin': 'https://www.linkedin.com/in/razan-kattumunda-0122b132a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BjXWRWXRzR%2F%2B%2FTDH70UtibQ%3D%3D' // Update this with your actual LinkedIn URL
};

const projectLinks = {
    'sgpa-calc': 'https://sgpa-calc-beta.vercel.app', // Replace with actual project URLs
    'mark-converter': 'https://mark-converter.vercel.app',
    'read-faster': 'https://speed-readerpro.vercel.app',
    'matrix-calc': 'https://matrixcalcpro2.vercel.app',
    'oodp-project': '#'
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Typing effect for hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Glitch effect for project bubbles
function addGlitchEffect(element) {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const originalText = element.textContent;
    let glitchInterval;
    
    element.addEventListener('mouseenter', () => {
        let iterations = 0;
        glitchInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                element.textContent = originalText;
            }
            
            iterations += 1 / 3;
        }, 30);
    });
    
    element.addEventListener('mouseleave', () => {
        clearInterval(glitchInterval);
        element.textContent = originalText;
    });
}

// Parallax effect for hero section with fade out
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    const heroDescription = document.querySelector('.hero-description');
    const speed = 0.5;
    
    // Calculate fade based on scroll position
    const fadeStart = 100; // Start fading after 100px of scroll
    const fadeEnd = 400;   // Complete fade at 400px of scroll
    const fadeRange = fadeEnd - fadeStart;
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Fade out the hero description as user scrolls
    if (heroDescription) {
        if (scrolled <= fadeStart) {
            heroDescription.style.opacity = '1';
        } else if (scrolled >= fadeEnd) {
            heroDescription.style.opacity = '0';
        } else {
            const fadeProgress = (scrolled - fadeStart) / fadeRange;
            heroDescription.style.opacity = 1 - fadeProgress;
        }
        
        // Also add a slight blur effect for extra smoothness
        const blurAmount = Math.min((scrolled / fadeEnd) * 5, 5);
        heroDescription.style.filter = `blur(${blurAmount}px)`;
    }
}

// Matrix rain effect (subtle)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.03';
    canvas.style.pointerEvents = 'none';
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    document.body.appendChild(canvas);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Cursor trail effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.mouse = { x: 0, y: 0 };
        
        this.createTrailElements();
        this.bindEvents();
        this.animate();
    }
    
    createTrailElements() {
        for (let i = 0; i < this.maxTrail; i++) {
            const dot = document.createElement('div');
            dot.style.position = 'fixed';
            dot.style.width = '4px';
            dot.style.height = '4px';
            dot.style.backgroundColor = '#00d4ff';
            dot.style.borderRadius = '50%';
            dot.style.pointerEvents = 'none';
            dot.style.zIndex = '9999';
            dot.style.opacity = '0';
            dot.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(dot);
            
            this.trail.push({
                element: dot,
                x: 0,
                y: 0,
                alpha: 0
            });
        }
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    animate() {
        for (let i = this.trail.length - 1; i > 0; i--) {
            this.trail[i].x = this.trail[i - 1].x;
            this.trail[i].y = this.trail[i - 1].y;
        }
        
        this.trail[0].x = this.mouse.x;
        this.trail[0].y = this.mouse.y;
        
        this.trail.forEach((dot, index) => {
            const alpha = (this.maxTrail - index) / this.maxTrail;
            dot.element.style.left = dot.x - 2 + 'px';
            dot.element.style.top = dot.y - 2 + 'px';
            dot.element.style.opacity = alpha * 0.6;
            dot.element.style.transform = `scale(${alpha})`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Skill tags animation
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Social media bubble interactions
function enhanceSocialBubbles() {
    const socialBubbles = document.querySelectorAll('.social-bubble');
    
    socialBubbles.forEach(bubble => {
        const icon = bubble.querySelector('.social-icon');
        const logo = bubble.querySelector('.social-logo');
        
        // Handle image loading errors - show fallback icons
        logo.addEventListener('error', () => {
            logo.style.display = 'none';
            const fallbackIcon = bubble.querySelector('.fallback-icon');
            fallbackIcon.style.opacity = '1';
        });
        
        // Load image successfully - hide fallback
        logo.addEventListener('load', () => {
            logo.style.opacity = '1';
            const fallbackIcon = bubble.querySelector('.fallback-icon');
            fallbackIcon.style.opacity = '0';
        });
        
        bubble.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg) scale(1.1)';
            icon.style.transition = 'transform 0.6s ease';
        });
        
        bubble.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0deg) scale(1)';
        });
        
        // Click handler for social media navigation
        bubble.addEventListener('click', () => {
            const platform = bubble.getAttribute('data-platform');
            const url = socialLinks[platform];
            
            // Add click animation
            bubble.style.transform = 'scale(0.95)';
            bubble.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                bubble.style.transform = '';
                if (url && !url.includes('your_')) {
                    window.open(url, '_blank');
                } else {
                    // Placeholder notification
                    showNotification(`${platform.charAt(0).toUpperCase() + platform.slice(1)} link will be added soon!`);
                }
            }, 100);
        });
    });
}

// Enhanced project bubble interactions
function enhanceProjectBubbles() {
    const bubbles = document.querySelectorAll('.project-bubble');
    
    bubbles.forEach(bubble => {
        const icon = bubble.querySelector('.project-icon');
        
        bubble.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg) scale(1.1)';
            icon.style.transition = 'transform 0.6s ease';
        });
        
        bubble.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0deg) scale(1)';
        });
        
        // Click handler for project navigation
        bubble.addEventListener('click', () => {
            const projectKey = bubble.getAttribute('data-project');
            const url = projectLinks[projectKey];
            
            // Add click animation
            bubble.style.transform = 'scale(0.95)';
            bubble.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                bubble.style.transform = '';
                if (url && url !== '#') {
                    window.open(url, '_blank');
                } else {
                    // Placeholder notification
                    showNotification('Project link will be added soon!');
                }
            }, 100);
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #0066ff, #00d4ff);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 102, 255, 0.3);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Text reveal animation
function revealText(element, delay = 0) {
    // Skip the text reveal animation to preserve spacing
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

// Floating animation for elements
function addFloatingAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    new ParticleSystem(canvas);
    
    // Initialize matrix rain effect
    createMatrixRain();
    
    // Initialize cursor trail
    new CursorTrail();
    
    // Set up intersection observer for animations
    const animatedElements = document.querySelectorAll('.project-bubble, .social-bubble, .skills-category, .education-card, .hobbies-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Enhance project bubbles
    enhanceProjectBubbles();
    
    // Enhance social media bubbles
    enhanceSocialBubbles();
    
    // Add floating animation to hobby items and social bubbles
    addFloatingAnimation('.hobby-item');
    addFloatingAnimation('.social-bubble');
    
    // Animate skill tags when skills section is visible
    const skillsSection = document.querySelector('.skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillTags();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
    
    // Parallax effect
    window.addEventListener('scroll', handleParallax);
    
    // Reveal hero text
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        revealText(heroDescription, 800);
    }
    
    // Add glitch effect to project titles
    const projectTitles = document.querySelectorAll('.project-bubble h3');
    projectTitles.forEach(title => {
        addGlitchEffect(title);
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add CSS for floating animation
const floatingCSS = `
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}
`;

const style = document.createElement('style');
style.textContent = floatingCSS;
document.head.appendChild(style);

// Performance optimization - throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleParallax, 16));