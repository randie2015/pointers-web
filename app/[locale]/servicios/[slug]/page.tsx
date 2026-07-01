import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SERVICE_SLUGS, isServiceSlug } from '@/lib/services';
import { ServiceDetailView } from '@/components/sections/service-detail-view';
import { ContactCTA } from '@/components/sections/contact-cta';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: 'serviceDetail' });
  return {
    title: `${t(`${slug}.badge`)} | Pointers`,
    description: t(`${slug}.subtitle`)
  };
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isServiceSlug(slug)) notFound();

  setRequestLocale(locale);

  return (
    <>
      <ServiceDetailView slug={slug} />
      <ContactCTA />
    </>
  );
}
