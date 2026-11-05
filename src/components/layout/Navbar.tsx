'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { LanguageToggle } from './LanguageToggle';

/** Primary nav matches hero mockup: AI layer / Apps / Contacto */
const primaryLinks = [
  { href: '/#ai-layer', key: 'aiLayer' },
  { href: '/#apps', key: 'apps' },
  { href: '/contact', key: 'contact' },
] as const;

const moreLinks = [
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/products', key: 'products' },
  { href: '/about', key: 'about' },
  { href: '/pricing', key: 'pricing' },
  { href: '/recursos', key: 'recursos' },
] as const;

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], when: 'afterChildren' },
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], when: 'beforeChildren', staggerChildren: 0.05 },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0 },
};

export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.4 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-navy-950/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <MagneticButton strength={0.3}>
          <Link href="/" className="group flex items-baseline gap-1.5">
            <span className="font-heading text-lg font-bold tracking-wide text-white sm:text-xl">
              DONGRIE
            </span>
            <span className="font-heading text-lg font-bold tracking-wide text-lilac sm:text-xl">
              LABS
            </span>
            <span className="sr-only">{tCommon('brandName')}</span>
          </Link>
        </MagneticButton>

        <div className="hidden md:flex md:items-center md:gap-1">
          {primaryLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex md:items-center md:gap-3">
          <LanguageToggle />
        </div>

        <div className="flex md:hidden items-center gap-1">
          <LanguageToggle className="!p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white/5" />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-3 text-slate-300 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? tCommon('closeMenu') : tCommon('openMenu')}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-t border-white/[0.06] bg-navy-950/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-6">
              {primaryLinks.map(({ href, key }) => (
                <motion.div key={key} variants={menuItemVariants}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[48px] items-center rounded-xl px-4 py-3.5 text-lg font-medium text-white transition-colors hover:bg-white/5 active:bg-white/10"
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="mt-3 border-t border-white/[0.06] pt-3">
                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t('more')}
                </p>
              </motion.div>
              {moreLinks.map(({ href, key }) => (
                <motion.div key={key} variants={menuItemVariants}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[44px] items-center rounded-xl px-4 py-3 text-base font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white active:bg-white/10"
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
