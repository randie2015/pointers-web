import Image from 'next/image';
import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/alejandraData';

type DraAlejandraLogoProps = {
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

export function DraAlejandraLogo({
  className,
  imageClassName,
  showWordmark = true,
  size = 'md'
}: DraAlejandraLogoProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
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
          <span className="block truncate font-display text-sm font-semibold tracking-wide text-ale-ink sm:text-base">
            {clinicBrand.subbrand}
          </span>
          <span className="block truncate text-[10px] uppercase tracking-[0.14em] text-ale-gold sm:text-[11px]">
            {clinicBrand.positioning}
          </span>
        </span>
      ) : null}
    </span>
  );
}
