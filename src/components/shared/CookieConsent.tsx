'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { settle } from '@/lib/motion';

const CONSENT_KEY = 'dongrielabs-cookie-consent';

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-accepted'));
  };

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={reduce ? false : { y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? undefined : { y: 16, opacity: 0 }}
        transition={reduce ? { duration: 0.01 } : settle}
        className="nav-material fixed inset-x-0 bottom-0 z-[60] border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <div className="mx-auto flex max-w-[1060px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[15px] leading-relaxed text-ink">
            {t('message')}{' '}
            <Link href="/privacy" className="text-link underline underline-offset-2">
              {t('privacyPolicy')}
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[15px] font-medium text-ink"
            >
              {t('learnMore')}
            </Link>
            <button
              type="button"
              onClick={accept}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-[15px] font-medium text-on-accent active:scale-[0.97]"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
