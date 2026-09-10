'use client';

import type { PricingCurrency } from '@/lib/pricing-currency';
import { cn } from '@/lib/utils';

type PricingCurrencyToggleProps = {
  value: PricingCurrency;
  onChange: (currency: PricingCurrency) => void;
  className?: string;
};

export function PricingCurrencyToggle({ value, onChange, className }: PricingCurrencyToggleProps) {
  return (
    <div
      className={cn('inline-flex items-center rounded-full border border-white/10 bg-[#13161F] p-1', className)}
      role="group"
      aria-label="Moneda de precios"
    >
      {(['USD', 'PEN'] as const).map((currency) => (
        <button
          key={currency}
          type="button"
          onClick={() => onChange(currency)}
          aria-pressed={value === currency}
          className={cn(
            'touch-press rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ease-in-out sm:px-5 sm:text-sm',
            value === currency ? 'bg-[#BC2656] text-white shadow-sm' : 'text-slate-400 hover:text-[#BC2656]'
          )}
        >
          {currency === 'USD' ? 'USD ($)' : 'PEN (S/)'}
        </button>
      ))}
    </div>
  );
}
