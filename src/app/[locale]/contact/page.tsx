import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/shared/ContactForm';
import { Button } from '@/components/ui/Button';

const EMAIL = 'goncalo.dongrie05@gmail.com';
const WHATSAPP_URL = 'https://wa.me/351927699882';
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/goncalo-dongrie05/30min';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  return {
    title: `${t('title')} - ${tCommon('brandName')}`,
    description: t('subtitle'),
  };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div className="section-pad">
      <div className="wrap grid gap-16 lg:grid-cols-[minmax(0,36rem)_18rem] lg:items-start lg:justify-between">
        <div>
          <h1 className="display text-warm">{t('title')}</h1>
          <p className="lede">{t('subtitle')}</p>
          <p className="mt-4 max-w-prose text-[15px] text-muted">{t('trustStrip')}</p>
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>

        <aside className="rounded-3xl bg-accent p-8 text-on-accent">
          <div className="space-y-8">
            <div>
              <p className="text-[15px] font-medium text-band-muted">{t('info.email')}</p>
              <a href={`mailto:${EMAIL}`} className="mt-2 inline-flex min-h-11 items-center break-all text-[17px] text-on-accent underline decoration-on-accent/40 underline-offset-4 hover:decoration-on-accent">
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="text-[15px] font-medium text-band-muted">{t('info.whatsApp')}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center text-[17px] text-on-accent underline decoration-on-accent/40 underline-offset-4 hover:decoration-on-accent"
              >
                +351 927 699 882
              </a>
            </div>
            <div>
              <p className="text-[15px] font-medium text-band-muted">{t('info.bookCall')}</p>
              <Button href={CALENDLY_URL} external variant="secondary" tone="inverse" className="mt-3">
                {t('info.bookCall')}
              </Button>
            </div>
            <p className="text-[15px] text-band-muted">{t('info.responseTime')}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
