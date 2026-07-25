/* ═══════════════════════════════════════════
   KHALED AL DWAIHI — script.js
   Luxury Restaurant Kuwait
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  /* ──────────────────────────────────────────
     THEME TOGGLE
  ────────────────────────────────────────── */
  const root = document.documentElement;
  root.setAttribute('data-theme', 'dark');

  function syncThemeBtns(isDark) {
    document.querySelectorAll('.theme-toggle')
      .forEach(b => b.textContent = isDark ? '☀️' : '🌙');
  }
  syncThemeBtns(true);

  document.querySelectorAll('.theme-toggle')
    .forEach(btn => btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', isDark ? 'light' : 'dark');
      syncThemeBtns(!isDark);
    }));


  /* ──────────────────────────────────────────
     LANGUAGE TOGGLE
  ────────────────────────────────────────── */
  let lang = 'en';

  function syncLangBtns(isAr) {
    document.querySelectorAll('.lang-toggle')
      .forEach(b => b.textContent = isAr ? 'EN' : 'AR');
  }

  function applyLang(isAr) {
    root.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    root.setAttribute('lang', isAr ? 'ar' : 'en');

    // Update text content
    document.querySelectorAll('[data-en]').forEach(el => {
      const target = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (target) {
        // Preserve child elements for hero title (char spans)
        if (el.classList.contains('hero-title')) {
          return; // handled separately
        }
        el.textContent = target;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-en-ph]').forEach(el => {
      el.placeholder = isAr
        ? el.getAttribute('data-ar-ph')
        : el.getAttribute('data-en-ph');
    });

    syncLangBtns(isAr);
  }

  document.querySelectorAll('.lang-toggle')
    .forEach(btn => btn.addEventListener('click', () => {
      lang = lang === 'en' ? 'ar' : 'en';
      applyLang(lang === 'ar');
    }));


  /* ──────────────────────────────────────────
     NAV SMOOTH SCROLL & ACTIVE STATES
  ────────────────────────────────────────── */
  function activateLink(target) {
    document.querySelectorAll('.knife-links li, .mob-links li')
      .forEach(l => l.classList.remove('active'));
    document.querySelectorAll(
      `.knife-links li[data-target="${target}"],
       .mob-links li[data-target="${target}"]`
    ).forEach(l => l.classList.add('active'));
  }

  document.querySelectorAll('.knife-links li, .mob-links li')
    .forEach(li => {
      li.addEventListener('click', () => {
        const t = li.getAttribute('data-target');
        if (t) {
          const el = document.querySelector(t);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          activateLink(t);
          if (mobOpen) closeMob();
        }
      });
    });

  // View menu CTA button
  const viewMenuBtn = document.getElementById('viewMenuBtn');
  if (viewMenuBtn) {
    viewMenuBtn.addEventListener('click', () => {
      const dishes = document.querySelector('#dishes');
      if (dishes) dishes.scrollIntoView({ behavior: 'smooth' });
      activateLink('#dishes');
    });
  }

  // Update footer quick links
  document.querySelectorAll('.footer-links a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        activateLink(href);
      }
    });
  });

  // Scroll spy for nav active states
  const sections = ['#hero', '#dishes', '#about', '#branches', '#contact'];
  const sectionEls = sections.map(s => document.querySelector(s)).filter(Boolean);

  const observerOptions = {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        activateLink(id);
      }
    });
  }, observerOptions);

  sectionEls.forEach(el => sectionObserver.observe(el));


  /* ──────────────────────────────────────────
     HAMBURGER MOBILE MENU
  ────────────────────────────────────────── */
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileOverlay');
  const mobClose = document.getElementById('mobClose');
  let mobOpen = false;

  function openMob() {
    mobOpen = true;
    mob.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(mob,
      { y: '-100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
    );

    gsap.from('.mob-links li', {
      y: 28, opacity: 0,
      stagger: 0.07, delay: 0.2,
      duration: 0.4, ease: 'power2.out'
    });

    gsap.from('.mob-logo', {
      y: -20, opacity: 0,
      duration: 0.4, delay: 0.1, ease: 'power2.out'
    });

    // Animate hamburger to X
    const hlines = document.querySelectorAll('.hline');
    gsap.to(hlines[0], { rotation: 45, y: 7, duration: 0.3, ease: 'power2.inOut' });
    gsap.to(hlines[1], { opacity: 0, duration: 0.15 });
    gsap.to(hlines[2], { rotation: -45, y: -7, duration: 0.3, ease: 'power2.inOut' });
  }

  function closeMob() {
    mobOpen = false;
    document.body.style.overflow = '';

    gsap.to(mob, {
      y: '-100%', opacity: 0,
      duration: 0.3, ease: 'power3.in',
      onComplete: () => mob.classList.remove('open')
    });

    // Animate X back to hamburger
    const hlines = document.querySelectorAll('.hline');
    gsap.to(hlines[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
    gsap.to(hlines[1], { opacity: 1, duration: 0.3 });
    gsap.to(hlines[2], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' });
  }

  if (ham) ham.addEventListener('click', () => mobOpen ? closeMob() : openMob());
  if (mobClose) mobClose.addEventListener('click', closeMob);

  // Close mob overlay on outside click
  mob && mob.addEventListener('click', (e) => {
    if (e.target === mob) closeMob();
  });


  /* ──────────────────────────────────────────
     GSAP PAGE ANIMATIONS
  ────────────────────────────────────────── */

  // Navbar entrance
  gsap.from('.knife-nav', {
    y: -80, opacity: 0,
    duration: 1, ease: 'power3.out'
  });

  gsap.from('.knife-links li', {
    y: -16, opacity: 0,
    stagger: 0.08, delay: 0.5,
    duration: 0.5, ease: 'power2.out'
  });

  gsap.from('.knife-toggles', {
    x: 20, opacity: 0,
    delay: 0.8, duration: 0.4, ease: 'power2.out'
  });


  /* ── Hero Heading Character Split ── */
  const heroH1 = document.querySelector('.hero-title');
  if (heroH1) {
    const rawText = heroH1.textContent.trim();

    // Build char spans — keep last word in gold italic
    const words = rawText.split(' ');
    const lastWord = words.pop();
    const mainText = words.join(' ');

    heroH1.innerHTML =
      mainText.split('').map(c =>
        `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`
      ).join('') +
      ' <em>' +
      lastWord.split('').map(c =>
        `<span class="char">${c}</span>`
      ).join('') +
      '</em>';

    gsap.from('.hero-title .char', {
      y: 60, opacity: 0, rotationX: -40,
      stagger: 0.025, duration: 0.7,
      delay: 0.4, ease: 'power3.out'
    });
  }

  // Hero badge, subtitle, CTAs, rating
  gsap.from('.hero-badge', {
    y: 20, opacity: 0,
    duration: 0.6, delay: 0.2, ease: 'power2.out'
  });

  gsap.from('.hero-subtitle', {
    y: 30, opacity: 0,
    duration: 0.8, delay: 1.1, ease: 'power2.out'
  });

  gsap.from('.hero-ctas', {
    y: 20, opacity: 0,
    duration: 0.6, delay: 1.3, ease: 'power2.out'
  });

  gsap.from('.hero-rating', {
    y: 20, opacity: 0,
    duration: 0.6, delay: 1.5, ease: 'power2.out'
  });

  // Hero visual entrance
  gsap.from('.hero-float-card', {
    x: 80, opacity: 0, scale: 0.9,
    duration: 1, delay: 0.6, ease: 'power3.out'
  });

  // Floating animation on hero card
  gsap.to('.hero-float-card', {
    y: -14, duration: 3,
    repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // Scroll hint animation
  gsap.from('.hero-scroll-hint', {
    opacity: 0, y: 10,
    duration: 1, delay: 2, ease: 'power2.out'
  });


  /* ── Section Reveals on Scroll ── */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.from(el, {
      y: 50, opacity: 0,
      duration: 0.9, ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });


  /* ── Cards Stagger ── */
  gsap.utils.toArray('.stagger-group').forEach(group => {
    const cards = group.querySelectorAll('.card');
    if (cards.length === 0) return;
    gsap.from(cards, {
      y: 60, opacity: 0,
      stagger: 0.12, duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });


  /* ── Counter Animation ── */
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = target >= 1000 ? '+' : '+';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          }
        });
      }
    });
  });


  /* ── Marquee Infinite Scroll ── */
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    gsap.to(marquee, {
      x: '-50%',
      duration: 22,
      repeat: -1,
      ease: 'none'
    });
  }


  /* ── About Image Parallax ── */
  gsap.to('.about-image img', {
    y: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });


  /* ── Hero Background Parallax ── */
  gsap.to('.hero-bg-img', {
    y: 80,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });


  /* ── Gold Line Decorations on Section Headers ── */
  gsap.utils.toArray('.section-header h2').forEach(h => {
    gsap.from(h, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: h,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });


  /* ──────────────────────────────────────────
     TESTIMONIAL AUTO-SLIDE
  ────────────────────────────────────────── */
  const slides = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.t-dot');
  let current = 0;
  let autoSlideTimer = null;

  function showSlide(n) {
    const prev = slides[current];
    const next = slides[n];

    // Hide current
    gsap.to(prev, {
      opacity: 0, x: -20, duration: 0.4, ease: 'power2.in',
      onComplete: () => {
        prev.style.display = 'none';
        prev.style.position = '';
        next.style.display = 'block';
        next.style.opacity = '0';

        // Show next
        gsap.fromTo(next,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
    });

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === n);
    });

    current = n;
  }

  // Initialize
  slides.forEach((s, i) => {
    s.style.display = i === 0 ? 'block' : 'none';
    s.style.opacity = i === 0 ? '1' : '0';
  });

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
      showSlide((current + 1) % slides.length);
    }, 4000);
  }

  startAutoSlide();

  dots.forEach((d, i) => {
    d.addEventListener('click', () => {
      clearInterval(autoSlideTimer);
      showSlide(i);
      startAutoSlide();
    });
  });


  /* ──────────────────────────────────────────
     DISH CARD HOVER GLOW
  ────────────────────────────────────────── */
  document.querySelectorAll('.dish-card, .branch-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(201,164,50,0.2)',
        duration: 0.3, ease: 'power2.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        duration: 0.3, ease: 'power2.out'
      });
    });
  });


  /* ──────────────────────────────────────────
     FEATURE CARDS ICON HOVER
  ────────────────────────────────────────── */
  document.querySelectorAll('.feature-card').forEach(card => {
    const icon = card.querySelector('.feature-icon-circle');
    card.addEventListener('mouseenter', () => {
      if (icon) {
        gsap.to(icon, {
          scale: 1.12, rotation: 5,
          duration: 0.3, ease: 'back.out(2)'
        });
      }
    });
    card.addEventListener('mouseleave', () => {
      if (icon) {
        gsap.to(icon, {
          scale: 1, rotation: 0,
          duration: 0.3, ease: 'power2.out'
        });
      }
    });
  });


  /* ──────────────────────────────────────────
     STICKY NAVBAR SHRINK ON SCROLL
  ────────────────────────────────────────── */
  let lastScroll = 0;
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add shadow when scrolled
    if (currentScroll > 50) {
      navbar.style.filter = 'drop-shadow(0 12px 40px rgba(0,0,0,0.7))';
    } else {
      navbar.style.filter = 'drop-shadow(0 8px 28px rgba(0,0,0,0.5))';
    }

    lastScroll = currentScroll;
  }, { passive: true });


  /* ──────────────────────────────────────────
     GALLERY HOVER REVEAL ANIMATION
  ────────────────────────────────────────── */
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const overlay = item.querySelector('.gallery-hover-overlay');
    const img = item.querySelector('img');

    item.addEventListener('mouseenter', () => {
      gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.in' });
      gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
    });
  });


  /* ──────────────────────────────────────────
     BRANCH CARDS STAGGER ENTRANCE
  ────────────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '.branches-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.branch-card', {
        y: 50, opacity: 0,
        stagger: 0.1, duration: 0.6,
        ease: 'power2.out'
      });
    }
  });


  /* ──────────────────────────────────────────
     MARQUEE PAUSE ON HOVER
  ────────────────────────────────────────── */
  const marqueeWrap = document.querySelector('.marquee-wrap');
  if (marqueeWrap && marquee) {
    marqueeWrap.addEventListener('mouseenter', () => {
      gsap.to(marquee, { timeScale: 0, duration: 0.3 });
    });
    marqueeWrap.addEventListener('mouseleave', () => {
      gsap.to(marquee, { timeScale: 1, duration: 0.5 });
    });
  }


  /* ──────────────────────────────────────────
     FLOATING WHATSAPP — HIDE ON CONTACT SECTION
  ────────────────────────────────────────── */
  const floatingWa = document.querySelector('.floating-wa');
  const contactSection = document.querySelector('#contact');

  if (floatingWa && contactSection) {
    ScrollTrigger.create({
      trigger: contactSection,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => gsap.to(floatingWa, { opacity: 0, scale: 0.8, duration: 0.3 }),
      onLeave: () => gsap.to(floatingWa, { opacity: 1, scale: 1, duration: 0.3 }),
      onEnterBack: () => gsap.to(floatingWa, { opacity: 0, scale: 0.8, duration: 0.3 }),
      onLeaveBack: () => gsap.to(floatingWa, { opacity: 1, scale: 1, duration: 0.3 })
    });
  }


  /* ──────────────────────────────────────────
     FOOTER GOLD LINE REVEAL
  ────────────────────────────────────────── */
  gsap.from('.site-footer', {
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 90%',
      toggleActions: 'play none none none'
    }
  });


  /* ──────────────────────────────────────────
     ABOUT STATS COUNT-UP TRIGGER
  ────────────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '.about-stats',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.from('.stat-box', {
        y: 20, opacity: 0,
        stagger: 0.15, duration: 0.6,
        ease: 'power2.out'
      });
    }
  });


  /* ──────────────────────────────────────────
     CONTACT SECTION ITEMS REVEAL
  ────────────────────────────────────────── */
  gsap.from('.contact-item', {
    x: -30, opacity: 0,
    stagger: 0.12, duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });


  /* ──────────────────────────────────────────
     PERFORMANCE — Refresh ScrollTrigger on resize
  ────────────────────────────────────────── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  }, { passive: true });


  /* ──────────────────────────────────────────
     INITIAL LOAD DONE — remove loading state
  ────────────────────────────────────────── */
  document.body.classList.add('loaded');

  console.log('%c🍽 Khaled Al Dwaihi Restaurant', 'color: #C9A432; font-size: 16px; font-weight: bold;');
  console.log('%cخالد الدويحي — Premium Kuwait Restaurant', 'color: #E8C96A; font-size: 12px;');

}); // end DOMContentLoaded
