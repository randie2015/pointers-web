import { DraAlejandraHeroSection } from '@/components/dra-alejandra/hero-section';
import { DraAlejandraCasesSection } from '@/components/dra-alejandra/cases-section';
import { DraAlejandraStatsSection } from '@/components/dra-alejandra/stats-section';
import { DraAlejandraTreatmentsSection } from '@/components/dra-alejandra/treatments-section';
import { DraAlejandraProcessSection } from '@/components/dra-alejandra/process-section';
import { DraAlejandraLocationSection } from '@/components/dra-alejandra/location-section';
import { DraAlejandraClosingCtaSection } from '@/components/dra-alejandra/closing-cta-section';

export default function DraAlejandraHomePage() {
  return (
    <>
      <DraAlejandraHeroSection />
      <DraAlejandraCasesSection />
      <DraAlejandraStatsSection />
      <DraAlejandraTreatmentsSection />
      <DraAlejandraProcessSection />
      <DraAlejandraLocationSection />
      <DraAlejandraClosingCtaSection />
    </>
  );
}
