import Image from 'next/image';
import { clinicBrand } from '@/src/data/magrassData';
import { cn } from '@/lib/utils';

type MagrassLogoProps = {
  className?: string;
  theme?: 'navy' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'nav';
  showText?: boolean;
};

const markHeight = {
  sm: 'h-10',
  md: 'h-12 sm:h-14',
  lg: 'h-14 sm:h-16',
  nav: 'h-12 sm:h-14 lg:h-[4.5rem]'
} as const;

export function MagrassLogo({
  className,
  theme = 'navy',
  size = 'md',
  showText = false
}: MagrassLogoProps) {
  const isNav = size === 'nav';

  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <span
        className={cn(
          'relative shrink-0 aspect-[417/223] transition-transform duration-300',
          markHeight[size],
          isNav && 'group-hover:scale-[1.04]'
        )}
      >
        <Image
          src={clinicBrand.logoMark}
          alt={clinicBrand.name}
          fill
          sizes="(max-width: 768px) 150px, 220px"
          className={cn(
            'object-contain object-left transition-[filter] duration-300',
            theme === 'white' && 'brightness-0 invert'
          )}
          style={theme === 'navy' ? { filter: 'brightness(0) saturate(100%)' } : undefined}
          priority
        />
      </span>

      {showText ? (
        <span className="min-w-0 shrink font-playfair leading-tight">
          <span
            className={cn(
              'block font-semibold tracking-wide',
              theme === 'white' ? 'text-white' : 'text-mag-navy'
            )}
          >
            {clinicBrand.name}
          </span>
          <span
            className={cn(
              'block text-[10px] uppercase tracking-[0.14em] sm:text-[11px]',
              theme === 'white' ? 'text-mag-sand' : 'text-mag-jade'
            )}
          >
            {clinicBrand.subtitle}
          </span>
        </span>
      ) : null}
    </span>
  );
}
