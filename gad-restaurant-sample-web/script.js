/* ============================================================
   GAD RESTAURANT — script.js
   All JavaScript, GSAP, and ScrollTrigger logic
   ============================================================ */

"use strict";

/* ── Register GSAP Plugins ── */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ============================================================
   GLOBALS & STATE
============================================================ */
let isAR = false;
let isDark = true;

/* ============================================================
   DOM REFS
============================================================ */
const html          = document.documentElement;
const navbar        = document.getElementById('navbar');
const themeToggle   = document.getElementById('themeToggle');
const langToggle    = document.getElementById('langToggle');
const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobileMenu');
const mobileClose   = document.getElementById('mobileClose');
const mobileOverlay = document.getElementById('mobileOverlay');
const logoWordmark  = document.getElementById('logoWordmark');

/* ============================================================
   THEME TOGGLE
============================================================ */
function setTheme(dark) {
  isDark = dark;
  if (dark) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
  }
}

themeToggle.addEventListener('click', () => {
  setTheme(!isDark);
});

/* ============================================================
   LANGUAGE TOGGLE
============================================================ */
function applyLanguage(ar) {
  isAR = ar;

  if (ar) {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    html.setAttribute('data-lang', 'ar');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    html.setAttribute('data-lang', 'en');
  }

  // Swap text content for all translatable elements
  const translatables = document.querySelectorAll('[data-en][data-ar]');
  translatables.forEach(el => {
    const text = ar ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (text !== null) {
      el.textContent = text;
    }
  });

  // Hero heading words need special handling
  updateHeroHeading(ar);

  // Stat suffixes
  updateStatSuffixes(ar);

  // Gallery labels
  updateGalleryLabels(ar);
}

function updateHeroHeading(ar) {
  const wordEls  = document.querySelectorAll('.hero-heading .word');
  const enWords  = ['The', 'Taste', 'Egypt', 'Never', 'Forgot'];
  const arWords  = ['الطعم', 'الذي', 'لم', 'تنساه', 'مصر'];

  wordEls.forEach((el, i) => {
    el.textContent = ar ? (arWords[i] || '') : (enWords[i] || '');
  });
}

function updateStatSuffixes(ar) {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target  = parseInt(el.getAttribute('data-target'), 10);
    const suffix  = ar
      ? el.getAttribute('data-ar-suffix')
      : el.getAttribute('data-en-suffix');
    // Keep the counted number, update suffix display
    el.setAttribute('data-suffix', suffix);
    // If animation has already run, show updated text
    if (el.dataset.counted === 'true') {
      el.textContent = (target >= 2700 ? '2,700' : target) + suffix;
    }
  });
}

function updateGalleryLabels(ar) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    const label = item.querySelector('.gallery-label');
    if (!label) return;
    const text = ar
      ? item.getAttribute('data-name-ar')
      : item.getAttribute('data-name');
    if (text && label) label.textContent = text;
  });
}

langToggle.addEventListener('click', () => {
  applyLanguage(!isAR);
});

/* ============================================================
   NAVBAR SCROLL BEHAVIOUR
============================================================ */
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ============================================================
   MOBILE MENU
============================================================ */
function openMobileMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ============================================================
   SMOOTH SCROLL (GSAP ScrollToPlugin)
============================================================ */
document.querySelectorAll('[data-scroll]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          duration: 1.1,
          scrollTo: { y: target, offsetY: 72 },
          ease: 'power3.inOut'
        });
      }
    }
  });
});

