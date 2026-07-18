import AnimatedSection from '../components/AnimatedSection';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const MichelinBadge = () => (
  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-[#C9A84C]/50 rounded-sm px-4 py-3 michelin-glow">
    <svg viewBox="0 0 32 32" className="w-7 h-7 flex-shrink-0" fill="none">
      <circle cx="16" cy="16" r="15" fill="#E4002B" stroke="#C9A84C" strokeWidth="0.5"/>
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="bold">BIB</text>
    </svg>
    <div>
      <p className="font-lato text-[10px] text-[#C9A84C] tracking-[0.15em] uppercase">Michelin Guide</p>
      <p className="font-playfair text-sm text-white leading-tight">Bib Gourmand 2023</p>
    </div>
  </div>
);

const HalalBadge = () => (
  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-[#4CAF50]/40 rounded-sm px-4 py-3">
    <svg viewBox="0 0 32 32" className="w-7 h-7 flex-shrink-0" fill="none">
      <circle cx="16" cy="16" r="15" fill="#1B5E20" stroke="#4CAF50" strokeWidth="0.5"/>
      <path d="M16 6 C10.5 6 6 10.5 6 16 C6 21.5 10.5 26 16 26 C21.5 26 26 21.5 26 16 C26 10.5 21.5 6 16 6Z" fill="#2E7D32" opacity="0.5"/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6" fontFamily="Arial" fontWeight="bold">HALAL</text>
      <text x="50%" y="68%" dominantBaseline="middle" textAnchor="middle" fill="#A5D6A7" fontSize="4" fontFamily="Arial">JAKIM</text>
    </svg>
    <div>
      <p className="font-lato text-[10px] text-[#4CAF50] tracking-[0.15em] uppercase">JAKIM Certified</p>
      <p className="font-playfair text-sm text-white leading-tight">Halal Restaurant</p>
    </div>
  </div>
);

const OrnamentalDivider = () => (
  <div className="flex items-center gap-3 my-6">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
    <svg viewBox="0 0 30 30" className="w-5 h-5 text-[#C9A84C]" fill="currentColor">
      <path d="M15 2 L17.5 12.5 L28 15 L17.5 17.5 L15 28 L12.5 17.5 L2 15 L12.5 12.5 Z"/>
    </svg>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
  </div>
);

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="bg-[#FAF6EE]">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/30120279/pexels-photo-30120279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600')`,
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A05]/60 via-[#1A0A05]/55 to-[#1A0A05]/85" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0A05]/40 via-transparent to-[#1A0A05]/40" />

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M30 30 L35 20 L40 30 L35 40 Z' /%3E%3Cpath d='M30 30 L20 25 L30 20 L40 25 Z' /%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">
          {/* Pre-title */}
          <div
            className="inline-block mb-6"
            style={{ animation: 'fadeInUp 0.8s ease forwards' }}
          >
            <p className="font-lato text-[#C9A84C] text-xs sm:text-sm tracking-[0.4em] uppercase">
              ✦ Kuala Lumpur's Legendary Heritage Restaurant ✦
            </p>
          </div>

          {/* Main title */}
          <div style={{ animation: 'fadeInUp 0.8s ease 0.15s both' }}>
            <h1 className="font-playfair text-white leading-tight mb-2">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-[#E8C96D]">
                Nasi Ayam Hainan
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                Chee Meng
              </span>
            </h1>
          </div>

          {/* Ornamental line */}
          <div
            className="flex items-center justify-center gap-4 my-6"
            style={{ animation: 'fadeInUp 0.8s ease 0.3s both' }}
          >
            <div className="w-16 sm:w-24 h-px bg-[#C9A84C]/60" />
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#C9A84C]" fill="currentColor">
              <path d="M10 1 L12 8 L19 8 L13.5 12.5 L15.5 19.5 L10 15 L4.5 19.5 L6.5 12.5 L1 8 L8 8 Z"/>
            </svg>
            <div className="w-16 sm:w-24 h-px bg-[#C9A84C]/60" />
          </div>

          {/* Tagline */}
          <div style={{ animation: 'fadeInUp 0.8s ease 0.4s both' }}>
            <p className="font-marcellus text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-2">
              Authentic Hainanese Heritage Since 1965
            </p>
            <p className="font-lato text-white/60 text-sm sm:text-base tracking-wide max-w-xl mx-auto">
              Three generations of perfecting the art of Hainanese chicken rice — tender, fragrant, and celebrated.
            </p>
          </div>

          {/* Badges */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 mb-10"
            style={{ animation: 'fadeInUp 0.8s ease 0.55s both' }}
          >
            <MichelinBadge />
            <HalalBadge />
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ animation: 'fadeInUp 0.8s ease 0.7s both' }}
          >
            <button
              onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-primary font-lato text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-sm w-full sm:w-auto"
            >
              View Our Locations
            </button>
            <button
              onClick={() => { onNavigate('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-outline font-lato text-sm tracking-[0.15em] uppercase px-8 py-4 rounded-sm w-full sm:w-auto text-white border-white/50 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            >
              See Our Menu
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="font-lato text-white/40 text-xs tracking-[0.2em] uppercase">Scroll</p>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C]/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ===== LEGACY INTRO SECTION ===== */}
      <section className="py-20 md:py-28 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Text */}
            <div>
              <AnimatedSection delay={0}>
                <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">
                  Our Legacy
                </p>
                <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl leading-tight mb-6">
                  A Beloved<br />
                  <span className="italic font-normal">Klang Valley</span><br />
                  Institution
                </h2>
                <OrnamentalDivider />
              </AnimatedSection>

              <AnimatedSection delay={150}>
                <p className="font-nunito text-[#3D2B1F]/70 text-base leading-relaxed mb-5">
                  Founded in 1965 by <strong className="text-[#4A1010] font-semibold">Mr. Yeok Kai Seng</strong>, Nasi Ayam Hainan Chee Meng began as a humble roadside stall near Old Klang Road, serving fragrant Hainanese chicken rice and comforting porridge to the people of Kuala Lumpur.
                </p>
                <p className="font-nunito text-[#3D2B1F]/70 text-base leading-relaxed mb-8">
                  Nearly six decades on, that same dedication to quality and authentic Hainanese flavour has earned us the prestigious <strong className="text-[#4A1010]">Michelin Bib Gourmand 2023</strong> — placing us among the finest value-driven eateries in Malaysia, and making us one of the rare halal restaurants to receive this honour.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={250}>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="text-center sm:text-left">
                    <p className="font-playfair text-4xl text-[#C9A84C] font-bold">1965</p>
                    <p className="font-lato text-xs text-[#3D2B1F]/60 tracking-widest uppercase">Est. Year</p>
                  </div>
                  <div className="w-px bg-[#C9A84C]/20 hidden sm:block" />
                  <div className="text-center sm:text-left">
                    <p className="font-playfair text-4xl text-[#C9A84C] font-bold">3</p>
                    <p className="font-lato text-xs text-[#3D2B1F]/60 tracking-widest uppercase">Outlets in KL</p>
                  </div>
                  <div className="w-px bg-[#C9A84C]/20 hidden sm:block" />
                  <div className="text-center sm:text-left">
                    <p className="font-playfair text-4xl text-[#C9A84C] font-bold">60<span className="text-2xl">+</span></p>
                    <p className="font-lato text-xs text-[#3D2B1F]/60 tracking-widest uppercase">Years of Heritage</p>
                  </div>
                </div>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
                >
                  Read Our Full Story
                </button>
              </AnimatedSection>
            </div>

            {/* Right: Image collage */}
            <div className="relative">
              <AnimatedSection direction="right" delay={100}>
                <div className="relative">
                  {/* Main image */}
                  <div className="img-zoom rounded-sm overflow-hidden shadow-2xl">
                    <img
                      src="https://images.pexels.com/photos/30120281/pexels-photo-30120281.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=550&w=700"
                      alt="Authentic Hainanese Chicken Rice"
                      className="w-full h-80 md:h-[420px] object-cover"
                    />
                  </div>
                  {/* Floating secondary image */}
                  <div className="absolute -bottom-6 -left-6 w-40 h-32 sm:w-52 sm:h-44 img-zoom rounded-sm overflow-hidden shadow-xl border-4 border-[#FAF6EE] hidden sm:block">
                    <img
                      src="https://images.pexels.com/photos/33137968/pexels-photo-33137968.png?auto=compress&cs=tinysrgb&fit=crop&h=200&w=280"
                      alt="Restaurant ambiance"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Year badge */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-[#4A1010] rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-[#C9A84C]/40">
                    <p className="font-playfair text-[#C9A84C] text-xl font-bold leading-none">60</p>
                    <p className="font-lato text-[#FAF6EE]/70 text-[9px] tracking-widest uppercase">Years</p>
                    <p className="font-lato text-[#C9A84C] text-[8px] tracking-widest uppercase">Heritage</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MICHELIN HIGHLIGHT BANNER ===== */}
      <section className="pattern-bg py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-16 bg-[#C9A84C]/30" />
              <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#C9A84C]" fill="currentColor">
                <path d="M10 1 L12 8 L19 8 L13.5 12.5 L15.5 19.5 L10 15 L4.5 19.5 L6.5 12.5 L1 8 L8 8 Z"/>
              </svg>
              <div className="h-px flex-1 max-w-16 bg-[#C9A84C]/30" />
            </div>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Recognised Excellence</p>
            <h2 className="font-playfair text-[#FAF6EE] text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Awarded the Michelin<br />
              <span className="italic text-[#C9A84C]">Bib Gourmand 2023</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-24 bg-[#C9A84C]/30" />
              <svg viewBox="0 0 30 30" className="w-4 h-4 text-[#C9A84C]" fill="currentColor">
                <path d="M15 2 L17.5 12.5 L28 15 L17.5 17.5 L15 28 L12.5 17.5 L2 15 L12.5 12.5 Z"/>
              </svg>
              <div className="h-px flex-1 max-w-24 bg-[#C9A84C]/30" />
            </div>
            <p className="font-nunito text-[#FAF6EE]/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Our Old Klang Road branch has been awarded the Michelin Bib Gourmand — the guide's seal of approval for exceptional food at modest prices. This recognition places us among the most treasured dining destinations in all of Kuala Lumpur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { onNavigate('promotions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                Read the Story
              </button>
              <button
                onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                Visit Old Klang Road
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SIGNATURE DISHES PREVIEW ===== */}
      <section className="py-20 md:py-28 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Taste of Tradition</p>
              <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl leading-tight mb-4">
                Signature <span className="italic font-normal">Dishes</span>
              </h2>
              <div className="gold-divider mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                image: 'https://images.pexels.com/photos/30120279/pexels-photo-30120279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
                title: 'Hainanese Chicken Rice',
                subtitle: 'Nasi Ayam Hainan',
                desc: 'Silky poached free-range chicken atop fragrant rice cooked in rich chicken broth — our timeless signature dish since 1965.',
                delay: 0,
              },
              {
                image: 'https://images.pexels.com/photos/5652188/pexels-photo-5652188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
                title: 'Chicken Porridge',
                subtitle: 'Bubur Ayam Hainan',
                desc: 'Silky smooth rice congee simmered to velvety perfection, crowned with tender shredded chicken and fragrant ginger.',
                delay: 150,
              },
              {
                image: 'https://images.pexels.com/photos/24186393/pexels-photo-24186393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
                title: 'Whole Poached Chicken',
                subtitle: 'Ayam Rebus Hainan',
                desc: 'A whole free-range chicken, poached in heritage broth, carved tableside — the centrepiece of any celebratory meal.',
                delay: 300,
              },
            ].map((dish) => (
              <AnimatedSection key={dish.title} delay={dish.delay}>
                <div className="menu-card bg-white rounded-sm overflow-hidden shadow-md">
                  <div className="img-zoom h-56 overflow-hidden">
                    <img src={dish.image} alt={dish.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <p className="font-lato text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase mb-1">{dish.subtitle}</p>
                    <h3 className="font-playfair text-[#4A1010] text-xl mb-3">{dish.title}</h3>
                    <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed">{dish.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={200}>
            <div className="text-center mt-12">
              <button
                onClick={() => { onNavigate('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-sm"
              >
                Explore Full Menu
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== OUTLETS STRIP ===== */}
      <section className="py-16 md:py-20 bg-[#F0E8D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Find Us</p>
              <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl">
                Three <span className="italic font-normal">Locations</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Bukit Bintang',
                address: '50, Jalan Bukit Bintang, KL',
                tag: 'Flagship',
                tagColor: 'bg-[#4A1010] text-[#C9A84C]',
                delay: 0,
              },
              {
                name: 'Old Klang Road',
                address: 'Jalan Klang Lama, KL',
                tag: 'Michelin Bib Gourmand',
                tagColor: 'bg-[#E4002B] text-white',
                delay: 150,
              },
              {
                name: 'Glenmarie',
                address: 'Shah Alam, Selangor',
                tag: 'Klang Valley',
                tagColor: 'bg-[#7B4F2E] text-[#FAF6EE]',
                delay: 300,
              },
            ].map((loc) => (
              <AnimatedSection key={loc.name} delay={loc.delay}>
                <div
                  className="bg-white border border-[#C9A84C]/20 rounded-sm p-6 text-center card-hover cursor-pointer"
                  onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <span className={`inline-block text-[9px] font-lato tracking-widest uppercase px-3 py-1 rounded-sm mb-4 ${loc.tagColor}`}>
                    {loc.tag}
                  </span>
                  <h3 className="font-playfair text-[#4A1010] text-xl mb-2">{loc.name}</h3>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm">{loc.address}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={200}>
            <div className="text-center mt-10">
              <button
                onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline font-lato text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-sm text-[#4A1010] border-[#4A1010]/30 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                View All Locations & Hours
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== HALAL ASSURANCE STRIP ===== */}
      <section className="py-14 bg-white border-y border-[#C9A84C]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#1B5E20]/10 border border-[#4CAF50]/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="#1B5E20" opacity="0.3"/>
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="#4CAF50" strokeWidth="1.5" fill="none"/>
                    <path d="M9 12l2 2 4-4" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-playfair text-[#4A1010] text-xl mb-1">JAKIM Halal Certified</h3>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed max-w-sm">
                    All our outlets are fully certified Halal by JAKIM — Malaysia's Department of Islamic Development. Dine with complete peace of mind.
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px h-16 bg-[#C9A84C]/20" />

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#4A1010]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#C9A84C]">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-playfair text-[#4A1010] text-xl mb-1">Three KL Outlets</h3>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed max-w-sm">
                    Bukit Bintang, Old Klang Road, and Glenmarie — conveniently located across the Klang Valley for your dining pleasure.
                  </p>
                </div>
              </div>

              <div className="hidden md:block w-px h-16 bg-[#C9A84C]/20" />

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#4A1010]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#C9A84C]">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-playfair text-[#4A1010] text-xl mb-1">Family Dining & Catering</h3>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed max-w-sm">
                    Perfect for family gatherings, corporate events, and celebrations. Ask us about our catering packages.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 md:py-24 bg-[#FAF6EE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-5">Book Your Visit</p>
            <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl leading-tight mb-4">
              Experience the Taste<br />
              <span className="italic font-normal text-[#7B4F2E]">of Living Heritage</span>
            </h2>
            <OrnamentalDivider />
            <p className="font-nunito text-[#3D2B1F]/60 text-base leading-relaxed mb-10">
              Whether you're a long-time regular or discovering us for the first time, we invite you to taste the dish that has defined Hainanese chicken rice for over six decades in Kuala Lumpur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { onNavigate('order'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-sm w-full sm:w-auto"
              >
                Order Online
              </button>
              <button
                onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline font-lato text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-sm w-full sm:w-auto text-[#4A1010] border-[#4A1010]/30 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                Contact Us
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
