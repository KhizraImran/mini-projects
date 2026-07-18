/* ============================================================
   CHANDELIER WINE DINE & PARTY — script.js
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVIGATION — Page switching (SPA)
   ============================================================ */
const NAV_LINKS = document.querySelectorAll('[data-page]');
const PAGES = document.querySelectorAll('.page-section');

function showPage(id) {
  PAGES.forEach(p => p.classList.remove('active'));
  NAV_LINKS.forEach(l => l.classList.remove('active'));

  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  NAV_LINKS.forEach(l => {
    if (l.dataset.page === id) l.classList.add('active');
  });

  // Store current page
  window.__currentPage = id;

  // Trigger page-specific init
  if (id === 'home') {
    initHeroAnimation();
    // Re-init particles if canvas lost context
    const canvas = document.getElementById('particle-canvas');
    if (canvas && !particleAnimation) initParticles();
  }
  if (id === 'menu') initMenuCarousels();
  if (id === 'gallery') {
    setTimeout(initGallery, 80);
  }

  // Re-trigger scroll animations
  setTimeout(observeFadeUps, 120);
}

NAV_LINKS.forEach(link => {
  link.addEventListener('click', () => showPage(link.dataset.page));
});

/* ============================================================
   2. PARTICLE CANVAS — Hero chandelier light effect
   ============================================================ */
let particleAnimation = null;

