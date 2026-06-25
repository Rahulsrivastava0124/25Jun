import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '../../lib/data';
import { staggerContainer, fadeUp } from '../../lib/variants';

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-inner > *', {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.9,
        ease: 'expo',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 88%',
        },
      });
    }, footerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--c-surface)',
        borderTop: '1px solid rgba(184,150,90,0.15)',
        padding: '4rem 4vw',
      }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: '1.5rem',
              letterSpacing: '0.22em',
              color: 'var(--c-ink)',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            AURUM
          </p>
          <p
            style={{
              fontFamily: '"Courier Prime", monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              color: 'var(--c-ink-dim)',
              textTransform: 'uppercase',
            }}
          >
            Mumbai Ultra-Luxury Estates
          </p>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: '"Nunito Sans", sans-serif',
                fontWeight: 300,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
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
          ))}
        </nav>

        {/* Right */}
        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 300,
              fontSize: '0.75rem',
              color: 'var(--c-ink-dim)',
              marginBottom: '0.3rem',
            }}
          >
            +91 98200 00001
          </p>
          <p
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 300,
              fontSize: '0.75rem',
              color: 'var(--c-ink-dim)',
            }}
          >
            hello@aurum-estates.in
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '2.5rem auto 0',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(184,150,90,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--c-ink-dim)',
          }}
        >
          © {new Date().getFullYear()} AURUM Estates. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--c-ink-dim)',
          }}
        >
          RERA Reg. · Privacy Policy
        </p>
      </div>
    </footer>
  );
}
