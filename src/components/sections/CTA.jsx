import { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import SectionLabel from '../ui/SectionLabel';
import { staggerContainer, fadeUp } from '../../lib/variants';

export default function CTA() {
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const inputStyle = {
    fontFamily: '"Nunito Sans", sans-serif',
    fontWeight: 300,
    fontSize: '1rem',
    color: 'var(--c-ink)',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(184,150,90,0.35)',
    padding: '0.7rem 0',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.3s',
  };

  return (
    <section
      id="cta"
      style={{
        background: 'var(--c-bg)',
        padding: '9rem 4vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(184,150,90,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>Begin the Conversation</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(3rem, 7.5vw, 7.5rem)',
            lineHeight: 0.95,
            color: 'var(--c-ink)',
            marginBottom: '3rem',
          }}
        >
          Find Your<br />
          <em style={{ color: 'var(--c-gold-dk)' }}>Forever Home</em>
        </motion.h2>

        <motion.form
          variants={fadeUp}
          onSubmit={e => e.preventDefault()}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <label
              style={{
                fontFamily: '"Courier Prime", monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--c-ink-dim)',
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              Your Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--c-gold)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(184,150,90,0.35)')}
            />
          </div>
          <div>
            <label
              style={{
                fontFamily: '"Courier Prime", monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--c-ink-dim)',
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98XXX XXXXX"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--c-gold)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(184,150,90,0.35)')}
            />
          </div>
        </motion.form>

        <motion.div variants={fadeUp}>
          <MagneticButton type="submit">Schedule a Private Consultation</MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
