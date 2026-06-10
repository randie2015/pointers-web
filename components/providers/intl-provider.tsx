'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import es from '@/messages/es.json';
import en from '@/messages/en.json';

const MESSAGES = { es, en } as const;

export type AppLocale = keyof typeof MESSAGES;

type IntlContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

const IntlContext = createContext<IntlContextValue | null>(null);

function persistLocale(locale: AppLocale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
  document.documentElement.lang = locale;
}

function syncUrlLocale(locale: AppLocale) {
  const { pathname, search, hash } = window.location;
  const nextPath =
    pathname.replace(/^\/(es|en)(?=\/|$)/, `/${locale}`) ||
    `/${locale}`;
  window.history.replaceState(window.history.state, '', `${nextPath}${search}${hash}`);
}

export function IntlProvider({
  children,
  initialLocale
}: {
  children: ReactNode;
  initialLocale: AppLocale;
}) {
  const [locale, setLocaleState] = useState<AppLocale>(initialLocale);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState((current) => {
      if (current === next) return current;
      persistLocale(next);
      syncUrlLocale(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <IntlContext.Provider value={value}>
      <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </IntlContext.Provider>
  );
}

export function useAppLocale() {
  const ctx = useContext(IntlContext);
  if (!ctx) {
    throw new Error('useAppLocale must be used within IntlProvider');
  }
  return ctx;
}
