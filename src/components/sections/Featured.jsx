import { motion } from 'framer-motion';
import { FEATURED } from '../../lib/data';
import useMouseParallax from '../../hooks/useMouseParallax';
import MagneticButton from '../ui/MagneticButton';
import SectionLabel from '../ui/SectionLabel';
import { staggerContainer, fadeUp, slideLeft } from '../../lib/variants';

export default function Featured() {
  const { ref, x, y, rotateX, rotateY, handleMove, handleLeave } = useMouseParallax(18);

  return (
    <section
      id="featured"
      style={{
        background: 'var(--c-surface)',
        padding: '7rem 4vw',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.05fr',
          gap: '5vw',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Image with 3D parallax */}
        <div
          ref={ref}
          style={{ perspective: '800px' }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <motion.div
            style={{ x, y, rotateX, rotateY, position: 'relative' }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            <div
              style={{
                aspectRatio: '4/5.2',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={FEATURED.image}
                alt="Featured Property"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Tag pill */}
              <span
                style={{
                  position: 'absolute',
                  bottom: '1.4rem',
                  left: '1.4rem',
                  fontFamily: '"Courier Prime", monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  background: 'var(--c-gold)',
                  color: '#fff',
                  padding: '0.4rem 0.9rem',
                }}
              >
                {FEATURED.tag}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={slideLeft}>
            <SectionLabel>Signature Property</SectionLabel>
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: 'var(--c-gold-dk)',
              marginBottom: '0.3rem',
            }}
          >
            {FEATURED.price}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              lineHeight: 0.95,
              color: 'var(--c-ink)',
              marginBottom: '2rem',
            }}
          >
            {FEATURED.title.map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  fontStyle: i === 1 ? 'italic' : 'normal',
                  color: i === 1 ? 'var(--c-gold-dk)' : 'var(--c-ink)',
                }}
              >
                {word}
              </span>
            ))}
          </motion.h2>

          {/* Specs grid */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid rgba(184,150,90,0.18)',
            }}
          >
            {FEATURED.specs.map(s => (
              <div key={s.label}>
                <p
                  style={{
                    fontFamily: '"EB Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: '1.5rem',
                    color: 'var(--c-ink)',
                  }}
                >
                  {s.val}
                </p>
                <p
                  style={{
                    fontFamily: '"Courier Prime", monospace',
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--c-ink-dim)',
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 300,
              fontSize: '0.88rem',
              lineHeight: 1.75,
              color: 'var(--c-ink-mid)',
              marginBottom: '2.5rem',
              maxWidth: '480px',
            }}
          >
            {FEATURED.desc}
          </motion.p>

          <motion.div variants={fadeUp}>
            <MagneticButton>Request Private Viewing</MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
