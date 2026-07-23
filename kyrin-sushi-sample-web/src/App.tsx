import { useEffect, useRef, useState } from 'react';
import './index.css';

const IMAGES = {
  hero: 'https://images.pexels.com/photos/28701154/pexels-photo-28701154.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920',
  heroCard1: 'https://images.pexels.com/photos/28701107/pexels-photo-28701107.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
  heroCard2: 'https://images.pexels.com/photos/9424910/pexels-photo-9424910.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600',
  philosophy1: 'https://images.pexels.com/photos/8951147/pexels-photo-8951147.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
  philosophy2: 'https://images.pexels.com/photos/8951104/pexels-photo-8951104.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
  philosophy3: 'https://images.pexels.com/photos/28701157/pexels-photo-28701157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500',
  menu1: 'https://images.pexels.com/photos/28701107/pexels-photo-28701107.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu2: 'https://images.pexels.com/photos/10692543/pexels-photo-10692543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu3: 'https://images.pexels.com/photos/34759445/pexels-photo-34759445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu4: 'https://images.pexels.com/photos/28559517/pexels-photo-28559517.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu5: 'https://images.pexels.com/photos/31393431/pexels-photo-31393431.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu6: 'https://images.pexels.com/photos/34992219/pexels-photo-34992219.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu7: 'https://images.pexels.com/photos/37290960/pexels-photo-37290960.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu8: 'https://images.pexels.com/photos/36317046/pexels-photo-36317046.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  menu9: 'https://images.pexels.com/photos/24186433/pexels-photo-24186433.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800',
  chef: 'https://images.pexels.com/photos/8951181/pexels-photo-8951181.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700',
  exp1: 'https://images.pexels.com/photos/28701153/pexels-photo-28701153.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
  exp2: 'https://images.pexels.com/photos/28460863/pexels-photo-28460863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
  exp3: 'https://images.pexels.com/photos/33269326/pexels-photo-33269326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=600',
  hours: 'https://images.pexels.com/photos/8951307/pexels-photo-8951307.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=700',
};

interface MenuItem {
  name: string;
  nameJp: string;
  desc: string;
  price: string;
  tag: string;
  img: string;
}

interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'sushi',
    label: 'Sushi & Nigiri',
    items: [
      {
        name: 'Chirashi Don',
        nameJp: 'Chirashi Don',
        desc: "Kyrin's signature chirashi bowl crowned with uni, scallops, and premium sashimi over seasoned shari rice. A celebration of the sea in every bite.",
        price: 'RM 45',
        tag: 'Signature',
        img: IMAGES.menu1,
      },
      {
        name: 'Tobikko Gunkan',
        nameJp: 'Flying Fish Roe Gunkan',
        desc: 'Generously heaped flying fish roe gunkan -- more tobikko than rice, a pure burst of ocean sweetness with every mouthful.',
        price: 'RM 18',
        tag: 'Fan Favourite',
        img: IMAGES.menu2,
      },
      {
        name: 'Avocado Sushi',
        nameJp: 'Avocado Nigiri',
        desc: 'Velvety avocado draped over perfectly seasoned sushi rice, topped with a whisper of sesame and ponzu. Consistently praised as a guest favourite.',
        price: 'RM 14',
        tag: 'Bestseller',
        img: IMAGES.menu3,
      },
    ],
  },
  {
    id: 'sashimi',
    label: 'Sashimi',
    items: [
      {
        name: 'Assorted Sashimi Platter',
        nameJp: 'Moriawase Sashimi',
        desc: "Chef's choice of five premium cuts -- salmon, tuna, shiro maguro, scallop, and yellowtail -- served with house-pickled ginger and wasabi.",
        price: 'RM 68',
        tag: "Chef's Pick",
        img: IMAGES.menu4,
      },
      {
        name: 'Salmon Sashimi',
        nameJp: 'Shake Sashimi',
        desc: 'Plump slices of ocean-fresh Norwegian salmon, chilled to perfection, delivering that melt-in-mouth sweetness Japanese cuisine is celebrated for.',
        price: 'RM 32',
        tag: 'Premium',
        img: IMAGES.menu1,
      },
      {
        name: 'Uni Ikura Oyster Shot',
        nameJp: 'Uni Ikura Kaki',
        desc: 'Raw oyster crowned with sea urchin and ikura, drenched in citrus ponzu. A supremely exquisite and daring tasting experience.',
        price: 'RM 28',
        tag: 'Rare Find',
        img: IMAGES.menu4,
      },
    ],
  },
  {
    id: 'maki',
    label: 'Maki & Rolls',
    items: [
      {
        name: 'Shake Tataki Maki',
        nameJp: 'Yaki Salmon Roll',
        desc: 'Flame-seared salmon roll with avocado and ebikko, drizzled in the chef\'s signature citrus sauce. Bold, refined, and utterly satisfying.',
        price: 'RM 26',
        tag: 'House Special',
        img: IMAGES.menu3,
      },
      {
        name: 'Unagi Tataki Maki',
        nameJp: 'Eel Maki Roll',
        desc: 'Seared unagi and creamy avocado rolled with seasoned rice and nori, finished with teriyaki glaze. Intensely rich and deeply comforting.',
        price: 'RM 29',
        tag: 'Must Try',
        img: IMAGES.menu8,
      },
      {
        name: 'Ebikko Hana Maki',
        nameJp: 'Shrimp Roe Flower Roll',
        desc: 'Delicate prawns and shrimp roe wrapped in a flower roll -- a lighter, more nuanced choice beloved by returning regulars.',
        price: 'RM 22',
        tag: 'Beloved Classic',
        img: IMAGES.menu2,
      },
    ],
  },
  {
    id: 'yakimono',
    label: 'Yakimono',
    items: [
      {
        name: 'Unagi Kabayaki',
        nameJp: 'Grilled Eel Kabayaki',
        desc: 'Masterfully grilled eel glazed with sweet soy tare, caramelised to a lacquered finish. Served with chawanmushi, sashimi, miso soup and white rice.',
        price: 'RM 69',
        tag: "Chef's Table",
        img: IMAGES.menu7,
      },
      {
        name: 'Hotate Mentai Yaki',
        nameJp: 'Grilled Scallop with Cod Roe',
        desc: 'Grilled Hokkaido scallop baked with spicy mentaiko cod roe, finished with a touch of seaweed and roe -- naturally sweet, subtly spiced.',
        price: 'RM 26',
        tag: 'Premium',
        img: IMAGES.menu1,
      },
      {
        name: 'Aburi Gyuniku',
        nameJp: 'Flame-Seared Beef',
        desc: 'Seared beef slices seasoned with sea salt, cracked pepper, and house-crafted garlic butter. An elegant land-and-flame encounter.',
        price: 'RM 22',
        tag: 'New',
        img: IMAGES.menu8,
      },
    ],
  },
  {
    id: 'noodles',
    label: 'Ramen & Noodles',
    items: [
      {
        name: 'Kirin Ramen',
        nameJp: 'Kyrin Signature Ramen',
        desc: "Kyrin's signature tonkotsu-inspired ramen -- rich, layered broth simmered for hours, topped with chashu, soft-boiled egg, and fresh scallions.",
        price: 'RM 28',
        tag: 'Signature',
        img: IMAGES.menu5,
      },
      {
        name: 'Cha Soba',
        nameJp: 'Green Tea Soba',
        desc: 'Chilled green tea soba noodles served with dashi dipping broth, grated daikon, and mountain wasabi. Cool, elegant, and refreshing.',
        price: 'RM 20',
        tag: 'Seasonal',
        img: IMAGES.menu9,
      },
      {
        name: 'Kaisen Kimchi Nabe',
        nameJp: 'Seafood Kimchi Hotpot',
        desc: 'A warming seafood and kimchi hotpot brimming with fresh ocean treasures -- prawns, clams, tofu, and mushrooms in a fiery kombu broth.',
        price: 'RM 52',
        tag: 'For 2',
        img: IMAGES.menu5,
      },
    ],
  },
  {
    id: 'sets',
    label: 'Bento & Sets',
    items: [
      {
        name: 'Unagi Kabayaki Bento',
        nameJp: 'Eel Bento Set',
        desc: 'The jewel of the bento menu -- grilled eel over seasoned rice, accompanied by chawanmushi, six slices of fresh sashimi, miso soup, salad, and seasonal fruit.',
        price: 'RM 69',
        tag: 'Signature Set',
        img: IMAGES.menu6,
      },
      {
        name: 'Set Lunch (Weekdays)',
        nameJp: 'Weekday Lunch Set',
        desc: 'Daily lunch sets featuring your choice of main -- katsu, teriyaki, or grilled fish -- paired with six sashimi slices, chawanmushi, salad, soup, and fruit.',
        price: 'From RM 28',
        tag: '20% Off',
        img: IMAGES.menu7,
      },
      {
        name: 'Katsu Curry Set',
        nameJp: 'Katsu Kare Setto',
        desc: 'Japanese golden curry poured over a crispy, panko-crusted cutlet with Japanese rice. Heartwarming, deeply flavoured, and endlessly satisfying.',
        price: 'RM 25',
        tag: 'Guest Favourite',
        img: IMAGES.menu6,
      },
    ],
  },
];

