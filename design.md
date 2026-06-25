# AURUM Estates — Claude Code Project Prompt
> Luxury Real Estate Website · Vite + React · GSAP + Framer Motion

---

## 🎯 Project Brief

Build a **production-ready, single-page luxury real estate website** for **AURUM Estates** — a Mumbai ultra-luxury property house. The site must feel indistinguishable from a top-tier creative studio build: cinematic preloader, scroll-orchestrated reveals, spring-physics cursors, and depth-rich parallax. Every animation should have intentional purpose and feel hand-crafted.

**Live reference for mood:** https://soyaji.com (cinematic, editorial, dark luxury)

---

## ⚙️ Tech Stack — Use Exactly This

```
Framework:     Vite + React 18
Styling:       Tailwind CSS v3 (utility-first) + CSS custom properties for tokens
Animation:     GSAP 3 (ScrollTrigger, CustomEase) + Framer Motion 11
Fonts:         Google Fonts (Cormorant Garamond + DM Sans + Courier Prime)
Linting:       ESLint + Prettier
Package Mgr:   npm
```

### Install commands
```bash
npm create vite@latest aurum-estates -- --template react
cd aurum-estates
npm install
npm install gsap framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### `tailwind.config.js` — extend with brand tokens
```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#080604',
        surface:  '#0F0D0A',
        card:     '#161210',
        warm:     '#1E1812',
        gold:     '#B8965A',
        'gold-lt':'#D4AB62',
        ivory:    '#F0E8D5',
        'ivory-dim': '#7E7265',
        'ivory-mid': '#A89880',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
    },
  },
}
```

---

## 📁 File Structure — Create Exactly This

```
aurum-estates/
├── public/
│   └── favicon.svg              # Simple gold diamond mark
├── src/
│   ├── main.jsx                 # App entry, font imports
│   ├── App.jsx                  # Root: renders sections, manages cursor
│   ├── index.css                # CSS custom props, reset, cursor styles
│   │
│   ├── components/
│   │   ├── Cursor.jsx           # 🔵 FM — spring cursor dot + ring
│   │   ├── Preloader.jsx        # 🟢 GSAP — film-wipe entrance sequence
│   │   ├── Nav.jsx              # 🟢 GSAP — hide/show on scroll direction
│   │   ├── ScrollProgress.jsx   # 🟢 GSAP — top progress bar
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.jsx         # 🟢 GSAP — parallax bg + split-text reveal
│   │   │   ├── Marquee.jsx      # 🟢 GSAP — infinite location loop
│   │   │   ├── Properties.jsx   # 🟢 GSAP + 🔵 FM — drag scroll + card spring
│   │   │   ├── Featured.jsx     # 🔵 FM — mouse-parallax depth image
│   │   │   ├── Stats.jsx        # 🟢 GSAP — scroll-triggered counter
│   │   │   ├── Philosophy.jsx   # 🟢 GSAP — stagger text reveal
│   │   │   ├── Testimonial.jsx  # 🟢 GSAP — fade + lift
│   │   │   ├── CTA.jsx          # 🔵 FM — magnetic button + form
│   │   │   └── Footer.jsx       # 🟢 GSAP — fade reveal
│   │   │
│   │   └── ui/
│   │       ├── MagneticButton.jsx  # 🔵 FM — spring attraction + elastic snap
│   │       ├── PropertyCard.jsx    # 🔵 FM — spring hover lift component
│   │       └── SectionLabel.jsx    # shared eyebrow label
│   │
│   ├── hooks/
│   │   ├── useScrollTrigger.js  # wrapper: registers + cleans up ScrollTrigger
│   │   ├── useMagneticEffect.js # mouse proximity spring pull
│   │   └── useMouseParallax.js  # 2D/3D mouse-follow with quickTo
│   │
│   ├── lib/
│   │   ├── gsap.js              # GSAP + plugin registration, custom eases
│   │   └── data.js              # property listings, stats, nav links
│   │
│   └── assets/
│       └── fonts/               # (empty — using Google Fonts CDN)
│
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🎨 Design System

### Color Palette
| Token         | Hex       | Role                              |
|---------------|-----------|-----------------------------------|
| `--c-bg`      | `#080604` | Page background (warm near-black) |
| `--c-surface` | `#0F0D0A` | Elevated surface, footer          |
| `--c-card`    | `#161210` | Property cards                    |
| `--c-warm`    | `#1E1812` | Testimonial section               |
| `--c-gold`    | `#B8965A` | Primary accent                    |
| `--c-gold-lt` | `#D4AB62` | Hover/active gold                 |
| `--c-ivory`   | `#F0E8D5` | Primary text                      |
| `--c-ivory-mid`| `#A89880` | Secondary text                   |
| `--c-ivory-dim`| `#7E7265` | Muted/placeholder text           |

