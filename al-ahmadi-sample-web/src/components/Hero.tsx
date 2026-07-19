import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t, isArabic } = useLanguage();

  const scrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLocation = () => {
    document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video / Fallback Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient fallback + simulated cinematic video bg */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #050d1f 0%, #0B1B3A 40%, #0d2247 60%, #071128 100%)',
          }}
        />

        {/* Decorative animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Background image layer */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/images/restaurant-hero.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.45,
            }}
          />

          {/* Animated particle dots */}
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#C9A84C]"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050d1f]/70 via-[#0B1B3A]/40 to-[#050d1f]/95 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1f]/60 via-transparent to-[#050d1f]/60 z-10" />
      </div>

      {/* Video placeholder notice bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-24 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex items-center gap-2 text-[10px] text-[#C9A84C]/50 tracking-widest uppercase border border-[#C9A84C]/10 px-4 py-1.5 rounded-full backdrop-blur-sm bg-black/10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/50 animate-pulse" />
          {isArabic ? '\u0641\u064a\u062f\u064a\u0648 \u0633\u064a\u0646\u0645\u0627\u0626\u064a \u2014 \u0645\u0643\u0627\u0646 \u0639\u0631\u0636 \u0627\u0644\u0641\u064a\u062f\u064a\u0648' : 'Cinematic Video Background Placeholder'}
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span
            className="text-[#C9A84C] text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
          >
            {t('hero.badge')}
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </motion.div>

        {/* Restaurant Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
          style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
        >
          <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight mb-2">
            {isArabic ? '\u0645\u0637\u0639\u0645 \u0627\u0644\u0623\u062d\u0645\u062f\u064a' : 'Al Ahmadi'}
          </span>
          <span
            className="block gold-shimmer text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            {isArabic ? '\u0627\u0644\u062f\u0648\u0644\u064a' : 'International'}
          </span>
          {!isArabic && (
            <span className="block text-white/80 text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.2em] mt-1">
              RESTAURANT
            </span>
          )}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
          <span className="text-[#C9A84C] text-base">✦</span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-[#E8C97A] text-xl sm:text-2xl md:text-3xl font-light italic mb-4 tracking-wide"
          style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Cormorant Garamond', serif" }}
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}
        >
          <motion.button
            onClick={scrollToLocation}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(201,168,76,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary ring-pulse px-10 py-4 rounded-full text-[#0B1B3A] font-bold tracking-widest uppercase text-sm bg-gradient-to-r from-[#C9A84C] via-[#E8C97A] to-[#C9A84C] shadow-xl shadow-[#C9A84C]/30"
            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
          >
            {t('hero.cta')}
          </motion.button>

          <motion.button
            onClick={scrollToNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-full border border-white/20 text-white/80 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 text-sm tracking-widest uppercase"
            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
          >
            {isArabic ? '\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u0637\u0639\u0645' : 'Explore'}
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToNext}
      >
        <span
          className="text-[#C9A84C]/60 text-[10px] tracking-widest uppercase"
          style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
        >
          {t('hero.scrollDown')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[#C9A84C]/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 bg-[#C9A84C]/60 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Stats row at hero bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-20 left-0 right-0 z-30 hidden lg:flex justify-center"
      >
        <div className="flex items-center gap-12 bg-white/5 backdrop-blur-md border border-[#C9A84C]/15 rounded-2xl px-12 py-5">
          {[
            { num: '30+', label: isArabic ? '\u0645\u0637\u0628\u062e \u0639\u0627\u0644\u0645\u064a' : 'Global Cuisines' },
            { num: '|', label: '' },
            { num: '7', label: isArabic ? '\u0644\u064a\u0627\u0644\u064a \u0645\u0645\u064a\u0632\u0629' : 'Themed Nights' },
            { num: '|', label: '' },
            { num: '15+', label: isArabic ? '\u0633\u0646\u0648\u0627\u062a \u0645\u0646 \u0627\u0644\u062a\u0645\u064a\u0632' : 'Years of Excellence' },
            { num: '|', label: '' },
            { num: '500+', label: isArabic ? '\u0636\u064a\u0641 \u064a\u0648\u0645\u064a\u064b\u0627' : 'Happy Guests Daily' },
          ].map((item, i) => (
            item.num === '|'
              ? <div key={i} className="w-px h-8 bg-[#C9A84C]/20" />
              : (
                <div key={i} className={`text-center ${isArabic ? 'text-right' : ''}`}>
                  <div className="text-[#C9A84C] text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.num}
                  </div>
                  <div className="text-gray-400 text-[10px] tracking-wider uppercase mt-0.5"
                    style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}>
                    {item.label}
                  </div>
                </div>
              )
          ))}
        </div>
      </motion.div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path d="M0 80L60 69.3C120 58.7 240 37.3 360 32C480 26.7 600 37.3 720 42.7C840 48 960 48 1080 42.7C1200 37.3 1320 26.7 1380 21.3L1440 16V80H0Z" fill="#FDFAF4"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
