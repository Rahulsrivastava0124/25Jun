import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import bgSrc      from '../../assets/hero section sky /Background.webp';
import buildingSrc from '../../assets/hero section sky /building.png';
import cloud1Src   from '../../assets/hero section sky /claud1.png';
import cloud2Src   from '../../assets/hero section sky /claud2.png';
import skySrc      from '../../assets/hero section sky /full_width_sky.png';

const GPU = {
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
};

export default function CinematicHero() {
  const heroRef    = useRef(null);
  const cloudLRef  = useRef(null);
  const cloudRRef  = useRef(null);
  const buildingRef = useRef(null);
  const skyRef     = useRef(null);
  const textRef   = useRef(null);
  const labelRef  = useRef(null);
  const headingRef = useRef(null);
  const subRef    = useRef(null);
  const btnsRef   = useRef(null);

  useLayoutEffect(() => {
    gsap.set(cloudLRef.current,   { x: -120, opacity: 0 });
    gsap.set(cloudRRef.current,   { x: 120,  opacity: 0 });
    gsap.set(buildingRef.current, { yPercent: 100 });
    gsap.set(labelRef.current,    { opacity: 0, y: 30 });
    gsap.set(subRef.current,    { opacity: 0, y: 20 });
    gsap.set(btnsRef.current,   { opacity: 0, y: 20 });
    const chars = headingRef.current?.querySelectorAll('.ch');
    if (chars?.length) gsap.set(chars, { opacity: 0, x: -20 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Page-load animations ────────────────────────────────────────────
      gsap.to(cloudLRef.current, {
        x: 0, opacity: 1, duration: 2.5, ease: 'power3.out',
      });
      gsap.to(cloudRRef.current, {
        x: 0, opacity: 1, duration: 2.5, ease: 'power3.out', delay: 0.2,
      });

      // Building: fully hidden → 50% visible on load
      gsap.to(buildingRef.current, {
        yPercent: 50, duration: 1.8, ease: 'power4.out', delay: 0.1,
      });

      gsap.to(labelRef.current, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
      });

      const chars = headingRef.current?.querySelectorAll('.ch');
      if (chars?.length) {
        gsap.to(chars, {
          opacity: 1, x: 0, duration: 0.6,
          ease: 'power3.out', stagger: 0.03, delay: 0.5,
        });
      }

      gsap.to(subRef.current, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9,
      });
      gsap.to(btnsRef.current, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 1.2,
      });

      // ── Scroll animations ────────────────────────────────────────────────
      const base = {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      };

      gsap.to(cloudLRef.current, {
        x: -250, y: -60, ease: 'none',
        scrollTrigger: base,
      });
      gsap.to(cloudRRef.current, {
        x: 250, y: -60, ease: 'none',
        scrollTrigger: base,
      });

      // Building: 50% visible → 100% visible on scroll
      gsap.fromTo(buildingRef.current,
        { yPercent: 50 },
        { yPercent: 0, ease: 'none', scrollTrigger: base }
      );

      gsap.to(skyRef.current, {
        scale: 1.15, ease: 'none',
        scrollTrigger: { ...base, scrub: 2 },
      });

      gsap.to(textRef.current, {
        y: 200, opacity: 0, ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '70% top',
          scrub: true,
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const heading = 'Crafting timeless spaces';

  const renderLine = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="ch" style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {char}
      </span>
    ));

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#B8D4E8',
      }}
    >
      {/* ── Layer 0: Background ─────────────────────────────────────────── */}
      <img
        src={bgSrc}
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          zIndex: 0,
          ...GPU,
        }}
      />

      {/* ── Layer 1: Building (slides up from bottom on load) ──────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          width: '115vw',
          pointerEvents: 'none',
        }}
      >
        <img
          ref={buildingRef}
          src={buildingSrc}
          alt=""
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            ...GPU,
          }}
        />
      </div>

      {/* ── Layer 2: Left Cloud ─────────────────────────────────────────── */}
      <img
        ref={cloudLRef}
        src={cloud1Src}
        alt=""
        style={{
          position: 'absolute',
          left: '-8%',
          bottom: '22%',
          width: '55%',
          zIndex: 2,
          filter: 'blur(0.6px)',
          ...GPU,
        }}
      />

      {/* ── Layer 1: Right Cloud ────────────────────────────────────────── */}
      <img
        ref={cloudRRef}
        src={cloud2Src}
        alt=""
        style={{
          position: 'absolute',
          right: '-8%',
          bottom: '22%',
          width: '55%',
          zIndex: 2,
          filter: 'blur(0.6px)',
          ...GPU,
        }}
      />

      {/* ── Layer 2: Sky Foreground ─────────────────────────────────────── */}
      <img
        ref={skyRef}
        src={skySrc}
        alt=""
        style={{
          position: 'absolute',
          bottom: -150,
          left: 0,
          width: '150%',
          height: '34vh',
          objectPosition: 'bottom center',
          zIndex: 3,
          transformOrigin: 'bottom center',
          ...GPU,
        }}
      />

      {/* ── Layer 3: Text — centering wrapper (CSS-only, never GSAP'd) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 'clamp(7rem, 13vh, 14vh)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={textRef}
          style={{
            textAlign: 'center',
            width: '90%',
            maxWidth: '960px',
            pointerEvents: 'auto',
            ...GPU,
          }}
        >
          <p
            ref={labelRef}
            style={{
              fontSize: 'clamp(0.58rem, 0.9vw, 0.7rem)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(20,18,14,0.55)',
              marginBottom: '1.2rem',
              fontWeight: 500,
            }}
          >
            LUXURY ARCHITECTURE
          </p>

          <h1
            ref={headingRef}
            style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(2rem, 5.2vw, 4.8rem)',
              fontWeight: 700,
              color: '#1A1814',
              lineHeight: 1.15,
              marginBottom: '1.4rem',
              letterSpacing: '-0.015em',
            }}
          >
            {renderLine(heading)}
          </h1>

          <p
            ref={subRef}
            style={{
              fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
              fontWeight: 300,
              color: 'rgba(20,18,14,0.60)',
              lineHeight: 1.7,
              maxWidth: '500px',
              margin: '0 auto 2.4rem',
            }}
          >
            Designing iconic residences with vision, precision, and artistry.
          </p>

          <div
            ref={btnsRef}
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                padding: '0.9rem 2.4rem',
                background: '#1A1814',
                color: '#FAFAF8',
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Explore Projects
            </button>

            <button
              style={{
                padding: '0.9rem 2.4rem',
                background: 'rgba(26,24,20,0.07)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                color: '#1A1814',
                fontWeight: 400,
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                border: '1px solid rgba(26,24,20,0.22)',
                cursor: 'pointer',
                transition: 'background 0.25s ease, border-color 0.25s ease',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(26,24,20,0.14)';
                e.currentTarget.style.borderColor = 'rgba(26,24,20,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(26,24,20,0.07)';
                e.currentTarget.style.borderColor = 'rgba(26,24,20,0.22)';
              }}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
