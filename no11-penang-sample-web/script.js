/**
 * No.11 Penang — script.js
 * Premium Health Food Restaurant Website
 * Interactive features, animations & scroll behaviour
 */

'use strict';

/* ─── UTILITY ───────────────────────────────────────────────── */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ─── PRELOADER ─────────────────────────────────────────────── */
(function initPreloader() {
  const preloader = $('#preloader');
  if (!preloader) return;

  // Minimum display time for the animation to complete gracefully
  const MIN_DISPLAY = 2200;
  const start = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, MIN_DISPLAY - elapsed);

    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      // Trigger hero image pan effect
      const heroBg = $('.hero-bg-img');
      if (heroBg) heroBg.classList.add('loaded');
    }, remaining);
  });

  document.body.style.overflow = 'hidden';
})();

/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
(function initCursor() {
  const cursor = $('#cursor');
  const follower = $('#cursorFollower');

  if (!cursor || !follower) return;

  // Only show custom cursor on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let animFrame;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function animateCursor() {
      // Lerp follower toward mouse
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';

      animFrame = requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Expand cursor on interactive elements
    const hoverTargets = $$('a, button, [data-cursor="view"], .menu-tab, .gallery-item, .menu-card');

    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('expanded');
        follower.classList.add('expanded');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expanded');
        follower.classList.remove('expanded');
      });
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
    });

    return () => cancelAnimationFrame(animFrame);
  }
})();

/* ─── NAVIGATION ─────────────────────────────────────────────── */
(function initNav() {
  const nav = $('#mainNav');
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobileMenu');
  const mobileClose = $('#mobileClose');
  const mobileLinks = $$('.mobile-nav-link');

  if (!nav) return;

  // Scroll behaviour
  let lastScrollY = 0;
  let ticking = false;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll(); // Initial call

  // Mobile menu toggle
  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on outside click
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  // Active nav link based on scroll position
  const sections = $$('section[id], div[id]');
  const navLinks = $$('.nav-link');

  function updateActiveNav() {
    const scrollMid = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollMid >= top && scrollMid < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
})();

/* ─── SCROLL REVEAL ANIMATIONS ──────────────────────────────── */
(function initScrollReveal() {
  const revealElements = $$('.reveal-up, .reveal-left, .reveal-right, .reveal-float');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Unobserve after revealing for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
})();

/* ─── MENU TABS ──────────────────────────────────────────────── */
(function initMenuTabs() {
  const tabs = $$('.menu-tab');
  const contents = $$('.menu-tab-content');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content panels
      contents.forEach(content => {
        content.classList.remove('active');
        if (content.dataset.content === target) {
          content.classList.add('active');

          // Re-trigger reveal animations inside newly shown tab
          const revealables = $$('.reveal-up, .reveal-left, .reveal-right', content);
          revealables.forEach(el => {
            el.classList.remove('in-view');
            // Brief timeout to allow class removal before re-observing
            setTimeout(() => el.classList.add('in-view'), 60);
          });
        }
      });
    });
  });
})();

/* ─── REVIEWS SLIDER ─────────────────────────────────────────── */
(function initReviewsSlider() {
  const track = $('#reviewsTrack');
  const prevBtn = $('#reviewsPrev');
  const nextBtn = $('#reviewsNext');
  const dotsContainer = $('#reviewsDots');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = $$('.review-card', track);
  const totalCards = cards.length;

  let visibleCount = getVisibleCount();
  let currentPage = 0;
  let totalPages = Math.ceil(totalCards / visibleCount);

  function getVisibleCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    totalPages = Math.ceil(totalCards / visibleCount);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'reviews-dot' + (i === currentPage ? ' active' : '');
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToPage(page) {
    currentPage = Math.max(0, Math.min(page, totalPages - 1));

    // Show/hide cards based on current page
    cards.forEach((card, idx) => {
      const startIdx = currentPage * visibleCount;
      const endIdx = startIdx + visibleCount;

      if (idx >= startIdx && idx < endIdx) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s, transform 0.5s';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, idx % visibleCount * 80);
      } else {
        card.style.display = 'none';
      }
    });

    // Update dots
    $$('.reviews-dot', dotsContainer).forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentPage);
    });

    // Update button states
    prevBtn.style.opacity = currentPage === 0 ? '0.4' : '1';
    nextBtn.style.opacity = currentPage >= totalPages - 1 ? '0.4' : '1';
  }

  function showAll() {
    cards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '';
      card.style.transform = '';
      card.style.transition = '';
    });
  }

  function init() {
    visibleCount = getVisibleCount();
    totalPages = Math.ceil(totalCards / visibleCount);

    // On desktop with 3 visible, show all cards in grid
    if (visibleCount >= totalCards) {
      showAll();
      if (dotsContainer) dotsContainer.innerHTML = '';
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }

    prevBtn.style.display = '';
    nextBtn.style.display = '';
    createDots();
    goToPage(0);
  }

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToPage(currentPage + 1);
      else goToPage(currentPage - 1);
    }
  }, { passive: true });

  // Resize handling
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newVisible = getVisibleCount();
      if (newVisible !== visibleCount) {
        visibleCount = newVisible;
        currentPage = 0;
        init();
      }
    }, 200);
  });

  init();
})();

