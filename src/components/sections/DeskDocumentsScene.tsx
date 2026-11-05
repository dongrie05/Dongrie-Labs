'use client';

import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

type PaperPose = {
  x0: number;
  y0: number;
  r0: number;
  x1: number;
  y1: number;
  r1: number;
  z: number;
  tint: string;
  lines: number;
};

const PAPERS: PaperPose[] = [
  { x0: -118, y0: -42, r0: -18, x1: -6, y1: -10, r1: -2, z: 3, tint: '#f8fafc', lines: 5 },
  { x0: 96, y0: -58, r0: 14, x1: 4, y1: -6, r1: 1.5, z: 4, tint: '#eef2ff', lines: 4 },
  { x0: -72, y0: 54, r0: 9, x1: -2, y1: 2, r1: -1, z: 5, tint: '#faf5ff', lines: 6 },
  { x0: 110, y0: 38, r0: -11, x1: 8, y1: 6, r1: 2.5, z: 2, tint: '#f1f5f9', lines: 3 },
  { x0: 8, y0: -78, r0: 22, x1: 0, y1: -14, r1: 0.5, z: 6, tint: '#ffffff', lines: 5 },
  { x0: -140, y0: 8, r0: -27, x1: -10, y1: 8, r1: -3, z: 1, tint: '#ede9fe', lines: 4 },
];

function Paper({
  pose,
  progress,
  label,
}: {
  pose: PaperPose;
  progress: MotionValue<number>;
  label: string;
}) {
  const x = useTransform(progress, [0, 0.45, 0.85, 1], [pose.x0, pose.x0 * 0.35, pose.x1, pose.x1]);
  const y = useTransform(progress, [0, 0.45, 0.85, 1], [pose.y0, pose.y0 * 0.4, pose.y1, pose.y1]);
  const rotate = useTransform(
    progress,
    [0, 0.45, 0.85, 1],
    [pose.r0, pose.r0 * 0.4, pose.r1, pose.r1]
  );
  const shadow = useTransform(
    progress,
    [0, 0.85, 1],
    [
      '0 18px 30px rgba(0,0,0,0.35)',
      '0 10px 18px rgba(0,0,0,0.22)',
      '0 6px 12px rgba(0,0,0,0.18)',
    ]
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[132px] w-[100px] origin-center rounded-[4px] border border-navy-900/10 sm:h-[150px] sm:w-[114px]"
      style={{
        x,
        y,
        rotate,
        zIndex: pose.z,
        backgroundColor: pose.tint,
        boxShadow: shadow,
        marginLeft: -50,
        marginTop: -66,
      }}
      aria-hidden
    >
      <div className="flex h-full flex-col gap-1.5 p-3">
        <div className="h-1.5 w-10 rounded-full bg-navy-900/25" />
        {Array.from({ length: pose.lines }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full bg-navy-900/15"
            style={{ width: `${70 - i * 8}%` }}
          />
        ))}
        <span className="mt-auto text-[8px] font-medium uppercase tracking-wider text-navy-900/35">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Scroll-scrubbed desk: scattered paperwork → tidy stack.
 * Lives in the Problem beat; mascot watches from the continuous spine.
 */
export function DeskDocumentsScene() {
  const t = useTranslations('aiLayer.desk');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 35%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 28,
    mass: 0.45,
  });

  const deskGlow = useTransform(
    progress,
    [0, 0.5, 1],
    [
      'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(248,113,113,0.12), transparent 70%)',
      'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(196,181,253,0.14), transparent 70%)',
      'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(167,139,250,0.22), transparent 70%)',
    ]
  );

  const statusOpacityMessy = useTransform(progress, [0, 0.35, 0.5], [1, 0.4, 0]);
  const statusOpacityTidy = useTransform(progress, [0.45, 0.7, 1], [0, 0.7, 1]);
  const cupX = useTransform(progress, [0, 1], [0, 10]);
  const cupRotate = useTransform(progress, [0, 1], [-6, 0]);
  const penRotate = useTransform(progress, [0, 1], [38, 8]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-xl" aria-label={t('aria')}>
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[2rem] border border-white/[0.07] bg-navy-900/40">
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: deskGlow }} />

        {/* Desk surface */}
        <div className="absolute inset-x-[8%] bottom-[10%] top-[22%] rounded-[1.25rem]">
          <div
            className="absolute inset-0 rounded-[1.25rem]"
            style={{
              background:
                'linear-gradient(160deg, #243056 0%, #1a2240 45%, #121829 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px rgba(0,0,0,0.35)',
            }}
          />
          {/* Wood grain suggestion */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-30 mix-blend-soft-light"
            style={{
              backgroundImage:
                'repeating-linear-gradient(95deg, transparent 0 10px, rgba(255,255,255,0.03) 10px 11px)',
            }}
          />

          {/* Papers */}
          <div className="absolute inset-0">
            {PAPERS.map((pose, i) => (
              <Paper key={i} pose={pose} progress={progress} label={t('docLabel')} />
            ))}
          </div>

          {/* Coffee cup — settles as the desk tidies */}
          <motion.div
            className="absolute bottom-[14%] right-[12%] h-14 w-11"
            style={{ x: cupX, rotate: cupRotate }}
            aria-hidden
          >
            <div className="relative h-10 w-9 rounded-b-xl rounded-t-md bg-gradient-to-b from-slate-200 to-slate-400 shadow-lg">
              <div className="absolute -right-3 top-2 h-5 w-3 rounded-r-full border-2 border-slate-300" />
              <div className="absolute inset-x-1 top-1 h-2 rounded-sm bg-navy-900/40" />
            </div>
          </motion.div>

          {/* Pen */}
          <motion.div
            className="absolute bottom-[18%] left-[14%] h-1.5 w-16 rounded-full"
            style={{
              rotate: penRotate,
              background: 'linear-gradient(90deg, #c4b5fd, #64748b)',
            }}
            aria-hidden
          />
        </div>

        {/* Status captions */}
        <motion.p
          className="absolute left-5 top-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-300/80 sm:left-6 sm:top-5"
          style={{ opacity: statusOpacityMessy }}
        >
          {t('messy')}
        </motion.p>
        <motion.p
          className="absolute left-5 top-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-lilac sm:left-6 sm:top-5"
          style={{ opacity: statusOpacityTidy }}
        >
          {t('tidy')}
        </motion.p>
      </div>
    </div>
  );
}
