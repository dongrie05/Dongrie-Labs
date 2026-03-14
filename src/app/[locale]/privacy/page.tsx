import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    description: t('intro'),
  };
}

const SECTIONS = [
  {
    titleKey: 'cookiesTitle' as const,
    bodyKeys: ['cookiesBody', 'cookiesBodyDetail'] as const,
  },
  { titleKey: 'dataTitle' as const, bodyKey: 'dataBody' as const },
  { titleKey: 'rightsTitle' as const, bodyKey: 'rightsBody' as const },
  { titleKey: 'contactTitle' as const, bodyKey: 'contactBody' as const },
] as const;

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="relative mx-auto max-w-2xl">
        <SectionHeading title={t('title')} align="center" />
        <p className="text-sm text-slate-500 text-center mt-2">
          {t('lastUpdated')}: March 2025
        </p>
        <p className="mt-8 text-slate-300 leading-relaxed">
          {t('intro')}
        </p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((section) => {
            if ('bodyKeys' in section) {
              return (
                <section key={section.titleKey}>
                  <h2 className="font-heading text-xl font-semibold text-white">
                    {t(section.titleKey)}
                  </h2>
                  <div className="mt-3 space-y-3 text-slate-400 leading-relaxed">
                    {section.bodyKeys.map((key) => (
                      <p key={key}>{t(key)}</p>
                    ))}
                  </div>
                </section>
              );
            }
            return (
              <section key={section.titleKey}>
                <h2 className="font-heading text-xl font-semibold text-white">
                  {t(section.titleKey)}
                </h2>
                <p className="mt-3 text-slate-400 leading-relaxed">
                  {t(section.bodyKey)}
                </p>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
