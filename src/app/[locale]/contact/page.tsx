import { getTranslations } from 'next-intl/server';
import { Mail, MessageCircle } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { ContactForm } from '@/components/shared/ContactForm';
import { Button } from '@/components/ui/Button';

const EMAIL = 'goncalo.dongrie05@gmail.com';
const WHATSAPP_URL = 'https://wa.me/351927699882';
const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/goncalo-dongrie05/30min';

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
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />

        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-blue-500/20 bg-blue-500/5 px-5 py-4 text-center">
          <p className="text-sm font-medium text-slate-200">
            {t('trustStrip')}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll variant="slideLeft">
            <ContactForm />
          </AnimateOnScroll>

          <AnimateOnScroll variant="slideRight" delay={0.1}>
            <div className="space-y-8">
              <div className="rounded-2xl border border-white/[0.06] bg-navy-900/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {t('info.email')}
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-3 flex items-center gap-3 text-white transition-colors duration-200 hover:text-blue-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  {EMAIL}
                </a>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-navy-900/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {t('info.whatsApp')}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-3 text-white transition-colors duration-200 hover:text-green-400"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  +351 927 699 882
                </a>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-navy-900/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {t('info.bookCall')}
                </p>
                <a
                  href={CALENDLY_URL}
                  target={CALENDLY_URL.startsWith('http') ? '_blank' : undefined}
                  rel={CALENDLY_URL.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-400 hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                >
                  {t('info.bookCall')}
                </a>
              </div>

              <p className="text-sm text-slate-500 text-center lg:text-left">{t('info.responseTime')}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}
