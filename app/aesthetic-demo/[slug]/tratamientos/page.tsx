import { notFound } from 'next/navigation';
import { AestheticPageHero } from '@/components/aesthetic-demo/page-hero';
import { AestheticTreatmentsSection } from '@/components/aesthetic-demo/treatments-section';
import { AestheticClosingCtaSection } from '@/components/aesthetic-demo/closing-cta-section';
import { getResolvedAestheticDemo, isAestheticDemoSlug } from '@/lib/aesthetic-demo/registry';

export default async function AestheticTreatmentsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAestheticDemoSlug(slug)) notFound();

  const demo = getResolvedAestheticDemo(slug);

  return (
    <>
      <AestheticPageHero
        eyebrow="Protocolos médicos"
        title={demo.treatmentsPage.title}
        subtitle={demo.treatmentsPage.subtitle}
        tone="cream"
      />
      <AestheticTreatmentsSection />
      <AestheticClosingCtaSection />
    </>
  );
}
