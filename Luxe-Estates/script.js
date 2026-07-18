
/* -----------------------------------------------
   PROPERTY DATA
----------------------------------------------- */
const PROPERTIES = [
  {
    title: 'Elmwood Grand Manor',
    price: '$4,850,000',
    location: 'Beverly Hills, CA',
    badge: 'Luxury',
    badgeClass: 'badge-luxury',
    beds: 6, baths: 7, sqft: '8,400',
    desc: 'An extraordinary estate set behind private gates in the coveted Beverly Hills flats. This magnificent 8,400 sq ft residence offers the pinnacle of California luxury living — soaring ceilings, floor-to-ceiling Venetian plaster walls, and a curated collection of imported marble throughout. The chef\'s kitchen opens to a resort-style entertainer\'s backyard with an infinity pool, spa, and outdoor kitchen.',
    images: [
      'https://images.pexels.com/photos/8143683/pexels-photo-8143683.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/8082322/pexels-photo-8082322.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/8135492/pexels-photo-8135492.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    amenities: ['Infinity Pool','Home Theater','Wine Cellar','Smart Home','6-Car Garage','Gym & Spa','Guest House','Private Garden','Chef\'s Kitchen','Security System'],
  },
  {
    title: 'Sunset Infinity Villa',
    price: '$2,975,000',
    location: 'Malibu, CA',
    badge: 'For Sale',
    badgeClass: 'badge-sale',
    beds: 5, baths: 5, sqft: '5,800',
    desc: 'Perched above the Pacific with breathtaking ocean views from every room, this architectural masterpiece redefines coastal luxury. The open-plan living spaces flow seamlessly to the infinity pool terrace, while retractable glass walls blur the boundary between indoors and the stunning Malibu horizon. An entertainer\'s dream with a dedicated bar, media room, and private beach access.',
    images: [
      'https://images.pexels.com/photos/8134745/pexels-photo-8134745.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/27626186/pexels-photo-27626186.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    amenities: ['Ocean Views','Private Pool','Beach Access','Home Bar','Media Room','Smart Lighting','Heated Floors','3-Car Garage','Outdoor Kitchen','Fire Pit'],
  },
  {
    title: 'Skyline Penthouse Suite',
    price: '$18,500 / mo',
    location: 'Manhattan, NY',
    badge: 'For Rent',
    badgeClass: 'badge-rent',
    beds: 4, baths: 4, sqft: '3,200',
    desc: 'Crowning the 54th floor of one of Manhattan\'s most coveted luxury towers, this full-floor penthouse offers a 360-degree panorama of Central Park and the Manhattan skyline. With soaring 14-ft ceilings, art gallery walls, and a private wraparound terrace, it is the ultimate urban sanctuary. White-glove building services, concierge, and valet parking included.',
    images: [
      'https://images.pexels.com/photos/7167073/pexels-photo-7167073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/7173666/pexels-photo-7173666.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    amenities: ['Panoramic Views','Private Terrace','Concierge','Valet Parking','Gym Access','Spa Access','14-ft Ceilings','Smart Home','Art Gallery Walls','Storage Unit'],
  },
  {
    title: 'Meadow Ridge Estate',
    price: '$1,480,000',
    location: 'Scottsdale, AZ',
    badge: 'New',
    badgeClass: 'badge-new',
    beds: 4, baths: 3, sqft: '4,100',
    desc: 'Brand new construction by award-winning architect Hayes Dunmore, this stunning desert contemporary sits on 1.2 acres of pristine Sonoran landscape. Floor-to-ceiling glass brings the desert indoors with mountain views from every angle. The chef\'s kitchen features Miele appliances and a butler\'s pantry, while the resort-style backyard is fully landscaped with a heated pool and private spa.',
    images: [
      'https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/8143677/pexels-photo-8143677.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/7045711/pexels-photo-7045711.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    amenities: ['Mountain Views','Heated Pool','Private Spa','3-Car Garage','Smart Home','Solar System','Chef\'s Kitchen','Desert Landscaping','Home Office','EV Charger'],
  },
  {
    title: 'Infinity Cliffside Retreat',
    price: '$7,250,000',
    location: 'Santorini, Greece',
    badge: 'Luxury',
    badgeClass: 'badge-luxury',
    beds: 7, baths: 8, sqft: '11,000',
    desc: 'Carved into the iconic caldera cliffs of Santorini, this extraordinary estate commands unparalleled sunset views over the Aegean. Seven elegantly appointed suites open to private terraces with plunge pools, while the main infinity pool appears to flow directly into the shimmering sea. A masterwork of whitewashed Cycladic architecture meeting contemporary luxury — utterly one of a kind.',
    images: [
      'https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/27626186/pexels-photo-27626186.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/18971223/pexels-photo-18971223.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    amenities: ['Caldera Views','Infinity Pool','7 Plunge Pools','Private Helipad','Yacht Dock','Chef & Butler','Spa Suite','Wine Cave','Private Cinema','Concierge 24/7'],
  },
  {
    title: 'Downtown Luxury Loft',
    price: '$12,000 / mo',
    location: 'Chicago, IL',
    badge: 'For Rent',
    badgeClass: 'badge-rent',
    beds: 3, baths: 2, sqft: '2,600',
    desc: 'A landmark conversion of Chicago\'s historic Merchant\'s Row Building, this extraordinary loft blends 1920s industrial heritage with the finest contemporary design. Original exposed brick, 16-ft timber-beamed ceilings, and cast-iron columns meet Calacatta marble kitchen, Waterworks bathrooms, and a private rooftop terrace overlooking the glittering Chicago skyline.',
    images: [
      'https://images.pexels.com/photos/8082227/pexels-photo-8082227.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/7546323/pexels-photo-7546323.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
      'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
    ],
    amenities: ['Rooftop Terrace','City Views','Exposed Brick','16-ft Ceilings','Concierge','Gym Access','Bike Storage','2 Parking Spots','Pet Friendly','Storage Locker'],
  },
];

/* -----------------------------------------------
   MODAL LOGIC
----------------------------------------------- */
let currentGalleryIdx = 0;
let currentModalProp = null;

function openModal(idx) {
  const p = PROPERTIES[idx];
  currentModalProp = p;
  currentGalleryIdx = 0;

  document.getElementById('modalImg').src = p.images[0];
  document.getElementById('modalImg').alt = p.title;
  document.getElementById('modalPrice').textContent = p.price;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalLocText').textContent = p.location;

  const badge = document.getElementById('modalBadge');
  badge.textContent = p.badge;
  badge.className = 'prop-badge ' + p.badgeClass;

  // Specs
  document.getElementById('modalSpecs').innerHTML = `
    <div class="modal-spec">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18v-8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8z"/><path d="M3 14V9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5"/><line x1="8" y1="8" x2="8" y2="4"/><line x1="16" y1="8" x2="16" y2="4"/></svg>
      <strong>${p.beds}</strong>&nbsp;Bedrooms
    </div>
    <div class="modal-spec">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 2-2h3v2.25"/><line x1="4" y1="20" x2="4" y2="22"/><line x1="20" y1="20" x2="20" y2="22"/></svg>
      <strong>${p.baths}</strong>&nbsp;Bathrooms
    </div>
    <div class="modal-spec">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      <strong>${p.sqft}</strong>&nbsp;sq ft
    </div>
  `;

  // Description
  document.getElementById('modalDesc').textContent = p.desc;

  // Amenities
  const amenitySVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  document.getElementById('modalAmenities').innerHTML = p.amenities.map(a =>
    `<div class="amenity-item">${amenitySVG}${a}</div>`
  ).join('');

  // Gallery dots
  const dots = document.getElementById('gallDots');
  dots.innerHTML = p.images.map((_, i) =>
    `<span class="modal-dot ${i === 0 ? 'active' : ''}" onclick="setGalleryImg(${i})"></span>`
  ).join('');

  document.getElementById('propModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('propModal').classList.remove('open');
  document.body.style.overflow = '';
}

function setGalleryImg(idx) {
  if (!currentModalProp) return;
  currentGalleryIdx = idx;
  document.getElementById('modalImg').src = currentModalProp.images[idx];
  document.querySelectorAll('.modal-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('propModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.getElementById('gallPrev').addEventListener('click', function() {
  if (!currentModalProp) return;
  const len = currentModalProp.images.length;
  setGalleryImg((currentGalleryIdx - 1 + len) % len);
});
document.getElementById('gallNext').addEventListener('click', function() {
  if (!currentModalProp) return;
  setGalleryImg((currentGalleryIdx + 1) % currentModalProp.images.length);
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});


/* -----------------------------------------------
   NAVBAR SCROLL BEHAVIOR + ACTIVE LINKS
----------------------------------------------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], footer[id]');

window.addEventListener('scroll', function() {
  // Scrolled state
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Scroll-to-top button
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);

  // Active link highlighting
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* -----------------------------------------------
   SIDE-DRAWER MOBILE MENU
----------------------------------------------- */
const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobileMenu');
const mobileClose   = document.getElementById('mobileClose');
const drawerOverlay = document.getElementById('drawerOverlay');
const mobileLinks   = document.querySelectorAll('.mobile-link');

function openMenu() {
  // Show the backdrop first (needs display:flex to be animatable)
  drawerOverlay.style.display = 'block';
  // Force reflow so the transition fires
  drawerOverlay.getBoundingClientRect();
  drawerOverlay.classList.add('open');

  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  drawerOverlay.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');

  // Hide backdrop after slide-out transition finishes
  drawerOverlay.addEventListener('transitionend', function hide() {
    drawerOverlay.style.display = 'none';
    drawerOverlay.removeEventListener('transitionend', hide);
  });

  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
drawerOverlay.addEventListener('click', closeMenu);

// Close drawer when any nav link is clicked
mobileLinks.forEach(link => {
  // Skip the CTA button (it has its own onclick)
  if (link.tagName === 'A') {
    link.addEventListener('click', closeMenu);
  }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});


/* -----------------------------------------------
   FILTER BUTTONS
----------------------------------------------- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.prop-card').forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});


/* -----------------------------------------------
   FAVOURITE TOGGLE
----------------------------------------------- */
function toggleFav(btn) {
  btn.classList.toggle('active');
  const svg = btn.querySelector('svg');
  if (btn.classList.contains('active')) {
    svg.setAttribute('fill', '#e74c3c');
    svg.setAttribute('stroke', '#e74c3c');
  } else {
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
  }
}


/* -----------------------------------------------
   SCROLL-REVEAL (Intersection Observer)
----------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});


/* -----------------------------------------------
   ANIMATED COUNTERS
----------------------------------------------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.querySelector('.stat-suffix')?.textContent || '';
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.innerHTML = Math.floor(current).toLocaleString() + `<span class="stat-suffix">${suffix}</span>`;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));


/* -----------------------------------------------
   TESTIMONIALS SLIDER
----------------------------------------------- */
const track = document.getElementById('testiTrack');
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('testiDots');
let currentSlide = 0;
let autoPlay;

function initTestiDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(idx) {
  currentSlide = (idx + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.getElementById('testiPrev').addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });
document.getElementById('testiNext').addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });

function resetAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(() => goToSlide(currentSlide + 1), 6000);
}

initTestiDots();
resetAutoPlay();


/* -----------------------------------------------
   NEWSLETTER PARTICLES ANIMATION
----------------------------------------------- */
function createParticles() {
  const container = document.getElementById('nlParticles');
  if (!container) return;
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.classList.add('nl-particle');
    const size = Math.random() * 80 + 20;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      bottom:-${size}px;
      animation-duration:${Math.random()*8+6}s;
      animation-delay:${Math.random()*6}s;
    `;
    container.appendChild(p);
  }
}
createParticles();


/* -----------------------------------------------
   NEWSLETTER FORM
----------------------------------------------- */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.newsletter-btn');
  const originalText = btn.textContent;
  btn.textContent = '✓ Subscribed!';
  btn.style.background = 'linear-gradient(135deg,#2ecc71,#27ae60)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3500);
}


/* -----------------------------------------------
   SMOOTH LINK SCROLLING
----------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

