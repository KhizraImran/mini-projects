import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import AnimatedSection from './AnimatedSection';

const hoursData = [
  { mealKey: 'location.everyday', timeKey: 'location.breakfastTime', dayKey: 'location.daily', icon: '🌅' },
  { mealKey: 'location.lunch', timeKey: 'location.lunchTime', dayKey: 'location.daily', icon: '☀️' },
  { mealKey: 'location.dinner', timeKey: 'location.dinnerTime', dayKey: 'location.daily', icon: '🌙' },
  { mealKey: 'location.friBreakfast', timeKey: 'location.friBreakfastTime', dayKey: 'location.friSat', icon: '🥂' },
];

const Location: React.FC = () => {
  const { t, isArabic } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="location" className="relative py-24 lg:py-32 bg-[#FDFAF4] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#C9A84C]/5 blur-3xl -translate-y-1/2 -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#0B1B3A]/5 blur-3xl translate-y-1/3 translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <AnimatedSection className="text-center mb-0">
          <div className={`flex items-center justify-center gap-3 mb-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="w-8 h-px bg-[#C9A84C]" />
            <span
              className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold"
              style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {t('location.label')}
            </span>
            <span className="w-8 h-px bg-[#C9A84C]" />
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1B3A] mb-6 leading-tight"
            style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
          >
            {t('location.title')}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[#C9A84C]">✦</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>

          <p
            className="text-base text-gray-600 leading-loose max-w-2xl mx-auto"
            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
          >
            {t('location.subtitle')}
          </p>
        </AnimatedSection>

        {/* Content: Map + Info — pt-16 after top header block */}
        <div
          ref={ref}
          className={`flex flex-col ${isArabic ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 pt-16`}
        >

          {/* MAP */}
          <AnimatedSection
            className="w-full lg:w-1/2"
            direction={isArabic ? 'right' : 'left'}
            duration={0.9}
          >
            <div className="map-container rounded-2xl overflow-hidden shadow-2xl shadow-black/15 border border-[#C9A84C]/15 h-full" style={{ minHeight: '400px' }}>
              <iframe
                title="Crowne Plaza Kuwait Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.6!2d47.9774!3d29.3697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c5f0e7c9bbf%3A0x2d3f2b8c5fa5c7a0!2sCrowne%20Plaza%20Kuwait!5e0!3m2!1sen!2skw!4v1620000000000!5m2!1sen!2skw"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>

          {/* RIGHT COLUMN: Hours + Contact */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">

            {/* Opening Hours Card */}
            <AnimatedSection direction={isArabic ? 'left' : 'right'} delay={0.15} duration={0.85}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#C9A84C]/20 bg-white shadow-xl shadow-black/8 p-8 lg:p-10 overflow-hidden relative group"
              >
                {/* Card glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A84C] via-[#E8C97A] to-[#C9A84C]" />

                <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-lg">
                    🕐
                  </div>
                  <h3
                    className="text-xl font-bold text-[#0B1B3A]"
                    style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
                  >
                    {t('location.hoursTitle')}
                  </h3>
                </div>

                {/* Hours list */}
                <ul className="space-y-3">
                  {hoursData.map((item, i) => (
                    <motion.li
                      key={item.mealKey}
                      initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      className={`hours-row flex items-center justify-between py-3 border-b border-gray-100 last:border-0 transition-all duration-200 ${isArabic ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className="text-xl w-8 text-center">{item.icon}</span>
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                          <p
                            className="text-[#0B1B3A] font-semibold text-sm"
                            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                          >
                            {t(item.mealKey)}
                          </p>
                          <p
                            className="text-gray-400 text-xs mt-0.5"
                            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                          >
                            {t(item.dayKey)}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-[#C9A84C] font-semibold text-sm"
                        style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                      >
                        {t(item.timeKey)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatedSection>

            {/* Contact Card */}
            <AnimatedSection direction={isArabic ? 'left' : 'right'} delay={0.25} duration={0.85}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-[#C9A84C]/20 bg-[#0B1B3A] shadow-2xl shadow-[#0B1B3A]/30 p-8 lg:p-10 overflow-hidden relative"
              >
                {/* Card glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C9A84C] via-[#E8C97A] to-[#C9A84C]" />

                <div className={`flex items-center gap-3 mb-6 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-lg">
                    📞
                  </div>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
                  >
                    {t('location.contactTitle')}
                  </h3>
                </div>

                {/* Contact items */}
                <ul className="space-y-6">
                  {[
                    {
                      icon: '📍',
                      label: isArabic ? '\u0627\u0644\u0639\u0646\u0648\u0627\u0646' : 'Address',
                      value: t('location.address'),
                    },
                    {
                      icon: '📞',
                      label: isArabic ? '\u0647\u0627\u062a\u0641' : 'Phone',
                      value: t('location.phone'),
                    },
                    {
                      icon: '✉️',
                      label: isArabic ? '\u0628\u0631\u064a\u062f \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a' : 'Email',
                      value: t('location.email'),
                    },
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className={`flex items-start gap-4 ${isArabic ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <span className="text-2xl mt-0.5 flex-shrink-0">{item.icon}</span>
                      <div>
                        <p
                          className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-1"
                          style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-gray-300 text-sm leading-relaxed"
                          style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* Book Now CTA */}
                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 16px 32px rgba(201,168,76,0.4)' }}
                    whileTap={{ scale: 0.96 }}
                    className="btn-primary w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A84C] via-[#E8C97A] to-[#C9A84C] text-[#0B1B3A] font-bold text-sm tracking-widest uppercase shadow-xl shadow-[#C9A84C]/25 ring-pulse"
                    style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                  >
                    {t('location.bookNow')}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
