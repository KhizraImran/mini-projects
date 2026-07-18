import AnimatedSection from '../components/AnimatedSection';

interface PromotionsProps {
  onNavigate: (page: string) => void;
}

const promotions = [
  {
    id: 'michelin',
    type: 'Featured Story',
    typeColor: 'bg-[#E4002B] text-white',
    title: 'Michelin Bib Gourmand 2023 — We Did It!',
    date: 'December 2022',
    image: 'https://images.pexels.com/photos/30120279/pexels-photo-30120279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700',
    isFeatured: true,
    desc: `We are humbled and honoured to announce that Nasi Ayam Hainan Chee Meng (Jalan Klang Lama) has been awarded the prestigious Michelin Bib Gourmand 2023 — the Michelin Guide's recognition of exceptional food at modest prices.\n\nThis honour belongs, first and foremost, to our loyal customers who have supported us for nearly six decades. It belongs to our kitchen team who begin work before dawn every morning. It belongs to the memory of our founder, Mr. Yeok Kai Seng, whose humble roadside stall became a Klang Valley institution.\n\nWe are one of the rare halal restaurants in Malaysia to receive this recognition, and we wear that distinction with enormous pride. Thank you, Kuala Lumpur.`,
    cta: null,
  },
  {
    id: 'hari-raya',
    type: 'Festive Special',
    typeColor: 'bg-[#4A1010] text-[#C9A84C]',
    title: 'Hari Raya Aidilfitri Set Meals',
    date: 'Limited Time Offer',
    image: 'https://images.pexels.com/photos/30120281/pexels-photo-30120281.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700',
    isFeatured: false,
    desc: 'Celebrate Hari Raya with family and loved ones at Chee Meng. Our Raya Set Meals include whole or half poached chicken, family-sized fragrant rice, seasonal greens, a complimentary pot of broth soup, and our trio of house sauces — all Halal certified. Perfect for large family gatherings.',
    cta: { label: 'Call to Book', href: 'tel:+60321440456' },
  },
  {
    id: 'cny',
    type: 'Festive Special',
    typeColor: 'bg-[#C9A84C] text-[#1A0A05]',
    title: 'Chinese New Year Family Feast Package',
    date: 'Available Annually',
    image: 'https://images.pexels.com/photos/33137968/pexels-photo-33137968.png?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700',
    isFeatured: false,
    desc: 'Ring in the Lunar New Year with our special CNY Family Feast — two whole poached chickens, festive lo sang (yee sang), a claypot of nourishing broth, seasonal vegetables, and unlimited rice for up to 8 persons. Available for dine-in at Bukit Bintang and Old Klang Road.',
    cta: { label: 'Enquire Now', href: 'mailto:enquiry@cheemeng.com.my' },
  },
  {
    id: 'catering',
    type: 'Catering Package',
    typeColor: 'bg-[#7B4F2E] text-[#FAF6EE]',
    title: 'Corporate & Event Catering Packages',
    date: 'Available Year-Round',
    image: 'https://images.pexels.com/photos/6830670/pexels-photo-6830670.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700',
    isFeatured: false,
    desc: 'Bring the Chee Meng experience to your office, wedding, or event. Our professional catering team handles everything from delivery to setup. Package options start from 20 pax. Full buffet setups available. All catering menus are JAKIM Halal certified.',
    cta: { label: 'Get a Quote', href: 'mailto:catering@cheemeng.com.my' },
  },
  {
    id: 'loyalty',
    type: 'Current Promo',
    typeColor: 'bg-[#4A1010] text-[#C9A84C]',
    title: 'Chee Meng Loyal Diner — Bring a Friend',
    date: 'Ongoing',
    image: 'https://images.pexels.com/photos/5652188/pexels-photo-5652188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700',
    isFeatured: false,
    desc: 'Bring a first-time diner to any Chee Meng outlet and enjoy a complimentary bowl of our signature chicken broth soup. We believe the best advertising is the joy of a shared meal — and the best experience is tasting Chee Meng for the first time.',
    cta: { label: 'View Locations', href: null },
    ctaPage: 'locations',
  },
];

