'use client';

import { useTranslations } from 'next-intl';
import { User, Zap, Clock, CircleDollarSign, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

const items: Array<{ icon: LucideIcon; key: 'accountability' | 'aiPowered' | 'weeksNotMonths' | 'pricing'; num: string }> = [
  { icon: User, key: 'accountability', num: '01' },
  { icon: Zap, key: 'aiPowered', num: '02' },
  { icon: Clock, key: 'weeksNotMonths', num: '03' },
  { icon: CircleDollarSign, key: 'pricing', num: '04' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function WhyDongrieLabs() {
  const t = useTranslations('why');

  return (
    <section className="relative px-4 py-28 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 55%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header: left-aligned, strong typography */}
        <AnimateOnScroll>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              {t('sectionLabel')}
            </p>
            <h2 className="font-heading mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              {t('title')}
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Grid: 4 cards, 2x2 on desktop */}
        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {items.map((item) => (
            <motion.article
              key={item.key}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl border border-white/[0.06] bg-navy-900/40 p-8 transition-all duration-500 hover:border-white/[0.1] hover:bg-navy-900/70 sm:p-8 lg:p-10"
            >
              {/* Large number - background element */}
              <span
                className="font-heading absolute right-6 top-6 text-7xl font-bold text-white/[0.04] select-none sm:right-8 sm:top-8 lg:text-8xl"
                aria-hidden
              >
                {item.num}
              </span>

              {/* Icon */}
              <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-slate-400 transition-all duration-300 group-hover:border-blue-500/20 group-hover:bg-blue-500/5 group-hover:text-blue-400">
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              <h3 className="font-heading relative text-xl font-semibold text-white sm:text-2xl">
                {t(`${item.key}.title`)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400 sm:text-base">
                {t(`${item.key}.desc`)}
              </p>

              {/* Bottom accent on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-px scale-x-0 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent transition-transform duration-500 group-hover:scale-x-100 lg:left-10 lg:right-10" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
