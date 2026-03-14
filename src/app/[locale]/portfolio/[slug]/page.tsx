import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { projects } from '@/lib/data/projects';
import { routing } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = projects.map((p) => p.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
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
  const overview =
    locale === 'pt' && project.overviewPt ? project.overviewPt : project.overview ?? project.description;

  const breadcrumbItems = [
    { label: tNav('home'), href: '/' },
    { label: tNav('portfolio'), href: '/portfolio' },
    { label: name },
  ];

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        <header className="mt-4">
          <div className="flex flex-wrap gap-2">
            {project.platform.map((p) => (
              <Badge key={p} variant="platform">
                {p}
              </Badge>
            ))}
          </div>
          <h1 className="font-heading mt-4 text-3xl font-bold text-white md:text-4xl">
            {name}
          </h1>
          <p className="mt-2 text-slate-400">{project.type}</p>
          {project.launchDate && (
            <p className="mt-1 text-sm text-slate-500">{project.launchDate}</p>
          )}
        </header>

        <div className="relative mt-12 aspect-video overflow-hidden rounded-2xl bg-navy-800 flex items-center justify-center">
          {project.image ? (
            <Image
              src={project.image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          ) : (
            <span className="text-8xl text-slate-600">📱</span>
          )}
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-white mb-4">
              {t('gallery')}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-xl bg-navy-800"
                >
                  <Image
                    src={src}
                    alt={`${name} screenshot ${i + 1}`}
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
          <h2 className="font-heading text-xl font-semibold text-white">
            Overview
          </h2>
          <p className="mt-4 text-slate-300">{overview}</p>
        </section>

        {project.techStack && project.techStack.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-white">
              {t('techStack')}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="tech">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {project.features && project.features.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-white">
              {t('features')}
            </h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-cyan-400">·</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-white">
              {t('results')}
            </h2>
            <div className="mt-4 flex flex-wrap gap-6">
              {project.metrics.downloads && (
                <p className="text-slate-300">Downloads: {project.metrics.downloads}</p>
              )}
              {project.metrics.rating && (
                <p className="text-slate-300">Rating: {project.metrics.rating}</p>
              )}
              {project.metrics.developmentTime && (
                <p className="text-slate-300">
                  Built in: {project.metrics.developmentTime}
                </p>
              )}
            </div>
          </section>
        )}

        {(project.appStoreUrl || project.playStoreUrl) && (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-semibold text-white">
              {t('links')}
            </h2>
            <div className="mt-4 flex gap-4">
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  App Store
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Google Play
                </a>
              )}
            </div>
          </section>
        )}

        <section className="mt-16 rounded-2xl border border-navy-800 bg-navy-900/60 p-8 text-center">
          <p className="font-heading text-lg font-semibold text-white">
            {t('wantSimilar')}
          </p>
          <Button href="/contact" variant="primary" className="mt-4">
            {tNav('contact')}
          </Button>
        </section>
      </div>
    </div>
  );
}
