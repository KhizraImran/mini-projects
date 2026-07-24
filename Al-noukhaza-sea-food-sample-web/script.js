/* ================================================================
   AL NOUKHAZA SEA FOOD — LUXURY PREMIUM JAVASCRIPT
   ================================================================ */

'use strict';

/* ── GLOBAL STATE ── */
const state = {
  lang: localStorage.getItem('lang') || 'en',
  theme: localStorage.getItem('theme') || 'dark',
  menuOpen: false,
  testIndex: 0,
  testAutoPlay: null,
  isLoaded: false,
};

/* ── DOM REFERENCES ── */
const dom = {
  loader: document.getElementById('page-loader'),
  loaderProgress: document.querySelector('.loader-progress'),
  htmlEl: document.documentElement,
  body: document.body,
  navbar: document.getElementById('navbar'),
  hamburger: document.getElementById('hamburger'),
  mobileMenu: document.getElementById('mobile-menu'),
  langToggle: document.getElementById('lang-toggle'),
  themeToggle: document.getElementById('theme-toggle'),
  heroCanvas: document.getElementById('hero-canvas'),
  testTrack: document.getElementById('testimonials-track'),
  testPrev: document.getElementById('test-prev'),
  testNext: document.getElementById('test-next'),
  testDots: document.getElementById('test-dots'),
};

/* ================================================================
   PAGE LOADER
   ================================================================ */
function initLoader() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      dom.loaderProgress.style.width = '100%';
      setTimeout(hideLoader, 400);
    }
    dom.loaderProgress.style.width = progress + '%';
  }, 80);

  // Ensure it hides after max 2.5s
  setTimeout(hideLoader, 2500);
}

function hideLoader() {
  if (state.isLoaded) return;
  state.isLoaded = true;

  gsap.to(dom.loader, {
    opacity: 0,
    duration: 0.7,
    ease: 'power2.inOut',
    onComplete: () => {
      dom.loader.style.display = 'none';
      dom.body.classList.remove('is-loading');
      initHeroAnimation();
      startCounters();
    },
  });
}

/* ================================================================
   LANGUAGE SYSTEM
   ================================================================ */
function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('lang', lang);

  dom.htmlEl.setAttribute('lang', lang);
  dom.htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  dom.htmlEl.setAttribute('data-lang', lang);

  // Update all translatable elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update lang toggle appearance
  const enSpan = dom.langToggle.querySelector('.lang-en');
  const arSpan = dom.langToggle.querySelector('.lang-ar');
  if (lang === 'ar') {
    enSpan.style.opacity = '0.4';
    arSpan.style.opacity = '1';
    arSpan.style.color = 'var(--luxury-gold)';
    enSpan.style.color = 'inherit';
  } else {
    arSpan.style.opacity = '0.4';
    enSpan.style.opacity = '1';
    enSpan.style.color = 'var(--luxury-gold)';
    arSpan.style.color = 'inherit';
  }

  // Update title
  document.title = lang === 'ar'
    ? 'النوخذة للمأكولات البحرية | مدينة الثريا، الفروانية، الكويت'
    : 'Al Noukhaza Sea Food | Al Thuraya City, Farwaniya, Kuwait';
}

function toggleLanguage() {
  const newLang = state.lang === 'en' ? 'ar' : 'en';

  // Animate toggle
  gsap.to(dom.langToggle, {
    scale: 0.9,
    duration: 0.15,
    onComplete: () => {
      applyLanguage(newLang);
      gsap.to(dom.langToggle, { scale: 1, duration: 0.2, ease: 'back.out(1.7)' });
    },
  });
}

/* ================================================================
   THEME SYSTEM
   ================================================================ */
