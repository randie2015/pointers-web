import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services-section';
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
      <ServicesSection />
      <ProcessSection />
      <WhySection />
      <ContactCTA />
      <FaqSection />
    </>
  );
}