### Typography
| Role    | Family              | Weight   | Usage                      |
|---------|---------------------|----------|----------------------------|
| Display | Cormorant Garamond  | 300, 400 | Headlines, quotes, prices  |
| Body    | DM Sans             | 300, 400 | Paragraphs, UI labels      |
| Mono    | Courier Prime       | 400      | Tags, coordinates, codes   |

### CSS Custom Eases — define in `src/lib/gsap.js`
```js
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create('expo',   '0.16, 1, 0.3, 1');
CustomEase.create('snap',   '0.87, 0, 0.13, 1');
CustomEase.create('spring', '0.34, 1.56, 0.64, 1');

export { gsap, ScrollTrigger, CustomEase };
```

---

## 🟢 GSAP ZONES — Specification

> GSAP handles: timelines, scroll-triggered reveals, counters, parallax scrub, text splits, infinite loops, nav behaviour.

### 1. `<Preloader />`
**Sequence (single `gsap.timeline`):**
1. Brand word "AURUM" — each letter `translateY(115%) → 0`, stagger `0.09s`, ease `expo`
2. Gold divider line — `width: 0 → 240px`, ease `expo`
3. Sub-tagline — `opacity: 0 → 1`
4. *Pause 0.55s*
5. Gold wipe panel — `scaleX: 0 → 1`, `transformOrigin: left`, ease `snap`
6. Wipe retract — `scaleX: 1 → 0`, `transformOrigin: right`, ease `snap`
7. Preloader `opacity: 0`, then `display: none`
8. `onComplete` → call `startPageAnimations()`

```jsx
// Key GSAP pattern:
const tl = gsap.timeline({ onComplete: () => setDone(true) });
tl.to('.pl-char', { y: 0, opacity: 1, stagger: 0.09, duration: 0.9, ease: 'expo' })
  .to('#pl-line',  { width: 240, duration: 1.1, ease: 'expo' }, '-=0.3')
  // ... etc
```

---

### 2. `<Hero />` — Text Split + Parallax
**Entrance (after preloader):**
- Eyebrow label: `{ opacity: 0, y: 18 } → { opacity: 1, y: 0 }`, delay `0.1s`
- Each `.hl-line-inner`: stagger `0.13s`, `translateY(108%) → 0`, ease `expo`
- Desc text + stats group: offset `-=0.55`

**Scroll parallax (scrub):**
```js
gsap.to('#hero-bg', {
  yPercent: 22,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.4,
  }
});
```

**HTML structure for split text:**
```jsx
<h1>
  {['Where Every', 'Detail Speaks', 'of Legacy.'].map((line, i) => (
    <span key={i} className="hl-line" style={{ display: 'block', overflow: 'hidden' }}>
      <span className="hl-line-inner" style={{ display: 'block', transform: 'translateY(108%)' }}>
        {line}
      </span>
    </span>
  ))}
</h1>
```

---

### 3. `<Marquee />` — Infinite Scroll Loop
```js
// Triple the items, animate one-third of scroll width
const mqAnim = gsap.to(trackRef.current, {
  x: () => -(trackRef.current.scrollWidth / 3),
  duration: 38,
  ease: 'none',
  repeat: -1,
});

// Framer Motion-style: gesture slows marquee
trackRef.current.addEventListener('mouseenter', () =>
  gsap.to(mqAnim, { timeScale: 0.3, duration: 0.8 })
);
trackRef.current.addEventListener('mouseleave', () =>
  gsap.to(mqAnim, { timeScale: 1, duration: 0.8 })
);
```

---

### 4. `<Properties />` — Card Stagger Reveal + Drag Scroll
**Scroll reveal:**
```js
gsap.from('.p-card', {
  opacity: 0, y: 50,
  stagger: 0.12,
  duration: 0.95,
  ease: 'expo',
  scrollTrigger: { trigger: '.props-track', start: 'top 80%' }
});
```

**Drag scroll (custom):**
```js
let isDown = false, startX, scrollLeft;
track.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});
window.addEventListener('mouseup', () => { isDown = false; });
track.addEventListener('mousemove', e => {
  if (!isDown) return;
  track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.6;
});
```

---

