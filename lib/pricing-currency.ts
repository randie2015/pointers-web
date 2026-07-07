export type PricingCurrency = 'USD' | 'PEN';

const USD_RATE = 3.4;
const PEN_ROUND_STEP = 50;

export function convertToSoles(usdPrice: number): number {
  const soles = usdPrice * USD_RATE;
  return Math.floor(soles / PEN_ROUND_STEP) * PEN_ROUND_STEP;
}

export function parseUsdFromPriceString(price: string): { amount: number; suffix: string } | null {
  const match = price.match(/\$\s*([\d,]+(?:\.\d+)?)/);
  if (!match) return null;

  const amount = Number.parseFloat(match[1].replace(/,/g, ''));
  if (Number.isNaN(amount)) return null;

  const suffixMatch = price.match(/USD\s*(.*)$/i);
  const suffix = suffixMatch?.[1]?.trim();

  return { amount, suffix: suffix ? ` ${suffix}` : '' };
}

function formatUsdAmount(amount: number): string {
  return amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function formatPenAmount(amount: number): string {
  return convertToSoles(amount).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export function formatPricingPrice(
  priceString: string,
  currency: PricingCurrency,
  locale: 'es' | 'en' = 'es'
): string {
  const parsed = parseUsdFromPriceString(priceString);
  if (!parsed) return priceString;

  const prefix = locale === 'es' ? 'Desde' : 'From';

  if (currency === 'USD') {
    return `${prefix} $${formatUsdAmount(parsed.amount)} USD${parsed.suffix}`;
  }

  return `${prefix} S/ ${formatPenAmount(parsed.amount)} PEN${parsed.suffix}`;
}

export function formatPricingDual(
  priceString: string,
  locale: 'es' | 'en' = 'es'
): { usd: string; pen: string } | null {
  const parsed = parseUsdFromPriceString(priceString);
  if (!parsed) return null;

  const prefix = locale === 'es' ? 'Desde' : 'From';
  const suffix = parsed.suffix;

  return {
    usd: `${prefix} $${formatUsdAmount(parsed.amount)} USD${suffix}`,
    pen: `${prefix} S/ ${formatPenAmount(parsed.amount)} PEN${suffix}`
  };
}