'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type OfferKey = 'apps' | 'web' | 'linea';

const offers: {
  key: OfferKey;
  href: string;
  weight: 'primary' | 'middle' | 'last';
}[] = [
  { key: 'apps', href: '/portfolio', weight: 'primary' },
  { key: 'web', href: '/services', weight: 'middle' },
  { key: 'linea', href: '/products', weight: 'last' },
];

const weightStyles: Record<(typeof offers)[number]['weight'], string> = {
  primary:
    'border-lilac/25 bg-gradient-to-br from-lilac/10 via-navy-900/60 to-navy-900/20 p-8 md:p-10',
  middle:
    'border-white/10 bg-navy-900/40 p-7 md:p-8',
  last:
    'border-white/[0.06] bg-white/[0.02] p-6 md:p-7',
};

export function SecondaryOffer() {
  const t = useTranslations('aiLayer.offer');

  return (
    <section id="apps" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.2em] text-lilac"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('label')}
        </motion.p>
        <motion.h2
          className="font-heading mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl text-lg text-slate-400"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          {t('subtitle')}
        </motion.p>

        <div className="mt-14 grid gap-5 md:grid-cols-5 md:grid-rows-2">
          {offers.map(({ key, href, weight }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: 0.12 * i,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className={cn(
                weight === 'primary' && 'md:col-span-3 md:row-span-2',
                weight === 'middle' && 'md:col-span-2',
                weight === 'last' && 'md:col-span-2'
              )}
            >
              <Link
                href={href}
                className={cn(
                  'group flex h-full min-h-[180px] flex-col rounded-3xl border transition-colors duration-300 hover:border-lilac/40',
                  weightStyles[weight]
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={cn(
                      'font-heading font-bold text-white',
                      weight === 'primary' && 'text-3xl md:text-4xl',
                      weight === 'middle' && 'text-2xl',
                      weight === 'last' && 'text-xl text-white/90'
                    )}
                  >
                    {t(`${key}.title`)}
                  </p>
                  <ArrowUpRight
                    className={cn(
                      'shrink-0 text-lilac/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lilac',
                      weight === 'primary' ? 'h-6 w-6' : 'h-5 w-5'
                    )}
                  />
                </div>
                <p
                  className={cn(
                    'mt-4 leading-relaxed text-slate-400',
                    weight === 'primary' ? 'text-base md:text-lg max-w-xl' : 'text-sm'
                  )}
                >
                  {t(`${key}.body`)}
                </p>
                <span
                  className={cn(
                    'mt-auto pt-6 text-sm font-medium text-lilac',
                    weight === 'last' && 'text-slate-500'
                  )}
                >
                  {t(`${key}.cta`)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
