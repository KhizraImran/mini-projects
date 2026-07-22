/* ============================================
   OPPA Korean BBQ Penang — Premium Website
   script.js — Vanilla JavaScript
   ============================================ */

'use strict';

/* ============================================
   PARTICLE SYSTEM
   ============================================ */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animId;
  let W = window.innerWidth;
  let H = window.innerHeight;

  canvas.width = W;
  canvas.height = H;

  const PARTICLE_COUNT = window.innerWidth < 768 ? 20 : 40;

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H + H;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = -(Math.random() * 0.8 + 0.2);
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 150;
      this.hue = Math.random() > 0.5
        ? `rgba(184, 115, 51, ${this.maxOpacity})`
        : `rgba(232, 160, 112, ${this.maxOpacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      const lifeRatio = this.life / this.maxLife;
      if (lifeRatio < 0.2) {
        this.opacity = (lifeRatio / 0.2) * this.maxOpacity;
      } else if (lifeRatio > 0.7) {
        this.opacity = ((1 - lifeRatio) / 0.3) * this.maxOpacity;
      } else {
        this.opacity = this.maxOpacity;
      }
      if (this.life >= this.maxLife || this.y < -50) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.hue.replace(/[\d.]+\)$/, this.opacity + ')');
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife;
    p.y = Math.random() * H;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  });
})();

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ============================================
   FLOATING NAV — SCROLL SHRINK
   ============================================ */
(function initNav() {
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['hero', 'story', 'menu', 'gallery', 'reservation'];

  function updateNav() {
    const scrollY = window.scrollY;

    // Shrink on scroll
    if (scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active link tracking
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) {
        current = id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });

    // Slide indicator to active link
    updateIndicator();
  }

  function updateIndicator() {
    const activeLink = document.querySelector('.nav-link.active');
    const indicator = document.getElementById('navIndicator');
    const navLinksContainer = document.getElementById('navLinks');
    if (!activeLink || !indicator || !navLinksContainer) return;

    const containerRect = navLinksContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    indicator.style.left = (linkRect.left - containerRect.left + 12) + 'px';
    indicator.style.width = (linkRect.width - 24) + 'px';
    indicator.style.opacity = '1';
    indicator.style.bottom = '2px';
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav, { passive: true });
  setTimeout(updateNav, 300);
})();

/* ============================================
   MOBILE NAV TOGGLE
   ============================================ */
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.getElementById('navHamburger');
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
}

function closeMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.getElementById('navHamburger');
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// Close mobile nav on background click
document.getElementById('mobileNav').addEventListener('click', function(e) {
  if (e.target === this) closeMobileNav();
});

// Escape key closes mobile nav
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMobileNav();
    closeLightbox();
  }
});

/* ============================================
   SCROLL REVEAL ANIMATIONS
   ============================================ */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.style.transitionDelay || '0s';
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseFloat(delay) * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
})();

/* ============================================
   3D TILT EFFECT (Dish Cards)
   ============================================ */
(function initTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    card.addEventListener('mouseenter', function() {
      card.style.transition = 'transform 0.15s ease-out';
    });
  });
})();

/* ============================================
   MENU TABS
   ============================================ */
function switchTab(tabEl, tabId) {
  // Deactivate all tabs and grids
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-grid').forEach(g => g.classList.remove('active'));

  // Activate selected
  tabEl.classList.add('active');
  const grid = document.getElementById('tab-' + tabId);
  if (grid) {
    grid.classList.add('active');
    // Animate items in
    grid.querySelectorAll('.menu-item').forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(16px)';
      setTimeout(() => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, i * 40);
    });
  }
}

/* ============================================
   GRILL EXPERIENCE STEPS
   ============================================ */
const stepImages = {
  1: 'https://images.pexels.com/photos/23383499/pexels-photo-23383499.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
  2: 'https://images.pexels.com/photos/5858466/pexels-photo-5858466.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
  3: 'https://images.pexels.com/photos/5774152/pexels-photo-5774152.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
  4: 'https://images.pexels.com/photos/34688685/pexels-photo-34688685.png?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700'
};

function setStep(num) {
  // Deactivate all steps
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('step' + i);
    if (el) el.classList.remove('active');
  }

  // Activate selected
  const stepEl = document.getElementById('step' + num);
  if (stepEl) stepEl.classList.add('active');

  // Update image
  const img = document.getElementById('grillStepImg');
  if (img && stepImages[num]) {
    img.style.opacity = '0';
    img.style.transform = 'scale(1.02)';
    img.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => {
      img.src = stepImages[num];
      img.onload = () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      };
    }, 200);
  }
}

// Auto-rotate steps
let currentStep = 1;
let stepAutoInterval = setInterval(() => {
  currentStep = currentStep >= 4 ? 1 : currentStep + 1;
  setStep(currentStep);
}, 4000);

// Pause on hover
const grillSection = document.getElementById('experience');
if (grillSection) {
  grillSection.addEventListener('mouseenter', () => clearInterval(stepAutoInterval));
  grillSection.addEventListener('mouseleave', () => {
    stepAutoInterval = setInterval(() => {
      currentStep = currentStep >= 4 ? 1 : currentStep + 1;
      setStep(currentStep);
    }, 4000);
  });
}

/* ============================================
   TESTIMONIAL SLIDER
   ============================================ */
(function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoSlide;
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  // Determine visible cards based on viewport
  function getVisible() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const visible = getVisible();
    const maxDots = total - visible + 1;
    for (let i = 0; i <= total - visible; i++) {
      const dot = document.createElement('div');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    const visible = getVisible();
    const max = total - visible;
    current = Math.max(0, Math.min(index, max));

    const cardWidth = cards[0].offsetWidth + 24; // gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;

    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  window.testimonialNext = function() {
    const visible = getVisible();
    const max = total - visible;
    goTo(current >= max ? 0 : current + 1);
  };

  window.testimonialPrev = function() {
    const visible = getVisible();
    const max = total - visible;
    goTo(current <= 0 ? max : current - 1);
  };

  // Touch/drag support
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
  });

  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
  }, { passive: true });

  track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  track.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.pageX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? testimonialNext() : testimonialPrev();
    }
  });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.changedTouches[0].pageX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? testimonialNext() : testimonialPrev();
    }
  });

  // Auto slide
  function startAuto() {
    autoSlide = setInterval(testimonialNext, 5000);
  }
  function stopAuto() {
    clearInterval(autoSlide);
  }

  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);

  // Init
  createDots();
  startAuto();
  window.addEventListener('resize', () => {
    createDots();
    goTo(0);
  });
})();

/* ============================================
   GALLERY LIGHTBOX
   ============================================ */
function openLightbox(el) {
  const img = el.querySelector('.gallery-img');
  if (!img) return;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================
   RESERVATION FORM
   ============================================ */
function submitForm(e) {
  e.preventDefault();

  const name = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('guestCount').value;
  const meal = document.getElementById('mealType').value;
  const notes = document.getElementById('notes').value.trim();

  if (!name || !phone || !date || !time || !guests) {
    showToast('⚠️', 'Please fill in all required fields.');
    return;
  }

  // Format WhatsApp message
  const timeLabels = {
    '11:30': '11:30 AM', '12:00': '12:00 PM', '12:30': '12:30 PM',
    '13:00': '1:00 PM', '13:30': '1:30 PM', '17:30': '5:30 PM',
    '18:00': '6:00 PM', '18:30': '6:30 PM', '19:00': '7:00 PM',
    '19:30': '7:30 PM', '20:00': '8:00 PM'
  };

  const mealLabels = { buffet: 'BBQ Buffet', alacarte: 'À La Carte', both: 'Buffet + À La Carte' };

  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const msg = `Hello OPPA Korean BBQ! I'd like to make a reservation:%0A%0A` +
    `👤 Name: ${encodeURIComponent(name)}%0A` +
    `📅 Date: ${dateStr}%0A` +
    `🕐 Time: ${timeLabels[time] || time}%0A` +
    `👥 Guests: ${guests}%0A` +
    `🍖 Preference: ${mealLabels[meal] || meal}%0A` +
    (notes ? `📝 Notes: ${encodeURIComponent(notes)}%0A` : '') +
    `%0AThank you!`;

  const whatsappUrl = `https://wa.me/60124290747?text=${msg}`;

  // Update button
  const btn = document.getElementById('submitBtn');
  btn.textContent = '✓ Sending...';
  btn.classList.add('submitted');
  btn.disabled = true;

  // Open WhatsApp after short delay
  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    showToast('✅', `Reservation for ${name} sent via WhatsApp!`);
    btn.textContent = '✓ Reservation Sent!';

    // Reset after 4s
    setTimeout(() => {
      btn.textContent = 'Confirm Reservation →';
      btn.classList.remove('submitted');
      btn.disabled = false;
      document.getElementById('reservationForm').reset();
    }, 4000);
  }, 600);
}

