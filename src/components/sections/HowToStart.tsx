'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

/**
 * No CTA button — the continuous mascot ends this beat by pointing / fading out.
 */
export function HowToStart() {
  const t = useTranslations('aiLayer.howToStart');
  const steps = ['step1', 'step2', 'step3'] as const;

  return (
    <section id="how-to-start" className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 50% at 15% 60%, rgba(196,181,253,0.1) 0%, transparent 65%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl">
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('label')}
        </motion.p>
        <motion.h2
          className="font-heading mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className="mt-5 text-lg leading-relaxed text-slate-400"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
        >
          {t('subtitle')}
        </motion.p>

        <ol className="mt-12 space-y-8">
          {steps.map((key, i) => {
            const isLast = i === steps.length - 1;
            return (
              <motion.li
                key={key}
                id={isLast ? 'mascot-point-target' : undefined}
                className="flex gap-5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.1 * i }}
              >
                <span className="font-heading text-2xl font-bold text-lilac/50 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-lg font-semibold text-white">{t(`${key}.title`)}</p>
                  <p className="mt-2 text-base leading-relaxed text-slate-400">
                    {t(`${key}.body`)}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Gesture end: no CTA button — mascot points here then fades */}
        <motion.p
          id="mascot-end"
          className="mt-14 inline-flex items-center gap-3 text-sm italic text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-lilac/70"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
          {t('mascotCue')}
        </motion.p>
      </div>
    </section>
  );
}
