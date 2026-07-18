import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Col 1 */}
          <div>
            <span className="footer-logo" onClick={() => handleNav('/')} style={{ cursor: 'pointer' }}>COLEY</span>
            <p className="footer-tagline">Where Classic Meets Malaysian Soul</p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/LongLiveColey"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/coleylumpur"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              <li><a onClick={() => handleNav('/')}>Home</a></li>
              <li><a onClick={() => handleNav('/about')}>About</a></li>
              <li><a onClick={() => handleNav('/menu')}>Menu</a></li>
              <li><a onClick={() => handleNav('/events')}>Events</a></li>
              <li><a onClick={() => handleNav('/contact')}>Contact</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <div className="footer-heading">Visit Us</div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div className="contact-text">
                6-G, Jalan Abdullah, Bangsar,<br />
                59000 Kuala Lumpur, Malaysia
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div className="contact-text">
                <a href="tel:+60192709179">+60 19-270 9179</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div className="contact-text">
                <a href="mailto:info@liquidmentality.com">info@liquidmentality.com</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <div className="contact-text">
                Tue–Sat: 5:00 PM – 1:00 AM<br />
                Sun: 12:00 PM – 6:00 PM<br />
                <span className="hours-mini">Monday: Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © {year} COLEY. All Rights Reserved. | Bangsar, Kuala Lumpur
        </div>
      </div>
    </footer>
  );
}
