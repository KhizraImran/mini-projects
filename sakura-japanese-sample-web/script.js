/* ============================================================
   SAKURA JAPANESE RESTAURANT — PREMIUM JAVASCRIPT
   Vanilla JS + GSAP | No Frameworks
   ============================================================ */

'use strict';

/* ── GSAP SETUP ─────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);
// Note: SplitText requires GSAP Club; we'll implement our own splitter
const EASE_OUT  = 'power4.out';
const EASE_IN   = 'power3.in';
const EASE_BACK = 'back.out(1.2)';

/* ── UTILITY ─────────────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const lang = () => document.documentElement.getAttribute('data-lang') || 'en';

/* ── PRELOADER ──────────────────────────────────────────────── */
(function initPreloader() {
  const preloader = qs('#preloader');
  const tl = gsap.timeline({
    onComplete: () => {
      preloader.style.pointerEvents = 'none';
      gsap.to(preloader, { opacity: 0, duration: 0.6, ease: EASE_IN, onComplete: () => {
        preloader.style.display = 'none';
        initHeroAnimations();
      }});
    }
  });
  tl.to('.preloader-kanji', { opacity: 1, duration: 0 })
    .to('.preloader-fill', { width: '100%', duration: 2.2, ease: 'power2.out' }, 0)
    .add(() => {}, '+=0.3');
})();

/* ── CUSTOM CURSOR ───────────────────────────────────────────── */
(function initCursor() {
  const dot  = qs('#cursorDot');
  const ring = qs('#cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' });
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    gsap.set(ring, { x: rx, y: ry });
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover states
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest('a, button, .menu-card, .gallery-item, .why-card, .magnetic-btn');
    if (el) ring.classList.add('hovered');
    else ring.classList.remove('hovered');
  });

  document.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
  });
})();

/* ── MAGNETIC BUTTONS ────────────────────────────────────────── */
(function initMagneticButtons() {
  const btns = qsa('.magnetic-btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: EASE_BACK });
    });
  });
})();

/* ── HEADER SCROLL ───────────────────────────────────────────── */
(function initHeader() {
  const header = qs('#mainHeader');
  let lastY = 0;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        // Hide on scroll down, show on scroll up
        if (y > lastY + 5 && y > 200) {
          gsap.to(header, { yPercent: -100, duration: 0.4, ease: EASE_IN });
        } else if (y < lastY - 5) {
          gsap.to(header, { yPercent: 0, duration: 0.5, ease: EASE_OUT });
        }
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── MOBILE MENU ─────────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger   = qs('#hamburger');
  const mobileMenu  = qs('#mobileMenu');
  const closeBtn    = qs('#mobileMenuClose');
  const overlay     = qs('#mobileOverlay');
  const mobileLinks = qsa('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('show');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(mobileLinks,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: EASE_OUT, delay: 0.2 }
    );
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
})();

/* ── THEME TOGGLE ────────────────────────────────────────────── */
(function initTheme() {
  const html     = document.documentElement;
  const buttons  = qsa('#themeToggle, #mobileThemeToggle');
  const saved    = localStorage.getItem('sakura-theme') || 'dark';

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('sakura-theme', theme);
  }

  setTheme(saved);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      gsap.to('body', {
        opacity: 0.96,
        duration: 0.15,
        onComplete: () => {
          setTheme(next);
          gsap.to('body', { opacity: 1, duration: 0.3 });
        }
      });
    });
  });
})();

/* ── LANGUAGE TOGGLE ─────────────────────────────────────────── */
(function initLanguage() {
  const html    = document.documentElement;
  const buttons = qsa('#langToggle, #mobileLangToggle');
  const saved   = localStorage.getItem('sakura-lang') || 'en';

  function setLang(l) {
    html.setAttribute('data-lang', l);
    html.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('lang', l === 'ar' ? 'ar' : 'en');
    localStorage.setItem('sakura-lang', l);
    applyTranslations(l);
    // Update ScrollTrigger after layout changes
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }

  function applyTranslations(l) {
    qsa('[data-en], [data-ar]').forEach(el => {
      const text = el.getAttribute(`data-${l}`);
      if (text) el.textContent = text;
    });
    // Placeholder for inputs if any
    qsa('[data-placeholder-en], [data-placeholder-ar]').forEach(el => {
      const ph = el.getAttribute(`data-placeholder-${l}`);
      if (ph) el.placeholder = ph;
    });
  }

  setLang(saved);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-lang');
      const next = current === 'en' ? 'ar' : 'en';
      gsap.to('.section-container, .hero-content, .footer', {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setLang(next);
          gsap.to('.section-container, .hero-content, .footer', { opacity: 1, duration: 0.35, ease: EASE_OUT });
        }
      });
    });
  });
})();

