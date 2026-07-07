'use client';

import { usePathname as useIntlPathname } from '@/i18n/routing';
import { buildLocalizedPath, swapLocaleInPath } from '@/i18n/locale-path';
import { useLocale } from 'next-intl';
import { usePathname as useNextPathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { AppLocale } from '@/i18n/routing';

type LocaleSwitcherProps = {
  className?: string;
  onSwitch?: () => void;
};

export function LocaleSwitcher({ className, onSwitch }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const intlPathname = useIntlPathname();
  const nextPathname = useNextPathname();
  const otherLocale: AppLocale = locale === 'es' ? 'en' : 'es';

  // Visible href: swap /es/ <-> /en/ on the real URL path.
  const hrefFromBrowserPath = swapLocaleInPath(nextPathname, otherLocale);
  const hrefFromIntlPath = buildLocalizedPath(intlPathname, otherLocale);
  const href = hrefFromBrowserPath || hrefFromIntlPath;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onSwitch?.();

    const targetPath = swapLocaleInPath(window.location.pathname, otherLocale);
    const targetUrl = `${targetPath}${window.location.search}${window.location.hash}`;

    window.location.assign(targetUrl);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'touch-press rounded-lg px-2 py-1 text-xs uppercase tracking-widest text-white/70 transition-colors duration-150 hover:text-white active:bg-white/15 active:text-white',
        className
      )}
      aria-label={otherLocale === 'en' ? 'Switch to English' : 'Cambiar a español'}
      data-locale-from={locale}
      data-locale-to={otherLocale}
      data-target-path={href}
    >
      {otherLocale}
    </a>
  );
}
