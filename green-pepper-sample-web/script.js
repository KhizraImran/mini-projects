/* ============================================================
   GREEN PEPPER RESTAURANT — script.js
   Kerala Kitchen · Farwaniya, Kuwait
   All GSAP + ScrollTrigger + ScrollToPlugin + UI logic
   ============================================================ */

'use strict';

/* ====================================================
   GSAP PLUGIN REGISTRATION
   ==================================================== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ====================================================
   STATE
   ==================================================== */
let currentLang = 'en';
let menuIsOpen = false;

/* ====================================================
   UTILITY HELPERS
   ==================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ====================================================
   THEME TOGGLE
   ==================================================== */
function initTheme() {
  const html = document.documentElement;
  const btn = $('#theme-toggle');
  const saved = localStorage.getItem('gp-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('gp-theme', next);
    });
  }
}

/* ====================================================
   LANGUAGE TOGGLE
   ==================================================== */
const translations = {
  ar: {
    // Nav
    'nav-restaurant-name': 'مطعم جرين بيبر',
    // General
    'hero-label': 'مطبخ كيرالا الأصيل — الفروانية، الكويت',
    'hero-heading-1': 'مطبوخ زي البيت.',
    'hero-heading-2': 'يُقدَّم باحترام.',
    'hero-sub': 'بريانية وكاپا وكاري لحم كيرالية — محضّرة طازجة كل يوم.',
    'btn-menu': 'القائمة الكاملة',
    'btn-order': 'اطلب الآن',
    'strip-label': 'اتصل للطلب',
    // About
    'about-label': 'مطبخنا',
    'about-heading': 'نكهات كيرالا، هنا في الفروانية',
    'about-p1': 'وُلد جرين بيبر من إيمان بسيط — أن من يعيشون بعيداً عن وطنهم يستحقون طعاماً يشبه طعم البيت فعلاً. كل طبق ينبع من تقاليد مطبخ كيرالا: توابل كاملة، طهي بطيء، وزيت جوز هند حقيقي.',
    'about-p2': 'سواء كان طبق بريانية جيراكاسالا المطبوخة مع اللحم الطري، أو وعاء كاپا بسيط مع الكاري، يقدم جرين بيبر الطعام الذي يجعلك تنسى أنك في الكويت.',
    'about-tag': 'تأسس في الكويت',
    'stat-1-title': 'وصفات كيرالا',
    'stat-1-sub': 'متوارثة، لا مكتوبة',
    'stat-2-title': 'مطبخ عائلي',
    'stat-2-sub': 'يُدار بعناية كل يوم',
    'stat-3-title': 'تحضير يومي طازج',
    'stat-3-sub': 'لا تنازلات. أبداً.',
    // Dishes
    'dishes-label': 'مباشرة من الموقد',
    'dishes-heading': 'من موقدنا',
    // Menu
    'menu-label': 'كل ما نقدمه',
    'menu-heading': 'القائمة الكاملة',
    // Mess
    'mess-label': 'كل جيداً كل يوم',
    'mess-heading': 'اشتراك الوجبات الشهري',
    'mess-intro': 'طعام كيرالا المنزلي يوصل إليك. اختر ما يناسب يومك.',
    'mess-cta': 'استفسر الآن',
    'mess-contact-text': 'للاشتراك أو الاستفسار، اتصل بـ +965 55012924 أو تواصل عبر واتساب.',
    'whatsapp-btn': 'تواصل عبر واتساب',
    // Gallery
    'gallery-label': 'نظرة من الداخل',
    'gallery-heading': 'من داخل المطبخ.',
    // Order
    'order-label': 'توصيل عبر الفروانية',
    'order-heading': 'جائع؟ نوصّل.',
    'order-sub': 'اطلب من جرين بيبر عبر كاتش — توصيل سريع عبر الفروانية.',
    'order-katch': 'اطلب عبر كاتش',
    'order-or': 'أو اتصل مباشرة —',
    // Contact
    'contact-label': 'اعثر علينا',
    'contact-heading': 'تعال وزرنا',
    'address-text': 'شارع 118، قطعة 4، الفروانية، الكويت',
    'wa-btn': 'تواصل عبر واتساب',
    // Footer
    'footer-copy': 'مطعم جرين بيبر — الفروانية، الكويت · مطبخ كيرالا · جميع الحقوق محفوظة.'
  }
};

