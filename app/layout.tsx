import type { Metadata } from 'next';
import { siteIconMetadata } from '@/lib/site-icons';

export const metadata: Metadata = {
  metadataBase: new URL('https://pointers.marketing'),
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
  openGraph: {
    title: 'Pointers | Infraestructura comercial y desarrollo B2B',
    description:
      'Plataformas digitales de alto rendimiento y arquitectura comercial para marcas que no pueden permitirse perder clientes.',
    url: 'https://pointers.marketing',
    siteName: 'Pointers',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 627,
        alt: 'Pointers | Infraestructura comercial y desarrollo B2B'
      }
    ],
    locale: 'es_PE',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pointers | Infraestructura comercial y desarrollo B2B',
    description:
      'Plataformas digitales de alto rendimiento y arquitectura comercial para marcas que no pueden permitirse perder clientes.',
    images: ['/opengraph-image']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
