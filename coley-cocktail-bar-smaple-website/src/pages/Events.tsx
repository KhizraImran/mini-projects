import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Events() {
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
          <span className="gold-label">Always Something On</span>
          <h1>Events &amp; Happenings</h1>
          <p>There's always something going on at Coley.</p>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="gold-label">What We Do</span>
            <h2>The Kinds of Nights We Create</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }}></div>
            <p style={{ color: 'var(--muted)', maxWidth: 600, margin: '0 auto' }}>
              From intimate guest shifts to full-scale creative pop-ups — every event at COLEY is
              curated with the same care as every cocktail.
            </p>
          </div>
          <div className="grid-3 reveal">
            <div className="event-card">
              <span className="event-icon">🎤</span>
              <h3>Guest Shifts</h3>
              <p>
                International bartending superstars step behind our bar, bringing their craft and
                stories from around the world. An evening to learn, taste, and be inspired.
              </p>
            </div>
            <div className="event-card">
              <span className="event-icon">🎉</span>
              <h3>Pop-Up Nights</h3>
              <p>
                Collaborative experiences with the city's most creative minds — food, art, music,
                cocktails. Boundaries are meant to be blurred.
              </p>
            </div>
            <div className="event-card">
              <span className="event-icon">🔄</span>
              <h3>Takeovers</h3>
              <p>
                When two cocktail philosophies collide, magic happens. We invite the best bars from
                across Asia to shake things up behind our counter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STAY UPDATED */}
      <section className="social-cta-section">
        <div className="container">
          <div className="reveal">
            <span className="gold-label">Stay in the Loop</span>
            <h2>Follow Us for Updates</h2>
            <p>
              Follow us on Instagram{' '}
              <strong style={{ color: 'var(--cream)' }}>@coleylumpur</strong> and Facebook for
              upcoming event announcements, behind-the-scenes moments, and first looks at new menus.
            </p>
            <div className="social-buttons">
              <a
                href="https://www.instagram.com/coleylumpur"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                @coleylumpur
              </a>
              <a
                href="https://www.facebook.com/LongLiveColey"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                LongLiveColey
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PAST HIGHLIGHT */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="gold-label">Past Events</span>
            <h2>Recent Highlights</h2>
            <div className="gold-divider" style={{ margin: '16px auto' }}></div>
          </div>

          <div className="past-highlight reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(200,151,42,0.15)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0,
              }}>🌏</div>
              <div>
                <h3 style={{ marginBottom: 2 }}>Guest Shift — Modernhaus Jakarta</h3>
                <div style={{ fontSize: 13, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  International Guest Bartender Evening
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7 }}>
              In a landmark evening that exemplified the calibre of international collaboration
              COLEY is known for, the team from Modernhaus Jakarta — one of Indonesia's most
              acclaimed bars — stepped behind the COLEY counter for a special guest shift. Guests
              were treated to exclusive cocktails from the Modernhaus repertoire, alongside COLEY
              classics, creating an evening that bridged two of Southeast Asia's finest cocktail
              cultures. Events like these are a reminder of what makes Bangsar's bar scene truly
              world-class.
            </p>
          </div>

          <div className="grid-3 reveal" style={{ marginTop: 48 }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🌍</div>
              <h3 style={{ marginBottom: 8 }}>International Collaborations</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                We regularly host bartenders from across Asia — Singapore, Jakarta, Tokyo,
                Bangkok — bringing their city's flavours to Bangsar.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🎨</div>
              <h3 style={{ marginBottom: 8 }}>Creative Pop-Ups</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                From art exhibitions paired with cocktail flights, to live music evenings and
                chef collaborations — COLEY is more than a bar.
              </p>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🏆</div>
              <h3 style={{ marginBottom: 8 }}>Industry Nights</h3>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                Masterclasses, industry meetups, and educational tastings — COLEY champions
                the growth of Malaysia's cocktail community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE EVENTS CTA */}
      <section className="private-events-cta reveal">
        <div className="container">
          <span className="gold-label">Private Events</span>
          <h2>Host Your Event at COLEY</h2>
          <p>
            Interested in hosting a private event or collaboration with Coley? Whether it's a
            birthday, corporate celebration, brand launch, or a creative project — we'd love to
            hear from you.
          </p>
          <a className="email-link" href="mailto:info@liquidmentality.com">
            info@liquidmentality.com
          </a>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => handleNav('/contact')}>Get In Touch</button>
            <a href="https://wa.me/60192709179" target="_blank" rel="noopener noreferrer" className="btn-outline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
