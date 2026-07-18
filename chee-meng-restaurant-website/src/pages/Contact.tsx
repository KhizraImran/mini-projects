import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface ContactProps {
  onNavigate: (page: string) => void;
}

const outlets = [
  {
    name: 'Bukit Bintang',
    tag: 'Flagship',
    address: '50, Jalan Bukit Bintang, 55100 Kuala Lumpur',
    phone: '+603-2144 0456',
    hours: 'Mon–Fri: 10:00 AM – 10:00 PM\nSat–Sun: 10:00 AM – 10:30 PM',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Nasi+Ayam+Chee+Meng+Bukit+Bintang+Kuala+Lumpur',
  },
  {
    name: 'Old Klang Road',
    tag: '⭐ Michelin Bib Gourmand',
    address: 'Jalan Klang Lama (Old Klang Road), 58000 Kuala Lumpur',
    phone: '+603-7980 3977',
    hours: 'Daily: 10:30 AM – 8:00 PM',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Nasi+Ayam+Hainan+Chee+Meng+Jalan+Klang+Lama+Kuala+Lumpur',
  },
  {
    name: 'Glenmarie',
    tag: 'Shah Alam',
    address: 'Glenmarie, Shah Alam, 40150 Selangor',
    phone: '+603-5569 1234',
    hours: 'Mon–Fri: 11:00 AM – 9:00 PM\nSat–Sun: 10:30 AM – 9:30 PM',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Nasi+Ayam+Chee+Meng+Glenmarie+Shah+Alam',
  },
];

