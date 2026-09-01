import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ReyDentalExpiryGuard } from '@/components/rey-dental/expiry-guard';
import { ReyDentalNavbar } from '@/components/rey-dental/navbar';
import { ReyDentalFooter } from '@/components/rey-dental/footer';
import { clinicBrand } from '@/src/data/clinicData';
import { siteIconMetadata } from '@/lib/site-icons';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: `${clinicBrand.name} | ${clinicBrand.doctor}`,
  description: 'Clínica odontológica especializada en Arequipa. Tratamientos personalizados y atención sin dolor.',
  robots: { index: false, follow: false },
  ...siteIconMetadata()
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function ReyDentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen overflow-x-hidden bg-rey-base font-sans text-rey-ink antialiased">
        <ReyDentalExpiryGuard>
          <ReyDentalNavbar />
          <main className="overflow-x-hidden">{children}</main>
          <ReyDentalFooter />
        </ReyDentalExpiryGuard>
      </body>
    </html>
  );
}
