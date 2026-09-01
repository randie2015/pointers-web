import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { LocaleProvider } from '@/i18n/locale-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { SiteParticlesLayer } from '@/components/hero/site-particles-layer';
import { NotFoundContent } from '@/components/pages/not-found-content';
import { siteIconMetadata } from '@/lib/site-icons';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: '404 | Pointers',
  description: 'La página que buscas no existe o fue movida.',
  robots: { index: false, follow: false },
  ...siteIconMetadata()
};

export default function NotFoundPage() {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <LocaleProvider initialLocale="es">
          <SiteParticlesLayer />
          <div className="site-content-layer">
            <Header />
            <main>
              <NotFoundContent />
            </main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
