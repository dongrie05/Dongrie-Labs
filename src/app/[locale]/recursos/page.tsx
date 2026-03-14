import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Card } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';
import { recursosArticles } from '@/lib/data/recursos';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'recursos' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function RecursosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('recursos');
  const isPt = locale === 'pt';

  return (
    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recursosArticles.map((article, i) => (
            <AnimateOnScroll key={article.slug} variant="fadeUp" delay={i * 0.08}>
              <Link href={`/recursos/${article.slug}`}>
                <Card className="h-full flex flex-col group">
                  <time className="text-xs text-slate-500">
                    {new Date(article.date).toLocaleDateString(isPt ? 'pt-PT' : 'en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="mt-2 font-heading text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {isPt ? article.titlePt : article.titleEn}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-3">
                    {isPt ? article.excerptPt : article.excerptEn}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:gap-2 transition-all">
                    {t('readMore')}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
