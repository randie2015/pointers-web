import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { MagrassNavbar } from '@/components/magrass-lagree/navbar';
import { MagrassFooter } from '@/components/magrass-lagree/footer';
import { MagrassWhatsAppFloat } from '@/components/magrass-lagree/whatsapp-float';
import { clinicBrand } from '@/src/data/magrassData';
import { siteIconMetadata } from '@/lib/site-icons';
import '../globals.css';

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

export const metadata: Metadata = {
  title: `${clinicBrand.name} | ${clinicBrand.tagline} en Arequipa`,
  description:
    'Resultados naturales respaldados por rigor médico y tecnología de vanguardia. Medicina estética facial y corporal en Arequipa.',
  ...siteIconMetadata()
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function MagrassLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen overflow-x-hidden bg-mag-white font-jakarta text-mag-ink antialiased">
        <MagrassNavbar />
        <main className="overflow-x-hidden">{children}</main>
        <MagrassFooter />
        <MagrassWhatsAppFloat />
      </body>
    </html>
  );
}
