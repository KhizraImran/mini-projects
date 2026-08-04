import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Flame,
  Beef,
  Wine,
  Image as ImageIcon,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  Sun,
  Moon,
  ChefHat,
  UtensilsCrossed,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Lang = "en" | "ar";

const IMAGES = {
  hero: "https://images.pexels.com/photos/36683024/pexels-photo-36683024.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600",
  interior: "https://images.pexels.com/photos/28575445/pexels-photo-28575445.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  cuts: "https://images.pexels.com/photos/36682999/pexels-photo-36682999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  wine: "https://images.pexels.com/photos/12181763/pexels-photo-12181763.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  tbone: "https://images.pexels.com/photos/36683027/pexels-photo-36683027.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
  ribs: "https://images.pexels.com/photos/37069406/pexels-photo-37069406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
  burger: "https://images.pexels.com/photos/13163534/pexels-photo-13163534.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
  salmon: "https://images.pexels.com/photos/20505438/pexels-photo-20505438.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
  dessert: "https://images.pexels.com/photos/29978698/pexels-photo-29978698.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
};

const MENU = [
  {
    id: "ribeye",
    nameEn: "Ojo de Toro Rib Eye Steak",
    nameAr: 'ستيك ريب آي "أوجو دي تورو"',
    weight: "350g",
    descEn: "Grilled Black Angus rib eye, marbled for rich juiciness and finished over an open flame.",
    descAr: "ريب آي أنغوس أسود مشوي، متموج بالدهون الغنية ويُنهى على اللهب المباشر.",
    price: 14.5,
    image: IMAGES.cuts,
  },
  {
    id: "fillet",
    nameEn: "Wild Wild West Fillet Steak",
    nameAr: 'فيليه "وايلد وايلد ويست"',
    weight: "300g",
    descEn: "Tender Black Angus tenderloin, lightly brushed with our homemade pommery mustard.",
    descAr: "فيليه أنغوس أسود طرّي، يُدهن بلطف بخردل بومري المنزلي.",
    price: 13.5,
    image: "https://images.pexels.com/photos/1639561/pexels-photo-1639561.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
  },
  {
    id: "striploin",
    nameEn: "Calvetti's Striploin Steak",
    nameAr: 'ستريبلوين "كالفيتي"',
    weight: "300g",
    descEn: "Chargrilled beef striploin with a deep, caramelized crust and signature seasoning.",
    descAr: "ستريبلوين بقري مشوي على الفحم بقشرة كراميلية عميقة وتتبيلة مميزة.",
    price: 12.5,
    image: IMAGES.tbone,
  },
  {
    id: "tbone",
    nameEn: "Texas Joe T-Bone Steak",
    nameAr: 'ستيك تي-بون "تكساس جو"',
    weight: "450g",
    descEn: "A New York strip and tenderloin in one cut, chargrilled on an open flame.",
    descAr: "قطعة تجمع بين ستريب نيويورك والفيليه في قَطع واحد، مشوي على اللهب المباشر.",
    price: 18.5,
    image: IMAGES.tbone,
  },
  {
    id: "ribs",
    nameEn: "Houston Horse Ride Beef BBQ Ribs",
    nameAr: 'ريش بقري مشوي "هيوستن هورس رايد"',
    weight: "300g",
    descEn: "Slow-heat cooked BBQ flavored ribs, fall-off-the-bone tender.",
    descAr: "ريش بقري مطهوة ببطء بنكهة الباربيكيو، طرية حتى تفصل عن العظم.",
    price: 9.5,
    image: IMAGES.ribs,
  },
  {
    id: "chicken",
    nameEn: "Boneless Corn-Fed Baby Chicken",
    nameAr: 'دجاج صغير منزوع العظم "كورن فيد"',
    weight: "600g",
    descEn: "Charbroiled boneless corn-fed baby chicken, golden and succulent.",
    descAr: "دجاج صغير منزوع العظم مشوي على اللهب، ذهبي اللون وعصير.",
    price: 8.5,
    image: IMAGES.salmon,
  },
  {
    id: "salmon",
    nameEn: "Salmos Rosa y Grillado",
    nameAr: 'سلمون مشوي "سالموس روزا"',
    weight: "250g",
    descEn: "Charbroiled salmon steak with tamarind sauce, portobello mushrooms and mashed potatoes.",
    descAr: "سلمون مشوي بصلصة التمر الهندي، مع فطر بورتوبيلو وبطاطس مهروسة.",
    price: 9.0,
    image: IMAGES.salmon,
  },
  {
    id: "burger",
    nameEn: "The Original Ribeye Burger",
    nameAr: "برجر ريب آي الأصلي",
    weight: "250g",
    descEn: "Pure Angus beef burger, chargrilled and garnished with mayonnaise, lettuce, tomato and coleslaw.",
    descAr: "برجر لحم أنغوس نقي، مشوي على اللهب ومزين بالمايونيز والخس والطماطم والكولسلو.",
    price: 6.5,
    image: IMAGES.burger,
  },
];

