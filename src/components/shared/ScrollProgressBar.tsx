'use client';

import { useScroll, motion } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #3b82f6, #22d3ee, #3b82f6)',
      }}
    />
  );
}
