/* Trinity Spice - Interactive Experience */

(function () {
  'use strict';

  const state = {
    lang: localStorage.getItem('trinity-lang') || 'en',
    theme: localStorage.getItem('trinity-theme') || 'light',
    isMobile: window.matchMedia('(pointer: coarse)').matches
  };

  const body = document.body;
  const html = document.documentElement;
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const loader = document.getElementById('loader');
  const toast = document.getElementById('toast');
  const reservationForm = document.getElementById('reservationForm');
  const particlesContainer = document.getElementById('particles');

  /* ===== Init ===== */
  function init() {
    applyTheme(state.theme);
    applyLang(state.lang);
    buildParticles();
    bindEvents();
    setupAnimations();
    setTimeout(hideLoader, 900);
  }

  /* ===== Loader ===== */
  function hideLoader() {
    loader.classList.add('hidden');
    entranceSequence();
  }

  /* ===== Theme ===== */
  function applyTheme(theme) {
    state.theme = theme;
    body.setAttribute('data-theme', theme);
    localStorage.setItem('trinity-theme', theme);
  }

  function toggleTheme() {
    const next = state.theme === 'light' ? 'dark' : 'light';
    gsap.to(body, {
      opacity: 0.85,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      onComplete: () => applyTheme(next)
    });
  }

  /* ===== Language / RTL ===== */
  function applyLang(lang) {
    state.lang = lang;
    html.lang = lang === 'ar' ? 'ar' : 'en';
    body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    langLabel.textContent = lang === 'ar' ? 'EN' : 'AR';
    localStorage.setItem('trinity-lang', lang);

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('input, textarea, select').forEach(input => {
      input.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    });
  }

  function toggleLang() {
    const next = state.lang === 'ar' ? 'en' : 'ar';
    gsap.to(body, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        applyLang(next);
        gsap.to(body, { opacity: 1, duration: 0.25 });
      }
    });
  }

  /* ===== Mobile Menu ===== */
  function toggleMenu(forceClose) {
    const isOpen = mobileMenu.classList.contains('open');
    if (forceClose || isOpen) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      body.style.overflow = '';
    } else {
      hamburger.classList.add('active');
      mobileMenu.classList.add('open');
      body.style.overflow = 'hidden';
    }
  }

  /* ===== Navbar Scroll ===== */
  function handleScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  /* ===== Smooth Scroll ===== */
  function smoothScroll(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    toggleMenu(true);
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: target, offsetY: 70 },
      ease: 'power3.inOut'
    });
  }

  /* ===== Menu Tabs ===== */
  function switchTab(tabName) {
    document.querySelectorAll('.menu-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.menu-panel').forEach(panel => {
      const isActive = panel.dataset.panel === tabName;
      if (isActive) {
        panel.classList.add('active');
        gsap.fromTo(panel.querySelectorAll('.dish-card'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
      } else {
        panel.classList.remove('active');
      }
    });
  }

  /* ===== Lightbox ===== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    body.style.overflow = '';
  }

  /* ===== Form ===== */
  function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    if (!name || !phone) return;

    const date = document.getElementById('date').value;
    const guests = document.getElementById('guests').value;
    const requests = document.getElementById('requests').value.trim();
    const message = `Reservation request from Trinity Spice website%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}%0AGuests: ${guests}%0ARequests: ${requests || 'None'}`;

    showToast(state.lang === 'ar' ? 'تم إرسال الحجز بنجاح' : 'Reservation sent successfully');
    reservationForm.reset();

    setTimeout(() => {
      window.open(`https://wa.me/96560007242?text=${message}`, '_blank', 'noopener');
    }, 600);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ===== Magnetic Buttons ===== */
  function initMagnetic() {
    if (state.isMobile) return;
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  /* ===== 3D Tilt Cards ===== */
  function initTilt() {
    if (state.isMobile) return;
    document.querySelectorAll('.dish-card, .review-card, .feature-card, .info-card, .trinity-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 10,
          rotateX: -y * 10,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 900
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
      });
    });
  }

  /* ===== Spice Particles ===== */
  function buildParticles() {
    if (state.isMobile) return;
    const count = 18;
    const colors = ['#d4a017', '#f4c430', '#c23b22', '#8b4513'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 40 + 12;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      particlesContainer.appendChild(p);

      gsap.to(p, {
        y: `random(-120, 120)`,
        x: `random(-80, 80)`,
        opacity: `random(0.04, 0.14)`,
        duration: `random(8, 18)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  /* ===== Entrance Animations ===== */
  function entranceSequence() {
    const tl = gsap.timeline();
    tl.from('.nav', { y: -30, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .from('.hero-tagline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .from('.hero-actions .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.7)' }, '-=0.5')
      .from('.hero-stat', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
      .from('.hero-bg img', { scale: 1.25, duration: 2.2, ease: 'power2.out' }, 0);
  }

  /* ===== Scroll Animations ===== */
  function setupAnimations() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.about-frame').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 80%' },
        rotateY: -25, opacity: 0, duration: 1.2, ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.trinity-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        y: 40, opacity: 0, rotateX: 15, duration: 0.7, delay: i * 0.12, ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.dish-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        y: 50, opacity: 0, rotateX: 10, duration: 0.7, delay: (i % 3) * 0.1, ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        y: 50, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.info-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%' },
        x: state.lang === 'ar' ? 40 : -40, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power2.out'
      });
    });

    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%' },
        scale: 0.85, opacity: 0, duration: 0.6, delay: i * 0.06, ease: 'back.out(1.4)'
      });
    });

    gsap.utils.toArray('.footer-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%' },
        y: 30, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out'
      });
    });

    gsap.to('.hero-bg img', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      y: 120, ease: 'none'
    });
  }

  /* ===== Reviews Drag Scroll ===== */
  function initReviewDrag() {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', e => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mouseup', () => { isDown = false; track.style.cursor = 'grab'; });
    track.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
    track.style.cursor = 'grab';
  }

  /* ===== Logo Float ===== */
  function initLogoFloat() {
    gsap.to('.logo-mark', {
      rotateY: 360,
      duration: 12,
      repeat: -1,
      ease: 'none'
    });
  }

  /* ===== Events ===== */
  function bindEvents() {
    themeToggle.addEventListener('click', toggleTheme);
    langToggle.addEventListener('click', toggleLang);
    hamburger.addEventListener('click', () => toggleMenu());
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', smoothScroll));
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      if (!a.closest('.mobile-menu')) a.addEventListener('click', smoothScroll);
    });
    window.addEventListener('scroll', handleScroll, { passive: true });

    document.getElementById('menuTabs').addEventListener('click', e => {
      if (e.target.classList.contains('menu-tab')) {
        switchTab(e.target.dataset.tab);
      }
    });

    document.getElementById('galleryGrid').addEventListener('click', e => {
      const item = e.target.closest('.gallery-item');
      if (item) openLightbox(item.dataset.src);
    });

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
    });

    reservationForm.addEventListener('submit', handleFormSubmit);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeLightbox();
        toggleMenu(true);
      }
    });

    window.addEventListener('resize', () => {
      state.isMobile = window.matchMedia('(pointer: coarse)').matches;
    });
  }

  /* ===== Start ===== */
  window.addEventListener('DOMContentLoaded', () => {
    init();
    initMagnetic();
    initTilt();
    initReviewDrag();
    initLogoFloat();
  });
})();
