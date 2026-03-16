import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { products } from '@/lib/data/products';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('products');
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
        <div className="mt-14 space-y-8">
          {products.map((product, i) => (
            <AnimateOnScroll key={product.id} variant="fadeUp" delay={i * 0.1}>
              <article className="overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/60 transition-colors hover:border-white/[0.1]">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                      {t('byStudio')}
                    </p>
                    <h2 className="font-heading mt-2 text-2xl font-bold text-white md:text-3xl">
                      {isPt ? product.namePt : product.name}
                    </h2>
                    <p className="mt-2 text-lg text-slate-400">
                      {isPt ? product.taglinePt : product.tagline}
                    </p>
                    <p className="mt-4 text-slate-300 leading-relaxed">
                      {isPt ? product.descriptionPt : product.description}
                    </p>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400"
                    >
                      {isPt ? product.ctaPt : product.cta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                  <div className="flex min-h-[200px] items-center justify-center bg-navy-800/40 p-8 md:min-h-[280px]">
                    <span className="text-7xl opacity-60">📞</span>
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
