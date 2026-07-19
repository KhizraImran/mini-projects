import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { t, toggleLanguage, isArabic } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.themedNights', href: '#themed-nights' },
    { key: 'nav.location', href: '#location' },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B1B3A]/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-[#C9A84C]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`flex flex-col ${isArabic ? 'items-end' : 'items-start'} group cursor-pointer`}
            whileHover={{ scale: 1.02 }}
          >
            <span
              className="text-xl font-bold leading-none tracking-widest"
              style={{
                fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif",
                color: '#C9A84C',
                letterSpacing: isArabic ? '0.02em' : '0.15em',
              }}
            >
              {isArabic ? '\u0645\u0637\u0639\u0645 \u0627\u0644\u0623\u062d\u0645\u062f\u064a' : 'AL AHMADI'}
            </span>
            <span
              className="text-[10px] text-gray-400 tracking-widest uppercase mt-0.5"
              style={{ letterSpacing: '0.2em' }}
            >
              {isArabic ? '\u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a' : 'INTERNATIONAL RESTAURANT'}
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.href)}
                className="nav-link text-gray-300 hover:text-[#C9A84C] transition-colors duration-300 text-sm tracking-wider uppercase"
                style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined, fontSize: isArabic ? '14px' : undefined }}
              >
                {t(link.key)}
              </button>
            ))}

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-1 px-4 py-2 rounded-full border border-[#C9A84C]/50 hover:border-[#C9A84C] transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-[#C9A84C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full opacity-10" />
              <span
                className={`text-xs font-semibold tracking-widest transition-colors duration-300 ${
                  !isArabic ? 'text-[#C9A84C]' : 'text-gray-500'
                }`}
              >
                EN
              </span>
              <span className="text-[#C9A84C]/40 text-xs">|</span>
              <span
                className={`text-xs font-semibold tracking-widest transition-colors duration-300 ${
                  isArabic ? 'text-[#C9A84C]' : 'text-gray-500'
                }`}
                style={{ fontFamily: "'Tajawal', sans-serif" }}
              >
                AR
              </span>
            </motion.button>

            {/* Book CTA */}
            <motion.button
              onClick={() => scrollTo('#location')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider text-[#0B1B3A] bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] hover:from-[#E8C97A] hover:to-[#C9A84C] transition-all duration-300 shadow-lg shadow-[#C9A84C]/20"
              style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
            >
              {t('nav.bookTable')}
            </motion.button>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            {/* Language Toggle Mobile */}
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#C9A84C]/50 text-xs font-semibold"
            >
              <span className={!isArabic ? 'text-[#C9A84C]' : 'text-gray-500'}>EN</span>
              <span className="text-[#C9A84C]/40">|</span>
              <span className={isArabic ? 'text-[#C9A84C]' : 'text-gray-500'} style={{ fontFamily: "'Tajawal', sans-serif" }}>AR</span>
            </motion.button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded-full border border-[#C9A84C]/30 hover:border-[#C9A84C] transition-colors"
              aria-label="Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-[#C9A84C] rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-[#C9A84C] rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-[#C9A84C] rounded-full"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-[#0B1B3A]/98 backdrop-blur-xl border-t border-[#C9A84C]/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-gray-300 hover:text-[#C9A84C] transition-colors text-base tracking-wider uppercase ${isArabic ? 'text-right' : 'text-left'}`}
                  style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                >
                  {t(link.key)}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollTo('#location')}
                className="btn-primary w-full py-3 rounded-full text-sm font-semibold tracking-wider text-[#0B1B3A] bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] mt-2"
                style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
              >
                {t('nav.bookTable')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
