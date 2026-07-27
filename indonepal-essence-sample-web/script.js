/* ============================================================
   INDONEPAL ESSENCE — script.js
   Pure vanilla JS + GSAP + ScrollTrigger
   ============================================================ */

'use strict';

/* ---- GSAP PLUGIN REGISTRATION ---- */
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   STATE
   ============================================================ */
let isDark = true;
let isAR = false;

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const html        = document.documentElement;
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const langToggle  = document.getElementById('langToggle');

/* ============================================================
   THEME TOGGLE
   ============================================================ */
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.setAttribute('aria-checked', String(!isDark));
  ScrollTrigger.refresh();
});

/* ============================================================
   LANGUAGE TOGGLE — EN / AR
   ============================================================ */
// All translations are baked into HTML via data-en / data-ar attributes

const HERO_EN = ['A', 'Taste', 'of', 'Home'];
const HERO_AR = ['طعم', 'البيت', 'الأصيل', ''];

function applyLanguage() {
  const attr = isAR ? 'ar' : 'en';

  // Set document direction
  html.setAttribute('dir', isAR ? 'rtl' : 'ltr');
  html.setAttribute('lang', isAR ? 'ar' : 'en');

  // Swap all elements that have both data-en and data-ar
  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    const val = el.getAttribute('data-' + attr);
    if (val !== null && val !== '') {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    }
  });

  // Update hero heading
  const heroWords = isAR ? HERO_AR : HERO_EN;
  document.querySelectorAll('#heroHeading .word').forEach((el, i) => {
    el.textContent = heroWords[i] || '';
  });

  // Re-split logo chars when language changes (rebuild spans)
  rebuildLogoChars();

  // Lang toggle aria state
  langToggle.setAttribute('aria-checked', String(isAR));
  langToggle.setAttribute('aria-label', isAR ? 'Switch to English' : 'Switch to Arabic');

  ScrollTrigger.refresh();
}

langToggle.addEventListener('click', () => {
  isAR = !isAR;
  applyLanguage();
});

/* ============================================================
   NAVBAR — SCROLL BEHAVIOR
   ============================================================ */
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = scrollY;
}, { passive: true });

/* ============================================================
   HAMBURGER — MOBILE MENU
   ============================================================ */
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ============================================================
   SMOOTH SCROLL — ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = navbar.offsetHeight;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   ACTIVE NAV LINK on SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   MENU TABS — GSAP TRANSITION
   ============================================================ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const menuPanels = document.querySelectorAll('.menu-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);

    // Deactivate all
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    menuPanels.forEach(p => {
      if (!p.hidden) {
        gsap.to(p, {
          opacity: 0,
          y: -8,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            p.hidden = true;
            p.removeAttribute('style');
          }
        });
      }
    });

    // Activate clicked
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    setTimeout(() => {
      targetPanel.hidden = false;
      gsap.fromTo(targetPanel,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }
      );
    }, 210);
  });
});

/* ============================================================
   LOGO CHAR SPLIT HELPER
   ============================================================ */
function splitLogoIntoChars(logoEl) {
  const spans = logoEl.querySelectorAll('.logo-indo, .logo-nepal, .logo-essence');
  spans.forEach(span => {
    // Clear existing char spans to avoid double-splitting
    const rawText = Array.from(span.childNodes)
      .map(n => n.textContent)
      .join('');
    span.innerHTML = '';
    rawText.split('').forEach(ch => {
      const c = document.createElement('span');
      c.className = 'logo-word-char';
      c.textContent = ch;
      span.appendChild(c);
    });
  });
  return logoEl.querySelectorAll('.logo-word-char');
}

function rebuildLogoChars() {
  const logoEls = document.querySelectorAll('.nav-logo, .footer-logo a');
  logoEls.forEach(logoEl => {
    const spans = logoEl.querySelectorAll('.logo-indo, .logo-nepal, .logo-essence');
    spans.forEach(span => {
      // Reconstruct text, removing char spans
      const text = span.textContent;
      span.textContent = text;
    });
  });
}

/* ============================================================
   GSAP PAGE LOAD ANIMATIONS
   ============================================================ */
