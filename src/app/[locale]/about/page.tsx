import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const FOUNDER_IMAGE = '/images/portfolio/founder.JPG';

const TECH_GROUPS: Array<{ category: 'techLanguages' | 'techFrameworks' | 'techAi' | 'techData' | 'techOther'; items: string[] }> = [
  { category: 'techLanguages', items: ['TypeScript', 'Swift', 'Dart', 'Python', 'JavaScript', 'Kotlin'] },
  { category: 'techFrameworks', items: ['Next.js', 'React Native', 'Flutter', 'Node.js'] },
  { category: 'techAi', items: ['OpenAI', 'Anthropic', 'Gemini', 'Perplexity', 'Ollama', 'OpenClaw'] },
  { category: 'techData', items: ['PostgreSQL', 'Supabase', 'Firebase'] },
  { category: 'techOther', items: ['Tailwind', 'Vercel'] },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  return {
    title: `${t('title')} - ${tCommon('brandName')}`,
    description: t('heroSubtitle'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('about');
  const tNav = await getTranslations('nav');

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Hero: name + mission */}
        <section className="flex flex-col gap-12 md:flex-row md:items-start">
          <AnimateOnScroll variant="slideLeft">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-800/50 sm:max-w-lg">
              <Image
                src={FOUNDER_IMAGE}
                alt={t('heroTitle')}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 512px"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)',
                }}
              />
            </div>
          </AnimateOnScroll>
          <div className="flex-1">
            <AnimateOnScroll variant="slideRight" delay={0.1}>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
                {t('heroTitle')}
              </h1>
              <p className="mt-4 text-xl text-cyan-400">{t('heroSubtitle')}</p>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                {t('mission')}
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Why I do this + who I help */}
        <AnimateOnScroll>
          <section className="mt-20">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('storyTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t('story')}
            </p>
          </section>
        </AnimateOnScroll>

        {/* Proof: SmartMeal + users */}
        <AnimateOnScroll>
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('proofTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t('proof')}
            </p>
          </section>
        </AnimateOnScroll>

        {/* Commitment: 30 min + flexibility */}
        <AnimateOnScroll>
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('commitmentTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t('commitment')}
            </p>
          </section>
        </AnimateOnScroll>

        {/* How I work: product as mine, understood */}
        <AnimateOnScroll>
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('howIWorkTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t('howIWork')}
            </p>
          </section>
        </AnimateOnScroll>

        {/* What you can expect + values */}
        <AnimateOnScroll>
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('philosophyTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t('philosophy')}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {(['speed', 'quality', 'transparency', 'aiFirst'] as const).map(
                (key, i) => (
                  <AnimateOnScroll
                    key={key}
                    variant="fadeUp"
                    delay={i * 0.08}
                  >
                    <Card className="text-center">
                      <p className="font-heading font-semibold text-white">
                        {t(`values.${key}`)}
                      </p>
                    </Card>
                  </AnimateOnScroll>
                )
              )}
            </div>
          </section>
        </AnimateOnScroll>

        {/* Beyond code: athlete + degree */}
        <AnimateOnScroll>
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('personalTitle')}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              {t('personal')}
            </p>
          </section>
        </AnimateOnScroll>

        {/* Vision: when people think apps/AI, think of me */}
        <AnimateOnScroll>
          <section className="mt-16 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8">
            <p className="text-lg font-medium leading-relaxed text-slate-200">
              {t('vision')}
            </p>
          </section>
        </AnimateOnScroll>

        {/* Tech & tools */}
        <AnimateOnScroll>
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-semibold text-white">
              {t('techTitle')}
            </h2>
            <p className="mt-2 text-slate-500 text-sm">
              {t('techSubtitle')}
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TECH_GROUPS.map((group, gi) => (
                <AnimateOnScroll key={group.category} variant="fadeUp" delay={gi * 0.06}>
                  <div className="rounded-2xl border border-white/[0.06] bg-navy-900/50 p-5 transition-all duration-300 hover:border-white/[0.08] hover:bg-navy-900/70">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-4">
                      {t(group.category)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-blue-500/25 hover:bg-blue-500/10 hover:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </section>
        </AnimateOnScroll>

        {/* CTA: addresses "can't invest that much" */}
        <AnimateOnScroll>
          <section className="mt-20 rounded-2xl border border-white/[0.06] bg-navy-900/60 p-8 text-center card-glow">
            <p className="font-heading text-xl font-semibold text-white">
              {t('ctaTitle')}
            </p>
            <p className="mt-3 text-slate-400">{t('ctaSubtitle')}</p>
            <Button href="/contact" variant="primary" className="mt-6">
              {t('ctaButton')}
            </Button>
          </section>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
