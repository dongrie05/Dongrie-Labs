'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/navigation';

export function FounderSection() {
  const t = useTranslations('founder');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const avatarRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const avatarScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);

  return (
    <section ref={ref} className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="overflow-hidden rounded-3xl border border-white/[0.06] bg-navy-900/40"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative flex h-full min-h-[320px] items-center justify-center overflow-hidden bg-navy-800/20 p-12">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)',
                }}
              />
              {/* Animated rings */}
              <motion.div
                className="absolute h-52 w-52 rounded-full border border-blue-500/[0.08]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute h-72 w-72 rounded-full border border-cyan-400/[0.05]"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-blue-500/20 text-6xl font-heading font-bold text-gradient select-none"
                style={{ rotate: avatarRotate, scale: avatarScale }}
              >
                GD
              </motion.div>
            </div>

            <div className="flex flex-col justify-center p-8 lg:p-14">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  {t('sectionLabel')}
                </p>
                <h2 className="font-heading mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {t('title')}
                </h2>
                <p className="mt-3 text-lg text-blue-300/70">{t('subtitle')}</p>
                <p className="mt-6 text-base leading-relaxed text-slate-400">{t('bio')}</p>
                <Link
                  href="/about"
                  className="link-underline group mt-10 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {t('moreAbout')}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
