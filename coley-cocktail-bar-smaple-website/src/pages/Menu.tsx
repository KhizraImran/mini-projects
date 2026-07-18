import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

type Category = 'all' | 'classics' | 'koktel' | 'highballs' | 'food';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  category: Exclude<Category, 'all'>;
  nameExtra?: string;
}

const menuItems: MenuItem[] = [
  // Classics
  { name: 'Hanky Panky', desc: 'Gin, Sweet Vermouth, Fernet Branca, aged in claypot. Our namesake — a tribute to Ada Coleman\'s iconic recipe.', price: 'RM 46', category: 'classics' },
  { name: 'Saffron Sour', desc: 'Saffron-infused bourbon, fresh citrus. The iconic Whiskey Sour reimagined with golden warmth and citrus zest.', price: 'RM 38', category: 'classics' },
  { name: '3 Canes Old Fashioned', desc: 'White rum, spiced rum, cachaça — three sugarcane spirits united in a stirred, spirit-forward classic.', price: 'RM 44', category: 'classics' },
  { name: 'Double Barrel', desc: 'Ask your bartender for today\'s build — a rotating selection curated from our barrel-aged programme.', price: 'RM 44', category: 'classics' },
  // Koktel
  { name: 'Gin & Coconut', desc: 'London dry gin, fresh coconut water, lime. Tropically light, refreshingly Malaysian — born from the kopitiam spirit.', price: 'RM 28', category: 'koktel' },
  { name: 'Vodka & Pear', desc: 'Vodka, pear, green tea, lime. Delicate and floral — a fusion of East and West that surprises with every sip.', price: 'RM 30', category: 'koktel' },
  { name: 'Whisky & Bubble Tea', desc: 'Blended whisky, house bubble tea. A beloved Malaysian street staple elevated — bold, creamy, utterly unforgettable.', price: 'RM 32', category: 'koktel' },
  { name: 'Barley Lemon Whisky', desc: 'Blended whisky, home-brewed barley lemon water. Nostalgic, comforting, and entirely uniquely Coley.', price: 'RM 30', category: 'koktel' },
  // Highballs
  { name: 'Peanut Butter & Jelly', desc: 'Tequila, roasted peanuts, berry. Playfully nostalgic — a grown-up twist on a childhood favourite.', price: 'RM 38', category: 'highballs' },
  { name: 'Kopi Old Fashioned', desc: 'Plantation Dark Rum, Ethiopia Chelelectu single-origin coffee, Pedro Ximenez sherry. The meeting of a Malaysian morning and a Caribbean evening.', price: 'RM 44', category: 'highballs' },
  { name: 'Mary Jane', desc: 'Diplomatico Planas rum, cacao, Strega, pineapple, aloe vera. Tropical, herbaceous, and completely captivating.', price: 'RM 44', category: 'highballs' },
  // Food
  { name: 'Fish & Chips', nameExtra: '炸鱼柳薯条', desc: 'Classic British pub staple done right — crispy golden battered fish with hand-cut fries and dipping sauce.', price: 'RM 22', category: 'food' },
  { name: 'All Day Breakfast', nameExtra: '全日早餐', desc: 'A satisfying spread to line your stomach before an evening of great cocktails. Available all day.', price: 'RM 14', category: 'food' },
  { name: 'Mix & Yes Platter', nameExtra: '拼盘', desc: 'A curated sharing platter — perfect for the table. Ask your bartender what\'s on tonight\'s selection.', price: 'RM 36', category: 'food' },
  { name: 'Chicken Rendang', desc: 'Slow-cooked chicken thigh in rich rendang spices, served with glutinous rice foam — a beautiful nod to Malaysian culinary heritage.', price: 'RM 18', category: 'food' },
];

const categoryLabels: Record<Exclude<Category, 'all'>, string> = {
  classics: 'Classics',
  koktel: 'Koktel',
  highballs: 'Highballs',
  food: 'Bar Food',
};

const tabs: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Classics', value: 'classics' },
  { label: 'Koktel', value: 'koktel' },
  { label: 'Highballs', value: 'highballs' },
  { label: 'Bar Food', value: 'food' },
];

export default function Menu() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Category>('all');
  useScrollReveal();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const filtered = activeTab === 'all' ? menuItems : menuItems.filter(item => item.category === activeTab);

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="gold-label">RM 25–58 per cocktail</span>
          <h1>Our Menu</h1>
          <p>Cocktails crafted with precision, passion, and a touch of Malaysian soul. Food worth staying for.</p>
        </div>
      </section>

      {/* MENU SECTION */}
      <section className="section">
        <div className="container">

          {/* Tab Filter */}
          <div className="menu-tabs">
            {tabs.map(tab => (
              <button
                key={tab.value}
                className={`menu-tab${activeTab === tab.value ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid-3">
            {filtered.map((item, idx) => (
              <div key={idx} className="menu-item reveal">
                <div className="menu-item-header">
                  <div className="menu-item-name">
                    {item.name}
                    {item.nameExtra && (
                      <span style={{ fontSize: 14, color: 'var(--muted)', marginLeft: 6 }}>
                        {item.nameExtra}
                      </span>
                    )}
                  </div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
                <div className="menu-item-desc">{item.desc}</div>
                <span className="menu-category-label">{categoryLabels[item.category]}</span>
              </div>
            ))}
          </div>

          {/* Menu Note */}
          <div className="menu-note reveal">
            <span style={{ color: 'var(--gold)', fontSize: 18 }}>🍃</span>
            <p style={{ marginTop: 8 }}>
              Menu changes seasonally. Our bartenders are always happy to craft something personalised
              for you. Please inform us of any dietary requirements.
            </p>
          </div>
        </div>
      </section>

      {/* PRICE INFO */}
      <section className="section-sm" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-3 reveal">
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>💰</div>
              <h3 style={{ marginBottom: 8 }}>Price Range</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                RM 25 – RM 58 per cocktail. Approximately RM 40 per person average.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🌿</div>
              <h3 style={{ marginBottom: 8 }}>Eco-Friendly</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                No plastic straws. We use metal and paper straws only — because great bars care
                about more than just cocktails.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🤝</div>
              <h3 style={{ marginBottom: 8 }}>Bespoke Service</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                Tell our bartenders your preferences — spirit, flavour profile, mood — and
                they'll craft something just for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section reveal">
        <div className="container">
          <h2>Come Taste for Yourself</h2>
          <p>Open Tuesday to Saturday from 5pm. Sunday 12pm–6pm. Walk-ins welcome.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => handleNav('/contact')}>Find Us</button>
            <a href="https://wa.me/60192709179" target="_blank" rel="noopener noreferrer" className="btn-outline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
