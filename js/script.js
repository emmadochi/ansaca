// i18n Language Engine
window.ANSACA_I18N = {
    currentLang: localStorage.getItem('ansaca_lang') || 'en',
    
    init() {
        this.updateUI();
        this.updateToggleButtons();
    },
    
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('ansaca_lang', lang);
        this.updateUI();
        this.updateToggleButtons();
        this.refreshIcons();
    },
    
    updateUI() {
        const dict = window.ANSACA_TRANSLATIONS[this.currentLang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                } else {
                    el.innerText = dict[key];
                }
            }
        });
    },
    
    updateToggleButtons() {
        // Desktop toggles
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.classList.contains(this.currentLang)) {
                btn.classList.add('bg-secondary', 'text-white');
                btn.classList.remove('text-gray-400');
            } else {
                btn.classList.remove('bg-secondary', 'text-white');
                btn.classList.add('text-gray-400');
            }
        });
        
        // Mobile toggles
        document.querySelectorAll('.lang-btn-mob').forEach(btn => {
            if (btn.classList.contains(this.currentLang)) {
                btn.classList.add('bg-white/20', 'text-white');
                btn.classList.remove('text-white/40');
            } else {
                btn.classList.remove('bg-white/20', 'text-white');
                btn.classList.add('text-white/40');
            }
        });
    },

    refreshIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
};

// Initialize everything on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ANSACA_I18N.init();
    window.ANSACA_I18N.refreshIcons();
});

// Handle Preloader Dismissal on Window Load
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const progress = document.querySelector('.preloader-progress');
    const content = document.querySelector('.preloader-content');
    
    const tl = gsap.timeline();
    
    // Smoothly finish progress bar
    tl.to(progress, {
        x: '0%',
        duration: 0.8,
        ease: 'power2.inOut'
    })
    // Fade out central content
    .to(content, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: 'power2.in'
    })
    // Slide up the entire preloader overlay
    .to(preloader, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut'
    })
    // Remove from DOM to keep it clean
    .set(preloader, { display: 'none' })
    // Re-enable scroll (if it was disabled)
    .set(document.body, { overflow: 'auto' });
});

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.replace('bg-white/80', 'bg-white/95');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.replace('bg-white/95', 'bg-white/80');
    }
});

// Mobile Menu Toggle with GSAP
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuInternalBtn = document.getElementById('close-menu-internal');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
let isMenuOpen = false;

function toggleMenu(forceClose = false) {
    if (forceClose) isMenuOpen = false;
    else isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        // Open Menu
        mobileMenu.classList.remove('pointer-events-none');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Lock scroll
        
        gsap.to(mobileMenu, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        // Staggered reveal for menu content
        const tl = gsap.timeline();
        tl.fromTo('#mobile-menu a, #mobile-menu p, #mobile-menu .bg-white\/5, #mobile-menu button', 
            { y: 15, opacity: 0, scale: 0.98 }, 
            { 
                y: 0, 
                opacity: 1, 
                scale: 1, 
                duration: 0.4, 
                stagger: 0.03, 
                ease: 'power3.out', 
                delay: 0.1 
            }
        );
    } else {
        // Close Menu
        mobileMenu.classList.add('pointer-events-none');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('overflow-hidden'); // Unlock scroll
        
        gsap.to(mobileMenu, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        });
    }
}

mobileMenuBtn.addEventListener('click', () => toggleMenu());

if (mobileMenuInternalBtn) {
    mobileMenuInternalBtn.addEventListener('click', () => toggleMenu(true));
}

// Close menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
});

// Initial GSAP Animations
document.addEventListener("DOMContentLoaded", (event) => {
    // Hero Animations
    const tl = gsap.timeline();

    tl.from('.hero-bg', {
        scale: 1.1,
        duration: 2,
        ease: 'power3.out'
    })
    .from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=1.5")
    .from('.hero-content p', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=1.2")
    .from('.hero-content a', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, "-=1")
    .from('.hero-cards > div', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    }, "-=1");

    // Scroll Animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card, // Changed to individual trigger for better mobile performance
                start: "top 90%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    });

    // ── Reusable counter animation function ───────────────────────────────
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = !Number.isInteger(target);
        const duration = 2000;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = isDecimal ? target.toFixed(1) : target;
        }
        requestAnimationFrame(step);
    }

    // ── Hero card counters — fire 1.5s after page load ────────────────────
    const heroCounters = document.querySelectorAll('.hero-counter');
    if (heroCounters.length) {
        setTimeout(() => heroCounters.forEach(animateCounter), 1500);
    }

    // ── Impact section counters — fire when scrolled into view ────────────
    const impactCounters = document.querySelectorAll('#impact .counter');
    if (impactCounters.length) {
        ScrollTrigger.create({
            trigger: '#impact',
            start: 'top 80%',
            once: true,
            onEnter: () => {
                impactCounters.forEach(animateCounter);
            }
        });
    }

    // News Cards Animation
    gsap.utils.toArray('article').forEach((article, index) => {
        gsap.from(article, {
            scrollTrigger: {
                trigger: article,
                start: "top 90%",
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    });

});

// Chatbot Mock Toggle
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatbot = document.getElementById('close-chatbot');

if (chatbotBtn) {
    chatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.remove('hidden');
        gsap.fromTo(chatbotWindow, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        chatbotBtn.classList.add('hidden');
    });
}

if (closeChatbot) {
    closeChatbot.addEventListener('click', () => {
        gsap.to(chatbotWindow, { scale: 0.8, opacity: 0, duration: 0.2, onComplete: () => {
            chatbotWindow.classList.add('hidden');
            chatbotBtn.classList.remove('hidden');
        }});
    });
}
