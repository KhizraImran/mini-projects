/* =========================================================
   THE DAILY DOSE CAFE — script.js
   Vanilla JS: loader, cursor, animations, sliders, form
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.style.overflow = '';
    }, 900);
  });
  // Fallback in case 'load' already fired / assets slow
  setTimeout(() => loader.classList.add('hide'), 3200);

  /* ---------- 2. CUSTOM CURSOR ---------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function animateRing(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveEls = document.querySelectorAll('a, button, .drink-card, .breakfast-card, .g-item');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  });

  /* ---------- 3. MAGNETIC BUTTONS ---------- */
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.22}px, ${relY * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ---------- 4. RIPPLE EFFECT ---------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- 5. STICKY NAVBAR + BLUR ON SCROLL ---------- */
  const navbar = document.getElementById('navbar');
  const scrollBar = document.getElementById('scrollProgressBar');

  function onScroll(){
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 40);

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 6. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  /* ---------- 7. HERO TYPING EFFECT ---------- */
  const line1 = document.getElementById('typingLine1');
  const line2 = document.getElementById('typingLine2');
  const text1 = 'Good Mornings';
  const text2 = 'Start With Coffee.';

  function typeText(el, text, speed, done){
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    function step(){
      if (i <= text.length){
        el.textContent = text.slice(0, i);
        el.appendChild(cursor);
        i++;
        setTimeout(step, speed);
      } else if (done){
        done();
      }
    }
    step();
  }
  setTimeout(() => {
    typeText(line1, text1, 55, () => {
      typeText(line2, text2, 55);
    });
  }, 1000);

  /* ---------- 8. INTERSECTION OBSERVER — SECTION REVEALS ---------- */
  const revealTargets = document.querySelectorAll(
    '.fade-up, .fade-left, .fade-right, .reveal-up, .reveal-left, .reveal-right, .reveal-scale'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));

  // Why-us timeline line-draw animation
  const whyLine = document.querySelector('.why-line');
  if (whyLine){
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          whyLine.classList.add('drawn');
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    lineObserver.observe(whyLine);
  }

  /* ---------- 9. FLOATING COFFEE BEANS (hero) ---------- */
  const beanContainer = document.getElementById('heroBeans');
  const BEAN_COUNT = 14;
  for (let i = 0; i < BEAN_COUNT; i++){
    const bean = document.createElement('span');
    bean.className = 'bean';
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 10 + Math.random() * 8;
    const scale = 0.6 + Math.random() * 0.8;
    bean.style.left = left + '%';
    bean.style.bottom = '-40px';
    bean.style.animationDelay = delay + 's';
    bean.style.animationDuration = duration + 's';
    bean.style.transform = `scale(${scale})`;
    beanContainer.appendChild(bean);
  }

  /* ---------- 10. SOFT PARALLAX ON HERO ---------- */
  const parallaxEl = document.querySelector('[data-parallax]');
  const heroSection = document.querySelector('.hero');
  if (parallaxEl && heroSection){
    heroSection.addEventListener('mousemove', (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 18;
      const y = (e.clientY / h - 0.5) * 18;
      parallaxEl.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------- 11. BREAKFAST HORIZONTAL SCROLL PROGRESS ---------- */
  const track = document.getElementById('breakfastTrack');
  const progressSpan = document.getElementById('breakfastProgress');
  if (track && progressSpan){
    track.addEventListener('scroll', () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = max > 0 ? track.scrollLeft / max : 0;
      progressSpan.style.transform = `translateX(${ratio * 400}%)`;
    }, { passive: true });
  }

  /* ---------- 12. TESTIMONIAL AUTO SLIDER ---------- */
  const reviewsTrack = document.getElementById('reviewsTrack');
  const reviewCards = document.querySelectorAll('.review-card');
  const dotsWrap = document.getElementById('reviewsDots');
  let currentReview = 0;
  let reviewInterval;

  reviewCards.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to review ' + (idx + 1));
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReview(idx));
    dotsWrap.appendChild(dot);
  });

  function goToReview(idx){
    currentReview = idx;
    reviewsTrack.style.transform = `translateX(-${idx * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function startReviewAutoplay(){
    reviewInterval = setInterval(() => {
      currentReview = (currentReview + 1) % reviewCards.length;
      goToReview(currentReview);
    }, 5000);
  }
  startReviewAutoplay();

  document.querySelector('.reviews-slider-wrap').addEventListener('mouseenter', () => clearInterval(reviewInterval));
  document.querySelector('.reviews-slider-wrap').addEventListener('mouseleave', startReviewAutoplay);

  /* ---------- 13. CONTACT FORM VALIDATION ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function validateField(field, checkFn){
    const wrapper = field.closest('.field');
    const valid = checkFn(field.value.trim());
    wrapper.classList.toggle('invalid', !valid);
    return valid;
  }

  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      const nameValid = validateField(name, v => v.length > 1);
      const emailValid = validateField(email, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      const messageValid = validateField(message, v => v.length > 4);

      if (nameValid && emailValid && messageValid){
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        setTimeout(() => {
          formSuccess.classList.add('show');
          form.reset();
          submitBtn.disabled = false;
          setTimeout(() => formSuccess.classList.remove('show'), 4500);
        }, 500);
      }
    });

    // Live-clear invalid state as user types
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.field').classList.remove('invalid');
      });
    });
  }

  /* ---------- 14. BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop){
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 15. FOOTER YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 16. SMOOTH ANCHOR SCROLL (offset for fixed navbar) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1){
        const target = document.querySelector(targetId);
        if (target){
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});
