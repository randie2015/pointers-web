import { notFound } from 'next/navigation';
import { AestheticPageHero } from '@/components/aesthetic-demo/page-hero';
import { AestheticCasesSection } from '@/components/aesthetic-demo/cases-section';
import { AestheticClosingCtaSection } from '@/components/aesthetic-demo/closing-cta-section';
import { getResolvedAestheticDemo, isAestheticDemoSlug } from '@/lib/aesthetic-demo/registry';

export default async function AestheticCasesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAestheticDemoSlug(slug)) notFound();

  const demo = getResolvedAestheticDemo(slug);

  return (
    <>
      <AestheticPageHero
        eyebrow="Prueba social clínica"
        title={demo.casesPage.title}
        subtitle={demo.casesPage.subtitle}
        tone="white"
      />
      <AestheticCasesSection />
      <AestheticClosingCtaSection />
    </>
  );
}
