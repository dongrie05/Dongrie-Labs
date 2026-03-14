import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';
import { projects } from '@/lib/data/projects';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  return {
    title: `${t('title')} - ${tCommon('brandName')}`,
    description: t('subtitle'),
  };
}

export default async function PortfolioPage() {
  const t = await getTranslations('portfolio');

  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(34,211,238,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />

        <AnimateOnScroll>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient font-heading">{projects.length}</span>
              <span className="text-slate-400">{t('metricsApps')}</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-slate-400">iOS & Android</span>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-slate-400">{t('metricsDelivery')} 2–6 weeks</span>
          </div>
        </AnimateOnScroll>

        <div className="mt-12">
          <PortfolioGrid projects={projects} />
        </div>
      </div>
    </div>
  );
}
