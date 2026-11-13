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
    <section className="bg-accent text-on-accent section-pad">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="headline text-on-accent">{t('title')}</h2>
            <p className="lede text-band-muted">{t('subtitle')}</p>
            <p className="mt-4 max-w-prose text-[17px] text-band-muted">{proof('stat')}</p>
          </div>
          <Link href="/portfolio" className="text-[17px] text-on-accent underline decoration-on-accent/40 underline-offset-4 hover:decoration-on-accent">
            {t('viewFull')}
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-6">
          {highlighted.map((project) => {
            const name = locale === 'pt' && project.namePt ? project.namePt : project.name;
            const description =
              locale === 'pt' && project.descriptionPt ? project.descriptionPt : project.description;
            const type = locale === 'pt' && project.typePt ? project.typePt : project.type;
            return (
              <li key={project.slug}>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-canvas">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 1024px) 50vw, 240px"
                      />
                    ) : (
                      <div className="flex h-full flex-col justify-end bg-warm-band p-5 text-on-warm">
                        <p className="text-[13px] font-medium text-on-warm-muted">{type}</p>
                        <p className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.03em]">
                          {name}
                        </p>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.02em] text-on-accent group-hover:underline">
                    {name}
                  </h3>
                  <p className="mt-1 text-[15px] text-band-muted">{type}</p>
                  <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-band-muted">
                    {description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
