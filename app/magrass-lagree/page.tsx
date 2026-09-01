import { MagrassHeroSection, MagrassValuePillarsSection } from '@/components/magrass-lagree/hero-section';
import {
  MagrassCasesPreviewSection,
  MagrassLocationPreviewSection,
  MagrassWhyChooseSection
} from '@/components/magrass-lagree/home-sections';
import { MagrassFeaturedTreatmentsSection } from '@/components/magrass-lagree/featured-treatments-section';
import { MagrassDiagnosis360Section } from '@/components/magrass-lagree/diagnosis-360-section';
import { MagrassCtaZoneSection } from '@/components/magrass-lagree/cta-zone-section';
import { MagrassTestimonialsSection } from '@/components/magrass-lagree/testimonials-section';

export default function MagrassHomePage() {
  return (
    <>
      <MagrassHeroSection />
      <MagrassValuePillarsSection />
      <MagrassFeaturedTreatmentsSection />
      <MagrassWhyChooseSection />
      <MagrassCtaZoneSection />
      <MagrassCasesPreviewSection />
      <MagrassTestimonialsSection />
      <MagrassDiagnosis360Section />
      <MagrassLocationPreviewSection />
    </>
  );
}