function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const isMobile = window.innerWidth < 768;
  const COUNT = isMobile ? 40 : 90;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    const size = Math.random() * 3.5 + 0.5;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      size,
      baseSize: size,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.25 - 0.1,
      opacity: Math.random() * 0.7 + 0.1,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      opacitySpeed: Math.random() * 0.012 + 0.003,
      color: Math.random() > 0.25 ? 'gold' : 'white',
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
    };
  }

  function initParticlesArr() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function drawParticle(p) {
    const twinkle = Math.sin(p.twinklePhase) * 0.4 + 0.6;
    const opacity = p.opacity * twinkle;
    const size = p.baseSize * (0.8 + twinkle * 0.4);

    ctx.save();
    ctx.globalAlpha = opacity;

    const goldColor = `rgba(201, 168, 76, ${opacity})`;
    const whiteColor = `rgba(245, 240, 232, ${opacity})`;
    const color = p.color === 'gold' ? goldColor : whiteColor;

    // Glow
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 5);
    grad.addColorStop(0, p.color === 'gold' ? `rgba(201,168,76,${opacity * 0.9})` : `rgba(245,240,232,${opacity * 0.8})`);
    grad.addColorStop(0.4, p.color === 'gold' ? `rgba(201,168,76,${opacity * 0.3})` : `rgba(245,240,232,${opacity * 0.25})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.arc(p.x, p.y, size * 5, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Core dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color === 'gold' ? '#c9a84c' : '#fff';
    ctx.fill();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      // Move
      p.x += p.speedX;
      p.y += p.speedY;
      p.twinklePhase += p.twinkleSpeed;

      // Twinkle opacity
      p.opacity += p.opacityDir * p.opacitySpeed;
      if (p.opacity >= 0.85 || p.opacity <= 0.05) p.opacityDir *= -1;

      // Wrap edges
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      drawParticle(p);
    });

    particleAnimation = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    particles.forEach(p => {
      if (p.x > W) p.x = Math.random() * W;
      if (p.y > H) p.y = Math.random() * H;
    });
  });

  initParticlesArr();
  animate();
}

/* ============================================================
   3. HERO TEXT STAGGER ANIMATION
   ============================================================ */
function initHeroAnimation() {
  // Eyebrow
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (eyebrow) {
    setTimeout(() => eyebrow.classList.add('revealed'), 300);
  }

  // Title words
  const wordInners = document.querySelectorAll('.hero-title .word-inner');
  wordInners.forEach((el, i) => {
    el.style.transition = `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.12}s, opacity 0.5s ease ${0.5 + i * 0.12}s`;
    setTimeout(() => el.classList.add('revealed'), 100);
  });

  // Subtitle
  const sub = document.querySelector('.hero-subtitle');
  if (sub) setTimeout(() => sub.classList.add('revealed'), 200);

  // CTAs
  const ctas = document.querySelector('.hero-ctas');
  if (ctas) setTimeout(() => ctas.classList.add('revealed'), 300);

  // Init particles
  if (!particleAnimation) {
    initParticles();
  }
}

/* ============================================================
   4. MENU TABS
   ============================================================ */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('menu-panel-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

function initMenuCarousels() {
  // On mobile, ensure carousels are draggable
  const carousels = document.querySelectorAll('.menu-carousel, .carousel-scroll');
  carousels.forEach(enableDragScroll);
}

/* ============================================================
   5. DRAG-TO-SCROLL helper
   ============================================================ */
function enableDragScroll(el) {
  if (!el || el._dragEnabled) return;
  el._dragEnabled = true;
  let isDown = false, startX, scrollLeft;

  el.addEventListener('mousedown', e => {
    isDown = true;
    el.style.cursor = 'grabbing';
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mouseup', () => { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.6;
    el.scrollLeft = scrollLeft - walk;
  });
}

/* ============================================================
   6. ROOM SELECTOR — Interactive expand/collapse
   ============================================================ */
function initRoomSelector() {
  const cards = document.querySelectorAll('.room-card');

  function toggleCard(card) {
    const isExpanded = card.classList.contains('expanded');

    // Collapse all
    cards.forEach(c => {
      c.classList.remove('expanded');
      c.setAttribute('aria-expanded', 'false');
      const exp = c.querySelector('.room-card-expand');
      if (exp) {
        exp.style.transition = 'height 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
        exp.style.height = '0px';
        exp.style.overflow = 'hidden';
      }
    });

    if (!isExpanded) {
      card.classList.add('expanded');
      card.setAttribute('aria-expanded', 'true');
      const exp = card.querySelector('.room-card-expand');
      if (exp) {
        const inner = exp.querySelector('.room-expand-inner');
        if (inner) {
          exp.style.height = '0px';
          exp.style.overflow = 'hidden';
          // Force reflow
          void exp.offsetHeight;
          exp.style.transition = 'height 0.45s cubic-bezier(0.25,0.46,0.45,0.94)';
          exp.style.height = inner.scrollHeight + 'px';
          setTimeout(() => {
            exp.style.overflow = 'visible';
            exp.style.height = 'auto';
          }, 460);
        }
      }
    }
  }

  cards.forEach(card => {
    // Initialize all as collapsed
    const exp = card.querySelector('.room-card-expand');
    if (exp) { exp.style.height = '0px'; exp.style.overflow = 'hidden'; }

    card.addEventListener('click', () => toggleCard(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });
}

/* ============================================================
   7. GALLERY LIGHTBOX
   ============================================================ */
let galleryImages = [];
let currentLightboxIdx = 0;

function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  galleryImages = [];
  items.forEach((item, i) => {
    const img = item.querySelector('img');
    if (img) galleryImages.push({ src: img.src, alt: img.alt });
    item.addEventListener('click', () => openLightbox(i));
  });

  // Also drag scroll on carousel items
  const carousels = document.querySelectorAll('.carousel-scroll');
  carousels.forEach(enableDragScroll);
}

function openLightbox(idx) {
  currentLightboxIdx = idx;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img || !galleryImages[idx]) return;
  img.src = galleryImages[idx].src;
  img.alt = galleryImages[idx].alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxPrev() {
  currentLightboxIdx = (currentLightboxIdx - 1 + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightbox-img');
  if (img && galleryImages[currentLightboxIdx]) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = galleryImages[currentLightboxIdx].src;
      img.style.opacity = '1';
    }, 200);
  }
}

function lightboxNext() {
  currentLightboxIdx = (currentLightboxIdx + 1) % galleryImages.length;
  const img = document.getElementById('lightbox-img');
  if (img && galleryImages[currentLightboxIdx]) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = galleryImages[currentLightboxIdx].src;
      img.style.opacity = '1';
    }, 200);
  }
}

/* ============================================================
   8. SCROLL FADE-UP (IntersectionObserver)
   ============================================================ */
function observeFadeUps() {
  const els = document.querySelectorAll('.fade-up:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

/* ============================================================
   9. PARALLAX HERO SCROLL (desktop)
   ============================================================ */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg-img');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    if (window.__currentPage !== 'home') return;
    const scrolled = window.pageYOffset;
    heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
  }, { passive: true });
}

/* ============================================================
   10. LIGHTBOX EVENTS
   ============================================================ */
function initLightboxEvents() {
  const lb = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lb-close');
  const prevBtn = document.getElementById('lb-prev');
  const nextBtn = document.getElementById('lb-next');
  const img = document.getElementById('lightbox-img');

  if (img) {
    img.style.transition = 'opacity 0.2s ease';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', lightboxPrev);
  if (nextBtn) nextBtn.addEventListener('click', lightboxNext);

  if (lb) {
    lb.addEventListener('click', e => {
      if (e.target === lb) closeLightbox();
    });
  }

  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  });
}

/* ============================================================
   11. ABOUT CAROUSEL DRAG SCROLL
   ============================================================ */
function initAboutCarousel() {
  const carousel = document.querySelector('.carousel-scroll');
  if (carousel) enableDragScroll(carousel);
}

/* ============================================================
   12. INIT
   ============================================================ */
/* ============================================================
   13. DELEGATE content CTA clicks (data-page on non-nav buttons)
   ============================================================ */
function initContentCTAs() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;
    // Avoid double-handling for nav links (already wired)
    if (btn.closest('#pill-nav') || btn.closest('#bottom-nav')) return;
    const page = btn.dataset.page;
    if (page) showPage(page);
  });
}

/* ============================================================
   14. RESERVE FLOAT — show/hide based on viewport
   ============================================================ */
function initReserveFloat() {
  const bar = document.getElementById('reserve-float');
  if (!bar) return;

  function updateVisibility() {
    if (window.innerWidth <= 768) {
      bar.style.display = 'flex';
    } else {
      bar.style.display = 'none';
    }
  }

  updateVisibility();
  window.addEventListener('resize', updateVisibility, { passive: true });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Show home page by default
  showPage('home');

  // Init all interactive components
  initMenuTabs();
  initRoomSelector();
  initLightboxEvents();
  initAboutCarousel();
  initParallax();
  initContentCTAs();
  initReserveFloat();
  observeFadeUps();

  // Init particles immediately for hero
  setTimeout(initParticles, 200);
});
