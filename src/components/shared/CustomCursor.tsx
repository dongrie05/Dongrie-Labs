'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'text' | 'hidden';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(mousePos.current.x);
        cursorY.set(mousePos.current.y);
        rafRef.current = 0;
      });
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      setIsTouch(true);
      return;
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      const textElement = target.closest('h1, h2, h3, p, [data-cursor="text"]');
      const hiddenElement = target.closest('[data-cursor="hidden"]');

      if (hiddenElement) setVariant('hidden');
      else if (interactive) setVariant('hover');
      else if (textElement) setVariant('text');
      else setVariant('default');
    };

    document.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  if (isTouch) return null;

  const sizes: Record<CursorVariant, number> = {
    default: 12,
    hover: 48,
    text: 4,
    hidden: 0,
  };

  const size = sizes[variant];

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: size,
          height: size,
          backgroundColor: variant === 'hover' ? 'rgba(255,255,255,0.08)' : '#fff',
          border: variant === 'hover' ? '1px solid rgba(255,255,255,0.5)' : 'none',
        }}
        animate={{
          width: size,
          height: size,
          opacity: variant === 'hidden' ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      />
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
