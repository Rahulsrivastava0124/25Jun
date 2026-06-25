import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

export default function ScrollProgress() {
  useLayoutEffect(() => {
    gsap.to('#scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
      },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return <div id="scroll-progress" />;
}
