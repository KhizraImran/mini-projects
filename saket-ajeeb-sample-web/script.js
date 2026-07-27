/* =============================================
   SAKET AJEEB RESTAURANT — script.js
   GSAP + ScrollTrigger + ScrollToPlugin
   ============================================= */

"use strict";

/* =============================================
   REGISTER GSAP PLUGINS
   ============================================= */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* =============================================
   CONSTANTS & STATE
   ============================================= */
const LOGO_EN = "SAKET AJEEB";
const LOGO_AR = "ساكت عجيب";
let currentLang = "en";
let currentTheme = "dark";
let mobileMenuOpen = false;

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */
function $(selector, scope = document) {
  return scope.querySelector(selector);
}

function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

/* =============================================
   BUILD FLIP BOARD TILES
   ============================================= */
function buildFlipBoard(containerId, text, tileClass = "flip-tile") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const tile = document.createElement("span");
    tile.classList.add(tileClass);
    if (ch === " ") {
      tile.classList.add("space");
      tile.setAttribute("aria-hidden", "true");
    }
    tile.textContent = ch;
    tile.setAttribute("data-char", ch);
    container.appendChild(tile);
  }
}

function buildFooterTiles(text) {
  const container = document.getElementById("footerTiles");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const tile = document.createElement("span");
    tile.classList.add("footer-tile");
    if (ch === " ") {
      tile.classList.add("space");
    }
    tile.textContent = ch;
    container.appendChild(tile);
  }
}

/* =============================================
   NAVBAR FLIP ANIMATION (PAGE LOAD)
   ============================================= */
function animateFlipBoardLoad() {
  const tiles = $$("#flipBoard .flip-tile:not(.space)");
  if (!tiles.length) return;

  // Characters shuffle before settling
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const originalChars = tiles.map(t => t.textContent);

  // Shuffle phase
  tiles.forEach((tile, i) => {
    let shuffleCount = 0;
    const maxShuffles = 5 + Math.floor(Math.random() * 4);
    const interval = setInterval(() => {
      tile.textContent = chars[Math.floor(Math.random() * chars.length)];
      shuffleCount++;
      if (shuffleCount >= maxShuffles) {
        clearInterval(interval);
        tile.textContent = originalChars[i];
      }
    }, 60 + i * 20);
  });

  // GSAP rotateX flip for each tile
  gsap.set(tiles, { transformPerspective: 400, rotateX: -90, opacity: 0 });
  gsap.to(tiles, {
    rotateX: 0,
    opacity: 1,
    duration: 0.35,
    stagger: 0.06,
    ease: "power2.inOut",
    onComplete: () => {
      // Brief color flash on whole wordmark
      gsap.to(tiles, {
        color: "var(--accent)",
        duration: 0.25,
        onComplete: () => {
          gsap.to(tiles, {
            color: "var(--text)",
            duration: 0.5,
            delay: 0.15
          });
        }
      });
    }
  });
}

/* =============================================
   HERO ANIMATIONS (PAGE LOAD)
   ============================================= */
function animateHero() {
  // Word reveal
  const words = $$(".hero-word");
  gsap.to(words, {
    clipPath: "inset(0 0% 0 0)",
    duration: 0.9,
    stagger: 0.15,
    ease: "power4.out",
    delay: 0.3
  });

  // Tagline fade up
  gsap.to(".hero-tagline", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.8
  });

  // EST label fade in
  gsap.from(".hero-est", {
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.2
  });

  // Rule scale in
  gsap.from(".hero-rule", {
    scaleX: 0,
    duration: 0.7,
    ease: "power3.out",
    delay: 0.25,
    transformOrigin: "center"
  });

  // Arabic name
  gsap.from(".hero-arabic", {
    opacity: 0,
    y: 12,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.7
  });

  // CTA buttons
  gsap.from(".hero-ctas .btn-primary, .hero-ctas .btn-ghost", {
    opacity: 0,
    y: 16,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    delay: 1.0
  });

  // Hero strip
  gsap.from(".hero-strip", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    delay: 1.3
  });
}

