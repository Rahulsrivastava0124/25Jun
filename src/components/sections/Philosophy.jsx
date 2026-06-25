import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import { staggerContainer, fadeUp } from '../../lib/variants';

export default function Philosophy() {
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'expo',
        scrollTrigger: {
          trigger: '#philosophy',
          start: 'top 70%',
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="philosophy"
      style={{
        background: 'var(--c-warm)',
        padding: '8rem 4vw',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '5vw',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        {/* Left sticky column */}
        <div style={{ position: 'sticky', top: '8rem' }}>
          <SectionLabel>Our Philosophy</SectionLabel>
          <div
            ref={lineRef}
            className="gold-line"
            style={{ width: '80px', marginTop: '1rem' }}
          />
        </div>

        {/* Right content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ position: 'relative' }}
        >
          {/* Giant faded quote mark */}
          <span
            style={{
              position: 'absolute',
              top: '-3rem',
              left: '-2rem',
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: '18rem',
              lineHeight: 1,
              color: 'rgba(184,150,90,0.08)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          >
            "
          </span>

          <motion.blockquote
            variants={fadeUp}
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              lineHeight: 1.35,
              color: 'var(--c-ink)',
              marginBottom: '2.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            We do not merely sell properties. We introduce our clients to the addresses that will define their legacy — spaces that earn their place in family histories.
          </motion.blockquote>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color: 'var(--c-ink-mid)',
              marginBottom: '1.5rem',
              maxWidth: '560px',
            }}
          >
            Founded in 2004, AURUM Estates has spent two decades perfecting the art of connecting discerning buyers with Mumbai's most extraordinary homes. Our approach is unhurried, our counsel is discreet, and our portfolio is curated with singular intent.
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color: 'var(--c-ink-mid)',
              maxWidth: '560px',
            }}
          >
            Each property in our portfolio represents months of due diligence — architectural significance, neighbourhood provenance, construction integrity — so that when we present an opportunity, it requires no qualification.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
