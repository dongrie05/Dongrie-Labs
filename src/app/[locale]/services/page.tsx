import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ServicesListWithModal } from '@/components/sections/ServicesListWithModal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  return {
    title: `${t('pageTitle')} - ${tCommon('brandName')}`,
    description: t('pageSubtitle'),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations('services');
  const tFaq = await getTranslations('faq');
  const tNav = await getTranslations('nav');

  const faqItems = [
    { question: tFaq('q1'), answer: tFaq('a1') },
    { question: tFaq('q2'), answer: tFaq('a2') },
    { question: tFaq('q3'), answer: tFaq('a3') },
    { question: tFaq('q4'), answer: tFaq('a4') },
  ];

  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 dot-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title={t('pageTitle')}
          subtitle={t('pageSubtitle')}
          align="center"
        />

        <ServicesListWithModal />

        <AnimateOnScroll>
          <section className="mt-24">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('comingSoon')}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {['future.localAi', 'future.openClaw', 'future.miniSaaS'].map((key, i) => (
                <AnimateOnScroll key={key} variant="fadeUp" delay={i * 0.08}>
                  <Card hover={false} className="opacity-60 border-dashed">
                    <p className="font-medium text-slate-400">{t(key)}</p>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <section className="mt-24">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {tFaq('title')}
            </h2>
            <div className="mt-6 max-w-3xl">
              <FAQAccordion items={faqItems} />
            </div>
          </section>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <section className="mt-24 card-glow rounded-2xl border border-white/[0.06] bg-navy-900/60 p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('ctaTitle')}
            </h2>
            <p className="mt-2 text-slate-400">{t('ctaSubtitle')}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="primary">
                {tNav('contact')}
              </Button>
              <Button href="/portfolio" variant="secondary">
                {tNav('portfolio')}
              </Button>
            </div>
          </section>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
