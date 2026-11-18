import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const PRICES = [
  { key: 'mobileApps' as const, range: '€2k to €8k' },
  { key: 'aiIntegration' as const, range: '€1.5k to €6k' },
  { key: 'businessAutomation' as const, range: '€1.5k to €5k' },
] as const;

export default async function PricingPage() {
  const t = await getTranslations('pricing');

  return (
    <div className="section-pad">
      <div className="wrap max-w-3xl">
        <div className="mb-5 h-1 w-14 rounded-full bg-warm" aria-hidden />
        <h1 className="headline">{t('title')}</h1>
        <p className="lede">{t('subtitle')}</p>

        <ul className="mt-14 border-t border-line">
          {PRICES.map(({ key, range }) => (
            <li key={key} className="flex flex-col gap-1 border-b border-line py-6 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-[20px] font-semibold tracking-[-0.02em]">{t(key)}</h2>
              <p className="text-[17px] text-muted">
                {t('from')} {range}
              </p>
            </li>
          ))}
        </ul>

        <section className="mt-16">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em]">{t('budgetTightTitle')}</h2>
          <p className="mt-3 max-w-prose text-[17px] text-muted">{t('budgetTightSubtitle')}</p>
          <Button href="/contact" variant="primary" className="mt-6">
            {t('ctaBudget')}
          </Button>
        </section>
      </div>
    </div>
  );
}
