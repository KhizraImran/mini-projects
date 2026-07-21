/**
 * ============================================================
 * CHEANG'S RESTAURANT — PREMIUM JAVASCRIPT
 * Dark Oriental Elegance · Modern Chinese Luxury
 * ============================================================
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
   ============================================================ */
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const lerp = (a, b, t) => a + (b - a) * t;

/* ============================================================
   LOADING SCREEN
   ============================================================ */
class Loader {
  constructor() {
    this.el = $('#loader');
    this.minDuration = 2000; // minimum ms to show loader
    this.startTime = Date.now();
    this.init();
  }

  init() {
    document.body.classList.add('loading');
    window.addEventListener('load', () => this.hide());
    // Failsafe
    setTimeout(() => this.hide(), 5000);
  }

  hide() {
    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(0, this.minDuration - elapsed);
    setTimeout(() => {
      if (this.el) {
        this.el.classList.add('hidden');
        document.body.classList.remove('loading');
        // Trigger hero animations after loader
        setTimeout(() => document.dispatchEvent(new CustomEvent('loaderDone')), 400);
      }
    }, remaining);
  }
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
class CustomCursor {
  constructor() {
    this.cursor = $('#cursor');
    this.follower = $('#cursorFollower');
    this.mouse = { x: -100, y: -100 };
    this.followerPos = { x: -100, y: -100 };
    this.rafId = null;
    this.isHovering = false;

    if (!this.cursor || !this.follower) return;
    if (window.matchMedia('(hover: none)').matches) return;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursor.style.left = `${e.clientX}px`;
      this.cursor.style.top = `${e.clientY}px`;
    });

    // Hover state on interactive elements
    const hoverTargets = 'a, button, .menu__card, .experience__item, .testimonials__arrow, .testimonials__dot, .back-to-top';
    $$(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('cursor--hovering');
        this.follower.classList.add('cursor--hovering');
        this.isHovering = true;
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('cursor--hovering');
        this.follower.classList.remove('cursor--hovering');
        this.isHovering = false;
      });
    });

    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
      this.follower.style.opacity = '1';
    });

    this.animate();
  }

  animate() {
    // Smooth follower lag
    this.followerPos.x = lerp(this.followerPos.x, this.mouse.x, 0.12);
    this.followerPos.y = lerp(this.followerPos.y, this.mouse.y, 0.12);
    this.follower.style.left = `${this.followerPos.x}px`;
    this.follower.style.top  = `${this.followerPos.y}px`;
    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
class ScrollProgress {
  constructor() {
    this.bar = $('#scrollProgress');
    if (!this.bar) return;
    window.addEventListener('scroll', () => this.update(), { passive: true });
    this.update();
  }

  update() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? (scrolled / total) * 100 : 0;
    this.bar.style.width = `${percent}%`;
  }
}

/* ============================================================
   NAVIGATION
   ============================================================ */
class Navigation {
  constructor() {
    this.nav         = $('#nav');
    this.hamburger   = $('#hamburger');
    this.mobileMenu  = $('#mobileMenu');
    this.mobileLinks = $$('.mobile-menu__link');
    this.isOpen      = false;
    this.lastScroll  = 0;

    this.init();
  }

  init() {
    // Scroll effect
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Hamburger toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    // Close on link click
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.mobileMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Active link on scroll
    this.setupActiveLinks();
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 60) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }

    this.lastScroll = scrollY;
  }

  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.isOpen = true;
    this.hamburger.classList.add('active');
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.mobileMenu.classList.add('open');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.isOpen = false;
    this.hamburger.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.mobileMenu.classList.remove('open');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  setupActiveLinks() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav__link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
  }
}

/* ============================================================
   HERO SMOKE / PARTICLE CANVAS
   ============================================================ */
