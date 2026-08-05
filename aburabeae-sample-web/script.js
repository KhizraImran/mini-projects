/* Abu Rabie Egyptian Restaurant — Farwaniya, Kuwait */

const exteriorImg = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLt8Y9mljn9vQPdkTDirEwrX5blMSRykhzFMkWimGxr1HMCU3k1uG3lXTM2FsZvoQhXKrvAZgiYCaXuUbioMWTU1JxlXxLymfWWUynAg4qJ1ql0Vnrf319h0xC1LyIZYpDF6QDMp1EhhNzV5p9RQ7LSbsN-dkle7UBnahK9nhcCke3eu3PMxhbMM2tvA/s16000-rw/%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9%20%D8%A7%D9%84%D9%81%D8%B1%D9%88%D8%A7%D9%86%D9%8A%D8%A9.jpg';

const menuImgs = [
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1T0R5-NupTe-lr9axDIdi_OEIw2FgTlpEvGk4q4bTAWBGx5yDfA9DADGUy7IAr9xTd1UCoNsA-m1GjMpt2EN7bSGIMRpFf8-myeqe1lLcuKDfWKnLnXTiI8eUEtG-Q8voN7TBtponvNRxLkduW73YJ2Lpqi47oUXDqo1gxE-HpSGJRtdEIOngQfUb7g/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-1.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKd3KiRnhgEDZlmwKYqsqMJA7Mdj3Qpe4gr7OJDAwTEvD1xnoSLAdrp2xn6Xu-0iahNTWIYb1I6Ys12Xewf2w31iLFN3UyXMX9JlV3W5aUS8QJT68ZMN0JNKjzgwAna7syakRkYk7s8hkJv7vG-eq-M--NYpqb1I6yHdhTiWbq-B2bsR3hNeVS_WM0Xw/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-2.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk0bCb-SbyhsB0vcu6xAYxQ0HwnkLAobiNDVY-MiGs3wvCUSbyFi-RnE23AOM1YCvKMdYKsG_7Jcg5vRo1LLOznXsiCU8oCwBT5bB2gi9zHnftiKeaHl2iLnmw38Khsbso_EnDALEUDEMBsTjKEUs4YueU7VT_2V42lA8Ti5Wi7hrtcEdxJVDtmXQtIQ/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-3.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZZTEzaKiNWJlfKcpfaaC-Ra3M3r-BSEt6OFpqfFFzlAMq8aJ-pwGoYT4DKhjAWT8gb1FydeEu0cYzBAHolXjhqhZ9aa8joBqAHMCZEo2jayRxLmxsr7yzStvZ_E6YlJNAuio2y_uUqEjBE-yr-lUwoDHHcUxorSyDB_N66PFJ0938uIxmERR9BqTj2Q/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-4.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpObcRDhGK5wCupdjqbrmwpXtRVUx2xb0jdK0yuU9U0d_yHExE1Ee-Vfcp4h2QllBN61zUgXfYJU-T278ypJVVpYkYkQjqtRQvzLiJpHMXVwdtAkFKRqdxxha1Lg2624_r2dCWQUPGhR7tTkqlWPog1z-MO4PNSF5vQY-6wct8gDYD4exysbuHZzMMNw/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-5.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjylmq9GaGP5sD32O4El1wacSBVbnzpT_1Vdn1izr7KkVcaKi-HiFaf9E2kW1ygr-pvNRY811VRXw528TQkThJt4mu-Tp5bEwY7KvCohJR0QeG5YYJP58Amtycj7n-Aa2hQI3MSVnzv9M2H7rWep-EPF-NJQLMIs11v0aGBYlCLHDUH6OXyQ_f1uCBJzQ/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-6.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpQBX7smhDijHCH7xKb_VlBQbnkTWpAL2UgLT2cUcW4mT9mWhXvxO8U0316eDvoWYHsotgD7hy2zZpeqeU1TrAYUWUJxUYWw2S_f8HjRGJzSquw4P5wiC-MoFdlcxb-cn9-194QWwew0jddHRnPX8Q9x0xZWCHGnyK-OrAKIBADdUaSMzdMwp45T7P9g/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-7.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRaZJBbKGyqXDf0MsQZthF3Bj_dI4X1vPc70hqAmupghpymNzFXRgrjOCbARge3uX0WS33tFnMqfr0YIiHu5Np5S7D8A7qA9QMGWKqDF5PApjHrHvE64SLvfsM7t3E70d3RE4HcoFVk7rCTf7XhPrmPV_jBnW5i-I8IuMNWdGKgmxoExqVJ-z3oqf7Aw/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-8.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi8vvvNN47Y0tyPKUk6Gh9WxMfmr2S534ZY7Kb2YI12XoVI4SZupEB4Xg1ShAPU-JzgNC8UmWgSLrolBdDJfevSpqJjildSHiUq6pC9KmDiOQ01N-TjxkloUDVieNOs5cKN7RbXLUUs5TKjUjDVHBeHAUkouZUvoBDxwX44nUnRemK5vH0dlseCr-7-Rg/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-9.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhluODHEom_UeylcCPUZ4z1shfNo-5gVaXY1dNrjV4WDuixWC9MHRTsnFF7FYEv14EHyQx5YEZHbn3AeoHSffjgBGkl6Yh8pEdBJ4bdE-BaeA4UTdgsuNZAtYYycwcEu08yHc87hmdFZesE8XiCyw2uJbfwErmTaU9QQ7lkaTQ137XVYgZK7Klylsiwog/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-10.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUfAkJslGUYyG2cy5_QbL0cBejqH77rWqFT5SWTwGAHcsds7nr-Jr6_UTAAJ95Uoj4p2dVdseWNkrUtpQcM0S3ZPGQOR4Jd6xSX5LztP2bgjwCgtLV7p--r0-zjYSSVOv-Z3Hg04vkHcMPx9mIQOE8XoEAZ3bQ86ryywKg5Xs1OdPetC644DlJkLmZxQ/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-11.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFco1Bjkhq0DMOyFghrv1Dp5pRBo43vncTVgh-7dJpsafMK8O7IqePjXGEp18x6JhUyTxznmVX7Sgi1lqoyQ6ZI5gQEvQAKTc8XKLTJmUeblPy-PnyD536sXKD9GhL3BYsWPyP3e5yy8gaDJjECTjJ6-jro4kKAN-nGygqXsShHE3lZ8S7Xx5nr-xPZA/s16000-rw/%D9%85%D9%86%D9%8A%D9%88%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D8%A8%D9%88%20%D8%B1%D8%A8%D9%8A%D8%B9-12.jpg'
];

