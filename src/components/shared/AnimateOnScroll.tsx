'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { settle } from '@/lib/motion';

type AnimateVariant = 'fadeUp' | 'fadeIn' | 'scale' | 'slideLeft' | 'slideRight';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  variant?: AnimateVariant;
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.2,
  variant = 'fadeUp',
}: AnimateOnScrollProps) {
  const reduce = useReducedMotion();
  const travel = variant === 'fadeIn' || variant === 'scale' ? 0 : 12;

  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ ...settle, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
