'use client';

import Image from 'next/image';
import { Link } from '@/navigation';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

interface PortfolioCardProps {
  project: Project;
  locale?: string;
}

export function PortfolioCard({ project, locale = 'en' }: PortfolioCardProps) {
  const name = locale === 'pt' && project.namePt ? project.namePt : project.name;
  const description =
    locale === 'pt' && project.descriptionPt
      ? project.descriptionPt
      : project.description;

  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <div className="card-glow h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/60 transition-all duration-300 hover:border-white/[0.1] hover:-translate-y-1">
        <div className="relative flex h-52 items-center justify-center overflow-hidden bg-navy-800/40">
          {project.image ? (
            <Image
              src={project.image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <span className="text-6xl text-navy-700/60 select-none transition-transform duration-300 group-hover:scale-110">
              📱
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {project.platform.map((p) => (
              <Badge key={p} variant="platform" className="backdrop-blur-sm">
                {p}
              </Badge>
            ))}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {name}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">{project.type}</p>
            </div>
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 transition-colors duration-200 group-hover:text-blue-400" />
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-slate-400">{description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="tech">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
