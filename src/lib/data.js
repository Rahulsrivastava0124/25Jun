import g1  from '../assets/gallery/Gallery (1).webp';
import g2  from '../assets/gallery/Gallery (2).webp';
import g3  from '../assets/gallery/Gallery (3).webp';
import g4  from '../assets/gallery/Gallery (4).webp';
import g5  from '../assets/gallery/Gallery (5).webp';
import g6  from '../assets/gallery/Gallery (6).webp';
import g7  from '../assets/gallery/Gallery (7).webp';
import g8  from '../assets/gallery/Gallery (8).webp';
import g9  from '../assets/gallery/Gallery (9).webp';
import g10 from '../assets/gallery/Gallery (10).webp';
import g11 from '../assets/gallery/Gallery (11).webp';
import g12 from '../assets/gallery/Gallery (12).webp';
import gMain from '../assets/gallery/Gallery.webp';

export const HERO_IMAGE = g6;

export const PROPERTIES = [
  {
    id: 'altamount',
    badge: 'Exclusive',
    location: 'Altamount Road · South Mumbai',
    name: 'The Altamount Manor',
    desc: 'A storied Edwardian bungalow reimagined — 9,200 sq ft of sun-washed living across two immaculate floors with private gardens.',
    price: '₹82 Cr',
    image: g1,
  },
  {
    id: 'bandstand',
    badge: 'Sea View',
    location: 'Bandstand · Bandra West',
    name: 'Bandstand Sea Villa',
    desc: 'Four levels of pure sea-facing luxury where Arabian sunsets become part of your daily ritual.',
    price: '₹65 Cr',
    image: g2,
  },
  {
    id: 'powai',
    badge: 'Penthouse',
    location: 'Hiranandani · Powai',
    name: 'Sky Pavilion Penthouse',
    desc: 'An entire floor above Powai Lake — 11,000 sq ft of gallery-grade interiors and rooftop terrace gardens.',
    price: '₹54 Cr',
    image: g3,
  },
  {
    id: 'worli',
    badge: 'Ultra-Premium',
    location: 'Worli Sea Face · Mumbai',
    name: 'One Worli Residence',
    desc: 'A sky-high canvas with Bandra–Worli Sea Link as permanent backdrop — redefining what luxury living means.',
    price: '₹120 Cr',
    image: g4,
  },
  {
    id: 'pali',
    badge: 'Heritage',
    location: 'Pali Hill · Bandra',
    name: 'The Pali Hill Retreat',
    desc: "Colonial bones, contemporary soul. Tucked beneath lychee trees on Bandra's most coveted hilltop lane — 7,600 sq ft.",
    price: '₹48 Cr',
    image: g5,
  },
];

export const FEATURED = {
  price: '₹148 Crores',
  title: ['The', 'Crown of', 'Malabar Hill'],
  specs: [
    { val: '14,200', label: 'Sq Ft' },
    { val: '6 BHK',  label: 'Bedrooms' },
    { val: '360°',   label: 'Sea View' },
  ],
  desc: `Set across the crown level of Malabar Hill — Mumbai's most storied address — this 14,200 sq ft residence is an architectural event. Three terraces frame views from the Arabian Sea to the Bandra skyline. Every surface, from hand-laid Travertine to bespoke Murano glass, was specified by a Milanese atelier.`,
  image: gMain,
  tag: 'Property of the Season',
};

export const STATS = [
  { target: 2400, unit: 'Cr+', label: 'Portfolio Value' },
  { target: 340,  unit: '',    label: 'Luxury Properties Sold' },
  { target: 20,   unit: 'Yrs', label: 'Market Leadership' },
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

export { g7, g8, g9, g10, g11, g12 };
