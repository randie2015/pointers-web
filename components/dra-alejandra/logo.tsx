import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/alejandraData';

type DraAlejandraLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
};

const markShell = {
  sm: 'h-9 w-9 rounded-md p-1.5',
  md: 'h-10 w-10 rounded-lg p-1.5 sm:h-11 sm:w-11 sm:p-2',
  lg: 'h-12 w-12 rounded-lg p-2 sm:h-14 sm:w-14 sm:p-2.5'
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
    name: 'text-ale-ink',
    tagline: 'text-ale-gold',
    shell: 'bg-ale-ink text-white shadow-sm'
  },
  dark: {
    name: 'text-white',
    tagline: 'text-ale-rose',
    shell: 'border border-white/25 bg-white/12 text-white shadow-sm backdrop-blur-sm'
  }
} as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M24 4C14 4 8 12 8 22c0 8 3 14 6 18 2 3 4 8 4 10 0 2 1.5 2 2 2s2 0 2-2c0-2 2-7 4-10 3-4 6-10 6-18 0-10-6-18-16-18Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 24c2 4 5 6 8 6s6-2 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DraAlejandraLogo({ className, size = 'md', theme = 'light' }: DraAlejandraLogoProps) {
  const palette = themeStyles[theme];

  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center transition-colors duration-500',
          markShell[size],
          palette.shell
        )}
      >
        <LogoMark className="h-full w-full" />
      </span>

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
