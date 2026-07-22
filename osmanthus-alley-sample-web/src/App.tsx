import { useEffect, useRef, useState } from 'react';
import './index.css';

/* ─────────────────────────────────────────────
   IMAGE CONSTANTS
   ───────────────────────────────────────────── */
const IMG = {
  heroAlley: 'https://images.pexels.com/photos/14180105/pexels-photo-14180105.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1800',
  heroLantern: 'https://images.pexels.com/photos/36771904/pexels-photo-36771904.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1800',
  storyInterior: 'https://images.pexels.com/photos/16310611/pexels-photo-16310611.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
  storyShophouse: 'https://images.pexels.com/photos/38321172/pexels-photo-38321172.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600',
  ambiance1: 'https://images.pexels.com/photos/16523008/pexels-photo-16523008.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
  ambiance2: 'https://images.pexels.com/photos/36222693/pexels-photo-36222693.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700',
  ambiance3: 'https://images.pexels.com/photos/33795982/pexels-photo-33795982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700',
  ambiance4: 'https://images.pexels.com/photos/3933169/pexels-photo-3933169.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700',
  ambiance5: 'https://images.pexels.com/photos/11551841/pexels-photo-11551841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700',
  dishLuRouFan: 'https://images.pexels.com/photos/5305437/pexels-photo-5305437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishBeefNoodle: 'https://images.pexels.com/photos/33571857/pexels-photo-33571857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishDessert: 'https://images.pexels.com/photos/5652183/pexels-photo-5652183.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishChicken: 'https://images.pexels.com/photos/31317065/pexels-photo-31317065.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishTea: 'https://images.pexels.com/photos/11551841/pexels-photo-11551841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishPork2: 'https://images.pexels.com/photos/5305439/pexels-photo-5305439.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishBeefSoup: 'https://images.pexels.com/photos/32708186/pexels-photo-32708186.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishChickenWings: 'https://images.pexels.com/photos/27831789/pexels-photo-27831789.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishBraised: 'https://images.pexels.com/photos/38519303/pexels-photo-38519303.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  dishDessert2: 'https://images.pexels.com/photos/5652196/pexels-photo-5652196.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  signatureDish: 'https://images.pexels.com/photos/5305437/pexels-photo-5305437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
};

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const menuData = {
  mains: [
    {
      id: 1,
      name: 'Gui Hua Braised Pork Rice',
      nameZh: '桂花鹵肉飯',
      tag: 'House Signature',
      desc: 'Slow-braised pork belly in our osmanthus-infused soy sauce, ladled over steamed jasmine rice with a soft-boiled egg and pickled mustard greens.',
      price: 'RM 16.80',
      img: IMG.dishLuRouFan,
      badge: 'Best Seller',
      featured: true,
    },
    {
      id: 2,
      name: 'Taiwanese Beef Noodle Soup',
      nameZh: '紅燒牛肉麵',
      tag: 'Noodle Bowl',
      desc: 'Rich, slow-simmered red-braise broth with tender beef shank, hand-pulled noodles, bok choy, and a touch of star anise warmth.',
      price: 'RM 22.80',
      img: IMG.dishBeefNoodle,
      badge: null,
      featured: false,
    },
    {
      id: 3,
      name: 'Oyster Mee Sua',
      nameZh: '蚵仔麵線',
      tag: 'Taiwan Classic',
      desc: 'Silky thin wheat noodles in a thickened savory broth loaded with plump oysters, black fungus, and a splash of fragrant black vinegar.',
      price: 'RM 19.80',
      img: IMG.dishBeefSoup,
      badge: null,
      featured: false,
    },
    {
      id: 4,
      name: 'Salted Crispy Chicken',
      nameZh: '鹹酥雞',
      tag: 'Night Market Classic',
      desc: 'Boneless chicken bites marinated in garlic and five-spice, flash-fried to a golden crisp with Thai basil leaves and chilli salt.',
      price: 'RM 18.80',
      img: IMG.dishChicken,
      badge: null,
      featured: false,
    },
  ],
  snacks: [
    {
      id: 5,
      name: 'Sesame Prawn Toast',
      nameZh: '芝麻蝦多士',
      tag: 'Starter',
      desc: 'Crunchy bread triangles piled with fresh prawn paste, coated in toasted sesame seeds and fried to golden perfection.',
      price: 'RM 14.80',
      img: IMG.dishChickenWings,
      badge: null,
      featured: false,
    },
    {
      id: 6,
      name: 'Hakka Yam Abacus',
      nameZh: '算盤子',
      tag: 'Hakka Heritage',
      desc: 'Creamy, chewy discs of taro stir-fried with minced pork, dried shrimp, and mushroom in a savory wok sauce.',
      price: 'RM 18.00',
      img: IMG.dishPork2,
      badge: 'Chef\'s Pick',
      featured: true,
    },
    {
      id: 7,
      name: 'Wonton in Szechuan Chili Oil',
      nameZh: '紅油抄手',
      tag: 'Spicy',
      desc: 'Silken pork dumplings bathed in house-made Szechuan chili oil, topped with crispy garlic, sesame, and green onion.',
      price: 'RM 14.80',
      img: IMG.dishBraised,
      badge: null,
      featured: false,
    },
    {
      id: 8,
      name: 'Hot & Sour Soup Dumplings',
      nameZh: '酸辣湯餃',
      tag: 'Soup',
      desc: 'Little dumplings swimming in a tangy-spicy soup with mushrooms, silken tofu, carrot, and ribbons of silky egg.',
      price: 'RM 14.80',
      img: IMG.dishBeefSoup,
      badge: null,
      featured: false,
    },
  ],
  desserts: [
    {
      id: 9,
      name: 'Osmanthus Tang Yuan',
      nameZh: '酒釀桂花黑芝麻湯圓',
      tag: 'House Signature',
      desc: 'Black sesame-filled glutinous rice balls floating in a warm rice wine and osmanthus flower broth — the soul of the restaurant in a bowl.',
      price: 'RM 12.80',
      img: IMG.dishDessert,
      badge: 'Must Try',
      featured: true,
    },
    {
      id: 10,
      name: 'Osmanthus Jelly',
      nameZh: '桂花凍',
      tag: 'Cold Dessert',
      desc: 'Firm yet tender osmanthus-perfumed jelly, gently sweet, studded with goji berries and served chilled. A nostalgic delight.',
      price: 'RM 9.80',
      img: IMG.dishDessert2,
      badge: null,
      featured: false,
    },
    {
      id: 11,
      name: 'Red Bean Soup',
      nameZh: '紅豆湯',
      tag: 'Classic Tong Sui',
      desc: 'Slow-cooked red beans in a naturally sweet broth, served warm with mochi balls and a whisper of pandan.',
      price: 'RM 9.80',
      img: IMG.dishDessert,
      badge: null,
      featured: false,
    },
    {
      id: 12,
      name: 'Peach Gum Tong Sui',
      nameZh: '桃膠糖水',
      tag: 'Wellness Dessert',
      desc: 'Cooling and restorative peach tree resin simmered with tremella mushroom, lotus seeds, and wolfberries.',
      price: 'RM 12.80',
      img: IMG.dishTea,
      badge: null,
      featured: false,
    },
  ],
};

