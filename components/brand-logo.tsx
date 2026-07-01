import Image from 'next/image';
import { cn } from '@/lib/utils';

const LOGOS = {
  'horizontal-white': {
    src: '/brand/logo-horizontal-white.png',
    width: 1024,
    height: 211,
    alt: 'Pointers'
  },
  'horizontal-dark': {
    src: '/brand/logo-horizontal-dark.png',
    width: 1024,
    height: 211,
    alt: 'Pointers'
  },
  'vertical-white': {
    src: '/brand/logo-vertical-white.png',
    width: 1024,
    height: 553,
    alt: 'Pointers'
  },
  'vertical-dark': {
    src: '/brand/logo-vertical-dark.png',
    width: 1000,
    height: 540,
    alt: 'Pointers'
  }
} as const;

type BrandLogoVariant = keyof typeof LOGOS;

type BrandLogoProps = {
  variant: BrandLogoVariant;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ variant, className, priority }: BrandLogoProps) {
  const logo = LOGOS[variant];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      unoptimized
      priority={priority}
      className={cn('w-auto', className)}
    />
  );
}
