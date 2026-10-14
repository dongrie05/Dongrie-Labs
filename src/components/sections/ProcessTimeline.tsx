import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';

const STEPS = [
  { title: 'step1Title', desc: 'step1Desc' },
  { title: 'step2Title', desc: 'step2Desc' },
  { title: 'step3Title', desc: 'step3Desc' },
  { title: 'step4Title', desc: 'step4Desc' },
] as const;

const REASONS = ['accountability', 'aiPowered', 'weeksNotMonths', 'pricing'] as const;

export async function ProcessTimeline() {
  const t = await getTranslations('process');
  const why = await getTranslations('why');

  return (
    <section className="bg-warm-band text-on-warm section-pad">
      <div className="wrap">
        <h2 className="headline text-on-warm">{t('title')}</h2>
        <p className="lede text-on-warm-muted">{t('subtitle')}</p>

        <ol className="mt-14 max-w-3xl">
          {STEPS.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-on-warm/30 py-8">
              <span className="text-[17px] font-semibold tabular-nums text-on-warm">{index + 1}</span>
              <div>
                <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{t(step.title)}</h3>
                <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-on-warm-muted">{t(step.desc)}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-on-warm/30 pt-12">
          <h3 className="text-[22px] font-semibold tracking-[-0.02em]">{why('title')}</h3>
          <p className="mt-3 max-w-prose text-[17px] text-on-warm-muted">{why('subtitle')}</p>
          <dl className="mt-10 grid gap-10 md:grid-cols-2">
            {REASONS.map((key) => (
              <div key={key}>
                <dt className="text-[17px] font-semibold">{why(`${key}.title`)}</dt>
                <dd className="mt-2 text-[17px] leading-relaxed text-on-warm-muted">{why(`${key}.desc`)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Button href="/contact" variant="primary" tone="inverse" className="mt-12">
          {t('ctaQuote')}
        </Button>
      </div>
    </section>
  );
}
