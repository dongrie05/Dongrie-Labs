import { getTranslations } from 'next-intl/server';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

export async function FAQSection() {
  const t = await getTranslations('faq');
  const items = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
  ];

  return (
    <section className="bg-paper section-pad">
      <div className="wrap max-w-3xl">
        <h2 className="headline">{t('title')}</h2>
        <div className="mt-10">
          <FAQAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