export default function Contact({ onNavigate }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF6EE]">
      {/* ===== PAGE HERO ===== */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/33965578/pexels-photo-33965578.png?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1400')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A05]/90 via-[#1A0A05]/55 to-[#1A0A05]/25" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
          <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-3">Reach Out</p>
          <h1 className="font-playfair text-white text-4xl sm:text-5xl md:text-6xl">
            Contact <span className="italic font-normal">Us</span>
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#C9A84C]/10 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2">
          <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0 }); }} className="font-lato text-xs text-[#3D2B1F]/50 hover:text-[#C9A84C] transition-colors">Home</button>
          <span className="text-[#C9A84C]/40 text-xs">›</span>
          <span className="font-lato text-xs text-[#C9A84C]">Contact</span>
        </div>
      </div>

      {/* ===== CONTACT INFO + FORM ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Contact Info */}
            <div>
              <AnimatedSection direction="left">
                <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">Get in Touch</p>
                <h2 className="font-playfair text-[#4A1010] text-4xl sm:text-5xl leading-tight mb-5">
                  We'd Love to<br />
                  <span className="italic font-normal">Hear from You</span>
                </h2>
                <div className="gold-divider mb-8" />
                <p className="font-nunito text-[#3D2B1F]/65 text-base leading-relaxed mb-10">
                  Whether you have a dining enquiry, catering request, or simply want to share feedback about your Chee Meng experience — our team is happy to assist. Reach us via email, phone, or the contact form.
                </p>
              </AnimatedSection>

              {/* Email contacts */}
              <AnimatedSection direction="left" delay={100}>
                <div className="space-y-5 mb-10">
                  <div className="flex items-start gap-4 p-5 bg-white border border-[#C9A84C]/15 rounded-sm">
                    <div className="w-10 h-10 rounded-full bg-[#4A1010]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-1">General Enquiry</p>
                      <a href="mailto:enquiry@cheemeng.com.my" className="font-playfair text-[#4A1010] text-lg hover:text-[#C9A84C] transition-colors">
                        enquiry@cheemeng.com.my
                      </a>
                      <p className="font-nunito text-[#3D2B1F]/50 text-sm mt-1">For general questions, feedback, and media enquiries.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-white border border-[#C9A84C]/15 rounded-sm">
                    <div className="w-10 h-10 rounded-full bg-[#4A1010]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-1">Catering Enquiry</p>
                      <a href="mailto:catering@cheemeng.com.my" className="font-playfair text-[#4A1010] text-lg hover:text-[#C9A84C] transition-colors">
                        catering@cheemeng.com.my
                      </a>
                      <p className="font-nunito text-[#3D2B1F]/50 text-sm mt-1">For event catering packages, quotes, and bookings.</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Social Links */}
              <AnimatedSection direction="left" delay={150}>
                <div>
                  <p className="font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-4">Follow Us</p>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.instagram.com/nasiayamhainancheemeng/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#3D2B1F]/60 hover:text-[#C9A84C] transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-full border border-[#C9A84C]/30 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </div>
                      <span className="font-lato text-xs">@nasiayamhainancheemeng</span>
                    </a>
                    <a
                      href="https://www.facebook.com/cheemengkl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#3D2B1F]/60 hover:text-[#C9A84C] transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-full border border-[#C9A84C]/30 flex items-center justify-center group-hover:border-[#C9A84C] transition-colors">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      <span className="font-lato text-xs">Chee Meng KL</span>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Contact Form */}
            <AnimatedSection direction="right" delay={100}>
              <div className="bg-white border border-[#C9A84C]/15 rounded-sm p-8 shadow-lg">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#4CAF50]/10 border-2 border-[#4CAF50]/30 flex items-center justify-center mx-auto mb-6">
                      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                        <path d="M9 12l2 2 4-4" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </div>
                    <h3 className="font-playfair text-[#4A1010] text-2xl mb-3">Message Sent!</h3>
                    <p className="font-nunito text-[#3D2B1F]/60 text-sm leading-relaxed mb-6">
                      Thank you for contacting us. Our team will respond to your enquiry within 1–2 business days.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline font-lato text-xs tracking-[0.12em] uppercase px-6 py-2.5 rounded-sm text-[#4A1010] border-[#4A1010]/30"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-playfair text-[#4A1010] text-2xl mb-6">Send an Enquiry</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full border border-[#C9A84C]/20 rounded-sm px-4 py-3 font-nunito text-sm text-[#3D2B1F] bg-[#FAF6EE] focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#3D2B1F]/30"
                          />
                        </div>
                        <div>
                          <label className="block font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            placeholder="+60 12-345 6789"
                            className="w-full border border-[#C9A84C]/20 rounded-sm px-4 py-3 font-nunito text-sm text-[#3D2B1F] bg-[#FAF6EE] focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#3D2B1F]/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full border border-[#C9A84C]/20 rounded-sm px-4 py-3 font-nunito text-sm text-[#3D2B1F] bg-[#FAF6EE] focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#3D2B1F]/30"
                        />
                      </div>

                      <div>
                        <label className="block font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-2">Subject</label>
                        <select
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          className="w-full border border-[#C9A84C]/20 rounded-sm px-4 py-3 font-nunito text-sm text-[#3D2B1F] bg-[#FAF6EE] focus:outline-none focus:border-[#C9A84C] transition-colors"
                        >
                          <option>General Enquiry</option>
                          <option>Catering Request</option>
                          <option>Feedback</option>
                          <option>Media / Press</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-lato text-[10px] text-[#C9A84C] tracking-widest uppercase mb-2">Message *</label>
                        <textarea
                          name="message"
                          required
                          value={formState.message}
                          onChange={handleChange}
                          rows={5}
                          placeholder="Tell us how we can help you..."
                          className="w-full border border-[#C9A84C]/20 rounded-sm px-4 py-3 font-nunito text-sm text-[#3D2B1F] bg-[#FAF6EE] focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#3D2B1F]/30 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-primary w-full font-lato text-xs tracking-[0.15em] uppercase px-7 py-4 rounded-sm"
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== OUTLET CONTACTS ===== */}
      <section className="py-16 bg-[#F0E8D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="font-lato text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-4">All Outlets</p>
              <h2 className="font-playfair text-[#4A1010] text-3xl sm:text-4xl">
                Outlet <span className="italic font-normal">Contacts</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outlets.map((outlet, idx) => (
              <AnimatedSection key={outlet.name} delay={idx * 120}>
                <div className="bg-white border border-[#C9A84C]/15 rounded-sm p-6 card-hover">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-playfair text-[#4A1010] text-xl">{outlet.name}</h3>
                    <span className="font-lato text-[8px] bg-[#4A1010] text-[#C9A84C] px-2 py-1 rounded-sm tracking-widest uppercase">{outlet.tag}</span>
                  </div>
                  <div className="h-px bg-[#C9A84C]/15 mb-5" />

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={13} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                      <p className="font-nunito text-sm text-[#3D2B1F]/65 leading-relaxed">{outlet.address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={13} className="text-[#C9A84C] flex-shrink-0" />
                      <a href={`tel:${outlet.phone.replace(/[^+\d]/g, '')}`} className="font-nunito text-sm text-[#3D2B1F]/65 hover:text-[#C9A84C] transition-colors">
                        {outlet.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={13} className="text-[#C9A84C] mt-1 flex-shrink-0" />
                      <div>
                        {outlet.hours.split('\n').map((line, i) => (
                          <p key={i} className="font-nunito text-sm text-[#3D2B1F]/65">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#C9A84C]/10">
                    <a
                      href={outlet.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-lato text-xs text-[#C9A84C] hover:text-[#A07830] transition-colors tracking-wide"
                    >
                      <MapPin size={12} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAP EMBED ===== */}
      <section className="py-12 bg-[#FAF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="rounded-sm overflow-hidden shadow-xl border border-[#C9A84C]/15 h-80 md:h-96">
              <iframe
                title="Nasi Ayam Chee Meng Locations"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU3Kqo&q=Nasi+Ayam+Hainan+Chee+Meng+Kuala+Lumpur`}
                allowFullScreen
              />
            </div>
            <div className="text-center mt-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Nasi+Ayam+Chee+Meng+Bukit+Bintang+Kuala+Lumpur"
                target="_blank"
                rel="noopener noreferrer"
                className="font-lato text-xs text-[#C9A84C] hover:text-[#A07830] transition-colors tracking-wide"
              >
                Open in Google Maps →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
