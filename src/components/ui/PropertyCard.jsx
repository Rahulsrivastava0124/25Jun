import { motion } from 'framer-motion';

export default function PropertyCard({ property }) {
  return (
    <motion.article
      className="p-card"
      data-cursor-hover
      whileHover={{
        y: -10,
        boxShadow: '0 40px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(184,150,90,0.3)',
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      }}
      style={{
        flex: '0 0 320px',
        background: 'var(--c-card)',
        border: '1px solid rgba(184,150,90,0.12)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          height: '270px',
          position: 'relative',
        }}
      >
        <motion.img
          src={property.image}
          alt={property.name}
          loading="lazy"
          initial={{ scale: 1.06 }}
          whileHover={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            fontFamily: '"Courier Prime", monospace',
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            background: 'var(--c-gold)',
            color: '#fff',
            padding: '0.3rem 0.7rem',
          }}
        >
          {property.badge}
        </span>
      </div>

      <div style={{ padding: '1.6rem' }}>
        <p
          style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--c-ink-dim)',
            marginBottom: '0.5rem',
          }}
        >
          {property.location}
        </p>
        <h3
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontWeight: 400,
            fontSize: '1.45rem',
            color: 'var(--c-ink)',
            lineHeight: 1.15,
            marginBottom: '0.7rem',
          }}
        >
          {property.name}
        </h3>
        <p
          style={{
            fontFamily: '"Nunito Sans", sans-serif',
            fontWeight: 300,
            fontSize: '0.82rem',
            lineHeight: 1.65,
            color: 'var(--c-ink-mid)',
            marginBottom: '1.2rem',
          }}
        >
          {property.desc}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(184,150,90,0.15)',
            paddingTop: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: '1.3rem',
              color: 'var(--c-gold-dk)',
            }}
          >
            {property.price}
          </span>
          <a
            href="#cta"
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 400,
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--c-gold)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--c-gold)',
              paddingBottom: '1px',
            }}
          >
            Enquire
          </a>
        </div>
      </div>
    </motion.article>
  );
}
