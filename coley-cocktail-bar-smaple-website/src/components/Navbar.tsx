import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  activePage: string;
}

const navLinks = [
  { label: 'Home', path: '/', key: 'home' },
  { label: 'About', path: '/about', key: 'about' },
  { label: 'Menu', path: '/menu', key: 'menu' },
  { label: 'Events', path: '/events', key: 'events' },
  { label: 'Contact', path: '/contact', key: 'contact' },
];

export default function Navbar({ activePage }: NavbarProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="navbar-inner">
          <span className="nav-logo" onClick={() => handleNav('/')}>COLEY</span>
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.key}>
                <a
                  className={activePage === link.key ? 'active' : ''}
                  onClick={() => handleNav(link.path)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="hamburger"
            id="hamburger"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} id="mobile-menu">
        <button
          className="mobile-menu-close"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
        {navLinks.map(link => (
          <a
            key={link.key}
            className={activePage === link.key ? 'active' : ''}
            onClick={() => handleNav(link.path)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
