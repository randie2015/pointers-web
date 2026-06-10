import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ServicesSection } from '@/components/sections/services-section';
import { ContactCTA } from '@/components/sections/contact-cta';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <ServicesSection />
      <ContactCTA />
    </>
  );
}
