'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Smartphone,
  Brain,
  Workflow,
  Rocket,
  Plug,
  Code2,
  Phone,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { ServiceDetailModal } from '@/components/shared/ServiceDetailModal';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { services } from '@/lib/data/services';

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Brain,
  Workflow,
  Rocket,
  Plug,
  Code2,
  Phone,
};

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
      <div className="mt-16 space-y-12">
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Code2;
          const msgKey = serviceMsgKeys[service.id] ?? 'customSoftware';
          return (
            <AnimateOnScroll key={service.id} variant="fadeUp" delay={i * 0.05}>
              <Card className="p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="font-heading mt-6 text-2xl font-semibold text-white">
                  {t(`${msgKey}.title`)}
                </h2>
                <p className="mt-4 text-slate-300">
                  {t(`${msgKey}.description`)}
                </p>
                {service.tech && service.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tech.map((tech) => (
                      <Badge key={tech} variant="tech">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  {t('learnMore')}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Card>
            </AnimateOnScroll>
          );
        })}
      </div>

      <ServiceDetailModal
        serviceId={selectedServiceId ?? ''}
        open={selectedServiceId !== null}
        onClose={() => setSelectedServiceId(null)}
      />
    </>
  );
}
