'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { settle } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? { duration: 0.01 } : settle}
    >
      {children}
    </motion.div>
  );
}
