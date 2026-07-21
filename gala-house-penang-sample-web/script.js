/**
 * Gala House Penang — Premium Restaurant Landing Page
 * Vanilla JavaScript — No external dependencies
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     DOM References
     ---------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  const scrollProgress = document.querySelector('.scroll-progress__bar');
  const scrollProgressBar = document.querySelector('.scroll-progress');
  const backToTop = document.getElementById('backToTop');
  const heroBg = document.getElementById('heroBg');
  const typingText = document.getElementById('typingText');
  const counters = document.querySelectorAll('.counter');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  /* ----------------------------------------------------------
     Loading Screen
     ---------------------------------------------------------- */
  function hideLoader() {
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
      initHeroAnimations();
    }, 2000);
  }

  window.addEventListener('load', hideLoader);
  document.body.classList.add('no-scroll');

  /* ----------------------------------------------------------
     Scroll Progress Bar
     ---------------------------------------------------------- */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = progress + '%';
    }
    if (scrollProgressBar) {
      scrollProgressBar.setAttribute('aria-valuenow', Math.round(progress));
    }
  }

  /* ----------------------------------------------------------
     Sticky Header & Back to Top
     ---------------------------------------------------------- */
  function handleScroll() {
    const scrollY = window.scrollY;

    header?.classList.toggle('scrolled', scrollY > 60);
    backToTop?.classList.toggle('visible', scrollY > 500);

    updateScrollProgress();
    updateActiveNavLink();
    handleParallax(scrollY);
  }

  /* ----------------------------------------------------------
     Parallax Effect — Hero Background
     ---------------------------------------------------------- */
  function handleParallax(scrollY) {
    if (!heroBg || window.innerWidth < 768) return;
    heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
  }

  /* ----------------------------------------------------------
     Navigation — Mobile Toggle
     ---------------------------------------------------------- */
  function toggleNav() {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  }

  function closeNav() {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  navToggle?.addEventListener('click', toggleNav);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeNav();
    });
  });

  /* ----------------------------------------------------------
     Smooth Scrolling
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     Active Nav Link on Scroll
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  /* ----------------------------------------------------------
     Intersection Observer — Reveal Animations
     ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll(
    '.fade-up, .reveal-up, .reveal-left, .reveal-right, .title-underline'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------------------------
     Hero Typing Effect
     ---------------------------------------------------------- */
  const typingPhrases = [
    'Experience culinary artistry...',
    'Savour authentic Malaysian flavours...',
    'Dine in timeless elegance...',
    'Reserve your unforgettable evening...'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function typeEffect() {
    if (!typingText) return;

    const current = typingPhrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      speed = 400;
    }

    typingTimeout = setTimeout(typeEffect, speed);
  }

  function initHeroAnimations() {
    document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), 200 + i * 150);
    });

    typeEffect();
    animateCounters();
  }

  /* ----------------------------------------------------------
     Counter Animation
     ---------------------------------------------------------- */
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        counter.textContent = isDecimal
          ? current.toFixed(1)
          : Math.floor(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  /* Trigger counters when hero stats enter viewport as fallback */
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const heroStats = document.querySelector('.hero__stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ----------------------------------------------------------
     Button Ripple Effect
     ---------------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add('ripple-effect');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ----------------------------------------------------------
     Gallery Lightbox
     ---------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  let galleryImages = [];
  let currentGalleryIndex = 0;

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      galleryImages.push({ src: img.src, alt: img.alt });
    }

    item.addEventListener('click', () => openLightbox(index));
  });

  function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightboxImage();
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('active'));
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
    setTimeout(() => { lightbox.hidden = true; }, 400);
  }

  function updateLightboxImage() {
    const current = galleryImages[currentGalleryIndex];
    if (!current) return;

    lightboxImg.src = current.src.replace(/w=\d+/, 'w=1200');
    lightboxImg.alt = current.alt;
    lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
  }

  function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateLightboxImage();
  }

  function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', nextImage);
  lightboxPrev?.addEventListener('click', prevImage);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  /* ----------------------------------------------------------
     Testimonial Slider
     ---------------------------------------------------------- */
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewPrev = document.getElementById('reviewPrev');
  const reviewNext = document.getElementById('reviewNext');
  const reviewDots = document.getElementById('reviewDots');
  const reviewCards = document.querySelectorAll('.review-card');

  let currentReview = 0;
  let reviewAutoplay;
  const reviewTotal = reviewCards.length;

  /* Build dots */
  reviewCards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('reviews__dot');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Review ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReview(i));
    reviewDots?.appendChild(dot);
  });

  const dots = reviewDots?.querySelectorAll('.reviews__dot');

  function goToReview(index) {
    currentReview = index;
    reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;

    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentReview);
    });
  }

  function nextReview() {
    goToReview((currentReview + 1) % reviewTotal);
  }

  function prevReview() {
    goToReview((currentReview - 1 + reviewTotal) % reviewTotal);
  }

  function startReviewAutoplay() {
    reviewAutoplay = setInterval(nextReview, 5000);
  }

  function resetReviewAutoplay() {
    clearInterval(reviewAutoplay);
    startReviewAutoplay();
  }

  reviewNext?.addEventListener('click', () => { nextReview(); resetReviewAutoplay(); });
  reviewPrev?.addEventListener('click', () => { prevReview(); resetReviewAutoplay(); });

  startReviewAutoplay();

  /* Pause autoplay on hover */
  const reviewsSlider = document.getElementById('reviewsSlider');
  reviewsSlider?.addEventListener('mouseenter', () => clearInterval(reviewAutoplay));
  reviewsSlider?.addEventListener('mouseleave', startReviewAutoplay);

  /* Touch swipe support */
  let touchStartX = 0;

  reviewsSlider?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  reviewsSlider?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextReview() : prevReview();
      resetReviewAutoplay();
    }
  }, { passive: true });

  /* ----------------------------------------------------------
     Contact Form Validation
     ---------------------------------------------------------- */
  const validators = {
    name: {
      validate: (val) => val.trim().length >= 2,
      message: 'Please enter your full name (min. 2 characters).'
    },
    email: {
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      message: 'Please enter a valid email address.'
    },
    phone: {
      validate: (val) => /^[\d\s\-+()]{8,}$/.test(val.trim()),
      message: 'Please enter a valid phone number.'
    },
    message: {
      validate: (val) => val.trim().length >= 10,
      message: 'Please enter a message (min. 10 characters).'
    }
  };

  function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById(fieldName + 'Error');
    const rule = validators[fieldName];

    if (!input || !rule) return true;

    const isValid = rule.validate(input.value);

    input.classList.toggle('error', !isValid);
    if (errorEl) errorEl.textContent = isValid ? '' : rule.message;

    return isValid;
  }

  contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = ['name', 'email', 'phone', 'message'];
    const results = fields.map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      const firstInvalid = fields.find(f => !validators[f].validate(document.getElementById(f).value));
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    /* Simulate successful submission */
    contactForm.querySelectorAll('input, textarea, button').forEach(el => {
      el.disabled = true;
    });

    formSuccess.hidden = false;

    setTimeout(() => {
      contactForm.reset();
      contactForm.querySelectorAll('input, textarea, button').forEach(el => {
        el.disabled = false;
      });
      formSuccess.hidden = true;
      fields.forEach(f => {
        const input = document.getElementById(f);
        input?.classList.remove('error');
        const errorEl = document.getElementById(f + 'Error');
        if (errorEl) errorEl.textContent = '';
      });
    }, 4000);
  });

  /* Real-time validation on blur */
  ['name', 'email', 'phone', 'message'].forEach(fieldName => {
    const input = document.getElementById(fieldName);
    input?.addEventListener('blur', () => {
      if (input.value.trim()) validateField(fieldName);
    });

    input?.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(fieldName);
    });
  });

  /* ----------------------------------------------------------
     Back to Top
     ---------------------------------------------------------- */
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----------------------------------------------------------
     Global Event Listeners
     ---------------------------------------------------------- */
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeNav();
  });

  /* Initial state */
  handleScroll();

})();
