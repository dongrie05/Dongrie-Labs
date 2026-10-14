import { getTranslations } from 'next-intl/server';
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
    <div>
      <section className="bg-accent text-on-accent">
        <div className="wrap pb-14 pt-16 md:pb-16 md:pt-24">
          <h1 className="display text-on-accent">{t('title')}</h1>
          <p className="lede text-band-muted">{t('subtitle')}</p>
        </div>
      </section>
      <div className="wrap pb-24 pt-12">
        <PortfolioGrid projects={projects} />
      </div>
    </div>
  );
}
