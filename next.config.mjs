import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-tsparticles',
      'tsparticles'
    ],
    staleTimes: { dynamic: 30, static: 180 }
  }
};

export default withNextIntl(nextConfig);