const WINES = [
  {
    nameEn: "Bold Reds",
    nameAr: "الحمراء القوية",
    descEn: "Cabernet Sauvignon, Malbec and Syrah — structured tannins that stand up to ribeye and T-bone.",
    descAr: "كابرنيه سوفينيون، مالبيك وسيراه — تانينات قوية تتناسب مع الريب آي والتي-بون.",
  },
  {
    nameEn: "Elegant Bordeaux",
    nameAr: "بوردو الأنيقة",
    descEn: "Merlot-led blends with silky depth, perfect for filet and striploin.",
    descAr: "مزيج يقوده الميرلو بعمق حريري، مثالي للفيليه والستريبلوين.",
  },
  {
    nameEn: "Crisp Whites",
    nameAr: "البيضاء المنعشة",
    descEn: "Chardonnay and Sauvignon Blanc for seafood, salads and lighter plates.",
    descAr: "شاردونيه وسوفينيون بلانك مع المأكولات البحرية والسلطات والأطباق الخفيفة.",
  },
  {
    nameEn: "Sparkling & Rosé",
    nameAr: "المتلألئة والروزيه",
    descEn: "Champagne and Provence rosé for celebratory evenings and refined palates.",
    descAr: "شامبانيا وروزيه بروفانس للأمسيات الاحتفالية والأذواق الرفيعة.",
  },
];

const GALLERY = [
  { src: IMAGES.cuts, captionEn: "Prime Angus ribeye, flame-kissed", captionAr: "ريب آي أنغوس فاخر على اللهب" },
  { src: IMAGES.interior, captionEn: "Warm leather and brass interiors", captionAr: "جلد دافئ وديكور نحاسي" },
  { src: IMAGES.tbone, captionEn: "T-bone, carved for two", captionAr: "تي-بون، مُحضّر للاثنين" },
  { src: IMAGES.wine, captionEn: "Curated wine selections", captionAr: "اختيارات نبيذ مختارة" },
  { src: IMAGES.ribs, captionEn: "Texas-style BBQ ribs", captionAr: "ريش باربيكيو على الطريقة التكساسية" },
  { src: IMAGES.dessert, captionEn: "Artisan desserts", captionAr: "حلويات يدوية" },
];

