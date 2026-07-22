/* ============================================================
   SIFU NYONYA CUISINE — Heritage Peranakan Dining
   Premium Website JavaScript
   ============================================================ */

/* ─── UTILITY ─────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/* ─── DOM READY ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCustomCursor();
  initScrollProgress();
  initNavigation();
  initRevealAnimations();
  initTimeline();
  initParallax();
  initReviewsCarousel();
  initBackToTop();
  initGalleryHover();
  initKeyboardNavigation();
});

/* ─── LOADER ─────────────────────────────────────────────────── */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  // Minimum display time for branded experience
  const minDisplay = 1800;
  const startTime = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDisplay - elapsed);

    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';

      // Trigger hero animations
      setTimeout(() => {
        $$('[data-reveal]').forEach(el => {
          if (isInViewport(el)) el.classList.add('revealed');
        });
      }, 200);
    }, remaining);
  });

  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';
}

/* ─── CUSTOM CURSOR ──────────────────────────────────────────── */
function initCustomCursor() {
  const outer = $('#cursorOuter');
  const inner = $('#cursorInner');

  if (!outer || !inner) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Inner follows immediately
    inner.style.left = mouseX + 'px';
    inner.style.top = mouseY + 'px';
  });

  // Outer follows with lag
  function animateOuter() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    outer.style.left = outerX + 'px';
    outer.style.top = outerY + 'px';
    requestAnimationFrame(animateOuter);
  }

  animateOuter();

  // Hover state on interactive elements
  const interactives = $$('a, button, .dish-img-wrap, .gallery-item, .chef-img-inner');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    outer.style.opacity = '0';
    inner.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    outer.style.opacity = '1';
    inner.style.opacity = '1';
  });
}

/* ─── SCROLL PROGRESS ────────────────────────────────────────── */
function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ─── NAVIGATION ─────────────────────────────────────────────── */
function initNavigation() {
  const header = $('#siteHeader');
  const toggle = $('#navToggle');
  const navLinks = $('#navLinks');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 60);
        lastScroll = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Mobile toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen.toString());
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    $$('.nav-link, .nav-cta', navLinks).forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !toggle.contains(e.target)) {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Smooth scroll for anchor links
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = $(targetId);
      if (!target) return;
      e.preventDefault();

      const headerHeight = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

/* ─── INTERSECTION OBSERVER REVEAL ANIMATIONS ────────────────── */
function initRevealAnimations() {
  const elements = $$('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = $$('[data-reveal]', entry.target.parentElement);
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 80;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '-60px 0px',
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/* ─── TIMELINE ───────────────────────────────────────────────── */
function initTimeline() {
  const track = $('#timelineTrack');
  const prevBtn = $('#timelinePrev');
  const nextBtn = $('#timelineNext');
  const dots = $$('.t-dot');
  const panels = $$('.timeline-panel');

  if (!track || !panels.length) return;

  let current = 0;
  const total = panels.length;
  let startX = 0;
  let isDragging = false;
  const isMobile = () => window.innerWidth <= 768;

  function goTo(index) {
    if (isMobile()) return; // No horizontal nav on mobile

    const clamped = clamp(index, 0, total - 1);
    if (clamped === current && index !== 0) return;

    current = clamped;
    track.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', (i === current).toString());
    });

    // Update rail dots
    $$('.rail-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });

    // Update buttons
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
  }

  // Button events
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Dot events
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Touch swipe
  const wrapper = $('#timelineWrapper');
  if (wrapper) {
    wrapper.addEventListener('touchstart', e => {
      if (isMobile()) return;
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    wrapper.addEventListener('touchend', e => {
      if (!isDragging || isMobile()) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 60) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
      isDragging = false;
    }, { passive: true });
  }

  // Keyboard navigation (handled in initKeyboardNavigation)
  // Expose globally for keyboard handler
  window._timeline = { goTo, getCurrent: () => current, getTotal: () => total };

  // Initialize
  goTo(0);

  // Handle resize — reset on mobile
  window.addEventListener('resize', () => {
    if (isMobile()) {
      track.style.transform = '';
    } else {
      goTo(current);
    }
  });
}

/* ─── PARALLAX ───────────────────────────────────────────────── */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxImg = $('#parallaxImg');
  const resParallax = $('#reservationParallax');

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    if (parallaxImg) {
      const section = parallaxImg.closest('section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const progress = (scrollY - sectionTop) / (section.offsetHeight + window.innerHeight);
        const offset = clamp(progress * 120 - 20, -30, 30);
        parallaxImg.style.transform = `translateY(${offset}px)`;
      }
    }

    if (resParallax) {
      const section = resParallax.closest('section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const progress = (scrollY - sectionTop) / (section.offsetHeight + window.innerHeight);
        const offset = clamp(progress * 100 - 15, -25, 25);
        resParallax.style.transform = `translateY(${offset}px)`;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* ─── REVIEWS CAROUSEL ───────────────────────────────────────── */
function initReviewsCarousel() {
  const track = $('#reviewsTrack');
  const prevBtn = $('#carouselPrev');
  const nextBtn = $('#carouselNext');
  const indicatorsContainer = $('#carouselIndicators');

  if (!track) return;

  const cards = $$('.review-card', track);
  const total = cards.length;
  let current = 0;
  let autoplayTimer = null;
  let startX = 0;
  let isDragging = false;

  // Build indicators
  if (indicatorsContainer) {
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to review ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      indicatorsContainer.appendChild(dot);
    });
  }

  function updateIndicators() {
    if (!indicatorsContainer) return;
    $$('.carousel-dot', indicatorsContainer).forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateIndicators();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

  // Touch swipe
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoplayTimer);
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    isDragging = false;
    resetAutoplay();
  }, { passive: true });

  // Autoplay
  function startAutoplay() {
    autoplayTimer = setInterval(next, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Pause on hover
  const section = track.closest('section');
  if (section) {
    section.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    section.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

/* ─── BACK TO TOP ────────────────────────────────────────────── */
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── GALLERY HOVER DEPTH EFFECT ─────────────────────────────── */
function initGalleryHover() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  $$('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = y * -6;
      const rotY = x * 6;
      item.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
      item.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
      item.style.boxShadow = `${-x * 20}px ${-y * 20}px 40px rgba(58,45,40,0.25)`;
      item.style.zIndex = '2';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
      item.style.transition = 'transform 0.6s ease, box-shadow 0.6s ease';
      item.style.zIndex = '';
    });
  });

  // 3D hover on dish feature cards
  $$('.dish-feature').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
      card.style.transition = 'transform 0.15s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s ease';
    });
  });
}

