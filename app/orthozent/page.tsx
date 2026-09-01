import { OrthozentHeroSection } from '@/components/orthozent/hero-section';
import { OrthozentStatsSection } from '@/components/orthozent/stats-section';
import { OrthozentTreatmentsSection } from '@/components/orthozent/treatments-section';
import { OrthozentProcessSection } from '@/components/orthozent/process-section';
import { OrthozentLocationSection } from '@/components/orthozent/location-section';
import { OrthozentClosingCtaSection } from '@/components/orthozent/closing-cta-section';

export default function OrthozentHomePage() {
  return (
    <>
      <OrthozentHeroSection />
      <OrthozentStatsSection />
      <OrthozentTreatmentsSection />
      <OrthozentProcessSection />
      <OrthozentLocationSection />
      <OrthozentClosingCtaSection />
    </>
  );
}
