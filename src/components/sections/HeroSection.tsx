'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { settle, settlePanel } from '@/lib/motion';

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/goncalo-dongrie05/30min';

export function HeroSection() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();

  return (
    <section className="section-pad">
      <div className="wrap">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0.01 } : settlePanel}
        >
          <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
            Dongrie <span className="text-accent">Labs</span>
          </p>
          <motion.div
            aria-hidden
            className="mt-5 h-1 w-16 origin-left rounded-full bg-warm"
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduce ? { duration: 0 } : settle}
          />
          <h1 className="display mt-6">
            <span className="block max-w-[11ch]">{t('titleLead')}</span>
            <motion.span
              className="mt-2 block max-w-[12ch] text-warm"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0.01 } : { ...settlePanel, delay: 0.1 }}
            >
              {t('titleAccent')}
            </motion.span>
          </h1>
          <p className="lede">{t('subtitle')}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={CALENDLY_URL} external variant="primary">
              {t('ctaBookCall')}
            </Button>
            <Button href="/portfolio" variant="secondary">
              {t('ctaSeeWork')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
