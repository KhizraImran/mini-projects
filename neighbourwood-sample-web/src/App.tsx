import { useEffect } from 'react';
import './style.css';

export default function App() {
  useEffect(() => {
    /* ============================================================
       NEIGHBOURWOOD RESTAURANT — Interactive JS
       Premium animations, scroll effects, navigation behaviour
       ============================================================ */

    const $ = (sel: string, ctx: Document | Element = document): Element | null =>
      ctx.querySelector(sel);
    const $$ = (sel: string, ctx: Document | Element = document): Element[] =>
      [...ctx.querySelectorAll(sel)];

    const header = $('#nw-header') as HTMLElement | null;
    const hamburger = $('#nw-hamburger') as HTMLButtonElement | null;
    const mobileMenu = $('#nw-mobile-menu') as HTMLElement | null;
    const navLinks = $$('.nw-nav-link') as HTMLAnchorElement[];
    const mobileLinks = $$('.nw-mobile-link') as HTMLAnchorElement[];
    const heroImg = $('#nw-hero-img') as HTMLImageElement | null;
    const heroContent = $('#nw-hero-content') as HTMLElement | null;

    // 1. Hero image reveal
    if (heroImg) {
      requestAnimationFrame(() => {
        setTimeout(() => heroImg.classList.add('loaded'), 100);
      });
    }

    // 2. Mouse parallax on hero
    let ticking = false;
    const onMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!heroContent) { ticking = false; return; }
        const W = window.innerWidth;
        const H = window.innerHeight;
        const x = (e.clientX / W - 0.5) * 18;
        const y = (e.clientY / H - 0.5) * 12;
        heroContent.style.transform = `translate(${x}px, ${y}px)`;
        if (heroImg) {
          heroImg.style.transform = `scale(1) translate(${-x * 0.4}px, ${-y * 0.3}px)`;
        }
        ticking = false;
      });
    };

    document.addEventListener('mousemove', onMouseMove as EventListener);

    // 3. Scroll: header compression + active link
    const sections = $$('section[id]') as HTMLElement[];

    const onScroll = () => {
      const scroll = window.scrollY;

      if (header) {
        header.classList.toggle('scrolled', scroll > 60);
      }

      let currentSection = 'home';
      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        if (top <= 120) currentSection = sec.id;
      });

      navLinks.forEach((link) => {
        const sec = link.getAttribute('data-section');
        link.classList.toggle('active', sec === currentSection);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 4. Smooth scroll
    const smoothScrollTo = (targetId: string) => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    const closeMobileMenu = () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    };

    const navClickHandlers: Array<[Element, EventListener]> = [];
    [...navLinks, ...mobileLinks].forEach((link) => {
      const handler: EventListener = (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScrollTo(href.slice(1));
          closeMobileMenu();
        }
      };
      link.addEventListener('click', handler);
      navClickHandlers.push([link, handler]);
    });

    // 5. Hamburger
    let hamburgerHandler: EventListener | null = null;
    if (hamburger && mobileMenu) {
      hamburgerHandler = () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      };
      hamburger.addEventListener('click', hamburgerHandler);
    }

    // 6. Scroll reveal
    const revealEls = $$('.nw-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // 7. Staggered child reveals
    const staggerContainers = $$(
      '.nw-testimonials-grid, .nw-dessert-row, .nw-sharing-grid, .nw-menu-starters, .nw-ambience-features, .nw-chef-credentials'
    );
    staggerContainers.forEach((container) => {
      const children = $$(':scope > *', container) as HTMLElement[];
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
        if (!child.classList.contains('nw-reveal')) {
          child.classList.add('nw-reveal');
          revealObserver.observe(child);
        }
      });
    });

    // 8. Parallax sections
    const parallaxImgs = $$(
      '.nw-story-img, .nw-chef-img-main img, .nw-main-hero-img'
    ) as HTMLElement[];

    const updateParallax = () => {
      parallaxImgs.forEach((img) => {
        const parent = img.closest('div');
        const rect = parent ? parent.getBoundingClientRect() : img.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const center = rect.top + rect.height / 2;
          const offset = ((center - window.innerHeight / 2) / window.innerHeight) * 30;
          img.style.transform = `translateY(${offset}px) scale(1.04)`;
        }
      });
    };

    window.addEventListener('scroll', updateParallax, { passive: true });

    // 9. Glass cards float
    const glassCards = $$('.nw-glass-card') as HTMLElement[];
    let floatFrame: number;
    const floatCards = (timestamp: number) => {
      glassCards.forEach((card, i) => {
        const offset = Math.sin((timestamp / 1000 + i * 1.5) * 0.5) * 5;
        card.style.transform = `translateY(${offset}px)`;
      });
      floatFrame = requestAnimationFrame(floatCards);
    };
    if (glassCards.length > 0) floatFrame = requestAnimationFrame(floatCards);

    // 10. Card 3D tilt on hover
    const tiltCards = $$('.nw-starter-card, .nw-sharing-card, .nw-testimonial-card') as HTMLElement[];
    const tiltHandlers: Array<[Element, string, EventListener]> = [];

    tiltCards.forEach((card) => {
      const moveHandler: EventListener = (e) => {
        const me = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const cx = (me.clientX - rect.left) / rect.width - 0.5;
        const cy = (me.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${cx * 4}deg) rotateX(${-cy * 4}deg) translateY(-6px)`;
      };
      const leaveHandler: EventListener = () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      };
      card.addEventListener('mousemove', moveHandler);
      card.addEventListener('mouseleave', leaveHandler);
      tiltHandlers.push([card, 'mousemove', moveHandler], [card, 'mouseleave', leaveHandler]);
    });

    // 11. Dessert hover
    const dessertCards = $$('.nw-dessert-card') as HTMLElement[];
    const dessertHandlers: Array<[Element, string, EventListener]> = [];
    dessertCards.forEach((card) => {
      const enterH: EventListener = () => {
        const img = card.querySelector('.nw-dessert-img') as HTMLElement | null;
        if (img) img.style.transform = 'scale(1.06)';
      };
      const leaveH: EventListener = () => {
        const img = card.querySelector('.nw-dessert-img') as HTMLElement | null;
        if (img) img.style.transform = '';
      };
      card.addEventListener('mouseenter', enterH);
      card.addEventListener('mouseleave', leaveH);
      dessertHandlers.push([card, 'mouseenter', enterH], [card, 'mouseleave', leaveH]);
    });

    // 12. Counter animation
    const counterEl = $('.nw-chef-stat') as HTMLElement | null;
    let counterObserver: IntersectionObserver | null = null;
    if (counterEl) {
      const animateCounter = (el: HTMLElement, target: number, duration = 1800) => {
        let start: number | null = null;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + '+';
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(counterEl, 10);
              counterObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counterObserver.observe(counterEl);
    }

    // 13. Lazy image fade in
    ($$('img[src]') as HTMLImageElement[]).forEach((img) => {
      if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        const loadH = () => { img.style.opacity = '1'; };
        const errH = () => { img.style.opacity = '0.3'; };
        img.addEventListener('load', loadH);
        img.addEventListener('error', errH);
      }
    });

    // 14. Footer smooth scroll
    const footerLinks = $$('.nw-footer-links a, .nw-footer-contact a') as HTMLAnchorElement[];
    const footerHandlers: Array<[Element, EventListener]> = [];
    footerLinks.forEach((link) => {
      const handler: EventListener = (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScrollTo(href.slice(1));
        }
      };
      link.addEventListener('click', handler);
      footerHandlers.push([link, handler]);
    });

    // Console greeting
    console.log(
      '%cNeighbourwood Restaurant\n%c✦ Michelin Bib Gourmand 2025 · Bukit Mertajam, Penang',
      'font-family: Georgia, serif; font-size: 18px; font-weight: bold; color: #A0784A;',
      'font-family: sans-serif; font-size: 11px; color: #8C816E; letter-spacing: 0.1em;'
    );

    // CLEANUP
    return () => {
      document.removeEventListener('mousemove', onMouseMove as EventListener);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', updateParallax);
      revealObserver.disconnect();
      counterObserver?.disconnect();
      cancelAnimationFrame(floatFrame);
      navClickHandlers.forEach(([el, h]) => el.removeEventListener('click', h));
      if (hamburger && hamburgerHandler) hamburger.removeEventListener('click', hamburgerHandler);
      tiltHandlers.forEach(([el, ev, h]) => el.removeEventListener(ev, h));
      dessertHandlers.forEach(([el, ev, h]) => el.removeEventListener(ev, h));
      footerHandlers.forEach(([el, h]) => el.removeEventListener('click', h));
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* ── NAVIGATION ── */}
      <header className="nw-header" id="nw-header">
        <nav className="nw-nav" id="nw-nav">
          <div className="nw-nav-logo">
            <a href="#home" className="nw-logo-badge">
              <span className="nw-logo-n">N</span>
            </a>
          </div>
          <ul className="nw-nav-links" id="nw-nav-links">
            <li><a href="#home" className="nw-nav-link active" data-section="home">Home</a></li>
            <li><a href="#story" className="nw-nav-link" data-section="story">Our Story</a></li>
            <li><a href="#menu" className="nw-nav-link" data-section="menu">Menu</a></li>
            <li><a href="#experience" className="nw-nav-link" data-section="experience">Experience</a></li>
            <li><a href="#visit" className="nw-nav-link" data-section="visit">Visit</a></li>
          </ul>
          <a href="tel:+60129030862" className="nw-nav-reserve">Reserve</a>
          <button className="nw-hamburger" id="nw-hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </nav>
        <div className="nw-mobile-menu" id="nw-mobile-menu">
          <ul>
            <li><a href="#home" className="nw-mobile-link">Home</a></li>
            <li><a href="#story" className="nw-mobile-link">Our Story</a></li>
            <li><a href="#menu" className="nw-mobile-link">Menu</a></li>
            <li><a href="#experience" className="nw-mobile-link">Experience</a></li>
            <li><a href="#visit" className="nw-mobile-link">Visit</a></li>
          </ul>
          <a href="tel:+60129030862" className="nw-mobile-reserve">+60 12-903 0862</a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="nw-hero" id="home">
        <div className="nw-hero-bg">
          <img
            src="https://images.pexels.com/photos/36177701/pexels-photo-36177701.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920"
            alt="Neighbourwood Restaurant elegant interior"
            className="nw-hero-img"
            id="nw-hero-img"
          />
          <div className="nw-hero-overlay"></div>
          <div className="nw-hero-glow nw-hero-glow-1"></div>
          <div className="nw-hero-glow nw-hero-glow-2"></div>
        </div>

        <div className="nw-hero-content" id="nw-hero-content">
          <div className="nw-hero-eyebrow">
            <span className="nw-eyebrow-line"></span>
            <span>Michelin Bib Gourmand 2023 · 2024 · 2025</span>
            <span className="nw-eyebrow-line"></span>
          </div>
          <h1 className="nw-hero-title">
            <span className="nw-hero-title-sm">Where the</span>
            <span className="nw-hero-title-lg">Neighbourhood</span>
            <span className="nw-hero-title-italic">Gathers</span>
          </h1>
          <p className="nw-hero-sub">
            European contemporary cuisine with an Asian soul.<br />
            Crafted over charcoal. Shared at the table.
          </p>
          <div className="nw-hero-ctas">
            <a href="#menu" className="nw-btn-primary">Explore the Menu</a>
            <a href="#visit" className="nw-btn-ghost">Make a Reservation</a>
          </div>
        </div>

        {/* Floating Glass Cards */}
        <div className="nw-hero-cards">
          <div className="nw-glass-card nw-glass-card-1">
            <div className="nw-glass-icon">⊙</div>
            <div>
              <div className="nw-glass-label">Open Today</div>
              <div className="nw-glass-value">11:30 am – 10:30 pm</div>
            </div>
          </div>
          <div className="nw-glass-card nw-glass-card-2">
            <div className="nw-glass-icon">◈</div>
            <div>
              <div className="nw-glass-label">Location</div>
              <div className="nw-glass-value">Bukit Mertajam, Penang</div>
            </div>
          </div>
          <div className="nw-glass-card nw-glass-card-3">
            <div className="nw-glass-icon">✦</div>
            <div>
              <div className="nw-glass-label">Recognition</div>
              <div className="nw-glass-value">Michelin Bib Gourmand</div>
            </div>
          </div>
        </div>

        <div className="nw-hero-scroll">
          <div className="nw-scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="nw-story" id="story">
        <div className="nw-story-pathway">
          <div className="nw-pathway-line"></div>
        </div>
        <div className="nw-story-inner">
          <div className="nw-story-visual">
            <div className="nw-story-img-frame nw-reveal">
              <img
                src="https://images.pexels.com/photos/6876621/pexels-photo-6876621.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
                alt="Neighbourwood dining room interior"
                className="nw-story-img"
              />
              <div className="nw-story-img-accent"></div>
            </div>
            <div className="nw-story-badge nw-reveal">
              <span className="nw-story-badge-year">Est.</span>
              <span className="nw-story-badge-num">2022</span>
              <span className="nw-story-badge-loc">Bukit Mertajam</span>
            </div>
          </div>

          <div className="nw-story-text nw-reveal">
            <div className="nw-section-eyebrow">
              <span className="nw-eyebrow-dot"></span>
              <span>The Story</span>
            </div>
            <h2 className="nw-section-title">
              A Neighbour's<br /><em>Welcome Table</em>
            </h2>
            <p className="nw-story-body">
              The owner lives just around the corner. He opened Neighbourwood for exactly that reason — to create a place where neighbours could sit down together over exceptional European food with familiar Asian warmth.
            </p>
            <p className="nw-story-body">
              Chef Sean Khaw, who honed his craft at two Michelin-starred restaurants in Singapore, returned home to Bukit Mertajam with a singular vision: fine-dining quality at a family-friendly table, where every dish tells a story bridging two continents.
            </p>
            <p className="nw-story-body">
              What began as a neighbourhood secret quickly earned its place in the <strong>Michelin Bib Gourmand 2023</strong> — and has proudly remained there every year since.
            </p>
            <div className="nw-story-pillars">
              <div className="nw-pillar">
                <span className="nw-pillar-icon">◉</span>
                <span className="nw-pillar-label">Live Charcoal Craft</span>
              </div>
              <div className="nw-pillar">
                <span className="nw-pillar-icon">◉</span>
                <span className="nw-pillar-label">Seasonal Menus</span>
              </div>
              <div className="nw-pillar">
                <span className="nw-pillar-icon">◉</span>
                <span className="nw-pillar-label">Artisan Sourdough</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MICHELIN TICKER ── */}
      <div className="nw-michelin-banner">
        <div className="nw-michelin-track">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="nw-michelin-item">
              ✦ Michelin Bib Gourmand &nbsp;·&nbsp; Penang, Malaysia &nbsp;·&nbsp; European Contemporary &nbsp;·&nbsp; Bukit Mertajam's Gem &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── MENU ── */}
      <section className="nw-menu" id="menu">
        <div className="nw-menu-header nw-reveal">
          <div className="nw-section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="nw-eyebrow-dot"></span>
            <span>The Kitchen</span>
          </div>
          <h2 className="nw-section-title">
            Signature<br /><em>Plates & Palates</em>
          </h2>
          <p className="nw-menu-intro">
            Our menu evolves every six weeks to honour the seasons. Three beloved plates remain always — for those who return.
          </p>
        </div>

        <div className="nw-menu-grid">

          {/* Small Plates Feature */}
          <div className="nw-menu-category nw-reveal">
            <div className="nw-category-label">Small Plates & Starters</div>
            <div className="nw-menu-panel nw-panel-featured">
              <div className="nw-panel-img-wrap">
                <img
                  src="https://images.pexels.com/photos/30890566/pexels-photo-30890566.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
                  alt="Artisan sourdough bread"
                  className="nw-panel-img"
                />
              </div>
              <div className="nw-panel-body">
                <div className="nw-panel-tag">Daily Ritual</div>
                <h3 className="nw-panel-title">Artisan Sourdough & Butter</h3>
                <p className="nw-panel-desc">
                  House-baked daily with a wild yeast culture. Crusty, open-crumbed sourdough — the ritual that opens every meal. Take a loaf home as you leave.
                </p>
                <div className="nw-panel-price">RM 10</div>
              </div>
            </div>
          </div>

          {/* Starter Cards */}
          <div className="nw-menu-starters nw-reveal">
            <div className="nw-starter-card">
              <div className="nw-starter-img-wrap">
                <img
                  src="https://images.pexels.com/photos/29450125/pexels-photo-29450125.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                  alt="Berkshire Pork Belly"
                  className="nw-starter-img"
                />
              </div>
              <div className="nw-starter-body">
                <div className="nw-starter-tag">★ Guest Favourite</div>
                <h4 className="nw-starter-title">Berkshire Pork Belly</h4>
                <p className="nw-starter-desc">Charcoal-grilled to a crackling crisp edge, juicy within. Apple mustard adds a sweet-tangy contrast that cuts through the richness. Absolutely divine.</p>
                <span className="nw-starter-price">RM 39</span>
              </div>
            </div>
            <div className="nw-starter-card">
              <div className="nw-starter-img-wrap">
                <img
                  src="https://images.pexels.com/photos/18345081/pexels-photo-18345081.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                  alt="Anchovy Flatbread"
                  className="nw-starter-img"
                />
              </div>
              <div className="nw-starter-body">
                <h4 className="nw-starter-title">Anchovy Flatbread</h4>
                <p className="nw-starter-desc">Crispy charcoal-grilled flatbread topped with anchovy cream, fresh scallions & tobiko. Light smoky aroma with a rich, savoury depth.</p>
                <span className="nw-starter-price">RM 26</span>
              </div>
            </div>
          </div>

          {/* Main Courses */}
          <div className="nw-menu-mains nw-reveal">
            <div className="nw-category-label nw-category-label-right">Main Courses</div>
            <div className="nw-main-hero">
              <img
                src="https://images.pexels.com/photos/5041500/pexels-photo-5041500.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200"
                alt="Tiger Prawn Spaghettini"
                className="nw-main-hero-img"
              />
              <div className="nw-main-hero-caption">
                <div className="nw-main-hero-tag">Always on the Menu</div>
                <h3 className="nw-main-hero-title">Tiger Prawn Spaghettini</h3>
                <p className="nw-main-hero-desc">
                  Al dente spaghettini enveloped in a deeply reduced crustacean broth, crowned with whole charcoal-grilled tiger prawns. Bold, smoky, and delicately seasoned. Our guests keep returning for this one.
                </p>
                <div className="nw-main-hero-price">RM 58</div>
              </div>
            </div>
          </div>

          {/* Sharing Plates */}
          <div className="nw-menu-sharing nw-reveal">
            <div className="nw-sharing-grid">
              <div className="nw-sharing-card">
                <img
                  src="https://images.pexels.com/photos/24186393/pexels-photo-24186393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700"
                  alt="Half Roast Chicken"
                  className="nw-sharing-img"
                />
                <div className="nw-sharing-body">
                  <div className="nw-sharing-tag">Always on the Menu</div>
                  <h4 className="nw-sharing-title">Half Roast Chicken Au Jus</h4>
                  <p className="nw-sharing-desc">Marinated with garlic miso, charcoal-kissed skin. Served with velvety pumpkin purée and a fragrant turmeric curry leaf jus that ties everything together.</p>
                  <span className="nw-sharing-price">RM 39</span>
                </div>
              </div>
              <div className="nw-sharing-card">
                <img
                  src="https://images.pexels.com/photos/31261504/pexels-photo-31261504.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700"
                  alt="Laksa Riso"
                  className="nw-sharing-img"
                />
                <div className="nw-sharing-body">
                  <div className="nw-sharing-tag">Seasonal Highlight</div>
                  <h4 className="nw-sharing-title">Laksa Riso</h4>
                  <p className="nw-sharing-desc">A creative interpretation of Penang's beloved laksa — reimagined with riso pasta and meaty tiger prawns. Rich, aromatic, and deeply comforting.</p>
                  <span className="nw-sharing-price">RM 59</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sweet Endings */}
          <div className="nw-menu-desserts nw-reveal">
            <div className="nw-category-label">Sweet Endings</div>
            <div className="nw-dessert-row">
              <div className="nw-dessert-card">
                <img
                  src="https://images.pexels.com/photos/16975182/pexels-photo-16975182.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500"
                  alt="Cinnamon Milk Tart"
                  className="nw-dessert-img"
                />
                <h4 className="nw-dessert-title">Cinnamon Milk Tart</h4>
                <p className="nw-dessert-desc">Buttery shell cradling a cloud-light custard, dusted with cinnamon. A Neighbourwood signature — nothing too fancy, everything exactly right.</p>
              </div>
              <div className="nw-dessert-card">
                <img
                  src="https://images.pexels.com/photos/23371794/pexels-photo-23371794.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500"
                  alt="Strawberry Sabayon"
                  className="nw-dessert-img"
                />
                <h4 className="nw-dessert-title">Strawberry Sabayon</h4>
                <p className="nw-dessert-desc">XiaoXing wine-infused sabayon with ripe fresh strawberries — a refined, elegant note to close every meal at Neighbourwood.</p>
              </div>
              <div className="nw-dessert-card">
                <img
                  src="https://images.pexels.com/photos/28869115/pexels-photo-28869115.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500"
                  alt="Citrus Madeleines"
                  className="nw-dessert-img"
                />
                <h4 className="nw-dessert-title">Citrus Madeleines</h4>
                <p className="nw-dessert-desc">Freshly baked, warm from the oven. Served with a generous dollop of chantilly cream. "It was just too good to describe in words."</p>
              </div>
            </div>
          </div>

        </div>

        <div className="nw-menu-note nw-reveal">
          <span className="nw-note-line"></span>
          <p>Our menu evolves every six weeks. Dishes shown may vary by season.<br />
            Ask our team for today's specials and recommended pairings.
          </p>
          <span className="nw-note-line"></span>
        </div>
      </section>

      {/* ── CHEF FEATURE ── */}
      <section className="nw-chef" id="experience">
        <div className="nw-chef-inner">
          <div className="nw-chef-visual">
            <div className="nw-chef-img-main nw-reveal">
              <img
                src="https://images.pexels.com/photos/38253262/pexels-photo-38253262.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700"
                alt="Chef at work in the kitchen"
              />
            </div>
            <div className="nw-chef-img-secondary nw-reveal">
              <img
                src="https://images.pexels.com/photos/17318176/pexels-photo-17318176.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700"
                alt="Neighbourwood open kitchen"
              />
            </div>
            <div className="nw-chef-float-card nw-reveal">
              <div className="nw-chef-stat">10</div>
              <div className="nw-chef-stat-label">Years of Culinary Craft</div>
            </div>
          </div>

          <div className="nw-chef-text nw-reveal">
            <div className="nw-section-eyebrow">
              <span className="nw-eyebrow-dot" style={{ background: 'var(--bronze-light)' }}></span>
              <span style={{ color: 'var(--bronze-light)' }}>The Craftsman</span>
            </div>
            <h2 className="nw-section-title nw-title-light">
              Chef Sean<br /><em>Khaw</em>
            </h2>
            <p className="nw-chef-body">
              Trained under the discipline of two Michelin-starred kitchens in Singapore, Chef Sean carries that rigour back to the place he calls home. His philosophy is simple: cook with pure passion, season with honesty, and let great ingredients speak for themselves.
            </p>
            <p className="nw-chef-body">
              The theatre-style open kitchen lets you watch every flame, every fold, every careful plating. Dining here isn't just eating — it is witnessing a craft being practised with ten years of devotion.
            </p>
            <blockquote className="nw-chef-quote">
              "Every dish is a conversation between two worlds — the Europe I studied in, and the Malaysia I love."
              <cite>— Chef Sean Khaw, Neighbourwood</cite>
            </blockquote>
            <div className="nw-chef-credentials">
              <div className="nw-credential">
                <span className="nw-credential-label">Background</span>
                <span className="nw-credential-value">2× Michelin-starred kitchens, Singapore</span>
              </div>
              <div className="nw-credential">
                <span className="nw-credential-label">Cuisine Style</span>
                <span className="nw-credential-value">European Contemporary × Asian Influence</span>
              </div>
              <div className="nw-credential">
                <span className="nw-credential-label">Signature</span>
                <span className="nw-credential-value">Live Charcoal Grilling, Seasonal Menus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATMOSPHERE ── */}
      <section className="nw-ambience">
        <div className="nw-ambience-inner">
          <div className="nw-ambience-left nw-reveal">
            <div className="nw-section-eyebrow">
              <span className="nw-eyebrow-dot"></span>
              <span>The Atmosphere</span>
            </div>
            <h2 className="nw-section-title">
              Minimalist.<br /><em>Warm. Alive.</em>
            </h2>
            <p className="nw-ambience-body">
              Step past the shophouse façade on Jalan Kulim and find yourself in a space that feels genuinely considered — warm tones, soft pendant lighting, and an open kitchen theatre that fills the room with the aromas of charcoal and citrus.
            </p>
            <p className="nw-ambience-body">
              Every table is set for sharing. The menu is designed for conversation. Neighbourwood is not a place for a hurried meal — it is a place to linger, reconnect, and celebrate the ordinary joy of a good meal among good company.
            </p>
            <div className="nw-ambience-features">
              <div className="nw-feature">
                <span className="nw-feature-icon">◈</span>
                <div>
                  <strong>Open Kitchen Theatre</strong>
                  <p>Watch every dish crafted live over charcoal flame — the sights, sounds, and aromas become part of the experience</p>
                </div>
              </div>
              <div className="nw-feature">
                <span className="nw-feature-icon">◈</span>
                <div>
                  <strong>Big Plates for Sharing</strong>
                  <p>Designed to explore together — small bites, large plates, and everything in between</p>
                </div>
              </div>
              <div className="nw-feature">
                <span className="nw-feature-icon">◈</span>
                <div>
                  <strong>Take-Home Artisan Sourdough</strong>
                  <p>Every loaf baked in-house daily — available to take home as a piece of Neighbourwood</p>
                </div>
              </div>
            </div>
          </div>

          <div className="nw-ambience-right nw-reveal">
            <div className="nw-ambience-gallery">
              <div className="nw-ambience-img nw-ambience-img-tall">
                <img
                  src="https://images.pexels.com/photos/37968303/pexels-photo-37968303.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600"
                  alt="Fine dining table setting at Neighbourwood"
                />
              </div>
              <div className="nw-ambience-img nw-ambience-img-short">
                <img
                  src="https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                  alt="Romantic dinner table setting"
                />
              </div>
              <div className="nw-ambience-img nw-ambience-img-short">
                <img
                  src="https://images.pexels.com/photos/32523798/pexels-photo-32523798.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600"
                  alt="Neighbourwood interior atmosphere"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="nw-testimonials">
        <div className="nw-testimonials-header nw-reveal">
          <div className="nw-section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="nw-eyebrow-dot" style={{ background: 'var(--bronze-light)' }}></span>
            <span style={{ color: 'var(--bronze-light)' }}>Voices from the Table</span>
          </div>
          <h2 className="nw-section-title" style={{ color: 'var(--stone)' }}>
            What Our<br /><em style={{ color: 'var(--bronze-light)' }}>Guests Say</em>
          </h2>
        </div>

        <div className="nw-testimonials-grid">
          <div className="nw-testimonial-card nw-testimonial-large nw-reveal">
            <div className="nw-testimonial-stars">★★★★★</div>
            <blockquote className="nw-testimonial-text">
              "Fine-dining quality meals with a family-friendly atmosphere. The entire vibe of the restaurant, and the attention given by floor staff — it makes the whole dining experience genuinely pleasurable. The standard of food is consistently high, every single visit."
            </blockquote>
            <div className="nw-testimonial-author">
              <div className="nw-author-initial">C</div>
              <div>
                <strong>Chatarina S.</strong>
                <span>Regular Guest</span>
              </div>
            </div>
          </div>
          <div className="nw-testimonial-card nw-reveal">
            <div className="nw-testimonial-stars">★★★★★</div>
            <blockquote className="nw-testimonial-text">
              "The allspice chicken — properly marinated, crispy torched skin with a hint of nutmeg. Tiger prawn pasta was bold and beautifully seasoned. What I love is the balance: experimental mains, simple and perfect desserts."
            </blockquote>
            <div className="nw-testimonial-author">
              <div className="nw-author-initial">A</div>
              <div>
                <strong>Awan H.</strong>
                <span>Food Enthusiast</span>
              </div>
            </div>
          </div>
          <div className="nw-testimonial-card nw-reveal">
            <div className="nw-testimonial-stars">★★★★★</div>
            <blockquote className="nw-testimonial-text">
              "A hidden gem on the mainland of Penang. The Berkshire Pork Belly is an absolute must-try. Crispy edges, juicy interior, addictive smoky aroma. The apple mustard balance is absolutely divine!"
            </blockquote>
            <div className="nw-testimonial-author">
              <div className="nw-author-initial">D</div>
              <div>
                <strong>Desy N.</strong>
                <span>Food Explorer</span>
              </div>
            </div>
          </div>
          <div className="nw-testimonial-card nw-reveal">
            <div className="nw-testimonial-stars">★★★★☆</div>
            <blockquote className="nw-testimonial-text">
              "Excellent birthday experience. The attentiveness of the service was exceptional. Cozy atmosphere, focused on charcoal and roasting. Highly recommended for special occasions. The pricing is reasonable for the quality served."
            </blockquote>
            <div className="nw-testimonial-author">
              <div className="nw-author-initial">S</div>
              <div>
                <strong>Shruti</strong>
                <span>Birthday Guest</span>
              </div>
            </div>
          </div>
          <div className="nw-testimonial-card nw-reveal">
            <div className="nw-testimonial-stars">★★★★★</div>
            <blockquote className="nw-testimonial-text">
              "The interior is minimalist and classy — strong cozy-premium vibes. Ask the staff for recommendations on what to order; they'll guide your group perfectly. Budget RM100+ per person — it is absolutely worth it."
            </blockquote>
            <div className="nw-testimonial-author">
              <div className="nw-author-initial">L</div>
              <div>
                <strong>Lawrence K.</strong>
                <span>Diner</span>
              </div>
            </div>
          </div>
        </div>

        <div className="nw-michelin-feature nw-reveal">
          <div className="nw-michelin-badge-wrap">
            <div className="nw-michelin-badge-icon">✦</div>
            <div className="nw-michelin-badge-text">
              <span className="nw-michelin-badge-title">Michelin Bib Gourmand 2025</span>
              <span className="nw-michelin-badge-sub">Penang, Malaysia · European Contemporary</span>
              <p>"Friendly establishment that serves good food at reasonable prices."</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISIT / MAP ── */}
      <section className="nw-visit" id="visit">
        <div className="nw-visit-inner">
          <div className="nw-visit-info nw-reveal">
            <div className="nw-section-eyebrow">
              <span className="nw-eyebrow-dot nw-eyebrow-dot-light"></span>
              <span style={{ color: 'var(--bronze-light)' }}>Come Find Us</span>
            </div>
            <h2 className="nw-section-title nw-title-light">
              Join Us at<br /><em>The Table</em>
            </h2>

            <div className="nw-visit-details">
              <div className="nw-visit-detail-group">
                <div className="nw-visit-detail-icon">◎</div>
                <div>
                  <div className="nw-visit-detail-label">Address</div>
                  <div className="nw-visit-detail-value">
                    3427, Jalan Kulim, Taman Bukit Mas<br />
                    14000 Bukit Mertajam, Penang, Malaysia
                  </div>
                  <a
                    href="https://share.google/Fa0raolAtnQW6zbML"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nw-visit-map-link"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="nw-visit-detail-group">
                <div className="nw-visit-detail-icon">◷</div>
                <div>
                  <div className="nw-visit-detail-label">Opening Hours</div>
                  <div className="nw-hours-grid">
                    <div className="nw-hours-row">
                      <span className="nw-hours-day">Monday</span>
                      <span className="nw-hours-time">11:30 am – 3 pm &amp; 6 pm – 10:30 pm</span>
                    </div>
                    <div className="nw-hours-row nw-hours-closed">
                      <span className="nw-hours-day">Tuesday</span>
                      <span className="nw-hours-time nw-closed">Closed</span>
                    </div>
                    <div className="nw-hours-row nw-hours-closed">
                      <span className="nw-hours-day">Wednesday</span>
                      <span className="nw-hours-time nw-closed">Closed</span>
                    </div>
                    <div className="nw-hours-row">
                      <span className="nw-hours-day">Thu – Sun</span>
                      <span className="nw-hours-time">11:30 am – 3 pm &amp; 6 pm – 10:30 pm</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="nw-visit-detail-group">
                <div className="nw-visit-detail-icon">◁</div>
                <div>
                  <div className="nw-visit-detail-label">Reservations</div>
                  <div className="nw-visit-detail-value">
                    Early booking strongly recommended,<br />
                    especially for groups and weekends.
                  </div>
                  <a href="tel:+60129030862" className="nw-visit-phone">+60 12-903 0862</a>
                </div>
              </div>
            </div>

            <div className="nw-reserve-cta">
              <a href="tel:+60129030862" className="nw-btn-primary nw-btn-light">Call to Reserve</a>
              <a
                href="https://share.google/Fa0raolAtnQW6zbML"
                target="_blank"
                rel="noopener noreferrer"
                className="nw-btn-ghost nw-btn-ghost-light"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="nw-visit-map nw-reveal">
            <div className="nw-map-frame">
              <iframe
                title="Neighbourwood Restaurant — 3427 Jalan Kulim, Bukit Mertajam"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1233905578!2d100.47369197499999!3d5.3520267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304acb65a1f3bced%3A0x51c9c028c5dce93f!2sNeighbourwood!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="nw-map-overlay-card">
                <div className="nw-map-card-badge">✦</div>
                <div className="nw-map-card-name">Neighbourwood</div>
                <div className="nw-map-card-addr">3427 Jalan Kulim, Bukit Mertajam, Penang</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="nw-footer">
        <div className="nw-footer-inner">
          <div className="nw-footer-top">
            <div className="nw-footer-brand">
              <div className="nw-footer-logo">N</div>
              <div className="nw-footer-brand-text">
                <span className="nw-footer-name">Neighbourwood</span>
                <span className="nw-footer-tagline">Bukit Mertajam, Penang</span>
              </div>
            </div>
            <div className="nw-footer-links">
              <a href="#home">Home</a>
              <a href="#story">Our Story</a>
              <a href="#menu">Menu</a>
              <a href="#experience">Experience</a>
              <a href="#visit">Visit</a>
            </div>
            <div className="nw-footer-contact">
              <a href="tel:+60129030862">+60 12-903 0862</a>
              <a href="https://share.google/Fa0raolAtnQW6zbML" target="_blank" rel="noopener noreferrer">
                3427 Jalan Kulim, Bukit Mertajam
              </a>
            </div>
          </div>
          <div className="nw-footer-bottom">
            <span>© 2025 Neighbourwood Restaurant. All rights reserved.</span>
            <span className="nw-footer-michelin">✦ Michelin Bib Gourmand 2025</span>
          </div>
        </div>
      </footer>
    </>
  );
}
