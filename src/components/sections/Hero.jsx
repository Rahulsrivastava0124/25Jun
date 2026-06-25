import { useLayoutEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { gsap, ScrollTrigger } from '../../lib/gsap';

import g6  from '../../assets/gallery/Gallery (6).webp';
import g7  from '../../assets/gallery/Gallery (7).webp';
import g8  from '../../assets/gallery/Gallery (8).webp';
import g9  from '../../assets/gallery/Gallery (9).webp';
import g10 from '../../assets/gallery/Gallery (10).webp';
import g11 from '../../assets/gallery/Gallery (11).webp';
import g12 from '../../assets/gallery/Gallery (12).webp';

const SLIDES = [g6, g7, g8, g9, g10, g11, g12];
const LINES  = ['Where Every', 'Detail Speaks', 'of Legacy.'];

export default function Hero({ ready }) {
  const sectionRef  = useRef(null);
  const contentRef  = useRef(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo' } });

      tl.to('.hl-eyebrow',    { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to('.hl-line-inner', { y: 0, stagger: 0.13, duration: 1.1 }, 0.2)
        .to('.hl-sub',        { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
        .to('.hl-stats',      { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
    }, contentRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [ready]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── Swiper slideshow ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          speed={1400}
          pagination={{ clickable: true }}
          style={{ width: '100%', height: '100%' }}
        >
          {SLIDES.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`AURUM Estates — slide ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: 'scale(1.04)',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(250,250,248,0.96) 0%, rgba(250,250,248,0.55) 45%, rgba(250,250,248,0.12) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Text content ── */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '0 4vw 6vw',
        }}
      >
        <p
          className="hl-eyebrow"
          style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--c-gold)',
            marginBottom: '1.8rem',
            opacity: 0,
            transform: 'translateY(18px)',
          }}
        >
          Mumbai Ultra-Luxury · Est. 2004
        </p>

        <h1
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(3.8rem, 8vw, 8.5rem)',
            lineHeight: 0.95,
            color: 'var(--c-ink)',
            marginBottom: '3.5rem',
          }}
        >
          {LINES.map((line, i) => (
            <span
              key={i}
              className="hl-line"
              style={{ display: 'block', overflow: 'hidden' }}
            >
              <span
                className="hl-line-inner"
                style={{
                  display: 'block',
                  transform: 'translateY(108%)',
                  fontStyle: i === 1 ? 'italic' : 'normal',
                  color: i === 1 ? 'var(--c-gold-dk)' : 'var(--c-ink)',
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            maxWidth: '680px',
          }}
        >
          <p
            className="hl-sub"
            style={{
              fontFamily: '"Nunito Sans", sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              lineHeight: 1.75,
              color: 'var(--c-ink-mid)',
              opacity: 0,
              transform: 'translateY(20px)',
            }}
          >
            Curating Mumbai's most extraordinary addresses for those who understand that true luxury lives in the details.
          </p>

          <div
            className="hl-stats"
            style={{
              display: 'flex',
              gap: '2rem',
              opacity: 0,
              transform: 'translateY(20px)',
              alignSelf: 'end',
            }}
          >
            {[['₹2,400 Cr', 'Portfolio'], ['340+', 'Properties'], ['20 Yrs', 'Excellence']].map(([val, lbl]) => (
              <div key={lbl}>
                <p
                  style={{
                    fontFamily: '"EB Garamond", Georgia, serif',
                    fontWeight: 400,
                    fontSize: '1.5rem',
                    color: 'var(--c-gold-dk)',
                  }}
                >
                  {val}
                </p>
                <p
                  style={{
                    fontFamily: '"Courier Prime", monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--c-ink-dim)',
                  }}
                >
                  {lbl}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '5rem',
          right: '4vw',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <span
          style={{
            fontFamily: '"Courier Prime", monospace',
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--c-ink-dim)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
        <div
          className="scroll-cue-line"
          style={{
            width: '1px',
            height: '48px',
            background: 'var(--c-gold)',
          }}
        />
      </div>
    </section>
  );
}
