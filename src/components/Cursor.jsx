import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ringRef = useRef(null);

  const dotX  = useSpring(mx, { stiffness: 900, damping: 30,  mass: 0.3 });
  const dotY  = useSpring(my, { stiffness: 900, damping: 30,  mass: 0.3 });
  const ringX = useSpring(mx, { stiffness: 300, damping: 28,  mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 300, damping: 28,  mass: 0.6 });

  useEffect(() => {
    const isTouchDevice = !window.matchMedia('(hover: hover)').matches;
    if (isTouchDevice) return;

    const move = e => { mx.set(e.clientX); my.set(e.clientY); };

    const addHover = () => ringRef.current?.classList.add('is-hover');
    const removeHover = () => ringRef.current?.classList.remove('is-hover');
    const addDrag = () => ringRef.current?.classList.add('is-drag');
    const removeDrag = () => ringRef.current?.classList.remove('is-drag');

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });
    window.addEventListener('mousedown', addDrag);
    window.addEventListener('mouseup', removeDrag);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', addDrag);
      window.removeEventListener('mouseup', removeDrag);
    };
  }, [mx, my]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}