/* ── HERO ANIMATIONS ─────────────────────────────────────────── */
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

  tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0)
    .fromTo('.hero-kanji-large',
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.4 }, 0.1)
    .fromTo('.hero-title-line:nth-child(1)',
      { opacity: 0, y: 60, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1 }, 0.2)
    .fromTo('.hero-title-line:nth-child(2)',
      { opacity: 0, y: 60, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1 }, 0.38)
    .fromTo('.hero-desc',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }, 0.55)
    .fromTo('.hero-actions .btn-primary',
      { opacity: 0, y: 20, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 0.68)
    .fromTo('.hero-actions .btn-secondary',
      { opacity: 0, y: 20, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 0.76)
    .fromTo('.hero-stat',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.6 }, 0.85)
    .fromTo('.hero-scroll',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 }, 1.1)
    .fromTo('.hero-bg-img',
      { scale: 1.08 },
      { scale: 1.03, duration: 2.5, ease: 'power2.out' }, 0);

  // Subtle hero parallax on mouse move
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    gsap.to('.hero-bg-img', { x: dx * -18, y: dy * -12, duration: 1.5, ease: 'power1.out' });
    gsap.to('.hero-kanji-large', { x: dx * 15, y: dy * 10, duration: 1.5, ease: 'power1.out' });
  });
}

/* ── SAKURA PETALS CANVAS ────────────────────────────────────── */
(function initSakuraPetals() {
  const canvas  = qs('#sakuraCanvas');
  const ctx     = canvas.getContext('2d');
  let W, H, petals = [];
  const COUNT = 28;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Petal {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x     = Math.random() * (W || window.innerWidth);
      this.y     = init ? Math.random() * (H || window.innerHeight) : -30;
      this.size  = 4 + Math.random() * 8;
      this.speedY = 0.4 + Math.random() * 0.9;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.angle  = Math.random() * Math.PI * 2;
      this.spin   = (Math.random() - 0.5) * 0.025;
      this.opacity = 0.15 + Math.random() * 0.45;
      this.wave   = Math.random() * Math.PI * 2;
      this.waveAmp = 0.5 + Math.random() * 1.5;
    }
    update() {
      this.y    += this.speedY;
      this.wave += 0.022;
      this.x    += Math.sin(this.wave) * this.waveAmp + this.speedX;
      this.angle += this.spin;
      if (this.y > (H || window.innerHeight) + 30 || this.x < -50 || this.x > (W || window.innerWidth) + 50) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.opacity;
      // Petal shape
      ctx.beginPath();
      ctx.fillStyle = '#F5D7DC';
      ctx.ellipse(0, 0, this.size * 0.4, this.size, 0, 0, Math.PI * 2);
      ctx.fill();
      // Inner vein
      ctx.strokeStyle = 'rgba(178,34,34,0.25)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.lineTo(0, this.size);
      ctx.stroke();
      ctx.restore();
    }
  }

  function init() {
    resize();
    petals = Array.from({ length: COUNT }, () => new Petal());
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  animate();
})();

