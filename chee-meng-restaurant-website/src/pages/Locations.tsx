import { MapPin, Phone, Clock, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface LocationsProps {
  onNavigate: (page: string) => void;
}

const locations = [
  {
    id: 'bukit-bintang',
    name: 'Bukit Bintang',
    subtitle: 'Flagship Outlet',
    badge: 'Flagship',
    badgeColor: 'bg-[#4A1010] text-[#C9A84C]',
    address: '50, Jalan Bukit Bintang, 55100 Kuala Lumpur',
    phone: '+603-2144 0456',
    phone2: null,
    hours: [
      { days: 'Monday – Friday', time: '10:00 AM – 10:00 PM' },
      { days: 'Saturday – Sunday', time: '10:00 AM – 10:30 PM' },
    ],
    closed: null,
    note: 'Full menu available. Largest outlet. Ideal for groups and families.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Nasi+Ayam+Chee+Meng+Bukit+Bintang+Kuala+Lumpur',
    isMichelin: false,
    image: 'https://images.pexels.com/photos/6830670/pexels-photo-6830670.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
  {
    id: 'old-klang-road',
    name: 'Old Klang Road',
    subtitle: 'Jalan Klang Lama',
    badge: '⭐ Michelin Bib Gourmand',
    badgeColor: 'bg-[#E4002B] text-white',
    address: 'Jalan Klang Lama (Old Klang Road), 58000 Kuala Lumpur',
    phone: '+603-7980 3977',
    phone2: null,
    hours: [
      { days: 'Monday – Sunday', time: '10:30 AM – 8:00 PM' },
    ],
    closed: 'Closed on selected public holidays',
    note: 'The original branch where it all began in 1965. Awarded Michelin Bib Gourmand 2023. Arrive early — queues are common!',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Nasi+Ayam+Hainan+Chee+Meng+Jalan+Klang+Lama+Kuala+Lumpur',
    isMichelin: true,
    image: 'https://images.pexels.com/photos/5625100/pexels-photo-5625100.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
  {
    id: 'glenmarie',
    name: 'Glenmarie',
    subtitle: 'Shah Alam, Selangor',
    badge: 'Klang Valley',
    badgeColor: 'bg-[#7B4F2E] text-[#FAF6EE]',
    address: 'Glenmarie, Shah Alam, 40150 Selangor',
    phone: '+603-5569 1234',
    phone2: null,
    hours: [
      { days: 'Monday – Friday', time: '11:00 AM – 9:00 PM' },
      { days: 'Saturday – Sunday', time: '10:30 AM – 9:30 PM' },
    ],
    closed: null,
    note: 'Serving the western Klang Valley. Perfect for corporate and catering enquiries.',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Nasi+Ayam+Chee+Meng+Glenmarie+Shah+Alam',
    isMichelin: false,
    image: 'https://images.pexels.com/photos/33069000/pexels-photo-33069000.png?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  },
];

export default function Locations({ onNavigate }: LocationsProps) {
  return (
    <div className="bg-[#FAF6EE]">
      {/* ===== PAGE HERO ===== */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5625100/pexels-photo-5625100.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/90 via-[#1A0A05]/55 to-[#1A0A05]/25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3">Kuala Lumpur & Selangor</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl">
            Our <span className="italic font-normal">Locations</span>
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C9A84C]/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
          <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0 }); }} className="font-lato text-xs text-[#3D2B1F]/50 hover:text-[#C9A84C] transition-colors">Home</button>
          <span className="text-[#C9A84C]/40 text-xs">›</span>
          <span className="font-lato text-xs text-[#C9A84C]">Locations</span>
        </div>
      </div>

      {/* ===== INTRO ===== */}
      <section className="py-14 bg-[#FAF6EE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Find Us Across Klang Valley</p>
            <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl mb-5">
              Three Locations, <span className="italic font-normal">One Legacy</span>
            </h2>
            <p className="font-nunito text-[#3D2B1F]/65 text-base leading-relaxed">
              From our heritage Bukit Bintang flagship to the legendary Michelin-awarded Old Klang Road branch and our Glenmarie outlet in Shah Alam — taste authentic Hainanese chicken rice across the Klang Valley.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== LOCATION CARDS ===== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {locations.map((loc, idx) => (
              <AnimatedSection key={loc.id} delay={idx * 120}>
                <div className={`bg-white rounded-sm overflow-hidden shadow-lg card-hover border ${loc.isMichelin ? 'border-[#E4002B]/20' : 'border-[#C9A84C]/15'}`}>
                  {/* Image */}
                  <div className="relative h-48 img-zoom overflow-hidden">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/60 to-transparent" />
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block font-lato text-[9px] tracking-widest uppercase px-3 py-1 rounded-sm ${loc.badgeColor}`}>
                        {loc.badge}
                      </span>
                    </div>
                    {/* Michelin icon */}
                    {loc.isMichelin && (
                      <div className="absolute top-3 right-3 w-10 h-10 bg-[#E4002B] rounded-full flex items-center justify-center shadow-lg">
                        <Star size={14} fill="white" className="text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4">
                      <h3 className="font-playfair text-white text-xl">{loc.name}</h3>
                      <p className="font-lato text-white/70 text-xs">{loc.subtitle}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Address */}
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                      <p className="font-nunito text-sm text-[#3D2B1F]/70 leading-relaxed">{loc.address}</p>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 mb-4">
                      <Phone size={14} className="text-[#C9A84C] flex-shrink-0" />
                      <a href={`tel:${loc.phone.replace(/[^+\d]/g, '')}`} className="font-lato text-sm text-[#3D2B1F]/70 hover:text-[#C9A84C] transition-colors">
                        {loc.phone}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-3 mb-5">
                      <Clock size={14} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                      <div>
                        {loc.hours.map((h) => (
                          <div key={h.days} className="mb-1">
                            <p className="font-lato text-[10px] text-[#C9A84C] tracking-wider uppercase">{h.days}</p>
                            <p className="font-nunito text-sm text-[#3D2B1F]/70">{h.time}</p>
                          </div>
                        ))}
                        {loc.closed && (
                          <p className="font-lato text-[10px] text-[#E4002B]/70 mt-1">{loc.closed}</p>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[#C9A84C]/15 mb-5" />

                    {/* Note */}
                    {loc.isMichelin && (
                      <div className="bg-[#E4002B]/5 border border-[#E4002B]/15 rounded-sm p-3 mb-5">
                        <p className="font-lato text-[9px] text-[#E4002B] tracking-widest uppercase mb-1">⭐ Michelin Bib Gourmand 2023</p>
                        <p className="font-nunito text-xs text-[#3D2B1F]/60 leading-relaxed">{loc.note}</p>
                      </div>
                    )}
                    {!loc.isMichelin && (
                      <p className="font-nunito text-xs text-[#3D2B1F]/55 leading-relaxed mb-5">{loc.note}</p>
                    )}

                    {/* Get Directions Button */}
                    <a
                      href={loc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary block text-center font-lato text-xs tracking-[0.12em] uppercase px-5 py-3 rounded-sm"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EMBEDDED MAP ===== */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-10">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Find Us on the Map</p>
              <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl">
                <span className="italic font-normal">Navigate</span> to Us
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="rounded-sm overflow-hidden shadow-xl border border-[#C9A84C]/15">
              {/* Map embed */}
              <div className="relative w-full h-80 md:h-96 bg-[#F0E8D8]">
                <iframe
                  title="Nasi Ayam Chee Meng Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  loading="lazy"
                  src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3Kqo&q=Nasi+Ayam+Hainan+Chee+Meng+Kuala+Lumpur`}
                  style={{ border: 0 }}
                  allowFullScreen
                />
                {/* Fallback if iframe doesn't load */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F0E8D8] pointer-events-none" style={{ display: 'none' }}>
                  <MapPin size={40} className="text-[#C9A84C] mb-4" />
                  <p className="font-playfair text-[#4A1010] text-xl mb-2">View on Google Maps</p>
                  <p className="font-nunito text-[#3D2B1F]/60 text-sm">Click the link below to open directions</p>
                </div>
              </div>
            </div>

            {/* Map links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              {locations.map((loc) => (
                <a
                  key={loc.id}
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-lato text-xs tracking-wide text-[#4A1010] hover:text-[#C9A84C] transition-colors"
                >
                  <MapPin size={12} className="text-[#C9A84C]" />
                  {loc.name} Branch
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-14 bg-[#F0E8D8] border-t border-[#C9A84C]/15">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Catering & Events</p>
            <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl mb-5">
              Planning an Event?
            </h2>
            <p className="font-nunito text-[#3D2B1F]/65 text-base leading-relaxed mb-8">
              Chee Meng caters for corporate lunches, weddings, family gatherings, and festive celebrations. Contact our catering team to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:catering@cheemeng.com.my"
                className="btn-primary font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm"
              >
                Enquire About Catering
              </a>
              <button
                onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-outline font-lato text-xs tracking-[0.15em] uppercase px-7 py-3.5 rounded-sm text-[#4A1010] border-[#4A1010]/30 hover:border-[#C9A84C] hover:text-[#C9A84C]"
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
