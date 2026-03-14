'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const CONSENT_KEY = 'dongrielabs-cookie-consent';

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = typeof window !== 'undefined' ? localStorage.getItem(CONSENT_KEY) : null;
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-accepted'));
  };

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed bottom-0 left-0 right-0 z-[9997] border-t border-white/[0.06] bg-navy-950/95 backdrop-blur-xl p-4 sm:p-5"
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-300">
            {t('message')}{' '}
            <Link href="/privacy" className="text-blue-400 underline hover:text-blue-300">
              {t('privacyPolicy')}
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/privacy"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {t('learnMore')}
            </Link>
            <button
              type="button"
              onClick={accept}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400"
            >
              {t('accept')}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
