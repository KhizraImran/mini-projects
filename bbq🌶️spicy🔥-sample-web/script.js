/* ============================================================
   BBQ SPICY RESTAURANT FARWANIYA — LUXURY SCRIPT
   ============================================================ */

'use strict';

/* ---- Register GSAP Plugins ---- */
gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   LOADER
   ============================================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  gsap.to(loader, {
    opacity: 0,
    duration: 0.6,
    delay: 2.4,
    ease: 'power2.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      document.body.style.overflow = 'auto';
      initHeroAnimations();
    }
  });
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' });
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  document.querySelectorAll('a, button, .menu-card, .sig-card, .why-card, .review-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 3, opacity: 0.4, duration: 0.3 });
      gsap.to(follower, { scale: 0.5, opacity: 0.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 0.7, duration: 0.3 });
    });
  });
}

/* ============================================================
   PARTICLE SYSTEM (fire embers)
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const colors = ['#C69A45', '#E4BF72', '#A62319', '#FF6B35', '#FFB347'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 20;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.speedY = -(Math.random() * 2 + 0.8);
      this.opacity = Math.random() * 0.6 + 0.2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      this.opacity = (1 - this.life / this.maxLife) * 0.7;
      this.size *= 0.998;
      if (this.life >= this.maxLife || this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 60; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife; // stagger start
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ============================================================
   HERO ANIMATIONS
   ============================================================ */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 })
    .to('.hero-line', {
      opacity: 1, y: 0, duration: 1.1,
      stagger: 0.15,
      ease: 'power4.out'
    }, '-=0.4')
    .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
    .to('.hero-floats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');

  // Hero parallax
  gsap.to('#heroBg', {
    y: '25%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* ============================================================
   HEADER SCROLL BEHAVIOUR
   ============================================================ */
function initHeader() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  ScrollTrigger.create({
    start: 'top -60',
    onUpdate: (self) => {
      header.classList.toggle('scrolled', self.progress > 0);
    }
  });

  // Active link on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const spans = hamburger.querySelectorAll('span');

  function open() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    gsap.fromTo('.mobile-link', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08, delay: 0.3, ease: 'power3.out' });
    gsap.to(spans[0], { rotate: 45, y: 6.5, duration: 0.3 });
    gsap.to(spans[1], { opacity: 0, duration: 0.2 });
    gsap.to(spans[2], { rotate: -45, y: -6.5, duration: 0.3 });
  }

  function close() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = 'auto';
    gsap.to(spans[0], { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(spans[1], { opacity: 1, duration: 0.2 });
    gsap.to(spans[2], { rotate: 0, y: 0, duration: 0.3 });
  }

  hamburger.addEventListener('click', open);
  mobileClose.addEventListener('click', close);
  mobileLinks.forEach(link => link.addEventListener('click', close));
}

/* ============================================================
   LANGUAGE TOGGLE
   ============================================================ */
function initLanguage() {
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const html = document.documentElement;
  let isAr = false;

  function updateContent(ar) {
    const selector = ar ? '[data-ar]' : '[data-en]';
    const attr = ar ? 'data-ar' : 'data-en';
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute(attr);
      if (val !== null) {
        // Handle elements that are links or inputs differently
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });
    langLabel.textContent = ar ? 'English' : 'العربية';
    html.setAttribute('dir', ar ? 'rtl' : 'ltr');
    html.setAttribute('lang', ar ? 'ar' : 'en');
  }

  langToggle.addEventListener('click', () => {
    isAr = !isAr;

    gsap.to('body', {
      opacity: 0.85,
      duration: 0.15,
      onComplete: () => {
        updateContent(isAr);
        gsap.to('body', { opacity: 1, duration: 0.3 });
      }
    });
  });
}

