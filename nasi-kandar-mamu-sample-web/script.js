// ===========================
// 1. NAVBAR SCROLL EFFECT
// ===========================
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

// ===========================
// 2. MOBILE HAMBURGER MENU
// ===========================
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.classList.add('nav-open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  hamburger.addEventListener('click', openMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ===========================
// 3. SCROLL REVEAL
// ===========================
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();

// ===========================
// 4. MENU TAB FILTER (menu.html)
// ===========================
(function () {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  if (!tabBtns.length || !menuCards.length) return;

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      // Update active tab
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Filter cards
      menuCards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          if (card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });
})();

// ===========================
// 5. GALLERY HOVER OVERLAY (gallery.html)
// ===========================
(function () {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  galleryItems.forEach(function (item) {
    const overlay = item.querySelector('.caption-overlay');
    if (!overlay) return;

    item.addEventListener('mouseenter', function () {
      overlay.style.transform = 'translateY(0)';
    });

    item.addEventListener('mouseleave', function () {
      overlay.style.transform = 'translateY(100%)';
    });

    // Touch support
    item.addEventListener('touchstart', function () {
      overlay.style.transform = 'translateY(0)';
    }, { passive: true });

    item.addEventListener('touchend', function () {
      setTimeout(function () {
        overlay.style.transform = 'translateY(100%)';
      }, 1400);
    }, { passive: true });
  });
})();

// ===========================
// 6. ACTIVE NAV LINK (set via HTML, but also auto-detect)
// ===========================
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();

    // Already set via class in HTML, but ensure consistency
    if (linkPage === path) {
      link.classList.add('active');
    }

    // Handle index.html = '' or '/'
    if ((path === '' || path === '/' || path === 'index.html') && (linkPage === 'index.html' || linkPage === '')) {
      link.classList.add('active');
    }
  });
})();

// ===========================
// 7. SMOOTH SCROLL
// (handled by CSS: scroll-behavior: smooth on html)
// Extra: internal anchor smooth scroll
// ===========================
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