### 5. `<Stats />` — Scroll-Triggered Counter
```js
// Only fire once
let fired = false;
ScrollTrigger.create({
  trigger: '#stats',
  start: 'top 78%',
  onEnter() {
    if (fired) return;
    fired = true;
    document.querySelectorAll('[data-count-target]').forEach(el => {
      const target = +el.dataset.countTarget;
      gsap.fromTo(el, { textContent: 0 }, {
        textContent: target,
        duration: 2.2,
        ease: 'power3.out',
        snap: { textContent: 1 },
        onUpdate() {
          el.textContent = Math.round(+el.textContent).toLocaleString('en-IN');
        }
      });
    });
  }
});
```

---

### 6. Nav — Smart Hide/Show
```js
let lastY = 0;
ScrollTrigger.create({
  start: 'top -60',
  end: 99999,
  onUpdate(self) {
    const y = self.scroll();
    gsap.to(navRef.current, {
      yPercent: (y > lastY && y > 120) ? -110 : 0,
      duration: 0.5,
      ease: 'expo',
    });
    lastY = y;
  }
});
```

---

## 🔵 FRAMER MOTION ZONES — Specification

> Framer Motion handles: cursor physics, card spring hover, magnetic buttons, mouse-parallax depth, page-level gesture interactions.

### 1. `<Cursor />` — Spring Follower
```jsx
// src/components/Cursor.jsx
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Dot: fast, precise
  const dotX = useSpring(mx, { stiffness: 900, damping: 30, mass: 0.3 });
  const dotY = useSpring(my, { stiffness: 900, damping: 30, mass: 0.3 });

  // Ring: slower, lags behind = spring feel
  const ringX = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    const move = e => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}
```

**Cursor states (manage via React context):**
| State     | Ring size   | Behaviour trigger                    |
|-----------|-------------|--------------------------------------|
| `default` | `38px`      | No hover                             |
| `hover`   | `72px`      | Over links, cards, buttons           |
| `drag`    | `56px`      | Mousedown on property track          |
| `magnetic`| `scale(1.3)`| Within magnetic button radius        |

---

### 2. `<PropertyCard />` — Spring Hover
```jsx
// src/components/ui/PropertyCard.jsx
import { motion } from 'framer-motion';

export default function PropertyCard({ property }) {
  return (
    <motion.article
      className="p-card"
      whileHover={{
        y: -10,
        boxShadow: '0 40px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(184,150,90,0.18)',
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
    >
      <motion.div
        className="card-img-wrap"
        whileHover={{ scale: 1.0 }}
        initial={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <img src={property.image} alt={property.name} />
      </motion.div>
      {/* ... card body */}
    </motion.article>
  );
}
```

---

### 3. `<MagneticButton />` — Spring Attraction + Elastic Snap
```jsx
// src/components/ui/MagneticButton.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config: elastic snap-back on leave
  const sx = useSpring(x, { stiffness: 200, damping: 12, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 200, damping: 12, mass: 0.8 });

  const handleMove = e => {
    const r  = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    x.set((e.clientX - cx) * 0.38);
    y.set((e.clientY - cy) * 0.38);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`mag-btn ${className}`}
    >
      {children}
    </motion.button>
  );
}
```

---

### 4. `<Featured />` — 3D Mouse-Parallax Image
```jsx
// src/components/sections/Featured.jsx
// Hook: src/hooks/useMouseParallax.js

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function useMouseParallax(strength = 20) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 150, damping: 20 });
  const y = useSpring(rawY, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(rawX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(rawY, [-1, 1], [4, -4]);

  const handleMove = e => {
    const r  = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);  // -1 to +1
    rawY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };
  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  return { ref, x: useTransform(x, v => v * strength),
                 y: useTransform(y, v => v * strength),
                 rotateX, rotateY, handleMove, handleLeave };
}

// In Featured.jsx:
const { ref, x, y, rotateX, rotateY, handleMove, handleLeave } = useMouseParallax(18);

<motion.div
  ref={ref}
  style={{ perspective: 800 }}
  onMouseMove={handleMove}
  onMouseLeave={handleLeave}
>
  <motion.div
    style={{ x, y, rotateX, rotateY }}
    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
  >
    <img src={featuredImg} alt="Featured Property" />
  </motion.div>
</motion.div>
```

---

### 5. Framer Motion — Page Section Variants (shared)
```jsx
// src/lib/variants.js — reuse across sections

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};

export const slideLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// Usage:
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
  <motion.p variants={slideLeft}>Section Label</motion.p>
  <motion.h2 variants={fadeUp}>Title</motion.h2>
</motion.div>
```