/* ============================================================
   THEME TOGGLE
   ============================================================ */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('bbq-theme') || 'dark';
  applyTheme(saved, false);

  function applyTheme(theme, animate = true) {
    html.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (animate) {
      gsap.fromTo(themeIcon, { scale: 0.5, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' });
    }
    localStorage.setItem('bbq-theme', theme);
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ============================================================
   MENU TABS
   ============================================================ */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  function showCategory(cat) {
    const toShow = [];
    const toHide = [];

    cards.forEach(card => {
      if (card.getAttribute('data-cat') === cat) {
        toShow.push(card);
      } else {
        toHide.push(card);
      }
    });

    // Hide all
    toHide.forEach(card => {
      card.classList.remove('visible');
    });

    // Show matching
    toShow.forEach(card => {
      card.classList.add('visible');
    });

    // Animate shown cards
    gsap.fromTo(toShow, {
      opacity: 0,
      y: 30,
      scale: 0.96
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.55,
      stagger: 0.08,
      ease: 'power3.out'
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showCategory(tab.getAttribute('data-cat'));
    });
  });

  // Init first tab
  showCategory('grill');
}

/* ============================================================
   SCROLL ANIMATIONS (GSAP ScrollTrigger)
   ============================================================ */
function initScrollAnimations() {

  // --- Section tags and titles ---
  gsap.utils.toArray('.section-tag').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      }
    );
  });

  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });

  gsap.utils.toArray('.gold-divider').forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1, opacity: 1, duration: 0.8, transformOrigin: el.classList.contains('center') ? 'center' : 'left',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // --- About section ---
  gsap.fromTo('.about-text',
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
      scrollTrigger: { trigger: '.about-content', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  gsap.fromTo('.feat-chip',
    { opacity: 0, scale: 0.85 },
    {
      opacity: 1, scale: 1, duration: 0.5, stagger: 0.08,
      scrollTrigger: { trigger: '.about-features', start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );

  // --- About stats counter ---
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          innerHTML: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerHTML: 1 },
          onUpdate: function () {
            el.textContent = Math.round(parseFloat(el.innerHTML)).toLocaleString();
          }
        });
      }
    });
  });

  // --- Signature cards ---
  gsap.fromTo('.sig-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
      scrollTrigger: { trigger: '.sig-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Why cards ---
  gsap.fromTo('.why-card',
    { opacity: 0, y: 45, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1,
      scrollTrigger: { trigger: '.why-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Contact cards ---
  gsap.fromTo('.contact-card',
    { opacity: 0, y: 35 },
    {
      opacity: 1, y: 0, duration: 0.65, stagger: 0.1,
      scrollTrigger: { trigger: '.contact-grid', start: 'top 82%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Chef specials ---
  gsap.fromTo('.special-item',
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0, duration: 0.7, stagger: 0.1,
      scrollTrigger: { trigger: '.chefs-specials-list', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Masonry gallery items ---
  gsap.utils.toArray('.masonry-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.93 },
      {
        opacity: 1, scale: 1, duration: 0.75, delay: i * 0.07,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // --- Gallery parallax ---
  gsap.utils.toArray('[data-parallax] img').forEach(img => {
    gsap.to(img, {
      y: '12%',
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // --- Events section ---
  gsap.fromTo('.events-content',
    { opacity: 0, x: -50 },
    {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.events-content', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  gsap.fromTo('.event-chip',
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1, scale: 1, duration: 0.5, stagger: 0.07,
      scrollTrigger: { trigger: '.events-list', start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Reservation ---
  gsap.fromTo('.reservation-inner',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.9,
      scrollTrigger: { trigger: '.reservation-inner', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  gsap.fromTo('.hours-card',
    { opacity: 0, y: 25 },
    {
      opacity: 1, y: 0, duration: 0.65, stagger: 0.12,
      scrollTrigger: { trigger: '.hours-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Map ---
  gsap.fromTo('.map-wrap',
    { opacity: 0, y: 40, scale: 0.98 },
    {
      opacity: 1, y: 0, scale: 1, duration: 0.9,
      scrollTrigger: { trigger: '.map-wrap', start: 'top 82%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Footer ---
  gsap.fromTo('.footer-inner',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: '.footer', start: 'top 90%', toggleActions: 'play none none reverse' }
    }
  );

  // --- Reveal images (clip-path) ---
  gsap.utils.toArray('.reveal-img').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' }
      }
    );
  });
}

/* ============================================================
   REVIEWS SLIDER
   ============================================================ */
function initReviews() {
  const track = document.getElementById('reviewsTrack');
  const dotsContainer = document.getElementById('reviewsDots');
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;
  let current = 0;
  let autoTimer = null;
  let startX = 0;
  let isDragging = false;
  let dragOffset = 0;

  // Create dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'review-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index) {
    current = (index + total) % total;
    const cardWidth = cards[0].offsetWidth + 24; // gap = 1.5rem = 24px
    gsap.to(track, {
      x: -(current * cardWidth),
      duration: 0.7,
      ease: 'power3.out'
    });
    dotsContainer.querySelectorAll('.review-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }

  function startAuto() {
    autoTimer = setInterval(next, 4500);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  // Drag to scroll
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    stopAuto();
  });
  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : goTo(current - 1);
    } else {
      goTo(current); // snap back
    }
    startAuto();
  });

  // Touch
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAuto();
  });
  track.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : goTo(current - 1);
    }
    startAuto();
  });

  startAuto();
  goTo(0);
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      gsap.to(btn, {
        x: dx * 0.3,
        y: dy * 0.3,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ============================================================
   SMOOTH ANCHOR SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   BACKGROUND PARALLAX ON MOUSE MOVE (Hero)
   ============================================================ */
function initHeroMouseParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 10;
    gsap.to('#heroBg', { x: x, y: y, duration: 1.5, ease: 'power2.out' });
    gsap.to('.hero-content', { x: -x * 0.3, y: -y * 0.3, duration: 1.5, ease: 'power2.out' });
  });

  hero.addEventListener('mouseleave', () => {
    gsap.to(['#heroBg', '.hero-content'], { x: 0, y: 0, duration: 1.5, ease: 'power3.out' });
  });
}

/* ============================================================
   SIGNATURE SECTION PARALLAX
   ============================================================ */
function initSignatureParallax() {
  gsap.to('.sig-bg img', {
    y: '20%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.signature-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* ============================================================
   EVENTS SECTION PARALLAX
   ============================================================ */
function initEventsParallax() {
  gsap.to('.events-bg img', {
    y: '15%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.events-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/* ============================================================
   ABOUT IMG HOVER 3D TILT
   ============================================================ */
function initImgTilt() {
  document.querySelectorAll('.about-img-wrap, .chefs-visual').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotationY: x * 10,
        rotationX: -y * 10,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'power3.out' });
    });
  });
}

/* ============================================================
   LAZY IMAGE LOADING
   ============================================================ */
function initLazyImages() {
  const images = document.querySelectorAll('img');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  images.forEach(img => observer.observe(img));
}

/* ============================================================
   NAV LINK ACTIVE ON SCROLL (enhanced)
   ============================================================ */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop - 120;
      if (window.scrollY >= offset) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

/* ============================================================
   WHATSAPP FLOATING BUTTON (inject via JS)
   ============================================================ */
function injectWhatsApp() {
  const btn = document.createElement('a');
  btn.href = 'https://wa.me/96566346668';
  btn.target = '_blank';
  btn.setAttribute('aria-label', 'WhatsApp');
  btn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    z-index: 999;
    box-shadow: 0 8px 24px rgba(37,211,102,0.4);
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  `;
  btn.textContent = '💬';
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
    btn.style.boxShadow = '0 12px 32px rgba(37,211,102,0.5)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0 8px 24px rgba(37,211,102,0.4)';
  });
  document.body.appendChild(btn);

  // Animate in after loader
  gsap.fromTo(btn, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 3, ease: 'back.out(2)' });
}

/* ============================================================
   MENU CARD HOVER GLASS EFFECT
   ============================================================ */
function initMenuHover() {
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

/* ============================================================
   WORD-BY-WORD TEXT ANIMATION (hero title enhancement)
   ============================================================ */
function animateHeroWords() {
  // Done via GSAP in initHeroAnimations — this is intentional
}

/* ============================================================
   WINDOW RESIZE HANDLER
   ============================================================ */
function initResize() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
}

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backTop';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   PREVENT LAYOUT SHIFT ON THEME/LANG CHANGE
   ============================================================ */
function stabilizeLayout() {
  // Force repaint on sections after theme change
  document.getElementById('themeToggle').addEventListener('click', () => {
    setTimeout(() => ScrollTrigger.refresh(), 350);
  });
  document.getElementById('langToggle').addEventListener('click', () => {
    setTimeout(() => ScrollTrigger.refresh(), 350);
  });
}

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Prevent flash
  document.body.style.overflow = 'hidden';

  // Core init
  initLoader();
  initCursor();
  initParticles();
  initHeader();
  initMobileMenu();
  initLanguage();
  initTheme();
  initMenuTabs();
  initSmoothScroll();
  initHeroMouseParallax();
  initSignatureParallax();
  initEventsParallax();
  initImgTilt();
  initLazyImages();
  initNavHighlight();
  injectWhatsApp();
  initMenuHover();
  initMagnetic();
  initBackToTop();
  stabilizeLayout();
  initResize();

  // Scroll animations (wait slight delay for DOM paint)
  setTimeout(() => {
    initScrollAnimations();
    initReviews();
  }, 100);
});
