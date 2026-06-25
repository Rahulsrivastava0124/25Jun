import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { NAV_LINKS } from '../lib/data';

export default function Nav() {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    let lastY = 0;
    const st = ScrollTrigger.create({
      start: 'top -60',
      end: 99999,
      onUpdate(self) {
        const y = self.scroll();
        gsap.to(navRef.current, {
          yPercent: (y > lastY && y > 120) ? -110 : 0,
          duration: 0.5,
          ease: 'expo',
        });
        lastY = y;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 7000,
        padding: '1.2rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(250,250,248,0.88)',
        borderBottom: '1px solid rgba(184,150,90,0.12)',
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: '"EB Garamond", Georgia, serif',
          fontWeight: 400,
          fontSize: '1.35rem',
          letterSpacing: '0.22em',
          color: 'var(--c-ink)',
          textDecoration: 'none',
          textTransform: 'uppercase',
        }}
      >
        AURUM
      </a>

      <ul
        style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
        }}
      >
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                fontFamily: '"Nunito Sans", sans-serif',
                fontWeight: 300,
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--c-ink-mid)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--c-gold)')}
              onMouseLeave={e => (e.target.style.color = 'var(--c-ink-mid)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        style={{
          border: '1px solid var(--c-gold)',
          color: 'var(--c-gold-dk)',
          padding: '0.5rem 1.4rem',
          fontFamily: '"Nunito Sans", sans-serif',
          fontWeight: 400,
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background: 'transparent',
          transition: 'background 0.3s, color 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--c-gold)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--c-gold-dk)';
        }}
      >
        Enquire
      </button>
    </nav>
  );
}