const categories = {
  breakfast: { en: 'Breakfast', ar: 'إفطار' },
  mains: { en: 'Main Dishes', ar: 'أطباق رئيسية' },
  grills: { en: 'Grills', ar: 'مشاوي' },
  shawarma: { en: 'Shawarma', ar: 'شاورما' },
  desserts: { en: 'Desserts', ar: 'حلويات' }
};

const signatures = [
  {
    id: 'sig-falafel',
    cat: 'breakfast',
    en: { name: 'Falafel Maon', desc: 'Crispy fava-bean falafel served with salad, tahini and warm bread.' },
    ar: { name: 'فول وتعمية معون', desc: 'طعمية فول مقرمشة مع سلطة وطحينة وخبز دافئ.' },
    price: 'KD 0.700',
    img: menuImgs[6]
  },
  {
    id: 'sig-shakshouka',
    cat: 'breakfast',
    en: { name: 'Shakshouka', desc: 'Eggs poached in a simmering tomato and pepper sauce.' },
    ar: { name: 'شكشوكة', desc: 'بيض مطبوخ في صلصة طماطم وفلفل سائنة.' },
    price: 'KD 1.250',
    img: menuImgs[7]
  },
  {
    id: 'sig-sausage',
    cat: 'breakfast',
    en: { name: 'Sausage in Tomato Sauce', desc: 'Alexandrian-style beef sausage cooked in spiced tomato sauce.' },
    ar: { name: 'سجق بصلصة الطماطم', desc: 'سجق بقري على الطريقة الإسكندرانية في صلصة طماطم متبلة.' },
    price: 'KD 1.900',
    img: menuImgs[8]
  },
  {
    id: 'sig-pigeon',
    cat: 'mains',
    en: { name: 'Stuffed Pigeon', desc: 'Whole pigeon stuffed with spiced freekeh rice, slow-roasted until tender.' },
    ar: { name: 'حمام محشي', desc: 'حمام كامل محشي بالفريك المتبل، مشوي حتى يصبح طرياً.' },
    price: 'KD 4.500',
    img: menuImgs[4]
  },
  {
    id: 'sig-molokhia',
    cat: 'mains',
    en: { name: 'Molokhia Beef Tajen', desc: 'Jute leaf stew perfumed with garlic and coriander, served with beef.' },
    ar: { name: 'ملوخية بلحمة بالطاجن', desc: 'ملوخية معطرة بالثوم والكزبرة تُقدم مع لحمة في طاجن.' },
    price: 'KD 3.500',
    img: menuImgs[3]
  },
  {
    id: 'sig-mahshi',
    cat: 'mains',
    en: { name: 'Stuffed Mix Dish', desc: 'A generous plate of vine leaves, cabbage and stuffed vegetables.' },
    ar: { name: 'طبق محشي مشكل', desc: 'طبق سخي من ورق العنب والملفوف والخضروات المحشية.' },
    price: 'KD 2.050',
    img: menuImgs[5]
  },
  {
    id: 'sig-kebab',
    cat: 'grills',
    en: { name: 'Kebab Meal', desc: 'Charcoal-grilled minced lamb kebabs with rice, bread and tahini.' },
    ar: { name: 'وجبة كباب', desc: 'كباب لحم مفروم مشوي على الفحم مع أرز وخبز وطحينة.' },
    price: 'KD 2.000',
    img: menuImgs[2]
  },
  {
    id: 'sig-tawook',
    cat: 'grills',
    en: { name: 'Shish Tawook Meal', desc: 'Marinated chicken skewers grilled over charcoal with garlic sauce.' },
    ar: { name: 'وجبة شيش طاووق', desc: 'سيخ دجاج متبل مشوي على الفحم مع ثومية.' },
    price: 'KD 2.750',
    img: menuImgs[1]
  },
  {
    id: 'sig-mixgrill',
    cat: 'grills',
    en: { name: 'Mix Tawook & Kebab', desc: 'The best of both grills on one plate.' },
    ar: { name: 'مشكل طاووق وكباب', desc: 'أفضل ما في المشويات في طبق واحد.' },
    price: 'KD 2.800',
    img: menuImgs[0]
  },
  {
    id: 'sig-shawarma-chicken',
    cat: 'shawarma',
    en: { name: 'Chicken Shawarma Fatteh', desc: 'Shawarma chicken over crispy bread, yogurt and pine nuts.' },
    ar: { name: 'فتة شاورما دجاج', desc: 'شاورما دجاج على خبز مقرمش وزبادي وصنوبر.' },
    price: 'KD 2.250',
    img: menuImgs[10]
  },
  {
    id: 'sig-shawarma-meat',
    cat: 'shawarma',
    en: { name: 'Meat Shawarma Fatteh', desc: 'Thin-sliced meat shawarma layered over fatteh with tahini.' },
    ar: { name: 'فتة شاورما لحمة', desc: 'شاورما لحمة مقطعة رفيعة فوق فتة بالطحينة.' },
    price: 'KD 2.250',
    img: menuImgs[11]
  },
  {
    id: 'sig-sweets',
    cat: 'desserts',
    en: { name: 'Egyptian Sweets', desc: 'Kunafa, Om Ali and basbousa. Ask the branch for today\'s selection.' },
    ar: { name: 'حلويات مصرية', desc: 'كنافة وأم علي وبسبوسة. اسأل الفرع عن اختيارات اليوم.' },
    price: '',
    img: menuImgs[9]
  }
];

