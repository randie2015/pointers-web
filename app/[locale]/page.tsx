import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { ServicesHomePreview } from '@/components/sections/services-home-preview';
import { BrandTrustSection } from '@/components/workflow/BrandTrustSection';
import { ProcessSection } from '@/components/sections/process-section';
import { WhySection } from '@/components/sections/why-section';
import { ContactCTA } from '@/components/sections/contact-cta';
import { FaqSection } from '@/components/sections/faq-section';

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
      <ContactCTA />
      <FaqSection />
    </>
  );
}
