import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function useMouseParallax(strength = 20) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 150, damping: 20 });
  const y = useSpring(rawY, { stiffness: 150, damping: 20 });

  const rotateY = useTransform(rawX, [-1, 1], [-6, 6]);
  const rotateX = useTransform(rawY, [-1, 1], [4, -4]);

  const handleMove = e => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    rawY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };

  const handleLeave = () => { rawX.set(0); rawY.set(0); };

  return {
    ref,
    x: useTransform(x, v => v * strength),
    y: useTransform(y, v => v * strength),
    rotateX, rotateY,
    handleMove, handleLeave,
  };
}
