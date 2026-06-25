import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { STATS } from '../../lib/data';

export default function Stats() {
  useLayoutEffect(() => {
    let fired = false;
    const st = ScrollTrigger.create({
      trigger: '#stats',
      start: 'top 78%',
      onEnter() {
        if (fired) return;
        fired = true;
        document.querySelectorAll('[data-count-target]').forEach(el => {
          const target = +el.dataset.countTarget;
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 2.2,
              ease: 'power3.out',
              snap: { textContent: 1 },
              onUpdate() {
                el.textContent = Math.round(+el.textContent).toLocaleString('en-IN');
              },
            }
          );
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="stats"
      style={{
        background: 'var(--c-bg)',
        padding: '5rem 0',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 4vw',
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: 'center',
              padding: '3rem 2rem',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(184,150,90,0.15)' : 'none',
            }}
          >
            <p
              style={{
                fontFamily: '"EB Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
                color: 'var(--c-ink)',
                lineHeight: 1,
                marginBottom: '0.3rem',
              }}
            >
              <span data-count-target={s.target}>0</span>
              <span style={{ color: 'var(--c-gold)', fontSize: '0.65em' }}>{s.unit}</span>
            </p>
            <p
              style={{
                fontFamily: '"Courier Prime", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--c-ink-dim)',
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
