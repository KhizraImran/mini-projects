/* ================================================================
   YAADGAR RESTAURANT — PREMIUM JAVASCRIPT
   Luxury Pakistani Restaurant | Farwaniya, Kuwait
   GSAP + Vanilla JS | No Frameworks
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. GSAP SETUP & PLUGIN REGISTRATION
---------------------------------------------------------------- */
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ----------------------------------------------------------------
   2. STATE & CONSTANTS
---------------------------------------------------------------- */
const State = {
  lang: localStorage.getItem('yg_lang') || 'en',
  theme: localStorage.getItem('yg_theme') || 'dark',
  mobileMenuOpen: false,
  currentSlide: 0,
  totalSlides: 4,
  sliderInterval: null,
  activeMenuTab: 'rice',
};

/* ----------------------------------------------------------------
   3. PRELOADER
---------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Apply stored theme/lang immediately
  document.documentElement.setAttribute('data-theme', State.theme);
  document.documentElement.setAttribute('data-lang', State.lang);
  document.documentElement.setAttribute('dir', State.lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', State.lang);

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          preloader.style.display = 'none';
          initHeroAnimations();
        }
      });
    }
  });

  tl.to('.preloader-fill', {
    width: '100%',
    duration: 2,
    ease: 'power2.inOut',
    delay: 0.3
  });
}

/* ----------------------------------------------------------------
   4. THEME MANAGEMENT
---------------------------------------------------------------- */
function initTheme() {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  // Apply current theme
  html.setAttribute('data-theme', State.theme);

  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    State.theme = State.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('yg_theme', State.theme);

    // Animate transition
    gsap.to('body', {
      opacity: 0.95,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        html.setAttribute('data-theme', State.theme);
      }
    });
  });
}

/* ----------------------------------------------------------------
   5. LANGUAGE MANAGEMENT
---------------------------------------------------------------- */
const translations = {
  en: {
    /* Navigation */
    'nav-story': 'Our Story',
    'nav-menu': 'Menu',
    'nav-gallery': 'Gallery',
    'nav-reviews': 'Reviews',
    'nav-contact': 'Contact',
    'nav-reserve': 'Reserve',
    'lang-toggle': 'عربي',
    /* Hero */
    'hero-location': 'Farwaniya, Kuwait',
    'hero-name': 'Yaadgar',
    'hero-sub': 'Restaurant',
    'hero-desc': 'Where Every Bite Becomes an Unforgettable Memory of Authentic Pakistani Heritage',
    'btn-reserve': 'Reserve a Table',
    'btn-explore': 'Explore Menu',
    /* Stats */
    'stat-heritage': 'Years of Heritage',
    'stat-dishes': 'Authentic Dishes',
    'stat-halal': 'Halal Certified',
  },
  ar: {
    /* Navigation */
    'nav-story': 'قصتنا',
    'nav-menu': 'القائمة',
    'nav-gallery': 'المعرض',
    'nav-reviews': 'التقييمات',
    'nav-contact': 'تواصل',
    'nav-reserve': 'احجز',
    'lang-toggle': 'EN',
    /* Hero */
    'hero-location': 'الفروانية، الكويت',
    'hero-name': 'يادگار',
    'hero-sub': 'مطعم',
    'hero-desc': 'حيث تتحول كل لقمة إلى ذكرى لا تُنسى من التراث الباكستاني الأصيل',
    'btn-reserve': 'احجز طاولة',
    'btn-explore': 'استكشف القائمة',
    /* Stats */
    'stat-heritage': 'سنوات من التراث',
    'stat-dishes': 'أطباق أصيلة',
    'stat-halal': 'حلال معتمد',
  }
};

function applyLanguage(lang) {
  const html = document.documentElement;
  const isAr = lang === 'ar';

  // Update HTML attributes
  html.setAttribute('data-lang', lang);
  html.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  html.setAttribute('lang', lang);

  // Update all data-en / data-ar elements
  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    const text = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    if (text) el.textContent = text;
  });

  // Update lang toggle button text
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    const span = langToggle.querySelector('span');
    if (span) span.textContent = isAr ? 'EN' : 'عربي';
  }

  // Animate language switch
  gsap.from('body', {
    opacity: 0.85,
    duration: 0.4,
    ease: 'power2.out'
  });

  // Update font family for body
  if (isAr) {
    document.body.style.fontFamily = "'Cairo', 'Tajawal', Arial, sans-serif";
  } else {
    document.body.style.fontFamily = "'Manrope', -apple-system, sans-serif";
  }

  // Save preference
  State.lang = lang;
  localStorage.setItem('yg_lang', lang);
}

