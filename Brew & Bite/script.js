    /* =============================================
       MENU DATA
    ============================================= */
    const menuItems = [
      { id: 1, cat: 'starters', name: 'Truffle Arancini', desc: 'Crispy risotto balls with black truffle, parmesan, and a tangy marinara dipping sauce.', price: 12.99, badge: "Chef's Pick", img: 'https://images.pexels.com/photos/8738025/pexels-photo-8738025.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 2, cat: 'starters', name: 'Creamy Pumpkin Soup', desc: 'Velvety butternut squash soup with toasted pepitas and a drizzle of herb oil.', price: 9.99, badge: 'Vegan', img: 'https://images.pexels.com/photos/8743923/pexels-photo-8743923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 3, cat: 'starters', name: 'Garlic Herb Bread', desc: 'House-baked sourdough, roasted garlic butter, melted gruyère, fresh herbs.', price: 8.49, badge: 'Popular', img: 'https://images.pexels.com/photos/9951852/pexels-photo-9951852.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 4, cat: 'starters', name: 'Mezze Platter', desc: 'Artisan cheeses, charcuterie, olives, grapes, honey, and house-made crackers.', price: 18.99, badge: 'Share', img: 'https://images.pexels.com/photos/8738012/pexels-photo-8738012.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 5, cat: 'mains', name: 'Herb Grilled Salmon', desc: 'Atlantic salmon fillet, lemon-caper butter sauce, seasonal vegetables, and saffron risotto.', price: 28.99, badge: 'Signature', img: 'https://images.pexels.com/photos/7627414/pexels-photo-7627414.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 6, cat: 'mains', name: 'Spiced Chicken Supreme', desc: 'Pan-roasted free-range chicken with smoky paprika jus, roasted potatoes, and broccolini.', price: 24.99, badge: 'Best Seller', img: 'https://images.pexels.com/photos/15597768/pexels-photo-15597768.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 7, cat: 'mains', name: 'Seared Sea Bass', desc: 'Crispy-skinned sea bass on a saffron-infused fennel and tomato broth with herb gremolata.', price: 32.99, badge: 'New', img: 'https://images.pexels.com/photos/6046671/pexels-photo-6046671.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 8, cat: 'mains', name: 'Truffle Pasta', desc: 'Fresh fettuccine, black truffle cream, aged parmesan, and crispy pancetta shavings.', price: 22.99, badge: 'Vegetarian', img: 'https://images.pexels.com/photos/10966592/pexels-photo-10966592.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 9, cat: 'pizza', name: 'Margherita Classica', desc: 'San Marzano tomato, fresh buffalo mozzarella, basil, and extra virgin olive oil. Simple perfection.', price: 17.99, badge: 'Classic', img: 'https://images.pexels.com/photos/8609973/pexels-photo-8609973.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 10, cat: 'pizza', name: 'Truffle & Mushroom', desc: 'White truffle cream base, mixed wild mushrooms, fontina, fresh thyme, and balsamic drizzle.', price: 21.99, badge: 'Premium', img: 'https://images.pexels.com/photos/19709548/pexels-photo-19709548.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 11, cat: 'pizza', name: 'Spicy Calabrese', desc: 'House tomato sauce, spicy Calabrese salami, nduja, fresh chili, and smoked scamorza.', price: 19.99, badge: 'Hot 🔥', img: 'https://images.pexels.com/photos/8609973/pexels-photo-8609973.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 12, cat: 'burgers', name: 'The Signature Stack', desc: 'Double smashed 8oz wagyu patty, aged cheddar, caramelized onion jam, house sauce, brioche bun.', price: 19.99, badge: 'Best Seller', img: 'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 13, cat: 'burgers', name: 'Smoky BBQ Crunch', desc: 'Crispy fried chicken thigh, smoky BBQ glaze, coleslaw, pickles, and toasted sesame bun.', price: 16.99, badge: 'Crispy', img: 'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 14, cat: 'burgers', name: 'Garden Smash', desc: 'Smashed black bean & roasted beet patty, vegan aioli, avocado, sprouts, on multigrain bun.', price: 15.99, badge: 'Vegan', img: 'https://images.pexels.com/photos/36961392/pexels-photo-36961392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 15, cat: 'desserts', name: 'Chocolate Lava Cake', desc: 'Warm dark chocolate fondant with a molten center, vanilla bean ice cream, and gold dust.', price: 11.99, badge: 'Must Try', img: 'https://images.pexels.com/photos/15823267/pexels-photo-15823267.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 16, cat: 'desserts', name: 'Classic Tiramisu', desc: 'Lady fingers soaked in espresso, mascarpone cream, dusted with Valrhona cocoa powder.', price: 10.99, badge: 'Classic', img: 'https://images.pexels.com/photos/15823324/pexels-photo-15823324.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 17, cat: 'desserts', name: 'Café Brownie Sundae', desc: 'Warm walnut brownie, three scoops of gelato, hot fudge, candied pecans, and whipped cream.', price: 13.99, badge: 'Indulgent', img: 'https://images.pexels.com/photos/34623626/pexels-photo-34623626.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 18, cat: 'beverages', name: 'Signature Latte', desc: 'Single-origin espresso, silky oat milk, house-made vanilla syrup, and intricate latte art.', price: 6.49, badge: 'Fan Fave', img: 'https://images.pexels.com/photos/5151354/pexels-photo-5151354.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 19, cat: 'beverages', name: 'Iced Caramel Cold Brew', desc: 'Slow-steeped 18-hour cold brew, salted caramel, oat milk, house caramel drizzle, over ice.', price: 7.49, badge: 'Summer Hit', img: 'https://images.pexels.com/photos/38028988/pexels-photo-38028988.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 20, cat: 'beverages', name: 'Artisan Cappuccino', desc: 'Finely pulled double espresso with velvety microfoam, dusted with cinnamon. Perfect balance.', price: 5.99, badge: 'Classic', img: 'https://images.pexels.com/photos/28496565/pexels-photo-28496565.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
      { id: 21, cat: 'beverages', name: 'Matcha Honey Latte', desc: 'Ceremonial grade matcha, steamed almond milk, raw honey, and a dusting of ceremonial powder.', price: 6.99, badge: 'Wellness', img: 'https://images.pexels.com/photos/15801080/pexels-photo-15801080.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400' },
    ];

    /* =============================================
       CART STATE
    ============================================= */
    let cart = {};
    let activeCategory = 'all';

    /* =============================================
       RENDER MENU
    ============================================= */
    function renderMenu(category) {
      const grid = document.getElementById('menuGrid');
      const items = category === 'all' ? menuItems : menuItems.filter(i => i.cat === category);

      grid.style.opacity = '0';
      grid.style.transform = 'translateY(16px)';
      grid.style.transition = 'opacity 0.28s ease, transform 0.28s ease';

      setTimeout(() => {
        grid.innerHTML = items.map((item, idx) => `
          <div class="menu-card" id="card-${item.id}" style="transition-delay: ${idx * 0.06}s">
            <div class="menu-card-img">
              <img src="${item.img}" alt="${item.name}" loading="lazy" />
              ${item.badge ? `<div class="menu-card-badge">${item.badge}</div>` : ''}
              <button class="menu-card-fav" onclick="toggleFav(this)" aria-label="Favourite">🤍</button>
            </div>
            <div class="menu-card-body">
              <div class="menu-card-name">${item.name}</div>
              <div class="menu-card-desc">${item.desc}</div>
              <div class="menu-card-footer">
                <div class="menu-card-price">$${item.price.toFixed(2)}</div>
                <div class="cart-action" id="action-${item.id}">
                  <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                    <span class="btn-icon">+</span> Add
                  </button>
                  <div class="qty-control" id="qty-${item.id}">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
                    <span class="qty-num" id="qnum-${item.id}">1</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('');

        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';

        setTimeout(() => {
          grid.querySelectorAll('.menu-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 60);
          });
        }, 50);

        Object.keys(cart).forEach(id => {
          const qtyEl = document.getElementById(`qty-${id}`);
          const qnumEl = document.getElementById(`qnum-${id}`);
          if (qtyEl && cart[id] > 0) {
            qtyEl.classList.add('show');
            qnumEl.textContent = cart[id];
            const addBtn = document.querySelector(`#action-${id} .add-to-cart-btn`);
            if (addBtn) addBtn.style.display = 'none';
          }
        });
      }, 300);
    }

    /* =============================================
       CART FUNCTIONS
    ============================================= */
    function addToCart(itemId) {
      const item = menuItems.find(i => i.id === itemId);
      if (!item) return;
      cart[itemId] = (cart[itemId] || 0) + 1;

      const qtyEl = document.getElementById(`qty-${itemId}`);
      const qnumEl = document.getElementById(`qnum-${itemId}`);
      const addBtn = document.querySelector(`#action-${itemId} .add-to-cart-btn`);
      if (qtyEl) { qtyEl.classList.add('show'); }
      if (qnumEl) { qnumEl.textContent = cart[itemId]; }
      if (addBtn) { addBtn.style.display = 'none'; }

      updateCartUI();
      showToast(`Added <strong>${item.name}</strong> to cart!`, '🛒');
      animateCartBtn();
    }

    function changeQty(itemId, delta) {
      cart[itemId] = (cart[itemId] || 0) + delta;
      const qnumEl = document.getElementById(`qnum-${itemId}`);
      if (cart[itemId] <= 0) {
        delete cart[itemId];
        const qtyEl = document.getElementById(`qty-${itemId}`);
        const addBtn = document.querySelector(`#action-${itemId} .add-to-cart-btn`);
        if (qtyEl) qtyEl.classList.remove('show');
        if (addBtn) addBtn.style.display = '';
      } else {
        if (qnumEl) qnumEl.textContent = cart[itemId];
      }
      updateCartUI();
    }

    function removeFromCart(itemId) {
      delete cart[itemId];
      const qtyEl = document.getElementById(`qty-${itemId}`);
      const addBtn = document.querySelector(`#action-${itemId} .add-to-cart-btn`);
      if (qtyEl) qtyEl.classList.remove('show');
      if (addBtn) addBtn.style.display = '';
      updateCartUI();
    }

    function updateCartUI() {
      const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
      const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
        const item = menuItems.find(i => i.id == id);
        return sum + (item ? item.price * qty : 0);
      }, 0);
      const total = subtotal + (totalItems > 0 ? 2.99 : 0);

      document.getElementById('cartBadge').textContent = totalItems;
      document.getElementById('cartBadge').classList.toggle('visible', totalItems > 0);
      document.getElementById('floatCartBadge').textContent = totalItems;
      document.getElementById('floatCartBadge').classList.toggle('visible', totalItems > 0);

      document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
      document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
      document.getElementById('cartFooter').style.display = totalItems > 0 ? 'block' : 'none';

      const cartItemsEl = document.getElementById('cartItems');
      if (totalItems === 0) {
        cartItemsEl.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <small style="color: var(--text-muted); font-size: 0.8rem;">Add some delicious items!</small>
          </div>`;
      } else {
        cartItemsEl.innerHTML = Object.entries(cart).map(([id, qty]) => {
          const item = menuItems.find(i => i.id == id);
          if (!item) return '';
          return `
            <div class="cart-item" id="cart-item-${id}">
              <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${(item.price * qty).toFixed(2)}</div>
                <div class="cart-item-controls">
                  <button class="cart-qty-btn" onclick="cartChangeQty(${id}, -1)">−</button>
                  <span class="cart-qty-num">${qty}</span>
                  <button class="cart-qty-btn" onclick="cartChangeQty(${id}, 1)">+</button>
                </div>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart(${id})" aria-label="Remove">🗑️</button>
            </div>`;
        }).join('');
      }
    }

    function cartChangeQty(itemId, delta) {
      cart[itemId] = (cart[itemId] || 0) + delta;
      if (cart[itemId] <= 0) {
        delete cart[itemId];
        const qtyEl = document.getElementById(`qty-${itemId}`);
        const addBtn = document.querySelector(`#action-${itemId} .add-to-cart-btn`);
        if (qtyEl) qtyEl.classList.remove('show');
        if (addBtn) addBtn.style.display = '';
      } else {
        const qnumEl = document.getElementById(`qnum-${itemId}`);
        if (qnumEl) qnumEl.textContent = cart[itemId];
      }
      updateCartUI();
    }

    function animateCartBtn() {
      const icon = document.querySelector('.float-cart-btn');
      icon.classList.add('bounce');
      setTimeout(() => icon.classList.remove('bounce'), 400);
    }

    function toggleFav(btn) {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
    }

    /* =============================================
       CART PANEL TOGGLE
    ============================================= */
    function openCart() {
      document.getElementById('cartPanel').classList.add('open');
      document.getElementById('cartOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeCart() {
      document.getElementById('cartPanel').classList.remove('open');
      document.getElementById('cartOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('floatCartBtn').addEventListener('click', openCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);

    /* =============================================
       MENU TABS
    ============================================= */
    document.getElementById('menuTabs').addEventListener('click', e => {
      const btn = e.target.closest('.menu-tab');
      if (!btn) return;
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      renderMenu(activeCategory);
    });

    /* =============================================
       NAVBAR
    ============================================= */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      const sections = ['hero', 'menu', 'about', 'gallery', 'reservation', 'footer'];
      const links = document.querySelectorAll('.nav-links a');
      let current = '';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
      });
    }, { passive: true });

    /* Mobile Drawer */
    const hamburger = document.getElementById('hamburger');
    const navDrawer = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');
    function openDrawer() {
      hamburger.classList.add('open');
      navDrawer.classList.add('open');
      navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      hamburger.classList.remove('open');
      navDrawer.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', () => hamburger.classList.contains('open') ? closeDrawer() : openDrawer());
    navOverlay.addEventListener('click', closeDrawer);
    document.querySelectorAll('.drawer-link, .drawer-order-btn').forEach(a => a.addEventListener('click', closeDrawer));

    /* =============================================
       THEME TOGGLE
    ============================================= */
    const themeToggle = document.getElementById('themeToggle');
    const themeThumb = document.getElementById('themeThumb');
    let isDark = false;
    function setTheme(dark) {
      isDark = dark;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      themeToggle.classList.toggle('dark', dark);
      themeThumb.textContent = dark ? '🌙' : '☀️';
      localStorage.setItem('brewbite-theme', dark ? 'dark' : 'light');
    }
    themeToggle.addEventListener('click', () => setTheme(!isDark));
    if (localStorage.getItem('brewbite-theme') === 'dark') setTheme(true);

    /* =============================================
       INTERSECTION OBSERVER — SCROLL REVEALS
    ============================================= */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

    /* =============================================
       ANIMATED COUNTERS
    ============================================= */
    function animateCounter(el, target, suffix = '') {
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        if (target >= 1000) {
          el.textContent = Math.floor(current / 1000) + 'k+';
        } else {
          el.textContent = Math.floor(current) + (suffix || (el.dataset.target == 100 ? '%' : target === 30 ? '' : ''));
        }
        if (current >= target) {
          clearInterval(timer);
          if (target >= 1000) el.textContent = '10k+';
          else if (target === 100) el.textContent = '100%';
          else el.textContent = target + (suffix || '');
        }
      }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

    /* =============================================
       TESTIMONIAL SLIDER — BUG 2 FIX
       Root cause: the original CSS had no flex-shrink:0 on .testimonial-slide,
       causing flex children to compress to near-zero width and appear blank.
       The fix is two-fold:
         1. CSS: added flex-shrink:0 on .testimonial-slide (see styles above)
         2. JS: the goToSlide logic was correct in principle but needed the
            track width to equal exactly (totalSlides * 100%) of the container.
            We now explicitly set the track width so translateX math is reliable.
    ============================================= */
    let currentSlide = 0;
    const totalSlides = 3;
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.slider-dot');

    // Ensure the track is wide enough to hold all slides side by side
    track.style.width = `${totalSlides * 100}%`;

    // Each slide must fill exactly 1/totalSlides of the track width
    document.querySelectorAll('.testimonial-slide').forEach(slide => {
      slide.style.width = `${100 / totalSlides}%`;
      slide.style.minWidth = `${100 / totalSlides}%`;
      slide.style.flexShrink = '0';
    });

    function goToSlide(idx) {
      currentSlide = (idx + totalSlides) % totalSlides;
      // Each slide is (100/totalSlides)% of the track, so to show slide N
      // we translate by -(N * 100/totalSlides)% of the track width,
      // which equals -(N * 100%) of the container (since track = totalSlides * container)
      // Simpler: translate the track by -(currentSlide * containerWidth)
      // We use percentage of the track: -(currentSlide * (100/totalSlides))%
      track.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    document.getElementById('testimonialPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
    document.getElementById('testimonialNext').addEventListener('click', () => goToSlide(currentSlide + 1));
    dots.forEach(dot => dot.addEventListener('click', () => goToSlide(+dot.dataset.idx)));

    // Auto-play testimonials
    let sliderAuto = setInterval(() => goToSlide(currentSlide + 1), 5500);
    document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => clearInterval(sliderAuto));
    document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
      sliderAuto = setInterval(() => goToSlide(currentSlide + 1), 5500);
    });

    // Touch/swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
    });

    /* =============================================
       GALLERY LIGHTBOX
    ============================================= */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    let currentLbIdx = 0;
    const lbSrcs = [];

    galleryItems.forEach((item, i) => {
      lbSrcs.push(item.dataset.src);
      item.addEventListener('click', () => openLightbox(i));
    });

    function openLightbox(idx) {
      currentLbIdx = idx;
      lightboxImg.src = lbSrcs[idx];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.getElementById('lightboxPrev').addEventListener('click', () => {
      currentLbIdx = (currentLbIdx - 1 + lbSrcs.length) % lbSrcs.length;
      lightboxImg.style.opacity = '0';
      setTimeout(() => { lightboxImg.src = lbSrcs[currentLbIdx]; lightboxImg.style.opacity = '1'; }, 200);
    });
    document.getElementById('lightboxNext').addEventListener('click', () => {
      currentLbIdx = (currentLbIdx + 1) % lbSrcs.length;
      lightboxImg.style.opacity = '0';
      setTimeout(() => { lightboxImg.src = lbSrcs[currentLbIdx]; lightboxImg.style.opacity = '1'; }, 200);
    });
    lightboxImg.style.transition = 'opacity 0.2s ease';

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
      if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
    });

    /* =============================================
       TOAST NOTIFICATION
    ============================================= */
    let toastTimer;
    function showToast(msg, icon = '✅') {
      const toast = document.getElementById('toast');
      toast.innerHTML = `${icon} ${msg}`;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    }

    /* =============================================
       RESERVATION FORM
    ============================================= */
    function handleReservation(e) {
      e.preventDefault();
      const inputs = document.querySelectorAll('.reservation-form .form-input');
      let valid = true;
      inputs.forEach(inp => { if (!inp.value) valid = false; });
      if (valid) {
        showToast('🎉 Reservation confirmed! See you soon!', '✅');
        inputs.forEach(inp => { if (inp.type !== 'select-one') inp.value = ''; });
      } else {
        showToast('Please fill in all fields.', '⚠️');
      }
    }

    const resDate = document.getElementById('resDate');
    if (resDate) {
      const today = new Date().toISOString().split('T')[0];
      resDate.setAttribute('min', today);
      resDate.value = today;
    }

    /* =============================================
       HERO PARALLAX
    ============================================= */
    const heroBg = document.getElementById('heroBgImg');
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.5) {
          heroBg.style.transform = `scale(1) translateY(${y * 0.3}px)`;
        }
      }, { passive: true });
    }

    setTimeout(() => { heroBg.classList.add('loaded'); }, 100);

    /* =============================================
       INIT
    ============================================= */
    renderMenu('all');

    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = `${Array.from(galleryItems).indexOf(e.target) * 0.07}s`;
          e.target.style.opacity = '1';
          e.target.style.transform = 'scale(1)';
          galleryObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    galleryItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      galleryObserver.observe(item);
    });
