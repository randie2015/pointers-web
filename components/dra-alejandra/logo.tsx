import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/alejandraData';

type DraAlejandraLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
};

const markSize = {
  sm: 'h-9 w-9',
  md: 'h-10 w-10 sm:h-11 sm:w-11',
  lg: 'h-12 w-12 sm:h-14 sm:w-14'
} as const;

const nameStyles = {
  sm: 'text-[11px] leading-tight',
  md: 'text-sm leading-tight sm:text-[15px]',
  lg: 'text-base leading-tight sm:text-lg'
} as const;

const taglineStyles = {
  sm: 'text-[9px] tracking-[0.1em]',
  md: 'text-[10px] tracking-[0.12em] sm:text-[11px]',
  lg: 'text-xs tracking-[0.14em] sm:text-sm'
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

function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path
        d="M26 10C16 30 14 54 28 86"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M54 10C64 30 66 54 52 86"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M30 44C36 50 44 50 50 44"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DraAlejandraLogo({ className, size = 'md', theme = 'light' }: DraAlejandraLogoProps) {
  const palette = themeStyles[theme];

  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <LogoMark className={cn('shrink-0 transition-colors duration-500', markSize[size], palette.mark)} />

      <span className="min-w-0 shrink font-cinzel leading-none">
        <span
          className={cn(
            'block font-medium transition-colors duration-500',
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
