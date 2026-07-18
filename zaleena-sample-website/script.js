/* ============================================================
   ZALEENA NASI KUKUS — script.js
   Multi-page SPA | Radial FAB | Flip Cards | Masonry Lightbox
   ============================================================ */

'use strict';

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initFAB();
  initSteamParallax();
  initLightbox();
  initFlipCards();
  initScrollAnimations();
  initMapFallback();
  initStickyWA();
});

/* ============================================================
   NAVIGATION — Page Router
   ============================================================ */
function initNavigation() {
  const pages   = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');

  function showPage(id, pushState = true) {
    // Hide all pages
    pages.forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });

    // Show target page
    const target = document.getElementById('page-' + id);
    if (!target) return;
    target.style.display = 'block';
    // Force reflow for animation
    void target.offsetWidth;
    target.classList.add('active');

    // Update nav link states
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.page === id);
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Push browser history
    if (pushState) {
      history.pushState({ page: id }, '', '#' + id);
    }

    // Re-init gallery masonry on gallery page
    if (id === 'gallery') {
      setTimeout(initMasonryHeights, 100);
    }
  }

  // Attach click handlers to all [data-page] elements
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const pid = a.dataset.page;
      showPage(pid);

      // Close FAB if open
      const fab = document.getElementById('fab-container');
      if (fab && fab.classList.contains('open')) {
        fab.classList.remove('open');
        document.getElementById('fab-toggle').classList.remove('open');
      }
    });
  });

  // Handle browser back/forward
  window.addEventListener('popstate', e => {
    const pid = e.state?.page || 'home';
    showPage(pid, false);
  });

  // Initial page from hash or default
  const hash = window.location.hash.replace('#', '') || 'home';
  showPage(hash, false);
}

/* ============================================================
   FLOATING RADIAL FAB — Mobile
   ============================================================ */
function initFAB() {
  const container = document.getElementById('fab-container');
  const toggle    = document.getElementById('fab-toggle');
  if (!container || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = container.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen ? '✕' : '🍚';
  });

  // Close FAB when tapping outside
  document.addEventListener('click', e => {
    if (!container.contains(e.target)) {
      container.classList.remove('open');
      toggle.classList.remove('open');
      toggle.innerHTML = '🍚';
    }
  });

  // Keyboard accessibility
  toggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
    if (e.key === 'Escape') { container.classList.remove('open'); toggle.classList.remove('open'); toggle.innerHTML = '🍚'; }
  });
}

/* ============================================================
   STEAM PARALLAX on scroll — Desktop
   ============================================================ */
function initSteamParallax() {
  const hero = document.querySelector('.hero');
  const wisps = document.querySelectorAll('.steam-wisp');
  if (!hero || !wisps.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroH   = hero.offsetHeight;
      const progress = Math.min(scrollY / heroH, 1);

      // Parallax the background
      const bg = hero.querySelector('.hero-bg');
      if (bg) bg.style.transform = `scale(1.06) translateY(${progress * 40}px)`;

      // Fade steam on scroll
      wisps.forEach(w => {
        w.style.opacity = String(1 - progress * 1.5);
      });

      ticking = false;
    });
    ticking = true;
  });
}

/* ============================================================
   FLIP CARDS — Touch toggle for mobile, hover for desktop
   ============================================================ */
function initFlipCards() {
  // Only apply tap-to-flip on touch/non-hover devices
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.flip-card').forEach(card => {
    if (isTouchDevice) {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
      });
    }

    // Keyboard support
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Flip card to see dish details');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
}

/* ============================================================
   MASONRY — Adjust column spans for varied heights
   ============================================================ */
function initMasonryHeights() {
  // CSS columns handles masonry natively — just ensure images loaded
  const imgs = document.querySelectorAll('.masonry-item img');
  imgs.forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        // CSS columns reflows automatically
      });
    }
  });
}

/* ============================================================
   LIGHTBOX — with touch swipe support
   ============================================================ */