function initLanguage() {
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;

  // Apply stored language on load
  applyLanguage(State.lang);

  langToggle.addEventListener('click', () => {
    const newLang = State.lang === 'en' ? 'ar' : 'en';
    applyLanguage(newLang);
  });
}

/* ----------------------------------------------------------------
   6. FLOATING NAVIGATION
---------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!navbar) return;

  // Scroll behavior
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNav() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide nav on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      gsap.to('#main-header', {
        yPercent: -120,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    } else {
      gsap.to('#main-header', {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      State.mobileMenuOpen = !State.mobileMenuOpen;
      hamburger.classList.toggle('active', State.mobileMenuOpen);
      mobileMenu.classList.toggle('open', State.mobileMenuOpen);
      document.body.style.overflow = State.mobileMenuOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        State.mobileMenuOpen = false;
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click
    mobileMenu.querySelector('.mobile-menu-bg')?.addEventListener('click', () => {
      State.mobileMenuOpen = false;
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));
}

/* ----------------------------------------------------------------
   7. HERO ANIMATIONS
---------------------------------------------------------------- */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl
    .to('.hero-badge', {
      opacity: 1,
      y: 0,
      duration: 1,
    })
    .to('.hero-title-line', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
    }, '-=0.5')
    .to('.hero-title-sub', {
      opacity: 1,
      y: 0,
      duration: 1,
    }, '-=0.6')
    .to('.hero-desc', {
      opacity: 1,
      y: 0,
      duration: 0.9,
    }, '-=0.5')
    .to('.hero-divider', {
      opacity: 1,
      duration: 0.7,
    }, '-=0.4')
    .to('.hero-btns', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.3');

  // Nav entrance
  gsap.from('#main-header', {
    yPercent: -120,
    duration: 1,
    delay: 0.5,
    ease: 'power4.out'
  });

  // Parallax hero image
  gsap.to('.hero-img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  });

  // Hero stats parallax
  gsap.from('.hero-stats', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 2,
    ease: 'power3.out'
  });
}

