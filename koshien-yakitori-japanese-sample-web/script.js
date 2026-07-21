/**
 * ═══════════════════════════════════════════════════════════════════
 *  KOSHIEN YAKITORI JAPANESE — Premium JavaScript
 *  Theme: Modern Izakaya · Tokyo Night · Dark Luxury
 *  Author: Elite Creative Studio
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────
   1. DOM Ready Wrapper
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initCustomCursor();
  initScrollProgress();
  initNavbar();
  initHamburgerMenu();
  initHeroParallax();
  initTypingEffect();
  initRevealObserver();
  initMagneticButtons();
  initRippleEffect();
  initDrinksSlider();
  initReviewsSlider();
  initContactForm();
  initBackToTop();
  initSmoothScrollLinks();
});

/* ─────────────────────────────────────────
   2. Loading Screen
───────────────────────────────────────── */
function initLoadingScreen() {
  const screen = document.getElementById('loadingScreen');
  const fill   = document.getElementById('loadingFill');

  if (!screen || !fill) return;

  let progress = 0;

  // Animate the progress bar
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // After bar fills, hide loader
      setTimeout(() => {
        screen.classList.add('hidden');
        document.body.style.overflow = '';

        // Trigger hero reveal
        document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120);
        });
      }, 400);
    }
    fill.style.width = progress + '%';
  }, 80);

  // Prevent scroll during load
  document.body.style.overflow = 'hidden';
}

/* ─────────────────────────────────────────
   3. Custom Cursor
───────────────────────────────────────── */
function initCustomCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!dot || !ring) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let raf;

  // Track mouse precisely for dot
  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;

    dot.style.transform  = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover states — enlarge ring on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .menu-card, .drink-card, .review-card, .card-btn, [role="button"]'
  );

  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  // Hide when cursor leaves window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

/* ─────────────────────────────────────────
   4. Scroll Progress Bar
───────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
}

/* ─────────────────────────────────────────
   5. Navbar — Sticky Glass Effect
───────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on init
}

/* ─────────────────────────────────────────
   6. Hamburger / Mobile Menu
───────────────────────────────────────── */
function initHamburgerMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  // Set delay variables for stagger animation
  mobileLinks.forEach((link, i) => {
    link.style.setProperty('--index', i + 1);
  });

  const toggleMenu = (force) => {
    const isOpen = force !== undefined ? force : !hamburger.classList.contains('active');

    hamburger.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    mobileMenu.setAttribute('aria-hidden', (!isOpen).toString());
    document.body.classList.toggle('menu-open', isOpen);
  };

  hamburger.addEventListener('click', () => toggleMenu());

  // Close menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.querySelector('.mobile-reserve')?.addEventListener('click', () => toggleMenu(false));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* ─────────────────────────────────────────
   7. Hero Parallax
