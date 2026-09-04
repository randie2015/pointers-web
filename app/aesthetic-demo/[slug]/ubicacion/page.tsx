import { notFound } from 'next/navigation';
import { AestheticPageHero } from '@/components/aesthetic-demo/page-hero';
import { AestheticLocationSection } from '@/components/aesthetic-demo/location-section';
import { AestheticClosingCtaSection } from '@/components/aesthetic-demo/closing-cta-section';
import { getResolvedAestheticDemo, isAestheticDemoSlug } from '@/lib/aesthetic-demo/registry';

export default async function AestheticLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAestheticDemoSlug(slug)) notFound();

  const demo = getResolvedAestheticDemo(slug);

  return (
    <>
      <AestheticPageHero
        eyebrow="Visítanos"
        title={demo.locationPage.title}
        subtitle={demo.locationPage.subtitle}
        tone="white"
      />
      <AestheticLocationSection />
      <AestheticClosingCtaSection />
    </>
  );
}