const menuCategories = [
  {
    key: 'breakfast',
    en: 'Oriental Breakfast',
    ar: 'إفطار شرقي',
    items: [
      { en: 'Falafel Maon', ar: 'فول وتعمية معون', price: 'KD 0.700' },
      { en: 'Meshakel', ar: 'مشكل', price: 'KD 1.000' },
      { en: 'Boiled Egg Platter', ar: 'طبق بيض مسلوق', price: 'KD 1.250' },
      { en: 'Shakshouka', ar: 'شكشوكة', price: 'KD 1.250' },
      { en: 'Fried Eggs Maon', ar: 'بيض مقلي معون', price: 'KD 1.000' },
      { en: 'Eggs with Pastrami Maon', ar: 'بيض مع بسطرمة معون', price: 'KD 1.250' },
      { en: 'Egga Platter (2 pcs)', ar: 'طبق عجة (٢ قطعة)', price: 'KD 1.250' },
      { en: 'Sausage in Tomato Sauce Maon', ar: 'سجق بصلصة الطماطم معون', price: 'KD 1.900' },
      { en: 'Raomi Cheese Maon', ar: 'جبنة رومي معون', price: 'KD 1.250' },
      { en: 'Old Cheese Maon', ar: 'جبنة قديمة معون', price: 'KD 1.000' },
      { en: 'White Cheese Maon', ar: 'جبنة بيضاء معون', price: 'KD 1.000' },
      { en: 'Muttabal Maon', ar: 'متبل معون', price: 'KD 1.000' },
      { en: 'Mesakaa Maon', ar: 'مسقعة معون', price: 'KD 1.150' },
      { en: 'Hummus Maon', ar: 'حمص معون', price: 'KD 1.000' }
    ]
  },
  {
    key: 'mains',
    en: 'Traditional Mains',
    ar: 'أطباق تقليدية',
    items: [
      { en: 'Stuffed Vine Leaves', ar: 'ورق عنب', price: 'KD 1.500' },
      { en: 'Roasted Meat Meal with Butter', ar: 'وجبة لحم مشوي بالزبدة', price: 'KD 4.200' },
      { en: 'Stuffed Mix Dish', ar: 'طبق محشي مشكل', price: 'KD 2.050' },
      { en: 'Fried Mutton Meat Meal', ar: 'وجبة لحم مقلي', price: 'KD 4.850' },
      { en: 'Stuffed Cabbage Leaves Plate', ar: 'طبق ملفوف محشي', price: 'KD 1.450' },
      { en: 'Mutton Okra Tajen', ar: 'بامية بلحمة بالطاجن', price: 'KD 3.950' },
      { en: 'Stuffed Pigeon Meal (1 pc)', ar: 'وجبة حمام محشي (١ قطعة)', price: 'KD 4.500' },
      { en: 'Mutton Meat Meal Oven Cooked', ar: 'لحم بالفرن', price: 'KD 3.650' },
      { en: 'Mulukheyah Beef Tajen', ar: 'ملوخية بلحمة بالطاجن', price: 'KD 3.500' },
      { en: 'Mombar Platter', ar: 'طبق ممبار', price: 'KD 2.100' }
    ]
  },
  {
    key: 'shawarma',
    en: 'Shawarma',
    ar: 'شاورما',
    items: [
      { en: 'Chicken Shawarma Fatteh Meal', ar: 'فتة شاورما دجاج', price: 'KD 2.250' },
      { en: 'Meat Shawarma Fatteh Meal', ar: 'فتة شاورما لحمة', price: 'KD 2.250' },
      { en: 'Arabic Shawarma Meal', ar: 'وجبة شاورما عربي', price: 'KD 2.000' }
    ]
  },
  {
    key: 'grills',
    en: 'Grills & BBQ',
    ar: 'مشاوي',
    items: [
      { en: 'Arayes Meal', ar: 'وجبة عرايس', price: 'KD 1.750' },
      { en: 'Tikka Meal for 1', ar: 'وجبة تكا لشخص', price: 'KD 3.000' },
      { en: 'Mix Tawook & Kebab Meal', ar: 'وجبة مشكل طاووق وكباب', price: 'KD 2.800' },
      { en: 'Mix Tikka & Kebab Meal', ar: 'وجبة مشكل تكا وكباب', price: 'KD 3.000' },
      { en: 'Mix Tawook & Tikka Meal', ar: 'وجبة مشكل طاووق وتكا', price: 'KD 3.000' },
      { en: 'Shish Tawook Meal for 1', ar: 'وجبة شيش طاووق لشخص', price: 'KD 2.750' },
      { en: 'Kebab Meal for 1', ar: 'وجبة كباب لشخص', price: 'KD 2.000' },
      { en: 'Charcoal Grilled Half Chicken', ar: 'نصف دجاج مشوي على الفحم', price: 'KD 1.750' },
      { en: 'Grilled Tikka Sandwich', ar: 'ساندويتش تكا', price: 'KD 1.400' },
      { en: 'Shish Tawook Sandwich', ar: 'ساندويتش شيش طاووق', price: 'KD 1.250' },
      { en: 'Kebab Sandwich', ar: 'ساندويتش كباب', price: 'KD 0.900' }
    ]
  },
  {
    key: 'chicken-sandwiches',
    en: 'Chicken Sandwiches',
    ar: 'ساندويتش دجاج',
    items: [
      { en: 'Zinger Crepe', ar: 'كريب زنجر', price: 'KD 1.800' },
      { en: 'Chicken Zinger', ar: 'زنجر دجاج', price: 'KD 0.950' },
      { en: 'Chicken Crunchy', ar: 'كرنشي دجاج', price: 'KD 1.000' },
      { en: 'Grilled Sausage', ar: 'سجق مشوي', price: 'KD 0.900' }
    ]
  },
  {
    key: 'pizza',
    en: 'Pizza & Pies',
    ar: 'بيتزا وفطائر',
    items: [
      { en: 'Abu Rabie Pizza', ar: 'بيتزا أبو ربيع', price: 'KD 3.950' },
      { en: 'Abu Rabie Mixed Meat Pie', ar: 'فطيرة أبو ربيع لحمة', price: 'KD 3.950' },
      { en: 'Mix Cheese Pizza', ar: 'بيتزا جبن مشكل', price: 'KD 3.250' },
      { en: 'Margherita Pizza', ar: 'بيتزا مارغريتا', price: 'KD 2.850' }
    ]
  },
  {
    key: 'gathering',
    en: 'Gathering Platters',
    ar: 'صواني عائليّة',
    items: [
      { en: 'Shawarma Family Meal', ar: 'وجبة عائلية شاورما', price: 'KD 8.500' },
      { en: 'Family Mix Grill', ar: 'مشكل مشاوي عائلي', price: 'KD 11.000' }
    ]
  },
  {
    key: 'sides',
    en: 'Side Dishes',
    ar: 'إضافات',
    items: [
      { en: 'Green Salad', ar: 'سلطة خضراء', price: 'KD 0.750' },
      { en: 'Garlic Dip', ar: 'ثومية', price: 'KD 0.950' },
      { en: 'Tahini', ar: 'طحينة', price: 'KD 0.950' }
    ]
  }
];