class HeroCanvas {
  constructor() {
    this.canvas = $('#heroCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.MAX = 35;
    this.rafId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    this.populate();
    this.animate();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.W = this.canvas.width;
    this.H = this.canvas.height;
  }

  createParticle() {
    return {
      x: Math.random() * this.W,
      y: this.H + Math.random() * 100,
      r: Math.random() * 80 + 40,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.6 + 0.2),
      life: 0,
      maxLife: Math.random() * 300 + 200,
      // Subtle warm tones
      hue: Math.random() < 0.3 ? 30 : 0,
      sat: Math.random() * 20 + 5,
    };
  }

  populate() {
    for (let i = 0; i < this.MAX; i++) {
      const p = this.createParticle();
      p.y = Math.random() * this.H; // Spread vertically on init
      p.life = Math.random() * p.maxLife;
      this.particles.push(p);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.W, this.H);

    this.particles.forEach((p, i) => {
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.r  += 0.15;

      const progress = p.life / p.maxLife;
      const alpha = Math.sin(progress * Math.PI) * 0.06;

      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      gradient.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, 70%, ${alpha})`);
      gradient.addColorStop(1, `hsla(${p.hue}, ${p.sat}%, 70%, 0)`);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      if (p.life >= p.maxLife || p.y + p.r < -100) {
        this.particles[i] = this.createParticle();
      }
    });

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}

/* ============================================================
   HERO PARALLAX
   ============================================================ */
class HeroParallax {
  constructor() {
    this.bgImg    = $('.hero__bg-img');
    this.content  = $('#heroContent');
    this.lanterns = $('.hero__lanterns');
    this.ticking  = false;

    if (!this.bgImg) return;

    // Trigger zoom-out animation
    setTimeout(() => {
      if (this.bgImg) this.bgImg.classList.add('loaded');
    }, 100);

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.update();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }

  update() {
    const scrollY = window.scrollY;
    if (scrollY > window.innerHeight) return;

    const speed = scrollY * 0.35;
    if (this.bgImg)   this.bgImg.style.transform    = `scale(1) translateY(${speed * 0.4}px)`;
    if (this.content) this.content.style.transform  = `translateY(${speed * 0.18}px)`;
  }
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
class MagneticButtons {
  constructor() {
    $$('.magnetic-btn').forEach(btn => this.init(btn));
  }

  init(btn) {
    const strength = 28;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      btn.style.transform = `translate(${dx * strength}px, ${dy * strength * 0.5}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  }
}

/* ============================================================
   RIPPLE BUTTONS
   ============================================================ */
class RippleButtons {
  constructor() {
    $$('.ripple-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.createRipple(e, btn));
    });
  }

  createRipple(e, btn) {
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
}

/* ============================================================
   INTERSECTION OBSERVER — REVEAL ANIMATIONS
   ============================================================ */
class RevealAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Staggered delay for cards
          if (el.classList.contains('reveal-card')) {
            const idx = parseInt(el.getAttribute('data-index') || 0);
            el.style.transitionDelay = `${(idx % 3) * 0.12}s`;
          }
          // Brush animation for divider
          if (el.classList.contains('about__brush-divider')) {
            const path = el.querySelector('.brush-path');
            if (path) path.classList.add('animated');
          }
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    }, this.observerOptions);

    $$('.reveal-text, .reveal-fade, .reveal-scale, .reveal-card').forEach(el => {
      observer.observe(el);
    });
  }
}

/* ============================================================
   ANIMATED COUNTERS (Chef Section)
   ============================================================ */
class AnimatedCounters {
  constructor() {
    this.counters = $$('.chef__stat-num');
    this.duration = 2000; // ms

    if (!this.counters.length) return;
    this.observe();
  }

