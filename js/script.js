// Initialize Lucide Icons
lucide.createIcons();

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

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
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
                trigger: '#services',
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '#about',
            start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '#about',
            start: "top 75%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
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

    // ── Hero card counters — fire 1.2s after page load ────────────────────
    const heroCounters = document.querySelectorAll('.hero-cards .counter');
    if (heroCounters.length) {
        setTimeout(() => heroCounters.forEach(animateCounter), 1200);
    }

    // ── Impact section counters — fire when scrolled into view ────────────
    const impactCounters = document.querySelectorAll('#impact .counter');
    let impactCounted = false;
    ScrollTrigger.create({
        trigger: '#impact',
        start: 'top 80%',
        once: true,
        onEnter: () => {
            if (!impactCounted) {
                impactCounted = true;
                impactCounters.forEach(animateCounter);
            }
        }
    });

    // News Cards Animation
    gsap.utils.toArray('article').forEach((article, index) => {
        gsap.from(article, {
            scrollTrigger: {
                trigger: '#news',
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });

});

// Chatbot Mock Toggle
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatbot = document.getElementById('close-chatbot');

chatbotBtn.addEventListener('click', () => {
    chatbotWindow.classList.remove('hidden');
    gsap.fromTo(chatbotWindow, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
    chatbotBtn.classList.add('hidden');
});

closeChatbot.addEventListener('click', () => {
    gsap.to(chatbotWindow, { scale: 0.8, opacity: 0, duration: 0.2, onComplete: () => {
        chatbotWindow.classList.add('hidden');
        chatbotBtn.classList.remove('hidden');
    }});
});
