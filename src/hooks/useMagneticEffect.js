import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export default function useMagneticEffect(strength = 0.38) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 12, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 200, damping: 12, mass: 0.8 });

  const handleMove = e => {
    const r  = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top  + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return { ref, sx, sy, handleMove, handleLeave };
}
