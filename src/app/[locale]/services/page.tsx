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
    <div>
      <section className="bg-warm-band text-on-warm">
        <div className="wrap pb-16 pt-16 md:pb-20 md:pt-24">
          <div className="mb-5 h-1 w-14 rounded-full bg-on-warm" aria-hidden />
          <h1 className="headline max-w-[12ch] text-on-warm">{t('pageTitle')}</h1>
          <p className="lede text-on-warm-muted">{t('pageSubtitle')}</p>
        </div>
      </section>
      <div className="pb-24 pt-12 md:pt-16">
      <div className="wrap">
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

      </div>
      </div>
      <section className="bg-accent text-on-accent section-pad">
        <div className="wrap max-w-xl">
          <h2 className="headline text-on-accent">{t('ctaTitle')}</h2>
          <p className="lede text-band-muted">{t('ctaSubtitle')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary" tone="inverse">
              {tNav('contact')}
            </Button>
            <Button href="/portfolio" variant="secondary" tone="inverse">
              {tNav('portfolio')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