---

## 🗂 Data Layer — `src/lib/data.js`

```js
export const PROPERTIES = [
  {
    id: 'altamount',
    badge: 'Exclusive',
    location: 'Altamount Road · South Mumbai',
    name: 'The Altamount Manor',
    desc: 'A storied Edwardian bungalow reimagined — 9,200 sq ft of sun-washed living across two immaculate floors with private gardens.',
    price: '₹82 Cr',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80',
  },
  {
    id: 'bandstand',
    badge: 'Sea View',
    location: 'Bandstand · Bandra West',
    name: 'Bandstand Sea Villa',
    desc: 'Four levels of pure sea-facing luxury where Arabian sunsets become part of your daily ritual.',
    price: '₹65 Cr',
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=700&q=80',
  },
  {
    id: 'powai',
    badge: 'Penthouse',
    location: 'Hiranandani · Powai',
    name: 'Sky Pavilion Penthouse',
    desc: 'An entire floor above Powai Lake — 11,000 sq ft of gallery-grade interiors and rooftop terrace gardens.',
    price: '₹54 Cr',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80',
  },
  {
    id: 'worli',
    badge: 'Ultra-Premium',
    location: 'Worli Sea Face · Mumbai',
    name: 'One Worli Residence',
    desc: 'A sky-high canvas with Bandra–Worli Sea Link as permanent backdrop — redefining what luxury living means.',
    price: '₹120 Cr',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80',
  },
  {
    id: 'pali',
    badge: 'Heritage',
    location: 'Pali Hill · Bandra',
    name: 'The Pali Hill Retreat',
    desc: 'Colonial bones, contemporary soul. Tucked beneath lychee trees on Bandra\'s most coveted hilltop lane — 7,600 sq ft.',
    price: '₹48 Cr',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
  },
];

export const FEATURED = {
  price: '₹148 Crores',
  title: ['The', 'Crown of', 'Malabar Hill'],
  titleItalic: 'Crown of',
  specs: [
    { val: '14,200', label: 'Sq Ft' },
    { val: '6 BHK',  label: 'Bedrooms' },
    { val: '360°',   label: 'Sea View' },
  ],
  desc: `Set across the crown level of Malabar Hill — Mumbai's most storied address — this 14,200 sq ft residence is an architectural event. Three terraces frame views from the Arabian Sea to the Bandra skyline. Every surface, from hand-laid Travertine to bespoke Murano glass, was specified by a Milanese atelier working with the original architect.`,
  image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=85',
  tag: 'Property of the Season',
};

export const STATS = [
  { target: 2400, unit: 'Cr+', label: 'Portfolio Value' },
  { target: 340,  unit: '',    label: 'Luxury Properties Sold' },
  { target: 20,   unit: ' Yrs',label: 'Market Leadership' },
  { target: 98,   unit: '%',   label: 'Client Satisfaction' },
];

export const MARQUEE_ITEMS = [
  'South Mumbai', 'Malabar Hill', 'Bandstand Bandra',
  'Worli Sea Face', 'Juhu Beach', 'Pali Hill',
  'Cuffe Parade', 'Powai Lake', 'Lower Parel',
  'Marine Drive', 'Walkeshwar', 'Carter Road',
];

