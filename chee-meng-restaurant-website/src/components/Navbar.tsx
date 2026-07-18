import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'locations', label: 'Locations' },
  { id: 'menu', label: 'Menu' },
  { id: 'promotions', label: 'Promotions' },
  { id: 'order', label: 'Online Order' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1A0A05]/97 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm'
          : 'bg-gradient-to-b from-[#1A0A05]/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo / Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex flex-col items-start group"
          >
            <div className="flex items-center gap-2">
              {/* Ornamental Icon */}
              <div className="w-8 h-8 md:w-10 md:h-10 relative flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="19" stroke="#C9A84C" strokeWidth="1" opacity="0.6"/>
                  <path d="M20 8 C20 8 14 14 14 20 C14 26 20 32 20 32 C20 32 26 26 26 20 C26 14 20 8 20 8Z" fill="#C9A84C" opacity="0.8"/>
                  <circle cx="20" cy="20" r="4" fill="#FAF6EE" opacity="0.9"/>
                  <path d="M8 20 H32" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
                  <path d="M20 8 V32" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
                </svg>
              </div>
              <div>
                <p className="font-playfair text-[#C9A84C] text-xs md:text-sm tracking-[0.15em] uppercase leading-none">
                  Nasi Ayam Hainan
                </p>
                <p className="font-marcellus text-[#FAF6EE] text-base md:text-xl leading-tight tracking-wide">
                  Chee Meng
                </p>
              </div>
            </div>
            <p className="font-lato text-[#C9A84C]/60 text-[9px] tracking-[0.25em] uppercase ml-10 md:ml-12">
              Est. 1965 · Kuala Lumpur
            </p>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`nav-link font-lato text-xs xl:text-sm tracking-[0.1em] uppercase transition-colors duration-200 pb-0.5 ${
                  currentPage === link.id
                    ? 'text-[#C9A84C] active'
                    : 'text-[#FAF6EE]/80 hover:text-[#C9A84C]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Reserve / CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNav('order')}
              className="btn-primary font-lato text-xs tracking-[0.1em] uppercase px-5 py-2.5 rounded-sm"
            >
              Order Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#FAF6EE] p-2 hover:text-[#C9A84C] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1A0A05]/98 backdrop-blur-sm border-t border-[#C9A84C]/20 mobile-menu-enter">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`block w-full text-left font-lato text-sm tracking-[0.1em] uppercase py-3 px-4 border-b border-[#C9A84C]/10 transition-colors ${
                  currentPage === link.id
                    ? 'text-[#C9A84C]'
                    : 'text-[#FAF6EE]/80 hover:text-[#C9A84C]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('order')}
              className="btn-primary w-full mt-4 font-lato text-xs tracking-[0.1em] uppercase px-5 py-3 rounded-sm text-center"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
