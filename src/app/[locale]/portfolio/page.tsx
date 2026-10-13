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
    <div className="section-pad">
      <div className="wrap">
        <h1 className="headline">{t('title')}</h1>
        <p className="lede">{t('subtitle')}</p>
        <div className="mt-12">
          <PortfolioGrid projects={projects} />
        </div>
      </div>
    </div>
  );
}
