// =============================================
//  COLEY — script.js
//  Vanilla JS — No external libraries
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ===== 1. NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load


  // ===== 2. MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });


  // ===== 3. SCROLL REVEAL (IntersectionObserver) =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // only animate once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }


  // ===== 4. MENU TAB FILTER (menu.html only) =====
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuItems = document.querySelectorAll('.menu-item');

  if (menuTabs.length > 0 && menuItems.length > 0) {

    menuTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active tab styling
        menuTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');

        // Show/hide menu items
        menuItems.forEach(function (item) {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    // Default: show all on load
    const defaultTab = document.querySelector('.menu-tab[data-filter="all"]');
    if (defaultTab) defaultTab.click();
  }


  // ===== 5. ACTIVE NAV LINK (highlight current page) =====
  // This is handled via class="active" on each HTML page's nav link.
  // No additional JS needed — CSS handles the visual styling.


  // ===== 6. SMOOTH SCROLL for anchor links =====
  // Handled globally via CSS: html { scroll-behavior: smooth; }
  // Extra JS support for older browsers:
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


  // ===== 7. PARTICLES — hero section =====
  // Particles are rendered purely in CSS via @keyframes.
  // This JS dynamically sets random positions/sizes for variety.
  const particleContainer = document.querySelector('.particles');
  if (particleContainer) {
    const particleCount = 7;
    particleContainer.innerHTML = ''; // clear existing

    for (let i = 0; i < particleCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('particle');

      const size = Math.random() * 5 + 3; // 3px–8px
      const left = Math.random() * 90 + 5; // 5%–95%
      const duration = Math.random() * 8 + 8; // 8s–16s
      const delay = Math.random() * -14; // stagger start
      const drift = (Math.random() - 0.5) * 80; // -40px to +40px horizontal drift
      const opacity = (Math.random() * 0.2 + 0.3).toFixed(2); // 0.3–0.5

      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: 0;
        --dur: ${duration}s;
        --delay: ${delay}s;
        --drift: ${drift}px;
        --max-opacity: ${opacity};
      `;

      particleContainer.appendChild(dot);
    }
  }


  // ===== 8. CURRENT DAY HIGHLIGHT (contact.html hours table) =====
  const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayIndex = new Date().getDay();
  const todayName = dayMap[todayIndex];

  const hourRows = document.querySelectorAll('.hours-table tr[data-day]');
  hourRows.forEach(function (row) {
    if (row.getAttribute('data-day') === todayName) {
      row.classList.add('today-row');
      const tds = row.querySelectorAll('td');
      tds.forEach(function (td) { td.style.color = 'var(--gold)'; });
    }
  });


  // ===== 9. YEAR AUTO-UPDATE in footer =====
  const yearSpans = document.querySelectorAll('.footer-year');
  yearSpans.forEach(function (span) {
    span.textContent = new Date().getFullYear();
  });

});
