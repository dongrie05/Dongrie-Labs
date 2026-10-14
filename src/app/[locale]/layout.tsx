import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { CookieConsent } from '@/components/shared/CookieConsent';
import { Analytics } from '@/components/shared/Analytics';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'pt')) notFound();
  const messages = await getMessages();
  const t = await getTranslations('common');
  return (
    <NextIntlClientProvider messages={messages}>
      <a href="#main" className="skip-link">
        {t('skipToContent')}
      </a>
      <Navbar />
      <main id="main" className="min-h-screen pt-14">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CookieConsent />
      <Analytics />
    </NextIntlClientProvider>
  );
}
