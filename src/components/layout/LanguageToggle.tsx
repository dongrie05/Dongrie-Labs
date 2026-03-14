'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useTransition } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const locales = [
  { code: 'en' as const, label: 'EN' },
  { code: 'pt' as const, label: 'PT' },
];

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'en' | 'pt') => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div
      className={cn(
        'relative inline-flex rounded-xl border border-white/[0.08] bg-navy-900/80 p-1 backdrop-blur-sm',
        className
      )}
      role="tablist"
      aria-label="Select language"
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg bg-blue-500"
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          left: locale === 'en' ? 4 : '50%',
          width: 'calc(50% - 4px)',
        }}
      />
      {locales.map(({ code, label }) => (
        <button
          key={code}
          role="tab"
          aria-selected={locale === code}
          onClick={() => switchLocale(code)}
          disabled={isPending}
          className={cn(
            'relative z-10 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200',
            locale === code ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