const TRANSLATIONS = {
  en: {
    nav: { about: "About", cuts: "Premium Cuts", wine: "Wine", gallery: "Gallery", reserve: "Reservations", location: "Location" },
    hero: {
      pre: "Holiday Inn Althoraya — Farwaniya, Kuwait",
      title: "The Art of Fire & Prime Beef",
      subtitle: "Where aged Angus beef meets open-flame mastery in an atmosphere of understated luxury.",
      reserve: "Reserve a Table",
      menu: "Explore the Menu",
    },
    about: {
      label: "Our Story",
      title: "A Steakhouse Forged in Tradition",
      p1: "At Ribeye Steak House, located within the distinguished Holiday Inn Althoraya City, we honor the timeless craft of the American steakhouse. Every cut is hand-selected, every fire is tended with care, and every plate is presented with precision.",
      p2: "Our menu celebrates premium aged Angus beef, Texas-style barbecued ribs, and the bold flavors of the American South — all served in an intimate setting of rich leather, polished brass and the warm glow of an open kitchen.",
      stat1: "12+",
      stat1Label: "Years of Excellence",
      stat2: "Aged Angus",
      stat2Label: "Premium Beef",
      stat3: "Daily",
      stat3Label: "12PM – 12AM",
    },
    menu: {
      label: "The Menu",
      title: "Premium Cuts & Signature Dishes",
      subtitle: "Each cut is hand-selected, expertly aged, and chargrilled to your exact preference.",
      donenessTitle: "Select your desired finish",
      doneness: [
        { key: "rare", label: "Rare", color: "#8a1c1c" },
        { key: "mr", label: "Medium Rare", color: "#9e3a2e" },
        { key: "medium", label: "Medium", color: "#a85a3a" },
        { key: "mw", label: "Medium Well", color: "#8c6a4a" },
        { key: "well", label: "Well Done", color: "#6b5237" },
      ],
      weight: "wt",
      kwd: "KWD",
    },
    wine: {
      label: "Cellar",
      title: "Wine & Pairings",
      subtitle: "A curated selection of old-world and new-world labels chosen to complement the richness of prime beef.",
    },
    gallery: {
      label: "Atmosphere",
      title: "Step Inside",
      subtitle: "Rich leather, warm brass, and the glow of the open kitchen.",
    },
    reserve: {
      label: "Reservations",
      title: "Secure Your Table",
      subtitle: "Plan an unforgettable evening. We will confirm your reservation within the hour.",
      name: "Full Name",
      phone: "Phone Number",
      date: "Date",
      time: "Time",
      guests: "Guests",
      occasion: "Occasion (optional)",
      notes: "Special Requests",
      submit: "Request Reservation",
      success: "Thank you. Your request has been received. We will contact you shortly to confirm.",
    },
    location: {
      label: "Find Us",
      title: "Holiday Inn Althoraya City",
      address: "Street 103, Block 6, Farwaniya, P.O. Box 18544, Kuwait",
      phone: "+965 2474 2000",
      email: "reservation.atc@ihg.com",
      hours: "Daily 12:00 PM – 12:00 AM",
    },
    footer: {
      rights: "© 2026 Ribeye Steak House at Holiday Inn Althoraya. All rights reserved.",
      ihg: "Part of IHG Hotels & Resorts.",
    },
  },
  ar: {
    nav: { about: "من نحن", cuts: "القطع المميزة", wine: "النبيذ", gallery: "معرض الصور", reserve: "الحجوزات", location: "الموقع" },
    hero: {
      pre: "هوليداي إن الثريا — الفروانية، الكويت",
      title: "فن النار واللحم الفاخر",
      subtitle: "حيث يلتقي لحم الأنغوس المُعتق بإتقان الشواء المباشر في أجواء من الفخامة الهادئة.",
      reserve: "احجز طاولتك",
      menu: "استكشف القائمة",
    },
    about: {
      label: "قصتنا",
      title: "ستيك هاوس تقليدي بأصالة عصرية",
      p1: "في ريب آي ستيك هاوس، الواقع ضمن هوليداي إن الثريا سيتي، نكرّم حرفة الستيك هاوس الأمريكي الأصيلة. تُختار كل قطعة بعناية، ويُروى كل لهب باهتمام، وتُقدّم كل طبقة بدقة.",
      p2: "تحتفي قائمتنا بلحم الأنغوس المُعتق الفاخر، وريش الباربيكيو على الطريقة التكساسية، والنكهات الجريئة للجنوب الأمريكي — وكل ذلك في أجواء حميمية من الجلد الغني والنحاس المصقول وتوهج المطبخ المفتوح.",
      stat1: "+12",
      stat1Label: "عاماً من التميز",
      stat2: "أنغوس معتق",
      stat2Label: "لحم فاخر",
      stat3: "يومياً",
      stat3Label: "12 ظهراً – 12 منتصف الليل",
    },
    menu: {
      label: "القائمة",
      title: "قطع فاخرة وأطباق مميزة",
      subtitle: "تُختار كل قطعة بعناية، وتُعتق بإتقان، وتُشوى على اللهب حسب ذوقك.",
      donenessTitle: "اختر درجة النضج",
      doneness: [
        { key: "rare", label: "نادر", color: "#8a1c1c" },
        { key: "mr", label: "متوسط نادر", color: "#9e3a2e" },
        { key: "medium", label: "متوسط", color: "#a85a3a" },
        { key: "mw", label: "متوسط جيد", color: "#8c6a4a" },
        { key: "well", label: "جيد جداً", color: "#6b5237" },
      ],
      weight: "جرام",
      kwd: "د.ك",
    },
    wine: {
      label: "القبو",
      title: "النبيذ والتوصيات",
      subtitle: "مجموعة مختارة من أسماء العالم القديم والجديد لتتناسب مع ثراء اللحم الفاخر.",
    },
    gallery: {
      label: "الأجواء",
      title: "تجول داخل المطعم",
      subtitle: "جلد غني، نحاس دافئ، وتوهج المطبخ المفتوح.",
    },
    reserve: {
      label: "الحجوزات",
      title: "احجز طاولتك",
      subtitle: "خطط لأمسية لا تُنسى. سنتواصل معك خلال ساعة لتأكيد الحجز.",
      name: "الاسم الكامل",
      phone: "رقم الهاتف",
      date: "التاريخ",
      time: "الوقت",
      guests: "عدد الضيوف",
      occasion: "المناسبة (اختياري)",
      notes: "طلبات خاصة",
      submit: "إرسال طلب الحجز",
      success: "شكراً لك. تم استلام طلبك وسنتواصل معك قريباً للتأكيد.",
    },
    location: {
      label: "موقعنا",
      title: "هوليداي إن الثريا سيتي",
      address: "شارع 103، قطعة 6، الفروانية، ص.ب. 18544، الكويت",
      phone: "+965 2474 2000",
      email: "reservation.atc@ihg.com",
      hours: "يومياً من 12 ظهراً حتى 12 منتصف الليل",
    },
    footer: {
      rights: "© 2026 ريب آي ستيك هاوس في هوليداي إن الثريا. جميع الحقوق محفوظة.",
      ihg: "جزء من مجموعة فنادق ومنتجعات آي إتش جي.",
    },
  },
};

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -7;
    const ry = ((x - cx) / cx) * 7;
    gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.35, ease: "power2.out" });
  };
  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`perspective-1000 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="preserve-3d h-full w-full">{children}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      <span className="h-px w-10 bg-[var(--gold)]" />
      <span className="font-display text-sm uppercase tracking-[0.2em] text-[var(--gold)]">
        {children}
      </span>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [doneness, setDoneness] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [lang]);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    ScrollTrigger.refresh();
  }, [lang, dark, isRTL]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Loading sequence
  useEffect(() => {
    let tlCtx: gsap.Context | null = null;
    const startLoad = () => {
      tlCtx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setLoading(false),
        });
        tl.fromTo(
          ".load-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: "power2.inOut" }
        )
          .fromTo(
            ".load-title",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            ".load-tag",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            "-=0.4"
          )
          .to(".load-overlay", { opacity: 0, duration: 0.7, ease: "power2.inOut" });
      });
    };
    if (document.readyState === "complete") {
      startLoad();
    } else {
      window.addEventListener("load", startLoad);
    }
    return () => {
      window.removeEventListener("load", startLoad);
      tlCtx?.revert();
    };
  }, []);

  // Hero & scroll animations
  const heroReady = !loading;
  useEffect(() => {
    if (!heroReady) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { y: 90, opacity: 0, rotateX: 25 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.05,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.15,
        }
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 1, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-plate",
        { scale: 0.85, opacity: 0, rotateY: -15 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.4, delay: 0.4, ease: "power3.out" }
      );

      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".reveal-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: isRTL ? 60 : -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".reveal-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: isRTL ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [heroReady, isRTL]);

  // Hero plate tilt on mouse
  const heroPlateRef = useRef<HTMLDivElement>(null);
  const onHeroMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = heroPlateRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.4, ease: "power2.out" });
  };
  const onHeroLeave = () => {
    gsap.to(heroPlateRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
  };

  const navItems = useMemo(
    () => [
      { id: "about", label: t.nav.about, icon: ChefHat },
      { id: "cuts", label: t.nav.cuts, icon: Beef },
      { id: "wine", label: t.nav.wine, icon: Wine },
      { id: "gallery", label: t.nav.gallery, icon: ImageIcon },
      { id: "reserve", label: t.nav.reserve, icon: CalendarDays },
      { id: "location", label: t.nav.location, icon: MapPin },
    ],
    [t.nav]
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const onReserve = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      {/* Loading overlay */}
      {loading && (
        <div className="load-overlay fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[var(--charcoal)] text-[var(--gold)]">
          <div className="relative flex flex-col items-center gap-6 px-6 text-center">
            <UtensilsCrossed className="h-10 w-10 opacity-80" />
            <div className="overflow-hidden">
              <h1 className="load-title font-serif text-3xl font-semibold tracking-[0.25em] text-[var(--gold-light)] md:text-5xl">
                RIBEYE
              </h1>
            </div>
            <div className="h-px w-48 origin-left scale-x-0 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent load-line" />
            <p className="load-tag font-display max-w-md text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Prime Cuts — Open Flame — Perfection
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header
        className={`fixed top-0 start-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "bg-[var(--surface)]/90 py-3 shadow-lg shadow-black/5 backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => scrollTo("hero")}
            className="group flex items-center gap-3"
            aria-label="Ribeye Steak House"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--surface)] transition-transform duration-500 group-hover:rotate-180">
              <Flame className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="text-start leading-tight">
              <span className="block font-serif text-lg tracking-[0.12em] text-[var(--text)]">RIBEYE</span>
              <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                Steak House
              </span>
            </div>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
              >
                <item.icon className="h-4 w-4 text-[var(--gold)] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(isRTL ? "en" : "ar")}
              className="flex h-9 items-center justify-center rounded-full border border-[var(--border)] px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              aria-label="Toggle language"
            >
              {isRTL ? "EN" : "عربي"}
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)] lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className={`absolute top-0 ${isRTL ? "start-0" : "end-0"} h-full w-80 max-w-[80vw] bg-[var(--surface)] p-6 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif text-xl tracking-widest text-[var(--gold)]">RIBEYE</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-[var(--text-muted)]" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-4 border-b border-[var(--border)] pb-4 text-start text-lg text-[var(--text)] transition-colors hover:text-[var(--gold)]"
                >
                  <item.icon className="h-5 w-5 text-[var(--gold)]" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <section
        id="hero"
        className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden"
        onMouseMove={onHeroMove}
        onMouseLeave={onHeroLeave}
      >
        <div className="hero-bg absolute inset-0 z-0">
          <img
            src={IMAGES.hero}
            alt="Premium grilled ribeye steak over open flame"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg)]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-32 lg:grid-cols-2">
          <div className="perspective-1000 text-center lg:text-start">
            <p className="hero-sub mb-4 font-display text-sm uppercase tracking-[0.25em] text-[var(--gold-light)]">
              {t.hero.pre}
            </p>
            <h1 className="mb-6 font-serif text-5xl leading-[1.1] text-white md:text-7xl lg:text-8xl">
              {t.hero.title.split(" ").map((w, i) => (
                <span key={i} className="hero-word inline-block me-3">
                  {w}
                </span>
              ))}
            </h1>
            <p className="hero-sub mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/80 lg:mx-0">
              {t.hero.subtitle}
            </p>
            <div className="hero-cta flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                onClick={() => scrollTo("reserve")}
                className="group flex items-center gap-3 rounded-full bg-[var(--gold)] px-8 py-4 font-semibold text-[var(--charcoal)] shadow-lg shadow-[var(--gold)]/20 transition-all hover:bg-[var(--gold-light)] hover:shadow-xl"
              >
                <CalendarDays className="h-5 w-5" />
                {t.hero.reserve}
                <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo("cuts")}
                className="rounded-full border border-white/30 px-8 py-4 font-medium text-white backdrop-blur-sm transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-light)]"
              >
                {t.hero.menu}
              </button>
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <div className="perspective-1000">
              <div
                ref={heroPlateRef}
                className="hero-plate relative w-80 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 md:w-96"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={IMAGES.cuts}
                  alt="Premium ribeye steak plate"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                <div className="absolute bottom-0 start-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                    Signature Cut
                  </p>
                  <p className="font-serif text-2xl text-white">Ojo de Toro</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 start-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 lg:flex">
          <span className="font-display text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 lg:py-32">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="reveal-left relative order-2 lg:order-1">
            <TiltCard className="rounded-2xl">
              <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl">
                <img
                  src={IMAGES.interior}
                  alt="Ribeye Steak House interior"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </TiltCard>
            <div className="absolute -bottom-8 -end-8 hidden w-48 rounded-xl border border-[var(--gold)] bg-[var(--surface)] p-4 shadow-xl lg:block">
              <p className="font-serif text-2xl text-[var(--accent)]">4.5</p>
              <p className="text-xs text-[var(--text-muted)]">TripAdvisor Travelers' Choice</p>
            </div>
          </div>

          <div className="reveal-right order-1 lg:order-2">
            <SectionLabel>{t.about.label}</SectionLabel>
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-[var(--text)]">
              {t.about.title}
            </h2>
            <p className="mb-5 leading-relaxed text-[var(--text-muted)]">{t.about.p1}</p>
            <p className="mb-10 leading-relaxed text-[var(--text-muted)]">{t.about.p2}</p>

            <div className="grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-8">
              <div>
                <p className="font-serif text-2xl text-[var(--accent)] md:text-3xl">{t.about.stat1}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{t.about.stat1Label}</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[var(--accent)] md:text-3xl">{t.about.stat2}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{t.about.stat2Label}</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[var(--accent)] md:text-3xl">{t.about.stat3}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{t.about.stat3Label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Cuts */}
      <section id="cuts" className="bg-[var(--bg-soft)] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-16 text-center">
            <SectionLabel>{t.menu.label}</SectionLabel>
            <h2 className="mx-auto mb-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl text-[var(--text)]">
              {t.menu.title}
            </h2>
            <p className="mx-auto max-w-2xl text-[var(--text-muted)]">{t.menu.subtitle}</p>
          </div>

          {/* Doneness selector */}
          <div className="reveal mx-auto mb-16 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-lg">
            <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-[var(--text-muted)]">
              {t.menu.donenessTitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {t.menu.doneness.map((d, i) => (
                <button
                  key={d.key}
                  onClick={() => setDoneness(i)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    doneness === i
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-md"
                      : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-soft)]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${((doneness + 1) / t.menu.doneness.length) * 100}%`,
                  background: `linear-gradient(90deg, ${t.menu.doneness
                    .slice(0, doneness + 1)
                    .map((d) => d.color)
                    .join(", ")})`,
                }}
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {MENU.map((item) => (
              <TiltCard key={item.id} className="reveal h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-md transition-shadow hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={lang === "en" ? item.nameEn : item.nameAr}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 end-3 rounded-full bg-[var(--charcoal)]/80 px-3 py-1 text-xs font-medium text-[var(--gold-light)] backdrop-blur-sm">
                      {item.weight} {t.menu.weight}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg leading-snug text-[var(--text)]">
                        {lang === "en" ? item.nameEn : item.nameAr}
                      </h3>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {lang === "en" ? item.descEn : item.descAr}
                    </p>
                    <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                      <span className="text-sm text-[var(--text-muted)]">{t.menu.kwd}</span>
                      <span className="font-serif text-2xl text-[var(--accent)]">
                        {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Wine */}
      <section id="wine" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal-left">
              <SectionLabel>{t.wine.label}</SectionLabel>
              <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-[var(--text)]">
                {t.wine.title}
              </h2>
              <p className="mb-10 text-lg text-[var(--text-muted)]">{t.wine.subtitle}</p>

              <div className="space-y-5">
                {WINES.map((wine, i) => (
                  <div
                    key={i}
                    className="reveal-right group flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--gold)] hover:shadow-lg"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--accent)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                      <Wine className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-serif text-lg text-[var(--text)]">
                        {lang === "en" ? wine.nameEn : wine.nameAr}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                        {lang === "en" ? wine.descEn : wine.descAr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-right relative">
              <TiltCard className="rounded-2xl">
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] shadow-2xl">
                  <img
                    src={IMAGES.wine}
                    alt="Wine selection"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </TiltCard>
              <div className="absolute -top-6 -start-6 hidden rounded-xl border border-[var(--gold)] bg-[var(--surface)] p-5 shadow-xl lg:block">
                <p className="font-serif text-3xl text-[var(--accent)]">120+</p>
                <p className="text-xs text-[var(--text-muted)]">Wine labels</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-[var(--bg-soft)] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-16 text-center">
            <SectionLabel>{t.gallery.label}</SectionLabel>
            <h2 className="mb-4 font-serif text-4xl md:text-5xl text-[var(--text)]">{t.gallery.title}</h2>
            <p className="mx-auto max-w-2xl text-[var(--text-muted)]">{t.gallery.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((img, i) => (
              <TiltCard key={i} className={`reveal ${i === 0 || i === 5 ? "lg:col-span-2" : ""}`}>
                <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-md">
                  <img
                    src={img.src}
                    alt={lang === "en" ? img.captionEn : img.captionAr}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      i === 0 || i === 5 ? "aspect-[21/9]" : "aspect-[4/3]"
                    }`}
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="font-serif text-lg text-white">
                      {lang === "en" ? img.captionEn : img.captionAr}
                    </p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Reservations */}
      <section id="reserve" className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5">
          <div className="reveal-left lg:col-span-2">
            <SectionLabel>{t.reserve.label}</SectionLabel>
            <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-[var(--text)]">
              {t.reserve.title}
            </h2>
            <p className="mb-8 text-[var(--text-muted)]">{t.reserve.subtitle}</p>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--accent)]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{isRTL ? "الهاتف" : "Phone"}</p>
                  <p className="font-medium text-[var(--text)]">+965 2474 2000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--accent)]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">{isRTL ? "المواعيد" : "Hours"}</p>
                  <p className="font-medium text-[var(--text)]">{t.location.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-right lg:col-span-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 font-serif text-2xl text-[var(--text)]">{t.reserve.success}</h3>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium text-[var(--gold)] underline underline-offset-4 hover:text-[var(--gold-light)]"
                  >
                    {isRTL ? "إرسال حجز آخر" : "Make another reservation"}
                  </button>
                </div>
              ) : (
                <form onSubmit={onReserve} className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-[var(--text-muted)]">{t.reserve.name}</label>
                    <input
                      required
                      type="text"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--text-muted)]">{t.reserve.phone}</label>
                    <input
                      required
                      type="tel"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--text-muted)]">{t.reserve.guests}</label>
                    <input
                      required
                      type="number"
                      min={1}
                      max={20}
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--text-muted)]">{t.reserve.date}</label>
                    <input
                      required
                      type="date"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--text-muted)]">{t.reserve.time}</label>
                    <input
                      required
                      type="time"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-[var(--text-muted)]">{t.reserve.occasion}</label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-[var(--text-muted)]">{t.reserve.notes}</label>
                    <textarea
                      rows={3}
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--accent)] py-4 font-semibold text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:bg-[var(--accent-light)]"
                    >
                      {t.reserve.submit}
                      <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section id="location" className="bg-[var(--bg-soft)] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal mb-12 text-center">
            <SectionLabel>{t.location.label}</SectionLabel>
            <h2 className="mb-4 font-serif text-4xl md:text-5xl text-[var(--text)]">{t.location.title}</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="reveal-left space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--gold)]" />
                <div>
                  <p className="font-medium text-[var(--text)]">{t.location.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-[var(--gold)]" />
                <a href="tel:+96524742000" className="font-medium text-[var(--text)] hover:text-[var(--accent)]">
                  {t.location.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-[var(--gold)]" />
                <a href="mailto:reservation.atc@ihg.com" className="font-medium text-[var(--text)] hover:text-[var(--accent)]">
                  {t.location.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-[var(--gold)]" />
                <p className="font-medium text-[var(--text)]">{t.location.hours}</p>
              </div>
              <a
                href="https://share.google/4lKf2kMXbJVvf76Dr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--charcoal)]"
              >
                <MapPin className="h-4 w-4" />
                {isRTL ? "فتح في خرائط Google" : "Open in Google Maps"}
              </a>
            </div>

            <div className="reveal-right overflow-hidden rounded-2xl border border-[var(--border)] shadow-xl lg:col-span-2">
              <iframe
                title="Ribeye Steak House Location"
                src="https://maps.google.com/maps?q=Holiday+Inn+Kuwait+Al+Thuraya+City%2C+Farwaniya&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-80 w-full grayscale-[20%] transition-all duration-500 hover:grayscale-0 md:h-96"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--bg)]">
                <Flame className="h-5 w-5 text-[var(--accent)]" />
              </div>
              <div>
                <span className="block font-serif text-lg tracking-[0.12em] text-[var(--text)]">RIBEYE</span>
                <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">
                  Steak House
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="transition-colors hover:text-[var(--gold)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--text-muted)] md:flex-row md:text-start">
            <p>{t.footer.rights}</p>
            <p>{t.footer.ihg}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