/* =============================================
   NAVBAR SCROLL BEHAVIOUR
   ============================================= */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScroll = scrollY;
  }, { passive: true });
}

/* =============================================
   SMOOTH SCROLL — NAV LINKS
   ============================================= */
function initSmoothScroll() {
  $$("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById("navbar").offsetHeight;
      gsap.to(window, {
        duration: 1.0,
        scrollTo: { y: target, offsetY: navH },
        ease: "power3.inOut"
      });
      // Close mobile menu
      if (mobileMenuOpen) closeMobileMenu();
    });
  });
}

/* =============================================
   NAV LINK HOVER MICRO-FLIP
   ============================================= */
function initNavLinkFlip() {
  $$(".flip-link").forEach(link => {
    link.addEventListener("mouseenter", () => {
      gsap.fromTo(link, {
        rotateX: -20,
        skewY: 1
      }, {
        rotateX: 0,
        skewY: 0,
        duration: 0.25,
        ease: "power2.out",
        transformPerspective: 300
      });
    });
  });
}

/* =============================================
   HAMBURGER / MOBILE MENU
   ============================================= */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const lines = $$(".ham-line");
  const mobileLinks = $$(".mobile-nav-links li a");

  hamburger.addEventListener("click", () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close on link click handled in smooth scroll init
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  function openMobileMenu() {
    mobileMenuOpen = true;
    mobileMenu.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");

    // Animate hamburger to X
    gsap.to(lines[0], { rotation: 45, y: 8, duration: 0.3, ease: "power2.inOut" });
    gsap.to(lines[1], { opacity: 0, duration: 0.15 });
    gsap.to(lines[2], { rotation: -45, y: -8, duration: 0.3, ease: "power2.inOut" });

    // Stagger links in
    gsap.fromTo(mobileLinks,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.07, ease: "power2.out", delay: 0.05 }
    );
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");

    // Animate X back to hamburger
    gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
    gsap.to(lines[1], { opacity: 1, duration: 0.2, delay: 0.1 });
    gsap.to(lines[2], { rotation: 0, y: 0, duration: 0.3, ease: "power2.inOut" });

    // Fade links out, then hide panel
    gsap.to(mobileLinks, {
      opacity: 0,
      y: -8,
      duration: 0.2,
      stagger: 0.04,
      ease: "power2.in",
      onComplete: () => {
        mobileMenu.classList.remove("is-open");
        // Reset link positions for next open
        gsap.set(mobileLinks, { opacity: 0, y: 12 });
      }
    });
  }
}

/* =============================================
   THEME TOGGLE
   ============================================= */
