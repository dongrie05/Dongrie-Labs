'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';

/**
 * Visual spine of the homepage: scroll-linked mascot that travels through
 * hero → problem → how → impact → how-to-start (point / fade) → secondary offer.
 */
export function ContinuousMascot() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Horizontal: right in hero, drifts left through mid, right again for offers, exits
  const x = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.42, 0.55, 0.68, 0.82, 1],
    ['32vw', '28vw', '22vw', '18vw', '12vw', '8vw', '24vw', '40vw']
  );

  // Vertical: sticks to mid-viewport while traveling the narrative
  const y = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.42, 0.55, 0.68, 0.82, 1],
    ['18vh', '22vh', '28vh', '30vh', '34vh', '36vh', '28vh', '40vh']
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.55, 0.68, 0.82, 1],
    [1, 0.72, 0.55, 0.48, 0.42, 0.5, 0.35]
  );

  // Visible in hero via the in-section image; floating copy kicks in after hero
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.12, 0.55, 0.64, 0.72, 0.78, 0.9, 1],
    [0, 0, 1, 1, 1, 0.15, 0.85, 0.5, 0]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.28, 0.55, 0.64, 0.72, 0.85],
    [0, -4, 6, 18, -8, 0]
  );

  // Pointing lean near "how to start"
  const skew = useTransform(scrollYProgress, [0.55, 0.64, 0.72], [0, -8, 0]);

  const filter = useMotionTemplate`drop-shadow(0 20px 40px rgba(196, 181, 253, 0.25))`;

  return (
    <div ref={trackRef} className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      <motion.div
        className="fixed top-0 left-0 hidden will-change-transform lg:block"
        style={{
          x,
          y,
          scale,
          opacity,
          rotate,
          skewY: skew,
          filter,
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-[220px] w-[180px]"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 68% 78% at 50% 48%, #000 42%, transparent 78%)',
            maskImage:
              'radial-gradient(ellipse 68% 78% at 50% 48%, #000 42%, transparent 78%)',
          }}
        >
          <Image
            src="/images/brand/mascote-dongrie.png"
            alt=""
            fill
            className="object-contain"
            sizes="180px"
            priority={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
