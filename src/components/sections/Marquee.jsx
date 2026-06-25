import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { MARQUEE_ITEMS } from '../../lib/data';

export default function Marquee() {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const mqAnim = gsap.to(track, {
        x: () => -(track.scrollWidth / 3),
        duration: 38,
        ease: 'none',
        repeat: -1,
      });

      const slowDown  = () => gsap.to(mqAnim, { timeScale: 0.3, duration: 0.8 });
      const speedUp   = () => gsap.to(mqAnim, { timeScale: 1,   duration: 0.8 });

      track.addEventListener('mouseenter', slowDown);
      track.addEventListener('mouseleave', speedUp);

      return () => {
        track.removeEventListener('mouseenter', slowDown);
        track.removeEventListener('mouseleave', speedUp);
      };
    });

    return () => ctx.revert();
  }, []);

  const tripled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '1.5rem 0',
        borderTop: '1px solid rgba(184,150,90,0.15)',
        borderBottom: '1px solid rgba(184,150,90,0.15)',
        background: 'var(--c-surface)',
      }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {tripled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2.5rem',
              paddingRight: '2.5rem',
            }}
          >
            <span
              style={{
                fontFamily: '"EB Garamond", Georgia, serif',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                color: 'var(--c-ink-mid)',
                letterSpacing: '0.04em',
              }}
            >
              {item}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--c-gold)',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