function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbClose    = document.getElementById('lb-close');
  const lbPrev     = document.getElementById('lb-prev');
  const lbNext     = document.getElementById('lb-next');
  const lbCounter  = document.getElementById('lb-counter');
  if (!lightbox || !lbImg) return;

  let images  = [];
  let current = 0;

  function openLightbox(index) {
    images  = Array.from(document.querySelectorAll('.masonry-item img'));
    current = index;
    showImage(current);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showImage(i) {
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = images[i].src.replace('w=280', 'w=1200').replace('h=200', 'h=800');
      lbImg.alt = images[i].alt || 'Gallery image';
      lbImg.style.opacity = '1';
    }, 200);
    if (lbCounter) lbCounter.textContent = `${i + 1} / ${images.length}`;
  }

  function prevImage() { current = (current - 1 + images.length) % images.length; showImage(current); }
  function nextImage() { current = (current + 1)                 % images.length;  showImage(current); }

  // Attach open handlers to masonry items
  document.addEventListener('click', e => {
    const item = e.target.closest('.masonry-item');
    if (!item) return;
    const allItems = Array.from(document.querySelectorAll('.masonry-item'));
    openLightbox(allItems.indexOf(item));
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click',  prevImage);
  lbNext?.addEventListener('click',  nextImage);

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape')     closeLightbox();
  });

  // Click outside image to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // ── Touch Swipe ──
  let touchStartX = 0;
  let touchStartY = 0;

  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? nextImage() : prevImage();
    }
  }, { passive: true });
}

/* ============================================================
   SCROLL ANIMATIONS — Intersection Observer
   ============================================================ */
function initScrollAnimations() {
  const opts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, opts);

  document.querySelectorAll(
    '.flip-card, .masonry-item, .value-card, .teaser-card, .about-blob-img, .contact-item'
  ).forEach((el, i) => {
    el.style.animationDelay = `${i * 0.06}s`;
    el.style.animationPlayState = 'paused';
    el.classList.add('fade-up-anim');
    observer.observe(el);
  });

  // Inject keyframe style once
  if (!document.getElementById('anim-style')) {
    const s = document.createElement('style');
    s.id = 'anim-style';
    s.textContent = `
      .fade-up-anim {
        opacity: 0;
        transform: translateY(28px);
        animation: fadeUpIn 0.55s cubic-bezier(.4,0,.2,1) forwards paused;
      }
      .fade-up-anim.in-view {
        opacity: 1;
        transform: none;
      }
      @keyframes fadeUpIn {
        from { opacity:0; transform:translateY(28px); }
        to   { opacity:1; transform:translateY(0); }
      }
    `;
    document.head.appendChild(s);
  }
}

/* ============================================================
   MAP FALLBACK — hide iframe if it fails, show link
   ============================================================ */
function initMapFallback() {
  const iframe   = document.getElementById('map-iframe');
  const fallback = document.getElementById('map-fallback');
  if (!iframe || !fallback) return;

  iframe.addEventListener('error', () => {
    iframe.style.display = 'none';
    fallback.style.display = 'flex';
  });

  // Also show fallback if iframe doesn't load within 8s (common for maps in some regions)
  setTimeout(() => {
    try {
      if (iframe.contentDocument === null) {
        // May be blocked, show fallback as supplement
        fallback.style.display = 'flex';
        iframe.style.height = '180px';
      }
    } catch (e) {
      // Cross-origin, likely loaded fine
    }
  }, 8000);
}

/* ============================================================
   STICKY WHATSAPP BUTTON — Show on mobile after scroll
   ============================================================ */
function initStickyWA() {
  // The sticky WA is always visible on mobile (controlled by CSS display)
  // On scroll, ensure FAB doesn't overlap
}

/* ============================================================
   HERO — Trigger BG scale on load
   ============================================================ */
window.addEventListener('load', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = 'scale(1.0)';
  }
});
