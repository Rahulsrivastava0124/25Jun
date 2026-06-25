import { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from '../lib/gsap';

export default function useScrollTrigger(callback, deps = []) {
  const ctx = useRef(null);

  useLayoutEffect(() => {
    ctx.current = callback();
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (ctx.current && typeof ctx.current.revert === 'function') {
        ctx.current.revert();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
