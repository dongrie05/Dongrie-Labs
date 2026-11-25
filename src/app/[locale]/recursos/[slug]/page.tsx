import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/navigation';
import { getArticleBySlug } from '@/lib/data/recursos';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Not found' };
  const title = locale === 'pt' ? article.titlePt : article.titleEn;
  return {
    title,
    description: locale === 'pt' ? article.excerptPt : article.excerptEn,
  };
}

export default async function RecursosArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const t = await getTranslations('recursos');
  const isPt = locale === 'pt';
  const title = isPt ? article.titlePt : article.titleEn;
  const content = isPt ? article.contentPt : article.contentEn;

  return (
    <article className="section-pad">
      <div className="wrap max-w-2xl">
        <Link href="/recursos" className="text-[15px] text-link hover:underline">
          {t('backToRecursos')}
        </Link>
        <header className="mt-8">
          <time className="text-[15px] text-muted">
            {new Date(article.date).toLocaleDateString(isPt ? 'pt-PT' : 'en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="headline mt-3">{title}</h1>
        </header>
        <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-muted">
          {content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {article.sources && article.sources.length > 0 && (
          <footer className="mt-14 border-t border-line pt-8">
            <h2 className="text-[15px] font-medium text-ink">{t('sources')}</h2>
            <ul className="mt-4 space-y-2">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[17px] text-link underline underline-offset-2"
                  >
                    {isPt ? source.labelPt : source.labelEn}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </article>
  );
}
