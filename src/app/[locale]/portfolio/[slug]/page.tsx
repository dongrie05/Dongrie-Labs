import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { projects } from '@/lib/data/projects';
import { routing } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = projects.map((p) => p.slug);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'project' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: `${t('notFoundTitle')} - ${tCommon('brandName')}` };
  const name = locale === 'pt' && project.namePt ? project.namePt : project.name;
  return {
    title: `${name} - ${tCommon('brandName')}`,
    description: locale === 'pt' && project.descriptionPt ? project.descriptionPt : project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const t = await getTranslations('project');
  const tNav = await getTranslations('nav');
  const name = locale === 'pt' && project.namePt ? project.namePt : project.name;
  const type = locale === 'pt' && project.typePt ? project.typePt : project.type;
  const overview =
    locale === 'pt' && project.overviewPt ? project.overviewPt : project.overview ?? project.description;
  const features =
    (locale === 'pt' && project.featuresPt?.length ? project.featuresPt : project.features) ?? [];

  const breadcrumbItems = [
    { label: tNav('home'), href: '/' },
    { label: tNav('portfolio'), href: '/portfolio' },
    { label: name },
  ];

  return (
    <div className="section-pad">
      <div className="wrap max-w-3xl">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mt-8">
          <p className="text-[15px] text-muted">{type}</p>
          <h1 className="headline mt-2">{name}</h1>
          {project.launchDate && <p className="mt-3 text-[15px] text-muted">{project.launchDate}</p>}
        </header>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl bg-paper">
          {project.image ? (
            <Image
              src={project.image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
            />
          ) : (
            <span className="flex h-full items-end p-8 text-[28px] font-semibold tracking-[-0.02em] text-muted">
              {name}
            </span>
          )}
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('gallery')}</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-2xl bg-paper">
                  <Image
                    src={src}
                    alt={`${name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('overviewTitle')}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted">{overview}</p>
        </section>

        {project.techStack && project.techStack.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('techStack')}</h2>
            <p className="mt-3 text-[17px] text-muted">{project.techStack.join(', ')}</p>
          </section>
        )}

        {features.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('features')}</h2>
            <ul className="mt-4 space-y-2 text-[17px] text-muted">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <section className="mt-12">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('results')}</h2>
            <ul className="mt-4 space-y-2 text-[17px] text-muted">
              {project.metrics.downloads && <li>Downloads: {project.metrics.downloads}</li>}
              {project.metrics.rating && <li>Rating: {project.metrics.rating}</li>}
              {project.metrics.developmentTime && <li>Built in: {project.metrics.developmentTime}</li>}
            </ul>
          </section>
        )}

        {(project.appStoreUrl || project.playStoreUrl || project.productUrl) && (
          <section className="mt-12">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('links')}</h2>
            <ul className="mt-4 space-y-2 text-[17px]">
              {project.productUrl && (
                <li>
                  <a href={project.productUrl} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                    {t('visitProduct')}
                  </a>
                </li>
              )}
              {project.appStoreUrl && (
                <li>
                  <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                    App Store
                  </a>
                </li>
              )}
              {project.playStoreUrl && (
                <li>
                  <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                    Google Play
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        <section className="mt-16">
          <p className="text-[22px] font-semibold tracking-[-0.02em]">{t('wantSimilar')}</p>
          <Button href="/contact" variant="primary" className="mt-4">
            {tNav('contact')}
          </Button>
        </section>

        <p className="mt-10">
          <Link href="/portfolio" className="text-[17px] text-link hover:underline">
            {t('backToPortfolio')}
          </Link>
        </p>
      </div>
    </div>
  );
}
