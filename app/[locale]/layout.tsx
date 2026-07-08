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
import { SiteParticlesLayer } from '@/components/hero/site-particles-layer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const OG_IMAGE = {
  url: 'https://pointers.marketing/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: 'Pointers | Branding y Diseño Web'
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
    title: 'Pointers | Agencia de Branding y Diseño Web Premium',
    description:
      'Especialistas en branding corporativo y desarrollo web de alto nivel. Construimos identidades visuales con estética limpia y experiencias digitales exclusivas para marcas exigentes.',
    keywords: [
      'agencia de branding',
      'diseño web premium',
      'branding corporativo',
      'desarrollo web',
      'identidad visual',
      'diseño UI/UX',
      'estética minimalista',
      'creación de marcas'
    ],
    ...siteIconMetadata(),
    alternates: {
      canonical: `/${locale}`,
      languages: { es: '/es', en: '/en', 'x-default': '/es' }
    },
    openGraph: {
      title: 'Pointers | Agencia de Branding y Diseño Web Premium',
      description: 'Especialistas en branding corporativo y desarrollo web de alto nivel.',
      url: 'https://pointers.marketing',
      siteName: 'Pointers',
      images: [OG_IMAGE],
      locale: isSpanish ? 'es_PE' : 'en_US',
      alternateLocale: isSpanish ? ['en_US'] : ['es_PE'],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Pointers | Agencia de Branding y Diseño Web Premium',
      description: 'Especialistas en branding corporativo y desarrollo web de alto nivel.',
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
