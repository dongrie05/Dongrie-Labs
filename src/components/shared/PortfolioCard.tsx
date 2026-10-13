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
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <span className="flex h-full items-end p-5 text-[22px] font-semibold tracking-[-0.02em] text-muted">
              {name}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col py-4">
          <h3 className="text-[20px] font-semibold tracking-[-0.02em] group-hover:underline">{name}</h3>
          <p className="mt-1 text-[15px] text-muted">{type}</p>
          <p className="mt-3 line-clamp-3 text-[17px] leading-relaxed text-muted">{description}</p>
        </div>
      </article>
    </Link>
  );
}
