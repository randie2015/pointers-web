'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AppLocale } from '@/i18n/routing';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

const MESSAGE_BUNDLES = { es: esMessages, en: enMessages } as const;

type LocaleContextValue = {
  locale: AppLocale;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function ClientIntlProvider({
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

  return (
    <LocaleContext.Provider value={{ locale }}>
      <NextIntlClientProvider locale={locale} messages={MESSAGE_BUNDLES[locale]} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}

export function useClientLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useClientLocale must be used within ClientIntlProvider');
  return ctx;
}
