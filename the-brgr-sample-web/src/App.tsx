import { useEffect, useRef, useState } from 'react';
import './brgr.css';

// ============================================================
// DATA
// ============================================================

const MENU_ITEMS = {
  beef: [
    {
      id: 1,
      name: 'Dirty Cheesy Aus Beef',
      desc: 'Grilled handcrafted Aus beef patty with cheese slice, thousand island & our signature dirty cheesy sauce. A fan favourite.',
      price: 'RM 20.90',
      setPrice: 'from RM 26.80',
      badge: 'Best Seller',
      img: 'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      featured: true,
    },
    {
      id: 2,
      name: 'Classic Aus Beef',
      desc: 'Grilled handcrafted Australian beef patty with cheese slice, fresh lettuce & house sauce. The original that started it all.',
      price: 'RM 18.90',
      setPrice: 'from RM 24.80',
      badge: 'Classic',
      img: 'https://images.pexels.com/photos/32807693/pexels-photo-32807693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 3,
      name: 'Triple Cheese Aus Beef',
      desc: 'Grilled Aus beef patty stacked with two different cheese slices and our rich, velvety cheesy sauce. For the cheese obsessed.',
      price: 'RM 22.90',
      setPrice: 'from RM 28.80',
      badge: 'Fan Pick',
      img: 'https://images.pexels.com/photos/18987002/pexels-photo-18987002.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
    {
      id: 4,
      name: 'Black Pepper Beef',
      desc: 'Grilled Aus beef patty glazed with our chef\'s secret black pepper sauce — bold, smoky, and deeply satisfying.',
      price: 'RM 20.90',
      setPrice: 'from RM 26.80',
      badge: 'Spicy',
      img: 'https://images.pexels.com/photos/11022623/pexels-photo-11022623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
    {
      id: 5,
      name: 'Spicy BBQ Beef',
      desc: 'Australian beef patty with a fiery BBQ glaze, crisp lettuce and tangy house pickles. Heat seekers, this one\'s yours.',
      price: 'RM 21.90',
      setPrice: 'from RM 27.80',
      badge: '🔥 Hot',
      img: 'https://images.pexels.com/photos/10914838/pexels-photo-10914838.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
    {
      id: 6,
      name: 'Sweet & Sour Oozy Beef',
      desc: 'A playful fusion — Aus beef patty drenched in our tangy-sweet oozy sauce that drips with every bite. Expect the unexpected.',
      price: 'RM 20.90',
      setPrice: 'from RM 26.80',
      badge: 'Signature',
      img: 'https://images.pexels.com/photos/28828555/pexels-photo-28828555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
  ],
  chicken: [
    {
      id: 7,
      name: 'Dirty Cheesy Fried Chicken',
      desc: 'Fried handcrafted chicken patty with cheesy & mayo sauce, cheese slice, fresh lettuce, and our legendary dirty cheesy sauce on top.',
      price: 'RM 20.90',
      setPrice: 'from RM 26.80',
      badge: 'Best Seller',
      img: 'https://images.pexels.com/photos/10361459/pexels-photo-10361459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      featured: true,
    },
    {
      id: 8,
      name: 'Triple Cheese Grilled Chicken',
      desc: 'Grilled chicken patty layered with fresh lettuce, two distinct cheese varieties and a generous pour of cheesy sauce.',
      price: 'RM 22.90',
      setPrice: 'from RM 28.80',
      badge: 'Fan Pick',
      img: 'https://images.pexels.com/photos/32807693/pexels-photo-32807693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      id: 9,
      name: 'Korean Spicy Grilled Chicken',
      desc: 'Grilled chicken coated in a fiery Korean-inspired spicy sauce with house pickles and lettuce. Bold flavours, global inspiration.',
      price: 'RM 21.90',
      setPrice: 'from RM 27.80',
      badge: '🔥 Hot',
      img: 'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
  ],
  special: [
    {
      id: 10,
      name: 'UFO Giant Fried Sotong',
      desc: 'Grilled Aus beef patty topped with an enormous golden fried squid ring — the showstopper that\'s always camera-ready.',
      price: 'RM 25.90',
      setPrice: 'from RM 31.80',
      badge: '🦑 Iconic',
      img: 'https://images.pexels.com/photos/11022623/pexels-photo-11022623.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      featured: true,
    },
    {
      id: 11,
      name: 'Soft Shell Crab Burger',
      desc: 'A premium golden soft shell crab paired with your choice of chicken or Aus beef patty. Rich, indulgent, and unforgettable.',
      price: 'RM 24.90',
      setPrice: 'from RM 30.80',
      badge: '🦀 Signature',
      img: 'https://images.pexels.com/photos/31300961/pexels-photo-31300961.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
    {
      id: 12,
      name: 'Black Pepper Kambing',
      desc: 'Handcrafted mutton patty bathed in a deeply aromatic black pepper sauce — the burger that converts non-believers.',
      price: 'RM 22.90',
      setPrice: 'from RM 28.80',
      badge: '🐑 Must Try',
      img: 'https://images.pexels.com/photos/28376179/pexels-photo-28376179.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    },
  ],
};

const BEVERAGES = [
  { icon: '🥤', name: 'Pepsi', price: 'RM 4.90' },
  { icon: '🍋', name: 'Ice Lemon Tea', price: 'RM 4.90' },
  { icon: '🟢', name: 'Mountain Dew', price: 'RM 4.90' },
  { icon: '💧', name: '7-Up', price: 'RM 4.90' },
];

const SIDES = [
  { name: 'Cheesy Popcorn Chicken', desc: 'Bite-sized crispy chicken bites drenched in melted cheese sauce', price: 'RM 11.90', img: 'https://images.pexels.com/photos/30709506/pexels-photo-30709506.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { name: 'Cheesy Meatball', desc: '9 pcs of juicy handcrafted meatballs smothered in cheesy sauce', price: 'from RM 14.90', img: 'https://images.pexels.com/photos/5946428/pexels-photo-5946428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { name: 'Crisper Fries (L)', desc: 'Extra-crunchy thin-cut fries seasoned with our house spice blend', price: 'RM 8.90', img: 'https://images.pexels.com/photos/20003199/pexels-photo-20003199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { name: 'Cheesy Crisper Fries (L)', desc: 'Our signature crisper fries loaded with melted cheese — the ultimate indulgence', price: 'RM 10.90', img: 'https://images.pexels.com/photos/5946428/pexels-photo-5946428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
];

const REVIEWS = [
  {
    text: 'One of the best double cheeseburgers I\'ve ever eaten. Soft roll, juicy meat — a real classic. 10/10 for me. The fries were delicious too, you can taste the real potato flavour!',
    name: 'James T.',
    platform: 'Google Reviews',
    stars: 5,
    highlight: true,
  },
  {
    text: 'The place is so cool you\'ll never want to miss getting an Instagram post here. The cheese, meat and everything from the burger is super nice.',
    name: 'Jonique L.',
    platform: 'TripAdvisor',
    stars: 5,
  },
  {
    text: 'The burgers here were quite delicious. Got a spicy burger with a charcoal bun — perfectly spiced with juicy chicken. Cheesy fries were delicious also!',
    name: 'Andil O.',
    platform: 'Google Reviews',
    stars: 4,
  },
  {
    text: 'The Soft Shell Crab Burger is truly something special. Paired with the Aus beef patty it\'s rich and indulgent. Highly recommend for seafood lovers!',
    name: 'Sarah M.',
    platform: 'Wanderlog',
    stars: 5,
  },
];

const INGREDIENTS = [
  { icon: '🥩', name: 'Premium Australian Beef', desc: 'Grass-fed, ethically sourced 100% Aus beef — handcrafted daily into thick, juicy patties.' },
  { icon: '🍞', name: 'Artisan Brioche Buns', desc: 'Soft, pillowy brioche and charcoal buns baked fresh — the perfect cradle for every build.' },
  { icon: '🧀', name: 'Aged Cheese Blends', desc: 'A rotating selection of premium cheese slices and house-crafted melted cheese sauce.' },
  { icon: '🌿', name: 'Fresh Daily Produce', desc: 'Crisp lettuce, vine-ripened tomatoes and house pickles sourced fresh every single morning.' },
  { icon: '🔥', name: 'House Secret Sauces', desc: 'From dirty cheesy to black pepper — every sauce is our chef\'s original recipe, made in-store.' },
  { icon: '🦀', name: 'Premium Seafood', desc: 'Whole golden soft shell crab and giant fried squid rings — elevated proteins beyond the ordinary.' },
];

// ============================================================
// COMPONENTS
// ============================================================

function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#story', label: 'Our Story' },
    { href: '#menu', label: 'Menu' },
    { href: '#craft', label: 'The Craft' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#location', label: 'Visit Us' },
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">
            <span className="nav-logo-main">THE <span>BRGR</span></span>
            <span className="nav-logo-sub">Georgetown · Penang</span>
          </a>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
              </li>
            ))}
            <li>
              <a href="tel:+60173452127" className="nav-cta">Order Now</a>
            </li>
          </ul>
          <div
            className={`nav-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
        <a href="tel:+60173452127" className="mobile-menu-cta" onClick={() => setMenuOpen(false)}>
          Order Now
        </a>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img
          src="https://images.pexels.com/photos/10914838/pexels-photo-10914838.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400"
          alt="Gourmet burger hero"
        />
      </div>
      <div className="hero-noise" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge reveal">
            <div className="hero-badge-dot" />
            <span className="hero-badge-text">Halal Certified · Georgetown, Penang</span>
            <div className="hero-badge-line" />
          </div>

          <h1 className="hero-title reveal reveal-delay-1">
            <span>Hand</span>
            <span className="line-amber">Crafted</span>
            <span className="line-outline">Burgers.</span>
          </h1>

          <p className="hero-subtitle reveal reveal-delay-2">
            Born in Penang in <strong>2017</strong>, The BRGR is where <strong>global burger culture</strong> meets the streets of George Town. Every patty is handcrafted daily. Every sauce is our own secret recipe.
          </p>

          <div className="hero-actions reveal reveal-delay-3">
            <a href="#menu" className="btn-primary magnetic">
              <span>Explore Menu</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#location" className="btn-secondary">
              <span>Find Us</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="hero-stats reveal reveal-delay-4">
            <div>
              <div className="hero-stat-num">2017</div>
              <div className="hero-stat-label">Est. Penang</div>
            </div>
            <div>
              <div className="hero-stat-num">4.6★</div>
              <div className="hero-stat-label">TripAdvisor</div>
            </div>
            <div>
              <div className="hero-stat-num">10+</div>
              <div className="hero-stat-label">Signature Burgers</div>
            </div>
            <div>
              <div className="hero-stat-num">Halal</div>
              <div className="hero-stat-label">Certified</div>
            </div>
          </div>
        </div>

        <div className="hero-right reveal reveal-delay-2">
          <div className="hero-image-wrap">
            <img
              className="hero-img-main"
              src="https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Dirty Cheesy Burger — The BRGR signature"
            />
            <img
              className="hero-img-accent hero-img-accent-1"
              src="https://images.pexels.com/photos/5946428/pexels-photo-5946428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"
              alt="Cheesy fries"
            />
            <img
              className="hero-img-accent hero-img-accent-2"
              src="https://images.pexels.com/photos/18987002/pexels-photo-18987002.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400"
              alt="Stacked burgers"
            />
            <div className="hero-glass-card">
              <div className="hero-glass-card-label">Today's Special</div>
              <div className="hero-glass-card-value">Dirty Cheesy</div>
              <div className="hero-glass-card-sub">Aus Beef · from RM 26.80</div>
            </div>
          </div>
        </div>
      </div>

      {/* Halal badge */}
      <div className="hero-halal-strip">
        <div className="hero-halal-strip-dot" />
        <span className="hero-halal-strip-text">Halal Certified</span>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    'Australian Beef Burgers',
    'Dirty Cheesy',
    'Soft Shell Crab',
    'Handcrafted Daily',
    'Triple Cheese',
    'Black Pepper Kambing',
    'UFO Sotong',
    'Halal Certified',
    'Georgetown Penang',
    'Open Daily 12–10PM',
  ];
  const doubled = [...items, ...items];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-text">{item}</span>
            <div className="ticker-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Story() {
  return (
    <section className="story section" id="story">
      <div className="container">
        <div className="story-grid">
          <div className="story-image-stack reveal">
            <img
              className="story-img story-img-1"
              src="https://images.pexels.com/photos/28828555/pexels-photo-28828555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="The BRGR interior"
            />
            <img
              className="story-img story-img-2"
              src="https://images.pexels.com/photos/31300961/pexels-photo-31300961.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="The BRGR burger and sides"
            />
            <div className="story-year-badge">
              <span className="story-year-badge-num">2017</span>
              <span className="story-year-badge-text">Since</span>
            </div>
          </div>

          <div className="story-content">
            <div className="section-tag reveal">
              <div className="section-tag-line" />
              <span className="section-tag-text">Our Story</span>
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              RE-THINK<br />YOUR<br />BURGER.
            </h2>
            <p className="story-desc reveal reveal-delay-2">
              The BRGR was born from a simple obsession — <strong>a group of passionate food lovers who travelled the world</strong>, tasted the best burgers from New York to Seoul, and brought those global flavours home to Penang.
            </p>
            <p className="story-desc reveal reveal-delay-3">
              Opening our first outlet right here in <strong>Georgetown's Nagore Square</strong>, we set out to redefine what a burger could be in Malaysia. Handcrafted patties. Secret sauces. Unexpected ingredient combinations. <strong>Halal. Always fresh. Never frozen.</strong>
            </p>

            <div className="story-pillars reveal reveal-delay-4">
              <div className="story-pillar">
                <div className="story-pillar-icon">🌍</div>
                <div className="story-pillar-title">Global Inspiration</div>
                <div className="story-pillar-desc">Flavours from New York, Korea, Japan & beyond, crafted for Malaysian palates.</div>
              </div>
              <div className="story-pillar">
                <div className="story-pillar-icon">✋</div>
                <div className="story-pillar-title">Handmade Daily</div>
                <div className="story-pillar-desc">Every patty, every sauce is made fresh in-store each day. No shortcuts. Ever.</div>
              </div>
              <div className="story-pillar">
                <div className="story-pillar-icon">🏅</div>
                <div className="story-pillar-title">Premium Halal</div>
                <div className="story-pillar-desc">100% Halal certified. Premium Australian beef, no alcohol, no compromise.</div>
              </div>
              <div className="story-pillar">
                <div className="story-pillar-icon">📍</div>
                <div className="story-pillar-title">Penang Roots</div>
                <div className="story-pillar-desc">Born in Georgetown's heritage Nagore Square. Penang's original gourmet burger destination.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState<'beef' | 'chicken' | 'special'>('beef');

  const tabs: { key: 'beef' | 'chicken' | 'special'; label: string }[] = [
    { key: 'beef', label: '🥩 Beef Burgers' },
    { key: 'chicken', label: '🍗 Chicken Burgers' },
    { key: 'special', label: '⭐ Specials' },
  ];

  const items = MENU_ITEMS[activeTab];

  return (
    <section className="menu-section section" id="menu">
      <div className="menu-bg-text">BRGR</div>
      <div className="container">
        <div className="menu-header">
          <div>
            <div className="section-tag reveal">
              <div className="section-tag-line" />
              <span className="section-tag-text">The Menu</span>
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              BUILD<br />YOUR<br />LEGEND.
            </h2>
          </div>
          <div className="menu-tabs reveal reveal-delay-2">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`menu-tab ${activeTab === t.key ? 'active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-grid">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`menu-card visible ${item.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="menu-card-img-wrap">
                <img src={item.img} alt={item.name} loading="lazy" />
                {item.badge && <span className="menu-card-badge">{item.badge}</span>}
              </div>
              <div className="menu-card-body">
                <h3 className="menu-card-name">{item.name}</h3>
                <p className="menu-card-desc">{item.desc}</p>
                <div className="menu-card-footer">
                  <div>
                    <div className="menu-card-price">{item.price}</div>
                    <div className="menu-card-price-note">Set: {item.setPrice}</div>
                  </div>
                  <div className="menu-card-add" aria-label="View item">+</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="craft-section section" id="craft">
      <div className="craft-bg-circle" />
      <div className="container">
        <div className="craft-layout">
          <div>
            <div className="section-tag reveal">
              <div className="section-tag-line" />
              <span className="section-tag-text">The Craft</span>
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              WHAT<br />GOES<br />INSIDE.
            </h2>
            <p className="section-subtitle reveal reveal-delay-2" style={{ marginBottom: '40px' }}>
              Every burger we serve is built from premium ingredients, sourced with intention and assembled with obsessive care.
            </p>

            <div className="craft-ingredients">
              {INGREDIENTS.map((ing, i) => (
                <div
                  key={i}
                  className={`craft-ingredient reveal reveal-delay-${i + 1} ${activeIdx === i ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                >
                  <div className="craft-ingredient-icon">{ing.icon}</div>
                  <div className="craft-ingredient-content">
                    <div className="craft-ingredient-name">{ing.name}</div>
                    <div className="craft-ingredient-desc">{ing.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="craft-image-panel reveal reveal-delay-2">
            <img
              src="https://images.pexels.com/photos/28376179/pexels-photo-28376179.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Craft burger ingredients"
            />
            <div className="craft-image-overlay" />
            <div className="craft-image-caption">
              <div className="craft-image-caption-label">Handcrafted In-Store</div>
              <div className="craft-image-caption-title">Fresh. Daily. Always.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sides() {
  return (
    <section className="sides-section section" id="sides">
      <div className="container">
        <div className="section-tag reveal">
          <div className="section-tag-line" />
          <span className="section-tag-text">Sides & Extras</span>
        </div>
        <h2 className="section-title reveal reveal-delay-1">DON'T<br />SKIP<br />THE SIDES.</h2>
        <p className="section-subtitle reveal reveal-delay-2">
          Our sides aren't afterthoughts — they're co-stars. From cheesy loaded fries to crispy popcorn chicken, every bite earns its place on your tray.
        </p>

        <div className="sides-scroll-row">
          {SIDES.map((side, i) => (
            <div key={i} className={`sides-card reveal reveal-delay-${i + 1}`}>
              <img className="sides-card-img" src={side.img} alt={side.name} loading="lazy" />
              <div className="sides-card-body">
                <div className="sides-card-name">{side.name}</div>
                <div className="sides-card-desc">{side.desc}</div>
                <div className="sides-card-price">{side.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '60px' }}>
          <div className="section-tag reveal">
            <div className="section-tag-line" />
            <span className="section-tag-text">Cold Drinks</span>
          </div>
          <p className="section-subtitle reveal reveal-delay-1" style={{ marginBottom: '20px', fontSize: '13px' }}>
            Wash it all down with an ice-cold refreshment.
          </p>
          <div className="beverage-row reveal reveal-delay-2">
            {BEVERAGES.map((b, i) => (
              <div key={i} className="beverage-chip">
                <span className="beverage-chip-icon">{b.icon}</span>
                <span>{b.name}</span>
                <span style={{ color: 'var(--amber)', fontWeight: 700 }}>{b.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews-section section" id="reviews">
      <div className="reviews-bg-text">LOVE</div>
      <div className="container">
        <div className="reviews-layout">
          <div className="reviews-left">
            <div className="section-tag reveal">
              <div className="section-tag-line" />
              <span className="section-tag-text">Reviews</span>
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              REAL<br />PEOPLE.<br />REAL<br />BITES.
            </h2>

            <div className="reviews-rating-display reveal reveal-delay-2">
              <div className="reviews-big-num">4.6</div>
              <div className="reviews-stars">
                {[1,2,3,4,5].map(s => <span key={s} className="star">★</span>)}
              </div>
              <div className="reviews-count">Based on 900+ verified reviews</div>
            </div>

            <div className="reviews-platforms reveal reveal-delay-3">
              <div className="reviews-platform">
                <span className="reviews-platform-name">TripAdvisor</span>
                <span className="reviews-platform-score">4.6 / 5</span>
              </div>
              <div className="reviews-platform">
                <span className="reviews-platform-name">Google Maps</span>
                <span className="reviews-platform-score">4.2 / 5</span>
              </div>
              <div className="reviews-platform">
                <span className="reviews-platform-name">Foodpanda</span>
                <span className="reviews-platform-score">5.0 / 5</span>
              </div>
              <div className="reviews-platform">
                <span className="reviews-platform-name">Klook</span>
                <span className="reviews-platform-score">4.6 / 5</span>
              </div>
            </div>
          </div>

          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className={`review-card reveal reveal-delay-${i + 1} ${r.highlight ? 'highlight' : ''}`}>
                <div className="review-stars">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <span key={s} className="star">★</span>
                  ))}
                </div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <div className="review-avatar">{r.name[0]}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-platform">{r.platform}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="location-section section" id="location">
      <div className="container">
        <div className="location-layout">
          <div className="location-info">
            <div className="section-tag reveal">
              <div className="section-tag-line" />
              <span className="section-tag-text">Visit Us</span>
            </div>
            <h2 className="section-title reveal reveal-delay-1">
              FIND<br />YOUR<br />BRGR.
            </h2>

            <div className="location-details">
              <div className="location-detail reveal reveal-delay-2">
                <div className="location-detail-icon">📍</div>
                <div>
                  <div className="location-detail-label">Address</div>
                  <div className="location-detail-value">
                    No. 85, Jalan Nagor, Nagore Square,<br />
                    10050 George Town, Pulau Pinang, Malaysia
                  </div>
                </div>
              </div>
              <div className="location-detail reveal reveal-delay-3">
                <div className="location-detail-icon">📞</div>
                <div>
                  <div className="location-detail-label">Phone</div>
                  <div className="location-detail-value">
                    <a href="tel:+60173452127">+60 17-345 2127</a>
                  </div>
                </div>
              </div>
              <div className="location-detail reveal reveal-delay-4">
                <div className="location-detail-icon">✉️</div>
                <div>
                  <div className="location-detail-label">Email</div>
                  <div className="location-detail-value">
                    <a href="mailto:info@thebrgr.com.my">info@thebrgr.com.my</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="location-actions reveal reveal-delay-4">
              <a
                href="https://share.google/TouQs1Vw1MZiPhDFl"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Get Directions</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="tel:+60173452127" className="btn-outline">
                <span>📞 Call Now</span>
              </a>
            </div>

            <div style={{ marginTop: '48px' }}>
              <div className="section-tag reveal">
                <div className="section-tag-line" />
                <span className="section-tag-text">Opening Hours</span>
              </div>
              <div className="hours-grid reveal reveal-delay-2">
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
                  <div key={day} className="hours-item">
                    <span className="hours-day">{day.slice(0,3)}</span>
                    <span className="hours-time">12:00 – 10:00 PM</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="location-map reveal reveal-delay-3">
            <iframe
              title="The BRGR Georgetown Penang Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.3050!2d100.3237!3d5.4201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac394a14e0ac3%3A0x8553dba1218be895!2sThe%20Brgr!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="location-map-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Delivery() {
  return (
    <section className="delivery-section">
      <div className="delivery-inner">
        <div className="delivery-left">
          <div className="delivery-tag">Order Online · Delivered Fresh</div>
          <h2 className="delivery-title">
            BRGR<br />TO YOUR<br />DOOR.
          </h2>
          <p className="delivery-sub">
            Can't make it in? We deliver across Tanjung Bungah, Gurney, Georgetown, Green Lane, Pulau Tikus, Jelutong & more.
          </p>
        </div>
        <div className="delivery-platforms">
          <a
            href="https://www.foodpanda.my/restaurant/p2zx/the-brgr-cafe"
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-btn"
          >
            <span className="delivery-btn-icon">🐼</span>
            <span>FoodPanda</span>
          </a>
          <a
            href="https://food.grab.com/my/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-btn"
          >
            <span className="delivery-btn-icon">🚗</span>
            <span>GrabFood</span>
          </a>
          <a
            href="tel:+60173452127"
            className="delivery-btn"
          >
            <span className="delivery-btn-icon">📞</span>
            <span>Call to Order</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo-main">THE <span>BRGR</span></div>
          <div className="footer-logo-sub">Georgetown · Penang</div>
          <p className="footer-brand-desc">
            Gourmet handcrafted burgers inspired by cities around the world. Proudly Halal. Born in Penang, 2017.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/thebrgrofficial" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/thebrgr_official/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">in</a>
            <a href="https://www.tiktok.com/@thebrgr" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="TikTok">tt</a>
          </div>
          <div className="footer-halal">
            <div className="footer-halal-dot" />
            <span className="footer-halal-text">Halal Certified</span>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Navigate</div>
          <ul className="footer-links">
            <li><a href="#story">Our Story</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#craft">The Craft</a></li>
            <li><a href="#sides">Sides</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#location">Visit Us</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Menu</div>
          <ul className="footer-links">
            <li><a href="#menu">Beef Burgers</a></li>
            <li><a href="#menu">Chicken Burgers</a></li>
            <li><a href="#menu">Signature Specials</a></li>
            <li><a href="#sides">Cheesy Fries</a></li>
            <li><a href="#sides">Popcorn Chicken</a></li>
            <li><a href="#sides">Meatballs</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Contact</div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">Address</span>
            <span className="footer-contact-value">
              No. 85, Jalan Nagor,<br />
              Nagore Square, 10050<br />
              George Town, Penang
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">Phone</span>
            <span className="footer-contact-value">
              <a href="tel:+60173452127">+60 17-345 2127</a>
            </span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">Hours</span>
            <span className="footer-contact-value">Daily · 12:00 PM – 10:00 PM</span>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">Email</span>
            <span className="footer-contact-value">
              <a href="mailto:info@thebrgr.com.my">info@thebrgr.com.my</a>
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © 2025 <span>The BRGR – Georgetown Penang</span>. All rights reserved.
        </p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Custom cursor
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const animateRing = () => {
        ringX = lerp(ringX, x, 0.14);
        ringY = lerp(ringY, y, 0.14);
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        raf = requestAnimationFrame(animateRing);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Hero image parallax
  useEffect(() => {
    const heroBgImg = document.querySelector('.hero-bg img') as HTMLImageElement;
    if (!heroBgImg) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      heroBgImg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const magnetics = document.querySelectorAll<HTMLElement>('.magnetic');
    const handlers: { el: HTMLElement; onMove: (e: MouseEvent) => void; onLeave: () => void }[] = [];

    magnetics.forEach(el => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.18;
        const dy = (e.clientY - cy) * 0.18;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const onLeave = () => { el.style.transform = ''; };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      handlers.push({ el, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Custom cursor (desktop only) */}
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Ticker />
        <Story />
        <div className="section-divider" />
        <MenuSection />
        <div className="section-divider" />
        <Craft />
        <div className="section-divider" />
        <Sides />
        <div className="section-divider" />
        <Reviews />
        <div className="section-divider" />
        <Location />
        <Delivery />
      </main>
      <Footer />
    </>
  );
}
