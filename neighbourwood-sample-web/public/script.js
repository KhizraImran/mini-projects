/* ============================================================
   NEIGHBOURWOOD RESTAURANT — Interactive JS
   Premium animations, scroll effects, navigation behaviour
   ============================================================ */

(function () {
  'use strict';

  /* ── Utility ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── Elements ── */
  const header      = $('#nw-header');
  const hamburger   = $('#nw-hamburger');
  const mobileMenu  = $('#nw-mobile-menu');
  const navLinks    = $$('.nw-nav-link');
  const mobileLinks = $$('.nw-mobile-link');
  const heroImg     = $('#nw-hero-img');
  const heroContent = $('#nw-hero-content');
  const sections    = $$('section[id], div[id]');

  /* ════════════════════════════════
     1. HERO IMAGE PARALLAX ON LOAD
  ════════════════════════════════ */
  if (heroImg) {
    // Trigger the CSS scale-down after paint
    requestAnimationFrame(() => {
      setTimeout(() => heroImg.classList.add('loaded'), 100);
    });
  }

  /* ════════════════════════════════
     2. MOUSE PARALLAX ON HERO
  ════════════════════════════════ */
  if (heroContent) {
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { innerWidth: W, innerHeight: H } = window;
        const x = (e.clientX / W - 0.5) * 18; // ±9px
        const y = (e.clientY / H - 0.5) * 12; // ±6px
        heroContent.style.transform = `translate(${x}px, ${y}px)`;
        if (heroImg) {
          heroImg.style.transform = `scale(1) translate(${-x * 0.4}px, ${-y * 0.3}px)`;
        }
        ticking = false;
      });
    });
  }

  /* ════════════════════════════════
     3. SCROLL: HEADER COMPRESSION + ACTIVE LINK
  ════════════════════════════════ */
  let lastScroll = 0;

  function onScroll() {
    const scroll = window.scrollY;

    // Compress nav on scroll
    if (header) {
      header.classList.toggle('scrolled', scroll > 60);
    }

    // Active section tracking
    let currentSection = 'home';
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) currentSection = sec.id;
    });

    navLinks.forEach((link) => {
      const sec = link.getAttribute('data-section');
      link.classList.toggle('active', sec === currentSection);
    });

    lastScroll = scroll;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once

  /* ════════════════════════════════
     4. SMOOTH SCROLL NAV LINKS
  ════════════════════════════════ */
  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  [...navLinks, ...mobileLinks].forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        smoothScrollTo(id);
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  /* ════════════════════════════════
     5. HAMBURGER / MOBILE MENU
  ════════════════════════════════ */
  function closeMobileMenu() {
    hamburger && hamburger.classList.remove('open');
    mobileMenu && mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ════════════════════════════════
     6. SCROLL REVEAL (IntersectionObserver)
  ════════════════════════════════ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  $$('.nw-reveal').forEach((el) => revealObserver.observe(el));

  /* ════════════════════════════════
     7. STAGGERED CHILD REVEALS
  ════════════════════════════════ */
  const staggerContainers = $$(
    '.nw-testimonials-grid, .nw-dessert-row, .nw-sharing-grid, .nw-menu-starters, .nw-ambience-features, .nw-chef-credentials'
  );

  staggerContainers.forEach((container) => {
    const children = $$(':scope > *', container);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
      child.classList.add('nw-reveal');
      revealObserver.observe(child);
    });
  });

  /* ════════════════════════════════
     8. PARALLAX SECTIONS ON SCROLL
  ════════════════════════════════ */
  const parallaxImgs = $$('.nw-story-img, .nw-chef-img-main img, .nw-main-hero-img');

  function updateParallax() {
    const scroll = window.scrollY;
    parallaxImgs.forEach((img) => {
      const rect = img.closest('div') ? img.closest('div').getBoundingClientRect() : img.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = ((center - viewCenter) / window.innerHeight) * 30;

      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        img.style.transform = `translateY(${offset}px) scale(1.04)`;
      }
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  /* ════════════════════════════════
     9. MICHELIN TICKER DUPLICATION
  ════════════════════════════════ */
  // Ensure infinite loop by duplicating track contents
  const track = $('.nw-michelin-track');
  if (track) {
    // Content already duplicated via JSX (8 copies), CSS handles animation
  }

  /* ════════════════════════════════
     10. HERO GLASS CARDS FLOAT
  ════════════════════════════════ */
  const glassCards = $$('.nw-glass-card');
  let floatFrame;

  function floatCards(timestamp) {
    glassCards.forEach((card, i) => {
      const offset = Math.sin((timestamp / 1000 + i * 1.5) * 0.5) * 5;
      card.style.transform = `translateY(${offset}px)`;
    });
    floatFrame = requestAnimationFrame(floatCards);
  }

  if (glassCards.length > 0) {
    floatFrame = requestAnimationFrame(floatCards);
  }

  /* ════════════════════════════════
     11. MENU PANEL TILT ON HOVER
  ════════════════════════════════ */
  $$('.nw-starter-card, .nw-sharing-card, .nw-testimonial-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        perspective(800px)
        rotateY(${cx * 4}deg)
        rotateX(${-cy * 4}deg)
        translateY(-6px)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  /* ════════════════════════════════
     12. DESSERT CARD HOVER SHIMMER
  ════════════════════════════════ */
  $$('.nw-dessert-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('.nw-dessert-img');
      if (img) img.style.transform = 'scale(1.06)';
    });
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('.nw-dessert-img');
      if (img) img.style.transform = '';
    });
  });

  /* ════════════════════════════════
     13. NUMBER COUNTER ANIMATION
  ════════════════════════════════ */
  function animateCounter(el, target, duration = 1800) {
    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target) + '+';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEl = $('.nw-chef-stat');
  if (counterEl) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(counterEl, 10);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(counterEl);
  }

  /* ════════════════════════════════
     14. FOOTER VISIT LINKS — SMOOTH CLOSE
  ════════════════════════════════ */
  $$('.nw-footer-links a, .nw-footer-contact a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href.slice(1));
      }
    });
  });

  /* ════════════════════════════════
     15. LAZY IMAGE LOADING FALLBACK
  ════════════════════════════════ */
  $$('img[src]').forEach((img) => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      img.addEventListener('error', () => {
        img.style.opacity = '0.3';
      });
    }
  });

  /* ── Console greeting ── */
  console.log(
    '%cNeighbourwood Restaurant\n%c✦ Michelin Bib Gourmand 2025 · Bukit Mertajam, Penang',
    'font-family: Georgia, serif; font-size: 18px; font-weight: bold; color: #A0784A;',
    'font-family: sans-serif; font-size: 11px; color: #8C816E; letter-spacing: 0.1em;'
  );
})();
