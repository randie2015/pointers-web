'use client';

import { startTransition, type MouseEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useLocaleSwitch } from '@/i18n/locale-provider';
import { swapLocaleInPath } from '@/i18n/locale-path';
import { cn } from '@/lib/utils';
import type { AppLocale } from '@/i18n/routing';

type LocaleSwitcherProps = {
  className?: string;
  onSwitch?: () => void;
};

export function LocaleSwitcher({ className, onSwitch }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const { switchLocale } = useLocaleSwitch();
  const router = useRouter();
  const pathname = usePathname();
  const otherLocale: AppLocale = locale === 'es' ? 'en' : 'es';

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const nuevaURL = swapLocaleInPath(pathname, otherLocale);
    const scrollY = window.scrollY;

    startTransition(() => {
      switchLocale(otherLocale);
      router.replace(nuevaURL, { scroll: false });
    });

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
    });

    onSwitch?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'touch-press rounded-lg px-2 py-1 text-xs uppercase tracking-widest text-white/70 transition-colors duration-150 hover:text-white active:bg-white/15 active:text-white',
        className
      )}
      aria-label={otherLocale === 'en' ? 'Switch to English' : 'Cambiar a español'}
      data-locale-from={locale}
      data-locale-to={otherLocale}
      data-target-path={swapLocaleInPath(pathname, otherLocale)}
    >
      {otherLocale}
    </button>
  );
}
