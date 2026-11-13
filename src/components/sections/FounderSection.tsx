import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';

const FOUNDER_IMAGE = '/images/portfolio/founder.JPG';

export async function FounderSection() {
  const t = await getTranslations('founder');

  return (
    <section className="section-pad">
      <div className="wrap grid items-center gap-12 md:grid-cols-[280px_1fr] md:gap-16">
        <div className="relative aspect-[4/5] max-w-xs overflow-hidden rounded-3xl bg-paper">
          <Image
            src={FOUNDER_IMAGE}
            alt={t('subtitle')}
            fill
            className="object-cover object-top"
            sizes="280px"
          />
        </div>
        <div>
          <p className="text-[15px] font-semibold text-accent">{t('sectionLabel')}</p>
          <h2 className="headline mt-3">{t('title')}</h2>
          <p className="lede">{t('bio')}</p>
          <Link href="/about" className="mt-8 inline-flex min-h-11 items-center text-[17px] text-link hover:underline">
            {t('moreAbout')}
          </Link>
        </div>
      </div>
    </section>
  );
}
