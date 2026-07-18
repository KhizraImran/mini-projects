/* ============================================
   SIAM SOCIAL PENANG — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================
     1. ACTIVE NAV LINK DETECTION
     ============================================ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================
     2. NAVBAR SHRINK ON SCROLL
     ============================================ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ============================================
     3. MOBILE NAV OVERLAY
     ============================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileOverlay = document.getElementById('mobileNavOverlay');

  function openNav() {
    if (!hamburger || !mobileOverlay) return;
    hamburger.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    if (!hamburger || !mobileOverlay) return;
    hamburger.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hamburger.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) {
        closeNav();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNav();
      closeLightbox();
    }
  });

  /* ============================================
     4. MENU FILTER TABS
     ============================================ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');
        menuCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = '';
            });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ============================================
     5. GALLERY LIGHTBOX
     ============================================ */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;
  const galleryData = [];

  galleryItems.forEach((item, i) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    galleryData.push({
      src: img ? img.src : '',
      alt: img ? img.alt : '',
      caption: caption ? caption.textContent : ''
    });

    item.addEventListener('click', () => {
      currentIndex = i;
      showLightboxImage(currentIndex);
      openLightbox();
    });
  });

  function showLightboxImage(index) {
    if (!lightboxImg || galleryData.length === 0) return;
    const data = galleryData[index];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    if (lightboxCaption) lightboxCaption.textContent = data.caption;
  }

  function openLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      showLightboxImage(currentIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryData.length;
      showLightboxImage(currentIndex);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      showLightboxImage(currentIndex);
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryData.length;
      showLightboxImage(currentIndex);
    }
  });

  /* ============================================
     6. SCROLL REVEAL — IntersectionObserver
     ============================================ */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ============================================
     7. SMOOTH SCROLL for anchor links
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
