import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Nav from './components/Nav';
import CinematicHero from './components/sections/CinematicHero';
import ImageScroll from './components/sections/ImageScroll';
import Marquee from './components/sections/Marquee';
import Properties from './components/sections/Properties';
import Featured from './components/sections/Featured';
import Stats from './components/sections/Stats';
import Philosophy from './components/sections/Philosophy';
import Testimonial from './components/sections/Testimonial';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';

export default function App() {
  const [ready, setReady] = useState(false);
  const isTouchDevice = !window.matchMedia('(hover: hover)').matches;

  return (
    <>
      {!isTouchDevice && <Cursor />}
      <ScrollProgress />

      <AnimatePresence>
        {!ready && <Preloader onComplete={() => setReady(true)} />}
      </AnimatePresence>

      <Nav />

      <main>
        <CinematicHero />
        <ImageScroll />
        <Marquee />
        <Properties />
        <Featured />
        <Stats />
        <Philosophy />
        <Testimonial />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