/* ── SCROLL ANIMATIONS ───────────────────────────────────────── */
(function initScrollAnimations() {

  // Section labels + titles
  qsa('.section-label').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  qsa('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
      }
    );
  });

  qsa('.section-subtitle').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // About section
  gsap.fromTo('.about-image-col',
    { opacity: 0, x: -60 },
    { opacity: 1, x: 0, duration: 1, ease: EASE_OUT,
      scrollTrigger: { trigger: '.about-section', start: 'top 75%', toggleActions: 'play none none none' }
    }
  );
  gsap.fromTo('.about-text-col',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 1, delay: 0.15, ease: EASE_OUT,
      scrollTrigger: { trigger: '.about-section', start: 'top 75%', toggleActions: 'play none none none' }
    }
  );
  qsa('.about-img-main, .about-img-accent').forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 1000 + i * 300);
    ScrollTrigger.create({
      trigger: '.about-section',
      start: 'top 70%',
      onEnter: () => {
        setTimeout(() => el.classList.add('revealed'), 200 + i * 280);
      }
    });
  });

  gsap.fromTo('.about-divider',
    { scaleX: 0, transformOrigin: 'left' },
    { scaleX: 1, duration: 0.8, ease: EASE_OUT,
      scrollTrigger: { trigger: '.about-divider', start: 'top 88%' }
    }
  );

  qsa('.about-body').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  qsa('.about-pillar').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 15, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.1, ease: EASE_OUT,
        scrollTrigger: { trigger: '.about-pillars', start: 'top 88%' }
      }
    );
  });

  // Menu cards stagger
  gsap.fromTo('.menu-card',
    { opacity: 0, y: 50, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.65, ease: EASE_OUT,
      scrollTrigger: { trigger: '.menu-grid', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );

  // Why cards
  gsap.fromTo('.why-card',
    { opacity: 0, y: 45, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: EASE_OUT,
      scrollTrigger: { trigger: '.why-grid', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );

  // Gallery reveal
  qsa('.gallery-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40, scale: 0.93 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, delay: i * 0.06, ease: EASE_OUT,
        scrollTrigger: { trigger: '.gallery-masonry', start: 'top 82%', toggleActions: 'play none none none' }
      }
    );
  });

  // Testimonials
  gsap.fromTo('.testimonial-card',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: EASE_OUT,
      scrollTrigger: { trigger: '.testimonials-track', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );

  // Contact items
  qsa('.contact-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // Map reveal
  gsap.fromTo('.map-container',
    { opacity: 0, scale: 0.96 },
    { opacity: 1, scale: 1, duration: 0.9, ease: EASE_OUT,
      scrollTrigger: { trigger: '.map-container', start: 'top 80%', toggleActions: 'play none none none' }
    }
  );

  // Reservation section
  gsap.fromTo('.reservation-content > *',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: EASE_OUT,
      scrollTrigger: { trigger: '.reservation-section', start: 'top 75%', toggleActions: 'play none none none' }
    }
  );

  // Footer reveal
  gsap.fromTo('.footer-top > *',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: EASE_OUT,
      scrollTrigger: { trigger: '.footer', start: 'top 90%', toggleActions: 'play none none none' }
    }
  );

  // Parallax on reservation bg
  gsap.to('.reservation-bg img', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: {
      trigger: '.reservation-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Hero bg slow parallax
  gsap.to('.hero-bg-img', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

})();

/* ── MENU FILTER TABS ────────────────────────────────────────── */
(function initMenuTabs() {
  const tabs  = qsa('.menu-tab');
  const cards = qsa('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-cat');

      // Active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter
      const toHide = cards.filter(c => cat !== 'all' && c.getAttribute('data-cat') !== cat);
      const toShow = cards.filter(c => cat === 'all' || c.getAttribute('data-cat') === cat);

      gsap.to(toHide, {
        opacity: 0, scale: 0.9, y: 20, duration: 0.3, ease: 'power2.in',
        onComplete: () => { toHide.forEach(c => { c.style.display = 'none'; }); }
      });

      setTimeout(() => {
        toShow.forEach(c => {
          c.style.display = '';
          gsap.fromTo(c, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: EASE_OUT });
        });
      }, 300);
    });
  });
})();

/* ── TESTIMONIALS SLIDER ─────────────────────────────────────── */
(function initTestimonials() {
  const track = qs('#testimonialsTrack');
  const cards = qsa('.testimonial-card');
  const prev  = qs('#tPrev');
  const next  = qs('#tNext');
  const dots  = qs('#tDots');

  if (!track || cards.length === 0) return;

  let current  = 0;
  let itemsPerView = 3;
  let autoTimer;
  const maxIndex = () => Math.max(0, cards.length - itemsPerView);

  function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  }

  function buildDots() {
    dots.innerHTML = '';
    const total = maxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 't-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dots.appendChild(dot);
    }
  }

  function updateDots() {
    qsa('.t-dot', dots).forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    const cardW = cards[0].offsetWidth + 24;
    gsap.to(track, {
      x: -current * cardW,
      duration: 0.65,
      ease: EASE_OUT
    });
    updateDots();
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      const next = current >= maxIndex() ? 0 : current + 1;
      goTo(next);
    }, 5000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? goTo(current + 1) : goTo(current - 1); }
    startAuto();
  }, { passive: true });

  function init() {
    itemsPerView = getItemsPerView();
    buildDots();
    goTo(Math.min(current, maxIndex()));
    startAuto();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      itemsPerView = getItemsPerView();
      current = 0;
      buildDots();
      goTo(0);
    }, 200);
  });

  init();
})();

/* ── SMOOTH ANCHOR SCROLLING ─────────────────────────────────── */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    e.preventDefault();
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 88;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    gsap.to(window, { scrollTo: { y: top, autoKill: false }, duration: 1.1, ease: 'power3.inOut' });
  });
})();

/* ── BACK TO TOP ─────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = qs('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' });
  });
})();

/* ── GALLERY HOVER EFFECTS ───────────────────────────────────── */
(function initGalleryHover() {
  const items = qsa('.gallery-item');
  items.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;
    item.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.08, duration: 0.7, ease: EASE_OUT });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.7, ease: EASE_OUT });
    });
  });
})();

