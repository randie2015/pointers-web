'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useInstantLocale } from '@/i18n/client-intl-provider';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/lib/use-media-query';
import type { AppLocale } from '@/i18n/routing';

type LocaleSwitcherProps = {
  className?: string;
  onSwitch?: () => void;
};

function persistLocale(locale: AppLocale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function LocaleSwitcher({ className, onSwitch }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const { switchLocaleInstant } = useInstantLocale();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const otherLocale: AppLocale = locale === 'es' ? 'en' : 'es';

  const handleSwitch = () => {
    persistLocale(otherLocale);

    if (isMobile) {
      switchLocaleInstant(otherLocale);
    } else {
      router.replace(pathname, { locale: otherLocale });
    }

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
