import Image from 'next/image';
import { clinicBrand } from '@/src/data/magrassData';
import { cn } from '@/lib/utils';

type MagrassLogoProps = {
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
};

const markHeight = {
  sm: 'h-8',
  md: 'h-9 sm:h-10',
  lg: 'h-11 sm:h-12'
} as const;

const nameSize = {
  sm: 'text-sm',
  md: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-xl'
} as const;

const subSize = {
  sm: 'text-[9px]',
  md: 'text-[10px] sm:text-[11px]',
  lg: 'text-xs'
} as const;

export function MagrassLogo({
  className,
  theme = 'light',
  size = 'md',
  showText = false
}: MagrassLogoProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <span className={cn('relative shrink-0', markHeight[size], 'aspect-[878/555]')}>
        <Image
          src={clinicBrand.logoMark}
          alt={clinicBrand.name}
          fill
          sizes="(max-width: 768px) 120px, 160px"
          className={cn(
            'object-contain object-left transition-[filter] duration-500',
            theme === 'dark' && 'brightness-0 invert'
          )}
          priority
        />
      </span>

      {showText ? (
        <span className="min-w-0 shrink font-playfair leading-tight">
          <span
            className={cn(
              'block font-semibold tracking-wide',
              theme === 'dark' ? 'text-white' : 'text-mag-navy',
              nameSize[size]
            )}
          >
            {clinicBrand.name}
          </span>
          <span
            className={cn(
              'block uppercase tracking-[0.14em]',
              theme === 'dark' ? 'text-mag-gold-light' : 'text-mag-gold',
              subSize[size]
            )}
          >
            {clinicBrand.subtitle}
          </span>
        </span>
      ) : null}
    </span>
  );
}
