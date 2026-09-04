import { notFound } from 'next/navigation';
import { AestheticPageHero } from '@/components/aesthetic-demo/page-hero';
import { AestheticTeamSection } from '@/components/aesthetic-demo/team-section';
import { AestheticClosingCtaSection } from '@/components/aesthetic-demo/closing-cta-section';
import { getResolvedAestheticDemo, isAestheticDemoSlug } from '@/lib/aesthetic-demo/registry';

export default async function AestheticSpecialistsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAestheticDemoSlug(slug)) notFound();

  const demo = getResolvedAestheticDemo(slug);

  return (
    <>
      <AestheticPageHero
        eyebrow="Equipo médico"
        title={demo.specialistsPage.title}
        subtitle={demo.specialistsPage.subtitle}
        tone="cream"
      />
      <AestheticTeamSection />
      <AestheticClosingCtaSection />
    </>
  );
}
