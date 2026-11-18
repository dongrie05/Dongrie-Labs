'use client';

import Image from 'next/image';
import { Link } from '@/navigation';
import type { Project } from '@/types';

interface PortfolioCardProps {
  project: Project;
  locale?: string;
}

export function PortfolioCard({ project, locale = 'en' }: PortfolioCardProps) {
  const name = locale === 'pt' && project.namePt ? project.namePt : project.name;
  const description =
    locale === 'pt' && project.descriptionPt ? project.descriptionPt : project.description;
  const type = locale === 'pt' && project.typePt ? project.typePt : project.type;

  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-paper">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              className="object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full flex-col justify-end bg-warm-band p-6 text-on-warm">
              <p className="text-[15px] font-medium text-on-warm-muted">{type}</p>
              <p className="mt-3 text-[40px] font-semibold leading-none tracking-[-0.03em]">{name}</p>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col py-4">
          <h3 className="text-[20px] font-semibold tracking-[-0.02em] group-hover:underline">{name}</h3>
          <p className="mt-1 text-[15px] font-medium text-accent">{type}</p>
          <p className="mt-3 line-clamp-3 text-[17px] leading-relaxed text-muted">{description}</p>
        </div>
      </article>
    </Link>
  );
}