  observe() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const numEl = entry.target;
          const parent = numEl.closest('.chef__stat');
          this.animate(numEl);
          if (parent) parent.classList.add('visible');
          observer.unobserve(numEl);
        }
      });
    }, { threshold: 0.4 });

    this.counters.forEach(el => observer.observe(el));
  }

  animate(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const start  = performance.now();
    const ease   = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = clamp(elapsed / this.duration, 0, 1);
      const value    = Math.round(ease(progress) * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}

/* ============================================================
   TESTIMONIALS SLIDER
   ============================================================ */
class TestimonialsSlider {
  constructor() {
    this.slider      = $('#testimonialsSlider');
    this.prevBtn     = $('#testimonialPrev');
    this.nextBtn     = $('#testimonialNext');
    this.dotsWrap    = $('#testimonialDots');
    this.slides      = $$('.testimonials__slide');
    this.current     = 0;
    this.total       = this.slides.length;
    this.autoTimer   = null;
    this.AUTO_DELAY  = 5000;
    this.isAnimating = false;

    if (!this.slider || !this.total) return;
    this.buildDots();
    this.bind();
    this.goTo(0);
    this.startAuto();
  }

  buildDots() {
    for (let i = 0; i < this.total; i++) {
      const btn = document.createElement('button');
      btn.classList.add('testimonials__dot');
      btn.setAttribute('aria-label', `Review ${i + 1}`);
      btn.addEventListener('click', () => {
        this.goTo(i);
        this.resetAuto();
      });
      this.dotsWrap.appendChild(btn);
    }
    this.dots = $$('.testimonials__dot', this.dotsWrap);
  }

  bind() {
    this.prevBtn?.addEventListener('click', () => { this.prev(); this.resetAuto(); });
    this.nextBtn?.addEventListener('click', () => { this.next(); this.resetAuto(); });

    // Touch / swipe support
    let touchStartX = 0;
    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    this.slider.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
        this.resetAuto();
      }
    }, { passive: true });
  }

  goTo(index) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.current = ((index % this.total) + this.total) % this.total;
    this.slider.style.transform = `translateX(-${this.current * 100}%)`;
    this.dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
    setTimeout(() => { this.isAnimating = false; }, 700);
  }

  next() { this.goTo(this.current + 1); }
  prev() { this.goTo(this.current - 1); }

  startAuto() {
    this.autoTimer = setInterval(() => this.next(), this.AUTO_DELAY);
  }

  resetAuto() {
    clearInterval(this.autoTimer);
    this.startAuto();
  }
}

/* ============================================================
   HORIZONTAL EXPERIENCE GALLERY (Drag to Scroll)
   ============================================================ */
class ExperienceGallery {
  constructor() {
    this.wrap = $('#expTrackWrap');
    this.track = $('#expTrack');
    if (!this.wrap) return;

    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;

    this.bind();
    this.autoScroll();
  }

  bind() {
    this.wrap.addEventListener('mousedown',  (e) => this.startDrag(e));
    this.wrap.addEventListener('mousemove',  (e) => this.drag(e));
    this.wrap.addEventListener('mouseup',    ()  => this.endDrag());
    this.wrap.addEventListener('mouseleave', ()  => this.endDrag());

    this.wrap.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]), { passive: true });
    this.wrap.addEventListener('touchmove',  (e) => this.drag(e.touches[0]),      { passive: true });
    this.wrap.addEventListener('touchend',   ()  => this.endDrag());
  }

  startDrag(e) {
    this.isDragging = true;
    this.startX = e.pageX - this.wrap.offsetLeft;
    this.scrollLeft = this.wrap.scrollLeft;
    this.wrap.classList.add('grabbing');
  }

  drag(e) {
    if (!this.isDragging) return;
    const x    = e.pageX - this.wrap.offsetLeft;
    const walk = (x - this.startX) * 1.2;
    this.wrap.scrollLeft = this.scrollLeft - walk;
  }

  endDrag() {
    this.isDragging = false;
    this.wrap.classList.remove('grabbing');
  }

  autoScroll() {
    // Slow auto-scroll to hint at draggability
    let active = true;
    const speed = 0.5;

    const scroll = () => {
      if (!this.isDragging && active) {
        this.wrap.scrollLeft += speed;
        // Loop back
        if (this.wrap.scrollLeft >= this.wrap.scrollWidth - this.wrap.clientWidth) {
          this.wrap.scrollLeft = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    // Only auto-scroll when section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { active = e.isIntersecting; });
    }, { threshold: 0.3 });

    const section = document.querySelector('.experience');
    if (section) observer.observe(section);

    requestAnimationFrame(scroll);
  }
}