function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('theme', theme);
  dom.htmlEl.setAttribute('data-theme', theme);
  dom.body.className = dom.body.className.replace(/dark-mode|light-mode/g, '').trim();
  dom.body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';

  gsap.to(dom.themeToggle, {
    rotate: 180,
    scale: 0.8,
    duration: 0.3,
    onComplete: () => {
      applyTheme(newTheme);
      gsap.to(dom.themeToggle, {
        rotate: 0,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    },
  });
}

/* ================================================================
   NAVIGATION
   ================================================================ */
function initNavigation() {
  // Scroll effect
  let lastScrollY = 0;
  const navInner = dom.navbar.querySelector('.nav-inner');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollingDown = scrollY > lastScrollY;

    if (scrollY > 80) {
      navInner.classList.add('scrolled');
    } else {
      navInner.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (scrollY > 200) {
      if (scrollingDown) {
        gsap.to('#main-header', { yPercent: -120, duration: 0.4, ease: 'power2.inOut' });
      } else {
        gsap.to('#main-header', { yPercent: 0, duration: 0.4, ease: 'power2.inOut' });
      }
    } else {
      gsap.to('#main-header', { yPercent: 0, duration: 0.3 });
    }

    lastScrollY = scrollY;
  }, { passive: true });

  // Hamburger
  dom.hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile menu on link click
  dom.mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileMenu();
      }
    });
  });
}

function toggleMobileMenu() {
  state.menuOpen = !state.menuOpen;
  dom.hamburger.classList.toggle('active', state.menuOpen);
  dom.mobileMenu.classList.toggle('open', state.menuOpen);
  dom.body.style.overflow = state.menuOpen ? 'hidden' : '';

  if (state.menuOpen) {
    // Animate menu items in
    const links = dom.mobileMenu.querySelectorAll('.mobile-nav-links li');
    gsap.fromTo(links,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.08, delay: 0.2, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo('.mobile-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, delay: 0.5, duration: 0.4 });
  }
}

function closeMobileMenu() {
  state.menuOpen = false;
  dom.hamburger.classList.remove('active');
  dom.mobileMenu.classList.remove('open');
  dom.body.style.overflow = '';
}

/* ================================================================
   HERO CANVAS (PARTICLES)
   ================================================================ */
function initHeroCanvas() {
  const canvas = dom.heroCanvas;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animFrame;
  const particles = [];
  const PARTICLE_COUNT = 50;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.4 - 0.1;
      this.opacity = Math.random() * 0.4 + 0.05;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${this.opacity * (1 - this.life / this.maxLife)})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife; // stagger initial state
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animFrame = requestAnimationFrame(animate);
  }

  animate();

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
    gsap.to('.hero-content', {
      x: mouseX,
      y: mouseY,
      duration: 1.5,
      ease: 'power1.out',
    });
  }, { passive: true });
}

/* ================================================================
   HERO ANIMATION (GSAP)
   ================================================================ */
function initHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Header
  tl.fromTo('#main-header',
    { yPercent: -100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 1 }
  );

  // Hero badge
  tl.fromTo('.hero-badge',
    { opacity: 0, y: 20, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.7 },
    '-=0.5'
  );

  // Title lines
  tl.to('.hero-title-line',
    { opacity: 1, y: 0, stagger: 0.2, duration: 0.9 },
    '-=0.3'
  );

  // Subtitle
  tl.to('.hero-subtitle',
    { opacity: 1, y: 0, duration: 0.7 },
    '-=0.4'
  );

  // Actions
  tl.to('.hero-actions',
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.3'
  );

  // Stats
  tl.to('.hero-stats',
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.2'
  );

  // Floating WhatsApp button
  tl.fromTo('.whatsapp-float',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
    '-=0.2'
  );

  initHeroCanvas();
}

/* ================================================================
   STAT COUNTERS
   ================================================================ */
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2.2;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toLocaleString();
      },
    });
  });
}