const reviews = [
  {
    text: "The beef noodle soup was absolutely perfect — flavour rich, noodles cooked just right, and the portion was generous. Definitely one of the best I've had.",
    author: 'Marcus L.',
    meta: 'Verified Diner · Google Review',
    initials: 'ML',
    stars: 5,
  },
  {
    text: "Rustic charm, unforced and abundant at every turn. The osmanthus jelly was a nostalgic delight — firm, gently sweet and perfumed with osmanthus blossoms.",
    author: 'Priya S.',
    meta: 'Food Blogger · Wanderlog',
    initials: 'PS',
    stars: 5,
  },
  {
    text: "The mee suah was everything I hoped for — steaming hot, hearty, generously packed with oysters so plump they bordered on decadent.",
    author: 'Christine W.',
    meta: 'Local Foodie · Google Review',
    initials: 'CW',
    stars: 5,
  },
  {
    text: "Love the interesting eclectic decor that oozes an old world charm. Spicy soup dumplings and gui hua pork rice were equally delicious.",
    author: 'James K.',
    meta: 'Travel Writer · Trip.com',
    initials: 'JK',
    stars: 5,
  },
  {
    text: "The Hakka wine chicken was so good — made with homemade sweet rice wine. Slightly sweet but absolutely delicious with rice. We'll definitely be back.",
    author: 'Mei L.',
    meta: 'Returning Guest · Google Review',
    initials: 'ML',
    stars: 5,
  },
  {
    text: "Hidden in Hin Bus Depot but worth every step of finding it. The tong sui came brimming with herbal treasures, cooling and restorative in equal measure.",
    author: 'Tohkia N.',
    meta: 'Rising Star · Trip.com Community',
    initials: 'TN',
    stars: 5,
  },
  {
    text: "A quaint sanctuary with old-world charm and a kitchen of quiet but formidable talent. Every dish tells a story of Taiwan brought alive in Penang.",
    author: 'Rachel T.',
    meta: 'Food Critic · SmartDory',
    initials: 'RT',
    stars: 5,
  },
  {
    text: "Fried cabbages with just the right crisp, chicken wings perfectly done, 獅子球 absolutely delicious. Highly recommend for any lover of Taiwanese cuisine!",
    author: 'David C.',
    meta: 'Regular Diner · Google Review',
    initials: 'DC',
    stars: 5,
  },
];

