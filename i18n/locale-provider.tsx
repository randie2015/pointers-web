'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AppLocale } from '@/i18n/routing';
import { markLocaleSwitchEnd, markLocaleSwitchStart } from '@/i18n/locale-switch';
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

function LocaleContextBridge({
  locale,
  setLocale,
  initialLocale,
  children
}: {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  initialLocale: AppLocale;
  children: ReactNode;
}) {
  const clientSwitchRef = useRef(false);

  useEffect(() => {
    if (clientSwitchRef.current) {
      clientSwitchRef.current = false;
      return;
    }

    const fromUrl = readLocaleFromPath(window.location.pathname);
    const nextLocale = fromUrl ?? initialLocale;
    setLocale(nextLocale);
    document.documentElement.lang = nextLocale;
  }, [initialLocale, setLocale]);

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
  }, [setLocale]);

  const switchLocale = useCallback(
    (nextLocale: AppLocale) => {
      if (nextLocale === locale) return;

      clientSwitchRef.current = true;
      markLocaleSwitchStart();
      setLocale(nextLocale);
      document.documentElement.lang = nextLocale;
      markLocaleSwitchEnd();
    },
    [locale, setLocale]
  );

  const contextValue = useMemo(
    () => ({
      locale,
      switchLocale
    }),
    [locale, switchLocale]
  );

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
}

export function LocaleProvider({
  initialLocale,
  children
}: {
  initialLocale: AppLocale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState<AppLocale>(initialLocale);

  return (
    <NextIntlClientProvider locale={locale} messages={MESSAGE_BUNDLES[locale]} timeZone="UTC">
      <LocaleContextBridge locale={locale} setLocale={setLocale} initialLocale={initialLocale}>
        {children}
      </LocaleContextBridge>
    </NextIntlClientProvider>
  );
}
