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
  sm: 'h-9',
  md: 'h-10 sm:h-11',
  lg: 'h-12 sm:h-14'
} as const;

const shellPadding = {
  sm: 'rounded-lg px-2 py-1',
  md: 'rounded-lg px-2.5 py-1.5 sm:rounded-xl sm:px-3 sm:py-2',
  lg: 'rounded-xl px-3 py-2 sm:px-4 sm:py-2.5'
} as const;

export function DraAlejandraLogo({
  className,
  imageClassName,
  showWordmark = false,
  size = 'md'
}: DraAlejandraLogoProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center bg-ale-ink shadow-sm',
          shellPadding[size]
        )}
      >
        <Image
          src={clinicBrand.logo}
          alt={`${clinicBrand.name} — Rehabilitación Oral y Estética Dental`}
          width={200}
          height={72}
          className={cn('w-auto object-contain', imageHeight[size], imageClassName)}
          priority
        />
      </span>
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
