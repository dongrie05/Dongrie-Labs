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

        <ul className="mt-14 border-t border-line">
          {services.map((service) => {
            const msgKey = serviceMsgKeys[service.id] ?? 'customSoftware';
            return (
              <li key={service.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className="flex w-full flex-col gap-2 py-6 text-left md:flex-row md:items-baseline md:justify-between md:gap-10 md:py-7"
                >
                  <span className="text-[20px] font-semibold tracking-[-0.02em] text-ink">
                    {t(`${msgKey}.title`)}
                  </span>
                  <span className="max-w-md text-[17px] leading-relaxed text-muted md:text-right">
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
