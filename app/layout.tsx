import type { Metadata } from 'next';
import { siteIconMetadata } from '@/lib/site-icons';

export const metadata: Metadata = {
  metadataBase: new URL('https://pointers.marketing'),
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
  openGraph: {
    title: 'Pointers | Agencia de Branding y Diseño Web Premium',
    description: 'Especialistas en branding corporativo y desarrollo web de alto nivel.',
    url: 'https://pointers.marketing',
    siteName: 'Pointers',
    images: [
      {
        url: 'https://pointers.marketing/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Pointers | Branding y Diseño Web'
      }
    ],
    locale: 'es_PE',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pointers | Agencia de Branding y Diseño Web Premium',
    description: 'Especialistas en branding corporativo y desarrollo web de alto nivel.',
    images: ['https://pointers.marketing/opengraph-image.png']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
