import { MagrassHeroSection } from '@/components/magrass-lagree/hero-section';
import { MagrassTreatmentsSection } from '@/components/magrass-lagree/treatments-section';
import { MagrassProcessSection } from '@/components/magrass-lagree/process-section';
import { MagrassCasesSection } from '@/components/magrass-lagree/cases-section';
import { MagrassTeamSection } from '@/components/magrass-lagree/team-section';
import { MagrassLocationSection } from '@/components/magrass-lagree/location-section';
import { MagrassClosingCtaSection } from '@/components/magrass-lagree/closing-cta-section';

export default function MagrassHomePage() {
  return (
    <>
      <MagrassHeroSection />
      <MagrassTreatmentsSection />
      <MagrassProcessSection />
      <MagrassCasesSection />
      <MagrassTeamSection />
      <MagrassLocationSection />
      <MagrassClosingCtaSection />
    </>
  );
}
