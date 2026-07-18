import { useNavigate } from 'react-router-dom';
import { useScrollReveal, useParticles } from '../hooks/useScrollReveal';

export default function Home() {
  const navigate = useNavigate();
  useScrollReveal();
  useParticles('particles');

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="particles" id="particles"></div>
        <div className="hero-content">
          <span className="gold-label">Bangsar, Kuala Lumpur</span>
          <h1>COLEY</h1>
          <p className="hero-tagline">Where Classic Meets Malaysian Soul</p>
          <p className="hero-desc">
            Award-winning cocktail bar in the heart of Bangsar — where every glass tells a story.
          </p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => handleNav('/menu')}>
              Explore Our Menu
            </button>
            <button className="btn-outline" onClick={() => handleNav('/contact')}>
              Find Us
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* ========== AWARDS BANNER ========== */}
      <section className="awards-banner">
        <div className="container">
          <div className="awards-inner reveal">
            <div className="award-item">
              <span className="award-icon">🏆</span>
              <div className="award-title">Malaysia's Best Bar</div>
              <div className="award-year">2019</div>
            </div>
            <div className="award-divider"></div>
            <div className="award-item">
              <span className="award-icon">🏆</span>
              <div className="award-title">Asia's 50 Best Bars</div>
              <div className="award-year">2022 — No. 100 Extended List</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SNIPPET ========== */}
      <section className="section">
        <div className="container">
          <div className="about-snippet">
            <div className="reveal">
              <span className="gold-label">Our Heritage</span>
              <h2 style={{ marginBottom: 16 }}>The Spirit Behind the Name</h2>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
                Ada 'Coley' Coleman was the legendary female head bartender of London's Savoy Hotel
                in the early 1900s — the inventor of the iconic Hanky Panky cocktail and a
                trailblazer who proved that craft behind the bar knows no gender.
              </p>
              <p style={{ color: 'var(--muted)', marginBottom: 28 }}>
                Founded by CK Kho — with over 17 years in Malaysia's beverage industry — COLEY began
                as a humble pop-up in Bangsar in 2014. Today, from its permanent home on Jalan
                Abdullah, it carries her legacy into every meticulously crafted glass.
              </p>
              <button className="btn-outline" onClick={() => handleNav('/about')}>
                Our Story →
              </button>
            </div>
            <div className="quote-block reveal">
              <span className="quote-mark">"</span>
              <p className="quote-text">
                You can spell cocktails without 'fun', so we're putting the 'fun' back into
                cocktails. Let us tipple you pink!
              </p>
              <div className="quote-attr">— Ada 'Coley' Coleman</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED COCKTAILS ========== */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="reveal">
            <span className="gold-label" style={{ display: 'block', textAlign: 'center' }}>Signature Cocktails</span>
            <h2 className="section-heading">Our Signatures</h2>
            <p className="section-subtitle">Crafted with precision, passion, and a touch of Malaysian soul</p>
          </div>
          <div className="grid-3 reveal">
            <div className="cocktail-card">
              <span className="badge">Signature</span>
              <h3>Hanky Panky</h3>
              <p>Our namesake cocktail, aged in a claypot. Gin · Sweet Vermouth · Fernet Branca</p>
              <div className="cocktail-price">RM 46</div>
            </div>
            <div className="cocktail-card">
              <span className="badge">Signature</span>
              <h3>Saffron Sour</h3>
              <p>The iconic Whiskey Sour reimagined with saffron-infused bourbon and citrus zest.</p>
              <div className="cocktail-price">RM 38</div>
            </div>
            <div className="cocktail-card">
              <span className="badge">Signature</span>
              <h3>Kopi Old Fashioned</h3>
              <p>Plantation Dark Rum meets Ethiopia Chelelectu coffee and Pedro Ximenez.</p>
              <div className="cocktail-price">RM 44</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <button className="btn-outline" onClick={() => handleNav('/menu')}>View Full Menu →</button>
          </div>
        </div>
      </section>

      {/* ========== KOKTEL TEASER ========== */}
      <section className="section koktel-teaser">
        <div className="koktel-inner reveal">
          <span className="gold-label">Koktel Menu</span>
          <h2>Discover the Koktel Menu</h2>
          <p>
            Drawing from the rich heritage of Malaysian kopitiam culture — think kedondong,
            kalamansi, asamboi, and fresh nutmeg — our Koktel menu is a celebration of home in a glass.
          </p>
          <button className="btn-primary" onClick={() => handleNav('/menu')}>
            View Full Menu →
          </button>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="reveal">
            <span className="gold-label" style={{ display: 'block', textAlign: 'center' }}>Guest Reviews</span>
            <h2 className="section-heading">What Guests Say</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="grid-3 reveal" style={{ marginTop: 48 }}>
            <div className="testimonial-card">
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-text">
                A hidden gem in Bangsar — the most unique cocktails I've ever had.
              </p>
              <div className="testimonial-author">— KL Visitor</div>
            </div>
            <div className="testimonial-card">
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-text">
                The staff's knowledge and passion is unmatched anywhere in Kuala Lumpur.
              </p>
              <div className="testimonial-author">— International Guest</div>
            </div>
            <div className="testimonial-card">
              <span className="testimonial-quote-mark">"</span>
              <p className="testimonial-text">
                Coley is simply the best cocktail experience Malaysia has to offer.
              </p>
              <div className="testimonial-author">— TripAdvisor Review</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISIT US CTA ========== */}
      <section className="cta-section reveal">
        <div className="container">
          <h2>Ready for an unforgettable night?</h2>
          <p>We're open Tuesday to Saturday from 5pm. Walk in or reach us on WhatsApp.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => handleNav('/contact')}>
              Get Directions
            </button>
            <a
              href="https://wa.me/60192709179"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
