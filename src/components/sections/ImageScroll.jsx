import { useEffect, useRef } from 'react';

const GIFS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW1 = GIFS.slice(0, 11);
const ROW2 = GIFS.slice(11);

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
          <img
            key={i}
            src={src}
            loading="lazy"
            alt=""
            style={{
              width: '420px',
              height: '270px',
              objectFit: 'cover',
              borderRadius: '1rem',
              flexShrink: 0,
              display: 'block',
            }}
          />
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
        background: '#0C0C0C',
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
