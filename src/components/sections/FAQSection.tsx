import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

export async function FAQSection() {
  const t = await getTranslations('faq');
  const items = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
  ];
  return (
    <AnimateOnScroll>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title={t('title')} align="center" />
        <div className="mt-10">
          <FAQAccordion items={items} />
        </div>
      </section>
    </AnimateOnScroll>
  );
}
