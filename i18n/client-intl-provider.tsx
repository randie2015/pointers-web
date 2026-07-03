'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AppLocale } from '@/i18n/routing';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

const MESSAGE_BUNDLES = { es: esMessages, en: enMessages } as const;

type LocaleContextValue = {
  locale: AppLocale;
  switchLocaleInstant: (locale: AppLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function persistLocale(locale: AppLocale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function ClientIntlProvider({
  initialLocale,
  children
}: {
  initialLocale: AppLocale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<AppLocale>(initialLocale);

  const switchLocaleInstant = useCallback((next: AppLocale) => {
    if (next === locale) return;
    persistLocale(next);
    document.documentElement.lang = next;
    const path = window.location.pathname.replace(/^\/(es|en)(?=\/|$)/, `/${next}`);
    window.history.replaceState(null, '', `${path}${window.location.search}${window.location.hash}`);
    setLocale(next);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, switchLocaleInstant }}>
      <NextIntlClientProvider locale={locale} messages={MESSAGE_BUNDLES[locale]} timeZone="UTC">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}

export function useInstantLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useInstantLocale must be used within ClientIntlProvider');
  return ctx;
}
