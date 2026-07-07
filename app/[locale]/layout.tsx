import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { LocaleProvider } from '@/i18n/locale-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { HashScrollHandler } from '@/components/hash-scroll-handler';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '../globals.css';
import { siteIconMetadata } from '@/lib/site-icons';
import { SiteParticlesLayer } from '@/components/hero/site-particles-layer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const hero = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: t('title'),
    description: hero('subtitle'),
    ...siteIconMetadata(),
    alternates: {
      canonical: `/${locale}`,
      languages: { es: '/es', en: '/en', 'x-default': '/es' }
    },
    openGraph: {
      title: t('title'),
      description: hero('subtitle'),
      locale: locale === 'es' ? 'es_PE' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_PE'],
      images: [{ url: '/brand/logo-vertical-dark.png', width: 1000, height: 540, alt: 'Pointers' }]
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <LocaleProvider initialLocale={locale as 'es' | 'en'}>
          <SiteParticlesLayer />
          <div className="site-content-layer">
            <HashScrollHandler />
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
