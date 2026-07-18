import AnimatedSection from '../components/AnimatedSection';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const SectionDivider = () => (
  <div className="flex items-center gap-3 my-8">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
    <svg viewBox="0 0 30 30" className="w-4 h-4 text-[#C9A84C]" fill="currentColor">
      <path d="M15 2 L17.5 12.5 L28 15 L17.5 17.5 L15 28 L12.5 17.5 L2 15 L12.5 12.5 Z"/>
    </svg>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
  </div>
);

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/30120279/pexels-photo-30120279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    alt: 'Hainanese Chicken Rice',
    caption: 'Signature Hainanese Chicken Rice',
  },
  {
    src: 'https://images.pexels.com/photos/33137968/pexels-photo-33137968.png?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    alt: 'Restaurant Ambiance',
    caption: 'Heritage Restaurant Ambiance',
  },
  {
    src: 'https://images.pexels.com/photos/5652188/pexels-photo-5652188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    alt: 'Chicken Porridge',
    caption: 'Traditional Chicken Porridge',
  },
  {
    src: 'https://images.pexels.com/photos/24186393/pexels-photo-24186393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    alt: 'Whole Chicken',
    caption: 'Prized Whole Poached Chicken',
  },
  {
    src: 'https://images.pexels.com/photos/33965578/pexels-photo-33965578.png?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    alt: 'Tea House',
    caption: 'Warm Hainanese Hospitality',
  },
  {
    src: 'https://images.pexels.com/photos/5625100/pexels-photo-5625100.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600',
    alt: 'KL Night Market',
    caption: 'The Soul of Old Kuala Lumpur',
  },
];

