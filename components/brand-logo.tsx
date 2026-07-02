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
  },
  'vertical-brand': {
    src: '/brand/logo-vertical-brand.png',
    width: 1000,
    height: 540,
    alt: 'Pointers'
  },
  'vertical-magenta': {
    src: '/brand/logo-vertical-magenta.png',
    width: 1000,
    height: 540,
    alt: 'Pointers'
  }
} as const;

const TINTS = {
  none: '',
  white: 'brightness-0 invert',
  brand:
    '[filter:brightness(0)_saturate(100%)_invert(24%)_sepia(67%)_saturate(2878%)_hue-rotate(314deg)_brightness(92%)_contrast(88%)]'
} as const;

type BrandLogoVariant = keyof typeof LOGOS;
type BrandLogoTint = keyof typeof TINTS;

type BrandLogoProps = {
  variant: BrandLogoVariant;
  className?: string;
  priority?: boolean;
  tint?: BrandLogoTint;
};

export function BrandLogo({ variant, className, priority, tint = 'none' }: BrandLogoProps) {
  const logo = LOGOS[variant];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      unoptimized
      priority={priority}
      className={cn('w-auto', TINTS[tint], className)}
    />
  );
}
