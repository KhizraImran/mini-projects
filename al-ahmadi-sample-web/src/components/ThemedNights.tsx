import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useLanguage } from '../context/LanguageContext';
import AnimatedSection from './AnimatedSection';

interface NightData {
  nameKey: string;
  dayKey: string;
  descKey: string;
  tagKey: string;
  image: string;
  price: string;
  color: string;
  icon: string;
  emoji: string;
}

const nights: NightData[] = [
  {
    nameKey: 'themed.sunday.name',
    dayKey: 'themed.sunday.day',
    descKey: 'themed.sunday.desc',
    tagKey: 'themed.sunday.tag',
    image: 'https://images.pexels.com/photos/38549526/pexels-photo-38549526.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=500',
    price: '14.500 KD',
    color: 'from-[#0a3464] via-[#0d4a8a] to-[#0a2a52]',
    icon: '🦞',
    emoji: '🌊',
  },
  {
    nameKey: 'themed.monday.name',
    dayKey: 'themed.monday.day',
    descKey: 'themed.monday.desc',
    tagKey: 'themed.monday.tag',
    image: 'https://images.pexels.com/photos/36799182/pexels-photo-36799182.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=500',
    price: '12.500 KD',
    color: 'from-[#3d1a00] via-[#5c2800] to-[#2b1200]',
    icon: '🥩',
    emoji: '🔥',
  },
  {
    nameKey: 'themed.tuesday.name',
    dayKey: 'themed.tuesday.day',
    descKey: 'themed.tuesday.desc',
    tagKey: 'themed.tuesday.tag',
    image: 'https://images.pexels.com/photos/29934992/pexels-photo-29934992.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=500',
    price: '13.000 KD',
    color: 'from-[#1a3d00] via-[#264d00] to-[#0d2600]',
    icon: '🍱',
    emoji: '🌸',
  },
  {
    nameKey: 'themed.wednesday.name',
    dayKey: 'themed.wednesday.day',
    descKey: 'themed.wednesday.desc',
    tagKey: 'themed.wednesday.tag',
    image: 'https://images.pexels.com/photos/32401042/pexels-photo-32401042.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=500',
    price: '11.000 KD',
    color: 'from-[#3d2200] via-[#5c3300] to-[#2b1800]',
    icon: '🫙',
    emoji: '🌙',
  },
  {
    nameKey: 'themed.thursday.name',
    dayKey: 'themed.thursday.day',
    descKey: 'themed.thursday.desc',
    tagKey: 'themed.thursday.tag',
    image: 'https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=500',
    price: '13.500 KD',
    color: 'from-[#003d30] via-[#005244] to-[#002b22]',
    icon: '🍝',
    emoji: '🌿',
  },
  {
    nameKey: 'themed.friday.name',
    dayKey: 'themed.friday.day',
    descKey: 'themed.friday.desc',
    tagKey: 'themed.friday.tag',
    image: 'https://images.pexels.com/photos/3926205/pexels-photo-3926205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=500',
    price: '16.000 KD',
    color: 'from-[#3d0030] via-[#5c004a] to-[#2b0022]',
    icon: '🌐',
    emoji: '✨',
  },
];