export const NAV_LINKS = [
  { href: '#properties', label: 'Properties' },
  { href: '#featured',   label: 'Signature' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#cta',        label: 'Contact' },
];
```

---

## 📐 Section Specifications

### Hero
- Full-viewport height (`100vh`, `min-height: 700px`)
- Background: Unsplash image with dark overlay gradient, `scale(1.12)` initial scale
- Headline: 3 lines, `clamp(3.8rem, 8vw, 8.5rem)`, Cormorant 300, line-height `0.93`
- Second line has italic gold word `"Detail"`
- Bottom: split layout — description left, 3 stats right
- Scroll cue: animated line bottom-right (pulsing CSS animation)
- After preloader: GSAP timeline orchestrates full reveal

### Properties Grid
- Section header: eyebrow label + large title (word-by-word stagger)
- Cards: horizontal drag-scroll, `scroll-snap-type: x mandatory`
- Track: `overflow-x: auto`, hidden scrollbar, `cursor: grab`
- Right fade-out gradient (`::after` pseudo)
- Each card: badge, image (270px), location, name, description, price, link
- Card hover: `translateY(-10px)` spring + gold border glow

### Featured
- CSS Grid 1:1.05 columns
- Left: aspect-ratio `4/5.2` image with `perspective: 800px` wrapper
- 3D mouse parallax: `rotateX`, `rotateY`, `x`, `y` all spring-driven
- Tag pill: bottom-left, gold background
- Right: price, title, specs grid (3 cols), description, magnetic CTA button
- All right-side content: stagger `fadeUp` on scroll enter

### Stats
- CSS Grid 4 columns, `gap: 2px`, gold-tinted gaps
- Each block: centered, counter number + unit, mono label
- GSAP counter fires once on scroll enter
- Numbers format: Indian locale (`toLocaleString('en-IN')`)

### Philosophy
- CSS Grid `1fr 2fr`, sticky left column
- Left: eyebrow + gold divider (scaleX reveal)
- Right: large italic blockquote + 2 body paragraphs
- Giant faded `"` quote mark positioned absolutely

### Testimonial
- Center-aligned, full-width
- Faded mega-text `AURUM` behind (parallax on scroll, `yPercent: 20`)
- Quote: `clamp(1.6rem, 3.2vw, 3rem)` Cormorant italic
- Author: mono uppercase gold

### CTA
- Radial gold glow background
- Large headline `clamp(3rem, 7.5vw, 7.5rem)`
- Inline form: name + phone (bare bottom-border inputs)
- Submit: MagneticButton component (outline style)

---

## 🚫 Rules — Do NOT Do These

```
✗ Don't use Create React App — use Vite
✗ Don't use styled-components — use Tailwind + CSS custom props
✗ Don't use `useEffect` for every GSAP animation — use the useScrollTrigger hook
✗ Don't animate with CSS transitions when GSAP is already animating the same property
✗ Don't mix GSAP ScrollTrigger and IntersectionObserver — pick one (use ST)
✗ Don't use any cursor: pointer — the whole site uses cursor: none
✗ Don't hardcode colors — always reference CSS custom properties or Tailwind tokens
✗ Don't create GSAP animations outside of useEffect or useLayoutEffect
✗ Don't forget to return ScrollTrigger.getAll().forEach(t => t.kill()) in cleanup
✗ Don't use images without loading="lazy" except hero (above-fold)
✗ Don't use margin for section spacing — use padding + gap
```

---

## ✅ Success Criteria

Before considering the build complete, verify:

- [ ] Preloader runs cleanly and removes from DOM (`display: none`)
- [ ] Hero text lines reveal after preloader with correct stagger
- [ ] Hero background parallaxes at 22% yPercent on scroll out
- [ ] Nav hides on scroll down, reappears on scroll up
- [ ] Marquee loops without visible jump, slows on hover
- [ ] Property track drag-scrolls smoothly with momentum
- [ ] Cards spring-hover (`translateY(-10px)`) with gold border
- [ ] Featured image tracks mouse in 3D (rotateX + rotateY)
- [ ] Magnetic button pulls toward cursor, elastic snap-back on leave
- [ ] Stats count up from 0 on scroll enter (once only)
- [ ] Scroll progress bar fills correctly to 100%
- [ ] Cursor dot + ring follow mouse with spring lag difference
- [ ] All animations respect `prefers-reduced-motion` media query
- [ ] Site is responsive down to 375px
- [ ] No console errors in production build (`npm run build`)
- [ ] Lighthouse Performance > 90 on mobile

---

## 🏃 Build & Run Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production
npm run preview

# Lint
npx eslint src/

# Check bundle size
npx vite-bundle-visualizer
```

---

## 💡 Additional Claude Code Instructions

When building this project:

1. **Start with `src/lib/gsap.js`** — register all plugins first, before any component imports GSAP
2. **Build the `Cursor` component second** — it wraps everything and sets the tone
3. **Build sections top-to-bottom** as they appear in the DOM
4. **All GSAP scroll animations must clean up** — return cleanup functions from `useEffect`
5. **Use `useLayoutEffect` for GSAP** — not `useEffect`, to avoid flash before paint
6. **Image loading** — hero image should be eager, all others lazy
7. **Framer Motion AnimatePresence** — wrap `<Preloader />` so it unmounts with animation
8. **Mobile cursors** — hide cursor components entirely on touch devices (`window.matchMedia('(hover: hover)')`)
9. **Font loading** — add `<link rel="preconnect">` tags in `index.html` before font stylesheet
10. **GSAP context** — use `gsap.context()` inside components to scope selectors and prevent leaks

---

*Prompt version: 1.0 · Stack: Vite + React 18 + GSAP 3 + Framer Motion 11*
*Brand: AURUM Estates · Market: Mumbai Ultra-Luxury Real Estate*