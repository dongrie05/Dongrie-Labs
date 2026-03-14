'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Smartphone,
  Brain,
  Workflow,
  Rocket,
  Plug,
  Code2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { ServiceDetailModal } from '@/components/shared/ServiceDetailModal';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Brain,
  Workflow,
  Rocket,
  Plug,
  Code2,
};

const serviceMsgKeys: Record<string, string> = {
  mobile: 'mobileApps',
  ai: 'aiIntegration',
  automation: 'businessAutomation',
  mvp: 'mvpDevelopment',
  api: 'apiIntegration',
  custom: 'customSoftware',
};

const iconColors: Record<string, { gradient: string; glow: string }> = {
  mobile: { gradient: 'from-blue-500 to-blue-400', glow: 'group-hover:shadow-blue-500/20' },
  ai: { gradient: 'from-violet-500 to-violet-400', glow: 'group-hover:shadow-violet-500/20' },
  automation: { gradient: 'from-cyan-500 to-cyan-400', glow: 'group-hover:shadow-cyan-500/20' },
  mvp: { gradient: 'from-orange-500 to-orange-400', glow: 'group-hover:shadow-orange-500/20' },
  api: { gradient: 'from-emerald-500 to-emerald-400', glow: 'group-hover:shadow-emerald-500/20' },
  custom: { gradient: 'from-pink-500 to-pink-400', glow: 'group-hover:shadow-pink-500/20' },
};

import { services } from '@/lib/data/services';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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

export function ServicesOverview() {
  const t = useTranslations('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <AnimateOnScroll>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {t('sectionLabel')}
            </p>
            <h2 className="font-heading mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {t('overviewTitle')}
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              {t('overviewSubtitle')}
            </p>
          </div>
        </AnimateOnScroll>

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code2;
            const msgKey = serviceMsgKeys[service.id] ?? 'customSoftware';
            const colors = iconColors[service.id] ?? iconColors.custom;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/50 p-7 transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20">
                  {/* Top accent line on hover */}
                  <div className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${colors.gradient} scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100`} />

                  <span className="absolute right-5 top-5 font-heading text-5xl font-bold text-white/[0.02] select-none">
                    0{i + 1}
                  </span>

                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl ${colors.gradient} ${colors.glow}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="font-heading mt-6 text-xl font-semibold text-white">
                    {t(`${msgKey}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {t(`${msgKey}.shortDesc`)}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className="mt-6 flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-all duration-300 group-hover:text-blue-400 group-hover:gap-2.5"
                  >
                    {t('learnMore')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <ServiceDetailModal
          serviceId={selectedServiceId ?? ''}
          open={selectedServiceId !== null}
          onClose={() => setSelectedServiceId(null)}
        />

        <AnimateOnScroll className="mt-12">
          <Link
            href="/services"
            className="link-underline inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white"
          >
            {t('exploreAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
