'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
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

export function ServicesOverview() {
  const t = useTranslations('services');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="max-w-prose">
          <h2 className="headline">{t('overviewTitle')}</h2>
          <p className="lede">{t('overviewSubtitle')}</p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => {
            const msgKey = serviceMsgKeys[service.id] ?? 'customSoftware';
            return (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className="flex h-full w-full flex-col rounded-3xl bg-paper p-6 text-left md:p-8"
                >
                  <span className="text-[15px] font-semibold tabular-nums text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-4 text-[22px] font-semibold tracking-[-0.02em] text-ink">
                    {t(`${msgKey}.title`)}
                  </span>
                  <span className="mt-2 text-[17px] leading-relaxed text-muted">
                    {t(`${msgKey}.shortDesc`)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <Link href="/services" className="mt-8 inline-flex min-h-11 items-center text-[17px] text-link hover:underline">
          {t('exploreAll')}
        </Link>

        <ServiceDetailModal
          serviceId={selectedServiceId ?? ''}
          open={selectedServiceId !== null}
          onClose={() => setSelectedServiceId(null)}
        />
      </div>
    </section>
  );
}
