import AnimatedSection from '../components/AnimatedSection';

interface MenuProps {
  onNavigate: (page: string) => void;
}

const menuCategories = [
  {
    id: 'signatures',
    label: 'Signatures',
    title: 'Signature Dishes',
    items: [
      {
        name: 'Hainanese Chicken Rice',
        malay: 'Nasi Ayam Hainan',
        desc: 'Silky poached free-range chicken, sliced and served atop fragrant rice cooked in rich chicken broth. Accompanied by house-made chilli sauce, ginger paste, and dark soy.',
        price: 'From RM 13',
        image: 'https://images.pexels.com/photos/30120279/pexels-photo-30120279.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Best Seller',
        tagColor: 'bg-[#C9A84C] text-[#1A0A05]',
        isMichelin: true,
      },
      {
        name: 'Roasted Chicken Rice',
        malay: 'Nasi Ayam Panggang',
        desc: 'Crispy-skinned roasted chicken, glazed with house soy and sesame marinade. Served on fragrant chicken broth rice with the trio of classic sauces.',
        price: 'From RM 14',
        image: 'https://images.pexels.com/photos/24186393/pexels-photo-24186393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Popular',
        tagColor: 'bg-[#4A1010] text-[#C9A84C]',
        isMichelin: false,
      },
      {
        name: 'Steamed Chicken Porridge',
        malay: 'Bubur Ayam Hainan',
        desc: 'Velvety smooth rice congee simmered for hours, crowned with shredded poached chicken, spring onions, crispy shallots, and fragrant ginger julienne.',
        price: 'From RM 11',
        image: 'https://images.pexels.com/photos/5652188/pexels-photo-5652188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Heritage',
        tagColor: 'bg-[#7B4F2E] text-[#FAF6EE]',
        isMichelin: false,
      },
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    title: 'Premium Selections',
    items: [
      {
        name: 'Whole Poached Chicken',
        malay: 'Ayam Rebus Satu Ekor',
        desc: 'A whole free-range chicken, meticulously poached in our heritage broth until perfectly tender. Served with full portions of rice, soup, and all condiments. Ideal for 3–4 persons.',
        price: 'From RM 68',
        image: 'https://images.pexels.com/photos/24186393/pexels-photo-24186393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'For Groups',
        tagColor: 'bg-[#C9A84C] text-[#1A0A05]',
        isMichelin: false,
      },
      {
        name: 'Half Poached Chicken',
        malay: 'Ayam Rebus Separuh',
        desc: 'Half a whole chicken, poached to silky perfection. Served with fragrant rice and the full suite of Chee Meng condiments. Suitable for 2 persons.',
        price: 'From RM 38',
        image: 'https://images.pexels.com/photos/30120281/pexels-photo-30120281.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'For 2',
        tagColor: 'bg-[#4A1010] text-[#C9A84C]',
        isMichelin: false,
      },
    ],
  },
  {
    id: 'sides',
    label: 'Sides & Soups',
    title: 'Sides & Soups',
    items: [
      {
        name: 'Chicken Broth Soup',
        malay: 'Sup Ayam',
        desc: 'Clear, deeply flavoured chicken broth, slow-simmered from our whole chickens with ginger and spring onion. Light yet profoundly satisfying.',
        price: 'RM 4',
        image: 'https://images.pexels.com/photos/24186408/pexels-photo-24186408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Signature',
        tagColor: 'bg-[#7B4F2E] text-[#FAF6EE]',
        isMichelin: false,
      },
      {
        name: 'Blanched Seasonal Vegetables',
        malay: 'Sayur Rebus',
        desc: 'Fresh seasonal greens, blanched and dressed with oyster sauce and garlic oil. A clean, wholesome accompaniment to any chicken rice meal.',
        price: 'From RM 9',
        image: 'https://images.pexels.com/photos/8054819/pexels-photo-8054819.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Healthy',
        tagColor: 'bg-[#1B5E20] text-white',
        isMichelin: false,
      },
      {
        name: 'Beancurd with Sauce',
        malay: 'Tauhu Goreng',
        desc: 'Golden silken tofu, lightly pan-fried and drizzled with our house soy dressing, spring onions, and toasted sesame seeds.',
        price: 'From RM 8',
        image: 'https://images.pexels.com/photos/20843711/pexels-photo-20843711.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Vegetarian',
        tagColor: 'bg-[#1B5E20] text-white',
        isMichelin: false,
      },
    ],
  },
  {
    id: 'beverages',
    label: 'Beverages',
    title: 'Beverages',
    items: [
      {
        name: 'Chinese Tea',
        malay: 'Teh Cina',
        desc: 'Complimentary pot of house Chinese tea — a crisp, clean counterpoint to the richness of the meal.',
        price: 'Complimentary',
        image: 'https://images.pexels.com/photos/33965578/pexels-photo-33965578.png?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Complimentary',
        tagColor: 'bg-[#C9A84C] text-[#1A0A05]',
        isMichelin: false,
      },
      {
        name: 'Barley Drink',
        malay: 'Air Barli',
        desc: 'Chilled or warm house barley water, lightly sweetened — a timeless Malaysian refresher.',
        price: 'RM 3.50',
        image: 'https://images.pexels.com/photos/32835478/pexels-photo-32835478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
        tag: 'Traditional',
        tagColor: 'bg-[#7B4F2E] text-[#FAF6EE]',
        isMichelin: false,
      },
    ],
  },
];

export default function Menu({ onNavigate }: MenuProps) {
  return (
    <div className="bg-[#FAF6EE]">
      {/* ===== PAGE HERO ===== */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/30120281/pexels-photo-30120281.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/90 via-[#1A0A05]/55 to-[#1A0A05]/25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3">Hainanese Heritage Cuisine</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl">
            Our <span className="italic font-normal">Menu</span>
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C9A84C]/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
          <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0 }); }} className="font-lato text-xs text-[#3D2B1F]/50 hover:text-[#C9A84C] transition-colors">Home</button>
          <span className="text-[#C9A84C]/40 text-xs">›</span>
          <span className="font-lato text-xs text-[#C9A84C]">Menu</span>
        </div>
      </div>

      {/* ===== MENU NOTE ===== */}
      <section className="py-12 bg-[#FAF6EE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Authentic Since 1965</p>
            <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl mb-5">
              A Menu Born from <span className="italic font-normal">Tradition</span>
            </h2>
            <p className="font-nunito text-[#3D2B1F]/65 text-base leading-relaxed mb-5">
              Our menu showcases the finest Hainanese chicken rice dishes — unchanged recipes passed down through three generations. All ingredients are sourced fresh daily, and all dishes are prepared using JAKIM halal-certified produce.
            </p>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-[#C9A84C]/30 rounded-sm px-5 py-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#C9A84C] flex-shrink-0">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
              </svg>
              <p className="font-lato text-xs text-[#7B4F2E] tracking-wide">
                <strong>Note:</strong> Menu varies by outlet. Full menu available at Bukit Bintang. Prices shown are indicative.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== MENU CATEGORIES ===== */}
      {menuCategories.map((category, catIdx) => (
        <section
          key={category.id}
          className={`py-16 md:py-20 ${catIdx % 2 === 0 ? 'bg-[#FAF6EE]' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-[#C9A84C]/20" />
                <div className="text-center">
                  <p className="font-lato text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-1">— {category.label} —</p>
                  <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl">{category.title}</h2>
                </div>
                <div className="h-px flex-1 bg-[#C9A84C]/20" />
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, itemIdx) => (
                <AnimatedSection key={item.name} delay={itemIdx * 120}>
                  <div className="menu-card bg-white rounded-sm overflow-hidden shadow-md h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-52 img-zoom overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Tag */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-block font-lato text-[9px] tracking-widest uppercase px-3 py-1 rounded-sm ${item.tagColor}`}>
                          {item.tag}
                        </span>
                      </div>
                      {/* Michelin badge */}
                      {item.isMichelin && (
                        <div className="absolute top-3 right-3 bg-[#E4002B] rounded-sm px-2 py-1 flex items-center gap-1">
                          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="white">
                            <path d="M8 1l1.5 4.5H14L10 8l1.5 4.5L8 10l-3.5 2.5L6 8 2 5.5h4.5z"/>
                          </svg>
                          <span className="font-lato text-white text-[8px] tracking-wide">Michelin</span>
                        </div>
                      )}
                      {/* Halal dot */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 rounded-sm px-2 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                        <span className="font-lato text-white text-[8px] tracking-wide">Halal</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="font-lato text-[#C9A84C] text-[9px] tracking-[0.25em] uppercase mb-1">{item.malay}</p>
                      <h3 className="font-playfair text-[#4A1010] text-xl mb-3">{item.name}</h3>
                      <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed flex-1">{item.desc}</p>
                      <div className="mt-4 pt-4 border-t border-[#C9A84C]/10 flex items-center justify-between">
                        <p className="font-playfair text-[#C9A84C] text-lg font-semibold">{item.price}</p>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
                          <span className="font-lato text-[9px] text-[#4CAF50] tracking-wide uppercase">Halal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ===== CONDIMENTS SECTION ===== */}
      <section className="py-14 bg-[#F0E8D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">The Perfect Trio</p>
              <h2 className="font-playfair text-[#4A1010] text-3xl">
                Our Signature <span className="italic font-normal">Condiments</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'House Chilli Sauce',
                desc: 'A bright, punchy blend of fresh red chillies, garlic, and lime — balanced with a touch of ginger. Made fresh daily.',
                icon: '🌶️',
                delay: 0,
              },
              {
                name: 'Ginger Paste',
                desc: 'Finely pounded young ginger with sesame oil — fragrant, warming, and the defining note of Hainanese chicken rice.',
                icon: '🫚',
                delay: 120,
              },
              {
                name: 'Dark Soy Sauce',
                desc: 'A thick, caramel-sweet aged soy sauce — the umami backbone that ties every element of the dish together.',
                icon: '🥢',
                delay: 240,
              },
            ].map((item) => (
              <AnimatedSection key={item.name} delay={item.delay}>
                <div className="bg-white border border-[#C9A84C]/20 rounded-sm p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-playfair text-[#4A1010] text-lg mb-3">{item.name}</h3>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ORDER CTA ===== */}
      <section className="pattern-bg py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Dine In or Order Out</p>
            <h2 className="font-playfair text-[#FAF6EE] text-3xl sm:text-4xl mb-5">
              Ready to <span className="italic text-[#C9A84C]">Taste?</span>
            </h2>
            <p className="font-nunito text-[#FAF6EE]/60 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Visit us at any of our three locations, or order delivery through our delivery partners. Full menu details available at Bukit Bintang.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { onNavigate('order'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                Order Online
              </button>
              <button
                onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                Find a Location
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
