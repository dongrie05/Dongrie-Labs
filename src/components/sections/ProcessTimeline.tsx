'use client';

import { useTranslations } from 'next-intl';
import { Phone, FileText, Hammer, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Link } from '@/navigation';

const steps = [
  { icon: Phone, key: 'step1', num: '01', color: 'from-blue-500 to-blue-400' },
  { icon: FileText, key: 'step2', num: '02', color: 'from-violet-500 to-blue-400' },
  { icon: Hammer, key: 'step3', num: '03', color: 'from-cyan-500 to-blue-400' },
  { icon: Rocket, key: 'step4', num: '04', color: 'from-emerald-500 to-cyan-400' },
] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function ProcessTimeline() {
  const t = useTranslations('process');

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <AnimateOnScroll>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {t('sectionLabel')}
            </p>
            <h2 className="font-heading mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg text-slate-400">{t('subtitle')}</p>
          </div>
        </AnimateOnScroll>

        {/* Connecting line (desktop) */}
        <div className="pointer-events-none absolute top-[340px] left-[10%] right-[10%] hidden h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent xl:block" />

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 p-7 transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                <div className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${step.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="flex items-start justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${step.color}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="font-heading text-5xl font-bold text-white/[0.03] select-none">
                    {step.num}
                  </span>
                </div>

                <h3 className="font-heading mt-6 text-xl font-semibold text-white">
                  {t(`${step.key}Title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {t(`${step.key}Desc`)}
                </p>

                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 xl:flex items-center justify-center">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-navy-950/90">
                      <ArrowRight className="h-3 w-3 text-slate-500" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimateOnScroll className="mt-14">
          <MagneticButton strength={0.15}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {t('ctaQuote')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
