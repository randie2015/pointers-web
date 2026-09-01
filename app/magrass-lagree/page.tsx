import { MagrassHeroSection, MagrassValuePillarsSection } from '@/components/magrass-lagree/hero-section';
import {
  MagrassCasesPreviewSection,
  MagrassFeaturedTreatmentsSection,
  MagrassLocationPreviewSection,
  MagrassWhyChooseSection
} from '@/components/magrass-lagree/home-sections';
import { MagrassDiagnosis360Section } from '@/components/magrass-lagree/diagnosis-360-section';
import { MagrassCtaZoneSection } from '@/components/magrass-lagree/cta-zone-section';

export default function MagrassHomePage() {
  return (
    <>
      <MagrassHeroSection />
      <MagrassValuePillarsSection />
      <MagrassFeaturedTreatmentsSection />
      <MagrassWhyChooseSection />
      <MagrassCtaZoneSection />
      <MagrassCasesPreviewSection />
      <MagrassDiagnosis360Section />
      <MagrassLocationPreviewSection />
    </>
  );
}
