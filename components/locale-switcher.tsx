'use client';

import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import { useAppLocale, type AppLocale } from '@/components/providers/intl-provider';

type LocaleSwitcherProps = {
  className?: string;
  onSwitch?: () => void;
};

export function LocaleSwitcher({ className, onSwitch }: LocaleSwitcherProps) {
  const { locale, setLocale } = useAppLocale();
  const [, startTransition] = useTransition();
  const otherLocale: AppLocale = locale === 'es' ? 'en' : 'es';

  const handleSwitch = () => {
    startTransition(() => {
      setLocale(otherLocale);
      onSwitch?.();
    });
  };

  return (
    <button
      type="button"
      onClick={handleSwitch}
      className={cn(
        'text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white',
        className
      )}
      aria-label={otherLocale === 'en' ? 'Switch to English' : 'Cambiar a español'}
    >
      {otherLocale}
    </button>
  );
}
