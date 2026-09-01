import Image from 'next/image';
import { clinicBrand } from '@/src/data/magrassData';
import { cn } from '@/lib/utils';

type MagrassLogoProps = {
  className?: string;
  theme?: 'navy' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'nav';
  showText?: boolean;
};

/** Recolors the black PNG mark to brand navy #192031 */
const NAVY_LOGO_FILTER =
  'brightness(0) saturate(100%) invert(10%) sepia(18%) saturate(1200%) hue-rotate(182deg) brightness(92%) contrast(95%)';

const markSize = {
  sm: 'h-8 max-h-[36px] w-auto',
  md: 'h-9 max-h-[40px] w-auto sm:h-10',
  lg: 'h-10 max-h-[44px] w-auto sm:h-11',
  nav: 'h-8 max-h-[34px] w-auto sm:h-10 sm:max-h-[44px] md:h-11'
} as const;

export function MagrassLogo({
  className,
  theme = 'navy',
  size = 'md',
  showText = false
}: MagrassLogoProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <Image
        src={clinicBrand.logoMark}
        alt={clinicBrand.name}
        width={417}
        height={223}
        sizes="(max-width: 768px) 120px, 160px"
        className={cn('object-contain object-left transition-transform duration-300', markSize[size])}
        style={{
          width: 'auto',
          filter: theme === 'white' ? 'brightness(0) invert(1)' : NAVY_LOGO_FILTER
        }}
        priority={size === 'nav'}
      />

      {showText ? (
        <span className="min-w-0 shrink font-playfair leading-tight">
          <span
            className={cn(
              'block font-semibold tracking-wide',
              theme === 'white' ? 'text-white' : 'text-[#192031]'
            )}
          >
            {clinicBrand.name}
          </span>
          <span
            className={cn(
              'block text-[10px] uppercase tracking-[0.14em] sm:text-[11px]',
              theme === 'white' ? 'text-[#C5A57D]' : 'text-[#197876]'
            )}
          >
            {clinicBrand.subtitle}
          </span>
        </span>
      ) : null}
    </span>
  );
}
