import Image from 'next/image';
import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/alejandraData';

type DraAlejandraLogoProps = {
  className?: string;
  imageClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
};

const iconShell = {
  sm: 'h-9 w-9 rounded-md',
  md: 'h-10 w-10 rounded-lg sm:h-11 sm:w-11',
  lg: 'h-12 w-12 rounded-lg sm:h-14 sm:w-14'
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
    shell: 'bg-ale-ink shadow-sm'
  },
  dark: {
    name: 'text-white',
    tagline: 'text-ale-rose',
    shell: 'border border-white/20 bg-white/10 shadow-sm backdrop-blur-sm'
  }
} as const;

export function DraAlejandraLogo({
  className,
  imageClassName,
  size = 'md',
  theme = 'light'
}: DraAlejandraLogoProps) {
  const palette = themeStyles[theme];

  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 transition-colors duration-500 sm:gap-3', className)}>
      <span
        className={cn('relative shrink-0 overflow-hidden transition-colors duration-500', iconShell[size], palette.shell, imageClassName)}
        aria-hidden
      >
        <Image
          src={clinicBrand.logo}
          alt=""
          width={120}
          height={120}
          className="absolute left-1/2 top-0 h-auto w-[7.5rem] max-w-none -translate-x-1/2 object-none"
          priority
        />
      </span>

      <span className="min-w-0 font-cinzel leading-none">
        <span className={cn('block font-medium transition-colors duration-500', palette.name, nameStyles[size])}>
          {clinicBrand.name}
        </span>
        <span className={cn('mt-1 block uppercase transition-colors duration-500', palette.tagline, taglineStyles[size])}>
          {clinicBrand.tagline}
        </span>
      </span>
    </span>
  );
}