interface Testimonial {
  text: string;
  author: string;
  meta: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    text: "I never do reviews but this restaurant is one of the things I'll miss most about Penang. Visited twice already -- loved everything I ordered, especially the katsu curry and pork gyoza. The servers were amazing, kind, and quick. I'm returning again tomorrow on my last day!",
    author: 'Jenna S.',
    meta: 'Tourist from Overseas',
    rating: 5,
  },
  {
    text: 'This restaurant offers an excellent culinary experience. The sashimi, tuna, pork belly, and rolls were all delicious. The host\'s off-menu recommendations added a truly special touch. If you\'re seeking an intimate and exciting dining experience, this is the place to go.',
    author: 'John V.',
    meta: 'Verified Diner',
    rating: 5,
  },
  {
    text: "Great sushi, great service. An extensive menu with lots of different options -- and a full sake menu too. The food was all really tasty and the price was reasonable. Unlimited green tea refills, attentive staff, and a beautifully decorated interior.",
    author: 'Prudence L.',
    meta: 'Regular Guest',
    rating: 5,
  },
  {
    text: "My go-to place in Georgetown for Japanese cuisine. The Kyrin Chirashi Don with uni is extraordinary, and the Kaisen Kimchi Nabe is deeply comforting. The service is excellent -- friendly staff always with a smile. The decor is beautiful.",
    author: 'Hafez S.',
    meta: 'Local Food Critic',
    rating: 5,
  },
  {
    text: 'Quiet restaurant, very clean. Exquisite food and excellent treatment. Many options in the menu and promotions. Air conditioning was phenomenal. Worth every visit. Recommended 100%.',
    author: 'Estibaliz P.',
    meta: 'Tripadvisor Guest',
    rating: 5,
  },
  {
    text: 'Strategically located at the Jalan Gurdwara junction. The service keeps topping up your green tea throughout the meal. The premium sashimi rivalled those at finer Japanese dining establishments -- at refreshingly honest prices.',
    author: 'Karen C.',
    meta: 'Returning Guest',
    rating: 5,
  },
];

const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Menu', href: '#menu' },
  { label: 'Experience', href: '#experience' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Visit', href: '#location' },
];

