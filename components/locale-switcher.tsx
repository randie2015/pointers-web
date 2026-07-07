'use client';

import { useLocale } from 'next-intl';
import { useInstantLocale } from '@/i18n/client-intl-provider';
import { cn } from '@/lib/utils';
import type { AppLocale } from '@/i18n/routing';

type LocaleSwitcherProps = {
  className?: string;
  onSwitch?: () => void;
};

export function LocaleSwitcher({ className, onSwitch }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const { switchLocaleInstant } = useInstantLocale();
  const otherLocale: AppLocale = locale === 'es' ? 'en' : 'es';

  const handleSwitch = () => {
    switchLocaleInstant(otherLocale);
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
