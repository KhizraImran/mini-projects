import { useEffect, useRef, useState } from 'react';
import './viet-cafe.css';

/* ── SVG Icon Components ── */
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.75 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.66 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconChevronUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 15-6-6-6 6"/>
  </svg>
);
const IconStar = () => <span>★</span>;
const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);
const IconSpark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconParking = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
  </svg>
);
const IconCreditCard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconNav = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

/* ── Dishes Data ── */
const dishes = [
  {
    id: 1,
    vnName: 'Phở Bò',
    name: 'Beef Pho',
    desc: 'Rich, slow-simmered bone broth perfumed with star anise, cinnamon and char-roasted ginger — ladled over silken rice noodles with tender beef slices. A soul-warming classic.',
    price: 'From RM 18',
    img: 'https://images.pexels.com/photos/6646022/pexels-photo-6646022.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    featured: true,
  },
  {
    id: 2,
    vnName: 'Gỏi Cuốn',
    name: 'Rice Paper Rolls',
    desc: 'Delicate hand-rolled spring rolls packed with fresh herbs, crisp vegetables and seasoned pork or shrimp. Served with housemade peanut dipping sauce.',
    price: 'From RM 10',
    img: 'https://images.pexels.com/photos/6646031/pexels-photo-6646031.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    featured: false,
  },
  {
    id: 3,
    vnName: 'Bún Khô Thịt Heo',
    name: 'Dry Pork Noodles',
    desc: 'Springy vermicelli tossed in umami-rich sauce, crowned with crispy fried shallots and served with a flavourful dipping broth on the side.',
    price: 'From RM 12.50',
    img: '/dry-noodles.jpg',
    featured: false,
  },
  {
    id: 4,
    vnName: 'Cà Phê Việt',
    name: 'Vietnamese Coffee',
    desc: 'Strong Robusta drip coffee over sweetened condensed milk — best enjoyed iced on a warm Penang afternoon.',
    price: 'From RM 6',
    img: 'https://images.pexels.com/photos/14226658/pexels-photo-14226658.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    featured: false,
  },
  {
    id: 5,
    vnName: 'Cá Kho',
    name: 'Braised Fish',
    desc: 'A signature dish rarely found outside Vietnamese homes — fish braised in caramelised pork-fat sauce with aromatics, served with steamed rice and blanched greens.',
    price: 'From RM 27',
    img: '/braised-fish.jpg',
    featured: false,
  },
];

/* ── Reviews Data ── */
const reviews = [
  {
    text: '"A real hidden gem that only locals frequent. A mark of a real authentic Vietnamese restaurant is the braised fish dish — you simply don\'t find it anywhere else. Everything was RM 27 and I had to ask the uncle twice because I couldn\'t believe the price!"',
    author: 'Alex T.',
    source: 'Google Reviews',
    initial: 'A',
  },
  {
    text: '"We came here 3 times in 3 days! The dry noodle with dipping sauce was our favourite. Service was superb — the boss and everyone is smiley and friendly. The atmosphere is comfortable, chill, and very clean."',
    author: 'Priya S.',
    source: 'Google Reviews',
    initial: 'P',
  },
  {
    text: '"Delicious chicken soup! So good I came back the next day. Fresh ingredients, flavorful dishes. Prompt service and a very clean kitchen. The wait staff are welcoming and genuinely kind."',
    author: 'Jonathan L.',
    source: 'Google Reviews',
    initial: 'J',
  },
  {
    text: '"The vermicelli is only RM 12.50 — can you believe it! You can feel the owner\'s sincerity when talking to him. They\'re just decent people trying to make a living. What a hidden gem. The owner even forgot to charge us for the hot tea!"',
    author: 'Michelle W.',
    source: 'Google Reviews',
    initial: 'M',
  },
  {
    text: '"Reasonably priced Vietnamese food — homey, good service, big portions, tastes great, and friendly boss, but not overcrowded! I stayed at a nearby hotel and the number of cars parked outside every day convinced me to try it. Won\'t be the last time."',
    author: 'David K.',
    source: 'Google Reviews',
    initial: 'D',
  },
  {
    text: '"Good variety of food, clean seats and tables. Old school vibes — no bull-\\* decor, just real food and fast service. Cash, card and QR all accepted. Closed on Mondays. This is non-halal, they serve pork. 5/5."',
    author: 'Sarah M.',
    source: 'Local Food Blog',
    initial: 'S',
  },
];

