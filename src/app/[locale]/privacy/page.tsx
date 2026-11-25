import { getTranslations } from 'next-intl/server';

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
    <div className="section-pad">
      <div className="wrap max-w-2xl">
        <h1 className="headline">{t('title')}</h1>
        <p className="mt-4 text-[15px] text-muted">
          {t('lastUpdated')}: March 2025
        </p>
        <p className="mt-8 text-[17px] leading-relaxed text-muted">{t('intro')}</p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((section) => {
            if ('bodyKeys' in section) {
              return (
                <section key={section.titleKey}>
                  <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t(section.titleKey)}</h2>
                  <div className="mt-3 space-y-3 text-[17px] leading-relaxed text-muted">
                    {section.bodyKeys.map((key) => (
                      <p key={key}>{t(key)}</p>
                    ))}
                  </div>
                </section>
              );
            }
            return (
              <section key={section.titleKey}>
                <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t(section.titleKey)}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-muted">{t(section.bodyKey)}</p>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