/* ─── KEYBOARD NAVIGATION ────────────────────────────────────── */
function initKeyboardNavigation() {
  document.addEventListener('keydown', e => {
    // Timeline arrow keys
    const timelineSection = $('#journey');
    if (timelineSection && isInViewport(timelineSection) && window._timeline) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        window._timeline.goTo(window._timeline.getCurrent() - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        window._timeline.goTo(window._timeline.getCurrent() + 1);
      }
    }
  });
}

/* ─── PAPER REVEAL ANIMATION (hero text lines) ───────────────── */
// Uses CSS animations — no additional JS needed.
// CSS handles the staggered fade-up on load.

/* ─── SMOOTH PAGE TRANSITIONS ────────────────────────────────── */
// Section reveal transitions are managed by IntersectionObserver above.
// Additional micro-transitions on nav link hover are managed in CSS.

/* ─── DISH INFO COUNTER ANIMATION ───────────────────────────── */
(function initCounterAnimation() {
  const stats = $$('.stat-number');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const rawText = el.textContent;
      const num = parseFloat(rawText.replace(/[^0-9.]/g, ''));
      const suffix = rawText.replace(/[0-9.]/g, '');

      if (isNaN(num)) return;

      const duration = 1200;
      const start = performance.now();
      const isDecimal = num % 1 !== 0;

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = num * eased;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
})();

/* ─── CHEF CREDENTIAL COUNTER ────────────────────────────────── */
(function initCredCounters() {
  const vals = $$('.cred-value');
  if (!vals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent;
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      if (isNaN(num)) return;

      let start = null;
      const duration = 1000;

      function tick(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(num * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  vals.forEach(v => observer.observe(v));
})();

/* ─── IMAGE LAZY LOAD OBSERVER ───────────────────────────────── */
(function initLazyLoad() {
  // Native lazy loading is used via `loading="lazy"` in HTML.
  // This provides a fade-in effect when images load.
  const images = $$('img[loading="lazy"]');

  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';

    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      img.addEventListener('error', () => {
        img.style.opacity = '0.5';
      });
    }
  });
})();

/* ─── ACTIVE NAV HIGHLIGHT ON SCROLL ─────────────────────────── */
(function initActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.style.color = href === '#' + id ? 'var(--gold)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ─── PERANAKAN TILE PATTERNS (subtle CSS-driven) ────────────── */
// SVG tile patterns are embedded in HTML and styled via CSS.
// No additional JS needed.

/* ─── RESIZE HANDLER ─────────────────────────────────────────── */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Re-init cursor hover elements after resize
    if (window.innerWidth > 768) {
      $$('a, button, .dish-img-wrap, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }
  }, 250);
});

/* ─── FOOTER YEAR ─────────────────────────────────────────────── */
(function setFooterYear() {
  const yearEls = $$('.footer-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => { el.textContent = year; });
})();