function showToast(icon, message) {
  const toast = document.getElementById('toast');
  const toastIcon = toast.querySelector('.toast-icon');
  const toastText = document.getElementById('toastText');

  toastIcon.textContent = icon;
  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ============================================
   PARALLAX EFFECT — Hero BG
   ============================================ */
(function initParallax() {
  const heroBg = document.getElementById('heroBgImage');
  if (!heroBg) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;
        if (scrollY <= maxScroll) {
          const progress = scrollY / maxScroll;
          heroBg.style.transform = `scale(1.05) translateY(${progress * 30}px)`;
          heroBg.style.opacity = (0.2 - progress * 0.1).toString();
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================
   RESERVATION FORM — Set min date to today
   ============================================ */
(function setMinDate() {
  const dateInput = document.getElementById('resDate');
  if (!dateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  // Default to tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const ty = tomorrow.getFullYear();
  const tm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const td = String(tomorrow.getDate()).padStart(2, '0');
  dateInput.value = `${ty}-${tm}-${td}`;
})();

/* ============================================
   HERO BACKGROUND ANIMATION
   ============================================ */
(function animateHeroBg() {
  const bgEl = document.getElementById('heroBgImage');
  if (!bgEl) return;
  // Subtle breathing animation
  let start = null;
  function breathe(ts) {
    if (!start) start = ts;
    const elapsed = ts - start;
    const scale = 1.05 + Math.sin(elapsed / 8000 * Math.PI * 2) * 0.02;
    if (window.scrollY < window.innerHeight) {
      bgEl.style.transform = `scale(${scale})`;
    }
    requestAnimationFrame(breathe);
  }
  requestAnimationFrame(breathe);
})();

/* ============================================
   AMBIENT HOVER GLOW — NAV CTA
   ============================================ */
(function navCtaGlow() {
  const cta = document.querySelector('.nav-cta');
  if (!cta) return;
  cta.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 30px rgba(184, 115, 51, 0.8), 0 8px 20px rgba(184, 115, 51, 0.4)';
  });
  cta.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 4px 20px rgba(184, 115, 51, 0.4)';
  });
})();

/* ============================================
   GALLERY ITEMS — STAGGERED REVEAL
   ============================================ */
(function galleryReveal() {
  const items = document.querySelectorAll('.gallery-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(items).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
})();

/* ============================================
   DISABLE CONTEXT MENU ON IMAGES (brand protection)
   ============================================ */
document.querySelectorAll('.gallery-img, .hero-img-main, .hero-img-secondary').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
  img.setAttribute('draggable', 'false');
});

