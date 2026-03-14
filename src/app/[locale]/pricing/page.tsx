import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

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
  { key: 'mobileApps' as const, range: '€3k – €8k' },
  { key: 'aiIntegration' as const, range: '€2k – €6k' },
  { key: 'businessAutomation' as const, range: '€2k – €5k' },
] as const;

export default async function PricingPage() {
  const t = await getTranslations('pricing');

  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PRICES.map(({ key, range }, i) => (
            <AnimateOnScroll key={key} variant="fadeUp" delay={i * 0.1}>
              <Card className="h-full text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
                  {t('from')} {range}
                </p>
                <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                  {t(key)}
                </h3>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll className="mt-20">
          <div className="rounded-2xl border border-white/[0.08] bg-navy-900/60 p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('budgetTightTitle')}
            </h2>
            <p className="mt-2 max-w-xl mx-auto text-slate-400">
              {t('budgetTightSubtitle')}
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="primary">
                {t('ctaBudget')}
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
