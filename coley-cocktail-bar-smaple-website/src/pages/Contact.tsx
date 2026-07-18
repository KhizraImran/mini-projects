import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const days = [
  { key: 'monday', label: 'Monday', hours: 'Closed', closed: true },
  { key: 'tuesday', label: 'Tuesday', hours: '5:00 PM – 1:00 AM', closed: false },
  { key: 'wednesday', label: 'Wednesday', hours: '5:00 PM – 1:00 AM', closed: false },
  { key: 'thursday', label: 'Thursday', hours: '5:00 PM – 1:00 AM', closed: false },
  { key: 'friday', label: 'Friday', hours: '5:00 PM – 1:00 AM', closed: false },
  { key: 'saturday', label: 'Saturday', hours: '5:00 PM – 1:00 AM', closed: false },
  { key: 'sunday', label: 'Sunday', hours: '12:00 PM – 6:00 PM', closed: false },
];

const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const todayKey = dayMap[new Date().getDay()];

export default function Contact() {
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
          <span className="gold-label">Bangsar, Kuala Lumpur</span>
          <h1>Find Us</h1>
          <p>We're tucked away in Bangsar — a hidden gem worth finding.</p>
        </div>
      </section>

      {/* CONTACT LAYOUT */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">

            {/* Left: Contact Card */}
            <div className="contact-card reveal">
              <h2>Visit COLEY</h2>

              {/* Address */}
              <div className="contact-detail">
                <span className="contact-detail-icon">📍</span>
                <div className="contact-detail-info">
                  <div className="contact-detail-label">Address</div>
                  <div className="contact-detail-value">
                    6-G, Jalan Abdullah, Bangsar<br />
                    59000 Kuala Lumpur, Malaysia
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-detail">
                <span className="contact-detail-icon">📞</span>
                <div className="contact-detail-info">
                  <div className="contact-detail-label">Phone</div>
                  <div className="contact-detail-value">
                    <a href="tel:+60192709179">+60 19-270 9179</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="contact-detail">
                <span className="contact-detail-icon">✉️</span>
                <div className="contact-detail-info">
                  <div className="contact-detail-label">Email</div>
                  <div className="contact-detail-value">
                    <a href="mailto:info@liquidmentality.com">info@liquidmentality.com</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-detail">
                <span className="contact-detail-icon">💬</span>
                <div className="contact-detail-info">
                  <div className="contact-detail-label">WhatsApp</div>
                  <div className="contact-detail-value" style={{ marginTop: 8 }}>
                    <a
                      href="https://wa.me/60192709179"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ fontSize: 15, padding: '10px 24px', display: 'inline-block' }}
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="contact-detail" style={{ borderBottom: 'none' }}>
                <span className="contact-detail-icon">🕐</span>
                <div className="contact-detail-info" style={{ flex: 1 }}>
                  <div className="contact-detail-label">Opening Hours</div>
                  <table className="hours-table">
                    <tbody>
                      {days.map(day => (
                        <tr
                          key={day.key}
                          className={day.key === todayKey ? 'hours-today' : ''}
                        >
                          <td>{day.label}</td>
                          <td className={day.closed ? 'hours-closed' : ''}>
                            {day.hours}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right: Google Maps */}
            <div className="reveal">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=6G+Jalan+Abdullah,+Bangsar,+59000+Kuala+Lumpur,+Malaysia&output=embed"
                  width="100%"
                  height="420"
                  style={{ border: 0, borderRadius: 16, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="COLEY Cocktail Bar Location"
                ></iframe>
              </div>
              <div className="directions-note">
                <strong style={{ color: 'var(--cream)', display: 'block', marginBottom: 8 }}>
                  📌 How to Find Us
                </strong>
                We are located at 6G Jalan Abdullah in the Bangsar neighbourhood of Kuala Lumpur.
                We're a hidden gem tucked on a quiet street — but absolutely worth finding. Nearest
                landmark: Jalan Bangsar area.
              </div>
            </div>

          </div>

          {/* Social Row */}
          <div className="social-row reveal">
            <a href="https://www.facebook.com/LongLiveColey" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              Facebook — LongLiveColey
            </a>
            <a href="https://www.instagram.com/coleylumpur" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram — @coleylumpur
            </a>
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="section-sm" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
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

      {/* FINAL CTA */}
      <section className="cta-section reveal">
        <div className="container">
          <h2>We Can't Wait to See You</h2>
          <p>Walk-ins are welcome. Or drop us a message on WhatsApp — we're always happy to chat.</p>
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <a href="https://wa.me/60192709179" target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp Us Now
            </a>
            <button className="btn-outline" onClick={() => handleNav('/menu')}>See Our Menu</button>
          </div>
        </div>
      </section>
    </>
  );
}
