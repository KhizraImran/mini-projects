/* ===========================
   NIANG PENANG — script.js
   =========================== */

/* ─── Navbar Scroll Effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── Active Nav Link on Scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ─── Hamburger Menu ─── */
const hamburger  = document.querySelector('.hamburger');
const navMobile  = document.querySelector('.nav-mobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMobile.classList.remove('open');
  });
});

/* ─── Smooth Scroll for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 68; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Scroll Reveal (IntersectionObserver) ─── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Collect siblings for staggered delay
      const parent = entry.target.parentElement;
      const siblings = parent ? [...parent.querySelectorAll('.reveal')] : [];
      const index = siblings.indexOf(entry.target);
      const delay = index >= 0 ? index * 0.15 : 0;

      entry.target.style.transitionDelay = `${delay}s`;
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ─── Dish Card Shimmer (hover handled in CSS) ─── */
// JavaScript enhancement: add shimmer class on mouseenter
document.querySelectorAll('.dish-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('shimmer-active'));
  card.addEventListener('mouseleave', () => card.classList.remove('shimmer-active'));
});

/* ─── Gallery Lightbox ─── */
const galleryItems = document.querySelectorAll('.gallery-item');
let lightbox = null;

function createLightbox(imgSrc, altText) {
  if (lightbox) return;
  lightbox = document.createElement('div');
  lightbox.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(26,26,26,0.93);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; padding: 24px;
    animation: fadeIn 0.3s ease;
  `;

  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`;
  document.head.appendChild(style);

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = altText || '';
  img.style.cssText = `
    max-width: 90vw; max-height: 85vh;
    object-fit: contain; border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  `;

  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    position: absolute; top: 24px; right: 32px;
    background: none; border: none; color: #FAF3E4;
    font-size: 28px; cursor: pointer; opacity: 0.8;
  `;

  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';

  const closeLightbox = () => {
    lightbox.remove();
    lightbox = null;
    document.body.style.overflow = '';
  };
  lightbox.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', onKey); }
  });
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) createLightbox(img.src, img.alt);
  });
  item.style.cursor = 'pointer';
});

/* ─── Reservation Form Handler ─── */
const reserveBtn = document.getElementById('reserve-btn');
if (reserveBtn) {
  reserveBtn.addEventListener('click', () => {
    window.location.href = 'tel:+60149151400';
  });
}

/* ─── Page Load Progress Bar ─── */
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; z-index: 99999;
  height: 3px; background: linear-gradient(90deg, #1C4F4A, #C8993A, #B55A3A);
  transition: width 0.4s ease; width: 0%;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}, { passive: true });

/* ─── Peranakan tile cursor trail (subtle, gold dots) ─── */
let trailTimeout;
document.addEventListener('mousemove', (e) => {
  clearTimeout(trailTimeout);
  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed;
    left: ${e.clientX}px; top: ${e.clientY}px;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: rgba(200,153,58,0.35);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%,-50%);
    animation: dotFade 0.6s ease forwards;
  `;

  // Add keyframe once
  if (!document.getElementById('dotFadeStyle')) {
    const s = document.createElement('style');
    s.id = 'dotFadeStyle';
    s.textContent = `@keyframes dotFade { from { opacity:1; transform: translate(-50%,-50%) scale(1); } to { opacity:0; transform: translate(-50%,-50%) scale(0); } }`;
    document.head.appendChild(s);
  }

  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
});

/* ─── Animate numbers on stat counters ─── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (el.getAttribute('data-suffix') || '');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); statsObserver.disconnect(); }
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

/* ─── Tooltip on dish cards ─── */
document.querySelectorAll('.dish-card').forEach(card => {
  card.setAttribute('role', 'article');
  card.setAttribute('tabindex', '0');
});

/* ─── Back to top button ─── */
const backTop = document.createElement('button');
backTop.innerHTML = '↑';
backTop.title = 'Back to top';
backTop.style.cssText = `
  position: fixed; bottom: 32px; right: 28px;
  z-index: 999; width: 44px; height: 44px;
  background: var(--gold, #C8993A); color: #1A1A1A;
  border: none; border-radius: 50%; font-size: 20px;
  font-family: serif; cursor: pointer;
  box-shadow: 0 4px 16px rgba(200,153,58,0.4);
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.35s, transform 0.35s;
  display: flex; align-items: center; justify-content: center;
`;
document.body.appendChild(backTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.style.opacity = '1';
    backTop.style.transform = 'translateY(0)';
  } else {
    backTop.style.opacity = '0';
    backTop.style.transform = 'translateY(16px)';
  }
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── Console branding ─── */
console.log('%c🌺 Niang Penang', 'font-size:24px; color:#C8993A; font-family:serif; font-style:italic;');
console.log('%cAuthentic Nyonya Heritage Cuisine · Penang, Malaysia', 'font-size:13px; color:#1C4F4A;');
