import Image from 'next/image';
import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/clinicData';

type ReyDentalLogoProps = {
  className?: string;
  imageClassName?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const imageHeight = {
  sm: 'h-8',
  md: 'h-9 sm:h-10',
  lg: 'h-12 sm:h-14'
} as const;

const textSize = {
  sm: 'text-sm',
  md: 'text-sm sm:text-base',
  lg: 'text-base sm:text-lg'
} as const;

export function ReyDentalLogo({
  className,
  imageClassName,
  showWordmark = true,
  size = 'md'
}: ReyDentalLogoProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2 sm:gap-2.5', className)}>
      <Image
        src={clinicBrand.logo}
        alt={`${clinicBrand.name} logo`}
        width={160}
        height={160}
        className={cn('w-auto shrink-0 object-contain', imageHeight[size], imageClassName)}
        priority
      />
      {showWordmark ? (
        <span className="min-w-0 leading-tight">
          <span
            className={cn(
              'block truncate font-display font-bold text-rey-ink transition-colors group-hover:text-rey-primary',
              textSize[size]
            )}
          >
            {clinicBrand.name}
          </span>
          <span className="block truncate text-xs text-slate-500 max-[360px]:hidden sm:block">{clinicBrand.doctor}</span>
        </span>
      ) : null}
    </span>
  );
}
