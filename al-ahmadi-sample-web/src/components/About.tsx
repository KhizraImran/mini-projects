import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../context/LanguageContext';
import AnimatedSection from './AnimatedSection';

const stats = [
  { numKey: '30+', labelKey: 'about.stat1', icon: '🌍' },
  { numKey: '45+', labelKey: 'about.stat2', icon: '👨‍🍳' },
  { numKey: '15+', labelKey: 'about.stat3', icon: '⭐' },
  { numKey: '500+', labelKey: 'about.stat4', icon: '🍽️' },
];

const About: React.FC = () => {
  const { t, isArabic } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#FDFAF4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/4 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#0B1B3A]/4 blur-3xl translate-y-1/2 -translate-x-1/4" />

        {/* Decorative corner ornament */}
        <svg className={`absolute top-8 ${isArabic ? 'left-8' : 'right-8'} w-24 h-24 text-[#C9A84C]/10`} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="24" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 2 L50 98 M2 50 L98 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${isArabic ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-20 items-center`}>

          {/* Left: Image Panel */}
          <AnimatedSection
            className="w-full lg:w-5/12"
            direction={isArabic ? 'right' : 'left'}
            duration={0.9}
          >
            <div className="relative">
              {/* Main image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20"
                style={{ aspectRatio: '4/5' }}
              >
                <img
                  src="/images/about-restaurant.jpg"
                  alt="Elegant dining at Al Ahmadi"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A]/60 via-transparent to-transparent" />

                {/* Caption badge */}
                <div className={`absolute bottom-6 ${isArabic ? 'right-6' : 'left-6'} right-6`}>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#C9A84C]/30 rounded-full px-4 py-2">
                    <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                    <span className="text-white text-xs tracking-widest uppercase"
                      style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}>
                      {t('about.imageCaption')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: isArabic ? 20 : -20 }}
                animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className={`absolute -bottom-8 ${isArabic ? 'right-auto -left-8' : '-right-8'} bg-[#0B1B3A] rounded-2xl p-6 shadow-2xl border border-[#C9A84C]/20`}
                style={{ width: '160px' }}
              >
                <div className="text-3xl font-bold text-[#C9A84C] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>15+</div>
                <div className="text-gray-400 text-xs leading-tight"
                  style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}>
                  {t('about.stat3')}
                </div>
              </motion.div>

              {/* Second floating image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.7 }}
                className={`absolute -top-8 ${isArabic ? 'left-auto -right-6' : '-left-6'} w-32 h-32 rounded-xl overflow-hidden shadow-xl border-2 border-[#C9A84C]/30`}
              >
                <img
                  src="https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200"
                  alt="Luxury dining detail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Right: Text Content */}
          <div ref={ref} className="w-full lg:w-7/12">
            <AnimatedSection direction={isArabic ? 'left' : 'right'} delay={0.15} duration={0.8}>

              {/* Section label */}
              <div className={`flex items-center gap-3 mb-5 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                <span className="w-8 h-px bg-[#C9A84C]" />
                <span
                  className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold"
                  style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                >
                  {t('about.label')}
                </span>
              </div>

              {/* Heading */}
              <h2
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1B3A] leading-tight mb-6 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
              >
                {t('about.title')}
              </h2>

              {/* Gold divider */}
              <div className={`flex items-center gap-3 mb-8 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                <div className="h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />
                <span className="text-[#C9A84C]">✦</span>
                <div className="h-px w-8 bg-[#C9A84C]/40" />
              </div>

              {/* Description paragraphs */}
              <p
                className={`text-base text-gray-600 leading-loose max-w-2xl mb-6 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
              >
                {t('about.p1')}
              </p>
              <p
                className={`text-base text-gray-600 leading-loose max-w-2xl mb-12 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
              >
                {t('about.p2')}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.labelKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(201,168,76,0.15)' }}
                    className={`relative rounded-xl p-5 border border-[#C9A84C]/15 bg-white shadow-sm group transition-all duration-300 ${isArabic ? 'text-right' : 'text-left'}`}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div
                      className="text-2xl font-bold text-[#0B1B3A] mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {stat.numKey}
                    </div>
                    <div
                      className="text-xs text-gray-500 leading-tight"
                      style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                    >
                      {t(stat.labelKey)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