const timelineEvents = [
  {
    year: '1965',
    title: 'A Dream Begins',
    desc: 'Mr. Yeok Kai Seng sets up a modest roadside chicken rice and porridge stall near Old Klang Road, Kuala Lumpur. Word of his exceptional broth and silky poached chicken spreads quickly through the neighbourhood.',
  },
  {
    year: '1970s',
    title: 'Growing Reputation',
    desc: 'Steady queues form daily at the stall. The Chee Meng name becomes synonymous with the finest Hainanese chicken rice in the Klang Valley. Loyal customers return again and again, bringing their families and friends.',
  },
  {
    year: '1990s',
    title: 'Expanding the Legacy',
    desc: 'The family opens the Bukit Bintang outlet, bringing the beloved recipe to the heart of Kuala Lumpur\'s commercial and tourist district. A second generation of the Yeok family continues the tradition.',
  },
  {
    year: '2000s',
    title: 'Glenmarie & Shah Alam',
    desc: 'A third branch opens in Glenmarie, Shah Alam — extending the Chee Meng family to the western Klang Valley. Three outlets now serve the sprawling metropolis, each maintaining the original recipe.',
  },
  {
    year: '2014',
    title: 'JAKIM Halal Certification',
    desc: 'All Chee Meng outlets receive full Halal certification from JAKIM — Malaysia\'s Department of Islamic Development — affirming our commitment to inclusivity and food integrity for all Malaysians.',
  },
  {
    year: '2023',
    title: 'Michelin Bib Gourmand',
    desc: 'The Old Klang Road branch is awarded the prestigious Michelin Bib Gourmand — one of the rare halal restaurants in Malaysia to receive this honour, placing Chee Meng on the world culinary map.',
  },
];

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="bg-[#FAF6EE]">
      {/* ===== PAGE HERO ===== */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/33137968/pexels-photo-33137968.png?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/90 via-[#1A0A05]/60 to-[#1A0A05]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3">Est. 1965</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl">
            Our <span className="italic font-normal">Story</span>
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C9A84C]/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
          <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0 }); }} className="font-lato text-xs text-[#3D2B1F]/50 hover:text-[#C9A84C] transition-colors">Home</button>
          <span className="text-[#C9A84C]/40 text-xs">›</span>
          <span className="font-lato text-xs text-[#C9A84C]">About Us</span>
        </div>
      </div>

      {/* ===== HERITAGE STORY ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Story */}
            <div>
              <AnimatedSection>
                <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">The Founder's Vision</p>
                <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl leading-tight mb-3">
                  Mr. Yeok Kai Seng
                </h2>
                <p className="font-marcellus text-[#7B4F2E] text-lg mb-6">A Humble Stall, An Enduring Legacy</p>
                <SectionDivider />
              </AnimatedSection>

              <AnimatedSection delay={150}>
                <div className="space-y-5 font-nunito text-[#3D2B1F]/70 text-base leading-relaxed">
                  <p>
                    In 1965, a young man from the Hainan province of China set up a modest stall along the busy roads of Kuala Lumpur. <strong className="text-[#4A1010]">Mr. Yeok Kai Seng</strong> had carried with him a centuries-old technique — the gentle poaching of free-range chicken in fragrant broth, served atop rice cooked in the same precious stock.
                  </p>
                  <p>
                    His recipe was deceptively simple, yet impossibly difficult to replicate. The silky texture of the chicken, the subtle depth of the broth, the precisely balanced blend of ginger, garlic, and sesame — every element calibrated through years of practice and instinct.
                  </p>
                  <p>
                    Word spread quickly. Neighbours, office workers, then whole families made their way to the humble stall. Queues stretched down the pavement. Politicians, hawkers, executives, and schoolchildren all sat side by side, united by the shared pleasure of a perfect plate of chicken rice.
                  </p>
                  <p>
                    That same spirit — democratic, nourishing, unfailingly delicious — endures today across three outlets and nearly six decades. The recipes have not changed. The commitment to quality has only deepened.
                  </p>
                </div>
              </AnimatedSection>

              {/* Quote block */}
              <AnimatedSection delay={300}>
                <div className="mt-10 border-l-4 border-[#C9A84C] pl-6 py-2">
                  <p className="font-playfair italic text-[#4A1010] text-xl leading-relaxed mb-3">
                    "The secret is patience. Good chicken rice cannot be rushed. The broth must be treated with respect."
                  </p>
                  <p className="font-lato text-xs text-[#C9A84C] tracking-widest uppercase">— Mr. Yeok Kai Seng, Founder</p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Image + Stats */}
            <div>
              <AnimatedSection direction="right" delay={100}>
                <div className="relative mb-8">
                  <div className="img-zoom rounded-sm overflow-hidden shadow-2xl">
                    <img
                      src="https://images.pexels.com/photos/6830670/pexels-photo-6830670.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700"
                      alt="Old Kuala Lumpur streets"
                      className="w-full h-80 md:h-[420px] object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/50 to-transparent rounded-sm" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-playfair text-white text-sm italic">Old Klang Road — where it all began, 1965</p>
                  </div>
                  {/* Decorative frame */}
                  <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#C9A84C]/50" />
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#C9A84C]/50" />
                </div>
              </AnimatedSection>

              {/* Stats */}
              <AnimatedSection delay={250}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '1965', label: 'Year Founded' },
                    { value: '3', label: 'Outlets' },
                    { value: 'JAKIM', label: 'Halal Certified' },
                    { value: 'Michelin', label: 'Bib Gourmand 2023' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white border border-[#C9A84C]/20 rounded-sm p-5 text-center"
                    >
                      <p className="font-playfair text-2xl text-[#C9A84C] font-bold mb-1">{stat.value}</p>
                      <p className="font-lato text-xs text-[#3D2B1F]/60 tracking-widest uppercase">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-20 bg-[#F0E8D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Our Journey</p>
              <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl">
                Six Decades of <span className="italic font-normal">Heritage</span>
              </h2>
              <div className="gold-divider mx-auto mt-6" />
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/30 transform sm:-translate-x-1/2" />

            <div className="space-y-10">
              {timelineEvents.map((event, idx) => (
                <AnimatedSection key={event.year} delay={idx * 100} direction={idx % 2 === 0 ? 'right' : 'left'}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`sm:w-5/12 pl-10 sm:pl-0 ${idx % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                      <div className={`bg-white border border-[#C9A84C]/20 rounded-sm p-6 shadow-sm ${idx % 2 === 0 ? 'sm:ml-auto' : ''}`}>
                        <p className="font-playfair text-[#C9A84C] text-2xl font-bold mb-2">{event.year}</p>
                        <h3 className="font-playfair text-[#4A1010] text-lg mb-3">{event.title}</h3>
                        <p className="font-nunito text-[#3D2B1F]/65 text-sm leading-relaxed">{event.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-4 sm:left-1/2 top-6 w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-[#F0E8D8] transform sm:-translate-x-1/2 -translate-x-1.5 flex-shrink-0" />

                    {/* Empty space for other side */}
                    <div className="hidden sm:block sm:w-5/12" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== HALAL CERTIFICATION ===== */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Halal content */}
            <AnimatedSection direction="left">
              <p className="font-lato text-[#4CAF50] text-xs tracking-[0.3em] uppercase mb-4">Food Integrity</p>
              <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl leading-tight mb-6">
                Halal Certified<br />
                <span className="italic font-normal">by JAKIM</span>
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-5 font-nunito text-[#3D2B1F]/70 text-base leading-relaxed mb-8">
                <p>
                  We are proud to carry full Halal certification from <strong className="text-[#4A1010]">JAKIM</strong> — the Department of Islamic Development Malaysia — across all our outlets. This certification reflects our unwavering commitment to food integrity and serves every Malaysian, regardless of faith.
                </p>
                <p>
                  Our supply chain is monitored rigorously. Every chicken is sourced from JAKIM-certified suppliers. Our kitchen maintains strict halal protocols, with regular inspections ensuring compliance at every stage — from procurement to preparation to plating.
                </p>
                <p>
                  Chee Meng is one of the rare halal restaurants in Malaysia to have also earned a Michelin Bib Gourmand — a testament that exceptional quality and halal standards go hand in hand.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'JAKIM Halal Certified', icon: '✓' },
                  { label: 'Certified Halal Suppliers', icon: '✓' },
                  { label: 'Regular Compliance Audits', icon: '✓' },
                  { label: 'Strict Kitchen Protocols', icon: '✓' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#1B5E20] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-lato text-sm text-[#3D2B1F]/70">{item.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right: Halal badge display */}
            <AnimatedSection direction="right" delay={150}>
              <div className="bg-[#FAF6EE] border border-[#C9A84C]/20 rounded-sm p-10 text-center">
                {/* Large Halal symbol */}
                <div className="w-32 h-32 rounded-full bg-[#1B5E20] border-4 border-[#4CAF50]/30 flex flex-col items-center justify-center mx-auto mb-6 shadow-lg">
                  <p className="font-playfair text-white text-2xl font-bold">حلال</p>
                  <p className="font-lato text-[#A5D6A7] text-xs tracking-[0.2em] mt-1">HALAL</p>
                </div>
                <h3 className="font-playfair text-[#4A1010] text-2xl mb-2">JAKIM Certified Halal</h3>
                <p className="font-lato text-xs text-[#C9A84C] tracking-widest uppercase mb-6">All Chee Meng Outlets</p>
                <div className="gold-divider mx-auto mb-6" />
                <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed">
                  Malaysia's strictest halal certification authority. Verified, trusted, and renewed annually for your assurance.
                </p>

                {/* Michelin note */}
                <div className="mt-8 pt-6 border-t border-[#C9A84C]/20">
                  <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-2">Also Recognised By</p>
                  <div className="inline-flex items-center gap-2 bg-black rounded-sm px-4 py-2">
                    <div className="w-6 h-6 rounded-full bg-[#E4002B] flex items-center justify-center">
                      <span className="text-white text-[7px] font-bold">BIB</span>
                    </div>
                    <div className="text-left">
                      <p className="font-lato text-[9px] text-[#C9A84C] tracking-widest uppercase">Michelin Guide</p>
                      <p className="font-lato text-[10px] text-white">Bib Gourmand 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== PHOTO GALLERY ===== */}
      <section className="py-20 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Moments & Memories</p>
              <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl">
                A Glimpse of <span className="italic font-normal">Chee Meng</span>
              </h2>
              <div className="gold-divider mx-auto mt-6" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((img, idx) => (
              <AnimatedSection key={img.src} delay={idx * 80}>
                <div className={`img-zoom rounded-sm overflow-hidden shadow-md ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <div className="relative group">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${idx === 0 ? 'h-56 md:h-[420px]' : 'h-40 md:h-48'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="font-lato text-white text-xs tracking-wide">{img.caption}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="pattern-bg py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Come Taste History</p>
            <h2 className="font-playfair text-[#FAF6EE] text-3xl sm:text-4xl leading-tight mb-6">
              Sixty Years of Flavour,<br />
              <span className="italic text-[#C9A84C]">Awaiting You</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                Find a Location
              </button>
              <button
                onClick={() => { onNavigate('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                View Our Menu
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
