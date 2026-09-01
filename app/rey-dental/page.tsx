import { ReyDentalHeroSection } from '@/components/rey-dental/hero-section';
import { ReyDentalStatsSection } from '@/components/rey-dental/stats-section';
import { ReyDentalTreatmentsSection } from '@/components/rey-dental/treatments-section';
import { ReyDentalProcessSection } from '@/components/rey-dental/process-section';
import { ReyDentalLocationSection } from '@/components/rey-dental/location-section';
import { ReyDentalClosingCtaSection } from '@/components/rey-dental/closing-cta-section';

export default function ReyDentalHomePage() {
  return (
    <>
      <ReyDentalHeroSection />
      <ReyDentalStatsSection />
      <ReyDentalTreatmentsSection />
      <ReyDentalProcessSection />
      <ReyDentalLocationSection />
      <ReyDentalClosingCtaSection />
    </>
  );
}