const galleryItems = [
  { src: exteriorImg, cat: 'interior', alt: 'Abu Rabie Farwaniya exterior' },
  { src: menuImgs[0], cat: 'menu', alt: 'Menu page 1' },
  { src: menuImgs[1], cat: 'menu', alt: 'Menu page 2' },
  { src: menuImgs[2], cat: 'food', alt: 'Signature grills' },
  { src: menuImgs[3], cat: 'food', alt: 'Molokhia and stews' },
  { src: menuImgs[4], cat: 'food', alt: 'Stuffed pigeon' },
  { src: menuImgs[5], cat: 'food', alt: 'Mahshi platter' },
  { src: menuImgs[6], cat: 'food', alt: 'Falafel and breakfast' },
  { src: menuImgs[7], cat: 'food', alt: 'Shakshouka' },
  { src: menuImgs[8], cat: 'food', alt: 'Sausage and oriental dishes' },
  { src: menuImgs[9], cat: 'food', alt: 'Desserts and sweets' },
  { src: menuImgs[10], cat: 'menu', alt: 'Menu page 10' },
  { src: menuImgs[11], cat: 'menu', alt: 'Menu page 11' }
];

const reviews = [
  {
    rating: 5,
    en: 'Very clean and well-organised restaurant, respectful staff. I recommend it.',
    ar: 'مطعم نظيف ومنظم جداً، الموظفون محترمون. أنصح به.',
    author: 'Ahmed',
    source: 'Google Maps'
  },
  {
    rating: 5,
    en: 'Loved the food and the price was right. The orzo soup warmed us, the tahini was excellent with bread, and the kebab, ribs and koshari with sausage were delicious.',
    ar: 'أحببت الطعام والسعر كان مناسباً. شوربة لسان العصفور دفّتنا، والطحينة كانت ممتازة مع الخبز، والكباب والريش والكشري بالسجق كانوا لذيذين.',
    author: 'Sara',
    source: 'Google Maps'
  },
  {
    rating: 4,
    en: 'Good Egyptian food in Farwaniya. The stuffed pigeon was nice, though small, but the rice with potato gravy on the side was lovely.',
    ar: 'أكل مصري جيد في الفروانية. الحمام المحشي كان لطيفاً لكنه صغير، لكن خليط الأرز مع مرقة البطاطس على الجانب كان رائعاً.',
    author: 'Omar',
    source: 'Google Maps'
  },
  {
    rating: 5,
    en: 'Clean place, great prices and excellent service. I will visit again.',
    ar: 'مكان نظيف، أسعار رائعة وخدمة ممتازة. سأزوره مرة أخرى.',
    author: 'Laila',
    source: 'Google Maps'
  }
];

