# NOIR MOTORS™ — Ultra-Luxury Automotive Website

A cinematic luxury automotive frontend portfolio project built with pure HTML5, CSS3, and Vanilla JavaScript (ES6).

---

## Overview

NOIR MOTORS™ is a premium automotive brand website designed to feel like a digital showroom for an ultra-luxury vehicle manufacturer. The experience is built around composition, typography, editorial photography, and subtle motion — not templates or generic layouts.

---

## Project Structure

```
NOIR-MOTORS/
├── index.html                  ← Homepage
├── README.md                   ← This file
│
├── pages/
│   ├── collection.html         ← Editorial collection showcase
│   ├── car-details.html        ← Phantom Noir model detail page
│   ├── about.html              ← Atelier story & philosophy
│   └── contact.html            ← Commission & contact page
│
├── css/
│   ├── style.css               ← Core design system & all components
│   ├── animations.css          ← Animation classes & keyframes
│   ├── collection.css          ← Collection page editorial cards
│   └── responsive.css          ← All breakpoint overrides
│
├── js/
│   ├── app.js                  ← Main application init (Lenis, Swiper, etc.)
│   ├── hero.js                 ← Three.js hero particle scene
│   ├── animations.js           ← GSAP ScrollTrigger, cursor, scroll reveal
│   └── collection.js           ← Collection filter + card animations
│
└── assets/
    ├── images/
    │   ├── cars/               ← Vehicle photography (uses Pexels CDN)
    │   └── icons/              ← Brand icons (inline SVG used throughout)
    └── videos/                 ← Video assets (optional enhancement)
```

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Semantic page structure |
| CSS3 | — | Full design system, animations, layout |
| Vanilla JavaScript | ES6+ | All interactivity and logic |
| Three.js | r128 | Hero particle field scene |
| GSAP | 3.12.2 | Scroll-triggered animations |
| ScrollTrigger | 3.12.2 | GSAP scroll integration |
| Lenis | 1.0.34 | Smooth scroll |
| Swiper.js | 11 | Testimonials + gallery carousels |
| Lucide Icons | latest | UI icons (inline SVG) |
| Google Fonts | — | Cormorant Garamond, Inter, Bebas Neue |

---

## Pages

### Homepage (`index.html`)
- Full-screen Three.js particle hero with cinematic typography
- Loading screen with progress counter
- Animated marquee brand strip
- Three featured cars with parallax imagery
- Craftsmanship editorial section
- Performance statistics with number counters
- Interior experience with photography grid
- Engineering details with specifications list
- Five-image editorial gallery grid
- Brand story with timeline statistics
- Testimonials carousel (Swiper)
- Newsletter signup
- Elegant footer with full navigation

### Collection (`pages/collection.html`)
- Cinematic collection hero
- Sticky filter bar (All / Grand Tourer / Track-Road / Hyper GT / Open Top)
- Six models in editorial layouts:
  - Large editorial card (Phantom Noir)
  - Portrait duo (Obsidian R + Eclipse GT)
  - Full-width feature (Séraph V)
  - Landscape split (Vantis S)
  - Offset editorial grid (Arcane One)

### Car Details (`pages/car-details.html`)
- Full-screen hero with key stats overlay
- Model introduction text
- Five-image Swiper gallery
- Full technical specification table (32 data points)
- Interior photography + feature list
- Six technology highlight cards
- Commission CTA section
- Related models (3 cards)

### Atelier / About (`pages/about.html`)
- Cinematic hero
- Philosophy section with pull quote
- Four brand statistics
- Seven-event visual timeline
- Team profiles (3 members)
- Values section with imagery
- Commission CTA

### Contact (`pages/contact.html`)
- Page header with background imagery
- Four international showroom locations
- Full commission enquiry form (validation + success state)
- Four-step commission process guide
- Six-question FAQ accordion

---

## Design System

### Color Palette
```css
--noir:         #080808   /* Primary background */
--gold:         #c9a96e   /* Accent — all highlights */
--gold-light:   #e8cfa0   /* Italic text, hover states */
--gold-dark:    #9a7a4a   /* Borders, muted accents */
--text-primary: #f0ede8   /* Primary text */
--text-secondary: rgba(240,237,232,0.65)  /* Body text */
```

### Typography
- **Cormorant Garamond** — Display, headings, editorial text (weight 300–500)
- **Inter** — UI text, labels, navigation (weight 100–500)
- **Bebas Neue** — Logo, headline display text

### Spacing
All spacing uses `clamp()` functions to scale fluidly between breakpoints.

---

## Motion Philosophy

Motion enhances the design — it never distracts from it.

- **Three.js**: Hero particle field responds to mouse position
- **GSAP ScrollTrigger**: Reveals, parallax, number counters
- **Lenis**: Smooth momentum scrolling
- **CSS Transitions**: Hover states, image scaling, button effects
- **Swiper.js**: Testimonials and gallery carousels

---

## Running the Project

No build tools, no npm, no framework dependencies.

1. Open `index.html` in any modern browser
2. All assets load from CDN — no local dependencies required
3. No server required — works from the file system

For the best experience, use a local server (e.g., Live Server in VS Code) to avoid any cross-origin restrictions with JavaScript modules.

---

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

---

## Image Credits

Photography sourced from [Pexels](https://www.pexels.com) under free license.

---

## Notes

- The Three.js hero requires WebGL support (available in all modern browsers)
- The custom cursor is hidden on touch devices
- All forms are frontend-only (no backend submission)
- Smooth scroll degrades gracefully if Lenis fails to load

---

*NOIR MOTORS™ — A frontend portfolio project. Not a real automotive brand.*
