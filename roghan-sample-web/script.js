/* ============================================================
   ROGHAN RESTAURANT — PREMIUM VANILLA JS + GSAP
   ============================================================ */

'use strict';

/* ── Translations ── */
const translations = {
  en: {
    nav: ['Home', 'About', 'Menu', 'Why Us', 'Gallery', 'Reviews', 'Contact'],
    navReserve: 'Reserve Table',
    langLabel: 'العربية',
    heroLabel: 'Premium Dining · Farwaniya, Kuwait',
    heroTitle: 'An Unforgettable\n<em>Culinary</em> Journey',
    heroSubtitle: 'Experience the finest Middle Eastern & South Asian cuisine crafted with premium halal ingredients, authentic recipes, and heartfelt Kuwaiti hospitality.',
    heroCta1: 'Reserve a Table',
    heroCta2: 'Explore Menu',
    heroStat1: ['10+', 'Years of\nExcellence'],
    heroStat2: ['50+', 'Signature\nDishes'],
    heroStat3: ['★ 4.9', 'Guest\nRating'],
    aboutLabel: 'Our Story',
    aboutTitle: 'Rooted in Tradition,\nRefined by Passion',
    aboutSubtitle: 'At Roghan Restaurant, every dish is a celebration of authentic flavors passed down through generations, elevated with premium ingredients and served with the warmth of true Kuwaiti hospitality.',
    aboutBadge: ['10+', 'Years of\nLove'],
    aboutFeatures: [
      ['🌿', 'Halal Certified', '100% premium halal ingredients, sourced with care'],
      ['👨‍🍳', 'Expert Chefs', 'Trained culinary artists with decades of experience'],
      ['🍽️', 'Family Dining', 'Spacious, elegant setting for families & groups'],
      ['🏆', 'Award Quality', 'Consistently praised for authentic taste & service'],
    ],
    menuLabel: 'Our Menu',
    menuTitle: 'Signature Dishes',
    menuSubtitle: 'Each dish is crafted with the finest halal ingredients and traditional recipes, delivering an unforgettable taste experience.',
    filterAll: 'All',
    filterGrills: 'Grills',
    filterRice: 'Rice & Mains',
    filterDeserts: 'Desserts',
    filterDrinks: 'Drinks',
    chefBadge: "Chef's Pick",
    orderBtn: 'Order Now',
    whyLabel: 'Why Choose Us',
    whyTitle: 'Crafted for Those\nWho Appreciate Luxury',
    whyCards: [
      ['🌿', 'Premium Halal', 'Only the finest certified halal ingredients in every dish'],
      ['📜', 'Authentic Recipes', 'Traditional recipes preserved across generations'],
      ['👨‍🍳', 'Expert Chefs', 'Skilled culinary artists with decades of mastery'],
      ['👨‍👩‍👧‍👦', 'Family Dining', 'Warm, spacious settings designed for families'],
      ['✨', 'Elegant Interior', 'A luxurious ambiance for every occasion'],
      ['⚡', 'Fast Service', 'Prompt, attentive service without compromising quality'],
      ['🎉', 'Catering Services', 'Premium catering for weddings and corporate events'],
      ['🔒', 'Private Gatherings', 'Exclusive private dining experiences available'],
    ],
    galleryLabel: 'Gallery',
    galleryTitle: 'A Feast\nfor the Eyes',
    galleryItems: ['Mixed Grill Platter', 'Lamb Roghan', 'Interior Ambiance', 'Chef at Work', 'Kunafa Dessert', 'Table Setting', 'Biryani Bowl', 'Spice Selection'],
    testimonialsLabel: 'Reviews',
    testimonialsTitle: 'Words from\nOur Guests',
    testimonials: [
      { name: 'Ahmad Al-Rashidi', loc: 'Kuwait City', text: 'The Lamb Roghan is simply extraordinary. Rich, tender, and full of authentic spices. This is hands-down the best restaurant in Farwaniya.', stars: 5 },
      { name: 'Sara Al-Mutairi', loc: 'Salwa, Kuwait', text: 'We hosted our family gathering here and the experience was impeccable. The food quality, service, and ambiance exceeded every expectation.', stars: 5 },
      { name: 'Mohammed Al-Ajmi', loc: 'Salmiya, Kuwait', text: 'Best Mixed Grill in Kuwait, no question. The flavors are authentic and the portions are generous. Will absolutely be returning.', stars: 5 },
      { name: 'Fatima Al-Enezi', loc: 'Rumaithiya, Kuwait', text: 'The Chicken Tikka and Butter Chicken were outstanding. Service was warm and attentive. A true gem in Farwaniya!', stars: 5 },
      { name: 'Khaled Al-Sabah', loc: 'Hawalli, Kuwait', text: 'Exceptional halal dining. The Mutton Biryani transported me straight to Lahore. Roghan is our family\'s favorite spot.', stars: 5 },
    ],
    reserveLabel: 'Reserve Your Table',
    reserveTitle: 'Let Us Host\nYour <em>Finest</em> Moments',
    reserveSubtitle: 'Book your table today and let us craft an unforgettable dining experience for you and your loved ones.',
    reserveBtn: 'Reserve a Table',
    whatsappBtn: 'WhatsApp Us',
    mapLabel: 'Find Us',
    mapTitle: 'Visit Roghan\nin Farwaniya',
    contactLabel: 'Contact',
    contactTitle: 'We\'d Love to\nHear from You',
    contactText: 'Whether you want to make a reservation, plan a private event, or simply have a question — our team is ready to assist you.',
    contactItems: [
      { icon: '📞', label: 'Phone', value: '+965 9883 7351', sub: 'Call us anytime' },
      { icon: '📍', label: 'Location', value: 'Farwaniya, Kuwait', sub: 'Find us on Google Maps' },
      { icon: '🕐', label: 'Hours', value: 'Sat–Thu: 11AM–12AM', sub: 'Fri: 1PM–12AM' },
      { icon: '💬', label: 'WhatsApp', value: '+965 9883 7351', sub: 'Chat with us instantly' },
    ],
    callBtn: 'Call Now',
    whatsappBtnContact: 'WhatsApp Us',
    directionsBtn: 'Get Directions',
    hoursTitle: 'Opening Hours',
    hours: [
      ['Saturday – Thursday', '11:00 AM – 12:00 AM'],
      ['Friday', '1:00 PM – 12:00 AM'],
    ],
    footerLinks: ['Home', 'Menu', 'About', 'Gallery', 'Contact'],
    footerCopy: '© 2025 Roghan Restaurant. All rights reserved.',
    footerTagline: 'Premium Dining · Farwaniya, Kuwait',
    privacy: 'Privacy',
    terms: 'Terms',
    scrollLabel: 'Scroll',
  },
  ar: {
    nav: ['الرئيسية', 'عن المطعم', 'القائمة', 'لماذا نحن', 'المعرض', 'الآراء', 'اتصل بنا'],
    navReserve: 'احجز طاولة',
    langLabel: 'English',
    heroLabel: 'مطعم فاخر · الفروانية، الكويت',
    heroTitle: 'رحلة <em>ذواقة</em>\nلا تُنسى',
    heroSubtitle: 'استمتع بأفخر المأكولات الشرق أوسطية وجنوب آسيا، مُعدّة بمكونات حلال فاخرة ووصفات أصيلة وكرم ضيافة كويتية حقيقية.',
    heroCta1: 'احجز طاولة',
    heroCta2: 'استعرض القائمة',
    heroStat1: ['+10', 'سنوات من\nالتميز'],
    heroStat2: ['+50', 'طبق\nمميز'],
    heroStat3: ['★ 4.9', 'تقييم\nالضيوف'],
    aboutLabel: 'قصتنا',
    aboutTitle: 'متجذرون بالتراث،\nمُصقّلون بالشغف',
    aboutSubtitle: 'في مطعم روغان، كل طبق احتفال بنكهات أصيلة تتوارثها الأجيال، مُرفّعة بمكونات فاخرة ومقدّمة بدفء الضيافة الكويتية الحقيقية.',
    aboutBadge: ['+10', 'سنوات\nمن العشق'],
    aboutFeatures: [
      ['🌿', 'حلال معتمد', 'مكونات حلال فاخرة بالكامل، مختارة بعناية'],
      ['👨‍🍳', 'طهاة خبراء', 'فنانو الطهي المدربون بعقود من الخبرة'],
      ['🍽️', 'جلسات عائلية', 'مساحات أنيقة ورحبة للعائلات والمجموعات'],
      ['🏆', 'جودة مُتميزة', 'المطبخ الأصيل والخدمة الممتازة دائمًا'],
    ],
    menuLabel: 'قائمتنا',
    menuTitle: 'أطباقنا المميزة',
    menuSubtitle: 'كل طبق يُعدّ بأجود المكونات الحلال والوصفات الأصيلة لتجربة ذوق لا تُنسى.',
    filterAll: 'الكل',
    filterGrills: 'المشويات',
    filterRice: 'الأرز والرئيسية',
    filterDeserts: 'الحلويات',
    filterDrinks: 'المشروبات',
    chefBadge: 'اختيار الشيف',
    orderBtn: 'اطلب الآن',
    whyLabel: 'لماذا تختارنا',
    whyTitle: 'مُصمَّم لمن\nيُقدّر الرفاهية',
    whyCards: [
      ['🌿', 'حلال فاخر', 'فقط أجود المكونات الحلال المعتمدة في كل طبق'],
      ['📜', 'وصفات أصيلة', 'وصفات تقليدية متوارثة عبر الأجيال'],
      ['👨‍🍳', 'طهاة محترفون', 'فنانو طهي ماهرون بعقود من الإتقان'],
      ['👨‍👩‍👧‍👦', 'جلسات عائلية', 'أجواء دافئة ورحبة مصممة للعائلات'],
      ['✨', 'ديكور فاخر', 'أجواء راقية مناسبة لكل المناسبات'],
      ['⚡', 'خدمة سريعة', 'خدمة فورية ومتميزة دون المساومة على الجودة'],
      ['🎉', 'خدمات تموين', 'تموين فاخر للأفراح والفعاليات التجارية'],
      ['🔒', 'تجمعات خاصة', 'تجارب خاصة للعشاء الخاص متاحة عند الطلب'],
    ],
    galleryLabel: 'المعرض',
    galleryTitle: 'مشهد\nيسحر الألباب',
    galleryItems: ['طبق المشويات المختلطة', 'لحم روغان', 'أجواء المطعم', 'الشيف أثناء العمل', 'حلوى الكنافة', 'تجهيز الطاولة', 'وعاء البيريانى', 'تشكيلة التوابل'],
    testimonialsLabel: 'آراء الضيوف',
    testimonialsTitle: 'كلمات\nضيوفنا الكرام',
    testimonials: [
      { name: 'أحمد الرشيدي', loc: 'مدينة الكويت', text: 'لحم روغان رائع ببساطة، غني وطري ومليء بالتوابل الأصيلة. هذا بلا شك أفضل مطعم في الفروانية.', stars: 5 },
      { name: 'سارة المطيري', loc: 'سلوى، الكويت', text: 'استضفنا تجمعنا العائلي هنا وكانت التجربة لا تشوبها شائبة. جودة الطعام والخدمة والأجواء فاقت كل التوقعات.', stars: 5 },
      { name: 'محمد العجمي', loc: 'السالمية، الكويت', text: 'أفضل مشويات مختلطة في الكويت بلا منازع. النكهات أصيلة والكميات سخية. سنعود حتماً.', stars: 5 },
      { name: 'فاطمة العنزي', loc: 'الرميثية، الكويت', text: 'دجاج التكا والبترتشيكن كانا رائعَين. الخدمة دافئة ومتميزة. جوهرة حقيقية في الفروانية!', stars: 5 },
      { name: 'خالد الصباح', loc: 'حولي، الكويت', text: 'مطبخ حلال استثنائي. برياني اللحم نقلني مباشرة إلى لاهور. مطعم روغان هو مكاننا المفضل للعائلة.', stars: 5 },
    ],
    reserveLabel: 'احجز طاولتك',
    reserveTitle: 'دعنا نستضيف\n<em>أجمل</em> لحظاتك',
    reserveSubtitle: 'احجز طاولتك اليوم ودعنا نصنع لك تجربة عشاء لا تُنسى لك ولأحبائك.',
    reserveBtn: 'احجز طاولة',
    whatsappBtn: 'تواصل عبر واتساب',
    mapLabel: 'موقعنا',
    mapTitle: 'زُر روغان\nفي الفروانية',
    contactLabel: 'تواصل معنا',
    contactTitle: 'يسعدنا\nالتواصل معك',
    contactText: 'سواء أردت الحجز أو التخطيط لحدث خاص أو لديك سؤال — فريقنا مستعد لمساعدتك دائمًا.',
    contactItems: [
      { icon: '📞', label: 'الهاتف', value: '+965 9883 7351', sub: 'اتصل بنا في أي وقت' },
      { icon: '📍', label: 'الموقع', value: 'الفروانية، الكويت', sub: 'ابحث عنا على خرائط جوجل' },
      { icon: '🕐', label: 'ساعات العمل', value: 'السبت–الخميس: 11ص–12ص', sub: 'الجمعة: 1م–12ص' },
      { icon: '💬', label: 'واتساب', value: '+965 9883 7351', sub: 'تحدث معنا فوراً' },
    ],
    callBtn: 'اتصل الآن',
    whatsappBtnContact: 'واتساب',
    directionsBtn: 'احصل على الاتجاهات',
    hoursTitle: 'ساعات العمل',
    hours: [
      ['السبت – الخميس', '11:00 ص – 12:00 ص'],
      ['الجمعة', '1:00 م – 12:00 ص'],
    ],
    footerLinks: ['الرئيسية', 'القائمة', 'عن المطعم', 'المعرض', 'اتصل بنا'],
    footerCopy: '© 2025 مطعم روغان. جميع الحقوق محفوظة.',
    footerTagline: 'مطعم فاخر · الفروانية، الكويت',
    privacy: 'الخصوصية',
    terms: 'الشروط',
    scrollLabel: 'مرر',
  }
};