const HOURS_DATA = [
  { day: 'Monday', time: '11:30 am -- 2:15 pm  |  6:00 pm -- 10:00 pm' },
  { day: 'Tuesday', time: '11:30 am -- 2:15 pm  |  6:00 pm -- 10:00 pm' },
  { day: 'Wednesday', time: '11:30 am -- 2:15 pm  |  6:00 pm -- 10:00 pm' },
  { day: 'Thursday', time: '11:30 am -- 2:15 pm  |  6:00 pm -- 10:00 pm' },
  { day: 'Friday', time: '11:30 am -- 2:15 pm  |  6:00 pm -- 10:00 pm' },
  { day: 'Saturday', time: '11:30 am -- 10:00 pm (Continuous)' },
  { day: 'Sunday', time: '11:30 am -- 10:00 pm (Continuous)' },
];

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sushi');
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  useEffect(() => {
    const timer = setTimeout(() => setLoadingDone(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const btn = document.getElementById('scroll-top-btn');
      if (btn) {
        btn.classList.toggle('visible', window.scrollY > 500);
      }
      if (heroBgRef.current) {
        const offset = window.scrollY * 0.3;
        heroBgRef.current.style.transform = `scale(1.05) translateY(${offset}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loadingDone, activeTab]);

  useEffect(() => {
    if (isMobile) return;
    let rafId: number;
    let ringX = -100;
    let ringY = -100;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = x + 'px';
        cursorDotRef.current.style.top = y + 'px';
      }
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        ringX += (x - ringX) * 0.12;
        ringY += (y - ringY) * 0.12;
        if (cursorRingRef.current) {
          cursorRingRef.current.style.left = ringX + 'px';
          cursorRingRef.current.style.top = ringY + 'px';
        }
      });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const h = t.closest('a, button, .menu-card, .testimonial-card, .exp-card, .chef-feature-item');
      setIsHovering(!!h);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileNavOpen(false);
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visibleTestimonials = TESTIMONIALS.slice(testimonialPage * perPage, (testimonialPage + 1) * perPage);
  // Menu items are rendered via full category map below

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      'Thank you! Your reservation request has been received.\nWe will confirm via phone shortly.\n\nFor immediate assistance, please call +60 4-226 3315.'
    );
  };

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />

      {!isMobile && (
        <>
          <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
          <div ref={cursorRingRef} className={`cursor-ring${isHovering ? ' cursor-hover' : ''}`} aria-hidden="true" />
        </>
      )}

      <div className={`loading-screen${loadingDone ? ' hidden' : ''}`} aria-hidden="true">
        <div className="loading-kanji">&#x9E92;</div>
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
        <p className="loading-text">Kyrin Sushi &middot; Georgetown</p>
      </div>

      <button
        id="scroll-top-btn"
        className="scroll-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        &#8593;
      </button>

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <a href="#hero" className="nav-logo" onClick={handleNavClick} aria-label="Kyrin Sushi home">
          <div className="nav-logo-emblem">
            <span className="nav-logo-kanji">&#x9E92;</span>
          </div>
          <div className="nav-logo-text">
            <span className="nav-logo-name">Kyrin Sushi</span>
            <span className="nav-logo-sub">Georgetown &middot; Penang</span>
          </div>
        </a>

        <ul className="nav-links" role="list">
          {NAV_LINKS.map((nl) => (
            <li key={nl.href} className="nav-link-item">
              <a href={nl.href} className="nav-link" onClick={handleNavClick}>{nl.label}</a>
            </li>
          ))}
        </ul>

        <a href="#reservation" className="nav-cta" onClick={handleNavClick}>
          Reserve a Table
        </a>

        <button
          className={`hamburger${mobileNavOpen ? ' open' : ''}`}
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileNavOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE NAV */}
      <div className={`mobile-nav${mobileNavOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        {NAV_LINKS.map((nl) => (
          <a key={nl.href} href={nl.href} className="mobile-nav-link" onClick={handleNavClick}>
            {nl.label}
          </a>
        ))}
        <a href="#reservation" className="mobile-nav-link" onClick={handleNavClick}>Reserve</a>
        <div className="mobile-nav-contact">
          <a href="tel:+60422263315" className="mobile-nav-phone">+60 4-226 3315</a>
        </div>
      </div>

      {/* HERO */}
      <section id="hero" aria-label="Welcome to Kyrin Sushi">
        <div className="hero-bg">
          <img
            ref={heroBgRef}
            src={IMAGES.hero}
            alt="Premium sushi platter at Kyrin Sushi Georgetown"
            className="hero-bg-img"
            loading="eager"
            onLoad={(e) => e.currentTarget.classList.add('loaded')}
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-grid-lines" aria-hidden="true" />
        </div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-label">
              <div className="hero-label-line" aria-hidden="true" />
              <span className="hero-label-text">Georgetown &middot; Penang &middot; Est. 2019</span>
            </div>

            <h1 className="hero-title">
              Where Japan<br />
              Meets <em>Penang</em>
            </h1>

            <p className="hero-subtitle">&#x6599;&#x7406;&#x306E;&#x82B8;&#x8853; &mdash; The Art of Cuisine</p>

            <p className="hero-desc">
              Nestled in the heart of Georgetown, Kyrin Sushi brings you an authentic
              Japanese dining experience crafted with the finest fresh ingredients, masterful
              technique, and the warmth of genuine Malaysian hospitality.
            </p>

            <div className="hero-actions">
              <a href="#menu" className="btn-primary" onClick={handleNavClick}>
                <span>Explore Our Menu</span>
              </a>
              <a href="#reservation" className="btn-ghost" onClick={handleNavClick}>
                Reserve a Table
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">4.5&#9733;</div>
                <div className="hero-stat-label">Guest Rating</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">950+</div>
                <div className="hero-stat-label">Reviews</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">60+</div>
                <div className="hero-stat-label">Menu Items</div>
              </div>
            </div>
          </div>

          <div className="hero-right" aria-hidden="true">
            <div className="hero-card">
              <img src={IMAGES.heroCard1} alt="Fresh sashimi platter" loading="eager" />
              <div className="hero-card-overlay">
                <div className="hero-card-sublabel">Signature</div>
                <div className="hero-card-label">Sashimi Selection</div>
              </div>
            </div>
            <div className="hero-card">
              <img src={IMAGES.heroCard2} alt="Chef at sushi bar" loading="eager" />
              <div className="hero-card-overlay">
                <div className="hero-card-sublabel">Craftsmanship</div>
                <div className="hero-card-label">Omakase Style</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator" aria-hidden="true">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" aria-label="Our philosophy">
        <div className="philosophy-inner">
          <div className="reveal-left">
            <div className="section-label">
              <div className="section-label-line" aria-hidden="true" />
              <span className="section-label-text">Our Philosophy</span>
            </div>
            <p className="section-num">01 / 06</p>
            <h2 className="section-title">
              A Taste of Japan<br />
              with a <em>Malaysian Soul</em>
            </h2>

            <blockquote className="philosophy-quote">
              <p>
                &ldquo;We are dedicated to bringing you a taste of Japan with a Malaysian twist,
                made with fresh ingredients, skilled craftsmanship, and a warm, welcoming atmosphere.&rdquo;
              </p>
              <cite>&mdash; Kyrin Sushi, Georgetown</cite>
            </blockquote>

            <p className="section-body">
              At Kyrin Sushi, our culinary philosophy begins with a deep respect for ingredients.
              Located at the prominent corner of Jalan Gurdwara in the heart of Georgetown, we occupy
              a beautiful glass-walled space where the city's energy flows around you while you savour
              our meticulously prepared Japanese cuisine.
            </p>
            <p className="section-body">
              What sets us apart is an unwavering dedication to the freshness of our seafood -- the
              cornerstone of authentic Japanese dining. From plump salmon sashimi to delicate uni
              ikura oyster shots, each dish reflects Japan's culinary excellence and our chefs'
              commitment to quality that rivals far more expensive establishments.
            </p>

            <div className="section-divider">
              <div className="divider-line" aria-hidden="true" />
              <span className="divider-ornament">&#10022;</span>
              <div className="divider-line" aria-hidden="true" />
            </div>

            <a href="#menu" className="btn-ghost" onClick={handleNavClick}>
              Discover Our Menu
            </a>
          </div>

          <div className="philosophy-img-grid reveal-right">
            <div className="philosophy-img-wrap">
              <img src={IMAGES.philosophy1} alt="Chef preparing sushi with precision" loading="lazy" />
              <div className="philosophy-badge" aria-label="Established 2019 Georgetown">
                <span className="philosophy-badge-num">&#9733;</span>
                <span className="philosophy-badge-text">Est. 2019<br />Georgetown</span>
              </div>
            </div>
            <div className="philosophy-img-wrap">
              <img src={IMAGES.philosophy2} alt="Fresh salmon sushi preparation" loading="lazy" />
            </div>
            <div className="philosophy-img-wrap">
              <img src={IMAGES.philosophy3} alt="Beautifully plated sushi and sashimi" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" aria-label="Our menu">
        <div className="menu-bg-text" aria-hidden="true">&#x732E;&#x7ACB;</div>
        <div className="menu-inner">
          <div className="menu-header">
            <div className="reveal">
              <div className="section-label">
                <div className="section-label-line" aria-hidden="true" />
                <span className="section-label-text">The Menu</span>
              </div>
              <p className="section-num" style={{ color: 'rgba(245,240,232,0.3)' }}>02 / 06</p>
              <h2 className="section-title">
                Crafted with<br />
                <em style={{ color: 'var(--gold)' }}>Seasonal Freshness</em>
              </h2>
            </div>
            <div className="menu-header-right reveal reveal-delay-2">
              <p>
                Every dish at Kyrin Sushi is prepared with meticulous attention to quality
                and flavour, honouring Japanese culinary traditions while embracing
                the vibrant spirit of Penang's dining culture.
              </p>
            </div>
          </div>

          <div className="menu-tabs" role="tablist" aria-label="Menu categories">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`menu-tab${activeTab === cat.id ? ' active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
                role="tab"
                aria-selected={activeTab === cat.id}
                aria-controls={`panel-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {MENU_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={`panel-${cat.id}`}
              role="tabpanel"
              className={`menu-grid${activeTab === cat.id ? ' active' : ''}`}
              aria-label={cat.label}
            >
              {cat.items.map((item, i) => (
                <article
                  key={item.name}
                  className={`menu-card reveal reveal-delay-${i + 1}`}
                  tabIndex={0}
                  aria-label={`${item.name} -- ${item.price}`}
                >
                  <div className="menu-card-img">
                    <img src={item.img} alt={item.name} loading="lazy" />
                    <div className="menu-card-img-overlay" aria-hidden="true" />
                    {item.tag && (
                      <div className="menu-card-badge">{item.tag}</div>
                    )}
                  </div>
                  <div className="menu-card-body">
                    <h3 className="menu-card-name">{item.name}</h3>
                    <span className="menu-card-name-jp">{item.nameJp}</span>
                    <p className="menu-card-desc">{item.desc}</p>
                    <div className="menu-card-footer">
                      <div className="menu-card-price">
                        {item.price} <span>per serving</span>
                      </div>
                      <div className="menu-card-arrow" aria-hidden="true">&#8594;</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}

          <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--stone)', letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: 300 }}>
              Prices are subject to change. Please confirm with our team for the latest menu.
            </p>
            <a href="#reservation" className="btn-primary" onClick={handleNavClick}>
              <span>Reserve Your Table</span>
            </a>
          </div>
        </div>
      </section>

      {/* CHEF */}
      <section id="chef" aria-label="Chef's selection">
        <div className="chef-inner">
          <div className="reveal">
            <div className="section-label">
              <div className="section-label-line" aria-hidden="true" />
              <span className="section-label-text">Chef's Selection</span>
            </div>
            <p className="section-num">03 / 06</p>
            <h2 className="section-title">
              The Art of<br />
              <em>Japanese Craft</em>
            </h2>
          </div>

          <div className="chef-layout">
            <div className="chef-visual reveal-left">
              <img src={IMAGES.chef} alt="Chef crafting sushi with precision and artistry" className="chef-img" loading="lazy" />
              <div className="chef-visual-overlay" aria-hidden="true" />
              <div className="chef-visual-caption" aria-hidden="true">
                <p>&#x5320;</p>
              </div>
            </div>

            <div className="chef-content reveal-right">
              <p className="section-body" style={{ color: 'var(--stone)' }}>
                Our chefs combine years of technical mastery with an intuitive understanding
                of the finest seasonal ingredients -- resulting in dishes that are as visually
                striking as they are deeply flavourful.
              </p>

              <div className="chef-feature-items">
                {[
                  {
                    num: '01',
                    title: 'Freshness Above All',
                    desc: 'Every morning, our team selects only the finest seafood to ensure that what arrives at your table is at the absolute peak of freshness.',
                    tag: 'Daily Selection',
                  },
                  {
                    num: '02',
                    title: 'Sashimi Mastery',
                    desc: 'A significant portion of our menu celebrates premium sashimi -- from shiro maguro to uni ikura oyster shots -- prepared with surgical precision.',
                    tag: 'Premium Cuts',
                  },
                  {
                    num: '03',
                    title: 'Off-Menu Discoveries',
                    desc: "Ask our host about daily chef's recommendations -- special off-menu preparations that elevate your dining experience into something truly memorable.",
                    tag: 'Ask Your Host',
                  },
                  {
                    num: '04',
                    title: 'Elegant Presentation',
                    desc: "Kyrin's dishes are meticulously presented in fine ceramic ware, embodying the Japanese principle that dining begins with the eyes.",
                    tag: 'Table Aesthetics',
                  },
                ].map((feat) => (
                  <div key={feat.num} className="chef-feature-item" tabIndex={0}>
                    <span className="chef-feature-num">{feat.num}</span>
                    <div className="chef-feature-text">
                      <h4>{feat.title}</h4>
                      <p>{feat.desc}</p>
                      <span className="chef-feature-tag">&middot; {feat.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" aria-label="The Kyrin experience">
        <div className="experience-inner">
          <div className="experience-header reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>
              <div className="section-label-line" aria-hidden="true" />
              <span className="section-label-text">The Experience</span>
              <div className="section-label-line" aria-hidden="true" />
            </div>
            <p className="section-num" style={{ color: 'rgba(245,240,232,0.3)', textAlign: 'center' }}>04 / 06</p>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              More Than a Meal --<br />
              <em>An Unfolding Journey</em>
            </h2>
            <p className="section-body" style={{ textAlign: 'center' }}>
              From the moment you step through our glass doors at the corner of Jalan Gurdwara,
              every detail of your visit is crafted to transport you to the refined world of
              Japanese hospitality.
            </p>
          </div>

          <div className="experience-cards">
            {[
              {
                num: '01',
                title: 'Panoramic Ambience',
                desc: 'Our glass-walled corner lot offers a sweeping view of the Dato Keramat and Jalan Gurdwara junction -- the perfect backdrop for a refined meal.',
                img: IMAGES.exp1,
              },
              {
                num: '02',
                title: 'Intimate Setting',
                desc: 'With fewer than 12 tables and a dedicated sushi bar, our intimate space ensures every guest receives attentive, personalised service throughout their visit.',
                img: IMAGES.exp2,
              },
              {
                num: '03',
                title: 'Sake & Beverages',
                desc: 'Complement your meal with our curated sake selection, freshly crafted fruit juice cocktails, or endless refills of premium green tea -- a Kyrin hallmark.',
                img: IMAGES.exp3,
              },
            ].map((card, i) => (
              <article
                key={card.num}
                className={`exp-card reveal reveal-delay-${i + 1}`}
                tabIndex={0}
                aria-label={card.title}
              >
                <img src={card.img} alt={card.title} loading="lazy" />
                <div className="exp-card-overlay" aria-hidden="true" />
                <div className="exp-card-content">
                  <p className="exp-card-num">{card.num}</p>
                  <h3 className="exp-card-title">{card.title}</h3>
                  <p className="exp-card-desc">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" aria-label="Guest reviews">
        <div className="testimonials-inner">
          <div className="testimonials-header reveal">
            <div>
              <div className="section-label">
                <div className="section-label-line" aria-hidden="true" />
                <span className="section-label-text">Guest Reviews</span>
              </div>
              <p className="section-num">05 / 06</p>
              <h2 className="section-title">
                Stories from<br />
                <em>Our Table</em>
              </h2>
            </div>
            <div className="rating-display" aria-label="Average rating 4.5 from 950 reviews">
              <div className="rating-stars" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="rating-star">&#9733;</span>
                ))}
              </div>
              <div className="rating-num">4.5</div>
              <div className="rating-count">950+ Reviews &middot; Google</div>
            </div>
          </div>

          <div className="testimonials-track-wrap">
            <div className="testimonials-track" role="list" aria-label="Guest testimonials">
              {visibleTestimonials.map((t, i) => (
                <article
                  key={`${testimonialPage}-${i}`}
                  className={`testimonial-card reveal reveal-delay-${i + 1}`}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`Review by ${t.author}`}
                >
                  <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <span key={s} className="testimonial-star" aria-hidden="true">&#9733;</span>
                    ))}
                  </div>
                  <blockquote className="testimonial-text">&ldquo;{t.text}&rdquo;</blockquote>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" aria-hidden="true">{t.author.charAt(0)}</div>
                    <div>
                      <div className="testimonial-name">{t.author}</div>
                      <div className="testimonial-meta">{t.meta}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="testimonials-nav" role="group" aria-label="Review navigation">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`testimonials-dot${testimonialPage === i ? ' active' : ''}`}
                onClick={() => setTestimonialPage(i)}
                aria-label={`Page ${i + 1} of reviews`}
                aria-pressed={testimonialPage === i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOURS */}
      <section id="hours" aria-label="Opening hours">
        <div className="hours-inner">
          <div className="hours-visual reveal-left">
            <div className="hours-img-wrap">
              <img src={IMAGES.hours} alt="Guest enjoying dining at Kyrin Sushi" loading="lazy" />
            </div>
            <div className="hours-float-card reveal reveal-delay-3" aria-hidden="true">
              <div className="hours-float-card-label">Open Today</div>
              <div className="hours-float-card-value">11:30</div>
              <div className="hours-float-card-sub">Until 10:00 PM</div>
            </div>
          </div>

          <div className="hours-content reveal-right">
            <div>
              <div className="section-label">
                <div className="section-label-line" aria-hidden="true" />
                <span className="section-label-text">Opening Hours</span>
              </div>
              <p className="section-num">06 / 06</p>
              <h2 className="section-title">
                When to <em>Visit Us</em>
              </h2>
              <p className="section-body">
                We welcome you for lunch and dinner throughout the week. Weekends offer
                extended continuous service for a more leisurely dining experience.
              </p>
            </div>

            <div className="hours-table" role="table" aria-label="Restaurant opening hours">
              {HOURS_DATA.map((row) => (
                <div key={row.day} className="hours-row" role="row">
                  <span className="hours-day" role="cell">{row.day}</span>
                  <span className="hours-time" role="cell">{row.time}</span>
                </div>
              ))}
            </div>

            <p className="hours-closed-note">
              * Hours may vary on Malaysian public holidays. Please call ahead to confirm.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" aria-label="Find us">
        <div className="location-inner">
          <div className="reveal">
            <div className="section-label">
              <div className="section-label-line" aria-hidden="true" />
              <span className="section-label-text">Find Us</span>
            </div>
            <h2 className="section-title" style={{ color: 'var(--ivory)' }}>
              Located in the Heart of<br />
              <em style={{ color: 'var(--gold)' }}>Georgetown, Penang</em>
            </h2>
          </div>

          <div className="location-layout">
            <div className="location-info reveal-left">
              {[
                {
                  icon: '&#128205;',
                  label: 'Address',
                  content: (
                    <p>2G, Jalan Gurdwara<br />10300 George Town<br />Penang, Malaysia</p>
                  ),
                },
                {
                  icon: '&#128222;',
                  label: 'Telephone',
                  content: (
                    <a href="tel:+60422263315">+60 4-226 3315</a>
                  ),
                },
                {
                  icon: '&#127963;',
                  label: 'Landmarks',
                  content: (
                    <p>Opposite GAMA Supermarket<br />Near HinBus Depot<br />Corner of Dato Keramat &amp; Jalan Gurdwara</p>
                  ),
                },
                {
                  icon: '&#128663;',
                  label: 'Parking',
                  content: (
                    <p>GAMA Car Park (109m away)<br />Street parking available</p>
                  ),
                },
              ].map((detail) => (
                <div key={detail.label} className="location-detail">
                  <div className="location-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: detail.icon }} />
                  <div className="location-detail-content">
                    <h4>{detail.label}</h4>
                    {detail.content}
                  </div>
                </div>
              ))}

              <div className="location-cta-group">
                <a
                  href="https://share.google/OsUbjSx74WAuFDwPE"
                  className="location-btn location-btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Google Maps"
                >
                  &#128205; Get Directions
                </a>
                <a
                  href="tel:+60422263315"
                  className="location-btn location-btn-ghost"
                  aria-label="Call us now"
                >
                  &#128222; Call Now: +60 4-226 3315
                </a>
              </div>
            </div>

            <div className="location-map reveal-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5!2d100.3264960!3d5.4138180!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac34247b451ad%3A0xfbadca4e98e64101!2sKyrin%20Sushi!5e0!3m2!1sen!2smy!4v1718000000000!5m2!1sen!2smy"
                title="Kyrin Sushi location on Google Maps"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reservation" aria-label="Make a reservation">
        <div className="reservation-bg" aria-hidden="true">
          <div className="reservation-bg-lines" />
        </div>
        <div className="reservation-inner">
          <div className="reveal">
            <div className="section-label">
              <div className="section-label-line" aria-hidden="true" />
              <span className="section-label-text">Reservations</span>
              <div className="section-label-line" aria-hidden="true" />
            </div>
            <h2 className="section-title">
              Reserve Your<br />
              <em>Table at Kyrin</em>
            </h2>
            <p className="section-body" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
              Secure your seat and let us craft an evening -- or afternoon -- you'll
              remember long after the last grain of shari rice has been savoured.
            </p>
          </div>

          <form
            className="reservation-form reveal reveal-delay-2"
            onSubmit={handleFormSubmit}
            aria-label="Table reservation form"
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="res-name" className="form-label">Full Name</label>
                <input id="res-name" type="text" className="form-input" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="res-phone" className="form-label">Phone Number</label>
                <input id="res-phone" type="tel" className="form-input" placeholder="+60 1X-XXX XXXX" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="res-date" className="form-label">Preferred Date</label>
                <input id="res-date" type="date" className="form-input" required />
              </div>
              <div className="form-group">
                <label htmlFor="res-time" className="form-label">Preferred Time</label>
                <select id="res-time" className="form-select" required>
                  <option value="">Select a time</option>
                  <option value="11:30">11:30 AM (Lunch)</option>
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="13:00">1:00 PM (Lunch)</option>
                  <option value="14:00">2:00 PM (Late Lunch)</option>
                  <option value="18:00">6:00 PM (Dinner)</option>
                  <option value="19:00">7:00 PM (Dinner)</option>
                  <option value="20:00">8:00 PM (Dinner)</option>
                  <option value="21:00">9:00 PM (Dinner)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="res-guests" className="form-label">Number of Guests</label>
                <select id="res-guests" className="form-select" required>
                  <option value="">Select guests</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                  <option value="9+">9+ Guests (Group)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="res-occasion" className="form-label">Occasion</label>
                <select id="res-occasion" className="form-select">
                  <option value="">No special occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="date">Date Night</option>
                  <option value="business">Business Dining</option>
                  <option value="family">Family Gathering</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="res-notes" className="form-label">Special Requests</label>
              <textarea
                id="res-notes"
                className="form-textarea"
                placeholder="Dietary requirements, allergies, or any special notes..."
              />
            </div>

            <button type="submit" className="form-submit">
              <span>Confirm Reservation Request</span>
            </button>

            <p className="form-note">
              We will confirm your reservation by phone within 2 hours during operating hours.
              For immediate assistance:{' '}
              <a href="tel:+60422263315" style={{ color: 'var(--gold)' }}>+60 4-226 3315</a>
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer role="contentinfo">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo-name">Kyrin Sushi</div>
              <span className="footer-logo-kanji">&#x9E92;&#x9E9F;&#x5BFF;&#x53F8;</span>
              <p className="footer-tagline">
                Authentic Japanese cuisine with a Malaysian twist, crafted with fresh ingredients
                and skilled artistry in the heart of Georgetown, Penang.
              </p>
              <div className="footer-social" aria-label="Social media links">
                <a href="https://www.facebook.com/kirinjapanese" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
                <a href="https://share.google/OsUbjSx74WAuFDwPE" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">G</a>
                <a href="https://www.tripadvisor.com/Restaurant_Review-g298303-d20301333-Reviews-Kyrin_Sushi-George_Town_Penang_Island_Penang.html" className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor">T</a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Navigate</h4>
              <ul className="footer-links" role="list">
                {[
                  { label: 'Our Philosophy', href: '#philosophy' },
                  { label: 'The Menu', href: '#menu' },
                  { label: "Chef's Selection", href: '#chef' },
                  { label: 'The Experience', href: '#experience' },
                  { label: 'Guest Reviews', href: '#testimonials' },
                  { label: 'Reserve a Table', href: '#reservation' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link" onClick={handleNavClick}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Phone</span>
                <a href="tel:+60422263315" className="footer-contact-value">+60 4-226 3315</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Address</span>
                <span className="footer-contact-value">2G, Jalan Gurdwara<br />Georgetown, Penang</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Hours (Weekdays)</span>
                <span className="footer-contact-value">11:30 am &ndash; 2:15 pm<br />6:00 pm &ndash; 10:00 pm</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Hours (Weekends)</span>
                <span className="footer-contact-value">11:30 am &ndash; 10:00 pm</span>
              </div>
            </div>

            <div className="footer-col">
              <h4>Our Menu</h4>
              <ul className="footer-links" role="list">
                {['Sushi & Nigiri', 'Fresh Sashimi', 'Maki Rolls', 'Yakimono', 'Ramen & Noodles', 'Bento Sets', 'Sake & Drinks'].map((item) => (
                  <li key={item}>
                    <a href="#menu" className="footer-link" onClick={handleNavClick}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} Kyrin Sushi (Georgetown). All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#hero" className="footer-bottom-link" onClick={handleNavClick}>Back to Top &#8593;</a>
              <a href="https://share.google/OsUbjSx74WAuFDwPE" className="footer-bottom-link" target="_blank" rel="noopener noreferrer">View on Maps</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
