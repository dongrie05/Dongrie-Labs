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
        <h1 className="headline">{t('title')}</h1>
        <p className="lede">{t('subtitle')}</p>

        <div className="mt-16 space-y-16">
          {products.map((product) => (
            <article key={product.id} className="border-t border-line pt-10">
              <p className="text-[15px] text-muted">{t('byStudio')}</p>
              <h2 className="mt-3 text-[40px] font-semibold tracking-[-0.03em]">
                {isPt ? product.namePt : product.name}
              </h2>
              <p className="mt-3 text-[20px] tracking-[-0.015em] text-muted">
                {isPt ? product.taglinePt : product.tagline}
              </p>
              <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-muted">
                {isPt ? product.descriptionPt : product.description}
              </p>
              <Button href={product.url} external className="mt-8">
                {isPt ? product.ctaPt : product.cta}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
