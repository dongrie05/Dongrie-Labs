import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const FOUNDER_IMAGE = '/images/portfolio/founder.JPG';

const TECH_GROUPS: Array<{
  category: 'techLanguages' | 'techFrameworks' | 'techAi' | 'techData' | 'techOther';
  items: string[];
}> = [
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

  const blocks = [
    { title: t('storyTitle'), body: t('story') },
    { title: t('proofTitle'), body: t('proof') },
    { title: t('commitmentTitle'), body: t('commitment') },
    { title: t('howIWorkTitle'), body: t('howIWork') },
    { title: t('philosophyTitle'), body: t('philosophy') },
    { title: t('personalTitle'), body: t('personal') },
  ];

  return (
    <div className="section-pad">
      <div className="wrap max-w-3xl">
        <div className="grid items-start gap-10 md:grid-cols-[220px_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper">
            <Image
              src={FOUNDER_IMAGE}
              alt={t('heroTitle')}
              fill
              className="object-cover object-top"
              sizes="220px"
              priority
            />
          </div>
          <div>
            <h1 className="headline">{t('heroTitle')}</h1>
            <p className="lede">{t('heroSubtitle')}</p>
            <p className="mt-6 text-[17px] leading-relaxed text-muted">{t('mission')}</p>
          </div>
        </div>

        <div className="mt-20 space-y-12">
          {blocks.map((block) => (
            <section key={block.title}>
              <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{block.title}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{block.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-[17px] leading-relaxed">{t('vision')}</p>

        <section className="mt-16">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{t('techTitle')}</h2>
          <p className="mt-2 text-[15px] text-muted">{t('techSubtitle')}</p>
          <dl className="mt-8 space-y-6">
            {TECH_GROUPS.map((group) => (
              <div key={group.category}>
                <dt className="text-[15px] font-medium text-ink">{t(group.category)}</dt>
                <dd className="mt-1 text-[17px] text-muted">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-20">
          <h2 className="text-[28px] font-semibold tracking-[-0.02em]">{t('ctaTitle')}</h2>
          <p className="mt-3 text-[17px] text-muted">{t('ctaSubtitle')}</p>
          <Button href="/contact" variant="primary" className="mt-6">
            {t('ctaButton')}
          </Button>
        </section>
      </div>
    </div>
  );
}