function initPageLoadAnimations() {
  const logoEl = document.querySelector('.nav-logo');
  if (logoEl) {
    const chars = splitLogoIntoChars(logoEl);

    gsap.from(chars, {
      opacity: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  // Nav links animate in from above
  gsap.from('.nav-link', {
    opacity: 0,
    y: -14,
    duration: 0.5,
    stagger: 0.07,
    ease: 'power3.out',
    delay: 0.9
  });

  // Nav controls
  gsap.from('.nav-controls', {
    opacity: 0,
    x: 20,
    duration: 0.55,
    ease: 'power3.out',
    delay: 1.1
  });
}

/* ============================================================
   HERO ANIMATIONS
   ============================================================ */
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.5 });

  // Deco line
  tl.from('.hero-deco-line', {
    scaleX: 0,
    transformOrigin: 'center',
    duration: 0.6,
    ease: 'power3.out'
  });

  // Location label
  tl.from('.hero-location', {
    opacity: 0,
    y: 12,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3');

  // Heading words — clip-path wipe
  const words = document.querySelectorAll('.hero-heading .word');
  words.forEach((word, i) => {
    tl.to(word, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.65,
      ease: 'power3.out'
    }, i === 0 ? '+=0' : '-=0.38');
  });

  // Decorative rule draws itself
  tl.to('.hero-rule', {
    width: 80,
    duration: 0.65,
    ease: 'power3.out'
  }, '-=0.2');

  // Subheading
  tl.from('.hero-sub', {
    opacity: 0,
    y: 12,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.3');

  // CTA buttons
  tl.from('.hero-ctas .btn', {
    opacity: 0,
    y: 16,
    duration: 0.5,
    stagger: 0.12,
    ease: 'power3.out'
  }, '-=0.2');

  // Hours bar
  tl.from('.hero-hours', {
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out'
  }, '-=0.1');

  // Subtle hero parallax
  gsap.to('.hero-bg', {
    yPercent: 25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    }
  });
}

/* ============================================================
   SCROLL TRIGGER ANIMATIONS
   ============================================================ */
function initScrollAnimations() {

  // ---- ABOUT SECTION ----
  gsap.from('.about-image-wrap', {
    opacity: 0,
    scale: 0.92,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-image-wrap',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.about-text .section-eyebrow', {
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.about-text .section-heading', {
    opacity: 0,
    y: 30,
    duration: 0.75,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-text .section-heading',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.about-text p', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.about-stats', {
    opacity: 0,
    y: 20,
    duration: 0.65,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-stats',
      start: 'top 88%',
      toggleActions: 'play none none none'
    }
  });

  // ---- STAT COUNTERS ----
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = target === 30 ? '+' : '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          }
        });
      }
    });
  });

  // ---- DISHES SECTION HEADING ----
  gsap.from('.dishes .section-header', {
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.dishes .section-header',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  // ---- DISH CARDS — alternating left/right ----
  document.querySelectorAll('.dish-card').forEach((card, i) => {
    const dir = card.getAttribute('data-direction');
    gsap.from(card, {
      opacity: 0,
      x: dir === 'left' ? -50 : 50,
      rotation: dir === 'left' ? -2 : 2,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 84%',
        toggleActions: 'play none none none'
      }
    });
  });

  // ---- FULL MENU SECTION ----
  gsap.from('.full-menu .section-header', {
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.full-menu .section-header',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.menu-tabs', {
    opacity: 0,
    y: 18,
    duration: 0.55,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.menu-tabs',
      start: 'top 86%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.menu-panels', {
    opacity: 0,
    y: 22,
    duration: 0.65,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.menu-panels',
      start: 'top 88%',
      toggleActions: 'play none none none'
    }
  });

  // ---- WHY SECTION ----
  gsap.from('.why .section-header', {
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.why .section-header',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.why-block', {
    opacity: 0,
    y: 36,
    rotation: 1,
    duration: 0.7,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.why-grid',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  // ---- GALLERY ----
  gsap.from('.gallery .section-header', {
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.gallery .section-header',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.gallery-item', {
    opacity: 0,
    scale: 0.85,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  // ---- ORDER SECTION ----
  gsap.from('.order-content > *', {
    opacity: 0,
    y: 24,
    duration: 0.65,
    stagger: 0.14,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.order-section',
      start: 'top 78%',
      toggleActions: 'play none none none'
    }
  });

  // ---- CONTACT SECTION ----
  gsap.from('.contact .section-header', {
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact .section-header',
      start: 'top 82%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.contact-info', {
    opacity: 0,
    x: -40,
    duration: 0.75,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  gsap.from('.contact-map', {
    opacity: 0,
    x: 40,
    scale: 0.96,
    duration: 0.75,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // ---- FOOTER ----
  gsap.from('footer', {
    opacity: 0,
    y: 20,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 92%',
      toggleActions: 'play none none none'
    }
  });
}

/* ============================================================
   SECTIONS WITH GENERIC HEADING WIPE ANIMATION
   ============================================================ */
function initHeadingWipes() {
  // Generic wipe-up for section headings not handled above
  gsap.utils.toArray('.section-heading').forEach(el => {
    // Check if already registered with scrollTrigger
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ============================================================
   KEYBOARD ACCESSIBILITY — ESC closes mobile menu
   ============================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ============================================================
   INIT on DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Set initial aria states
  themeToggle.setAttribute('aria-checked', 'false'); // dark = default
  langToggle.setAttribute('aria-checked', 'false');

  // Run animations
  initPageLoadAnimations();
  initHeroAnimations();
  initScrollAnimations();

  // Refresh ScrollTrigger after images might load
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});

/* ============================================================
   HANDLE RESIZE
   ============================================================ */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});
