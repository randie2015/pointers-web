import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';

const ServicesPageHero = dynamic(
  () => import('@/components/sections/services-page-hero').then((m) => ({ default: m.ServicesPageHero }))
);

const ServicesOfferingsSection = dynamic(
  () =>
    import('@/components/sections/services-offerings-section').then((m) => ({
      default: m.ServicesOfferingsSection
    }))
);

const BrandTrustSection = dynamic(
  () => import('@/components/workflow/BrandTrustSection').then((m) => ({ default: m.BrandTrustSection }))
);

const ProcessSection = dynamic(
  () => import('@/components/sections/process-section').then((m) => ({ default: m.ProcessSection }))
);

const ServicesCta = dynamic(
  () => import('@/components/sections/services-cta').then((m) => ({ default: m.ServicesCta }))
);

const FaqSection = dynamic(
  () => import('@/components/sections/faq-section').then((m) => ({ default: m.FaqSection }))
);

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'servicesPage.meta' });
  return { title: t('title'), description: t('description') };
}

export default async function ServiciosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesPageHero />
      <ServicesOfferingsSection />
      <BrandTrustSection />
      <ProcessSection namespace="servicesPage.process" sectionId="proceso" />
      <ServicesCta />
      <FaqSection namespace="servicesPage.faq" sectionId="preguntas" />
    </>
  );
}