/* ── MENU CARD 3D TILT ───────────────────────────────────────── */
(function initCardTilt() {
  const cards = qsa('.menu-card, .why-card');
  if (window.matchMedia('(hover: none)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width / 2;
      const cy    = rect.top + rect.height / 2;
      const rx    = ((e.clientY - cy) / rect.height) * -7;
      const ry    = ((e.clientX - cx) / rect.width) * 7;
      gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 800, duration: 0.4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: EASE_BACK });
    });
  });
})();

/* ── FLOATING BADGE ANIMATION ────────────────────────────────── */
(function initFloatingBadge() {
  gsap.to('.about-badge', {
    y: -8,
    duration: 2.2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
  });
})();

/* ── NUMBER COUNTER ANIMATION ────────────────────────────────── */
(function initCounters() {
  const stats = qsa('.hero-stat-num');
  stats.forEach(el => {
    const text = el.textContent;
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const finalNum = parseFloat(numMatch[0]);
    const suffix = text.replace(numMatch[0], '');

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: finalNum,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            const v = Math.round(obj.val * 10) / 10;
            el.textContent = (Number.isInteger(finalNum) ? Math.round(v) : v) + suffix;
          }
        });
      }
    });
  });
})();

/* ── HERO STAT DIVIDERS ──────────────────────────────────────── */
(function animateStatDividers() {
  gsap.fromTo('.hero-stat-divider',
    { scaleY: 0 },
    { scaleY: 1, duration: 0.6, stagger: 0.15, ease: EASE_OUT, delay: 1.3 }
  );
})();

/* ── NAV GOLD UNDERLINE PROGRESS ────────────────────────────── */
(function initNavProgress() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = '';
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
})();

/* ── HEADER ENTRANCE ─────────────────────────────────────────── */
(function initHeaderEntrance() {
  gsap.fromTo('#mainHeader',
    { yPercent: -100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: 1, ease: EASE_OUT, delay: 2.8 }
  );
})();

/* ── MAP IFRAME FALLBACK ─────────────────────────────────────── */
(function fixMapIframe() {
  // Use the provided Google Maps share link in an embed-friendly way
  const iframe = qs('.map-container iframe');
  if (iframe) {
    // Attempt to load with the real embed; if blocked, show styled fallback
    iframe.addEventListener('error', () => {
      const parent = iframe.parentElement;
      iframe.style.display = 'none';
      const fallback = document.createElement('a');
      fallback.href = 'https://share.google/A9uo3zZp4HbyMNoDT';
      fallback.target = '_blank';
      fallback.rel = 'noopener';
      fallback.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:16px;color:var(--gold);font-family:var(--font-heading);font-size:24px;text-decoration:none;';
      fallback.innerHTML = '<span style="font-size:48px">📍</span><span>Open in Google Maps</span>';
      parent.insertBefore(fallback, parent.firstChild);
    });
  }
})();

/* ── RESIZE HANDLER ──────────────────────────────────────────── */
(function initResizeHandler() {
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  });
})();

/* ── ACCESSIBILITY ───────────────────────────────────────────── */
(function initAccessibility() {
  // Escape closes mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      qs('#mobileMenu')?.classList.remove('open');
      qs('#mobileOverlay')?.classList.remove('show');
      qs('#hamburger')?.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Focus trap in mobile menu
  const menu = qs('#mobileMenu');
  if (menu) {
    menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !menu.classList.contains('open')) return;
      const focusable = qsa('a, button', menu).filter(el => !el.disabled);
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
  }
})();

/* ── GSAP ScrollTo Plugin polyfill (if not available) ───────── */
if (!gsap.plugins?.scrollTo) {
  // Fallback smooth scroll
  const orig = window.gsap?.to;
  if (orig) {
    const _to = gsap.to.bind(gsap);
    gsap.to = function(target, vars) {
      if (target === window && vars.scrollTo !== undefined) {
        const dest = typeof vars.scrollTo === 'object' ? vars.scrollTo.y : vars.scrollTo;
        const duration = (vars.duration || 1) * 1000;
        const start = window.scrollY;
        const change = dest - start;
        const startTime = performance.now();

        function easeInOutCubic(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function step(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, start + change * easeInOutCubic(progress));
          if (progress < 1) requestAnimationFrame(step);
          else if (vars.onComplete) vars.onComplete();
        }
        requestAnimationFrame(step);
        return { kill: () => {} };
      }
      return _to(target, vars);
    };
  }
}

/* ── INIT LOG ─────────────────────────────────────────────────── */
console.log('%c桜 Sakura Japanese Restaurant', 'font-size:18px;color:#C8A96A;font-family:serif;font-style:italic;');
console.log('%cPremium Website · Al Thuraya City, Kuwait', 'font-size:12px;color:#B22222;');
