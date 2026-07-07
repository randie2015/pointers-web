import {
  AsYouType,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber
} from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';

export const DEFAULT_PHONE_COUNTRY: CountryCode = 'PE';

export const PHONE_COUNTRY_OPTIONS: { code: CountryCode; label: string }[] = [
  { code: 'PE', label: 'Perú (+51)' },
  { code: 'US', label: 'Estados Unidos (+1)' },
  { code: 'MX', label: 'México (+52)' },
  { code: 'CO', label: 'Colombia (+57)' },
  { code: 'AR', label: 'Argentina (+54)' },
  { code: 'CL', label: 'Chile (+56)' },
  { code: 'ES', label: 'España (+34)' },
  { code: 'GB', label: 'Reino Unido (+44)' },
  { code: 'CA', label: 'Canadá (+1)' },
  { code: 'BR', label: 'Brasil (+55)' },
  { code: 'DE', label: 'Alemania (+49)' },
  { code: 'FR', label: 'Francia (+33)' }
];

export function formatPhoneAsYouType(input: string, country: CountryCode): string {
  return new AsYouType(country).input(input);
}

export function toE164(input: string, country: CountryCode): string {
  const formatter = new AsYouType(country);
  formatter.input(input);
  const number = formatter.getNumber();

  if (number?.number) {
    return number.number;
  }

  return input.replace(/\s/g, '');
}

export function isValidInternationalPhone(value: string): boolean {
  if (!value?.trim()) return false;
  return isValidPhoneNumber(value);
}

export function formatPhoneForDisplay(value: string, country: CountryCode = DEFAULT_PHONE_COUNTRY): string {
  if (!value) return '';

  try {
    const parsed = parsePhoneNumber(value);
    if (parsed) {
      return parsed.formatInternational();
    }
  } catch {
    // fall through
  }

  const normalized = value.startsWith('+') ? value : `+${getCountryCallingCode(country)}${value}`;
  return formatPhoneAsYouType(normalized, country);
}

export function extractNationalDigits(value: string, country: CountryCode): string {
  const digits = value.replace(/\D/g, '');
  const callingCode = getCountryCallingCode(country);

  if (digits.startsWith(callingCode)) {
    return digits.slice(callingCode.length);
  }

  return digits;
}

export function buildInternationalInput(nationalDigits: string, country: CountryCode): string {
  const prefix = `+${getCountryCallingCode(country)}`;
  if (!nationalDigits) return `${prefix} `;
  return formatPhoneAsYouType(`${prefix}${nationalDigits}`, country);
}
