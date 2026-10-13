'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { settle } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from './LanguageToggle';

const navLinks = [
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/products', key: 'products' },
  { href: '/about', key: 'about' },
  { href: '/pricing', key: 'pricing' },
  { href: '/recursos', key: 'recursos' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header className="nav-material fixed inset-x-0 top-0 z-50 border-b border-line/80">
      <nav className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6">
        <Link href="/" className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
          {tCommon('brandName')}
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="rounded-full px-3 py-2 text-[15px] text-muted transition-colors hover:text-ink"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Button href="/contact" variant="primary" size="sm">
            {t('contact')}
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[15px] text-ink"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? tCommon('closeMenu') : tCommon('openMenu')}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={reduce ? { duration: 0.01 } : settle}
            className={cn('border-t border-line bg-paper lg:hidden')}
          >
            <div className="flex flex-col px-4 py-3">
              {navLinks.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center rounded-xl px-3 text-[17px] text-ink"
                >
                  {t(key)}
                </Link>
              ))}
              <Button
                href="/contact"
                variant="primary"
                className="mt-3 w-full"
                onClick={() => setMobileOpen(false)}
              >
                {t('contact')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