const ThemedNights: React.FC = () => {
  const { t, isArabic } = useLanguage();
  const swiperRef = useRef<any>(null);

  return (
    <section id="themed-nights" className="relative py-24 lg:py-32 bg-[#0B1B3A] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/3 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 60%),
                              radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)`,
          }}
        />
        {/* Star-like particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#C9A84C]"
            style={{
              width: '2px', height: '2px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>

      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path d="M0 0L60 10.7C120 21.3 240 42.7 360 48C480 53.3 600 42.7 720 37.3C840 32 960 32 1080 37.3C1200 42.7 1320 53.3 1380 58.7L1440 64V0H0Z" fill="#FDFAF4"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <AnimatedSection className={`text-center mb-20 ${isArabic ? 'rtl' : ''}`}>
          <div className={`flex items-center justify-center gap-3 mb-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="w-8 h-px bg-[#C9A84C]" />
            <span
              className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase font-semibold"
              style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
            >
              {t('themed.label')}
            </span>
            <span className="w-8 h-px bg-[#C9A84C]" />
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
          >
            {t('themed.title')}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <span className="text-[#C9A84C]">✦</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </div>

          <p
            className="text-base text-gray-400 leading-loose max-w-2xl mx-auto"
            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
          >
            {t('themed.subtitle')}
          </p>
        </AnimatedSection>

        {/* Swiper Carousel */}
        <AnimatedSection delay={0.2} duration={0.9}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={false}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            dir={isArabic ? 'rtl' : 'ltr'}
            key={isArabic ? 'rtl' : 'ltr'}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-14"
          >
            {nights.map((night, index) => (
              <SwiperSlide key={night.nameKey}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="cuisine-card rounded-2xl overflow-hidden h-full"
                  style={{ minHeight: '520px' }}
                >
                  {/* Card Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={night.image}
                      alt={t(night.nameKey)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${night.color} opacity-70`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Day badge */}
                    <div className={`absolute top-4 ${isArabic ? 'left-4' : 'right-4'}`}>
                      <span className="text-2xl">{night.emoji}</span>
                    </div>

                    {/* Tag */}
                    <div className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'}`}>
                      <span
                        className="bg-[#C9A84C]/90 text-[#0B1B3A] text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                        style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                      >
                        {t(night.tagKey)}
                      </span>
                    </div>

                    {/* Night name overlay */}
                    <div className={`absolute bottom-4 ${isArabic ? 'right-4' : 'left-4'} right-4`}>
                      <p
                        className={`text-[#C9A84C] text-xs font-semibold mb-1 tracking-widest ${isArabic ? 'text-right' : 'text-left'}`}
                        style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                      >
                        {t(night.dayKey)}
                      </p>
                      <h3
                        className={`text-white text-xl font-bold leading-tight ${isArabic ? 'text-right' : 'text-left'}`}
                        style={{ fontFamily: isArabic ? "'Amiri', serif" : "'Playfair Display', serif" }}
                      >
                        {t(night.nameKey)}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 bg-gradient-to-b from-[#0d2247] to-[#0B1B3A] border border-[#C9A84C]/10 border-t-0 rounded-b-2xl flex flex-col flex-1">
                    <p
                      className={`text-gray-400 text-sm leading-relaxed mb-6 flex-1 ${isArabic ? 'text-right' : 'text-left'}`}
                      style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                    >
                      {t(night.descKey)}
                    </p>

                    {/* Price & Icon row */}
                    <div className={`flex items-center justify-between mb-5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div>
                        <span
                          className="text-[#C9A84C] text-2xl font-bold"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {night.price}
                        </span>
                        <span
                          className="text-gray-500 text-xs ml-1"
                          style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : undefined }}
                        >
                          {isArabic ? '' : '/'}{t('themed.perPerson')}
                        </span>
                      </div>
                      <span className="text-3xl">{night.icon}</span>
                    </div>

                    {/* Reserve button */}
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(201,168,76,0.3)' }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 rounded-xl border border-[#C9A84C]/50 text-[#C9A84C] text-xs font-semibold tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0B1B3A] transition-all duration-300"
                      style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
                    >
                      {t('themed.reserveNight')}
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedSection>

        {/* View Full Schedule CTA */}
        <AnimatedSection className="text-center mt-4" delay={0.3}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#0B1B3A] font-bold text-sm tracking-widest uppercase shadow-lg shadow-[#C9A84C]/20"
            style={{ fontFamily: isArabic ? "'Tajawal', sans-serif" : "'Montserrat', sans-serif" }}
          >
            {t('themed.cta')}
            <svg className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </AnimatedSection>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path d="M0 80L60 69.3C120 58.7 240 37.3 360 32C480 26.7 600 37.3 720 42.7C840 48 960 48 1080 42.7C1200 37.3 1320 26.7 1380 21.3L1440 16V80H0Z" fill="#FDFAF4"/>
        </svg>
      </div>
    </section>
  );
};

export default ThemedNights;
