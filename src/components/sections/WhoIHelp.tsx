'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function WhoIHelp() {
  const t = useTranslations('whoIHelp');

  return (
    <motion.section
      className="relative px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {t('label')}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-slate-300 sm:text-xl">
          {t('text')}
        </p>
        <div className="mt-6 flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.06] bg-navy-800/60 text-slate-500">
            <Users className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