/* ================================================================
   SCROLL ANIMATIONS (GSAP ScrollTrigger)
   ================================================================ */
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // About section
  gsap.fromTo('.about-img-main',
    { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about-imagery', start: 'top 75%' },
    }
  );

  gsap.fromTo('.about-img-secondary',
    { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.about-imagery', start: 'top 75%' },
    }
  );

  gsap.fromTo('.about-badge-float',
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      delay: 0.6,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.about-imagery', start: 'top 75%' },
    }
  );

  gsap.fromTo('.about-years-badge',
    { scale: 0, opacity: 0, rotate: -10 },
    {
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration: 0.6,
      delay: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.about-imagery', start: 'top 75%' },
    }
  );

  // About content
  gsap.fromTo('.about-content',
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
    }
  );

  // Menu cards stagger
  gsap.fromTo('.menu-card',
    { opacity: 0, y: 60, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' },
    }
  );

  // Why cards stagger
  gsap.fromTo('.why-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.why-grid', start: 'top 85%' },
    }
  );

  // Gallery items
  gsap.fromTo('.gallery-item',
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      stagger: 0.07,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.gallery-masonry', start: 'top 85%' },
    }
  );

  // Testimonial cards
  gsap.fromTo('.testimonial-card',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.testimonials-wrapper', start: 'top 85%' },
    }
  );

  // Reservation content
  gsap.fromTo('.reservation-content',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.reservation-section', start: 'top 75%' },
    }
  );

  // Contact cards
  gsap.fromTo('.contact-card',
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-grid', start: 'top 85%' },
    }
  );

  gsap.fromTo('.map-col',
    { opacity: 0, x: 40 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.map-col', start: 'top 85%' },
    }
  );

  // Section headers
  document.querySelectorAll('.section-title, .section-subtitle, .section-tag').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    );
  });

  // Parallax on hero image
  gsap.to('.hero-img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Why bg shape rotation
  gsap.to('.why-bg-shape', {
    rotation: 360,
    duration: 40,
    repeat: -1,
    ease: 'none',
  });

  // Contact section slide in
  gsap.fromTo('.contact-cta-btns',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-cta-btns', start: 'top 90%', once: true },
    }
  );
}

/* ================================================================
   TESTIMONIALS SLIDER
   ================================================================ */
function initTestimonialsSlider() {
  const cards = dom.testTrack ? dom.testTrack.querySelectorAll('.testimonial-card') : [];
  if (!cards.length) return;

  const total = cards.length;
  let visibleCount = getVisibleCount();

  function getVisibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  const maxIndex = Math.max(0, total - visibleCount);

  // Create dots
  const dotsContainer = dom.testDots;
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('div');
    dot.className = 'test-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    state.testIndex = Math.max(0, Math.min(index, maxIndex));
    const cardWidth = cards[0].offsetWidth + 24; // gap
    gsap.to(dom.testTrack, {
      x: -state.testIndex * cardWidth,
      duration: 0.6,
      ease: 'power2.inOut',
    });
    updateDots();
  }

  function updateDots() {
    dotsContainer.querySelectorAll('.test-dot').forEach((d, i) => {
      d.classList.toggle('active', i === state.testIndex);
    });
  }

  dom.testNext && dom.testNext.addEventListener('click', () => {
    const next = state.testIndex >= maxIndex ? 0 : state.testIndex + 1;
    goToSlide(next);
    resetAutoPlay();
  });

  dom.testPrev && dom.testPrev.addEventListener('click', () => {
    const prev = state.testIndex <= 0 ? maxIndex : state.testIndex - 1;
    goToSlide(prev);
    resetAutoPlay();
  });

  function startAutoPlay() {
    state.testAutoPlay = setInterval(() => {
      const next = state.testIndex >= maxIndex ? 0 : state.testIndex + 1;
      goToSlide(next);
    }, 4500);
  }

  function resetAutoPlay() {
    clearInterval(state.testAutoPlay);
    startAutoPlay();
  }

  startAutoPlay();

  // Pause on hover
  dom.testTrack.addEventListener('mouseenter', () => clearInterval(state.testAutoPlay));
  dom.testTrack.addEventListener('mouseleave', startAutoPlay);

  // Touch swipe
  let touchStartX = 0;
  dom.testTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  dom.testTrack.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(state.testIndex >= maxIndex ? 0 : state.testIndex + 1);
      } else {
        goToSlide(state.testIndex <= 0 ? maxIndex : state.testIndex - 1);
      }
    }
  }, { passive: true });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    visibleCount = getVisibleCount();
    goToSlide(0);
  }, { passive: true });
}

/* ================================================================
   MAGNETIC BUTTONS
   ================================================================ */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

/* ================================================================
   GALLERY PARALLAX & LIGHTBOX
   ================================================================ */