/* ============================================================
   ABOUT SECTION — Brush Divider Trigger
   (handled by RevealAnimations via IntersectionObserver)
   ============================================================ */

/* ============================================================
   CONTACT FORM — Validation
   ============================================================ */
class ContactForm {
  constructor() {
    this.form    = $('#contactForm');
    this.success = $('#formSuccess');
    if (!this.form) return;

    this.rules = {
      fullName: { required: true, minLen: 2, label: 'Full Name' },
      email:    { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, label: 'Email' },
      phone:    { required: true, pattern: /^[\d\s\+\-\(\)]{7,}$/, label: 'Phone' },
      resDate:  { required: true, label: 'Date' },
      guests:   { required: true, min: 1, max: 20, label: 'Guests' },
    };

    this.bind();
    this.setupFloatingLabels();
  }

  bind() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validate()) {
        this.submitForm();
      }
    });

    // Live validation on blur
    Object.keys(this.rules).forEach(name => {
      const input = this.form.querySelector(`[name="${name}"]`);
      if (input) {
        input.addEventListener('blur', () => this.validateField(name, input.value));
        input.addEventListener('input', () => {
          if (input.closest('.form-group').classList.contains('has-error')) {
            this.validateField(name, input.value);
          }
        });
      }
    });
  }

  setupFloatingLabels() {
    // Ensure floating labels work on autofill too
    $$('.form-group input, .form-group textarea', this.form).forEach(input => {
      // Use :placeholder-shown trick — also fire change on autofill
      input.addEventListener('change', () => {
        // noop — handled by CSS :not(:placeholder-shown)
      });
    });
  }

  validate() {
    let valid = true;
    Object.keys(this.rules).forEach(name => {
      const input = this.form.querySelector(`[name="${name}"]`);
      if (input && !this.validateField(name, input.value)) {
        valid = false;
      }
    });
    return valid;
  }

  validateField(name, value) {
    const rule     = this.rules[name];
    const group    = this.form.querySelector(`[name="${name}"]`)?.closest('.form-group');
    const errorEl  = $(`#${name}Error`);
    let errorMsg   = '';

    value = String(value).trim();

    if (rule.required && !value) {
      errorMsg = `${rule.label} is required.`;
    } else if (rule.minLen && value.length < rule.minLen) {
      errorMsg = `${rule.label} must be at least ${rule.minLen} characters.`;
    } else if (rule.pattern && value && !rule.pattern.test(value)) {
      errorMsg = `Please enter a valid ${rule.label.toLowerCase()}.`;
    } else if (rule.min !== undefined && parseFloat(value) < rule.min) {
      errorMsg = `Minimum ${rule.min} guest required.`;
    } else if (rule.max !== undefined && parseFloat(value) > rule.max) {
      errorMsg = `Maximum ${rule.max} guests allowed.`;
    } else if (name === 'resDate' && value) {
      const selected = new Date(value);
      const today    = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errorMsg = 'Please select a future date.';
      }
    }

    if (group) group.classList.toggle('has-error', !!errorMsg);
    if (errorEl) errorEl.textContent = errorMsg;

    return !errorMsg;
  }

  submitForm() {
    const btn = $('#submitBtn');
    if (btn) {
      btn.disabled = true;
      btn.querySelector('span').textContent = 'Sending…';
    }

    // Simulate network request
    setTimeout(() => {
      this.form.style.display = 'none';
      if (this.success) this.success.classList.add('visible');
      // Reset after 6s
      setTimeout(() => {
        this.form.reset();
        this.form.style.display = 'flex';
        this.form.style.flexDirection = 'column';
        if (this.success) this.success.classList.remove('visible');
        if (btn) {
          btn.disabled = false;
          btn.querySelector('span').textContent = 'Confirm Reservation';
        }
      }, 6000);
    }, 1800);
  }
}

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
class BackToTop {
  constructor() {
    this.btn = $('#backToTop');
    if (!this.btn) return;

    window.addEventListener('scroll', () => {
      this.btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ============================================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================================ */
class SmoothScroll {
  constructor() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = $(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }
}

/* ============================================================
   MOUSE MOVE PARALLAX (Hero decorative elements)
   ============================================================ */
class MouseParallax {
  constructor() {
    this.hero = document.querySelector('.hero');
    if (!this.hero) return;

    this.layers = [
      { el: document.querySelector('.hero__lanterns'), depth: 0.015 },
    ].filter(l => l.el);

    this.cx = window.innerWidth  / 2;
    this.cy = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => this.move(e), { passive: true });
  }

  move(e) {
    const dx = (e.clientX - this.cx);
    const dy = (e.clientY - this.cy);

    this.layers.forEach(layer => {
      layer.el.style.transform = `translate(${dx * layer.depth}px, ${dy * layer.depth}px)`;
    });
  }
}

/* ============================================================
   SECTION TITLE BACKGROUND TEXT PARALLAX
   ============================================================ */
class BgTextParallax {
  constructor() {
    this.elements = $$('.menu__header-bg, .chef__bg-text, .testimonials__bg-char, .contact__bg-text');
    if (!this.elements.length) return;
    this.ticking = false;
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        requestAnimationFrame(() => { this.update(); this.ticking = false; });
        this.ticking = true;
      }
    }, { passive: true });
  }

