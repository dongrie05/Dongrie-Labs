'use client';

import Image from 'next/image';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { useRef } from 'react';

/**
 * Visual spine: one scroll-linked mascot travels the homepage with soft springs.
 * Hero (large, right) → problem/how/impact (drifts) → how-to-start (points + fades)
 * → secondary offers (brief soft handoff) → gone at about.
 */
export function ContinuousMascot() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Soft section-to-section motion (spring the progress, then map poses)
  const progress = useSpring(scrollYProgress, {
    stiffness: 48,
    damping: 28,
    mass: 0.55,
    restDelta: 0.0005,
  });

  // Progress landmarks (approx section centers along the page track):
  // 0.00 hero | 0.16 problem+desk | 0.30 how | 0.42 impact
  // 0.52 how-to-start | 0.62 point | 0.70 fade | 0.78 offers | 0.92 about

  const x = useTransform(
    progress,
    [0, 0.12, 0.2, 0.34, 0.46, 0.56, 0.64, 0.72, 0.82, 0.94, 1],
    [
      '56vw', // hero right
      '58vw',
      '72vw', // problem — watches the desk tidy up
      '64vw', // how helps
      '60vw', // impact
      '48vw', // how-to-start — moves in
      '36vw', // point toward steps
      '42vw', // soft exit
      '68vw', // secondary offers handoff
      '78vw',
      '90vw',
    ]
  );

  const y = useTransform(
    progress,
    [0, 0.12, 0.2, 0.34, 0.46, 0.56, 0.64, 0.72, 0.82, 0.94, 1],
    [
      '16vh',
      '20vh',
      '34vh', // align with sticky desk
      '30vh',
      '32vh',
      '34vh',
      '38vh', // lower while pointing at steps
      '42vh',
      '24vh',
      '30vh',
      '50vh',
    ]
  );

  const scale = useTransform(
    progress,
    [0, 0.1, 0.22, 0.46, 0.56, 0.64, 0.72, 0.82, 1],
    [1.05, 0.92, 0.62, 0.52, 0.48, 0.55, 0.4, 0.46, 0.28]
  );

  // Hero uses in-section image on small screens; floating spine owns lg+ from the start
  const opacity = useTransform(
    progress,
    [0, 0.08, 0.14, 0.5, 0.58, 0.66, 0.72, 0.78, 0.86, 0.94, 1],
    [1, 1, 1, 1, 1, 0.95, 0.08, 0.75, 0.55, 0.12, 0]
  );

  // Gentle lean through mid narrative; stronger tilt = “pointing” at how-to-start
  const rotate = useTransform(
    progress,
    [0, 0.22, 0.4, 0.54, 0.62, 0.7, 0.8, 0.92],
    [0, -3, 4, 8, 22, 6, -4, 0]
  );

  const skewY = useTransform(progress, [0.5, 0.6, 0.68, 0.74], [0, -6, -10, 0]);

  // Soft glow intensifies while pointing
  const glow = useTransform(
    progress,
    [0, 0.5, 0.62, 0.72, 0.85],
    [0.22, 0.28, 0.45, 0.12, 0.2]
  );
  const filter = useMotionTemplate`drop-shadow(0 24px 48px rgba(196, 181, 253, ${glow}))`;

  const pointOpacity = useTransform(progress, [0.52, 0.58, 0.66, 0.72], [0, 1, 1, 0]);
  const pointX = useTransform(progress, [0.52, 0.62], [8, -10]);

  return (
    <div
      ref={trackRef}
      className="pointer-events-none absolute inset-0 z-30 hidden md:block"
      aria-hidden
    >
      <motion.div
        className="fixed top-0 left-0 will-change-transform"
        style={{ x, y, scale, opacity, rotate, skewY, filter }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative h-[260px] w-[210px] lg:h-[340px] lg:w-[280px]"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 78% at 50% 48%, #000 40%, transparent 78%)',
            maskImage:
              'radial-gradient(ellipse 70% 78% at 50% 48%, #000 40%, transparent 78%)',
          }}
        >
          <Image
            src="/images/brand/mascote-dongrie.png"
            alt=""
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 280px, 210px"
            priority
          />

          {/* Pointing cue: soft lilac chevron toward content during how-to-start */}
          <motion.div
            className="absolute left-[-6%] top-[46%] h-10 w-10 -translate-y-1/2"
            style={{ opacity: pointOpacity, x: pointX }}
          >
            <span className="block h-full w-full rotate-[-135deg] rounded-sm border-l-2 border-b-2 border-lilac/80" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
