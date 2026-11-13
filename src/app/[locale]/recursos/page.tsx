import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { recursosArticles } from '@/lib/data/recursos';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'recursos' });
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
    <div className="section-pad">
      <div className="wrap max-w-3xl">
        <div className="mb-5 h-1 w-14 rounded-full bg-warm" aria-hidden />
        <h1 className="headline">{t('title')}</h1>
        <p className="lede">{t('subtitle')}</p>
        <ul className="mt-14 border-t border-line">
          {recursosArticles.map((article) => (
            <li key={article.slug} className="border-b border-line">
              <Link href={`/recursos/${article.slug}`} className="block py-8">
                <time className="text-[15px] text-muted">
                  {new Date(article.date).toLocaleDateString(isPt ? 'pt-PT' : 'en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">
                  {isPt ? article.titlePt : article.titleEn}
                </h2>
                <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-muted">
                  {isPt ? article.excerptPt : article.excerptEn}
                </p>
                <span className="mt-4 inline-flex text-[17px] text-link">{t('readMore')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
