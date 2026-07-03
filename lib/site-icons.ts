/** Bump when favicon assets change to bust browser and PWA caches. */
export const SITE_ICON_VERSION = '3';

const v = `?v=${SITE_ICON_VERSION}`;

export const siteIcons = {
  favicon: `/favicon.ico${v}`,
  icon32: `/icon.png${v}`,
  appleTouchIcon: `/apple-touch-icon.png${v}`,
  icon192: `/icon-192.png${v}`,
  icon512: `/icon-512.png${v}`,
  manifest: `/manifest.json${v}`
} as const;

export function siteIconMetadata() {
  return {
    manifest: siteIcons.manifest,
    icons: {
      icon: [
        { url: siteIcons.favicon, sizes: 'any' },
        { url: siteIcons.icon32, type: 'image/png', sizes: '32x32' },
        { url: siteIcons.icon192, type: 'image/png', sizes: '192x192' },
        { url: siteIcons.icon512, type: 'image/png', sizes: '512x512' }
      ],
      apple: [{ url: siteIcons.appleTouchIcon, type: 'image/png', sizes: '180x180' }],
      shortcut: [{ url: siteIcons.favicon }]
    },
    appleWebApp: {
      capable: true,
      title: 'Pointers',
      statusBarStyle: 'default' as const
    }
  };
}