function applyLanguage(lang) {
  const html = document.documentElement;
  const isAr = lang === 'ar';

  html.setAttribute('lang', isAr ? 'ar' : 'en');
  html.setAttribute('dir', isAr ? 'rtl' : 'ltr');

  // Toggle active state on pill
  const langEn = $('.lang-en');
  const langAr = $('.lang-ar');
  if (langEn && langAr) {
    langEn.classList.toggle('active', !isAr);
    langAr.classList.toggle('active', isAr);
  }

  // Swap all [data-en] / [data-ar] elements
  $$('[data-en]').forEach(el => {
    const enText = el.getAttribute('data-en');
    const arText = el.getAttribute('data-ar');
    if (isAr && arText) {
      el.textContent = arText;
    } else if (!isAr && enText) {
      el.textContent = enText;
    }
  });

  // Swap [data-en] for buttons (preserve inner HTML structure for btn-whatsapp)
  $$('[data-en].btn-whatsapp').forEach(el => {
    const span = el.querySelector('span');
    if (span) {
      span.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    }
  });

  currentLang = lang;
  localStorage.setItem('gp-lang', lang);
}

function initLanguage() {
  const btn = $('#lang-toggle');
  const savedLang = localStorage.getItem('gp-lang') || 'en';
  if (savedLang === 'ar') applyLanguage('ar');

  if (btn) {
    btn.addEventListener('click', () => {
      const next = currentLang === 'en' ? 'ar' : 'en';
      applyLanguage(next);
    });
  }
}

/* ====================================================
   NAVBAR — SCROLL EFFECT
   ==================================================== */
function initNavbarScroll() {
  const navbar = $('#navbar');
  if (!navbar) return;

  ScrollTrigger.create({
    start: 'top -60px',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });
}

/* ====================================================
   MOBILE MENU
   ==================================================== */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const overlay = $('#mobile-overlay');
  const links = $$('.mobile-nav-link');

  if (!hamburger || !mobileMenu || !overlay) return;

  function openMenu() {
    menuIsOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';

    // GSAP stagger links
    gsap.fromTo(links,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.45,
        ease: 'power3.out',
        delay: 0.15
      }
    );
  }

  function closeMenu() {
    menuIsOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';

    // Reset links
    gsap.set(links, { x: 0, opacity: 1 });
  }

  hamburger.addEventListener('click', () => {
    menuIsOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      closeMenu();
      setTimeout(() => {
        if (href && href.startsWith('#')) {
          const target = $(href);
          if (target) {
            gsap.to(window, {
              duration: 1.0,
              scrollTo: { y: target, offsetY: 72 },
              ease: 'power3.out'
            });
          }
        }
      }, 350);
    });
  });

  // Keyboard close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuIsOpen) closeMenu();
  });
}

/* ====================================================
   SMOOTH ANCHOR SCROLL (desktop nav)
   ==================================================== */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    if (link.classList.contains('mobile-nav-link')) return; // handled separately

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = $(href);
      if (!target) return;

      e.preventDefault();
      gsap.to(window, {
        duration: 1.0,
        scrollTo: { y: target, offsetY: 72 },
        ease: 'power3.out'
      });
    });
  });
}

/* ====================================================
   PAGE LOAD ANIMATION SEQUENCE
   ==================================================== */
function initPageLoad() {
  // Pepper SVG path draw-in
  const pepperPaths = $$('.pepper-icon path');
  const logoGreen = $('.logo-green');
  const logoPepper = $('.logo-pepper');
  const navLinks = $$('.nav-link');

  // Set initial states
  pepperPaths.forEach(path => {
    const length = path.getTotalLength ? path.getTotalLength() : 60;
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
  });

  gsap.set([logoGreen, logoPepper], { opacity: 0 });
  gsap.set(logoGreen, { x: -18 });
  gsap.set(logoPepper, { x: 18 });
  gsap.set(navLinks, { y: -16, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Draw pepper paths
  tl.to(pepperPaths, {
    strokeDashoffset: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power2.inOut'
  })

  // Logo words converge
  .to(logoGreen, {
    x: 0,
    opacity: 1,
    duration: 0.6,
  }, '-=0.3')
  .to(logoPepper, {
    x: 0,
    opacity: 1,
    duration: 0.6,
  }, '<0.05')

  // Nav links stagger
  .to(navLinks, {
    y: 0,
    opacity: 1,
    stagger: 0.065,
    duration: 0.5,
  }, '-=0.2')

  // Hero content
  .add(initHeroAnimation(), '-=0.1');
}

/* ====================================================
   HERO ANIMATIONS
   ==================================================== */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const words = $$('.hero-word');
  const sub = $('.hero-sub');
  const ctas = $$('.hero-ctas .btn');
  const strip = $('.hero-bottom-strip');
  const label = $('.hero-label-row');

  // Label fade up
  tl.fromTo(label,
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55 },
    0
  );

  // Word-by-word clip-path wipe
  tl.to(words, {
    clipPath: 'inset(0 0% 0 0)',
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out'
  }, 0.15);

  // Subheading drift up
  tl.fromTo(sub,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7 },
    0.6
  );

  // CTAs spring in
  tl.fromTo(ctas,
    { scale: 0.85, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      duration: 0.55,
      ease: 'back.out(1.4)'
    },
    0.75
  );

  // Strip
  tl.fromTo(strip,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55 },
    0.85
  );

  return tl;
}

