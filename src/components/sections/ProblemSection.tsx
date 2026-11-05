'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const pains = ['pain1', 'pain2', 'pain3'] as const;

export function ProblemSection() {
  const t = useTranslations('aiLayer.problem');

  return (
    <section id="problem" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
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
    </section>
  );
}
