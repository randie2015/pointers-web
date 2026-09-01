import Image from 'next/image';
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
    tagline: 'text-ale-gold-deep'
  },
  dark: {
    name: 'text-white',
    tagline: 'text-ale-rose'
  }
} as const;

export function DraAlejandraLogo({ className, size = 'md', theme = 'light' }: DraAlejandraLogoProps) {
  const palette = themeStyles[theme];

  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <span className={cn('relative shrink-0', markSize[size])}>
        <Image
          src={clinicBrand.logoMark}
          alt=""
          fill
          sizes="(max-width: 768px) 40px, 56px"
          className={cn(
            'object-contain object-center transition-[filter] duration-500',
            theme === 'dark' && 'brightness-0 invert'
          )}
          priority
        />
      </span>

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
