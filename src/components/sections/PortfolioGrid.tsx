'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import type { Project, ProjectCategory } from '@/types';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { PortfolioCard } from '@/components/shared/PortfolioCard';
import { cn } from '@/lib/utils';

const CATEGORIES: Array<{ value: '' | ProjectCategory; key: string }> = [
  { value: '', key: 'all' },
  { value: 'mobile', key: 'mobile' },
  { value: 'ai', key: 'ai' },
  { value: 'automation', key: 'automation' },
];

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const t = useTranslations('portfolio');
  const locale = useLocale();
  const [filter, setFilter] = useState<'' | ProjectCategory>('');

  const filtered =
    filter === ''
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value || 'all'}
            type="button"
            onClick={() => setFilter(cat.value)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
              filter === cat.value
                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                : 'border-navy-700 text-slate-400 hover:border-navy-600 hover:text-white'
            )}
          >
            {t(cat.key)}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <AnimateOnScroll key={project.slug} variant="fadeUp" delay={i * 0.05}>
            <PortfolioCard project={project} locale={locale} />
          </AnimateOnScroll>
        ))}
      </div>
    </>
  );
}
