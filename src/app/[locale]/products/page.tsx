import { getTranslations } from 'next-intl/server';
import { products } from '@/lib/data/products';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
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
    <div className="section-pad">
      <div className="wrap max-w-3xl">
        <div className="mb-5 h-1 w-14 rounded-full bg-warm" aria-hidden />
        <h1 className="headline">{t('title')}</h1>
        <p className="lede">{t('subtitle')}</p>

        <div className="mt-16 space-y-10">
          {products.map((product) => (
            <article key={product.id} className="rounded-3xl bg-accent p-8 text-on-accent md:p-12">
              <p className="text-[15px] text-band-muted">{t('byStudio')}</p>
              <h2 className="mt-3 text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.034em]">
                {isPt ? product.namePt : product.name}
              </h2>
              <p className="mt-4 text-[20px] tracking-[-0.015em] text-warm-soft">
                {isPt ? product.taglinePt : product.tagline}
              </p>
              <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-band-muted">
                {isPt ? product.descriptionPt : product.description}
              </p>
              <Button href={product.url} external tone="inverse" className="mt-8">
                {isPt ? product.ctaPt : product.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
