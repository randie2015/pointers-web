'use client';

import { useEffect, useRef, useState } from 'react';
import { getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';
import { cn } from '@/lib/utils';
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRY_OPTIONS,
  buildInternationalInput,
  extractNationalDigits,
  formatPhoneForDisplay,
  toE164
} from '@/lib/contact/phone';

type InternationalPhoneInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
};

export function InternationalPhoneInput({
  value,
  onChange,
  onBlur,
  disabled,
  placeholder,
  className,
  id,
  name
}: InternationalPhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>(DEFAULT_PHONE_COUNTRY);
  const [display, setDisplay] = useState('');
  const skipSync = useRef(false);

  useEffect(() => {
    if (skipSync.current) {
      skipSync.current = false;
      return;
    }

    if (!value) {
      setCountry(DEFAULT_PHONE_COUNTRY);
      setDisplay('');
      return;
    }

    try {
      const parsed = parsePhoneNumber(value);
      if (parsed) {
        if (parsed.country) {
          setCountry(parsed.country);
        }
        setDisplay(parsed.formatInternational());
        return;
      }
    } catch {
      // fall through
    }

    setDisplay(formatPhoneForDisplay(value, DEFAULT_PHONE_COUNTRY));
  }, [value]);

  function commitDisplay(nextDisplay: string, nextCountry: CountryCode) {
    skipSync.current = true;
    setDisplay(nextDisplay);
    onChange(toE164(nextDisplay, nextCountry));
  }

  function handleCountryChange(nextCountry: CountryCode) {
    setCountry(nextCountry);

    const nationalDigits = extractNationalDigits(display, country);
    const nextDisplay = buildInternationalInput(nationalDigits, nextCountry);
    commitDisplay(nextDisplay, nextCountry);
  }

  function handleInputChange(raw: string) {
    const digits = raw.replace(/\D/g, '');
    const callingCode = getCountryCallingCode(country);
    let nationalDigits = digits;

    if (digits.startsWith(callingCode)) {
      nationalDigits = digits.slice(callingCode.length);
    }

    const nextDisplay = buildInternationalInput(nationalDigits, country);
    commitDisplay(nextDisplay, country);
  }

  function handleFocus() {
    if (!display) {
      commitDisplay(buildInternationalInput('', country), country);
    }
  }

  return (
    <div
      className={cn(
        'flex w-full overflow-hidden rounded-xl border border-white/25 bg-white shadow-sm transition focus-within:border-[#39B8AD] focus-within:ring-2 focus-within:ring-[#39B8AD]/25',
        disabled && 'pointer-events-none opacity-60',
        className
      )}
    >
      <select
        aria-label="Country code"
        value={country}
        onChange={(event) => handleCountryChange(event.target.value as CountryCode)}
        disabled={disabled}
        className="max-w-[9.5rem] shrink-0 cursor-pointer border-0 border-r border-gray-200 bg-transparent py-3.5 pl-3 pr-2 text-sm text-gray-700 outline-none max-md:min-h-[48px]"
      >
        {PHONE_COUNTRY_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        id={id}
        name={name}
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        value={display}
        onChange={(event) => handleInputChange(event.target.value)}
        onFocus={handleFocus}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-0 bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 max-md:min-h-[48px]"
      />
    </div>
  );
}
