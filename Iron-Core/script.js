/* ============================================================
   IronCore Fitness — Global JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 0. DATA-BG → BACKGROUND IMAGE (keeps markup free of style="") ─ */
  document.querySelectorAll('[data-bg]').forEach(function (el) {
    el.style.backgroundImage = 'url(' + el.dataset.bg + ')';
  });

  /* ── 1. NAVBAR: Scroll Effect ─────────────────────────────── */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 2. HAMBURGER / SIDE DRAWER ────────────────────────────── */
  const hamburger      = document.querySelector('.hamburger');
  const sideDrawer     = document.querySelector('.side-drawer');
  const drawerOverlay  = document.querySelector('.drawer-overlay');
  const drawerClose    = document.querySelector('.drawer-close');

  function openDrawer() {
    if (!sideDrawer) return;
    hamburger.classList.add('open');
    sideDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!sideDrawer) return;
    hamburger.classList.remove('open');
    sideDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger)     hamburger.addEventListener('click', openDrawer);
  if (drawerClose)   drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close on drawer nav links
  document.querySelectorAll('.drawer-nav a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ── 3. ACTIVE NAV LINK ────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .drawer-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 4. SCROLL REVEAL (Intersection Observer) ──────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  /* ── 5. ANIMATED COUNTERS ──────────────────────────────────── */
  function animateCounter(el, target, duration = 2000, prefix = '', suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target  = parseFloat(el.dataset.target  || 0);
          const prefix  = el.dataset.prefix  || '';
          const suffix  = el.dataset.suffix  || '';
          animateCounter(el, target, 2000, prefix, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  /* ── 6. ACCORDION (FAQ) ────────────────────────────────────── */
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const inner = item.querySelector('.accordion-body-inner');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-body').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  /* ── 7. TAB FILTER (Programs) ──────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;

        filterItems.forEach((item, i) => {
          const cat = item.dataset.category;
          const show = filter === 'all' || cat === filter;

          item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

          if (show) {
            item.style.display = '';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, i * 40);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => { item.style.display = 'none'; }, 320);
          }
        });
      });
    });
  }

  /* ── 8. SLIDER (Testimonials) ──────────────────────────────── */
  function initSlider(wrapSelector) {
    const wrap  = document.querySelector(wrapSelector);
    if (!wrap) return;

    const track = wrap.querySelector('.slider-track');
    const slides = wrap.querySelectorAll('.slide');
    const dots   = wrap.querySelectorAll('.dot');
    const prevBtn = wrap.querySelector('.slider-arrow.prev');
    const nextBtn = wrap.querySelector('.slider-arrow.next');

    if (!track || slides.length === 0) return;

    let current = 0;
    let autoTimer = null;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(current + 1), 5500);
    }
    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goTo(i); startAuto(); });
    });

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
      startAuto();
    });

    goTo(0);
    startAuto();
  }

  initSlider('.testimonial-slider');

  /* ── 9. LIGHTBOX (Gallery) ─────────────────────────────────── */
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  if (lightboxOverlay) {
    const lightboxImg  = lightboxOverlay.querySelector('.lightbox-img-wrap img');
    const lightboxClose = lightboxOverlay.querySelector('.lightbox-close');
    const lightboxPrev = lightboxOverlay.querySelector('.lightbox-arrow.prev');
    const lightboxNext = lightboxOverlay.querySelector('.lightbox-arrow.next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentLightboxIdx = 0;
    const imgSrcs = [];
    const imgAlts = [];

    galleryItems.forEach((item, i) => {
      const img = item.querySelector('img');
      imgSrcs.push(img.src);
      imgAlts.push(img.alt || '');
      item.addEventListener('click', () => openLightbox(i));
    });

    function openLightbox(idx) {
      currentLightboxIdx = idx;
      lightboxImg.src = imgSrcs[idx];
      lightboxImg.alt = imgAlts[idx];
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    function prevLightbox() {
      currentLightboxIdx = (currentLightboxIdx - 1 + imgSrcs.length) % imgSrcs.length;
      lightboxImg.src = imgSrcs[currentLightboxIdx];
    }
    function nextLightbox() {
      currentLightboxIdx = (currentLightboxIdx + 1) % imgSrcs.length;
      lightboxImg.src = imgSrcs[currentLightboxIdx];
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev)  lightboxPrev.addEventListener('click', prevLightbox);
    if (lightboxNext)  lightboxNext.addEventListener('click', nextLightbox);

    lightboxOverlay.addEventListener('click', e => {
      if (e.target === lightboxOverlay) closeLightbox();
    });

    document.addEventListener('keydown', e => {
      if (!lightboxOverlay.classList.contains('active')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   prevLightbox();
      if (e.key === 'ArrowRight')  nextLightbox();
    });
  }

  /* ── 10. CONTACT FORM SUBMIT ────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#22c55e';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1200);
    });
  }

  /* ── 11. GALLERY FILTER TABS ────────────────────────────────── */
  const galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems2  = document.querySelectorAll('.gallery-item');

  if (galleryTabBtns.length > 0) {
    galleryTabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        galleryTabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;

        galleryItems2.forEach(item => {
          const cat = item.dataset.cat;
          const show = filter === 'all' || cat === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ── 12. PAGE LOAD ANIMATION ────────────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

});