───────────────────────────────────────── */
function initHeroParallax() {
  const heroImg = document.getElementById('heroBgImg');
  if (!heroImg) return;

  // Disable on reduced motion or touch
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    if (scrollY > maxScroll) return;

    const parallaxVal = scrollY * 0.35;
    heroImg.style.transform = `scale(1.08) translateY(${parallaxVal}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─────────────────────────────────────────
   8. Typing Effect (Hero Subtitle)
───────────────────────────────────────── */
function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const phrases = [
    'Authentic Izakaya · Penang, Malaysia',
    'Binchotan-grilled Yakitori, nightly',
    'Where Tokyo meets the tropics',
    'Premium sake. Master chefs. Unforgettable nights.',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let pauseTimer  = null;

  const TYPING_SPEED   = 58;
  const DELETING_SPEED = 28;
  const PAUSE_AFTER    = 2200;
  const PAUSE_BEFORE   = 400;

  function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // Done typing — pause then delete
        isDeleting = true;
        pauseTimer = setTimeout(type, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Done deleting — move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pauseTimer = setTimeout(type, PAUSE_BEFORE);
        return;
      }
    }

    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    pauseTimer = setTimeout(type, speed);
  }

  // Start after loading delay
  setTimeout(type, 2000);
}

/* ─────────────────────────────────────────
   9. Intersection Observer — Reveal Animations
───────────────────────────────────────── */
function initRevealObserver() {
  const revealClasses = ['.reveal-up', '.reveal-scale', '.reveal-from-left', '.reveal-from-right'];
  const elements = document.querySelectorAll(revealClasses.join(','));

  if (!elements.length) return;

  const options = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, options);

  elements.forEach(el => {
    // Skip hero elements (handled by loader)
    if (!el.closest('.hero')) {
      observer.observe(el);
    }
  });
}

/* ─────────────────────────────────────────
   10. Magnetic Button Effect
───────────────────────────────────────── */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const btns = document.querySelectorAll('.magnetic-btn');

  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const deltaX  = (e.clientX - centerX) * 0.28;
      const deltaY  = (e.clientY - centerY) * 0.28;

      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s linear';
    });
  });
}

/* ─────────────────────────────────────────
   11. Ripple Effect on Buttons
───────────────────────────────────────── */
function initRippleEffect() {
  const rippleTargets = document.querySelectorAll('.btn-primary, .card-btn, .form-submit');

  rippleTargets.forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', (e) => {
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 2;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* ─────────────────────────────────────────
   12. Drinks Horizontal Slider (Drag)
───────────────────────────────────────── */
function initDrinksSlider() {
  const track = document.getElementById('drinksTrack');
  if (!track) return;

  let isDown   = false;
  let startX   = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStart = 0;
  let touchScroll = 0;

  track.addEventListener('touchstart', (e) => {
    touchStart  = e.touches[0].pageX;
    touchScroll = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const x    = e.touches[0].pageX;
    const walk = touchStart - x;
    track.scrollLeft = touchScroll + walk;
  }, { passive: true });
}

/* ─────────────────────────────────────────
   13. Reviews Auto Slider
───────────────────────────────────────── */
function initReviewsSlider() {
  const track       = document.getElementById('reviewsTrack');
  const dotsContainer = document.getElementById('reviewsDots');
  const prevBtn     = document.getElementById('prevReview');
  const nextBtn     = document.getElementById('nextReview');

  if (!track) return;

  const cards      = track.querySelectorAll('.review-card');
  const totalCards = cards.length;

  if (totalCards === 0) return;

  let currentIndex  = 0;
  let autoplayTimer = null;
  let isAnimating   = false;

  // Determine visible cards based on viewport
  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 1200) return 3;
    if (w >= 768)  return 2;
    return 1;
  }

  function getCardWidth() {
    const card = cards[0];
    const style = getComputedStyle(track);
    const gap = parseInt(style.gap) || 24;
    return card.offsetWidth + gap;
  }

  function getMaxIndex() {
    return Math.max(0, totalCards - getVisibleCount());
  }

  // Create dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    const max = getMaxIndex() + 1;
    for (let i = 0; i < max; i++) {
      const dot = document.createElement('button');
      dot.classList.add('reviews-dot');
      dot.setAttribute('aria-label', `Go to review ${i + 1}`);
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.reviews-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  function goTo(index) {
    if (isAnimating) return;
    isAnimating = true;

    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));

    const offset = currentIndex * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;

    updateDots();
    setTimeout(() => { isAnimating = false; }, 650);
  }

  function goNext() {
    const max = getMaxIndex();
    goTo(currentIndex < max ? currentIndex + 1 : 0);
  }

  function goPrev() {
    const max = getMaxIndex();
    goTo(currentIndex > 0 ? currentIndex - 1 : max);
  }

  // Apply CSS transition to track
  track.style.transition  = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
  track.style.display      = 'flex';

  prevBtn?.addEventListener('click', () => {
    goPrev();
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    goNext();
    resetAutoplay();
  });

  // Autoplay
  function startAutoplay() {
    autoplayTimer = setInterval(goNext, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Touch swipe on track
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
      resetAutoplay();
    }
  }, { passive: true });

  // Init
  buildDots();
  startAutoplay();

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildDots();
      goTo(Math.min(currentIndex, getMaxIndex()));
    }, 200);
  });

  // Pause on hover
  track.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  track.addEventListener('mouseleave', startAutoplay);
}

/* ─────────────────────────────────────────
   14. Contact Form — Validation & Submit
───────────────────────────────────────── */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const success    = document.getElementById('formSuccess');
  const resetBtn   = document.getElementById('resetForm');

  if (!form) return;

  // Field validators
  const validators = {
    fname:   (v) => v.trim().length >= 2   ? '' : 'Please enter your first name.',
    lname:   (v) => v.trim().length >= 2   ? '' : 'Please enter your last name.',
    email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    phone:   (v) => v.trim().length >= 8   ? '' : 'Please enter a valid phone number.',
    resdate: (v) => {
      if (!v) return 'Please select a date.';
      const chosen = new Date(v);
      const today  = new Date();
      today.setHours(0,0,0,0);
      return chosen >= today ? '' : 'Please select a future date.';
    },
    guests:  (v) => v ? '' : 'Please select the number of guests.',
  };

  function validateField(input) {
    const name      = input.name;
    const validator = validators[name];
    if (!validator) return true;

    const errorEl = input.closest('.form-group')?.querySelector('.form-error');
    const error   = validator(input.value);
    const group   = input.closest('.form-group');

    if (error) {
      if (errorEl) errorEl.textContent = error;
      group?.classList.add('error');
      return false;
    } else {
      if (errorEl) errorEl.textContent = '';
      group?.classList.remove('error');
      return true;
    }
  }

  // Live validation on blur
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form-group')?.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    const requiredInputs = form.querySelectorAll('[required]');
    let allValid = true;

    requiredInputs.forEach(input => {
      if (!validateField(input)) allValid = false;
    });

    if (!allValid) return;

    // Simulate submission (no backend)
    const submitBtn = document.getElementById('formSubmit');
    if (submitBtn) {
      const label = submitBtn.querySelector('.btn-label');
      if (label) label.textContent = 'Sending...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      form.style.display       = 'none';
      if (success) {
        success.classList.add('visible');
        // Scroll into view smoothly
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1400);
  });

  // Reset form button
  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.style.display = '';
    if (success) success.classList.remove('visible');

    const submitBtn = document.getElementById('formSubmit');
    if (submitBtn) {
      const label = submitBtn.querySelector('.btn-label');
      if (label) label.textContent = 'Send Reservation';
      submitBtn.disabled = false;
    }

    // Clear all errors
    form.querySelectorAll('.form-group').forEach(g => {
      g.classList.remove('error');
      const err = g.querySelector('.form-error');
      if (err) err.textContent = '';
    });
  });

  // Set min date for date input to today
  const dateInput = document.getElementById('resdate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

/* ─────────────────────────────────────────
   15. Back To Top Button
───────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────
   16. Smooth Scroll for Navigation Links
───────────────────────────────────────── */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target === '#') return;

      const targetEl = document.querySelector(target);
      if (!targetEl) return;

      e.preventDefault();

      const navbar      = document.getElementById('navbar');
      const navHeight   = navbar ? navbar.offsetHeight : 0;
      const targetTop   = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 12;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────
   17. Lantern Glow Animation — Dynamic
───────────────────────────────────────── */
(function initLanternGlow() {
  // Add subtle random variation to lantern animation durations
  document.querySelectorAll('.lantern').forEach(lantern => {
    const randomDur = (Math.random() * 3 + 4).toFixed(1) + 's';
    const randomDelay = (Math.random() * 2).toFixed(1) + 's';
    lantern.style.animationDuration  = randomDur;
    lantern.style.animationDelay     = randomDelay;
  });
})();

/* ─────────────────────────────────────────
   18. Nav Active Link Highlighting (on scroll)
───────────────────────────────────────── */
(function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.borderColor = '';
        });

        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.style.color = 'var(--gold)';
        }
      }
    });
  }, {
    root: null,
    threshold: 0.4,
  });

  sections.forEach(s => observer.observe(s));
})();

/* ─────────────────────────────────────────
   19. Card hover: subtle glow color shift
───────────────────────────────────────── */
(function initCardGlow() {
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(193, 18, 31, 0.25)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });

  document.querySelectorAll('.drink-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(244, 180, 0, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });
})();

/* ─────────────────────────────────────────
   20. Atmosphere Section — Floating text parallax
───────────────────────────────────────── */
(function initAtmParallax() {
  const floatText = document.querySelector('.atm-float-text');
  if (!floatText) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const onScroll = () => {
    const rect = floatText.closest('section')?.getBoundingClientRect();
    if (!rect) return;

    const sectionCenter = rect.top + rect.height / 2;
    const viewCenter    = window.innerHeight / 2;
    const offset        = (sectionCenter - viewCenter) * 0.06;

    floatText.style.transform = `translateY(${offset}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ─────────────────────────────────────────
   21. Detect reduced motion preference
───────────────────────────────────────── */
(function checkReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Immediately make all reveal elements visible
    document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-from-left, .reveal-from-right').forEach(el => {
      el.classList.add('visible');
    });
  }
})();