/* ----------------------------------------------------------------
   8. FLOATING PARTICLES
---------------------------------------------------------------- */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const spiceColors = [
    'rgba(200, 163, 95, 0.6)',  // Gold
    'rgba(169, 113, 66, 0.5)',  // Copper
    'rgba(200, 163, 95, 0.3)',  // Light gold
    'rgba(252, 250, 245, 0.2)', // Ivory
    'rgba(124, 31, 45, 0.3)',   // Maroon
  ];

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = gsap.utils.random(2, 8);
    const x = gsap.utils.random(0, 100);
    const color = spiceColors[Math.floor(Math.random() * spiceColors.length)];
    const duration = gsap.utils.random(5, 12);
    const delay = gsap.utils.random(0, 8);

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -20px;
      background: radial-gradient(circle, ${color}, transparent);
      opacity: 0;
    `;

    container.appendChild(particle);

    gsap.to(particle, {
      y: -gsap.utils.random(200, 500),
      x: gsap.utils.random(-60, 60),
      opacity: gsap.utils.random(0.3, 0.8),
      rotation: gsap.utils.random(-180, 180),
      duration: duration,
      delay: delay,
      ease: 'power1.out',
      repeat: -1,
      repeatDelay: gsap.utils.random(1, 4),
      onRepeat: () => {
        gsap.set(particle, { y: 0, opacity: 0 });
      }
    });
  }

  // Create particles
  for (let i = 0; i < 25; i++) {
    createParticle();
  }
}

/* ----------------------------------------------------------------
   9. SCROLL-TRIGGERED ANIMATIONS
---------------------------------------------------------------- */
function initScrollAnimations() {

  // — About Section —
  gsap.from('.about-img-main', {
    opacity: 0,
    x: -60,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    }
  });

  gsap.from('.about-img-secondary', {
    opacity: 0,
    x: 40,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    delay: 0.3,
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
    }
  });

  gsap.from('.about-floating-card', {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 0.5,
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
    }
  });

  gsap.from('.about-right > *', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-right',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    }
  });

  gsap.from('.about-feature', {
    opacity: 0,
    x: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-features',
      start: 'top 80%',
    }
  });

  // — Section Headers —
  document.querySelectorAll('.section-header').forEach(header => {
    gsap.from(header.children, {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });
  });

  // — Menu Cards —
  ScrollTrigger.batch('.menu-card.visible', {
    start: 'top 85%',
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
  });

  // — Why Cards —
  gsap.from('.why-card', {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.why-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });

  // — Gallery Items —
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.92,
      duration: 0.9,
      ease: 'power3.out',
      delay: (i % 3) * 0.1,
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Image reveal inside gallery items
  galleryItems.forEach(item => {
    gsap.from(item.querySelector('img'), {
      scale: 1.2,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
      }
    });
  });

  // — Testimonials —
  gsap.from('.testimonials-section .section-header', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.testimonials-section',
      start: 'top 75%',
    }
  });

  // — Reservation —
  gsap.from('.reservation-content > *', {
    opacity: 0,
    y: 40,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.reservation-section',
      start: 'top 70%',
    }
  });

  // — Contact —
  gsap.from('.contact-card', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 75%',
    }
  });

  gsap.from('.map-container', {
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 75%',
    }
  });

  gsap.from('.contact-actions .action-btn', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '.contact-actions',
      start: 'top 85%',
    }
  });

  // — Footer —
  gsap.from('.footer-top > *', {
    opacity: 0,
    y: 25,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
    }
  });

  // — Ticker parallax depth —
  gsap.to('.ticker-section', {
    scrollTrigger: {
      trigger: '.ticker-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });

  // — Why Section Background Parallax —
  gsap.from('.why-bg-pattern', {
    scale: 1.2,
    duration: 1.5,
    ease: 'none',
    scrollTrigger: {
      trigger: '.why-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    }
  });
}

/* ----------------------------------------------------------------
   10. MENU FILTERING (Tabs)
---------------------------------------------------------------- */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  function showCategory(category) {
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (cardCategory === category) {
        card.classList.add('visible');
      } else {
        card.classList.remove('visible');
      }
    });
    State.activeMenuTab = category;
  }

  // Init with first tab
  showCategory('rice');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      // Animate out existing cards
      gsap.to('.menu-card.visible', {
        opacity: 0,
        y: 20,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          showCategory(category);
          gsap.from('.menu-card.visible', {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power3.out',
          });
        }
      });
    });
  });
}

/* ----------------------------------------------------------------
   11. TESTIMONIALS SLIDER
---------------------------------------------------------------- */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  if (!track) return;

  // Create dots
  for (let i = 0; i < State.totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer?.appendChild(dot);
  }

  function updateDots() {
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === State.currentSlide);
    });
  }

  function goToSlide(index) {
    State.currentSlide = index;
    gsap.to(track, {
      x: `-${index * 100}%`,
      duration: 0.7,
      ease: 'power3.inOut'
    });
    updateDots();
  }

  function nextSlide() {
    const next = (State.currentSlide + 1) % State.totalSlides;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (State.currentSlide - 1 + State.totalSlides) % State.totalSlides;
    goToSlide(prev);
  }

  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);

  // Auto-slide
  State.sliderInterval = setInterval(nextSlide, 5000);

  // Pause on hover
  const slider = document.getElementById('testimonialsSlider');
  slider?.addEventListener('mouseenter', () => clearInterval(State.sliderInterval));
  slider?.addEventListener('mouseleave', () => {
    State.sliderInterval = setInterval(nextSlide, 5000);
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    isDragging = false;
  }, { passive: true });
}

/* ----------------------------------------------------------------
   12. MAGNETIC BUTTONS
---------------------------------------------------------------- */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic');

  magneticBtns.forEach(btn => {
    let bounds;

    btn.addEventListener('mouseenter', () => {
      bounds = btn.getBoundingClientRect();
    });

    btn.addEventListener('mousemove', (e) => {
      if (!bounds) return;
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;
      const strength = 0.25;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: 'power3.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
      bounds = null;
    });
  });
}

/* ----------------------------------------------------------------
   13. MOUSE PARALLAX (Hero)
---------------------------------------------------------------- */
function initMouseParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let raf;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY = (e.clientY - rect.top) / rect.height - 0.5;
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    targetX = lerp(targetX, mouseX, 0.06);
    targetY = lerp(targetY, mouseY, 0.06);

    gsap.set('.hero-img', {
      x: targetX * -20,
      y: targetY * -15,
    });

    gsap.set('.hero-content', {
      x: targetX * 8,
      y: targetY * 6,
    });

    raf = requestAnimationFrame(animate);
  }

  animate();

  hero.addEventListener('mouseleave', () => {
    cancelAnimationFrame(raf);
    mouseX = 0;
    mouseY = 0;
    raf = animate();
  });
}

/* ----------------------------------------------------------------
   14. SMOOTH SCROLLING & ANCHOR LINKS
---------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('main-header')?.offsetHeight || 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      // Native smooth scroll as reliable fallback
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

/* ----------------------------------------------------------------
   15. COUNTER ANIMATION (Stats)
---------------------------------------------------------------- */
function initCounterAnimations() {
  const stats = [
    { selector: '.stat-item:nth-child(1) .stat-num', target: 15, suffix: '+' },
    { selector: '.stat-item:nth-child(3) .stat-num', target: 50, suffix: '+' },
  ];

  stats.forEach(stat => {
    const el = document.querySelector(stat.selector);
    if (!el) return;

    ScrollTrigger.create({
      trigger: '.hero-stats',
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.from({ val: 0 }, {
          val: stat.target,
          duration: 2,
          ease: 'power2.out',
          delay: 2.5,
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val) + stat.suffix;
          }
        });
      }
    });
  });
}

/* ----------------------------------------------------------------
   16. GALLERY LIGHTBOX (Simple)
---------------------------------------------------------------- */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay span')?.textContent || '';
      if (!img) return;

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(0,0,0,0.95);
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        cursor: zoom-out; padding: 2rem;
      `;

      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src.replace(/h=\d+/, 'h=900').replace(/w=\d+/, 'w=1200');
      lightboxImg.style.cssText = `
        max-width: 90vw; max-height: 80vh;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 80px rgba(0,0,0,0.5);
      `;

      const captionEl = document.createElement('p');
      captionEl.textContent = caption;
      captionEl.style.cssText = `
        color: rgba(255,255,255,0.7);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem;
        margin-top: 1.5rem;
        letter-spacing: 0.05em;
      `;

      lightbox.appendChild(lightboxImg);
      lightbox.appendChild(captionEl);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      gsap.from(lightbox, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.from(lightboxImg, {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out',
      });

      lightbox.addEventListener('click', () => {
        gsap.to(lightbox, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            lightbox.remove();
            document.body.style.overflow = '';
          }
        });
      });

      // Escape key
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          lightbox.click();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    });
  });
}

