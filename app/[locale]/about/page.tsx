import { setRequestLocale, getTranslations } from 'next-intl/server';
import { WhySection } from '@/components/sections/why-section';
import { ProcessSection } from '@/components/sections/process-section';
import { ContactCTA } from '@/components/sections/contact-cta';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'why' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <WhySection />
      <ProcessSection />
      <ContactCTA />
    </>
  );
}
