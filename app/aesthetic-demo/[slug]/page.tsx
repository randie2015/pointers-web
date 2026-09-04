import { notFound } from 'next/navigation';
import { AestheticHeroSection, AestheticValuePillarsSection } from '@/components/aesthetic-demo/hero-section';
import {
  AestheticCasesPreviewSection,
  AestheticLocationPreviewSection,
  AestheticWhyChooseSection
} from '@/components/aesthetic-demo/home-sections';
import { AestheticFeaturedTreatmentsSection } from '@/components/aesthetic-demo/featured-treatments-section';
import { AestheticDiagnosis360Section } from '@/components/aesthetic-demo/diagnosis-360-section';
import { AestheticCtaZoneSection } from '@/components/aesthetic-demo/cta-zone-section';
import { AestheticTestimonialsSection } from '@/components/aesthetic-demo/testimonials-section';
import { isAestheticDemoSlug } from '@/lib/aesthetic-demo/registry';

export default async function AestheticDemoHomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isAestheticDemoSlug(slug)) notFound();

  return (
    <>
      <AestheticHeroSection />
      <AestheticValuePillarsSection />
      <AestheticFeaturedTreatmentsSection />
      <AestheticWhyChooseSection />
      <AestheticCtaZoneSection />
      <AestheticCasesPreviewSection />
      <AestheticTestimonialsSection />
      <AestheticDiagnosis360Section />
      <AestheticLocationPreviewSection />
    </>
  );
}
