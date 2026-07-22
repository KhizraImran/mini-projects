/* ============================================================
   NOIR MOTORS — ANIMATIONS & GSAP
   ============================================================ */

const NoirAnimations = (() => {

  /* ── Scroll Reveal Observer ── */
  function initScrollReveal() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  /* ── GSAP Scroll Animations ── */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero headline stagger
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
      const words = heroHeadline.querySelectorAll('.word');
      if (words.length) {
        gsap.fromTo(words,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      } else {
        gsap.fromTo(heroHeadline,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 }
        );
      }
    }

    // Hero right side
    const heroRight = document.querySelector('.hero-right');
    if (heroRight) {
      gsap.fromTo(heroRight,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1 }
      );
    }

    // Nav
    const nav = document.getElementById('nav');
    if (nav) {
      gsap.fromTo(nav,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
      );
    }

    // Section headings
    document.querySelectorAll('.gsap-fade-up').forEach(el => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          }
        }
      );
    });

    // Stagger children
    document.querySelectorAll('.stagger-children').forEach(parent => {
      const children = parent.children;
      gsap.fromTo(children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 80%',
            once: true,
          }
        }
      );
    });

    // Parallax images
    document.querySelectorAll('.parallax-img').forEach(img => {
      const wrap = img.parentElement;
      gsap.to(img, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      });
    });

    // Featured cars
    document.querySelectorAll('.featured-car').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            once: true,
          }
        }
      );
    });

    // Performance stats counter
    document.querySelectorAll('.perf-stat__number').forEach(el => {
      const target = parseFloat(el.dataset.target || el.textContent.replace(/[^0-9.]/g, ''));
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = el.dataset.decimals || 0;

      if (!isNaN(target)) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = prefix + obj.val.toFixed(decimals) + suffix;
          }
        });
      }
    });

    // Gallery items
    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: item.closest('.gallery-grid') || item,
            start: 'top 75%',
            once: true,
          }
        }
      );
    });

    // Brand story text
    const storyText = document.querySelector('.brand-story-text');
    if (storyText) {
      gsap.fromTo(storyText,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyText,
            start: 'top 75%',
            once: true,
          }
        }
      );
    }

    // Brand story visual
    const storyVisual = document.querySelector('.brand-story-visual');
    if (storyVisual) {
      gsap.fromTo(storyVisual,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyVisual,
            start: 'top 75%',
            once: true,
          }
        }
      );
    }

    // Craftsmanship pillars
    document.querySelectorAll('.craft-pillar').forEach((pillar, i) => {
      gsap.fromTo(pillar,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pillar,
            start: 'top 88%',
            once: true,
          }
        }
      );
    });

    // Engineering items
    document.querySelectorAll('.eng-item').forEach((item, i) => {
      gsap.fromTo(item,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            once: true,
          }
        }
      );
    });

    // Testimonial cards
    document.querySelectorAll('.testimonial-slide').forEach((slide, i) => {
      gsap.fromTo(slide,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide.closest('.testimonials') || slide,
            start: 'top 80%',
            once: true,
          }
        }
      );
    });

    // Horizontal scroll for marquee (already CSS animated, just ensure it's smooth)

    // Footer reveal
    const footer = document.querySelector('footer');
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            once: true,
          }
        }
      );
    }
  }

  /* ── Scroll Progress Bar ── */
  function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Custom Cursor ── */
  function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    // Check touch device
    if (window.matchMedia('(hover: none)').matches) return;

    let curX = 0, curY = 0;
    let folX = 0, folY = 0;

    const moveCursor = (e) => {
      curX = e.clientX;
      curY = e.clientY;
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    const animateCursor = () => {
      cursor.style.transform = `translate(${curX - 4}px, ${curY - 4}px)`;
      folX += (curX - folX) * 0.12;
      folY += (curY - folY) * 0.12;
      follower.style.transform = `translate(${folX - 20}px, ${folY - 20}px)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover states
    const hoverEls = document.querySelectorAll('a, button, .gallery-item, .featured-car__image, .card-portrait');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  /* ── Parallax on Scroll (CSS fallback) ── */
  function initParallax() {
    if (typeof gsap !== 'undefined') return; // GSAP handles it

    const parallaxEls = document.querySelectorAll('.parallax-img');
    if (!parallaxEls.length) return;

    const update = () => {
      const sy = window.scrollY;
      parallaxEls.forEach(el => {
        const rect = el.closest('.parallax-wrap')?.getBoundingClientRect();
        if (!rect) return;
        const relY = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${relY * 0.15}px)`;
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Nav Scroll Behavior ── */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage ||
         (currentPage === '' && href === 'index.html') ||
         (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ── Mobile Menu ── */
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const menu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.mobile-menu__close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!hamburger || !menu) return;

    let isOpen = false;

    const openMenu = () => {
      isOpen = true;
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      isOpen = false;
      menu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
    closeBtn?.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ── Newsletter Form ── */
  function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        const submit = form.querySelector('.newsletter-submit');
        if (!input || !input.value.includes('@')) return;

        const original = submit.textContent;
        submit.textContent = 'Subscribed';
        submit.style.background = '#2a4a2a';
        submit.style.color = '#8fbe8f';
        input.value = '';

        setTimeout(() => {
          submit.textContent = original;
          submit.style.background = '';
          submit.style.color = '';
        }, 3000);
      });
    });
  }

  /* ── Loader ── */
  function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    const percentEl = loader.querySelector('.loader__percent');
    let count = 0;

    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 12) + 3;
      if (count >= 100) count = 100;
      if (percentEl) percentEl.textContent = count + '%';
      if (count >= 100) clearInterval(interval);
    }, 60);

    setTimeout(() => {
      loader.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = '';
      }, 800);
    }, 1900);

    document.body.style.overflow = 'hidden';
  }

  /* ── Image Lazy Load ── */
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
      const imgs = document.querySelectorAll('img[loading="lazy"]');
      imgs.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '300px' });

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
  }

  /* ── Split Text into Words ── */
  function splitHeroText() {
    const headline = document.querySelector('.hero-headline');
    if (!headline) return;

    const html = headline.innerHTML;
    const words = html.split(/(\s+)/);
    headline.innerHTML = words.map(word => {
      if (word.trim() === '') return word;
      return `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:bottom">${word}</span>`;
    }).join('');
  }

  /* ── Init All ── */
  function init() {
    initLoader();
    initNav();
    initMobileMenu();
    initScrollProgress();
    initScrollReveal();
    initParallax();
    initNewsletter();
    initLazyLoad();
    splitHeroText();

    // GSAP after a brief delay (after loader)
    setTimeout(() => {
      initGSAP();
      initCursor();
    }, 200);
  }

  return { init };
})();

// Auto-init on DOM ready
// Since scripts are deferred, DOMContentLoaded may already have fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', NoirAnimations.init);
} else {
  // DOM is already ready — defer slightly to allow other deferred scripts to load
  setTimeout(NoirAnimations.init, 0);
}