function initThemeToggle() {
  const btnDay = document.getElementById("btnDay");
  const btnNight = document.getElementById("btnNight");
  const html = document.documentElement;

  function setTheme(theme) {
    currentTheme = theme;
    html.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    btnDay.classList.toggle("active", theme === "light");
    btnNight.classList.toggle("active", theme === "dark");
    btnDay.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    btnNight.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  btnDay.addEventListener("click", () => setTheme("light"));
  btnNight.addEventListener("click", () => setTheme("dark"));
}

/* =============================================
   LANGUAGE TOGGLE
   ============================================= */
function initLangToggle() {
  const btnEn = document.getElementById("btnEn");
  const btnAr = document.getElementById("btnAr");
  const html = document.documentElement;

  function setLang(lang) {
    currentLang = lang;
    html.setAttribute("lang", lang === "ar" ? "ar" : "en");
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    btnEn.classList.toggle("active", lang === "en");
    btnAr.classList.toggle("active", lang === "ar");
    btnEn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    btnAr.setAttribute("aria-pressed", lang === "ar" ? "true" : "false");

    // Swap text content
    const dataAttr = lang === "ar" ? "data-ar" : "data-en";
    $$("[data-en][data-ar]").forEach(el => {
      const val = el.getAttribute(dataAttr);
      if (val !== null) el.textContent = val;
    });

    // Rebuild flip board for language
    const logoText = lang === "ar" ? LOGO_AR : LOGO_EN;
    buildFlipBoard("flipBoard", logoText, "flip-tile");
    buildFooterTiles(lang === "ar" ? "ساكت عجيب" : "SAKET AJEEB");

    // Brief flip animation on tiles
    const tiles = $$("#flipBoard .flip-tile:not(.space)");
    gsap.fromTo(tiles,
      { rotateX: -60, opacity: 0 },
      { rotateX: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: "power2.out" }
    );
  }

  btnEn.addEventListener("click", () => setLang("en"));
  btnAr.addEventListener("click", () => setLang("ar"));
}

/* =============================================
   SCROLLTRIGGER ANIMATIONS
   ============================================= */
function initScrollAnimations() {

  /* ---- SECTION HEADINGS ---- */
  $$(".section-heading").forEach(el => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  });

  /* ---- STORY: Newspaper columns ---- */
  const newsLeft = document.getElementById("newsLeft");
  const newsRight = document.getElementById("newsRight");

  if (newsLeft && newsRight) {
    gsap.to(newsLeft, {
      x: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".newspaper-columns",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    gsap.set(newsLeft, { x: -50, opacity: 0 });
    gsap.set(newsRight, { x: 50, opacity: 0 });
    gsap.to(newsRight, {
      x: 0,
      opacity: 1,
      duration: 0.85,
      ease: "power3.out",
      delay: 0.1,
      scrollTrigger: {
        trigger: ".newspaper-columns",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }

  /* ---- MENU CARD ---- */
  const menuCard = document.getElementById("menuCard");
  if (menuCard) {
    gsap.to(menuCard, {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: menuCard,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }

  /* ---- LEGACY COUNTERS ---- */
  const legStats = $$(".legacy-stat");
  if (legStats.length) {
    gsap.to(legStats, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".legacy-container",
        start: "top 80%",
        toggleActions: "play none none none",
        onEnter: () => animateCounters()
      }
    });
  }

  /* ---- TESTIMONIAL SLIPS ---- */
  const slips = $$(".receipt-slip");
  if (slips.length) {
    // Read rotation from CSS custom property --rot defined in inline style
    const rots = [-2, 1.5, -1, 2.5];
    gsap.set(slips, { opacity: 0, y: 30, rotation: 0 });
    gsap.to(slips, {
      opacity: 1,
      y: 0,
      rotation: (i) => rots[i] !== undefined ? rots[i] : 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".receipts-board",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }

  /* ---- GALLERY TILES ---- */
  const tiles = $$(".gallery-tile");
  if (tiles.length) {
    gsap.to(tiles, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: {
        amount: 0.5,
        from: "start"
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".gallery-grid",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }

  /* ---- CONTACT HEADING ---- */
  const contactH = $(".contact-heading");
  if (contactH) {
    gsap.to(contactH, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contactH,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
  }

  /* ---- CONTACT COLUMNS ---- */
  const contactInfo = $(".contact-info");
  const contactMap = $(".contact-map");
  if (contactInfo) {
    gsap.from(contactInfo, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-columns",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }
  if (contactMap) {
    gsap.from(contactMap, {
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-columns",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  }
}

/* =============================================
   COUNTER ANIMATION (LEGACY)
   ============================================= */
function animateCounters() {
  const counters = [
    { el: document.getElementById("legYears"), target: 50, suffix: "+" },
    { el: document.getElementById("legCuisines"), target: 3, suffix: "" },
    { el: document.getElementById("legRank"), target: 13, prefix: "#", suffix: "" }
  ];

  counters.forEach(c => {
    if (!c.el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: c.target,
      duration: 2.0,
      ease: "power2.out",
      onUpdate: () => {
        const v = Math.round(obj.val);
        c.el.textContent = (c.prefix || "") + v + (c.suffix || "");
      },
      onComplete: () => {
        c.el.textContent = (c.prefix || "") + c.target + (c.suffix || "");
      }
    });
  });
}

/* =============================================
   STORY STAT COUNTERS (smaller version)
   ============================================= */
function initStoryCounters() {
  const statsRow = $(".stats-row");
  if (!statsRow) return;

  const items = [
    { el: document.getElementById("statYears"), target: 50, suffix: "+" },
    { el: document.getElementById("statCuisines"), target: 3, suffix: "" },
    { el: document.getElementById("statRank"), target: 13, prefix: "#" }
  ];

  ScrollTrigger.create({
    trigger: statsRow,
    start: "top 85%",
    onEnter: () => {
      items.forEach(c => {
        if (!c.el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: c.target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            const v = Math.round(obj.val);
            c.el.textContent = (c.prefix || "") + v + (c.suffix || "");
          },
          onComplete: () => {
            c.el.textContent = (c.prefix || "") + c.target + (c.suffix || "");
          }
        });
      });
    }
  });
}

/* =============================================
   SET INITIAL GSAP STATES (before animations)
   ============================================= */
function setInitialStates() {
  // Hero words start clipped
  gsap.set(".hero-word", { clipPath: "inset(0 100% 0 0)" });

  // Newspaper columns start offscreen
  const newsLeft = document.getElementById("newsLeft");
  const newsRight = document.getElementById("newsRight");
  if (newsLeft) gsap.set(newsLeft, { x: -50, opacity: 0 });
  if (newsRight) gsap.set(newsRight, { x: 50, opacity: 0 });

  // Menu card
  gsap.set("#menuCard", { scale: 0.92, opacity: 0 });

  // Legacy stats
  gsap.set(".legacy-stat", { opacity: 0, y: 30 });

  // Gallery tiles
  gsap.set(".gallery-tile", { scale: 0.85, opacity: 0 });

  // Story heading & other section headings already have inline opacity:0 transform via CSS
}

/* =============================================
   GALLERY HEADING NOT A SECTION-HEADING STYLE
   (override the section-heading scroll trigger since
   gallery-heading has its own styling)
   ============================================= */
function initGalleryHeading() {
  const gh = $(".gallery-heading");
  if (!gh) return;
  gsap.to(gh, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: gh,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
}

/* =============================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================= */
function initActiveNavLinks() {
  const sections = $$("section[id], footer[id]");
  const navLinks = $$(".nav-link");

  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 60%",
      onEnter: () => updateActiveLink(section.id),
      onEnterBack: () => updateActiveLink(section.id)
    });
  });

  function updateActiveLink(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === `#${id}`) {
        link.style.color = "var(--accent)";
      } else {
        link.style.color = "";
      }
    });
  }
}

/* =============================================
   INIT ALL
   ============================================= */
function init() {
  // Build flip board with English text
  buildFlipBoard("flipBoard", LOGO_EN, "flip-tile");
  buildFooterTiles("SAKET AJEEB");

  // Set initial states before any animation
  setInitialStates();

  // Navbar
  initNavbarScroll();
  initNavLinkFlip();
  initMobileMenu();

  // Toggles
  initThemeToggle();
  initLangToggle();

  // Smooth scroll
  initSmoothScroll();

  // Run flip board load animation after slight delay
  setTimeout(() => {
    animateFlipBoardLoad();
  }, 100);

  // Hero animations
  animateHero();

  // ScrollTrigger-based animations
  initScrollAnimations();
  initStoryCounters();
  initGalleryHeading();
  initActiveNavLinks();

  // Refresh ScrollTrigger after all images might load
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}

/* =============================================
   DOM READY
   ============================================= */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
