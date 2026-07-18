/* =============================================
   NANYA WESTERN KITCHEN — Global JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR — HAMBURGER + OVERLAY
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');
  const overlayClose = document.getElementById('overlay-close');
  const overlayLinks = document.querySelectorAll('.overlay-links a');

  function openOverlay() {
    navOverlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeOverlay() {
    navOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openOverlay);
  if (overlayClose) overlayClose.addEventListener('click', closeOverlay);

  overlayLinks.forEach(link => {
    link.addEventListener('click', closeOverlay);
  });

  // Close overlay on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOverlay();
      closeLightbox();
    }
  });

  /* ==========================================
     2. NAVBAR — SHRINK ON SCROLL
     ========================================== */
  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('shrunk');
    } else {
      navbar.classList.remove('shrunk');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ==========================================
     3. ACTIVE NAV LINK DETECTION
     ========================================== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const allNavLinks = document.querySelectorAll('.nav-links a, .overlay-links a');
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPage ||
      (currentPage === '' && href === 'index.html') ||
      (currentPage === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  /* ==========================================
     4. MENU FILTER TABS
     ========================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        menuCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
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

  /* ==========================================
     5. GALLERY LIGHTBOX
     ========================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentIndex = 0;
  const galleryData = [];

  galleryItems.forEach((item, i) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');
    if (img) {
      galleryData.push({
        src: img.src,
        alt: img.alt,
        caption: caption ? caption.textContent : ''
      });
    }

    item.addEventListener('click', () => {
      currentIndex = i;
      openLightbox();
    });
  });

  function openLightbox() {
    if (!lightbox) return;
    updateLightboxContent();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    if (!lightboxImg || galleryData.length === 0) return;
    const data = galleryData[currentIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt;
    if (lightboxCaption) lightboxCaption.textContent = data.caption;
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      updateLightboxContent();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryData.length;
      updateLightboxContent();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
      updateLightboxContent();
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryData.length;
      updateLightboxContent();
    }
  });

  /* ==========================================
     6. SCROLL REVEAL — INTERSECTION OBSERVER
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ==========================================
     7. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================
     8. IMAGE FALLBACK
     ========================================== */
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function () {
      const fallback = this.getAttribute('data-fallback');
      if (fallback && this.src !== fallback) {
        this.src = fallback;
      }
    });
  });

});
