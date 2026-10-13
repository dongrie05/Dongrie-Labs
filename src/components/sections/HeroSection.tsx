'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { settlePanel } from '@/lib/motion';

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
          <p className="text-[15px] font-medium text-muted">Dongrie Labs</p>
          <h1 className="display mt-4 max-w-[16ch]">{t('title')}</h1>
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
