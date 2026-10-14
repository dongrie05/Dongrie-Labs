import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/goncalo-dongrie05/30min';

export async function CTASection() {
  const t = await getTranslations('cta');

  return (
    <section className="bg-accent text-on-accent section-pad">
      <div className="wrap max-w-3xl">
        <h2 className="headline text-on-accent">
          {t('headlineLead')}{' '}
          <span className="text-warm-soft">{t('headlineAccent')}</span>
        </h2>
        <p className="lede text-band-muted">{t('subtitle')}</p>
        <p className="mt-4 text-[15px] text-band-muted">{t('noCommitment')}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={CALENDLY_URL} external tone="inverse">
            {t('bookCall')}
          </Button>
          <Button href="/contact" variant="secondary" tone="inverse">
            {t('requestQuote')}
          </Button>
        </div>
      </div>
    </section>
  );
}
