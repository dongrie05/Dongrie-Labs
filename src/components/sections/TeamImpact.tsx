'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const metrics = ['metric1', 'metric2', 'metric3'] as const;

export function TeamImpact() {
  const t = useTranslations('aiLayer.impact');

  return (
    <section id="team-impact" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('label')}
        </motion.p>

        {/* Gonçalo line first */}
        <motion.blockquote
          className="font-heading mt-6 max-w-3xl text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          {t('goncaloLine')}
        </motion.blockquote>
        <motion.p
          className="mt-4 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          — {t('attribution')}
        </motion.p>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {metrics.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
            >
              <p className="font-heading text-3xl font-bold text-lilac md:text-4xl">
                {t(`${key}.value`)}
                <span className="align-super text-lg text-lilac/70">*</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {t(`${key}.label`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-xs leading-relaxed text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          * {t('estimateNote')}
        </motion.p>
      </div>
    </section>
  );
}
