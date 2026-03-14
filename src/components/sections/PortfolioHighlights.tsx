'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/navigation';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/lib/data/projects';

const highlightedProjects = projects.filter((p) => p.highlighted);
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export function PortfolioHighlights() {
  const t = useTranslations('portfolio');
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);

  if (highlightedProjects.length === 0) return null;

  const cardClass = 'group w-[300px] shrink-0 snap-center sm:w-[340px] md:w-[400px] lg:w-[440px]';
  const viewAllClass = 'group w-[260px] shrink-0 snap-center sm:w-[280px] md:w-[320px]';

  const cards = (
    <>
      {highlightedProjects.map((project, i) => (
        <motion.div
          key={project.slug}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            delay: isMobile ? 0 : i * 0.1,
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className={cardClass}
        >
          <Link href={`/portfolio/${project.slug}`} className="block">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-900/60 transition-all duration-300 active:scale-[0.99] md:hover:border-white/[0.12] md:hover:-translate-y-2 md:hover:shadow-2xl md:hover:shadow-blue-500/[0.06]">
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-navy-800/40 sm:h-64">
                <span className="text-7xl text-navy-700/60 select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  📱
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 md:group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    {t('viewProject')} <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  {project.platform.map((p) => (
                    <Badge key={p} variant="platform" className="backdrop-blur-sm">
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{project.type}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="tech">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          delay: isMobile ? 0 : highlightedProjects.length * 0.1,
          duration: 0.6,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={viewAllClass}
      >
        <Link
          href="/portfolio"
          className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-navy-900/30 transition-all duration-300 active:scale-[0.99] md:min-h-[360px] md:hover:border-blue-500/30 md:hover:bg-navy-900/60"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-navy-800/60 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
            <ArrowRight className="h-6 w-6 text-slate-400 transition-all duration-300 group-hover:text-blue-400 group-hover:translate-x-1" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-400 transition-colors group-hover:text-white">
            {t('viewFull')}
          </p>
        </Link>
      </motion.div>
    </>
  );

  return (
    <section className="relative py-16 overflow-hidden sm:py-24" ref={scrollRef}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimateOnScroll>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-400">
                  {t('sectionLabel')}
                </p>
                <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {t('title')}
                </h2>
                <p className="mt-3 text-base text-slate-400 sm:text-lg">{t('subtitle')}</p>
              </div>
              <Link
                href="/portfolio"
                className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                {t('viewFull')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {isMobile ? (
        <div
          className="mt-10 flex gap-4 overflow-x-auto overflow-y-hidden pl-4 pr-4 scrollbar-hide sm:pl-6 lg:pl-8 [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch]"
        >
          {cards}
        </div>
      ) : (
        <motion.div
          className="mt-14 flex gap-6 pl-4 pr-4 sm:pl-6 lg:pl-8"
          style={{ x }}
        >
          {cards}
        </motion.div>
      )}
    </section>
  );
}