let currentLang = 'en';
let currentTheme = 'light';
let activeMenuTab = menuCategories[0].key;
let activeSignatureFilter = 'all';
let activeGalleryFilter = 'all';

/* DOM helpers */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function getText(item) {
  return item[currentLang] || item.en || '';
}

function renderSignature(filter = 'all') {
  const grid = $('#signatureGrid');
  if (!grid) return;
  const items = filter === 'all' ? signatures : signatures.filter(s => s.cat === filter);
  grid.innerHTML = items.map(item => {
    const cat = categories[item.cat];
    const price = item.price ? `<span class="dish-price">${item.price}</span>` : '';
    return `
      <article class="dish-card" data-cat="${item.cat}">
        <div class="dish-card-inner">
          <div class="dish-image">
            <img src="${item.img}" alt="${item.en.name}" loading="lazy" />
            <div class="dish-pedestal" aria-hidden="true"></div>
          </div>
          <div class="dish-body">
            <h3 class="dish-title">${currentLang === 'ar' ? item.ar.name : item.en.name}</h3>
            <p class="dish-desc">${currentLang === 'ar' ? item.ar.desc : item.en.desc}</p>
            <div class="dish-footer">
              ${price}
              <span class="dish-cat">${currentLang === 'ar' ? cat.ar : cat.en}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
  setupTilt('.dish-card');
}

function renderMenu() {
  const tabs = $('#menuTabs');
  const panels = $('#menuPanels');
  if (!tabs || !panels) return;

  tabs.innerHTML = menuCategories.map(cat => `
    <button class="menu-tab ${cat.key === activeMenuTab ? 'active' : ''}" data-tab="${cat.key}" role="tab" aria-selected="${cat.key === activeMenuTab}">
      ${currentLang === 'ar' ? cat.ar : cat.en}
    </button>
  `).join('');

  panels.innerHTML = menuCategories.map(cat => {
    const active = cat.key === activeMenuTab ? 'active' : '';
    const itemsHtml = cat.items.map(item => `
      <div class="menu-item">
        <div>
          <span class="menu-item-name">${currentLang === 'ar' ? item.ar : item.en}</span>
        </div>
        <span class="menu-item-price">${item.price}</span>
      </div>
    `).join('');
    return `
      <div class="menu-panel ${active}" data-panel="${cat.key}">
        <div class="menu-list">${itemsHtml}</div>
      </div>
    `;
  }).join('');

  $$('.menu-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeMenuTab = btn.dataset.tab;
      renderMenu();
      const panel = $(`.menu-panel[data-panel="${activeMenuTab}"]`);
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

function renderGallery(filter = 'all') {
  const grid = $('#galleryGrid');
  if (!grid) return;
  const items = filter === 'all' ? galleryItems : galleryItems.filter(g => g.cat === filter);
  grid.innerHTML = items.map((item, i) => `
    <figure class="gallery-item" data-index="${i}" data-cat="${item.cat}">
      <img src="${item.src}" alt="${item.alt}" loading="lazy" />
    </figure>
  `).join('');

  $$('.gallery-item').forEach(fig => {
    fig.addEventListener('click', () => {
      const idx = parseInt(fig.dataset.index, 10);
      openLightbox(items[idx].src, items[idx].alt);
    });
  });
}

function renderReviews() {
  const track = $('#reviewsTrack');
  if (!track) return;
  track.innerHTML = reviews.map(r => {
    const text = currentLang === 'ar' ? r.ar : r.en;
    const stars = Array(r.rating).fill('<svg aria-hidden="true"><use href="#icon-star"/></svg>').join('');
    return `
      <article class="review-card">
        <div class="review-stars">${stars}</div>
        <p class="review-text">${text}</p>
        <p class="review-author">${r.author} — ${r.source}</p>
      </article>
    `;
  }).join('');
}

/* Language */
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('aburabie-lang', lang);

  const label = $('#langLabel');
  if (label) label.textContent = lang === 'ar' ? 'English' : 'العربية';

  renderSignature(activeSignatureFilter);
  renderMenu();
  renderGallery(activeGalleryFilter);
  renderReviews();

  if (window.gsap) {
    gsap.fromTo('main', { opacity: 0.85 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
  }
}

/* Theme */
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('aburabie-theme', theme);
}

function toggleTheme() {
  const next = currentTheme === 'light' ? 'dark' : 'light';
  if (window.gsap) {
    gsap.to('body', { opacity: 0.85, duration: 0.15, yoyo: true, repeat: 1, onComplete: () => setTheme(next) });
  } else {
    setTheme(next);
  }
}

/* 3D tilt */
function setupTilt(selector) {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cards = $$(selector);
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -8;
      const ry = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* Lightbox */
function openLightbox(src, alt) {
  const box = $('#lightbox');
  const img = $('#lightboxImg');
  if (!box || !img) return;
  img.src = src;
  img.alt = alt;
  box.classList.add('open');
  box.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const box = $('#lightbox');
  if (!box) return;
  box.classList.remove('open');
  box.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Mobile nav */
function toggleMobileNav(force) {
  const toggle = $('#menuToggle');
  const nav = $('#mobileNav');
  if (!toggle || !nav) return;
  const open = typeof force === 'boolean' ? force : !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  nav.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}

/* Form */
function setupForm() {
  const form = $('#contactForm');
  const status = $('#formStatus');
  if (!form || !status) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const guests = data.get('guests');
    const datetime = data.get('datetime')?.toString().trim();

    if (!name || !phone || !guests || !datetime) {
      status.className = 'form-status error';
      status.textContent = currentLang === 'ar'
        ? 'يرجى ملء جميع الحقول المطلوبة.'
        : 'Please fill in all required fields.';
      return;
    }

    status.className = 'form-status success';
    status.textContent = currentLang === 'ar'
      ? 'تم استلام طلب الحجز. سنتواصل معك قريباً.'
      : 'Reservation request received. We will contact you soon.';
    form.reset();
  });
}

/* GSAP animations */
function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Header on scroll
  const header = $('.header-scroll');
  if (header) {
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.progress > 0) header.classList.add('is-scrolled');
        else header.classList.remove('is-scrolled');
      }
    });
  }

  // Hero parallax
  gsap.to('.hero-bg img', {
    yPercent: 8,
    scale: 1.1,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // Section reveals
  const reveal = (selector, options = {}) => {
    const els = $$(selector);
    if (!els.length) return;
    gsap.fromTo(els,
      { opacity: 0, y: options.y || 40 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: 'power3.out',
        stagger: options.stagger || 0.12,
        scrollTrigger: {
          trigger: els[0].closest('section') || els[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  };

  reveal('.about-grid > *', { y: 60 });
  reveal('.dish-card', { y: 50, stagger: 0.1 });
  reveal('.heritage-card', { y: 50, stagger: 0.12 });
  reveal('.gallery-item', { y: 40, stagger: 0.08 });
  reveal('.review-card', { y: 30, stagger: 0.12 });
  reveal('.info-card', { y: 40, stagger: 0.12 });
  reveal('.contact-grid > *', { y: 50 });

  // Rotate jar lids
  gsap.utils.toArray('.jar-lid').forEach(lid => {
    gsap.to(lid, {
      rotateZ: 360,
      duration: 18,
      repeat: -1,
      ease: 'none',
      scrollTrigger: { trigger: lid, start: 'top bottom', toggleActions: 'play pause resume pause' }
    });
  });

  // Nile wave path morphing simplified
  const wavePath = $('.wave-path');
  if (wavePath) {
    gsap.to(wavePath, {
      attr: { d: 'M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z' },
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

/* Initialization */
function init() {
  // Restore preferences
  const savedLang = localStorage.getItem('aburabie-lang');
  const savedTheme = localStorage.getItem('aburabie-theme');
  const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
  currentLang = savedLang || browserLang;
  currentTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(currentTheme);
  setLanguage(currentLang);

  // Preloader
  const preloader = $('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        if (window.gsap) {
          gsap.fromTo('.hero-content > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' });
          gsap.fromTo('.hero-bg img', { scale: 1.15, opacity: 0 }, { scale: 1.05, opacity: 1, duration: 1.4, ease: 'power2.out' });
        }
      }, 900);
    });
  }

  // Toggles
  $('#themeToggle')?.addEventListener('click', toggleTheme);
  $('#langToggle')?.addEventListener('click', () => setLanguage(currentLang === 'ar' ? 'en' : 'ar'));

  // Mobile nav
  $('#menuToggle')?.addEventListener('click', () => toggleMobileNav());
  $$('.mobile-links a').forEach(a => a.addEventListener('click', () => toggleMobileNav(false)));

  // Signature filter
  $$('.filter-tabs .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-tabs .filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeSignatureFilter = btn.dataset.filter;
      renderSignature(activeSignatureFilter);
    });
  });

  // Gallery filter
  $$('#galleryFilter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#galleryFilter .filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeGalleryFilter = btn.dataset.filter;
      renderGallery(activeGalleryFilter);
    });
  });

  // Lightbox
  $('#lightboxClose')?.addEventListener('click', closeLightbox);
  $('#lightbox')?.addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (window.gsap && window.ScrollToPlugin) {
          gsap.to(window, { duration: 0.8, scrollTo: { y: target, offsetY: 90 }, ease: 'power2.inOut' });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  setupForm();
  setupTilt('.heritage-card');

  // Init GSAP after a tick so DOM is fully painted
  requestAnimationFrame(() => {
    initGSAP();
  });
}

document.addEventListener('DOMContentLoaded', init);
