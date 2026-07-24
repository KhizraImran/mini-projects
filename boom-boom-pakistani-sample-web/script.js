/**
 * ═══════════════════════════════════════════════════════════════════
 * BOOM BOOM PAKISTANI RESTAURANT — Premium JavaScript
 * GSAP Animations · Bilingual RTL/LTR · Dark/Light Theme
 * Particle System · Custom Cursor · Smooth Interactions
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

/* ──────────────────────────────────────────────────────────────────
   0. WAIT FOR GSAP & DOM
   ────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Register GSAP plugins */
  gsap.registerPlugin(ScrollTrigger);

  /* ─────────────────────────────────────────────────────────────────
     1. STATE
     ───────────────────────────────────────────────────────────────── */
  const state = {
    lang: localStorage.getItem('bb_lang') || 'en',
    theme: localStorage.getItem('bb_theme') || 'dark',
    menuOpen: false,
    testiIndex: 0,
    testiAutoTimer: null,
  };

  /* ─────────────────────────────────────────────────────────────────
     2. UTILITY
     ───────────────────────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─────────────────────────────────────────────────────────────────
     3. PRELOADER
     ───────────────────────────────────────────────────────────────── */
  function initPreloader() {
    const preloader = $('#preloader');
    const fill      = preloader.querySelector('.preloader-fill');
    const tl        = gsap.timeline();

    tl
      .to('.pl-boom1', {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2
      })
      .to('.pl-boom2', {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out'
      }, '-=0.4')
      .to('.preloader-tagline', {
        opacity: 1, duration: 0.5, ease: 'power2.out'
      }, '-=0.2');

    /* Fake loading progress */
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        /* Dismiss preloader */
        gsap.to(preloader, {
          opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.inOut',
          onComplete: () => {
            preloader.classList.add('hidden');
            document.body.classList.remove('preloader-active');
            initHeroAnimations();
          }
        });
      }
      fill.style.width = progress + '%';
    }, 80);
  }

  /* ─────────────────────────────────────────────────────────────────
     4. CUSTOM CURSOR
     ───────────────────────────────────────────────────────────────── */
  function initCursor() {
    const dot  = $('#cursor-dot');
    const ring = $('#cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    /* Smooth ring follow */
    function animRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animRing);
    }
    animRing();

    /* Hover effects */
    const hoverTargets = $$('a, button, .menu-card, .why-card, .gal-item, .testi-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '0.6';
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     5. PARTICLE CANVAS (Smoke / Ambient)
     ───────────────────────────────────────────────────────────────── */
  function initParticleCanvas() {
    const canvas = $('#particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = H + Math.random() * 100;
        this.r  = Math.random() * 60 + 20;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 0.5 + 0.2);
        this.alpha = 0;
        this.maxAlpha = Math.random() * 0.06 + 0.02;
        this.growing = true;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.growing) {
          this.alpha += 0.003;
          if (this.alpha >= this.maxAlpha) this.growing = false;
        } else {
          this.alpha -= 0.002;
        }
        if (this.alpha <= 0 || this.y < -this.r) this.reset();
      }
      draw() {
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, `rgba(201,161,74,${this.alpha})`);
        grd.addColorStop(1, `rgba(201,161,74,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 25; i++) {
        const p = new Particle();
        p.y = Math.random() * H; /* spread initially */
        particles.push(p);
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(loop);
    }

    resize();
    initParticles();
    loop();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ─────────────────────────────────────────────────────────────────
     6. HERO ANIMATIONS
     ───────────────────────────────────────────────────────────────── */
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      .to('.hero-badge', { opacity: 1, y: 0, duration: 0.7, delay: 0.1 })
      .to('.ht-w1', { opacity: 1, y: '0%', duration: 0.9 }, '-=0.3')
      .to('.ht-divider', { opacity: 1, duration: 0.5 }, '-=0.4')
      .to('.ht-w2', { opacity: 1, y: '0%', duration: 0.9 }, '-=0.7')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero-tagline-wrap', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');

    /* Parallax on scroll */
    gsap.to('.hero-bg-img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    /* Hero content subtle parallax */
    gsap.to('.hero-content', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     7. SCROLL TRIGGER ANIMATIONS
     ───────────────────────────────────────────────────────────────── */
  function initScrollAnimations() {

    /* Generic reveal helper */
    function revealOnScroll(selector, vars = {}) {
      $$( selector ).forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50, ...vars.from },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power3.out',
            ...vars.to,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              ...vars.st,
            }
          }
        );
      });
    }

    /* Section labels */
    revealOnScroll('.section-label', { from: { y: 20, opacity: 0 }, to: { duration: 0.6 } });

    /* Section titles */
    $$('.section-title').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    /* Section descriptions */
    revealOnScroll('.section-desc', { from: { y: 25 }, to: { delay: 0.15, duration: 0.8 } });

    /* About section */
    gsap.from('.av-frame1', {
      x: -60, opacity: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-visual', start: 'top 80%' }
    });
    gsap.from('.av-frame2', {
      x: 60, opacity: 0, duration: 1.1, delay: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-visual', start: 'top 80%' }
    });
    gsap.from('.av-badge', {
      scale: 0.5, opacity: 0, duration: 0.8, delay: 0.5, ease: 'back.out(1.7)',
      scrollTrigger: { trigger: '.about-visual', start: 'top 80%' }
    });

    revealOnScroll('.about-title', { from: { y: 30 }, to: { duration: 1 } });
    revealOnScroll('.about-desc', { from: { y: 20 }, to: { delay: 0.2 } });

    gsap.from('.pillar', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.about-pillars', start: 'top 85%' }
    });

    /* Menu cards stagger */
    ScrollTrigger.batch('.menu-card', {
      onEnter: (els) => {
        gsap.from(els, {
          y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        });
      },
      start: 'top 88%',
    });

    /* Why cards stagger */
    ScrollTrigger.batch('.why-card', {
      onEnter: (els) => {
        gsap.from(els, {
          y: 40, opacity: 0, scale: 0.96, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        });
      },
      start: 'top 88%',
    });

    /* Gallery items */
    ScrollTrigger.batch('.gal-item', {
      onEnter: (els) => {
        gsap.from(els, {
          scale: 0.92, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        });
      },
      start: 'top 88%',
    });

    /* Testimonials reveal */
    gsap.from('.testi-card', {
      y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonials-track', start: 'top 85%' }
    });

    /* Reservation content */
    gsap.from('.res-title', {
      y: 40, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.res-content', start: 'top 80%' }
    });
    gsap.from('.res-desc', {
      y: 30, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.res-content', start: 'top 80%' }
    });
    gsap.from('.res-ctas', {
      y: 25, opacity: 0, duration: 0.8, delay: 0.35, ease: 'power3.out',
      scrollTrigger: { trigger: '.res-content', start: 'top 80%' }
    });
    gsap.from('.res-info', {
      y: 20, opacity: 0, duration: 0.7, delay: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: '.res-content', start: 'top 80%' }
    });

    /* Contact cards */
    gsap.from('.ci-card', {
      x: -30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-info', start: 'top 85%' }
    });

    gsap.from('.map-container', {
      x: 40, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-map', start: 'top 85%' }
    });

    /* Footer */
    gsap.from('.footer-brand, .footer-links, .footer-contact', {
      y: 20, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.site-footer', start: 'top 90%' }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     8. MAGNETIC BUTTON EFFECT
     ───────────────────────────────────────────────────────────────── */
  function initMagneticButtons() {
    if (window.innerWidth < 769) return;

    $$('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect   = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top  + rect.height / 2;
        const dx      = (e.clientX - centerX) * 0.25;
        const dy      = (e.clientY - centerY) * 0.25;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     9. HEADER SCROLL BEHAVIOR
     ───────────────────────────────────────────────────────────────── */
  function initHeader() {
    const nav = $('.nav-craft');
    if (!nav) return;

    ScrollTrigger.create({
      start: 100,
      onEnter: () => nav.classList.add('scrolled'),
      onLeaveBack: () => nav.classList.remove('scrolled'),
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     10. MOBILE MENU
     ───────────────────────────────────────────────────────────────── */
  function initMobileMenu() {
    const burger     = $('#burgerBtn');
    const mobileMenu = $('#mobileMenu');
    const mobileLinks = $$('.mobile-link');

    if (!burger || !mobileMenu) return;

    function toggleMenu() {
      state.menuOpen = !state.menuOpen;
      burger.classList.toggle('open', state.menuOpen);
      mobileMenu.classList.toggle('open', state.menuOpen);
      document.body.style.overflow = state.menuOpen ? 'hidden' : '';
    }

    burger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (state.menuOpen) toggleMenu();
      });
    });

    /* Close on ESC */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.menuOpen) toggleMenu();
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     11. LANGUAGE TOGGLE (BILINGUAL EN / AR)
     ───────────────────────────────────────────────────────────────── */
  function applyLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('data-lang', lang);
    document.body.style.fontFamily = lang === 'ar'
      ? "'Cairo', 'Tajawal', sans-serif"
      : "'Manrope', sans-serif";

    /* Update all data-en / data-ar elements */
    $$('[data-en][data-ar]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text !== null) {
        /* Use innerHTML for elements with <br> */
        if (text.includes('<br') || el.tagName === 'H2' || el.tagName === 'H1') {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    /* Refresh ScrollTrigger after layout shift */
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }

  function initLangToggle() {
    const btn = $('#langToggle');
    if (!btn) return;

    /* Apply saved language */
    applyLanguage(state.lang);

    btn.addEventListener('click', () => {
      state.lang = state.lang === 'en' ? 'ar' : 'en';
      localStorage.setItem('bb_lang', state.lang);

      /* Animate toggle */
      gsap.to(btn, {
        scale: 0.9, duration: 0.1,
        onComplete: () => {
          applyLanguage(state.lang);
          gsap.to(btn, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     12. THEME TOGGLE (DARK / LIGHT)
     ───────────────────────────────────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function initThemeToggle() {
    const btn = $('#themeToggle');
    if (!btn) return;

    /* Apply saved theme */
    applyTheme(state.theme);

    btn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('bb_theme', state.theme);

      gsap.to(btn, {
        rotate: 360, duration: 0.5, ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(btn, { rotate: 0 });
        }
      });

      applyTheme(state.theme);
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     13. MENU FILTER
     ───────────────────────────────────────────────────────────────── */
  function initMenuFilter() {
    const filterBtns = $$('.mf-btn');
    const cards      = $$('.menu-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        /* Active state */
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        /* Filter cards with GSAP */
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          const show = filter === 'all' || cat === filter;

          if (show) {
            card.classList.remove('hidden');
            gsap.fromTo(card,
              { opacity: 0, scale: 0.94, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );
          } else {
            gsap.to(card, {
              opacity: 0, scale: 0.94, y: 10, duration: 0.3, ease: 'power2.in',
              onComplete: () => card.classList.add('hidden')
            });
          }
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     14. TESTIMONIALS SLIDER
     ───────────────────────────────────────────────────────────────── */
  function initTestimonials() {
    const track    = $('#testimonialsTrack');
    const dotsWrap = $('#testiDots');
    const prevBtn  = $('#testiPrev');
    const nextBtn  = $('#testiNext');

    if (!track) return;

    const cards     = $$('.testi-card', track);
    const totalCards = cards.length;
    let visibleCount = 3;

    function getVisibleCount() {
      if (window.innerWidth < 480)  return 1;
      if (window.innerWidth < 768)  return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    visibleCount = getVisibleCount();

    const maxIndex = Math.max(0, totalCards - visibleCount);

    /* Build dots */
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      $$('.testi-dot', dotsWrap).forEach((d, i) => {
        d.classList.toggle('active', i === state.testiIndex);
      });
    }

    function goTo(index) {
      state.testiIndex = Math.max(0, Math.min(index, maxIndex));
      const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 0;
      gsap.to(track, {
        x: -state.testiIndex * cardWidth,
        duration: 0.6,
        ease: 'power3.inOut',
      });
      updateDots();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(state.testiIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(state.testiIndex + 1));

    /* Auto-play */
    function startAuto() {
      state.testiAutoTimer = setInterval(() => {
        const next = state.testiIndex >= maxIndex ? 0 : state.testiIndex + 1;
        goTo(next);
      }, 5000);
    }

    function stopAuto() {
      clearInterval(state.testiAutoTimer);
    }

    startAuto();

    const wrap = $('.testimonials-track-wrap');
    if (wrap) {
      wrap.addEventListener('mouseenter', stopAuto);
      wrap.addEventListener('mouseleave', startAuto);
    }

    /* Touch/Swipe */
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? state.testiIndex + 1 : state.testiIndex - 1);
      }
    });

    /* Recalculate on resize */
    window.addEventListener('resize', () => {
      const newVisible = getVisibleCount();
      if (newVisible !== visibleCount) {
        visibleCount = newVisible;
        goTo(0);
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     15. MOUSE PARALLAX (Hero)
     ───────────────────────────────────────────────────────────────── */
  function initMouseParallax() {
    const hero  = $('.hero-section');
    const layer = $('#parallaxLayer');
    if (!hero || !layer) return;

    hero.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const mx = ((e.clientX - left) / width  - 0.5) * 2;
      const my = ((e.clientY - top)  / height - 0.5) * 2;

      gsap.to('.spice-particles', {
        x: mx * 15, y: my * 10,
        duration: 1.5, ease: 'power2.out',
      });
      gsap.to('.hero-bg-img', {
        x: mx * 10, y: my * 8,
        duration: 2, ease: 'power2.out',
      });
    });

    hero.addEventListener('mouseleave', () => {
      gsap.to('.spice-particles', { x: 0, y: 0, duration: 1.5, ease: 'power2.out' });
      gsap.to('.hero-bg-img', { x: 0, y: 0, duration: 2, ease: 'power2.out' });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     16. CARD 3D TILT (Menu Cards)
     ───────────────────────────────────────────────────────────────── */
  function initCardTilt() {
    if (window.innerWidth < 769) return;

    $$('.menu-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx   = rect.left + rect.width / 2;
        const cy   = rect.top  + rect.height / 2;
        const rx   = ((e.clientY - cy) / (rect.height / 2)) * -4;
        const ry   = ((e.clientX - cx) / (rect.width  / 2)) *  4;

        gsap.to(card, {
          rotateX: rx, rotateY: ry,
          transformPerspective: 800,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0, rotateY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     17. WHY CARDS HOVER SHIMMER
     ───────────────────────────────────────────────────────────────── */
  function initWhyCardShimmer() {
    $$('.why-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.wc-icon');
        if (icon) {
          gsap.fromTo(icon,
            { scale: 1, rotate: 0 },
            { scale: 1.2, rotate: 10, duration: 0.3, ease: 'back.out(2)',
              yoyo: true, repeat: 1 }
          );
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     18. GALLERY PARALLAX (Scroll-based)
     ───────────────────────────────────────────────────────────────── */
  function initGalleryParallax() {
    $$('.gal-item').forEach((item, i) => {
      const speed = (i % 3 === 0) ? -0.05 : (i % 3 === 1 ? 0.05 : -0.03);
      gsap.to(item.querySelector('img'), {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     19. SMOOTH ANCHOR SCROLLING
     ───────────────────────────────────────────────────────────────── */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId  = anchor.getAttribute('href');
        const targetEl  = $(targetId);
        if (!targetEl) return;

        e.preventDefault();

        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: targetEl, offsetY: 80 },
          ease: 'power3.inOut',
        });
      });
    });
  }

  /* GSAP ScrollTo plugin fallback if not loaded */
  if (!gsap.plugins || !gsap.plugins.scrollTo) {
    /* Simple fallback */
    function simpleScroll() {
      $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          const targetEl = $(targetId);
          if (!targetEl) return;
          e.preventDefault();
          const offset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        });
      });
    }
    simpleScroll();
  }

  /* ─────────────────────────────────────────────────────────────────
     20. NAV ACTIVE LINK ON SCROLL
     ───────────────────────────────────────────────────────────────── */
  function initNavActiveState() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const scrollY = window.scrollY;
        let current = '';

        sections.forEach(sec => {
          if (sec.offsetTop - 120 <= scrollY) {
            current = sec.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          const href = link.getAttribute('href').replace('#', '');
          link.style.color = href === current
            ? 'var(--gold)'
            : 'var(--text-secondary)';
        });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     21. FOOTER ORNAMENT ANIMATION
     ───────────────────────────────────────────────────────────────── */
  function initFooterAnim() {
    gsap.from('.footer-ornament', {
      opacity: 0, letterSpacing: '1em', duration: 1.2, ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer-ornament',
        start: 'top 95%',
        toggleActions: 'play none none none',
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     22. SPICE PARTICLE INTERACTIVITY
     ───────────────────────────────────────────────────────────────── */
  function initSpiceInteraction() {
    const spices = $$('.sp');

    gsap.to('.sp', {
      x: 'random(-20, 20)',
      y: 'random(-20, 20)',
      duration: 'random(2, 4)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.3, from: 'random' },
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     23. INTERSECTION OBSERVER FALLBACK
     ───────────────────────────────────────────────────────────────── */
  function initFallbackObserver() {
    /* Extra safety: ensure elements are visible even if GSAP fails */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
        }
      });
    }, { threshold: 0.1 });

    $$('.menu-card, .why-card, .gal-item, .testi-card, .ci-card').forEach(el => {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     24. ORDER BUTTON INTERACTION
     ───────────────────────────────────────────────────────────────── */
  function initOrderButtons() {
    $$('.mc-order').forEach(btn => {
      btn.addEventListener('click', () => {
        const card  = btn.closest('.menu-card');
        const title = card ? card.querySelector('.mc-title') : null;
        const dish  = title ? title.textContent : 'your dish';

        /* WhatsApp order */
        const msg = `Hello BOOM BOOM! I'd like to order: ${dish}`;
        const url = `https://wa.me/96594080612?text=${encodeURIComponent(msg)}`;

        gsap.to(btn, {
          scale: 0.92, duration: 0.1,
          onComplete: () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
        });

        setTimeout(() => window.open(url, '_blank'), 200);
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     25. GALLERY LIGHTBOX (Simple)
     ───────────────────────────────────────────────────────────────── */
  function initGalleryLightbox() {
    const items = $$('.gal-item');

    /* Create lightbox DOM */
    const lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.cssText = `
      position:fixed;inset:0;z-index:9000;background:rgba(22,22,22,0.97);
      display:flex;align-items:center;justify-content:center;
      opacity:0;pointer-events:none;cursor:zoom-out;padding:1rem;
    `;
    lb.innerHTML = `
      <button id="lbClose" style="position:absolute;top:1.5rem;right:1.5rem;
        font-size:1.5rem;color:#C9A14A;background:rgba(201,161,74,0.1);
        border:1px solid rgba(201,161,74,0.3);border-radius:50%;
        width:44px;height:44px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      <img id="lbImg" src="" alt="" style="max-width:90%;max-height:90vh;object-fit:contain;border-radius:8px;box-shadow:0 20px 80px rgba(0,0,0,0.8);" />
    `;
    document.body.appendChild(lb);

    const lbImg   = lb.querySelector('#lbImg');
    const lbClose = lb.querySelector('#lbClose');

    function openLb(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt;
      gsap.to(lb, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      lb.style.pointerEvents = 'all';
      document.body.style.overflow = 'hidden';
    }

    function closeLb() {
      gsap.to(lb, {
        opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          lb.style.pointerEvents = 'none';
          document.body.style.overflow = '';
          lbImg.src = '';
        }
      });
    }

    items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          const highRes = img.src.replace(/h=\d+/, 'h=900').replace(/w=\d+/, 'w=1400');
          openLb(highRes, img.alt);
        }
      });
    });

    lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLb(); });
    lb.addEventListener('click', closeLb);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lb.style.pointerEvents === 'all') closeLb();
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     26. GOLD SHIMMER ON TITLE HOVER
     ───────────────────────────────────────────────────────────────── */
  function initTitleHoverEffect() {
    $$('.about-title, .res-title').forEach(title => {
      title.addEventListener('mouseenter', () => {
        gsap.to(title, { color: 'var(--gold)', duration: 0.4, ease: 'power2.out' });
      });
      title.addEventListener('mouseleave', () => {
        gsap.to(title, { color: 'var(--text-primary)', duration: 0.4, ease: 'power2.out' });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     27. RESERVATION BG PARALLAX
     ───────────────────────────────────────────────────────────────── */
  function initReservationParallax() {
    gsap.to('.reservation-section .res-bg img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.reservation-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────
     28. INIT ALL
     ───────────────────────────────────────────────────────────────── */
  function init() {
    initPreloader();
    initCursor();
    initParticleCanvas();
    initHeader();
    initMobileMenu();
    initLangToggle();
    initThemeToggle();
    initMenuFilter();
    initTestimonials();
    initMouseParallax();
    initCardTilt();
    initWhyCardShimmer();
    initGalleryParallax();
    initScrollAnimations();
    initNavActiveState();
    initFooterAnim();
    initSpiceInteraction();
    initFallbackObserver();
    initOrderButtons();
    initGalleryLightbox();
    initTitleHoverEffect();
    initReservationParallax();
    initMagneticButtons();

    /* ScrollTo polyfill via GSAP if available */
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
      initSmoothScroll();
    }
  }

  init();

  /* ─────────────────────────────────────────────────────────────────
     29. RESIZE HANDLER
     ───────────────────────────────────────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });

  /* ─────────────────────────────────────────────────────────────────
     30. PERFORMANCE: PAUSE ANIMATIONS WHEN TAB HIDDEN
     ───────────────────────────────────────────────────────────────── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      gsap.globalTimeline.pause();
    } else {
      gsap.globalTimeline.resume();
    }
  });

}); /* END DOMContentLoaded */
