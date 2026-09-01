import Image from 'next/image';
import { cn } from '@/lib/utils';
import { clinicBrand } from '@/src/data/orthozentData';

type OrthozentLogoProps = {
  className?: string;
  imageClassName?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
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

export function OrthozentLogo({
  className,
  imageClassName,
  showWordmark = true,
  size = 'md',
  variant = 'dark'
}: OrthozentLogoProps) {
  const isLight = variant === 'light';

  return (
    <span className={cn('flex min-w-0 items-center gap-2 sm:gap-2.5', className)}>
      <Image
        src={clinicBrand.logo}
        alt={`${clinicBrand.name} logo`}
        width={160}
        height={160}
        className={cn(
          'w-auto shrink-0 object-contain',
          imageHeight[size],
          isLight && 'brightness-0 invert',
          imageClassName
        )}
        priority
      />
      {showWordmark ? (
        <span className="min-w-0 leading-tight">
          <span
            className={cn(
              'block truncate font-display font-bold transition-colors',
              isLight ? 'text-white group-hover:text-ortho-gold' : 'text-ortho-dark group-hover:text-ortho-primary',
              textSize[size]
            )}
          >
            {clinicBrand.name}
          </span>
          <span
            className={cn(
              'block truncate text-xs max-[360px]:hidden sm:block',
              isLight ? 'text-white/70' : 'text-slate-500'
            )}
          >
            {clinicBrand.doctor}
          </span>
        </span>
      ) : null}
    </span>
  );
}