/* ============================================================
   PAGE LOAD ANIMATIONS
============================================================ */
function initPageLoad() {
  // Set initial state — nav links visible base
  gsap.set('.hero-label', { opacity: 0 });
  gsap.set('.hero-sub',   { opacity: 0, y: 30 });
  gsap.set('.hero-ctas',  { opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // 1. Logo wordmark stamp in
  tl.to(logoWordmark, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.85,
    ease: 'power4.out'
  }, 0);

  // 2. Logo divider draws out
  tl.fromTo('.logo-divider', {
    scaleX: 0,
  }, {
    scaleX: 1,
    duration: 0.5,
    ease: 'power3.out'
  }, 0.4);

  // 3. Nav links stagger fade-up
  tl.to('.nav-link', {
    opacity: 1,
    y: 0,
    duration: 0.55,
    stagger: 0.08,
    ease: 'power3.out'
  }, 0.35);

  // 4. Hero label
  tl.to('.hero-label', {
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out'
  }, 0.5);

  // 5. Hero heading — word by word wipe
  tl.to('.hero-heading .word', {
    clipPath: 'inset(0 0% 0 0)',
    duration: 0.6,
    stagger: 0.12,
    ease: 'power3.out'
  }, 0.65);

  // 6. Decorative rule draws from center
  tl.fromTo('.hero-rule', {
    width: 0,
    opacity: 0
  }, {
    width: 80,
    opacity: 1,
    duration: 0.55,
    ease: 'power3.out'
  }, 1.1);

  // 7. Hero subtext
  tl.to('.hero-sub', {
    opacity: 1,
    y: 0,
    duration: 0.65,
    ease: 'power3.out'
  }, 1.25);

  // 8. CTA buttons scale in staggered
  tl.fromTo('.hero-ctas .btn', {
    scale: 0.85,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  }, 1.45);

  tl.to('.hero-ctas', { opacity: 1, duration: 0 }, 1.45);
}

/* ============================================================
   SCROLLTRIGGER ANIMATIONS
============================================================ */
function initScrollAnimations() {

  /* ── Section headings ── */
  gsap.utils.toArray('.section-heading').forEach(heading => {
    // Skip hero heading
    if (heading.closest('.hero-content')) return;

    gsap.fromTo(heading, {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ── Section labels ── */
  gsap.utils.toArray('.section-label').forEach(label => {
    if (label.closest('.hero-content') || label.closest('.order-section')) return;
    gsap.fromTo(label, {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: label,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ── Legacy section: image scale + text fade ── */
  const legacyImg  = document.getElementById('legacyImg');
  const legacyText = document.getElementById('legacyText');

  if (legacyImg && legacyText) {
    const legacyTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.legacy-grid',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    legacyTl.fromTo(legacyImg.querySelector('img'), {
      scale: 0.9,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out'
    }, 0);

    legacyTl.fromTo(legacyText, {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.15);
  }

  /* ── Dish cards: alternate left/right ── */
  gsap.utils.toArray('.dish-card').forEach((card, i) => {
    const fromX = i % 2 === 0 ? -60 : 60;
    gsap.fromTo(card, {
      x: fromX,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ── Why GAD blocks ── */
  gsap.utils.toArray('.why-block').forEach((block, i) => {
    gsap.fromTo(block, {
      y: 36,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.65,
      delay: i * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ── Gallery images pop in ── */
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item.querySelector('img'), {
      scale: 0.88,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.65,
      delay: i * 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ── Order section ── */
  gsap.fromTo('.order-inner', {
    y: 40,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.order-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  /* ── Contact grid ── */
  gsap.utils.toArray('.contact-grid > *').forEach((el, i) => {
    gsap.fromTo(el, {
      y: 36,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-grid',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
  });

  /* ── Stats Counter ── */
  initStatsCounter();
}

/* ============================================================
   STATS COUNTER
============================================================ */
function initStatsCounter() {
  const statsRow = document.getElementById('statsRow');
  if (!statsRow) return;

  let animated = false;

  ScrollTrigger.create({
    trigger: statsRow,
    start: 'top 85%',
    onEnter: () => {
      if (animated) return;
      animated = true;

      document.querySelectorAll('.stat-number').forEach(el => {
        const target    = parseInt(el.getAttribute('data-target'), 10);
        const suffix    = el.getAttribute('data-suffix') || '';
        const duration  = 1.6;
        const startTime = performance.now();

        function easeOutQuad(t) {
          return t * (2 - t);
        }

        function tick(now) {
          const elapsed  = (now - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = easeOutQuad(progress);
          const value    = Math.round(eased * target);

          if (target >= 2700) {
            el.textContent = value.toLocaleString() + suffix;
          } else {
            el.textContent = value + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            if (target >= 2700) {
              el.textContent = '2,700' + suffix;
            } else {
              el.textContent = target + suffix;
            }
            el.dataset.counted = 'true';
          }
        }

        requestAnimationFrame(tick);
      });
    }
  });
}

/* ============================================================
   MENU TABS (GSAP transitions)
============================================================ */
function initMenuTabs() {
  const tabs   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = 'panel-' + tab.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);

      // Find currently active panel
      const activePanel = document.querySelector('.menu-panel.active');

      if (!targetPanel || targetPanel === activePanel) return;

      // Update tab states
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // GSAP crossfade
      if (activePanel) {
        gsap.to(activePanel, {
          opacity: 0,
          y: 10,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            activePanel.classList.remove('active');
            activePanel.style.display = 'none';
            activePanel.style.opacity = '';
            activePanel.style.transform = '';

            // Show new panel
            targetPanel.classList.add('active');
            targetPanel.style.display = 'block';
            gsap.fromTo(targetPanel, {
              opacity: 0,
              y: -10
            }, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: 'power3.out'
            });
          }
        });
      } else {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
        gsap.fromTo(targetPanel, {
          opacity: 0,
          y: -10
        }, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power3.out'
        });
      }
    });
  });
}

/* ============================================================
   HERO PARALLAX (subtle)
============================================================ */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroH   = document.querySelector('.hero').offsetHeight;
    if (scrollY > heroH) return;
    const ratio = scrollY / heroH;
    heroBg.style.transform = `scale(1.04) translateY(${ratio * 30}px)`;
  }, { passive: true });
}

/* ============================================================
   INIT — data-lang attribute on html
============================================================ */
html.setAttribute('data-lang', 'en');

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   WAIT FOR DOM + FONTS
============================================================ */
function init() {
  initPageLoad();
  initScrollAnimations();
  initMenuTabs();
  initHeroParallax();
  initActiveNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