export default function Promotions({ onNavigate }: PromotionsProps) {
  return (
    <div className="bg-[#FAF6EE]">
      {/* ===== PAGE HERO ===== */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/30120279/pexels-photo-30120279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/90 via-[#1A0A05]/55 to-[#1A0A05]/25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3">News & Offers</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl">
            Promotions <span className="italic font-normal">& Events</span>
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C9A84C]/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
          <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0 }); }} className="font-lato text-xs text-[#3D2B1F]/50 hover:text-[#C9A84C] transition-colors">Home</button>
          <span className="text-[#C9A84C]/40 text-xs">›</span>
          <span className="font-lato text-xs text-[#C9A84C]">Promotions & Events</span>
        </div>
      </div>

      {/* ===== FEATURED: MICHELIN STORY ===== */}
      <section className="py-20 md:py-28 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Latest Announcements</p>
              <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl">
                News & <span className="italic font-normal">Celebrations</span>
              </h2>
              <div className="gold-divider mx-auto mt-6" />
            </div>
          </AnimatedSection>

          {/* Featured Michelin story */}
          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white shadow-2xl rounded-sm overflow-hidden mb-16 border border-[#E4002B]/15">
              {/* Image */}
              <div className="relative h-64 lg:h-auto img-zoom overflow-hidden">
                <img
                  src={promotions[0].image}
                  alt={promotions[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block font-lato text-[9px] tracking-widest uppercase px-3 py-1 rounded-sm bg-[#E4002B] text-white">
                    ⭐ {promotions[0].type}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E4002B] flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-lato text-[#C9A84C] text-[10px] tracking-widest uppercase">Michelin Guide</p>
                      <p className="font-playfair text-white text-lg">Bib Gourmand 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="font-lato text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase mb-3">{promotions[0].date}</p>
                <h3 className="font-playfair text-[#4A1010] text-2xl sm:text-3xl leading-tight mb-5">{promotions[0].title}</h3>
                <div className="h-px bg-[#C9A84C]/20 mb-5" />
                <div className="font-nunito text-[#3D2B1F]/65 text-sm leading-relaxed space-y-4">
                  {promotions[0].desc.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Other promotions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promotions.slice(1).map((promo, idx) => (
              <AnimatedSection key={promo.id} delay={idx * 120}>
                <div className="bg-white border border-[#C9A84C]/15 rounded-sm overflow-hidden shadow-md card-hover h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 img-zoom overflow-hidden">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/50 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block font-lato text-[9px] tracking-widest uppercase px-3 py-1 rounded-sm ${promo.typeColor}`}>
                        {promo.type}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <p className="font-lato text-[#C9A84C] text-[10px] tracking-wider">{promo.date}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-playfair text-[#4A1010] text-xl mb-3 leading-tight">{promo.title}</h3>
                    <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed flex-1">{promo.desc}</p>
                    <div className="mt-5 pt-4 border-t border-[#C9A84C]/10">
                      {promo.cta && (
                        promo.cta.href ? (
                          <a
                            href={promo.cta.href}
                            className="btn-primary inline-block font-lato text-xs tracking-[0.12em] uppercase px-6 py-2.5 rounded-sm"
                          >
                            {promo.cta.label}
                          </a>
                        ) : promo.ctaPage ? (
                          <button
                            onClick={() => { onNavigate(promo.ctaPage!); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="btn-primary font-lato text-xs tracking-[0.12em] uppercase px-6 py-2.5 rounded-sm"
                          >
                            {promo.cta.label}
                          </button>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER / STAY UPDATED ===== */}
      <section className="py-14 bg-[#F0E8D8] border-t border-[#C9A84C]/15">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Stay in the Loop</p>
            <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl mb-5">
              Never Miss a <span className="italic font-normal">Promotion</span>
            </h2>
            <p className="font-nunito text-[#3D2B1F]/65 text-base leading-relaxed mb-8">
              Follow us on social media for the latest promotions, festive specials, and Chee Meng news. Or contact us directly for catering enquiries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/nasiayamhainancheemeng/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                Follow on Instagram
              </a>
              <a
                href="mailto:catering@cheemeng.com.my"
                className="btn-outline font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm text-[#4A1010] border-[#4A1010]/30 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              >
                Catering Enquiry
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
