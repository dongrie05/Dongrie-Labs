'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Link } from '@/navigation';
import { MagneticButton } from '@/components/shared/MagneticButton';

/**
 * Active hero = Gonçalo option (capacity narrative), matching media/hero-referencia.png.
 *
 * Pain option (A/B later) — do not render on the live page:
 *   hero.painTitle / hero.painSubtitle
 */

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

export function HeroAILayer() {
  const t = useTranslations('hero');
  const title = t('title');
  const words = title.split(' ');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const mascotY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const mascotOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="ai-layer"
      ref={sectionRef}
      className="relative flex min-h-[100vh] items-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="dongrie-wordmark-pattern pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 75% 45%, rgba(167,139,250,0.14) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 20% 80%, rgba(59,130,246,0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to top, var(--navy-950) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
        <div className="flex max-w-xl flex-col justify-center" style={{ perspective: '1000px' }}>
          <motion.h1
            className="font-heading flex max-w-full flex-wrap gap-x-[0.28em] gap-y-1 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, i) => (
              <motion.span key={`${word}-${i}`} variants={wordVariant} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="mt-7 max-w-lg text-lg leading-relaxed text-slate-300 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.55 }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.55 }}
          >
            <MagneticButton strength={0.18}>
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-white px-8 py-3.5 text-base font-semibold text-navy-950 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('ctaBookCall')}
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* <md: in-section mascot. md+: ContinuousMascot owns the character; spacer keeps the split layout */}
        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none lg:justify-end">
          <motion.div
            className="relative aspect-[4/5] w-full max-w-[420px] md:hidden"
            style={{ y: mascotY, opacity: mascotOpacity }}
            initial={{ opacity: 0, x: 36, filter: 'blur(12px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.35, duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/brand/mascote-dongrie.png"
                alt={t('mascotAlt')}
                fill
                priority
                className="object-contain drop-shadow-[0_30px_60px_rgba(196,181,253,0.28)]"
                sizes="80vw"
              />
            </motion.div>
          </motion.div>
          <div
            className="relative hidden aspect-[4/5] w-full max-w-[420px] md:block lg:max-w-[480px]"
            aria-hidden
          />
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
            {t('scroll')}
          </span>
          <div className="flex h-10 w-6 justify-center overflow-hidden rounded-full border border-white/15 pt-2">
            <motion.div
              className="h-2 w-0.5 rounded-full bg-white/40"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
