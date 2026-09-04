import { notFound } from 'next/navigation';
import { ClinicHeroSection } from '@/components/clinic-demo/hero-section';
import { ClinicCasesSection } from '@/components/clinic-demo/cases-section';
import { ClinicStatsSection } from '@/components/clinic-demo/stats-section';
import { ClinicTreatmentsSection } from '@/components/clinic-demo/treatments-section';
import { ClinicProcessSection } from '@/components/clinic-demo/process-section';
import { ClinicLocationSection } from '@/components/clinic-demo/location-section';
import { ClinicClosingCtaSection } from '@/components/clinic-demo/closing-cta-section';
import { getResolvedDemo, isDentistDemoSlug } from '@/lib/clinic-demo/registry';

export default async function ClinicDemoHomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isDentistDemoSlug(slug)) notFound();

  const demo = getResolvedDemo(slug);

  return (
    <>
      <ClinicHeroSection demo={demo} />
      <ClinicCasesSection demo={demo} />
      <ClinicStatsSection demo={demo} />
      <ClinicTreatmentsSection demo={demo} />
      <ClinicProcessSection demo={demo} />
      <ClinicLocationSection demo={demo} />
      <ClinicClosingCtaSection demo={demo} />
    </>
  );
}
