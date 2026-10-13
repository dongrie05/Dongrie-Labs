import { getTranslations } from 'next-intl/server';
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

  const future = [t('future.localAi'), t('future.openClaw'), t('future.miniSaaS')];

  return (
    <div className="section-pad">
      <div className="wrap">
        <h1 className="headline">{t('pageTitle')}</h1>
        <p className="lede">{t('pageSubtitle')}</p>

        <ServicesListWithModal />

        <section className="mt-20">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('comingSoon')}</h2>
          <ul className="mt-4 space-y-2 text-[17px] text-muted">
            {future.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-20 max-w-3xl">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{tFaq('title')}</h2>
          <div className="mt-6">
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        <section className="mt-20 max-w-xl">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em]">{t('ctaTitle')}</h2>
          <p className="mt-3 text-[17px] text-muted">{t('ctaSubtitle')}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              {tNav('contact')}
            </Button>
            <Button href="/portfolio" variant="secondary">
              {tNav('portfolio')}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
