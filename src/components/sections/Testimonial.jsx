import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../lib/variants';

export default function Testimonial() {
  const bgTextRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgTextRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#testimonial',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
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
      id="testimonial"
      style={{
        background: 'var(--c-bg)',
        padding: '9rem 4vw',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faded mega text */}
      <div
        ref={bgTextRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: '"EB Garamond", Georgia, serif',
          fontSize: 'clamp(8rem, 22vw, 22rem)',
          fontWeight: 300,
          color: 'rgba(184,150,90,0.06)',
          letterSpacing: '0.15em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        AURUM
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}
      >
        <motion.blockquote
          variants={fadeUp}
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 3.2vw, 3rem)',
            lineHeight: 1.4,
            color: 'var(--c-ink)',
            marginBottom: '2.5rem',
          }}
        >
          "AURUM found us a home that felt as if it had been waiting for us. Their understanding of what we truly needed — beyond the brief we gave them — was extraordinary."
        </motion.blockquote>

        <motion.div variants={fadeUp}>
          <p
            style={{
              fontFamily: '"Courier Prime", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--c-gold)',
              marginBottom: '0.3rem',
            }}
          >
            Priya & Vikram Malhotra
          </p>
          <p
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 300,
              fontSize: '0.78rem',
              color: 'var(--c-ink-dim)',
            }}
          >
            The Altamount Manor · Acquired 2023
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
