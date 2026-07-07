'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AppLocale } from '@/i18n/routing';
import { swapLocaleInPath } from '@/i18n/locale-path';
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

      setLocale(nextLocale);
      document.documentElement.lang = nextLocale;

      const nextPath = swapLocaleInPath(window.location.pathname, nextLocale);
      const nextUrl = `${nextPath}${window.location.search}${window.location.hash}`;
      window.history.replaceState(window.history.state, '', nextUrl);

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    },
    [locale]
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
