/* ═══════════════════════════════════════════════════════════
   CHEF NAUSHAD'S SIGNATURE RESTAURANT — script.js
═══════════════════════════════════════════════════════════ */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════
   LANGUAGE TOGGLE
═══════════════════════════════════════════════════════════ */
let currentLang = localStorage.getItem('lang') || 'en';

function applyLanguage(lang) {
  const isAR = lang === 'ar';

  document.documentElement.dir = isAR ? 'rtl' : 'ltr';
  document.documentElement.lang = isAR ? 'ar' : 'en';

  // Switch all bilingual elements
  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    el.textContent = isAR ? el.dataset.ar : el.dataset.en;
  });

  // Switch font family on body
  document.body.style.fontFamily = isAR
    ? "'Amiri', serif"
    : "'Jost', sans-serif";

  // Update toggle button appearance
  const elEn = document.querySelector('.lang-en');
  const elAr = document.querySelector('.lang-ar');
  if (elEn) elEn.style.color = isAR ? '#A89880' : '#C9973A';
  if (elAr) elAr.style.color = isAR ? '#C9973A' : '#A89880';

  // WhatsApp button position
  const wa = document.querySelector('.whatsapp-float');
  if (wa) {
    if (isAR) {
      wa.style.right = 'auto';
      wa.style.left = '28px';
    } else {
      wa.style.left = 'auto';
      wa.style.right = '28px';
    }
  }

  // Save
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

// Language toggle button
const langToggleBtn = document.getElementById('langToggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    applyLanguage(currentLang === 'en' ? 'ar' : 'en');
  });
}

// Apply on load
applyLanguage(currentLang);

/* ═══════════════════════════════════════════════════════════
   NAVBAR SCROLL BEHAVIOR
═══════════════════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id], div[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

/* ═══════════════════════════════════════════════════════════
   MOBILE HAMBURGER MENU
═══════════════════════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const overlayClose = document.getElementById('overlayClose');
const overlayLinks = document.querySelectorAll('.overlay-link');

function openMobileMenu() {
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Animate links with GSAP
  gsap.fromTo(
    overlayLinks,
    { x: -30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.1
    }
  );
}

function closeMobileMenu() {
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  gsap.set(overlayLinks, { x: -30, opacity: 0 });
}

if (hamburger) hamburger.addEventListener('click', openMobileMenu);
if (overlayClose) overlayClose.addEventListener('click', closeMobileMenu);

// Close on link click
overlayLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ═══════════════════════════════════════════════════════════
   GSAP — PAGE LOAD ANIMATIONS
═══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {

  // Navbar Logo
  gsap.to('.nav-logo', {
    opacity: 1,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.out'
  });

  // Navbar Links
  gsap.to('.nav-link', {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.6,
    delay: 0.4,
    ease: 'power2.out'
  });

  gsap.set('.nav-link', { y: -20 });

  // Hero Eyebrow
  gsap.fromTo('.hero-eyebrow',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
  );

  // Hero H1
  gsap.fromTo('.hero-h1',
    { y: 70, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.0, delay: 0.5, ease: 'power3.out' }
  );

  // Hero Subline
  gsap.fromTo('.hero-subline',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: 'power2.out' }
  );

  // Hero Tagline
  gsap.fromTo('.hero-tagline',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, delay: 1.0, ease: 'power2.out' }
  );

  // Hero Buttons
  gsap.fromTo('.hero-buttons',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, delay: 1.2, ease: 'power2.out' }
  );

  // Fix nav links initial state
  gsap.set('.nav-link', { y: -20, opacity: 0 });
  gsap.to('.nav-link', {
    y: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 0.6,
    delay: 0.4,
    ease: 'power2.out'
  });
});

/* ═══════════════════════════════════════════════════════════
   GSAP — SCROLL TRIGGER ANIMATIONS
═══════════════════════════════════════════════════════════ */

// Section headings (all)
gsap.utils.toArray('.section-h2').forEach(el => {
  gsap.fromTo(el,
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
});

gsap.utils.toArray('.section-label').forEach(el => {
  gsap.fromTo(el,
    { y: 20, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// About Section
gsap.fromTo('.about-image-wrap',
  { x: -70, opacity: 0 },
  {
    x: 0, opacity: 1, duration: 1.0, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  }
);

gsap.fromTo('.about-text',
  { x: 70, opacity: 0 },
  {
    x: 0, opacity: 1, duration: 1.0, delay: 0.2, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  }
);

// Stat Counters
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.round(obj.val) + suffix;
    },
    onComplete: () => {
      el.textContent = target + suffix;
    }
  });
}

ScrollTrigger.create({
  trigger: '.stats-grid',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.stat-number').forEach(animateCounter);
  }
});

// Menu Cards
gsap.fromTo('.menu-card',
  { y: 60, opacity: 0 },
  {
    y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.menu-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  }
);

// Gallery Images
gsap.fromTo('.gallery-item',
  { scale: 0.9, opacity: 0 },
  {
    scale: 1, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.gallery-masonry',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  }
);

// Contact Section
gsap.fromTo('.contact-info',
  { x: -50, opacity: 0 },
  {
    x: 0, opacity: 1, duration: 1.0, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  }
);

gsap.fromTo('.contact-map',
  { x: 50, opacity: 0 },
  {
    x: 0, opacity: 1, duration: 1.0, delay: 0.2, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  }
);

// Footer Items
gsap.fromTo('.footer-brand, .footer-links-col, .footer-info-col',
  { y: 30, opacity: 0 },
  {
    y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  }
);

/* ═══════════════════════════════════════════════════════════
   FLOATING WHATSAPP — PULSE ANIMATION
═══════════════════════════════════════════════════════════ */
gsap.to('.whatsapp-float', {
  scale: 1.1,
  duration: 1.2,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut'
});

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS CAROUSEL
═══════════════════════════════════════════════════════════ */
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let carouselInterval = null;

function goToSlide(index) {
  // Hide current
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  // New slide
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
  if (carouselInterval) clearInterval(carouselInterval);
}

// Dot clicks
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopCarousel();
    goToSlide(i);
    startCarousel();
  });
});

// Start
startCarousel();

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL FOR INTERNAL LINKS
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ═══════════════════════════════════════════════════════════
   MOBILE FOOTER — INJECT MOBILE NAV ROW
═══════════════════════════════════════════════════════════ */
function buildMobileFooterNav() {
  const footerGrid = document.querySelector('.footer-grid');
  if (!footerGrid) return;

  // Build inline mobile nav below brand (only on mobile)
  const mobileRow = document.createElement('div');
  mobileRow.className = 'footer-links-mobile';
  mobileRow.innerHTML = `
    <a href="#home" data-en="Home" data-ar="الرئيسية">Home</a>
    <a href="#menu" data-en="Menu" data-ar="القائمة">Menu</a>
    <a href="#about" data-en="About" data-ar="عن المطعم">About</a>
    <a href="#gallery" data-en="Gallery" data-ar="المعرض">Gallery</a>
    <a href="#contact" data-en="Contact" data-ar="تواصل معنا">Contact</a>
  `;

  const copyright = document.querySelector('.footer-copyright');
  if (copyright) {
    copyright.parentNode.insertBefore(mobileRow, copyright);
  }

  // Re-apply language to new elements
  applyLanguage(currentLang);
}

buildMobileFooterNav();

/* ═══════════════════════════════════════════════════════════
   INITIAL GSAP SET FOR NAV LINKS (ensures animation works)
═══════════════════════════════════════════════════════════ */
gsap.set('.nav-link', { y: -20, opacity: 0 });