const hours = [
  { day: 'Monday', time: null, closed: true },
  { day: 'Tuesday', time: '11:00 AM – 9:00 PM', closed: false },
  { day: 'Wednesday', time: '11:00 AM – 9:00 PM', closed: false },
  { day: 'Thursday', time: '11:00 AM – 9:00 PM', closed: false },
  { day: 'Friday', time: '11:00 AM – 9:00 PM', closed: false },
  { day: 'Saturday', time: '11:00 AM – 9:00 PM', closed: false },
  { day: 'Sunday', time: '11:00 AM – 9:00 PM', closed: false },
];

/* ─────────────────────────────────────────────
   PETAL CANVAS COMPONENT
   ───────────────────────────────────────────── */
function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals: { x: number; y: number; size: number; speed: number; drift: number; angle: number; angleSpeed: number; opacity: number }[] = [];

    for (let i = 0; i < 20; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 6 + 3,
        speed: Math.random() * 0.8 + 0.3,
        drift: Math.random() * 0.8 - 0.4,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.angleSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#c9922b';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   MAIN APP
   ───────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'mains' | 'snacks' | 'desserts'>('mains');
  const [activeSection, setActiveSection] = useState('');

  /* ── Loader ── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(t);
  }, []);

  /* ── Scroll effects ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['story', 'ambiance', 'menu', 'signature', 'reviews', 'visit'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  /* ── Hero parallax ── */
  useEffect(() => {
    const heroImg = document.querySelector('.hero-bg img') as HTMLElement | null;
    const onScroll = () => {
      if (heroImg) {
        const y = window.scrollY;
        heroImg.style.transform = `scale(1.06) translateY(${y * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Mobile menu animation ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const links = document.querySelectorAll('.nav-mobile-menu a');
      links.forEach((el, i) => {
        setTimeout(() => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
          (el as HTMLElement).style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
        }, 50);
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <>
      {/* ── PAGE LOADER ── */}
      <div className={`page-loader${loaded ? ' hide' : ''}`} aria-hidden={loaded}>
        <div className="loader-logo">桂花巷</div>
        <div className="loader-en">Osmanthus Alley</div>
        <div className="loader-bar" />
      </div>

      {/* ── PETAL CANVAS ── */}
      <PetalCanvas />

      {/* ── NAVIGATION ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-logo" onClick={() => scrollTo('hero')} style={{ cursor: 'pointer' }}>
          <span className="nav-logo-en">Osmanthus Alley</span>
          <span className="nav-logo-zh">桂花巷</span>
        </div>
        <ul className="nav-links" role="list">
          {[
            { label: 'Our Story', id: 'story' },
            { label: 'Ambiance', id: 'ambiance' },
            { label: 'Menu', id: 'menu' },
            { label: 'Visit', id: 'visit' },
          ].map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="nav-reserve-btn-wrap">
            <a
              href="tel:+601111812722"
              className="nav-links nav-reserve-btn"
              style={{ textDecoration: 'none' }}
            >
              <span>📞</span> Reserve
            </a>
          </li>
        </ul>
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
        {[
          { label: 'Our Story', id: 'story' },
          { label: 'Ambiance', id: 'ambiance' },
          { label: 'Menu', id: 'menu' },
          { label: 'Visit', id: 'visit' },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            {item.label}
          </a>
        ))}
        <div className="mobile-menu-subline">George Town, Penang · 桂花巷</div>
      </div>

      {/* ═══════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section id="hero" className="hero" aria-label="Hero">
        <div className="hero-bg">
          <img
            src={IMG.heroAlley}
            alt="Lantern-lit alley inspired by the spirit of Osmanthus Alley, George Town"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Lanterns */}
        <div className="hero-lanterns" aria-hidden="true">
          <span className="lantern">🏮</span>
          <span className="lantern">🏮</span>
          <span className="lantern">🏮</span>
          <span className="lantern">🏮</span>
          <span className="lantern">🏮</span>
        </div>

        {/* Rotating badge */}
        <div className="hero-badge" aria-hidden="true">
          <div className="hero-badge-ring">
            <svg viewBox="0 0 110 110" style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <defs>
                <path id="circle-path" d="M 55,55 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
              </defs>
              <text
                style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '8.5px', letterSpacing: '2.5px', textTransform: 'uppercase', fill: 'rgba(201,146,43,0.8)' }}
              >
                <textPath href="#circle-path">
                  Taiwanese · Hin Bus Depot · George Town · Penang ·
                </textPath>
              </text>
            </svg>
            <span className="hero-badge-center">桂</span>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-tag" aria-label="Authentic Taiwanese cuisine in Penang">
            Authentic Taiwanese Cuisine · Penang
          </div>
          <h1 className="hero-title">
            Where every<br />
            alley holds a<br />
            <em>story.</em>
          </h1>
          <span className="hero-title-zh">桂花巷</span>
          <p className="hero-desc">
            Tucked within the artful sanctuary of Hin Bus Depot, Osmanthus Alley serves 
            soulful Taiwanese cooking rooted in memory, tradition, and the quiet fragrance 
            of osmanthus blossoms.
          </p>
          <div className="hero-actions">
            <a
              href="#menu"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); scrollTo('menu'); }}
              aria-label="Explore our menu"
            >
              Explore Menu
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#visit"
              className="btn-ghost"
              onClick={(e) => { e.preventDefault(); scrollTo('visit'); }}
              aria-label="Find us"
            >
              Find Us
            </a>
          </div>
        </div>

        <div className="hero-scroll-indicator" aria-hidden="true">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════ */}
      <div className="stats-bar reveal" role="complementary" aria-label="Restaurant highlights">
        <div className="stat-item">
          <div className="stat-number">4<span>★</span></div>
          <div className="stat-label">Google Rating</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">200<span>+</span></div>
          <div className="stat-label">Reviews</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">5<span>+</span></div>
          <div className="stat-label">Years Serving</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">30<span>+</span></div>
          <div className="stat-label">Menu Items</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          STORY SECTION
      ════════════════════════════════════════ */}
      <section id="story" className="story" aria-labelledby="story-heading">
        <div className="story-inner">
          <div className="story-text">
            <div className="section-eyebrow reveal">Our Story</div>
            <h2 id="story-heading" className="section-title reveal delay-1">
              Born from a<br />
              <em>food truck dream</em>
            </h2>
            <div className="story-pull-quote reveal delay-2">
              <p>"The exterior spills over with greenery, while the interior brims with eccentric trinkets and furniture — rustic charm, unforced and abundant at every turn."</p>
            </div>
            <p className="reveal delay-2">
              Osmanthus Alley began as <strong>Mama Goose</strong>, a beloved trailer cabin kitchen tucked within the creative chaos of Hin Bus Depot, George Town. What started as a modest food truck experiment grew into one of Penang's most distinctive dining destinations — a place where authentic Taiwanese street food meets the soul of an artist's space.
            </p>
            <p className="reveal delay-3">
              The restaurant's name — <strong>桂花巷 (Guì Huā Xiàng)</strong> — translates to "Osmanthus Alley," evoking the image of a quiet, fragrant lane in Taiwan where the golden flowers of the osmanthus tree perfume the evening air. This sense of gentle nostalgia permeates every corner of the space, from the chef's handcrafted driftwood art pieces on the walls to the osmanthus-infused dishes on the menu.
            </p>
            <p className="reveal delay-3">
              Nestled at <strong>59 Jalan Gurdwara</strong>, next door to Wholey Wonder Café, the restaurant draws both the Sunday market crowd and destination diners seeking something genuinely authentic. It remains a warm, family-run kitchen — small in size, expansive in flavour.
            </p>
            <div className="story-origin reveal delay-4">
              From Mama Goose Food Truck · Est. Hin Bus Depot, George Town
            </div>
          </div>
          <div className="story-visual reveal-right delay-2">
            <div className="story-img-main">
              <img src={IMG.storyInterior} alt="Cozy rustic interior of Osmanthus Alley restaurant" loading="lazy" />
            </div>
            <div className="story-img-float">
              <img src={IMG.storyShophouse} alt="George Town heritage shophouse street in Penang" loading="lazy" />
            </div>
            <div className="story-tag-float">
              Hin Bus Depot
              <span>桂花巷</span>
            </div>
          </div>
        </div>
      </section>

      {/* Curve divider */}
      <div className="curve-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z" fill="#2c2825" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════
          AMBIANCE SECTION
      ════════════════════════════════════════ */}
      <section id="ambiance" className="ambiance" aria-labelledby="ambiance-heading">
        <div className="ambiance-inner">
          <div className="ambiance-header">
            <div>
              <div className="section-eyebrow reveal" style={{ color: 'var(--gold-light)' }}>
                <span style={{ background: 'var(--gold-light)' }} />
                The Space
              </div>
              <h2 id="ambiance-heading" className="section-title reveal delay-1" style={{ color: 'var(--cream-white)' }}>
                A sanctuary of<br /><em style={{ color: 'var(--gold-light)' }}>quiet charm</em>
              </h2>
            </div>
            <p className="section-subtitle reveal delay-2">
              Where driftwood art, eclectic trinkets, and lantern glow come together 
              in a space that feels curated by decades of wandering.
            </p>
          </div>
          <div className="ambiance-grid">
            <div className="ambiance-card reveal-scale">
              <img src={IMG.ambiance1} alt="Rustic wooden dining interior" loading="lazy" />
              <div className="ambiance-card-label">Rustic Dining Hall</div>
            </div>
            <div className="ambiance-card reveal delay-1">
              <img src={IMG.ambiance2} alt="Lantern lit garden path at night" loading="lazy" />
              <div className="ambiance-card-label">Lantern Evenings</div>
            </div>
            <div className="ambiance-card reveal delay-2">
              <img src={IMG.ambiance3} alt="George Town heritage street" loading="lazy" />
              <div className="ambiance-card-label">Jalan Gurdwara</div>
            </div>
            <div className="ambiance-card reveal delay-3">
              <img src={IMG.ambiance4} alt="Cozy café seating area" loading="lazy" />
              <div className="ambiance-card-label">The Corner Table</div>
            </div>
            <div className="ambiance-card reveal delay-4">
              <img src={IMG.ambiance5} alt="Osmanthus tea in warm light" loading="lazy" />
              <div className="ambiance-card-label">Osmanthus Tea</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curve divider reverse */}
      <div className="curve-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,0 L0,0 Z" fill="#2c2825" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════
          MENU SECTION
      ════════════════════════════════════════ */}
      <section id="menu" className="menu" aria-labelledby="menu-heading">
        <div className="menu-inner">
          <div className="menu-header">
            <div className="section-eyebrow reveal">Our Menu</div>
            <h2 id="menu-heading" className="section-title reveal delay-1">
              Dishes that carry<br /><em>memory home</em>
            </h2>
            <p className="section-subtitle reveal delay-2" style={{ margin: '16px auto 0', textAlign: 'center' }}>
              Every dish on our menu is rooted in the flavours of Taiwan — 
              from Shilin night markets to grandmother's kitchen.
            </p>
            <div className="menu-tabs reveal delay-3" role="tablist" aria-label="Menu categories">
              {(['mains', 'snacks', 'desserts'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`menu-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                >
                  {tab === 'mains' ? '🍚 Mains' : tab === 'snacks' ? '🥢 Snacks' : '🍡 Desserts'}
                </button>
              ))}
            </div>
          </div>

          <div
            key={activeTab}
            id={`panel-${activeTab}`}
            className="menu-panel active"
            role="tabpanel"
            aria-label={activeTab}
          >
            {menuData[activeTab].map((dish, i) => (
              <article
                key={dish.id}
                className={`dish-card${dish.featured ? ' featured' : ''} reveal delay-${Math.min(i + 1, 6) as 1}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="dish-img">
                  <img src={dish.img} alt={dish.name} loading="lazy" />
                  {dish.badge && <span className="dish-badge">{dish.badge}</span>}
                </div>
                <div className="dish-body">
                  <div className="dish-tag">{dish.tag}</div>
                  <h3 className="dish-name">{dish.name}</h3>
                  <div className="dish-name-zh">{dish.nameZh}</div>
                  <p className="dish-desc">{dish.desc}</p>
                  <div className="dish-price">
                    {dish.price} <small>· SST inclusive</small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Menu note */}
          <p className="reveal" style={{
            textAlign: 'center',
            marginTop: '40px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            color: 'var(--charcoal-light)',
            fontStyle: 'italic',
          }}>
            🏮 Menu changes seasonally · Cash, card & Touch'n Go accepted · Non-Halal
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SIGNATURE HIGHLIGHT
      ════════════════════════════════════════ */}
      <section id="signature" className="signature" aria-labelledby="sig-heading">
        <div className="signature-inner">
          <div className="signature-text">
            <div className="section-eyebrow reveal">Signature Dish</div>
            <h2 id="sig-heading" className="section-title reveal delay-1">
              The soul of<br />
              Osmanthus <em>Alley</em>
            </h2>
            <p className="reveal delay-2">
              Every great restaurant has a dish that defines it — one that captures its 
              entire spirit in a single bowl. At Osmanthus Alley, that dish is the 
              <strong style={{ color: 'var(--gold-light)' }}> Gui Hua Braised Pork Rice (桂花鹵肉飯)</strong>.
            </p>
            <p className="reveal delay-3">
              Slow-cooked for hours in an osmanthus-kissed soy brine, the pork belly 
              becomes impossibly tender — lacquered, fragrant, and deeply savoury. 
              Served over steamed jasmine rice with a soy-marinated egg and tangy pickles, 
              it is the kind of dish that brings Taiwanese aunties to tears of recognition.
            </p>
            <div className="signature-features reveal delay-3">
              <div className="signature-feat">
                <span className="signature-feat-icon">🌸</span>
                <div className="signature-feat-text">
                  <h4>Osmanthus-Infused Braise</h4>
                  <p>Real osmanthus flowers steeped into the braising liquid for a subtle floral depth.</p>
                </div>
              </div>
              <div className="signature-feat">
                <span className="signature-feat-icon">⏰</span>
                <div className="signature-feat-text">
                  <h4>Slow-Cooked Daily</h4>
                  <p>The master stock is prepared fresh each morning, never shortcuts taken.</p>
                </div>
              </div>
              <div className="signature-feat">
                <span className="signature-feat-icon">🏡</span>
                <div className="signature-feat-text">
                  <h4>Family Recipe</h4>
                  <p>A recipe passed down through the family, refined over five years of service.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="signature-visual reveal-right delay-2">
            <div className="signature-img-wrap">
              <img src={IMG.signatureDish} alt="Gui Hua Braised Pork Rice — the signature dish of Osmanthus Alley" loading="lazy" />
              <div className="signature-img-overlay" />
              <div className="signature-dish-name">
                <h3>Gui Hua Braised Pork Rice</h3>
                <p>桂花鹵肉飯</p>
              </div>
            </div>
            <div className="signature-float-card">
              <div className="num">RM</div>
              <div className="lbl">From 16.80</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          REVIEWS SECTION
      ════════════════════════════════════════ */}
      <section id="reviews" className="reviews" aria-labelledby="reviews-heading">
        <div className="reviews-inner">
          <div className="reviews-header">
            <div className="section-eyebrow reveal">What Diners Say</div>
            <h2 id="reviews-heading" className="section-title reveal delay-1">
              Voices from the <em>alley</em>
            </h2>
            <p className="section-subtitle reveal delay-2" style={{ margin: '16px auto 0', textAlign: 'center' }}>
              Over 200 reviews across Google, Trip.com and food blogs — here's what keeps people coming back.
            </p>
          </div>
          <div className="reviews-track-wrap reveal delay-3" aria-label="Customer reviews carousel">
            <div className="reviews-track" role="list">
              {[...reviews, ...reviews].map((r, i) => (
                <article key={i} className="review-card" role="listitem">
                  <div className="review-stars" aria-label={`${r.stars} stars`}>
                    {Array.from({ length: r.stars }).map((_, si) => (
                      <span key={si} aria-hidden="true">★</span>
                    ))}
                  </div>
                  <p className="review-text">"{r.text}"</p>
                  <div className="review-author">
                    <div className="review-avatar" aria-hidden="true">{r.initials}</div>
                    <div className="review-author-info">
                      <div className="review-name">{r.author}</div>
                      <div className="review-meta">{r.meta}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VISIT SECTION
      ════════════════════════════════════════ */}
      <section id="visit" className="visit" aria-labelledby="visit-heading">
        <div className="visit-inner">
          <div className="visit-info">
            <div className="section-eyebrow reveal">Plan Your Visit</div>
            <h2 id="visit-heading" className="section-title reveal delay-1">
              Come find us<br />in the <em>alley</em>
            </h2>
            <p className="section-subtitle reveal delay-2" style={{ marginTop: '16px', marginBottom: '0' }}>
              Tucked within the artful enclave of Hin Bus Depot — accessible from both 
              Jalan Gurdwara and the Hin Sunday Market entrance.
            </p>

            {/* Opening Hours */}
            <div className="hours-grid reveal delay-3" role="table" aria-label="Opening hours">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className="hours-row"
                  role="row"
                >
                  <span
                    className={`hours-day${h.day === todayName ? ' today' : ''}`}
                    role="cell"
                  >
                    {h.day}
                    {h.day === todayName && (
                      <span style={{ marginLeft: '8px', fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 600 }}>
                        Today
                      </span>
                    )}
                  </span>
                  <span
                    className={h.closed ? 'hours-closed' : 'hours-time'}
                    role="cell"
                  >
                    {h.closed ? 'Closed' : h.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Cards */}
            <div className="contact-cards reveal delay-4">
              <a href="tel:+601111812722" className="contact-card" aria-label="Call us">
                <div className="contact-card-icon">📞</div>
                <div className="contact-card-text">
                  <div className="contact-card-label">Phone</div>
                  <div className="contact-card-value">+60 11-1181 2722</div>
                </div>
              </a>
              <a
                href="https://maps.app.goo.gl/oipckGYjgVFssrnX9"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                aria-label="Get directions on Google Maps"
              >
                <div className="contact-card-icon">📍</div>
                <div className="contact-card-text">
                  <div className="contact-card-label">Address</div>
                  <div className="contact-card-value">59 Jalan Gurdwara, 10300 George Town, Penang</div>
                </div>
              </a>
              <a
                href="https://www.facebook.com/people/Osmanthus-Alley-Restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
                aria-label="Visit our Facebook page"
              >
                <div className="contact-card-icon">📘</div>
                <div className="contact-card-text">
                  <div className="contact-card-label">Facebook</div>
                  <div className="contact-card-value">Osmanthus Alley Restaurant</div>
                </div>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="visit-map reveal-right delay-2">
            <div className="map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.0!2d100.3282039!3d5.4119116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac3cecf63332b%3A0x57fa770641ff36d!2sOsmanthus%20Alley%20Restaurant!5e0!3m2!1sen!2smy!4v1"
                title="Osmanthus Alley Restaurant on Google Maps"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay-card">
                <span className="map-pin" aria-hidden="true">🏮</span>
                <div className="map-address-text">
                  <div className="map-address-name">Osmanthus Alley 桂花巷</div>
                  <div className="map-address-sub">59 Jalan Gurdwara, Hin Bus Depot · George Town, Penang</div>
                </div>
                <a
                  href="https://maps.app.goo.gl/oipckGYjgVFssrnX9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-directions-btn"
                  aria-label="Get directions"
                >
                  Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-en">Osmanthus Alley</div>
            <div className="footer-logo-zh">桂花巷</div>
            <p className="footer-desc">
              Authentic Taiwanese dining in the heart of George Town, Penang. 
              Where every dish is a quiet walk through a fragrant alley in Taiwan.
            </p>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/people/Osmanthus-Alley-Restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                f
              </a>
              <a href="tel:+601111812722" aria-label="Phone">📞</a>
              <a
                href="https://maps.app.goo.gl/oipckGYjgVFssrnX9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
              >
                📍
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              {[
                { label: 'Our Story', id: 'story' },
                { label: 'The Ambiance', id: 'ambiance' },
                { label: 'Menu', id: 'menu' },
                { label: 'Signature Dish', id: 'signature' },
                { label: 'Visit Us', id: 'visit' },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-col">
            <h4>Opening Hours</h4>
            <ul className="footer-hours-list">
              <li className="closed">
                <span>Monday</span>
                <span>Closed</span>
              </li>
              <li>
                <span>Tue – Sun</span>
                <span>11AM – 9PM</span>
              </li>
              <li style={{ marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>📍 59 Jalan Gurdwara</span>
              </li>
              <li>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Hin Bus Depot · George Town</span>
              </li>
              <li>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>Penang 10300, Malaysia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Osmanthus Alley Restaurant 桂花巷 · George Town, Penang
          </p>
          <div className="footer-legal">
            <a href="tel:+601111812722">+60 11-1181 2722</a>
            <a
              href="https://maps.app.goo.gl/oipckGYjgVFssrnX9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="footer-tagline">
          "Where every alley holds a story, and every story begins at the table." — 桂花巷
        </div>
      </footer>
    </>
  );
}