/* ====================================================
   BANANA LEAF PARALLAX
   ==================================================== */
function initBananaLeafParallax() {
  const leaf = $('#banana-leaf-parallax');
  if (!leaf) return;

  gsap.to(leaf, {
    y: '-28%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });
}

/* ====================================================
   SECTION HEADINGS — SCROLL TRIGGER
   ==================================================== */
function initSectionHeadings() {
  $$('.section-heading').forEach(heading => {
    gsap.fromTo(heading,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  $$('.section-label').forEach(label => {
    gsap.fromTo(label,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* ====================================================
   ABOUT SECTION
   ==================================================== */
function initAboutSection() {
  const imgFrame = $('.about-img-frame');
  const textCol = $('.about-text-col');
  const paras = $$('.about-para');
  const stats = $$('.about-stat');

  if (imgFrame) {
    gsap.fromTo(imgFrame,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imgFrame,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  paras.forEach((para, i) => {
    gsap.fromTo(para,
      { y: 25, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: para,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  if (stats.length) {
    gsap.fromTo(stats,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}

/* ====================================================
   DISH CARDS — ODD LEFT, EVEN RIGHT
   ==================================================== */
function initDishCards() {
  $$('.dish-card').forEach((card, i) => {
    const isEven = i % 2 === 1;
    gsap.fromTo(card,
      {
        x: isEven ? 60 : -60,
        opacity: 0,
        rotation: isEven ? 1.5 : -1.5
      },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* ====================================================
   MENU TABS
   ==================================================== */
function initMenuTabs() {
  const tabs = $$('.menu-tab');
  const panels = $$('.menu-panel');
  const indicator = $('#tab-indicator');

  function moveIndicator(tab) {
    if (!indicator) return;
    const tabRect = tab.getBoundingClientRect();
    const parentRect = tab.parentElement.getBoundingClientRect();
    gsap.to(indicator, {
      left: tabRect.left - parentRect.left,
      width: tabRect.width,
      duration: 0.35,
      ease: 'power3.out'
    });
  }

  function activateTab(targetTab) {
    const targetId = targetTab.getAttribute('data-tab');

    tabs.forEach(t => {
      t.classList.toggle('active', t === targetTab);
      t.setAttribute('aria-selected', t === targetTab ? 'true' : 'false');
    });

    const outgoing = panels.find(p => p.classList.contains('active'));
    const incoming = $(`#tab-${targetId}`);

    if (!incoming || outgoing === incoming) return;

    // Fade out current
    if (outgoing) {
      gsap.to(outgoing, {
        opacity: 0,
        y: -15,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          outgoing.classList.remove('active');
          incoming.classList.add('active');
          gsap.fromTo(incoming,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
          );
        }
      });
    } else {
      incoming.classList.add('active');
    }

    moveIndicator(targetTab);
  }

  // Initialize indicator position
  const activeTab = tabs.find(t => t.classList.contains('active'));
  if (activeTab) {
    // Wait a frame for layout
    requestAnimationFrame(() => moveIndicator(activeTab));
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // Animate menu items on scroll
  gsap.fromTo('.menu-item',
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.04,
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.menu-full',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ====================================================
   MESS SECTION — COUNTER ANIMATION
   ==================================================== */
function initMessSection() {
  const cards = $$('.mess-card');

  gsap.fromTo(cards,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.mess-cards',
        start: 'top 85%',
        toggleActions: 'play none none none',
        onEnter: () => {
          // Count-up for KD amounts
          countUp('#mess-num-1', 0, 15, 1.2);
          countUp('#mess-num-2', 0, 30, 1.4);
          countUp('#mess-num-3', 0, 25, 1.3);
        }
      }
    }
  );
}

function countUp(selector, from, to, duration) {
  const el = $(selector);
  if (!el) return;
  const obj = { val: from };
  gsap.to(obj, {
    val: to,
    duration: duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(obj.val);
    }
  });
}

/* ====================================================
   GALLERY TILES
   ==================================================== */
function initGallery() {
  $$('.gallery-tile').forEach((tile, i) => {
    gsap.fromTo(tile,
      { scale: 0.85, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.75,
        delay: i * 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tile,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/* ====================================================
   ORDER SECTION
   ==================================================== */
function initOrderSection() {
  const content = $('.order-content');
  if (!content) return;

  gsap.fromTo(content,
    { y: 45, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: content,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ====================================================
   CONTACT SECTION
   ==================================================== */
function initContactSection() {
  const info = $('.contact-info');
  const map = $('.contact-map');

  if (info) {
    gsap.fromTo(info,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: info,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  if (map) {
    gsap.fromTo(map,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: map,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}

/* ====================================================
   FOOTER
   ==================================================== */
function initFooter() {
  const footer = $('footer');
  if (!footer) return;

  gsap.fromTo(footer,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 95%',
        toggleActions: 'play none none none'
      }
    }
  );
}

/* ====================================================
   NAVBAR ACTIVE LINK HIGHLIGHTING
   ==================================================== */
function initActiveNavLinks() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: () => {
      const scrollY = window.scrollY + 120;

      let current = '';
      sections.forEach(section => {
        if (section.offsetTop <= scrollY) {
          current = section.id;
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          link.style.color = 'var(--text)';
        } else {
          link.style.color = '';
        }
      });
    }
  });
}

/* ====================================================
   RESIZE HANDLER — REFRESH SCROLL TRIGGERS
   ==================================================== */
function initResizeHandler() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();

      // Recalculate tab indicator
      const activeTab = $('.menu-tab.active');
      const indicator = $('#tab-indicator');
      if (activeTab && indicator) {
        const tabRect = activeTab.getBoundingClientRect();
        const parentRect = activeTab.parentElement.getBoundingClientRect();
        gsap.set(indicator, {
          left: tabRect.left - parentRect.left,
          width: tabRect.width
        });
      }
    }, 200);
  });
}

/* ====================================================
   MENU-FULL SECTION SCROLL ANIMATION
   ==================================================== */
function initMenuSection() {
  const header = $('.menu-header');
  if (header) {
    gsap.fromTo(header,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}

/* ====================================================
   INIT ALL
   ==================================================== */
function init() {
  // Core UI
  initTheme();
  initLanguage();

  // Wait for DOM ready
  document.addEventListener('DOMContentLoaded', () => {});

  // Page load sequence
  window.addEventListener('load', () => {
    initPageLoad();
    initBananaLeafParallax();
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();

    // Scroll-triggered animations
    initSectionHeadings();
    initAboutSection();
    initDishCards();
    initMenuTabs();
    initMenuSection();
    initMessSection();
    initGallery();
    initOrderSection();
    initContactSection();
    initFooter();
    initActiveNavLinks();
    initResizeHandler();

    // Refresh once after everything loads
    setTimeout(() => ScrollTrigger.refresh(), 400);
  });
}

// Run
init();

/* ====================================================
   ADDITIONAL MICRO-INTERACTIONS
   ==================================================== */

// Mess card hover pulse on featured
document.addEventListener('DOMContentLoaded', () => {
  const featured = $('.mess-card-featured');
  if (featured) {
    featured.addEventListener('mouseenter', () => {
      gsap.to(featured, {
        boxShadow: '0 0 0 2px var(--accent), 0 16px 48px rgba(61,138,82,0.22)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    featured.addEventListener('mouseleave', () => {
      gsap.to(featured, {
        boxShadow: '0 0 0 1px var(--accent), 0 8px 32px rgba(61,138,82,0.12)',
        duration: 0.35,
        ease: 'power2.out'
      });
    });
  }

  // Nav logo hover
  const logoEl = $('#nav-logo');
  if (logoEl) {
    logoEl.addEventListener('mouseenter', () => {
      gsap.to('.pepper-icon', { rotate: -8, duration: 0.35, ease: 'power2.out' });
    });
    logoEl.addEventListener('mouseleave', () => {
      gsap.to('.pepper-icon', { rotate: 0, duration: 0.45, ease: 'elastic.out(1, 0.6)' });
    });
  }

  // Dish card image subtle brightness on hover
  $$('.dish-card').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    card.addEventListener('mouseenter', () => {
      gsap.to(img, { filter: 'brightness(1.08)', duration: 0.35 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(img, { filter: 'brightness(1)', duration: 0.35 });
    });
  });
});
