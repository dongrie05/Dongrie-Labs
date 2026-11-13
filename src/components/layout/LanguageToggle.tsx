'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useTransition } from 'react';
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
      className={cn('inline-flex items-center rounded-full p-0.5', className)}
      role="group"
      aria-label="Language"
    >
      {locales.map(({ code, label }) => {
        const selected = locale === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={selected}
            onClick={() => switchLocale(code)}
            disabled={isPending}
            className={cn(
              'min-h-11 min-w-11 rounded-full px-2 text-[15px] font-medium',
              selected ? 'text-ink' : 'text-muted hover:text-ink'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
