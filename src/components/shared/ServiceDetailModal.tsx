'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { settle } from '@/lib/motion';

const serviceMsgKeys: Record<string, string> = {
  mobile: 'mobileApps',
  ai: 'aiIntegration',
  automation: 'businessAutomation',
  mvp: 'mvpDevelopment',
  api: 'apiIntegration',
  custom: 'customSoftware',
  smeAutomation: 'smeAutomation',
};

interface ServiceDetailModalProps {
  serviceId: string;
  open: boolean;
  onClose: () => void;
}

export function ServiceDetailModal({ serviceId, open, onClose }: ServiceDetailModalProps) {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const msgKey = serviceMsgKeys[serviceId] ?? 'customSoftware';
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
            aria-label={tCommon('close')}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.2 }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            tabIndex={-1}
            className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 16 }}
            transition={reduce ? { duration: 0.01 } : settle}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="service-modal-title" className="text-[24px] font-semibold tracking-[-0.02em]">
                {t(`${msgKey}.title`)}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[15px] text-muted hover:text-ink"
                aria-label={tCommon('close')}
              >
                {tCommon('close')}
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-[15px] font-medium text-ink">{t('modalWhat')}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-muted">{t(`${msgKey}.description`)}</p>
              </div>
              <div>
                <h3 className="text-[15px] font-medium text-ink">{t('modalHow')}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-muted">{t(`${msgKey}.howItWorks`)}</p>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[15px] font-medium text-ink">{t('modalCost')}</dt>
                  <dd className="mt-1 text-[17px] text-muted">{t(`${msgKey}.averageCost`)}</dd>
                </div>
                <div>
                  <dt className="text-[15px] font-medium text-ink">{t('modalTime')}</dt>
                  <dd className="mt-1 text-[17px] text-muted">{t(`${msgKey}.averageTime`)}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {msgKey === 'smeAutomation' ? (
                <>
                  <Link
                    href="/products"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-[17px] font-medium text-on-accent"
                    onClick={onClose}
                  >
                    {t('smeAutomation.ctaLinea')}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-[17px] font-medium text-ink"
                    onClick={onClose}
                  >
                    {t('smeAutomation.ctaCustom')}
                  </Link>
                </>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-[17px] font-medium text-on-accent"
                  onClick={onClose}
                >
                  {t('modalCta')}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
