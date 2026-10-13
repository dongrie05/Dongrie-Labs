import type { Metadata } from 'next';
import './globals.css';
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from '@/components/shared/JsonLd';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dongrielabs.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Dongrie Labs - Fast AI-Powered Software Studio',
    template: '%s | Dongrie Labs',
  },
  description:
    'Build mobile apps, AI systems and automations in weeks. Solo studio by Gonçalo Dongrie.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'pt_PT',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