/* ── Menu Data ── */
const menuData = {
  en: [
    { id: 1, name: 'Lamb Roghan', category: 'grills', cat_label: 'Signature Grill', desc: 'Slow-cooked tender lamb in a rich, aromatic roghan sauce with hand-ground spices.', price: '4.500', currency: 'KD', chef: true, img: 'https://images.pexels.com/photos/18698223/pexels-photo-18698223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 2, name: 'Mixed Grill Platter', category: 'grills', cat_label: 'Grill', desc: 'A royal assortment of grilled lamb chops, seekh kebab, shish tawook, and kofta.', price: '6.500', currency: 'KD', chef: true, img: 'https://images.pexels.com/photos/18698230/pexels-photo-18698230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 3, name: 'Chicken Tikka', category: 'grills', cat_label: 'Grill', desc: 'Marinated chicken pieces slow-roasted in a tandoor, smoky and perfectly charred.', price: '3.250', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/29699526/pexels-photo-29699526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 4, name: 'Lamb Chops', category: 'grills', cat_label: 'Grill', desc: 'Premium New Zealand lamb chops marinated in saffron and aromatic Middle Eastern herbs.', price: '5.750', currency: 'KD', chef: true, img: 'https://images.pexels.com/photos/29253304/pexels-photo-29253304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 5, name: 'Shish Tawook', category: 'grills', cat_label: 'Grill', desc: 'Juicy chicken skewers marinated in lemon, garlic, and aromatic yogurt blend.', price: '2.750', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/18698260/pexels-photo-18698260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 6, name: 'Grilled Kebabs', category: 'grills', cat_label: 'Grill', desc: 'Hand-rolled minced lamb kebabs with fresh herbs and mild chili, grilled to perfection.', price: '3.000', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/18698223/pexels-photo-18698223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 7, name: 'Chicken Machboos', category: 'rice', cat_label: 'Rice Dish', desc: 'Fragrant saffron-infused rice layered with tender slow-cooked chicken and Kuwaiti spices.', price: '3.500', currency: 'KD', chef: true, img: 'https://images.pexels.com/photos/17696653/pexels-photo-17696653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 8, name: 'Mutton Biryani', category: 'rice', cat_label: 'Rice Dish', desc: 'Layered dum biryani with tender mutton, caramelized onions, and aromatic basmati rice.', price: '4.000', currency: 'KD', chef: true, img: 'https://images.pexels.com/photos/17696654/pexels-photo-17696654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 9, name: 'Butter Chicken', category: 'rice', cat_label: 'Main', desc: 'Silky, slow-simmered tomato-cream curry with tender chicken in a velvety sauce.', price: '3.250', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/18620325/pexels-photo-18620325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 10, name: 'Arabic Mixed Platter', category: 'rice', cat_label: 'Sharing', desc: 'A festive spread of Machboos, grilled meats, and traditional Arabic sides for the whole family.', price: '8.500', currency: 'KD', chef: true, img: 'https://images.pexels.com/photos/17696657/pexels-photo-17696657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 11, name: 'Kunafa', category: 'desserts', cat_label: 'Dessert', desc: 'Warm shredded pastry filled with sweet cheese, drizzled in rose water and pistachio crumble.', price: '1.750', currency: 'KD', chef: true, img: 'https://images.pexels.com/photos/20586597/pexels-photo-20586597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 12, name: 'Baklava', category: 'desserts', cat_label: 'Dessert', desc: 'Flaky layers of phyllo pastry, honey, and premium mixed nuts — a timeless Arabic sweet.', price: '1.500', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/20586594/pexels-photo-20586594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 13, name: 'Fresh Juices', category: 'drinks', cat_label: 'Beverages', desc: 'Freshly pressed seasonal fruits — mango, watermelon, pomegranate, and more.', price: '0.850', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/38377147/pexels-photo-38377147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 14, name: 'Arabic Tea', category: 'drinks', cat_label: 'Beverages', desc: 'Authentic karak chai and fragrant saffron tea served in traditional style.', price: '0.500', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/29631417/pexels-photo-29631417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 15, name: 'Fresh Bread', category: 'rice', cat_label: 'Sides', desc: 'Freshly baked tandoor naan and regag bread served warm with our signature dipping sauces.', price: '0.500', currency: 'KD', chef: false, img: 'https://images.pexels.com/photos/18698232/pexels-photo-18698232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  ],
  ar: [
    { id: 1, name: 'لحم روغان', category: 'grills', cat_label: 'مشوي مميز', desc: 'لحم غنم طري مطهو ببطء في صلصة روغان غنية ومعطرة مع توابل مطحونة يدوياً.', price: '4.500', currency: 'د.ك', chef: true, img: 'https://images.pexels.com/photos/18698223/pexels-photo-18698223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 2, name: 'طبق مشويات مختلطة', category: 'grills', cat_label: 'مشوي', desc: 'تشكيلة ملكية من رقبة الغنم المشوية والسيخ والشيش طاووق والكفتة.', price: '6.500', currency: 'د.ك', chef: true, img: 'https://images.pexels.com/photos/18698230/pexels-photo-18698230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 3, name: 'دجاج تكا', category: 'grills', cat_label: 'مشوي', desc: 'قطع دجاج متبلة مشوية ببطء في التندور، مدخنة ومحمرة بشكل مثالي.', price: '3.250', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/29699526/pexels-photo-29699526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 4, name: 'لحم الغنم المشوي', category: 'grills', cat_label: 'مشوي', desc: 'رقبة غنم نيوزيلندية فاخرة متبلة بالزعفران والأعشاب الشرق أوسطية.', price: '5.750', currency: 'د.ك', chef: true, img: 'https://images.pexels.com/photos/29253304/pexels-photo-29253304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 5, name: 'شيش طاووق', category: 'grills', cat_label: 'مشوي', desc: 'أسياخ دجاج طرية متبلة بالليمون والثوم وخليج اللبن المعطر.', price: '2.750', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/18698260/pexels-photo-18698260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 6, name: 'كباب مشوي', category: 'grills', cat_label: 'مشوي', desc: 'كباب لحم مفروم يدوياً مع أعشاب طازجة وفلفل خفيف، مشوي بإتقان.', price: '3.000', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/18698223/pexels-photo-18698223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 7, name: 'مجبوس دجاج', category: 'rice', cat_label: 'طبق أرز', desc: 'أرز مُعطّر بالزعفران مع دجاج طري مطهو ببطء وتوابل كويتية أصيلة.', price: '3.500', currency: 'د.ك', chef: true, img: 'https://images.pexels.com/photos/17696653/pexels-photo-17696653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 8, name: 'برياني لحم', category: 'rice', cat_label: 'طبق أرز', desc: 'برياني دم طبقي مع لحم غنم طري وبصل مكرمل وأرز بسمتي معطر.', price: '4.000', currency: 'د.ك', chef: true, img: 'https://images.pexels.com/photos/17696654/pexels-photo-17696654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 9, name: 'بترتشيكن', category: 'rice', cat_label: 'رئيسي', desc: 'كاري كريمي بالطماطم مطهو ببطء مع دجاج طري في صلصة حريرية.', price: '3.250', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/18620325/pexels-photo-18620325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 10, name: 'طبق عربي مختلط', category: 'rice', cat_label: 'مشاركة', desc: 'مائدة احتفالية من المجبوس والمشويات والمقبلات العربية التقليدية للعائلة.', price: '8.500', currency: 'د.ك', chef: true, img: 'https://images.pexels.com/photos/17696657/pexels-photo-17696657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 11, name: 'كنافة', category: 'desserts', cat_label: 'حلوى', desc: 'معجنات ساخنة محشوة بالجبن الحلو، مرشوشة بماء الورد والفستق المجروش.', price: '1.750', currency: 'د.ك', chef: true, img: 'https://images.pexels.com/photos/20586597/pexels-photo-20586597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 12, name: 'بقلاوة', category: 'desserts', cat_label: 'حلوى', desc: 'طبقات هشة من عجين الفيلو والعسل والمكسرات الفاخرة — الحلوى العربية الكلاسيكية.', price: '1.500', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/20586594/pexels-photo-20586594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 13, name: 'عصائر طازجة', category: 'drinks', cat_label: 'مشروبات', desc: 'فواكه موسمية طازجة — مانجو وبطيخ ورمان والمزيد.', price: '0.850', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/38377147/pexels-photo-38377147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 14, name: 'شاي عربي', category: 'drinks', cat_label: 'مشروبات', desc: 'كرك أصيل وشاي الزعفران المعطر مقدم بالطريقة التقليدية.', price: '0.500', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/29631417/pexels-photo-29631417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
    { id: 15, name: 'خبز طازج', category: 'rice', cat_label: 'مرافقات', desc: 'خبز تندور ورقاق طازج مخبوز يومياً مع صلصات التغميس المميزة.', price: '0.500', currency: 'د.ك', chef: false, img: 'https://images.pexels.com/photos/18698232/pexels-photo-18698232.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  ]
};

/* ── Gallery Data ── */
const galleryImages = [
  { img: 'https://images.pexels.com/photos/18698230/pexels-photo-18698230.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tall: false },
  { img: 'https://images.pexels.com/photos/17696657/pexels-photo-17696657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tall: true },
  { img: 'https://images.pexels.com/photos/19615778/pexels-photo-19615778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', tall: false },
  { img: 'https://images.pexels.com/photos/36430153/pexels-photo-36430153.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', tall: false },
  { img: 'https://images.pexels.com/photos/20586597/pexels-photo-20586597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tall: true },
  { img: 'https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200', tall: false },
  { img: 'https://images.pexels.com/photos/17696653/pexels-photo-17696653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tall: false },
  { img: 'https://images.pexels.com/photos/29253304/pexels-photo-29253304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tall: true },
];

/* ── State ── */
let currentLang = localStorage.getItem('roghan-lang') || 'en';
let currentTheme = localStorage.getItem('roghan-theme') || 'dark';
let currentFilter = 'all';
let testimonialIndex = 0;
let testimonialInterval;
let gsapReady = false;

/* ── DOM Refs ── */
const html = document.documentElement;
const body = document.body;

/* ── Init on DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme, false);
  applyLanguage(currentLang, false);
  buildPage();
  initLoader();
});

/* ── Page Load ── */
function initLoader() {
  const loader = document.getElementById('page-loader');
  const loaderBrand = loader.querySelector('.loader-brand');
  const loaderTagline = loader.querySelector('.loader-tagline');

  // Wait for GSAP
  const checkGSAP = setInterval(() => {
    if (typeof gsap !== 'undefined') {
      clearInterval(checkGSAP);
      gsapReady = true;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              loader.style.display = 'none';
              initGSAP();
            }
          });
        }
      });

      tl.to(loaderBrand, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(loaderTagline, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to({}, { duration: 1.2 });
    }
  }, 50);

  // Fallback after 4s
  setTimeout(() => {
    clearInterval(checkGSAP);
    loader.style.display = 'none';
    initGSAP();
  }, 4000);
}

/* ── Build Page HTML ── */
function buildPage() {
  buildNav();
  buildMobileMenu();
  buildHero();
  buildAbout();
  buildMenu();
  buildWhy();
  buildGallery();
  buildTestimonials();
  buildReservation();
  buildMap();
  buildContact();
  buildFooter();
  bindEvents();
  startTestimonialAuto();
}

/* ── Navigation ── */
function buildNav() {
  const t = translations[currentLang];
  const navEl = document.getElementById('navbar');
  navEl.innerHTML = `
    <div class="nav-container">
      <a href="#hero" class="nav-logo" aria-label="Roghan Restaurant">
        <div class="nav-logo-icon">🍽️</div>
        <div class="nav-logo-text">
          <span class="nav-logo-name">${currentLang === 'ar' ? 'روغان' : 'Roghan'}</span>
          <span class="nav-logo-tagline">${currentLang === 'ar' ? 'مطعم فاخر' : 'Premium Restaurant'}</span>
        </div>
      </a>
      <nav class="nav-links" aria-label="Main Navigation">
        ${['hero','about','menu','why','gallery','testimonials','contact'].map((id, i) => `
          <a href="#${id}" class="nav-link" data-section="${id}">${t.nav[i] || t.nav[Math.min(i,t.nav.length-1)]}</a>
        `).join('')}
      </nav>
      <div class="nav-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Theme" title="Toggle Theme">
          ${currentTheme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button class="lang-toggle" id="lang-toggle" aria-label="Switch Language">
          <span class="lang-dot"></span>
          ${t.langLabel}
        </button>
        <a href="tel:+96598837351" class="btn-nav-reserve magnetic">${t.navReserve}</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle Menu" aria-expanded="false">
          <span class="ham-line"></span>
          <span class="ham-line"></span>
          <span class="ham-line"></span>
        </button>
      </div>
    </div>
  `;
}

/* ── Mobile Menu ── */
function buildMobileMenu() {
  const t = translations[currentLang];
  const sections = ['hero', 'about', 'menu', 'why', 'gallery', 'contact'];
  const menuEl = document.getElementById('mobile-menu');
  menuEl.innerHTML = `
    <div class="mobile-menu-inner">
      ${sections.map((id, i) => `
        <a href="#${id}" class="mobile-nav-link" data-close-menu>${t.nav[Math.min(i, t.nav.length-1)]}</a>
      `).join('')}
    </div>
    <div class="mobile-menu-footer">
      <a href="tel:+96598837351" class="btn-primary" style="font-size:0.82rem;height:48px;padding:0 24px;">
        <span>📞 ${t.callBtn}</span>
      </a>
      <a href="https://wa.me/96598837351" class="btn-whatsapp" style="height:48px;padding:0 24px;font-size:0.82rem;">
        <span>💬 ${t.whatsappBtnContact}</span>
      </a>
    </div>
    <div class="mobile-menu-gold-line"></div>
  `;
}

/* ── Hero ── */
function buildHero() {
  const t = translations[currentLang];
  const sec = document.getElementById('hero');
  sec.innerHTML = `
    <div class="hero-bg">
      <img class="hero-bg-img" src="https://images.pexels.com/photos/19615778/pexels-photo-19615778.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600" alt="Roghan Restaurant Interior" loading="eager">
    </div>
    <div class="hero-overlay"></div>
    <canvas id="hero-canvas"></canvas>
    <div class="hero-rays"></div>
    <div class="hero-smoke"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        ${t.heroLabel}
      </div>
      <h1 class="hero-title">${t.heroTitle.replace('\n','<br>')}</h1>
      <p class="hero-subtitle">${t.heroSubtitle}</p>
      <div class="hero-cta">
        <a href="tel:+96598837351" class="btn-primary magnetic">
          <span>🍽️ ${t.heroCta1}</span>
        </a>
        <a href="#menu" class="btn-outline magnetic">
          <span>📖 ${t.heroCta2}</span>
        </a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-stat-num">${t.heroStat1[0]}</span>
          <span class="hero-stat-label">${t.heroStat1[1].replace('\n','<br>')}</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-num">${t.heroStat2[0]}</span>
          <span class="hero-stat-label">${t.heroStat2[1].replace('\n','<br>')}</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-num">${t.heroStat3[0]}</span>
          <span class="hero-stat-label">${t.heroStat3[1].replace('\n','<br>')}</span>
        </div>
      </div>
    </div>
    <div class="hero-scroll">
      <div class="hero-scroll-line"></div>
      <span>${t.scrollLabel}</span>
    </div>
  `;
  initParticles();
}

/* ── Particles Canvas ── */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: H + Math.random() * 20,
      r: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? '#C8A35F' : '#9C6B3C'
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 60 }, createParticle);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.y -= p.speed;
      p.x += p.drift;
      p.opacity -= 0.0008;
      if (p.y < -10 || p.opacity <= 0) particles[i] = { ...createParticle(), y: H };
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', resize);
}

/* ── About ── */
function buildAbout() {
  const t = translations[currentLang];
  const sec = document.getElementById('about');
  sec.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-images reveal-left">
          <div class="about-img-main">
            <img src="https://images.pexels.com/photos/36430149/pexels-photo-36430149.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Chef at Roghan Restaurant" loading="lazy">
          </div>
          <div class="about-img-accent">
            <img src="https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Elegant dining at Roghan" loading="lazy">
          </div>
          <div class="about-badge">
            <span class="about-badge-num">${t.aboutBadge[0]}</span>
            <span class="about-badge-text">${t.aboutBadge[1]}</span>
          </div>
        </div>
        <div class="about-content reveal-right">
          <div class="section-label">${t.aboutLabel}</div>
          <h2 class="section-title">${t.aboutTitle.replace('\n','<br>')}</h2>
          <div class="gold-divider"><span class="gold-divider-icon">✦</span></div>
          <p class="section-subtitle">${t.aboutSubtitle}</p>
          <div class="about-features">
            ${t.aboutFeatures.map(f => `
              <div class="about-feature">
                <div class="about-feature-icon">${f[0]}</div>
                <div class="about-feature-title">${f[1]}</div>
                <div class="about-feature-desc">${f[2]}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Menu ── */
function buildMenu() {
  const t = translations[currentLang];
  const dishes = menuData[currentLang];
  const sec = document.getElementById('menu');
  sec.innerHTML = `
    <div class="container">
      <div class="menu-header reveal">
        <div class="section-label">${t.menuLabel}</div>
        <h2 class="section-title">${t.menuTitle}</h2>
        <p class="section-subtitle">${t.menuSubtitle}</p>
      </div>
      <div class="menu-filter reveal">
        <button class="filter-btn active" data-filter="all">${t.filterAll}</button>
        <button class="filter-btn" data-filter="grills">${t.filterGrills}</button>
        <button class="filter-btn" data-filter="rice">${t.filterRice}</button>
        <button class="filter-btn" data-filter="desserts">${t.filterDeserts}</button>
        <button class="filter-btn" data-filter="drinks">${t.filterDrinks}</button>
      </div>
      <div class="menu-grid" id="menu-grid">
        ${dishes.map(d => buildMenuCard(d, t)).join('')}
      </div>
    </div>
  `;
  bindFilterBtns();
}

function buildMenuCard(d, t) {
  return `
    <div class="menu-card" data-category="${d.category}">
      <div class="menu-card-img">
        <img src="${d.img}" alt="${d.name}" loading="lazy">
        <div class="menu-card-img-overlay"></div>
        ${d.chef ? `<div class="chef-badge">⭐ ${t.chefBadge}</div>` : ''}
      </div>
      <div class="menu-card-body">
        <div class="menu-card-category">${d.cat_label}</div>
        <div class="menu-card-name">${d.name}</div>
        <div class="menu-card-desc">${d.desc}</div>
        <div class="menu-card-footer">
          <div class="menu-card-price">${d.price} <span>${d.currency}</span></div>
          <a href="https://wa.me/96598837351?text=${encodeURIComponent('I would like to order: ' + d.name)}" class="btn-order">${t.orderBtn}</a>
        </div>
      </div>
    </div>
  `;
}

function bindFilterBtns() {
  const btns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('menu-grid');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      const cards = grid.querySelectorAll('.menu-card');
      if (gsapReady) {
        cards.forEach(c => {
          const cat = c.dataset.category;
          const show = currentFilter === 'all' || cat === currentFilter;
          if (!show) {
            gsap.to(c, { opacity: 0, scale: 0.9, duration: 0.2, onComplete: () => { c.style.display = 'none'; } });
          } else {
            c.style.display = '';
            gsap.fromTo(c, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
          }
        });
      } else {
        cards.forEach(c => {
          const cat = c.dataset.category;
          c.style.display = (currentFilter === 'all' || cat === currentFilter) ? '' : 'none';
        });
      }
    });
  });
}

/* ── Why Choose Us ── */
function buildWhy() {
  const t = translations[currentLang];
  const sec = document.getElementById('why');
  sec.innerHTML = `
    <div class="container">
      <div class="why-header reveal">
        <div class="section-label">${t.whyLabel}</div>
        <h2 class="section-title">${t.whyTitle.replace('\n','<br>')}</h2>
      </div>
      <div class="why-grid">
        ${t.whyCards.map((c, i) => `
          <div class="why-card reveal" style="transition-delay:${i * 0.06}s">
            <div class="why-icon">${c[0]}</div>
            <div class="why-title">${c[1]}</div>
            <div class="why-desc">${c[2]}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ── Gallery ── */
function buildGallery() {
  const t = translations[currentLang];
  const sec = document.getElementById('gallery');
  sec.innerHTML = `
    <div class="container">
      <div class="gallery-header reveal">
        <div class="section-label">${t.galleryLabel}</div>
        <h2 class="section-title">${t.galleryTitle.replace('\n','<br>')}</h2>
      </div>
      <div class="gallery-masonry">
        ${galleryImages.map((g, i) => `
          <div class="gallery-item reveal-scale">
            <img src="${g.img}" alt="${t.galleryItems[i] || 'Gallery'}" loading="lazy" ${g.tall ? 'style="aspect-ratio:3/4;"' : 'style="aspect-ratio:4/3;"'}>
            <div class="gallery-item-overlay">
              <span class="gallery-item-label">${t.galleryItems[i] || ''}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ── Testimonials ── */
function buildTestimonials() {
  const t = translations[currentLang];
  const sec = document.getElementById('testimonials');
  sec.innerHTML = `
    <div class="container">
      <div class="testimonials-header reveal">
        <div class="section-label">${t.testimonialsLabel}</div>
        <h2 class="section-title">${t.testimonialsTitle.replace('\n','<br>')}</h2>
      </div>
      <div class="testimonials-track-wrapper">
        <div class="testimonials-track" id="testimonials-track">
          ${t.testimonials.map((r, i) => `
            <div class="testimonial-card">
              <div class="testimonial-stars">${'★'.repeat(r.stars)}</div>
              <p class="testimonial-text">${r.text}</p>
              <div class="testimonial-author">
                <div class="testimonial-avatar">${r.name.charAt(0)}</div>
                <div class="testimonial-author-info">
                  <div class="testimonial-name">${r.name}</div>
                  <div class="testimonial-location">${r.loc}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="testimonials-nav">
        ${t.testimonials.map((_, i) => `
          <div class="testimonial-dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>
        `).join('')}
      </div>
    </div>
  `;
  bindTestimonialsNav();
}

function bindTestimonialsNav() {
  const dots = document.querySelectorAll('.testimonial-dot');
  dots.forEach(d => {
    d.addEventListener('click', () => {
      const idx = parseInt(d.dataset.index);
      goToTestimonial(idx);
    });
  });
}

function goToTestimonial(idx) {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const cards = track.querySelectorAll('.testimonial-card');
  const card = cards[0];
  if (!card) return;
  const cardW = card.offsetWidth + 24;
  const wrapW = track.parentElement.offsetWidth;
  const maxScroll = Math.max(0, cardW * cards.length - wrapW);
  let offset = Math.min(idx * cardW, maxScroll);

  testimonialIndex = idx;
  if (gsapReady) {
    gsap.to(track, { x: -offset, duration: 0.7, ease: 'power3.inOut' });
  } else {
    track.style.transform = `translateX(-${offset}px)`;
  }
  document.querySelectorAll('.testimonial-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

function startTestimonialAuto() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    const t = translations[currentLang];
    const next = (testimonialIndex + 1) % t.testimonials.length;
    goToTestimonial(next);
  }, 4500);
}

/* ── Reservation ── */
function buildReservation() {
  const t = translations[currentLang];
  const sec = document.getElementById('reservation');
  sec.innerHTML = `
    <div class="reservation-bg">
      <img src="https://images.pexels.com/photos/12940856/pexels-photo-12940856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" alt="Roghan ambiance" loading="lazy">
    </div>
    <div class="reservation-overlay"></div>
    <div class="reservation-content">
      <div class="section-label" style="justify-content:center;color:rgba(200,163,95,0.9);">${t.reserveLabel}</div>
      <h2 class="reservation-title reveal">${t.reserveTitle.replace('\n','<br>')}</h2>
      <p class="reservation-subtitle reveal">${t.reserveSubtitle}</p>
      <div class="reservation-cta reveal">
        <a href="tel:+96598837351" class="btn-primary magnetic">
          <span>🍽️ ${t.reserveBtn}</span>
        </a>
        <a href="https://wa.me/96598837351?text=${encodeURIComponent('I would like to make a reservation')}" class="btn-whatsapp magnetic" target="_blank">
          💬 ${t.whatsappBtn}
        </a>
      </div>
    </div>
  `;
}

/* ── Map ── */
function buildMap() {
  const t = translations[currentLang];
  const sec = document.getElementById('map-section');
  sec.innerHTML = `
    <div class="container">
      <div class="gallery-header reveal" style="margin-bottom:32px;">
        <div class="section-label">${t.mapLabel}</div>
        <h2 class="section-title">${t.mapTitle.replace('\n','<br>')}</h2>
      </div>
      <div class="map-inner reveal">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.6!2d47.95!3d29.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zRmFyd2FuaXlhLCBLdXdhaXQ!5e0!3m2!1sen!2skw!4v1700000000000"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Roghan Restaurant Location"
          aria-label="Map showing Roghan Restaurant location in Farwaniya, Kuwait">
        </iframe>
      </div>
      <div style="text-align:center;margin-top:24px;">
        <a href="https://share.google/YSFlADr06Vf4gAnvu" target="_blank" class="btn-outline magnetic">
          <span>📍 ${t.directionsBtn}</span>
        </a>
      </div>
    </div>
  `;
}

/* ── Contact ── */
function buildContact() {
  const t = translations[currentLang];
  const sec = document.getElementById('contact');
  sec.innerHTML = `
    <div class="container">
      <div class="contact-grid">
        <div class="reveal-left">
          <div class="section-label">${t.contactLabel}</div>
          <div class="contact-items">
            ${t.contactItems.map(item => `
              <div class="contact-item">
                <div class="contact-icon">${item.icon}</div>
                <div class="contact-item-info">
                  <div class="contact-item-label">${item.label}</div>
                  <div class="contact-item-value">${item.value}</div>
                  <div class="contact-item-sub">${item.sub}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="opening-hours" style="margin-top:24px;">
            <div class="opening-title">${t.hoursTitle}</div>
            ${t.hours.map(h => `
              <div class="hours-row">
                <span class="hours-day">${h[0]}</span>
                <span class="hours-time">${h[1]}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="contact-cta-area reveal-right">
          <div class="section-label">${t.contactLabel}</div>
          <h2 class="contact-cta-title">${t.contactTitle.replace('\n','<br>')}</h2>
          <p class="contact-cta-text">${t.contactText}</p>
          <div class="contact-btns">
            <a href="tel:+96598837351" class="btn-call">
              📞 ${t.callBtn}: <strong>+965 9883 7351</strong>
            </a>
            <a href="https://wa.me/96598837351" class="btn-whatsapp magnetic" target="_blank" style="width:fit-content;">
              💬 ${t.whatsappBtnContact}
            </a>
            <a href="https://share.google/YSFlADr06Vf4gAnvu" target="_blank" class="btn-outline magnetic" style="width:fit-content;margin-top:4px;">
              <span>📍 ${t.directionsBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── Footer ── */
function buildFooter() {
  const t = translations[currentLang];
  const sections = ['hero', 'menu', 'about', 'gallery', 'contact'];
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo-icon">🍽️</div>
          <div>
            <div class="footer-logo-name">${currentLang === 'ar' ? 'مطعم روغان' : 'Roghan Restaurant'}</div>
            <div style="font-size:0.68rem;color:var(--gold);letter-spacing:0.12em;margin-top:2px;">${t.footerTagline}</div>
          </div>
        </div>
        <nav class="footer-nav">
          ${t.footerLinks.map((lbl, i) => `
            <a href="#${sections[i]}" class="footer-nav-link">${lbl}</a>
          `).join('')}
        </nav>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">${t.footerCopy}</span>
        <div class="footer-legal">
          <a href="#">${t.privacy}</a>
          <a href="#">${t.terms}</a>
        </div>
      </div>
    </div>
  `;
}

/* ── Apply Theme ── */
function applyTheme(theme, animate = true) {
  currentTheme = theme;
  localStorage.setItem('roghan-theme', theme);
  html.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ── Apply Language ── */
function applyLanguage(lang, rebuild = true) {
  currentLang = lang;
  localStorage.setItem('roghan-lang', lang);
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  if (rebuild) {
    buildNav();
    buildMobileMenu();
    buildHero();
    buildAbout();
    buildMenu();
    buildWhy();
    buildGallery();
    buildTestimonials();
    buildReservation();
    buildMap();
    buildContact();
    buildFooter();
    bindEvents();
    testimonialIndex = 0;
    startTestimonialAuto();
    if (gsapReady) {
      setTimeout(() => reinitScrollTriggers(), 100);
    }
    initParticles();
  }
}

/* ── Bind Events ── */
function bindEvents() {
  // Theme toggle
  const themBtn = document.getElementById('theme-toggle');
  if (themBtn) {
    themBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // Lang toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      closeMobileMenu();
      applyLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
  }

  // Hamburger
  const ham = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (ham) {
    ham.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) { closeMobileMenu(); } else { openMobileMenu(); }
    });
  }

  // Close menu on link click
  document.querySelectorAll('[data-close-menu]').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });

  // Scroll Top
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Active nav link on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
  }

  // Scroll top visibility
  window.addEventListener('scroll', onScroll, { passive: true });

  // Magnetic buttons
  initMagnetic();
}

function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const ham = document.getElementById('hamburger');
  if (!mobileMenu) return;
  mobileMenu.classList.add('open');
  if (ham) { ham.classList.add('active'); ham.setAttribute('aria-expanded', 'true'); }
  document.body.style.overflow = 'hidden';

  if (gsapReady) {
    const links = mobileMenu.querySelectorAll('.mobile-nav-link');
    const footer = mobileMenu.querySelector('.mobile-menu-footer');
    gsap.fromTo(links, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' });
    if (footer) gsap.fromTo(footer, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.35, ease: 'power3.out' });
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const ham = document.getElementById('hamburger');
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  if (ham) { ham.classList.remove('active'); ham.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
}

/* ── Scroll Handler ── */
function onScroll() {
  const scrollY = window.scrollY;
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', scrollY > 500);
  }

  // Nav scroll effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (scrollY > 80) {
      navbar.style.top = '12px';
    } else {
      navbar.style.top = '20px';
    }
  }
}

/* ── Magnetic Buttons ── */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      if (gsapReady) {
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: 'power2.out' });
      }
    });
    btn.addEventListener('mouseleave', () => {
      if (gsapReady) gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* ── GSAP Animations ── */
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Hero animations
  animateHero();

  // Scroll-triggered reveals
  initScrollTriggers();

  // Mouse parallax
  initMouseParallax();
}

function animateHero() {
  const tl = gsap.timeline({ delay: 0.2 });

  const heroBadge = document.querySelector('.hero-badge');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  const heroStats = document.querySelector('.hero-stats');
  const heroScroll = document.querySelector('.hero-scroll');
  const heroBg = document.querySelector('.hero-bg-img');

  if (heroBg) {
    gsap.fromTo(heroBg,
      { scale: 1.1, filter: 'brightness(0.5)' },
      { scale: 1.04, filter: 'brightness(1)', duration: 2, ease: 'power2.out' }
    );
  }

  if (heroBadge) tl.fromTo(heroBadge, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
  if (heroTitle) tl.fromTo(heroTitle, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.4');
  if (heroSubtitle) tl.fromTo(heroSubtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5');
  if (heroCta) tl.fromTo(heroCta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4');
  if (heroStats) tl.fromTo(heroStats, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  if (heroScroll) tl.fromTo(heroScroll, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
}

function initScrollTriggers() {
  // Generic reveal
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el,
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  gsap.utils.toArray('.reveal-scale').forEach((el, i) => {
    gsap.fromTo(el,
      { scale: 0.88, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out',
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  });

  // Menu cards stagger
  const menuGrid = document.getElementById('menu-grid');
  if (menuGrid) {
    gsap.fromTo(menuGrid.querySelectorAll('.menu-card'),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: menuGrid, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  }

  // Why cards stagger
  const whyGrid = document.querySelector('.why-grid');
  if (whyGrid) {
    gsap.fromTo(whyGrid.querySelectorAll('.why-card'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: whyGrid, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  }

  // Testimonial cards
  gsap.fromTo('.testimonial-card',
    { y: 40, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.testimonials-track', start: 'top 88%', toggleActions: 'play none none none' }
    }
  );

  // Contact items
  gsap.fromTo('.contact-item',
    { x: -30, opacity: 0 },
    {
      x: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-items', start: 'top 88%', toggleActions: 'play none none none' }
    }
  );

  // Hero parallax on scroll
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }

  // Reservation parallax
  const resBg = document.querySelector('.reservation-bg img');
  if (resBg) {
    gsap.to(resBg, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: '#reservation',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
}

function reinitScrollTriggers() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.utils.toArray('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      gsap.set(el, { clearProps: 'all' });
    });
  }
  setTimeout(() => {
    initScrollTriggers();
    animateHero();
    initMagnetic();
  }, 150);
}

/* ── Mouse Parallax on Hero ── */
function initMouseParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xRatio = (clientX / innerWidth - 0.5) * 2;
    const yRatio = (clientY / innerHeight - 0.5) * 2;

    const rays = document.querySelector('.hero-rays');
    const smoke = document.querySelector('.hero-smoke');
    if (rays) gsap.to(rays, { x: xRatio * 20, y: yRatio * 10, duration: 1.2, ease: 'power2.out' });
    if (smoke) gsap.to(smoke, { x: xRatio * -10, duration: 1.5, ease: 'power2.out' });
  });
}

/* ── Smooth Scroll for anchors ── */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  e.preventDefault();
  const id = anchor.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
});

/* ── Keyboard accessibility ── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});
