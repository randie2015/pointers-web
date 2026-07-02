import Image from 'next/image';
import { cn } from '@/lib/utils';

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 211;

type HeaderLogoProps = {
  className?: string;
  priority?: boolean;
};

export function HeaderLogo({ className, priority }: HeaderLogoProps) {
  return (
    <Image
      src="/brand/logo-navbar.png"
      alt="Pointers"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      unoptimized
      priority={priority}
      className={cn('block h-8 w-auto shrink-0 brightness-0 invert sm:h-9 md:h-10', className)}
    />
  );
}
