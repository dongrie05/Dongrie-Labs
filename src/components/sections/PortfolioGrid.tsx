'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import type { Project, ProjectCategory } from '@/types';
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

  const filtered = filter === '' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('title')}>
        {CATEGORIES.map((cat) => {
          const selected = filter === cat.value;
          return (
            <button
              key={cat.value || 'all'}
              type="button"
              onClick={() => setFilter(cat.value)}
              aria-pressed={selected}
              className={cn(
                'min-h-11 rounded-full px-4 text-[15px]',
                selected ? 'bg-ink text-canvas' : 'text-muted hover:text-ink'
              )}
            >
              {t(cat.key)}
            </button>
          );
        })}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-3">
        {filtered.map((project) => (
          <PortfolioCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </>
  );
}
