'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { ArrowRight } from 'lucide-react';

export function ProofStrip() {
  const t = useTranslations('proofStrip');

  return (
    <motion.section
      className="relative px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/[0.06] bg-navy-900/40 px-6 py-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 md:gap-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            {t('label')}
          </p>
          <p className="text-center font-heading text-lg font-semibold text-white sm:text-left">
            {t('stat')}
          </p>
          <p className="text-center text-slate-400 sm:text-left">
            {t('quote')}
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
