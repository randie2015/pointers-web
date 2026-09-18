import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { ServicesHomePreview } from '@/components/sections/services-home-preview';

const BrandTrustSection = dynamic(() =>
  import('@/components/workflow/BrandTrustSection').then((m) => ({ default: m.BrandTrustSection }))
);
const ProcessSection = dynamic(() =>
  import('@/components/sections/process-section').then((m) => ({ default: m.ProcessSection }))
);
const WhySection = dynamic(() =>
  import('@/components/sections/why-section').then((m) => ({ default: m.WhySection }))
);
const ContactCTA = dynamic(() =>
  import('@/components/sections/contact-cta').then((m) => ({ default: m.ContactCTA }))
);
const FaqSection = dynamic(() =>
  import('@/components/sections/faq-section').then((m) => ({ default: m.FaqSection }))
);

/** Canvas: Dot Grid en toda la página. Neural Mesh solo en #cta-section / #contact-form. */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <ServicesHomePreview />
      <BrandTrustSection />
      <ProcessSection />
      <WhySection />
      <ContactCTA id="cta-section" />
      <FaqSection />
    </>
  );
}
