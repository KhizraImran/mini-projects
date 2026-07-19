import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const FloatingBookBtn: React.FC = () => {
  const { t, isArabic } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(201,168,76,0.5)' }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 z-50 md:hidden ring-pulse bg-gradient-to-r from-[#C9A84C] via-[#E8C97A] to-[#C9A84C] text-[#0B1B3A] font-bold text-xs tracking-widest uppercase rounded-full shadow-2xl shadow-[#C9A84C]/30 px-7 py-3.5"
          style={{
            right: isArabic ? 'auto' : '24px',
            left: isArabic ? '24px' : 'auto',
            fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif",
          }}
        >
          {t('nav.bookTable')}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingBookBtn;
