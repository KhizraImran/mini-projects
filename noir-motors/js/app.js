/* ============================================================
   NOIR MOTORS — MAIN APPLICATION
   ============================================================ */

const NoirMotors = (() => {

  /* ── Lenis Smooth Scroll ── */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // GSAP ScrollTrigger integration
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return lenis;
  }

  /* ── Testimonials Swiper ── */
  function initTestimonialsSwiper() {
    const swiperEl = document.querySelector('.testimonials-swiper');
    if (!swiperEl || typeof Swiper === 'undefined') return;

    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 2,
      speed: 700,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.testimonials-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.swiper-btn--prev',
        nextEl: '.swiper-btn--next',
      },
      breakpoints: {
        640: {
          slidesPerView: 1.15,
          spaceBetween: 2,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 2,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 2,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 2,
        },
      }
    });
  }

  /* ── Hero Swiper (optional secondary) ── */
  function initHeroSwiper() {
    const el = document.querySelector('.hero-swiper');
    if (!el || typeof Swiper === 'undefined') return;

    new Swiper(el, {
      slidesPerView: 1,
      speed: 1200,
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
    });
  }

  /* ── Video Modal ── */
  function initVideoModal() {
    const triggers = document.querySelectorAll('[data-video]');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const videoSrc = trigger.dataset.video;
        if (!videoSrc) return;

        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.style.cssText = `
          position: fixed; inset: 0; z-index: 9000;
          background: rgba(0,0,0,0.95);
          display: flex; align-items: center; justify-content: center;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.style.cssText = `
          position: absolute; top: 2rem; right: 2rem;
          color: white; font-size: 1.5rem; background: none; border: none;
          cursor: pointer; z-index: 1;
        `;
        closeBtn.textContent = '×';

        const video = document.createElement('video');
        video.src = videoSrc;
        video.controls = true;
        video.autoplay = true;
        video.style.cssText = `max-width: 90vw; max-height: 80vh;`;

        modal.appendChild(closeBtn);
        modal.appendChild(video);
        document.body.appendChild(modal);

        const close = () => {
          video.pause();
          modal.remove();
        };

        closeBtn.addEventListener('click', close);
        modal.addEventListener('click', (e) => {
          if (e.target === modal) close();
        });
      });
    });
  }

  /* ── Hover Image Magnetic ── */
  function initMagnetic() {
    if (window.matchMedia('(hover: none)').matches) return;

    const magneticEls = document.querySelectorAll('.btn--primary, .btn--ghost, .nav-cta');
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => { el.style.transition = ''; }, 400);
      });
    });
  }

  /* ── Three.js Hero ── */
  function initHero() {
    if (typeof HeroScene !== 'undefined' && document.getElementById('hero-canvas')) {
      HeroScene.init();
    }
  }

  /* ── Page Transitions ── */
  function initPageTransitions() {
    const links = document.querySelectorAll('a[href]');
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: #080808; z-index: 9998;
      pointer-events: none; opacity: 0;
      transition: opacity 0.35s cubic-bezier(0.65,0,0.35,1);
    `;
    document.body.appendChild(overlay);

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href ||
          href.startsWith('#') ||
          href.startsWith('http') ||
          href.startsWith('mailto') ||
          href.startsWith('tel') ||
          link.target === '_blank') return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        setTimeout(() => {
          window.location.href = href;
        }, 380);
      });
    });

    // Fade in on load
    window.addEventListener('load', () => {
      overlay.style.opacity = '0';
    });
  }

  /* ── Section Number Labels ── */
  function initSectionNumbers() {
    const sections = document.querySelectorAll('[data-section-num]');
    sections.forEach(section => {
      const num = section.dataset.sectionNum;
      const label = document.createElement('span');
      label.className = 'section-num-label';
      label.textContent = num;
      label.style.cssText = `
        position: absolute; right: clamp(1.5rem, 3vw, 3rem);
        top: 50%; transform: translateY(-50%);
        font-family: 'Cormorant Garamond', serif;
        font-size: 8rem; font-weight: 300;
        color: rgba(255,255,255,0.03);
        pointer-events: none; user-select: none;
        z-index: 0; line-height: 1;
      `;
      if (getComputedStyle(section).position === 'static') {
        section.style.position = 'relative';
      }
      section.appendChild(label);
    });
  }

  /* ── Init ── */
  function init() {
    initLenis();
    initHero();
    initTestimonialsSwiper();
    initHeroSwiper();
    initVideoModal();
    initPageTransitions();
    initSectionNumbers();

    // Delayed for performance
    requestAnimationFrame(() => {
      initMagnetic();
    });
  }

  // DOM ready — scripts are deferred so DOM is ready when this runs
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }

  return { init };
})();
