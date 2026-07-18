import AnimatedSection from '../components/AnimatedSection';
import { Phone, Mail, ExternalLink, MessageCircle } from 'lucide-react';

interface OrderProps {
  onNavigate: (page: string) => void;
}

const deliveryPartners = [
  {
    name: 'GrabFood',
    desc: 'Order via GrabFood for fast, reliable delivery to your door. Available at Bukit Bintang and Old Klang Road outlets.',
    color: '#00B14F',
    bgColor: 'bg-[#00B14F]/10',
    borderColor: 'border-[#00B14F]/25',
    logo: (
      <svg viewBox="0 0 80 30" className="h-8" fill="#00B14F">
        <text x="0" y="22" fontFamily="Arial" fontWeight="bold" fontSize="20">Grab</text>
        <text x="42" y="22" fontFamily="Arial" fontSize="14" fill="#00B14F">Food</text>
      </svg>
    ),
    link: 'https://food.grab.com/my/en/',
    available: ['Bukit Bintang', 'Old Klang Road'],
  },
  {
    name: 'foodpanda',
    desc: 'Find us on foodpanda for convenient delivery. Multiple outlets available on the platform.',
    color: '#D70F64',
    bgColor: 'bg-[#D70F64]/10',
    borderColor: 'border-[#D70F64]/25',
    logo: (
      <svg viewBox="0 0 100 30" className="h-8" fill="#D70F64">
        <text x="0" y="22" fontFamily="Arial" fontWeight="bold" fontSize="20">foodpanda</text>
      </svg>
    ),
    link: 'https://www.foodpanda.my/',
    available: ['Bukit Bintang', 'Glenmarie'],
  },
  {
    name: 'ShopeeFood',
    desc: 'Order through ShopeeFood for delivery with great value. Available at select locations.',
    color: '#EE4D2D',
    bgColor: 'bg-[#EE4D2D]/10',
    borderColor: 'border-[#EE4D2D]/25',
    logo: (
      <svg viewBox="0 0 120 30" className="h-8" fill="#EE4D2D">
        <text x="0" y="22" fontFamily="Arial" fontWeight="bold" fontSize="18">ShopeeFood</text>
      </svg>
    ),
    link: 'https://shopee.com.my/food',
    available: ['Bukit Bintang'],
  },
];

const cateringOptions = [
  {
    icon: '🍽️',
    title: 'Corporate Lunches',
    desc: 'Set menus for 20–500 pax. Ideal for office events, meetings, and corporate entertaining. Includes full setup and service.',
    from: 'From RM 18/pax',
  },
  {
    icon: '💍',
    title: 'Weddings & Celebrations',
    desc: 'Make your celebration memorable with a traditional Hainanese chicken rice feast. Custom menus, buffet or plated service available.',
    from: 'Customised Quote',
  },
  {
    icon: '🎊',
    title: 'Festive Events',
    desc: 'Chinese New Year, Hari Raya, and year-end gatherings. Festive menu packages with traditional accompaniments and desserts.',
    from: 'Customised Quote',
  },
  {
    icon: '📦',
    title: 'Self-Collect Takeaway',
    desc: 'Order your chicken rice by the portion, half-chicken, or whole-chicken ahead of time. Call us at least 2 hours in advance.',
    from: 'Standard Pricing',
  },
];

