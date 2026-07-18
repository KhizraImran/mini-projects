/* ========== NAVBAR SCROLL ========== */
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ========== HAMBURGER / MOBILE NAV ========== */
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  if (!hamburger || !mobileNav) return;

  function openNav() {
    mobileNav.classList.add('open');
    document.body.classList.add('body-lock');
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    document.body.classList.remove('body-lock');
  }

  hamburger.addEventListener('click', openNav);

  if (closeBtn) closeBtn.addEventListener('click', closeNav);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });
})();

/* ========== SCROLL REVEAL ========== */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.1) + 's';
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ========== MENU TABS ========== */
(function () {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  if (!tabBtns.length || !menuCards.length) return;

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCards.forEach(function (card) {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          if (card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
})();

/* ========== BRANCH SEARCH ========== */
(function () {
  const searchInput = document.querySelector('.branch-search');
  const branchCards = document.querySelectorAll('.branch-card');

  if (!searchInput || !branchCards.length) return;

  searchInput.addEventListener('keyup', function () {
    const query = searchInput.value.toLowerCase().trim();

    branchCards.forEach(function (card) {
      const city = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
      const address = (card.querySelector('.branch-address') ? card.querySelector('.branch-address').textContent : '').toLowerCase();

      if (city.includes(query) || address.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
})();

/* ========== SMOOTH SCROLL (scroll arrow) ========== */
(function () {
  const arrow = document.querySelector('.scroll-arrow');
  if (!arrow) return;

  arrow.addEventListener('click', function () {
    const target = document.querySelector('.feature-strip') || document.querySelector('section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
