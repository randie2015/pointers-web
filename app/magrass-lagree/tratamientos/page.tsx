import type { Metadata } from 'next';
import { MagrassPageHero } from '@/components/magrass-lagree/page-hero';
import { MagrassTreatmentsSection } from '@/components/magrass-lagree/treatments-section';
import { MagrassClosingCtaSection } from '@/components/magrass-lagree/closing-cta-section';
import { treatmentsPage } from '@/src/data/magrassData';

export const metadata: Metadata = {
  title: `Tratamientos | Magrass LaGreé`,
  description: treatmentsPage.subtitle
};

export default function MagrassTreatmentsPage() {
  return (
    <>
      <MagrassPageHero
        eyebrow="Protocolos médicos"
        title={treatmentsPage.title}
        subtitle={treatmentsPage.subtitle}
        tone="cream"
      />
      <MagrassTreatmentsSection />
      <MagrassClosingCtaSection />
    </>
  );
}