  update() {
    this.elements.forEach(el => {
      const rect = el.closest('section')?.getBoundingClientRect();
      if (!rect) return;
      const centerOffset = -(rect.top + rect.height / 2 - window.innerHeight / 2);
      el.style.transform = `translate(-50%, calc(-50% + ${centerOffset * 0.04}px))`;
    });
  }
}

/* ============================================================
   IMAGE LOADING — Fade in on load
   ============================================================ */
class LazyImageFade {
  constructor() {
    $$('img[loading="lazy"]').forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', () => { img.style.opacity = '1'; });
      }
    });
  }
}

/* ============================================================
   PAGE TRANSITION (subtle fade on navigation)
   ============================================================ */
class PageTransition {
  constructor() {
    // Fade in on load
    document.body.style.opacity = '0';
    document.addEventListener('loaderDone', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity    = '1';
    });
  }
}

/* ============================================================
   CHEF SECTION — Mouse tilt on portrait
   ============================================================ */
class PortraitTilt {
  constructor() {
    this.wrap = document.querySelector('.chef__portrait-wrap');
    if (!this.wrap) return;
    if (window.matchMedia('(hover: none)').matches) return;

    this.wrap.addEventListener('mousemove', (e) => this.tilt(e));
    this.wrap.addEventListener('mouseleave', () => this.reset());
  }

