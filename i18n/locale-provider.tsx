'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
  type ReactNode
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import type { AppLocale } from '@/i18n/routing';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

const MESSAGE_BUNDLES = { es: esMessages, en: enMessages } as const;

type LocaleContextValue = {
  locale: AppLocale;
  switchLocale: (nextLocale: AppLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readLocaleFromPath(pathname: string): AppLocale | null {
  const match = pathname.match(/^\/(es|en)(?=\/|$)/);
  return match ? (match[1] as AppLocale) : null;
}

export function useLocaleSwitch() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocaleSwitch must be used within LocaleProvider');
  }
  return context;
}

export function LocaleProvider({
  initialLocale,
  children
}: {
  initialLocale: AppLocale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<AppLocale>(initialLocale);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLocale(initialLocale);
    document.documentElement.lang = initialLocale;
  }, [initialLocale]);

  useEffect(() => {
    const onPopState = () => {
      const fromPath = readLocaleFromPath(window.location.pathname);
      if (fromPath) {
        setLocale(fromPath);
        document.documentElement.lang = fromPath;
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const switchLocale = useCallback(
    (nextLocale: AppLocale) => {
      if (nextLocale === locale) return;

      const scrollY = window.scrollY;

      startTransition(() => {
        setLocale(nextLocale);
        document.documentElement.lang = nextLocale;
        router.replace(pathname, { locale: nextLocale, scroll: false });
      });

      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
      });
    },
    [locale, pathname, router]
  );

  const contextValue = useMemo(
    () => ({
      locale,
      switchLocale
    }),
    [locale, switchLocale]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={locale} messages={MESSAGE_BUNDLES[locale]} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