function initGallery() {
  // Parallax on scroll
  document.querySelectorAll('.gallery-item img').forEach((img, i) => {
    const speed = i % 3 === 0 ? -8 : i % 3 === 1 ? 8 : -4;
    gsap.to(img, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Simple lightbox
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      openLightbox(img.src, img.alt);
    });
  });
}

function openLightbox(src, alt) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <img src="${src}" alt="${alt}" />
    </div>
  `;

  // Inline styles for lightbox
  Object.assign(lightbox.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '9998',
    background: 'rgba(7,26,45,0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    opacity: '0',
  });

  const inner = lightbox.querySelector('.lightbox-inner');
  Object.assign(inner.style, {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
  });

  const imgEl = lightbox.querySelector('img');
  Object.assign(imgEl.style, {
    maxWidth: '90vw',
    maxHeight: '80vh',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
  });

  const closeBtn = lightbox.querySelector('.lightbox-close');
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '12px',
    right: '12px',
    zIndex: '2',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(212,175,55,0.9)',
    border: 'none',
    color: '#071A2D',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';

  gsap.to(lightbox, { opacity: 1, duration: 0.3 });
  gsap.fromTo(inner, { scale: 0.9 }, { scale: 1, duration: 0.4, ease: 'back.out(1.5)' });

  function closeLightbox() {
    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        lightbox.remove();
        document.body.style.overflow = '';
      },
    });
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      closeLightbox();
      document.removeEventListener('keydown', esc);
    }
  });
}

/* ================================================================
   WATER WAVE EFFECT (enhanced)
   ================================================================ */
function initWaterEffect() {
  const waves = document.querySelectorAll('.wave');

  waves.forEach((wave, i) => {
    gsap.to(wave, {
      x: '+=3%',
      duration: 4 + i * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
}

/* ================================================================
   ABOUT IMAGE PARALLAX
   ================================================================ */
function initAboutParallax() {
  gsap.to('.about-img-main img', {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-imagery',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.about-img-secondary img', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-imagery',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/* ================================================================
   SECTION TITLE REVEAL (word by word)
   ================================================================ */
function initTitleReveal() {
  // Animate main section titles with split text feel
  document.querySelectorAll('.section-title').forEach(title => {
    const words = title.textContent.trim().split(' ');
    if (words.length < 2) return;

    const originalText = title.getAttribute('data-en') || title.textContent;
    // We'll rely on GSAP fromTo without SplitText to avoid CDN issues
    gsap.fromTo(title,
      { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });
}

/* ================================================================
   WHY CARDS — ICON FLOAT ANIMATION
   ================================================================ */
function initWhyCards() {
  document.querySelectorAll('.why-icon-wrap').forEach((icon, i) => {
    gsap.to(icon, {
      y: -5,
      duration: 1.5 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.15,
    });
  });
}

/* ================================================================
   RESERVATION BUTTON PULSE
   ================================================================ */
function initReservationPulse() {
  const btn = document.querySelector('.btn-gold');
  if (!btn) return;

  gsap.to(btn, {
    boxShadow: '0 0 50px rgba(212,175,55,0.6)',
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

/* ================================================================
   FLOATING NAV LOGO ENTRANCE ANIMATION
   ================================================================ */
function initNavLogoAnimation() {
  gsap.fromTo('.logo-emblem',
    { scale: 0, rotate: -180, opacity: 0 },
    {
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 0.8,
      delay: 1.0,
      ease: 'back.out(1.7)',
    }
  );

  gsap.fromTo('.logo-text',
    { x: -15, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      delay: 1.3,
      ease: 'power2.out',
    }
  );
}

/* ================================================================
   MENU CARD TILT EFFECT
   ================================================================ */
function initCardTilt() {
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;

      gsap.to(card, {
        rotateX: -y,
        rotateY: x,
        duration: 0.3,
        ease: 'power1.out',
        transformPerspective: 1000,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  });
}

/* ================================================================
   FOOTER REVEAL
   ================================================================ */
function initFooter() {
  gsap.fromTo('.site-footer',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 95%',
        once: true,
      },
    }
  );
}

/* ================================================================
   HERO SCROLL PROGRESS
   ================================================================ */
function initScrollProgress() {
  // Fade out hero scroll hint after first scroll
  window.addEventListener('scroll', () => {
    const hint = document.querySelector('.hero-scroll-hint');
    if (hint && window.scrollY > 100) {
      gsap.to(hint, { opacity: 0, duration: 0.3 });
    }
  }, { passive: true, once: true });
}

/* ================================================================
   CARD ORDER BUTTON — PULSE ON CLICK
   ================================================================ */
function initOrderButtons() {
  document.querySelectorAll('.card-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      gsap.to(btn, {
        scale: 0.9,
        duration: 0.1,
        onComplete: () => {
          gsap.to(btn, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
        },
      });

      // WhatsApp redirect with dish name
      const card = btn.closest('.menu-card');
      const dishName = card ? card.querySelector('.card-title').textContent : 'a dish';
      const msg = encodeURIComponent(`Hello! I'd like to order: ${dishName}`);
      window.open(`https://wa.me/96596961379?text=${msg}`, '_blank');
    });
  });
}

