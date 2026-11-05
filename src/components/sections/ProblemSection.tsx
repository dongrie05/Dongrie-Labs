'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DeskDocumentsScene } from './DeskDocumentsScene';

const pains = ['pain1', 'pain2', 'pain3'] as const;

export function ProblemSection() {
  const t = useTranslations('aiLayer.problem');

  return (
    <section id="problem" className="relative px-4 py-24 sm:px-6 lg:min-h-[140vh] lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <div className="lg:pt-8">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
          >
            {t('label')}
          </motion.p>
          <motion.h2
            className="font-heading mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('subtitle')}
          </motion.p>

          <ul className="mt-12 space-y-5">
            {pains.map((key, i) => (
              <motion.li
                key={key}
                className="flex gap-4 border-l-2 border-lilac/40 pl-5"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
              >
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{t(key)}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:sticky lg:top-28 lg:pt-6"
        >
          <DeskDocumentsScene />
          <p className="mt-4 text-center text-xs text-slate-500 sm:text-sm">
            {t('deskHint')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