/* ── Menu items ── */
const menuData = {
  noodles: {
    label: 'Noodles & Soups',
    items: [
      { name: 'Beef Pho', vn: 'Phở Bò', price: 'RM 18+' },
      { name: 'Dry Pork Noodles', vn: 'Bún Khô Thịt Heo', price: 'RM 12.50' },
      { name: 'Yom Yam Steam Fish', vn: 'Cá Hấp', price: 'RM 20+' },
      { name: 'Chicken Soup Noodle', vn: 'Bún Gà', price: 'RM 15+' },
      { name: 'Sour & Spicy Fish', vn: '酸辣鱼', price: 'RM 18+' },
    ],
  },
  mains: {
    label: 'Mains & Rice',
    items: [
      { name: 'Braised Fish', vn: 'Cá Kho', price: 'RM 27+' },
      { name: 'Minced Pork & Prawn Crepe', vn: 'Bánh Xèo', price: 'RM 16+' },
      { name: 'Braised Pork Rice', vn: 'Cơm Thịt Kho', price: 'RM 14+' },
      { name: 'Bitter Gourd Scrambled Egg', vn: 'Khổ Qua', price: 'RM 12+' },
      { name: 'Steamed Rice (L)', vn: 'Cơm Trắng', price: 'RM 3.50' },
    ],
  },
  starters: {
    label: 'Starters & Drinks',
    items: [
      { name: 'Rice Paper Rolls', vn: 'Gỏi Cuốn', price: 'RM 10+' },
      { name: 'Dry Fried Popiah', vn: 'Chả Giò', price: 'RM 10+' },
      { name: 'Fried Spring Roll', vn: 'Nem Rán', price: 'RM 8+' },
      { name: 'Vietnamese Iced Coffee', vn: 'Cà Phê Sữa Đá', price: 'RM 6+' },
      { name: 'Herbal Cold Tea', vn: 'Trà Thảo Mộc', price: 'Complimentary' },
    ],
  },
};

