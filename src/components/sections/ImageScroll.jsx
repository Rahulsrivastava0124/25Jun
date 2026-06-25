import { useEffect, useRef } from 'react';

import g1  from '../../assets/gallery/Gallery (1).webp';
import g2  from '../../assets/gallery/Gallery (2).webp';
import g3  from '../../assets/gallery/Gallery (3).webp';
import g4  from '../../assets/gallery/Gallery (4).webp';
import g5  from '../../assets/gallery/Gallery (5).webp';
import g6  from '../../assets/gallery/Gallery (6).webp';
import g7  from '../../assets/gallery/Gallery (7).webp';
import g8  from '../../assets/gallery/Gallery (8).webp';
import g9  from '../../assets/gallery/Gallery (9).webp';
import g10 from '../../assets/gallery/Gallery (10).webp';
import g11 from '../../assets/gallery/Gallery (11).webp';
import g12 from '../../assets/gallery/Gallery (12).webp';
import gMain from '../../assets/gallery/Gallery.webp';

const ROW1 = [g1, g2, g3, g4, g5, g6, gMain];
const ROW2 = [g7, g8, g9, g10, g11, g12, g1];

const TRIPLED_ROW1 = [...ROW1, ...ROW1, ...ROW1];
const TRIPLED_ROW2 = [...ROW2, ...ROW2, ...ROW2];

function ImageRow({ images, direction }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        data-row={direction}
        style={{
          display: 'flex',
          gap: '12px',
          willChange: 'transform',
          width: 'max-content',
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              width: '420px',
              height: '270px',
              borderRadius: '1rem',
              flexShrink: 0,
              overflow: 'hidden',
              background: '#111',
            }}
          >
            <img
              src={src}
              loading="lazy"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ImageScroll() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    let sectionTop = section.getBoundingClientRect().top + window.scrollY;

    const onResize = () => {
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
    };

    const onScroll = () => {
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      if (row1Ref.current) {
        row1Ref.current.querySelector('[data-row="right"]').style.transform =
          `translateX(${offset - 200}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.querySelector('[data-row="left"]').style.transform =
          `translateX(${-(offset - 200)}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FFFFFF',
        paddingTop: 'clamp(6rem, 10vw, 10rem)',
        paddingBottom: '2.5rem',
        overflow: 'hidden',
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <div ref={row1Ref}>
          <ImageRow images={TRIPLED_ROW1} direction="right" />
        </div>
        <div ref={row2Ref}>
          <ImageRow images={TRIPLED_ROW2} direction="left" />
        </div>
      </div>
    </section>
  );
}
