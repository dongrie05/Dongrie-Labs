'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimateVariant = 'fadeUp' | 'fadeIn' | 'scale' | 'slideLeft' | 'slideRight';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  variant?: AnimateVariant;
}

const variants: Record<AnimateVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeIn: {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
};

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.15,
  variant = 'fadeUp',
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants[variant]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
