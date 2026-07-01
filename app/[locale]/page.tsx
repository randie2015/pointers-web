import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';

const ServicesHomePreview = dynamic(
  () =>
    import('@/components/sections/services-home-preview').then((m) => ({
      default: m.ServicesHomePreview
    }))
);

const Hero = dynamic(() => import('@/components/sections/hero').then((m) => ({ default: m.Hero })), {
  loading: () => <section className="min-h-screen bg-[#0a0a0b]" aria-hidden />
});

const BrandTrustSection = dynamic(
  () => import('@/components/workflow/BrandTrustSection').then((m) => ({ default: m.BrandTrustSection }))
);

const ProcessSection = dynamic(
  () => import('@/components/sections/process-section').then((m) => ({ default: m.ProcessSection }))
);

const WhySection = dynamic(
  () => import('@/components/sections/why-section').then((m) => ({ default: m.WhySection }))
);

const ContactCTA = dynamic(
  () => import('@/components/sections/contact-cta').then((m) => ({ default: m.ContactCTA }))
);

const FaqSection = dynamic(
  () => import('@/components/sections/faq-section').then((m) => ({ default: m.FaqSection }))
);

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