/* ── Main App Component ── */
export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backTopVisible, setBackTopVisible] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);

  /* ── Scroll effects ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavScrolled(y > 60);
      setBackTopVisible(y > 500);
      // Parallax hero
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Intersection Observer for reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Lock scroll on mobile menu ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navItems = [
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Atmosphere', href: '#atmosphere' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Find Us', href: '#location' },
  ];

  /* ── Doubled reviews for seamless loop ── */
  const allReviews = [...reviews, ...reviews];

  return (
    <>
      {/* ══════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════ */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="nav-logo">
          <span className="nav-logo-en">Viet Jln Two</span>
          <span className="nav-logo-vi">Authentic Vietnamese · Penang</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <a href="tel:+601165245523" className="nav-cta">Reserve</a>
          </li>
        </ul>

        <button
          className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a href="tel:+601165245523" className="btn-primary" onClick={() => setMobileOpen(false)}>
          Call to Reserve
        </a>
      </div>

      {/* Vietnamese pattern top bar */}
      <div className="vn-pattern-border" id="top" />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef} />
        <div className="hero-overlay" />
        <div className="hero-grain" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>George Town, Penang</span>
            <span>·</span>
            <span>Since Est.</span>
          </div>

          <h1 className="hero-title">
            Viet Jln
            <em>Two</em>
          </h1>

          <p className="hero-subtitle">
            A hidden gem on Lebuh Noordin where Vietnamese home cooking meets
            Penang's heritage soul. Honest flavours, generous portions,
            and a warmth that keeps you coming back.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="btn-primary">
              Explore Menu <IconArrow />
            </a>
            <a href="#location" className="btn-ghost">
              Find Us <IconMapPin />
            </a>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span className="hero-scroll-text">Begin the Journey</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider" style={{ background: 'var(--ivory)', marginTop: '-2px' }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,80 C240,20 480,80 720,40 C960,0 1200,60 1440,20 L1440,0 L0,0 Z" fill="var(--wood-dark)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          STORY SECTION
      ══════════════════════════════════════════ */}
      <section className="section-story" id="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-text">
              <div className="section-tag reveal">Our Story</div>

              <h2 className="reveal reveal-delay-1">
                Where Every Bowl<br />
                Tells a <em>Story</em>
              </h2>

              <p className="reveal reveal-delay-2">
                Tucked along the storied lanes of Lebuh Noordin in George Town, Viet Jln Two
                Food Cafe is not your typical restaurant. It's a place where the uncle at the
                counter remembers your order, where complimentary hot tea arrives unbidden,
                and where the aroma of slow-simmered pho broth drifts out to greet you at the door.
              </p>

              <p className="reveal reveal-delay-3">
                Inspired by the authentic rhythms of Vietnamese home kitchens, the café serves
                dishes rooted in tradition — from the rich depth of a proper Beef Pho crafted
                with hours of bone-simmering, to the rarely-found Braised Fish that signals a
                truly Vietnamese kitchen. Every recipe carries the sincerity of a family table.
              </p>

              <p className="reveal reveal-delay-4">
                In a city celebrated for its heritage food culture, Viet Jln Two stands as one
                of Penang's most beloved Vietnamese spots — not because of fanfare or frills,
                but because the food speaks with undeniable honesty.
              </p>

              <div className="story-quote reveal reveal-delay-5">
                <p>"You can feel the owner's sincerity. They're just decent people trying to make
                  a living — and making something genuinely beautiful in the process."</p>
                <cite>— A regular guest, George Town</cite>
              </div>

              <div className="story-stats reveal reveal-delay-5">
                <div className="story-stat">
                  <span className="story-stat-num">5★</span>
                  <span className="story-stat-label">Rating on Google</span>
                </div>
                <div className="story-stat">
                  <span className="story-stat-num">RM 12</span>
                  <span className="story-stat-label">Avg. noodle bowl</span>
                </div>
                <div className="story-stat">
                  <span className="story-stat-num">134</span>
                  <span className="story-stat-label">Lebuh Noordin</span>
                </div>
              </div>
            </div>

            <div className="story-visual reveal-right">
              <img
                className="story-img-main"
                src="/interior.jpg"
                alt="Interior of Viet Jln Two Food Cafe, George Town Penang"
                loading="lazy"
              />
              <div className="story-img-badge">
                <span>Viet</span>
                <span>George Town<br />Penang</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ background: 'var(--ivory)', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
          <path d="M0,0 C360,80 720,0 1080,60 C1260,80 1380,40 1440,60 L1440,80 L0,80 Z" fill="var(--wood-dark)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          MENU / DISHES SECTION
      ══════════════════════════════════════════ */}
      <section className="section-menu" id="menu">
        <div className="container">
          <div className="menu-header reveal">
            <div className="section-tag" style={{ justifyContent: 'center' }}>Signature Dishes</div>
            <h2>A Journey Through<br />Vietnamese Flavour</h2>
            <p>
              From the soulful depths of Phở Bò to the delicate crunch of Gỏi Cuốn —
              each plate is a window into Vietnam's culinary heritage.
            </p>
          </div>
        </div>

        <div className="dishes-grid reveal">
          {dishes.map((dish) => (
            <div className="dish-card" key={dish.id}>
              <img
                className="dish-card-img"
                src={dish.img}
                alt={dish.name}
                loading="lazy"
              />
              <div className="dish-card-overlay" />
              <div className="dish-card-content">
                <div className="dish-card-vn">{dish.vnName}</div>
                <div className="dish-card-name">{dish.name}</div>
                <div className="dish-card-desc">{dish.desc}</div>
                <div className="dish-card-price">{dish.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Full menu list */}
        <div className="container">
          <div className="menu-list-section">
            <div className="menu-list-header reveal">
              <h3>Full Menu Overview</h3>
              <p>Prices are approximate · Menu subject to daily availability</p>
            </div>

            <div className="menu-categories">
              {Object.entries(menuData).map(([key, category], colIdx) => (
                <div className={`menu-category reveal reveal-delay-${colIdx + 1}`} key={key}>
                  <h4>{category.label}</h4>
                  {category.items.map((item, i) => (
                    <div className="menu-item" key={i}>
                      <div className="menu-item-name">
                        {item.name}
                        <small>{item.vn}</small>
                      </div>
                      <div className="menu-item-dots" />
                      <div className="menu-item-price">{item.price}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="ornament reveal" style={{ marginTop: '3rem' }}>
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line" />
            </div>

            <p className="reveal" style={{
              textAlign: 'center',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(248,244,236,0.35)',
              marginTop: '1rem',
              letterSpacing: '0.05em'
            }}>
              Non-halal · Pork is served · Cash, Card & QR accepted
            </p>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ background: 'var(--wood-dark)', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
          <path d="M0,80 C360,0 720,80 1080,20 C1260,0 1380,40 1440,10 L1440,0 L0,0 Z" fill="var(--ivory)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          ATMOSPHERE SECTION
      ══════════════════════════════════════════ */}
      <section className="section-atmosphere" id="atmosphere">
        <div className="container">
          <div className="atmosphere-grid">
            <div className="atmosphere-visual">
              <div className="atmosphere-img-stack">
                <img
                  className="atm-img-1"
                  src="https://images.pexels.com/photos/28208996/pexels-photo-28208996.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Vietnamese cafe atmosphere"
                  loading="lazy"
                />
                <img
                  className="atm-img-2"
                  src="https://images.pexels.com/photos/28510252/pexels-photo-28510252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Vietnamese beef pho"
                  loading="lazy"
                />
                <div className="atm-gold-ring" />
              </div>
            </div>

            <div className="atmosphere-text">
              <div className="section-tag reveal">The Experience</div>

              <h2 className="reveal reveal-delay-1">
                Old-School Warmth,<br />
                <em>Genuine</em> Soul
              </h2>

              <p className="reveal reveal-delay-2">
                Step past the threshold at 134 Lebuh Noordin and you'll find yourself
                in one of George Town's most quietly cherished dining rooms. The décor
                is unpretentious — simple wooden tables, clean tiled floors, open air
                where the breeze carries the scent of pho stock from the kitchen.
              </p>

              <p className="reveal reveal-delay-3">
                This is not a restaurant that performs authenticity. It lives it.
                The Pho uncle and his team move with the practised ease of people who
                have been doing this for years, service is fast and genuinely warm,
                and there's a friendliness that feels impossible to manufacture.
              </p>

              <p className="reveal reveal-delay-4">
                Regulars return again and again — not just for the food, but for the
                feeling of being somewhere real. In a world of curated dining experiences,
                Viet Jln Two is refreshingly, beautifully honest.
              </p>

              <div className="atmosphere-badges reveal reveal-delay-5">
                <span className="badge"><IconLeaf />Fresh Daily Ingredients</span>
                <span className="badge"><IconSpark />Authentic Recipes</span>
                <span className="badge"><IconShield />Consistently Loved</span>
                <span className="badge"><IconParking />Parking Available</span>
                <span className="badge"><IconCreditCard />Cash · Card · QR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ background: 'var(--ivory)', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
          <path d="M0,20 C360,80 720,0 1080,60 C1260,90 1380,30 1440,50 L1440,80 L0,80 Z"
            fill="url(#reviewGrad)" />
          <defs>
            <linearGradient id="reviewGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2d6a4f" />
              <stop offset="100%" stopColor="#1a4a35" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          REVIEWS SECTION
      ══════════════════════════════════════════ */}
      <section className="section-reviews" id="reviews">
        <div className="container">
          <div className="reviews-header reveal">
            <div className="section-tag" style={{ justifyContent: 'center' }}>Voices from Our Table</div>
            <h2>What Our Guests Say</h2>
          </div>
        </div>

        <div className="reviews-track-wrap">
          <div className="reviews-track">
            {allReviews.map((review, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-stars">
                  {[1,2,3,4,5].map((s) => <IconStar key={s} />)}
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-author">
                  <div className="review-avatar">{review.initial}</div>
                  <div className="review-author-info">
                    <span className="review-author-name">{review.author}</span>
                    <span className="review-author-source">{review.source}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ background: 'var(--jade)', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
          <path d="M0,0 C480,80 960,0 1440,60 L1440,80 L0,80 Z" fill="var(--ivory-dark)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          INFO SECTION — Hours & Contact
      ══════════════════════════════════════════ */}
      <section className="section-info" id="info">
        <div className="container">
          <div className="info-section-header reveal">
            <div className="section-tag" style={{ justifyContent: 'center' }}>Plan Your Visit</div>
            <h2>Hours, Location & Contact</h2>
            <p>We'd love to welcome you to our table.</p>
          </div>

          <div className="info-grid">
            {/* Opening Hours */}
            <div className="info-card reveal reveal-delay-1">
              <div className="info-card-icon">
                <IconClock />
              </div>
              <h3>Opening Hours</h3>
              {[
                { day: 'Monday', time: 'Closed', closed: true },
                { day: 'Tuesday', time: '10:30 AM – 3:00 PM\n5:30 PM – 9:00 PM', closed: false },
                { day: 'Wednesday', time: '10:30 AM – 3:00 PM\n5:30 PM – 9:00 PM', closed: false },
                { day: 'Thursday', time: '10:30 AM – 3:00 PM\n5:30 PM – 9:00 PM', closed: false },
                { day: 'Friday', time: '10:30 AM – 3:00 PM\n5:30 PM – 9:00 PM', closed: false },
                { day: 'Saturday', time: '10:30 AM – 3:00 PM\n5:30 PM – 9:00 PM', closed: false },
                { day: 'Sunday', time: '10:30 AM – 3:00 PM\n5:30 PM – 9:00 PM', closed: false },
              ].map(({ day, time, closed }) => (
                <div className="hours-row" key={day}>
                  <span className="hours-day">{day}</span>
                  <span className={`hours-time ${closed ? 'closed' : ''}`}>
                    {closed ? 'Closed' : time.split('\n').map((t, i) => (
                      <span key={i} style={{ display: 'block' }}>{t}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="info-card reveal reveal-delay-2">
              <div className="info-card-icon">
                <IconPhone />
              </div>
              <h3>Get in Touch</h3>
              <div className="info-card-contact">
                <div className="contact-item">
                  <div className="contact-item-icon"><IconPhone /></div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">Phone</span>
                    <span className="contact-item-value">
                      <a href="tel:+601165245523">+60 16-524 5523</a>
                    </span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><IconMapPin /></div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">Address</span>
                    <span className="contact-item-value">
                      134, Lebuh Noordin,<br />
                      George Town, 10300<br />
                      Penang, Malaysia
                    </span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><IconCreditCard /></div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">Payment Methods</span>
                    <div className="payment-badges" style={{ marginTop: '0.5rem' }}>
                      <span className="payment-badge">Cash</span>
                      <span className="payment-badge">Card</span>
                      <span className="payment-badge">QR Code</span>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><IconShield /></div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">Dietary Note</span>
                    <span className="contact-item-value">Non-halal · Pork is served</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick notes */}
            <div className="info-card reveal reveal-delay-3">
              <div className="info-card-icon">
                <IconSpark />
              </div>
              <h3>Good to Know</h3>
              <div className="info-card-contact">
                {[
                  { icon: <IconParking />, label: 'Parking', value: 'Street parking available directly in front of the restaurant.' },
                  { icon: <IconLeaf />, label: 'Dining Style', value: 'Casual, neighbourhood café. Walk-ins welcome. Expect a warm, family-run atmosphere.' },
                  { icon: <IconNav />, label: 'How to Find Us', value: 'We\'re on Lebuh Noordin in the heart of George Town, close to Weld Quay.' },
                  { icon: <IconStar />, label: 'Must Try', value: 'Braised Fish, Dry Pork Noodles, Beef Pho, and complimentary hot tea.' },
                ].map((item, i) => (
                  <div className="contact-item" key={i}>
                    <div className="contact-item-icon">{item.icon}</div>
                    <div className="contact-item-text">
                      <span className="contact-item-label">{item.label}</span>
                      <span className="contact-item-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div style={{ background: 'var(--ivory-dark)', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
          <path d="M0,40 C360,0 720,80 1080,20 C1260,0 1380,60 1440,40 L1440,80 L0,80 Z" fill="var(--wood-dark)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          MAP SECTION
      ══════════════════════════════════════════ */}
      <section className="section-map" id="location">
        <div className="container">
          <div className="map-inner">
            <div className="map-text reveal-left">
              <div className="section-tag" style={{ color: 'var(--gold)' }}>Find Us</div>
              <h2>Journey to<br /><em>Lebuh Noordin</em></h2>
              <p>
                We're nestled in the heart of historic George Town — a short walk from
                Penang's iconic heritage streets, and well worth the journey. Look for the
                cars parked outside and the aroma of pho that greets you from the lane.
              </p>
              <div className="map-details">
                <div className="map-detail-item">
                  <IconMapPin />
                  134, Lebuh Noordin, George Town, 10300 Penang
                </div>
                <div className="map-detail-item">
                  <IconPhone />
                  <a href="tel:+601165245523" style={{ color: 'inherit' }}>+60 16-524 5523</a>
                </div>
                <div className="map-detail-item">
                  <IconClock />
                  Tue – Sun: 10:30 AM – 3:00 PM &amp; 5:30 PM – 9:00 PM
                </div>
                <div className="map-detail-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold)', flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                  Closed on Mondays
                </div>
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="https://share.google/BPhM9A440FJWQyyjZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open in Google Maps <IconNav />
                </a>
                <a href="tel:+601165245523" className="btn-ghost">
                  Call Us <IconPhone />
                </a>
              </div>
            </div>

            <div className="map-embed reveal-right">
              <iframe
                title="Viet Jln Two Food Cafe Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.178!2d100.3297607!3d5.4122588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304dc3821b30318981%3A0x44bb3d47b4d8b25818!2sViet%20Jln%20Two%20Food%20Cafe!5e0!3m2!1sen!2smy!4v1688000000000!5m2!1sen!2smy"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Full-width map strip */}
        <div className="map-full">
          <iframe
            title="Viet Jln Two - Wide Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7944.356!2d100.3297607!3d5.4122588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304dc3821b30318981%3A0x44bb3d47b4d8b25818!2sViet%20Jln%20Two%20Food%20Cafe!5e0!3m2!1sen!2smy!4v1688000000000!5m2!1sen!2smy"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-full-overlay" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-brand-name">Viet Jln Two Food Cafe</div>
              <p className="footer-brand-tagline">
                Authentic Vietnamese home cooking served with heart on Lebuh Noordin,
                George Town, Penang.
              </p>
            </div>

            <div className="footer-col">
              <h4>Navigate</h4>
              <ul>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li><a href="tel:+601165245523">+60 16-524 5523</a></li>
                <li><a href="https://share.google/BPhM9A440FJWQyyjZ" target="_blank" rel="noopener noreferrer">Google Maps</a></li>
                <li><span style={{ color: 'rgba(248,244,236,0.4)', fontSize: '0.82rem', fontWeight: 300 }}>134 Lebuh Noordin</span></li>
                <li><span style={{ color: 'rgba(248,244,236,0.4)', fontSize: '0.82rem', fontWeight: 300 }}>George Town, Penang</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} Viet Jln Two Food Cafe · George Town, Penang, Malaysia
            </p>
            <div className="footer-gold-accent">
              <div className="footer-gold-line" />
              <div className="footer-gold-dot" />
              <div className="footer-gold-line" />
            </div>
            <p className="footer-copy">Crafted with 🍜 in Penang</p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════
          BACK TO TOP
      ══════════════════════════════════════════ */}
      <button
        className={`back-top ${backTopVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <IconChevronUp />
      </button>
    </>
  );
}
