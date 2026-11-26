import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
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
    default: 'Dongrie Labs · AI Layer para gestão de condomínios e contabilidade',
    template: '%s | Dongrie Labs',
  },
  description:
    'A AI Layer da Dongrie Labs arruma emails, WhatsApps e chamadas por cliente e prepara o próximo passo. Para gestão de condomínios e contabilidade em Portugal.',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased bg-navy-950 text-white min-h-screen">
        <CustomCursor />
        <GrainOverlay />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
