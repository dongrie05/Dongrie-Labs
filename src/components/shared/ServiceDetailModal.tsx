'use client';

import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/navigation';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export function ServiceDetailModal({
  serviceId,
  open,
  onClose,
}: ServiceDetailModalProps) {
  const t = useTranslations('services');
  const msgKey = serviceMsgKeys[serviceId] ?? 'customSoftware';

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          key="service-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-navy-700 bg-navy-900 p-6 shadow-xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="service-modal-title"
            className="font-heading text-xl font-semibold text-white"
          >
            {t(`${msgKey}.title`)}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-navy-800 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              {t('modalWhat')}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              {t(`${msgKey}.description`)}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              {t('modalHow')}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              {t(`${msgKey}.howItWorks`)}
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {t('modalCost')}
              </h3>
              <p className="mt-1 text-sm font-medium text-white">
                {t(`${msgKey}.averageCost`)}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {t('modalTime')}
              </h3>
              <p className="mt-1 text-sm font-medium text-white">
                {t(`${msgKey}.averageTime`)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {msgKey === 'smeAutomation' ? (
            <>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                onClick={onClose}
              >
                {t('smeAutomation.ctaLinea')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                onClick={onClose}
              >
                {t('smeAutomation.ctaCustom')}
              </Link>
            </>
          ) : (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-400"
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
