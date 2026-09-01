import type { Metadata } from 'next';
import { MagrassPageHero } from '@/components/magrass-lagree/page-hero';
import { MagrassCasesSection } from '@/components/magrass-lagree/cases-section';
import { MagrassClosingCtaSection } from '@/components/magrass-lagree/closing-cta-section';
import { casesPage } from '@/src/data/magrassData';

export const metadata: Metadata = {
  title: `Casos Clínicos | Magrass LaGreé`,
  description: casesPage.subtitle
};

export default function MagrassCasesPage() {
  return (
    <>
      <MagrassPageHero eyebrow="Prueba social clínica" title={casesPage.title} subtitle={casesPage.subtitle} tone="white" />
      <MagrassCasesSection />
      <MagrassClosingCtaSection />
    </>
  );
}
