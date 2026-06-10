import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import es from '../messages/es.json';
import en from '../messages/en.json';

const messages = { es, en } as const;

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as Locale],
    // Avoid ENVIRONMENT_FALLBACK + hydration mismatches by making timezone explicit.
    timeZone: 'UTC'
  };
});
