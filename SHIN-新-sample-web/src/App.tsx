import { useEffect } from 'react';
import './style.css';

export default function App() {
  useEffect(() => {
    // ─── Loader ───────────────────────────────────────────
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 1800);
    }

    // ─── Custom Cursor ────────────────────────────────────
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const glow = document.getElementById('mouse-glow');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    function moveCursor(e: MouseEvent) {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dot) { dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px'; }
      if (glow) { glow.style.left = mouseX + 'px'; glow.style.top = mouseY + 'px'; }
    }

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
      requestAnimationFrame(animateRing);
    }

    document.addEventListener('mousemove', moveCursor);
    animateRing();

    const hoverEls = document.querySelectorAll('a, button');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot?.classList.add('cursor-hover');
        ring?.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot?.classList.remove('cursor-hover');
        ring?.classList.remove('cursor-hover');
      });
    });

    // ─── Navigation ──────────────────────────────────────
    const nav = document.getElementById('main-nav');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const progressBar = document.getElementById('progress-bar');

    function onScroll() {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      // nav scroll
      if (nav) nav.classList.toggle('scrolled', scrollY > 60);
      // progress bar
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrollY / docH})`;
      }
      // back to top
      const btt = document.getElementById('back-to-top');
      if (btt) btt.classList.toggle('visible', scrollY > 400);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu?.classList.toggle('open');
      document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // ─── Hero Animation ──────────────────────────────────
    const hero = document.getElementById('hero');
    const heroBgImg = document.getElementById('hero-bg-img') as HTMLImageElement | null;

    setTimeout(() => hero?.classList.add('animated'), 300);
    if (heroBgImg) {
      if (heroBgImg.complete) heroBgImg.classList.add('loaded');
      else heroBgImg.addEventListener('load', () => heroBgImg.classList.add('loaded'));
    }

    // ─── Intersection Observer (Reveal) ──────────────────
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // ─── Parallax Hero BG ────────────────────────────────
    function parallaxHero() {
      const scrollY = window.scrollY;
      if (heroBgImg && scrollY < window.innerHeight) {
        heroBgImg.style.transform = `scale(1.0) translateY(${scrollY * 0.25}px)`;
      }
    }
    window.addEventListener('scroll', parallaxHero, { passive: true });

    // ─── Menu Tabs ────────────────────────────────────────
    const tabs = document.querySelectorAll('.menu-tab');
    const panels = document.querySelectorAll('.menu-panel');
    const menuImages: Record<string, string> = {
      steak: 'https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720',
      seafood: 'https://images.pexels.com/photos/18675119/pexels-photo-18675119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720',
      pasta: 'https://images.pexels.com/photos/24289217/pexels-photo-24289217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720',
      desserts: 'https://images.pexels.com/photos/35622247/pexels-photo-35622247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720',
      beverages: 'https://images.pexels.com/photos/37662780/pexels-photo-37662780.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720',
    };
    const menuCaptions: Record<string, { title: string; sub: string }> = {
      steak: { title: 'Prime Cuts', sub: 'Signature Selection' },
      seafood: { title: 'Ocean Harvest', sub: 'Fresh Daily' },
      pasta: { title: 'Handcrafted Pasta', sub: "Chef's Artistry" },
      desserts: { title: 'Sweet Finales', sub: 'Pastry Collection' },
      beverages: { title: 'Curated Libations', sub: 'Cellar & Bar' },
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = (tab as HTMLElement).dataset.tab || '';
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach(p => p.classList.remove('active'));
        const panel = document.getElementById(`panel-${cat}`);
        panel?.classList.add('active');
        // Update image
        const img = document.getElementById('menu-feature-img') as HTMLImageElement | null;
        const captTitle = document.getElementById('menu-cap-title');
        const captSub = document.getElementById('menu-cap-sub');
        if (img) {
          img.style.opacity = '0';
          img.style.transform = 'scale(1.05)';
          setTimeout(() => {
            img.src = menuImages[cat] || menuImages['steak'];
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            img.style.transition = 'opacity 0.6s ease, transform 0.8s ease';
          }, 250);
        }
        if (captTitle && menuCaptions[cat]) captTitle.textContent = menuCaptions[cat].title;
        if (captSub && menuCaptions[cat]) captSub.textContent = menuCaptions[cat].sub;
      });
    });

    // ─── Reservation Form ─────────────────────────────────
    const form = document.getElementById('reservation-form') as HTMLFormElement | null;
    const formSuccess = document.getElementById('form-success');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';
      form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      setTimeout(() => {
        form.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('show');
        }
      }, 400);
    });

    // ─── Back to Top ─────────────────────────────────────
    document.getElementById('back-to-top')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── Smooth anchor scroll ─────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href') || '';
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', parallaxHero);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── LOADER ── */}
      <div className="loader" id="loader">
        <div className="loader-logo">SHIN <span>新</span></div>
        <div className="loader-bar"></div>
        <div className="loader-text">Georgetown · Penang · Malaysia</div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="progress-bar" id="progress-bar"></div>

      {/* ── CURSOR ── */}
      <div className="cursor-dot" id="cursor-dot"></div>
      <div className="cursor-ring" id="cursor-ring"></div>
      <div className="mouse-glow" id="mouse-glow"></div>

      {/* ── BACK TO TOP ── */}
      <button className="back-to-top" id="back-to-top" aria-label="Back to top">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>

      {/* ────────────────────────────────────────────────────
          NAVIGATION
      ──────────────────────────────────────────────────── */}
      <nav className="nav" id="main-nav">
        <a href="#hero" className="nav-logo">
          <div className="nav-logo-primary">SHIN <span>新</span></div>
          <div className="nav-logo-secondary">at Citadines Connect Georgetown</div>
        </a>

        <ul className="nav-links">
          <li><a href="#philosophy">Story</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#location">Visit</a></li>
        </ul>

        <a href="#reservation" className="nav-reserve-btn">Reserve a Table</a>

        <button className="nav-hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className="nav-mobile-menu" id="mobile-menu">
        <a href="#philosophy">Our Story</a>
        <a href="#gallery">Gallery</a>
        <a href="#menu">Menu</a>
        <a href="#experience">Experience</a>
        <a href="#testimonials">Reviews</a>
        <a href="#location">Visit Us</a>
        <a href="#reservation" className="nav-mobile-reserve">Reserve a Table</a>
      </div>

      {/* ────────────────────────────────────────────────────
          HERO SECTION
      ──────────────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img
            id="hero-bg-img"
            src="https://images.pexels.com/photos/34723813/pexels-photo-34723813.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920"
            alt="SHIN 新 Restaurant Interior"
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-grain"></div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line"></div>
              <div className="hero-eyebrow-text">Contemporary Western Dining · Penang</div>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">
                <span className="hero-title-inner">Where</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-inner"><em>Craft</em> Meets</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-inner">Culture</span>
              </span>
            </h1>

            <p className="hero-subtitle">
              SHIN 新 is an à la carte contemporary Western restaurant nestled within Citadines Connect Georgetown — where artful cuisine, premium ingredients, and refined ambiance converge in the heart of George Town's UNESCO Heritage Zone.
            </p>

            <div className="hero-cta-group">
              <a href="#reservation" className="btn-primary">Reserve Your Table</a>
              <a href="#menu" className="btn-ghost">
                Explore Menu
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-info-card">
              <div className="hero-info-label">Open Daily</div>
              <div className="hero-info-value">7 AM — 10 PM</div>
            </div>
            <div className="hero-info-card">
              <div className="hero-info-label">Weekend High Tea</div>
              <div className="hero-info-value">Sat & Sun · 12:30–2:30 PM</div>
            </div>
            <div className="hero-info-card">
              <div className="hero-info-label">Location</div>
              <div className="hero-info-value">Lebuh Noordin, George Town</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-text">Scroll</div>
          <div className="hero-scroll-line"></div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          MARQUEE STRIP
      ──────────────────────────────────────────────────── */}
      <div className="big-text-strip">
        <div className="big-text-inner">
          {[1,2].map(n => (
            <div className="big-text-item" key={n}>
              {['Contemporary Western', 'Halal Certified', 'À La Carte', 'Weekend High Tea', 'Fine Dining', 'George Town Heritage', 'Curated Experience'].map((word, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
                  <span className="big-text-word">{word}</span>
                  <span className="big-text-dot"></span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          PHILOSOPHY SECTION
      ──────────────────────────────────────────────────── */}
      <section className="philosophy" id="philosophy">
        <div className="philosophy-inner">
          <div className="philosophy-left reveal">
            <div className="philosophy-number">新</div>
          </div>
          <div className="philosophy-right">
            <div className="section-label reveal">Our Philosophy</div>
            <h2 className="philosophy-heading reveal reveal-delay-1">
              A New Chapter in<br /><em>Georgetown Dining</em>
            </h2>
            <p className="philosophy-body reveal reveal-delay-2">
              The name SHIN 新 — the Chinese character for "new" — is more than a word. It is a declaration. Positioned within the boutique elegance of Citadines Connect Georgetown, SHIN 新 was conceived as a destination where contemporary Western techniques are honoured with the same reverence as the heritage streets that surround it.
            </p>
            <p className="philosophy-body reveal reveal-delay-2" style={{ marginTop: '-8px' }}>
              Every dish is a dialogue between precision and passion. From hand-selected prime cuts to the freshest seafood from Malaysian waters, our kitchen crafts each plate as though it were a work of art — restrained where it counts, expressive where it matters. Halal-certified and open to all, SHIN 新 welcomes guests seeking a refined escape from the everyday.
            </p>
            <div className="philosophy-pills reveal reveal-delay-3">
              <span className="pill">Halal Certified</span>
              <span className="pill">À La Carte</span>
              <span className="pill">Western &amp; Fusion</span>
              <span className="pill">Weekend Buffet</span>
              <span className="pill">Hotel Dining</span>
              <span className="pill">Walk-In Welcome</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          GALLERY SECTION
      ──────────────────────────────────────────────────── */}
      <section className="gallery-parallax" id="gallery">
        <div className="gallery-header">
          <div>
            <div className="section-label reveal">The Experience</div>
            <h2 className="gallery-heading reveal reveal-delay-1">
              An Atmosphere<br />Unlike Any Other
            </h2>
          </div>
          <p className="gallery-subtitle reveal reveal-delay-2">
            Modern interiors, warm amber lighting, and the quiet sophistication of a boutique hotel setting — every visit to SHIN 新 is a sensory composition.
          </p>
        </div>

        <div className="gallery-panels">
          <div className="gallery-panel reveal">
            <img
              src="https://images.pexels.com/photos/8856580/pexels-photo-8856580.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700"
              alt="Elegant dining setting at SHIN 新"
              loading="lazy"
            />
            <div className="gallery-panel-overlay"></div>
            <div className="gallery-panel-label">Dining Room</div>
          </div>
          <div className="gallery-panel reveal reveal-delay-1">
            <img
              src="https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
              alt="Prime steak at SHIN 新"
              loading="lazy"
            />
            <div className="gallery-panel-overlay"></div>
            <div className="gallery-panel-label">Signature Steak</div>
          </div>
          <div className="gallery-panel reveal reveal-delay-2">
            <img
              src="https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500"
              alt="Curated wine selection at SHIN 新"
              loading="lazy"
            />
            <div className="gallery-panel-overlay"></div>
            <div className="gallery-panel-label">Curated Cellar</div>
          </div>
          <div className="gallery-panel reveal reveal-delay-1">
            <img
              src="https://images.pexels.com/photos/8856555/pexels-photo-8856555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=420&w=500"
              alt="Table setting at SHIN 新"
              loading="lazy"
            />
            <div className="gallery-panel-overlay"></div>
            <div className="gallery-panel-label">Private Setting</div>
          </div>
          <div className="gallery-panel reveal reveal-delay-3">
            <img
              src="https://images.pexels.com/photos/18675119/pexels-photo-18675119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=360&w=500"
              alt="Seafood at SHIN 新"
              loading="lazy"
            />
            <div className="gallery-panel-overlay"></div>
            <div className="gallery-panel-label">Ocean Harvest</div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          MENU SECTION
      ──────────────────────────────────────────────────── */}
      <section className="menu-section" id="menu">
        <div className="menu-header">
          <div>
            <div className="section-label reveal">The Menu</div>
            <h2 className="menu-heading reveal reveal-delay-1">
              A Curated<br /><em>Collection</em>
            </h2>
          </div>
          <p className="menu-intro reveal reveal-delay-2">
            Each dish at SHIN 新 is a considered expression — sourced with intention, prepared with discipline, and presented with a quiet confidence that speaks louder than excess.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="menu-tabs">
          {[
            { id: 'steak', label: 'Prime Steaks' },
            { id: 'seafood', label: 'Seafood' },
            { id: 'pasta', label: 'Pasta & Mains' },
            { id: 'desserts', label: 'Desserts' },
            { id: 'beverages', label: 'Beverages' },
          ].map((tab, i) => (
            <button
              key={tab.id}
              className={`menu-tab ${i === 0 ? 'active' : ''}`}
              data-tab={tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Split Menu Layout */}
        <div className="menu-split">
          {/* Menu panels container - col 1 */}
          <div className="menu-panels-wrapper">
          {/* Steak Panel */}
          <div className="menu-panel active" id="panel-steak">
            <div className="menu-items-col">
              {[
                { name: 'Ribeye 300g', price: 'From RM 88', desc: 'Grain-fed Australian ribeye, grilled to order, served with seasonal vegetables, roasted garlic, and your choice of sauce — peppercorn, mushroom, or béarnaise.', tag: 'Chef\'s Pick' },
                { name: 'Striploin 250g', price: 'From RM 78', desc: 'Tender New York striploin with a refined char, accompanied by truffle-infused mashed potato and wilted spinach.' },
                { name: 'Wagyu Burger', price: 'From RM 42', desc: 'House-ground wagyu patty, aged cheddar, caramelized onion jam, brioche bun, and house-cut fries.' },
                { name: 'Lamb Rack', price: 'From RM 68', desc: 'Herb-crusted French-trimmed lamb rack, roasted to a blush, served with rosemary jus and ratatouille.' },
                { name: 'Mixed Grill Platter', price: 'From RM 118', desc: 'A generous selection of grilled meats — striploin, lamb cutlet, chicken thigh, and house sausage with two sides. For the adventurous.', tag: 'For Two' },
              ].map((item, i) => (
                <div className="menu-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="menu-item-header">
                    <span className="menu-item-name">{item.name}</span>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <div className="menu-item-desc">{item.desc}</div>
                  {item.tag && <div className="menu-item-tag">{item.tag}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Seafood Panel */}
          <div className="menu-panel" id="panel-seafood">
            <div className="menu-items-col">
              {[
                { name: 'Seafood Platter', price: 'From RM 98', desc: 'A theatrical arrangement of tiger prawns, sea scallops, fish fillet, and squid — grilled and served with garlic butter, citrus aioli, and herb oil.', tag: 'For Two' },
                { name: 'Pan-Seared Salmon', price: 'From RM 52', desc: 'Atlantic salmon fillet with crisp skin, lemon caper butter sauce, fennel slaw, and sautéed asparagus.' },
                { name: 'Grilled Tiger Prawns', price: 'From RM 56', desc: 'Whole Malaysian tiger prawns, split and chargrilled with garlic herb butter, served with warm crusty bread.' },
                { name: 'Sea Bass en Papillote', price: 'From RM 54', desc: 'Whole sea bass steamed in parchment with aromatic herbs, cherry tomatoes, and white wine, presented tableside.' },
                { name: 'Seafood Porridge', price: 'From RM 28', desc: 'A comforting congee elevated with fresh scallop, prawn, and fish, seasoned with ginger and spring onion. Available at breakfast.' },
              ].map((item, i) => (
                <div className="menu-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="menu-item-header">
                    <span className="menu-item-name">{item.name}</span>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <div className="menu-item-desc">{item.desc}</div>
                  {item.tag && <div className="menu-item-tag">{item.tag}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Pasta Panel */}
          <div className="menu-panel" id="panel-pasta">
            <div className="menu-items-col">
              {[
                { name: 'Seafood Pasta', price: 'From RM 38', desc: 'Al dente linguine tossed with tiger prawns, clams, and cherry tomatoes in a white wine, garlic, and fresh herb reduction.' },
                { name: 'Truffle Mushroom Pasta', price: 'From RM 34', desc: 'Pappardelle with wild mushroom medley, truffle oil, shaved Parmesan, and fresh thyme — earthy, rich, and deeply satisfying.' },
                { name: 'Braised Short Rib', price: 'From RM 58', desc: 'Slow-braised beef short rib served with creamy polenta, roasted root vegetables, and a glossy veal jus.' },
                { name: 'Chicken Supreme', price: 'From RM 44', desc: 'Airline chicken breast, pan-roasted to golden perfection, with tarragon cream sauce, haricot vert, and pomme purée.' },
                { name: 'Vegetarian Risotto', price: 'From RM 32', desc: 'Carnaroli risotto finished with roasted butternut squash, sage butter, toasted pumpkin seeds, and aged Parmesan.', tag: 'Vegetarian' },
              ].map((item, i) => (
                <div className="menu-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="menu-item-header">
                    <span className="menu-item-name">{item.name}</span>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <div className="menu-item-desc">{item.desc}</div>
                  {item.tag && <div className="menu-item-tag">{item.tag}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Desserts Panel */}
          <div className="menu-panel" id="panel-desserts">
            <div className="menu-items-col">
              {[
                { name: 'Chocolate Fondant', price: 'From RM 22', desc: 'Warm dark chocolate molten cake with a liquid heart, served with vanilla bean ice cream and almond tuile.' },
                { name: 'Crème Brûlée', price: 'From RM 18', desc: 'Classic French custard with a perfectly caramelized sugar crust, infused with vanilla and a whisper of pandan.' },
                { name: 'Layered Cheesecake', price: 'From RM 20', desc: 'New York-style baked cheesecake with mixed berry compote and a buttery digestive base.' },
                { name: 'Pavlova', price: 'From RM 19', desc: 'Light meringue shell, crisp on the outside and marshmallow within, topped with Chantilly cream and seasonal tropical fruits.' },
                { name: 'Chef\'s Dessert Tasting', price: 'From RM 36', desc: 'A curated trio of the kitchen\'s finest sweet creations — a perfect conclusion to your evening at SHIN 新.', tag: 'Seasonal' },
              ].map((item, i) => (
                <div className="menu-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="menu-item-header">
                    <span className="menu-item-name">{item.name}</span>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <div className="menu-item-desc">{item.desc}</div>
                  {item.tag && <div className="menu-item-tag">{item.tag}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Beverages Panel */}
          <div className="menu-panel" id="panel-beverages">
            <div className="menu-items-col">
              {[
                { name: 'Signature Mocktails', price: 'From RM 16', desc: 'Seasonal craft mocktails — from the citrus-forward Penang Sunrise to the floral and complex Rose Garden.' },
                { name: 'Specialty Coffee', price: 'From RM 12', desc: 'Single-origin espresso, cold brew, and pour-over selections. Our barista team sources locally from Penang roasters.' },
                { name: 'Artisan Teas', price: 'From RM 10', desc: 'Curated selection of premium loose-leaf teas including First Flush Darjeeling, Japanese Hojicha, and Moroccan Mint.' },
                { name: 'Freshly Squeezed Juices', price: 'From RM 14', desc: 'Daily pressed juices featuring local tropical fruits — watermelon, mango, starfruit, and seasonal specials.' },
                { name: 'Weekend High Tea Set', price: 'RM 65 per adult', desc: 'All-you-can-eat weekend buffet (Sat & Sun, 12:30–2:30 PM) featuring savory bites, pastries, and a curated tea selection. Children (6–12) RM 32.', tag: 'Weekend Only' },
              ].map((item, i) => (
                <div className="menu-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <div className="menu-item-header">
                    <span className="menu-item-name">{item.name}</span>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                  <div className="menu-item-desc">{item.desc}</div>
                  {item.tag && <div className="menu-item-tag">{item.tag}</div>}
                </div>
              ))}
            </div>
          </div>

          </div>{/* end menu-panels-wrapper */}

          {/* Shared image column */}
          <div className="menu-image-col reveal reveal-delay-2">
            <div className="menu-image-frame">
              <img
                id="menu-feature-img"
                src="https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720"
                alt="Featured dish at SHIN 新"
                loading="lazy"
                style={{ transition: 'opacity 0.6s ease, transform 0.8s ease' }}
              />
              <div className="menu-image-caption">
                <div className="menu-image-caption-text" id="menu-cap-title">Prime Cuts</div>
                <div className="menu-image-caption-sub" id="menu-cap-sub">Signature Selection</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          EXPERIENCE SECTION
      ──────────────────────────────────────────────────── */}
      <section className="experience" id="experience">
        <div className="experience-inner">
          <div className="section-label reveal">Why SHIN 新</div>
          <h2 className="menu-heading reveal reveal-delay-1" style={{ marginTop: '16px' }}>
            The SHIN 新<br /><em>Difference</em>
          </h2>

          <div className="experience-grid">
            {[
              {
                num: '01',
                icon: '🏛️',
                title: 'Heritage Location',
                body: 'Situated within the UNESCO World Heritage Zone of George Town, SHIN 新 occupies a setting that carries the weight of history and the lightness of contemporary design. Steps from Hin Bus Depot, Prangin Mall, and iconic street art.',
                detail: 'Lebuh Noordin, George Town',
                featured: true,
              },
              {
                num: '02',
                icon: '🌿',
                title: 'Halal Certified',
                body: 'Every dish on our menu carries full halal certification, ensuring that guests of all backgrounds can dine with complete confidence. Our kitchen operates to the highest standards of integrity and care.',
                detail: 'Fully Certified · All Occasions',
              },
              {
                num: '03',
                icon: '🍷',
                title: 'Weekend High Tea',
                body: 'Every Saturday and Sunday from 12:30 PM to 2:30 PM, the restaurant transforms into an all-you-can-eat high tea destination. A curated spread of Western and Asian pastries, finger sandwiches, and hot beverages.',
                detail: 'Sat & Sun · RM 65 per adult',
              },
              {
                num: '04',
                icon: '🍳',
                title: 'Breakfast to Dinner',
                body: 'Open daily from 7 AM to 10 PM, SHIN 新 serves guests at every hour — from a nourishing halal breakfast buffet featuring Nasi Lemak and continental selections, to an à la carte lunch and an intimate dinner service.',
                detail: 'Daily · 7 AM – 10 PM',
              },
              {
                num: '05',
                icon: '⭐',
                title: 'Warm Hospitality',
                body: 'Our team is the heart of SHIN 新. Known for attentive, genuine service, our staff — praised by guests for their friendliness and helpfulness — ensure that every visit exceeds expectation, whether you are a hotel guest or a walk-in.',
                detail: 'Walk-Ins Always Welcome',
              },
              {
                num: '06',
                icon: '🏨',
                title: 'Hotel Exclusivity',
                body: 'As the signature restaurant of Citadines Connect Georgetown Penang, SHIN 新 serves as a dining sanctuary for guests of the 143-room 4-star property. In-house guests enjoy direct access; all are welcome.',
                detail: 'Part of The Ascott Limited',
              },
            ].map((card, i) => (
              <div className={`exp-card reveal${card.featured ? ' featured' : ''}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="exp-card-inner">
                  <div>
                    <div className="exp-card-number">{card.num}</div>
                    <div className="exp-card-icon">{card.icon}</div>
                    <div className="exp-card-title">{card.title}</div>
                    <div className="exp-card-body">{card.body}</div>
                  </div>
                  <div className="exp-card-bottom">
                    <div className="exp-card-detail">{card.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          TESTIMONIALS
      ──────────────────────────────────────────────────── */}
      <section className="testimonials" id="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-header">
            <div>
              <div className="section-label reveal">Guest Voices</div>
              <h2 className="testimonials-heading reveal reveal-delay-1">
                What Our<br />Guests Say
              </h2>
            </div>
          </div>

          <div className="testimonials-grid">
            {[
              {
                quote: 'The food is delicious and the crew is wonderful — truly great service. The lunch menu was well-composed and everything was served with care. A restaurant that understands hospitality.',
                author: 'Musafah R.',
                date: 'October 2024',
                initials: 'MR',
                rating: 5,
              },
              {
                quote: 'I ordered à la carte and the food was very nice — simple, not overdone, just beautifully executed. Staff were incredibly friendly and easy to communicate with. Easy to find and walk-in friendly. Highly recommended.',
                author: 'Nick J.',
                date: 'October 2024',
                initials: 'NJ',
                rating: 4,
              },
              {
                quote: 'Delicious breakfast and excellent service from Sekar — very attentive throughout. Freshly poached eggs on buttery toast cooked to absolute perfection. Made our entire stay all the better. We will be recommending to friends and family.',
                author: 'Verified Guest',
                date: 'November 2024',
                initials: 'VG',
                rating: 5,
              },
            ].map((t, i) => (
              <div className="testimonial-card reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>
                <div className="testimonial-quote">{t.quote}</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.author}</div>
                    <div className="testimonial-date">{t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          LOCATION & HOURS
      ──────────────────────────────────────────────────── */}
      <section className="location-section" id="location">
        <div className="location-inner">
          <div className="location-info">
            <div className="section-label reveal">Find Us</div>
            <h2 className="location-heading reveal reveal-delay-1">
              In the Heart of<br />George Town
            </h2>

            <div className="hours-grid reveal reveal-delay-2">
              {[
                { day: 'Monday – Friday', time: '7 AM – 10 PM' },
                { day: 'Saturday – Sunday', time: '7 AM – 10 PM' },
              ].map((h, i) => (
                <span key={i} style={{ display: 'contents' }}>
                  <div className="hours-day">{h.day}</div>
                  <div className="hours-dots"></div>
                  <div className="hours-time">{h.time}</div>
                </span>
              ))}
            </div>

            <div className="hours-note reveal reveal-delay-2">
              <strong>Weekend High Tea Buffet</strong> — Saturday &amp; Sunday, 12:30 PM – 2:30 PM<br />
              RM 65 per adult · RM 32 per child (ages 6–12) · Senior (55+) RM 32<br />
              <em style={{ color: 'var(--ash)' }}>Reservations recommended for high tea and dinner.</em>
            </div>

            <div className="contact-items">
              {[
                {
                  icon: '📍',
                  label: 'Address',
                  value: '202 Lebuh Noordin, 10300 George Town, Penang',
                  href: 'https://share.google/wZ7BRHKNVuzF8EvOg',
                },
                {
                  icon: '📞',
                  label: 'Reservations',
                  value: '+60 4-202 0888',
                  href: 'tel:+6042020888',
                },
              ].map((c, i) => (
                <div className="contact-item reveal" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className="contact-icon">{c.icon}</div>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    <div className="contact-text-label">{c.label}</div>
                    <div className="contact-text-value">{c.value}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="location-map reveal reveal-delay-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.1!2d100.328745!3d5.412841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac3a61b18e32d%3A0x0!2sCitadines+Connect+Georgetown+Penang!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SHIN 新 Location"
            ></iframe>
            <div className="location-map-overlay"></div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          RESERVATION SECTION
      ──────────────────────────────────────────────────── */}
      <section className="reservation" id="reservation">
        <div className="reservation-inner">
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>Make a Reservation</div>
          <h2 className="reservation-heading reveal reveal-delay-1">
            Reserve Your<br /><em>Evening</em>
          </h2>
          <p className="reservation-subtext reveal reveal-delay-2">
            Secure your table at SHIN 新. For groups of six or more, or special occasions, we recommend calling us directly at +60 4-202 0888 for a personalised arrangement.
          </p>

          <div className="reservation-form reveal reveal-delay-3" id="reservation-form-wrapper">
            <form id="reservation-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="fname">First Name</label>
                  <input className="form-input" type="text" id="fname" name="fname" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="lname">Last Name</label>
                  <input className="form-input" type="text" id="lname" name="lname" placeholder="Family name" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input className="form-input" type="email" id="email" name="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input className="form-input" type="tel" id="phone" name="phone" placeholder="+60 __ ____ ____" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="date">Preferred Date</label>
                  <input className="form-input" type="date" id="date" name="date" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="time">Preferred Time</label>
                  <select className="form-select" id="time" name="time" required>
                    <option value="" disabled selected>Select time</option>
                    <option>Breakfast · 7:00 – 10:00 AM</option>
                    <option>Lunch · 12:00 – 2:00 PM</option>
                    <option>High Tea · 12:30 – 2:30 PM (Weekend)</option>
                    <option>Dinner · 6:00 PM</option>
                    <option>Dinner · 7:00 PM</option>
                    <option>Dinner · 8:00 PM</option>
                    <option>Dinner · 9:00 PM</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="guests">Number of Guests</label>
                  <select className="form-select" id="guests" name="guests" required>
                    <option value="" disabled selected>Select guests</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option>More than 10 (call us)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="occasion">Special Occasion</label>
                  <select className="form-select" id="occasion" name="occasion">
                    <option value="">None</option>
                    <option>Birthday Celebration</option>
                    <option>Anniversary</option>
                    <option>Business Dinner</option>
                    <option>Romantic Evening</option>
                    <option>Family Gathering</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label className="form-label" htmlFor="requests">Special Requests</label>
                  <textarea className="form-textarea" id="requests" name="requests" placeholder="Dietary requirements, seating preferences, celebration details…"></textarea>
                </div>
              </div>

              <button type="submit" className="form-submit">Confirm Reservation</button>
              <p className="form-note">We will confirm your reservation within 24 hours via email or phone.</p>
            </form>

            <div className="form-success" id="form-success">
              <div className="form-success-icon">✓</div>
              <div className="form-success-title">Reservation Received</div>
              <div className="form-success-text">
                Thank you for choosing SHIN 新. We have received your reservation request and will confirm your table within 24 hours.<br /><br />
                For immediate assistance, please call us at <a href="tel:+6042020888" style={{ color: 'var(--gold)' }}>+60 4-202 0888</a>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────
          FOOTER
      ──────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">SHIN <span>新</span></div>
              <div className="footer-tagline">Contemporary Western Dining · George Town</div>
              <p className="footer-brand-desc">
                A culinary destination within Citadines Connect Georgetown Penang — where contemporary Western cuisine meets the soul of Southeast Asia's finest heritage city.
              </p>
            </div>

            <div>
              <div className="footer-col-title">Navigate</div>
              <ul className="footer-col-links">
                <li><a href="#philosophy">Our Story</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#testimonials">Reviews</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Dining</div>
              <ul className="footer-col-links">
                <li><a href="#menu">À La Carte Menu</a></li>
                <li><a href="#menu">Weekend High Tea</a></li>
                <li><a href="#reservation">Make a Reservation</a></li>
                <li><a href="#location">Private Dining</a></li>
                <li><a href="#location">Hotel Guests</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Contact</div>
              <div className="footer-col-text">
                202 Lebuh Noordin<br />
                10300 George Town<br />
                Penang, Malaysia<br /><br />
                <a href="tel:+6042020888">+60 4-202 0888</a><br /><br />
                Daily: 7 AM – 10 PM<br />
                High Tea: Sat &amp; Sun<br />
                12:30 – 2:30 PM
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} SHIN 新 at Citadines Connect Georgetown Penang. Part of The Ascott Limited.
            </p>
            <ul className="footer-legal">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="https://share.google/wZ7BRHKNVuzF8EvOg" target="_blank" rel="noopener noreferrer">Get Directions</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
