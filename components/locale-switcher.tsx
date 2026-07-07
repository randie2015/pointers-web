'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { startTransition } from 'react';
import { cn } from '@/lib/utils';
import type { AppLocale } from '@/i18n/routing';

type LocaleSwitcherProps = {
  className?: string;
  onSwitch?: () => void;
};

function persistLocale(locale: AppLocale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
  document.documentElement.lang = locale;
}

export function LocaleSwitcher({ className, onSwitch }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const otherLocale: AppLocale = locale === 'es' ? 'en' : 'es';

  const handleSwitch = () => {
    if (otherLocale === locale) return;
    persistLocale(otherLocale);

    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
      router.refresh();
    });

    onSwitch?.();
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className={cn(
        'touch-press rounded-lg px-2 py-1 text-xs uppercase tracking-widest text-white/70 transition-colors duration-150 hover:text-white active:bg-white/15 active:text-white',
        className
      )}
      aria-label={otherLocale === 'en' ? 'Switch to English' : 'Cambiar a español'}
    >
      {otherLocale}
    </button>
  );
}
