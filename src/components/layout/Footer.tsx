'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { LanguageToggle } from './LanguageToggle';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/products', key: 'products' },
  { href: '/about', key: 'about' },
  { href: '/pricing', key: 'pricing' },
  { href: '/recursos', key: 'recursos' },
  { href: '/contact', key: 'contact' },
] as const;

const WHATSAPP_URL = 'https://wa.me/351927699882';
const EMAIL = 'goncalo.dongrie05@gmail.com';

export function Footer() {
  const t = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tCommon = useTranslations('common');

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <p className="text-[17px] font-semibold tracking-[-0.02em]">{tCommon('brandName')}</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{tFooter('tagline')}</p>
        </div>

        <nav aria-label={tFooter('navigationLabel')}>
          <p className="text-[15px] font-medium text-ink">{tFooter('navigationLabel')}</p>
          <ul className="mt-4 space-y-1">
            {navLinks.map(({ href, key }) => (
              <li key={key}>
                <Link href={href} className="inline-flex min-h-11 items-center text-[15px] text-muted hover:text-ink">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[15px] font-medium text-ink">{tFooter('contactLabel')}</p>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center text-[15px] text-link hover:underline">
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-[15px] text-link hover:underline"
              >
                +351 927 699 882
              </a>
            </li>
          </ul>
          <div className="mt-2">
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="wrap flex flex-col gap-3 border-t border-line py-6 text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {tCommon('brandName')}. {tFooter('copyright')}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-ink">
            {t('privacy')}
          </Link>
          <p>{tFooter('designedBy')}</p>
        </div>
      </div>
    </footer>
  );
}
