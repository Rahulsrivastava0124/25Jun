import { motion } from 'framer-motion';
import useMagneticEffect from '../../hooks/useMagneticEffect';

export default function MagneticButton({ children, className = '', style = {}, onClick }) {
  const { ref, sx, sy, handleMove, handleLeave } = useMagneticEffect(0.38);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`mag-btn ${className}`}
    >
      {children}
    </motion.button>
  );
}
