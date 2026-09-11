import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
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
import { GlobalCanvasBackground } from '@/components/backgrounds/GlobalCanvasBackground';
import { OG_COPY, OG_THUMBNAIL_HEIGHT, OG_THUMBNAIL_WIDTH, resolveOgLocale } from '@/lib/og';

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
  const ogLocale = resolveOgLocale(locale);
  const og = OG_COPY[ogLocale];
  const isSpanish = ogLocale === 'es';
  const ogImage = {
    url: '/opengraph-image',
    width: OG_THUMBNAIL_WIDTH,
    height: OG_THUMBNAIL_HEIGHT,
    alt: og.alt
  };

  return {
    title: og.alt,
    description:
      ogLocale === 'es'
        ? 'Firma boutique de infraestructura comercial, desarrollo web de alto rendimiento y sistemas de conversión para marcas B2B de alto ticket.'
        : 'Boutique firm for commercial infrastructure, high-performance web development and conversion systems for high-ticket B2B brands.',
    keywords: [
      'infraestructura comercial',
      'desarrollo web B2B',
      'sistemas de conversión',
      'Next.js',
      'embudos comerciales',
      'arquitectura de marca',
      'plataformas de alto rendimiento'
    ],
    ...siteIconMetadata(),
    alternates: {
      canonical: `/${locale}`,
      languages: { es: '/es', en: '/en', 'x-default': '/es' }
    },
    openGraph: {
      title: og.alt,
      description: og.description,
      url: 'https://pointers.marketing',
      siteName: 'Pointers',
      images: [ogImage],
      locale: isSpanish ? 'es_PE' : 'en_US',
      alternateLocale: isSpanish ? ['en_US'] : ['es_PE'],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: og.alt,
      description: og.description,
      images: [ogImage.url]
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
          <GlobalCanvasBackground />
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
