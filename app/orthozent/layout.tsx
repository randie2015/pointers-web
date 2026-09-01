import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { OrthozentExpiryGuard } from '@/components/orthozent/expiry-guard';
import { OrthozentNavbar } from '@/components/orthozent/navbar';
import { OrthozentFooter } from '@/components/orthozent/footer';
import { clinicBrand } from '@/src/data/orthozentData';
import { siteIconMetadata } from '@/lib/site-icons';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: `${clinicBrand.name} | Ortodoncia Especializada en Arequipa`,
  description:
    'Ortodoncia especializada, implantes, estética dental y odontología integral en Arequipa. Tecnología digital y atención personalizada.',
  robots: { index: false, follow: false },
  ...siteIconMetadata()
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function OrthozentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="preload" href={clinicBrand.heroPoster} as="image" type="image/webp" />
        <link rel="preload" href={clinicBrand.doctorPhoto} as="image" fetchPriority="high" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-ortho-base font-sans text-ortho-ink antialiased">
        <OrthozentExpiryGuard>
          <OrthozentNavbar />
          <main className="overflow-x-hidden">{children}</main>
          <OrthozentFooter />
        </OrthozentExpiryGuard>
      </body>
    </html>
  );
}
