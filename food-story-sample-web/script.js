(function () {
  'use strict';

  const html = document.documentElement;
  const body = document.body;
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const menuTrigger = document.getElementById('menuTrigger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = mobileMenu.querySelectorAll('a');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const reservationForm = document.getElementById('reservationForm');
  const dishCards = document.querySelectorAll('.dish-card');
  const spiceJars = document.querySelectorAll('.spice-jar');

  // Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Language data
  const translations = {
    ar: {
      dir: 'rtl',
      lang: 'ar'
    },
    en: {
      dir: 'ltr',
      lang: 'en'
    }
  };

  let currentLang = localStorage.getItem('foodstory-lang') || 'en';

  // Theme init
  function initTheme() {
    const savedTheme = localStorage.getItem('foodstory-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'dark');
    html.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      gsap.to(body, {
        opacity: 0.85,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          html.setAttribute('data-theme', next);
          localStorage.setItem('foodstory-theme', next);
        }
      });
    } else {
      html.setAttribute('data-theme', next);
      localStorage.setItem('foodstory-theme', next);
    }
  }

  // Language init and toggle
  function setLanguage(lang) {
    currentLang = lang;
    html.setAttribute('lang', translations[lang].lang);
    html.setAttribute('dir', translations[lang].dir);

    if (lang === 'ar') {
      body.classList.add('rtl');
      langToggle.querySelector('.lang-label').textContent = 'EN';
    } else {
      body.classList.remove('rtl');
      langToggle.querySelector('.lang-label').textContent = 'AR';
    }

    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    localStorage.setItem('foodstory-lang', lang);
  }

  function toggleLanguage() {
    const nextLang = currentLang === 'en' ? 'ar' : 'en';

    if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
      gsap.to(body, {
        opacity: 0,
        duration: 0.18,
        onComplete: () => {
          setLanguage(nextLang);
          gsap.to(body, { opacity: 1, duration: 0.25 });
        }
      });
    } else {
      setLanguage(nextLang);
    }
  }

  // Mobile menu
  function openMenu() {
    mobileMenu.classList.add('open');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    body.style.overflow = '';
  }

  // Loader
  function hideLoader() {
    if (!loader) return;
    loader.classList.add('hidden');
    setTimeout(() => {
      loader.style.display = 'none';
      initEntranceAnimations();
    }, 600);
  }

  // Lightbox
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Gallery preview';
    lightbox.classList.add('open');
    body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  // 3D tilt for dish cards (desktop only)
  function initTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    dishCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        const inner = card.querySelector('.card-inner');
        if (inner && !inner.style.transform.includes('rotateY(180deg)')) {
          inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        const inner = card.querySelector('.card-inner');
        if (inner) {
          inner.style.transform = '';
        }
      });
    });
  }

  // Spice jar wobble interaction
  function initSpiceJars() {
    spiceJars.forEach(jar => {
      jar.addEventListener('mouseenter', () => {
        if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
          gsap.to(jar, {
            rotationY: 15,
            rotationX: -8,
            y: -24,
            duration: 0.35,
            ease: 'back.out(1.7)'
          });
        }
      });

      jar.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
          gsap.to(jar, {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            duration: 0.45,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // GSAP Animations
  function initEntranceAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) return;

    // Hero entrance
    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
      .from('.title-line-1', { opacity: 0, y: 60, rotateX: 45, duration: 1, ease: 'power3.out' }, '-=0.4')
      .from('.title-line-2', { opacity: 0, y: 60, rotateX: -45, duration: 1, ease: 'power3.out' }, '-=0.7')
      .from('.hero-tagline', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-actions .btn', { opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.5')
      .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.3');

    // Navbar reveal on scroll
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.direction === -1 || self.progress > 0) {
          navbar.classList.add('visible');
        }
        if (self.progress === 0) {
          navbar.classList.remove('visible');
        }
      }
    });

    // Hero parallax
    gsap.to('.hero-bg', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to('.layer-front', {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // About section
    gsap.from('.about-frame', {
      opacity: 0,
      rotateY: -25,
      z: -80,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-visual',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.about-content > *', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Spice shelf
    gsap.from('.spice-jar', {
      opacity: 0,
      y: 80,
      rotateX: 45,
      duration: 0.9,
      stagger: 0.1,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.spice-shelf',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Menu cards
    gsap.from('.dish-card', {
      opacity: 0,
      y: 70,
      rotateX: 20,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.menu-stage',
        start: 'top 78%',
        toggleActions: 'play none none reverse'
      }
    });

    // Location
    gsap.from('.location-info > *', {
      opacity: 0,
      x: -40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.location-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.location-map', {
      opacity: 0,
      x: 40,
      scale: 0.95,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.location-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    // Reviews
    gsap.from('.review-card', {
      opacity: 0,
      x: 60,
      rotateY: 15,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.reviews-track',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Gallery
    gsap.from('.gallery-item', {
      opacity: 0,
      scale: 0.85,
      rotateY: 10,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Contact
    gsap.from('.contact-info > *', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.reservation-form', {
      opacity: 0,
      y: 60,
      rotateX: 10,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Footer
    gsap.from('.footer-grid > *', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.main-footer',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          closeMenu();
          const offset = navbar.offsetHeight || 76;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      });
    });
  }

  // Form submission
  function initForm() {
    if (!reservationForm) return;

    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(reservationForm);
      const data = Object.fromEntries(formData.entries());

      const message = currentLang === 'ar'
        ? `مرحباً فود ستوري، أرغب بحجز طاولة:\nالاسم: ${data.name}\nالهاتف: ${data.phone}\nالتاريخ: ${data.date}\nالوقت: ${data.time}\nالضيوف: ${data.guests}`
        : `Hello Food Story, I would like to reserve a table:\nName: ${data.name}\nPhone: ${data.phone}\nDate: ${data.date}\nTime: ${data.time}\nGuests: ${data.guests}`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/96555147440?text=${encoded}`, '_blank', 'noopener,noreferrer');
    });
  }

  // Gallery lightbox
  function initGallery() {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          openLightbox(img.src, img.alt);
        }
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // Mouse move parallax on hero
  function initMouseParallax() {
    if (window.matchMedia('(pointer: coarse)').matches || prefersReducedMotion) return;

    const layerMid = document.querySelector('.layer-mid');
    const layerFront = document.querySelector('.layer-front');

    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (layerMid) {
          layerMid.style.transform = `translate(${mouseX * -12}px, ${mouseY * -12}px)`;
        }
        if (layerFront) {
          layerFront.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px) translateZ(60px)`;
        }
        rafId = null;
      });
    }, { passive: true });
  }

  // Scroll velocity skew on sections
  function initScrollSkew() {
    if (typeof gsap === 'undefined' || prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        const velocity = Math.min(Math.max((currentScroll - lastScroll) * 0.02, -2), 2);
        gsap.to('.section', {
          skewY: velocity,
          duration: 0.3,
          ease: 'power2.out'
        });
        lastScroll = currentScroll;
        ticking = false;
      });
    }, { passive: true });
  }

  // Event bindings
  themeToggle.addEventListener('click', toggleTheme);
  langToggle.addEventListener('click', toggleLanguage);
  menuTrigger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Init
  initTheme();
  setLanguage(currentLang);
  initSmoothScroll();
  initForm();
  initGallery();
  initTilt();
  initSpiceJars();
  initMouseParallax();

  window.addEventListener('load', () => {
    setTimeout(hideLoader, 400);
    initScrollSkew();
  });
})();
