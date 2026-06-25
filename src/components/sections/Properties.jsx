import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { motion } from 'framer-motion';
import { PROPERTIES } from '../../lib/data';
import PropertyCard from '../ui/PropertyCard';
import SectionLabel from '../ui/SectionLabel';
import { staggerContainer, fadeUp, slideLeft } from '../../lib/variants';

export default function Properties() {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      gsap.from('.p-card', {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.95,
        ease: 'expo',
        scrollTrigger: {
          trigger: '.props-track',
          start: 'top 80%',
        },
      });
    });

    let isDown = false, startX, scrollLeft;

    const onDown = e => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    const onUp = () => {
      isDown = false;
      track.style.cursor = 'grab';
    };
    const onMove = e => {
      if (!isDown) return;
      track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.6;
    };

    track.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    track.addEventListener('mousemove', onMove);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      track.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      track.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      id="properties"
      style={{ background: 'var(--c-bg)', padding: '7rem 0' }}
    >
      <div style={{ padding: '0 4vw', marginBottom: '3.5rem' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={slideLeft}>
            <SectionLabel>Curated Portfolio</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              color: 'var(--c-ink)',
              maxWidth: '640px',
            }}
          >
            Exceptional Properties,<br />
            <em style={{ color: 'var(--c-gold-dk)' }}>Extraordinary Lives</em>
          </motion.h2>
        </motion.div>
      </div>

      <div style={{ position: 'relative' }}>
        <div
          ref={trackRef}
          className="no-scrollbar props-track"
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            padding: '1rem 4vw 2rem',
            scrollSnapType: 'x mandatory',
            cursor: 'grab',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {PROPERTIES.map(p => (
            <div key={p.id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
              <PropertyCard property={p} />
            </div>
          ))}
        </div>

        {/* Right fade-out gradient */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            background: 'linear-gradient(to right, transparent, var(--c-bg))',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
