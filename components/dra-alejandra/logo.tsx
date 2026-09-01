import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/alejandraData';

type DraAlejandraLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
};

const markSize = {
  sm: 'h-9 w-[1.65rem]',
  md: 'h-10 w-[1.85rem] sm:h-11 sm:w-8',
  lg: 'h-12 w-9 sm:h-14 sm:w-10'
} as const;

const nameStyles = {
  sm: 'text-[10px] leading-tight tracking-[0.04em]',
  md: 'text-[13px] leading-tight tracking-[0.04em] sm:text-sm',
  lg: 'text-base leading-tight tracking-[0.05em] sm:text-lg'
} as const;

const taglineStyles = {
  sm: 'text-[8px] tracking-[0.14em]',
  md: 'text-[9px] tracking-[0.16em] sm:text-[10px]',
  lg: 'text-[10px] tracking-[0.18em] sm:text-xs'
} as const;

const themeStyles = {
  light: {
    name: 'text-ale-charcoal',
    tagline: 'text-ale-gold-deep',
    mark: 'text-ale-cta-dark'
  },
  dark: {
    name: 'text-white',
    tagline: 'text-ale-rose',
    mark: 'text-ale-rose'
  }
} as const;

/** Brand mark — do not replace with PNG until a valid transparent asset is provided. */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path
        d="M19 5C13 22 13 40 21 67"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <path
        d="M37 5C43 22 43 40 35 67"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
      />
      <path
        d="M22 33C25.5 36.5 30.5 36.5 34 33"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DraAlejandraLogo({ className, size = 'md', theme = 'light' }: DraAlejandraLogoProps) {
  const palette = themeStyles[theme];

  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <BrandMark className={cn('shrink-0 transition-colors duration-500', markSize[size], palette.mark)} />

      <span className="min-w-0 shrink font-cinzel leading-none">
        <span
          className={cn(
            'block font-semibold uppercase transition-colors duration-500',
            palette.name,
            nameStyles[size]
          )}
        >
          {clinicBrand.name}
        </span>
        <span
          className={cn(
            'mt-1 block uppercase transition-colors duration-500',
            palette.tagline,
            taglineStyles[size]
          )}
        >
          {clinicBrand.tagline}
        </span>
      </span>
    </span>
  );
}
