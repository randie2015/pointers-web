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

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const OG_IMAGE = {
  url: 'https://pointers.marketing/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: 'Pointers | Infraestructura comercial y desarrollo B2B'
};

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
  const isSpanish = locale === 'es';

  return {
    title: 'Pointers | Infraestructura comercial y desarrollo B2B',
    description:
      'Firma boutique de infraestructura comercial, desarrollo web de alto rendimiento y sistemas de conversión para marcas B2B de alto ticket.',
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
      title: 'Pointers | Infraestructura comercial y desarrollo B2B',
      description:
        'Plataformas digitales de alto rendimiento y arquitectura comercial para marcas que no pueden permitirse perder clientes.',
      url: 'https://pointers.marketing',
      siteName: 'Pointers',
      images: [OG_IMAGE],
      locale: isSpanish ? 'es_PE' : 'en_US',
      alternateLocale: isSpanish ? ['en_US'] : ['es_PE'],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pointers | Infraestructura comercial y desarrollo B2B',
      description:
        'Plataformas digitales de alto rendimiento y arquitectura comercial para marcas que no pueden permitirse perder clientes.',
      images: [OG_IMAGE.url]
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
