'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { LanguageToggle } from './LanguageToggle';
import { Marquee } from '@/components/shared/Marquee';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
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
    <footer className="relative border-t border-white/[0.04] bg-navy-950 overflow-hidden">
      {/* Large scrolling text */}
      <div className="py-10 border-b border-white/[0.03] overflow-hidden">
        <Marquee speed={60} pauseOnHover={false}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-heading text-6xl font-bold text-white/[0.03] whitespace-nowrap select-none sm:text-8xl"
            >
              {tCommon('brandName')}
            </span>
          ))}
        </Marquee>
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
                D
              </div>
              <p className="font-heading text-lg font-bold text-white">{tCommon('brandName')}</p>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
              {tFooter('tagline')}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">
              {tFooter('navigationLabel')}
            </p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {navLinks.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  className="group flex items-center gap-1 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                >
                  {t(key)}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-5">
              {tFooter('contactLabel')}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
              >
                +351 927 699 882
              </a>
              <div className="mt-2">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/[0.04] pt-8 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-slate-600">
            <span>© {new Date().getFullYear()} {tCommon('brandName')}. {tFooter('copyright')}</span>
            <Link href="/privacy" className="text-slate-500 hover:text-slate-400 transition-colors">
              {t('privacy')}
            </Link>
          </div>
          <p className="text-xs text-slate-700">
            {tFooter('designedBy')}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