export default function Order({ onNavigate }: OrderProps) {
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
          <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3">Delivered to Your Door</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl">
            Online Order <span className="italic font-normal">& Delivery</span>
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C9A84C]/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
          <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0 }); }} className="font-lato text-xs text-[#3D2B1F]/50 hover:text-[#C9A84C] transition-colors">Home</button>
          <span className="text-[#C9A84C]/40 text-xs">›</span>
          <span className="font-lato text-xs text-[#C9A84C]">Online Order</span>
        </div>
      </div>

      {/* ===== DELIVERY PARTNERS ===== */}
      <section className="py-20 md:py-24 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Delivery Partners</p>
              <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl mb-5">
                Order <span className="italic font-normal">Delivery</span>
              </h2>
              <p className="font-nunito text-[#3D2B1F]/65 text-base leading-relaxed max-w-xl mx-auto">
                Enjoy authentic Chee Meng Hainanese chicken rice from the comfort of your home. Order through any of our delivery partners below.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {deliveryPartners.map((partner, idx) => (
              <AnimatedSection key={partner.name} delay={idx * 120}>
                <div className={`bg-white border ${partner.borderColor} rounded-sm p-8 text-center card-hover flex flex-col`}>
                  {/* Logo area */}
                  <div className={`${partner.bgColor} rounded-sm p-5 flex items-center justify-center mb-6 h-20`}>
                    <span className="font-playfair font-bold text-2xl" style={{ color: partner.color }}>
                      {partner.name}
                    </span>
                  </div>

                  <p className="font-nunito text-[#3D2B1F]/65 text-sm leading-relaxed mb-5 flex-1">{partner.desc}</p>

                  {/* Available outlets */}
                  <div className="mb-6">
                    <p className="font-lato text-[9px] text-[#C9A84C] tracking-widest uppercase mb-2">Available At</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {partner.available.map((outlet) => (
                        <span key={outlet} className="font-lato text-[9px] bg-[#F0E8D8] text-[#4A1010] px-2.5 py-1 rounded-sm tracking-wide">
                          {outlet}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2 font-lato text-xs tracking-[0.12em] uppercase px-5 py-3 rounded-sm"
                  >
                    Order Now <ExternalLink size={12} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* WhatsApp ordering option */}
          <AnimatedSection delay={200}>
            <div className="bg-[#1B5E20]/8 border border-[#4CAF50]/25 rounded-sm p-7 flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-playfair text-[#4A1010] text-xl mb-2">Order via WhatsApp</h3>
                <p className="font-nunito text-[#3D2B1F]/65 text-sm leading-relaxed">
                  Prefer to order directly? Send us a WhatsApp message with your order and we'll confirm availability at your nearest outlet. Ideal for advance orders and takeaways.
                </p>
              </div>
              <a
                href="https://wa.me/60321440456?text=Hi%2C%20I'd%20like%20to%20place%20an%20order%20at%20Chee%20Meng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2 bg-[#25D366] text-white font-lato text-xs tracking-[0.12em] uppercase px-6 py-3 rounded-sm hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CATERING SECTION ===== */}
      <section className="py-20 bg-[#F0E8D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Events & Gatherings</p>
              <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl mb-5">
                Catering <span className="italic font-normal">Services</span>
              </h2>
              <p className="font-nunito text-[#3D2B1F]/65 text-base leading-relaxed max-w-xl mx-auto">
                Let Chee Meng bring the authentic taste of Hainanese heritage to your event. From intimate family gatherings to large corporate functions, we cater with the same quality you've come to know.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {cateringOptions.map((option, idx) => (
              <AnimatedSection key={option.title} delay={idx * 100}>
                <div className="bg-white border border-[#C9A84C]/20 rounded-sm p-6 text-center card-hover h-full flex flex-col">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="font-playfair text-[#4A1010] text-lg mb-3">{option.title}</h3>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed flex-1">{option.desc}</p>
                  <div className="mt-4 pt-4 border-t border-[#C9A84C]/10">
                    <p className="font-playfair text-[#C9A84C] text-sm">{option.from}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Catering CTA */}
          <AnimatedSection delay={200}>
            <div className="bg-[#4A1010] rounded-sm p-8 md:p-12 text-center max-w-3xl mx-auto">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
              <h3 className="font-playfair text-[#FAF6EE] text-2xl sm:text-3xl mb-4">
                Ready to Book Catering?
              </h3>
              <p className="font-nunito text-[#FAF6EE]/60 text-base leading-relaxed mb-8">
                Contact our dedicated catering team to discuss your event requirements, customise your menu, and receive a detailed quote.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:catering@cheemeng.com.my"
                  className="flex items-center gap-2 btn-primary font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
                >
                  <Mail size={14} />
                  catering@cheemeng.com.my
                </a>
                <a
                  href="tel:+60321440456"
                  className="flex items-center gap-2 btn-outline font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
                >
                  <Phone size={14} />
                  +603-2144 0456
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== HOW TO ORDER ===== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Simple Process</p>
              <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl">
                How to <span className="italic font-normal">Order</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Choose Your Outlet', desc: 'Select the Chee Meng outlet nearest to you from Bukit Bintang, Old Klang Road, or Glenmarie.', icon: '📍' },
              { step: '02', title: 'Pick Your Platform', desc: 'Open GrabFood, foodpanda, or ShopeeFood, or send us a WhatsApp message for direct ordering.', icon: '📱' },
              { step: '03', title: 'Select Your Dishes', desc: 'Browse our menu and add your Hainanese chicken rice, porridge, sides, and beverages.', icon: '🍽️' },
              { step: '04', title: 'Enjoy!', desc: 'Your order will be freshly prepared and delivered to your door — or ready for collection at the outlet.', icon: '✨' },
            ].map((step, idx) => (
              <AnimatedSection key={step.step} delay={idx * 100}>
                <div className="text-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border-2 border-[#C9A84C]/30 flex items-center justify-center mx-auto text-3xl">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center mx-auto">
                      <span className="font-lato text-[9px] text-[#1A0A05] font-bold">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="font-playfair text-[#4A1010] text-lg mb-3">{step.title}</h3>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DINE IN INVITE ===== */}
      <section className="pattern-bg py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Or Visit Us In Person</p>
            <h2 className="font-playfair text-[#FAF6EE] text-3xl sm:text-4xl mb-4">
              The Best Experience is <span className="italic text-[#C9A84C]">Dine-In</span>
            </h2>
            <p className="font-nunito text-[#FAF6EE]/60 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Nothing compares to the full Chee Meng experience — the warm heritage ambience, the aromas from the kitchen, and freshly served chicken rice at its absolute best.
            </p>
            <button
              onClick={() => { onNavigate('locations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-sm"
            >
              View Our Locations
            </button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
