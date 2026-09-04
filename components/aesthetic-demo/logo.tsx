import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ResolvedAestheticDemo } from '@/lib/aesthetic-demo/types';

type AestheticLogoProps = {
  demo: ResolvedAestheticDemo;
  className?: string;
  theme?: 'navy' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'nav';
  showText?: boolean;
};

const markSize = {
  sm: 'h-8 max-h-[36px] w-auto',
  md: 'h-9 max-h-[40px] w-auto sm:h-10',
  lg: 'h-10 max-h-[44px] w-auto sm:h-11',
  nav: 'h-10 max-h-[44px] w-auto md:h-11'
} as const;

export function AestheticLogo({
  demo,
  className,
  theme = 'navy',
  size = 'md',
  showText = false
}: AestheticLogoProps) {
  return (
    <span className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <Image
        src={demo.brand.logoMark}
        alt={demo.brand.name}
        width={417}
        height={223}
        sizes="(max-width: 768px) 120px, 160px"
        className={cn('object-contain object-left transition-transform duration-300', markSize[size])}
        style={{
          width: 'auto',
          filter: theme === 'white' ? 'brightness(0) invert(1)' : undefined
        }}
        priority={size === 'nav'}
      />

      {showText ? (
        <span className="min-w-0 shrink font-playfair leading-tight">
          <span
            className={cn(
              'block font-semibold tracking-wide',
              theme === 'white' ? 'text-white' : 'text-demo-ink'
            )}
          >
            {demo.brand.name}
          </span>
          <span
            className={cn(
              'block text-[10px] uppercase tracking-[0.14em] sm:text-[11px]',
              theme === 'white' ? 'text-demo-accent' : 'text-demo-jade'
            )}
          >
            {demo.brand.subtitle}
          </span>
        </span>
      ) : null}
    </span>
  );
}