/* ----------------------------------------------------------------
   17. SECTION LABEL ANIMATIONS
---------------------------------------------------------------- */
function initLabelAnimations() {
  document.querySelectorAll('.section-label').forEach(label => {
    gsap.from(label, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: label,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate the lines
    const lines = label.querySelectorAll('.label-line');
    gsap.from(lines, {
      scaleX: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: label,
        start: 'top 85%',
      }
    });
  });
}

/* ----------------------------------------------------------------
   18. TICKER — CSS animation handles the scroll loop natively
---------------------------------------------------------------- */
function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  // CSS keyframe tickerScroll handles the seamless loop.
  // Pause when page is not visible (handled by visibility API).
  // RTL direction flip also handled via CSS.
}

/* ----------------------------------------------------------------
   19. ABOUT SECTION — FLOATING CARD ANIMATION
---------------------------------------------------------------- */
function initFloatingElements() {
  // Already handled via CSS animation, enhance with GSAP on scroll
  gsap.from('.about-floating-card', {
    opacity: 0,
    scale: 0.85,
    rotation: -5,
    duration: 0.9,
    ease: 'back.out(1.8)',
    scrollTrigger: {
      trigger: '.about-left',
      start: 'top 75%',
    }
  });
}

/* ----------------------------------------------------------------
   20. PERFORMANCE: LAZY LOAD OBSERVER
---------------------------------------------------------------- */
function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.transition = 'opacity 0.5s ease';
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    images.forEach(img => imageObserver.observe(img));
  }
}

