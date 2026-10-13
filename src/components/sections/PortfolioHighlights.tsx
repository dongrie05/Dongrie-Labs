import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { projects } from '@/lib/data/projects';

export async function PortfolioHighlights() {
  const t = await getTranslations('portfolio');
  const proof = await getTranslations('proofStrip');
  const locale = await getLocale();
  const highlighted = projects.filter((project) => project.highlighted);

  if (highlighted.length === 0) return null;

  return (
    <section className="bg-paper section-pad">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="headline">{t('title')}</h2>
            <p className="lede">{t('subtitle')}</p>
            <p className="mt-4 max-w-prose text-[17px] text-muted">{proof('stat')}</p>
          </div>
          <Link href="/portfolio" className="text-[17px] text-link hover:underline">
            {t('viewFull')}
          </Link>
        </div>

        <ul className="mt-14 divide-y divide-line border-y border-line">
          {highlighted.map((project) => {
            const name = locale === 'pt' && project.namePt ? project.namePt : project.name;
            const description =
              locale === 'pt' && project.descriptionPt ? project.descriptionPt : project.description;
            return (
              <li key={project.slug}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="grid gap-6 py-8 md:grid-cols-[160px_1fr] md:items-center md:gap-10 md:py-10"
                >
                  <div className="relative h-28 overflow-hidden rounded-2xl bg-canvas md:h-24">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    ) : (
                      <span className="flex h-full items-center px-4 text-[15px] text-muted">
                        {name}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{name}</h3>
                      <p className="text-[15px] text-muted">
                        {locale === 'pt' && project.typePt ? project.typePt : project.type}
                      </p>
                    </div>
                    <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-muted">
                      {description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
