import { MagrassHeroSection, MagrassValuePillarsSection } from '@/components/magrass-lagree/hero-section';
import {
  MagrassCasesPreviewSection,
  MagrassFeaturedTreatmentsSection,
  MagrassLocationPreviewSection,
  MagrassWhyChooseSection
} from '@/components/magrass-lagree/home-sections';
import { MagrassDiagnosis360Section } from '@/components/magrass-lagree/diagnosis-360-section';

export default function MagrassHomePage() {
  return (
    <>
      <MagrassHeroSection />
      <MagrassValuePillarsSection />
      <MagrassFeaturedTreatmentsSection />
      <MagrassWhyChooseSection />
      <MagrassCasesPreviewSection />
      <MagrassDiagnosis360Section />
      <MagrassLocationPreviewSection />
    </>
  );
}