/* ================================================================
   INTERSECTION OBSERVER — FALLBACK
   ================================================================ */
function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-img').forEach(el => observer.observe(el));
}

/* ================================================================
   GSAP REGISTER PLUGINS
   ================================================================ */
function registerGSAPPlugins() {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    console.warn('GSAP ScrollTrigger not available, using fallback animations');
  }
}

/* ================================================================
   LANG ACTIVE INDICATOR — ENHANCED
   ================================================================ */
function updateLangToggleUI() {
  const enSpan = dom.langToggle.querySelector('.lang-en');
  const arSpan = dom.langToggle.querySelector('.lang-ar');

  if (state.lang === 'ar') {
    enSpan.style.opacity = '0.4';
    arSpan.style.opacity = '1';
    arSpan.style.color = 'var(--luxury-gold)';
  } else {
    arSpan.style.opacity = '0.4';
    enSpan.style.opacity = '1';
    enSpan.style.color = 'var(--luxury-gold)';
  }
}

/* ================================================================
   INIT — MAIN ENTRY POINT
   ================================================================ */
function init() {
  // Apply saved preferences immediately
  applyTheme(state.theme);
  applyLanguage(state.lang);
  updateLangToggleUI();

  // Body loading state
  dom.body.classList.add('is-loading');

  // Init loader
  initLoader();

  // Register GSAP
  registerGSAPPlugins();

  // Navigation
  initNavigation();

  // Event listeners
  dom.langToggle.addEventListener('click', toggleLanguage);
  dom.themeToggle.addEventListener('click', toggleTheme);

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (state.menuOpen && !e.target.closest('#mobile-menu') && !e.target.closest('#hamburger')) {
      closeMobileMenu();
    }
  });

  // Wait for GSAP to be ready then init ScrollTrigger animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Init after a small delay to ensure DOM is ready
    setTimeout(() => {
      initScrollAnimations();
      initAboutParallax();
      initGallery();
      initWaterEffect();
      initWhyCards();
      initReservationPulse();
      initFooter();
      initScrollProgress();
      initOrderButtons();
      initIntersectionObserver();
      initTestimonialsSlider();
      initMagneticButtons();
      initNavLogoAnimation();
      initCardTilt();
    }, 100);
  } else {
    // Fallback without GSAP ScrollTrigger
    setTimeout(() => {
      initTestimonialsSlider();
      initOrderButtons();
      initIntersectionObserver();
    }, 100);
  }

  // Nav animation initial state
  gsap.set('#main-header', { opacity: 0 });
}

/* ================================================================
   DOMContentLoaded
   ================================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ================================================================
   WINDOW LOAD — Final cleanup
   ================================================================ */
window.addEventListener('load', () => {
  // Ensure loader hides even if images are slow
  if (!state.isLoaded) {
    setTimeout(hideLoader, 300);
  }

  // Refresh ScrollTrigger after all images loaded
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

/* ================================================================
   RESIZE HANDLER
   ================================================================ */
window.addEventListener('resize', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}, { passive: true });
