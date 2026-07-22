/* =========================================
   LUMIERE X DEJEUNER BISTRO
   Premium JavaScript
   ========================================= */

(function () {
    'use strict';

    /* --- DOM Cache --- */
    const body = document.body;
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const backToTop = document.getElementById('backToTop');
    const scrollProgress = document.querySelector('.scroll-progress');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const hero = document.querySelector('.hero');
    const reservationForm = document.getElementById('reservationForm');
    const resConfirmation = document.getElementById('resConfirmation');

    /* --- State --- */
    let mouseX = 0;
    let mouseY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    let cursorRingX = 0;
    let cursorRingY = 0;
    let ticking = false;
    let isMobile = window.innerWidth <= 425;

    /* --- Loading Screen --- */
    function hideLoader() {
        loader.classList.add('hidden');
        hero.classList.add('loaded');
        setTimeout(function () {
            loader.style.display = 'none';
        }, 700);
    }

    window.addEventListener('load', function () {
        setTimeout(hideLoader, 1200);
    });

    /* Safety fallback */
    setTimeout(hideLoader, 4000);

    /* --- Custom Cursor --- */
    function initCursor() {
        if (isMobile) return;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorDotX += (mouseX - cursorDotX) * 0.25;
            cursorDotY += (mouseY - cursorDotY) * 0.25;
            cursorRingX += (mouseX - cursorRingX) * 0.12;
            cursorRingY += (mouseY - cursorRingY) * 0.12;

            cursorDot.style.left = cursorDotX + 'px';
            cursorDot.style.top = cursorDotY + 'px';
            cursorRing.style.left = cursorRingX + 'px';
            cursorRing.style.top = cursorRingY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        var hoverElements = document.querySelectorAll('a, button, input, select, textarea, .dish-card, .exp-card, .review-card, .gallery-item, .wine-region');

        hoverElements.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', function () {
                body.classList.remove('cursor-hover');
            });
        });
    }

    /* --- Navbar Scroll --- */
    function handleNavbarScroll() {
        var scrollY = window.pageYOffset;

        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* --- Scroll Progress Bar --- */
    function updateScrollProgress() {
        var scrollTop = window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }

    /* --- Back to Top --- */
    function handleBackToTop() {
        if (window.pageYOffset > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- Combined Scroll Handler --- */
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(function () {
                handleNavbarScroll();
                updateScrollProgress();
                handleBackToTop();
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* --- Mobile Nav --- */
    navToggle.addEventListener('click', function () {
        var isOpen = mobileNav.classList.contains('open');

        if (isOpen) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    function openMobileNav() {
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        mobileNav.classList.add('open');
        mobileNav.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
    }

    /* Close mobile nav on link click */
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', closeMobileNav);
    });

    /* --- Active Nav Link on Scroll --- */
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link');
        var scrollY = window.pageYOffset + 200;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    /* --- Intersection Observer: Scroll Reveal --- */
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            });

            revealElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            /* Fallback for older browsers */
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    /* --- Animated Counters --- */
    function initCounters() {
        var counters = document.querySelectorAll('.counter');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            counters.forEach(function (counter) {
                observer.observe(counter);
            });
        }
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easeOut = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(easeOut * target);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    /* --- Ripple Effect on Buttons --- */
    function initRipple() {
        document.querySelectorAll('.ripple-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                var rect = btn.getBoundingClientRect();
                var ripple = document.createElement('span');
                ripple.className = 'ripple';
                var size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                btn.appendChild(ripple);

                setTimeout(function () {
                    ripple.remove();
                }, 600);
            });
        });
    }

    /* --- Parallax --- */
    function handleParallax() {
        var parallaxElements = document.querySelectorAll('.parallax-bg');

        parallaxElements.forEach(function (el) {
            var section = el.closest('section');
            if (!section) return;

            var rect = section.getBoundingClientRect();
            var viewHeight = window.innerHeight;

            if (rect.top < viewHeight && rect.bottom > 0) {
                var scrollPercent = (viewHeight - rect.top) / (viewHeight + rect.height);
                var yOffset = (scrollPercent - 0.5) * 60;
                el.style.transform = 'translateY(' + yOffset + 'px) scale(1.05)';
            }
        });
    }

    /* --- 3D Card Tilt --- */
    function initCardTilt() {
        if (isMobile) return;

        document.querySelectorAll('.card-3d').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = ((y - centerY) / centerY) * -5;
                var rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    /* --- Reservation Form --- */
    function initReservationForm() {
        if (!reservationForm) return;

        /* Set minimum date to today */
        var dateInput = document.getElementById('resDate');
        if (dateInput) {
            var today = new Date();
            var yyyy = today.getFullYear();
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var dd = String(today.getDate()).padStart(2, '0');
            dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
        }

        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            /* Basic validation */
            var isValid = true;
            var requiredFields = reservationForm.querySelectorAll('[required]');

            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';

                    field.addEventListener('input', function handler() {
                        field.style.borderColor = '';
                        field.removeEventListener('input', handler);
                    }, { once: true });
                }
            });

            /* Email validation */
            var emailField = document.getElementById('resEmail');
            if (emailField && emailField.value) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#e74c3c';
                }
            }

            if (isValid) {
                reservationForm.style.display = 'none';
                resConfirmation.hidden = false;
            }
        });
    }

    /* --- Smooth Anchor Scrolling --- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    var offset = navbar.offsetHeight + 10;
                    var top = target.offsetTop - offset;

                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* --- Gallery Image Zoom on Hover --- */
    function initGalleryEffects() {
        document.querySelectorAll('.gallery-item').forEach(function (item) {
            item.style.cursor = 'none';
        });
    }

    /* --- Window Resize Handler --- */
    function onResize() {
        isMobile = window.innerWidth <= 425;
    }

    window.addEventListener('resize', debounce(onResize, 200));

    /* --- Utility: Debounce --- */
    function debounce(func, wait) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    }

    /* --- Initialize --- */
    function init() {
        initCursor();
        initScrollReveal();
        initCounters();
        initRipple();
        initCardTilt();
        initReservationForm();
        initSmoothScroll();
        initGalleryEffects();

        /* Initial state checks */
        handleNavbarScroll();
        updateScrollProgress();
        handleBackToTop();
    }

    /* Start when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
