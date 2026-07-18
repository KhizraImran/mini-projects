import { Mail, Phone } from 'lucide-react';

// Simple social icon SVGs
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A0A05] text-[#FAF6EE]">
      {/* Top gold line */}
      <div className="gold-divider-full h-px" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p className="font-playfair text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-1">Nasi Ayam Hainan</p>
              <h3 className="font-marcellus text-[#FAF6EE] text-3xl">Chee Meng</h3>
              <p className="font-lato text-[#C9A84C]/60 text-xs tracking-[0.2em] uppercase mt-1">Est. 1965 · Kuala Lumpur</p>
            </div>
            <div className="gold-divider mb-5" />
            <p className="font-nunito text-[#FAF6EE]/60 text-sm leading-relaxed mb-6">
              Nearly six decades of authentic Hainanese chicken rice, a cherished legacy passed down through generations and recognised by the world's finest culinary guides.
            </p>
            {/* Badges */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Michelin Badge */}
              <div className="michelin-glow bg-[#2A1A0A] border border-[#C9A84C]/30 rounded px-3 py-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C9A84C]" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <div>
                  <p className="font-lato text-[8px] text-[#C9A84C] tracking-widest uppercase">Michelin</p>
                  <p className="font-lato text-[9px] text-[#FAF6EE]/70">Bib Gourmand 2023</p>
                </div>
              </div>
              {/* Halal Badge */}
              <div className="bg-[#1A3A20] border border-[#4CAF50]/30 rounded px-3 py-2 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4CAF50]" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                </svg>
                <div>
                  <p className="font-lato text-[8px] text-[#4CAF50] tracking-widest uppercase">JAKIM</p>
                  <p className="font-lato text-[9px] text-[#FAF6EE]/70">Halal Certified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-[#C9A84C] text-lg mb-5 tracking-wide">Quick Links</h4>
            <div className="gold-divider mb-5" style={{ width: '40px' }} />
            <ul className="space-y-3">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Our Story', page: 'about' },
                { label: 'Locations', page: 'locations' },
                { label: 'Menu', page: 'menu' },
                { label: 'Promotions & Events', page: 'promotions' },
                { label: 'Online Order', page: 'order' },
                { label: 'Contact Us', page: 'contact' },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className="font-lato text-sm text-[#FAF6EE]/60 hover:text-[#C9A84C] transition-colors tracking-wide"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-[#C9A84C] text-lg mb-5 tracking-wide">Contact</h4>
            <div className="gold-divider mb-5" style={{ width: '40px' }} />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-0.5">General Enquiry</p>
                  <a href="mailto:enquiry@cheemeng.com.my" className="font-lato text-sm text-[#FAF6EE]/60 hover:text-[#C9A84C] transition-colors">
                    enquiry@cheemeng.com.my
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-0.5">Catering</p>
                  <a href="mailto:catering@cheemeng.com.my" className="font-lato text-sm text-[#FAF6EE]/60 hover:text-[#C9A84C] transition-colors">
                    catering@cheemeng.com.my
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-0.5">Bukit Bintang</p>
                  <a href="tel:+60321440456" className="font-lato text-sm text-[#FAF6EE]/60 hover:text-[#C9A84C] transition-colors">
                    +603-2144 0456
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-0.5">Old Klang Road</p>
                  <a href="tel:+60379803977" className="font-lato text-sm text-[#FAF6EE]/60 hover:text-[#C9A84C] transition-colors">
                    +603-7980 3977
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-playfair text-[#C9A84C] text-lg mb-5 tracking-wide">Opening Hours</h4>
            <div className="gold-divider mb-5" style={{ width: '40px' }} />
            <div className="space-y-3 mb-8">
              <div>
                <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-1">Bukit Bintang</p>
                <p className="font-lato text-sm text-[#FAF6EE]/60">Daily: 10:00 AM – 10:00 PM</p>
              </div>
              <div>
                <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-1">Old Klang Road</p>
                <p className="font-lato text-sm text-[#FAF6EE]/60">Daily: 10:30 AM – 8:00 PM</p>
              </div>
              <div>
                <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-1">Glenmarie</p>
                <p className="font-lato text-sm text-[#FAF6EE]/60">Daily: 11:00 AM – 9:00 PM</p>
              </div>
            </div>

            {/* Social */}
            <h4 className="font-playfair text-[#C9A84C] text-sm mb-3 tracking-wide uppercase">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/nasiayamhainancheemeng/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#FAF6EE]/60 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/cheemengkl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#FAF6EE]/60 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all"
              >
                <FacebookIcon />
              </a>
              <a
                href="mailto:enquiry@cheemeng.com.my"
                className="w-9 h-9 rounded-full border border-[#C9A84C]/30 flex items-center justify-center text-[#FAF6EE]/60 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#C9A84C]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-lato text-xs text-[#FAF6EE]/40 tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} Nasi Ayam Hainan Chee Meng. All rights reserved. | Halal Certified by JAKIM
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
            <p className="font-lato text-xs text-[#FAF6EE]/40">JAKIM Halal Certified Restaurant</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
