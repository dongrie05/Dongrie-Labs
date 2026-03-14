import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from '@/components/shared/JsonLd';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { GrainOverlay } from '@/components/shared/GrainOverlay';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

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
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased bg-navy-950 text-white min-h-screen">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
        <CustomCursor />
        <GrainOverlay />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
