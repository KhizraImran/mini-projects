(function() {
  'use strict';

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    const html = document.documentElement;
    const body = document.body;

    // Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.classList.add('hidden');
          runIntro();
        }
      });
    });

    // Theme
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('ine-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ine-theme', next);
      updateThemeIcon(next);
      if (window.spiceParticles) window.spiceParticles.updateColors();
    });

    function updateThemeIcon(theme) {
      const sun = themeBtn.querySelector('.icon-sun');
      const moon = themeBtn.querySelector('.icon-moon');
      if (!sun || !moon) return;
      if (theme === 'dark') {
        sun.style.display = 'block';
        moon.style.display = 'none';
      } else {
        sun.style.display = 'none';
        moon.style.display = 'block';
      }
    }

    // Language
    const langBtn = document.getElementById('lang-toggle');
    const savedLang = localStorage.getItem('ine-lang') || 'en';
    setLanguage(savedLang);

    langBtn.addEventListener('click', () => {
      const current = html.getAttribute('lang') || 'en';
      const next = current === 'en' ? 'ar' : 'en';
      setLanguage(next);
      localStorage.setItem('ine-lang', next);
    });

    function setLanguage(lang) {
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      langBtn.textContent = lang === 'ar' ? 'EN' : 'AR';

      document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      });

      // Re-split hero title if English for 3D char animation
      const heroTitle = document.getElementById('hero-title');
      if (heroTitle) {
        splitChars(heroTitle, lang);
      }
    }

    function splitChars(el, lang) {
      const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      el.innerHTML = '';
      if (lang === 'ar') {
        const span = document.createElement('span');
        span.textContent = text;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        el.appendChild(span);
        gsap.to(span, { opacity: 1, duration: 0.8, delay: 0.2 });
        return;
      }
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'rotateX(90deg) translateY(40px)';
        el.appendChild(span);
      });
    }

    function runIntro() {
      const tl = gsap.timeline();
      const heroTitle = document.getElementById('hero-title');
      const lang = html.getAttribute('lang') || 'en';
      if (heroTitle && lang === 'en') {
        const chars = heroTitle.querySelectorAll('.char');
        tl.to(chars, {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: 'power3.out'
        }, 0.2);
      }
      tl.from('.hero-badge, .hero-subtitle, .hero-actions .btn', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      }, 0.6);
    }

    // Mobile nav
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        body.style.overflow = '';
      });
    });

    // Navbar scroll morph
    const nav = document.getElementById('main-nav');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      lastScroll = y;
    }, { passive: true });

    // Scroll progress
    const progress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    }, { passive: true });

    // Custom cursor
    const cursor = document.getElementById('cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = 0, mouseY = 0, cx = 0, cy = 0;
      window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, { passive: true });
      function animateCursor() {
        cx += (mouseX - cx) * 0.12;
        cy += (mouseY - cy) * 0.12;
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      document.querySelectorAll('a, button, .dish-card, .gallery-item, .menu-category').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
      });
    }

    // Magnetic buttons
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });

    // Spice particles
    initParticles();

    // 3D Carousel
    initCarousel();

    // Lightbox
    initLightbox();

    // ScrollTrigger animations
    initScrollAnimations();

    // Reveal fallback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // Particles
  function initParticles() {
    const canvas = document.getElementById('spice-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const count = isTouch ? 25 : 55;

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const paletteLight = ['#d97706', '#b45309', '#7c2d12', '#f59e0b', '#92400e'];
    const paletteDark = ['#f59e0b', '#fbbf24', '#f87171', '#d97706', '#fb923c'];

    function getPalette() {
      return document.documentElement.getAttribute('data-theme') === 'dark' ? paletteDark : paletteLight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = getPalette()[Math.floor(Math.random() * getPalette().length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.2;
        this.rotation += this.rotSpeed;
        if (this.y < -20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // irregular spice grain shape
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();

    window.spiceParticles = {
      updateColors: () => {
        particles.forEach(p => p.color = getPalette()[Math.floor(Math.random() * getPalette().length)]);
      }
    };
  }

  // 3D Carousel
  function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const cards = Array.from(track.querySelectorAll('.dish-card'));
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    const total = cards.length;
    const theta = 360 / total;
    const radius = Math.round(300 / (2 * Math.tan(Math.PI / total)));
    let selected = 0;
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;

    function update() {
      const angle = theta * selected * -1;
      currentRotation = angle;
      track.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
      cards.forEach((card, i) => {
        card.style.transform = `rotateY(${i * theta}deg) translateZ(${radius}px)`;
        card.style.opacity = i === selected ? '1' : '0.55';
        card.style.filter = i === selected ? 'none' : 'blur(1px) grayscale(0.3)';
      });
      dots.forEach((dot, i) => dot.classList.toggle('active', i === selected));
    }

    update();

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { selected = i; update(); });
    });

    const stage = document.querySelector('.carousel-stage');
    stage.addEventListener('pointerdown', e => {
      isDragging = true;
      startX = e.clientX;
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      track.style.transform = `translateZ(-${radius}px) rotateY(${currentRotation + dx * 0.15}deg)`;
    });
    stage.addEventListener('pointerup', e => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) {
        selected = (selected + (dx < 0 ? 1 : -1) + total) % total;
      }
      update();
    });

    // Auto rotate slowly when idle
    let auto = setInterval(() => {
      if (!isDragging) {
        selected = (selected + 1) % total;
        update();
      }
    }, 4500);

    stage.addEventListener('mouseenter', () => clearInterval(auto));
    stage.addEventListener('mouseleave', () => {
      auto = setInterval(() => {
        selected = (selected + 1) % total;
        update();
      }, 4500);
    });
  }

  // Lightbox
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.lightbox-close');
    if (!lightbox) return;

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lbImg.src = img.src;
          lbImg.alt = img.alt || '';
          lightbox.classList.add('open');
        }
      });
    });

    close.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  // Scroll animations with GSAP ScrollTrigger
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax
    gsap.to('.hero-bg', {
      yPercent: 20,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // About frame 3D reveal
    gsap.from('.about-frame', {
      rotateY: -25,
      rotateX: 8,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 75%'
      }
    });

    gsap.from('.about-text > *', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 75%'
      }
    });

    // Menu categories stagger
    gsap.from('.menu-category', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.menu-grid',
        start: 'top 80%'
      }
    });

    // Gallery items
    gsap.from('.gallery-item', {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%'
      }
    });

    // Experience cards
    gsap.from('.exp-card', {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.experience-cards',
        start: 'top 80%'
      }
    });

    // Location elements
    gsap.from('.map-frame', {
      x: -60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.location-grid',
        start: 'top 75%'
      }
    });
    gsap.from('.contact-card', {
      x: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.location-grid',
        start: 'top 75%'
      }
    });

    // CTA
    gsap.from('#cta > *', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#cta',
        start: 'top 80%'
      }
    });
  }
})();