/* ============================================
   SMOOTH ACTIVE SECTION COUNTER ANIMATION
   ============================================ */
(function countUp() {
  const counters = document.querySelectorAll('.hero-stat-number');
  let triggered = false;

  function isInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  function animateCount(el, target, suffix = '') {
    const start = 0;
    const duration = 1800;
    const startTime = performance.now();

    if (isNaN(parseFloat(target))) return;

    function step(ts) {
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const value = (parseFloat(target) * ease).toFixed(target.includes('.') ? 1 : 0);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('scroll', function onScroll() {
    if (triggered) return;
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats && isInView(heroStats)) {
      triggered = true;
      // 4.4 stars
      const star = document.querySelectorAll('.hero-stat-number')[0];
      if (star) animateCount(star, '4.4', '★');
    }
  }, { passive: true });
})();

/* ============================================
   FOOTER LINK HOVER TRAIL
   ============================================ */
document.querySelectorAll('.footer-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.paddingLeft = '12px';
    this.style.transition = 'all 0.3s ease';
  });
  link.addEventListener('mouseleave', function() {
    this.style.paddingLeft = '0';
  });
});

/* ============================================
   PERFORMANCE: Reduce animations on low-power devices
   ============================================ */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.smoke-particle').forEach(el => {
    el.style.animation = 'none';
    el.style.opacity = '0';
  });
}

/* ============================================
   PAGE LOAD ANIMATION
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});

console.log('%c🔥 OPPA Korean BBQ Penang', 'color: #b87333; font-size: 20px; font-weight: bold; font-family: serif;');
console.log('%cAuthentic Korean BBQ · George Town, Penang', 'color: #9a9080; font-size: 12px;');
console.log('%c📍 139 Lebuh Carnarvon · 📞 +60 12-429 0747', 'color: #d4956a; font-size: 12px;');
