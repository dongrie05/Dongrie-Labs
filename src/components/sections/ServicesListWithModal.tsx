'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { services } from '@/lib/data/services';
import { ServiceDetailModal } from '@/components/shared/ServiceDetailModal';

const serviceMsgKeys: Record<string, string> = {
  mobile: 'mobileApps',
  ai: 'aiIntegration',
  automation: 'businessAutomation',
  mvp: 'mvpDevelopment',
  api: 'apiIntegration',
  custom: 'customSoftware',
  smeAutomation: 'smeAutomation',
};

export function ServicesListWithModal() {
  const t = useTranslations('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <>
      <ul className="mt-14 grid gap-4">
        {services.map((service, index) => {
          const msgKey = serviceMsgKeys[service.id] ?? 'customSoftware';
          return (
            <li key={service.id} className="rounded-3xl bg-paper p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10">
                <div>
                  <p className="text-[15px] font-semibold tabular-nums text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.02em]">
                    {t(`${msgKey}.title`)}
                  </h2>
                  <p className="mt-3 max-w-prose text-[17px] leading-relaxed text-muted">
                    {t(`${msgKey}.description`)}
                  </p>
                  <p className="mt-4 text-[15px] text-muted">
                    {t(`${msgKey}.averageCost`)}
                    <span className="px-2" aria-hidden>
                      ·
                    </span>
                    {t(`${msgKey}.averageTime`)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className="inline-flex min-h-11 items-center text-[17px] text-link hover:underline"
                >
                  {t('learnMore')}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <ServiceDetailModal
        serviceId={selectedServiceId ?? ''}
        open={selectedServiceId !== null}
        onClose={() => setSelectedServiceId(null)}
      />
    </>
  );
}