/* ----------------------------------------------------------------
   21. SCROLL PROGRESS BAR
---------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, #a8843f, #C8A35F, #d4b575);
    z-index: 9998;
    pointer-events: none;
    transition: width 0.1s linear;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ----------------------------------------------------------------
   22. RESERVATION FORM (Phone Link Enhancement)
---------------------------------------------------------------- */
function initContactEnhancements() {
  // Animate phone number on hover
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        color: '#C8A35F',
        duration: 0.25,
        ease: 'power2.out',
      });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        color: '',
        duration: 0.25,
        ease: 'power2.out',
      });
    });
  });
}

/* ----------------------------------------------------------------
   23. NAV LINK HOVER EFFECT
---------------------------------------------------------------- */
function initNavHoverEffects() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        y: -2,
        duration: 0.25,
        ease: 'power2.out',
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        y: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      });
    });
  });
}

/* ----------------------------------------------------------------
   24. WHY CARD HOVER MICRO-INTERACTION
---------------------------------------------------------------- */
function initCardHoverEffects() {
  const whyCards = document.querySelectorAll('.why-card');

  whyCards.forEach(card => {
    const icon = card.querySelector('.why-icon');

    card.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        rotation: 8,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });

  // About features hover
  const features = document.querySelectorAll('.about-feature');
  features.forEach(feature => {
    const icon = feature.querySelector('.feature-icon');

    feature.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        rotation: -10,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    feature.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

/* ----------------------------------------------------------------
   25. GSAP SCROLLTO PLUGIN POLYFILL
---------------------------------------------------------------- */
function initScrollToPlugin() {
  // Simple polyfill if ScrollTo plugin not loaded
  if (!gsap.plugins || !gsap.plugins.scrollTo) {
    gsap.registerPlugin({
      name: "scrollTo",
      init(target, value) {
        this.target = target === window ? document.documentElement : target;
        this.y = typeof value === 'object' ? value.y : value;
      },
      render(progress, data) {
        data.target.scrollTop = data.y * progress;
      }
    });
  }
}

/* ----------------------------------------------------------------
   26. MENU CARD IMAGE ERROR HANDLING
---------------------------------------------------------------- */
function initImageFallbacks() {
  document.querySelectorAll('.menu-card-img img, .gallery-item img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const parent = img.closest('.menu-card-img, .gallery-item');
      if (parent) {
        parent.style.background = 'linear-gradient(135deg, #1f1f1f, #141414)';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem; opacity: 0.3;
        `;
        placeholder.textContent = '🍽';
        parent.appendChild(placeholder);
      }
    });
  });
}

/* ----------------------------------------------------------------
   27. FOOTER ANIMATION
---------------------------------------------------------------- */
function initFooterAnimation() {
  gsap.from('.footer-bottom', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
    }
  });
}

/* ----------------------------------------------------------------
   28. ACCESSIBILITY — KEYBOARD NAVIGATION
---------------------------------------------------------------- */
function initAccessibility() {
  // Skip to main content
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Add focus styles for keyboard nav
  const style = document.createElement('style');
  style.textContent = `
    .keyboard-nav *:focus {
      outline: 2px solid #C8A35F !important;
      outline-offset: 3px !important;
    }
  `;
  document.head.appendChild(style);
}

/* ----------------------------------------------------------------
   MAIN INITIALIZATION
---------------------------------------------------------------- */
function init() {
  // Initialize core features immediately
  initScrollToPlugin();
  initPreloader();
  initTheme();
  initLanguage();
  initAccessibility();

  // Initialize after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initParticles();
    initMenuTabs();
    initTestimonialsSlider();
    initMagneticButtons();
    initMouseParallax();
    initSmoothScroll();
    initCounterAnimations();
    initGalleryLightbox();
    initLabelAnimations();
    initTicker();
    initFloatingElements();
    initLazyImages();
    initScrollProgress();
    initContactEnhancements();
    initNavHoverEffects();
    initCardHoverEffects();
    initImageFallbacks();
    initFooterAnimation();
    initScrollAnimations();

    // Refresh ScrollTrigger after everything loads
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  });
}

// Run
init();

/* ----------------------------------------------------------------
   29. ADDITIONAL: WINDOW RESIZE HANDLER
---------------------------------------------------------------- */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
}, { passive: true });

/* ----------------------------------------------------------------
   30. ADDITIONAL: VISIBILITY API (Pause animations when hidden)
---------------------------------------------------------------- */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.play();
  }
});
