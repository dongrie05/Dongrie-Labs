import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/goncalo-dongrie05/30min';

export async function CTASection() {
  const t = await getTranslations('cta');

  return (
    <section className="section-pad">
      <div className="wrap max-w-3xl">
        <h2 className="headline">{t('headline')}</h2>
        <p className="lede">{t('subtitle')}</p>
        <p className="mt-4 text-[15px] text-muted">{t('noCommitment')}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={CALENDLY_URL} external>
            {t('bookCall')}
          </Button>
          <Button href="/contact" variant="secondary">
            {t('requestQuote')}
          </Button>
        </div>
      </div>
    </section>
  );
}
