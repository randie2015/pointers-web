import type { CSSProperties, ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { AestheticExpiryGuard } from '@/components/aesthetic-demo/expiry-guard';
import { AestheticNavbar } from '@/components/aesthetic-demo/navbar';
import { AestheticFooter } from '@/components/aesthetic-demo/footer';
import { AestheticWhatsAppFloat } from '@/components/aesthetic-demo/whatsapp-float';
import { AestheticDemoProvider } from '@/components/aesthetic-demo/demo-provider';
import {
  AESTHETIC_SLUGS,
  getResolvedAestheticDemo,
  isAestheticDemoSlug
} from '@/lib/aesthetic-demo/registry';
import { siteIconMetadata } from '@/lib/site-icons';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export function generateStaticParams() {
  return AESTHETIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isAestheticDemoSlug(slug)) return {};

  const demo = getResolvedAestheticDemo(slug);
  return {
    title: `${demo.brand.name} | ${demo.brand.tagline} en ${demo.contact.city}`,
    description: demo.home.hero.subtitle,
    robots: { index: false, follow: false },
    ...siteIconMetadata()
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default async function AestheticDemoLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isAestheticDemoSlug(slug)) notFound();

  const demo = getResolvedAestheticDemo(slug);

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <link rel="preload" href={demo.brand.heroPoster} as="image" type="image/webp" />
      </head>
      <body
        className="aesthetic-demo min-h-screen overflow-x-hidden bg-demo-base font-jakarta text-demo-ink antialiased"
        style={demo.themeStyle as CSSProperties}
      >
        <AestheticDemoProvider demo={demo}>
          <AestheticExpiryGuard demo={demo}>
            <AestheticNavbar />
            <main className="overflow-x-hidden pb-20 sm:pb-24">{children}</main>
            <AestheticFooter demo={demo} />
            <AestheticWhatsAppFloat />
          </AestheticExpiryGuard>
        </AestheticDemoProvider>
      </body>
    </html>
  );
}
