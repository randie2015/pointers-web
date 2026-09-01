import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { DraAlejandraExpiryGuard } from '@/components/dra-alejandra/expiry-guard';
import { DraAlejandraNavbar } from '@/components/dra-alejandra/navbar';
import { DraAlejandraFooter } from '@/components/dra-alejandra/footer';
import { clinicBrand } from '@/src/data/alejandraData';
import { siteIconMetadata } from '@/lib/site-icons';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: `${clinicBrand.name} · Odontología Estética Boutique`,
  description:
    'Diseño de sonrisas, carillas, blanqueamiento boutique y estética dental de alta precisión en Arequipa. Especialista USP Brasil.',
  robots: { index: false, follow: false },
  ...siteIconMetadata()
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function DraAlejandraLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preload" href={clinicBrand.heroPoster} as="image" type="image/webp" />
        <link rel="preload" href={clinicBrand.doctorPhoto} as="image" fetchPriority="high" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-ale-ivory font-sans text-ale-ink antialiased">
        <DraAlejandraExpiryGuard>
          <DraAlejandraNavbar />
          <main className="overflow-x-hidden">{children}</main>
          <DraAlejandraFooter />
        </DraAlejandraExpiryGuard>
      </body>
    </html>
  );
}
