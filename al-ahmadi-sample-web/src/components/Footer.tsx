import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, isArabic } = useLanguage();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { labelKey: 'footer.home', href: '#top' },
    { labelKey: 'footer.about', href: '#about' },
    { labelKey: 'footer.themedNights', href: '#themed-nights' },
    { labelKey: 'footer.location', href: '#location' },
  ];

  return (
    <footer className="relative bg-[#050d1f] border-t border-[#C9A84C]/15 overflow-hidden">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#C9A84C]/3 blur-3xl -translate-y-1/2" />
      </div>

      {/* ─────────── DESKTOP FOOTER ─────────── */}
      <div className="footer-grid max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-3 gap-12 ${isArabic ? 'text-right' : 'text-left'}`}>

          {/* Brand Column */}
          <div className="col-span-1">
            <div className="mb-5">
              <span
                className="text-2xl font-bold text-[#C9A84C] block"
                style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
              >
                {isArabic ? '\u0645\u0637\u0639\u0645 \u0627\u0644\u0623\u062d\u0645\u062f\u064a' : 'Al Ahmadi'}
              </span>
              <span
                className="text-gray-500 text-[10px] tracking-widest uppercase"
                style={{ letterSpacing: '0.2em' }}
              >
                {isArabic ? '\u0627\u0644\u062f\u0648\u0644\u064a' : 'International Restaurant'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-[#C9A84C]/50 to-transparent" />
              <span className="text-[#C9A84C]/40 text-xs">✦</span>
            </div>

            <p
              className="text-gray-500 text-sm leading-relaxed mb-6"
              style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
            >
              {t('footer.description')}
            </p>

            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/8 border border-[#C9A84C]/20 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <span
                className="text-[#C9A84C]/70 text-[10px] tracking-widest uppercase"
                style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
              >
                {t('footer.crownePlaza')}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <motion.button
                    onClick={() => scrollTo(link.href)}
                    whileHover={{ x: isArabic ? -4 : 4 }}
                    className={`text-gray-500 hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}
                    style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                  >
                    <span className="w-3 h-px bg-[#C9A84C]/40 flex-shrink-0" />
                    {t(link.labelKey)}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              {[
                { icon: '📍', value: isArabic ? '\u0634\u0627\u0631\u0639 \u0641\u0647\u062f \u0627\u0644\u0633\u0627\u0644\u0645\u060c \u0627\u0644\u0643\u0648\u064a\u062a' : 'Fahad Al-Salem Street, Kuwait City' },
                { icon: '📞', value: '+965 2244 5555' },
                { icon: '✉️', value: 'dining@alahmadirestaurant.com' },
              ].map((item, i) => (
                <li key={i} className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                  <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                  <span
                    className="text-gray-500 text-sm leading-relaxed"
                    style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                  >
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
          <p
            className="text-gray-600 text-xs"
            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
          >
            {t('footer.rights')}
          </p>
          <div className={`flex items-center gap-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {[{ k: 'footer.privacy' }, { k: 'footer.terms' }].map(({ k }) => (
              <button
                key={k}
                className="text-gray-600 hover:text-[#C9A84C] text-xs transition-colors"
                style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
              >
                {t(k)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────── MOBILE FOOTER ─────────── */}
      <div className="footer-mobile flex-col items-center text-center px-4 py-8 gap-6">
        {/* Brand */}
        <div>
          <span
            className="text-xl font-bold text-[#C9A84C]"
            style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
          >
            {isArabic ? '\u0645\u0637\u0639\u0645 \u0627\u0644\u0623\u062d\u0645\u062f\u064a \u0627\u0644\u062f\u0648\u0644\u064a' : 'Al Ahmadi International'}
          </span>
          <div className="mt-1 text-gray-600 text-[10px] tracking-widest uppercase">
            {isArabic ? '\u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a' : 'Crowne Plaza Kuwait'}
          </div>
        </div>

        {/* Compact nav links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {quickLinks.map((link) => (
            <button
              key={link.labelKey}
              onClick={() => scrollTo(link.href)}
              className="text-gray-500 hover:text-[#C9A84C] text-xs transition-colors"
              style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
            >
              {t(link.labelKey)}
            </button>
          ))}
        </div>

        {/* Phone */}
        <a
          href="tel:+96522445555"
          className="text-[#C9A84C] text-sm font-semibold"
        >
          +965 2244 5555
        </a>

        {/* Rights */}
        <p
          className="text-gray-700 text-[10px]"
          style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
        >
          {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
