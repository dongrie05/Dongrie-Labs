import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/navigation';
import { ArrowLeft } from 'lucide-react';
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
    title: title,
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
    <article className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 dot-grid pointer-events-none" />
      <div className="relative mx-auto max-w-2xl">
        <Link
          href="/recursos"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToRecursos')}
        </Link>
        <header>
          <time className="text-sm text-slate-500">
            {new Date(article.date).toLocaleDateString(isPt ? 'pt-PT' : 'en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h1>
        </header>
        <div className="mt-10 space-y-6 text-slate-300 leading-relaxed">
          {content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        {article.sources && article.sources.length > 0 && (
          <footer className="mt-14 pt-10 border-t border-white/[0.06]">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-slate-500">
              {t('sources')}
            </h2>
            <ul className="mt-4 space-y-2">
              {article.sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
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
