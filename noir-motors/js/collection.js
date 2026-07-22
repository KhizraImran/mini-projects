/* ============================================================
   NOIR MOTORS — COLLECTION PAGE LOGIC
   ============================================================ */

const NoirCollection = (() => {

  /* ── Filter System ── */
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('[data-category]');
    const countEl = document.querySelector('.filter-count');

    if (!filterBtns.length) return;

    let activeFilter = 'all';

    function updateCount() {
      const visible = document.querySelectorAll('[data-category]:not([style*="display: none"])');
      if (countEl) {
        countEl.textContent = visible.length + ' Models';
      }
    }

    function filterCards(category) {
      cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const show = category === 'all' || cardCategory === category;

        if (show) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            if (card.dataset.category !== activeFilter && activeFilter !== 'all') {
              card.style.display = 'none';
            }
          }, 300);
        }
      });

      setTimeout(updateCount, 350);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter;
        if (category === activeFilter) return;

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = category;
        filterCards(category);
      });
    });

    updateCount();
  }

  /* ── Hover Effect: Card Tilt ── */
  function initCardTilt() {
    const cards = document.querySelectorAll('.card-portrait, .card-fullwidth');
    if (window.matchMedia('(hover: none)').matches) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        card.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  /* ── Scroll Reveal for Collection ── */
  function initCollectionReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Large cards
    document.querySelectorAll('.card-editorial-large').forEach((card, i) => {
      const img = card.querySelector('.card-editorial-large__img');
      const body = card.querySelector('.card-editorial-large__body');

      if (img) {
        gsap.fromTo(img,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%', once: true }
          }
        );
      }

      if (body) {
        gsap.fromTo(body,
          { opacity: 0, x: i % 2 === 0 ? 30 : -30 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: card, start: 'top 80%', once: true }
          }
        );
      }
    });

    // Portrait cards
    document.querySelectorAll('.card-portrait').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          delay: (i % 2) * 0.15,
          scrollTrigger: { trigger: card.closest('.editorial-duo') || card, start: 'top 80%', once: true }
        }
      );
    });

    // Fullwidth cards
    document.querySelectorAll('.card-fullwidth').forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });

    // Offset cards
    document.querySelectorAll('.editorial-offset__main, .editorial-offset__info, .editorial-offset__accent').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: el.closest('.editorial-offset') || el, start: 'top 80%', once: true }
        }
      );
    });
  }

  /* ── Init ── */
  function init() {
    if (!document.querySelector('.filter-bar')) return;

    initFilters();
    initCardTilt();

    setTimeout(initCollectionReveal, 300);
  }

  return { init };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', NoirCollection.init);
} else {
  NoirCollection.init();
}
