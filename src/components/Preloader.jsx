import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function Preloader({ onComplete }) {
  const elRef = useRef(null);
  const wipeRef = useRef(null);
  const lineRef = useRef(null);
  const tagRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (elRef.current) elRef.current.style.display = 'none';
          onComplete?.();
        }
      });

      tl.to('.pl-char', {
          y: 0, opacity: 1,
          stagger: 0.09,
          duration: 0.9,
          ease: 'expo',
        })
        .to(lineRef.current, {
          width: 240,
          duration: 1.1,
          ease: 'expo',
        }, '-=0.3')
        .to(tagRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'expo',
        }, '-=0.4')
        .to({}, { duration: 0.55 })
        .to(wipeRef.current, {
          scaleX: 1,
          transformOrigin: 'left',
          duration: 0.7,
          ease: 'snap',
        })
        .to(wipeRef.current, {
          scaleX: 0,
          transformOrigin: 'right',
          duration: 0.7,
          ease: 'snap',
        })
        .to(elRef.current, {
          opacity: 0,
          duration: 0.3,
        });
    }, elRef);

    return () => ctx.revert();
  }, [onComplete]);

  const chars = 'AURUM'.split('');

  return (
    <div ref={elRef} className="preloader">
      <div ref={wipeRef} className="pl-wipe" />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ overflow: 'hidden', lineHeight: 1 }}>
          <h1
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '0.35em',
              color: 'var(--c-gold-dk)',
              display: 'flex',
              gap: '0.08em',
            }}
          >
            {chars.map((ch, i) => (
              <span key={i} className="pl-char">{ch}</span>
            ))}
          </h1>
        </div>

        <div
          ref={lineRef}
          id="pl-line"
          style={{
            height: '1px',
            background: 'var(--c-gold)',
            width: 0,
            margin: '1.2rem auto',
          }}
        />

        <p
          ref={tagRef}
          style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--c-ink-mid)',
            opacity: 0,
          }}
        >
          Mumbai Ultra-Luxury Estates
        </p>
      </div>
    </div>
  );
}