/* ─── CONTACT FORM ───────────────────────────────────────────── */
(function initContactForm() {
  const form = $('#contactForm');
  const successMsg = $('#formSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = $('#name', form)?.value?.trim();
    const email = $('#email', form)?.value?.trim();

    if (!name || !email) {
      // Shake invalid fields
      if (!name) shakeField($('#name', form));
      if (!email) shakeField($('#email', form));
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      shakeField($('#email', form));
      return;
    }

    // Simulate form submission (replace with actual backend/EmailJS/etc.)
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn?.querySelector('.btn-text');

    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';
    }

    setTimeout(() => {
      form.reset();
      if (successMsg) successMsg.classList.add('visible');

      if (submitBtn) {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
      }

      setTimeout(() => {
        successMsg?.classList.remove('visible');
      }, 5000);
    }, 1400);
  });

  function shakeField(field) {
    if (!field) return;
    field.style.borderColor = '#c47c5a';
    field.style.animation = 'shake 0.4s ease';
    setTimeout(() => {
      field.style.animation = '';
      field.style.borderColor = '';
    }, 500);
  }

  // Add shake keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ─── BACK TO TOP ────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ─── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = $(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('mainNav')?.offsetHeight ?? 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });
})();

/* ─── PARALLAX HERO ──────────────────────────────────────────── */
(function initHeroParallax() {
  const heroBg = $('.hero-bg-img');
  if (!heroBg) return;

  // Only run on non-reduced-motion and non-touch devices
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight ?? window.innerHeight;

        if (scrollY < heroHeight) {
          const rate = scrollY * 0.35;
          heroBg.style.transform = `translateY(${rate}px) scale(1.05)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── HERO FLOATING CARDS PARALLAX ──────────────────────────── */
(function initHeroCardParallax() {
  const cards = $$('.hero-card');
  if (!cards.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        cards.forEach((card, i) => {
          const rate = (i + 1) * 0.08;
          card.style.transform = `translateY(${-scrollY * rate}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── GALLERY HOVER TILT ─────────────────────────────────────── */
(function initGalleryTilt() {
  const items = $$('.gallery-item');
  if (!items.length) return;
  if ('ontouchstart' in window) return;

  items.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      item.style.transform = `
        perspective(800px)
        rotateY(${x * 8}deg)
        rotateX(${-y * 8}deg)
        scale(1.02)
      `;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.transition = 'transform 0.5s ease';
      setTimeout(() => item.style.transition = '', 500);
    });
  });
})();

/* ─── NUMBER COUNTER ANIMATION ───────────────────────────────── */
(function initCounterAnimation() {
  const statsCard = $('.about-stats-card');
  if (!statsCard) return;

  const statNums = $$('.stat-num', statsCard);
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;

      statNums.forEach(el => {
        const text = el.textContent.trim();

        // Handle special formats
        if (text === '100%') animateCounter(el, 0, 100, '%');
        else if (text === '0')  animateCounter(el, 0, 0, '');
        else if (text === '★ 5.0') {
          // Just do a fade reveal for star ratings
          el.style.opacity = '0';
          setTimeout(() => {
            el.style.transition = 'opacity 0.6s';
            el.style.opacity = '1';
          }, 300);
        }
      });

      observer.unobserve(statsCard);
    }
  }, { threshold: 0.6 });

  observer.observe(statsCard);

  function animateCounter(el, from, to, suffix) {
    const duration = 1200;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const current = Math.round(from + (to - from) * eased);

      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }
})();

/* ─── MENU CARD HOVER EFFECT ─────────────────────────────────── */
(function initMenuCardHover() {
  const cards = $$('.menu-card, .menu-list-card, .drink-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function () {
      this.style.zIndex = '';
    });
  });
})();

