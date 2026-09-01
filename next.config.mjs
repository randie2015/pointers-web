import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:locale(es|en)/rey-dental',
        destination: '/rey-dental',
        permanent: true
      },
      {
        source: '/:locale(es|en)/rey-dental/:path*',
        destination: '/rey-dental/:path*',
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-tsparticles',
      'tsparticles'
    ],
    staleTimes: { dynamic: 0, static: 0 }
  }
};

export default withNextIntl(nextConfig);
