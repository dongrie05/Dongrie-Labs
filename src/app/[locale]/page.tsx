import { getTranslations } from 'next-intl/server';
import {
  ContinuousMascot,
  HeroAILayer,
  ProblemSection,
  HowAILayerHelps,
  TeamImpact,
  HowToStart,
  SecondaryOffer,
  AboutContact,
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
    <div className="relative">
      <ContinuousMascot />
      <HeroAILayer />
      <ProblemSection />
      <HowAILayerHelps />
      <TeamImpact />
      <HowToStart />
      <SecondaryOffer />
      <AboutContact />
    </div>
  );
}
