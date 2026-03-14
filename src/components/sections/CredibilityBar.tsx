'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { StatsCounter } from '@/components/ui/StatsCounter';

const stats: Array<{
  value: number | string;
  key: 'appsLaunched' | 'months' | 'platforms' | 'projectRange';
  suffix?: string;
  isNumber?: boolean;
}> = [
  { value: 7, key: 'appsLaunched', isNumber: true },
  { value: 3, key: 'months', isNumber: true },
  { value: '5 + 2', key: 'platforms' },
  { value: '€2k–€10k', key: 'projectRange' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function CredibilityBar() {
  const t = useTranslations('credibility');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={ref} className="relative py-28">
      <div className="absolute inset-0 border-y border-white/[0.04]" />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: bgOpacity,
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              variants={itemVariants}
              className="group relative flex flex-col items-center py-10 px-6 text-center"
            >
              {i > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent lg:block" />
              )}
              <p className="font-heading text-5xl font-bold tracking-tight md:text-7xl">
                {stat.isNumber && typeof stat.value === 'number' ? (
                  <span className="text-gradient-strong">
                    <StatsCounter value={stat.value} />
                  </span>
                ) : (
                  <span className="text-gradient">{stat.value}</span>
                )}
              </p>
              <p className="mt-4 text-xs font-medium text-slate-500 uppercase tracking-[0.25em]">
                {t(stat.key)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