/* ─── WHY FEATURES PROGRESSIVE REVEAL ───────────────────────── */
(function initFeatureReveal() {
  const features = $$('.why-feature');
  if (!features.length) return;

  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-20px)';
    feature.style.transition = `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        features.forEach(feature => {
          feature.style.opacity = '1';
          feature.style.transform = 'translateX(0)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const container = features[0]?.closest('.why-features');
  if (container) observer.observe(container);
})();

/* ─── PILLAR CARD STAGGER ────────────────────────────────────── */
(function initPillarStagger() {
  const pillars = $$('.pillar');
  if (!pillars.length) return;

  pillars.forEach((pillar, index) => {
    pillar.style.opacity = '0';
    pillar.style.transform = 'translateY(30px)';
    pillar.style.transition = `opacity 0.7s var(--ease-expo) ${index * 0.12}s, transform 0.7s var(--ease-expo) ${index * 0.12}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      pillars.forEach(pillar => {
        pillar.style.opacity = '1';
        pillar.style.transform = 'translateY(0)';
      });
      observer.unobserve(entries[0].target);
    }
  }, { threshold: 0.15 });

  const container = pillars[0]?.closest('.philosophy-pillars');
  if (container) observer.observe(container);
})();

/* ─── LIFESTYLE LIST STAGGER ─────────────────────────────────── */
(function initListStagger() {
  const listItems = $$('.lifestyle-list li');
  if (!listItems.length) return;

  listItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-16px)';
    item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      listItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
      observer.unobserve(entries[0].target);
    }
  }, { threshold: 0.3 });

  const list = $('.lifestyle-list');
  if (list) observer.observe(list);
})();

/* ─── FOOTER LINK HOVER MAGNETIC EFFECT ─────────────────────── */
(function initMagneticLinks() {
  const links = $$('.nav-cta, .btn-primary, .social-btn');
  if ('ontouchstart' in window) return;

  links.forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      link.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
      link.style.transition = 'transform 0.4s var(--ease-bounce)';
      setTimeout(() => link.style.transition = '', 400);
    });
  });
})();

/* ─── SECTION PROGRESS INDICATOR ────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(to right, #3d6b59, #c9a96e);
    z-index: 10000;
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / scrollable) * 100;
    bar.style.width = Math.min(100, progress) + '%';
  }, { passive: true });
})();

/* ─── IMAGE LAZY LOAD FALLBACK ───────────────────────────────── */
(function initLazyImages() {
  // Handles cases where native lazy loading isn't available
  if ('loading' in HTMLImageElement.prototype) return;

  const images = $$('img[loading="lazy"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
})();

/* ─── ACCESSIBILITY: FOCUS TRAP FOR MOBILE MENU ─────────────── */
(function initFocusTrap() {
  const mobileMenu = $('#mobileMenu');
  if (!mobileMenu) return;

  mobileMenu.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (e.key !== 'Tab') return;

    const focusables = $$('a, button, input, [tabindex]:not([tabindex="-1"])', mobileMenu);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();

/* ─── STATS CARD HOVER ───────────────────────────────────────── */
(function initStatsHover() {
  const statsCard = $('.about-stats-card');
  if (!statsCard) return;

  statsCard.addEventListener('mouseenter', () => {
    statsCard.style.transform = 'translateY(-4px)';
    statsCard.style.transition = 'transform 0.3s var(--ease-bounce), box-shadow 0.3s';
    statsCard.style.boxShadow = '0 16px 48px rgba(44, 74, 62, 0.18)';
  });

  statsCard.addEventListener('mouseleave', () => {
    statsCard.style.transform = '';
    statsCard.style.boxShadow = '';
  });
})();

/* ─── FOOTER BADGES STAGGER ──────────────────────────────────── */
(function initFooterBadges() {
  const badges = $$('.footer-badge');
  if (!badges.length) return;

  badges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8)';
    badge.style.transition = `opacity 0.4s ease ${index * 0.08}s, transform 0.4s var(--ease-bounce) ${index * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      badges.forEach(badge => {
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1)';
      });
      observer.unobserve(entries[0].target);
    }
  }, { threshold: 0.5 });

  const container = badges[0]?.closest('.footer-badges');
  if (container) observer.observe(container);
})();

/* ─── DRINK CARD HOVER ICON ──────────────────────────────────── */
(function initDrinkCardHover() {
  const drinkCards = $$('.drink-card');

  drinkCards.forEach(card => {
    const icon = card.querySelector('.drink-icon');
    if (!icon) return;

    card.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.2) rotate(-5deg)';
      icon.style.transition = 'transform 0.4s var(--ease-bounce)';
    });

    card.addEventListener('mouseleave', () => {
      icon.style.transform = '';
    });
  });
})();

/* ─── MARQUEE PAUSE ON HOVER ─────────────────────────────────── */
(function initMarqueePause() {
  const marquee = $('.marquee-track');
  if (!marquee) return;

  marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });

  marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
})();

/* ─── INIT COMPLETE ──────────────────────────────────────────── */
console.log('%c No.11 Penang 🌿 ', 'background: #2c4a3e; color: #c9a96e; font-size: 14px; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
console.log('%c Website by: Premium Restaurant Web Design ', 'color: #7a8b7f; font-size: 11px;');
