/* =============================================
   TINA'S KITCHEN — SHARED JAVASCRIPT
   ============================================= */

'use strict';

// ─── 1. ACTIVE NAV TAB DETECTION ─────────────────────────────────────────────
(function setActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  const pageMap = {
    'index.html': 'home',
    '': 'home',
    'menu.html': 'menu',
    'story.html': 'story',
    'gallery.html': 'gallery',
    'visit.html': 'visit'
  };

  const currentPage = pageMap[filename] || 'home';

  // Desktop ribbon tabs
  document.querySelectorAll('.ribbon-tab').forEach(tab => {
    if (tab.dataset.page === currentPage) {
      tab.classList.add('active');
    }
  });

  // Mobile bottom tabs
  document.querySelectorAll('.bottom-tab').forEach(tab => {
    if (tab.dataset.page === currentPage) {
      tab.classList.add('active');
    }
  });
})();


// ─── 2. MOBILE TAP FEEDBACK ───────────────────────────────────────────────────
document.querySelectorAll('.bottom-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    this.classList.remove('tapped');
    void this.offsetWidth; // reflow
    this.classList.add('tapped');
    setTimeout(() => this.classList.remove('tapped'), 300);
  });
});


// ─── 3. SCROLL REVEAL (IntersectionObserver) ─────────────────────────────────
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-rotate, .stamp-reveal');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings in groups
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();


// ─── 4. MENU CATEGORY SMOOTH SCROLL ─────────────────────────────────────────
(function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab[data-target]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      // Account for ribbon on desktop
      const isDesktop = window.innerWidth >= 1024;
      const offset = isDesktop ? 20 : 80;

      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Mark active
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Update active tab on scroll
  const sections = Array.from(tabs).map(t => document.getElementById(t.dataset.target)).filter(Boolean);

  if (sections.length) {
    window.addEventListener('scroll', () => {
      let currentSection = sections[0];
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
          currentSection = section;
        }
      });

      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.target === currentSection.id);
      });
    }, { passive: true });
  }
})();


// ─── 5. GALLERY LIGHTBOX ─────────────────────────────────────────────────────
(function initLightbox() {
  const overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.lightbox-close');
  const lightboxImg = overlay.querySelector('.lightbox-img');
  const lightboxCaption = overlay.querySelector('.lightbox-caption');

  function openLightbox(imgSrc, imgAlt, captionText) {
    if (lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = imgAlt;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText;
    }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  document.querySelectorAll('.scrapbook-item').forEach(item => {
    // Click handler
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      const caption = this.querySelector('.polaroid-caption');
      if (!img) return;
      openLightbox(img.src, img.alt, caption ? caption.textContent : '');
    });

    // Keyboard handler for accessibility
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const img = this.querySelector('img');
        const caption = this.querySelector('.polaroid-caption');
        if (!img) return;
        openLightbox(img.src, img.alt, caption ? caption.textContent : '');
      }
    });
  });

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeLightbox();
  });
})();


// ─── 6. SMOOTH SCROLL for anchor links ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const isDesktop = window.innerWidth >= 1024;
    const offset = isDesktop ? 20 : 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ─── 7. TIMELINE STAMP ANIMATION ─────────────────────────────────────────────
// Already handled by .stamp-reveal + IntersectionObserver above.
// This function adds staggered delays to timeline stops.
(function staggerTimeline() {
  document.querySelectorAll('.story-stop').forEach((stop, i) => {
    const revealEls = stop.querySelectorAll('.stamp-reveal, .reveal');
    revealEls.forEach(el => {
      el.dataset.delay = i * 150;
    });
  });

  // Also stagger gen-points
  document.querySelectorAll('.gen-point').forEach((pt, i) => {
    const revealEls = pt.querySelectorAll('.stamp-reveal, .reveal');
    revealEls.forEach(el => {
      el.dataset.delay = i * 180;
    });
  });

  // Stagger testimonial cards
  document.querySelectorAll('.postcard-card').forEach((card, i) => {
    card.dataset.delay = i * 120;
  });

  // Stagger scrapbook items
  document.querySelectorAll('.scrapbook-item').forEach((item, i) => {
    item.dataset.delay = (i % 4) * 100;
  });

  // Stagger recipe spreads
  document.querySelectorAll('.recipe-spread').forEach((spread, i) => {
    spread.dataset.delay = 0;
    const revealEls = spread.querySelectorAll('.reveal, .reveal-rotate');
    revealEls.forEach((el, j) => {
      el.dataset.delay = j * 120;
    });
  });
})();


// ─── 8. IMAGE ERROR FALLBACK ──────────────────────────────────────────────────
document.querySelectorAll('img[data-fallback-seed]').forEach(img => {
  img.addEventListener('error', function () {
    const seed = this.dataset.fallbackSeed || 'food';
    const w = this.dataset.fw || 700;
    const h = this.dataset.fh || 500;
    this.src = `https://picsum.photos/seed/${seed}/${w}/${h}`;
    this.removeEventListener('error', arguments.callee);
  });
});
