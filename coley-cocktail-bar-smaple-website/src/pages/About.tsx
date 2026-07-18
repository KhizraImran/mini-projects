import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const navigate = useNavigate();
  useScrollReveal();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <span className="gold-label">Est. 2014 · Bangsar, KL</span>
          <h1>Our Story</h1>
          <p>A bar named for a legend. Crafted for a new generation.</p>
        </div>
      </section>

      {/* THE NAME — ADA COLEMAN */}
      <section className="section">
        <div className="container">
          <div className="about-section">
            <div className="reveal">
              <span className="gold-label">The Legend</span>
              <h2 style={{ marginBottom: 16 }}>Ada 'Coley' Coleman</h2>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
                Ada 'Coley' Coleman was appointed head bartender of the American Bar at London's
                legendary Savoy Hotel in the early 1900s — a position of immense prestige at one of
                the world's most celebrated venues. In an era when women were rarely seen behind the
                bar, she commanded it with grace, skill, and an unrivalled palate.
              </p>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
                She is perhaps best remembered as the inventor of the iconic Hanky Panky cocktail
                — created for the famed actor Charles Hawtrey — a blend of gin, sweet vermouth, and
                Fernet Branca that remains on our menu to this day, aged traditionally in a claypot.
              </p>
              <p style={{ color: 'var(--muted)' }}>
                Coley's legacy is one of passion, craft, and pioneering spirit. She proved that great
                bartending is about storytelling, connection, and the courage to do something entirely
                your own.
              </p>
            </div>
            <div className="reveal">
              <div className="quote-block">
                <span className="quote-mark">"</span>
                <p className="quote-text">
                  You can spell cocktails without 'fun', so we're putting the 'fun' back into
                  cocktails. Let us tipple you pink!
                </p>
                <div className="quote-attr">
                  — Ada 'Coley' Coleman<br />
                  <span style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'normal' }}>
                    Head Bartender, The Savoy Hotel, London
                  </span>
                </div>
              </div>
              <div className="card" style={{ textAlign: 'center', marginTop: 24 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🍸</div>
                <div style={{ color: 'var(--gold)', fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600 }}>
                  Hanky Panky
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
                  Gin · Sweet Vermouth · Fernet Branca
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4, fontStyle: 'italic' }}>
                  Invented c. 1903 by Ada Coleman
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOUNDER */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="about-section">
            <div className="reveal">
              <div style={{
                background: 'radial-gradient(ellipse at center, #1a1208 0%, var(--surface-alt) 100%)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 48,
                textAlign: 'center',
              }}>
                <div style={{
                  width: 90, height: 90, borderRadius: '50%',
                  background: 'rgba(200,151,42,0.15)',
                  border: '2px solid var(--gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: 36,
                }}>🧑‍🍳</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: 'var(--cream)', marginBottom: 6 }}>
                  CK Kho
                </div>
                <div style={{ fontSize: 13, color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>
                  Founder &amp; Head Bartender
                </div>
                <div style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.7 }}>
                  17+ years in Malaysia's<br />bar &amp; beverage industry
                </div>
                <div className="gold-divider" style={{ margin: '20px auto' }}></div>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                  Est. pop-up 2014 · Permanent 2016
                </div>
              </div>
            </div>
            <div className="reveal">
              <span className="gold-label">The Founder</span>
              <h2 style={{ marginBottom: 16 }}>Meet CK Kho</h2>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
                With over 17 years in Malaysia's bar and beverage industry, CK Kho (Kho Chee Keong)
                started COLEY as a humble pop-up in Bangsar in 2014. His vision was clear from the
                very beginning: to build a bar that uses craft spirits and local Malaysian ingredients
                in ways that both challenge and delight.
              </p>
              <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
                Where other bars looked outward for inspiration, CK looked inward — to the kedai kopi
                heritage of Malaysia, to the markets of Bangsar, to the kampung botanicals that every
                Malaysian grew up with. He asked: what does a world-class cocktail taste like when
                it's made from here?
              </p>
              <p style={{ color: 'var(--muted)', marginBottom: 28 }}>
                Today, that vision has become reality — twice over. COLEY has been recognised as
                Malaysia's Best Bar in 2019 and featured on Asia's 50 Best Bars in 2022, cementing
                its place not just in Bangsar, but on the world stage.
              </p>
              <button className="btn-outline" onClick={() => handleNav('/menu')}>
                Explore the Menu →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy-section reveal">
        <div className="container">
          <span className="gold-label">Our Philosophy</span>
          <div className="gold-divider" style={{ margin: '16px auto 32px' }}></div>
          <span style={{
            display: 'block',
            textAlign: 'center',
            fontFamily: "'Playfair Display', serif",
            fontSize: 80,
            color: 'var(--gold)',
            lineHeight: 0.8,
            marginBottom: 24,
            opacity: 0.7,
          }}>"</span>
          <p className="philosophy-quote">
            "Tradition and innovation are not opposites — they are conversation partners. Every
            cocktail we make is that conversation."
          </p>
          <div className="philosophy-attr">— The Coley Team</div>
        </div>
      </section>

      {/* THE SPACE */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
            <span className="gold-label">The Atmosphere</span>
            <h2 style={{ marginBottom: 16 }}>The Space</h2>
            <p style={{ color: 'var(--muted)' }}>
              Every detail of COLEY has been considered — from the first sip to the last look back at the door.
            </p>
          </div>
          <div className="grid-3 reveal">
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🪑</div>
              <h3 style={{ marginBottom: 12 }}>The Interior</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                Romantic mauve walls, warm dim lighting, brown leather ottomans, and a long
                concrete bar — a space designed for intimacy and imagination.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎵</div>
              <h3 style={{ marginBottom: 12 }}>The Vibe</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                1960s beats drift through the room. Conversations flow freely. Whether you come
                alone, on a date, or with friends — COLEY feels like your living room.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🌿</div>
              <h3 style={{ marginBottom: 12 }}>Eco-Conscious</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                We care about the planet. No plastic straws — metal and paper straws only.
                Indoor and outdoor seating available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="gold-label">Journey</span>
            <h2>Milestones</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }}></div>
          </div>
          <div className="timeline reveal">
            <div className="timeline-item">
              <div className="timeline-year">2014</div>
              <div className="timeline-desc">
                Pop-up bar launched in Bangsar — COLEY's first chapter begins with a bold, intimate concept.
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2016</div>
              <div className="timeline-desc">
                Permanent home established at 6-G Jalan Abdullah, Bangsar — the bar finds its forever address.
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-desc">
                Malaysia's Best Bar Award — recognition of COLEY's craft, consistency, and contribution to Malaysia's cocktail scene.
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-desc">
                Asia's 50 Best Bars — Extended List, No. 100 — putting Bangsar on the global cocktail map.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section reveal">
        <div className="container">
          <h2>Come Experience It Yourself</h2>
          <p>Words can only go so far. The rest is in the glass.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => handleNav('/menu')}>View Our Menu</button>
            <button className="btn-outline" onClick={() => handleNav('/contact')}>Find Us</button>
          </div>
        </div>
      </section>
    </>
  );
}
