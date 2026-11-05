'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const scenarios = ['shop', 'clinic'] as const;

export function HowAILayerHelps() {
  const t = useTranslations('aiLayer.howHelps');

  return (
    <section id="how-helps" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(167,139,250,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('label')}
        </motion.p>
        <motion.h2
          className="font-heading mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className="mt-5 max-w-2xl text-lg text-slate-400"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t('subtitle')}
        </motion.p>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {scenarios.map((key, i) => (
            <motion.article
              key={key}
              className="relative"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.1 * i }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lilac/80">
                {t(`${key}.eyebrow`)}
              </p>
              <h3 className="font-heading mt-3 text-2xl font-bold text-white">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                {t(`${key}.body`)}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-10 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('disclaimer')}
        </motion.p>
      </div>
    </section>
  );
}
