/* ===================================================
   BRICKFIELDS CLAYPOT RICE — script.js
=================================================== */

'use strict';

/* -------------------------------------------------------
   1. NAVIGATION — sticky scroll, active link, hamburger
------------------------------------------------------- */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks  = document.querySelectorAll('.nav-links a, .mobile-menu a');

// Sticky navbar class on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu button
const mobileClose = document.getElementById('mobileClose');
if (mobileClose) {
  mobileClose.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* -------------------------------------------------------
   2. MULTI-PAGE NAVIGATION (SPA-style, no URL reload)
------------------------------------------------------- */
const pages     = document.querySelectorAll('.page');
const allNavLinks = document.querySelectorAll('[data-page]');

function showPage(pageId) {
  // Hide all pages
  pages.forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Update active nav link state
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) link.classList.add('active');
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Close mobile menu if open
  closeMobileMenu();

  // Re-trigger animations for the new page
  setTimeout(() => {
    observeAnimations();
    triggerHeroAnimation(pageId);
  }, 60);
}

// Attach click handlers to all data-page links
allNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const pageId = link.dataset.page;
    showPage(pageId);
    // Update URL hash without reload
    history.pushState(null, '', '#' + pageId);
  });
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  showPage(hash);
});

/* -------------------------------------------------------
   3. HERO IMAGE KEN-BURNS EFFECT
------------------------------------------------------- */
function triggerHeroAnimation(pageId) {
  if (pageId === 'home') {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.classList.remove('loaded');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => heroBg.classList.add('loaded'));
      });
    }
  }
}

/* -------------------------------------------------------
   4. SCROLL-TRIGGERED FADE ANIMATIONS
------------------------------------------------------- */
let animationObserver = null;

function observeAnimations() {
  // Disconnect existing observer if any
  if (animationObserver) animationObserver.disconnect();

  const animatedEls = document.querySelectorAll(
    '.fade-up:not(.visible), .fade-in:not(.visible), .fade-left:not(.visible), .fade-right:not(.visible)'
  );

  if (!animatedEls.length) return;

  animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedEls.forEach(el => animationObserver.observe(el));
}

/* -------------------------------------------------------
   5. GALLERY — Masonry-style & Lightbox
------------------------------------------------------- */
let currentLightboxIndex = 0;
const galleryImages = [];

function initGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryImages.length = 0;

  galleryItems.forEach((item, i) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-item-caption');
    if (img) {
      galleryImages.push({
        src: img.src,
        alt: img.alt,
        caption: caption ? caption.textContent : ''
      });
      item.addEventListener('click', () => openLightbox(i));
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');

  if (!lightbox || !lbImg || !galleryImages[index]) return;

  lbImg.src = galleryImages[index].src;
  lbImg.alt = galleryImages[index].alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(direction) {
  currentLightboxIndex = (currentLightboxIndex + direction + galleryImages.length) % galleryImages.length;
  const lbImg = document.getElementById('lightboxImg');
  if (lbImg && galleryImages[currentLightboxIndex]) {
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = galleryImages[currentLightboxIndex].src;
      lbImg.alt = galleryImages[currentLightboxIndex].alt || '';
      lbImg.style.opacity = '1';
    }, 180);
  }
}

// Gallery filter buttons
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Rebuild gallery images array after filter
      initGallery();
    });
  });
}

/* -------------------------------------------------------
   6. LIGHTBOX EVENT HANDLERS
------------------------------------------------------- */
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbClose  = document.getElementById('lightboxClose');
  const lbPrev   = document.getElementById('lightboxPrev');
  const lbNext   = document.getElementById('lightboxNext');
  const lbImg    = document.getElementById('lightboxImg');

  if (!lightbox) return;

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', () => lightboxNav(-1));
  if (lbNext)  lbNext.addEventListener('click', () => lightboxNav(1));

  // Close on backdrop click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });

  // Smooth fade on image
  if (lbImg) {
    lbImg.style.transition = 'opacity 0.18s ease';
    lbImg.addEventListener('load', () => { lbImg.style.opacity = '1'; });
  }
}

/* -------------------------------------------------------
   7. SMOOTH COUNTER ANIMATION (stats)
------------------------------------------------------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* -------------------------------------------------------
   8. STAGGERED ANIMATION DELAYS (menu cards, gallery)
------------------------------------------------------- */
function applyStaggerDelays() {
  const staggerGroups = document.querySelectorAll('[data-stagger]');
  staggerGroups.forEach(group => {
    const children = group.querySelectorAll('.fade-up, .fade-in');
    children.forEach((child, i) => {
      child.style.transitionDelay = (i * 0.1) + 's';
    });
  });
}

/* -------------------------------------------------------
   9. ACTIVE NAV HIGHLIGHT based on current page
------------------------------------------------------- */
function updateActiveNav(pageId) {
  allNavLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
}

/* -------------------------------------------------------
   10. INITIAL LOAD — hash routing + startup
------------------------------------------------------- */
function init() {
  // Determine start page from hash or default to home
  const hash = window.location.hash.replace('#', '') || 'home';
  const validPages = ['home', 'about', 'menu', 'gallery', 'contact'];
  const startPage = validPages.includes(hash) ? hash : 'home';

  showPage(startPage);

  // Setup lightbox
  setupLightbox();

  // Init gallery filters and items
  initGalleryFilters();
  initGallery();

  // Init stat counters
  initCounters();

  // Apply stagger delays
  applyStaggerDelays();

  // Start hero animation
  triggerHeroAnimation(startPage);

  // Initial scroll animation sweep (for above-fold elements)
  setTimeout(observeAnimations, 150);
}

// Run after DOM is fully parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* -------------------------------------------------------
   11. CTA BUTTON — "View Menu" links to menu page
------------------------------------------------------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-page]');
  if (el && !allNavLinks.length) {
    // Fallback for dynamically attached links
    e.preventDefault();
    showPage(el.dataset.page);
  }
});
