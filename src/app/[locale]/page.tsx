import { getTranslations } from 'next-intl/server';
import {
  HeroSection,
  CredibilityBar,
  ProofStrip,
  WhoIHelp,
  TechMarquee,
  ServicesOverview,
  PortfolioHighlights,
  ProcessTimeline,
  WhyDongrieLabs,
  FAQSection,
  FounderSection,
  CTASection,
} from '@/components/sections';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: { absolute: t('metaTitle') },
    description: t('subtitle'),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityBar />
      <ProofStrip />
      <TechMarquee />
      <WhoIHelp />
      <ServicesOverview />
      <PortfolioHighlights />
      <ProcessTimeline />
      <WhyDongrieLabs />
      <FAQSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
