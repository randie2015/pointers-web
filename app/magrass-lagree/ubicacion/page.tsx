import type { Metadata } from 'next';
import { MagrassPageHero } from '@/components/magrass-lagree/page-hero';
import { MagrassLocationSection } from '@/components/magrass-lagree/location-section';
import { MagrassClosingCtaSection } from '@/components/magrass-lagree/closing-cta-section';
import { locationPage } from '@/src/data/magrassData';

export const metadata: Metadata = {
  title: `Ubicación | Magrass LaGreé`,
  description: locationPage.subtitle
};

export default function MagrassLocationPage() {
  return (
    <>
      <MagrassPageHero eyebrow="Visítanos" title={locationPage.title} subtitle={locationPage.subtitle} tone="white" />
      <MagrassLocationSection />
      <MagrassClosingCtaSection />
    </>
  );
}