  tilt(e) {
    const rect = this.wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    this.wrap.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) scale(1.02)`;
  }

  reset() {
    this.wrap.style.transform = '';
  }
}

/* ============================================================
   TESTIMONIALS — Keyboard Accessibility
   ============================================================ */
class TestimonialsKeyboard {
  constructor(slider) {
    document.addEventListener('keydown', (e) => {
      const section = document.querySelector('.testimonials');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      if (e.key === 'ArrowLeft')  slider?.prev?.();
      if (e.key === 'ArrowRight') slider?.next?.();
    });
  }
}

/* ============================================================
   PREFERS COLOUR SCHEME — already dark, but log for accessibility
   ============================================================ */
if (window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  if (mq.matches) {
    // Site is dark-only by design, so we could inform the user
    // For now we keep the dark theme as it's the brand direction
  }
}

/* ============================================================
   INITIALISE ALL MODULES
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Core
  const loader       = new Loader();
  const cursor       = new CustomCursor();
  const scrollProg   = new ScrollProgress();
  const nav          = new Navigation();
  const smoothScroll = new SmoothScroll();
  const backToTop    = new BackToTop();

  // Visuals
  const heroCanvas   = new HeroCanvas();
  const heroParallax = new HeroParallax();
  const mouseParallax = new MouseParallax();
  const bgTextParallax = new BgTextParallax();
  const lazyFade     = new LazyImageFade();

  // Interactions
  const magnetic     = new MagneticButtons();
  const ripple       = new RippleButtons();
  const reveals      = new RevealAnimations();
  const counters     = new AnimatedCounters();
  const tilt         = new PortraitTilt();

  // Sections
  const testimonials = new TestimonialsSlider();
  const testiKeys    = new TestimonialsKeyboard(testimonials);
  const gallery      = new ExperienceGallery();
  const contactForm  = new ContactForm();

  // Page transition
  const pageTransition = new PageTransition();

  // ============================================================
  // ADDITIONAL MICRO-INTERACTIONS
  // ============================================================

  // Nav link hover sound-free ripple (CSS handles it)

  // Footer links stagger reveal
  const footerLinks = $$('.footer__links-col li');
  footerLinks.forEach((li, i) => {
    li.style.opacity    = '0';
    li.style.transform  = 'translateX(-12px)';
    li.style.transition = `opacity 0.5s ${i * 0.06}s ease, transform 0.5s ${i * 0.06}s ease`;
  });

  const footerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      footerLinks.forEach(li => {
        li.style.opacity   = '1';
        li.style.transform = 'none';
      });
      footerObserver.disconnect();
    }
  }, { threshold: 0.1 });

  const footer = document.querySelector('.footer');
  if (footer) footerObserver.observe(footer);

  // Menu card glow on hover (extra JS layer)
  $$('.menu__card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });
  });

  // Set min date for reservation to today
  const dateInput = $('#resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Scroll to hero on logo click
  const logo = document.querySelector('.nav__logo');
  if (logo) {
    logo.style.cursor = 'none';
    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Timeline items — slide in from left on observe
  const timelineItems = $$('.chef__timeline-item');
  timelineItems.forEach((item, i) => {
    item.style.opacity   = '0';
    item.style.transform = 'translateX(-24px)';
    item.style.transition = `opacity 0.6s ${i * 0.15 + 0.1}s ease, transform 0.6s ${i * 0.15 + 0.1}s ease`;
  });

  const timelineObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      timelineItems.forEach(item => {
        item.style.opacity   = '1';
        item.style.transform = 'none';
      });
      timelineObserver.disconnect();
    }
  }, { threshold: 0.15 });

  const timeline = document.querySelector('.chef__timeline');
  if (timeline) timelineObserver.observe(timeline);

  // Hero scroll indicator fade out on scroll
  const heroScroll = $('#heroScroll');
  if (heroScroll) {
    window.addEventListener('scroll', () => {
      const opacity = 1 - clamp(window.scrollY / 200, 0, 1);
      heroScroll.style.opacity = opacity;
    }, { passive: true });
  }

  // About brush divider — handled by reveal animation observer callback above

  // Location detail items hover glow
  $$('.location__detail-item').forEach(item => {
    item.style.transition = 'all 0.3s ease';
  });

  console.log('%cCheang\'s Restaurant — Penang, Malaysia', 'font-family: Georgia, serif; font-size: 14px; color: #D4AF37;');
  console.log('%c餐 — Crafted with passion. Est. 1988.', 'font-family: Georgia, serif; font-size: 12px; color: #8B0000;');
});

/* ============================================================
   HANDLE VISIBILITY CHANGE (pause animations when hidden)
   ============================================================ */
document.addEventListener('visibilitychange', () => {
  // Canvas animations auto-pause when tab is inactive via RAF
  // No additional action needed — RAF stops when tab is hidden
});

/* ============================================================
   WINDOW RESIZE — Debounced
   ============================================================ */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-centre mouse parallax
    document.dispatchEvent(new CustomEvent('windowResized'));
  }, 250);
}, { passive: true });
