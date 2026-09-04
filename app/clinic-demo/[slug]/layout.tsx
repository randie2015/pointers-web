import type { CSSProperties, ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ClinicExpiryGuard } from '@/components/clinic-demo/expiry-guard';
import { ClinicNavbar } from '@/components/clinic-demo/navbar';
import { ClinicFooter } from '@/components/clinic-demo/footer';
import { DemoProvider } from '@/components/clinic-demo/demo-provider';
import { DEMO_SLUGS, getResolvedDemo, isDemoSlug } from '@/lib/clinic-demo/registry';
import { siteIconMetadata } from '@/lib/site-icons';
import '../../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export function generateStaticParams() {
  return DEMO_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isDemoSlug(slug)) return {};

  const demo = getResolvedDemo(slug);
  return {
    title: `${demo.brand.name} · ${demo.brand.tagline}`,
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

export default async function ClinicDemoLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isDemoSlug(slug)) notFound();

  const demo = getResolvedDemo(slug);

  return (
    <html lang="es" className={`${inter.variable} ${cinzel.variable}`}>
      <head>
        <link rel="preload" href={demo.brand.heroPoster} as="image" type="image/webp" />
        <link rel="preload" href={demo.brand.doctorPhoto} as="image" fetchPriority="high" />
      </head>
      <body
        className="clinic-demo min-h-screen overflow-x-hidden bg-demo-base font-sans text-demo-ink antialiased"
        style={demo.themeStyle as CSSProperties}
      >
        <DemoProvider demo={demo}>
          <ClinicExpiryGuard demo={demo}>
            <ClinicNavbar />
            <main className="overflow-x-hidden">{children}</main>
            <ClinicFooter demo={demo} />
          </ClinicExpiryGuard>
        </DemoProvider>
      </body>
    </html>
  );
}
